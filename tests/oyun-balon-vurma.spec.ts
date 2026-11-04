import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Balon Vurma: altıgen ızgara mantığı (kanca ile), fizik, kontroller, tavan inişi, bitiş, rekor, içerik ve mobil.
const URL_PATH = '/oyunlar/balon-vurma/';
const STORE_KEY = 'ba-oyun-balon-vurma';

const stage = (page: Page) => page.locator('#stage');
const num = async (page: Page, attr: string) => Number((await stage(page).getAttribute(`data-${attr}`)) || 'NaN');

async function open(page: Page, query = '') {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH + query);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}
async function startGame(page: Page) {
  await page.locator('#btn-main').click();
  await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
}
// Test kancası: oyun mantığını fizik beklemeden sınar
const hook = <T>(page: Page, fn: string, ...args: unknown[]) =>
  page.evaluate(([f, a]) => {
    const api = (window as unknown as { __balonVurmaTest: () => Record<string, (...x: unknown[]) => unknown> }).__balonVurmaTest();
    return api[f as string](...(a as unknown[]));
  }, [fn, args] as [string, unknown[]]) as Promise<T>;
type Snap = { state: string; score: number; best: number; level: number; shotsLeft: number; bubbles: number; rows: number; grid: string[]; seed: number };
const snap = (page: Page) => hook<Snap>(page, 'snapshot');

