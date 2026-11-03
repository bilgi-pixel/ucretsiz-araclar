import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** Sayfa içinde vendor qrcode kütüphanesiyle QR PNG üretir (base64, önek yok). */
async function makeQrPng(page: Page, text: string): Promise<Buffer> {
  const b64 = await page.evaluate(async (t) => {
    if (!(window as any).QRCode) {
      await new Promise<void>((res, rej) => {
        const s = document.createElement('script');
        s.src = '/vendor/qrcode@1.5.1/qrcode.min.js';
        s.onload = () => res();
        s.onerror = () => rej(new Error('qrcode yüklenemedi'));
        document.head.appendChild(s);
      });
    }
    const url: string = await (window as any).QRCode.toDataURL(t, { width: 320, margin: 4, errorCorrectionLevel: 'M' });
    return url.split(',')[1];
  }, text);
  return Buffer.from(b64, 'base64');
}

test.describe('QR Kod Okuyucu', () => {
  test('URL QR resmi → tür URL, adres görünür, otomatik yönlendirme yok, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/qr-kod-oku/');
    await expect(page.locator('#result')).toBeHidden();

    const png = await makeQrPng(page, 'https://bilisimajans.com/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'site-qr.png', mimeType: 'image/png', buffer: png });

    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveAttribute('data-type', 'url');
    await expect(page.locator('#result-type')).toHaveText('URL');
    await expect(page.locator('#result-main')).toHaveText('https://bilisimajans.com/');
    const open = page.locator('#open-link');
    await expect(open).toBeVisible();
    await expect(open).toHaveAttribute('href', 'https://bilisimajans.com/');
    await expect(open).toHaveAttribute('rel', /noopener/);
    await expect(open).toHaveAttribute('target', '_blank');
    // kimlik avı uyarısı: alan adı gösterilir
    await expect(page.locator('#result-warn')).toContainText('bilisimajans.com');
    await expect(page.locator('#error')).toBeHidden();
    // sayfa aynı yerde kaldı (yönlendirme yok)
    expect(new URL(page.url()).pathname).toBe('/qr-kod-oku/');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('QR içermeyen fotoğraf → "QR kod bulunamadı" ve ipuçları', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/qr-kod-oku/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('QR kod bulunamadı');
    await expect(page.locator('#tips')).toBeVisible();
    await expect(page.locator('#tips')).toContainText('kırpın');
    await expect(page.locator('#result')).toBeHidden();
    expect(external).toEqual([]);
  });

  test('Wi-Fi QR → SSID ve gizli şifre; Göster ile açılır', async ({ page }) => {
    await page.goto('/qr-kod-oku/');
    const png = await makeQrPng(page, 'WIFI:T:WPA;S:Ofis\\;Ağı;P:gizli1234;;');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'wifi.png', mimeType: 'image/png', buffer: png });
    await expect(page.locator('#result')).toHaveAttribute('data-type', 'wifi');
    await expect(page.locator('#result-type')).toHaveText('Wi-Fi ağı');
    await expect(page.locator('#result-main')).toHaveText('Ofis;Ağı');
    const pass = page.locator('#wifi-pass');
    await expect(pass).not.toHaveText('gizli1234');
    await page.locator('#pass-toggle').click();
    await expect(pass).toHaveText('gizli1234');
    await expect(page.locator('#pass-toggle')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#open-link')).toBeHidden();
  });

  test('vCard QR → alanlar ve .vcf indirme', async ({ page }) => {
    await page.goto('/qr-kod-oku/');
    const vcard = 'BEGIN:VCARD\nVERSION:3.0\nN:Yılmaz;Ayşe;;;\nFN:Ayşe Yılmaz\nORG:Bilişim Ajans\nTEL;TYPE=CELL:+905320000000\nEMAIL:ayse@firma.com\nEND:VCARD';
    const png = await makeQrPng(page, vcard);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'kart.png', mimeType: 'image/png', buffer: png });
    await expect(page.locator('#result')).toHaveAttribute('data-type', 'vcard');
    await expect(page.locator('#result-fields')).toContainText('Ayşe Yılmaz');
    await expect(page.locator('#result-fields')).toContainText('+905320000000');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-vcf').click()]);
    expect(dl.suggestedFilename()).toBe('ayşe-yılmaz.vcf');
    const vcf = readFileSync((await dl.path())!, 'utf8');
    expect(vcf).toContain('BEGIN:VCARD');
    expect(vcf).toContain('FN:Ayşe Yılmaz');
  });

  test('panoya yapıştırılan resim okunur, kısaltılmış http bağlantı uyarır', async ({ page }) => {
    await page.goto('/qr-kod-oku/');
    const png = await makeQrPng(page, 'http://bit.ly/abc123');
    await page.evaluate((b64) => {
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const file = new File([bytes], 'ekran.png', { type: 'image/png' });
      const dt = new DataTransfer();
      dt.items.add(file);
      document.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
    }, png.toString('base64'));
    await expect(page.locator('#result')).toHaveAttribute('data-type', 'url');
    await expect(page.locator('#result-warn')).toContainText('şifresiz');
    await expect(page.locator('#result-warn')).toContainText('kısaltılmış');
  });

  test('PDF ilk sayfasındaki QR okunur', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/qr-kod-oku/');
    const png = await makeQrPng(page, 'https://araclar.bilisimajans.com/');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.create();
    const img = await doc.embedPng(png);
    const pg = doc.addPage([595, 842]);
    pg.drawImage(img, { x: 150, y: 400, width: 240, height: 240 });
    const pdf = Buffer.from(await doc.save());
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'fatura.pdf', mimeType: 'application/pdf', buffer: pdf });
    await expect(page.locator('#result')).toHaveAttribute('data-type', 'url', { timeout: 20_000 });
    await expect(page.locator('#result-main')).toHaveText('https://araclar.bilisimajans.com/');
    await expect(page.locator('#result-source')).toContainText('PDF');
    expect(external).toEqual([]);
  });

  test('bozuk PDF → çözüm öneren Türkçe hata', async ({ page }) => {
    await page.goto('/qr-kod-oku/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF değil|şifreli/);
  });

  test('resim olmayan dosya → Türkçe hata', async ({ page }) => {
    await page.goto('/qr-kod-oku/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'notlar.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba') });
    await expect(page.locator('#error')).toContainText('resim ya da PDF değil');
  });
});
