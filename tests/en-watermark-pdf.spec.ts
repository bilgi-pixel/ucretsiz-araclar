import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** pdf-lib ile açıp tüm dolaylı nesneleri metne döker (nesne akışları açılmış olur). */
async function dumpObjects(bytes: Buffer): Promise<{ pages: number; dump: string }> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(bytes);
  const dump = doc.context.enumerateIndirectObjects().map(([, obj]) => obj.toString()).join('\n');
  return { pages: doc.getPageCount(), dump };
}

test.describe('Watermark PDF (EN)', () => {
  test('text watermark: 3 pages, DejaVu embedded, opacity present, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/watermark-pdf/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');
    await expect(page.locator('#preview')).toBeVisible();

    await page.locator('button[data-preset="CONFIDENTIAL"]').click();
    await expect(page.locator('#opt-text')).toHaveValue('CONFIDENTIAL');
    await page.locator('#opt-layout').selectOption('tile');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('watermark added to 3 pages');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-watermarked.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    expect(out.length).toBeGreaterThan(readFileSync(fx('uc-sayfa.pdf')).length);
    const { pages, dump } = await dumpObjects(out);
    expect(pages).toBe(3);
    expect(dump).toContain('DejaVuSans');
    expect(dump).toMatch(/\/ca\s+0?\.\d+/); // saydamlık için ExtGState
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('logo watermark (PNG) is embedded on page 2 only', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/watermark-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-type').selectOption('image');
    await expect(page.locator('#image-fields')).toBeVisible();
    await expect(page.locator('#text-fields')).toBeHidden();
    // Logo seçmeden çalıştırınca anlaşılır hata
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('No logo selected');
    await page.locator('#logo-drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#logo-name')).toContainText('fotoğraf-ş.png');
    await page.locator('#opt-layout').selectOption('corner-br');
    await page.locator('#opt-range').fill('2');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('watermark added to 1 page');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const out = readFileSync((await dl.path())!);
    const { pages, dump } = await dumpObjects(out);
    expect(pages).toBe(3);
    expect(dump).toContain('/Subtype /Image');
    expect(external).toEqual([]);
  });

  test('empty text and a wrong logo type give clear English errors', async ({ page }) => {
    await page.goto('/en/watermark-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-text').fill('');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('The watermark text is empty');
    await page.locator('#opt-type').selectOption('image');
    await page.locator('#logo-drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('PNG');
  });

  test('damaged and encrypted PDFs give clear errors and are not added to the list', async ({ page }) => {
    await page.goto('/en/watermark-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/);
    await expect(page.locator('#files li')).toHaveCount(0);
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/password-protected/);
    await expect(page.locator('#error')).toContainText(/Remove the password first/);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('is not a PDF');
  });

  test('an invalid page range gives an English error', async ({ page }) => {
    await page.goto('/en/watermark-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-range').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Invalid page range');
  });

  test('at 360px the tool box does not overflow', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/watermark-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('page structure: English, hreflang, honest note, 3 ads away from buttons, FAQ, 800+ words, working related links', async ({ page }) => {
    await page.goto('/en/watermark-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/watermark-pdf/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdf-filigran/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('.wm-honest')).toContainText('does not remove them');
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
