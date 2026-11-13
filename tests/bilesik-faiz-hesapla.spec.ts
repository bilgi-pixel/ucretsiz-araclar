import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/bilesik-faiz-hesapla/';
const SLOT = 'bilesik-faiz-hesapla';
const LDTYPE = 'SoftwareApplication';
const BADGE = 'Dosya yüklenmez';

test.describe('Bileşik Faiz Hesaplama', () => {
  test('içerik: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('main').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('[data-slot="' + SLOT + '-' + s + '"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain(LDTYPE);
    await expect(page.locator('.ba-badges')).toContainText(BADGE);
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

  test('100.000 TL, %40, 5 yıl, yıllık: 537.824,00 TL; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await page.locator('#p').fill('100.000');
    await page.locator('#r').fill('40');
    await page.locator('#t').fill('5');
    await page.locator('#n').selectOption('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-final')).toHaveText('537.824,00 TL');
    await expect(page.locator('#r-int')).toHaveText('437.824,00 TL');
    await expect(page.locator('#r-eff')).toHaveText('%40');
    await expect(page.locator('#rows tr')).toHaveCount(5);
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(external).toEqual([]);
    noErrors();
  });

  test('aylık bileşik ve aylık ek yatırım: yatırılan toplam doğru, efektif oran %48,21', async ({ page }) => {
    await go(page);
    await page.locator('#p').fill('0');
    await page.locator('#r').fill('40');
    await page.locator('#t').fill('1');
    await page.locator('#m').fill('1.000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-dep')).toHaveText('12.000,00 TL');
    await expect(page.locator('#r-eff')).toHaveText('%48,21');
    const fin = await page.locator('#r-final').textContent();
    const v = Number(fin!.replace(' TL', '').replace(/\./g, '').replace(',', '.'));
    expect(v).toBeGreaterThan(12000);
    expect(v).toBeLessThan(15000);
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await go(page);
    await page.locator('#p').fill('abc');
    await page.locator('#r').fill('10');
    await page.locator('#t').fill('2');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Ana parayı');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#p').fill('1000');
    await page.locator('#t').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Süreyi');
  });

  test('klavyeyle hesaplanır ve İngilizce sürüme bağlantı var', async ({ page }) => {
    await go(page);
    await page.locator('#p').fill('1000');
    await page.locator('#r').fill('10');
    await page.locator('#t').focus();
    await page.keyboard.type('1');
    await page.locator('#n').selectOption('1');
    await page.locator('#t').press('Enter');
    await expect(page.locator('#r-final')).toHaveText('1.100,00 TL');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /compound-interest-calculator/);
  });

});
