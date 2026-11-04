import { test, expect, Page, Locator } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Örümcek Solitaire: 104 kartlık tohumlu dağıtım (54 masada + 50 destede), 1/2/4 renk kuralları,
// karışık renkli dizinin taşınamaması, boş sütunda dağıtım kuralı, Papaz→As dizisinin kalkması (+100),
// 8 dizi → kazanma, otomatik tamamla, klavye (Tab/Enter/D/Ctrl+Z), hatalı dağıtım no, bozuk localStorage, 360 px.
const URL_PATH = '/oyunlar/orumcek-solitaire/';
const KEY = 'ba-oyun-orumcek-solitaire';
const TOTAL = 104;

// Kart numarası: set * 13 + (değer - 1). Setin takımı: 1 renk → hep maça; 2 renk → set çift maça, tek kupa;
// 4 renk → set % 4 (0 maça, 1 kupa, 2 karo, 3 sinek).
const id = (set: number, rank: number) => set * 13 + rank - 1;
/** Bir setin Papaz'dan verilen değere kadar azalan kartları. */
const desc = (set: number, from: number, to: number) => Array.from({ length: from - to + 1 }, (_, i) => id(set, from - i));

type CardIn = number | { id: number; up: boolean };
type St = { tableau?: CardIn[][]; done?: number[]; stock?: number[]; suits?: number; strict?: boolean; moves?: number; seed?: number };
type Snap = {
  seed: number; suits: number; strict: boolean; moves: number; score: number; elapsed: number; started: boolean; won: boolean;
  stock: number[]; stockCount: number; done: number[]; tab: { id: number; up: boolean; suit: number; rank: number }[][];
  tableCount: number; historyLength: number; selected: { c: number; idx: number } | null; hints: string[]; canAuto: boolean;
};

/** Verilmeyen kartlardan desteyi, toplam (masa + deste + 13 × tamamlanan) 104 olacak biçimde doldurur. */
function mk(p: St) {
  const used = new Set<number>();
  (p.tableau || []).forEach((c) => c.forEach((x) => used.add(typeof x === 'number' ? x : x.id)));
  const need = TOTAL - used.size - 13 * (p.done || []).length;
  const stock = p.stock ?? Array.from({ length: TOTAL }, (_, i) => i).filter((i) => !used.has(i)).slice(0, need);
  return { ...p, stock };
}

const T = (page: Page) => page.evaluate(() => (window as any).__orumcekSolitaireTest() as Snap);
const setState = async (page: Page, p: St) => {
  const ok = await page.evaluate((s) => (window as any).__orumcekSolitaireTest.setState(s) as boolean, mk(p));
  expect(ok, 'test durumu kurulamadı').toBe(true);
};
const deal = (page: Page, seed: number, opts: object = {}) => page.evaluate(([s, o]) => (window as any).__orumcekSolitaireTest.deal(s, o) as Snap, [seed, opts] as const);
const storeOf = (page: Page) => page.evaluate((k) => localStorage.getItem(k), KEY);
const status = (page: Page) => page.locator('#sp-status');
const card = (page: Page, cardId: number) => page.locator(`#sp-board .sp-card[data-pile="t"][data-id="${cardId}"]`);
// Üst üste binen kartlarda her zaman görünen sol üst köşeye tıklanır.
const tap = (page: Page, cardId: number) => card(page, cardId).click({ position: { x: 8, y: 5 } });
const ids = (s: Snap, c: number) => s.tab[c].map((x) => x.id);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#sp-board .sp-card').first()).toBeVisible();
  await page.evaluate(() => document.getElementById('sp-board')!.scrollIntoView({ behavior: 'instant', block: 'center' }));
}

async function dragTo(page: Page, src: Locator, dst: Locator) {
  await page.evaluate(() => document.getElementById('sp-board')!.scrollIntoView({ behavior: 'instant', block: 'center' }));
  const a = (await src.boundingBox())!;
  const b = (await dst.boundingBox())!;
  const sx = a.x + a.width / 2; const sy = a.y + Math.min(8, a.height / 5);
  const dx = b.x + b.width / 2; const dy = b.y + b.height / 2;
  await page.mouse.move(sx, sy);
  await page.mouse.down();
  await page.mouse.move(sx + 12, sy + 12, { steps: 2 });
  await page.mouse.move(dx, dy, { steps: 8 });
  await page.mouse.up();
}

