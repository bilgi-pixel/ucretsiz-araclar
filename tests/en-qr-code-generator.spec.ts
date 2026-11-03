import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('QR Code Generator (EN)', () => {
  test('typing a URL enables PNG download, no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/en/qr-code-generator/');
    await expect(page.locator('#qr-canvas')).toBeHidden();
    await page.locator('#f-url').fill('https://bilisimajans.com/');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#qr-info')).toContainText('error correction M');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(dl.suggestedFilename()).toBe('qr-bilisimajans-com.png');
    expect(Array.from(readFileSync((await dl.path())!).subarray(0, 8))).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Wi-Fi form shows an English error without a password, then downloads SVG', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/en/qr-code-generator/');
    await page.locator('#qr-type').selectOption('wifi');
    await expect(page.locator('#f-wifi-ssid')).toBeVisible();
    await expect(page.locator('#f-url')).toBeHidden();
    await page.locator('#f-wifi-ssid').fill('Office Net');
    await expect(page.locator('#error')).toContainText('Enter the password');
    await page.locator('#f-wifi-pass').fill('secret1234');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#error')).toBeHidden();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-svg').click()]);
    expect(dl.suggestedFilename()).toBe('qr-office-net.svg');
    const svg = readFileSync((await dl.path())!, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(external).toEqual([]);
  });

  test('adding a logo switches to level H and the SVG embeds the logo', async ({ page }) => {
    await page.goto('/en/qr-code-generator/');
    await page.locator('#f-url').fill('https://araclar.bilisimajans.com/en/');
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

  test('low contrast and overly long text show English warnings', async ({ page }) => {
    await page.goto('/en/qr-code-generator/');
    await page.locator('#f-url').fill('hello');
    await page.locator('#opt-fg').fill('#eeeeee');
    await expect(page.locator('#warn-contrast')).toBeVisible();
    await expect(page.locator('#warn-contrast')).toContainText(/Low contrast|inverted/);
    await page.locator('#opt-fg').fill('#000000');
    await expect(page.locator('#warn-contrast')).toBeHidden();
    await page.locator('#f-url').fill('x'.repeat(5000));
    await expect(page.locator('#error')).toContainText('too long');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '0');
  });

  test('WhatsApp number without a country code is rejected helpfully', async ({ page }) => {
    await page.goto('/en/qr-code-generator/');
    await page.locator('#qr-type').selectOption('whatsapp');
    await page.locator('#f-wa-tel').fill('12345');
    await expect(page.locator('#error')).toContainText('country code');
    await page.locator('#f-wa-tel').fill('+44 7700 900123');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
  });

  test('page integrity: English metadata, ads outside tool box, 800+ words, 6+ FAQ', async ({ page }) => {
    await page.goto('/en/qr-code-generator/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/qr-code-generator/');
    await expect(page.locator('link[hreflang=tr]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/qr-kod/');
    await expect(page.locator('.ba-badges')).toContainText('Files never leave your device');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
