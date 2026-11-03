import { test, expect, Page } from '@playwright/test';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

async function readPdfText(page: Page, buf: Buffer): Promise<string> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const d = await pdfjs.getDocument({ data }).promise;
    let out = '';
    for (let i = 1; i <= d.numPages; i++) {
      const c = await (await d.getPage(i)).getTextContent();
      out += c.items.map((it: any) => it.str).join(' ') + '\n';
    }
    return out;
  }, buf.toString('base64'));
}

async function setup(page: Page) {
  await page.goto('/vardiya-cizelgesi/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('#f-month').fill('2026-11');
  await page.locator('#f-emps').fill('Ayşe Yılmaz\nMehmet Öztürk\nÇağrı Şahin');
}

const cell = (page: Page, e: number, d: number) => page.locator(`#grid button.cell[data-e="${e}"][data-d="${d}"]`);

test.describe('Vardiya Çizelgesi', () => {
  test('3 çalışan + rotasyon → kodlar tabloda; PDF iner, ad ve Türkçe metin var; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await setup(page);
    await page.locator('#apply-rotation').click();
    // Kaydırma 2: kişi 0 → S, kişi 1 → A, kişi 2 → G (1. gün); 3. gün: S→A, A→G, G→İ ...
    await expect(cell(page, 0, 1)).toHaveText('S');
    await expect(cell(page, 1, 1)).toHaveText('A');
    await expect(cell(page, 2, 1)).toHaveText('G');
    await expect(cell(page, 0, 3)).toHaveText('A');
    await expect(cell(page, 2, 3)).toHaveText('İ');
    await expect(cell(page, 0, 1)).toHaveAttribute('aria-label', 'Ayşe Yılmaz, 1 Kasım: Sabah');
    // Toplam saat sütunu dolu
    await expect(page.locator('#grid tbody tr').first().locator('td.tot').first()).not.toHaveText('');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    expect(dl.suggestedFilename()).toBe('vardiya-çizelgesi-2026-11.pdf');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(0, 5).toString()).toBe('%PDF-');
    const text = await readPdfText(page, buf);
    expect(text).toContain('Vardiya Çizelgesi');
    expect(text).toContain('Kasım 2026');
    expect(text).toContain('Ayşe Yılmaz');
    expect(text).toContain('Çağrı Şahin');
    expect(text).toContain('Mehmet Öztürk');
    expect(text).toContain('İzin');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('hücre tıklama döngüsü, uyarılar ve PNG', async ({ page }) => {
    await setup(page);
    const c = cell(page, 0, 5);
    await c.click(); await expect(c).toHaveText('S');
    await c.click(); await expect(c).toHaveText('A');
    await c.click(); await expect(c).toHaveText('G');
    await c.click(); await expect(c).toHaveText('İ');
    await c.click(); await expect(c).toHaveText('');
    // Gece vardiyasını 9 saate uzat → uyarı
    await page.locator('#t-G-start').fill('22:00');
    await page.locator('#t-G-end').fill('07:00');
    await expect(page.locator('#warnings')).toContainText('md. 69');
    // Kaydırma 0 ve rotasyon: 6 gün ardışık S → haftalık 45 saati aşmaz ama izin uyarısı verir
    await page.locator('#f-pattern').fill('S');
    await page.locator('#apply-rotation').click();
    await expect(page.locator('#warnings')).toContainText('izin günü yok');
    await page.locator('#f-fix').check();
    await page.locator('#apply-rotation').click();
    await expect(page.locator('#warnings')).not.toContainText('izin günü yok');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-png').click()]);
    const head = readFileSync((await dl.path())!).subarray(0, 8);
    expect(Array.from(head)).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  });

  test('JSON kaydet ve yükle; bozuk JSON ve hatalı rotasyon Türkçe hata verir', async ({ page }) => {
    await setup(page);
    await page.locator('#apply-rotation').click();
    await cell(page, 1, 10).click(); // elle değişiklik
    const expected = await cell(page, 1, 10).textContent();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#save-json').click()]);
    const file = (await dl.path())!;
    const json = JSON.parse(readFileSync(file, 'utf8'));
    expect(json.emps).toContain('Çağrı Şahin');
    expect(json.month).toBe('2026-11');

    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('#f-emps')).toHaveValue('');
    await page.locator('#json-drop input[type=file]').setInputFiles(file);
    await expect(page.locator('#f-emps')).toHaveValue(/Ayşe Yılmaz\nMehmet Öztürk\nÇağrı Şahin/);
    await expect(cell(page, 1, 10)).toHaveText(expected || '');
    await expect(cell(page, 0, 1)).toHaveText('S');

    const bad = join(mkdtempSync(join(tmpdir(), 'vardiya-')), 'bozuk.json');
    writeFileSync(bad, '{ bu json degil');
    await page.locator('#json-drop input[type=file]').setInputFiles(bad);
    await expect(page.locator('#error')).toContainText('vardiya çizelgesi kaydı değil');

    await page.locator('#f-pattern').fill('S,X,A');
    await page.locator('#apply-rotation').click();
    await expect(page.locator('#error')).toContainText('tanınmayan kod');
  });

  test('boş çalışan listesi ve boş çizelge için Türkçe uyarı; taslak yenilemede geri gelir', async ({ page }) => {
    await page.goto('/vardiya-cizelgesi/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Çalışan listesi boş');
    await page.locator('#f-emps').fill('Ayşe Yılmaz');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('hiç vardiya yok');
    await cell(page, 0, 2).click();
    await page.waitForTimeout(700); // otomatik kayıt gecikmesi
    await page.reload();
    await expect(page.locator('#f-emps')).toHaveValue('Ayşe Yılmaz');
    await expect(cell(page, 0, 2)).toHaveText('S');
  });
});
