import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Roma Rakamı Çevirici', () => {
  test('sayı ↔ Roma, tarih, tablo; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/roma-rakami/');
    await expect(page.locator('html')).toHaveAttribute('data-ready', '1');
    await page.locator('#num').fill('1987');
    await expect(page.locator('#r-main')).toHaveText('MCMLXXXVII');
    await page.locator('#num').fill('4500');
    await expect(page.locator('#r-main')).toContainText('̅');
    await expect(page.locator('#r-note')).toContainText('üst');

    await page.getByLabel('Roma → Sayı').check();
    await page.locator('#rom').fill('MMXXVI');
    await expect(page.locator('#r-main')).toHaveText('2.026');
    await page.locator('#rom').fill('mcmxciv');
    await expect(page.locator('#r-main')).toHaveText('1.994');

    await page.getByLabel('Tarih → Roma').check();
    await page.locator('#ddate').fill('1990-03-15');
    await expect(page.locator('#r-main')).toHaveText('XV.III.MCMXC');

    await expect(page.locator('#grid100 li')).toHaveCount(100);
    await expect(page.locator('#popular')).toContainText('1923 = MCMXXIII');
    expect(external).toEqual([]);
    noErrors();
  });

  test('geçersiz dizilimde Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/roma-rakami/');
    await expect(page.locator('html')).toHaveAttribute('data-ready', '1');
    await page.getByLabel('Roma → Sayı').check();
    await page.locator('#rom').fill('IIII');
    await expect(page.locator('#error')).toContainText('IV');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#rom').fill('VX');
    await expect(page.locator('#error')).toContainText('çıkarma için kullanılamaz');
    await page.locator('#rom').fill('ABC');
    await expect(page.locator('#error')).toContainText('Roma rakamı değil');
    await page.getByLabel('Sayı → Roma').check();
    await page.locator('#num').fill('0');
    await expect(page.locator('#error')).toContainText('sıfır');
  });
});
