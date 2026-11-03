import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { PNG } from 'pngjs';

/* ---------- Fikstür üreticileri (Node; kütüphanesiz) ---------- */

type Entry = { tag: number; type: number; count: number; data: Buffer; ptr?: 'exif' | 'gps' };

const ascii = (s: string) => Buffer.from(s + '\0', 'latin1');
const short = (n: number) => { const b = Buffer.alloc(2); b.writeUInt16LE(n); return b; };
const rationals = (vals: Array<[number, number]>) => {
  const b = Buffer.alloc(vals.length * 8);
  vals.forEach(([n, d], i) => { b.writeUInt32LE(n, i * 8); b.writeUInt32LE(d, i * 8 + 4); });
  return b;
};

/** Little-endian TIFF: IFD0 + Exif IFD + GPS IFD. */
function buildTiff(opts: { orientation?: number; gps?: boolean }) {
  const ifd0: Entry[] = [
    { tag: 0x010f, type: 2, count: 11, data: ascii('BilisimCam') },
    { tag: 0x0110, type: 2, count: 12, data: ascii('TestPhone 1') },
  ];
  if (opts.orientation) ifd0.push({ tag: 0x0112, type: 3, count: 1, data: short(opts.orientation) });
  ifd0.push({ tag: 0x0131, type: 2, count: 9, data: ascii('TestSoft') });
  ifd0.push({ tag: 0x0132, type: 2, count: 20, data: ascii('2025:03:14 10:20:30') });
  ifd0.push({ tag: 0x8769, type: 4, count: 1, data: Buffer.alloc(4), ptr: 'exif' });
  if (opts.gps) ifd0.push({ tag: 0x8825, type: 4, count: 1, data: Buffer.alloc(4), ptr: 'gps' });
  const exif: Entry[] = [{ tag: 0x9003, type: 2, count: 20, data: ascii('2025:03:14 10:20:30') }];
  const gps: Entry[] = opts.gps ? [
    { tag: 1, type: 2, count: 2, data: ascii('N') },
    { tag: 2, type: 5, count: 3, data: rationals([[37, 1], [54, 1], [30, 1]]) },
    { tag: 3, type: 2, count: 2, data: ascii('E') },
    { tag: 4, type: 5, count: 3, data: rationals([[40, 1], [14, 1], [0, 1]]) },
  ] : [];

  const ifdSize = (e: Entry[]) => 2 + e.length * 12 + 4;
  const off0 = 8;
  const offExif = off0 + ifdSize(ifd0);
  const offGps = offExif + ifdSize(exif);
  let dataOff = offGps + (gps.length ? ifdSize(gps) : 0);
  const dataParts: Buffer[] = [];
  const writeIfd = (entries: Entry[]) => {
    const b = Buffer.alloc(ifdSize(entries));
    b.writeUInt16LE(entries.length, 0);
    entries.forEach((e, i) => {
      const p = 2 + i * 12;
      b.writeUInt16LE(e.tag, p); b.writeUInt16LE(e.type, p + 2); b.writeUInt32LE(e.count, p + 4);
      if (e.ptr) b.writeUInt32LE(e.ptr === 'exif' ? offExif : offGps, p + 8);
      else if (e.data.length <= 4) e.data.copy(b, p + 8);
      else { b.writeUInt32LE(dataOff, p + 8); dataParts.push(e.data); dataOff += e.data.length; }
    });
    return b;
  };
  const hdr = Buffer.from([0x49, 0x49, 0x2a, 0x00, 8, 0, 0, 0]);
  const parts = [hdr, writeIfd(ifd0), writeIfd(exif)];
  if (gps.length) parts.push(writeIfd(gps));
  return Buffer.concat([...parts, ...dataParts]);
}

function segment(marker: number, payload: Buffer) {
  const h = Buffer.from([0xff, marker, 0, 0]);
  h.writeUInt16BE(payload.length + 2, 2);
  return Buffer.concat([h, payload]);
}

