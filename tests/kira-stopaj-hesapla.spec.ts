import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Kira Stopajı Hesaplama', () => {
  test('20.000 brüt → stopaj 4.000, net 16.000; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/kira-stopaj-hesapla/');
    await expect(page.locator('#params-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('20.000');
    await expect(page.locator('#r-brut')).toHaveText('20.000,00 ₺');
    await expect(page.locator('#r-stopaj')).toHaveText('4.000,00 ₺');
    await expect(page.locator('#r-net')).toHaveText('16.000,00 ₺');
    await expect(page.locator('#r-diger-net')).toHaveText('192.000,00 ₺');
    expect(external).toEqual([]);
    noErrors();
  });

  test('16.000 net → 20.000 brüt; KDV ve yıllık dönem', async ({ page }) => {
    await page.goto('/kira-stopaj-hesapla/');
    await page.getByLabel('Net kira (brüt kirayı bul)').check();
    await page.locator('#f-amount').fill('16000');
    await expect(page.locator('#r-brut')).toHaveText('20.000,00 ₺');
    await expect(page.locator('#r-stopaj')).toHaveText('4.000,00 ₺');
    await page.locator('#f-kdv').check();
    await expect(page.locator('#r-kdv')).toHaveText('4.000,00 ₺');
    await expect(page.locator('#r-odeme')).toHaveText('20.000,00 ₺');
    await expect(page.locator('#r-maliyet')).toHaveText('24.000,00 ₺');
    await page.getByLabel('Yıllık').check();
    await expect(page.locator('#r-diger-brut')).toHaveText('1.666,67 ₺');
  });

  test('hatalı giriş Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/kira-stopaj-hesapla/');
    await page.locator('#f-amount').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-amount').fill('20000');
    await page.locator('#f-rate').fill('150');
    await expect(page.locator('#error')).toContainText('0 ile 100');
    await page.locator('#f-rate').fill('20');
    await expect(page.locator('#error')).toBeEmpty();
    await expect(page.locator('#r-net')).toHaveText('16.000,00 ₺');
  });

  test('sayfa içeriği: en az 900 kelime, 7+ SSS, 3 reklam alanı', async ({ page }) => {
    await page.goto('/kira-stopaj-hesapla/');
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThan(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    expect(await page.locator('.ba-ad').count()).toBe(3);
  });
});
