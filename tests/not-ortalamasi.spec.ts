import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Not Ortalaması', () => {
  test('vize 55 final 70 (40/60) → 64,00; finalden gereken not 46,67', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/not-ortalamasi/');
    await expect(page.locator('#param-updated')).not.toHaveText('…');
    await page.locator('#vf-vize').fill('55');
    await page.locator('#vf-final').fill('70');
    await expect(page.locator('#vf-rows dd').first()).toHaveText('64,00');
    // Final boş: hedef 50 için gereken (50 - 22) / 0,6 = 46,67
    await page.locator('#vf-final').fill('');
    await expect(page.locator('#vf-rows')).toContainText('46,67');
    // Oran değişimi: vize %30 → final otomatik 70; gereken (50 - 16,5) / 0,7 = 47,86
    await page.locator('#vf-vr').fill('30');
    await expect(page.locator('#vf-fr')).toHaveValue('70');
    await expect(page.locator('#vf-rows')).toContainText('47,86');
    // Ulaşılamaz: vize 0, hedef 90, final oranı %60 → 150
    await page.locator('#vf-vr').fill('40');
    await page.locator('#vf-vize').fill('0');
    await page.locator('#vf-target').fill('90');
    await expect(page.locator('#vf-rows')).toContainText('ulaşılamaz');
    expect(external).toEqual([]);
    noErrors();
  });

  test('ağırlıklı ortalama: 80x4, 60x3, 90x2 → 75,56; satır ekle/sil; 4\'lük', async ({ page }) => {
    await page.goto('/not-ortalamasi/');
    await page.getByRole('tab', { name: 'Ağırlıklı ortalama' }).click();
    const rows = page.locator('#w-rows .nr-line');
    await expect(rows).toHaveCount(3);
    const data = [['80', '4'], ['60', '3'], ['90', '2']];
    for (let i = 0; i < 3; i++) {
      await rows.nth(i).locator('.nr-grade').fill(data[i][0]);
      await rows.nth(i).locator('.nr-credit').fill(data[i][1]);
    }
    await expect(page.locator('#w-out dd').first()).toHaveText('75,56');
    // 4'lük karşılık: (3,0x4 + 1,0x3 + 4,0x2) / 9 = 23/9 = 2,56
    await expect(page.locator('#w-out')).toContainText('2,56');
    // Satır ekle ve sil
    await page.locator('#w-add').click();
    await expect(rows).toHaveCount(4);
    await rows.nth(3).getByRole('button', { name: 'Dersi sil' }).click();
    await expect(rows).toHaveCount(3);
    // 4'lük giriş: 4x3 + 2x1 / 4 = 3,50
    await page.locator('#w-scale').selectOption('4');
    await rows.nth(0).locator('.nr-grade').fill('4');
    await rows.nth(0).locator('.nr-credit').fill('3');
    await rows.nth(1).locator('.nr-grade').fill('2');
    await rows.nth(1).locator('.nr-credit').fill('1');
    await rows.nth(2).locator('.nr-grade').fill('');
    await rows.nth(2).locator('.nr-credit').fill('');
    await expect(page.locator('#w-out dd').first()).toHaveText('3,50');
  });

  test('dönüşüm tablosu ve tek not çevirici', async ({ page }) => {
    await page.goto('/not-ortalamasi/');
    await expect(page.locator('#tbl-body tr')).toHaveCount(9);
    await page.locator('#cv-in').fill('78');
    await expect(page.locator('#cv-out')).toHaveText('CB · 2,50');
  });

  test('hatalı girişlerde Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/not-ortalamasi/');
    await page.locator('#vf-vize').fill('120');
    await expect(page.locator('#vf-error')).toContainText('0 ile 100 arasında');
    await page.locator('#vf-vize').fill('50');
    await page.locator('#vf-vr').fill('40');
    await page.locator('#vf-fr').fill('70');
    // fr girişi vr'yi 30 yapar; toplam 100 kalır, bu yüzden elle bozmak için vr'yi tekrar yaz
    await page.locator('#vf-vr').fill('45');
    await page.locator('#vf-fr').evaluate((e: HTMLInputElement) => { e.value = '60'; e.dispatchEvent(new Event('change')); });
    await page.locator('#vf-vize').fill('51');
    await expect(page.locator('#vf-error')).toContainText('toplamı %100 olmalı');
    // Ağırlıklı: kredi eksik
    await page.getByRole('tab', { name: 'Ağırlıklı ortalama' }).click();
    await page.locator('#w-rows .nr-line').first().locator('.nr-grade').fill('70');
    await expect(page.locator('#w-error')).toContainText('hem not hem kredi');
    await page.locator('#w-rows .nr-line').first().locator('.nr-credit').fill('0');
    await expect(page.locator('#w-error')).toContainText('sıfırdan büyük');
    await page.locator('#w-rows .nr-line').first().locator('.nr-grade').fill('abc');
    await expect(page.locator('#w-error')).toContainText('yalnızca rakam');
  });
});
