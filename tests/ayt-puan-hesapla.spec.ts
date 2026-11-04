import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

async function ready(page) {
  await page.goto('/ayt-puan-hesapla/');
  await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
}

test.describe('AYT Puan Hesaplama', () => {
  test('SAY: tüm doğru → 500 puan, AYT net 80; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await ready(page);
    for (const [id, n] of [['turkce', 40], ['sosyal', 20], ['mat', 40], ['fen', 20]] as const) await page.locator(`#tyt-${id}-d`).fill(String(n));
    for (const [id, n] of [['mat', 40], ['fizik', 14], ['kimya', 13], ['biyoloji', 13]] as const) await page.locator(`#ayt-${id}-d`).fill(String(n));
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-ayt-net')).toHaveText('80');
    await expect(page.locator('#r-ayt')).toHaveText('500');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('alan değişince dersler yenilenir; EA ve OBP katkısı', async ({ page }) => {
    await ready(page);
    await expect(page.locator('#ayt-fizik-d')).toHaveCount(1);
    await page.locator('#alan').selectOption('ea');
    await expect(page.locator('#ayt-fizik-d')).toHaveCount(0);
    await expect(page.locator('#ayt-edebiyat-d')).toHaveCount(1);
    await page.locator('#ayt-mat-d').fill('30');
    await page.locator('#ayt-mat-y').fill('8');
    await page.locator('#diploma').fill('80');
    await page.locator('#calc').click();
    await expect(page.locator('#r-alan')).toContainText('Eşit Ağırlık');
    await expect(page.locator('#r-ayt-net')).toHaveText('28');
    await expect(page.locator('#r-obp')).toContainText('400');
    await expect(page.locator('#row-place')).toBeVisible();
  });

  test('alan değiştirince TYT girişleri korunur', async ({ page }) => {
    await ready(page);
    await page.locator('#tyt-turkce-d').fill('25');
    await page.locator('#alan').selectOption('soz');
    await expect(page.locator('#tyt-turkce-d')).toHaveValue('25');
  });

  test('doğru+yanlış soru sayısını aşınca Türkçe hata', async ({ page }) => {
    await ready(page);
    await page.locator('#ayt-mat-d').fill('35');
    await page.locator('#ayt-mat-y').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aşamaz');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('geçersiz diploma notu için hata; temizle sonucu gizler', async ({ page }) => {
    await ready(page);
    await page.locator('#diploma').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('50 ile 100');
    await page.locator('#diploma').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam, SSS ≥7, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await ready(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad[data-slot^="ayt-puan-hesapla-"]')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
  });
});
