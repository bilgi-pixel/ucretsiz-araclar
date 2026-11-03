import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Fazla Mesai Hesaplama', () => {
  test('30.000 TL / 225 saat = 133,33 saat ücreti; 10 saat fazla mesai = 2.000 TL; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/mesai-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#wage').fill('30.000');
    await page.locator('#ot').fill('10');
    await page.getByRole('button', { name: 'Mesaiyi hesapla' }).click();
    await expect(page.locator('#r-hourly')).toHaveText('133,33 TL');
    await expect(page.locator('#r-daily')).toHaveText('1.000,00 TL');
    await expect(page.locator('#r-ot')).toHaveText('2.000,00 TL');
    await expect(page.locator('#r-total')).toHaveText('2.000,00 TL');
    await expect(page.locator('#r-limit')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('tüm kalemler ve toplam', async ({ page }) => {
    await page.goto('/mesai-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#wage').fill('30000');
    await page.locator('#ot').fill('10');
    await page.locator('#ext').fill('12');
    await page.locator('#sunday').fill('1');
    await page.locator('#holiday').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-ext')).toHaveText('2.000,00 TL');
    await expect(page.locator('#r-sunday')).toHaveText('1.500,00 TL');
    await expect(page.locator('#r-holiday')).toHaveText('1.000,00 TL');
    await expect(page.locator('#r-total')).toHaveText('6.500,00 TL');
  });

  test('saatlik ücret modu ve 270 saat uyarısı', async ({ page }) => {
    await page.goto('/mesai-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Saatlik ücret').check();
    await page.locator('#wage').fill('200');
    await page.locator('#ot').fill('10');
    await page.locator('#prior').fill('265');
    await page.locator('#calc').click();
    await expect(page.locator('#r-hourly')).toHaveText('200,00 TL');
    await expect(page.locator('#r-ot')).toHaveText('3.000,00 TL');
    await expect(page.locator('#r-limit')).toBeVisible();
    await expect(page.locator('#r-limit')).toContainText('270');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/mesai-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Aylık brüt ücret eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#wage').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await page.locator('#wage').fill('30000');
    await page.locator('#ot').fill('-5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Fazla çalışma saati');
    await page.locator('#ot').fill('');
    await page.locator('#hours').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('100 ile 300');
  });
});
