import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Rehber sayfası doğrulaması: içerik uzunluğu, bağlantılar, dış istek, mobil taşma, JSON-LD.
const SLUG = 'mevduat-faizi-nasil-hesaplanir';
const URL_PATH = `/rehber/${SLUG}/`;

test.describe(`Rehber: ${SLUG}`, () => {
  test('sayfa açılır, h1 görünür, en az 1200 kelime, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Mevduat Faizi');
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(1200);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual([`rehber-${SLUG}-a`, `rehber-${SLUG}-b`, `rehber-${SLUG}-c`]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('araç kartları ve tüm iç bağlantılar 200 döner', async ({ page }) => {
    await page.goto(URL_PATH);
    expect(await page.locator('.rh-tools a').count()).toBeGreaterThanOrEqual(2);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
    const base = new URL(page.url()).origin;
    const internal = [...new Set(hrefs.filter((h) => h.startsWith(base)).map((h) => h.split('#')[0]))];
    for (const href of internal) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test('FAQPage JSON-LD geçerli ve en az 7 soru içerir', async ({ page }) => {
    await page.goto(URL_PATH);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    const article = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Article');
    expect(article.headline).toContain('Mevduat Faizi');
  });

  test('stopaj oranları ve geçerlilik tarihi aracın parametreler.json dosyasıyla tutarlı', async ({ page }) => {
    const res = await page.request.get('/mevduat-faizi-hesapla/parametreler.json');
    expect(res.status()).toBe(200);
    const params = await res.json();
    await page.goto(URL_PATH);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 3 });
    for (const d of params.dilimler as { yuzde: number; enAz: number; enFazla: number | null }[]) {
      expect(text, `stopaj %${d.yuzde}`).toContain(`%${nf.format(d.yuzde)}`);
      const range = d.enFazla === null ? `${d.enAz} gün ve üzeri` : `${d.enAz}-${d.enFazla} gün`;
      expect(text, `gün aralığı ${range}`).toContain(range);
    }
    const [y, m, g] = String(params.gecerlilik_sonu).split('-');
    expect(text).toContain(`${g}.${m}.${y}`);
    const [uy, um, ug] = String(params.guncelleme).split('-');
    expect(text).toContain(`${ug}.${um}.${uy}`);
  });

  test('örnek hesaplar aracın hesap.js çıktısıyla aynı', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    // Aracın kendi hesap çekirdeğini tarayıcıda yükleyip örnekleri yeniden hesapla.
    const expected = await page.evaluate(async () => {
      const m = await import('/mevduat-faizi-hesapla/hesap.js');
      const fmt = (n: number) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
      const out: string[] = [];
      for (const days of [32, 180, 181, 365, 366]) {
        const r = m.computeDeposit({ amount: 100000, days, rate: 45 });
        out.push(fmt(r.gross), fmt(r.taxAmt), fmt(r.net));
        if (days === 32) out.push(fmt(r.total), fmt(r.monthlyNet), fmt(r.dailyNet), `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(r.netRate)}`);
        if (days === 366) out.push(fmt(r.total));
      }
      // 32 günlük vadeyi 11 kez yenileme (her seferinde araçla aynı yuvarlama).
      let bal = 100000;
      for (let i = 0; i < 11; i++) bal = m.computeDeposit({ amount: bal, days: 32, rate: 45 }).total;
      out.push(fmt(bal));
      return out;
    });
    for (const v of expected) expect(text, v).toContain(v);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('klavye ile ilk araç kartına ulaşılır', async ({ page }) => {
    await page.goto(URL_PATH);
    const first = page.locator('.rh-tools a').first();
    let reached = false;
    for (let i = 0; i < 30 && !reached; i++) {
      await page.keyboard.press('Tab');
      reached = await first.evaluate((el) => el === document.activeElement);
    }
    expect(reached).toBe(true);
    await expect(first).toHaveAttribute('href', '../../mevduat-faizi-hesapla/');
  });
});
