import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Düşen Bloklar: başlatma, düşme, kaydırma, döndürme, sert düşürme, tutma, duraklatma, oyun sonu,
// en yüksek skor (localStorage), dokunmatik düğmeler, motor kuralları, mobil taşma, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/blok-dusurme/?seed=7';
const HIGH_KEY = 'ba-oyun-blok-dusurme-en-yuksek';

const cv = (page: Page) => page.locator('#bd-canvas');
const num = async (page: Page, attr: string) => Number(await cv(page).getAttribute(`data-${attr}`));

async function startGame(page: Page) {
  await page.locator('#bd-ov-btn').click();
  await expect(cv(page)).toHaveAttribute('data-state', 'playing');
}

/** Hep aynı sütunlara sert düşürerek yığını tavana ulaştırır (satır dolmaz, oyun kesin biter). */
async function fillUntilOver(page: Page) {
  for (let i = 0; i < 12; i++) {
    if ((await cv(page).getAttribute('data-state')) === 'over') return;
    for (let j = 0; j < 5; j++) await page.keyboard.press(' ');
  }
}

test.describe('Oyun: blok-dusurme', () => {
  test('sayfa açılır, başlat ekranı görünür, 3 reklam ve 800+ kelime var, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(cv(page)).toBeVisible();
    await expect(cv(page)).toHaveAttribute('data-state', 'idle');
    await expect(page.locator('#bd-overlay')).toBeVisible();
    await expect(page.locator('#bd-ov-btn')).toHaveText('Başlat');
    expect(await page.locator('.ba-ad').count()).toBe(3);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-blok-dusurme-a', 'oyun-blok-dusurme-b', 'oyun-blok-dusurme-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    // Marka adı kullanılmaz (gizli dize: kaynakta da geçmesin diye parçalı yazıldı)
    expect(text.toLowerCase()).not.toContain(['tet', 'ris'].join(''));
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('oyun başlar ve parça kendiliğinden aşağı düşer', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    await expect(page.locator('#bd-overlay')).toBeHidden();
    expect(await cv(page).getAttribute('data-type')).toMatch(/^[IOTSZJL]$/);
    const y0 = await num(page, 'y');
    expect(y0).toBeLessThanOrEqual(0);
    await expect.poll(() => num(page, 'y'), { timeout: 5000 }).toBeGreaterThan(y0);
    await expect(page.locator('#bd-next')).toBeVisible();
  });

  test('sol/sağ ok tuşları kaydırır, aşağı ok yumuşak düşürür ve puan verir', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    const x0 = await num(page, 'x');
    await page.keyboard.press('ArrowLeft');
    expect(await num(page, 'x')).toBe(x0 - 1);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    expect(await num(page, 'x')).toBe(x0 + 1);
    const y0 = await num(page, 'y');
    const s0 = await num(page, 'score');
    await page.keyboard.press('ArrowDown');
    expect(await num(page, 'y')).toBeGreaterThanOrEqual(y0 + 1);
    expect(await num(page, 'score')).toBe(s0 + 1);
    await expect(page.locator('#bd-score')).toHaveText(String(s0 + 1));
  });

  test('yukarı ok parçayı döndürür (kare hariç); Z ters yöne döndürür', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    const type = await cv(page).getAttribute('data-type');
    await page.keyboard.press('ArrowUp');
    expect(await cv(page).getAttribute('data-rot')).toBe(type === 'O' ? '0' : '1');
    await page.keyboard.press('z');
    expect(await cv(page).getAttribute('data-rot')).toBe('0');
    await page.keyboard.press('z');
    expect(await cv(page).getAttribute('data-rot')).toBe(type === 'O' ? '0' : '3');
  });

  test('sert düşürme parçayı tabana yerleştirir, satır yerleşir, skor ve en yüksek skor yazılır', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    expect(await num(page, 'filled')).toBe(0);
    await page.keyboard.press(' ');
    await expect(cv(page)).toHaveAttribute('data-filled', '4');
    expect(await num(page, 'bottom')).toBeGreaterThanOrEqual(1);
    // Yeni parça tepeden başlar
    expect(await num(page, 'y')).toBeLessThanOrEqual(1);
    expect(await num(page, 'score')).toBeGreaterThan(0);
    const high = await page.evaluate((k) => localStorage.getItem(k), HIGH_KEY);
    expect(Number(high)).toBe(await num(page, 'score'));
    await expect(page.locator('#bd-high')).toHaveText(String(high));
    // İkinci sert düşürme üst üste biner: dolu hücre 8 olur
    await page.keyboard.press(' ');
    await expect(cv(page)).toHaveAttribute('data-filled', '8');
  });

  test('tutma: C parçayı saklar, aynı parçada ikinci kez çalışmaz', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    const first = await cv(page).getAttribute('data-type');
    const next = (await cv(page).getAttribute('data-next'))![0];
    await page.keyboard.press('c');
    await expect(cv(page)).toHaveAttribute('data-hold', first!);
    // Tutma boşsa sıradaki parça gelir
    await expect(cv(page)).toHaveAttribute('data-type', next);
    await page.keyboard.press('c'); // bu parça için hak bitti
    await expect(cv(page)).toHaveAttribute('data-type', next);
    await expect(cv(page)).toHaveAttribute('data-hold', first!);
    // Sert düşürünce hak yenilenir: tutulan parça geri gelir
    await page.keyboard.press(' ');
    await page.keyboard.press('c');
    await expect(cv(page)).toHaveAttribute('data-type', first!);
  });

  test('duraklatma: P ve düğme oyunu durdurur, parça yerinde kalır, devam eder', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    await page.keyboard.press('p');
    await expect(cv(page)).toHaveAttribute('data-state', 'paused');
    await expect(page.locator('#bd-ov-title')).toHaveText('Duraklatıldı');
    const y = await num(page, 'y');
    await page.waitForTimeout(1300);
    expect(await num(page, 'y')).toBe(y);
    // Duraklıyken tuşlar hareket ettirmez
    const x = await num(page, 'x');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowDown');
    expect(await num(page, 'x')).toBe(x);
    expect(await num(page, 'y')).toBe(y);
    expect(await num(page, 'score')).toBe(0);
    await page.locator('#bd-ov-btn').click();
    await expect(cv(page)).toHaveAttribute('data-state', 'playing');
    // Düğme ile de çalışır
    await page.locator('#bd-pause').click();
    await expect(cv(page)).toHaveAttribute('data-state', 'paused');
    await page.locator('#bd-pause').click();
    await expect(cv(page)).toHaveAttribute('data-state', 'playing');
  });

  test('oyun sonu: parçalar tavana ulaşınca oyun biter, rekor saklanır, tekrar oyna sıfırlar', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    await fillUntilOver(page);
    await expect(cv(page)).toHaveAttribute('data-state', 'over');
    await expect(page.locator('#bd-ov-title')).toHaveText('Oyun bitti');
    await expect(page.locator('#bd-ov-text')).toContainText('Skor:');
    await expect(page.locator('#bd-ov-text')).toContainText('Yeni rekor');
    const stored = Number(await page.evaluate((k) => localStorage.getItem(k), HIGH_KEY));
    expect(stored).toBeGreaterThan(0);
    // Oyun bitince tuşlar etkisizdir; Boşluğa basmaya devam etmek oyunu yanlışlıkla yeniden başlatmaz
    const filled = await num(page, 'filled');
    await page.keyboard.press(' ');
    await page.keyboard.press('ArrowLeft');
    await expect(cv(page)).toHaveAttribute('data-state', 'over');
    expect(await num(page, 'filled')).toBe(filled);
    await page.locator('#bd-ov-btn').click();
    await expect(cv(page)).toHaveAttribute('data-state', 'playing');
    expect(await num(page, 'filled')).toBe(0);
    expect(await num(page, 'score')).toBe(0);
    // En yüksek skor yeni oyunda korunur
    await expect(page.locator('#bd-high')).toHaveText(String(stored));
  });

  test('oyun sonunda Enter tuşu yeni oyun başlatır', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    await fillUntilOver(page);
    await expect(cv(page)).toHaveAttribute('data-state', 'over');
    await page.keyboard.press('Enter');
    await expect(cv(page)).toHaveAttribute('data-state', 'playing');
    expect(await num(page, 'filled')).toBe(0);
  });

  test('kayıtlı en yüksek skor sayfa açılınca gösterilir ve düşük skor onu ezmez', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '987654'), HIGH_KEY);
    await page.goto(URL_PATH);
    await expect(page.locator('#bd-high')).toHaveText('987654');
    await startGame(page);
    await page.keyboard.press(' ');
    expect(await page.evaluate((k) => localStorage.getItem(k), HIGH_KEY)).toBe('987654');
  });

  test('fare ile kaydırma ve dokunma: yana kaydır, dokununca döndür, hızlı aşağı çekince bırak', async ({ page }) => {
    await page.goto(URL_PATH);
    await startGame(page);
    const box = (await cv(page).boundingBox())!;
    const px = box.width / 10;
    const x0 = await num(page, 'x');
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 3;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + px * 1.2, cy, { steps: 4 });
    await page.mouse.move(cx + px * 2.2, cy, { steps: 4 });
    await page.mouse.up();
    expect(await num(page, 'x')).toBe(x0 + 2);
    // Kısa dokunuş döndürür
    const type = await cv(page).getAttribute('data-type');
    await page.mouse.click(cx, cy);
    expect(await cv(page).getAttribute('data-rot')).toBe(type === 'O' ? '0' : '1');
    // Hızlı aşağı fırlatma sert düşürür. Hız eşiği gerçek zamana bağlı olduğundan, yük altında
    // kararsız olmasın diye dokunma olayları sayfa içinde art arda (aynı anda) gönderilir.
    await page.evaluate(({ x, y0, y1 }) => {
      const el = document.getElementById('bd-canvas')!;
      const ev = (type: string, y: number) => el.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: 'touch', clientX: x, clientY: y, bubbles: true }));
      ev('pointerdown', y0); ev('pointermove', y1); ev('pointerup', y1);
    }, { x: cx, y0: box.y + 20, y1: box.y + 20 + px * 5 });
    await expect(cv(page)).toHaveAttribute('data-filled', '4');
  });

  test('motor: satır silme, puan, seviye, hız, duvar tekmesi ve gölge doğru çalışır', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const E = await import('/oyunlar/blok-dusurme/engine.js');
      // Dört dolu satır + çubukla dörtlü silme
      const board = E.createBoard();
      for (let row = 16; row < 20; row++) for (let c = 1; c < 10; c++) board[row][c] = 'O';
      let p = E.spawn('I');
      p = E.tryRotate(board, p, 1)!; // dikey çubuk
      p = { ...p, x: -2 }; // dikey sütun 0. sütuna gelir (matriste 2. sütun)
      const landed = E.dropped(board, p);
      const out = E.lockPiece(board, landed);
      const cleared = E.clearLines(board);
      // Duvar tekmesi: sol duvara yaslı dikey çubuk döndürülebilir
      const empty = E.createBoard();
      let v = E.tryRotate(empty, E.spawn('I'), 1)!;
      v = { ...v, x: -2 };
      const kicked = E.tryRotate(empty, v, 1);
      // Gölge: boş tahtada O parçası en alta iner
      const g = E.dropped(empty, E.spawn('O'));
      const ghostBottom = Math.max(...E.cellsOf(g).map((c: number[]) => c[1]));
      // 7'li torba: ilk 14 parçada her tür tam 2 kez
      const next = E.createBag(E.mulberry32(5));
      const seq = Array.from({ length: 14 }, () => next());
      const counts = E.TYPES.map((t: string) => seq.filter((s: string) => s === t).length);
      // Dört kez döndürünce başa dönülür
      let j = E.spawn('J');
      const original = JSON.stringify(j.m);
      for (let i = 0; i < 4; i++) j = E.tryRotate(empty, j, 1)!;
      return {
        out, cleared, boardEmpty: E.filledCount(board) === 0,
        s1: E.scoreFor(1, 1), s2: E.scoreFor(2, 1), s3: E.scoreFor(3, 1), s4: E.scoreFor(4, 1), s4l3: E.scoreFor(4, 3),
        lvl: [E.levelFor(0), E.levelFor(9), E.levelFor(10), E.levelFor(25)],
        faster: E.dropInterval(1) > E.dropInterval(2) && E.dropInterval(2) > E.dropInterval(5),
        minInterval: E.dropInterval(99),
        kickedOk: !!kicked && E.cellsOf(kicked).every((c: number[]) => c[0] >= 0 && c[0] < 10),
        ghostBottom, counts,
        cycle: JSON.stringify(j.m) === original && j.rot === 0,
        size: [E.COLS, E.ROWS],
      };
    });
    expect(r.out).toBe(false);
    expect(r.cleared).toBe(4);
    expect(r.boardEmpty).toBe(true);
    expect([r.s1, r.s2, r.s3, r.s4]).toEqual([100, 300, 500, 800]);
    expect(r.s4l3).toBe(2400);
    expect(r.lvl).toEqual([1, 1, 2, 3]);
    expect(r.faster).toBe(true);
    expect(r.minInterval).toBeGreaterThanOrEqual(50);
    expect(r.kickedOk).toBe(true);
    expect(r.ghostBottom).toBe(19);
    expect(r.counts).toEqual([2, 2, 2, 2, 2, 2, 2]);
    expect(r.cycle).toBe(true);
    expect(r.size).toEqual([10, 20]);
  });

  test('360px: oyun alanı ve ekran düğmeleri sığar, yatay taşma yok, düğmelerle oynanır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const stage = (await cv(page).boundingBox())!;
    expect(stage.width).toBeGreaterThanOrEqual(150);
    expect(Math.abs(stage.height - stage.width * 2)).toBeLessThanOrEqual(4);
    expect(stage.x + stage.width).toBeLessThanOrEqual(360);
    // Dar ekranda ekran düğmeleri görünür
    await expect(page.locator('.bd-touch')).toBeVisible();
    expect(await page.locator('.bd-touch button').count()).toBe(6);
    await startGame(page);
    const x0 = await num(page, 'x');
    await page.locator('[data-act="left"]').click();
    expect(await num(page, 'x')).toBe(x0 - 1);
    await page.locator('[data-act="right"]').click();
    expect(await num(page, 'x')).toBe(x0);
    const type = await cv(page).getAttribute('data-type');
    await page.locator('[data-act="rotate"]').click();
    expect(await cv(page).getAttribute('data-rot')).toBe(type === 'O' ? '0' : '1');
    await page.locator('[data-act="hold"]').click();
    await expect(cv(page)).toHaveAttribute('data-hold', type!);
    await page.locator('[data-act="drop"]').click();
    await expect(cv(page)).toHaveAttribute('data-filled', '4');
    expect(errors).toEqual([]);
  });

  test('masaüstünde ekran düğmeleri gizlidir', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(URL_PATH);
    await expect(page.locator('.bd-touch')).toBeHidden();
  });
});
