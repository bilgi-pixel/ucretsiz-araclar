import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/indirim-orani-hesapla/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('İndirim Oranı Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="indirim-orani-hesapla-' + s + '"]')).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    // reklam A araç kutusunun altında
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="indirim-orani-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('indirim yüzdesi ve indirimli fiyat; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#o-old').fill('200');
    await page.locator('#o-new').fill('150');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-head')).toHaveText('İndirim oranı %25');
    await page.locator('#mode').selectOption('fiyat');
    await page.locator('#f-price').fill('1.000');
    await page.locator('#f-pct').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toHaveText('İndirimli fiyat 800,00 TL');
    await expect(page.locator('#r-rows')).toContainText('200,00 TL');
    expect(external).toEqual([]);
    noErrors();
  });

  test('ardışık %20 + %10 = %28; son fiyat 720 TL', async ({ page }) => {
    await open(page);
    await page.locator('#mode').selectOption('ardisik');
    await page.locator('#c-price').fill('1000');
    await page.locator('#c-1').fill('20');
    await page.locator('#c-2').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toHaveText('Toplam indirim %28');
    await expect(page.locator('#r-rows')).toContainText('720,00 TL');
    await expect(page.locator('#r-rows')).toContainText('%30');
  });

  test('sahte indirim kontrolü', async ({ page }) => {
    await open(page);
    await page.locator('#mode').selectOption('sahte');
    await page.locator('#s-claimed').fill('1000');
    await page.locator('#s-sale').fill('800');
    await page.locator('#s-low').fill('700');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('Gerçek indirim yok');
    await page.locator('#s-low').fill('1000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('Makul görünüyor: gerçek indirim %20');
    await page.locator('#s-claimed').fill('1500');
    await page.locator('#s-low').fill('900');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('Şüpheli');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Eski ve yeni fiyatı sayı olarak girin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#mode').selectOption('fiyat');
    await page.locator('#f-price').fill('100');
    await page.locator('#f-pct').fill('150');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('0 ile 100 arasında');
    await page.locator('#mode').selectOption('ardisik');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En az bir indirim oranı');
  });
});
