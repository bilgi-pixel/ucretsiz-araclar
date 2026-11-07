import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/karekok-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Karekök ve Üs Hesaplama', () => {
  test('√72 = 8,4852813742 ve sadeleştirilmiş 6√2; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#x').fill('72');
    await page.getByRole('button', { name: 'Kökü hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-big')).toHaveText('√72 = 8,4852813742');
    await expect(page.locator('#r-value')).toHaveText('8,4852813742');
    await expect(page.locator('#r-simple')).toContainText('6√2');
    await expect(page.locator('#r-perfect')).toContainText('Hayır');
    await expect(page.locator('#r-lower')).toContainText('8² = 64');
    await expect(page.locator('#r-upper')).toContainText('9² = 81');
    expect(external).toEqual([]);
    noErrors();
  });

  test('tam kare: √144 = 12', async ({ page }) => {
    await open(page);
    await page.locator('#x').fill('144');
    await page.locator('#x').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('√144 = 12');
    await expect(page.locator('#r-perfect')).toContainText('Evet');
    await expect(page.locator('#r-simple')).toBeHidden();
  });

  test('küpkök: ∛27 = 3 ve negatif ∛(−8) = −2', async ({ page }) => {
    await open(page);
    await page.locator('#n').fill('3');
    await page.locator('#x').fill('27');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('∛27 = 3');
    await page.locator('#x').fill('-8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('∛-8 = -2');
  });

  test('üs: 2 üzeri 10 = 1.024 ve 2 üzeri 100 kesin sonuç', async ({ page }) => {
    await open(page);
    await page.getByLabel('Üs al (kuvvet)').check();
    await expect(page.locator('#calc')).toHaveText('Kuvveti hesapla');
    await page.locator('#x').fill('2');
    await page.locator('#n').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('1.024');
    await page.locator('#n').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('1.267.650.600.228.229.401.496.703.205.376');
    await expect(page.locator('#r-digits')).toContainText('31 basamaklı');
    // negatif ve ondalık üs
    await page.locator('#x').fill('10');
    await page.locator('#n').fill('-2');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('0,01');
    await page.locator('#x').fill('9');
    await page.locator('#n').fill('0,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('3');
  });

  test('ondalık girişte virgül: √2,25 = 1,5', async ({ page }) => {
    await open(page);
    await page.locator('#x').fill('2,25');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('√2,25 = 1,5');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('Sayı alanı boş');
    await page.locator('#x').fill('abc');
    await page.locator('#calc').click();
    await expect(err).toContainText('Sayı geçersiz');
    await page.locator('#x').fill('-9');
    await page.locator('#calc').click();
    await expect(err).toContainText('gerçek sayılarda tanımsız');
    await expect(err).toContainText('3i');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#x').fill('16');
    await page.locator('#n').fill('1');
    await page.locator('#calc').click();
    await expect(err).toContainText('2 ile 100 arasında');
    await page.getByLabel('Üs al (kuvvet)').check();
    await page.locator('#x').fill('0');
    await page.locator('#n').fill('-1');
    await page.locator('#calc').click();
    await expect(err).toContainText('sıfıra bölme');
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="karekok-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await page.locator('#x').fill('1.000.000.000.000.000');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
