import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Uzay Savaşı: sayfa yapısı, gemi kontrolleri, ateş ve skor, can/oyun sonu, güçlendirme, dalga, patron, dokunma,
// hareket azaltma. Senaryolar window.__uzayTest kancasıyla (sabit adımlı, tohumlu) deterministik kurulur.
const URL_PATH = '/oyunlar/uzay-savasi/';
const STORE_KEY = 'ba-oyun-uzay-savasi';

type Snap = {
  state: string;
  score: number;
  best: number;
  lives: number;
  wave: number;
  kills: number;
  waveState: string;
  particlesEnabled: boolean;
  particles: number;
  ship: { x: number; y: number; invul: number; shield: boolean; doubleT: number; speedT: number };
  enemies: { x: number; y: number; hp: number; type: string }[];
  boss: { x: number; y: number; hp: number; maxHp: number } | null;
  bullets: { x: number; y: number }[];
  enemyBullets: { x: number; y: number; vx: number; vy: number }[];
  powerups: { x: number; y: number; type: string }[];
};

const stage = (page: Page) => page.locator('#stage');
const snap = (page: Page) => page.evaluate(() => (window as any).__uzayTest() as Snap);
const advance = (page: Page, seconds: number) => page.evaluate((s) => (window as any).__uzayTest.advance(s), seconds);

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}
async function startGame(page: Page, opts: { manual?: boolean; seed?: number } = {}) {
  // Manuel mod başlatmadan ÖNCE açılır: gerçek zamanlı kareler oyunu ilerletip senaryoyu bozmasın
  await page.evaluate((manual) => (window as any).__uzayTest.manual(manual), opts.manual ?? true);
  await page.locator('#btn-main').click();
  await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
  await page.evaluate((seed) => (window as any).__uzayTest.seed(seed), opts.seed ?? 1);
}

/**
 * Sayfa içi "oyuncu": her adımda kapsül varsa ona, yoksa patrona ya da en alttaki sıranın gemiye en yakın düşmanına
 * kayar ve 0,05 sn ilerletir. stop ifadesi (ör. "s.score > 0") doğru olunca durur. Ateş için Boşluk basılı tutulmalıdır.
 * dodge açıksa hedefin yakınında, düşman mermilerinin gemi hizasına varacağı yerlerden uzak bir nokta seçer (patron savaşı).
 */
async function hunt(page: Page, stop: string, maxSteps = 3000, dodge = false) {
  return page.evaluate(({ stop, maxSteps, dodge }) => {
    const T = (window as any).__uzayTest;
    const test = new Function('s', `return (${stop});`) as (s: unknown) => boolean;
    for (let i = 0; i < maxSteps; i++) {
      const s = T();
      if (test(s)) return { done: true, s };
      if (s.state !== 'oynuyor') return { done: false, s };
      let tx = s.ship.x;
      if (s.powerups.length) tx = s.powerups[0].x;
      else if (s.boss) tx = s.boss.x;
      else if (s.enemies.length) {
        const maxY = Math.max(...s.enemies.map((e: { y: number }) => e.y));
        const row = s.enemies.filter((e: { y: number }) => e.y > maxY - 5);
        row.sort((a: { x: number }, b: { x: number }) => Math.abs(a.x - s.ship.x) - Math.abs(b.x - s.ship.x));
        tx = row[0].x;
      }
      if (dodge) {
        // Aday noktalar arasından en az tehlikeli olanı seç: mermi gemi hizasına varınca x'i aday noktaya yakınsa ceza
        let bestX = s.ship.x;
        let bestCost = Infinity;
        for (let c = 18; c <= 402; c += 12) {
          let danger = 0;
          for (const b of s.enemyBullets) {
            if (b.vy <= 0 || b.y > s.ship.y + 20) continue;
            const t = Math.max(0, (s.ship.y - b.y) / b.vy);
            const xAt = b.x + b.vx * t;
            if (Math.abs(xAt - c) < 34) danger += 1 / (t + 0.15);
          }
          const cost = danger * 1000 + Math.abs(c - tx) * 0.5 + Math.abs(c - s.ship.x) * 0.1;
          if (cost < bestCost) { bestCost = cost; bestX = c; }
        }
        tx = bestX;
      }
      T.moveTo(tx);
      T.advance(0.05);
    }
    return { done: false, s: T() };
  }, { stop, maxSteps, dodge }) as Promise<{ done: boolean; s: Snap }>;
}

