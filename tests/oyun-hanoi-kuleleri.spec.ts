import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Hanoi Kuleleri: taşıma kuralları, tıklama ve klavye akışı, kazanma, geri alma, disk sayısı, bozuk kayıt, 360px ve içerik denetimleri.
const URL_PATH = '/oyunlar/hanoi-kuleleri/';
const KEY = 'ba-oyun-hanoi-kuleleri';

type Snap = { n: number; pegs: number[][]; moves: number; won: boolean; sel: number; best: number; bestMoves: Record<string, number>; canUndo: boolean };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__hanoiTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__hanoiTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);
const peg = (page: Page, i: number) => page.locator(`#hn-pegs .hn-peg[data-i="${i}"]`);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await expect(page.locator('#hn-pegs .hn-peg').first()).toBeVisible();
}

// 3 diskin 7 hamlelik çözümü
const SOLUTION: [number, number][] = [[0, 2], [0, 1], [2, 1], [0, 2], [1, 0], [1, 2], [0, 2]];

test.describe('Hanoi Kuleleri', () => {
  test('sayfa açılır; 3 çubuk, 3 disk ve en az 7 hamle; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Hanoi Kuleleri');
    await expect(page.locator('#hn-pegs .hn-peg')).toHaveCount(3);
    await expect(page.locator('#hn-pegs .hn-disc')).toHaveCount(3);
    await expect(page.locator('#hn-min')).toHaveText('7');
    const s = await snap(page);
    expect(s.pegs).toEqual([[3, 2, 1], [], []]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('taşıma kuralları: büyük disk küçüğün üstüne konmaz, boş çubuktan alınmaz, kendine taşınmaz', async ({ page }) => {
    await open(page);
    await call(page, 'setPegs', 3, [[3], [2], [1]]);
    expect((await call(page, 'move', 0, 1)).ok).toBe(false); // 3 -> 2 olmaz
    expect((await call(page, 'move', 0, 2)).ok).toBe(false); // 3 -> 1 olmaz
    expect((await call(page, 'move', 2, 1)).ok).toBe(true); // 1 -> 2 olur
    expect((await snap(page)).pegs).toEqual([[3], [2, 1], []]);
    expect((await call(page, 'move', 2, 0)).ok).toBe(false); // boş çubuk
    expect((await call(page, 'move', 1, 1)).ok).toBe(false); // kendine
    expect((await call(page, 'move', 1, 0)).ok).toBe(true); // 1 -> 3'ün üstüne
    const s = await snap(page);
    expect(s.pegs).toEqual([[3, 1], [2], []]);
    expect(s.moves).toBe(2);
  });

  test('fareyle iki tıklama: seçim, taşıma, aynı çubuğa tıklayınca iptal, kural dışı hamle mesajı', async ({ page }) => {
    await open(page);
    await peg(page, 1).click();
    await expect(page.locator('#hn-msg')).toContainText('boş');
    await peg(page, 0).click();
    await expect(peg(page, 0)).toHaveClass(/is-sel/);
    await expect(peg(page, 0)).toHaveAttribute('aria-pressed', 'true');
    await peg(page, 0).click();
    expect((await snap(page)).sel).toBe(-1);
    await peg(page, 0).click();
    await peg(page, 1).click(); // 1 numaralı disk boş çubuğa
    let s = await snap(page);
    expect(s.pegs).toEqual([[3, 2], [1], []]);
    expect(s.moves).toBe(1);
    await expect(page.locator('#hn-moves')).toHaveText('1');
    await peg(page, 0).click();
    await peg(page, 1).click(); // 2 numaralı disk, 1'in üstüne olmaz
    await expect(page.locator('#hn-msg')).toContainText('Büyük disk');
    s = await snap(page);
    expect(s.moves).toBe(1);
  });

  test('klavye: sayı tuşlarıyla taşı, oklarla odak, Esc iptal, U geri al, R baştan başla', async ({ page }) => {
    await open(page);
    await peg(page, 0).focus();
    await page.keyboard.press('ArrowRight');
    await expect(peg(page, 1)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight'); // sona gelince başa sarar
    await expect(peg(page, 0)).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(peg(page, 2)).toBeFocused();
    await page.keyboard.press('1');
    expect((await snap(page)).sel).toBe(0);
    await page.keyboard.press('Escape');
    expect((await snap(page)).sel).toBe(-1);
    await page.keyboard.press('1');
    await page.keyboard.press('3');
    let s = await snap(page);
    expect(s.pegs).toEqual([[3, 2], [], [1]]);
    await page.keyboard.press('u');
    s = await snap(page);
    expect(s.pegs).toEqual([[3, 2, 1], [], []]);
    expect(s.moves).toBe(0);
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('r');
    s = await snap(page);
    expect(s.moves).toBe(0);
    expect(s.pegs).toEqual([[3, 2, 1], [], []]);
  });

  test('3 disk 7 hamlede çözülür: sonuç kutusu, rekor ve kayıt, sonraki seviye 4 disk', async ({ page }) => {
    await open(page);
    for (const [a, b] of SOLUTION.slice(0, 6)) await call(page, 'move', a, b);
    expect((await snap(page)).won).toBe(false);
    await call(page, 'move', 0, 2);
    const s = await snap(page);
    expect(s.won).toBe(true);
    expect(s.pegs).toEqual([[], [], [3, 2, 1]]);
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-hamle')).toHaveText('7');
    await expect(page.locator('#sonuc-mukemmel')).toBeVisible();
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#hn-best')).toHaveText('7');
    await expect(page.locator('#hn-next')).toBeFocused();
    expect(await stored(page)).toMatchObject({ best: 3, discs: 4, moves: { '3': 7 } });
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    const n = await snap(page);
    expect(n.n).toBe(4);
    expect(n.pegs[0]).toEqual([4, 3, 2, 1]);
    await expect(page.locator('#hn-min')).toHaveText('15');
    await page.reload();
    await expect(page.locator('#hn-discs')).toHaveText('4');
  });

  test('geri al düğmesi ve disk sayısı düğmeleri çalışır; sınırlar aşılmaz', async ({ page }) => {
    await open(page);
    await expect(page.locator('#hn-undo')).toBeDisabled();
    await expect(page.locator('#hn-less')).toBeDisabled();
    await call(page, 'move', 0, 1);
    await expect(page.locator('#hn-undo')).toBeEnabled();
    await page.locator('#hn-undo').click();
    const s = await snap(page);
    expect(s.pegs).toEqual([[3, 2, 1], [], []]);
    expect(s.moves).toBe(0);
    for (let i = 0; i < 7; i++) if (await page.locator('#hn-more').isEnabled()) await page.locator('#hn-more').click();
    await expect(page.locator('#hn-discs')).toHaveText('8');
    await expect(page.locator('#hn-more')).toBeDisabled();
    await expect(page.locator('#hn-min')).toHaveText('255');
    await expect(page.locator('#hn-pegs .hn-disc')).toHaveCount(8);
    await page.locator('#hn-less').click();
    await expect(page.locator('#hn-discs')).toHaveText('7');
    await page.locator('#hn-restart').click();
    expect((await snap(page)).moves).toBe(0);
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z","discs":-5,"moves":{"3":"x"}}', '{"best":1e9,"discs":1.5,"moves":[1]}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#hn-discs')).toHaveText('3');
      await expect(page.locator('#hn-best')).toHaveText('–');
      await peg(page, 0).click();
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
    for (const [a, b] of SOLUTION) await call(page, 'move', a, b);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: 8 diskte yatay taşma yok, çubuklar dokunmaya yeterli, sonuç kutusu sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await call(page, 'newGame', 8);
    await expect(page.locator('#hn-pegs .hn-disc')).toHaveCount(8);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const b = (await peg(page, 0).boundingBox())!;
    expect(b.width).toBeGreaterThanOrEqual(80);
    expect(b.height).toBeGreaterThanOrEqual(200);
    const d = (await page.locator('#hn-pegs .hn-disc[data-size="8"]').boundingBox())!;
    expect(d.x).toBeGreaterThanOrEqual(b.x - 1);
    expect(d.x + d.width).toBeLessThanOrEqual(b.x + b.width + 1);
    await call(page, 'newGame', 3);
    for (const [x, y] of SOLUTION) await call(page, 'move', x, y);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-hanoi-kuleleri-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-hanoi-kuleleri-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/hanoi-kuleleri/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
