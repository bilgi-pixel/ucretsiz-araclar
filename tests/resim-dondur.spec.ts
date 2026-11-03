import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

/** Renkli (soldan sağa kırmızı→mavi) w×h PNG üretir. */
function makePng(w: number, h: number) {
  const png = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    png.data[i] = x < w / 2 ? 255 : 0; png.data[i + 1] = 0; png.data[i + 2] = x < w / 2 ? 0 : 255; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

test.describe('Resim Döndür ve Çevir', () => {
  test('90° sağa: çıktı boyutları yer değiştirir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/resim-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'sahne.png', mimeType: 'image/png', buffer: makePng(40, 20) });
    await expect(page.locator('#files li')).toHaveCount(1);
    await page.locator('#btn-right').click();
    await expect(page.locator('#state-rot')).toHaveText('90°');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('sahne-dondurulmus.png');
    const out = PNG.sync.read(readFileSync((await dl.path())!));
    expect([out.width, out.height]).toEqual([20, 40]);
    // saat yönünde 90°: sol kenardaki kırmızı üst kenara geçer
    expect(out.data[0]).toBe(255);          // (0,0) kırmızı
    expect(out.data[((39 * 20) + 0) * 4 + 2]).toBe(255); // (0,39) mavi
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yatay çevirme boyutu korur, pikselleri aynalar; serbest açı tuvali genişletir', async ({ page }) => {
    await page.goto('/resim-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'a.png', mimeType: 'image/png', buffer: makePng(40, 20) });
    await page.locator('#btn-fliph').click();
    await expect(page.locator('#btn-fliph')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#run').click();
    let [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    let out = PNG.sync.read(readFileSync((await dl.path())!));
    expect([out.width, out.height]).toEqual([40, 20]);
    expect(out.data[2]).toBe(255); // (0,0) artık mavi
    // serbest açı 30° genişlet
    await page.locator('#btn-reset').click();
    await page.locator('#opt-angle').fill('30');
    await expect(page.locator('#field-mode')).toBeVisible();
    await page.locator('#run').click();
    [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    out = PNG.sync.read(readFileSync((await dl.path())!));
    expect(out.width).toBe(Math.round(40 * Math.cos(Math.PI / 6) + 20 * Math.sin(Math.PI / 6)));
    expect(out.height).toBe(Math.round(40 * Math.sin(Math.PI / 6) + 20 * Math.cos(Math.PI / 6)));
    expect(out.data[3]).toBe(0); // köşe saydam
    // kırp modunda boyut aynı kalır
    await page.locator('#opt-mode').selectOption('crop');
    await page.locator('#run').click();
    [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    out = PNG.sync.read(readFileSync((await dl.path())!));
    expect([out.width, out.height]).toEqual([40, 20]);
  });

  test('toplu dosya zip olarak iner; JPG çıktı seçilebilir', async ({ page }) => {
    await page.goto('/resim-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles([
      { name: 'bir.png', mimeType: 'image/png', buffer: makePng(30, 10) },
      { name: 'iki.png', mimeType: 'image/png', buffer: makePng(12, 24) },
    ]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#btn-180').click();
    await page.locator('#run').click();
    await expect(page.locator('#download-zip')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(dl.suggestedFilename()).toBe('dondurulmus-resimler.zip');
    const zip = readFileSync((await dl.path())!);
    expect(zip.subarray(0, 2).toString()).toBe('PK');
    expect(zip.includes(Buffer.from('bir-dondurulmus.jpg'))).toBe(true);
  });

  test('bozuk dosya ve HEIC için Türkçe hata', async ({ page }) => {
    await page.goto('/resim-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'foto.heic', mimeType: 'image/heic', buffer: Buffer.from('x') });
    await expect(page.locator('#error')).toContainText('HEIC');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('png degil') });
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('işlenemedi');
    await expect(page.locator('#error')).toContainText('Dosya bozuk');
  });

  test('gerçek fikstür PNG döner', async ({ page }) => {
    await page.goto('/resim-dondur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#btn-left').click();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
  });
});
