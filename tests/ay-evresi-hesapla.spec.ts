import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/ay-evresi-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

async function calc(page, date: string, time = '12:00') {
  await page.locator('#date').fill(date);
  await page.locator('#time').fill(time);
  await page.getByRole('button', { name: 'Ay evresini hesapla' }).click();
}

test.describe('Ay Evresi Hesaplama', () => {
  test('3 Mart 2026 dolunay (14:38 TR) ve sonraki evreler; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await calc(page, '2026-03-03');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-name')).toHaveText('Dolunay');
    await expect(page.locator('#r-illum')).toContainText('%100');
    await expect(page.locator('#r-prev')).toContainText('17 Şubat 2026 Salı, 15:02');
    await expect(page.locator('#r-next-full')).toContainText('3 Mart 2026 Salı, 14:38');
    await expect(page.locator('#r-next-last')).toContainText('11 Mart 2026 Çarşamba, 12:39');
    await expect(page.locator('#r-next-new')).toContainText('19 Mart 2026 Perşembe, 04:24');
    await expect(page.locator('#r-next-first')).toContainText('25 Mart 2026 Çarşamba, 22:18');
    expect(external).toEqual([]);
    noErrors();
  });

  test('12 Ağustos 2026 (güneş tutulması günü): Yeni Ay, %0 aydınlık', async ({ page }) => {
    await open(page);
    await calc(page, '2026-08-12');
    await expect(page.locator('#r-name')).toHaveText('Yeni Ay');
    await expect(page.locator('#r-illum')).toHaveText('%0,2');
    await expect(page.locator('#r-next-new')).toContainText('12 Ağustos 2026 Çarşamba, 20:36');
    await expect(page.locator('#r-next-full')).toContainText('28 Ağustos 2026 Cuma, 07:18');
  });

  test('7 Kasım 2026: Küçülen Hilal, yaş 27,7 gün, sonraki yeni ay 9 Kasım', async ({ page }) => {
    await open(page);
    await calc(page, '2026-11-07');
    await expect(page.locator('#r-name')).toHaveText('Küçülen Hilal');
    await expect(page.locator('#r-age')).toContainText('27,7 gün (küçülüyor)');
    await expect(page.locator('#r-illum')).toHaveText('%4');
    await expect(page.locator('#r-next-new')).toContainText('9 Kasım 2026 Pazartesi, 10:02');
    await expect(page.locator('#r-next-first')).toContainText('17 Kasım 2026 Salı, 14:48');
  });

  test('ilk dördün çevresi büyüyen evre: 24 Şubat 2026 öğleden sonra İlk Dördün', async ({ page }) => {
    await open(page);
    await calc(page, '2026-02-24', '15:30');
    await expect(page.locator('#r-name')).toHaveText('İlk Dördün');
    await expect(page.locator('#r-age')).toContainText('büyüyor');
    await expect(page.locator('#r-illum')).toContainText('%50');
  });

  test('Şu an düğmesi sonucu hemen gösterir ve Enter ile hesaplanır', async ({ page }) => {
    await open(page);
    await page.getByRole('button', { name: 'Şu an' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-name')).not.toHaveText('');
    await page.locator('#date').fill('2025-11-05');
    await page.locator('#date').press('Enter');
    await expect(page.locator('#r-name')).toHaveText('Dolunay');
    await expect(page.locator('#r-next-new')).toContainText('20 Kasım 2025 Perşembe, 09:47');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#date').fill('');
    await page.locator('#calc').click();
    await expect(err).toContainText('Tarih geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#date').fill('1850-01-01');
    await page.locator('#calc').click();
    await expect(err).toContainText('1900 ile 2100');
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="ay-evresi-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await calc(page, '2026-03-03');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
