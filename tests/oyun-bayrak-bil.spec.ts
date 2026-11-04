import { test, expect, Page } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Bayrak Bil: ülke verisi ve bayrak dosyaları, üç mod, kıta filtresi, doğru/yanlış cevap, süreli mod,
// tur sonu ve skor kaydı, bozuk localStorage, klavye, 360px ve içerik.
const URL_PATH = '/oyunlar/bayrak-bil/';
const KEY = 'ba-oyun-bayrak-bil';
const ROOT = join(__dirname, '..', 'web');

type Country = { code: string; name: string; capital: string; continent: string };
// ulkeler.js içindeki satırlar: ['kod', "Ad", "Başkent", "Kıta"]
const SRC = readFileSync(join(ROOT, 'oyunlar', 'bayrak-bil', 'ulkeler.js'), 'utf8');
const COUNTRIES: Country[] = [...SRC.matchAll(/\['([a-z]{2})', "([^"]+)", "([^"]+)", "([^"]+)"\]/g)].map((m) => ({ code: m[1], name: m[2], capital: m[3], continent: m[4] }));

const phase = (page: Page) => page.locator('#oyun');
const store = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function start(page: Page, opts: { mod?: string; kita?: string; sayi?: string; sure?: string } = {}) {
  await page.goto(URL_PATH);
  await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
  if (opts.mod) await page.locator('#mod').selectOption(opts.mod);
  if (opts.kita) await page.locator('#kita').selectOption(opts.kita);
  if (opts.sayi) await page.locator('#soru-sayisi').selectOption(opts.sayi);
  if (opts.sure) await page.locator('#sure').selectOption(opts.sure);
  await page.locator('#baslat').click();
  await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
}

/** Ekrandaki sorunun doğru ülkesini bulur (mod'a göre bayrak dosyasından ya da soru metninden). */
async function currentCountry(page: Page, mod: string): Promise<Country> {
  if (mod === 'bayrak') {
    const code = await page.locator('#bayrak').getAttribute('data-code');
    return COUNTRIES.find((c) => c.code === code)!;
  }
  const q = (await page.locator('#soru-metin').textContent())!;
  const c = mod === 'baskent' ? COUNTRIES.find((x) => q.startsWith(x.name + ' ülkesinin')) : COUNTRIES.find((x) => q.startsWith(x.capital + ' hangi'));
  expect(c, `soru çözülemedi: ${q}`).toBeTruthy();
  return c!;
}

async function answer(page: Page, mod: string, correct: boolean) {
  const c = await currentCountry(page, mod);
  const right = mod === 'baskent' ? c.capital : c.name;
  const texts = await page.locator('#siklar .bg-t').allTextContents();
  const idx = texts.findIndex((t) => (t === right) === correct);
  expect(idx).toBeGreaterThanOrEqual(0);
  await page.locator('#siklar .bg-opt').nth(idx).click();
  return c;
}

test.describe('Bayrak Bil', () => {
  test('veri sağlam: 190+ ülke, benzersiz kod ve ad, altı kıta, her ülke için bayrak dosyası var', () => {
    expect(COUNTRIES.length).toBeGreaterThanOrEqual(190);
    expect(new Set(COUNTRIES.map((c) => c.code)).size).toBe(COUNTRIES.length);
    expect(new Set(COUNTRIES.map((c) => c.name)).size).toBe(COUNTRIES.length);
    expect(new Set(COUNTRIES.map((c) => c.capital)).size).toBe(COUNTRIES.length);
    expect(new Set(COUNTRIES.map((c) => c.continent)).size).toBe(6);
    for (const c of COUNTRIES) expect(existsSync(join(ROOT, 'vendor', 'flag-icons@7.6.0', 'flags', c.code + '.svg')), c.code).toBe(true);
    expect(existsSync(join(ROOT, 'vendor', 'flag-icons@7.6.0', 'LICENSE'))).toBe(true);
    expect(COUNTRIES.find((c) => c.code === 'tr')!.capital).toBe('Ankara');
  });

  test('sayfa açılır; dış istek ve sayfa hatası yok; bayrak görseli gerçekten yüklenir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await start(page);
    await expect(page.locator('h1')).toContainText('Bayrak Bil');
    await expect(page.locator('#bayrak-kutu')).toBeVisible();
    await expect.poll(() => page.locator('#bayrak').evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
    await expect(page.locator('#siklar .bg-opt:visible')).toHaveCount(4);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('bayraktan ülke: doğru cevap puan verir, yanlış cevap doğruyu gösterir, tur sonu skor yazılır', async ({ page }) => {
    await start(page, { mod: 'bayrak', sayi: '10' });
    // 1. soru doğru
    await answer(page, 'bayrak', true);
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await expect(page.locator('#puan')).toHaveText('10');
    await expect(page.locator('#siklar .is-correct')).toHaveCount(1);
    await page.locator('#sonraki').click();
    // 2. soru yanlış
    await answer(page, 'bayrak', false);
    await expect(page.locator('#geri-bildirim')).toContainText('Yanlış. Doğru cevap');
    await expect(page.locator('#siklar .is-wrong')).toHaveCount(1);
    await expect(page.locator('#seri')).toHaveText('0');
    await page.locator('#sonraki').click();
    for (let i = 2; i < 10; i++) {
      await answer(page, 'bayrak', true);
      await page.locator('#sonraki').click();
    }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-ozet')).toContainText('9');
    await expect(page.locator('#yanlislar li')).toHaveCount(1);
    const s = await store(page);
    expect(s.rounds).toBe(1);
    expect(s.answered).toBe(10);
    expect(s.correct).toBe(9);
    expect(s.best['bayrak-10']).toBeGreaterThan(0);
    // yeni tur başlatılabilir
    await page.locator('#tekrar').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
  });

  test('ülkeden başkent ve başkentten ülke modları doğru soruyu üretir', async ({ page }) => {
    await start(page, { mod: 'baskent', kita: 'Avrupa' });
    let c = await currentCountry(page, 'baskent');
    expect(c.continent).toBe('Avrupa');
    await expect(page.locator('#bayrak-kutu')).toBeHidden();
    await answer(page, 'baskent', true);
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await page.locator('#birak').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await page.locator('#ayara-don').click();
    await page.locator('#mod').selectOption('ulke');
    await page.locator('#kita').selectOption('Güney Amerika');
    await page.locator('#baslat').click();
    c = await currentCountry(page, 'ulke');
    expect(c.continent).toBe('Güney Amerika');
    const texts = await page.locator('#siklar .bg-t').allTextContents();
    expect(texts).toContain(c.name);
    expect(new Set(texts).size).toBe(4);
    await answer(page, 'ulke', true);
    await expect(page.locator('#puan')).toHaveText('10');
  });

  test('kıta filtresi: seçilen kıtadan olmayan ülke sorulmaz', async ({ page }) => {
    await start(page, { mod: 'bayrak', kita: 'Okyanusya', sayi: '10' });
    for (let i = 0; i < 10; i++) {
      const c = await currentCountry(page, 'bayrak');
      expect(c.continent).toBe('Okyanusya');
      await answer(page, 'bayrak', true);
      await page.locator('#sonraki').click();
    }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
  });

  test('süreli mod: süre çubuğu görünür; süre dolunca soru yanlış sayılır', async ({ page }) => {
    test.setTimeout(40_000);
    await start(page, { mod: 'baskent', sure: 'sureli' });
    await expect(page.locator('#sure-kutu')).toBeVisible();
    await expect(page.locator('#sure-yazi')).toHaveText(/1[0-5]/);
    await expect(page.locator('#geri-bildirim')).toContainText('Süre doldu', { timeout: 20_000 });
    await expect(page.locator('#siklar .is-correct')).toHaveCount(1);
    await expect(page.locator('#sonraki')).toBeVisible();
  });

  test('klavye: 1–4 tuşları şık seçer, odak Sonraki düğmesine geçer', async ({ page }) => {
    await start(page, { mod: 'bayrak' });
    await page.keyboard.press('2');
    await expect(page.locator('#siklar .bg-opt[disabled]')).toHaveCount(4);
    await expect(page.locator('#sonraki')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#sira')).toHaveText('2');
  });

  test('bozuk localStorage çökertmez ve skor kaydı yeniden başlar', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', '{"rounds":"a","best":{"bayrak-10":"z","../x":5},"last":"q","answered":-4}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await page.goto(URL_PATH);
      await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
      await page.locator('#baslat').click();
      await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
      await page.locator('#siklar .bg-opt').first().click();
      await page.locator('#birak').click();
      await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
      expect(errors).toEqual([]);
      await page.close();
    }
  });

  test('360px genişlikte taşma yok; içerik şartları: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await start(page, { mod: 'bayrak' });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-bayrak-bil-${s}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    await expect(page.locator('body')).toContainText('flag-icons');
  });
});
