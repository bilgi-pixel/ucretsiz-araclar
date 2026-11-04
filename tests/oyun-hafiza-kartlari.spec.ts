import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Hafıza Kartları: eşleşme, kazanma, iki oyunculu mod, klavye, boyutlar, temalar, 360px, içerik.
const URL_PATH = '/oyunlar/hafiza-kartlari/';
const STORE_KEY = 'ba-oyun-hafiza-kartlari';

/** Tahtadaki her kartın sembolünü (görünmeyen yüz dahil) sırayla okur. */
async function readSymbols(page: Page): Promise<string[]> {
  return page.$$eval('.mc-card .mc-sym', (els) => els.map((e) => (e.textContent || '').trim()));
}

/** Sembole göre kart indekslerini çiftler halinde gruplar. */
function toPairs(symbols: string[]): number[][] {
  const map = new Map<string, number[]>();
  symbols.forEach((s, i) => map.set(s, [...(map.get(s) || []), i]));
  return [...map.values()];
}

const card = (page: Page, i: number) => page.locator(`.mc-card[data-i="${i}"]`);

/** Farklı sembole sahip iki kart indeksi bulur. */
function findMismatch(symbols: string[]): [number, number] {
  const j = symbols.findIndex((s) => s !== symbols[0]);
  return [0, j];
}

