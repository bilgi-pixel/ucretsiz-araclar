import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL_PATH = '/kar-marji-hesapla/';
const mode = (page: Page, v: string) => page.locator(`input[name="mode"][value="${v}"]`).check();
const wordCount = (page: Page) => page.locator('.ba-content').evaluate((el) => ((el as HTMLElement).textContent || '').split(/\s+/).filter(Boolean).length);
const overflow = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

test.describe('Kâr Marjı Hesaplama', () => {
  test('maliyet 80, satış 100 → kâr 20, marj %20, markup %25; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    await page.locator('#m-cost').fill('80');
    await page.locator('#m-sale').fill('100');
    await expect(page.locator('#r-kar')).toHaveText('20,00 ₺');
    await expect(page.locator('#r-marj')).toHaveText('%20,00');
    await expect(page.locator('#r-markup')).toHaveText('%25,00');
    await expect(page.locator('#r-haric')).toHaveText('100,00 ₺');
    await expect(page.locator('#r-dahil')).toHaveText('120,00 ₺');
    expect(external).toEqual([]);
    noErrors();
  });

  test('maliyet 80 + hedef marj %20 → satış fiyatı 100 (KDV dahil 120)', async ({ page }) => {
    await page.goto(URL_PATH);
    await mode(page, 'fiyat');
    await page.locator('#m-cost').fill('80');
    await page.locator('#m-target').fill('20');
    await expect(page.locator('#r-haric')).toHaveText('100,00 ₺');
    await expect(page.locator('#r-kdv')).toHaveText('20,00 ₺');
    await expect(page.locator('#r-dahil')).toHaveText('120,00 ₺');
    await expect(page.locator('#r-markup')).toHaveText('%25,00');
  });

  test('KDV %20 dahil satış 120 → KDV hariç 100; %10 KDV ve özel oran', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#m-saletax').selectOption('dahil');
    await expect(page.locator('#sale-label')).toContainText('KDV dahil');
    await page.locator('#m-cost').fill('80');
    await page.locator('#m-sale').fill('120');
    await expect(page.locator('#r-haric')).toHaveText('100,00 ₺');
    await expect(page.locator('#r-kdv')).toHaveText('20,00 ₺');
    await expect(page.locator('#r-kar')).toHaveText('20,00 ₺');
    await page.locator('#m-vat').selectOption('10');
    await expect(page.locator('#r-haric')).toHaveText('109,09 ₺');
    await page.locator('#m-vat').selectOption('ozel');
    await page.locator('#m-vat-custom').fill('20');
    await expect(page.locator('#r-haric')).toHaveText('100,00 ₺');
  });

  test('komisyon %15 → net kâr 5; kargo ve KDV dahil komisyon tabanı', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#m-cost').fill('80');
    await page.locator('#m-sale').fill('100');
    await page.locator('#m-comm').fill('15');
    await expect(page.locator('#r-comm')).toHaveText('15,00 ₺');
    await expect(page.locator('#r-net')).toHaveText('5,00 ₺');
    await expect(page.locator('#r-netmarj')).toHaveText('%5,00');
    await expect(page.locator('#r-kar')).toHaveText('20,00 ₺');
    await page.locator('#m-ship').fill('2');
    await expect(page.locator('#r-net')).toHaveText('3,00 ₺');
    await page.locator('#m-ship').fill('');
    await page.locator('#m-commbase').selectOption('dahil');
    // 120 × %15 = 18 → 100 − 80 − 18 = 2
    await expect(page.locator('#r-comm')).toHaveText('18,00 ₺');
    await expect(page.locator('#r-net')).toHaveText('2,00 ₺');
  });

  test('satış fiyatı + hedef marj → azami maliyet', async ({ page }) => {
    await page.goto(URL_PATH);
    await mode(page, 'maliyet');
    await page.locator('#m-sale').fill('100');
    await page.locator('#m-target').fill('20');
    await expect(page.locator('#r-maxcost')).toHaveText('80,00 ₺');
    await page.locator('#m-saletax').selectOption('dahil');
    await page.locator('#m-sale').fill('500');
    await page.locator('#m-target').fill('25');
    await expect(page.locator('#r-maxcost')).toHaveText('312,50 ₺');
    await expect(page.locator('#r-maxcost-dahil')).toHaveText('375,00 ₺');
  });

  test('çoklu ürün: genel ve ortalama marj, CSV kopyala ve indir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(URL_PATH);
    await mode(page, 'toplu');
    const rows = page.locator('.bulk-row');
    await expect(rows).toHaveCount(2);
    await rows.nth(0).locator('[data-k="name"]').fill('A');
    await rows.nth(0).locator('[data-k="cost"]').fill('80');
    await rows.nth(0).locator('[data-k="price"]').fill('100');
    await rows.nth(0).locator('[data-k="qty"]').fill('9');
    await rows.nth(1).locator('[data-k="name"]').fill('B');
    await rows.nth(1).locator('[data-k="cost"]').fill('20');
    await rows.nth(1).locator('[data-k="price"]').fill('50');
    await expect(rows.nth(0).locator('[data-k="out"]')).toContainText('%20,00');
    await expect(page.locator('#mt-profit')).toHaveText('210,00 ₺');
    await expect(page.locator('#mt-sale')).toHaveText('950,00 ₺');
    await expect(page.locator('#mt-margin')).toHaveText('%22,11');
    await expect(page.locator('#mt-avgmargin')).toHaveText('%40,00');
    await expect(page.locator('#mt-avgmarkup')).toHaveText('%87,50');
    await page.locator('#bulk-copy').click();
    await expect(page.locator('#bulk-status')).not.toHaveText('');
    const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => ''));
    const csv = clip || (await page.locator('#csv-fallback').inputValue());
    expect(csv.split('\r\n').filter(Boolean)).toHaveLength(3);
    expect(csv).toContain('"A";9;80,00;100,00');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#bulk-csv').click()]);
    expect(dl.suggestedFilename()).toBe('kar-marji-listesi.csv');
    expect(readFileSync((await dl.path())!, 'utf8')).toContain('"B"');
    await rows.nth(1).locator('.bulk-del').click();
    await expect(rows).toHaveCount(1);
    await expect(page.locator('#mt-margin')).toHaveText('%20,00');
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#m-cost').fill('abc');
    await page.locator('#m-sale').fill('100');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#m-cost').fill('-5');
    await expect(page.locator('#error')).toContainText('negatif olamaz');
    await page.locator('#m-cost').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#m-cost').fill('80');
    await expect(page.locator('#error')).toBeHidden();
    await page.locator('#m-comm').fill('100');
    await expect(page.locator('#error')).toContainText('Komisyon oranı');
    await page.locator('#m-comm').fill('');
    await mode(page, 'fiyat');
    await page.locator('#m-target').fill('100');
    await expect(page.locator('#error')).toContainText('%100');
    await page.locator('#m-target').fill('90');
    await page.locator('#m-comm').fill('15');
    await expect(page.locator('#error')).toContainText('toplamı');
    await page.locator('#m-comm').fill('');
    await page.locator('#m-target').fill('20');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-haric')).toHaveText('100,00 ₺');
  });

  test('klavyeyle mod değişir; Temizle alanları sıfırlar', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('input[name="mode"][value="kar"]').focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('input[name="mode"][value="fiyat"]')).toBeChecked();
    await expect(page.locator('#m-target')).toBeVisible();
    await expect(page.locator('#m-sale')).toBeHidden();
    await page.locator('#m-cost').fill('80');
    await page.locator('#m-target').fill('20');
    await page.locator('#result').scrollIntoViewIfNeeded();
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await expect(page.locator('#m-cost')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('içerik: ≥900 kelime, 3 reklam, SSS ≥7 ve FAQPage/SoftwareApplication JSON-LD, marj–markup tablosu doğru', async ({ page }) => {
    await page.goto(URL_PATH);
    expect(await wordCount(page)).toBeGreaterThanOrEqual(900);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['kar-marji-hesapla-a', 'kar-marji-hesapla-b', 'kar-marji-hesapla-c']);
    const box = (await page.locator('.ba-tool').boundingBox())!;
    const adA = (await page.locator('[data-slot="kar-marji-hesapla-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(data['@graph'].some((n: { '@type': string }) => n['@type'] === 'SoftwareApplication')).toBe(true);
    expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(await page.locator('.ba-faq summary').allTextContents());
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://araclar.bilisimajans.com/kar-marji-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    expect((await page.locator('.ba-content').textContent()) || '').toContain('mali müşavirinize danışın');
    const tr = await page.locator('.km-table tbody tr').evaluateAll((trs) => trs.map((r) => Array.from(r.querySelectorAll('td')).map((td) => (td.textContent || '').trim())));
    expect(tr.length).toBeGreaterThanOrEqual(10);
    for (const [mk, mj, pr] of tr) {
      const k = Number(mk.replace('%', '')) / 100;
      expect(mj).toBe('%' + (Math.round((k / (1 + k)) * 10000) / 100).toFixed(2).replace('.', ','));
      expect(Number(pr.replace(' ₺', ''))).toBeCloseTo(100 * (1 + k), 5);
    }
  });

  test('360px: tüm modlarda yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await page.locator('#m-cost').fill('80');
    await page.locator('#m-sale').fill('100');
    await page.locator('#m-comm').fill('15');
    await page.locator('#m-ship').fill('2');
    await page.locator('#r-net').scrollIntoViewIfNeeded();
    await expect(page.locator('#r-net')).toBeVisible();
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await mode(page, 'maliyet');
    await page.locator('#m-target').fill('20');
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await mode(page, 'toplu');
    const row = page.locator('.bulk-row').nth(0);
    await row.locator('[data-k="name"]').fill('Çok uzun bir ürün adı örneği');
    await row.locator('[data-k="cost"]').fill('1250,50');
    await row.locator('[data-k="price"]').fill('2500');
    await page.locator('#mt-profit').scrollIntoViewIfNeeded();
    await expect(page.locator('#mt-profit')).toBeVisible();
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await page.locator('#bulk-add').click();
    expect(await overflow(page)).toBeLessThanOrEqual(0);
  });
});
