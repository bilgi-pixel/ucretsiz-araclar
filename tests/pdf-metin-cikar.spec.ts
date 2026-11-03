import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

/** Yalnızca PNG gömülü, metin katmanı olmayan tek sayfalık PDF (taranmış belge taklidi). */
async function makeImageOnlyPdf(): Promise<Buffer> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  const png = await doc.embedPng(readFileSync(fx('fotoğraf-ş.png')));
  const page = doc.addPage([595, 842]);
  page.drawImage(png, { x: 40, y: 40, width: 515, height: 760 });
  return Buffer.from(await doc.save());
}

test.describe('PDF\'den Metin Çıkar', () => {
  test('3 sayfalık PDF → metin, sayfa ayırıcı, sayım; TXT (BOM) ve DOCX iner; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-metin-cikar/');
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const out = await page.locator('#output').inputValue();
    // make-fixtures.mjs: "Ikinci belge - sayfa N"
    expect(out).toContain('Ikinci belge - sayfa 1');
    expect(out).toContain('Ikinci belge - sayfa 3');
    expect(out).toContain('--- Sayfa 2 ---');
    await expect(page.locator('#result-info')).toContainText('3 sayfa');
    await expect(page.locator('#result-info')).toContainText('kelime');

    const [txt] = await Promise.all([page.waitForEvent('download'), page.locator('#download-txt').click()]);
    expect(txt.suggestedFilename()).toBe('uc-sayfa.txt');
    const txtBytes = readFileSync((await txt.path())!);
    expect(Array.from(txtBytes.subarray(0, 3))).toEqual([0xef, 0xbb, 0xbf]); // UTF-8 BOM
    expect(txtBytes.toString('utf8')).toContain('Ikinci belge - sayfa 2');

    const [docx] = await Promise.all([page.waitForEvent('download'), page.locator('#download-docx').click()]);
    expect(docx.suggestedFilename()).toBe('uc-sayfa.docx');
    const docxBytes = readFileSync((await docx.path())!);
    expect(Array.from(docxBytes.subarray(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(docxBytes.toString('latin1')).toContain('word/document.xml');

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('sayfa aralığı ve ayırıcısız düzen', async ({ page }) => {
    await page.goto('/pdf-metin-cikar/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await page.locator('#opt-range').fill('2');
    await page.locator('#opt-sep').uncheck();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const out = await page.locator('#output').inputValue();
    expect(out).toContain('Ikinci belge - sayfa 2');
    expect(out).not.toContain('sayfa 1');
    expect(out).not.toContain('--- Sayfa');
    await expect(page.locator('#result-info')).toContainText('1 sayfa');
    // geçersiz aralık → anlaşılır hata
    await page.locator('#opt-range').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Geçersiz sayfa ifadesi');
  });

  test('metinsiz (resim) PDF → OCR yönlendirmesi', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-metin-cikar/');
    const pdf = await makeImageOnlyPdf();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'tarama.pdf', mimeType: 'application/pdf', buffer: pdf });
    await expect(page.locator('#files li')).toContainText('1 sayfa');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('OCR', { timeout: 30_000 });
    await expect(page.locator('#error')).toContainText('Resimden Yazıya');
    await expect(page.locator('#ocr-hint')).toBeVisible();
    await expect(page.locator('#ocr-hint a')).toHaveAttribute('href', '../resimden-yaziya/');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    expect(external).toEqual([]);
  });

  test('bozuk, şifreli ve PDF olmayan dosya → çözüm öneren Türkçe hata', async ({ page }) => {
    await page.goto('/pdf-metin-cikar/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF değil/);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifreli');
    await expect(page.locator('#error')).toContainText('şifresini kaldırıp');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
  });

  test('sayfa yapısı: rozet, reklam buton yanında değil, SSS ve içerik yeterli', async ({ page }) => {
    await page.goto('/pdf-metin-cikar/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-related a[href="../resimden-yaziya/"]')).toHaveCount(1);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
