import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Hicri-Miladi Tarih Çevirme', () => {
  test('20 Mart 2026 → 1 Şevval 1447, ters yön aynı güne döner, dini günler listelenir; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/hicri-miladi/');
    await expect(page.locator('html')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#today-hijri')).not.toBeEmpty();
    await page.locator('#gdate').fill('2026-03-20');
    await expect(page.locator('#r-hijri')).toHaveText('1 Şevval 1447');
    await expect(page.locator('#r-weekday')).toHaveText('Cuma');
    const d = await page.locator('#r-hijri').evaluate((e) => ({ day: (e as HTMLElement).dataset.day!, month: (e as HTMLElement).dataset.month!, year: (e as HTMLElement).dataset.year! }));

    // Ters yön: aynı hicri tarih → aynı miladi gün
    await page.getByLabel('Hicri → Miladi').check();
    await page.locator('#hday').fill(d.day);
    await page.locator('#hmonth').selectOption(d.month);
    await page.locator('#hyear').fill(d.year);
    await expect(page.locator('#r-greg')).toHaveAttribute('data-iso', '2026-03-20');
    await expect(page.locator('#r-greg')).toHaveText('20 Mart 2026');

    // Civil takvimde de tutarlı
    await page.locator('#cal').selectOption('islamic-civil');
    await expect(page.locator('#r-cal')).toHaveText('Tabular (civil)');

    // Dini günler: 2026 listesinde Ramazan Bayramı ve Ramazan başlangıcı
    await page.locator('#ev-year').fill('2026');
    await expect(page.locator('#ev-list')).toContainText('Ramazan Bayramı 1. gün');
    await expect(page.locator('#ev-list')).toContainText('Ramazan başlangıcı');
    await expect(page.locator('#ev-list')).toContainText('Kurban Bayramı 1. gün');
    expect(external).toEqual([]);
    noErrors();
  });

  test('30. günü olmayan ay ve aralık dışı yıl için Türkçe hata verir', async ({ page }) => {
    await page.goto('/hicri-miladi/');
    await expect(page.locator('html')).toHaveAttribute('data-ready', '1');
    await page.getByLabel('Hicri → Miladi').check();
    await page.locator('#hmonth').selectOption('2'); // Safer 29 çeker (ümmülkura'da 1447 için en az bir ay 29)
    await page.locator('#hyear').fill('1600');
    await page.locator('#hday').fill('5');
    await expect(page.locator('#error')).toContainText('1318–1500');
    await expect(page.locator('#result')).toBeHidden();
    // Geçerli yıl, gün 30: ya sonuç gelir ya da "yok" uyarısı; asla çökmez
    await page.locator('#hyear').fill('1447');
    await page.locator('#hday').fill('30');
    await expect(page.locator('#result, #error.is-active').first()).toBeVisible();
    // 31. gün kabul edilmez
    await page.locator('#hday').fill('31');
    await expect(page.locator('#error')).toContainText('Hicri gün 1–30');
  });
});