test.describe('Balon Vurma', () => {
  test('sayfa açılır; ≥800 kelime, 3 reklam (oyun kutusunun dışında), SSS ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Balon Vurma');
    await expect(page).toHaveTitle(/Balon Vurma Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-balon-vurma-a', 'oyun-balon-vurma-b', 'oyun-balon-vurma-c']);
    const placement = await page.evaluate(() => {
      const box = document.getElementById('game-box')!;
      const a = document.querySelector('.ba-ad[data-slot$="-a"]')!;
      return {
        insideBox: Array.from(document.querySelectorAll('.ba-ad')).some((ad) => box.contains(ad)),
        aAfterBox: !!(box.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING),
      };
    });
    expect(placement).toEqual({ insideBox: false, aAfterBox: true });

    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    expect(ld['@graph'].map((n: { '@type': string }) => n['@type'])).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('3 aynı renk patlar, 2 patlamaz; puan 10/balon; kümeler hücre komşuluğuyla bulunur', async ({ page }) => {
    await open(page);
    await startGame(page);
    await hook(page, 'setGrid', ['0........3']);
    let r = await hook<{ popped: number; fallen: number }>(page, 'drop', 0, 1, 0);
    expect(r.popped).toBe(0); // iki balon patlamaz
    expect((await snap(page)).bubbles).toBe(3);

    await hook(page, 'setGrid', ['00.......3']);
    r = await hook<{ popped: number; fallen: number }>(page, 'drop', 0, 2, 0);
    expect(r).toMatchObject({ popped: 3, fallen: 0 });
    const s = await snap(page);
    expect(s.score).toBe(30);
    expect(s.bubbles).toBe(1);
    await expect(stage(page)).toHaveAttribute('data-score', '30');
  });

  test('tavana bağlantısı kopan balonlar düşer (balon başına 20 puan)', async ({ page }) => {
    await open(page);
    await startGame(page);
    // 1. sıra bir hücre kaymış: (1,0), (0,0) ve (0,1) komşusudur; ayrıca (2,0) ve (3,0) zincirle asılı
    await hook(page, 'setGrid', ['00.......3', '1........', '2.........', '3........']);
    const r = await hook<{ popped: number; fallen: number }>(page, 'drop', 0, 2, 0);
    expect(r.popped).toBe(3);
    expect(r.fallen).toBe(3); // (1,0), (2,0), (3,0)
    const s = await snap(page);
    expect(s.score).toBe(30 + 3 * 20);
    expect(s.bubbles).toBe(1);
  });

  test('tahta temizlenince seviye biter, bonus eklenir, sonraki seviye başlar', async ({ page }) => {
    await open(page);
    await startGame(page);
    await hook(page, 'setGrid', ['00........']);
    const r = await hook<{ cleared: boolean }>(page, 'drop', 0, 2, 0);
    expect(r.cleared).toBe(true);
    await expect(stage(page)).toHaveAttribute('data-state', 'seviye');
    await expect(page.locator('#overlay-title')).toContainText('Seviye 1 tamamlandı');
    expect(await num(page, 'score')).toBe(30 + 100);
    await page.waitForTimeout(600); // kazara geçişi önleyen kısa kilit
    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(stage(page)).toHaveAttribute('data-level', '2');
    expect(await num(page, 'bubbles')).toBeGreaterThan(20);
  });

  test('her 6 atışta tavan iner: yeni sıra eklenir, sayaç yeniden 6 olur', async ({ page }) => {
    await open(page);
    await startGame(page);
    await hook(page, 'setGrid', ['0........3']);
    const cells: [number, number][] = [[0, 2], [0, 4], [0, 6], [0, 8], [1, 0], [1, 2]];
    for (let i = 0; i < 6; i++) {
      const before = await snap(page);
      expect(before.shotsLeft).toBe(6 - i);
      const r = await hook<{ popped: number }>(page, 'drop', cells[i][0], cells[i][1], 4);
      expect(r.popped).toBe(0);
    }
    const after = await snap(page);
    expect(after.shotsLeft).toBe(6);
    expect(after.rows).toBe(3); // 2 sıra + yeni tavan sırası
    expect(after.bubbles).toBeGreaterThan(8);
    await expect(page.locator('#descent')).toHaveText('6');
  });

  test('fizik: düz yukarı atış iki balonun arasına yerleşir, atış sayacı azalır, balon yerleşince uçuş biter', async ({ page }) => {
    await open(page);
    await startGame(page);
    await hook(page, 'setGrid', ['....11....']);
    await hook(page, 'setShot', 2, 3);
    expect(await hook<boolean>(page, 'fire', 0)).toBe(true);
    await expect(stage(page)).toHaveAttribute('data-flying', '1');
    await expect(stage(page)).toHaveAttribute('data-shots-left', '5', { timeout: 5000 });
    await expect(stage(page)).toHaveAttribute('data-flying', '0');
    const s = await snap(page);
    expect(s.grid[1]).toBe('....2....'); // 2. sıra yarım hücre kaymış: sütun 4 tam ortada
    expect(s.bubbles).toBe(3);
  });

  test('duvardan sekme: sola açılı atış duvara çarpıp geri döner ve yerleşir', async ({ page }) => {
    await open(page);
    await startGame(page);
    await hook(page, 'setGrid', ['..........']); // boş tahta; yalnızca tavan
    await hook(page, 'setShot', 1, 1);
    await hook(page, 'fire', -60);
    await expect(stage(page)).toHaveAttribute('data-shots-left', '5', { timeout: 6000 });
    const s = await snap(page);
    expect(s.bubbles).toBe(1);
    // Balon tavana yerleşti (sıra 0); yatay konumu sekmeden dolayı sol duvardan döndükten sonraki yerde
    expect(s.grid[0].indexOf('1')).toBeGreaterThanOrEqual(0);
  });

  test('klavye: oklar nişanı çevirir, Boşluk atar, ↓ balonları değiştirir, P duraklatır', async ({ page }) => {
    await open(page);
    await startGame(page);
    const a0 = await num(page, 'aim');
    await page.keyboard.down('ArrowRight');
    await expect.poll(() => num(page, 'aim')).toBeGreaterThan(a0 + 10);
    await page.keyboard.up('ArrowRight');
    await page.keyboard.down('ArrowLeft');
    await expect.poll(() => num(page, 'aim')).toBeLessThan(a0);
    await page.keyboard.up('ArrowLeft');

    const cur = await num(page, 'cur');
    const nxt = await num(page, 'next');
    await page.keyboard.press('ArrowDown');
    await expect(stage(page)).toHaveAttribute('data-cur', String(nxt));
    await expect(stage(page)).toHaveAttribute('data-next', String(cur));

    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-flying', '1');
    await expect(stage(page)).toHaveAttribute('data-shots-left', '5', { timeout: 6000 });

    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay-title')).toHaveText('Duraklatıldı');
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
  });

  test('fare ile nişan alınır ve tıklayınca balon fırlar; dokunmatik bırakınca fırlatır', async ({ page }) => {
    await open(page);
    await startGame(page);
    await stage(page).evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
    const box = (await stage(page).boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.4);
    await expect.poll(() => num(page, 'aim')).toBeLessThan(-20);
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.4);
    await expect.poll(() => num(page, 'aim')).toBeGreaterThan(20);
    await page.mouse.down();
    await page.mouse.up();
    await expect(stage(page)).toHaveAttribute('data-shots-left', '5', { timeout: 6000 });

    await page.evaluate(() => {
      const st = document.getElementById('stage') as HTMLElement;
      const r = st.getBoundingClientRect();
      const fire = (type: string, cx: number, cy: number) =>
        st.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: 'touch', isPrimary: true, clientX: cx, clientY: cy, bubbles: true }));
      fire('pointerdown', r.left + r.width * 0.5, r.top + r.height * 0.5);
      fire('pointermove', r.left + r.width * 0.3, r.top + r.height * 0.4);
      fire('pointerup', r.left + r.width * 0.3, r.top + r.height * 0.4);
    });
    await expect(stage(page)).toHaveAttribute('data-shots-left', '4', { timeout: 6000 });
  });

  test('alt çizgiye balon yerleşince oyun biter, rekor localStorage’a yazılır, yeniden oyna ve yenileme çalışır', async ({ page }) => {
    await open(page);
    await startGame(page);
    await hook(page, 'setGrid', ['00.......3']);
    await hook(page, 'drop', 0, 2, 0); // 30 puan
    const r = await hook<{ over: boolean }>(page, 'drop', 13, 0, 1);
    expect(r.over).toBe(true);
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#overlay-title')).toHaveText('Oyun bitti');
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best).toBe(30);
    await expect(page.locator('#best')).toHaveText('30');

    await page.waitForTimeout(800);
    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(page.locator('#score')).toHaveText('0');
    await expect(page.locator('#best')).toHaveText('30');
    await page.reload();
    await expect(page.locator('#best')).toHaveText('30');
  });

  test('?seed= aynı dizilimi verir; farklı tohum farklı dizilim', async ({ page }) => {
    await open(page, '?seed=4242');
    expect(await num(page, 'seed')).toBe(4242);
    await startGame(page);
    const a = await snap(page);
    await page.reload();
    await startGame(page);
    const b = await snap(page);
    expect(b.grid).toEqual(a.grid);
    await page.goto(URL_PATH + '?seed=4243');
    await startGame(page);
    const c = await snap(page);
    expect(c.grid).not.toEqual(a.grid);
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#best')).toHaveText('0');
    await startGame(page);
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, oyun alanı 2:3 oranında sığar, düğmelerle oyun başlar ve duraklar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = (await stage(page).boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box.height / box.width - 1.5)).toBeLessThan(0.02);
    await startGame(page);
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    expect(errors).toEqual([]);
  });

  test('tam ekran düğmesi oyun kutusunu tam ekran yapar (reklamlar kutunun dışında kalır)', async ({ page }) => {
    await open(page);
    await expect(page.locator('#btn-full')).toBeVisible();
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await page.keyboard.press('Escape');
  });
});
