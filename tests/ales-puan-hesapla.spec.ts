import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const UYARI = 'ÖSYM standart sapmaya göre hesaplar, bu araç yalnızca yaklaşık tahmin verir';

test.describe('ALES Puan Hesaplama', () => {
  test('40 doğru 8 yanlış → 38 net; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ales-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await expect(page.locator('#uyari')).toContainText(UYARI);
    await page.locator('#ales-sayisal-d').fill('40');
    await page.locator('#ales-sayisal-y').fill('8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-say-net')).toHaveText('38');
    await expect(page.locator('#tbl-net tr').first()).toContainText('38');
    await expect(page.locator('#result')).toContainText(UYARI);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm doğru → her puan türünde 100', async ({ page }) => {
    await page.goto('/ales-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#ales-sayisal-d').fill('50');
    await page.locator('#ales-sozel-d').fill('50');
    await page.locator('#calc').click();
    for (const id of ['say', 'soz', 'ea']) await expect(page.locator(`#r-p-${id}`)).toHaveText('100');
  });

  test('ağırlıklar: Sayısal 40D8Y + Sözel 30D12Y → SAY 70,5 EA 65', async ({ page }) => {
    await page.goto('/ales-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#ales-sayisal-d').fill('40');
    await page.locator('#ales-sayisal-y').fill('8');
    await page.locator('#ales-sozel-d').fill('30');
    await page.locator('#ales-sozel-y').fill('12');
    await page.locator('#calc').click();
    await expect(page.locator('#r-p-say')).toHaveText('70,5');
    await expect(page.locator('#r-p-ea')).toHaveText('65');
  });

  test('yanlış sayısı soru sayısını aşınca Türkçe hata', async ({ page }) => {
    await page.goto('/ales-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#ales-sozel-y').fill('51');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
