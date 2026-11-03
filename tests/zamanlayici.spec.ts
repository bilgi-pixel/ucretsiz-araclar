import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Zamanlayıcı', () => {
  test('geri sayım 2 sn → "Süre doldu" durumu; başlıkta kalan süre görünür', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/zamanlayici/');
    await page.locator('#cd-m').fill('0');
    await page.locator('#cd-s').fill('2');
    await expect(page.locator('#cd-display')).toHaveText('00:00:02');
    await page.locator('#cd-start').click();
    await expect(page.locator('#cd-status')).toHaveText('Çalışıyor');
    await expect.poll(() => page.title()).toMatch(/^00:00:0[12] – /);
    await expect(page.locator('#cd-status')).toHaveText('Süre doldu', { timeout: 6000 });
    await expect(page.locator('#cd-display')).toHaveText('00:00:00');
    await expect(page.locator('#cd-screen')).toHaveAttribute('data-state', 'done');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geri sayım: ön ayar ve boş süre hatası', async ({ page }) => {
    await page.goto('/zamanlayici/');
    await page.locator('[data-preset="10"]').click();
    await expect(page.locator('#cd-display')).toHaveText('00:10:00');
    await page.locator('#cd-m').fill('0');
    await page.locator('#cd-start').click();
    await expect(page.locator('#error')).toContainText('Süre sıfır');
  });

  test('kronometre: başlat, tur al, durdur, sıfırla', async ({ page }) => {
    await page.goto('/zamanlayici/');
    await page.locator('#tab-sw').click();
    await expect(page.locator('#sw-lap')).toBeDisabled();
    await page.locator('#sw-start').click();
    await page.waitForTimeout(400);
    await page.locator('#sw-lap').click();
    await page.waitForTimeout(300);
    await page.locator('#sw-lap').click();
    await expect(page.locator('#sw-laps li')).toHaveCount(2);
    await expect(page.locator('#sw-laps li').first()).toContainText('Tur 2');
    await page.locator('#sw-start').click();
    await expect(page.locator('#sw-status')).toHaveText('Durduruldu');
    const txt = await page.locator('#sw-display').textContent();
    expect(txt).toMatch(/^00:00\.\d{3}$/);
    expect(Number(txt!.slice(6))).toBeGreaterThanOrEqual(600);
    await page.locator('#sw-reset').click();
    await expect(page.locator('#sw-display')).toHaveText('00:00.000');
    await expect(page.locator('#sw-laps li')).toHaveCount(0);
  });

  test('pomodoro: 25/5, 50/10, aşama atlama ve tur sayacı', async ({ page }) => {
    await page.goto('/zamanlayici/');
    await page.locator('#tab-pm').click();
    await expect(page.locator('#pm-display')).toHaveText('25:00');
    await expect(page.locator('#pm-phase')).toHaveText('Odak');
    await page.locator('[data-pm="50,10"]').click();
    await expect(page.locator('#pm-display')).toHaveText('50:00');
    await page.locator('[data-pm="25,5"]').click();
    await page.locator('#pm-start').click();
    await expect(page.locator('#pm-phase')).toContainText('çalışıyor');
    await page.locator('#pm-skip').click();
    await expect(page.locator('#pm-phase')).toContainText('Kısa mola');
    await expect(page.locator('#pm-display')).toHaveText('05:00');
    await expect(page.locator('#pm-rounds')).toContainText('1');
  });

  test('Boşluk tuşu başlatır/durdurur; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/zamanlayici/');
    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await page.keyboard.press('Space');
    await expect(page.locator('#cd-status')).toHaveText('Çalışıyor');
    await page.keyboard.press('Space');
    await expect(page.locator('#cd-status')).toHaveText('Duraklatıldı');
    expect(external).toEqual([]);
  });
});
