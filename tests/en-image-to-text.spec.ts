import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL_PATH = '/en/image-to-text/';
const FOX = 'The quick brown fox jumps over the lazy dog';

/** Tarayıcıda canvas ile metinli PNG üretir (Node'da canvas yok). rotate: -90 → metin saat yönünün tersine yan çevrilir. */
async function makeTextPng(page: Page, lines: string[], opts: { w?: number; h?: number; font?: number; rotate?: number } = {}): Promise<Buffer> {
  const dataUrl = await page.evaluate(({ lines, w, h, font, rotate }) => {
    const base = document.createElement('canvas');
    base.width = w; base.height = h;
    const ctx = base.getContext('2d')!;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#111';
    ctx.font = `${font}px Arial, Helvetica, sans-serif`;
    ctx.textBaseline = 'top';
    lines.forEach((t, i) => ctx.fillText(t, 40, 40 + i * font * 1.5));
    if (!rotate) return base.toDataURL('image/png');
    // Metni yan çevir: -90° (saat yönü tersine) → düzeltmek için bir kez "Rotate 90°" gerekir
    const out = document.createElement('canvas');
    out.width = h; out.height = w;
    const o = out.getContext('2d')!;
    o.translate(0, w); o.rotate(-Math.PI / 2);
    o.drawImage(base, 0, 0);
    return out.toDataURL('image/png');
  }, { lines, w: opts.w ?? 1400, h: opts.h ?? 160, font: opts.font ?? 48, rotate: opts.rotate ?? 0 });
  return Buffer.from(dataUrl.split(',')[1], 'base64');
}

/** İki "taranmış" sayfalı PDF: her sayfa yalnızca bir PNG görüntüsüdür (seçilebilir metin yok). */
async function makeScannedPdf(page: Page, texts: string[]): Promise<Buffer> {
  const doc = await PDFDocument.create();
  for (const t of texts) {
    const png = await makeTextPng(page, [t], { w: 1400, h: 200, font: 52 });
    const img = await doc.embedPng(png);
    const p = doc.addPage([700, 100]);
    p.drawImage(img, { x: 0, y: 0, width: 700, height: 100 });
  }
  return Buffer.from(await doc.save());
}

/** Levenshtein benzerliği (0–1), boşluklar sadeleştirilir. */
function similarity(a: string, b: string): number {
  const s = a.replace(/\s+/g, ' ').trim();
  const t = b.replace(/\s+/g, ' ').trim();
  const dp = Array.from({ length: s.length + 1 }, (_, i) => [i, ...Array(t.length).fill(0)]);
  for (let j = 1; j <= t.length; j++) dp[0][j] = j;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (s[i - 1] === t[j - 1] ? 0 : 1));
    }
  }
  return 1 - dp[s.length][t.length] / Math.max(s.length, t.length, 1);
}

/** Aynı köken dışına giden her isteği ve 400+ yanıtları toplar. */
function trackOrigins(page: Page, origin: string) {
  const foreign: string[] = [];
  const failed: string[] = [];
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (u.protocol === 'blob:' || u.protocol === 'data:') return;
    if (u.origin !== origin) foreign.push(r.url());
  });
  page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  page.on('requestfailed', (r) => failed.push(`FAILED ${r.url()} ${r.failure()?.errorText}`));
  return { foreign, failed };
}

const input = (page: Page) => page.locator('#drop input[type=file]');

