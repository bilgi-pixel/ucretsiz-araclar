import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Sigara maliyeti: günlük/yıllık maliyet, bırakınca biriken para, hedef süresi, sağlık notu, hatalı giriş.
const URL = '/sigara-maliyet-hesapla/';

async function fill(page: Page, v: { adet?: string; paket?: string; yil?: string; getiri?: string; hedef?: string }) {
  if (v.adet !== undefined) await page.locator('#s-adet').fill(v.adet);
  if (v.paket !== undefined) await page.locator('#s-paket').fill(v.paket);
  if (v.yil !== undefined) await page.locator('#s-yil').fill(v.yil);
  if (v.getiri !== undefined) await page.locator('#s-getiri').fill(v.getiri);
  if (v.hedef !== undefined) await page.locator('#s-hedef').fill(v.hedef);
}

test.describe('Sigara Maliyeti Hesaplama', () => {
  test('20 adet, paket 80 TL: günlük 80, yıllık 29.200, 10 yılda 292.000; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('#s-paket')).toHaveValue(''); // fiyat varsayılan boş
    await fill(page, { adet: '20', paket: '80', yil: '10' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-daily')).toHaveText('80,00 TL');
    await expect(page.locator('#r-weekly')).toHaveText('560,00 TL');
    await expect(page.locator('#r-monthly')).toHaveText('2.433,33 TL');
    await expect(page.locator('#r-yearly')).toHaveText('29.200,00 TL');
    await expect(page.locator('#r-packs')).toContainText('365 paket');
    await expect(page.locator('#r-head')).toContainText('29.200');
    // bugüne kadar harcanan: 10 yıl × 29.200
    await expect(page.locator('#row-spent')).toBeVisible();
    await expect(page.locator('#r-spent')).toHaveText('292.000,00 TL');
    // 1 / 5 / 10 / 20 yıl satırları (getirisiz)
    await expect(page.locator('#sv-body tr')).toHaveCount(4);
    await expect(page.locator('#sv-body tr[data-years="1"]')).toContainText('29.200,00');
    await expect(page.locator('#sv-body tr[data-years="5"]')).toContainText('146.000,00');
    await expect(page.locator('#sv-body tr[data-years="10"]')).toContainText('292.000,00');
    await expect(page.locator('#sv-body tr[data-years="20"]')).toContainText('584.000,00');
    await expect(page.locator('#th-ret')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('hedef 10.000 TL günlük 80 TL ile 125 gün; 50.000 TL için 625 gün', async ({ page }) => {
    await page.goto(URL);
    await fill(page, { adet: '20', paket: '80', hedef: '10.000' });
    await page.locator('#calc').click();
    await expect(page.locator('#goal-block')).toBeVisible();
    await expect(page.locator('#r-goal')).toContainText('125 gün');
    await expect(page.locator('#r-goal')).toContainText('4 ay 5 gün');
    await fill(page, { hedef: '50000' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-goal')).toContainText('625 gün');
    await expect(page.locator('#r-goal')).toContainText('1 yıl 8 ay 20 gün');
    // hedef boşken blok gizlenir; yıl boşken harcanan satırı gizlenir
    await fill(page, { hedef: '' });
    await page.locator('#calc').click();
    await expect(page.locator('#goal-block')).toBeHidden();
    await expect(page.locator('#row-spent')).toBeHidden();
  });

  test('yıllık %12 getiri: aylık bileşik birikim tabloya eklenir (1 yıl 30.860,76; 10 yıl 559.760,81)', async ({ page }) => {
    await page.goto(URL);
    await fill(page, { adet: '20', paket: '80', getiri: '12' });
    await page.locator('#calc').click();
    await expect(page.locator('#th-ret')).toBeVisible();
    await expect(page.locator('#sv-body tr[data-years="1"]')).toContainText('30.860,76');
    await expect(page.locator('#sv-body tr[data-years="5"]')).toContainText('198.729,53');
    await expect(page.locator('#sv-body tr[data-years="10"]')).toContainText('559.760,81');
    await expect(page.locator('#sv-body tr[data-years="20"]')).toContainText('2.407.188,06');
    // getirisiz sütun hâlâ yanında
    await expect(page.locator('#sv-body tr[data-years="10"]')).toContainText('292.000,00');
    await expect(page.locator('#sv-note')).toContainText('garanti değildir');
  });

  test('ondalık sayılar: yarım paket, virgüllü fiyat ve 2,5 yıl', async ({ page }) => {
    await page.goto(URL);
    await fill(page, { adet: '10', paket: '80,50', yil: '2,5' });
    await page.locator('#calc').click();
    // günlük 10/20 × 80,5 = 40,25; yıllık 14.691,25; 2,5 yıl = 36.728,13
    await expect(page.locator('#r-daily')).toHaveText('40,25 TL');
    await expect(page.locator('#r-yearly')).toHaveText('14.691,25 TL');
    await expect(page.locator('#r-spent')).toHaveText('36.728,13 TL');
    // Temizle sonucu gizler ve alanları boşaltır
    await page.locator('#clear').click();
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    await expect(page.locator('#s-adet')).toHaveValue('');
  });

  test('hatalı girişte Türkçe, çözüm öneren hata verir ve sonuç gizlenir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Günlük adet geçersiz');
    await fill(page, { adet: 'abc', paket: '80' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Günlük adet geçersiz');
    await fill(page, { adet: '500' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('çok yüksek');
    await fill(page, { adet: '20', paket: '' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Paket fiyatı geçersiz');
    await fill(page, { paket: '80', yil: '-3' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yıl bilgisi geçersiz');
    await fill(page, { yil: '', getiri: 'yüzde' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Getiri oranı geçersiz');
    await fill(page, { getiri: '', hedef: '0' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Hedef tutar geçersiz');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    // düzeltince hata kaybolur, sonuç gelir
    await fill(page, { hedef: '' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(external).toEqual([]);
  });

  test('klavyeyle kullanılır: sekmeyle gezip Enter ile hesaplar, özet kopyalanır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(URL);
    await page.locator('#s-adet').focus();
    await page.keyboard.type('20');
    await page.keyboard.press('Tab');
    await page.keyboard.type('80');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-yearly')).toHaveText('29.200,00 TL');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('29.200,00 TL');
    expect(clip).toContain('tıbbi ya da yatırım tavsiyesi değildir');
  });

  test('sağlık bölümü: 6 adımlı çizelge, ALO 171, hekime danışın ve tıbbi tavsiye değildir notu', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#saglik')).toBeVisible();
    await expect(page.locator('.sg-timeline li')).toHaveCount(6);
    for (const t of ['20 dakika', '8 saat', '48 saat', '2–12 hafta', '1 yıl', '10 yıl']) {
      await expect(page.locator('.sg-timeline')).toContainText(t);
    }
    const content = page.locator('.ba-content');
    await expect(content).toContainText('ALO 171');
    await expect(content).toContainText('hekim');
    await expect(content).toContainText('tıbbi tavsiye değildir');
    // sonuç alanında da not var
    await fill(page, { adet: '20', paket: '80' });
    await page.locator('#calc').click();
    await expect(page.locator('.sg-health')).toBeVisible();
    await expect(page.locator('.sg-health')).toContainText('tıbbi tavsiye değildir');
    await expect(page.locator('.sg-health')).toContainText('hekiminize danışın');
    await expect(page.locator('.sg-health')).toContainText('ALO 171');
  });

  test('içerik: ≥900 kelime, ≥7 SSS, 3 reklam (A araç kutusunun altında), JSON-LD, 360px taşma yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(URL);
    const words = await page.locator('.ba-content').evaluate((n) => (n.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="sigara-maliyet-hesapla-${s}"]`)).toHaveCount(1);
    // reklam A doğrudan araç kutusunun altındadır; formun/butonların içinde ya da yanında değildir
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="sigara-maliyet-hesapla-a"]')).toHaveCount(1);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    // JSON-LD: SoftwareApplication + FAQPage (≥7 soru)
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = blocks.map((b) => JSON.parse(b));
    expect(parsed.some((j) => j['@type'] === 'SoftwareApplication')).toBe(true);
    const faq = parsed.find((j) => j['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(faq.mainEntity.length).toBe(await page.locator('.ba-content details').count());
    // gizlilik rozeti ve marka
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // sonuç açıkken de taşma olmasın
    await fill(page, { adet: '20', paket: '80', yil: '10', getiri: '12', hedef: '10000' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
});
