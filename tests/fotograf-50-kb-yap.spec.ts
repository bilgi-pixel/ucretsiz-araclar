import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, statSync } from 'node:fs';
import { PNG } from 'pngjs';

/** Rastgele gürültülü 500x500 PNG: JPG'ye sıkışması zor, büyük bir "fotoğraf". */
function noisyPng(size = 500): Buffer {
  const png = new PNG({ width: size, height: size });
  let seed = 12345;
  for (let i = 0; i < png.data.length; i += 4) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    png.data[i] = seed & 255; png.data[i + 1] = (seed >> 8) & 255; png.data[i + 2] = (seed >> 16) & 255; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

test.describe('Fotoğraf 50 KB Yap', () => {
  test('gürültülü fotoğraf 50 KB sınırının altına iner ve JPG olur', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/fotograf-50-kb-yap/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'vesikalik.png', mimeType: 'image/png', buffer: noisyPng() });
    await expect(page.locator('#opt-kb')).toHaveValue('50');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('vesikalik-50kb.jpg');
    const path = (await dl.path())!;
    expect(statSync(path).size).toBeLessThanOrEqual(50 * 1024);
    expect(statSync(path).size).toBeGreaterThan(5 * 1024);
    expect(Array.from(readFileSync(path).subarray(0, 3))).toEqual([0xff, 0xd8, 0xff]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('hızlı düğmeler hedefi değiştirir; 20 KB sınırı tutturulur', async ({ page }) => {
    await page.goto('/fotograf-50-kb-yap/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'foto.png', mimeType: 'image/png', buffer: noisyPng() });
    await page.locator('.kb-quick button[data-kb="20"]').click();
    await expect(page.locator('#opt-kb')).toHaveValue('20');
    await expect(page.locator('.kb-quick button[data-kb="20"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.kb-quick button[data-kb="50"]')).toHaveAttribute('aria-pressed', 'false');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('foto-20kb.jpg');
    expect(statSync((await dl.path())!).size).toBeLessThanOrEqual(20 * 1024);
  });

  test('ölçü küçültme kapalıyken ulaşılamayan hedef için çözüm öneren hata', async ({ page }) => {
    await page.goto('/fotograf-50-kb-yap/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'foto.png', mimeType: 'image/png', buffer: noisyPng() });
    await page.locator('#opt-scale').uncheck();
    await page.locator('#opt-kb').fill('5');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('düşürülemedi', { timeout: 30_000 });
    await expect(page.locator('#error')).toContainText('piksel ölçüsünü de küçült');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('geçersiz özel KB ve bozuk dosya anlaşılır hata verir', async ({ page }) => {
    await page.goto('/fotograf-50-kb-yap/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('bu bir jpeg degil') });
    await page.locator('#opt-kb').fill('');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('geçerli bir sayı');
    await page.locator('#opt-kb').fill('50');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('işlenemedi');
    await expect(page.locator('#error')).toContainText('yeniden alıp');
  });

  test('PDF seçilirse atlanır; küçük fikstür zaten hedef altındaysa indirilir', async ({ page }) => {
    await page.goto('/fotograf-50-kb-yap/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('resim değil');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('.kb-quick button[data-kb="200"]').click();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#files li .meta')).toContainText('kalite');
  });

  test('içerik: ≥900 kelime, ≥7 SSS, 3 reklam, JSON-LD, tablo, 360px, klavye', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/fotograf-50-kb-yap/');
    const words = await page.locator('.ba-content').textContent().then((t) => t!.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="fotograf-50-kb-yap-${s}"]`)).toHaveCount(1);
    await expect(page.locator('.x-table')).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    await page.locator('#drop').focus();
    await expect(page.locator('#drop')).toBeFocused();
  });
});
