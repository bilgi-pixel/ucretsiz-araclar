import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/zekat-hesapla/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Zekat Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="zekat-hesapla-' + s + '"]')).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    // reklam A araç kutusunun altında
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="zekat-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('bilinen değer: nisap üstü, %2,5; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#g-price').fill('3.000');
    await page.locator('#a-cash').fill('300000');
    await page.locator('#a-gold').fill('10');
    await page.locator('#a-debt').fill('20000');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-nisap')).toContainText('240.540,00 TL');
    await expect(page.locator('#r-net')).toHaveText('310.000,00 TL');
    await expect(page.locator('#r-zekat')).toHaveText('7.750,00 TL');
    expect(external).toEqual([]);
    noErrors();
  });

  test('nisap altında zekat 0; gümüş nisabı daha düşük eşik verir', async ({ page }) => {
    await open(page);
    await page.locator('#g-price').fill('3000');
    await page.locator('#s-price').fill('40');
    await page.locator('#a-cash').fill('100000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-zekat')).toHaveText('0,00 TL');
    await expect(page.locator('#r-status')).toContainText('altında');
    await page.getByLabel('Gümüş nisabı (595 g)').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-nisap')).toContainText('23.800,00 TL');
    await expect(page.locator('#r-zekat')).toHaveText('2.500,00 TL');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('gram altının güncel TL fiyatını girin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#g-price').fill('3000');
    await page.locator('#a-cash').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('sayı olarak okunamadı');
    await page.locator('#a-cash').fill('-5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Negatif');
  });
});
