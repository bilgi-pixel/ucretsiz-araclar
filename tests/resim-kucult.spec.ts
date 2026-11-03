import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { statSync } from 'node:fs';

test.describe('Resim Küçült ve Dönüştür', () => {
  test('PNG → JPG hedef KB altında, Türkçe ad korunur, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-kucult/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('fotoğraf-ş.png'), fx('fotoğraf-ş.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-format').selectOption('jpg');
    await page.locator('#opt-target').fill('20');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 dosya');
    await expect(page.locator('#result-info')).toContainText('JPG');
    await expect(page.locator('#files li .meta').first()).toContainText('→');

    // Tek dosya indirme
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Bu dosyayı indir').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.jpg');
    const path = (await dl.path())!;
    expect(statSync(path).size).toBeLessThan(20 * 1024);
    const { readFileSync } = await import('node:fs');
    const head = readFileSync(path).subarray(0, 3);
    expect([...head]).toEqual([0xff, 0xd8, 0xff]); // JPEG SOI

    // Tümünü indir: iki ayrı indirme
    const downloads: string[] = [];
    page.on('download', (d) => downloads.push(d.suggestedFilename()));
    await page.locator('#download-all').click();
    await expect.poll(() => downloads.length).toBe(2);
    expect(downloads).toEqual(['fotoğraf-ş.jpg', 'fotoğraf-ş.jpg']);

    expect(external).toEqual([]);
    noErrors();
  });

  test('hazır ayar alanları doldurur, PNG çıktısı verir', async ({ page }) => {
    await page.goto('/resim-kucult/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await page.locator('#opt-preset').selectOption('biyometrik');
    await expect(page.locator('#opt-target')).toHaveValue('50');
    await expect(page.locator('#opt-width')).toHaveValue('591');
    await expect(page.locator('#opt-height')).toHaveValue('709');
    await expect(page.locator('#opt-format')).toHaveValue('jpg');
    await page.locator('#opt-format').selectOption('png');
    await expect(page.locator('#opt-preset')).toHaveValue('custom');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#files li').first().getByLabel('Bu dosyayı indir').click()]);
    expect(dl.suggestedFilename()).toBe('fotoğraf-ş.png');
  });

  test('resim olmayan dosya anlaşılır hata verir', async ({ page }) => {
    await page.goto('/resim-kucult/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Yalnızca JPG, PNG ve WebP');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
  });
});
