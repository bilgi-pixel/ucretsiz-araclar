import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

const PAGE = '/en/pdf-to-jpg/';
// tests/fixtures/pdf-sifre-kaldir-1234.pdf: uc-sayfa.pdf encrypted with qpdf (AES-256), password "1234".

/** Minimal ZIP reader based on the central directory; the tool stores entries uncompressed. */
function readZip(buf: Buffer) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('end of central directory not found');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const out: { name: string; method: number; data: Buffer }[] = [];
  for (let k = 0; k < count; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('bad central directory entry');
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.subarray(p + 46, p + 46 + nameLen).toString('utf8');
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    out.push({ name, method, data: buf.subarray(start, start + size) });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return out;
}

/** Pixel size (SOF marker) and JFIF density of a JPEG. */
function jpegInfo(b: Buffer) {
  expect(Array.from(b.subarray(0, 3))).toEqual([0xff, 0xd8, 0xff]);
  const density = b.toString('latin1', 6, 11) === 'JFIF\0' && b[13] === 1 ? b.readUInt16BE(14) : 0;
  let p = 2;
  while (p < b.length - 9) {
    if (b[p] !== 0xff) { p++; continue; }
    const m = b[p + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { width: b.readUInt16BE(p + 7), height: b.readUInt16BE(p + 5), density };
    p += 2 + b.readUInt16BE(p + 2);
  }
  throw new Error('SOF marker not found');
}

/** Pixel size (IHDR) and pHYs pixels-per-meter of a PNG. */
function pngInfo(b: Buffer) {
  expect(Array.from(b.subarray(0, 8))).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const i = b.indexOf('pHYs', 0, 'latin1');
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), ppm: i > 0 ? b.readUInt32BE(i + 4) : 0, unit: i > 0 ? b[i + 12] : -1 };
}

/** n-page A4 PDF made with pdf-lib. */
async function makePdf(n: number): Promise<Buffer> {
  const { PDFDocument, StandardFonts } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= n; i++) {
    const pg = doc.addPage([595.28, 841.89]);
    pg.drawText(`Long report - page ${i}`, { x: 60, y: 760, size: 28, font });
  }
  return Buffer.from(await doc.save());
}

const overflow = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

