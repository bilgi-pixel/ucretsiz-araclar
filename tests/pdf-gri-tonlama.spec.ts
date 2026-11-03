import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

/** Çıktının ilk sayfasını pdf.js ile çizip renk doygunluğu en büyük piksel farkını ve benzersiz değer sayısını verir. */
async function analyze(page: import('@playwright/test').Page, bytes: Buffer) {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const d = await pdfjs.getDocument({ data }).promise;
    const p = await d.getPage(1);
    const vp = p.getViewport({ scale: 1 });
    const c = document.createElement('canvas'); c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
    const ctx = c.getContext('2d')!;
    await p.render({ canvasContext: ctx, viewport: vp }).promise;
    const px = ctx.getImageData(0, 0, c.width, c.height).data;
    let maxDiff = 0; const levels = new Set<number>();
    for (let i = 0; i < px.length; i += 4) {
      maxDiff = Math.max(maxDiff, Math.abs(px[i] - px[i + 1]), Math.abs(px[i + 1] - px[i + 2]));
      levels.add(Math.round(px[i] / 32));
    }
    const text = (await p.getTextContent()).items.length;
    return { maxDiff, levels: levels.size, text };
  }, bytes.toString('base64'));
}

test.describe('PDF Gri Tonlama', () => {
  test('iki-sayfa.pdf → 2 sayfalı gri çıktı, metin seçilemez; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-gri-tonlama/');
    await expect(page.locator('#actions')).toBeHidden();
    await expect(page.locator('.ba-note').first()).toContainText('metni seçilemez');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('2 sayfa');
    await page.locator('#opt-dpi').selectOption('100');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    await expect(page.locator('#result-info')).toContainText('2 sayfa');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('iki-sayfa-gri.pdf');
    const out = readFileSync((await dl.path())!);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(2);
    const dump = doc.context.enumerateIndirectObjects().map(([, o]) => o.toString()).join('\n');
    expect(dump).toMatch(/\/Subtype\s*\/Image/);
    const a = await analyze(page, out);
    expect(a.text).toBe(0);
    expect(a.maxDiff).toBeLessThanOrEqual(3); // renk kanalları (JPEG toleransı içinde) eşit
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('siyah-beyaz mod: eşik kaydırıcısı görünür, çıktı neredeyse yalnız iki ton', async ({ page }) => {
    await page.goto('/pdf-gri-tonlama/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#field-threshold')).toBeHidden();
    await page.locator('#opt-mode').selectOption('bw');
    await expect(page.locator('#field-threshold')).toBeVisible();
    await page.locator('#opt-dpi').selectOption('100');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 45_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('iki-sayfa-siyah-beyaz.pdf');
    const out = readFileSync((await dl.path())!);
    const a = await analyze(page, out);
    expect(a.maxDiff).toBeLessThanOrEqual(3);
    expect(a.levels).toBeLessThanOrEqual(9);
  });

  test('bozuk, şifreli ve PDF olmayan dosya → çözüm öneren Türkçe hata', async ({ page }) => {
    await page.goto('/pdf-gri-tonlama/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF değil/);
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifreli');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
  });

  test('sayfa yapısı: rozet, reklam araç kutusunda değil, SSS ve içerik yeterli', async ({ page }) => {
    await page.goto('/pdf-gri-tonlama/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
