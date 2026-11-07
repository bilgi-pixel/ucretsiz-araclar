import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/unix-zaman-damgasi/';
test.use({ timezoneId: 'Europe/Istanbul' });

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Unix Zaman Damgası Çevirici', () => {
  test('1700000000 → 2023-11-14T22:13:20Z, Türkiye 15.11.2023 01:13:20; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#ts').fill('1700000000');
    await page.getByRole('button', { name: 'Tarihe çevir' }).click();
    await expect(page.locator('#res-ts')).toBeVisible();
    await expect(page.locator('#res-ts')).toHaveClass(/is-active/);
    await expect(page.locator('#o-iso')).toHaveText('2023-11-14T22:13:20.000Z');
    await expect(page.locator('#o-tr')).toHaveText('15.11.2023 01:13:20 (Çarşamba)');
    await expect(page.locator('#o-local')).toHaveText('15.11.2023 01:13:20 (Çarşamba)');
    await expect(page.locator('#o-unit')).toHaveText('saniye');
    await expect(page.locator('#o-rel')).toContainText('önce');
    expect(external).toEqual([]);
    noErrors();
  });

  test('milisaniye otomatik algılanır; 2147483647 → 2038-01-19T03:14:07Z', async ({ page }) => {
    await open(page);
    await page.locator('#ts').fill('1700000000000');
    await page.locator('#ts').press('Enter');
    await expect(page.locator('#o-iso')).toHaveText('2023-11-14T22:13:20.000Z');
    await expect(page.locator('#o-unit')).toHaveText('milisaniye');
    await page.locator('#ts').fill('2147483647');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#o-iso')).toHaveText('2038-01-19T03:14:07.000Z');
    await expect(page.locator('#o-rel')).toContainText('sonra');
  });

  test('negatif ve sıfır: 0 → 1970-01-01, -86400 → 1969-12-31', async ({ page }) => {
    await open(page);
    await page.locator('#ts').fill('0');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#o-iso')).toHaveText('1970-01-01T00:00:00.000Z');
    await expect(page.locator('#o-tr')).toHaveText('01.01.1970 02:00:00 (Perşembe)');
    await page.locator('#ts').fill('-86400');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#o-iso')).toHaveText('1969-12-31T00:00:00.000Z');
  });

  test('tarihten zaman damgasına: Türkiye, UTC ve cihaz saatleri', async ({ page }) => {
    await open(page);
    await page.locator('#dt').fill('2023-11-15T01:13:20');
    await page.locator('#tz').selectOption('tr');
    await page.getByRole('button', { name: 'Zaman damgasına çevir' }).click();
    await expect(page.locator('#res-dt')).toBeVisible();
    await expect(page.locator('#o-sec')).toHaveText('1700000000');
    await expect(page.locator('#o-ms')).toHaveText('1700000000000');
    await expect(page.locator('#o-iso2')).toHaveText('2023-11-14T22:13:20.000Z');
    await page.locator('#dt').fill('2023-11-14T22:13:20');
    await page.locator('#tz').selectOption('utc');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#o-sec')).toHaveText('1700000000');
    // 2016 öncesi: 1 Ocak 2000 gece yarısı Türkiye saati UTC+2 idi
    await page.locator('#dt').fill('2000-01-01T00:00');
    await page.locator('#tz').selectOption('tr');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#o-sec')).toHaveText('946677600');
    // cihaz saat dilimi (test Europe/Istanbul'a ayarlı)
    await page.locator('#dt').fill('2023-11-15T01:13:20');
    await page.locator('#tz').selectOption('local');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#o-sec')).toHaveText('1700000000');
  });

  test('"Şimdiki zamanı kullan" ve canlı Unix saati', async ({ page }) => {
    await open(page);
    const now = Math.floor(Date.now() / 1000);
    const shown = Number(await page.locator('#now-sec').textContent());
    expect(Math.abs(shown - now)).toBeLessThan(120);
    await page.getByRole('button', { name: 'Şimdiki zamanı kullan' }).click();
    const v = Number(await page.locator('#ts').inputValue());
    expect(Math.abs(v - now)).toBeLessThan(120);
    await expect(page.locator('#o-iso')).toContainText('T');
    await page.getByRole('button', { name: 'Şimdiyi doldur' }).click();
    const sec = Number(await page.locator('#o-sec').textContent());
    expect(Math.abs(sec - now)).toBeLessThan(120);
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#ts-calc').click();
    await expect(page.locator('#error')).toContainText('Zaman damgası boş');
    await page.locator('#ts').fill('2023-11-14');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#error')).toContainText('yalnızca rakamlardan oluşmalı');
    await page.locator('#ts').fill('99999999999999999');
    await page.locator('#unit').selectOption('ms');
    await page.locator('#ts-calc').click();
    await expect(page.locator('#error')).toContainText('desteklenen aralığın dışında');
    await expect(page.locator('#res-ts')).toBeHidden();
    await page.locator('#dt-calc').click();
    await expect(page.locator('#error2')).toContainText('Tarih ve saat eksik');
    await expect(page.locator('#res-dt')).toBeHidden();
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="unix-zaman-damgasi-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await page.locator('#ts').fill('1700000000');
    await page.locator('#ts-calc').click();
    await page.locator('#dt').fill('2023-11-15T01:13:20');
    await page.locator('#dt-calc').click();
    await expect(page.locator('#res-dt')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
