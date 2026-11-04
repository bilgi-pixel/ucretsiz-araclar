import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Çizgi Bağla: sayfa yapısı, 75 bulmacanın tek çözüm denetimi, fareyle çözüm ve kesme/geri sarma,
// klavyeyle çizim, ipucu, seviye seçimi + kayıt/devam, bozuk kayıt, 360px dokunma, tam ekran.
const URL_PATH = '/oyunlar/cizgi-bagla/';
const STORE_KEY = 'ba-oyun-cizgi-bagla';

type Hook = {
  id: string; n: number; k: number; state: string; levels: number;
  pairs: number[][]; solution: number[][]; paths: number[][];
  connected: number; fill: number; moves: number; hints: number;
};

const board = (page: Page) => page.locator('#board');
const cell = (page: Page, i: number) => page.locator(`.cb-cell[data-i="${i}"]`);
const hook = (page: Page) => page.evaluate(() => (window as unknown as { __cizgiBaglaTest: () => Hook }).__cizgiBaglaTest());

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(board(page)).toHaveAttribute('data-state', 'oynuyor');
  return errors;
}

// Hücre merkezlerini tahtanın konumundan hesaplar (yumuşak kaydırmaya karşı önce anında kaydırır)
async function centers(page: Page, n: number) {
  await board(page).evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior }));
  const b = (await page.locator('#board-grid').boundingBox())!;
  const s = b.width / n;
  return (i: number): [number, number] => [b.x + (i % n) * s + s / 2, b.y + Math.floor(i / n) * s + s / 2];
}

async function drawPath(page: Page, n: number, cells: number[]) {
  const at = await centers(page, n);
  await page.mouse.move(...at(cells[0]));
  await page.mouse.down();
  for (const i of cells.slice(1)) await page.mouse.move(...at(i), { steps: 2 });
  await page.mouse.up();
}

const arrow = (n: number, a: number, b: number) =>
  (b === a + 1 ? 'ArrowRight' : b === a - 1 ? 'ArrowLeft' : b === a + n ? 'ArrowDown' : 'ArrowUp');

async function keyMoveTo(page: Page, n: number, from: number, to: number) {
  const dr = Math.floor(to / n) - Math.floor(from / n);
  const dc = (to % n) - (from % n);
  for (let k = 0; k < Math.abs(dr); k++) await page.keyboard.press(dr > 0 ? 'ArrowDown' : 'ArrowUp');
  for (let k = 0; k < Math.abs(dc); k++) await page.keyboard.press(dc > 0 ? 'ArrowRight' : 'ArrowLeft');
}

const sameSet = (a: number[], b: number[]) => a.length === b.length && [...a].sort((x, y) => x - y).every((v, i) => v === [...b].sort((x, y) => x - y)[i]);

