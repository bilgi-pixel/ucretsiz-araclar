import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Pişti: motor kuralları (engine.js doğrudan), arayüz akışı (kart oynama → bilgisayar yanıtı, tur sonu),
// bozuk localStorage, içerik, reklam, JSON-LD, 360px, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/pisti/';

/** Kart numarası: takım * 13 + (değer - 1); 0 ♠, 1 ♥, 2 ♦, 3 ♣. */
const card = (suit: number, rank: number) => suit * 13 + rank - 1;

async function withEngine<T>(page: Page, fn: string): Promise<T> {
  await page.goto(`${URL_PATH}?seed=1&hiz=1`);
  return page.evaluate(`(async () => { const E = await import('/oyunlar/pisti/engine.js'); ${fn} })()`) as Promise<T>;
}

async function playHand(page: Page) {
  for (let i = 0; i < 600; i++) {
    if (await page.locator('#ps-result').isVisible()) return;
    const c = page.locator('#ps-hand button:not([disabled])').first();
    if (await c.count()) await c.click({ timeout: 2000 }).catch(() => {});
    else await page.waitForTimeout(20);
  }
}

test.describe('Oyun: pişti', () => {
  test('sayfa açılır, içerik ≥900 kelime, 3 reklam, JSON-LD, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${URL_PATH}?seed=3&hiz=1`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#ps-hand .ps-card')).toHaveCount(4);
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
    expect(slots).toEqual(['oyun-pisti-a', 'oyun-pisti-b', 'oyun-pisti-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const after = await page.evaluate(() => !!(document.querySelector('.game-box')!.compareDocumentPosition(document.querySelector('[data-slot="oyun-pisti-a"]')!) & Node.DOCUMENT_POSITION_FOLLOWING));
    expect(after).toBe(true);
  });

  test('motor: kart puanları ve el puanlaması (kart, pişti, çoğunluk)', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const pts = (s, r) => E.cardPoints(s * 13 + r - 1);
      const sinek2 = pts(3, 2), karo10 = pts(2, 10), as = pts(0, 1), vale = pts(1, 11), sinek3 = pts(3, 3), karo2 = pts(2, 2);
      // tüm destenin toplam puanı 13 (2 + 3 + 4 as + 4 vale)
      const total = E.pointsOf(E.makeDeck());
      const a = [pts(3,2)*0 + 39 + 1, 35, 0, 10]; // sinek 2, karo 10, as maça, vale maça
      const s1 = E.scoreHand([a, [5, 6]], [10, 0]);
      const s2 = E.scoreHand([[1, 2], [3, 4]], [0, 20]);
      return { sinek2, karo10, as, vale, sinek3, karo2, total, s1, s2 };
    `);
    expect(r.sinek2).toBe(2);
    expect(r.karo10).toBe(3);
    expect(r.as).toBe(1);
    expect(r.vale).toBe(1);
    expect(r.sinek3).toBe(0);
    expect(r.karo2).toBe(0);
    expect(r.total).toBe(13);
    // 4 kart (2 + 3 + 1 + 1 = 7) + pişti 10 + çoğunluk 3 = 20
    const s1 = r.s1 as { pts: number[]; majority: number[]; cardPts: number[] };
    expect(s1.cardPts[0]).toBe(7);
    expect(s1.majority).toEqual([3, 0]);
    expect(s1.pts).toEqual([20, 0]);
    // kart sayıları eşit: çoğunluk yok; vale piştisi 20
    const s2 = r.s2 as { pts: number[]; majority: number[] };
    expect(s2.majority).toEqual([0, 0]);
    expect(s2.pts[1]).toBe(20);
  });

  test('motor: toplama, pişti ve vale piştisi tespiti', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const c = (s, r) => s * 13 + r - 1;
      const out = {};
      out.noCapEmpty = E.captures([], c(0, 5));
      out.sameRank = E.captures([c(1, 3), c(2, 7)], c(0, 7));
      out.diffRank = E.captures([c(1, 3), c(2, 7)], c(0, 8));
      out.jackAny = E.captures([c(1, 3), c(2, 7)], c(0, 11));
      out.pisti = E.pistiBonus([c(2, 7)], c(3, 7));
      out.valePisti = E.pistiBonus([c(2, 11)], c(3, 11));
      out.jackOnSingle = E.pistiBonus([c(2, 7)], c(3, 11));
      out.twoCards = E.pistiBonus([c(2, 7), c(1, 7)], c(3, 7));
      // oyun içinde: yer = [♥7], insan ♠7 oynar → pişti 10
      const st = E.newGame({ rng: E.mulberry32(3) });
      st.table = [c(1, 7)]; st.hiddenIds = [];
      st.hands[0] = [c(0, 7), c(0, 2), c(0, 3), c(0, 4)];
      st.turn = 0;
      const ev = E.play(st, c(0, 7));
      out.ev = { pisti: ev.pisti, captured: ev.captured.length, tableAfter: st.table.length, pistiPts: st.pistiPts[0], turn: st.turn };
      // yer boş: kart yere kalır
      const ev2 = E.play(st, st.hands[1][0]);
      out.ev2 = { captured: ev2.captured.length, table: st.table.length };
      return out;
    `);
    expect(r.noCapEmpty).toBe(false);
    expect(r.sameRank).toBe(true);
    expect(r.diffRank).toBe(false);
    expect(r.jackAny).toBe(true);
    expect(r.pisti).toBe(10);
    expect(r.valePisti).toBe(20);
    expect(r.jackOnSingle).toBe(0);
    expect(r.twoCards).toBe(0);
    expect(r.ev).toEqual({ pisti: 10, captured: 2, tableAfter: 0, pistiPts: 10, turn: 1 });
    expect(r.ev2).toEqual({ captured: 0, table: 1 });
  });

  test('motor: tam el simülasyonu (3 seviye) 52 kartı korur, el sonu yer kartları son toplayana gider', async ({ page }) => {
    const r = await withEngine<{ ok: boolean; msg: string }>(page, `
      for (const level of ['kolay', 'orta', 'zor']) {
        for (let seed = 1; seed <= 12; seed++) {
          const rng = E.mulberry32(seed);
          const st = E.newGame({ level, target: 101, rng });
          let guard = 0, result = null;
          while (st.phase === 'play' && guard++ < 100) {
            const c = E.chooseCard(st, st.turn, st.turn === 0 && seed % 2 ? 'orta' : level, rng);
            if (!st.hands[st.turn].includes(c)) return { ok: false, msg: 'elde olmayan kart ' + level };
            const ev = E.play(st, c);
            if (ev.handOver) result = ev.result;
          }
          if (!result) return { ok: false, msg: 'el bitmedi ' + level + seed };
          const n = st.captured[0].length + st.captured[1].length;
          if (n !== 52 && !(st.lastCapturer < 0)) return { ok: false, msg: 'kart sayısı ' + n };
          const cardSum = result.cardPts[0] + result.cardPts[1];
          if (st.lastCapturer >= 0 && cardSum !== 13) return { ok: false, msg: 'kart puanı toplamı ' + cardSum };
          const maj = result.majority[0] + result.majority[1];
          if (maj !== 0 && maj !== 3) return { ok: false, msg: 'çoğunluk ' + maj };
        }
      }
      return { ok: true, msg: '' };
    `);
    expect(r.msg).toBe('');
    expect(r.ok).toBe(true);
  });

  test('motor: oyun sonu hedef puanda biter; beraberlikte devam eder; bilgisayar seviyeleri', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const c = (s, r) => s * 13 + r - 1;
      const out = {};
      const st = E.newGame({ target: 101, rng: E.mulberry32(9) });
      st.total = [95, 90]; st.captured = [[c(3, 2), c(2, 10), c(0, 1), c(0, 11), c(0, 5)], [c(1, 9)]]; st.pistiPts = [0, 0];
      st.table = []; st.lastCapturer = 0;
      const res = E.finishHand(st);
      out.phase = st.phase; out.winner = st.winner; out.total = st.total.slice(); out.pts = res.pts;
      // beraberlik: ikisi de hedefi geçip eşit → devam
      const st2 = E.newGame({ target: 101, rng: E.mulberry32(9) });
      st2.total = [101, 98]; st2.captured = [[], [c(0, 3), c(0, 4), c(0, 5)]]; st2.pistiPts = [0, 0]; st2.table = []; st2.lastCapturer = 1;
      E.finishHand(st2);
      out.tiePhase = st2.phase; out.tieTotal = st2.total.slice();
      // seviyeler: orta pişti fırsatını kaçırmaz; kolay elden bir kart seçer
      const st3 = E.newGame({ rng: E.mulberry32(4) });
      st3.table = [c(1, 6)]; st3.hiddenIds = [];
      st3.hands[1] = [c(0, 2), c(0, 6), c(0, 11), c(2, 13)]; st3.turn = 1;
      out.mid = E.chooseCard(st3, 1, 'orta', E.mulberry32(1));
      out.hard = E.chooseCard(st3, 1, 'zor', E.mulberry32(1));
      out.easyInHand = st3.hands[1].includes(E.chooseCard(st3, 1, 'kolay', E.mulberry32(1)));
      out.expectPisti = c(0, 6);
      out.chance = [E.chanceHolds(0, 20, 4), E.chanceHolds(20, 20, 4), E.chanceHolds(3, 40, 4)];
      return out;
    `);
    expect(r.phase).toBe('gameover');
    expect(r.winner).toBe(0);
    expect((r.pts as number[])[0]).toBeGreaterThanOrEqual(7 + 3);
    expect(r.tiePhase).toBe('handover');
    expect(r.mid).toBe(r.expectPisti);
    expect(r.hard).toBe(r.expectPisti);
    expect(r.easyInHand).toBe(true);
    const ch = r.chance as number[];
    expect(ch[0]).toBe(0);
    expect(ch[1]).toBe(1);
    expect(ch[2]).toBeGreaterThan(0.2);
    expect(ch[2]).toBeLessThan(0.4);
  });

  test('arayüz: kart oynayınca bilgisayar yanıt verir, sıra size döner', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=5&hiz=1`);
    await expect(page.locator('#ps-box')).toHaveAttribute('data-turn', 'me');
    await expect(page.locator('#ps-hand .ps-card')).toHaveCount(4);
    await expect(page.locator('#ps-opp .ps-card')).toHaveCount(4);
    await page.locator('#ps-hand button').first().click();
    // bilgisayar yanıtı: 3 kart kalır, son hamle metni bilgisayarı anar, sıra tekrar sizde
    await expect(page.locator('#ps-last')).toContainText('Bilgisayar:');
    await expect(page.locator('#ps-box')).toHaveAttribute('data-turn', 'me');
    await expect(page.locator('#ps-opp .ps-card')).toHaveCount(3);
    await expect(page.locator('#ps-hand .ps-card')).toHaveCount(3);
  });

  test('arayüz: bir el sonuna kadar oynanır, sonuç penceresi ve sonraki el', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=7&hiz=1`);
    await playHand(page);
    await expect(page.locator('#ps-result')).toBeVisible();
    await expect(page.locator('#ps-result-text')).toContainText('Kart sayısı');
    const t = await page.evaluate(() => (window as any).__pistiTest.state().total as number[]);
    expect(t[0] + t[1]).toBeGreaterThanOrEqual(13); // 13 kart puanı + çoğunluk her elde dağıtılır
    await page.locator('#ps-next').click();
    await expect(page.locator('#ps-result')).toBeHidden();
    await expect(page.locator('#ps-box')).toHaveAttribute('data-hand', '1');
    await expect(page.locator('#ps-score-me')).toHaveText(String(t[0]));
  });

  test('ayarlar kalıcıdır ve bozuk localStorage çökmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => { try { localStorage.setItem('ba-oyun-pisti', '{{{bozuk'); } catch { /* yoksay */ } });
    await page.goto(`${URL_PATH}?hiz=1`);
    await expect(page.locator('#ps-hand .ps-card')).toHaveCount(4);
    await expect(page.locator('#ps-stats')).toContainText('0 oyun');
    await page.selectOption('#ps-level', 'zor');
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-oyun-pisti') || '{}'));
    expect(saved.level).toBe('zor');
    // yanlış türde veri
    await page.evaluate(() => localStorage.setItem('ba-oyun-pisti', JSON.stringify({ played: 'x', won: -4, level: 7, target: 'a' })));
    await page.reload();
    await expect(page.locator('#ps-hand .ps-card')).toHaveCount(4);
    await expect(page.locator('#ps-level')).toHaveValue('orta');
    expect(errors).toEqual([]);
  });

  test('klavye ile oynanır (Sekme + Enter) ve kartların erişilebilir adı vardır', async ({ page }) => {
    await page.goto(`${URL_PATH}?seed=2&hiz=1`);
    const first = page.locator('#ps-hand button').first();
    const label = await first.getAttribute('aria-label');
    expect(label).toMatch(/(Maça|Kupa|Karo|Sinek) /);
    await first.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#ps-hand .ps-card')).toHaveCount(3);
    await expect(page.locator('#ps-box')).toHaveAttribute('data-turn', 'me');
  });

  test('360px genişlikte taşma yok ve kartlar sığar; tam ekran düğmesi var', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`${URL_PATH}?seed=4&hiz=1`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const box = await page.locator('#ps-hand').boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    await expect(page.locator('#ps-full')).toBeVisible();
  });
});
