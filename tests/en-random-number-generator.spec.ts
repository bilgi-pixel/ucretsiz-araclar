import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Random Number Generator (EN)', () => {
  test('unique numbers stay in range and are distinct; history fills; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/random-number-generator/');
    await page.locator('#n-min').fill('1');
    await page.locator('#n-max').fill('10');
    await page.locator('#n-count').fill('10');
    await page.locator('#n-unique').check();
    await page.locator('#n-order').selectOption('asc');
    await page.locator('#n-go').click();
    await expect(page.locator('#out')).toHaveText('1, 2, 3, 4, 5, 6, 7, 8, 9, 10');
    await expect(page.locator('#history li')).toHaveCount(1);

    await page.locator('#n-unique').uncheck();
    await page.locator('#n-min').fill('-5');
    await page.locator('#n-max').fill('5');
    await page.locator('#n-count').fill('200');
    await page.locator('#n-go').click();
    const nums = (await page.locator('#out').innerText()).split(', ').map(Number);
    expect(nums).toHaveLength(200);
    expect(nums.every((n) => n >= -5 && n <= 5)).toBe(true);
    expect(new Set(nums).size).toBeGreaterThan(5);
    expect(external).toEqual([]);
    noErrors();
  });

  test('dice, coin flip and list tabs work with keyboard-selectable tabs', async ({ page }) => {
    await page.goto('/en/random-number-generator/');
    await page.locator('#tab-n').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-d')).toHaveAttribute('aria-selected', 'true');
    await page.locator('#d-count').fill('3');
    await page.locator('#d-go').click();
    await expect(page.locator('.rs-face')).toHaveCount(3);
    await expect(page.locator('#out')).toContainText('=');

    await page.locator('#tab-c').click();
    await page.locator('#c-count').fill('1000');
    await page.locator('#c-go').click();
    const heads = Number(await page.locator('#out').getAttribute('data-heads'));
    const tails = Number(await page.locator('#out').getAttribute('data-tails'));
    expect(heads + tails).toBe(1000);
    expect(heads).toBeGreaterThan(400);
    expect(heads).toBeLessThan(600);

    await page.locator('#tab-l').click();
    await page.locator('#l-text').fill('Pizza\nTacos\n\nSushi');
    await page.locator('#l-count').fill('3');
    await page.locator('#l-go').click();
    const picked = (await page.locator('#out').innerText()).split(', ').sort();
    expect(picked).toEqual(['Pizza', 'Sushi', 'Tacos']);
  });

  test('bad input shows English errors that suggest a fix', async ({ page }) => {
    await page.goto('/en/random-number-generator/');
    await page.locator('#n-min').fill('10');
    await page.locator('#n-max').fill('1');
    await page.locator('#n-go').click();
    await expect(page.locator('#error')).toContainText('cannot be greater');
    await page.locator('#n-max').fill('12');
    await page.locator('#n-count').fill('5');
    await page.locator('#n-unique').check();
    await page.locator('#n-min').fill('1');
    await page.locator('#n-max').fill('3');
    await page.locator('#n-go').click();
    await expect(page.locator('#error')).toContainText('only 3 different numbers');
    await page.locator('#n-min').fill('');
    await page.locator('#n-go').click();
    await expect(page.locator('#error')).toContainText('Enter both');
    await page.locator('#tab-l').click();
    await page.locator('#l-go').click();
    await expect(page.locator('#error')).toContainText('list is empty');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/random-number-generator/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /rastgele-sayi/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
