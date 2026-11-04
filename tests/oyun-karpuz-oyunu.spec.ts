import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Karpuz Oyunu: fizikli meyve birleştirme. Test kancası window.__karpuzOyunuTest() fiziği dondurup (freeze) belirli
// süre ilerletebilir (step), sıradaki meyveleri ayarlayabilir (setQueue) ve doğrudan meyve koyabilir (spawn).
// Meyve bırakma her yerde gerçek girdiyle (Boşluk, tıklama, ekran düğmesi) yapılır.
const URL_PATH = '/oyunlar/karpuz-oyunu/';
const KEY = 'ba-oyun-karpuz-oyunu';
const LINE_Y = 112;

type Body = { id: number; lvl: number; x: number; y: number; r: number; asleep: boolean; fixed: boolean };
type Snap = {
  phase: string; state: string; score: number; best: number; seed: number; current: number; next: number; dropX: number;
  t: number; overTimer: number; drops: number; merges: number; karpuz: number; biggest: number; ready: boolean; bodies: Body[];
};

/** Kancadaki bir yöntemi çağırır (dönüş değeri JSON'a çevrilebilir olmalı). */
function call<T = unknown>(page: Page, fn: string, ...args: unknown[]): Promise<T> {
  return page.evaluate(([f, a]) => {
    const api = (window as unknown as { __karpuzOyunuTest: () => Record<string, (...x: unknown[]) => unknown> }).__karpuzOyunuTest();
    return api[f as string](...(a as unknown[]));
  }, [fn, args] as const) as Promise<T>;
}
const snap = (page: Page) => call<Snap>(page, 'snapshot');
const store = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

