import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** Creates a real WebP in the browser (gradient square on a transparent canvas). */
async function makeWebp(page: Page, w = 120, h = 80): Promise<Buffer> {
  const b64 = await page.evaluate(async ([ww, hh]) => {
    const c = document.createElement('canvas');
    c.width = ww as number; c.height = hh as number;
    const ctx = c.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, ww as number, hh as number);
    g.addColorStop(0, '#d33'); g.addColorStop(1, '#36c');
    ctx.fillStyle = g; ctx.fillRect(10, 10, (ww as number) - 20, (hh as number) - 20);
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/webp', 0.9));
    const buf = new Uint8Array(await blob.arrayBuffer());
    let s = ''; buf.forEach((x) => (s += String.fromCharCode(x)));
    return btoa(s);
  }, [w, h]);
  return Buffer.from(b64, 'base64');
}

test.describe('WebP to JPG (EN)', () => {
  test('a single WebP downloads as a JPG with a JPEG signature; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/webp-to-jpg/');
    const webp = await makeWebp(page);
    expect(webp.subarray(8, 12).toString()).toBe('WEBP');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'landscape.webp', mimeType: 'image/webp', buffer: webp });
    await expect(page.locator('#files li')).toHaveCount(1);
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#files li .meta')).toContainText('JPG');
    await expect(page.locator('#result-info')).toContainText('quality 90%');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('landscape.jpg');
    const head = readFileSync((await dl.path())!).subarray(0, 3);
    expect(Array.from(head)).toEqual([0xff, 0xd8, 0xff]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('two WebP files download as a zip', async ({ page }) => {
    await page.goto('/en/webp-to-jpg/');
    const a = await makeWebp(page, 100, 60);
    const b = await makeWebp(page, 64, 64);
    await page.locator('#drop input[type=file]').setInputFiles([
      { name: 'one.webp', mimeType: 'image/webp', buffer: a },
      { name: 'two.webp', mimeType: 'image/webp', buffer: b },
    ]);
    await page.locator('#opt-quality').fill('0.7');
    await expect(page.locator('#opt-quality-out')).toHaveText('70%');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(dl.suggestedFilename()).toBe('one-jpg.zip');
    const zip = readFileSync((await dl.path())!);
    expect(zip.subarray(0, 2).toString()).toBe('PK');
    expect(zip.toString('latin1')).toContain('one.jpg');
    expect(zip.toString('latin1')).toContain('two.jpg');
  });

  test('a corrupt .webp gives an English error that suggests a fix', async ({ page }) => {
    await page.goto('/en/webp-to-jpg/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'broken.webp', mimeType: 'image/webp', buffer: Buffer.from('this is not an image') });
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('could not be converted');
    await expect(page.locator('#error')).toContainText('Download the file again');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('a non-image file is skipped with a message', async ({ page }) => {
    await page.goto('/en/webp-to-jpg/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') });
    await expect(page.locator('#error')).toContainText('not images and were skipped');
    await expect(page.locator('#files li')).toHaveCount(0);
  });

  test('page structure: hreflang, 3 ads, 7+ FAQ, 900+ words, no horizontal scroll at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/webp-to-jpg/');
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /webp-jpg-donustur/);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').allInnerTexts()).join(' ').split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBeTruthy();
  });
});
