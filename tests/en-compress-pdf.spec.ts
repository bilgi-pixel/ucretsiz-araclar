import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';

// Builds a large, photo-like PDF (noisy PNG does not compress) to prove the size target works.
async function makeBigPdf(): Promise<string> {
  const { PDFDocument } = await import('pdf-lib');
  const { PNG } = await import('pngjs');
  const w = 800, h = 1100;
  const png = new PNG({ width: w, height: h });
  randomBytes(w * h * 4).copy(png.data);
  for (let i = 3; i < w * h * 4; i += 4) png.data[i] = 255;
  const doc = await PDFDocument.create();
  const img = await doc.embedPng(PNG.sync.write(png));
  for (let p = 0; p < 2; p++) {
    const pg = doc.addPage([595.28, 841.89]);
    pg.drawImage(img, { x: 0, y: 0, width: 595.28, height: 841.89 });
  }
  const dir = join(tmpdir(), 'ba-en-compress-pdf');
  mkdirSync(dir, { recursive: true });
  const path = join(dir, 'scan-big.pdf');
  writeFileSync(path, await doc.save());
  return path;
}

test.describe('Compress PDF (EN)', () => {
  test('"Under 2 MB" target shrinks a big scan below 2 MB, no external requests', async ({ page }) => {
    const big = await makeBigPdf();
    const bigSize = readFileSync(big).length;
    expect(bigSize).toBeGreaterThan(2 * 1024 * 1024);
    const external = trackExternalRequests(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/en/compress-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(big);
    await expect(page.locator('#files li')).toContainText('2 pages');
    await page.locator('#opt-mode').selectOption('image');
    await page.locator('#opt-preset').selectOption('upload2');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    await expect(page.locator('#size-saved')).toContainText(/\d+% smaller/);
    await expect(page.locator('#result-note')).toContainText('Target reached');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('scan-big-compressed.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    expect(out.length).toBeLessThan(2 * 1024 * 1024);
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(out)).getPageCount()).toBe(2);
    expect(external).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('lossless and smallest modes give valid 3-page PDFs; ?target=5mb preselects', async ({ page }) => {
    await page.goto('/en/compress-pdf/?target=5mb');
    await expect(page.locator('#opt-preset')).toHaveValue('email5');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');
    await page.locator('#opt-mode').selectOption('lossless');
    await expect(page.locator('#field-preset')).toBeHidden();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    let [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-compressed.pdf');
    expect(readFileSync((await dl.path())!).subarray(0, 5).toString()).toBe('%PDF-');

    await page.locator('#opt-mode').selectOption('image');
    await page.locator('#opt-preset').selectOption('smallest');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(readFileSync((await dl.path())!))).getPageCount()).toBe(3);
    await page.locator('#opt-preset').selectOption('custom');
    await expect(page.locator('#field-dpi')).toBeVisible();
  });

  test('damaged, encrypted and non-PDF files give clear English errors', async ({ page }) => {
    await page.goto('/en/compress-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/damaged|not a valid/);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('password-protected');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('Please select a PDF file');
  });

  test('page structure: English, 3 ads, FAQ and 800+ words', async ({ page }) => {
    await page.goto('/en/compress-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
