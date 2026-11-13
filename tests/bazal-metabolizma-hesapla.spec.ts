import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/bazal-metabolizma-hesapla/';
const SLOT = 'bazal-metabolizma-hesapla';
const LDTYPE = 'SoftwareApplication';
const BADGE = 'Dosya yüklenmez';

test.describe('Bazal Metabolizma Hesaplama', () => {
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

  test('erkek 80 kg 180 cm 30 yaş: BMH 1.780, orta aktif 2.759; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await page.locator('#kg').fill('80');
    await page.locator('#cm').fill('180');
    await page.locator('#age').fill('30');
    await page.locator('#k').selectOption('1.55');
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmr')).toHaveText('1.780 kcal');
    await expect(page.locator('#r-tdee')).toHaveText('2.759 kcal');
    await expect(page.locator('#r-lose')).toHaveText('2.259 kcal');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(external).toEqual([]);
    noErrors();
  });

  test('kadın 60 kg 165 cm 25 yaş: BMH 1.345; kilo verme hedefi BMH altına inmez', async ({ page }) => {
    await go(page);
    await page.getByLabel('Kadın').check();
    await page.locator('#kg').fill('60');
    await page.locator('#cm').fill('165');
    await page.locator('#age').fill('25');
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmr')).toHaveText('1.345 kcal');
    await expect(page.locator('#r-tdee')).toHaveText('1.614 kcal');
    await expect(page.locator('#r-lose')).toHaveText('1.345 kcal');
  });

  test('hatalı girişler Türkçe hata verir', async ({ page }) => {
    await go(page);
    await page.locator('#kg').fill('5');
    await page.locator('#cm').fill('170');
    await page.locator('#age').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kilonuzu');
    await page.locator('#kg').fill('70');
    await page.locator('#age').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('15 ile 100');
    await expect(page.locator('#result')).toBeHidden();
  });

});
