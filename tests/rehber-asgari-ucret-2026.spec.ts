import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Rehber sayfası doğrulaması: içerik uzunluğu, bağlantılar, dış istek, mobil taşma, JSON-LD, parametre uyumu.
const SLUG = 'asgari-ucret-2026';
const URL_PATH = `/rehber/${SLUG}/`;

test.describe(`Rehber: ${SLUG}`, () => {
  test('sayfa açılır, h1 görünür, en az 1200 kelime, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Asgari Ücret 2026');
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(1200);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    // Gizlilik rozeti ve "tavsiye değildir" notu bulunmalı.
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.rh-note')).toContainText('tavsiye değildir');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('araç kartları ve tüm iç bağlantılar 200 döner', async ({ page }) => {
    await page.goto(URL_PATH);
    const tools = await page.$$eval('.rh-tools a', (as) => as.map((a) => a.getAttribute('href')));
    expect(tools).toEqual(['../../asgari-ucret-hesapla/', '../../brut-net-maas/', '../../isveren-maliyeti-hesapla/', '../../kidem-tazminati/']);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
    const base = new URL(page.url()).origin;
    const internal = [...new Set(hrefs.filter((h) => h.startsWith(base)).map((h) => h.split('#')[0]))];
    for (const href of internal) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test('FAQPage ve Article JSON-LD geçerli, en az 7 soru içerir', async ({ page }) => {
    await page.goto(URL_PATH);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    const article = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Article');
    expect(article.mainEntityOfPage).toBe(`https://araclar.bilisimajans.com/rehber/${SLUG}/`);
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(faq.mainEntity.length).toBe(await page.locator('details').count());
  });

  test('reklam alanları doğru adlandırılmış ve butonların yanında değil', async ({ page }) => {
    await page.goto(URL_PATH);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual([`rehber-${SLUG}-a`, `rehber-${SLUG}-b`, `rehber-${SLUG}-c`]);
    // Reklam A araç kartlarının altında olmalı.
    const order = await page.evaluate(() => {
      const tools = document.querySelector('.rh-tools')!;
      const adA = document.querySelector('.ba-ad')!;
      return tools.compareDocumentPosition(adA) & Node.DOCUMENT_POSITION_FOLLOWING;
    });
    expect(order).toBeTruthy();
    expect(await page.locator('.ba-ad + button, button + .ba-ad').count()).toBe(0);
  });

  test('sayfadaki temel tutarlar araçların parametre dosyalarıyla uyumlu', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('main').innerText();
    const money = (n: number) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
    const au = await (await page.request.get('/asgari-ucret-hesapla/parametreler.json')).json();
    const kt = await (await page.request.get('/kidem-tazminati/parametreler.json')).json();
    const im = await (await page.request.get('/isveren-maliyeti-hesapla/parametreler.json')).json();
    expect(text).toContain(`${money(au.asgari_ucret_brut)} TL`);
    expect(text).toContain(`${money(au.asgari_ucret_net)} TL`);
    expect(text).toContain(`${money(au.asgari_ucret_brut * au.sgk_isci_orani / 100)} TL`);
    const cap = kt.kidem_tavani.find((c: { baslangic: string }) => c.baslangic === '2026-07-01');
    expect(text).toContain(`${money(cap.tutar)} TL`);
    expect(text).toContain(`${money(im.asgari_ucret_destegi)} TL`);
  });

  test('45.000 TL örneği brüt-net çekirdeğiyle, işveren maliyeti 2026 oranlarıyla tutarlı', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('main').innerText();
    const money = (n: number) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
    const p = await (await page.request.get('/brut-net-maas/parametreler.json')).json();
    // Brüt-net aracının kendi hesap çekirdeğiyle 45.000 TL'nin 12 aylık tablosu.
    const year = await page.evaluate(async (params) => {
      const m = await import('/brut-net-maas/calc.js');
      return m.calcYear(45000, params, { asgariIstisna: true });
    }, p);
    for (const ay of [1, 5, 6, 7, 8, 11, 12]) expect(text, `ay ${ay}`).toContain(`${money(year.rows[ay - 1].net)} TL`);
    expect(text).toContain(`${money(year.totals.gelirVergisi)} TL`);
    // 7566 sayılı Kanun: SGK işveren payı %21,75 (+%2 işsizlik); indirim imalatta 5, diğerlerinde 2 puan; tavan 9 kat.
    const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
    const cost = (rate: number) => r2(33030 + r2(33030 * rate / 100) + r2(33030 * 0.02));
    expect(text).toContain(`${money(cost(21.75))} TL`);
    expect(text).toContain(`${money(cost(19.75))} TL`);
    expect(text).toContain(`${money(cost(16.75))} TL`);
    expect(text).toContain('297.270 TL');
    for (const stale of ['40.461,75', '38.810,25', '247.725', 'yüzde 20,5']) expect(text, stale).not.toContain(stale);
  });

  test('360px genişlikte yatay taşma yok, tablo hücrelerinde kelime bölünmez', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // Her hücre, içindeki en uzun kelimeden dar olmamalı (harf harf kırılma yok).
    const broken = await page.$$eval('.ba-content td, .ba-content th', (cells) => cells.filter((c) => {
      const words = (c.textContent || '').split(/\s+/).filter(Boolean);
      const probe = document.createElement('span');
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
      (c.querySelector('strong') || c).appendChild(probe); // kalın metinde genişlik kalın yazıyla ölçülür
      const widest = Math.max(...words.map((w) => { probe.textContent = w; return probe.getBoundingClientRect().width; }));
      probe.remove();
      const style = getComputedStyle(c);
      const inner = c.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      return widest > inner + 0.5;
    }).map((c) => c.textContent));
    expect(broken).toEqual([]);
  });
});
