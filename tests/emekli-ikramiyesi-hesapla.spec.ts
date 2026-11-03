import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Emekli İkramiyesi ve Zam Hesaplama', () => {
  test('25 yıl × 40.000 = 1.000.000 TL; zam %15 → 20.000 → 23.000; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/emekli-ikramiyesi-hesapla/');
    await page.locator('#i-years').fill('25');
    await page.locator('#i-salary').fill('40000');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#rows')).toContainText('1.000.000,00 TL');
    // 30 yıl üst sınırı
    await page.locator('#i-years').fill('35');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('1.200.000,00 TL');

    await page.getByRole('radio', { name: 'Emekli maaşı zammı' }).check();
    await page.locator('#z-salary').fill('20000');
    await page.locator('#z-rate').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('23.000,00 TL');
    await expect(page.locator('#rows')).toContainText('3.000,00 TL');

    await page.getByRole('radio', { name: 'Bayram ikramiyesi' }).check();
    await expect(page.locator('#b-amount')).not.toHaveValue('');
    await page.locator('#b-amount').fill('4000');
    await page.locator('#b-count').fill('2');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('8.000,00 TL');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('gösterge ve katsayıdan yaklaşık aylık', async ({ page }) => {
    await page.goto('/emekli-ikramiyesi-hesapla/');
    await page.locator('#i-years').fill('10');
    await page.locator('#i-gosterge').fill('1000');
    await page.locator('#i-ek').fill('500');
    await page.locator('#i-katsayi').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('300.000,00 TL');
  });

  test('hatalı giriş Türkçe ve çözüm önerir', async ({ page }) => {
    await page.goto('/emekli-ikramiyesi-hesapla/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Hizmet yılı boş');
    await page.locator('#i-years').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#i-years').fill('25');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Gösterge puanı boş');
    await page.getByRole('radio', { name: 'Emekli maaşı zammı' }).check();
    await page.locator('#z-salary').fill('-5');
    await page.locator('#z-rate').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeVisible();
  });
});
