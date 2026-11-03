import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

const SAMPLE = 'Işık ve gölge. Bahçe ve ışık için bahçe, bahçe ile ışık; Türkiye\'de bahçe, Türkiye\'nin ışığı. Kitap ve defter bir masa.';

test.describe('Kelime Bulutu Oluşturucu', () => {
  test('metin → en sık kelime doğru, "ve" elenir; PNG ve CSV iner; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kelime-bulutu/');
    await expect(page.locator('#generate')).toBeDisabled();
    await page.locator('#text').fill(SAMPLE);
    const rows = page.locator('#freq-body tr');
    await expect(rows.first()).toBeVisible();
    await expect(rows.first().locator('td').nth(1)).toHaveText('bahçe');
    await expect(rows.first().locator('td').nth(2)).toHaveText('4');
    // "ışık" 4 kez (Işık, ışık, ışık, ışığı değil → 3) ve kesme eki "türkiye" birleşir
    const body = await page.locator('#freq-body').innerText();
    expect(body).toMatch(/türkiye\s+2/);
    expect(body).not.toMatch(/\bve\b/);
    expect(body).not.toMatch(/\bbir\b/);

    // Etkisiz kelime filtresi kapanınca "ve" görünür
    await page.locator('#opt-stop').uncheck();
    await expect(page.locator('#freq-body')).toContainText('ve');
    await page.locator('#opt-stop').check();
    await expect(page.locator('#freq-body')).not.toContainText(/\bve\b/);

    await page.locator('#generate').click();
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#cloud-info')).toContainText('kelime yerleşti');
    await expect(page.locator('#download-png')).toBeEnabled();
    const [png] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(png.suggestedFilename()).toBe('kelime-bulutu.png');
    const head = readFileSync((await png.path())!).subarray(0, 8);
    expect(Array.from(head)).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    const [csv] = await Promise.all([page.waitForEvent('download'), page.locator('#download-csv').click()]);
    expect(csv.suggestedFilename()).toBe('kelime-sikligi.csv');
    const text = readFileSync((await csv.path())!, 'utf8');
    expect(text).toContain('kelime;adet;oran');
    expect(text).toContain('"bahçe";4;');
    expect(text).not.toContain('"ve";');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('daire şekli, el yazısı ve karışık açılarla bulut çizilir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kelime-bulutu/');
    const words = Array.from({ length: 40 }, (_, i) => `kelime${String.fromCharCode(97 + (i % 26))}${i} `.repeat(1 + (i % 7))).join(' ');
    await page.locator('#text').fill(words);
    await page.locator('#opt-shape').selectOption('circle');
    await page.locator('#opt-font').selectOption('caveat');
    await page.locator('#opt-rotate').selectOption('mixed');
    await page.locator('#opt-size').selectOption('800x600');
    await page.locator('#generate').click();
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1', { timeout: 30000 });
    // Daire dışındaki köşe boş (beyaz) kalmalı
    const px = await page.locator('#canvas').evaluate((c: HTMLCanvasElement) => Array.from(c.getContext('2d')!.getImageData(3, 3, 1, 1).data));
    expect(px).toEqual([255, 255, 255, 255]);
    expect(errors).toEqual([]);
  });

  test('geçersiz dosya ve boş sonuç anlaşılır Türkçe hata verir', async ({ page }) => {
    await page.goto('/kelime-bulutu/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'a.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });
    await expect(page.locator('#error')).toContainText('.txt');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'a.txt', mimeType: 'text/plain', buffer: Buffer.from('Bahçe bahçe bahçe ve ile') });
    await expect(page.locator('#freq-body tr').first()).toBeVisible();
    await page.locator('#opt-minlen').fill('20');
    await expect(page.locator('#error')).toContainText('kelime kalmadı');
    await expect(page.locator('#generate')).toBeDisabled();
  });

  test('1 MB üzeri metinde uyarı gösterilir', async ({ page }) => {
    await page.goto('/kelime-bulutu/');
    const big = 'merhaba dünya güzel '.repeat(60000); // ~1,2 MB
    await page.locator('#text').fill(big);
    await expect(page.locator('#warn')).toContainText('MB');
    await expect(page.locator('#freq-body tr').first().locator('td').nth(1)).toHaveText('dünya');
  });
});
