import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

test.describe('Resim Boyutlandırma', () => {
  test('200 px genişlik → PNG iner, Türkçe ad korunur, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#files li .meta')).toContainText('1×1');
    await expect(page.locator('#options')).toBeVisible();

    await page.locator('#opt-width').fill('200');
    // Oran kilidi: yükseklik otomatik dolar (1:1 kaynak → 200)
    await expect(page.locator('#opt-height')).toHaveValue('200');
    // Büyütme uyarısı
    await expect(page.locator('#warn-upscale')).toBeVisible();
    await expect(page.locator('#preview-info')).toContainText('200×200');

    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('1 dosya');
    await expect(page.locator('#files li .meta')).toContainText('1×1 → 200×200');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Bu dosyayı indir').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş-200x200.png');
    const png = PNG.sync.read(readFileSync((await dl.path())!));
    expect(png.width).toBe(200);
    expect(png.height).toBe(200);

    expect(external).toEqual([]);
    noErrors();
  });

  test('hazır ölçü + kırp → JPG, iki dosya ZIP iner', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/resim-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('fotoğraf-ş.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('input[name="mode"][value="preset"]').check();
    await page.locator('#opt-preset').selectOption('fb-kapak');
    await expect(page.locator('#opt-fit')).toHaveValue('cover');
    await page.locator('#opt-format').selectOption('jpeg');
    await page.locator('#opt-rotate').selectOption('90');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 dosya');
    await expect(page.locator('#files li .meta').first()).toContainText('820×312');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-all').click()]);
    expect(dl.suggestedFilename()).toBe('boyutlandirilmis-resimler.zip');
    const buf = readFileSync((await dl.path())!);
    expect([...buf.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]); // ZIP imzası
    expect(buf.toString('latin1')).toContain('-820x312.jpg');
    expect(external).toEqual([]);
  });

  test('yüzde modu %50 ve piksel modunda boş alan hatası', async ({ page }) => {
    await page.goto('/resim-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('en az bir piksel değeri');
    await page.locator('input[name="mode"][value="percent"]').check();
    await page.locator('#opt-percent-num').fill('300');
    await expect(page.locator('#opt-percent-out')).toHaveText('%300');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#files li .meta')).toContainText('→ 3×3');
  });

  test('bozuk PDF anlaşılır Türkçe hata verir', async ({ page }) => {
    await page.goto('/resim-boyutlandir/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Yalnızca JPG, PNG, WebP');
    await expect(page.locator('#error')).toContainText('PDF\'den Resme');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
  });
});
