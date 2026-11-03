import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

test.describe('Ekran Çözünürlüğü ve Tarayıcı Bilgisi', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS, kelime sayısı, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ekran-cozunurlugu/');
    await expect(page.locator('h1')).toContainText('Ekran Çözünürlüğüm');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="ekran-cozunurlugu-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('görünüm alanı değerleri viewportSize ile eşit; ekran ve tarayıcı satırları dolu', async ({ page }) => {
    await page.goto('/ekran-cozunurlugu/');
    const vp = page.viewportSize()!;
    await expect(page.locator('#v-viewport')).toHaveText(`${vp.width} × ${vp.height} piksel`);
    await expect(page.locator('#v-screen')).toContainText('×');
    await expect(page.locator('#v-browser')).toContainText('Chrome');
    await expect(page.locator('#v-online')).toHaveText('Çevrimiçi');
    // Pencere boyutu değişince görünüm alanı güncellenir
    await page.setViewportSize({ width: 800, height: 600 });
    await expect(page.locator('#v-viewport')).toHaveText('800 × 600 piksel');
  });

  test('oran hesaplayıcı: 1920×1080 → 16:9, hatalı giriş Türkçe uyarı verir', async ({ page }) => {
    await page.goto('/ekran-cozunurlugu/');
    await page.locator('#rw').fill('1920');
    await page.locator('#rh').fill('1080');
    await expect(page.locator('#ratio-out')).toContainText('16:9');
    await page.locator('#rh').fill('1200');
    await expect(page.locator('#ratio-out')).toContainText('8:5');
    await page.locator('#rh').fill('0');
    await expect(page.locator('#ratio-error')).toContainText('tam sayı');
  });

  test('PPI tahmini inç girilince hesaplanır', async ({ page }) => {
    await page.goto('/ekran-cozunurlugu/');
    await page.locator('#inch').fill('15.6');
    await expect(page.locator('#ppi-out')).toContainText('PPI');
    await expect(page.locator('#v-ppi')).toContainText('PPI');
  });

  test('kopyala: pano içeriği ekran bilgisini içerir', async ({ page }) => {
    await page.goto('/ekran-cozunurlugu/');
    await page.locator('#copy-btn').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    const vp = page.viewportSize()!;
    expect(clip).toContain('Ekran çözünürlüğü:');
    expect(clip).toContain(`${vp.width} × ${vp.height}`);
  });

  test('yenileme hızı ölçümü sonuç verir', async ({ page }) => {
    await page.goto('/ekran-cozunurlugu/');
    await expect(page.locator('#v-hz')).toContainText('Hz', { timeout: 10_000 });
  });
});
