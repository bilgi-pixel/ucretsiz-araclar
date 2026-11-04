import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Sahte mikrofon: Chromium'un yerleşik test cihazı. Autoplay bayrağı, page.evaluate ile
// (kullanıcı hareketi olmadan) tetiklenen test kancasında ses motorunun askıda kalmaması için.
test.use({
  launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', '--autoplay-policy=no-user-gesture-required'] },
  permissions: ['microphone'],
});

function watch(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

const display = (page: Page) => page.locator('#ak-display');
const attr = (page: Page, name: string) => display(page).getAttribute(name);

/**
 * Sentetik sinyali besler; ekranın verilen nota adına VE frekansa (±%0,1) oturmasını bekler.
 * (Ses kaynağı değişirken tamponda eski + yeni ses karışır; birkaç karelik geçiş okuması normaldir.)
 */
async function feed(page: Page, freq: number, noteTr: string) {
  await page.evaluate((f) => (window as any).__akortTest(f), freq);
  await expect.poll(() => attr(page, 'data-note'), { timeout: 8000 }).toBe(noteTr);
  await expect.poll(async () => Math.abs(Number(await attr(page, 'data-freq')) - freq) / freq, { timeout: 8000 }).toBeLessThan(0.001);
}
const centsOf = async (page: Page) => Number(await attr(page, 'data-cents'));

test.describe('Akort Aleti', () => {
  test('sayfa yapısı: rozet, 3 reklam (araç kutusunda yok), SSS ≥ 7, ≥ 900 kelime, JSON-LD, dış istek yok', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.goto('/akort-aleti/');
    await expect(page.locator('h1')).toContainText('Akort Aleti');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('main')).toContainText('Ses cihazınızdan çıkmaz');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="akort-aleti-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent() as string);
    expect(ld['@type']).toBe('SoftwareApplication');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/akort-aleti/');
    // Varsayılan: gitar, 6 tel + Otomatik
    await expect(page.locator('#ak-strings .ak-str')).toHaveCount(7);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/akort-aleti/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('sahte mikrofon: izin alınır, analiz döngüsü çalışır, durdurunca iz kapanır', async ({ page }) => {
    const { external, errors } = watch(page);
    // getUserMedia çağrısını ve akışları kaydet
    await page.addInitScript(() => {
      const w = window as any;
      w.__streams = []; w.__constraints = [];
      const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = async (c?: MediaStreamConstraints) => {
        w.__constraints.push(c);
        const s = await orig(c);
        w.__streams.push(s);
        return s;
      };
    });
    await page.goto('/akort-aleti/');
    await expect(display(page)).toHaveAttribute('data-state', 'idle');
    await page.locator('#ak-start').click();
    await expect(page.locator('#ak-start')).toHaveText('Mikrofonu durdur');
    await expect(page.locator('#ak-error')).not.toHaveClass(/is-active/);
    // Çözümleme karesi sayacı artıyor mu
    await expect.poll(async () => Number(await attr(page, 'data-frames')), { timeout: 8000 }).toBeGreaterThan(5);
    const c = await page.evaluate(() => (window as any).__constraints[0]);
    expect(c.audio).toMatchObject({ echoCancellation: false, noiseSuppression: false, autoGainControl: false });
    expect(['listening', 'detected']).toContain(await attr(page, 'data-state'));
    await page.locator('#ak-start').click();
    await expect(page.locator('#ak-start')).toHaveText('Mikrofonu başlat');
    await expect(display(page)).toHaveAttribute('data-state', 'idle');
    const live = await page.evaluate(() => (window as any).__streams.flatMap((s: MediaStream) => s.getTracks()).filter((t: MediaStreamTrack) => t.readyState === 'live').length);
    expect(live).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('440 Hz sentetik sinyal: La (A4), ±5 cent; sapma ve nota adı doğru', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto('/akort-aleti/');
    await page.locator('#ak-start').click();
    await expect(page.locator('#ak-start')).toHaveText('Mikrofonu durdur');
    await feed(page, 440, 'La');
    expect(Math.abs(await centsOf(page))).toBeLessThanOrEqual(5);
    expect(Math.abs(Number(await attr(page, 'data-freq')) - 440)).toBeLessThan(0.6);
    expect(await attr(page, 'data-note-en')).toBe('A');
    expect(await attr(page, 'data-octave')).toBe('4');
    await expect(page.locator('#ak-note')).toHaveText('La');
    await expect(page.locator('#ak-note-en')).toHaveText('A4');
    await expect(page.locator('#ak-status')).toContainText('Akort tamam');
    await expect(display(page)).toHaveClass(/is-ok/);
    // Tiz: 452 Hz ≈ +46,6 cent
    await page.evaluate(() => (window as any).__akortTest(452));
    await expect.poll(async () => await centsOf(page), { timeout: 8000 }).toBeGreaterThan(40);
    expect(await centsOf(page)).toBeLessThan(52);
    await expect(page.locator('#ak-status')).toContainText('tiz');
    // Pes: 430 Hz ≈ −39,9 cent
    await page.evaluate(() => (window as any).__akortTest(430));
    await expect.poll(async () => await centsOf(page), { timeout: 8000 }).toBeLessThan(-34);
    await expect(page.locator('#ak-status')).toContainText('pes');
    // Gitar Mi (E2) kalın tel: otomatik modda ilgili tel vurgulanır
    await feed(page, 82.41, 'Mi');
    expect(await attr(page, 'data-octave')).toBe('2');
    expect(Math.abs(await centsOf(page))).toBeLessThanOrEqual(5);
    await expect(page.locator('#ak-strings .ak-str.is-near')).toHaveText('Mi (E2)');
    expect(errors).toEqual([]);
  });

  test('A4 = 442 Hz: 440 Hz yaklaşık −8 cent görünür ve seçim saklanır', async ({ page }) => {
    await page.goto('/akort-aleti/');
    await page.locator('#ak-ref').selectOption('442');
    await page.locator('#ak-start').click();
    await feed(page, 440, 'La');
    const c = await centsOf(page);
    expect(c).toBeLessThan(-6);
    expect(c).toBeGreaterThan(-10);
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-akort')!));
    expect(saved).toMatchObject({ instrument: 'gitar', a4: 442 });
    await page.locator('#ak-instrument').selectOption('keman');
    await expect(page.locator('#ak-strings .ak-str')).toHaveCount(5);
    await page.reload();
    await expect(page.locator('#ak-ref')).toHaveValue('442');
    await expect(page.locator('#ak-instrument')).toHaveValue('keman');
    // Bozuk kayıt: varsayılana dön
    await page.evaluate(() => localStorage.setItem('ba-akort', '{bozuk'));
    await page.reload();
    await expect(page.locator('#ak-ref')).toHaveValue('440');
    await expect(page.locator('#ak-instrument')).toHaveValue('gitar');
  });

  test('hedef tel: sapma hedef notaya göre ölçülür; bağlamada oktav fark etmez', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto('/akort-aleti/');
    await page.locator('#ak-instrument').selectOption('ukulele');
    await expect(page.locator('#ak-strings .ak-str')).toHaveText(['Otomatik', 'Sol (G4)', 'Do (C4)', 'Mi (E4)', 'La (A4)']);
    await page.locator('#ak-start').click();
    // Otomatik: 415,3 Hz = Sol♯4, 0 cent
    await feed(page, 415.3, 'Sol♯');
    expect(Math.abs(await centsOf(page))).toBeLessThanOrEqual(5);
    // Hedef Sol (G4): aynı ses hedeften +100 cent tiz
    await page.locator('#ak-strings .ak-str', { hasText: 'Sol (G4)' }).click();
    await expect(page.locator('#ak-strings .ak-str[aria-pressed="true"]')).toHaveText('Sol (G4)');
    await page.evaluate(() => (window as any).__akortTest(415.3));
    await expect.poll(async () => await attr(page, 'data-note'), { timeout: 8000 }).toBe('Sol');
    await expect.poll(async () => await centsOf(page), { timeout: 8000 }).toBeGreaterThan(95);
    await expect(page.locator('#ak-status')).toContainText('tiz');
    // Bağlama bozuk düzen: Re hedefi hem D3 hem D4'te 0 cent
    await page.locator('#ak-instrument').selectOption('bagl-bozuk');
    await expect(page.locator('#ak-strings .ak-str')).toHaveText(['Otomatik', 'La (A)', 'Re (D)', 'Sol (G)']);
    await page.locator('#ak-strings .ak-str', { hasText: 'Re (D)' }).click();
    for (const f of [146.83, 293.66]) {
      await page.evaluate((x) => (window as any).__akortTest(x), f);
      await expect.poll(async () => Math.abs(await centsOf(page)), { timeout: 8000 }).toBeLessThanOrEqual(5);
      expect(await attr(page, 'data-note')).toBe('Re');
      await page.waitForTimeout(300);
    }
    expect(errors).toEqual([]);
  });

  test('referans ton düğmesi hata vermeden doğru frekansı çalar; A4 değişince güncellenir', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.addInitScript(() => {
      const w = window as any;
      w.__oscFreqs = [];
      const orig = OscillatorNode.prototype.start;
      OscillatorNode.prototype.start = function (...a: any[]) {
        w.__oscFreqs.push(this.frequency.value);
        return (orig as any).apply(this, a);
      };
    });
    await page.goto('/akort-aleti/');
    // Mikrofon başlatılmadan da çalışır
    await page.locator('#ak-strings .ak-str', { hasText: 'La (A2)' }).click();
    await page.locator('#ak-play').click();
    await expect(page.locator('#ak-play')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#ak-play')).toHaveAttribute('data-played', '1');
    await expect(page.locator('#ak-play-info')).toContainText('La (A2)');
    await expect(page.locator('#ak-play-info')).toContainText('110,0 Hz');
    await expect(page.locator('#ak-error')).not.toHaveClass(/is-active/);
    let freqs: number[] = await page.evaluate(() => (window as any).__oscFreqs);
    expect(Math.abs(freqs[0] - 110)).toBeLessThan(0.01);
    expect(Math.abs(freqs[1] - 220)).toBeLessThan(0.01);
    // A4 = 442: referans yeniden çalar
    await page.locator('#ak-ref').selectOption('442');
    await expect(page.locator('#ak-play-info')).toContainText('110,5 Hz');
    freqs = await page.evaluate(() => (window as any).__oscFreqs);
    expect(Math.abs(freqs[freqs.length - 2] - 110.5)).toBeLessThan(0.01);
    // İkinci tıklama durdurur
    await page.locator('#ak-play').click();
    await expect(page.locator('#ak-play')).toHaveAttribute('aria-pressed', 'false');
    // Kromatikte hedef yokken La4 çalar
    await page.locator('#ak-instrument').selectOption('kromatik');
    await page.locator('#ak-play').click();
    await expect(page.locator('#ak-play-info')).toContainText('La (A4)');
    await expect(page.locator('#ak-play-info')).toContainText('442,0 Hz');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Web Audio yoksa Türkçe, çözüm öneren hata gösterilir', async ({ page }) => {
    await page.addInitScript(() => {
      delete (window as any).AudioContext;
      delete (window as any).webkitAudioContext;
    });
    await page.goto('/akort-aleti/');
    await page.locator('#ak-start').click();
    await expect(page.locator('#ak-error')).toContainText('desteklemiyor');
    await page.locator('#ak-play').click();
    await expect(page.locator('#ak-error')).toContainText('desteklemiyor');
    await expect(page.locator('#ak-start')).toHaveText('Mikrofonu başlat');
  });
});

test.describe('izin reddi', () => {
  test.use({ permissions: [] });

  test('mikrofon izni reddedilince Türkçe, çözüm öneren yönlendirme; yeniden denenebilir', async ({ page }) => {
    const { errors } = watch(page);
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Permission denied', 'NotAllowedError'); };
    });
    await page.goto('/akort-aleti/');
    await page.locator('#ak-start').click();
    const err = page.locator('#ak-error');
    await expect(err).toContainText('Mikrofon izni verilmedi');
    await expect(err).toContainText('kilit');
    await expect(err).toContainText('Ses cihazınızdan çıkmaz');
    await expect(page.locator('#ak-start')).toBeEnabled();
    await expect(page.locator('#ak-start')).toHaveText('Mikrofonu başlat');
    await expect(display(page)).toHaveAttribute('data-state', 'idle');
    expect(errors).toEqual([]);
  });

  test('mikrofon bulunamazsa farklı, çözüm öneren mesaj verilir', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Requested device not found', 'NotFoundError'); };
    });
    await page.goto('/akort-aleti/');
    await page.locator('#ak-start').click();
    await expect(page.locator('#ak-error')).toContainText('Mikrofon bulunamadı');
    await expect(page.locator('#ak-error')).toContainText('takılı');
  });
});
