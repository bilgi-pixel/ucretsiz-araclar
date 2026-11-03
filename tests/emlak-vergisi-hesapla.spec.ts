import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Emlak Vergisi Hesaplama', () => {
  test('2.000.000 TL konut büyükşehirde: 4.000 TL yıllık, 2.000 TL taksit; tür değişince oran değişir; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/emlak-vergisi-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-value').fill('2.000.000');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-rate')).toHaveText('Binde 2');
    await expect(page.locator('#r-annual')).toHaveText('4.000,00 ₺');
    await expect(page.locator('#r-i1')).toHaveText('2.000,00 ₺');
    await expect(page.locator('#r-i2')).toHaveText('2.000,00 ₺');
    // İş yeri büyükşehir: binde 4 → 8.000
    await page.locator('#f-type').selectOption('isyeri');
    await page.locator('#calc').click();
    await expect(page.locator('#r-annual')).toHaveText('8.000,00 ₺');
    // Arsa büyükşehir dışı: binde 3 → 6.000
    await page.locator('#f-type').selectOption('arsa');
    await page.locator('#f-metro').selectOption('normal');
    await page.locator('#calc').click();
    await expect(page.locator('#r-rate')).toHaveText('Binde 3');
    await expect(page.locator('#r-annual')).toHaveText('6.000,00 ₺');
    // Değerli konut eşiği uyarısı
    await page.locator('#f-type').selectOption('konut');
    await page.locator('#f-limit').fill('1.000.000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-note')).toContainText('değerli konut vergisi');
    expect(external).toEqual([]);
    noErrors();
  });

  test('boş, harfli ve negatif girişte Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/emlak-vergisi-hesapla/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('belediyenizin emlak vergisi servisinden');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-value').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#f-value').fill('-500');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('negatif');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfa en az 900 kelime içerik, 7 SSS ve 3 reklam alanı içerir', async ({ page }) => {
    await page.goto('/emlak-vergisi-hesapla/');
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
  });
});