test.describe('Hafıza Kartları', () => {
  test('sayfa açılır, 12 kapalı kart gelir, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Hafıza Kartları');
    await expect(page.locator('.mc-card')).toHaveCount(12);
    await expect(page.locator('.mc-card[data-state="closed"]')).toHaveCount(12);
    await expect(page.locator('#mc-moves')).toHaveText('0');
    await expect(page.locator('#mc-time')).toHaveText('0:00');
    // Her sembol tam iki kez bulunmalı (6 çift).
    const pairs = toPairs(await readSymbols(page));
    expect(pairs.length).toBe(6);
    expect(pairs.every((p) => p.length === 2)).toBe(true);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('iki eşleşen kartı açınca eşleşmiş kalır, hamle artar', async ({ page }) => {
    await page.goto(URL_PATH);
    const [a, b] = toPairs(await readSymbols(page))[0];
    await card(page, a).click();
    await expect(card(page, a)).toHaveAttribute('data-state', 'open');
    await card(page, b).click();
    await expect(card(page, a)).toHaveAttribute('data-state', 'matched');
    await expect(card(page, b)).toHaveAttribute('data-state', 'matched');
    await expect(page.locator('#mc-moves')).toHaveText('1');
    // Beklendiğinde de eşleşmiş kalmalı; eşleşmiş karta tıklamak durumu değiştirmez.
    await page.waitForTimeout(1200);
    // aria-disabled düğmeye Playwright normal tıklamaz; kullanıcı davranışını force ile taklit ediyoruz.
    await card(page, a).click({ force: true });
    await expect(card(page, a)).toHaveAttribute('data-state', 'matched');
    await expect(page.locator('#mc-moves')).toHaveText('1');
  });

  test('eşleşmeyen kartlar kısa süre sonra kapanır; yeni karta tıklamak hemen kapatır', async ({ page }) => {
    await page.goto(URL_PATH);
    const symbols = await readSymbols(page);
    const [a, b] = findMismatch(symbols);
    await card(page, a).click();
    await card(page, b).click();
    await expect(page.locator('#mc-moves')).toHaveText('1');
    await expect(card(page, a)).toHaveAttribute('data-state', 'open');
    await expect(card(page, a)).toHaveAttribute('data-state', 'closed', { timeout: 4000 });
    await expect(card(page, b)).toHaveAttribute('data-state', 'closed');

    // Yeniden eşleşmeyen çift aç, beklemeden üçüncü karta tıkla.
    await card(page, a).click();
    await card(page, b).click();
    const c = symbols.findIndex((_, i) => i !== a && i !== b);
    await card(page, c).click();
    await expect(card(page, a)).toHaveAttribute('data-state', 'closed');
    await expect(card(page, b)).toHaveAttribute('data-state', 'closed');
    await expect(card(page, c)).toHaveAttribute('data-state', 'open');
  });

  test('tüm çiftler bulunca kazanılır, en iyi sonuç localStorage a yazılır ve yeniden başlatılabilir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL_PATH);
    const pairs = toPairs(await readSymbols(page));
    for (const [a, b] of pairs) {
      await card(page, a).click();
      await card(page, b).click();
    }
    await expect(page.locator('.mc-card[data-state="matched"]')).toHaveCount(12);
    await expect(page.locator('#mc-result')).toHaveClass(/is-active/);
    await expect(page.locator('#mc-result-text')).toContainText('6 hamlede');
    await expect(page.locator('#mc-result-text')).toContainText('Yeni en iyi sonuç');
    const best = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}').best, STORE_KEY);
    expect(best['4x3'].moves).toBe(6);
    expect(typeof best['4x3'].ms).toBe('number');
    await expect(page.locator('#mc-best')).toContainText('6 hamle');

    // Yeniden yükleyince en iyi sonuç görünür.
    await page.reload();
    await expect(page.locator('#mc-best')).toContainText('6 hamle');

    // Yeniden başlat: tüm kartlar kapanır, sayaç sıfırlanır.
    const pairs2 = toPairs(await readSymbols(page));
    await card(page, pairs2[0][0]).click();
    await page.locator('#mc-restart').click();
    await expect(page.locator('.mc-card[data-state="closed"]')).toHaveCount(12);
    await expect(page.locator('#mc-moves')).toHaveText('0');
    await expect(page.locator('#mc-result')).not.toHaveClass(/is-active/);
    expect(external).toEqual([]);
  });

  test('iki oyunculu mod: eşleşen sırayı korur, eşleşmeyen sırayı geçirir, kazanan belirlenir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#mc-players', '2');
    await expect(page.locator('#mc-turns')).toBeVisible();
    await expect(page.locator('#mc-p1')).toHaveAttribute('aria-current', 'true');

    const symbols = await readSymbols(page);
    const [a, b] = findMismatch(symbols);
    await card(page, a).click();
    await card(page, b).click();
    await expect(page.locator('#mc-p2')).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('#mc-p1')).toHaveAttribute('aria-current', 'false');

    // Oyuncu 2 tüm çiftleri bulur: sırayı korur ve kazanır.
    await expect(card(page, a)).toHaveAttribute('data-state', 'closed', { timeout: 4000 });
    for (const [x, y] of toPairs(symbols)) {
      await card(page, x).click();
      await card(page, y).click();
    }
    await expect(page.locator('#mc-p2-score')).toHaveText('6');
    await expect(page.locator('#mc-p1-score')).toHaveText('0');
    await expect(page.locator('#mc-p2')).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('#mc-result-title')).toHaveText('Oyuncu 2 kazandı!');
    // İki oyunculu oyunda kişisel en iyi sonuç yazılmaz.
    const best = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}').best, STORE_KEY);
    expect(best['4x3']).toBeUndefined();
  });

  test('boyut seçimi kart sayısını ve sütun düzenini değiştirir', async ({ page }) => {
    await page.goto(URL_PATH);
    const cases: Array<[string, number, number]> = [['4x4', 16, 4], ['6x5', 30, 6], ['6x6', 36, 6], ['4x3', 12, 4]];
    for (const [value, count, cols] of cases) {
      await page.selectOption('#mc-size', value);
      await expect(page.locator('.mc-card')).toHaveCount(count);
      const columns = await page.locator('#mc-board').evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
      expect(columns).toBe(cols);
    }
  });

  test('tema seçimi: sayılar ve renkler', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#mc-theme', 'sayilar');
    const nums = await readSymbols(page);
    expect(new Set(nums)).toEqual(new Set(['1', '2', '3', '4', '5', '6']));
    await page.selectOption('#mc-theme', 'renkler');
    await expect(page.locator('.mc-sym svg')).toHaveCount(12);
    await page.selectOption('#mc-theme', 'semboller');
    const syms = await readSymbols(page);
    expect(new Set(syms).size).toBe(6);
  });

  test('klavye: ok tuşları kartlar arasında gezinir, Enter kartı çevirir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('.mc-card[data-i="0"]').focus();
    const active = () => page.evaluate(() => (document.activeElement as HTMLElement)?.dataset.i);
    await page.keyboard.press('ArrowRight');
    expect(await active()).toBe('1');
    await page.keyboard.press('ArrowDown');
    expect(await active()).toBe('5');
    await page.keyboard.press('Enter');
    await expect(card(page, 5)).toHaveAttribute('data-state', 'open');
    await page.keyboard.press('End');
    expect(await active()).toBe('11');
    await page.keyboard.press('Home');
    expect(await active()).toBe('0');
    await page.keyboard.press('ArrowLeft');
    expect(await active()).toBe('0');
    // Yalnızca bir kart sekme sırasında olmalı.
    expect(await page.locator('.mc-card[tabindex="0"]').count()).toBe(1);
  });

  test('360px genişlikte 6x6 tahta taşmadan sığar, kartlar dokunmaya uygun', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await page.selectOption('#mc-size', '6x6');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const boxes = await page.$$eval('.mc-card', (els) => els.map((e) => {
      const r = e.getBoundingClientRect();
      return { l: r.left, r: r.right, w: r.width, h: r.height };
    }));
    expect(boxes.length).toBe(36);
    for (const b of boxes) {
      expect(b.l).toBeGreaterThanOrEqual(0);
      expect(b.r).toBeLessThanOrEqual(360);
      expect(b.w).toBeGreaterThanOrEqual(40);
      expect(b.h).toBeGreaterThanOrEqual(40);
    }
  });

  test('içerik: en az 800 kelime, 3 reklam alanı, en az 6 SSS, geçerli JSON-LD', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-hafiza-kartlari-a', 'oyun-hafiza-kartlari-b', 'oyun-hafiza-kartlari-c']);
    // Reklam A oyun kutusunun altında; oyun kutusunun içinde reklam yok.
    expect(await page.locator('#oyun-kutusu .ba-ad').count()).toBe(0);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(6);
    const game = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame');
    expect(game.applicationCategory).toMatch(/Game/);
  });
});
