import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Yakıt ve Yol Masrafı Hesaplama', () => {
  test('450 km, 7 L/100km, 45 TL → 31,5 L ve 1.417,50 TL; 3 kişi → 472,50; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/yakit-hesapla/');
    await expect(page.locator('#c-price')).toHaveValue(''); // fiyat varsayılan boş
    await page.locator('#c-km').fill('450');
    await page.locator('#c-cons').fill('7');
    await page.locator('#c-price').fill('45');
    await page.locator('#c-people').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#rows')).toContainText('31,5 L');
    await expect(page.locator('#rows')).toContainText('1.417,50 TL');
    await expect(page.locator('#rows')).toContainText('472,50 TL');
    // gidiş-dönüş mesafeyi iki katına çıkarır
    await page.locator('#c-round').check();
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('63 L');
    await expect(page.locator('#rows')).toContainText('2.835,00 TL');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('menzil, tüketim ve elektrikli modlar', async ({ page }) => {
    await page.goto('/yakit-hesapla/');
    await page.getByLabel('Depo ile menzil').check();
    await page.locator('#r-tank').fill('45');
    await page.locator('#r-cons').fill('7');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('642,9 km');
    await page.getByLabel('Tüketim hesapla').check();
    await page.locator('#k-liters').fill('40');
    await page.locator('#k-km').fill('500');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('8 L / 100 km');
    await page.getByLabel('Elektrikli araç').check();
    await page.locator('#e-km').fill('300');
    await page.locator('#e-cons').fill('17,5');
    await page.locator('#e-price').fill('8');
    await page.locator('#e-monthly').fill('1500');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('52,5 kWh');
    await expect(page.locator('#rows')).toContainText('420,00 TL');
    await expect(page.locator('#rows')).toContainText('Yıllık gider');
  });

  test('mesafe tablosundan "Kullan" km alanını doldurur', async ({ page }) => {
    await page.goto('/yakit-hesapla/');
    await page.getByRole('button', { name: /İstanbul – Ankara mesafesini/ }).click();
    await expect(page.locator('#c-km')).toHaveValue('450');
  });

  test('hatalı giriş Türkçe ve çözüm önerir', async ({ page }) => {
    await page.goto('/yakit-hesapla/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Mesafe boş');
    await page.locator('#c-km').fill('abc');
    await page.locator('#c-cons').fill('7');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#c-km').fill('-5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeVisible();
  });
});
