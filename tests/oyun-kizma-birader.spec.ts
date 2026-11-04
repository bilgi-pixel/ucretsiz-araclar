import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Kızma Birader: tohumlu zarla kurallar (6 ile çıkış, üç deneme, vurma, hedefe tam giriş, pas, kazanma),
// bilgisayarın yalnız geçerli hamle yapması (bağımsız kural denetimiyle 1000+ tur), geri al, klavye,
// kayıt/devam, bozuk localStorage, içerik/reklam/JSON-LD, 360px, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/kizma-birader/';
const KEY = 'ba-oyun-kizma-birader';
const START = [0, 10, 20, 30];

type Pos = (number[] | null)[];
type Settings = { mode?: string; count?: number; level?: string; mustHit?: boolean; safeStart?: boolean; sixPenalty?: boolean };
type State = {
  pos: Pos; turn: number; phase: string; die: number; tries: number; sixes: number; winner: number; turnNo: number;
  settings: Required<Settings>; active: number[]; undo: number; selected: number; shownDie: number;
  legal: { piece: number; from: number; to: number; hit: { color: number; piece: number } | null; enter: boolean; goal: boolean }[];
};

const box = (page: Page) => page.locator('#oyun');
const state = (page: Page): Promise<State> => page.evaluate(() => (window as any).__kizmaBiraderTest().state());
const force = (page: Page, list: number[]) => page.evaluate((l) => (window as any).__kizmaBiraderTest().forceDice(l), list);

/** Sayfayı açar, gecikmeleri sıfırlar (zar ve bilgisayar anında oynar). */
async function open(page: Page, seed = 7) {
  await page.emulateMedia({ reducedMotion: 'reduce' }); // taşlar kaymadan yerine geçsin (konum ölçümü için)
  await page.goto(`${URL_PATH}?seed=${seed}`);
  await expect(box(page)).toHaveAttribute('data-phase', 'ayar');
  await page.evaluate(() => (window as any).__kizmaBiraderTest().setSpeed(0));
}
/** Konum kurar: pos[renk] = 4 taşın ilerleme değeri (-1 ev, 0-39 yol, 40-43 hedef). */
async function setup(page: Page, o: { settings: Settings; pos: Pos; turn?: number }) {
  await page.evaluate((x) => (window as any).__kizmaBiraderTest().setup(x), o);
  await expect(box(page)).toHaveAttribute('data-phase', 'roll');
}
/** Zar atıp sonucun işlenmesini bekler. */
async function roll(page: Page) {
  const before = (await state(page)).turnNo;
  await page.locator('#zar-at').click();
  await expect(box(page)).toHaveAttribute('data-busy', '0');
  return before;
}

/* ---------- Bağımsız kural denetimi (motordan ayrı yazıldı) ---------- */
type Snap = { pos: Pos; turn: number; die: number; settings: Required<Settings>; active: number[] };
function independentLegal(s: Snap) {
  const c = s.turn;
  const d = s.die;
  const mine = s.pos[c]!;
  const occupant = (abs: number) => {
    for (const oc of s.active) {
      for (let k = 0; k < 4; k++) {
        const p = s.pos[oc]![k];
        if (p >= 0 && p <= 39 && (START[oc] + p) % 40 === abs) return { oc, k };
      }
    }
    return null;
  };
  const res: { piece: number; to: number; hit: boolean }[] = [];
  for (let i = 0; i < 4; i++) {
    const p = mine[i];
    const to = p === -1 ? (d === 6 ? 0 : -99) : p + d;
    if (to === -99 || to > 43) continue;
    if (to <= 39) {
      const abs = (START[c] + to) % 40;
      const o = occupant(abs);
      if (o && o.oc === c) continue;
      if (o && s.settings.safeStart && abs === START[o.oc]) continue;
      res.push({ piece: i, to, hit: !!o });
    } else {
      let ok = true;
      for (let q = Math.max(p + 1, 40); q <= to; q++) if (mine.some((x, k) => k !== i && x === q)) ok = false;
      if (ok) res.push({ piece: i, to, hit: false });
    }
  }
  return s.settings.mustHit && res.some((r) => r.hit) ? res.filter((r) => r.hit) : res;
}

