import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const UYARI = "ÖSYM'nin resmî puan hesaplaması, soru iptalleri ve standart sapma değerlerine göre değişir; bu araç yalnızca yaklaşık tahmin verir";

async function ready(page) {
  await page.goto('/tyt-puan-hesapla/');
  await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
}

test.describe('TYT Puan Hesaplama', () => {
  test('30 doğru 8 yanlış → 28 net; uyarı görünür; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await ready(page);
    await expect(page.locator('#uyari')).toContainText(UYARI);
    await page.locator('#tyt-turkce-d').fill('30');
    await page.locator('#tyt-turkce-y').fill('8');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-net')).toHaveText('28');
    await expect(page.locator('#tbl-tyt tr').first()).toContainText('28');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm doğru → 500 puan; OBP katkısı 60', async ({ page }) => {
    await ready(page);
    for (const [id, n] of [['turkce', 40], ['sosyal', 20], ['mat', 40], ['fen', 20]] as const) await page.locator(`#tyt-${id}-d`).fill(String(n));
    await page.locator('#diploma').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('120');
    await expect(page.locator('#r-puan')).toHaveText('500');
    await expect(page.locator('#r-obp')).toContainText('500');
    await expect(page.locator('#r-place')).toHaveText('560');
  });

  test('hedef puan için gereken net gösterilir', async ({ page }) => {
    await ready(page);
    await page.locator('#tyt-turkce-d').fill('20');
    await page.locator('#hedef').fill('350');
    await page.locator('#calc').click();
    await expect(page.locator('#r-hedef')).toContainText('net gerekir');
    await expect(page.locator('#row-hedef')).toBeVisible();
  });

  test('yanlış sayısı soru sayısını aşınca Türkçe hata verir', async ({ page }) => {
    await ready(page);
    await page.locator('#tyt-turkce-y').fill('41');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('geçersiz diploma notu ve hedef için çözüm öneren hata', async ({ page }) => {
    await ready(page);
    await page.locator('#diploma').fill('120');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('50 ile 100');
    await page.locator('#diploma').fill('');
    await page.locator('#hedef').fill('900');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Hedef puan');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam, SSS ≥7, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await ready(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad[data-slot^="tyt-puan-hesapla-"]')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
  });
});
