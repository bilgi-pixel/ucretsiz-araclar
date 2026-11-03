import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Satış Fiyatı ve Kâr Marjı Hesaplama', () => {
  test('maliyet 100, kâr %30, KDV %20 → hariç 130, dahil 156; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/fiyat-hesapla/');
    await page.locator('#f-cost').fill('100');
    await page.locator('#f-profit').fill('30');
    await expect(page.locator('#r-haric')).toHaveText('130,00 ₺');
    await expect(page.locator('#r-kdv')).toHaveText('26,00 ₺');
    await expect(page.locator('#r-dahil')).toHaveText('156,00 ₺');
    await expect(page.locator('#r-kar')).toHaveText('30,00 ₺');
    await expect(page.locator('#r-marj')).toHaveText('%23,08');
    await expect(page.locator('#r-markup')).toHaveText('%30,00');
    // Marj tabanlı hesap: %50 marj → satış fiyatı maliyetin iki katı
    await page.locator('#f-basis').selectOption('marj');
    await page.locator('#f-profit').fill('50');
    await expect(page.locator('#r-haric')).toHaveText('200,00 ₺');
    await expect(page.locator('#r-markup')).toHaveText('%100,00');
    // %10 KDV
    await page.locator('#f-rate').selectOption('10');
    await expect(page.locator('#r-dahil')).toHaveText('220,00 ₺');
    expect(external).toEqual([]);
    noErrors();
  });

  test('satış fiyatından marj ve markup farkı', async ({ page }) => {
    await page.goto('/fiyat-hesapla/');
    await page.getByLabel('Satış fiyatından kâr marjı ve markup').check();
    await page.locator('#f-cost').fill('100');
    await page.locator('#f-sale').fill('130');
    await expect(page.locator('#r-kar')).toHaveText('30,00 ₺');
    await expect(page.locator('#r-marj')).toHaveText('%23,08');
    await expect(page.locator('#r-markup')).toHaveText('%30,00');
    await page.locator('#f-sale-kdv').selectOption('dahil');
    await page.locator('#f-sale').fill('156');
    await expect(page.locator('#r-haric')).toHaveText('130,00 ₺');
    await expect(page.locator('#r-kar')).toHaveText('30,00 ₺');
  });

  test('hedef kâr, indirim ve komisyon modları', async ({ page }) => {
    await page.goto('/fiyat-hesapla/');
    await page.locator('#f-cost').fill('100');
    await page.getByLabel('Hedef kâr için satış fiyatı').check();
    await page.locator('#f-target').fill('40');
    await expect(page.locator('#r-haric')).toHaveText('140,00 ₺');
    await expect(page.locator('#r-dahil')).toHaveText('168,00 ₺');
    await page.getByLabel('İndirimli fiyat ve kâr').check();
    await page.locator('#f-list').fill('150');
    await page.locator('#f-disc').fill('15');
    await expect(page.locator('#r-haric')).toHaveText('127,50 ₺');
    await expect(page.locator('#r-kar')).toHaveText('27,50 ₺');
    await page.getByLabel('Komisyonlu satış (pazaryeri)').check();
    await page.locator('#f-csale').fill('300');
    await page.locator('#f-comm').fill('10');
    await page.locator('#f-ship').fill('0');
    await page.locator('#f-deduct').uncheck();
    // 300 − %10 komisyon = 270 hesaba geçer; net satış 250 − 100 maliyet − 30 komisyon = 120 kâr
    await expect(page.locator('#r-nakit')).toHaveText('270,00 ₺');
    await expect(page.locator('#r-kar')).toHaveText('120,00 ₺');
  });

  test('toplu liste ve CSV indirme', async ({ page }) => {
    await page.goto('/fiyat-hesapla/');
    await page.getByLabel('Toplu: birden çok ürün').check();
    const rows = page.locator('.bulk-row');
    await expect(rows).toHaveCount(2);
    await rows.nth(0).locator('[data-k="name"]').fill('Kupa');
    await rows.nth(0).locator('[data-k="cost"]').fill('100');
    await rows.nth(0).locator('[data-k="profit"]').fill('30');
    await rows.nth(1).locator('[data-k="name"]').fill('Defter');
    await rows.nth(1).locator('[data-k="cost"]').fill('50');
    await rows.nth(1).locator('[data-k="profit"]').fill('20');
    await rows.nth(1).locator('[data-k="rate"]').selectOption('10');
    await expect(rows.nth(0).locator('[data-k="out"]')).toContainText('156,00 ₺');
    await expect(page.locator('#bt-net')).toHaveText('190,00 ₺');
    await expect(page.locator('#bt-gross')).toHaveText('222,00 ₺');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#bulk-csv').click()]);
    expect(dl.suggestedFilename()).toBe('fiyat-listesi.csv');
    const text = readFileSync((await dl.path())!, 'utf8');
    expect(text).toContain('Kupa');
    expect(text).toContain('156,00');
    expect(text.split('\r\n').filter(Boolean)).toHaveLength(3);
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/fiyat-hesapla/');
    await page.locator('#f-cost').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-cost').fill('-5');
    await expect(page.locator('#error')).toContainText('negatif olamaz');
    await page.locator('#f-cost').fill('100');
    await page.locator('#f-basis').selectOption('marj');
    await page.locator('#f-profit').fill('100');
    await expect(page.locator('#error')).toContainText('%100');
    await page.locator('#f-profit').fill('25');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-haric')).toHaveText('133,33 ₺');
  });
});
