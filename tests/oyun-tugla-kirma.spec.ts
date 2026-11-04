import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Tuğla Kırma: sayfa yapısı, top fiziği, raket kontrolleri, can/oyun sonu, seviye geçişi, güçlendirmeler.
const URL_PATH = '/oyunlar/tugla-kirma/';
const STORE_KEY = 'ba-tugla-kirma';

const stage = (page: Page) => page.locator('#stage');
const num = async (page: Page, attr: string) => Number((await stage(page).getAttribute(`data-${attr}`)) || 'NaN');
async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}
async function startGame(page: Page) {
  await page.locator('#btn-main').click();
  await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
  await expect(stage(page)).toHaveAttribute('data-serve', '1');
}

/** Oyun betiğinin seviye listesinin başına deneme seviyesi ekler (oyun kodunda test kancası gerekmesin). */
async function injectLevel(page: Page, rows: string[]) {
  await page.route('**/oyunlar/tugla-kirma/game.js', async (route) => {
    const res = await route.fetch();
    const src = await res.text();
    expect(src).toContain('const LEVELS = [');
    await route.fulfill({
      status: 200,
      contentType: 'text/javascript; charset=utf-8',
      body: src.replace('const LEVELS = [', `const LEVELS = [${JSON.stringify(rows)},`),
    });
  });
}
/** Math.random'ı ardışık (düşme şansı, tür) çiftleriyle sabitler: wide → geniş raket, multi → çoklu top. */
async function forcePowerup(page: Page, type: 'wide' | 'multi') {
  await page.addInitScript((t) => {
    let n = 0;
    Math.random = () => (n++ % 2 === 0 ? 0.01 : t === 'wide' ? 0.1 : 0.9);
  }, type);
}
async function stageBox(page: Page) {
  const box = await stage(page).boundingBox();
  expect(box).not.toBeNull();
  return box!;
}
/**
 * Güçlendirme seviyesi: üstte 3 satır tuğla (seviye açık kalsın) ve 17. satırda tek tuğla (sütun 5).
 * İlk fırlatma deterministik olduğundan top bu tuğlayı kırıp raketin ~40 birim sağına döner (yakalanır);
 * tuğlanın bıraktığı kapsül de ~0,7 sn sonra raketin üzerine gelir.
 */
const POWERUP_LEVEL = ['1111111111', '1111111111', '1111111111', ...Array(14).fill('..........'), '.....1....'];
// Mantıksal (480 x 600) x koordinatını sayfa koordinatına çevirir
const lx = (box: { x: number; width: number }, logical: number) => box.x + (logical / 480) * box.width;

