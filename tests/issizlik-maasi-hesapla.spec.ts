import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('İşsizlik Maaşı Hesaplama', () => {
  test('30.000 ortalama → 12.000 brüt; 700 gün → 180 gün; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/issizlik-maasi-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await expect(page.locator('#uyari')).toContainText("İŞKUR'a başvurun");
    await page.locator('#avg').fill('30.000');
    await page.locator('#days').fill('700');
    await page.locator('#calc').click();
    await expect(page.locator('#r-brut')).toContainText('12.000,00');
    await expect(page.locator('#r-damga')).toContainText('91,08');
    await expect(page.locator('#r-net')).toContainText('11.908,92');
    await expect(page.locator('#r-sure')).toContainText('180 gün');
    await expect(page.locator('#r-toplam')).toContainText('71.453,52');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('100.000 ortalama → üst sınır 26.424; 1080 gün → 300 gün', async ({ page }) => {
    await page.goto('/issizlik-maasi-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#avg').fill('100000');
    await page.locator('#days').fill('1080');
    await page.locator('#calc').click();
    await expect(page.locator('#r-brut')).toContainText('26.424,00');
    await expect(page.locator('#r-sure')).toContainText('300 gün');
    await expect(page.locator('#r-checks')).toContainText('üst sınır');
  });

  test('600 günden az prim → hak doğmuyor; şart işaretsizse uyarı', async ({ page }) => {
    await page.goto('/issizlik-maasi-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#avg').fill('30000');
    await page.locator('#days').fill('500');
    await page.locator('#c-istek').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#r-sure')).toHaveText('Hak doğmuyor');
    await expect(page.locator('#r-checks')).toContainText('600');
    await expect(page.locator('#r-checks')).toContainText('Kendi isteğiyle');
  });

  test('hatalı giriş Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/issizlik-maasi-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('brüt ücret');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#avg').fill('abc');
    await page.locator('#days').fill('700');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('sayı olarak girin');
    await page.locator('#avg').fill('30000');
    await page.locator('#days').fill('2000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('1.095');
  });
});
