import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

/** pdf-lib ile açıp sayfa sayısını ve tüm dolaylı nesnelerin metin dökümünü verir. */
async function dumpObjects(bytes: Buffer): Promise<{ pages: number; dump: string; firstPage: string }> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(bytes);
  const dump = doc.context.enumerateIndirectObjects().map(([, obj]) => obj.toString()).join('\n');
  const firstPage = doc.getPage(0).node.toString();
  return { pages: doc.getPageCount(), dump, firstPage };
}

/** Çıktı PDF'inin metnini sayfa sayfa vendor pdf.js ile (tarayıcı içinde) okur. */
async function extractTexts(page: Page, bytes: Buffer): Promise<string[]> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64);
    const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const doc = await pdfjs.getDocument({ data }).promise;
    const out: string[] = [];
    for (let n = 1; n <= doc.numPages; n++) {
      const content = await (await doc.getPage(n)).getTextContent();
      out.push(content.items.map((it: any) => it.str || '').join(' ').trim());
    }
    return out;
  }, bytes.toString('base64'));
}

/** Standart fontla ASCII kişisel veri içeren tek sayfalık PDF. */
async function makePiiPdf(): Promise<Buffer> {
  const { PDFDocument, StandardFonts } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const p = doc.addPage([595, 842]);
  p.drawText('Basvuru Formu', { x: 60, y: 760, size: 20, font });
  p.drawText('TC: 12345678901', { x: 60, y: 700, size: 14, font });
  p.drawText('Adres: Ornek Mah. No 5', { x: 60, y: 670, size: 14, font });
  return Buffer.from(await doc.save());
}

test.describe('PDF Karartma', () => {
  test('1. sayfaya kutu çiz → 3 sayfa, 1. sayfa görüntü ve metinsiz, 2. sayfa metni duruyor; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 1280, height: 1500 }); // kanvasın tamamı görünür olsun (fare koordinatları görünüm alanına göre)
    await page.goto('/pdf-karart/');
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#editor')).toBeVisible();
    await expect(page.locator('#page-label')).toHaveText('Sayfa 1 / 3');

    // Başlık sayfanın üst %10'unda (y=760/842): üst bölgeyi kapsayan kutu çiz.
    const canvas = page.locator('#canvas');
    await expect(canvas).toBeVisible();
    await canvas.scrollIntoViewIfNeeded();
    const box = (await canvas.boundingBox())!;
    expect(box.height).toBeGreaterThan(100);
    await page.mouse.move(box.x + box.width * 0.05, box.y + box.height * 0.03);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.1, { steps: 5 });
    await page.mouse.move(box.x + box.width * 0.95, box.y + box.height * 0.2, { steps: 5 });
    await page.mouse.up();
    await expect(page.locator('#boxes li')).toHaveCount(1);
    await expect(page.locator('#box-summary')).toContainText('1 sayfa karartılacak');

    // Diğer sayfalarda kutu yok
    await page.locator('#next').click();
    await expect(page.locator('#page-label')).toHaveText('Sayfa 2 / 3');
    await expect(page.locator('#boxes li')).toHaveCount(0);
    await page.locator('#prev').click();

    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    await expect(page.locator('#result-info')).toContainText('1 sayfa karartılıp');
    await expect(page.locator('#result-info')).toContainText('2 sayfa olduğu gibi');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-karartilmis.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');

    const { pages, dump, firstPage } = await dumpObjects(out);
    expect(pages).toBe(3);
    expect(dump).toMatch(/\/Subtype\s*\/Image/);
    expect(firstPage).toMatch(/\/XObject/);
    // meta temizlendi
    expect(dump).not.toMatch(/\/Producer\s*\(pdf-lib/);

    const texts = await extractTexts(page, out);
    expect(texts).toHaveLength(3);
    expect(texts[0]).toBe('');
    expect(texts[1]).toContain('Ikinci belge - sayfa 2');
    expect(texts[2]).toContain('Ikinci belge - sayfa 3');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('TC kimlik no ön ayarı eşleşmeyi bulur ve kutuya çevirir; özel metin de bulunur', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-karart/');
    const pdf = await makePiiPdf();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'basvuru.pdf', mimeType: 'application/pdf', buffer: pdf });
    await expect(page.locator('#editor')).toBeVisible();
    // desen seçmeden → hata
    await page.locator('#find').click();
    await expect(page.locator('#error')).toContainText('En az bir desen seçin');
    await page.locator('#preset-tc').check();
    await page.locator('#find').click();
    await expect(page.locator('#find-status')).toContainText('1 eşleşme', { timeout: 20_000 });
    await expect(page.locator('#boxes li')).toHaveCount(1);
    await expect(page.locator('#boxes li').first()).toContainText('TC kimlik no');
    // Kutu sayfanın sol-üst çeyreğinde olmalı (y=700 → üstten ~%16)
    const meta = await page.locator('#boxes li .meta').first().textContent();
    const m = meta!.match(/(\d+)%, (\d+)%/);
    expect(Number(m![1])).toBeLessThan(25);
    expect(Number(m![2])).toBeGreaterThan(10);
    expect(Number(m![2])).toBeLessThan(25);

    await page.locator('#preset-tc').uncheck();
    await page.locator('#opt-find').fill('Ornek Mah');
    await page.locator('#find').click();
    await expect(page.locator('#find-status')).toContainText('1 eşleşme');
    await expect(page.locator('#boxes li')).toHaveCount(2);

    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const out = readFileSync((await dl.path())!);
    const texts = await extractTexts(page, out);
    expect(texts).toEqual(['']);
    expect(external).toEqual([]);
  });

  test('kutu silme, tüm sayfalara uygula ve bölge seçilmeden çalıştırma hatası', async ({ page }) => {
    await page.goto('/pdf-karart/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#editor')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('bölge seçilmedi');
    // klavyeyle elle kutu, tüm sayfalara
    await page.locator('#opt-all-pages').check();
    await page.locator('.rd-manual summary').click();
    await page.locator('#man-add').click();
    await expect(page.locator('#boxes li')).toHaveCount(1);
    await expect(page.locator('#box-summary')).toContainText('toplam 3 kutu, 3 sayfa karartılacak');
    await page.locator('#boxes li button').first().click();
    await expect(page.locator('#boxes li')).toHaveCount(0);
    await expect(page.locator('#box-summary')).toContainText('toplam 2 kutu');
    await page.locator('#clear-all').click();
    await expect(page.locator('#box-summary')).toContainText('Henüz kutu yok');
  });

  test('bozuk, şifreli ve PDF olmayan dosya → çözüm öneren Türkçe hata', async ({ page }) => {
    await page.goto('/pdf-karart/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF değil/);
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifreli');
    await expect(page.locator('#error')).toContainText('şifresini kaldırıp');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
  });

  test('sayfa yapısı: rozet, reklam buton yanında değil, SSS ve içerik yeterli', async ({ page }) => {
    await page.goto('/pdf-karart/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-related a[href="../pdf-filigran/"]')).toHaveCount(1);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
