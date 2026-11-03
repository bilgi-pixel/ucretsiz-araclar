import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

const MM = 72 / 25.4;

async function boxes(bytes: Buffer) {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(bytes);
  return doc.getPages().map((p) => ({ crop: p.getCropBox(), media: p.getMediaBox() }));
}

test.describe('PDF Kırp', () => {
  test('mm girişi, tüm sayfalar → her sayfada CropBox daralır, MediaBox aynı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-kirp/');
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#editor')).toBeVisible();
    await expect(page.locator('#page-label')).toHaveText('Sayfa 1 / 3');
    await page.locator('#mm-top').fill('10');
    await page.locator('#mm-left').fill('20');
    await page.locator('#mm-right').fill('5');
    await page.locator('#mm-bottom').fill('15');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('3 sayfanın');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-kirpilmis.pdf');
    const out = await boxes(readFileSync((await dl.path())!));
    const orig = await boxes(readFileSync(fx('uc-sayfa.pdf')));
    expect(out).toHaveLength(3);
    out.forEach((b, i) => {
      expect(b.media).toEqual(orig[i].media); // MediaBox değişmedi
      const m = orig[i].media;
      expect(b.crop.x).toBeCloseTo(m.x + 20 * MM, 1);
      expect(b.crop.y).toBeCloseTo(m.y + 15 * MM, 1);
      expect(b.crop.width).toBeCloseTo(m.width - 25 * MM, 1);
      expect(b.crop.height).toBeCloseTo(m.height - 25 * MM, 1);
    });
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('klavye + sürükleme + sadece bu sayfa → yalnızca 2. sayfa kırpılır', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1400 });
    await page.goto('/pdf-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#editor')).toBeVisible();
    await page.locator('#next').click();
    await expect(page.locator('#page-label')).toHaveText('Sayfa 2 / 3');

    // Klavye: üst tutamaç 5 kez ok aşağı → 5 mm
    await page.locator('#crop [data-edge="top"]').focus();
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowDown');
    await expect(page.locator('#mm-top')).toHaveValue('5.0');

    // Fare: sağ tutamacı sola sürükle → sağ boşluk artar
    const h = page.locator('#crop [data-edge="right"]');
    await h.scrollIntoViewIfNeeded();
    const bb = (await h.boundingBox())!;
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await page.mouse.down();
    await page.mouse.move(bb.x - 60, bb.y + bb.height / 2, { steps: 5 });
    await page.mouse.up();
    expect(Number(await page.locator('#mm-right').inputValue())).toBeGreaterThan(5);

    await page.locator('input[name="scope"][value="one"]').check();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('1 sayfanın');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const out = await boxes(readFileSync((await dl.path())!));
    const orig = await boxes(readFileSync(fx('uc-sayfa.pdf')));
    expect(out[0].crop).toEqual(orig[0].crop);
    expect(out[2].crop).toEqual(orig[2].crop);
    expect(out[1].crop.width).toBeLessThan(orig[1].crop.width - 10);
    expect(out[1].crop.y).toBeCloseTo(orig[1].crop.y, 1); // alt boşluk 0
    expect(out[1].media).toEqual(orig[1].media);
  });

  test('değişiklik yapmadan Kırp → Türkçe uyarı; bozuk.pdf → Türkçe hata', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('bozuk ya da geçerli bir PDF değil');
    await expect(page.locator('#editor')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#editor')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Kırpma alanı sayfanın tamamı');
    expect(external).toEqual([]);
  });
});
