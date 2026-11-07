import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/us-logaritma-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}
async function calc(page, a: string, b: string) {
  await page.locator('#a').fill(a);
  await page.locator('#b').fill(b);
  await page.locator('#calc').click();
}

test.describe('Üslü Sayı ve Logaritma Hesaplama', () => {
  test('2 ve 10 → 1.024, kök, log10 ve ln; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await calc(page, '2', '10');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-pow')).toHaveText('1.024');
    await expect(page.locator('#r-root')).toHaveText('1,0717734625');
    await expect(page.locator('#r-log10')).toHaveText('0,3010299957');
    await expect(page.locator('#r-log2')).toHaveText('1');
    await expect(page.locator('#r-ln')).toHaveText('0,6931471806');
    expect(external).toEqual([]);
    noErrors();
  });

  test('1024 ve 2 → 1.048.576, karekök 32, log2 = 10', async ({ page }) => {
    await open(page);
    await calc(page, '1024', '2');
    await expect(page.locator('#r-pow')).toHaveText('1.048.576');
    await expect(page.locator('#r-root')).toHaveText('32');
    await expect(page.locator('#r-logb')).toHaveText('10');
    await expect(page.locator('#r-log10')).toHaveText('3,0102999566');
  });

  test('negatif sayı: -8 küp kökü -2, logaritma tanımsız açıklaması', async ({ page }) => {
    await open(page);
    await calc(page, '-8', '3');
    await expect(page.locator('#r-pow')).toHaveText('-512');
    await expect(page.locator('#r-root')).toHaveText('-2');
    await expect(page.locator('#r-ln')).toContainText('yalnızca pozitif sayılarda tanımlıdır');
    await calc(page, '-8', '2');
    await expect(page.locator('#r-root')).toContainText('çift dereceden kökü gerçek sayı değildir');
  });

  test('bilimsel gösterim ve virgül: 1e3 üssü 3, taban 1 uyarısı', async ({ page }) => {
    await open(page);
    await calc(page, '1e3', '3');
    await expect(page.locator('#r-pow')).toHaveText('1.000.000.000');
    await expect(page.locator('#r-root')).toHaveText('10');
    await expect(page.locator('#r-log10')).toHaveText('3');
    await calc(page, '100', '1');
    await expect(page.locator('#r-logb')).toContainText('1 olamaz');
    await calc(page, '2,25', '0,5');
    await expect(page.locator('#r-pow')).toHaveText('1,5');
  });

  test('hatalı giriş: harf için Türkçe, çözüm öneren hata; Temizle sıfırlar', async ({ page }) => {
    await open(page);
    await calc(page, 'abc', '2');
    await expect(page.locator('#error')).toContainText('geçerli bir sayı yazın');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, '5', '');
    await expect(page.locator('#error')).toContainText('Üs / taban / kök derecesi');
    await page.locator('#clear').click();
    await expect(page.locator('#a')).toHaveValue('');
    await expect(page.locator('#error')).toBeEmpty();
  });

  test('içerik: ≥800 kelime, 3 reklam, SSS ≥7, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(800);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
