import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Age Calculator (EN)', () => {
  test('born Feb 29, 2000, on Mar 1, 2026: 26 years; days, weekday, zodiac; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/age-calculator/');
    await page.waitForLoadState('networkidle'); // make sure the module script is loaded before submitting
    await page.locator('#birth').fill('2000-02-29');
    await page.locator('#ref').fill('2026-03-01');
    await page.getByRole('button', { name: 'Calculate age' }).click();
    await expect(page.locator('#r-years')).toHaveText('26 years');
    await expect(page.locator('#r-age')).toHaveText('26 years, 0 months, 1 day');
    await expect(page.locator('#r-days')).toHaveText('9,497 days');
    await expect(page.locator('#r-weekday')).toHaveText('Tuesday');
    await expect(page.locator('#r-zodiac')).toHaveText('Pisces');
    // From Mar 1, 2026 to Feb 28, 2027 is 364 days
    await expect(page.locator('#r-next')).toContainText('364 days to go');
    await expect(page.locator('#r-note')).toContainText('February 28');
    expect(external).toEqual([]);
    noErrors();
  });

  test('month-end rollover and birthday-today scenarios', async ({ page }) => {
    await page.goto('/en/age-calculator/');
    await page.waitForLoadState('networkidle');
    await page.locator('#birth').fill('1990-03-15');
    await page.locator('#ref').fill('2026-11-10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-age')).toHaveText('36 years, 7 months, 26 days');
    await expect(page.locator('#r-months')).toHaveText('439 months');
    await page.locator('#ref').fill('2026-03-15');
    await page.locator('#calc').click();
    await expect(page.locator('#r-age')).toHaveText('36 years, 0 months, 0 days');
    await expect(page.locator('#r-next')).toHaveText('The birthday is today!');
    // Born Jan 31, on Mar 1: must not produce negative days
    await page.locator('#birth').fill('2000-01-31');
    await page.locator('#ref').fill('2000-03-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-age')).toHaveText('0 years, 1 month, 1 day');
  });

  test('empty target date uses today', async ({ page }) => {
    await page.goto('/en/age-calculator/');
    await page.waitForLoadState('networkidle');
    await page.locator('#birth').fill('1900-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-note')).toContainText('(today)');
  });

  test('invalid input gives English errors that suggest a fix', async ({ page }) => {
    await page.goto('/en/age-calculator/');
    await page.waitForLoadState('networkidle');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Date of birth is missing or invalid');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#birth').fill('2026-06-01');
    await page.locator('#ref').fill('2026-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('cannot be after the target date');
    await page.locator('#birth').fill('1850-05-05');
    await page.locator('#ref').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('1900');
  });

  test('copy button writes a summary to the clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/en/age-calculator/');
    await page.waitForLoadState('networkidle');
    await page.locator('#birth').fill('1990-03-15');
    await page.locator('#ref').fill('2026-11-10');
    await page.locator('#calc').click();
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Result copied to the clipboard.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('36 years, 7 months, 26 days');
  });

  test('page integrity: English metadata, badge, 3 ads outside the tool box, 800+ words, 6+ FAQ, related links resolve', async ({ page }) => {
    await page.goto('/en/age-calculator/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/age-calculator/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/yas-hesapla/');
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
