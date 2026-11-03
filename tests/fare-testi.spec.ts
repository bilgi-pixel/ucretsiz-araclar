import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Fare Testi', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS >= 7, >= 900 kelime, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/fare-testi/');
    await expect(page.locator('h1')).toContainText('Fare Testi');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="fare-testi-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tıklama, çift tıklama uyarısı ve tekerlek sayaçları', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/fare-testi/');
    const pad = page.locator('#click-pad');
    await pad.scrollIntoViewIfNeeded();
    await pad.hover();
    await page.mouse.click(...(await center(page, '#click-pad')), { button: 'left' });
    await page.mouse.click(...(await center(page, '#click-pad')), { button: 'right' });
    await page.mouse.click(...(await center(page, '#click-pad')), { button: 'middle' });
    await expect(page.locator('#b0-n')).toHaveText('1');
    await expect(page.locator('#b2-n')).toHaveText('1');
    await expect(page.locator('#b1-n')).toHaveText('1');
    await expect(page.locator('#sus-warn')).toBeHidden();

    // Programatik hızlı çift tıklama: 80 ms altı -> uyarı
    const [x, y] = await center(page, '#click-pad');
    await page.mouse.click(x, y);
    await page.mouse.click(x, y);
    await expect(page.locator('#sus-warn')).toBeVisible();
    await expect(page.locator('#sus-count')).not.toHaveText('0');
    await expect(page.locator('#report')).toContainText('Sol');

    // Tekerlek
    const wp = page.locator('#wheel-pad');
    await wp.scrollIntoViewIfNeeded();
    await wp.hover();
    await page.mouse.wheel(0, 120);
    await page.mouse.wheel(0, -120);
    await page.mouse.wheel(0, 120);
    await expect(page.locator('#w-down')).toHaveText('2');
    await expect(page.locator('#w-up')).toHaveText('1');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('CPS testi: 2 sn içinde tıklamalar sayılır, sonuç yazılır', async ({ page }) => {
    await page.goto('/fare-testi/');
    await page.locator('input[name="cps-dur"][value="2"]').check();
    const pad = page.locator('#cps-pad');
    await pad.scrollIntoViewIfNeeded();
    for (let i = 0; i < 6; i++) await pad.click();
    await expect(page.locator('#cps-count')).toHaveText('6');
    await expect(page.locator('#cps-time')).toHaveText('Bitti', { timeout: 4000 });
    await expect(page.locator('#cps-last')).toHaveText('3,0');
    // Süre bittikten sonraki ilk tıklama yeni tur başlatır
    await pad.click();
    await expect(page.locator('#cps-count')).toHaveText('1');
    await page.locator('#cps-reset').click();
    await expect(page.locator('#cps-count')).toHaveText('0');
  });

  test('çizim alanı olayları sayar, rapor kopyalanır ve sıfırlanır', async ({ page }) => {
    await page.goto('/fare-testi/');
    const cv = page.locator('#draw');
    await cv.scrollIntoViewIfNeeded();
    const box = (await cv.boundingBox())!;
    await page.mouse.move(box.x + 20, box.y + 20);
    await page.mouse.move(box.x + box.width - 20, box.y + box.height - 20, { steps: 30 });
    await expect(page.locator('#pi-type')).toHaveText('mouse');
    expect(Number(await page.locator('#move-count').textContent())).toBeGreaterThan(5);
    await page.locator('#btn-copy').click();
    await expect(page.locator('#copy-msg')).not.toBeEmpty();
    await page.locator('#btn-reset').click();
    await expect(page.locator('#move-count')).toHaveText('0');
    await expect(page.locator('#b0-n')).toHaveText('0');
  });
});

async function center(page: import('@playwright/test').Page, sel: string): Promise<[number, number]> {
  const b = (await page.locator(sel).boundingBox())!;
  return [b.x + b.width / 2, b.y + b.height / 2];
}
