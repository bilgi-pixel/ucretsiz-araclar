import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Yüzde Hesaplama', () => {
  test('beş modun bilinen örnekleri; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/yuzde-hesapla/');
    const first = page.locator('#r-rows dd').first();

    // 200'ün %15'i = 30
    await page.locator('#f-a').fill('200');
    await page.locator('#f-b').fill('15');
    await expect(first).toHaveText('30');

    // Türkçe biçimli giriş: 2.500'ün %18'i = 450
    await page.locator('#f-a').fill('2.500');
    await page.locator('#f-b').fill('18');
    await expect(first).toHaveText('450');

    // 50, 200'ün yüzde kaçı → %25
    await page.getByLabel('A, B\'nin yüzde kaçıdır?').check();
    await page.locator('#f-a').fill('50');
    await page.locator('#f-b').fill('200');
    await expect(first).toHaveText('%25');

    // 800 → 1.000 = %25 artış
    await page.getByLabel('A\'dan B\'ye yüzde değişim').check();
    await page.locator('#f-a').fill('800');
    await page.locator('#f-b').fill('1.000');
    await expect(first).toHaveText('Artış %25');
    await page.locator('#f-a').fill('1000');
    await page.locator('#f-b').fill('800');
    await expect(first).toHaveText('Azalış %20');

    // İndirimli fiyat: 1.200 ₺, %15 → 1.020,00 ₺
    await page.getByLabel('İndirimli fiyat').check();
    await page.locator('#f-a').fill('1.200');
    await page.locator('#f-b').fill('15');
    await expect(first).toHaveText('1.020,00 ₺');

    // Artış / azalış uygula: 1.000 + %18 = 1.180; azalış 820
    await page.getByLabel('Yüzde artış / azalış uygula').check();
    await expect(page.locator('#f-dir')).toBeVisible();
    await page.locator('#f-a').fill('1000');
    await page.locator('#f-b').fill('18');
    await expect(first).toHaveText('1.180');
    await page.locator('#f-dir').selectOption('azalis');
    await expect(first).toHaveText('820');

    expect(external).toEqual([]);
    noErrors();
  });

  test('kopyala düğmesi sonucu panoya alır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/yuzde-hesapla/');
    await page.locator('#f-a').fill('200');
    await page.locator('#f-b').fill('15');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Sonuç kopyalandı.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Sonuç 30');
  });

  test('hatalı girişlerde Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/yuzde-hesapla/');
    await page.locator('#f-a').fill('abc');
    await page.locator('#f-b').fill('10');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    // Sıfıra bölme
    await page.getByLabel('A, B\'nin yüzde kaçıdır?').check();
    await page.locator('#f-a').fill('5');
    await page.locator('#f-b').fill('0');
    await expect(page.locator('#error')).toContainText('sıfır olamaz');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    // Düzeltince hata kalkar
    await page.locator('#f-b').fill('10');
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#r-rows dd').first()).toHaveText('%50');
  });
});
