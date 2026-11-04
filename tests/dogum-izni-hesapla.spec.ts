import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/dogum-izni-hesapla/';
async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği ve parametreler yüklenmeden form gönderilmesin
}
async function calc(page) {
  await page.locator('#calc').click();
  await expect(page.locator('#result')).toHaveClass(/is-active/);
}

test.describe('Doğum İzni Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD, reklam A araç kutusunun altında', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent())!.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="dogum-izni-hesapla-' + s + '"]')).toHaveCount(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    // reklam alanları araç kutusunun içinde değil
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    for (const s of await page.locator('script[type="application/ld+json"]').allInnerTexts()) JSON.parse(s);
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="dogum-izni-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
    await expect(page.locator('h1')).toContainText('Doğum İzni Hesaplama 2026');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#params-line')).toContainText('tarihinde güncellendi');
  });

  test('bilinen değerler: tekil 01.03.2027, 168 gün, 1.200 TL günlük kazançla 134.400 TL; .ics indirilir; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#due').fill('2027-03-01');
    await page.locator('input[name="earnmode"][value="gunluk"]').check();
    await page.locator('#daily').fill('1.200');
    await calc(page);
    await expect(page.locator('#r-start')).toHaveText('04.01.2027 Pazartesi');
    await expect(page.locator('#r-pre')).toHaveText('56 gün');
    await expect(page.locator('#r-post')).toHaveText('112 gün');
    await expect(page.locator('#r-end')).toHaveText('20.06.2027 Pazar');
    await expect(page.locator('#r-return')).toHaveText('21.06.2027 Pazartesi');
    await expect(page.locator('#r-total')).toHaveText('168 gün (24 hafta)');
    await expect(page.locator('#r-perday')).toHaveText('800,00 TL');
    await expect(page.locator('#r-allowdays')).toHaveText('168 gün');
    await expect(page.locator('#r-allowance')).toHaveText('134.400,00 TL');
    // bilgi kartları ve uyarı notu
    await expect(page.locator('#r-cards')).toContainText('10 gün ücretli izin');
    await expect(page.locator('#r-cards')).toContainText('21.06.2027 – 20.12.2027'); // 6 aya kadar ücretsiz izin
    await expect(page.locator('#r-cards')).toContainText('60 gün'); // ilk doğumda yarım çalışma
    await expect(page.locator('#r-cards')).toContainText('1,5 saat');
    await expect(page.locator('#result')).toContainText('Bilgilendirme amaçlıdır');
    await expect(page.locator('#r-gecis')).toHaveAttribute('data-status', 'yeni');
    await expect(page.locator('#timeline li')).not.toHaveCount(0);

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#ics').click()]);
    expect(dl.suggestedFilename()).toBe('dogum-izni-takvimi.ics');
    const ics = readFileSync((await dl.path())!, 'utf8');
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).toContain('DTSTART;VALUE=DATE:20270104');
    expect(ics).toContain('DTSTART;VALUE=DATE:20270301');
    expect(ics).toContain('DTSTART;VALUE=DATE:20270621');
    expect(ics.match(/BEGIN:VEVENT/g)!.length).toBe(4);
    await expect(page.locator('#ics-status')).toContainText('indirildi');
    expect(external).toEqual([]);
    noErrors();
  });

  test('erken doğum, doğuma 2 hafta kalana kadar çalışma ve çoğul gebelik', async ({ page }) => {
    await open(page);
    await page.locator('#due').fill('2027-03-01');
    // erken doğum: kullanılamayan 14 gün doğum sonrasına eklenir
    await page.locator('#birth').fill('2027-02-15');
    await calc(page);
    await expect(page.locator('#r-post')).toHaveText('126 gün');
    await expect(page.locator('#r-end')).toContainText('20.06.2027');
    await expect(page.locator('#r-total')).toContainText('168 gün');
    await expect(page.locator('#r-notes')).toContainText('14 günlük doğum öncesi izin');
    // doğuma 2 hafta kalana kadar çalışma
    await page.locator('#birth').fill('');
    await page.locator('#preweeks').selectOption('2');
    await calc(page);
    await expect(page.locator('#r-start')).toContainText('15.02.2027');
    await expect(page.locator('#r-post')).toHaveText('154 gün');
    await expect(page.locator('#r-end')).toContainText('01.08.2027');
    await expect(page.locator('#r-total')).toContainText('168 gün');
    // çoğul gebelik: 10 hafta önce başlar, 182 gün
    await page.locator('#preweeks').selectOption('tam');
    await page.locator('input[name="preg"][value="cogul"]').check();
    await expect(page.locator('#preweeks option')).toHaveCount(9); // 10..2 hafta
    await calc(page);
    await expect(page.locator('#r-start')).toContainText('21.12.2026');
    await expect(page.locator('#r-total')).toContainText('182 gün');
    await expect(page.locator('#r-end')).toContainText('20.06.2027');
  });

  test('son 3 ay kazancı, 180 gün tavanı ve 90 gün prim şartı uyarısı', async ({ page }) => {
    await open(page);
    await page.locator('#due').fill('2027-03-01');
    await page.locator('#earn3').fill('108.000');
    await page.locator('#days3').fill('90');
    await calc(page);
    await expect(page.locator('#r-daily')).toHaveText('1.200,00 TL');
    await expect(page.locator('#r-allowance')).toHaveText('134.400,00 TL');
    // 180 günden az prim: günlük kazanç alt sınırın 2 katıyla sınırlanır (2026: 33.030 / 30 x 2 = 2.202 TL)
    await page.locator('#earn3').fill('270.000');
    await page.locator('#lt180').check();
    await calc(page);
    await expect(page.locator('#r-sgk')).toContainText('Tavan uygulanan günlük kazanç');
    await expect(page.locator('#r-perday')).toHaveText('1.468,00 TL');
    // 90 gün prim şartı yoksa ödenek hesaplanmaz, uyarı verilir
    await page.locator('#prim90').uncheck();
    await calc(page);
    await expect(page.locator('#r-sgk')).toContainText('hakkı doğmaz');
    await expect(page.locator('#r-allowance')).toHaveCount(0);
  });

  test('geç doğum, memur modu, 29 Şubat ve geçiş hükmü', async ({ page }) => {
    await open(page);
    await page.locator('#due').fill('2027-03-01');
    // geç doğum: doğum sonrası 16 hafta gerçek doğumdan sayılır, fazladan günler düşülmez
    await page.locator('#birth').fill('2027-03-08');
    await page.locator('#daily').evaluate((e: HTMLInputElement) => (e.value = ''));
    await page.locator('input[name="earnmode"][value="gunluk"]').check();
    await page.locator('#daily').fill('1200');
    await calc(page);
    await expect(page.locator('#r-pre')).toHaveText('63 gün');
    await expect(page.locator('#r-post')).toHaveText('112 gün');
    await expect(page.locator('#r-end')).toContainText('27.06.2027');
    await expect(page.locator('#r-total')).toContainText('175 gün');
    await expect(page.locator('#r-allowdays')).toHaveText('168 gün');
    await expect(page.locator('#r-sgk')).toContainText('Yaklaşık');

    // memur: çok erken doğumda aradaki süre de eklenir; SGK kutusu gizlenir, 657 tablosu görünür
    await page.locator('input[name="status"][value="memur"]').check();
    await expect(page.locator('#sgk-box')).toBeHidden();
    await page.locator('#birth').fill('2026-12-01');
    await calc(page);
    await expect(page.locator('#r-end')).toContainText('20.06.2027');
    await expect(page.locator('#r-notes')).toContainText('104/A');
    await expect(page.locator('#memur-table')).toBeVisible();
    await expect(page.locator('#memur-table')).toContainText('md. 108/B');
    await expect(page.locator('#r-sgk')).toContainText('aylıklarını');
    // aynı tarihler işçide: doğumdan itibaren 168 gün
    await page.locator('input[name="status"][value="isci"]').check();
    await expect(page.locator('#r-end')).toContainText('17.05.2027');
    await expect(page.locator('#memur-table')).toBeHidden();

    // 29 Şubat: tarih aritmetiği ve ay sonuna kırpma
    await page.locator('#birth').fill('');
    await page.locator('#due').fill('2028-02-29');
    await calc(page);
    await expect(page.locator('#r-start')).toContainText('04.01.2028');
    await expect(page.locator('#r-end')).toContainText('19.06.2028');
    await expect(page.locator('#r-cards')).toContainText('28.02.2029'); // çocuk 1 yaşında (29 Şubat yok)

    // geçiş hükmü: 01.03.2026 doğum → eski izin 01.05.2026'dan önce bitmiş, 24 hafta dolmamış
    await page.locator('#due').fill('2026-03-01');
    await calc(page);
    await expect(page.locator('#r-gecis')).toHaveAttribute('data-status', 'gecis');
    await expect(page.locator('#r-gecis')).toContainText('8 hafta ilave analık izni');
    await expect(page.locator('#r-notes')).toContainText('geçmişte');
    // eski kurala göre izni 1 Mayıs 2026'dan önce bitmiş: süreler eski kuralla (8 + 8 hafta) gösterilir
    await expect(page.locator('#r-total')).toHaveText('112 gün (16 hafta)');
    await expect(page.locator('#r-end')).toContainText('25.04.2026');
    await expect(page.locator('#r-notes')).toContainText('7578 sayılı Kanun öncesi kurala göre');
    await page.locator('#due').fill('2026-03-20');
    await calc(page);
    await expect(page.locator('#r-gecis')).toHaveAttribute('data-status', 'devam');
    // yürürlükte izni süren anneye yeni süre uygulanır
    await expect(page.locator('#r-total')).toHaveText('168 gün (24 hafta)');
    await expect(page.locator('#r-end')).toContainText('09.07.2026');
    await page.locator('#due').fill('2025-09-01');
    await calc(page);
    await expect(page.locator('#r-gecis')).toHaveAttribute('data-status', 'kapsam-disi');
    await expect(page.locator('#r-total')).toHaveText('112 gün (16 hafta)');
    await expect(page.locator('#r-end')).toContainText('26.10.2025');
    await expect(page.locator('#r-cards')).toContainText('5 gün ücretli izin');
    await expect(page.locator('#r-cards')).toContainText('16 haftalık sürenin bitiminden');
  });

  test('saf fonksiyonlar: addMonths, parseISODate ve calcLeave', async ({ page }) => {
    await open(page);
    // Dize olarak verilir: test dönüştürücüsü dinamik import'u require'a çevirmesin. Modül önbellekten gelir, yeniden çalışmaz.
    const r: any = await page.evaluate(`(async () => {
      const m = await import('/dogum-izni-hesapla/tool.js');
      const d = (s) => m.parseISODate(s);
      return {
        invalid: m.parseISODate('2027-02-29'),
        leap: m.fmt(m.addMonths(d('2028-02-29'), 12)),
        aug31: m.fmt(m.addMonths(d('2027-08-31'), 6)),
        single: m.calcLeave({ due: d('2027-03-01') }).total,
        twin: m.calcLeave({ due: d('2027-03-01'), multiple: true }).total,
        num: [m.parseNum('1.200'), m.parseNum('1200,5'), m.parseNum('108.000,25'), String(m.parseNum('abc'))],
        oldTotal: m.calcLeave({ due: d('2026-03-01') }, m.oldRulesParams()).total,
        ts: ['2025-10-15', '2025-10-16', '2026-03-06', '2026-03-07', '2026-05-01'].map((s) => m.transitionStatus(m.calcLeave({ due: d(s) }))),
      };
    })()`);
    expect(r.invalid).toBeNull();
    expect(r.leap).toBe('28.02.2029');
    expect(r.aug31).toBe('29.02.2028');
    expect(r.single).toBe(168);
    expect(r.twin).toBe(182);
    expect(r.num.slice(0, 3)).toEqual([1200, 1200.5, 108000.25]);
    expect(r.num[3]).toBe('NaN');
    expect(r.oldTotal).toBe(112);
    // sınırlar: 24 hafta 01.04.2026'da dolmamış → geçiş; eski izin 01.05.2026'da sürüyor → devam
    expect(r.ts).toEqual(['kapsam-disi', 'gecis', 'gecis', 'devam', 'yeni']);
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Tahmini doğum tarihini girin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#due').fill('2027-03-01');
    await page.locator('#birth').fill('2027-05-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('6 haftadan fazla sonra');
    await page.locator('#birth').fill('2026-09-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('20 haftadan fazla önce');
    await page.locator('#birth').fill('');
    await page.locator('#earn3').fill('abc');
    await page.locator('#days3').fill('90');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('okunamadı');
    await page.locator('#earn3').fill('108000');
    await page.locator('#days3').fill('120');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('1 ile 90 arasında');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#days3').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('prim gün sayısını');
    // düzeltilince hata kaybolur
    await page.locator('#days3').fill('90');
    await calc(page);
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
  });

  test('360px genişlikte, sonuç açıkken de yatay taşma yok; klavyeyle kullanılabilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow0 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow0).toBeLessThanOrEqual(0);
    await page.locator('#due').fill('2027-03-01');
    await page.locator('input[name="status"][value="memur"]').check();
    // klavye: düğmeye odaklanıp Enter ile gönderilir
    await page.locator('#calc').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#memur-table')).toBeVisible();
    const overflow1 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow1).toBeLessThanOrEqual(0);
    await page.locator('input[name="status"][value="isci"]').check();
    await page.locator('#ics').focus();
    await expect(page.locator('#ics')).toBeFocused();
    const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow2).toBeLessThanOrEqual(0);
  });
});
