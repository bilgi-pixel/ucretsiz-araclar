import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Mahjong taş eşleştirme: motor (serbest taş, çözülebilir dağıtım, çözücü, eşleşme, geri al, karıştır),
// arayüz akışı (ipucu, eşleştirme, kazanma, en iyi süre), bozuk localStorage, içerik, reklam, JSON-LD, 360px.
const URL_PATH = '/oyunlar/mahjong-eslestirme/';

async function withEngine<T>(page: Page, fn: string): Promise<T> {
  await page.goto(`${URL_PATH}?layout=kale&seed=1`);
  return page.evaluate(`(async () => { const E = await import('/oyunlar/mahjong-eslestirme/engine.js'); ${fn} })()`) as Promise<T>;
}

/** İpucu tuşuyla işaretlenen iki taşı tıklayarak kaldırır. */
async function playHintStep(page: Page) {
  await page.locator('#mj-hint').click();
  const tiles = page.locator('.mj-tile[data-hint="1"]');
  await expect(tiles).toHaveCount(2);
  const ids = await tiles.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.i));
  for (const id of ids) await page.locator(`.mj-tile[data-i="${id}"]`).evaluate((el) => (el as HTMLElement).click());
}

test.describe('Oyun: mahjong eşleştirme', () => {
  test('sayfa açılır, içerik ≥900 kelime, 3 reklam, JSON-LD, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${URL_PATH}?seed=3`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(144); // varsayılan: kaplumbağa
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
    expect(slots).toEqual(['oyun-mahjong-eslestirme-a', 'oyun-mahjong-eslestirme-b', 'oyun-mahjong-eslestirme-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const after = await page.evaluate(() => !!(document.querySelector('.game-box')!.compareDocumentPosition(document.querySelector('[data-slot="oyun-mahjong-eslestirme-a"]')!) & Node.DOCUMENT_POSITION_FOLLOWING));
    expect(after).toBe(true);
  });

  test('motor: serbest taş tespiti (üstü kapalı değil, sağ ya da sol kenarı açık)', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const out = {};
      // Satırda üç taş ve ortadaki taşın üstünde bir taş
      const b = E.makeBoard([[0, 0, 0], [2, 0, 0], [4, 0, 0], [2, 0, 1]]);
      const alive = new Uint8Array([1, 1, 1, 1]);
      out.free = E.freeTiles(b, alive); // 0 ve 2 uçlarda, 3 üstte ve serbest; 1 üstü kapalı
      alive[3] = 0;
      out.midBlockedSides = E.isFree(b, alive, 1); // üstü açık ama iki yanı kapalı
      alive[0] = 0;
      out.midLeftOpen = E.isFree(b, alive, 1); // sol açıldı
      alive[0] = 1; alive[2] = 0;
      out.midRightOpen = E.isFree(b, alive, 1);
      // yarım kaydırılmış satır (y farkı 1): komşuluk sayılır
      const b2 = E.makeBoard([[0, 0, 0], [2, 1, 0], [4, 0, 0]]);
      out.offsetBlocked = E.isFree(b2, new Uint8Array([1, 1, 1]), 1);
      // taş, katmanı dışında bir taşla örtülmez (uzak üst taş)
      const b3 = E.makeBoard([[0, 0, 0], [6, 0, 1]]);
      out.farAbove = E.isFree(b3, new Uint8Array([1, 1]), 0);
      return out;
    `);
    expect(r.free).toEqual([0, 2, 3]);
    expect(r.midBlockedSides).toBe(false);
    expect(r.midLeftOpen).toBe(true);
    expect(r.midRightOpen).toBe(true);
    expect(r.offsetBlocked).toBe(false);
    expect(r.farAbove).toBe(true);
  });

  test('motor: yerleşimler ve taş sayıları; her dağıtım çözücüyle çözülebilir', async ({ page }) => {
    test.setTimeout(60000);
    const r = await withEngine<Record<string, unknown>>(page, `
      const out = { counts: {}, solved: [], replay: [], faceCounts: {} };
      for (const k of E.LAYOUT_KEYS) out.counts[k] = E.LAYOUTS[k].positions.length;
      for (const k of ['kale', 'piramit']) {
        for (let s = 1; s <= 6; s++) {
          const g = E.createGame(k, E.mulberry32(s));
          // bağımsız çözücü, bilinen çözümü kullanmadan arar
          const noHint = { ...g, solution: null };
          const sol = E.solve(noHint, 200000);
          out.solved.push(k + s + ':' + (sol ? sol.length : 'yok'));
          // bilinen çözümü oyun kurallarıyla oynat
          for (const [a, b] of g.solution) if (!E.removePair(g, a, b)) { out.replay.push(k + s + ' hatalı'); break; }
          if (!E.isWon(g)) out.replay.push(k + s + ' bitmedi');
        }
      }
      // kaplumbağa: çözücü ve yeniden oynatma
      for (let s = 1; s <= 2; s++) {
        const g = E.createGame('kaplumbaga', E.mulberry32(s));
        const sol = E.solve({ ...g, solution: null }, 300000);
        out.solved.push('kaplumbaga' + s + ':' + (sol ? sol.length : 'yok'));
        for (const [a, b] of g.solution) if (!E.removePair(g, a, b)) { out.replay.push('kaplumbaga' + s + ' hatalı'); break; }
        if (!E.isWon(g)) out.replay.push('kaplumbaga' + s + ' bitmedi');
      }
      // her yüzün sayısı çift ve gruplar tam
      const g = E.createGame('kaplumbaga', E.mulberry32(9));
      const cnt = {};
      g.faces.forEach((f) => { const k = E.groupOf(f); cnt[k] = (cnt[k] || 0) + 1; });
      out.faceCounts = { odd: Object.values(cnt).filter((n) => n % 2).length, total: g.faces.length, min: Math.min(...g.faces) };
      return out;
    `);
    expect(r.counts).toEqual({ kaplumbaga: 144, piramit: 80, kale: 60 });
    expect(r.replay).toEqual([]);
    for (const s of r.solved as string[]) {
      const [name, n] = s.split(':');
      const expected = name.startsWith('kaplumbaga') ? 72 : name.startsWith('piramit') ? 40 : 30;
      expect(Number(n), name).toBe(expected);
    }
    expect((r.faceCounts as { odd: number }).odd).toBe(0);
    expect((r.faceCounts as { min: number }).min).toBeGreaterThanOrEqual(0);
  });

  test('motor: eşleşme kuralları, geçersiz çift reddi ve geri al', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const out = {};
      out.sameFace = E.matches(3, 3);
      out.diffFace = E.matches(3, 4);
      out.flowers = E.matches(34, 37);
      out.seasons = E.matches(38, 41);
      out.flowerSeason = E.matches(34, 38);
      const g = E.createGame('kale', E.mulberry32(2));
      const pairs = E.freePairs(g.board, g.alive, g.faces);
      out.hasPairs = pairs.length > 0;
      const [a, b] = pairs[0];
      // eşleşmeyen ya da serbest olmayan çift reddedilir
      const free = E.freeTiles(g.board, g.alive);
      const mismatch = free.find((i) => i !== a && !E.matches(g.faces[i], g.faces[a]));
      out.mismatchRejected = mismatch === undefined ? true : !E.removePair(g, a, mismatch);
      const blocked = [...g.board.positions.keys()].find((i) => !E.isFree(g.board, g.alive, i));
      out.blockedRejected = !E.removePair(g, a, blocked);
      out.sameRejected = !E.removePair(g, a, a);
      const before = g.remaining;
      out.removed = E.removePair(g, a, b);
      out.afterRemove = g.remaining === before - 2 && !g.alive[a] && !g.alive[b];
      out.undone = E.undo(g) && g.remaining === before && !!g.alive[a] && !!g.alive[b];
      out.undoEmpty = E.undo(g);
      return out;
    `);
    expect(r.sameFace).toBe(true);
    expect(r.diffFace).toBe(false);
    expect(r.flowers).toBe(true);
    expect(r.seasons).toBe(true);
    expect(r.flowerSeason).toBe(false);
    expect(r.hasPairs).toBe(true);
    expect(r.mismatchRejected).toBe(true);
    expect(r.blockedRejected).toBe(true);
    expect(r.sameRejected).toBe(true);
    expect(r.removed).toBe(true);
    expect(r.afterRemove).toBe(true);
    expect(r.undone).toBe(true);
    expect(r.undoEmpty).toBe(false);
  });

  test('motor: karıştırma sonrası kalan taşlar yine çözülebilir', async ({ page }) => {
    const r = await withEngine<Record<string, unknown>>(page, `
      const out = [];
      for (let s = 1; s <= 5; s++) {
        const g = E.createGame('piramit', E.mulberry32(s));
        // ilk 10 çiftin bir kısmını oynat, sonra karıştır
        for (const [a, b] of g.solution.slice(0, 10)) E.removePair(g, a, b);
        const remaining = g.remaining;
        const ok = E.reshuffle(g, E.mulberry32(s + 100));
        const sol = E.solve({ ...g, solution: null }, 200000);
        out.push({ ok, same: g.remaining === remaining, solvable: !!sol && sol.length * 2 === g.remaining, shuffles: g.shuffles });
      }
      return out;
    `);
    for (const x of r as Array<{ ok: boolean; same: boolean; solvable: boolean; shuffles: number }>) {
      expect(x).toEqual({ ok: true, same: true, solvable: true, shuffles: 1 });
    }
  });

  test('arayüz: ipucu iki taşı işaretler, eşleştirme taş sayısını azaltır, geri al geri koyar', async ({ page }) => {
    await page.goto(`${URL_PATH}?layout=kale&seed=5`);
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(60);
    await expect(page.locator('#mj-left')).toHaveText('60');
    await expect(page.locator('#mj-undo')).toBeDisabled();
    await playHintStep(page);
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(58);
    await expect(page.locator('#mj-left')).toHaveText('58');
    await expect(page.locator('#mj-undo')).toBeEnabled();
    await page.locator('#mj-undo').click();
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(60);
    // kapalı taşa tıklamak açıklama gösterir ve taş kaldırmaz
    const blocked = page.locator('.mj-tile.blocked').first();
    await blocked.evaluate((el) => (el as HTMLElement).click());
    await expect(page.locator('#mj-status')).toContainText(/serbest|kapalı|üstünde/);
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(60);
  });

  test('arayüz: eşleşmeyen iki serbest taş kaldırılmaz; klavye ile seçim', async ({ page }) => {
    await page.goto(`${URL_PATH}?layout=kale&seed=6`);
    const pair = await page.evaluate(() => {
      const free = [...document.querySelectorAll('.mj-tile.free')] as HTMLElement[];
      for (const a of free) for (const b of free) if (a !== b && a.dataset.face !== b.dataset.face) {
        const ga = Number(a.dataset.face); const gb = Number(b.dataset.face);
        if (ga >= 34 && gb >= 34 && (ga >= 38) === (gb >= 38)) continue;
        return [a.dataset.i, b.dataset.i];
      }
      return null;
    });
    expect(pair).not.toBeNull();
    const [a, b] = pair as string[];
    // klavye: odak verip Enter ile seç
    await page.locator(`.mj-tile[data-i="${a}"]`).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(`.mj-tile[data-i="${a}"]`)).toHaveAttribute('aria-pressed', 'true');
    await page.locator(`.mj-tile[data-i="${b}"]`).evaluate((el) => (el as HTMLElement).click());
    await expect(page.locator('#mj-status')).toContainText('eşleşmiyor');
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(60);
  });

  test('arayüz: ipuçlarıyla kale tamamlanır, kazanma penceresi ve en iyi süre localStorage içine yazılır', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(`${URL_PATH}?layout=kale&seed=8`);
    for (let i = 0; i < 30; i++) await playHintStep(page);
    await expect(page.locator('#mj-win')).toBeVisible();
    await expect(page.locator('#mj-left')).toHaveText('0');
    const store = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-oyun-mahjong-eslestirme') || '{}'));
    expect(store.won).toBe(1);
    expect(store.best.kale).toBeGreaterThanOrEqual(1);
    await page.reload();
    await expect(page.locator('#mj-best')).not.toHaveText('—');
    // karıştır: kazanılmış oyunda yeni oyun açılır
    await page.locator('#mj-new').click();
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(60);
  });

  test('arayüz: karıştır taş sayısını korur ve hamle bulunabilir kalır', async ({ page }) => {
    await page.goto(`${URL_PATH}?layout=piramit&seed=3`);
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(80);
    await playHintStep(page);
    await page.locator('#mj-shuffle').click();
    await expect(page.locator('#mj-board .mj-tile')).toHaveCount(78);
    await expect(page.locator('#mj-status')).toContainText(/karıştırıl|Hamle kalmadı/);
    await page.locator('#mj-hint').click();
    await expect(page.locator('.mj-tile[data-hint="1"]')).toHaveCount(2);
  });

  test('bozuk localStorage oyunu çökertmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    for (const bad of ['{bozuk', '[1,2,3]', 'null', '{"played":"x","won":-5,"best":{"kale":"a"},"layout":"yok","hints":3}']) {
      await page.addInitScript((v) => { try { localStorage.setItem('ba-oyun-mahjong-eslestirme', v); } catch { /* yok say */ } }, bad);
      await page.goto(`${URL_PATH}?seed=1`);
      await expect(page.locator('#mj-board .mj-tile')).toHaveCount(144);
      await expect(page.locator('#mj-stats')).toContainText('Oynanan: 0');
    }
    expect(errors).toEqual([]);
  });

  test('360px genişlikte sayfa taşmaz; tahta ve düğmeler görünür', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`${URL_PATH}?layout=piramit&seed=4`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const box = await page.locator('#mj-board').boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    await expect(page.locator('#mj-full')).toBeVisible();
    await page.goto(`${URL_PATH}?seed=4`); // klasik büyük yerleşim de sayfayı taşırmamalı
    const over2 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over2).toBeLessThanOrEqual(0);
  });
});
