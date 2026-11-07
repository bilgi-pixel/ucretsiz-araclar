import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Concrete Calculator (EN)', () => {
  test('12 x 10 ft slab, 4 in thick: cubic yards, order size and bags; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/concrete-calculator/');
    await page.locator('#f-len').fill('12');
    await page.locator('#f-wid').fill('10');
    await page.locator('#f-thk').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-head')).toContainText('1.63 cubic yards');
    await expect(page.locator('#r-net')).toContainText('1.48 yd');
    await expect(page.locator('#r-ft')).toHaveText('44.00 ft³');
    await expect(page.locator('#r-order')).toContainText('1.75 yd');
    await expect(page.locator('#r-b80')).toHaveText('74');
    await expect(page.locator('#r-b60')).toHaveText('98');
    await expect(page.locator('#r-b40')).toHaveText('147');
    await expect(page.locator('#r-cost')).toHaveText('No price entered');
    expect(external).toEqual([]);
    noErrors();
  });

  test('round columns with 0 percent waste and a price per yard', async ({ page }) => {
    await page.goto('/en/concrete-calculator/');
    await page.locator('#f-shape').selectOption('round');
    await expect(page.locator('#g-round')).toBeVisible();
    await expect(page.locator('#g-rect')).toBeHidden();
    await page.locator('#f-dia').fill('12');
    await page.locator('#f-hgt').fill('4');
    await page.locator('#f-qty').fill('4');
    await page.locator('#f-waste').fill('0');
    await page.locator('#f-price').fill('1,000');
    await page.locator('#calc').click();
    // 4 x pi x 0.5^2 x 4 ft = 12.566 ft3 = 0.4654 yd3
    await expect(page.locator('#r-total')).toHaveText('0.47 yd³');
    await expect(page.locator('#r-cost')).toHaveText('$465.42');
  });

  test('metric units convert to cubic yards and cubic meters', async ({ page }) => {
    await page.goto('/en/concrete-calculator/');
    await page.locator('#f-unit').selectOption('metric');
    await expect(page.locator('.u-thin').first()).toHaveText('cm');
    await page.locator('#f-len').fill('4');
    await page.locator('#f-wid').fill('3');
    await page.locator('#f-thk').fill('10');
    await page.locator('#f-waste').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#r-m')).toHaveText('1.200 m³');
    await expect(page.locator('#r-total')).toHaveText('1.57 yd³');
  });

  test('bad input gives English errors with a fix and focuses the field', async ({ page }) => {
    await page.goto('/en/concrete-calculator/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Length is empty');
    await expect(page.locator('#f-len')).toBeFocused();
    await page.locator('#f-len').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('could not be read');
    await page.locator('#f-len').fill('12');
    await page.locator('#f-wid').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('must be greater than zero');
    await page.locator('#f-wid').fill('10');
    await page.locator('#f-thk').fill('4');
    await page.locator('#f-waste').fill('80');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('between 0% and 50%');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('warns when thickness looks like feet, and clear resets the form', async ({ page }) => {
    await page.goto('/en/concrete-calculator/');
    await page.locator('#f-len').fill('12');
    await page.locator('#f-wid').fill('10');
    await page.locator('#f-thk').fill('200');
    await page.locator('#calc').click();
    await expect(page.locator('#warn')).toContainText('over 10 feet');
    await page.locator('#clear').click();
    await expect(page.locator('#f-len')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/concrete-calculator/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-ad').first()).toHaveAttribute('data-slot', 'en-concrete-calculator-a');
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /beton-hesapla/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/concrete-calculator\//);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    expect(await page.locator('script[type="application/ld+json"]').count()).toBe(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#f-shape').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#f-unit')).toBeFocused();
  });
});
