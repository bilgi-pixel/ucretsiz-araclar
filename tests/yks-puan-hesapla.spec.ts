import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const UYARI = "ÖSYM/MEB'in resmî puan hesaplaması, soru iptalleri ve standart sapma değerlerine göre değişir; bu araç yalnızca yaklaşık tahmin verir";

test.describe('YKS Puan Hesaplama', () => {
  test('30 doğru 8 yanlış → 28 net; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/yks-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await expect(page.locator('#uyari')).toContainText(UYARI);
    await page.locator('#tyt-turkce-d').fill('30');
    await page.locator('#tyt-turkce-y').fill('8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-tyt-net')).toHaveText('28');
    await expect(page.locator('#tbl-tyt tr').first()).toContainText('28');
    await expect(page.locator('#result')).toContainText(UYARI);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm doğru → en yüksek puan (500), SAY alanı ve OBP', async ({ page }) => {
    await page.goto('/yks-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    for (const [id, n] of [['turkce', 40], ['sosyal', 20], ['mat', 40], ['fen', 20]] as const) await page.locator(`#tyt-${id}-d`).fill(String(n));
    await page.locator('#calc').click();
    await expect(page.locator('#r-tyt-puan')).toHaveText('500');
    await page.locator('#alan').selectOption('say');
    for (const [id, n] of [['mat', 40], ['fizik', 14], ['kimya', 13], ['biyoloji', 13]] as const) await page.locator(`#ayt-${id}-d`).fill(String(n));
    await page.locator('#diploma').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-ayt')).toContainText('500');
    await expect(page.locator('#r-obp')).toContainText('500');
    await expect(page.locator('#r-place')).toContainText('560');
  });

  test('yanlış sayısı soru sayısını aşınca Türkçe hata', async ({ page }) => {
    await page.goto('/yks-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#tyt-turkce-y').fill('41');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
