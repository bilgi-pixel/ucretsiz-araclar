import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Kira Artış Oranı Hesaplama', () => {
  test('10.000 TL ve %40 → 14.000 TL; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/kira-artis-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    await expect(page.locator('#rate')).toHaveValue(''); // oran varsayılan boş
    await page.locator('#rent').fill('10.000');
    await page.locator('#rate').fill('40');
    await page.getByRole('button', { name: 'Yeni kirayı hesapla' }).click();
    await expect(page.locator('#r-new')).toContainText('14.000,00 TL');
    await expect(page.locator('#r-inc')).toContainText('4.000,00 TL');
    await expect(page.locator('#r-year-diff')).toContainText('48.000,00 TL');
    expect(external).toEqual([]);
    noErrors();
  });

  test('listeden dönem seçilince oran alana yazılır', async ({ page }) => {
    await page.goto('/kira-artis-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect.poll(async () => page.locator('#period option').count()).toBeGreaterThan(1);
    await page.locator('#period').selectOption({ index: 1 });
    await expect(page.locator('#rate')).not.toHaveValue('');
    await page.locator('#rent').fill('10000');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-note')).toContainText('TBK md. 344');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/kira-artis-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Mevcut kira eksik ya da geçersiz');
    await page.locator('#rent').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Örneğin 10.000');
    await page.locator('#rent').fill('10000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Artış oranı boş');
    await page.locator('#rate').fill('-5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Artış oranı geçersiz');
    await expect(page.locator('#result')).toBeHidden();
  });
});
