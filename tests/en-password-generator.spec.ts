import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Password Generator (EN)', () => {
  test('random characters: length matches, all types present, strength meter fills, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/password-generator/');
    await page.locator('#opt-length').fill('20');
    await page.locator('#generate').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    expect(pw).toHaveLength(20);
    expect(pw).toMatch(/[a-z]/);
    expect(pw).toMatch(/[A-Z]/);
    expect(pw).toMatch(/[0-9]/);
    expect(pw).toMatch(/[^A-Za-z0-9]/);
    await expect(page.locator('#strength-bits')).toContainText(/\d+ bits/);
    await expect(page.locator('#strength-time')).toContainText('time to crack');
    await expect(page.locator('#strength')).toHaveAttribute('data-level', /strong|excellent/);

    // Generate five, all different
    await page.locator('#opt-count').selectOption('5');
    await page.locator('#generate').click();
    await expect(page.locator('#outputs li')).toHaveCount(5);
    const all = await page.locator('#outputs .pw').allTextContents();
    expect(new Set(all).size).toBe(5);
    expect(external).toEqual([]);
    noErrors();
  });

  test('exclude look-alike characters and letters-and-numbers-only selection', async ({ page }) => {
    await page.goto('/en/password-generator/');
    await page.locator('#opt-length').fill('64');
    await page.locator('#opt-symbol').uncheck();
    await page.locator('#opt-lookalike').check();
    await page.locator('#opt-count').selectOption('5');
    await page.locator('#generate').click();
    const all = await page.locator('#outputs .pw').allTextContents();
    for (const pw of all) {
      expect(pw).toHaveLength(64);
      expect(pw).toMatch(/^[A-Za-z0-9]+$/);
      expect(pw).not.toMatch(/[0O1lI]/);
    }
  });

  test('copy button writes the password to the clipboard', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission is Chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/en/password-generator/');
    await page.locator('#generate').click();
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    await page.locator('#outputs button[data-copy]').first().click();
    await expect(page.locator('#outputs button[data-copy]').first()).toHaveText('Copied');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toBe(pw);
  });

  test('passphrase: N English words, chosen separator, capitalized words, optional number', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/password-generator/');
    await page.locator('#mode-phrase').check();
    await expect(page.locator('#panel-phrase')).toBeVisible();
    await expect(page.locator('#panel-random')).toBeHidden();
    // The hint reports the real size of the English word list
    const listSize = Number(await page.locator('#word-count').textContent());
    expect(listSize).toBeGreaterThanOrEqual(400);
    await page.locator('#opt-words').fill('6');
    await page.locator('#opt-sep').selectOption('.');
    await page.locator('#generate').click();
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    const words = pw.split('.');
    expect(words).toHaveLength(6);
    for (const w of words) expect(w).toMatch(/^[A-Z][a-z]+$/);
    // Append a number
    await page.locator('#opt-num').check();
    await page.locator('#generate').click();
    const pw2 = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    const parts = pw2.split('.');
    expect(parts).toHaveLength(7);
    expect(parts[6]).toMatch(/^\d{2}$/);
    expect(external).toEqual([]);
  });

  test('PIN: digits only, matching length, rated weak', async ({ page }) => {
    await page.goto('/en/password-generator/');
    await page.locator('#mode-pin').check();
    await page.locator('#opt-pin-length').fill('8');
    await page.locator('#generate').click();
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    expect(pw).toMatch(/^\d{8}$/);
    await expect(page.locator('#strength')).toHaveAttribute('data-level', 'weak');
    await expect(page.locator('#strength-label')).toHaveText('Weak');
  });

  test('no character type selected shows a helpful English error; out-of-range length is clamped', async ({ page }) => {
    await page.goto('/en/password-generator/');
    for (const id of ['#opt-lower', '#opt-upper', '#opt-digit', '#opt-symbol']) await page.locator(id).uncheck();
    await page.locator('#generate').click();
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Select at least one character type');
    await expect(page.locator('#outputs li')).toHaveCount(0);
    // A length outside 8-64 is clamped
    await page.locator('#opt-lower').check();
    await page.locator('#opt-length').fill('500');
    await page.locator('#generate').click();
    await expect(page.locator('#error')).toBeHidden();
    expect((await page.locator('#outputs .pw').first().textContent()) ?? '').toHaveLength(64);
  });

  test('keyboard: arrow keys switch type, Enter generates', async ({ page }) => {
    await page.goto('/en/password-generator/');
    await page.locator('#mode-random').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#mode-phrase')).toBeChecked();
    await expect(page.locator('#panel-phrase')).toBeVisible();
    await page.locator('#generate').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
  });

  test('page integrity: English metadata, badge, 3 ads outside the tool box, 800+ words, 6+ FAQ, related links resolve', async ({ page }) => {
    await page.goto('/en/password-generator/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/password-generator/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/sifre-uret/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-badges li')).toHaveCount(3);
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
