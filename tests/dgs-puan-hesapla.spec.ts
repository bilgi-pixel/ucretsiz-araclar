import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const UYARI = "ÖSYM'nin resmî hesaplaması standart sapmaya göre değişir; bu araç yalnızca yaklaşık tahmin verir";

test.describe('DGS Puan Hesaplama', () => {
  test('35 doğru 8 yanlış → 33 net; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/dgs-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await expect(page.locator('#uyari')).toContainText(UYARI);
    await page.locator('#dgs-sayisal-d').fill('35');
    await page.locator('#dgs-sayisal-y').fill('8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-say-net')).toHaveText('33');
    await expect(page.locator('#tbl-net tr').first()).toContainText('33');
    await expect(page.locator('#result')).toContainText(UYARI);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm doğru → en yüksek puan (500) ve ÖBP katkısı', async ({ page }) => {
    await page.goto('/dgs-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#dgs-sayisal-d').fill('50');
    await page.locator('#dgs-sozel-d').fill('50');
    await page.locator('#obp').fill('100');
    await page.locator('#calc').click();
    for (const id of ['say', 'soz', 'ea']) await expect(page.locator(`#r-p-${id}`)).toHaveText('500');
    await expect(page.locator('#r-obp')).toContainText('500');
    await expect(page.locator('#r-place')).toContainText('550');
  });

  test('yanlış sayısı soru sayısını aşınca Türkçe hata', async ({ page }) => {
    await page.goto('/dgs-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#dgs-sozel-y').fill('51');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
