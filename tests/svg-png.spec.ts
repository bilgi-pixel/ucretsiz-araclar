import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

const circleSvg = (extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#ff0000"/>${extra}</svg>`;

const svgFile = (name: string, body: string) => ({ name, mimeType: 'image/svg+xml', buffer: Buffer.from(body, 'utf8') });

test.describe("SVG'yi PNG'ye Çevir", () => {
  test('daire SVG → 512 px PNG iner, merkez kırmızı, köşe şeffaf; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/svg-png/');
    await page.locator('#drop input[type=file]').setInputFiles(svgFile('daire.svg', circleSvg()));
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#files li .meta')).toContainText('100×100');
    await expect(page.locator('#files li .sp-warn')).toHaveCount(0);
    await page.locator('#opt-mode').selectOption('width');
    await page.locator('#opt-width').fill('512');
    await expect(page.locator('#size-hint')).toContainText('512×512');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#files li .meta')).toContainText('→ 512×512');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-one').click()]);
    expect(dl.suggestedFilename()).toBe('daire.png');
    const png = PNG.sync.read(readFileSync((await dl.path())!));
    expect(png.width).toBe(512);
    expect(png.height).toBe(512);
    const px = (x: number, y: number) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]]; };
    expect(px(256, 256)).toEqual([255, 0, 0, 255]);
    expect(px(2, 2)[3]).toBe(0); // şeffaf köşe
    expect(external).toEqual([]);
    noErrors();
  });

  test('ölçek 2x ve JPG arka plan; iki dosya zip olarak iner', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/svg-png/');
    await page.locator('#drop input[type=file]').setInputFiles([
      svgFile('a.svg', circleSvg()),
      svgFile('b.svg', '<svg xmlns="http://www.w3.org/2000/svg" width="20mm" height="10mm"><rect width="100%" height="100%" fill="blue"/></svg>'),
    ]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await expect(page.locator('#files li').nth(1).locator('.meta')).toContainText('76×38'); // mm → px
    await page.locator('#opt-format').selectOption('jpg');
    await expect(page.locator('#field-transparent')).toBeHidden();
    await expect(page.locator('#field-bg')).toBeVisible();
    await page.locator('#opt-scale').selectOption('2');
    await expect(page.locator('#size-hint')).toContainText('200×200');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 dosya');
    await expect(page.locator('#download-one')).toBeHidden();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Bu dosyayı indir').click()]);
    expect(dl.suggestedFilename()).toBe('a@2x.jpg');
    expect([...readFileSync((await dl.path())!).subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]);
    const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(zip.suggestedFilename()).toBe('svg-jpg.zip');
    const zbuf = readFileSync((await zip.path())!);
    expect([...zbuf.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(zbuf.toString('latin1')).toContain('b@2x.jpg');
    expect(external).toEqual([]);
  });

  test('dış kaynaklı SVG uyarır, ölçüsüz SVG 512 varsayar, dış istek çıkmaz', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/svg-png/');
    await page.locator('#drop input[type=file]').setInputFiles([
      svgFile('dis.svg', circleSvg('<image href="https://example.com/foto.png" width="50" height="50"/><style>@import url("https://fonts.googleapis.com/css?family=Roboto");</style><script>alert(1)</script>')),
      svgFile('olcusuz.svg', '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"/></svg>'),
    ]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await expect(page.locator('#files li').nth(0).locator('.sp-warn')).toContainText('dış kaynak');
    await expect(page.locator('#files li').nth(1).locator('.sp-warn')).toContainText('512×512');
    await expect(page.locator('#files li').nth(1).locator('.meta')).toContainText('512×512');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 dosya');
    // Sayfa, iframe ya da img yoluyla example.com / googleapis'e gitmemeli
    await page.waitForTimeout(500);
    expect(external).toEqual([]);
    noErrors();
  });

  test('PDF atlanır, bozuk SVG okunamaz; Türkçe çözüm öneren hatalar', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/svg-png/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('SVG değil');
    await expect(page.locator('#error')).toContainText('Resim Formatı Dönüştür');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.svg', mimeType: 'image/svg+xml', buffer: readFileSync(fx('bozuk.pdf')) });
    await expect(page.locator('#error')).toContainText('SVG okunamadı');
    await expect(page.locator('#error')).toContainText('<svg');
    await expect(page.locator('#files li')).toHaveCount(0);
    noErrors();
  });

  test('ters yön: PNG → SVG kabı (vektör değil, gömülü resim)', async ({ page }) => {
    await page.goto('/svg-png/');
    await page.locator('#reverse summary').click();
    await page.locator('#raster-drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#raster-result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#raster-download').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.svg');
    const svg = readFileSync((await dl.path())!, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('data:image/png;base64');
    expect(svg).toContain('vektör değildir');
  });
});
