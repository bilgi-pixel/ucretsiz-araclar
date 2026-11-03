import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('KYK Borç Hesaplama', () => {
  test('36 ay × 3.000 TL, %20 endeks → 108.000 / 129.600 / 3.600', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kyk-borc-hesapla/');
    await expect(page.locator('#params-date')).toContainText('güncellendi');
    await page.locator('#rows .r-months').first().fill('36');
    await page.locator('#rows .r-amount').first().fill('3000');
    await page.locator('#rate').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-principal')).toContainText('108.000');
    await expect(page.locator('#r-index')).toContainText('21.600');
    await expect(page.locator('#r-total')).toContainText('129.600');
    await expect(page.locator('#r-n')).toContainText('36 taksit');
    await expect(page.locator('#r-inst')).toContainText('3.600');
    await expect(page.locator('#sched tr')).toHaveCount(12);
    await page.locator('#toggle-sched').click();
    await expect(page.locator('#sched tr')).toHaveCount(36);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('iki dönem ve özel taksit sayısı', async ({ page }) => {
    await page.goto('/kyk-borc-hesapla/');
    await page.locator('#rows .r-months').first().fill('9');
    await page.locator('#rows .r-amount').first().fill('2.000,50');
    await page.locator('#add-row').click();
    await page.locator('#rows .r-months').nth(1).fill('10');
    await page.locator('#rows .r-amount').nth(1).fill('3000');
    await page.locator('#inst').fill('48');
    await page.locator('#start').fill('2030-09');
    await page.locator('#calc').click();
    await expect(page.locator('#r-principal')).toContainText('48.004,50');
    await expect(page.locator('#r-n')).toContainText('48 taksit');
    await expect(page.locator('#sched tr').first()).toContainText('Eylül 2030');
    await expect(page.locator('#periods tr')).toHaveCount(2);
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/kyk-borc-hesapla/');
    await page.locator('#rows .r-months').first().fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Ay sayısı');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#rows .r-months').first().fill('12');
    await page.locator('#rows .r-amount').first().fill('-5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Aylık tutar');
    await page.locator('#rows .r-amount').first().fill('3000');
    await page.locator('#rate').fill('yüz');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Endeks oranı');
    expect(external).toEqual([]);
  });
});
