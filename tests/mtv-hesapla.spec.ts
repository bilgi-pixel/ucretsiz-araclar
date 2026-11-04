import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const params = JSON.parse(readFileSync('web/mtv-hesapla/parametreler.json', 'utf8'));
const tl = (n: number) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' TL';
const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const tur = (id: string) => params.turler.find((t: any) => t.id === id);

test.describe('MTV Hesaplama', () => {
  test('otomobil: seçim → parametre tablosundaki tutar; taksit = yarısı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/mtv-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#tur option')).toHaveCount(params.turler.length);
    const oto = tur('otomobil');
    const band = oto.dilimler.find((d: any) => d.id === '1600'); // 1301-1600 cm³
    const yas = '4-6';
    await page.locator('#tur').selectOption('otomobil');
    await page.locator('#hacim').fill('1598');
    await page.locator('#yas').selectOption(yas);
    // Değer dilimi seçenekleri hacme göre kurulur (1301-1600 cm³: 3 dilim).
    await expect(page.locator('#deger option')).toHaveCount(band.degerler.length);
    await page.locator('#deger').selectOption('d1');
    await page.locator('#calc').click();
    const base = band.degerler[0].tutar[yas];
    await expect(page.locator('#r-base')).toHaveText(tl(base));
    await expect(page.locator('#r-total')).toHaveText(tl(base));
    await expect(page.locator('#r-t1')).toHaveText(tl(round2(base / 2)));
    await expect(page.locator('#r-t2')).toHaveText(tl(round2(base - round2(base / 2))));
    await expect(page.locator('#t1-label')).toContainText('Ocak');
    await expect(page.locator('#t2-label')).toContainText('Temmuz');
    await expect(page.locator('#r-note')).not.toContainText('yaklaşık');

    // Üst değer dilimi: o dilimin tutarı uygulanır.
    await page.locator('#deger').selectOption('d3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText(tl(band.degerler[2].tutar[yas]));

    // Sınır: 1300 cm³ alt dilimde, 1301 cm³ üst dilimde.
    await page.locator('#hacim').fill('1300');
    await page.locator('#deger').selectOption('d1');
    await page.locator('#yas').selectOption('1-3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-base')).toHaveText(tl(oto.dilimler[0].degerler[0].tutar['1-3']));
    await page.locator('#hacim').fill('1301');
    await page.locator('#calc').click();
    await expect(page.locator('#r-base')).toHaveText(tl(oto.dilimler[1].degerler[0].tutar['1-3']));

    // Elektrikli: motor gücüne (kW) göre satır, tutarın %25'i. 100 kW → 85-105 kW → 1601-1800 cm³ satırı.
    await page.locator('#elektrikli').check();
    await expect(page.locator('#kw-field')).toBeVisible();
    await expect(page.locator('#hacim-field')).toBeHidden();
    await page.locator('#kw').fill('100');
    await page.locator('#deger').selectOption('d1');
    await page.locator('#calc').click();
    const e = oto.dilimler.find((d: any) => d.id === '1800').degerler[0].tutar['1-3'];
    await expect(page.locator('#r-total')).toHaveText(tl(round2(e * params.elektrikli.oran)));
    await expect(page.locator('#r-note')).toContainText('Elektrikli');
    await expect(page.locator('#r-note')).toContainText('100 kW');

    expect(external).toEqual([]);
    noErrors();
  });

  test('motosiklet ve sınıflı türler: tutar tablodan gelir; ikinci alan türe göre değişir', async ({ page }) => {
    await page.goto('/mtv-hesapla/');
    await page.waitForLoadState('networkidle');
    const moto = tur('motosiklet');
    await page.locator('#tur').selectOption('motosiklet');
    await expect(page.locator('#deger-field')).toBeHidden();
    await expect(page.locator('#elek-field')).toBeVisible(); // elektrikli motosiklet de %25 (kW'a göre)
    await page.locator('#hacim').fill('400');
    await page.locator('#yas').selectOption('7-11');
    await page.locator('#calc').click();
    const m = moto.dilimler.find((d: any) => d.id === '251-650');
    await expect(page.locator('#r-total')).toHaveText(tl(m.tutar['7-11']));
    await expect(page.locator('#r-t1')).toHaveText(tl(round2(m.tutar['7-11'] / 2)));

    const bus = tur('otobus');
    await page.locator('#tur').selectOption('otobus');
    await expect(page.locator('#hacim-field')).toBeHidden();
    await expect(page.locator('#sinif-label')).toHaveText(bus.etiket);
    await expect(page.locator('#sinif option')).toHaveCount(bus.dilimler.length);
    await page.locator('#sinif').selectOption(bus.dilimler[1].id);
    await page.locator('#yas').selectOption('16+');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText(tl(bus.dilimler[1].tutar['16+']));
  });

  test('GİB tutarı girilirse yalnızca taksitlere bölünür (taksit = yarısı)', async ({ page }) => {
    await page.goto('/mtv-hesapla/');
    await page.waitForLoadState('networkidle');
    await page.locator('#gib').fill('12.500,50');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText(tl(12500.5));
    await expect(page.locator('#r-t1')).toHaveText(tl(6250.25));
    await expect(page.locator('#r-t2')).toHaveText(tl(6250.25));
    await expect(page.locator('#r-note')).not.toContainText('yaklaşık');
    await page.locator('#gib').fill('10000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-t1')).toHaveText(tl(5000));
    await expect(page.locator('#r-t2')).toHaveText(tl(5000));
  });

  test('hatalı giriş Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/mtv-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#tur option').first()).toBeAttached();
    // Boş hacim
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Motor hacmini cm³ olarak');
    await expect(page.locator('#result')).toBeHidden();
    // Harfli hacim
    await page.locator('#hacim').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Motor hacmini cm³ olarak');
    // Hatalı GİB tutarı
    await page.locator('#hacim').fill('1598');
    await page.locator('#gib').fill('12x5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('GİB tutarı geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    // Tarifede olmayan motosiklet hacmi
    await page.locator('#gib').fill('');
    await page.locator('#tur').selectOption('motosiklet');
    await page.locator('#hacim').fill('50');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('tarifede tutar bulunamadı');
  });

  test('sayfa içeriği: ≥900 kelime, ≥7 SSS, 3 reklam alanı, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/mtv-hesapla/');
    await page.waitForLoadState('networkidle');
    const words = await page.locator('.ba-content').evaluate((n) => (n.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="mtv-hesapla-${s}"]`)).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
