import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

/** İndirilen PDF'in ilk sayfasının metnini pdf.js ile okur. */
async function firstPageText(page: Page, pdf: Buffer): Promise<string> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const d = await pdfjs.getDocument({ data }).promise;
    const c = await (await d.getPage(1)).getTextContent();
    return c.items.map((it: any) => it.str).join(' | ');
  }, pdf.toString('base64'));
}

test.describe('Yazdırılabilir Takvim', () => {
  test('2026 aylık → 12 sayfalı PDF, Ocak sayfasında "Ocak 2026" ve gün numaraları; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/takvim-olustur/');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1', { timeout: 30_000 });
    await expect(page.locator('#opt-year')).toHaveValue('2026');
    await expect(page.locator('#info')).toContainText('12 sayfa');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('takvim-2026-aylik.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(12);
    const text = await firstPageText(page, out);
    expect(text).toContain('Ocak 2026');
    expect(text.split(' | ')).toContain('1');
    expect(text).toContain('Yılbaşı');
    expect(text).toContain('Pazartesi');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yıllık → tek sayfa; 2027 için Diyanet uyarısı görünür', async ({ page }) => {
    await page.goto('/takvim-olustur/');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1', { timeout: 30_000 });
    await page.locator('#opt-type').selectOption('yillik');
    await page.locator('#opt-year').selectOption('2027');
    await page.locator('#opt-title').fill('Şişli Öğrenci Kursu');
    await expect(page.locator('#note-year')).toBeVisible();
    await expect(page.locator('#info')).toContainText('1 sayfa', { timeout: 30_000 });
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('takvim-2027-yillik.pdf');
    const out = readFileSync((await dl.path())!);
    const { PDFDocument } = await import('pdf-lib');
    expect((await PDFDocument.load(out)).getPageCount()).toBe(1);
    const text = await firstPageText(page, out);
    expect(text).toContain('Şişli Öğrenci Kursu');
    expect(text).toContain('Şubat');
  });

  test('haftalık planlayıcı 53 sayfa üretir (2026)', async ({ page }) => {
    await page.goto('/takvim-olustur/');
    await page.locator('#opt-type').selectOption('haftalik');
    await page.locator('#opt-weeknums').check();
    await expect(page.locator('#info')).toContainText('53 sayfa', { timeout: 30_000 });
  });

  test('geçersiz yıl anlaşılır hata verir ve indirme kapanır', async ({ page }) => {
    await page.goto('/takvim-olustur/');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1', { timeout: 30_000 });
    await page.evaluate(() => {
      const sel = document.getElementById('opt-year') as HTMLSelectElement;
      const op = document.createElement('option'); op.value = '1850'; op.textContent = '1850'; sel.appendChild(op);
      sel.value = '1850'; sel.dispatchEvent(new Event('change'));
    });
    await expect(page.locator('#error')).toContainText('2025 ile 2030');
    await expect(page.locator('#download')).toBeDisabled();
  });
});
