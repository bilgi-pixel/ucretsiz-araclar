import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const slug = 'maas-ve-tazminat-hesaplari-2026';
const url = `/rehber/${slug}/`;
// Zorunlu araçlar: her biri 200 dönmeli
const requiredTools = ['brut-net-maas', 'kidem-tazminati', 'yillik-izin', 'mesai-hesapla', 'zam-orani-hesapla'];

test.describe(`Rehber: ${slug}`, () => {
  test('sayfa açılır, h1 görünür, en az 1200 kelime, SSS >= 6, uyarı ve rakamlar var', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(url);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('2026');
    const text = await page.locator('.ba-content').evaluate((el) => el.textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(1200);
    expect(text).toContain('bilgilendirme amaçlıdır');
    expect(text).toContain('mali veya hukuki tavsiye değildir');
    for (const n of ['33.030', '28.075,50', '190.000', '400.000', '1.500.000', '5.300.000']) {
      expect(text, n).toContain(n);
    }
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('araç bağlantıları 200 döner', async ({ page }) => {
    for (const t of requiredTools) {
      const res = await page.goto(`/${t}/`);
      expect(res?.status(), t).toBe(200);
    }
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(url);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
