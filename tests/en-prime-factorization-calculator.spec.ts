import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/prime-factorization-calculator/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

test.describe('Prime Factorization Calculator (EN)', () => {
  test('360 factors into 2^3 x 3^2 x 5 with divisor stats; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#n').fill('360');
    await page.getByRole('button', { name: 'Calculate' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-big')).toHaveText('360 is not prime (it is a composite number).');
    await expect(page.locator('#r-factors')).toHaveText('2^3 × 3^2 × 5');
    await expect(page.locator('#r-count')).toHaveText('24');
    await expect(page.locator('#r-sum')).toHaveText('1,170');
    await expect(page.locator('#r-phi')).toHaveText('96');
    await expect(page.locator('#r-prev')).toHaveText('359');
    await expect(page.locator('#r-next')).toHaveText('367');
    await expect(page.locator('#r-divs')).toContainText('1, 2, 3, 4, 5, 6');
    expect(external).toEqual([]);
    noErrors();
  });

  test('primes, 1 and comma-separated input', async ({ page }) => {
    await open(page);
    await page.locator('#n').fill('97');
    await page.locator('#n').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('97 is a prime number.');
    await page.locator('#n').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toContainText('1 is not prime');
    await page.locator('#n').fill('1,000,003');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toContainText('1,000,003');
  });

  test('range lister: 25 primes below 100', async ({ page }) => {
    await open(page);
    await page.locator('#from').fill('1');
    await page.locator('#to').fill('100');
    await page.getByRole('button', { name: 'List primes' }).click();
    await expect(page.locator('#range-count')).toHaveText('There are 25 prime numbers between 1 and 100.');
    await expect(page.locator('#range-list')).toContainText('2, 3, 5, 7, 11');
    await expect(page.locator('#range-list')).toContainText('97');
    await page.locator('#to').fill('2000000');
    await page.locator('#range-calc').click();
    await expect(page.locator('#range-error')).toContainText('at most 1,000,000');
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Enter a number first');
    await page.locator('#n').fill('12abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('digits only');
    await page.locator('#n').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('cannot be factored');
    await page.locator('#n').fill('-5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Negative numbers');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-prime-factorization-calculator-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/asal-carpan-hesapla/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('#n').fill('999999999999989');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
