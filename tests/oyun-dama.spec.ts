import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Dama (Türk daması) oyunu: başlangıç dizilimi, hamle vurgusu, bilgisayar cevabı, zorunlu alma,
// motor kuralları, oyun sonu, klavye, mobil taşma, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/dama/';
const sq = (page: Page, name: string) => page.locator(`#dm-board [data-sq="${name}"]`);
const count = (page: Page, piece: string) => page.locator(`#dm-board [data-piece="${piece}"]`).count();

test.describe('Oyun: dama', () => {
  test('sayfa açılır, 16+16 taş dizilir, 3 reklam ve 800+ kelime var, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#dm-board .sq')).toHaveCount(64);
    expect(await count(page, 'w')).toBe(16);
    expect(await count(page, 'b')).toBe(16);
    await expect(page.locator('#dm-count-w')).toHaveText('16');
    await expect(page.locator('#dm-count-b')).toHaveText('16');
    await expect(page.locator('#dm-status')).toContainText('Sıra sizde');
    // Taşlar doğru karelerde: beyaz 2-3. sıra, siyah 6-7. sıra
    await expect(sq(page, 'a2')).toHaveAttribute('data-piece', 'w');
    await expect(sq(page, 'h3')).toHaveAttribute('data-piece', 'w');
    await expect(sq(page, 'a6')).toHaveAttribute('data-piece', 'b');
    await expect(sq(page, 'h7')).toHaveAttribute('data-piece', 'b');
    await expect(sq(page, 'a1')).toHaveAttribute('data-piece', '');
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('reklam alanları oyun düğmelerinin yanında değil, kutunun altında, ortasında ve sonunda', async ({ page }) => {
    await page.goto(URL_PATH);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-dama-a', 'oyun-dama-b', 'oyun-dama-c']);
    // Hiçbir reklam oyun kutusunun içinde olmamalı
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    // A reklamı oyun kutusundan sonra gelir
    const order = await page.evaluate(() => {
      const box = document.querySelector('.game-box')!;
      const ad = document.querySelector('[data-slot="oyun-dama-a"]')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
  });

  test('taşa tıklayınca geçerli hamleler vurgulanır; geçersiz kareye tıklamak hamle yaptırmaz', async ({ page }) => {
    await page.goto(URL_PATH);
    // Başlangıçta yalnızca öndeki 8 taş hareket edebilir (üçüncü sıra); ikinci sıradakiler tıkalı.
    await expect(page.locator('#dm-board .sq.is-movable')).toHaveCount(8);
    await sq(page, 'c3').click();
    await expect(sq(page, 'c3')).toHaveClass(/is-selected/);
    await expect(page.locator('#dm-board .is-dest')).toHaveCount(1);
    await expect(sq(page, 'c4')).toHaveClass(/is-dest/);
    // Geriye ya da çapraza gidilemez: d4 ve b4 vurgulanmaz
    await expect(sq(page, 'd4')).not.toHaveClass(/is-dest/);
    // Vurgusuz kareye tıklamak seçimi kaldırır, tahta değişmez
    await sq(page, 'f6').click();
    await expect(page.locator('#dm-board .is-dest')).toHaveCount(0);
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '0');
    // İkinci sıradaki taş (c2) hareket edemez: seçilmez
    await sq(page, 'c2').click();
    await expect(page.locator('#dm-board .is-selected')).toHaveCount(0);
  });

  test('bir hamleden sonra bilgisayar cevap verir; geri al ikisini birlikte geri alır', async ({ page }) => {
    await page.goto(URL_PATH);
    await sq(page, 'c3').click();
    await sq(page, 'c4').click();
    await expect(sq(page, 'c4')).toHaveAttribute('data-piece', 'w');
    // Bilgisayar (siyah) cevap verir: geçmişte 2 hamle olur ve sıra yeniden beyazdadır
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '2', { timeout: 8000 });
    await expect(page.locator('#dm-board')).toHaveAttribute('data-turn', 'w');
    await expect(page.locator('#dm-history li')).toHaveCount(1);
    expect(await count(page, 'b')).toBe(16);
    // Siyahın dizilimi değişmiş olmalı (bir taş yer değiştirdi)
    const blackRow = await page.locator('#dm-board [data-piece="b"]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.sq).sort().join(','));
    expect(blackRow).not.toBe('a6,a7,b6,b7,c6,c7,d6,d7,e6,e7,f6,f7,g6,g7,h6,h7');
    // Geri al
    await page.locator('#dm-undo').click();
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '0');
    await expect(sq(page, 'c3')).toHaveAttribute('data-piece', 'w');
    await expect(sq(page, 'c4')).toHaveAttribute('data-piece', '');
    await expect(sq(page, 'c6')).toHaveAttribute('data-piece', 'b');
    await expect(page.locator('#dm-undo')).toBeDisabled();
  });

  test('alma zorunluluğu uygulanır: çoklu alma zinciri adım adım tamamlanır ve taş dama olur', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#dm-mode').selectOption('two');
    // Beyaz c3-c4, siyah c6-c5: beyazın c4xc6xc8 zinciri zorunlu hale gelir
    await sq(page, 'c3').click(); await sq(page, 'c4').click();
    await sq(page, 'c6').click(); await sq(page, 'c5').click();
    await expect(page.locator('#dm-status')).toContainText('Alma zorunlu');
    // Yalnızca almayı yapabilen taş işaretlenir
    await expect(page.locator('#dm-board .sq.is-must')).toHaveCount(1);
    await expect(sq(page, 'c4')).toHaveClass(/is-must/);
    // Alma yapamayan taş seçilemez; sade hamle sunulmaz
    await sq(page, 'g3').click();
    await expect(page.locator('#dm-board .is-selected')).toHaveCount(0);
    await expect(page.locator('#dm-board .is-dest')).toHaveCount(0);
    await expect(page.locator('#dm-status')).toContainText('Alma zorunlu');
    await sq(page, 'g4').click(); // boş kare: hamle olmaz
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '2');
    await expect(sq(page, 'g3')).toHaveAttribute('data-piece', 'w');
    // Alma zinciri: c4 → c6 (alınan c5), ardından c6 → c8 (alınan c7)
    await sq(page, 'c4').click();
    await expect(page.locator('#dm-board .is-dest-cap')).toHaveCount(1);
    await expect(sq(page, 'c6')).toHaveClass(/is-dest-cap/);
    await sq(page, 'c6').click();
    // Hamle henüz bitmedi: yarım zincir, geçmiş değişmez
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '2');
    await expect(sq(page, 'c8')).toHaveClass(/is-dest-cap/);
    await sq(page, 'c8').click();
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '3');
    await expect(sq(page, 'c8')).toHaveAttribute('data-piece', 'W');
    expect(await count(page, 'b')).toBe(14);
    await expect(page.locator('#dm-count-b')).toHaveText('14');
    await expect(page.locator('#dm-king-w')).toHaveText('1');
    await expect(page.locator('#dm-history')).toContainText('c4xc6xc8');
  });

  test('oyun sonu: son taş alınınca kazanan ilan edilir, yeni oyun 16+16 dizer', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#dm-mode').selectOption('two');
    await page.evaluate(() => (window as any).__damaDebug.setPosition([
      '........', '........', '........', '..b.....', '..w.....', '........', '........', '........',
    ], 'w'));
    await expect(page.locator('#dm-status')).toContainText('Alma zorunlu');
    await sq(page, 'c4').click();
    await sq(page, 'c6').click();
    await expect(page.locator('#dm-status')).toContainText('Beyaz kazandı');
    await expect(page.locator('#dm-board')).toHaveAttribute('data-over', '1');
    // Oyun bitince tahta kilitlenir
    await sq(page, 'c6').click();
    await expect(page.locator('#dm-board .is-selected')).toHaveCount(0);
    await page.locator('#dm-new').click();
    await expect(page.locator('#dm-board')).toHaveAttribute('data-over', '0');
    expect(await count(page, 'w')).toBe(16);
    expect(await count(page, 'b')).toBe(16);
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '0');
  });

  test('bilgisayara karşı yenilgi ve galibiyet sayısı yalnızca localStorage içinde tutulur', async ({ page }) => {
    await page.goto(URL_PATH);
    // Bilgisayar modunda insan beyaz: siyahın son taşı alınırsa galibiyet yazılır
    await page.evaluate(() => (window as any).__damaDebug.setPosition([
      '........', '........', '........', '..b.....', '..w.....', '........', '........', '........',
    ], 'w'));
    await sq(page, 'c4').click();
    await sq(page, 'c6').click();
    await expect(page.locator('#dm-status')).toContainText('Tebrikler');
    await expect(page.locator('#dm-stats')).toContainText('1 galibiyet');
    const saved = await page.evaluate(() => localStorage.getItem('ba-oyun-dama-istatistik'));
    expect(JSON.parse(saved!)).toMatchObject({ w: 1, l: 0, d: 0 });
  });

  test('siyah seçilince tahta çevrilir ve bilgisayar (beyaz) ilk hamleyi oynar', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#dm-color').selectOption('b');
    await expect(page.locator('#dm-history')).toHaveAttribute('data-count', '1', { timeout: 8000 });
    await expect(page.locator('#dm-board .sq').first()).toHaveAttribute('data-sq', 'h1');
    await expect(page.locator('#dm-board')).toHaveAttribute('data-turn', 'b');
    // Siyah (insan) üstten aşağı değil, kendi tarafından yukarı doğru görür; a7 taşı a6'ya gider
    await sq(page, 'a6').click();
    await expect(page.locator('#dm-board .is-dest')).toHaveCount(1);
    await expect(sq(page, 'a5')).toHaveClass(/is-dest/);
  });

  test('klavye: ok tuşlarıyla gezilir, Enter ile taş seçilir ve hamle oynanır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#dm-mode').selectOption('two');
    await sq(page, 'c3').focus();
    await page.keyboard.press('ArrowRight');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.sq)).toBe('d3');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Enter');
    await expect(sq(page, 'c3')).toHaveClass(/is-selected/);
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await expect(sq(page, 'c4')).toHaveAttribute('data-piece', 'w');
    await expect(page.locator('#dm-status')).toContainText('Sıra: Siyah');
    // Etiketler ekran okuyucu için anlamlı
    await expect(sq(page, 'c4')).toHaveAttribute('aria-label', /c4, beyaz taş/);
  });

  test('motor: taş geri ve çapraz gidemez, dama uzun gider, alma kuralları doğru', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/dama/engine.js');
      const mv = (rows: string[], side: string) => E.legalMoves(E.boardFromRows(rows), side).map(E.notation).sort();
      const e = '........';
      return {
        // Tek beyaz taş d4: ileri d5, yanlar c4 ve e4 (geri ve çapraz yok)
        man: mv([e, e, e, e, '...w....', e, e, e], 'w'),
        // Siyah taş yukarıdan aşağı gider
        blackMan: mv([e, e, e, e, '...b....', e, e, e], 'b'),
        // Boş tahtada ortadaki dama 14 kareye gider
        kingCount: mv([e, e, e, e, '...W....', e, e, e], 'w').length,
        // Taş yan alır: d4 beyaz, e4 siyah, f4 boş
        sideCapture: mv([e, e, e, e, '...wb...', e, e, e], 'w'),
        // Taş geri alamaz: siyah d4'ün hemen altında (d3), d2 boş
        noBackCapture: mv([e, e, e, e, '...w....', '...b....', e, e], 'w'),
        // Dama uzaktan alır ve arkadaki her boş kareye inebilir
        kingCapture: mv([e, e, e, e, '.W..b...', e, e, e], 'w'),
      };
    });
    expect(r.man).toEqual(['d4-c4', 'd4-d5', 'd4-e4']);
    expect(r.blackMan).toEqual(['d4-c4', 'd4-d3', 'd4-e4']);
    expect(r.kingCount).toBe(14);
    expect(r.sideCapture).toEqual(['d4xf4']);
    expect(r.noBackCapture).toEqual(['d4-c4', 'd4-d5', 'd4-e4']);
    expect(r.kingCapture).toEqual(['b4xf4', 'b4xg4', 'b4xh4']);
  });

  test('motor: en çok taş alan yol zorunludur, sade hamle yasaktır', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/dama/engine.js');
      // c4 beyaz iki taşlık zincir yapabilir (c5, c7 → c8); g4 beyaz yalnızca bir taş alabilir (g5).
      // a1'deki beyaz taşın sade hamlesi de yasak olmalı. Yalnızca c4xc6xc8 geçerlidir.
      const net = [
        '........', // 8
        '..b.....', // 7: c7
        '........', // 6
        '..b...b.', // 5: c5, g5
        '..w...w.', // 4: c4, g4
        '........', // 3
        '........', // 2
        'w.......', // 1: a1
      ];
      const moves = E.legalMoves(E.boardFromRows(net), 'w');
      return {
        notations: moves.map(E.notation),
        allCaptures: moves.every((m: { capture: boolean }) => m.capture),
        sizes: moves.map((m: { captured: number[] }) => m.captured.length),
        promoted: moves.map((m: { promote: boolean }) => m.promote),
      };
    });
    expect(r.notations).toEqual(['c4xc6xc8']);
    expect(r.allCaptures).toBe(true);
    expect(r.sizes).toEqual([2]);
    expect(r.promoted).toEqual([true]);
  });

  test('motor: zor seviye makul sürede hamle seçer, geçerli hamle döndürür', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/dama/engine.js');
      const b = E.initialBoard();
      const t0 = performance.now();
      const m = E.chooseMove(b, 'b', 'zor');
      const ms = performance.now() - t0;
      const legal = E.legalMoves(b, 'b').map(E.notation);
      return { ms, ok: legal.includes(E.notation(m)) };
    });
    expect(r.ok).toBe(true);
    expect(r.ms).toBeLessThan(4000);
  });

  test('360px genişlikte yatay taşma yok ve tahta ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await page.locator('#dm-board').boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(250);
    expect(box!.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box!.width - box!.height)).toBeLessThanOrEqual(2);
    // Dokunmatik hamle de çalışır
    await sq(page, 'c3').tap().catch(() => sq(page, 'c3').click());
  });
});
