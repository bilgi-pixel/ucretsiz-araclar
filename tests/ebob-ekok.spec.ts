import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('EBOB, EKOK ve Asal Çarpanlar Hesaplama', () => {
  test('EBOB(48,18)=6, EKOK=144, Öklid adımları görünür, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ebob-ekok/');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#nums').fill('48, 18');
    await expect(page.locator('#ebob')).toHaveText('6');
    await expect(page.locator('#ekok')).toHaveText('144');
    await expect(page.locator('#coprime')).toContainText('Hayır');
    await expect(page.locator('#euclid')).toContainText('48 = 2 × 18 + 12');
    await expect(page.locator('#euclid')).toContainText('18 = 1 × 12 + 6');
    await expect(page.locator('#euclid')).toContainText('12 = 2 × 6 + 0');
    await expect(page.locator('#ekok-steps')).toContainText('864 / 6 = 144');
    await expect(page.locator('#factors')).toContainText('48 = 2⁴·3');
    await expect(page.locator('#factors')).toContainText('18 = 2·3²');
    await expect(page.locator('#ekok-extra')).toContainText('Ortak bölme tablosu');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('üç sayı: 12, 18, 30 → EBOB 6, EKOK 180', async ({ page }) => {
    await page.goto('/ebob-ekok/');
    await page.locator('#nums').fill('12 18 30');
    await expect(page.locator('#ebob')).toHaveText('6');
    await expect(page.locator('#ekok')).toHaveText('180');
    await expect(page.locator('#euclid li').first()).toContainText('EBOB(12, 18)');
  });

  test('360 = 2³·3²·5, 24 bölen, ağaç ve tablo', async ({ page }) => {
    await page.goto('/ebob-ekok/');
    await page.locator('#nums').fill('360');
    await expect(page.locator('#factors')).toContainText('360 = 2³·3²·5');
    await expect(page.locator('#divisors')).toContainText('24 bölen');
    await expect(page.locator('#divisors')).toContainText('1, 2, 3, 4, 5, 6, 8, 9, 10, 12');
    await expect(page.locator('#trees .eb-tree')).toBeVisible();
    await expect(page.locator('#trees table')).toContainText('Asal çarpan');
    // Tek sayıda EBOB/EKOK satırları gizli, ipucu görünür
    await expect(page.locator('#row-ebob')).toBeHidden();
    await expect(page.locator('#single-hint')).toBeVisible();
  });

  test('97 asal sayıdır, tabloda vurgulanır', async ({ page }) => {
    await page.goto('/ebob-ekok/');
    await page.locator('#nums').fill('97');
    await expect(page.locator('#prime-status')).toContainText('97 asal sayıdır');
    await expect(page.locator('#prime-status')).toContainText('2, 3, 5, 7');
    await expect(page.locator('#divisors')).toContainText('2 bölen');
    await page.locator('#sieve-wrap summary').click();
    await expect(page.locator('#sieve .eb-cell')).toHaveCount(1000);
    await expect(page.locator('#sieve .eb-cell.is-prime')).toHaveCount(168);
    await expect(page.locator('#sieve .eb-cell.is-input')).toHaveText('97');
    await page.locator('#nums').fill('360');
    await expect(page.locator('#sieve .eb-cell.is-hit')).toHaveCount(3);
    await expect(page.locator('#prime-status')).toContainText('asal değildir');
  });

  test('BigInt: 30 basamaklı sayılarda tam kesin EBOB', async ({ page }) => {
    await page.goto('/ebob-ekok/');
    await page.locator('#nums').fill('123456789012345678901234567890, 987654321098765432109876543210');
    // 9000000000900000000090 (22 basamak, tr-TR binlik noktalı)
    await expect(page.locator('#ebob')).toHaveText('9.000.000.000.900.000.000.090');
    await expect(page.locator('#euclid')).toContainText('EBOB(');
  });

  test('örnek düğmesi, kopyala ve aralarında asal', async ({ page }) => {
    await page.goto('/ebob-ekok/');
    await page.locator('#nums').fill('8, 15');
    await expect(page.locator('#coprime')).toContainText('Evet');
    await page.locator('[data-example="48, 18"]').click();
    await expect(page.locator('#nums')).toHaveValue('48, 18');
    await expect(page.locator('#ebob')).toHaveText('6');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).not.toHaveText('');
  });

  test('hatalı giriş: harf, ondalık, sıfır, negatif ve çok fazla sayı için Türkçe hata', async ({ page }) => {
    await page.goto('/ebob-ekok/');
    await page.locator('#nums').fill('abc, 12');
    await expect(page.locator('#error')).toContainText('geçerli bir sayı değil');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#nums').fill('12.5, 3');
    await expect(page.locator('#error')).toContainText('tam sayı değil');
    await page.locator('#nums').fill('0, 5');
    await expect(page.locator('#error')).toContainText('1 veya daha büyük');
    await page.locator('#nums').fill('-4, 8');
    await expect(page.locator('#error')).toContainText('negatif');
    await page.locator('#nums').fill('1,2,3,4,5,6,7,8,9,10,11');
    await expect(page.locator('#error')).toContainText('En fazla 10 sayı');
    await page.locator('#nums').fill('1'.repeat(41));
    await expect(page.locator('#error')).toContainText('40 basamak');
    await page.locator('#nums').fill('48, 18');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#ebob')).toHaveText('6');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı, SSS ≥7', async ({ page }) => {
    await page.goto('/ebob-ekok/');
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="ebob-ekok-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  });

  test('360 piksel genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/ebob-ekok/');
    await page.locator('#nums').fill('12, 18, 30');
    await expect(page.locator('#ebob')).toHaveText('6');
    await page.locator('#sieve-wrap summary').click();
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(1);
  });
});
