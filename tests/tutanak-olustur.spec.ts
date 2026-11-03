import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

async function readPdfText(page: Page, buf: Buffer): Promise<string> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const d = await pdfjs.getDocument({ data }).promise;
    let out = '';
    for (let i = 1; i <= d.numPages; i++) {
      const c = await (await d.getPage(i)).getTextContent();
      out += c.items.map((it: any) => it.str).join(' ') + '\n';
    }
    return out;
  }, buf.toString('base64'));
}

async function readDocxXml(page: Page, buf: Buffer): Promise<{ xml: string; files: string[] }> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const fflate = await import('/vendor/fflate@0.8.3/fflate.browser.mjs');
    const files = fflate.unzipSync(data);
    return { xml: new TextDecoder().decode(files['word/document.xml']), files: Object.keys(files) };
  }, buf.toString('base64'));
}

const norm = (s: string) => s.replace(/\s+/g, ' ');

async function download(page: Page, btn: string): Promise<Buffer> {
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator(btn).click()]);
  return readFileSync((await dl.path())!);
}

test.describe('Tutanak Örneği Oluşturucu', () => {
  test('zimmet: ürün tablosu, PDF ve DOCX; Türkçe karakter; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/tutanak-olustur/');
    await expect(page.locator('.ba-note').first()).toContainText('ukuki tavsiye değildir');
    await page.locator('#f-template').selectOption('zimmet');
    await expect(page.locator('#tpl-note')).toContainText('maaştan kesinti');
    await page.locator('#pp-name-0').fill('Gökçe İşler');
    await page.locator('#pp-name-1').fill('Şükran Öztürk Çelik');
    await page.locator('#fld-birim').fill('Muhasebe Şubesi');
    // Tablo: ilk satırı doldur, bir satır ekle, bir satır sil
    const rows = page.locator('.tb-row');
    await expect(rows).toHaveCount(2);
    await rows.first().locator('.tb-cell').first().fill('Dizüstü bilgisayar');
    await page.locator('#add-row').click();
    await expect(rows).toHaveCount(3);
    await rows.nth(2).locator('.tb-cell').first().fill('Çalışma masası ığdır');
    await rows.nth(1).locator('.tb-del').click();
    await expect(rows).toHaveCount(2);
    await expect(page.locator('#preview')).toContainText('Çalışma masası ığdır');

    const pdf = await download(page, '#make-pdf');
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(pdf);
    expect(Math.round(doc.getPage(0).getSize().height)).toBe(842);
    const text = norm(await readPdfText(page, pdf));
    expect(text).toContain('ZİMMET TUTANAĞI');
    expect(text).toContain('Gökçe İşler');
    expect(text).toContain('Şükran Öztürk Çelik');
    expect(text).toContain('Dizüstü bilgisayar');
    expect(text).toContain('Çalışma masası ığdır');
    expect(text).toContain('Zimmetlenen Malzemeler');
    expect(text).toContain('İMZALAR');
    expect(text).toContain('hukuki tavsiye değildir');
    expect(text).toContain('Önemli not');

    const dbuf = await download(page, '#make-docx');
    expect(dbuf.subarray(0, 2).toString()).toBe('PK');
    const { xml, files } = await readDocxXml(page, dbuf);
    expect(files).toContain('word/document.xml');
    expect(xml).toContain('Şükran Öztürk Çelik');
    expect(xml).toContain('Dizüstü bilgisayar');
    expect(xml).toContain('resmî');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kaza / olay: resmî tutanak yerine geçmez notu ekranda ve çıktıda; bölüm ekle-sil', async ({ page }) => {
    await page.goto('/tutanak-olustur/');
    await page.locator('#f-template').selectOption('kaza-olay');
    await expect(page.locator('#tpl-note')).toContainText('resmî kaza tespit tutanağı yerine geçmez');
    await page.locator('#pp-name-0').fill('Ayşe Yıldız');
    await page.locator('#fld-olay_turu').fill('Maddi hasarlı park kazası');
    await page.locator('#fld-yer').fill('Ofis otoparkı, Çınar Cad.');
    await page.locator('#w-0').fill('Ümit Şahin');
    const rows = page.locator('.cl-row');
    const n = await rows.count();
    await page.locator('#add-clause').click();
    await expect(rows).toHaveCount(n + 1);
    await rows.last().locator('.cl-h').fill('Ek bilgi');
    await rows.last().locator('.cl-x').fill('Güvenlik kamerası kaydı mevcuttur.');
    await expect(page.locator('#preview')).toContainText(`${n + 1}. Ek bilgi`);
    const pdf = await download(page, '#make-pdf');
    const text = norm(await readPdfText(page, pdf));
    expect(text).toContain('KAZA / OLAY TESPİT TUTANAĞI');
    expect(text).toContain('Ayşe Yıldız');
    expect(text).toContain('Ümit Şahin');
    expect(text).toContain('Ek bilgi');
    expect(text).toContain('resmî kaza tespit tutanağı yerine geçmez');
    await rows.last().locator('.cl-del').click();
    await expect(rows).toHaveCount(n);
    await expect(page.locator('#preview')).not.toContainText('Ek bilgi');
  });

  test('şablon listesinde iş kazası bildirimi yok; yedi şablon var', async ({ page }) => {
    await page.goto('/tutanak-olustur/');
    const opts = await page.locator('#f-template option').allTextContents();
    expect(opts.length).toBe(8); // "Şablon seçin" + 7
    expect(opts.join(' ').toLowerCase()).not.toContain('iş kazası');
    expect(opts.join(' ')).toContain('Teslim tesellüm');
    expect(opts.join(' ')).toContain('İşten ayrılma');
  });

  test('işten ayrılma: ibraname değildir notu', async ({ page }) => {
    await page.goto('/tutanak-olustur/');
    await page.locator('#f-template').selectOption('isten-ayrilma');
    await expect(page.locator('#tpl-note')).toContainText('ibraname değildir');
  });

  test('zorunlu alan boşsa Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/tutanak-olustur/');
    await page.locator('#make-docx').click();
    await expect(page.locator('#error')).toContainText('Önce bir şablon seçin');
    await page.locator('#f-template').selectOption('teslim-tesellum');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('"Teslim konusu" alanı boş');
    await page.locator('#fld-konu').fill('Ofis ekipmanları');
    await page.locator('#fld-yer').fill('Diyarbakır');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('TESLİM EDEN adı soyadı boş');
    await page.locator('#f-title').fill('');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Belge başlığı boş');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/tutanak-olustur/');
    await page.locator('#f-template').selectOption('toplanti');
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(over).toBeLessThanOrEqual(1);
  });
});
