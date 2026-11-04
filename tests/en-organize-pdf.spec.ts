import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Organize PDF (EN)', () => {
  test('delete page 2 and rotate page 1 by 90° gives a 2-page PDF whose first page is rotated', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/organize-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    await expect(page.locator('#pages .pg-card canvas[data-ready="1"]')).toHaveCount(3);

    await page.locator('#pages .pg-card').nth(1).getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('#pages .pg-card').nth(1)).toHaveClass(/is-deleted/);
    await page.locator('#pages .pg-card').nth(0).getByRole('button', { name: 'Rotate right' }).click();
    await expect(page.locator('#pages .pg-card').nth(0).locator('.pg-thumb')).toHaveAttribute('data-rotation', '90');
    await expect(page.locator('#summary')).toContainText('2 kept');

    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 pages');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-organized.pdf');

    const { PDFDocument } = await import('pdf-lib');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
    expect(doc.getPage(0).getRotation().angle).toBe(90);
    expect(doc.getPage(1).getRotation().angle).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('keyboard reordering, reverse, blank page and extract selected', async ({ page }) => {
    await page.goto('/en/organize-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    // 3. sayfayı öne taşı: sıra 3,1,2
    await page.locator('#pages .pg-card').nth(2).getByRole('button', { name: 'Move earlier' }).click();
    await expect(page.locator('#pages .pg-card').nth(1).locator('.pg-num')).toContainText('was 3');
    // ters sırala: 2,1,3 → ilk kart eski 2
    await page.locator('#bulk-reverse').click();
    await expect(page.locator('#pages .pg-card').nth(0).locator('.pg-num')).toContainText('was 2');
    // boş sayfa en sona
    await page.locator('#bulk-blank').click();
    await expect(page.locator('#pages .pg-card')).toHaveCount(4);
    await expect(page.locator('#pages .pg-card').nth(3)).toHaveClass(/is-blank/);
    // ilk iki sayfayı seç, yeni PDF olarak çıkar
    await page.locator('#pages .pg-card').nth(0).locator('input[type=checkbox]').check();
    await page.locator('#pages .pg-card').nth(1).locator('input[type=checkbox]').check();
    await expect(page.locator('#summary')).toContainText('2 selected');
    await page.locator('#bulk-extract').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-selected.pdf');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(2);

    // Seçim yokken "Delete selected" yol gösterir
    await page.locator('#bulk-select-all').click(); // hepsi seçili
    await page.locator('#bulk-select-all').click(); // hepsi bırakıldı
    await page.locator('#bulk-delete').click();
    await expect(page.locator('#error')).toContainText('tick the checkbox');
  });

  test('dragging a card by its handle reorders pages (pointer events)', async ({ page }) => {
    await page.goto('/en/organize-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card canvas[data-ready="1"]')).toHaveCount(3);
    const handle = page.locator('#pages .pg-card').nth(0).locator('.ba-handle');
    const target = page.locator('#pages .pg-card').nth(2);
    await handle.hover(); // görünür alana kaydırır ve işaretçiyi tutamacın üstüne getirir
    const t = await target.boundingBox();
    await page.mouse.down();
    await page.mouse.move(t!.x + t!.width / 2, t!.y + t!.height / 2, { steps: 8 });
    await page.mouse.up();
    // 1. sayfa sona gitti: sıra 2,3,1
    await expect(page.locator('#pages .pg-card').nth(2).locator('.pg-num')).toContainText('was 1');
    await expect(page.locator('#pages .pg-card').nth(0).locator('.pg-num')).toContainText('was 2');
  });

  test('at 360px there is no horizontal scrolling and card buttons are visible', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/en/organize-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('#pages .pg-card').nth(0).getByRole('button', { name: 'Rotate right' })).toBeVisible();
  });

  test('damaged, encrypted and non-PDF input give clear English errors', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/organize-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/damaged|not a valid PDF/);
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/password-protected/);
    await expect(page.locator('#error')).toContainText(/Remove the password/);
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('Please choose a PDF file');
    expect(external).toEqual([]);
  });

  test('page structure: English, hreflang, 3 ads away from buttons, FAQ, 800+ words, working related links', async ({ page }) => {
    await page.goto('/en/organize-pdf/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/organize-pdf/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdf-sayfa-duzenle/');
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
