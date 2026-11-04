import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/ortalama-hesapla/';

test.describe('Ortalama Hesaplama', () => {
  test('aritmetik ortalama ve diğer ortalamalar hesaplanır, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#values').fill('70\n85,5\n90\n62');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-mean')).toHaveText('76,875');
    await expect(page.locator('#r-n')).toHaveText('4');
    await expect(page.locator('#r-sum')).toHaveText('307,5');
    await expect(page.locator('#r-median')).toHaveText('77,75');
    await expect(page.locator('#row-w')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ağırlıklı ortalama doğru çıkar', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#values').fill('70 85,5 90 62');
    await page.locator('#weights').fill('3;2;4;1');
    await page.locator('#calc').click();
    await expect(page.locator('#row-w')).toBeVisible();
    await expect(page.locator('#r-weighted')).toHaveText('80,3');
  });

  test('ağırlık sayısı uyuşmazsa ve okunamayan değerde Türkçe hata verir', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#values').fill('10 20 30');
    await page.locator('#weights').fill('1 2');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Ağırlık sayısı (2) sayı adedine (3) eşit olmalı');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#weights').fill('');
    await page.locator('#values').fill('12 abc 5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('"abc" sayı olarak okunamadı');
    await page.locator('#values').fill('7');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En az iki sayı girin');
  });

  test('negatif sayıda geometrik ortalama hesaplanamaz uyarısı, harmonik 48', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#values').fill('-2 4 8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-geo')).toContainText('Hesaplanamaz');
    await page.locator('#values').fill('60 40');
    await page.locator('#calc').click();
    await expect(page.locator('#r-har')).toHaveText('48');
    await expect(page.locator('#r-mean')).toHaveText('50');
  });

  test('içerik: >=900 kelime, 3 reklam, >=7 SSS, JSON-LD', async ({ page }) => {
    await page.goto(URL);
    const words = (await page.locator('main').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['ortalama-hesapla-a', 'ortalama-hesapla-b', 'ortalama-hesapla-c']);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
  });

  test('360px taşma yok ve klavyeyle (Tab) düğmeye ulaşılır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.locator('#values').fill('1 2 3 4');
    await page.locator('#weights').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#calc')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
