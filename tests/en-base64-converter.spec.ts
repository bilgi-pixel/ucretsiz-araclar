import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Base64 Encoder & Decoder (EN)', () => {
  test('text round trip with accents, URL-safe option; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/base64-converter/');
    await page.locator('#t-input').fill('café');
    await page.locator('#t-encode').click();
    await expect(page.locator('#t-output')).toHaveValue('Y2Fmw6k=');
    await page.locator('#t-input').fill('Hello, World!');
    await page.locator('#t-encode').click();
    await expect(page.locator('#t-output')).toHaveValue('SGVsbG8sIFdvcmxkIQ==');
    await page.locator('#t-input').fill('???>>>');
    await page.locator('#t-urlsafe').check();
    await page.locator('#t-encode').click();
    await expect(page.locator('#t-output')).toHaveValue('Pz8_Pj4-');
    await page.locator('#t-input').fill('Y2Fmw6k=');
    await page.locator('#t-decode').click();
    await expect(page.locator('#t-output')).toHaveValue('café');
    expect(external).toEqual([]);
    noErrors();
  });

  test('file to Base64 gives a data URI with an image preview; Base64 to file downloads', async ({ page }) => {
    await page.goto('/en/base64-converter/');
    await page.getByRole('tab', { name: 'File → Base64' }).click();
    const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==', 'base64');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'dot.png', mimeType: 'image/png', buffer: png });
    await expect(page.locator('#f-result')).toBeVisible();
    await expect(page.locator('#f-output')).toHaveValue(/^data:image\/png;base64,iVBORw0KGgo/);
    await expect(page.locator('#f-img-box')).toBeVisible();
    await expect(page.locator('#f-snip-img')).toHaveValue(/^<img src="data:image\/png/);
    await page.locator('#f-raw').check();
    await expect(page.locator('#f-output')).toHaveValue(/^iVBORw0KGgo/);

    await page.getByRole('tab', { name: 'Base64 → File' }).click();
    await page.locator('#d-input').fill(png.toString('base64'));
    await expect(page.locator('#d-info')).toContainText('image/png');
    await page.locator('#d-name').fill('pixel');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#d-download').click()]);
    expect(download.suggestedFilename()).toBe('pixel.png');
  });

  test('hex and URL tabs work; invalid input shows English errors with a fix', async ({ page }) => {
    await page.goto('/en/base64-converter/');
    await page.locator('#t-decode').click();
    await expect(page.locator('#error')).toContainText('no Base64 text');
    await page.locator('#t-input').fill('not*valid');
    await page.locator('#t-decode').click();
    await expect(page.locator('#error')).toContainText('Invalid Base64');
    await page.locator('#t-input').fill('AAAAA');
    await page.locator('#t-decode').click();
    await expect(page.locator('#error')).toContainText('length does not add up');

    await page.locator('#tab-hex').click();
    await page.locator('#h-input').fill('Hi é');
    await page.locator('#h-hex-enc').click();
    await expect(page.locator('#h-output')).toHaveValue('48 69 20 c3 a9');
    await page.locator('#h-input').fill('48 69 20 c3 a9');
    await page.locator('#h-hex-dec').click();
    await expect(page.locator('#h-output')).toHaveValue('Hi é');
    await page.locator('#h-input').fill('a b&c');
    await page.locator('#h-url-enc').click();
    await expect(page.locator('#h-output')).toHaveValue('a%20b%26c');
    await page.locator('#h-input').fill('abc');
    await page.locator('#h-hex-dec').click();
    await expect(page.locator('#error')).toContainText('number of digits must be even');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, keyboard tabs, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/base64-converter/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /base64-donustur/);
    await page.locator('#tab-text').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-file')).toHaveAttribute('aria-selected', 'true');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
