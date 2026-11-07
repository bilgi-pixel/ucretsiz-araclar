import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/speed-calculator/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

test.describe('Speed Calculator (EN)', () => {
  test('150 miles in 3 hours is 50 mph; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#dist-v').fill('150');
    await page.locator('#t-h').fill('3');
    await page.getByRole('button', { name: 'Calculate speed' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-big')).toHaveText('Speed = 50 mph (80.4672 km/h)');
    await expect(page.locator('#r-pace')).toContainText('1 min 12 s / mile');
    await expect(page.locator('#r-time')).toContainText('3 h 0 min 0 s');
    expect(external).toEqual([]);
    noErrors();
  });

  test('distance and time modes, with unit selection', async ({ page }) => {
    await open(page);
    await page.getByLabel('Find distance').check();
    await expect(page.locator('#calc')).toHaveText('Calculate distance');
    await expect(page.locator('#dist-v')).toBeDisabled();
    await page.locator('#speed-v').fill('65');
    await page.locator('#t-h').fill('2');
    await page.locator('#t-m').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toContainText('Distance = 162.5 miles');
    await page.getByLabel('Find time').check();
    await expect(page.locator('#calc')).toHaveText('Calculate time');
    await expect(page.locator('#t-h')).toBeDisabled();
    await page.locator('#speed-v').fill('60');
    await page.locator('#dist-v').fill('240');
    await page.locator('#dist-v').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('Time = 4 h 0 min 0 s');
    await page.locator('#speed-u').selectOption('km/h');
    await page.locator('#dist-u').selectOption('km');
    await page.locator('#speed-v').fill('90');
    await page.locator('#dist-v').fill('45');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('Time = 0 h 30 min 0 s');
  });

  test('running pace for a 5K in 25 minutes', async ({ page }) => {
    await open(page);
    await page.locator('#dist-u').selectOption('km');
    await page.locator('#dist-v').fill('5');
    await page.locator('#t-m').fill('25');
    await page.locator('#calc').click();
    await expect(page.locator('#r-pace')).toContainText('5 min 00 s / km');
    await expect(page.locator('#r-pace')).toContainText('8 min 03 s / mile');
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('enter both distance and time');
    await page.locator('#dist-v').fill('abc');
    await page.locator('#t-h').fill('1');
    await page.locator('#calc').click();
    await expect(err).toContainText('not a valid number');
    await page.locator('#dist-v').fill('-5');
    await page.locator('#calc').click();
    await expect(err).toContainText('cannot be negative');
    await page.locator('#dist-v').fill('10');
    await page.locator('#t-h').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('Time must be greater than zero');
    await page.getByLabel('Find time').check();
    await page.locator('#speed-v').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('Speed must be greater than zero');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-speed-calculator-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/hiz-hesapla/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('#dist-v').fill('100');
    await page.locator('#t-h').fill('2');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toContainText('Speed = 50 mph');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
