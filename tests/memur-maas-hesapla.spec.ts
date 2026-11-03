import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// "28.075,50 ₺" -> 28075.5
const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('Memur Maaşı Hesaplama (tahmini)', () => {
  test('uyarılar, seçim → pozitif net, 12 satırlı tablo, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/memur-maas-hesapla/');
    await expect(page.locator('h1')).toContainText('(tahmini)');
    await expect(page.locator('#uyari')).toContainText('resmî bordro yerine geçmez');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-derece').selectOption('9');
    await page.locator('#f-kademe').selectOption('1');
    await expect(page.locator('#result')).toBeVisible();
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(0);
    await expect(page.locator('#result')).toContainText('Sendika');
    await expect(page.locator('#result')).toContainText('dil tazminatı');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    expect(external).toEqual([]);
    noErrors();
  });

  test('derece yükselince (9 → 1) net maaş artar; gösterge aylığı formüle uyar', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await page.locator('#f-derece').selectOption('9');
    await page.locator('#f-kademe').selectOption('1');
    const net9 = num(await page.locator('#r-net').textContent());
    const ka = num(await page.locator('#f-ka').inputValue());
    const g9 = num(await page.locator('#f-gosterge').inputValue());
    expect(Math.abs(num(await page.locator('#r-gosterge').textContent()) - g9 * ka)).toBeLessThan(1);
    await page.locator('#f-derece').selectOption('1');
    await page.locator('#f-kademe').selectOption('4');
    expect(num(await page.locator('#f-gosterge').inputValue())).toBe(1500);
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(net9);
    // Aile yardımı brütü artırır
    const brut = num(await page.locator('#r-brut').textContent());
    await page.locator('#f-es').check();
    expect(num(await page.locator('#r-brut').textContent())).toBeGreaterThan(brut);
  });

  test('hatalı katsayı girişinde Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await page.locator('#f-ka').fill('');
    await expect(page.locator('#error')).toContainText('boş bırakılamaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-ka').fill('-3');
    await expect(page.locator('#error')).toContainText('negatif');
    await page.locator('#f-ka').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await page.locator('#f-ka').fill('9,25');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });
});
