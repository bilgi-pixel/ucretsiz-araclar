import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PNG } from 'pngjs';

/** 800×1000: koyu masa üzerinde eğik duran beyaz "kâğıt" ve üzerinde siyah metin çizgileri. */
function makeDocumentPhoto(): string {
  const w = 800, h = 1000;
  const png = new PNG({ width: w, height: h });
  // Kâğıt dörtgeni (saat yönünde): sol üst, sağ üst, sağ alt, sol alt
  const quad = [[140, 160], [660, 120], [700, 880], [110, 900]];
  const inside = (x: number, y: number) => {
    for (let i = 0; i < 4; i++) {
      const [ax, ay] = quad[i], [bx, by] = quad[(i + 1) % 4];
      if ((bx - ax) * (y - ay) - (by - ay) * (x - ax) < 0) return false;
    }
    return true;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      let v = 70 + ((x * 7 + y * 3) % 11); // masa: koyu gri, hafif dokulu
      if (inside(x, y)) {
        v = 215 + (y % 9); // hafif sarımsı-gri kâğıt (gölge taklidi)
        // metin çizgileri: her 40 px'te 8 px kalınlığında kısa siyah bloklar
        if (y % 40 < 8 && (x % 60) < 44 && y > 200 && y < 840 && x > 200 && x < 620) v = 25;
      }
      png.data[i] = v; png.data[i + 1] = v; png.data[i + 2] = Math.max(0, v - 15); png.data[i + 3] = 255;
    }
  }
  const dir = mkdtempSync(join(tmpdir(), 'bt-'));
  const file = join(dir, 'belge-fotografi.png');
  writeFileSync(file, PNG.sync.write(png));
  return file;
}

async function addTwoPages(page: Page, doc: string) {
  await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), doc]);
  await expect(page.locator('#pages li')).toHaveCount(2);
  await expect(page.locator('#editor')).toBeVisible();
}

