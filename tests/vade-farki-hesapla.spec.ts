import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Vade Farkı Hesaplama', () => {
  test('10.000 peşin, %3 aylık, 3 ay: basit 10.900, bileşik 10.927,27; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/vade-farki-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-pesin').fill('10.000');
    await page.locator('#f-oran').fill('3');
    await page.locator('#f-vade').fill('3');
    await expect(page.locator('#r-vadeli')).toHaveText('10.900,00 ₺');
    await expect(page.locator('#r-fark')).toHaveText('900,00 ₺');
    await page.locator('#f-yontem').selectOption('bilesik');
    await expect(page.locator('#r-vadeli')).toHaveText('10.927,27 ₺');
    await expect(page.locator('#r-table tbody tr')).toHaveCount(12);
    expect(external).toEqual([]);
    noErrors();
  });

  test('taksit planı ve ters hesap', async ({ page }) => {
    await page.goto('/vade-farki-hesapla/');
    await page.getByLabel('Taksit planı').check();
    await page.locator('#f-pesin').fill('10000');
    await page.locator('#f-oran').fill('3');
    await page.locator('#f-taksit').fill('4');
    await expect(page.locator('#r-toplam')).toHaveText('11.200,00 ₺');
    await expect(page.locator('#r-taksit')).toHaveText('2.800,00 ₺');
    await expect(page.locator('#r-table tbody tr')).toHaveCount(4);
    await page.getByLabel('Oranı bul (ters hesap)').check();
    await page.locator('#f-vadeli').fill('10900');
    await page.locator('#f-vade').fill('3');
    await expect(page.locator('#r-aylik')).toHaveText('%3,00');
  });

  test('çek/senet iskontosu: 100.000, 90 gün, %40 (365) ≈ 91.022,44', async ({ page }) => {
    await page.goto('/vade-farki-hesapla/');
    await page.getByLabel('Çek / senet iskontosu').check();
    await page.locator('#f-nominal').fill('100000');
    await page.locator('#f-gun').fill('90');
    await page.locator('#f-yillik').fill('40');
    await expect(page.locator('#r-bugun')).toBeVisible();
    const text = (await page.locator('#r-bugun').innerText()).replace(/[^\d,]/g, '').replace(',', '.');
    expect(Math.abs(Number(text) - 91022.44)).toBeLessThanOrEqual(1);
    await page.locator('#f-basis').selectOption('360');
    const t360 = (await page.locator('#r-bugun').innerText()).replace(/[^\d,]/g, '').replace(',', '.');
    expect(Number(t360)).toBeLessThan(91022.44);
  });

  test('hatalı giriş Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/vade-farki-hesapla/');
    await page.locator('#f-pesin').fill('abc');
    await page.locator('#f-oran').fill('3');
    await page.locator('#f-vade').fill('3');
    await expect(page.locator('#error')).toContainText('rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-pesin').fill('1000');
    await page.locator('#f-vade').fill('0');
    await expect(page.locator('#error')).toContainText('Vade sıfırdan büyük');
    await page.getByLabel('Oranı bul (ters hesap)').check();
    await page.locator('#f-vadeli').fill('500');
    await page.locator('#f-vade').fill('3');
    await expect(page.locator('#error')).toContainText('Vadeli fiyat peşin fiyattan küçük');
  });

  test('sayfa içeriği: en az 900 kelime, 7+ SSS, 3 reklam alanı', async ({ page }) => {
    await page.goto('/vade-farki-hesapla/');
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThan(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    expect(await page.locator('.ba-ad').count()).toBe(3);
  });
});
