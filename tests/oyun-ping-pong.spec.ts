import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Ping Pong: sayfa yapısı, modlar, klavye/fare/dokunma kontrolleri, top hızı ve açısı, bilgisayar rakibi,
// maç sonu ve maç geçmişi. Senaryolar window.__pongTest kancasıyla (sabit adımlı, tohumlu) deterministik kurulur.
const URL_PATH = '/oyunlar/ping-pong/';
const STORE_KEY = 'ba-oyun-ping-pong';

type Snap = {
  state: string;
  phase: string;
  mode: string;
  diff: string;
  target: number;
  scores: { left: number; right: number };
  rally: number;
  longest: number;
  speed: number;
  winner: string;
  serveDir: number;
  ball: { x: number; y: number; vx: number; vy: number };
  paddles: { left: number; right: number };
  history: number;
};

const stage = (page: Page) => page.locator('#stage');
const snap = (page: Page) => page.evaluate(() => (window as any).__pongTest() as Snap);
const advance = (page: Page, seconds: number) => page.evaluate((s) => (window as any).__pongTest.advance(s), seconds);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}
/** Ayarları seçer, maçı başlatır, gerçek zamanlı döngüyü durdurup tohumu sabitler. */
async function start(page: Page, o: { mode?: 'cpu' | 'two'; diff?: string; target?: string; manual?: boolean; seed?: number } = {}) {
  if (o.mode) await page.selectOption('#sel-mode', o.mode);
  if (o.diff) await page.selectOption('#sel-diff', o.diff);
  if (o.target) await page.selectOption('#sel-target', o.target);
  // Manuel mod başlatmadan ÖNCE açılır: gerçek zamanlı kareler oyunu ilerletip senaryoyu bozmasın
  await page.evaluate((manual) => (window as any).__pongTest.manual(manual), o.manual ?? true);
  await page.locator('#btn-main').click();
  await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
  await page.evaluate((seed) => (window as any).__pongTest.seed(seed), o.seed ?? 1);
}

/**
 * Sayfa içi "oyuncu": raketleri gerçek klavye olaylarıyla topun y konumuna (+ offset) sürer.
 * Bilgisayara karşıda sol raketi ↑/↓ ile, iki kişide sol raketi W/S, sağ raketi ↑/↓ ile yönetir.
 * stop ifadesi (ör. "s.rally >= 1") doğru olunca durur; offset ifadesi raket merkezinin topa göre kaymasıdır.
 */
async function pilot(page: Page, stop: string, o: { offset?: string; maxSteps?: number } = {}) {
  return page.evaluate(({ stop, offset, maxSteps }) => {
    const T = (window as any).__pongTest;
    const stopFn = new Function('s', `return (${stop});`) as (s: unknown) => boolean;
    const offFn = new Function('s', `return (${offset});`) as (s: unknown) => number;
    const held: Record<string, boolean> = {};
    const key = (k: string, down: boolean) => {
      if (!!held[k] === down) return;
      held[k] = down;
      document.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { key: k, bubbles: true, cancelable: true }));
    };
    const steer = (upKey: string, downKey: string, pad: number, goal: number) => {
      key(upKey, goal - pad < -5);
      key(downKey, goal - pad > 5);
    };
    let result: { done: boolean; s: Snap } | null = null;
    for (let i = 0; i < maxSteps; i++) {
      const s = T();
      if (stopFn(s)) { result = { done: true, s }; break; }
      if (s.state !== 'oynuyor') { result = { done: false, s }; break; }
      const two = s.mode === 'two';
      steer(two ? 'w' : 'ArrowUp', two ? 's' : 'ArrowDown', s.paddles.left, s.ball.vx < 0 ? s.ball.y + offFn(s) : 200);
      if (two) steer('ArrowUp', 'ArrowDown', s.paddles.right, s.ball.vx > 0 ? s.ball.y + offFn(s) : 200);
      T.advance(1 / 60);
    }
    for (const k of Object.keys(held)) key(k, false);
    return result ?? { done: false, s: T() };
  }, { stop, offset: o.offset ?? '0', maxSteps: o.maxSteps ?? 4000 }) as Promise<{ done: boolean; s: Snap }>;
}

