import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';

test.describe('Resimden PDF\'e', () => {
  test('PNG → PDF, Türkçe ad korunur, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/resimden-pdfe/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('fotoğraf-ş.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-size').selectOption('a4p');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 sayfa');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.pdf');
    const path = await dl.path();
    const { readFileSync } = await import('node:fs');
    const head = readFileSync(path!).subarray(0, 5).toString();
    expect(head).toBe('%PDF-');
    expect(external).toEqual([]);
  });

  test('PDF dosyası verilince reddeder', async ({ page }) => {
    await page.goto('/resimden-pdfe/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('Yalnızca JPG, PNG ve WebP');
    await expect(page.locator('#files li')).toHaveCount(0);
  });
});

test.describe('PDF Birleştir', () => {
  test('iki PDF → 5 sayfa', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-birlestir/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    // sırayı değiştir: ikinci dosyayı yukarı taşı
    await page.locator('#files li').nth(1).getByLabel('Yukarı taşı').click();
    await expect(page.locator('#files li').first()).toContainText('uc-sayfa.pdf');
    await page.locator('#opt-name').fill('birleşik-çıktı');
    await page.locator('#merge').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('5 sayfa');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('birleşik-çıktı.pdf');
    expect(external).toEqual([]);
  });

  test('bozuk ve şifreli PDF anlaşılır hata verir', async ({ page }) => {
    await page.goto('/pdf-birlestir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await page.locator('#merge').click();
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await page.locator('#clear').click();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await page.locator('#merge').click();
    await expect(page.locator('#error')).toContainText(/şifreli/);
  });
});

test.describe('PDF Böl', () => {
  test('sayfa aralığı çıkarır ve her sayfayı ayırır', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-bol/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#page-count')).toHaveText('3');
    await page.locator('#opt-range').fill('3,1');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-sayfalar.pdf');

    await page.locator('#opt-mode').selectOption('single');
    await page.locator('#run').click();
    await expect(page.locator('#result-info')).toContainText('3 dosya');
    await expect(page.locator('#downloads button[data-download]')).toHaveCount(3);
    expect(external).toEqual([]);
  });

  test('geçersiz ifade hata verir', async ({ page }) => {
    await page.goto('/pdf-bol/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#page-count')).toHaveText('2'); // dosya açılınca aralık alanı otomatik dolar; sonra yazılmalı
    await page.locator('#opt-range').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Geçersiz sayfa ifadesi');
  });
});

test.describe('PDF\'den Resme', () => {
  test('2 sayfa → 2 JPG, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdfden-resme/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('2 sayfa');
    await page.locator('#opt-scale').selectOption('1');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 görsel');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('iki-sayfa-sayfa-1.jpg');
    expect(external).toEqual([]);
  });

  test('bozuk PDF hata verir', async ({ page }) => {
    await page.goto('/pdfden-resme/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
  });
});
