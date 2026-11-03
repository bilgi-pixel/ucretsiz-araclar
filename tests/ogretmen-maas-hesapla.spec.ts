import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('Öğretmen Maaşı ve Ek Ders Ücreti Hesaplama (tahmini)', () => {
  test('uyarılar, maaş neti pozitif, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/ogretmen-maas-hesapla/');
    await expect(page.locator('h1')).toContainText('(tahmini)');
    await expect(page.locator('#uyari')).toContainText('resmî bordro yerine geçmez');
    await expect(page.locator('#result')).toBeVisible();
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(0);
    await expect(page.locator('#result')).toContainText('MEB bordrosu esastır');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    expect(external).toEqual([]);
    noErrors();
  });

  test('ek ders 10 saat: brüt = 10 × 4 × birim ücret (140 × aylık katsayı); toplam net maaştan büyük', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    const net0 = num(await page.locator('#r-net').textContent());
    await page.locator('#f-gunduz').fill('10');
    const ka = num(await page.locator('#f-ka').inputValue());
    const unit = num(await page.locator('#r-ekders-unit').textContent());
    expect(Math.abs(unit - 140 * ka)).toBeLessThan(0.01);
    const brut = num(await page.locator('#r-ekders-brut').textContent());
    expect(brut).toBeGreaterThan(0);
    expect(Math.abs(brut - 10 * 4 * unit)).toBeLessThan(0.05);
    const katki = num(await page.locator('#r-ekders-net').textContent());
    expect(katki).toBeGreaterThan(0);
    expect(katki).toBeLessThan(brut);
    const toplam = num(await page.locator('#r-toplam-net').textContent());
    expect(toplam).toBeGreaterThan(net0);
    expect(Math.abs(toplam - (net0 + katki))).toBeLessThan(0.05);
    // Gece dersi birim ücreti gündüzden yüksek
    expect(num(await page.locator('#r-ekders-unit-gece').textContent())).toBeGreaterThan(unit);
  });

  test('unvan ve derece yükselince maaş neti artar', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    await page.locator('#f-unvan').selectOption('ogretmen');
    const a = num(await page.locator('#r-net').textContent());
    await page.locator('#f-unvan').selectOption('bas');
    const b = num(await page.locator('#r-net').textContent());
    expect(b).toBeGreaterThan(a);
    await page.locator('#f-derece').selectOption('4');
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(b);
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    await page.locator('#f-gunduz').fill('-5');
    await expect(page.locator('#error')).toContainText('negatif');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-gunduz').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await page.locator('#f-ka').fill('');
    await page.locator('#f-gunduz').fill('4');
    await expect(page.locator('#error')).toContainText('boş bırakılamaz');
    await page.locator('#f-ka').fill('8,5');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });
});
