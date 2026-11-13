import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/xml-bicimlendir/';
const SLOT = 'xml-bicimlendir';
const LDTYPE = 'SoftwareApplication';
const BADGE = 'Dosya yüklenmez';

test.describe('XML Biçimlendirici', () => {
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

  test('biçimlendirme, küçültme ve bildirim korunur; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await page.locator('#src').fill('<?xml version="1.0" encoding="UTF-8"?><a x="1"><b>1 &amp; 2</b><c></c><!--n--><d><![CDATA[<z>]]></d></a>');
    await page.locator('#fmt').click();
    await expect(page.locator('#result')).toBeVisible();
    expect(await page.locator('#out').inputValue()).toBe('<?xml version="1.0" encoding="UTF-8"?>\n<a x="1">\n  <b>1 &amp; 2</b>\n  <c/>\n  <!--n-->\n  <d>\n    <![CDATA[<z>]]>\n  </d>\n</a>');
    await page.locator('#ind').selectOption('4');
    await page.locator('#fmt').click();
    expect(await page.locator('#out').inputValue()).toContain('\n    <b>');
    await page.locator('#min').click();
    expect(await page.locator('#out').inputValue()).toBe('<?xml version="1.0" encoding="UTF-8"?><a x="1"><b>1 &amp; 2</b><c/><!--n--><d><![CDATA[<z>]]></d></a>');
    await expect(page.locator('#info')).toContainText('<a>');
    expect(external).toEqual([]);
    noErrors();
  });

  test('hatalı ve boş XML için Türkçe hata', async ({ page }) => {
    await go(page);
    await page.locator('#fmt').click();
    await expect(page.locator('#error')).toContainText('Önce');
    await page.locator('#src').fill('<a>\n<b></a>');
    await page.locator('#fmt').click();
    await expect(page.locator('#error')).toContainText('XML geçerli değil');
    await expect(page.locator('#result')).toBeHidden();
  });

});
