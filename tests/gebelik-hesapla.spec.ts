import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

test.describe('Gebelik Hesaplama', () => {
  test('SAT 2026-01-01 → tahmini doğum 2026-10-08; bugün (sabit saat) 9. hafta 0. gün; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    // "Bugün" 5 Mart 2026 olarak sabitlenir (zamanlayıcılar çalışmaya devam eder)
    await page.clock.setFixedTime(new Date('2026-03-05T12:00:00'));
    await page.goto('/gebelik-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await page.locator('#lmp').fill('2026-01-01');
    await page.getByRole('button', { name: 'Gebeliği hesapla' }).click();
    await expect(page.locator('#r-edd-iso')).toHaveText('2026-10-08');
    await expect(page.locator('#r-edd')).toHaveText('8 Ekim 2026');
    await expect(page.locator('#r-edd-day')).toHaveText('Perşembe');
    await expect(page.locator('#r-week')).toHaveText('9. hafta 0. gün');
    await expect(page.locator('#r-tri')).toContainText('1. trimester');
    await expect(page.locator('#r-left')).toContainText('217 gün');
    await expect(page.locator('#r-disclaimer')).toBeVisible();
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    // Haftalık takvim: 40. hafta = 8 Ekim 2026'dan başlar; mevcut hafta işaretli
    await expect(page.locator('#week-body tr')).toHaveCount(39);
    await expect(page.locator('#week-body tr.is-now')).toContainText('9. hafta');
    await expect(page.locator('#week-body tr', { hasText: '40. hafta' })).toContainText('8 Eki 2026');
    expect(external).toEqual([]);
    noErrors();
  });

  test('döngü düzeltmesi, tüp bebek ve bilinen doğum tarihi; hesaplanacak tarih alanı', async ({ page }) => {
    await page.goto('/gebelik-hesapla/');
    await page.waitForLoadState('networkidle');
    // 32 günlük döngü → 4 gün sonra: 12 Ekim 2026
    await page.locator('#lmp').fill('2026-01-01');
    await page.locator('#cycle').fill('32');
    await page.locator('#ref').fill('2026-04-02');
    await page.locator('#calc').click();
    await expect(page.locator('#r-edd-iso')).toHaveText('2026-10-12');
    await expect(page.locator('#r-week')).toHaveText('12. hafta 3. gün'); // gebelik başlangıcı 5 Ocak; 5 Oca → 2 Nis = 87 gün
    await expect(page.locator('#r-tri')).toContainText('1. trimester');
    // Tüp bebek: 5. gün transfer 2026-01-10 + 261 gün = 2026-09-28
    await page.getByLabel('Tüp bebek transfer tarihi').check();
    await page.locator('#ivf').fill('2026-01-10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-edd-iso')).toHaveText('2026-09-28');
    // 3. gün transfer: +263 = 2026-09-30
    await page.locator('#ivf-day').selectOption('3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-edd-iso')).toHaveText('2026-09-30');
    // Bilinen doğum tarihi, hesaplanan gün = doğum günü → 40. hafta, 3. trimester
    await page.getByLabel('Bilinen doğum tarihi').check();
    await page.locator('#edd-in').fill('2026-10-08');
    await page.locator('#ref').fill('2026-10-08');
    await page.locator('#calc').click();
    await expect(page.locator('#r-week')).toHaveText('40. hafta 0. gün');
    await expect(page.locator('#r-tri')).toContainText('3. trimester');
    await expect(page.locator('#r-left')).toContainText('bugün');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/gebelik-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Son adet tarihi eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#lmp').fill('2026-01-01');
    await page.locator('#cycle').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('21–45');
    await page.locator('#cycle').fill('28');
    // Hesaplanacak tarih gebelikten önce
    await page.locator('#ref').fill('2025-12-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('başlangıcından önce');
    // 44 haftadan uzun
    await page.locator('#ref').fill('2027-03-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('44 haftayı aşıyor');
    await expect(page.locator('#result')).toBeHidden();
  });
});
