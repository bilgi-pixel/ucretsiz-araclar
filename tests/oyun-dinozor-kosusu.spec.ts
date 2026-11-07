import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Dinozor Koşusu: başlama, zıplama, eğilme, çarpışma, duraklatma, rekor, bozuk kayıt, 360px ve içerik denetimleri.
// Benzetim test kancasıyla (setManual + step) kare kare sürülür; böylece sonuçlar kararlıdır.
const URL_PATH = '/oyunlar/dinozor-kosusu/';
const KEY = 'ba-oyun-dinozor-kosusu';

type Snap = { phase: string; score: number; best: number; y: number; duck: boolean; speed: number; frames: number; obstacles: any[]; manual: boolean };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__dinozorTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__dinozorTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);
const CACTUS = { type: 'kaktus', w: 30, h: 44, bottom: 0 };

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'hazir');
  await expect(page.locator('#dn-canvas')).toBeVisible();
}

test.describe('Dinozor Koşusu', () => {
  test('sayfa açılır: hazır durumda, canvas çizili; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Dinozor Koşusu');
    const s = await snap(page);
    expect(s.phase).toBe('hazir');
    expect(s.score).toBe(0);
    const painted = await page.evaluate(() => {
      const c = document.getElementById('dn-canvas') as HTMLCanvasElement;
      const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
      const set = new Set<number>();
      for (let i = 0; i < d.length; i += 4 * 97) set.add((d[i] << 16) | (d[i + 1] << 8) | d[i + 2]);
      return set.size;
    });
    expect(painted).toBeGreaterThan(2);
    await expect(page.locator('#dn-pause')).toBeDisabled();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Boşluk tuşu oyunu başlatır ve zıplatır; skor koştukça artar, dinozor yere iner', async ({ page }) => {
    await open(page);
    await call(page, 'setManual', true);
    await page.locator('#dn-canvas').focus();
    await page.keyboard.press('Space');
    let s = await snap(page);
    expect(s.phase).toBe('oyun');
    await call(page, 'step', 5);
    s = await snap(page);
    expect(s.y).toBeGreaterThan(20);
    await call(page, 'step', 60);
    s = await snap(page);
    expect(s.y).toBe(0);
    expect(s.score).toBeGreaterThan(20);
    await expect(page.locator('#dn-score')).toHaveText(String(s.score));
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  });

  test('gerçek zamanlı döngü: oyun kendiliğinden ilerler ve engel üretir', async ({ page }) => {
    await open(page);
    await page.locator('#dn-canvas').focus();
    await page.keyboard.press('ArrowUp');
    await expect.poll(async () => (await snap(page)).frames, { timeout: 5000 }).toBeGreaterThan(30);
    expect((await snap(page)).score).toBeGreaterThanOrEqual(0);
    await call(page, 'setManual', true);
  });

  test('aşağı ok eğilir, bırakınca kalkar; ekrandaki düğmeler de çalışır', async ({ page }) => {
    await open(page);
    await call(page, 'setManual', true);
    await call(page, 'start');
    await page.keyboard.down('ArrowDown');
    expect((await snap(page)).duck).toBe(true);
    await page.keyboard.up('ArrowDown');
    expect((await snap(page)).duck).toBe(false);
    const duck = page.locator('#dn-duck');
    await duck.scrollIntoViewIfNeeded();
    const b = (await duck.boundingBox())!;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.mouse.down();
    expect((await snap(page)).duck).toBe(true);
    await page.mouse.up();
    expect((await snap(page)).duck).toBe(false);
    await page.locator('#dn-jump').click();
    await call(page, 'step', 3);
    expect((await snap(page)).y).toBeGreaterThan(0);
  });

  test('çarpışma: engele çarpınca oyun biter, sonuç ve rekor yazılır; zıplayan dinozor aynı engeli geçer', async ({ page }) => {
    await open(page);
    await call(page, 'setManual', true);
    // zıplamadan: çarpar
    await call(page, 'start');
    await call(page, 'setObstacles', [{ ...CACTUS, x: 300 }]);
    await call(page, 'step', 80);
    expect((await snap(page)).phase).toBe('bitti');
    // zıplayarak: geçer
    await call(page, 'start');
    await call(page, 'setObstacles', [{ ...CACTUS, x: 300 }]);
    await call(page, 'step', 30);
    await call(page, 'jump');
    await call(page, 'step', 60);
    let s = await snap(page);
    expect(s.phase).toBe('oyun');
    expect(s.obstacles.length).toBeLessThanOrEqual(1);
    // yüksek kuş: ayakta çarpar, eğilince geçer
    await call(page, 'start');
    await call(page, 'setObstacles', [{ type: 'kus', x: 300, w: 34, h: 24, bottom: 30 }]);
    await page.keyboard.down('ArrowDown');
    await call(page, 'step', 80);
    s = await snap(page);
    await page.keyboard.up('ArrowDown');
    expect(s.phase).toBe('oyun');
    // son: kaktüse çarp, sonucu doğrula
    await call(page, 'setObstacles', [{ ...CACTUS, x: 60 }]);
    await call(page, 'step', 2);
    s = await snap(page);
    expect(s.phase).toBe('bitti');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-skor')).toHaveText(String(s.score));
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#dn-best')).toHaveText(String(s.score));
    expect((await stored(page)).best).toBe(s.score);
    await page.reload();
    await expect(page.locator('#dn-best')).toHaveText(String(s.score));
  });

  test('yeniden başlat: Tekrar koş düğmesi ve Enter oyunu sıfırlar', async ({ page }) => {
    await open(page);
    await call(page, 'setManual', true);
    await call(page, 'start');
    await call(page, 'setObstacles', [{ ...CACTUS, x: 60 }]);
    await call(page, 'step', 2);
    expect((await snap(page)).phase).toBe('bitti');
    await page.locator('#dn-again').click();
    let s = await snap(page);
    expect(s.phase).toBe('oyun');
    expect(s.score).toBe(0);
    expect(s.obstacles).toEqual([]);
    await expect(page.locator('#sonuc')).toBeHidden();
    await call(page, 'setObstacles', [{ ...CACTUS, x: 60 }]);
    await call(page, 'step', 2);
    await page.waitForTimeout(450);
    await page.locator('#dn-canvas').focus();
    await page.keyboard.press('Enter');
    s = await snap(page);
    expect(s.phase).toBe('oyun');
    expect(s.score).toBe(0);
  });

  test('duraklatma: P tuşu ve düğme oyunu durdurur/sürdürür; duraklıyken benzetim ilerlemez', async ({ page }) => {
    await open(page);
    await call(page, 'setManual', true);
    await call(page, 'start');
    await call(page, 'step', 10);
    await page.locator('#dn-canvas').focus();
    await page.keyboard.press('p');
    expect((await snap(page)).phase).toBe('durdu');
    await expect(page.locator('#dn-pause')).toContainText('Devam');
    const f = (await snap(page)).frames;
    await call(page, 'step', 20);
    expect((await snap(page)).frames).toBe(f);
    await page.locator('#dn-pause').click();
    expect((await snap(page)).phase).toBe('oyun');
    await call(page, 'step', 5);
    expect((await snap(page)).frames).toBe(f + 5);
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z"}', '{"best":-5}', '{"best":1e12}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#dn-best')).toHaveText('0');
      await call(page, 'setManual', true);
      await call(page, 'start');
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
    await call(page, 'setManual', true);
    await call(page, 'start');
    await call(page, 'setObstacles', [{ ...CACTUS, x: 60 }]);
    await call(page, 'step', 2);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, canvas sığar, düğmeler büyük ve yan yana, sonuç kutusu sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const c = (await page.locator('#dn-canvas').boundingBox())!;
    expect(c.x).toBeGreaterThanOrEqual(0);
    expect(c.x + c.width).toBeLessThanOrEqual(360);
    const j = (await page.locator('#dn-jump').boundingBox())!;
    const d = (await page.locator('#dn-duck').boundingBox())!;
    expect(j.height).toBeGreaterThanOrEqual(48);
    expect(Math.abs(j.y - d.y)).toBeLessThan(2);
    expect(d.x + d.width).toBeLessThanOrEqual(360);
    await call(page, 'setManual', true);
    await call(page, 'start');
    await call(page, 'setObstacles', [{ ...CACTUS, x: 60 }]);
    await call(page, 'step', 2);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-dinozor-kosusu-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-dinozor-kosusu-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/dinozor-kosusu/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
