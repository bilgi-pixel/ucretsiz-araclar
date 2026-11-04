import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Hız Koşusu: sayfa yapısı, başlangıç/skor, zıplama (y değişimi, kısa-uzun), eğilme, çarpışma, oyun sonu,
// en yüksek skor kalıcılığı, gece-gündüz, duraklatma, dokunmatik/ekran düğmeleri, 360px, Retina.
const URL_PATH = '/oyunlar/hiz-kosusu/';
const STORE_KEY = 'ba-hiz-kosusu';

type Kosu = {
  hit: () => void; spawn: (k: string) => void; addScore: (n: number) => void; calm: (on?: boolean) => void;
  info: () => { obstacles: unknown[] };
};
const stage = (page: Page) => page.locator('#stage');
const kosu = <T,>(page: Page, fn: (k: Kosu) => T) =>
  page.evaluate(`(${fn.toString()})(window.__kosuTest)`) as Promise<T>;

// Varsayılan: kendiliğinden engel üretimi kapalı (yoğun makinede rastgele çarpışma testi bozmasın);
// engeller kancayla (spawn) elle konur. Doğal üretimi sınayan test calm=false verir.
async function open(page: Page, calm = true) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
  if (calm) await kosu(page, (k) => k.calm(true));
  return errors;
}
async function start(page: Page) {
  await page.locator('#btn-main').click();
  await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
}
const dataNum = async (page: Page, key: string) => Number((await stage(page).getAttribute(`data-${key}`)) || '0');

