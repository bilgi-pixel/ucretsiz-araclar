import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/adim-hesapla/';
const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

/** Sayfayı açar; modül betiği yüklenmeden form gönderilmesin diye ağın sakinleşmesini bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
}

/** Formu doldurur; boş bırakılan alanlar atlanır. */
async function fillForm(page: Page, v: { steps?: string; h?: string; w?: string; sex?: 'Kadın' | 'Erkek'; stride?: string; pace?: string }) {
  if (v.steps !== undefined) await page.locator('#steps').fill(v.steps);
  if (v.h !== undefined) await page.locator('#height').fill(v.h);
  if (v.w !== undefined) await page.locator('#weight').fill(v.w);
  if (v.stride !== undefined) await page.locator('#stride').fill(v.stride);
  if (v.sex) await page.getByLabel(v.sex, { exact: true }).check();
  if (v.pace) await page.locator('#pace').selectOption(v.pace);
}

test.describe('Adım Sayısı Hesaplama', () => {
  test('erkek 175 cm 70 kg 10.000 adım normal tempo → 72,6 cm, 7,26 km, 1 sa 27 dk, 355 kcal; uyarı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    // Sağlık uyarısı hem başlık bölümünde hem sonuçta görünür olmalı
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await fillForm(page, { steps: '10000', h: '175', w: '70', sex: 'Erkek' });
    await page.getByRole('button', { name: 'Hesapla', exact: true }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-steps')).toContainText(/10\.?000 adım/);
    await expect(page.locator('#r-stride')).toContainText('72,6 cm');
    await expect(page.locator('#r-distance')).toHaveText('7,26 km');
    await expect(page.locator('#r-pace')).toContainText('Normal yürüyüş');
    await expect(page.locator('#r-pace')).toContainText('3,5 MET');
    await expect(page.locator('#r-time')).toContainText('1 sa 27 dk');
    await expect(page.locator('#r-time')).toContainText('1,45 saat');
    // 3,5 × 70 × (87 / 60) = 355,25
    await expect(page.locator('#r-kcal')).toHaveText('355 kcal');
    await expect(page.locator('#r-goal')).toContainText('Hedefe ulaşıldı');
    // Dönem satırları: günlük, haftalık (×7), aylık (×30)
    await expect(page.locator('#periods .kdv-row')).toHaveCount(3);
    await expect(page.locator('#periods .kdv-row[data-period="day"]')).toContainText('7,26 km');
    await expect(page.locator('#periods .kdv-row[data-period="week"]')).toContainText(/70\.?000 adım/);
    await expect(page.locator('#periods .kdv-row[data-period="week"]')).toContainText('50,82 km');
    await expect(page.locator('#periods .kdv-row[data-period="week"]')).toContainText(/2\.?487 kcal/);
    await expect(page.locator('#periods .kdv-row[data-period="month"]')).toContainText('217,8 km');
    // "Cihaz adım sayarı daha doğru olabilir" notu ve sağlık uyarısı sonuçta da var
    await expect(page.locator('#result')).toContainText('adım sayarı');
    await expect(page.locator('#r-disclaimer')).toBeVisible();
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    expect(external).toEqual([]);
    noErrors();
  });

  test('bilinen değerler (modül işlevi): adım uzunluğu, mesafe, süre, kalori, ters hesap, tempolar, hedefe kalan', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(async () => {
      const m = await import('/adim-hesapla/tool.js');
      const base = { mode: 'steps', steps: '10000', height: '175', sex: 'e', stride: '', weight: '70', pace: 'normal' };
      const normal = m.computeSteps(base);
      const kadin = m.computeSteps({ ...base, height: '165', sex: 'k' });
      const ters = m.computeSteps({ ...base, mode: 'distance', distance: '5', steps: '' });
      const ters10 = m.computeSteps({ ...base, mode: 'distance', distance: '10', steps: '' });
      const olculen = m.computeSteps({ ...base, stride: '70', height: '', sex: '' });
      const yavas = m.computeSteps({ ...base, pace: 'slow' });
      const hizli = m.computeSteps({ ...base, pace: 'fast' });
      const alti = m.computeSteps({ ...base, steps: '6000' });
      return {
        normal: { stride: normal.strideCm, km: normal.distanceKm, min: normal.minutes, kcal: normal.kcal, reached: normal.goal.reached, over: normal.goal.over },
        kadin: { stride: kadin.strideCm, km: kadin.distanceKm },
        ters: { steps: ters.steps, km: ters.distanceKm, min: ters.minutes, kcal: ters.kcal },
        ters10: ters10.steps,
        olculen: { stride: olculen.strideCm, km: olculen.distanceKm, src: olculen.strideSource },
        yavas: { min: yavas.minutes, kcal: yavas.kcal }, hizli: { min: hizli.minutes, kcal: hizli.kcal },
        alti: { rem: alti.goal.remSteps, remKm: alti.goal.remKm, remMin: alti.goal.remMinutes, remKcal: alti.goal.remKcal, reached: alti.goal.reached },
        week: normal.periods.find((p: any) => p.key === 'week'),
        parse: [m.parseSteps('8.500'), m.parseSteps('8500'), m.parseSteps('8,5'), m.parseSteps('abc'), m.parseNum('2,5')],
        dur: [m.formatDuration(87), m.formatDuration(45), m.formatDuration(120), m.formatDuration(609)],
      };
    });
    // 175 × 0,415 = 72,625 → 72,6 cm; 10.000 × 72,6 / 100.000 = 7,26 km
    expect(out.normal.stride).toBeCloseTo(72.6, 5);
    expect(out.normal.km).toBeCloseTo(7.26, 6);
    // 7,26 / 5 × 60 = 87,12 dk → 87 dk; 3,5 × 70 × 87 / 60 = 355,25
    expect(out.normal.min).toBe(87);
    expect(out.normal.kcal).toBeCloseTo(355.25, 6);
    expect(out.normal.reached).toBe(true);
    expect(out.normal.over).toBe(0);
    // 165 × 0,413 = 68,145 → 68,1 cm → 6,81 km
    expect(out.kadin.stride).toBeCloseTo(68.1, 5);
    expect(out.kadin.km).toBeCloseTo(6.81, 6);
    // Ters hesap: 5 km / 72,6 cm = 6.887 adım; 5 km / 5 km/sa = 60 dk → 3,5 × 70 × 1 = 245 kcal
    expect(out.ters.steps).toBe(6887);
    expect(out.ters.km).toBe(5);
    expect(out.ters.min).toBe(60);
    expect(out.ters.kcal).toBeCloseTo(245, 6);
    expect(out.ters10).toBe(13774);
    // Ölçülen adım uzunluğu tahmini geçersiz kılar: 10.000 × 70 cm = 7 km
    expect(out.olculen.stride).toBe(70);
    expect(out.olculen.km).toBeCloseTo(7, 6);
    expect(out.olculen.src).toBe('measured');
    // Yavaş: 7,26 / 3,2 × 60 = 136,125 → 136 dk; 2,8 × 70 × 136 / 60 ; hızlı: 7,26 / 5,6 × 60 = 77,79 → 78 dk
    expect(out.yavas.min).toBe(136);
    expect(out.yavas.kcal).toBeCloseTo((2.8 * 70 * 136) / 60, 6);
    expect(out.hizli.min).toBe(78);
    expect(out.hizli.kcal).toBeCloseTo((4.3 * 70 * 78) / 60, 6);
    // 6.000 adım → 4.000 adım kaldı = 2,904 km → 35 dk → 3,5 × 70 × 35 / 60
    expect(out.alti.reached).toBe(false);
    expect(out.alti.rem).toBe(4000);
    expect(out.alti.remKm).toBeCloseTo(2.904, 6);
    expect(out.alti.remMin).toBe(35);
    expect(out.alti.remKcal).toBeCloseTo((3.5 * 70 * 35) / 60, 6);
    // Haftalık: günlük × 7
    expect(out.week.steps).toBe(70000);
    expect(out.week.km).toBeCloseTo(50.82, 6);
    expect(out.week.minutes).toBe(609);
    expect(out.week.kcal).toBeCloseTo(355.25 * 7, 6);
    // Ayrıştırma ve süre biçimi
    expect(out.parse[0]).toBe(8500);
    expect(out.parse[1]).toBe(8500);
    expect(Number.isNaN(out.parse[2])).toBe(true);
    expect(Number.isNaN(out.parse[3])).toBe(true);
    expect(out.parse[4]).toBe(2.5);
    expect(out.dur).toEqual(['1 sa 27 dk', '45 dk', '2 sa', '10 sa 9 dk']);
  });

  test('ters hesap arayüzde: 5 km → ≈ 6.887 adım; alanlar kipe göre gizlenir; temizle ilk kipe döner', async ({ page }) => {
    await open(page);
    await expect(page.locator('#f-distance')).toBeHidden();
    await expect(page.locator('#f-steps')).toBeVisible();
    await page.getByLabel('Mesafeden adım sayısı', { exact: false }).check();
    await expect(page.locator('#f-distance')).toBeVisible();
    await expect(page.locator('#f-steps')).toBeHidden();
    await page.locator('#distance').fill('5');
    await fillForm(page, { h: '175', w: '70', sex: 'Erkek' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-steps-l')).toContainText('Gereken adım sayısı');
    await expect(page.locator('#r-steps')).toContainText(/≈ 6\.?887 adım/);
    await expect(page.locator('#r-distance')).toHaveText('5 km');
    await expect(page.locator('#r-time')).toContainText('1 sa');
    await expect(page.locator('#r-kcal')).toHaveText('245 kcal');
    // 6.887 adım → 10.000'e 3.113 adım kaldı
    await expect(page.locator('#r-goal')).toContainText(/3\.?113 adım kaldı/);
    // Kilometreyi virgülle yazmak da çalışır
    await page.locator('#distance').fill('2,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-distance')).toHaveText('2,5 km');
    await expect(page.locator('#r-steps')).toContainText(/3\.?444 adım/);
    // Temizle: ilk kipe ve boş forma döner
    await page.locator('#clear').click();
    await expect(page.locator('#f-steps')).toBeVisible();
    await expect(page.locator('#f-distance')).toBeHidden();
    await expect(page.getByLabel('Adım sayısından mesafe ve kalori', { exact: false })).toBeChecked();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#steps')).toHaveValue('');
  });

  test('ölçülen adım uzunluğu boy ve cinsiyeti gereksiz kılar; kadın katsayısı ve binlik noktalı adım sayısı çalışır', async ({ page }) => {
    await open(page);
    // Boy ve cinsiyet boş, yalnızca adım uzunluğu: 10.000 × 70 cm = 7 km
    await fillForm(page, { steps: '8.500', w: '80', stride: '70', pace: 'fast' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-stride')).toContainText('70 cm');
    await expect(page.locator('#r-stride')).toContainText('ölçülen');
    // 8.500 × 70 cm = 5,95 km; 5,95 / 5,6 × 60 = 63,75 → 64 dk; 4,3 × 80 × 64 / 60 = 366,9
    await expect(page.locator('#r-distance')).toHaveText('5,95 km');
    await expect(page.locator('#r-time')).toContainText('1 sa 4 dk');
    await expect(page.locator('#r-kcal')).toHaveText('367 kcal');
    // 8.500 adım → 1.500 adım kaldı
    await expect(page.locator('#r-goal')).toContainText(/1\.?500 adım kaldı/);
    // Ölçülen değeri silince boy ve cinsiyet gerekir; kadın 165 cm → 68,1 cm
    await page.locator('#stride').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy eksik ya da geçersiz');
    await fillForm(page, { h: '165', sex: 'Kadın' });
    await page.locator('#calc').click();
    await expect(page.locator('#r-stride')).toContainText('68,1 cm');
    await expect(page.locator('#r-stride')).toContainText('0,413');
    await expect(page.locator('#r-distance')).toHaveText('5,79 km');
    // Sağlık içeriğinde doz/takviye/ilaç önerisi bulunmamalı
    const body = (await page.locator('main').innerText()).toLowerCase();
    for (const bad of ['mg ', 'takviye alın', 'ilaç kullanın', 'vitamin al']) expect(body).not.toContain(bad);
  });

  test('hatalı ve boş girişler Türkçe, çözüm öneren hata verir; düzeltince sonuç gelir', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Adım sayısı eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#steps').fill('8,5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Tam sayı');
    await page.locator('#steps').fill('300000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('200.000');
    await page.locator('#steps').fill('10000');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy eksik ya da geçersiz');
    await page.locator('#height').fill('1,75');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('santimetre');
    await page.locator('#height').fill('175');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Cinsiyeti seçin');
    await page.getByLabel('Erkek', { exact: true }).check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kilo eksik ya da geçersiz');
    await page.locator('#weight').fill('500');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('20–400');
    await page.locator('#weight').fill('70');
    await page.locator('#stride').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('30–150');
    await page.locator('#stride').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('30–150');
    await expect(page.locator('#result')).toBeHidden();
    // Hata sonrası düzeltince sonuç gelir ve hata kaybolur
    await page.locator('#stride').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#error')).toBeHidden();
    // Mesafe kipinde hatalar
    await page.getByLabel('Mesafeden adım sayısı', { exact: false }).check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Mesafe eksik ya da geçersiz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#distance').fill('500');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('0,01–200 km');
    noErrors();
  });

  test('klavyeyle kullanılır: Tab ile ilerleme, radyo düğmesi Boşluk ile seçilir, Enter ile gönderim', async ({ page }) => {
    await open(page);
    await page.locator('#steps').focus();
    await page.keyboard.type('10000');
    await page.keyboard.press('Tab'); // gizli mesafe alanı atlanır → boy
    await page.keyboard.type('175');
    await page.keyboard.press('Tab'); // cinsiyet radyo grubu
    await page.keyboard.press('Space');
    await expect(page.getByLabel('Kadın', { exact: true })).toBeChecked();
    await page.keyboard.press('Tab'); // ölçülmüş adım uzunluğu
    await page.keyboard.press('Tab'); // kilo
    await page.keyboard.type('70');
    await page.locator('#weight').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    // 175 × 0,413 = 72,275 → 72,3 cm → 7,23 km
    await expect(page.locator('#r-stride')).toContainText('72,3 cm');
    await expect(page.locator('#r-distance')).toHaveText('7,23 km');
  });

  test('360px genişlikte sonuç, ters hesap ve hata kutusu açıkken yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await fillForm(page, { steps: '200000', h: '250', w: '400', sex: 'Erkek', pace: 'slow' });
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#periods .kdv-row')).toHaveCount(3);
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Ters hesapta en uzun satırlar (hedefe kalan metni)
    await page.getByLabel('Mesafeden adım sayısı', { exact: false }).check();
    await page.locator('#distance').fill('0,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-goal')).toContainText('adım kaldı');
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Hata kutusu açıkken de taşma yok
    await page.locator('#weight').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, meta.json', async ({ page }) => {
    await open(page);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="adim-hesapla-${s}"]`).count()).toBe(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    // Reklam A araç kutusundan hemen sonra gelir (butonların yanında/üstünde değil)
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="adim-hesapla-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/adim-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // Sağlık uyarısı notu içerikte de bulunur
    await expect(page.locator('.ba-content .ba-note').first()).toContainText(WARN);
    // Çapraz bağlantılar (yalnızca bağlantı varlığı; hedef sayfa başka ajanda olabilir)
    for (const href of ['../nabiz-hesapla/', '../kalori-hesapla/', '../vki-hesapla/']) {
      await expect(page.locator(`.ba-related a[href="${href}"]`)).toHaveCount(1);
    }
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'adim-hesapla', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('hesapla');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
  });
});