// Bağımsız doğrulama için testte yeniden yazılan mulberry32 + Fisher–Yates (104 kart).
function deckFor(seed: number): number[] {
  let a = seed >>> 0;
  const rng = () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const d = Array.from({ length: TOTAL }, (_, i) => i);
  for (let i = TOTAL - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

test.describe('Oyun: örümcek solitaire', () => {
  test('sayfa açılır: masada 54, destede 50 kart; dağıtım her sütuna 1 kart verir; 3 reklam, 900+ kelime, SSS, JSON-LD; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page).toHaveTitle(/Örümcek Solitaire Oyna/);
    await expect(page.locator('h1')).toContainText('Örümcek Solitaire');
    for (let c = 0; c < 10; c++) {
      await expect(page.locator(`#sp-t${c} .sp-card`)).toHaveCount(c < 4 ? 6 : 5);
      await expect(page.locator(`#sp-t${c} .sp-card.up`)).toHaveCount(1);
    }
    await expect(page.locator('#sp-board .sp-card[data-pile="t"]')).toHaveCount(54);
    let s = await T(page);
    expect(s.tableCount).toBe(54);
    expect(s.stockCount).toBe(50);
    expect(new Set([...s.stock, ...s.tab.flat().map((x) => x.id)]).size).toBe(TOTAL);
    await expect(page.locator('#sp-stock .cnt')).toHaveText('5');
    await expect(page.locator('#sp-score')).toHaveText('500');
    await expect(page.locator('#sp-moves')).toHaveText('0');
    await expect(page.locator('#sp-sets')).toHaveText('0/8');
    await expect(page.locator('#sp-undo')).toBeDisabled();
    await expect(page.locator('#sp-auto')).toBeDisabled();
    await expect(page.locator('#sp-result')).toBeHidden();

    // dağıtım: her sütuna bir açık kart, deste 40'a iner, hamle 1, puan 499
    const before = s.tab.map((c) => c.length);
    await page.locator('#sp-deal').click();
    s = await T(page);
    expect(s.stockCount).toBe(40);
    expect(s.tableCount).toBe(64);
    s.tab.forEach((c, i) => { expect(c.length).toBe(before[i] + 1); expect(c[c.length - 1].up).toBe(true); });
    expect(s.moves).toBe(1);
    await expect(page.locator('#sp-score')).toHaveText('499');
    await expect(page.locator('#sp-stock .cnt')).toHaveText('4');
    await expect(page.locator('#sp-deal')).toHaveText('Dağıt (4)');

    // içerik, reklam ve yapılandırılmış veri
    expect(await page.locator('.ba-ad').count()).toBe(3);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-orumcek-solitaire-a', 'oyun-orumcek-solitaire-b', 'oyun-orumcek-solitaire-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const adAfterBox = await page.evaluate(() => {
      const b = document.querySelector('.game-box')!;
      const a = document.querySelector('[data-slot="oyun-orumcek-solitaire-a"]')!;
      return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) && !b.contains(a);
    });
    expect(adAfterBox).toBe(true);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    const faq = ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(faq.mainEntity.length).toBe(await page.locator('.ba-faq details').count());
    await expect(page.getByText('Dosya yüklenmez').first()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/orumcek-solitaire/');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tohum: aynı numara aynı dağıtımı verir (bağımsız karıştırmayla birebir); "Tekrar oyna" ve "Dağıtım no" aynı dağıtımı kurar', async ({ page }) => {
    await open(page);
    const a = await deal(page, 4242, { suits: 1 });
    const b = await deal(page, 4242, { suits: 1 });
    expect(b.tab).toEqual(a.tab);
    expect(b.stock).toEqual(a.stock);
    // bağımsız hesap: 0-3. sütunlara 6, 4-9. sütunlara 5 kart; kalan 50 kart deste
    const deck = deckFor(4242);
    let p = 0;
    for (let c = 0; c < 10; c++) {
      const n = c < 4 ? 6 : 5;
      expect(ids(a, c)).toEqual(deck.slice(p, p + n));
      expect(a.tab[c].map((x) => x.up)).toEqual(Array.from({ length: n }, (_, k) => k === n - 1));
      p += n;
    }
    expect(p).toBe(54);
    expect(a.stock).toEqual(deck.slice(54));
    const other = await deal(page, 4243, { suits: 1 });
    expect(other.tab).not.toEqual(a.tab);

    // Dağıtım no kutusu
    await page.locator('#sp-suits').selectOption('1');
    await page.locator('#sp-seed-in').fill('4242');
    await page.locator('#sp-seed-go').click();
    let s = await T(page);
    expect(s.seed).toBe(4242);
    expect(s.tab).toEqual(a.tab);
    await expect(page.locator('#sp-seed')).toHaveText('4242');
    // birkaç hamleden sonra "Tekrar oyna" aynı başlangıcı kurar
    await page.locator('#sp-deal').click();
    await page.locator('#sp-deal').click();
    expect((await T(page)).moves).toBe(2);
    await page.locator('#sp-replay').click();
    s = await T(page);
    expect(s.tab).toEqual(a.tab);
    expect(s.stock).toEqual(a.stock);
    expect(s.moves).toBe(0);
    expect(s.historyLength).toBe(0);
    // zorluk değişince aynı tohum aynı kart sırasını, farklı takımlarla verir
    const four = await deal(page, 4242, { suits: 4 });
    expect(four.tab.map((c) => c.map((x) => x.id))).toEqual(a.tab.map((c) => c.map((x) => x.id)));
    expect(new Set(four.tab.flat().map((x) => x.suit)).size).toBeGreaterThan(1);
  });

  test('hatalı dağıtım numarası Türkçe, çözüm öneren hata verir; geçersiz test durumu reddedilir; bozuk localStorage oyunu çökertmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    const seed0 = (await T(page)).seed;
    const cases: [string, RegExp][] = [
      ['abc', /yalnızca rakamlardan/],
      ['-5', /yalnızca rakamlardan/],
      ['12.5', /yalnızca rakamlardan/],
      ['0', /1 ile 999999 arasında/],
      ['1234567', /1 ile 999999 arasında/],
      ['', /boş/],
    ];
    for (const [v, re] of cases) {
      await page.locator('#sp-seed-in').fill(v);
      await page.locator('#sp-seed-in').press('Enter');
      await expect(page.locator('#sp-error')).toBeVisible();
      await expect(page.locator('#sp-error')).toHaveText(re);
      await expect(page.locator('#sp-seed-in')).toHaveAttribute('aria-invalid', 'true');
      expect((await T(page)).seed).toBe(seed0);
    }
    await page.locator('#sp-seed-in').fill('77');
    await page.locator('#sp-seed-go').click();
    await expect(page.locator('#sp-error')).toBeHidden();
    expect((await T(page)).seed).toBe(77);

    // yinelenen kart / eksik toplam / açık karttan sonra kapalı kart: reddedilir, oyun bozulmaz
    const bad = await page.evaluate(() => {
      const h = (window as any).__orumcekSolitaireTest;
      return [
        h.setState({ tableau: [[0, 0]], stock: Array.from({ length: 102 }, (_, i) => i + 2) }),
        h.setState({ tableau: [[0]], stock: [] }),
        h.setState({ tableau: [[{ id: 0, up: true }, { id: 1, up: false }, 2]], stock: Array.from({ length: 101 }, (_, i) => i + 3) }),
        h.setState('bozuk'),
      ];
    });
    expect(bad).toEqual([false, false, false, false]);
    expect((await T(page)).tableCount).toBe(54);

    const corrupt = ['{bozuk', 'null', '[1,2]', '"metin"', '{"suits":3,"strict":"evet","stats":{"1":{"played":"x","won":-2,"bestScore":"a"}}}',
      '{"suits":4,"strict":false,"stats":{"4":{"played":2,"won":5,"bestScore":900,"bestTime":125,"bestMoves":0}}}'];
    for (const raw of corrupt) {
      await page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, raw]);
      await page.reload();
      await expect(page.locator('#sp-board .sp-card[data-pile="t"]')).toHaveCount(54);
      const s = await T(page);
      expect(s.stockCount).toBe(50);
      if (raw.includes('"suits":4')) {
        await expect(page.locator('#sp-suits')).toHaveValue('4');
        await expect(page.locator('#sp-rule')).toHaveValue('free');
        await expect(page.locator('#sp-st-mode')).toHaveText('4 renk');
        await expect(page.locator('#sp-st-played')).toHaveText('5'); // oynanan >= kazanılan olacak biçimde düzeltilir
        await expect(page.locator('#sp-st-won')).toHaveText('5');
        await expect(page.locator('#sp-st-score')).toHaveText('900');
        await expect(page.locator('#sp-st-time')).toHaveText('2:05');
      } else {
        await expect(page.locator('#sp-suits')).toHaveValue('1');
        await expect(page.locator('#sp-rule')).toHaveValue('strict');
        await expect(page.locator('#sp-st-played')).toHaveText('0');
        await expect(page.locator('#sp-st-score')).toHaveText('—');
      }
      await page.locator('#sp-deal').click();
      expect((await T(page)).moves).toBe(1);
      const saved = JSON.parse((await storeOf(page))!);
      expect(typeof saved.stats[String(s.suits)].played).toBe('number');
      expect(saved.stats[String(s.suits)].played).toBeGreaterThanOrEqual(1);
    }
    expect(errors).toEqual([]);
  });

  test('4 renk: karışık renkli dizi birlikte taşınamaz; tek kart her renge, aynı renkten dizi birlikte gider; 1 renkte aynı dizi taşınır', async ({ page }) => {
    await open(page);
    // 4 renk: set 0 ♠, 1 ♥, 2 ♦, 3 ♣, 4 ♠
    const sp9 = id(0, 9); const he8 = id(1, 8); const di10 = id(2, 10); const cl9 = id(3, 9);
    const sp9b = id(4, 9); const sp8 = id(0, 8);
    await setState(page, { suits: 4, tableau: [[sp9, he8], [di10], [cl9], [sp9b, sp8], [id(5, 3)]] });
    let s = await T(page);
    expect(s.tab[0].map((x) => x.suit)).toEqual([0, 1]);
    // tıkla: karışık dizi seçilemez
    await tap(page, sp9);
    await expect(status(page)).toContainText('aynı renkten');
    expect((await T(page)).selected).toBeNull();
    // kanca ile doğrudan deneme de reddedilir
    const r = await page.evaluate(() => (window as any).__orumcekSolitaireTest.move(0, 0, 1));
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('aynı renkten');
    // sürükle: kart yerinde kalır
    await dragTo(page, card(page, sp9), page.locator('#sp-t1'));
    s = await T(page);
    expect(ids(s, 0)).toEqual([sp9, he8]);
    expect(ids(s, 1)).toEqual([di10]);
    expect(s.moves).toBe(0);
    await expect(page.locator('.sp-ghost')).toHaveCount(0);
    // tek kart (kupa 8) farklı renkten sinek 9'un üzerine konabilir
    await tap(page, he8);
    await page.locator('#sp-t2').click({ position: { x: 8, y: 5 } });
    s = await T(page);
    expect(ids(s, 2)).toEqual([cl9, he8]);
    expect(ids(s, 0)).toEqual([sp9]);
    expect(s.moves).toBe(1);
    await expect(page.locator('#sp-score')).toHaveText('499');
    // aynı renkten dizi (maça 9-8) karo 10'un üzerine birlikte gider (sürükle-bırak)
    await dragTo(page, card(page, sp9b), page.locator('#sp-t1'));
    s = await T(page);
    expect(ids(s, 1)).toEqual([di10, sp9b, sp8]);
    expect(ids(s, 3)).toEqual([]);
    expect(s.moves).toBe(2);
    // hiçbir sütunun üzerine bırakılmayan kart yerine döner ve durum satırı ne yapılacağını söyler
    await dragTo(page, card(page, id(5, 3)), page.locator('.sp-stats'));
    s = await T(page);
    expect(ids(s, 4)).toEqual([id(5, 3)]);
    expect(s.moves).toBe(2);
    await expect(status(page)).toContainText('yerine döndü');
    await expect(page.locator('.sp-ghost')).toHaveCount(0);
    // değer kuralı: 3, 9'un üzerine konamaz
    const r2 = await page.evaluate(() => (window as any).__orumcekSolitaireTest.move(4, 0, 0));
    expect(r2.ok).toBe(false);
    expect(r2.reason).toContain('bir büyük');
    // boş sütuna her kart konabilir
    const r3 = await page.evaluate(() => (window as any).__orumcekSolitaireTest.move(4, 0, 3));
    expect(r3.ok).toBe(true);

    // 1 renk: aynı kartlar artık aynı takım (maça) sayılır ve dizi birlikte taşınır
    await setState(page, { suits: 1, tableau: [[sp9, he8], [di10]] });
    s = await T(page);
    expect(s.tab[0].map((x) => x.suit)).toEqual([0, 0]);
    await tap(page, sp9);
    await page.locator('#sp-t1').click({ position: { x: 8, y: 5 } });
    s = await T(page);
    expect(ids(s, 1)).toEqual([di10, sp9, he8]);
    // 2 renk: set 0 maça, set 1 kupa → karışık
    await setState(page, { suits: 2, tableau: [[sp9, he8], [di10]] });
    s = await T(page);
    expect(s.tab[0].map((x) => x.suit)).toEqual([0, 1]);
    expect((await page.evaluate(() => (window as any).__orumcekSolitaireTest.move(0, 0, 1))).ok).toBe(false);
  });

  test('boş sütun varken dağıtım engellenir (klasik kural); "İzin ver" ayarıyla dağıtılır; Ctrl+Z geri alır', async ({ page }) => {
    await open(page);
    const tableau = [[id(6, 5)], [id(6, 9)], [id(7, 3)], [id(7, 12), id(6, 2)], [id(6, 7)], [id(7, 9)], [id(6, 11), id(7, 6)], [id(7, 1)], [id(6, 13), id(7, 4), id(6, 1), id(7, 8), id(6, 3), id(7, 10)], []];
    await setState(page, { suits: 1, strict: true, done: [0, 0, 0, 0, 0, 0], tableau });
    let s = await T(page);
    expect(s.stockCount).toBe(10);
    expect(s.tab[9]).toEqual([]);
    await expect(page.locator('#sp-rule')).toHaveValue('strict');
    // deste tıklaması, Dağıt düğmesi ve D tuşu: üçü de engellenir
    await page.locator('#sp-stock button').click();
    await expect(status(page)).toContainText('Boş sütun varken dağıtılamaz');
    await page.locator('#sp-deal').click();
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.keyboard.press('d');
    s = await T(page);
    expect(s.stockCount).toBe(10);
    expect(s.moves).toBe(0);
    expect(await page.evaluate(() => (window as any).__orumcekSolitaireTest.dealStock())).toBe(false);
    // ayar gevşetilince dağıtım yapılır, boş sütun da kart alır
    await page.locator('#sp-rule').selectOption('free');
    await page.locator('#sp-t0 button').first().focus();
    await page.keyboard.press('d');
    s = await T(page);
    expect(s.stockCount).toBe(0);
    expect(s.tab[9].length).toBe(1);
    expect(s.tab.map((c) => c.length)).toEqual(tableau.map((c) => c.length + 1));
    expect(s.moves).toBe(1);
    expect(s.score).toBe(500 - 1 + 600);
    await expect(page.locator('#sp-deal')).toBeDisabled();
    expect(JSON.parse((await storeOf(page))!).strict).toBe(false);
    // Ctrl+Z dağıtımı geri alır
    await page.keyboard.press('Control+z');
    s = await T(page);
    expect(s.stockCount).toBe(10);
    expect(s.tab[9]).toEqual([]);
    expect(s.moves).toBe(0);

    // masada 10 karttan az kart kaldıysa sütunları doldurmak imkânsız: mesaj ayarı değiştirmeyi önerir
    await page.locator('#sp-rule').selectOption('strict');
    await setState(page, { suits: 1, strict: true, done: [0, 0, 0, 0, 0, 0, 0], tableau: [[id(7, 5)], [id(7, 9)], [id(7, 3)]] });
    expect((await T(page)).stockCount).toBe(10);
    await page.locator('#sp-deal').click();
    await expect(status(page)).toContainText('10 karttan az');
    await expect(status(page)).toContainText('İzin ver');
    expect((await T(page)).stockCount).toBe(10);
  });

  test('Papaz→As tamamlanınca 13 kart kalkar, +100 puan; altındaki kapalı kart açılır; geri alınabilir', async ({ page }) => {
    await open(page);
    // 2 renk: set 0 maça, set 1 kupa. 0. sütun: kapalı kupa 5 + maça K..2; 1. sütun: maça As.
    const col0: CardIn[] = [{ id: id(1, 5), up: false }, ...desc(0, 13, 2)];
    await setState(page, { suits: 2, tableau: [col0, [id(0, 1)], [id(3, 7)]] });
    let s = await T(page);
    expect(s.tableCount).toBe(15);
    expect(s.score).toBe(500);
    await tap(page, id(0, 1));
    await page.locator('#sp-t0 .sp-card').last().click({ position: { x: 8, y: 5 } });
    s = await T(page);
    expect(s.done).toEqual([0]);
    expect(s.tab[0]).toEqual([{ id: id(1, 5), up: true, suit: 1, rank: 5 }]);
    expect(s.tab[1]).toEqual([]);
    expect(s.tableCount).toBe(2); // 15 - 13
    expect(s.moves).toBe(1);
    expect(s.score).toBe(500 - 1 + 100);
    await expect(page.locator('#sp-score')).toHaveText('599');
    await expect(page.locator('#sp-sets')).toHaveText('1/8');
    await expect(page.locator('#sp-d0 .sp-card')).toHaveCount(1);
    await expect(page.locator('#sp-d1 .sp-card')).toHaveCount(0);
    await expect(status(page)).toContainText('tamamlandı');
    await expect(status(page)).toContainText('+100');
    // geri al: 13 kart masaya döner, puan 500
    await page.locator('#sp-undo').click();
    s = await T(page);
    expect(s.done).toEqual([]);
    expect(s.tab[0].length).toBe(13);
    expect(s.tab[0][0].up).toBe(false);
    expect(s.score).toBe(500);
    // dağıtımla gelen As da diziyi tamamlar
    // (16 masa + 10 deste + 6 × 13 tamamlanan = 104; boş sütunlar olduğu için kural gevşek)
    await setState(page, { suits: 1, strict: false, tableau: [desc(0, 13, 2), [id(1, 5)], [id(1, 6)], [id(1, 7)], [id(1, 8)]], stock: [...Array.from({ length: 9 }, (_, i) => id(2, i + 1)), id(0, 1)], done: [0, 0, 0, 0, 0, 0] });
    // deste sonundan (üstten) dağıtılır: ilk kart 0. sütuna = maça As
    await page.locator('#sp-deal').click();
    s = await T(page);
    expect(s.done.length).toBe(7);
    expect(s.tab[0]).toEqual([]);
    expect(s.score).toBe(500 - 1 + 700);
    await expect(status(page)).toContainText('tamamlandı');
  });

  test('8 dizi tamamlanınca kazanma ekranı, animasyon ve istatistik; hareketi azalt tercihinde animasyon yok', async ({ page }) => {
    await open(page);
    expect(await storeOf(page)).toBeNull();
    const win = { suits: 1, done: [0, 0, 0, 0, 0, 0, 0], tableau: [desc(7, 13, 2), [id(7, 1)]], stock: [] as number[] };
    await setState(page, win);
    await card(page, id(7, 1)).dblclick({ position: { x: 8, y: 5 } });
    await expect(page.locator('#sp-result')).toBeVisible();
    await expect(page.locator('#sp-result')).toHaveClass(/is-active/);
    await expect(page.locator('#sp-result')).toContainText('Tebrikler');
    await expect(page.locator('#sp-board')).toHaveAttribute('data-state', 'won');
    expect(await page.locator('.sp-fx i').count()).toBeGreaterThan(5);
    const s = await T(page);
    expect(s.won).toBe(true);
    expect(s.done.length).toBe(8);
    expect(s.tableCount).toBe(0);
    expect(s.score).toBe(500 - 1 + 800);
    const saved = JSON.parse((await storeOf(page))!);
    expect(saved.stats['1']).toMatchObject({ played: 1, won: 1, bestScore: 1299, bestMoves: 1 });
    expect(saved.stats['1'].bestTime).toBeGreaterThanOrEqual(1);
    await expect(page.locator('#sp-st-won')).toHaveText('1');
    await expect(page.locator('#sp-st-score')).toHaveText('1299');
    await expect(page.locator('#sp-undo')).toBeDisabled();
    await expect(page.locator('#sp-hint')).toBeDisabled();
    // yeni oyun: kazanma ekranı ve animasyon kalkar, istatistik korunur
    await page.locator('#sp-again').click();
    await expect(page.locator('#sp-result')).toBeHidden();
    await expect(page.locator('.sp-fx')).toHaveCount(0);
    expect((await T(page)).won).toBe(false);
    expect(JSON.parse((await storeOf(page))!).stats['1'].won).toBe(1);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await setState(page, win);
    await tap(page, id(7, 1));
    await page.locator('#sp-t0 .sp-card').last().click({ position: { x: 8, y: 5 } });
    await expect(page.locator('#sp-result')).toBeVisible();
    await expect(page.locator('.sp-fx')).toHaveCount(0);
    expect(JSON.parse((await storeOf(page))!).stats['1'].won).toBe(2);
  });

  test('otomatik tamamla: deste boşken ve tüm kartlar açıkken kalan dizileri çözer ve oyunu bitirir', async ({ page }) => {
    await open(page);
    // 2 renk: set 6 maça, set 7 kupa; altı dizi tamamlanmış.
    const tableau = [
      desc(6, 13, 8),                          // ♠K..♠8
      desc(7, 13, 9),                          // ♥K..♥9
      desc(6, 7, 4),                           // ♠7..♠4
      [id(7, 8), id(7, 7), id(7, 6), id(6, 3), id(6, 2)],
      [id(7, 5), id(7, 4), id(7, 3), id(7, 2), id(6, 1)],
      [id(7, 1)],
    ];
    await setState(page, { suits: 2, done: [0, 1, 0, 1, 0, 1], tableau, stock: [] });
    await expect(page.locator('#sp-auto')).toBeEnabled();
    expect((await T(page)).canAuto).toBe(true);
    await page.locator('#sp-auto').click();
    await expect.poll(async () => (await T(page)).won, { timeout: 10_000 }).toBe(true);
    await expect(page.locator('#sp-result')).toBeVisible();
    const s = await T(page);
    expect(s.done.length).toBe(8);
    expect(s.tableCount).toBe(0);
    // kapalı kart varken düğme pasif
    await page.locator('#sp-again').click();
    await expect(page.locator('#sp-auto')).toBeDisabled();
  });

  test('klavye ve ipucu: Tab sütun seçer, Enter seçer/bırakır, D dağıtır, Ctrl+Z geri alır; ipucu hamleyi vurgular', async ({ page }) => {
    await open(page);
    const tableau = [[id(0, 9)], [id(0, 10)], [id(1, 2)], [id(1, 4)], [id(2, 6)], [id(2, 13)], [id(3, 1)], [id(3, 3)], [id(4, 5)], [id(4, 7)]];
    await setState(page, { suits: 1, tableau });
    // ipucu: maça 9 → maça 10 hamlesini önce önerir ve vurgular
    await page.locator('#sp-hint').click();
    await expect(status(page)).toContainText('İpucu 1/');
    await expect(status(page)).toContainText('Maça 9');
    await expect(page.locator('#sp-board .is-hint')).toHaveCount(2);
    await expect(card(page, id(0, 9))).toHaveClass(/is-hint/);
    // Tab sırası: deste → 0. sütun → 1. sütun
    await page.locator('#sp-stock button').focus();
    await page.keyboard.press('Tab');
    await expect(card(page, id(0, 9))).toBeFocused();
    await page.keyboard.press('Enter');
    expect((await T(page)).selected).toEqual({ c: 0, idx: 0 });
    await expect(card(page, id(0, 9))).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Tab');
    await expect(card(page, id(0, 10))).toBeFocused();
    await page.keyboard.press('Enter');
    let s = await T(page);
    expect(ids(s, 1)).toEqual([id(0, 10), id(0, 9)]);
    expect(s.tab[0]).toEqual([]);
    expect(s.moves).toBe(1);
    await expect(page.locator('#sp-t1 :focus')).toHaveCount(1); // odak hedef sütunda kalır
    // Ctrl+Z geri alır
    await page.keyboard.press('Control+z');
    s = await T(page);
    expect(ids(s, 0)).toEqual([id(0, 9)]);
    expect(s.moves).toBe(0);
    await expect(page.locator('#sp-undo')).toBeDisabled();
    // D dağıtır (boş sütun yok)
    const st0 = s.stockCount;
    await page.keyboard.press('d');
    s = await T(page);
    expect(s.stockCount).toBe(st0 - 10);
    expect(s.moves).toBe(1);
    await expect(page.locator('#sp-undo')).toBeEnabled();
    // oklar sütunlar arasında gezinir, Esc seçimi kaldırır
    await page.locator('#sp-t3 button[tabindex="0"]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#sp-t4 :focus')).toHaveCount(1);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#sp-t2 :focus')).toHaveCount(1);
    await page.keyboard.press('Enter');
    expect((await T(page)).selected).not.toBeNull();
    await page.keyboard.press('Escape');
    expect((await T(page)).selected).toBeNull();
    // seçim ve D/H tuşları form alanında çalışmaz (yazı yazılabilir)
    await page.locator('#sp-seed-in').fill('');
    await page.locator('#sp-seed-in').press('d');
    expect((await T(page)).moves).toBe(1);
  });

  test('360px: yatay taşma yok, 10 sütun ekrana sığar, uzun sütunda bindirme payı dinamik ayarlanır; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const check = async (label: string) => {
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, label).toBeLessThanOrEqual(0);
      const box = (await page.locator('#sp-board').boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(360);
      const out = await page.evaluate(() => {
        const b = document.getElementById('sp-board')!.getBoundingClientRect();
        return [...document.querySelectorAll('#sp-board .sp-card, #sp-board .sp-slot')].filter((c) => {
          const r = c.getBoundingClientRect();
          return r.left < b.left - 1 || r.right > Math.min(360, b.right + 1);
        }).length;
      });
      expect(out, label + ': taşan kart').toBe(0);
    };
    await check('ilk dağıtım');
    const w = (await page.locator('#sp-t9 .sp-card').first().boundingBox())!.width;
    expect(w).toBeGreaterThanOrEqual(24);
    expect(w).toBeLessThanOrEqual(36);
    // sütunlar aynı satırda (10'u da yan yana)
    const tops = await page.evaluate(() => [...Array(10)].map((_, i) => Math.round(document.getElementById('sp-t' + i)!.getBoundingClientRect().top)));
    expect(new Set(tops).size).toBe(1);

    // uzun sütun: 6 kapalı + 24 açık kart (4 renk, karışık)
    const longCol: CardIn[] = [
      ...[0, 1, 2, 3, 4, 5].map((k) => ({ id: id(5, k + 1), up: false })),
      ...Array.from({ length: 12 }, (_, i) => id(i % 2 ? 1 : 0, 13 - i)),
      ...Array.from({ length: 12 }, (_, i) => id(i % 2 ? 3 : 2, 13 - i)),
    ];
    await setState(page, { suits: 4, tableau: [longCol, [id(6, 5)], [], [id(6, 9)]] });
    await check('uzun sütun');
    const measure = () => page.evaluate(() => {
      const els = [...document.querySelectorAll('#sp-t0 .sp-card.up')] as HTMLElement[];
      const gaps = els.slice(1).map((e, i) => e.getBoundingClientRect().top - els[i].getBoundingClientRect().top);
      const stack = document.querySelector('#sp-t0 .sp-stack')!.getBoundingClientRect().height;
      const h = els[0].getBoundingClientRect().height;
      return { minGap: Math.min(...gaps), maxGap: Math.max(...gaps), stack, h, limit: Math.max(h * 3.2, window.innerHeight * 0.7) };
    });
    const m1 = await measure();
    expect(m1.minGap, 'köşe yazısı okunacak pay').toBeGreaterThanOrEqual(13);
    expect(m1.stack).toBeLessThanOrEqual(m1.limit + 2);
    // ekran kısalınca pay küçülür ama okunabilir sınırın altına inmez
    await page.setViewportSize({ width: 360, height: 520 });
    await expect.poll(async () => (await measure()).maxGap).toBeLessThan(m1.maxGap);
    const m2 = await measure();
    expect(m2.minGap).toBeGreaterThanOrEqual(13);
    await check('kısa ekran');
    // uzun hata metni taşmaz
    await page.locator('#sp-seed-in').fill('çokçokçokuzunbirdeğer');
    await page.locator('#sp-seed-go').click();
    await expect(page.locator('#sp-error')).toBeVisible();
    await check('hata metni');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
});
