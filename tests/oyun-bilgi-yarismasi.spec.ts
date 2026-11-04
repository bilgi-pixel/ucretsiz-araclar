import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Bilgi Yarışması: soru yükleme, doğru şık puanı, 50:50, tur sonu, istatistik, süreli mod, klavye, 360px, içerik.
const URL_PATH = '/oyunlar/bilgi-yarismasi/';
const STORE_KEY = 'ba-oyun-bilgi-yarismasi';
const KATEGORILER = ['tarih', 'coğrafya', 'bilim', 'spor', 'sanat', 'Türkçe', 'genel'];

type Soru = { soru: string; siklar: string[]; dogru: string; kategori: string; zorluk: number };
// Cevapları DOM'a koymuyoruz; test, soru metninden JSON dosyasında arama yapar.
const SORULAR: Soru[] = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'oyunlar', 'bilgi-yarismasi', 'sorular.json'), 'utf8'));
const byText = new Map(SORULAR.map((q) => [q.soru, q]));

const phase = (page: Page) => page.locator('#oyun');

async function openAndStart(page: Page, opts: { mod?: string; sayi?: string; kategori?: string; zorluk?: string } = {}) {
  await page.goto(URL_PATH);
  await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
  if (opts.mod) await page.locator('#mod').selectOption(opts.mod);
  if (opts.sayi) await page.locator('#soru-sayisi').selectOption(opts.sayi);
  if (opts.kategori) await page.locator('#kategori').selectOption(opts.kategori);
  if (opts.zorluk) await page.locator('#zorluk').selectOption(opts.zorluk);
  await page.locator('#baslat').click();
  await expect(phase(page)).toHaveAttribute('data-phase', 'soru');
}

/** Ekrandaki soruyu okuyup JSON'dan karşılığını bulur. */
async function currentQuestion(page: Page): Promise<Soru> {
  const text = (await page.locator('#soru').textContent())!.trim();
  const q = byText.get(text);
  expect(q, `soru JSON'da bulunamadı: ${text}`).toBeTruthy();
  return q!;
}

/** Soru için doğru (ya da yanlış) şıkkın ekrandaki sırasını döndürür. */
async function optionIndex(page: Page, q: Soru, correct: boolean): Promise<number> {
  const texts = await page.locator('#siklar .bg-t').allTextContents();
  const idx = texts.findIndex((t) => (t === q.dogru) === correct);
  expect(idx).toBeGreaterThanOrEqual(0);
  return idx;
}

async function answer(page: Page, correct: boolean) {
  const q = await currentQuestion(page);
  const idx = await optionIndex(page, q, correct);
  await page.locator('#siklar .bg-opt').nth(idx).click();
  await expect(phase(page)).toHaveAttribute('data-phase', 'cevaplandi');
  return q;
}

async function readStore(page: Page) {
  return page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
}