// Zıplamanın en yüksek noktasını (data-y) kare kare örnekler
async function samplePeak(page: Page, act: () => Promise<void>) {
  await page.evaluate(() => {
    const st = document.getElementById('stage') as HTMLElement;
    const w = window as unknown as { __peak: number; __sampling: boolean };
    w.__peak = 0; w.__sampling = true;
    const loop = () => { w.__peak = Math.max(w.__peak, Number(st.dataset.y || 0)); if (w.__sampling) requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  await act();
  await page.waitForTimeout(800);
  // Yoğun makinede kareler gecikebilir: hiç yükselme görülmediyse biraz daha bekle
  await page.waitForFunction(() => (window as unknown as { __peak: number }).__peak > 0, null, { timeout: 5000 }).catch(() => undefined);
  return page.evaluate(() => { const w = window as unknown as { __peak: number; __sampling: boolean }; w.__sampling = false; return w.__peak; });
}

// data-y verilen değeri aşana dek bekler (kare gecikmelerinden bağımsız "yeterince yükseldi" kontrolü)
const waitForY = (page: Page, min: number) =>
  page.waitForFunction((m) => Number((document.getElementById('stage') as HTMLElement).dataset.y || 0) > m, min, { timeout: 8000 });

test.describe('Hız Koşusu', () => {
  test('sayfa açılır; ≥800 kelime, 3 reklam (oyun kutusunun dışında), SSS ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Hız Koşusu');
    await expect(page).toHaveTitle(/Hız Koşusu Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-hiz-kosusu-a', 'oyun-hiz-kosusu-b', 'oyun-hiz-kosusu-c']);
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

  test('başlat: kaplama kalkar, skor artar, hız çarpanı görünür', async ({ page }) => {
    const errors = await open(page);
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#score')).toHaveText('0');
    await expect(page.locator('#speedx')).toHaveText('1,0×');
    await start(page);
    await expect(page.locator('#overlay')).toBeHidden();
    await expect.poll(() => dataNum(page, 'score'), { timeout: 8000 }).toBeGreaterThan(0);
    await expect(page.locator('#score')).not.toHaveText('0');
    expect(errors).toEqual([]);
  });

  test('engeller kendiliğinden doğar ve kediye doğru kayar; müdahale edilmezse çarpışma oyunu bitirir', async ({ page }) => {
    const errors = await open(page, false);
    await start(page);
    // İlk engel birkaç saniye içinde ekrana girer (yavaş makinede oyun zamanı gecikebilir: geniş zaman aşımı)
    await expect.poll(() => kosu(page, (k) => k.info().obstacles.length), { timeout: 20000 }).toBeGreaterThan(0);
    // Hiç zıplamazsak kedi engele çarpar
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti', { timeout: 30000 });
    await expect(page.locator('#overlay-text')).toContainText(/çarptın/);
    expect(errors).toEqual([]);
  });

  test('Boşluk zıplatır (data-y değişir, sonra iner); tuşu uzun basmak kısa dokunuştan daha yükseğe çıkarır', async ({ page }) => {
    const errors = await open(page);
    await start(page);
    expect(await dataNum(page, 'y')).toBe(0);
    const firstPeak = await samplePeak(page, async () => { await page.keyboard.press('Space'); });
    expect(firstPeak).toBeGreaterThan(5); // y değişti
    expect(await dataNum(page, 'y')).toBe(0); // ve kedi yere indi

    // Kısa dokunuş ve uzun basış: yeni koşularda karşılaştır (ilk engel birkaç saniye sonra gelir)
    await page.locator('#btn-restart').click();
    const tapPeak = await samplePeak(page, async () => { await page.keyboard.press('Space'); });
    await page.locator('#btn-restart').click();
    const holdPeak = await samplePeak(page, async () => {
      await page.keyboard.down('ArrowUp');
      await waitForY(page, 100); // basılı tutulduğu sürece yükselmeye devam eder
      await page.keyboard.up('ArrowUp');
    });
    expect(tapPeak).toBeGreaterThan(20);
    expect(holdPeak).toBeGreaterThan(110);
    expect(holdPeak).toBeGreaterThan(tapPeak + 40);
    expect(errors).toEqual([]);
  });

  test('aşağı ok eğilir (data-duck); eğilen kedi alçak uçan nesnenin altından geçer, ayakta çarpar', async ({ page }) => {
    await open(page);
    await start(page);
    await page.keyboard.down('ArrowDown');
    await expect(stage(page)).toHaveAttribute('data-duck', '1');
    await kosu(page, (k) => k.spawn('kus-alcak'));
    await expect.poll(() => kosu(page, (k) => k.info().obstacles.length), { timeout: 8000 }).toBe(0);
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await page.keyboard.up('ArrowDown');
    await expect(stage(page)).toHaveAttribute('data-duck', '0');

    // Ayakta: aynı nesne çarpar
    await kosu(page, (k) => k.spawn('kus-alcak'));
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti', { timeout: 8000 });
    await expect(page.locator('#overlay-text')).toContainText('Uçan nesneye çarptın');
  });

  test('yerdeki engele çarpınca oyun biter; kilit süresi sonra Boşluk ve Tekrar oyna yeniden başlatır', async ({ page }) => {
    await open(page);
    await start(page);
    await kosu(page, (k) => k.spawn('tas'));
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti', { timeout: 8000 });
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#overlay-title')).toHaveText('Oyun bitti');
    await expect(page.locator('#overlay-text')).toContainText('Engele çarptın');
    // Kazara yeniden başlamayı önleyen kısa kilit
    await expect(page.locator('#overlay-btn')).toBeDisabled();
    await page.keyboard.press('Space');
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#overlay-btn')).toBeEnabled();
    // Tıklamadan hemen sonra (aynı olay döngüsünde) skor sıfırlanmış olmalı; skor hemen artmaya başladığı için eşzamanlı okunur
    const afterAgain = await page.evaluate(() => {
      (document.getElementById('overlay-btn') as HTMLButtonElement).click();
      return { score: document.getElementById('score')!.textContent, state: document.getElementById('stage')!.dataset.state };
    });
    expect(afterAgain).toEqual({ score: '0', state: 'oynuyor' });
    await expect(page.locator('#overlay')).toBeHidden();

    // Yeniden başlat: oyun sürerken koşuyu başa alır
    await expect.poll(() => dataNum(page, 'score'), { timeout: 8000 }).toBeGreaterThan(0);
    const afterRestart = await page.evaluate(() => {
      (document.getElementById('btn-restart') as HTMLButtonElement).click();
      return { score: document.getElementById('score')!.textContent, state: document.getElementById('stage')!.dataset.state };
    });
    expect(afterRestart).toEqual({ score: '0', state: 'oynuyor' });
  });

  test('__kosuTest.hit() oyunu bitirir; en yüksek skor localStorage\'a yazılır ve yenilemede korunur', async ({ page }) => {
    const errors = await open(page);
    await start(page);
    await expect.poll(() => dataNum(page, 'score'), { timeout: 8000 }).toBeGreaterThan(1);
    await kosu(page, (k) => k.hit());
    await expect(stage(page)).toHaveAttribute('data-state', 'bitti');
    const best = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null').best, STORE_KEY);
    expect(best).toBeGreaterThan(1);
    await expect(page.locator('#best')).toHaveText(String(best));
    await expect(page.locator('#overlay-text')).toContainText('Yeni rekor');

    await page.reload();
    await expect(stage(page)).toHaveAttribute('data-state', 'hazir');
    await expect(page.locator('#best')).toHaveText(String(best));
    expect(errors).toEqual([]);
  });

  test('bozuk localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('#best')).toHaveText('0');
    await start(page);
    expect(errors).toEqual([]);
  });

  test('P duraklatır, devam ettirir; duraklatılmış oyunda skor ve konum donar', async ({ page }) => {
    await open(page);
    await start(page);
    await expect.poll(() => dataNum(page, 'score'), { timeout: 8000 }).toBeGreaterThan(0);
    await page.keyboard.press('p');
    await expect(stage(page)).toHaveAttribute('data-state', 'duraklatildi');
    await expect(page.locator('#overlay')).toContainText('Duraklatıldı');
    const frozen = await dataNum(page, 'score');
    await page.waitForTimeout(450);
    expect(await dataNum(page, 'score')).toBe(frozen);
    await page.locator('#overlay-btn').click();
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect.poll(() => dataNum(page, 'score')).toBeGreaterThan(frozen);
  });

  test('skor yükselince hız artar ve gökyüzü geceye geçer (data-night)', async ({ page }) => {
    await open(page);
    await start(page);
    await expect(stage(page)).toHaveAttribute('data-night', '0');
    const speed0 = await dataNum(page, 'speed');
    await kosu(page, (k) => k.addScore(520));
    await expect(stage(page)).toHaveAttribute('data-night', '1', { timeout: 3000 });
    expect(await dataNum(page, 'speed')).toBeGreaterThan(speed0 + 100);
    await expect(page.locator('#speedx')).not.toHaveText('1,0×');
  });

  test('Boşlukla başlatma: oyun alanı seçiliyken Boşluk koşuyu başlatır ve zıplatır', async ({ page }) => {
    await open(page);
    await stage(page).focus();
    const peak = await samplePeak(page, async () => { await page.keyboard.press('Space'); });
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    expect(peak).toBeGreaterThan(0);
  });

  test.describe('Retina ekran', () => {
    test.use({ deviceScaleFactor: 2 });
    test('canvas, devicePixelRatio kadar yüksek çözünürlükte çizilir (2:1 oran)', async ({ page }) => {
      await open(page);
      const dims = await page.locator('#board').evaluate((c) => {
        const cv = c as HTMLCanvasElement;
        const r = cv.getBoundingClientRect();
        return { w: cv.width, h: cv.height, cssW: Math.round(r.width), cssH: Math.round(r.height) };
      });
      expect(dims.w).toBe(dims.cssW * 2);
      expect(dims.h).toBe(dims.cssH * 2);
      expect(Math.abs(dims.cssW / dims.cssH - 2)).toBeLessThan(0.05);
    });
  });

  test('360px: taşma yok, ekran düğmeleri görünür; dokunma başlatır ve zıplatır, Eğil düğmesi basılıyken eğilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await stage(page).boundingBox();
    expect(box!.width).toBeLessThanOrEqual(360);
    expect(Math.abs(box!.width / box!.height - 2)).toBeLessThan(0.05);
    await expect(page.locator('.kc-pad')).toBeVisible();

    // Parmakla dokunma: oyun alanında başlatır ve zıplatır
    const touchPeak = await samplePeak(page, async () => {
      await page.evaluate(() => {
        const st = document.getElementById('stage') as HTMLElement;
        const r = st.getBoundingClientRect();
        const fire = (type: string) =>
          st.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: 'touch', isPrimary: true, clientX: r.left + 20, clientY: r.top + 20, bubbles: true }));
        fire('pointerdown');
        setTimeout(() => fire('pointerup'), 250);
      });
    });
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');
    expect(touchPeak).toBeGreaterThan(20);
    expect(await dataNum(page, 'y')).toBe(0);

    // Zıpla düğmesi
    const btnPeak = await samplePeak(page, async () => { await page.locator('[data-act="jump"]').click(); });
    expect(btnPeak).toBeGreaterThan(20);
    await page.locator('#btn-restart').click(); // ilk engel birkaç saniye sonra gelir: zaman çizelgesini başa al
    await expect(stage(page)).toHaveAttribute('data-state', 'oynuyor');

    // Eğil düğmesi: basılı tutunca eğilir, bırakınca kalkar
    const b = (await page.locator('[data-act="duck"]').boundingBox())!;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.mouse.down();
    await expect(stage(page)).toHaveAttribute('data-duck', '1');
    await page.mouse.up();
    await expect(stage(page)).toHaveAttribute('data-duck', '0');
    expect(errors).toEqual([]);
  });

  test('tam ekran düğmesi oyun kutusunu tam ekran yapar (reklamlar kutunun dışında kalır)', async ({ page }) => {
    await open(page);
    await expect(page.locator('#btn-full')).toBeVisible();
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await page.keyboard.press('Escape');
  });
});
