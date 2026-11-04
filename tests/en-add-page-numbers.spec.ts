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

test.describe('Add Page Numbers (EN)', () => {
  test('uc-sayfa.pdf becomes a numbered 3-page PDF with DejaVu embedded, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/add-page-numbers/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#preview')).toBeVisible();

    await page.locator('#opt-format').selectOption('wordOf');
    await page.locator('#opt-position').selectOption('bottom-right');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('numbers added to 3 pages');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-numbered.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    expect(out.length).toBeGreaterThan(readFileSync(fx('uc-sayfa.pdf')).length);
    const { pages, dump } = await dumpObjects(out);
    expect(pages).toBe(3);
    expect(dump).toContain('DejaVuSans');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('skipping the cover numbers only 2 pages; a custom pattern without {n} gives an error', async ({ page }) => {
    await page.goto('/en/add-page-numbers/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-skip').fill('1');
    await expect(page.locator('#preview-note')).toContainText('The first 1 page will be skipped');
    await page.locator('#opt-format').selectOption('custom');
    await expect(page.locator('#field-custom')).toBeVisible();
    await page.locator('#opt-custom').fill('Chapter');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('{n}');
    await page.locator('#opt-custom').fill('Page {n} of {total}');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('numbers added to 2 pages');
  });

  test('two files in a batch give two download buttons and "Download all"', async ({ page }) => {
    await page.goto('/en/add-page-numbers/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 files');
    await expect(page.locator('#downloads button[data-download]')).toHaveCount(2);
    await expect(page.locator('#download-all')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="1"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-numbered.pdf');
  });

  test('damaged and encrypted PDFs give clear errors and are not added to the list', async ({ page }) => {
    await page.goto('/en/add-page-numbers/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/);
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/password-protected/);
    await expect(page.locator('#error')).toContainText(/Remove the password first/);
    await expect(page.locator('#files li')).toHaveCount(0);
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('is not a PDF');
  });

  test('an invalid page range gives an English error', async ({ page }) => {
    await page.goto('/en/add-page-numbers/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-range').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Invalid page range');
  });

  test('at 360px the tool box does not overflow', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/add-page-numbers/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('page structure: English, hreflang, 3 ads away from buttons, FAQ, 800+ words, working related links', async ({ page }) => {
    await page.goto('/en/add-page-numbers/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/add-page-numbers/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdf-sayfa-numarasi/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
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