test.describe('Bilgi Yarışması', () => {
  test('soru dosyası sağlam: 300+ özgün soru, 4 benzersiz şık, 7 kategori, 3 zorluk', () => {
    expect(SORULAR.length).toBeGreaterThanOrEqual(300);
    const metinler = new Set<string>();
    for (const q of SORULAR) {
      expect(q.siklar.length, q.soru).toBe(4);
      expect(new Set(q.siklar).size, q.soru).toBe(4);
      expect(q.siklar, q.soru).toContain(q.dogru);
      expect(KATEGORILER, q.soru).toContain(q.kategori);
      expect([1, 2, 3], q.soru).toContain(q.zorluk);
      expect(metinler.has(q.soru), `yinelenen soru: ${q.soru}`).toBe(false);
      metinler.add(q.soru);
      expect(JSON.stringify(q)).not.toMatch(/milyoner/i);
    }
    for (const k of KATEGORILER) expect(SORULAR.filter((q) => q.kategori === k).length, k).toBeGreaterThanOrEqual(30);
  });

  test('sayfa açılır, sorular yüklenir (aynı origin), dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const jsonRes = page.waitForResponse((r) => r.url().endsWith('/oyunlar/bilgi-yarismasi/sorular.json'));
    await page.goto(URL_PATH);
    expect((await jsonRes).status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Bilgi Yarışması');
    await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
    expect(Number(await page.locator('#havuz-sayisi').textContent())).toBe(SORULAR.length);
    // Karışık + 7 kategori
    await expect(page.locator('#kategori option')).toHaveCount(8);
    await expect(page.locator('#soru-sayisi option')).toHaveText(['10 soru', '20 soru']);
    await expect(page.locator('#mod option')).toHaveCount(2);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('doğru şık puanı artırır, yanlış şık seriyi sıfırlar ve doğruyu gösterir', async ({ page }) => {
    await openAndStart(page);
    await expect(page.locator('#puan')).toHaveText('0');
    const q1 = await answer(page, true);
    expect(Number(await page.locator('#puan').textContent())).toBeGreaterThanOrEqual(q1.zorluk * 10);
    await expect(page.locator('#seri')).toHaveText('1');
    await expect(page.locator('#geri-bildirim')).toContainText('Doğru');
    await expect(page.locator('#siklar .is-correct')).toHaveCount(1);
    await expect(page.locator('#siklar .bg-opt:disabled')).toHaveCount(4);
    await expect(page.locator('#sonraki')).toBeFocused();
    // aynı soruya ikinci tıklama puan eklemez
    const before = await page.locator('#puan').textContent();
    await page.locator('#siklar .bg-opt').first().click({ force: true });
    await expect(page.locator('#puan')).toHaveText(before!);

    await page.locator('#sonraki').click();
    await expect(page.locator('#sira')).toHaveText('2');
    await expect(page.locator('#siklar .bg-opt:disabled')).toHaveCount(0);
    const q2 = await answer(page, false);
    await expect(page.locator('#puan')).toHaveText(before!);
    await expect(page.locator('#seri')).toHaveText('0');
    await expect(page.locator('#geri-bildirim')).toContainText('Yanlış');
    await expect(page.locator('#geri-bildirim')).toContainText(q2.dogru);
    await expect(page.locator('#siklar .is-wrong')).toHaveCount(1);
  });

  test('50:50 jokeri iki yanlış şıkkı gizler, doğru şık kalır, tur başına bir kez, puan yarıya iner', async ({ page }) => {
    await openAndStart(page);
    const q = await currentQuestion(page);
    await page.locator('#joker').click();
    await expect(page.locator('#siklar .bg-opt:visible')).toHaveCount(2);
    const kalan = await page.locator('#siklar .bg-opt:visible .bg-t').allTextContents();
    expect(kalan).toContain(q.dogru);
    await expect(page.locator('#joker')).toBeDisabled();
    await answer(page, true);
    expect(Number(await page.locator('#puan').textContent())).toBe(Math.ceil((q.zorluk * 10) / 2));
    // sonraki soruda joker hâlâ kullanılmış olmalı, tüm şıklar geri gelir
    await page.locator('#sonraki').click();
    await expect(page.locator('#siklar .bg-opt:visible')).toHaveCount(4);
    await expect(page.locator('#joker')).toBeDisabled();
  });

  test('10 soruluk klasik tur: sonuç ekranı, yanlış listesi, rekor ve istatistik kaydı, tekrar turu', async ({ page }) => {
    await openAndStart(page, { sayi: '10' });
    await expect(page.locator('#toplam')).toHaveText('10');
    for (let i = 0; i < 10; i++) {
      await answer(page, i !== 3); // 4. soruyu bilerek yanlış yap
      if (i < 9) await page.locator('#sonraki').click();
    }
    await expect(page.locator('#sonraki')).toHaveText('Sonucu gör');
    await page.locator('#sonraki').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    expect(Number(await page.locator('#sonuc-puan').textContent())).toBeGreaterThan(0);
    await expect(page.locator('#sonuc-ozet')).toContainText('9/10 doğru');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#yanlislar li')).toHaveCount(1);
    await expect(page.locator('#yanlislar li')).toContainText('Doğru cevap:');

    // localStorage: rekor ve istatistik
    const store = await readStore(page);
    expect(store.best).toBeGreaterThan(0);
    expect(store.stats.rounds).toBe(1);
    expect(store.stats.answered).toBe(10);
    expect(store.stats.correct).toBe(9);

    // yanlışı yeniden çöz: tek soruluk tekrar turu, istatistiğe yazılmaz
    await page.locator('#yanlis-coz').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'soru');
    await expect(page.locator('#toplam')).toHaveText('1');
    await expect(page.locator('#tur-etiketi')).toBeVisible();
    await answer(page, true);
    await page.locator('#sonraki').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    await expect(page.locator('#sonuc-en-yuksek')).toContainText('rekora yazılmaz');
    expect((await readStore(page)).stats.rounds).toBe(1);

    // ayarlara dön: istatistik özeti görünür
    await page.locator('#ayara-don').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
    await expect(page.locator('#istatistik')).toBeVisible();
    await expect(page.locator('#ist-tur')).toHaveText('1');
    await expect(page.locator('#ist-dogruluk')).toHaveText('%90');
    await expect(page.locator('#ist-kategori li').first()).toBeVisible();
  });

  test('20 soruluk tur ve kategori seçimi yalnızca o kategoriden soru getirir', async ({ page }) => {
    await openAndStart(page, { sayi: '20', kategori: 'bilim' });
    await expect(page.locator('#toplam')).toHaveText('20');
    for (let i = 0; i < 5; i++) {
      const q = await currentQuestion(page);
      expect(q.kategori).toBe('bilim');
      await expect(page.locator('#kategori-etiket')).toHaveText('Bilim');
      await answer(page, true);
      await page.locator('#sonraki').click();
    }
  });

  test('seçimde yeterli soru yoksa anlaşılır uyarı verir; tur uzunluğundan az soru varsa kısa turla başlar', async ({ page }) => {
    // Gerçek dosya her kategori/zorlukta en az 5 soru içerir; havuz sınırını denemek için aynı origin'deki JSON'u küçültüyoruz.
    const kucuk = [...SORULAR.filter((q) => q.kategori === 'tarih').slice(0, 6), ...SORULAR.filter((q) => q.kategori === 'bilim').slice(0, 3)];
    await page.route('**/oyunlar/bilgi-yarismasi/sorular.json', (route) => route.fulfill({ json: kucuk }));
    await page.goto(URL_PATH);
    await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
    await page.locator('#kategori').selectOption('bilim');
    await page.locator('#baslat').click();
    await expect(page.locator('#ayar-uyari')).toContainText('yeterli soru yok');
    await expect(page.locator('#ayar-uyari')).toContainText('Karışık');
    await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
    // 6 soruluk havuz, 10 soruluk tur: 6 soruyla başlar ve not düşer
    await page.locator('#kategori').selectOption('tarih');
    await page.locator('#baslat').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'soru');
    await expect(page.locator('#toplam')).toHaveText('6');
    await expect(page.locator('#ayar-uyari')).toContainText('6 soru var');
  });

  test('soru dosyası yüklenemezse çözüm öneren Türkçe hata gösterilir', async ({ page }) => {
    await page.route('**/oyunlar/bilgi-yarismasi/sorular.json', (route) => route.fulfill({ status: 500, body: 'hata' }));
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(phase(page)).toHaveAttribute('data-phase', 'hata');
    await expect(page.locator('#ekran-hata')).toContainText('Sorular yüklenemedi');
    await expect(page.locator('#ekran-hata')).toContainText('sayfayı yenileyin');
    await expect(page.locator('#baslat')).toBeHidden();
    expect(errors).toEqual([]);
  });

  test('klavye: 1-4 şık seçer, J jokeri kullanır, Enter ile sonraki soru', async ({ page }) => {
    await openAndStart(page);
    await page.keyboard.press('j');
    await expect(page.locator('#siklar .bg-opt:visible')).toHaveCount(2);
    // gizlenmiş şıkka karşılık gelen tuş etkisizdir; görünür ilk şıkkın tuşunu bul
    const gorunur = await page.locator('#siklar .bg-opt').evaluateAll((els) => els.map((e) => !(e as HTMLElement).hidden));
    const tus = String(gorunur.indexOf(true) + 1);
    await page.keyboard.press(tus);
    await expect(phase(page)).toHaveAttribute('data-phase', 'cevaplandi');
    await expect(page.locator('#sonraki')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(phase(page)).toHaveAttribute('data-phase', 'soru');
    await expect(page.locator('#sira')).toHaveText('2');
    // cevaplandıktan sonra rakam tuşu etki etmez
    await page.keyboard.press('2');
    await expect(phase(page)).toHaveAttribute('data-phase', 'cevaplandi');
    await page.keyboard.press('3');
    await expect(page.locator('#siklar .is-wrong, #siklar .is-correct')).not.toHaveCount(0);
  });

  test('süreli mod: sayaç görünür, süre dolunca soru yanlış sayılır ve sonraki ilerler', async ({ page }) => {
    await page.clock.install();
    await page.goto(URL_PATH);
    await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
    await page.locator('#mod').selectOption('sureli');
    await page.locator('#baslat').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'soru');
    await expect(page.locator('#sure-kutu')).toBeVisible();
    await expect(page.locator('#sure-yazi')).toHaveText('15');
    await page.clock.runFor(5200);
    expect(Number(await page.locator('#sure-yazi').textContent())).toBeLessThanOrEqual(10);
    await page.clock.runFor(10500);
    await expect(phase(page)).toHaveAttribute('data-phase', 'cevaplandi');
    await expect(page.locator('#geri-bildirim')).toContainText('Süre doldu');
    await expect(page.locator('#siklar .is-correct')).toHaveCount(1);
    await expect(page.locator('#seri')).toHaveText('0');
    await page.locator('#sonraki').click();
    await expect(page.locator('#sira')).toHaveText('2');
    await expect(page.locator('#sure-yazi')).toHaveText('15');
  });

  test('süreli modda hızlı doğru cevap süre bonusu verir', async ({ page }) => {
    await openAndStart(page, { mod: 'sureli' });
    const q = await answer(page, true);
    // temel + (en az 13 sn kalan) bonus
    expect(Number(await page.locator('#puan').textContent())).toBeGreaterThanOrEqual(q.zorluk * 10 + 10);
    await expect(page.locator('#geri-bildirim')).toContainText('süre');
  });

  test('istatistik sıfırlama iki adımlı onay ister', async ({ page }) => {
    await openAndStart(page, { sayi: '10' });
    for (let i = 0; i < 10; i++) {
      await answer(page, true);
      await page.locator('#sonraki').click();
    }
    await page.locator('#ayara-don').click();
    await expect(page.locator('#istatistik')).toBeVisible();
    await page.locator('#ist-sifirla').click();
    await expect(page.locator('#ist-sifirla')).toContainText('Emin misiniz');
    await expect(page.locator('#istatistik')).toBeVisible();
    await page.locator('#ist-sifirla').click();
    await expect(page.locator('#istatistik')).toBeHidden();
    expect((await readStore(page)).best).toBe(0);
  });

  test('360px: üç ekranda yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await expect(phase(page)).toHaveAttribute('data-phase', 'ayar');
    const taşma = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(await taşma()).toBeLessThanOrEqual(0);
    await page.locator('#baslat').click();
    await expect(phase(page)).toHaveAttribute('data-phase', 'soru');
    expect(await taşma()).toBeLessThanOrEqual(0);
    const kutu = await page.locator('#oyun').boundingBox();
    expect(kutu!.x).toBeGreaterThanOrEqual(0);
    expect(kutu!.x + kutu!.width).toBeLessThanOrEqual(360);
    for (const b of await page.locator('#siklar .bg-opt').all()) {
      const r = await b.boundingBox();
      expect(r!.x + r!.width).toBeLessThanOrEqual(360);
      expect(r!.height).toBeGreaterThanOrEqual(44);
    }
    // turu hızlıca bitirip sonuç ekranını da ölç
    for (let i = 0; i < 10; i++) {
      await answer(page, i % 2 === 0);
      await page.locator('#sonraki').click();
    }
    await expect(phase(page)).toHaveAttribute('data-phase', 'sonuc');
    expect(await taşma()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥800 kelime, 3 reklam alanı doğru yerde, SSS ≥6 ve FAQPage, ilgili oyunlar', async ({ page }) => {
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    const kelime = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(kelime).toBeGreaterThanOrEqual(800);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-bilgi-yarismasi-a', 'oyun-bilgi-yarismasi-b', 'oyun-bilgi-yarismasi-c']);
    // reklam A oyun kutusunun dışında ve altında; hiçbir reklam oyun kutusunun içinde değil
    await expect(page.locator('#oyun .ba-ad')).toHaveCount(0);
    const aSonra = await page.evaluate(() => {
      const box = document.getElementById('oyun')!;
      const ad = document.querySelector('[data-slot="oyun-bilgi-yarismasi-a"]')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(aSonra).toBe(true);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(ld!)['@graph'];
    const faq = graph.find((g: { '@type': string }) => g['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(graph.find((g: { '@type': string }) => g['@type'] === 'SoftwareApplication').applicationCategory).toBe('Game');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/bilgi-yarismasi/');
    await expect(page.locator('.ba-related a[href="../dizi-hafiza/"]')).toBeVisible();
    await expect(page.locator('.ba-badges')).toContainText('Kayıt yok');
  });
});
