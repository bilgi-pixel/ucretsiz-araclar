import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Sahte kamera/mikrofon: Chromium'un yerleşik test cihazları
test.use({
  launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] },
  permissions: ['camera', 'microphone'],
});

test.describe('Kamera ve Mikrofon Testi', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS ≥ 6, ≥ 800 kelime, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kamera-test/');
    await expect(page.locator('h1')).toContainText('Kamera ve Mikrofon Testi');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBeGreaterThanOrEqual(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(800);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kamera: görüntü gelir (videoWidth > 0), fotoğraf çekilip PNG indirilir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kamera-test/');
    await page.locator('#cam-start').click();
    await expect(page.locator('#cam-stage')).toBeVisible();
    await expect.poll(() => page.locator('#cam-video').evaluate((v: HTMLVideoElement) => v.videoWidth), { timeout: 10_000 }).toBeGreaterThan(0);
    await expect(page.locator('#cam-info')).toContainText('×');
    await expect(page.locator('#cam-photo')).toBeEnabled();
    // Ayna kapatılınca sınıf kalkar
    await page.locator('#cam-mirror').uncheck();
    await expect(page.locator('#cam-video')).not.toHaveClass(/is-mirror/);
    await page.locator('#cam-photo').click();
    await expect(page.locator('#photo-box')).toBeVisible();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#photo-download').click()]);
    expect(dl.suggestedFilename()).toMatch(/^kamera-testi-.*\.png$/);
    const { readFileSync } = await import('node:fs');
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(1, 4).toString()).toBe('PNG');
    // Kameranın cihaz listesi doldu
    expect(await page.locator('#cam-device option').count()).toBeGreaterThan(1);
    await page.locator('#cam-stop').click();
    await expect(page.locator('#cam-stage')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('mikrofon: seviye göstergesi çalışır; hoparlör testi sayaç artırır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kamera-test/');
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-level')).toContainText('Seviye');
    // Sahte mikrofon periyodik bip üretir; en yüksek seviye sıfırdan büyük olmalı
    await expect.poll(async () => Number(await page.locator('#mic-canvas').getAttribute('data-max')), { timeout: 10_000 }).toBeGreaterThan(0);
    await page.locator('#mic-stop').click();
    await expect(page.locator('#mic-level')).toContainText('kapalı');

    await page.locator('#spk-left').click();
    await expect(page.locator('#spk-info')).toContainText('Sol kanal');
    await page.locator('#spk-right').click();
    await expect(page.locator('#spk-info')).toContainText('Sağ kanal');
    await expect(page.locator('#spk-info')).toHaveAttribute('data-played', '2');
    expect(errors).toEqual([]);
  });
});

test.describe('izin reddi', () => {
  test.use({ permissions: [] });
  test('kamera izni reddedilince Türkçe, çözüm öneren yönlendirme', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto('/kamera-test/');
    await page.locator('#cam-start').click();
    await expect(page.locator('#cam-error')).toContainText('izni verilmedi');
    await expect(page.locator('#cam-error')).toContainText('kilit');
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-error')).toContainText('Mikrofon izni verilmedi');
    await expect(page.locator('#cam-start')).toBeEnabled();
  });
});
