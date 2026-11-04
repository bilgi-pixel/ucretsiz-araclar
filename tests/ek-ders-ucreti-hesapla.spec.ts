import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/ek-ders-ucreti-hesapla/';

test.describe('Ek Ders Ücreti Hesaplama', () => {
  test('gündüz ek ders için brüt, vergi ve net hesaplanır; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#coef')).toHaveValue('1,575512');
    await page.locator('#day').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-gross')).toContainText('17.645,73');
    await expect(page.locator('#r-tax')).toContainText('2.646,86');
    await expect(page.locator('#r-net')).toContainText('14.864,94');
    await expect(page.locator('#r-dayu')).toContainText('220,57');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('dönem değişince katsayı güncellenir; gece dersi artışı uygulanır', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#period').selectOption('ocak_haziran');
    await expect(page.locator('#coef')).toHaveValue('1,387871');
    await page.locator('#period').selectOption('temmuz_aralik');
    await page.locator('#night').fill('8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-nightu')).toContainText('236,33');
    await expect(page.locator('#r-gross')).toContainText('7.562,46');
  });

  test('kendi birim ücretini yazınca o tutar esas alınır; vergi dilimi seçilebilir', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#day').fill('10');
    await page.locator('#override').fill('200');
    await page.locator('#tax').selectOption('20');
    await page.locator('#calc').click();
    await expect(page.locator('#r-gross')).toContainText('8.000,00');
    await expect(page.locator('#r-tax')).toContainText('1.600,00');
  });

  test('saat girilmezse ve değerler hatalıysa Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En az bir ek ders saati girin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#day').fill('99');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('0–60 arasında');
    await page.locator('#day').fill('10');
    await page.locator('#coef').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Aylık katsayıyı girin');
  });

  test('içerik: >=900 kelime, 3 reklam, >=7 SSS, JSON-LD, yaklaşık uyarısı', async ({ page }) => {
    await page.goto(URL);
    const words = (await page.locator('main').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['ek-ders-ucreti-hesapla-a', 'ek-ders-ucreti-hesapla-b', 'ek-ders-ucreti-hesapla-c']);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    await expect(page.locator('main')).toContainText('tavsiyesi değildir');
    await expect(page.locator('main')).toContainText('4 Kasım 2026');
  });

  test('360px taşma yok ve Enter ile gönderilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.locator('#day').fill('12');
    await page.locator('#day').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
