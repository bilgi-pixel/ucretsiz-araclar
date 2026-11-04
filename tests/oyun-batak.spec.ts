import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// İhaleli batak: motor kuralları (engine.js doğrudan), arayüz akışı (ihale, koz, kart oynama, el sonu),
// bozuk localStorage, içerik, reklam, JSON-LD, 360px, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/batak/';

async function withEngine<T>(page: Page, fn: string): Promise<T> {
  await page.goto(`${URL_PATH}?seed=1&hiz=1`);
  return page.evaluate(`(async () => { const E = await import('/oyunlar/batak/engine.js'); ${fn} })()`) as Promise<T>;
}

/** Arayüzde bir eli sonuna kadar oynatır: ihalede pas, koz seç, ilk etkin kartı at. Sonuç penceresi açılınca durur. */
async function playRound(page: Page) {
  for (let i = 0; i < 1500; i++) {
    if (await page.locator('#bt-result').isVisible()) return;
    const pass = page.locator('.bt-bid[data-bid="0"]');
    const trump = page.locator('.bt-trump').first();
    const card = page.locator('#bt-hand button:not([disabled])').first();
    if (await pass.count()) await pass.click({ timeout: 2000 }).catch(() => {});
    else if (await trump.count()) await trump.click({ timeout: 2000 }).catch(() => {});
    else if (await card.count()) await card.evaluate((el) => (el as HTMLElement).click()).catch(() => {}); // kartlar yelpaze gibi üst üste biner; merkez noktası komşu karta düşer
    else await page.waitForTimeout(15);
  }
}

// Kart: takım * 13 + (değer - 1); 0 ♠, 1 ♥, 2 ♦, 3 ♣; As = değer 1
const HELPERS = `
  const c = (s, r) => s * 13 + r - 1;
  const names = (ids) => ids.map((id) => E.cardName(id));
  const mk = (trump, trick, hand) => {
    const st = E.newGame({ rng: E.mulberry32(1) });
    st.phase = 'play'; st.trump = trump; st.bidder = 1; st.highBid = 5; st.turn = 0;
    st.trick = trick.map(([p, card]) => ({ p, card }));
    st.hands[0] = hand;
    return st;
  };
`;