/** Tek renkli (orta gri) gri tonlamalı küçük baseline JPEG; tüm bloklar DC farkı 0. */
function buildJpeg(width: number, height: number, extra: Buffer[]) {
  const blocks = Math.ceil(width / 8) * Math.ceil(height / 8);
  const bitCount = blocks * 2; // her blok: DC kategori 0 ("0") + EOB ("0")
  const data = Buffer.alloc(Math.ceil(bitCount / 8), 0);
  for (let i = bitCount; i < data.length * 8; i++) data[i >> 3] |= 0x80 >> (i & 7); // 1'lerle doldur
  const dqt = segment(0xdb, Buffer.concat([Buffer.from([0]), Buffer.alloc(64, 1)]));
  const sof = Buffer.alloc(9);
  sof[0] = 8; sof.writeUInt16BE(height, 1); sof.writeUInt16BE(width, 3); sof[5] = 1; sof[6] = 1; sof[7] = 0x11; sof[8] = 0;
  const dht = (cls: number) => {
    const counts = Buffer.alloc(16); counts[0] = 1;
    return segment(0xc4, Buffer.concat([Buffer.from([cls << 4]), counts, Buffer.from([0])]));
  };
  const sos = segment(0xda, Buffer.from([1, 1, 0x00, 0, 63, 0]));
  return Buffer.concat([Buffer.from([0xff, 0xd8]), ...extra, dqt, segment(0xc0, sof), dht(0), dht(1), sos, data, Buffer.from([0xff, 0xd9])]);
}

const exifSegment = (o: { orientation?: number; gps?: boolean }) => segment(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), buildTiff(o)]));
const xmpSegment = () => segment(0xe1, Buffer.from('http://ns.adobe.com/xap/1.0/\0<x:xmpmeta></x:xmpmeta>', 'latin1'));

/** JPEG segment işaretlerini ve SOF boyutunu okur. */
function inspectJpeg(b: Buffer) {
  const markers: number[] = [];
  let p = 2, w = 0, h = 0;
  while (p < b.length) {
    const m = b[p + 1];
    markers.push(m);
    if (m === 0xda || m === 0xd9) break;
    const len = b.readUInt16BE(p + 2);
    if (m === 0xc0) { h = b.readUInt16BE(p + 5); w = b.readUInt16BE(p + 7); }
    p += 2 + len;
  }
  return { markers, w, h };
}

// Sabit fikstür dosyası: EXIF + GPS içeren 24x8 JPEG
const gpsJpeg = buildJpeg(24, 8, [segment(0xe0, Buffer.from('JFIF\0\x01\x01\0\0\x01\0\x01\0\0', 'latin1')), exifSegment({ gps: true }), xmpSegment(), segment(0xfe, Buffer.from('gizli yorum'))]);
test.beforeAll(() => {
  mkdirSync(dirname(fx('x')), { recursive: true });
  writeFileSync(fx('exif-temizle-gps.jpg'), gpsJpeg);
});

/** Sabit CRC32 (PNG parçaları için). */
function crc32(buf: Buffer) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function pngWithText(w: number, h: number) {
  const png = new PNG({ width: w, height: h });
  png.data.fill(200);
  const raw = PNG.sync.write(png);
  const type = Buffer.from('tEXt', 'latin1');
  const body = Buffer.concat([type, Buffer.from('Author\0Gizli Kisi', 'latin1')]);
  const chunk = Buffer.alloc(12 + body.length - 4);
  chunk.writeUInt32BE(body.length - 4, 0);
  body.copy(chunk, 4);
  chunk.writeUInt32BE(crc32(body), chunk.length - 4);
  // IHDR (8+25=33 bayt) sonrasına ekle
  return Buffer.concat([raw.subarray(0, 33), chunk, raw.subarray(33)]);
}

