import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/kalori-hesapla/';
const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

/** Sayfayı açar; modül betiği yüklenmeden form gönderilmesin diye ağın sakinleşmesini bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
}

/** Formu doldurur; yaş, boy, kilo ve cinsiyet zorunlu, diğerleri isteğe bağlı. */
async function fillForm(page: Page, v: { h: string; w: string; age: string; sex?: 'Kadın' | 'Erkek'; activity?: string; formula?: string }) {
  await page.locator('#height').fill(v.h);
  await page.locator('#weight').fill(v.w);
  await page.locator('#age').fill(v.age);
  if (v.sex) await page.getByLabel(v.sex, { exact: true }).check();
  if (v.activity) await page.locator('#activity').selectOption(v.activity);
  if (v.formula) await page.locator('#formula').selectOption(v.formula);
}

test.describe('Günlük Kalori İhtiyacı Hesaplama', () => {
  test('erkek 30 yaş 180 cm 80 kg, ×1,55 → BMR 1.780, bakım 2.759, fark satırları ve makro; uyarı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    // Sağlık uyarısı hem başlık bölümünde hem sonuçta görünür olmalı
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await fillForm(page, { h: '180', w: '80', age: '30', sex: 'Erkek', activity: '1.55' });
    await page.getByRole('button', { name: 'Kalori hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-formula')).toHaveText('Mifflin-St Jeor');
    await expect(page.locator('#r-bmr')).toContainText(/1\.?780 kcal/);
    await expect(page.locator('#r-factor')).toContainText('×1,55');
    await expect(page.locator('#r-tdee')).toContainText(/2\.?759 kcal/);
    // Karşılaştırma: Harris-Benedict 1853,632 → 1.854
    await expect(page.locator('#r-other')).toContainText(/1\.?854/);
    const row = (d: number) => page.locator(`#targets .kdv-row[data-delta="${d}"] dd`);
    await expect(page.locator('#targets .kdv-row')).toHaveCount(5);
    await expect(row(-500)).toContainText(/2\.?259 kcal/);
    await expect(row(-250)).toContainText(/2\.?509 kcal/);
    await expect(row(0)).toContainText(/2\.?759 kcal/);
    await expect(row(250)).toContainText(/3\.?009 kcal/);
    await expect(row(500)).toContainText(/3\.?259 kcal/);
    // Teorik haftalık değişim: 500 × 7 / 7700 = 0,45 kg
    await expect(page.locator('#targets .kdv-row[data-delta="-500"] dt')).toContainText('−0,45 kg/hafta');
    // Varsayılan makro %30/40/30 (bakım 2759 kcal): 207 / 276 / 92 g
    await expect(page.locator('#r-prot')).toContainText('207 g');
    await expect(page.locator('#r-carb')).toContainText('276 g');
    await expect(page.locator('#r-fat')).toContainText('92 g');
    // 1200 altı yok → uyarı gizli
    await expect(page.locator('#r-low')).toBeHidden();
    // Uyarı sonuçta da görünür
    await expect(page.locator('#r-disclaimer')).toBeVisible();
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    expect(external).toEqual([]);
    noErrors();
  });

  test('bilinen değerler: Mifflin kadın 1345,25; erkek 1780; Harris-Benedict erkek 1853,632 (modül işlevi)', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(async () => {
      const m = await import('/kalori-hesapla/tool.js');
      const base = { protein: '30', carb: '40', fat: '30', macroTarget: '0' };
      const k = m.computeCalories({ ...base, height: '165', weight: '60', age: '25', sex: 'k', activity: '1.2', formula: 'mifflin' });
      const e = m.computeCalories({ ...base, height: '180', weight: '80', age: '30', sex: 'e', activity: '1.55', formula: 'mifflin' });
      const h = m.computeCalories({ ...base, height: '180', weight: '80', age: '30', sex: 'e', activity: '1.55', formula: 'harris' });
      const hk = m.computeCalories({ ...base, height: '165', weight: '60', age: '25', sex: 'k', activity: '1.2', formula: 'harris' });
      return { kBmr: k.bmr, kTdee: k.tdee, kOther: k.otherBmr, eBmr: e.bmr, eTdee: e.tdee, hBmr: h.bmr, hOther: h.otherBmr, hkBmr: hk.bmr, grams: e.macro.grams };
    });
    expect(out.kBmr).toBeCloseTo(1345.25, 2);
    expect(out.kTdee).toBeCloseTo(1345.25 * 1.2, 2);
    expect(out.eBmr).toBeCloseTo(1780, 2);
    expect(out.eTdee).toBeCloseTo(2759, 2);
    // Harris-Benedict (revize 1984): 88,362 + 13,397×80 + 4,799×180 − 5,677×30
    expect(out.hBmr).toBeCloseTo(88.362 + 13.397 * 80 + 4.799 * 180 - 5.677 * 30, 3);
    expect(out.hBmr).toBeCloseTo(1853.632, 3);
    expect(out.hOther).toBeCloseTo(1780, 2); // seçili formül Harris iken karşılaştırma Mifflin
    // Kadın: 447,593 + 9,247×60 + 3,098×165 − 4,330×25
    expect(out.hkBmr).toBeCloseTo(1405.333, 3);
    expect(out.kOther).toBeCloseTo(1405.333, 3);
    // Makro: 2759 kcal × %30 / 4, × %40 / 4, × %30 / 9
    expect(out.grams.protein).toBeCloseTo((2759 * 30) / 100 / 4, 2);
    expect(out.grams.carb).toBeCloseTo((2759 * 40) / 100 / 4, 2);
    expect(out.grams.fat).toBeCloseTo((2759 * 30) / 100 / 9, 2);
  });

  test('kadın 25 yaş 165 cm 60 kg arayüzde 1.345 kcal; Harris-Benedict seçimi sonucu ve karşılaştırmayı değiştirir', async ({ page }) => {
    await open(page);
    await fillForm(page, { h: '165', w: '60', age: '25', sex: 'Kadın', activity: '1.375' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmr')).toContainText(/1\.?345 kcal/);
    // 1345,25 × 1,375 = 1849,7
    await expect(page.locator('#r-tdee')).toContainText(/1\.?850 kcal/);
    await page.locator('#formula').selectOption('harris');
    await page.locator('#calc').click();
    await expect(page.locator('#r-formula')).toContainText('Harris-Benedict');
    await expect(page.locator('#r-bmr')).toContainText(/1\.?405 kcal/);
    await expect(page.locator('#r-other-l')).toContainText('Mifflin-St Jeor');
    await expect(page.locator('#r-other')).toContainText(/1\.?345 kcal/);
  });

  test('1.200 kcal altındaki satırlar işaretlenir ve hekim/diyetisyen notu çıkar; makro satırı seçilebilir', async ({ page }) => {
    await open(page);
    // Kadın 25 yaş 150 cm 45 kg, hareketsiz: BMR 1101,5 → bakım 1321,8; −500 → 821,8; −250 → 1071,8
    await fillForm(page, { h: '150', w: '45', age: '25', sex: 'Kadın', activity: '1.2' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmr')).toContainText(/1\.?102 kcal/);
    await expect(page.locator('#r-tdee')).toContainText(/1\.?322 kcal/);
    await expect(page.locator('#targets .kdv-row.is-low')).toHaveCount(2);
    await expect(page.locator('#targets .kdv-row[data-delta="-500"]')).toContainText('1.200 kcal altında');
    await expect(page.locator('#targets .kdv-row[data-delta="-250"]')).toContainText('1.200 kcal altında');
    await expect(page.locator('#targets .kdv-row[data-delta="0"]')).not.toContainText('1.200 kcal altında');
    await expect(page.locator('#r-low')).toBeVisible();
    await expect(page.locator('#r-low')).toContainText('hekim ya da diyetisyene danışın');
    // Makro bakım satırında 1200 üstü → makro uyarısı yok
    await expect(page.locator('#r-macro-low')).toBeHidden();
    await page.locator('#m-target').selectOption('-500');
    await page.locator('#calc').click();
    await expect(page.locator('#r-macro-low')).toBeVisible();
    await expect(page.locator('#r-macro-low')).toContainText('1.200');
    await expect(page.locator('#r-macro-t')).toContainText(/822 kcal/);
    // Tanı/doz/takviye önerisi içermemeli
    const body = (await page.locator('main').innerText()).toLowerCase();
    for (const bad of ['mg ', 'takviye alın', 'ilaç kullanın', 'vitamin al']) expect(body).not.toContain(bad);
  });

  test('özel makro yüzdeleri gramlara yansır; toplam 100 değilse çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await fillForm(page, { h: '180', w: '80', age: '30', sex: 'Erkek', activity: '1.55' });
    await page.locator('#m-protein').fill('25');
    await page.locator('#m-carb').fill('50');
    await page.locator('#m-fat').fill('25');
    await page.locator('#calc').click();
    // 2759 × %25 / 4 = 172,4 → 172 ; × %50 / 4 = 344,9 → 345 ; × %25 / 9 = 76,6 → 77
    await expect(page.locator('#r-prot')).toContainText('172 g');
    await expect(page.locator('#r-carb')).toContainText('345 g');
    await expect(page.locator('#r-fat')).toContainText('77 g');
    // Virgüllü yüzde ve toplam 100: 33,5 + 33,5 + 33
    await page.locator('#m-protein').fill('33,5');
    await page.locator('#m-carb').fill('33,5');
    await page.locator('#m-fat').fill('33');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    // Toplam 95 → hata
    await page.locator('#m-fat').fill('28');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('toplamı 100 olmalıdır');
    await expect(page.locator('#error')).toContainText('95');
    await expect(page.locator('#result')).toBeHidden();
    // Geçersiz yüzde
    await page.locator('#m-fat').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('0–100 arasında');
    // Temizle: varsayılanlar geri gelir
    await page.locator('#clear').click();
    await expect(page.locator('#m-protein')).toHaveValue('30');
    await expect(page.locator('#m-carb')).toHaveValue('40');
    await expect(page.locator('#m-fat')).toHaveValue('30');
    await expect(page.locator('#height')).toHaveValue('');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('hatalı ve boş girişler Türkçe, çözüm öneren hata verir; 18 yaş altı hesaplanmaz', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#height').fill('1,80');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('santimetre');
    await page.locator('#height').fill('180');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kilo eksik ya da geçersiz');
    await page.locator('#weight').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kilo eksik ya da geçersiz');
    await page.locator('#weight').fill('500');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('20–400');
    await page.locator('#weight').fill('80');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yaş eksik ya da geçersiz');
    await page.locator('#age').fill('12');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('18 yaş');
    await expect(page.locator('#error')).toContainText('hekimine ya da diyetisyene');
    await page.locator('#age').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Cinsiyeti seçin');
    await expect(page.locator('#result')).toBeHidden();
    // Hata sonrası düzeltince sonuç gelir ve hata kaybolur
    await page.getByLabel('Kadın', { exact: true }).check();
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#error')).toBeHidden();
    noErrors();
  });

  test('klavyeyle kullanılır: Enter ile gönderim, radyo düğmesi Boşluk ile seçilir', async ({ page }) => {
    await open(page);
    await page.locator('#height').focus();
    await page.keyboard.type('165');
    await page.keyboard.press('Tab');
    await page.keyboard.type('60');
    await page.keyboard.press('Tab');
    await page.keyboard.type('25');
    // Cinsiyet radyo grubuna Tab ile ulaş, Boşluk ile seç
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(page.getByLabel('Kadın', { exact: true })).toBeChecked();
    await page.locator('#age').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-bmr')).toContainText(/1\.?345 kcal/);
  });

  test('360px genişlikte sonuç dahil yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    // En uzun satırlar: 1.200 altı rozetleri ve Harris-Benedict etiketi
    await fillForm(page, { h: '150', w: '45', age: '25', sex: 'Kadın', activity: '1.2', formula: 'harris' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-low')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Hata kutusu açıkken de taşma yok
    await page.locator('#age').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, meta.json', async ({ page }) => {
    await open(page);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="kalori-hesapla-${s}"]`).count()).toBe(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    // Reklam A araç kutusundan hemen sonra gelir (butonların yanında/üstünde değil)
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="kalori-hesapla-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/kalori-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // Çapraz bağlantılar
    await expect(page.locator('.ba-related a[href="../vki-hesapla/"]')).toHaveCount(1);
    await expect(page.locator('.ba-related a[href="../ideal-kilo-hesapla/"]')).toHaveCount(1);
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'kalori-hesapla', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('hesapla');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
  });
});
