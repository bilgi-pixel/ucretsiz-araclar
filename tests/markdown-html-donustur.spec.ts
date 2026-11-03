import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Markdown → HTML Dönüştürücü', () => {
  test('başlık, tablo ve script temizliği; .html iner; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/markdown-html-donustur/');
    await expect(page.locator('#output-wrap')).toBeHidden();
    const md = '# Başlık\n\nMerhaba **dünya**\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n<script>alert(1)</script>\n\n![x](https://example.com/a.png)\n\n```js\nlet a = 1;\n```\n';
    await page.locator('#md-input').fill(md);
    const out = page.locator('#html-out');
    await expect(out).toHaveValue(/<h1 id="baslik">Başlık<\/h1>/);
    await expect(out).toHaveValue(/<table>/);
    await expect(out).not.toHaveValue(/<script/);
    await expect(out).toHaveValue(/<!doctype html>/);
    // yalnızca gövde
    await page.locator('#opt-mode').selectOption('body');
    await expect(out).not.toHaveValue(/<!doctype html>/);
    await page.locator('#opt-mode').selectOption('full');
    // satır içi stil
    await page.locator('#opt-inline').check();
    await expect(out).toHaveValue(/<pre style=/);
    // önizleme sekmesi
    await page.locator('#tab-preview').click();
    await expect(page.locator('#panel-preview')).toBeVisible();
    await expect(page.frameLocator('#preview').locator('h1')).toHaveText('Başlık');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-html').click()]);
    expect(dl.suggestedFilename()).toBe('belge.html');
    const html = readFileSync((await dl.path())!, 'utf8');
    expect(html).toContain('<h1 id="baslik">');
    expect(html).toContain('<table>');
    expect(html).not.toContain('<script');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('.md dosyası yüklenir, adı korunarak .html iner; toplu ZIP iner', async ({ page }) => {
    await page.goto('/markdown-html-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'not-ş.md', mimeType: 'text/markdown', buffer: Buffer.from('## Giriş\n\nmetin') });
    await expect(page.locator('#html-out')).toHaveValue(/<h2 id="giris">Giriş<\/h2>/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-html').click()]);
    expect(dl.suggestedFilename()).toBe('not-ş.html');

    await page.locator('#drop input[type=file]').setInputFiles([
      { name: 'a.md', mimeType: 'text/markdown', buffer: Buffer.from('# A') },
      { name: 'b.md', mimeType: 'text/markdown', buffer: Buffer.from('# B') },
    ]);
    await expect(page.locator('#btn-zip')).toBeVisible();
    const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-zip').click()]);
    expect(zip.suggestedFilename()).toBe('markdown-html.zip');
    const head = readFileSync((await zip.path())!).subarray(0, 2).toString();
    expect(head).toBe('PK');
  });

  test('boş girdi ve ikili dosya Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/markdown-html-donustur/');
    await page.locator('#md-input').fill('');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.md', mimeType: 'application/octet-stream', buffer: Buffer.from([0x50, 0x4b, 0x00, 0x03, 0x00, 0x00]) });
    await expect(page.locator('#error')).toContainText('Okunamayan dosya');
    await expect(page.locator('#error')).toContainText('.md');
    await expect(page.locator('#output-wrap')).toBeHidden();
  });
});
