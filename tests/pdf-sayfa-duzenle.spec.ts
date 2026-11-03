import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('PDF Sayfa Düzenle', () => {
  test('2. sayfayı sil, 1. sayfayı 90° döndür → 2 sayfalık PDF, ilk sayfa 90°', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-sayfa-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    await expect(page.locator('#pages .pg-card canvas[data-ready="1"]')).toHaveCount(3);

    // 2. sayfayı sil, 1. sayfayı sağa döndür
    await page.locator('#pages .pg-card').nth(1).getByRole('button', { name: 'Sil' }).click();
    await expect(page.locator('#pages .pg-card').nth(1)).toHaveClass(/is-deleted/);
    await page.locator('#pages .pg-card').nth(0).getByRole('button', { name: 'Sağa döndür' }).click();
    await expect(page.locator('#pages .pg-card').nth(0).locator('.pg-thumb')).toHaveAttribute('data-rotation', '90');
    await expect(page.locator('#summary')).toContainText('2 kalacak');

    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('2 sayfa');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-duzenlenmis.pdf');

    const { PDFDocument } = await import('pdf-lib');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
    expect(doc.getPage(0).getRotation().angle).toBe(90);
    expect(doc.getPage(1).getRotation().angle).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('klavye sıralama, ters sırala, boş sayfa ve seçilenleri çıkar', async ({ page }) => {
    await page.goto('/pdf-sayfa-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    // 3. sayfayı öne taşı: sıra 3,1,2
    await page.locator('#pages .pg-card').nth(2).getByRole('button', { name: 'Öne taşı' }).click();
    await expect(page.locator('#pages .pg-card').nth(1).locator('.pg-num')).toContainText('eski 3');
    // ters sırala: 2,1,3 → ilk kart eski 2
    await page.locator('#bulk-reverse').click();
    await expect(page.locator('#pages .pg-card').nth(0).locator('.pg-num')).toContainText('eski 2');
    // boş sayfa en sona
    await page.locator('#bulk-blank').click();
    await expect(page.locator('#pages .pg-card')).toHaveCount(4);
    await expect(page.locator('#pages .pg-card').nth(3)).toHaveClass(/is-blank/);
    // ilk iki sayfayı seç, yeni PDF olarak çıkar
    await page.locator('#pages .pg-card').nth(0).locator('input[type=checkbox]').check();
    await page.locator('#pages .pg-card').nth(1).locator('input[type=checkbox]').check();
    await expect(page.locator('#summary')).toContainText('2 seçili');
    await page.locator('#bulk-extract').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-secilen.pdf');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    expect(doc.getPageCount()).toBe(2);

    // seçim yokken "Seçilenleri sil" yol gösterir
    await page.locator('#bulk-select-all').click(); // hepsi seçili
    await page.locator('#bulk-select-all').click(); // hepsi bırakıldı
    await page.locator('#bulk-delete').click();
    await expect(page.locator('#error')).toContainText('kutucuğunu işaretleyin');
  });

  test('tutamaçtan sürükleyerek sıralama (pointer) çalışır', async ({ page }) => {
    await page.goto('/pdf-sayfa-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card canvas[data-ready="1"]')).toHaveCount(3);
    const handle = page.locator('#pages .pg-card').nth(0).locator('.ba-handle');
    const target = page.locator('#pages .pg-card').nth(2);
    await handle.hover(); // görünür alana kaydırır ve işaretçiyi tutamacın üstüne getirir
    const t = await target.boundingBox();
    await page.mouse.down();
    await page.mouse.move(t!.x + t!.width / 2, t!.y + t!.height / 2, { steps: 8 });
    await page.mouse.up();
    // 1. sayfa sona gitti: sıra 2,3,1
    await expect(page.locator('#pages .pg-card').nth(2).locator('.pg-num')).toContainText('eski 1');
    await expect(page.locator('#pages .pg-card').nth(0).locator('.pg-num')).toContainText('eski 2');
  });

  test('360px genişlikte yatay kaydırma yok, kartlar görünür', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/pdf-sayfa-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#pages .pg-card')).toHaveCount(3);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('#pages .pg-card').nth(0).getByRole('button', { name: 'Sağa döndür' })).toBeVisible();
  });

  test('bozuk ve şifreli PDF anlaşılır Türkçe hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-sayfa-duzenle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli/);
    await expect(page.locator('#error')).toContainText(/şifresini kaldır/);
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('PDF dosyası seçin');
    expect(external).toEqual([]);
  });
});
