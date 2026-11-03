import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
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

const LIST = 'Zeytinyağı 1 L; 189,90 TL; Soğuk sıkım; 590123412345\nÇiçek balı 450 g; 249,00 TL; Süzme\nTürk kahvesi 250 g; 129,50 TL';

test.describe('Etiket Oluşturucu', () => {
  test('3 satır → PDF iner, ürün adları ve Türkçe karakter metinde; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/etiket-olustur/');
    await page.locator('#list').fill(LIST);
    await page.locator('#cut').check();
    await expect(page.locator('#preview-info')).toContainText('3 etiket');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    expect(dl.suggestedFilename()).toBe('fiyat-etiketleri.pdf');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(0, 5).toString()).toBe('%PDF-');
    const text = await readPdfText(page, buf);
    expect(text).toContain('Zeytinyağı 1 L');
    expect(text).toContain('Çiçek balı 450 g');
    expect(text).toContain('Türk kahvesi 250 g');
    expect(text).toContain('189,90 TL');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('barkodlu etiket: EAN-13 kontrol rakamı eklenir, PDF iner', async ({ page }) => {
    await page.goto('/etiket-olustur/');
    await page.locator('#code-type').selectOption('ean13');
    await page.locator('#list').fill(LIST);
    await page.locator('#repeat').fill('2');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    const buf = readFileSync((await dl.path())!);
    const text = await readPdfText(page, buf);
    expect(text).toContain('5901234123457'); // 590123412345 + kontrol rakamı 7
    expect(text).toContain('Zeytinyağı 1 L');
  });

  test('QR kodlu adres etiketi ve çok sayfa', async ({ page }) => {
    await page.goto('/etiket-olustur/');
    await page.locator('#preset').selectOption('2x4');
    await page.locator('#mode').selectOption('adres');
    await page.locator('#list').fill('Ayşe Yılmaz; Gül Mah. Çiçek Sok. No: 5/3; 21100 Sur / Diyarbakır');
    await page.locator('#repeat').fill('9');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#make-pdf').click()]);
    expect(dl.suggestedFilename()).toBe('adres-etiketleri.pdf');
    const text = await readPdfText(page, readFileSync((await dl.path())!));
    expect(text).toContain('Ayşe Yılmaz');
    expect(text).toContain('Diyarbakır');
    expect(text.split('Ayşe Yılmaz').length - 1).toBe(9);
  });

  test('hatalar Türkçe ve çözüm önerir: geçersiz EAN, boş liste, taşan ızgara', async ({ page }) => {
    await page.goto('/etiket-olustur/');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Etiket listesi boş');
    await page.locator('#code-type').selectOption('ean13');
    await page.locator('#list').fill('Ürün; 10 TL; açıklama; ABC123');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('EAN-13 yalnızca rakam kabul eder');
    await page.locator('#list').fill('Ürün; 10 TL; açıklama; 5901234123458');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('kontrol basamağı hatalı');
    await page.locator('.ds-more summary').click();
    await page.locator('#p-cols').fill('4');
    await page.locator('#p-w').fill('70');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('A4 genişliğini');
  });
});
