import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Online Klavye Testi', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS >= 7, >= 900 kelime, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/klavye-test/');
    await expect(page.locator('h1')).toContainText('Klavye Testi');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="klavye-test-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tuşlar yeşile döner, sayaç ve rapor güncellenir, sıfırlanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/klavye-test/');
    await page.locator('#kb-area').focus();
    const a = page.locator('[data-code="KeyA"]');

    await page.keyboard.down('KeyA');
    await expect(a).toHaveClass(/is-pressed/);
    await expect(page.locator('#stat-now')).toHaveText('1');
    await expect(page.locator('#ev-code')).toHaveText('KeyA');
    await page.keyboard.up('KeyA');
    await expect(a).not.toHaveClass(/is-pressed/);
    await expect(a).toHaveClass(/is-tested/);

    await page.keyboard.press('KeyB');
    await page.keyboard.press('Space');
    await expect(page.locator('#stat-tested')).toHaveText('3 tuş');
    await expect(page.locator('#report')).toContainText('3 tuş');
    await expect(page.locator('#missing-list')).not.toContainText('Boşluk');

    // Aynı anda 3 tuş: rollover sayacı
    await page.keyboard.down('KeyQ'); await page.keyboard.down('KeyW'); await page.keyboard.down('KeyE');
    await expect(page.locator('#stat-now')).toHaveText('3');
    await expect(page.locator('#stat-peak')).toHaveText('3');
    await page.keyboard.up('KeyQ'); await page.keyboard.up('KeyW'); await page.keyboard.up('KeyE');

    // F düzeni: etiket değişir, tuş kodu aynı kalır
    await page.locator('#kb-kind').selectOption('f');
    await expect(page.locator('[data-code="KeyQ"]')).toHaveText('F');
    // Dizüstü düzeninde sayısal tuş takımı gizlenir
    await page.locator('#kb-layout').selectOption('laptop');
    await expect(page.locator('#kb-num')).toBeHidden();

    await page.locator('#btn-reset').click();
    await expect(page.locator('#stat-tested')).toHaveText('0 tuş');
    await expect(a).not.toHaveClass(/is-tested/);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('F5 test alanı odaktayken engellenir, rapor kopyalanır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await page.goto('/klavye-test/');
    await page.evaluate(() => { (window as any).__loaded = true; });
    await page.locator('#kb-area').focus();
    await page.keyboard.press('F5');
    // Sayfa yenilenmediyse işaret hâlâ durur
    expect(await page.evaluate(() => (window as any).__loaded)).toBe(true);
    await expect(page.locator('[data-code="F5"]')).toHaveClass(/is-tested/);
    await expect(page.locator('#block-state')).toContainText('engelleniyor');
    await page.locator('#btn-copy').click();
    await expect(page.locator('#copy-msg')).not.toBeEmpty();
  });
});
