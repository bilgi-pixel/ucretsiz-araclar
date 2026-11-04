import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Kule Yığma oyunu: mutlu yol (mükemmel/kesik/kaçırma), duraklatma, kayıt, mobil, içerik.
// Test kancası: window.__kuleTest().align() kayan bloğu dondurup hizalar; bırakma gerçek girdiyle yapılır.
const URL_PATH = '/oyunlar/kule-yigma/';
const STORE_KEY = 'ba-oyun-kule-yigma';

type Kule = {
  state: string; score: number; floors: number; best: number; perfectStreak: number; perfectCount: number; speed: number;
  top: { x: number; w: number }; block: { x: number; w: number } | null;
};
const info = (page: Page) => page.evaluate(() => {
  const k = (window as unknown as { __kuleTest: () => Kule & { align: unknown } }).__kuleTest();
  const { align, ...rest } = k; // eslint-disable-line @typescript-eslint/no-unused-vars
  return rest as Kule;
});
const align = (page: Page, kind: 'perfect' | 'offset' | 'miss', offset = 0) => page.evaluate(
  ([k, o]) => (window as unknown as { __kuleTest: () => { align: (k: string, o: number) => boolean } }).__kuleTest().align(k as string, o as number),
  [kind, offset] as const,
);
const tapCanvas = (page: Page) => page.locator('#kl-canvas').click();
const canvasBox = async (page: Page) => (await page.locator('#kl-canvas').boundingBox())!;

