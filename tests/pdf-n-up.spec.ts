import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

async function info(bytes: Buffer) {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(bytes);
  return doc.getPages().map((p) => { const s = p.getSize(); return { w: s.width, h: s.height }; });
}

async function nPagePdf(n: number): Promise<Buffer> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  for (let i = 0; i < n; i++) {
    const p = doc.addPage([595.28, 841.89]);
    p.drawText(`Sayfa ${i + 1}`, { x: 80, y: 700, size: 48 });
  }
  return Buffer.from(await doc.save());
}

test.describe('PDF N-up ve kitapçık', () => {
  test('uc-sayfa.pdf 4\'lü → 1 sayfa; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-n-up/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#preview')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('3 sayfa → 1 çıktı sayfası');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-4li.pdf');
    const pages = await info(readFileSync((await dl.path())!));
    expect(pages).toHaveLength(1);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('9 sayfalık PDF 4\'lü → 3 sayfa; 9\'lu dikey → 1 sayfa A4', async ({ page }) => {
    await page.goto('/pdf-n-up/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'dokuz.pdf', mimeType: 'application/pdf', buffer: await nPagePdf(9) });
    await expect(page.locator('#files li')).toContainText('9 sayfa');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(await info(readFileSync((await dl.path())!))).toHaveLength(3);

    await page.locator('#opt-n').selectOption('9');
    await page.locator('#opt-orient').selectOption('portrait');
    await page.locator('#opt-order').selectOption('cols');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const p2 = await info(readFileSync((await dl2.path())!));
    expect(p2).toHaveLength(1);
    expect(Math.abs(p2[0].w - 595.28)).toBeLessThanOrEqual(1);
    expect(Math.abs(p2[0].h - 841.89)).toBeLessThanOrEqual(1);
  });

  test('kitapçık: 6 sayfa → 8\'e tamamlanır, 4 yüz, yatay A4', async ({ page }) => {
    await page.goto('/pdf-n-up/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'alti.pdf', mimeType: 'application/pdf', buffer: await nPagePdf(6) });
    await page.locator('#opt-mode').selectOption('booklet');
    await expect(page.locator('#booklet-note')).toBeVisible();
    await expect(page.locator('#opt-n')).toBeDisabled();
    await expect(page.locator('#preview')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText("8'e tamamlandı → 4 yüz");
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('alti-kitapcik.pdf');
    const pages = await info(readFileSync((await dl.path())!));
    expect(pages).toHaveLength(4);
    expect(pages[0].w).toBeGreaterThan(pages[0].h); // yatay
  });

  test('bozuk.pdf → Türkçe hata, seçenekler açılmaz; çok büyük kenar boşluğu Türkçe hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-n-up/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('bozuk ya da geçerli bir PDF değil');
    await expect(page.locator('#options')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-margin').fill('200');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Kenar boşluğu kağıda göre çok büyük');
    expect(external).toEqual([]);
  });
});
