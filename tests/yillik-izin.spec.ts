import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Yıllık İzin Hesaplama', () => {
  test('6 yıl kıdemde son hak 20 gün; toplam ve kalan izin; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/yillik-izin/');
    await page.waitForLoadState('networkidle');
    await page.locator('#start').fill('2020-01-01');
    await page.locator('#ref').fill('2026-03-01');
    await page.locator('#used').fill('10');
    await page.getByRole('button', { name: 'İzni hesapla' }).click();
    await expect(page.locator('#r-years')).toHaveText('6 tam yıl');
    await expect(page.locator('#r-current')).toContainText('20 gün');
    // 5 yıl x 14 + 1 yıl x 20 = 90
    await expect(page.locator('#r-total')).toHaveText('90 gün');
    await expect(page.locator('#r-left')).toHaveText('80 gün');
    await expect(page.locator('#r-list li')).toHaveCount(6);
    expect(external).toEqual([]);
    noErrors();
  });

  test('5. yıl dahil 14 gün; 2 yıl 14 gün', async ({ page }) => {
    await page.goto('/yillik-izin/');
    await page.waitForLoadState('networkidle');
    await page.locator('#start').fill('2024-01-01');
    await page.locator('#ref').fill('2026-06-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-current')).toContainText('14 gün');
    await expect(page.locator('#r-total')).toHaveText('28 gün');
    await page.locator('#start').fill('2021-01-01');
    await page.locator('#ref').fill('2026-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-years')).toHaveText('5 tam yıl');
    await expect(page.locator('#r-current')).toContainText('14 gün');
    await expect(page.locator('#r-total')).toHaveText('70 gün');
  });

  test('50 yaş ve yer altı kuralları', async ({ page }) => {
    await page.goto('/yillik-izin/');
    await page.waitForLoadState('networkidle');
    await page.locator('#start').fill('2024-01-01');
    await page.locator('#birth').fill('1970-06-01');
    await page.locator('#ref').fill('2026-06-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('40 gün');
    await page.locator('#birth').fill('');
    await page.locator('#underground').check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('36 gün');
  });

  test('bir yıldan kısa hizmette hak yok', async ({ page }) => {
    await page.goto('/yillik-izin/');
    await page.waitForLoadState('networkidle');
    await page.locator('#start').fill('2026-01-01');
    await page.locator('#ref').fill('2026-06-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('0 gün');
    await expect(page.locator('#r-current')).toHaveText('Henüz hak yok');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/yillik-izin/');
    await page.waitForLoadState('networkidle');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('İşe giriş tarihi eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#start').fill('2026-06-01');
    await page.locator('#ref').fill('2026-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('hesaplanacak tarihten sonra olamaz');
    await page.locator('#ref').fill('2027-01-01');
    await page.locator('#used').fill('-3');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kullanılan izin günü');
  });
});
