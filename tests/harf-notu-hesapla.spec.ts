import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/harf-notu-hesapla/';
const params = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'harf-notu-hesapla', 'parametreler.json'), 'utf8'));

/** Sayfayı açar; modül betiği yüklenmeden giriş yapılmasın diye ağın sakinleşmesini bekler. */
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
}
const tab = (page: Page, name: string) => page.getByRole('tab', { name });
const row = (page: Page, box: string, k: string) => page.locator(`#${box} [data-k="${k}"] dd`);
const gline = (page: Page, i: number) => page.locator('#g-rows .hn-line').nth(i);

test.describe('Harf Notu Hesapla', () => {
  test('87 → BA, 3,50; sınır değerleri; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await expect(page.locator('#param-updated')).not.toHaveText('…');
    await expect(page.locator('#hn-box')).toBeHidden();
    await page.locator('#hn-score').fill('87');
    await expect(row(page, 'hn-out', 'harf')).toHaveText('BA');
    await expect(row(page, 'hn-out', 'katsayi')).toHaveText('3,50');
    await expect(row(page, 'hn-out', 'aralik')).toHaveText('85 – 89,99');
    // Sınırlar: puan → harf · katsayı
    const cases: Array<[string, string, string]> = [
      ['100', 'AA', '4,00'], ['90', 'AA', '4,00'], ['89,99', 'BA', '3,50'], ['85', 'BA', '3,50'], ['84.5', 'BB', '3,00'],
      ['78', 'CB', '2,50'], ['70', 'CC', '2,00'], ['65', 'DC', '1,50'], ['60', 'DD', '1,00'], ['59', 'FD', '0,50'],
      ['50', 'FD', '0,50'], ['49', 'FF', '0,00'], ['0', 'FF', '0,00'],
    ];
    for (const [score, harf, k] of cases) {
      await page.locator('#hn-score').fill(score);
      await expect(row(page, 'hn-out', 'harf'), `${score} puan`).toHaveText(harf);
      await expect(row(page, 'hn-out', 'katsayi'), `${score} puan`).toHaveText(k);
    }
    expect(external).toEqual([]);
    noErrors();
  });

  test('YÖK tablosu: 3,5 → 88,33; 3,99 → 99,76; 4 → 100; 1 → 30; 3 → 76,66; ×25 karşılaştırması', async ({ page }) => {
    await open(page);
    await tab(page, '4\'lük ↔ 100\'lük (YÖK)').click();
    await expect(page.locator('#panel-yok')).toBeVisible();
    await expect(page.locator('#panel-hn')).toBeHidden();
    const yok = row(page, 'yok-out', 'yok');
    const x25 = row(page, 'yok-out', 'x25');
    const check: Array<[string, string, string]> = [
      ['3,5', '88,33', '87,50'], ['3.99', '99,76', '99,75'], ['4', '100,00', '100,00'], ['1', '30,00', '25,00'],
      ['3', '76,66', '75,00'], ['2,5', '65,00', '62,50'], ['2', '53,33', '50,00'], ['2,18', '57,53', '54,50'],
    ];
    for (const [x, y, z] of check) {
      await page.locator('#yok-in').fill(x);
      await expect(yok, `4'lük ${x}`).toHaveText(y);
      await expect(x25, `4'lük ${x}`).toHaveText(z);
    }
    // Üç ondalık: 2,875 → 2,88 satırı → 73,86
    await page.locator('#yok-in').fill('2,875');
    await expect(yok).toHaveText('73,86');
    await expect(page.locator('#yok-out [data-k="round"] dd')).toContainText('2,88');
    // 1,00 altı: resmî karşılık yok, ×25 yine gösterilir
    await page.locator('#yok-in').fill('0,5');
    await expect(yok).toContainText('Tabloda karşılığı yok');
    await expect(x25).toHaveText('12,50');
    // Ters yön (yaklaşık)
    await page.locator('#rev-in').fill('88,33');
    await expect(page.locator('#rev-out')).toContainText('3,50');
    await expect(page.locator('#rev-out')).toContainText('yaklaşık');
    await page.locator('#rev-in').fill('100');
    await expect(page.locator('#rev-out')).toContainText('4,00');
    await page.locator('#rev-in').fill('20');
    await expect(page.locator('#rev-out')).toContainText('Tabloda karşılığı yok');
  });

  test('tam YÖK tablosu açılır (301 satır, iki sütun çifti) ve resmî değerlerle birebir uyumlu', async ({ page }) => {
    await open(page);
    await tab(page, '4\'lük ↔ 100\'lük (YÖK)').click();
    await expect(page.locator('#yok-body tr')).toHaveCount(0); // tembel çizim: açılmadan DOM'da yok
    await page.locator('#yok-full > summary').click();
    await expect(page.locator('#yok-body tr')).toHaveCount(151);
    const cells = await page.locator('#yok-body td').allTextContents();
    expect(cells.slice(0, 4)).toEqual(['4,00', '100,00', '2,49', '64,76']);
    expect(cells).toContain('99,76');
    expect(cells).toContain('30,00');
    // 151. satırın sağ yarısı boş (301 = 151 + 150)
    expect(cells.slice(-2)).toEqual(['', '']);
    // parametreler.json: 301 satır, resmî PDF'ten alınmış örnek satırlar ve formül uyumu
    const rows: Array<[number, number]> = params.yok_tablosu;
    expect(rows).toHaveLength(301);
    const map = new Map(rows.map(([x, y]) => [Math.round(x * 100), y]));
    const official: Array<[number, number]> = [[4, 100], [3.99, 99.76], [3.5, 88.33], [3, 76.66], [2.5, 65], [2.18, 57.53], [2, 53.33], [1.5, 41.66], [1.01, 30.23], [1, 30]];
    for (const [x, y] of official) expect(map.get(Math.round(x * 100)), `${x}`).toBe(y);
    for (let c = 100; c <= 400; c++) expect(map.get(c), `c=${c}`).toBe(Math.floor((2000 + 70 * c) / 3) / 100);
  });

  test('GANO: 3 kredi AA + 4 kredi CC → 2,86; satır ekle/sil; önceki dönemle genel ortalama; 100\'lük giriş', async ({ page }) => {
    await open(page);
    await tab(page, 'GANO').click();
    await expect(page.locator('#g-rows .hn-line')).toHaveCount(3);
    await expect(page.locator('#g-box')).toBeHidden();
    await gline(page, 0).locator('.g-name').fill('Matematik');
    await gline(page, 0).locator('.g-credit').fill('3');
    await gline(page, 0).locator('.g-letter').selectOption('AA');
    await gline(page, 1).locator('.g-credit').fill('4');
    await gline(page, 1).locator('.g-letter').selectOption('CC');
    await expect(row(page, 'g-out', 'gano')).toHaveText('2,86');
    await expect(row(page, 'g-out', 'credits')).toHaveText('7');
    await expect(row(page, 'g-out', 'points')).toHaveText('20,00');
    await expect(row(page, 'g-out', 'count')).toHaveText('2');
    // 2,86 → YÖK 73,40
    await expect(row(page, 'g-out', 'yok')).toHaveText('73,40');
    // Satırdaki katsayı bilgisi
    await expect(gline(page, 0).locator('.g-conv')).toContainText('4,00');
    // Önceki dönemler: (3,00 × 60 + 20) / 67 = 2,99 → YÖK 76,43; genel kredi 67
    await page.locator('#g-prev-gano').fill('3,00');
    await page.locator('#g-prev-kredi').fill('60');
    await expect(row(page, 'g-out', 'overall')).toHaveText('2,99');
    await expect(row(page, 'g-out', 'overall-credits')).toHaveText('67');
    await expect(row(page, 'g-out', 'overall-yok')).toHaveText('76,43');
    await page.locator('#g-prev-gano').fill('');
    await page.locator('#g-prev-kredi').fill('');
    await expect(page.locator('#g-out [data-k="overall"]')).toHaveCount(0);
    // FF kredisi paydaya girer: + 4 kredi FF → 20 / 11 = 1,82
    await gline(page, 2).locator('.g-credit').fill('4');
    await gline(page, 2).locator('.g-letter').selectOption('FF');
    await expect(row(page, 'g-out', 'gano')).toHaveText('1,82');
    // Satır ekle ve sil
    await page.locator('#g-add').click();
    await expect(page.locator('#g-rows .hn-line')).toHaveCount(4);
    await gline(page, 3).getByRole('button', { name: 'Dersi sil' }).click();
    await expect(page.locator('#g-rows .hn-line')).toHaveCount(3);
    await gline(page, 2).getByRole('button', { name: 'Dersi sil' }).click();
    await expect(row(page, 'g-out', 'gano')).toHaveText('2,86');
    // 100'lük giriş: 95 (AA) × 3 kredi + 70 (CC) × 4 kredi → 2,86
    await page.locator('#g-mode').selectOption('puan');
    await expect(gline(page, 0).locator('.g-score')).toBeVisible();
    await expect(gline(page, 0).locator('.g-letter')).toBeHidden();
    await gline(page, 0).locator('.g-score').fill('95');
    await gline(page, 1).locator('.g-score').fill('70');
    await expect(row(page, 'g-out', 'gano')).toHaveText('2,86');
    await expect(gline(page, 0).locator('.g-conv')).toContainText('AA');
  });

  test('okulun kendi tablosu: alt sınır/katsayı değişir, geçersiz tablo reddedilir, sıfırlanır', async ({ page }) => {
    await open(page);
    await page.locator('#te-details > summary').click();
    await expect(page.locator('#te-rows .te-line')).toHaveCount(9);
    await expect(page.getByLabel('FF alt sınırı')).toBeDisabled();
    await page.locator('#hn-score').fill('88');
    await expect(row(page, 'hn-out', 'harf')).toHaveText('BA');
    // AA alt sınırı 88'e çekilir → 88 artık AA
    await page.getByLabel('AA alt sınırı').fill('88');
    await expect(page.locator('#te-status')).toContainText('Tablo güncellendi');
    await expect(row(page, 'hn-out', 'harf')).toHaveText('AA');
    await expect(row(page, 'hn-out', 'aralik')).toHaveText('88 – 100');
    // Katsayı değişimi: AA = 4,25 değil (4'ü aşar) → hata; 3,9 geçerli
    await page.getByLabel('AA katsayısı').fill('4,5');
    await expect(page.locator('#te-error')).toContainText('0 ile 4 arasında');
    await page.getByLabel('AA katsayısı').fill('3,9');
    await expect(page.locator('#te-error')).toBeHidden();
    await expect(row(page, 'hn-out', 'katsayi')).toHaveText('3,90');
    // Sırası bozuk tablo: BA alt sınırı AA'dan büyük → reddedilir, hesap eski geçerli tabloyla sürer
    await page.getByLabel('BA alt sınırı').fill('95');
    await expect(page.locator('#te-error')).toContainText('bir üstteki harftan küçük');
    await expect(row(page, 'hn-out', 'harf')).toHaveText('AA');
    await page.getByLabel('BA alt sınırı').fill('85');
    await expect(page.locator('#te-error')).toBeHidden();
    // Boş değer
    await page.getByLabel('CB katsayısı').fill('');
    await expect(page.locator('#te-error')).toContainText('boş bırakılamaz');
    await page.getByLabel('CB katsayısı').fill('2,5');
    // GANO da yeni tabloyu kullanır: 2 kredi AA(3,9) + 2 kredi BA(3,5) = 3,70
    await tab(page, 'GANO').click();
    await gline(page, 0).locator('.g-credit').fill('2');
    await gline(page, 0).locator('.g-letter').selectOption('AA');
    await gline(page, 1).locator('.g-credit').fill('2');
    await gline(page, 1).locator('.g-letter').selectOption('BA');
    await expect(row(page, 'g-out', 'gano')).toHaveText('3,70');
    // Varsayılana dön
    await tab(page, 'Harf notu').click();
    await page.locator('#te-reset').click();
    await expect(page.locator('#te-status')).toContainText('Varsayılan');
    await expect(page.getByLabel('AA alt sınırı')).toHaveValue('90');
    await expect(row(page, 'hn-out', 'harf')).toHaveText('BA');
    await expect(row(page, 'hn-out', 'katsayi')).toHaveText('3,50');
  });

  test('hatalı girişlerde Türkçe, çözüm öneren hata', async ({ page }) => {
    await open(page);
    // Harf sekmesi
    await page.locator('#hn-score').fill('105');
    await expect(page.locator('#hn-error')).toContainText('0 ile 100 arasında');
    await page.locator('#hn-score').fill('abc');
    await expect(page.locator('#hn-error')).toContainText('yalnızca rakam');
    await page.locator('#hn-score').fill('-3');
    await expect(page.locator('#hn-error')).toContainText('yalnızca rakam');
    await expect(page.locator('#hn-box')).toBeHidden();
    await page.locator('#hn-score').fill('72,5');
    await expect(page.locator('#hn-error')).toBeHidden();
    await expect(row(page, 'hn-out', 'harf')).toHaveText('CC');
    // YÖK sekmesi
    await tab(page, '4\'lük ↔ 100\'lük (YÖK)').click();
    await page.locator('#yok-in').fill('4,5');
    await expect(page.locator('#yok-error')).toContainText('0 ile 4 arasında');
    await page.locator('#yok-in').fill('abc');
    await expect(page.locator('#yok-error')).toContainText('yalnızca rakam');
    await page.locator('#rev-in').fill('101');
    await expect(page.locator('#rev-error')).toContainText('0 ile 100 arasında');
    // GANO sekmesi
    await tab(page, 'GANO').click();
    await gline(page, 0).locator('.g-credit').fill('3');
    await expect(page.locator('#g-error')).toContainText('hem kredi hem harf notu');
    await gline(page, 0).locator('.g-letter').selectOption('BB');
    await expect(page.locator('#g-error')).toBeHidden();
    await gline(page, 0).locator('.g-credit').fill('0');
    await expect(page.locator('#g-error')).toContainText('sıfırdan büyük');
    await gline(page, 0).locator('.g-credit').fill('abc');
    await expect(page.locator('#g-error')).toContainText('yalnızca rakam');
    await gline(page, 0).locator('.g-credit').fill('3');
    await page.locator('#g-prev-gano').fill('3');
    await expect(page.locator('#g-error')).toContainText('birlikte yazın');
    await page.locator('#g-prev-kredi').fill('60');
    await page.locator('#g-prev-gano').fill('5');
    await expect(page.locator('#g-error')).toContainText('0 ile 4 arasında');
    await expect(page.locator('#g-box')).toBeHidden();
  });

  test('klavye: sekmeler ok tuşlarıyla gezilir, hesap sekme değiştirince korunur', async ({ page }) => {
    await open(page);
    await page.locator('#hn-score').fill('92');
    await expect(row(page, 'hn-out', 'harf')).toHaveText('AA');
    await page.locator('#tab-hn').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-yok')).toBeFocused();
    await expect(page.locator('#tab-yok')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#panel-yok')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#panel-g')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#panel-hn')).toBeVisible();
    await expect(row(page, 'hn-out', 'harf')).toHaveText('AA');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#panel-g')).toBeVisible();
  });

  test('modül işlevleri: kesin değerler', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(async () => {
      const m = await import('/harf-notu-hesapla/tool.js');
      const rows = [{ name: '', credit: '3', letter: 'AA', score: '' }, { name: '', credit: '4', letter: 'CC', score: '' }];
      const g = m.calcGano({ rows, mode: 'harf', prevGano: '', prevCredit: '' });
      const g2 = m.calcGano({ rows, mode: 'harf', prevGano: '3', prevCredit: '60' });
      const empty = m.calcGano({ rows: [{ name: '', credit: '', letter: '', score: '' }], mode: 'harf', prevGano: '', prevCredit: '' });
      let tableError = '';
      try { m.validateTable([{ harf: 'AA', min: 90, katsayi: 4 }, { harf: 'BA', min: 90, katsayi: 3.5 }, { harf: 'FF', min: 0, katsayi: 0 }]); } catch (e) { tableError = (e as Error).message; }
      let lastError = '';
      try { m.validateTable([{ harf: 'AA', min: 90, katsayi: 4 }, { harf: 'FF', min: 10, katsayi: 0 }]); } catch (e) { lastError = (e as Error).message; }
      return {
        gano: g.gano, points: g.points, credits: g.credits, yok: g.yok, overall: g2.overall.gano, overallCredits: g2.overall.credits, empty,
        yok35: m.yokTo100(3.5).value, yok399: m.yokTo100(3.99).value, yok4: m.yokTo100(4).value, yok1: m.yokTo100(1).value, below: m.yokTo100(0.9).below,
        yok2875: m.yokTo100(2.875), to4: m.yokTo4(88.33), to4low: m.yokTo4(10),
        c87: m.convert100(87), c8999: m.convert100(89.99), range: m.letterRange('BA'),
        tableError, lastError,
      };
    });
    expect(out.gano).toBeCloseTo(20 / 7, 10);
    expect(out.points).toBe(20);
    expect(out.credits).toBe(7);
    expect(out.yok).toBe(73.4);
    expect(out.overall).toBeCloseTo(200 / 67, 10);
    expect(out.overallCredits).toBe(67);
    expect(out.empty).toBeNull();
    expect(out.yok35).toBe(88.33);
    expect(out.yok399).toBe(99.76);
    expect(out.yok4).toBe(100);
    expect(out.yok1).toBe(30);
    expect(out.below).toBe(true);
    expect(out.yok2875.value).toBe(73.86);
    expect(out.yok2875.used).toBe(2.88);
    expect(out.yok2875.rounded).toBe(true);
    expect(out.to4).toBeCloseTo(3.5, 2);
    expect(out.to4low).toBeNull();
    expect(out.c87.harf).toBe('BA');
    expect(out.c87.katsayi).toBe(3.5);
    expect(out.c8999.harf).toBe('BA');
    expect(out.range).toEqual({ lo: 85, hi: 89.99 });
    expect(out.tableError).toContain('bir üstteki harftan küçük');
    expect(out.lastError).toContain('FF');
  });

  test('360px genişlikte üç sekme, açık ayar/tam tablo, sonuç ve hata ile yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Harf sekmesi: sonuç + tablo ayarları açık
    await page.locator('#hn-score').fill('87,5');
    await expect(page.locator('#hn-box')).toBeVisible();
    await page.locator('#te-details > summary').click();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.getByLabel('AA alt sınırı').fill('95');
    await page.getByLabel('BA alt sınırı').fill('96');
    await expect(page.locator('#te-error')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    // YÖK sekmesi: uzun ifadeler ve tam tablo (iki sütun çifti) açık
    await tab(page, '4\'lük ↔ 100\'lük (YÖK)').click();
    await page.locator('#yok-in').fill('0,5');
    await expect(page.locator('#yok-box')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#yok-in').fill('2,875');
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#rev-in').fill('20');
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#yok-full > summary').click();
    await expect(page.locator('#yok-body tr')).toHaveCount(151);
    expect(await overflow()).toBeLessThanOrEqual(0);
    // GANO sekmesi: harf ve 100'lük modu, önceki dönemler, hata
    await tab(page, 'GANO').click();
    await gline(page, 0).locator('.g-credit').fill('3');
    await gline(page, 0).locator('.g-letter').selectOption('AA');
    await gline(page, 1).locator('.g-credit').fill('4');
    await gline(page, 1).locator('.g-letter').selectOption('CC');
    await page.locator('#g-prev-gano').fill('3,00');
    await page.locator('#g-prev-kredi').fill('60');
    await expect(page.locator('#g-box')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#g-mode').selectOption('puan');
    await gline(page, 2).locator('.g-score').fill('abc');
    await expect(page.locator('#g-error')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    // SSS tamamen açık
    await page.locator('.ba-faq details').evaluateAll((els) => els.forEach((e) => ((e as HTMLDetailsElement).open = true)));
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥900 kelime (tablolar hariç), SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, meta.json, bağlantılar', async ({ page }) => {
    await open(page);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="harf-notu-hesapla-${s}"]`).count()).toBe(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    // Reklam A araç kutusundan hemen sonra gelir (butonların yanında/üstünde değil)
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="harf-notu-hesapla-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    // Tablo satırları kelime sayısını şişirmesin: tablolar çıkarılarak sayılır
    const words = await page.locator('.ba-content').evaluate((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('table').forEach((t) => t.remove());
      return clone.textContent!.trim().split(/\s+/).length;
    });
    expect(words).toBeGreaterThanOrEqual(900);
    // Sayfadaki harf tablosu (9 satır) ve YÖK özeti (11 satır) çizilmiş olmalı
    await expect(page.locator('#tbl-harf tr')).toHaveCount(9);
    await expect(page.locator('#tbl-harf tr').first()).toContainText('90 – 100');
    await expect(page.locator('#tbl-yok-ozet tr')).toHaveCount(11);
    await expect(page.locator('#tbl-yok-ozet')).toContainText('76,66');
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/harf-notu-hesapla/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('h1')).toContainText('Harf Notu Hesapla');
    await expect(page.locator('main')).toContainText('yönetmeliği esastır');
    await expect(page.locator('main')).toContainText('YÖK tablosu esastır');
    // Güncelleme tarihi katlanmış bir bölümün içinde değil, görünür notta durmalı
    await expect(page.locator('#param-updated')).toBeVisible();
    await expect(page.locator('#param-updated')).toHaveText(params.guncelleme);
    await expect(page.locator('#param-updated')).toHaveCount(1);
    await expect(page.locator('main')).toContainText('Bilgilendirme amaçlıdır');
    // Çapraz bağlantılar
    await expect(page.locator('.ba-related a[href="../vize-final-hesapla/"]')).toHaveCount(1);
    await expect(page.locator('.ba-related a[href="../not-ortalamasi/"]')).toHaveCount(1);
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'harf-notu-hesapla', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('hesapla');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
    expect(params.guncelleme).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(params.kaynak).toBeTruthy();
    expect(params.harf_tablosu).toHaveLength(9);
  });
});
