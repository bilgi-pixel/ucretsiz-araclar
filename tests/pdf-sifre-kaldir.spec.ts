import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';

// tests/fixtures/pdf-sifre-kaldir-1234.pdf: uc-sayfa.pdf'in qpdf ile AES-256, parola "1234" (yazdırma/kopyalama kapalı) şifrelenmiş hali.
// tests/fixtures/sifreli.pdf: make-fixtures.mjs'deki el yapımı /Encrypt sözlüklü dosya; /U ve /O sıfır olduğu için
// geçerli bir parolası yoktur ve xref tablosu da olmadığından qpdf onu "bozuk" olarak reddeder.

test.describe('PDF Şifresini Kaldır', () => {
  test('1234 ile şifreli PDF → parola girilince şifresiz 3 sayfalık PDF iner, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-sifre-kaldir/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await expect(page.locator('#file-name')).toHaveText('pdf-sifre-kaldir-1234.pdf');
    await expect(page.locator('#not-encrypted')).toBeHidden();
    await page.locator('#pw').fill('1234');
    await page.locator('#pw').press('Enter');
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('izin kısıtları kaldırıldı');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('pdf-sifre-kaldir-1234-sifresiz.pdf');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(bytes.toString('latin1')).not.toContain('/Encrypt');
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
    expect(doc.getPageCount()).toBe(3);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yanlış parola ve boş parola → Türkçe, kırmadığını söyleyen hata', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-sifre-kaldir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Parolayı yazın');
    await expect(page.locator('#error')).toContainText('parola kırmaz');

    await page.locator('#pw').fill('abcd');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Parola yanlış', { timeout: 30_000 });
    await expect(page.locator('#error')).toContainText('kıramaz');
    await expect(page.locator('#result')).toBeHidden();
    expect(external).toEqual([]);
  });

  test('bozuk.pdf, sahte /Encrypt sözlüklü sifreli.pdf ve PNG → anlaşılır hata', async ({ page }) => {
    await page.goto('/pdf-sifre-kaldir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF değil/);
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    await page.locator('#pw').fill('1234');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF değil/, { timeout: 30_000 });
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
  });

  test('şifresiz PDF → uyarı gösterir, yine de temiz kopya üretir', async ({ page }) => {
    await page.goto('/pdf-sifre-kaldir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#not-encrypted')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('zaten şifresizdi');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(2);
  });

  test('sayfa içeriği: 800+ kelime, 6+ SSS, yasal not, "kıramaz" ifadesi, rozet', async ({ page }) => {
    await page.goto('/pdf-sifre-kaldir/');
    const words = ((await page.locator('.ba-content').textContent()) || '').split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.pw-legal')).toContainText('Yasal not');
    await expect(page.locator('.ba-hero')).toContainText('kıramaz');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
  });
});
