import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Dört Bağla: motor kuralları (kazanma, dolu sütun, beraberlik, yapay zekâ), arayüz (düşme, sıra, kazanma çizgisi, skor,
// geri al, bilgisayar yanıtı), bozuk localStorage, 360px ve içerik denetimi.
const URL_PATH = '/oyunlar/dort-bagla/';
const STORE_KEY = 'ba-oyun-dort-bagla';

// Kazanan çıkmadan tahtayı dolduran 42 hamlelik dizi (1. oyuncu ilk başlar; sütun numarası 0–6).
const DRAW_MOVES = [3, 3, 3, 3, 1, 2, 2, 2, 2, 1, 0, 3, 5, 6, 5, 2, 5, 5, 5, 1, 1, 1, 5, 3, 1, 0, 0, 2, 6, 0, 0, 6, 6, 6, 4, 4, 4, 4, 4, 6, 0, 4];

const col = (page: Page, c: number) => page.locator(`.dk-col[data-c="${c}"]`);
const discs = (page: Page) => page.locator('.dk-disc');
const disc = (page: Page, i: number) => page.locator(`.dk-slot[data-i="${i}"] .dk-disc`);

async function clickAll(page: Page, order: number[]) {
  for (const c of order) await col(page, c).click();
}

test.describe('Dört Bağla', () => {
  test('sayfa açılır, 7 sütun ve 42 yuva gelir, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Dört Bağla');
    await expect(page.locator('.dk-col')).toHaveCount(7);
    await expect(page.locator('.dk-slot')).toHaveCount(42);
    await expect(page.locator('#dk-status')).toContainText('Sıra sende');
    await expect(page.locator('#dk-chip-1')).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('#dk-undo')).toBeDisabled();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('motor: yatay, dikey ve iki çapraz yönde dört taş kazanır; üç taş kazandırmaz', async ({ page }) => {
    await page.goto(URL_PATH);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/dort-bagla/engine.js');
      const win = (rows) => { const b = m.boardFromRows(rows); const w = m.findWin(b); return w ? { p: w.player, line: w.line } : null; };
      const out = {};
      out.horiz = win(['.......', '.......', '.......', '.......', '.......', '.1111..']);
      out.vert = win(['.......', '.......', '..2....', '..2....', '..2....', '..2....']);
      out.diagUp = win(['.......', '.......', '...1...', '..12...', '.121...', '1222...'].map((r) => r));
      out.diagDown = win(['2......', '12.....', '212....', '1212...', '.......', '.......'].map((r) => r));
      out.three = win(['.......', '.......', '.......', '.......', '.......', '.111...']);
      out.threeVert = win(['.......', '.......', '.......', '2......', '2......', '2......']);
      out.mixed = win(['.......', '.......', '.......', '.......', '.......', '1121...']);
      const b = m.boardFromRows(['.......', '.......', '.......', '.......', '.......', '.1111..']);
      out.lineAt = m.winLineAt(b, 5 * 7 + 3);
      out.lineAtEmpty = m.winLineAt(b, 0);
      // Beşli diziyi de tek çizgi olarak döndürür
      out.five = m.winLineAt(m.boardFromRows(['.......', '.......', '.......', '.......', '.......', '11111..']), 5 * 7 + 2).length;
      return out;
    })()`) as Record<string, any>;
    expect(res.horiz.p).toBe(1);
    expect(res.horiz.line).toEqual([36, 37, 38, 39]);
    expect(res.vert.p).toBe(2);
    expect(res.vert.line).toEqual([16, 23, 30, 37]);
    expect(res.diagUp.p).toBe(1);
    expect(res.diagUp.line.length).toBe(4);
    expect(res.diagDown.p).toBe(2);
    expect(res.diagDown.line.length).toBe(4);
    expect(res.three).toBeNull();
    expect(res.threeVert).toBeNull();
    expect(res.mixed).toBeNull();
    expect(res.lineAt).toEqual([36, 37, 38, 39]);
    expect(res.lineAtEmpty).toBeNull();
    expect(res.five).toBe(5);
  });

  test('motor: yerçekimi, dolu sütun reddi, geçerli hamleler ve beraberlik', async ({ page }) => {
    await page.goto(URL_PATH);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/dort-bagla/engine.js');
      const out = {};
      let b = m.createBoard();
      const a1 = m.applyMove(b, 2, 1); const a2 = m.applyMove(a1.board, 2, 2);
      out.gravity = [a1.row, a1.index, a2.row, a2.index, b[a1.index], a1.board[a1.index]]; // asıl tahta değişmez
      // sütunu doldur (dikey kazanmasın diye dönüşümlü)
      b = m.createBoard();
      for (let i = 0; i < 6; i++) b = m.applyMove(b, 4, (i % 2) + 1).board;
      out.fullRow = m.dropRow(b, 4);
      out.fullValid = m.isValidMove(b, 4);
      out.fullApply = m.applyMove(b, 4, 1);
      out.validMoves = m.validMoves(b);
      out.badCol = [m.isValidMove(b, -1), m.isValidMove(b, 7), m.applyMove(b, 7, 1), m.applyMove(b, 1, 3)];
      // Beraberlik dizisi
      const moves = ${JSON.stringify(DRAW_MOVES)};
      let d = m.createBoard(); let p = 1; let earlyWin = false;
      moves.forEach((c, k) => { const r = m.applyMove(d, c, p); d = r.board; if (k < 41 && m.winLineAt(d, r.index)) earlyWin = true; p = m.other(p); });
      out.drawFull = m.isFull(d); out.drawIs = m.isDraw(d); out.early = earlyWin; out.drawWin = m.findWin(d);
      out.notDraw = m.isDraw(m.createBoard());
      // Dolu ama kazananı olan tahta beraberlik sayılmaz
      const filled = m.boardFromRows(['1111111','1111111','1111111','1111111','1111111','1111111']);
      out.fullWin = [m.isFull(filled), m.isDraw(filled)];
      return out;
    })()`) as Record<string, any>;
    expect(res.gravity).toEqual([5, 37, 4, 30, 0, 1]);
    expect(res.fullRow).toBe(-1);
    expect(res.fullValid).toBe(false);
    expect(res.fullApply).toBeNull();
    expect(res.validMoves).toEqual([0, 1, 2, 3, 5, 6]);
    expect(res.badCol).toEqual([false, false, null, null]);
    expect(res.drawFull).toBe(true);
    expect(res.drawIs).toBe(true);
    expect(res.early).toBe(false);
    expect(res.drawWin).toBeNull();
    expect(res.notDraw).toBe(false);
    expect(res.fullWin).toEqual([true, false]);
  });

  test('motor: her seviyede bilgisayar hazır üçlüyü bloklar ve kazanma fırsatını kullanır; zor seviye 2 sn içinde cevap verir', async ({ page }) => {
    await page.goto(URL_PATH);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/dort-bagla/engine.js');
      const out = {};
      // 2. oyuncunun dikey üçlüsü (sütun 3): 1. oyuncu sütun 3'e oynamalı
      const vert = m.boardFromRows(['.......', '.......', '.......', '...2...', '...2...', '...2.11']);
      out.vertical = ['easy', 'medium', 'hard'].map((l) => m.bestMove(vert, 1, l, null).col);
      // Yatay üçlü, bir ucu kapalı: 2. oyuncu 1,2,3; sütun 0'da 1. oyuncunun taşı var -> tek boş uç sütun 4
      const horiz = m.boardFromRows(['.......', '.......', '.......', '.......', '.......', '1222...']);
      out.horizontal = ['easy', 'medium', 'hard'].map((l) => m.bestMove(horiz, 1, l, null).col);
      // Bilgisayar kendi dörtlüsünü tamamlar (rakibin tehdidi varken bile)
      const own = m.boardFromRows(['.......', '.......', '.......', '1......', '1.....2', '1.2.2.2']);
      out.win = ['easy', 'medium', 'hard'].map((l) => m.bestMove(own, 1, l, null).col);
      // Sağ tarafta rakibin üçlüsü, sol tarafta kendi üçlüsü -> kazanmayı seçmeli
      const race = m.boardFromRows(['.......', '.......', '.......', '1.....2', '1.....2', '1.....2']);
      out.race = m.bestMove(race, 1, 'hard', null).col;
      // Zaman: boş tahta ve orta oyun
      let t = performance.now();
      const first = m.bestMove(m.createBoard(), 1, 'hard', null);
      out.emptyMs = performance.now() - t; out.emptyCol = first.col; out.emptyDepth = first.depth;
      const mid = m.boardFromRows(['.......', '.......', '...1...', '...2...', '..12...', '.1211..']);
      t = performance.now();
      const mv = m.bestMove(mid, 2, 'hard', m.mulberry32(3));
      out.midMs = performance.now() - t; out.midValid = m.isValidMove(mid, mv.col); out.midDepth = mv.depth;
      out.easyDepth = m.bestMove(mid, 2, 'easy', null).depth;
      out.mediumDepth = m.bestMove(mid, 2, 'medium', null).depth;
      // Tohumlu seçim tekrarlanabilir
      out.seeded = [m.bestMove(m.createBoard(), 1, 'easy', m.mulberry32(9)).col === m.bestMove(m.createBoard(), 1, 'easy', m.mulberry32(9)).col];
      return out;
    })()`) as Record<string, any>;
    expect(res.vertical).toEqual([3, 3, 3]);
    expect(res.horizontal).toEqual([4, 4, 4]);
    expect(res.win).toEqual([0, 0, 0]);
    expect(res.race).toBe(0);
    expect(res.emptyCol).toBe(3);
    expect(res.emptyDepth).toBeGreaterThanOrEqual(6);
    expect(res.emptyMs).toBeLessThan(2000);
    expect(res.midMs).toBeLessThan(2000);
    expect(res.midValid).toBe(true);
    expect(res.midDepth).toBeGreaterThanOrEqual(6);
    expect(res.easyDepth).toBe(2);
    expect(res.mediumDepth).toBe(4);
    expect(res.seeded).toEqual([true]);
  });

  test('iki oyuncu: taş en alta düşer, sıra değişir, dikey dörtlü kazanır, çizgi çizilir, skor yazılır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#dk-mode', 'two');
    await expect(page.locator('#dk-level-field')).toBeHidden();
    await expect(page.locator('#dk-status')).toContainText('Sıra: Oyuncu 1');
    await col(page, 0).click();
    await expect(disc(page, 35)).toHaveAttribute('data-p', '1');
    await expect(disc(page, 35)).toHaveClass(/is-drop/); // animasyon açık
    await expect(page.locator('#dk-chip-2')).toHaveAttribute('aria-current', 'true');
    await col(page, 0).click();
    await expect(disc(page, 28)).toHaveAttribute('data-p', '2');
    await clickAll(page, [1, 1, 1]); // P1 col1, P2 col1, P1 col1 -> karışık
    await expect(discs(page)).toHaveCount(5);
    await page.locator('#dk-restart').click();
    await expect(discs(page)).toHaveCount(0);
    // P1: sütun 0 x4, P2: sütun 1 x3
    await clickAll(page, [0, 1, 0, 1, 0, 1]);
    await expect(page.locator('#dk-result')).not.toHaveClass(/is-active/);
    await col(page, 0).click();
    await expect(page.locator('#dk-status')).toContainText('Oyuncu 1 (kırmızı) kazandı');
    await expect(page.locator('#dk-result')).toHaveClass(/is-active/);
    await expect(page.locator('.dk-disc.is-win')).toHaveCount(4);
    await expect(page.locator('.dk-line line')).toHaveCount(1);
    await expect(page.locator('#dk-sa')).toHaveText('1');
    // Oyun bitince yeni taş bırakılamaz
    await col(page, 5).click({ force: true });
    await expect(discs(page)).toHaveCount(7);
    // Skor kalıcıdır
    await page.reload();
    await expect(page.locator('#dk-mode')).toHaveValue('two');
    await expect(page.locator('#dk-sa')).toHaveText('1');
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE_KEY);
    expect(stored.scores.two.a).toBe(1);
    // Tekrar oyna / skoru sıfırla
    await clickAll(page, [0, 1, 0, 1, 0, 1, 0]);
    await page.locator('#dk-again').click();
    await expect(discs(page)).toHaveCount(0);
    await expect(page.locator('#dk-sa')).toHaveText('2');
    await page.locator('#dk-reset-score').click();
    await expect(page.locator('#dk-sa')).toHaveText('0');
  });

  test('iki oyuncu: yatay ve çapraz kazanma, hareket azaltmada animasyon sınıfı yok', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(URL_PATH);
    await page.selectOption('#dk-mode', 'two');
    await col(page, 0).click();
    await expect(disc(page, 35)).not.toHaveClass(/is-drop/);
    await page.locator('#dk-restart').click();
    // Yatay: P1 sütun 0,1,2,3 alt satır; P2 sütun 0,1,2 üstüne
    await clickAll(page, [0, 0, 1, 1, 2, 2, 3]);
    await expect(page.locator('#dk-status')).toContainText('Oyuncu 1 (kırmızı) kazandı');
    await expect(page.locator('.dk-disc.is-win')).toHaveCount(4);
    await page.locator('#dk-restart').click();
    // Çapraz (P2): P2 taşları (5,1) (4,2) (3,3) (2,4)
    await clickAll(page, [2, 1, 3, 2, 3, 4, 4, 3, 4, 4]);
    await expect(page.locator('#dk-status')).toContainText('Oyuncu 2 (sarı) kazandı');
    await expect(page.locator('#dk-sb')).toHaveText('1');
  });

  test('dolu sütuna bırakılamaz: uyarı çıkar ve sıra değişmez', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#dk-mode', 'two');
    await clickAll(page, [0, 0, 0, 0, 0, 0]);
    await expect(discs(page)).toHaveCount(6);
    await expect(col(page, 0)).toHaveAttribute('aria-disabled', 'true');
    await expect(col(page, 0)).toHaveAttribute('aria-label', /dolu/);
    await expect(page.locator('#dk-chip-1')).toHaveAttribute('aria-current', 'true');
    await col(page, 0).click({ force: true });
    await expect(page.locator('#dk-status')).toContainText('dolu');
    await expect(discs(page)).toHaveCount(6);
    await expect(page.locator('#dk-chip-1')).toHaveAttribute('aria-current', 'true');
  });

  test('beraberlik: 42 hamlede tahta dolar, kazanan yok, beraberlik skoru artar', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#dk-mode', 'two');
    await clickAll(page, DRAW_MOVES);
    await expect(discs(page)).toHaveCount(42);
    await expect(page.locator('#dk-status')).toContainText('Berabere');
    await expect(page.locator('#dk-result')).toHaveClass(/is-active/);
    await expect(page.locator('#dk-sd')).toHaveText('1');
    await expect(page.locator('.dk-disc.is-win')).toHaveCount(0);
    await expect(page.locator('.dk-line line')).toHaveCount(0);
  });

  test('bilgisayara karşı: hamleye cevap verir, 1–7 tuşları çalışır, sıra ve geri al', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#dk-level', 'hard');
    await col(page, 3).click();
    await expect(discs(page)).toHaveCount(1);
    await expect(page.locator('#dk-status')).toContainText('Bilgisayar düşünüyor');
    await expect(discs(page)).toHaveCount(2, { timeout: 4000 }); // zor seviye bile 2 sn içinde cevap verir
    await expect(page.locator('#dk-status')).toContainText('Sıra sende');
    await expect(page.locator('.dk-disc[data-p="2"]')).toHaveCount(1);
    // Bilgisayarın sırasında tıklama yok sayılır: yeni oyun, ardından hızlı iki tıklama
    await page.locator('#dk-undo').click();
    await expect(discs(page)).toHaveCount(0);
    await expect(page.locator('#dk-undo')).toBeDisabled();
    await expect(page.locator('#dk-status')).toContainText('geri alındı');
    // Klavye: 5 numaralı tuş -> sütun 5 (indeks 4)
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
    await page.keyboard.press('5');
    await expect(disc(page, 39)).toHaveAttribute('data-p', '1');
    await expect(discs(page)).toHaveCount(2, { timeout: 4000 });
    await page.keyboard.press('9'); // geçersiz tuş
    await expect(discs(page)).toHaveCount(2);
  });

  test('bilgisayar ilk başlayınca hamle yapar; kolay/orta seviyede de cevap verir; iki oyunculuda geri al tek hamle alır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#dk-first', 'cpu');
    await expect(discs(page)).toHaveCount(1, { timeout: 4000 });
    await expect(page.locator('.dk-disc[data-p="1"]')).toHaveCount(1); // bilgisayar 1. oyuncu (kırmızı)
    await expect(page.locator('#dk-status')).toContainText('Sıra sende');
    await expect(page.locator('#dk-undo')).toBeDisabled(); // henüz insan hamlesi yok
    await page.selectOption('#dk-first', 'me');
    for (const level of ['easy', 'medium']) {
      await page.selectOption('#dk-level', level);
      await col(page, 3).click();
      await expect(discs(page)).toHaveCount(2, { timeout: 4000 });
    }
    await page.selectOption('#dk-mode', 'two');
    await clickAll(page, [0, 1, 2]);
    await expect(discs(page)).toHaveCount(3);
    await page.locator('#dk-undo').click();
    await expect(discs(page)).toHaveCount(2);
    await expect(page.locator('#dk-chip-1')).toHaveAttribute('aria-current', 'true');
    await page.locator('#dk-undo').click();
    await page.locator('#dk-undo').click();
    await expect(discs(page)).toHaveCount(0);
    await expect(page.locator('#dk-undo')).toBeDisabled();
  });

  test('klavye: ok tuşları sütunlar arasında gezinir, Enter taş bırakır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#dk-mode', 'two');
    await col(page, 3).focus();
    const active = () => page.evaluate(() => (document.activeElement as HTMLElement)?.dataset.c);
    await page.keyboard.press('ArrowRight');
    expect(await active()).toBe('4');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    expect(await active()).toBe('2');
    await page.keyboard.press('Home');
    expect(await active()).toBe('0');
    await page.keyboard.press('ArrowLeft'); // kenarda yerinde kalır
    expect(await active()).toBe('0');
    await page.keyboard.press('Enter');
    await expect(disc(page, 35)).toHaveAttribute('data-p', '1');
    await page.keyboard.press('End');
    await page.keyboard.press(' ');
    await expect(disc(page, 41)).toHaveAttribute('data-p', '2');
    expect(await page.locator('.dk-col[tabindex="0"]').count()).toBe(1);
  });

  test('bozuk localStorage içeriği oyunu çökertmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript((k) => localStorage.setItem(k, '{not json'), STORE_KEY);
    await page.goto(URL_PATH);
    await expect(page.locator('.dk-col')).toHaveCount(7);
    await expect(page.locator('#dk-sa')).toHaveText('0');
    await col(page, 3).click();
    await expect(discs(page)).toHaveCount(1);
    await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ scores: 7, prefs: { mode: 'x', level: 5 } })), STORE_KEY);
    await page.reload();
    await expect(page.locator('#dk-mode')).toHaveValue('cpu');
    await expect(page.locator('#dk-sa')).toHaveText('0');
    await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ scores: { 'cpu|medium': { a: 'x', b: -2, d: null } } })), STORE_KEY);
    await page.reload();
    await expect(page.locator('#dk-sb')).toHaveText('0');
    expect(errors).toEqual([]);
  });

  test('360px genişlikte tahta ve kontroller taşmadan sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const b = (await page.locator('#dk-board').boundingBox())!;
    expect(b.x).toBeGreaterThanOrEqual(0);
    expect(b.x + b.width).toBeLessThanOrEqual(360);
    const c = (await col(page, 0).boundingBox())!;
    expect(c.width).toBeGreaterThanOrEqual(30);
    await page.selectOption('#dk-mode', 'two');
    await clickAll(page, [0, 1, 0, 1, 0, 1, 0]);
    await expect(page.locator('#dk-result')).toHaveClass(/is-active/);
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: en az 900 kelime, 3 reklam alanı, en az 7 SSS, geçerli JSON-LD', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-dort-bagla-a', 'oyun-dort-bagla-b', 'oyun-dort-bagla-c']);
    expect(await page.locator('#oyun-kutusu .ba-ad').count()).toBe(0);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(faqCount);
    const game = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame');
    expect(game.applicationCategory).toMatch(/Game/);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#dk-full')).toBeVisible();
  });
});
