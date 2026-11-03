import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// SheetJS'i vendor klasöründen alıyoruz (UMD, Node'da da çalışır).
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require(join(__dirname, '..', 'web', 'vendor', 'xlsx@0.20.3', 'xlsx.full.min.js'));

/** 30 satırlık, Türkçe karakterli, biçimli sayı ve tarih içeren xlsx üretir. */
function makeXlsx(): Buffer {
  const aoa: any[][] = [['Öğrenci', 'Şehir', 'Tutar', 'Tarih']];
  for (let i = 1; i <= 30; i++) aoa.push([`Öğrenci ${i}`, i % 2 ? 'Şanlıurfa' : 'Çanakkale', 1234.5 * i, new Date(Date.UTC(2026, 0, i))]);
  const ws = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });
  for (let r = 1; r <= 30; r++) {
    ws[`C${r + 1}`].z = '#,##0.00';
    ws[`D${r + 1}`].z = 'dd.mm.yyyy';
  }
  const ws2 = XLSX.utils.aoa_to_sheet([['Ürün', 'Adet'], ['Kalem', 5]]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Liste');
  XLSX.utils.book_append_sheet(wb, ws2, 'İkinci');
  return Buffer.from(XLSX.write(wb, { type: 'buffer', bookType: 'xlsx', cellDates: true }));
}

/** PDF'in her sayfasının metnini tarayıcıdaki pdf.js ile okur. */
async function pdfText(page: Page, bytes: Buffer): Promise<string[]> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const d = await pdfjs.getDocument({ data }).promise;
    const out: string[] = [];
    for (let p = 1; p <= d.numPages; p++) out.push((await (await d.getPage(p)).getTextContent()).items.map((it: any) => it.str).join(' '));
    return out;
  }, bytes.toString('base64'));
}

test.describe("Excel'i PDF'e Çevir", () => {
  test('xlsx → PDF: sayfa sayısı, hücre değerleri, Türkçe karakter, biçimli sayı/tarih', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/excelden-pdfe/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'öğrenci listesi.xlsx', mimeType: 'application/octet-stream', buffer: makeXlsx() });
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#opt-sheet option')).toHaveCount(3); // 2 sayfa + "tüm sayfalar"
    await expect(page.locator('#preview-table tbody tr')).toHaveCount(30);
    await expect(page.locator('#preview-table')).toContainText('Şanlıurfa');
    await expect(page.locator('#preview-table')).toContainText(/1,234\.50|1\.234,50/);
    await page.locator('#opt-size').fill('14');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('öğrenci listesi.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
    expect(Math.round(doc.getPage(0).getSize().width)).toBe(595);
    const all = (await pdfText(page, out)).join(' ');
    expect(all).toContain('Öğrenci 30');
    expect(all).toContain('Şanlıurfa');
    expect(all).toContain('Çanakkale');
    expect(all).toContain('01.01.2026');
    expect(all).toMatch(/1,234\.50|1\.234,50/);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başlık her sayfada tekrar eder; yatay A4 ve çok sayfa', async ({ page }) => {
    await page.goto('/excelden-pdfe/');
    const aoa: any[][] = [['Kod', 'Açıklama']];
    for (let i = 1; i <= 200; i++) aoa.push([`K${i}`, `Satır açıklaması ${i}`]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Veri');
    const buf = Buffer.from(XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }));
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'uzun.xlsx', mimeType: 'application/octet-stream', buffer: buf });
    await page.locator('#opt-orient').selectOption('landscape');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const out = readFileSync((await dl.path())!);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBeGreaterThan(2);
    expect(Math.round(doc.getPage(0).getSize().width)).toBe(842);
    const texts = await pdfText(page, out);
    for (const t of texts) expect(t).toContain('Açıklama'); // başlık her sayfada
    expect(texts.join(' ')).toContain('Satır açıklaması 200');
  });

  test('CSV (noktalı virgül, Türkçe) açılır ve PDF olur', async ({ page }) => {
    await page.goto('/excelden-pdfe/');
    const csv = 'Ad;Şehir;Not\nÇağlar;İzmir;85,5\nGülşen;Ağrı;90\n';
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'liste.csv', mimeType: 'text/csv', buffer: Buffer.from('﻿' + csv, 'utf8') });
    await expect(page.locator('#preview-table')).toContainText('İzmir');
    await expect(page.locator('#preview-table thead th')).toHaveCount(4); // # + A,B,C
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('liste.pdf');
    const all = (await pdfText(page, readFileSync((await dl.path())!))).join(' ');
    expect(all).toContain('Çağlar');
    expect(all).toContain('Ağrı');
  });

  test('bozuk .xlsx ve yanlış uzantı Türkçe, çözüm öneren hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/excelden-pdfe/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.xlsx', mimeType: 'application/octet-stream', buffer: Buffer.from('bu bir excel dosyası değil, düz yazı') });
    await expect(page.locator('#error')).toContainText('geçerli bir Excel dosyası değil');
    await expect(page.locator('#error')).toContainText('Farklı Kaydet');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'resim.png', mimeType: 'image/png', buffer: Buffer.from([0x89, 0x50]) });
    await expect(page.locator('#error')).toContainText('Excel ya da CSV dosyası değil');
    expect(external).toEqual([]);
  });
});
