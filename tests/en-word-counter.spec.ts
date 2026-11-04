import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Word Counter (EN)', () => {
  test('counts words, characters, sentences and reading time live; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/word-counter/');
    await expect(page.locator('#stat-words')).toHaveText('0');
    await page.locator('#input').fill("Hello world. It's a well-known fact!\n\nSecond paragraph here?");
    await expect(page.locator('#stat-words')).toHaveText('9');
    await expect(page.locator('#stat-sentences')).toHaveText('3');
    await expect(page.locator('#stat-paragraphs')).toHaveText('2');
    await expect(page.locator('#stat-lines')).toHaveText('3');
    await expect(page.locator('#stat-reading')).toHaveText('2 sec');
    await expect(page.locator('#actions')).toBeVisible();
    expect(external).toEqual([]);
    noErrors();
  });

  test('case, line tools and undo work; download produces a txt file', async ({ page }) => {
    await page.goto('/en/word-counter/');
    await page.locator('#input').fill('banana\napple\n\napple\ncherry');
    await page.locator('#op-remove-empty').click();
    await page.locator('#op-dedupe').click();
    await page.locator('#op-sort-az').click();
    await expect(page.locator('#input')).toHaveValue('apple\nbanana\ncherry');
    await page.locator('#op-upper').click();
    await expect(page.locator('#input')).toHaveValue('APPLE\nBANANA\nCHERRY');
    await page.locator('#undo').click();
    await expect(page.locator('#input')).toHaveValue('apple\nbanana\ncherry');
    await page.locator('#input').fill('Crème Brûlée à la Maison');
    await page.locator('#op-slug').click();
    await expect(page.locator('#input')).toHaveValue('creme-brulee-a-la-maison');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(download.suggestedFilename()).toBe('text.txt');
  });

  test('invalid Base64 shows an English error with a fix; valid round trip works', async ({ page }) => {
    await page.goto('/en/word-counter/');
    await page.locator('#input').fill('not base64 !!!');
    await page.locator('#op-base64-decode').click();
    await expect(page.locator('#error')).toContainText('not valid Base64');
    await page.locator('#input').fill('Hello');
    await page.locator('#op-base64-encode').click();
    await expect(page.locator('#input')).toHaveValue('SGVsbG8=');
    await page.locator('#op-base64-decode').click();
    await expect(page.locator('#input')).toHaveValue('Hello');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/word-counter/');
    await page.locator('#input').fill('the quick brown fox jumps over the lazy fox and the fox');
    await expect(page.locator('#top-words')).toContainText('fox (3)');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /metin-araclari/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
    await page.locator('#paste').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#clear')).toBeFocused();
  });
});
