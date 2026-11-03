import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';

/** Tarayıcıda pdf.js (vendor) ile verilen parolayla açmayı dener; sayfa sayısını ya da hata adını döndürür. */
async function openWithPdfJs(page: Page, bytes: Buffer, password: string | undefined) {
  return page.evaluate(async ({ b64, password }) => {
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const bin = atob(b64);
    const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    try {
      const doc = await pdfjs.getDocument({ data, password }).promise;
      return { pages: doc.numPages };
    } catch (e: any) {
      return { error: e && e.name };
    }
  }, { b64: bytes.toString('base64'), password });
}

test.describe("PDF'e Şifre Ekle", () => {
  test('uc-sayfa.pdf → 1234 ile AES-256 şifrelenir, pdf-lib reddeder, pdf.js parolayla açar, kaldır aracı geri çözer', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-sifre-ekle/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#file-name')).toHaveText('uc-sayfa.pdf');
    await expect(page.locator('#options')).toBeVisible();
    await page.locator('#pw-user').fill('1234');
    await expect(page.locator('#pw-strength')).toContainText('Zayıf');
    await page.locator('#perm-copy').uncheck();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('AES-256');
    await expect(page.locator('#result-info')).toContainText('kopyalama kapalı');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-sifreli.pdf');
    const enc = readFileSync((await dl.path())!);
    expect(enc.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    const tail = enc.toString('latin1');
    expect(tail).toContain('/Encrypt');
    expect(tail).toContain('/AESV3');

    // pdf-lib parolasız yüklemeyi reddetmeli
    await expect(PDFDocument.load(enc, { ignoreEncryption: false })).rejects.toThrow(/encrypted/i);
    // pdf.js: doğru parola açar (3 sayfa), yanlış parola PasswordException verir
    expect(await openWithPdfJs(page, enc, '1234')).toEqual({ pages: 3 });
    expect(await openWithPdfJs(page, enc, 'yanlis')).toEqual({ error: 'PasswordException' });
    expect(await openWithPdfJs(page, enc, undefined)).toEqual({ error: 'PasswordException' });

    // Kaldır aracı aynı dosyayı 1234 ile açıp şifresiz üretir
    const encPath = test.info().outputPath('uc-sayfa-sifreli.pdf');
    writeFileSync(encPath, enc);
    await page.goto('/pdf-sifre-kaldir/');
    await page.locator('#drop input[type=file]').setInputFiles(encPath);
    await expect(page.locator('#not-encrypted')).toBeHidden();
    await page.locator('#pw').fill('1234');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl2.suggestedFilename()).toBe('uc-sayfa-sifreli-sifresiz.pdf');
    const plain = readFileSync((await dl2.path())!);
    const doc = await PDFDocument.load(plain, { ignoreEncryption: false });
    expect(doc.getPageCount()).toBe(3);
    expect(plain.toString('latin1')).not.toContain('/Encrypt');

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yalnızca sahip parolası: belge parolasız açılır, yazdırma kısıtlı', async ({ page }) => {
    await page.goto('/pdf-sifre-ekle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#pw-owner').fill('sahip-2026');
    await page.locator('#perm-print').uncheck();
    await page.locator('#opt-bits').selectOption('128');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('açılış parolası yok');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const enc = readFileSync((await dl.path())!);
    expect(enc.toString('latin1')).toContain('/AESV2');
    expect(await openWithPdfJs(page, enc, undefined)).toEqual({ pages: 2 });
  });

  test('parola boş, zaten şifreli ve bozuk dosya → Türkçe çözüm öneren hata', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-sifre-ekle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Bir parola yazın');
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await expect(page.locator('#error')).toContainText('zaten şifreli');
    await expect(page.locator('#error')).toContainText('PDF Şifresini Kaldır');
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF değil/);
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
    expect(external).toEqual([]);
  });

  test('sayfa içeriği: 800+ kelime, 6+ SSS, rozet, reklam butonun yanında değil', async ({ page }) => {
    await page.goto('/pdf-sifre-ekle/');
    const words = ((await page.locator('.ba-content').textContent()) || '').split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-content')).toContainText('ayrı bir kanaldan');
  });
});
