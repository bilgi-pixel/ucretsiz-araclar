import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Elektrik ve Doğalgaz Tüketimi Hesaplama', () => {
  test('2000 W × 5 saat × 30 gün = 300 kWh, 3 TL → 900 TL; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/elektrik-tuketim-hesapla/');
    await expect(page.locator('#price')).toHaveValue('');
    await page.locator('#c-name').fill('Isıtıcı');
    await page.locator('#c-watt').fill('2000');
    await page.locator('#add-custom').click();
    const row = page.locator('.dev-row').first();
    await row.locator('.dev-hours').fill('5');
    await page.locator('#price').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#rows')).toContainText('300 kWh');
    await expect(page.locator('#rows')).toContainText('900,00 TL');
    await expect(page.locator('#tbl')).toContainText('Isıtıcı');
    await expect(page.locator('#pie')).toBeVisible();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('hazır cihaz eklenir; doğalgaz ve klima modları', async ({ page }) => {
    await page.goto('/elektrik-tuketim-hesapla/');
    await expect(page.locator('#preset option')).toHaveCount(8);
    await page.locator('#add-preset').click();
    await expect(page.locator('.dev-row')).toHaveCount(1);
    await page.locator('.dev-row .dev-remove').click();
    await expect(page.locator('.dev-row')).toHaveCount(0);
    await page.getByRole('radio', { name: 'Doğalgaz' }).check();
    await page.locator('#g-m3').fill('100');
    await page.locator('#gprice').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('1.000,00 TL');
    await page.getByRole('radio', { name: 'Klima (BTU)' }).check();
    await page.locator('#a-btu').fill('12000');
    await page.locator('#price').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('3,52 kW');
    await expect(page.locator('#rows')).toContainText('Saatlik maliyet');
  });

  test('hatalı giriş Türkçe ve çözüm önerir', async ({ page }) => {
    await page.goto('/elektrik-tuketim-hesapla/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Listede cihaz yok');
    await page.locator('#c-name').fill('Test');
    await page.locator('#c-watt').fill('abc');
    await page.locator('#add-custom').click();
    await page.locator('.dev-row .dev-hours').fill('5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
