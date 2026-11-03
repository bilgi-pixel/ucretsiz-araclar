import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Bağ-Kur Primi Hesaplama', () => {
  test('alt sınır 33.030 × 0,345 = 11.395,35; indirimle 9.743,85; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/bagkur-primi-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#status option').first()).toBeAttached();
    await page.locator('#calc').click();
    await expect(page.locator('#r-pek')).toHaveText('33.030,00 TL');
    await expect(page.locator('#r-monthly')).toHaveText('11.395,35 TL');
    await expect(page.locator('#r-yearly')).toHaveText('136.744,20 TL');
    await page.locator('#discount').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-monthly')).toHaveText('9.743,85 TL');
    await expect(page.locator('#r-saving')).toHaveText('1.651,50 TL');
    // üst sınır: 33.030 × 7,5 = 247.725 → uygulanır ve not düşer
    await page.locator('#pek').fill('1.000.000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-pek')).toHaveText('247.725,00 TL');
    await expect(page.locator('#r-note')).toContainText('üst sınır');
    expect(external).toEqual([]);
    noErrors();
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/bagkur-primi-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#status option').first()).toBeAttached();
    await page.locator('#pek').fill('10.000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('alt sınırın');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#pek').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçerli bir sayı değil');
    await page.locator('#pek').fill('');
    await page.locator('#days').fill('45');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('1 ile 30');
  });
});
