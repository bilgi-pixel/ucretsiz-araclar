import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Aspect Ratio Calculator (EN)', () => {
  test('finds the ratio, scales proportionally and calculates a crop; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/aspect-ratio-calculator/');
    await expect(page.locator('#r-big')).toHaveText('16:9');
    await expect(page.locator('#r-rows')).toContainText('Landscape');
    await expect(page.locator('#r-rows')).toContainText('Known ratio');
    await page.locator('#r-w').fill('1,000');
    await page.locator('#r-h').fill('250');
    await expect(page.locator('#r-big')).toHaveText('4:1');
    await page.locator('#r-w').fill('29.7');
    await page.locator('#r-h').fill('21');
    await expect(page.locator('#r-big')).toHaveText('99:70');
    await page.locator('#r-w').fill('1920');
    await page.locator('#r-h').fill('1080');
    await page.locator('#n-w').fill('1000');
    await expect(page.locator('#n-h')).toHaveValue('562.5');
    await expect(page.locator('#n-line')).toContainText('rounded for pixels');
    await page.locator('#chips button[data-a="1"]').click();
    await expect(page.locator('#n-h')).toHaveValue('1000');
    // Default crop: 4000x3000 to 4:5 -> 2400x3000, canvas 4000x5000.
    await expect(page.locator('#k-rows')).toContainText('2400 × 3000 pixels');
    await expect(page.locator('#k-rows')).toContainText('4000 × 5000 pixel canvas');
    expect(external).toEqual([]);
    noErrors();
  });

  test('invalid input shows English errors with a fix', async ({ page }) => {
    await page.goto('/en/aspect-ratio-calculator/');
    await page.locator('#r-w').fill('abc');
    await expect(page.locator('#r-error')).toContainText('could not be read as a number');
    await page.locator('#r-w').fill('-5');
    await expect(page.locator('#r-error')).toContainText('must be greater than zero');
    await page.locator('#r-w').fill('1920');
    await expect(page.locator('#r-error')).toBeHidden();
    await page.locator('#k-w').fill('4,5');
    await expect(page.locator('#k-error')).toContainText('could not be read as a number');
  });

  test('custom crop ratio and the preset table button work', async ({ page }) => {
    await page.goto('/en/aspect-ratio-calculator/');
    await page.locator('#k-preset').selectOption('custom');
    await expect(page.locator('#k-custom')).toBeVisible();
    await page.locator('#k-ra').fill('1');
    await page.locator('#k-rb').fill('1');
    await page.locator('#k-w').fill('1200');
    await page.locator('#k-h').fill('800');
    await expect(page.locator('#k-rows')).toContainText('800 × 800 pixels');
    await page.locator('#k-preset').selectOption('3:2');
    await expect(page.locator('#k-rows')).toContainText('already 3:2');
    await page.locator('#sec-table button[data-w="1080"][data-h="1350"]').first().click();
    await expect(page.locator('#r-big')).toHaveText('4:5');
    await page.locator('#r-copy').click();
    await expect(page.locator('#r-copy-status')).toContainText(/copied|Could not copy/);
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/aspect-ratio-calculator/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /en-boy-orani-hesapla/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/aspect-ratio-calculator\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#r-w').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#r-h')).toBeFocused();
  });
});
