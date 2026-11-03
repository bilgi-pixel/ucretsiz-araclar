import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Enflasyon ve alım gücü: dört mod, hatalı giriş, dış istek yok.
test.describe('Enflasyon Hesaplama', () => {
  test('geçmiş değer: 10.000 TL, %50 kümülatif → 15.000 TL', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/enflasyon-hesapla/');
    await page.locator('#p-amount').fill('10.000');
    await page.locator('#p-cum').fill('50');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('15.000,00 TL');
    await expect(page.locator('#chart')).toHaveAttribute('data-ready', '1');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yıllık oran listesi çarpılır: %40, %30, %25 → 22.750 TL', async ({ page }) => {
    await page.goto('/enflasyon-hesapla/');
    await page.locator('#p-amount').fill('10000');
    await page.locator('#p-method').selectOption('yillik');
    await page.locator('#p-rates').fill('40\n30; 25');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('22.750,00 TL');
    await expect(page.locator('#plan-body tr')).toHaveCount(3);
  });

  test('reel getiri: %40 nominal, %30 enflasyon → %7,69', async ({ page }) => {
    await page.goto('/enflasyon-hesapla/');
    await page.locator('input[name="mode"][value="reel"]').check();
    await page.locator('#r-nominal').fill('40');
    await page.locator('#r-infl').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('%7,69');
  });

  test('N yıl sonra fiyat ve maaş alım gücü', async ({ page }) => {
    await page.goto('/enflasyon-hesapla/');
    await page.locator('input[name="mode"][value="gelecek"]').check();
    await page.locator('#f-price').fill('1000');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-years').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('2.744,00 TL');
    await page.locator('input[name="mode"][value="maas"]').check();
    await page.locator('#m-salary').fill('30000');
    await page.locator('#m-infl').fill('50');
    await page.locator('#m-raise').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('%13,33');
    await expect(page.locator('#r-rows')).toContainText('45.000,00 TL');
  });

  test('hatalı giriş Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/enflasyon-hesapla/');
    await page.locator('#p-amount').fill('abc');
    await page.locator('#p-cum').fill('50');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Geçmişteki tutar geçersiz');
    await page.locator('#p-amount').fill('1000');
    await page.locator('#p-cum').fill('elli');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kümülatif enflasyon oranı geçersiz');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    expect(external).toEqual([]);
  });

  test('TÜİK notu, tavsiye değildir notu ve noopener bağlantı', async ({ page }) => {
    await page.goto('/enflasyon-hesapla/');
    await expect(page.locator('body')).toContainText('TÜİK TÜFE verisini kullanıcı girer; araç veri saklamaz');
    await expect(page.locator('body')).toContainText('yatırım ya da finansal tavsiye değildir');
    await expect(page.locator('a[href*="tuik.gov.tr"]')).toHaveAttribute('rel', /noopener/);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
  });
});
