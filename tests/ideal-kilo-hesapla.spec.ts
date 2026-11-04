import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/ideal-kilo-hesapla/';
const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

/** Bağımsız referans hesap: test içinde, sayfadaki koddan ayrı yazılmıştır. */
function reference(sex: 'e' | 'k', cm: number) {
  const over = cm / 2.54 - 60;
  const c = sex === 'e'
    ? { devine: [50, 2.3], robinson: [52, 1.9], miller: [56.2, 1.41], hamwi: [48, 2.7] }
    : { devine: [45.5, 2.3], robinson: [49, 1.7], miller: [53.1, 1.36], hamwi: [45.5, 2.2] };
  const kg = Object.fromEntries(Object.entries(c).map(([k, [b, p]]) => [k, b + p * over]));
  const vals = Object.values(kg);
  const m = cm / 100;
  return { kg, avg: vals.reduce((a, b) => a + b, 0) / 4, min: Math.min(...vals), max: Math.max(...vals), lo: 18.5 * m * m, hi: 24.9 * m * m };
}

/** Sayfayı açar; modül betiği yüklenmeden form gönderilmesin diye ağın sakinleşmesini bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
}

async function fillForm(page: Page, v: { h: string; sex?: 'Kadın' | 'Erkek'; w?: string; age?: string }) {
  await page.locator('#height').fill(v.h);
  if (v.sex) await page.getByLabel(v.sex, { exact: true }).check();
  if (v.w !== undefined) await page.locator('#weight').fill(v.w);
  if (v.age !== undefined) await page.locator('#age').fill(v.age);
}

const row = (page: Page, key: string) => page.locator(`#formulas .kdv-row[data-key="${key}"] dd`);

test.describe('İdeal Kilo Hesaplama', () => {
  test('erkek 180 cm → dört formül ayrı satırda, ortalama ve VKİ aralığı; uyarı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await fillForm(page, { h: '180', sex: 'Erkek' });
    await page.getByRole('button', { name: 'İdeal kiloyu hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    // Dört formül ayrı satır ve sırayla: Devine, Robinson, Miller, Hamwi
    await expect(page.locator('#formulas .kdv-row')).toHaveCount(4);
    await expect(page.locator('#formulas .kdv-row').nth(0)).toContainText('Devine');
    await expect(page.locator('#formulas .kdv-row').nth(1)).toContainText('Robinson');
    await expect(page.locator('#formulas .kdv-row').nth(2)).toContainText('Miller');
    await expect(page.locator('#formulas .kdv-row').nth(3)).toContainText('Hamwi');
    await expect(row(page, 'devine')).toHaveText('75,0 kg');
    await expect(row(page, 'robinson')).toHaveText('72,6 kg');
    await expect(row(page, 'miller')).toHaveText('71,5 kg');
    await expect(row(page, 'hamwi')).toHaveText('77,3 kg');
    await expect(page.locator('#r-avg')).toHaveText('74,1 kg');
    await expect(page.locator('#r-spread')).toHaveText('71,5 – 77,3 kg');
    await expect(page.locator('#r-range')).toHaveText('59,9 – 80,7 kg');
    await expect(page.locator('#r-inch')).toContainText('70,87 inç');
    // Kilo girilmediği için karşılaştırma satırları gizli, kısa boy notu yok
    await expect(page.locator('#r-cmp')).toBeHidden();
    await expect(page.locator('#r-cmp h4')).toBeHidden();
    await expect(page.locator('#r-cur-row')).toBeHidden();
    await expect(page.locator('#r-diffavg-row')).toBeHidden();
    await expect(page.locator('#r-short')).toBeHidden();
    await expect(page.locator('#r-disclaimer')).toBeVisible();
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    expect(external).toEqual([]);
    noErrors();
  });

  test('kadın 165 cm kullanıcı arayüzü değerleri; formül sabitleri satır altında yazılı', async ({ page }) => {
    await open(page);
    await fillForm(page, { h: '165', sex: 'Kadın' });
    await page.locator('#calc').click();
    await expect(row(page, 'devine')).toHaveText('56,9 kg');
    await expect(row(page, 'robinson')).toHaveText('57,4 kg');
    await expect(row(page, 'miller')).toHaveText('59,8 kg');
    await expect(row(page, 'hamwi')).toHaveText('56,4 kg');
    await expect(page.locator('#r-avg')).toHaveText('57,7 kg');
    await expect(page.locator('#r-range')).toHaveText('50,4 – 67,8 kg');
    // Sabitler satırın altında görünür (kadın: Robinson 49 + 1,7)
    await expect(page.locator('#formulas .kdv-row[data-key="robinson"] dt')).toContainText('49 + 1,7 × (boy[inç] − 60)');
    await expect(page.locator('#formulas .kdv-row[data-key="miller"] dt')).toContainText('53,1 + 1,36');
    // Cinsiyeti değiştirince sonuç değişir
    await page.getByLabel('Erkek', { exact: true }).check();
    await page.locator('#calc').click();
    await expect(page.locator('#formulas .kdv-row[data-key="robinson"] dt')).toContainText('52 + 1,9');
  });

  test('bilinen değerler: modül işlevi bağımsız referansla eşleşir; 152,4 cm taban değerleri verir', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(async () => {
      const m = await import('/ideal-kilo-hesapla/tool.js');
      const pick = (r: any) => ({ kg: Object.fromEntries(r.rows.map((x: any) => [x.key, x.kg])), avg: r.avg, min: r.min, max: r.max, lo: r.bmiMin, hi: r.bmiMax, inch: r.inchOver, short: r.shortHeight });
      return {
        e180: pick(m.computeIdeal({ height: '180', sex: 'e' })),
        k165: pick(m.computeIdeal({ height: '165', sex: 'k' })),
        e1524: pick(m.computeIdeal({ height: '152,4', sex: 'e' })),
        k150: pick(m.computeIdeal({ height: '150', sex: 'k' })),
        w: m.computeIdeal({ height: '180', sex: 'e', weight: '72' }),
      };
    });
    for (const [key, sex, cm] of [['e180', 'e', 180], ['k165', 'k', 165]] as const) {
      const ref = reference(sex, cm);
      const got = (out as any)[key];
      for (const f of ['devine', 'robinson', 'miller', 'hamwi']) expect(got.kg[f], `${key}.${f}`).toBeCloseTo((ref.kg as any)[f], 6);
      expect(got.avg).toBeCloseTo(ref.avg, 6);
      expect(got.min).toBeCloseTo(ref.min, 6);
      expect(got.max).toBeCloseTo(ref.max, 6);
      expect(got.lo).toBeCloseTo(ref.lo, 6);
      expect(got.hi).toBeCloseTo(ref.hi, 6);
    }
    // 180 cm erkek: bilinen yuvarlanmış değerler
    expect(out.e180.kg.devine).toBeCloseTo(74.99, 2);
    expect(out.e180.kg.hamwi).toBeCloseTo(77.34, 2);
    expect(out.e180.avg).toBeCloseTo(74.12, 2);
    expect(out.e180.lo).toBeCloseTo(59.94, 2);
    expect(out.e180.hi).toBeCloseTo(80.676, 3);
    // 152,4 cm (5 fit): inç farkı 0 → taban değerler
    expect(out.e1524.inch).toBeCloseTo(0, 6);
    expect(out.e1524.kg.devine).toBeCloseTo(50, 6);
    expect(out.e1524.kg.robinson).toBeCloseTo(52, 6);
    expect(out.e1524.kg.miller).toBeCloseTo(56.2, 6);
    expect(out.e1524.kg.hamwi).toBeCloseTo(48, 6);
    expect(out.e1524.short).toBe(false);
    // 150 cm kadın: 5 fit altı → kısa boy işareti
    expect(out.k150.short).toBe(true);
    // Mevcut kilo 72 kg, 180 cm: VKİ 22,2; ortalamadan −2,12; aralığın içinde
    expect(out.w.bmi).toBeCloseTo(72 / 3.24, 6);
    expect(out.w.diffAvg).toBeCloseTo(72 - out.e180.avg, 6);
    expect(out.w.position).toBe('within');
  });

  test('mevcut kilo: ortalamaya ve VKİ aralığına göre fark; aralığın altı ve üstü', async ({ page }) => {
    await open(page);
    await fillForm(page, { h: '180', sex: 'Erkek', w: '72' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-cmp')).toBeVisible();
    await expect(page.locator('#r-cur')).toHaveText('72,0 kg · VKİ 22,2');
    await expect(page.locator('#r-diffavg')).toHaveText('−2,1 kg (ortalamanın altında)');
    await expect(page.locator('#r-diffrange')).toHaveText('aralığın içinde');
    // Aralığın üstü: 90 − 80,676 = 9,3
    await page.locator('#weight').fill('90');
    await page.locator('#calc').click();
    await expect(page.locator('#r-diffavg')).toContainText('ortalamanın üzerinde');
    await expect(page.locator('#r-diffrange')).toHaveText('üst sınırın 9,3 kg üzerinde');
    // Aralığın altı: 59,94 − 55 = 4,9 ; virgüllü kilo da kabul edilir
    await page.locator('#weight').fill('55,0');
    await page.locator('#calc').click();
    await expect(page.locator('#r-diffrange')).toHaveText('alt sınırın 4,9 kg altında');
    await expect(page.locator('#r-cur')).toContainText('VKİ 17,0');
    // Kilo temizlenince satırlar gizlenir
    await page.locator('#weight').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#r-cur-row')).toBeHidden();
    await expect(page.locator('#r-diffrange-row')).toBeHidden();
    // Karşılaştırma metni yön/diyet önerisi içermez
    const body = (await page.locator('#result').innerText()).toLowerCase();
    for (const bad of ['kilo vermelisiniz', 'kilo almalısınız', 'diyet yapın', 'takviye alın']) expect(body).not.toContain(bad);
  });

  test('kısa boy uyarısı: 152,4 cm altında not çıkar, üstünde çıkmaz; sınır dışı boy hata verir', async ({ page }) => {
    await open(page);
    await fillForm(page, { h: '145', sex: 'Kadın' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-short')).toBeVisible();
    await expect(page.locator('#r-short')).toContainText('152,4 cm');
    // 145 cm kadın, Devine: 45,5 + 2,3 × (57,09 − 60) = 38,8
    await expect(row(page, 'devine')).toHaveText('38,8 kg');
    await page.locator('#height').fill('153');
    await page.locator('#calc').click();
    await expect(page.locator('#r-short')).toBeHidden();
    await page.locator('#height').fill('139');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('140–230');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#height').fill('231');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('140–230');
    await page.locator('#height').fill('230');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
  });

  test('hatalı ve boş girişler Türkçe, çözüm öneren hata verir; 18 yaş altı hesaplanmaz; Temizle sıfırlar', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#height').fill('1,75');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('santimetre');
    await page.locator('#height').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy eksik ya da geçersiz');
    await page.locator('#height').fill('175');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Cinsiyeti seçin');
    await page.getByLabel('Kadın', { exact: true }).check();
    await page.locator('#weight').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('20–400');
    await page.locator('#weight').fill('500');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('20–400');
    await page.locator('#weight').fill('');
    await page.locator('#age').fill('12');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('18 yaş');
    await expect(page.locator('#error')).toContainText('persentil');
    await page.locator('#age').fill('x');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yaş geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    // Yaş isteğe bağlı: boş ya da geçerli olunca sonuç gelir, hata kaybolur
    await page.locator('#age').fill('35');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#error')).toBeHidden();
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#height')).toHaveValue('');
    await expect(page.locator('#age')).toHaveValue('');
    await expect(page.getByLabel('Kadın', { exact: true })).not.toBeChecked();
    noErrors();
  });

  test('klavyeyle kullanılır: Tab ile alanlar, Boşluk ile cinsiyet, Enter ile gönderim', async ({ page }) => {
    await open(page);
    await page.locator('#height').focus();
    await page.keyboard.type('165');
    await page.keyboard.press('Tab');
    // İlk radyo (Kadın) odaklanır; Boşluk ile seçilir
    await page.keyboard.press('Space');
    await expect(page.getByLabel('Kadın', { exact: true })).toBeChecked();
    await page.locator('#weight').focus();
    await page.keyboard.type('60');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-avg')).toHaveText('57,7 kg');
    await expect(page.locator('#r-cur')).toContainText('60,0 kg');
  });

  test('360px genişlikte sonuç (kilo ve kısa boy notuyla) dahil yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await fillForm(page, { h: '145', sex: 'Kadın', w: '88,5', age: '40' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-short')).toBeVisible();
    await expect(page.locator('#r-diffrange-row')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#height').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, çapraz bağlantılar, meta.json', async ({ page }) => {
    await open(page);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="ideal-kilo-hesapla-${s}"]`).count()).toBe(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="ideal-kilo-hesapla-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/ideal-kilo-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // vki-hesapla ve kalori-hesapla sayfalarına çapraz bağlantı (içerik içinde ve ilgili araçlarda)
    await expect(page.locator('.ba-content a[href="../vki-hesapla/"]').first()).toBeVisible();
    await expect(page.locator('.ba-content a[href="../kalori-hesapla/"]').first()).toBeVisible();
    await expect(page.locator('.ba-related a[href="../vki-hesapla/"]')).toHaveCount(1);
    await expect(page.locator('.ba-related a[href="../kalori-hesapla/"]')).toHaveCount(1);
    // Dört formülün adı sayfa metninde geçer
    const text = await page.locator('.ba-content').innerText();
    for (const n of ['Devine', 'Robinson', 'Miller', 'Hamwi']) expect(text).toContain(n);
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'ideal-kilo-hesapla', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('hesapla');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
  });
});
