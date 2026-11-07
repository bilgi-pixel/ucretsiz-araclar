import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/pythagorean-theorem-calculator/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

test.describe('Pythagorean Theorem Calculator (EN)', () => {
  test('legs 3 and 4 give hypotenuse 5, area 6, primitive triple; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#a').fill('3');
    await page.locator('#b').fill('4');
    await page.getByRole('button', { name: 'Find missing side' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-big')).toHaveText('c = 5');
    await expect(page.locator('#r-area')).toHaveText('6');
    await expect(page.locator('#r-perimeter')).toHaveText('12');
    await expect(page.locator('#r-angles')).toContainText('36.87°');
    await expect(page.locator('#r-height')).toHaveText('2.4');
    await expect(page.locator('#r-triple')).toContainText('primitive Pythagorean triple');
    expect(external).toEqual([]);
    noErrors();
  });

  test('missing leg from hypotenuse and a leg; multiples of a triple', async ({ page }) => {
    await open(page);
    await page.locator('#a').fill('5');
    await page.locator('#c').fill('13');
    await page.locator('#c').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('b = 12');
    await expect(page.locator('#r-missing-label')).toHaveText('Leg b');
    await page.locator('#a').fill('6');
    await page.locator('#c').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('b = 8');
    await expect(page.locator('#r-triple')).toContainText('multiple of the (3, 4, 5) triple');
  });

  test('decimals and thousands separators; non-integer result', async ({ page }) => {
    await open(page);
    await page.locator('#a').fill('5');
    await page.locator('#b').fill('7');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('8.602325267');
    await expect(page.locator('#r-triple')).toContainText('No');
    await page.locator('#a').fill('1,500');
    await page.locator('#b').fill('2,000.5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toContainText('2,500');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#a')).toHaveValue('');
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#a').fill('3');
    await page.locator('#calc').click();
    await expect(err).toContainText('at least two side lengths');
    await page.locator('#b').fill('abc');
    await page.locator('#calc').click();
    await expect(err).toContainText('not a valid number');
    await page.locator('#b').fill('-4');
    await page.locator('#calc').click();
    await expect(err).toContainText('greater than zero');
    await page.locator('#b').fill('');
    await page.locator('#c').fill('2');
    await page.locator('#calc').click();
    await expect(err).toContainText('must be longer than either leg');
    await page.locator('#b').fill('1');
    await page.locator('#c').fill('2');
    await page.locator('#calc').click();
    await expect(err).toContainText('All three sides are filled in');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-pythagorean-theorem-calculator-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pisagor-teoremi-hesapla/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('#a').fill('3');
    await page.locator('#b').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('5');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
