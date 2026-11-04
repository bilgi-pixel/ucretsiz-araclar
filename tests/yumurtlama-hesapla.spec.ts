import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/yumurtlama-hesapla/';
const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

// Tarih testlerinde saat sabitlenmez; son adet tarihi doğrudan girilir (sonuçlar "bugün"e bağlı değildir).
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

async function calc(page: Page, lmp: string, cycle = '28', period = '5') {
  await page.locator('#lmp').fill(lmp);
  await page.locator('#cycle').fill(cycle);
  await page.locator('#period').fill(period);
  await page.locator('#calc').click();
}

test.describe('Yumurtlama Hesaplama', () => {
  test('1 Mart 2026, 28 gün → yumurtlama 15 Mart, doğurgan 10–16 Mart, sonraki adet 29 Mart; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await expect(page.locator('.ba-hero')).toContainText('doğum kontrol yöntemi olarak kullanılmaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.getByRole('button', { name: 'Yumurtlamayı hesapla' }).waitFor();
    await calc(page, '2026-03-01');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2026-03-15');
    await expect(page.locator('#r-ovulation')).toContainText('15 Mart 2026');
    await expect(page.locator('#r-ovulation')).toContainText('Pazar');
    await expect(page.locator('#r-fertile')).toHaveAttribute('data-start', '2026-03-10');
    await expect(page.locator('#r-fertile')).toHaveAttribute('data-end', '2026-03-16');
    await expect(page.locator('#r-fertile')).toHaveText('10 Mart – 16 Mart 2026');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-03-29');
    await expect(page.locator('#r-next')).toContainText('29 Mart 2026');
    await expect(page.locator('#r-period')).toContainText('1 Mart – 5 Mart 2026 (5 gün)');
    await expect(page.locator('#r-test')).toHaveAttribute('data-iso', '2026-03-30');
    await expect(page.locator('#r-cycle')).toHaveText('28 gün');
    // Sonuç içi uyarı
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    await expect(page.locator('#r-disclaimer')).toContainText('düzensiz döngülerde güvenilir değildir');
    await expect(page.locator('#r-disclaimer')).toContainText('doğum kontrol yöntemi olarak kullanılmaz');
    expect(external).toEqual([]);
    noErrors();
  });

  test('döngü uzunluğu sonucu kaydırır: 30 gün → 17 Mart, 21 gün → 8 Mart; yıl ve artık yıl geçişleri', async ({ page }) => {
    await open(page);
    await calc(page, '2026-03-01', '30');
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2026-03-17');
    await expect(page.locator('#r-fertile')).toHaveText('12 Mart – 18 Mart 2026');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-03-31');
    await calc(page, '2026-03-01', '21');
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2026-03-08');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-03-22');
    // Yıl geçişi: iki yıl da yazılır
    await calc(page, '2026-12-20', '28');
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2027-01-03');
    await expect(page.locator('#r-fertile')).toHaveText('29 Aralık 2026 – 4 Ocak 2027');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2027-01-17');
    // Artık yıl: 29 Şubat 2028 doğurgan pencerenin ilk günü
    await calc(page, '2028-02-20', '28');
    await expect(page.locator('#r-fertile')).toHaveAttribute('data-start', '2028-02-29');
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2028-03-05');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2028-03-19');
  });

  test('6 döngü tablosu: ilk satır girilen döngü, sonrakiler aynı uzunlukla tekrarlanır', async ({ page }) => {
    await open(page);
    await calc(page, '2026-03-01');
    const rows = page.locator('#cycle-body tr');
    await expect(rows).toHaveCount(6);
    await expect(rows.nth(0)).toContainText('1 Mar 2026');
    await expect(rows.nth(0)).toContainText('girdiğiniz');
    await expect(rows.nth(0)).toContainText('10 – 16 Mar');
    await expect(rows.nth(0)).toContainText('15 Mar');
    await expect(rows.nth(1)).toContainText('29 Mar 2026');
    await expect(rows.nth(1)).toContainText('7 – 13 Nis');
    await expect(rows.nth(1)).toContainText('12 Nis');
    // Ay sınırını aşan aralık
    await expect(rows.nth(5)).toContainText('19 Tem 2026');
    await expect(rows.nth(5)).toContainText('28 Tem – 3 Ağu');
    await expect(rows.nth(5)).toContainText('2 Ağu');
  });

  test('takvim: harf işaretleri, ay gezinme, adet ve doğurgan günlerin çakışması', async ({ page }) => {
    await open(page);
    await calc(page, '2026-03-01');
    await expect(page.locator('#cal-title')).toHaveText('Mart 2026');
    // 1 Mart 2026 pazar: pazartesi başlangıçlı ızgarada 6 boş hücre
    await expect(page.locator('#cal-grid .cal-b')).toHaveCount(6);
    await expect(page.locator('#cal-grid .cal-d')).toHaveCount(31);
    await expect(page.locator('#cal-grid .cal-d.is-ovulation')).toHaveCount(1);
    await expect(page.locator('#cal-grid .cal-d.is-ovulation')).toHaveAttribute('data-iso', '2026-03-15');
    await expect(page.locator('#cal-grid .cal-d.is-ovulation .cal-m')).toHaveText('Y');
    await expect(page.locator('#cal-grid .cal-d.is-fertile:not(.is-ovulation)')).toHaveCount(6);
    await expect(page.locator('#cal-grid .cal-d.is-period')).toHaveCount(8); // 1-5 ve 29-31 Mart
    await expect(page.locator('#cal-grid .cal-d.is-period .cal-m').first()).toHaveText('A');
    await expect(page.locator('#cal-grid .cal-d.is-fertile:not(.is-ovulation) .cal-m').first()).toHaveText('D');
    // Ekran okuyucu için gizli metin
    await expect(page.locator('#cal-grid .cal-d.is-ovulation .visually-hidden')).toContainText('tahmini yumurtlama günü');
    // Legend
    await expect(page.locator('.cal-legend')).toContainText('Doğurgan gün');
    await expect(page.locator('.cal-legend')).toContainText('Adet günü');
    // Gezinme: ilk ayda "önceki" kapalı
    await expect(page.locator('#cal-prev')).toBeDisabled();
    await page.locator('#cal-next').click();
    await expect(page.locator('#cal-title')).toHaveText('Nisan 2026');
    await expect(page.locator('#cal-grid .cal-d.is-period')).toHaveCount(7); // 1-2 ve 26-30 Nisan
    await expect(page.locator('#cal-grid .cal-d.is-ovulation')).toHaveAttribute('data-iso', '2026-04-12');
    await expect(page.locator('#cal-prev')).toBeEnabled();
    // Son aya kadar ilerle: "sonraki" kapanır (Ağustos 2026)
    for (let i = 0; i < 4; i++) await page.locator('#cal-next').click();
    await expect(page.locator('#cal-title')).toHaveText('Ağustos 2026');
    await expect(page.locator('#cal-next')).toBeDisabled();
    // Klavye ile geri gezinme
    await page.locator('#cal-prev').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#cal-title')).toHaveText('Temmuz 2026');
    // 21 günlük döngüde adet ve doğurgan günler çakışır (3-5 Mart ve 24-26 Mart): ikisi birden işaretlenir
    await calc(page, '2026-03-01', '21');
    await expect(page.locator('#cal-grid .cal-d.is-period.is-fertile')).toHaveCount(6);
    await expect(page.locator('#cal-grid .cal-d.is-period.is-fertile').first()).toHaveAttribute('data-iso', '2026-03-03');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; düzeltince hata kalkar', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Son adet başlangıç tarihi eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#lmp').fill('2026-03-01');
    await page.locator('#cycle').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('21–35');
    await expect(page.locator('#error')).toContainText('hekiminize danışın');
    await page.locator('#cycle').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('21–35');
    await page.locator('#cycle').fill('40');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('21–35');
    await page.locator('#cycle').fill('28');
    await page.locator('#period').fill('12');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('2–8');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#period').fill('5');
    await page.locator('#lmp').fill('1999-05-05');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('2000–2100');
    await page.locator('#lmp').fill('2026-03-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });

  test('eski tarih uyarısı yalnızca geçmişte kalan döngüde görünür; hesap yine yapılır', async ({ page }) => {
    await open(page);
    await calc(page, '2020-01-01');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-stale')).toBeVisible();
    await expect(page.locator('#r-stale')).toContainText('en son adet başlangıç tarihinizi girin');
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2020-01-15');
    await calc(page, '2099-01-01');
    await expect(page.locator('#r-stale')).toBeHidden();
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2099-01-15');
  });

  test('klavye: Enter ile hesaplanır, Temizle varsayılanlara döner', async ({ page }) => {
    await open(page);
    await page.locator('#lmp').fill('2026-03-01');
    await page.locator('#lmp').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#cycle').fill('33');
    await page.locator('#period').fill('7');
    await page.locator('#clear').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#lmp')).toHaveValue('');
    await expect(page.locator('#cycle')).toHaveValue('28');
    await expect(page.locator('#period')).toHaveValue('5');
    await expect(page.locator('#lmp')).toBeFocused();
  });

  test('360 px: sonuç, takvim ve tablo render edildikten sonra yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    await calc(page, '2026-03-01');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await page.locator('#cal-grid').boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    // Takvim hücreleri dokunmaya uygun boyutta
    const cell = await page.locator('#cal-grid .cal-d').first().boundingBox();
    expect(cell!.width).toBeGreaterThanOrEqual(30);
    // Ay düğmeleri 44 px yükseklikte
    const btn = await page.locator('#cal-next').boundingBox();
    expect(btn!.height).toBeGreaterThanOrEqual(44);
    await page.locator('#cal-next').click();
    const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow2).toBeLessThanOrEqual(0);
  });

  test('içerik: 3 reklam alanı (araç kutusunun altında), ≥900 kelime, SSS ≥7 ve JSON-LD uyumlu, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const ads = page.locator('.ba-ad');
    await expect(ads).toHaveCount(3);
    const slots = await ads.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['yumurtlama-hesapla-a', 'yumurtlama-hesapla-b', 'yumurtlama-hesapla-c']);
    // Reklam A araç kutusunun hemen altında; araç kutusunun içinde ya da düğmelerin yanında reklam yok
    await expect(page.locator('.ba-tool + .ba-ad')).toHaveAttribute('data-slot', 'yumurtlama-hesapla-a');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-actions .ba-ad, .ba-actions ~ .ba-ad')).toHaveCount(0);
    // Kelime sayısı (kapalı <details> metinleri innerText'e girmez; ek olarak textContent de sayılır)
    const words = await page.locator('.ba-content').evaluate((n) => (n as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '')));
    const types = ld.map((o: any) => o['@type']).sort();
    expect(types).toEqual(['FAQPage', 'SoftwareApplication']);
    const faq: any = ld.find((o: any) => o['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(faqCount);
    // Rozet ve marka satırı
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-footer-line')).toContainText('%100 ücretsiz · kayıt yok · dosya yüklenmez');
    await expect(page.locator('h1')).toContainText('Yumurtlama Hesaplama');
  });
});