function watch(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

/** Sayfayı açar, oyunu başlatır, verilen tohumla yeni oyuna geçip gerçek zamanlı fiziği dondurur. */
async function frozenGame(page: Page, seed: number) {
  await page.goto(URL_PATH);
  await page.locator('#ko-start').click();
  await call(page, 'newGame', seed);
  await call(page, 'freeze', true);
  await page.locator('#ko-canvas').focus();
}

test.describe('Oyun: Karpuz Oyunu', () => {
  test('sayfa açılır; klavye, fare ve ekran düğmeleriyle nişan alıp bırakılır; dış istek ve sayfa hatası yok', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Karpuz Oyunu');
    await expect(page.locator('#oyun-kutusu')).toHaveAttribute('data-phase', 'idle');
    await expect(page.locator('#ko-drop')).toBeDisabled();
    await page.locator('#ko-start').click();
    await expect(page.locator('#oyun-kutusu')).toHaveAttribute('data-phase', 'playing');
    await expect(page.locator('#ko-canvas')).toBeFocused();
    await expect(page.locator('#ko-start')).toHaveText('Yeniden başlat');

    // Klavye: sağ ok bırakıcıyı taşır, Boşluk bırakır; sıradaki meyve öne geçer
    let s = await snap(page);
    const x0 = s.dropX;
    const { current, next } = s;
    await page.keyboard.press('ArrowRight');
    s = await snap(page);
    expect(s.dropX).toBeGreaterThan(x0);
    await page.keyboard.press('Space');
    s = await snap(page);
    expect(s.drops).toBe(1);
    expect(s.bodies.map((b) => b.lvl)).toEqual([current]);
    expect(s.current).toBe(next);
    expect(s.overTimer).toBe(0); // yeni bırakılan meyve muaf
    await expect(page.locator('#ko-cur')).toHaveText(['Kiraz', 'Çilek', 'Üzüm', 'Mandalina', 'Portakal'][next - 1]);

    // Fare: imleç bırakıcıyı yönlendirir, tıklama bırakır (yarım saniyelik bekleme bitince)
    const box = (await page.locator('#ko-canvas').boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.1);
    await expect.poll(async () => (await snap(page)).dropX).toBeLessThan(110);
    await expect.poll(async () => (await snap(page)).ready).toBe(true);
    await page.mouse.click(box.x + box.width * 0.2, box.y + box.height * 0.1);
    await expect.poll(async () => (await snap(page)).drops).toBe(2);

    // Ekran düğmeleri: Sağa bırakıcıyı kaydırır, Bırak meyveyi düşürür
    const before = (await snap(page)).dropX;
    await page.locator('#ko-right').click();
    expect((await snap(page)).dropX).toBeGreaterThan(before);
    await expect.poll(async () => (await snap(page)).ready).toBe(true);
    await page.locator('#ko-drop').click();
    await expect.poll(async () => (await snap(page)).drops).toBe(3);

    // Meyveler fizikle kabın tabanına düşer
    await expect.poll(async () => Math.max(...(await snap(page)).bodies.map((b) => b.y + b.r)), { timeout: 5000 }).toBeGreaterThan(500);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('iki kiraz üst üste bırakılınca çileğe birleşir ve puan tam 3 artar', async ({ page }) => {
    const { errors } = watch(page);
    await frozenGame(page, 4242);
    await call(page, 'setQueue', 1, 1);
    await call(page, 'setDropX', 200);
    await page.keyboard.press('Space');
    await call(page, 'step', 1.2);
    let s = await snap(page);
    expect(s.bodies.map((b) => b.lvl)).toEqual([1]);
    expect(s.score).toBe(0);
    expect(s.current).toBe(1);
    expect(s.bodies[0].y + s.bodies[0].r).toBeCloseTo(586, 0); // tabana oturdu
    await page.keyboard.press('Space');
    await call(page, 'step', 1.5);
    s = await snap(page);
    expect(s.bodies.map((b) => b.lvl)).toEqual([2]);
    expect(s.score).toBe(3);
    expect(s.merges).toBe(1);
    expect(s.bodies[0].x).toBeCloseTo(200, 0); // temas noktasında oluştu
    await expect(page.locator('#ko-score')).toHaveText('3');
    await expect(page.locator('#ko-biggest')).toHaveText('Çilek');
    expect(errors).toEqual([]);
  });

  test('iki kavun karpuz olur (+66); iki karpuz birleşince ikisi de kaybolur, kap boşalır ve 100 bonus eklenir', async ({ page }) => {
    await frozenGame(page, 5);
    await call(page, 'spawn', 10, 100, 500);
    await call(page, 'spawn', 10, 200, 300);
    await call(page, 'step', 2);
    let s = await snap(page);
    expect(s.bodies.map((b) => b.lvl)).toEqual([11]);
    expect(s.score).toBe(66);
    await expect(page.locator('#ko-biggest')).toHaveText('Karpuz');
    await call(page, 'spawn', 11, 250, 200);
    await call(page, 'step', 2);
    s = await snap(page);
    expect(s.bodies).toHaveLength(0);
    expect(s.karpuz).toBe(1);
    expect(s.score).toBe(166);
    await expect(page.locator('#ko-score')).toHaveText('166');
    expect(s.phase).toBe('playing');
  });

  test('çizginin üstünde 2 saniyeden uzun kalan meyve oyunu bitirir; yeni meyveye 1 sn muafiyet; skor kaydedilir; yeniden başlatılır', async ({ page }) => {
    await frozenGame(page, 3);
    // önce 3 puan: iki kiraz
    await call(page, 'spawn', 1, 300, 560);
    await call(page, 'spawn', 1, 300, 520);
    await call(page, 'step', 1);
    expect((await snap(page)).score).toBe(3);
    // üst kenarı çizginin üstünde, yerinde sabit bir mandalina; az önce bırakılmış gibi (muafiyetli)
    const t = (await snap(page)).t;
    await call(page, 'spawn', 4, 120, LINE_Y, { fixed: true, born: t });
    await call(page, 'step', 0.9);
    expect((await snap(page)).overTimer).toBe(0); // muafiyet süresi
    await call(page, 'step', 2.0); // muafiyet bitti, 1.9 sn çizgide
    let s = await snap(page);
    expect(s.phase).toBe('playing');
    expect(s.overTimer).toBeGreaterThan(1.8);
    expect(s.overTimer).toBeLessThanOrEqual(2);
    await expect(page.locator('#ko-result')).toBeHidden();
    await call(page, 'step', 0.2);
    s = await snap(page);
    expect(s.phase).toBe('over');
    const result = page.locator('#ko-result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-active/);
    await expect(page.locator('#ko-r-score')).toHaveText('3');
    await expect(page.locator('#ko-r-text')).toContainText('2 saniyeden uzun');
    await expect(page.locator('#oyun-kutusu')).toHaveAttribute('data-phase', 'over');
    const st = await store(page);
    expect(st.best).toBe(3);
    expect(st.games).toBe(1);
    // Yeniden oyna
    await page.locator('#ko-again').click();
    s = await snap(page);
    expect(s.phase).toBe('playing');
    expect(s.score).toBe(0);
    expect(s.bodies).toHaveLength(0);
    await expect(result).toBeHidden();
    await expect(page.locator('#ko-best')).toHaveText('3');
  });

  test('tohum: bilinen meyve dizisi, aynı tohumla aynı oyun; ?tohum= bağlantısı çalışır, bozuk değer uyarı verir', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto(URL_PATH);
    // mulberry32(12345) ile 1–5 arası seviyeler (bilinen değerler)
    expect(await call(page, 'sequence', 12345, 12)).toEqual([5, 2, 3, 5, 3, 2, 1, 4, 5, 5, 3, 5]);
    expect(await call(page, 'sequence', 777, 10)).toEqual([4, 1, 1, 1, 4, 2, 2, 4, 4, 4]);
    const play = async () => {
      await page.locator('#ko-start').click();
      await call(page, 'newGame', 12345);
      await call(page, 'freeze', true);
      await page.locator('#ko-canvas').focus();
      const dropped: number[] = [];
      for (let i = 0; i < 8; i++) {
        await call(page, 'setDropX', 40 + i * 45);
        dropped.push((await snap(page)).current);
        await page.keyboard.press('Space');
        await call(page, 'step', 0.5);
      }
      expect((await snap(page)).drops).toBe(8);
      return dropped;
    };
    const a = await play();
    const b = await play();
    expect(a).toEqual([5, 2, 3, 5, 3, 2, 1, 4]);
    expect(b).toEqual(a);

    await page.goto(URL_PATH + '?tohum=12345');
    await expect(page.locator('#ko-warn')).toContainText('Sabit tohum');
    await expect(page.locator('#ko-seed')).toHaveText('12345');
    await page.locator('#ko-start').click();
    let s = await snap(page);
    expect([s.current, s.next]).toEqual([5, 2]);
    await expect(page.locator('#ko-seed-link')).toHaveAttribute('href', '?tohum=12345');

    await page.goto(URL_PATH + '?tohum=abc%3Cscript%3E');
    const warn = page.locator('#ko-warn');
    await expect(warn).toContainText('geçersiz');
    await expect(warn).toHaveClass(/is-bad/);
    await page.locator('#ko-start').click();
    await page.keyboard.press('Space');
    s = await snap(page);
    expect(s.phase).toBe('playing');
    expect(s.drops).toBe(1);
    expect(errors).toEqual([]);
  });

  test('altındaki meyve kayınca uyuyan meyve havada/duvarda asılı kalmaz, düşer', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const F = await import('/oyunlar/karpuz-oyunu/fizik.js');
      const w = F.createWorld(1);
      // Tabanda sağ duvara yaslı portakal (solunda yuvarlanmasını önleyen sabit elma) ve portakalla duvar
      // arasına sıkışmış çilek: ikisi de uyur
      F.spawnBody(w, 6, 283, 547, { fixed: true });
      const low = F.spawnBody(w, 5, 354, 554);
      const top = F.spawnBody(w, 2, 370, 470);
      F.advance(w, 4);
      const before = { lowAsleep: low.asleep, topAsleep: top.asleep, topBottom: top.y + top.r };
      // Alttaki meyve birleşme olmadan yerinden kayar (ör. başka bir meyvenin çarpmasıyla itilir)
      low.x = 80;
      low.asleep = false;
      F.advance(w, 1.5);
      return { before, after: { topBottom: top.y + top.r, floor: F.FLOOR } };
    });
    expect(r.before.lowAsleep).toBe(true);
    expect(r.before.topAsleep).toBe(true);
    expect(r.before.topBottom).toBeLessThan(540); // portakalın üstündeydi
    expect(r.after.topBottom).toBeCloseTo(r.after.floor, 0); // dayanağı gidince tabana düştü
  });

  test('yarıda bırakılan oyunun puanı en yüksek skora yazılır', async ({ page }) => {
    await frozenGame(page, 4242);
    await call(page, 'spawn', 1, 200, 560);
    await call(page, 'spawn', 1, 200, 520);
    await call(page, 'step', 1);
    expect((await snap(page)).score).toBe(3);
    await expect(page.locator('#ko-best')).toHaveText('3');
    await page.locator('#ko-start').click(); // Yeniden başlat
    expect((await snap(page)).score).toBe(0);
    await expect(page.locator('#ko-best')).toHaveText('3');
    expect((await store(page)).best).toBe(3);
  });

  test('uzun çalışma: 5 dakikalık simülasyonda hiçbir meyve kabın dışına çıkmaz, sayısal bozulma olmaz', async ({ page }) => {
    test.setTimeout(120_000);
    const { errors } = watch(page);
    await page.goto(URL_PATH);
    const r = await call<Record<string, number>>(page, 'simulate', 300, { seed: 99, dropEvery: 0.7 });
    expect(r.steps).toBe(36000);
    expect(r.violations).toBe(0);
    expect(r.drops).toBeGreaterThan(300);
    expect(r.merges).toBeGreaterThan(150);
    expect(r.maxBodies).toBeGreaterThan(20);
    expect(r.biggest).toBeGreaterThanOrEqual(8);
    // simülasyon kayıt yazmaz ve sayfayı boş, oynanabilir hâle döndürür
    expect(await store(page)).toBeNull();
    await expect(page.locator('#oyun-kutusu')).toHaveAttribute('data-phase', 'idle');
    expect(errors).toEqual([]);
  });

  test('bozuk localStorage çökertmez; ses tercihi geçerli JSON olarak yazılır', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"abc","sound":"evet","games":-5,"biggest":99}', '{"best":1e999}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await page.goto(URL_PATH);
      await expect(page.locator('#ko-best')).toHaveText('0');
      await expect(page.locator('#ko-sound')).toHaveAttribute('aria-pressed', 'false');
      await page.locator('#ko-start').click();
      await page.keyboard.press('Space');
      expect((await snap(page)).drops).toBe(1);
      expect(errors).toEqual([]);
      await page.close();
    }
    const page = await context.newPage();
    await page.goto(URL_PATH);
    await page.locator('#ko-sound').click();
    await expect(page.locator('#ko-sound')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#ko-sound')).toHaveText('Ses: açık');
    const st = await store(page);
    expect(st.sound).toBe(true);
    expect(typeof st.best).toBe('number');
  });

  test('P ile duraklatma, sekme gizlenince otomatik duraklama', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#ko-start').click();
    await page.keyboard.press('p');
    expect((await snap(page)).phase).toBe('paused');
    await expect(page.locator('#ko-pause')).toHaveText('Devam et');
    await expect(page.locator('#ko-drop')).toBeDisabled();
    const t = (await snap(page)).t;
    await page.waitForTimeout(200);
    expect((await snap(page)).t).toBe(t); // duraklatıldıkça fizik ilerlemez
    await page.keyboard.press('p');
    expect((await snap(page)).phase).toBe('playing');
    await expect.poll(async () => (await snap(page)).t).toBeGreaterThan(t);
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect((await snap(page)).phase).toBe('paused');
  });

  test('360px: yatay taşma yok; içerik 900+ kelime, 3 reklam (oyun kutusunun dışında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await page.locator('#ko-start').click();
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const cb = (await page.locator('#ko-canvas').boundingBox())!;
    expect(cb.width).toBeGreaterThan(240);
    expect(cb.x + cb.width).toBeLessThanOrEqual(360);
    // Tuval DPR ölçekli ve oranı korunur
    const dims = await page.locator('#ko-canvas').evaluate((c: HTMLCanvasElement) => ({ w: c.width, h: c.height, cw: c.clientWidth, dpr: devicePixelRatio }));
    expect(Math.abs(dims.w - Math.round(dims.cw * Math.min(dims.dpr, 2.5)))).toBeLessThanOrEqual(1);
    expect(dims.h / dims.w).toBeCloseTo(1.5, 1);
    // Durum kutularında en uzun meyve adı tek satırda kalır (kelime ortasından bölünmez), etiketler kesilmez
    const cells = await page.evaluate(() => {
      // 1: "Mandalina" kısa bir adla ("Elma") aynı yükseklikte, yani tek satır
      const lines = (id: string) => {
        const e = document.getElementById(id)!;
        const prev = e.textContent;
        e.textContent = 'Elma';
        const one = e.getBoundingClientRect().height;
        e.textContent = 'Mandalina';
        const n = Math.round(e.getBoundingClientRect().height / one);
        e.textContent = prev;
        return n;
      };
      const cut = [...document.querySelectorAll('.ko-stats span')].filter((s) => s.scrollWidth > s.clientWidth + 0.5).length;
      return { big: lines('ko-biggest'), next: lines('ko-next'), cut };
    });
    expect(cells).toEqual({ big: 1, next: 1, cut: 0 });
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-karpuz-oyunu-${s}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun-kutusu .ba-ad').count()).toBe(0);
    await expect(page.locator('#oyun-kutusu + .ba-ad[data-slot="oyun-karpuz-oyunu-a"]')).toHaveCount(1);
    const faq = await page.locator('.ba-faq details').count();
    expect(faq).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    const faqLd = data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage');
    expect(faqLd.mainEntity.length).toBe(faq);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page).toHaveTitle(/Karpuz Oyunu Oyna/);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
});
