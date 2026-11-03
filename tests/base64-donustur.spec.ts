import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// pngjs ile 4x4 kırmızı PNG üretilir.
function makePng(): Buffer {
  const png = new PNG({ width: 4, height: 4 });
  for (let i = 0; i < png.data.length; i += 4) { png.data[i] = 220; png.data[i + 1] = 20; png.data[i + 2] = 60; png.data[i + 3] = 255; }
  return PNG.sync.write(png);
}

test.describe('Base64 Kodla / Çöz', () => {
  test('Türkçe metin ↔ Base64, URL-safe, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/base64-donustur/');
    const text = 'Türkçe ğüşiöç';
    const expected = Buffer.from(text, 'utf8').toString('base64');
    await page.locator('#t-input').fill(text);
    await page.locator('#t-encode').click();
    await expect(page.locator('#t-output')).toHaveValue(expected);
    // Geri çözme
    await page.locator('#t-input').fill(expected);
    await page.locator('#t-decode').click();
    await expect(page.locator('#t-output')).toHaveValue(text);
    // URL-safe: + / = içermeyen çıktı
    const tricky = '???>>>~~~ ğ';
    await page.locator('#t-input').fill(tricky);
    await page.locator('#t-urlsafe').check();
    await page.locator('#t-encode').click();
    const safe = Buffer.from(tricky, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    await expect(page.locator('#t-output')).toHaveValue(safe);
    // URL-safe çıktı da çözülür
    await page.locator('#t-input').fill(safe);
    await page.locator('#t-decode').click();
    await expect(page.locator('#t-output')).toHaveValue(tricky);
    expect(external).toEqual([]);
    noErrors();
  });

  test('geçersiz Base64 Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/base64-donustur/');
    await page.locator('#t-input').fill('bu base64 değil!!');
    await page.locator('#t-decode').click();
    await expect(page.locator('#error')).toContainText('Geçersiz Base64');
    await expect(page.locator('#error')).toContainText('eksiksiz kopyalandığından');
    // Metin olmayan içerik dosya sekmesine yönlendirir
    await page.locator('#t-input').fill(Buffer.from([0xff, 0xfe, 0xfd, 0x80]).toString('base64'));
    await page.locator('#t-decode').click();
    await expect(page.locator('#error')).toContainText('Base64 → Dosya');
  });

  test('PNG dosyası → data:image/png;base64, önizleme ve snippet', async ({ page }) => {
    await page.goto('/base64-donustur/');
    await page.getByRole('tab', { name: 'Dosya → Base64' }).click();
    const buf = makePng();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'kirmizi.png', mimeType: 'image/png', buffer: buf });
    await expect(page.locator('#f-result')).toBeVisible();
    const expected = `data:image/png;base64,${buf.toString('base64')}`;
    await expect(page.locator('#f-output')).toHaveValue(expected);
    await expect(page.locator('#f-img-box')).toBeVisible();
    await expect(page.locator('#f-preview')).toHaveAttribute('src', expected);
    await expect.poll(() => page.locator('#f-preview').evaluate((i: HTMLImageElement) => i.naturalWidth)).toBe(4);
    await expect(page.locator('#f-snip-img')).toHaveValue(`<img src="${expected}" alt="">`);
    await expect(page.locator('#f-snip-css')).toHaveValue(`background-image: url("${expected}");`);
    await page.locator('#f-raw').check();
    await expect(page.locator('#f-output')).toHaveValue(buf.toString('base64'));
  });

  test('Base64 çözme → dosya iner (MIME tahmini ile uzantı)', async ({ page }) => {
    await page.goto('/base64-donustur/');
    await page.getByRole('tab', { name: 'Base64 → Dosya' }).click();
    const buf = makePng();
    // Önek olmadan: PNG imzasından tahmin edilmeli
    await page.locator('#d-input').fill(buf.toString('base64'));
    await expect(page.locator('#d-info')).toContainText('image/png');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#d-download').click()]);
    expect(dl.suggestedFilename()).toBe('dosya.png');
    expect(readFileSync((await dl.path())!).equals(buf)).toBe(true);
    // Önekli ve adlı
    await page.locator('#d-input').fill(`data:application/pdf;base64,${Buffer.from('%PDF-1.4 test').toString('base64')}`);
    await page.locator('#d-name').fill('rapor');
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#d-download').click()]);
    expect(dl2.suggestedFilename()).toBe('rapor.pdf');
  });

  test('hex ve URL kodlama', async ({ page }) => {
    await page.goto('/base64-donustur/');
    await page.getByRole('tab', { name: 'Hex / URL' }).click();
    await page.locator('#h-input').fill('Türkçe');
    await page.locator('#h-hex-enc').click();
    await expect(page.locator('#h-output')).toHaveValue('54 c3 bc 72 6b c3 a7 65');
    await page.locator('#h-input').fill('54 c3 bc 72 6b c3 a7 65');
    await page.locator('#h-hex-dec').click();
    await expect(page.locator('#h-output')).toHaveValue('Türkçe');
    await page.locator('#h-input').fill('ğ ş?');
    await page.locator('#h-url-enc').click();
    await expect(page.locator('#h-output')).toHaveValue('%C4%9F%20%C5%9F%3F');
    await page.locator('#h-input').fill('%C4%9F%20%C5%9F%3F');
    await page.locator('#h-url-dec').click();
    await expect(page.locator('#h-output')).toHaveValue('ğ ş?');
    await page.locator('#h-input').fill('abc');
    await page.locator('#h-hex-dec').click();
    await expect(page.locator('#error')).toContainText('Geçersiz hex');
  });

  test('5 MB üstü dosyada uyarı gösterilir', async ({ page }) => {
    await page.goto('/base64-donustur/');
    await page.getByRole('tab', { name: 'Dosya → Base64' }).click();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'buyuk.bin', mimeType: 'application/octet-stream', buffer: Buffer.alloc(5 * 1024 * 1024 + 10, 1) });
    await expect(page.locator('#warning')).toContainText('5 MB üstü');
    await expect(page.locator('#f-result')).toBeVisible({ timeout: 20000 });
  });
});
