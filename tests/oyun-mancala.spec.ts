import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Mancala (Kalah): motor kuralları (dağıtma, tekrar oynama, ele geçirme, oyun sonu, zor seviye),
// arayüz (bilgisayar cevabı, geri al, iki kişilik, klavye), bozuk localStorage, mobil, dış istek, sayfa hatası.
const URL_PATH = '/oyunlar/mancala/';
const pit = (page: Page, n: number) => page.locator(`#mc-board [data-pit="${n}"]`);
const total = async (page: Page) => {
  const c = await page.locator('#mc-board [data-count]').evaluateAll((els) => els.map((e) => Number((e as HTMLElement).dataset.count)));
  return c.reduce((a, b) => a + b, 0);
};

// Motor çağrıları sayfa bağlamında modül olarak içe aktarılır
const engine = <T>(page: Page, fn: string, arg?: unknown) =>
  page.evaluate(async ({ fn, arg }) => {
    const m = await import('/oyunlar/mancala/engine.js');
    // eslint-disable-next-line no-new-func
    return new Function('m', 'arg', fn)(m, arg);
  }, { fn, arg }) as Promise<T>;

test.describe('Oyun: mancala', () => {
  test('sayfa açılır, 12 çukur ve 2 hazne, 3 reklam, 900+ kelime, JSON-LD; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#mc-board .mc-pit')).toHaveCount(12);
    await expect(page.locator('#mc-board .mc-store')).toHaveCount(2);
    expect(await total(page)).toBe(48);
    await expect(page.locator('#mc-status')).toContainText('Sıra sizde');
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('motor: dağıtma saat yönünün tersine gider ve rakip haznesi atlanır', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await engine<{ pits: number[]; path: number[]; turn: number }>(page, `
      const s = m.newState();
      s.pits = [0,0,0,0,0,10, 0, 1,1,1,1,1,1, 0];
      const res = m.applyMove(s, 5);
      return { pits: res.state.pits, path: res.path, turn: res.state.turn };`);
    // 5. çukurdan 10 taş: kendi hazne (6), 7-12, sonra rakip haznesi atlanıp 0, 1
    expect(r.path).toEqual([6, 7, 8, 9, 10, 11, 12, 0, 1, 2]);
    expect(r.pits[13]).toBe(0);
    expect(r.turn).toBe(1);
  });

  test('motor: son taş kendi haznesine düşerse tekrar oynama hakkı doğar', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await engine<{ extra: boolean; store: number; turn: number; extra2: boolean }>(page, `
      const s = m.newState();
      const a = m.applyMove(s, 2);
      const b = m.applyMove(s, 0);
      return { extra: a.extra, store: a.state.pits[6], turn: a.state.turn, extra2: b.extra };`);
    expect(r.extra).toBe(true);
    expect(r.store).toBe(1);
    expect(r.turn).toBe(0);
    expect(r.extra2).toBe(false);
  });

  test('motor: boş kendi çukuruna düşen son taş karşı çukuru ele geçirir', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await engine<{ captured: number; store: number; opp: number; own: number }>(page, `
      const s = m.newState();
      s.pits = [1,0,4,4,4,4, 0, 4,4,4,4,5,4, 0];
      const res = m.applyMove(s, 0);
      return { captured: res.captured, store: res.state.pits[6], opp: res.state.pits[11], own: res.state.pits[1] };`);
    expect(r.captured).toBe(5);
    expect(r.store).toBe(6);
    expect(r.opp).toBe(0);
    expect(r.own).toBe(0);
  });

  test('motor: bir taraf boşalınca kalan taşlar sahibine yazılır ve kazanan belli olur', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await engine<{ over: boolean; a: number; b: number; w: unknown; sum: number }>(page, `
      const s = m.newState();
      s.pits = [0,0,0,0,0,1, 10, 3,2,0,0,0,0, 8];
      const res = m.applyMove(s, 5);
      return { over: res.state.over, a: res.state.pits[6], b: res.state.pits[13], w: m.winner(res.state), sum: res.state.pits.reduce((x, y) => x + y, 0) };`);
    expect(r.over).toBe(true);
    expect(r.a).toBe(11);
    expect(r.b).toBe(13);
    expect(r.w).toBe(1);
    expect(r.sum).toBe(24);
  });

  test('motor: zor seviye (derinlik 7) tekrar oynama fırsatını kullanır', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await engine<{ move: number; extra: boolean }>(page, `
      const s = m.newState();
      s.pits = [2,2,2,2,2,2, 0, 0,0,0,0,5,1, 0];
      s.turn = 1;
      const move = m.chooseMove(s, m.LEVEL_DEPTH.zor);
      return { move, extra: m.applyMove(s, move).extra };`);
    expect(r.move).toBe(12);
    expect(r.extra).toBe(true);
  });

  test('arayüz: hamle sonrası bilgisayar cevap verir, taş sayısı korunur; geri al eski tahtayı getirir', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(URL_PATH);
    await page.locator('#mc-level').selectOption('kolay');
    await pit(page, 0).click();
    // Çukur 0'dan 4 taş: 1-4 çukurlarına gider, sıra bilgisayara geçer
    await expect(pit(page, 0)).toHaveAttribute('data-count', '0');
    await expect(page.locator('#mc-status')).toContainText('Sıra sizde', { timeout: 15000 });
    expect(await total(page)).toBe(48);
    // Bilgisayar oynadığı için üst sıra artık 4'ün hepsi değil (ya da hazne dolu)
    const top = await page.locator('#mc-board .mc-top').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.count));
    const s13 = await page.locator('#mc-s13').getAttribute('data-count');
    expect(top.some((c) => c !== '4') || s13 !== '0').toBe(true);
    await expect(page.locator('#mc-undo')).toBeEnabled();
    await page.locator('#mc-undo').click();
    for (let i = 0; i < 6; i++) await expect(pit(page, i)).toHaveAttribute('data-count', '4');
    await expect(page.locator('#mc-s13')).toHaveAttribute('data-count', '0');
    await expect(page.locator('#mc-undo')).toBeDisabled();
  });

  test('iki kişilik mod sırayla çalışır; klavyede 1 tuşu soldaki çukuru oynar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(URL_PATH);
    await page.locator('#mc-mode').selectOption('two');
    await expect(page.locator('#mc-level-wrap')).toBeHidden();
    await page.keyboard.press('1');
    await expect(pit(page, 0)).toHaveAttribute('data-count', '0');
    await expect(page.locator('#mc-status')).toContainText('Oyuncu 2');
    await expect(pit(page, 7)).toBeEnabled();
    await expect(pit(page, 1)).toBeDisabled();
    // Üst sırada 1 tuşu soldaki (12 numaralı) çukuru oynar
    await page.keyboard.press('1');
    await expect(pit(page, 12)).toHaveAttribute('data-count', '0');
    expect(await total(page)).toBe(48);
  });

  test('bozuk localStorage çökertmez; kayıtlı skor gösterilir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => localStorage.setItem('ba-oyun-mancala', '{{{bozuk'));
    await page.goto(URL_PATH);
    await expect(page.locator('#mc-stats')).toContainText('0 galibiyet');
    expect(errors).toEqual([]);
    const p2 = await page.context().newPage();
    await p2.addInitScript(() => localStorage.setItem('ba-oyun-mancala', '{"win":3,"loss":1,"draw":0,"best":9}'));
    await p2.goto(URL_PATH);
    await expect(p2.locator('#mc-stats')).toContainText('3 galibiyet');
    await expect(p2.locator('#mc-stats')).toContainText('en iyi fark 9');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const box = await page.locator('#mc-board').boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    await pit(page, 3).scrollIntoViewIfNeeded();
    await expect(pit(page, 3)).toBeVisible();
  });
});
