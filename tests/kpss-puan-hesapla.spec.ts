import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const UYARI = "ÖSYM'nin resmî hesaplaması standart sapmaya göre değişir; bu araç yalnızca yaklaşık tahmin verir";

test.describe('KPSS Puan Hesaplama', () => {
  test('26 doğru 4 yanlış → 25 net; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kpss-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await expect(page.locator('#uyari')).toContainText(UYARI);
    await page.locator('#gy-turkce-d').fill('26');
    await page.locator('#gy-turkce-y').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-gy-net')).toHaveText('25');
    await expect(page.locator('#tbl-net tr').first()).toContainText('25');
    await expect(page.locator('#result')).toContainText(UYARI);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm doğru → en yüksek puan (100); öğretmenlik ve düzey seçimi', async ({ page }) => {
    await page.goto('/kpss-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    const all: [string, number][] = [['gy-turkce', 30], ['gy-mat', 30], ['gk-tarih', 27], ['gk-cografya', 18], ['gk-vatandaslik', 9], ['gk-guncel', 6]];
    for (const [id, n] of all) await page.locator(`#${id}-d`).fill(String(n));
    await page.locator('#calc').click();
    for (const id of ['p1', 'p2', 'p3']) await expect(page.locator(`#r-p-${id}`)).toHaveText('100');
    await page.locator('#ogretmen').check();
    await page.locator('#eb-egitim-d').fill('80');
    await page.locator('#calc').click();
    await expect(page.locator('#r-p-p10')).toHaveText('100');
    await expect(page.locator('#r-eb-net')).toHaveText('80');
    await page.locator('#seviye').selectOption('onlisans');
    await page.locator('#calc').click();
    await expect(page.locator('#r-p-p94')).toHaveText('100');
    await expect(page.locator('#r-p-p3')).toHaveCount(0);
  });

  test('yanlış sayısı soru sayısını aşınca Türkçe hata', async ({ page }) => {
    await page.goto('/kpss-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#gk-guncel-y').fill('7');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
