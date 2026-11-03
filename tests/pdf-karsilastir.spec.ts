import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { fx, trackExternalRequests } from './helpers';

/** uc-sayfa.pdf'in 2. sayfası yeni bir sayfayla değiştirilmiş kopyası. */
async function makeModified(): Promise<Buffer> {
  const doc = await PDFDocument.load(readFileSync(fx('uc-sayfa.pdf')));
  const font = await doc.embedFont(StandardFonts.Helvetica);
  doc.removePage(1);
  const p = doc.insertPage(1, [595.28, 841.89]);
  p.drawText('Degisen sozlesme maddesi', { x: 60, y: 760, size: 28, font, color: rgb(0.48, 0.14, 0.19) });
  p.drawRectangle({ x: 60, y: 100, width: 475, height: 600, borderColor: rgb(0.2, 0.2, 0.2), borderWidth: 2 });
  p.drawRectangle({ x: 100, y: 300, width: 200, height: 120, color: rgb(0, 0, 0.8) });
  return Buffer.from(await doc.save());
}

test.describe('PDF Karşılaştır', () => {
  test('2. sayfası değişmiş kopya → fark satırları, tablo, görsel fark, rapor; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-karsilastir/');
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop-a input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#name-a')).toContainText('3 sayfa');
    await page.locator('#drop-b input[type=file]').setInputFiles({ name: 'uc-sayfa-v2.pdf', mimeType: 'application/pdf', buffer: await makeModified() });
    await expect(page.locator('#name-b')).toContainText('3 sayfa');
    await expect(page.locator('#actions')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#summary')).toContainText('1 satır silindi, 1 satır eklendi');
    await expect(page.locator('#diff .kr-del')).toContainText('Ikinci belge - sayfa 2');
    await expect(page.locator('#diff .kr-add')).toContainText('Degisen sozlesme maddesi');
    await expect(page.locator('#diff .kr-del')).toContainText('s.2');
    await expect(page.locator('#meta-table tbody tr').first()).toContainText('Sayfa sayısı');
    await expect(page.locator('#meta-table tbody tr.is-diff').first()).toContainText('Farklı');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-report').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-ile-uc-sayfa-v2-fark-raporu.txt');
    const report = readFileSync((await dl.path())!, 'utf8');
    expect(report).toContain('Degisen sozlesme maddesi');
    expect(report).toContain('Ikinci belge - sayfa 2');

    await page.locator('#visual').click();
    await expect(page.locator('#visual-out figure')).toHaveCount(3, { timeout: 60_000 });
    await expect(page.locator('#visual-out figure').nth(0)).toContainText('görsel fark yok');
    await expect(page.locator('#visual-out figure').nth(1)).toContainText('piksel farklı');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('aynı dosya iki kez → "Fark yok"', async ({ page }) => {
    await page.goto('/pdf-karsilastir/');
    await page.locator('#drop-a input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#drop-b input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#summary')).toContainText('Fark yok');
    await expect(page.locator('#diff .kr-del')).toHaveCount(0);
    await expect(page.locator('#diff .kr-add')).toHaveCount(0);
  });

  test('bozuk.pdf ve şifreli.pdf → Türkçe, çözüm öneren hata', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-karsilastir/');
    await page.locator('#drop-a input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('bozuk ya da geçerli bir PDF değil');
    await page.locator('#drop-b input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifreli görünüyor');
    await expect(page.locator('#actions')).toBeHidden();
    expect(external).toEqual([]);
  });
});
