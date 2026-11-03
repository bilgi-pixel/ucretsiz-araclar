import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Para metnini sayıya çevirir: "50.500,00 ₺" -> 50500
const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('Gelir Vergisi Hesaplama', () => {
  test('300.000 TL ücret: 28.500 + 110.000 x %20 = 50.500 TL, dilim ve aylık tablo, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/gelir-vergisi-hesapla/');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('300.000');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-vergi')).toHaveText('50.500,00 ₺');
    await expect(page.locator('#r-marjinal')).toHaveText('%20');
    await expect(page.locator('#r-efektif')).toContainText('16,83');
    const rows = page.locator('#tbl-bracket tbody tr');
    await expect(rows).toHaveCount(5);
    await expect(rows.nth(0).locator('td').nth(2)).toHaveText('28.500,00 ₺');
    await expect(rows.nth(1).locator('td').nth(2)).toHaveText('22.000,00 ₺');
    await expect(page.locator('#tbl-month tbody tr')).toHaveCount(12);
    expect(num(await page.locator('#tbl-month tbody tr').nth(11).locator('td').last().textContent())).toBeCloseTo(50500, 0);
    expect(external).toEqual([]);
    noErrors();
  });

  test('ücret dışı tarife ve kira geliri: istisna ve götürü gider', async ({ page }) => {
    await page.goto('/gelir-vergisi-hesapla/');
    await page.getByLabel('Ücret dışı (serbest meslek, ticari)').check();
    await page.locator('#f-amount').fill('1.200.000');
    // 190k x15 + 210k x20 + 600k x27 + 200k x35 = 28.500 + 42.000 + 162.000 + 70.000 (3. dilim 1M varsayımı)
    await expect(page.locator('#r-vergi')).toHaveText('302.500,00 ₺');
    await expect(page.locator('#month-wrap')).toBeHidden();

    await page.getByLabel('Kira geliri').check();
    await page.locator('#f-amount').fill('100.000');
    await page.locator('#f-exempt-amount').fill('50.000');
    // (100.000 - 50.000) x 0,85 = 42.500 matrah; 190k altında %15 = 6.375
    await expect(page.locator('#r-matrah')).toHaveText('42.500,00 ₺');
    await expect(page.locator('#r-vergi')).toHaveText('6.375,00 ₺');
    await page.locator('#f-exempt').uncheck();
    await expect(page.locator('#r-matrah')).toHaveText('85.000,00 ₺');
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/gelir-vergisi-hesapla/');
    await page.locator('#f-amount').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-amount').fill('-500');
    await expect(page.locator('#error')).toContainText('negatif');
    await page.locator('#f-amount').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#f-amount').fill('250000');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });
});
