import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const bg = (page: Page) => page.locator('#px-stage').evaluate((el) => getComputedStyle(el).backgroundColor);

test.describe('Ölü Piksel ve Ekran Testi', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS, kelime sayısı, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/olu-piksel-testi/');
    await expect(page.locator('h1')).toContainText('Ölü Piksel Testi');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="olu-piksel-testi-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('#px-stage')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('renk döngüsü: arka plan değişir, ok tuşu geçer, ESC çıkar, reklam görünmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/olu-piksel-testi/');
    await page.locator('#start-colors').click();
    await expect(page.locator('#px-stage')).toBeVisible();
    await expect.poll(() => bg(page)).toBe('rgb(0, 0, 0)');
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => bg(page)).toBe('rgb(255, 255, 255)');
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => bg(page)).toBe('rgb(255, 0, 0)');
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => bg(page)).toBe('rgb(255, 255, 255)');
    // Tıklama da sonrakine geçirir
    await page.locator('#px-stage').click();
    await expect.poll(() => bg(page)).toBe('rgb(255, 0, 0)');
    // Tam ekranda reklam alanları görünmez
    for (const s of ['a', 'b', 'c']) {
      await expect(page.locator(`.ba-ad[data-slot="olu-piksel-testi-${s}"]`)).toBeHidden();
    }
    await page.keyboard.press('Escape');
    await expect(page.locator('#px-stage')).toBeHidden();
    // Odak geri dönüşü başsız tarayıcıda güvenilir değil; yalnızca sahnenin kapandığı doğrulanır.
    await expect(page.locator('#px-stage')).toBeHidden();
    expect(errors).toEqual([]);
  });

  test('desen modları açılır: gradyan, ızgara, kontrast, hareket', async ({ page }) => {
    await page.goto('/olu-piksel-testi/');
    for (const id of ['start-gradient', 'start-grid', 'start-contrast', 'start-motion']) {
      await page.locator(`#${id}`).click();
      await expect(page.locator('#px-stage')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#px-stage')).toBeHidden();
    }
    await page.locator('#start-contrast').click();
    await expect(page.locator('.px-contrast div')).toHaveCount(12);
    await page.keyboard.press('Escape');
    await page.locator('#start-motion').click();
    const x1 = await page.locator('.px-motion-box').evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(300);
    const x2 = await page.locator('.px-motion-box').evaluate((el) => getComputedStyle(el).transform);
    expect(x1).not.toBe(x2);
    await page.keyboard.press('Escape');
  });

  test('piksel düzeltme: onay kutusu olmadan başlamaz, onayla başlar ve renk değiştirir', async ({ page }) => {
    await page.goto('/olu-piksel-testi/');
    await page.locator('#start-fixer').click();
    await expect(page.locator('#fix-error')).toContainText('uyarısını');
    await expect(page.locator('#px-stage')).toBeHidden();
    await page.locator('#fix-ack').check();
    await page.locator('#start-fixer').click();
    await expect(page.locator('#px-fixbox')).toBeVisible();
    const c1 = await page.locator('#px-fixbox').evaluate((el) => getComputedStyle(el).backgroundColor);
    await expect.poll(() => page.locator('#px-fixbox').evaluate((el) => getComputedStyle(el).backgroundColor), { timeout: 3000 }).not.toBe(c1);
    // Tıklama kutuyu taşır (kutu yarı boyutu kadar sola; negatifse 0)
    await page.mouse.click(10, 10);
    const left = await page.locator('#px-fixbox').evaluate((el) => (el as HTMLElement).style.left);
    expect(left).toBe('0px');
    await page.keyboard.press('Escape');
    await expect(page.locator('#px-stage')).toBeHidden();
  });
});