test.describe('Uzay Savaşı', () => {
  test('sayfa açılır; ≥900 kelime, 3 reklam (oyun kutusunun dışında), SSS ≥7 ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Uzay Savaşı');
    await expect(page).toHaveTitle(/Uzay Savaşı Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);
    await expect(page.locator('.ba-topbar')).toContainText(/%100 ücretsiz/);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-uzay-savasi-a', 'oyun-uzay-savasi-b', 'oyun-uzay-savasi-c']);
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

  test('başlat: 3 can, 1. dalga, 12 düşman yerine oturur; gemi ok tuşları ve A/D ile hareket eder, kenarlarda durur', async ({ page }) => {
    const errors = await open(page);
    await startGame(page);
    let s = await snap(page);
    expect(s.lives).toBe(3);
    expect(s.wave).toBe(1);
    expect(s.enemies).toHaveLength(12);
    expect(s.ship.x).toBeCloseTo(210, 0);
    await expect(page.locator('#lives')).toHaveText('♥♥♥');

    await page.keyboard.down('ArrowRight');
    await advance(page, 0.5);
    s = await snap(page);
    expect(s.ship.x).toBeGreaterThan(330); // 300 birim/sn * 0.5 sn
    await page.keyboard.up('ArrowRight');
    const x1 = s.ship.x;
    await advance(page, 0.3);
    expect((await snap(page)).ship.x).toBe(x1); // tuş bırakılınca gemi durur

    await page.keyboard.down('a');
    await advance(page, 3);
    expect((await snap(page)).ship.x).toBe(18); // sol kenarda durur
    await page.keyboard.up('a');
    await page.keyboard.down('d');
    await advance(page, 3);
    expect((await snap(page)).ship.x).toBe(402); // sağ kenarda durur
    await page.keyboard.up('d');
    expect(errors).toEqual([]);
  });

  test('gerçek zamanlı döngü: ok tuşu basılıyken gemi görünür biçimde kayar (DOM verisi)', async ({ page }) => {
    await open(page);
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    const x0 = Number(await stage(page).getAttribute('data-ship-x'));
    await page.keyboard.down('ArrowLeft');
    await expect.poll(async () => Number(await stage(page).getAttribute('data-ship-x'))).toBeLessThan(x0 - 40);
    await page.keyboard.up('ArrowLeft');
  });

  test('Boşluk basılı tutulunca otomatik ateş eder; mermi düşmanı vurunca skor artar, bırakınca ateş durur', async ({ page }) => {
    const errors = await open(page);
    await startGame(page);
    await page.keyboard.down('Space');
    await advance(page, 0.5);
    expect((await snap(page)).bullets.length).toBeGreaterThanOrEqual(2); // 0,2 sn aralıkla art arda
    const r = await hunt(page, 's.score > 0');
    expect(r.done, 'ilk vuruş').toBe(true);
    expect(r.s.score).toBeGreaterThanOrEqual(10);
    expect(r.s.kills).toBeGreaterThanOrEqual(1);
    expect(r.s.enemies.length).toBeLessThan(12);
    expect(r.s.particles, 'patlama parçacıkları').toBeGreaterThan(0);

    await page.keyboard.up('Space');
    await advance(page, 1.5);
    const after = await snap(page);
    expect(after.bullets).toHaveLength(0); // tuş bırakıldı: yeni mermi yok, eskiler ekrandan çıktı
    await expect(page.locator('#score')).toHaveText(String(after.score));
    expect(errors).toEqual([]);
  });

  test('P ile duraklatır, oyun donar; P ya da Boşluk ile devam eder', async ({ page }) => {
    await open(page);
    await startGame(page);
    await advance(page, 0.5);
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay')).toContainText('Duraklatıldı');
    const before = await snap(page);
    await advance(page, 2); // duraklatılmışken ilerlemez
    await page.waitForTimeout(300);
    expect(await snap(page)).toEqual(before);

    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await advance(page, 0.5);
    expect((await snap(page)).enemies[0].y).not.toBe(before.enemies[0].y);

    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
  });

  test('canlar bitince oyun sonu ekranı çıkar, rekor localStorage’a yazılır; yeniden oyna ve yenileme çalışır', async ({ page }) => {
    test.setTimeout(120_000);
    await open(page);
    await startGame(page, { seed: 3 });
    await page.keyboard.down('Space');
    const r = await hunt(page, 's.score >= 10');
    expect(r.done).toBe(true);
    await page.keyboard.up('Space');

    // Ateş etmeden bekle: düşman mermileri ve inen filo canları bitirir
    for (let i = 0; i < 100; i++) {
      await advance(page, 5);
      if ((await snap(page)).state === 'bitti') break;
    }
    const end = await snap(page);
    expect(end.state).toBe('bitti');
    expect(end.lives).toBe(0);
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#overlay-title')).toHaveText('Oyun bitti');
    await expect(page.locator('#overlay-text')).toContainText('Yeni rekor');
    const score = end.score;
    expect(score).toBeGreaterThanOrEqual(10);

    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best).toBe(score);
    await expect(page.locator('#best')).toHaveText(String(score));

    await page.locator('#overlay-btn').click(); // oyun sonu düğmesi kısa süre kilitli, Playwright etkinleşmesini bekler
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(stage(page)).toHaveAttribute('data-lives', '3');
    await expect(stage(page)).toHaveAttribute('data-wave', '1');
    await expect(page.locator('#score')).toHaveText('0');
    await expect(page.locator('#best')).toHaveText(String(score)); // rekor yeni oyunda da görünür

    await page.reload();
    await expect(page.locator('#best')).toHaveText(String(score));
  });

  test('güçlendirme: sekizinci düşman kapsül bırakır; yakalanınca ilgili etki başlar', async ({ page }) => {
    test.setTimeout(60_000);
    await open(page);
    await startGame(page, { seed: 5 });
    await page.keyboard.down('Space');
    const drop = await hunt(page, 's.powerups.length > 0');
    expect(drop.done, 'kapsül düştü').toBe(true);
    expect(drop.s.kills).toBeGreaterThanOrEqual(1);
    const type = drop.s.powerups[0].type;
    expect(['double', 'shield', 'speed']).toContain(type);
    const before = drop.s.score;
    await page.keyboard.up('Space'); // yeni öldürme/kapsül olmasın: yalnızca bu kapsülü yakala

    const got = await hunt(page, 's.powerups.length === 0');
    expect(got.done, 'kapsül yakalandı').toBe(true);
    expect(got.s.score).toBeGreaterThanOrEqual(before + 25);
    if (type === 'double') expect(got.s.ship.doubleT).toBeGreaterThan(0);
    if (type === 'shield') expect(got.s.ship.shield).toBe(true);
    if (type === 'speed') expect(got.s.ship.speedT).toBeGreaterThan(0);
    await expect(page.locator('#buff')).toBeVisible();
  });

  test('dalga temizlenince bonus eklenir ve 2. dalga daha kalabalık gelir', async ({ page }) => {
    test.setTimeout(90_000);
    await open(page);
    await startGame(page, { seed: 7 });
    await page.keyboard.down('Space');
    const r = await hunt(page, 's.wave === 2', 4000);
    await page.keyboard.up('Space');
    expect(r.done, '2. dalgaya geçildi').toBe(true);
    expect(r.s.score).toBeGreaterThanOrEqual(12 * 10 + 50); // 12 üçgen + dalga bonusu
    const s = await snap(page);
    expect(s.enemies).toHaveLength(18); // 3 satır x 6
    expect(s.enemies.some((e) => e.type === 'zigzag')).toBe(true);
    await expect(stage(page)).toHaveAttribute('data-wave', '2');
  });

  test('5. dalgada patron çıkar; vurulunca canı azalır, yenilince 500 puan ve kalkan kapsülü gelir', async ({ page }) => {
    test.setTimeout(90_000);
    await open(page);
    await page.evaluate(() => (window as any).__uzayTest.manual(true));
    await page.locator('#btn-main').click();
    await page.evaluate(() => {
      const T = (window as any).__uzayTest;
      T.startAtWave(5);
      T.seed(11);
    });
    let s = await snap(page);
    expect(s.wave).toBe(5);
    expect(s.score).toBe(0);
    expect(s.boss).not.toBeNull();
    expect(s.boss!.maxHp).toBe(36);
    expect(s.enemies).toHaveLength(0);
    await expect(stage(page)).toHaveAttribute('data-boss', '1');

    await page.keyboard.down('Space');
    const hit = await hunt(page, 's.boss && s.boss.hp < s.boss.maxHp', 3000, true);
    expect(hit.done, 'patron vuruldu').toBe(true);
    expect(hit.s.score).toBeGreaterThan(0);

    const dead = await hunt(page, '!s.boss', 4000, true);
    await page.keyboard.up('Space');
    expect(dead.done, 'patron yenildi').toBe(true);
    expect(dead.s.score).toBeGreaterThanOrEqual(500);
    expect(dead.s.powerups.some((p) => p.type === 'shield')).toBe(true);
    await expect(stage(page)).toHaveAttribute('data-boss', '0');
  });

  test('dokunmatik: sürükleme göreceli hareket ettirir, parmak ekrandayken otomatik ateş eder, bırakınca durur', async ({ page }) => {
    await open(page);
    await startGame(page);
    const box = (await stage(page).boundingBox())!;
    const x0 = (await snap(page)).ship.x;
    expect((await snap(page)).bullets).toHaveLength(0);

    const fire = (type: string, id: number, dx: number) =>
      page.evaluate(({ type, id, dx }) => {
        const st = document.getElementById('stage') as HTMLElement;
        const r = st.getBoundingClientRect();
        st.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: 'touch', isPrimary: true, clientX: r.left + r.width / 2 + dx, clientY: r.top + r.height * 0.7, bubbles: true }));
      }, { type, id, dx });
    await fire('pointerdown', 5, 0);
    await fire('pointermove', 5, -60);
    const expected = x0 - 60 * (420 / box.width);
    expect((await snap(page)).ship.x).toBeCloseTo(expected, 0);
    await advance(page, 0.5);
    expect((await snap(page)).bullets.length).toBeGreaterThanOrEqual(2); // dokunma sürerken kendiliğinden ateş

    await fire('pointerup', 5, -60);
    await advance(page, 1.5);
    expect((await snap(page)).bullets).toHaveLength(0);
  });

  test('fare: imleç gemiyi izler, düğme basılıyken ateş eder', async ({ page }) => {
    await open(page);
    await startGame(page);
    const box = (await stage(page).boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.8);
    expect((await snap(page)).ship.x).toBeCloseTo(105, -1);
    await page.mouse.down();
    await advance(page, 0.5);
    expect((await snap(page)).bullets.length).toBeGreaterThanOrEqual(2);
    await page.mouse.up();
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#best')).toHaveText('0');
    await startGame(page);
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, oyun alanı sığar, düğmelerle oyun başlar ve duraklar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = (await stage(page).boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box.height / box.width - 4 / 3)).toBeLessThan(0.02);
    await expect(page.locator('#overlay-btn')).toBeVisible();
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.locator('#btn-main').click(); // Duraklat
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    expect(errors).toEqual([]);
  });

  test.describe('Retina ekran', () => {
    test.use({ deviceScaleFactor: 2 });
    test('canvas, devicePixelRatio kadar yüksek çözünürlükte çizilir', async ({ page }) => {
      await open(page);
      const dims = await page.locator('#board').evaluate((c) => {
        const cv = c as HTMLCanvasElement;
        return { w: cv.width, h: cv.height, cssW: Math.round(cv.getBoundingClientRect().width) };
      });
      expect(dims.w).toBe(dims.cssW * 2);
      expect(dims.h).toBe(Math.round((dims.cssW * 560) / 420) * 2);
    });
  });

  test.describe('Hareket azaltma tercihi', () => {
    test.use({ reducedMotion: 'reduce' });
    test('parçacık efektleri kapalıdır; oyun yine oynanır ve skor artar', async ({ page }) => {
      const errors = await open(page);
      expect((await snap(page)).particlesEnabled).toBe(false);
      await startGame(page);
      await page.keyboard.down('Space');
      const r = await hunt(page, 's.score > 0');
      await page.keyboard.up('Space');
      expect(r.done).toBe(true);
      expect(r.s.particles).toBe(0);
      expect(errors).toEqual([]);
    });
  });

  test('tam ekran düğmesi oyun kutusunu tam ekran yapar (reklamlar kutunun dışında kalır)', async ({ page }) => {
    await open(page);
    await expect(page.locator('#btn-full')).toBeVisible();
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await page.keyboard.press('Escape');
  });
});
