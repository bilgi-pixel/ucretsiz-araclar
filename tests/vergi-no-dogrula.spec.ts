import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Testte örnek numara GİB algoritmasıyla hesaplanır (araçta üretici yoktur).
function makeVkn(first9: string): string {
  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    const d = Number(first9[i - 1]);
    const t = (d + (10 - i)) % 10;
    let p = (t * 2 ** (10 - i)) % 9;
    if (t !== 0 && p === 0) p = 9;
    sum += p;
  }
  return first9 + String((10 - (sum % 10)) % 10);
}
const OK = makeVkn('481920375');
const OK2 = makeVkn('729104856');
const bump = (s: string, pos: number) => s.slice(0, pos) + String((Number(s[pos]) + 1) % 10) + s.slice(pos + 1);

test.describe('Vergi Kimlik No Algoritma Kontrolü', () => {
  test('geçerli → uygun; bir hane bozulunca uygun değil; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/vergi-no-dogrula/');
    await expect(page.locator('h1')).toContainText('sorgu değildir');
    await expect(page.locator('.tc-notice')).toContainText('mükellef adını ya da unvanını sorgulamaz');
    await expect(page.locator('.tc-notice')).toContainText('GİB İnteraktif Vergi Dairesi');
    await page.locator('#f-list').fill(`${OK.slice(0, 4)} ${OK.slice(4)}`);
    await expect(page.locator('#r-status')).toHaveText('Algoritmaya uygun');
    await expect(page.locator('#r-checks li.is-pass')).toHaveCount(2);
    await page.locator('#f-list').fill(bump(OK, 4));
    await expect(page.locator('#r-status')).toHaveText('Algoritmaya uygun değil');
    await expect(page.locator('#r-checks li.is-fail')).toHaveCount(1);
    await expect(page.locator('#r-note')).toContainText('üretmez');
    expect(external).toEqual([]);
    noErrors();
  });

  test('11 hane TC kimlik aracına yönlendirir; kısa ve harfli girdi hata verir', async ({ page }) => {
    await page.goto('/vergi-no-dogrula/');
    await page.locator('#f-list').fill('12345678901');
    await expect(page.locator('#tc-hint')).toBeVisible();
    await expect(page.locator('#tc-hint a')).toHaveAttribute('href', '../tc-kimlik-dogrula/');
    await page.locator('#f-list').fill('12345');
    await expect(page.locator('#r-status')).toContainText('10 hane olmalı');
    await expect(page.locator('#r-status')).toContainText('5 eksik');
    await page.locator('#f-list').fill('12345abcde');
    await expect(page.locator('#r-status')).toContainText('Rakam dışı');
    await expect(page.locator('#tc-hint')).toBeHidden();
  });

  test('toplu liste tablosu ve CSV indirme', async ({ page }) => {
    await page.goto('/vergi-no-dogrula/');
    const list = [OK, bump(OK2, 9), OK2, '12345678901', '123'].join('\n');
    await page.locator('#f-list').fill(list);
    await expect(page.locator('#r-status')).toContainText('5 satır: 2 uygun, 1 uygun değil');
    await expect(page.locator('#r-tbody tr')).toHaveCount(5);
    await expect(page.locator('#r-tbody tr.is-pass')).toHaveCount(2);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-csv').click()]);
    expect(dl.suggestedFilename()).toBe('vergi-no-kontrol.csv');
    const csv = readFileSync((await dl.path())!, 'utf8');
    expect(csv).toContain('sira;numara;durum');
    expect(csv).toContain(`1;${OK};Algoritmaya uygun`);
    expect(csv).toContain('Algoritmaya uygun değil');
  });

  test('sayfada üretici yok', async ({ page }) => {
    await page.goto('/vergi-no-dogrula/');
    await expect(page.getByRole('button', { name: /üret/i })).toHaveCount(0);
  });
});
