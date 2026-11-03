import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

test.describe('Merge PDF (EN)', () => {
  test('merges two PDFs into 5 pages with bookmarks, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/en/merge-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#merge').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 files · 5 pages');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('merged.pdf');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(5);
    expect(external).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('damaged, encrypted and non-PDF input give clear English errors', async ({ page }) => {
    await page.goto('/en/merge-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await page.locator('#merge').click();
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/);
    await page.locator('#clear').click();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await page.locator('#merge').click();
    await expect(page.locator('#error')).toContainText('password-protected');
    await page.locator('#clear').click();
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('Only PDF files');
  });

  test('page structure: English, 3 ads away from buttons, FAQ and 800+ words', async ({ page }) => {
    await page.goto('/en/merge-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/merge-pdf/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdf-birlestir/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