test.describe('Oyun: Kızma Birader', () => {
  test('sayfa açılır, tahta 40+16+16 kare; 6 olmadan taş çıkmaz, üç deneme sonra sıra geçer; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page, 1);
    await expect(page.locator('h1')).toContainText('Kızma Birader Oyna');
    await expect(page.locator('#tahta [data-sq^="t"]')).toHaveCount(40);
    await expect(page.locator('#tahta [data-sq^="g"]')).toHaveCount(16);
    await expect(page.locator('#tahta [data-sq^="y"]')).toHaveCount(16);
    await page.locator('#ayar-mod').selectOption('bot');
    await page.locator('#ayar-sayi').selectOption('2');
    await force(page, [3, 5, 2, 1, 4, 5]);
    await page.locator('#baslat').click();
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    let s = await state(page);
    expect(s.active).toEqual([0, 2]);
    expect(s.turn).toBe(0);
    expect(s.tries).toBe(3);
    await expect(page.locator('#deneme')).toContainText('kalan deneme: 3');
    await expect(page.locator('#tahta .kb-pc')).toHaveCount(8);

    await roll(page);
    s = await state(page);
    expect(s.pos[0]).toEqual([-1, -1, -1, -1]);
    expect(s.tries).toBe(2);
    expect(s.turn).toBe(0);
    await expect(page.locator('#zar')).toHaveAttribute('data-value', '3');
    await expect(page.locator('#mesaj')).toContainText('6 gerekir');
    await roll(page);
    expect((await state(page)).tries).toBe(1);
    await roll(page);
    // Kırmızı üç denemede 6 bulamadı → Yeşil (bilgisayar) da üç kez 6'sız attı → sıra yine kırmızıda
    await expect.poll(async () => { const x = await state(page); return `${x.turn}-${x.phase}-${x.turnNo}`; }).toBe('0-roll-3');
    s = await state(page);
    expect(s.pos[0]).toEqual([-1, -1, -1, -1]);
    expect(s.pos[2]).toEqual([-1, -1, -1, -1]);
    await expect(page.locator('#mesaj')).toContainText("Sıra Kırmızı'ya geçti");
    // Motor: evdeki taş 1-5 ile hiç çıkamaz
    const none = await page.evaluate(() => {
      const t = (window as any).__kizmaBiraderTest();
      const g = t.engine.createGame({ count: 4 });
      return [1, 2, 3, 4, 5].map((d) => t.engine.legalMoves(g, 0, d).length);
    });
    expect(none).toEqual([0, 0, 0, 0, 0]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('6 ile çıkan taş başlangıç karesine gelir ve tekrar atış hakkı doğar (klavye: Boşluk, 1-4, Enter)', async ({ page }) => {
    await open(page);
    await page.locator('#ayar-mod').selectOption('yerel');
    await expect(page.locator('#alan-zorluk')).toBeHidden();
    await force(page, [6, 4]);
    await page.locator('#baslat').click();
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    await page.keyboard.press('Space');
    await expect(box(page)).toHaveAttribute('data-phase', 'move');
    let s = await state(page);
    expect(s.die).toBe(6);
    expect(s.legal.map((m) => m.piece)).toEqual([0, 1, 2, 3]);
    expect(s.legal.every((m) => m.enter && m.to === 0)).toBe(true);
    await page.keyboard.press('2');
    await expect(page.locator('#taslar .kb-pbtn').nth(1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    s = await state(page);
    expect(s.pos[0]).toEqual([-1, 0, -1, -1]);
    expect(s.turn).toBe(0); // 6 attığı için sıra yine kırmızıda
    await expect(page.locator('#mesaj')).toContainText('yeniden atış');
    // Taş, kırmızının başlangıç karesinde (yolun 0. karesi) çizilir
    const piece = page.locator('#tahta .kb-pc[data-color="0"][data-piece="1"]');
    await expect(piece).toHaveAttribute('data-pos', '0');
    const sq = await page.locator('#tahta [data-sq="t0"]').boundingBox();
    const pc = await piece.locator('.kb-body').boundingBox();
    expect(Math.abs(sq!.x + sq!.width / 2 - (pc!.x + pc!.width / 2))).toBeLessThan(3);
    expect(Math.abs(sq!.y + sq!.height / 2 - (pc!.y + pc!.height / 2))).toBeLessThan(3);
    // Yeniden atış: 4 → tek hamle, Enter ile oynanır, sıra maviye geçer
    await page.keyboard.press('Space');
    await expect(box(page)).toHaveAttribute('data-phase', 'move');
    expect((await state(page)).legal).toHaveLength(1);
    await page.keyboard.press('Enter');
    await expect.poll(async () => (await state(page)).turn).toBe(1);
    expect((await state(page)).pos[0]).toEqual([-1, 4, -1, -1]);
  });

  test('rakibin üstüne gelince rakip taş eve döner; kendi taşının üstüne gelinmez; zorunlu vuruş ve güvenli başlangıç', async ({ page }) => {
    await open(page);
    // Kırmızı 5'te (mutlak 5) ve 20'de; mavi mutlak 8'de (mavi için ilerleme 38)
    await setup(page, { settings: { mode: 'yerel', count: 4 }, pos: [[5, 20, -1, -1], [38, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], turn: 0 });
    await force(page, [3]);
    await roll(page);
    let s = await state(page);
    expect(s.legal.map((m) => [m.piece, m.to, !!m.hit])).toEqual([[0, 8, true], [1, 23, false]]);
    await expect(page.locator('#tahta .kb-pc[data-color="1"][data-piece="0"]')).toHaveClass(/is-target/);
    await page.locator('#tahta .kb-pc[data-color="0"][data-piece="0"]').click();
    s = await state(page);
    expect(s.pos[0]).toEqual([8, 20, -1, -1]);
    expect(s.pos[1]).toEqual([-1, -1, -1, -1]);
    await expect(page.locator('#mesaj')).toContainText("Mavi'nin 1. taşı eve döndü");
    await expect(page.locator('#tahta .kb-pc[data-color="1"][data-piece="0"]')).toHaveAttribute('data-pos', '-1');

    // Zorunlu vuruş açık: yalnızca vuruş hamlesi oynanabilir
    await setup(page, { settings: { mode: 'yerel', count: 4, mustHit: true }, pos: [[5, 20, -1, -1], [38, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], turn: 0 });
    await force(page, [3]);
    await roll(page);
    s = await state(page);
    expect(s.legal.map((m) => m.piece)).toEqual([0]);
    await expect(page.locator('#taslar .kb-pbtn').nth(1)).toBeDisabled();

    // Kendi taşının üstüne gelinemez: 5 → 8'de kendi taşı var
    await setup(page, { settings: { mode: 'yerel', count: 2 }, pos: [[5, 8, -1, -1], null, [-1, -1, -1, -1], null], turn: 0 });
    await force(page, [3]);
    await roll(page);
    expect((await state(page)).legal.map((m) => m.piece)).toEqual([1]);

    // Güvenli başlangıç: mavinin kendi başlangıç karesindeki (mutlak 10) taşı vurulamaz
    const res = await page.evaluate(() => {
      const E = (window as any).__kizmaBiraderTest().engine;
      const out: number[] = [];
      for (const safeStart of [false, true]) {
        const g = E.restoreGame({ v: 1, settings: { count: 4, safeStart }, pos: [[7, -1, -1, -1], [0, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], turn: 0 });
        out.push(E.legalMoves(g, 0, 3).length);
      }
      return out;
    });
    expect(res).toEqual([1, 0]);
  });

  test('hedefe fazla gelen zar hamle sayılmaz, hedef içinde taş atlanamaz; hamle yoksa sıra geçer; 4 taşını sokan kazanır', async ({ page }) => {
    await open(page);
    // Kırmızı: 39'da (yolun son karesi) bir taş, hedefte 42 ve 43; bir taş evde
    await setup(page, { settings: { mode: 'yerel', count: 2 }, pos: [[39, 43, 42, -1], null, [-1, -1, -1, -1], null], turn: 0 });
    const legalByDie = await page.evaluate(() => {
      const t = (window as any).__kizmaBiraderTest();
      const g = t.state();
      return [1, 2, 3, 4, 5].map((d) => t.engine.legalMoves(g, 0, d).map((m: { piece: number; to: number }) => `${m.piece}>${m.to}`).join(','));
    });
    // 1 → 40, 2 → 41; 3 → 42 dolu; 4 → 43'e giderken 42'deki taşı atlaması gerekir; 5 → 44 (hedef dışı)
    expect(legalByDie).toEqual(['0>40', '0>41', '', '', '']);
    await force(page, [5]);
    await roll(page);
    let s = await state(page);
    expect(s.pos[0]).toEqual([39, 43, 42, -1]);
    expect(s.turn).toBe(2);
    await expect(page.locator('#mesaj')).toContainText('oynanabilecek hamle yok');
    await expect(page.locator('#mesaj')).toContainText("Sıra Yeşil'e geçti");

    // Kazanma: bilgisayara karşı; 38 + 2 = 40 ile dördüncü taş da hedefe girer
    await page.evaluate((k) => localStorage.removeItem(k), KEY);
    await setup(page, { settings: { mode: 'bot', count: 2 }, pos: [[43, 42, 41, 38], null, [-1, -1, -1, -1], null], turn: 0 });
    await force(page, [2]);
    await roll(page);
    s = await state(page);
    expect(s.legal).toEqual([{ piece: 3, from: 38, to: 40, hit: null, enter: false, goal: true }]);
    await page.locator('#taslar .kb-pbtn').nth(3).click();
    await expect(box(page)).toHaveAttribute('data-phase', 'over');
    const result = page.locator('#sonuc');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-active/);
    await expect(page.locator('#sonuc-baslik')).toContainText('kazandınız');
    s = await state(page);
    expect(s.winner).toBe(0);
    await expect(page.locator('#zar-at')).toBeDisabled();
    await expect(page.locator('#geri-al')).toBeDisabled();
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);
    expect(saved.stats).toMatchObject({ games: 1, wins: 1 });
    expect(saved.save).toBeNull();
    // Yeni oyun aynı ayarlarla başlar, sonuç kutusu kapanır
    await page.locator('#tekrar').click();
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    await expect(result).toBeHidden();
  });

  test('bilgisayar yalnız geçerli hamle yapar: 3 seviye x 1000 tur, bağımsız kural denetimi', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(() => {
      const E = (window as any).__kizmaBiraderTest().engine;
      const trace: unknown[] = [];
      const turns: Record<string, number> = {};
      const finished: Record<string, number> = {};
      for (const level of ['kolay', 'orta', 'zor']) {
        let t = 0;
        let gi = 0;
        finished[level] = 0;
        while (t < 1000) {
          gi += 1;
          const rng = E.mulberry32(1000 * gi + level.length);
          const g = E.createGame({ mode: 'bot', count: 2 + (gi % 3), level, mustHit: gi % 2 === 0, safeStart: gi % 3 === 0, sixPenalty: gi % 4 === 0 });
          while (g.phase !== 'over' && t < 1000) {
            const before = g.turnNo;
            if (g.phase === 'roll') {
              E.applyRoll(g, 1 + Math.floor(rng() * 6));
            } else {
              const snap = JSON.parse(JSON.stringify({ pos: g.pos, turn: g.turn, die: g.die, settings: g.settings, active: g.active }));
              const m = E.chooseBotMove(g, E.legalMoves(g, g.turn, g.die), level, rng);
              trace.push({ ...snap, level, piece: m.piece, to: m.to });
              E.applyChoice(g, m);
            }
            if (g.turnNo !== before) t += 1;
          }
          if (g.phase === 'over') finished[level] += 1;
        }
        turns[level] = t;
      }
      return { trace, turns, finished };
    });
    expect(out.turns).toEqual({ kolay: 1000, orta: 1000, zor: 1000 });
    const trace = out.trace as (Snap & { level: string; piece: number; to: number })[];
    expect(trace.length).toBeGreaterThan(1500);
    // Hatalar toplanır, sonda tek seferde doğrulanır (binlerce expect çağrısı testi yavaşlatıyordu)
    const problems: string[] = [];
    let hits = 0;
    let enters = 0;
    for (const s of trace) {
      const legal = independentLegal(s);
      const chosen = legal.find((m) => m.piece === s.piece && m.to === s.to);
      if (!chosen) { problems.push(`geçersiz hamle: ${JSON.stringify(s)}`); continue; }
      if (chosen.hit) hits += 1;
      if (s.pos[s.turn]![s.piece] === -1) enters += 1;
      // Orta seviye vurabiliyorsa vurur (öncelik 1)
      if (s.level === 'orta' && legal.some((m) => m.hit) && !chosen.hit) problems.push(`orta vuruşu kaçırdı: ${JSON.stringify(s)}`);
      // Aynı yol karesinde iki taş yok
      const seen = new Set<number>();
      for (const c of s.active) {
        for (const p of s.pos[c]!) {
          if (p < 0 || p > 39) continue;
          const a = (START[c] + p) % 40;
          if (seen.has(a)) problems.push(`aynı karede iki taş: ${JSON.stringify(s)}`);
          seen.add(a);
        }
      }
    }
    expect(problems.slice(0, 3)).toEqual([]);
    expect(hits).toBeGreaterThan(20);
    expect(enters).toBeGreaterThan(50);
  });

  test('bilgisayara karşı akış ve son hamleyi geri al; aynı cihazda geri al gizli; ok tuşlarıyla taş gezinme', async ({ page }) => {
    await open(page, 5);
    await page.locator('#ayar-mod').selectOption('bot');
    await page.locator('#ayar-sayi').selectOption('2');
    await page.locator('#ayar-zorluk').selectOption('orta');
    await force(page, [6, 4, 6, 2]);
    await page.locator('#baslat').click();
    await expect(page.locator('#geri-al')).toBeVisible();
    await expect(page.locator('#geri-al')).toBeDisabled();
    await roll(page);
    await page.locator('#taslar .kb-pbtn').first().click();
    await roll(page);
    await page.locator('#taslar .kb-pbtn').first().click();
    // Yeşil (bilgisayar): 6 ile çıkar, 2 ilerler; sıra kırmızıya döner
    await expect.poll(async () => { const x = await state(page); return `${x.turn}-${x.phase}`; }).toBe('0-roll');
    let s = await state(page);
    expect(s.pos[0]).toEqual([4, -1, -1, -1]);
    expect(s.pos[2]!.filter((p) => p === 2)).toHaveLength(1);
    expect(s.undo).toBe(2);
    await expect(page.locator('#geri-al')).toBeEnabled();
    await page.locator('#geri-al').click();
    s = await state(page);
    expect(s.turn).toBe(0);
    expect(s.phase).toBe('move');
    expect(s.die).toBe(4); // zar yeniden atılmaz
    expect(s.pos[0]).toEqual([0, -1, -1, -1]);
    expect(s.pos[2]).toEqual([-1, -1, -1, -1]);
    await expect(page.locator('#mesaj')).toContainText('geri alındı');
    await page.locator('#geri-al').click();
    s = await state(page);
    expect(s.die).toBe(6);
    expect(s.pos[0]).toEqual([-1, -1, -1, -1]);
    await expect(page.locator('#geri-al')).toBeDisabled();

    // Aynı cihazda: geri al yok; ok tuşları oynayabilen taşlar arasında gezinir
    await setup(page, { settings: { mode: 'yerel', count: 2 }, pos: [[5, 12, -1, -1], null, [-1, -1, -1, -1], null], turn: 0 });
    await expect(page.locator('#geri-al')).toBeHidden();
    await force(page, [3]);
    await page.locator('#zar-at').focus();
    await page.keyboard.press('Enter');
    await expect(box(page)).toHaveAttribute('data-phase', 'move');
    expect((await state(page)).selected).toBe(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#taslar .kb-pbtn').nth(1)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#taslar .kb-pbtn').nth(0)).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    expect((await state(page)).selected).toBe(1);
    await page.keyboard.press('3'); // evdeki taş 3 ile oynayamaz → uyarı, seçim değişmez
    await expect(page.locator('#mesaj')).toContainText('oynayamaz');
    await page.keyboard.press('Enter');
    await expect.poll(async () => (await state(page)).pos[0]).toEqual([5, 15, -1, -1]);
  });

  test('geri al ve sayfayı yenileme sonraki zarı değiştirmez (zar dizisi geri sarılır, kayıtta saklanır)', async ({ page }) => {
    await open(page, 11);
    // Kırmızı 10'da, diğerleri evde; ilk zar 6 (sıraya konur), sonraki zar tohumlu üreteçten gelir
    await setup(page, { settings: { mode: 'bot', count: 2, level: 'orta' }, pos: [[10, -1, -1, -1], null, [-1, -1, -1, -1], null], turn: 0 });
    await force(page, [6]);
    await roll(page);
    await page.locator('#taslar .kb-pbtn').nth(1).click(); // yeni taş çıkar, 6 → yeniden atış
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    await roll(page);
    let s = await state(page);
    expect([s.turn, s.phase]).toEqual([0, 'move']);
    const d2 = s.die;
    // Geri al → bu kez başka taş → yeniden at: aynı zar gelir
    await page.locator('#geri-al').click();
    s = await state(page);
    expect([s.phase, s.die]).toEqual(['move', 6]);
    await page.locator('#taslar .kb-pbtn').nth(0).click(); // 10 → 16
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    await roll(page);
    expect((await state(page)).die).toBe(d2);
    // Geri al, sayfayı başka tohumla aç (777'nin ilk kırmızı zarı farklıdır), kayıttan devam et: zar yine aynı
    await page.locator('#geri-al').click();
    await page.goto(`${URL_PATH}?seed=777`);
    await expect(box(page)).toHaveAttribute('data-phase', 'ayar');
    await page.evaluate(() => (window as any).__kizmaBiraderTest().setSpeed(0));
    await page.locator('#devam').click();
    s = await state(page);
    expect([s.turn, s.phase, s.die]).toEqual([0, 'move', 6]);
    await page.locator('#taslar .kb-pbtn').nth(1).click();
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    await roll(page);
    expect((await state(page)).die).toBe(d2);
  });

  test('oyun kaydedilir ve devam edilir; bozuk localStorage çökertmez', async ({ page, context }) => {
    await open(page);
    await page.locator('#ayar-mod').selectOption('yerel');
    await page.locator('#ayar-sayi').selectOption('3');
    await page.locator('#ayar-vurus').check();
    await force(page, [6]);
    await page.locator('#baslat').click();
    await roll(page);
    await page.locator('#taslar .kb-pbtn').nth(2).click();
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    await page.reload();
    await expect(box(page)).toHaveAttribute('data-phase', 'ayar');
    await expect(page.locator('#devam')).toBeVisible();
    await expect(page.locator('#devam-bilgi')).toContainText('3 oyuncu');
    await expect(page.locator('#ayar-vurus')).toBeChecked();
    await page.locator('#devam').click();
    const s = await state(page);
    expect(s.pos[0]).toEqual([-1, -1, 0, -1]);
    expect(s.settings).toMatchObject({ mode: 'yerel', count: 3, mustHit: true });
    expect(s.turn).toBe(0);
    expect(s.phase).toBe('roll');

    const bads = [
      '{bozuk', '"x"', '[1]', 'null', '42',
      '{"v":1,"stats":{"games":"a","wins":-5},"settings":{"count":99,"mode":"zz","level":7},"save":{"v":1,"pos":"x"}}',
      // aynı karede iki kırmızı taş → geçersiz kayıt
      '{"v":1,"save":{"v":1,"settings":{"count":2},"pos":[[0,0,-1,-1],null,[-1,-1,-1,-1],null],"turn":0}}',
      // menzil dışı değer ve bitmiş oyun
      '{"v":1,"save":{"v":1,"settings":{"count":2},"pos":[[99,-1,-1,-1],null,[-1,-1,-1,-1],null]}}',
      '{"v":1,"save":{"v":1,"settings":{"count":2},"pos":[[40,41,42,43],null,[-1,-1,-1,-1],null]}}',
    ];
    for (const bad of bads) {
      const p = await context.newPage();
      const errors: string[] = [];
      p.on('pageerror', (e) => errors.push(String(e)));
      await p.addInitScript(([k, v]) => { if (!sessionStorage.getItem('kb-once')) { localStorage.setItem(k, v); sessionStorage.setItem('kb-once', '1'); } }, [KEY, bad]);
      await p.goto(URL_PATH);
      await expect(p.locator('#oyun')).toHaveAttribute('data-phase', 'ayar');
      await expect(p.locator('#devam')).toBeHidden();
      await p.evaluate(() => (window as any).__kizmaBiraderTest().setSpeed(0));
      await p.locator('#baslat').click();
      await p.locator('#zar-at').click();
      await expect(p.locator('#zar')).not.toHaveAttribute('data-value', '0');
      expect(errors, bad).toEqual([]);
      await p.close();
    }
  });

  test('zar animasyonu hareket azaltmada kısalır; gerçek gecikmelerle bilgisayar kendi oynar', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=3`);
    expect((await page.evaluate(() => (window as any).__kizmaBiraderTest().delays())).roll).toBeGreaterThanOrEqual(400);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect((await page.evaluate(() => (window as any).__kizmaBiraderTest().delays())).roll).toBeLessThanOrEqual(100);
    await page.locator('#ayar-mod').selectOption('bot');
    await page.locator('#ayar-sayi').selectOption('2');
    await force(page, [1, 1, 1, 6, 3, 2]);
    await page.locator('#baslat').click();
    for (let i = 0; i < 3; i++) {
      await expect(page.locator('#zar-at')).toBeEnabled();
      await page.locator('#zar-at').click();
      await expect(page.locator('#zar')).toHaveAttribute('data-value', '1');
    }
    // Yeşil 6 atar, çıkar, 3 ilerler; sonra sıra kırmızıya döner
    await expect.poll(async () => { const x = await state(page); return `${x.turn}-${x.phase}-${x.turnNo}`; }, { timeout: 15_000 }).toBe('0-roll-3');
    expect((await state(page)).pos[2]!.filter((p) => p === 3)).toHaveLength(1);
    await expect(page.locator('#zar-at')).toBeEnabled();
  });

  test('içerik: 900+ kelime, 7+ SSS, 3 reklam (A kutunun dışında ve altında), VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await page.goto(URL_PATH);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-kizma-birader-a', 'oyun-kizma-birader-b', 'oyun-kizma-birader-c']);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const aAfterBox = await page.evaluate(() => {
      const b = document.getElementById('oyun')!;
      const a = document.querySelector('[data-slot="oyun-kizma-birader-a"]')!;
      return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) && a.getBoundingClientRect().top >= b.getBoundingClientRect().bottom;
    });
    expect(aAfterBox).toBe(true);
    const faq = await page.locator('.ba-faq details').count();
    expect(faq).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faq);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/kizma-birader/');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/ludo king/i);
    expect(text).toMatch(/bahis/);
  });

  test('360px: yatay taşma yok, tahta kare kalır ve ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const over0 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over0).toBeLessThanOrEqual(0);
    await page.locator('#baslat').click();
    await expect(box(page)).toHaveAttribute('data-phase', 'roll');
    const b = (await page.locator('#tahta').boundingBox())!;
    expect(Math.abs(b.width - b.height)).toBeLessThanOrEqual(1);
    expect(b.width).toBeGreaterThan(250);
    expect(b.x).toBeGreaterThanOrEqual(0);
    expect(b.x + b.width).toBeLessThanOrEqual(360);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    for (const sel of ['#zar-at', '#taslar .kb-pbtn >> nth=0', '#ayarlar']) {
      const r = (await page.locator(sel).boundingBox())!;
      expect(r.x + r.width, sel).toBeLessThanOrEqual(360);
      expect(r.height, sel).toBeGreaterThanOrEqual(44);
    }
  });
});
