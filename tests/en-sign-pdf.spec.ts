import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PDFDocument, PDFName } from 'pdf-lib';

/** Çizim alanına fareyle dalgalı bir çizgi çizer. */
async function drawSignature(page: Page) {
  await page.locator('#sig-canvas').scrollIntoViewIfNeeded();
  const box = (await page.locator('#sig-canvas').boundingBox())!;
  const x0 = box.x + box.width * 0.2, y0 = box.y + box.height * 0.3;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  for (let i = 1; i <= 20; i++) {
    await page.mouse.move(x0 + i * box.width * 0.025, y0 + Math.sin(i / 3) * box.height * 0.25);
  }
  await page.mouse.up();
}

test.describe('Sign PDF (EN)', () => {
  test('a drawn signature is embedded into page 1 of a 2-page PDF, no external requests or page errors', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/sign-pdf/');
    await expect(page.locator('#apply')).toBeDisabled();
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#file-meta')).toContainText('2 pages');
    await expect(page.locator('#workspace')).toBeVisible();
    await expect(page.locator('#overlay')).toBeHidden();
    await drawSignature(page);
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#apply')).toBeEnabled();
    await expect(page.locator('#pos-info')).toContainText('Position: x');

    // Sürükleme: imza sola kayar
    await page.locator('#overlay').scrollIntoViewIfNeeded();
    const before = (await page.locator('#overlay').boundingBox())!;
    await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
    await page.mouse.down();
    await page.mouse.move(before.x + before.width / 2 - 80, before.y + before.height / 2 - 40, { steps: 5 });
    await page.mouse.up();
    const after = (await page.locator('#overlay').boundingBox())!;
    expect(after.x).toBeLessThan(before.x - 50);

    await page.locator('#opt-date').check();
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result-info')).toContainText('Page 1 signed');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('iki-sayfa-signed.pdf');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    expect(bytes.length).toBeGreaterThan(readFileSync(fx('iki-sayfa.pdf')).length);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
    const xobj = doc.getPage(0).node.Resources()?.lookup(PDFName.of('XObject'));
    expect(String(xobj)).toContain('Image');
    // Sayfa 2'ye imza eklenmemiş olmalı
    const xobj2 = doc.getPage(1).node.Resources()?.lookup(PDFName.of('XObject'));
    expect(String(xobj2 || '')).not.toContain('Image');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('typed signature + "Apply to all pages" puts an image on every page', async ({ page }) => {
    await page.goto('/en/sign-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#tab-text').click();
    await page.locator('#sig-text').fill('Jane Smith');
    await expect(page.locator('#overlay')).toBeVisible();
    await page.locator('#opt-all-pages').check();
    await page.locator('#apply').click();
    await expect(page.locator('#result-info')).toContainText('All 2 pages signed');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    for (let i = 0; i < 2; i++) {
      const xobj = doc.getPage(i).node.Resources()?.lookup(PDFName.of('XObject'));
      expect(String(xobj)).toContain('Image');
    }
  });

  test('uploading a signature image and moving it with the keyboard works', async ({ page }) => {
    await page.goto('/en/sign-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#tab-image').click();
    await page.locator('#img-drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#img-name')).toContainText('fotoğraf-ş.png');
    await expect(page.locator('#overlay')).toBeVisible();
    const before = (await page.locator('#overlay').boundingBox())!;
    await page.locator('#overlay').focus();
    await page.keyboard.press('Shift+ArrowLeft');
    await page.keyboard.press('Shift+ArrowLeft');
    const after = (await page.locator('#overlay').boundingBox())!;
    expect(after.x).toBeLessThan(before.x);
    await expect(page.locator('#apply')).toBeEnabled();
  });

  test('encrypted, damaged and non-PDF input give clear English errors', async ({ page }) => {
    await page.goto('/en/sign-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/password-protected/);
    await expect(page.locator('#error')).toContainText(/Remove the password/);
    await expect(page.locator('#workspace')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/damaged/);
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('is not a PDF');
  });

  test('at 360px the tool box does not overflow and the drawing pad is visible', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/sign-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#sig-canvas')).toBeVisible();
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBeLessThanOrEqual(360);
    await drawSignature(page);
    await expect(page.locator('#overlay')).toBeVisible();
  });

  test('page structure: English, hreflang, 3 ads away from buttons, FAQ, 800+ words, working related links', async ({ page }) => {
    await page.goto('/en/sign-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/sign-pdf/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdf-imzala/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-legal')).toContainText('not a certificate-based digital signature');
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    const hrefs = await page.locator('.ba-related a').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const h of hrefs) expect((await page.request.get(h)).status(), h).toBe(200);
  });
});