test.describe('Çizgi Bağla', () => {
  test('sayfa açılır; ≥900 kelime, ≥7 SSS, 3 reklam oyun kutusunun dışında, VideoGame + FAQPage, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page).toHaveTitle(/Çizgi Bağla Oyna/);
    await expect(page.locator('h1')).toContainText('Çizgi Bağla');
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);
    await expect(page.locator('.ba-topbar')).toContainText('%100 ücretsiz');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/cizgi-bagla/');

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-cizgi-bagla-a', 'oyun-cizgi-bagla-b', 'oyun-cizgi-bagla-c']);
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
    expect(ld['@graph'].map((x: { '@type': string }) => x['@type'])).toEqual(['VideoGame', 'FAQPage']);
    const faq = ld['@graph'][1].mainEntity as { name: string }[];
    expect(faq.length).toBeGreaterThanOrEqual(7);
    // JSON-LD soruları sayfadaki SSS ile aynı
    const summaries = await page.locator('.ba-content details summary').allInnerTexts();
    expect(faq.map((q) => q.name)).toEqual(summaries.map((s) => s.trim()));

    // İlgili oyun bağlantıları gerçekten var
    for (const href of await page.locator('.ba-related a').evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href))) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
    await page.waitForTimeout(300);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('75 bulmaca (5×5–9×9, boyut başına 15) çözücüyle tek çözümlü ve kayıtlı çözümle aynı', async ({ page }) => {
    await open(page);
    const res = await page.evaluate(async () => {
      const { BULMACALAR } = await import('/oyunlar/cizgi-bagla/bulmacalar.js');
      const { decodePuzzle, solve, isCompleteSolution } = await import('/oyunlar/cizgi-bagla/cozucu.js');
      const bySize: Record<string, number> = {};
      const bad: string[] = [];
      const seen = new Set<string>();
      BULMACALAR.forEach((raw: { n: number; paths: string[] }, i: number) => {
        bySize[raw.n] = (bySize[raw.n] || 0) + 1;
        const p = decodePuzzle(raw);
        const key = `${p.n}:${p.pairs.map((x: number[]) => [...x].sort((a, b) => a - b).join('-')).sort().join('|')}`;
        if (seen.has(key)) bad.push(`${i}: yinelenen bulmaca`);
        seen.add(key);
        if (!isCompleteSolution(p.n, p.pairs, p.paths)) { bad.push(`${i}: kayıtlı çözüm geçersiz`); return; }
        if (p.paths.some((pa: number[]) => pa.length < 3)) bad.push(`${i}: çok kısa yol`);
        const r = solve(p.n, p.pairs, { limit: 2 });
        if (r.aborted || r.count !== 1) { bad.push(`${i}: çözüm sayısı ${r.count}${r.aborted ? ' (yarıda)' : ''}`); return; }
        // Çözücünün bulduğu tek çözüm kayıtlı çözümle hücre hücre aynı renkte
        const own = (paths: number[][]) => { const o = new Array(p.n * p.n).fill(-1); paths.forEach((pa, c) => pa.forEach((x) => (o[x] = c))); return o.join(','); };
        if (own(r.solution) !== own(p.paths)) bad.push(`${i}: çözücü farklı çözüm buldu`);
      });
      return { total: BULMACALAR.length, bySize, bad };
    });
    expect(res.bad).toEqual([]);
    expect(res.total).toBeGreaterThanOrEqual(60);
    expect(res.bySize).toEqual({ 5: 15, 6: 15, 7: 15, 8: 15, 9: 15 });

    // Çözücü çok çözümlü, tek çözümlü ve çözümsüz bulmacaları da doğru tanır
    const control = await page.evaluate(async () => {
      const { solve } = await import('/oyunlar/cizgi-bagla/cozucu.js');
      return {
        // 3×3, tek renk üst köşelerde: ızgarayı dolduran iki ayrı yol var → çok çözümlü
        multi: solve(3, [[0, 2]], { limit: 10 }).count,
        // 2×2, iki yatay çift → tek çözüm
        single: solve(2, [[0, 1], [2, 3]], { limit: 10 }).count,
        // 2×2, tek renk çapraz köşelerde: yol ızgarayı dolduramaz → çözümsüz
        cornerless: solve(2, [[0, 3]], { limit: 10 }).count,
        // 3×3, iki renk; uçlar çapraz: yollar kesişmek zorunda → çözümsüz
        crossing: solve(3, [[0, 8], [2, 6]], { limit: 10 }).count,
      };
    });
    expect(control).toEqual({ multi: 2, single: 1, cornerless: 0, crossing: 0 });
  });

  test('fareyle çözüm: yollar bağlanır, seviye biter, kusursuz sonuç, ilerleme localStorage\'a yazılır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    const h = await hook(page);
    expect(h.id).toBe('5-1');
    await expect(page.locator('.cb-cell')).toHaveCount(25);
    await expect(page.locator('#st-flows')).toHaveText(`0/${h.k}`);

    for (let c = 0; c < h.k; c++) {
      await drawPath(page, h.n, h.solution[c]);
      if (c < h.k - 1) await expect(board(page)).toHaveAttribute('data-connected', String(c + 1));
    }
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    await expect(board(page)).toHaveAttribute('data-fill', '100');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result-title')).toHaveText('Kusursuz çözüm!');
    await expect(page.locator('#result-text')).toContainText(`${h.k} hamle`);
    await expect(page.locator('#btn-next')).toBeFocused();
    await expect(page.locator('.cb-lv[data-level="5-1"]')).toHaveClass(/is-solved/);
    await expect(page.locator('#progress-text')).toContainText('1/75');

    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.solved['5-1']).toEqual({ m: h.k, h: 0 });
    expect(saved.game).toBeNull();
    expect(saved.cur).toBe('5-2');

    // Bitmiş tahta girdiyi yok sayar
    await cell(page, h.pairs[0][0]).click({ force: true });
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');

    // Sonraki seviye
    await page.locator('#btn-next').click();
    await expect(board(page)).toHaveAttribute('data-level', '5-2');
    await expect(board(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(page.locator('#result')).toBeHidden();

    // Yeniden açılışta çözülen seviye işaretli kalır
    await page.reload();
    await expect(board(page)).toHaveAttribute('data-level', '5-2');
    await expect(page.locator('.cb-lv[data-level="5-1"]')).toHaveClass(/is-solved/);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başka yolun üzerinden geçmek onu keser, geri çekilince yol geri gelir; uç noktası geçilmez; boş hücreden çizim başlamaz', async ({ page }) => {
    const errors = await open(page);
    const h = await hook(page);
    const n = h.n;
    const adj = (a: number, b: number) => Math.abs(a - b) === n || (Math.abs(a - b) === 1 && Math.floor(a / n) === Math.floor(b / n));
    // a renginin ara hücresi x, b renginin ucu e'ye komşu olsun
    let found: { a: number; b: number; e: number; x: number } | null = null;
    for (let a = 0; a < h.k && !found; a++) {
      const inner = h.solution[a].slice(1, -1);
      for (let b = 0; b < h.k && !found; b++) {
        if (a === b) continue;
        for (const e of h.pairs[b]) {
          const x = inner.find((v) => adj(v, e));
          if (x !== undefined) { found = { a, b, e, x }; break; }
        }
      }
    }
    expect(found).not.toBeNull();
    const { a, b, e, x } = found!;
    await drawPath(page, n, h.solution[a]);
    await expect(board(page)).toHaveAttribute('data-connected', '1');

    const at = await centers(page, n);
    await page.mouse.move(...at(e));
    await page.mouse.down();
    await page.mouse.move(...at(x), { steps: 3 });
    // a yolu x'te kesildi: artık bağlı değil
    let cur = await hook(page);
    expect(cur.paths[b]).toEqual([e, x]);
    expect(cur.paths[a].includes(x)).toBe(false);
    expect(cur.connected).toBe(0);
    // Geri çekilince a yolu eski hâline döner
    await page.mouse.move(...at(e), { steps: 3 });
    cur = await hook(page);
    expect(sameSet(cur.paths[a], h.solution[a])).toBe(true);
    expect(cur.connected).toBe(1);
    await page.mouse.up();

    // Başka rengin ucuna yol girmez: q renginin çözüm yolunda, başka bir rengin ucuna komşu bir hücre bul
    await page.locator('#btn-reset').click();
    await expect(board(page)).toHaveAttribute('data-connected', '0');
    let block: { q: number; idx: number; f: number } | null = null;
    for (let q = 0; q < h.k && !block; q++) {
      const pa = h.solution[q];
      for (let idx = 0; idx < pa.length - 1 && !block; idx++) {
        for (let o = 0; o < h.k && !block; o++) {
          if (o === q) continue;
          const f = h.pairs[o].find((v) => adj(v, pa[idx]));
          if (f !== undefined) block = { q, idx, f };
        }
      }
    }
    expect(block).not.toBeNull();
    const { q, idx, f } = block!;
    await drawPath(page, n, [...h.solution[q].slice(0, idx + 1), f]);
    cur = await hook(page);
    expect(cur.paths[q].includes(f)).toBe(false);
    if (idx > 0) expect(cur.paths[q]).toEqual(h.solution[q].slice(0, idx + 1));

    // Boş hücreye tıklamak çizim başlatmaz ve yol gösterir
    await page.locator('#btn-reset').click();
    const empty = h.solution[a][1];
    await cell(page, empty).click();
    await expect(page.locator('#msg')).toContainText('Boş hücreden çizime başlanmaz');
    await expect(board(page)).toHaveAttribute('data-drawing', '-1');
    expect(errors).toEqual([]);
  });

  test('klavye: ok tuşlarıyla gezinme, Enter ile çizim, Esc iptal, Backspace siler; bulmaca yalnızca klavyeyle çözülür', async ({ page }) => {
    const errors = await open(page);
    const h = await hook(page);
    const n = h.n;
    const focused = page.locator('.cb-cell[tabindex="0"]');
    await expect(focused).toHaveCount(1);
    await focused.focus();
    let cur = Number(await board(page).getAttribute('data-cursor'));

    // Boş bir hücrede Enter çizim başlatmaz
    const blank = h.solution[0][1];
    await keyMoveTo(page, n, cur, blank);
    await expect(board(page)).toHaveAttribute('data-cursor', String(blank));
    await expect(cell(page, blank)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#msg')).toContainText('Bu hücre boş');
    cur = blank;

    // Esc ile iptal: yol eski hâline (boş) döner
    const p0 = h.solution[0];
    await keyMoveTo(page, n, cur, p0[0]);
    await page.keyboard.press('Enter');
    await expect(board(page)).toHaveAttribute('data-drawing', '0');
    await page.keyboard.press(arrow(n, p0[0], p0[1]));
    expect((await hook(page)).paths[0]).toEqual([p0[0], p0[1]]);
    await expect(cell(page, p0[1])).toHaveClass(/is-head/);
    await page.keyboard.press('Escape');
    await expect(board(page)).toHaveAttribute('data-drawing', '-1');
    expect((await hook(page)).paths[0].length).toBeLessThanOrEqual(1);
    cur = p0[1];

    // Tüm renkleri klavyeyle çiz
    for (let c = 0; c < h.k; c++) {
      const pa = h.solution[c];
      await keyMoveTo(page, n, cur, pa[0]);
      await page.keyboard.press('Space');
      await expect(board(page)).toHaveAttribute('data-drawing', String(c));
      for (let s = 1; s < pa.length; s++) await page.keyboard.press(arrow(n, pa[s - 1], pa[s]));
      cur = pa[pa.length - 1];
      if (c === 0) {
        // Bağlanınca çizim kendiliğinden biter; Backspace (çizim dışı) yolu siler, sonra yeniden çiz
        await expect(board(page)).toHaveAttribute('data-drawing', '-1');
        await expect(board(page)).toHaveAttribute('data-connected', '1');
        await keyMoveTo(page, n, cur, pa[1]);
        await page.keyboard.press('Backspace');
        await expect(board(page)).toHaveAttribute('data-connected', '0');
        expect((await hook(page)).paths[0].length).toBe(0);
        await keyMoveTo(page, n, pa[1], pa[0]);
        await page.keyboard.press('Enter');
        for (let s = 1; s < pa.length; s++) await page.keyboard.press(arrow(n, pa[s - 1], pa[s]));
        await expect(board(page)).toHaveAttribute('data-connected', '1');
      }
    }
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#btn-next')).toBeFocused();
    // Bir rengi iki kez çizdiğimiz için kusursuz değil
    await expect(page.locator('#result-title')).toHaveText('Tebrikler, seviye tamam!');
    expect(errors).toEqual([]);
  });

  test('ipucu bir yolu çözümdeki hâliyle gösterir, çakışan yolu keser; ipucuyla bitirilen seviye kusursuz sayılmaz', async ({ page }) => {
    const errors = await open(page);
    const h = await hook(page);
    const n = h.n;
    await expect(page.locator('#btn-undo')).toBeDisabled();
    // İlk ipucu bağlanmamış ilk rengi (0) gösterir. Önce başka bir rengi 0'ın çözüm yoluna taşıyalım.
    const adj = (a: number, b: number) => Math.abs(a - b) === n || (Math.abs(a - b) === 1 && Math.floor(a / n) === Math.floor(b / n));
    let clash: { b: number; e: number; x: number } | null = null;
    for (const x of h.solution[0].slice(1, -1)) {
      for (let b = 1; b < h.k && !clash; b++) {
        const e = h.pairs[b].find((v) => adj(v, x));
        if (e !== undefined) clash = { b, e, x };
      }
      if (clash) break;
    }
    expect(clash).not.toBeNull();
    await drawPath(page, n, [clash!.e, clash!.x]);
    expect((await hook(page)).paths[clash!.b]).toEqual([clash!.e, clash!.x]);

    await page.locator('#btn-hint').click();
    let cur = await hook(page);
    expect(cur.hints).toBe(1);
    expect(cur.paths[0]).toEqual(h.solution[0]);
    // Çakışan yol ipucunun geçtiği hücrede kesildi
    expect(cur.paths[clash!.b]).toEqual([clash!.e]);
    const shown = cur.paths.findIndex((pa, c) => pa.length === h.solution[c].length && sameSet(pa, h.solution[c]));
    expect(shown).toBe(0);
    await expect(board(page)).toHaveAttribute('data-connected', '1');
    await expect(page.locator('#msg')).toContainText('İpucu');
    await expect(page.locator('.cb-lines polyline.is-hint')).toHaveCount(1);

    // Geri al ipucunu geri çeker (ipucu sayısı kalır)
    await page.locator('#btn-undo').click();
    await expect(board(page)).toHaveAttribute('data-connected', '0');
    expect((await hook(page)).hints).toBe(1);

    // İpuçlarıyla bitir
    for (let i = 0; i < h.k; i++) {
      if ((await board(page).getAttribute('data-state')) === 'bitti') break;
      await page.locator('#btn-hint').click();
    }
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#result-title')).toHaveText('Tebrikler, seviye tamam!');
    await expect(page.locator('#result-text')).toContainText('ipucu');
    await expect(page.locator('#btn-hint')).toBeDisabled();
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.solved['5-1'].h).toBeGreaterThanOrEqual(1);
    expect(errors).toEqual([]);
  });

  test('seviye seçimi: boyut ve seviye düğmeleri, önceki/sonraki; yarım bulmaca yenilemede korunur; Temizle ve Geri al', async ({ page }) => {
    const errors = await open(page);
    await page.locator('#opt-size').selectOption('9');
    await expect(board(page)).toHaveAttribute('data-level', '9-1');
    await expect(page.locator('.cb-cell')).toHaveCount(81);
    await expect(page.locator('.cb-lv')).toHaveCount(15);
    // Klavyeyle seçilen seviyede odak kaybolmaz: yeniden kurulan düğmelerde yeni seviyenin düğmesine geçer
    await page.locator('.cb-lv[data-level="9-2"]').focus();
    await page.keyboard.press('Enter');
    await expect(board(page)).toHaveAttribute('data-level', '9-2');
    await expect(page.locator('.cb-lv[data-level="9-2"]')).toBeFocused();
    await page.locator('.cb-lv[data-level="9-12"]').click();
    await expect(board(page)).toHaveAttribute('data-level', '9-12');
    await expect(page.locator('.cb-lv[data-level="9-12"]')).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('#st-level')).toHaveText('9×9·12');
    await page.locator('#btn-fwd').click();
    await expect(board(page)).toHaveAttribute('data-level', '9-13');
    await page.locator('#btn-prev').click();
    await expect(board(page)).toHaveAttribute('data-level', '9-12');

    const h = await hook(page);
    expect(h.n).toBe(9);
    expect(h.k).toBeGreaterThanOrEqual(8);
    await drawPath(page, 9, h.solution[0]);
    await drawPath(page, 9, h.solution[1].slice(0, 3));
    await expect(board(page)).toHaveAttribute('data-connected', '1');
    await expect(board(page)).toHaveAttribute('data-moves', '2');

    await page.reload();
    await expect(board(page)).toHaveAttribute('data-level', '9-12');
    await expect(page.locator('#msg')).toContainText('Kayıtlı ilerlemeniz yüklendi');
    const h2 = await hook(page);
    expect(h2.paths[0]).toEqual(h.solution[0]);
    expect(h2.paths[1]).toEqual(h.solution[1].slice(0, 3));
    expect(h2.moves).toBe(2);
    await expect(page.locator('#opt-size')).toHaveValue('9');

    await page.locator('#btn-reset').click();
    await expect(board(page)).toHaveAttribute('data-connected', '0');
    await expect(board(page)).toHaveAttribute('data-moves', '0');
    expect((await hook(page)).paths.every((p) => p.length === 0)).toBe(true);
    await page.locator('#btn-undo').click();
    await expect(board(page)).toHaveAttribute('data-connected', '1');

    // Boyut değişince o boyutun ilk çözülmemiş seviyesi açılır
    await page.locator('#opt-size').selectOption('7');
    await expect(board(page)).toHaveAttribute('data-level', '7-1');
    await expect(page.locator('.cb-cell')).toHaveCount(49);
    expect(errors).toEqual([]);
  });

  test('bozuk ya da geçersiz localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('.cb-cell')).toHaveCount(25);
    const h = await hook(page);
    await drawPath(page, h.n, h.solution[0]);
    await expect(board(page)).toHaveAttribute('data-connected', '1');
    expect(errors).toEqual([]);

    const bad = [
      'null', '[]', '42', '"metin"',
      JSON.stringify({ cur: '9-99', solved: { '5-1': 'x', '5-2': { m: -3, h: 'a' } }, game: { id: '5-1', paths: [[0, 1, 2], [0]] } }),
      JSON.stringify({ cur: '7-3', solved: [], game: { id: '7-3', paths: [[0, 40], [1, 2]], moves: 'çok', hints: -1 } }),
      JSON.stringify({ cur: 5, solved: null, game: [] }),
    ];
    for (const value of bad) {
      const p2 = await page.context().newPage();
      const errs: string[] = [];
      p2.on('pageerror', (e) => errs.push(String(e)));
      await p2.addInitScript(([k, v]) => localStorage.setItem(k, v), [STORE_KEY, value]);
      await p2.goto(URL_PATH);
      await expect(p2.locator('#board')).toHaveAttribute('data-state', 'oynuyor');
      await expect(p2.locator('#board')).toHaveAttribute('data-connected', '0');
      const level = await p2.locator('#board').getAttribute('data-level');
      expect(['5-1', '7-3']).toContain(level);
      expect(errs, value).toEqual([]);
      await p2.close();
    }
  });

  test('360px: 5×5 ve 9×9 taşmaz; dokunarak sürükleme yol çizer', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const external = trackExternalRequests(page);
    const errors = await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);

    const h = await hook(page);
    const pa = h.solution[0];
    await board(page).evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior }));
    await page.locator('#board-grid').evaluate(async (grid, cells) => {
      const n = Math.round(Math.sqrt(grid.querySelectorAll('.cb-cell').length));
      const r = grid.getBoundingClientRect();
      const s = r.width / n;
      const pt = (i: number) => ({ clientX: r.left + (i % n) * s + s / 2, clientY: r.top + Math.floor(i / n) * s + s / 2 });
      const fire = (type: string, i: number) => grid.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: 'touch', isPrimary: true, bubbles: true, cancelable: true, ...pt(i) }));
      fire('pointerdown', cells[0]);
      for (const i of cells.slice(1)) { fire('pointermove', i); await new Promise((res) => setTimeout(res, 10)); }
      fire('pointerup', cells[cells.length - 1]);
    }, pa);
    await expect(board(page)).toHaveAttribute('data-connected', '1');
    expect((await hook(page)).paths[0]).toEqual(pa);

    await page.locator('#opt-size').selectOption('9');
    await expect(page.locator('.cb-cell')).toHaveCount(81);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const cellBox = (await page.locator('.cb-cell').first().boundingBox())!;
    expect(cellBox.width).toBeGreaterThanOrEqual(24);
    const boardBox = (await board(page).boundingBox())!;
    expect(boardBox.x).toBeGreaterThanOrEqual(0);
    expect(boardBox.x + boardBox.width).toBeLessThanOrEqual(360);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kontrast: uç harfleri noktanın renginde en az 4.5:1; noktalar ve yollar konturlu', async ({ page }) => {
    const errors = await open(page);
    await page.locator('#opt-size').selectOption('9');
    await expect(board(page)).toHaveAttribute('data-level', '9-1');
    const h = await hook(page);
    expect(h.k).toBe(10); // kullanılan 10 rengin hepsi bu seviyede
    const ratios = await page.evaluate(() => {
      const lum = (hex: string) => {
        const v = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
        return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
      };
      const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
      return Array.from(document.querySelectorAll('.cb-ends g')).map((g) => ({
        c: g.getAttribute('data-c'),
        r: ratio(g.querySelector('.cb-dot')!.getAttribute('fill')!, g.querySelector('text')!.getAttribute('fill')!),
        stroke: getComputedStyle(g.querySelector('.cb-dot')!).stroke,
      }));
    });
    expect(ratios.length).toBe(20);
    for (const x of ratios) {
      expect(x.r, `renk ${x.c}`).toBeGreaterThanOrEqual(4.5);
      expect(x.stroke).not.toBe('none');
    }
    await page.locator('#btn-hint').click();
    await expect(page.locator('.cb-lines polyline.cb-case')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test('tam ekran düğmesi oyun kutusunu tam ekran yapar (reklamlar kutunun dışında kalır)', async ({ page }) => {
    const errors = await open(page);
    await expect(page.locator('#btn-full')).toBeVisible();
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await expect(page.locator('#btn-full')).toHaveAttribute('aria-pressed', 'true');
    expect(await page.locator('#game-box .ba-ad').count()).toBe(0);
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement)).toBeNull();
    expect(errors).toEqual([]);
  });
});