async function touch(page: Page, type: string, id: number, side: 'left' | 'right', dy: number) {
  await page.evaluate(({ type, id, side, dy }) => {
    const st = document.getElementById('stage') as HTMLElement;
    const r = st.getBoundingClientRect();
    const x = r.left + r.width * (side === 'left' ? 0.25 : 0.75);
    st.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: 'touch', isPrimary: id === 1, clientX: x, clientY: r.top + r.height * 0.5 + dy, bubbles: true }));
  }, { type, id, side, dy });
}

test.describe('Ping Pong', () => {
  test('sayfa açılır; ≥900 kelime, 3 reklam (oyun kutusunun dışında), SSS ≥7 ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Ping Pong');
    await expect(page).toHaveTitle(/Ping Pong Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);
    await expect(page.locator('.ba-topbar')).toContainText(/%100 ücretsiz/);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-ping-pong-a', 'oyun-ping-pong-b', 'oyun-ping-pong-c']);
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
    expect(ld['@graph'].map((n: { '@type': string }) => n['@type'])).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(7);

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('varsayılanlar: bilgisayara karşı, orta, ilk 7; ayarlar maç sırasında kilitlenir; başlayınca servis sonra top oyuna girer', async ({ page }) => {
    const errors = await open(page);
    await expect(page.locator('#sel-mode')).toHaveValue('cpu');
    await expect(page.locator('#sel-diff')).toHaveValue('orta');
    await expect(page.locator('#sel-target')).toHaveValue('7');
    await expect(page.locator('#overlay-btn')).toBeVisible();
    await start(page);
    await expect(page.locator('#sel-mode')).toBeDisabled();
    await expect(page.locator('#sel-target')).toBeDisabled();
    let s = await snap(page);
    expect(s.phase).toBe('serve');
    expect(s.ball.x).toBe(320);
    await advance(page, 1);
    s = await snap(page);
    expect(s.phase).toBe('rally');
    expect(Math.hypot(s.ball.vx, s.ball.vy)).toBeCloseTo(300, 0);
    expect(s.ball.vx).toBeLessThan(0); // ilk servis sol oyuncuya
    expect(errors).toEqual([]);
  });

  test('bilgisayara karşı: W/S ve ↑/↓ sol raketi hareket ettirir, kenarlarda durur', async ({ page }) => {
    await open(page);
    await start(page);
    expect((await snap(page)).paddles.left).toBe(200);
    await page.keyboard.down('w');
    await advance(page, 0.3);
    const up = (await snap(page)).paddles.left;
    expect(up).toBeCloseTo(200 - 430 * 0.3, 0);
    await page.keyboard.up('w');
    await advance(page, 0.2);
    expect((await snap(page)).paddles.left).toBe(up); // tuş bırakılınca raket durur

    await page.keyboard.down('ArrowDown');
    await advance(page, 2);
    expect((await snap(page)).paddles.left).toBe(364); // alt kenarda durur
    await page.keyboard.up('ArrowDown');
    await page.keyboard.down('ArrowUp');
    await advance(page, 2);
    expect((await snap(page)).paddles.left).toBe(36); // üst kenarda durur
    await page.keyboard.up('ArrowUp');
  });

  test('bilgisayar modunda top sayıya dönüşür: duran oyuncu topu kaçırır, rakip sayı alır ve servis yenilenir', async ({ page }) => {
    const errors = await open(page);
    await start(page, { diff: 'kolay' });
    await advance(page, 6);
    const s = await snap(page);
    expect(s.scores.right).toBeGreaterThanOrEqual(1);
    expect(s.scores.left).toBe(0);
    await expect(page.locator('#score-right')).toHaveText(String(s.scores.right));
    expect(s.serveDir).toBe(-1); // sayıyı kaybeden (sol) oyuncuya servis
    expect(s.rally).toBe(0);
    await expect(page.locator('#label-left')).toHaveText('Sen');
    await expect(page.locator('#label-right')).toHaveText('Rakip');
    expect(errors).toEqual([]);
  });

  test('top açısı temas noktasına göre belirlenir: rakete üst yarıyla değen top aşağı, alt yarıyla değen top yukarı gider', async ({ page }) => {
    await open(page);
    await start(page, { diff: 'kolay' });
    // Raket merkezi topun 25 birim üstünde: top raketin alt yarısına değer → aşağı (y artar)
    const low = await pilot(page, 's.rally >= 1', { offset: '-25' });
    expect(low.done, 'sol raket topu karşıladı').toBe(true);
    expect(low.s.ball.vx).toBeGreaterThan(0);
    expect(low.s.ball.vy).toBeGreaterThan(0.2 * low.s.speed);

    await page.locator('#btn-restart').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.evaluate(() => (window as any).__pongTest.seed(2));
    const high = await pilot(page, 's.rally >= 1', { offset: '25' });
    expect(high.done).toBe(true);
    expect(high.s.ball.vx).toBeGreaterThan(0);
    expect(high.s.ball.vy).toBeLessThan(-0.2 * high.s.speed);
  });

  test('iki kişi: her vuruşta top hızlanır (300 + 24 x vuruş) ve vuruş sayacı artar', async ({ page }) => {
    await open(page);
    await start(page, { mode: 'two' });
    const r = await pilot(page, 's.rally >= 4');
    expect(r.done, '4 vuruşluk seri').toBe(true);
    expect(r.s.rally).toBe(4);
    expect(r.s.speed).toBe(300 + 24 * 4);
    expect(Math.hypot(r.s.ball.vx, r.s.ball.vy)).toBeCloseTo(r.s.speed, 0);
    await expect(page.locator('#hud-rally')).toHaveText('4');

    // Sayı alınınca hız ve sayaç başa döner
    await advance(page, 20);
    const after = await snap(page);
    expect(after.scores.left + after.scores.right).toBeGreaterThanOrEqual(1);
    expect(after.rally).toBe(0);
    expect(after.speed).toBe(300);
  });

  test('bilgisayar rakibi (zor) gelen topu izler: top sağ tarafa yaklaşırken raket topun hizasındadır', async ({ page }) => {
    await open(page);
    await start(page, { diff: 'zor' });
    const r = await pilot(page, 's.rally >= 1');
    expect(r.done).toBe(true);
    const near = await page.evaluate(() => {
      const T = (window as any).__pongTest;
      for (let i = 0; i < 400; i++) {
        const s = T();
        if (s.ball.x > 540 || s.phase !== 'rally') return s;
        T.advance(1 / 60);
      }
      return T();
    });
    expect(near.phase).toBe('rally');
    expect(Math.abs(near.paddles.right - near.ball.y)).toBeLessThan(40);
  });

  test('iki kişi modu: W/S sol raketi, ↑/↓ sağ raketi birbirinden bağımsız hareket ettirir', async ({ page }) => {
    await open(page);
    await start(page, { mode: 'two' });
    await expect(page.locator('#label-left')).toHaveText('Sol');
    await expect(page.locator('#field-diff')).toBeHidden(); // zorluk yalnızca bilgisayar modunda
    await page.keyboard.down('w');
    await advance(page, 0.3);
    let s = await snap(page);
    expect(s.paddles.left).toBeLessThan(80);
    expect(s.paddles.right).toBe(200);
    await page.keyboard.up('w');

    await page.keyboard.down('ArrowDown');
    await advance(page, 0.3);
    s = await snap(page);
    expect(s.paddles.right).toBeGreaterThan(300);
    expect(s.paddles.left).toBeLessThan(80); // ok tuşu sol raketi oynatmaz
    await page.keyboard.up('ArrowDown');

    await page.keyboard.down('ArrowUp');
    await advance(page, 0.3);
    expect((await snap(page)).paddles.left).toBeLessThan(80);
    await page.keyboard.up('ArrowUp');
  });

  for (const target of ['7', '11']) {
    test(`iki kişi: ilk ${target} sayıya ulaşan maçı kazanır; sonuç ekranı, maç geçmişi ve yeniden oyna çalışır`, async ({ page }) => {
      test.setTimeout(60_000);
      const errors = await open(page);
      await start(page, { mode: 'two', target });
      // İki raket de ortada duruyor: servisler sola gelir, sol oyuncu hep kaçırır
      for (let i = 0; i < 40; i++) {
        await advance(page, 10);
        if ((await snap(page)).state === 'bitti') break;
      }
      const s = await snap(page);
      expect(s.state).toBe('bitti');
      expect(s.scores).toEqual({ left: 0, right: Number(target) });
      expect(s.winner).toBe('right');
      await expect(stage(page)).toHaveAttribute('data-state', 'bitti');
      await expect(page.locator('#overlay-title')).toHaveText('Sağ oyuncu kazandı');
      await expect(page.locator('#overlay-text')).toContainText(`0 – ${target}`);

      const saved = await stored(page);
      expect(saved.history).toHaveLength(1);
      expect(saved.history[0]).toMatchObject({ mode: 'two', target: Number(target), left: 0, right: Number(target), winner: 'right' });
      expect(saved.settings).toMatchObject({ mode: 'two', target: Number(target) });
      await expect(page.locator('#history li')).toHaveCount(1);
      await expect(page.locator('#history li').first()).toContainText('Sağ oyuncu kazandı');
      await expect(page.locator('#history-sum')).toContainText('Kayıtlı 1 maç');

      await page.locator('#overlay-btn').click(); // oyun sonu düğmesi kısa süre kilitli, Playwright etkinleşmesini bekler
      await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
      await expect(stage(page)).toHaveAttribute('data-score-l', '0');
      await expect(stage(page)).toHaveAttribute('data-score-r', '0');

      await page.reload(); // ayarlar ve geçmiş kalıcıdır
      await expect(page.locator('#sel-mode')).toHaveValue('two');
      await expect(page.locator('#sel-target')).toHaveValue(target);
      await expect(page.locator('#history li')).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }

  test('bilgisayara karşı maç hedefe kadar sürer; sonuç ekranı kazananla tutarlıdır ve geçmişe bilgisayar/zorluk bilgisiyle yazılır', async ({ page }) => {
    test.setTimeout(90_000);
    await open(page);
    await start(page, { diff: 'kolay', seed: 4 });
    // Oyuncu topu dönüşümlü olarak alt ve üst yarıyla karşılayıp açılı vuruş yapar
    const r = await pilot(page, "s.state === 'bitti'", { offset: '(s.scores.left + s.scores.right + s.rally) % 2 ? 28 : -28', maxSteps: 60 * 900 });
    expect(r.done, 'maç bitti').toBe(true);
    const s = r.s;
    const winnerScore = s.winner === 'left' ? s.scores.left : s.scores.right;
    expect(winnerScore).toBe(7);
    expect(Math.min(s.scores.left, s.scores.right)).toBeLessThan(7);
    await expect(page.locator('#overlay-title')).toHaveText(s.winner === 'left' ? 'Kazandın!' : 'Bilgisayar kazandı');
    const saved = await stored(page);
    expect(saved.history[0]).toMatchObject({ mode: 'cpu', diff: 'kolay', target: 7, winner: s.winner });
    await expect(page.locator('#history li').first()).toContainText('Bilgisayar (kolay)');
    await expect(page.locator('#history li').first()).toContainText(s.winner === 'left' ? 'Kazandın' : 'Kaybettin');
  });

  test('P ve Boşluk duraklatır, oyun donar; aynı tuşlarla devam eder', async ({ page }) => {
    await open(page);
    await start(page);
    await advance(page, 1);
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay')).toContainText('Duraklatıldı');
    const before = await snap(page);
    await advance(page, 2); // duraklatılmışken ilerlemez
    await page.waitForTimeout(300);
    expect(await snap(page)).toEqual(before);

    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await advance(page, 0.2);
    expect((await snap(page)).ball.x).not.toBe(before.ball.x);

    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
  });

  test('fare imleci (bilgisayara karşı) sol raketi izler; gerçek zamanlı döngüde top hareket eder', async ({ page }) => {
    await open(page);
    await start(page, { manual: false });
    const box = (await stage(page).boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.25);
    await expect.poll(async () => (await snap(page)).paddles.left).toBeCloseTo(100, -1);
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.8);
    await expect.poll(async () => (await snap(page)).paddles.left).toBeCloseTo(320, -1);
    await expect.poll(async () => (await snap(page)).phase, { timeout: 4000 }).toBe('rally');
    const x0 = (await snap(page)).ball.x;
    await expect.poll(async () => (await snap(page)).ball.x).not.toBe(x0);
  });

  test('dokunmatik: bilgisayara karşıda sürükleme sol raketi göreceli oynatır; iki kişide ekranın iki yarısı iki raketi aynı anda yönetir', async ({ page }) => {
    await open(page);
    await start(page);
    const box = (await stage(page).boundingBox())!;
    const scale = 400 / box.height;
    const y0 = (await snap(page)).paddles.left;
    await touch(page, 'pointerdown', 1, 'right', 0); // bilgisayar modunda hangi yarıya dokunulduğu önemsiz
    await touch(page, 'pointermove', 1, 'right', -40);
    await touch(page, 'pointerup', 1, 'right', -40);
    expect((await snap(page)).paddles.left).toBeCloseTo(y0 - 40 * scale, 0);

    await page.locator('#btn-main').click(); // Duraklat
    await page.selectOption('#sel-mode', 'two'); // ayar değişince maç baştan, hazır ekranına döner
    await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.evaluate(() => (window as any).__pongTest.manual(true));
    const before = await snap(page);
    await touch(page, 'pointerdown', 1, 'left', 0);
    await touch(page, 'pointerdown', 2, 'right', 0);
    await touch(page, 'pointermove', 1, 'left', -40);
    await touch(page, 'pointermove', 2, 'right', 40);
    const after = await snap(page);
    expect(after.paddles.left).toBeCloseTo(before.paddles.left - 40 * scale, 0);
    expect(after.paddles.right).toBeCloseTo(before.paddles.right + 40 * scale, 0);
    await touch(page, 'pointerup', 1, 'left', -40);
    await touch(page, 'pointerup', 2, 'right', 40);
  });

  test('geçmişi temizle düğmesi kayıtları siler', async ({ page }) => {
    await page.addInitScript((k) => {
      if (!localStorage.getItem(k)) {
        localStorage.setItem(k, JSON.stringify({ history: [{ t: Date.now(), mode: 'cpu', diff: 'zor', target: 11, left: 11, right: 9, winner: 'left', rally: 8 }], settings: { mode: 'cpu', diff: 'zor', target: 11 } }));
      }
    }, STORE_KEY);
    await open(page);
    await expect(page.locator('#sel-diff')).toHaveValue('zor');
    await expect(page.locator('#history li')).toHaveCount(1);
    await expect(page.locator('#history li').first()).toContainText('Bilgisayar (zor) · 11 sayı · 11–9 · Kazandın');
    await page.locator('#btn-clear').click();
    await expect(page.locator('#history li')).toHaveCount(0);
    await expect(page.locator('#btn-clear')).toBeHidden();
    expect((await stored(page)).history).toEqual([]);
  });

  for (const bad of ['{bozuk json', '{"history":"x","settings":5}', '{"history":[null,5,{"t":"a"}],"settings":{"mode":"x","diff":1,"target":99}}']) {
    test(`bozuk localStorage verisi oyunu bozmaz: ${bad.slice(0, 24)}`, async ({ page }) => {
      await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [STORE_KEY, bad]);
      const errors = await open(page);
      await expect(page.locator('#sel-mode')).toHaveValue('cpu');
      await expect(page.locator('#sel-target')).toHaveValue('7');
      await expect(page.locator('#history li')).toHaveCount(0);
      await start(page);
      await advance(page, 1);
      expect(errors).toEqual([]);
    });
  }

  test('360px: yatay taşma yok, oyun alanı ve başlangıç ekranındaki düğme sığar, düğmelerle oyun başlar ve duraklar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = (await stage(page).boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box.height / box.width - 0.625)).toBeLessThan(0.02);
    const btn = (await page.locator('#overlay-btn').boundingBox())!;
    expect(btn.y).toBeGreaterThanOrEqual(box.y);
    expect(btn.y + btn.height).toBeLessThanOrEqual(box.y + box.height + 1); // başlangıç düğmesi oyun alanından taşmaz
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.locator('#btn-main').click(); // Duraklat
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    expect(errors).toEqual([]);
  });

  test.describe('Retina ekran', () => {
    test.use({ deviceScaleFactor: 2 });
    test('canvas, devicePixelRatio kadar yüksek çözünürlükte çizilir', async ({ page }) => {
      await open(page);
      const dims = await page.locator('#board').evaluate((c) => {
        const cv = c as HTMLCanvasElement;
        return { w: cv.width, h: cv.height, cssW: Math.round(cv.getBoundingClientRect().width) };
      });
      expect(dims.w).toBe(dims.cssW * 2);
      expect(dims.h).toBe(Math.round((dims.cssW * 400) / 640) * 2);
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
