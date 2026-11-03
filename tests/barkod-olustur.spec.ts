import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Barkod Oluşturucu', () => {
  test('EAN-13: 12 rakamdan kontrol basamağı eklenir, PNG ve SVG iner; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/barkod-olustur/');
    await page.locator('#input').fill('590123412345');
    await expect(page.locator('#items li')).toHaveCount(1);
    await expect(page.locator('#items .bk-val')).toHaveText('5901234123457');
    await expect(page.locator('#items .bk-note')).toContainText('Kontrol basamağı otomatik eklendi: 7');
    const [png] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'PNG indir' }).click()]);
    expect(png.suggestedFilename()).toBe('barkod-5901234123457.png');
    const buf = readFileSync((await png.path())!);
    expect([...buf.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const [svg] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'SVG indir' }).click()]);
    expect(svg.suggestedFilename()).toBe('barkod-5901234123457.svg');
    expect(readFileSync((await svg.path())!, 'utf8')).toContain('<svg');
    expect(external).toEqual([]);
    noErrors();
  });

  test('tam 13 rakam doğrulanır; hatalı kontrol basamağı Türkçe hata verir', async ({ page }) => {
    await page.goto('/barkod-olustur/');
    await page.locator('#input').fill('5901234123457');
    await expect(page.locator('#items .bk-note')).toContainText('doğru');
    await page.locator('#input').fill('5901234123458');
    await expect(page.locator('#error')).toContainText('Kontrol basamağı hatalı');
    await expect(page.locator('#error')).toContainText('5901234123457');
    await expect(page.getByRole('button', { name: 'PNG indir' })).toHaveCount(0);
  });

  test('geçersiz giriş: harf ve yanlış uzunluk Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/barkod-olustur/');
    await page.locator('#input').fill('12AB');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await expect(page.locator('#error')).toContainText('Code 128');
    await page.locator('#input').fill('12345');
    await expect(page.locator('#error')).toContainText('12 rakam');
    await page.locator('#type').selectOption('code128');
    await page.locator('#input').fill('şeker');
    await expect(page.locator('#error')).toContainText('Türkçe harfler');
  });

  test('toplu üretim: üç satır, biri hatalı', async ({ page }) => {
    await page.goto('/barkod-olustur/');
    await page.locator('#input').fill('590123412345\n4006381333931\nabc');
    await expect(page.locator('#items li')).toHaveCount(3);
    await expect(page.locator('#items li.bk-bad')).toHaveCount(1);
    await expect(page.locator('#summary')).toContainText('2 barkod hazır');
    await expect(page.locator('#download-all')).toBeVisible();
  });

  test('GS1 uyarısı sayfada görünür', async ({ page }) => {
    await page.goto('/barkod-olustur/');
    await expect(page.locator('.bk-gs1')).toContainText('GS1 üyeliği olmadan ticari EAN numarası üretilmez');
  });
});
