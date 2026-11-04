import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Percentage Calculator (EN)', () => {
  test('known examples for all five modes; no external requests, no page errors', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/percentage-calculator/');
    const first = page.locator('#r-rows dd').first();

    // 15% of 200 = 30
    await page.locator('#f-a').fill('200');
    await page.locator('#f-b').fill('15');
    await expect(first).toHaveText('30');
    await expect(page.locator('#r-title')).toHaveText('15% of 200');

    // Number with thousands separator: 18% of 2,500 = 450
    await page.locator('#f-a').fill('2,500');
    await page.locator('#f-b').fill('18');
    await expect(first).toHaveText('450');

    // 50 is what percent of 200 -> 25%
    await page.getByLabel('A is what percent of B?').check();
    await page.locator('#f-a').fill('50');
    await page.locator('#f-b').fill('200');
    await expect(first).toHaveText('25%');

    // 800 -> 1,000 = 25% increase; 1,000 -> 800 = 20% decrease
    await page.getByLabel('Percentage change from A to B').check();
    await page.locator('#f-a').fill('800');
    await page.locator('#f-b').fill('1,000');
    await expect(first).toHaveText('Increase 25%');
    await page.locator('#f-a').fill('1000');
    await page.locator('#f-b').fill('800');
    await expect(first).toHaveText('Decrease 20%');

    // Discount: 1,200 with 15% off = 1,020.00
    await page.getByLabel('Price after discount').check();
    await page.locator('#f-a').fill('1,200');
    await page.locator('#f-b').fill('15');
    await expect(first).toHaveText('1,020.00');

    // Increase / decrease: 1,000 + 18% = 1,180; decrease = 820
    await page.getByLabel('Increase / decrease A by B%').check();
    await expect(page.locator('#f-dir')).toBeVisible();
    await page.locator('#f-a').fill('1000');
    await page.locator('#f-b').fill('18');
    await expect(first).toHaveText('1,180');
    await page.locator('#f-dir').selectOption('decrease');
    await expect(first).toHaveText('820');

    expect(external).toEqual([]);
    noErrors();
  });

  test('copy button puts the result on the clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/en/percentage-calculator/');
    await page.locator('#f-a').fill('200');
    await page.locator('#f-b').fill('15');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Result copied.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Result 30');
  });

  test('invalid input shows an English error that suggests a fix', async ({ page }) => {
    await page.goto('/en/percentage-calculator/');
    await page.locator('#f-a').fill('abc');
    await page.locator('#f-b').fill('10');
    await expect(page.locator('#error')).toContainText('digits only');
    // Division by zero
    await page.getByLabel('A is what percent of B?').check();
    await page.locator('#f-a').fill('5');
    await page.locator('#f-b').fill('0');
    await expect(page.locator('#error')).toContainText('cannot be zero');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    // Fixing the input clears the error
    await page.locator('#f-b').fill('10');
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#r-rows dd').first()).toHaveText('50%');
  });

  test('page integrity: English metadata, badge, 3 ads outside the tool box, 800+ words, 6+ FAQ, related links resolve', async ({ page }) => {
    await page.goto('/en/percentage-calculator/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/percentage-calculator/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/yuzde-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-related a[href="../"]')).toBeVisible();
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    const hrefs = await page.locator('.ba-related a').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });
});
