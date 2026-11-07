import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/factor-calculator/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

async function contentChecks(page) {
  await page.setViewportSize({ width: 360, height: 740 });
  await open(page);
  const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
  expect(words).toBeGreaterThanOrEqual(900);
  expect(await page.locator('.ba-ad').count()).toBe(3);
  for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-factor-calculator-${s}"]`)).toHaveCount(1);
  expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = ld.map((t) => JSON.parse(t));
  expect(parsed.map((p) => p['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
  for (const p of parsed) expect(p.inLanguage).toBe('en');
  await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/bolen-hesapla/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/factor-calculator/');
  await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
}

async function noOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe('Factor Calculator (EN)', () => {
  test('360 has 24 factors and abundant classification; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#n').fill('360');
    await page.getByRole('button', { name: 'Find factors' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-big')).toHaveText('360 has 24 factors');
    await expect(page.locator('#r-sum')).toHaveText('1,170');
    await expect(page.locator('#r-proper')).toHaveText('810');
    await expect(page.locator('#r-factors')).toHaveText('2³ × 3² × 5');
    await expect(page.locator('#r-perfect')).toContainText('Abundant');
    await expect(page.locator('#r-list')).toHaveText('1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360');
    expect(external).toEqual([]);
    noErrors();
  });

  test('prime, perfect number, one and thousands separators', async ({ page }) => {
    await open(page);
    await page.locator('#n').fill('13');
    await page.locator('#n').press('Enter');
    await expect(page.locator('#r-kind')).toHaveText('Prime number');
    await page.locator('#n').fill('28');
    await page.locator('#calc').click();
    await expect(page.locator('#r-perfect')).toContainText('Perfect number');
    await page.locator('#n').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-kind')).toContainText('Neither prime nor composite');
    await page.locator('#n').fill('1,200');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('1,200 has 30 factors');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#n').fill('abc');
    await page.locator('#calc').click();
    await expect(err).toContainText('Enter a positive whole number');
    await page.locator('#n').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('at least 1');
    await page.locator('#n').fill('2.5');
    await page.locator('#calc').click();
    await expect(err).toContainText('Enter a positive whole number');
    await page.locator('#n').fill('2000000000000');
    await page.locator('#calc').click();
    await expect(err).toContainText('too large');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await contentChecks(page);
    await page.locator('#n').fill('963761198400');
    await page.locator('#calc').click();
    await expect(page.locator('#r-count')).toBeVisible();
    await noOverflow(page);
  });
});
