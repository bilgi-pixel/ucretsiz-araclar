import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.use({ reducedMotion: 'reduce' });

test.describe('Roll Dice (EN)', () => {
  test('rolls two d6 dice: faces, total and breakdown agree; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/roll-dice/');
    await page.locator('#roll').click();
    await expect(page.locator('.rd-die')).toHaveCount(2);
    const text = await page.locator('#breakdown').innerText();
    const m = text.match(/^(\d+) \+ (\d+) = (\d+)$/);
    expect(m).not.toBeNull();
    const [a, b, t] = [Number(m![1]), Number(m![2]), Number(m![3])];
    expect(a).toBeGreaterThanOrEqual(1);
    expect(a).toBeLessThanOrEqual(6);
    expect(b).toBeLessThanOrEqual(6);
    expect(a + b).toBe(t);
    await expect(page.locator('#total')).toHaveText(String(t));
    await expect(page.locator('#history li')).toHaveCount(1);
    expect(external).toEqual([]);
    noErrors();
  });

  test('d20 with a modifier stays in range over many rolls', async ({ page }) => {
    await page.goto('/en/roll-dice/');
    await page.locator('#dice-count').selectOption('1');
    await page.locator('#dice-sides').selectOption('20');
    await page.locator('#dice-mod').fill('+3');
    const seen = new Set<number>();
    for (let i = 0; i < 40; i++) {
      await page.locator('#roll').click();
      const m = (await page.locator('#breakdown').innerText()).match(/^(\d+) \+ 3 = (\d+)$/);
      expect(m).not.toBeNull();
      const v = Number(m![1]);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(20);
      expect(Number(m![2])).toBe(v + 3);
      seen.add(v);
      await page.waitForTimeout(15);
    }
    expect(seen.size).toBeGreaterThan(5);
  });

  test('invalid modifier shows an English error with a fix', async ({ page }) => {
    await page.goto('/en/roll-dice/');
    await page.locator('#dice-mod').fill('abc');
    await page.locator('#roll').click();
    await expect(page.locator('#error')).toContainText('must be a whole number');
    await expect(page.locator('#dice-mod')).toBeFocused();
    await expect(page.locator('.rd-die')).toHaveCount(0);
  });

  test('history keeps the last 20 rolls and clear resets everything', async ({ page }) => {
    await page.goto('/en/roll-dice/');
    await page.locator('#dice-count').selectOption('6');
    await expect(page.locator('#history-wrap')).toBeHidden();
    for (let i = 0; i < 23; i++) { await page.locator('#roll').click(); await page.waitForTimeout(15); }
    await expect(page.locator('.rd-die')).toHaveCount(6);
    await expect(page.locator('#history li')).toHaveCount(20);
    await expect(page.locator('#stat')).toContainText('23 rolls');
    await page.locator('#reset').click();
    await expect(page.locator('#history-wrap')).toBeHidden();
    await expect(page.locator('.rd-die')).toHaveCount(0);
    await expect(page.locator('#total')).toHaveText('–');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px, keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/roll-dice/');
    await page.locator('#dice-count').selectOption('6');
    await page.locator('#roll').click();
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /oyunlar\/zar-at/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/roll-dice\//);
    expect(await page.locator('script[type="application/ld+json"]').count()).toBe(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.locator('#dice-mod').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#roll')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#history li')).toHaveCount(2);
  });
});
