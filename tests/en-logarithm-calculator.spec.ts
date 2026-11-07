import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/logarithm-calculator/';
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
  for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-logarithm-calculator-${s}"]`)).toHaveCount(1);
  expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = ld.map((t) => JSON.parse(t));
  expect(parsed.map((p) => p['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
  for (const p of parsed) expect(p.inLanguage).toBe('en');
  await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/us-logaritma-hesapla/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/logarithm-calculator/');
  await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
}

async function noOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe('Logarithm Calculator (EN)', () => {
  test('1024 and 2 give power, root and logs; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#a').fill('1024');
    await page.locator('#b').fill('2');
    await page.getByRole('button', { name: 'Calculate' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-pow')).toHaveText('1,048,576');
    await expect(page.locator('#r-root')).toHaveText('32');
    await expect(page.locator('#r-logb')).toHaveText('10');
    await expect(page.locator('#r-log10')).toHaveText('3.0102999566');
    await expect(page.locator('#r-ln')).toHaveText('6.9314718056');
    expect(external).toEqual([]);
    noErrors();
  });

  test('odd root of a negative number works, even root is explained', async ({ page }) => {
    await open(page);
    await page.locator('#a').fill('-8');
    await page.locator('#b').fill('3');
    await page.locator('#b').press('Enter');
    await expect(page.locator('#r-root')).toHaveText('-2');
    await expect(page.locator('#r-pow')).toHaveText('-512');
    await expect(page.locator('#r-logb')).toContainText('undefined');
    await page.locator('#a').fill('-4');
    await page.locator('#b').fill('2');
    await page.locator('#calc').click();
    await expect(page.locator('#r-root')).toContainText('not a real number');
    await page.locator('#a').fill('1000');
    await page.locator('#b').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-logb')).toHaveText('3');
    await expect(page.locator('#l-logb')).toHaveText('log base 10 of 1,000');
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#a').fill('abc');
    await page.locator('#b').fill('2');
    await page.locator('#calc').click();
    await expect(err).toContainText('Enter a valid number in "Number (a)"');
    await page.locator('#a').fill('8');
    await page.locator('#b').fill('');
    await page.locator('#calc').click();
    await expect(err).toContainText('Exponent / base / root index');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#b').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-logb')).toContainText('base must be positive');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await contentChecks(page);
    await page.locator('#a').fill('64');
    await page.locator('#b').fill('2');
    await page.locator('#calc').click();
    await expect(page.locator('#r-logb')).toHaveText('6');
    await noOverflow(page);
  });
});
