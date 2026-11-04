import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/kredi-karti-asgari-odeme-hesapla/';

test.describe('Kredi Kartı Asgari Ödeme Hesaplama', () => {
  test('asgari ödeme, kalan borç ve kapanış süresi hesaplanır; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#debt').fill('15.000');
    await page.locator('#limit').fill('40.000');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-min')).toContainText('3.000,00');
    await expect(page.locator('#r-rate')).toContainText('20');
    await expect(page.locator('#r-rest')).toContainText('12.000,00');
    await expect(page.locator('#r-int')).toContainText('420,00');
    await expect(page.locator('#r-months')).toHaveText('51 ay');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yüksek limitte oran %40 olur; elle oran seçimi çalışır', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#debt').fill('10000');
    await page.locator('#limit').fill('80000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-min')).toContainText('4.000,00');
    await page.locator('#rate').selectOption('30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-min')).toContainText('3.000,00');
    await expect(page.locator('#r-rate')).toContainText('30');
  });

  test('gecikme günü girilince gecikme faizi hesaplanır', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#debt').fill('15000');
    await page.locator('#limit').fill('40000');
    await page.locator('#days').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-late')).toContainText('39,50');
  });

  test('geçersiz girişte Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Dönem borcunu sıfırdan büyük');
    await page.locator('#debt').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Dönem borcunu');
    await page.locator('#debt').fill('5000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kart limitini girin');
    await page.locator('#limit').fill('20000');
    await page.locator('#interest').fill('99');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('akdi faiz oranını');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('içerik: >=900 kelime, 3 reklam, >=7 SSS, JSON-LD, bilgilendirme notu', async ({ page }) => {
    await page.goto(URL);
    const words = (await page.locator('main').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['kredi-karti-asgari-odeme-hesapla-a', 'kredi-karti-asgari-odeme-hesapla-b', 'kredi-karti-asgari-odeme-hesapla-c']);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    await expect(page.locator('main')).toContainText('tavsiyesi değildir');
    await expect(page.locator('main')).toContainText('yaklaşık');
  });

  test('360px taşma yok ve Enter ile gönderilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.locator('#debt').fill('15000');
    await page.locator('#limit').fill('40000');
    await page.locator('#limit').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
