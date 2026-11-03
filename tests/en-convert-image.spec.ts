import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Convert Image (EN)', () => {
  test('PNG to JPG downloads (JPEG header), name kept, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/convert-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#files li .meta')).toContainText('PNG');
    await expect(page.locator('#field-bg')).toBeVisible();
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('1 file');
    await expect(page.locator('#result-info')).toContainText('JPG');
    await expect(page.locator('#download-zip')).toBeHidden();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Download this file').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.jpg');
    expect([...readFileSync((await dl.path())!).subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]);
    expect(external).toEqual([]);
    noErrors();
  });

  test('PNG to WebP downloads (RIFF/WEBP) and two files come as a zip', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/convert-image/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('fotoğraf-ş.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-format').selectOption('webp');
    await expect(page.locator('#field-bg')).toBeHidden();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 files');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Download this file').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.webp');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(0, 4).toString('latin1')).toBe('RIFF');
    expect(buf.subarray(8, 12).toString('latin1')).toBe('WEBP');

    const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(zip.suggestedFilename()).toBe('fotoğraf-ş-webp.zip');
    const zbuf = readFileSync((await zip.path())!);
    expect([...zbuf.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(zbuf.toString('utf8')).toContain('(2).webp');
    expect(external).toEqual([]);
  });

  test('PNG output hides the quality field and returns a PNG signature', async ({ page }) => {
    await page.goto('/en/convert-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#opt-format').selectOption('png');
    await expect(page.locator('#field-quality')).toBeHidden();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Download this file').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.png');
    expect([...readFileSync((await dl.path())!).subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  });

  test('PDF and HEIC files give helpful English errors and the list stays empty', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/convert-image/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('not an image');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles({ name: 'IMG_0001.heic', mimeType: 'image/heic', buffer: Buffer.from('ftypheic') });
    await expect(page.locator('#error')).toContainText('HEIC');
    await expect(page.locator('#error')).toContainText('Most Compatible');
    await expect(page.locator('#files li')).toHaveCount(0);
    noErrors();
  });

  test('corrupt image with .jpg extension reports a conversion error', async ({ page }) => {
    await page.goto('/en/convert-image/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'fake.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('this is not a jpeg') });
    await expect(page.locator('#files li')).toHaveCount(1);
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('could not be converted');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('page integrity: English metadata, ads outside tool box, 800+ words, 6+ FAQ', async ({ page }) => {
    await page.goto('/en/convert-image/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/convert-image/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/resim-donustur/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