test.describe('Oyun: batak', () => {
  test('sayfa açılır, içerik ≥900 kelime, 3 reklam, JSON-LD, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${URL_PATH}?seed=3&hiz=1`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#bt-hand .bt-card')).toHaveCount(13);
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
    expect(slots).toEqual(['oyun-batak-a', 'oyun-batak-b', 'oyun-batak-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const after = await page.evaluate(() => !!(document.querySelector('.game-box')!.compareDocumentPosition(document.querySelector('[data-slot="oyun-batak-a"]')!) & Node.DOCUMENT_POSITION_FOLLOWING));
    expect(after).toBe(true);
  });

  test('motor: renge uyma ve büyük atma zorunluluğu', async ({ page }) => {
    const r = await withEngine<Record<string, string[]>>(page, `${HELPERS}
      const out = {};
      // Kupa 5 açıldı, koz maça. Kupa 9 geçer; kupa 3 geçemez; yani yalnızca kupa 9 atılabilir (büyük atma).
      let st = mk(0, [[3, c(1, 5)]], [c(1, 3), c(1, 9), c(3, 13), c(0, 2)]);
      out.beat = names(E.legalCards(st, 0));
      // Kupa 10 açıldı; elde kupa 3 ve 4 var, geçemez ama renge uymak zorunda: yalnızca kupalar.
      st = mk(0, [[3, c(1, 10)]], [c(1, 3), c(1, 4), c(3, 13), c(2, 2)]);
      out.follow = names(E.legalCards(st, 0));
      // As en yüksek kart sayılır: kupa As'ı papaz geçemez.
      st = mk(0, [[3, c(1, 1)]], [c(1, 13), c(1, 2), c(2, 5)]);
      out.ace = names(E.legalCards(st, 0));
      // Masada birden çok kart varsa en yüksek olan geçilir (Vale 11 > 5): kız ve papaz geçer, 9 geçemez.
      st = mk(0, [[3, c(1, 5)], [2, c(1, 11)]], [c(1, 9), c(1, 12), c(1, 13)]);
      out.highest = names(E.legalCards(st, 0));
      // Eli açan oyuncu serbest.
      st = mk(0, [], [c(1, 9), c(1, 12), c(3, 13)]);
      out.lead = names(E.legalCards(st, 0));
      return out;
    `);
    expect(r.beat).toEqual(['Kupa 9']);
    expect(r.follow).toEqual(['Kupa 3', 'Kupa 4']);
    expect(r.ace).toEqual(['Kupa Papaz', 'Kupa 2']);
    expect(r.highest).toEqual(['Kupa Kız', 'Kupa Papaz']);
    expect(r.lead.length).toBe(3);
  });

  test('motor: kozla kesme zorunluluğu ve el kazanma', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `${HELPERS}
      const out = {};
      // Kupa açıldı, elde kupa yok, koz maça var: maçalardan biri atılmak zorunda.
      let st = mk(0, [[3, c(1, 5)]], [c(3, 13), c(2, 4), c(0, 2), c(0, 9)]);
      out.cut = names(E.legalCards(st, 0));
      // Masada maça 7 ile kesilmiş: daha büyük koz (maça 9) atılmak zorunda.
      st = mk(0, [[3, c(1, 5)], [2, c(0, 7)]], [c(3, 13), c(0, 2), c(0, 9)]);
      out.overtrump = names(E.legalCards(st, 0));
      // Masada maça Papaz var, elimdeki kozlar küçük: herhangi bir koz atılabilir.
      st = mk(0, [[3, c(1, 5)], [2, c(0, 13)]], [c(3, 13), c(0, 2), c(0, 9)]);
      out.smallTrump = names(E.legalCards(st, 0));
      // Ne renk ne koz: her kart serbest.
      st = mk(0, [[3, c(1, 5)]], [c(3, 13), c(2, 4), c(3, 2)]);
      out.free = E.legalCards(st, 0).length;
      // Renk varsa ve masada kesme olmuşsa, renk kartlarından biri atılır (geçme zorunluluğu yok).
      st = mk(0, [[3, c(1, 5)], [2, c(0, 7)]], [c(1, 2), c(1, 12), c(0, 9)]);
      out.underCut = names(E.legalCards(st, 0));
      // El kazanma: koz alır, yoksa açılış rengindeki en yüksek.
      out.w1 = E.trickWinner([{ p: 0, card: c(1, 13) }, { p: 1, card: c(0, 2) }, { p: 2, card: c(1, 1) }, { p: 3, card: c(2, 1) }], 0);
      out.w2 = E.trickWinner([{ p: 0, card: c(1, 13) }, { p: 1, card: c(1, 1) }, { p: 2, card: c(3, 1) }, { p: 3, card: c(1, 12) }], 0);
      out.w3 = E.trickWinner([{ p: 2, card: c(1, 4) }, { p: 3, card: c(0, 3) }, { p: 0, card: c(0, 8) }, { p: 1, card: c(0, 5) }], 0);
      return out;
    `);
    expect(r.cut).toEqual(['Maça 2', 'Maça 9']);
    expect(r.overtrump).toEqual(['Maça 9']);
    expect(r.smallTrump).toEqual(['Maça 2', 'Maça 9']);
    expect(r.free).toBe(3);
    expect(r.underCut).toEqual(['Kupa 2', 'Kupa Kız']);
    expect(r.w1).toBe(1); // tek koz maça 2 eli alır
    expect(r.w2).toBe(1); // koz yok: kupa As
    expect(r.w3).toBe(0); // en yüksek koz maça 8
  });

  test('motor: ihale kuralları (en az 5, yükseltme, herkes pas, 13 hemen kapatır)', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const out = {};
      let st = E.newGame({ rng: E.mulberry32(5) });
      out.firstTurn = st.bidTurn === (st.dealer + 1) % 4;
      out.hands = st.hands.map((h) => h.length);
      out.bids0 = E.legalBids(st);
      out.low = E.bid(st, st.bidTurn, 4).ok; // 5'ten az geçersiz
      const p0 = st.bidTurn;
      out.ok7 = E.bid(st, p0, 7).ok;
      out.after = E.legalBids(st);
      out.same = E.bid(st, st.bidTurn, 7).ok; // eşit ihale geçersiz
      out.wrongTurn = E.bid(st, (st.bidTurn + 1) % 4, 8).ok;
      // herkes pas: dağıtıcı 5 ile zorunlu
      st = E.newGame({ rng: E.mulberry32(6) });
      while (st.phase === 'bid') E.bid(st, st.bidTurn, 0);
      out.forced = { bidder: st.bidder === st.dealer, bid: st.highBid, flag: st.forced, phase: st.phase };
      // 13 ihaleyi hemen kapatır
      st = E.newGame({ rng: E.mulberry32(7) });
      const r13 = E.bid(st, st.bidTurn, 13);
      out.thirteen = { done: r13.done, phase: st.phase, bidder: st.bidder === (st.dealer + 1) % 4 };
      // koz seçimi oyunu başlatır ve ihaleyi alan açar
      E.chooseTrump(st, 2);
      out.play = { phase: st.phase, trump: st.trump, turn: st.turn === st.bidder };
      return out;
    `);
    expect(r.firstTurn).toBe(true);
    expect(r.hands).toEqual([13, 13, 13, 13]);
    expect(r.bids0).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13]);
    expect(r.low).toBe(false);
    expect(r.ok7).toBe(true);
    expect(r.after).toEqual([8, 9, 10, 11, 12, 13]);
    expect(r.same).toBe(false);
    expect(r.wrongTurn).toBe(false);
    expect(r.forced).toEqual({ bidder: true, bid: 5, flag: true, phase: 'trump' });
    expect(r.thirteen).toEqual({ done: true, phase: 'trump', bidder: true });
    expect(r.play).toEqual({ phase: 'play', trump: 2, turn: true });
  });

  test('motor: puanlama (tutturan +el, batıran -ihale, diğerleri +el) ve oyun sonu', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const out = {};
      const st = E.newGame({ rng: E.mulberry32(1) });
      st.bidder = 2; st.highBid = 7;
      st.tricks = [3, 1, 8, 1];
      out.made = E.scoreRound(st);
      st.tricks = [4, 2, 6, 1];
      out.failed = E.scoreRound(st);
      st.tricks = [3, 1, 7, 2];
      out.exact = E.scoreRound(st).delta;
      // 11. elin sonunda oyun biter; hedef puan seçiliyse erken biter
      out.over11 = (() => { const s = E.newGame({ rng: E.mulberry32(1) }); s.roundNo = 11; return E.isGameOver(s); })();
      out.notOver = (() => { const s = E.newGame({ rng: E.mulberry32(1) }); return E.isGameOver(s); })();
      out.target = (() => { const s = E.newGame({ rng: E.mulberry32(1), target: 30 }); s.scores = [5, 31, 0, 2]; return [E.isGameOver(s), E.leaderOf(s.scores)]; })();
      return out;
    `);
    expect((r.made as { delta: number[]; made: boolean }).made).toBe(true);
    expect((r.made as { delta: number[] }).delta).toEqual([3, 1, 8, 1]);
    expect((r.failed as { made: boolean }).made).toBe(false);
    expect((r.failed as { delta: number[] }).delta).toEqual([4, 2, -7, 1]);
    expect(r.exact).toEqual([3, 1, 7, 2]);
    expect(r.over11).toBe(true);
    expect(r.notOver).toBe(false);
    expect(r.target).toEqual([true, 1]);
  });

  test('motor: bilgisayarla 40 tam oyun yasal ve tutarlı biter (13 el, toplam puan hesabı)', async ({ page }) => {
    const r = await withEngine<Record<string, number>>(page, `
      let games = 0, rounds = 0, bad = 0, made = 0;
      for (let g = 1; g <= 40; g++) {
        const rng = E.mulberry32(g);
        const st = E.newGame({ rng });
        while (!st.over) {
          while (st.phase === 'bid') { if (!E.bid(st, st.bidTurn, E.aiBid(st, st.bidTurn)).ok) bad++; }
          E.chooseTrump(st, E.aiTrump(st, st.bidder));
          let plays = 0;
          while (st.phase === 'play') {
            const p = st.turn;
            const card = E.aiPlay(st, p);
            if (!E.legalCards(st, p).includes(card)) bad++;
            if (!E.playCard(st, p, card).ok) bad++;
            plays++;
          }
          if (plays !== 52 || st.tricks.reduce((a, b) => a + b, 0) !== 13) bad++;
          rounds++;
          if (st.result.made) made++;
          if (st.phase === 'roundover') E.nextRound(st, rng);
        }
        games++;
        if (st.roundNo !== 11) bad++;
      }
      return { games, rounds, bad, made };
    `);
    expect(r.bad).toBe(0);
    expect(r.games).toBe(40);
    expect(r.rounds).toBe(440);
    expect(r.made).toBeGreaterThan(100);
  });

  test('arayüz: ihale paneli, koz seçimi, kart oynama ve el sonu penceresi', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=2&hiz=1`);
    await expect(page.locator('#bt-hand .bt-card')).toHaveCount(13);
    // ilk el: dağıtıcı insan, ihaleye ilk bilgisayar başlar; sıra bize gelince panel açılır
    await expect(page.locator('.bt-bid[data-bid="0"]')).toBeVisible({ timeout: 5000 });
    const bidButtons = await page.locator('.bt-bid').count();
    expect(bidButtons).toBeGreaterThanOrEqual(2);
    await page.locator('.bt-bid[data-bid="0"]').click();
    await playRound(page);
    await expect(page.locator('#bt-result')).toBeVisible();
    const scores = await Promise.all([0, 1, 2, 3].map(async (p) => Number(await page.locator(`#bt-score-${p}`).textContent())));
    // her elde toplam dağılan puan: en az 13 el, bir oyuncu eksiye düşse bile toplamı sıfır olamaz
    expect(scores.some((s) => s !== 0)).toBe(true);
    const resultText = await page.locator('#bt-result-text').textContent();
    expect(resultText).toMatch(/ihale|İhale/);
    await page.locator('#bt-next').click();
    await expect(page.locator('#bt-result')).toBeHidden();
    await expect(page.locator('#bt-round')).toContainText('El 2 / 11');
  });

  test('arayüz: kuralsız kart atılamaz; renge uyma kartları etkin bırakır', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=4&hiz=1`);
    // ihaleyi geç, oyun başlayınca sıra bize gelene kadar bekle
    for (let i = 0; i < 400; i++) {
      const pass = page.locator('.bt-bid[data-bid="0"]');
      const trump = page.locator('.bt-trump').first();
      if (await pass.count()) await pass.click().catch(() => {});
      else if (await trump.count()) await trump.click().catch(() => {});
      else if (await page.locator('#bt-box[data-phase="play"][data-turn="0"] #bt-hand button:not([disabled])').count()) break;
      await page.waitForTimeout(15);
    }
    const state = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('#bt-hand button')] as HTMLButtonElement[];
      return { total: cards.length, enabled: cards.filter((b) => !b.disabled).length };
    });
    expect(state.total).toBeGreaterThan(0);
    expect(state.enabled).toBeGreaterThan(0);
    expect(state.enabled).toBeLessThanOrEqual(state.total);
    await page.locator('#bt-hand button:not([disabled])').first().evaluate((el) => (el as HTMLElement).click());
    await expect(page.locator('#bt-hand button')).toHaveCount(state.total - 1);
  });

  test('tam oyun 11 elde biter, istatistik localStorage ba-oyun-batak içine yazılır', async ({ page }) => {
    test.setTimeout(150000);
    await page.goto(`${URL_PATH}?seed=7&hiz=1`);
    for (let r = 0; r < 11; r++) {
      await playRound(page);
      await expect(page.locator('#bt-result')).toBeVisible();
      if (r < 10) await page.locator('#bt-next').click();
    }
    await expect(page.locator('#bt-next')).toHaveText('Yeni oyun');
    await expect(page.locator('#bt-result-title')).toContainText(/kazandı|Oyun bitti/);
    const store = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-oyun-batak') || '{}'));
    expect(store.played).toBe(1);
    expect(typeof store.bestScore).toBe('number');
    await page.locator('#bt-next').click();
    await expect(page.locator('#bt-round')).toContainText('El 1 / 11');
    await expect(page.locator('#bt-score-0')).toHaveText('0');
  });

  test('bozuk localStorage oyunu çökertmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    for (const bad of ['{bozuk', '[1,2,3]', 'null', '{"played":"x","won":-5,"bestScore":{},"target":99,"hints":3}']) {
      await page.addInitScript((v) => { try { localStorage.setItem('ba-oyun-batak', v); } catch { /* yok say */ } }, bad);
      await page.goto(`${URL_PATH}?seed=1&hiz=1`);
      await expect(page.locator('#bt-hand .bt-card')).toHaveCount(13);
      await expect(page.locator('#bt-stats')).toContainText('Oynanan oyun: 0');
    }
    expect(errors).toEqual([]);
  });

  test('360px genişlikte taşma yok; on üç kart ve tam ekran düğmesi sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`${URL_PATH}?seed=4&hiz=1`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const box = await page.locator('#bt-hand').boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    const cards = await page.locator('#bt-hand .bt-card').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.left, r.right]; }));
    expect(cards.length).toBe(13);
    expect(Math.min(...cards.map((c) => c[0]))).toBeGreaterThanOrEqual(0);
    expect(Math.max(...cards.map((c) => c[1]))).toBeLessThanOrEqual(360);
    await expect(page.locator('#bt-full')).toBeVisible();
  });
});
