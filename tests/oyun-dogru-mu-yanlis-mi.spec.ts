import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Doğru mu Yanlış mı: veri bütünlüğü, 20 soruluk tur, 60 sn hızlı mod (sahte saat), rekor, klavye, bozuk kayıt, 360px, içerik.
const URL_PATH = '/oyunlar/dogru-mu-yanlis-mi/';
const KEY = 'ba-oyun-dogru-mu-yanlis-mi';
const ROOT = join(__dirname, '..', 'web');

type Item = { cat: string; text: string; truth: number; why: string };
// onermeler.js satırları: ['kategori', "önerme", 1, "açıklama"],
const SRC = readFileSync(join(ROOT, 'oyunlar', 'dogru-mu-yanlis-mi', 'onermeler.js'), 'utf8');
const ITEMS: Item[] = [...SRC.matchAll(/^\['([a-z]+)', "([^"]+)", ([01]), "([^"]+)"\],$/gm)].map((m) => ({ cat: m[1], text: m[2], truth: Number(m[3]), why: m[4] }));

const phase = (page: Page) => page.locator('#oyun');
const store = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function start(page: Page, opts: { mod?: string; kategori?: string } = {}) {
  await page.goto(URL_PATH);
  await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
  if (opts.mod) await page.locator('#mod').selectOption(opts.mod);
  if (opts.kategori) await page.locator('#kategori').selectOption(opts.kategori);
  await page.locator('#baslat').click();
  await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
}

/** Ekrandaki önermenin gerçek değerini veriden bulur. */
async function current(page: Page): Promise<Item> {
  const text = (await page.locator('#soru-metin').textContent())!;
  const it = ITEMS.find((x) => x.text === text);
  expect(it, `önerme veride yok: ${text}`).toBeTruthy();
  return it!;
}
async function answer(page: Page, correct: boolean) {
  const it = await current(page);
  const val = correct ? it.truth : 1 - it.truth;
  await page.locator(`#siklar .bg-opt[data-val="${val}"]`).click();
  return it;
}

