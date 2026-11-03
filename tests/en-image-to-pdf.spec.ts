import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

test.describe('JPG to PDF (EN)', () => {
  test('converts a PNG and a JPG into a 2-page PDF, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/en/image-to-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('exif-temizle-gps.jpg')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 pages');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.pdf');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(2);
    expect(external).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('unsupported files are skipped and an undecodable image gives an English error', async ({ page }) => {
    await page.goto('/en/image-to-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('Only JPG, PNG and WebP');
    await expect(page.locator('#actions')).toBeHidden();
    // Broken image: PNG header only, so the browser cannot decode it.
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not really a png') });
    await expect(page.locator('#files li')).toHaveCount(1);
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText(/not supported|damaged/);
  });

  test('page structure: English, 3 ads, FAQ and 800+ words', async ({ page }) => {
    await page.goto('/en/image-to-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
