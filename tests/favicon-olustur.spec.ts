import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

/** Araç zip'i "stored" (level 0) yazar; yerel başlıkları okuyup girdileri çıkarır. */
function readStoredZip(buf: Buffer): Record<string, Buffer> {
  const out: Record<string, Buffer> = {};
  let p = 0;
  while (p + 30 <= buf.length && buf.readUInt32LE(p) === 0x04034b50) {
    const method = buf.readUInt16LE(p + 8);
    const size = buf.readUInt32LE(p + 18);
    const nameLen = buf.readUInt16LE(p + 26);
    const extraLen = buf.readUInt16LE(p + 28);
    const name = buf.subarray(p + 30, p + 30 + nameLen).toString('utf8');
    const start = p + 30 + nameLen + extraLen;
    if (method === 0) out[name] = buf.subarray(start, start + size);
    p = start + size;
  }
  return out;
}

const PNG_SIG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

test.describe('Favicon Oluşturucu', () => {
  test('PNG → zip iner: favicon.ico (3 girdi), 192/512 PNG, manifest; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/favicon-olustur/');
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#image-info')).toContainText('fotoğraf-ş.png');
    await expect(page.locator('#preview')).toBeVisible();
    await expect(page.locator('#prev-home')).toHaveAttribute('src', /^data:image\/png/);
    await page.locator('#site-name').fill('Bilişim Ajans');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#generate').click()]);
    expect(dl.suggestedFilename()).toBe('favicon-fotoğraf-ş.zip');
    const zbuf = readFileSync((await dl.path())!);
    expect([...zbuf.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    const files = readStoredZip(zbuf);
    const names = Object.keys(files);
    expect(names).toEqual(expect.arrayContaining([
      'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png',
      'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png',
      'android-chrome-maskable-192x192.png', 'android-chrome-maskable-512x512.png',
      'site.webmanifest', 'head-kodu.html',
    ]));

    // ICO başlığı: ayrılmış 0, tür 1, 3 girdi; girdiler 16/32/48 ve PNG gömülü
    const ico = files['favicon.ico'];
    expect([...ico.subarray(0, 6)]).toEqual([0x00, 0x00, 0x01, 0x00, 0x03, 0x00]);
    const sizes: number[] = [];
    for (let i = 0; i < 3; i++) {
      const e = 6 + i * 16;
      sizes.push(ico[e]);
      expect(ico[e]).toBe(ico[e + 1]);
      expect(ico.readUInt16LE(e + 6)).toBe(32);
      const len = ico.readUInt32LE(e + 8);
      const off = ico.readUInt32LE(e + 12);
      expect([...ico.subarray(off, off + 8)]).toEqual(PNG_SIG);
      const png = PNG.sync.read(ico.subarray(off, off + len));
      expect(png.width).toBe(ico[e]);
    }
    expect(sizes).toEqual([16, 32, 48]);

    // Android PNG'leri gerçek 192 ve 512
    for (const [name, size] of [['android-chrome-192x192.png', 192], ['android-chrome-512x512.png', 512], ['apple-touch-icon.png', 180]] as const) {
      expect([...files[name].subarray(0, 8)]).toEqual(PNG_SIG);
      const png = PNG.sync.read(files[name]);
      expect(png.width).toBe(size);
      expect(png.height).toBe(size);
    }
    const manifest = JSON.parse(files['site.webmanifest'].toString('utf8'));
    expect(manifest.name).toBe('Bilişim Ajans');
    expect(manifest.icons.some((i: any) => i.purpose === 'maskable')).toBe(true);
    expect(files['head-kodu.html'].toString('utf8')).toContain('apple-touch-icon');

    // Sonuç bloğu ve tek ICO indirme
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#code-head')).toHaveValue(/rel="manifest"/);
    const [ico2] = await Promise.all([page.waitForEvent('download'), page.locator('#download-ico').click()]);
    expect(ico2.suggestedFilename()).toBe('favicon.ico');
    expect(external).toEqual([]);
    noErrors();
  });

  test('"BA" harf logosu → ICO üretilir, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/favicon-olustur/');
    await page.getByLabel('Harf logosu', { exact: false }).check();
    await expect(page.locator('#panel-text')).toBeVisible();
    await expect(page.locator('#panel-image')).toBeHidden();
    await page.locator('#txt').fill('BA');
    await expect(page.locator('#actions')).toBeVisible();
    await page.locator('#opt-maskable').uncheck();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#generate').click()]);
    expect(dl.suggestedFilename()).toBe('favicon-ba.zip');
    const files = readStoredZip(readFileSync((await dl.path())!));
    expect(Object.keys(files)).not.toContain('android-chrome-maskable-192x192.png');
    const ico = files['favicon.ico'];
    expect([...ico.subarray(0, 6)]).toEqual([0x00, 0x00, 0x01, 0x00, 0x03, 0x00]);
    // 512 PNG'nin ortası arka plan rengi değil (harf çizilmiş), köşesi arka plan rengi (#7b2331)
    const png = PNG.sync.read(files['android-chrome-512x512.png']);
    const px = (x: number, y: number) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]]; };
    expect(px(40, 256)).toEqual([0x7b, 0x23, 0x31, 255]);
    // Orta satırda harf pikseli var (B ile A arasındaki boşluk tam merkeze denk gelebilir, satırı tara)
    const row = Array.from({ length: 512 }, (_, x) => px(x, 256));
    expect(row.every((p) => p[3] === 255)).toBe(true);
    expect(row.some((p) => p[0] !== 0x7b || p[1] !== 0x23 || p[2] !== 0x31)).toBe(true);
    expect(external).toEqual([]);
    noErrors();
  });

  test('PDF seçilince Türkçe, çözüm öneren hata; araç boş kalır', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/favicon-olustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('resim değil');
    await expect(page.locator('#error')).toContainText("PDF'den Resme");
    await expect(page.locator('#actions')).toBeHidden();

    // Yanlış uzantılı bozuk dosya
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'sahte.png', mimeType: 'image/png', buffer: readFileSync(fx('bozuk.pdf')) });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#actions')).toBeHidden();
    noErrors();
  });
});
