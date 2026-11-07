import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Yol Geçişi: başlatma, duraklatma, sıçrama, ağaç engeli, araç çarpması, kamera baskısı, rekor, bozuk kayıt, 360px, içerik.
// Mantık testleri oyunu duraklatıp test kancasının step()/hop() fonksiyonlarıyla belirleyici ilerler.
const URL_PATH = '/oyunlar/yol-gecisi/';
const KEY = 'ba-oyun-yol-gecisi';

type Snap = { phase: string; score: number; best: number; row: number; col: number; maxRow: number; cam: number; hops: number; cause: string; lanes: { row: number; type: string; trees: number[]; cars: { x: number; w: number }[] }[] };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__yolTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__yolTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'hazir');
  await expect(page.locator('#yg-canvas')).toBeVisible();
}
async function startPaused(page: Page) {
  await page.locator('#yg-canvas').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await page.keyboard.press('p');
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
}

test.describe('Yol Geçişi', () => {
  test('sayfa açılır; oyun hazır durumda, tuval 288x384; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Yol Geçişi');
    await expect(page.locator('#yg-canvas')).toHaveAttribute('width', '288');
    await expect(page.locator('#yg-canvas')).toHaveAttribute('height', '384');
    await expect(page.locator('#yg-score')).toHaveText('0');
    await expect(page.locator('#yg-start')).toHaveText('Başla');
    const s = await snap(page);
    expect(s.phase).toBe('hazir');
    expect(s.lanes.length).toBeGreaterThan(10);
    expect(s.lanes.filter((l) => l.row <= 2).every((l) => l.type === 'grass' && l.trees.length === 0)).toBe(true);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('boşlukla başlar, P ile duraklar ve devam eder, düğme metni değişir', async ({ page }) => {
    await open(page);
    await page.locator('#yg-canvas').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#yg-start')).toHaveText('Duraklat (P)');
    await page.keyboard.press('p');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
    await expect(page.locator('#yg-start')).toHaveText('Devam et (P)');
    await page.keyboard.press('Space');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await page.locator('#yg-start').click();
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
  });

  test('sıçrama: ileri satırı ve skoru artırır, yanlara gider, geri gelir; sınırdan dışarı çıkmaz', async ({ page }) => {
    await open(page);
    await startPaused(page);
    for (const r of [2, 3, 4]) await call(page, 'setLane', r, { type: 'grass' });
    let s = await snap(page);
    expect(s.row).toBe(1);
    expect(await call(page, 'hop', 'up')).toBe(true);
    s = await snap(page);
    expect(s.row).toBe(2);
    expect(s.score).toBe(1);
    await call(page, 'hop', 'up');
    await call(page, 'hop', 'right');
    s = await snap(page);
    expect([s.row, s.col, s.score]).toEqual([3, 5, 2]);
    await call(page, 'hop', 'down');
    s = await snap(page);
    expect(s.row).toBe(2);
    expect(s.score).toBe(2); // geri gitmek skoru düşürmez
    await call(page, 'patch', { col: 0 });
    expect(await call(page, 'hop', 'left')).toBe(false);
    await call(page, 'patch', { col: 8 });
    expect(await call(page, 'hop', 'right')).toBe(false);
    await expect(page.locator('#yg-score')).toHaveText('2');
  });

  test('ağaç yolu kapatır: ağaca doğru sıçrayınca oyuncu yerinde kalır, boş sütundan geçer', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setLane', 2, { type: 'grass', trees: [4] });
    expect(await call(page, 'hop', 'up')).toBe(false);
    let s = await snap(page);
    expect([s.row, s.col]).toEqual([1, 4]);
    await call(page, 'hop', 'left');
    expect(await call(page, 'hop', 'up')).toBe(true);
    s = await snap(page);
    expect([s.row, s.col]).toEqual([2, 3]);
  });

  test('araçlar ilerler ve çarpınca oyun biter; sonuç kutusu nedeni yazar', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setLane', 2, { type: 'road', dir: 1, speed: 0.05, cars: [{ x: -3, w: 2 }] });
    expect(await call(page, 'hop', 'up')).toBe(true); // araç uzakta: güvenli
    let s = await snap(page);
    expect(s.phase).toBe('duraklat');
    const x0 = s.lanes.find((l) => l.row === 2)!.cars[0].x;
    s = await call(page, 'step', 60);
    expect(s.lanes.find((l) => l.row === 2)!.cars[0].x).toBeGreaterThan(x0 + 2); // araç sağa ilerledi
    expect(s.phase).toBe('duraklat');
    s = await call(page, 'step', 80); // araç 4. sütuna varır
    expect(s.phase).toBe('bitti');
    expect(s.cause).toContain('Araç');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-neden')).toContainText('Araç çarptı');
  });

  test('doğrudan araç önüne sıçramak oyunu bitirir; rekor kaydedilir, Enter ile yeniden başlar', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setLane', 2, { type: 'grass' });
    await call(page, 'hop', 'up');
    await call(page, 'setLane', 3, { type: 'road', dir: 1, speed: 0, cars: [{ x: 3.5, w: 2 }] });
    await call(page, 'hop', 'up'); // çarpışır
    const s = await snap(page);
    expect(s.phase).toBe('bitti');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc-skor')).toHaveText('2');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#yg-best')).toHaveText('2');
    await expect(page.locator('#yg-again')).toBeFocused();
    expect(await stored(page)).toEqual({ best: 2 });
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    await expect(page.locator('#yg-score')).toHaveText('0');
    await page.reload();
    await expect(page.locator('#yg-best')).toHaveText('2');
    await page.locator('#yg-reset').click();
    await expect(page.locator('#yg-best')).toHaveText('0');
  });

  test('kamera yavaşça ilerler: uzun süre beklemek geride kalıp oyunu bitirir', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setLane', 2, { type: 'grass' });
    await call(page, 'hop', 'up'); // süre işlemeye başlar
    const s0 = await snap(page);
    const s1 = await call(page, 'step', 100);
    expect(s1.cam).toBeGreaterThan(s0.cam);
    const s2 = await call(page, 'step', 700);
    expect(s2.phase).toBe('bitti');
    expect(s2.cause).toContain('gerisinde');
  });

  test('fare/dokunma: tuvale tıklamak başlatır, ikinci tıklama ileri sıçratır; ekran düğmesi de çalışır', async ({ page }) => {
    await open(page);
    await page.locator('#yg-canvas').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const c = (await page.locator('#yg-canvas').boundingBox())!;
    await page.mouse.click(c.x + c.width / 2, c.y + c.height / 2);
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await page.mouse.click(c.x + c.width / 2, c.y + c.height / 2);
    await expect.poll(async () => (await snap(page)).row).toBe(2);
    await page.locator('#yg-left').click();
    await expect.poll(async () => (await snap(page)).col).toBe(3);
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z"}', '{"best":-4}', '{"best":1.5}', '{"best":1e12}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#yg-best')).toHaveText('0');
      await page.locator('#yg-start').click();
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
    await startPaused(page);
    await call(page, 'setLane', 2, { type: 'road', speed: 0, cars: [{ x: 3.5, w: 2 }] });
    await call(page, 'hop', 'up');
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, tuval ve yön düğmeleri ekrana sığar, düğmeler dokunmaya yeterli', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const c = (await page.locator('#yg-canvas').boundingBox())!;
    expect(c.x).toBeGreaterThanOrEqual(0);
    expect(c.x + c.width).toBeLessThanOrEqual(360);
    for (const id of ['yg-up', 'yg-down', 'yg-left', 'yg-right']) {
      const b = (await page.locator(`#${id}`).boundingBox())!;
      expect(b.height).toBeGreaterThanOrEqual(44);
      expect(b.width).toBeGreaterThanOrEqual(44);
      expect(b.x + b.width).toBeLessThanOrEqual(360);
    }
    await startPaused(page);
    await call(page, 'setLane', 2, { type: 'road', speed: 0, cars: [{ x: 3.5, w: 2 }] });
    await call(page, 'hop', 'up');
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-yol-gecisi-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-yol-gecisi-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/yol-gecisi/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
