import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/yuvarlama-hesapla/';

test.describe('Sayı Yuvarlama', () => {
  test('içerik: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('main').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('[data-slot="yuvarlama-hesapla-' + s + '"]')).toHaveCount(1);
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
  const vals = async (page: any) => [await page.locator('#r-half').textContent(), await page.locator('#r-ceil').textContent(), await page.locator('#r-floor').textContent(), await page.locator('#r-trunc').textContent(), await page.locator('#r-bank').textContent()];
  const run = async (page: any, v: string, digits = '0') => {
    await page.locator('#value').fill(v);
    await page.locator('#digits').fill(digits);
    await page.locator('#calc').click();
  };

  test('2,5 → tam sayı: beş yöntem; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await run(page, '2,5');
    expect(await vals(page)).toEqual(['3', '3', '2', '2', '2']);
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(external).toEqual([]);
    noErrors();
  });

  test('negatif sayılar: -2,5 → -3 / -2 / -3 / -2 / -2', async ({ page }) => {
    await go(page);
    await run(page, '-2,5');
    expect(await vals(page)).toEqual(['-3', '-2', '-3', '-2', '-2']);
    await run(page, '-0,4');
    expect(await vals(page)).toEqual(['0', '0', '-1', '0', '0']);
  });

  test('ondalık basamak ve onlara/yüzlere yuvarlama', async ({ page }) => {
    await go(page);
    await run(page, '3,14159', '2');
    await expect(page.locator('#r-half')).toHaveText('3,14');
    await run(page, '1234,5678', '-2');
    await expect(page.locator('#r-half')).toHaveText('1200');
    await run(page, '1234,5678', '-1');
    expect(await vals(page)).toEqual(['1230', '1240', '1230', '1230', '1230']);
  });

  test('kayan nokta tuzağı: 1,005 → 1,01 ve bankacı 0,125 → 0,12', async ({ page }) => {
    await go(page);
    await run(page, '1.005', '2');
    await expect(page.locator('#r-half')).toHaveText('1,01');
    await run(page, '0,125', '2');
    expect(await vals(page)).toEqual(['0,13', '0,13', '0,12', '0,12', '0,12']);
  });

  test('en yakın kata yuvarlama: 1,23 → 0,05 katı 1,25; 7 → 5 katı', async ({ page }) => {
    await go(page);
    await page.getByLabel('En yakın kata göre').check();
    await expect(page.locator('#digits-wrap')).toBeHidden();
    await page.locator('#value').fill('1,23');
    await page.locator('#step').fill('0,05');
    await page.locator('#calc').click();
    await expect(page.locator('#r-half')).toHaveText('1,25');
    await page.locator('#value').fill('7');
    await page.locator('#step').fill('5');
    await page.locator('#calc').click();
    expect(await vals(page)).toEqual(['5', '10', '5', '5', '5']);
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await go(page);
    await run(page, 'abc');
    await expect(page.locator('#error')).toContainText('Sayı geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await run(page, '12,5', '99');
    await expect(page.locator('#error')).toContainText('-12 ile 12');
    await page.getByLabel('En yakın kata göre').check();
    await page.locator('#value').fill('12');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yuvarlama katını yazın');
    await page.locator('#step').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
  });

  test('klavyeyle hesaplanır ve kopyala düğmesi geri bildirim verir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await go(page);
    await page.locator('#value').focus();
    await page.keyboard.type('9,876');
    await page.keyboard.press('Enter');
    await expect(page.locator('#r-half')).toHaveText('10');
    await page.locator('[data-copy="r-half"]').click();
    await expect(page.locator('#copy-status')).toContainText('panoya kopyalandı');
  });

});
