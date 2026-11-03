import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const bold = (s: string) => Array.from(s).map((c) => String.fromCodePoint(c.charCodeAt(0) >= 97 ? 0x1d41a + c.charCodeAt(0) - 97 : 0x1d400 + c.charCodeAt(0) - 65)).join('');

test.describe('Yazı Stilleri', () => {
  test('Merhaba kalın stilde Mathematical Bold, kopyala çalışır, dış istek yok', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/yazi-stili/');
    await page.locator('#text').fill('Merhaba');
    const card = page.locator('li[data-style="bold"]');
    await expect(card.locator('[data-out]')).toHaveText(bold('Merhaba'));
    expect(bold('Merhaba').codePointAt(0)).toBe(0x1d40c);
    expect(await page.locator('#list > li').count()).toBeGreaterThanOrEqual(20);
    await expect(page.locator('#warn-tr')).toBeHidden();
    await card.locator('button').click();
    await expect(card.locator('button')).toHaveText('Kopyalandı');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(bold('Merhaba'));
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Türkçe ş uyarısı çıkar, harf olduğu gibi kalır', async ({ page }) => {
    await page.goto('/yazi-stili/');
    await page.locator('#text').fill('Şeker');
    await expect(page.locator('#warn-tr')).toBeVisible();
    await expect(page.locator('#warn-tr-list')).toContainText('Ş');
    await expect(page.locator('li[data-style="bold"] [data-out]')).toHaveText('Ş' + bold('eker'));
  });

  test('boş metinde stil listesi gizli, ters stil sırayı çevirir', async ({ page }) => {
    await page.goto('/yazi-stili/');
    await expect(page.locator('#list')).toBeHidden();
    await expect(page.locator('#empty')).toBeVisible();
    await page.locator('#text').fill('abc');
    await expect(page.locator('li[data-style="mirror"] [data-out]')).toHaveText('cba');
    await expect(page.locator('li[data-style="strike"] [data-out]')).toHaveText('a̶b̶c̶');
  });
});
