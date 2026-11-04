import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Stopwatch (EN)', () => {
  test('start, lap, stop and reset; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/stopwatch/');
    await expect(page.locator('#kr-status')).toHaveText('Ready');
    await expect(page.locator('#kr-lap')).toBeDisabled();
    await page.locator('#kr-start').click();
    await expect(page.locator('#kr-status')).toHaveText('Running');
    await expect(page.locator('#kr-start')).toHaveText('Stop');
    await page.waitForTimeout(300);
    await page.locator('#kr-lap').click();
    await page.waitForTimeout(300);
    await page.locator('#kr-lap').click();
    await expect(page.locator('#kr-laps li')).toHaveCount(2);
    await expect(page.locator('#kr-laps li').first()).toContainText('Lap 2');
    await page.locator('#kr-start').click();
    await expect(page.locator('#kr-status')).toHaveText('Paused');
    await expect(page.locator('#kr-start')).toHaveText('Resume');
    await expect(page.locator('#kr-summary')).toContainText('2 laps');
    await page.locator('#kr-reset').click();
    await expect(page.locator('#kr-status')).toHaveText('Ready');
    await expect(page.locator('#kr-laps-wrap')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('keyboard shortcuts and CSV export with English headers', async ({ page }) => {
    await page.goto('/en/stopwatch/');
    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await page.keyboard.press('Space');
    await expect(page.locator('#kr-status')).toHaveText('Running');
    await page.waitForTimeout(250);
    await page.keyboard.press('l');
    await expect(page.locator('#kr-laps li')).toHaveCount(1);
    await page.keyboard.press('Space');
    await expect(page.locator('#kr-status')).toHaveText('Paused');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#kr-csv').click()]);
    expect(download.suggestedFilename()).toBe('stopwatch-laps.csv');
    const text = await (await import('node:fs/promises')).readFile(await download.path() as string, 'utf8');
    expect(text).toContain('Lap,Split,Total time');
    await page.keyboard.press('r');
    await expect(page.locator('#kr-status')).toHaveText('Ready');
  });

  test('pure helpers format time correctly', async ({ page }) => {
    await page.goto('/en/stopwatch/');
    const r = await page.evaluate(() => {
      const w = (window as any).stopwatch;
      return { a: w.formatTime(3723450), b: w.formatLap(65430), c: w.analyzeLaps([{ split: 5, total: 5 }, { split: 9, total: 14 }, { split: 3, total: 17 }]) };
    });
    expect(r.a).toBe('01:02:03.45');
    expect(r.b).toBe('01:05.43');
    expect(r.c.fastest).toBe(2);
    expect(r.c.slowest).toBe(1);
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/stopwatch/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /kronometre/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/stopwatch\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#kr-start').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#kr-reset')).toBeFocused();
  });
});
