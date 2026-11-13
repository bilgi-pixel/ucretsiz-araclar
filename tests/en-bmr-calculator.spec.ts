import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/bmr-calculator/';
const SLOT = 'en-bmr-calculator';
const LDTYPE = 'SoftwareApplication';
const BADGE = 'No uploads';

test.describe('BMR Calculator (EN)', () => {
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

  test('metric male 80 kg 180 cm 30: BMR 1,780; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await page.locator('#w').fill('80');
    await page.locator('#h').fill('180');
    await page.locator('#age').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmr')).toHaveText('1,780 kcal');
    await expect(page.locator('#r-tdee')).toHaveText('2,136 kcal');
    expect(external).toEqual([]);
    noErrors();
  });

  test('imperial 176 lb, 71 in gives the same BMR as about 80 kg / 180 cm; errors in English', async ({ page }) => {
    await go(page);
    await page.locator('#units').selectOption('imp');
    await expect(page.locator('#l-w')).toHaveText('Weight (lb)');
    await page.locator('#w').fill('176');
    await page.locator('#h').fill('71');
    await page.locator('#age').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmr')).toHaveText('1,780 kcal');
    await page.locator('#age').fill('9');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('between 15 and 100');
  });

});
