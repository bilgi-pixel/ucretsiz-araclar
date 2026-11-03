import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('WhatsApp Link ve QR Oluşturucu', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('0532 123 45 67 → wa.me bağlantısı, QR PNG iner, HTML kopyalanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/whatsapp-link/');
    await expect(page.locator('#result')).toBeHidden();
    const msg = 'Merhaba, fiyat öğrenmek istiyorum 😊\nTeşekkürler';
    await page.locator('#phone').fill('0532 123 45 67');
    await page.locator('#message').fill(msg);
    await expect(page.locator('#link-out')).toHaveValue('https://wa.me/905321234567?text=' + encodeURIComponent(msg));
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(dl.suggestedFilename()).toBe('whatsapp-qr-905321234567.png');
    const head = readFileSync((await dl.path())!).subarray(0, 8);
    expect(Array.from(head)).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    const [svgDl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-svg').click()]);
    expect(readFileSync((await svgDl.path())!, 'utf8')).toContain('<svg');

    await page.locator('#copy-html').click();
    await expect(page.locator('#html-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('<a href="https://wa.me/905321234567?text=');
    expect(clip).toContain('WhatsApp ile yazın');
    expect(clip).toContain('target="_blank"');

    await page.locator('#copy-link').click();
    await expect(page.locator('#link-status')).toContainText('kopyalandı');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('https://wa.me/905321234567');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ülke kodu, + biçimi ve toplu liste', async ({ page }) => {
    await page.goto('/whatsapp-link/');
    await page.locator('#country').selectOption({ label: 'Almanya (+49)' });
    await page.locator('#phone').fill('0151 2345 6789');
    await expect(page.locator('#link-out')).toHaveValue('https://wa.me/4915123456789');
    await page.locator('#phone').fill('+90 (532) 123-45-67');
    await expect(page.locator('#link-out')).toHaveValue('https://wa.me/905321234567');
    await page.locator('#country').selectOption({ index: 0 });
    await page.locator('#bulk').fill('0532 123 45 67\n123\n0555 987 65 43');
    await page.locator('#bulk-make').click();
    await expect(page.locator('#bulk-list li')).toHaveCount(3);
    await expect(page.locator('#bulk-list .bad')).toHaveCount(1);
    await expect(page.locator('#bulk-list')).toContainText('https://wa.me/905559876543');
  });

  test('geçersiz numara Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/whatsapp-link/');
    await page.locator('#phone').fill('12');
    await expect(page.locator('#error')).toContainText('8-15 hane');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#phone').fill('0532 123 45 67');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });
});
