import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** pdf-lib ile n sayfalık PDF üretir; sayfa i, (100 + 10*i) genişliğinde olur ki sıra doğrulanabilsin. */
async function makePdf(n: number): Promise<Buffer> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  for (let i = 1; i <= n; i++) doc.addPage([200 + i * 10, 300]);
  return Buffer.from(await doc.save());
}

test.describe('PDF Sayfa Sil', () => {
  test('kutucukla 2. sayfa silinir: 3 sayfadan 2 sayfa kalır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-sayfa-sil/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#pages .pg-card canvas[data-ready="1"]')).toHaveCount(3);
    await page.locator('#pages .pg-card').nth(1).locator('input').check();
    await expect(page.locator('#summary')).toContainText('2 kalacak');
    await expect(page.locator('#summary')).toContainText('1 silinecek');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('1 sayfa silindi');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-sayfa-silindi.pdf');
    const { PDFDocument } = await import('pdf-lib');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(2);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('"2,5-7" aralığı doğru sayfaları seçer ve kalan sayfalar sırasını korur', async ({ page }) => {
    await page.goto('/pdf-sayfa-sil/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'rapor.pdf', mimeType: 'application/pdf', buffer: await makePdf(8) });
    await expect(page.locator('#pages .pg-card')).toHaveCount(8);
    await page.locator('#range-input').fill('2,5-7');
    await page.locator('#range-apply').click();
    await expect(page.locator('#pages .pg-card.is-selected')).toHaveCount(4);
    await expect(page.locator('#summary')).toContainText('4 kalacak');
    for (const i of [1, 4, 5, 6]) await expect(page.locator('#pages .pg-card').nth(i).locator('input')).toBeChecked();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(4);
    // kalan: 1, 3, 4, 8 → genişlikler 210, 230, 240, 280
    expect(doc.getPages().map((p) => Math.round(p.getWidth()))).toEqual([210, 230, 240, 280]);
  });

  test('geçersiz aralık, boş seçim ve tüm sayfaları silme için anlaşılır hata', async ({ page }) => {
    await page.goto('/pdf-sayfa-sil/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(2);
    await page.locator('#range-input').fill('abc');
    await page.locator('#range-apply').click();
    await expect(page.locator('#error')).toContainText('Geçersiz sayfa ifadesi');
    await page.locator('#range-input').fill('9-12');
    await page.locator('#range-apply').click();
    await expect(page.locator('#error')).toContainText('sayfa yok');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('işaretleyin');
    await page.locator('#sel-all').click();
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('en az bir sayfa kalmalı');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('bozuk ve şifreli PDF Türkçe, çözüm öneren hata verir; PDF olmayan dosya reddedilir', async ({ page }) => {
    await page.goto('/pdf-sayfa-sil/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('bozuk');
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifre');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('PDF dosyası değil');
  });

  test('klavyeyle seçim: Boşluk ile kutu işaretlenir, Enter ile aralık uygulanır; Temizle sıfırlar', async ({ page }) => {
    await page.goto('/pdf-sayfa-sil/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    await page.locator('#pages .pg-card').nth(0).locator('input').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#pages .pg-card').nth(0)).toHaveClass(/is-selected/);
    await page.locator('#range-input').fill('3');
    await page.locator('#range-input').press('Enter');
    await expect(page.locator('#summary')).toContainText('2 silinecek');
    await page.locator('#sel-invert').click();
    await expect(page.locator('#summary')).toContainText('1 silinecek');
    await page.locator('#clear').click();
    await expect(page.locator('#editor')).toBeHidden();
    await expect(page.locator('#pages .pg-card')).toHaveCount(0);
  });

  test('içerik: ≥900 kelime, ≥7 SSS, 3 reklam, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/pdf-sayfa-sil/');
    const words = await page.locator('.ba-content').textContent().then((t) => t!.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="pdf-sayfa-sil-${s}"]`)).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
});
