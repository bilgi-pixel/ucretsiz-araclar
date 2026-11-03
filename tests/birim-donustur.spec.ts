import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page, qs = '') {
  await page.goto(`/birim-donustur/${qs}`);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden etkileşim olmasın
}

test.describe('Birim Dönüştürücü', () => {
  test('1 inç = 2,54 cm; ters yönde de çalışır; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page, '?k=uzunluk&a=inc&b=cm');
    await expect(page.locator('#val-b')).toHaveValue('2,54');
    await expect(page.locator('#result-line')).toHaveText('1 inç = 2,54 cm');
    await page.locator('#val-b').fill('254');
    await expect(page.locator('#val-a')).toHaveValue('100');
    expect(external).toEqual([]);
    noErrors();
  });

  test('veri: 1 GB = 1024 MB (ikili) ve 1000 MB (ondalık); ?k=veri ön seçimi', async ({ page }) => {
    await open(page, '?k=veri&a=gb&b=mb');
    await expect(page.locator('#cat')).toHaveValue('veri');
    await expect(page.locator('#base-box')).toBeVisible();
    await expect(page.locator('#val-b')).toHaveValue('1.024');
    await page.getByLabel(/1000 tabanı/).check();
    await expect(page.locator('#val-b')).toHaveValue('1.000');
  });

  test('sıcaklık: 100 °C = 212 °F, 373,15 K', async ({ page }) => {
    await open(page, '?k=sicaklik&a=c&b=f');
    await page.locator('#val-a').fill('100');
    await expect(page.locator('#val-b')).toHaveValue('212');
    await page.locator('#unit-b').selectOption('k');
    await expect(page.locator('#val-b')).toHaveValue('373,15');
  });

  test('sık kullanılan bağlantı sayfayı yenilemeden kategoriyi değiştirir', async ({ page }) => {
    await open(page);
    await page.getByRole('link', { name: 'KB → MB' }).click();
    await expect(page.locator('#cat')).toHaveValue('veri');
    await expect(page.locator('#unit-a')).toHaveValue('kb');
    await expect(page.locator('#unit-b')).toHaveValue('mb');
    await expect(page).toHaveURL(/k=veri/);
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page, '?k=uzunluk&a=m&b=km');
    await page.locator('#val-a').fill('abc');
    await expect(page.locator('#error')).toContainText('Değer sayı olarak okunamadı');
    await expect(page.locator('#val-b')).toHaveValue('');
    await page.locator('#val-a').fill('-5');
    await expect(page.locator('#error')).toContainText('negatif değer olmaz');
    await open(page, '?k=sicaklik&a=c&b=k');
    await page.locator('#val-a').fill('-300');
    await expect(page.locator('#error')).toContainText('mutlak sıfır');
    // geçersiz kategori parametresi sessizce varsayılana döner
    await open(page, '?k=yok');
    await expect(page.locator('#cat')).toHaveValue('uzunluk');
  });
});
