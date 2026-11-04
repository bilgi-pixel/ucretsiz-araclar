import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const params = JSON.parse(readFileSync('web/trafik-cezasi-hesapla/parametreler.json', 'utf8'));
const tl = (n: number) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' TL';
const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const disc = (n: number) => round2(n * (1 - params.indirim.oran_yuzde / 100));

test.describe('Trafik Cezası Hesaplama', () => {
  test('madde seç → tutar parametreyle eşit, indirimli %75; iki ceza toplamı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/trafik-cezasi-hesapla/');
    await page.waitForLoadState('networkidle');
    expect(params.maddeler.length).toBeGreaterThanOrEqual(40);
    await expect(page.locator('#madde option')).toHaveCount(params.maddeler.length);

    const a = params.maddeler.find((m: any) => m.id === 'kirmizi-isik');
    const b = params.maddeler.find((m: any) => m.id === 'emniyet-kemeri');

    // Seçince tutar, indirimli tutar ve puan anında görünür.
    await page.locator('#madde').selectOption(a.id);
    await expect(page.locator('#sel-amount')).toHaveText(tl(a.tutar));
    await expect(page.locator('#sel-discount')).toHaveText(tl(a.tutar * 0.75));
    await expect(page.locator('#sel-discount')).toHaveText(tl(disc(a.tutar)));
    await expect(page.locator('#sel-points')).toHaveText(String(a.puan));
    await expect(page.locator('#sel-note')).not.toContainText('yaklaşık');

    // Tek ceza ekle.
    await page.locator('#add').click();
    await expect(page.locator('#r-total')).toHaveText(tl(a.tutar));
    await expect(page.locator('#r-discount')).toHaveText(tl(a.tutar * 0.75));
    await expect(page.locator('#r-points')).toHaveText(String(a.puan));
    await expect(page.locator('#list .fi')).toHaveCount(1);

    // İkinci ceza: toplam iki cezanın toplamı.
    await page.locator('#madde').selectOption(b.id);
    await page.locator('#add').click();
    await expect(page.locator('#list .fi')).toHaveCount(2);
    await expect(page.locator('#r-total')).toHaveText(tl(a.tutar + b.tutar));
    await expect(page.locator('#r-discount')).toHaveText(tl(disc(a.tutar + b.tutar)));
    await expect(page.locator('#r-saving')).toHaveText(tl(round2(a.tutar + b.tutar - disc(a.tutar + b.tutar))));
    await expect(page.locator('#r-points')).toHaveText(String(a.puan + b.puan));

    // Aynı maddeyi 2 adet eklemek adedi artırır.
    await page.locator('#adet').fill('2');
    await page.locator('#add').click();
    await expect(page.locator('#list .fi')).toHaveCount(2);
    await expect(page.locator('#r-total')).toHaveText(tl(a.tutar + b.tutar * 3));

    // Satırı kaldır.
    await page.locator(`#list .fi[data-id="${b.id}"] .fi-del`).click();
    await expect(page.locator('#list .fi')).toHaveCount(1);
    await expect(page.locator('#r-total')).toHaveText(tl(a.tutar));

    expect(external).toEqual([]);
    noErrors();
  });

  test('arama kutusu maddeleri süzer; Türkçe karakter duyarsızdır', async ({ page }) => {
    await page.goto('/trafik-cezasi-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#q').fill('kirmizi');
    await expect(page.locator('#madde option')).toHaveCount(6);
    await expect(page.locator('#madde option').first()).toHaveAttribute('value', 'kirmizi-isik');
    await page.locator('#q').fill('zzzz-yok');
    await expect(page.locator('#q-status')).toContainText('Eşleşen madde bulunamadı');
    await page.locator('#add').click();
    await expect(page.locator('#error')).toContainText('Bir ceza maddesi seçin');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('mevcut puan ve tebliğ tarihi: 100 puan uyarısı ve son gün hesabı', async ({ page }) => {
    await page.goto('/trafik-cezasi-hesapla/');
    await page.waitForLoadState('networkidle');
    const a = params.maddeler.find((m: any) => m.id === 'kirmizi-isik');
    await page.locator('#madde').selectOption(a.id);
    await page.locator('#mevcut').fill('90');
    await page.locator('#tebligat').fill('2026-03-01');
    await page.locator('#add').click();
    await expect(page.locator('#r-points')).toHaveText(`${a.puan} (toplam ${a.puan + 90})`);
    await expect(page.locator('#r-points-note')).toContainText('100 sınırına ulaşıyor');
    // 1 Mart 2026 + 15 gün = 1 Nisan 2026
    await expect(page.locator('#r-dates')).toContainText('1 Nisan 2026');
  });

  test('hatalı giriş Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/trafik-cezasi-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#madde option').first()).toBeAttached();
    await page.locator('#adet').fill('abc');
    await page.locator('#add').click();
    await expect(page.locator('#error')).toContainText('Geçerli bir adet girin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#adet').fill('0');
    await page.locator('#add').click();
    await expect(page.locator('#error')).toContainText('1 ile 20');
    await page.locator('#adet').fill('1');
    await page.locator('#mevcut').fill('-5');
    await page.locator('#add').click();
    await expect(page.locator('#error')).toContainText('0 ile 999');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfa içeriği: ≥900 kelime, ≥7 SSS, 3 reklam alanı, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/trafik-cezasi-hesapla/');
    await page.waitForLoadState('networkidle');
    const words = await page.locator('.ba-content').evaluate((n) => (n.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="trafik-cezasi-hesapla-${s}"]`)).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
