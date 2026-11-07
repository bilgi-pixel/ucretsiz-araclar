import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/direnc-renk-kodu-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Direnç Renk Kodu Hesaplama', () => {
  test('4 bant: sarı-mor-kırmızı-altın = 4,7 kΩ ±%5, aralık 4,465 – 4,935 kΩ; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.getByRole('button', { name: 'Değeri bul' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-big')).toHaveText('4,7 kΩ ±%5');
    await expect(page.locator('#r-value')).toContainText('4.700 Ω');
    await expect(page.locator('#r-range')).toHaveText('4,465 kΩ – 4,935 kΩ');
    await expect(page.locator('#r-ppm')).toBeHidden();
    await expect(page.locator('#r-bands li')).toHaveCount(4);
    await expect(page.locator('#r-svg rect')).toHaveCount(5);
    expect(external).toEqual([]);
    noErrors();
  });

  test('5 bant: kahverengi-siyah-siyah-kırmızı-kahverengi = 10 kΩ ±%1', async ({ page }) => {
    await open(page);
    await page.getByLabel('5 bant').first().check();
    await page.locator('#b0').selectOption('kahverengi');
    await page.locator('#b1').selectOption('siyah');
    await page.locator('#b2').selectOption('siyah');
    await page.locator('#b3').selectOption('kırmızı');
    await page.locator('#b4').selectOption('kahverengi');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('10 kΩ ±%1');
    await expect(page.locator('#r-range')).toHaveText('9,9 kΩ – 10,1 kΩ');
  });

  test('6 bant: sıcaklık katsayısı gösterilir (kahverengi = 100 ppm/°C)', async ({ page }) => {
    await open(page);
    await page.locator('input[name="n"][value="6"]').check();
    await expect(page.locator('#b5')).toBeVisible();
    await page.locator('#calc').click();
    await expect(page.locator('#r-ppm')).toHaveText('100 ppm/°C');
    await expect(page.locator('#r-bands li')).toHaveCount(6);
    await expect(page.locator('#r-big')).toHaveText('4,7 kΩ ±%1');
  });

  test('değerden renk: 220 Ω -> kırmızı, kırmızı, kahverengi, altın', async ({ page }) => {
    await open(page);
    await page.getByLabel('Değerden renkleri bul').check();
    await expect(page.locator('#calc')).toHaveText('Renkleri bul');
    await page.locator('#val').fill('220');
    await page.locator('#val').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('220 Ω ±%5');
    const items = await page.locator('#r-bands li').allTextContents();
    expect(items.map((t) => t.split(' – ')[0])).toEqual(['1. kırmızı', '2. kırmızı', '3. kahverengi', '4. altın']);
  });

  test('değerden renk: 4k7, 1M ve 5 bantla 4,75k', async ({ page }) => {
    await open(page);
    await page.getByLabel('Değerden renkleri bul').check();
    await page.locator('#val').fill('4k7');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('4,7 kΩ ±%5');
    await page.locator('#val').fill('1M');
    await page.locator('#tol').selectOption('kahverengi');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('1 MΩ ±%1');
    await expect(page.locator('#r-bands li').nth(2)).toContainText('yeşil');
    await page.getByLabel('5 bant').last().check();
    await page.locator('#val').fill('4,75k');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('4,75 kΩ ±%1');
    await expect(page.locator('#r-bands li')).toHaveCount(5);
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.getByLabel('Değerden renkleri bul').check();
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('Direnç değeri boş');
    await page.locator('#val').fill('abc');
    await page.locator('#calc').click();
    await expect(err).toContainText('anlaşılamadı');
    await page.locator('#val').fill('4750');
    await page.locator('#calc').click();
    await expect(err).toContainText('5 bantlı seçeneği deneyin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#val').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('sıfırdan büyük');
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="direnc-renk-kodu-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await page.locator('input[name="n"][value="6"]').check();
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
