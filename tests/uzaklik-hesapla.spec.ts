import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const open = async (page: Page) => {
  await page.goto('/uzaklik-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği ve veri.json yüklenmeden form gönderilmesin
  await expect(page.locator('#from option')).toHaveCount(82); // "İl seçin" + 81 il
};
/** "1.126 km" → 1126 */
const km = (s: string | null) => Number((s || '').replace(/[^\d]/g, ''));
const pick = async (page: Page, from: string, to: string) => {
  await page.locator('#from').selectOption(from);
  await page.locator('#to').selectOption(to);
};
const names = (page: Page, sel: string) => page.locator(`${sel} li span:first-child`).allTextContents();

test.describe('Şehirler Arası Mesafe Hesaplama', () => {
  test('İstanbul-Ankara: kuş uçuşu ≈ 350, karayolu ≈ 437, süre, yakıt; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await pick(page, '34', '6'); // İstanbul, Ankara
    await page.getByRole('button', { name: 'Mesafeyi hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-route')).toHaveText('İstanbul → Ankara');
    const air = km(await page.locator('#r-air').textContent());
    const road = km(await page.locator('#r-road').textContent());
    expect(Math.abs(air - 350)).toBeLessThanOrEqual(15);
    expect(Math.abs(road - 437)).toBeLessThanOrEqual(30);
    expect(Math.abs(road - air * 1.25)).toBeLessThanOrEqual(2);
    await expect(page.locator('#r-time')).toHaveText('4 sa 51 dk'); // 437 km / 90 km/s
    await expect(page.locator('#r-note')).toContainText('güncel harita uygulamasını kontrol edin');
    // Yakıt girilmedi → ipucu görünür, maliyet satırı yok
    await expect(page.locator('#r-fuel-hint')).toBeVisible();
    await expect(page.locator('#r-cost')).toHaveCount(0);
    await expect(page.locator('#r-fuel-hint a')).toHaveAttribute('href', '../yakit-hesapla/');

    // Hız 80 → 5 sa 28 dk; 100 → 4 sa 22 dk
    await page.locator('#speed').selectOption('80');
    await page.locator('#calc').click();
    await expect(page.locator('#r-time')).toHaveText('5 sa 28 dk');
    await page.locator('#speed').selectOption('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-time')).toHaveText('4 sa 22 dk');

    // Yakıt: 437 km × 7 L/100 km = 30,59 L; × 40 TL = 1.223,60 TL
    await page.locator('#cons').fill('7');
    await page.locator('#price').fill('40');
    await page.locator('#calc').click();
    await expect(page.locator('#r-liters')).toHaveText('30,6 L');
    await expect(page.locator('#r-cost')).toHaveText('1.223,60 TL');
    await expect(page.locator('#r-fuel-hint')).toBeHidden();
    // Türkçe ondalık virgül
    await page.locator('#cons').fill('7,5');
    await page.locator('#price').fill('45,50');
    await page.locator('#calc').click();
    await expect(page.locator('#r-cost')).toHaveText('1.491,26 TL'); // 437 × 0,075 = 32,775 L × 45,5

    // İstanbul'un en yakın 5 ili (kuş uçuşu): Yalova, Kocaeli, Bursa, Sakarya, Tekirdağ
    expect(new Set(await names(page, '#r-near-from'))).toEqual(new Set(['Yalova', 'Kocaeli', 'Bursa', 'Sakarya', 'Tekirdağ']));
    expect(await names(page, '#r-near-from')).toHaveLength(5);
    await expect(page.locator('#r-near-from-h')).toHaveText('İstanbul için en yakın 5 il');
    await expect(page.locator('#r-near-to-h')).toHaveText('Ankara için en yakın 5 il');
    expect((await names(page, '#r-near-to'))[0]).toBe('Kırıkkale');

    // Kopyala
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Sonuç panoya kopyalandı.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('İstanbul → Ankara');
    expect(clip).toContain('güncel harita uygulamasını kontrol edin');
    expect(external).toEqual([]);
    noErrors();
  });

  test('Diyarbakır-Şanlıurfa: en yakın iller listeleri', async ({ page }) => {
    await open(page);
    await pick(page, '21', '63'); // Diyarbakır, Şanlıurfa
    await page.locator('#calc').click();
    expect(km(await page.locator('#r-air').textContent())).toBe(152);
    expect(km(await page.locator('#r-road').textContent())).toBe(190);
    // Diyarbakır: Mardin ve Batman (~79 km), sonra Bingöl, Elazığ, Tunceli
    const from = await names(page, '#r-near-from');
    expect(from).toHaveLength(5);
    expect(new Set(from.slice(0, 2))).toEqual(new Set(['Mardin', 'Batman']));
    expect(new Set(from)).toEqual(new Set(['Mardin', 'Batman', 'Bingöl', 'Elazığ', 'Tunceli']));
    // Şanlıurfa: Adıyaman en yakın; Diyarbakır ilk beşte
    const to = await names(page, '#r-near-to');
    expect(to[0]).toBe('Adıyaman');
    expect(to).toContain('Diyarbakır');
    // Seçilen iller kendi listesinde yer almaz
    expect(from).not.toContain('Diyarbakır');
    expect(to).not.toContain('Şanlıurfa');
    // Yönü ters çevir: aynı mesafe, rota adı tersine döner
    await page.locator('#swap').click();
    await page.locator('#calc').click();
    await expect(page.locator('#r-route')).toHaveText('Şanlıurfa → Diyarbakır');
    expect(km(await page.locator('#r-air').textContent())).toBe(152);
  });

  test('çoklu durak: İstanbul → Eskişehir → Ankara toplamı ayakların toplamıdır', async ({ page }) => {
    await open(page);
    await pick(page, '34', '6');
    await page.getByRole('button', { name: 'Ara durak ekle' }).click();
    await page.getByLabel('Ara durak 1').selectOption('26'); // Eskişehir
    await page.locator('#calc').click();
    await expect(page.locator('#r-route')).toHaveText('İstanbul → Eskişehir → Ankara');
    const legs = await page.locator('#r-legs li').allTextContents();
    expect(legs).toHaveLength(2);
    expect(legs[0]).toContain('İstanbul → Eskişehir');
    expect(legs[1]).toContain('Eskişehir → Ankara');
    const nums = (s: string) => [...s.matchAll(/(\d[\d.]*) km/g)].map((m) => km(m[1]));
    const [a1, r1] = nums(legs[0]);
    const [a2, r2] = nums(legs[1]);
    expect(km(await page.locator('#r-air').textContent())).toBe(a1 + a2);
    expect(km(await page.locator('#r-road').textContent())).toBe(r1 + r2);
    // Durak üzerinden rota doğrudan yoldan uzun (ya da eşit) olmalı
    expect(a1 + a2).toBeGreaterThanOrEqual(349);
    // Durağı kaldır → ayak dökümü gizlenir, doğrudan rota
    await page.getByRole('button', { name: 'Kaldır' }).click();
    await page.locator('#calc').click();
    await expect(page.locator('#r-route')).toHaveText('İstanbul → Ankara');
    await expect(page.locator('#r-legs-wrap')).toBeHidden();
  });

  test('gidiş-dönüş: başlangıç ve varış aynı olabilir, ardışık aynı il hata verir', async ({ page }) => {
    await open(page);
    await pick(page, '6', '6');
    await page.getByRole('button', { name: 'Ara durak ekle' }).click();
    await page.getByLabel('Ara durak 1').selectOption('26'); // Ankara → Eskişehir → Ankara
    await page.locator('#calc').click();
    await expect(page.locator('#r-route')).toHaveText('Ankara → Eskişehir → Ankara');
    expect(km(await page.locator('#r-air').textContent())).toBe(400);
    // Durağı Ankara yapınca ardışık aynı il
    await page.getByLabel('Ara durak 1').selectOption('6');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Ankara iki kez arka arkaya seçilmiş');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Başlangıç ilini seçin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#from').selectOption('6');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Varış ilini seçin');
    await page.locator('#to').selectOption('6');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Başlangıç ve varış ili aynı (Ankara). Farklı bir varış ili seçin.');
    await page.locator('#to').selectOption('34');
    // Boş ara durak
    await page.getByRole('button', { name: 'Ara durak ekle' }).click();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('1. ara durak için il seçilmedi');
    await page.getByRole('button', { name: 'Kaldır' }).click();
    // Yakıt alanları
    await page.locator('#cons').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yakıt tüketimi geçerli bir sayı olmalı');
    await page.locator('#cons').fill('7');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('hem tüketimi hem litre fiyatını');
    await page.locator('#price').fill('-3');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yakıt fiyatı geçerli bir sayı olmalı');
    // Düzeltince çalışır
    await page.locator('#price').fill('40');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    // Temizle
    await page.locator('#clear').click();
    await expect(page.locator('#from')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('il verisi: 81 benzersiz il, Türkiye sınırları içinde, bilinen mesafeler doğru', async ({ page }) => {
    const res = await page.request.get('/uzaklik-hesapla/veri.json');
    expect(res.ok()).toBe(true);
    const { iller } = await res.json();
    expect(iller).toHaveLength(81);
    expect(new Set(iller.map((i: any) => i.plaka)).size).toBe(81);
    expect(new Set(iller.map((i: any) => i.ad)).size).toBe(81);
    for (const [k, i] of iller.entries()) {
      expect(i.plaka).toBe(k + 1);
      expect(i.lat).toBeGreaterThan(35.8); expect(i.lat).toBeLessThan(42.2);
      expect(i.lon).toBeGreaterThan(25.6); expect(i.lon).toBeLessThan(44.9);
    }
    const hav = (a: any, b: any) => {
      const r = (d: number) => (d * Math.PI) / 180;
      const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lon - a.lon) / 2) ** 2;
      return 2 * 6371 * Math.asin(Math.sqrt(h));
    };
    const by = (ad: string) => iller.find((i: any) => i.ad === ad);
    const anchors: [string, string, number, number][] = [
      ['İstanbul', 'İzmir', 328, 15], ['Ankara', 'İzmir', 520, 20], ['Ankara', 'Antalya', 388, 15], ['Edirne', 'Hakkâri', 1540, 80],
    ];
    for (const [a, b, exp, tol] of anchors) expect(Math.abs(hav(by(a), by(b)) - exp), `${a}-${b}`).toBeLessThanOrEqual(tol);
  });

  test('içerik: ≥900 kelime, 3 reklam (araç kutusunun dışında), SSS ≥7, 20 güzergâh, tablo araçla tutarlı, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['uzaklik-hesapla-a', 'uzaklik-hesapla-b', 'uzaklik-hesapla-c']);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const adAfterTool = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('[data-slot="uzaklik-hesapla-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adAfterTool).toBe(true);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    expect(await page.locator('.ba-content table tbody tr').count()).toBe(20);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '')));
    expect(ld.map((x) => x['@type']).sort()).toEqual(['FAQPage', 'SoftwareApplication']);

    // Tablodaki Diyarbakır-Şanlıurfa satırı araçla aynı değeri verir
    const row = page.locator('.ba-content table tbody tr', { hasText: 'Diyarbakır – Şanlıurfa' });
    const cells = await row.locator('td').allTextContents();
    await pick(page, '21', '63');
    await page.locator('#calc').click();
    expect(km(cells[1])).toBe(km(await page.locator('#r-air').textContent()));
    expect(km(cells[2])).toBe(km(await page.locator('#r-road').textContent()));
    // Ara duraklı, yakıtlı en geniş sonuçla da yatay taşma yok
    await page.getByRole('button', { name: 'Ara durak ekle' }).click();
    await page.getByLabel('Ara durak 1').selectOption('27');
    await page.locator('#cons').fill('7,5');
    await page.locator('#price').fill('45,50');
    await page.locator('#calc').click();
    await expect(page.locator('#r-legs li')).toHaveCount(2);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