test.describe('EXIF ve Konum Temizle', () => {
  test('EXIF+GPS özeti görünür, temizlenen JPEG\'de APP1 yok ve boyut aynı', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/exif-temizle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('exif-temizle-gps.jpg'));
    const card = page.locator('.ex-card');
    await expect(card).toContainText('BilisimCam TestPhone 1');
    await expect(card).toContainText('2025:03:14 10:20:30');
    await expect(card).toContainText('Konum bilgisi var');
    await expect(card).toContainText('37.9083, 40.2333');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('Temizlendi:');
    await expect(card.locator('.ex-result')).toContainText('Piksel verisi değişmedi');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('exif-temizle-gps-temiz.jpg');
    const out = readFileSync((await dl.path())!);
    const ins = inspectJpeg(out);
    expect(ins.markers).not.toContain(0xe1);
    expect(ins.markers).not.toContain(0xfe);
    expect(ins.markers).toContain(0xe0); // JFIF kalır
    expect(ins.w).toBe(24);
    expect(ins.h).toBe(8);
    expect(out.length).toBeLessThan(gpsJpeg.length);
    // temiz dosya yeniden yüklenince "üst veri yok" görünmeli
    await page.locator('#clear').click();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'temiz.jpg', mimeType: 'image/jpeg', buffer: out });
    await expect(page.locator('.ex-card')).toContainText('Konum bilgisi bulunamadı');
    await expect(page.locator('.ex-card')).toContainText('Üst veri yok');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('PNG metin parçaları kaldırılır, piksel boyutu aynı kalır', async ({ page }) => {
    await page.goto('/exif-temizle/');
    const buf = pngWithText(10, 6);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'ekran.png', mimeType: 'image/png', buffer: buf });
    await expect(page.locator('.ex-card')).toContainText('PNG metin parçaları');
    await page.locator('#run').click();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    const out = readFileSync((await dl.path())!);
    expect(out.includes(Buffer.from('tEXt'))).toBe(false);
    const decoded = PNG.sync.read(out);
    expect([decoded.width, decoded.height]).toEqual([10, 6]);
  });

  test('yönü düzelt: Orientation 6 olan JPEG yeniden kodlanır, boyutlar yer değiştirir', async ({ page }) => {
    await page.goto('/exif-temizle/');
    const buf = buildJpeg(24, 8, [exifSegment({ orientation: 6 })]);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'yan.jpg', mimeType: 'image/jpeg', buffer: buf });
    await expect(page.locator('.ex-card')).toContainText('Yön (Orientation)');
    await expect(page.locator('#field-orient')).toBeVisible();
    await page.locator('#opt-orient').check();
    await page.locator('#run').click();
    await expect(page.locator('.ex-result')).toContainText('yeniden kodlandı');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    const out = readFileSync((await dl.path())!);
    const ins = inspectJpeg(out);
    expect(ins.markers).not.toContain(0xe1);
    expect([ins.w, ins.h]).toEqual([8, 24]);
  });

  test('iki dosya zip olarak iner', async ({ page }) => {
    await page.goto('/exif-temizle/');
    await page.locator('#drop input[type=file]').setInputFiles([{ name: 'a.jpg', mimeType: 'image/jpeg', buffer: gpsJpeg }, { name: 'b.png', mimeType: 'image/png', buffer: pngWithText(4, 4) }]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#run').click();
    await expect(page.locator('#download-zip')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(dl.suggestedFilename()).toBe('temiz-fotograflar.zip');
    expect(readFileSync((await dl.path())!).subarray(0, 2).toString()).toBe('PK');
  });

  test('HEIC reddedilir, bozuk dosya Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/exif-temizle/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'IMG_0001.HEIC', mimeType: 'image/heic', buffer: Buffer.from('ftypheic') });
    await expect(page.locator('#error')).toContainText('HEIC');
    await expect(page.locator('#error')).toContainText('En Uyumlu');
    await expect(page.locator('#files li')).toHaveCount(0);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('bu bir fotograf degil, duz metin') });
    await expect(page.locator('#error')).toContainText('okunamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydederek');
    // yarım kesilmiş JPEG
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'kesik.jpg', mimeType: 'image/jpeg', buffer: gpsJpeg.subarray(0, 40) });
    await expect(page.locator('#error')).toContainText('okunamadı');
    await expect(page.locator('#files li')).toHaveCount(0);
  });
});
