import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/kredi-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Kredi Hesaplama', () => {
  test('100.000 TL, %3 aylık, 12 ay, konut (vergisiz) → taksit 10.046,21 TL; plan 12 satır; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#amount').fill('100.000');
    await page.locator('#rate').fill('3');
    await page.locator('#term').fill('12');
    await page.locator('#type').selectOption('konut');
    await page.getByRole('button', { name: 'Taksiti hesapla' }).click();
    await expect(page.locator('#r-taksit')).toHaveText('10.046,21 TL');
    await expect(page.locator('#r-toplam')).toHaveText('120.554,52 TL');
    await expect(page.locator('#r-kkdf')).toHaveText('0,00 TL');
    await expect(page.locator('#plan-body tr')).toHaveCount(12);
    await expect(page.locator('#plan-body tr').last().locator('td').last()).toHaveText('0,00');
    await expect(page.locator('#r-ymo')).toContainText('%42,5');
    await expect(page.locator('#param-date')).not.toHaveText('…');
    expect(external).toEqual([]);
    noErrors();
  });

  test('ihtiyaç kredisinde KKDF ve BSMV eklenir, taksit yükselir', async ({ page }) => {
    await open(page);
    await page.locator('#amount').fill('100000');
    await page.locator('#rate').fill('3');
    await page.locator('#term').fill('12');
    await page.locator('#type').selectOption('ihtiyac');
    await page.locator('#calc').click();
    await expect(page.locator('#r-taksit')).toHaveText(/^10\.59\d,\d\d TL$/);
    await expect(page.locator('#r-kkdf')).not.toHaveText('0,00 TL');
    // ilk ay faizi 3.000 TL, KKDF ve BSMV 450'şer TL
    const first = page.locator('#plan-body tr').first().locator('td');
    await expect(first.nth(2)).toHaveText('3.000,00');
    await expect(first.nth(3)).toHaveText('450,00');
    await expect(first.nth(4)).toHaveText('450,00');
  });

  test('mevduat modu: 100.000 TL, %45, 32 gün, %17,5 stopaj', async ({ page }) => {
    await open(page);
    await page.getByLabel('Mevduat getirisi').check();
    await page.locator('#d-amount').fill('100000');
    await page.locator('#d-rate').fill('45');
    await page.locator('#d-days').fill('32');
    await page.locator('#d-tax').fill('17,5');
    await page.locator('#calc').click();
    // brüt = 100000 × 0,45 × 32/365 = 3.945,21
    await expect(page.locator('#d-gross')).toHaveText('3.945,21 TL');
    await expect(page.locator('#d-net')).toHaveText('3.254,79 TL');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kredi tutarı eksik ya da geçersiz');
    await page.locator('#amount').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kredi tutarı eksik ya da geçersiz');
    await page.locator('#amount').fill('50000');
    await page.locator('#rate').fill('3');
    await page.locator('#term').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Vade geçersiz');
    await expect(page.locator('#credit-result')).toBeHidden();
  });
});
