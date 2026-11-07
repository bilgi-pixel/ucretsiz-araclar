import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.use({ reducedMotion: 'reduce' });

test.describe('Flip a Coin (EN)', () => {
  test('one flip lands on heads or tails and counters update; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/flip-a-coin/');
    await expect(page.locator('#result-text')).toHaveText('Ready');
    await page.locator('#flip').click();
    await expect(page.locator('#result-text')).toHaveText(/^(Heads|Tails)$/);
    await expect(page.locator('.fc-coin')).toHaveCount(1);
    await expect(page.locator('#count-total')).toHaveText('1');
    const h = Number(await page.locator('#count-heads').innerText());
    const t = Number(await page.locator('#count-tails').innerText());
    expect(h + t).toBe(1);
    await expect(page.locator('#history li')).toHaveCount(1);
    expect(external).toEqual([]);
    noErrors();
  });

  test('ten coins at once: counts add up and look fair over many flips', async ({ page }) => {
    await page.goto('/en/flip-a-coin/');
    await page.locator('#coin-count').selectOption('10');
    for (let i = 0; i < 20; i++) { await page.locator('#flip').click(); await page.waitForTimeout(10); }
    await expect(page.locator('.fc-coin')).toHaveCount(10);
    await expect(page.locator('#count-total')).toHaveText('200');
    const h = Number(await page.locator('#count-heads').innerText());
    const t = Number(await page.locator('#count-tails').innerText());
    expect(h + t).toBe(200);
    // 200 fair flips: 60 to 140 heads is practically certain (more than 5 standard deviations wide)
    expect(h).toBeGreaterThan(60);
    expect(h).toBeLessThan(140);
    await expect(page.locator('#history li')).toHaveCount(20);
  });

  test('streak counter reports runs of the same side', async ({ page }) => {
    await page.goto('/en/flip-a-coin/');
    let sawStreak = false;
    for (let i = 0; i < 60 && !sawStreak; i++) {
      await page.locator('#flip').click();
      await page.waitForTimeout(10);
      sawStreak = /in a row/.test(await page.locator('#count-streak').innerText());
    }
    expect(sawStreak).toBe(true);
    await expect(page.locator('#count-streak')).toContainText(/^\d+ (heads|tails) in a row$/);
  });

  test('reset clears counters and history', async ({ page }) => {
    await page.goto('/en/flip-a-coin/');
    await page.locator('#flip').click();
    await expect(page.locator('#history-wrap')).toBeVisible();
    await page.locator('#reset').click();
    await expect(page.locator('#count-total')).toHaveText('0');
    await expect(page.locator('#count-heads')).toHaveText('0');
    await expect(page.locator('#history-wrap')).toBeHidden();
    await expect(page.locator('.fc-coin')).toHaveCount(0);
    await expect(page.locator('#result-text')).toHaveText('Ready');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/flip-a-coin/');
    await page.locator('#coin-count').selectOption('10');
    await page.locator('#flip').click();
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /oyunlar\/yazi-tura/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/flip-a-coin\//);
    expect(await page.locator('script[type="application/ld+json"]').count()).toBe(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#coin-count').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#flip')).toBeFocused();
  });
});
