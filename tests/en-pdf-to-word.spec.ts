import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

test.describe('PDF to Word (EN)', () => {
  test('2-page PDF becomes a DOCX (zip signature), no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/en/pdf-to-word/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('2 pages');
    await expect(page.locator('#opt-images')).not.toBeChecked();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 pages');
    await expect(page.locator('#result-info')).toContainText('iki-sayfa.docx');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('iki-sayfa.docx');
    const bytes = readFileSync((await dl.path())!);
    expect(Array.from(bytes.subarray(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(bytes.toString('latin1')).toContain('word/document.xml');
    expect(external).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('"Include page images" adds media to the DOCX', async ({ page }) => {
    await page.goto('/en/pdf-to-word/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-images').check();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(readFileSync((await dl.path())!).toString('latin1')).toContain('word/media/');
  });

  test('damaged, encrypted and non-PDF files give clear English errors', async ({ page }) => {
    await page.goto('/en/pdf-to-word/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/damaged|not a valid/);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('password-protected');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('Please select a PDF file');
  });

  test('page structure: English, beta label, 3 ads, FAQ and 800+ words', async ({ page }) => {
    await page.goto('/en/pdf-to-word/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('(beta)');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
