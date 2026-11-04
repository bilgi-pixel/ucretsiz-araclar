import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Sahte mikrofon: Chromium'un yerleşik test cihazı, izin penceresini otomatik onaylama, sesli bağlamı jestsiz başlatma
test.use({
  launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', '--autoplay-policy=no-user-gesture-required'] },
  permissions: ['microphone'],
});

const URL = '/en/mic-test/';

/** Dış istek ve pageerror toplayıcı: her testin sonunda boş olmalı. */
function guard(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

/** getUserMedia'yı bilinen genlikte sinüs (440 Hz) üreten bir akışla değiştirir; genlik 0 = dijital sessizlik. */
async function mockSine(page: Page, amp: number) {
  await page.addInitScript((a) => {
    navigator.mediaDevices.getUserMedia = async () => {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.frequency.value = 440;
      const g = ctx.createGain();
      g.gain.value = a;
      const dest = ctx.createMediaStreamDestination();
      osc.connect(g).connect(dest);
      osc.start();
      if (ctx.state === 'suspended') await ctx.resume();
      return dest.stream;
    };
  }, amp);
}

test.describe('Mic Test (EN)', () => {
  test('structure: badge, ads below the tool, 900+ words, FAQ >= 7, JSON-LD, hreflang, meta.json, no external requests', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await expect(page).toHaveTitle('Mic Test – Check Your Microphone Online (Free, No Upload)');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('Mic Test');
    await expect(page.locator('.ba-badges')).toContainText('Your audio never leaves your device');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    await expect(page.locator('.ba-topbar')).toContainText('100% free');

    // Reklam: tam 3 alan, -a/-b/-c; araç kutusunun içinde hiç yok, A araç kutusundan sonra gelir
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-mic-test-${s}"]`)).toHaveCount(1);
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="en-mic-test-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);

    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const summaries = await page.locator('.ba-faq details summary').allTextContents();
    expect(summaries.length).toBeGreaterThanOrEqual(7);

    // JSON-LD: SoftwareApplication (en, USD 0) + FAQPage; sorular sayfadaki SSS ile aynı
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent!)));
    expect(ld.map((x) => x['@type']).sort()).toEqual(['FAQPage', 'SoftwareApplication']);
    const app = ld.find((x) => x['@type'] === 'SoftwareApplication');
    expect(app.inLanguage).toBe('en');
    expect(app.offers.price).toBe('0');
    expect(app.url).toBe('https://araclar.bilisimajans.com/en/mic-test/');
    const faq = ld.find((x) => x['@type'] === 'FAQPage');
    expect(faq.mainEntity.map((q: any) => q.name)).toEqual(summaries);
    // Cevaplar da birebir aynı olmalı (JSON-LD ile görünen SSS ayrışmasın)
    const answers = await page.locator('.ba-faq details > p').allTextContents();
    expect(faq.mainEntity.map((q: any) => q.acceptedAnswer.text)).toEqual(answers.map((a) => a.trim()));

    // Meta açıklama arama sonucunda kesilmeyecek uzunlukta ve gizlilik vaadini içeriyor
    const desc = (await page.locator('meta[name="description"]').getAttribute('content'))!;
    expect(desc.length).toBeLessThanOrEqual(160);
    expect(desc).toContain('never leaves your device');
    // TR karşılığına giden bağlantı dilini bildirir
    await expect(page.locator('.ba-related a[href="../../mikrofon-test/"]')).toHaveAttribute('hreflang', 'tr');
    await expect(page.locator('.ba-related a[href="../../mikrofon-test/"] span[lang="tr"]')).toHaveText('Mikrofon Testi');

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/mic-test/');
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/mikrofon-test/');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/mic-test/');
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/mikrofon-test/');

    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'en', 'mic-test', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('dosya');
    expect(meta.tr).toBe('mikrofon-test');
    expect(meta.title).toBe('Mic Test');
    expect(meta.description.length).toBeGreaterThan(40);
    expect(meta.keywords.length).toBeGreaterThanOrEqual(5);
    expect(meta.vendor).toEqual([]);
    expect(typeof meta.icon).toBe('string');
    expect(meta.icon).not.toContain('\n');

    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('known values: levelStats, fmtDb, fmtRate, fmtChannels, extFor, isBluetoothLike', async ({ page }) => {
    await page.goto(URL);
    const out = await page.evaluate(async () => {
      const m: any = await import('/en/mic-test/tool.js');
      const sine = new Float32Array(4800);
      for (let i = 0; i < sine.length; i++) sine[i] = 0.5 * Math.sin((2 * Math.PI * 1000 * i) / 48000); // tam 100 periyot
      const sq = new Float32Array(2048).map((_, i) => (i % 2 ? 1 : -1));
      const s = m.levelStats(sine), q = m.levelStats(sq), z = m.levelStats(new Float32Array(2048));
      return {
        sine: [s.db, s.peakDb, s.level], square: [q.rms, q.db, q.peakDb, q.level], silence: [z.db, z.level, m.fmtDb(z.db)],
        db: [m.fmtDb(-0.4), m.fmtDb(-9.03), m.fmtDb(-89.6), m.fmtDb(-90)],
        rate: [m.fmtRate(48000), m.fmtRate(44100), m.fmtRate(16000), m.fmtRate(0)],
        ch: [m.fmtChannels(1), m.fmtChannels(2), m.fmtChannels(undefined)],
        ext: [m.extFor('audio/webm;codecs=opus'), m.extFor('audio/mp4'), m.extFor('audio/ogg;codecs=opus'), m.extFor('')],
        bt: [
          m.isBluetoothLike('Headset (WH-1000XM4 Hands-Free AG Audio)', 48000), m.isBluetoothLike('AirPods Pro'),
          m.isBluetoothLike('Galaxy Buds2 Pro'), m.isBluetoothLike('USB Microphone', 16000),
          m.isBluetoothLike('Microphone Array (Realtek Audio)', 48000), m.isBluetoothLike('USB Microphone', 44100), m.isBluetoothLike('', undefined),
        ],
      };
    });
    // 0,5 genlikli sinüs: RMS = 0,5/√2 → 20·log10(0,35355) = -9,03 dBFS; tepe 20·log10(0,5) = -6,02 dBFS; çubuk (−9,03+60)/60 = 0,8495
    expect(out.sine[0]).toBeCloseTo(-9.031, 2);
    expect(out.sine[1]).toBeCloseTo(-6.021, 2);
    expect(out.sine[2]).toBeCloseTo(0.8495, 3);
    expect(out.square).toEqual([1, 0, 0, 1]);
    expect(out.silence).toEqual([-100, 0, '< -90 dBFS']);
    expect(out.db).toEqual(['0 dBFS', '-9 dBFS', '-90 dBFS', '< -90 dBFS']);
    expect(out.rate).toEqual(['48,000 Hz', '44,100 Hz', '16,000 Hz', 'Not reported']);
    expect(out.ch).toEqual(['1 (mono)', '2 (stereo)', 'Not reported']);
    expect(out.ext).toEqual(['webm', 'm4a', 'ogg', 'webm']);
    expect(out.bt).toEqual([true, true, true, true, false, false, false]);
  });

  test('microphone starts: meter, dBFS text, sound badge, waveform and connection details update; stop resets', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#rec-toggle')).toBeDisabled();
    await expect(page.locator('#mic-sound')).toHaveText('Microphone off');
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-level')).toContainText('dBFS');
    // Sahte mikrofon periyodik bip üretir
    await expect.poll(async () => Number(await page.locator('#mic-canvas').getAttribute('data-max')), { timeout: 12_000 }).toBeGreaterThan(0);
    await expect.poll(() => page.locator('#mic-sound').textContent(), { timeout: 12_000 }).toBe('Sound detected');
    // data-db yoksa Number(null) = 0 olur ve eski "< 1" kontrolü her zaman geçerdi
    const dbAttr = await page.locator('#mic-level').getAttribute('data-db');
    expect(dbAttr).not.toBeNull();
    expect(Number(dbAttr)).toBeLessThanOrEqual(0);
    expect(Number(dbAttr)).toBeGreaterThanOrEqual(-100);
    // Bağlantı ayrıntıları: örnekleme hızı ABD biçiminde ve > 0
    expect(Number(await page.locator('#info-rate').getAttribute('data-rate'))).toBeGreaterThan(0);
    await expect(page.locator('#info-rate')).toHaveText(/^\d{1,3}(,\d{3})* Hz/);
    await expect(page.locator('#info-device')).not.toHaveText('–');
    await expect(page.locator('#info-processing')).toContainText('Echo cancellation');
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
    await expect(page.locator('#mic-level')).toContainText('Microphone off');
    await expect(page.locator('#mic-sound')).toHaveText('Microphone off');
    await expect(page.locator('#mic-hint')).toHaveAttribute('data-state', 'idle');
    await expect(page.locator('#info-rate')).toHaveText('–');
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#rec-toggle')).toBeDisabled();
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('device list fills; switching device or a processing option restarts without errors', async ({ page }) => {
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
    await expect(page.locator('#mic-level')).toContainText('dBFS');
    await expect(page.locator('#mic-error')).not.toHaveClass(/is-active/);
    for (const id of ['#opt-echo', '#opt-noise', '#opt-agc']) {
      await page.locator(id).uncheck();
      await expect(page.locator('#mic-stop')).toBeEnabled();
      await expect(page.locator('#mic-level')).toContainText('dBFS');
      await expect(page.locator('#mic-error')).not.toHaveClass(/is-active/);
    }
    // Chromium uygulanan işlemeyi getSettings ile bildirir: üçü de kapalı olmalı
    await expect(page.locator('#info-processing')).toHaveText('Echo cancellation off · noise suppression off · auto gain off');
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('record and play back: clip stays in memory, shows in a result box and downloads with an English file name', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#rec-toggle')).toBeEnabled();
    await expect(page.locator('#rec-result')).toBeHidden();
    await page.locator('#rec-toggle').click();
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'recording');
    await expect(page.locator('#rec-status')).toContainText(/Recording… \d+\.\d \/ 10 s/);
    // Canlı bölge her 100 ms süre okumasın: sayaç aria-hidden bir span içinde
    await expect(page.locator('#rec-status span[aria-hidden="true"]')).toHaveText(/^\d+\.\d \/ 10 s$/);
    await expect(page.locator('#rec-toggle')).toHaveText('Stop recording');
    await page.waitForTimeout(1600);
    await page.locator('#rec-toggle').click();
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'ready', { timeout: 8000 });
    await expect(page.locator('#rec-status')).toContainText(/^Recording ready · \d+\.\d s · \d+(\.\d+)? (B|KB|MB) · (webm|m4a|ogg)$/);
    await expect(page.locator('#rec-toggle')).toHaveText('Start recording');
    await expect(page.locator('#rec-result')).toBeVisible();
    await expect(page.locator('#rec-result')).toHaveClass(/is-active/);
    expect(await page.locator('#rec-audio').getAttribute('src')).toMatch(/^blob:/);
    const playing = await page.evaluate(async () => {
      const a = document.getElementById('rec-audio') as HTMLAudioElement;
      try { await a.play(); } catch (e) { return `error: ${e}`; }
      return a.paused ? 'paused' : 'playing';
    });
    expect(playing.startsWith('error')).toBe(false);

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#rec-download').click()]);
    expect(dl.suggestedFilename()).toMatch(/^mic-test-recording-\d{4}-\d{2}-\d{2}-\d{4}\.(webm|m4a|ogg)$/);
    const buf = readFileSync((await dl.path())!);
    expect(buf.length).toBeGreaterThan(200);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('recording stops by itself at 10 seconds', async ({ page }) => {
    test.setTimeout(45_000);
    const g = guard(page);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await page.locator('#rec-toggle').click();
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'recording');
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'ready', { timeout: 15_000 });
    await expect(page.locator('#rec-status')).toContainText(/ 10\.\d s /);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('switching tabs (page hidden) stops the microphone and shows a note', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-paused')).toBeHidden();
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#mic-paused')).toBeVisible();
    await expect(page.locator('#mic-sound')).toHaveText('Microphone off');
    expect(g.errors).toEqual([]);
  });

  test('360px: no horizontal overflow, controls fit, keyboard can start, record and stop', async ({ page }) => {
    const g = guard(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    for (const sel of ['#mic-device', '#opt-echo', '#opt-noise', '#opt-agc', '#mic-start', '#mic-stop', '#rec-toggle', '#mic-canvas', '#wave-canvas', '#info-processing']) {
      const box = await page.locator(sel).boundingBox();
      expect(box, sel).not.toBeNull();
      expect(box!.x + box!.width, sel).toBeLessThanOrEqual(360.5);
    }
    await page.locator('#mic-device').focus();
    for (const id of ['#opt-echo', '#opt-noise', '#opt-agc', '#mic-start']) {
      await page.keyboard.press('Tab');
      await expect(page.locator(id)).toBeFocused();
    }
    await page.keyboard.press('Enter');
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-level')).toContainText('dBFS');
    await page.locator('#rec-toggle').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'recording');
    await page.waitForTimeout(800);
    await page.keyboard.press('Enter');
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'ready', { timeout: 8000 });
    // Uzun bilgi satırları, sonuç kutusu ve bağlantı ayrıntıları dolu hâlde de taşma olmamalı
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    await page.locator('#mic-stop').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#mic-stop')).toBeDisabled();
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });
});

