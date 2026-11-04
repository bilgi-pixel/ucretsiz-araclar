import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

const URL_ = '/en/webcam-test/';

/** getUserMedia'nın verdiği akışları window.__streams'e kaydeder; gecikme, açık izin penceresini taklit eder. */
function recordStreams(page: Page, delayMs = 0) {
  return page.addInitScript((delay) => {
    const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    (window as any).__streams = [];
    navigator.mediaDevices.getUserMedia = async (c: any) => {
      if (delay) await new Promise((r) => setTimeout(r, delay));
      const s = await orig(c);
      (window as any).__streams.push(s);
      return s;
    };
  }, delayMs);
}
/** Kaydedilen tüm izlerin durumu: kamera/mikrofon gerçekten bırakıldıysa hepsi 'ended'. */
const trackStates = (page: Page) => page.evaluate(() => (window as any).__streams.flatMap((s: MediaStream) => s.getTracks().map((t) => t.readyState)));
/** Sekmeyi gizlenmiş gibi gösterir. */
const hideTab = (page: Page) => page.evaluate(() => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
  document.dispatchEvent(new Event('visibilitychange'));
});

// Sahte kamera/mikrofon: Chromium'un yerleşik test cihazları
test.use({
  launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] },
  permissions: ['camera', 'microphone'],
});

