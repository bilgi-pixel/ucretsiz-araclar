import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/metrekare-hesapla/';

async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

async function rect(page: Page, a: string, b: string) {
  await page.locator('#f-shape').selectOption('dik');
  await page.locator('#f-a').fill(a);
  await page.locator('#f-b').fill(b);
}

test.describe('Metrekare Hesaplama', () => {
  test('5 m × 4 m oda: 20 m², çevre, dönüm ve ft² dönüşümü; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await rect(page, '5', '4');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-area')).toHaveText('20,00 m²');
    await expect(page.locator('#r-per')).toHaveText('18,00 m');
    await expect(page.locator('#r-donum')).toHaveText('0,02 dönüm');
    await expect(page.locator('#r-ft2')).toHaveText('215,28 ft²');
    expect(external).toEqual([]);
    noErrors();
  });

  test('fayans: %10 fire, 1,44 m² kutu, 350 TL/m² → 22 m², 16 kutu, 8.064 TL', async ({ page }) => {
    await open(page);
    await rect(page, '5', '4');
    await page.locator('#f-kind').selectOption('fayans');
    await page.locator('#f-pack').fill('1,44');
    await page.locator('#f-price').fill('350');
    await page.locator('#calc').click();
    await expect(page.locator('#mat-box')).toBeVisible();
    await expect(page.locator('#r-need')).toHaveText('22,00 m²');
    await expect(page.locator('#r-packs')).toContainText('16 kutu/paket');
    await expect(page.locator('#r-cost')).toHaveText('8.064,00 TL');
  });

  test('boya: 20 m², 2 kat, %10 fire, 10 m²/litre → 4,40 litre', async ({ page }) => {
    await open(page);
    await rect(page, '5', '4');
    await page.locator('#f-kind').selectOption('boya');
    await expect(page.locator('#f-coats')).toBeVisible();
    await page.locator('#calc').click();
    await expect(page.locator('#r-need')).toHaveText('4,40 litre');
    await expect(page.locator('#r-packs')).toHaveText('Paket boyutu girilmedi');
  });

  test('düzensiz çokgen koordinatları ve kesişen kenar hatası', async ({ page }) => {
    await open(page);
    await page.locator('#f-shape').selectOption('cokgen');
    await page.locator('#f-pts').fill('0,0\n4,0\n4,3\n0,3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-area')).toHaveText('12,00 m²');
    await expect(page.locator('#r-per')).toHaveText('14,00 m');
    await page.locator('#f-pts').fill('0 0\n4 4\n4 0\n0 4');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kenarlar birbirini kesiyor');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-pts').fill('0,0\n4,0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('en az 3 köşe');
  });

  test('listeye ekle: iki oda toplanır, parça kaldırılınca toplam güncellenir', async ({ page }) => {
    await open(page);
    await rect(page, '5', '4');
    await page.locator('#add').click();
    await rect(page, '3', '2');
    await page.locator('#add').click();
    await expect(page.locator('#parts li')).toHaveCount(2);
    await expect(page.locator('#r-area')).toHaveText('26,00 m²');
    await page.locator('#parts li').first().getByRole('button', { name: /kaldır/i }).click();
    await expect(page.locator('#parts li')).toHaveCount(1);
    await expect(page.locator('#r-area')).toHaveText('6,00 m²');
  });

  test('hazır alan dönüşümü: 2,5 dönüm = 2.500 m² = 0,25 hektar; santimetre girişi', async ({ page }) => {
    await open(page);
    await page.locator('#f-shape').selectOption('dogrudan');
    await page.locator('#f-val').fill('2,5');
    await page.locator('#f-aunit').selectOption('donum');
    await page.locator('#calc').click();
    await expect(page.locator('#r-area')).toHaveText('2.500,00 m²');
    await expect(page.locator('#r-hektar')).toHaveText('0,25 hektar');
    await page.locator('#f-shape').selectOption('dik');
    await page.locator('#f-unit').selectOption('cm');
    await page.locator('#f-a').fill('500');
    await page.locator('#f-b').fill('400');
    await page.locator('#calc').click();
    await expect(page.locator('#r-area')).toHaveText('20,00 m²');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En geçersiz');
    await page.locator('#f-shape').selectOption('ucgen3');
    await page.locator('#f-s1').fill('3');
    await page.locator('#f-s2').fill('4');
    await page.locator('#f-s3').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('üçgen oluşturmaz');
    await page.locator('#f-s3').fill('5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-area')).toHaveText('6,00 m²');
    await page.locator('#f-kind').selectOption('fayans');
    await page.locator('#f-fire').fill('250');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Fire oranı geçersiz');
  });

  test('sayfa yapısı: 3 reklam alanı, en az 7 SSS, 900+ kelime, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    await expect(page.locator('h1')).toContainText('Metrekare Hesaplama');
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const k of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="metrekare-hesapla-${k}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ld.map((t) => JSON.parse(t)['@type']);
    expect(types).toContain('FAQPage');
    expect(types).toContain('SoftwareApplication');
    await page.locator('#f-shape').selectOption('l');
    await page.locator('#f-a1').fill('5');
    await page.locator('#f-b1').fill('4');
    await page.locator('#f-a2').fill('2');
    await page.locator('#f-b2').fill('3');
    await page.locator('#f-kind').selectOption('parke');
    await page.locator('#calc').click();
    await expect(page.locator('#r-area')).toHaveText('26,00 m²');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
