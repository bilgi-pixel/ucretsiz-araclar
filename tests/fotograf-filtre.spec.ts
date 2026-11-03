import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

/** 48×32 renkli gradyan + sabit bir (10,20,30) pikseli içeren PNG üretir. */
function makePng(): Buffer {
  const w = 48, h = 32;
  const png = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    png.data[i] = (x * 5) % 256; png.data[i + 1] = (y * 7) % 256; png.data[i + 2] = (x * y) % 256; png.data[i + 3] = 255;
  }
  const p = (0 * w + 0) * 4; // (0,0) = 10,20,30
  png.data[p] = 10; png.data[p + 1] = 20; png.data[p + 2] = 30;
  return PNG.sync.write(png);
}

async function open(page: Page) {
  await page.goto('/fotograf-filtre/');
  await page.locator('#drop input[type=file]').setInputFiles({ name: 'deneme.png', mimeType: 'image/png', buffer: makePng() });
  await expect(page.locator('#editor')).toBeVisible();
  await expect(page.locator('#view')).toHaveAttribute('data-rendered', /\d+/);
}

async function applyAndDownload(page: Page) {
  await page.locator('#run').click();
  await expect(page.locator('#result')).toHaveClass(/is-active/);
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
  return { dl, png: PNG.sync.read(readFileSync((await dl.path())!)) };
}

const pickFilter = (page: Page, value: string) => page.locator(`label:has(input[name=filter][value=${value}])`).click();

test.describe('Fotoğraf Filtreleri', () => {
  test('karakalem çıktısı gri (R=G=B)', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await pickFilter(page, 'karakalem');
    const { dl, png } = await applyAndDownload(page);
    expect(dl.suggestedFilename()).toBe('deneme-karakalem.png');
    expect(png.width).toBe(48);
    expect(png.height).toBe(32);
    let nonGray = 0;
    for (let i = 0; i < png.data.length; i += 4) if (png.data[i] !== png.data[i + 1] || png.data[i + 1] !== png.data[i + 2]) nonGray++;
    expect(nonGray).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('negatif: (10,20,30) → (245,235,225)', async ({ page }) => {
    await open(page);
    await pickFilter(page, 'negatif');
    const { png } = await applyAndDownload(page);
    expect([png.data[0], png.data[1], png.data[2], png.data[3]]).toEqual([245, 235, 225, 255]);
  });

  test('eşikli siyah-beyaz yalnızca 0 ve 255 içerir', async ({ page }) => {
    await open(page);
    await pickFilter(page, 'siyahbeyaz');
    await page.locator('#bw-mode').selectOption('esik');
    const { png } = await applyAndDownload(page);
    const values = new Set<number>();
    for (let i = 0; i < png.data.length; i += 4) { values.add(png.data[i]); values.add(png.data[i + 1]); values.add(png.data[i + 2]); }
    expect([...values].sort((a, b) => a - b)).toEqual([0, 255]);
  });

  test('bozuk dosya Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/fotograf-filtre/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydedip');
    await expect(page.locator('#editor')).toBeHidden();
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
  });
});
