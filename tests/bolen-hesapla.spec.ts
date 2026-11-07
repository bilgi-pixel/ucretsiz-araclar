import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/bolen-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}
async function find(page, n: string) {
  await page.locator('#n').fill(n);
  await page.locator('#calc').click();
}

test.describe('Bir Sayının Bölenleri', () => {
  test('28 → 6 bölen, toplam 56, mükemmel sayı; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await find(page, '28');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-count')).toHaveText('6');
    await expect(page.locator('#r-sum')).toHaveText('56');
    await expect(page.locator('#r-proper')).toHaveText('28');
    await expect(page.locator('#r-list')).toHaveText('1, 2, 4, 7, 14, 28');
    await expect(page.locator('#r-perfect')).toContainText('Mükemmel sayı');
    await expect(page.locator('#r-factors')).toHaveText('2² × 7');
    expect(external).toEqual([]);
    noErrors();
  });

  test('360 → 24 bölen, toplam 1.170, bol sayı, 2³ × 3² × 5', async ({ page }) => {
    await open(page);
    await find(page, '360');
    await expect(page.locator('#r-count')).toHaveText('24');
    await expect(page.locator('#r-sum')).toHaveText('1.170');
    await expect(page.locator('#r-proper')).toHaveText('810');
    await expect(page.locator('#r-perfect')).toContainText('Bol sayı');
    await expect(page.locator('#r-factors')).toHaveText('2³ × 3² × 5');
    await expect(page.locator('#r-list')).toContainText('1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360');
  });

  test('97 asal sayı; 1 ne asal ne bileşik; 36 tam kare → 9 bölen', async ({ page }) => {
    await open(page);
    await find(page, '97');
    await expect(page.locator('#r-kind')).toHaveText('Asal sayı');
    await expect(page.locator('#r-count')).toHaveText('2');
    await expect(page.locator('#r-sum')).toHaveText('98');
    await find(page, '1');
    await expect(page.locator('#r-kind')).toContainText('Ne asal ne bileşik');
    await expect(page.locator('#r-count')).toHaveText('1');
    await find(page, '36');
    await expect(page.locator('#r-count')).toHaveText('9');
    await expect(page.locator('#r-sum')).toHaveText('91');
  });

  test('binlik ayraç ve büyük sayı: 1.000 → 16 bölen; 10^12 → 169 bölen, hızlı', async ({ page }) => {
    await open(page);
    await find(page, '1.000');
    await expect(page.locator('#r-count')).toHaveText('16');
    await expect(page.locator('#r-sum')).toHaveText('2.340');
    await find(page, '1000000000000');
    await expect(page.locator('#r-count')).toHaveText('169');
    await expect(page.locator('#r-factors')).toHaveText('2¹² × 5¹²');
  });

  test('hatalı giriş: harf, sıfır ve çok büyük sayı için Türkçe, çözüm öneren hata', async ({ page }) => {
    await open(page);
    await find(page, 'on iki');
    await expect(page.locator('#error')).toContainText('Pozitif bir tam sayı yazın');
    await expect(page.locator('#result')).toBeHidden();
    await find(page, '0');
    await expect(page.locator('#error')).toContainText('en az 1');
    await find(page, '10000000000000');
    await expect(page.locator('#error')).toContainText('çok büyük');
    await find(page, '-5');
    await expect(page.locator('#error')).toContainText('Pozitif bir tam sayı yazın');
    await page.locator('#clear').click();
    await expect(page.locator('#n')).toHaveValue('');
  });

  test('içerik: ≥800 kelime, 3 reklam, SSS ≥7, 360px taşma yok (uzun bölen listesi dahil)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(800);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await find(page, '735134400'); // çok bölenli sayı: liste satır kaydırmalı
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
