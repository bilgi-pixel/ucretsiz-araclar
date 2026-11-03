import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Saat Dilimi Çevirici', () => {
  test('2026-11-04 12:00 İstanbul → New York 04:00 ve Tokyo 18:00', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/zaman-dilimi-cevirici/');
    await page.waitForSelector('html[data-ready="1"]');
    await page.locator('#dt').fill('2026-11-04T12:00');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toBeVisible();
    const nyCard = page.locator('#cards [data-zone="America/New_York"]');
    await expect(nyCard.locator('.tz-time')).toHaveText('04:00');
    await expect(nyCard.locator('.tz-meta')).toContainText('UTC-5');
    await expect(nyCard.locator('.tz-meta')).toContainText('Kış saati');
    await expect(page.locator('#cards [data-zone="Asia/Tokyo"] .tz-time')).toHaveText('18:00');
    await expect(page.locator('#cards [data-zone="Asia/Tokyo"] .tz-meta')).toContainText('Yaz saati uygulanmıyor');
    // canlı dünya saati kartları dolu
    await expect(page.locator('#world li')).toHaveCount(8);
    await expect(page.locator('#world li').first().locator('.tz-time')).toHaveText(/^\d{2}:\d{2}:\d{2}$/);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('toplantı planlayıcı ortak saat bulur', async ({ page }) => {
    await page.goto('/zaman-dilimi-cevirici/');
    await page.waitForSelector('html[data-ready="1"]');
    await page.locator('#m-c1').selectOption('Europe/Istanbul');
    await page.locator('#m-c2').selectOption('Europe/London');
    await page.locator('#m-c3').selectOption('Europe/Berlin');
    await page.locator('#m-date').fill('2026-11-04');
    await page.locator('#m-calc').click();
    await expect(page.locator('#m-result')).toBeVisible();
    await expect(page.locator('#m-body tr')).toHaveCount(24);
    await expect(page.locator('#m-summary')).toContainText('çalışma saati içinde');
    await expect(page.locator('#m-body tr.tz-all').first()).toBeVisible();
  });

  test('paylaşılabilir bağlantı sonucu açar; hatalı giriş Türkçe uyarı verir', async ({ page }) => {
    await page.goto('/zaman-dilimi-cevirici/?t=2026-11-04T12:00&s=Europe/Istanbul&z=America/New_York');
    await page.waitForSelector('html[data-ready="1"]');
    await expect(page.locator('#cards [data-zone="America/New_York"] .tz-time')).toHaveText('04:00');
    await page.locator('#dt').fill('');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('Tarih ve saat geçerli görünmüyor');
    await expect(page.locator('#result')).toBeHidden();
    await page.goto('/zaman-dilimi-cevirici/?t=abc');
    await page.waitForSelector('html[data-ready="1"]');
    await expect(page.locator('#error')).toContainText('Bağlantıdaki tarih geçersiz');
    // hedef seçilmeden
    await page.locator('#dt').fill('2026-11-04T12:00');
    await page.locator('#sel-none').click();
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('en az bir şehir');
  });
});
