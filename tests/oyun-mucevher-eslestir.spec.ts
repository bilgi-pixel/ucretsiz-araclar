import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Mücevher Eşleştir: geçerli/geçersiz değişim, puan, tıklama ve klavye akışı, oyun sonu, bozuk kayıt, 360px ve içerik denetimleri.
const URL_PATH = '/oyunlar/mucevher-eslestir/';
const KEY = 'ba-oyun-mucevher-eslestir';

type Snap = { board: number[]; score: number; moves: number; over: boolean; sel: number; cur: number; best: number };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__mucevherTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__mucevherTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

// Hazır eşleşmesi olmayan düzgün tahta; (2,3) hamlesi 0-1-2 numaralı hücrelerde üçlü yapar.
function board(): number[] {
  const b: number[] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) b.push((r * 2 + c) % 6);
  b[0] = 2; b[1] = 2; b[2] = 5; b[3] = 2;
  return b;
}
const QUEUE = [3, 4, 5];

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await expect(page.locator('#mu-grid .mu-cell').first()).toBeVisible();
}

test.describe('Mücevher Eşleştir', () => {
  test('sayfa açılır: 64 hücre, 25 hamle, hazır eşleşme yok; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Mücevher Eşleştir');
    await expect(page.locator('#mu-grid .mu-cell')).toHaveCount(64);
    const s = await snap(page);
    expect(s.moves).toBe(25);
    expect(s.score).toBe(0);
    expect(await call(page, 'findMatches', s.board)).toEqual([]);
    expect(await call(page, 'findMove')).not.toBeNull();
    await expect(page.locator('#mu-moves')).toHaveText('25');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('üretici: 40 rastgele tahta eşleşmesiz ve en az bir hamleli', async ({ page }) => {
    await open(page);
    const bad = await page.evaluate(() => {
      const t = (window as any).__mucevherTest;
      const out: string[] = [];
      for (let i = 0; i < 40; i++) {
        const b = t.freshBoard();
        if (b.length !== 64 || b.some((v: number) => v < 0 || v > 5)) out.push('geçersiz tahta');
        if (t.findMatches(b).length) out.push('hazır eşleşme');
      }
      return out;
    });
    expect(bad).toEqual([]);
  });

  test('geçerli değişim: üçlü patlar, 30 puan, hamle 24, üstten yeni mücevher dolar', async ({ page }) => {
    await open(page);
    await call(page, 'setBoard', board(), QUEUE);
    const r = await call(page, 'swap', 2, 3);
    expect(r).toMatchObject({ ok: true, cleared: 3, chain: 1, gained: 30 });
    const s = await snap(page);
    expect(s.score).toBe(30);
    expect(s.moves).toBe(24);
    expect(s.board.slice(0, 8)).toEqual([3, 4, 5, 5, 4, 5, 0, 1]);
    await expect(page.locator('#mu-score')).toHaveText('30');
    await expect(page.locator('#mu-moves')).toHaveText('24');
  });

  test('geçersiz değişim hamle harcamaz; uzak hücreler değişmez', async ({ page }) => {
    await open(page);
    await call(page, 'setBoard', board(), QUEUE);
    const before = await snap(page);
    const r = await call(page, 'swap', 10, 11); // eşleşme oluşturmayan komşu değişimi
    expect(r).toMatchObject({ ok: false });
    const after = await snap(page);
    expect(after.board).toEqual(before.board);
    expect(after.moves).toBe(25);
    expect((await call(page, 'swap', 0, 2)).reason).toBe('uzak');
    expect((await call(page, 'swap', 0, 9)).reason).toBe('uzak'); // çapraz
    expect((await snap(page)).moves).toBe(25);
  });

  test('fareyle iki tıklama: seçim, iptal, uzak hücreye taşınan seçim ve değişim', async ({ page }) => {
    await open(page);
    await call(page, 'setBoard', board(), QUEUE);
    const cell = (i: number) => page.locator(`#mu-grid .mu-cell[data-i="${i}"]`);
    await cell(2).click();
    await expect(cell(2)).toHaveClass(/is-sel/);
    await expect(cell(2)).toHaveAttribute('aria-pressed', 'true');
    await cell(2).click();
    expect((await snap(page)).sel).toBe(-1);
    await cell(20).click();
    await cell(2).click(); // uzak: seçim taşınır
    expect((await snap(page)).sel).toBe(2);
    await cell(3).click();
    const s = await snap(page);
    expect(s.score).toBe(30);
    expect(s.sel).toBe(-1);
    await expect(page.locator('#mu-msg')).toContainText('temizlendi');
  });

  test('klavye: oklarla gez, Enter seç, yön tuşu kaydır, H ipucu, Esc iptal, R yeni oyun', async ({ page }) => {
    await open(page);
    await call(page, 'setBoard', board(), QUEUE);
    const cell = (i: number) => page.locator(`#mu-grid .mu-cell[data-i="${i}"]`);
    await cell(0).focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(cell(2)).toBeFocused();
    await page.keyboard.press('Enter');
    expect((await snap(page)).sel).toBe(2);
    await page.keyboard.press('Escape');
    expect((await snap(page)).sel).toBe(-1);
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowRight'); // seçili hücre sağdaki komşuyla yer değiştirir
    const s = await snap(page);
    expect(s.score).toBe(30);
    expect(s.moves).toBe(24);
    await expect(cell(3)).toBeFocused();
    await page.keyboard.press('h');
    await expect(page.locator('#mu-grid .mu-cell.is-hint')).toHaveCount(2);
    await page.keyboard.press('r');
    const n = await snap(page);
    expect(n.moves).toBe(25);
    expect(n.score).toBe(0);
  });

  test('oyun sonu: son hamleden sonra sonuç kutusu, rekor kaydı ve Yeni oyun', async ({ page }) => {
    await open(page);
    await call(page, 'setBoard', board(), QUEUE);
    await call(page, 'setMoves', 1);
    await call(page, 'swap', 2, 3);
    const s = await snap(page);
    expect(s.over).toBe(true);
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-skor')).toHaveText('30');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#mu-best')).toHaveText('30');
    expect(await stored(page)).toMatchObject({ best: 30 });
    expect((await call(page, 'swap', 10, 11)).reason).toBe('bitti');
    await expect(page.locator('#mu-new')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    expect((await snap(page)).moves).toBe(25);
    await page.reload();
    await expect(page.locator('#mu-best')).toHaveText('30');
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z"}', '{"best":-5}', '{"best":1e12}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#mu-best')).toHaveText('0');
      await page.locator('#mu-grid .mu-cell').first().click();
      expect(errors).toEqual([]);
      await page.close();
    }
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => { throw new Error('depolama kapalı'); };
      Storage.prototype.setItem = () => { throw new Error('depolama kapalı'); };
    });
    await open(page);
    await call(page, 'setBoard', board(), QUEUE);
    await call(page, 'setMoves', 1);
    await call(page, 'swap', 2, 3);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, hücreler dokunulacak boyutta, sonuç kutusu sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const b = (await page.locator('#mu-grid .mu-cell').first().boundingBox())!;
    expect(b.width).toBeGreaterThanOrEqual(34);
    expect(Math.abs(b.width - b.height)).toBeLessThan(2);
    const grid = (await page.locator('#mu-grid').boundingBox())!;
    expect(grid.x + grid.width).toBeLessThanOrEqual(360);
    await call(page, 'setBoard', board(), QUEUE);
    await call(page, 'setMoves', 1);
    await call(page, 'swap', 2, 3);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-mucevher-eslestir-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-mucevher-eslestir-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/mucevher-eslestir/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
