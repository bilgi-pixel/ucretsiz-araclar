import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/tasit-kredisi-hesapla/';

async function calc(page, price: string, down: string, rate: string, term: string) {
  await page.locator('#price').fill(price);
  await page.locator('#down').fill(down);
  await page.locator('#rate').fill(rate);
  await page.locator('#term').fill(term);
  await page.locator('#calc').click();
}

test.describe('Taşıt Kredisi Hesaplama', () => {
  test('1.000.000 TL araç, 700.000 TL peşinat, 24 ay, aylık %3,29 → taksit 20.238,02 TL; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL);
    await expect(page.locator('#param-date')).not.toHaveText('…');
    await calc(page, '1.000.000', '700.000', '3,29', '24');
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-active/);
    await expect(page.locator('#r-kredi')).toHaveText('300.000,00 TL');
    await expect(page.locator('#r-taksit')).toHaveText('20.238,02 TL');
    await expect(page.locator('#r-toplam')).toHaveText('485.712,48 TL');
    await expect(page.locator('#r-faiz')).toHaveText('142.855,61 TL');
    await expect(page.locator('#r-arac')).toHaveText('1.185.712,48 TL');
    await expect(page.locator('#plan-body tr')).toHaveCount(24);
    expect(external).toEqual([]);
    noErrors();
  });

  test('fatura bedeli yazılınca BDDK kademesi gösterilir', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#param-date')).not.toHaveText('…');
    await page.locator('#price').fill('300.000');
    await expect(page.locator('#limit-line')).toContainText('%70');
    await expect(page.locator('#limit-line')).toContainText('48 ay');
    await page.locator('#price').fill('1.000.000');
    await expect(page.locator('#limit-line')).toContainText('%30');
    await expect(page.locator('#limit-line')).toContainText('24 ay');
    await page.locator('#price').fill('5.000.000');
    await expect(page.locator('#limit-line')).toContainText('üstünde');
  });

  test('BDDK sınırı aşılınca Türkçe hata; kutu kaldırılınca hesap yapılır', async ({ page }) => {
    await page.goto(URL);
    // Yüksek kredi oranı
    await calc(page, '1.000.000', '600.000', '3,29', '24');
    await expect(page.locator('#error')).toContainText('en fazla %30');
    await expect(page.locator('#error')).toContainText('700.000,00 TL');
    await expect(page.locator('#result')).toBeHidden();
    // Uzun vade
    await calc(page, '1.000.000', '700.000', '3,29', '36');
    await expect(page.locator('#error')).toContainText('24 ay');
    // Sınırlar kapalıyken geçerli
    await page.locator('#bddk').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#plan-body tr')).toHaveCount(36);
  });

  test('hatalı girişler: harf, peşinat ≥ fatura, hatalı faiz', async ({ page }) => {
    await page.goto(URL);
    await calc(page, 'abc', '', '3', '12');
    await expect(page.locator('#error')).toContainText('fatura bedeli');
    await calc(page, '500.000', '500.000', '3', '12');
    await expect(page.locator('#error')).toContainText('Peşinat');
    await calc(page, '500.000', '300.000', '99', '12');
    await expect(page.locator('#error')).toContainText('Aylık faiz oranı geçersiz');
    await calc(page, '500.000', '300.000', '3', '12');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-kkdf')).not.toHaveText('');
  });

  test('360px genişlikte yatay taşma yok; klavye ile gönderilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.locator('#price').fill('1.000.000');
    await page.locator('#down').fill('700.000');
    await page.locator('#rate').fill('3,29');
    await page.locator('#term').focus();
    await page.keyboard.type('24');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('3 reklam alanı, ≥900 kelime, SSS ≥7, JSON-LD, bilgilendirme notu', async ({ page }) => {
    await page.goto(URL);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['tasit-kredisi-hesapla-a', 'tasit-kredisi-hesapla-b', 'tasit-kredisi-hesapla-c']);
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
