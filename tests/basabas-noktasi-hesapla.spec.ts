import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL_PATH = '/basabas-noktasi-hesapla/';
const wordCount = (page: Page) => page.locator('.ba-content').evaluate((el) => ((el as HTMLElement).textContent || '').split(/\s+/).filter(Boolean).length);
const overflow = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

// Örnek senaryo: sabit 50.000, fiyat 100, değişken 60
async function fillBase(page: Page, fixed = '50000', price = '100', variable = '60') {
  await page.locator('.fix-row').nth(0).locator('[data-k="amount"]').fill(fixed);
  await page.locator('#b-price').fill(price);
  await page.locator('#b-var').fill(variable);
}

test.describe('Başabaş Noktası Hesaplama', () => {
  test('sabit 50.000, fiyat 100, değişken 60 → katkı 40, 1.250 adet, ciro 125.000; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    await expect(page.locator('#be-hint')).toBeVisible();
    await expect(page.locator('.fix-row')).toHaveCount(3);
    await fillBase(page);
    await expect(page.locator('#r-katki')).toHaveText('40,00 ₺');
    await expect(page.locator('#r-katki-oran')).toHaveText('%40,00');
    await expect(page.locator('#r-adet-m')).toHaveText('1.250 adet');
    await expect(page.locator('#r-ciro-m')).toHaveText('125.000,00 ₺');
    await expect(page.locator('#fix-total')).toHaveText('50.000,00 ₺');
    await expect(page.locator('#be-hint')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('yıllık görünüm: aylık girişten 15.000 adet ve 1.500.000 ciro; yıllık girişten aylık karşılık', async ({ page }) => {
    await page.goto(URL_PATH);
    await fillBase(page);
    await expect(page.locator('#r-adet-y')).toHaveText('15.000 adet');
    await expect(page.locator('#r-ciro-y')).toHaveText('1.500.000,00 ₺');
    await expect(page.locator('#r-sabit-y')).toHaveText('600.000,00 ₺');
    await page.locator('#b-period').selectOption('yillik');
    await page.locator('.fix-row').nth(0).locator('[data-k="amount"]').fill('600000');
    await expect(page.locator('#r-adet-m')).toHaveText('1.250 adet');
    await expect(page.locator('#r-adet-y')).toHaveText('15.000 adet');
  });

  test('hedef kâr 20.000 → 1.750 adet ve 175.000 ciro; gider satırı ekle/sil toplamı değiştirir', async ({ page }) => {
    await page.goto(URL_PATH);
    await fillBase(page, '30000');
    await page.locator('.fix-row').nth(1).locator('[data-k="amount"]').fill('20000');
    await expect(page.locator('#r-adet-m')).toHaveText('1.250 adet');
    await page.locator('#b-target').fill('20000');
    await expect(page.locator('#r-hedef-adet-m')).toHaveText('1.750 adet');
    await expect(page.locator('#r-hedef-ciro-m')).toHaveText('175.000,00 ₺');
    await page.locator('#fix-add').click();
    await expect(page.locator('.fix-row')).toHaveCount(4);
    await page.locator('.fix-row').nth(3).locator('[data-k="amount"]').fill('10000');
    await expect(page.locator('#fix-total')).toHaveText('60.000,00 ₺');
    await page.locator('.fix-row').nth(3).locator('.fix-del').click();
    await expect(page.locator('#fix-total')).toHaveText('50.000,00 ₺');
  });

  test('güvenlik marjı: 1.500 adet → 250 adet, %16,67; 1.100 adet → zarar ve eksik adet', async ({ page }) => {
    await page.goto(URL_PATH);
    await fillBase(page);
    await page.locator('#b-current').fill('1500');
    await expect(page.locator('#r-mevcut-kar-m')).toHaveText('10.000,00 ₺');
    await expect(page.locator('#r-guvenlik-adet-m')).toHaveText('250 adet');
    await expect(page.locator('#r-guvenlik-oran-m')).toHaveText('%16,67');
    await page.locator('#b-current').fill('1100');
    await expect(page.locator('#r-mevcut-kar-m')).toHaveText('-6.000,00 ₺');
    await expect(page.locator('#r-guvenlik-adet-m')).toHaveText('150 adet eksik');
  });

  test('fiyat ≤ değişken maliyet → "Başabaş yok" mesajı; yukarı yuvarlama', async ({ page }) => {
    await page.goto(URL_PATH);
    await fillBase(page, '50000', '60', '60');
    await expect(page.locator('#error')).toContainText('Başabaş yok');
    await expect(page.locator('#error')).toContainText('artırın');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#chart-wrap')).toBeHidden();
    await page.locator('#b-price').fill('50');
    await expect(page.locator('#error')).toContainText('Başabaş yok');
    await page.locator('#b-price').fill('90');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-adet-m')).toHaveText('1.667 adet');
  });

  test('hatalı giriş: harf ve negatif sayı Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto(URL_PATH);
    await fillBase(page);
    await page.locator('#b-price').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#b-price').fill('-100');
    await expect(page.locator('#error')).toContainText('negatif olamaz');
    await page.locator('#b-price').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#b-price').fill('100');
    await page.locator('.fix-row').nth(0).locator('[data-k="amount"]').fill('x1');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#clear').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#b-price')).toHaveValue('');
  });

  test('grafik çizilir (boş değil) ve erişilebilir açıklama içerir', async ({ page }) => {
    await page.goto(URL_PATH);
    await fillBase(page);
    await page.locator('#chart-wrap').scrollIntoViewIfNeeded();
    await expect(page.locator('#chart-wrap')).toBeVisible();
    await expect(page.locator('#chart')).toHaveAttribute('aria-label', /1\.250 adet/);
    const painted = await page.locator('#chart').evaluate((c) => {
      const cv = c as HTMLCanvasElement;
      const d = cv.getContext('2d')!.getImageData(0, 0, cv.width, cv.height).data;
      let n = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++;
      return n;
    });
    expect(painted).toBeGreaterThan(500);
  });

  test('klavyeyle kullanım: Tab sırası alanlara ulaşır, Enter hesaplar', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#b-period').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('.fix-row').nth(0).locator('[data-k="name"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.type('50000');
    await page.locator('#b-price').fill('100');
    await page.locator('#b-var').fill('60');
    await page.locator('#b-var').press('Enter');
    await expect(page.locator('#r-adet-m')).toHaveText('1.250 adet');
  });

  test('içerik: ≥900 kelime, 3 reklam, SSS ≥7, FAQPage/SoftwareApplication JSON-LD, mali müşavir notu', async ({ page }) => {
    await page.goto(URL_PATH);
    expect(await wordCount(page)).toBeGreaterThanOrEqual(900);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['basabas-noktasi-hesapla-a', 'basabas-noktasi-hesapla-b', 'basabas-noktasi-hesapla-c']);
    const box = (await page.locator('.ba-tool').boundingBox())!;
    const adA = (await page.locator('[data-slot="basabas-noktasi-hesapla-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(data['@graph'].some((n: { '@type': string }) => n['@type'] === 'SoftwareApplication')).toBe(true);
    expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(await page.locator('.ba-faq summary').allTextContents());
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://araclar.bilisimajans.com/basabas-noktasi-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-tool')).toContainText('mali müşavir tavsiyesi değildir');
  });

  test('360px: sonuç, grafik, mevcut satış ve hata açıkken yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await fillBase(page, '5000000', '1250,50', '600');
    await page.locator('#b-target').fill('2000000');
    await page.locator('#b-current').fill('9000');
    await page.locator('#r-adet-y').scrollIntoViewIfNeeded();
    await expect(page.locator('#r-adet-y')).toBeVisible();
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    const cb = (await page.locator('#chart').boundingBox())!;
    expect(cb.x + cb.width).toBeLessThanOrEqual(360);
    await page.locator('#fix-add').click();
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await page.locator('#b-price').fill('500');
    await expect(page.locator('#error')).toContainText('Başabaş yok');
    expect(await overflow(page)).toBeLessThanOrEqual(0);
  });
});
