import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Birikim hesaplama: aylık bileşik birikim, hedef için aylık katkı, reel değer, hatalı giriş.
const URL = '/birikim-hesapla/';

async function fill(page: Page, v: { start?: string; monthly?: string; target?: string; term?: string; unit?: 'yil' | 'ay'; rate?: string; infl?: string }) {
  if (v.start !== undefined) await page.locator('#b-start').fill(v.start);
  if (v.monthly !== undefined) await page.locator('#b-monthly').fill(v.monthly);
  if (v.target !== undefined) await page.locator('#b-target').fill(v.target);
  if (v.term !== undefined) await page.locator('#b-term').fill(v.term);
  if (v.unit !== undefined) await page.locator('#b-unit').selectOption(v.unit);
  if (v.rate !== undefined) await page.locator('#b-rate').fill(v.rate);
  if (v.infl !== undefined) await page.locator('#b-infl').fill(v.infl);
}

test.describe('Birikim Hesaplama', () => {
  test('başlangıç 0, aylık 1.000 TL, getiri %0, 1 yıl → 12.000 TL; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await fill(page, { monthly: '1.000', term: '1' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-invested')).toHaveText('12.000,00 TL');
    await expect(page.locator('#r-balance')).toHaveText('12.000,00 TL');
    await expect(page.locator('#r-gain')).toHaveText('Getiri girilmedi');
    await expect(page.locator('#r-head')).toContainText('12.000,00 TL');
    await expect(page.locator('#plan-body tr')).toHaveCount(1);
    await expect(page.locator('#row-real')).toBeHidden();
    await expect(page.locator('#chart')).toHaveAttribute('data-ready', '1');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('aylık 1.000 TL, yıllık %12 (aylık %1), 12 ay → yaklaşık 12.682,50 TL', async ({ page }) => {
    await page.goto(URL);
    await fill(page, { monthly: '1000', term: '12', unit: 'ay', rate: '12' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-balance')).toContainText('12.682,50');
    await expect(page.locator('#r-gain')).toContainText('682,50');
    await expect(page.locator('#r-invested')).toHaveText('12.000,00 TL');
    // 10 yıl: 230.038,69 TL ve 10 satırlı yıl yıl tablo
    await fill(page, { term: '10', unit: 'yil' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-balance')).toContainText('230.038,69');
    await expect(page.locator('#plan-body tr')).toHaveCount(10);
    await expect(page.locator('#plan-body tr').first()).toContainText('1. yıl');
    await expect(page.locator('#plan-body tr').last()).toContainText('10. yıl');
  });

  test('başlangıç tutarı eklenir; 18 ay için son satır "1 yıl 6 ay" olur', async ({ page }) => {
    await page.goto(URL);
    await fill(page, { start: '5.000', monthly: '1000', term: '18', unit: 'ay' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-invested')).toHaveText('23.000,00 TL');
    await expect(page.locator('#plan-body tr')).toHaveCount(2);
    await expect(page.locator('#plan-body tr').last()).toContainText('1 yıl 6 ay');
    await expect(page.locator('#r-note')).toContainText('1 yıl 6 ay');
  });

  test('hedef modu: 100.000 TL, 5 yıl, getirisiz → aylık 1.666,67 TL; getiriyle azalır', async ({ page }) => {
    await page.goto(URL);
    await page.locator('input[name="mode"][value="hedef"]').check();
    await expect(page.locator('#g-target')).toBeVisible();
    await expect(page.locator('#g-monthly')).toBeHidden();
    await fill(page, { target: '100.000', term: '5' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('1.666,67 TL');
    await expect(page.locator('#row-need')).toBeVisible();
    await expect(page.locator('#r-need')).toHaveText('1.666,67 TL');
    await expect(page.locator('#r-invested')).toHaveText('100.000,00 TL');
    await expect(page.locator('#r-balance')).toHaveText('100.000,00 TL');
    await expect(page.locator('#plan-body tr')).toHaveCount(5);
    // yıllık %24 (aylık %2) getiriyle aylık katkı küçülür
    await fill(page, { rate: '24' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-need')).toHaveText('876,80 TL');
    // başlangıçta 10.000 TL varsa daha da küçülür
    await fill(page, { start: '10000' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-need')).toHaveText('589,12 TL');
    // ilk moda dönünce alanlar eski haline gelir
    await page.locator('input[name="mode"][value="birikim"]').check();
    await expect(page.locator('#g-monthly')).toBeVisible();
    await expect(page.locator('#g-target')).toBeHidden();
  });

  test('enflasyon girilirse reel değer satırı ve sütunu görünür (230.038,69 → 37.152,53)', async ({ page }) => {
    await page.goto(URL);
    await fill(page, { monthly: '1000', term: '10', rate: '12', infl: '20' });
    await page.locator('#calc').click();
    await expect(page.locator('#row-real')).toBeVisible();
    await expect(page.locator('#r-real')).toContainText('37.152,53');
    await expect(page.locator('#th-real')).toBeVisible();
    await expect(page.locator('#plan-body tr').last().locator('td')).toHaveCount(4);
    // enflasyon boşken satır tekrar gizlenir
    await fill(page, { infl: '' });
    await page.locator('#calc').click();
    await expect(page.locator('#row-real')).toBeHidden();
    await expect(page.locator('#th-real')).toBeHidden();
  });

  test('hatalı girişte Türkçe, çözüm öneren hata verir ve sonuç gizlenir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Süre geçersiz');
    await fill(page, { term: '51' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('50 yıl');
    await fill(page, { term: '5' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Başlangıç tutarı ve aylık katkı sıfır');
    await fill(page, { monthly: 'abc' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Aylık katkı geçersiz');
    await fill(page, { monthly: '1000', rate: '-5' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Getiri oranı geçersiz');
    await fill(page, { rate: '', infl: 'çok' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Enflasyon oranı geçersiz');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    // hedef modunda: boş hedef ve zaten ulaşılmış hedef
    await fill(page, { infl: '' });
    await page.locator('input[name="mode"][value="hedef"]').check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Hedef tutar geçersiz');
    await fill(page, { start: '50000', target: '40000' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('zaten hedefe ulaşıyor');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    // düzeltince hata kaybolur
    await fill(page, { start: '', target: '60000' });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(external).toEqual([]);
  });

  test('klavyeyle kullanılır, özet kopyalanır ve tavsiye değildir notu görünür', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(URL);
    await page.locator('#b-monthly').focus();
    await page.keyboard.type('1000');
    await page.locator('#b-term').focus();
    await page.keyboard.type('1');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result')).toContainText('Yatırım tavsiyesi değildir, getiri garantisi yoktur');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('12.000,00 TL');
    expect(clip).toContain('yatırım tavsiyesi değildir');
    await page.locator('#clear').click();
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    await expect(page.locator('#b-monthly')).toHaveValue('');
  });

  test('içerik: ≥900 kelime, ≥7 SSS, 3 reklam (A araç kutusunun altında), JSON-LD, 360px taşma yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(URL);
    const words = await page.locator('.ba-content').evaluate((n) => (n.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="birikim-hesapla-${s}"]`)).toHaveCount(1);
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="birikim-hesapla-a"]')).toHaveCount(1);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = blocks.map((b) => JSON.parse(b));
    expect(parsed.some((j) => j['@type'] === 'SoftwareApplication')).toBe(true);
    const faq = parsed.find((j) => j['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(faq.mainEntity.length).toBe(await page.locator('.ba-content details').count());
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-content')).toContainText('yatırım tavsiyesi değildir');
    // sonuç (uzun tablo + grafik) açıkken de sayfa yatayda taşmasın
    await fill(page, { start: '5000', monthly: '2000', term: '25', rate: '30', infl: '25' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#plan-body tr')).toHaveCount(25);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
});
