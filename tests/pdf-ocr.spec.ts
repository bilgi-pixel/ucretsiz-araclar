import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import { fx, trackExternalRequests } from './helpers';

/*
 * Taranmış PDF fikstürü Node'da üretilir (canvas yok): çizgi tabanlı basit bir yazı tipiyle
 * "MERHABA DÜNYA" büyük harflerle PNG'ye çizilir, sonra pdf-lib ile bir PDF sayfasına gömülür.
 * Sayfada hiç metin yoktur; bu yüzden tarama gibi davranır.
 */
const GLYPHS: Record<string, number[][][]> = {
  M: [[[0, 10], [0, 0], [3, 6], [6, 0], [6, 10]]],
  E: [[[6, 0], [0, 0], [0, 10], [6, 10]], [[0, 5], [5, 5]]],
  R: [[[0, 10], [0, 0], [4, 0], [5.4, 0.8], [5.9, 2.5], [5.4, 4.2], [4, 5], [0, 5]], [[3, 5], [6, 10]]],
  H: [[[0, 0], [0, 10]], [[6, 0], [6, 10]], [[0, 5], [6, 5]]],
  A: [[[0, 10], [3, 0], [6, 10]], [[1, 6.5], [5, 6.5]]],
  B: [[[0, 0], [0, 10]], [[0, 0], [4, 0], [5.4, 0.9], [5.8, 2.5], [5.4, 4.1], [4, 5], [0, 5]], [[4, 5], [5.5, 5.9], [6, 7.5], [5.5, 9.1], [4, 10], [0, 10]]],
  D: [[[0, 0], [0, 10], [3.5, 10], [5.3, 9], [6, 7], [6, 3], [5.3, 1], [3.5, 0], [0, 0]]],
  U: [[[0, 0], [0, 7], [1, 9], [3, 10], [5, 9], [6, 7], [6, 0]]],
  N: [[[0, 10], [0, 0], [6, 10], [6, 0]]],
  Y: [[[0, 0], [3, 5], [6, 0]], [[3, 5], [3, 10]]],
  'Ü': [[[0, 0], [0, 7], [1, 9], [3, 10], [5, 9], [6, 7], [6, 0]], [[1.4, -2.6], [1.5, -2.6]], [[4.5, -2.6], [4.6, -2.6]]],
};

function segDist(px: number, py: number, a: number[], b: number[]) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  let t = l2 ? ((px - a[0]) * dx + (py - a[1]) * dy) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy));
}

/** Beyaz zemin üzerine siyah, kenarları yumuşatılmış büyük yazı üretir. */
function makeTextPng(text = 'MERHABA DÜNYA') {
  const unit = 14, stroke = 8, pad = 60, advance = 9, spaceAdv = 6;
  const items: { gl: number[][][]; x: number }[] = [];
  let x = 0;
  for (const ch of text) {
    if (ch === ' ') { x += spaceAdv; continue; }
    items.push({ gl: GLYPHS[ch], x });
    x += advance;
  }
  const top = 3.5 * unit;
  const w = Math.round((x - 3) * unit + pad * 2);
  const h = Math.round(10 * unit + top + pad * 2);
  const png = new PNG({ width: w, height: h });
  png.data.fill(255);
  const segs: number[][][] = [];
  for (const it of items) {
    for (const line of it.gl) {
      for (let i = 0; i < Math.max(1, line.length - 1); i++) {
        const a = line[i], b = line[i + 1] || line[i];
        segs.push([[pad + (it.x + a[0]) * unit, pad + top + a[1] * unit], [pad + (it.x + b[0]) * unit, pad + top + b[1] * unit]]);
      }
    }
  }
  for (let y = 0; y < h; y++) {
    for (let xx = 0; xx < w; xx++) {
      let d = 1e9;
      for (const [a, b] of segs) {
        if (xx < Math.min(a[0], b[0]) - stroke - 2 || xx > Math.max(a[0], b[0]) + stroke + 2 || y < Math.min(a[1], b[1]) - stroke - 2 || y > Math.max(a[1], b[1]) + stroke + 2) continue;
        d = Math.min(d, segDist(xx + 0.5, y + 0.5, a, b));
      }
      const cov = Math.max(0, Math.min(1, stroke + 0.75 - d));
      if (cov > 0) {
        const v = Math.round(255 * (1 - cov));
        const i = (y * w + xx) * 4;
        png.data[i] = png.data[i + 1] = png.data[i + 2] = v;
      }
    }
  }
  // İlk kelimenin sol kenarı ve taban çizgisi (piksel); konum doğrulaması için.
  return { buffer: PNG.sync.write(png), width: w, height: h, textLeft: pad - stroke, baseline: pad + top + 10 * unit + stroke };
}

