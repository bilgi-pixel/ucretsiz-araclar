import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** Builds an n-page PDF with pdf-lib; page i is (200 + 10*i) wide so the order can be verified. */
async function makePdf(n: number): Promise<Buffer> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  for (let i = 1; i <= n; i++) doc.addPage([200 + i * 10, 300]);
  return Buffer.from(await doc.save());
}

test.describe('Delete PDF Pages (EN)', () => {
  test('ticking page 2 removes it: 3 pages become 2; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/delete-pdf-pages/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');
    await expect(page.locator('#pages .pg-card canvas[data-ready="1"]')).toHaveCount(3);
    await page.locator('#pages .pg-card').nth(1).locator('input').check();
    await expect(page.locator('#summary')).toContainText('2 will stay');
    await expect(page.locator('#summary')).toContainText('1 will be deleted');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('1 page deleted');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-pages-deleted.pdf');
    const { PDFDocument } = await import('pdf-lib');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(2);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('the range "2,5-7" selects the right pages and keeps the order of the rest', async ({ page }) => {
    await page.goto('/en/delete-pdf-pages/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'report.pdf', mimeType: 'application/pdf', buffer: await makePdf(8) });
    await expect(page.locator('#pages .pg-card')).toHaveCount(8);
    await page.locator('#range-input').fill('2,5-7');
    await page.locator('#range-apply').click();
    await expect(page.locator('#pages .pg-card.is-selected')).toHaveCount(4);
    await expect(page.locator('#summary')).toContainText('4 will stay');
    for (const i of [1, 4, 5, 6]) await expect(page.locator('#pages .pg-card').nth(i).locator('input')).toBeChecked();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(4);
    // Remaining pages: 1, 3, 4, 8 -> widths 210, 230, 240, 280
    expect(doc.getPages().map((p) => Math.round(p.getWidth()))).toEqual([210, 230, 240, 280]);
  });

  test('invalid range, empty selection and deleting every page give clear English errors', async ({ page }) => {
    await page.goto('/en/delete-pdf-pages/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(2);
    await page.locator('#range-input').fill('abc');
    await page.locator('#range-apply').click();
    await expect(page.locator('#error')).toContainText('Invalid page range');
    await page.locator('#range-input').fill('9-12');
    await page.locator('#range-apply').click();
    await expect(page.locator('#error')).toContainText('no pages in that range');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Mark the pages');
    await page.locator('#sel-all').click();
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('at least one page left');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('corrupt and password-protected PDFs give English errors with a fix; non-PDF is rejected', async ({ page }) => {
    await page.goto('/en/delete-pdf-pages/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('damaged');
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('password');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('not a PDF file');
  });

  test('keyboard selection and Clear work', async ({ page }) => {
    await page.goto('/en/delete-pdf-pages/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    await page.locator('#pages .pg-card').nth(0).locator('input').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#pages .pg-card').nth(0)).toHaveClass(/is-selected/);
    await page.locator('#range-input').fill('3');
    await page.locator('#range-input').press('Enter');
    await expect(page.locator('#summary')).toContainText('2 will be deleted');
    await page.locator('#sel-invert').click();
    await expect(page.locator('#summary')).toContainText('1 will be deleted');
    await page.locator('#clear').click();
    await expect(page.locator('#editor')).toBeHidden();
    await expect(page.locator('#pages .pg-card')).toHaveCount(0);
  });

  test('content: 900+ words, 7+ FAQ, 3 ads, hreflang, JSON-LD, no horizontal scroll at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/delete-pdf-pages/');
    const words = (await page.locator('.ba-content').allInnerTexts()).join(' ').split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-delete-pdf-pages-${s}"]`)).toHaveCount(1);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /pdf-sayfa-sil/);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
});
