import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/nabiz-hesapla/';
const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

/** Sayfayı açar; modül betiği yüklenmeden form gönderilmesin diye ağın sakinleşmesini bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
}

/** Formu doldurur; boş bırakılan alanlar atlanır. */
async function fillForm(page: Page, v: { age?: string; rest?: string; formula?: string; intensity?: string }) {
  if (v.age !== undefined) await page.locator('#age').fill(v.age);
  if (v.rest !== undefined) await page.locator('#rest').fill(v.rest);
  if (v.intensity !== undefined) await page.locator('#intensity').fill(v.intensity);
  if (v.formula) await page.locator('#formula').selectOption(v.formula);
}

const zoneSimple = (page: Page, n: number) => page.locator(`#zones tr[data-zone="${n}"] .nb-simple`);
const zoneKarv = (page: Page, n: number) => page.locator(`#zones tr[data-zone="${n}"] .nb-karv`);

test.describe('Hedef Nabız Hesaplama', () => {
  test('40 yaş klasik formül → maksimum 180, beş bölge, bölge 2 = 108–126; uyarı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    // Sağlık uyarısı hem başlık bölümünde hem sonuçta görünür olmalı
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await fillForm(page, { age: '40' });
    await page.getByRole('button', { name: 'Hedef nabzı hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-formula')).toContainText('Klasik');
    await expect(page.locator('#r-max')).toHaveText('180 atım/dk');
    // Karşılaştırma: Tanaka 208 − 0,7 × 40 = 180
    await expect(page.locator('#r-other-l')).toContainText('Tanaka');
    await expect(page.locator('#r-other')).toHaveText('180 atım/dk');
    await expect(page.locator('#zones tr')).toHaveCount(5);
    await expect(zoneSimple(page, 1)).toHaveText('90–108');
    await expect(zoneSimple(page, 2)).toHaveText('108–126');
    await expect(zoneSimple(page, 3)).toHaveText('126–144');
    await expect(zoneSimple(page, 4)).toHaveText('144–162');
    await expect(zoneSimple(page, 5)).toHaveText('162–180');
    await expect(page.locator('#zones tr[data-zone="2"]')).toContainText('Yağ yakımı');
    await expect(page.locator('#zones tr[data-zone="2"]')).toContainText('%60–70');
    // Dinlenme nabzı girilmedi → Karvonen satırları yok
    await expect(page.locator('#row-rest')).toBeHidden();
    await expect(page.locator('#row-target-karv')).toBeHidden();
    await expect(page.locator('#zones .nb-karv')).toHaveCount(0);
    // Uyarı sonuçta da görünür; doz/ilaç/takviye önerisi yok
    await expect(page.locator('#r-disclaimer')).toBeVisible();
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    await expect(page.locator('#r-disclaimer')).toContainText('hekim');
    const body = (await page.locator('main').innerText()).toLowerCase();
    for (const bad of ['mg ', 'takviye alın', 'ilaç kullanın', 'vitamin al']) expect(body).not.toContain(bad);
    expect(external).toEqual([]);
    noErrors();
  });

  test('bilinen değerler (modül işlevi): klasik, Tanaka, Karvonen ve bölge sınırları', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(async () => {
      const m = await import('/nabiz-hesapla/tool.js');
      const cl = (age: number) => m.maxHeartRate('classic', age);
      const tk = (age: number) => m.maxHeartRate('tanaka', age);
      const r = m.computeHeartRate({ age: '40', rest: '60', formula: 'classic', intensity: '70' });
      const t = m.computeHeartRate({ age: '50', rest: '', formula: 'tanaka', intensity: '' });
      return {
        classic: [20, 40, 60, 100].map(cl), tanaka: [20, 40, 60, 100].map(tk), tanaka45: tk(45),
        karv: m.karvonen(60, 180, 70), pct: m.percentOfMax(180, 70),
        r: { max: r.max, other: r.otherMax, rest: r.rest, reserve: r.reserve, intensity: r.intensity,
          zones: r.zones.map((z: any) => [z.simpleLo, z.simpleHi, z.karvLo, z.karvHi]) },
        t: { max: t.max, other: t.otherMax, rest: t.rest, intensity: t.intensity, karvLo: t.zones[0].karvLo },
      };
    });
    // 220 − yaş ve 208 − 0,7 × yaş
    expect(out.classic).toEqual([200, 180, 160, 120]);
    expect(out.tanaka).toEqual([194, 180, 166, 138]);
    expect(out.tanaka45).toBe(177); // 176,5 → yukarı yuvarlanır
    // Karvonen: 60 + (180 − 60) × 0,70 = 144; maksimumun %70'i = 126
    expect(out.karv).toBe(144);
    expect(out.pct).toBe(126);
    expect(out.r.max).toBe(180);
    expect(out.r.other).toBe(180);
    expect(out.r.rest).toBe(60);
    expect(out.r.reserve).toBe(120);
    expect(out.r.intensity).toEqual({ pct: 70, simple: 126, karvonen: 144 });
    expect(out.r.zones).toEqual([
      [90, 108, 120, 132],
      [108, 126, 132, 144],
      [126, 144, 144, 156],
      [144, 162, 156, 168],
      [162, 180, 168, 180],
    ]);
    // Tanaka 50 yaş: 208 − 35 = 173; klasik 170; dinlenme nabzı yoksa Karvonen değerleri null
    expect(out.t.max).toBe(173);
    expect(out.t.other).toBe(170);
    expect(out.t.rest).toBeNull();
    expect(out.t.intensity).toBeNull();
    expect(out.t.karvLo).toBeNull();
  });

  test('Tanaka seçimi sonucu ve karşılaştırmayı değiştirir: 50 yaş → 173, klasik 170', async ({ page }) => {
    await open(page);
    await fillForm(page, { age: '50', formula: 'tanaka' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-formula')).toContainText('Tanaka');
    await expect(page.locator('#r-max')).toHaveText('173 atım/dk');
    await expect(page.locator('#r-other-l')).toContainText('Klasik');
    await expect(page.locator('#r-other')).toHaveText('170 atım/dk');
    // 173 × 0,6 = 103,8 → 104 ; 173 × 0,7 = 121,1 → 121
    await expect(zoneSimple(page, 2)).toHaveText('104–121');
    // Klasik formüle dönünce 170
    await page.locator('#formula').selectOption('classic');
    await page.locator('#calc').click();
    await expect(page.locator('#r-max')).toHaveText('170 atım/dk');
    await expect(page.locator('#r-other')).toHaveText('173 atım/dk');
    await expect(zoneSimple(page, 2)).toHaveText('102–119');
  });

  test('Karvonen: dinlenme 60, %70 → 144 atım/dk; bölge satırları ve rezerv; dinlenme nabzı silinince gizlenir', async ({ page }) => {
    await open(page);
    await fillForm(page, { age: '40', rest: '60', intensity: '70' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#row-rest')).toBeVisible();
    await expect(page.locator('#r-rest')).toHaveText('60 atım/dk');
    await expect(page.locator('#r-reserve')).toHaveText('120 atım/dk');
    await expect(page.locator('#row-target-simple')).toBeVisible();
    await expect(page.locator('#r-target-simple-l')).toContainText('%70');
    await expect(page.locator('#r-target-simple')).toHaveText('126 atım/dk');
    await expect(page.locator('#row-target-karv')).toBeVisible();
    await expect(page.locator('#r-target-karv')).toHaveText('144 atım/dk');
    await expect(page.locator('#r-method')).toContainText('Karvonen');
    await expect(page.locator('#r-method')).toContainText('60');
    // Bölge 2: maksimum yüzdesi 108–126, Karvonen 132–144
    await expect(zoneSimple(page, 2)).toHaveText('108–126');
    await expect(zoneKarv(page, 2)).toHaveText('Karvonen: 132–144');
    await expect(zoneKarv(page, 1)).toHaveText('Karvonen: 120–132');
    await expect(zoneKarv(page, 5)).toHaveText('Karvonen: 168–180');
    await expect(page.locator('#r-zone-note')).toBeVisible();
    // Virgüllü yoğunluk: %72,5 → 60 + 120 × 0,725 = 147
    await page.locator('#intensity').fill('72,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-target-karv')).toHaveText('147 atım/dk');
    await expect(page.locator('#r-target-simple-l')).toContainText('%72,5');
    // Dinlenme nabzını ve yoğunluğu silince Karvonen ve hedef satırları kaybolur
    await page.locator('#rest').fill('');
    await page.locator('#intensity').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#row-rest')).toBeHidden();
    await expect(page.locator('#row-reserve')).toBeHidden();
    await expect(page.locator('#row-target-simple')).toBeHidden();
    await expect(page.locator('#row-target-karv')).toBeHidden();
    await expect(page.locator('#zones .nb-karv')).toHaveCount(0);
    // Yoğunluk girildi ama dinlenme nabzı yok: yalnızca maksimum yüzdesi satırı
    await page.locator('#intensity').fill('70');
    await page.locator('#calc').click();
    await expect(page.locator('#row-target-simple')).toBeVisible();
    await expect(page.locator('#row-target-karv')).toBeHidden();
    // Temizle: form ve sonuç sıfırlanır
    await page.locator('#clear').click();
    await expect(page.locator('#age')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('hatalı ve boş girişler Türkçe, çözüm öneren hata verir; düzeltince sonuç gelir', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yaş eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#age').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yaş eksik ya da geçersiz');
    await page.locator('#age').fill('40,5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Tam sayı');
    await page.locator('#age').fill('17');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('18 yaş');
    await expect(page.locator('#error')).toContainText('hekiminize danışın');
    await page.locator('#age').fill('101');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('100');
    await page.locator('#age').fill('40');
    await page.locator('#rest').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('30–120');
    await page.locator('#rest').fill('150');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('30–120');
    await page.locator('#rest').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('30–120');
    await expect(page.locator('#result')).toBeHidden();
    // Dinlenme nabzı maksimumdan küçük olmalı: 100 yaş → maksimum 120, dinlenme 120
    await page.locator('#age').fill('100');
    await page.locator('#rest').fill('120');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('maksimum nabızdan (120) küçük');
    // Yoğunluk aralığı
    await page.locator('#age').fill('40');
    await page.locator('#rest').fill('60');
    await page.locator('#intensity').fill('20');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('30–100');
    await expect(page.locator('#result')).toBeHidden();
    // Hata sonrası düzeltince sonuç gelir ve hata kaybolur
    await page.locator('#intensity').fill('70');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#error')).toBeHidden();
    noErrors();
  });

  test('klavyeyle kullanılır: Tab ile ilerleme, açılır liste ok tuşuyla, Enter ile gönderim', async ({ page }) => {
    await open(page);
    await page.locator('#age').focus();
    await page.keyboard.type('40');
    await page.keyboard.press('Tab'); // formül listesi
    await expect(page.locator('#formula')).toBeFocused();
    await page.keyboard.press('ArrowDown'); // Tanaka
    await expect(page.locator('#formula')).toHaveValue('tanaka');
    await page.keyboard.press('Tab'); // dinlenme nabzı
    await page.keyboard.type('60');
    await page.locator('#rest').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-max')).toHaveText('180 atım/dk');
    await expect(page.locator('#r-formula')).toContainText('Tanaka');
    await expect(zoneKarv(page, 3)).toHaveText('Karvonen: 144–156');
  });

  test('360px genişlikte sonuç (Karvonen dahil) ve hata kutusu açıkken yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await fillForm(page, { age: '100', rest: '110', intensity: '72,5', formula: 'tanaka' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#zones tr')).toHaveCount(5);
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Tablo taşsa bile sayfa taşmamalı; satırlar ekranda okunur
    await expect(page.locator('#zones tr[data-zone="5"]')).toBeVisible();
    // Hata kutusu açıkken de taşma yok
    await page.locator('#age').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, elle ölçüm bölümü, meta.json', async ({ page }) => {
    await open(page);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="nabiz-hesapla-${s}"]`).count()).toBe(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    // Reklam A araç kutusundan hemen sonra gelir (butonların yanında/üstünde değil)
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="nabiz-hesapla-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/nabiz-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // Nabzı elle ölçme bölümü (15 sn × 4) ve hekim uyarısı
    await expect(page.locator('.ba-content h2', { hasText: 'Nabzı elle nasıl ölçersiniz' })).toHaveCount(1);
    await expect(page.locator('.ba-content')).toContainText('15 saniye');
    await expect(page.locator('.ba-content')).toContainText('dörtle çarpın');
    await expect(page.locator('.ba-content .ba-note').first()).toContainText(WARN);
    await expect(page.locator('.ba-content')).toContainText('Kimler hekime danışmalı');
    // Çapraz bağlantılar (yalnızca bağlantı varlığı; hedef sayfa başka ajanda olabilir)
    for (const href of ['../adim-hesapla/', '../kalori-hesapla/', '../vki-hesapla/']) {
      await expect(page.locator(`.ba-related a[href="${href}"]`)).toHaveCount(1);
    }
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'nabiz-hesapla', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('hesapla');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
  });
});
