import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/alphabetize-list/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // wait for the module script before submitting forms
}

test.describe('Alphabetize List (EN)', () => {
  test('sorts A to Z ignoring case; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#input').fill('pear\napple\nCherry\nbanana\nApple');
    await page.getByRole('button', { name: 'Sort list' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#output')).toHaveValue('apple\nApple\nbanana\nCherry\npear');
    await expect(page.locator('#r-stats')).toHaveText('5 lines sorted.');
    expect(external).toEqual([]);
    noErrors();
  });

  test('Z to A, duplicates and blank lines are removed', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('pear\n\napple\n  Apple  \nbanana\n\nCherry');
    await page.getByLabel('Z to A (reverse order)').check();
    await page.getByLabel('Remove duplicate lines').check();
    await page.getByRole('button', { name: 'Sort list' }).click();
    await expect(page.locator('#output')).toHaveValue('pear\nCherry\nbanana\napple');
    await expect(page.locator('#r-stats')).toContainText('1 duplicate line removed');
    await expect(page.locator('#r-stats')).toContainText('2 blank lines removed');
  });

  test('numeric sorting and sort by length', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('file10.txt\nfile2.txt\nfile1.txt');
    await page.getByRole('button', { name: 'Sort list' }).click();
    await expect(page.locator('#output')).toHaveValue('file1.txt\nfile10.txt\nfile2.txt');
    await page.getByLabel('Sort numbers by value').check();
    await page.getByRole('button', { name: 'Sort list' }).click();
    await expect(page.locator('#output')).toHaveValue('file1.txt\nfile2.txt\nfile10.txt');
    await page.locator('#mode').selectOption('len');
    await page.locator('#input').fill('ccc\na\nbb');
    await page.getByRole('button', { name: 'Sort list' }).click();
    await expect(page.locator('#output')).toHaveValue('a\nbb\nccc');
  });

  test('empty input shows an English error, Clear resets', async ({ page }) => {
    await open(page);
    await page.getByRole('button', { name: 'Sort list' }).click();
    await expect(page.locator('#error')).toContainText('nothing to sort');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#input').fill('b\na');
    await page.getByRole('button', { name: 'Sort list' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.locator('#input')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('content: 900+ words, 3 ads, 7+ FAQ, JSON-LD, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-alphabetize-list-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/alfabetik-sirala/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.locator('#input').fill('pear\napple\nbanana');
    await page.locator('#sort').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
