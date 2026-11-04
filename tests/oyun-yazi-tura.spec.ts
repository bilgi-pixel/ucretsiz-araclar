import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Yazı Tura: atış, çoklu para, toplu atış, seri/istatistik, klavye, kalıcılık, bozuk localStorage, 360px, içerik.
const URL_PATH = '/oyunlar/yazi-tura/';
const STORE_KEY = 'ba-oyun-yazi-tura';

// Varsayılan: hareket azaltma açık -> sonuçlar animasyon beklemeden anında işlenir.
test.use({ reducedMotion: 'reduce' });

/**
 * Rastgele kaynağı sabitler (sayfa yüklenmeden önce):
 *  - window.__rnd kuyruğu doluysa getRandomValues oradan okur (0 = yazı, 1 = tura),
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

async function open(page: Page, opts: { stub?: boolean; seed?: string } = {}) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  if (opts.stub !== false) await page.addInitScript(stubRandom);
  if (opts.seed !== undefined) {
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [STORE_KEY, opts.seed]);
  }
  await page.goto(URL_PATH);
  await expect(page.locator('#yt-flip')).toBeVisible();
  return { external, errors };
}

const queue = (page: Page, ...vals: number[]) => page.evaluate((v) => { (window as any).__rnd.push(...v); }, vals);
const setConst = (page: Page, v: number | null) => page.evaluate((x) => { (window as any).__const = x; }, v);
const mathCalls = (page: Page) => page.evaluate(() => (window as any).__mathCalls as number);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
const num = async (page: Page, sel: string) => Number(await page.locator(sel).textContent());
const wordCount = (page: Page) => page.locator('.ba-content').evaluate((el) => ((el as HTMLElement).textContent || '').split(/\s+/).filter(Boolean).length);

test.describe('Yazı Tura', () => {
  test('sayfa açılır, tek para ve boş istatistik gelir, dış istek ve sayfa hatası yok', async ({ page }) => {
    const { external, errors } = await open(page);
    await expect(page.locator('h1')).toContainText('Yazı Tura');
    await expect(page.locator('.yt-coin')).toHaveCount(1);
    await expect(page.locator('#yt-main')).toHaveText('Atmaya hazır');
    await expect(page.locator('#yt-total')).toHaveText('0');
    await expect(page.locator('#yt-yazi-p')).toHaveText('%0');
    await expect(page.locator('#yt-tura-p')).toHaveText('%0');
    await expect(page.locator('#yt-run')).toHaveText('–');
    await expect(page.locator('#yt-copy')).toBeDisabled();
    await expect(page.locator('#yt-recent-empty')).toBeVisible();
    // Sıfır toplamda NaN görünmemeli; çubuk genişlikleri 0.
    expect(await page.locator('#oyun-kutusu').textContent()).not.toContain('NaN');
    expect(await page.locator('#yt-bar-y').evaluate((e) => (e as HTMLElement).style.width)).toBe('0%');
    await expect(page.locator('#yt-bar')).toHaveAttribute('aria-label', /henüz atış yok/);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tek atış: sonuç yazı ya da tura, sayaçlar artar, yüzdeler tutarlı', async ({ page }) => {
    const { errors } = await open(page);
    await page.locator('#yt-flip').click();
    await expect(page.locator('#yt-main')).toHaveText(/^(Yazı|Tura) geldi$/);
    expect(await num(page, '#yt-total')).toBe(1);
    expect((await num(page, '#yt-yazi')) + (await num(page, '#yt-tura'))).toBe(1);
    const pct = [await page.locator('#yt-yazi-p').textContent(), await page.locator('#yt-tura-p').textContent()];
    expect(pct.sort()).toEqual(['%0', '%100']);
    await expect(page.locator('#yt-best')).toHaveText('1');
    await expect(page.locator('#yt-recent .yt-chip')).toHaveCount(1);
    await expect(page.locator('#yt-copy')).toBeEnabled();
    const coin = page.locator('.yt-coin');
    await expect(coin).toHaveAttribute('data-result', /^(yazi|tura)$/);
    expect(errors).toEqual([]);
  });

  test('rastgele kaynak sabitlenince belirli sonuç gelir; seri sayacı ve en uzun seri doğru; Math.random kullanılmaz', async ({ page }) => {
    await open(page);
    const seq = [1, 1, 0, 0, 0]; // tura, tura, yazı, yazı, yazı
    const mains = ['Tura geldi', 'Tura geldi', 'Yazı geldi', 'Yazı geldi', 'Yazı geldi'];
    const runs = ['1 × Tura', '2 × Tura', '1 × Yazı', '2 × Yazı', '3 × Yazı'];
    await queue(page, ...seq);
    for (let i = 0; i < seq.length; i++) {
      await page.locator('#yt-flip').click();
      await expect(page.locator('#yt-main')).toHaveText(mains[i]);
      await expect(page.locator('#yt-run')).toHaveText(runs[i]);
    }
    await expect(page.locator('#yt-total')).toHaveText('5');
    await expect(page.locator('#yt-yazi')).toHaveText('3');
    await expect(page.locator('#yt-tura')).toHaveText('2');
    await expect(page.locator('#yt-yazi-p')).toHaveText('%60');
    await expect(page.locator('#yt-tura-p')).toHaveText('%40');
    await expect(page.locator('#yt-best')).toHaveText('3');
    // Çubuk genişlikleri oranla uyumlu.
    expect(await page.locator('#yt-bar-y').evaluate((e) => (e as HTMLElement).style.width)).toBe('60%');
    expect(await page.locator('#yt-bar-t').evaluate((e) => (e as HTMLElement).style.width)).toBe('40%');
    await expect(page.locator('#yt-bar')).toHaveAttribute('aria-label', 'Dağılım: yazı %60, tura %40');
    // Son atış şeridi sırayla: T T Y Y Y
    // (her çip: görünen harf + ekran okuyucu metni)
    expect(await page.locator('#yt-recent .yt-chip').evaluateAll((els) => els.map((e) => (e.textContent || '').trim()))).toEqual(
      ['TTura', 'TTura', 'YYazı', 'YYazı', 'YYazı'],
    );
    expect(await mathCalls(page)).toBe(0);
  });

  test('para 3B döner: açı hep artar, yüz sonuçla eşleşir (yazı 0°, tura 180°)', async ({ page }) => {
    await open(page);
    const angle = async () => {
      const t = await page.locator('.yt-coin-inner').evaluate((e) => (e as HTMLElement).style.transform);
      const m = /rotateY\(([\d.]+)deg\)/.exec(t);
      expect(m, 'rotateY dönüşümü').not.toBeNull();
      return Number(m![1]);
    };
    await queue(page, 1, 0, 1);
    await page.locator('#yt-flip').click();
    const a1 = await angle();
    expect(a1 % 360).toBe(180);
    await page.locator('#yt-flip').click();
    const a2 = await angle();
    expect(a2 % 360).toBe(0);
    expect(a2).toBeGreaterThan(a1);
    await page.locator('#yt-flip').click();
    const a3 = await angle();
    expect(a3 % 360).toBe(180);
    expect(a3).toBeGreaterThan(a2);
    // Paranın iki yüzü de DOM'da var ve etiketli.
    await expect(page.locator('.yt-front .yt-label')).toHaveText('Yazı');
    await expect(page.locator('.yt-back .yt-label')).toHaveText('Tura');
  });

  test('toplu atış: 10 kez at toplamı 10 artırır; 100 kez at sabit üreteçte 100 yazı verir', async ({ page }) => {
    await open(page);
    await page.locator('#yt-flip10').click();
    expect(await num(page, '#yt-total')).toBe(10);
    expect((await num(page, '#yt-yazi')) + (await num(page, '#yt-tura'))).toBe(10);
    await expect(page.locator('#yt-main')).toHaveText(/^10 atış: \d+ yazı, \d+ tura$/);
    const best = await num(page, '#yt-best');
    expect(best).toBeGreaterThanOrEqual(1);
    expect(best).toBeLessThanOrEqual(10);
    await expect(page.locator('#yt-recent .yt-chip')).toHaveCount(10);

    await setConst(page, 0);
    await page.locator('#yt-flip100').click();
    await setConst(page, null);
    expect(await num(page, '#yt-total')).toBe(110);
    await expect(page.locator('#yt-main')).toHaveText(/^100 atış: 100 yazı, 0 tura$/);
    await expect(page.locator('#yt-detail')).toHaveText('Bu toplu atışta en uzun seri: 100 × Yazı');
    expect(await num(page, '#yt-best')).toBeGreaterThanOrEqual(100);
    // Son 20 şeridi 20 ile sınırlı.
    await expect(page.locator('#yt-recent .yt-chip')).toHaveCount(20);
    // Gerçek üreteçle 100 atış: toplam tutarlı ve yüzdeler 100'e yakın toplanır.
    const before = await num(page, '#yt-total');
    await page.locator('#yt-flip100').click();
    expect(await num(page, '#yt-total')).toBe(before + 100);
    expect((await num(page, '#yt-yazi')) + (await num(page, '#yt-tura'))).toBe(before + 100);
    expect(await mathCalls(page)).toBe(0);
  });

  test('çoklu para: 3 para atılır, özet ve tek tek sonuçlar gösterilir; sayaçlar para sayısı kadar artar', async ({ page }) => {
    await open(page);
    await page.selectOption('#yt-count', '3');
    await expect(page.locator('.yt-coin')).toHaveCount(3);
    await queue(page, 0, 1, 1);
    await page.locator('#yt-flip').click();
    await expect(page.locator('#yt-main')).toHaveText('1 yazı, 2 tura');
    await expect(page.locator('#yt-detail')).toHaveText('Yazı · Tura · Tura');
    await expect(page.locator('#yt-total')).toHaveText('3');
    await expect(page.locator('#yt-yazi')).toHaveText('1');
    await expect(page.locator('#yt-tura')).toHaveText('2');
    expect(await page.locator('.yt-coin').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.result))).toEqual(['yazi', 'tura', 'tura']);
    await page.selectOption('#yt-count', '6');
    await expect(page.locator('.yt-coin')).toHaveCount(6);
    await page.locator('#yt-flip').click();
    await expect(page.locator('#yt-total')).toHaveText('9');
    await page.selectOption('#yt-count', '1');
    await expect(page.locator('.yt-coin')).toHaveCount(1);
  });

  test('uç değerli üreteç (0xFFFFFFFF) tura verir, sayfa hata vermez', async ({ page }) => {
    const { errors } = await open(page);
    await setConst(page, 0xffffffff);
    await page.locator('#yt-flip').click();
    await setConst(page, null);
    await expect(page.locator('#yt-main')).toHaveText('Tura geldi'); // 4294967295 % 2 = 1
    expect(errors).toEqual([]);
  });

  test('sonucu kopyala: pano yazılır ve Türkçe geri bildirim verilir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await queue(page, 0);
    await page.locator('#yt-flip').click();
    await page.locator('#yt-copy').click();
    await expect(page.locator('#yt-note')).toHaveText('Sonuç kopyalandı.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Yazı tura sonucu: Yazı');
    await page.selectOption('#yt-count', '2');
    await queue(page, 1, 0);
    await page.locator('#yt-flip').click();
    await page.locator('#yt-copy').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Yazı tura sonucu: 1 yazı, 1 tura (Tura · Yazı)');
  });

  test('klavye: Boşluk ve Enter tek atış yapar, odaktaki düğmede çifte sayım olmaz, kutu görünmezken sayfa kayar', async ({ page }) => {
    await open(page);
    await queue(page, 0, 1, 0, 1, 0);
    await page.keyboard.press(' ');
    await expect(page.locator('#yt-total')).toHaveText('1');
    await page.keyboard.press('Enter');
    await expect(page.locator('#yt-total')).toHaveText('2');
    // Odak düğmedeyse düğmenin kendi davranışı: tek atış.
    await page.locator('#yt-flip').focus();
    await page.keyboard.press(' ');
    await expect(page.locator('#yt-total')).toHaveText('3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#yt-total')).toHaveText('4');
    // Oyun kutusu ekranda değilse Boşluk atış yapmaz (sayfa kaydırma korunur).
    // (ba.css yumuşak kaydırma kullanır; anında kaydırmak için behavior: 'instant')
    await page.evaluate(() => { (document.activeElement as HTMLElement | null)?.blur(); window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }); });
    await expect.poll(() => page.locator('#oyun-kutusu').evaluate((e) => e.getBoundingClientRect().bottom)).toBeLessThan(0);
    await page.keyboard.press(' ');
    await expect(page.locator('#yt-total')).toHaveText('4');
  });

  test('animasyonlu mod: dönerken sonuç beklenir, hızlı ardışık atışta çifte sayım olmaz', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await open(page);
    await queue(page, 1, 0);
    await page.locator('#yt-flip').click();
    await expect(page.locator('#yt-result')).toHaveClass(/is-busy/);
    await expect(page.locator('.yt-coin')).toHaveClass(/is-tossing/);
    await expect(page.locator('#yt-total')).toHaveText('0'); // sonuç henüz açıklanmadı
    // İkinci tıklama devam eden atışı hemen bitirir (sayılır), yenisini başlatır.
    await page.locator('#yt-flip').click();
    await expect(page.locator('#yt-total')).toHaveText('1');
    await expect(page.locator('#yt-total')).toHaveText('2', { timeout: 4000 });
    await expect(page.locator('#yt-main')).toHaveText('Yazı geldi');
    await expect(page.locator('#yt-result')).not.toHaveClass(/is-busy/);
    await page.waitForTimeout(1500);
    await expect(page.locator('#yt-total')).toHaveText('2');
  });

  test('istatistik yeniden yüklemede korunur; sıfırla temizler', async ({ page }) => {
    await open(page);
    await queue(page, 0, 1, 1);
    for (let i = 0; i < 3; i++) await page.locator('#yt-flip').click();
    expect(await stored(page)).toEqual({ total: 3, yazi: 1, tura: 2, side: 1, run: 2, best: 2 });
    await page.reload();
    await expect(page.locator('#yt-total')).toHaveText('3');
    await expect(page.locator('#yt-yazi')).toHaveText('1');
    await expect(page.locator('#yt-tura')).toHaveText('2');
    await expect(page.locator('#yt-yazi-p')).toHaveText('%33,3');
    await expect(page.locator('#yt-tura-p')).toHaveText('%66,7');
    await expect(page.locator('#yt-run')).toHaveText('2 × Tura');
    await expect(page.locator('#yt-best')).toHaveText('2');
    await expect(page.locator('#yt-recent .yt-chip')).toHaveCount(0); // geçmiş şeridi kalıcı değil
    await page.locator('#yt-reset').click();
    await expect(page.locator('#yt-total')).toHaveText('0');
    await expect(page.locator('#yt-note')).toHaveText('İstatistikler sıfırlandı.');
    expect(await stored(page)).toEqual({ total: 0, yazi: 0, tura: 0, side: -1, run: 0, best: 0 });
    await page.reload();
    await expect(page.locator('#yt-total')).toHaveText('0');
  });

  test('bozuk localStorage içeriğinde sayfa çökmez, sayaçlar güvenli değerlere döner', async ({ context }) => {
    test.setTimeout(150_000); // sekiz ayrı sayfa açılır
    const cases: Array<{ seed: string; total: string; yazi: string; tura: string; best?: string }> = [
      { seed: '{bad', total: '0', yazi: '0', tura: '0' },
      { seed: '[]', total: '0', yazi: '0', tura: '0' },
      { seed: '5', total: '0', yazi: '0', tura: '0' },
      { seed: '"abc"', total: '0', yazi: '0', tura: '0' },
      { seed: 'null', total: '0', yazi: '0', tura: '0' },
      { seed: '{"yazi":"x","tura":null,"side":7,"run":-3,"best":"9"}', total: '0', yazi: '0', tura: '0', best: '0' },
      { seed: '{"yazi":3.9,"tura":2,"side":0,"run":99,"best":50}', total: '5', yazi: '3', tura: '2', best: '5' },
      { seed: '{"yazi":{"a":1},"tura":[1],"total":99}', total: '0', yazi: '0', tura: '0' },
    ];
    // Her durum yeni bir sayfada açılır; tohum her yüklemede başlangıç betiğiyle yazılır.
    for (const c of cases) {
      const page = await context.newPage();
      const { errors } = await open(page, { seed: c.seed });
      await expect(page.locator('#yt-total'), c.seed).toHaveText(c.total);
      await expect(page.locator('#yt-yazi'), c.seed).toHaveText(c.yazi);
      await expect(page.locator('#yt-tura'), c.seed).toHaveText(c.tura);
      if (c.best !== undefined) await expect(page.locator('#yt-best'), c.seed).toHaveText(c.best);
      expect(await page.locator('#oyun-kutusu').textContent(), c.seed).not.toContain('NaN');
      // Bozuk kayıt üzerinde de atış çalışır ve geçerli veri yazılır.
      await queue(page, 0);
      await page.locator('#yt-flip').click();
      await expect(page.locator('#yt-total'), c.seed).toHaveText(String(Number(c.total) + 1));
      expect(errors, c.seed).toEqual([]);
      await page.close();
    }
  });

  test('saf mantık: seri, yüzde, en uzun seri ve rastgele üreteç dağılımı', async ({ page }) => {
    await open(page);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/yazi-tura/game.js');
      const s = m.emptyStats();
      [0, 0, 1, 1, 1, 1, 0].forEach((r) => m.addResult(s, r));
      const lr = m.longestRun([0, 1, 1, 0, 0, 0, 1]);
      // Gerçek üreteç (sabitleme kapalı): 20000 atış yaklaşık yarı yarıya olmalı.
      let tura = 0; const N = 20000;
      for (let i = 0; i < N; i++) tura += m.randomInt(2);
      const bins = [0, 0, 0, 0, 0, 0];
      for (let i = 0; i < 30000; i++) bins[m.randomInt(6)]++;
      let inRange = true;
      for (let i = 0; i < 2000; i++) { const v = m.randomInt(7); if (v < 0 || v > 6 || !Number.isInteger(v)) inRange = false; }
      return { s, lr, ratio: tura / N, bins, inRange,
        p0: m.percent(0, 0), p1: m.percent(1, 3), f: m.fmtPercent(33.3), f2: m.fmtPercent(50), san: m.sanitizeStats({ yazi: 2, tura: 1, side: 1, run: 1, best: 3 }) };
    })()`) as any;
    expect(res.s).toEqual({ total: 7, yazi: 3, tura: 4, side: 0, run: 1, best: 4 });
    expect(res.lr).toEqual({ length: 3, side: 0 });
    expect(res.ratio).toBeGreaterThan(0.47);
    expect(res.ratio).toBeLessThan(0.53);
    for (const b of res.bins) { expect(b).toBeGreaterThan(4500); expect(b).toBeLessThan(5500); }
    expect(res.inRange).toBe(true);
    expect(res.p0).toBe(0);
    expect(res.p1).toBe(33.3);
    expect(res.f).toBe('%33,3');
    expect(res.f2).toBe('%50');
    expect(res.san).toEqual({ total: 3, yazi: 2, tura: 1, side: 1, run: 1, best: 3 });
  });

  test('360px genişlikte 1 ve 6 para ile taşma olmaz; düğmeler ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.selectOption('#yt-count', '6');
    await page.locator('#yt-flip100').click();
    await page.locator('#yt-flip').click();
    expect(await overflow()).toBeLessThanOrEqual(0);
    for (const box of await page.locator('.yt-coin').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, w: r.width }; }))) {
      expect(box.l).toBeGreaterThanOrEqual(0);
      expect(box.r).toBeLessThanOrEqual(360);
      expect(box.w).toBeGreaterThanOrEqual(60);
    }
    for (const b of await page.locator('.yt-actions .ba-btn').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, h: r.height }; }))) {
      expect(b.l).toBeGreaterThanOrEqual(0);
      expect(b.r).toBeLessThanOrEqual(360);
      expect(b.h).toBeGreaterThanOrEqual(44);
    }
    await page.selectOption('#yt-count', '1');
    const one = await page.locator('.yt-coin').boundingBox();
    expect(one!.width).toBeGreaterThanOrEqual(150);
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: en az 900 kelime, 3 reklam alanı doğru yerde, SSS ≥ 7, JSON-LD, bahis uyarısı', async ({ page }) => {
    await open(page);
    expect(await wordCount(page), 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-yazi-tura-a', 'oyun-yazi-tura-b', 'oyun-yazi-tura-c']);
    expect(await page.locator('#oyun-kutusu .ba-ad').count()).toBe(0);
    // Reklam A oyun kutusunun hemen dışında ve altında; düğmelerle aynı kutuda değil.
    const box = (await page.locator('#oyun-kutusu').boundingBox())!;
    const adA = (await page.locator('[data-slot="oyun-yazi-tura-a"]').boundingBox())!;
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
    expect(game.url).toBe('https://araclar.bilisimajans.com/oyunlar/yazi-tura/');
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://araclar.bilisimajans.com/oyunlar/yazi-tura/');
    const text = (await page.locator('.ba-content').textContent()) || '';
    expect(text).toMatch(/bahis aracı değildir/);
    expect(text).toContain('crypto.getRandomValues');
    // Gizlilik rozeti ve ilgili oyun bağlantıları.
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    for (const href of ['../zar-at/', '../tas-kagit-makas/', '../../']) {
      await expect(page.locator(`.ba-related a[href="${href}"]`)).toHaveCount(1);
    }
  });
});
