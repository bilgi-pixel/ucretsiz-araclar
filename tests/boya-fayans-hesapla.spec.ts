import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

async function ready(page) {
  await page.goto('/boya-fayans-hesapla/');
  await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
}

test.describe('Boya ve Fayans Hesaplama', () => {
  test('boya: 4x5 oda, 2,5 m, 1 kapı 1 pencere, 2 kat → 8,76 litre; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await ready(page);
    await page.locator('#b-en').fill('4');
    await page.locator('#b-boy').fill('5');
    await page.locator('#b-kapi').fill('1');
    await page.locator('#b-penc').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-duvar')).toContainText('45');
    await expect(page.locator('#r-alan')).toContainText('83,4');
    await expect(page.locator('#r-litre')).toContainText('8,76');
    await expect(page.locator('#r-kova')).toContainText('7,5 L');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('boya: tavan işaretlenince alan artar', async ({ page }) => {
    await ready(page);
    await page.locator('#b-en').fill('4');
    await page.locator('#b-boy').fill('5');
    await page.locator('#b-tavan').check();
    await page.locator('#calc').click();
    // (45 + 20) * 2 kat = 130
    await expect(page.locator('#r-alan')).toContainText('130');
  });

  test('fayans: 3x4 m, 30x30 cm, 3 mm derz, %10 fire → 145 adet', async ({ page }) => {
    await ready(page);
    await page.locator('#mode-fayans').check();
    await expect(page.locator('#p-fayans')).toBeVisible();
    await expect(page.locator('#p-boya')).toBeHidden();
    await page.locator('#f-en').fill('3');
    await page.locator('#f-boy').fill('4');
    await page.locator('#f-w').fill('30');
    await page.locator('#f-h').fill('30');
    await page.locator('#f-kutu').fill('1,44');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net-adet')).toContainText('131');
    await expect(page.locator('#r-adet')).toContainText('145');
    await expect(page.locator('#r-kutu')).toContainText('10');
  });

  test('boş ve geçersiz girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await ready(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Oda eni alanı boş');
    await page.locator('#b-en').fill('abc');
    await page.locator('#b-boy').fill('5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await page.locator('#b-en').fill('2');
    await page.locator('#b-boy').fill('2');
    await page.locator('#b-kapi').fill('12');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('duvar alanından büyük');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('fayans: düşülecek alan toplamı aşarsa hata', async ({ page }) => {
    await ready(page);
    await page.locator('#mode-fayans').check();
    await page.locator('#f-en').fill('2');
    await page.locator('#f-boy').fill('2');
    await page.locator('#f-cikar').fill('5');
    await page.locator('#f-w').fill('30');
    await page.locator('#f-h').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Düşülecek alan');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam, SSS ≥7, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await ready(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad[data-slot^="boya-fayans-hesapla-"]')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
  });
});
