import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Yaş Hesaplama', () => {
  test('29 Şubat 2000 doğumlu, 1 Mart 2026 → 26 yaş; gün, hafta içi ve burç; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/yas-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#birth').fill('2000-02-29');
    await page.locator('#ref').fill('2026-03-01');
    await page.getByRole('button', { name: 'Yaşı hesapla' }).click();
    await expect(page.locator('#r-years')).toHaveText('26 yaş');
    await expect(page.locator('#r-age')).toHaveText('26 yıl, 0 ay, 1 gün');
    await expect(page.locator('#r-days')).toHaveText('9.497 gün');
    await expect(page.locator('#r-weekday')).toHaveText('Salı');
    await expect(page.locator('#r-zodiac')).toHaveText('Balık');
    // 1 Mart 2026'dan 28 Şubat 2027'ye 364 gün
    await expect(page.locator('#r-next')).toContainText('364 gün kaldı');
    expect(external).toEqual([]);
    noErrors();
  });

  test('ay sonu ve doğum günü bugün senaryoları', async ({ page }) => {
    await page.goto('/yas-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#birth').fill('1990-03-15');
    await page.locator('#ref').fill('2026-11-10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-age')).toHaveText('36 yıl, 7 ay, 26 gün');
    await expect(page.locator('#r-months')).toHaveText('439 ay');
    await page.locator('#ref').fill('2026-03-15');
    await page.locator('#calc').click();
    await expect(page.locator('#r-age')).toHaveText('36 yıl, 0 ay, 0 gün');
    await expect(page.locator('#r-next')).toHaveText('Bugün doğum günü!');
    // 31 Ocak doğumlu, 1 Mart → ay sonu taşması negatif gün üretmemeli
    await page.locator('#birth').fill('2000-01-31');
    await page.locator('#ref').fill('2000-03-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-age')).toHaveText('0 yıl, 1 ay, 1 gün');
  });

  test('referans boşsa bugün kullanılır', async ({ page }) => {
    await page.goto('/yas-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#birth').fill('1900-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-note')).toContainText('(bugün)');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/yas-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Doğum tarihi eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#birth').fill('2026-06-01');
    await page.locator('#ref').fill('2026-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Doğum tarihi hesaplanacak tarihten sonra olamaz');
    await page.locator('#birth').fill('1850-05-05');
    await page.locator('#ref').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('1900');
  });
});
