import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Sayfayı açar; modül betiği ve parametre dosyası yüklenmeden form gönderilmesin.
async function open(page: Page, path = '/tarih-ekle-cikar/') {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

async function calc(page: Page, start: string, amount: string) {
  await page.locator('#start').fill(start);
  await page.locator('#amount').fill(amount);
  await page.locator('#calc').click();
}

test.describe('Tarihe Gün Ekleme / Çıkarma', () => {
  test('2026-01-01 + 90 gün → 1 Nisan 2026 Çarşamba; çoklu tablo; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    // Başlangıç tarihi varsayılan olarak bugündür
    await expect(page.locator('#start')).toHaveValue(/^\d{4}-\d{2}-\d{2}$/);
    await calc(page, '2026-01-01', '90');
    await expect(page.locator('#r-main')).toHaveText('1 Nisan 2026 Çarşamba');
    await expect(page.locator('#r-iso')).toHaveText('2026-04-01');
    await expect(page.locator('#r-date')).toHaveText('01.04.2026');
    await expect(page.locator('#r-weekday')).toHaveText('Çarşamba');
    await expect(page.locator('#r-cal')).toHaveText('90 gün');
    await expect(page.locator('#r-today')).toContainText('gün');
    // Çoklu hesap tablosu: varsayılan 7 süre
    const rows = page.locator('#multi-body tr');
    await expect(rows).toHaveCount(7);
    await expect(rows.nth(0)).toContainText('8 Ocak 2026');
    await expect(rows.nth(3)).toContainText('2 Mart 2026');
    await expect(rows.nth(6)).toContainText('1 Ocak 2027');
    await expect(rows.nth(6)).toContainText('Cuma');
    // Adres çubuğu paylaşılabilir parametreleri taşır
    expect(page.url()).toContain('t=2026-01-01');
    expect(page.url()).toContain('g=90');
    expect(external).toEqual([]);
    noErrors();
  });

  test('hızlı düğmeler ve geriye doğru hesap', async ({ page }) => {
    await open(page);
    await page.locator('#start').fill('2026-01-01');
    await page.getByRole('button', { name: '30 gün', exact: true }).click();
    await expect(page.locator('#amount')).toHaveValue('30');
    await expect(page.locator('#r-main')).toHaveText('31 Ocak 2026 Cumartesi');
    await page.getByRole('button', { name: '365 gün', exact: true }).click();
    await expect(page.locator('#r-main')).toHaveText('1 Ocak 2027 Cuma');
    // Çıkar: 1 Nisan 2026'dan 90 gün önce → 1 Ocak 2026
    await page.locator('#dir-sub').check();
    await calc(page, '2026-04-01', '90');
    await expect(page.locator('#r-main')).toHaveText('1 Ocak 2026 Perşembe');
    expect(page.url()).toContain('g=-90');
  });

  test('ay ve yıl eklerken ay sonu sabitlenir', async ({ page }) => {
    await open(page);
    await page.locator('#unit').selectOption('ay');
    await calc(page, '2026-01-31', '1');
    await expect(page.locator('#r-main')).toHaveText('28 Şubat 2026 Cumartesi');
    await expect(page.locator('#r-note')).toContainText('ayın son gününe');
    await page.locator('#unit').selectOption('yil');
    await calc(page, '2024-02-29', '1');
    await expect(page.locator('#r-main')).toHaveText('28 Şubat 2025 Cuma');
    await page.locator('#unit').selectOption('hafta');
    await calc(page, '2026-01-01', '6');
    await expect(page.locator('#r-main')).toHaveText('12 Şubat 2026 Perşembe');
  });

  test('iş günü modu hafta sonu ve resmî tatilleri atlar', async ({ page }) => {
    await open(page);
    await page.locator('#cnt-biz').check();
    // 30 Nisan 2026 Perşembe + 1 iş günü: 1 Mayıs (tatil) ve hafta sonu atlanır → 4 Mayıs Pazartesi
    await calc(page, '2026-04-30', '1');
    await expect(page.locator('#r-main')).toHaveText('4 Mayıs 2026 Pazartesi');
    await expect(page.locator('#r-skip')).toHaveText('2 hafta sonu, 1 resmî tatil');
    // Tatiller kapalıyken 1 Mayıs Cuma iş günü sayılır
    await page.locator('#f-hol').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#r-main')).toHaveText('1 Mayıs 2026 Cuma');
    // Ramazan Bayramı: 18 Mart Çarşamba + 3 iş günü
    await page.locator('#f-hol').check();
    await calc(page, '2026-03-18', '3');
    await expect(page.locator('#r-main')).toHaveText('24 Mart 2026 Salı');
    await page.locator('#f-hol').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#r-main')).toHaveText('23 Mart 2026 Pazartesi');
    // Geriye doğru: 4 Mayıs Pazartesi - 1 iş günü → 30 Nisan Perşembe
    await page.locator('#f-hol').check();
    await page.locator('#dir-sub').check();
    await calc(page, '2026-05-04', '1');
    await expect(page.locator('#r-main')).toHaveText('30 Nisan 2026 Perşembe');
    // Hafta = 5 iş günü
    await page.locator('#dir-add').check();
    await page.locator('#unit').selectOption('hafta');
    await calc(page, '2026-06-01', '2');
    await expect(page.locator('#r-main')).toHaveText('15 Haziran 2026 Pazartesi');
  });

  test('iş günü modunda ay ve yıl birimi kapanır', async ({ page }) => {
    await open(page);
    await page.locator('#unit').selectOption('ay');
    await page.locator('#cnt-biz').check();
    await expect(page.locator('#unit')).toHaveValue('gun');
    await expect(page.locator('#unit option[value="ay"]')).toBeDisabled();
    await expect(page.locator('#biz-hint')).toContainText('1 hafta = 5 iş günü');
    await page.locator('#cnt-cal').check();
    await expect(page.locator('#unit option[value="ay"]')).toBeEnabled();
  });

  test('son gün tatile denk gelirse ilk iş gününe ötelenir', async ({ page }) => {
    await open(page);
    await calc(page, '2026-03-13', '7');
    await expect(page.locator('#r-main')).toHaveText('20 Mart 2026 Cuma');
    await page.locator('#f-roll').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-main')).toHaveText('23 Mart 2026 Pazartesi');
    await expect(page.locator('#r-note')).toContainText('ilk iş gününe ötelendi');
    await expect(page.locator('#multi-body tr').first()).toContainText('(ötelendi)');
    // Tebliğ Pazartesi + 7 gün → öteleme gerekmez
    await calc(page, '2026-03-02', '7');
    await expect(page.locator('#r-main')).toHaveText('9 Mart 2026 Pazartesi');
    await expect(page.locator('#r-note')).not.toContainText('ötelendi');
  });

  test('2027 gibi tatil verisi olmayan yılda uyarı gösterilir', async ({ page }) => {
    await open(page);
    await page.locator('#cnt-biz').check();
    await calc(page, '2026-12-28', '5');
    await expect(page.locator('#r-main')).toHaveText('4 Ocak 2027 Pazartesi');
    await expect(page.locator('#r-note')).toContainText('yalnızca 2026 yılı için');
  });

  test('paylaşılabilir adres otomatik hesaplar ve bağlantı kopyalanır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page, '/tarih-ekle-cikar/?t=2026-01-01&g=90');
    await expect(page.locator('#start')).toHaveValue('2026-01-01');
    await expect(page.locator('#r-main')).toHaveText('1 Nisan 2026 Çarşamba');
    await page.getByRole('button', { name: 'Bağlantıyı kopyala' }).click();
    await expect(page.locator('#copy-status')).toContainText('Bağlantı panoya kopyalandı');
    const link = await page.evaluate(() => navigator.clipboard.readText());
    expect(link).toContain('?t=2026-01-01&g=90');
    await page.getByRole('button', { name: 'Sonucu kopyala' }).click();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain('1 Nisan 2026 Çarşamba');
    // İş günü, hafta birimi ve çıkarma parametreleri
    await open(page, '/tarih-ekle-cikar/?t=2026-04-30&g=1&m=is');
    await expect(page.locator('#r-main')).toHaveText('4 Mayıs 2026 Pazartesi');
    await open(page, '/tarih-ekle-cikar/?t=2026-01-01&g=-2&b=hafta');
    await expect(page.locator('#r-main')).toHaveText('18 Aralık 2025 Perşembe');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    // Başlangıç tarihi boş
    await page.locator('#start').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Başlangıç tarihi eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    // Süre boş, negatif ve ondalık
    for (const bad of ['', '-5', '1.5']) {
      await calc(page, '2026-01-01', bad);
      await expect(page.locator('#error')).toContainText('tam sayı olmalıdır');
      await expect(page.locator('#result')).toBeHidden();
    }
    // Aşırı büyük süre
    await calc(page, '2026-01-01', '999999');
    await expect(page.locator('#error')).toContainText('100.000');
    // Geçersiz çoklu liste
    await page.locator('#amount').fill('10');
    await page.locator('#multi').fill('7, abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('"abc" geçersiz');
    // Sonuç aralığın dışına taşıyor
    await page.locator('#multi').fill('');
    await page.locator('#unit').selectOption('yil');
    await calc(page, '2026-01-01', '100000');
    await expect(page.locator('#error')).toContainText('aralığının dışına');
    // Düzeltilince hata kalkar ve sonuç gelir
    await page.locator('#unit').selectOption('gun');
    await calc(page, '2026-01-01', '90');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    // Temizle: sonuç gizlenir, tarih bugüne döner
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#amount')).toHaveValue('90');
  });

  test('içerik: en az 900 kelime, 7+ SSS, 3 reklam alanı', async ({ page }) => {
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="tarih-ekle-cikar-${s}"]`)).toHaveCount(1);
  });
});
