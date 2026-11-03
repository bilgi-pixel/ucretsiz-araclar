import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

const PARA = 'Şişli\'de çalışan öğrenci, ığdırlı güneşin altında çöpçatan İstanbul\'a gitti; ÇÖĞÜŞİ harfleri doğru basılmalı. ';

function longText(): string {
  const parts: string[] = [];
  for (let i = 1; i <= 40; i++) parts.push(`${i}. paragraf: ${PARA.repeat(6)}\n`);
  return parts.join('\n');
}

test.describe('Metinden PDF', () => {
  test('Türkçe karakterli uzun metin → birden çok sayfa, pdf-lib ile açılır, metin okunur; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/metinden-pdf/');
    await page.locator('#text').fill(longText());
    await expect(page.locator('#estimate')).toContainText('sayfa');
    await page.locator('#opt-title').fill('Öğrenci Raporu İÇİN');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).not.toContainText('?" ile');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('Öğrenci Raporu İÇİN.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBeGreaterThan(1);
    // A4 dikey
    const { width, height } = doc.getPage(0).getSize();
    expect(Math.round(width)).toBe(595);
    expect(Math.round(height)).toBe(842);

    // Metin gerçekten okunuyor mu (pdf.js ile)
    const text = await page.evaluate(async (b64) => {
      const bin = atob(b64); const data = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
      const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
      const d = await pdfjs.getDocument({ data }).promise;
      const c = await (await d.getPage(1)).getTextContent();
      return c.items.map((it: any) => it.str).join(' ');
    }, out.toString('base64'));
    expect(text).toContain('Öğrenci Raporu');
    expect(text).toContain('ÇÖĞÜŞİ');
    expect(text).toContain('ığdırlı');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yatay Letter, sayfa numarasız, .txt dosyası kutuya yüklenir', async ({ page }) => {
    await page.goto('/metinden-pdf/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'not.txt', mimeType: 'text/plain', buffer: Buffer.from('Merhaba dünya, güzel bir gün!\n\nİkinci paragraf.\n', 'utf8') });
    await expect(page.locator('#text')).toHaveValue(/Merhaba dünya/);
    await page.locator('#opt-page').selectOption('letter');
    await page.locator('#opt-orient').selectOption('landscape');
    await page.locator('#opt-numbers').uncheck();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('not.pdf');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(1);
    expect(Math.round(doc.getPage(0).getSize().width)).toBe(792);
  });

  test('boş metin ve ikili dosya → Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/metinden-pdf/');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('Metin kutusu boş');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'belge.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 x') });
    await expect(page.locator('#error')).toContainText('düz metin dosyası değil');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'ikili.txt', mimeType: 'text/plain', buffer: Buffer.from('%PDF-1.4\n\u0000\u0001') });
    await expect(page.locator('#error')).toContainText('metin dosyası gibi görünmüyor');
  });

  test('sayfa yapısı: rozet, reklam araç kutusunda değil, SSS ve içerik yeterli', async ({ page }) => {
    await page.goto('/metinden-pdf/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
