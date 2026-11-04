import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/mevduat-faizi-hesapla/';

async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

async function calc(page: Page, amount: string, term: string, rate: string, unit = 'gun') {
  await page.locator('#f-amount').fill(amount);
  await page.locator('#f-term').fill(term);
  await page.locator('#f-unit').selectOption(unit);
  await page.locator('#f-rate').fill(rate);
  await page.locator('#calc').click();
}

test.describe('Mevduat Faizi Hesaplama', () => {
  test('100.000 TL, 32 gün, %45: brüt, %17,5 stopaj, net ve vade sonu; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await calc(page, '100.000', '32', '45');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-gross')).toHaveText('3.945,21 TL');
    await expect(page.locator('#r-taxrate')).toContainText('%17,5');
    await expect(page.locator('#r-taxamt')).toHaveText('690,41 TL');
    await expect(page.locator('#r-net')).toHaveText('3.254,80 TL');
    await expect(page.locator('#r-total')).toHaveText('103.254,80 TL');
    expect(external).toEqual([]);
    noErrors();
  });

  test('vadeye göre stopaj dilimi: 181 gün %15, 366 gün %10', async ({ page }) => {
    await open(page);
    await calc(page, '100000', '181', '45');
    await expect(page.locator('#r-taxrate')).toContainText('%15');
    await expect(page.locator('#r-net')).toHaveText('18.967,81 TL');
    await calc(page, '100000', '366', '45');
    await expect(page.locator('#r-taxrate')).toContainText('%10 ');
    await expect(page.locator('#r-net')).toHaveText('40.610,96 TL');
    await calc(page, '100000', '180', '45');
    await expect(page.locator('#r-taxrate')).toContainText('%17,5');
  });

  test('ay birimi 30 gün sayılır; stopaj ipucu vadeye göre değişir', async ({ page }) => {
    await open(page);
    await page.locator('#f-term').fill('200');
    await expect(page.locator('#tax-hint')).toContainText('%15');
    await calc(page, '100000', '3', '45', 'ay');
    await expect(page.locator('#r-gross')).toHaveText('11.095,89 TL');
    await expect(page.locator('#r-monthly')).toContainText('TL');
  });

  test('elle stopaj: %0 girilince net getiri brüte eşit olur', async ({ page }) => {
    await open(page);
    await page.locator('#f-taxmode').selectOption('manuel');
    await expect(page.locator('#f-tax')).toBeVisible();
    await page.locator('#f-tax').fill('0');
    await calc(page, '10000', '365', '40');
    await expect(page.locator('#r-net')).toHaveText('4.000,00 TL');
    await expect(page.locator('#r-taxrate')).toContainText('elle girildi');
    await expect(page.locator('#r-total')).toHaveText('14.000,00 TL');
  });

  test('Enter tuşuyla gönderim ve hatalı girişler Türkçe hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Tutar geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-amount').fill('5000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Vade geçersiz');
    await page.locator('#f-term').fill('30');
    await page.locator('#f-rate').fill('abc');
    await page.locator('#f-rate').press('Enter');
    await expect(page.locator('#error')).toContainText('Faiz oranı geçersiz');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-rate').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#error')).toHaveText('');
  });

  test('sayfa yapısı: 3 reklam alanı, en az 7 SSS, 900+ kelime, JSON-LD, parametre tarihi, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    await expect(page.locator('h1')).toContainText('Mevduat Faizi Hesaplama');
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const k of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="mevduat-faizi-hesapla-${k}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ld.map((t) => JSON.parse(t)['@type']);
    expect(types).toContain('FAQPage');
    expect(types).toContain('SoftwareApplication');
    await expect(page.locator('#params-info')).toContainText('Parametreler');
    await calc(page, '100000', '32', '45');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
