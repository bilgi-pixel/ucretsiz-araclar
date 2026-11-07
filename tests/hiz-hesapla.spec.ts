import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/hiz-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Hız, Yol ve Süre Hesaplama', () => {
  test('hız: 120 km / 1,5 saat = 80 km/sa = 22,2222 m/sn; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#dist-v').fill('120');
    await page.locator('#t-h').fill('1,5');
    await page.getByRole('button', { name: 'Hızı hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-big')).toHaveText('Hız = 80 km/sa');
    await expect(page.locator('#r-speed2')).toContainText('22,2222 m/sn');
    await expect(page.locator('#r-time')).toContainText('1 sa 30 dk 0 sn');
    expect(external).toEqual([]);
    noErrors();
  });

  test('yol: 90 km/sa x 2 sa 30 dk = 225 km', async ({ page }) => {
    await open(page);
    await page.getByLabel('Yolu bul').check();
    await expect(page.locator('#calc')).toHaveText('Yolu hesapla');
    await expect(page.locator('#dist-v')).toBeDisabled();
    await page.locator('#speed-v').fill('90');
    await page.locator('#t-h').fill('2');
    await page.locator('#t-m').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('Yol = 225 km');
    await expect(page.locator('#r-dist')).toContainText('225.000 m');
  });

  test('süre: 300 km / 100 km/sa = 3 sa 0 dk 0 sn', async ({ page }) => {
    await open(page);
    await page.getByLabel('Süreyi bul').check();
    await page.locator('#speed-v').fill('100');
    await page.locator('#dist-v').fill('300');
    await page.locator('#speed-v').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('Süre = 3 sa 0 dk 0 sn');
  });

  test('tempo ve birimler: 5 km / 25 dk = 12 km/sa, 5 dk 00 sn / km; knot girişi', async ({ page }) => {
    await open(page);
    await page.locator('#dist-v').fill('5');
    await page.locator('#t-m').fill('25');
    await page.locator('#calc').click();
    await expect(page.locator('#r-speed')).toHaveText('12 km/sa');
    await expect(page.locator('#r-pace')).toContainText('5 dk 00 sn / km');
    // 20 knot x 1 saat = 37,04 km
    await page.getByLabel('Yolu bul').check();
    await page.locator('#speed-u').selectOption('knot');
    await page.locator('#speed-v').fill('20');
    await page.locator('#t-m').fill('');
    await page.locator('#t-h').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('Yol = 37,04 km');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('yol ve süre girin');
    await page.locator('#dist-v').fill('abc');
    await page.locator('#t-h').fill('1');
    await page.locator('#calc').click();
    await expect(err).toContainText('Yol geçersiz');
    await page.locator('#dist-v').fill('10');
    await page.locator('#t-h').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('Süre sıfırdan büyük olmalı');
    await page.getByLabel('Süreyi bul').check();
    await page.locator('#speed-v').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('Hız sıfırdan büyük olmalı');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('negatif değer reddedilir', async ({ page }) => {
    await open(page);
    await page.locator('#dist-v').fill('-5');
    await page.locator('#t-h').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('negatif olamaz');
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="hiz-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await page.locator('#dist-v').fill('384400');
    await page.locator('#t-h').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
