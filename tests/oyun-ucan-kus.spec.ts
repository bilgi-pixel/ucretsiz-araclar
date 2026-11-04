import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Uçan Kuş: sayfa yapısı, zıplama, çarpışma, skor, rekor, duraklatma, tema, hareket azaltma, mobil.
const URL_PATH = '/oyunlar/ucan-kus/';
const STORE_KEY = 'ba-oyun-ucan-kus';

type Pipe = { x: number; top: number; bottom: number; passed: boolean };
type Snap = {
  state: string; paused: boolean; y: number; vy: number; score: number; best: number; level: string; theme: string;
  reason: string; parallax: boolean; tune: Record<string, number | boolean | null>; pipes: Pipe[];
};
// Test kancası: yama verilirse ayarı geçersiz kılar; her çağrıda anlık durumu döndürür.
const kus = (page: Page, patch?: Record<string, unknown>) =>
  page.evaluate((p) => (window as unknown as { __kusTest: (q?: unknown) => unknown }).__kusTest(p), patch) as Promise<Snap>;

const stage = (page: Page) => page.locator('#stage');
async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}
// Başlat'a basar ve ilk zıplamayla oyunu fiilen başlatır
async function startPlaying(page: Page) {
  await page.locator('#btn-main').click();
  await expect(stage(page)).toHaveAttribute('data-state', 'bekle');
  await page.keyboard.press('Space');
  await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
}

