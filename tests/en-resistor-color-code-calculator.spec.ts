import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/resistor-color-code-calculator/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

test.describe('Resistor Color Code Calculator (EN)', () => {
  test('4 bands: yellow-violet-red-gold = 4.7 kΩ ±5%, range 4.465 – 4.935 kΩ; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.getByRole('button', { name: 'Find the value' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-big')).toHaveText('4.7 kΩ ±5%');
    await expect(page.locator('#r-value')).toContainText('4,700 Ω');
    await expect(page.locator('#r-range')).toHaveText('4.465 kΩ – 4.935 kΩ');
    await expect(page.locator('#r-ppm')).toBeHidden();
    await expect(page.locator('#r-bands li')).toHaveCount(4);
    await expect(page.locator('#r-svg rect')).toHaveCount(5);
    expect(external).toEqual([]);
    noErrors();
  });

  test('5 and 6 bands: 10 kΩ ±1% and temperature coefficient', async ({ page }) => {
    await open(page);
    await page.getByLabel('5 bands').first().check();
    await page.locator('#b0').selectOption('brown');
    await page.locator('#b1').selectOption('black');
    await page.locator('#b2').selectOption('black');
    await page.locator('#b3').selectOption('red');
    await page.locator('#b4').selectOption('brown');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('10 kΩ ±1%');
    await expect(page.locator('#r-range')).toHaveText('9.9 kΩ – 10.1 kΩ');
    await page.locator('input[name="n"][value="6"]').check();
    await expect(page.locator('#b5')).toBeVisible();
    await page.locator('#calc').click();
    await expect(page.locator('#r-ppm')).toHaveText('100 ppm/°C');
    await expect(page.locator('#r-bands li')).toHaveCount(6);
    await expect(page.locator('#r-big')).toHaveText('4.7 kΩ ±1%');
  });

  test('value to colors: 220 Ω, 4k7, 1M and 4.75k with 5 bands', async ({ page }) => {
    await open(page);
    await page.getByLabel('Value to colors').check();
    await expect(page.locator('#calc')).toHaveText('Find the colors');
    await page.locator('#val').fill('220');
    await page.locator('#val').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('220 Ω ±5%');
    const items = await page.locator('#r-bands li').allTextContents();
    expect(items.map((t) => t.split(' – ')[0])).toEqual(['1. Red', '2. Red', '3. Brown', '4. Gold']);
    await page.locator('#val').fill('4k7');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('4.7 kΩ ±5%');
    await page.locator('#val').fill('1M');
    await page.locator('#tol').selectOption('brown');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('1 MΩ ±1%');
    await expect(page.locator('#r-bands li').nth(2)).toContainText('Green');
    await page.getByLabel('5 bands').last().check();
    await page.locator('#val').fill('4.75k');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('4.75 kΩ ±1%');
    await expect(page.locator('#r-bands li')).toHaveCount(5);
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    await page.getByLabel('Value to colors').check();
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('resistance value is empty');
    await page.locator('#val').fill('abc');
    await page.locator('#calc').click();
    await expect(err).toContainText('could not be understood');
    await page.locator('#val').fill('4750');
    await page.locator('#calc').click();
    await expect(err).toContainText('Try the 5-band option');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#val').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('greater than zero');
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-resistor-color-code-calculator-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/direnc-renk-kodu-hesapla/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
