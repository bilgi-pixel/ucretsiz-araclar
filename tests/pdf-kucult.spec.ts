import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';

// Fotoğraf ağırlıklı, büyük bir PDF üretir (gürültülü PNG → sıkışmaz); görsel modun küçülttüğünü ölçmek için.
async function makeBigPdf(): Promise<string> {
  const { PDFDocument } = await import('pdf-lib');
  const { PNG } = await import('pngjs');
  const w = 800, h = 1100;
  const png = new PNG({ width: w, height: h });
  const noise = randomBytes(w * h * 4);
  noise.copy(png.data);
  for (let i = 3; i < w * h * 4; i += 4) png.data[i] = 255;
  const pngBytes = PNG.sync.write(png);
  const doc = await PDFDocument.create();
  const img = await doc.embedPng(pngBytes);
  for (let p = 0; p < 2; p++) {
    const page = doc.addPage([595.28, 841.89]);
    page.drawImage(img, { x: 0, y: 0, width: 595.28, height: 841.89 });
  }
  const dir = join(tmpdir(), 'ba-pdf-kucult');
  mkdirSync(dir, { recursive: true });
  const path = join(dir, 'taranmış-büyük.pdf');
  writeFileSync(path, await doc.save());
  return path;
}

test.describe('PDF Küçült', () => {
  test('e-Devlet hedefi: büyük taranmış PDF 2 MB altına iner, dış istek yok', async ({ page }) => {
    const big = await makeBigPdf();
    const bigSize = readFileSync(big).length;
    expect(bigSize).toBeGreaterThan(2 * 1024 * 1024);

    const external = trackExternalRequests(page);
    await page.goto('/pdf-kucult/');
    await page.locator('#drop input[type=file]').setInputFiles(big);
    await expect(page.locator('#files li')).toContainText('2 sayfa');
    await page.locator('#opt-mode').selectOption('image');
    await page.locator('#opt-preset').selectOption('edevlet');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    await expect(page.locator('#size-saved')).toContainText(/%\d+ küçüldü/);
    await expect(page.locator('#result-note')).toContainText('hedefe ulaşıldı');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('taranmış-büyük-kucuk.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    expect(out.length).toBeLessThan(2 * 1024 * 1024);
    expect(out.length).toBeLessThan(bigSize);

    // Çıktı geçerli bir PDF mi: pdf-lib ile açılıp sayfa sayısı okunmalı.
    const { PDFDocument } = await import('pdf-lib');
    const check = await PDFDocument.load(out);
    expect(check.getPageCount()).toBe(2);
    expect(external).toEqual([]);
  });

  test('uc-sayfa.pdf: kayıpsız ve görsel mod geçerli 3 sayfalık PDF üretir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-kucult/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');

    // Kayıpsız mod
    await page.locator('#opt-mode').selectOption('lossless');
    await expect(page.locator('#field-preset')).toBeHidden();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('3 sayfa');
    let [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-kucuk.pdf');
    let out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');

    // Görsel mod, "En küçük"
    await page.locator('#opt-mode').selectOption('image');
    await expect(page.locator('#field-preset')).toBeVisible();
    await page.locator('#opt-preset').selectOption('smallest');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    out = readFileSync((await dl.path())!);
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(out)).getPageCount()).toBe(3);
    expect(external).toEqual([]);
  });

  test('?hedef=5mb ön ayarı seçer, elle ayar alanları görünür', async ({ page }) => {
    await page.goto('/pdf-kucult/?hedef=5mb');
    await expect(page.locator('#opt-preset')).toHaveValue('eposta');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-preset').selectOption('custom');
    await expect(page.locator('#field-dpi')).toBeVisible();
    await expect(page.locator('#field-quality')).toBeVisible();
  });

  test('bozuk ve şifreli PDF anlaşılır hata verir', async ({ page }) => {
    await page.goto('/pdf-kucult/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli/);
  });
});
