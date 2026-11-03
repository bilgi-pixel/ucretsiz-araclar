import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

const pageCountOf = async (path: string) => {
  const { PDFDocument } = await import('pdf-lib');
  return (await PDFDocument.load(readFileSync(path))).getPageCount();
};

test.describe('Split PDF (EN)', () => {
  test('extract, split every page and delete pages from a 3-page PDF', async ({ page }) => {
    const external = trackExternalRequests(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/en/split-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');

    // Extract page 2
    await page.locator('#opt-range').fill('2');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    let [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button').first().click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-pages.pdf');
    expect(await pageCountOf((await dl.path())!)).toBe(1);

    // Every page separately: "Download all" + 3 part buttons
    await page.locator('#opt-mode').selectOption('single');
    await page.locator('#run').click();
    await expect(page.locator('#result-info')).toContainText('3 files');
    await expect(page.locator('#downloads button')).toHaveCount(4);
    [dl] = await Promise.all([page.waitForEvent('download'), page.locator('[data-download="1"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-2.pdf');

    // Delete pages 1 and 3 -> 1 page left
    await page.locator('#opt-mode').selectOption('delete');
    await page.locator('#opt-range').fill('1, 3');
    await page.locator('#run').click();
    [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button').first().click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-edited.pdf');
    expect(await pageCountOf((await dl.path())!)).toBe(1);
    expect(external).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('invalid range, deleting every page, damaged and encrypted files give English errors', async ({ page }) => {
    await page.goto('/en/split-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-range').fill('9-12');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText(/Invalid page range/);
    await page.locator('#opt-mode').selectOption('delete');
    await page.locator('#opt-range').fill('1-2');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('at least one page must remain');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('password-protected');
  });

  test('page structure: English, 3 ads, FAQ and 800+ words', async ({ page }) => {
    await page.goto('/en/split-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
