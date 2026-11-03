import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

async function angles(bytes: Buffer): Promise<number[]> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(bytes);
  return doc.getPages().map((p) => p.getRotation().angle);
}

test.describe('PDF Sayfa Döndür', () => {
  test('uc-sayfa.pdf tüm sayfalar 90° → açılar [90,90,90]; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-dondur/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#preview')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('3 sayfadan 3');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-dondurulmus.pdf');
    expect(await angles(readFileSync((await dl.path())!))).toEqual([90, 90, 90]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('önizleme açıya göre en-boy oranını değiştirir; aralık 2 ve 180° → [0,180]', async ({ page }) => {
    await page.goto('/pdf-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#preview')).toBeVisible();
    const dims = () => page.locator('#preview').evaluate((c: HTMLCanvasElement) => [c.width, c.height]);
    await expect.poll(async () => (await dims())[0]).not.toBe(300); // 300 = boş canvas varsayılanı
    const [w0, h0] = await dims();
    await page.locator('#opt-angle').selectOption('180'); // varsayılan 90° yatay, 180° dikey
    await expect.poll(async () => (await dims())[0]).not.toBe(w0);
    const [w1, h1] = await dims();
    expect(Math.abs(w1 - h0)).toBeLessThanOrEqual(2);
    expect(Math.abs(h1 - w0)).toBeLessThanOrEqual(2);

    await page.locator('#opt-angle').selectOption('180');
    await page.locator('#opt-scope').selectOption('range');
    await page.locator('#opt-range').fill('2');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(await angles(readFileSync((await dl.path())!))).toEqual([0, 180]);
  });

  test('iki dosya toplu → iki ayrı indirme', async ({ page }) => {
    await page.goto('/pdf-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-angle').selectOption('180');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [d0] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const [d1] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="1"]').click()]);
    expect(await angles(readFileSync((await d0.path())!))).toEqual([180, 180]);
    expect(await angles(readFileSync((await d1.path())!))).toEqual([180, 180, 180]);
  });

  test('bozuk.pdf → Türkçe hata, seçenekler açılmaz; geçersiz aralık Türkçe hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('bozuk ya da geçerli bir PDF değil');
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-scope').selectOption('range');
    await page.locator('#opt-range').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Geçersiz sayfa ifadesi');
    expect(external).toEqual([]);
  });
});
