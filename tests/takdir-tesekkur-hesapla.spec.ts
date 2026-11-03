import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

async function fill(page: Page, i: number, saat: string, p1: string, p2: string) {
  await page.locator(`#d-${i}-saat`).fill(saat);
  await page.locator(`#d-${i}-p1`).fill(p1);
  await page.locator(`#d-${i}-p2`).fill(p2);
}

test.describe('Takdir Teşekkür Hesaplama', () => {
  test('4 ders ağırlıklı ortalama 89,00 → Takdir; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/takdir-tesekkur-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await fill(page, 0, '5', '90', '90');
    await fill(page, 1, '4', '80', '80');
    await fill(page, 2, '3', '90', '94');
    await fill(page, 3, '2', '100', '100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-ort')).toHaveText('89,00');
    await expect(page.locator('#r-durum')).toHaveText('Takdir belgesi');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('48 puanlı ders → belge yok', async ({ page }) => {
    await page.goto('/takdir-tesekkur-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await fill(page, 0, '5', '90', '90');
    await fill(page, 1, '4', '80', '80');
    await fill(page, 2, '3', '90', '94');
    await fill(page, 3, '2', '100', '100');
    await fill(page, 4, '1', '48', '48');
    await page.locator('#calc').click();
    await expect(page.locator('#r-durum')).toContainText('belgesi yok');
    await expect(page.locator('#r-neden')).toContainText('50 altında');
  });

  test('bekleyen 2. dönem: takdir için gereken puan gösterilir', async ({ page }) => {
    await page.goto('/takdir-tesekkur-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#d-0-saat').fill('4');
    await page.locator('#d-0-p1').fill('80');
    await page.locator('#calc').click();
    await expect(page.locator('#r-eksik')).toContainText('2. dönem puan ortalaması en az 90');
  });

  test('hatalı giriş: 100 üstü puan ve saatsiz ders', async ({ page }) => {
    await page.goto('/takdir-tesekkur-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await fill(page, 0, '5', '120', '90');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('0 ile 100 arasında');
    await fill(page, 0, '', '90', '90');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('haftalık ders saatini');
    await expect(page.locator('#result')).toBeHidden();
  });
});
