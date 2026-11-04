import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Köstebek Vurma: sayfa yapısı, vuruş/skor, bomba, süre bitişi ve rekor, sakin mod, klavye, erişilebilirlik.
const URL_PATH = '/oyunlar/kostebek-vurma/';
const STORE_KEY = 'ba-oyun-kostebek-vurma';

type Info = {
  state: string; mode: string; size: number; score: number; combo: number; timeLeft: number; best: number; hold: boolean; bombs: boolean;
  active: { index: number; type: string }[];
};
const info = (page: Page) => page.evaluate(() => (window as any).__kostebekTest() as Info);
const hook = (page: Page, fn: string, ...args: unknown[]) =>
  page.evaluate(([f, a]) => (window as any).__kostebekTest[f as string](...(a as unknown[])), [fn, args] as const);

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(page.locator('#stage')).toHaveAttribute('data-state', 'hazir');
  return errors;
}
async function start(page: Page) {
  await page.locator('#btn-main').click();
  await expect(page.locator('#stage')).toHaveAttribute('data-state', 'oynuyor');
}

test.describe('Köstebek Vurma', () => {
  test('sayfa içeriği: ≥800 kelime, SSS ≥7, 3 reklam (A oyun kutusunun altında), JSON-LD, dış istek ve hata yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Köstebek Vurma');
    await expect(page).toHaveTitle(/Köstebek Vurma Oyna/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/kostebek-vurma/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');

    const words = ((await page.locator('.ba-content').innerText()) || '').split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['oyun-kostebek-vurma-a', 'oyun-kostebek-vurma-b', 'oyun-kostebek-vurma-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const gameBox = (await page.locator('.game-box').boundingBox())!;
    const adA = (await page.locator('[data-slot="oyun-kostebek-vurma-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(gameBox.y + gameBox.height + 32);

    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const graph = ld['@graph'];
    expect(graph.map((n: any) => n['@type'])).toEqual(['VideoGame', 'FAQPage']);
    expect(graph[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(graph[0].applicationCategory).toBe('Game');

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başlat: aktif delik görünür; vurunca skor artar ve rekor yazılır', async ({ page }) => {
    await open(page);
    expect((await info(page)).active.length).toBe(0);
    await start(page);
    await expect.poll(async () => (await info(page)).active.length).toBeGreaterThan(0);
    await hook(page, 'hold', true);
    await hook(page, 'spawn', 4, 'normal');
    const hole = page.locator('.kv-hole[data-index="4"]');
    await expect(hole).toHaveAttribute('data-mole', 'normal');
    await hole.click();
    await expect(hole).not.toHaveAttribute('data-mole', /.*/);
    const s = await info(page);
    expect(s.score).toBe(1);
    expect(s.combo).toBe(1);
    await expect(page.locator('#hud-score')).toHaveText('1');
    await expect(page.locator('#hud-best')).toHaveText('1');
    // altın köstebek 3 puan
    await hook(page, 'spawn', 0, 'gold');
    await page.locator('.kv-hole[data-index="0"]').click();
    expect((await info(page)).score).toBe(4);
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['60-3']).toBe(4);
  });

  test('bomba skoru düşürür ve kombo serisini sıfırlar; skor sıfırın altına inmez', async ({ page }) => {
    await open(page);
    await start(page);
    await hook(page, 'hold', true);
    for (const i of [0, 1]) {
      await hook(page, 'spawn', i, 'gold');
      await page.locator(`.kv-hole[data-index="${i}"]`).click();
    }
    expect((await info(page)).score).toBe(6);
    expect((await info(page)).combo).toBe(2);
    await hook(page, 'spawn', 2, 'bomb');
    await page.locator('.kv-hole[data-index="2"]').click();
    const after = await info(page);
    expect(after.score).toBe(1);
    expect(after.combo).toBe(0);
    // skor 1 iken bir bomba daha: 0'da kalır
    await hook(page, 'spawn', 3, 'bomb');
    await page.locator('.kv-hole[data-index="3"]').click();
    expect((await info(page)).score).toBe(0);
  });

  test('süre bitince sonuç ekranı gelir, rekor localStorage\'a yazılır, yenilemede korunur', async ({ page }) => {
    await open(page);
    await start(page);
    await hook(page, 'hold', true);
    await hook(page, 'spawn', 5, 'gold');
    await page.locator('.kv-hole[data-index="5"]').click();
    await hook(page, 'shorten', 0.2);
    await expect(page.locator('#stage')).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#overlay-title')).toHaveText('Süre doldu!');
    await expect(page.locator('#overlay-text')).toContainText('Skor: 3');
    await expect(page.locator('#overlay-text')).toContainText('Yeni rekor');
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['60-3']).toBe(3);
    await page.reload();
    await expect(page.locator('#hud-best')).toHaveText('3');
  });

  test('30 sn modu ve 4×4 ızgara seçilir; ayar kalıcıdır, rekor mod/boyut başına ayrıdır', async ({ page }) => {
    await open(page);
    await page.locator('button[data-mode="30"]').click();
    await page.locator('button[data-size="4"]').click();
    await expect(page.locator('.kv-hole')).toHaveCount(16);
    await expect(page.locator('#hud-time')).toHaveText('30');
    await start(page);
    await expect(page.locator('button[data-mode="30"]')).toBeDisabled();
    await hook(page, 'hold', true);
    await hook(page, 'spawn', 15, 'normal');
    await page.locator('.kv-hole[data-index="15"]').click();
    await hook(page, 'shorten', 0.2);
    await expect(page.locator('#stage')).toHaveAttribute('data-state', 'bitti');
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['30-4']).toBe(1);
    expect(saved.best['60-3']).toBeUndefined();
    await page.reload();
    await expect(page.locator('.kv-hole')).toHaveCount(16);
    await expect(page.locator('button[data-mode="30"]')).toHaveAttribute('aria-pressed', 'true');
  });

  test('sakin mod: süre ve bomba yok; Bitir ile sonuç gelir', async ({ page }) => {
    await open(page);
    await page.locator('button[data-mode="calm"]').click();
    await expect(page.locator('#hud-time')).toHaveText('∞');
    await start(page);
    await expect.poll(async () => (await info(page)).active.length).toBeGreaterThan(0);
    const s = await info(page);
    expect(s.bombs).toBe(false);
    expect(await hook(page, 'spawn', 8, 'bomb')).toBe(false);
    // 3 sn boyunca hiçbir bomba çıkmaz
    for (let i = 0; i < 12; i++) {
      expect((await info(page)).active.every((a) => a.type !== 'bomb')).toBe(true);
      await page.waitForTimeout(250);
    }
    expect((await info(page)).state).toBe('oynuyor');
    await page.locator('#btn-finish').click();
    await expect(page.locator('#stage')).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#overlay-title')).toHaveText('Tebrikler!');
  });

  test('klavye: sayı tuş takımı, harf blokları ve Enter ile vurulur; P duraklatır', async ({ page }) => {
    await open(page);
    await start(page);
    await hook(page, 'hold', true);
    // Numpad7 = sol üst (0), Numpad3 = sağ alt (8)
    await hook(page, 'spawn', 0, 'normal');
    await page.keyboard.press('Numpad7');
    expect((await info(page)).score).toBe(1);
    await hook(page, 'spawn', 8, 'normal');
    await page.keyboard.press('Numpad3');
    expect((await info(page)).score).toBe(2);
    // harf bloğu: Z = sol alt (6)
    await hook(page, 'spawn', 6, 'normal');
    await page.keyboard.press('z');
    expect((await info(page)).score).toBe(3);
    // odak + Enter
    await hook(page, 'spawn', 4, 'normal');
    await page.locator('.kv-hole[data-index="4"]').focus();
    await page.keyboard.press('Enter');
    expect((await info(page)).score).toBe(4);
    // ok tuşları odağı komşu deliğe taşır
    await page.keyboard.press('ArrowRight');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.index)).toBe('5');

    await page.keyboard.press('p');
    await expect(page.locator('#stage')).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay-title')).toHaveText('Duraklatıldı');
    await page.keyboard.press('p');
    await expect(page.locator('#stage')).toHaveAttribute('data-state', 'oynuyor');
  });

  test('prefers-reduced-motion: köstebek çıkış animasyonu kapalıdır', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const dur = await page.locator('.kv-mole').first().evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(dur).toBe('0s');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const dur2 = await page.locator('.kv-mole').first().evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(dur2).not.toBe('0s');
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#hud-best')).toHaveText('0');
    await start(page);
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, delikler dokunmaya uygun boyutta, 4×4 sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    await page.locator('button[data-size="4"]').click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const boxes = await page.locator('.kv-hole').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().width));
    expect(Math.min(...boxes)).toBeGreaterThanOrEqual(44);
    const stage = (await page.locator('#stage').boundingBox())!;
    expect(stage.x + stage.width).toBeLessThanOrEqual(360);
    expect(errors).toEqual([]);
  });

  test('tam ekran düğmesi oyun kutusunu tam ekran yapar', async ({ page }) => {
    await open(page);
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await page.keyboard.press('Escape');
  });
});
