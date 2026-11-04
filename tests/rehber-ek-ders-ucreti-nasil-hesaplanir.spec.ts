import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Rehber sayfası doğrulaması: içerik uzunluğu, bağlantılar, dış istek, mobil taşma, JSON-LD.
const SLUG = 'ek-ders-ucreti-nasil-hesaplanir';
const URL_PATH = `/rehber/${SLUG}/`;

test.describe(`Rehber: ${SLUG}`, () => {
  test('sayfa açılır, h1 görünür, en az 1200 kelime, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Ek Ders Ücreti');
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(1200);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    expect(await page.locator('.ba-ad').count()).toBe(3);
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
  });

  test('reklam alanı adları, Article JSON-LD ve rakamlar araç parametreleriyle tutarlı', async ({ page }) => {
    await page.goto(URL_PATH);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual([`rehber-${SLUG}-a`, `rehber-${SLUG}-b`, `rehber-${SLUG}-c`]);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].some((n: { '@type': string }) => n['@type'] === 'Article')).toBe(true);
    // Rehberdeki birim ücretler ek ders aracının parametre dosyasından türetilmeli.
    const res = await page.request.get('/ek-ders-ucreti-hesapla/parametreler.json');
    expect(res.status()).toBe(200);
    const p = await res.json();
    const fmt = (x: number) => x.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const text = await page.locator('main').innerText();
    for (const d of Object.values(p.donemler) as { aylik_katsayi: number }[]) {
      expect(text).toContain(String(d.aylik_katsayi).replace('.', ','));
      expect(text).toContain(`${fmt(p.ek_ders_gostergesi * d.aylik_katsayi)} TL`);
      expect(text).toContain(`${fmt(p.ek_ders_gostergesi_gece * d.aylik_katsayi)} TL`);
    }
    expect(text).toContain(`binde ${String(p.damga_vergisi_orani * 10).replace('.', ',')}`);

    // Örnek hesaplar aracın formülüyle (tool.js compute) yeniden hesaplanır ve metindeki tutarlarla karşılaştırılır.
    const calc = (coef: number, day: number, night: number, weeks: number, taxRate: number) => {
      const dayU = p.ek_ders_gostergesi * coef;
      const nightU = dayU * (1 + p.gece_artis_orani / 100);
      const gross = day * weeks * dayU + night * weeks * nightU;
      const tax = (gross * taxRate) / 100;
      const stamp = (gross * p.damga_vergisi_orani) / 100;
      const net = gross - tax - stamp;
      return { gross, tax, stamp, net, nph: net / ((day + night) * weeks) };
    };
    const tem = p.donemler.temmuz_aralik.aylik_katsayi;
    const oca = p.donemler.ocak_haziran.aylik_katsayi;
    const ex1 = calc(tem, 20, 0, 4, 15);
    for (const v of [ex1.gross, ex1.tax, ex1.stamp, ex1.net, ex1.nph]) expect(text).toContain(`${fmt(v)} TL`);
    for (const rate of [15, 20, 27]) {
      const ex2 = calc(tem, 12, 4, 4, rate);
      expect(text).toContain(`${fmt(ex2.gross)} TL`);
      expect(text).toContain(`${fmt(ex2.stamp)} TL`);
      expect(text).toContain(`${fmt(ex2.tax)} TL`);
      expect(text).toContain(`${fmt(ex2.net)} TL`);
    }
    const ex5w = calc(tem, 12, 4, 5, 15);
    expect(text).toContain(`${fmt(ex5w.gross)} TL`);
    expect(text).toContain(`${fmt(ex5w.net)} TL`);
    const exOca = calc(oca, 12, 4, 4, 15);
    expect(text).toContain(`${fmt(exOca.gross)} TL`);
    expect(text).toContain(`${fmt(exOca.net)} TL`);
    // Gece artışı %25 değil, 150/140 oranıdır.
    expect(p.ek_ders_gostergesi * (1 + p.gece_artis_orani / 100)).toBeCloseTo(p.ek_ders_gostergesi_gece, 6);
    expect(text).toContain('yüzde 7,14');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // Tablolardaki sayılar satır sonunda ortadan bölünmemeli (ör. "1,38" / "7871").
    const broken = await page.evaluate(() => {
      const out: string[] = [];
      document.querySelectorAll('main td, main th').forEach((cell) => {
        const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const re = /\d[\d.,]*\d/g;
          for (let m = re.exec(n.textContent || ''); m; m = re.exec(n.textContent || '')) {
            const r = document.createRange();
            r.setStart(n, m.index);
            r.setEnd(n, m.index + m[0].length);
            const tops = new Set([...r.getClientRects()].map((x) => Math.round(x.top)));
            if (tops.size > 1) out.push(m[0]);
          }
        }
      });
      return out;
    });
    expect(broken).toEqual([]);
    // Tablolar 360px'te sağdan kırpılmadan sığmalı (iç kaydırma gerekmesin).
    const clipped = await page.$$eval('main table', (ts) => ts.filter((t) => t.scrollWidth > t.clientWidth + 1).length);
    expect(clipped).toBe(0);
  });
});
