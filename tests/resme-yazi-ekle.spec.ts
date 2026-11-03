import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

/** Düz renkli PNG üretir. */
function solid(w: number, h: number, rgba: [number, number, number, number]) {
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h; i++) { png.data[i * 4] = rgba[0]; png.data[i * 4 + 1] = rgba[1]; png.data[i * 4 + 2] = rgba[2]; png.data[i * 4 + 3] = rgba[3]; }
  return PNG.sync.write(png);
}
const file = (name: string, buffer: Buffer) => ({ name, mimeType: 'image/png', buffer });
const read = (p: string) => PNG.sync.read(readFileSync(p));
const px = (png: PNG, x: number, y: number) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]]; };
/** Kırmızıya yakın piksellerin sınır kutusu ve sayısı. */
function redStats(png: PNG) {
  let n = 0, minX = 1e9, minY = 1e9, maxX = -1, maxY = -1;
  for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
    const [r, g, b] = px(png, x, y);
    if (r > 200 && g < 80 && b < 80) { n++; minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  }
  return { n, minX, minY, maxX, maxY };
}

async function setup(page: any, buf = solid(300, 200, [255, 255, 255, 255])) {
  await page.goto('/resme-yazi-ekle/');
  await page.locator('#drop input[type=file]').setInputFiles(file('beyaz.png', buf));
  await expect(page.locator('#files li')).toHaveCount(1);
  await page.locator('#opt-text').fill('HHHH');
  await page.locator('#opt-color').fill('#ff0000');
  await page.locator('#opt-opacity').fill('100');
}

test.describe('Resme Yazı ve Filigran Ekle', () => {
  test('ortadaki kırmızı yazı eklenir; çıktı boyutu korunur; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await setup(page);
    await page.locator('#opt-size').fill('25');
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-one').click()]);
    expect(dl.suggestedFilename()).toBe('beyaz-yazili.png');
    const png = read((await dl.path())!);
    expect(png.width).toBe(300);
    expect(png.height).toBe(200);
    const s = redStats(png);
    expect(s.n).toBeGreaterThan(100);
    expect(px(png, 0, 0)).toEqual([255, 255, 255, 255]);
    expect(s.minX).toBeGreaterThan(30);
    expect(s.maxX).toBeLessThan(270);
    expect(external).toEqual([]);
    noErrors();
  });

  test('sol üst konumu yazıyı sol üst çeyreğe koyar', async ({ page }) => {
    await setup(page);
    await page.locator('#opt-size').fill('12');
    await page.locator('#pos-grid button[aria-label="Sol üst"]').click();
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-one').click()]);
    const s = redStats(read((await dl.path())!));
    expect(s.n).toBeGreaterThan(20);
    expect(s.maxX).toBeLessThan(150);
    expect(s.maxY).toBeLessThan(100);
  });

  test('döşeme açıkken yazı resmin her yerine yayılır', async ({ page }) => {
    await setup(page);
    await page.locator('#opt-size').fill('8');
    await page.locator('#opt-tile').check();
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-one').click()]);
    const s = redStats(read((await dl.path())!));
    expect(s.minX).toBeLessThan(60);
    expect(s.maxX).toBeGreaterThan(240);
    expect(s.minY).toBeLessThan(50);
    expect(s.maxY).toBeGreaterThan(150);
  });

  test('önizlemeyi sürüklemek serbest konum verir', async ({ page }) => {
    await setup(page);
    await page.locator('#opt-size').fill('10');
    const c = page.locator('#preview-canvas');
    await c.scrollIntoViewIfNeeded();
    const box = (await c.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.85, { steps: 4 });
    await page.mouse.up();
    await expect(page.locator('#pos-grid button[aria-pressed="true"]')).toHaveCount(0);
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-one').click()]);
    const s = redStats(read((await dl.path())!));
    expect(s.minX).toBeGreaterThan(150);
    expect(s.minY).toBeGreaterThan(100);
  });

  test('yalnızca logo: mavi logo sağ alt köşeye gelir', async ({ page }) => {
    await setup(page);
    await page.locator('#opt-text').fill('');
    await page.locator('#logo-input').setInputFiles(file('logo.png', solid(20, 20, [0, 0, 255, 255])));
    await expect(page.locator('#logo-opts')).toBeVisible();
    await page.locator('#opt-logo-size').fill('20');
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-one').click()]);
    const png = read((await dl.path())!);
    expect(px(png, 280, 190)).toEqual([0, 0, 255, 255]);
    expect(px(png, 10, 10)).toEqual([255, 255, 255, 255]);
  });

  test('iki resim: aynı ayarlar uygulanır, zip iner', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/resme-yazi-ekle/');
    await page.locator('#drop input[type=file]').setInputFiles([file('a.png', solid(100, 80, [255, 255, 255, 255])), file('b.png', solid(160, 90, [0, 0, 0, 255]))]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#apply').click();
    await expect(page.locator('#result-info')).toContainText('2 resim');
    await expect(page.locator('#download-one')).toBeHidden();
    const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(zip.suggestedFilename()).toBe('yazili-resimler.zip');
    const z = readFileSync((await zip.path())!);
    expect([...z.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(z.toString('latin1')).toContain('b-yazili.jpg');
    expect(external).toEqual([]);
  });

  test('bozuk ve yanlış dosyada Türkçe, çözüm öneren hata', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resme-yazi-ekle/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: readFileSync(fx('bozuk.pdf')) });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydedin');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('Yalnızca JPG, PNG ve WebP');
    await expect(page.locator('#error')).toContainText('PDF Filigran');
    noErrors();
  });

  test('yazı ve logo yoksa uyarır; fikstür fotoğraf (Türkçe ad) işlenir', async ({ page }) => {
    await page.goto('/resme-yazi-ekle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#files li')).toHaveCount(1);
    await page.locator('#opt-text').fill('');
    await page.locator('#apply').click();
    await expect(page.locator('#error')).toContainText('Yazı alanını doldurun');
    await page.locator('#opt-text').fill('Çğıİöşü');
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-one').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş-yazili.png');
  });
});
