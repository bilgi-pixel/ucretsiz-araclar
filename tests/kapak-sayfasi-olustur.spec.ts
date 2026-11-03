import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

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

async function readDocx(page: Page, buf: Buffer): Promise<{ xml: string; files: string[] }> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const fflate = await import('/vendor/fflate@0.8.3/fflate.browser.mjs');
    const files = fflate.unzipSync(data);
    return { xml: new TextDecoder().decode(files['word/document.xml']), files: Object.keys(files) };
  }, buf.toString('base64'));
}

async function fill(page: Page) {
  await page.locator('#f-school').fill('Dicle Üniversitesi');
  await page.locator('#f-faculty').fill('Mühendislik Fakültesi');
  await page.locator('#f-course').fill('Veri Yapıları');
  await page.locator('#f-title').fill('İkili Arama Ağaçlarının Karşılaştırmalı Analizi');
  await page.locator('#f-student').fill('Şükran Çelik');
  await page.locator('#f-number').fill('20261234');
  await page.locator('#f-teacher').fill('Dr. Öğr. Üyesi Ayşe Yılmaz');
  await page.locator('#f-city').fill('Diyarbakır');
  await page.locator('#f-date').fill('2026-11-04');
}

test.describe('Kapak Sayfası Oluşturucu', () => {
  test('alanları doldur → PDF iner, başlık ve ad soyad var; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kapak-sayfasi-olustur/');
    await fill(page);
    await expect(page.locator('#cover')).toContainText('Şükran Çelik');
    for (const layout of ['klasik', 'cizgili', 'kutulu', 'modern', 'sade']) {
      await page.locator('#opt-layout').selectOption(layout);
      await expect(page.locator('#cover')).toContainText('DİCLE ÜNİVERSİTESİ');
    }
    await page.locator('#opt-layout').selectOption('klasik');
    await page.locator('#logo-drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#logo-name')).toHaveText('fotoğraf-ş.png');
    await expect(page.locator('#cover img')).toHaveCount(1);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    expect(dl.suggestedFilename()).toMatch(/^kapak-.*\.pdf$/);
    const buf = readFileSync((await dl.path())!);
    const text = await readPdfText(page, buf);
    expect(text).toContain('Karşılaştırmalı');
    expect(text).toContain('Şükran Çelik');
    expect(text).toContain('DİCLE ÜNİVERSİTESİ');
    expect(text).toContain('04.11.2026');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('DOCX iner; document.xml içinde ad soyad var', async ({ page }) => {
    await page.goto('/kapak-sayfasi-olustur/');
    await fill(page);
    await page.locator('#opt-layout').selectOption('kutulu');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-docx').click()]);
    expect(dl.suggestedFilename()).toMatch(/\.docx$/);
    const { xml, files } = await readDocx(page, readFileSync((await dl.path())!));
    expect(files).toContain('word/document.xml');
    expect(xml).toContain('Şükran Çelik');
    expect(xml).toContain('İkili Arama');
    expect(xml).toContain('w:pgBorders');
  });

  test('boş zorunlu alan Türkçe hata verir; bozuk logo uyarılır', async ({ page }) => {
    await page.goto('/kapak-sayfasi-olustur/');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Zorunlu alanlar boş');
    await expect(page.locator('#error')).toContainText('Öğrenci adı soyadı');
    await expect(page.locator('#f-school')).toBeFocused();
    await page.locator('#make-docx').click();
    await expect(page.locator('#error')).toContainText('doldurup tekrar deneyin');
    await page.locator('#logo-drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('Logo dosyası okunamadı');
  });
});