test.describe('Uçan Kuş', () => {
  test('sayfa açılır; ≥900 kelime, 3 reklam (oyun kutusunun dışında), SSS ≥7 ve JSON-LD tamam, marka adı yok, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Uçan Kuş');
    await expect(page).toHaveTitle(/Uçan Kuş Oyunu Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-ucan-kus-a', 'oyun-ucan-kus-b', 'oyun-ucan-kus-c']);
    const placement = await page.evaluate(() => {
      const box = document.getElementById('game-box')!;
      const a = document.querySelector('.ba-ad[data-slot$="-a"]')!;
      return {
        insideBox: Array.from(document.querySelectorAll('.ba-ad')).some((ad) => box.contains(ad)),
        aAfterBox: !!(box.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING),
      };
    });
    expect(placement).toEqual({ insideBox: false, aAfterBox: true });

    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(7);

    // Marka adı hiçbir yerde geçmez (görünen metin, başlık, JSON-LD, meta)
    const html = await page.content();
    // (marka adı bu dosyada da düz yazılmaz; parçalardan kurulur)
    expect(html).not.toMatch(new RegExp(['fla', 'ppy'].join(''), 'i'));

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başlat → kuş bekler; ilk zıplama oyunu başlatır ve kuşun hızını/yüksekliğini değiştirir', async ({ page }) => {
    const errors = await open(page);
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'bekle');
    await expect(page.locator('#overlay')).toBeHidden();
    let s = await kus(page);
    expect(s.pipes).toEqual([]); // ilk zıplamaya kadar boru yok
    expect(s.vy).toBe(0);

    // Zıplama kuşun dikey hızını yukarı (negatif) yapar: aynı görevde okunur, kare hızından bağımsız
    const vyAfterFlap = await page.evaluate(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true, cancelable: true }));
      return (window as unknown as { __kusTest: () => { vy: number; state: string } }).__kusTest();
    });
    expect(vyAfterFlap.state).toBe('oynuyor');
    expect(vyAfterFlap.vy).toBeLessThan(-300);

    // Kısa süre sonra kuş başlangıç yüksekliğinin üstüne çıkmıştır (y küçülür)
    const y0 = s.y;
    await expect.poll(async () => (await kus(page)).y, { timeout: 2000 }).toBeLessThan(y0 - 8);

    // Fare tıklaması da zıplatır
    await page.evaluate(() => {
      const st = document.getElementById('stage')!;
      st.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 3, pointerType: 'mouse', isPrimary: true, button: 0, bubbles: true, cancelable: true }));
    });
    s = await kus(page);
    expect(s.state === 'oynuyor' || s.state === 'bitti').toBe(true);
    expect(errors).toEqual([]);
  });

  test('zıplamazsan kuş düşer; yere çarpınca oyun biter, Tekrar oyna ve Yeniden başlat çalışır', async ({ page }) => {
    await open(page);
    await startPlaying(page);
    // Tek zıplamadan sonra kuş yere iner (ilk boru gelmeden)
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti', { timeout: 8000 });
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#overlay-title')).toHaveText('Oyun bitti');
    await expect(page.locator('#overlay-text')).toContainText('Yere düştün');
    expect((await kus(page)).reason).toBe('Yere düştün.');

    // Oyun sonunda kısa kilit: düğme açılınca yeniden başlar
    await expect(page.locator('#overlay-btn')).toBeEnabled({ timeout: 3000 });
    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'bekle');
    await expect(page.locator('#score')).toHaveText('0');
    expect((await kus(page)).pipes).toEqual([]);

    // Oyun sürerken "Yeniden başlat" başa alır
    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.locator('#btn-restart').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'bekle');
  });

  test('boruya çarpınca oyun biter (aralık kuştan uzağa ayarlı, kuş havada sabit)', async ({ page }) => {
    await open(page);
    // Kancayla: yerçekimsiz asılı kuş + yukarıda dar bir boşluk → kuş alt boruya çarpar
    await kus(page, { hover: true, gapCenter: 100, gap: 60 });
    await startPlaying(page);
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti', { timeout: 8000 });
    await expect(page.locator('#overlay-text')).toContainText('Boruya çarptın');
    const s = await kus(page);
    expect(s.reason).toBe('Boruya çarptın.');
    expect(s.score).toBe(0);
  });

  test('borular arasından geçince skor artar; en yüksek skor localStorage\'a yazılır ve yenilemede korunur', async ({ page }) => {
    await open(page);
    await page.locator('#opt-level').selectOption('fast');
    await expect(stage(page)).toHaveAttribute('data-level', 'fast');
    // Kancayla: geniş boşluk, kuş havada sabit → borular çarpmadan geçer
    await kus(page, { hover: true, gapCenter: 238, gap: 220 });
    await startPlaying(page);
    await expect.poll(async () => (await kus(page)).score, { timeout: 12_000 }).toBeGreaterThanOrEqual(2);
    expect((await kus(page)).state).toBe('oynuyor');
    await expect(page.locator('#score')).not.toHaveText('0');
    expect(Number(await page.locator('#best').textContent())).toBeGreaterThanOrEqual(2);

    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best.fast).toBeGreaterThanOrEqual(2);
    expect(saved.best.normal).toBe(0); // rekor zorluk başına ayrı tutulur
    expect(saved.level).toBe('fast');

    await page.reload();
    await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
    await expect(page.locator('#opt-level')).toHaveValue('fast');
    await expect(page.locator('#best')).toHaveText(String(saved.best.fast));
  });

  test('P tuşu ve Duraklat düğmesi oyunu dondurur; devam edince kuş yeniden hareket eder', async ({ page }) => {
    const errors = await open(page);
    await startPlaying(page);
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay')).toContainText('Duraklatıldı');
    expect((await kus(page)).paused).toBe(true);
    const frozen = await kus(page);
    await page.waitForTimeout(400);
    const still = await kus(page);
    expect(still.y).toBe(frozen.y);
    expect(still.vy).toBe(frozen.vy);

    // P devam ettirir; kuş yeniden hareket eder
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect.poll(async () => (await kus(page)).y).not.toBe(frozen.y);

    // Düğmeyle duraklat / devam et
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    expect(errors).toEqual([]);
  });

  test('zorluk seviyeleri boru aralığı ve hızı değiştirir; oyun sürerken zorluk kilitlidir', async ({ page }) => {
    await open(page);
    const vals: Record<string, { gap: number; speed: number }> = {};
    for (const lv of ['slow', 'normal', 'fast']) {
      await page.locator('#opt-level').selectOption(lv); // hazır ekranda zorluk değişince ayarlar hemen uygulanır
      await expect(stage(page)).toHaveAttribute('data-level', lv);
      const t = (await kus(page)).tune;
      vals[lv] = { gap: Number(t.gap), speed: Number(t.speed) };
    }
    expect(vals.slow.gap).toBeGreaterThan(vals.normal.gap);
    expect(vals.normal.gap).toBeGreaterThan(vals.fast.gap);
    expect(vals.slow.speed).toBeLessThan(vals.normal.speed);
    expect(vals.normal.speed).toBeLessThan(vals.fast.speed);

    await page.locator('#btn-main').click();
    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(page.locator('#opt-level')).toBeDisabled();
  });

  test('gündüz/gece teması değişir, localStorage\'a yazılır ve yenilemede korunur', async ({ page }) => {
    await open(page);
    await expect(stage(page)).toHaveAttribute('data-theme', 'gunduz');
    await page.locator('#opt-theme').selectOption('gece');
    await expect(stage(page)).toHaveAttribute('data-theme', 'gece');
    expect((await kus(page)).theme).toBe('gece');
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.theme).toBe('gece');
    await page.reload();
    await expect(stage(page)).toHaveAttribute('data-theme', 'gece');
    await expect(page.locator('#opt-theme')).toHaveValue('gece');
  });

  test('hareket azaltma tercihi açıkken parallax kapanır, kapalıyken açıktır', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await open(page);
    expect((await kus(page)).parallax).toBe(true);
    await expect(stage(page)).toHaveAttribute('data-parallax', 'on');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(async () => (await kus(page)).parallax).toBe(false);
    await expect(stage(page)).toHaveAttribute('data-parallax', 'off');
    // Yeni sayfa yüklemesinde de tercih uygulanır ve oyun yine oynanır
    await page.reload();
    await expect(stage(page)).toHaveAttribute('data-parallax', 'off');
    await startPlaying(page);
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#best')).toHaveText('0');
    await startPlaying(page);
    expect(errors).toEqual([]);
  });

  test('360px: taşma yok, oyun alanı 2:3 oranında sığar, dokunmayla başlar ve zıplar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await stage(page).boundingBox();
    expect(box!.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box!.height / box!.width - 1.5)).toBeLessThan(0.02);

    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'bekle');
    await page.evaluate(() => {
      const st = document.getElementById('stage')!;
      const r = st.getBoundingClientRect();
      st.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, bubbles: true, cancelable: true }));
    });
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    expect((await kus(page)).vy).toBeLessThan(0);
    expect(errors).toEqual([]);
  });

  test.describe('Retina ekran', () => {
    test.use({ deviceScaleFactor: 2 });
    test('canvas, devicePixelRatio kadar yüksek çözünürlükte çizilir', async ({ page }) => {
      await open(page);
      const dims = await page.locator('#board').evaluate((c) => {
        const cv = c as HTMLCanvasElement;
        return { w: cv.width, cssW: Math.round(cv.getBoundingClientRect().width) };
      });
      expect(dims.w).toBe(dims.cssW * 2);
    });
  });

  test('tam ekran düğmesi oyun kutusunu tam ekran yapar (reklamlar kutunun dışında kalır)', async ({ page }) => {
    await open(page);
    await expect(page.locator('#btn-full')).toBeVisible();
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await page.keyboard.press('Escape');
  });
});
