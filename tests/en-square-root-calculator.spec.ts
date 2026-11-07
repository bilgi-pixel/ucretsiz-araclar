import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/square-root-calculator/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

test.describe('Square Root Calculator (EN)', () => {
  test('square root of 72 simplifies to 6√2; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#x').fill('72');
    await page.getByRole('button', { name: 'Calculate root' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-big')).toHaveText('√72 = 8.4852813742');
    await expect(page.locator('#r-simple')).toContainText('6√2');
    await expect(page.locator('#r-perfect')).toContainText('No, 72 is not a perfect square');
    await expect(page.locator('#r-lower')).toContainText('8² = 64');
    expect(external).toEqual([]);
    noErrors();
  });

  test('perfect squares, cube roots and the nth root label', async ({ page }) => {
    await open(page);
    await page.locator('#x').fill('144');
    await page.locator('#x').press('Enter');
    await expect(page.locator('#r-value')).toHaveText('12');
    await expect(page.locator('#r-perfect')).toContainText('Yes, 144 is a perfect square');
    await page.locator('#n').fill('3');
    await page.locator('#x').fill('-27');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('-3');
    await page.locator('#n').fill('4');
    await page.locator('#x').fill('16');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('2');
    await expect(page.locator('#r-big')).toContainText('4th root of 16');
  });

  test('power mode gives exact big integers and decimals', async ({ page }) => {
    await open(page);
    await page.getByLabel('Raise to a power (exponent)').check();
    await expect(page.locator('#calc')).toHaveText('Calculate power');
    await page.locator('#x').fill('2');
    await page.locator('#n').fill('64');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('18,446,744,073,709,551,616');
    await expect(page.locator('#r-digits')).toHaveText('20-digit exact result');
    await page.locator('#n').fill('-3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('0.125');
    await page.locator('#x').fill('16');
    await page.locator('#n').fill('0.5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('4');
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Number is empty');
    await page.locator('#x').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('not a valid number');
    await page.locator('#x').fill('-9');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('not a real number');
    await page.locator('#x').fill('9');
    await page.locator('#n').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('from 2 to 100');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-square-root-calculator-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/karekok-hesapla/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('#x').fill('1,000,000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('1,000');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
