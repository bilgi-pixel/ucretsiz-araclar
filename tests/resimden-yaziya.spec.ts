import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

/** Sayfa içinde canvas ile "BİLİŞİM AJANS 2026" yazılı PNG üretir (Node'da canvas yok). */
async function makeTextPng(page: Page): Promise<Buffer> {
  const dataUrl = await page.evaluate(() => {
    const c = document.createElement('canvas');
    c.width = 1100; c.height = 260;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 72px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('BİLİŞİM AJANS 2026', 60, 130);
    return c.toDataURL('image/png');
  });
  return Buffer.from(dataUrl.split(',')[1], 'base64');
}

/** Aynı origin'de 404 vb. başarısız yanıtları toplar (eksik vendor dosyası yakalansın). */
function trackFailedResponses(page: Page) {
  const failed: string[] = [];
  page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  page.on('requestfailed', (r) => failed.push(`FAILED ${r.url()} ${r.failure()?.errorText}`));
  return failed;
}

test.describe('Resimden Yazıya (OCR)', () => {
  test('PNG → Türkçe OCR; metinde AJANS geçer, TXT ve DOCX iner, dış istek yok', async ({ page }) => {
    test.slow();
    test.setTimeout(120_000);
    const external = trackExternalRequests(page);
    const failed = trackFailedResponses(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    await page.goto('/resimden-yaziya/');
    const png = await makeTextPng(page);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bilisim-ajans.png', mimeType: 'image/png', buffer: png });
    await expect(page.locator('#files li')).toContainText('1100×260 px');
    await expect(page.locator('#field-pages')).toBeHidden();
    await expect(page.locator('#opt-lang')).toHaveValue('tur');
    await page.locator('#opt-fix').check();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 110_000 });
    const text = await page.locator('#out').inputValue();
    expect(text).toContain('AJANS');
    expect(text).toContain('2026');
    await expect(page.locator('#result-info')).toContainText('kelime');

    const [txt] = await Promise.all([page.waitForEvent('download'), page.locator('#download-txt').click()]);
    expect(txt.suggestedFilename()).toBe('bilisim-ajans.txt');
    const txtBody = readFileSync((await txt.path())!, 'utf8');
    expect(txtBody.charCodeAt(0)).toBe(0xfeff); // UTF-8 BOM
    expect(txtBody).toContain('AJANS');

    const [docx] = await Promise.all([page.waitForEvent('download'), page.locator('#download-docx').click()]);
    expect(docx.suggestedFilename()).toBe('bilisim-ajans.docx');
    const bytes = readFileSync((await docx.path())!);
    expect(Array.from(bytes.subarray(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(bytes.toString('latin1')).toContain('word/document.xml');

    expect(external).toEqual([]);
    expect(failed).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('taranmış gibi PDF: ilk sayfa çizilip OCR yapılır', async ({ page }) => {
    test.slow();
    test.setTimeout(120_000);
    const external = trackExternalRequests(page);
    const failed = trackFailedResponses(page);
    await page.goto('/resimden-yaziya/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#files li')).toContainText('3 sayfa');
    await expect(page.locator('#field-pages')).toBeVisible();
    await expect(page.locator('#pages-total')).toHaveText('3');
    await page.locator('#opt-pages').fill('1');
    await page.locator('#opt-lang').selectOption('eng');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 110_000 });
    await expect(page.locator('#result-info')).toContainText('1 sayfa');
    expect(external).toEqual([]);
    expect(failed).toEqual([]);
  });

  test('bozuk PDF anlaşılır hata verir, düğmeler gizli kalır', async ({ page }) => {
    await page.goto('/resimden-yaziya/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/bozuk|geçerli bir PDF/);
    await expect(page.locator('#actions')).toBeHidden();
  });

  test('şifreli PDF ve desteklenmeyen dosya reddedilir', async ({ page }) => {
    await page.goto('/resimden-yaziya/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli/);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'not.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba') });
    await expect(page.locator('#error')).toContainText('desteklenmiyor');
    await expect(page.locator('#actions')).toBeHidden();
  });
});
