import { test, expect, Page, Locator } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Solitaire (Klondike): tohumlu dağıtım, kurallar, tıkla-tıkla / sürükle-bırak / klavye, çift tık,
// çekme (1 ve 3 kart), geri al, ipucu, skor/hamle/süre, otomatik tamamla, kazanma ve istatistik,
// bozuk localStorage, 360 px taşma, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/solitaire/';
const KEY = 'ba-oyun-solitaire';

// Kart numarası: takım * 13 + (değer - 1); takım 0 ♠, 1 ♥, 2 ♦, 3 ♣.
const id = (suit: number, rank: number) => suit * 13 + rank - 1;
const run = (suit: number, to: number) => Array.from({ length: to }, (_, i) => id(suit, i + 1));

type CardIn = number | { id: number; up: boolean };
type Partial = {
  tableau?: CardIn[][]; waste?: number[]; foundations?: number[][]; stock?: number[];
  draw?: number; kingOnly?: boolean; moves?: number; score?: number; elapsed?: number; fan?: number;
};

/** Verilen kartların dışındaki tüm kartları desteye (stok) koyarak geçerli bir durum üretir. */
function mk(p: Partial) {
  const used = new Set<number>();
  const mark = (v: number) => used.add(v);
  (p.tableau || []).forEach((c) => c.forEach((x) => mark(typeof x === 'number' ? x : x.id)));
  (p.waste || []).forEach(mark);
  (p.foundations || []).forEach((f) => f.forEach(mark));
  const stock = p.stock ?? Array.from({ length: 52 }, (_, i) => i).filter((i) => !used.has(i));
  return { ...p, stock };
}

type Snap = {
  seed: number; draw: number; kingOnly: boolean; moves: number; score: number; elapsed: number; started: boolean; won: boolean;
  fan: number; stock: number[]; waste: number[]; found: number[][]; tab: { id: number; up: boolean }[][]; historyLength: number;
  selected: unknown; hints: number;
};
const T = (page: Page) => page.evaluate(() => (window as any).__solitaireTest() as Snap);
const setState = (page: Page, p: Partial) => page.evaluate((s) => (window as any).__solitaireTest.setState(s) as boolean, mk(p));
const deal = (page: Page, seed: number, opts?: { draw?: number; kingOnly?: boolean }) =>
  page.evaluate(([s, o]) => (window as any).__solitaireTest.deal(s, o) as Snap, [seed, opts || {}] as const);
const storeOf = (page: Page) => page.evaluate((k) => localStorage.getItem(k), KEY);

const card = (page: Page, cardId: number) => page.locator(`#sl-board .sl-card[data-id="${cardId}"]`);
const status = (page: Page) => page.locator('#sl-status');
// Üst üste binen kartlarda her zaman görünen sol-üst köşeye tıklanır.
const tap = (page: Page, cardId: number) => card(page, cardId).click({ position: { x: 12, y: 5 } });

/** Desteye n kez klavye yolu (detail 0) tıklaması gönderir; uzun çekme döngülerini hızlandırır. */
const drawN = (page: Page, n: number) => page.evaluate((count) => {
  for (let i = 0; i < count; i++) (document.querySelector('#sl-stock button') as HTMLElement).click();
}, n);
const undoN = (page: Page, n: number) => page.evaluate((count) => {
  for (let i = 0; i < count; i++) (document.getElementById('sl-undo') as HTMLElement).click();
}, n);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#sl-board .sl-card').first()).toBeVisible();
  await page.evaluate(() => document.getElementById('sl-board')!.scrollIntoView({ behavior: 'instant', block: 'center' }));
}

/** Fareyle bir kartı (ya da yuvayı) başka bir yığına sürükler. */
async function dragTo(page: Page, src: Locator, dst: Locator) {
  await page.evaluate(() => document.getElementById('sl-board')!.scrollIntoView({ behavior: 'instant', block: 'center' }));
  const a = (await src.boundingBox())!;
  const b = (await dst.boundingBox())!;
  const sx = a.x + a.width / 2; const sy = a.y + Math.min(10, a.height / 4);
  const dx = b.x + b.width / 2; const dy = b.y + b.height / 2;
  await page.mouse.move(sx, sy);
  await page.mouse.down();
  await page.mouse.move(sx + 12, sy + 12, { steps: 2 });
  await page.mouse.move(dx, dy, { steps: 8 });
  await page.mouse.up();
}

