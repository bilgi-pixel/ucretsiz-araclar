import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

test.describe('VKİ Hesaplama', () => {
  test('175 cm 70 kg → 22,9 normal; ideal aralık, bel/boy, enerji; uyarı görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/vki-hesapla/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
    // Uyarı hem başlık bölümünde hem sonuçta görünür olmalı
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await page.locator('#height').fill('175');
    await page.locator('#weight').fill('70');
    await page.locator('#age').fill('35');
    await page.getByLabel('Erkek').check();
    await page.locator('#waist').fill('84');
    await page.getByRole('button', { name: 'VKİ hesapla' }).click();
    await expect(page.locator('#r-bmi')).toHaveText('22,9');
    await expect(page.locator('#r-class')).toHaveText('Normal kilolu');
    await expect(page.locator('#r-ideal')).toHaveText('56,7 – 76,3 kg');
    await expect(page.locator('#r-whtr')).toHaveText('0,48');
    await expect(page.locator('#r-bmr')).toContainText('yaklaşık');
    await expect(page.locator('#r-bmr')).toContainText(/1\.?624/);
    await expect(page.locator('#r-tdee')).toContainText(/2\.?233/);
    await expect(page.locator('#r-disclaimer')).toBeVisible();
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    await expect(page.locator('#gauge')).toBeVisible();
    // Canvas'a gerçekten çizildi mi (boş değil)
    const drawn = await page.locator('#gauge').evaluate((c: HTMLCanvasElement) => c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data.some((v) => v !== 0));
    expect(drawn).toBe(true);
    expect(external).toEqual([]);
    noErrors();
  });

  test('sınıflandırma sınırları: 25 → fazla kilolu, 30 → obez; virgüllü kilo', async ({ page }) => {
    await page.goto('/vki-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#height').fill('200');
    await page.locator('#age').fill('40');
    await page.getByLabel('Kadın').check();
    await page.locator('#weight').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmi')).toHaveText('25,0');
    await expect(page.locator('#r-class')).toHaveText('Fazla kilolu');
    await page.locator('#weight').fill('120,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-class')).toHaveText('Obez (1. derece)');
    await expect(page.locator('#r-waist-row')).toBeHidden();
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; 18 yaş altı hesaplanmaz', async ({ page }) => {
    await page.goto('/vki-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#height').fill('1,75');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('santimetre');
    await page.locator('#height').fill('175');
    await page.locator('#weight').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kilo eksik ya da geçersiz');
    await page.locator('#weight').fill('70');
    await page.locator('#age').fill('12');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('18 yaş');
    await expect(page.locator('#error')).toContainText('persentil');
    await page.locator('#age').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Cinsiyeti seçin');
    await expect(page.locator('#result')).toBeHidden();
  });
});
