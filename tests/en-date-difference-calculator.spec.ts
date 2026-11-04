import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Date Difference Calculator (EN)', () => {
  test('days, weeks and years-months-days are exact; inclusive adds one day; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/date-difference-calculator/');
    await page.locator('#d1').fill('2026-01-01');
    await page.locator('#d2').fill('2026-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#r-days')).toHaveText('364 days');
    await expect(page.locator('#r-weeks')).toHaveText('52 weeks');
    await expect(page.locator('#r-ymd')).toHaveText('0 years, 11 months, 30 days');
    await expect(page.locator('#r-hours')).toHaveText('8,736 hours');
    await page.locator('#f-incl').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-days')).toHaveText('365 days');
    // leap day: Feb 28 -> Mar 1, 2024 is 2 days
    await page.locator('#f-incl').uncheck();
    await page.locator('#d1').fill('2024-02-28');
    await page.locator('#d2').fill('2024-03-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-days')).toHaveText('2 days');
    expect(external).toEqual([]);
    noErrors();
  });

  test('business days deduct weekends and observed US federal holidays', async ({ page }) => {
    await page.goto('/en/date-difference-calculator/');
    await page.locator('#d1').fill('2026-07-01');
    await page.locator('#d2').fill('2026-07-08');
    await page.locator('#f-wd').check();
    await expect(page.locator('#wrap-hol')).toBeVisible();
    await page.locator('#f-hol').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#r-bd')).toHaveText('5 business days');
    await expect(page.locator('#r-we')).toHaveText('2 days');
    // July 4, 2026 is a Saturday, observed on Friday July 3
    await page.locator('#f-hol').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-bd')).toHaveText('4 business days');
    await expect(page.locator('#r-hl')).toHaveText('1 day');
    // swapped dates are reordered with a note
    await page.locator('#swap').click();
    await page.locator('#calc').click();
    await expect(page.locator('#r-note')).toContainText('swapped');
  });

  test('"days until" mode and invalid input show English errors with a fix', async ({ page }) => {
    await page.goto('/en/date-difference-calculator/');
    await page.getByLabel('Days from today until a date').check();
    await expect(page.locator('#wrap-d1')).toBeHidden();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('target date is missing');
    const future = new Date(Date.now() + 10 * 86400000);
    const iso = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;
    await page.locator('#d2').fill(iso);
    await page.locator('#calc').click();
    await expect(page.locator('#r-main')).toContainText('10 days left');
    await page.getByLabel('Difference between two dates').check();
    await page.locator('#d1').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('start date is missing');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/date-difference-calculator/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /tarih-farki/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
