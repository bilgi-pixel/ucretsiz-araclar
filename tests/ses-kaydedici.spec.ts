import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

// Sahte mikrofon: Chromium'un yerleşik test cihazı
test.use({
  launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] },
  permissions: ['camera', 'microphone'],
});

test.describe('Online Ses Kaydedici', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS ≥ 6, ≥ 800 kelime, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ses-kaydedici/');
    await expect(page.locator('h1')).toContainText('Ses Kaydedici');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBeGreaterThanOrEqual(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(800);
    await expect(page.locator('#rec-start')).toBeEnabled();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('1 sn kayıt → duraklat/devam → bitir → özgün biçim ve WAV (RIFF) iner', async ({ page }) => {
    test.setTimeout(60_000);
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ses-kaydedici/');
    await page.locator('#opt-echo').uncheck();
    await page.locator('#rec-start').click();
    await expect(page.locator('#rec-state')).toHaveText('Kayıt sürüyor');
    await page.waitForTimeout(1200);
    await page.locator('#rec-pause').click();
    await expect(page.locator('#rec-state')).toHaveText('Duraklatıldı');
    await page.locator('#rec-pause').click();
    await expect(page.locator('#rec-state')).toHaveText('Kayıt sürüyor');
    await page.waitForTimeout(500);
    await page.locator('#rec-stop').click();

    const item = page.locator('#rec-list li').first();
    await expect(item).toBeVisible({ timeout: 10_000 });
    expect(Number(await item.getAttribute('data-bytes'))).toBeGreaterThan(0);
    await expect(page.locator('#rec-start')).toBeEnabled();

    const [native] = await Promise.all([page.waitForEvent('download'), item.locator('.dl-native').click()]);
    expect(native.suggestedFilename()).toMatch(/^ses-kaydi-.*\.(webm|ogg|m4a)$/);
    expect(readFileSync((await native.path())!).length).toBeGreaterThan(0);

    const [wav] = await Promise.all([page.waitForEvent('download'), item.locator('.dl-wav').click()]);
    expect(wav.suggestedFilename()).toMatch(/\.wav$/);
    const buf = readFileSync((await wav.path())!);
    expect(buf.length).toBeGreaterThan(44);
    expect(buf.subarray(0, 4).toString()).toBe('RIFF');
    expect(buf.subarray(8, 12).toString()).toBe('WAVE');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ses seçenekleri getUserMedia kısıtlarına yansır', async ({ page }) => {
    await page.addInitScript(() => {
      const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      (window as any).__calls = [];
      navigator.mediaDevices.getUserMedia = (c: any) => { (window as any).__calls.push(c); return orig(c); };
    });
    await page.goto('/ses-kaydedici/');
    await page.locator('#opt-ns').uncheck();
    await page.locator('#opt-agc').uncheck();
    await page.locator('#rec-start').click();
    await expect(page.locator('#rec-state')).toHaveText('Kayıt sürüyor');
    const calls = await page.evaluate(() => (window as any).__calls);
    expect(calls[0].audio.noiseSuppression).toBe(false);
    expect(calls[0].audio.autoGainControl).toBe(false);
    expect(calls[0].audio.echoCancellation).toBe(true);
    await page.locator('#rec-stop').click();
  });
});

test.describe('izin reddi', () => {
  test.use({ permissions: [] });
  test('mikrofon izni reddedilince Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto('/ses-kaydedici/');
    await page.locator('#rec-start').click();
    await expect(page.locator('#error')).toContainText('Mikrofon izni verilmedi');
    await expect(page.locator('#error')).toContainText('kilit');
    await expect(page.locator('#rec-start')).toBeEnabled();
    await expect(page.locator('#rec-list li')).toHaveCount(0);
  });
});
