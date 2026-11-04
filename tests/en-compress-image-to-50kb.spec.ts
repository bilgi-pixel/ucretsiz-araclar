import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, statSync } from 'node:fs';
import { PNG } from 'pngjs';

/** Noisy 500x500 PNG: hard to squeeze into JPG, so it behaves like a big photo. */
function noisyPng(size = 500): Buffer {
  const png = new PNG({ width: size, height: size });
  let seed = 12345;
  for (let i = 0; i < png.data.length; i += 4) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    png.data[i] = seed & 255; png.data[i + 1] = (seed >> 8) & 255; png.data[i + 2] = (seed >> 16) & 255; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

test.describe('Compress Image to 50 KB (EN)', () => {
  test('a noisy photo gets under 50 KB and becomes a JPG; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/compress-image-to-50kb/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'headshot.png', mimeType: 'image/png', buffer: noisyPng() });
    await expect(page.locator('#opt-kb')).toHaveValue('50');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('at most 50 KB');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('headshot-50kb.jpg');
    const path = (await dl.path())!;
    expect(statSync(path).size).toBeLessThanOrEqual(50 * 1024);
    expect(statSync(path).size).toBeGreaterThan(5 * 1024);
    expect(Array.from(readFileSync(path).subarray(0, 3))).toEqual([0xff, 0xd8, 0xff]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('quick buttons change the target; 20 KB is respected', async ({ page }) => {
    await page.goto('/en/compress-image-to-50kb/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'photo.png', mimeType: 'image/png', buffer: noisyPng() });
    await page.locator('.kb-quick button[data-kb="20"]').click();
    await expect(page.locator('#opt-kb')).toHaveValue('20');
    await expect(page.locator('.kb-quick button[data-kb="20"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.kb-quick button[data-kb="50"]')).toHaveAttribute('aria-pressed', 'false');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('photo-20kb.jpg');
    expect(statSync((await dl.path())!).size).toBeLessThanOrEqual(20 * 1024);
  });

  test('unreachable target with scaling off gives an English error that suggests a fix', async ({ page }) => {
    await page.goto('/en/compress-image-to-50kb/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'photo.png', mimeType: 'image/png', buffer: noisyPng() });
    await page.locator('#opt-scale').uncheck();
    await page.locator('#opt-kb').fill('5');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('could not be reduced', { timeout: 30_000 });
    await expect(page.locator('#error')).toContainText('also reduce the pixel dimensions');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('invalid target and a corrupt file show clear errors', async ({ page }) => {
    await page.goto('/en/compress-image-to-50kb/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'broken.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('this is not a jpeg') });
    await page.locator('#opt-kb').fill('');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('valid number of at least 5 KB');
    await page.locator('#opt-kb').fill('50');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('could not be processed');
    await expect(page.locator('#error')).toContainText('get it again');
  });

  test('a PDF is skipped; the small fixture converts', async ({ page }) => {
    await page.goto('/en/compress-image-to-50kb/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('not images');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('.kb-quick button[data-kb="200"]').click();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#files li .meta')).toContainText('quality');
  });

  test('content: 900+ words, 7+ FAQ, 3 ads, hreflang, JSON-LD, table, 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/compress-image-to-50kb/');
    const words = (await page.locator('.ba-content').allInnerTexts()).join(' ').split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-compress-image-to-50kb-${s}"]`)).toHaveCount(1);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /fotograf-50-kb-yap/);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    await expect(page.locator('.x-table')).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    await page.locator('#drop').focus();
    await expect(page.locator('#drop')).toBeFocused();
  });
});
