import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('İki Tarih Arası Gün Hesaplama', () => {
  test('1 Ocak - 1 Mart 2026 → 59 gün; dahil ile 60; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/tarih-farki/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await expect(page.locator('#rates-updated')).not.toHaveText('…');
    await page.locator('#d1').fill('2026-01-01');
    await page.locator('#d2').fill('2026-03-01');
    await page.getByRole('button', { name: 'Hesapla' }).click();
    await expect(page.locator('#r-days')).toHaveText('59 gün');
    await expect(page.locator('#r-weeks')).toHaveText('8 hafta 3 gün');
    await expect(page.locator('#r-ymd')).toHaveText('0 yıl, 2 ay, 0 gün');
    await page.locator('#f-incl').check();
    await page.getByRole('button', { name: 'Hesapla' }).click();
    await expect(page.locator('#r-days')).toHaveText('60 gün');
    expect(external).toEqual([]);
    noErrors();
  });

  test('artık yıl ve çok yıllık aralık', async ({ page }) => {
    await page.goto('/tarih-farki/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#d1').fill('2000-01-01');
    await page.locator('#d2').fill('2001-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-days')).toHaveText('366 gün');
    await expect(page.locator('#r-ymd')).toHaveText('1 yıl, 0 ay, 0 gün');
  });

  test('ters sıra tarihler yer değiştirir', async ({ page }) => {
    await page.goto('/tarih-farki/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#d1').fill('2026-03-01');
    await page.locator('#d2').fill('2026-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-days')).toHaveText('59 gün');
    await expect(page.locator('#r-note')).toContainText('yer değiştirildi');
  });

  test('iş günü: hafta sonu ve resmî tatil (Ramazan Bayramı) düşülür', async ({ page }) => {
    await page.goto('/tarih-farki/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await expect(page.locator('#rates-updated')).not.toHaveText('…');
    await page.locator('#d1').fill('2026-03-02');
    await page.locator('#d2').fill('2026-03-27');
    await page.locator('#f-wd').check();
    await page.locator('#calc').click();
    // 2-26 Mart: 19 hafta içi - 20 Mart (Cuma) bayram = 18; 6 hafta sonu günü
    await expect(page.locator('#r-bd')).toHaveText('18 iş günü');
    await expect(page.locator('#r-we')).toHaveText('6 gün');
    await expect(page.locator('#r-hl')).toHaveText('1 gün');
    await page.locator('#f-hol').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#r-bd')).toHaveText('19 iş günü');
  });

  test('2026 dışı yıl için resmî tatil uyarısı', async ({ page }) => {
    await page.goto('/tarih-farki/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await expect(page.locator('#rates-updated')).not.toHaveText('…');
    await page.locator('#d1').fill('2025-12-29');
    await page.locator('#d2').fill('2026-01-05');
    await page.locator('#f-wd').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-note')).toContainText('yalnızca 2026 yılı için');
  });

  test('"kaç gün kaldı" modu: uzak gelecek ve geçmiş hedef', async ({ page }) => {
    await page.goto('/tarih-farki/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.getByLabel('Bugünden hedef tarihe kaç gün kaldı').check();
    await expect(page.locator('#wrap-d1')).toBeHidden();
    await expect(page.locator('#d2-label')).toHaveText('Hedef tarih');
    await page.locator('#d2').fill('2100-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-main')).toContainText(/Hedef tarihe .+ gün kaldı\./);
    await page.locator('#d2').fill('1900-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-main')).toContainText('geçti');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/tarih-farki/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Başlangıç tarihi eksik ya da geçersiz');
    await page.locator('#d1').fill('2026-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Bitiş tarihi eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
