import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

// Headless tarayıcıda ekran paylaşımı izni yok; getDisplayMedia yerine hareketli bir canvas akışı koyarız.
const FAKE_DISPLAY = `
  const canvas = document.createElement('canvas');
  canvas.width = 320; canvas.height = 240;
  const ctx = canvas.getContext('2d');
  let t = 0;
  setInterval(() => {
    t++;
    ctx.fillStyle = 'hsl(' + (t * 7 % 360) + ',70%,50%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff'; ctx.font = '40px sans-serif'; ctx.fillText(String(t), 40, 120);
  }, 50);
  window.__fakeDisplayCalls = [];
  navigator.mediaDevices.getDisplayMedia = async (c) => { window.__fakeDisplayCalls.push(c); return canvas.captureStream(30); };
`;

test.describe('Ekran Kaydedici', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS ≥ 6, ≥ 800 kelime, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ekran-kaydedici/');

    await expect(page.locator('h1')).toContainText('Ekran Kaydedici');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-topbar')).toContainText('dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();

    // Reklam: araç kutusunun içinde/önünde değil; ilk reklam .ba-tool'dan sonra gelir.
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad')!;
      return tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING;
    });
    expect(order).toBeTruthy();
    expect(await page.locator('.ba-ad').count()).toBeGreaterThanOrEqual(3);

    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(800);

    // Chromium destekler: destek uyarısı yok, başlat düğmesi etkin.
    await expect(page.locator('#start')).toBeEnabled();
    await expect(page.locator('#support')).toBeHidden();
    await expect(page.locator('#format-note')).toContainText('WebM');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kayıt → duraklat/devam → durdur → WebM indirilir (boyut > 0, EBML başlığı)', async ({ page }) => {
    test.setTimeout(90_000);
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(FAKE_DISPLAY);
    await page.goto('/ekran-kaydedici/');

    await page.locator('#opt-sysaudio').uncheck();
    await page.locator('#opt-res').selectOption('720');
    await page.locator('#start').click();

    // Gerçek 3 sn geri sayım çalışır, sonra kayıt başlar.
    await expect(page.locator('#countdown')).toBeVisible();
    await expect(page.locator('#rec-state')).toHaveText('Kayıt sürüyor', { timeout: 10_000 });
    const calls = await page.evaluate(() => (window as any).__fakeDisplayCalls);
    expect(calls[0].video.width.ideal).toBe(1280);
    expect(calls[0].audio).toBe(false);
    await expect(page.locator('#live')).toBeVisible();
    await page.waitForTimeout(2500);
    await expect(page.locator('#timer')).not.toHaveText('00:00');

    await page.locator('#pause').click();
    await expect(page.locator('#rec-state')).toHaveText('Duraklatıldı');
    await expect(page.locator('#pause')).toHaveText('Devam et');
    await page.locator('#pause').click();
    await expect(page.locator('#rec-state')).toHaveText('Kayıt sürüyor');
    await page.waitForTimeout(1500);

    await page.locator('#stop').click();
    await expect(page.locator('#result')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#result')).toHaveAttribute('data-mime', 'video/webm');
    const bytes = Number(await page.locator('#result').getAttribute('data-bytes'));
    expect(bytes).toBeGreaterThan(0);
    await expect(page.locator('#result-meta')).toContainText('WEBM');
    await expect(page.locator('#controls')).toBeHidden();
    await expect(page.locator('#start')).toBeEnabled();

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toMatch(/^ekran-kaydi-\d{4}-\d{2}-\d{2}-\d{4}\.webm$/);
    const buf = readFileSync((await dl.path())!);
    expect(buf.length).toBeGreaterThan(0);
    expect(buf.length).toBe(bytes);
    // WebM = Matroska/EBML: ilk dört bayt 1A 45 DF A3
    expect(buf.subarray(0, 4).toString('hex')).toBe('1a45dfa3');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geri sayım kapalıyken hemen başlar; tarayıcının "Paylaşımı durdur"u kaydı bitirir', async ({ page }) => {
    await page.addInitScript(FAKE_DISPLAY);
    await page.goto('/ekran-kaydedici/');
    await page.locator('#opt-countdown').uncheck();
    await page.locator('#start').click();
    await expect(page.locator('#rec-state')).toHaveText('Kayıt sürüyor', { timeout: 5_000 });
    await expect(page.locator('#countdown')).toBeHidden();
    await page.waitForTimeout(1500);
    // Kullanıcı tarayıcı çubuğundan paylaşımı kesti → video parçası 'ended'
    await page.evaluate(() => { (document.getElementById('live') as HTMLVideoElement).srcObject!.getVideoTracks()[0].stop(); });
    await page.evaluate(() => {
      const track = (document.getElementById('live') as HTMLVideoElement).srcObject?.getVideoTracks?.()[0];
      track && track.dispatchEvent(new Event('ended'));
    });
    await expect(page.locator('#result')).toBeVisible({ timeout: 15_000 });
    expect(Number(await page.locator('#result').getAttribute('data-bytes'))).toBeGreaterThan(0);
  });

  test('izin reddedilince Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getDisplayMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto('/ekran-kaydedici/');
    await page.locator('#start').click();
    await expect(page.locator('#error')).toContainText('izin verilmedi');
    await expect(page.locator('#error')).toContainText('Paylaş');
    await expect(page.locator('#start')).toBeEnabled();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('desteklenmeyen tarayıcı: getDisplayMedia yoksa mesaj ve düğme kapalı', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => {
      Object.defineProperty(MediaDevices.prototype, 'getDisplayMedia', { value: undefined, configurable: true });
    });
    await page.goto('/ekran-kaydedici/');
    await expect(page.locator('#support')).toBeVisible();
    await expect(page.locator('#support')).toContainText('desteklemiyor');
    await expect(page.locator('#support')).toContainText('Chrome');
    await expect(page.locator('#start')).toBeDisabled();
    await expect(page.locator('#options')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('mobil kullanıcı ajanı: mobilde desteklenmeme mesajı', async ({ browser }) => {
    const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36', viewport: { width: 360, height: 740 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      Object.defineProperty(MediaDevices.prototype, 'getDisplayMedia', { value: undefined, configurable: true });
    });
    await page.goto('/ekran-kaydedici/');
    await expect(page.locator('#support')).toContainText('mobilde çalışmaz');
    await expect(page.locator('#start')).toBeDisabled();
    await ctx.close();
  });
});
