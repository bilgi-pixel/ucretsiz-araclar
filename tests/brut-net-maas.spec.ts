import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Para metnini sayıya çevirir: "28.075,50 ₺" -> 28075.5
const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('Brüt-Net Maaş Hesaplama', () => {
  test('asgari ücret brüt 33.030 → net yaklaşık 28.075 TL, 12 satırlı tablo, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/brut-net-maas/');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('33.030');
    await expect(page.locator('#result')).toBeVisible();
    // Kuruş farkı toleransı: ±1 TL
    expect(Math.abs(num(await page.locator('#r-net').textContent()) - 28075.5)).toBeLessThan(1);
    await expect(page.locator('#r-gv')).toHaveText('0,00 ₺');
    await expect(page.locator('#r-damga')).toHaveText('0,00 ₺');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    expect(external).toEqual([]);
    noErrors();
  });

  test('50.000 brüt: Ocak neti ~40.207 TL, yıl içinde net düşer; istisnasız daha az net', async ({ page }) => {
    await page.goto('/brut-net-maas/');
    await page.locator('#f-amount').fill('50000');
    expect(Math.abs(num(await page.locator('#r-net').textContent()) - 40207.52)).toBeLessThan(1);
    const dec = num(await page.locator('#tbl tbody tr').nth(11).locator('td').last().textContent());
    expect(dec).toBeLessThan(40207);
    await page.locator('#f-exempt').uncheck();
    expect(num(await page.locator('#r-net').textContent())).toBeLessThan(38000);
  });

  test('netten brüte: 28.075,50 net → brüt 33.030; işveren maliyeti', async ({ page }) => {
    await page.goto('/brut-net-maas/');
    await page.getByLabel('Net maaş (brütü bul)').check();
    await page.locator('#f-amount').fill('28.075,50');
    expect(Math.abs(num(await page.locator('#r-brut').textContent()) - 33030)).toBeLessThan(1);
    await page.locator('#f-employer').check();
    await expect(page.locator('#r-employer-wrap')).toBeVisible();
    await expect(page.locator('#r-employer')).toHaveText('40.461,75 ₺');
    await page.locator('#f-discount').check();
    await expect(page.locator('#r-employer')).toHaveText('38.810,25 ₺');
    await expect(page.locator('#th-employer')).toBeVisible();
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/brut-net-maas/');
    await page.locator('#f-amount').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-amount').fill('-500');
    await expect(page.locator('#error')).toContainText('negatif');
    await page.locator('#f-amount').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#f-amount').fill('40000');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });
});
