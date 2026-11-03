import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Damga Vergisi Hesaplama 2026', () => {
  test('100.000 TL sözleşme binde 9,48 → 948 TL; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/damga-vergisi-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('100.000');
    await expect(page.locator('#r-oran')).toHaveText('Binde 9,48');
    await expect(page.locator('#r-damga')).toHaveText('948,00 ₺');
    await expect(page.locator('#r-cap')).toContainText('29.115.961,10');
    await page.locator('#f-type').selectOption('ucret');
    await expect(page.locator('#r-damga')).toHaveText('759,00 ₺');
    expect(external).toEqual([]);
    noErrors();
  });

  test('kira 10.000 × 12 ay → 226,80 TL; kefil ve nüsha', async ({ page }) => {
    await page.goto('/damga-vergisi-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-type').selectOption('kira');
    await expect(page.locator('#f-months')).toBeVisible();
    await page.locator('#f-amount').fill('10000');
    await expect(page.locator('#r-matrah')).toHaveText('120.000,00 ₺');
    await expect(page.locator('#r-damga')).toHaveText('226,80 ₺');
    await page.locator('#f-guar').check();
    await expect(page.locator('#r-guar')).toHaveText('1.137,60 ₺');
    await expect(page.locator('#r-damga')).toHaveText('1.364,40 ₺');
    await page.locator('#f-guar').uncheck();
    // Nüsha sayısı varsayılan olarak sonucu değiştirmez; temkinli kutuyla çarpılır.
    await page.locator('#f-copies').fill('2');
    await expect(page.locator('#r-damga')).toHaveText('226,80 ₺');
    await page.locator('#f-copy-each').check();
    await expect(page.locator('#r-damga')).toHaveText('453,60 ₺');
  });

  test('üst sınır uygulanır', async ({ page }) => {
    await page.goto('/damga-vergisi-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('10.000.000.000');
    await expect(page.locator('#r-damga')).toHaveText('29.115.961,10 ₺');
    await expect(page.locator('#r-cap')).toContainText('Üst sınır uygulandı');
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/damga-vergisi-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-amount').fill('-100');
    await expect(page.locator('#error')).toContainText('negatif olamaz');
    await page.locator('#f-type').selectOption('kira');
    await page.locator('#f-amount').fill('5000');
    await page.locator('#f-months').fill('0');
    await expect(page.locator('#error')).toContainText('Ay sayısı');
    await page.locator('#f-months').fill('12');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-damga')).toHaveText('113,40 ₺');
  });
});
