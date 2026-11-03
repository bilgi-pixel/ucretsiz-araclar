import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

/** pdf-lib ile açıp tüm dolaylı nesneleri metne döker (nesne akışları açılmış olur). */
async function dumpObjects(bytes: Buffer): Promise<{ pages: number; dump: string }> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(bytes);
  const dump = doc.context.enumerateIndirectObjects().map(([, obj]) => obj.toString()).join('\n');
  return { pages: doc.getPageCount(), dump };
}

test.describe('PDF\'e Sayfa Numarası Ekle', () => {
  test('uc-sayfa.pdf → numaralı 3 sayfalık PDF, DejaVu gömülü, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-sayfa-numarasi/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#preview')).toBeVisible();

    await page.locator('#opt-format').selectOption('wordOf');
    await page.locator('#opt-position').selectOption('bottom-right');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('3 sayfaya numara eklendi');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-numarali.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    expect(out.length).toBeGreaterThan(readFileSync(fx('uc-sayfa.pdf')).length);
    const { pages, dump } = await dumpObjects(out);
    expect(pages).toBe(3);
    expect(dump).toContain('DejaVuSans');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kapak atlanır: yalnızca 2 sayfaya numara; özel kalıp {n} olmadan hata', async ({ page }) => {
    await page.goto('/pdf-sayfa-numarasi/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-skip').fill('1');
    await expect(page.locator('#preview-note')).toContainText('İlk 1 sayfa atlanacak');
    await page.locator('#opt-format').selectOption('custom');
    await expect(page.locator('#field-custom')).toBeVisible();
    await page.locator('#opt-custom').fill('Bölüm');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('{n}');
    await page.locator('#opt-custom').fill('Sayfa {n} / {toplam}');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 sayfaya numara eklendi');
  });

  test('iki dosya toplu: iki indirme düğmesi ve "Tümünü indir"', async ({ page }) => {
    await page.goto('/pdf-sayfa-numarasi/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('2 dosya');
    await expect(page.locator('#downloads button[data-download]')).toHaveCount(2);
    await expect(page.locator('#download-all')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="1"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-numarali.pdf');
  });

  test('bozuk ve şifreli PDF anlaşılır hata verir, listeye girmez', async ({ page }) => {
    await page.goto('/pdf-sayfa-numarasi/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli/);
    await expect(page.locator('#error')).toContainText(/şifresini kaldırıp/);
    await expect(page.locator('#files li')).toHaveCount(0);
  });

  test('geçersiz sayfa aralığı Türkçe hata verir', async ({ page }) => {
    await page.goto('/pdf-sayfa-numarasi/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-range').fill('abc');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Geçersiz sayfa ifadesi');
  });
});
