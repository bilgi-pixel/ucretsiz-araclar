import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Online Grafik Oluşturucu', () => {
  test('3 satır veri → PNG iner (imza) ve SVG etiketleri içerir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/grafik-olustur/');
    await page.locator('#f-text').fill('Ocak;12\nŞubat;18,5\nMart;9');
    await page.locator('#apply-text').click();
    await expect(page.locator('#rows li')).toHaveCount(3);
    await page.locator('#opt-title').fill('Satışlar');
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#info')).toContainText('3 satır');

    const [png] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(png.suggestedFilename()).toMatch(/\.png$/);
    const head = readFileSync((await png.path())!).subarray(0, 8);
    expect(Array.from(head)).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    const [svgDl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-svg').click()]);
    expect(svgDl.suggestedFilename()).toMatch(/\.svg$/);
    const svg = readFileSync((await svgDl.path())!, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    for (const t of ['Ocak', 'Şubat', 'Mart', '18,5', 'Satışlar']) expect(svg).toContain(t);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm türler arasında geçiş hatasız, şeffaf PNG ve geçersiz değer uyarısı', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/grafik-olustur/');
    for (const type of ['column', 'bar', 'line', 'pie', 'donut', 'area']) {
      for (const legend of ['alt', 'sag', 'yok']) {
        await page.locator('#opt-type').selectOption(type);
        await page.locator('#opt-legend').selectOption(legend);
        await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');
      }
    }
    await page.locator('#opt-size').selectOption('1080x1080');
    await page.locator('#opt-transparent').check();
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');
    expect(await page.locator('#canvas').evaluate((c: HTMLCanvasElement) => [c.width, c.height])).toEqual([1080, 1080]);
    // Köşe pikseli şeffaf olmalı
    expect(await page.locator('#canvas').evaluate((c: HTMLCanvasElement) => c.getContext('2d')!.getImageData(1, 1, 1, 1).data[3])).toBe(0);

    await page.locator('#f-text').fill('B;5\nA;abc');
    await page.locator('#apply-text').click();
    await expect(page.locator('#warn')).toContainText('sayı değil');
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');
    // Hiç geçerli veri yoksa indirme kapalı ve anlaşılır mesaj
    await page.locator('#clear-rows').click();
    await expect(page.locator('#info')).toContainText('en az bir satır');
    await expect(page.locator('#download-png')).toBeDisabled();
    expect(errors).toEqual([]);
  });

  test('CSV dosyası bırakılınca tabloya dolar; geçersiz dosya Türkçe hata verir', async ({ page }) => {
    await page.goto('/grafik-olustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'veri.csv', mimeType: 'text/csv', buffer: Buffer.from('Ay;Satis\nOcak;1.250,5\nSubat;300\n') });
    await expect(page.locator('#rows li')).toHaveCount(2);
    await expect(page.locator('#rows .r-value').first()).toHaveValue('1.250,5');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'x.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });
    await expect(page.locator('#error')).toContainText('.csv veya .txt');
  });
});
