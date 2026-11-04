import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/obp-hesapla/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('OBP Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="obp-hesapla-' + s + '"]')).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    // reklam A araç kutusunun altında
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="obp-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('bilinen değer: 85 için OBP 425, katkı 51; önceki yerleşen 25,5', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#grade').fill('85');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-obp')).toHaveText('425 puan');
    await expect(page.locator('#r-contrib')).toHaveText('51 puan');
    await expect(page.locator('#r-max')).toHaveText('60 puan');
    await page.locator('#prev').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-contrib')).toHaveText('25,5 puan');
    await expect(page.locator('#r-max')).toHaveText('30 puan');
    expect(external).toEqual([]);
    noErrors();
  });

  test('uç değerler ve ondalık virgül', async ({ page }) => {
    await open(page);
    await page.locator('#grade').fill('50');
    await page.locator('#calc').click();
    await expect(page.locator('#r-obp')).toHaveText('250 puan');
    await expect(page.locator('#r-contrib')).toHaveText('30 puan');
    await page.locator('#grade').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-contrib')).toHaveText('60 puan');
    await page.locator('#grade').fill('84,37');
    await page.locator('#calc').click();
    await expect(page.locator('#r-obp')).toHaveText('421,85 puan');
    await expect(page.locator('#r-contrib')).toHaveText('50,62 puan');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('okunamadı');
    await page.locator('#grade').fill('49');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('50 ile 100 arasında');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#grade').fill('101');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('50 ile 100 arasında');
  });
});
