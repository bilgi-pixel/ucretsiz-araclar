import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Zar At: 1–6 zar, d4–d20, atış değerleri, toplam, geçmiş, yüz dağılımı, klavye, kalıcılık, bozuk localStorage, 360px, içerik.
const URL_PATH = '/oyunlar/zar-at/';
const STORE_KEY = 'ba-oyun-zar-at';

// Varsayılan: hareket azaltma açık -> sonuçlar animasyon beklemeden anında işlenir.
test.use({ reducedMotion: 'reduce' });

/**
 * Rastgele kaynağı sabitler (sayfa yüklenmeden önce):
 *  - window.__rnd kuyruğu doluysa getRandomValues oradan okur (zar değeri = kuyruk değeri % yüz sayısı + 1),
 *  - window.__const bir sayıysa her çağrıda o değeri verir,
 *  - ikisi de yoksa gerçek üretece düşer.
 * Math.random çağrıları sayılır; oyun bunu kullanmamalıdır.
 */
function stubRandom() {
  const w = window as any;
  w.__rnd = [];
  w.__const = null;
  w.__mathCalls = 0;
  const orig = Crypto.prototype.getRandomValues;
  (Crypto.prototype as any).getRandomValues = function (a: any) {
    if (w.__const !== null) { a[0] = w.__const; return a; }
    if (w.__rnd.length) { a[0] = w.__rnd.shift(); return a; }
    return orig.call(this, a);
  };
  const mr = Math.random;
  Math.random = () => { w.__mathCalls++; return mr(); };
}

async function open(page: Page, opts: { seed?: string } = {}) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.addInitScript(stubRandom);
  if (opts.seed !== undefined) {
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [STORE_KEY, opts.seed]);
  }
  await page.goto(URL_PATH);
  await expect(page.locator('#za-roll')).toBeVisible();
  return { external, errors };
}

const queue = (page: Page, ...vals: number[]) => page.evaluate((v) => { (window as any).__rnd.push(...v); }, vals);
const setConst = (page: Page, v: number | null) => page.evaluate((x) => { (window as any).__const = x; }, v);
const mathCalls = (page: Page) => page.evaluate(() => (window as any).__mathCalls as number);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
const dieValues = (page: Page) => page.locator('#za-dice .za-die').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.v));
const chartCounts = (page: Page) => page.locator('#za-chart .za-row').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.count));
const count = (page: Page, n: number) => page.locator(`.za-cnt[data-n="${n}"]`);
const wordCount = (page: Page) => page.locator('.ba-content').evaluate((el) => ((el as HTMLElement).textContent || '').split(/\s+/).filter(Boolean).length);

