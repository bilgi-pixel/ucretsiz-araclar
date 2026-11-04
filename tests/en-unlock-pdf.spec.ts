import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';

// tests/fixtures/pdf-sifre-kaldir-1234.pdf: uc-sayfa.pdf'in qpdf ile AES-256, parola "1234" (yazdırma/kopyalama kapalı) şifrelenmiş hali.
// tests/fixtures/sifreli.pdf: el yapımı /Encrypt sözlüklü dosya; geçerli parolası yoktur ve xref tablosu olmadığından qpdf onu "bozuk" sayar.

test.describe('Unlock PDF (EN)', () => {
  test('1234-protected PDF: entering the password downloads an unlocked 3-page PDF, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/unlock-pdf/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await expect(page.locator('#file-name')).toHaveText('pdf-sifre-kaldir-1234.pdf');
    await expect(page.locator('#not-encrypted')).toBeHidden();
    await page.locator('#pw').fill('1234');
    await page.locator('#pw').press('Enter');
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('permission limits removed');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('pdf-sifre-kaldir-1234-unlocked.pdf');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(bytes.toString('latin1')).not.toContain('/Encrypt');
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
    expect(doc.getPageCount()).toBe(3);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('empty and wrong passwords give honest errors that say the tool cannot crack passwords', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/unlock-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Enter the password');
    await expect(page.locator('#error')).toContainText('does not crack passwords');

    await page.locator('#pw').fill('abcd');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Wrong password', { timeout: 30_000 });
    await expect(page.locator('#error')).toContainText('cannot guess or crack');
    await expect(page.locator('#result')).toBeHidden();
    expect(external).toEqual([]);
  });

  test('damaged file, fake-/Encrypt file and PNG give clear English errors', async ({ page }) => {
    await page.goto('/en/unlock-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/);
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    await page.locator('#pw').fill('1234');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/, { timeout: 30_000 });
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('is not a PDF');
  });

  test('an unencrypted PDF shows a notice and still produces a clean copy', async ({ page }) => {
    await page.goto('/en/unlock-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#not-encrypted')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('was not encrypted');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(2);
  });

  test('at 360px the tool box does not overflow', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/unlock-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('page structure: honest wording, legal note, hreflang, 3 ads away from buttons, FAQ, 800+ words, working related links', async ({ page }) => {
    await page.goto('/en/unlock-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/unlock-pdf/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdf-sifre-kaldir/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-hero')).toContainText('cannot crack a password you do not know');
    await expect(page.locator('.pw-legal')).toContainText('Legal note');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    const hrefs = await page.locator('.ba-related a').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const h of hrefs) expect((await page.request.get(h)).status(), h).toBe(200);
  });
});
