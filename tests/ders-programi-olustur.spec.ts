import { test, expect, Page } from '@playwright/test';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

async function fill(page: Page) {
  await page.locator('#f-title').fill('Haftalık Program');
  await page.locator('#f-name').fill('Çağrı Şahin');
  await page.locator('#cell-0-0').fill('Türkçe');
  await page.locator('#cell-2-1').fill('İngilizce');
}

test.describe('Ders Programı Oluşturucu', () => {
  test('2 hücre doldur → PDF iner, ders adları ve Türkçe karakter var; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ders-programi-olustur/');
    await page.evaluate(() => localStorage.clear());
    await fill(page);
    await page.locator('#opt-days').selectOption('6');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    expect(dl.suggestedFilename()).toBe('haftalık-program.pdf');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(0, 5).toString()).toBe('%PDF-');
    const text = await readPdfText(page, buf);
    expect(text).toContain('Türkçe');
    expect(text).toContain('İngilizce');
    expect(text).toContain('Çarşamba');
    expect(text).toContain('Cumartesi');
    expect(text).toContain('Çağrı Şahin');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('PNG iner', async ({ page }) => {
    await page.goto('/ders-programi-olustur/');
    await page.evaluate(() => localStorage.clear());
    await fill(page);
    await page.locator('#opt-theme').selectOption('bw');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-png').click()]);
    expect(dl.suggestedFilename()).toMatch(/\.png$/);
    const head = readFileSync((await dl.path())!).subarray(0, 8);
    expect(Array.from(head)).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  });

  test('JSON kaydet ve yükle; bozuk JSON Türkçe hata verir', async ({ page }) => {
    await page.goto('/ders-programi-olustur/');
    await page.evaluate(() => localStorage.clear());
    await fill(page);
    await page.locator('#cell-0-0').focus();
    await page.locator('#palette button[data-color="#bcd7f2"]').click();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#save-json').click()]);
    const json = JSON.parse(readFileSync((await dl.path())!, 'utf8'));
    expect(json.cells['0-0'].t).toBe('Türkçe');
    expect(json.cells['0-0'].c).toBe('#bcd7f2');
    const file = await dl.path();

    // Taslağı sil, sayfayı yenile, JSON'u geri yükle
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('#cell-0-0')).toHaveValue('');
    await page.locator('#json-drop input[type=file]').setInputFiles(file!);
    await expect(page.locator('#cell-0-0')).toHaveValue('Türkçe');
    await expect(page.locator('#cell-2-1')).toHaveValue('İngilizce');
    await expect(page.locator('#f-name')).toHaveValue('Çağrı Şahin');

    const bad = join(mkdtempSync(join(tmpdir(), 'ders-')), 'bozuk.json');
    writeFileSync(bad, '{ bu json degil');
    await page.locator('#json-drop input[type=file]').setInputFiles(bad);
    await expect(page.locator('#error')).toContainText('ders programı kaydı değil');
  });

  test('taslak yenilemeden sonra geri gelir; boş programda ve hatalı saatte Türkçe uyarı', async ({ page }) => {
    await page.goto('/ders-programi-olustur/');
    await page.evaluate(() => localStorage.clear());
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Programda hiç ders yok');
    await page.locator('#cell-1-1').fill('Fizik');
    await page.waitForTimeout(700); // otomatik kayıt gecikmesi
    await page.reload();
    await expect(page.locator('#cell-1-1')).toHaveValue('Fizik');
    await page.locator('#opt-manual').check();
    await page.locator('#opt-times').fill('08:30-09:10\nsaat yok');
    await expect(page.locator('#error')).toContainText('2. satır anlaşılamadı');
    await page.locator('#preset-label').scrollIntoViewIfNeeded();
    await page.locator('[data-preset="calisma"]').click();
    await expect(page.locator('#opt-days')).toHaveValue('7');
    await expect(page.locator('#grid thead th')).toHaveCount(8);
  });
});