test.describe('Belge Tarayıcı', () => {
  test('iki fotoğraf → siyah-beyaz filtre, iki sayfalı PDF iner; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const doc = makeDocumentPhoto();
    await page.goto('/belge-tarayici/');
    await expect(page.locator('#result')).toBeHidden();
    await addTwoPages(page, doc);
    await expect(page.locator('#pages li').nth(0)).toContainText('fotoğraf-ş.png');
    await expect(page.locator('#pages li').nth(1)).toContainText('belge-fotografi.png');

    // İkinci sayfayı düzenle, siyah-beyaz filtre seç, önizlemeyi bekle
    await page.locator('#pages li').nth(1).getByRole('button', { name: 'Düzenle' }).click();
    await expect(page.locator('#editor-title')).toContainText('Sayfa 2 / 2');
    await page.locator('#opt-filter').selectOption('bw');
    await expect(page.locator('#preview-wrap')).toHaveAttribute('data-state', 'ready');
    const bw = await page.evaluate(() => {
      const cv = document.getElementById('preview') as HTMLCanvasElement;
      const d = cv.getContext('2d')!.getImageData(0, 0, cv.width, cv.height).data;
      let black = 0, white = 0, other = 0;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] === 0 && d[i + 1] === 0 && d[i + 2] === 0) black++;
        else if (d[i] === 255 && d[i + 1] === 255 && d[i + 2] === 255) white++;
        else other++;
      }
      return { w: cv.width, h: cv.height, black, white, other };
    });
    expect(bw.other).toBe(0);            // yalnızca saf siyah ve saf beyaz
    expect(bw.black).toBeGreaterThan(0); // metin çizgileri
    expect(bw.white).toBeGreaterThan(bw.black); // kâğıt zemin baskın
    expect(bw.w).toBeGreaterThan(100);

    await page.locator('#apply-all').click();
    await expect(page.locator('#apply-status')).toContainText('2 sayfaya');

    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 sayfa');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('tarama-tarama.pdf');
    const bytes = readFileSync((await dl.path())!);
    const { PDFDocument } = await import('pdf-lib');
    const pdf = await PDFDocument.load(bytes);
    expect(pdf.getPageCount()).toBe(2);
    const { width, height } = pdf.getPage(1).getSize();
    expect(Math.round(width)).toBe(595);
    expect(Math.round(height)).toBe(842);
    expect(bytes.length).toBeLessThan(2 * 1024 * 1024);
    expect(Buffer.from(bytes).includes(Buffer.from('DCTDecode'))).toBe(true); // JPEG gömülü
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('köşe tutamacı sürüklenince data-corners değişir (fare ve klavye)', async ({ page }) => {
    const doc = makeDocumentPhoto();
    await page.goto('/belge-tarayici/');
    await page.locator('#drop input[type=file]').setInputFiles(doc);
    await expect(page.locator('#pages li')).toHaveCount(1);
    const stage = page.locator('#stage');
    await expect(stage).toHaveAttribute('data-corners', '[[0,0],[800,0],[800,1000],[0,1000]]');
    const handle = page.locator('#stage .sc-handle[data-i="2"]');
    await handle.scrollIntoViewIfNeeded();
    const box = (await handle.boundingBox())!;
    const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 60, cy - 80, { steps: 6 });
    await page.mouse.up();
    const after = JSON.parse((await stage.getAttribute('data-corners'))!);
    expect(after[2][0]).toBeLessThan(800);
    expect(after[2][1]).toBeLessThan(1000);
    expect(after[0]).toEqual([0, 0]); // diğer köşeler yerinde
    // Klavye: sol üst köşe sağ ok ile %1 kayar
    await page.locator('#stage .sc-handle[data-i="0"]').focus();
    await page.keyboard.press('ArrowRight');
    const kb = JSON.parse((await stage.getAttribute('data-corners'))!);
    expect(kb[0][0]).toBe(8);
    // Sıfırla
    await page.locator('#corners-reset').click();
    await expect(stage).toHaveAttribute('data-corners', '[[0,0],[800,0],[800,1000],[0,1000]]');
  });

  test('dört köşe kâğıda yerleştirilince perspektif düzelir: önizleme köşeleri beyaz', async ({ page }) => {
    const doc = makeDocumentPhoto();
    await page.goto('/belge-tarayici/');
    await page.locator('#drop input[type=file]').setInputFiles(doc);
    await expect(page.locator('#editor')).toBeVisible();
    const canvas = page.locator('#stage-canvas');
    await canvas.scrollIntoViewIfNeeded();
    const rect = (await canvas.boundingBox())!;
    // Kâğıt köşelerinin biraz içi (fikstürdeki dörtgen: 140,160 / 660,120 / 700,880 / 110,900)
    const targets = [[160, 180], [640, 140], [680, 860], [130, 880]];
    for (let i = 0; i < 4; i++) {
      const h = page.locator(`#stage .sc-handle[data-i="${i}"]`);
      const b = (await h.boundingBox())!;
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
      await page.mouse.down();
      await page.mouse.move(rect.x + (targets[i][0] / 800) * rect.width, rect.y + (targets[i][1] / 1000) * rect.height, { steps: 5 });
      await page.mouse.up();
    }
    const corners = JSON.parse((await page.locator('#stage').getAttribute('data-corners'))!);
    expect(Math.abs(corners[1][0] - 640)).toBeLessThan(6);
    expect(Math.abs(corners[3][1] - 880)).toBeLessThan(6);
    await expect(page.locator('#preview-wrap')).toHaveAttribute('data-state', 'ready');
    const r = await page.evaluate(() => {
      const cv = document.getElementById('preview') as HTMLCanvasElement;
      const ctx = cv.getContext('2d')!;
      const px = (x: number, y: number) => ctx.getImageData(x, y, 1, 1).data[0];
      // dört köşe + kenar ortaları: masa (koyu) görünmemeli → siyah-beyazda beyaz
      const pts = [[2, 2], [cv.width - 3, 2], [cv.width - 3, cv.height - 3], [2, cv.height - 3], [cv.width >> 1, 2], [2, cv.height >> 1]];
      return { w: cv.width, h: cv.height, vals: pts.map(([x, y]) => px(x, y)) };
    });
    expect(r.vals.every((v) => v === 255)).toBe(true);
    // Kâğıt dik: en-boy oranı kaynak dörtgene yakın (~520×740)
    expect(r.h / r.w).toBeGreaterThan(1.3);
    expect(r.h / r.w).toBeLessThan(1.6);
  });

  test('JPG çıktısı: iki sayfa → ZIP iner', async ({ page }) => {
    const doc = makeDocumentPhoto();
    await page.goto('/belge-tarayici/');
    await addTwoPages(page, doc);
    await page.locator('#opt-output').selectOption('jpg');
    await expect(page.locator('#run')).toHaveText('JPG olarak indir');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('tarama-tarama.zip');
    const zip = readFileSync((await dl.path())!);
    expect(zip.subarray(0, 2).toString('latin1')).toBe('PK');
    expect(zip.includes(Buffer.from('tarama-01.jpg'))).toBe(true);
    expect(zip.includes(Buffer.from('tarama-02.jpg'))).toBe(true);
  });

  test('PDF seçilirse çözüm öneren Türkçe hata', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/belge-tarayici/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('bir PDF');
    await expect(page.locator('#error')).toContainText('PDF Küçült');
    await expect(page.locator('#editor')).toBeHidden();
    expect(external).toEqual([]);
  });

  test('resim olmayan dosya → Türkçe hata', async ({ page }) => {
    await page.goto('/belge-tarayici/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'notlar.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba') });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#error')).toContainText('JPG veya PNG');
  });
});
