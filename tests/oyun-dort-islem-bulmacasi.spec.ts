import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/oyunlar/dort-islem-bulmacasi/';
const SLOT = 'oyun-dort-islem-bulmacasi';
const LDTYPE = 'VideoGame';
const BADGE = 'Kayıt yok';

test.describe('Dört İşlem Bulmacası', () => {
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

  const T = (page: any) => page.evaluate(() => (window as any).__dortIslemTest());
  const card = (page: any, i: number) => page.locator('#di-cards .di-card').nth(i);
  const op = (page: any, o: string) => page.locator(`.di-op[data-op="${o}"]`);

  test('ilk bulmaca çözülebilir; tıklayarak çözme, seri ve kayıt; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    let s = await T(page);
    expect(s.no).toBe(1);
    expect(s.nums).toHaveLength(4);
    await expect(page.locator('#di-cards .di-card')).toHaveCount(4);
    expect(await page.evaluate(([n, t]) => (window as any).__dortIslemTest.solve(n, t), [s.nums, s.target])).not.toBeNull();
    await page.evaluate(() => (window as any).__dortIslemTest.setPuzzle([6, 4, 2, 1], 24));
    await card(page, 0).click();
    await expect(card(page, 0)).toHaveAttribute('aria-pressed', 'true');
    await op(page, '*').click();
    await card(page, 1).click();
    s = await T(page);
    expect(s.cards).toEqual(['24', '2', '1']);
    await card(page, 1).click(); await op(page, '/').click(); await card(page, 2).click();
    s = await T(page);
    expect(s.cards).toEqual(['24', '2']);
    await card(page, 0).click(); await op(page, '/').click(); await card(page, 1).click();
    s = await T(page);
    expect(s.cards).toEqual(['12']);
    expect(s.won).toBe(false);
    await expect(page.locator('#di-msg')).toContainText('hedef 24');
    await page.locator('#di-undo').click();
    s = await T(page);
    expect(s.cards).toEqual(['24', '2']);
    await card(page, 0).click(); await op(page, '*').click(); await card(page, 1).click();
    // 24 × 2 = 48 değil; geri al ve 2'yi 1 yap: önce baştan
    await page.locator('#di-restart').click();
    await card(page, 0).click(); await op(page, '*').click(); await card(page, 1).click(); // 24,2,1
    await card(page, 1).click(); await op(page, '/').click(); await card(page, 1).click(); // aynı kart: seçim kalkar
    await card(page, 1).click(); await op(page, '-').click(); await card(page, 2).click(); // 2-1=1 → 24,1
    await card(page, 0).click(); await op(page, '*').click(); await card(page, 1).click();
    s = await T(page);
    expect(s.won).toBe(true);
    expect(s.solved).toBe(1);
    expect(s.streak).toBe(1);
    expect(s.no).toBe(2);
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-ifade')).toContainText('= 24');
    const st = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-oyun-dort-islem') || 'null'));
    expect(st).toMatchObject({ no: 2, solved: 1, streak: 1 });
    await page.locator('#di-next').click();
    expect((await T(page)).no).toBe(2);
    await expect(page.locator('#sonuc')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('kesirler, sıfıra bölme, klavye ve ipucu', async ({ page }) => {
    await go(page);
    await page.evaluate(() => (window as any).__dortIslemTest.setPuzzle([1, 5, 5, 5], 24));
    const sol = await page.evaluate(() => (window as any).__dortIslemTest.solve([1, 5, 5, 5], 24));
    expect(sol).toContain('÷');
    await card(page, 3).focus();
    await page.keyboard.press('1');
    await page.keyboard.press('/');
    await page.keyboard.press('2');
    let s = await T(page);
    expect(s.cards).toContain('1/5');
    await page.keyboard.press('u');
    expect((await T(page)).cards).toEqual(['1', '5', '5', '5']);
    await page.evaluate(() => (window as any).__dortIslemTest.setPuzzle([3, 3, 0, 1], 9));
    await card(page, 0).click(); await op(page, '/').click(); await card(page, 2).click();
    await expect(page.locator('#di-msg')).toContainText('Sıfıra bölünemez');
    expect((await T(page)).cards).toHaveLength(4);
    await page.locator('#di-hint').click();
    await expect(page.locator('#di-msg')).toContainText('Bir çözüm');
    expect(await page.evaluate(() => (window as any).__dortIslemTest.solve([1, 1, 1, 1], 50))).toBeNull();
  });

  test('üretici: ilk 40 bulmacanın hepsi çözülebilir ve hedef aralıkta', async ({ page }) => {
    await go(page);
    const bad = await page.evaluate(() => {
      const t = (window as any).__dortIslemTest; const out: number[] = [];
      for (let i = 1; i <= 40; i++) { const p = t.generate(i); if (!t.solve(p.nums, p.target) || p.target < 8 || p.target > 60) out.push(i); }
      return out;
    });
    expect(bad).toEqual([]);
  });

});