test.describe('Image to Text OCR (EN)', () => {
  test('known PNG → ≥90% match with the fox sentence; TXT and DOCX download; only same-origin requests', async ({ page, baseURL }) => {
    test.slow();
    test.setTimeout(150_000);
    const external = trackExternalRequests(page);
    const { foreign, failed } = trackOrigins(page, new URL(baseURL!).origin);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    await expect(page.locator('#opt-lang')).toHaveValue('eng');
    const png = await makeTextPng(page, [FOX]);
    await input(page).setInputFiles({ name: 'quick-fox.png', mimeType: 'image/png', buffer: png });
    await expect(page.locator('#queue li')).toHaveCount(1);
    await expect(page.locator('#queue li .meta')).toContainText('1,400×160 px');
    await expect(page.locator('#field-pages')).toBeHidden();
    await expect(page.locator('#editor')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 140_000 });
    await expect(page.locator('#result')).toBeVisible();
    const text = await page.locator('#out').inputValue();
    expect(similarity(text, FOX), `OCR: "${text}"`).toBeGreaterThanOrEqual(0.9);
    await expect(page.locator('#result-info')).toContainText(/about \d+ words/);
    await expect(page.locator('#result-info')).toContainText('language: English');
    await expect(page.locator('#page-conf li')).toHaveCount(1);
    await expect(page.locator('#page-conf li .ocr-conf-val')).toContainText(/\d+% confidence/);
    await expect(page.locator('#queue li .ocr-q-status')).toContainText(/Done · \d+% confidence/);

    const [txt] = await Promise.all([page.waitForEvent('download'), page.locator('#download-txt').click()]);
    expect(txt.suggestedFilename()).toBe('quick-fox.txt');
    const txtBody = readFileSync((await txt.path())!, 'utf8');
    expect(txtBody.charCodeAt(0)).toBe(0xfeff);
    expect(similarity(txtBody.slice(1), FOX)).toBeGreaterThanOrEqual(0.9);

    const [docx] = await Promise.all([page.waitForEvent('download'), page.locator('#download-docx').click()]);
    expect(docx.suggestedFilename()).toBe('quick-fox.docx');
    const bytes = readFileSync((await docx.path())!);
    expect(Array.from(bytes.subarray(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(bytes.toString('latin1')).toContain('word/document.xml');

    expect(external).toEqual([]);
    expect(foreign).toEqual([]);
    expect(failed).toEqual([]);
    noErrors();
  });

  test('two-page scanned PDF → text of both pages with per-page confidence', async ({ page, baseURL }) => {
    test.slow();
    test.setTimeout(150_000);
    const { foreign, failed } = trackOrigins(page, new URL(baseURL!).origin);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    const pdf = await makeScannedPdf(page, ['Invoice number 2048 is due on Monday', 'Second page says thank you for your order']);
    await input(page).setInputFiles({ name: 'scan.pdf', mimeType: 'application/pdf', buffer: pdf });
    await expect(page.locator('#queue li .meta')).toContainText('2 pages');
    await expect(page.locator('#field-pages')).toBeVisible();
    await expect(page.locator('#preview-caption')).toContainText('page 1 of 2');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 140_000 });
    const text = await page.locator('#out').inputValue();
    expect(text).toContain('--- scan.pdf · page 1 ---');
    expect(text).toContain('--- scan.pdf · page 2 ---');
    const [p1, p2] = text.split('--- scan.pdf · page 2 ---');
    expect(p1).toContain('2048');
    expect(p1).toMatch(/Monday/i);
    expect(p2).toMatch(/thank you/i);
    expect(p2).not.toContain('2048');
    await expect(page.locator('#page-conf li')).toHaveCount(2);
    await expect(page.locator('#result-info')).toContainText('2 pages from 1 file');
    expect(foreign).toEqual([]);
    expect(failed).toEqual([]);
    noErrors();
  });

  test('damaged, password-protected and unsupported files show English errors with a fix', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    await input(page).setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('this is not really a png file at all') });
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('"broken.png" could not be opened');
    await expect(page.locator('#error')).toContainText('save it again as PNG or JPG');
    await expect(page.locator('#actions')).toBeHidden();

    await input(page).setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('is damaged or is not a valid PDF');

    await input(page).setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('password-protected');
    await expect(page.locator('#error')).toContainText('Unlock PDF');

    await input(page).setInputFiles([
      { name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') },
      { name: 'IMG_0001.HEIC', mimeType: 'image/heic', buffer: Buffer.from('heic') },
    ]);
    await expect(page.locator('#error')).toContainText('"notes.txt" is not a supported file type');
    await expect(page.locator('#error')).toContainText('HEIC photo');
    await expect(page.locator('#actions')).toBeHidden();
    await expect(page.locator('#queue li')).toHaveCount(0);

    // Bozuk görsel yapıştırılırsa durum satırı "Pasted 1 image" dememeli
    await page.evaluate(() => {
      const dt = new DataTransfer();
      dt.items.add(new File([new Uint8Array([1, 2, 3, 4])], 'image.png', { type: 'image/png' }));
      document.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
    });
    await expect(page.locator('#error')).toContainText('"screenshot-1.png" could not be opened');
    await expect(page.locator('#status')).not.toContainText('Pasted');
    await expect(page.locator('#queue li')).toHaveCount(0);
    noErrors();
  });

  test('blank image → "no text found"; downloads disabled; invalid page range is rejected', async ({ page }) => {
    test.slow();
    test.setTimeout(150_000);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    const blank = await makeTextPng(page, [], { w: 800, h: 300 });
    await input(page).setInputFiles({ name: 'blank.png', mimeType: 'image/png', buffer: blank });
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 140_000 });
    await expect(page.locator('#result-title')).toHaveText('No text found');
    // "Metin yok" sonucu yeşil başarı kutusu gibi görünmemeli
    await expect(page.locator('#result')).toHaveClass(/ocr-none/);
    await expect(page.locator('#result-info')).toContainText('No text was found');
    await expect(page.locator('#download-txt')).toBeDisabled();
    await expect(page.locator('#download-docx')).toBeDisabled();
    await expect(page.locator('#page-conf li')).toContainText('no text found');

    // PDF ekleyip geçersiz aralık
    await input(page).setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-pages').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('"abc" is not a valid page range');
    await page.locator('#opt-pages').fill('9');
    await page.locator('#queue li').first().locator('.ocr-q-remove').click();
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('None of those page numbers exist');
    noErrors();
  });

  test('paste a screenshot, rotate a sideways image, crop and remove from the queue', async ({ page }) => {
    test.slow();
    test.setTimeout(150_000);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    // Ctrl+V: ClipboardEvent içinde görsel dosyası
    const sideways = await makeTextPng(page, ['HELLO SIDEWAYS WORLD 2026'], { w: 1200, h: 160, font: 60, rotate: -90 });
    await page.evaluate(async (b64) => {
      const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const dt = new DataTransfer();
      dt.items.add(new File([bin], 'image.png', { type: 'image/png' }));
      document.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
    }, sideways.toString('base64'));
    await expect(page.locator('#queue li .ocr-q-name')).toHaveText('screenshot-1.png');
    await expect(page.locator('#status')).toContainText('Pasted 1 image');
    await expect(page.locator('#queue li .meta')).toContainText('160×1,200 px');

    // Önizleme dikey; döndürünce yatay olur
    const dims = () => page.evaluate(() => { const c = document.getElementById('preview') as HTMLCanvasElement; return [c.width, c.height]; });
    const [w0, h0] = await dims();
    expect(h0).toBeGreaterThan(w0);
    await page.locator('#rotate').click();
    await expect(page.locator('#rotation-label')).toHaveText('90°');
    await expect.poll(async () => (await dims())[0]).toBeGreaterThan(h0 - 1);
    const [w1, h1] = await dims();
    expect(w1).toBeGreaterThan(h1);
    await expect(page.locator('#queue li .meta')).toContainText('rotated 90°');

    // Kırpma alanı: sayısal giriş kutusu kutuyu gösterir, sıfırla gizler
    await page.locator('#crop-r').fill('5');
    await expect(page.locator('#crop-box')).toBeVisible();
    await expect(page.locator('#queue li .meta')).toContainText('cropped');
    await page.locator('#crop-reset').click();
    await expect(page.locator('#crop-box')).toBeHidden();

    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 140_000 });
    const text = await page.locator('#out').inputValue();
    expect(text).toMatch(/HELLO/);
    expect(text).toMatch(/WORLD/);

    // Kuyruktan kaldır → araç alanları gizlenir
    await page.locator('#queue li .ocr-q-remove').click();
    await expect(page.locator('#queue li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
    noErrors();
  });

  test('cancel stops the job (worker.terminate) and a new run works afterwards', async ({ page }) => {
    test.slow();
    test.setTimeout(180_000);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    const files = [];
    for (let i = 1; i <= 4; i++) {
      files.push({ name: `page-${i}.png`, mimeType: 'image/png', buffer: await makeTextPng(page, [`Line ${i} of a long test document`, FOX, FOX], { w: 1600, h: 400 }) });
    }
    await input(page).setInputFiles(files);
    await expect(page.locator('#queue li')).toHaveCount(4);
    await page.locator('#run').click();
    await expect(page.locator('#cancel')).toBeVisible();
    await expect(page.locator('#run')).toBeDisabled();
    await page.locator('#cancel').click();
    await expect(page.locator('#cancel')).toBeHidden();
    await expect(page.locator('#run')).toBeEnabled();
    const cancelledText = await page.locator('#status').textContent() + ' ' + await page.locator('#result-info').textContent();
    expect(cancelledText).toMatch(/Cancelled|Stopped after/);
    await expect(page.locator('#queue li .ocr-q-status').filter({ hasText: 'Cancelled' }).first()).toBeVisible();

    // Yeniden çalıştır: üç dosya kaldırılır, yeni worker oluşturulur ve kalan dosya okunur
    for (let i = 0; i < 3; i++) await page.locator('#queue li .ocr-q-remove').first().click();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 170_000 });
    await expect(page.locator('#result-title')).toHaveText('Text extracted');
    expect(await page.locator('#out').inputValue()).toMatch(/quick brown/i);
    noErrors();
  });

  test('content: 900+ words, 7+ FAQs, 3 ads placed correctly, JSON-LD, hreflang, privacy badge', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL_PATH);
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['en-image-to-text-a', 'en-image-to-text-b', 'en-image-to-text-c']);
    // A araç kutusunun dışında ve altında
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const adA = document.querySelector('[data-slot="en-image-to-text-a"]')!;
      return !!(tool.compareDocumentPosition(adA) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);

    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    const app = ld.find((j) => j['@type'] === 'SoftwareApplication');
    expect(app?.inLanguage).toBe('en');
    expect(app?.url).toBe('https://araclar.bilisimajans.com/en/image-to-text/');
    const faq = ld.find((j) => j['@type'] === 'FAQPage');
    expect(faq?.mainEntity.length).toBe(faqCount);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/image-to-text/');
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/resimden-yaziya/');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/image-to-text/');
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/resimden-yaziya/');
    await expect(page.locator('.ba-badges')).toContainText('Your image never leaves your device');
    await expect(page.locator('h1')).toContainText('Image to Text');
    expect(external).toEqual([]);
  });

  test('dark mode: result warnings and low-confidence rows keep AA contrast', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(URL_PATH);
    // Sonuç alanını OCR çalıştırmadan, kodun kullandığı sınıflarla görünür yap
    await page.evaluate(() => {
      const result = document.getElementById('result')!;
      result.hidden = false; result.classList.add('is-active');
      document.getElementById('warn-low')!.hidden = false;
      document.getElementById('copy-status')!.textContent = 'Text copied to the clipboard.';
      const li = document.createElement('li'); li.className = 'is-low';
      li.innerHTML = '<span class="ocr-conf-name">scan.pdf · page 2</span><span class="ocr-conf-val">42% confidence · 12 words · check this page</span>';
      document.getElementById('page-conf')!.append(li);
    });
    const ratios = await page.evaluate(() => {
      const rgb = (s: string) => (s.match(/[0-9.]+/g) || []).slice(0, 3).map(Number);
      const lum = (c: number[]) => { const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
      const bgOf = (el: Element | null): number[] => { while (el) { const b = getComputedStyle(el).backgroundColor; if (b && b !== 'transparent' && b !== 'rgba(0, 0, 0, 0)') return rgb(b); el = el.parentElement; } return [255, 255, 255]; };
      const ratio = (sel: string) => { const el = document.querySelector(sel)!; const a = lum(rgb(getComputedStyle(el).color)); const b = lum(bgOf(el)); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
      return ['#warn-low', '#page-conf li.is-low .ocr-conf-name', '#page-conf li.is-low .ocr-conf-val', '#copy-status', '#result-info'].map((s) => [s, ratio(s)]);
    });
    for (const [sel, r] of ratios) expect(r as number, `${sel} contrast`).toBeGreaterThanOrEqual(4.5);
  });

  test('image over 4,000 px is scaled down; low-memory devices get a warning', async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(navigator, 'deviceMemory', { get: () => 2 }));
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL_PATH);
    await expect(page.locator('#warn-memory')).toBeHidden();
    const big = await makeTextPng(page, ['Large scan'], { w: 4200, h: 3000, font: 120 });
    await input(page).setInputFiles({ name: 'large-scan.png', mimeType: 'image/png', buffer: big });
    await expect(page.locator('#queue li .meta')).toContainText('4,200×3,000 px');
    await expect(page.locator('#queue li .meta')).toContainText('scaled to 4,000 px for OCR');
    await expect(page.locator('#warn-memory')).toBeVisible();
    await expect(page.locator('#warn-memory')).toContainText('limited memory');
    await page.locator('#clear').click();
    await expect(page.locator('#warn-memory')).toBeHidden();
    noErrors();
  });

  test('360px: no horizontal overflow with long file names; keyboard opens the file chooser', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(URL_PATH);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(await overflow()).toBe(false);

    const png = await makeTextPng(page, ['Mobile layout check'], { w: 900, h: 140 });
    const longName = `${'very-long-file-name-without-any-spaces-'.repeat(4)}scan.png`;
    await page.locator('#drop').focus();
    const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.keyboard.press('Enter')]);
    await chooser.setFiles([
      { name: longName, mimeType: 'image/png', buffer: png },
      { name: `${'unsupported-'.repeat(8)}.docx`, mimeType: 'application/octet-stream', buffer: Buffer.from('x') },
    ]);
    await expect(page.locator('#queue li')).toHaveCount(1);
    await expect(page.locator('#error')).toContainText('not a supported file type');
    await expect(page.locator('#editor')).toBeVisible();
    expect(await overflow()).toBe(false);

    // Klavye: kuyruk öğesi, döndür ve çalıştır düğmelerine sekmeyle ulaşılır
    await page.locator('#queue li .ocr-q-name').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#queue li .ocr-q-remove')).toBeFocused();
    await page.locator('#rotate').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#rotation-label')).toHaveText('90°');
    expect(await overflow()).toBe(false);
    noErrors();
  });
});
