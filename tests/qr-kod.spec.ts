import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('QR Kod Oluşturucu', () => {
  test('URL yazınca PNG iner, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/qr-kod/');
    await expect(page.locator('#qr-canvas')).toBeHidden();
    await page.locator('#f-url').fill('https://bilisimajans.com/');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#qr-info')).toContainText('hata düzeltme M');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(dl.suggestedFilename()).toBe('qr-bilisimajans-com.png');
    const head = readFileSync((await dl.path())!).subarray(0, 8);
    expect(Array.from(head)).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Wi-Fi formu → SVG içeriği <svg ile başlar', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/qr-kod/');
    await page.locator('#qr-type').selectOption('wifi');
    await expect(page.locator('#f-wifi-ssid')).toBeVisible();
    await expect(page.locator('#f-url')).toBeHidden();
    await page.locator('#f-wifi-ssid').fill('Ofis Ağı');
    // şifre boşken anlaşılır hata
    await expect(page.locator('#error')).toContainText('şifreyi girin');
    await page.locator('#f-wifi-pass').fill('gizli1234');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#error')).toBeHidden();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-svg').click()]);
    expect(dl.suggestedFilename()).toBe('qr-ofis-ağı.svg');
    const svg = readFileSync((await dl.path())!, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(external).toEqual([]);
  });

  test('logo eklenince H seviyesine geçer ve SVG logoyu gömer', async ({ page }) => {
    await page.goto('/qr-kod/');
    await page.locator('#f-url').fill('https://araclar.bilisimajans.com/');
    await page.locator('#opt-ecl').selectOption('L');
    await page.locator('#logo-drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#logo-name')).toHaveText('fotoğraf-ş.png');
    await expect(page.locator('#opt-ecl')).toHaveValue('H');
    await page.locator('#opt-ecl').selectOption('M');
    await expect(page.locator('#warn-logo')).toBeVisible();
    await page.locator('#opt-ecl').selectOption('H');
    await expect(page.locator('#warn-logo')).toBeHidden();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-svg').click()]);
    const svg = readFileSync((await dl.path())!, 'utf8');
    expect(svg).toContain('<image');
    expect(svg).toContain('data:image/png;base64');
  });

  test('düşük kontrast ve aşırı uzun metin uyarır', async ({ page }) => {
    await page.goto('/qr-kod/');
    await page.locator('#f-url').fill('merhaba');
    await page.locator('#opt-fg').fill('#eeeeee');
    await expect(page.locator('#warn-contrast')).toBeVisible();
    await expect(page.locator('#warn-contrast')).toContainText(/Kontrast düşük|ters/);
    await page.locator('#opt-fg').fill('#000000');
    await expect(page.locator('#warn-contrast')).toBeHidden();
    await page.locator('#f-url').fill('x'.repeat(5000));
    await expect(page.locator('#error')).toContainText('fazla uzun');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '0');
  });
});
