import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Case Converter (EN)', () => {
  test('converts to upper, lower, title and sentence case; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/case-converter/');
    await page.locator('#input').fill("the QUICK brown fox. it's a don't-stop day!\nnew line here");
    await page.locator('#op-upper').click();
    await expect(page.locator('#output')).toHaveValue("THE QUICK BROWN FOX. IT'S A DON'T-STOP DAY!\nNEW LINE HERE");
    await page.locator('#op-lower').click();
    await expect(page.locator('#output')).toHaveValue("the quick brown fox. it's a don't-stop day!\nnew line here");
    await page.locator('#op-title').click();
    await expect(page.locator('#output')).toHaveValue("The Quick Brown Fox. It's A Don't-Stop Day!\nNew Line Here");
    await page.locator('#op-sentence').click();
    await expect(page.locator('#output')).toHaveValue("The quick brown fox. It's a don't-stop day!\nNew line here");
    expect(external).toEqual([]);
    noErrors();
  });

  test('empty input shows an English error with a fix', async ({ page }) => {
    await page.goto('/en/case-converter/');
    await page.locator('#op-upper').click();
    await expect(page.locator('#error')).toContainText('Type or paste the text');
    await page.locator('#copy').click();
    await expect(page.locator('#error')).toContainText('no result to copy');
  });

  test('move result to input, download and clear work', async ({ page }) => {
    await page.goto('/en/case-converter/');
    await page.locator('#input').fill('hello world');
    await page.locator('#op-title').click();
    await page.locator('#use').click();
    await expect(page.locator('#input')).toHaveValue('Hello World');
    await expect(page.locator('#output')).toHaveValue('');
    await page.locator('#op-upper').click();
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(download.suggestedFilename()).toBe('converted-text.txt');
    await page.locator('#clear').click();
    await expect(page.locator('#input')).toHaveValue('');
    await expect(page.locator('#output')).toHaveValue('');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/case-converter/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /buyuk-kucuk-harf-donustur/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/case-converter\//);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#input').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#op-upper')).toBeFocused();
  });
});
