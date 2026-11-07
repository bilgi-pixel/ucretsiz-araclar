import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/unix-timestamp-converter/';
test.use({ timezoneId: 'America/New_York' });
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

test.describe('Unix Timestamp Converter (EN)', () => {
  test('1700000000 converts to UTC, US Eastern and device time; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#ts').fill('1700000000');
    await page.getByRole('button', { name: 'Convert to date' }).click();
    await expect(page.locator('#res-ts')).toBeVisible();
    await expect(page.locator('#o-iso')).toHaveText('2023-11-14T22:13:20.000Z');
    await expect(page.locator('#o-et')).toHaveText('11/14/2023 17:13:20 (Tuesday)');
    await expect(page.locator('#o-local')).toHaveText('11/14/2023 17:13:20 (Tuesday)');
    await expect(page.locator('#o-unit')).toHaveText('seconds');
    await expect(page.locator('#o-rel')).toContainText('ago');
    expect(external).toEqual([]);
    noErrors();
  });

  test('milliseconds are detected; 2147483647 is the Year 2038 moment; negatives work', async ({ page }) => {
    await open(page);
    await page.locator('#ts').fill('1700000000000');
    await page.locator('#ts').press('Enter');
    await expect(page.locator('#o-iso')).toHaveText('2023-11-14T22:13:20.000Z');
    await expect(page.locator('#o-unit')).toHaveText('milliseconds');
    await page.locator('#ts').fill('2147483647');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#o-iso')).toHaveText('2038-01-19T03:14:07.000Z');
    await expect(page.locator('#o-rel')).toContainText('in ');
    await page.locator('#ts').fill('-86400');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#o-iso')).toHaveText('1969-12-31T00:00:00.000Z');
  });

  test('date to timestamp in US Eastern, UTC and device zones', async ({ page }) => {
    await open(page);
    await page.locator('#dt').fill('2023-11-14T17:13:20');
    await page.locator('#tz').selectOption('et');
    await page.getByRole('button', { name: 'Convert to timestamp' }).click();
    await expect(page.locator('#res-dt')).toBeVisible();
    await expect(page.locator('#o-sec')).toHaveText('1700000000');
    await expect(page.locator('#o-ms')).toHaveText('1700000000000');
    await expect(page.locator('#o-iso2')).toHaveText('2023-11-14T22:13:20.000Z');
    await page.locator('#dt').fill('2023-11-14T22:13:20');
    await page.locator('#tz').selectOption('utc');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#o-sec')).toHaveText('1700000000');
    await page.locator('#dt').fill('2000-01-01T00:00');
    await page.locator('#tz').selectOption('et');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#o-sec')).toHaveText('946702800');
    await page.locator('#dt').fill('2023-11-14T17:13:20');
    await page.locator('#tz').selectOption('local');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#o-sec')).toHaveText('1700000000');
  });

  test('"Use current time" and the live Unix clock', async ({ page }) => {
    await open(page);
    const now = Math.floor(Date.now() / 1000);
    const shown = Number(await page.locator('#now-sec').textContent());
    expect(Math.abs(shown - now)).toBeLessThan(120);
    await page.getByRole('button', { name: 'Use current time' }).click();
    expect(Math.abs(Number(await page.locator('#ts').inputValue()) - now)).toBeLessThan(120);
    await page.getByRole('button', { name: 'Fill in now' }).click();
    expect(Math.abs(Number(await page.locator('#o-sec').textContent()) - now)).toBeLessThan(120);
  });

  test('bad input shows English errors with a fix', async ({ page }) => {
    await open(page);
    await page.locator('#ts-calc').click();
    await expect(page.locator('#error')).toContainText('The timestamp is empty');
    await page.locator('#ts').fill('2023-11-14');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#error')).toContainText('digits only');
    await page.locator('#ts').fill('99999999999999999');
    await page.locator('#unit').selectOption('ms');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#error')).toContainText('outside the supported range');
    await expect(page.locator('#res-ts')).toBeHidden();
    await page.locator('#dt-calc').click();
    await expect(page.locator('#error2')).toContainText('missing or invalid');
    await expect(page.locator('#res-dt')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-unix-timestamp-converter-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/unix-zaman-damgasi/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('#ts').fill('1700000000');
    await page.locator('#ts-calc').click();
    await page.locator('#dt').fill('2023-11-14T17:13:20');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#res-dt')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
