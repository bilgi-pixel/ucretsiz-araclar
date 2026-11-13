import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/en/compound-interest-calculator/';
const SLOT = 'en-compound-interest-calculator';
const LDTYPE = 'SoftwareApplication';
const BADGE = 'No uploads';

test.describe('Compound Interest Calculator (EN)', () => {
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

  test('10,000 at 5% for 10 years, yearly: 16,288.95; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await page.locator('#p').fill('10,000');
    await page.locator('#r').fill('5');
    await page.locator('#t').fill('10');
    await page.locator('#n').selectOption('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-final')).toHaveText('16,288.95');
    await expect(page.locator('#r-int')).toHaveText('6,288.95');
    await expect(page.locator('#rows tr')).toHaveCount(10);
    expect(external).toEqual([]);
    noErrors();
  });

  test('monthly compounding effective rate and error messages', async ({ page }) => {
    await go(page);
    await page.locator('#p').fill('1000');
    await page.locator('#r').fill('5');
    await page.locator('#t').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-eff')).toHaveText('5.12%');
    await page.locator('#r').fill('x');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('annual interest rate');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /bilesik-faiz-hesapla/);
  });

});
