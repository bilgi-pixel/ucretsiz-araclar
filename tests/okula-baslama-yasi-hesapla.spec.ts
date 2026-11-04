import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/okula-baslama-yasi-hesapla/';

async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

async function calc(page: Page, birth: string) {
  await page.locator('#birth').fill(birth);
  await page.locator('#calc').click();
}

test.describe('Okula Başlama Yaşı Hesaplama', () => {
  test('Kasım 2020 doğumlu: 2026-27 için 70 ay (ertelenebilir), 2027-28 için 82 ay (zorunlu); dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await calc(page, '2020-11-15');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const cards = page.locator('#years .ob-card');
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0)).toContainText('2026-2027');
    await expect(cards.nth(0)).toContainText('70 ay');
    await expect(cards.nth(0)).toContainText('veli ertelettirebilir');
    await expect(cards.nth(1)).toContainText('82 ay');
    await expect(cards.nth(1)).toContainText('zorunlu');
    await expect(page.locator('#r-head')).toContainText('2026-2027');
    expect(external).toEqual([]);
    noErrors();
  });

  test('Şubat 2021 doğumlu: 67 ay, veli dilekçesiyle 1. sınıf; Eylül 2020: 72 ay zorunlu', async ({ page }) => {
    await open(page);
    await calc(page, '2021-02-10');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('67 ay');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('veli dilekçesiyle 1. sınıf');
    await expect(page.locator('#years .ob-card').nth(1)).toContainText('79 ay');
    await calc(page, '2020-09-30');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('72 ay');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('zorunlu');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('RAM');
  });

  test('Haziran 2021 doğumlu: 63 ay anaokulu 5 yaş grubu; Aralık 2021: 57 ay 4 yaş grubu', async ({ page }) => {
    await open(page);
    await calc(page, '2021-06-01');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('63 ay');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('5 yaş grubu');
    await expect(page.locator('#years .ob-card').nth(1)).toContainText('75 ay');
    await calc(page, '2021-12-31');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('57 ay');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('4 yaş grubu');
    await expect(page.locator('#years .ob-card').nth(1)).toContainText('69 ay');
  });

  test('küçük çocuk ve henüz kayıt yaşına gelmeyen: 35 ay ve altı, doğum 30 Eylül sonrası', async ({ page }) => {
    await open(page);
    await calc(page, '2024-03-10');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('30 ay');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('kayıt yok');
    await calc(page, '2027-11-01');
    await expect(page.locator('#years .ob-card').nth(0)).toContainText('kayıt yaşına gelmiyor');
    await expect(page.locator('#r-now')).toHaveText('Henüz doğmadı');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; Temizle sonucu gizler', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Doğum tarihi eksik');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, '1999-01-01');
    await expect(page.locator('#error')).toContainText('2000');
    await calc(page, '2035-01-01');
    await expect(page.locator('#error')).toContainText('çok ileri');
    await calc(page, '2020-11-15');
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#birth')).toHaveValue('');
  });

  test('sayfa yapısı: 3 reklam alanı, en az 7 SSS, 900+ kelime, JSON-LD, parametre tarihi, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    await expect(page.locator('h1')).toContainText('Okula Başlama Yaşı Hesaplama');
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const k of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="okula-baslama-yasi-hesapla-${k}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ld.map((t) => JSON.parse(t)['@type']);
    expect(types).toContain('FAQPage');
    expect(types).toContain('SoftwareApplication');
    await expect(page.locator('#params-info')).toContainText('Parametreler');
    await calc(page, '2020-11-15');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
