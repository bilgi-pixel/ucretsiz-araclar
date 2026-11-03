import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function calc(page: Page, expr: string) {
  const input = page.locator('#expr');
  await input.fill(expr);
  await input.press('Enter');
}

test.describe('Hesap Makinesi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hesap-makinesi/');
    await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden işlem yapılmasın
  });

  test('öncelik, parantez, üs birleşme ve yüzde; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await calc(page, '2+3*4');
    await expect(page.locator('#result')).toHaveText('14');
    await calc(page, '(2+3)*4');
    await expect(page.locator('#result')).toHaveText('20');
    await calc(page, '2^3^2');
    await expect(page.locator('#result')).toHaveText('512');
    await calc(page, '-2^2');
    await expect(page.locator('#result')).toHaveText('-4');
    await calc(page, '200+10%');
    await expect(page.locator('#result')).toHaveText('220');
    await calc(page, '0,1+0,2');
    await expect(page.locator('#result')).toHaveText('0,3');
    await calc(page, '7 mod 3');
    await expect(page.locator('#result')).toHaveText('1');
    expect(external).toEqual([]);
    noErrors();
  });

  test('bilimsel mod: sin(90) derecede 1, faktöriyel, radyan, log, kök', async ({ page }) => {
    await page.getByRole('button', { name: 'Bilimsel' }).click();
    await calc(page, 'sin(90)');
    await expect(page.locator('#result')).toHaveText('1');
    await calc(page, '5!');
    await expect(page.locator('#result')).toHaveText('120');
    await calc(page, 'log(1000)+√(16)');
    await expect(page.locator('#result')).toHaveText('7');
    await page.locator('[data-act="angle"]').click();
    await expect(page.locator('#angle-badge')).toHaveText('RAD');
    await calc(page, 'sin(π)');
    await expect(page.locator('#result')).toHaveText('0');
    await calc(page, 'cos(π)');
    await expect(page.locator('#result')).toHaveText('-1');
  });

  test('sıfıra bölme ve bozuk ifadeler Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await calc(page, '5/0');
    await expect(page.locator('#error')).toContainText('Sıfıra bölme tanımsız');
    await expect(page.locator('#result')).toHaveText('Hata');
    await calc(page, '2+');
    await expect(page.locator('#error')).toContainText('İfade tamamlanmamış');
    await calc(page, '2)+3');
    await expect(page.locator('#error')).toContainText('Parantez');
    await calc(page, '171!');
    await expect(page.locator('#error')).toContainText('170');
    await calc(page, '2+abc');
    await expect(page.locator('#error')).toContainText('tanınmadı');
  });

  test('klavye girişi, tuş takımı, hafıza ve geçmiş', async ({ page }) => {
    await page.locator('#expr').click();
    await page.keyboard.type('12+8');
    await expect(page.locator('#result')).toHaveText('20'); // önizleme
    await page.keyboard.press('Enter');
    await expect(page.locator('#history li')).toHaveCount(1);
    await expect(page.locator('#history li').first()).toContainText('12+8 = 20');
    // M+ ile hafızaya ekle, tuşlarla yeni işlem
    await page.locator('[data-mem="M+"]').click();
    await expect(page.locator('#mem-badge')).toHaveText('M = 20');
    await page.locator('[data-act="ac"]').click();
    await page.locator('[data-ins="3"]').click();
    await page.locator('[data-ins="×"]').click();
    await page.locator('[data-mem="MR"]').click();
    await page.locator('[data-act="eval"]').click();
    await expect(page.locator('#result')).toHaveText('60');
    await page.locator('[data-mem="MC"]').click();
    await expect(page.locator('#mem-badge')).toBeHidden();
    // Sonuçtan sonra işleç sonuçla devam eder
    await page.locator('[data-ins="+"]').click();
    await page.locator('[data-ins="1"]').click();
    await expect(page.locator('#expr')).toHaveValue('60+1');
    // Esc temizler
    await page.locator('#expr').press('Escape');
    await expect(page.locator('#expr')).toHaveValue('');
    // Geçmiş temizle
    await page.locator('#history-clear').click();
    await expect(page.locator('#history li')).toHaveCount(0);
  });

  test('geçmiş en fazla 50 kayıt tutar', async ({ page }) => {
    for (let i = 1; i <= 52; i++) await calc(page, `${i}+1`);
    await expect(page.locator('#history li')).toHaveCount(50);
    await expect(page.locator('#history li').first()).toContainText('52+1 = 53');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.getByRole('button', { name: 'Bilimsel' }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
