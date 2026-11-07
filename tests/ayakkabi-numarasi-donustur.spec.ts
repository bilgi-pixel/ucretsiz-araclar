import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/ayakkabi-numarasi-donustur/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Ayakkabı Numarası Dönüştürme', () => {
  test('EU 42 → UK 8, US erkek 9, US kadın 10,5, 26,5 cm; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#system').selectOption('eu');
    await page.locator('#value').fill('42');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-uk')).toHaveText('8');
    await expect(page.locator('#r-usm')).toHaveText('9');
    await expect(page.locator('#r-usw')).toHaveText('10,5');
    await expect(page.locator('#r-cm')).toHaveText('26,5 cm');
    expect(external).toEqual([]);
    noErrors();
  });

  test('US kadın 10,5 → EU 42', async ({ page }) => {
    await open(page);
    await page.locator('#system').selectOption('usw');
    await page.locator('#value').fill('10,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-eu')).toHaveText('42');
    await expect(page.locator('#r-uk')).toHaveText('8');
  });

  test('ayak uzunluğu 25 cm → EU 40 (en yakın yarım numara)', async ({ page }) => {
    await open(page);
    await page.locator('#system').selectOption('cm');
    await page.locator('#value').fill('25');
    await page.locator('#calc').click();
    await expect(page.locator('#r-eu')).toHaveText('40');
    await expect(page.locator('#r-usm')).toHaveText('7');
    await expect(page.locator('#r-usw')).toHaveText('8,5');
  });

  test('UK 8 → EU 42; EU 38 → ayak boyu yaklaşık 23,8 cm', async ({ page }) => {
    await open(page);
    await page.locator('#system').selectOption('uk');
    await page.locator('#value').fill('8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-eu')).toHaveText('42');
    await page.locator('#system').selectOption('eu');
    await page.locator('#value').fill('38');
    await page.locator('#calc').click();
    await expect(page.locator('#r-cm')).toHaveText('23,8 cm');
    await expect(page.locator('#r-usm')).toHaveText('5');
  });

  test('hatalı giriş: harf ve aralık dışı değer için Türkçe, çözüm öneren hata', async ({ page }) => {
    await open(page);
    await page.locator('#value').fill('kırk');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Geçerli bir sayı yazın');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#value').fill('90');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('EU 16 – 56');
    await page.locator('#system').selectOption('cm');
    await page.locator('#value').fill('50');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('9 ile 36 cm');
  });

  test('sonuçta yaklaşık değer uyarısı görünür', async ({ page }) => {
    await open(page);
    await page.locator('#value').fill('41');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toContainText('yaklaşık');
    await expect(page.locator('#result')).toContainText('resmî dönüşüm standardı yoktur');
  });

  test('içerik: ≥800 kelime, 3 reklam, SSS ≥7, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(800);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
