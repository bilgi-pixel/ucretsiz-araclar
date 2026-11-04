import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Çarpım Tablosu Alıştırması: doğru/yanlış, süre bitişi, yanlışları tekrar, tablo görünümü, rekor, mobil, dış istek.
const URL_PATH = '/oyunlar/carpim-tablosu/';
const STORE = 'ba-oyun-carpim-tablosu';

async function open(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(page.locator('#ct-start')).toBeVisible();
  return { external, errors };
}
const info = (page: Page) => page.evaluate(() => (window as any).__carpimTest());
const waitUnlocked = (page: Page) => expect.poll(async () => (await info(page)).locked).toBe(false);

test('sayfa içeriği: >=800 kelime, 3 reklam, JSON-LD, SSS', async ({ page }) => {
  const { external, errors } = await open(page);
  const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
  expect(words).toBeGreaterThanOrEqual(900);
  await expect(page.locator('.ba-ad')).toHaveCount(3);
  expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
  await expect(page.locator('.ba-faq details')).toHaveCount(8);
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(ld).toContain('VideoGame');
  expect(ld).toContain('FAQPage');
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test('doğru cevap puanı artırır, yanlış cevap seriyi sıfırlar', async ({ page }) => {
  const { errors } = await open(page);
  await page.locator('#ct-start').click();
  let s = await info(page);
  expect(s.running).toBe(true);
  await page.locator(`.ct-choice[data-value="${s.answer}"]`).click();
  s = await info(page);
  expect(s.score).toBe(10);
  expect(s.streak).toBe(1);
  expect(s.correct).toBe(1);
  await waitUnlocked(page);
  s = await info(page);
  await page.locator(`.ct-choice:not([data-value="${s.answer}"])`).first().click();
  s = await info(page);
  expect(s.streak).toBe(0);
  expect(s.wrong).toBe(1);
  expect(s.score).toBe(10);
  await expect(page.locator('#ct-fb')).toContainText('Yanlış');
  expect(errors).toEqual([]);
});

test('klavye: 1-4 tuşları şık seçer, bölme modu ters soru üretir', async ({ page }) => {
  await open(page);
  await page.locator('input[name="ct-op"][value="div"]').check();
  await page.locator('#ct-start').click();
  const s = await info(page);
  expect(s.text).toContain('÷');
  expect(s.a * s.answer).toBe(s.a * s.b);
  const values = await page.locator('.ct-choice').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.value));
  expect(new Set(values).size).toBe(4);
  const idx = values.indexOf(String(s.answer));
  await page.keyboard.press(String(idx + 1));
  expect((await info(page)).correct).toBe(1);
});

test('yazarak cevap: boş giriş sayılmaz, Enter ile cevaplanır', async ({ page }) => {
  await open(page);
  await page.locator('input[name="ct-answer"][value="type"]').check();
  await page.locator('input[name="ct-time"][value="0"]').check();
  await page.locator('#ct-start').click();
  await page.locator('#ct-input').press('Enter');
  const empty = await info(page);
  expect(empty.correct + empty.wrong).toBe(0);
  await page.locator('#ct-input').fill(String(empty.answer));
  await page.locator('#ct-input').press('Enter');
  expect((await info(page)).correct).toBe(1);
  await page.locator('#ct-finish').click();
  await expect(page.locator('#ct-result')).toBeVisible();
  await expect(page.locator('#ct-perfect')).toBeVisible();
});

test('60 saniye dolunca sonuç ekranı açılır', async ({ page }) => {
  await page.clock.install();
  await open(page);
  await page.locator('#ct-start').click();
  await expect(page.locator('#ct-timer')).toContainText('60');
  await page.clock.runFor(61000);
  await expect(page.locator('#ct-result')).toBeVisible();
  expect((await info(page)).running).toBe(false);
});

test('yanlışlar listelenir ve tekrar çözülür', async ({ page }) => {
  await open(page);
  await page.locator('input[name="ct-answer"][value="type"]').check();
  await page.locator('input[name="ct-time"][value="0"]').check();
  await page.locator('#ct-start').click();
  const s = await info(page);
  await page.locator('#ct-input').fill('0');
  await page.locator('#ct-input').press('Enter');
  await page.locator('#ct-finish').click();
  await expect(page.locator('#ct-wrong-list li')).toHaveCount(1);
  await expect(page.locator('#ct-wrong-list li')).toContainText(`= ${s.answer}`);
  await page.locator('#ct-retry').click();
  await expect(page.locator('#ct-game')).toBeVisible();
  const r = await info(page);
  expect(r.text).toBe(s.text);
  await page.locator('#ct-input').fill(String(r.answer));
  await page.locator('#ct-input').press('Enter');
  await expect(page.locator('#ct-result')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('#ct-perfect')).toBeVisible();
});

test('tablo görünümü: 12 ve 10 boyutu, satır vurgusu', async ({ page }) => {
  await open(page);
  await page.locator('#ct-tab-table').click();
  await expect(page.locator('#ct-grid tbody tr')).toHaveCount(12);
  await expect(page.locator('#ct-grid tbody tr[data-row="7"] td').nth(7)).toHaveText('56');
  await page.locator('#ct-grid tbody tr[data-row="7"] td').first().click();
  await expect(page.locator('#ct-grid tr.is-hl')).toHaveCount(1);
  await expect(page.locator('#ct-grid tr.is-hl')).toHaveAttribute('data-row', '7');
  await page.locator('#ct-size').selectOption('10');
  await expect(page.locator('#ct-grid tbody tr')).toHaveCount(10);
});

test('rekor localStorage’a yazılır; bozuk veri çökertmez', async ({ page }) => {
  await open(page);
  await page.locator('#ct-start').click();
  const s = await info(page);
  await page.locator(`.ct-choice[data-value="${s.answer}"]`).click();
  await page.locator('#ct-finish').click();
  const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);
  expect(saved.race).toBe(10);
  await expect(page.locator('#ct-res-best')).toContainText('Yeni en iyi');

  const errors: string[] = [];
  const p2 = await page.context().newPage();
  p2.on('pageerror', (e) => errors.push(String(e)));
  await p2.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE);
  await p2.goto(URL_PATH);
  await expect(p2.locator('#ct-best-race')).toHaveText('henüz yok');
  await p2.locator('#ct-start').click();
  await expect(p2.locator('#ct-q')).toContainText('=');
  expect(errors).toEqual([]);
});

test('360px genişlikte yatay taşma yok', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await open(page);
  const fits = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(await fits()).toBe(true);
  await page.locator('#ct-start').click();
  expect(await fits()).toBe(true);
  await page.locator('#ct-finish').click();
  await page.locator('#ct-menu').click();
  await page.locator('#ct-tab-table').click();
  expect(await fits()).toBe(true);
});
