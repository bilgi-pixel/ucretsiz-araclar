import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/konut-kredisi-hesapla/';

async function calc(page, amount: string, rate: string, term: string) {
  await page.locator('#amount').fill(amount);
  await page.locator('#rate').fill(rate);
  await page.locator('#term').fill(term);
  await page.locator('#calc').click();
}

test.describe('Konut Kredisi Hesaplama', () => {
  test('1.000.000 TL, 120 ay, aylık %2,5 → taksit 26.361,79 TL; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL);
    await expect(page.locator('#param-date')).not.toHaveText('…');
    await calc(page, '1.000.000', '2,5', '120');
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-active/);
    await expect(page.locator('#r-taksit')).toHaveText('26.361,79 TL');
    await expect(page.locator('#r-toplam')).toHaveText('3.163.414,80 TL');
    await expect(page.locator('#r-faiz')).toHaveText('2.163.414,80 TL');
    await expect(page.locator('#r-masraf')).toHaveText('0,00 TL');
    // Amortisman: 120 satır, ilk ay faiz 25.000,00 ve anapara 1.361,79; son ay kalan borç 0
    await expect(page.locator('#plan-body tr')).toHaveCount(120);
    const first = page.locator('#plan-body tr').first().locator('td');
    await expect(first.nth(2)).toHaveText('25.000,00');
    await expect(first.nth(1)).toHaveText('1.361,79');
    await expect(page.locator('#plan-body tr').last().locator('td').last()).toHaveText('0,00');
    expect(external).toEqual([]);
    noErrors();
  });

  test('masraflar toplamı genel toplama eklenir; masraflı yıllık maliyet daha yüksektir', async ({ page }) => {
    await page.goto(URL);
    await page.locator('.kdv-costs summary').click();
    await page.locator('#f-ekspertiz').fill('10.000');
    await page.locator('#f-ipotek').fill('5.000,50');
    await calc(page, '1.000.000', '2,5', '120');
    await expect(page.locator('#r-masraf')).toHaveText('15.000,50 TL');
    await expect(page.locator('#r-genel')).toHaveText('3.178.415,30 TL');
    const parse = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));
    const plain = parse(await page.locator('#r-ymo').textContent());
    const withCost = parse(await page.locator('#r-ymo-masraf').textContent());
    expect(withCost).toBeGreaterThan(plain);
  });

  test('hatalı girişlerde Türkçe, çözüm öneren hata; sonuç gizlenir', async ({ page }) => {
    await page.goto(URL);
    await calc(page, '1.000.000', '2,5', '121');
    await expect(page.locator('#error')).toContainText('120');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, 'abc', '2,5', '120');
    await expect(page.locator('#error')).toContainText('Kredi tutarı');
    await calc(page, '1.000.000', '2,5', '120');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('.kdv-costs summary').click();
    await page.locator('#f-dosya').fill('x');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Dosya/tahsis ücreti geçersiz');
  });

  test('klavye ile (Enter) hesaplanır; Temizle sonucu gizler', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#amount').focus();
    await page.keyboard.type('500000');
    await page.keyboard.press('Tab');
    await page.keyboard.type('2,5');
    await page.keyboard.press('Tab');
    await page.keyboard.type('60');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#plan-body tr')).toHaveCount(60);
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#amount')).toHaveValue('');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await calc(page, '1.000.000', '2,5', '120');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('3 reklam alanı (a/b/c, araç kutusundan sonra), ≥900 kelime, SSS ≥7, JSON-LD', async ({ page }) => {
    await page.goto(URL);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['konut-kredisi-hesapla-a', 'konut-kredisi-hesapla-b', 'konut-kredisi-hesapla-c']);
    const adBeforeTool = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adBeforeTool).toBe(true);
    // Reklam, düğmelerin bulunduğu form/sonuç içinde olmamalı
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const text = (await page.locator('article.ba-content').textContent()) || '';
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-faq details')).toHaveCount(9);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"FAQPage"'))).toBe(true);
    expect(ld.some((t) => t.includes('"SoftwareApplication"'))).toBe(true);
    await expect(page.locator('body')).toContainText('Bilgilendirme amaçlıdır');
  });
});
