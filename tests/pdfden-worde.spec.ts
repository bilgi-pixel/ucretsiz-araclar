import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

test.describe('PDF\'den Word\'e', () => {
  test('2 sayfalık PDF → DOCX (zip imzası), dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/pdfden-worde/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('2 sayfa');
    await expect(page.locator('#opt-images')).not.toBeChecked();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 sayfa');
    await expect(page.locator('#result-info')).toContainText('iki-sayfa.docx');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('iki-sayfa.docx');
    const bytes = readFileSync((await dl.path())!);
    // DOCX bir zip paketidir: "PK\x03\x04" ile başlar.
    expect(Array.from(bytes.subarray(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(bytes.length).toBeGreaterThan(1000);
    // Paket içinde word/document.xml ve metin bulunmalı (deflate'siz saklanan girdilerde ad okunur).
    expect(bytes.toString('latin1')).toContain('word/document.xml');
    expect(external).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('sayfa görüntüleri seçeneğiyle de DOCX üretir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdfden-worde/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('2 sayfa');
    await page.locator('#opt-images').check();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 2).toString()).toBe('PK');
    expect(bytes.toString('latin1')).toContain('word/media/');
    expect(external).toEqual([]);
  });

  test('bozuk PDF anlaşılır hata verir', async ({ page }) => {
    await page.goto('/pdfden-worde/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await expect(page.locator('#actions')).toBeHidden();
  });

  test('şifreli PDF ve PDF olmayan dosya reddedilir', async ({ page }) => {
    await page.goto('/pdfden-worde/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli/);
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('Lütfen bir PDF dosyası seçin');
  });

  test('sayfa yapısı: rozet, reklam alanları buton yanında değil, içerik yeterli', async ({ page }) => {
    await page.goto('/pdfden-worde/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-faq details')).toHaveCount(8);
    // textContent: kapalı <details> içindeki SSS yanıtları da içeriğe dahildir.
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
