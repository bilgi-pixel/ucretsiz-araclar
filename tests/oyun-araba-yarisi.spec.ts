import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Araba Yarışı: sayfa yapısı, kayan yol, şerit değişimi, çarpışma, rekor, duraklatma, tema, mobil.
const URL_PATH = '/oyunlar/araba-yarisi/';
const STORE_KEY = 'ba-oyun-araba-yarisi';

type Info = {
  state: string; lane: number; x: number; speed: number; dist: number; score: number; best: number; night: boolean; frozen: boolean;
  objects: { kind: string; lane: number; y: number }[];
};
const info = (page: Page) => page.evaluate(() => (window as any).__arabaTest() as Info);
const hook = (page: Page, fn: string, ...args: unknown[]) =>
  page.evaluate(([f, a]) => (window as any).__arabaTest[f as string](...(a as unknown[])), [fn, args] as const);
const stage = (page: Page) => page.locator('#stage');

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}
async function start(page: Page) {
  await page.locator('#btn-main').click();
  await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
}

test.describe('Araba Yarışı', () => {
  test('sayfa içeriği: ≥800 kelime, SSS ≥7, 3 reklam (A oyun kutusunun altında), JSON-LD, dış istek ve hata yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Araba Yarışı');
    await expect(page).toHaveTitle(/Araba Yarışı Oyna/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/araba-yarisi/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');

    const words = ((await page.locator('.ba-content').innerText()) || '').split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['oyun-araba-yarisi-a', 'oyun-araba-yarisi-b', 'oyun-araba-yarisi-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const gameBox = (await page.locator('.game-box').boundingBox())!;
    const adA = (await page.locator('[data-slot="oyun-araba-yarisi-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(gameBox.y + gameBox.height + 32);

    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const graph = ld['@graph'];
    expect(graph.map((n: any) => n['@type'])).toEqual(['VideoGame', 'FAQPage']);
    expect(graph[1].mainEntity.length).toBeGreaterThanOrEqual(7);

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başlat: yol kayar (mesafe ve hız artar), canvas çiziliyor', async ({ page }) => {
    const errors = await open(page);
    expect((await info(page)).dist).toBe(0);
    await start(page);
    await expect(page.locator('#overlay')).toBeHidden();
    await expect.poll(async () => (await info(page)).dist, { timeout: 8000 }).toBeGreaterThan(5);
    const s0 = (await info(page)).speed;
    await page.waitForTimeout(600);
    expect((await info(page)).speed).toBeGreaterThan(s0);
    const distinct = await page.evaluate(() => {
      const c = document.getElementById('road') as HTMLCanvasElement;
      const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
      const seen = new Set<number>();
      for (let i = 0; i < d.length; i += 4 * 97) seen.add((d[i] << 16) | (d[i + 1] << 8) | d[i + 2]);
      return seen.size;
    });
    expect(distinct).toBeGreaterThan(5);
    expect(errors).toEqual([]);
  });

  test('ok tuşları, A/D ve ekran okları şerit değiştirir; kenarlarda taşmaz', async ({ page }) => {
    await open(page);
    await start(page);
    await hook(page, 'freeze', 280);
    expect((await info(page)).lane).toBe(1);
    await page.keyboard.press('ArrowLeft');
    expect((await info(page)).lane).toBe(0);
    await page.keyboard.press('a');
    expect((await info(page)).lane).toBe(0);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('d');
    expect((await info(page)).lane).toBe(2);
    await page.keyboard.press('ArrowRight');
    expect((await info(page)).lane).toBe(2);
    await expect(stage(page)).toHaveAttribute('data-lane', '2');
    // araba görsel olarak da sağ şeride kayar
    await expect.poll(async () => (await info(page)).x).toBeGreaterThan(270);
  });

  test('aynı şeride engel koyunca çarpışma ve oyun sonu; rekor localStorage\'a yazılır', async ({ page }) => {
    await open(page);
    await start(page);
    await hook(page, 'freeze', 300);
    // önce bir yıldız topla (+25)
    await hook(page, 'spawn', 'star', 1);
    await expect.poll(async () => (await info(page)).score, { timeout: 5000 }).toBeGreaterThanOrEqual(25);
    await hook(page, 'spawn', 'cone', 1);
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti', { timeout: 5000 });
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#overlay-title')).toHaveText('Oyun bitti');
    await expect(page.locator('#overlay-text')).toContainText('Çarpıştın');
    const s = await info(page);
    expect(s.score).toBeGreaterThanOrEqual(25);
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best.normal).toBe(s.score);
    await expect(page.locator('#hud-best')).toHaveText(String(s.score));

    await page.locator('#overlay-btn').click({ timeout: 3000 });
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    expect((await info(page)).score).toBeLessThan(5);
    await page.reload();
    await expect(page.locator('#hud-best')).toHaveText(String(s.score));
  });

  test('şerit değiştirince engelden kaçılır; farklı şeritteki engel çarpışma yapmaz', async ({ page }) => {
    await open(page);
    await start(page);
    await hook(page, 'freeze', 300);
    await hook(page, 'spawn', 'barrier', 1);
    await page.keyboard.press('ArrowLeft');
    await expect.poll(async () => (await info(page)).objects.length, { timeout: 5000 }).toBe(0);
    expect((await info(page)).state).toBe('oynuyor');
  });

  test('P ve düğme duraklatır: mesafe durur, devam edince artar', async ({ page }) => {
    await open(page);
    await start(page);
    await expect.poll(async () => (await info(page)).dist, { timeout: 8000 }).toBeGreaterThan(2);
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay-title')).toHaveText('Duraklatıldı');
    const frozen = (await info(page)).dist;
    await page.waitForTimeout(400);
    expect((await info(page)).dist).toBe(frozen);
    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect.poll(async () => (await info(page)).dist, { timeout: 8000 }).toBeGreaterThan(frozen);
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
  });

  test('gece teması ve seviye seçimi kalıcıdır', async ({ page }) => {
    await open(page);
    await page.locator('#btn-night').click();
    await expect(page.locator('#btn-night')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#opt-diff').selectOption('hard');
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.night).toBe(true);
    expect(saved.diff).toBe('hard');
    await page.reload();
    await expect(stage(page)).toHaveAttribute('data-night', 'true');
    await expect(page.locator('#opt-diff')).toHaveValue('hard');
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#hud-best')).toHaveText('0');
    await start(page);
    expect(errors).toEqual([]);
  });

  test('360px: taşma yok, ekran okları görünür ve çalışır, kaydırma ile şerit değişir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = (await stage(page).boundingBox())!;
    expect(box.x + box.width).toBeLessThanOrEqual(360);
    await expect(page.locator('.ar-pad')).toBeVisible();
    await start(page);
    await hook(page, 'freeze', 280);
    await page.locator('[data-pad="left"]').click();
    expect((await info(page)).lane).toBe(0);
    await page.evaluate(() => {
      const st = document.getElementById('stage') as HTMLElement;
      const r = st.getBoundingClientRect();
      const fire = (type: string, cx: number) =>
        st.dispatchEvent(new PointerEvent(type, { pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: cx, clientY: r.top + 100, bubbles: true }));
      fire('pointerdown', r.left + 100);
      fire('pointermove', r.left + 160);
      fire('pointerup', r.left + 160);
    });
    expect((await info(page)).lane).toBe(1);
    expect(errors).toEqual([]);
  });

  test.describe('Retina ekran', () => {
    test.use({ deviceScaleFactor: 2 });
    test('canvas devicePixelRatio kadar yüksek çözünürlükte çizilir', async ({ page }) => {
      await open(page);
      const d = await page.locator('#road').evaluate((c) => ({ w: (c as HTMLCanvasElement).width, css: Math.round(c.getBoundingClientRect().width) }));
      expect(d.w).toBe(d.css * 2);
    });
  });

  test('tam ekran düğmesi oyun kutusunu tam ekran yapar', async ({ page }) => {
    await open(page);
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await page.keyboard.press('Escape');
  });
});