test.describe('Zar At', () => {
  test('sayfa açılır: 1 zar, boş istatistik, d6 seçili; dış istek ve sayfa hatası yok', async ({ page }) => {
    const { external, errors } = await open(page);
    await expect(page.locator('h1')).toContainText('Zar');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(1);
    expect(await dieValues(page)).toEqual(['']);
    await expect(page.locator('#za-type')).toHaveValue('6');
    await expect(count(page, 1)).toHaveAttribute('aria-pressed', 'true');
    await expect(count(page, 2)).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#za-total')).toHaveText('–');
    await expect(page.locator('#za-throws')).toHaveText('0');
    await expect(page.locator('#za-dtotal')).toHaveText('0');
    await expect(page.locator('#za-mean')).toHaveText('–');
    await expect(page.locator('#za-expected')).toHaveText('beklenen 3,5');
    await expect(page.locator('#za-chart .za-row')).toHaveCount(6);
    expect(await chartCounts(page)).toEqual(['0', '0', '0', '0', '0', '0']);
    await expect(page.locator('#za-history-empty')).toBeVisible();
    await expect(page.locator('#za-type option')).toHaveCount(6);
    expect(await page.locator('#za-type option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value))).toEqual(['4', '6', '8', '10', '12', '20']);
    expect(await page.locator('#oyun-kutusu').textContent()).not.toContain('NaN');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('her zar türünde atış geçerli değer verir; zar yüzü, toplam ve sayaçlar tutarlı', async ({ page }) => {
    await open(page);
    let throws = 0;
    for (const t of [4, 6, 8, 10, 12, 20]) {
      await page.selectOption('#za-type', String(t));
      await expect(page.locator('#za-chart .za-row')).toHaveCount(t);
      await expect(page.locator('#za-dice .za-die')).toHaveAttribute('data-type', String(t));
      for (let i = 0; i < 4; i++) {
        await page.locator('#za-roll').click();
        throws++;
        const total = Number(await page.locator('#za-total').textContent());
        expect(Number.isInteger(total), `d${t} toplam`).toBe(true);
        expect(total).toBeGreaterThanOrEqual(1);
        expect(total).toBeLessThanOrEqual(t);
        expect(await dieValues(page)).toEqual([String(total)]);
        await expect(page.locator('#za-values')).toHaveText(`d${t} zarı: ${total}`);
        if (t === 6) {
          await expect(page.locator('#za-dice .za-pip')).toHaveCount(total);
          await expect(page.locator('#za-dice rect.za-shape')).toHaveCount(1);
        } else {
          await expect(page.locator('#za-dice .za-num')).toHaveText(String(total));
          await expect(page.locator('#za-dice polygon.za-shape')).toHaveCount(1);
        }
      }
      await expect(page.locator('#za-dtotal')).toHaveText('4');
      expect((await chartCounts(page)).map(Number).reduce((a, b) => a + b, 0)).toBe(4);
    }
    await expect(page.locator('#za-throws')).toHaveText(String(throws));
    await expect(page.locator('#za-history li')).toHaveCount(20);
  });

  test('rastgele kaynak sabitlenince belirli sonuçlar gelir; Math.random kullanılmaz', async ({ page }) => {
    await open(page);
    await count(page, 3).click();
    await queue(page, 0, 4, 5); // 1, 5, 6
    await page.locator('#za-roll').click();
    expect(await dieValues(page)).toEqual(['1', '5', '6']);
    await expect(page.locator('#za-total')).toHaveText('12');
    await expect(page.locator('#za-values')).toHaveText('1 + 5 + 6 = 12');
    expect(await page.locator('#za-dice .za-die').evaluateAll((els) => els.map((e) => e.querySelectorAll('.za-pip').length))).toEqual([1, 5, 6]);
    expect(await chartCounts(page)).toEqual(['1', '0', '0', '0', '1', '1']);
    // d10 en yüksek yüz = 10 (0–9 değil), d20 en yüksek yüz = 20
    await count(page, 1).click();
    await page.selectOption('#za-type', '10');
    await queue(page, 9);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-total')).toHaveText('10');
    await page.selectOption('#za-type', '20');
    await queue(page, 19);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-total')).toHaveText('20');
    await expect(page.locator('#za-dice .za-num')).toHaveText('20');
    await queue(page, 0);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-total')).toHaveText('1');
    expect(await mathCalls(page)).toBe(0);
  });

  test('çift ve hepsi aynı uyarıları yalnızca ilgili durumda görünür', async ({ page }) => {
    await open(page);
    await count(page, 2).click();
    await queue(page, 2, 2);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-total')).toHaveText('6');
    await expect(page.locator('#za-pair')).toHaveText('Çift geldi!');
    await queue(page, 0, 5);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-total')).toHaveText('7');
    await expect(page.locator('#za-pair')).toHaveText('');
    await count(page, 3).click();
    await expect(page.locator('#za-pair')).toHaveText(''); // zar sayısı değişince sonuç alanı sıfırlanır
    await expect(page.locator('#za-total')).toHaveText('–');
    await queue(page, 3, 3, 3);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-pair')).toHaveText('Hepsi aynı geldi!');
    await expect(page.locator('#za-total')).toHaveText('12');
  });

  test('istatistik: yüz sayaçları, yüzdeler, çubuklar ve ortalama doğru; tür başına ayrı tutulur', async ({ page }) => {
    await open(page);
    await count(page, 2).click();
    await queue(page, 0, 5, 5, 5, 2, 2); // (1,6) (6,6) (3,3)
    for (let i = 0; i < 3; i++) await page.locator('#za-roll').click();
    await expect(page.locator('#za-throws')).toHaveText('3');
    await expect(page.locator('#za-dtotal')).toHaveText('6');
    await expect(page.locator('#za-mean')).toHaveText('4,17'); // (1+6+6+6+3+3)/6
    expect(await chartCounts(page)).toEqual(['1', '0', '2', '0', '0', '3']);
    const rows = page.locator('#za-chart .za-row');
    await expect(rows.nth(5).locator('.za-c')).toHaveText('3 kez · %50');
    await expect(rows.nth(0).locator('.za-c')).toHaveText('1 kez · %16,7');
    await expect(rows.nth(1).locator('.za-c')).toHaveText('0 kez · %0');
    const widths = await rows.evaluateAll((els) => els.map((e) => parseFloat((e.querySelector('.za-fill') as HTMLElement).style.width)));
    expect(widths[5]).toBeCloseTo(100, 1); // en kalabalık yüze göre ölçek
    expect(widths[2]).toBeCloseTo(66.67, 1);
    expect(widths[0]).toBeCloseTo(33.33, 1);
    expect(widths[1]).toBe(0);
    // Başka tür: ayrı sayaç, beklenen ortalama farklı.
    await page.selectOption('#za-type', '20');
    await expect(page.locator('#za-dtotal')).toHaveText('0');
    await expect(page.locator('#za-mean')).toHaveText('–');
    await expect(page.locator('#za-mean-l')).toHaveText('d20 ortalaması');
    await expect(page.locator('#za-expected')).toHaveText('beklenen 10,5');
    await expect(page.locator('#za-throws')).toHaveText('3');
    await page.selectOption('#za-type', '6');
    expect(await chartCounts(page)).toEqual(['1', '0', '2', '0', '0', '3']);
    expect(await page.locator('#oyun-kutusu').textContent()).not.toContain('NaN');
  });

  test('atış geçmişi: en yeni üstte, en fazla 20 kayıt, zar sayısı ve toplam yazar', async ({ page }) => {
    await open(page);
    const seq = Array.from({ length: 25 }, (_, i) => i % 6);
    await queue(page, ...seq);
    for (let i = 0; i < 25; i++) await page.locator('#za-roll').click();
    await expect(page.locator('#za-throws')).toHaveText('25');
    const items = await page.locator('#za-history li').allTextContents();
    expect(items).toHaveLength(20);
    expect(items[0]).toBe('d6: 1'); // 25. atış: kuyruk dizini 24 -> 24 % 6 = 0 -> 1
    expect(items[1]).toBe('d6: 6');
    expect(items[19]).toBe('d6: 6'); // 6. atış
    await expect(page.locator('#za-history-empty')).toBeHidden();
    await count(page, 2).click();
    await queue(page, 2, 4);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-history li').first()).toHaveText('2 × d6: 3 + 5 = 8');
    await page.selectOption('#za-type', '12');
    await count(page, 1).click();
    await queue(page, 11);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-history li').first()).toHaveText('d12: 12');
    await expect(page.locator('#za-history li')).toHaveCount(20);
  });

  test('klavye: 1–6 zar sayısını seçer, Boşluk/Enter tek atış yapar, çifte sayım ve alan çakışması yok', async ({ page }) => {
    await open(page);
    await page.keyboard.press('3');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(3);
    await expect(count(page, 3)).toHaveAttribute('aria-pressed', 'true');
    await expect(count(page, 1)).toHaveAttribute('aria-pressed', 'false');
    await page.keyboard.press('6');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(6);
    await page.keyboard.press('1');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(1);
    await page.keyboard.press('7');
    await page.keyboard.press('0');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(1);
    await page.keyboard.press(' ');
    await expect(page.locator('#za-throws')).toHaveText('1');
    await page.keyboard.press('Enter');
    await expect(page.locator('#za-throws')).toHaveText('2');
    // Odak düğmedeyse düğmenin kendi davranışı: tek atış (çifte tetik yok).
    await page.locator('#za-roll').focus();
    await page.keyboard.press(' ');
    await expect(page.locator('#za-throws')).toHaveText('3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#za-throws')).toHaveText('4');
    // Rakam tuşu düğme odaktayken de çalışır; seçim alanındayken çalışmaz.
    await page.keyboard.press('2');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(2);
    await page.locator('#za-type').focus();
    await page.keyboard.press('5');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(2);
    // Tüm düğmelere sekmeyle ulaşılır: sayı düğmesine odak + Enter ile seçilir.
    await count(page, 4).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(4);
    await expect(page.locator('#za-throws')).toHaveText('4'); // düğme Enter'ı atış yapmadı
    // Oyun kutusu ekranda değilse tuşlar sayfaya bırakılır.
    await page.evaluate(() => { (document.activeElement as HTMLElement | null)?.blur(); window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }); });
    await expect.poll(() => page.locator('#oyun-kutusu').evaluate((e) => e.getBoundingClientRect().bottom)).toBeLessThan(0);
    await page.keyboard.press(' ');
    await page.keyboard.press('3');
    await expect(page.locator('#za-throws')).toHaveText('4');
    await expect(page.locator('#za-dice .za-die')).toHaveCount(4);
  });

  test('animasyonlu mod: sallanırken sonuç beklenir, hızlı ardışık atışta çifte sayım olmaz', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await open(page);
    await count(page, 2).click();
    await queue(page, 1, 2, 3, 4);
    await page.locator('#za-roll').click();
    // Yük altında animasyon bu satırlardan önce bitebilir; sayaç 0 ya da 1 olabilir.
    await expect(page.locator('#za-throws')).toHaveText(/^[01]$/);
    // İkinci tıklama devam eden atışı hemen bitirir (sayılır), yenisini başlatır.
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-throws')).toHaveText(/^[12]$/);
    await expect(page.locator('#za-throws')).toHaveText('2', { timeout: 4000 });
    // İlk atış (2, 3), ikinci atış (4, 5): kuyruk 1,2,3,4 -> değerler 2,3,4,5
    await expect(page.locator('#za-total')).toHaveText('9');
    await expect(page.locator('#za-values')).toHaveText('4 + 5 = 9');
    expect(await dieValues(page)).toEqual(['4', '5']);
    await expect(page.locator('#za-dice .za-die.is-rolling')).toHaveCount(0);
    await expect(page.locator('#za-result')).not.toHaveClass(/is-busy/);
    await page.waitForTimeout(1200);
    await expect(page.locator('#za-throws')).toHaveText('2');
    expect(await page.locator('#za-history li').allTextContents()).toEqual(['2 × d6: 4 + 5 = 9', '2 × d6: 2 + 3 = 5']);
  });

  test('uç değerli üreteç (0xFFFFFFFF) sayfayı kilitlemez ve geçerli değer verir', async ({ page }) => {
    const { errors } = await open(page);
    await setConst(page, 0xffffffff);
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-total')).toHaveText('4'); // 4294967295 % 6 = 3 -> 4
    await page.selectOption('#za-type', '20');
    await page.locator('#za-roll').click();
    await expect(page.locator('#za-total')).toHaveText('16'); // 4294967295 % 20 = 15 -> 16
    await setConst(page, null);
    expect(errors).toEqual([]);
  });

  test('istatistik yeniden yüklemede korunur (yalnızca sayaçlar); sıfırla temizler', async ({ page }) => {
    await open(page);
    await count(page, 2).click();
    await queue(page, 0, 5);
    await page.locator('#za-roll').click();
    const s = await stored(page);
    expect(Object.keys(s).sort()).toEqual(['faces', 'throws']); // tür/zar sayısı/geçmiş yazılmaz
    expect(s.throws).toBe(1);
    expect(s.faces['6']).toEqual([1, 0, 0, 0, 0, 1]);
    await page.reload();
    await expect(page.locator('#za-throws')).toHaveText('1');
    await expect(page.locator('#za-dtotal')).toHaveText('2');
    expect(await chartCounts(page)).toEqual(['1', '0', '0', '0', '0', '1']);
    await expect(page.locator('#za-dice .za-die')).toHaveCount(1); // zar sayısı kalıcı değil
    await expect(page.locator('#za-history li')).toHaveCount(0); // geçmiş kalıcı değil
    await expect(page.locator('#za-history-empty')).toBeVisible();
    await page.locator('#za-reset').click();
    await expect(page.locator('#za-throws')).toHaveText('0');
    expect(await chartCounts(page)).toEqual(['0', '0', '0', '0', '0', '0']);
    expect((await stored(page)).throws).toBe(0);
    await page.reload();
    await expect(page.locator('#za-throws')).toHaveText('0');
  });

  test('bozuk localStorage içeriğinde sayfa çökmez, sayaçlar güvenli değerlere döner', async ({ context }) => {
    test.setTimeout(150_000); // dokuz ayrı sayfa açılır
    const cases: Array<{ seed: string; throws: string; d6: string[] }> = [
      { seed: '{bad', throws: '0', d6: ['0', '0', '0', '0', '0', '0'] },
      { seed: '[]', throws: '0', d6: ['0', '0', '0', '0', '0', '0'] },
      { seed: '5', throws: '0', d6: ['0', '0', '0', '0', '0', '0'] },
      { seed: '"abc"', throws: '0', d6: ['0', '0', '0', '0', '0', '0'] },
      { seed: 'null', throws: '0', d6: ['0', '0', '0', '0', '0', '0'] },
      { seed: '{"throws":"x","faces":{"6":"abc"}}', throws: '0', d6: ['0', '0', '0', '0', '0', '0'] },
      { seed: '{"throws":4,"faces":{"6":[1,2,3]}}', throws: '4', d6: ['0', '0', '0', '0', '0', '0'] },
      { seed: '{"throws":-5,"faces":{"6":["a",null,-4,1.9,2,[3]]}}', throws: '0', d6: ['0', '0', '0', '1', '2', '0'] },
      { seed: '{"faces":[1,2,3]}', throws: '0', d6: ['0', '0', '0', '0', '0', '0'] },
    ];
    for (const c of cases) {
      const page = await context.newPage();
      const { errors } = await open(page, { seed: c.seed });
      await expect(page.locator('#za-throws'), c.seed).toHaveText(c.throws);
      expect(await chartCounts(page), c.seed).toEqual(c.d6);
      expect(await page.locator('#oyun-kutusu').textContent(), c.seed).not.toContain('NaN');
      await queue(page, 0);
      await page.locator('#za-roll').click();
      await expect(page.locator('#za-throws'), c.seed).toHaveText(String(Number(c.throws) + 1));
      await expect(page.locator('#za-total'), c.seed).toHaveText('1');
      expect(errors, c.seed).toEqual([]);
      await page.close();
    }
  });

  test('saf mantık: üreteç dağılımı (d6, d20, iki zar toplamı), sayaç yardımcıları ve zar çizimi', async ({ page }) => {
    await open(page);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/zar-at/game.js');
      const six = [0, 0, 0, 0, 0, 0];
      for (let i = 0; i < 60000; i++) six[m.randomInt(6)]++;
      const twenty = new Array(20).fill(0);
      for (let i = 0; i < 100000; i++) twenty[m.randomInt(20)]++;
      const sums = {};
      for (let i = 0; i < 36000; i++) { const s = m.randomInt(6) + m.randomInt(6) + 2; sums[s] = (sums[s] || 0) + 1; }
      const st = m.emptyStats();
      m.recordRoll(st, 6, [1, 6]); m.recordRoll(st, 6, [6, 6]);
      const host = document.createElement('div');
      m.paintDie(host, 6, 4);
      const pips4 = host.querySelectorAll('.za-pip').length;
      m.paintDie(host, 20, 17);
      const txt20 = host.querySelector('.za-num').textContent;
      m.paintDie(host, 12, null);
      const txt12 = host.querySelector('.za-num').textContent;
      return { six, twenty, sums, st, mean: m.faceMean(st, 6), mean0: m.faceMean(m.emptyStats(), 20), total: m.faceTotal(st, 6),
        p0: m.percent(0, 0), p: m.percent(1, 6), fp: m.fmtPercent(16.7), fn: m.fmtNum(4.1666), fn2: m.fmtNum(3.5), sum: m.sumOf([3, 4, 5]),
        pips4, txt20, txt12, types: m.TYPES,
        san: m.sanitizeStats({ throws: 2.7, faces: { 4: [1, 1, 1, 1], 6: [1] } }) };
    })()`) as any;
    for (const b of res.six) { expect(b).toBeGreaterThan(9000); expect(b).toBeLessThan(11000); }
    for (const b of res.twenty) { expect(b).toBeGreaterThan(4500); expect(b).toBeLessThan(5500); }
    // İki zar toplamı: 7 en sık (≈ 6000), 2 ve 12 en seyrek (≈ 1000)
    expect(res.sums[7]).toBeGreaterThan(5400);
    expect(res.sums[7]).toBeLessThan(6600);
    expect(res.sums[2]).toBeGreaterThan(700);
    expect(res.sums[2]).toBeLessThan(1300);
    expect(res.sums[12]).toBeGreaterThan(700);
    expect(res.sums[12]).toBeLessThan(1300);
    expect(res.st.throws).toBe(2);
    expect(res.st.faces[6]).toEqual([1, 0, 0, 0, 0, 3]);
    expect(res.total).toBe(4);
    expect(res.mean).toBeCloseTo((1 + 18) / 4, 5);
    expect(res.mean0).toBe(0);
    expect(res.p0).toBe(0);
    expect(res.p).toBe(16.7);
    expect(res.fp).toBe('%16,7');
    expect(res.fn).toBe('4,17');
    expect(res.fn2).toBe('3,5');
    expect(res.sum).toBe(12);
    expect(res.pips4).toBe(4);
    expect(res.txt20).toBe('17');
    expect(res.txt12).toBe('?');
    expect(res.types).toEqual([4, 6, 8, 10, 12, 20]);
    expect(res.san.throws).toBe(2);
    expect(res.san.faces[4]).toEqual([1, 1, 1, 1]);
    expect(res.san.faces[6]).toEqual([0, 0, 0, 0, 0, 0]); // yanlış uzunluk -> sıfırla
  });

  test('360px genişlikte d20 ve 6 zar ile taşma olmaz; kontroller sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.selectOption('#za-type', '20');
    await count(page, 6).click();
    for (let i = 0; i < 3; i++) await page.locator('#za-roll').click();
    expect(await overflow()).toBeLessThanOrEqual(0);
    const rect = (sel: string) => page.locator(sel).evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, w: r.width, h: r.height }; }));
    for (const b of await rect('#za-dice .za-die')) {
      expect(b.l).toBeGreaterThanOrEqual(0);
      expect(b.r).toBeLessThanOrEqual(360);
      expect(b.w).toBeGreaterThanOrEqual(60);
    }
    for (const b of await rect('.za-cnt')) {
      expect(b.r).toBeLessThanOrEqual(360);
      expect(b.h).toBeGreaterThanOrEqual(44);
    }
    await expect(page.locator('#za-chart .za-row')).toHaveCount(20);
    for (const b of await rect('#za-chart .za-row')) {
      expect(b.l).toBeGreaterThanOrEqual(0);
      expect(b.r).toBeLessThanOrEqual(360);
    }
    for (const b of await rect('#za-roll')) { expect(b.r).toBeLessThanOrEqual(360); expect(b.h).toBeGreaterThanOrEqual(44); }
    await count(page, 1).click();
    const one = (await rect('#za-dice .za-die'))[0];
    expect(one.w).toBeGreaterThanOrEqual(100);
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: en az 900 kelime, 3 reklam alanı doğru yerde, SSS ≥ 7, JSON-LD, olasılık tablosu doğru', async ({ page }) => {
    await open(page);
    expect(await wordCount(page), 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-zar-at-a', 'oyun-zar-at-b', 'oyun-zar-at-c']);
    expect(await page.locator('#oyun-kutusu .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun-kutusu').boundingBox())!;
    const adA = (await page.locator('[data-slot="oyun-zar-at-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(faqCount);
    const names = faq.mainEntity.map((q: { name: string }) => q.name);
    expect(await page.locator('.ba-faq summary').allTextContents()).toEqual(names);
    const game = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame');
    expect(game.applicationCategory).toMatch(/Game/);
    expect(game.url).toBe('https://araclar.bilisimajans.com/oyunlar/zar-at/');
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://araclar.bilisimajans.com/oyunlar/zar-at/');
    const text = (await page.locator('.ba-content').textContent()) || '';
    expect(text).toMatch(/bahis aracı değildir/);
    expect(text).toContain('crypto.getRandomValues');
    // Olasılık tablosu: 36 sonuçtan her toplamın payı ve yüzdesi matematiksel olarak doğru.
    const rows = await page.locator('.ba-content table tbody tr').evaluateAll((trs) => trs.map((tr) => Array.from(tr.querySelectorAll('td')).map((td) => (td.textContent || '').trim())));
    expect(rows).toHaveLength(11);
    let sum = 0;
    rows.forEach(([s, c, p]) => {
      const total = Number(s);
      const ways = 6 - Math.abs(total - 7);
      expect(Number(c), `toplam ${total}`).toBe(ways);
      expect(p).toBe('%' + String(Math.round((ways / 36) * 1000) / 10).replace('.', ','));
      sum += Number(c);
    });
    expect(sum).toBe(36);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    for (const href of ['../yazi-tura/', '../xox/', '../../']) {
      await expect(page.locator(`.ba-related a[href="${href}"]`)).toHaveCount(1);
    }
  });
});
