import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const UYARI = "ÖSYM/MEB'in resmî puan hesaplaması, soru iptalleri ve standart sapma değerlerine göre değişir; bu araç yalnızca yaklaşık tahmin verir";

test.describe('LGS Puan Hesaplama', () => {
  test('17 doğru 3 yanlış → 16 net; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/lgs-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await expect(page.locator('#uyari')).toContainText(UYARI);
    await page.locator('#lgs-turkce-d').fill('17');
    await page.locator('#lgs-turkce-y').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('16');
    await expect(page.locator('#r-sozel')).toHaveText('16');
    await expect(page.locator('#result')).toContainText(UYARI);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm doğru → 500', async ({ page }) => {
    await page.goto('/lgs-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    for (const [id, n] of [['turkce', 20], ['inkilap', 10], ['din', 10], ['ingilizce', 10], ['mat', 20], ['fen', 20]] as const) await page.locator(`#lgs-${id}-d`).fill(String(n));
    await page.locator('#calc').click();
    await expect(page.locator('#r-puan')).toHaveText('500');
  });

  test('yanlış sayısı soru sayısını aşınca Türkçe hata', async ({ page }) => {
    await page.goto('/lgs-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#lgs-mat-y').fill('21');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
