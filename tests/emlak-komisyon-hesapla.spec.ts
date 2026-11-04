import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/emlak-komisyon-hesapla/';

/** Sayfayı açar; modül betiği ve parametre dosyası yüklenmeden form gönderilmesin diye bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('#rates-updated')).not.toHaveText('…');
  await expect(page.locator('#quick-body tr')).toHaveCount(20);
}

test.describe('Emlak Komisyonu Hesaplama', () => {
  test('5.000.000 TL satış, %2 + %2, KDV %20 → alıcı 120.000, satıcı 120.000, toplam 240.000; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await expect(page.locator('#buyer-rate')).toHaveValue('2');
    await expect(page.locator('#seller-rate')).toHaveValue('2');
    await expect(page.locator('#vat')).toHaveValue('20');
    await page.locator('#price').fill('5.000.000');
    await page.getByRole('button', { name: 'Komisyonu hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-buyer')).toHaveText('120.000,00 TL');
    await expect(page.locator('#r-seller')).toHaveText('120.000,00 TL');
    await expect(page.locator('#r-total')).toHaveText('240.000,00 TL');
    await expect(page.locator('#r-vat')).toHaveText('40.000,00 TL');
    await expect(page.locator('#r-net')).toHaveText('200.000,00 TL');
    await expect(page.locator('#r-eff')).toHaveText('%4 / %4,8');
    await expect(page.locator('#warning')).toBeHidden();
    await expect(page.locator('#r-note')).toContainText('Sözleşmede yazılı oran esastır');
    await expect(page.locator('#r-note')).toContainText('2026');
    expect(external).toEqual([]);
    noErrors();
  });

  test('kiralama: 20.000 TL aylık kira → toplam 24.000 TL (KDV dahil), kiracı ve kiraya veren 12.000', async ({ page }) => {
    await open(page);
    await page.locator('#mode-kira').check();
    await expect(page.locator('#price-label')).toHaveText('Aylık kira bedeli (TL)');
    await expect(page.locator('#buyer-rate')).toHaveValue('50');
    await expect(page.locator('#seller-rate')).toHaveValue('50');
    await page.locator('#price').fill('20000');
    await page.locator('#calc').click();
    await expect(page.locator('#t-buyer')).toHaveText('Kiracı payı (KDV dahil)');
    await expect(page.locator('#t-seller')).toHaveText('Kiraya veren payı (KDV dahil)');
    await expect(page.locator('#r-buyer')).toHaveText('12.000,00 TL');
    await expect(page.locator('#r-seller')).toHaveText('12.000,00 TL');
    await expect(page.locator('#r-total')).toHaveText('24.000,00 TL');
    await expect(page.locator('#r-vat')).toHaveText('4.000,00 TL');
    await expect(page.locator('#r-net')).toHaveText('20.000,00 TL');
    await expect(page.locator('#warning')).toBeHidden();
    // Toplam pay bir aylık kirayı aşarsa uyarı çıkar, hesap yine yapılır.
    await page.locator('#buyer-rate').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#warning')).toContainText('bir aylık kira');
    await expect(page.locator('#r-total')).toHaveText('36.000,00 TL');
    // Satışa dönünce varsayılan oranlar gelir, tutar ve sonuç temizlenir.
    await page.locator('#mode-satis').check();
    await expect(page.locator('#buyer-rate')).toHaveValue('2');
    await expect(page.locator('#price')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('KDV dahil seçeneği: oran brüt tutardır, KDV ayrıştırılır', async ({ page }) => {
    await open(page);
    await page.locator('#vat-in').check();
    await page.locator('#price').fill('5000000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-buyer')).toHaveText('100.000,00 TL');
    await expect(page.locator('#r-seller')).toHaveText('100.000,00 TL');
    await expect(page.locator('#r-total')).toHaveText('200.000,00 TL');
    // Taraf başına net 83.333,33; KDV 16.666,67 (taraf bazında yuvarlama).
    await expect(page.locator('#r-net')).toHaveText('166.666,66 TL');
    await expect(page.locator('#r-vat')).toHaveText('33.333,34 TL');
    // KDV dahil %2.4 = KDV hariç %2.0 → azami sınır aşılmaz.
    await expect(page.locator('#warning')).toBeHidden();
    await page.locator('#buyer-rate').fill('2,4');
    await page.locator('#calc').click();
    await expect(page.locator('#warning')).toBeHidden();
  });

  test('azami oranın üzerinde uyarı verir ama hesaplar; bir tarafa 0 yazılabilir', async ({ page }) => {
    await open(page);
    await page.locator('#price').fill('5.000.000');
    await page.locator('#buyer-rate').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#warning')).toBeVisible();
    await expect(page.locator('#warning')).toContainText('Alıcıdan istenen oran');
    await expect(page.locator('#warning')).toContainText('azami %2');
    await expect(page.locator('#warning')).toContainText('Sözleşmede yazılı oran esastır');
    await expect(page.locator('#r-buyer')).toHaveText('180.000,00 TL');
    await expect(page.locator('#r-total')).toHaveText('300.000,00 TL');
    await page.locator('#buyer-rate').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#warning')).toBeHidden();
    await expect(page.locator('#r-buyer')).toHaveText('0,00 TL');
    await expect(page.locator('#r-total')).toHaveText('120.000,00 TL');
  });

  test('hızlı tablo: 1-20 milyon TL için 20 satır, 5.000.000 satırı doğru; oran değişince güncellenir', async ({ page }) => {
    await open(page);
    const rows = page.locator('#quick-body tr');
    await expect(rows).toHaveCount(20);
    await expect(rows.first().locator('th')).toHaveText('1.000.000');
    await expect(rows.first().locator('td').nth(2)).toHaveText('48.000');
    await expect(rows.last().locator('th')).toHaveText('20.000.000');
    await expect(rows.last().locator('td').nth(2)).toHaveText('960.000');
    const five = rows.nth(4);
    await expect(five.locator('th')).toHaveText('5.000.000');
    await expect(five.locator('td').nth(0)).toHaveText('120.000');
    await expect(five.locator('td').nth(1)).toHaveText('120.000');
    await expect(five.locator('td').nth(2)).toHaveText('240.000');
    await expect(page.locator('#table-caption')).toContainText('Alıcı %2, satıcı %2, KDV %20');
    await page.locator('#buyer-rate').fill('1');
    await expect(rows.nth(4).locator('td').nth(0)).toHaveText('60.000');
    await expect(rows.nth(4).locator('td').nth(2)).toHaveText('180.000');
    await expect(page.locator('#table-caption')).toContainText('Alıcı %1');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Satış bedeli eksik ya da geçersiz');
    await expect(page.locator('#error')).toContainText('Örneğin 5.000.000');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#price').fill('-100');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#price').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Satış bedeli eksik ya da geçersiz');
    await page.locator('#price').fill('1000000');
    await page.locator('#seller-rate').fill('xyz');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Satıcı oranı geçersiz');
    await expect(page.locator('#error')).toContainText('yüzde olarak girin');
    await page.locator('#seller-rate').fill('2');
    await page.locator('#vat').fill('150');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('KDV oranı geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    // Tablo geçersiz oranla bozulmaz.
    await expect(page.locator('#quick-body tr')).toHaveCount(20);
    // Kira modunda mesaj kira diline geçer.
    await page.locator('#vat').fill('20');
    await page.locator('#mode-kira').check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Aylık kira bedeli eksik ya da geçersiz');
    await expect(page.locator('#error')).toContainText('Örneğin 20.000');
  });

  test('klavyeyle kullanılır: Enter ile hesaplanır, Temizle sonucu sıfırlar', async ({ page }) => {
    await open(page);
    await page.locator('#price').focus();
    await page.keyboard.type('2000000');
    await page.keyboard.press('Enter');
    await expect(page.locator('#r-total')).toHaveText('96.000,00 TL');
    await page.locator('#clear').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#price')).toHaveValue('');
    await expect(page.locator('#price')).toBeFocused();
    await expect(page.locator('#buyer-rate')).toHaveValue('2');
  });

  test('içerik: en az 900 kelime, 3 reklam alanı (araç kutusunda yok), SSS ≥ 7, JSON-LD geçerli, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['emlak-komisyon-hesapla-a', 'emlak-komisyon-hesapla-b', 'emlak-komisyon-hesapla-c']);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-badges')).toContainText('Dosyanız bilgisayarınızdan çıkmaz');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const data = blocks.map((b) => JSON.parse(b));
    const app = data.find((d) => d['@type'] === 'SoftwareApplication');
    const faq = data.find((d) => d['@type'] === 'FAQPage');
    expect(app.url).toBe('https://araclar.bilisimajans.com/emlak-komisyon-hesapla/');
    expect(faq.mainEntity.length).toBe(faqCount);
    // Yasal çerçeve: sözleşme esastır, yönetmelik değişebilir, bilgilendirme notu.
    await expect(page.locator('.ba-tool .kdv-rates')).toContainText('Sözleşmede yazılı oran esastır');
    await expect(page.locator('.ba-tool .kdv-rates')).toContainText('2026');
    expect(text).toContain('yönetmelik değişebilir');
    expect(text).toContain('tavsiye değildir');
  });

  test('360px genişlikte yatay taşma yok (sonuç, uyarı ve hızlı tablo açıkken)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    await page.locator('#price').fill('250.000.000');
    await page.locator('#buyer-rate').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#warning')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
