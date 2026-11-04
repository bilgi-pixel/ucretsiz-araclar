import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/vize-final-hesapla/';

/** Sayfayı açar; modül betiği yüklenmeden giriş yapılmasın diye ağın sakinleşmesini bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
}

const line = (page: Page, i: number) => page.locator('#vf-rows-in .vf-line').nth(i);
const need = (page: Page) => page.locator('#vf-out [data-k="need"] dd');

test.describe('Vize Final Hesapla', () => {
  test('vize 60, final %60, geçme 50 → finalden en az 43,33 (yukarı yuvarlanmış 43,4 / 44); dış istek ve hata yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    // Açılışta varsayılanlar: final %60, vize %40, geçme 50; not girilene kadar sonuç yok
    await expect(page.locator('#vf-fw')).toHaveValue('60');
    await expect(line(page, 0).locator('.vf-weight')).toHaveValue('40');
    await expect(page.locator('#vf-pass')).toHaveValue('50');
    await expect(page.locator('#vf-result')).toBeHidden();
    await expect(page.locator('#param-updated')).not.toHaveText('…');
    await line(page, 0).locator('.vf-grade').fill('60');
    await expect(need(page)).toHaveText('43,33');
    await expect(page.locator('#vf-out [data-k="need-up"] dd')).toContainText('43,4');
    await expect(page.locator('#vf-out [data-k="need-up"] dd')).toContainText('44');
    // Bütünleme finalin yerine geçer: aynı değer
    await expect(page.locator('#vf-out [data-k="but"] dd')).toContainText('43,33');
    // Vize ortalaması ve kazanılan puan: 60,00 ve 24,00 / 40
    await expect(page.locator('#vf-out [data-k="vize-avg"] dd')).toHaveText('60,00');
    await expect(page.locator('#vf-out [data-k="points"] dd')).toContainText('24,00 / 40');
    // Tablo: finalden 40…100 → 7 satır; 40 → 48 (Kalır), 50 → 54 (Geçer), 100 → 84
    await expect(page.locator('#sim-body tr')).toHaveCount(7);
    await expect(page.locator('#sim-body tr').nth(0)).toContainText('48,00');
    await expect(page.locator('#sim-body tr').nth(0)).toContainText('Kalır');
    await expect(page.locator('#sim-body tr').nth(1)).toContainText('54,00');
    await expect(page.locator('#sim-body tr').nth(1)).toContainText('Geçer');
    await expect(page.locator('#sim-body tr').nth(6)).toContainText('84,00');
    expect(external).toEqual([]);
    noErrors();
  });

  test('vize 30, geçme 60 → 80; vize 20, geçme 70 → 103,33 "mümkün değil"', async ({ page }) => {
    await open(page);
    await line(page, 0).locator('.vf-grade').fill('30');
    await page.locator('[data-pass="60"]').click();
    await expect(page.locator('#vf-pass')).toHaveValue('60');
    await expect(page.locator('[data-pass="60"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-pass="50"]')).toHaveAttribute('aria-pressed', 'false');
    await expect(need(page)).toHaveText('80,00');
    // 80 tam sayı: yukarı yuvarlama 80,1 olmamalı (kayan nokta artığı yok)
    await expect(page.locator('#vf-out [data-k="need-up"] dd')).toContainText('80,0');
    await expect(page.locator('#vf-out [data-k="need-up"] dd')).not.toContainText('80,1');
    // Mümkün değil: (7000 − 800) / 60 = 103,33
    await line(page, 0).locator('.vf-grade').fill('20');
    await page.locator('[data-pass="70"]').click();
    await expect(need(page)).toContainText('103,3');
    await expect(need(page)).toContainText('mümkün değil');
    await expect(page.locator('#vf-out [data-k="need-up"]')).toHaveCount(0);
    await expect(page.locator('#vf-out [data-k="but"] dd')).toContainText('mümkün değil');
  });

  test('vize 70 + final 80 → ortalama 76,00 ve geçer; düşük final ve bütünleme', async ({ page }) => {
    await open(page);
    await line(page, 0).locator('.vf-grade').fill('70');
    await page.locator('#vf-final').fill('80');
    await expect(page.locator('#vf-out .nr-row').first()).toContainText('76,00');
    await expect(page.locator('#vf-out [data-k="average"] dd')).toHaveText('76,00');
    await expect(page.locator('#vf-out [data-k="verdict"] dd')).toContainText('Geçme koşulunu sağlıyor');
    // Düşük final: 70×0,4 + 30×0,6 = 46 → geçme notunun altında
    await page.locator('#vf-final').fill('30');
    await expect(page.locator('#vf-out [data-k="average"] dd')).toHaveText('46,00');
    await expect(page.locator('#vf-out [data-k="verdict"] dd')).toContainText('altında kaldı');
    // Bütünleme 80 finalin yerine geçer: 76
    await page.locator('#vf-but').fill('80');
    await expect(page.locator('#vf-out [data-k="average"] dt')).toContainText('bütünleme sayıldı');
    await expect(page.locator('#vf-out [data-k="average"] dd')).toHaveText('76,00');
    await expect(page.locator('#vf-out [data-k="verdict"] dd')).toContainText('Geçme koşulunu sağlıyor');
  });

  test('hızlı oranlar, klavye ve tek satır tamamlama: 30/70 → vize 30; Enter ile seçilir', async ({ page }) => {
    await open(page);
    await line(page, 0).locator('.vf-grade').fill('55');
    await page.locator('[data-final="60"]').focus();
    await expect(page.locator('[data-final="60"]')).toHaveAttribute('aria-pressed', 'true'); // varsayılan %60 seçili
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-final="50"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-final="70"]')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#vf-fw')).toHaveValue('70');
    await expect(line(page, 0).locator('.vf-weight')).toHaveValue('30');
    await expect(page.locator('[data-final="70"]')).toHaveAttribute('aria-pressed', 'true');
    // (5000 − 55×30) / 70 = 47,86
    await expect(need(page)).toHaveText('47,86');
    // 50/50 düğmesi
    await page.locator('[data-final="50"]').click();
    await expect(line(page, 0).locator('.vf-weight')).toHaveValue('50');
    await expect(need(page)).toHaveText('45,00');
    // Vize ağırlığını elle değiştirmek finali tamamlar: vize %20 → final %80
    await line(page, 0).locator('.vf-weight').fill('20');
    await expect(page.locator('#vf-fw')).toHaveValue('80');
  });

  test('birden çok vize/ödev: %30 + %10 + final %60 → 40,83; toplam tutmayınca hata; satır silme', async ({ page }) => {
    await open(page);
    await line(page, 0).locator('.vf-grade').fill('55');
    await page.locator('#vf-add').click();
    await expect(page.locator('#vf-rows-in .vf-line')).toHaveCount(2);
    await line(page, 0).locator('.vf-weight').fill('30');
    await line(page, 1).locator('.vf-name').fill('Ödev');
    await line(page, 1).locator('.vf-grade').fill('90');
    await line(page, 1).locator('.vf-weight').fill('10');
    // 55×30 + 90×10 = 2550; (5000 − 2550) / 60 = 40,83
    await expect(need(page)).toHaveText('40,83');
    await expect(page.locator('#vf-out [data-k="points"] dd')).toContainText('25,50 / 40');
    // Toplam bozulunca Türkçe, çözüm öneren hata
    await line(page, 1).locator('.vf-weight').fill('20');
    await expect(page.locator('#vf-error')).toContainText('%110');
    await expect(page.locator('#vf-error')).toContainText('10 puan fazla');
    await expect(page.locator('#vf-error')).toContainText('düzeltin');
    await expect(page.locator('#vf-result')).toBeHidden();
    // Ödev satırını sil: tek satır kalır, ağırlığı 40'a tamamlanır → (5000 − 55×40) / 60 = 46,67
    await line(page, 1).getByRole('button', { name: 'Bu satırı sil' }).click();
    await expect(page.locator('#vf-rows-in .vf-line')).toHaveCount(1);
    await expect(line(page, 0).locator('.vf-weight')).toHaveValue('40');
    await expect(need(page)).toHaveText('46,67');
    await expect(page.locator('#vf-error')).toBeHidden();
  });

  test('final baraj ve hedef ortalama: vize 85 + baraj 50 → 50,00 (baraj belirleyici); vize 80, hedef 85 → 88,33', async ({ page }) => {
    await open(page);
    await line(page, 0).locator('.vf-grade').fill('85');
    // Barajsız: (5000 − 3400) / 60 = 26,67
    await expect(need(page)).toHaveText('26,67');
    await page.locator('#vf-baraj').fill('50');
    await expect(need(page)).toHaveText('50,00');
    await expect(page.locator('#vf-out [data-k="need-bind"] dd')).toContainText('Final barajı');
    // Hedef ortalama: vize 80, hedef 85 → (8500 − 3200) / 60 = 88,33
    await page.locator('#vf-baraj').fill('');
    await line(page, 0).locator('.vf-grade').fill('80');
    await page.locator('#vf-target').fill('85');
    await expect(page.locator('#vf-out [data-k="target"] dd')).toHaveText('88,33');
    await expect(page.locator('#vf-out [data-k="target-up"] dd')).toContainText('88,4');
    // Hedef 100'ü aşıyorsa: vize 20, hedef 90 → (9000 − 800) / 60 = 136,67
    await line(page, 0).locator('.vf-grade').fill('20');
    await page.locator('#vf-target').fill('90');
    await expect(page.locator('#vf-out [data-k="target"] dd')).toContainText('mümkün değil');
    // Final notu girilip baraj altında kalınca: vize 85, final 40, baraj 50 → ortalama 58 ama baraj
    await page.locator('#vf-target').fill('');
    await line(page, 0).locator('.vf-grade').fill('85');
    await page.locator('#vf-baraj').fill('50');
    await page.locator('#vf-final').fill('40');
    await expect(page.locator('#vf-out [data-k="average"] dd')).toHaveText('58,00');
    await expect(page.locator('#vf-out [data-k="verdict"] dd')).toContainText('Final barajının altında');
  });

  test('hatalı girişlerde Türkçe, çözüm öneren hata', async ({ page }) => {
    await open(page);
    const err = page.locator('#vf-error');
    const grade = line(page, 0).locator('.vf-grade');
    await grade.fill('120');
    await expect(err).toContainText('0 ile 100 arasında');
    await grade.fill('abc');
    await expect(err).toContainText('yalnızca rakam');
    await grade.fill('-5');
    await expect(err).toContainText('yalnızca rakam');
    // Virgüllü ve noktalı ondalık kabul edilir
    await grade.fill('72,5');
    await expect(err).toBeHidden();
    // (5000 − 72,5 × 40) / 60 = 35,00
    await expect(need(page)).toHaveText('35,00');
    await grade.fill('72.5');
    await expect(need(page)).toHaveText('35,00');
    // Final ağırlığı boş / sıfır / 100'ü aşan
    await page.locator('#vf-fw').fill('');
    await expect(err).toContainText('Final ağırlığını yazın');
    await page.locator('#vf-fw').fill('0');
    await expect(err).toContainText('0\'dan büyük');
    await page.locator('#vf-fw').fill('150');
    await expect(err).toContainText('en çok 100');
    // Ağırlık yazılmış ama not eksik (ikinci satır)
    await page.locator('#vf-fw').fill('60');
    await page.locator('#vf-add').click();
    await line(page, 1).locator('.vf-weight').fill('10');
    await expect(err).toContainText('hem not hem ağırlık');
    // Geçersiz geçme notu
    await line(page, 1).getByRole('button', { name: 'Bu satırı sil' }).click();
    await page.locator('#vf-pass').fill('101');
    await expect(err).toContainText('Geçme notu 0 ile 100 arasında');
    // Hata varken sonuç kutusu gizli
    await expect(page.locator('#vf-result')).toBeHidden();
  });

  test('final %100 (vize yok): tek satırın ağırlığı 0 olur, hata vermez; gereken not geçme notudur', async ({ page }) => {
    await open(page);
    await page.locator('#vf-fw').fill('100');
    await expect(line(page, 0).locator('.vf-weight')).toHaveValue('0');
    await expect(page.locator('#vf-error')).toBeHidden();
    await expect(need(page)).toHaveText('50,00');
    // Güncelleme tarihi sayfada görünür
    await expect(page.locator('#param-updated')).toBeVisible();
    await expect(page.locator('#param-updated')).toHaveText(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('modül işlevi: tam sayı hesabında kayan nokta hatası yok', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(async () => {
      const m = await import('/vize-final-hesapla/tool.js');
      const base = { finalWeight: '60', pass: '60', baraj: '', target: '', final: '', but: '' };
      const a = m.calcVizeFinal({ ...base, rows: [{ name: 'Vize', grade: '30', weight: '40' }] });
      const b = m.calcVizeFinal({ ...base, pass: '50', rows: [{ name: 'Vize', grade: '60', weight: '40' }] });
      const c = m.calcVizeFinal({ ...base, pass: '70', rows: [{ name: 'Vize', grade: '20', weight: '40' }] });
      const d = m.calcVizeFinal({ ...base, final: '80', rows: [{ name: 'Vize', grade: '70', weight: '40' }] });
      const e = m.calcVizeFinal({ ...base, pass: '50', finalWeight: '100', rows: [] });
      return { a: a.need, b: b.need, c: c.need, d: d.average, e: e.need, ceil: [m.ceilTo(80, 1), m.ceilTo(43.3333, 1), m.ceilTo(26.6667, 0)] };
    });
    expect(out.a.value).toBe(80);
    expect(out.a.up1).toBe(80);
    expect(out.a.upInt).toBe(80);
    expect(out.b.value).toBeCloseTo(43.3333333, 6);
    expect(out.b.up1).toBe(43.4);
    expect(out.b.upInt).toBe(44);
    expect(out.c.value).toBeCloseTo(103.3333333, 6);
    expect(out.c.status).toBe('imkansiz');
    expect(out.d).toBe(76);
    // Final %100 (vize yok): gereken not doğrudan geçme notudur
    expect(out.e.value).toBe(50);
    expect(out.ceil).toEqual([80, 43.4, 27]);
  });

  test('360px genişlikte sonuç, çok satır, hata ve açık SSS ile yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await line(page, 0).locator('.vf-grade').fill('60');
    await page.locator('#vf-target').fill('85');
    await page.locator('#vf-baraj').fill('50');
    await page.locator('#vf-add').click();
    await expect(page.locator('#vf-result')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Mümkün değil ifadesi en uzun satırdır
    await line(page, 0).locator('.vf-grade').fill('10');
    await page.locator('[data-pass="70"]').click();
    await expect(need(page)).toContainText('mümkün değil');
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Hata kutusu açıkken
    await line(page, 0).locator('.vf-grade').fill('abc');
    await expect(page.locator('#vf-error')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Tüm SSS maddeleri açıkken
    await page.locator('.ba-faq details').evaluateAll((els) => els.forEach((e) => ((e as HTMLDetailsElement).open = true)));
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, meta.json, bağlantılar', async ({ page }) => {
    await open(page);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="vize-final-hesapla-${s}"]`).count()).toBe(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    // Reklam A araç kutusundan hemen sonra gelir (butonların yanında/üstünde değil)
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="vize-final-hesapla-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/vize-final-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('h1')).toContainText('Finalden Kaç Almalıyım');
    await expect(page.locator('main')).toContainText('yönetmeliği esastır');
    await expect(page.locator('main')).toContainText('Bilgilendirme amaçlıdır');
    await expect(page.locator('main')).toContainText('Bağıl');
    // Çapraz bağlantılar
    await expect(page.locator('.ba-related a[href="../harf-notu-hesapla/"]')).toHaveCount(1);
    await expect(page.locator('.ba-related a[href="../not-ortalamasi/"]')).toHaveCount(1);
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'vize-final-hesapla', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('hesapla');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
    const params = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'vize-final-hesapla', 'parametreler.json'), 'utf8'));
    expect(params.guncelleme).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(params.kaynak).toBeTruthy();
  });
});
