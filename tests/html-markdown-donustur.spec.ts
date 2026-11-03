import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('HTML → Markdown Dönüştürücü', () => {
  test('başlık, liste ve tablo dönüşür; .md iner; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/html-markdown-donustur/');
    await expect(page.locator('#output-wrap')).toBeHidden();
    await page.locator('#html-input').fill('<h2>Giriş</h2><ul><li>a</li></ul><p><a href="https://bilisimajans.com/">site</a> <img src="https://example.com/x.png" alt="x"></p>');
    const out = page.locator('#md-out');
    await expect(out).toHaveValue(/## Giriş/);
    await expect(out).toHaveValue(/^- a$/m);
    await expect(out).toHaveValue(/\[site\]\(https:\/\/bilisimajans\.com\/\)/);
    // bağlantıları kapat
    await page.locator('#opt-links').uncheck();
    await expect(out).not.toHaveValue(/\[site\]/);
    await page.locator('#opt-links').check();
    // madde işareti
    await page.locator('#opt-bullet').selectOption('*');
    await expect(out).toHaveValue(/^\* a$/m);
    await page.locator('#opt-bullet').selectOption('-');
    // tablo
    await page.locator('#html-input').fill('<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>');
    await expect(out).toHaveValue(/\| A \| B \|/);
    await expect(out).toHaveValue(/\| --- \| --- \|/);
    await expect(out).toHaveValue(/\| 1 \| 2 \|/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-md').click()]);
    expect(dl.suggestedFilename()).toBe('belge.md');
    expect(readFileSync((await dl.path())!, 'utf8')).toContain('| A | B |');
    // dış görsele istek yapılmamalı
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('.html dosyası yüklenir; script atılır; kod çiti', async ({ page }) => {
    await page.goto('/html-markdown-donustur/');
    const src = '<!doctype html><html><head><title>t</title><script>alert(1)</script></head><body><h1>Sayfa</h1><script>alert(2)</script><pre><code class="language-js">let a = 1;</code></pre></body></html>';
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'sayfa-ş.html', mimeType: 'text/html', buffer: Buffer.from(src) });
    const out = page.locator('#md-out');
    await expect(out).toHaveValue(/# Sayfa/);
    await expect(out).toHaveValue(/```js/);
    await expect(out).not.toHaveValue(/alert/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-md').click()]);
    expect(dl.suggestedFilename()).toBe('sayfa-ş.md');
  });

  test('boş girdi ve ikili dosya Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/html-markdown-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.html', mimeType: 'application/octet-stream', buffer: Buffer.from([0x25, 0x50, 0x44, 0x46, 0x00, 0x01]) });
    await expect(page.locator('#error')).toContainText('Dosya okunamadı');
    await expect(page.locator('#error')).toContainText('.html');
    await page.locator('#html-input').fill('   ');
    await expect(page.locator('#output-wrap')).toBeHidden();
  });
});
