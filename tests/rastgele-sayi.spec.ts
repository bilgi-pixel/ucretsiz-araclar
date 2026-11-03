import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Rastgele Sayı, Zar ve Yazı Tura', () => {
  test('1-10 aralığında 10 tekrarsız sayı → 10 benzersiz sayı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/rastgele-sayi/');
    await page.locator('#n-min').fill('1');
    await page.locator('#n-max').fill('10');
    await page.locator('#n-count').fill('10');
    await page.locator('#n-unique').check();
    await page.locator('#n-go').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const nums = (await page.locator('#out').innerText()).split(',').map((s) => Number(s.trim()));
    expect(nums).toHaveLength(10);
    expect(new Set(nums).size).toBe(10);
    for (const n of nums) { expect(n).toBeGreaterThanOrEqual(1); expect(n).toBeLessThanOrEqual(10); }
    await expect(page.locator('#history li')).toHaveCount(1);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('sıralı seçenek artan sıralar', async ({ page }) => {
    await page.goto('/rastgele-sayi/');
    await page.locator('#n-count').fill('30');
    await page.locator('#n-order').selectOption('asc');
    await page.locator('#n-go').click();
    const nums = (await page.locator('#out').innerText()).split(',').map((s) => Number(s.trim()));
    expect(nums).toHaveLength(30);
    expect(nums).toEqual([...nums].sort((a, b) => a - b));
  });

  test('hatalı aralık ve yetersiz tekrarsız aralık Türkçe hata verir', async ({ page }) => {
    await page.goto('/rastgele-sayi/');
    await page.locator('#n-min').fill('50');
    await page.locator('#n-max').fill('10');
    await page.locator('#n-go').click();
    await expect(page.locator('#error')).toContainText('En küçük sayı en büyük sayıdan büyük olamaz');
    await page.locator('#n-min').fill('1');
    await page.locator('#n-max').fill('5');
    await page.locator('#n-count').fill('8');
    await page.locator('#n-unique').check();
    await page.locator('#n-go').click();
    await expect(page.locator('#error')).toContainText('yalnızca 5 farklı sayı var');
  });

  test('zar sonuçları 1-6 aralığında ve toplam doğru', async ({ page }) => {
    await page.goto('/rastgele-sayi/');
    await page.locator('#tab-d').click();
    await page.locator('#d-count').fill('6');
    for (let i = 0; i < 10; i++) {
      await page.locator('#d-go').click();
      const faces = (await page.locator('.rs-face').allTextContents()).map(Number);
      expect(faces).toHaveLength(6);
      for (const f of faces) { expect(f).toBeGreaterThanOrEqual(1); expect(f).toBeLessThanOrEqual(6); }
      await expect(page.locator('#out')).toContainText(`= ${faces.reduce((a, b) => a + b, 0)}`);
    }
    await page.locator('#d-type').selectOption('20');
    await page.locator('#d-count').fill('3');
    await page.locator('#d-go').click();
    for (const f of (await page.locator('.rs-face').allTextContents()).map(Number)) { expect(f).toBeGreaterThanOrEqual(1); expect(f).toBeLessThanOrEqual(20); }
    await page.locator('#d-count').fill('9');
    await page.locator('#d-go').click();
    await expect(page.locator('#error')).toContainText('1 ile 6 arasında');
  });

  test('yazı tura: dağılım toplamı atış sayısına eşit', async ({ page }) => {
    await page.goto('/rastgele-sayi/');
    await page.locator('#tab-c').click();
    await page.locator('#c-count').fill('1000');
    await page.locator('#c-go').click();
    const heads = Number(await page.locator('#out').getAttribute('data-heads'));
    const tails = Number(await page.locator('#out').getAttribute('data-tails'));
    expect(heads + tails).toBe(1000);
    await expect(page.locator('#out')).toHaveText(`Yazı: ${heads} · Tura: ${tails}`);
    expect(heads).toBeGreaterThan(380);
    expect(heads).toBeLessThan(620);
  });

  test('listeden tekrarsız seçim ve boş liste hatası', async ({ page }) => {
    await page.goto('/rastgele-sayi/');
    await page.locator('#tab-l').click();
    await page.locator('#l-go').click();
    await expect(page.locator('#error')).toContainText('Liste boş');
    await page.locator('#l-text').fill('Pizza\nKöfte\n\nMantı');
    await page.locator('#l-count').fill('3');
    await page.locator('#l-go').click();
    const got = (await page.locator('#out').innerText()).split(',').map((s) => s.trim());
    expect(new Set(got)).toEqual(new Set(['Pizza', 'Köfte', 'Mantı']));
    await page.locator('#l-count').fill('4');
    await page.locator('#l-go').click();
    await expect(page.locator('#error')).toContainText('3 satır var');
  });
});
