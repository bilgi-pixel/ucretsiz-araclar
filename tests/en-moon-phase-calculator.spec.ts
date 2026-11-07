import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/moon-phase-calculator/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

async function calc(page, date: string, time: string, zone: string) {
  await page.locator('#tz').selectOption(zone);
  await page.locator('#date').fill(date);
  await page.locator('#time').fill(time);
  await page.getByRole('button', { name: 'Calculate moon phase' }).click();
}

test.describe('Moon Phase Calculator (EN)', () => {
  test('March 3, 2026 full moon in Eastern Time, next phases with DST; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await calc(page, '2026-03-03', '06:00', 'America/New_York');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-name')).toHaveText('Full Moon');
    await expect(page.locator('#r-illum')).toHaveText('100%');
    await expect(page.locator('#r-prev')).toContainText('Feb 17, 2026, 7:02 AM EST');
    await expect(page.locator('#r-next-full')).toContainText('Mar 3, 2026, 6:38 AM EST');
    await expect(page.locator('#r-next-last')).toContainText('Mar 11, 2026, 5:39 AM EDT');
    await expect(page.locator('#r-next-new')).toContainText('Mar 18, 2026, 9:24 PM EDT');
    await expect(page.locator('#r-next-first')).toContainText('Mar 25, 2026, 3:18 PM EDT');
    expect(external).toEqual([]);
    noErrors();
  });

  test('waning crescent in UTC on November 7, 2026', async ({ page }) => {
    await open(page);
    await calc(page, '2026-11-07', '09:00', 'UTC');
    await expect(page.locator('#r-name')).toHaveText('Waning Crescent');
    await expect(page.locator('#r-age')).toContainText('27.7 days (waning)');
    await expect(page.locator('#r-illum')).toHaveText('4%');
    await expect(page.locator('#r-next-new')).toContainText('Mon, Nov 9, 2026, 7:02 AM UTC');
    await expect(page.locator('#r-next-first')).toContainText('Nov 17, 2026, 11:48 AM UTC');
  });

  test('first quarter is waxing and 50% lit; Now button and Enter work', async ({ page }) => {
    await open(page);
    await calc(page, '2026-02-24', '12:30', 'UTC');
    await expect(page.locator('#r-name')).toHaveText('First Quarter');
    await expect(page.locator('#r-age')).toContainText('waxing');
    await expect(page.locator('#r-illum')).toContainText('50');
    await page.getByRole('button', { name: 'Now' }).click();
    await expect(page.locator('#r-name')).not.toHaveText('');
    await page.locator('#tz').selectOption('America/Los_Angeles');
    await page.locator('#date').fill('2025-11-05');
    await page.locator('#date').press('Enter');
    await expect(page.locator('#r-name')).toHaveText('Full Moon');
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#date').fill('');
    await page.locator('#calc').click();
    await expect(err).toContainText('date is not valid');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#date').fill('1850-01-01');
    await page.locator('#calc').click();
    await expect(err).toContainText('between 1900 and 2100');
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-moon-phase-calculator-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/ay-evresi-hesapla/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await calc(page, '2026-03-03', '06:00', 'America/New_York');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
