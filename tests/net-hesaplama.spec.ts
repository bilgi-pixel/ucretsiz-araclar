import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Net Hesaplama', () => {
  test('TYT 30 D 8 Y → 28 net; dış istek yok; geçmişe kayıt', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/net-hesaplama/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await expect(page.locator('#k')).toHaveValue('4');
    await page.locator('#row-0-d').fill('30');
    await page.locator('#row-0-y').fill('8');
    await page.locator('#hedef').fill('40');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('28');
    await expect(page.locator('#tbl tr').first()).toContainText('28');
    await expect(page.locator('#r-hedef')).toContainText('12');
    await page.locator('#save-hist').click();
    await expect(page.locator('#hist-list li')).toHaveCount(1);
    await expect(page.locator('#chart')).toBeVisible();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('LGS 17 D 3 Y → 16 net (katsayı 3)', async ({ page }) => {
    await page.goto('/net-hesaplama/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#exam').selectOption('lgs');
    await expect(page.locator('#k')).toHaveValue('3');
    await page.locator('#row-0-d').fill('17');
    await page.locator('#row-0-y').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('16');
  });

  test('ders ekle/sil ve özel sınav', async ({ page }) => {
    await page.goto('/net-hesaplama/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#exam').selectOption('ozel');
    await page.locator('#add-row').click();
    await expect(page.locator('#rows .net-row')).toHaveCount(3);
    await page.locator('#rows .net-del').first().click();
    await expect(page.locator('#rows .net-row')).toHaveCount(2);
  });

  test('hatalı giriş: yanlış soru sayısını aşar, harf', async ({ page }) => {
    await page.goto('/net-hesaplama/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#row-0-d').fill('30');
    await page.locator('#row-0-y').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#row-0-y').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('tam sayı');
  });
});
