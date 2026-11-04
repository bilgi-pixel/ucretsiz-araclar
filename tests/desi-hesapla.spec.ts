import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/desi-hesapla/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Desi Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="desi-hesapla-' + s + '"]')).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    // reklam A araç kutusunun altında
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="desi-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('40x30x20 için 8 desi; 5 kg ise desi, 12,5 kg ise ağırlık faturalanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    const box = page.locator('.box-row').first();
    await box.locator('.b-en').fill('40');
    await box.locator('.b-boy').fill('30');
    await box.locator('.b-yuk').fill('20');
    await box.locator('.b-kg').fill('5');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-desi')).toHaveText('8 desi');
    await expect(page.locator('#r-bill')).toHaveText('8');
    await expect(page.locator('#r-which')).toContainText('desi faturalanır');
    await box.locator('.b-kg').fill('12,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-bill')).toHaveText('13');
    await expect(page.locator('#r-which')).toContainText('ağırlık (kg) faturalanır');
    expect(external).toEqual([]);
    noErrors();
  });

  test('hava kargo /5000, adet ve çoklu koli', async ({ page }) => {
    await open(page);
    await page.locator('#divisor').selectOption('hava');
    const box = page.locator('.box-row').first();
    await box.locator('.b-en').fill('50');
    await box.locator('.b-boy').fill('40');
    await box.locator('.b-yuk').fill('30');
    await box.locator('.b-qty').fill('2');
    await page.locator('#add').click();
    await expect(page.locator('.box-row')).toHaveCount(2);
    const b2 = page.locator('.box-row').nth(1);
    await b2.locator('.b-en').fill('40');
    await b2.locator('.b-boy').fill('30');
    await b2.locator('.b-yuk').fill('20');
    await page.locator('#calc').click();
    // 60000/5000 = 12 (x2 = 24); 24000/5000 = 4,8 -> 5; toplam desi 28,8; faturalanan 29
    await expect(page.locator('#r-desi')).toHaveText('28,8 desi');
    await expect(page.locator('#r-bill')).toHaveText('29');
    await expect(page.locator('#r-lines li')).toHaveCount(2);
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; koli silinir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('santimetre cinsinden');
    await expect(page.locator('#result')).toBeHidden();
    const box = page.locator('.box-row').first();
    await box.locator('.b-en').fill('40');
    await box.locator('.b-boy').fill('30');
    await box.locator('.b-yuk').fill('20');
    await box.locator('.b-qty').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('adet 1 ile 999');
    await page.locator('#add').click();
    await page.locator('.box-row').nth(1).locator('.box-del').click();
    await expect(page.locator('.box-row')).toHaveCount(1);
  });
});
