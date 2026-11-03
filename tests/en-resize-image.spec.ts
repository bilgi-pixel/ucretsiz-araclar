import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

test.describe('Resize Image (EN)', () => {
  test('200 px width gives a PNG, ratio lock fills height, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/resize-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#files li .meta')).toContainText('1×1');
    await expect(page.locator('#options')).toBeVisible();

    await page.locator('#opt-width').fill('200');
    await expect(page.locator('#opt-height')).toHaveValue('200');
    await expect(page.locator('#warn-upscale')).toBeVisible();
    await expect(page.locator('#preview-info')).toContainText('200×200');
    await expect(page.locator('#preview-info')).toContainText('Before');

    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('1 file resized');
    await expect(page.locator('#files li .meta')).toContainText('1×1 → 200×200');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Download this file').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş-200x200.png');
    const png = PNG.sync.read(readFileSync((await dl.path())!));
    expect(png.width).toBe(200);
    expect(png.height).toBe(200);

    expect(external).toEqual([]);
    noErrors();
  });

  test('preset + crop to JPG, two files download as a ZIP', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/resize-image/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('fotoğraf-ş.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('input[name="mode"][value="preset"]').check();
    await page.locator('#opt-preset').selectOption('fb-kapak');
    await expect(page.locator('#opt-fit')).toHaveValue('cover');
    await page.locator('#opt-format').selectOption('jpeg');
    await page.locator('#opt-rotate').selectOption('90');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 files resized');
    await expect(page.locator('#files li .meta').first()).toContainText('820×312');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-all').click()]);
    expect(dl.suggestedFilename()).toBe('resized-images.zip');
    const buf = readFileSync((await dl.path())!);
    expect([...buf.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(buf.toString('latin1')).toContain('-820x312.jpg');
    expect(external).toEqual([]);
  });

  test('percentage mode scales up, and empty pixel mode shows an error', async ({ page }) => {
    await page.goto('/en/resize-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('at least one pixel value');
    await page.locator('input[name="mode"][value="percent"]').check();
    await page.locator('#opt-percent-num').fill('300');
    await expect(page.locator('#opt-percent-out')).toHaveText('300%');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#files li .meta')).toContainText('→ 3×3');
  });

  test('PDF file gives a helpful English error', async ({ page }) => {
    await page.goto('/en/resize-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Only JPG, PNG, WebP');
    await expect(page.locator('#error')).toContainText('PDF to image');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
  });

  test('corrupt image with .png extension is reported as unreadable', async ({ page }) => {
    await page.goto('/en/resize-image/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not really a png') });
    await expect(page.locator('#error')).toContainText('could not be opened');
    await expect(page.locator('#files li .meta')).toHaveText('unreadable');
  });

  test('page integrity: English metadata, ads outside tool box, 800+ words, 6+ FAQ', async ({ page }) => {
    await page.goto('/en/resize-image/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/resize-image/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/resim-boyutlandir/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
