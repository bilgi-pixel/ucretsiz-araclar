import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Oran Orantı Hesaplama', () => {
  test('doğru orantı 3/4 = 9/x → 12, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/oran-oranti-hesapla/');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-a').fill('3');
    await page.locator('#f-b').fill('4');
    await page.locator('#f-c').fill('9');
    await expect(page.locator('#r-rows .or-row').first()).toContainText('12');
    await expect(page.locator('#steps li')).toHaveCount(3);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ters orantı 6 işçi 12 gün → 9 işçi 8 gün', async ({ page }) => {
    await page.goto('/oran-oranti-hesapla/');
    await page.locator('#mode').selectOption('ters');
    await page.locator('#f-a').fill('6');
    await page.locator('#f-b').fill('12');
    await page.locator('#f-c').fill('9');
    await expect(page.locator('#r-rows .or-row').first()).toContainText('8');
  });

  test('ölçek 1:25000, 4 cm → 1 km', async ({ page }) => {
    await page.goto('/oran-oranti-hesapla/');
    await page.locator('#mode').selectOption('olcek');
    await page.locator('#f-n').fill('25000');
    await page.locator('#f-v').fill('4');
    await page.locator('#f-u').selectOption('cm');
    await expect(page.locator('#r-rows .or-row').first()).toContainText('1 km');
  });

  test('bileşik orantı 120 m → 270 m ve tarif ölçeklendirme', async ({ page }) => {
    await page.goto('/oran-oranti-hesapla/');
    await page.locator('#mode').selectOption('bilesik');
    await page.locator('#f-y0').fill('120');
    await page.locator('#f-o1').fill('6');
    await page.locator('#f-n1').fill('9');
    await page.locator('#f-o2').fill('10');
    await page.locator('#f-n2').fill('15');
    await expect(page.locator('#r-rows .or-row').first()).toContainText('270');

    await page.locator('#mode').selectOption('tarif');
    await page.locator('#f-p0').fill('4');
    await page.locator('#f-p1').fill('7');
    await page.locator('#f-list').fill('2 su bardağı un\n1/2 çay kaşığı tuz');
    await expect(page.locator('#r-rows')).toContainText('3,5 su bardağı un');
    await expect(page.locator('#r-rows')).toContainText('0,88 çay kaşığı tuz');
  });

  test('karışım yüzdesi %32', async ({ page }) => {
    await page.goto('/oran-oranti-hesapla/');
    await page.locator('#mode').selectOption('karisim');
    await page.locator('#f-m1').fill('3');
    await page.locator('#f-c1').fill('20');
    await page.locator('#f-m2').fill('2');
    await page.locator('#f-c2').fill('50');
    await expect(page.locator('#r-rows .or-row').first()).toContainText('%32');
  });

  test('hatalı giriş: sıfıra bölme ve harf için Türkçe hata', async ({ page }) => {
    await page.goto('/oran-oranti-hesapla/');
    await page.locator('#f-a').fill('0');
    await page.locator('#f-b').fill('4');
    await page.locator('#f-c').fill('9');
    await expect(page.locator('#error')).toContainText('a sıfır olamaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-a').fill('x3');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı, SSS ≥7', async ({ page }) => {
    await page.goto('/oran-oranti-hesapla/');
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  });
});
