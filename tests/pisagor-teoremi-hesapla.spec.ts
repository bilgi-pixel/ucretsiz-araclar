import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/pisagor-teoremi-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Pisagor Teoremi Hesaplama', () => {
  test('3-4 -> hipotenüs 5, alan 6, çevre 12, açılar, yükseklik; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#a').fill('3');
    await page.locator('#b').fill('4');
    await page.getByRole('button', { name: 'Eksik kenarı bul' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-big')).toHaveText('c = 5');
    await expect(page.locator('#r-area')).toHaveText('6');
    await expect(page.locator('#r-perimeter')).toHaveText('12');
    await expect(page.locator('#r-angles')).toContainText('36,87°');
    await expect(page.locator('#r-angles')).toContainText('53,13°');
    await expect(page.locator('#r-height')).toHaveText('2,4');
    await expect(page.locator('#r-triple')).toContainText('(3, 4, 5) ilkel');
    expect(external).toEqual([]);
    noErrors();
  });

  test('dik kenarı bulur: a=5, c=13 -> b = 12', async ({ page }) => {
    await open(page);
    await page.locator('#a').fill('5');
    await page.locator('#c').fill('13');
    await page.locator('#c').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('b = 12');
    await expect(page.locator('#r-missing-label')).toHaveText('b kenarı');
    await expect(page.locator('#r-triple')).toContainText('(5, 12, 13)');
  });

  test('irrasyonel sonuç: 1 ve 1 -> √2 = 1,4142135624', async ({ page }) => {
    await open(page);
    await page.locator('#a').fill('1');
    await page.locator('#b').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('c = 1,4142135624');
    await expect(page.locator('#r-angles')).toContainText('45°');
    await expect(page.locator('#r-triple')).toContainText('Hayır');
  });

  test('ondalık virgül ve üçlünün katı: 6-8 -> 10, (3, 4, 5) katı', async ({ page }) => {
    await open(page);
    await page.locator('#a').fill('4,5');
    await page.locator('#c').fill('7,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('b = 6');
    await page.locator('#a').fill('6');
    await page.locator('#b').fill('8');
    await page.locator('#c').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('c = 10');
    await expect(page.locator('#r-triple')).toContainText('(3, 4, 5) üçlüsünün katı');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('En az iki kenar');
    await page.locator('#a').fill('abc');
    await page.locator('#b').fill('4');
    await page.locator('#calc').click();
    await expect(err).toContainText('a kenarı geçersiz');
    await page.locator('#a').fill('-3');
    await page.locator('#calc').click();
    await expect(err).toContainText('sıfırdan büyük olmalı');
    await page.locator('#a').fill('9');
    await page.locator('#b').fill('');
    await page.locator('#c').fill('5');
    await page.locator('#calc').click();
    await expect(err).toContainText('Hipotenüs (c) dik kenarlardan uzun olmalı');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#b').fill('4');
    await page.locator('#calc').click();
    await expect(err).toContainText('Üç kenar da dolu');
  });

  test('Temizle alanları boşaltır ve sonucu gizler', async ({ page }) => {
    await open(page);
    await page.locator('#a').fill('3');
    await page.locator('#b').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#a')).toHaveValue('');
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="pisagor-teoremi-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await page.locator('#a').fill('3000000');
    await page.locator('#b').fill('4000000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('c = 5.000.000');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
