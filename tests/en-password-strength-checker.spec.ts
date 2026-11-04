import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Password Strength Checker (EN)', () => {
  test('weak common password scores low, random long one scores high; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/password-strength-checker/');
    await expect(page.locator('#report')).toBeHidden();
    await expect(page.locator('#empty')).toBeVisible();
    await page.locator('#pw').fill('password');
    await expect(page.locator('#report')).toBeVisible();
    await expect(page.locator('#label')).toHaveText('Very weak');
    await expect(page.locator('#findings')).toContainText('most commonly used');
    await expect(page.locator('#offline')).toContainText('less than a second');
    await page.locator('#pw').fill('qwerty123');
    await expect(page.locator('#findings')).toContainText(/Keyboard pattern|most commonly used/);
    await page.locator('#pw').fill('k7#Vq!9zLm2@xT5wRb8$');
    await expect(page.locator('#label')).toHaveText('Very strong');
    await expect(page.locator('#findings')).toContainText('No known pattern');
    await expect(page.locator('#bits')).toContainText('bits');
    expect(external).toEqual([]);
    noErrors();
  });

  test('show/hide toggle and clear work; only the local list is fetched', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (r) => requests.push(new URL(r.url()).pathname));
    await page.goto('/en/password-strength-checker/');
    await page.locator('#pw').fill('Summer2024!');
    await expect(page.locator('#findings')).toContainText(/common word|Year|most commonly/);
    await page.locator('#toggle').click();
    await expect(page.locator('#pw')).toHaveAttribute('type', 'text');
    await expect(page.locator('#toggle')).toHaveText('Hide');
    await page.locator('#clear').click();
    await expect(page.locator('#pw')).toHaveValue('');
    await expect(page.locator('#pw')).toHaveAttribute('type', 'password');
    await expect(page.locator('#report')).toBeHidden();
    expect(requests.some((p) => p.endsWith('/common.json'))).toBe(true);
    expect(requests.some((p) => /summer2024/i.test(p))).toBe(false);
  });

  test('very long input is truncated with an English notice', async ({ page }) => {
    await page.goto('/en/password-strength-checker/');
    await page.locator('#pw').fill('aB3$'.repeat(40));
    await expect(page.locator('#trunc')).toBeVisible();
    await expect(page.locator('#trunc')).toContainText('first 128 characters');
    await expect(page.locator('#len')).toHaveText('128 characters');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/password-strength-checker/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /sifre-guc-test/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/password-strength-checker\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#pw').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#toggle')).toBeFocused();
  });
});
