import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const SIGNS = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak', 'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık'];

test.describe('Burç Hesaplama', () => {
  test('15 Ağustos 1990 → Aslan, Metal At, yükselen 12 burçtan biri; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/burc-hesapla/');
    await expect(page.locator('h1')).toContainText('Burç Hesaplama');
    await expect(page.locator('.ba-tool')).toContainText('Eğlence amaçlıdır');
    await page.locator('#birth').fill('1990-08-15');
    await page.locator('#time').fill('06:15');
    await page.locator('#place').selectOption({ label: 'İstanbul' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-sun')).toHaveText('Aslan');
    await expect(page.locator('#r-cn')).toContainText('At');
    const asc = (await page.locator('#r-asc').textContent()) ?? '';
    expect(SIGNS.some((s) => asc.startsWith(s))).toBe(true);
    // Gün doğumunda İstanbul'da yükselen güneş burcuna yakın olmalı (Aslan)
    expect(asc.startsWith('Aslan')).toBe(true);
    await expect(page.locator('#compat-list li')).toHaveCount(12);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geçiş günü uyarısı ve saatsiz yükselen', async ({ page }) => {
    await page.goto('/burc-hesapla/');
    await page.locator('#birth').fill('1995-07-23');
    await page.locator('#calc').click();
    await expect(page.locator('#r-sun-note')).toContainText('iki burç arasındaki geçiş');
    await expect(page.locator('#r-asc')).toHaveText('Hesaplanmadı');
  });

  test('hatalı giriş: tarih eksik, saat var yer yok', async ({ page }) => {
    await page.goto('/burc-hesapla/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Doğum tarihi eksik');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#birth').fill('1990-08-15');
    await page.locator('#time').fill('10:00');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('doğum yeri');
  });
});
