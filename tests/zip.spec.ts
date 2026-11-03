import { test, expect } from '@playwright/test';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Zip Oluştur / Zip Aç', () => {
  test('iki dosyadan zip oluşturur, sonra aynı zip\'i açıp listeler; dış istek yok', async ({ page }, testInfo) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/zip/');

    // Fixture'lar paralel çalışan `npm test` tarafından yeniden üretilebilir; okuma sırasında
    // değişmesinler diye kopyalarını kullan.
    const pdfPath = testInfo.outputPath('iki-sayfa.pdf');
    const pngPath = testInfo.outputPath('fotoğraf-ş.png');
    copyFileSync(fx('iki-sayfa.pdf'), pdfPath);
    copyFileSync(fx('fotoğraf-ş.png'), pngPath);

    // --- Oluştur
    await page.locator('#drop-create input[type=file]').setInputFiles([pdfPath, pngPath]);
    await expect(page.locator('#files-create li')).toHaveCount(2);
    await expect(page.locator('#summary-create')).toContainText('2 dosya');
    await page.locator('#opt-name').fill('deneme-arşivi');
    await page.locator('#opt-level').selectOption('6');
    await page.locator('#create').click();
    await expect(page.locator('#result-create')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info-create')).toContainText('2 dosya');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-create').click()]);
    expect(dl.suggestedFilename()).toBe('deneme-arşivi.zip');
    const zipPath = testInfo.outputPath('deneme-arşivi.zip');
    await dl.saveAs(zipPath);
    const bytes = readFileSync(zipPath);
    expect(bytes.subarray(0, 2).toString()).toBe('PK');

    // --- Aç
    await page.getByRole('tab', { name: 'Zip aç' }).click();
    await expect(page.locator('#panel-ac')).toBeVisible();
    await page.locator('#drop-extract input[type=file]').setInputFiles(zipPath);
    await expect(page.locator('#entries li')).toHaveCount(2);
    await expect(page.locator('#entries')).toContainText('iki-sayfa.pdf');
    await expect(page.locator('#entries')).toContainText('fotoğraf-ş.png');
    await expect(page.locator('#summary-extract')).toContainText('2 dosya');
    // UTF-8 bayrağı yazıldığı için kodlama seçici görünmemeli
    await expect(page.locator('#enc-field')).toBeHidden();

    // Tek dosya indir: içerik orijinaliyle birebir aynı olmalı
    const [one] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#entries button[data-entry]').filter({ hasText: 'İndir' }).nth(1).click(),
    ]);
    expect(one.suggestedFilename()).toBe('fotoğraf-ş.png');
    const got = readFileSync((await one.path())!);
    expect(Buffer.compare(got, readFileSync(fx('fotoğraf-ş.png')))).toBe(0);

    expect(external).toEqual([]);
    noErrors();
  });

  test('şifreli zip ve bozuk dosya anlaşılır hata verir', async ({ page }, testInfo) => {
    await page.goto('/zip/#ac');
    await expect(page.locator('#panel-ac')).toBeVisible();

    // Elle kurulmuş, genel bayrağında şifre biti (bit 0) set edilmiş tek girdili zip
    const name = Buffer.from('gizli.txt');
    const data = Buffer.from('abcdef');
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(1, 6); local.writeUInt16LE(0, 8);
    local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(name.length, 26);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(1, 8);
    central.writeUInt32LE(data.length, 20); central.writeUInt32LE(data.length, 24); central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(0, 42);
    const cdOffset = local.length + name.length + data.length;
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(1, 8); eocd.writeUInt16LE(1, 10);
    eocd.writeUInt32LE(central.length + name.length, 12); eocd.writeUInt32LE(cdOffset, 16);
    const encPath = testInfo.outputPath('sifreli.zip');
    writeFileSync(encPath, Buffer.concat([local, name, data, central, name, eocd]));

    await page.locator('#drop-extract input[type=file]').setInputFiles(encPath);
    await expect(page.locator('#error-extract')).toContainText('Şifreli zip desteklenmiyor');
    await expect(page.locator('#entries li')).toHaveCount(0);

    // Zip olmayan dosya
    await page.locator('#drop-extract input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error-extract')).toContainText(/bozuk|geçerli bir zip/);

    // RAR uzantısı: desteklenmediği açıkça söylenir
    const rarPath = testInfo.outputPath('deneme.rar');
    writeFileSync(rarPath, 'Rar!\x1a\x07\x00');
    await page.locator('#drop-extract input[type=file]').setInputFiles(rarPath);
    await expect(page.locator('#error-extract')).toContainText(/RAR/);
  });

  test('sayfa içeriği: ≥800 kelime, ≥6 SSS, rozetler, reklam buton yanında değil', async ({ page }) => {
    await page.goto('/zip/');
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
  });
});
