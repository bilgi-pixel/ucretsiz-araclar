import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Satranç oyunu: tahta ve vurgular, hamle/geçersiz hamle, bilgisayar cevabı (Web Worker), mat, terfi, geri al,
// tahtayı çevirme, iki kişilik mod, sürükle-bırak, klavye, FEN/PGN, beraberlik türleri, skor ve bozuk veri,
// iç yöntem doğrulaması (perft), 360px, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/satranc/';
const STORE = 'ba-oyun-satranc';
const sq = (page: Page, name: string) => page.locator(`#sa-board [data-sq="${name}"]`);
const board = (page: Page) => page.locator('#sa-board');
const hook = (page: Page) => page.evaluateHandle(() => (window as any).__satrancTest());

// Çoban matı öncesi: beyaz Vh5xf7# oynar.
const MATE_IN_1 = 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4';
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

async function open(page: Page, opts: { two?: boolean } = {}) {
  await page.goto(URL_PATH);
  await page.waitForFunction(() => typeof (window as any).__satrancTest === 'function');
  if (opts.two) await page.locator('#sa-mode').selectOption('two');
  await page.locator('#sa-box').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
}
const fen = (page: Page) => page.evaluate(() => (window as any).__satrancTest().fen());
const loadFen = (page: Page, f: string) => page.evaluate((x) => (window as any).__satrancTest(x).fen(), f);
const history = (page: Page) => page.evaluate(() => (window as any).__satrancTest().history());

