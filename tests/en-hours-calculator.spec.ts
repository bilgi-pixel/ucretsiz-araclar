import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Hours Calculator (EN)', () => {
  test('one day with a break; fill Mon-Fri gives 40 hours; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/hours-calculator/');
    await page.locator('#d0-start').fill('9:00 AM');
    await page.locator('#d0-end').fill('5:30 PM');
    await page.locator('#d0-break').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#d0-hours')).toContainText('8:00');
    await expect(page.locator('#r-total')).toHaveText('8:00 hours');
    await expect(page.locator('#r-dec')).toHaveText('8.00 hours');
    await page.locator('#fill').click();
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('40:00 hours');
    await expect(page.locator('#r-ot')).toHaveText('0:00 hours');
    expect(external).toEqual([]);
    noErrors();
  });

  test('overtime and gross pay with an hourly rate', async ({ page }) => {
    await page.goto('/en/hours-calculator/');
    await page.locator('#fill').click();
    await page.locator('#d5-start').fill('6am');
    await page.locator('#d5-end').fill('12pm');
    await page.locator('#f-rate').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('46:00 hours');
    await expect(page.locator('#r-reg')).toHaveText('40:00 hours');
    await expect(page.locator('#r-ot')).toHaveText('6:00 hours');
    // 40 x 20 + 6 x 30 = 980
    await expect(page.locator('#r-pay')).toHaveText('$980.00');
    await expect(page.locator('#r-days')).toHaveText('6');
  });

  test('night shift past midnight and 24-hour input', async ({ page }) => {
    await page.goto('/en/hours-calculator/');
    await page.locator('#d0-start').fill('10:00 PM');
    await page.locator('#d0-end').fill('6:30 AM');
    await page.locator('#d1-start').fill('0830');
    await page.locator('#d1-end').fill('17:00');
    await page.locator('#d1-break').fill('0:45');
    await page.locator('#calc').click();
    await expect(page.locator('#d0-hours')).toContainText('8:30');
    await expect(page.locator('#d1-hours')).toContainText('7:45');
    await expect(page.locator('#r-total')).toHaveText('16:15 hours');
  });

  test('bad input gives English errors with a fix', async ({ page }) => {
    await page.goto('/en/hours-calculator/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Enter at least one day');
    await page.locator('#d2-start').fill('9am');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Wednesday: enter both a start time and an end time');
    await expect(page.locator('#d2-end')).toBeFocused();
    await page.locator('#d2-end').fill('25:99');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('could not be read');
    await page.locator('#d2-end').fill('10am');
    await page.locator('#d2-break').fill('120');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('break is longer than the shift');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('warns about a very long day (probable AM/PM mistake) and clear resets', async ({ page }) => {
    await page.goto('/en/hours-calculator/');
    await page.locator('#d0-start').fill('8:00 AM');
    await page.locator('#d0-end').fill('5:30');
    await page.locator('#calc').click();
    await expect(page.locator('#warn')).toContainText('check AM/PM');
    await page.locator('#clear').click();
    await expect(page.locator('#d0-start')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/hours-calculator/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /saat-hesapla/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/hours-calculator\//);
    expect(await page.locator('script[type="application/ld+json"]').count()).toBe(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#d0-start').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#d0-end')).toBeFocused();
  });
});
