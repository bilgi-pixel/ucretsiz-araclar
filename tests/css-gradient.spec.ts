import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

test.describe('CSS Gradient Oluşturucu', () => {
  test('iki duraktan doğru CSS üretir, palet ve PNG çalışır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/css-gradient/');
    await expect(page.locator('#css-out')).toHaveValue('background: linear-gradient(90deg, #7b2331 0%, #ffffff 100%);');
    await page.locator('.g-color').first().fill('#112233');
    await expect(page.locator('#css-out')).toHaveValue(/linear-gradient\(90deg, #112233 0%, #ffffff 100%\)/);
    await page.locator('.g-color').first().fill('#7b2331');
    await expect(page.locator('#css-out')).toHaveValue(/linear-gradient\(90deg, #7b2331 0%, #ffffff 100%\)/);

    // Gölge ve köşe
    await page.locator('#tab-shadow').click();
    await page.locator('#layer-add').click();
    await expect(page.locator('#css-out')).toHaveValue(/box-shadow: 0px 10px 25px 0px rgb\(0 0 0 \/ 0.25\);/);
    await page.locator('#tab-radius').click();
    await page.locator('#r-all').fill('12');
    await expect(page.locator('#css-out')).toHaveValue(/border-radius: 12px;/);

    // Palet (20 adet) ve radyal
    await page.locator('#tab-grad').click();
    await expect(page.locator('#palette button')).toHaveCount(20);
    await page.locator('#palette button').first().click();
    await expect(page.locator('#css-out')).toHaveValue(/linear-gradient\(135deg, #7b2331 0%, #e8a04c 100%\)/);
    await page.locator('#g-type').selectOption('radial');
    await expect(page.locator('#css-out')).toHaveValue(/radial-gradient\(circle at 50% 50%, /);

    // PNG indirme
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#png-btn').click()]);
    expect(dl.suggestedFilename()).toBe('gradient-1200x630.png');
    const buf = readFileSync(await dl.path()!);
    expect(buf.subarray(1, 4).toString()).toBe('PNG');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tek duraklı silme ve geçersiz PNG boyutu Türkçe hata verir', async ({ page }) => {
    await page.goto('/css-gradient/');
    await page.locator('#stops button').first().click();
    await expect(page.locator('#error')).toContainText('En az iki renk durağı');
    await page.locator('#png-size').selectOption('custom');
    await page.locator('#png-w').fill('5000');
    await page.locator('#png-btn').click();
    await expect(page.locator('#error')).toContainText('4096');
  });
});
