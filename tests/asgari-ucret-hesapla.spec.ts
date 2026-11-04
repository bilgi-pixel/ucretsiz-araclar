import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/asgari-ucret-hesapla/';

test.describe('Asgari Ücret Hesaplama 2026', () => {
  test('açılışta net 28.075,50 TL, brüt 33.030 TL, SGK ve işsizlik kesintisi; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL);
    await expect(page.locator('#param-date')).not.toHaveText('…');
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-active/);
    await expect(page.locator('#r-net')).toHaveText('28.075,50 TL');
    await expect(page.locator('#r-brut')).toHaveText('33.030,00 TL');
    await expect(page.locator('#r-sgk')).toHaveText('-4.624,20 TL');
    await expect(page.locator('#r-issizlik')).toHaveText('-330,30 TL');
    await expect(page.locator('#r-matrah')).toHaveText('28.075,50 TL');
    await expect(page.locator('#r-gv')).toContainText('istisna');
    await expect(page.locator('#r-damga')).toContainText('istisna');
    await expect(page.locator('#r-yillik')).toHaveText('336.906,00 TL');
    expect(external).toEqual([]);
    noErrors();
  });

  test('işveren maliyeti: 5 puan destekle 38.810,25 TL, destek yokken 40.461,75 TL', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#r-maliyet')).toHaveText('38.810,25 TL');
    await expect(page.locator('#r-isv-sgk')).toHaveText('5.119,65 TL');
    await expect(page.locator('#r-isv-iss')).toHaveText('660,60 TL');
    await page.locator('#discount').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#r-maliyet')).toHaveText('40.461,75 TL');
    await expect(page.locator('#r-isv-sgk')).toHaveText('6.771,15 TL');
  });

  test('günlük ve saatlik ücret; 15 gün çalışma yarıya iner', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#r-gun-brut')).toHaveText('1.101,00 TL');
    await expect(page.locator('#r-gun-net')).toHaveText('935,85 TL');
    await expect(page.locator('#r-saat-brut')).toHaveText('146,80 TL');
    await expect(page.locator('#r-saat-net')).toHaveText('124,78 TL');
    await page.locator('#days').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#r-brut')).toHaveText('16.515,00 TL');
    await expect(page.locator('#r-net')).toHaveText('14.037,75 TL');
  });

  test('hatalı gün sayısı Türkçe hata verir; düzeltince sonuç döner', async ({ page }) => {
    await page.goto(URL);
    for (const bad of ['31', '0', 'abc', '12,5']) {
      await page.locator('#days').fill(bad);
      await page.locator('#calc').click();
      await expect(page.locator('#error')).toContainText('Çalışılan gün sayısı geçersiz');
      await expect(page.locator('#result')).toBeHidden();
    }
    await page.locator('#days').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-net')).toHaveText('28.075,50 TL');
  });

  test('360px genişlikte yatay taşma yok; klavye ile gönderilir ve sıfırlanır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.locator('#days').focus();
    await page.keyboard.type('10');
    await page.keyboard.press('Enter');
    await expect(page.locator('#r-brut')).toHaveText('11.010,00 TL');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.locator('#clear').click();
    await expect(page.locator('#r-net')).toHaveText('28.075,50 TL');
  });

  test('3 reklam alanı, ≥900 kelime, SSS ≥7, JSON-LD, bilgilendirme notu', async ({ page }) => {
    await page.goto(URL);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['asgari-ucret-hesapla-a', 'asgari-ucret-hesapla-b', 'asgari-ucret-hesapla-c']);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const text = (await page.locator('article.ba-content').textContent()) || '';
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"FAQPage"'))).toBe(true);
    expect(ld.some((t) => t.includes('"SoftwareApplication"'))).toBe(true);
    await expect(page.locator('body')).toContainText('Bilgilendirme amaçlıdır');
  });
});
