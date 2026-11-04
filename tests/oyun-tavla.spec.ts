import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Tavla: motor kuralları (engine.js doğrudan), arayüz akışı, bilgisayar yanıtı (worker), geri al, kazanma ve istatistik,
// pas, klavye, sürükle-bırak, bozuk localStorage, içerik, reklam, 360px, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/tavla/';
const pt = (page: Page, n: number | string) => page.locator(`#tv-board [data-pt="${n}"]`);
const hit = (page: Page, n: number | string) => page.locator(`#tv-board [data-pt="${n}"] .hit`);
const state = (page: Page) => page.evaluate(() => (window as any).__tavlaTest().state());

/** Beyaz 3-1 ile açılır: forceDice([3,1]) → beyaz 3, siyah 1 atar. */
async function openWhite31(page: Page) {
  await page.goto(`${URL_PATH}?seed=11`);
  await page.evaluate(() => (window as any).__tavlaTest().forceDice([3, 1]));
  await page.locator('#tv-new').click();
  await expect(page.locator('#tv-board')).toHaveAttribute('data-phase', 'move');
}

test.describe('Oyun: tavla', () => {
  test('sayfa açılır, 24 hane ve 15+15 taş dizilir, içerik, 3 reklam, JSON-LD, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${URL_PATH}?seed=3`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#tv-board [data-pt]')).toHaveCount(24 + 1 + 2);
    const counts = await page.evaluate(() => {
      let w = 0; let b = 0;
      document.querySelectorAll('#tv-board .pt[data-side]').forEach((g) => {
        const e = g as HTMLElement;
        if (e.dataset.side === 'w') w += Number(e.dataset.count);
        if (e.dataset.side === 'b') b += Number(e.dataset.count);
      });
      return { w, b };
    });
    // Oyun açılış zarıyla başlamış olabilir (bilgisayar ilk hamlesini oynuyor olabilir); toplam yine 15+15
    const s = await state(page);
    expect(counts.w + s.bar.w + s.off.w).toBe(15);
    expect(counts.b + s.bar.b + s.off.b).toBe(15);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(text).toContain('Mars');
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
    expect(slots).toEqual(['oyun-tavla-a', 'oyun-tavla-b', 'oyun-tavla-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const box = document.querySelector('.game-box')!;
      const ad = document.querySelector('[data-slot="oyun-tavla-a"]')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
  });

  test('motor: başlangıç dizilimi 24 hane, 15+15 taş, pip 167', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      const st = E.initialState();
      return {
        len: st.length, w: E.checkerTotal(st, 'w'), b: E.checkerTotal(st, 'b'),
        pw: E.pips(st, 'w'), pb: E.pips(st, 'b'),
        p24: st[23], p13: st[12], p8: st[7], p6: st[5], b1: st[0], b12: st[11], b17: st[16], b19: st[18],
      };
    });
    expect(r.len).toBe(28);
    expect(r.w).toBe(15);
    expect(r.b).toBe(15);
    expect(r.pw).toBe(167);
    expect(r.pb).toBe(167);
    expect([r.p24, r.p13, r.p8, r.p6]).toEqual([2, 5, 3, 5]);
    expect([r.b1, r.b12, r.b17, r.b19]).toEqual([-2, -5, -3, -5]);
  });

  test('motor: 3-1 açılışında her dizi 2 hamledir ve 8/5 6/5 (5. haneyi kapatma) vardır', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      const seqs = E.legalSequences(E.initialState(), 'w', [3, 1]);
      return { lens: seqs.map((s: unknown[]) => s.length), notes: seqs.map((s: unknown[]) => E.seqNotation('w', s as never).split(' ').sort().join(' ')) };
    });
    expect(r.lens.length).toBeGreaterThan(5);
    expect(r.lens.every((n: number) => n === 2)).toBe(true);
    expect(r.notes).toContain('6/5 8/5');
    // 6-5 başlangıçta 24/13 oynanabilir (bir taşla iki zar)
    const six5 = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      return E.legalSequences(E.initialState(), 'w', [6, 5]).map((s: unknown[]) => E.seqNotation('w', s as never)).includes('24/18 18/13');
    });
    expect(six5).toBe(true);
  });

  test('motor: çift zar 4 hamle verir; 6-6 başlangıçta her dizi 4 hamle', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      const seqs = E.legalSequences(E.initialState(), 'w', [6, 6]);
      return { n: seqs.length, lens: seqs.map((s: unknown[]) => s.length), expanded: E.expandDice([3, 3]) };
    });
    expect(r.n).toBeGreaterThan(0);
    expect(r.lens.every((n: number) => n === 4)).toBe(true);
    expect(r.expanded).toEqual([3, 3, 3, 3]);
  });

  test('motor: kırık taş varken önce çubuktan giriş zorunlu; tüm giriş haneleri kapalıysa pas', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      const pts = new Array(24).fill(0);
      pts[12] = 14; pts[23] = 0;
      const st = E.stateFrom({ points: pts, bar: { w: 1, b: 0 }, off: { w: 0, b: 0 } });
      const seqs = E.legalSequences(st, 'w', [3, 1]);
      // Tüm giriş haneleri (idx 18..23) siyah kapısı
      const blocked = pts.slice();
      for (let i = 18; i < 24; i++) blocked[i] = -2;
      const st2 = E.stateFrom({ points: blocked, bar: { w: 1, b: 0 }, off: { w: 0, b: 0 } });
      return {
        n: seqs.length,
        firstFromBar: seqs.every((s: { from: number }[]) => s[0].from === E.BAR),
        otherBefore: seqs.some((s: { from: number }[]) => s[0].from !== E.BAR),
        blocked: E.legalSequences(st2, 'w', [3, 1]).length,
      };
    });
    expect(r.n).toBeGreaterThan(0);
    expect(r.firstFromBar).toBe(true);
    expect(r.otherBefore).toBe(false);
    expect(r.blocked).toBe(0);
  });

  test('motor: yalnızca bir zar oynanabiliyorsa büyük zar oynanır', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      // Tek beyaz taş 8. hanede (idx 7), 1. hane (idx 0) siyah kapısı: 6 ve 1 ayrı ayrı oynanır ama birlikte oynanamaz
      const pts = new Array(24).fill(0);
      pts[7] = 1; pts[0] = -2;
      const st = E.stateFrom({ points: pts, bar: { w: 0, b: 0 }, off: { w: 14, b: 0 } });
      const seqs = E.legalSequences(st, 'w', [1, 6]);
      return {
        lens: seqs.map((s: unknown[]) => s.length),
        dice: seqs.map((s: { die: number }[]) => s[0].die),
        first: E.firstMoves(st, 'w', [1, 6]).map((m: { die: number }) => m.die),
      };
    });
    expect(r.lens).toEqual([1]);
    expect(r.dice).toEqual([6]);
    expect(r.first).toEqual([6]);
  });

  test('motor: taş toplama yalnızca tüm taşlar evdeyken; büyük zar yalnızca en uzak taştan toplar', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      const mk = (pairs: [number, number][], off: number) => {
        const pts = new Array(24).fill(0);
        for (const [i, c] of pairs) pts[i] = c;
        return E.stateFrom({ points: pts, bar: { w: 0, b: 0 }, off: { w: off, b: 0 } });
      };
      const offMoves = (st: number[], die: number) => E.singleMoves(st, 'w', die).filter((m: { to: number }) => m.to === E.OFF).map((m: { from: number }) => m.from);
      // Evin dışında (idx 8) taş varken toplama yok
      const notHome = mk([[8, 1], [0, 13]], 1);
      // Hepsi evde: idx 4 ve idx 2
      const home = mk([[4, 1], [2, 1]], 13);
      // Siyah için: evde (idx 23, 21) ve bir tane dışarıda
      const bPts = new Array(24).fill(0);
      bPts[10] = -1; bPts[23] = -14;
      const bNot = E.stateFrom({ points: bPts, bar: { w: 0, b: 0 }, off: { w: 0, b: 0 } });
      return {
        notHomeOff: offMoves(notHome, 6).concat(offMoves(notHome, 1)),
        exact: offMoves(home, 5),     // idx 4 - 5 = -1 tam zar
        over6: offMoves(home, 6),     // yalnızca en uzak (idx 4)
        small: offMoves(home, 3),     // idx 2 - 3 = -1 tam
        blackNotHome: E.singleMoves(bNot, 'b', 1).some((m: { to: number }) => m.to === E.OFF),
        allHomeFlag: E.allHome(home, 'w'),
        notHomeFlag: E.allHome(notHome, 'w'),
      };
    });
    expect(r.notHomeOff).toEqual([]);
    expect(r.exact).toEqual([4]);
    expect(r.over6).toEqual([4]);
    expect(r.small).toEqual([2]);
    expect(r.blackNotHome).toBe(false);
    expect(r.allHomeFlag).toBe(true);
    expect(r.notHomeFlag).toBe(false);
  });

  test('motor: kırma ve mars tespiti (rakip hiç taş toplamadıysa 2 puan)', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      const pts = new Array(24).fill(0);
      pts[12] = 1; pts[10] = -1;
      const st = E.stateFrom({ points: pts, bar: { w: 0, b: 0 }, off: { w: 0, b: 0 } });
      const mv = E.singleMoves(st, 'w', 2).find((m: { from: number }) => m.from === 12);
      const after = E.applyMove(st, 'w', mv);
      return {
        hit: mv.hit, barB: after[25], at10: after[10],
        mars: E.gameResult(E.stateFrom({ points: [], off: { w: 15, b: 0 } })),
        normal: E.gameResult(E.stateFrom({ points: [], off: { w: 15, b: 3 } })),
        blackMars: E.gameResult(E.stateFrom({ points: [], off: { w: 0, b: 15 } })),
        going: E.gameResult(E.initialState()),
      };
    });
    expect(r.hit).toBe(true);
    expect(r.barB).toBe(1);
    expect(r.at10).toBe(1);
    expect(r.mars).toMatchObject({ over: true, winner: 'w', mars: true, points: 2 });
    expect(r.normal).toMatchObject({ over: true, winner: 'w', mars: false, points: 1 });
    expect(r.blackMars).toMatchObject({ winner: 'b', mars: true, points: 2 });
    expect(r.going.over).toBe(false);
  });

  test('motor: yapay zekâ üç seviyede geçerli dizi seçer, zor seviye 2 sn içinde biter', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/tavla/engine.js');
      const A = await import('/oyunlar/tavla/ai.js');
      const out: Record<string, unknown> = {};
      for (const level of ['kolay', 'orta', 'zor']) {
        const t0 = performance.now();
        const res = A.chooseSequence(E.initialState(), 'b', [6, 6], level, 5);
        const legal = E.legalSequences(E.initialState(), 'b', [6, 6]).map((s: never) => E.seqNotation('b', s));
        out[level] = { ok: legal.includes(E.seqNotation('b', res.seq)), ms: performance.now() - t0 };
      }
      return out as Record<string, { ok: boolean; ms: number }>;
    });
    for (const level of ['kolay', 'orta', 'zor']) expect(r[level].ok).toBe(true);
    expect(r.zor.ms).toBeLessThan(2000);
  });

  test('arayüz: zar at, hamle oyna, sıra bilgisayara geçer ve bilgisayar (worker) yanıt verir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await openWhite31(page);
    let s = await state(page);
    expect(s.turn).toBe('w');
    expect(s.dice).toEqual([3, 1]);
    await expect(page.locator('#tv-status')).toContainText('Sıra sizde');
    // 8. haneden 5. haneye (3 zarı)
    await hit(page, 8).click();
    await expect(pt(page, 8)).toHaveClass(/is-sel/);
    await expect(pt(page, 5)).toHaveClass(/is-dest/);
    await expect(pt(page, 7)).toHaveClass(/is-dest/);
    await hit(page, 5).click();
    await expect(pt(page, 5)).toHaveAttribute('data-count', '1');
    await expect(pt(page, 8)).toHaveAttribute('data-count', '2');
    // 6. haneden 5. haneye (1 zarı): kapı
    await hit(page, 6).click();
    await hit(page, 5).click();
    await expect(pt(page, 5)).toHaveAttribute('data-count', '2');
    await expect(pt(page, 6)).toHaveAttribute('data-count', '4');
    // Sıra siyaha (bilgisayar) geçer
    await expect(page.locator('#tv-board')).toHaveAttribute('data-turn', 'b', { timeout: 5000 });
    // Bilgisayar zar atar, oynar ve sıra yeniden bizde, zar bekliyor
    await expect(page.locator('#tv-board')).toHaveAttribute('data-turn', 'w', { timeout: 20000 });
    await expect(page.locator('#tv-board')).toHaveAttribute('data-phase', 'roll');
    s = await state(page);
    expect(s.points.filter((c: number) => c < 0).reduce((a: number, c: number) => a + -c, 0) + s.bar.b + s.off.b).toBe(15);
    expect(JSON.stringify(s.points.map((c: number) => (c < 0 ? c : 0)))).not.toBe(JSON.stringify([-2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 0, -3, 0, -5, 0, 0, 0, 0, 0]));
    await expect(page.locator('#tv-msg')).toContainText('Son hamle');
    // Z tuşu zar atar
    await expect(page.locator('#tv-roll')).toBeEnabled();
    await page.keyboard.press('z');
    await expect(page.locator('#tv-board')).toHaveAttribute('data-phase', /move|roll/);
    expect((await state(page)).dice.length).toBe(2);
    expect(errors).toEqual([]);
  });

  test('arayüz: geri al aynı sıradaki hamleyi ve kalan zarı geri getirir (U tuşu dahil)', async ({ page }) => {
    await openWhite31(page);
    await expect(page.locator('#tv-undo')).toBeDisabled();
    await hit(page, 8).click();
    await hit(page, 5).click();
    await expect(pt(page, 5)).toHaveAttribute('data-count', '1');
    await expect(page.locator('#tv-undo')).toBeEnabled();
    expect((await state(page)).rem).toEqual([1]);
    await page.locator('#tv-undo').click();
    await expect(pt(page, 8)).toHaveAttribute('data-count', '3');
    await expect(pt(page, 5)).toHaveAttribute('data-count', '0');
    expect((await state(page)).rem).toEqual([3, 1]);
    // U tuşu
    await hit(page, 8).click();
    await hit(page, 7).click();
    await expect(pt(page, 7)).toHaveAttribute('data-count', '1');
    await page.keyboard.press('u');
    await expect(pt(page, 7)).toHaveAttribute('data-count', '0');
    await expect(page.locator('#tv-undo')).toBeDisabled();
  });

  test('arayüz: geçersiz hanede hamle olmaz; kırık taş varken diğer taşlar seçilemez', async ({ page }) => {
    await openWhite31(page);
    await hit(page, 13).click(); // 13 → 10 mümkün: seçilir
    await expect(pt(page, 13)).toHaveClass(/is-sel/);
    await hit(page, 12).click(); // boş hane, hedef değil: seçim kalkar, tahta değişmez
    await expect(page.locator('#tv-board .is-sel')).toHaveCount(0);
    expect((await state(page)).rem).toEqual([3, 1]);
    // Kırık taşlı konum: yalnızca çubuk seçilebilir
    await page.evaluate(() => {
      const pts = new Array(24).fill(0);
      pts[12] = 14; pts[0] = -15;
      (window as any).__tavlaTest().setPosition({ points: pts, bar: { w: 1, b: 0 }, off: { w: 0, b: 0 }, turn: 'w', dice: [3, 1] });
    });
    await hit(page, 13).click();
    await expect(page.locator('#tv-board .is-sel')).toHaveCount(0);
    await expect(page.locator('#tv-msg')).toContainText('Kırık taşınız var');
    await hit(page, 'bar').click();
    await expect(pt(page, 'bar')).toHaveClass(/is-sel/);
    await expect(pt(page, 22)).toHaveClass(/is-dest/);
    await expect(pt(page, 24)).toHaveClass(/is-dest/);
  });

  test('arayüz: oynanabilir hamle yoksa otomatik pas uyarısı çıkar ve sıra geçer', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=5`);
    await page.evaluate(() => {
      const pts = new Array(24).fill(0);
      pts[12] = 14; pts[0] = -3;
      for (let i = 18; i < 24; i++) pts[i] = -2;
      const t = (window as any).__tavlaTest();
      t.setPosition({ points: pts, bar: { w: 1, b: 0 }, off: { w: 0, b: 0 }, turn: 'w' });
      t.forceDice([2, 3]);
    });
    await page.locator('#tv-roll').click();
    await expect(page.locator('#tv-status')).toContainText('geçerli hamle yok');
    await expect(page.locator('#tv-msg')).toContainText('pas');
    // Pas sonrası sıra siyaha geçer (bilgisayar oynayıp geri verebilir; en az bir kez siyah sırası görülür)
    await expect.poll(async () => (await state(page)).turn !== 'w' || (await state(page)).phase === 'roll', { timeout: 6000 }).toBe(true);
  });

  test('arayüz: son taş toplanınca mars ile kazanma ekranı çıkar, istatistik yazılır, yeni oyun 15+15 dizer', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=9`);
    await page.evaluate(() => {
      const pts = new Array(24).fill(0);
      pts[0] = 1; pts[18] = -15;
      const t = (window as any).__tavlaTest();
      t.setPosition({ points: pts, bar: { w: 0, b: 0 }, off: { w: 14, b: 0 }, turn: 'w' });
      t.forceDice([1, 2]);
    });
    await page.locator('#tv-roll').click();
    await hit(page, 1).click();
    await expect(pt(page, 1)).toHaveClass(/is-sel/);
    await expect(page.locator('#tv-board [data-pt="off-w"]')).toHaveClass(/is-dest/);
    await page.locator('#tv-board [data-pt="off-w"] .hit').click();
    await expect(page.locator('#tv-result')).toBeVisible();
    await expect(page.locator('#tv-result-title')).toHaveText('Kazandınız!');
    await expect(page.locator('#tv-result-text')).toContainText('Mars');
    await expect(page.locator('#tv-result-text')).toContainText('2 puan');
    await expect(page.locator('#tv-score-w')).toHaveText('2');
    await expect(page.locator('#tv-stats')).toContainText('1 galibiyet');
    const saved = await page.evaluate(() => localStorage.getItem('ba-oyun-tavla'));
    expect(JSON.parse(saved!)).toMatchObject({ w: 1, l: 0, mw: 1, ml: 0 });
    // Tahta kilitli
    await hit(page, 19).click();
    await expect(page.locator('#tv-board .is-sel')).toHaveCount(0);
    await page.locator('#tv-next').click();
    await expect(page.locator('#tv-result')).toBeHidden();
    await expect(page.locator('#tv-score-w')).toHaveText('0');
  });

  test('arayüz: 3 puanlık maçta mars sonrası maç sürer; sonraki oyun skoru korur', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=9`);
    await page.locator('#tv-match').selectOption('3');
    await page.evaluate(() => {
      const pts = new Array(24).fill(0);
      pts[0] = 1; pts[18] = -15;
      const t = (window as any).__tavlaTest();
      t.setPosition({ points: pts, bar: { w: 0, b: 0 }, off: { w: 14, b: 0 }, turn: 'w' });
      t.forceDice([1, 2]);
    });
    await page.locator('#tv-roll').click();
    await hit(page, 1).click();
    await page.locator('#tv-board [data-pt="off-w"] .hit').click();
    await expect(page.locator('#tv-result')).toBeVisible();
    await expect(page.locator('#tv-next')).toHaveText('Sonraki oyun');
    await expect(page.locator('#tv-match-info')).toHaveText('3 puanlık maç');
    await page.locator('#tv-next').click();
    await expect(page.locator('#tv-score-w')).toHaveText('2');
  });

  test('iki kişilik mod: bilgisayar oynamaz, sıra elle değişir ve istatistik yazılmaz', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=2`);
    await page.locator('#tv-mode').selectOption('two');
    await page.evaluate(() => (window as any).__tavlaTest().forceDice([4, 2]));
    await page.locator('#tv-new').click();
    await expect(page.locator('#tv-status')).toContainText('Sıra: Beyaz');
    await hit(page, 24).click();
    await hit(page, 20).click();
    await hit(page, 6).click();
    await hit(page, 4).click();
    await expect(page.locator('#tv-board')).toHaveAttribute('data-turn', 'b', { timeout: 5000 });
    await expect(page.locator('#tv-board')).toHaveAttribute('data-phase', 'roll');
    await page.waitForTimeout(1200);
    expect((await state(page)).turn).toBe('b'); // bilgisayar araya girmedi
    await expect(page.locator('#tv-roll')).toBeEnabled();
    expect(await page.evaluate(() => localStorage.getItem('ba-oyun-tavla'))).toBeNull();
  });

  test('klavye: ok tuşlarıyla haneler/çubuk/toplama arasında gezilir, Enter seçer', async ({ page }) => {
    await openWhite31(page);
    await pt(page, 6).focus();
    await page.keyboard.press('ArrowLeft');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.pt)).toBe('bar');
    await page.keyboard.press('ArrowLeft');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.pt)).toBe('7');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowUp');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.pt)).toBe('19');
    await pt(page, 8).focus();
    await page.keyboard.press('Enter');
    await expect(pt(page, 8)).toHaveClass(/is-sel/);
    await expect(pt(page, 8)).toHaveAttribute('aria-label', /Hane 8, 3 beyaz taş, seçili/);
    await pt(page, 5).focus();
    await page.keyboard.press('Enter');
    await expect(pt(page, 5)).toHaveAttribute('data-count', '1');
  });

  test('sürükle-bırak: taş fareyle sürüklenip hedef haneye bırakılır', async ({ page }) => {
    await openWhite31(page);
    await pt(page, 8).scrollIntoViewIfNeeded();
    const from = await hit(page, 8).boundingBox();
    const to = await hit(page, 5).boundingBox();
    await page.mouse.move(from!.x + from!.width / 2, from!.y + from!.height - 14);
    await page.mouse.down();
    await page.mouse.move(from!.x + from!.width / 2 + 10, from!.y + from!.height - 40, { steps: 4 });
    await page.mouse.move(to!.x + to!.width / 2, to!.y + to!.height - 30, { steps: 8 });
    await page.mouse.up();
    await expect(pt(page, 5)).toHaveAttribute('data-count', '1');
    await expect(pt(page, 8)).toHaveAttribute('data-count', '2');
    expect(await page.locator('.tv-ghost').count()).toBe(0);
  });

  test('bozuk localStorage verisi sayfayı çökertmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    for (const bad of ['{bozuk', '[1,2,3]', 'null', '{"w":"x","l":-5,"mw":1e99}']) {
      await page.evaluate((v) => localStorage.setItem('ba-oyun-tavla', v), bad);
      await page.reload();
      await expect(page.locator('#tv-stats')).toContainText('galibiyet');
      await expect(page.locator('#tv-board [data-pt]')).toHaveCount(27);
    }
    await expect(page.locator('#tv-stats')).toContainText('0 galibiyet · 0 yenilgi');
    expect(errors).toEqual([]);
  });

  test('siyah seçilince tahta 180 derece çevrilir: siyahın evi altta olur', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=4`);
    await page.locator('#tv-color').selectOption('b');
    await expect(page.locator('#tv-board [data-pt="19"]')).toBeVisible();
    const a = await hit(page, 19).boundingBox();
    const b = await hit(page, 24).boundingBox();
    const c = await hit(page, 1).boundingBox();
    // Tahta döner: 24. hane (siyahın 1. hanesi) altta ve 19'dan solda; beyazın 1. hanesi üstte
    expect(b!.x).toBeLessThan(a!.x);
    expect(b!.y).toBeGreaterThan(c!.y);
  });

  test('360px genişlikte yatay taşma yok ve tahta ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`${URL_PATH}?seed=6`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await page.locator('#tv-board').boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(280);
    expect(box!.width).toBeLessThanOrEqual(360);
    await expect(page.locator('#tv-roll')).toBeVisible();
  });
});
