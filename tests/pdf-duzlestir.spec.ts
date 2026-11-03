import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { fx, trackExternalRequests } from './helpers';

/** Formlu + damgalı (açıklamalı) tek sayfalık PDF üretir. */
async function makeFormPdf(): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([400, 400]);
  page.drawText('Merhaba Sozlesme', { x: 40, y: 340, size: 20, font, color: rgb(0, 0, 0) });
  const form = doc.getForm();
  const tf = form.createTextField('ad');
  tf.setText('Ahmet Yilmaz');
  tf.addToPage(page, { x: 40, y: 280, width: 200, height: 24, font });
  const cb = form.createCheckBox('onay');
  cb.addToPage(page, { x: 40, y: 240, width: 18, height: 18 });
  cb.check();
  // Görünüm akışı olan bir damga açıklaması
  const ctx = doc.context;
  const ap = ctx.stream('0.85 0.1 0.1 rg 0 0 100 40 re f', { Type: 'XObject', Subtype: 'Form', BBox: [0, 0, 100, 40] });
  const annot = ctx.obj({ Type: 'Annot', Subtype: 'Stamp', Rect: [200, 100, 300, 140], F: 4, AP: { N: ctx.register(ap) } });
  page.node.addAnnot(ctx.register(annot));
  return Buffer.from(await doc.save());
}

async function pdfText(page: Page, bytes: Buffer): Promise<string[]> {
  return page.evaluate(async (b64) => {
    const base = '/vendor/pdfjs-dist@4.10.38/';
    const pdfjs: any = await import(`${base}pdf.min.mjs`);
    pdfjs.GlobalWorkerOptions.workerSrc = `${base}pdf.worker.min.mjs`;
    const data = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const pdf = await pdfjs.getDocument({ data }).promise;
    const out: string[] = [];
    for (let n = 1; n <= pdf.numPages; n++) {
      const tc = await (await pdf.getPage(n)).getTextContent();
      out.push(tc.items.map((i: any) => i.str).join(' '));
    }
    return out;
  }, bytes.toString('base64'));
}

test.describe('PDF Düzleştir', () => {
  test('formlu PDF → alan yok, açıklama sayfaya işlenmiş, metin okunur; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-duzlestir/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'form.pdf', mimeType: 'application/pdf', buffer: await makeFormPdf() });
    await expect(page.locator('#files li')).toContainText('2 alan');
    await expect(page.locator('#files li')).toContainText('1 açıklama');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-list')).toContainText('2 form alanı');
    await expect(page.locator('#result-list')).toContainText('1 açıklama düzleştirildi');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('form-duzlestirilmis.pdf');
    const bytes = readFileSync((await dl.path())!);
    const out = await PDFDocument.load(bytes);
    expect(out.getForm().getFields().length).toBe(0);
    expect(out.getPages()[0].node.Annots()).toBeUndefined();
    const text = (await pdfText(page, bytes)).join(' ');
    expect(text).toContain('Merhaba Sozlesme');
    expect(text).toContain('Ahmet Yilmaz');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tam raster → metin yok, sayfa sayısı aynı', async ({ page }) => {
    await page.goto('/pdf-duzlestir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await page.locator('#opt-mode').selectOption('raster');
    await expect(page.locator('#group-raster')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 60_000 });
    await expect(page.locator('#result-list')).toContainText('→');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-raster.pdf');
    const bytes = readFileSync((await dl.path())!);
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(3);
    const texts = await pdfText(page, bytes);
    expect(texts.length).toBe(3);
    expect(texts.join('').trim()).toBe('');
  });

  test('iki dosya toplu → iki ayrı indirme', async ({ page }) => {
    await page.goto('/pdf-duzlestir/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#downloads button[data-download]')).toHaveCount(2);
  });

  test('bozuk.pdf → Türkçe hata; şifreli.pdf → şifre uyarısı', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-duzlestir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('bozuk ya da geçerli bir PDF değil');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifreli görünüyor');
    expect(external).toEqual([]);
  });
});
