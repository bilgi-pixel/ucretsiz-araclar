import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/hacim-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Hacim Hesaplama', () => {
  test('silindir r=5 h=10 cm → 785,398 cm³; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#shape').selectOption('silindir');
    await page.locator('#f0').fill('5');
    await page.locator('#f1').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-vol')).toHaveText('785,398163 cm³');
    await expect(page.locator('#r-l')).toHaveText('0,785398 litre');
    await expect(page.locator('#r-area')).toHaveText('471,238898 cm²');
    expect(external).toEqual([]);
    noErrors();
  });

  test('küp 3 m → 27 m³ ve 27.000 litre', async ({ page }) => {
    await open(page);
    await page.locator('#shape').selectOption('kup');
    await page.locator('#unit').selectOption('m');
    await page.locator('#f0').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-vol')).toHaveText('27 m³');
    await expect(page.locator('#r-l')).toHaveText('27.000 litre');
    await expect(page.locator('#r-area')).toHaveText('54 m²');
  });

  test('prizma 2×3×4 ve kare piramit 6/4 değerleri', async ({ page }) => {
    await open(page);
    await page.locator('#shape').selectOption('prizma');
    await expect(page.locator('#f2-wrap')).toBeVisible();
    await page.locator('#f0').fill('2');
    await page.locator('#f1').fill('3,5');
    await page.locator('#f2').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-vol')).toHaveText('28 cm³');
    await expect(page.locator('#r-area')).toHaveText('58 cm²');
    await page.locator('#shape').selectOption('piramit');
    await expect(page.locator('#f2-wrap')).toBeHidden();
    await page.locator('#f0').fill('6');
    await page.locator('#f1').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-vol')).toHaveText('48 cm³');
    await expect(page.locator('#r-area')).toHaveText('96 cm²');
  });

  test('küre ve koni r=5 değerleri', async ({ page }) => {
    await open(page);
    await page.locator('#shape').selectOption('kure');
    await page.locator('#f0').fill('5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-vol')).toHaveText('523,598776 cm³');
    await expect(page.locator('#r-area')).toHaveText('314,159265 cm²');
    await page.locator('#shape').selectOption('koni');
    await page.locator('#f0').fill('5');
    await page.locator('#f1').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-vol')).toHaveText('261,799388 cm³');
    await expect(page.locator('#r-area')).toHaveText('254,160185 cm²');
  });

  test('birim dönüşümü: 100 cm kenarlı küp = 1 m³ = 1.000 litre', async ({ page }) => {
    await open(page);
    await page.locator('#shape').selectOption('kup');
    await page.locator('#f0').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-m3')).toHaveText('1 m³');
    await expect(page.locator('#r-l')).toHaveText('1.000 litre');
  });

  test('hatalı giriş: harf ve sıfır için Türkçe, çözüm öneren hata', async ({ page }) => {
    await open(page);
    await page.locator('#f0').fill('abc');
    await page.locator('#f1').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçerli bir sayı yazın');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f0').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
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
