import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/kurban-hisse-hesapla/';

async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
}
async function calc(page: Page) {
  await page.locator('#calc').click();
}

test.describe('Kurban Hisse ve Et Paylaşımı Hesaplama', () => {
  test('70.000 ₺ büyükbaş 7 hisse → 10.000 ₺; 400 kg × %50 → 200 kg; hisse başı ≈ 28,6 kg; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#shares')).toHaveValue('7');
    await expect(page.locator('#randiman')).toHaveValue('50');
    await page.locator('#price').fill('70.000');
    await page.locator('#weight').fill('400');
    await calc(page);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-share-price')).toHaveText('10.000 ₺');
    await expect(page.locator('#r-share-total')).toHaveText('10.000 ₺');
    await expect(page.locator('#r-total')).toHaveText('70.000 ₺');
    await expect(page.locator('#r-meat')).toHaveText('200 kg');
    await expect(page.locator('#r-meat-share')).toHaveText('28,6 kg');
    await expect(page.locator('#r-per-kg')).toHaveText('350 ₺');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(7);
    await expect(page.locator('#tbl tbody tr').first()).toContainText('Hissedar 1');
    await expect(page.locator('#tbl tbody tr').first()).toContainText('10.000 ₺');
    await expect(page.locator('#tbl tbody tr').first()).toContainText('28,6 kg');
    await expect(page.locator('#tbl tfoot')).toContainText('70.000 ₺');
    await expect(page.locator('#tbl tfoot')).toContainText('200 kg');
    await expect(page.locator('#din-uyari')).toContainText('Dinî hüküm vermez');
    await expect(page.locator('#din-uyari a[href="https://www.diyanet.gov.tr/"]')).toHaveAttribute('rel', 'noopener');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kesim ve diğer giderler hisse başına eklenir', async ({ page }) => {
    await open(page);
    await page.locator('#price').fill('70000');
    await page.locator('#fee').fill('7.000');
    await page.locator('#other').fill('700');
    await calc(page);
    await expect(page.locator('#r-share-price')).toHaveText('10.000 ₺');
    await expect(page.locator('#r-fee-share')).toHaveText('1.000 ₺');
    await expect(page.locator('#r-other-share')).toHaveText('100 ₺');
    await expect(page.locator('#r-share-total')).toHaveText('11.100 ₺');
    await expect(page.locator('#r-total')).toHaveText('77.700 ₺');
    // ağırlık girilmediyse et satırları gizlenir
    await expect(page.locator('#meat-row-b')).toBeHidden();
    await expect(page.locator('#th-meat')).toBeHidden();
    await expect(page.locator('#r-note')).toContainText('et tahmini yapılmadı');
  });

  test('kuruş farkı en büyük kalan yöntemiyle dağıtılır; toplam girdiyle eşit', async ({ page }) => {
    await open(page);
    await page.locator('#price').fill('100000');
    await calc(page);
    await expect(page.locator('#r-share-price')).toHaveText('14.285,71 ₺');
    const rows = page.locator('#tbl tbody tr');
    for (const i of [0, 1, 2]) await expect(rows.nth(i)).toContainText('14.285,72 ₺');
    for (const i of [3, 4, 5, 6]) await expect(rows.nth(i)).toContainText('14.285,71 ₺');
    await expect(page.locator('#tbl tfoot')).toContainText('100.000 ₺');
    // virgüllü ve binlik ayraçlı girişler
    await page.locator('#price').fill('70.000,50');
    await calc(page);
    await expect(page.locator('#r-total')).toHaveText('70.000,5 ₺');
    await expect(rows.nth(0)).toContainText('10.000,08 ₺');
    await expect(rows.nth(1)).toContainText('10.000,07 ₺');
  });

  test('küçükbaş: hisse 1\'de kilitlenir, randıman %45, istek bazlı kapanır', async ({ page }) => {
    await open(page);
    await page.locator('#animal').selectOption('kucukbas');
    await expect(page.locator('#shares')).toHaveValue('1');
    await expect(page.locator('#shares')).toBeDisabled();
    await expect(page.locator('#randiman')).toHaveValue('45');
    await expect(page.locator('#mode-custom')).toBeDisabled();
    await page.locator('#price').fill('12.000');
    await page.locator('#fee').fill('500');
    await page.locator('#weight').fill('50');
    await calc(page);
    await expect(page.locator('#r-share-price')).toHaveText('12.000 ₺');
    await expect(page.locator('#r-share-total')).toHaveText('12.500 ₺');
    await expect(page.locator('#r-meat')).toHaveText('22,5 kg');
    await expect(page.locator('#r-meat-share')).toHaveText('22,5 kg');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(1);
    // büyükbaşa dönünce hisse yeniden 7 olur ve açılır
    await page.locator('#animal').selectOption('buyukbas');
    await expect(page.locator('#shares')).toBeEnabled();
    await expect(page.locator('#shares')).toHaveValue('7');
    await expect(page.locator('#randiman')).toHaveValue('50');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('randıman alanı değiştirilebilir', async ({ page }) => {
    await open(page);
    await page.locator('#price').fill('70000');
    await page.locator('#weight').fill('400');
    await page.locator('#randiman').fill('52,5');
    await calc(page);
    await expect(page.locator('#r-meat')).toHaveText('210 kg');
    await expect(page.locator('#r-meat-share')).toHaveText('30 kg');
  });

  test('istek bazlı paylaşım: 3-2-2 hisse; toplam uyuşmazsa hata', async ({ page }) => {
    await open(page);
    await page.locator('#price').fill('70000');
    await page.locator('#fee').fill('7000');
    await page.locator('#weight').fill('400');
    await page.locator('#mode-custom').check();
    await expect(page.locator('#custom-box')).toBeVisible();
    // başlangıçta 4 + 3 = 7 hisse
    await expect(page.locator('#people li')).toHaveCount(2);
    await expect(page.locator('#people-total')).toHaveText('Toplam: 7 / 7 hisse');
    await page.locator('#people li:nth-child(1) .kh-name').fill('Ali');
    await page.locator('#people li:nth-child(1) .kh-adet').fill('3');
    await page.locator('#people li:nth-child(2) .kh-name').fill('Veli');
    await page.locator('#people li:nth-child(2) .kh-adet').fill('2');
    await expect(page.locator('#people-total')).toHaveText('Toplam: 5 / 7 hisse');
    await calc(page);
    await expect(page.locator('#error')).toContainText('toplamı 5');
    await expect(page.locator('#error')).toContainText('7 olmalı');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#add-person').click();
    await expect(page.locator('#people li')).toHaveCount(3);
    await page.locator('#people li:nth-child(3) .kh-name').fill('Ayşe');
    await page.locator('#people li:nth-child(3) .kh-adet').fill('2');
    await expect(page.locator('#people-total')).toHaveText('Toplam: 7 / 7 hisse');
    await calc(page);
    await expect(page.locator('#error')).toBeHidden();
    const rows = page.locator('#tbl tbody tr');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toContainText('Ali');
    await expect(rows.nth(0)).toContainText('30.000 ₺'); // 70.000 × 3/7
    await expect(rows.nth(0)).toContainText('3.000 ₺'); // 7.000 × 3/7
    await expect(rows.nth(0)).toContainText('33.000 ₺');
    await expect(rows.nth(0)).toContainText('85,7 kg'); // 200 × 3/7
    await expect(rows.nth(2)).toContainText('Ayşe');
    await expect(rows.nth(2)).toContainText('22.000 ₺');
    await expect(rows.nth(2)).toContainText('57,1 kg');
    await expect(page.locator('#table-title')).toContainText('istek bazlı');
    await expect(page.locator('#tbl tfoot')).toContainText('77.000 ₺');
    // hissedar kaldır
    await page.locator('#people li:nth-child(3) [data-act="rm"]').click();
    await expect(page.locator('#people li')).toHaveCount(2);
    await expect(page.locator('#people-total')).toHaveText('Toplam: 5 / 7 hisse');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; sonuç gizlenir', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    // fiyat boş
    await calc(page);
    await expect(err).toContainText('toplam fiyatını');
    await expect(page.locator('#result')).toBeHidden();
    // fiyat 0 ve geçersiz
    await page.locator('#price').fill('0');
    await calc(page);
    await expect(err).toContainText("0'dan büyük");
    await page.locator('#price').fill('abc');
    await calc(page);
    await expect(err).toContainText('toplam fiyatını');
    await page.locator('#price').fill('70000');
    // büyükbaşta 8 hisse
    await page.locator('#shares').fill('8');
    await calc(page);
    await expect(err).toContainText('en fazla 7 hisse');
    await expect(err).toContainText('ikinci bir hayvan');
    await page.locator('#shares').fill('0');
    await calc(page);
    await expect(err).toContainText('1 ile 7 arasında');
    await page.locator('#shares').fill('2,5');
    await calc(page);
    await expect(err).toContainText('tam sayı');
    await page.locator('#shares').fill('7');
    // negatif ücret
    await page.locator('#fee').fill('-5');
    await calc(page);
    await expect(err).toContainText('Kesim ve yüzme ücreti');
    await page.locator('#fee').fill('');
    // ağırlık
    await page.locator('#weight').fill('abc');
    await calc(page);
    await expect(err).toContainText('Canlı ağırlığı kilogram');
    await page.locator('#weight').fill('9000');
    await calc(page);
    await expect(err).toContainText('gerçekçi görünmüyor');
    await page.locator('#weight').fill('400');
    // randıman aralık dışı
    await page.locator('#randiman').fill('90');
    await calc(page);
    await expect(err).toContainText('%20 ile %80');
    await page.locator('#randiman').fill('50');
    await calc(page);
    await expect(err).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    // hata sonrası sonuç tekrar gizlenir
    await page.locator('#price').fill('');
    await calc(page);
    await expect(page.locator('#result')).toBeHidden();
  });

  test('parametreler.json: randıman değerleri, yaklaşık işareti ve güncelleme tarihi', async ({ page, request }) => {
    const res = await request.get('/kurban-hisse-hesapla/parametreler.json');
    expect(res.ok()).toBe(true);
    const p = await res.json();
    expect(p.yaklasik).toBe(true);
    expect(p.hayvanlar.buyukbas.maksHisse).toBe(7);
    expect(p.hayvanlar.buyukbas.randimanYuzde).toBe(50);
    expect(p.hayvanlar.kucukbas.maksHisse).toBe(1);
    expect(p.hayvanlar.kucukbas.randimanYuzde).toBe(45);
    expect(p.guncelleme).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(p.kaynak).toContain('Diyanet');
    await open(page);
    await expect(page.locator('#params-date')).not.toHaveText('…');
    await expect(page.locator('.kh-params')).toContainText('güncellendi');
  });

  test('sonucu kopyala metni hisse bilgisini ve uyarıyı içerir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await page.locator('#price').fill('70000');
    await page.locator('#weight').fill('400');
    await calc(page);
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain('Hisse bedeli: 10.000 ₺');
    expect(text).toContain('Tahmini et: 200 kg');
    expect(text).toContain('dinî hüküm içermez');
  });

  test('yazdır düğmesi başlık bilgisini doldurur ve yazdırmayı başlatır', async ({ page }) => {
    await page.addInitScript(() => { (window as any).print = () => { (window as any).__printed = true; }; });
    await open(page);
    await page.locator('#price').fill('70000');
    await calc(page);
    await page.locator('#print').click();
    expect(await page.evaluate(() => (window as any).__printed)).toBe(true);
    await expect(page.locator('#print-inputs')).toContainText('7 hisse');
    await expect(page.locator('#print-date')).not.toHaveText('');
  });

  test('360px genişlikte sayfa taşmaz; tablo kendi içinde kayar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    await page.locator('#price').fill('70000');
    await page.locator('#fee').fill('7000');
    await page.locator('#weight').fill('400');
    await calc(page);
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
