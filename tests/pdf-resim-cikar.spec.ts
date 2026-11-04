import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** pngjs ile w x h düz renkli PNG üretir. */
async function makePng(w: number, h: number, rgb: [number, number, number]): Promise<Buffer> {
  const { PNG } = await import('pngjs');
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h; i++) { png.data[i * 4] = rgb[0]; png.data[i * 4 + 1] = rgb[1]; png.data[i * 4 + 2] = rgb[2]; png.data[i * 4 + 3] = 255; }
  return PNG.sync.write(png);
}

/** İki sayfa: 1. sayfada 80x60 ve 8x8 resim, 2. sayfada 64x64 resim. */
async function makePdf(): Promise<Buffer> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  const big = await doc.embedPng(await makePng(80, 60, [200, 30, 30]));
  const tiny = await doc.embedPng(await makePng(8, 8, [0, 0, 0]));
  const third = await doc.embedPng(await makePng(64, 64, [30, 30, 200]));
  const p1 = doc.addPage([300, 300]);
  p1.drawImage(big, { x: 20, y: 150, width: 160, height: 120 });
  p1.drawImage(tiny, { x: 200, y: 20, width: 16, height: 16 });
  const p2 = doc.addPage([300, 300]);
  p2.drawImage(third, { x: 20, y: 150, width: 128, height: 128 });
  return Buffer.from(await doc.save());
}

test.describe("PDF'ten Resim Çıkar", () => {
  test('3 resimli PDF: küçük resim elenir, 2 resim çıkar ve ZIP indirilir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-resim-cikar/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'katalog.pdf', mimeType: 'application/pdf', buffer: await makePdf() });
    await expect(page.locator('#files li')).toContainText('2 sayfa');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30000 });
    await expect(page.locator('#gallery li')).toHaveCount(2);
    await expect(page.locator('#result-info')).toContainText('2 resim');
    await expect(page.locator('#result-info')).toContainText('1 küçük resim atlandı');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#zip-btn').click()]);
    expect(dl.suggestedFilename()).toBe('katalog-resimler.zip');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 2).toString()).toBe('PK');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tek resim PNG olarak indirilir ve boyutu 80x60 olur', async ({ page }) => {
    await page.goto('/pdf-resim-cikar/');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.create();
    const img = await doc.embedPng(await makePng(80, 60, [10, 120, 10]));
    doc.addPage([200, 200]).drawImage(img, { x: 10, y: 10, width: 160, height: 120 });
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'tek.pdf', mimeType: 'application/pdf', buffer: Buffer.from(await doc.save()) });
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30000 });
    await expect(page.locator('#gallery li')).toHaveCount(1);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#single-btn').click()]);
    expect(dl.suggestedFilename()).toBe('tek-sayfa-1-resim-1.png');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(1, 4).toString()).toBe('PNG');
    expect(buf.readUInt32BE(16)).toBe(80);
    expect(buf.readUInt32BE(20)).toBe(60);
  });

  test('"Küçük resimleri de al" ile 8x8 resim de çıkar (3 resim)', async ({ page }) => {
    await page.goto('/pdf-resim-cikar/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'katalog.pdf', mimeType: 'application/pdf', buffer: await makePdf() });
    await page.locator('#opt-min').selectOption('0');
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#run').click();
    await expect(page.locator('#gallery li')).toHaveCount(3, { timeout: 30000 });
  });

  test('resimsiz PDF için çözüm öneren Türkçe hata', async ({ page }) => {
    await page.goto('/pdf-resim-cikar/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('gömülü resim bulunamadı', { timeout: 30000 });
    await expect(page.locator('#error')).toContainText("PDF'den Resme");
  });

  test('bozuk ve şifreli PDF için Türkçe hata', async ({ page }) => {
    await page.goto('/pdf-resim-cikar/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).not.toBeEmpty({ timeout: 15000 });
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifre/i, { timeout: 15000 });
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam, SSS ≥7, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/pdf-resim-cikar/');
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad[data-slot^="pdf-resim-cikar-"]')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
  });
});
