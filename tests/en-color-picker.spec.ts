import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors, fx } from './helpers';

test.describe('Color Picker (EN)', () => {
  test('HEX converts to RGB, HSL and CMYK; contrast is computed; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/color-picker/');
    await page.locator('#c-hex').fill('#ff0000');
    await expect(page.locator('#c-rgb')).toHaveValue('rgb(255, 0, 0)');
    await expect(page.locator('#c-hsl')).toHaveValue('hsl(0, 100%, 50%)');
    await expect(page.locator('#c-cmyk')).toHaveValue('cmyk(0%, 100%, 100%, 0%)');
    // Black on white = 21:1 and passes everything.
    await page.locator('#c-hex').fill('#000');
    await expect(page.locator('#ct-ratio')).toHaveText('21.00:1');
    await expect(page.locator('#ct-aaa')).toHaveText('Pass');
    // Light grey on white fails AA.
    await page.locator('#c-hex').fill('#cccccc');
    await expect(page.locator('#ct-aa')).toHaveText('Fail');
    // Code export uses English variable names.
    await expect(page.locator('#code-out')).toHaveValue(/--color-main: #cccccc;/);
    expect(external).toEqual([]);
    noErrors();
  });

  test('invalid values show English errors with an example', async ({ page }) => {
    await page.goto('/en/color-picker/');
    await page.locator('#c-hex').fill('#12');
    await expect(page.locator('#error')).toContainText('HEX value is not valid');
    await page.locator('#c-rgb').fill('rgb(300, 0, 0)');
    await expect(page.locator('#error')).toContainText('RGB value is not valid');
    await page.locator('#c-rgb').fill('12,34,56');
    await expect(page.locator('#c-hex')).toHaveValue('#0C2238');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('palette from image extracts colors; broken image shows a fix', async ({ page }) => {
    await page.goto('/en/color-picker/');
    await page.locator('#tab-palette').click();
    await page.locator('input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#pal-view')).toBeVisible();
    expect(await page.locator('#pal-list li').count()).toBeGreaterThan(0);
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-json').click()]);
    expect(download.suggestedFilename()).toMatch(/-palette\.json$/);
    await page.locator('input[type=file]').setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not an image') });
    await expect(page.locator('#error-p')).toContainText('could not be read');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, arrow-key tabs', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/color-picker/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /renk-secici/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/color-picker\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#tab-picker').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-palette')).toBeFocused();
  });
});
