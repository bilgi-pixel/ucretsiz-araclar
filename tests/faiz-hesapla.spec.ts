import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Faiz hesaplama: basit/bileşik, ters hesap, hatalı giriş, dış istek yok.
test.describe('Faiz Hesaplama', () => {
  test('basit faiz: 100.000 TL, %40, 1 yıl → 40.000 TL getiri', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/faiz-hesapla/');
    await page.locator('#f-principal').fill('100.000');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-term').fill('1');
    await page.locator('#f-type').selectOption('basit');
    await page.locator('#calc').click();
    await expect(page.locator('#r-gross')).toHaveText('40.000,00 TL');
    await expect(page.locator('#r-net')).toHaveText('40.000,00 TL');
    await expect(page.locator('#r-total')).toHaveText('140.000,00 TL');
    await expect(page.locator('#chart')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#plan-body tr')).toHaveCount(12);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('aylık bileşik faiz: 1 yıl sonunda yaklaşık 148.212,55 TL (±1 TL)', async ({ page }) => {
    await page.goto('/faiz-hesapla/');
    await page.locator('#f-principal').fill('100000');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-term').fill('1');
    await page.locator('#f-type').selectOption('bilesik');
    await page.locator('#f-comp').selectOption('aylik');
    await page.locator('#calc').click();
    const txt = (await page.locator('#r-total').textContent())!;
    const val = Number(txt.replace(' TL', '').replace(/\./g, '').replace(',', '.'));
    expect(Math.abs(val - 148212.55)).toBeLessThan(1);
  });

  test('stopaj girilince net getiri düşer', async ({ page }) => {
    await page.goto('/faiz-hesapla/');
    await page.locator('#f-principal').fill('100000');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-term').fill('1');
    await page.locator('#f-type').selectOption('basit');
    await page.locator('#f-tax').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#r-taxamt')).toHaveText('6.000,00 TL');
    await expect(page.locator('#r-net')).toHaveText('34.000,00 TL');
  });

  test('ters hesap: 100.000 TL → 200.000 TL hedefi 1 yıl 10 ayda, gereken oran', async ({ page }) => {
    await page.goto('/faiz-hesapla/');
    await page.locator('input[name="mode"][value="sure"]').check();
    await page.locator('#f-principal').fill('100000');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-target').fill('200000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('1 yıl 10 ay');
    await page.locator('input[name="mode"][value="oran"]').check();
    await page.locator('#f-target').fill('300000');
    await page.locator('#f-term').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-head')).toContainText('%37,18');
  });

  test('aylık ekleme toplam yatırılanı artırır', async ({ page }) => {
    await page.goto('/faiz-hesapla/');
    await page.locator('#f-principal').fill('100000');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-term').fill('1');
    await page.locator('#f-deposit').fill('5000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-invested')).toHaveText('160.000,00 TL');
  });

  test('hatalı giriş Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/faiz-hesapla/');
    await page.locator('#f-principal').fill('abc');
    await page.locator('#f-rate').fill('40');
    await page.locator('#f-term').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Anapara geçersiz');
    await page.locator('#f-principal').fill('1000');
    await page.locator('#f-rate').fill('yüzde');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Faiz oranı geçersiz');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    expect(external).toEqual([]);
  });

  test('sayfada yatırım tavsiyesi notu ve 3 reklam alanı var', async ({ page }) => {
    await page.goto('/faiz-hesapla/');
    await expect(page.locator('body')).toContainText('yatırım ya da finansal tavsiye değildir');
    await expect(page.locator('.ba-ad')).toHaveCount(3);
  });
});
