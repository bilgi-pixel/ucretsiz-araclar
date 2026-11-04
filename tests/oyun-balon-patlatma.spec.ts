import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/oyunlar/balon-patlatma/';
const BEST_TIMED = 'ba-oyun-balon-en-yuksek-sureli';
const BEST_CALM = 'ba-oyun-balon-en-yuksek-sakin';

type Info = {
  state: string; mode: string; score: number; combo: number; timeLeft: number; shield: boolean; best: number;
  kb: { active: boolean; x: number; y: number };
  canvas: { left: number; top: number; width: number; height: number };
  balloons: { type: string; cx: number; cy: number; r: number; y: number }[];
};
const info = (page: Page) => page.evaluate(() => (window as any).__balonTest() as Info);

/** Test kancasından bir sıradan balonun ekran koordinatını alıp tıklar; skor artarsa true döner. */
async function popOne(page: Page): Promise<boolean> {
  await page.locator('#game-canvas').scrollIntoViewIfNeeded();
  for (let i = 0; i < 12; i++) {
    const s = await info(page);
    const pick = s.balloons
      .filter((b) => b.type === 'normal'
        && b.cx > s.canvas.left + b.r && b.cx < s.canvas.left + s.canvas.width - b.r
        && b.cy > s.canvas.top + b.r + 10 && b.cy < s.canvas.top + s.canvas.height - b.r - 10)
      .sort((a, b) => Math.abs(a.cy - (s.canvas.top + s.canvas.height / 2)) - Math.abs(b.cy - (s.canvas.top + s.canvas.height / 2)))[0];
    if (!pick) { await page.waitForTimeout(80); continue; }
    await page.mouse.click(pick.cx, pick.cy);
    const after = await info(page);
    if (after.score > s.score) return true;
  }
  return false;
}

