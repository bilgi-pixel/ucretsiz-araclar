import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

/** Tek renkli 64x64 PNG üretir. */
function solidPng(r: number, g: number, b: number): Buffer {
  const png = new PNG({ width: 64, height: 64 });
  for (let i = 0; i < 64 * 64; i++) {
    png.data[i * 4] = r; png.data[i * 4 + 1] = g; png.data[i * 4 + 2] = b; png.data[i * 4 + 3] = 255;
  }
  return PNG.sync.write(png);
}

/** GIF içindeki Grafik Kontrol Uzantısı (0x21 0xF9) sayısı ≈ kare sayısı. */
function countFrames(buf: Buffer): number {
  let n = 0;
  for (let i = 0; i < buf.length - 1; i++) if (buf[i] === 0x21 && buf[i + 1] === 0xf9) n++;
  return n;
}

/** Sayfa içinde canvas.captureStream + MediaRecorder ile ~1 sn'lik WebM üretir (base64). */
async function makeWebm(page: Page): Promise<Buffer> {
  const b64 = await page.evaluate(async () => {
    const c = document.createElement('canvas');
    c.width = 160; c.height = 120;
    const ctx = c.getContext('2d')!;
    const stream = (c as any).captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    const stopped = new Promise<void>((res) => { rec.onstop = () => res(); });
    rec.start(100);
    const t0 = performance.now();
    await new Promise<void>((res) => {
      const draw = () => {
        const t = performance.now() - t0;
        ctx.fillStyle = `hsl(${(t / 4) % 360} 90% 50%)`;
        ctx.fillRect(0, 0, 160, 120);
        ctx.fillStyle = '#fff';
        ctx.fillRect((t / 10) % 160, 40, 30, 30);
        if (t < 1100) requestAnimationFrame(draw); else res();
      };
      draw();
    });
    rec.stop();
    await stopped;
    const blob = new Blob(chunks, { type: 'video/webm' });
    const buf = new Uint8Array(await blob.arrayBuffer());
    let s = '';
    for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, Array.from(buf.subarray(i, i + 0x8000)));
    return btoa(s);
  });
  return Buffer.from(b64, 'base64');
}

test.describe('GIF Oluşturucu', () => {
  test('resimler modu: 3 PNG → GIF89a, ≥3 kare, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/gif-olustur/');
    await page.locator('#tab-resim').click();
    await expect(page.locator('#panel-resim')).toBeVisible();
    await expect(page.locator('#panel-video')).toBeHidden();

    await page.locator('#drop-img input[type=file]').setInputFiles([
      { name: 'kirmizi.png', mimeType: 'image/png', buffer: solidPng(220, 30, 30) },
      { name: 'yesil.png', mimeType: 'image/png', buffer: solidPng(30, 180, 60) },
      { name: 'mavi.png', mimeType: 'image/png', buffer: solidPng(30, 60, 220) },
    ]);
    await expect(page.locator('#files-img li')).toHaveCount(3);
    await expect(page.locator('#i-summary')).toContainText('3 kare');
    await page.locator('#i-delay').fill('200');
    await page.locator('#i-dither').check();

    await page.locator('#make-img').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('3 kare');
    await expect(page.locator('#result-info')).toContainText('64×64');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('animasyon.gif');
    const gif = readFileSync((await dl.path())!);
    expect(gif.subarray(0, 6).toString('latin1')).toBe('GIF89a');
    expect(countFrames(gif)).toBeGreaterThanOrEqual(3);
    expect(gif[gif.length - 1]).toBe(0x3b); // GIF sonlandırıcı
    await expect(page.locator('#error')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('resim sırası ok düğmeleriyle değişir, kaldırma çalışır', async ({ page }) => {
    await page.goto('/gif-olustur/#resim');
    await expect(page.locator('#panel-resim')).toBeVisible();
    await page.locator('#drop-img input[type=file]').setInputFiles([
      { name: 'a.png', mimeType: 'image/png', buffer: solidPng(255, 0, 0) },
      { name: 'b.png', mimeType: 'image/png', buffer: solidPng(0, 255, 0) },
    ]);
    await page.locator('#files-img li').nth(1).getByRole('button', { name: 'Yukarı taşı' }).click();
    await expect(page.locator('#files-img li .name').first()).toHaveText('b.png');
    await page.locator('#files-img li').nth(1).getByRole('button', { name: 'Kaldır' }).click();
    await expect(page.locator('#files-img li')).toHaveCount(1);
    await expect(page.locator('#i-summary')).toContainText('1 kare');
  });

  test('video modu: tarayıcıda üretilen 1 sn WebM → GIF iner, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/gif-olustur/');
    const webm = await makeWebm(page);
    expect(webm.length).toBeGreaterThan(1000);

    await page.locator('#drop-video input[type=file]').setInputFiles({ name: 'ekran-kaydi.webm', mimeType: 'video/webm', buffer: webm });
    await expect(page.locator('#options-video')).toBeVisible({ timeout: 20_000 });
    await expect(page.locator('#v-summary')).toContainText('fps');
    await expect(page.locator('#warn-length')).toBeHidden();
    await page.locator('#v-fps').selectOption('5');

    await page.locator('#make-video').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 45_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('ekran-kaydi.gif');
    const gif = readFileSync((await dl.path())!);
    expect(gif.subarray(0, 6).toString('latin1')).toBe('GIF89a');
    expect(countFrames(gif)).toBeGreaterThanOrEqual(2);
    await expect(page.locator('#error')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('video kutusuna PDF → çözüm öneren Türkçe hata', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/gif-olustur/');
    await page.locator('#drop-video input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('video dosyası değil');
    await expect(page.locator('#error')).toContainText('MP4');
    await expect(page.locator('#options-video')).toBeHidden();
    expect(external).toEqual([]);
  });

  test('bozuk video (video uzantılı çöp veri) → kodek hatası, öneri içerir', async ({ page }) => {
    await page.goto('/gif-olustur/');
    await page.locator('#drop-video input[type=file]').setInputFiles({ name: 'bozuk.mp4', mimeType: 'video/mp4', buffer: readFileSync(fx('bozuk.pdf')) });
    await expect(page.locator('#error')).toContainText('Video açılamadı', { timeout: 15_000 });
    await expect(page.locator('#error')).toContainText('MP4 (H.264)');
    await expect(page.locator('#options-video')).toBeHidden();
  });

  test('resim kutusuna PDF → Türkçe hata', async ({ page }) => {
    await page.goto('/gif-olustur/#resim');
    await page.locator('#drop-img input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('bir resim değil');
    await expect(page.locator('#files-img li')).toHaveCount(0);
  });

  test('sekmeler klavyeyle değişir', async ({ page }) => {
    await page.goto('/gif-olustur/');
    await page.locator('#tab-video').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-resim')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#panel-resim')).toBeVisible();
    await expect(page.locator('#tab-resim')).toBeFocused();
  });
});
