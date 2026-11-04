import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Sahte mikrofon: Chromium'un yerleşik test cihazı ve izin penceresini otomatik onaylama
test.use({
  launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] },
  permissions: ['microphone'],
});

const URL = '/mikrofon-test/';

/** Dış istek ve pageerror toplayıcı: her testin sonunda boş olmalı. */
function guard(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

test.describe('Mikrofon Testi', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS >= 7, >= 900 kelime, JSON-LD, meta.json, dış istek yok', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await expect(page.locator('h1')).toContainText('Mikrofon Testi');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="mikrofon-test-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    // Reklam A araç kutusunun hemen altında olmalı
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="mikrofon-test-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);

    // JSON-LD: SoftwareApplication + FAQPage (en az 7 soru) ayrıştırılabilmeli
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent!)));
    expect(ld.map((x) => x['@type']).sort()).toEqual(['FAQPage', 'SoftwareApplication']);
    const faq = ld.find((x) => x['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);

    // meta.json: hub kartı için gerekli alanlar
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'mikrofon-test', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('dosya');
    expect(meta.title).toBeTruthy();
    expect(meta.description.length).toBeGreaterThan(40);
    expect(meta.keywords.length).toBeGreaterThanOrEqual(5);
    expect(typeof meta.icon).toBe('string');
    expect(meta.icon).not.toContain('\n');

    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('mikrofon başlar: seviye çubuğu, dB metni ve dalga formu güncellenir; kapatınca sıfırlanır', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#rec-toggle')).toBeDisabled();
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-level')).toContainText('dB');
    // Sahte mikrofon periyodik bip üretir: en yüksek seviye sıfırdan büyük olmalı
    await expect.poll(async () => Number(await page.locator('#mic-canvas').getAttribute('data-max')), { timeout: 12_000 }).toBeGreaterThan(0);
    expect(Number(await page.locator('#mic-level').getAttribute('data-db'))).toBeLessThan(1);
    // Dalga formu tuvalinde (yeşil çizgi) en az bir karede ses çizilmeli
    const drawn = await page.evaluate(() => new Promise<boolean>((resolve) => {
      const c = document.getElementById('wave-canvas') as HTMLCanvasElement;
      const ctx = c.getContext('2d')!;
      const t0 = performance.now();
      const look = () => {
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        for (let i = 0; i < d.length; i += 4) { if (d[i + 3] > 100 && d[i + 1] - d[i] > 60 && d[i + 1] > 120) return resolve(true); }
        if (performance.now() - t0 > 10_000) return resolve(false);
        requestAnimationFrame(look);
      };
      look();
    }));
    expect(drawn).toBe(true);
    await expect(page.locator('#mic-hint')).not.toHaveAttribute('data-state', 'idle');

    await page.locator('#mic-stop').click();
    await expect(page.locator('#mic-level')).toContainText('kapalı');
    await expect(page.locator('#mic-hint')).toHaveAttribute('data-state', 'idle');
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#rec-toggle')).toBeDisabled();
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('cihaz listesi dolar; başka cihaz seçilince test yeniden başlar', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect.poll(() => page.locator('#mic-device option').count()).toBeGreaterThan(1);
    const values = await page.locator('#mic-device option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
    const other = values.find((v) => v);
    expect(other).toBeTruthy();
    await page.locator('#mic-device').selectOption(other!);
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-level')).toContainText('dB');
    await expect(page.locator('#mic-error')).not.toHaveClass(/is-active/);
    // Gürültü bastırma kutusu değişince de yeniden başlar ve hata vermez
    await page.locator('#mic-processing').uncheck();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-error')).not.toHaveClass(/is-active/);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('kaydet ve dinle: kayıt bellekte oluşur, sayfada oynar, isteğe bağlı indirilir', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#rec-toggle')).toBeEnabled();
    await expect(page.locator('#rec-audio')).toBeHidden();
    await page.locator('#rec-toggle').click();
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'recording');
    await expect(page.locator('#rec-toggle')).toHaveText('Kaydı durdur');
    await page.waitForTimeout(1600);
    await page.locator('#rec-toggle').click();
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'ready', { timeout: 8000 });
    await expect(page.locator('#rec-status')).toContainText('Kayıt hazır');
    await expect(page.locator('#rec-toggle')).toHaveText('Kaydı başlat');
    await expect(page.locator('#rec-audio')).toBeVisible();
    // Kayıt bellekte bir blob adresidir; sunucuya gitmez
    expect(await page.locator('#rec-audio').getAttribute('src')).toMatch(/^blob:/);
    // Oynatma: webm kayıtlarda süre bilgisi bulunmaz (Infinity), bu yüzden yalnızca oynatmanın başladığını doğrula
    const playing = await page.evaluate(async () => {
      const a = document.getElementById('rec-audio') as HTMLAudioElement;
      try { await a.play(); } catch (e) { return `hata: ${e}`; }
      return a.paused ? 'durdu' : 'çalıyor';
    });
    expect(['çalıyor', 'durdu']).toContain(playing); // çok kısa kayıt hemen bitmiş olabilir; hata olmamalı
    expect(playing.startsWith('hata')).toBe(false);

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#rec-download').click()]);
    expect(dl.suggestedFilename()).toMatch(/^mikrofon-kaydi-\d{4}-\d{2}-\d{2}-\d{4}\.(webm|m4a|ogg)$/);
    const buf = readFileSync((await dl.path())!);
    expect(buf.length).toBeGreaterThan(200);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('kayıt 10 saniyede kendiliğinden durur', async ({ page }) => {
    test.setTimeout(45_000);
    const g = guard(page);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await page.locator('#rec-toggle').click();
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'recording');
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'ready', { timeout: 15_000 });
    await expect(page.locator('#rec-status')).toContainText(/10,\d sn/);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('mediaDevices yoksa destek uyarısı görünür ve başlat düğmesi kapanır', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'mediaDevices', { value: undefined, configurable: true });
    });
    await page.goto(URL);
    await expect(page.locator('#support')).toBeVisible();
    await expect(page.locator('#support')).toContainText('desteklemiyor');
    await expect(page.locator('#mic-start')).toBeDisabled();
    expect(g.errors).toEqual([]);
    expect(g.external).toEqual([]);
  });

  test('360px: yatay taşma yok, düğmeler sığar, klavyeyle başlatılır', async ({ page }) => {
    const g = guard(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(360);
    for (const sel of ['#mic-device', '#mic-start', '#mic-stop', '#rec-toggle', '#mic-canvas', '#wave-canvas']) {
      const box = await page.locator(sel).boundingBox();
      expect(box, sel).not.toBeNull();
      expect(box!.x + box!.width, sel).toBeLessThanOrEqual(360.5);
    }
    // Klavye: Tab ile gezinip Enter ile başlat
    await page.locator('#mic-device').focus();
    await page.keyboard.press('Tab'); // gürültü bastırma kutusu
    await expect(page.locator('#mic-processing')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#mic-start')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-level')).toContainText('dB');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });
});

test.describe('izin ve cihaz hataları', () => {
  test.use({ permissions: [] });

  test('izin reddi: Türkçe hata ve Chrome/Firefox/Windows/macOS adımları', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto(URL);
    await expect(page.locator('#perm-help')).toBeHidden();
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-error')).toContainText('Mikrofon izni verilmedi');
    await expect(page.locator('#mic-error')).toContainText('kilit');
    await expect(page.locator('#mic-error')).toContainText('Windows');
    await expect(page.locator('#mic-error')).toContainText('macOS');
    const help = page.locator('#perm-help');
    await expect(help).toBeVisible();
    for (const word of ['Chrome', 'Edge', 'Firefox', 'Safari', 'Windows', 'macOS']) await expect(help).toContainText(word);
    await expect(page.locator('#mic-start')).toBeEnabled();
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#rec-toggle')).toBeDisabled();
    expect(g.errors).toEqual([]);
    expect(g.external).toEqual([]);
  });

  test('cihaz yok / kullanımda / seçili cihaz kayıp: her biri çözüm öneren Türkçe mesaj verir', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      (window as any).__gumError = 'NotFoundError';
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('x', (window as any).__gumError); };
    });
    await page.goto(URL);
    const cases: Array<[string, string]> = [
      ['NotFoundError', 'Mikrofon bulunamadı'],
      ['NotReadableError', 'başka bir uygulama'],
      ['OverconstrainedError', 'artık kullanılamıyor'],
      ['SomethingElse', 'Mikrofon başlatılamadı'],
    ];
    for (const [name, text] of cases) {
      await page.evaluate((n) => { (window as any).__gumError = n; }, name);
      await page.locator('#mic-start').click();
      await expect(page.locator('#mic-error')).toContainText(text);
      await expect(page.locator('#mic-error')).toHaveClass(/is-active/);
      // İzin adımları paneli yalnızca izin reddinde açılır
      await expect(page.locator('#perm-help')).toBeHidden();
      await expect(page.locator('#mic-start')).toBeEnabled();
    }
    expect(g.errors).toEqual([]);
    expect(g.external).toEqual([]);
  });
});
