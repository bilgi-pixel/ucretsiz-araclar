import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function fillBasics(page, { entry = '2020-01-01', exit = '2026-01-01', gross = '40000', cap = '64948,77' } = {}) {
  await page.locator('#f-entry').fill(entry);
  await page.locator('#f-exit').fill(exit);
  await page.locator('#f-gross').fill(gross);
  await page.locator('#f-cap').fill(cap);
}

test.describe('Kıdem ve İhbar Tazminatı Hesaplama', () => {
  test('6 yıl, brüt 40.000: kıdem, damga, ihbar 8 hafta; tavan 80.000 brütte uygulanır; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/kidem-tazminati/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await expect(page.locator('#cap-table tr').first()).not.toContainText('Yükleniyor');
    await fillBasics(page);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-tenure')).toHaveText('6 yıl 0 ay 0 gün');
    await expect(page.locator('#r-dressed')).toHaveText('40.000,00 ₺');
    // Kıdem: tavanın altında → giydirilmiş ücret esas, yalnızca damga kesintisi
    await expect(page.locator('#k-gross')).toHaveText('240.000,00 ₺');
    await expect(page.locator('#k-stamp')).toHaveText('− 1.821,60 ₺');
    await expect(page.locator('#k-net')).toHaveText('238.178,40 ₺');
    await expect(page.locator('#k-cap-note')).toContainText('aşılmadı');
    // İhbar: 3 yıldan fazla → 8 hafta = 56 gün; gelir vergisi %15 + damga
    await expect(page.locator('#n-weeks')).toHaveText('8 hafta (56 gün)');
    await expect(page.locator('#n-gross')).toHaveText('74.666,67 ₺');
    await expect(page.locator('#n-tax')).toHaveText('− 11.200,00 ₺');
    await expect(page.locator('#n-stamp')).toHaveText('− 566,72 ₺');
    await expect(page.locator('#n-net')).toHaveText('62.899,95 ₺');
    await expect(page.locator('#l-entitlement')).toHaveText('20 gün / yıl');
    await expect(page.locator('#t-net')).toHaveText('301.078,35 ₺');
    // Tavan üstü ücret → 6 × 64.948,77
    await page.locator('#f-gross').fill('80000');
    await expect(page.locator('#k-base')).toHaveText('64.948,77 ₺');
    await expect(page.locator('#k-gross')).toHaveText('389.692,62 ₺');
    await expect(page.locator('#k-stamp')).toHaveText('− 2.957,77 ₺');
    await expect(page.locator('#k-net')).toHaveText('386.734,85 ₺');
    await expect(page.locator('#k-cap-note')).toContainText('tavan');
    expect(external).toEqual([]);
    noErrors();
  });

  test('tavan çıkış tarihine göre otomatik dolar; 3 ay kıdemde ihbar 2 hafta ve kıdem yok', async ({ page }) => {
    await page.goto('/kidem-tazminati/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-exit').fill('2026-03-15');
    await expect(page.locator('#f-cap')).toHaveValue('64.948,77');
    await expect(page.locator('#cap-status')).toContainText('otomatik dolduruldu');
    await page.locator('#f-entry').fill('2025-10-01');
    await page.locator('#f-exit').fill('2026-01-01');
    await page.locator('#f-gross').fill('30000');
    await expect(page.locator('#r-tenure')).toHaveText('0 yıl 3 ay 0 gün');
    await expect(page.locator('#n-weeks')).toHaveText('2 hafta (14 gün)');
    await expect(page.locator('#n-gross')).toHaveText('14.000,00 ₺');
    await expect(page.locator('#r-rows')).toContainText('1 yıl dolmadığı için hak edilmez');
    await expect(page.locator('#k-gross')).toHaveText('7.561,64 ₺');
    // Toplam yalnızca hak edilen kalemleri içerir: ihbar net = 14.000 − 2.100 − 106,26
    await expect(page.locator('#t-net')).toHaveText('11.793,74 ₺');
  });

  test('çıkış < giriş ve negatif ücrette Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/kidem-tazminati/');
    await page.locator('#f-entry').fill('2026-01-01');
    await page.locator('#f-exit').fill('2020-01-01');
    await page.locator('#f-gross').fill('40000');
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Çıkış tarihi giriş tarihinden önce olamaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-exit').fill('2026-06-01');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#f-gross').fill('-500');
    await expect(page.locator('#error')).toContainText('negatif olamaz');
    await page.locator('#f-gross').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
  });

  test('fesih türü istifa: yalnızca izin ücreti; kopyala ve yazdır', async ({ page }) => {
    await page.goto('/kidem-tazminati/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await fillBasics(page);
    await page.locator('#f-leave').fill('10');
    await expect(page.locator('#l-gross')).toHaveText('13.333,33 ₺');
    await expect(page.locator('#l-sgk')).toHaveText('− 2.000,00 ₺');
    await expect(page.locator('#l-tax')).toHaveText('− 1.700,00 ₺');
    await expect(page.locator('#l-stamp')).toHaveText('− 101,20 ₺');
    await expect(page.locator('#l-net')).toHaveText('9.532,13 ₺');
    await page.locator('#f-type').selectOption('istifa');
    await expect(page.locator('#r-rows')).toContainText('bu fesih türünde ödenmez');
    await expect(page.locator('#t-net')).toHaveText('9.532,13 ₺');
    await expect(page.locator('#r-type-note')).toContainText('kıdem ve ihbar tazminatı alamaz');
    // İşveren feshi + ihbar süresi kullandırıldı → ihbar hariç
    await page.locator('#f-type').selectOption('isveren');
    await page.locator('#f-served').check();
    await expect(page.locator('#t-net')).toHaveText('247.710,53 ₺');
    // Kopyala
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Sonuç kopyalandı.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Kıdem tazminatı (ödenir)');
    expect(clip).toContain('hukuki tavsiye değildir');
    // Yazdır: window.print çağrılır
    await page.evaluate(() => { (window as any).__printed = 0; window.print = () => { (window as any).__printed++; }; });
    await page.locator('#print').click();
    expect(await page.evaluate(() => (window as any).__printed)).toBe(1);
    await expect(page.locator('#print-inputs')).toContainText('2020-01-01');
  });

  test('360px genişlikte yatay kaydırma yok; form klavyeyle gezilebilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/kidem-tazminati/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await fillBasics(page);
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.locator('#f-entry').focus();
    // Chromium tarih alanında Tab önce gün/ay/yıl bölümleri arasında gezer; sonraki alana en fazla 4 Tab ile ulaşılır.
    for (let i = 0; i < 4 && !(await page.locator('#f-exit').evaluate((el) => el === document.activeElement)); i++) await page.keyboard.press('Tab');
    await expect(page.locator('#f-exit')).toBeFocused();
  });
});
