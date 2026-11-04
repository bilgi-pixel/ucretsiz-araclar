import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Timer (EN)', () => {
  test('countdown starts, finishes and shows time is up; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/timer/');
    await expect(page.locator('#cd-display')).toHaveText('00:05:00');
    await page.locator('#cd-m').fill('0');
    await page.locator('#cd-s').fill('2');
    await expect(page.locator('#cd-display')).toHaveText('00:00:02');
    await page.locator('#cd-start').click();
    await expect(page.locator('#cd-status')).toHaveText('Running');
    await expect(page.locator('#cd-start')).toHaveText('Pause');
    await expect(page.locator('#cd-status')).toHaveText('Time is up', { timeout: 6000 });
    await expect(page.locator('#cd-display')).toHaveText('00:00:00');
    expect(external).toEqual([]);
    noErrors();
  });

  test('zero time shows an English error with a fix; presets work', async ({ page }) => {
    await page.goto('/en/timer/');
    await page.locator('#cd-m').fill('0');
    await page.locator('#cd-start').click();
    await expect(page.locator('#error')).toContainText('The time is zero or invalid');
    await page.locator('[data-preset="10"]').click();
    await expect(page.locator('#cd-display')).toHaveText('00:10:00');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('tabs: stopwatch laps and Pomodoro phases', async ({ page }) => {
    await page.goto('/en/timer/');
    await page.locator('#tab-sw').click();
    await expect(page.locator('#panel-sw')).toBeVisible();
    await page.locator('#sw-start').click();
    await page.waitForTimeout(250);
    await page.locator('#sw-lap').click();
    await expect(page.locator('#sw-laps li')).toHaveCount(1);
    await expect(page.locator('#sw-laps li').first()).toContainText('Lap 1');
    await page.locator('#sw-reset').click();
    await page.locator('#tab-pm').click();
    await expect(page.locator('#pm-display')).toHaveText('25:00');
    await expect(page.locator('#pm-phase')).toHaveText('Focus');
    await page.locator('#pm-skip').click();
    await expect(page.locator('#pm-phase')).toHaveText('Short break');
    await expect(page.locator('#pm-rounds')).toHaveText('Focus rounds completed: 1');
    await expect(page.locator('#pm-display')).toHaveText('05:00');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, arrow-key tabs', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/timer/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /zamanlayici/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/timer\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#tab-cd').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-sw')).toBeFocused();
    await expect(page.locator('#panel-sw')).toBeVisible();
  });
});
