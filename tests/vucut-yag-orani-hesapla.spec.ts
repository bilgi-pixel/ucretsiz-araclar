import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/vucut-yag-orani-hesapla/';

async function fillMale(page: Page, v: Record<string, string> = {}) {
  const d = { age: '30', height: '175', weight: '78', neck: '38', waist: '88', ...v };
  for (const [k, val] of Object.entries(d)) await page.locator('#' + k).fill(val);
}

test.describe('Vücut Yağ Oranı Hesaplama', () => {
  test('erkek ölçüleriyle yağ oranı hesaplanır, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('#result')).toBeHidden();
    await fillMale(page);
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-navy')).toContainText(/% 19,\d/);
    await expect(page.locator('#r-cat')).toContainText('Ortalama');
    await expect(page.locator('#r-fat')).toContainText('kg');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kadın seçilince kalça alanı açılır ve sonuç üretilir', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#hip-wrap')).toBeHidden();
    await page.getByLabel('Kadın').check();
    await expect(page.locator('#hip-wrap')).toBeVisible();
    await fillMale(page, { age: '28', height: '165', weight: '60', neck: '32', waist: '74' });
    await page.locator('#hip').fill('98');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-navy')).toContainText(/% \d+,\d/);
  });

  test('boş ve hatalı ölçülerde Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yaş alanını sayı olarak girin');
    await expect(page.locator('#result')).toBeHidden();
    await fillMale(page, { waist: '40', neck: '45' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Bel çevresi boyun çevresinden büyük olmalı');
    await fillMale(page, { height: '17' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy 120–230 cm aralığında');
  });

  test('klavyeyle Enter ile gönderilir ve virgüllü ondalık kabul edilir', async ({ page }) => {
    await page.goto(URL);
    await fillMale(page, { weight: '78,5' });
    await page.locator('#waist').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#age')).toHaveValue('');
  });

  test('içerik: >=900 kelime, 3 reklam, >=7 SSS, JSON-LD, tıbbi uyarı', async ({ page }) => {
    await page.goto(URL);
    const words = (await page.locator('main').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['vucut-yag-orani-hesapla-a', 'vucut-yag-orani-hesapla-b', 'vucut-yag-orani-hesapla-c']);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join('')).toContain('FAQPage');
    expect(ld.join('')).toContain('SoftwareApplication');
    await expect(page.locator('main')).toContainText('tıbbi tavsiye değildir');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.getByLabel('Kadın').check();
    await fillMale(page);
    await page.locator('#hip').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
