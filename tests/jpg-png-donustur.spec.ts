import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** Tarayıcıda yarı saydam bir PNG üretir. */
async function makePng(page: Page, mime = 'image/png'): Promise<Buffer> {
  const b64 = await page.evaluate(async (m) => {
    const c = document.createElement('canvas');
    c.width = 80; c.height = 60;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#c0392b'; ctx.fillRect(20, 15, 40, 30); // çevresi şeffaf kalır
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), m, 0.9));
    const buf = new Uint8Array(await blob.arrayBuffer());
    let s = ''; buf.forEach((x) => (s += String.fromCharCode(x)));
    return btoa(s);
  }, mime);
  return Buffer.from(b64, 'base64');
}

test.describe('JPG PNG Dönüştür', () => {
  test('PNG otomatik olarak JPG olur, şeffaflık notu görünür', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/jpg-png-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'logo.png', mimeType: 'image/png', buffer: await makePng(page) });
    await expect(page.locator('#alpha-note')).toBeVisible();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('logo.jpg');
    expect(Array.from(readFileSync((await dl.path())!).subarray(0, 3))).toEqual([0xff, 0xd8, 0xff]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('JPG otomatik olarak PNG olur', async ({ page }) => {
    await page.goto('/jpg-png-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'foto.jpg', mimeType: 'image/jpeg', buffer: await makePng(page, 'image/jpeg') });
    await expect(page.locator('#alpha-note')).toBeHidden();
    await expect(page.locator('#field-quality')).toBeHidden();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files button[data-act=download]').click()]);
    expect(dl.suggestedFilename()).toBe('foto.png');
    expect(Array.from(readFileSync((await dl.path())!).subarray(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
  });

  test('karışık dosyalar tek yönde PNG yapılır ve zip iner', async ({ page }) => {
    await page.goto('/jpg-png-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles([
      { name: 'a.png', mimeType: 'image/png', buffer: await makePng(page) },
      { name: 'b.jpg', mimeType: 'image/jpeg', buffer: await makePng(page, 'image/jpeg') },
    ]);
    await page.locator('#opt-mode').selectOption('png');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    const zip = readFileSync((await dl.path())!).toString('latin1');
    expect(zip.startsWith('PK')).toBe(true);
    expect(zip).toContain('a.png');
    expect(zip).toContain('b.png');
  });

  test('bozuk JPG Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/jpg-png-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('jpeg degil') });
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('dönüştürülemedi');
    await expect(page.locator('#error')).toContainText('yeniden alıp');
  });

  test('PDF seçilirse atlanır; fikstür PNG JPG olur', async ({ page }) => {
    await page.goto('/jpg-png-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('resim değil');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#convert').click();
    await expect(page.locator('#files li .meta')).toContainText('→ JPG');
  });

  test('içerik: ≥900 kelime, ≥7 SSS, 3 reklam, JSON-LD, 360px, klavye', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/jpg-png-donustur/');
    const words = await page.locator('.ba-content').textContent().then((t) => t!.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="jpg-png-donustur-${s}"]`)).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    await page.locator('#drop').focus();
    await expect(page.locator('#drop')).toBeFocused();
  });
});
