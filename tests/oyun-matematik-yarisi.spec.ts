import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Matematik Yarışı: işlemler, tohumlu deterministik sorular, süre/20 soru bitişi, günlük mod, rekor, mobil, dış istek.
const URL_PATH = '/oyunlar/matematik-yarisi/';
const STORE = 'ba-oyun-matematik-yarisi';

async function open(page: Page, query = '') {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH + query);
  await expect(page.locator('#mt-start')).toBeVisible();
  return { external, errors };
}
const info = (page: Page) => page.evaluate(() => (window as any).__matTest());
const radio = (page: Page, name: string, value: string) => page.locator(`input[name="${name}"][value="${value}"]`).check();

async function answerCorrect(page: Page) {
  const s = await info(page);
  await page.locator('#mt-input').fill(String(s.answer));
  await page.locator('#mt-input').press('Enter');
  return s;
}

test('sayfa içeriği: >=800 kelime, 3 reklam, JSON-LD, SSS, dış istek ve hata yok', async ({ page }) => {
  const { external, errors } = await open(page);
  const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
  expect(words).toBeGreaterThanOrEqual(900);
  await expect(page.locator('.ba-ad')).toHaveCount(3);
  expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
  expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(ld).toContain('VideoGame');
  expect(ld).toContain('FAQPage');
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test('doğru cevap puanı artırır, yanlış cevap seriyi sıfırlar', async ({ page }) => {
  await open(page);
  await radio(page, 'mt-level', '1');
  await page.locator('#mt-start').click();
  await answerCorrect(page);
  await answerCorrect(page);
  let s = await info(page);
  expect(s.correct).toBe(2);
  expect(s.streak).toBe(2);
  expect(s.score).toBe(10 + 12);
  await page.locator('#mt-input').fill('999999');
  await page.locator('#mt-input').press('Enter');
  s = await info(page);
  expect(s.streak).toBe(0);
  expect(s.wrong).toBe(1);
  expect(s.score).toBe(22);
  await expect(page.locator('#mt-fb')).toContainText('Doğrusu');
});

test('sayı olmayan giriş sayılmaz; dört işlem doğru üretilir', async ({ page }) => {
  await open(page, '?seed=islem');
  await radio(page, 'mt-level', '2');
  const checks: Record<string, (s: any) => boolean> = {
    add: (s) => s.answer === s.a + s.b,
    sub: (s) => s.answer === s.a - s.b && s.answer >= 0,
    mul: (s) => s.answer === s.a * s.b,
    div: (s) => s.answer * s.b === s.a,
  };
  for (const op of Object.keys(checks)) {
    await radio(page, 'mt-op', op);
    await page.locator('#mt-start').click();
    for (let i = 0; i < 6; i++) {
      const s = await info(page);
      expect(s.op).toBe(op);
      expect(checks[op](s), JSON.stringify(s)).toBe(true);
      await answerCorrect(page);
    }
    await page.locator('#mt-finish').click();
    await page.locator('#mt-menu').click();
  }
  await radio(page, 'mt-op', 'mix');
  await page.locator('#mt-start').click();
  await page.locator('#mt-input').fill('abc');
  await page.locator('#mt-input').press('Enter');
  expect((await info(page)).answered).toBe(0);
  await expect(page.locator('#mt-fb')).toContainText('sayı');
});

test('?seed= ile aynı soru dizisi tekrar üretilir', async ({ page }) => {
  await open(page, '?seed=sinif5a');
  async function sequence() {
    await page.locator('#mt-start').click();
    const texts: string[] = [];
    for (let i = 0; i < 8; i++) {
      texts.push((await info(page)).text);
      await answerCorrect(page);
    }
    await page.locator('#mt-finish').click();
    await page.locator('#mt-menu').click();
    return texts;
  }
  const first = await sequence();
  const second = await sequence();
  expect(second).toEqual(first);
  expect(new Set(first).size).toBeGreaterThan(3);
});

test('60 saniye dolunca sonuç ekranı ve istatistik görünür', async ({ page }) => {
  await page.clock.install();
  await open(page);
  await page.locator('#mt-start').click();
  await answerCorrect(page);
  await page.clock.runFor(61000);
  await expect(page.locator('#mt-result')).toBeVisible();
  await expect(page.locator('#mt-res-summary')).toContainText('doğruluk');
  expect((await info(page)).running).toBe(false);
});

test('20 soru modu 20. cevapta biter ve rekor yazılır', async ({ page }) => {
  await open(page);
  await radio(page, 'mt-mode', 'q20');
  await radio(page, 'mt-level', '1');
  await page.locator('#mt-start').click();
  await expect(page.locator('#mt-progress')).toHaveText('1 / 20');
  for (let i = 0; i < 20; i++) await answerCorrect(page);
  await expect(page.locator('#mt-result')).toBeVisible();
  const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);
  expect(saved.q20).toBeGreaterThan(0);
  await expect(page.locator('#mt-res-best')).toContainText('Yeni en iyi');
  await expect(page.locator('#mt-best')).toHaveText(String(saved.q20));
});

test('günlük mod: aynı gün aynı 20 soru', async ({ page }) => {
  await open(page);
  await radio(page, 'mt-mode', 'daily');
  await expect(page.locator('input[name="mt-op"][value="add"]')).toBeDisabled();
  async function firstFive() {
    await page.locator('#mt-start').click();
    const t: string[] = [];
    for (let i = 0; i < 5; i++) { t.push((await info(page)).text); await answerCorrect(page); }
    const seed = (await info(page)).seed;
    await page.locator('#mt-finish').click();
    await page.locator('#mt-menu').click();
    return { t, seed };
  }
  const a = await firstFive();
  const b = await firstFive();
  expect(b.t).toEqual(a.t);
  expect(a.seed).toMatch(/^gunluk-\d{4}-\d{2}-\d{2}$/);
});

test('bozuk localStorage çökertmez', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.addInitScript((k) => localStorage.setItem(k, '[1,2'), STORE);
  await page.goto(URL_PATH);
  await expect(page.locator('#mt-best')).toHaveText('henüz yok');
  await page.locator('#mt-start').click();
  await answerCorrect(page);
  await page.locator('#mt-finish').click();
  await expect(page.locator('#mt-result')).toBeVisible();
  const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);
  expect(saved.t60).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('360px genişlikte yatay taşma yok', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await open(page);
  const fits = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(await fits()).toBe(true);
  await radio(page, 'mt-level', '3');
  await page.locator('#mt-start').click();
  expect(await fits()).toBe(true);
  await page.locator('#mt-finish').click();
  expect(await fits()).toBe(true);
});
