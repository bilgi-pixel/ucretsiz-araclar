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

test.describe('Protect PDF (EN)', () => {
  test('uc-sayfa.pdf is encrypted with AES-256 and 1234; pdf-lib refuses it, pdf.js opens it with the password, Unlock PDF reverses it', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/protect-pdf/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#file-name')).toHaveText('uc-sayfa.pdf');
    await expect(page.locator('#options')).toBeVisible();
    await page.locator('#pw-user').fill('1234');
    await expect(page.locator('#pw-strength')).toContainText('Weak');
    await page.locator('#perm-copy').uncheck();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('AES-256');
    await expect(page.locator('#result-info')).toContainText('copying blocked');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-protected.pdf');
    const enc = readFileSync((await dl.path())!);
    expect(enc.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    const text = enc.toString('latin1');
    expect(text).toContain('/Encrypt');
    expect(text).toContain('/AESV3');

    // pdf-lib parolasız yüklemeyi reddetmeli
    await expect(PDFDocument.load(enc, { ignoreEncryption: false })).rejects.toThrow(/encrypted/i);
    // pdf.js: doğru parola açar (3 sayfa), yanlış ya da boş parola PasswordException verir
    expect(await openWithPdfJs(page, enc, '1234')).toEqual({ pages: 3 });
    expect(await openWithPdfJs(page, enc, 'wrong')).toEqual({ error: 'PasswordException' });
    expect(await openWithPdfJs(page, enc, undefined)).toEqual({ error: 'PasswordException' });

    // Unlock PDF aracı aynı dosyayı 1234 ile açıp şifresiz üretir
    const encPath = test.info().outputPath('uc-sayfa-protected.pdf');
    writeFileSync(encPath, enc);
    await page.goto('/en/unlock-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(encPath);
    await expect(page.locator('#not-encrypted')).toBeHidden();
    await page.locator('#pw').fill('1234');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl2.suggestedFilename()).toBe('uc-sayfa-protected-unlocked.pdf');
    const plain = readFileSync((await dl2.path())!);
    const doc = await PDFDocument.load(plain, { ignoreEncryption: false });
    expect(doc.getPageCount()).toBe(3);
    expect(plain.toString('latin1')).not.toContain('/Encrypt');

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('owner password only: the document opens without a password, printing is restricted', async ({ page }) => {
    await page.goto('/en/protect-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#pw-owner').fill('owner-2026');
    await page.locator('#perm-print').uncheck();
    await page.locator('#opt-bits').selectOption('128');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('no open password');
    await expect(page.locator('#result-info')).toContainText('printing blocked');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const enc = readFileSync((await dl.path())!);
    expect(enc.toString('latin1')).toContain('/AESV2');
    expect(await openWithPdfJs(page, enc, undefined)).toEqual({ pages: 2 });
  });

  test('empty password, already-encrypted and damaged files give clear English errors', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/protect-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Enter a password');
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('#pw-user').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('at least 4 characters');

    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await expect(page.locator('#error')).toContainText('already looks password-protected');
    await expect(page.locator('#error')).toContainText('Unlock PDF');
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/);
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('is not a PDF');
    expect(external).toEqual([]);
  });

  test('the Show and Hide button toggles the password field', async ({ page }) => {
    await page.goto('/en/protect-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pw-user')).toHaveAttribute('type', 'password');
    await page.locator('[data-toggle="pw-user"]').click();
    await expect(page.locator('#pw-user')).toHaveAttribute('type', 'text');
    await expect(page.locator('[data-toggle="pw-user"]')).toHaveText('Hide');
    await page.locator('[data-toggle="pw-user"]').click();
    await expect(page.locator('#pw-user')).toHaveAttribute('type', 'password');
  });

  test('at 360px the tool box does not overflow', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/protect-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('page structure: English, hreflang, 3 ads away from buttons, FAQ, 800+ words, working related links', async ({ page }) => {
    await page.goto('/en/protect-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/protect-pdf/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdf-sifre-ekle/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-content')).toContainText('another channel');
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    const hrefs = await page.locator('.ba-related a').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const h of hrefs) expect((await page.request.get(h)).status(), h).toBe(200);
  });
});