test.describe('known signals through the real audio pipeline', () => {
  test('0.5 amplitude sine reads about -9 dBFS level and -6 dBFS peak', async ({ page }) => {
    const g = guard(page);
    await mockSine(page, 0.5);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-sound')).toHaveText('Sound detected', { timeout: 10_000 });
    // İlk kareler akış başlarken sessiz (-100) olabilir; ölçüm oturunca -9,03 ± 1 dBFS olmalı
    await expect.poll(async () => Number(await page.locator('#mic-level').getAttribute('data-db')), { timeout: 10_000 }).toBeGreaterThan(-10);
    for (let i = 0; i < 5; i++) {
      const db = Number(await page.locator('#mic-level').getAttribute('data-db'));
      expect(db).toBeGreaterThan(-10);
      expect(db).toBeLessThan(-8);
      await page.waitForTimeout(120);
    }
    await expect(page.locator('#mic-level')).toContainText('peak: -6 dBFS');
    await expect(page.locator('#mic-hint')).toHaveAttribute('data-state', 'ok');
    expect(g.errors).toEqual([]);
  });

  test('full-scale sine triggers the clipping warning', async ({ page }) => {
    const g = guard(page);
    await mockSine(page, 1);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-hint')).toHaveAttribute('data-state', 'clipping', { timeout: 10_000 });
    await expect(page.locator('#mic-hint')).toContainText('clipping');
    const db = Number(await page.locator('#mic-level').getAttribute('data-db'));
    expect(db).toBeCloseTo(-3, 0); // tam ölçekli sinüs RMS = 1/√2 → -3,01 dBFS
    expect(g.errors).toEqual([]);
  });

  test('peak marker follows the theme colour (visible in dark mode, brand colour in light mode)', async ({ page }) => {
    const g = guard(page);
    await mockSine(page, 0.5);
    /** Seviye çubuğunda verilen renge (±8) yakın piksel var mı? */
    const hasColor = (rgb: number[]) => page.evaluate((c) => new Promise<boolean>((resolve) => {
      const cv = document.getElementById('mic-canvas') as HTMLCanvasElement;
      const ctx = cv.getContext('2d')!;
      const t0 = performance.now();
      const look = () => {
        const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] > 240 && Math.abs(d[i] - c[0]) <= 8 && Math.abs(d[i + 1] - c[1]) <= 8 && Math.abs(d[i + 2] - c[2]) <= 8) return resolve(true);
        }
        if (performance.now() - t0 > 5000) return resolve(false);
        requestAnimationFrame(look);
      };
      look();
    }), rgb);
    for (const [scheme, want, not] of [['dark', [0xe0, 0x7a, 0x93], [0x7b, 0x23, 0x31]], ['light', [0x7b, 0x23, 0x31], [0xe0, 0x7a, 0x93]]] as const) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(URL);
      await page.locator('#mic-start').click();
      await expect(page.locator('#mic-sound')).toHaveText('Sound detected', { timeout: 10_000 });
      expect(await hasColor([...want]), `${scheme}: tema rengi`).toBe(true);
      expect(await hasColor([...not]), `${scheme}: diğer temanın rengi`).toBe(false);
      await page.locator('#mic-stop').click();
    }
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('digital silence: "No sound" badge and silence warning after 3 seconds', async ({ page }) => {
    const g = guard(page);
    await mockSine(page, 0);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-sound')).toHaveText('No sound');
    await expect(page.locator('#mic-hint')).toHaveAttribute('data-state', 'silent', { timeout: 8000 });
    await expect(page.locator('#mic-level')).toContainText('Level: < -90 dBFS');
    expect(g.errors).toEqual([]);
  });

  test('Bluetooth-like device name or 16 kHz rate shows the hands-free warning', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      const real = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = async (c) => {
        const s = await real(c);
        const t = s.getAudioTracks()[0];
        const settings = t.getSettings();
        Object.defineProperty(t, 'label', { value: 'Headset (WH-1000XM4 Hands-Free AG Audio)', configurable: true });
        t.getSettings = () => ({ ...settings, sampleRate: 16000, channelCount: 1 });
        return s;
      };
    });
    await page.goto(URL);
    await expect(page.locator('#bt-warn')).toBeHidden();
    await page.locator('#mic-start').click();
    await expect(page.locator('#bt-warn')).toBeVisible();
    await expect(page.locator('#bt-warn')).toContainText('hands-free');
    await expect(page.locator('#info-rate')).toHaveText('16,000 Hz');
    await expect(page.locator('#info-channels')).toHaveText('1 (mono)');
    await expect(page.locator('#info-device')).toHaveText('Headset (WH-1000XM4 Hands-Free AG Audio)');
    await page.locator('#mic-stop').click();
    await expect(page.locator('#bt-warn')).toBeHidden();
    expect(g.errors).toEqual([]);
  });

  test('fake built-in device does not show the Bluetooth warning', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#info-rate')).not.toHaveText('–');
    await expect(page.locator('#bt-warn')).toBeHidden();
  });
});

