import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { PNG } from 'pngjs';
import { readFileSync } from 'node:fs';

// Yarısı kırmızı, yarısı mavi iki renkli PNG üretir.
function twoColorPng(): Buffer {
  const png = new PNG({ width: 64, height: 32 });
  for (let y = 0; y < 32; y++) for (let x = 0; x < 64; x++) {
    const i = (64 * y + x) << 2;
    const red = x < 32;
    png.data[i] = red ? 255 : 0; png.data[i + 1] = 0; png.data[i + 2] = red ? 0 : 255; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

test.describe('Renk Seçici ve Resimden Palet', () => {
  test('HEX → RGB/HSL/CMYK dönüşümü ve kontrast', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/renk-secici/');
    await page.locator('#c-hex').fill('#7b2331');
    await expect(page.locator('#c-rgb')).toHaveValue('rgb(123, 35, 49)');
    const ratio = Number(await page.locator('#ct-ratio').getAttribute('data-ratio'));
    expect(ratio).toBeGreaterThan(9.4);
    expect(ratio).toBeLessThan(10.2);
    await expect(page.locator('#ct-aa')).toHaveAttribute('data-pass', '1');
    await expect(page.locator('#ct-aaa')).toHaveAttribute('data-pass', '1');
    // ters yön: RGB → HEX / CMYK / HSL
    await page.locator('#c-rgb').fill('rgb(255, 0, 0)');
    await expect(page.locator('#c-hex')).toHaveValue('#FF0000');
    await expect(page.locator('#c-cmyk')).toHaveValue('cmyk(0%, 100%, 100%, 0%)');
    await expect(page.locator('#c-hsl')).toHaveValue('hsl(0, 100%, 50%)');
    // açık gri metin beyaz zeminde kalır
    await page.locator('#c-hex').fill('#eeeeee');
    await expect(page.locator('#ct-aa')).toHaveAttribute('data-pass', '0');
    await expect(page.locator('#code-out')).toHaveValue(/--renk-ana: #eeeeee/);
    // tamamlayıcı renk önerisi
    await page.locator('#c-hex').fill('#ff0000');
    await expect(page.locator('#r-comp .rs-chip')).toHaveAttribute('data-hex', '#00ffff');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geçersiz HEX anlaşılır uyarı verir', async ({ page }) => {
    await page.goto('/renk-secici/');
    await page.locator('#c-hex').fill('#zzz123');
    await expect(page.locator('#error')).toContainText('HEX değeri geçersiz');
    await page.locator('#c-hex').fill('#fff');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#c-rgb')).toHaveValue('rgb(255, 255, 255)');
  });

  test('iki renkli PNG → palet, damlalık ve indirmeler', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/renk-secici/');
    await page.locator('#tab-palette').click();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'iki-renk.png', mimeType: 'image/png', buffer: twoColorPng() });
    await expect(page.locator('#pal-list li')).toHaveCount(2);
    const hexes = await page.locator('#pal-list li').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.hex));
    expect(hexes.sort()).toEqual(['#0000ff', '#ff0000']);
    // damlalık: sol yarı kırmızı
    await page.locator('#pal-canvas').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('#drop-hex')).toHaveText('#FF0000');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-json').click()]);
    expect(dl.suggestedFilename()).toBe('iki-renk-palet.json');
    const json = JSON.parse(readFileSync((await dl.path())!, 'utf8'));
    expect(json.renkler.map((r: any) => r.hex).sort()).toEqual(['#0000ff', '#ff0000']);
    const [png] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-png').click()]);
    expect(Array.from(readFileSync((await png.path())!).subarray(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
    const [css] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-css').click()]);
    expect(readFileSync((await css.path())!, 'utf8')).toContain('--palet-1:');
    // renk seçicide aç
    await page.locator('#drop-use').click();
    await expect(page.locator('#c-hex')).toHaveValue('#FF0000');
    expect(external).toEqual([]);
  });

  test('bozuk resim Türkçe hata verir', async ({ page }) => {
    await page.goto('/renk-secici/');
    await page.locator('#tab-palette').click();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error-p')).toContainText('okunamadı');
    await expect(page.locator('#pal-view')).toBeHidden();
  });
});
