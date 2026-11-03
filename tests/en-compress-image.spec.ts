import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { statSync, readFileSync } from 'node:fs';

test.describe('Compress Image (EN)', () => {
  test('PNG to JPG under target KB, filename kept, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/compress-image/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('fotoğraf-ş.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#opt-target').fill('20');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 files');
    await expect(page.locator('#result-info')).toContainText('JPG');
    await expect(page.locator('#files li .meta').first()).toContainText('→');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Download this file').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.jpg');
    const path = (await dl.path())!;
    expect(statSync(path).size).toBeLessThan(20 * 1024);
    expect([...readFileSync(path).subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]); // JPEG SOI

    const downloads: string[] = [];
    page.on('download', (d) => downloads.push(d.suggestedFilename()));
    await page.locator('#download-all').click();
    await expect.poll(() => downloads.length).toBe(2);

    expect(external).toEqual([]);
    noErrors();
  });

  test('preset fills fields and PNG output works', async ({ page }) => {
    await page.goto('/en/compress-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#opt-preset').selectOption('email');
    await expect(page.locator('#opt-target')).toHaveValue('200');
    await expect(page.locator('#opt-width')).toHaveValue('1600');
    await page.locator('#opt-format').selectOption('png');
    await expect(page.locator('#opt-preset')).toHaveValue('custom');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Download this file').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.png');
  });

  test('non-image file shows a helpful English error', async ({ page }) => {
    await page.goto('/en/compress-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Only JPG, PNG and WebP');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
  });

  test('page integrity: English metadata, badge, 3 ads outside tool box, 800+ words, 6+ FAQ', async ({ page }) => {
    await page.goto('/en/compress-image/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/compress-image/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/resim-kucult/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-related a[href="../"]')).toBeVisible();
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
