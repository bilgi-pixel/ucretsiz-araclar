import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Gerçek ses çıkışı ölçülmez: Web Audio çağrıları sayfaya enjekte edilen izleyicilerle gözlenir.
test.use({
  launchOptions: { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] },
});

const URL = '/hoparlor-test/';

function guard(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

/** AudioContext, bağlantı, osilatör, kazanç ve rampa çağrılarını kaydeden izleyici. */
async function installSpies(page: Page) {
  await page.addInitScript(() => {
    const w = window as any;
    w.__ctx = 0; w.__merges = []; w.__oscs = []; w.__gains = []; w.__ramps = []; w.__srcs = [];
    const AC = window.AudioContext;
    const origCreateOsc = AC.prototype.createOscillator;
    AC.prototype.createOscillator = function (...a: any[]) { const o = (origCreateOsc as any).apply(this, a); w.__oscs.push(o); return o; };
    const origCreateGain = AC.prototype.createGain;
    AC.prototype.createGain = function (...a: any[]) { const g = (origCreateGain as any).apply(this, a); w.__gains.push(g); return g; };
    const origCreateSrc = AC.prototype.createBufferSource;
    AC.prototype.createBufferSource = function (...a: any[]) { const s = (origCreateSrc as any).apply(this, a); w.__srcs.push(s); return s; };
    const origConnect = AudioNode.prototype.connect;
    (AudioNode.prototype as any).connect = function (dest: any, out: any, inp: any) {
      if (dest instanceof ChannelMergerNode) w.__merges.push(inp ?? 0);
      return (origConnect as any).apply(this, arguments);
    };
    const origRamp = AudioParam.prototype.exponentialRampToValueAtTime;
    AudioParam.prototype.exponentialRampToValueAtTime = function (v: number, t: number) { w.__ramps.push(v); return origRamp.call(this, v, t); };
    // Bağlam sayacı
    const Wrapped: any = function (this: any, ...a: any[]) { w.__ctx++; return Reflect.construct(AC, a, new.target || Wrapped); };
    Wrapped.prototype = AC.prototype;
    (window as any).AudioContext = Wrapped;
  });
}

test.describe('Hoparlör ve Kulaklık Testi', () => {
  test('sayfa yapısı: rozet, reklam konumu, SSS >= 7, >= 900 kelime, JSON-LD, meta.json, dış istek yok', async ({ page }) => {
    const g = guard(page);
    await page.goto(URL);
    await expect(page.locator('h1')).toContainText('Hoparlör ve Kulaklık Testi');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="hoparlor-test-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="hoparlor-test-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    // Sweep bölümünde "donanım testi" etiketi ve "işitme testi değildir" uyarısı bulunmalı
    await expect(page.locator('#h-sweep')).toContainText('Frekans taraması');
    await expect(page.locator('.ba-tool')).toContainText('donanım testidir, işitme testi değildir');

    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent!)));
    expect(ld.map((x) => x['@type']).sort()).toEqual(['FAQPage', 'SoftwareApplication']);
    expect(ld.find((x) => x['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);

    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'hoparlor-test', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('dosya');
    expect(meta.description.length).toBeGreaterThan(40);
    expect(meta.keywords.length).toBeGreaterThanOrEqual(5);
    expect(meta.icon).not.toContain('\n');

    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('kanal testi: AudioContext tek kez oluşur, sol/sağ doğru kanala gider, durum metni değişir', async ({ page }) => {
    const g = guard(page);
    await installSpies(page);
    await page.goto(URL);
    const status = page.locator('#status');
    await expect(status).toHaveAttribute('data-ctx', 'none');
    expect(await page.evaluate(() => (window as any).__ctx)).toBe(0);

    await page.locator('#btn-left').click();
    await expect(status).toHaveAttribute('data-ctx', 'running');
    await expect(status).toContainText('Sol kanal');
    await expect(status).toHaveAttribute('data-playing', 'true');
    await expect(status).toHaveAttribute('data-mode', 'left');
    await page.locator('#btn-right').click();
    await expect(status).toContainText('Sağ kanal');
    await expect(status).toHaveAttribute('data-mode', 'right');
    await page.locator('#btn-both').click();
    await expect(status).toContainText('İki kanal');
    await expect(status).toHaveAttribute('data-played', '3');

    // Tek bağlam; sol → birleştirici girişi 0, sağ → girişi 1, stereo birleştirici kullanmaz
    expect(await page.evaluate(() => (window as any).__ctx)).toBe(1);
    expect(await page.evaluate(() => (window as any).__merges)).toEqual([0, 1]);
    // Bipler 440 Hz
    expect(await page.evaluate(() => (window as any).__oscs.map((o: OscillatorNode) => o.frequency.value))).toEqual([440, 440, 440]);

    // Bipler bitince durum "Bitti" olur
    await expect(status).toContainText('Bitti', { timeout: 8000 });
    await expect(status).toHaveAttribute('data-playing', 'false');
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('sabit tonlar: 100/440/1000/5000/10000 Hz çalar, tekrar basınca durur, aria-pressed güncellenir', async ({ page }) => {
    const g = guard(page);
    await installSpies(page);
    await page.goto(URL);
    const status = page.locator('#status');
    for (const hz of [100, 440, 1000, 5000, 10000]) {
      const btn = page.locator(`[data-hz="${hz}"]`);
      await btn.click();
      await expect(status).toContainText(`${hz} Hz sabit ton`);
      await expect(status).toHaveAttribute('data-playing', 'true');
      await expect(btn).toHaveAttribute('aria-pressed', 'true');
      expect(await page.evaluate(() => { const o = (window as any).__oscs; return o[o.length - 1].frequency.value; })).toBe(hz);
      // Diğer tonlar basılı görünmemeli
      expect(await page.locator('[data-hz][aria-pressed="true"]').count()).toBe(1);
    }
    await page.locator('[data-hz="10000"]').click();
    await expect(status).toContainText('Durduruldu');
    await expect(status).toHaveAttribute('data-playing', 'false');
    expect(await page.locator('[data-hz][aria-pressed="true"]').count()).toBe(0);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('frekans taraması: Hz göstergesi yükselir, 20 kHz hedeflenir, "Tümünü durdur" sıfırlar', async ({ page }) => {
    test.setTimeout(45_000);
    const g = guard(page);
    await installSpies(page);
    await page.goto(URL);
    const hzEl = page.locator('#sweep-hz');
    await expect(hzEl).toHaveAttribute('data-freq', '0');
    await page.locator('#btn-sweep').click();
    await expect(page.locator('#btn-sweep')).toHaveText('Taramayı durdur');
    await expect(page.locator('#btn-sweep')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#status')).toContainText('donanım testi');
    const read = async () => Number(await hzEl.getAttribute('data-freq'));
    await expect.poll(read, { timeout: 5000 }).toBeGreaterThan(20);
    const first = await read();
    await expect.poll(read, { timeout: 12_000 }).toBeGreaterThan(Math.max(100, first));
    // Üstel rampa 20 kHz'e gider
    expect(await page.evaluate(() => (window as any).__ramps)).toContain(20000);

    await page.locator('#btn-stop').click();
    await expect(hzEl).toHaveAttribute('data-freq', '0');
    await expect(page.locator('#btn-sweep')).toHaveText('Taramayı başlat');
    await expect(page.locator('#status')).toContainText('Durduruldu');
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'false');
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('pembe gürültü: döngülü iki kanallı tampon çalar; düğme ve Esc ile durur', async ({ page }) => {
    const g = guard(page);
    await installSpies(page);
    await page.goto(URL);
    const btn = page.locator('#btn-pink');
    await btn.click();
    await expect(btn).toHaveText('Pembe gürültüyü durdur');
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#status')).toContainText('pembe gürültü');
    const info = await page.evaluate(() => {
      const s = (window as any).__srcs; const src = s[s.length - 1] as AudioBufferSourceNode;
      let peak = 0; const d = src.buffer!.getChannelData(0);
      for (let i = 0; i < d.length; i += 97) peak = Math.max(peak, Math.abs(d[i]));
      return { loop: src.loop, ch: src.buffer!.numberOfChannels, sec: src.buffer!.duration, peak };
    });
    expect(info.loop).toBe(true);
    expect(info.ch).toBe(2);
    expect(info.sec).toBeGreaterThan(3);
    expect(info.peak).toBeGreaterThan(0.1);
    expect(info.peak).toBeLessThanOrEqual(0.81);
    await btn.click();
    await expect(btn).toHaveText('Pembe gürültüyü başlat');
    await expect(page.locator('#status')).toContainText('Durduruldu');
    // Esc güvenlik kısayolu
    await btn.click();
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'false');
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('sol-sağ ters mi: sol kanala bip gider; dört yanıt dört farklı yönlendirme verir', async ({ page }) => {
    const g = guard(page);
    await installSpies(page);
    await page.goto(URL);
    await expect(page.locator('#swap-ask')).toBeHidden();
    await page.locator('#btn-swap').click();
    await expect(page.locator('#swap-ask')).toBeVisible();
    await expect(page.locator('#status')).toHaveAttribute('data-mode', 'swap');
    expect(await page.evaluate(() => (window as any).__merges)).toEqual([0]);

    const result = page.locator('#swap-result');
    await page.locator('#swap-right').click();
    await expect(result).toBeVisible();
    await expect(result).toHaveAttribute('data-verdict', 'swapped');
    await expect(result).toContainText('ters');
    await expect(result).toContainText('L işareti');
    await page.locator('#swap-both').click();
    await expect(result).toHaveAttribute('data-verdict', 'mono');
    await expect(result).toContainText('Mono ses');
    await page.locator('#swap-none').click();
    await expect(result).toHaveAttribute('data-verdict', 'none');
    await expect(result).toContainText('Ses duyulmadı');
    await page.locator('#swap-left').click();
    await expect(result).toHaveAttribute('data-verdict', 'ok');
    await expect(result).toContainText('Doğru');
    // Tekrar çal yeniden bip gönderir; yeni kontrol sonucu gizler
    await page.locator('#swap-replay').click();
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'true');
    await page.locator('#btn-swap').click();
    await expect(result).toBeHidden();
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('5 adımlı sihirbaz: hepsi evet → başarı özeti; bir hayır → uyarı özeti; kapatılabilir', async ({ page }) => {
    const g = guard(page);
    await installSpies(page);
    await page.goto(URL);
    await expect(page.locator('#wiz-panel')).toBeHidden();
    await page.locator('#wiz-start').click();
    await expect(page.locator('#wiz-panel')).toBeVisible();
    await expect(page.locator('#wiz-step')).toContainText('Adım 1/5');
    await expect(page.locator('#wiz-step')).toBeFocused();
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'true');
    const titles = ['Sol kanal', 'Sağ kanal', 'İki kanal', 'Frekans taraması', 'Pembe gürültü'];
    for (let i = 0; i < 5; i++) {
      await expect(page.locator('#wiz-step')).toContainText(`Adım ${i + 1}/5`);
      await expect(page.locator('#wiz-step')).toContainText(titles[i]);
      await expect(page.locator('#wiz-q')).not.toBeEmpty();
      await expect(page.locator('#status')).toHaveAttribute('data-mode', /^wiz-/);
      await page.locator('#wiz-yes').click();
    }
    const sum = page.locator('#wiz-summary');
    await expect(sum).toBeVisible();
    await expect(sum).toHaveAttribute('data-verdict', 'ok');
    await expect(sum).toContainText('Beş adımın beşi de başarılı');
    expect(await page.locator('#wiz-list li').count()).toBe(5);
    await expect(page.locator('#wiz-panel')).toBeHidden();
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'false');

    // İkinci tur: 2. adıma "Hayır"
    await page.locator('#wiz-start').click();
    await expect(sum).toBeHidden();
    await page.locator('#wiz-yes').click();
    await page.locator('#wiz-no').click();
    for (let i = 0; i < 3; i++) await page.locator('#wiz-yes').click();
    await expect(sum).toBeVisible();
    await expect(sum).toHaveAttribute('data-verdict', 'warn');
    await expect(sum).toContainText('4 tanesi başarılı');
    await expect(page.locator('#wiz-list li.no')).toHaveCount(1);
    await expect(page.locator('#wiz-list li.no')).toContainText('Sağ kanal');

    // Tekrar çal ve kapat
    await page.locator('#wiz-start').click();
    await page.locator('#wiz-replay').click();
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'true');
    await page.locator('#wiz-cancel').click();
    await expect(page.locator('#wiz-panel')).toBeHidden();
    await expect(page.locator('#status')).toContainText('kapatıldı');
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'false');
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('ses düzeyi: düşük başlar, yüksekte uyarır, ana kazanç kaydırıcıyı izler', async ({ page }) => {
    const g = guard(page);
    await installSpies(page);
    await page.goto(URL);
    await expect(page.locator('#vol')).toHaveValue('25');
    await expect(page.locator('#vol-out')).toHaveText('%25');
    expect(Number(await page.locator('#vol-out').getAttribute('data-gain'))).toBeLessThan(0.1);
    await expect(page.locator('#vol-warn')).not.toContainText('Yüksek');
    await expect(page.locator('.ht-warn')).toContainText('Kulaklık takılıysa dikkat');

    await page.locator('#vol').fill('80');
    await expect(page.locator('#vol-out')).toHaveText('%80');
    await expect(page.locator('#vol-warn')).toContainText('Yüksek ses düzeyi');
    expect(Number(await page.locator('#vol-out').getAttribute('data-gain'))).toBeCloseTo(0.512, 2);

    // Ana kazanç (ilk oluşturulan GainNode) çalmaya başlayınca kaydırıcı değerini taşır
    await page.locator('[data-hz="440"]').click();
    await expect(page.locator('#status')).toHaveAttribute('data-ctx', 'running');
    expect(await page.evaluate(() => (window as any).__gains[0].gain.value)).toBeCloseTo(0.512, 2);
    await page.locator('#vol').fill('10');
    await expect.poll(() => page.evaluate(() => (window as any).__gains[0].gain.value), { timeout: 5000 }).toBeLessThan(0.02);
    await expect(page.locator('#vol-warn')).not.toContainText('Yüksek');
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('Web Audio yoksa Türkçe uyarı verir, hata fırlatmaz', async ({ page }) => {
    const g = guard(page);
    await page.addInitScript(() => {
      delete (window as any).AudioContext;
      delete (window as any).webkitAudioContext;
    });
    await page.goto(URL);
    await page.locator('#btn-left').click();
    await expect(page.locator('#status')).toContainText('desteklemiyor');
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'false');
    expect(g.errors).toEqual([]);
    expect(g.external).toEqual([]);
  });

  test('360px: yatay taşma yok, kaydırıcı ve düğmeler sığar, klavyeyle çalışır', async ({ page }) => {
    const g = guard(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    const sels = ['#vol', '#btn-stop', '#btn-left', '#btn-both', '#btn-right', '#btn-swap', '#btn-sweep', '#btn-pink', '#wiz-start', '#status'];
    for (const sel of sels) {
      const box = await page.locator(sel).boundingBox();
      expect(box, sel).not.toBeNull();
      expect(box!.x + box!.width, sel).toBeLessThanOrEqual(360.5);
      expect(box!.x, sel).toBeGreaterThanOrEqual(-0.5);
    }
    for (const hz of [100, 440, 1000, 5000, 10000]) {
      const box = await page.locator(`[data-hz="${hz}"]`).boundingBox();
      expect(box!.x + box!.width).toBeLessThanOrEqual(360.5);
    }
    // Klavye: kaydırıcıya odaklan, ok tuşuyla değiştir, Tab ile durdur düğmesine geç, Enter ile kanal testi
    await page.locator('#vol').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#vol')).toHaveValue('26');
    await page.keyboard.press('Tab');
    await expect(page.locator('#btn-stop')).toBeFocused();
    await page.locator('#btn-left').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#status')).toContainText('Sol kanal');
    await page.keyboard.press('Escape');
    await expect(page.locator('#status')).toHaveAttribute('data-playing', 'false');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    expect(g.external).toEqual([]);
    expect(g.errors).toEqual([]);
  });
});
