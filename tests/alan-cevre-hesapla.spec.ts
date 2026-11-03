import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Alan, Çevre ve Hacim Hesaplama', () => {
  test('3-4-5 üçgen alanı 6, adım adım çözüm görünür, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/alan-cevre-hesapla/');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#shape').selectOption('ucgen3');
    await page.locator('#f-a').fill('3');
    await page.locator('#f-b').fill('4');
    await page.locator('#f-c').fill('5');
    await expect(page.locator('#r-rows .ac-row').first()).toContainText('6 cm²');
    await expect(page.locator('#steps li')).toHaveCount(3);
    await expect(page.locator('#steps')).toContainText('Yarı çevre');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('daire r=2 alan 12,57; m² ve dönüm karşılığı', async ({ page }) => {
    await page.goto('/alan-cevre-hesapla/');
    await page.locator('#shape').selectOption('daire');
    await page.locator('#unit').selectOption('m');
    await page.locator('#f-r').fill('2');
    await expect(page.locator('#r-rows')).toContainText('12,57 m²');
    await expect(page.locator('#r-rows')).toContainText('dönüm');
    await expect(page.locator('#diagram svg')).toBeVisible();
  });

  test('silindir hacmi ve litre karşılığı', async ({ page }) => {
    await page.goto('/alan-cevre-hesapla/');
    await page.locator('#shape').selectOption('silindir');
    await page.locator('#f-r').fill('2');
    await page.locator('#f-h').fill('5');
    await expect(page.locator('#r-rows .ac-row').first()).toContainText('62,83 cm³');
    await expect(page.locator('#r-rows')).toContainText('0,06283 L');
  });

  test('pratik mod: 20 m² fayans, %10 fire, 60x60', async ({ page }) => {
    await page.goto('/alan-cevre-hesapla/');
    await page.locator('#p-area').fill('20');
    await page.locator('#p-tw').fill('60');
    await page.locator('#p-tl').fill('60');
    // 22 m² / 0,36 = 61,1 → 62 adet
    await expect(page.locator('#p-rows .ac-row').first()).toContainText('62 adet');
  });

  test('hatalı giriş: geçersiz üçgen, harf ve sıfır için Türkçe hata', async ({ page }) => {
    await page.goto('/alan-cevre-hesapla/');
    await page.locator('#shape').selectOption('ucgen3');
    await page.locator('#f-a').fill('1');
    await page.locator('#f-b').fill('2');
    await page.locator('#f-c').fill('10');
    await expect(page.locator('#error')).toContainText('üçgen oluşmaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-c').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#f-c').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı, SSS ≥7', async ({ page }) => {
    await page.goto('/alan-cevre-hesapla/');
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  });
});
