import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PNG } from 'pngjs';

// 2000×1000 yatay test resmi: sol yarı kırmızı, sağ yarı mavi.
function makePng(): string {
  const png = new PNG({ width: 2000, height: 1000 });
  for (let y = 0; y < 1000; y++) for (let x = 0; x < 2000; x++) {
    const i = (y * 2000 + x) * 4;
    png.data[i] = x < 1000 ? 220 : 20; png.data[i + 1] = 40; png.data[i + 2] = x < 1000 ? 20 : 220; png.data[i + 3] = 255;
  }
  const p = join(mkdtempSync(join(tmpdir(), 'smg-')), 'yatay.png');
  writeFileSync(p, PNG.sync.write(png));
  return p;
}
const dims = (buf: Buffer) => ({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) });

async function open(page: Page) {
  await page.goto('/sosyal-medya-gorsel/');
  await page.locator('#drop input[type=file]').setInputFiles(makePng());
  await expect(page.locator('#editor')).toBeVisible();
}

test.describe('Sosyal Medya Görsel Boyutlandırıcı', () => {
  test('Instagram 1080x1080 çıktı boyutu doğru, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await page.locator('#preset').selectOption('ig-kare');
    await page.locator('#format').selectOption('png');
    await expect(page.locator('#size-info')).toContainText('1080×1080');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#run').click()]);
    expect(dl.suggestedFilename()).toBe('yatay-ig-kare-1080x1080.png');
    expect(dims(readFileSync((await dl.path())!))).toEqual({ w: 1080, h: 1080 });
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('hikaye 1080x1920 sığdır + bulanık arka plan', async ({ page }) => {
    await open(page);
    await page.locator('#preset').selectOption('ig-hikaye');
    await page.locator('#fit').selectOption('contain');
    await page.locator('#bg-mode').selectOption('blur');
    await page.locator('#format').selectOption('png');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#run').click()]);
    const buf = readFileSync((await dl.path())!);
    expect(dims(buf)).toEqual({ w: 1080, h: 1920 });
    // Üst kenar piksel: bulanık arka plandan gelir (kırmızı/mavi karışımı, beyaz değil).
    const png = PNG.sync.read(buf);
    const px = (x: number, y: number) => Array.from(png.data.subarray((y * 1080 + x) * 4, (y * 1080 + x) * 4 + 3));
    const top = px(100, 20);
    expect(top[0] > 100 || top[2] > 100).toBeTruthy();
    expect(top).not.toEqual([255, 255, 255]);
  });

  test('toplu ZIP 3 dosya içerir', async ({ page }) => {
    await open(page);
    await page.locator('#batch summary').click();
    await page.locator('#batch-active').uncheck();
    for (const id of ['ig-kare', 'yt-kucuk', 'fb-kapak']) await page.locator(`#batch-list input[value="${id}"]`).check();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#run-zip').click()]);
    expect(dl.suggestedFilename()).toBe('yatay-sosyal-medya.zip');
    const buf = readFileSync((await dl.path())!);
    // Zip sonundaki "end of central directory" kaydından dosya sayısı okunur.
    const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
    expect(buf.readUInt16LE(eocd + 10)).toBe(3);
    const text = buf.toString('latin1');
    expect(text).toContain('yatay-ig-kare-1080x1080.jpg');
    expect(text).toContain('yatay-yt-kucuk-1280x720.jpg');
    expect(text).toContain('yatay-fb-kapak-820x312.jpg');
  });

  test('resim olmayan dosyada çözüm öneren hata', async ({ page }) => {
    await page.goto('/sosyal-medya-gorsel/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu resim degil') });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#editor')).toBeHidden();
  });
});
