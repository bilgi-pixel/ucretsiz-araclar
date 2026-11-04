import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** Tarayıcıda gerçek bir WebP üretir (gradyan + saydam köşe). */
async function makeWebp(page: Page, w = 120, h = 80): Promise<Buffer> {
  const b64 = await page.evaluate(async ([ww, hh]) => {
    const c = document.createElement('canvas');
    c.width = ww as number; c.height = hh as number;
    const ctx = c.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, ww as number, hh as number);
    g.addColorStop(0, '#d33'); g.addColorStop(1, '#36c');
    ctx.fillStyle = g; ctx.fillRect(10, 10, (ww as number) - 20, (hh as number) - 20);
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/webp', 0.9));
    const buf = new Uint8Array(await blob.arrayBuffer());
    let s = ''; buf.forEach((x) => (s += String.fromCharCode(x)));
    return btoa(s);
  }, [w, h]);
  return Buffer.from(b64, 'base64');
}

test.describe('WebP JPG Dönüştür', () => {
  test('tek WebP JPG olarak iner ve JPEG imzası taşır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/webp-jpg-donustur/');
    const webp = await makeWebp(page);
    expect(webp.subarray(8, 12).toString()).toBe('WEBP');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'manzara.webp', mimeType: 'image/webp', buffer: webp });
    await expect(page.locator('#files li')).toHaveCount(1);
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#files li .meta')).toContainText('JPG');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('manzara.jpg');
    const head = readFileSync((await dl.path())!).subarray(0, 3);
    expect(Array.from(head)).toEqual([0xff, 0xd8, 0xff]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('iki WebP zip olarak iner', async ({ page }) => {
    await page.goto('/webp-jpg-donustur/');
    const a = await makeWebp(page, 100, 60);
    const b = await makeWebp(page, 64, 64);
    await page.locator('#drop input[type=file]').setInputFiles([
      { name: 'bir.webp', mimeType: 'image/webp', buffer: a },
      { name: 'iki.webp', mimeType: 'image/webp', buffer: b },
    ]);
    await page.locator('#opt-quality').fill('0.7');
    await expect(page.locator('#opt-quality-out')).toHaveText('70%');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(dl.suggestedFilename()).toBe('bir-jpg.zip');
    const zip = readFileSync((await dl.path())!);
    expect(zip.subarray(0, 2).toString()).toBe('PK');
    expect(zip.toString('latin1')).toContain('bir.jpg');
    expect(zip.toString('latin1')).toContain('iki.jpg');
  });

  test('bozuk .webp dosyası Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/webp-jpg-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.webp', mimeType: 'image/webp', buffer: Buffer.from('bu bir resim degil') });
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('dönüştürülemedi');
    await expect(page.locator('#error')).toContainText('yeniden indirip');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('resim olmayan dosya (PDF) atlanır ve açıklanır', async ({ page }) => {
    await page.goto('/webp-jpg-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('resim değil');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
  });

  test('PNG fikstürü de JPG olur; Temizle listeyi boşaltır', async ({ page }) => {
    await page.goto('/webp-jpg-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await page.locator('#clear').click();
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('sayfa içeriği: ≥900 kelime, ≥7 SSS, 3 reklam, JSON-LD, klavye ve 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/webp-jpg-donustur/');
    const words = await page.locator('.ba-content').textContent().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="webp-jpg-donustur-${s}"]`)).toHaveCount(1);
    const ld = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    expect(ld.some((t) => t.includes('FAQPage'))).toBe(true);
    expect(ld.some((t) => t.includes('SoftwareApplication'))).toBe(true);
    await expect(page.locator('main')).toContainText('dosya yüklenmez', { ignoreCase: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.locator('#drop').focus();
    await expect(page.locator('#drop')).toBeFocused();
  });
});
