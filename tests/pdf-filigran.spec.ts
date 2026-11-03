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

test.describe('PDF\'e Filigran Ekle', () => {
  test('metin filigranı (Türkçe): 3 sayfa, DejaVu gömülü, saydamlık var, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-filigran/');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#preview')).toBeVisible();

    await page.locator('button[data-preset="GİZLİ"]').click();
    await expect(page.locator('#opt-text')).toHaveValue('GİZLİ');
    await page.locator('#opt-layout').selectOption('tile');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('3 sayfaya filigran eklendi');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-filigranli.pdf');
    const out = readFileSync((await dl.path())!);
    expect(out.subarray(0, 5).toString()).toBe('%PDF-');
    expect(out.length).toBeGreaterThan(readFileSync(fx('uc-sayfa.pdf')).length);
    const { pages, dump } = await dumpObjects(out);
    expect(pages).toBe(3);
    expect(dump).toContain('DejaVuSans');
    expect(dump).toMatch(/\/ca\s+0?\.\d+/); // saydamlık için ExtGState
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('logo filigranı (fotoğraf-ş.png): görsel gömülür, yalnızca 2. sayfa', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/pdf-filigran/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await page.locator('#opt-type').selectOption('image');
    await expect(page.locator('#image-fields')).toBeVisible();
    await expect(page.locator('#text-fields')).toBeHidden();
    // logo seçmeden çalıştırınca anlaşılır hata
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Logo seçilmedi');
    await page.locator('#logo-drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#logo-name')).toContainText('fotoğraf-ş.png');
    await page.locator('#opt-layout').selectOption('corner-br');
    await page.locator('#opt-range').fill('2');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('1 sayfaya filigran eklendi');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const out = readFileSync((await dl.path())!);
    const { pages, dump } = await dumpObjects(out);
    expect(pages).toBe(3);
    expect(dump).toContain('/Subtype /Image');
    expect(external).toEqual([]);
  });

  test('boş metin ve yanlış logo türü anlaşılır hata verir', async ({ page }) => {
    await page.goto('/pdf-filigran/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('iki-sayfa.pdf'));
    await page.locator('#opt-text').fill('');
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('Filigran metni boş');
    await page.locator('#opt-type').selectOption('image');
    await page.locator('#logo-drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('PNG');
  });

  test('bozuk ve şifreli PDF anlaşılır hata verir', async ({ page }) => {
    await page.goto('/pdf-filigran/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await expect(page.locator('#files li')).toHaveCount(0);
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli/);
    await expect(page.locator('#error')).toContainText(/şifresini kaldırıp/);
    await expect(page.locator('#actions')).toBeHidden();
  });
});
