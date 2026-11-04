import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Yılan Oyunu: sayfa yapısı, oyun döngüsü, çarpışma, modlar, skor kalıcılığı, mobil kontroller.
const URL_PATH = '/oyunlar/yilan-oyunu/';
const STORE_KEY = 'ba-yilan-oyunu';

const stage = (page: Page) => page.locator('#stage');
async function head(page: Page) {
  const [x, y] = ((await stage(page).getAttribute('data-head')) || '0,0').split(',').map(Number);
  return { x, y };
}
async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}

test.describe('Yılan Oyunu', () => {
  test('sayfa açılır; ≥800 kelime, 3 reklam (oyun kutusunun dışında), SSS ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Yılan Oyunu');
    await expect(page).toHaveTitle(/Yılan Oyunu Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-yilan-oyunu-a', 'oyun-yilan-oyunu-b', 'oyun-yilan-oyunu-c']);
    // Reklam A oyun kutusunun ALTINDA; hiçbir reklam oyun kutusunun içinde değil
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
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(6);

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('başlat: yılan ilerler; ok tuşu yönü değiştirir; Boşluk ve P duraklatır, devam ettirir', async ({ page }) => {
    const errors = await open(page);
    expect(await head(page)).toEqual({ x: 10, y: 10 });
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(page.locator('#overlay')).toBeHidden();
    await expect.poll(async () => (await head(page)).x).toBeGreaterThan(10);

    await page.keyboard.press('ArrowDown');
    await expect(stage(page)).toHaveAttribute('data-dir', 'down');
    await expect.poll(async () => (await head(page)).y).toBeGreaterThan(10);

    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay')).toContainText('Duraklatıldı');
    const frozen = await head(page);
    await page.waitForTimeout(450);
    expect(await head(page)).toEqual(frozen);

    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    expect(errors).toEqual([]);
  });

  test('duvarlı modda duvara çarpınca oyun biter; Tekrar oyna ve Yeniden başlat çalışır', async ({ page }) => {
    await open(page);
    await page.locator('#opt-speed').selectOption('fast');
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti', { timeout: 6000 });
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#overlay-title')).toHaveText('Oyun bitti');
    await expect(page.locator('#overlay-text')).toContainText('Duvara çarptın');
    expect((await head(page)).x).toBe(19);

    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(page.locator('#overlay')).toBeHidden();
    await expect(page.locator('#score')).toHaveText('0');
    await expect(stage(page)).toHaveAttribute('data-length', '3');

    // Oyun sürerken "Yeniden başlat" tahtayı başa alır (aynı görevde okunur: yük altında bile kararlı)
    await expect.poll(async () => (await head(page)).x).toBeGreaterThan(10);
    const afterRestart = await page.evaluate(() => {
      (document.getElementById('btn-restart') as HTMLButtonElement).click();
      const st = document.getElementById('stage') as HTMLElement;
      return { head: st.dataset.head, length: st.dataset.length, state: st.dataset.state, score: st.dataset.score };
    });
    expect(afterRestart).toEqual({ head: '10,10', length: '3', state: 'oynuyor', score: '0' });
  });

  test('duvarsız modda yılan kenardan karşı tarafa geçer, duvara çarpmaz', async ({ page }) => {
    await open(page);
    await page.locator('#opt-speed').selectOption('fast');
    await page.locator('#opt-mode').selectOption('wrap');
    await expect(stage(page)).toHaveAttribute('data-mode', 'wrap');
    // Baş konumundaki her değişikliği kaydet: 19 → 0 geçişi sarmalamanın kanıtıdır (duvarlı modda burada oyun biterdi)
    await page.evaluate(() => {
      const st = document.getElementById('stage') as HTMLElement;
      const w = window as unknown as { __xs: number[] };
      w.__xs = [];
      new MutationObserver(() => w.__xs.push(Number((st.dataset.head || '0,0').split(',')[0]))).observe(st, { attributes: true, attributeFilter: ['data-head'] });
    });
    await page.locator('#btn-main').click();
    await expect.poll(() => page.evaluate(() => {
      const xs = (window as unknown as { __xs: number[] }).__xs;
      return xs.some((x, i) => x === 0 && xs[i - 1] === 19);
    }), { timeout: 10_000 }).toBe(true);
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    // Oyun sürerken ayarlar kilitli
    await expect(page.locator('#opt-mode')).toBeDisabled();
  });

  test('yem yiyince skor artar; en yüksek skor ve ayarlar localStorage\'a yazılır, yenilemede korunur', async ({ page }) => {
    await open(page);
    await page.locator('#opt-speed').selectOption('slow');
    await page.locator('#btn-main').click();
    // Sayfa içinde küçük bir "oyuncu": yemin konumunu veri özniteliğinden okuyup yön tuşları gönderir
    await page.evaluate(() => new Promise<void>((resolve, reject) => {
      const st = document.getElementById('stage') as HTMLElement;
      const t0 = performance.now();
      const press = (k: string) => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
      const opposite: Record<string, string> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      const arrow: Record<string, string> = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
      const iv = setInterval(() => {
        if (Number(st.dataset.score) >= 10) { clearInterval(iv); resolve(); return; }
        if (st.dataset.state === 'bitti') { clearInterval(iv); reject(new Error('oyun erken bitti')); return; }
        if (performance.now() - t0 > 25000) { clearInterval(iv); reject(new Error('yem alınamadı')); return; }
        const [hx, hy] = (st.dataset.head || '0,0').split(',').map(Number);
        const [fx, fy] = (st.dataset.food || '0,0').split(',').map(Number);
        const dir = st.dataset.dir || 'right';
        let want = hx < fx ? 'right' : hx > fx ? 'left' : hy < fy ? 'down' : 'up';
        if (hx === fx && hy === fy) return;
        if (want === opposite[dir]) {
          // ters yöne dönülemez: önce dik yöne çık
          want = (dir === 'left' || dir === 'right') ? (hy > 0 ? 'up' : 'down') : (hx < 19 ? 'right' : 'left');
        }
        if (want !== dir) press(arrow[want]);
      }, 15);
    }));
    await expect(page.locator('#score')).toHaveText('10');
    await expect(page.locator('#best')).toHaveText('10');
    await expect(stage(page)).toHaveAttribute('data-length', '4');

    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best.wall).toBeGreaterThanOrEqual(10);
    expect(saved.speed).toBe('slow');

    await page.reload();
    await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
    await expect(page.locator('#best')).toHaveText(String(saved.best.wall));
    await expect(page.locator('#opt-speed')).toHaveValue('slow');
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#best')).toHaveText('0');
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    expect(errors).toEqual([]);
  });

  test('360px: taşma yok, ekran okları görünür ve çalışır, kaydırma ile oyun başlar ve yön değişir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await stage(page).boundingBox();
    expect(box!.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(2);
    await expect(page.locator('.yl-pad')).toBeVisible();

    // Ekran okları
    await page.locator('#btn-main').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.locator('[data-pad="down"]').click();
    await expect(stage(page)).toHaveAttribute('data-dir', 'down');
    await page.locator('#btn-restart').click();

    // Yeni oyun: önce hazır ekrana dön, sonra parmak kaydırması ile başlat
    await page.locator('#opt-speed').selectOption('slow');
    await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
    await page.evaluate(() => {
      const st = document.getElementById('stage') as HTMLElement;
      const r = st.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const fire = (type: string, cx: number, cy: number) =>
        st.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: 'touch', isPrimary: true, clientX: cx, clientY: cy, bubbles: true }));
      fire('pointerdown', x, y);
      fire('pointermove', x, y + 60);
      fire('pointerup', x, y + 60);
    });
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(stage(page)).toHaveAttribute('data-dir', 'down');
    expect(errors).toEqual([]);
  });

  test.describe('Retina ekran', () => {
    test.use({ deviceScaleFactor: 2 });
    test('canvas, devicePixelRatio kadar yüksek çözünürlükte çizilir', async ({ page }) => {
      await open(page);
      const dims = await page.locator('#board').evaluate((c) => {
        const cv = c as HTMLCanvasElement;
        return { w: cv.width, cssW: Math.round(cv.getBoundingClientRect().width) };
      });
      expect(dims.w).toBe(dims.cssW * 2);
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
