import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Renk Eşleştirme (Stroop) oyunu: mutlu yol, yanlış cevap, süre sonu (sahte saat), ton modu, mobil, içerik.
const URL_PATH = '/oyunlar/renk-eslestir/';
const STORE_KEY = 'ba-oyun-renk-eslestir';
const ORDER = ['kirmizi', 'mavi', 'yesil', 'sari', 'mor', 'turuncu'];
const RGB: Record<string, string> = {
  kirmizi: 'rgb(255, 90, 90)', mavi: 'rgb(90, 168, 255)', yesil: 'rgb(63, 220, 126)',
  sari: 'rgb(255, 216, 61)', mor: 'rgb(197, 139, 255)', turuncu: 'rgb(255, 154, 60)',
};

type Hook = {
  phase: string; mode: string; level: number; score: number;
  correct: string | null; wrong: string | null; odd: number | null; notOdd: number | null;
  gridSize: number | null; delta: number | null;
};
const hook = (page: Page) => page.evaluate(() => (window as unknown as { __renkTest: () => Hook }).__renkTest());
const ans = (page: Page, id: string) => page.locator(`#rk-answers button[data-id="${id}"]`);
const scoreOf = async (page: Page) => Number(await page.locator('#rk-score').textContent());

function watch(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

test.describe('Oyun: Renk Eşleştirme', () => {
  test('sayfa açılır, oyun başlar, doğru düğme skoru artırır; dış istek ve sayfa hatası yok', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Renk Eşleştirme');
    await expect(page.locator('#rk-answers button')).toHaveCount(4);
    await expect(page.locator('#rk-answers button').first()).toBeDisabled();
    await page.locator('#rk-start').click();
    await expect(page.locator('#rk-start')).toBeDisabled();
    const h = await hook(page);
    expect(h.phase).toBe('playing');
    await ans(page, h.correct!).click();
    expect(await scoreOf(page)).toBeGreaterThan(0);
    await expect(page.locator('#rk-acc')).toHaveText('%100');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yazının rengi modunda kelime doğru renkte çizilir ve doğru düğme o renktir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#rk-start').click();
    for (let i = 0; i < 6; i++) {
      const h = await hook(page);
      const color = await page.locator('#rk-word').evaluate((e) => getComputedStyle(e).color);
      expect(color).toBe(RGB[h.correct!]);
      await ans(page, h.correct!).click();
    }
    expect(await scoreOf(page)).toBeGreaterThanOrEqual(60);
  });

  test('kelimenin anlamı modunda doğru düğme yazan kelimedir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.getByLabel('Kelimenin anlamı').check();
    await expect(page.locator('#rk-task')).toContainText('ANLAMI');
    await page.locator('#rk-start').click();
    for (let i = 0; i < 6; i++) {
      const h = await hook(page);
      const word = (await page.locator('#rk-word').textContent()) || '';
      const name = await ans(page, h.correct!).evaluate((b) => (b.lastChild as Text).textContent || '');
      expect(word).toBe(name.toLocaleUpperCase('tr-TR'));
      await ans(page, h.correct!).click();
    }
    expect(await scoreOf(page)).toBeGreaterThan(0);
  });

  test('yanlış düğme doğruluğu düşürür, seriyi bozar ve puanı 5 azaltır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#rk-start').click();
    let h = await hook(page);
    await ans(page, h.correct!).click();
    const afterCorrect = await scoreOf(page);
    h = await hook(page);
    await ans(page, h.wrong!).click();
    await expect(page.locator('#rk-acc')).toHaveText('%50');
    expect(await scoreOf(page)).toBe(Math.max(0, afterCorrect - 5));
    // Yanlış cevaptan sonra oyun sürer ve yeni soru gelir.
    expect((await hook(page)).phase).toBe('playing');
  });

  test('klavye: Boşluk başlatır (yalnızca oyun kutusunda), 1-6 tuşları cevaplar, P duraklatır ve sürdürür', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('h1').click(); // odak oyun kutusu dışında: Boşluk sayfa kaydırması içindir
    await page.keyboard.press('Space');
    expect((await hook(page)).phase).toBe('idle');
    await page.locator('#rk-start').focus();
    await page.keyboard.press('Space');
    expect((await hook(page)).phase).toBe('playing');
    const h = await hook(page);
    await page.keyboard.press(String(ORDER.indexOf(h.correct!) + 1));
    expect(await scoreOf(page)).toBeGreaterThan(0);

    await page.keyboard.press('p');
    expect((await hook(page)).phase).toBe('paused');
    await expect(page.locator('#rk-word')).toHaveText('Duraklatıldı');
    await expect(page.locator('#rk-answers button').first()).toBeDisabled();
    await expect(page.locator('#rk-pause')).toHaveText('Devam et');
    await page.keyboard.press('p');
    expect((await hook(page)).phase).toBe('playing');
    await expect(page.locator('#rk-word')).not.toHaveText('Duraklatıldı');
  });

  test('zorluk renk sayısını belirler: kolay 2, orta 4, zor 6', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.getByLabel('Kolay').check();
    await expect(page.locator('#rk-answers button')).toHaveCount(2);
    await page.getByLabel('Zor').check();
    await expect(page.locator('#rk-answers button')).toHaveCount(6);
    await page.locator('#rk-start').click();
    const h = await hook(page);
    await page.keyboard.press(String(ORDER.indexOf(h.correct!) + 1));
    expect(await scoreOf(page)).toBeGreaterThan(0);
    // Oyun sırasında ayarlar kilitlidir.
    await expect(page.getByLabel('Kolay')).toBeDisabled();
    await expect(page.getByLabel('30 sn')).toBeDisabled();
  });

  test('süre sonu: sahte saatle 30 sn dolunca sonuç görünür ve en yüksek skor yazılır', async ({ page }) => {
    await page.clock.install();
    const { errors } = watch(page);
    await page.goto(URL_PATH);
    await page.locator('#rk-start').click();
    const h = await hook(page);
    await ans(page, h.correct!).click();
    const h2 = await hook(page);
    await ans(page, h2.wrong!).click();

    await page.clock.runFor(10_000);
    expect((await hook(page)).phase).toBe('playing');
    await expect(page.locator('#rk-time')).toHaveText(/^(19|20)$/);
    await expect(page.locator('#rk-result')).not.toHaveClass(/is-active/);

    await page.clock.runFor(21_000);
    expect((await hook(page)).phase).toBe('done');
    await expect(page.locator('#rk-result')).toHaveClass(/is-active/);
    await expect(page.locator('#rk-time')).toHaveText('0');
    await expect(page.locator('#rk-r-count')).toHaveText('1 / 1');
    await expect(page.locator('#rk-r-acc')).toHaveText('%50');
    await expect(page.locator('#rk-start')).toHaveText('Tekrar oyna');
    await expect(page.locator('#rk-start')).toBeEnabled();
    await expect(page.locator('#rk-answers button').first()).toBeDisabled();

    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE_KEY);
    expect(stored.best['renk|30|orta']).toBeGreaterThan(0);
    await expect(page.locator('#rk-best')).toContainText(String(stored.best['renk|30|orta']));

    // Tekrar oyna: sonuç kapanır, skor sıfırlanır.
    await page.locator('#rk-start').click();
    expect((await hook(page)).phase).toBe('playing');
    expect(await scoreOf(page)).toBe(0);
    await expect(page.locator('#rk-result')).not.toHaveClass(/is-active/);
    expect(errors).toEqual([]);
  });

  test('süre sonu: 60 sn seçeneği 60 sn sonra biter', async ({ page }) => {
    await page.clock.install();
    await page.goto(URL_PATH);
    await page.getByLabel('60 sn').check();
    await expect(page.locator('#rk-time')).toHaveText('60');
    await page.locator('#rk-start').click();
    await page.clock.runFor(45_000);
    expect((await hook(page)).phase).toBe('playing');
    await page.clock.runFor(16_000);
    expect((await hook(page)).phase).toBe('done');
    await expect(page.locator('#rk-result')).toHaveClass(/is-active/);
  });

  test('farklı tonu bul: doğru kare seviyeyi artırır, ızgara büyür, fark küçülür; yanlış kare puan düşürür', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.getByLabel('Farklı tonu bul').check();
    await expect(page.locator('#rk-answers')).toBeHidden();
    await page.locator('#rk-start').click();
    let h = await hook(page);
    expect(h.mode).toBe('ton');
    expect(h.gridSize).toBe(2);
    await expect(page.locator('.rk-cell')).toHaveCount(4);
    const firstDelta = h.delta!;

    await page.locator(`.rk-cell[data-i="${h.odd}"]`).click();
    h = await hook(page);
    expect(h.level).toBe(2);
    expect(h.delta!).toBeLessThan(firstDelta);
    expect(await scoreOf(page)).toBeGreaterThan(0);

    await page.locator(`.rk-cell[data-i="${h.odd}"]`).click();
    h = await hook(page);
    expect(h.gridSize).toBe(3);
    await expect(page.locator('.rk-cell')).toHaveCount(9);

    const before = await scoreOf(page);
    await page.locator(`.rk-cell[data-i="${h.notOdd}"]`).click();
    expect(await scoreOf(page)).toBe(Math.max(0, before - 5));
    await expect(page.locator('#rk-acc')).toHaveText('%67');
    expect((await hook(page)).level).toBe(3);
  });

  test('farklı tonu bul: ok tuşlarıyla gezinilir, Enter ile seçilir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.getByLabel('Farklı tonu bul').check();
    await page.locator('#rk-start').focus();
    await page.keyboard.press('Enter');
    expect((await hook(page)).phase).toBe('playing');
    await page.locator('.rk-cell[tabindex="0"]').focus();
    await page.keyboard.press('ArrowRight');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.i)).toBe('1');
    await page.keyboard.press('ArrowDown');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.i)).toBe('3');
    const h = await hook(page);
    await page.locator(`.rk-cell[data-i="${h.odd}"]`).focus();
    await page.keyboard.press('Enter');
    expect((await hook(page)).level).toBe(2);
    // Yeni ızgarada odak ızgara içinde kalır (klavye kullanıcısı kaybolmaz).
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).classList.contains('rk-cell'))).toBe(true);
  });

  test('bozuk localStorage kaydı sayfayı bozmaz', async ({ page }) => {
    const { errors } = watch(page);
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    await page.goto(URL_PATH);
    await expect(page.locator('#rk-best')).toContainText('henüz yok');
    await page.locator('#rk-start').click();
    expect((await hook(page)).phase).toBe('playing');
    expect(errors).toEqual([]);
  });

  test('içerik: en az 800 kelime, 3 reklam (A oyun kutusunun altında), SSS >= 6, JSON-LD geçerli', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('main').evaluate((e) => (e as HTMLElement).innerText || '');
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(6);
    for (const k of ['a', 'b', 'c']) {
      await expect(page.locator(`.ba-ad[data-slot="oyun-renk-eslestir-${k}"]`)).toHaveCount(1);
    }
    // Reklam A oyun kutusunun dışında ve altında; hiçbir reklam oyun kutusunun içinde değil.
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const [boxBottom, adTop] = await page.evaluate(() => [
      document.querySelector('.game-box')!.getBoundingClientRect().bottom,
      document.querySelector('.ba-ad[data-slot="oyun-renk-eslestir-a"]')!.getBoundingClientRect().top,
    ]);
    expect(adTop).toBeGreaterThanOrEqual(boxBottom);
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://araclar.bilisimajans.com/oyunlar/renk-eslestir/');
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const game = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame');
    expect(game.applicationCategory).toBe('Game');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(6);
  });

  test('360px: yatay taşma yok (boşta ve 6 renkli oyunda)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);

    await page.getByLabel('Zor').check();
    await page.locator('#rk-start').click();
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Düğmeler oyun kutusunun içinde kalmalı (kutu taşması görünmez ama düğmeyi keser).
    const boxRight = await page.locator('.game-box').evaluate((b) => b.getBoundingClientRect().right);
    const boxes = await page.locator('#rk-answers button').evaluateAll((bs) => bs.map((b) => {
      const r = b.getBoundingClientRect();
      return { l: r.left, r: r.right, h: r.height, clipped: b.scrollWidth > b.clientWidth };
    }));
    expect(boxes).toHaveLength(6);
    for (const b of boxes) {
      expect(b.l).toBeGreaterThanOrEqual(0);
      expect(b.r).toBeLessThanOrEqual(boxRight);
      expect(b.clipped).toBe(false);
      expect(b.h).toBeGreaterThanOrEqual(44);
    }

  });

  test('360px: ton modunda 7x7 ızgara taşmaz', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await page.getByLabel('Farklı tonu bul').check();
    await page.locator('#rk-start').click();
    for (let i = 0; i < 14; i++) {
      const h = await hook(page);
      await page.locator(`.rk-cell[data-i="${h.odd}"]`).click();
    }
    const h = await hook(page);
    expect(h.gridSize).toBe(7);
    await expect(page.locator('.rk-cell')).toHaveCount(49);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const size = await page.locator('.rk-cell').first().evaluate((c) => c.getBoundingClientRect().width);
    expect(size).toBeGreaterThanOrEqual(30);
  });
});
