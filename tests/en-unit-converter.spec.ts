import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page, qs = '') {
  await page.goto(`/en/unit-converter/${qs}`);
  await page.waitForLoadState('networkidle'); // make sure the module script is loaded before interacting
}

test.describe('Unit Converter (EN)', () => {
  test('1 in = 2.54 cm, works in reverse, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page, '?k=length&a=in&b=cm');
    await expect(page.locator('#val-b')).toHaveValue('2.54');
    await expect(page.locator('#result-line')).toHaveText('1 in = 2.54 cm');
    await page.locator('#val-b').fill('254');
    await expect(page.locator('#val-a')).toHaveValue('100');
    expect(external).toEqual([]);
    noErrors();
  });

  test('data: 1 GB = 1,024 MB (binary) and 1,000 MB (decimal); ?k=data preselects the category', async ({ page }) => {
    await open(page, '?k=data&a=gb&b=mb');
    await expect(page.locator('#cat')).toHaveValue('data');
    await expect(page.locator('#base-box')).toBeVisible();
    await expect(page.locator('#val-b')).toHaveValue('1,024');
    await page.getByLabel(/1000 base/).check();
    await expect(page.locator('#val-b')).toHaveValue('1,000');
  });

  test('temperature: 100 °C = 212 °F = 373.15 K; imperial volume and speed', async ({ page }) => {
    await open(page, '?k=temperature&a=c&b=f');
    await page.locator('#val-a').fill('100');
    await expect(page.locator('#val-b')).toHaveValue('212');
    await page.locator('#unit-b').selectOption('k');
    await expect(page.locator('#val-b')).toHaveValue('373.15');
    await open(page, '?k=volume&a=gal&b=l');
    await expect(page.locator('#val-b')).toHaveValue('3.7854118'); // 8 significant digits by default
    await open(page, '?k=speed&a=mph&b=kmh');
    await expect(page.locator('#val-b')).toHaveValue('1.609344');
  });

  test('popular-conversion chip switches category without reloading', async ({ page }) => {
    await open(page);
    await page.getByRole('link', { name: 'KB → MB' }).click();
    await expect(page.locator('#cat')).toHaveValue('data');
    await expect(page.locator('#unit-a')).toHaveValue('kb');
    await expect(page.locator('#unit-b')).toHaveValue('mb');
    await expect(page).toHaveURL(/k=data/);
    // swap button exchanges the two units
    await page.locator('#swap').click();
    await expect(page.locator('#unit-a')).toHaveValue('mb');
    await expect(page.locator('#unit-b')).toHaveValue('kb');
  });

  test('invalid input shows English errors that suggest a fix', async ({ page }) => {
    await open(page, '?k=length&a=m&b=km');
    await page.locator('#val-a').fill('abc');
    await expect(page.locator('#error')).toContainText('could not be read as a number');
    await expect(page.locator('#val-b')).toHaveValue('');
    await page.locator('#val-a').fill('-5');
    await expect(page.locator('#error')).toContainText('Negative values are not allowed');
    await open(page, '?k=temperature&a=c&b=k');
    await page.locator('#val-a').fill('-300');
    await expect(page.locator('#error')).toContainText('absolute zero');
    // an unknown category in the URL silently falls back to the default
    await open(page, '?k=unknown');
    await expect(page.locator('#cat')).toHaveValue('length');
  });

  test('page integrity: English metadata, badge, 3 ads outside the tool box, 800+ words, 6+ FAQ, related links resolve', async ({ page }) => {
    await page.goto('/en/unit-converter/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/unit-converter/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/birim-donustur/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-related a[href="../"]')).toBeVisible();
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    const hrefs = await page.locator('.ba-related a').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });
});