test.describe('Webcam Test (EN)', () => {
  test('saf yardımcılar bilinen değerleri verir (oran, sınıf, MP, kısıtlar, basamak, dBFS)', async ({ page }) => {
    await page.goto(URL_);
    const r = await page.evaluate(async () => {
      const m: any = await import('/en/webcam-test/tool.js');
      const sine = Array.from({ length: 1024 }, (_, i) => 0.5 * Math.sin((2 * Math.PI * i) / 64));
      return {
        a: [m.aspectRatio(640, 480), m.aspectRatio(1280, 720), m.aspectRatio(1920, 1080), m.aspectRatio(1366, 768), m.aspectRatio(1920, 1200), m.aspectRatio(720, 1280), m.aspectRatio(2560, 1080), m.aspectRatio(352, 288), m.aspectRatio(0, 480)],
        c: [m.resolutionClass(640, 480), m.resolutionClass(1280, 720), m.resolutionClass(1920, 1080), m.resolutionClass(3840, 2160), m.resolutionClass(720, 1280), m.resolutionClass(320, 240)],
        mp: [m.megapixels(640, 480), m.megapixels(1920, 1080), m.megapixels(3840, 2160)],
        next: [m.nextPreset('2160'), m.nextPreset('1080'), m.nextPreset('720'), m.nextPreset('480'), m.nextPreset('auto')],
        k720: m.buildVideoConstraints('720', { deviceId: 'cam1' }),
        kAuto: m.buildVideoConstraints('auto'),
        kFacing: m.buildVideoConstraints('480', { facing: 'environment' }),
        fps: [m.fmtFps(29.97), m.fmtFps(0)],
        note: [m.deliveredNote('1080', 1280, 720), m.deliveredNote('720', 1280, 720), m.deliveredNote('auto', 640, 480)],
        light: [m.lightLabel(0.03), m.lightLabel(0.2), m.lightLabel(0.5), m.lightLabel(0.9)],
        mic: [m.micLevel(sine), m.micLevel(new Array(512).fill(0.1)), m.micLevel(new Array(512).fill(0))],
      };
    });
    expect(r.a).toEqual(['4:3', '16:9', '16:9', '≈16:9', '16:10', '9:16', '≈21:9', '11:9', '–']);
    expect(r.c).toEqual(['480p (SD)', '720p (HD)', '1080p (Full HD)', '2160p (4K UHD)', '720p (HD)', '240p (low resolution)']);
    expect(r.mp).toEqual(['0.31 MP', '2.07 MP', '8.29 MP']);
    expect(r.next).toEqual(['1080', '720', '480', 'auto', null]);
    expect(r.k720).toEqual({ width: { ideal: 1280 }, height: { ideal: 720 }, deviceId: { exact: 'cam1' } });
    expect(r.kAuto).toBe(true);
    expect(r.kFacing).toEqual({ width: { ideal: 640 }, height: { ideal: 480 }, facingMode: { ideal: 'environment' } });
    expect(r.fps).toEqual(['30.0 fps', '–']);
    expect(r.note[0]).toContain('1280×720');
    expect(r.note[1]).toBe('');
    expect(r.note[2]).toBe('');
    expect(r.light).toEqual(['3% (almost black)', '20% (dim)', '50% (good)', '90% (very bright)']);
    // 0,5 genlikli sinüs: RMS 0,3536 → -9,03 dBFS → seviye 0,8495; sabit 0,1 → -20 dBFS → 0,6667
    expect(r.mic[0].db).toBeCloseTo(-9.031, 2);
    expect(r.mic[0].level).toBeCloseTo(0.8495, 3);
    expect(r.mic[1].db).toBeCloseTo(-20, 5);
    expect(r.mic[1].level).toBeCloseTo(2 / 3, 5);
    expect(r.mic[2].level).toBe(0);
  });

  test('mutlu yol: 480p → 640×480, 4:3, FPS ölçülür, ayna/ızgara, PNG anlık görüntü, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await recordStreams(page);
    await page.goto(URL_);
    await expect(page.locator('h1')).toContainText('Webcam Test');
    await expect(page.locator('#flip')).toBeHidden(); // masaüstü: ön/arka düğmesi yok
    await page.locator('#res').selectOption('480');
    await page.locator('#start').click();
    await expect(page.locator('#stage')).toBeVisible();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-res')).toHaveText('640×480', { timeout: 10_000 });
    await expect(page.locator('#r-aspect')).toHaveText('4:3');
    await expect(page.locator('#r-class')).toHaveText('480p (SD)');
    await expect(page.locator('#r-mp')).toHaveText('0.31 MP');
    await expect(page.locator('#r-req')).toContainText('480p');
    await expect.poll(async () => Number(await page.locator('#r-fps').getAttribute('data-fps')), { timeout: 10_000 }).toBeGreaterThan(0);
    await expect.poll(async () => Number(await page.locator('#r-light').getAttribute('data-luma')), { timeout: 10_000 }).toBeGreaterThan(0);
    await expect(page.locator('#note')).toBeHidden(); // istenen boyut geldi: uyarı yok
    expect(await page.locator('#device option').count()).toBeGreaterThan(1);

    // Ayna varsayılan açık; kapatınca sınıf kalkar
    await expect(page.locator('#mirror')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#video')).toHaveClass(/is-mirror/);
    await page.locator('#mirror').click();
    await expect(page.locator('#mirror')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#video')).not.toHaveClass(/is-mirror/);
    // Izgara
    await expect(page.locator('#grid-overlay')).toBeHidden();
    await page.locator('#grid').click();
    await expect(page.locator('#grid')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#grid-overlay')).toBeVisible();

    await page.locator('#snap').click();
    await expect(page.locator('#shot-box')).toBeVisible();
    await expect(page.locator('#shot-info')).toContainText('640×480 PNG');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#shot-download').click()]);
    expect(dl.suggestedFilename()).toMatch(/^webcam-test-\d{4}-\d{2}-\d{2}-\d{4}\.png$/);
    const buf = readFileSync((await dl.path())!);
    expect(buf.subarray(1, 4).toString()).toBe('PNG');
    expect(buf.readUInt32BE(16)).toBe(640); // IHDR genişlik
    expect(buf.readUInt32BE(20)).toBe(480); // IHDR yükseklik

    // 720p'ye geçince kamera yeniden başlar
    await page.locator('#res').selectOption('720');
    await expect(page.locator('#r-res')).toHaveText('1280×720', { timeout: 10_000 });
    await expect(page.locator('#r-aspect')).toHaveText('16:9');

    await page.locator('#stop').click();
    await expect(page.locator('#stage')).toBeHidden();
    await expect(page.locator('#snap')).toBeDisabled();
    // 480p ve 720p akışlarının ikisi de bırakıldı (kamera ışığı söner)
    expect(await trackStates(page)).toEqual(['ended', 'ended']);
    expect(await page.evaluate(() => (document.getElementById('video') as HTMLVideoElement).srcObject)).toBeNull();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('mikrofon kısa kontrolü: seviye çubuğu dolar, durdurunca kapanır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await recordStreams(page);
    await page.goto(URL_);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    await expect(page.locator('#mic-level')).toContainText('dBFS');
    await expect.poll(async () => Number(await page.locator('#mic-bar').getAttribute('data-max')), { timeout: 10_000 }).toBeGreaterThan(0);
    await page.locator('#mic-stop').click();
    await expect(page.locator('#mic-level')).toContainText('Microphone off');
    expect(await trackStates(page)).toEqual(['ended']);
    expect(errors).toEqual([]);
  });

  test('OverconstrainedError: 1080p reddedilince 720p\'ye iner ve not gösterir', async ({ page }) => {
    await page.addInitScript(() => {
      const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      (window as any).__gum = [];
      navigator.mediaDevices.getUserMedia = async (c: any) => {
        (window as any).__gum.push(JSON.stringify(c));
        const w = c && c.video && c.video.width && c.video.width.ideal;
        if (w >= 1920) {
          const E: any = (window as any).OverconstrainedError;
          throw typeof E === 'function' ? new E('width', 'Too big') : Object.assign(new Error('Too big'), { name: 'OverconstrainedError', constraint: 'width' });
        }
        return orig(c);
      };
    });
    await page.goto(URL_);
    await page.locator('#res').selectOption('1080');
    await page.locator('#start').click();
    await expect(page.locator('#r-res')).toHaveText('1280×720', { timeout: 10_000 });
    await expect(page.locator('#note')).toBeVisible();
    await expect(page.locator('#note')).toContainText('could not deliver 1080p');
    await expect(page.locator('#note')).toContainText('fell back to 720p');
    await expect(page.locator('#r-req')).toContainText('720p');
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    const calls: string[] = await page.evaluate(() => (window as any).__gum);
    expect(calls.length).toBe(2);
  });

  test('istenenden düşük çözünürlük gelirse açıklama gösterilir', async ({ page }) => {
    await page.addInitScript(() => {
      const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      // Kamera en fazla 720p veriyormuş gibi: isteği 1280×720'ye indir
      navigator.mediaDevices.getUserMedia = async (c: any) => orig({ ...c, video: { width: { exact: 1280 }, height: { exact: 720 } } });
    });
    await page.goto(URL_);
    await page.locator('#res').selectOption('2160');
    await page.locator('#start').click();
    await expect(page.locator('#r-res')).toHaveText('1280×720', { timeout: 10_000 });
    await expect(page.locator('#note')).toContainText('You asked for 4K');
    await expect(page.locator('#note')).toContainText('1280×720');
  });

  // Bilinen görüntü: düz renkli kanvas akışı. Gri #808080 → 128/255 = 0,502; siyah → 0.
  for (const [name, color, luma, label] of [['gri', '#808080', 0.502, '50% (good)'], ['siyah', '#000000', 0, '0% (almost black)']] as const) {
    test(`bilinen görüntü (${name} kanvas, 25 kare/sn): parlaklık ${label}, ölçülen FPS makul`, async ({ page }) => {
      await page.addInitScript((col) => {
        navigator.mediaDevices.getUserMedia = async () => {
          const c = document.createElement('canvas'); c.width = 640; c.height = 480;
          const ctx = c.getContext('2d')!;
          const draw = () => { ctx.fillStyle = col; ctx.fillRect(0, 0, c.width, c.height); };
          draw(); setInterval(draw, 40); // her çizim yeni kare üretir
          return c.captureStream(25);
        };
      }, color);
      await page.goto(URL_);
      await page.locator('#start').click();
      await expect(page.locator('#r-res')).toHaveText('640×480', { timeout: 10_000 });
      await expect(page.locator('#r-light')).toHaveText(label, { timeout: 10_000 });
      expect(Number(await page.locator('#r-light').getAttribute('data-luma'))).toBeCloseTo(luma, 2);
      // Kaynak 25 kare/sn: ölçüm birim hatası (ör. ×10) yakalanır; yavaş makinede pay bırakılır
      await expect.poll(async () => Number(await page.locator('#r-fps').getAttribute('data-fps')), { timeout: 10_000 }).toBeGreaterThan(10);
      expect(Number(await page.locator('#r-fps').getAttribute('data-fps'))).toBeLessThan(40);
    });
  }

  test('sekme gizlenince kamera ve mikrofon durur (izler biter) ve not "tab" der', async ({ page }) => {
    await recordStreams(page);
    await page.goto(URL_);
    await page.locator('#start').click();
    await expect(page.locator('#stage')).toBeVisible();
    await expect.poll(() => page.locator('#video').evaluate((v: HTMLVideoElement) => v.videoWidth), { timeout: 10_000 }).toBeGreaterThan(0);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-stop')).toBeEnabled();
    expect(await trackStates(page)).toEqual(['live', 'live']);
    await hideTab(page);
    await expect(page.locator('#stage')).toBeHidden();
    await expect(page.locator('#note')).toContainText('tab was hidden');
    expect(await page.evaluate(() => (document.getElementById('video') as HTMLVideoElement).srcObject)).toBeNull();
    expect(await trackStates(page)).toEqual(['ended', 'ended']);
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#mic-level')).toContainText('Microphone off');
  });

  test('kamera çıkarılırsa (iz "ended") önizleme kapanır ve not gösterilir', async ({ page }) => {
    await recordStreams(page);
    await page.goto(URL_);
    await page.locator('#start').click();
    await expect(page.locator('#r-res')).toContainText('×', { timeout: 10_000 });
    await page.evaluate(() => (window as any).__streams[0].getVideoTracks()[0].dispatchEvent(new Event('ended')));
    await expect(page.locator('#stage')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#note')).toContainText('disconnected');
    await expect(page.locator('#start')).toBeEnabled();
    expect(await trackStates(page)).toEqual(['ended']);
  });

  test('seçilen kamera artık yoksa (deviceId OverconstrainedError) varsayılan kamerayla açılır', async ({ page }) => {
    await page.addInitScript(() => {
      const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      (window as any).__gum = [];
      navigator.mediaDevices.getUserMedia = async (c: any) => {
        (window as any).__gum.push(c && c.video && c.video.deviceId ? 'device' : 'default');
        if (c && c.video && c.video.deviceId) {
          const E: any = (window as any).OverconstrainedError;
          throw typeof E === 'function' ? new E('deviceId', 'Gone') : Object.assign(new Error('Gone'), { name: 'OverconstrainedError', constraint: 'deviceId' });
        }
        return orig(c);
      };
    });
    await page.goto(URL_);
    await page.locator('#start').click();
    await expect(page.locator('#r-res')).toContainText('×', { timeout: 10_000 });
    const id = await page.locator('#device option').nth(1).getAttribute('value');
    await page.locator('#device').selectOption(id!); // çalışırken değişince yeniden başlar
    await expect(page.locator('#note')).toContainText('no longer available', { timeout: 10_000 });
    await expect(page.locator('#stage')).toBeVisible();
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    expect(await page.evaluate(() => (window as any).__gum)).toEqual(['default', 'device', 'default']);
  });

  test('izin beklenirken sekme gizlenirse kamera ve mikrofon arka planda açılmaz', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await recordStreams(page, 600); // izin penceresi açıkmış gibi
    await page.goto(URL_);
    await page.locator('#start').click();
    await page.locator('#mic-start').click();
    await hideTab(page);
    await expect.poll(() => page.evaluate(() => (window as any).__streams.length), { timeout: 10_000 }).toBe(2);
    await expect.poll(() => trackStates(page)).toEqual(['ended', 'ended']);
    await expect(page.locator('#stage')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#snap')).toBeDisabled();
    await expect(page.locator('#start')).toBeEnabled();
    await expect(page.locator('#mic-stop')).toBeDisabled();
    await expect(page.locator('#mic-error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#note')).toContainText('tab was hidden');
    expect(errors).toEqual([]);
  });

  test('içerik ve kurallar: ≥900 kelime, SSS ≥7 ve JSON-LD eşleşir, 3 reklam (a/b/c) araç dışında, hreflang', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL_);
    await expect(page).toHaveTitle('Webcam Test – Check Your Camera Online (Resolution, FPS, Mic)');
    await expect(page.locator('.ba-badges')).toContainText('Video never leaves your device');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    await expect(page.locator('.ba-footer-line')).toContainText('100% free');
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const faq = page.locator('.ba-faq details');
    expect(await faq.count()).toBeGreaterThanOrEqual(7);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['en-webcam-test-a', 'en-webcam-test-b', 'en-webcam-test-c']);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-tool + .ba-ad')).toHaveAttribute('data-slot', 'en-webcam-test-a');
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent!)));
    const app = ld.find((x: any) => x['@type'] === 'SoftwareApplication');
    expect(app.inLanguage).toBe('en');
    expect(app.offers.price).toBe('0');
    const faqLd = ld.find((x: any) => x['@type'] === 'FAQPage');
    const summaries = await faq.locator('summary').allTextContents();
    const answers = await faq.locator('p').allTextContents();
    expect(faqLd.mainEntity.map((q: any) => q.name)).toEqual(summaries);
    expect(faqLd.mainEntity.map((q: any) => q.acceptedAnswer.text)).toEqual(answers);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/webcam-test/');
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/kamera-test/');
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/kamera-test/');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/en/webcam-test/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    expect(app.url).toBe('https://araclar.bilisimajans.com/en/webcam-test/');
    // Türkçe kalıntı yok: araç arayüzü ve içerikte yalnızca marka adı ile TR sürüm bağlantısı Türkçe olabilir
    const turkish = /[ğĞşŞıİçÇöÖüÜ]/;
    expect(await page.locator('.ba-tool').evaluate((el) => el.textContent)).not.toMatch(turkish);
    // Reklam yer tutucusunun etiketi ortak ads.js'ten gelir; bu sayfanın metni değildir
    const content = await page.locator('.ba-content').evaluate((el) => {
      const c = el.cloneNode(true) as HTMLElement;
      c.querySelectorAll('.ba-ad').forEach((a) => a.remove());
      return c.textContent!.replace(/Bilişim Ajans|Kamera ve Mikrofon Testi/g, '');
    });
    expect(content).not.toMatch(turkish);
    // Gizlilik metni sitedeki reklam betiğini yok saymaz; araç kendi adına çerez koymaz
    await expect(page.locator('.ba-content')).toContainText('the tool itself sets no cookies');
    // İç bağlantılar çalışır
    for (const href of ['../mic-test/', '../aspect-ratio-calculator/', '../../kamera-test/']) {
      const res = await page.request.get(new URL(href, page.url()).toString());
      expect(res.status(), href).toBe(200);
    }
    expect(external).toEqual([]);
  });

  test('360px: yatay taşma yok (başlatmadan önce ve sonra); klavye sırası', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#start').click();
    await expect(page.locator('#r-res')).toContainText('×', { timeout: 10_000 });
    await page.locator('#snap').click();
    await expect(page.locator('#shot-box')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#device').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#res')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#start')).toBeFocused();
    // Ayna ve ızgara klavyeyle (Space/Enter) değiştirilebilir
    await page.locator('#mirror').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#mirror')).toHaveAttribute('aria-pressed', 'false');
    await page.locator('#grid').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#grid')).toHaveAttribute('aria-pressed', 'true');
  });
});

