import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

test.describe('Yazdırılabilir Kağıt', () => {
  test('kareli 3 sayfa A4 → 3 sayfa, 595x842 pt, küçük dosya; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/yazdirilabilir-kagit/');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1', { timeout: 30_000 });
    await expect(page.locator('#opt-type')).toHaveValue('kareli');
    await expect(page.locator('#info')).toContainText('3 sayfa');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('kareli-kagit-a4.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    expect(out.length).toBeLessThan(200 * 1024);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(3);
    const { width, height } = doc.getPage(0).getSize();
    expect(Math.round(width)).toBe(595);
    expect(Math.round(height)).toBe(842);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm türler hatasız çizilir; başlık ve tarih Türkçe karakterle eklenir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/yazdirilabilir-kagit/');
    await page.locator('#opt-pages').fill('2');
    await page.locator('#opt-title').fill('Öğrenci Çalışma Kağıdı');
    await page.locator('#opt-date').check();
    for (const t of ['cizgili', 'noktali', 'izometrik', 'muzik', 'cornell', 'ilkokul', 'dik', 'milimetrik', 'kareli']) {
      await page.locator('#opt-type').selectOption(t);
      await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1', { timeout: 30_000 });
      await expect(page.locator('#error')).toBeHidden();
      await expect(page.locator('#info')).toContainText('2 sayfa');
    }
    expect(errors).toEqual([]);
  });

  test('A5 yatay seçimi sayfa boyutunu değiştirir', async ({ page }) => {
    await page.goto('/yazdirilabilir-kagit/');
    await page.locator('#opt-size').selectOption('a5');
    await page.locator('#opt-orient').selectOption('landscape');
    await expect(page.locator('#info')).toContainText('A5', { timeout: 30_000 });
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!));
    const { width, height } = doc.getPage(0).getSize();
    expect(Math.round(width)).toBe(595);
    expect(Math.round(height)).toBe(420);
  });

  test('hatalı sayfa sayısı ve aralık anlaşılır hata verir', async ({ page }) => {
    await page.goto('/yazdirilabilir-kagit/');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1', { timeout: 30_000 });
    await page.locator('#opt-pages').fill('0');
    await expect(page.locator('#error')).toContainText('Sayfa sayısı 1 ile 100');
    await expect(page.locator('#download')).toBeDisabled();
    await page.locator('#opt-pages').fill('3');
    await page.locator('#opt-spacing').fill('0');
    await expect(page.locator('#error')).toContainText('Kare boyutu');
    await page.locator('#opt-spacing').fill('5');
    await page.locator('#opt-margin').fill('200');
    await expect(page.locator('#error')).toContainText('Kenar boşluğu');
    await page.locator('#opt-margin').fill('10');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1', { timeout: 30_000 });
    await expect(page.locator('#error')).toBeHidden();
  });
});
