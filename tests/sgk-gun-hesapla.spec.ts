import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/sgk-gun-hesapla/';

/** Sayfayı açar; modül betiği ve parametre dosyası yüklenmeden form gönderilmesin diye bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('#rates-updated')).not.toHaveText('…');
  await expect(page.locator('.period-row')).toHaveCount(1);
}

/** i. satıra (0'dan) başlangıç, bitiş ve isteğe bağlı eksik gün yazar. */
async function fillRow(page: Page, i: number, start: string, end: string, missing = '') {
  const row = page.locator('.period-row').nth(i);
  await row.locator('input[name="start"]').fill(start);
  await row.locator('input[name="end"]').fill(end);
  if (missing) await row.locator('input[name="missing"]').fill(missing);
}

async function addRowAndFill(page: Page, i: number, start: string, end: string, missing = '') {
  await page.locator('#add-period').click();
  await expect(page.locator('.period-row')).toHaveCount(i + 1);
  await fillRow(page, i, start, end, missing);
}

test.describe('SGK Gün Hesaplama', () => {
  test('01.01.2020 – 31.12.2020 → 360 gün (1 yıl); dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await fillRow(page, 0, '2020-01-01', '2020-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-total')).toHaveText('360 gün');
    await expect(page.locator('#r-ymd')).toHaveText('1 yıl, 0 ay, 0 gün');
    await expect(page.locator('#r-main')).toContainText('Toplam 360 gün');
    await expect(page.locator('#warning')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('15.03.2021 – 20.05.2021 → 16 + 30 + 20 = 66 gün', async ({ page }) => {
    await open(page);
    await fillRow(page, 0, '2021-03-15', '2021-05-20');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('66 gün');
    await expect(page.locator('#r-ymd')).toHaveText('0 yıl, 2 ay, 6 gün');
    await expect(page.locator('#r-periods li').first()).toContainText('15.03.2021 – 20.05.2021');
    await expect(page.locator('#r-periods li').first()).toContainText('66 gün');
  });

  test('iki dönem toplanır: 66 + 201 = 267; ardışık yarım yıllar 180 + 180 = 360', async ({ page }) => {
    await open(page);
    await fillRow(page, 0, '2021-03-15', '2021-05-20');
    await addRowAndFill(page, 1, '2022-06-10', '2022-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('267 gün');
    await expect(page.locator('#r-periods li')).toHaveCount(2);
    await expect(page.locator('#r-periods li').nth(1)).toContainText('201 gün');
    await expect(page.locator('#warning')).toBeHidden();

    await fillRow(page, 0, '2020-01-01', '2020-06-30');
    await fillRow(page, 1, '2020-07-01', '2020-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('360 gün');
    await expect(page.locator('#r-gross')).toHaveText('360 gün');
  });

  test('çakışan dönemler uyarı verir ve aynı gün iki kez sayılmaz', async ({ page }) => {
    await open(page);
    await fillRow(page, 0, '2020-01-01', '2020-06-30');
    await addRowAndFill(page, 1, '2020-06-01', '2020-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#warning')).toBeVisible();
    await expect(page.locator('#warning')).toContainText('Dönem 1 ile Dönem 2');
    await expect(page.locator('#warning')).toContainText('çakış');
    // Birleşik aralık 01.01 – 31.12 = 360 gün (180 + 210 = 390 değil).
    await expect(page.locator('#r-total')).toHaveText('360 gün');
    // Çakışma düzelince uyarı kaybolur.
    await fillRow(page, 1, '2020-07-01', '2020-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#warning')).toBeHidden();
  });

  test('ay sonu kuralı: Şubat tam ay = 30, ayın 31\'i = 30. gün, tek gün = 1', async ({ page }) => {
    await open(page);
    await fillRow(page, 0, '2021-02-01', '2021-02-28');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('30 gün');
    await fillRow(page, 0, '2021-03-31', '2021-03-31');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('1 gün');
    await fillRow(page, 0, '2021-02-15', '2021-02-28');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('16 gün');
    // Artık yıl Şubat'ı da 30 gün olur.
    await fillRow(page, 0, '2020-02-01', '2020-02-29');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('30 gün');
  });

  test('eksik gün toplamdan düşülür; dönemden büyük eksik gün hata verir', async ({ page }) => {
    await open(page);
    await fillRow(page, 0, '2020-01-01', '2020-12-31', '12');
    await page.locator('#calc').click();
    await expect(page.locator('#r-gross')).toHaveText('360 gün');
    await expect(page.locator('#r-missing')).toHaveText('12 gün');
    await expect(page.locator('#r-total')).toHaveText('348 gün');
    await expect(page.locator('#r-ymd')).toHaveText('0 yıl, 11 ay, 18 gün');

    await page.locator('.period-row').first().locator('input[name="missing"]').fill('400');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('dönemin gün sayısından');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En az bir çalışma dönemi girin');
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('.period-row').first().locator('input[name="start"]').fill('2021-03-15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Dönem 1: bitiş tarihi eksik');
    await expect(page.locator('#error')).toContainText('bugünün tarihini');

    await fillRow(page, 0, '2021-05-20', '2021-03-15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('bitiş tarihinden');
    await expect(page.locator('#error')).toContainText('sonra olamaz');

    await fillRow(page, 0, '2021-03-15', '2021-05-20', 'abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('eksik gün sayısı geçersiz');
    await expect(page.locator('#result')).toBeHidden();

    // Boş bırakılan ikinci satır yok sayılır; ilk satır doğruysa hesap yapılır.
    await page.locator('.period-row').first().locator('input[name="missing"]').fill('');
    await page.locator('#add-period').click();
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('66 gün');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('bilgilendirme: 7.200 güne kalan gün, cinsiyete göre sigortalılık süresi, emeklilik tarihi yok', async ({ page }) => {
    await open(page);
    await fillRow(page, 0, '2020-01-01', '2020-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#info')).toContainText('Bilgilendirme');
    await expect(page.locator('#r-prim')).toContainText('7.200 güne kalan: 6.840 gün');
    await expect(page.locator('#r-ins')).toHaveText('');
    await expect(page.locator('#info')).toContainText('emeklilik tarihi vermez');
    await expect(page.locator('#info')).toContainText('e-Devlet');

    await page.locator('#gender').selectOption('kadin');
    await page.locator('#calc').click();
    await expect(page.locator('#r-ins')).toContainText('20 yıllık süreye kalan');
    await page.locator('#gender').selectOption('erkek');
    await page.locator('#calc').click();
    await expect(page.locator('#r-ins')).toContainText('25 yıllık süreye kalan');

    // 7.200 günü aşan toplam: kalan 0, "üzerindesiniz" metni.
    await fillRow(page, 0, '1995-01-01', '2020-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#r-prim')).toContainText('üzerindesiniz');
  });

  test('klavyeyle dönem eklenir ve silinir; tek satırda Sil kapalıdır', async ({ page }) => {
    await open(page);
    await expect(page.locator('.period-remove').first()).toBeDisabled();
    await page.locator('#add-period').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.period-row')).toHaveCount(2);
    await expect(page.locator('.period-row').nth(1).locator('input[name="start"]')).toBeFocused();
    await expect(page.locator('.period-title').nth(1)).toHaveText('Dönem 2');
    await expect(page.locator('.period-remove').nth(1)).toHaveAttribute('aria-label', "Dönem 2'i sil");
    await page.locator('.period-remove').nth(1).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.period-row')).toHaveCount(1);
    await expect(page.locator('#add-period')).toBeFocused();
    // Temizle: sonuç gizlenir, tek boş satır kalır.
    await fillRow(page, 0, '2020-01-01', '2020-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('.period-row')).toHaveCount(1);
    await expect(page.locator('.period-row input[name="start"]')).toHaveValue('');
  });

  test('içerik: en az 900 kelime, 3 reklam alanı (araç kutusunda yok), SSS ≥ 7, JSON-LD geçerli, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['sgk-gun-hesapla-a', 'sgk-gun-hesapla-b', 'sgk-gun-hesapla-c']);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-badges')).toContainText('Dosyanız bilgisayarınızdan çıkmaz');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const data = blocks.map((b) => JSON.parse(b));
    const app = data.find((d) => d['@type'] === 'SoftwareApplication');
    const faq = data.find((d) => d['@type'] === 'FAQPage');
    expect(app.url).toBe('https://araclar.bilisimajans.com/sgk-gun-hesapla/');
    expect(faq.mainEntity.length).toBe(faqCount);
    // Hukuki sınır: bilgilendirme notu ve e-Devlet vurgusu sayfada yer alır.
    expect(text).toContain('e-Devlet');
    expect(text).toContain('bilgilendirme amaçlıdır');
  });

  test('360px genişlikte yatay taşma yok (üç dönem, sonuç ve uyarı açıkken)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    await fillRow(page, 0, '2020-01-01', '2020-06-30', '5');
    await addRowAndFill(page, 1, '2020-06-01', '2021-03-31');
    await addRowAndFill(page, 2, '2022-06-10', '2022-12-31');
    await page.locator('#gender').selectOption('kadin');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#warning')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
