import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PDFDocument, PDFName } from 'pdf-lib';

/** Çizim alanına fareyle "S" benzeri bir çizgi çizer. */
async function drawSignature(page: Page) {
  await page.locator('#sig-canvas').scrollIntoViewIfNeeded();
  const box = (await page.locator('#sig-canvas').boundingBox())!;
  const x0 = box.x + box.width * 0.2, y0 = box.y + box.height * 0.3;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  for (let i = 1; i <= 20; i++) {
    await page.mouse.move(x0 + i * box.width * 0.025, y0 + Math.sin(i / 3) * box.height * 0.25);
  }
  await page.mouse.up();
}

test.describe('PDF İmzala', () => {
  test('çizilen imza 2 sayfalı PDF\'e gömülür, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-imzala/');
    await expect(page.locator('#apply')).toBeDisabled();
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#file-meta')).toContainText('2 sayfa');
    await expect(page.locator('#workspace')).toBeVisible();
    await expect(page.locator('#overlay')).toBeHidden();
    await drawSignature(page);
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#apply')).toBeEnabled();

    // Sürükleme: imza sola kayar
    await page.locator('#overlay').scrollIntoViewIfNeeded();
    const before = (await page.locator('#overlay').boundingBox())!;
    await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
    await page.mouse.down();
    await page.mouse.move(before.x + before.width / 2 - 80, before.y + before.height / 2 - 40, { steps: 5 });
    await page.mouse.up();
    const after = (await page.locator('#overlay').boundingBox())!;
    expect(after.x).toBeLessThan(before.x - 50);

    await page.locator('#opt-date').check();
    await page.locator('#apply').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result-info')).toContainText('Sayfa 1 imzalandı');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('iki-sayfa-imzali.pdf');
    const bytes = readFileSync((await dl.path())!);
    const original = readFileSync(fx('iki-sayfa.pdf'));
    expect(bytes.length).toBeGreaterThan(original.length);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
    const xobj = doc.getPage(0).node.Resources()?.lookup(PDFName.of('XObject'));
    expect(String(xobj)).toContain('Image');
    // 2. sayfaya imza eklenmemiş olmalı
    const xobj2 = doc.getPage(1).node.Resources()?.lookup(PDFName.of('XObject'));
    expect(String(xobj2 || '')).not.toContain('Image');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yazılı imza + tüm sayfalara uygula → her sayfada görsel var', async ({ page }) => {
    await page.goto('/pdf-imzala/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#tab-text').click();
    await page.locator('#sig-text').fill('Ayşe Çelik');
    await expect(page.locator('#overlay')).toBeVisible();
    await page.locator('#opt-all-pages').check();
    await page.locator('#apply').click();
    await expect(page.locator('#result-info')).toContainText('2 sayfanın tamamı');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    for (let i = 0; i < 2; i++) {
      const xobj = doc.getPage(i).node.Resources()?.lookup(PDFName.of('XObject'));
      expect(String(xobj)).toContain('Image');
    }
  });

  test('imza resmi yükleme ve klavyeyle taşıma çalışır', async ({ page }) => {
    await page.goto('/pdf-imzala/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#tab-image').click();
    await page.locator('#img-drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#img-name')).toContainText('fotoğraf-ş.png');
    await expect(page.locator('#overlay')).toBeVisible();
    const before = (await page.locator('#overlay').boundingBox())!;
    await page.locator('#overlay').focus();
    await page.keyboard.press('Shift+ArrowLeft');
    await page.keyboard.press('Shift+ArrowLeft');
    const after = (await page.locator('#overlay').boundingBox())!;
    expect(after.x).toBeLessThan(before.x);
    await expect(page.locator('#apply')).toBeEnabled();
  });

  test('şifreli ve bozuk PDF anlaşılır hata verir', async ({ page }) => {
    await page.goto('/pdf-imzala/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli/);
    await expect(page.locator('#error')).toContainText(/şifresini kaldırın/);
    await expect(page.locator('#workspace')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk/);
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
  });

  test('360px genişlikte araç kutusu taşmaz ve çizim alanı görünür', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/pdf-imzala/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#sig-canvas')).toBeVisible();
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBeLessThanOrEqual(360);
    await drawSignature(page);
    await expect(page.locator('#overlay')).toBeVisible();
  });
});
