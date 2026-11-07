import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/shoe-size-converter/';
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
  for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-shoe-size-converter-${s}"]`)).toHaveCount(1);
  expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = ld.map((t) => JSON.parse(t));
  expect(parsed.map((p) => p['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
  for (const p of parsed) expect(p.inLanguage).toBe('en');
  await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/ayakkabi-numarasi-donustur/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/shoe-size-converter/');
  await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
}

async function noOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe('Shoe Size Converter (EN)', () => {
  test('EU 42 converts to UK 8, US men 9, US women 10.5; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#value').fill('42');
    await page.getByRole('button', { name: 'Convert size' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-uk')).toHaveText('8');
    await expect(page.locator('#r-usm')).toHaveText('9');
    await expect(page.locator('#r-usw')).toHaveText('10.5');
    await expect(page.locator('#r-cm')).toHaveText('26.5 cm');
    await expect(page.locator('#r-in')).toHaveText('10.4 in');
    await expect(page.locator('#result .t-note')).toContainText('approximate');
    expect(external).toEqual([]);
    noErrors();
  });

  test('other systems and foot length, with live update on system change', async ({ page }) => {
    await open(page);
    await page.locator('#system').selectOption('usm');
    await expect(page.locator('#value-hint')).toContainText("US men's");
    await page.locator('#value').fill('9');
    await page.locator('#value').press('Enter');
    await expect(page.locator('#r-eu')).toHaveText('42');
    await page.locator('#system').selectOption('cm');
    await page.locator('#value').fill('26.5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-eu')).toHaveText('42');
    await page.locator('#system').selectOption('uk');
    await page.locator('#value').fill('8');
    await page.locator('#value').press('Enter');
    await expect(page.locator('#r-usw')).toHaveText('10.5');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#value').fill('abc');
    await page.locator('#calc').click();
    await expect(err).toContainText('Enter a valid number');
    await page.locator('#value').fill('80');
    await page.locator('#calc').click();
    await expect(err).toContainText('outside the usual shoe range');
    await page.locator('#system').selectOption('cm');
    await page.locator('#value').fill('50');
    await page.locator('#calc').click();
    await expect(err).toContainText('between 9 and 36');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await contentChecks(page);
    await page.locator('#value').fill('44');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toContainText('EU 44');
    await noOverflow(page);
  });
});
