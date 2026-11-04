import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Rehber sayfası doğrulaması: içerik uzunluğu, bağlantılar, dış istek, mobil taşma, JSON-LD.
const SLUG = 'tasit-kredisi-nasil-hesaplanir';
const URL_PATH = `/rehber/${SLUG}/`;

test.describe(`Rehber: ${SLUG}`, () => {
  test('sayfa açılır, h1 görünür, en az 1200 kelime, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Taşıt Kredisi');
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

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('klavye: tablo kutuları ve SSS başlıkları Tab ile odaklanır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const tables = page.locator('.rh-table');
    const n = await tables.count();
    expect(n).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < n; i++) {
      await expect(tables.nth(i)).toHaveAttribute('tabindex', '0');
      await expect(tables.nth(i)).toHaveAttribute('aria-label', /.+/);
    }
    // İlk SSS başlığına Tab ile ulaşılır ve Enter ile açılır.
    const first = page.locator('details').first();
    await first.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(first).toHaveAttribute('open', '');
  });

  test('örnek hesaplar ve BDDK kademeleri aracın çekirdeği ve parametreleriyle aynı', async ({ page }) => {
    await page.goto(URL_PATH);
    // Rehberdeki rakamları taşıt kredisi aracının kendi hesap çekirdeği ve parametre dosyasıyla yeniden üretir.
    const r = await page.evaluate(async () => {
      const core = await import('/tasit-kredisi-hesapla/kredi-cekirdek.js');
      const params = await (await fetch('/tasit-kredisi-hesapla/parametreler.json')).json();
      const k = params.kkdf / 100, b = params.bsmv / 100;
      const f = (n: number) => core.money.format(n);
      const p36 = core.buildPlan(375000, 0.03, 36, k, b);
      const p24 = core.buildPlan(375000, 0.03, 24, k, b);
      const p12 = core.buildPlan(375000, 0.03, 12, k, b);
      const d300 = core.buildPlan(300000, 0.03, 36, k, b);
      const v24 = core.buildPlan(300000, 0.03, 24, k, b);
      const z24 = core.buildPlan(300000, 0.03, 24, 0, 0);
      const ymo = core.annualFromMonthly(core.monthlyIRR(375000, p36.payment, 36));
      return {
        tiers: params.bddk_kademeleri,
        kkdf: params.kkdf, bsmv: params.bsmv,
        expected: [
          f(p36.payment), f(p36.total), f(p36.sumInterest), f(p36.sumKkdf), f(p36.total - 375000), f(375000 + p36.total),
          f(p36.rows[0].principal), f(p36.rows[0].balance),
          f(p24.payment), f(p24.total), f(p24.total - 375000),
          f(p12.payment), f(p12.total), f(p12.total - 375000),
          f(p24.payment - p36.payment), f(p36.total - p24.total),
          f(d300.payment), f(d300.total - 300000), f(p36.payment - d300.payment), f((p36.total - 375000) - (d300.total - 300000)),
          f(v24.payment), f(v24.total), f(v24.total - 300000), f(v24.sumKkdf),
          f(z24.payment), f(z24.total), f(z24.total - 300000),
          f(v24.payment - z24.payment), f(v24.total - z24.total),
          new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(ymo),
        ],
      };
    });
    const text = (await page.locator('main').textContent()) || '';
    for (const v of r.expected) expect(text, v).toContain(v);
    expect(r.kkdf).toBe(15);
    expect(r.bsmv).toBe(15);
    // Kademe tablosu parametre dosyasıyla aynı sırada ve aynı değerlerde olmalı.
    const rows = await page.locator('table').first().locator('tbody tr').allTextContents();
    r.tiers.forEach((t: { fatura_ust: number; kredi_orani: number; vade_max_ay: number }, i: number) => {
      const row = rows[i].replace(/\s+/g, ' ');
      expect(row).toContain(new Intl.NumberFormat('tr-TR').format(t.fatura_ust) + ' TL');
      expect(row).toContain('%' + t.kredi_orani);
      expect(row).toContain('%' + (100 - t.kredi_orani));
      expect(row).toContain(t.vade_max_ay + ' ay');
    });
    // Excel işlev adı Türkçe sürümdeki adla yazılmalı (PMT = DEVRESEL_ÖDEME).
    expect(text).toContain('=DEVRESEL_ÖDEME(0,039; 36; -375000)');
    expect(text).not.toMatch(/=ÖDEME\(/);
  });
});