const IMG_W = 480; // sayfaya basılan görüntü genişliği (pt)

/** Taranmış sayfa: A4, yalnızca resim. rotated=true ise içerik /Rotate 90 ile görüntülenir. */
async function makeScanPdf(rotated: boolean) {
  const { PDFDocument, degrees } = await import('pdf-lib');
  const img = makeTextPng();
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const png = await doc.embedPng(img.buffer);
  const h = (IMG_W * img.height) / img.width;
  const s = IMG_W / img.width;
  const u = img.textLeft * s;               // metin başlangıcı, resim içinde sağa (pt)
  const v = (img.height - img.baseline) * s; // taban çizgisi, resim altından yukarı (pt)
  let userStart: [number, number];
  if (!rotated) {
    page.drawImage(png, { x: 57, y: 700, width: IMG_W, height: h });
    userStart = [57 + u, 700 + v];
  } else {
    // Resim kullanıcı uzayında 90° saat yönünün tersine çizilir; sayfa /Rotate 90 ile dik görünür.
    page.drawImage(png, { x: 300, y: 100, width: IMG_W, height: h, rotate: degrees(90) });
    page.setRotation(degrees(90));
    userStart = [300 - v, 100 + u];
  }
  const bytes = Buffer.from(await doc.save());
  return { bytes, userStart };
}

/** pdf.js ile çıktıyı inceler: metin, "MERHABA" öğesinin görüntüdeki başlangıcı, özgün ile piksel farkı. */
async function inspect(page: Page, out: Buffer, orig: Buffer, userStart: [number, number]) {
  return page.evaluate(async ({ outB64, origB64, user }) => {
    const toBytes = (b64: string) => { const bin = atob(b64); const a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; };
    const pdfjs: any = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const open = (b64: string) => pdfjs.getDocument({ data: toBytes(b64) }).promise;
    const raster = async (doc: any) => {
      const p = await doc.getPage(1);
      const vp = p.getViewport({ scale: 1 });
      const c = document.createElement('canvas');
      c.width = Math.ceil(vp.width); c.height = Math.ceil(vp.height);
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
      await p.render({ canvasContext: ctx, viewport: vp }).promise;
      return ctx.getImageData(0, 0, c.width, c.height).data;
    };
    const outDoc = await open(outB64);
    const origDoc = await open(origB64);
    const p = await outDoc.getPage(1);
    const vp = p.getViewport({ scale: 1 });
    const tc = await p.getTextContent();
    const text = tc.items.map((i: any) => i.str).join(' ');
    const it: any = tc.items.find((i: any) => String(i.str).includes('MERHABA'));
    const start = it ? vp.convertToViewportPoint(it.transform[4], it.transform[5]) : null;
    const expected = vp.convertToViewportPoint(user[0], user[1]);
    const a = await raster(outDoc), b = await raster(origDoc);
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
    return { text, pages: outDoc.numPages, start, expected, transform: it ? it.transform : null, diff, size: [vp.width, vp.height] };
  }, { outB64: out.toString('base64'), origB64: orig.toString('base64'), user: userStart });
}

/** Aynı origin'de 404 vb. başarısız yanıtları toplar (eksik vendor dosyası yakalansın). */
function trackFailedResponses(page: Page) {
  const failed: string[] = [];
  page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  page.on('requestfailed', (r) => failed.push(`FAILED ${r.url()} ${r.failure()?.errorText}`));
  return failed;
}