test.describe('unsupported and insecure contexts', () => {
  test('no mediaDevices: support message and disabled start button', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'mediaDevices', { value: undefined, configurable: true });
    });
    await page.goto(URL);
    await expect(page.locator('#support')).toBeVisible();
    await expect(page.locator('#support')).toContainText('does not support microphone access');
    await expect(page.locator('#mic-start')).toBeDisabled();
    expect(g.errors).toEqual([]);
    expect(g.external).toEqual([]);
  });

  test('insecure (http) context: https notice', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'mediaDevices', { value: undefined, configurable: true });
      Object.defineProperty(window, 'isSecureContext', { value: false, configurable: true });
    });
    await page.goto(URL);
    await expect(page.locator('#support')).toBeVisible();
    await expect(page.locator('#support')).toContainText('secure (https) connection');
    await expect(page.locator('#support')).toContainText('https://araclar.bilisimajans.com/en/mic-test/');
    await expect(page.locator('#mic-start')).toBeDisabled();
    await page.setViewportSize({ width: 360, height: 740 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    expect(g.errors).toEqual([]);
  });
});

test.describe('permission and device errors', () => {
  test.use({ permissions: [] });

  test('permission denied: English error and Chrome/Edge/Firefox/Safari/Windows/macOS steps', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto(URL);
    await expect(page.locator('#perm-help')).toBeHidden();
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-error')).toContainText('Microphone permission was not granted');
    await expect(page.locator('#mic-error')).toContainText('lock');
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

  test('no device / in use / device gone / other: each gives an English message with a fix', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      (window as any).__gumError = 'NotFoundError';
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('x', (window as any).__gumError); };
    });
    await page.goto(URL);
    // İzin hatasından sonra gelen cihaz hatasında izin yardımı kutusu yeniden gizlenmeli
    const cases: Array<[string, string, boolean]> = [
      ['SecurityError', 'permission was not granted', true],
      ['NotFoundError', 'No microphone was found', false],
      ['NotReadableError', 'being used by another app', false],
      ['OverconstrainedError', 'no longer available', false],
      ['SomethingElse', 'could not be started', false],
    ];
    for (const [name, text, permHelp] of cases) {
      await page.evaluate((n) => { (window as any).__gumError = n; }, name);
      await page.locator('#mic-start').click();
      await expect(page.locator('#mic-error')).toContainText(text);
      await expect(page.locator('#mic-error')).toHaveClass(/is-active/);
      if (permHelp) await expect(page.locator('#perm-help')).toBeVisible();
      else await expect(page.locator('#perm-help')).toBeHidden();
      await expect(page.locator('#mic-start')).toBeEnabled();
    }
    expect(g.errors).toEqual([]);
    expect(g.external).toEqual([]);
  });
});

