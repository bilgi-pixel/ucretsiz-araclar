import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/uuid-uret/';
const SLOT = 'uuid-uret';
const LDTYPE = 'SoftwareApplication';
const BADGE = 'Dosya yüklenmez';

test.describe('UUID Oluşturucu', () => {
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

  test('açılışta 5 UUID v4 üretilir, adet ve biçim seçenekleri çalışır; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    const lines = (await page.locator('#out').inputValue()).split('\n');
    expect(lines).toHaveLength(5);
    for (const l of lines) expect(l).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(new Set(lines).size).toBe(5);
    await page.locator('#count').fill('1000');
    await page.locator('#upper').check();
    await page.locator('#nohy').check();
    await page.locator('#gen').click();
    const many = (await page.locator('#out').inputValue()).split('\n');
    expect(many).toHaveLength(1000);
    expect(new Set(many).size).toBe(1000);
    expect(many[0]).toMatch(/^[0-9A-F]{32}$/);
    expect(external).toEqual([]);
    noErrors();
  });

  test('sürüm 7 zamana göre sıralı ve doğrulamada zaman çözülür', async ({ page }) => {
    await go(page);
    await page.locator('#ver').selectOption('7');
    await page.locator('#count').fill('3');
    await page.locator('#braces').check();
    await page.locator('#gen').click();
    const v = (await page.locator('#out').inputValue()).split('\n');
    for (const l of v) expect(l).toMatch(/^\{[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\}$/);
    await page.locator('#chk').fill(v[0]);
    await page.locator('#check').click();
    await expect(page.locator('#c-msg')).toContainText('7');
    await expect(page.locator('#c-msg')).toContainText('2026');
  });

  test('doğrulama: geçerli, geçersiz ve nil', async ({ page }) => {
    await go(page);
    await page.locator('#chk').fill('3f2504e0-4f89-41d3-9a0c-0305e82c3301');
    await page.locator('#check').click();
    await expect(page.locator('#c-msg')).toContainText('Geçerli UUID. Sürüm: 4');
    await page.locator('#chk').fill('merhaba');
    await page.locator('#check').click();
    await expect(page.locator('#c-msg')).toContainText('geçerli bir UUID değil');
    await page.locator('#chk').fill('00000000-0000-0000-0000-000000000000');
    await page.locator('#check').click();
    await expect(page.locator('#c-msg')).toContainText('nil UUID');
    await page.locator('#count').fill('0');
    await page.locator('#gen').click();
    await expect(page.locator('#error')).toContainText('1 ile 1000');
  });

});
