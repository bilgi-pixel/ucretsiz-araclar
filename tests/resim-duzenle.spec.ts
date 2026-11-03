import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

// 200×100 renkli deneme resmi (kanallar farklı, kırpmaya girmeyecek aralıkta).
function makePng() {
  const w = 200, h = 100;
  const png = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    png.data[i] = 40 + Math.floor(x / 2); png.data[i + 1] = 60; png.data[i + 2] = 90 + Math.floor(y / 2); png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}
const buffer = makePng();
const src = PNG.sync.read(buffer);
const mean = (d: Uint8Array | Buffer) => { let s = 0, n = 0; for (let i = 0; i < d.length; i += 4) { s += d[i] + d[i + 1] + d[i + 2]; n += 3; } return s / n; };
const input = { name: 'foto.png', mimeType: 'image/png', buffer };

test.describe('Online Resim Düzenleyici', () => {
  test('parlaklık +50: ortalama piksel artar, boyut korunur, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(input);
    await expect(page.locator('#editor')).toBeVisible();
    await page.locator('#opt-format').selectOption('png');
    await page.locator('#f-brightness').fill('50');
    await expect(page.locator('#o-brightness')).toHaveText('50');
    // Önizleme canvas'ı da değişmeli
    await page.waitForTimeout(200);
    const prevMean = await page.evaluate(() => {
      const c = document.getElementById('view') as HTMLCanvasElement;
      const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
      let s = 0, n = 0; for (let i = 0; i < d.length; i += 4) { s += d[i] + d[i + 1] + d[i + 2]; n += 3; } return s / n;
    });
    expect(prevMean).toBeGreaterThan(mean(src.data) + 20);
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('foto-duzenlendi.png');
    const out = PNG.sync.read(readFileSync((await dl.path())!));
    expect([out.width, out.height]).toEqual([200, 100]);
    expect(mean(out.data)).toBeGreaterThan(mean(src.data) + 20);
    expect(external).toEqual([]);
    noErrors();
  });

  test('gri tonlama: R=G=B; sıfırla özgün pikselleri geri getirir', async ({ page }) => {
    await page.goto('/resim-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(input);
    await page.locator('#opt-format').selectOption('png');
    await page.locator('#f-gray').check();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const out = PNG.sync.read(readFileSync((await dl.path())!));
    for (const [x, y] of [[0, 0], [50, 20], [199, 99], [100, 50]]) {
      const i = (y * 200 + x) * 4;
      expect(out.data[i]).toBe(out.data[i + 1]);
      expect(out.data[i + 1]).toBe(out.data[i + 2]);
    }
    // Sıfırla + kaydet → özgün resimle aynı
    await page.locator('#reset').click();
    await expect(page.locator('#f-gray')).not.toBeChecked();
    await page.locator('#run').click();
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const out2 = PNG.sync.read(readFileSync((await dl2.path())!));
    expect([...out2.data.subarray(0, 8)]).toEqual([...src.data.subarray(0, 8)]);
  });

  test('basılı tutunca orijinal gösterilir', async ({ page }) => {
    await page.goto('/resim-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(input);
    await page.locator('#f-invert').check();
    const px = () => page.evaluate(() => {
      const c = document.getElementById('view') as HTMLCanvasElement;
      return Array.from(c.getContext('2d')!.getImageData(0, 0, 1, 1).data);
    });
    await page.waitForTimeout(200);
    const inverted = await px();
    await page.locator('#compare').hover({ position: { x: 5, y: 5 } });
    
    await page.mouse.down();
    await page.waitForTimeout(200);
    const orig = await px();
    await page.mouse.up();
    await page.waitForTimeout(200);
    expect(orig.slice(0, 3)).toEqual([40, 60, 90]);
    expect(inverted.slice(0, 3)).toEqual([215, 195, 165]);
    expect((await px()).slice(0, 3)).toEqual([215, 195, 165]);
  });

  test('bozuk dosya: Türkçe, çözüm öneren hata', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydedip');
    await expect(page.locator('#editor')).toBeHidden();
    noErrors();
  });
});