test.describe('state transitions and races', () => {
  /** getUserMedia'yı geciktirir (gerçek cihazda izin/açılış yüzlerce ms sürer); çağrıları ve akışları kaydeder. */
  async function slowGum(page: Page, ms: number) {
    await page.addInitScript((delay) => {
      const real = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      (window as any).__gum = [];
      (window as any).__streams = [];
      navigator.mediaDevices.getUserMedia = async (c) => {
        (window as any).__gum.push(c);
        await new Promise((r) => setTimeout(r, delay));
        const s = await real(c);
        (window as any).__streams.push(s);
        return s;
      };
    }, ms);
  }

  test('sound then silence: badge drops to "No sound" after the ~1.2 s hold, then the silence warning appears', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.value = 0.5;
        (window as any).__gain = gain;
        const dest = ctx.createMediaStreamDestination();
        osc.connect(gain).connect(dest);
        osc.start();
        if (ctx.state === 'suspended') await ctx.resume();
        return dest.stream;
      };
    });
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-sound')).toHaveText('Sound detected', { timeout: 10_000 });
    await expect(page.locator('#mic-hint')).toHaveAttribute('data-state', 'ok');
    // Sesi kes; rozetin "No sound"a dönmesine kadar geçen süreyi sayfada ölç
    const ms = await page.evaluate(() => new Promise<number>((resolve) => {
      const el = document.getElementById('mic-sound')!;
      const t0 = performance.now();
      (window as any).__gain.gain.value = 0;
      const mo = new MutationObserver(() => { if (el.dataset.state === 'silence') { mo.disconnect(); resolve(performance.now() - t0); } });
      mo.observe(el, { attributes: true, childList: true, characterData: true, subtree: true });
    }));
    expect(ms).toBeGreaterThan(900);
    expect(ms).toBeLessThan(3000);
    await expect(page.locator('#mic-sound')).toHaveText('No sound');
    await expect(page.locator('#mic-hint')).toHaveAttribute('data-state', 'silent', { timeout: 5000 });
    // "highest" sesli dönemdeki -9 dBFS'yi korur
    expect(Number(await page.locator('#mic-level').getAttribute('data-maxdb'))).toBeGreaterThan(-10);
    expect(g.errors).toEqual([]);
  });

  test('a processing switch changed while a restart is still opening the mic is not lost', async ({ page }) => {
    const g = guard(page);
    await slowGum(page, 400);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled({ timeout: 5000 });
    await page.locator('#opt-echo').uncheck();   // yeniden başlatma başlar
    await page.locator('#opt-noise').uncheck();  // o sürerken ikinci değişiklik
    await expect(page.locator('#info-processing')).toHaveText('Echo cancellation off · noise suppression off · auto gain on', { timeout: 5000 });
    const last = await page.evaluate(() => (window as any).__gum.at(-1).audio);
    expect([last.echoCancellation, last.noiseSuppression, last.autoGainControl]).toEqual([false, false, true]);
    // Önceki akışlar serbest bırakılmış olmalı: yalnızca sonuncusu canlı
    const live = await page.evaluate(() => (window as any).__streams.map((s: MediaStream) => s.getTracks().some((t) => t.readyState === 'live')));
    expect(live.filter(Boolean).length).toBe(1);
    expect(live.at(-1)).toBe(true);
    await expect(page.locator('#mic-error')).not.toHaveClass(/is-active/);
    expect(g.errors).toEqual([]);
  });

  test('tab hidden while the mic is still opening: it is not left running in the background', async ({ page }) => {
    const g = guard(page);
    await slowGum(page, 500);
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await expect.poll(() => page.evaluate(() => (window as any).__streams.length), { timeout: 5000 }).toBe(1);
    await expect.poll(() => page.evaluate(() => (window as any).__streams[0].getTracks().every((t: MediaStreamTrack) => t.readyState === 'ended'))).toBe(true);
    await expect(page.locator('#mic-paused')).toBeVisible();
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#mic-start')).toBeEnabled();
    await expect(page.locator('#mic-sound')).toHaveText('Microphone off');
    await expect(page.locator('#mic-error')).not.toHaveClass(/is-active/);
    expect(g.errors).toEqual([]);
  });

  test('double-clicking the record button never leaves a second recorder running', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      (window as any).__recs = [];
      const R = window.MediaRecorder;
      (window as any).MediaRecorder = class extends R {
        constructor(s: MediaStream, o?: MediaRecorderOptions) { super(s, o); (window as any).__recs.push(this); }
      };
    });
    const state = () => page.evaluate(() => ({
      recording: (window as any).__recs.filter((r: MediaRecorder) => r.state === 'recording').length,
      btn: document.getElementById('rec-toggle')!.textContent,
      status: document.getElementById('rec-status')!.dataset.state,
    }));
    await page.goto(URL);
    await page.locator('#mic-start').click();
    await expect(page.locator('#rec-toggle')).toBeEnabled();
    await page.locator('#rec-toggle').click();
    await page.waitForTimeout(1200);
    await page.locator('#rec-toggle').dblclick(); // 1. tık durdurur, 2. tık stop olayı gelmeden düşer
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'ready', { timeout: 8000 });
    await page.waitForTimeout(600);
    expect(await state()).toEqual({ recording: 0, btn: 'Start recording', status: 'ready' });
    await expect(page.locator('#rec-status')).toContainText(/^Recording ready · 1\.\d s /);
    // Aynı görev içinde iki tık: kaydedici sayısı ile düğme metni her an tutarlı
    await page.locator('#rec-toggle').click();
    await page.waitForTimeout(800);
    await page.evaluate(() => { const b = document.getElementById('rec-toggle')!; b.click(); b.click(); });
    await page.waitForTimeout(800);
    let s = await state();
    expect(s.recording).toBe(s.btn === 'Stop recording' ? 1 : 0);
    if (s.recording) await page.locator('#rec-toggle').click();
    await expect(page.locator('#rec-status')).toHaveAttribute('data-state', 'ready', { timeout: 8000 });
    s = await state();
    expect(s.recording).toBe(0);
    expect(g.errors).toEqual([]);
  });
});
