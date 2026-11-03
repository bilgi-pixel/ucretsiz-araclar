import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Resim Formatı Dönüştürücü', () => {
  test('PNG → JPG iner (JFIF başlığı), ad korunur, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#files li .meta')).toContainText('PNG');
    await expect(page.locator('#field-bg')).toBeVisible(); // JPG seçili → arka plan rengi görünür
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('1 dosya');
    await expect(page.locator('#result-info')).toContainText('JPG');
    await expect(page.locator('#download-zip')).toBeHidden(); // tek dosyada zip gereksiz
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Bu dosyayı indir').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.jpg');
    const head = readFileSync((await dl.path())!).subarray(0, 3);
    expect([...head]).toEqual([0xff, 0xd8, 0xff]); // JPEG SOI
    expect(external).toEqual([]);
    noErrors();
  });

  test('PNG → WebP iner (RIFF…WEBP), iki dosya zip olarak iner', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/resim-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('fotoğraf-ş.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-format').selectOption('webp');
    await expect(page.locator('#field-bg')).toBeHidden();
    await expect(page.locator('#field-quality')).toBeVisible();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 dosya');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Bu dosyayı indir').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.webp');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(0, 4).toString('latin1')).toBe('RIFF');
    expect(buf.subarray(8, 12).toString('latin1')).toBe('WEBP');

    // Zip: PK imzası, adı ilk dosyadan türetilir
    const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(zip.suggestedFilename()).toBe('fotoğraf-ş-webp.zip');
    const zbuf = readFileSync((await zip.path())!);
    expect([...zbuf.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    // Arşivde aynı ad iki kez olamaz: ikincisi "(2)" alır
    expect(zbuf.toString('utf8')).toContain('(2).webp');
    expect(external).toEqual([]);
  });

  test('PNG çıktısı: kalite alanı gizlenir, PNG imzası iner', async ({ page }) => {
    await page.goto('/resim-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#opt-format').selectOption('png');
    await expect(page.locator('#field-quality')).toBeHidden();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Bu dosyayı indir').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.png');
    const head = readFileSync((await dl.path())!).subarray(0, 8);
    expect([...head]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  });

  test('PDF ve HEIC için anlaşılır Türkçe hata, liste boş kalır', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('resim değil');
    await expect(page.locator('#error')).toContainText("PDF'den Resme");
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles({ name: 'IMG_0001.heic', mimeType: 'image/heic', buffer: Buffer.from('ftypheic') });
    await expect(page.locator('#error')).toContainText('HEIC');
    await expect(page.locator('#error')).toContainText('En Uyumlu');
    await expect(page.locator('#files li')).toHaveCount(0);
    noErrors();
  });

  test('bozuk resim (yanlış uzantı) dönüştürülemez, çözüm önerir', async ({ page }) => {
    await page.goto('/resim-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'sahte.jpg', mimeType: 'image/jpeg', buffer: readFileSync(fx('bozuk.pdf')) });
    await expect(page.locator('#files li')).toHaveCount(1);
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('dönüştürülemedi');
    await expect(page.locator('#error')).toContainText('uzantısı yanlışsa');
    await expect(page.locator('#files li .meta')).toContainText('dönüştürülemedi');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });
});
