import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// XOX (3×3) ve Beşli Dizi (15×15): bilgisayar (kolay/zor), iki oyunculu mod, kazanma tespiti, skor, klavye, 360px, içerik.
const URL_PATH = '/oyunlar/xox/';
const STORE_KEY = 'ba-oyun-xox';

const cell = (page: Page, i: number) => page.locator(`.xo-cell[data-i="${i}"]`);
const count = (page: Page, v: 'X' | 'O') => page.locator(`.xo-cell[data-v="${v}"]`);

/** Sırayla verilen hücrelere tıklar (iki oyunculu mod: sıra otomatik değişir). */
async function clickAll(page: Page, order: number[]) {
  for (const i of order) await cell(page, i).click();
}

test.describe('XOX ve Beşli Dizi', () => {
  test('sayfa açılır, 3×3 tahta gelir, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('XOX');
    await expect(page.locator('.xo-cell')).toHaveCount(9);
    await expect(page.locator('#xo-status')).toContainText('Sıra sende');
    await expect(page.locator('#xo-chip-x')).toHaveAttribute('aria-current', 'true');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('zor mod: oyuncu köşe oynayınca bilgisayar merkezi alır', async ({ page }) => {
    await page.goto(URL_PATH);
    await expect(page.locator('#xo-opp')).toHaveValue('hard');
    await cell(page, 0).click();
    await expect(cell(page, 4)).toHaveAttribute('data-v', 'O');
    await expect(count(page, 'O')).toHaveCount(1);
    await expect(page.locator('#xo-chip-x')).toHaveAttribute('aria-current', 'true');
  });

  test('zor mod: oyuncu hep ilk boş kareye oynasa da bilgisayar yenilmez', async ({ page }) => {
    await page.goto(URL_PATH);
    for (let guard = 0; guard < 6; guard++) {
      if (await page.locator('#xo-result.is-active').count()) break;
      const filledBefore = await page.locator('.xo-cell:not([data-v=""])').count();
      await page.locator('.xo-cell[data-v=""]').first().click();
      // Bilgisayarın cevabını (ya da oyun sonunu) bekle.
      await expect.poll(async () => {
        if (await page.locator('#xo-result.is-active').count()) return true;
        return (await page.locator('.xo-cell:not([data-v=""])').count()) >= filledBefore + 2;
      }).toBe(true);
    }
    await expect(page.locator('#xo-result')).toHaveClass(/is-active/);
    await expect(page.locator('#xo-result-title')).not.toContainText('kazandınız');
  });

  test('minimax: her iki işaretle ve tüm insan hamleleriyle bilgisayar asla kaybetmez', async ({ page }) => {
    await page.goto(URL_PATH);
    // game.js saf fonksiyonlarını sayfadaki modülden alır; TS dönüşümü dynamic import u bozmasın diye metin olarak çalıştırılır.
    const result = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/xox/game.js');
      const out = { humanWins: 0, leaves: 0, aiWins: 0 };
      const other = (p) => (p === 'X' ? 'O' : 'X');
      function play(board, turn, human, ai, opener) {
        const w = m.winner3(board);
        if (w) { out.leaves++; if (w.who === human) out.humanWins++; else out.aiWins++; return; }
        if (board.every(Boolean)) { out.leaves++; return; }
        if (turn === human) {
          for (let i = 0; i < 9; i++) {
            if (board[i]) continue;
            board[i] = turn; play(board, other(turn), human, ai, opener); board[i] = '';
          }
        } else {
          const i = m.bestMove3(board, ai, () => opener);
          board[i] = turn; play(board, other(turn), human, ai, opener); board[i] = '';
        }
      }
      for (const human of ['X', 'O']) {
        for (const opener of [0, 0.25, 0.5, 0.75, 0.99]) play(Array(9).fill(''), 'X', human, other(human), opener);
      }
      return out;
    })()`) as { humanWins: number; leaves: number; aiWins: number };
    expect(result.humanWins).toBe(0);
    expect(result.leaves).toBeGreaterThan(500);
    expect(result.aiWins).toBeGreaterThan(0);
  });

  test('bilgisayar kazanma fırsatını kullanır ve tehdidi engeller', async ({ page }) => {
    await page.goto(URL_PATH);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/xox/game.js');
      // O: 3,4 ve 5 boş -> kazanır (X: 0,1,6)
      const win = m.bestMove3(['X','X','','O','O','','X','',''], 'O');
      // X: 0,1 -> O 2 yi engellemeli
      const block = m.bestMove3(['X','X','','O','','','','',''], 'O');
      return { win, block };
    })()`) as { win: number; block: number };
    expect(res.win).toBe(5);
    expect(res.block).toBe(2);
  });

  test('kolay mod: bilgisayar cevap verir; O seçilince bilgisayar ilk hamleyi yapar', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#xo-opp', 'easy');
    await cell(page, 0).click();
    await expect(count(page, 'O')).toHaveCount(1);
    await page.selectOption('#xo-side', 'O');
    await expect(count(page, 'X')).toHaveCount(1); // bilgisayar (X) başladı
    await expect(count(page, 'O')).toHaveCount(0);
    await expect(page.locator('#xo-status')).toContainText('Sıra sende');
  });

  test('iki oyunculu mod: X üçlü yapınca kazanma tespit edilir, çizgi çizilir, skor güncellenir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#xo-opp', 'two');
    await expect(page.locator('#xo-side-field')).toBeHidden();
    await clickAll(page, [0, 3, 1, 4]);
    await expect(page.locator('#xo-chip-x')).toHaveAttribute('aria-current', 'true');
    await cell(page, 2).click();
    await expect(page.locator('#xo-status')).toContainText('Oyuncu 1 (X) kazandı');
    await expect(page.locator('#xo-result')).toHaveClass(/is-active/);
    await expect(page.locator('.xo-cell.is-win')).toHaveCount(3);
    await expect(page.locator('.xo-line line')).toHaveCount(1);
    await expect(page.locator('#xo-sa')).toHaveText('1');
    // Oyun bitince boş kareler işaretlenemez.
    await cell(page, 8).click({ force: true });
    await expect(cell(page, 8)).toHaveAttribute('data-v', '');
    // Skor yeniden yüklemede korunur.
    await page.reload();
    await expect(page.locator('#xo-opp')).toHaveValue('two');
    await expect(page.locator('#xo-sa')).toHaveText('1');
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE_KEY);
    expect(stored.scores['xox|two'].a).toBe(1);
    // Tekrar oyna: tahta temizlenir, skor kalır.
    await clickAll(page, [0, 3, 1, 4, 2]);
    await page.locator('#xo-again').click();
    await expect(page.locator('.xo-cell[data-v=""]')).toHaveCount(9);
    await expect(page.locator('#xo-result')).not.toHaveClass(/is-active/);
    await expect(page.locator('#xo-sa')).toHaveText('2');
    // Skoru sıfırla
    await page.locator('#xo-reset-score').click();
    await expect(page.locator('#xo-sa')).toHaveText('0');
  });

  test('iki oyunculu mod: O çapraz kazanır, dolu tahta berabere biter', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#xo-opp', 'two');
    await clickAll(page, [0, 2, 1, 4, 5, 6]); // O: 2,4,6 çapraz
    await expect(page.locator('#xo-status')).toContainText('Oyuncu 2 (O) kazandı');
    await expect(page.locator('#xo-sb')).toHaveText('1');
    await page.locator('#xo-restart').click();
    await clickAll(page, [0, 1, 2, 4, 3, 5, 7, 6, 8]);
    await expect(page.locator('#xo-status')).toContainText('Berabere');
    await expect(page.locator('#xo-sd')).toHaveText('1');
    await expect(page.locator('.xo-line line')).toHaveCount(0);
  });

  test('beşli dizi: 15×15 tahta, iki oyuncuda beş yatay taş kazanır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#xo-mode', 'gomoku');
    await expect(page.locator('.xo-cell')).toHaveCount(225);
    await page.selectOption('#xo-opp', 'two');
    const row = 7 * 15;
    // X: (7,3..7); O: (0,0..3)
    await clickAll(page, [row + 3, 0, row + 4, 1, row + 5, 2, row + 6, 3]);
    await expect(page.locator('#xo-status')).toContainText('Sıra: Oyuncu 1 (X)');
    await cell(page, row + 7).click();
    await expect(page.locator('#xo-status')).toContainText('Oyuncu 1 (X) kazandı');
    await expect(page.locator('.xo-cell.is-win')).toHaveCount(5);
    await expect(page.locator('.xo-line line')).toHaveCount(1);
    await expect(page.locator('#xo-sa')).toHaveText('1');
    const before = await count(page, 'X').count();
    await cell(page, 200).click({ force: true });
    expect(await count(page, 'X').count()).toBe(before);
  });

  test('beşli dizi: dört taş yetmez, çapraz beşli de tespit edilir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#xo-mode', 'gomoku');
    await page.selectOption('#xo-opp', 'two');
    const d = (k: number) => (3 + k) * 15 + (3 + k); // çapraz hücreler
    // X: ilk dört çapraz (oyun sürmeli), O: ilk satır
    await clickAll(page, [d(0), 0, d(1), 1, d(2), 2, d(3), 3]);
    await expect(page.locator('#xo-result')).not.toHaveClass(/is-active/);
    await cell(page, d(4)).click();
    await expect(page.locator('#xo-status')).toContainText('Oyuncu 1 (X) kazandı');
    await expect(page.locator('.xo-cell.is-win')).toHaveCount(5);
  });

  test('beşli dizi: bilgisayar merkeze yakın cevap verir; kazanır ve engeller (saf mantık)', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#xo-mode', 'gomoku');
    await expect(page.locator('#xo-opp')).toHaveValue('hard');
    await cell(page, 112).click(); // merkez
    await expect(count(page, 'O')).toHaveCount(1);
    const oIdx = Number(await page.locator('.xo-cell[data-v="O"]').getAttribute('data-i'));
    const dr = Math.abs(Math.floor(oIdx / 15) - 7);
    const dc = Math.abs((oIdx % 15) - 7);
    expect(Math.max(dr, dc)).toBe(1);

    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/xox/game.js');
      const n = 15;
      const mk = () => Array(n * n).fill('');
      // X yatay dört taş (7,3..6); O uzakta. O oynayacak -> uçlardan birini kapatmalı.
      const b1 = mk();
      for (let c = 3; c <= 6; c++) b1[7 * n + c] = 'X';
      b1[0] = 'O'; b1[2 * n] = 'O'; b1[4 * n + 12] = 'O';
      const block = m.gomokuMove(b1, n, 'O', 'hard', () => 0);
      // O de dört taşa sahip: engellemek yerine kendi beşlisini tamamlamalı.
      const b2 = mk();
      for (let c = 3; c <= 6; c++) { b2[7 * n + c] = 'X'; b2[10 * n + c] = 'O'; }
      const win = m.gomokuMove(b2, n, 'O', 'hard', () => 0);
      // Boş tahtada merkez.
      const first = m.gomokuMove(mk(), n, 'X', 'hard', () => 0);
      return { block, win, first, winCheck: m.checkWinAt((() => { const b = mk(); for (let k = 0; k < 6; k++) b[k * n + k] = 'X'; return b; })(), n, 3 * n + 3, 5) };
    })()`) as { block: number; win: number; first: number; winCheck: number[] | null };
    expect([7 * 15 + 2, 7 * 15 + 7]).toContain(res.block);
    expect([10 * 15 + 2, 10 * 15 + 7]).toContain(res.win);
    expect(res.first).toBe(112);
    expect(res.winCheck && res.winCheck.length).toBe(6); // altılı da kazanır (serbest kural)
  });

  test('klavye: ok tuşlarıyla gezinilir, Enter işaretler', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#xo-opp', 'two');
    await page.locator('.xo-cell[data-i="4"]').focus();
    const active = () => page.evaluate(() => (document.activeElement as HTMLElement)?.dataset.i);
    await page.keyboard.press('ArrowLeft');
    expect(await active()).toBe('3');
    await page.keyboard.press('ArrowUp');
    expect(await active()).toBe('0');
    await page.keyboard.press('ArrowLeft'); // kenarda yerinde kalır
    expect(await active()).toBe('0');
    await page.keyboard.press('Enter');
    await expect(cell(page, 0)).toHaveAttribute('data-v', 'X');
    await page.keyboard.press('End');
    expect(await active()).toBe('2');
    await page.keyboard.press(' ');
    await expect(cell(page, 2)).toHaveAttribute('data-v', 'O');
    expect(await page.locator('.xo-cell[tabindex="0"]').count()).toBe(1);
  });

  test('360px genişlikte hem 3×3 hem 15×15 tahta taşmadan sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const small = await page.locator('#xo-board').boundingBox();
    expect(small!.width).toBeLessThanOrEqual(360);
    await page.selectOption('#xo-mode', 'gomoku');
    expect(await overflow()).toBeLessThanOrEqual(0);
    const big = await page.locator('#xo-board').boundingBox();
    expect(big!.x).toBeGreaterThanOrEqual(0);
    expect(big!.x + big!.width).toBeLessThanOrEqual(360);
    const cellBox = await cell(page, 0).boundingBox();
    expect(cellBox!.width).toBeGreaterThanOrEqual(18);
  });

  test('içerik: en az 800 kelime, 3 reklam alanı, en az 6 SSS, geçerli JSON-LD', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-xox-a', 'oyun-xox-b', 'oyun-xox-c']);
    expect(await page.locator('#oyun-kutusu .ba-ad').count()).toBe(0);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(6);
    const game = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame');
    expect(game.applicationCategory).toMatch(/Game/);
  });
});
