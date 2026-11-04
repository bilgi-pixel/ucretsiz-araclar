import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Türkiye İl Bil: veri bütünlüğü, dört soru türü, bölge filtresi, süreli mod (sahte saat), rekor, klavye, bozuk kayıt, 360px, içerik.
const URL_PATH = '/oyunlar/turkiye-il-bil/';
const KEY = 'ba-oyun-turkiye-il-bil';
const ROOT = join(__dirname, '..', 'web');

type Il = { code: number; name: string; region: string; nb: string[] };
// iller.js satırları: [34, "İstanbul", "Marmara", "Kocaeli,Tekirdağ,Kırklareli"],
const SRC = readFileSync(join(ROOT, 'oyunlar', 'turkiye-il-bil', 'iller.js'), 'utf8');
const ILLER: Il[] = [...SRC.matchAll(/^\[(\d+), "([^"]+)", "([^"]+)", "([^"]*)"\],$/gm)].map((m) => ({ code: Number(m[1]), name: m[2], region: m[3], nb: m[4] ? m[4].split(',') : [] }));
const byName = (n: string) => ILLER.find((x) => x.name === n)!;
const byCode = (c: number) => ILLER.find((x) => x.code === c)!;

const phase = (page: Page) => page.locator('#oyun');
const store = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function start(page: Page, opts: { mod?: string; kapsam?: string; sayi?: string; sure?: string } = {}) {
  await page.goto(URL_PATH);
  await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
  if (opts.mod) await page.locator('#mod').selectOption(opts.mod);
  if (opts.kapsam) await page.locator('#kapsam').selectOption(opts.kapsam);
  if (opts.sayi) await page.locator('#soru-sayisi').selectOption(opts.sayi);
  if (opts.sure) await page.locator('#sure').selectOption(opts.sure);
  await page.locator('#baslat').click();
  await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
}

/** Ekrandaki sorunun doğru şık metnini ve soru türünü soru cümlesinden çözer. */
async function solve(page: Page): Promise<{ type: string; right: (label: string) => boolean; il: Il }> {
  const q = (await page.locator('#soru-metin').textContent())!;
  let m: RegExpMatchArray | null;
  if ((m = q.match(/^(\d+) plaka kodu hangi ile aittir\?$/))) { const il = byCode(Number(m[1])); return { type: 'plaka', il, right: (l) => l === il.name }; }
  if ((m = q.match(/^(.+) ilinin plaka kodu nedir\?$/))) { const il = byName(m[1]); return { type: 'ilplaka', il, right: (l) => l === String(il.code) }; }
  if ((m = q.match(/^(.+) hangi coğrafi bölgededir\?$/))) { const il = byName(m[1]); return { type: 'bolge', il, right: (l) => l === il.region }; }
  if ((m = q.match(/^(.+) ile sınır komşusu olan il hangisidir\?$/))) { const il = byName(m[1]); return { type: 'komsu', il, right: (l) => il.nb.includes(l) }; }
  throw new Error('soru çözülemedi: ' + q);
}
async function answer(page: Page, correct: boolean) {
  const s = await solve(page);
  const texts = await page.locator('#siklar .bg-t').allTextContents();
  const idx = texts.findIndex((t) => s.right(t) === correct);
  expect(idx, `${s.type}: şıklar ${texts.join('|')}`).toBeGreaterThanOrEqual(0);
  // yalnızca tek doğru şık olmalı (komşu sorularında yanlış şıkların hiçbiri komşu olmamalı)
  expect(texts.filter((t) => s.right(t)).length).toBe(1);
  await page.locator('#siklar .bg-opt').nth(idx).click();
  return s;
}

test.describe('Türkiye İl Bil', () => {
  test('veri sağlam: 81 il, plaka 1-81, yedi bölge, komşuluk karşılıklı, veri.json ile aynı adlar', () => {
    expect(ILLER.length).toBe(81);
    expect(ILLER.map((x) => x.code)).toEqual(Array.from({ length: 81 }, (_, i) => i + 1));
    expect(new Set(ILLER.map((x) => x.name)).size).toBe(81);
    expect(new Set(ILLER.map((x) => x.region)).size).toBe(7);
    const regions: Record<string, number> = {};
    ILLER.forEach((x) => { regions[x.region] = (regions[x.region] || 0) + 1; });
    expect(regions).toEqual({ 'Marmara': 11, 'Ege': 8, 'Akdeniz': 8, 'İç Anadolu': 13, 'Karadeniz': 18, 'Doğu Anadolu': 14, 'Güneydoğu Anadolu': 9 });
    for (const il of ILLER) {
      expect(il.nb.length, il.name).toBeGreaterThanOrEqual(2);
      for (const n of il.nb) {
        const o = ILLER.find((x) => x.name === n);
        expect(o, `${il.name} komşusu ${n} listede yok`).toBeTruthy();
        expect(o!.nb, `${n} -> ${il.name} karşılıklı değil`).toContain(il.name);
        expect(n).not.toBe(il.name);
      }
      expect(new Set(il.nb).size).toBe(il.nb.length);
    }
    const veri = JSON.parse(readFileSync(join(ROOT, 'uzaklik-hesapla', 'veri.json'), 'utf8')).iller as { plaka: number; ad: string }[];
    for (const v of veri) expect(byCode(v.plaka).name).toBe(v.ad);
    expect(byCode(34).name).toBe('İstanbul');
    expect(byName('Ankara').region).toBe('İç Anadolu');
  });

  test('sayfa açılır; dış istek ve sayfa hatası yok; çalışma listesi 81 il içerir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Türkiye İl Bil');
    await expect(page.locator('#il-liste li')).toHaveCount(81);
    await expect(page.locator('#il-liste li').first()).toHaveText('01 Adana – Akdeniz');
    await expect(page.locator('#kapsam option')).toHaveCount(8);
    await page.locator('#baslat').click();
    await expect(page.locator('#siklar .bg-opt:visible')).toHaveCount(4);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('plakadan il: doğru cevap puan verir, yanlış doğruyu ve bilgiyi gösterir, tur sonu skor yazılır', async ({ page }) => {
    await start(page, { mod: 'plaka', sayi: '10' });
    await answer(page, true);
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await expect(page.locator('#puan')).toHaveText('10');
    await expect(page.locator('#bilgi')).toBeVisible();
    await expect(page.locator('#siklar .is-correct')).toHaveCount(1);
    await page.locator('#sonraki').click();
    const bad = await solve(page);
    await answer(page, false);
    await expect(page.locator('#geri-bildirim')).toContainText(`Doğru cevap: ${bad.il.name}`);
    await expect(page.locator('#seri')).toHaveText('0');
    await expect(page.locator('#siklar .is-wrong')).toHaveCount(1);
    await page.locator('#sonraki').click();
    for (let i = 2; i < 10; i++) { await answer(page, true); await page.locator('#sonraki').click(); }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-ozet')).toContainText('9');
    await expect(page.locator('#yanlislar li')).toHaveCount(1);
    const s = await store(page);
    expect(s.rounds).toBe(1);
    expect(s.answered).toBe(10);
    expect(s.correct).toBe(9);
    expect(s.best['plaka-10']).toBeGreaterThan(0);
    await page.locator('#tekrar').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
  });

  test('ilden plaka, bölge ve komşu modları doğru soruyu üretir; komşu şıklarında tek doğru vardır', async ({ page }) => {
    for (const [mod, type] of [['ilplaka', 'ilplaka'], ['bolge', 'bolge'], ['komsu', 'komsu']]) {
      await start(page, { mod, sayi: '20' });
      for (let i = 0; i < 6; i++) {
        const s = await solve(page);
        expect(s.type).toBe(type);
        const texts = await page.locator('#siklar .bg-t').allTextContents();
        expect(new Set(texts).size).toBe(4);
        await answer(page, true);
        await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
        await page.locator('#sonraki').click();
      }
    }
  });

  test('karışık mod dört türü de üretir; bölge filtresi seçilen bölge dışındaki ili sormaz', async ({ page }) => {
    await start(page, { mod: 'karisik', kapsam: 'Ege', sayi: '20' });
    const seen = new Set<string>();
    for (let i = 0; i < 8; i++) {
      const s = await solve(page);
      expect(s.il.region).toBe('Ege');
      seen.add(s.type);
      await answer(page, true);
      await page.locator('#sonraki').click();
    }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc'); // Ege'de yalnızca 8 il var
    expect(await store(page)).toMatchObject({ answered: 8, correct: 8 });
    expect(seen.size).toBeGreaterThanOrEqual(2);
  });

  test('süreli mod: süre dolunca soru yanlış sayılır (sahte saat); seri bonusu işler', async ({ page }) => {
    await page.clock.install();
    await start(page, { mod: 'plaka', sure: 'sureli' });
    await expect(page.locator('#sure-kutu')).toBeVisible();
    await answer(page, true);
    await expect(page.locator('#puan')).toHaveText(/^(1[0-9]|20)$/); // 10 + kalan saniye bonusu (en çok 10)
    await page.locator('#sonraki').click();
    await page.clock.runFor(16_000);
    await expect(page.locator('#geri-bildirim')).toContainText('Süre doldu');
    await expect(page.locator('#siklar .is-correct')).toHaveCount(1);
    await expect(page.locator('#seri')).toHaveText('0');
    await page.locator('#birak').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    expect(await store(page)).toMatchObject({ rounds: 1, answered: 2, correct: 1 });
  });

  test('rekor yalnızca aşılınca güncellenir; klavye 1-4 çalışır', async ({ page }) => {
    await start(page, { mod: 'bolge', sayi: '10' });
    for (let i = 0; i < 10; i++) {
      const s = await solve(page);
      const texts = await page.locator('#siklar .bg-t').allTextContents();
      await page.keyboard.press(String(texts.findIndex((t) => s.right(t)) + 1));
      await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
      await expect(page.locator('#sonraki')).toBeFocused();
      await page.keyboard.press('Enter');
    }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    const first = (await store(page)).best['bolge-10'];
    expect(first).toBeGreaterThan(0);
    await page.locator('#tekrar').click();
    await answer(page, false);
    await page.locator('#birak').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-rekor')).toBeHidden();
    expect((await store(page)).best['bolge-10']).toBe(first);
  });

  test('bozuk localStorage çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', '{"rounds":"a","best":{"plaka-10":"z","../x":5},"last":"q","answered":-4}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await page.goto(URL_PATH);
      await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
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
    await start(page, { mod: 'karisik' });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-turkiye-il-bil-${s}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
  });
});
