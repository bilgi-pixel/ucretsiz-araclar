import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Kombinasyon, Permütasyon ve Faktöriyel Hesaplama', () => {
  test('C(49,6) = 13.983.816, adım adım çözüm ve Pascal üçgeni; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kombinasyon-permutasyon/');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-n').fill('49');
    await page.locator('#f-r').fill('6');
    await expect(page.locator('#r-main')).toHaveText('13.983.816');
    await expect(page.locator('#steps')).toContainText('13.983.816');
    await expect(page.locator('#pascal .kp-prow')).toHaveCount(15);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('P(5,2) = 20 ve Pascal üçgeninde C(5,2) = 10 vurgulanır', async ({ page }) => {
    await page.goto('/kombinasyon-permutasyon/');
    await page.locator('#mode').selectOption('perm');
    await page.locator('#f-n').fill('5');
    await page.locator('#f-r').fill('2');
    await expect(page.locator('#r-main')).toHaveText('20');
    await page.locator('#mode').selectOption('comb');
    await expect(page.locator('#r-main')).toHaveText('10');
    await expect(page.locator('#pascal .is-hit')).toHaveText('10');
  });

  test('20! doğru, 1000! tam basamaklı', async ({ page }) => {
    await page.goto('/kombinasyon-permutasyon/');
    await page.locator('#mode').selectOption('fact');
    await page.locator('#f-n').fill('20');
    await expect(page.locator('#r-main')).toHaveText('2.432.902.008.176.640.000');
    await page.locator('#f-n').fill('1000');
    const digits = await page.locator('#r-main').evaluate((el) => (el.textContent || '').replace(/\./g, '').length);
    expect(digits).toBe(2568);
  });

  test('tekrarlı modlar ve olasılık: 49da 6 → 1 / 13.983.816', async ({ page }) => {
    await page.goto('/kombinasyon-permutasyon/');
    await page.locator('#mode').selectOption('permsame');
    await page.locator('#f-text').fill('MISSISSIPPI');
    await expect(page.locator('#r-main')).toHaveText('34.650');
    await page.locator('#mode').selectOption('permrep');
    await page.locator('#f-n').fill('10');
    await page.locator('#f-r').fill('4');
    await expect(page.locator('#r-main')).toHaveText('10.000');
    await page.locator('#mode').selectOption('combrep');
    await page.locator('#f-n').fill('3');
    await page.locator('#f-r').fill('5');
    await expect(page.locator('#r-main')).toHaveText('21');
    await page.locator('#lotto').click();
    await expect(page.locator('#r-main')).toHaveText('1 / 13.983.816');
    await expect(page.locator('#r-rows')).toContainText('%');
  });

  test('hatalı giriş: r > n, harf, ondalık ve çok büyük sayı için Türkçe hata', async ({ page }) => {
    await page.goto('/kombinasyon-permutasyon/');
    await page.locator('#f-n').fill('5');
    await page.locator('#f-r').fill('7');
    await expect(page.locator('#error')).toContainText('büyük olamaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-r').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#f-r').fill('2,5');
    await expect(page.locator('#error')).toContainText('tam sayı');
    await page.locator('#f-r').fill('5000');
    await expect(page.locator('#error')).toContainText('en fazla');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı, SSS ≥7', async ({ page }) => {
    await page.goto('/kombinasyon-permutasyon/');
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  });
});
