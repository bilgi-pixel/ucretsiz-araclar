import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PNG } from 'pngjs';

/** Test için 800×1000 gradyanlı sahte portre PNG üretir (gerçekçi JPEG boyutu için). */
function makePortrait(): string {
  const w = 800, h = 1000;
  const png = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      // Açık gri arka plan + ortada ten rengi oval "yüz"
      const dx = (x - w / 2) / 220, dy = (y - h * 0.42) / 300;
      const face = dx * dx + dy * dy < 1;
      png.data[i] = face ? 225 : 235 + (x % 7);
      png.data[i + 1] = face ? 180 : 235 + (y % 5);
      png.data[i + 2] = face ? 150 : 238;
      png.data[i + 3] = 255;
    }
  }
  const dir = mkdtempSync(join(tmpdir(), 'bf-'));
  const file = join(dir, 'portre.png');
  writeFileSync(file, PNG.sync.write(png));
  return file;
}

function jpegSize(buf: Buffer): { w: number; h: number } {
  // SOF0/SOF2 işaretçisini bul: FF C0 / FF C2
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  throw new Error('SOF yok');
}

test.describe('Biyometrik Fotoğraf Oluşturucu', () => {
  test('fotoğraf-ş.png → 591×709 JPEG, ≤ 50 KB, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/biyometrik-fotograf/');
    await expect(page.locator('#workspace')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#workspace')).toBeVisible();
    await expect(page.locator('#file-info')).toContainText('fotoğraf-ş.png');
    await page.locator('#make').click();
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#out-info')).toContainText('591×709 px');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('biyometrik-50x60-fotoğraf-ş.jpg');
    const buf = readFileSync((await dl.path())!);
    expect(buf[0]).toBe(0xff); expect(buf[1]).toBe(0xd8); // JPEG SOI
    expect(jpegSize(buf)).toEqual({ w: 591, h: 709 });
    expect(buf.length).toBeLessThanOrEqual(50 * 1024);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('büyük portre: 50 KB hedefi, Schengen ölçüsü ve A4 baskı PDF', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/biyometrik-fotograf/');
    await page.locator('#drop input[type=file]').setInputFiles(makePortrait());
    await expect(page.locator('#workspace')).toBeVisible();
    // Klavye ile çerçeveyi taşı (hata vermemeli)
    await page.locator('#editor').focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('+');
    await page.locator('#make').click();
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '1');
    const bytes = Number(await page.locator('#out-info').getAttribute('data-bytes'));
    expect(bytes).toBeGreaterThan(0);
    expect(bytes).toBeLessThanOrEqual(50 * 1024);

    // Ölçü değişince sonuç sıfırlanır; yeniden üret
    await page.locator('#preset').selectOption('schengen');
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '0');
    await page.locator('#make').click();
    await expect(page.locator('#out-info')).toContainText('413×531 px');

    // A4'e 8 adet PDF
    await page.locator('#sheet-paper').selectOption('a4');
    await page.locator('#sheet-count').selectOption('8');
    const [pdf] = await Promise.all([page.waitForEvent('download'), page.locator('#sheet-pdf').click()]);
    expect(pdf.suggestedFilename()).toBe('baski-A4-schengen-35x45.pdf');
    const head = readFileSync((await pdf.path())!).subarray(0, 5).toString('latin1');
    expect(head).toBe('%PDF-');
    await expect(page.locator('#error')).toBeHidden();

    // 10×15'e 8 adet 50×60 sığmaz: dürüst uyarı, yine de 4'lük JPEG iner
    await page.locator('#preset').selectOption('tr');
    await page.locator('#make').click();
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '1');
    await page.locator('#sheet-paper').selectOption('10x15');
    const [jpg] = await Promise.all([page.waitForEvent('download'), page.locator('#sheet-jpg').click()]);
    expect(jpg.suggestedFilename()).toBe('baski-1015cm-biyometrik-50x60.jpg');
    await expect(page.locator('#error')).toContainText('en fazla 4 adet');
    expect(external).toEqual([]);
  });

  test('resim olmayan dosya (bozuk.pdf) Türkçe hata verir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/biyometrik-fotograf/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('bir fotoğraf değil');
    await expect(page.locator('#error')).toContainText('JPG, PNG veya WebP');
    await expect(page.locator('#workspace')).toBeHidden();
    expect(errors).toEqual([]);
  });

  test('reklam alanı buton yanında değil, rozet satırı ve logo var', async ({ page }) => {
    await page.goto('/biyometrik-fotograf/');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    await expect(page.locator('.ba-faq details')).toHaveCount(9);
  });
});
