import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Reversi: motor kuralları (açılış, çevirme, pas, oyun sonu, zor seviye köşe), arayüz (hamle, bilgisayar cevabı,
// geri al, iki kişilik, kazanma ekranı + istatistik), bozuk localStorage, içerik, mobil taşma, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/reversi/';
const sq = (page: Page, name: string) => page.locator(`#rv-board [data-sq="${name}"]`);

test.describe('Oyun: reversi', () => {
  test('sayfa açılır, açılış konumu doğru, 3 reklam, 800+ kelime, JSON-LD; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#rv-board .sq')).toHaveCount(64);
    await expect(page.locator('#rv-count-b')).toHaveText('2');
    await expect(page.locator('#rv-count-w')).toHaveText('2');
    await expect(sq(page, 'd4')).toHaveAttribute('data-piece', 'w');
    await expect(sq(page, 'e5')).toHaveAttribute('data-piece', 'w');
    await expect(sq(page, 'd5')).toHaveAttribute('data-piece', 'b');
    await expect(sq(page, 'e4')).toHaveAttribute('data-piece', 'b');
    // Siyahın tam olarak dört geçerli hamlesi var
    await expect(page.locator('#rv-board .sq.is-legal')).toHaveCount(4);
    const legal = await page.locator('#rv-board .sq.is-legal').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.sq).sort());
    expect(legal).toEqual(['c4', 'd3', 'e6', 'f5']);
    await expect(page.locator('#rv-status')).toContainText('Sıra sizde');
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(await page.locator('#rv-full').count()).toBe(1);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('reklam alanları oyun kutusunun dışında: a altında, b ortada, c sonda', async ({ page }) => {
    await page.goto(URL_PATH);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-reversi-a', 'oyun-reversi-b', 'oyun-reversi-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const box = document.querySelector('.game-box')!;
      const ad = document.querySelector('[data-slot="oyun-reversi-a"]')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
  });

  test('motor: açılışta siyahın 4 hamlesi, çevirme doğru, pas kuralı, oyun sonu sayımı', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const M = await import('/oyunlar/reversi/engine.js');
      const e = '........';
      const open = M.initialBoard();
      const moves = M.legalMoves(open, 'b').map((m: { idx: number }) => M.squareName(m.idx)).sort();
      const d3 = M.legalMoves(open, 'b').find((m: { idx: number }) => M.squareName(m.idx) === 'd3');
      const after = M.applyMove(open, d3, 'b');
      // Çok yönlü çevirme: d4'e koyulan siyah taş hem batıdaki c4'ü hem kuzeydeki d5'i çevirir
      const multi = M.boardFromRows([e, e, '...b....', '...w....', '.bw.....', e, e, e]);
      const multiMoves = M.legalMoves(multi, 'b').map((m: { idx: number; flips: number[] }) => M.squareName(m.idx) + ':' + m.flips.map(M.squareName).sort().join('+'));
      // Pas: siyah oynadıktan sonra beyazın hamlesi yok, siyahın var
      const pass = M.boardFromRows([e, e, e, e, e, e, e, 'bw......']);
      const passRes = M.nextTurn(pass, 'b');
      // İkisinin de hamlesi yok: oyun biter
      const dead = M.boardFromRows(['b.......', e, e, e, e, e, e, '.......w']);
      const deadRes = M.nextTurn(dead, 'b');
      // Bir renk tükenirse biter
      const wiped = M.boardFromRows(['bbb.....', e, e, e, e, e, e, e]);
      const wipedRes = M.nextTurn(wiped, 'b');
      // Oyun sonu sayımı
      const full = M.boardFromRows(['bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', 'bbbbwwww', 'wwwwwwww', 'wwwwwwww']);
      const res = M.gameResult(full);
      return {
        moves, afterD3: [M.squareName(27), after[27], after[35], after[36], after[28]].join(','),
        multiMoves, passRes, deadOver: deadRes.over, wipedOver: wipedRes.over, res,
        invalidThrows: (() => { try { M.applyMove(open, 0, 'b'); return false; } catch { return true; } })(),
      };
    });
    expect(r.moves).toEqual(['c4', 'd3', 'e6', 'f5']);
    // d3'e siyah koyunca d4 (beyaz) siyaha döner: d5, d4, e4 siyah, e5 beyaz kalır
    expect(r.afterD3).toBe('d5,b,b,b,w');
    expect(r.passRes).toMatchObject({ turn: 'b', passed: true, passedSide: 'w', over: false });
    expect(r.deadOver).toBe(true);
    expect(r.wipedOver).toBe(true);
    expect(r.invalidThrows).toBe(true);
    expect(r.res).toMatchObject({ winner: 'b', b: 44, w: 20, empty: 0 });
    expect(r.multiMoves).toEqual(['d4:c4+d5']);
  });

  test('motor: zor seviye köşeyi alır; her seviye geçerli hamle döndürür ve makul sürede biter', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const M = await import('/oyunlar/reversi/engine.js');
      const e = '........';
      // a8 köşesi yalnızca b8'i çevirir; e7 ise beş taş çevirir. Zor seviye köşeyi seçmeli.
      const rows = ['.wb.....', e, '....w...', '....w...', '....w...', '....w...', '....w...', '....b...'];
      const board = M.boardFromRows(rows);
      const all = M.legalMoves(board, 'b').map((m: { idx: number; flips: number[] }) => M.squareName(m.idx) + ':' + m.flips.length);
      const zor = M.chooseMove(board, 'b', 'zor');
      const open = M.initialBoard();
      const t0 = performance.now();
      const zorOpen = M.chooseMove(open, 'b', 'zor');
      const ms = performance.now() - t0;
      const legalOpen = M.legalMoves(open, 'b').map((m: { idx: number }) => m.idx);
      const kolay = M.chooseMove(open, 'b', 'kolay');
      const orta = M.chooseMove(open, 'b', 'orta');
      return {
        all, zor: M.squareName(zor.idx), ms,
        legal: [zorOpen, kolay, orta].every((m: { idx: number }) => legalOpen.includes(m.idx)),
        none: M.chooseMove(M.boardFromRows([e, e, e, e, e, e, e, e]), 'b', 'zor'),
      };
    });
    expect(r.all).toContain('a8:1');
    expect(r.all).toContain('e7:5');
    expect(r.zor).toBe('a8');
    expect(r.legal).toBe(true);
    expect(r.ms).toBeLessThan(5000);
    expect(r.none).toBeNull();
  });

  test('geçerli kareye tıklayınca taş konur ve çevrilir; geçersiz kare hamle yaptırmaz; bilgisayar (worker) cevap verir; geri al', async ({ page }) => {
    await page.goto(URL_PATH);
    await sq(page, 'a1').click(); // geçersiz
    await expect(page.locator('#rv-history')).toHaveAttribute('data-count', '0');
    await expect(sq(page, 'a1')).toHaveAttribute('data-piece', '');
    await sq(page, 'd3').click();
    await expect(sq(page, 'd3')).toHaveAttribute('data-piece', 'b');
    await expect(sq(page, 'd4')).toHaveAttribute('data-piece', 'b'); // çevrildi
    await expect(page.locator('#rv-count-b')).toHaveText(/^[2-9]/);
    // Bilgisayar beyaz oynar: geçmişte 2 hamle, sıra yeniden siyahta
    await expect(page.locator('#rv-history')).toHaveAttribute('data-count', '2', { timeout: 20000 });
    await expect(page.locator('#rv-board')).toHaveAttribute('data-turn', 'b');
    await expect(page.locator('#rv-undo')).toBeEnabled();
    await page.locator('#rv-undo').click();
    await expect(page.locator('#rv-history')).toHaveAttribute('data-count', '0');
    await expect(sq(page, 'd3')).toHaveAttribute('data-piece', '');
    await expect(sq(page, 'd4')).toHaveAttribute('data-piece', 'w');
    await expect(page.locator('#rv-count-b')).toHaveText('2');
    await expect(page.locator('#rv-undo')).toBeDisabled();
  });

  test('iki kişilik: sıra değişir, çevrilecek taş sayısı ipucu rakamla gösterilir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#rv-mode').selectOption('two');
    await page.locator('#rv-counts').check();
    await expect(sq(page, 'd3').locator('.hint')).toHaveText('1');
    await sq(page, 'd3').click();
    await expect(page.locator('#rv-status')).toContainText('Sıra: Beyaz');
    await expect(page.locator('#rv-board')).toHaveAttribute('data-turn', 'w');
    await expect(page.locator('#rv-board .sq.is-legal')).toHaveCount(3);
    // Beyazın hamlesi: c3 (d4'ün karşısında) — geçerli kareleri oku ve ilkini oyna
    const first = await page.locator('#rv-board .sq.is-legal').first().getAttribute('data-sq');
    await sq(page, first!).click();
    await expect(page.locator('#rv-board')).toHaveAttribute('data-turn', 'b');
    await expect(page.locator('#rv-history')).toHaveAttribute('data-count', '2');
    await page.locator('#rv-undo').click();
    await expect(page.locator('#rv-history')).toHaveAttribute('data-count', '1');
    await expect(page.locator('#rv-board')).toHaveAttribute('data-turn', 'w');
  });

  test('pas: hamlesi olmayan taraf otomatik geçer ve bilgi satırı gösterilir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#rv-mode').selectOption('two');
    await page.evaluate(() => (window as any).__reversiDebug.setPosition(
      ['.wb.....', '........', '........', '........', '........', '........', '........', 'bw......'], 'b'));
    await sq(page, 'a8').click();
    // Beyazın hamlesi yok: sıra yine siyahta, pas bildirimi var
    await expect(page.locator('#rv-status')).toContainText('pas geçti');
    await expect(page.locator('#rv-board')).toHaveAttribute('data-turn', 'b');
    await sq(page, 'c1').click();
    // Beyaz tükendi: oyun biter
    await expect(page.locator('#rv-board')).toHaveAttribute('data-over', '1');
    await expect(page.locator('#rv-status')).toContainText('Siyah kazandı');
  });

  test('kazanma ekranı görünür ve istatistik yalnızca localStorage içinde tutulur', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.evaluate(() => (window as any).__reversiDebug.setPosition(
      ['bbbbbbw.', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb'], 'b'));
    await expect(page.locator('#rv-over')).toBeHidden();
    await sq(page, 'h8').click();
    await expect(page.locator('#rv-over')).toBeVisible();
    await expect(page.locator('#rv-over-title')).toHaveText('Kazandınız!');
    await expect(page.locator('#rv-over-text')).toContainText('Siyah 64');
    await expect(page.locator('#rv-status')).toContainText('Tebrikler');
    await expect(page.locator('#rv-stats')).toContainText('1 galibiyet');
    const saved = await page.evaluate(() => localStorage.getItem('ba-oyun-reversi'));
    expect(JSON.parse(saved!)).toMatchObject({ w: 1, l: 0, d: 0 });
    await page.locator('#rv-over-close').click();
    await expect(page.locator('#rv-over')).toBeHidden();
    await page.locator('#rv-new').click();
    await expect(page.locator('#rv-board')).toHaveAttribute('data-over', '0');
    await expect(page.locator('#rv-count-b')).toHaveText('2');
  });

  test('bozuk localStorage verisinde çökmez, istatistik sıfırdan başlar', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => localStorage.setItem('ba-oyun-reversi', '{{bozuk'));
    await page.goto(URL_PATH);
    await expect(page.locator('#rv-stats')).toContainText('0 galibiyet');
    await sq(page, 'd3').click();
    await expect(sq(page, 'd3')).toHaveAttribute('data-piece', 'b');
    await page.addInitScript(() => localStorage.setItem('ba-oyun-reversi', 'null'));
    await page.reload();
    await expect(page.locator('#rv-stats')).toContainText('0 galibiyet');
    expect(errors).toEqual([]);
  });

  test('klavye: ok tuşlarıyla gezilir, Enter ile taş konur; etiketler anlamlı', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#rv-mode').selectOption('two');
    await sq(page, 'd4').focus();
    await page.keyboard.press('ArrowUp');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.sq)).toBe('d5');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.sq)).toBe('d7');
    await sq(page, 'd4').focus();
    await page.keyboard.press('ArrowDown');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.sq)).toBe('d3');
    await page.keyboard.press('Enter');
    await expect(sq(page, 'd3')).toHaveAttribute('data-piece', 'b');
    await expect(sq(page, 'e6')).toHaveAttribute('aria-label', /e6, boş/);
  });

  test('hareket azaltma açıkken çevirme animasyonu uygulanmaz; kapalıyken uygulanır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#rv-mode').selectOption('two');
    await sq(page, 'd3').click();
    await expect(page.locator('#rv-board .disc.is-flip')).toHaveCount(1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#rv-new').click();
    await sq(page, 'd3').click();
    await expect(sq(page, 'd4')).toHaveAttribute('data-piece', 'b');
    await expect(page.locator('#rv-board .disc.is-flip')).toHaveCount(0);
  });

  test('360px genişlikte yatay taşma yok ve tahta ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await page.locator('#rv-board').boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(250);
    expect(box!.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box!.width - box!.height)).toBeLessThanOrEqual(2);
    await sq(page, 'd3').click();
    await expect(sq(page, 'd3')).toHaveAttribute('data-piece', 'b');
  });
});
