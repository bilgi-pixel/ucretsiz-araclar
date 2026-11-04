import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Okey: motor (engine.js doğrudan: gösterge/okey, per, bitme, dağıtım, bilgisayar), arayüz (çekme, atma, sürükleme,
// seri/çift diz, klavye, tur sonu), bozuk localStorage, içerik, reklam, JSON-LD, 360px, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/okey/';

/** Motoru sayfa bağlamında çalıştırır; fn gövdesinde E (engine) ve t(renk, sayı, kopya) kullanılabilir. */
async function withEngine<T>(page: Page, fn: string): Promise<T> {
  await page.goto(`${URL_PATH}?seed=1&hiz=1`);
  return page.evaluate(`(async () => { const E = await import('/oyunlar/okey/engine.js'); const t = (c, n, k = 0) => E.tileId(c, n, k); ${fn} })()`) as Promise<T>;
}

const gameState = (page: Page) => page.evaluate(() => (window as any).__okeyTest.state());

async function playRound(page: Page) {
  for (let i = 0; i < 700; i++) {
    if (await page.locator('#ok-result').isVisible()) return;
    const box = page.locator('#ok-box');
    const turn = await box.getAttribute('data-turn');
    const phase = await box.getAttribute('data-phase');
    if (turn === 'me' && phase === 'draw') {
      await page.locator('#ok-pile').click({ timeout: 2000 }).catch(() => {});
    } else if (turn === 'me' && phase === 'discard') {
      await page.locator('#ok-rack .ok-tile').first().click({ timeout: 2000 }).catch(() => {});
      await page.locator('#ok-discard-btn').click({ timeout: 2000 }).catch(() => {});
    } else {
      await page.waitForTimeout(15);
    }
  }
}

test.describe('Oyun: okey', () => {
  test('sayfa açılır, içerik ≥900 kelime, 3 reklam, JSON-LD, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${URL_PATH}?seed=3&hiz=1`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(15); // başlayan oyuncu 15 taşla açar
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(text).toMatch(/bahis/i);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('reklam alanları oyun kutusunun dışında: A altında, B ortada, C sonda', async ({ page }) => {
    await page.goto(URL_PATH);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-okey-a', 'oyun-okey-b', 'oyun-okey-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const after = await page.evaluate(() => !!(document.querySelector('.game-box')!.compareDocumentPosition(document.querySelector('[data-slot="oyun-okey-a"]')!) & Node.DOCUMENT_POSITION_FOLLOWING));
    expect(after).toBe(true);
  });

  test('motor: gösterge ve okey belirleme, sahte okey, 106 taş ve dağıtım (15/14/14/14, ortada 48)', async ({ page }) => {
    const r = await withEngine<Record<string, any>>(page, `
      const out = {};
      out.o1 = E.okeyFromIndicator(t(1, 8));
      out.o13 = E.okeyFromIndicator(t(2, 13));
      out.o1b = E.okeyFromIndicator(t(0, 1));
      try { E.okeyFromIndicator(104); out.fakeThrow = false; } catch { out.fakeThrow = true; }
      const okey = { color: 0, num: 5 };
      out.jokerReal = [E.isJoker(t(0, 5), okey), E.isJoker(t(0, 5, 1), okey), E.isJoker(t(0, 6), okey), E.isJoker(104, okey)];
      out.fakeFace = E.faceOf(104, okey);
      out.jokerFace = E.faceOf(t(0, 5), okey).joker;
      out.total = E.makeTiles().length;
      out.fakes = E.makeTiles().filter(E.isFake).length;
      out.perNumColor = E.makeTiles().filter((x) => !E.isFake(x) && E.colorOf(x) === 2 && E.numOf(x) === 7).length;
      const st = E.newRound({ rng: E.mulberry32(11), starter: 2 });
      out.sizes = st.hands.map((h) => h.length);
      out.pile = st.pile.length;
      const all = new Set([...st.hands.flat(), ...st.pile, st.indicator]);
      out.unique = all.size;
      out.indicatorReal = !E.isFake(st.indicator);
      const ok = E.okeyFromIndicator(st.indicator);
      out.okeyMatches = ok.color === st.okey.color && ok.num === st.okey.num;
      out.phase = st.phase; out.turn = st.turn;
      return out;
    `);
    expect(r.o1).toEqual({ color: 1, num: 9 });
    expect(r.o13).toEqual({ color: 2, num: 1 });
    expect(r.o1b).toEqual({ color: 0, num: 2 });
    expect(r.fakeThrow).toBe(true);
    expect(r.jokerReal).toEqual([true, true, false, false]);
    expect(r.fakeFace).toEqual({ c: 0, n: 5, joker: false });
    expect(r.jokerFace).toBe(true);
    expect(r.total).toBe(106);
    expect(r.fakes).toBe(2);
    expect(r.perNumColor).toBe(2);
    expect(r.sizes).toEqual([14, 14, 15, 14]);
    expect(r.pile).toBe(48);
    expect(r.unique).toBe(106);
    expect(r.indicatorReal).toBe(true);
    expect(r.okeyMatches).toBe(true);
    expect(r.phase).toBe('discard');
    expect(r.turn).toBe(2);
  });

  test('motor: per doğrulama (seri, grup, joker, 12-13-1, hatalı perler)', async ({ page }) => {
    const r = await withEngine<Record<string, any>>(page, `
      const okey = { color: 0, num: 5 }; // sarı 5 okey
      const g = (...ids) => E.groupType(ids, okey);
      return {
        run: g(t(1, 3), t(1, 4), t(1, 5)),
        longRun: g(t(2, 9), t(2, 10), t(2, 11), t(2, 12), t(2, 13)),
        set3: g(t(1, 7), t(2, 7), t(3, 7)),
        set4: g(t(0, 9), t(1, 9), t(2, 9), t(3, 9)),
        jokerRun: g(t(1, 3), t(0, 5), t(1, 5)),
        jokerRunEnd: g(t(1, 3), t(1, 4), t(0, 5)),
        jokerSet: g(t(1, 7), t(0, 5, 1), t(3, 7)),
        fakeRun: g(t(0, 4), 104, t(0, 6)),
        fakeNoJoker: g(t(0, 4), 104, t(0, 7)),
        wrap1: g(t(1, 12), t(1, 13), t(1, 1)),
        wrap2: g(t(1, 13), t(1, 1), t(1, 2)),
        twoColors: g(t(1, 3), t(1, 4), t(2, 5)),
        dupColorSet: g(t(1, 7), t(1, 7, 1), t(2, 7)),
        dupRun: g(t(1, 3), t(1, 3, 1), t(1, 4)),
        short: g(t(1, 3), t(1, 4)),
        set5: g(t(0, 9), t(1, 9), t(2, 9), t(3, 9), t(1, 9, 1)),
      };
    `);
    expect(r.run).toBe('run');
    expect(r.longRun).toBe('run');
    expect(r.set3).toBe('set');
    expect(r.set4).toBe('set');
    expect(r.jokerRun).toBe('run');
    expect(r.jokerRunEnd).toBe('run');
    expect(r.jokerSet).toBe('set');
    expect(r.fakeRun).toBe('run');
    expect(r.fakeNoJoker).toBeNull();
    expect(r.wrap1).toBe('run');
    expect(r.wrap2).toBeNull();
    expect(r.twoColors).toBeNull();
    expect(r.dupColorSet).toBeNull();
    expect(r.dupRun).toBeNull();
    expect(r.short).toBeNull();
    expect(r.set5).toBeNull();
  });

  test('motor: bitme tespiti (normal, çifte, okey atarak, geçersiz) ve puanlama', async ({ page }) => {
    const r = await withEngine<Record<string, any>>(page, `
      const okey = { color: 0, num: 5 };
      const A = [t(1, 1), t(1, 2), t(1, 3), t(2, 4), t(2, 5), t(2, 6), t(2, 7), t(3, 9), t(1, 9), t(2, 9), t(3, 12), t(1, 12), t(2, 12), t(0, 12)];
      const P = [t(1, 3), t(1, 3, 1), t(2, 4), t(2, 4, 1), t(3, 6), t(3, 6, 1), t(1, 8), t(1, 8, 1), t(2, 11), t(2, 11, 1), t(3, 13), t(3, 13, 1), t(0, 2), t(0, 2, 1)];
      const out = {};
      out.normal = E.finishKind(A, okey);
      out.cifte = E.finishKind(P, okey);
      out.bad = E.finishKind(A.slice(0, 13).concat([t(3, 3)]), okey);
      out.pairsBad = E.isPairs(P.slice(0, 13).concat([t(3, 1)]), okey);
      // joker ile tek kalan taşı çifte tamamlama
      out.pairJoker = E.isPairs(P.slice(0, 13).concat([t(0, 5)]), okey);
      out.wrongSize = E.finishKind(A.slice(0, 13), okey);

      const play = (hand, extra, seed = 3) => {
        const st = E.newRound({ rng: E.mulberry32(seed), starter: 0 });
        st.okey = okey; st.hands[0] = hand.concat([extra]);
        st.phase = 'discard'; st.turn = 0;
        const res = E.finish(st, 0, extra);
        return { res, phase: st.phase, left: st.hands[0].length };
      };
      out.f1 = play(A, t(3, 1));
      out.f2 = play(A, t(0, 5));        // okey atarak
      out.f3 = play(P, t(3, 2));        // çifte
      out.f4 = play(P, t(0, 5, 1));     // çifte + okey atarak
      out.f5 = play(A, t(3, 3));        // geçersiz (bitmiyor): t(3,3) A'da yok ama A zaten 14 geçerli, bu da geçerli → 15. taş
      // geçersiz: elden bir per taşını atarak bitirmeye çalış
      const st = E.newRound({ rng: E.mulberry32(3), starter: 0 });
      st.okey = okey; st.hands[0] = A.concat([t(3, 1)]); st.phase = 'discard'; st.turn = 0;
      out.badFinish = E.finish(st, 0, A[0]);
      out.stateAfterBad = { phase: st.phase, n: st.hands[0].length, disc: st.discards[0].length };
      out.found = E.findFinishingTile(A.concat([t(3, 1)]), okey);
      out.mult = [E.roundMultiplier('normal', false), E.roundMultiplier('cifte', false), E.roundMultiplier('normal', true), E.roundMultiplier('cifte', true)];
      return out;
    `);
    expect(r.normal).toBe('normal');
    expect(r.cifte).toBe('cifte');
    expect(r.bad).toBeNull();
    expect(r.pairsBad).toBe(false);
    expect(r.pairJoker).toBe(true);
    expect(r.wrongSize).toBeNull();
    expect(r.f1.res).toMatchObject({ winner: 0, kind: 'normal', okeyFinish: false, mult: 1, deltas: [2, -1, -1, -1] });
    expect(r.f1.phase).toBe('over');
    expect(r.f1.left).toBe(14);
    expect(r.f2.res).toMatchObject({ kind: 'normal', okeyFinish: true, mult: 2, deltas: [4, -2, -2, -2] });
    expect(r.f3.res).toMatchObject({ kind: 'cifte', okeyFinish: false, mult: 2 });
    expect(r.f4.res).toMatchObject({ kind: 'cifte', okeyFinish: true, mult: 4, deltas: [8, -4, -4, -4] });
    expect(r.badFinish).toBeNull();
    expect(r.stateAfterBad).toEqual({ phase: 'discard', n: 15, disc: 0 });
    expect(r.found).not.toBeNull();
    expect(r.mult).toEqual([1, 2, 2, 4]);
  });

  test('motor: çekme/atma kuralları, yandan çekme, ıstaka düzeni ve bilgisayar turu', async ({ page }) => {
    const r = await withEngine<Record<string, any>>(page, `
      const out = {};
      const st = E.newRound({ rng: E.mulberry32(21), starter: 0 });
      // başlayan çekemez, atar
      try { E.draw(st, 0, 'pile'); out.startDraw = 'çekti'; } catch { out.startDraw = 'hata'; }
      const first = st.hands[0][0];
      E.discard(st, 0, first);
      out.afterDiscard = { turn: st.turn, phase: st.phase, side: st.discards[0].length };
      // sıra oyuncu 1: yandan çek = oyuncu 0'ın attığı taş
      try { E.draw(st, 2, 'pile'); out.wrongTurn = 'çekti'; } catch { out.wrongTurn = 'hata'; }
      const got = E.draw(st, 1, 'side');
      out.sideTile = got === first;
      out.hand1 = st.hands[1].length;
      try { E.draw(st, 1, 'pile'); out.twice = 'çekti'; } catch { out.twice = 'hata'; }
      // bilgisayar turları: sırayla 1, 2, 3
      E.discard(st, 1, st.hands[1][0]);
      const ev2 = E.aiPlay(st, 2, E.mulberry32(2));
      const ev3 = E.aiPlay(st, 3, E.mulberry32(3));
      out.aiTurns = [ev2.discarded !== null, ev3.discarded !== null, st.turn];
      out.counts = st.hands.map((h) => h.length);

      // Istaka düzeni: seri diz / çift diz yalnızca eldeki taşları yerleştirir
      const okey = { color: 0, num: 5 };
      const hand = [t(1, 1), t(1, 2), t(1, 3), t(2, 4), t(2, 5), t(2, 6), t(3, 9), t(1, 9), t(2, 9), t(3, 12), t(1, 12), t(2, 12), t(0, 12), t(3, 1)];
      const s = E.autoSeries(hand, okey);
      out.slotsLen = s.length;
      out.seriesSet = s.filter((x) => x !== null).sort((a, b) => a - b).join() === hand.slice().sort((a, b) => a - b).join();
      out.firstGroup = E.groupType(s.slice(0, 3), okey);
      const p = E.autoPairs([t(1, 3), t(1, 3, 1), t(2, 4), t(2, 4, 1), t(3, 6)], okey);
      out.pairsFirst = [p[0], p[1]].join() === [t(1, 3), t(1, 3, 1)].sort().join() || (new Set([p[0], p[1]]).size === 2);
      out.pairSame = E.faceOf(p[0], okey).n === E.faceOf(p[1], okey).n;
      out.pairGap = p[2];
      // Tam el simülasyonu: 4 bilgisayar, taş sayısı korunur, el biter
      let finished = 0, drawn = 0;
      for (let seed = 1; seed <= 8; seed++) {
        const rng = E.mulberry32(seed);
        const g = E.newRound({ rng, starter: seed % 4 });
        let guard = 0;
        while (g.phase !== 'over' && guard++ < 300) E.aiPlay(g, g.turn, rng);
        const total = g.hands.flat().length + g.pile.length + g.discards.flat().length + 1;
        if (total !== 106) return { simError: 'taş sayısı ' + total };
        if (g.phase !== 'over') return { simError: 'el bitmedi' };
        if (g.result.winner === null) drawn++; else { finished++; if (g.hands[g.result.winner].length !== 14) return { simError: 'kazanan 14 taşta değil' }; }
      }
      out.finished = finished; out.drawn = drawn;
      return out;
    `);
    expect(r.simError).toBeUndefined();
    expect(r.startDraw).toBe('hata');
    expect(r.afterDiscard).toEqual({ turn: 1, phase: 'draw', side: 1 });
    expect(r.wrongTurn).toBe('hata');
    expect(r.sideTile).toBe(true);
    expect(r.hand1).toBe(15);
    expect(r.twice).toBe('hata');
    expect(r.aiTurns[0]).toBe(true);
    expect(r.aiTurns[1]).toBe(true);
    expect(r.aiTurns[2]).toBe(0);
    expect(r.counts).toEqual([14, 14, 14, 14]);
    expect(r.slotsLen).toBe(30);
    expect(r.seriesSet).toBe(true);
    expect(r.firstGroup).not.toBeNull();
    expect(r.pairSame).toBe(true);
    expect(r.pairGap).toBeNull();
    expect(r.finished + r.drawn).toBe(8);
    expect(r.finished).toBeGreaterThanOrEqual(5);
  });

  test('arayüz: taş seç ve at, bilgisayarlar oynar, sıra size döner, ortadan çekilir', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=5&hiz=1`);
    await expect(page.locator('#ok-box')).toHaveAttribute('data-phase', 'discard');
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(15);
    await expect(page.locator('#ok-discard-btn')).toBeDisabled();
    const tile = page.locator('#ok-rack .ok-tile').first();
    await tile.click();
    await expect(tile).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#ok-discard-btn')).toBeEnabled();
    await page.locator('#ok-discard-btn').click();
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(14);
    // üç bilgisayar sırayla oynar, sıra tekrar size gelir ve çekme aşamasındadır
    await expect(page.locator('#ok-box')).toHaveAttribute('data-turn', 'me');
    await expect(page.locator('#ok-box')).toHaveAttribute('data-phase', 'draw');
    await expect(page.locator('#ok-last')).toContainText('Bilgisayar 3');
    const before = (await gameState(page)).pile as number;
    await page.locator('#ok-pile').click();
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(15);
    expect((await gameState(page)).pile).toBe(before - 1);
    await expect(page.locator('#ok-box')).toHaveAttribute('data-phase', 'discard');
  });

  test('arayüz: sürükleyerek ıstaka düzenleme, seri diz ve çift diz taşları korur', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=8&hiz=1`);
    await page.evaluate(() => document.querySelector('#ok-rack')!.scrollIntoView({ behavior: 'instant', block: 'center' }));
    const st0 = await gameState(page);
    const id = st0.layout[0] as number;
    const from = page.locator('#ok-rack .ok-slot[data-slot="0"] .ok-tile');
    const target = page.locator('#ok-rack .ok-slot[data-slot="29"]');
    await from.hover();
    const a = (await from.boundingBox())!;
    const b = (await target.boundingBox())!;
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    await page.mouse.move(a.x + a.width / 2 + 20, a.y + a.height / 2 + 20, { steps: 5 });
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 10 });
    await page.mouse.up();
    const st1 = await gameState(page);
    expect(st1.layout[29]).toBe(id);
    expect(st1.layout[0]).toBeNull();
    // Seri diz
    const sorted = (arr: (number | null)[]) => arr.filter((x) => x !== null).sort((x, y) => (x as number) - (y as number));
    await page.locator('#ok-series').click();
    const st2 = await gameState(page);
    expect(st2.layout.length).toBe(30);
    expect(sorted(st2.layout)).toEqual(sorted(st2.hands[0]));
    await page.locator('#ok-pairs').click();
    const st3 = await gameState(page);
    expect(sorted(st3.layout)).toEqual(sorted(st3.hands[0]));
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(15);
  });

  test('arayüz: klavye ile seç, ok tuşlarıyla taşı; geçersiz bitirme uyarı verir', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=2&hiz=1`);
    const st0 = await gameState(page);
    const id = st0.layout[0] as number;
    const t0 = page.locator(`#ok-rack .ok-tile[data-id="${id}"]`);
    await t0.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(`#ok-rack .ok-tile[data-id="${id}"]`)).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('ArrowDown');
    expect((await gameState(page)).layout[15]).toBe(id);
    await page.keyboard.press('Escape');
    // rastgele elle bitmez: uyarı çıkar, durum değişmez
    await page.locator(`#ok-rack .ok-tile[data-id="${id}"]`).click();
    await page.locator('#ok-finish-btn').click();
    await expect(page.locator('#ok-last')).toContainText('bitmiyor');
    expect((await gameState(page)).phase).toBe('discard');
  });

  test('arayüz: bir el sonuna kadar oynanır, sonuç penceresi, istatistik ve sonraki el', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto(`${URL_PATH}?seed=6&hiz=1`);
    await playRound(page);
    await expect(page.locator('#ok-result')).toBeVisible();
    await expect(page.locator('#ok-result-title')).not.toBeEmpty();
    const stats = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-oyun-okey') || '{}'));
    expect(stats.played).toBe(1);
    await expect(page.locator('#ok-stats')).toContainText('1 el');
    await page.locator('#ok-next').click();
    await expect(page.locator('#ok-result')).toBeHidden();
    await expect(page.locator('#ok-box')).toHaveAttribute('data-hand', '1');
    // ikinci elde başlayan bilgisayar 1'dir: ilk atışı kendisi yapar, sıra kısa sürede size gelir
    await expect(page.locator('#ok-box')).toHaveAttribute('data-turn', 'me');
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(14);
  });

  test('bozuk localStorage çökmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => { try { localStorage.setItem('ba-oyun-okey', '[[bozuk'); } catch { /* yoksay */ } });
    await page.goto(`${URL_PATH}?hiz=1`);
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(15);
    await expect(page.locator('#ok-stats')).toContainText('0 el');
    await page.evaluate(() => localStorage.setItem('ba-oyun-okey', JSON.stringify({ played: 'x', won: -3, points: 'a', cifte: null })));
    await page.reload();
    await expect(page.locator('#ok-rack .ok-tile')).toHaveCount(15);
    await expect(page.locator('#ok-stats')).toContainText('0 galibiyet');
    expect(errors).toEqual([]);
  });

  test('360px: sayfa taşmaz, ıstaka yatay kaydırılabilir; tam ekran düğmesi var', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`${URL_PATH}?seed=4&hiz=1`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const m = await page.locator('.ok-rackwrap').evaluate((el) => ({ sw: el.scrollWidth, cw: el.clientWidth, right: el.getBoundingClientRect().right }));
    expect(m.right).toBeLessThanOrEqual(360);
    expect(m.sw).toBeGreaterThanOrEqual(m.cw); // taşıyorsa kaydırılır
    await expect(page.locator('#ok-full')).toBeVisible();
    await expect(page.locator('#ok-pile')).toBeVisible();
  });
});