test.describe('Tuğla Kırma', () => {
  test('sayfa açılır; ≥800 kelime, 3 reklam (oyun kutusunun dışında), SSS ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Tuğla Kırma');
    await expect(page).toHaveTitle(/Tuğla Kırma Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-tugla-kirma-a', 'oyun-tugla-kirma-b', 'oyun-tugla-kirma-c']);
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
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(6);

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başlat: top raketin üzerinde bekler; Boşluk ile fırlar, hareket eder ve tuğla kırıp skor kazanır', async ({ page }) => {
    const errors = await open(page);
    await startGame(page);
    const y0 = await num(page, 'ball-y');
    expect(await num(page, 'ball-x')).toBeCloseTo(await num(page, 'paddle-x'), 0);
    expect(await num(page, 'bricks')).toBe(40);

    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-serve', '0');
    await expect.poll(() => num(page, 'ball-y')).toBeLessThan(y0 - 30);
    // İlk fırlatma deterministiktir (14° sağa): alt sıradaki bir tuğlaya çarpar
    await expect.poll(() => num(page, 'score'), { timeout: 5000 }).toBeGreaterThanOrEqual(10);
    expect(await num(page, 'bricks')).toBeLessThan(40);
    expect(errors).toEqual([]);
  });

  test('raket klavye ile kayar, kenarlarda durur; bekleyen top raketle birlikte gider', async ({ page }) => {
    await open(page);
    await startGame(page);
    const x0 = await num(page, 'paddle-x');
    expect(x0).toBeCloseTo(240, 0);

    await page.keyboard.down('ArrowRight');
    await expect.poll(() => num(page, 'paddle-x')).toBeGreaterThan(x0 + 60);
    await page.keyboard.up('ArrowRight');
    await page.waitForTimeout(150); // tuş bırakılınca raket durur
    const x1 = await num(page, 'paddle-x');
    await page.waitForTimeout(250);
    expect(await num(page, 'paddle-x')).toBe(x1);
    expect(await num(page, 'ball-x')).toBeCloseTo(x1, 0); // bekleyen top raketle birlikte gider

    await page.keyboard.down('a');
    await expect.poll(() => num(page, 'paddle-x'), { timeout: 8000 }).toBeCloseTo(42, 0); // yarı genişlik: sol kenarda durur
    await page.keyboard.up('a');
  });

  test('fare imleci raketi izler; dokunmatik sürükleme göreceli çalışır, kısa dokunuş topu fırlatır', async ({ page }) => {
    await open(page);
    await startGame(page);
    const box = await stageBox(page);

    await page.mouse.move(lx(box, 120), box.y + box.height * 0.8);
    await expect.poll(() => num(page, 'paddle-x')).toBeCloseTo(120, -1);
    await page.mouse.move(lx(box, 400), box.y + box.height * 0.8);
    await expect.poll(() => num(page, 'paddle-x')).toBeCloseTo(400, -1);

    // Dokunmatik: 60 css px sola sürükle → raket 60 * (480 / genişlik) birim sola gider
    const before = await num(page, 'paddle-x');
    await page.evaluate(() => {
      const st = document.getElementById('stage') as HTMLElement;
      const r = st.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height * 0.5;
      const fire = (type: string, cx: number) =>
        st.dispatchEvent(new PointerEvent(type, { pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: cx, clientY: y, bubbles: true }));
      fire('pointerdown', x);
      fire('pointermove', x - 60);
      fire('pointerup', x - 60);
    });
    const expected = before - 60 * (480 / box.width);
    await expect.poll(() => num(page, 'paddle-x')).toBeCloseTo(expected, 0);
    await expect(stage(page)).toHaveAttribute('data-serve', '1'); // sürükleme fırlatmaz

    await page.evaluate(() => {
      const st = document.getElementById('stage') as HTMLElement;
      const r = st.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height * 0.5;
      const fire = (type: string) =>
        st.dispatchEvent(new PointerEvent(type, { pointerId: 10, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, bubbles: true }));
      fire('pointerdown');
      fire('pointerup');
    });
    await expect(stage(page)).toHaveAttribute('data-serve', '0'); // kısa dokunuş fırlatır
  });

  test('P ile duraklatır, top donar; devam ettirince hareket sürer', async ({ page }) => {
    await open(page);
    await startGame(page);
    await page.keyboard.press('ArrowUp'); // yukarı ok da fırlatır
    await expect(stage(page)).toHaveAttribute('data-serve', '0');
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay')).toContainText('Duraklatıldı');
    const y = await num(page, 'ball-y');
    await page.waitForTimeout(400);
    expect(await num(page, 'ball-y')).toBe(y);
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect.poll(() => num(page, 'ball-y')).not.toBe(y);
  });

  test('toplar düşünce can azalır; canlar bitince oyun biter, rekor kaydedilir, yeniden oyna ve yenileme çalışır', async ({ page }) => {
    test.setTimeout(120_000);
    await open(page);
    await startGame(page);
    // Sayfa içi "oyuncu": topu her seferinde kaçıracak şekilde raketi uzak kenara götürür, bekleyen topu fırlatır
    await page.evaluate(() => new Promise<void>((resolve, reject) => {
      const st = document.getElementById('stage') as HTMLElement;
      const t0 = performance.now();
      let held = '';
      let lastLaunch = 0;
      const key = (type: string, k: string) => document.dispatchEvent(new KeyboardEvent(type, { key: k, bubbles: true, cancelable: true }));
      const hold = (k: string) => {
        if (held === k) return;
        if (held) key('keyup', held);
        held = k;
        if (k) key('keydown', k);
      };
      const iv = setInterval(() => {
        if (st.dataset.state === 'bitti') { hold(''); clearInterval(iv); resolve(); return; }
        if (performance.now() - t0 > 100000) { clearInterval(iv); reject(new Error('oyun bitmedi')); return; }
        if (st.dataset.state !== 'oynuyor') return;
        if (st.getAttribute('data-serve') === '1') {
          hold('');
          if (performance.now() - lastLaunch > 400) { lastLaunch = performance.now(); key('keydown', ' '); }
        } else {
          const bx = Number(st.getAttribute('data-ball-x'));
          hold(bx < 240 ? 'ArrowRight' : 'ArrowLeft');
        }
      }, 30);
    }));
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti');
    await expect(stage(page)).toHaveAttribute('data-lives', '0');
    await expect(page.locator('#overlay-title')).toHaveText('Oyun bitti');
    const score = await num(page, 'score');
    expect(score).toBeGreaterThanOrEqual(10);

    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best).toBe(score);
    await expect(page.locator('#best')).toHaveText(String(score));

    await page.locator('#overlay-btn').click(); // oyun sonu düğmesi kısa süre kilitli, Playwright etkinleşmesini bekler
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(stage(page)).toHaveAttribute('data-lives', '3');
    await expect(stage(page)).toHaveAttribute('data-level', '1');
    await expect(page.locator('#score')).toHaveText('0');
    await expect(page.locator('#best')).toHaveText(String(score)); // rekor yeni oyunda da görünür

    await page.reload();
    await expect(page.locator('#best')).toHaveText(String(score));
  });

  test('seviye bitince geçiş ekranı çıkar, bonus eklenir, "Sonraki seviye" ile 2. seviye başlar', async ({ page }) => {
    // Deneme seviyesi: ilk fırlatmanın çarpacağı tek tuğla (sütun 7)
    await injectLevel(page, ['.......1..']);
    await open(page);
    await startGame(page);
    await expect(stage(page)).toHaveAttribute('data-bricks', '1');
    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'seviye', { timeout: 6000 });
    await expect(page.locator('#overlay-title')).toContainText('Seviye 1 tamamlandı');
    await expect(stage(page)).toHaveAttribute('data-score', '110'); // 10 (tuğla) + 100 (bonus)

    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(stage(page)).toHaveAttribute('data-level', '2');
    await expect(stage(page)).toHaveAttribute('data-bricks', '40'); // gerçek 1. seviye
    await expect(stage(page)).toHaveAttribute('data-serve', '1');
  });

  test('geniş raket kapsülü raketi büyütür', async ({ page }) => {
    await forcePowerup(page, 'wide');
    await injectLevel(page, POWERUP_LEVEL);
    await open(page);
    await startGame(page);
    await page.keyboard.press('Space');
    // Top alttaki tuğlayı kırıp rakete döner, düşen kapsül de raketin üzerine gelir; raket hiç kıpırdamaz
    await expect(stage(page)).toHaveAttribute('data-wide', '1', { timeout: 10_000 });
    await expect(page.locator('#buff')).toContainText('Geniş raket');
    await expect.poll(() => num(page, 'paddle-w')).toBeGreaterThan(130);
  });

  test('çoklu top kapsülü topu üçe böler', async ({ page }) => {
    await forcePowerup(page, 'multi');
    await injectLevel(page, POWERUP_LEVEL);
    await open(page);
    await startGame(page);
    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-balls', '3', { timeout: 10_000 });
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#best')).toHaveText('0');
    await startGame(page);
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, oyun alanı sığar, düğmelerle oyun başlar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await stageBox(page);
    expect(box.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box.height / box.width - 1.25)).toBeLessThan(0.02);
    await startGame(page);
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
      expect(dims.h).toBe(Math.round((dims.cssW * 600) / 480) * 2);
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
