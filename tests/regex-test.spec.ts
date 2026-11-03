import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Regex Test Aracı', () => {
  test('/\\d+/g ile "a1b22" iki eşleşme bulur ve vurgular', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/regex-test/');
    await page.locator('#pattern').fill('\\d+');
    await page.locator('#text').fill('a1b22');
    await expect(page.locator('#match-count')).toHaveText('2 eşleşme');
    await expect(page.locator('#matches li')).toHaveCount(2);
    await expect(page.locator('#matches li').nth(1)).toContainText('indeks 3–5');
    await expect(page.locator('#preview mark')).toHaveCount(2);
    await expect(page.locator('#preview mark').nth(1)).toHaveText('22');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('adlandırılmış ve numaralı gruplar listelenir', async ({ page }) => {
    await page.goto('/regex-test/');
    await page.locator('#pattern').fill('(?<yil>\\d{4})-(\\d{2})');
    await page.locator('#text').fill('tarih 2025-03 bitti');
    await expect(page.locator('#matches li')).toHaveCount(1);
    await expect(page.locator('#matches li')).toContainText('yil: 2025');
    await expect(page.locator('#matches li')).toContainText('Grup 2: 03');
  });

  test('değiştir sekmesi $1 ve $2 kullanır', async ({ page }) => {
    await page.goto('/regex-test/');
    await page.locator('#pattern').fill('(\\d+)-(\\d+)');
    await page.locator('#text').fill('12-34');
    await page.locator('#tab-replace').click();
    await page.locator('#replacement').fill('$2-$1');
    await expect(page.locator('#replace-out')).toHaveValue('34-12');
  });

  test('hazır kalıp desen, bayrak ve örnek metni yükler', async ({ page }) => {
    await page.goto('/regex-test/');
    await page.locator('#preset').selectOption('tarih');
    await expect(page.locator('#f-g')).toBeChecked();
    await expect(page.locator('#match-count')).toHaveText('2 eşleşme');
    await expect(page.locator('#matches li').first()).toContainText('gun: 15');
  });

  test('geçersiz desen Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/regex-test/');
    await page.locator('#pattern').fill('(abc');
    await page.locator('#text').fill('abc');
    await expect(page.locator('#error')).toContainText('parantez');
    await expect(page.locator('#error')).toContainText('ekleyin');
    await page.locator('#pattern').fill('*a');
    await expect(page.locator('#error')).toContainText('niteleyici');
    await page.locator('#pattern').fill('a+');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('(a+)+$ uzun metinde 2 sn zaman aşımı uyarısı verir, sonra çalışmaya devam eder', async ({ page }) => {
    await page.goto('/regex-test/');
    await page.locator('#text').fill('a'.repeat(45) + 'b');
    await page.locator('#pattern').fill('(a+)+$');
    await expect(page.locator('#warning')).toContainText('Zaman aşımı', { timeout: 8000 });
    await expect(page.locator('#warning')).toContainText('sadeleştirin');
    // işçi yeniden başlatılmış olmalı
    await page.locator('#pattern').fill('a+');
    await expect(page.locator('#match-count')).toHaveText('1 eşleşme');
    await expect(page.locator('#warning')).toBeHidden();
  });
});
