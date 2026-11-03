import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require(join(__dirname, '..', 'web', 'vendor', 'xlsx@0.20.3', 'xlsx.full.min.js'));

const ROWS = [
  ['Ürün', 'Adet', 'Tutar'],
  ['Kalem', '5', '1.250,50'],
  ['Defter', '12', '340,00'],
  ['Çanta', '3', '2.999,90'],
  ['Silgi', '40', '75,25'],
  ['Cetvel', '7', '120,00'],
];

/** pdf-lib ile 3 sütunlu hizalı bir tablo PDF'i üretir (başlık satırı tek parça, sayılar sağa hizalı). */
async function makeTablePdf(): Promise<Buffer> {
  const { PDFDocument, StandardFonts } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([595, 842]);
  page.drawText('Satis Raporu 2026', { x: 50, y: 790, size: 16, font });
  const xs = [50, 230, 480]; // 3. sütun sağa hizalı (480 bitiş)
  ROWS.forEach((row, i) => {
    const y = 740 - i * 22;
    page.drawText(row[0], { x: xs[0], y, size: 11, font });
    page.drawText(row[1], { x: xs[1], y, size: 11, font });
    const w = font.widthOfTextAtSize(row[2], 11);
    page.drawText(row[2], { x: xs[2] - w, y, size: 11, font });
  });
  return Buffer.from(await doc.save());
}

async function openTable(page: any) {
  await page.goto('/pdf-excel/');
  await page.locator('#drop input[type=file]').setInputFiles({ name: 'rapor tablosu.pdf', mimeType: 'application/pdf', buffer: await makeTablePdf() });
  await expect(page.locator('#workspace')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('#preview-table tbody tr')).toHaveCount(ROWS.length + 1); // + başlık satırı (rapor adı)
}

