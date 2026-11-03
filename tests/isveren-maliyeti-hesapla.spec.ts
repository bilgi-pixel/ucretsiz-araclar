import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('İşveren Maliyeti Hesaplama', () => {
  test('33.030 brüt: SGK işveren 6.771,15, işsizlik 660,60, toplam 40.461,75, net ~28.075, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/isveren-maliyeti-hesapla/');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('33.030');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-sgk')).toHaveText('6.771,15 ₺');
    await expect(page.locator('#r-issizlik')).toHaveText('660,60 ₺');
    await expect(page.locator('#r-toplam')).toHaveText('40.461,75 ₺');
    expect(Math.abs(num(await page.locator('#r-net').textContent()) - 28075.5)).toBeLessThan(1);
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    await expect(page.locator('#r-yillik')).toHaveText('485.541,00 ₺');
    // Çubuk: üç parça toplamı ~%100
    const w = await page.evaluate(() => ['bar-net', 'bar-worker', 'bar-employer'].map((i) => parseFloat((document.getElementById(i) as HTMLElement).style.width)));
    expect(Math.abs(w[0] + w[1] + w[2] - 100)).toBeLessThan(0.1);
    expect(external).toEqual([]);
    noErrors();
  });

  test('5 puan indirimi ve asgari ücret desteği toplam maliyeti düşürür', async ({ page }) => {
    await page.goto('/isveren-maliyeti-hesapla/');
    await page.locator('#f-amount').fill('33.030');
    await page.locator('#f-discount').check();
    await expect(page.locator('#r-toplam')).toHaveText('38.810,25 ₺');
    await page.locator('#f-support').check();
    await page.locator('#f-support-amount').fill('1.000');
    await expect(page.locator('#r-toplam')).toHaveText('37.810,25 ₺');
    await expect(page.locator('#r-destek-wrap')).toBeVisible();
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/isveren-maliyeti-hesapla/');
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
