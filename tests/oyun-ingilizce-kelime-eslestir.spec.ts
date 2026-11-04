import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// İngilizce Kelime Eşleştir: veri bütünlüğü, üç mod, seviye filtresi, yanlışları tekrar, rekor, bozuk kayıt, 360px, içerik.
const URL_PATH = '/oyunlar/ingilizce-kelime-eslestir/';
const KEY = 'ba-oyun-ingilizce-kelime-eslestir';
const ROOT = join(__dirname, '..', 'web');

type Word = { level: string; en: string; tr: string };
// kelimeler.js satırları: ["A1", "cat", "kedi"],
const SRC = readFileSync(join(ROOT, 'oyunlar', 'ingilizce-kelime-eslestir', 'kelimeler.js'), 'utf8');
const WORDS: Word[] = [...SRC.matchAll(/^\["(A1|A2|B1|B2)", "([^"]+)", "([^"]+)"\],$/gm)].map((m) => ({ level: m[1], en: m[2], tr: m[3] }));

const phase = (page: Page) => page.locator('#oyun');
const store = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function start(page: Page, opts: { mod?: string; seviye?: string; sayi?: string; yon?: string } = {}) {
  await page.goto(URL_PATH);
  await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
  if (opts.mod) await page.locator('#mod').selectOption(opts.mod);
  if (opts.seviye) await page.locator('#seviye').selectOption(opts.seviye);
  if (opts.sayi) await page.locator('#soru-sayisi').selectOption(opts.sayi);
  if (opts.yon) await page.locator('#yon').selectOption(opts.yon);
  await page.locator('#baslat').click();
  await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
}

/** 4 şıklı / yazarak modda ekrandaki sözcüğü bulur. */
async function currentWord(page: Page): Promise<Word> {
  const q = (await page.locator('#soru-metin').textContent())!;
  const m = q.match(/“(.+)”/);
  expect(m, `soru çözülemedi: ${q}`).toBeTruthy();
  const w = WORDS.find((x) => x.en === m![1] || x.tr === m![1]);
  expect(w, m![1]).toBeTruthy();
  return w!;
}
async function answerChoice(page: Page, dir: 'en-tr' | 'tr-en', correct: boolean) {
  const w = await currentWord(page);
  const right = dir === 'en-tr' ? w.tr : w.en;
  const texts = await page.locator('#siklar .bg-t').allTextContents();
  const idx = texts.findIndex((t) => (t === right) === correct);
  expect(idx).toBeGreaterThanOrEqual(0);
  await page.locator('#siklar .bg-opt').nth(idx).click();
  return w;
}
/** Eşleştirme tahtasındaki tüm çiftleri çözer; wrongFirst true ise önce bir yanlış eşleşme dener. */
async function solveBoard(page: Page, wrongFirst = false) {
  const enTexts = await page.locator('#kart-en .ke-card').allTextContents();
  if (wrongFirst) {
    const trTexts = await page.locator('#kart-tr .ke-card').allTextContents();
    const w0 = WORDS.find((x) => x.en === enTexts[0])!;
    const badIdx = trTexts.findIndex((t) => t !== w0.tr);
    await page.locator('#kart-en .ke-card').nth(0).click();
    await page.locator('#kart-tr .ke-card').nth(badIdx).click();
    await expect(page.locator('#geri-bildirim')).toContainText('Yanlış eşleşme');
  }
  for (const en of enTexts) {
    const w = WORDS.find((x) => x.en === en)!;
    const trTexts = await page.locator('#kart-tr .ke-card').allTextContents();
    await page.locator('#kart-en .ke-card').nth(enTexts.indexOf(en)).click();
    await page.locator('#kart-tr .ke-card').nth(trTexts.indexOf(w.tr)).click();
  }
}

