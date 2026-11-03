import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Markdown Editör ve Önizleme', () => {
  test('# Başlık h1 olur, tablo ve kod bloğu çizilir, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/markdown-onizleme/');
    await page.locator('#editor').fill('# Başlık\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n```js\nconst x = 1;\n```\n');
    await expect(page.locator('#preview h1')).toHaveText('Başlık');
    await expect(page.locator('#preview table th')).toHaveCount(2);
    await expect(page.locator('#preview table td').first()).toHaveText('1');
    await expect(page.locator('#preview pre code')).toContainText('const x = 1;');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('script, olay öznitelikleri, javascript: bağlantısı ve dış görsel temizlenir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const dialogs: string[] = [];
    page.on('dialog', async (d) => { dialogs.push(d.message()); await d.dismiss(); });
    await page.goto('/markdown-onizleme/');
    await page.locator('#editor').fill(
      'Merhaba\n\n<script>alert(1)</script>\n\n<iframe src="https://example.com"></iframe>\n\n<img src="x" onerror="alert(2)">\n\n<img src="https://example.com/a.png" alt="dış">\n\n[tıkla](javascript:alert(3))\n\n<b onclick="alert(4)">kalın</b>\n',
    );
    await expect(page.locator('#preview')).toContainText('Merhaba');
    const html = await page.locator('#preview').innerHTML();
    expect(html).not.toMatch(/<script|<iframe|onerror|onclick|javascript:/i);
    await expect(page.locator('#preview b')).toHaveText('kalın');
    await expect(page.locator('#preview img')).toHaveCount(0);
    await expect(page.locator('#preview')).toContainText('görsel engellendi');
    await page.waitForTimeout(300);
    expect(dialogs).toEqual([]);
    expect(external).toEqual([]);
  });

  test('araç çubuğu, .md yükleme, .md ve .html indirme', async ({ page }) => {
    await page.goto('/markdown-onizleme/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'not.md', mimeType: 'text/markdown', buffer: Buffer.from('merhaba dünya') });
    await expect(page.locator('#editor')).toHaveValue('merhaba dünya');
    await page.locator('#editor').focus();
    await page.locator('#editor').press('Control+a');
    await page.locator('[data-md=bold]').click();
    await expect(page.locator('#editor')).toHaveValue('**merhaba dünya**');
    await expect(page.locator('#preview strong')).toHaveText('merhaba dünya');

    const [dlMd] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-md').click()]);
    expect(dlMd.suggestedFilename()).toBe('not.md');
    expect(readFileSync((await dlMd.path())!, 'utf8')).toBe('**merhaba dünya**');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-html').click()]);
    expect(dl.suggestedFilename()).toBe('not.html');
    const html = readFileSync((await dl.path())!, 'utf8');
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<strong>merhaba dünya</strong>');
    expect(html).not.toContain('<script');
  });

  test('boş metinde indirme Türkçe hata verir; dar ekranda sekmeler çalışır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/markdown-onizleme/');
    await expect(page.locator('#preview')).toBeHidden();
    await page.locator('#tab-preview').click();
    await expect(page.locator('#preview')).toBeVisible();
    await expect(page.locator('#editor')).toBeHidden();
    await page.locator('#tab-edit').click();
    await page.locator('#btn-clear').click();
    await page.locator('#btn-html').click();
    await expect(page.locator('#error')).toContainText('İndirilecek');
  });
});