test.describe('Balon Patlatma', () => {
  test('sayfa içeriği: ≥800 kelime, SSS ≥6, 3 reklam, reklam oyun kutusunun altında', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('h1')).toContainText('Balon Patlatma');
    await expect(page).toHaveTitle(/Balon Patlatma Oyna/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/balon-patlatma/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');

    const text = (await page.locator('.ba-content').textContent()) || '';
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['oyun-balon-patlatma-a', 'oyun-balon-patlatma-b', 'oyun-balon-patlatma-c']);
    // Reklam A oyun kutusunun dışında ve altında olmalı
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const gameBox = (await page.locator('.game-box').boundingBox())!;
    const adA = (await page.locator('[data-slot="oyun-balon-patlatma-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(gameBox.y + gameBox.height + 32);

    // JSON-LD geçerli, SSS sayısı ≥ 6
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = JSON.parse(ld!)['@graph'];
    expect(graph.find((n: any) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(graph.find((n: any) => n['@type'] === 'VideoGame').applicationCategory).toBe('Game');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başlat → balonlar çıkar, balona tıklayınca skor artar, süre bitince sonuç ve en yüksek skor yazılır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Başlamadan önce balon yok
    expect((await info(page)).balloons.length).toBe(0);
    await expect(page.locator('#overlay')).toBeVisible();
    await page.locator('#ov-primary').click();
    await expect(page.locator('#overlay')).toBeHidden();
    await expect.poll(async () => (await info(page)).state).toBe('playing');
    expect((await info(page)).balloons.length).toBeGreaterThan(0);

    // Canvas gerçekten çiziliyor mu: tuvalde tek renkli olmayan pikseller var
    const distinct = await page.evaluate(() => {
      const c = document.getElementById('game-canvas') as HTMLCanvasElement;
      const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
      const seen = new Set<number>();
      for (let i = 0; i < d.length; i += 4 * 97) seen.add((d[i] << 16) | (d[i + 1] << 8) | d[i + 2]);
      return seen.size;
    });
    expect(distinct).toBeGreaterThan(10);

    // Test kancasıyla bir balonun koordinatına tıkla
    expect(await popOne(page)).toBe(true);
    const afterPop = await info(page);
    expect(afterPop.score).toBeGreaterThanOrEqual(10);
    await expect.poll(async () => Number(await page.locator('#hud-score').textContent())).toBeGreaterThanOrEqual(10);
    expect(afterPop.combo).toBeGreaterThanOrEqual(1);

    // Süreyi kısalt → süre dolunca sonuç ekranı
    await page.evaluate(() => (window as any).__balonTest.shorten(0.2));
    await expect(page.locator('#ov-title')).toHaveText('Süre doldu!');
    await expect(page.locator('#overlay')).toBeVisible();
    const finalScore = (await info(page)).score;
    await expect(page.locator('#ov-text')).toContainText(`Skorun ${finalScore}`);
    expect((await info(page)).state).toBe('over');

    // en yüksek skor localStorage'a yazıldı
    const stored = await page.evaluate((k) => localStorage.getItem(k), BEST_TIMED);
    expect(Number(stored)).toBe(finalScore);
    await expect(page.locator('#hud-best')).toHaveText(String(finalScore));

    // Tekrar oyna → yeni tur, skor sıfırlanır
    await page.locator('#ov-primary').click();
    await expect.poll(async () => (await info(page)).state).toBe('playing');
    expect((await info(page)).score).toBe(0);
    expect((await info(page)).timeLeft).toBeGreaterThan(55);
    // Rekor korunur
    await expect(page.locator('#hud-best')).toHaveText(String(finalScore));

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('duraklat: balonlar durur, devam edince hareket eder; P tuşu da çalışır', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#ov-primary').click();
    await expect.poll(async () => (await info(page)).balloons.length).toBeGreaterThan(0);

    await page.locator('#btn-pause').click();
    await expect(page.locator('#ov-title')).toHaveText('Duraklatıldı');
    await expect(page.locator('#btn-pause')).toHaveText('Devam et');
    const before = await info(page);
    await page.waitForTimeout(400);
    const during = await info(page);
    expect(during.state).toBe('paused');
    expect(during.timeLeft).toBe(before.timeLeft);
    expect(during.balloons.map((b) => b.y)).toEqual(before.balloons.map((b) => b.y));

    await page.locator('#ov-primary').click();
    await expect.poll(async () => (await info(page)).state).toBe('playing');
    await expect.poll(async () => (await info(page)).timeLeft).toBeLessThan(before.timeLeft);

    // P tuşu ile duraklat / devam
    await page.keyboard.press('p');
    expect((await info(page)).state).toBe('paused');
    await page.keyboard.press('p');
    expect((await info(page)).state).toBe('playing');
  });

  test('sakin mod: süre ve bomba yok, Bitir ile sonuç, ayrı en yüksek skor', async ({ page }) => {
    await page.goto(URL);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.locator('#mode-calm').click();
    await expect(page.locator('#mode-calm')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#hud-time')).toHaveText('Sakin');
    await page.locator('#ov-primary').click();
    await expect.poll(async () => (await info(page)).state).toBe('playing');
    // Mod düğmeleri oyun sırasında kilitli
    await expect(page.locator('#mode-timed')).toBeDisabled();

    expect(await popOne(page)).toBe(true);
    // Birkaç saniye bekle: süre azalmaz, oyun kendiliğinden bitmez, bomba çıkmaz
    const types = new Set<string>();
    for (let i = 0; i < 6; i++) {
      (await info(page)).balloons.forEach((b) => types.add(b.type));
      await page.waitForTimeout(250);
    }
    expect([...types]).toEqual(['normal']);
    const s = await info(page);
    expect(s.state).toBe('playing');
    expect(s.timeLeft).toBe(60);

    await page.locator('#btn-finish').click();
    await expect(page.locator('#ov-title')).toHaveText('Oyun bitti');
    const calmBest = await page.evaluate((k) => localStorage.getItem(k), BEST_CALM);
    expect(Number(calmBest)).toBe((await info(page)).score);
    // Süreli mod rekoru dokunulmadan kalır
    expect(await page.evaluate((k) => localStorage.getItem(k), BEST_TIMED)).toBeNull();
  });

  test('klavye: Tab ile odak, ok tuşlarıyla nişangâh hareket eder, Enter hata vermez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await page.locator('#ov-primary').click();
    await expect.poll(async () => (await info(page)).state).toBe('playing');
    await page.locator('#game-canvas').focus();
    const k0 = (await info(page)).kb;
    expect(k0.active).toBe(false);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowUp');
    const k1 = (await info(page)).kb;
    expect(k1.active).toBe(true);
    expect(k1.x).toBe(k0.x + 36);
    expect(k1.y).toBe(k0.y - 18);
    await page.keyboard.press('Enter');
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, oyun alanı sığar ve oynanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = (await page.locator('#game-canvas').boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(360);
    expect(box.width).toBeGreaterThan(250);
    // Kontrol düğmeleri ekran dışına taşmıyor
    for (const sel of ['#mode-timed', '#mode-calm', '#btn-pause', '#btn-full', '#ov-primary']) {
      const b = await page.locator(sel).boundingBox();
      if (b) { expect(b.x).toBeGreaterThanOrEqual(0); expect(b.x + b.width).toBeLessThanOrEqual(360); }
    }
    await page.locator('#ov-primary').click();
    expect(await popOne(page)).toBe(true);
    expect(external).toEqual([]);
  });
});
