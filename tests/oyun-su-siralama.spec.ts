import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Su Sıralama: döküm kuralları, tıklama ve klavye akışı, seviye sonu, geri alma, üretici, bozuk kayıt, 360px ve içerik denetimleri.
const URL_PATH = '/oyunlar/su-siralama/';
const KEY = 'ba-oyun-su-siralama';

type Snap = { level: number; tubes: number[][]; moves: number; won: boolean; sel: number; best: number; canUndo: boolean };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__suSiralamaTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__suSiralamaTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await expect(page.locator('#su-tubes .su-tube').first()).toBeVisible();
}

test.describe('Su Sıralama', () => {
  test('sayfa açılır; ilk seviyede 3 renk + 2 boş tüp; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Su Sıralama');
    await expect(page.locator('#su-tubes .su-tube')).toHaveCount(5);
    const s = await snap(page);
    expect(s.level).toBe(1);
    expect(s.tubes.filter((t) => t.length === 0).length).toBe(2);
    expect(s.tubes.flat().length).toBe(12);
    await expect(page.locator('#su-level')).toHaveText('1');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('döküm kuralları: aynı renge ya da boşa dökülür, üstteki aynı renkler birlikte akar, dolu/farklı renk reddedilir', async ({ page }) => {
    await open(page);
    await call(page, 'setTubes', [[0, 0, 1], [1, 1], [0], [], [2, 2, 2, 2]]);
    // farklı üst renk: 0 → 2 (üst 1 vs üst 0)
    expect((await call(page, 'pour', 0, 2)).ok).toBe(false);
    // aynı renk: 0 → 1
    expect((await call(page, 'pour', 0, 1)).ok).toBe(true);
    let s = await snap(page);
    expect(s.tubes).toEqual([[0, 0], [1, 1, 1], [0], [], [2, 2, 2, 2]]);
    // iki birim birlikte boş tüpe akar
    expect((await call(page, 'pour', 0, 3)).n).toBe(2);
    s = await snap(page);
    expect(s.tubes[3]).toEqual([0, 0]);
    // dolu tüpe dökülmez; kendine dökülmez; boş tüpten dökülmez
    expect((await call(page, 'pour', 2, 4)).ok).toBe(false);
    expect((await call(page, 'pour', 2, 2)).ok).toBe(false);
    expect((await call(page, 'pour', 0, 2)).ok).toBe(false);
    // yer yetmezse sığdığı kadarı geçer
    await call(page, 'setTubes', [[1, 0, 0], [0, 0, 0]]);
    const r = await call(page, 'pour', 0, 1);
    expect(r).toMatchObject({ ok: true, n: 1 });
    expect((await snap(page)).tubes).toEqual([[1, 0, 0], [0, 0, 0]].map((t, i) => (i === 0 ? [1, 0] : [0, 0, 0, 0])));
  });

  test('fareyle iki tıklama: seçim, dökme, aynı tüpe tıklayınca iptal, geçersiz hamle mesajı', async ({ page }) => {
    await open(page);
    await call(page, 'setTubes', [[0, 1], [1], [0], []]);
    const tube = (i: number) => page.locator(`#su-tubes .su-tube[data-i="${i}"]`);
    await tube(3).click();
    await expect(page.locator('#su-msg')).toContainText('Boş tüpten');
    await tube(0).click();
    await expect(tube(0)).toHaveClass(/is-sel/);
    await expect(tube(0)).toHaveAttribute('aria-pressed', 'true');
    await tube(0).click();
    expect((await snap(page)).sel).toBe(-1);
    await tube(0).click();
    await tube(2).click(); // üst 1, hedef üst 0 → olmaz
    await expect(page.locator('#su-msg')).toContainText('farklı');
    expect((await snap(page)).moves).toBe(0);
    await tube(1).click();
    const s = await snap(page);
    expect(s.tubes).toEqual([[0], [1, 1], [0], []]);
    expect(s.moves).toBe(1);
    await expect(page.locator('#su-moves')).toHaveText('1');
  });

  test('klavye: sayı tuşlarıyla seç/dök, oklarla odak, Esc iptal, U geri al, R baştan başla', async ({ page }) => {
    await open(page);
    await call(page, 'setTubes', [[0, 1], [1], [0], []]);
    await page.locator('#su-tubes .su-tube').first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#su-tubes .su-tube[data-i="1"]')).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft'); // sondan başa sarar
    await expect(page.locator('#su-tubes .su-tube[data-i="3"]')).toBeFocused();
    await page.keyboard.press('1');
    expect((await snap(page)).sel).toBe(0);
    await page.keyboard.press('Escape');
    expect((await snap(page)).sel).toBe(-1);
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    let s = await snap(page);
    expect(s.tubes).toEqual([[0], [1, 1], [0], []]);
    await page.keyboard.press('u');
    s = await snap(page);
    expect(s.tubes).toEqual([[0, 1], [1], [0], []]);
    expect(s.moves).toBe(0);
    await page.keyboard.press('1');
    await page.keyboard.press('Enter'); // odaktaki tüpe Enter: seçimi iptal eder (aynı tüp)
    expect((await snap(page)).sel).toBe(-1);
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('r');
    s = await snap(page);
    expect(s.moves).toBe(0);
    expect(s.tubes.flat().length).toBe(12); // seviye 1 yeniden üretildi
  });

  test('seviye sonu: sonuç kutusu, rekor ve seviye kaydı, Sonraki seviye (Enter) ve 4 renkli seviye 2', async ({ page }) => {
    await open(page);
    await call(page, 'setTubes', [[0, 0, 0, 1], [1, 1, 1], [0], []]);
    await call(page, 'pour', 0, 1);
    expect((await snap(page)).won).toBe(false);
    await call(page, 'pour', 2, 0);
    const s = await snap(page);
    expect(s.won).toBe(true);
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-seviye')).toHaveText('1');
    await expect(page.locator('#sonuc-hamle')).toHaveText('2');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#su-best')).toHaveText('1');
    await expect(page.locator('#su-next')).toBeFocused();
    expect(await stored(page)).toMatchObject({ best: 1, level: 2 });
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    const n = await snap(page);
    expect(n.level).toBe(2);
    expect(n.moves).toBe(0);
    expect(n.tubes.filter((t) => t.length).length).toBe(3); // seviye 2: hâlâ 3 renk
    await page.reload();
    await expect(page.locator('#su-level')).toHaveText('2');
    await expect(page.locator('#su-best')).toHaveText('1');
  });

  test('geri al düğmesi hamleyi geri alır; üretici: 30 seviye geçerli ve her seviye aynı sonucu verir', async ({ page }) => {
    await open(page);
    await call(page, 'setTubes', [[0, 1], [1], [0], []]);
    await expect(page.locator('#su-undo')).toBeDisabled();
    await call(page, 'pour', 0, 1);
    await expect(page.locator('#su-undo')).toBeEnabled();
    await page.locator('#su-undo').click();
    const s = await snap(page);
    expect(s.tubes).toEqual([[0, 1], [1], [0], []]);
    expect(s.moves).toBe(0);
    const res = await page.evaluate(() => {
      const t = (window as any).__suSiralamaTest;
      const out: string[] = [];
      for (let lv = 1; lv <= 30; lv++) {
        const a = t.generate(lv);
        const b = t.generate(lv);
        if (JSON.stringify(a) !== JSON.stringify(b)) out.push(`seviye ${lv} kararsız`);
        const k = Math.min(3 + Math.floor((lv - 1) / 2), 9);
        if (a.length !== k + 2) out.push(`seviye ${lv} tüp sayısı`);
        const counts: Record<number, number> = {};
        for (const tube of a) for (const c of tube) counts[c] = (counts[c] || 0) + 1;
        if (Object.keys(counts).length !== k || Object.values(counts).some((v) => v !== 4)) out.push(`seviye ${lv} renk dağılımı`);
        if (a.some((tube: number[]) => tube.length === 4 && tube.every((x) => x === tube[0]))) out.push(`seviye ${lv} baştan çözülmüş tüp`);
      }
      return out;
    });
    expect(res).toEqual([]);
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z","level":-5}', '{"best":1e9,"level":1.5}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#su-best')).toHaveText('0');
      await expect(page.locator('#su-level')).toHaveText('1');
      await page.locator('#su-tubes .su-tube').first().click();
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
    await call(page, 'setTubes', [[0, 0, 0, 1], [1, 1, 1], [0], []]);
    await call(page, 'pour', 0, 1);
    await call(page, 'pour', 2, 0);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok (11 tüplü seviye 17), tüp dokunma boyutu yeterli, sonuç kutusu sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await call(page, 'newLevel', 17);
    await expect(page.locator('#su-tubes .su-tube')).toHaveCount(11);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const b = (await page.locator('#su-tubes .su-tube').first().boundingBox())!;
    expect(b.width).toBeGreaterThanOrEqual(40);
    expect(b.height).toBeGreaterThanOrEqual(120);
    await call(page, 'setTubes', [[0, 0, 0, 1], [1, 1, 1], [0], []]);
    await call(page, 'pour', 0, 1);
    await call(page, 'pour', 2, 0);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-su-siralama-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-su-siralama-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/su-siralama/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