function watch(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

test.describe('Oyun: Kule Yığma', () => {
  test('sayfa açılır, boşta blok kayar, Başla ile oyun başlar; dış istek ve sayfa hatası yok', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Kule Yığma');
    await expect(page.locator('#kl-canvas')).toBeVisible();
    expect((await info(page)).state).toBe('idle');
    const a = (await info(page)).block!.x;
    await page.waitForTimeout(150);
    expect((await info(page)).block!.x).not.toBe(a); // boşta gösterim hareketi
    await page.locator('#kl-start').click();
    expect((await info(page)).state).toBe('playing');
    await expect(page.locator('#kl-start')).toBeDisabled();
    await expect(page.locator('#kl-pause')).toBeEnabled();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tuval çizilir: zemin bloğu zeminin üstünde açık renkle görünür', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    const lum = await page.evaluate(() => {
      const c = document.getElementById('kl-canvas') as HTMLCanvasElement;
      const g = c.getContext('2d')!;
      const k = c.width / 300;
      // Zemin bloğunun ortası: mantıksal (150, 400-24-11)
      const d = g.getImageData(Math.round(150 * k), Math.round((400 - 24 - 11) * k), 1, 1).data;
      return (d[0] + d[1] + d[2]) / 3;
    });
    expect(lum).toBeGreaterThan(90);
  });

  test('mükemmel bırakma (Boşluk) skoru artırır ve blok genişliği korunur', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    const before = await info(page);
    expect(before.score).toBe(0);
    expect(await align(page, 'perfect')).toBe(true);
    await page.keyboard.press('Space');
    const after = await info(page);
    expect(after.state).toBe('playing');
    expect(after.floors).toBe(1);
    expect(after.score).toBe(20); // 10 temel + 10 mükemmel bonusu
    expect(after.perfectStreak).toBe(1);
    expect(after.top.w).toBe(before.top.w);
    await expect(page.locator('#kl-score')).toHaveText('20');
    await expect(page.locator('#kl-floors')).toHaveText('1');
    await expect(page.locator('#kl-perfect')).toHaveText('1');
    // Bonus seri büyür: ikinci mükemmel 10 + 20 = 30 puan.
    await align(page, 'perfect');
    await page.keyboard.press('Space');
    expect((await info(page)).score).toBe(50);
  });

  test('kesik bırakma: taşan kısım kesilir, blok daralır, seri bozulur; tıklama da bırakır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    const before = await info(page);
    await align(page, 'offset', 30);
    await tapCanvas(page);
    const after = await info(page);
    expect(after.state).toBe('playing');
    expect(after.floors).toBe(1);
    expect(after.score).toBe(10);
    expect(after.perfectStreak).toBe(0);
    expect(after.top.w).toBeCloseTo(before.top.w - 30, 5);
    expect(after.block!.w).toBeCloseTo(before.top.w - 30, 5); // sonraki blok kalan genişlikte gelir
  });

  test('hız her katta artar', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    const v0 = (await info(page)).speed;
    for (let i = 0; i < 3; i++) {
      await align(page, 'perfect');
      await page.keyboard.press('Space');
    }
    const v3 = (await info(page)).speed;
    expect(v3).toBeGreaterThan(v0);
  });

  test('kaçırma oyunu bitirir, sonuç ve en yüksek skor yazılır, yeniden başla çalışır', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    await align(page, 'perfect');
    await page.keyboard.press('Space');
    await align(page, 'miss');
    await page.keyboard.press('Space');
    const over = await info(page);
    expect(over.state).toBe('over');
    expect(over.score).toBe(20);
    await expect(page.locator('#kl-result')).toHaveClass(/is-active/);
    await expect(page.locator('#kl-r-score')).toHaveText('20');
    await expect(page.locator('#kl-r-floors')).toHaveText('1');
    await expect(page.locator('#kl-start')).toHaveText('Yeniden başla');
    await expect(page.locator('#kl-start')).toBeEnabled();
    await expect(page.locator('#kl-pause')).toBeDisabled();

    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE_KEY);
    expect(stored.best).toBe(20);
    expect(stored.bestFloors).toBe(1);
    await expect(page.locator('#kl-best')).toContainText('20');

    // Bitmiş oyunda tuval tıklaması ve anında Boşluk yeniden başlatmaz.
    await tapCanvas(page);
    expect((await info(page)).state).toBe('over');

    await page.locator('#kl-start').click();
    const again = await info(page);
    expect(again.state).toBe('playing');
    expect(again.score).toBe(0);
    expect(again.floors).toBe(0);
    await expect(page.locator('#kl-result')).not.toHaveClass(/is-active/);
    expect(errors).toEqual([]);
  });

  test('düşük skorlu ikinci oyun en yüksek skoru ezmez', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    await align(page, 'perfect');
    await page.keyboard.press('Space'); // 20
    await align(page, 'miss');
    await page.keyboard.press('Space');
    await page.locator('#kl-start').click();
    await align(page, 'miss');
    await page.keyboard.press('Space'); // 0 puan
    expect((await info(page)).state).toBe('over');
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE_KEY);
    expect(stored.best).toBe(20);
  });

  test('Boşluk boştayken yalnızca oyun kutusunda başlatır; tuvalde odak varken başlatır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('h1').click(); // odak oyun kutusu dışında
    await page.keyboard.press('Space');
    expect((await info(page)).state).toBe('idle'); // sayfa kaydırma için serbest
    await page.locator('#kl-canvas').focus();
    await page.keyboard.press('Space');
    expect((await info(page)).state).toBe('playing');
  });

  test('tuvale dokunma/tıklama boştayken oyunu başlatır', async ({ page }) => {
    await page.goto(URL_PATH);
    await tapCanvas(page);
    expect((await info(page)).state).toBe('playing');
  });

  test('duraklat: blok durur, P ve Devam et ile sürer; Yeniden başlat görünür', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    await page.locator('#kl-pause').click();
    expect((await info(page)).state).toBe('paused');
    await expect(page.locator('#kl-pause')).toHaveText('Devam et');
    await expect(page.locator('#kl-start')).toHaveText('Yeniden başlat');
    const x1 = (await info(page)).block!.x;
    await page.waitForTimeout(200);
    expect((await info(page)).block!.x).toBe(x1);
    // Duraklıyken Boşluk/tuval bırakmaz, yalnızca sürdürür.
    await page.keyboard.press('p');
    expect((await info(page)).state).toBe('playing');
    await expect(page.locator('#kl-pause')).toHaveText('Duraklat');
    await page.waitForTimeout(200);
    expect((await info(page)).block!.x).not.toBe(x1);
    expect((await info(page)).floors).toBe(0);
  });

  test('bozuk localStorage kaydı sayfayı bozmaz', async ({ page }) => {
    const { errors } = watch(page);
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    await page.goto(URL_PATH);
    await expect(page.locator('#kl-best')).toContainText('henüz yok');
    await page.locator('#kl-start').click();
    expect((await info(page)).state).toBe('playing');
    expect(errors).toEqual([]);
  });

  test('ardışık 3 mükemmel kesilmiş bloğu genişletir, ama zemin genişliğini aşmaz', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    await align(page, 'offset', 20);
    await page.keyboard.press('Space');
    expect((await info(page)).top.w).toBeCloseTo(130, 5);
    for (let i = 0; i < 3; i++) {
      await align(page, 'perfect');
      await page.keyboard.press('Space');
    }
    const h = await info(page);
    expect(h.perfectStreak).toBe(3);
    expect(h.top.w).toBeCloseTo(136, 5);
    expect(h.score).toBe(10 + 20 + 30 + 40);
    for (let i = 0; i < 15; i++) {
      await align(page, 'perfect');
      await page.keyboard.press('Space');
    }
    expect((await info(page)).top.w).toBe(150);
  });

  test('kule yükselince kamera kayar: yüksek kulede oyun sürer ve hata vermez', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto(URL_PATH);
    await page.locator('#kl-start').click();
    for (let i = 0; i < 20; i++) {
      await align(page, 'perfect');
      await page.keyboard.press('Space');
    }
    const h = await info(page);
    expect(h.floors).toBe(20);
    expect(h.state).toBe('playing');
    // Genişleme: 3+ mükemmel seride blok başlangıç genişliğini aşmaz.
    expect(h.top.w).toBeLessThanOrEqual(150);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test('içerik: en az 800 kelime, 3 reklam (A oyun kutusunun altında), SSS >= 6, JSON-LD geçerli', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('main').evaluate((e) => (e as HTMLElement).innerText || '');
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(6);
    for (const k of ['a', 'b', 'c']) {
      await expect(page.locator(`.ba-ad[data-slot="oyun-kule-yigma-${k}"]`)).toHaveCount(1);
    }
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const [boxBottom, adTop] = await page.evaluate(() => [
      document.querySelector('.game-box')!.getBoundingClientRect().bottom,
      document.querySelector('.ba-ad[data-slot="oyun-kule-yigma-a"]')!.getBoundingClientRect().top,
    ]);
    expect(adTop).toBeGreaterThanOrEqual(boxBottom);
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://araclar.bilisimajans.com/oyunlar/kule-yigma/');
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const game = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame');
    expect(game.applicationCategory).toBe('Game');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(6);
  });

  test('360px: yatay taşma yok, tuval ekrana sığar, oyun oynanır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const box = await canvasBox(page);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(360);
    expect(box.height).toBeGreaterThan(250);
    // Dokunma ile başlat ve bırak.
    await tapCanvas(page);
    expect((await info(page)).state).toBe('playing');
    await align(page, 'perfect');
    await tapCanvas(page);
    expect((await info(page)).floors).toBe(1);
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
});
