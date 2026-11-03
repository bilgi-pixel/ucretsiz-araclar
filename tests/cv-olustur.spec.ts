import { test, expect, Page } from '@playwright/test';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

async function fillBasics(page: Page) {
  await page.locator('#f-name').fill('Çağlar Öğüt Şişman');
  await page.locator('#f-title').fill('Muhasebe Uzmanı');
  await page.locator('#f-email').fill('caglar@example.com');
  await page.locator('#f-phone').fill('0532 000 00 00');
  await page.locator('#f-city').fill('Diyarbakır');
  await page.locator('#f-summary').fill('Beş yıllık deneyimli, ığdırlı güneşin altında çalışan bir uzman.');
  await page.locator('#list-exp [data-k="role"]').first().fill('Kıdemli Muhasebeci');
  await page.locator('#list-exp [data-k="company"]').first().fill('Güneş Ltd. Şti.');
  await page.locator('#list-exp [data-k="period"]').first().fill('2019 – Günümüz');
  await page.locator('#list-exp [data-k="desc"]').first().fill('- Aylık kapanışları üç güne indirdim\n- e-Defter geçişini yönettim');
  await page.locator('#list-edu [data-k="school"]').first().fill('Dicle Üniversitesi');
  await page.locator('#f-skills').fill('Excel, Logo Tiger, İletişim');
}

test.describe('CV Oluşturucu', () => {
  test('form → PDF iner, pdf-lib açar, pdf.js metni okur; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/cv-olustur/');
    await fillBasics(page);
    await page.locator('[data-add="exp"]').click();
    await expect(page.locator('#list-exp .cv-row')).toHaveCount(2);
    await page.locator('#list-exp .cv-remove').nth(1).click();
    await expect(page.locator('#list-exp .cv-row')).toHaveCount(1);
    await expect(page.locator('#preview')).toContainText('Çağlar Öğüt Şişman');
    // fotoğraf + modern şablon
    await page.locator('#f-photo').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#photo-preview')).toBeVisible();
    await page.locator('#tpl-modern').check();
    await expect(page.locator('#preview .t-modern')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    expect(dl.suggestedFilename()).toBe('CV-Çağlar-Öğüt-Şişman.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(1);
    expect(Math.round(doc.getPage(0).getSize().width)).toBe(595);
    const text = await readPdfText(page, out);
    expect(text).toContain('Çağlar Öğüt Şişman');
    expect(text).toContain('ığdırlı');
    expect(text).toContain('Kıdemli Muhasebeci');
    expect(text).toContain('Diyarbakır');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('sade şablon + çok uzun içerik birden çok sayfaya taşar', async ({ page }) => {
    await page.goto('/cv-olustur/');
    await fillBasics(page);
    await page.locator('#tpl-ats').check();
    await page.locator('#list-exp [data-k="desc"]').first().fill(Array.from({ length: 80 }, (_, i) => `- Madde ${i + 1}: ÇÖĞÜŞİ görevleri düzenli biçimde yürüttüm ve raporladım`).join('\n'));
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    const out = readFileSync((await dl.path())!);
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(out)).getPageCount()).toBeGreaterThan(1);
    const text = await readPdfText(page, out);
    expect(text).toContain('Madde 80');
  });

  test('klasik şablon fotoğraflı PDF üretir', async ({ page }) => {
    await page.goto('/cv-olustur/');
    await fillBasics(page);
    await page.locator('#f-photo').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#photo-preview')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    const out = readFileSync((await dl.path())!);
    expect(out.length).toBeGreaterThan(20000);
    expect(await readPdfText(page, out)).toContain('Muhasebe Uzmanı');
  });

  test('JSON kaydet/yükle, otomatik taslak ve taslağı sil', async ({ page }) => {
    await page.goto('/cv-olustur/');
    await fillBasics(page);
    await page.locator('#tpl-ats').check();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#json-save').click()]);
    expect(dl.suggestedFilename()).toBe('cv-taslak-Çağlar-Öğüt-Şişman.json');
    const saved = join(mkdtempSync(join(tmpdir(), 'cvj-')), 'taslak.json'); writeFileSync(saved, readFileSync((await dl.path())!));
    const json = JSON.parse(readFileSync(saved, 'utf8'));
    expect(json.name).toBe('Çağlar Öğüt Şişman');
    expect(json.template).toBe('ats');
    expect(json.exp[0].role).toBe('Kıdemli Muhasebeci');

    // otomatik taslak: sayfayı yenileyince geri gelir
    await expect(page.locator('#draft-status')).toContainText('otomatik kaydedildi');
    await page.reload();
    await expect(page.locator('#f-name')).toHaveValue('Çağlar Öğüt Şişman');
    await expect(page.locator('#tpl-ats')).toBeChecked();

    // taslağı sil
    await page.locator('#draft-clear').click();
    await expect(page.locator('#f-name')).toHaveValue('');
    await page.reload();
    await expect(page.locator('#f-name')).toHaveValue('');

    // JSON'u geri yükle
    await page.locator('#json-input').setInputFiles(saved);
    await expect(page.locator('#f-name')).toHaveValue('Çağlar Öğüt Şişman');
    await expect(page.locator('#list-exp [data-k="company"]').first()).toHaveValue('Güneş Ltd. Şti.');
  });

  test('hatalar: ad boş, bozuk JSON, resim olmayan dosya', async ({ page }) => {
    await page.goto('/cv-olustur/');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Ad soyad boş');
    const dir = mkdtempSync(join(tmpdir(), 'cv-'));
    const bad = join(dir, 'bozuk.json');
    writeFileSync(bad, '{ bu json degil');
    await page.locator('#json-input').setInputFiles(bad);
    await expect(page.locator('#error')).toContainText('geçerli bir CV taslağı değil');
    const other = join(dir, 'baska.json');
    writeFileSync(other, JSON.stringify({ merhaba: 1 }));
    await page.locator('#json-input').setInputFiles(other);
    await expect(page.locator('#error')).toContainText('geçerli bir CV taslağı değil');
    await page.locator('#f-photo').setInputFiles({ name: 'not.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba') });
    await expect(page.locator('#error')).toContainText('resim dosyası değil');
  });
});
