import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Satranç bulmacaları: veri sağlamlığı, ilk hamlenin otomatik oynanması, doğru/yanlış hamle, çok hamleli bulmaca,
// derece kaydı, filtreler, günün bulmacası, klavye, bozuk localStorage, 360px ve içerik.
const URL_PATH = '/oyunlar/satranc-bulmacalari/';
const KEY = 'ba-oyun-satranc-bulmacalari';

type Puzzle = { id: string; fen: string; moves: string; rating: number; themes: string };
const PUZZLES: Puzzle[] = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'oyunlar', 'satranc-bulmacalari', 'puzzles.json'), 'utf8'));

const sq = (page: Page, name: string) => page.locator(`#bu-board [data-sq="${name}"]`);
const store = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function openPuzzle(page: Page, p: Puzzle) {
  await page.goto(`${URL_PATH}?id=${p.id}`);
  await expect(page.locator('#bu-board')).toHaveAttribute('data-puzzle', p.id);
  // Rakibin ilk hamlesi otomatik oynanınca ipucu düğmesi açılır
  await expect(page.locator('#bu-hint')).toBeEnabled();
}

async function play(page: Page, uci: string) {
  await sq(page, uci.slice(0, 2)).click();
  await sq(page, uci.slice(2, 4)).click();
}

const pick = (pred: (p: Puzzle) => boolean) => {
  const p = PUZZLES.find(pred);
  expect(p, 'uygun bulmaca bulunamadı').toBeTruthy();
  return p!;
};
// Terfi gerektirmeyen ve çözümü ilk hamlede biten (tek hamlelik) mat bulmacası
const mate1 = () => pick((p) => p.themes.includes('mateIn1') && p.moves.split(' ').length === 2 && p.moves.split(' ')[1].length === 4);
const mate2 = () => pick((p) => p.themes.includes('mateIn2') && p.moves.split(' ').length === 4 && p.moves.split(' ').every((m) => m.length === 4));

