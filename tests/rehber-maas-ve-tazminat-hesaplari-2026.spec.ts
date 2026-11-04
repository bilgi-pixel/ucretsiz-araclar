import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const slug = 'maas-ve-tazminat-hesaplari-2026';
const url = `/rehber/${slug}/`;
// Zorunlu araçlar: her biri 200 dönmeli
const requiredTools = ['brut-net-maas', 'kidem-tazminati', 'yillik-izin', 'mesai-hesapla', 'zam-orani-hesapla'];

test.describe(`Rehber: ${slug}`, () => {
  test('sayfa açılır, h1 görünür, en az 1200 kelime, SSS >= 6, uyarı ve rakamlar var', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(url);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('2026');
    const text = await page.locator('.ba-content').evaluate((el) => el.textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(1200);
    expect(text).toContain('bilgilendirme amaçlıdır');
    expect(text).toContain('mali veya hukuki tavsiye değildir');
    for (const n of ['33.030', '28.075,50', '190.000', '400.000', '1.500.000', '5.300.000']) {
      expect(text, n).toContain(n);
    }
    // 2026 resmî değerleri: işveren SGK %21,75 + işsizlik %2, teşvik 2/5 puan, tavan 9 kat = 297.270 TL, destek 42,33 TL/gün.
    for (const n of ['%21,75', '%23,75', '%2 işsizlik', '5 puan', '2 puan', '297.270 TL', '9 katı', '42,33 TL', '1.269,90 TL']) {
      expect(text, n).toContain(n);
    }
    for (const stale of ['%20,5', '1.270,38', '40.200 TL civarında', 'kabaca']) expect(text, stale).not.toContain(stale);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('50.000 TL örneği ve işveren maliyeti brüt-net çekirdeğiyle tutarlı', async ({ page }) => {
    await page.goto(url);
    const text = await page.locator('.ba-content').innerText();
    const money = (n: number) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
    const p = await (await page.request.get('/brut-net-maas/parametreler.json')).json();
    const res = await page.evaluate(async (params) => {
      const m = await import('/brut-net-maas/calc.js');
      const year = m.calcYear(50000, params, { asgariIstisna: true });
      const cost = (tesvik: string) => m.calcYear(50000, params, { asgariIstisna: true, tesvik }).rows[0].isverenMaliyet;
      return { year, costs: [cost('yok'), cost('diger'), cost('imalat')] };
    }, p);
    for (const ay of [1, 5, 6, 7, 8, 10, 11]) expect(text, `ay ${ay}`).toContain(`${money(res.year.rows[ay - 1].net)} TL`);
    expect(text).toContain(`${money(res.year.rows[0].gelirVergisi)} TL`);
    expect(text).toContain(`${money(res.year.rows[0].damga)} TL`);
    // İstisna yuvarlanmadan (4.211,325) düşülür; 6.375 − 4.211,33 = 2.163,68 gibi tutarsız bir çıkarma yazılmamalı.
    expect(text).toContain('4.211,325 TL');
    expect(text).not.toContain("4.211,33 TL'sini sildiği");
    expect(text).toContain(`${money(res.year.totals.net)} TL`);
    // 7566 sayılı Kanun: işveren SGK %21,75 + işsizlik %2; imalat dışı 2, imalat 5 puan indirim.
    const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
    const expected = [21.75, 19.75, 16.75].map((rate) => r2(50000 + r2(50000 * rate / 100) + r2(50000 * 0.02)));
    expect(res.costs).toEqual(expected);
    for (const c of expected) expect(text).toContain(`${money(c)} TL`);
  });

  test('FAQPage JSON-LD sayfadaki sorularla aynı sayıda', async ({ page }) => {
    await page.goto(url);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    const article = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Article');
    expect(article.mainEntityOfPage).toBe(`https://araclar.bilisimajans.com/rehber/${slug}/`);
    expect(faq.mainEntity.length).toBe(await page.locator('.ba-content details').count());
    const summaries = await page.locator('.ba-content details summary').allInnerTexts();
    expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(summaries.map((s) => s.trim()));
  });

  test('araç bağlantıları 200 döner', async ({ page }) => {
    for (const t of requiredTools) {
      const res = await page.goto(`/${t}/`);
      expect(res?.status(), t).toBe(200);
    }
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(url);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
