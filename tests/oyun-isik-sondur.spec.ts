import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Işık Söndür: basış kuralı (kendisi + 4 komşu), kenar/köşe, tıklama ve klavye, seviye sonu ve yıldız, geri alma, üretici, bozuk kayıt, 360px, içerik.
const URL_PATH = '/oyunlar/isik-sondur/';
const KEY = 'ba-oyun-isik-sondur';
const EMPTY = Array(5).fill('.....');

type Snap = { level: number; grid: string[]; moves: number; par: number; won: boolean; best: number; lit: number; canUndo: boolean };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__isikSondurTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__isikSondurTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);
const cell = (page: Page, r: number, c: number) => page.locator(`#is-board .is-cell[data-r="${r}"][data-c="${c}"]`);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await expect(page.locator('#is-board .is-cell')).toHaveCount(25);
}

test.describe('Işık Söndür', () => {
  test('sayfa açılır; ilk seviyede ışıklar yanıyor, hedef 3 hamle; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Işık Söndür');
    const s = await snap(page);
    expect(s.level).toBe(1);
    expect(s.par).toBe(3);
    expect(s.lit).toBeGreaterThan(0);
    await expect(page.locator('#is-board .is-cell.is-on')).toHaveCount(s.lit);
    await expect(page.locator('#is-lit')).toHaveText(String(s.lit));
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('basış kuralı: ortada artı, köşede 3 kare, kenarda 4 kare; çift basış iptal eder', async ({ page }) => {
    await open(page);
    await call(page, 'setGrid', EMPTY);
    await call(page, 'press', 2, 2);
    expect((await snap(page)).grid).toEqual(['.....', '..#..', '.###.', '..#..', '.....']);
    await call(page, 'press', 2, 2);
    expect((await snap(page)).grid).toEqual(EMPTY);
    await call(page, 'setGrid', EMPTY);
    await call(page, 'press', 0, 0);
    expect((await snap(page)).grid).toEqual(['##...', '#....', '.....', '.....', '.....']);
    await call(page, 'setGrid', EMPTY);
    await call(page, 'press', 0, 2);
    expect((await snap(page)).grid).toEqual(['.###.', '..#..', '.....', '.....', '.....']);
    await call(page, 'setGrid', EMPTY);
    await call(page, 'press', 4, 4);
    expect((await snap(page)).grid).toEqual(['.....', '.....', '.....', '....#', '...##']);
  });

  test('fareyle tıklama: kare ve komşuları değişir, hamle ve yanan sayısı güncellenir, geri al düğmesi çalışır', async ({ page }) => {
    await open(page);
    await call(page, 'setGrid', ['.....', '..#..', '.###.', '..#..', '.....']);
    await expect(page.locator('#is-undo')).toBeDisabled();
    await cell(page, 0, 0).click();
    let s = await snap(page);
    expect(s.grid).toEqual(['##...', '#.#..', '.###.', '..#..', '.....']);
    expect(s.moves).toBe(1);
    await expect(page.locator('#is-moves')).toHaveText('1');
    await expect(page.locator('#is-lit')).toHaveText(String(s.lit));
    await expect(cell(page, 0, 0)).toHaveClass(/is-on/);
    await expect(cell(page, 0, 0)).toHaveAttribute('aria-label', /ışık yanıyor/);
    await page.locator('#is-undo').click();
    s = await snap(page);
    expect(s.grid).toEqual(['.....', '..#..', '.###.', '..#..', '.....']);
    expect(s.moves).toBe(0);
    await expect(cell(page, 0, 0)).toHaveAttribute('aria-label', /sönük/);
  });

  test('klavye: oklarla gezin, Enter ve boşlukla bas, U geri al, R baştan başla', async ({ page }) => {
    await open(page);
    await call(page, 'setGrid', ['.....', '..#..', '.###.', '..#..', '.....']);
    await cell(page, 0, 0).focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await expect(cell(page, 1, 1)).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft'); // sol kenarda durur
    await expect(cell(page, 1, 0)).toBeFocused();
    await page.keyboard.press('Enter');
    let s = await snap(page);
    expect(s.moves).toBe(1);
    expect(s.grid[1]).toBe('###..');
    await page.keyboard.press('Space');
    expect((await snap(page)).moves).toBe(2);
    await page.keyboard.press('u');
    s = await snap(page);
    expect(s.moves).toBe(1);
    await page.keyboard.press('r');
    s = await snap(page);
    expect(s.moves).toBe(0);
    expect(s.level).toBe(1);
  });

  test('seviye sonu: 3 yıldız, rekor ve seviye kaydı, Enter ile sonraki seviye; fazla hamlede az yıldız', async ({ page }) => {
    await open(page);
    // Tek hamlelik tahta: hedef 3 hamle, 1 hamlede biter → 3 yıldız
    await call(page, 'setGrid', ['.....', '..#..', '.###.', '..#..', '.....']);
    await cell(page, 2, 2).click();
    const s = await snap(page);
    expect(s.won).toBe(true);
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-seviye')).toHaveText('1');
    await expect(page.locator('#sonuc-hamle')).toHaveText('1');
    await expect(page.locator('#sonuc-yildiz')).toContainText('★★★');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#is-board .is-cell').first()).toBeDisabled();
    await expect(page.locator('#is-next')).toBeFocused();
    expect(await stored(page)).toMatchObject({ best: 1, level: 2 });
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    let n = await snap(page);
    expect([n.level, n.par, n.moves]).toEqual([2, 4, 0]);
    // Çok hamle: bir kareye 6 kez basıp (çift sayı) yine de çözmek → 1 yıldız
    await call(page, 'setGrid', ['.....', '..#..', '.###.', '..#..', '.....']);
    for (let i = 0; i < 4; i++) await call(page, 'press', 0, 0);
    await cell(page, 2, 2).click();
    n = await snap(page);
    expect(n.won).toBe(true);
    expect(n.moves).toBe(5);
    await expect(page.locator('#sonuc-yildiz')).toContainText('★★☆'); // par 4: 5 hamle ≤ par + 3
    await page.reload();
    await expect(page.locator('#is-level')).toHaveText('3');
    await expect(page.locator('#is-best')).toHaveText('2');
  });

  test('üretici: 30 seviye çözülebilir ve kararlı; hedef hamleyle geri sarılınca tahta söner', async ({ page }) => {
    await open(page);
    const res = await page.evaluate(() => {
      const t = (window as any).__isikSondurTest;
      const out: string[] = [];
      for (let lv = 1; lv <= 30; lv++) {
        const a = t.newLevel(lv);
        const b = t.newLevel(lv);
        if (JSON.stringify(a.grid) !== JSON.stringify(b.grid)) out.push(`seviye ${lv} kararsız`);
        if (a.lit === 0) out.push(`seviye ${lv} baştan çözülmüş`);
        if (a.par !== Math.min(2 + lv, 14)) out.push(`seviye ${lv} hedef`);
        // tahta par kadar basışla üretildiğinden, basışlar bulunabilir: kaba kuvvetle en fazla par basışlı çözüm var mı (sadece küçük seviyelerde)
        if (lv <= 3) {
          let found = false;
          const n = 25;
          const rows = a.grid;
          const apply = (g: boolean[][], i: number) => {
            const r = Math.floor(i / 5); const c = i % 5;
            for (const [dr, dc] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
              const rr = r + dr; const cc = c + dc;
              if (rr >= 0 && rr < 5 && cc >= 0 && cc < 5) g[rr][cc] = !g[rr][cc];
            }
          };
          const start = rows.map((row: string) => [...row].map((ch) => ch === '#'));
          const rec = (from: number, left: number, g: boolean[][]) => {
            if (found) return;
            if (g.every((row) => row.every((x) => !x))) { found = true; return; }
            if (left === 0) return;
            for (let i = from; i < n && !found; i++) {
              const h = g.map((row) => row.slice());
              apply(h, i);
              rec(i + 1, left - 1, h);
            }
          };
          rec(0, a.par, start);
          if (!found) out.push(`seviye ${lv} çözümsüz görünüyor`);
        }
      }
      return out;
    });
    expect(res).toEqual([]);
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z","level":-5}', '{"best":1e9,"level":2.5}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#is-best')).toHaveText('0');
      await expect(page.locator('#is-level')).toHaveText('1');
      await cell(page, 2, 2).click();
      expect((await snap(page)).moves).toBe(1);
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
    await call(page, 'setGrid', ['.....', '..#..', '.###.', '..#..', '.....']);
    await cell(page, 2, 2).click();
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, kareler ≥ 44px, sonuç kutusu sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const b = (await cell(page, 0, 0).boundingBox())!;
    expect(b.width).toBeGreaterThanOrEqual(44);
    expect(Math.abs(b.width - b.height)).toBeLessThan(1);
    await call(page, 'setGrid', ['.....', '..#..', '.###.', '..#..', '.....']);
    await cell(page, 2, 2).tap().catch(async () => { await cell(page, 2, 2).click(); });
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-isik-sondur-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-isik-sondur-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/isik-sondur/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
