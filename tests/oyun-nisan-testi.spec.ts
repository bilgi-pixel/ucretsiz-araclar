import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/oyunlar/nisan-testi/';
const SLOT = 'oyun-nisan-testi';
const LDTYPE = 'VideoGame';
const BADGE = 'Kayıt yok';

test.describe('Nişan Testi', () => {
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

  const T = (page: any) => page.evaluate(() => (window as any).__nisanTest());

  test('tur başlar, hedef vurulur, ıska sayılır, süre bitince sonuç ve rekor; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await expect(page.locator('#nt-target')).toBeHidden();
    await page.locator('#nt-start').click();
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#nt-target')).toBeVisible();
    for (let i = 0; i < 3; i++) await page.locator('#nt-target').click();
    let s = await T(page);
    expect(s.hits).toBe(3);
    expect(s.score).toBeGreaterThanOrEqual(300);
    await expect(page.locator('#nt-hits')).toHaveText('3');
    await page.evaluate(() => document.getElementById('nt-field')!.scrollIntoView({ block: 'center', behavior: 'instant' }));
    const box = (await page.locator('#nt-field').boundingBox())!;
    const tb = (await page.locator('#nt-target').boundingBox())!;
    // hedefin karşı yarısında, alanın dikey ortasına tıkla
    const px = tb.x + tb.width / 2 > box.x + box.width / 2 ? box.x + 4 : box.x + box.width - 4;
    const py = box.y + box.height / 2;
    await page.mouse.click(px, py);
    s = await T(page);
    expect(s.misses).toBe(1);
    await expect(page.locator('#nt-acc')).toHaveText('%75');
    // hedef alanın içinde kalır
    expect(tb.x).toBeGreaterThanOrEqual(box.x - 1);
    expect(tb.x + tb.width).toBeLessThanOrEqual(box.x + box.width + 1);
    await page.evaluate(() => (window as any).__nisanTest.setEnd(0));
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-isabet')).toHaveText('3');
    await expect(page.locator('#sonuc-iska')).toHaveText('1');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    s = await T(page);
    expect(s.phase).toBe('bitti');
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-oyun-nisan-testi') || 'null'));
    expect(stored.best['orta-30']).toBe(s.score);
    await expect(page.locator('#nt-target')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('puan formülü, klavye ile vuruş, ayarlar ve bozuk kayıt', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('ba-oyun-nisan-testi', '{"best":{"orta-30":"x","kucuk-15":500,"kotu":9}}'));
    await go(page);
    const p = await page.evaluate(() => [0, 400, 1000, 2500].map((ms) => (window as any).__nisanTest.hitPoints(ms)));
    expect(p).toEqual([200, 160, 100, 100]);
    await expect(page.locator('#nt-best')).toHaveText('0');
    await page.locator('#nt-size').selectOption('kucuk');
    await page.locator('#nt-dur').selectOption('15');
    await expect(page.locator('#nt-best')).toHaveText('500');
    await expect(page.locator('#nt-time')).toHaveText('15.0');
    await page.locator('#nt-start').focus();
    await page.keyboard.press('s');
    await expect(page.locator('#nt-target')).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press(' ');
    expect((await T(page)).hits).toBe(2);
    await expect(page.locator('#nt-size')).toBeDisabled();
  });

});