test.describe('Oyun: satranç', () => {
  test('sayfa açılır, 32 taş dizilir, 3 reklam, 900+ kelime, SSS ve JSON-LD var; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#sa-board .sq')).toHaveCount(64);
    await expect(page.locator('#sa-board [data-piece^="w"]')).toHaveCount(16);
    await expect(page.locator('#sa-board [data-piece^="b"]')).toHaveCount(16);
    await expect(sq(page, 'e1')).toHaveAttribute('data-piece', 'wK');
    await expect(sq(page, 'd8')).toHaveAttribute('data-piece', 'bQ');
    await expect(sq(page, 'e4')).toHaveAttribute('data-piece', '');
    await expect(page.locator('#sa-status')).toContainText('Sıra sizde');
    expect(await fen(page)).toBe(START_FEN);
    expect(await page.title()).toBe('Satranç Oyna – Ücretsiz Online Satranç (kurulumsuz)');
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-satranc-a', 'oyun-satranc-b', 'oyun-satranc-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const box = document.querySelector('.game-box')!;
      const ad = document.querySelector('[data-slot="oyun-satranc-a"]')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
    const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
    const article = await page.locator('article.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(words(article), 'makale kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const nodes = data['@graph'] as { '@type': string; mainEntity?: unknown[] }[];
    expect(nodes.find((n) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(nodes.find((n) => n['@type'] === 'FAQPage')!.mainEntity!.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('#sa-full')).toBeVisible();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('taşa tıklayınca geçerli hamleler vurgulanır; hamle oynanır ve bilgisayar (worker) cevap verir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await sq(page, 'e2').click();
    await expect(sq(page, 'e2')).toHaveClass(/is-selected/);
    await expect(page.locator('#sa-board .is-dest')).toHaveCount(2);
    await expect(sq(page, 'e3')).toHaveClass(/is-dest/);
    await expect(sq(page, 'e4')).toHaveClass(/is-dest/);
    await expect(sq(page, 'e2')).toHaveAttribute('aria-label', /e2, beyaz piyon, seçili/);
    // Rakip taşına tıklamak seçim yaptırmaz
    await sq(page, 'e7').click();
    await expect(page.locator('#sa-board .is-selected')).toHaveCount(0);
    // Atın hamleleri
    await sq(page, 'g1').click();
    await expect(page.locator('#sa-board .is-dest')).toHaveCount(2);
    await expect(sq(page, 'f3')).toHaveClass(/is-dest/);
    await expect(sq(page, 'h3')).toHaveClass(/is-dest/);
    // e2-e4 oyna
    await sq(page, 'e2').click();
    await sq(page, 'e4').click();
    await expect(sq(page, 'e4')).toHaveAttribute('data-piece', 'wP');
    await expect(sq(page, 'e2')).toHaveAttribute('data-piece', '');
    await expect(page.locator('#sa-history')).toContainText('e4');
    // Bilgisayar (siyah) cevap verir; sonuç worker'dan gelir
    await expect(page.locator('#sa-history')).toHaveAttribute('data-count', '2', { timeout: 15000 });
    await expect(board(page)).toHaveAttribute('data-turn', 'w');
    await expect(board(page)).toHaveAttribute('data-thinking', '0');
    await expect(page.locator('#sa-history li')).toHaveCount(1);
    expect(await page.locator('#sa-board [data-piece^="b"]').count()).toBe(16);
    expect((await history(page)).length).toBe(2);
    expect(page.workers().length, 'hesaplama Web Worker içinde yapılmalı').toBeGreaterThan(0);
    expect(page.workers().some((w) => w.url().endsWith('/worker.js'))).toBe(true);
    expect(errors).toEqual([]);
  });

  test('geçersiz hamle reddedilir: tahta değişmez ve Türkçe açıklama görünür', async ({ page }) => {
    await open(page, { two: true });
    const before = await fen(page);
    await sq(page, 'e2').click();
    await sq(page, 'e5').click(); // piyon üç kare gidemez
    expect(await fen(page)).toBe(before);
    await expect(page.locator('#sa-msg')).toContainText('geçerli değil');
    await expect(page.locator('#sa-board .is-selected')).toHaveCount(0);
    // Kullanıcı kancası da geçersiz hamleyi kabul etmez
    expect(await page.evaluate(() => (window as any).__satrancTest().move('e2', 'e5'))).toBe(false);
    expect(await page.evaluate(() => (window as any).__satrancTest().move('e7', 'e5'))).toBe(false); // sıra beyazda
    expect(await fen(page)).toBe(before);
    // Şah altındayken: beyaz şah e1, siyah kale e2 şah çekiyor; kale korumasız olduğu için şahla alınabilir
    await loadFen(page, '4k3/8/8/8/8/8/4r3/4K3 w - - 0 1');
    await expect(page.locator('#sa-status')).toContainText('Şah!');
    await expect(sq(page, 'e1')).toHaveClass(/is-check/);
    await sq(page, 'e1').click();
    await expect(sq(page, 'e2')).toHaveClass(/is-dest-cap/);
    await sq(page, 'e2').click();
    await expect(sq(page, 'e2')).toHaveAttribute('data-piece', 'wK');
    // Şah çekilmişken şahı kurtarmayan taş (d1 kalesi) hiçbir kareye gidemez; neden açıklanır
    await loadFen(page, '4k3/8/8/8/8/8/4r3/3RK3 w - - 0 1');
    await sq(page, 'd1').click();
    await expect(page.locator('#sa-board .is-dest')).toHaveCount(0);
    await expect(page.locator('#sa-msg')).toContainText('gidebileceği kare yok');
  });

  test('mat: çoban matı konumu yüklenir, son hamle "şah mat" sonucunu verir ve tahta kilitlenir', async ({ page }) => {
    await open(page, { two: true });
    expect(await loadFen(page, MATE_IN_1)).toBe(MATE_IN_1);
    await sq(page, 'h5').click();
    await expect(sq(page, 'f7')).toHaveClass(/is-dest-cap/);
    await sq(page, 'f7').click();
    await expect(page.locator('#sa-status')).toContainText('Şah mat');
    await expect(page.locator('#sa-status')).toContainText('Beyaz kazandı');
    await expect(board(page)).toHaveAttribute('data-over', '1');
    await expect(board(page)).toHaveAttribute('data-result', 'mat');
    await expect(sq(page, 'e8')).toHaveClass(/is-check/);
    await expect(sq(page, 'h5')).toHaveClass(/is-last/);
    await expect(sq(page, 'f7')).toHaveClass(/is-last/);
    expect(await history(page)).toEqual(['Qxf7#']);
    expect(await page.evaluate(() => (window as any).__satrancTest().result())).toEqual({ winner: 'w', kind: 'mat' });
    // Oyun bitince tahta kilitlenir
    await sq(page, 'e8').click();
    await expect(page.locator('#sa-board .is-selected')).toHaveCount(0);
    // Yeni oyun başlangıç dizilimini kurar
    await page.locator('#sa-new').click();
    await expect(board(page)).toHaveAttribute('data-over', '0');
    expect(await fen(page)).toBe(START_FEN);
  });

  test('piyon terfisi: seçim penceresi açılır, Esc iptal eder, seçilen taş tahtaya gelir', async ({ page }) => {
    await open(page, { two: true });
    await loadFen(page, '8/P7/8/8/8/8/k6K/8 w - - 0 1');
    await sq(page, 'a7').click();
    await sq(page, 'a8').click();
    await expect(page.locator('#sa-promo')).toBeVisible();
    await expect(page.locator('#sa-promo-list button')).toHaveCount(4);
    expect(await page.evaluate(() => (window as any).__satrancTest().pendingPromotion())).toEqual({ from: 'a7', to: 'a8' });
    expect(await history(page)).toEqual([]); // henüz hamle yapılmadı
    // Klavye ile iptal
    await page.keyboard.press('Escape');
    await expect(page.locator('#sa-promo')).toBeHidden();
    expect(await fen(page)).toBe('8/P7/8/8/8/8/k6K/8 w - - 0 1');
    // Yeniden dene ve atı seç
    await sq(page, 'a7').click();
    await sq(page, 'a8').click();
    await page.locator('#sa-promo-n').click();
    await expect(page.locator('#sa-promo')).toBeHidden();
    await expect(sq(page, 'a8')).toHaveAttribute('data-piece', 'wN');
    expect(await history(page)).toEqual(['a8=N']);
    // Vezir terfisi şah çeker
    await loadFen(page, '8/P7/8/8/8/8/k6K/8 w - - 0 1');
    await sq(page, 'a7').click();
    await sq(page, 'a8').click();
    await page.locator('#sa-promo-q').click();
    await expect(sq(page, 'a8')).toHaveAttribute('data-piece', 'wQ');
    expect(await history(page)).toEqual(['a8=Q+']);
    await expect(page.locator('#sa-status')).toContainText('Şah!');
  });

  test('rok ve geçerken alma chess.js kurallarıyla çalışır', async ({ page }) => {
    await open(page, { two: true });
    await loadFen(page, 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1');
    await sq(page, 'e1').click();
    await expect(sq(page, 'g1')).toHaveClass(/is-dest/); // kısa rok
    await expect(sq(page, 'c1')).toHaveClass(/is-dest/); // uzun rok
    await sq(page, 'g1').click();
    await expect(sq(page, 'g1')).toHaveAttribute('data-piece', 'wK');
    await expect(sq(page, 'f1')).toHaveAttribute('data-piece', 'wR');
    expect(await history(page)).toEqual(['O-O']);
    // Geçerken alma: beyaz piyon e5, siyah d7-d5 oynar, beyaz exd6
    await loadFen(page, '4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1');
    await sq(page, 'd7').click();
    await sq(page, 'd5').click();
    await sq(page, 'e5').click();
    await expect(sq(page, 'd6')).toHaveClass(/is-dest-cap/);
    await sq(page, 'd6').click();
    await expect(sq(page, 'd5')).toHaveAttribute('data-piece', ''); // alınan piyon tahtadan kalkar
    await expect(sq(page, 'd6')).toHaveAttribute('data-piece', 'wP');
    expect(await history(page)).toEqual(['d5', 'exd6']);
  });

  test('geri al: bilgisayara karşı oyuncunun hamlesini ve cevabı birlikte; iki kişilikte tek hamleyi geri alır', async ({ page }) => {
    await open(page);
    await expect(page.locator('#sa-undo')).toBeDisabled();
    await sq(page, 'd2').click();
    await sq(page, 'd4').click();
    await expect(page.locator('#sa-history')).toHaveAttribute('data-count', '2', { timeout: 15000 });
    await expect(page.locator('#sa-undo')).toBeEnabled();
    await page.locator('#sa-undo').click();
    await expect(page.locator('#sa-history')).toHaveAttribute('data-count', '0');
    expect(await fen(page)).toBe(START_FEN);
    await expect(sq(page, 'd2')).toHaveAttribute('data-piece', 'wP');
    await expect(page.locator('#sa-undo')).toBeDisabled();
    // Bilgisayar düşünürken geri al: hesaplama iptal edilir, sıra yeniden sizde
    await sq(page, 'e2').click();
    await sq(page, 'e4').click();
    await page.locator('#sa-undo').click();
    await expect(board(page)).toHaveAttribute('data-thinking', '0');
    expect(await fen(page)).toBe(START_FEN);
    await page.waitForTimeout(700); // bayat sonuç gelirse tahtayı bozmamalı
    expect(await fen(page)).toBe(START_FEN);
    // İki kişilik: tek hamle
    await page.locator('#sa-mode').selectOption('two');
    await sq(page, 'e2').click(); await sq(page, 'e4').click();
    await sq(page, 'e7').click(); await sq(page, 'e5').click();
    await page.locator('#sa-undo').click();
    expect(await history(page)).toEqual(['e4']);
    await expect(page.locator('#sa-status')).toContainText('Sıra: Siyah');
  });

  test('tahtayı çevir düğmesi ve siyah seçimi: koordinatlar döner, bilgisayar (beyaz) ilk hamleyi oynar', async ({ page }) => {
    await open(page);
    await expect(page.locator('#sa-board .sq').first()).toHaveAttribute('data-sq', 'a8');
    await page.locator('#sa-flip').click();
    await expect(page.locator('#sa-board .sq').first()).toHaveAttribute('data-sq', 'h1');
    await expect(page.locator('#sa-ranks span').first()).toHaveText('1');
    await expect(page.locator('#sa-files span').first()).toHaveText('h');
    await expect(page.locator('#sa-flip')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#sa-flip').click();
    await expect(page.locator('#sa-board .sq').first()).toHaveAttribute('data-sq', 'a8');
    // Siyah seç
    await page.locator('#sa-color').selectOption('b');
    await expect(page.locator('#sa-board .sq').first()).toHaveAttribute('data-sq', 'h1');
    await expect(page.locator('#sa-history')).toHaveAttribute('data-count', '1', { timeout: 15000 });
    await expect(board(page)).toHaveAttribute('data-turn', 'b');
    await expect(page.locator('#sa-status')).toContainText('Sıra sizde (Siyah)');
    // Siyah piyon e7: e6 ve e5 hedefleri; çevrilmiş tahtada da doğru karelerde
    await sq(page, 'e7').click();
    await expect(sq(page, 'e6')).toHaveClass(/is-dest/);
    await expect(sq(page, 'e5')).toHaveClass(/is-dest/);
    // Siyah tarafında geri al, ilk bilgisayar hamlesini silmez (geri alınacak oyuncu hamlesi yok)
    await expect(page.locator('#sa-undo')).toBeDisabled();
  });

  test('iki kişilik mod: sıra değişir, yanlış tarafın taşı oynanmaz, otomatik çevirme çalışır', async ({ page }) => {
    await open(page, { two: true });
    await expect(page.locator('#sa-level-field')).toBeHidden();
    await expect(page.locator('#sa-autoflip-field')).toBeVisible();
    await expect(page.locator('#sa-status')).toContainText('Sıra: Beyaz');
    await sq(page, 'e2').click(); await sq(page, 'e4').click();
    await expect(page.locator('#sa-status')).toContainText('Sıra: Siyah');
    // Beyazın taşı siyahın sırasında seçilmez
    await sq(page, 'd2').click();
    await expect(page.locator('#sa-board .is-selected')).toHaveCount(0);
    await sq(page, 'e7').click(); await sq(page, 'e5').click();
    await expect(page.locator('#sa-status')).toContainText('Sıra: Beyaz');
    await sq(page, 'g1').click(); await sq(page, 'f3').click();
    expect(await history(page)).toEqual(['e4', 'e5', 'Nf3']);
    await expect(page.locator('#sa-history li')).toHaveCount(2);
    await expect(page.locator('#sa-history li').first()).toContainText('1.');
    // Otomatik çevirme: siyahın sırasında tahta siyah altta
    await page.locator('#sa-autoflip').check();
    await expect(board(page)).toHaveAttribute('data-flip', '1');
    await sq(page, 'b8').click(); await sq(page, 'c6').click();
    await expect(board(page)).toHaveAttribute('data-flip', '0');
    expect(page.workers().length).toBe(0); // iki kişilik modda hesaplama istenmez
  });

  test('sürükle-bırak: taş sürüklenirken hedefler görünür, bırakınca hamle oynanır; geçersiz bırakma taşı yerinde tutar', async ({ page }) => {
    await open(page, { two: true });
    const center = async (name: string) => {
      const b = (await sq(page, name).boundingBox())!;
      return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
    };
    await sq(page, 'e2').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    let a = await center('e2');
    let b = await center('e4');
    await page.mouse.move(a.x, a.y);
    await page.mouse.down();
    await page.mouse.move(a.x + 4, a.y - 12, { steps: 3 });
    await page.mouse.move(b.x, b.y, { steps: 6 });
    await expect(page.locator('.sa-ghost')).toHaveCount(1);
    await expect(page.locator('#sa-board .is-dest')).toHaveCount(2);
    await page.mouse.up();
    await expect(page.locator('.sa-ghost')).toHaveCount(0);
    await expect(sq(page, 'e4')).toHaveAttribute('data-piece', 'wP');
    expect(await history(page)).toEqual(['e4']);
    // Geçersiz bırakma: siyah piyon e7'yi e3'e sürükle
    a = await center('e7');
    b = await center('e3');
    await page.mouse.move(a.x, a.y);
    await page.mouse.down();
    await page.mouse.move(b.x, b.y, { steps: 8 });
    await page.mouse.up();
    await expect(sq(page, 'e7')).toHaveAttribute('data-piece', 'bP');
    await expect(sq(page, 'e3')).toHaveAttribute('data-piece', '');
    expect(await history(page)).toEqual(['e4']);
    await expect(page.locator('#sa-msg')).toContainText('geçerli değil');
    // Sürükleme sonrası tıkla-tıkla hâlâ çalışır
    await sq(page, 'd7').click();
    await sq(page, 'd5').click();
    expect(await history(page)).toEqual(['e4', 'd5']);
    // Aynı kareye geri bırakma: sürüklemenin kendi ürettiği click seçimi kaldırmaz; hemen ardından
    // gelen gerçek tıklama ise (zaman penceresine takılmadan) hamleyi oynar.
    a = await center('g1');
    b = await center('f3');
    await page.mouse.move(a.x, a.y);
    await page.mouse.down();
    await page.mouse.move(b.x, b.y, { steps: 6 });
    await page.mouse.move(a.x, a.y, { steps: 6 });
    await page.mouse.up();
    await expect(page.locator('.sa-ghost')).toHaveCount(0);
    await expect(sq(page, 'g1')).toHaveClass(/is-selected/);
    await expect(sq(page, 'f3')).toHaveClass(/is-dest/);
    await sq(page, 'f3').click();
    await expect(sq(page, 'f3')).toHaveAttribute('data-piece', 'wN');
    expect(await history(page)).toEqual(['e4', 'd5', 'Nf3']);
  });

  test('klavye: ok tuşlarıyla gezilir, Enter ile taş seçilir ve hamle oynanır; Esc seçimi bırakır', async ({ page }) => {
    await open(page, { two: true });
    await sq(page, 'e2').focus();
    await page.keyboard.press('ArrowUp');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.sq)).toBe('e3');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.sq)).toBe('e2');
    await page.keyboard.press('Enter');
    await expect(sq(page, 'e2')).toHaveClass(/is-selected/);
    await page.keyboard.press('Escape');
    await expect(page.locator('#sa-board .is-selected')).toHaveCount(0);
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await expect(sq(page, 'e4')).toHaveAttribute('data-piece', 'wP');
    await expect(sq(page, 'e4')).toHaveAttribute('aria-label', /e4, beyaz piyon/);
    expect(await history(page)).toEqual(['e4']);
    // Roving tabindex: yalnızca bir kare sekme sırasında
    expect(await page.locator('#sa-board .sq[tabindex="0"]').count()).toBe(1);
  });

  test('FEN ve PGN: kopyalama kutuya yazar; PGN ve FEN yüklenir; bozuk metin Türkçe uyarı verir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await open(page, { two: true });
    await sq(page, 'e2').click(); await sq(page, 'e4').click();
    await sq(page, 'e7').click(); await sq(page, 'e5').click();
    await page.locator('#sa-copy-fen').click();
    const f = await fen(page);
    await expect(page.locator('#sa-io-text')).toHaveValue(f);
    await expect(page.locator('#sa-io-msg')).toContainText(/kopyalandı|Ctrl\+C/);
    await page.locator('#sa-copy-pgn').click();
    const pgn = await page.locator('#sa-io-text').inputValue();
    expect(pgn).toContain('1. e4 e5');
    expect(pgn).toContain('[White "Beyaz"]');
    // PGN yükle
    await page.locator('#sa-new').click();
    await page.locator('#sa-io summary').click();
    await page.locator('#sa-io-text').fill('1. d4 d5 2. c4 e6 3. Nc3 Nf6');
    await page.locator('#sa-load').click();
    await expect(page.locator('#sa-io-msg')).toContainText('yüklendi');
    expect(await history(page)).toEqual(['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6']);
    await expect(page.locator('#sa-history li')).toHaveCount(3);
    await expect(page.locator('#sa-status')).toContainText('Sıra: Beyaz');
    // Yüklenen oyunda geri al çalışır
    await page.locator('#sa-undo').click();
    expect((await history(page)).length).toBe(5);
    // FEN yükle
    await page.locator('#sa-io-text').fill('4k3/8/8/8/8/8/4P3/4K3 b - - 0 1');
    await page.locator('#sa-load').click();
    expect(await fen(page)).toBe('4k3/8/8/8/8/8/4P3/4K3 b - - 0 1');
    await expect(page.locator('#sa-history li.is-empty')).toBeVisible();
    // Bozuk metin ve boş metin
    await page.locator('#sa-io-text').fill('bu bir konum değil');
    await page.locator('#sa-load').click();
    await expect(page.locator('#sa-io-msg')).toContainText('geçerli bir FEN ya da PGN değil');
    expect(await fen(page)).toBe('4k3/8/8/8/8/8/4P3/4K3 b - - 0 1');
    await page.locator('#sa-io-text').fill('   ');
    await page.locator('#sa-load').click();
    await expect(page.locator('#sa-io-msg')).toContainText('yapıştırın');
  });

  test('beraberlik: pat, yetersiz malzeme, üçlü tekrar ve elli hamle kuralı tanınır', async ({ page }) => {
    await open(page, { two: true });
    // Pat
    await loadFen(page, '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1');
    await expect(board(page)).toHaveAttribute('data-result', 'pat');
    await expect(page.locator('#sa-status')).toContainText('Pat');
    // Yetersiz malzeme
    await loadFen(page, '4k3/8/8/8/8/8/8/4K3 w - - 0 1');
    await expect(board(page)).toHaveAttribute('data-result', 'yetersiz');
    await expect(page.locator('#sa-status')).toContainText('yetersiz malzeme');
    // Üçlü tekrar: atlar gidip gelir
    await page.locator('#sa-new').click();
    const seq: [string, string][] = [['g1', 'f3'], ['g8', 'f6'], ['f3', 'g1'], ['f6', 'g8'], ['g1', 'f3'], ['g8', 'f6'], ['f3', 'g1'], ['f6', 'g8']];
    for (const [from, to] of seq) {
      expect(await page.evaluate(([x, y]) => (window as any).__satrancTest().move(x, y), [from, to])).toBe(true);
    }
    await expect(board(page)).toHaveAttribute('data-result', 'tekrar');
    await expect(page.locator('#sa-status')).toContainText('üçüncü kez');
    // Elli hamle: sayaç 99, sessiz hamle yapılınca beraberlik
    await loadFen(page, '8/8/8/4k3/8/8/4K3/R7 w - - 99 80');
    await sq(page, 'a1').click();
    await sq(page, 'a2').click();
    await expect(board(page)).toHaveAttribute('data-result', 'elli');
    await expect(page.locator('#sa-status')).toContainText('elli hamle');
  });

  test('skor tablosu: kazanma ve kaybetme localStorage içinde seviyeye göre tutulur; sıfırlanır', async ({ page }) => {
    await open(page);
    await loadFen(page, MATE_IN_1);
    await sq(page, 'h5').click();
    await sq(page, 'f7').click();
    await expect(page.locator('#sa-status')).toContainText('Tebrikler');
    const saved = await page.evaluate((k) => localStorage.getItem(k), STORE);
    expect(JSON.parse(saved!).orta).toMatchObject({ w: 1, l: 0, d: 0 });
    await expect(page.locator('#sa-stats-wrap tr[data-level="orta"] .w')).toHaveText('1');
    // Kaybetme: bilgisayar (siyah) tek hamlede mat eder (arka sıra matı)
    await loadFen(page, 'r5k1/8/8/8/8/8/5PPP/6K1 b - - 0 1');
    await expect(board(page)).toHaveAttribute('data-over', '1', { timeout: 15000 });
    await expect(page.locator('#sa-status')).toContainText('Bilgisayar kazandı');
    expect(await history(page)).toEqual(['Ra1#']);
    const saved2 = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), STORE))!);
    expect(saved2.orta).toMatchObject({ w: 1, l: 1, d: 0 });
    // Beraberlik de yazılır
    await page.locator('#sa-level').selectOption('zor');
    await loadFen(page, '8/8/8/4k3/8/8/4K3/R7 w - - 99 80');
    await sq(page, 'a1').click();
    await sq(page, 'a2').click();
    const saved3 = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), STORE))!);
    expect(saved3.zor).toMatchObject({ w: 0, l: 0, d: 1 });
    // Sayfa yenilenince skor kalır; iki kişilik oyunda ve yüklenen biten konumda skor değişmez
    await page.reload();
    await expect(page.locator('#sa-stats-wrap tr[data-level="orta"] .l')).toHaveText('1');
    await page.locator('#sa-mode').selectOption('two');
    await loadFen(page, MATE_IN_1);
    await sq(page, 'h5').click(); await sq(page, 'f7').click();
    await page.locator('#sa-mode').selectOption('cpu');
    await loadFen(page, '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1'); // zaten biten pat konumu
    const saved4 = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), STORE))!);
    expect(saved4).toEqual(saved3);
    // Sıfırla
    await page.locator('#sa-stats-reset').click();
    await expect(page.locator('#sa-stats-wrap tr[data-level="orta"] .w')).toHaveText('0');
    const cleared = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), STORE))!);
    expect(cleared.orta).toEqual({ w: 0, l: 0, d: 0 });
  });

  for (const garbage of ['{', '[]', 'null', '"abc"', '{"kolay":{"w":"abc","l":-5},"orta":7,"zor":null}', '{"orta":{"w":2.9,"l":1,"d":0}}']) {
    test(`bozuk skor verisi çökertmez: ${garbage}`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [STORE, garbage]);
      await open(page);
      await expect(page.locator('#sa-board .sq')).toHaveCount(64);
      const cells = await page.locator('#sa-stats-wrap tbody td:not(:first-child)').allTextContents();
      expect(cells.every((c) => /^\d+$/.test(c))).toBe(true);
      if (garbage.startsWith('{"orta":{"w":2.9')) expect(cells.slice(3, 6)).toEqual(['2', '1', '0']);
      else expect(cells.every((c) => c === '0')).toBe(true);
      // Bozuk veri olsa bile oyun sonrası skor yazılabilir
      await loadFen(page, MATE_IN_1);
      await sq(page, 'h5').click(); await sq(page, 'f7').click();
      await expect(page.locator('#sa-status')).toContainText('Tebrikler');
      const saved = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), STORE))!);
      expect(saved.orta.w).toBeGreaterThanOrEqual(1);
      expect(errors).toEqual([]);
    });
  }

  test('motor: chess.js iç yöntemleri doğru (perft), seviyeler yasal hamle seçer, mat görülür, süre sınırı korunur', async ({ page }) => {
    await open(page);
    const r = await page.evaluate(async () => {
      const ai = await import('/oyunlar/satranc/ai.js');
      const { Chess } = await import('/vendor/chess.js@1.4.0/chess.js');
      const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      const kiwi = 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1';
      const out: Record<string, unknown> = {
        perft3: ai.perft(start, 3),
        perftKiwi2: ai.perft(kiwi, 2),
      };
      const fens = [start, kiwi, 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P1B2/2PBPN2/PP1N1PPP/R2QK2R w KQ - 0 8', '8/5pk1/6p1/8/3K4/8/5PPP/8 w - - 0 1'];
      let allLegal = true;
      let maxMs = 0;
      for (const f of fens) {
        for (const lv of ['kolay', 'orta', 'zor']) {
          const t0 = performance.now();
          const m = ai.chooseMove(f, lv);
          maxMs = Math.max(maxMs, performance.now() - t0);
          const c = new Chess(f);
          const ok = c.moves({ verbose: true }).some((x: any) => x.from === m.from && x.to === m.to && (x.promotion || null) === m.promotion);
          if (!ok) allLegal = false;
        }
      }
      const mate = ai.chooseMove('6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1', 'orta');
      const mateEasy = ai.chooseMove('6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1', 'kolay', { randomMove: 0 });
      const none = ai.chooseMove('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1', 'zor'); // pat: hamle yok
      const promo = ai.chooseMove('8/P7/8/8/8/8/k6K/8 w - - 0 1', 'zor');
      out.allLegal = allLegal;
      out.maxMs = maxMs;
      out.mate = `${mate.from}${mate.to}`;
      out.mateEasy = `${mateEasy.from}${mateEasy.to}`;
      out.none = none;
      out.promo = promo.promotion;
      return out;
    });
    expect(r.perft3).toBe(8902);
    expect(r.perftKiwi2).toBe(2039);
    expect(r.allLegal).toBe(true);
    expect(r.maxMs as number).toBeLessThan(3500);
    expect(r.mate).toBe('a1a8');
    expect(r.mateEasy).toBe('a1a8');
    expect(r.none).toBeNull();
    expect(r.promo).toBe('q');
  });

  test('360px genişlikte yatay taşma yok, tahta ekrana sığar, terfi penceresi taşmaz, dokunmatik hamle çalışır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page, { two: true });
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const box = (await board(page).boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(250);
    expect(box.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box.width - box.height)).toBeLessThanOrEqual(2);
    // Dokunmatik benzeri: tap yerine click (bağlam desteklemiyorsa)
    await sq(page, 'e2').tap().catch(() => sq(page, 'e2').click());
    await expect(sq(page, 'e2')).toHaveClass(/is-selected/);
    // Terfi penceresi 360px'e sığar
    await loadFen(page, '8/P7/8/8/8/8/k6K/8 w - - 0 1');
    await sq(page, 'a7').click();
    await sq(page, 'a8').click();
    const promo = (await page.locator('.sa-promo-box').boundingBox())!;
    expect(promo.x).toBeGreaterThanOrEqual(0);
    expect(promo.x + promo.width).toBeLessThanOrEqual(360);
    await page.locator('#sa-promo-r').click();
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Hamle listesi uzayınca da taşma olmaz
    await loadFen(page, START_FEN);
    for (const [a, b] of [['e2', 'e4'], ['e7', 'e5'], ['g1', 'f3'], ['b8', 'c6'], ['f1', 'b5'], ['a7', 'a6']]) {
      await sq(page, a).click();
      await sq(page, b).click();
    }
    expect(await history(page)).toEqual(['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6']);
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
});