test.describe('hatalar', () => {
  test.use({ permissions: [] });
  test('izin reddi: çözüm kutusu Windows ve macOS adımlarını gösterir, Start yeniden etkin', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto(URL_);
    await expect(page.locator('#help')).toBeHidden();
    await page.locator('#start').click();
    await expect(page.locator('#error')).toContainText('Camera access was blocked');
    await expect(page.locator('#help')).toBeVisible();
    await expect(page.locator('#help')).toContainText('Windows');
    await expect(page.locator('#help')).toContainText('macOS');
    await expect(page.locator('#start')).toBeEnabled();
    await expect(page.locator('#stage')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
    // 360px: hata ve izin yardım kutusu açıkken yatay taşma yok
    await page.setViewportSize({ width: 360, height: 740 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
  });

  test('NotReadableError: başka uygulama kullanıyor mesajı', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Could not start video source', 'NotReadableError'); };
    });
    await page.goto(URL_);
    await page.locator('#start').click();
    await expect(page.locator('#error')).toContainText('another app');
    await expect(page.locator('#help')).toBeHidden();
  });

  for (const secure of [false, true]) {
    test(`mediaDevices yok (${secure ? 'eski tarayıcı' : 'güvensiz http'}): uyarı gösterilir, düğmeler kapalı, sayfa hatası yok`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript((s) => {
        Object.defineProperty(Navigator.prototype, 'mediaDevices', { configurable: true, get: () => undefined });
        Object.defineProperty(window, 'isSecureContext', { configurable: true, get: () => s });
      }, secure);
      await page.goto(URL_);
      await expect(page.locator('#support')).toBeVisible();
      await expect(page.locator('#support')).toContainText(secure ? 'does not support camera access' : 'secure (https) connection');
      await expect(page.locator('#start')).toBeDisabled();
      await expect(page.locator('#mic-start')).toBeDisabled();
      await expect(page.locator('#stage')).toBeHidden();
      expect(errors).toEqual([]);
    });
  }

  test('mikrofon izni reddi: mesaj mikrofonun sistem ayarını söyler, kamera yardım kutusu açılmaz', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto(URL_);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-error')).toContainText('Microphone access was blocked');
    await expect(page.locator('#mic-error')).toContainText('Privacy & security → Microphone');
    await expect(page.locator('#mic-error')).not.toContainText('below');
    await expect(page.locator('#help')).toBeHidden();
    await expect(page.locator('#mic-start')).toBeEnabled();
    await expect(page.locator('#mic-stop')).toBeDisabled();
  });

  test('mikrofon yok: listeden seçin denmez (sayfada mikrofon listesi yok)', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Requested device not found', 'NotFoundError'); };
    });
    await page.goto(URL_);
    await page.locator('#mic-start').click();
    await expect(page.locator('#mic-error')).toContainText('No microphone was found');
    await expect(page.locator('#mic-error')).not.toContainText('from the list');
  });

  test('NotFoundError: kamera bulunamadı mesajı', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Requested device not found', 'NotFoundError'); };
    });
    await page.goto(URL_);
    await page.locator('#start').click();
    await expect(page.locator('#error')).toContainText('No camera was found');
  });
});
