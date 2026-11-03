import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Testte IBAN üretmek serbesttir (araçta üretici yoktur): BBAN'dan mod-97 kontrol hanesi hesaplanır.
function makeIban(country: string, bban: string): string {
  const toDigits = (s: string) => s.split('').map((c) => (/[A-Z]/.test(c) ? String(c.charCodeAt(0) - 55) : c)).join('');
  const rem = Number(BigInt(toDigits(`${bban}${country}00`)) % 97n);
  const check = String(98 - rem).padStart(2, '0');
  return `${country}${check}${bban}`;
}

// Ziraat (TCMB 0010 → IBAN alanı 00010) + rezerv 0 + 16 haneli hesap
const TR_IBAN = makeIban('TR', '00010' + '0' + '1234567890123456');
const DE_IBAN = makeIban('DE', '37040044' + '0532013000');

test.describe('IBAN Doğrulama', () => {
  test('geçerli TR IBAN → geçerli + banka adı; bir hane değişince geçersiz; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/iban-dogrula/');
    await expect(page.locator('#banks-updated')).not.toHaveText('…');
    // Boşluklu ve küçük harfli giriş tolere edilir
    const spaced = TR_IBAN.toLowerCase().replace(/(.{4})/g, '$1 ').trim();
    await page.locator('#f-iban').fill(spaced);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-status')).toHaveText('Geçerli IBAN');
    await expect(page.locator('#r-bank')).toContainText('Ziraat');
    await expect(page.locator('#r-bankcode')).toContainText('0010');
    await expect(page.locator('#r-formatted')).toHaveText(TR_IBAN.replace(/(.{4})/g, '$1 ').trim());
    await expect(page.locator('#error')).toBeHidden();
    // Girdi adres çubuğuna yazılmaz
    expect(page.url()).not.toMatch(/TR\d{2}/);
    // Bir hane değiştirilince geçersiz
    const digit = TR_IBAN[20];
    const broken = TR_IBAN.slice(0, 20) + String((Number(digit) + 1) % 10) + TR_IBAN.slice(21);
    await page.locator('#f-iban').fill(broken);
    await expect(page.locator('#r-status')).toHaveText('Geçersiz IBAN');
    await expect(page.locator('#r-reason')).toContainText('mod-97');
    expect(external).toEqual([]);
    noErrors();
  });

  test('DE IBAN geçerli, banka satırı yok; kopyala', async ({ page }) => {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/iban-dogrula/');
    await page.locator('#f-iban').fill(DE_IBAN);
    await expect(page.locator('#r-status')).toHaveText('Geçerli IBAN');
    await expect(page.locator('#r-country')).toContainText('Almanya');
    await expect(page.locator('#r-bank')).toHaveCount(0);
    await page.locator('#copy-compact').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toBe(DE_IBAN);
  });

  test('harf çöpü, yanlış uzunluk ve bilinmeyen ülke: Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/iban-dogrula/');
    await page.locator('#f-iban').fill('TR33*0006!1005');
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('harf ve rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-iban').fill(TR_IBAN.slice(0, 25));
    await expect(page.locator('#error')).toContainText('26 karakter');
    await expect(page.locator('#error')).toContainText('1 eksik');
    await page.locator('#f-iban').fill('ZZ12345678901234567890');
    await expect(page.locator('#error')).toContainText('ülke kodu');
    await page.locator('#clear').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
  });
});
