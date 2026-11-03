import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Zam Oranı Hesaplama', () => {
  test('eski/yeni maaştan zam yüzdesi; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/zam-orani-hesapla/');
    await page.locator('#f-old').fill('20.000');
    await page.locator('#f-new').fill('25.000');
    await expect(page.locator('#r-main')).toHaveText('%25,00');
    await expect(page.locator('#r-rows')).toContainText('5.000,00 ₺');
    expect(external).toEqual([]);
    noErrors();
  });

  test('maaş + yüzde → yeni maaş', async ({ page }) => {
    await page.goto('/zam-orani-hesapla/');
    await page.getByLabel('Yeni maaşı bul').check();
    await page.locator('#f-old').fill('30000');
    await page.locator('#f-pct').fill('15');
    await expect(page.locator('#r-main')).toHaveText('34.500,00 ₺');
  });

  test('enflasyon farkı: %20 zam, %30 enflasyon → reel -%7,69', async ({ page }) => {
    await page.goto('/zam-orani-hesapla/');
    await page.getByLabel('Enflasyon farkı (reel değişim)').check();
    await page.locator('#f-old').fill('20000');
    await page.locator('#f-new').fill('24000');
    await page.locator('#f-cpi').fill('30');
    await expect(page.locator('#r-main')).toHaveText('-%7,69');
    await expect(page.locator('#r-rows')).toContainText('26.000,00 ₺');
    await expect(page.locator('#r-note')).toContainText('azaldı');
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/zam-orani-hesapla/');
    await page.locator('#f-old').fill('-500');
    await page.locator('#f-new').fill('1000');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#f-old').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-old').fill('1000');
    await expect(page.locator('#error')).toBeHidden();
  });
});
