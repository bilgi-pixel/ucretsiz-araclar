import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Rehber sayfası doğrulaması: içerik uzunluğu, bağlantılar, dış istek, mobil taşma, JSON-LD.
const SLUG = 'tyt-ayt-puan-nasil-hesaplanir';
const URL_PATH = `/rehber/${SLUG}/`;
const TOOLS = ['tyt-puan-hesapla', 'ayt-puan-hesapla', 'obp-hesapla', 'yks-puan-hesapla'];

test.describe(`Rehber: ${SLUG}`, () => {
  test('sayfa açılır, h1 görünür, en az 1200 kelime, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('TYT ve AYT Puanı');
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
    const cardHrefs = await page.$$eval('.rh-tools a', (as) => as.map((a) => a.getAttribute('href')));
    expect(cardHrefs).toEqual(TOOLS.map((t) => `../../${t}/`));
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
    const base = new URL(page.url()).origin;
    const internal = [...new Set(hrefs.filter((h) => h.startsWith(base)).map((h) => h.split('#')[0]))];
    for (const href of internal) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test('Article ve FAQPage JSON-LD geçerli, en az 7 soru ve sayfadaki SSS ile aynı', async ({ page }) => {
    await page.goto(URL_PATH);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const types = data['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('Article');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    const summaries = await page.locator('details summary').allTextContents();
    const names = faq.mainEntity.map((q: { name: string }) => q.name);
    expect(summaries.map((s) => s.trim())).toEqual(names);
  });

  test('reklam alanları doğru adlandırılmış ve hiçbirinin yanında düğme yok', async ({ page }) => {
    await page.goto(URL_PATH);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['a', 'b', 'c'].map((x) => `rehber-${SLUG}-${x}`));
    // Reklam alanının hemen öncesindeki/sonrasındaki kardeş öğede düğme bulunmamalı.
    const nearButtons = await page.$$eval('.ba-ad', (els) =>
      els.filter((e) => [e.previousElementSibling, e.nextElementSibling].some((s) => s && (s.matches('button, .ba-btn') || s.querySelector('button, .ba-btn')))).length,
    );
    expect(nearButtons).toBe(0);
  });

  test('sayfadaki örnek hesaplar parametre dosyalarıyla tutarlı', async ({ page }) => {
    await page.goto(URL_PATH);
    const tyt = await (await page.request.get('/tyt-puan-hesapla/parametreler.json')).json();
    const ayt = await (await page.request.get('/ayt-puan-hesapla/parametreler.json')).json();
    const obp = await (await page.request.get('/obp-hesapla/parametreler.json')).json();
    const w = Object.fromEntries(tyt.tyt.dersler.map((c: { id: string; agirlik: number }) => [c.id, c.agirlik]));
    // TYT örneği: 33 / 11 / 24 / 7,5 net → yaklaşık 351.
    const tytSum = 33 * w.turkce + 11 * w.sosyal + 24 * w.mat + 7.5 * w.fen;
    expect(Math.round(tyt.tyt.taban + tytSum)).toBe(351);
    // SAY örneği: 20 / 7 / 8,5 / 9 net → yaklaşık 334,25.
    const say = Object.fromEntries(ayt.ayt.alanlar.say.dersler.map((c: { id: string; agirlik: number }) => [c.id, c.agirlik]));
    const sayPuan = 100 + tytSum * ayt.ayt.tyt_payi + 20 * say.mat + 7 * say.fizik + 8.5 * say.kimya + 9 * say.biyoloji;
    expect(sayPuan.toFixed(2)).toBe('334.25');
    // OBP: 85 diploma notu → 51 puan katkı; önceki yıl yerleşende 25,5.
    expect(85 * obp.obp_carpan * obp.katki_katsayi).toBeCloseTo(51, 6);
    expect(85 * obp.obp_carpan * obp.onceki_yerlesen_katsayi).toBeCloseTo(25.5, 6);
    expect(tyt.kurallar.min_ham_puan).toBe(0.5);
    expect(tyt.kurallar.baraj_puani).toBe(false);
    const body = await page.locator('main').textContent();
    for (const s of ['yaklaşık 351', '334,25', '51 puan', '0,5 net', 'yüzde 40']) expect(body).toContain(s);
  });

  // Rehberdeki örnek doğru-yanlış sayıları gerçek araçlara girilir; soru sayısını aşan ya da yanlış
  // sonuç veren bir örnek varsa burada yakalanır.
  const TYT_ORNEK = { turkce: [34, 4], sosyal: [12, 4], mat: [26, 8], fen: [9, 6] } as const;
  const fill = async (page: Page, prefix: string, inp: Record<string, readonly number[]>) => {
    for (const [id, [d, y]] of Object.entries(inp)) {
      await page.locator(`#${prefix}-${id}-d`).fill(String(d));
      await page.locator(`#${prefix}-${id}-y`).fill(String(y));
    }
  };

  test('TYT örneği araçta 75,5 net, 351 puan; 85 diploma notuyla 402', async ({ page }) => {
    await page.goto('/tyt-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await fill(page, 'tyt', TYT_ORNEK);
    await page.locator('#diploma').fill('85');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toHaveText('');
    await expect(page.locator('#r-net')).toHaveText('75,5');
    await expect(page.locator('#r-puan')).toHaveText('351');
    await expect(page.locator('#r-obp')).toHaveText('425 (katkı 51 puan)');
    await expect(page.locator('#r-place')).toHaveText('402');
  });

  const ALAN_ORNEK: Array<[string, Record<string, readonly number[]>, string, string]> = [
    ['say', { mat: [22, 8], fizik: [8, 4], kimya: [9, 2], biyoloji: [9, 0] }, '44,5', '334,25'],
    ['ea', { mat: [15, 8], edebiyat: [18, 4], tarih1: [7, 2], cografya1: [4, 2] }, '40', '320,27'],
    ['soz', { edebiyat: [18, 0], tarih1: [7, 2], cografya1: [4, 1], tarih2: [6, 0], cografya2: [5, 0], felsefe: [7, 0], din: [5, 0] }, '51,25', '354,76'],
    ['dil', { dil: [60, 12] }, '57', '371,4'],
  ];
  for (const [alan, inp, net, puan] of ALAN_ORNEK) {
    test(`${alan.toUpperCase()} örneği AYT aracında ${puan} verir`, async ({ page }) => {
      await page.goto('/ayt-puan-hesapla/');
      await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
      await page.locator('#alan').selectOption(alan);
      await fill(page, 'tyt', TYT_ORNEK);
      await fill(page, 'ayt', inp);
      if (alan === 'say') { await page.locator('#diploma').fill('85'); await page.locator('#placed').check(); }
      await page.locator('#calc').click();
      await expect(page.locator('#error')).toHaveText('');
      await expect(page.locator('#r-tyt-katki')).toHaveText('100,4 puan (TYT neti 75,5)');
      await expect(page.locator('#r-ayt-net')).toHaveText(net);
      await expect(page.locator('#r-ayt')).toHaveText(puan);
      if (alan === 'say') await expect(page.locator('#r-place')).toHaveText('359,75');
    });
  }

  test('0,5 net şartı örneği: YKS aracı AYT puanını hesaplamaz', async ({ page }) => {
    await page.goto('/yks-puan-hesapla/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await fill(page, 'tyt', { turkce: [1, 3], mat: [2, 7] });
    await page.locator('#alan').selectOption('say');
    await fill(page, 'ayt', { biyoloji: [1, 0] });
    await page.locator('#calc').click();
    await expect(page.locator('#r-ayt')).toHaveText('Hesaplanmadı (0,5 net şartı)');
    // Türkçe 1 doğru 2 yanlış = tam 0,5 net → şart sağlanır, Biyoloji'de 1 net AYT için yeterli.
    await fill(page, 'tyt', { turkce: [1, 2] });
    await page.locator('#calc').click();
    await expect(page.locator('#r-ayt')).toContainText('Sayısal');
  });

  test('klavye: araç kartı odaklanır, SSS Enter ile açılır', async ({ page }) => {
    await page.goto(URL_PATH);
    const card = page.locator('.rh-tools a').first();
    await card.focus();
    await expect(card).toBeFocused();
    const first = page.locator('details').first();
    await first.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(first).toHaveAttribute('open', '');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
