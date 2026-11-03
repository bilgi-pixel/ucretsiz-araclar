import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

function solid(w: number, h: number, rgba: [number, number, number, number]) {
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h; i++) { png.data[i * 4] = rgba[0]; png.data[i * 4 + 1] = rgba[1]; png.data[i * 4 + 2] = rgba[2]; png.data[i * 4 + 3] = rgba[3]; }
  return PNG.sync.write(png);
}
const file = (name: string, buffer: Buffer) => ({ name, mimeType: 'image/png', buffer });
const read = (p: string) => PNG.sync.read(readFileSync(p));
const px = (png: PNG, x: number, y: number) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]]; };

const RED = file('kirmizi.png', solid(40, 20, [255, 0, 0, 255]));
const GREEN = file('yesil.png', solid(20, 40, [0, 255, 0, 255]));
const BLUE = file('mavi.png', solid(30, 30, [0, 0, 255, 255]));

async function open(page: any, files = [RED, GREEN, BLUE]) {
  await page.goto('/resim-birlestir/');
  await page.locator('#drop input[type=file]').setInputFiles(files);
  await expect(page.locator('#files li')).toHaveCount(files.length);
}
async function merge(page: any) {
  await page.locator('#merge').click();
  await expect(page.locator('#result')).toHaveClass(/is-active/);
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
  return { dl, png: read((await dl.path())!) as PNG };
}

test.describe('Resimleri Birleştir', () => {
  test('yan yana, yükseklik eşitle, 10 px boşluk: 90×20 çıktı ve doğru renkler; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#opt-gap').fill('10');
    await expect(page.locator('#preview-info')).toContainText('90×20');
    const { dl, png } = await merge(page);
    expect(dl.suggestedFilename()).toBe('kolaj.png');
    expect(png.width).toBe(90);
    expect(png.height).toBe(20);
    expect(px(png, 5, 5)).toEqual([255, 0, 0, 255]);
    expect(px(png, 45, 10)).toEqual([255, 255, 255, 255]);
    expect(px(png, 55, 10)).toEqual([0, 255, 0, 255]);
    expect(px(png, 80, 10)).toEqual([0, 0, 255, 255]);
    expect(external).toEqual([]);
    noErrors();
  });

  test('alt alta, genişlik eşitle: 20×90', async ({ page }) => {
    await open(page);
    await page.locator('#opt-layout').selectOption('v');
    await page.locator('#opt-gap').fill('10');
    const { png } = await merge(page);
    expect(png.width).toBe(20);
    expect(png.height).toBe(90);
    expect(px(png, 10, 5)).toEqual([255, 0, 0, 255]);
    expect(px(png, 10, 40)).toEqual([0, 255, 0, 255]);
    expect(px(png, 10, 80)).toEqual([0, 0, 255, 255]);
  });

  test('ızgara 2 sütun: 40×60, arka plan rengi boş hücrede görünür', async ({ page }) => {
    await open(page);
    await page.locator('#opt-layout').selectOption('grid');
    await page.locator('#opt-cols').fill('2');
    await page.locator('#opt-bg').fill('#ffff00');
    const { png } = await merge(page);
    expect(png.width).toBe(40);
    expect(png.height).toBe(60);
    expect(px(png, 5, 20)).toEqual([255, 0, 0, 255]); // 20×10 kırmızı, satırda ortalı
    expect(px(png, 30, 20)).toEqual([0, 255, 0, 255]);
    expect(px(png, 10, 50)).toEqual([0, 0, 255, 255]);
    expect(px(png, 35, 55)).toEqual([255, 255, 0, 255]); // boş hücre
  });

  test('eşitleme kapalı + sona hizalama; sıra değiştirme (yukarı taşı) çıktıyı etkiler', async ({ page }) => {
    await open(page, [RED, GREEN]);
    await page.locator('#opt-equal').uncheck();
    await page.locator('#opt-align').selectOption('1');
    await page.locator('#files li').nth(1).getByLabel('Yukarı taşı').click(); // yeşil önce
    const { png } = await merge(page);
    expect(png.width).toBe(60); // 20 + 40
    expect(png.height).toBe(40);
    expect(px(png, 10, 20)).toEqual([0, 255, 0, 255]);
    expect(px(png, 50, 35)).toEqual([255, 0, 0, 255]); // kırmızı altta
    expect(px(png, 50, 5)).toEqual([255, 255, 255, 255]); // üstü arka plan
  });

  test('şeffaf arka plan + JPG çıktı JPG imzası taşır', async ({ page }) => {
    await open(page, [RED, GREEN]);
    await page.locator('#opt-equal').uncheck();
    await page.locator('#opt-gap').fill('10');
    await page.locator('#opt-transparent').check();
    const { png } = await merge(page);
    expect(px(png, 45, 10)[3]).toBe(0); // boşluk şeffaf
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#merge').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('kolaj.jpg');
    expect([...readFileSync((await dl.path())!).subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]);
  });

  test('tek resimle birleştirme Türkçe uyarı verir', async ({ page }) => {
    await open(page, [RED]);
    await page.locator('#merge').click();
    await expect(page.locator('#error')).toContainText('en az iki resim');
  });

  test('bozuk dosya ve PDF için Türkçe, çözüm öneren hata', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-birlestir/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: readFileSync(fx('bozuk.pdf')) });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydedin');
    await expect(page.locator('#files li')).toHaveCount(0);
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('Yalnızca JPG, PNG ve WebP');
    noErrors();
  });

  test('büyük kolajda bellek uyarısı görünür', async ({ page }) => {
    test.setTimeout(90_000);
    const big = solid(3000, 3000, [10, 20, 30, 255]);
    await open(page, [file('b1.png', big), file('b2.png', big), file('b3.png', big), file('b4.png', big), file('b5.png', big)]);
    await expect(page.locator('#warn-memory')).toBeVisible();
    await expect(page.locator('#warn-memory')).toContainText('Bellek uyarısı');
    await page.locator('#opt-scale').selectOption('0.25');
    await expect(page.locator('#warn-memory')).toBeHidden();
  });

  test('fikstür fotoğraf (Türkçe ad) ile birleştirme', async ({ page }) => {
    await open(page, [file('fotoğraf-ş.png', readFileSync(fx('fotoğraf-ş.png'))), RED]);
    const { dl, png } = await merge(page);
    expect(dl.suggestedFilename()).toBe('kolaj.png');
    expect(png.height).toBeGreaterThan(0);
  });
});
