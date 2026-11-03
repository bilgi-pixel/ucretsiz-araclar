import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

const alphaAt = (png: PNG, x: number, y: number) => png.data[(y * png.width + x) * 4 + 3];

test.describe('Online İmza Oluşturucu', () => {
  test('çizim → kırpılmış şeffaf PNG iner', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/imza-olustur/');
    // e-imza uyarısı belirgin biçimde sayfada
    await expect(page.locator('#legal-note')).toContainText('e-imza değildir');
    await expect(page.locator('a[href="../pdf-imzala/"]').first()).toBeAttached();

    await page.locator('#pad').evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    const box = (await page.locator('#pad').boundingBox())!;
    const at = (fx: number, fy: number) => [box.x + box.width * fx, box.y + box.height * fy] as const;
    await page.mouse.move(...at(0.2, 0.5));
    await page.mouse.down();
    for (let i = 1; i <= 12; i++) await page.mouse.move(...at(0.2 + i * 0.05, 0.5 + Math.sin(i) * 0.15));
    await page.mouse.up();
    await expect(page.locator('#undo')).toBeEnabled();

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('imza.png');
    const png = PNG.sync.read(readFileSync((await dl.path())!));
    // kırpıldı: tuvalden (1000x360) belirgin küçük
    expect(png.width).toBeLessThan(1000);
    expect(png.height).toBeLessThan(360);
    // köşeler şeffaf
    expect(alphaAt(png, 0, 0)).toBe(0);
    expect(alphaAt(png, png.width - 1, png.height - 1)).toBe(0);
    // çizgi pikselleri opak
    let opaque = 0;
    for (let i = 3; i < png.data.length; i += 4) if (png.data[i] === 255) opaque++;
    expect(opaque).toBeGreaterThan(200);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('boş tuvalde indirme anlaşılır hata verir; geri al ve temizle çalışır', async ({ page }) => {
    await page.goto('/imza-olustur/');
    await page.locator('#download').click();
    await expect(page.locator('#error')).toContainText('imza çizmediniz');
    await page.locator('#pad').evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    const box = (await page.locator('#pad').boundingBox())!;
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + 120, box.y + 90);
    await page.mouse.up();
    await page.locator('#undo').click();
    await expect(page.locator('#undo')).toBeDisabled();
    await expect(page.locator('#pad-empty')).toBeVisible();
  });

  test('yazarak: el yazısı yazı tipi yüklenir ve PNG iner (Türkçe karakter)', async ({ page }) => {
    const external = trackExternalRequests(page);
    const fontReqs: string[] = [];
    page.on('request', (r) => { if (/\.woff2$/.test(r.url()) && /vendor\/fonts/.test(r.url())) fontReqs.push(r.url()); });
    await page.goto('/imza-olustur/');
    await page.locator('#mode-type').click();
    await expect(page.locator('#panel-type')).toBeVisible();
    // ad yokken hata
    await page.locator('#download').click();
    await expect(page.locator('#error')).toContainText('Ad soyad alanı boş');

    await page.locator('#type-name').fill('Şükrü Çağlayan');
    await page.locator('label.im-font', { hasText: 'Great Vibes' }).click();
    await expect(page.locator('#type-canvas')).toHaveAttribute('data-ready', '1');
    const loaded = await page.evaluate(async () => {
      await document.fonts.load('96px "Great Vibes"', 'Şükrü');
      return document.fonts.check('96px "Great Vibes"', 'Şükrü');
    });
    expect(loaded).toBe(true);
    expect(fontReqs.length).toBeGreaterThan(0);

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const png = PNG.sync.read(readFileSync((await dl.path())!));
    expect(png.width).toBeGreaterThan(60);
    expect(alphaAt(png, 0, 0)).toBe(0);
    let opaque = 0;
    for (let i = 3; i < png.data.length; i += 4) if (png.data[i] > 200) opaque++;
    expect(opaque).toBeGreaterThan(100);
    expect(external).toEqual([]);
  });
});