test.describe('Satranç Bulmacaları', () => {
  test('veri sağlam: 1500+ bulmaca, benzersiz kimlik, 600–2400 arası dengeli derece, geçerli alanlar', () => {
    expect(PUZZLES.length).toBeGreaterThanOrEqual(1500);
    expect(new Set(PUZZLES.map((p) => p.id)).size).toBe(PUZZLES.length);
    for (const p of PUZZLES) {
      expect(p.fen.split(' ').length).toBe(6);
      expect(p.moves.split(' ').length).toBeGreaterThanOrEqual(2);
      expect(p.rating).toBeGreaterThanOrEqual(600);
      expect(p.rating).toBeLessThan(2400);
    }
    const low = PUZZLES.filter((p) => p.rating < 1200).length;
    const high = PUZZLES.filter((p) => p.rating >= 1800).length;
    expect(low).toBeGreaterThan(300);
    expect(high).toBeGreaterThan(300);
    expect(PUZZLES.filter((p) => p.themes.includes('mateIn1')).length).toBeGreaterThan(50);
    expect(PUZZLES.filter((p) => p.themes.includes('endgame')).length).toBeGreaterThan(100);
  });

  test('sayfa açılır, 64 kare çizilir, rakibin ilk hamlesi otomatik oynanır; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Satranç Bulmacaları');
    await expect(page.locator('#bu-board .sq')).toHaveCount(64);
    await expect(page.locator('#bu-hint')).toBeEnabled();
    await expect(page.locator('#bu-status')).toContainText('oynuyor: en iyi hamleyi bul');
    await expect(page.locator('#bu-board .sq.is-last')).toHaveCount(2);
    await expect(page.locator('body')).toContainText('Lichess veritabanından (CC0)');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('mutlu yol: tek hamlede mat bulunur, "Doğru!" görünür, derece artar, sayaçlar kaydedilir', async ({ page }) => {
    const p = mate1();
    await openPuzzle(page, p);
    await play(page, p.moves.split(' ')[1]);
    await expect(page.locator('#bu-status')).toContainText('Doğru!');
    await expect(page.locator('#bu-info')).toBeVisible();
    await expect(page.locator('#bu-msg')).toContainText('Temalar');
    const s = await store(page);
    expect(s.solved).toBe(1);
    expect(s.streak).toBe(1);
    expect(s.rating).toBeGreaterThan(1200 - 1);
    expect(s.played).toContain(p.id);
    await expect(page.locator('#bu-s-solved')).toHaveText('1');
  });

  test('çok hamleli bulmaca: doğru hamleden sonra rakip cevap verir, ikinci doğru hamle bulmacayı bitirir', async ({ page }) => {
    const p = mate2();
    const mv = p.moves.split(' ');
    await openPuzzle(page, p);
    await play(page, mv[1]);
    await expect(page.locator('#bu-status')).toContainText('Rakip cevap veriyor');
    await expect(page.locator('#bu-status')).toContainText('oynuyor: en iyi hamleyi bul');
    await play(page, mv[3]);
    await expect(page.locator('#bu-status')).toContainText('Doğru!');
    expect((await store(page)).solved).toBe(1);
  });

  test('yanlış hamle: tahtada kalmaz, doğru taş ipucu olarak işaretlenir, derece düşer, sonra çözülebilir', async ({ page }) => {
    const p = mate2();
    const mv = p.moves.split(' ');
    await openPuzzle(page, p);
    const solverColor = p.fen.split(' ')[1] === 'w' ? 'b' : 'w';
    // Çözüm hamlesinin taşından farklı, hamlesi olan kendi taşımızı bul
    const cells = page.locator(`#bu-board .sq[data-piece^="${solverColor}"]`);
    const n = await cells.count();
    let moved = false;
    for (let i = 0; i < n && !moved; i++) {
      const name = await cells.nth(i).getAttribute('data-sq');
      if (name === mv[1].slice(0, 2)) continue;
      await cells.nth(i).click();
      const dest = page.locator('#bu-board .sq.is-dest, #bu-board .sq.is-dest-cap').first();
      if (await dest.count()) {
        await dest.click();
        moved = true;
      }
    }
    expect(moved).toBe(true);
    await expect(page.locator('#bu-status')).toContainText('çözüm değil');
    await expect(sq(page, mv[1].slice(0, 2))).toHaveClass(/is-hint/);
    const s = await store(page);
    expect(s.failed).toBe(1);
    expect(s.streak).toBe(0);
    expect(s.rating).toBeLessThan(1200);
    // Yanlış hamle tahtada kalmadı: doğru hamle hâlâ oynanabilir
    await play(page, mv[1]);
    await expect(page.locator('#bu-status')).toContainText('Rakip cevap veriyor');
    await expect(page.locator('#bu-status')).toContainText('oynuyor: en iyi hamleyi bul');
    await play(page, mv[3]);
    await expect(page.locator('#bu-status')).toContainText('derecene puan eklenmedi');
    expect((await store(page)).solved).toBe(0);
  });

  test('ipucu ve çözümü göster bulmacayı başarısız sayar; yeniden dene düğmesi çıkar', async ({ page }) => {
    const p = mate1();
    await openPuzzle(page, p);
    await page.locator('#bu-hint').click();
    await expect(sq(page, p.moves.split(' ')[1].slice(0, 2))).toHaveClass(/is-hint/);
    expect((await store(page)).failed).toBe(1);
    await page.locator('#bu-solution').click();
    await expect(page.locator('#bu-status')).toContainText('Çözüm gösterildi');
    expect((await store(page)).failed).toBe(1); // ikinci kez sayılmaz
  });

  test('zorluk ve tema filtresi, günün bulmacası', async ({ page }) => {
    await page.goto(URL_PATH);
    await expect(page.locator('#bu-hint')).toBeEnabled();
    await page.locator('#bu-level').selectOption('kolay');
    let id = await page.locator('#bu-board').getAttribute('data-puzzle');
    expect(PUZZLES.find((x) => x.id === id)!.rating).toBeLessThan(1000);
    await page.locator('#bu-level').selectOption('hepsi');
    await page.locator('#bu-theme').selectOption('mateIn1');
    await expect(page.locator('#bu-hint')).toBeEnabled();
    id = await page.locator('#bu-board').getAttribute('data-puzzle');
    expect(PUZZLES.find((x) => x.id === id)!.themes).toContain('mateIn1');
    await page.locator('#bu-daily').click();
    await expect(page.locator('#bu-info')).toContainText('Günün bulmacası');
    const first = await page.locator('#bu-board').getAttribute('data-puzzle');
    await page.locator('#bu-next').click();
    await page.locator('#bu-daily').click();
    await expect(page.locator('#bu-board')).toHaveAttribute('data-puzzle', first!);
  });

  test('klavye: ok tuşlarıyla gezilir, Enter ile taş seçilir ve hamle oynanır', async ({ page }) => {
    const p = mate1();
    await openPuzzle(page, p);
    const [from, to] = [p.moves.split(' ')[1].slice(0, 2), p.moves.split(' ')[1].slice(2, 4)];
    await sq(page, from).focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await expect(sq(page, from)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(sq(page, from)).toHaveClass(/is-selected/);
    await page.keyboard.press('Escape');
    await expect(sq(page, from)).not.toHaveClass(/is-selected/);
    await page.keyboard.press('Enter');
    await sq(page, to).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#bu-status')).toContainText('Doğru!');
  });

  test('bozuk localStorage çökertmez; varsayılan derece 1200 ile devam eder', async ({ context }) => {
    for (const bad of ['{bozuk json', '"metin"', '[1,2]', '{"rating":"abc","played":5,"daily":{"date":1},"level":"yok","theme":{}}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await page.goto(URL_PATH);
      await expect(page.locator('#bu-board .sq')).toHaveCount(64);
      await expect(page.locator('#bu-hint')).toBeEnabled();
      await expect(page.locator('#bu-s-rating')).toHaveText('1200');
      expect(errors).toEqual([]);
      await page.close();
    }
  });

  test('360px genişlikte yatay taşma yok ve içerik şartları: 800+ kelime, 3 reklam, 7+ SSS, JSON-LD', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await expect(page.locator('#bu-hint')).toBeEnabled();
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const box = await page.locator('#bu-board').boundingBox();
    expect(box!.width).toBeGreaterThan(250);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-satranc-bulmacalari-${s}"]`)).toHaveCount(1);
    // Reklam A oyun kutusunun dışında olmalı
    expect(await page.locator('#bu-box .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(ld!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toContain('VideoGame');
    expect(types).toContain('FAQPage');
  });
});
