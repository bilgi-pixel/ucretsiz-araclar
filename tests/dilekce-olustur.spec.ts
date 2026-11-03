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

/** DOCX (zip) içindeki word/document.xml'i sayfada fflate ile açar. */
async function readDocxXml(page: Page, buf: Buffer): Promise<{ xml: string; files: string[] }> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const fflate = await import('/vendor/fflate@0.8.3/fflate.browser.mjs');
    const files = fflate.unzipSync(data);
    return { xml: new TextDecoder().decode(files['word/document.xml']), files: Object.keys(files) };
  }, buf.toString('base64'));
}

async function fillSender(page: Page) {
  await page.locator('#f-name').fill('Şükran Öztürk Çelik');
  await page.locator('#f-address').fill('Bağlar Mah. 12. Sok. No: 5 Diyarbakır');
  await page.locator('#f-phone').fill('0412 000 00 00');
  await page.locator('#f-ekler').fill('1- Nüfus cüzdanı fotokopisi\nSağlık raporu');
}

test.describe('Dilekçe Oluşturucu', () => {
  test('şablon seç → PDF ve DOCX iner; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/dilekce-olustur/');
    await page.locator('#f-template').selectOption('istifa');
    await expect(page.locator('#f-konu')).toHaveValue(/istifa/);
    await expect(page.locator('#f-body')).toHaveValue(/hbar sürem/);
    await page.locator('#f-makam').fill('Güneş Ltd. Şti. İnsan Kaynakları Müdürlüğüne');
    await fillSender(page);
    await expect(page.locator('#preview')).toContainText('GÜNEŞ LTD. ŞTİ. İNSAN KAYNAKLARI MÜDÜRLÜĞÜNE');
    await expect(page.locator('#preview')).toContainText('EK-2: Sağlık raporu');

    const [pdl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    expect(pdl.suggestedFilename()).toMatch(/^dilekce-.*\.pdf$/);
    const pdf = readFileSync((await pdl.path())!);
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(pdf);
    expect(doc.getPageCount()).toBe(1);
    expect(Math.round(doc.getPage(0).getSize().height)).toBe(842);
    const text = await readPdfText(page, pdf);
    expect(text).toContain('Şükran Öztürk Çelik');
    expect(text).toContain('MÜDÜRLÜĞÜNE');
    expect(text).toContain('EK-1: Nüfus cüzdanı fotokopisi');
    expect(text).toContain('İmza');
    await expect(page.locator('#result-info')).toContainText('köşeli parantezli');

    const [ddl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-docx').click()]);
    expect(ddl.suggestedFilename()).toMatch(/^dilekce-.*\.docx$/);
    const dbuf = readFileSync((await ddl.path())!);
    expect(dbuf.subarray(0, 2).toString()).toBe('PK');
    const { xml, files } = await readDocxXml(page, dbuf);
    expect(files).toContain('word/document.xml');
    expect(xml).toContain('Şükran Öztürk Çelik');
    expect(xml).toContain('EK-2: Sağlık raporu');
    expect(xml).toContain('GÜNEŞ LTD. ŞTİ.');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('düzenlenen metin şablon değişince ezilmez; yeniden yükle düğmesi ezer', async ({ page }) => {
    await page.goto('/dilekce-olustur/');
    await page.locator('#f-template').selectOption('izin');
    await page.locator('#f-body').fill('Kendi yazdığım özel metin.');
    await page.locator('#f-template').selectOption('sikayet');
    await expect(page.locator('#f-body')).toHaveValue('Kendi yazdığım özel metin.');
    await expect(page.locator('#tpl-status')).toContainText('üzerine yazılmadı');
    await page.locator('#tpl-reload').click();
    await expect(page.locator('#f-body')).toHaveValue(/şikâyet|incelenmesini/);
  });

  test('uzun metin ikinci sayfaya taşar; imza bloğu bölünmez', async ({ page }) => {
    await page.goto('/dilekce-olustur/');
    await page.locator('#f-makam').fill('Test Makamına');
    await page.locator('#f-body').fill(Array.from({ length: 45 }, (_, i) => `${i + 1}. paragraf: çalışan öğrenci ığdırlı güneşin altında gitti ve talebini yazdı.`).join('\n\n').slice(0, 5900));
    await fillSender(page);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    const pdf = readFileSync((await dl.path())!);
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(pdf)).getPageCount()).toBeGreaterThan(1);
    const text = await readPdfText(page, pdf);
    expect(text).toContain('Şükran Öztürk Çelik');
  });

  test('zorunlu alanlar boşsa Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/dilekce-olustur/');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Makam boş');
    await page.locator('#f-makam').fill('Bir Makama');
    await page.locator('#make-docx').click();
    await expect(page.locator('#error')).toContainText('Dilekçe metni boş');
    await page.locator('#f-body').fill('Talebim var.');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Ad soyad boş');
  });
});