test.describe('Doğru mu Yanlış mı', () => {
  test('veri sağlam: 300+ önerme, benzersiz, beş kategori, doğru/yanlış dengeli, açıklamalı', () => {
    expect(ITEMS.length).toBeGreaterThanOrEqual(300);
    expect(new Set(ITEMS.map((x) => x.text)).size).toBe(ITEMS.length);
    expect(new Set(ITEMS.map((x) => x.cat)).size).toBe(5);
    const truths = ITEMS.filter((x) => x.truth === 1).length;
    expect(truths / ITEMS.length).toBeGreaterThan(0.35);
    expect(truths / ITEMS.length).toBeLessThan(0.65);
    for (const x of ITEMS) { expect(x.text.length, x.text).toBeGreaterThan(10); expect(x.why.length, x.text).toBeGreaterThan(12); }
    for (const c of ['bilim', 'tarih', 'cografya', 'kultur', 'turkce']) expect(ITEMS.filter((x) => x.cat === c).length, c).toBeGreaterThanOrEqual(50);
  });

  test('sayfa açılır; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await start(page, { mod: 'soru20' });
    await expect(page.locator('h1')).toContainText('Doğru mu Yanlış mı');
    await expect(page.locator('#siklar .bg-opt')).toHaveCount(2);
    await current(page);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('20 soru: doğru cevap puan verir, yanlış cevap açıklama gösterir, tur sonu skor yazılır', async ({ page }) => {
    await start(page, { mod: 'soru20' });
    const first = await answer(page, true);
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await expect(page.locator('#puan')).toHaveText('10');
    await expect(page.locator('#aciklama')).toHaveText(first.why);
    await page.locator('#sonraki').click();
    const second = await answer(page, false);
    await expect(page.locator('#geri-bildirim')).toContainText('Yanlış.');
    await expect(page.locator('#seri')).toHaveText('0');
    await expect(page.locator('#aciklama')).toHaveText(second.why);
    await expect(page.locator('#siklar .is-wrong')).toHaveCount(1);
    await expect(page.locator('#siklar .is-correct')).toHaveCount(1);
    await page.locator('#sonraki').click();
    for (let i = 2; i < 20; i++) {
      await answer(page, true);
      await page.locator('#sonraki').click();
    }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-ozet')).toContainText('19');
    await expect(page.locator('#yanlislar li')).toHaveCount(1);
    const s = await store(page);
    expect(s.rounds).toBe(1);
    expect(s.answered).toBe(20);
    expect(s.correct).toBe(19);
    expect(s.best['soru-20']).toBeGreaterThan(0);
    await page.locator('#tekrar').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
  });

  test('60 saniye modu: seri bonusu işler, süre dolunca tur biter ve rekor yazılır (sahte saat)', async ({ page }) => {
    await page.clock.install();
    await start(page, { mod: 'sure60' });
    await expect(page.locator('#sure-kutu')).toBeVisible();
    await expect(page.locator('#toplam-etiket')).toBeHidden();
    for (let i = 0; i < 3; i++) {
      await answer(page, true);
      await page.clock.runFor(500);
    }
    await expect(page.locator('#puan')).toHaveText('45'); // 10 + 15 + 20
    await expect(page.locator('#seri')).toHaveText('3');
    await page.clock.runFor(30_000);
    await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
    await page.clock.runFor(31_000);
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-baslik')).toHaveText('Süre doldu');
    await expect(page.locator('#sonuc-puan')).toHaveText('45');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    const s = await store(page);
    expect(s.best['sure-60']).toBe(45);
    expect(s.bestStreak).toBe(3);
  });

  test('rekor yalnızca aşılınca güncellenir', async ({ page }) => {
    await page.clock.install();
    await start(page, { mod: 'sure60' });
    await answer(page, true);
    await page.clock.runFor(500);
    await answer(page, true);
    await page.clock.runFor(61_000);
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    expect((await store(page)).best['sure-60']).toBe(25);
    // ikinci tur: tek yanlış, düşük puan; rekor değişmez
    await page.locator('#tekrar').click();
    await answer(page, false);
    await page.clock.runFor(500);
    await answer(page, true);
    await page.clock.runFor(61_000);
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-rekor')).toBeHidden();
    const s = await store(page);
    expect(s.best['sure-60']).toBe(25);
    expect(s.rounds).toBe(2);
    // üçüncü tur: yeni rekor
    await page.locator('#tekrar').click();
    for (let i = 0; i < 3; i++) { await answer(page, true); await page.clock.runFor(500); }
    await page.clock.runFor(61_000);
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    expect((await store(page)).best['sure-60']).toBe(45);
  });

  test('kategori filtresi ve klavye: D/Y ve 1/2 tuşları cevap verir', async ({ page }) => {
    await start(page, { mod: 'soru20', kategori: 'turkce' });
    const it = await current(page);
    expect(it.cat).toBe('turkce');
    await page.keyboard.press(it.truth ? 'd' : 'y');
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await expect(page.locator('#sonraki')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#sira')).toHaveText('2');
    const it2 = await current(page);
    expect(it2.cat).toBe('turkce');
    await page.keyboard.press(it2.truth ? '2' : '1'); // bilerek yanlış
    await expect(page.locator('#geri-bildirim')).toContainText('Yanlış.');
  });

  test('bozuk localStorage çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', '{"rounds":"a","best":{"sure-60":"z","../x":5},"last":"q","answered":-4}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await page.goto(URL_PATH);
      await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
      await page.locator('#mod').selectOption('soru20');
      await page.locator('#baslat').click();
      await page.locator('#siklar .bg-opt').first().click();
      await page.locator('#birak').click();
      await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
      expect(errors).toEqual([]);
      await page.close();
    }
  });

  test('360px taşma yok; içerik: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await start(page, { mod: 'soru20' });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-dogru-mu-yanlis-mi-${s}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
  });
});
