import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/oyunlar/labirent/';
const bestKey = (n: number) => `ba-oyun-labirent-en-iyi-${n}`;

type Info = {
  n: number; open: number[]; px: number; py: number; moves: number; state: string;
  showSolution: boolean; usedHint: boolean; dark: boolean; goal: number; path: number[];
};
const info = (page: Page) => page.evaluate(() => (window as any).__labirentTest() as Info);
const pixel = (page: Page, idx: number) => page.evaluate((i) => (window as any).__labirentTest.pixel(i) as number[], idx);

// Geçit bitleri: 1=K(yukarı) 2=D(sağ) 4=G(aşağı) 8=B(sol)
const STEPS = [
  { bit: 1, dx: 0, dy: -1 }, { bit: 2, dx: 1, dy: 0 }, { bit: 4, dx: 0, dy: 1 }, { bit: 8, dx: -1, dy: 0 },
];

/** Testin kendi BFS'i: from → to en kısa yol (hücre dizisi) ya da null. */
function bfs(open: number[], n: number, from: number, to: number): number[] | null {
  const prev = new Array(n * n).fill(-1);
  prev[from] = from;
  const q = [from];
  for (let h = 0; h < q.length; h++) {
    const c = q[h];
    const x = c % n, y = Math.floor(c / n);
    for (const s of STEPS) {
      if (!(open[c] & s.bit)) continue;
      const ni = (y + s.dy) * n + (x + s.dx);
      if (prev[ni] === -1) { prev[ni] = c; q.push(ni); }
    }
  }
  if (prev[to] === -1) return null;
  const path: number[] = [];
  for (let c = to; ; c = prev[c]) { path.push(c); if (c === from) break; }
  return path.reverse();
}

function keyFor(from: number, to: number, n: number): string {
  const d = to - from;
  if (d === -n) return 'ArrowUp';
  if (d === n) return 'ArrowDown';
  if (d === 1) return 'ArrowRight';
  if (d === -1) return 'ArrowLeft';
  throw new Error('komşu olmayan hücreler');
}

/** Labirenti klavyeyle BFS yolunu izleyerek çözer. */
async function solveWithKeys(page: Page) {
  const s = await info(page);
  const path = bfs(s.open, s.n, s.py * s.n + s.px, s.goal)!;
  for (let i = 1; i < path.length; i++) await page.keyboard.press(keyFor(path[i - 1], path[i], s.n));
}

