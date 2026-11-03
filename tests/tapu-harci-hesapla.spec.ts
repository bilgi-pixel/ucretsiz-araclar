import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Tapu Harcı ve Masrafları Hesaplama', () => {
  test('2.000.000 TL → alıcı 40.000, satıcı 40.000; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/tapu-harci-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#price').fill('2.000.000');
    await page.getByRole('button', { name: 'Masrafları hesapla' }).click();
    await expect(page.locator('#r-buyer-fee')).toContainText('40.000,00 TL');
    await expect(page.locator('#r-seller-fee')).toContainText('40.000,00 TL');
    await expect(page.locator('#row-cb')).toBeHidden();
    await expect(page.locator('#r-note')).toContainText('düşük beyan');
    expect(external).toEqual([]);
    noErrors();
  });

  test('komisyon ve döner sermaye paylaşımı toplamı değiştirir', async ({ page }) => {
    await page.goto('/tapu-harci-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#price').fill('2000000');
    await page.locator('#dsb').fill('1000');
    await page.locator('#dsb-who').selectOption('half');
    await page.locator('#comm-on').check();
    await page.locator('#calc').click();
    // alıcı: 40.000 harç + 500 döner sermaye + 48.000 komisyon (KDV dahil)
    await expect(page.locator('#r-buyer-total')).toContainText('88.500,00 TL');
    await expect(page.locator('#r-seller-total')).toContainText('88.500,00 TL');
    await expect(page.locator('#r-total')).toContainText('177.000,00 TL');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/tapu-harci-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Satış bedeli eksik ya da geçersiz');
    await page.locator('#price').fill('-100');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Örneğin 2.000.000');
    await page.locator('#price').fill('1000000');
    await page.locator('#buyer-rate').fill('xyz');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Alıcı harç oranı geçersiz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
