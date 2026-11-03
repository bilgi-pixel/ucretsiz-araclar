import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Bulanık (yumuşak geçişli) dikey kenarlı 200x120 gri tonlu PNG: sol 80, sağ 170.
function blurryEdgePng(): Buffer {
  const png = new PNG({ width: 200, height: 120 });
  for (let y = 0; y < 120; y++) {
    for (let x = 0; x < 200; x++) {
      const t = Math.min(1, Math.max(0, (x - 92) / 16));
      const s = t * t * (3 - 2 * t); // yumuşak geçiş
      const v = Math.round(80 + 90 * s);
      const i = (y * 200 + x) * 4;
      png.data[i] = png.data[i + 1] = png.data[i + 2] = v;
      png.data[i + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

const work = mkdtempSync(join(tmpdir(), 'netlestir-'));
const edgeFile = join(work, 'bulanik-kenar.png');
writeFileSync(edgeFile, blurryEdgePng());

/** Orta satırdaki en küçük/en büyük parlaklık ve komşu pikseller arası en büyük sıçrama. */
function rowStats(buf: Buffer) {
  const png = PNG.sync.read(buf);
  const y = Math.floor(png.height / 2);
  let min = 255, max = 0, maxStep = 0, prev = -1;
  for (let x = 0; x < png.width; x++) {
    const v = png.data[(y * png.width + x) * 4];
    min = Math.min(min, v); max = Math.max(max, v);
    if (prev >= 0) maxStep = Math.max(maxStep, Math.abs(v - prev));
    prev = v;
  }
  return { width: png.width, height: png.height, min, max, maxStep };
}

test.describe('Fotoğraf Netleştirme ve Büyütme', () => {
  test('netleştirme kenar kontrastını artırır, PNG iner, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/fotograf-netlestir/');
    await expect(page.locator('#workspace')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(edgeFile);
    await expect(page.locator('#workspace')).toBeVisible();
    await expect(page.locator('#c-after')).toHaveAttribute('data-ready', '1');

    const before = rowStats(readFileSync(edgeFile));
    expect(before.min).toBe(80);
    expect(before.max).toBe(170);

    await page.locator('#opt-amount').fill('250');
    await page.locator('#opt-radius').fill('2');
    await page.locator('#opt-threshold').fill('0');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('bulanik-kenar-netlesmis.png');
    const after = rowStats(readFileSync((await dl.path())!));
    expect(after.width).toBe(200);
    expect(after.height).toBe(120);
    // Kenarda taşma (overshoot) ve daha dik geçiş
    expect(after.max).toBeGreaterThan(before.max + 5);
    expect(after.min).toBeLessThan(before.min - 5);
    expect(after.maxStep).toBeGreaterThan(before.maxStep);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('2x büyütme çıktı boyutunu iki katına çıkarır; gürültü azaltma ve kontrast çalışır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/fotograf-netlestir/');
    await page.locator('#drop input[type=file]').setInputFiles(edgeFile);
    await expect(page.locator('#c-after')).toHaveAttribute('data-ready', '1');
    await page.locator('#opt-scale').selectOption('2');
    await expect(page.locator('#size-info')).toContainText('400 × 240');
    await page.locator('#opt-denoise').selectOption('median');
    await page.locator('#opt-contrast').check();
    await page.locator('#opt-format').selectOption('jpg');
    await expect(page.locator('#field-quality')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result')).toHaveAttribute('data-w', '400');
    await expect(page.locator('#result')).toHaveAttribute('data-h', '240');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('bulanik-kenar-netlesmis.jpg');
    const head = readFileSync((await dl.path())!).subarray(0, 3);
    expect(Array.from(head)).toEqual([0xff, 0xd8, 0xff]);
    expect(errors).toEqual([]);
  });

  test('bilateral filtre ve 2x PNG gerçekten 400x240 çıkar', async ({ page }) => {
    await page.goto('/fotograf-netlestir/');
    await page.locator('#drop input[type=file]').setInputFiles(edgeFile);
    await expect(page.locator('#c-after')).toHaveAttribute('data-ready', '1');
    await page.locator('#opt-scale').selectOption('2');
    await page.locator('#opt-denoise').selectOption('bilateral-light');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const s = rowStats(readFileSync((await dl.path())!));
    expect(s.width).toBe(400);
    expect(s.height).toBe(240);
  });

  test('önce/sonra kaydırıcısı klavye ile çalışır', async ({ page }) => {
    await page.goto('/fotograf-netlestir/');
    await page.locator('#drop input[type=file]').setInputFiles(edgeFile);
    await expect(page.locator('#workspace')).toBeVisible();
    await page.locator('#cmp-range').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#cmp-range')).toHaveValue('51');
    await expect(page.locator('#cmp')).toHaveAttribute('style', /--pos: 51%/);
  });

  test('bozuk dosya Türkçe, çözüm öneren hata verir', async ({ page }) => {
    const bad = join(work, 'bozuk.png');
    writeFileSync(bad, Buffer.from('bu bir resim degil'));
    await page.goto('/fotograf-netlestir/');
    await page.locator('#drop input[type=file]').setInputFiles(bad);
    await expect(page.locator('#error')).toContainText('Resim açılamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydedip');
    await expect(page.locator('#workspace')).toBeHidden();
    const txt = join(work, 'not.txt');
    writeFileSync(txt, 'merhaba');
    await page.locator('#drop input[type=file]').setInputFiles(txt);
    await expect(page.locator('#error')).toContainText('bir resim değil');
  });
});
