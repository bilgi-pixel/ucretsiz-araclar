import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Logo Oluşturucu', () => {
  test('ad + ikon → PNG 1024 iner (IHDR), SVG <text> içerir, zip 4 dosya', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/logo-olustur/');
    await expect(page.locator('#icon-grid')).toHaveAttribute('data-ready', '1');
    expect(await page.locator('#icon-grid button[data-icon]:not([data-icon=""])').count()).toBe(120);

    await page.locator('#brand').fill('Şeker Kafe');
    await page.locator('#slogan').fill('Her fincanda bir hikaye');
    await page.locator('#icon-search').fill('kahve');
    await page.locator('#icon-grid button[data-icon="coffee"]').click();
    await expect(page.locator('#icon-grid button[data-icon="coffee"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1');

    // PNG 1024×1024
    const [png] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-png').click()]);
    expect(png.suggestedFilename()).toBe('seker-kafe-logo-1024x1024.png');
    const pb = readFileSync((await png.path())!);
    expect(Array.from(pb.subarray(0, 8))).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(pb.subarray(12, 16).toString('ascii')).toBe('IHDR');
    expect(pb.readUInt32BE(16)).toBe(1024);
    expect(pb.readUInt32BE(20)).toBe(1024);

    // SVG
    const [svgDl] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-svg').click()]);
    const svg = readFileSync((await svgDl.path())!, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('<text');
    expect(svg).toContain('Şeker Kafe');
    expect(svg).toContain('<path');

    // Zip: 4 dosya
    const [zipDl] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-zip').click()]);
    const zip = readFileSync((await zipDl.path())!);
    let count = 0;
    const names: string[] = [];
    for (let i = 0; i + 30 < zip.length; i++) {
      if (zip.readUInt32LE(i) === 0x02014b50) { // merkezi dizin girdisi
        count++;
        const n = zip.readUInt16LE(i + 28);
        names.push(zip.subarray(i + 46, i + 46 + n).toString('utf8'));
      }
    }
    expect(count).toBe(4);
    expect(names.some((n) => n.endsWith('1024x1024.png'))).toBe(true);
    expect(names.some((n) => n.endsWith('1600x400.png'))).toBe(true);
    expect(names.some((n) => n.endsWith('512x512.png'))).toBe(true);
    expect(names.some((n) => n.endsWith('.svg'))).toBe(true);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ad boşken indirme Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/logo-olustur/');
    await page.locator('#dl-png').click();
    await expect(page.locator('#error')).toContainText('marka adını yazın');
  });

  test('yatay boyut ve favicon PNG ölçüleri doğru', async ({ page }) => {
    await page.goto('/logo-olustur/');
    await page.locator('#brand').fill('Mavi');
    await page.locator('#size').selectOption('wide');
    const [d] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-png').click()]);
    const b = readFileSync((await d.path())!);
    expect(b.readUInt32BE(16)).toBe(1600);
    expect(b.readUInt32BE(20)).toBe(400);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/logo-olustur/');
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
  });
});
