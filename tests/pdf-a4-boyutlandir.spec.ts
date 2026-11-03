import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

const A4: [number, number] = [595.28, 841.89];

async function sizes(bytes: Buffer): Promise<[number, number][]> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(bytes);
  return doc.getPages().map((p) => { const s = p.getSize(); return [s.width, s.height] as [number, number]; });
}

/** Karışık boyutlu PDF: A4 dikey, Letter, A3, A5, A4 yatay. */
async function mixedPdf(): Promise<Buffer> {
  const { PDFDocument, rgb } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  const dims: [number, number][] = [[595.28, 841.89], [612, 792], [841.89, 1190.55], [419.53, 595.28], [841.89, 595.28]];
  dims.forEach(([w, h], i) => {
    const p = doc.addPage([w, h]);
    p.drawRectangle({ x: 20, y: 20, width: w - 40, height: h - 40, borderColor: rgb(0, 0, 0), borderWidth: 3 });
    p.drawText(`Sayfa ${i + 1}`, { x: 60, y: h - 100, size: 40 });
  });
  return Buffer.from(await doc.save());
}

test.describe('PDF Sayfa Boyutunu Değiştir', () => {
  test('uc-sayfa.pdf A4 hedef → tüm sayfalar 595.28×841.89; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-a4-boyutlandir/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#preview')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-boyutlu.pdf');
    const s = await sizes(readFileSync((await dl.path())!));
    expect(s).toHaveLength(3);
    for (const [w, h] of s) { expect(Math.abs(w - A4[0])).toBeLessThanOrEqual(1); expect(Math.abs(h - A4[1])).toBeLessThanOrEqual(1); }
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('karışık boyutlu PDF, hepsi dikey zorla → 5 sayfa da A4; otomatikte yatay sayfa yatay A4', async ({ page }) => {
    await page.goto('/pdf-a4-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'karisik.pdf', mimeType: 'application/pdf', buffer: await mixedPdf() });
    await expect(page.locator('#files li')).toContainText('5 sayfa');
    await page.locator('#opt-orient').selectOption('portrait');
    await page.locator('#opt-mode').selectOption('fill');
    await page.locator('#opt-margin').fill('10');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const s = await sizes(readFileSync((await dl.path())!));
    expect(s).toHaveLength(5);
    for (const [w, h] of s) { expect(Math.abs(w - A4[0])).toBeLessThanOrEqual(1); expect(Math.abs(h - A4[1])).toBeLessThanOrEqual(1); }

    // Otomatik yönelim: 5. sayfa (yatay A4) yatay kalır
    await page.locator('#opt-orient').selectOption('auto');
    await page.locator('#opt-mode').selectOption('fit');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const s2 = await sizes(readFileSync((await dl2.path())!));
    expect(Math.abs(s2[4][0] - A4[1])).toBeLessThanOrEqual(1);
    expect(Math.abs(s2[4][1] - A4[0])).toBeLessThanOrEqual(1);
    expect(Math.abs(s2[1][0] - A4[0])).toBeLessThanOrEqual(1);
  });

  test('özel ölçü 100×150 mm → sayfa 283.46×425.20 pt; geçersiz ölçü Türkçe hata verir', async ({ page }) => {
    await page.goto('/pdf-a4-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-paper').selectOption('custom');
    await page.locator('#opt-orient').selectOption('portrait');
    await page.locator('#opt-w').fill('100');
    await page.locator('#opt-h').fill('150');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const s = await sizes(readFileSync((await dl.path())!));
    expect(Math.abs(s[0][0] - 283.46)).toBeLessThanOrEqual(1);
    expect(Math.abs(s[0][1] - 425.2)).toBeLessThanOrEqual(1);

    await page.locator('#opt-w').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Özel ölçü geçersiz');
  });

  test('iki dosya toplu → iki ayrı indirme', async ({ page }) => {
    await page.goto('/pdf-a4-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-orient').selectOption('portrait');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [d0] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const [d1] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="1"]').click()]);
    expect(await sizes(readFileSync((await d0.path())!))).toHaveLength(2);
    expect(await sizes(readFileSync((await d1.path())!))).toHaveLength(3);
  });

  test('bozuk.pdf → Türkçe hata, seçenekler açılmaz', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-a4-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('bozuk ya da geçerli bir PDF değil');
    await expect(page.locator('#options')).toBeHidden();
    expect(external).toEqual([]);
  });
});
