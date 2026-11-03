import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('KDV Hesaplama', () => {
  test('1000 hariç %20 → KDV 200,00 ve dahil 1.200,00; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/kdv-hesapla/');
    await expect(page.locator('#rates-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('1000');
    await expect(page.locator('#r-kdv')).toHaveText('200,00 ₺');
    await expect(page.locator('#r-dahil')).toHaveText('1.200,00 ₺');
    await expect(page.locator('#r-haric')).toHaveText('1.000,00 ₺');
    // Paylaşılabilir URL parametreleri
    await expect(page).toHaveURL(/tutar=1000/);
    await expect(page).toHaveURL(/oran=20/);
    await expect(page).toHaveURL(/mod=haric/);
    // Adet ve Türkçe biçimli giriş
    await page.locator('#f-amount').fill('1.250,50');
    await page.locator('#f-qty').fill('2');
    await expect(page.locator('#r-base')).toHaveText('2.501,00 ₺');
    await expect(page.locator('#r-kdv')).toHaveText('500,20 ₺');
    await expect(page.locator('#r-dahil')).toHaveText('3.001,20 ₺');
    expect(external).toEqual([]);
    noErrors();
  });

  test('1200 dahil %20 → hariç 1.000,00; %10 ve özel oran', async ({ page }) => {
    await page.goto('/kdv-hesapla/');
    await page.getByLabel('KDV dahil tutarı').check();
    await expect(page.locator('#amount-label')).toHaveText('KDV dahil tutar (₺)');
    await page.locator('#f-amount').fill('1200');
    await expect(page.locator('#r-haric')).toHaveText('1.000,00 ₺');
    await expect(page.locator('#r-kdv')).toHaveText('200,00 ₺');
    await expect(page.locator('#r-dahil')).toHaveText('1.200,00 ₺');
    await page.locator('#f-rate').selectOption('10');
    await expect(page.locator('#r-haric')).toHaveText('1.090,91 ₺');
    await expect(page.locator('#r-kdv')).toHaveText('109,09 ₺');
    await page.locator('#f-rate').selectOption('ozel');
    await expect(page.locator('#f-rate-custom')).toBeVisible();
    await page.locator('#f-rate-custom').fill('8');
    await expect(page.locator('#r-haric')).toHaveText('1.111,11 ₺');
  });

  test('tevkifat 5/10 satırları ve URL ile yükleme', async ({ page }) => {
    await page.goto('/kdv-hesapla/?tutar=1000&oran=20&mod=haric&tevkifat=5/10');
    await expect(page.locator('#f-wh')).toBeChecked();
    await expect(page.locator('#r-withheld')).toHaveText('100,00 ₺');
    await expect(page.locator('#r-declared')).toHaveText('100,00 ₺');
    await expect(page.locator('#r-payable')).toHaveText('1.100,00 ₺');
    await page.locator('#f-wh-rate').fill('abc');
    await expect(page.locator('#error')).toContainText('Tevkifat oranı');
  });

  test('negatif ve harf girişinde Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/kdv-hesapla/');
    await page.locator('#f-amount').fill('-500');
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('negatif olamaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-amount').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#f-amount').fill('100');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-kdv')).toHaveText('20,00 ₺');
  });

  test('çoklu satır fatura taslağı: oran bazlı toplamlar, satır sil', async ({ page }) => {
    await page.goto('/kdv-hesapla/');
    await page.locator('#multi summary').click();
    const rows = page.locator('.inv-row');
    await expect(rows).toHaveCount(2);
    await rows.nth(0).locator('[data-k="price"]').fill('100');
    await rows.nth(0).locator('[data-k="rate"]').selectOption('20');
    await rows.nth(1).locator('[data-k="price"]').fill('50');
    await rows.nth(1).locator('[data-k="qty"]').fill('2');
    await rows.nth(1).locator('[data-k="rate"]').selectOption('10');
    await expect(page.locator('#inv-net')).toHaveText('200,00 ₺');
    await expect(page.locator('#inv-vat-20')).toHaveText('20,00 ₺');
    await expect(page.locator('#inv-vat-10')).toHaveText('10,00 ₺');
    await expect(page.locator('#inv-vat')).toHaveText('30,00 ₺');
    await expect(page.locator('#inv-gross')).toHaveText('230,00 ₺');
    await page.locator('#inv-add').click();
    await expect(rows).toHaveCount(3);
    await rows.nth(2).locator('.inv-del').click();
    await rows.nth(1).locator('.inv-del').click();
    await expect(rows).toHaveCount(1);
    await expect(page.locator('#inv-gross')).toHaveText('120,00 ₺');
  });

  test('yüzde sekmesi: yüzdesi, değişim ve indirim; klavyeyle sekme geçişi', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/kdv-hesapla/');
    await page.locator('#tab-kdv').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#panel-yuzde')).toBeVisible();
    await expect(page.locator('#panel-kdv')).toBeHidden();
    await expect(page).toHaveURL(/sekme=yuzde/);
    await page.locator('#p-x').fill('2500');
    await page.locator('#p-y').fill('18');
    await expect(page.locator('#p-r1')).toHaveText('450,00');
    await page.locator('#p-a').fill('800');
    await page.locator('#p-b').fill('1000');
    await expect(page.locator('#p-r2')).toHaveText('%25,00 artış');
    await page.locator('#p-price').fill('1200');
    await page.locator('#p-rate').fill('15');
    await expect(page.locator('#p-r3')).toContainText('1.020,00 ₺');
    await page.locator('#p-dir').selectOption('artis');
    await expect(page.locator('#p-r3')).toContainText('1.380,00 ₺');
    await page.locator('#p-a').fill('0');
    await expect(page.locator('#p-error')).toContainText('tanımsız');
    expect(external).toEqual([]);
  });
});