test.describe("PDF'den Excel'e (beta)", () => {
  test('3 sütunlu tablo → xlsx: 3 sütun, değerler ve sayılar doğru', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await openTable(page);
    await expect(page.locator('#preview-note')).toContainText('3 sütun');
    await expect(page.locator('.px-handle')).toHaveCount(2);
    await expect(page.locator('#preview-table')).toContainText('2.999,90');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-xlsx').click()]);
    expect(dl.suggestedFilename()).toBe('rapor tablosu.xlsx');
    const wb = XLSX.read(readFileSync((await dl.path())!), { type: 'buffer' });
    expect(wb.SheetNames).toEqual(['Tablo']);
    const rows: any[][] = XLSX.utils.sheet_to_json(wb.Sheets['Tablo'], { header: 1, defval: '' });
    expect(rows.length).toBe(ROWS.length + 1);
    expect(rows.every((r) => r.length === 3)).toBe(true);
    expect(rows[0][0]).toBe('Satis Raporu 2026');
    expect(rows[1]).toEqual(['Ürün', 'Adet', 'Tutar']);
    expect(rows[2]).toEqual(['Kalem', 5, 1250.5]);
    expect(rows[4]).toEqual(['Çanta', 3, 2999.9]);
    expect(rows[6]).toEqual(['Cetvel', 7, 120]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('CSV: noktalı virgül ve UTF-8 BOM; metin olarak bırakma seçeneği', async ({ page }) => {
    await openTable(page);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-csv').click()]);
    expect(dl.suggestedFilename()).toBe('rapor tablosu.csv');
    const raw = readFileSync((await dl.path())!);
    expect(Array.from(raw.subarray(0, 3))).toEqual([0xef, 0xbb, 0xbf]);
    const text = raw.toString('utf8');
    expect(text).toContain('Ürün;Adet;Tutar');
    expect(text).toContain('Kalem;5;1250,5');
    await page.locator('#opt-numfmt').selectOption('text');
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#download-csv').click()]);
    expect(readFileSync((await dl2.path())!).toString('utf8')).toContain('Kalem;5;1.250,50');
  });

  test('sütun ayracı klavye ve fareyle düzenlenir; ayraç eklenir ve silinir', async ({ page }) => {
    await openTable(page);
    const first = page.locator('.px-handle').first();
    await first.scrollIntoViewIfNeeded();
    const before = Number(await first.getAttribute('aria-valuenow'));
    await first.focus();
    await page.keyboard.press('Shift+ArrowRight');
    await expect(page.locator('.px-handle').first()).toHaveAttribute('aria-valuenow', String(before + 10));
    // fare ile sürükleme
    await page.evaluate(() => document.getElementById('stage')!.scrollIntoView({ behavior: 'instant', block: 'center' }));
    const box = (await page.locator('.px-handle').first().boundingBox())!;
    const vh = page.viewportSize()!.height;
    const y = Math.max(box.y, 0) + Math.min(box.height, vh - Math.max(box.y, 0)) / 2;
    await page.mouse.move(box.x + box.width / 2, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 - 20, y, { steps: 4 });
    await page.mouse.up();
    const after = Number(await page.locator('.px-handle').first().getAttribute('aria-valuenow'));
    expect(after).toBeLessThan(before + 10);
    // ayraç ekle → 4 sütun
    await page.locator('#add-sep').click();
    await expect(page.locator('.px-handle')).toHaveCount(3);
    await expect(page.locator('#preview-note')).toContainText('4 sütun');
    // Delete ile sil → 3 sütun
    await page.locator('.px-handle').nth(1).focus();
    await page.keyboard.press('Delete');
    await expect(page.locator('.px-handle')).toHaveCount(2);
    await expect(page.locator('#preview-note')).toContainText('3 sütun');
    // otomatik yeniden bul
    await page.locator('#add-sep').click();
    await page.locator('#auto-sep').click();
    await expect(page.locator('.px-handle')).toHaveCount(2);
  });

  test('her PDF sayfası ayrı Excel sayfası olabilir', async ({ page }) => {
    const { PDFDocument, StandardFonts } = await import('pdf-lib');
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    for (let p = 0; p < 2; p++) {
      const pg = doc.addPage([595, 842]);
      for (let i = 0; i < 4; i++) {
        pg.drawText(`A${p}${i}`, { x: 60, y: 700 - i * 20, size: 11, font });
        pg.drawText(`B${p}${i}`, { x: 300, y: 700 - i * 20, size: 11, font });
      }
    }
    await page.goto('/pdf-excel/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'iki.pdf', mimeType: 'application/pdf', buffer: Buffer.from(await doc.save()) });
    await expect(page.locator('#workspace')).toBeVisible({ timeout: 20_000 });
    await page.locator('#opt-multi').check();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-xlsx').click()]);
    const wb = XLSX.read(readFileSync((await dl.path())!), { type: 'buffer' });
    expect(wb.SheetNames).toEqual(['Sayfa 1', 'Sayfa 2']);
    expect(XLSX.utils.sheet_to_json(wb.Sheets['Sayfa 2'], { header: 1 })[0]).toEqual(['A10', 'B10']);
  });

  test('taranmış (metinsiz) PDF OCR yönlendirmesi verir', async ({ page }) => {
    const { PDFDocument, rgb } = await import('pdf-lib');
    const doc = await PDFDocument.create();
    doc.addPage([300, 300]).drawRectangle({ x: 20, y: 20, width: 100, height: 100, color: rgb(0.5, 0.5, 0.5) });
    await page.goto('/pdf-excel/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'tarama.pdf', mimeType: 'application/pdf', buffer: Buffer.from(await doc.save()) });
    await expect(page.locator('#error')).toContainText('seçilebilir metin yok');
    await expect(page.locator('#error')).toContainText('OCR');
    await expect(page.locator('#workspace')).toBeHidden();
  });

  test('bozuk, şifreli ve PDF olmayan dosya Türkçe hata verir; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-excel/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk ya da geçerli bir PDF değil|açılamadı/);
    await expect(page.locator('#workspace')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('Dosya şifreli görünüyor', { timeout: 20_000 });
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'tablo.xlsx', mimeType: 'application/octet-stream', buffer: Buffer.from('PK') });
    await expect(page.locator('#error')).toContainText('PDF dosyası değil');
    expect(external).toEqual([]);
  });
});