// Bağımsız doğrulama için testte yeniden yazılan mulberry32 + Fisher–Yates.
function deckFor(seed: number): number[] {
  let a = seed >>> 0;
  const rng = () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const d = Array.from({ length: 52 }, (_, i) => i);
  for (let i = 51; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

test.describe('Oyun: solitaire', () => {
  test('sayfa açılır, masa kurulur, 3 reklam, 900+ kelime, SSS ve JSON-LD tamam, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Solitaire');
    await expect(page).toHaveTitle(/Solitaire Oyna/);
    // 7 sütun: 1..7 kart, yalnızca sonuncusu açık; 24 kartlık deste
    for (let c = 0; c < 7; c++) {
      await expect(page.locator(`#sl-t${c} .sl-card`)).toHaveCount(c + 1);
      await expect(page.locator(`#sl-t${c} .sl-card.up`)).toHaveCount(1);
    }
    await expect(page.locator('#sl-stock .cnt')).toHaveText('24');
    await expect(page.locator('#sl-moves')).toHaveText('0');
    await expect(page.locator('#sl-time')).toHaveText('0:00');
    await expect(page.locator('#sl-undo')).toBeDisabled();
    await expect(page.locator('#sl-auto')).toBeDisabled();
    expect(await page.locator('.ba-ad').count()).toBe(3);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-solitaire-a', 'oyun-solitaire-b', 'oyun-solitaire-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0); // reklam oyun kutusunun dışında
    const adAfterBox = await page.evaluate(() => {
      const b = document.querySelector('.game-box')!;
      const a = document.querySelector('[data-slot="oyun-solitaire-a"]')!;
      return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adAfterBox).toBe(true);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-content')).toContainText('çözülemeyebilir');
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    expect(ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.getByText('Dosya yüklenmez').first()).toBeVisible();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('sabit tohumla dağıtım tutarlıdır ve bağımsız mulberry32 karıştırmasıyla birebir eşleşir', async ({ page }) => {
    await open(page);
    const a = await deal(page, 4242);
    const b = await deal(page, 4242);
    expect(b).toEqual(a);
    const d = deckFor(4242);
    let p = 0;
    for (let c = 0; c < 7; c++) {
      expect(a.tab[c].length).toBe(c + 1);
      for (let k = 0; k <= c; k++) {
        expect(a.tab[c][k].id, `sütun ${c} kart ${k}`).toBe(d[p++]);
        expect(a.tab[c][k].up).toBe(k === c);
      }
    }
    expect(a.stock).toEqual(d.slice(28));
    expect(new Set([...a.stock, ...a.tab.flat().map((x) => x.id)]).size).toBe(52);
    expect(a.waste).toEqual([]);
    expect(a.found).toEqual([[], [], [], []]);
    // DOM: kart numaraları durumla aynı
    const domIds = await page.locator('#sl-t6 .sl-card.up').getAttribute('data-id');
    expect(Number(domIds)).toBe(a.tab[6][6].id);
    await expect(page.locator('#sl-seed')).toHaveText('4242');
    const other = await deal(page, 4243);
    expect(other.tab.flat().map((x) => x.id)).not.toEqual(a.tab.flat().map((x) => x.id));
    // "Tekrar oyna" aynı sırayı kurar; "Yeni oyun" başka tohum seçer
    await deal(page, 4242);
    await page.locator('#sl-stock button').click();
    await page.locator('#sl-stock button').click();
    expect((await T(page)).moves).toBe(2);
    await page.locator('#sl-replay').click();
    const replay = await T(page);
    expect(replay.seed).toBe(4242);
    expect(replay.tab).toEqual(a.tab);
    expect(replay.stock).toEqual(a.stock);
    expect(replay.moves).toBe(0);
    await page.locator('#sl-new').click();
    expect((await T(page)).seed).not.toBe(4242);
  });

  test('geçerli hamle kabul edilir, geçersiz hamle (aynı renk, yanlış sayı, boş sütuna As dışı) reddedilir', async ({ page }) => {
    await open(page);
    expect(await setState(page, {
      tableau: [[id(1, 6)], [id(0, 7)], [id(2, 8)], [id(3, 5)], [id(2, 7)]],
    })).toBe(true);
    const before = await T(page);
    const click = (c: number) => tap(page, c);

    // aynı renk: kupa 6 -> karo 7
    await click(id(1, 6)); await click(id(2, 7));
    await expect(status(page)).toContainText('Hamle yapılamadı');
    await expect(status(page)).toContainText('zıt renkli');
    // yanlış sayı: sinek 5 -> karo 8
    await click(id(3, 5)); await click(id(2, 8));
    await expect(status(page)).toContainText('Hamle yapılamadı');
    // boş sütuna Papaz dışı kart (klasik kural)
    await click(id(1, 6)); await page.locator('#sl-t5 .sl-slot').click();
    await expect(status(page)).toContainText('Papaz');
    const afterBad = await T(page);
    expect(afterBad.tab).toEqual(before.tab);
    expect(afterBad.moves).toBe(0);
    expect(afterBad.score).toBe(0);
    expect(afterBad.selected).toBeNull();

    // geçerli: kupa 6 (kırmızı) -> maça 7 (siyah)
    await click(id(1, 6));
    await expect(card(page, id(1, 6))).toHaveClass(/sel/);
    await click(id(0, 7));
    const after = await T(page);
    expect(after.tab[0]).toEqual([]);
    expect(after.tab[1].map((x) => x.id)).toEqual([id(0, 7), id(1, 6)]);
    expect(after.moves).toBe(1);
    await expect(page.locator('#sl-moves')).toHaveText('1');
    await expect(page.locator('#sl-t0 .sl-slot')).toBeVisible(); // sütun boşaldı
    // Bir dizinin ilk kartı seçilince dizi birlikte seçilir; aynı karta yeniden dokunmak seçimi kaldırır
    await click(id(0, 7));
    await expect(page.locator('.sl-card.sel')).toHaveCount(2);
    await page.waitForTimeout(450); // çift tıklama penceresi dışında
    await click(id(0, 7));
    await expect(page.locator('.sl-card.sel')).toHaveCount(0);
    await expect(status(page)).toContainText('Seçim kaldırıldı');
  });

  test('stoktan çekme atığa geçer; stok bitince atık yeniden desteye çevrilir', async ({ page }) => {
    await open(page);
    const s0 = await deal(page, 777, { draw: 1 });
    await page.locator('#sl-stock button').click();
    const s1 = await T(page);
    expect(s1.stock.length).toBe(23);
    expect(s1.waste).toEqual([s0.stock[23]]);
    expect(s1.moves).toBe(1);
    await expect(page.locator('#sl-waste .sl-card')).toHaveCount(1);
    await expect(page.locator('#sl-waste .sl-card')).toHaveAttribute('data-id', String(s0.stock[23]));
    await expect(page.locator('#sl-stock .cnt')).toHaveText('23');
    await drawN(page, 23);
    const s2 = await T(page);
    expect(s2.stock.length).toBe(0);
    expect(s2.waste.length).toBe(24);
    await expect(page.locator('#sl-stock .sl-slot')).toBeVisible();
    await expect(page.locator('#sl-stock .sl-slot')).toHaveAttribute('aria-label', /yeniden desteye/);
    await page.locator('#sl-stock .sl-slot').click();
    const s3 = await T(page);
    expect(s3.stock.length).toBe(24);
    expect(s3.waste.length).toBe(0);
    expect(s3.moves).toBe(25);
    // yeniden çevirmede aynı sıra: ilk çekilen kart yine ilk gelir
    await page.locator('#sl-stock button').click();
    expect((await T(page)).waste).toEqual([s0.stock[23]]);
    // atığın üstündeki kart tableau'ya oynanabilir (atık -> sütun +5)
    expect(await setState(page, { waste: [id(3, 6)], tableau: [[id(1, 7)]] })).toBe(true);
    await tap(page, id(3, 6));
    await tap(page, id(1, 7));
    const s4 = await T(page);
    expect(s4.waste).toEqual([]);
    expect(s4.tab[0].map((x) => x.id)).toEqual([id(1, 7), id(3, 6)]);
    expect(s4.score).toBe(5);
  });

  test('çift tıklama As kartını temele gönderir; temele gidemeyen karta çift tık hamle yaptırmaz', async ({ page }) => {
    await open(page);
    await setState(page, { tableau: [[id(0, 1)], [id(1, 5)], [id(2, 1)]] });
    await card(page, id(0, 1)).dblclick();
    let s = await T(page);
    expect(s.found[0]).toEqual([id(0, 1)]);
    expect(s.tab[0]).toEqual([]);
    expect(s.score).toBe(10);
    expect(s.moves).toBe(1);
    await expect(page.locator('#sl-f0 .sl-card')).toHaveAttribute('data-id', String(id(0, 1)));
    // kupa 5 temele gidemez
    await card(page, id(1, 5)).dblclick();
    s = await T(page);
    expect(s.found[1]).toEqual([]);
    expect(s.moves).toBe(1);
    await expect(status(page)).toContainText('Hamle yapılamadı');
    // karo As'ı yanlış temele (3. yığın) sürükleyince doğru takım yığınına gider
    await dragTo(page, card(page, id(2, 1)), page.locator('#sl-f3'));
    s = await T(page);
    expect(s.found[2]).toEqual([id(2, 1)]);
    expect(s.found[3]).toEqual([]);
    expect(s.moves).toBe(2);
  });

  test('geri al sınırsızdır: çekme ve taşıma hamleleri sırayla geri alınır, düğme başta pasiftir', async ({ page }) => {
    await open(page);
    const start = await deal(page, 99, { draw: 1 });
    await expect(page.locator('#sl-undo')).toBeDisabled();
    await drawN(page, 30);
    let s = await T(page);
    expect(s.moves).toBe(30);
    expect(s.historyLength).toBe(30);
    await expect(page.locator('#sl-undo')).toBeEnabled();
    await undoN(page, 30);
    s = await T(page);
    expect(s.moves).toBe(0);
    expect(s.stock).toEqual(start.stock);
    expect(s.waste).toEqual([]);
    await expect(page.locator('#sl-undo')).toBeDisabled();
    // taşıma + açılan kart + skor geri alınır
    await setState(page, { tableau: [[{ id: id(2, 9), up: false }, id(0, 1)], [id(1, 3)]] });
    const before = await T(page);
    await card(page, id(0, 1)).dblclick();
    s = await T(page);
    expect(s.score).toBe(15); // temele 10 + kapalı kart açma 5
    expect(s.tab[0][0].up).toBe(true);
    await page.locator('#sl-undo').click();
    s = await T(page);
    expect(s.tab).toEqual(before.tab);
    expect(s.found).toEqual(before.found);
    expect(s.score).toBe(0);
    expect(s.moves).toBe(0);
    // U tuşu da geri alır
    await card(page, id(0, 1)).dblclick();
    expect((await T(page)).moves).toBe(1);
    await page.locator('#sl-f0 .sl-card').focus();
    await page.keyboard.press('u');
    expect((await T(page)).moves).toBe(0);
  });

  test('ipucu bir kartı (ve hedefini) vurgular; temele gidebilen kart önceliklidir; hamle yoksa desteyi önerir', async ({ page }) => {
    await open(page);
    await setState(page, { tableau: [[id(1, 6)], [id(0, 7)], [id(0, 1)]] });
    await page.locator('#sl-hint').click();
    await expect(page.locator('.is-hint').first()).toBeVisible();
    expect(await page.locator('.is-hint').count()).toBeGreaterThanOrEqual(2);
    await expect(card(page, id(0, 1))).toHaveClass(/is-hint/); // As temele gitmeli
    await expect(page.locator('#sl-f0 .sl-slot')).toHaveClass(/is-hint/);
    await expect(status(page)).toContainText('İpucu');
    await expect(status(page)).toContainText('temele');
    // yeniden basınca sıradaki öneri
    await page.locator('#sl-hint').click();
    await expect(status(page)).toContainText('İpucu');
    expect(await page.locator('.is-hint').count()).toBeGreaterThanOrEqual(1);
    // ipucu oyun durumunu değiştirmez
    expect((await T(page)).moves).toBe(0);
    // taze dağıtımda en az desteyi vurgular
    await deal(page, 5);
    await page.locator('#sl-hint').click();
    expect(await page.locator('.is-hint').count()).toBeGreaterThanOrEqual(1);
    // sütunlarda ve temelde hamle yoksa yalnızca desteyi önerir
    await setState(page, { tableau: [[id(0, 9)], [id(1, 9)]] });
    await page.locator('#sl-hint').click();
    await expect(status(page)).toContainText('Desteden kart çekin');
    await expect(page.locator('#sl-stock button')).toHaveClass(/is-hint/);
  });

  test('3 kart çekme: üç kart atığa gelir, yelpazede üçü görünür, yalnızca üstteki oynanabilir', async ({ page }) => {
    await open(page);
    await deal(page, 321, { draw: 1 });
    await page.locator('#sl-draw').selectOption('3');
    const s0 = await T(page);
    expect(s0.draw).toBe(3); // hamle yokken ayar aynı dağıtıma hemen uygulanır
    expect(s0.seed).toBe(321);
    await page.locator('#sl-stock button').click();
    const s1 = await T(page);
    expect(s1.stock.length).toBe(21);
    expect(s1.waste).toEqual([s0.stock[23], s0.stock[22], s0.stock[21]]);
    expect(s1.moves).toBe(1);
    await expect(page.locator('#sl-waste .sl-card')).toHaveCount(3);
    await expect(page.locator('#sl-waste button.sl-card')).toHaveCount(1);
    await expect(page.locator('#sl-waste button.sl-card')).toHaveAttribute('data-id', String(s0.stock[21]));
    await page.locator('#sl-stock button').click();
    const s2 = await T(page);
    expect(s2.waste.length).toBe(6);
    expect(s2.stock.length).toBe(18);
    await expect(page.locator('#sl-waste .sl-card')).toHaveCount(3);
    // stok bitene kadar 8 çekme, sonra yeniden çevirme
    await drawN(page, 6);
    expect((await T(page)).stock.length).toBe(0);
    await page.locator('#sl-stock .sl-slot').click();
    const s3 = await T(page);
    expect(s3.stock.length).toBe(24);
    expect(s3.waste.length).toBe(0);
    // atığın üstü oynanınca yelpaze küçülür (3 -> 2)
    await setState(page, { draw: 3, waste: [id(3, 6), id(2, 4), id(0, 1)], fan: 3, tableau: [[id(1, 7)]], foundations: [[], [], [], []] });
    await expect(page.locator('#sl-waste .sl-card')).toHaveCount(3);
    await card(page, id(0, 1)).dblclick();
    const s4 = await T(page);
    expect(s4.found[0]).toEqual([id(0, 1)]);
    expect(s4.waste).toEqual([id(3, 6), id(2, 4)]);
    expect(s4.fan).toBe(2);
    await expect(page.locator('#sl-waste .sl-card')).toHaveCount(2);
  });

  test('skor, hamle ve süre: temele +10, atıktan sütuna +5, kapalı kart açma +5, temelden geri alma -15; süre ilk hamlede başlar', async ({ page }) => {
    await open(page);
    await setState(page, {
      tableau: [[{ id: id(1, 13), up: false }, id(0, 1)], [id(1, 7)], [id(2, 2)]],
      waste: [id(3, 6)],
    });
    // hamle yapılmadan süre işlemez
    await page.waitForTimeout(1300);
    expect((await T(page)).elapsed).toBe(0);
    await expect(page.locator('#sl-time')).toHaveText('0:00');
    // As -> temel (+10), altındaki kapalı Papaz açılır (+5)
    await card(page, id(0, 1)).dblclick();
    let s = await T(page);
    expect(s.score).toBe(15);
    expect(s.moves).toBe(1);
    expect(s.tab[0][0].up).toBe(true);
    await expect(page.locator('#sl-score')).toHaveText('15');
    // atık -> sütun (+5): sinek 6 -> kupa 7
    await tap(page, id(3, 6));
    await tap(page, id(1, 7));
    s = await T(page);
    expect(s.score).toBe(20);
    expect(s.moves).toBe(2);
    // temel -> sütun (-15): maça As -> karo 2
    await tap(page, id(0, 1));
    await tap(page, id(2, 2));
    s = await T(page);
    expect(s.score).toBe(5);
    expect(s.moves).toBe(3);
    expect(s.found[0]).toEqual([]);
    await expect(page.locator('#sl-moves')).toHaveText('3');
    // süre ilk hamleden sonra işler
    await expect.poll(async () => (await T(page)).elapsed, { timeout: 5000 }).toBeGreaterThanOrEqual(1000);
    await expect(page.locator('#sl-time')).not.toHaveText('0:00');
    // skor sıfırın altına inmez
    await setState(page, { tableau: [[id(2, 2)]], foundations: [[id(0, 1)], [], [], []], score: 0 });
    await tap(page, id(0, 1));
    await tap(page, id(2, 2));
    s = await T(page);
    expect(s.tab[0].map((x) => x.id)).toEqual([id(2, 2), id(0, 1)]);
    expect(s.score).toBe(0);
  });

  test('sürükle-bırak: tek kart, çok kartlı dizi ve geçersiz bırakma (kart yerine döner)', async ({ page }) => {
    await open(page);
    await setState(page, {
      tableau: [[id(0, 9), id(2, 8), id(3, 7)], [id(1, 10)], [id(0, 4)], [id(3, 13)]],
    });
    // çok kartlı dizi: maça 9 + karo 8 + sinek 7 -> kupa 10
    await dragTo(page, card(page, id(0, 9)), card(page, id(1, 10)));
    let s = await T(page);
    expect(s.tab[0]).toEqual([]);
    expect(s.tab[1].map((x) => x.id)).toEqual([id(1, 10), id(0, 9), id(2, 8), id(3, 7)]);
    expect(s.moves).toBe(1);
    await expect(page.locator('.sl-ghost')).toHaveCount(0);
    await expect(page.locator('.is-dragging')).toHaveCount(0);
    // geçersiz: maça 4 boş sütuna (klasik kural) -> kart yerinde kalır
    await dragTo(page, card(page, id(0, 4)), page.locator('#sl-t0'));
    s = await T(page);
    expect(s.tab[2].map((x) => x.id)).toEqual([id(0, 4)]);
    expect(s.tab[0]).toEqual([]);
    expect(s.moves).toBe(1);
    await expect(status(page)).toContainText('Hamle yapılamadı');
    await expect(page.locator('.sl-ghost')).toHaveCount(0);
    await expect(page.locator('.is-dragging')).toHaveCount(0);
    // Papaz boş sütuna sürüklenir
    await dragTo(page, card(page, id(3, 13)), page.locator('#sl-t0'));
    s = await T(page);
    expect(s.tab[0].map((x) => x.id)).toEqual([id(3, 13)]);
    expect(s.tab[3]).toEqual([]);
    expect(s.moves).toBe(2);
  });

  test('boş sütun seçeneği: "herhangi bir kart" ile As dışı kart da boş sütuna konur; ayar oyun sürerken sonraki dağıtıma kalır', async ({ page }) => {
    await open(page);
    await setState(page, { tableau: [[id(1, 6)], [], [id(0, 4)]], kingOnly: false });
    await expect(page.locator('#sl-empty')).toHaveValue('any');
    await tap(page, id(1, 6));
    await page.locator('#sl-t1 .sl-slot').click();
    let s = await T(page);
    expect(s.tab[1].map((x) => x.id)).toEqual([id(1, 6)]);
    expect(s.moves).toBe(1);
    // oyun sürerken ayarı değiştirmek durumu bozmaz; yeni dağıtımda geçerli olur
    await page.locator('#sl-empty').selectOption('king');
    await expect(status(page)).toContainText('yeni dağıtımda');
    s = await T(page);
    expect(s.kingOnly).toBe(false);
    expect(s.tab[1].map((x) => x.id)).toEqual([id(1, 6)]);
    await page.locator('#sl-new').click();
    expect((await T(page)).kingOnly).toBe(true);
    const saved = JSON.parse((await storeOf(page))!);
    expect(saved.kingOnly).toBe(true);
  });

  test('klavye: Tab yığınlar arasında gezer, Enter seçer/bırakır, oklar yığınlar arasında dolaştırır, Esc seçimi kaldırır', async ({ page }) => {
    await open(page);
    await setState(page, { tableau: [[id(1, 6)], [id(0, 7)], [id(0, 1)]] });
    // Tab sırası: deste -> atık -> 4 temel -> sütunlar
    await page.locator('#sl-stock button').focus();
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-waste');
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-f0');
    for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-t0');
    // Enter ile seç, Esc ile vazgeç
    await page.keyboard.press('Enter');
    await expect(card(page, id(1, 6))).toHaveClass(/sel/);
    await expect(card(page, id(1, 6))).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('.sl-card.sel')).toHaveCount(0);
    // seç, sağ ok ile yandaki sütuna geç, Enter ile bırak
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowRight');
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-t1');
    await page.keyboard.press('Enter');
    let s = await T(page);
    expect(s.tab[1].map((x) => x.id)).toEqual([id(0, 7), id(1, 6)]);
    expect(s.tab[0]).toEqual([]);
    expect(s.moves).toBe(1);
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-t1');
    // yukarı ok üst sıraya çıkar; aşağı ok sütuna döner
    await page.keyboard.press('ArrowRight');
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-t2');
    await page.keyboard.press('ArrowUp');
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-waste');
    await page.keyboard.press('ArrowDown');
    expect(await page.evaluate(() => document.activeElement!.closest('.sl-pile')!.id)).toBe('sl-t1');
    // F tuşu: odaktaki üst kartı temele gönderir
    await page.locator('#sl-t2 .sl-card').focus();
    await page.keyboard.press('f');
    s = await T(page);
    expect(s.found[0]).toEqual([id(0, 1)]);
    // Enter ile desteden çek
    await page.locator('#sl-stock button').focus();
    await page.keyboard.press('Enter');
    s = await T(page);
    expect(s.waste.length).toBe(1);
    // dizi içinde yukarı/aşağı ok: iki açık kartlı sütunda üst karttan alttakine
    await setState(page, { tableau: [[id(0, 9), id(2, 8)], [id(1, 10)]] });
    await page.locator('#sl-t0 .sl-card[data-idx="1"]').focus();
    await page.keyboard.press('ArrowUp');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.idx)).toBe('0');
    await page.keyboard.press('Enter'); // maça 9 + karo 8 birlikte seçilir
    await expect(page.locator('#sl-t0 .sl-card.sel')).toHaveCount(2);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    s = await T(page);
    expect(s.tab[1].map((x) => x.id)).toEqual([id(1, 10), id(0, 9), id(2, 8)]);
  });

  test('otomatik tamamla: tüm kartlar açıkken düğme etkinleşir ve oyunu bitirir', async ({ page }) => {
    await open(page);
    await expect(page.locator('#sl-auto')).toBeDisabled();
    await setState(page, {
      foundations: [run(0, 10), run(1, 10), run(2, 10), run(3, 10)],
      tableau: [
        [id(0, 13), id(2, 12), id(3, 11)],
        [id(1, 13), id(3, 12), id(0, 11)],
        [id(2, 13), id(0, 12), id(1, 11)],
        [id(3, 13), id(1, 12), id(2, 11)],
      ],
      stock: [],
    });
    await expect(page.locator('#sl-auto')).toBeEnabled();
    await page.locator('#sl-auto').click();
    await expect(page.locator('#sl-board')).toHaveAttribute('data-state', 'won', { timeout: 15_000 });
    const s = await T(page);
    expect(s.found.map((f) => f.length)).toEqual([13, 13, 13, 13]);
    expect(s.won).toBe(true);
    expect(s.moves).toBe(12);
    await expect(page.locator('#sl-result')).toHaveClass(/is-active/);
    // kapalı kart varken düğme pasiftir
    await setState(page, {
      foundations: [run(0, 10), run(1, 10), run(2, 10), run(3, 10)],
      tableau: [
        [{ id: id(0, 13), up: false }, id(2, 12), id(3, 11)],
        [id(1, 13), id(3, 12), id(0, 11)],
        [id(2, 13), id(0, 12), id(1, 11)],
        [id(3, 13), id(1, 12), id(2, 11)],
      ],
      stock: [],
    });
    await expect(page.locator('#sl-auto')).toBeDisabled();
  });

  test('otomatik tamamlama sürerken "Yeni oyun" seçilirse eski oyunun zamanlayıcısı yeni dağıtıma dokunmaz', async ({ page }) => {
    await open(page);
    await setState(page, {
      foundations: [run(0, 10), run(1, 10), run(2, 10), run(3, 10)],
      tableau: [
        [id(0, 13), id(2, 12), id(3, 11)],
        [id(1, 13), id(3, 12), id(0, 11)],
        [id(2, 13), id(0, 12), id(1, 11)],
        [id(3, 13), id(1, 12), id(2, 11)],
      ],
      stock: [],
    });
    await page.evaluate(() => { document.getElementById('sl-auto')!.click(); document.getElementById('sl-new')!.click(); });
    await page.waitForTimeout(600);
    const s = await T(page);
    expect(s.won).toBe(false);
    expect(s.moves).toBe(0);
    expect(s.found).toEqual([[], [], [], []]);
    expect(s.stock.length).toBe(24);
  });

  test('kazanma: son hamleden sonra kazanma ekranı, animasyon ve localStorage istatistiği yazılır', async ({ page }) => {
    await open(page);
    expect(await storeOf(page)).toBeNull();
    await setState(page, { foundations: [run(0, 13), run(1, 13), run(2, 13), run(3, 12)], tableau: [[id(3, 13)]], stock: [] });
    await card(page, id(3, 13)).dblclick();
    await expect(page.locator('#sl-result')).toHaveClass(/is-active/);
    await expect(page.locator('#sl-result')).toContainText('Tebrikler');
    await expect(page.locator('#sl-board')).toHaveAttribute('data-state', 'won');
    expect(await page.locator('.sl-fx i').count()).toBeGreaterThan(5);
    const s = await T(page);
    expect(s.won).toBe(true);
    expect(s.found.every((f) => f.length === 13)).toBe(true);
    expect(s.moves).toBe(1);
    expect(s.score).toBe(10);
    const saved = JSON.parse((await storeOf(page))!);
    expect(saved.played).toBe(1);
    expect(saved.won).toBe(1);
    expect(saved.bestMoves).toBe(1);
    expect(saved.bestTime).toBeGreaterThanOrEqual(1);
    await expect(page.locator('#sl-st-won')).toHaveText('1');
    await expect(page.locator('#sl-st-played')).toHaveText('1');
    await expect(page.locator('#sl-st-moves')).toHaveText('1');
    await expect(page.locator('#sl-st-time')).not.toHaveText('—');
    // kazanılmış oyunda hamle yapılmaz, geri al kapalıdır
    await expect(page.locator('#sl-undo')).toBeDisabled();
    await expect(page.locator('#sl-hint')).toBeDisabled();
    // yeni oyun: kazanma ekranı ve animasyon kalkar; istatistik korunur
    await page.locator('#sl-again').click();
    await expect(page.locator('#sl-result')).not.toHaveClass(/is-active/);
    await expect(page.locator('.sl-fx')).toHaveCount(0);
    expect((await T(page)).won).toBe(false);
    const saved2 = JSON.parse((await storeOf(page))!);
    expect(saved2.won).toBe(1);
    // ikinci galibiyet: daha az hamle yoksa rekor değişmez, sayaçlar artar
    await setState(page, { foundations: [run(0, 13), run(1, 13), run(2, 13), run(3, 12)], tableau: [[id(3, 13)]], stock: [], moves: 40 });
    await card(page, id(3, 13)).dblclick();
    const saved3 = JSON.parse((await storeOf(page))!);
    expect(saved3.won).toBe(2);
    expect(saved3.played).toBe(2);
    expect(saved3.bestMoves).toBe(1);
  });

  test('"hareketi azalt" tercihinde kazanma animasyonu oluşturulmaz, kazanma ekranı yine görünür', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await setState(page, { foundations: [run(0, 13), run(1, 13), run(2, 13), run(3, 12)], tableau: [[id(3, 13)]], stock: [] });
    await card(page, id(3, 13)).dblclick();
    await expect(page.locator('#sl-result')).toHaveClass(/is-active/);
    await expect(page.locator('.sl-fx')).toHaveCount(0);
  });

  test('bozuk localStorage verisi oyunu çökertmez; varsayılanlara dönülür ve yeniden yazılır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const bad = ['{bozuk', 'null', '[1,2,3]', '"metin"', '{"played":"x","won":-3,"bestTime":"a","bestMoves":0,"draw":7,"kingOnly":"evet"}', '{"played":2,"won":5,"bestTime":125,"bestMoves":88,"draw":3,"kingOnly":false}'];
    await page.goto(URL_PATH);
    for (const raw of bad) {
      await page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, raw]);
      await page.reload();
      await expect(page.locator('#sl-board .sl-card').first()).toBeVisible();
      await expect(page.locator('#sl-t6 .sl-card')).toHaveCount(7);
      const s = await T(page);
      expect(s.stock.length).toBe(24);
      if (raw.startsWith('{"played":2')) {
        await expect(page.locator('#sl-st-played')).toHaveText('5'); // oynanan >= kazanılan olacak biçimde düzeltilir
        await expect(page.locator('#sl-st-won')).toHaveText('5');
        await expect(page.locator('#sl-st-time')).toHaveText('2:05');
        await expect(page.locator('#sl-st-moves')).toHaveText('88');
        await expect(page.locator('#sl-draw')).toHaveValue('3');
        await expect(page.locator('#sl-empty')).toHaveValue('any');
      } else {
        await expect(page.locator('#sl-st-played')).toHaveText('0');
        await expect(page.locator('#sl-st-won')).toHaveText('0');
        await expect(page.locator('#sl-st-time')).toHaveText('—');
        await expect(page.locator('#sl-st-moves')).toHaveText('—');
        await expect(page.locator('#sl-draw')).toHaveValue('1');
        await expect(page.locator('#sl-empty')).toHaveValue('king');
      }
      // oyun oynanabilir ve ilk hamle kaydı geçerli JSON olarak yazar
      await page.locator('#sl-stock button').click();
      expect((await T(page)).moves).toBe(1);
      const saved = JSON.parse((await storeOf(page))!);
      expect(typeof saved.played).toBe('number');
      expect(saved.played).toBeGreaterThanOrEqual(1);
    }
    expect(errors).toEqual([]);
  });

  test('360px genişlikte yatay taşma yok; kartlar daralır ve masa ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const external = trackExternalRequests(page);
    await open(page);
    const check = async (label: string) => {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, label).toBeLessThanOrEqual(0);
      const box = (await page.locator('#sl-board').boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(360);
      // her kart masa sınırları içinde
      const out = await page.evaluate(() => {
        const b = document.getElementById('sl-board')!.getBoundingClientRect();
        return [...document.querySelectorAll('#sl-board .sl-card')].filter((c) => {
          const r = c.getBoundingClientRect();
          return r.left < b.left - 1 || r.right > 360;
        }).length;
      });
      expect(out, label + ': taşan kart').toBe(0);
    };
    await check('ilk dağıtım');
    const w = (await page.locator('#sl-t0 .sl-card').boundingBox())!.width;
    expect(w).toBeGreaterThanOrEqual(34);
    expect(w).toBeLessThanOrEqual(52);
    // uzun sütun: 6 kapalı + açık K..A dizisi
    const longCol: CardIn[] = [
      ...[id(2, 5), id(2, 6), id(2, 7), id(2, 8), id(2, 9), id(2, 10)].map((x) => ({ id: x, up: false })),
      id(0, 13), id(1, 12), id(0, 11), id(1, 10), id(0, 9), id(1, 8), id(0, 7), id(1, 6), id(0, 5), id(1, 4), id(0, 3), id(1, 2), id(0, 1),
    ];
    await setState(page, { tableau: [[], [], [], [], [], [], longCol], waste: [id(3, 6), id(3, 7), id(3, 8)], draw: 3, fan: 3 });
    await check('uzun sütun + 3 kart yelpaze');
    // başlık ve düğmeler de taşmaz
    await check('son');
    expect(external).toEqual([]);
  });
});