test.describe('PDF to JPG (EN)', () => {
  test('3-page A4 PDF → ZIP with 3 JPGs of 1240×1754 px at 150 DPI; no network, no page errors', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(PAGE);
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');
    await expect(page.locator('#estimate')).toContainText('3 images');
    await expect(page.locator('#estimate')).toContainText('1,240 × 1,754 px');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(3);
    await expect(page.locator('#result-info')).toContainText('3 JPG images');
    await expect(page.locator('#result-info')).toContainText('1,240 × 1,754 px');
    await expect(page.locator('#result-info')).toContainText('150 DPI');
    // the previews are real, decodable images
    await expect.poll(() => page.locator('#thumbs img').evaluateAll((imgs) => imgs.filter((i) => (i as HTMLImageElement).naturalWidth > 0).length)).toBe(3);

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-jpg.zip');
    const entries = readZip(readFileSync((await dl.path())!));
    expect(entries.map((e) => e.name)).toEqual(['uc-sayfa-page-001.jpg', 'uc-sayfa-page-002.jpg', 'uc-sayfa-page-003.jpg']);
    for (const e of entries) {
      expect(e.method).toBe(0);
      const info = jpegInfo(e.data);
      expect(Math.abs(info.width - 1240)).toBeLessThanOrEqual(1);
      expect(Math.abs(info.height - 1754)).toBeLessThanOrEqual(1);
      expect(info.density).toBe(150);
    }

    const [one] = await Promise.all([page.waitForEvent('download'), page.locator('#thumbs button[data-download="1"]').click()]);
    expect(one.suggestedFilename()).toBe('uc-sayfa-page-002.jpg');
    expect(jpegInfo(readFileSync((await one.path())!)).width).toBe(1240);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('range "2" → only one image; PNG at 72 DPI is 595×842 px with a 72 DPI pHYs chunk', async ({ page }) => {
    await page.goto(PAGE);
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 pages');
    await page.locator('#opt-range').fill('2');
    await expect(page.locator('#estimate')).toContainText('1 image ·');
    await expect(page.locator('#estimate')).toContainText('px per page (based on page 1)');
    await expect(page.locator('#estimate')).not.toContainText('page 1 will be');
    await page.locator('#opt-format').selectOption('png');
    await expect(page.locator('#run')).toHaveText('Convert to PNG');
    await expect(page.locator('#quality-field')).toBeHidden();
    await expect(page.locator('#opt-bg')).toBeEnabled();
    await page.locator('#opt-dpi').selectOption('72');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(1);
    await expect(page.locator('#thumbs .pj-card')).toHaveAttribute('data-name', 'uc-sayfa-page-002.png');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#thumbs button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-page-002.png');
    expect(pngInfo(readFileSync((await dl.path())!))).toEqual({ width: 595, height: 842, ppm: 2835, unit: 1 });

    // "2-" → pages 2 and 3, back to JPG
    await page.locator('#opt-format').selectOption('jpeg');
    await expect(page.locator('#opt-bg')).toBeDisabled();
    await page.locator('#opt-range').fill('2-');
    await page.locator('#run').click();
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(2);
    await expect(page.locator('#thumbs .pj-card').nth(1)).toHaveAttribute('data-name', 'uc-sayfa-page-003.jpg');
  });

  test('corrupt, empty and non-PDF files, a bad range and a bad DPI give English errors with a fix', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(PAGE);
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('damaged or is not a valid PDF');
    await expect(page.locator('#error')).toContainText('download it again');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'empty.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(0) });
    await expect(page.locator('#error')).toContainText('is empty (0 bytes)');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('is not a PDF');
    await expect(page.locator('#error')).toContainText('Image to PDF');
    await expect(page.locator('#files li')).toHaveCount(0);

    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#options')).toBeVisible();
    await page.locator('#opt-range').fill('abc');
    await expect(page.locator('#estimate')).toContainText('Check the page range');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Invalid page range: “abc”');
    await page.locator('#opt-range').fill('9-12');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('That range contains no pages');
    await expect(page.locator('#error')).toContainText('has 3 pages');
    await page.locator('#opt-range').fill('');
    await page.locator('#opt-dpi').selectOption('custom');
    await expect(page.locator('#opt-dpi-custom')).toBeFocused();
    await page.locator('#opt-dpi-custom').fill('5');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('between 36 and 600 DPI');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    expect(errors).toEqual([]);
  });

  test('password-protected PDF asks for the password; wrong one is rejected, right one converts; skip works', async ({ page }) => {
    await page.goto(PAGE);
    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await expect(page.locator('#pw-box')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#pw-msg')).toContainText('password-protected');
    await expect(page.locator('#pw')).toBeFocused();
    await page.locator('#pw').fill('wrong');
    await page.locator('#pw').press('Enter');
    await expect(page.locator('#pw-msg')).toContainText('Incorrect password', { timeout: 15_000 });
    await page.locator('#pw').fill('1234');
    await page.locator('#pw-submit').click();
    await expect(page.locator('#pw-box')).toBeHidden({ timeout: 15_000 });
    await expect(page.locator('#files li')).toContainText('3 pages');
    // keyboard users are not dropped to <body> when the password box closes
    await expect(page.locator('#run')).toBeFocused();
    await page.locator('#opt-range').fill('1');
    await page.locator('#run').click();
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(1);
    await expect(page.locator('#thumbs .pj-card')).toHaveAttribute('data-w', '1240');
    await expect(page.locator('#thumbs .pj-card')).toHaveAttribute('data-h', '1754');

    // a second protected file can be skipped
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'locked.pdf', mimeType: 'application/pdf', buffer: readFileSync(fx('pdf-sifre-kaldir-1234.pdf')) });
    await expect(page.locator('#pw-box')).toBeVisible({ timeout: 15_000 });
    await page.locator('#pw-skip').click();
    await expect(page.locator('#error')).toContainText('“locked.pdf” was skipped because no password was entered');
    await expect(page.locator('#pw-box')).toBeHidden();
    await expect(page.locator('#files li')).toHaveCount(1);
  });

  test('canvas limits: oversized pages are scaled down and reported; size and range rules', async ({ page }) => {
    await page.goto(PAGE);
    const r = await page.evaluate(() => {
      const t = (window as any).__pdfToJpgTest();
      return {
        a4: t.fitScale(595.28, 841.89, 150),
        letter: t.fitScale(612, 792, 300),
        huge: t.fitScale(14400, 14400, 300),
        wide: t.fitScale(14400, 1000, 600),
        limits: t.limits,
        r1: t.parseRanges('1-3,5,8-', 10),
        r2: t.parseRanges('8-', 3),
        r3: t.parseRanges('', 3),
        r4: t.parseRanges('3-1, 2', 5),
      };
    });
    expect(r.a4).toMatchObject({ width: 1240, height: 1754, reduced: false, dpi: 150 });
    expect(r.letter).toMatchObject({ width: 2550, height: 3300, reduced: false });
    expect(r.limits).toEqual({ side: 16384, area: 268435456 });
    expect(r.huge.reduced).toBe(true);
    expect(Math.max(r.huge.width, r.huge.height)).toBeLessThanOrEqual(16384);
    expect(r.huge.width * r.huge.height).toBeLessThanOrEqual(268435456);
    expect(r.huge.dpi).toBeLessThan(300);
    expect(r.wide.reduced).toBe(true);
    expect(r.wide.width).toBeLessThanOrEqual(16384);
    expect(r.r1).toEqual([1, 2, 3, 5, 8, 9, 10]);
    expect(r.r2).toEqual([]);
    expect(r.r3).toEqual([1, 2, 3]);
    expect(r.r4).toEqual([1, 2, 3]);

    // real pipeline with a lowered limit: page 1 at 300 DPI must shrink to fit 1000 px
    await page.evaluate(() => (window as any).__pdfToJpgTest().setLimits({ side: 1000 }));
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-dpi').selectOption('300');
    await page.locator('#opt-range').fill('1');
    await page.locator('#run').click();
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(1);
    const h = Number(await page.locator('#thumbs .pj-card').getAttribute('data-h'));
    expect(h).toBeLessThanOrEqual(1000);
    expect(h).toBeGreaterThanOrEqual(990);
    await expect(page.locator('#notes')).toBeVisible();
    await expect(page.locator('#notes')).toContainText('too large for the browser');
    await expect(page.locator('#notes')).toContainText('rendered at');
  });

  test('a long job shows progress and Cancel keeps the finished pages', async ({ page }) => {
    await page.goto(PAGE);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'long-report.pdf', mimeType: 'application/pdf', buffer: await makePdf(40) });
    await expect(page.locator('#files li')).toContainText('40 pages');
    await expect(page.locator('#estimate')).toContainText('40 images');
    await page.locator('#opt-dpi').selectOption('300');
    await page.locator('#run').click();
    await expect(page.locator('#cancel')).toBeVisible();
    await expect(page.locator('#progress .label')).toContainText('of 40');
    // adding a file while busy is refused with a hint …
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('Wait for the current conversion to finish');
    await expect.poll(() => page.locator('#thumbs .pj-card').count(), { timeout: 30_000 }).toBeGreaterThanOrEqual(2);
    await page.locator('#cancel').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    // … and the hint does not linger once the job has stopped
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#notes')).toContainText('Cancelled after');
    const n = await page.locator('#thumbs .pj-card').count();
    expect(n).toBeGreaterThanOrEqual(2);
    expect(n).toBeLessThan(40);
    await expect(page.locator('#cancel')).toBeHidden();
    await expect(page.locator('#run')).toBeEnabled();
    await expect(page.locator('#thumbs .pj-card').first()).toHaveAttribute('data-name', 'long-report-page-001.jpg');
    // a file that cannot be added does not wipe the finished images
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('damaged or is not a valid PDF');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(n);
  });

  test('several PDFs share the range; ZIP keeps source names; keyboard opens the picker; Clear resets', async ({ page }) => {
    await page.goto(PAGE);
    // Enter on the focused drop zone opens the (multiple) file picker. Playwright does not emit
    // "filechooser" for keyboard-opened multiple inputs, so the click on the hidden input is checked.
    await page.evaluate(() => {
      (window as any).__pickerOpened = 0;
      document.querySelector('#drop input[type=file]')!.addEventListener('click', (e) => { (window as any).__pickerOpened++; e.preventDefault(); });
    });
    await page.locator('#drop').focus();
    await page.keyboard.press('Enter');
    expect(await page.evaluate(() => (window as any).__pickerOpened)).toBe(1);
    expect(await page.locator('#drop input[type=file]').evaluate((i) => (i as HTMLInputElement).multiple)).toBe(true);
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-quality').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#opt-quality-out')).toHaveText('86%');
    await page.locator('#opt-range').fill('1');
    await page.locator('#opt-range').press('Enter');
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(2);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(dl.suggestedFilename()).toBe('pdf-to-jpg-images.zip');
    expect(readZip(readFileSync((await dl.path())!)).map((e) => e.name)).toEqual(['iki-sayfa-page-001.jpg', 'uc-sayfa-page-001.jpg']);
    await page.getByRole('button', { name: 'Remove iki-sayfa.pdf' }).click();
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#clear').click();
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#options')).toBeHidden();
  });

  test('content: 900+ words, 7+ FAQ, 3 ads placed correctly, hreflang, JSON-LD; no overflow at 360px', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(PAGE);
    const words = (await page.locator('.ba-content').allInnerTexts()).join(' ').split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const faq = await page.locator('.ba-faq details').count();
    expect(faq).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-pdf-to-jpg-${s}"]`)).toHaveCount(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const tool = (await page.locator('.ba-tool').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="en-pdf-to-jpg-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThan(tool.y + tool.height);
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/pdf-to-jpg/');
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdfden-resme/');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/pdf-to-jpg/');
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/pdfden-resme/');
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).map((t) => JSON.parse(t));
    const app = ld.find((x) => x['@type'] === 'SoftwareApplication');
    expect(app.inLanguage).toBe('en');
    expect(app.url).toBe('https://araclar.bilisimajans.com/en/pdf-to-jpg/');
    const faqLd = ld.find((x) => x['@type'] === 'FAQPage');
    expect(faqLd.mainEntity.length).toBe(faq);
    expect(await overflow(page)).toBeLessThanOrEqual(0);

    const longName = 'a-very-long-file-name-without-any-spaces-that-could-push-the-layout-sideways-on-small-phones.pdf';
    await page.locator('#drop input[type=file]').setInputFiles({ name: longName, mimeType: 'application/pdf', buffer: readFileSync(fx('uc-sayfa.pdf')) });
    await expect(page.locator('#files li')).toContainText('3 pages');
    await page.locator('#opt-dpi').selectOption('72');
    await page.locator('#run').click();
    await expect(page.locator('#thumbs .pj-card')).toHaveCount(3);
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    // long names inside error messages and the password prompt must wrap too
    await page.locator('#drop input[type=file]').setInputFiles({ name: `broken-${longName}`, mimeType: 'application/pdf', buffer: readFileSync(fx('bozuk.pdf')) });
    await expect(page.locator('#error')).toContainText('damaged');
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await page.locator('#drop input[type=file]').setInputFiles({ name: `locked-${longName}`, mimeType: 'application/pdf', buffer: readFileSync(fx('pdf-sifre-kaldir-1234.pdf')) });
    await expect(page.locator('#pw-box')).toBeVisible({ timeout: 15_000 });
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await page.locator('#pw-skip').click();
    await expect(page.locator('#error')).toContainText('was skipped');
    expect(external).toEqual([]);
  });
});
