import { test, expect, Page } from '@playwright/test';
import { PNG } from 'pngjs';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

// 200x100: sol yarı kırmızı, sağ yarı mavi (sınır x=100)
function twoColorPng(): Buffer {
  const png = new PNG({ width: 200, height: 100 });
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 200; x++) {
      const i = (y * 200 + x) * 4;
      const red = x < 100;
      png.data[i] = red ? 255 : 0;
      png.data[i + 1] = 0;
      png.data[i + 2] = red ? 0 : 255;
      png.data[i + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

const px = (png: PNG, x: number, y: number) => {
  const i = (y * png.width + x) * 4;
  return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]];
};

// Tuval piksel koordinatını ekran koordinatına çevirip sürükler
async function drag(page: Page, x1: number, y1: number, x2: number, y2: number) {
  await page.locator('#canvas').evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  const box = (await page.locator('#canvas').boundingBox())!;
  const sx = box.width / 200;
  const sy = box.height / 100;
  await page.mouse.move(box.x + x1 * sx, box.y + y1 * sy);
  await page.mouse.down();
  await page.mouse.move(box.x + ((x1 + x2) / 2) * sx, box.y + ((y1 + y2) / 2) * sy);
  await page.mouse.move(box.x + x2 * sx, box.y + y2 * sy);
  await page.mouse.up();
}

test.describe('Resimde Bilgi Gizle', () => {
  test('karartma, mozaik ve bulanıklık yalnızca bölgeleri değiştirir; PNG iner', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/resim-bulaniklastir/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'iki-renk.png', mimeType: 'image/png', buffer: twoColorPng() });
    await expect(page.locator('#editor')).toBeVisible();
    await expect(page.locator('#canvas-info')).toContainText('200×100');

    // 1) karartma: kırmızı alanda
    await page.locator('[data-tool=black]').click();
    await drag(page, 10, 10, 40, 40);
    // 2) mozaik: sınırı kapsayan bölge, blok 40
    await page.locator('[data-tool=pixel]').click();
    await page.locator('#opt-block').fill('40');
    await drag(page, 70, 30, 130, 70);
    // 3) bulanık: sınırı kapsayan başka bir bölge
    await page.locator('[data-tool=blur]').click();
    await drag(page, 80, 75, 120, 95);
    await expect(page.locator('#regions li')).toHaveCount(3);

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('iki-renk-gizli.png');
    const out = PNG.sync.read(readFileSync((await dl.path())!));
    expect([out.width, out.height]).toEqual([200, 100]);

    expect(px(out, 20, 20).slice(0, 3)).toEqual([0, 0, 0]); // karartıldı
    const mosaic = px(out, 95, 50);
    expect(mosaic.slice(0, 3)).not.toEqual([255, 0, 0]); // mozaik karıştırdı
    const blur = px(out, 99, 85);
    expect(blur.slice(0, 3)).not.toEqual([255, 0, 0]); // bulanık karıştırdı
    // bölge dışı aynı
    expect(px(out, 5, 90)).toEqual([255, 0, 0, 255]);
    expect(px(out, 190, 5)).toEqual([0, 0, 255, 255]);
    expect(px(out, 60, 20)).toEqual([255, 0, 0, 255]);
    expect(px(out, 150, 50)).toEqual([0, 0, 255, 255]);

    // geri al: son (bulanık) işlem kalkar
    await page.locator('#undo').click();
    await expect(page.locator('#regions li')).toHaveCount(2);
    // listeden sil: karartma kalkınca piksel yeniden kırmızı olur
    await page.locator('#regions li').first().locator('button').click();
    await expect(page.locator('#regions li')).toHaveCount(1);
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const out2 = PNG.sync.read(readFileSync((await dl2.path())!));
    expect(px(out2, 20, 20)).toEqual([255, 0, 0, 255]);
    expect(px(out2, 99, 85)).toEqual([255, 0, 0, 255]);

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('pano yapıştırma (paste olayı) resmi yükler; ok ve metin eklenir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/resim-bulaniklastir/');
    const b64 = twoColorPng().toString('base64');
    await page.evaluate((data) => {
      const bin = atob(data);
      const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
      const file = new File([bytes], 'image.png', { type: 'image/png' });
      const dt = new DataTransfer();
      dt.items.add(file);
      document.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
    }, b64);
    await expect(page.locator('#editor')).toBeVisible();
    await expect(page.locator('#canvas-info')).toContainText('200×100');

    await page.locator('[data-tool=arrow]').click();
    await drag(page, 20, 20, 90, 60);
    await page.locator('[data-tool=text]').click();
    await page.locator('#opt-text').fill('Burası');
    const box = (await page.locator('#canvas').boundingBox())!;
    await page.mouse.click(box.x + box.width * 0.6, box.y + box.height * 0.2);
    await expect(page.locator('#regions li')).toHaveCount(2);
    await expect(page.locator('#regions li').nth(0)).toContainText('Ok');
    await expect(page.locator('#regions li').nth(1)).toContainText('Metin');
    // sağ üst bölgede çizim izi var
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('yapistirilan-resim-gizli.png');
    const out = PNG.sync.read(readFileSync((await dl.path())!));
    let changed = 0;
    for (let y = 10; y < 70; y++) for (let x = 15; x < 95; x++) { if (px(out, x, y).join() !== '255,0,0,255') changed++; }
    expect(changed).toBeGreaterThan(20);
    expect(external).toEqual([]);
  });

  test('bozuk dosya anlaşılır Türkçe hata verir', async ({ page }) => {
    await page.goto('/resim-bulaniklastir/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#error')).toContainText('JPG, PNG veya WebP');
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('açılamadı');
  });
});