test.describe('PDF OCR', () => {
  test('taranmış PDF → aranabilir PDF: metin katmanı doğru yerde, görünmez; TXT iner; dış istek yok', async ({ page }) => {
    test.setTimeout(180_000);
    const external = trackExternalRequests(page);
    const failed = trackFailedResponses(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/pdf-ocr/');
    const { bytes, userStart } = await makeScanPdf(false);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'tarama.pdf', mimeType: 'application/pdf', buffer: bytes });
    await expect(page.locator('#files li')).toContainText('1 sayfa');
    await expect(page.locator('#opt-lang')).toHaveValue('tur');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 170_000 });
    await expect(page.locator('#result-info')).toContainText('kelime');
    await expect(page.locator('#result-info')).toContainText('tarama kalitesine bağlıdır');

    const [pdfDl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-pdf').click()]);
    expect(pdfDl.suggestedFilename()).toBe('tarama-aranabilir.pdf');
    const out = readFileSync((await pdfDl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    const info = await inspect(page, out, bytes, userStart);
    expect(info.pages).toBe(1);
    expect(info.text).toContain('MERHABA');
    expect(info.size).toEqual([595, 842]);
    // Görünmez: sayfanın çizimi özgün PDF ile birebir aynı (metin render mode 3).
    expect(info.diff).toBe(0);
    // Konum: kelimenin başlangıcı resimdeki yerine ±10 pt yakın.
    expect(info.start).not.toBeNull();
    expect(Math.abs(info.start![0] - info.expected[0])).toBeLessThan(10);
    expect(Math.abs(info.start![1] - info.expected[1])).toBeLessThan(10);

    const [txt] = await Promise.all([page.waitForEvent('download'), page.locator('#download-txt').click()]);
    expect(txt.suggestedFilename()).toBe('tarama-metin.txt');
    const body = readFileSync((await txt.path())!, 'utf8');
    expect(body.charCodeAt(0)).toBe(0xfeff);
    expect(body).toContain('MERHABA');

    expect(external).toEqual([]);
    expect(failed).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('sayfa /Rotate 90 ise metin katmanı döndürülmüş sayfada da doğru konumda ve dönük', async ({ page }) => {
    test.setTimeout(180_000);
    const external = trackExternalRequests(page);
    await page.goto('/pdf-ocr/');
    const { bytes, userStart } = await makeScanPdf(true);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'yatay.pdf', mimeType: 'application/pdf', buffer: bytes });
    await expect(page.locator('#files li')).toContainText('1 sayfa');
    await page.locator('#opt-range').fill('1');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 170_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-pdf').click()]);
    const out = readFileSync((await dl.path())!);
    const info = await inspect(page, out, bytes, userStart);
    expect(info.text).toContain('MERHABA');
    expect(info.size).toEqual([842, 595]); // döndürülmüş sayfa boyutu
    expect(info.diff).toBe(0);
    // Kullanıcı uzayında metin yönü dik (|a|≈0, |b|≈yazı boyu): sayfa dönüşüne uyum.
    expect(Math.abs(info.transform![0])).toBeLessThan(0.05 * Math.abs(info.transform![1]));
    expect(Math.abs(info.start![0] - info.expected[0])).toBeLessThan(10);
    expect(Math.abs(info.start![1] - info.expected[1])).toBeLessThan(10);
    expect(external).toEqual([]);
  });

  test('zaten metni olan sayfa atlanır ve anlaşılır uyarı verilir', async ({ page }) => {
    test.setTimeout(120_000);
    const { PDFDocument, StandardFonts } = await import('pdf-lib');
    const doc = await PDFDocument.create();
    const p = doc.addPage([595, 842]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    p.drawText('Bu sayfada zaten yeterince secilebilir metin var, ikinci katman gerekmez.', { x: 40, y: 700, size: 14, font });
    const bytes = Buffer.from(await doc.save());
    await page.goto('/pdf-ocr/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'metinli.pdf', mimeType: 'application/pdf', buffer: bytes });
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('zaten seçilebilir metin', { timeout: 100_000 });
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('bozuk, şifreli ve PDF olmayan dosya Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/pdf-ocr/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await expect(page.locator('#error')).toContainText('Farklı kaydet');
    await expect(page.locator('#actions')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifreli');
    await expect(page.locator('#error')).toContainText('Şifre Kaldır');
    await expect(page.locator('#actions')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles({ name: 'resim.png', mimeType: 'image/png', buffer: makeTextPng().buffer });
    await expect(page.locator('#error')).toContainText('yalnızca PDF');
    await expect(page.locator('#actions')).toBeHidden();
  });

  test('geçersiz sayfa aralığı işlem başlamadan düzeltilebilir hata verir', async ({ page }) => {
    await page.goto('/pdf-ocr/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#pages-total')).toHaveText('3');
    await page.locator('#opt-range').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Geçersiz sayfa ifadesi');
    await expect(page.locator('#error')).toContainText('1-3, 5, 8-10');
    await page.locator('#opt-range').fill('9');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('3 sayfa var');
    await expect(page.locator('#progress')).not.toHaveClass(/is-active/);
  });

  test('360 px genişlikte yatay taşma yok; içerik, SSS ve reklam yapısı tamam', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/pdf-ocr/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const words = await page.evaluate(() => (document.querySelector('article')!.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('article details')).toHaveCount(9);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="pdf-ocr-${s}"]`)).toHaveCount(1);
    await expect(page.locator('#data-note, .po-first')).toContainText('MB');
  });
});
