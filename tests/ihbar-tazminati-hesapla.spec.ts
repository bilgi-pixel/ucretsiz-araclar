import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function fill(page, { entry, exit, gross, extras = '', base = '' }) {
  await page.locator('#f-entry').fill(entry);
  await page.locator('#f-exit').fill(exit);
  await page.locator('#f-gross').fill(gross);
  await page.locator('#f-extras').fill(extras);
  await page.locator('#f-base').fill(base);
  await page.locator('#calc').click();
}

test.describe('İhbar Tazminatı ve İhbar Süresi Hesaplama', () => {
  test('2 yıl kıdem: 6 hafta; 30.000 brüt → 42 gün × 1.000 = 42.000 brüt; vergiler ve net; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/ihbar-tazminati-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await fill(page, { entry: '2024-01-01', exit: '2026-01-01', gross: '30000' });
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-tenure')).toHaveText('2 yıl 0 ay 0 gün');
    await expect(page.locator('#r-weeks')).toHaveText('6 hafta (42 gün)');
    await expect(page.locator('#r-daily')).toHaveText('1.000,00 ₺');
    await expect(page.locator('#r-gross')).toHaveText('42.000,00 ₺');
    // %15 gelir vergisi (matrah 0) ve binde 7,59 damga
    await expect(page.locator('#r-tax')).toHaveText('− 6.300,00 ₺');
    await expect(page.locator('#r-stamp')).toHaveText('− 318,78 ₺');
    await expect(page.locator('#r-net')).toHaveText('35.381,22 ₺');
    // Yan hak eklenince giydirilmiş ücret artar: 33.000 / 30 = 1.100 → 46.200
    await fill(page, { entry: '2024-01-01', exit: '2026-01-01', gross: '30000', extras: '3000' });
    await expect(page.locator('#r-gross')).toHaveText('46.200,00 ₺');
    // Kümülatif matrah 180.000: 10.000 %15, kalan %20 → 1.500 + 6.400 = 7.900
    await fill(page, { entry: '2024-01-01', exit: '2026-01-01', gross: '30000', base: '180000' });
    await expect(page.locator('#r-tax')).toHaveText('− 7.900,00 ₺');
    // İşçi ihbarsız ayrılırsa vergi satırları gizlenir
    await page.locator('#f-case').selectOption('isci');
    await page.locator('#calc').click();
    await expect(page.locator('#row-tax')).toBeHidden();
    await expect(page.locator('#r-net')).toHaveText('42.000,00 ₺');
    expect(external).toEqual([]);
    noErrors();
  });

  test('ihbar süresi basamakları: 5 ay 2, 6 ay 4, 18 ay 6, 3 yıl 6, 3 yıl 1 gün 8 hafta', async ({ page }) => {
    await page.goto('/ihbar-tazminati-hesapla/');
    const cases: Array<[string, string, string]> = [
      ['2026-01-01', '2026-06-01', '2 hafta (14 gün)'],
      ['2026-01-01', '2026-07-01', '4 hafta (28 gün)'],
      ['2025-01-01', '2026-07-01', '6 hafta (42 gün)'],
      ['2023-01-01', '2026-01-01', '6 hafta (42 gün)'],
      ['2023-01-01', '2026-01-02', '8 hafta (56 gün)'],
    ];
    for (const [entry, exit, expected] of cases) {
      await fill(page, { entry, exit, gross: '30000' });
      await expect(page.locator('#r-weeks')).toHaveText(expected);
    }
  });

  test('hatalı girişte Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/ihbar-tazminati-hesapla/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('takvimden eksiksiz seçin');
    await expect(page.locator('#result')).toBeHidden();
    await fill(page, { entry: '2026-05-01', exit: '2026-01-01', gross: '30000' });
    await expect(page.locator('#error')).toContainText('Çıkış tarihi işe giriş tarihinden önce olamaz');
    await fill(page, { entry: '2024-01-01', exit: '2026-01-01', gross: 'abc' });
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await fill(page, { entry: '2024-01-01', exit: '2026-01-01', gross: '' });
    await expect(page.locator('#error')).toContainText('brüt ücretinizi girin');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfa en az 900 kelime içerik, 7 SSS, 3 reklam ve kıdem aracı bağlantısı içerir', async ({ page }) => {
    await page.goto('/ihbar-tazminati-hesapla/');
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-content a[href="../kidem-tazminati/"]').first()).toBeVisible();
  });
});
