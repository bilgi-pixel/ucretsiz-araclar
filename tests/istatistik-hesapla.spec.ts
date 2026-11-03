import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

test.describe('Ortalama, Medyan, Mod, Standart Sapma Hesaplama', () => {
  test('2,4,4,4,5,5,7,9: ortalama 5, medyan 4,5, mod 4, anakütle sapma 2; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/istatistik-hesapla/');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#data').fill('2,4,4,4,5,5,7,9');
    await expect(page.locator('#r-mean')).toHaveText('5');
    await expect(page.locator('#r-median')).toHaveText('4,5');
    await expect(page.locator('#r-mode')).toHaveText('4');
    await expect(page.locator('#r-sd')).toHaveText('2');
    await expect(page.locator('#r-n')).toHaveText('8');
    await expect(page.locator('#r-sum')).toHaveText('40');
    await expect(page.locator('#r-range')).toHaveText('7');
    await expect(page.locator('#steps li').first()).toContainText('Toplam');
    await expect(page.locator('#hist')).toBeVisible();
    await expect(page.locator('#freq-body tr')).toHaveCount(5);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('örneklem sapması ve z-skoru; Türkçe ondalık virgül ve satır ayracı', async ({ page }) => {
    await page.goto('/istatistik-hesapla/');
    await page.locator('#data').fill('2\n4\n4\n4\n5\n5\n7\n9');
    await page.locator('#kind').selectOption('sample');
    await expect(page.locator('#r-sd')).toHaveText('2,1381');
    await page.locator('#kind').selectOption('pop');
    await page.locator('#zx').fill('7');
    await expect(page.locator('#r-z')).toHaveText('1');
    await page.locator('#data').fill('1,5 2,5 3,5');
    await expect(page.locator('#r-mean')).toHaveText('2,5');
  });

  test('csv dosyası yüklenir (başlık satırı atlanır) ve sonuçlar CSV indirilir', async ({ page }) => {
    await page.goto('/istatistik-hesapla/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'notlar.csv', mimeType: 'text/csv', buffer: Buffer.from('puan\n2\n4\n4\n4\n5\n5\n7\n9\n') });
    await expect(page.locator('#r-mean')).toHaveText('5');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#csv').click()]);
    expect(dl.suggestedFilename()).toBe('istatistik-sonuclari.csv');
    const txt = readFileSync(await dl.path(), 'utf8');
    expect(txt).toContain('Aritmetik ortalama;5');
  });

  test('hatalı giriş: harf içeren değer için Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/istatistik-hesapla/');
    await page.locator('#data').fill('1 2 abc 4');
    await expect(page.locator('#error')).toContainText('sayı olarak okunamadı');
    await expect(page.locator('#error')).toContainText('silip tekrar deneyin');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı, SSS ≥7', async ({ page }) => {
    await page.goto('/istatistik-hesapla/');
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  });
});
