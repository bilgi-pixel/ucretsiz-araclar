import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Testte örnek numara hesaplanır (araçta üretici yoktur, sayfada sabit örnek gösterilmez).
function makeTckn(first9: string): string {
  const d = first9.split('').map(Number);
  const odd = d[0] + d[2] + d[4] + d[6] + d[8];
  const even = d[1] + d[3] + d[5] + d[7];
  const d10 = ((odd * 7 - even) % 10 + 10) % 10;
  const d11 = (d.reduce((a, b) => a + b, 0) + d10) % 10;
  return `${first9}${d10}${d11}`;
}
const OK = makeTckn('123456789');

test.describe('TC Kimlik No Algoritma Kontrolü', () => {
  test('algoritmaya uygun örnek → uygun; son hane değişince uygun değil; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/tc-kimlik-dogrula/');
    await expect(page.locator('h1')).toContainText('MERNİS sorgusu değildir');
    await expect(page.locator('.tc-notice')).toContainText('kime ait olduğunu söylemez');
    // Boşluklu giriş tolere edilir
    await page.locator('#f-tckn').fill(`${OK.slice(0, 3)} ${OK.slice(3, 7)} ${OK.slice(7)}`);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-status')).toHaveText('Algoritmaya uygun');
    await expect(page.locator('#r-checks li.is-pass')).toHaveCount(3);
    await expect(page.locator('#error')).toBeHidden();
    expect(page.url()).not.toContain(OK);
    // Son hane değişince uygun değil
    const last = Number(OK[10]);
    await page.locator('#f-tckn').fill(OK.slice(0, 10) + String((last + 1) % 10));
    await expect(page.locator('#r-status')).toHaveText('Algoritmaya uygun değil');
    await expect(page.locator('#r-checks li.is-fail')).toHaveCount(1);
    await expect(page.locator('#r-note')).toContainText('üretmez');
    expect(external).toEqual([]);
    noErrors();
  });

  test('10 hane, harf ve 0 ile başlayan giriş', async ({ page }) => {
    await page.goto('/tc-kimlik-dogrula/');
    await page.locator('#f-tckn').fill(OK.slice(0, 10));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('11 hane');
    await expect(page.locator('#error')).toContainText('1 eksik');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-tckn').fill('1234567890a');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    // İlk hane 0: algoritma kuralı tutmaz
    await page.locator('#f-tckn').fill(`0${OK.slice(1)}`);
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-status')).toHaveText('Algoritmaya uygun değil');
    await expect(page.locator('#r-checks li.is-fail').first()).toContainText('İlk hane');
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfada üretici yok ve gerçek görünümlü sabit örnek numara yok', async ({ page }) => {
    await page.goto('/tc-kimlik-dogrula/');
    const html = await page.content();
    await expect(page.getByRole('button', { name: /üret/i })).toHaveCount(0);
    expect(html).not.toMatch(/\b[1-9]\d{10}\b/);
  });
});
