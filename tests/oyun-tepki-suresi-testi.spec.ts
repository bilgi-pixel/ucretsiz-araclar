import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL_PATH = '/oyunlar/tepki-suresi-testi/';
const BEST_KEY = 'oyun-tepki-suresi-testi:best';

const overflow = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
const readBest = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), BEST_KEY);

/** Renk testinde bir geçerli deneme: tıkla → rastgele bekleme (Math.random=0.5 → 2750 ms) → yeşil → tepki → tıkla. */
async function oneTrial(page: Page, reactMs: number) {
  const pad = page.locator('#rx-pad');
  await pad.click();
  await expect(pad).toHaveAttribute('data-state', 'waiting');
  await page.clock.fastForward(2750); // yeşile dönme anı
  await expect(pad).toHaveAttribute('data-state', 'go');
  await page.clock.fastForward(reactMs);
  await pad.click();
}

test.describe('Tepki Süresi ve Refleks Testi', () => {
  test('sayfa açılır; içerik, reklam, gizlilik ve dış istek şartları sağlanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Tepki Süresi Testi');
    await expect(page.locator('#rx-pad')).toBeVisible();
    await expect(page.locator('#rx-big')).toHaveText('Başlamak için tıklayın');

    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);
    expect(await page.locator('.ba-ad[data-slot^="oyun-tepki-suresi-testi-"]').count()).toBe(3);
    const adAfterGame = await page.evaluate(() => {
      const game = document.getElementById('game')!;
      const ad = document.querySelector('.ba-ad[data-slot="oyun-tepki-suresi-testi-a"]')!;
      return !game.contains(ad) && !!(game.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adAfterGame).toBe(true);
    expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain('"VideoGame"');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('erken tıklama uyarı verir, deneme sayılmaz; sonra yeniden başlatılabilir', async ({ page }) => {
    // Saat donuk: yeşile dönme zamanlayıcısı hiç tetiklenmez, yavaş makinede bile "erken" durumu garanti olur.
    await page.clock.install({ time: 0 });
    await page.clock.pauseAt(1000);
    await page.goto(URL_PATH);
    const pad = page.locator('#rx-pad');
    await pad.click();
    await expect(pad).toHaveAttribute('data-state', 'waiting');
    await pad.click(); // yeşil olmadan tıkla
    await expect(pad).toHaveAttribute('data-state', 'early');
    await expect(page.locator('#rx-big')).toContainText('Çok erken');
    await expect(page.locator('#rx-sub')).toContainText('sayılmadı');
    await expect(page.locator('#rx-trials li.is-set')).toHaveCount(0);
    await pad.click();
    await expect(pad).toHaveAttribute('data-state', 'waiting');
  });

  test('renk değişince tıklama süreyi kaydeder; 5 denemede ortalama, yüzdelik yorum ve en iyi sonuç çıkar', async ({ page }) => {
    await page.addInitScript(() => { Math.random = () => 0.5; }); // bekleme süresi sabit: 1500 + 0,5*2500 = 2750 ms
    await page.clock.install();
    await page.goto(URL_PATH);

    await oneTrial(page, 240);
    const first = await page.locator('#rx-big').textContent();
    expect(first).toMatch(/^\d+ ms$/);
    const ms = parseInt(first!, 10);
    expect(ms).toBeGreaterThanOrEqual(240);
    expect(ms).toBeLessThan(1500);
    await expect(page.locator('#rx-trials li').first().locator('b')).toHaveText(String(ms));
    await expect(page.locator('#rx-trials li.is-set')).toHaveCount(1);
    await expect(page.locator('#result')).not.toBeVisible();

    for (let i = 0; i < 4; i++) await oneTrial(page, 240);

    await expect(page.locator('#rx-trials li.is-set')).toHaveCount(5);
    await expect(page.locator('#rx-big')).toContainText('Ortalama');
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(page.locator('#res-main')).toContainText('ms');
    await expect(page.locator('#res-comment')).toContainText('yaklaşık %');
    await expect(page.locator('#res-note')).toContainText('250 ms');
    await expect(page.locator('#res-note')).toContainText('tıbbi');
    await expect(page.locator('#res-share')).toContainText('araclar.bilisimajans.com/oyunlar/tepki-suresi-testi/');
    const best = await readBest(page);
    expect(best.reaction).toBeGreaterThanOrEqual(240);
    expect(best.reaction).toBeLessThan(1500);
    await expect(page.locator('#best-reaction')).toHaveText(`${best.reaction} ms`);

    // Tekrar dene: sonuç kapanır, deneme kutuları sıfırlanır
    await page.locator('#res-again').click();
    await expect(result).not.toBeVisible();
    await expect(page.locator('#rx-trials li.is-set')).toHaveCount(0);
  });

  test('klavye (Boşluk/Enter) ile de oynanır', async ({ page }) => {
    // Saat donuk: yeşile dönme zamanlayıcısı hiç tetiklenmez, yavaş makinede bile "erken" durumu garanti olur.
    await page.clock.install({ time: 0 });
    await page.clock.pauseAt(1000);
    await page.goto(URL_PATH);
    const pad = page.locator('#rx-pad');
    await pad.focus();
    await page.keyboard.press('Enter');
    await expect(pad).toHaveAttribute('data-state', 'waiting');
    await page.keyboard.press('Space'); // erken
    await expect(pad).toHaveAttribute('data-state', 'early');
  });

  test('hedef vurma: hedefe tıklayınca isabet artar, ortalama süre görünür', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('[data-mode="target"]').click();
    await expect(page.locator('[data-mode="target"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#rx-pad')).toBeHidden();
    await page.locator('#hv-start').click();
    await expect(page.locator('#hv-overlay')).toBeHidden();

    const target = page.locator('.tp-target');
    await expect(target).toBeVisible();
    await target.click();
    await expect(page.locator('#hv-hits')).toHaveText('1');
    await expect(page.locator('#hv-avg')).toContainText('ms');
    await expect(target).toBeVisible(); // bir sonraki hedef belirir
    await target.click();
    await expect(page.locator('#hv-hits')).toHaveText('2');
  });

  test('hedef vurma: 30 saniye dolunca sonuç kutusu açılır; isabet varsa en iyi skor yazılır', async ({ page }) => {
    await page.clock.install();
    await page.goto(URL_PATH);
    await page.locator('[data-mode="target"]').click();
    await page.locator('#hv-start').click();
    await page.clock.fastForward(600); // ilk hedef 500 ms sonra belirir
    const target = page.locator('.tp-target');
    await expect(target).toBeVisible();
    await target.click();
    await expect(page.locator('#hv-hits')).toHaveText('1');

    await page.clock.fastForward(31_000);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#res-title')).toHaveText('Hedef vurma sonucunuz');
    await expect(page.locator('#res-main')).toHaveText('1 isabet');
    await expect(page.locator('#res-new')).toBeVisible();
    await expect(page.locator('#hv-time')).toHaveText('0');
    await expect(page.locator('.tp-target')).toHaveCount(0);
    expect((await readBest(page)).target).toBe(1);
    await expect(page.locator('#best-target')).toHaveText('1 isabet');
  });

  test('hedef vurma: hiç isabet yoksa en iyi skor yazılmaz', async ({ page }) => {
    await page.clock.install();
    await page.goto(URL_PATH);
    await page.locator('[data-mode="target"]').click();
    await page.locator('#hv-start').click();
    await page.clock.fastForward(31_000);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#res-main')).toHaveText('0 isabet');
    expect(await readBest(page)).toBeNull();
  });

  test('sayı sırası: yanlış sayı hata sayar, 1-25 sırayla bitince süre ve en iyi sonuç yazılır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('[data-mode="number"]').click();
    await expect(page.locator('#nm-grid .tp-cell')).toHaveCount(25); // başlamadan yer tutucular
    await page.locator('#nm-start').click();
    const cells = page.locator('#nm-grid button.tp-cell');
    await expect(cells).toHaveCount(25);
    const labels = await cells.allTextContents();
    expect([...labels].sort((a, b) => Number(a) - Number(b))).toEqual(Array.from({ length: 25 }, (_, i) => String(i + 1)));

    await page.locator('[data-n="7"]').click(); // sırası değil → hata
    await expect(page.locator('#nm-miss')).toHaveText('1');
    await expect(page.locator('#nm-next')).toHaveText('1');
    for (let n = 1; n <= 25; n++) await page.locator(`[data-n="${n}"]`).click();

    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#res-title')).toHaveText('Sayı sırası sonucunuz');
    await expect(page.locator('#res-main')).toContainText(' sn');
    await expect(page.locator('#res-detail')).toContainText('Yanlış tıklama: 1');
    const best = await readBest(page);
    expect(best.number).toBeGreaterThan(0);
    await expect(page.locator('#best-number')).toContainText('sn');
  });

  test('daha kötü sonuç kayıtlı en iyiyi ezmez; sil düğmesi kayıtları temizler', async ({ page }) => {
    await page.addInitScript((k) => {
      if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ reaction: 1, target: 999, number: 0.5 }));
    }, BEST_KEY);
    await page.goto(URL_PATH);
    await expect(page.locator('#best-reaction')).toHaveText('1 ms');
    await expect(page.locator('#best-target')).toContainText('999');
    await page.locator('[data-mode="number"]').click();
    await page.locator('#nm-start').click();
    for (let n = 1; n <= 25; n++) await page.locator(`[data-n="${n}"]`).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#res-new')).toBeHidden();
    expect((await readBest(page)).number).toBe(0.5);

    await page.locator('#reset-best').click();
    expect(await readBest(page)).toBeNull();
    await expect(page.locator('#best-reaction')).toHaveText('–');
  });

  test('360px genişlikte üç modda da yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    expect(await overflow(page)).toBeLessThanOrEqual(1);
    await expect(page.locator('#rx-pad')).toBeVisible();

    await page.locator('[data-mode="target"]').click();
    await page.locator('#hv-start').click();
    await expect(page.locator('.tp-target')).toBeVisible();
    // Açılış animasyonu (ölçek) boundingBox'ı bozar; yerleşim ölçüleriyle kontrol et.
    const geo = await page.locator('.tp-target').evaluate((t) => {
      const arena = document.getElementById('hv-arena')!;
      const el = t as HTMLElement;
      return { w: el.offsetWidth, left: el.offsetLeft, right: el.offsetLeft + el.offsetWidth, arenaW: arena.clientWidth };
    });
    expect(geo.arenaW).toBeLessThanOrEqual(360);
    expect(geo.left).toBeGreaterThanOrEqual(0);
    expect(geo.right).toBeLessThanOrEqual(geo.arenaW);
    expect(geo.w).toBeGreaterThanOrEqual(44); // dokunmatik hedef boyutu
    expect(await overflow(page)).toBeLessThanOrEqual(1);

    await page.locator('[data-mode="number"]').click();
    await page.locator('#nm-start').click();
    await expect(page.locator('#nm-grid button.tp-cell')).toHaveCount(25);
    const cell = await page.locator('[data-n="1"]').boundingBox();
    expect(cell!.width).toBeGreaterThanOrEqual(44);
    expect(await overflow(page)).toBeLessThanOrEqual(1);
  });
});
