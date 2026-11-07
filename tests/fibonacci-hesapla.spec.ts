import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/fibonacci-hesapla/';

test.describe('Fibonacci Sayıları Hesaplama', () => {
  test('içerik: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('main').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('[data-slot="fibonacci-hesapla-' + s + '"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // Reklam A araç kutusundan sonra gelir (butonların üstünde/yanında değil)
    const after = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!, ad = document.querySelector('[data-slot$="-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING) && !tool.contains(ad);
    });
    expect(after).toBe(true);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });


  const go = async (page: any) => { await page.goto(URL); await page.waitForLoadState('networkidle'); };

  test('F(50) = 12.586.269.025; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await page.locator('#n').fill('50');
    await page.locator('#calc').click();
    await expect(page.locator('#r-term')).toHaveText('12.586.269.025');
    await expect(page.locator('#r-title')).toHaveText('F(50) =');
    await expect(page.locator('#result-n')).toHaveClass(/is-active/);
    await expect(page.locator('#r-digits')).toHaveText('11 basamak');
    expect(external).toEqual([]);
    noErrors();
  });

  test('büyük terim BigInt ile tam: F(100) ve F(1000) basamak sayısı', async ({ page }) => {
    await go(page);
    await page.locator('#n').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-term')).toHaveText('354.224.848.179.261.915.075');
    await page.locator('#n').fill('1000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-digits')).toHaveText('209 basamak');
    expect(await page.locator('#r-full').inputValue()).toMatch(/^43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875$/);
  });

  test('toplam ve oran: F(10) için toplam 143, F(30)/F(29) = 1,618033988', async ({ page }) => {
    await go(page);
    await page.locator('#n').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-sum')).toHaveText('143');
    await expect(page.locator('#r-list')).toContainText('0 · 1 · 1 · 2 · 3 · 5 · 8 · 13 · 21 · 34 · 55');
    await page.locator('#n').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-ratio')).toHaveText('1,618033988');
    await expect(page.locator('#r-list-title')).toHaveText('İlk 30 terim');
  });

  test('Fibonacci mi kontrolü: 144 evet (F(12)), 145 hayır', async ({ page }) => {
    await go(page);
    await page.locator('#chk').fill('144');
    await page.locator('#check').click();
    await expect(page.locator('#c-msg')).toContainText('Evet');
    await expect(page.locator('#c-msg')).toContainText('F(12)');
    await page.locator('#chk').fill('145');
    await page.locator('#check').click();
    await expect(page.locator('#c-msg')).toContainText('Hayır');
    await page.locator('#chk').fill('12586269025');
    await page.locator('#check').click();
    await expect(page.locator('#c-msg')).toContainText('F(50)');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await go(page);
    await page.locator('#n').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('tam sayı olmalı');
    await expect(page.locator('#result-n')).toBeHidden();
    await page.locator('#n').fill('6000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En fazla 5.000');
    await page.locator('#chk').fill('-5');
    await page.locator('#check').click();
    await expect(page.locator('#error')).toContainText('negatif olmayan');
  });

  test('klavyeyle hesaplanır ve tam sayı kopyalama alanı dolar', async ({ page }) => {
    await go(page);
    await page.locator('#n').focus();
    await page.keyboard.type('20');
    await page.keyboard.press('Enter');
    await expect(page.locator('#r-term')).toHaveText('6.765');
    await expect(page.locator('#r-full')).toHaveValue('6765');
  });

});
