import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/volume-calculator/';
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
  for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-volume-calculator-${s}"]`)).toHaveCount(1);
  expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = ld.map((t) => JSON.parse(t));
  expect(parsed.map((p) => p['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
  for (const p of parsed) expect(p.inLanguage).toBe('en');
  await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/hacim-hesapla/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/volume-calculator/');
  await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
}

async function noOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe('Volume Calculator (EN)', () => {
  test('cylinder 5 x 10 cm gives 785.398163 cm3; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#f0').fill('5');
    await page.locator('#f1').fill('10');
    await page.getByRole('button', { name: 'Calculate volume' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-vol')).toHaveText('785.398163 cm³');
    await expect(page.locator('#r-l')).toHaveText('0.785398 L');
    expect(external).toEqual([]);
    noErrors();
  });

  test('cube switches fields and converts to liters and US gallons', async ({ page }) => {
    await open(page);
    await page.locator('#shape').selectOption('cube');
    await expect(page.locator('#f1-wrap')).toBeHidden();
    await expect(page.locator('#f0-label')).toHaveText('Side length (a)');
    await page.locator('#f0').fill('10');
    await page.locator('#f0').press('Enter');
    await expect(page.locator('#r-vol')).toHaveText('1,000 cm³');
    await expect(page.locator('#r-l')).toHaveText('1 L');
    await expect(page.locator('#r-gal')).toHaveText('0.264172 US gal');
    await expect(page.locator('#r-area')).toHaveText('600 cm²');
    await page.locator('#unit').selectOption('ft');
    await page.locator('#shape').selectOption('box');
    await page.locator('#f0').fill('2');
    await page.locator('#f1').fill('3');
    await page.locator('#f2').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-vol')).toHaveText('24 ft³');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('Enter a valid number');
    await page.locator('#f0').fill('5');
    await page.locator('#f1').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('must be greater than zero');
    await page.locator('#f1').fill('1,5');
    await page.locator('#calc').click();
    await expect(err).toContainText('Enter a valid number');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await contentChecks(page);
    await page.locator('#f0').fill('3');
    await page.locator('#f1').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-vol')).toBeVisible();
    await noOverflow(page);
  });
});