test.describe('Labirent Oyunu', () => {
  test('sayfa içeriği: ≥800 kelime, SSS ≥6, 3 reklam, reklam oyun kutusunun altında', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('h1')).toContainText('Labirent Oyunu');
    await expect(page).toHaveTitle(/Labirent Oyunu Oyna/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/labirent/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');

    const text = (await page.locator('.ba-content').textContent()) || '';
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['oyun-labirent-a', 'oyun-labirent-b', 'oyun-labirent-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const gameBox = (await page.locator('.game-box').boundingBox())!;
    const adA = (await page.locator('[data-slot="oyun-labirent-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(gameBox.y + gameBox.height + 32);

    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = JSON.parse(ld!)['@graph'];
    expect(graph.find((n: any) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(graph.find((n: any) => n['@type'] === 'VideoGame').applicationCategory).toBe('Game');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('her boyutta üretilen labirent çözülebilir ve mükemmeldir (BFS ile doğrulama)', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    for (const n of [10, 20, 30]) {
      await page.locator(`#size-${n}`).click();
      await expect(page.locator(`#size-${n}`)).toHaveAttribute('aria-pressed', 'true');
      for (let round = 0; round < 4; round++) {
        if (round > 0) await page.locator('#btn-new').click();
        const s = await info(page);
        expect(s.n).toBe(n);
        expect(s.open.length).toBe(n * n);
        // başlangıçtan hedefe yol var
        const path = bfs(s.open, n, 0, n * n - 1);
        expect(path, `${n}×${n} labirent çözülebilir olmalı`).not.toBeNull();
        expect(path!.length).toBeGreaterThanOrEqual(2 * (n - 1) + 1);
        // her hücreye ulaşılabilir (tek BFS taraması)
        const seen = new Set<number>([0]);
        const queue = [0];
        for (let h = 0; h < queue.length; h++) {
          const c = queue[h];
          const x = c % n, y = Math.floor(c / n);
          for (const st of STEPS) {
            if (!(s.open[c] & st.bit)) continue;
            const ni = (y + st.dy) * n + (x + st.dx);
            if (!seen.has(ni)) { seen.add(ni); queue.push(ni); }
          }
        }
        expect(seen.size).toBe(n * n);
        // geçit sayısı n²−1 (döngüsüz, mükemmel labirent); geçitler iki taraflı, dış duvar kapalı
        let passages = 0;
        let violations = 0;
        for (let c = 0; c < n * n; c++) {
          const x = c % n, y = Math.floor(c / n);
          for (const st of STEPS) {
            const isOpen = (s.open[c] & st.bit) !== 0;
            const nx = x + st.dx, ny = y + st.dy;
            if (nx < 0 || ny < 0 || nx >= n || ny >= n) { if (isOpen) violations++; continue; }
            const back = STEPS.find((b) => b.dx === -st.dx && b.dy === -st.dy)!;
            if (((s.open[ny * n + nx] & back.bit) !== 0) !== isOpen) violations++;
            if (isOpen) passages++;
          }
        }
        expect(violations, 'geçitler iki taraflı olmalı, dış duvar kapalı olmalı').toBe(0);
        expect(passages / 2).toBe(n * n - 1);
      }
    }
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ok tuşu ve WASD ile hareket; duvara çarpmak hamle saymaz', async ({ page }) => {
    await page.goto(URL);
    const s0 = await info(page);
    expect([s0.px, s0.py, s0.moves, s0.state]).toEqual([0, 0, 0, 'ready']);
    // Sol üstte sola ve yukarıya hareket duvardır
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('a');
    expect((await info(page)).moves).toBe(0);
    expect((await info(page)).state).toBe('ready');

    // BFS yolunun ilk adımını ok tuşuyla at
    const path = bfs(s0.open, s0.n, 0, s0.goal)!;
    await page.keyboard.press(keyFor(path[0], path[1], s0.n));
    const s1 = await info(page);
    expect(s1.py * s1.n + s1.px).toBe(path[1]);
    expect(s1.moves).toBe(1);
    expect(s1.state).toBe('playing');
    await expect(page.locator('#hud-moves')).toHaveText('1');
    // Süre işlemeye başladı
    await expect.poll(async () => await page.locator('#hud-time').textContent()).not.toBe('0,0 sn');

    // Geri dönüş WASD ile: W/A/S/D eşlemesi
    const wasd: Record<string, string> = { ArrowUp: 's', ArrowDown: 'w', ArrowRight: 'a', ArrowLeft: 'd' };
    await page.keyboard.press(wasd[keyFor(path[0], path[1], s0.n)]);
    const s2 = await info(page);
    expect(s2.py * s2.n + s2.px).toBe(0);
    expect(s2.moves).toBe(2);
  });

  test('labirenti klavyeyle çöz: kazanma ekranı, en iyi süre localStorage’a yazılır, yeni labirent', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('#hud-best')).toHaveText('yok');
    await expect(page.locator('#overlay')).toBeHidden();

    await solveWithKeys(page);
    const won = await info(page);
    expect(won.state).toBe('won');
    expect(won.px + won.py * won.n).toBe(won.goal);
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#ov-title')).toContainText('çıkışı buldun');
    await expect(page.locator('#ov-text')).toContainText(`hamle: ${won.moves}`);
    const stored = await page.evaluate((k) => localStorage.getItem(k), bestKey(10));
    expect(Number(stored)).toBeGreaterThan(0);
    await expect(page.locator('#hud-best')).not.toHaveText('yok');
    // Kazandıktan sonra hareket etmez
    await page.keyboard.press('ArrowLeft');
    expect((await info(page)).moves).toBe(won.moves);

    // Yeni labirent: sıfırlanır
    await page.locator('#ov-primary').click();
    await expect(page.locator('#overlay')).toBeHidden();
    const fresh = await info(page);
    expect([fresh.px, fresh.py, fresh.moves, fresh.state]).toEqual([0, 0, 0, 'ready']);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('çözümü göster: BFS yolu çizilir, gizlenir; çözüm gösterilen tur rekora yazılmaz', async ({ page }) => {
    await page.goto(URL);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    const s0 = await info(page);
    expect(s0.showSolution).toBe(false);
    expect(s0.path).toEqual([]);
    const expected = bfs(s0.open, s0.n, 0, s0.goal)!;
    const mid = expected[Math.floor(expected.length / 2)];
    const before = await pixel(page, mid);

    await page.locator('#btn-solve').click();
    await expect(page.locator('#btn-solve')).toHaveText('Çözümü gizle');
    const s1 = await info(page);
    expect(s1.showSolution).toBe(true);
    expect(s1.path).toEqual(expected);
    // Tuvalde yol çizildi: orta hücre merkezinin rengi değişti ve turuncu tonda
    await expect.poll(async () => (await pixel(page, mid)).join(',')).not.toBe(before.join(','));
    const [r, g, b] = await pixel(page, mid);
    expect(r).toBeGreaterThan(200);
    expect(g).toBeGreaterThan(120);
    expect(b).toBeLessThan(120);

    // Bir adım ilerleyince yol topun yeni konumundan yeniden hesaplanır
    await page.keyboard.press(keyFor(expected[0], expected[1], s0.n));
    const s2 = await info(page);
    expect(s2.path).toEqual(expected.slice(1));

    // Gizle
    await page.locator('#btn-solve').click();
    await expect(page.locator('#btn-solve')).toHaveText('Çözümü göster');
    expect((await info(page)).path).toEqual([]);
    expect((await info(page)).usedHint).toBe(true);

    // Bitir → rekor yazılmaz
    await solveWithKeys(page);
    expect((await info(page)).state).toBe('won');
    await expect(page.locator('#ov-text')).toContainText('en iyi süreye yazılmadı');
    expect(await page.evaluate((k) => localStorage.getItem(k), bestKey(10))).toBeNull();
  });

  test('karanlık mod: yalnızca yakın çevre görünür', async ({ page }) => {
    await page.goto(URL);
    const s = await info(page);
    // Hedef hücre (yıldız) normalde turuncu-sarı
    const [r0, g0] = await pixel(page, s.goal);
    expect(r0).toBeGreaterThan(200);
    expect(g0).toBeGreaterThan(120);

    await page.locator('#btn-dark').click();
    await expect(page.locator('#btn-dark')).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(async () => (await pixel(page, s.goal)).reduce((a, b) => a + b, 0)).toBeLessThan(90);
    // Topun bulunduğu hücre çevresi görünür kalır: başlangıç hücresi karanlık değil
    const near = await pixel(page, 1);
    expect(near.reduce((a, b) => a + b, 0)).toBeGreaterThan(300);

    await page.locator('#btn-dark').click();
    await expect(page.locator('#btn-dark')).toHaveAttribute('aria-pressed', 'false');
    await expect.poll(async () => (await pixel(page, s.goal))[0]).toBeGreaterThan(200);
  });

  test('yazdırılabilir labirent: görsel üretilir, yazdırma çağrılır, yazdırma görünümünde yalnızca sayfa kalır', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL);
    await page.evaluate(() => {
      (window as any).__printed = 0;
      window.print = () => { (window as any).__printed++; };
    });
    await page.locator('#btn-print').click();
    await expect.poll(() => page.evaluate(() => (window as any).__printed)).toBe(1);
    expect(await page.locator('#print-sheet img').count()).toBe(1);
    const src = await page.locator('#print-sheet img').first().getAttribute('src');
    expect(src!.startsWith('data:image/png;base64,')).toBe(true);
    expect(await page.locator('#print-sheet img').first().evaluate((i: HTMLImageElement) => i.naturalWidth)).toBe(1200);
    await expect(page.locator('#print-sheet h2').first()).toContainText('Labirent 10×10');

    // Çözüm sayfası da seçilince iki sayfa
    await page.locator('#chk-print-solution').check();
    await page.locator('#btn-print').click();
    await expect.poll(() => page.evaluate(() => (window as any).__printed)).toBe(2);
    expect(await page.locator('#print-sheet .ps-page').count()).toBe(2);
    await expect(page.locator('#print-sheet h2').nth(1)).toContainText('Çözüm');
    const [a, b] = await page.locator('#print-sheet img').evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).src));
    expect(a).not.toBe(b);

    // Yazdırma ortamı: oyun ve menü gizlenir, yalnızca yazdırma sayfası görünür
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#print-sheet')).toBeVisible();
    await expect(page.locator('main')).toBeHidden();
    await expect(page.locator('.ba-topbar')).toBeHidden();
    await page.emulateMedia({ media: 'screen' });
    await expect(page.locator('#print-sheet')).toBeHidden();
    expect(external).toEqual([]);
  });

  test('360px: taşma yok, ekran okları görünür ve çalışır, kaydırma hareketi çalışır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    const cv = (await page.locator('#game-canvas').boundingBox())!;
    expect(cv.x).toBeGreaterThanOrEqual(0);
    expect(cv.x + cv.width).toBeLessThanOrEqual(360);
    expect(Math.abs(cv.width - cv.height)).toBeLessThan(2);
    await expect(page.locator('.lb-dpad')).toBeVisible();
    for (const id of ['size-10', 'size-30', 'btn-new', 'btn-dark', 'btn-print', 'dp-up', 'dp-right']) {
      const b = (await page.locator(`#${id}`).boundingBox())!;
      expect(b.x).toBeGreaterThanOrEqual(0);
      expect(b.x + b.width).toBeLessThanOrEqual(360);
    }

    // Ekran oku: BFS yolunun ilk adımı yönünde düğmeye bas
    const s0 = await info(page);
    const path = bfs(s0.open, s0.n, 0, s0.goal)!;
    const btnFor: Record<string, string> = { ArrowUp: 'dp-up', ArrowDown: 'dp-down', ArrowRight: 'dp-right', ArrowLeft: 'dp-left' };
    await page.locator(`#${btnFor[keyFor(path[0], path[1], s0.n)]}`).click();
    const s1 = await info(page);
    expect(s1.py * s1.n + s1.px).toBe(path[1]);
    expect(s1.moves).toBe(1);

    // Kaydırma: yeni labirent, ilk adım yönünde sürükle
    await page.locator('#btn-new').click();
    const s2 = await info(page);
    const p2 = bfs(s2.open, s2.n, 0, s2.goal)!;
    const k = keyFor(p2[0], p2[1], s2.n);
    const dx = k === 'ArrowRight' ? 70 : k === 'ArrowLeft' ? -70 : 0;
    const dy = k === 'ArrowDown' ? 70 : k === 'ArrowUp' ? -70 : 0;
    await page.locator('#game-canvas').scrollIntoViewIfNeeded();
    const box = (await page.locator('#game-canvas').boundingBox())!;
    const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + dx / 2, cy + dy / 2, { steps: 4 });
    await page.mouse.move(cx + dx, cy + dy, { steps: 4 });
    await page.mouse.up();
    const s3 = await info(page);
    expect(s3.moves).toBeGreaterThanOrEqual(1);
    expect(s3.py * s3.n + s3.px).not.toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
});
