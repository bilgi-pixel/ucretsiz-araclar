import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PDFDocument } from 'pdf-lib';

/** İndirilen PDF'in tüm sayfa metinlerini pdf.js ile okur. */
async function pdfText(page: Page, buf: Buffer) {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs: any = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const d = await pdfjs.getDocument({ data }).promise;
    let out = '';
    for (let p = 1; p <= d.numPages; p++) out += (await (await d.getPage(p)).getTextContent()).items.map((it: any) => it.str).join(' ') + '\n';
    return out;
  }, buf.toString('base64'));
}

/** 2 kategori, 3 ürün doldurur. */
async function fillMenu(page: Page) {
  await page.locator('#biz-name').fill('Çınar Kafe');
  await page.getByLabel('Kategori 1 adı', { exact: true }).fill('Sıcak İçecekler');
  await page.getByLabel('Ürün adı (1.1)', { exact: true }).fill('Türk Kahvesi');
  await page.getByLabel('Fiyat (1.1)', { exact: true }).fill('85,50');
  await page.getByRole('button', { name: '+ Ürün ekle' }).click();
  await page.getByLabel('Ürün adı (1.2)', { exact: true }).fill('Şekerli Çay');
  await page.getByLabel('Fiyat (1.2)', { exact: true }).fill('25');
  await page.locator('#cat-add').click();
  await page.getByLabel('Kategori 2 adı', { exact: true }).fill('Tatlılar');
  await page.getByLabel('Ürün adı (2.1)', { exact: true }).fill('Şekerpare');
  await page.getByLabel('Fiyat (2.1)', { exact: true }).fill('110');
}

test.describe('QR Menü Oluşturucu', () => {
  test('menü PDF iner: ürün adı, fiyat ve Türkçe karakterler metinde', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/qr-menu-olustur/');
    await fillMenu(page);
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-pdf').click()]);
    expect(dl.suggestedFilename()).toBe('çınar-kafe-fiyat-listesi.pdf');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(0, 5).toString()).toBe('%PDF-');
    const text = await pdfText(page, buf);
    expect(text).toContain('Türk Kahvesi');
    expect(text).toContain('85,50');
    expect(text).toContain('Şekerpare');
    expect(text).toContain('SICAK İÇECEKLER');
    expect(text).toContain('Çınar Kafe');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('masa kartı PDF tek sayfa; bağlantı yoksa hata verir', async ({ page }) => {
    await page.goto('/qr-menu-olustur/');
    await fillMenu(page);
    await page.locator('#btn-card').click();
    await expect(page.locator('#error')).toContainText('menü bağlantısını girin');
    await page.locator('#menu-url').fill('menu');
    await page.locator('#btn-card').click();
    await expect(page.locator('#error')).toContainText('https://');
    await page.locator('#menu-url').fill('https://cinarkafe.example.com/menu.pdf');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-card').click()]);
    expect(dl.suggestedFilename()).toBe('çınar-kafe-masa-karti.pdf');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(1);
    const [w, h] = [doc.getPage(0).getWidth(), doc.getPage(0).getHeight()];
    expect(Math.round(w)).toBe(595);
    expect(Math.round(h)).toBe(842);
    await expect(page.locator('#error')).toBeHidden();
  });

  test('PNG görsel 1080×1920 iner', async ({ page }) => {
    await page.goto('/qr-menu-olustur/');
    await fillMenu(page);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-png').click()]);
    const b = readFileSync((await dl.path())!);
    expect(Array.from(b.subarray(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
    expect(b.readUInt32BE(16)).toBe(1080);
    expect(b.readUInt32BE(20)).toBe(1920);
  });

  test('JSON kaydet ve yükle; bozuk dosya anlaşılır hata verir', async ({ page }) => {
    await page.goto('/qr-menu-olustur/');
    await fillMenu(page);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-save').click()]);
    const json = readFileSync((await dl.path())!, 'utf8');
    expect(JSON.parse(json).cats).toHaveLength(2);

    await page.reload();
    await expect(page.locator('#biz-name')).toHaveValue('');
    await page.locator('#json-input').setInputFiles((await dl.path())!);
    await expect(page.locator('#biz-name')).toHaveValue('Çınar Kafe');
    await expect(page.getByLabel('Ürün adı (2.1)', { exact: true })).toHaveValue('Şekerpare');
    await expect(page.getByLabel('Fiyat (1.1)', { exact: true })).toHaveValue('85,50');

    const bad = join(mkdtempSync(join(tmpdir(), 'menu-')), 'bozuk.json');
    writeFileSync(bad, '{ bu json degil');
    await page.locator('#json-input').setInputFiles(bad);
    await expect(page.locator('#error')).toContainText('menü dosyası gibi görünmüyor');
  });

  test('boş menüde PDF hata verir; yukarı/aşağı taşı çalışır', async ({ page }) => {
    await page.goto('/qr-menu-olustur/');
    await page.locator('#btn-pdf').click();
    await expect(page.locator('#error')).toContainText('İşletme adını yazın');
    await page.locator('#biz-name').fill('Deneme');
    await page.locator('#btn-pdf').click();
    await expect(page.locator('#error')).toContainText('En az bir ürün');
    // sıralama
    await page.getByLabel('Ürün adı (1.1)', { exact: true }).fill('A');
    await page.getByLabel('Fiyat (1.1)', { exact: true }).fill('1');
    await page.getByRole('button', { name: '+ Ürün ekle' }).click();
    await page.getByLabel('Ürün adı (1.2)', { exact: true }).fill('B');
    await page.getByRole('button', { name: 'Ürün 1.2 yukarı taşı' }).click();
    await expect(page.getByLabel('Ürün adı (1.1)', { exact: true })).toHaveValue('B');
  });
});