test.describe('İngilizce Kelime Eşleştir', () => {
  test('veri sağlam: 400+ çift, dört seviye, İngilizce ve Türkçe sütunlar benzersiz', () => {
    expect(WORDS.length).toBeGreaterThanOrEqual(400);
    for (const l of ['A1', 'A2', 'B1', 'B2']) expect(WORDS.filter((w) => w.level === l).length, l).toBeGreaterThanOrEqual(80);
    expect(new Set(WORDS.map((w) => w.en.toLowerCase())).size).toBe(WORDS.length);
    expect(new Set(WORDS.map((w) => w.tr.toLowerCase())).size).toBe(WORDS.length);
    for (const w of WORDS) { expect(w.en.trim(), w.en).toBe(w.en); expect(w.tr.trim(), w.tr).toBe(w.tr); expect(w.en).not.toBe(w.tr === w.en ? '' : '\u0000'); }
  });

  test('sayfa açılır; dış istek ve sayfa hatası yok; seviye listesi dolu', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('İngilizce Kelime Eşleştir');
    await expect(page.locator('#seviye option')).toHaveCount(5);
    await expect(page.locator('#mod option')).toHaveCount(3);
    await page.locator('#mod').selectOption('sik');
    await page.locator('#baslat').click();
    await expect(page.locator('#siklar .bg-opt:visible')).toHaveCount(4);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('4 şıklı test (İngilizce→Türkçe): doğru cevap puan verir, yanlış doğruyu gösterir, skor yazılır', async ({ page }) => {
    await start(page, { mod: 'sik', sayi: '10' });
    await answerChoice(page, 'en-tr', true);
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await expect(page.locator('#puan')).toHaveText('10');
    await page.locator('#sonraki').click();
    const bad = await answerChoice(page, 'en-tr', false);
    await expect(page.locator('#geri-bildirim')).toContainText(`Doğru cevap: ${bad.tr}`);
    await expect(page.locator('#seri')).toHaveText('0');
    await expect(page.locator('#siklar .is-wrong')).toHaveCount(1);
    await page.locator('#sonraki').click();
    for (let i = 2; i < 10; i++) { await answerChoice(page, 'en-tr', true); await page.locator('#sonraki').click(); }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-ozet')).toContainText('9');
    await expect(page.locator('#yanlislar li')).toHaveCount(1);
    const s = await store(page);
    expect(s.rounds).toBe(1);
    expect(s.answered).toBe(10);
    expect(s.correct).toBe(9);
    expect(s.best['sik-10']).toBeGreaterThan(0);
    expect(s.wrong).toEqual([bad.en]);
  });

  test('Türkçe→İngilizce yönü ve klavye: 1-4 tuşları çalışır, dört şık benzersizdir', async ({ page }) => {
    await start(page, { mod: 'sik', yon: 'tr-en' });
    const w = await currentWord(page);
    const texts = await page.locator('#siklar .bg-t').allTextContents();
    expect(new Set(texts).size).toBe(4);
    expect(texts).toContain(w.en);
    await page.keyboard.press(String(texts.indexOf(w.en) + 1));
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await expect(page.locator('#sonraki')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#sira')).toHaveText('2');
  });

  test('eşleştirme kartları: yanlış eşleşme seriyi sıfırlar, tüm tahtalar bitince tur sonuçlanır ve rekor yazılır', async ({ page }) => {
    await start(page, { mod: 'kart', sayi: '10' });
    await expect(page.locator('#kart-en .ke-card')).toHaveCount(5);
    await expect(page.locator('#kart-tr .ke-card')).toHaveCount(5);
    await solveBoard(page, true);
    await expect(page.locator('#sira')).toHaveText('5');
    await expect(page.locator('#kart-en .is-matched')).toHaveCount(5);
    await page.locator('#sonraki').click();
    await expect(page.locator('#kart-en .ke-card:not(:disabled)')).toHaveCount(5);
    await solveBoard(page);
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#yanlislar li')).toHaveCount(1);
    const s = await store(page);
    expect(s.correct).toBe(10);
    expect(s.answered).toBe(11);
    expect(s.best['kart-10']).toBeGreaterThan(0);
    expect(s.wrong).toEqual([]); // yanlış denenen sözcük sonradan doğru eşleşince kayıtlı yanlışlardan çıkar
  });

  test('yazarak mod: büyük küçük harf ve boşluk önemsenmez; yanlışta doğrusu gösterilir; boş cevap uyarılır', async ({ page }) => {
    await start(page, { mod: 'yaz', sayi: '10' });
    let w = await currentWord(page);
    await page.locator('#yaz-gonder').click();
    await expect(page.locator('#geri-bildirim')).toContainText('Önce bir sözcük yazın');
    await page.locator('#yaz-girdi').fill('  ' + w.en.toUpperCase() + ' ');
    await page.keyboard.press('Enter');
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru!');
    await expect(page.locator('#puan')).toHaveText('10');
    await page.locator('#sonraki').click();
    w = await currentWord(page);
    await page.locator('#yaz-girdi').fill('zzzz');
    await page.locator('#yaz-gonder').click();
    await expect(page.locator('#geri-bildirim')).toContainText(`Doğrusu: ${w.en}`);
    await expect(page.locator('#seri')).toHaveText('0');
    await page.locator('#birak').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#yanlislar li')).toHaveCount(1);
  });

  test('seviye filtresi: A1 seçilince yalnızca A1 sözcükleri sorulur', async ({ page }) => {
    await start(page, { mod: 'sik', seviye: 'A1', sayi: '10' });
    for (let i = 0; i < 10; i++) {
      const w = await currentWord(page);
      expect(w.level).toBe('A1');
      await answerChoice(page, 'en-tr', true);
      await page.locator('#sonraki').click();
    }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
  });

  test('yanlışları tekrar: tur sonu düğmesi ve kayıtlı yanlışlar yalnızca yanlış kelimeleri sorar', async ({ page }) => {
    await start(page, { mod: 'sik', seviye: 'B1', sayi: '10' });
    const bad = await answerChoice(page, 'en-tr', false);
    await page.locator('#sonraki').click();
    await page.locator('#birak').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#yanlis-tekrar')).toBeVisible();
    await page.locator('#yanlis-tekrar').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#toplam')).toHaveText('1');
    expect((await currentWord(page)).en).toBe(bad.en);
    await answerChoice(page, 'en-tr', true);
    await page.locator('#sonraki').click(); // tek soruluk tur biter
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-rekor')).toBeHidden();
    // doğru bilinen kelime kayıtlı yanlışlardan çıkar
    expect((await store(page)).wrong).toEqual([]);
    // sayfa yenilenince kayıtlı yanlışlar düğmesi görünür (yeni yanlış üretelim)
    await page.locator('#ayara-don').click();
    await page.locator('#baslat').click();
    const bad2 = await answerChoice(page, 'en-tr', false);
    await page.locator('#birak').click();
    await page.reload();
    await expect(page.locator('#yanlis-calis')).toBeVisible();
    await expect(page.locator('#yanlis-sayi')).toHaveText('1');
    await page.locator('#mod').selectOption('sik');
    await page.locator('#yanlis-calis').click();
    expect((await currentWord(page)).en).toBe(bad2.en);
  });

  test('bozuk localStorage çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', '{"rounds":"a","best":{"sik-10":"z","../x":5},"last":"q","answered":-4,"wrong":["yok-boyle-kelime",5,"cat"]}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await page.goto(URL_PATH);
      await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
      await page.locator('#mod').selectOption('sik');
      await page.locator('#baslat').click();
      await page.locator('#siklar .bg-opt').first().click();
      await page.locator('#birak').click();
      await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
      expect(errors).toEqual([]);
      await page.close();
    }
  });

  test('360px taşma yok (üç mod); içerik: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    for (const mod of ['kart', 'sik', 'yaz']) {
      await start(page, { mod });
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, mod).toBeLessThanOrEqual(0);
    }
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-ingilizce-kelime-eslestir-${s}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
  });
});
