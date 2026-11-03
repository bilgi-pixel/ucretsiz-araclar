import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Sayı Tabanı Dönüştürücü', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sayi-tabani-donustur/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden işlem yapılmasın
  });

  test('255 → FF ve 11111111; negatif, kesir, büyük sayı ve özel taban; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.locator('#value').fill('255');
    await page.getByRole('button', { name: 'Dönüştür' }).click();
    await expect(page.locator('#r-16')).toHaveText('FF');
    await expect(page.locator('#r-2')).toHaveText('11111111');
    await expect(page.locator('#r-8')).toHaveText('377');

    await page.locator('#value').fill('0.5');
    await expect(page.locator('#r-2')).toHaveText('0.1');
    await page.locator('#value').fill('-5');
    await expect(page.locator('#r-2')).toHaveText('-101');

    // 20 basamakta kesilen kesir
    await page.locator('#value').fill('0,1');
    await expect(page.locator('#r-2')).toHaveText('0.00011001100110011001');
    await expect(page.locator('#conv-note')).toContainText('20 basamak');

    // BigInt: 2^64
    await page.locator('#value').fill('18446744073709551616');
    await expect(page.locator('#r-16')).toHaveText('10000000000000000');

    // Girdi tabanı onaltılı, özel hedef 36
    await page.locator('#from').selectOption('16');
    await page.locator('#to').selectOption('36');
    await page.locator('#value').fill('FF');
    await expect(page.locator('#r-10')).toHaveText('255');
    await expect(page.locator('#r-custom')).toHaveText('73');
    expect(external).toEqual([]);
    noErrors();
  });

  test('bit işlemleri: -5 8 bitte 11111011, AND/XOR/NOT, kaydırma', async ({ page }) => {
    await page.getByRole('tab', { name: 'Bit işlemleri' }).click();
    await page.locator('#bit-width').selectOption('8');
    await page.locator('#bit-a').fill('-5');
    await page.getByRole('button', { name: 'Hesapla' }).click();
    await expect(page.locator('#b-bin')).toHaveText('11111011');
    await expect(page.locator('#b-hex')).toHaveText('0xFB');
    await expect(page.locator('#b-udec')).toHaveText('251');
    await expect(page.locator('#b-sdec')).toHaveText('-5');

    await page.locator('#bit-op').selectOption('and');
    await page.locator('#bit-a').fill('12');
    await page.locator('#bit-b').fill('10');
    await expect(page.locator('#b-bin')).toHaveText('00001000');
    await page.locator('#bit-op').selectOption('xor');
    await expect(page.locator('#b-bin')).toHaveText('00000110');
    await page.locator('#bit-op').selectOption('not');
    await page.locator('#bit-a').fill('0');
    await expect(page.locator('#b-udec')).toHaveText('255');
    await expect(page.locator('#b-sdec')).toHaveText('-1');

    // işaretli ve işaretsiz sağa kaydırma
    await page.locator('#bit-a').fill('-5');
    await page.locator('#bit-op').selectOption('shr');
    await page.locator('#bit-n').fill('1');
    await expect(page.locator('#b-bin')).toHaveText('11111101');
    await page.locator('#bit-op').selectOption('ushr');
    await expect(page.locator('#b-bin')).toHaveText('01111101');
  });

  test('karakter kodları tablosu', async ({ page }) => {
    await page.getByRole('tab', { name: 'Karakter kodları' }).click();
    await page.locator('#text').fill('Aş😀');
    const rows = page.locator('#cp-body tr');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toContainText('U+0041');
    await expect(rows.nth(0)).toContainText('65');
    await expect(rows.nth(1)).toContainText('U+015F');
    await expect(rows.nth(1)).toContainText('C5 9F');
    await expect(rows.nth(2)).toContainText('U+1F600');
    await expect(page.locator('#cp-summary')).toContainText('3 karakter');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.locator('#from').selectOption('16');
    await page.locator('#value').fill('FG');
    await page.getByRole('button', { name: 'Dönüştür' }).click();
    await expect(page.locator('#error')).toContainText('geçerli değil');
    await expect(page.locator('#error')).toContainText('A-F');
    await expect(page.locator('#conv-result')).toBeHidden();

    await page.locator('#value').fill('');
    await page.getByRole('button', { name: 'Dönüştür' }).click();
    await expect(page.locator('#error')).toContainText('Bir sayı girin');

    await page.getByRole('tab', { name: 'Bit işlemleri' }).click();
    await page.locator('#bit-width').selectOption('8');
    await page.locator('#bit-base').selectOption('10');
    await page.locator('#bit-a').fill('300');
    await page.getByRole('button', { name: 'Hesapla' }).click();
    await expect(page.locator('#error')).toContainText('sığmıyor');
    await expect(page.locator('#error')).toContainText('Bit genişliğini artırın');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.locator('#value').fill('18446744073709551616');
    await page.getByRole('tab', { name: 'Karakter kodları' }).click();
    await page.locator('#text').fill('Merhaba dünya ğüşiöç');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
