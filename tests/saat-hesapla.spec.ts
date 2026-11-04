import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/saat-hesapla/';
const M = '−'; // ekranda kullanılan eksi işareti

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}
async function span(page, a: string, b: string, brk = '') {
  await page.locator('#fa-start').fill(a);
  await page.locator('#fa-end').fill(b);
  await page.locator('#fa-break').fill(brk);
  await page.locator('#fa-calc').click();
}

test.describe('Saat Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD, reklam A araç kutusunun altında', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent())!.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="saat-hesapla-' + s + '"]')).toHaveCount(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    // reklam araç kutusunun içinde olamaz
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const lds = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    const types = lds.map((t) => JSON.parse(t)['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('FAQPage');
    const faq = lds.map((t) => JSON.parse(t)).find((j) => j['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(await page.locator('.ba-faq details').count());
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="saat-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
    // gizlilik rozeti, marka satırı, mesai ve saat dilimi bağlantıları
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-topbar')).toContainText('dosya yüklenmez');
    await expect(page.locator('.ba-content a[href="../mesai-hesapla/"]').first()).toBeAttached();
    await expect(page.locator('a[href="../zaman-dilimi-cevirici/"]').first()).toBeAttached();
    await expect(page.locator('#params-line')).toContainText('güncellendi');
  });

  test('iki saat arası: bilinen değerler, gece vardiyası, mola, 24:00 ve AM/PM', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await span(page, '08:30', '17:15');
    await expect(page.locator('#fa-result')).toHaveClass(/is-active/);
    await expect(page.locator('#fa-result')).toBeVisible();
    await expect(page.locator('#fa-hm')).toHaveText('8:45');
    await expect(page.locator('#fa-text')).toHaveText('8 sa 45 dk');
    await expect(page.locator('#fa-dec')).toHaveText('8,75 saat');
    await expect(page.locator('#fa-min')).toHaveText('525 dk');
    await expect(page.locator('#fa-sec')).toHaveText('31.500 sn');

    await span(page, '22:00', '06:30');
    await expect(page.locator('#fa-hm')).toHaveText('8:30');
    await expect(page.locator('#fa-note')).toContainText('ertesi gün');

    await span(page, '09:00', '18:00', '60');
    await expect(page.locator('#fa-hm')).toHaveText('8:00');
    await expect(page.locator('#fa-gross')).toHaveText('9:00');

    await span(page, '23:59', '00:00');
    await expect(page.locator('#fa-hm')).toHaveText('0:01');
    await span(page, '16:00', '24:00');
    await expect(page.locator('#fa-hm')).toHaveText('8:00');
    await span(page, '8:30 am', '5:15 PM');
    await expect(page.locator('#fa-hm')).toHaveText('8:45');
    await span(page, '8.30', '17:15:30');
    await expect(page.locator('#fa-hm')).toHaveText('8:45:30');
    await expect(page.locator('#fa-dec')).toHaveText('8,7583 saat');

    // aynı saat + "ertesi gün" = 24 saat
    await page.locator('#fa-next').check();
    await span(page, '08:00', '08:00');
    await expect(page.locator('#fa-hm')).toHaveText('24:00');
    expect(external).toEqual([]);
    noErrors();
  });

  test('saate süre ekle/çıkar: gün değişimi', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#tab-ekle').click();
    await expect(page.locator('#panel-ekle')).toBeVisible();
    await expect(page.locator('#panel-fark')).toBeHidden();
    await page.locator('#ek-base').fill('14:20');
    await page.locator('#ek-dur').fill('3:55');
    await page.locator('#ek-calc').click();
    await expect(page.locator('#ek-result')).toHaveClass(/is-active/);
    await expect(page.locator('#ek-time')).toHaveText('18:15');
    await expect(page.locator('#ek-day')).toHaveText('Aynı gün');

    await page.locator('#ek-base').fill('23:30');
    await page.locator('#ek-dur').fill('1:45');
    await page.locator('#ek-calc').click();
    await expect(page.locator('#ek-time')).toHaveText('01:15');
    await expect(page.locator('#ek-day')).toHaveText('+1 gün (ertesi gün)');

    await page.locator('#ek-base').fill('00:30');
    await page.locator('#ek-dur').fill('60 dk');
    await page.locator('#ek-sub').check();
    await page.locator('#ek-calc').click();
    await expect(page.locator('#ek-time')).toHaveText('23:30');
    await expect(page.locator('#ek-day')).toHaveText(M + '1 gün (önceki gün)');

    await page.locator('#ek-add').check();
    await page.locator('#ek-base').fill('24:00');
    await page.locator('#ek-dur').fill('1,5');
    await page.locator('#ek-calc').click();
    await expect(page.locator('#ek-time')).toHaveText('01:30');
    await expect(page.locator('#ek-day')).toHaveText('+1 gün (ertesi gün)');
    noErrors();
  });

  test('süre toplama: liste, boş satır, çıkarma, 99 saati aşan toplam ve CSV dosyası', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#tab-topla').click();
    await page.locator('#to-list').fill('1:45\n2:30\n\n0:50\n');
    await page.locator('#to-calc').click();
    await expect(page.locator('#to-result')).toHaveClass(/is-active/);
    await expect(page.locator('#to-hm')).toHaveText('5:05');
    await expect(page.locator('#to-dec')).toHaveText('5,0833 saat');
    await expect(page.locator('#to-min')).toHaveText('305 dk');
    await expect(page.locator('#to-count')).toContainText('3 değer');

    // karışık yazım + çıkarma + tek satır ifade
    await page.locator('#to-list').fill('90 dk\n2 sa 15 dk\n1,5 saat\n-0:15\n1:45 + 2:30 − 0:50');
    await page.locator('#to-calc').click();
    // 1:30 + 2:15 + 1:30 − 0:15 + 1:45 + 2:30 − 0:50 = 8:25
    await expect(page.locator('#to-hm')).toHaveText('8:25');

    // negatif sonuç
    await page.locator('#to-list').fill('1:00\n-2:15');
    await page.locator('#to-calc').click();
    await expect(page.locator('#to-hm')).toHaveText(M + '1:15');
    await expect(page.locator('#to-neg')).toBeVisible();

    // 99 saati aşan toplam sıfırlanmaz
    await page.locator('#to-list').fill('60:00\n45:30\n0:30');
    await page.locator('#to-calc').click();
    await expect(page.locator('#to-hm')).toHaveText('106:00');
    await expect(page.locator('#to-days')).toHaveText('4 gün 10 sa');

    // birimsiz sayılar dakika
    await page.locator('#to-bare').selectOption('min');
    await page.locator('#to-list').fill('90\n45');
    await page.locator('#to-calc').click();
    await expect(page.locator('#to-hm')).toHaveText('2:15');

    // CSV dosyası: başlık ve tarih hücreleri atlanır
    await page.locator('#to-bare').selectOption('h');
    await page.locator('#to-file').setInputFiles({
      name: 'sureler.csv', mimeType: 'text/csv',
      buffer: Buffer.from('﻿Tarih;Süre\n04.11.2026;1:45\n05.11.2026;2:30\n06.11.2026;"0:50"\n'),
    });
    await expect(page.locator('#to-hm')).toHaveText('5:05');
    await expect(page.locator('#to-count')).toContainText('5 metin/tarih hücresi atlandı');
    await expect(page.locator('#to-file-name')).toContainText('sureler.csv');
    // tarih + saat (zaman damgası) hücreleri süre sayılmaz
    await page.locator('#to-list').fill('2026-11-04 08:30;1:00\n04.11.2026 17:45:00;0:30');
    await page.locator('#to-calc').click();
    await expect(page.locator('#to-hm')).toHaveText('1:30');
    await expect(page.locator('#to-count')).toContainText('2 metin/tarih hücresi atlandı');
    await page.locator('#to-clear').click();
    await expect(page.locator('#to-file-name')).toHaveText('');
    await expect(page.locator('#to-result')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('haftalık çizelge: 5 gün × 9 saat (1 saat mola) = 40 saat; 45 saati aşan fazla çalışma ve ücret', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#tab-hafta').click();
    await expect(page.locator('#w-rows .sh-wrow')).toHaveCount(7);
    await page.locator('#w-in-0').fill('09:00');
    await page.locator('#w-out-0').fill('18:00');
    await page.locator('#w-br-0').fill('60');
    await expect(page.locator('#w-day-0')).toHaveText('8:00');
    await page.locator('#w-copy').click();
    await expect(page.locator('#w-day-4')).toHaveText('8:00');
    await expect(page.locator('#w-day-5')).toHaveText('—');
    await page.locator('#w-calc').click();
    await expect(page.locator('#w-result')).toHaveClass(/is-active/);
    await expect(page.locator('#w-total')).toHaveText('40:00');
    await expect(page.locator('#w-dec')).toHaveText('40,00 saat');
    await expect(page.locator('#w-days')).toHaveText('5 gün');
    await expect(page.locator('#w-avg')).toHaveText('8:00');
    await expect(page.locator('#w-over')).toHaveText('0:00');
    await expect(page.locator('#w-over-note')).toBeHidden();
    await expect(page.locator('#w-pay')).toBeHidden();

    // cumartesi 09:00–17:30 molasız → 48:30, 3:30 fazla çalışma
    await page.locator('#w-in-5').fill('09:00');
    await page.locator('#w-out-5').fill('17:30');
    await page.locator('#w-rate').fill('100');
    await page.locator('#w-calc').click();
    await expect(page.locator('#w-total')).toHaveText('48:30');
    await expect(page.locator('#w-normal')).toHaveText('45:00');
    await expect(page.locator('#w-over')).toHaveText('3:30');
    await expect(page.locator('#w-over-note')).toBeVisible();
    await expect(page.locator('#w-over-note a[href="../mesai-hesapla/"]')).toBeVisible();
    await expect(page.locator('#w-pay-normal')).toHaveText('4.500,00 TL');
    await expect(page.locator('#w-pay-over')).toHaveText('525,00 TL');
    await expect(page.locator('#w-pay-total')).toHaveText('5.025,00 TL');

    // gece vardiyası satırı ve 11 saat uyarısı
    await page.locator('#w-in-6').fill('20:00');
    await page.locator('#w-out-6').fill('08:00');
    await page.locator('#w-calc').click();
    await expect(page.locator('#w-day-6')).toHaveText('12:00 (gece)');
    await expect(page.locator('#w-long')).toContainText('Pazar');
    await expect(page.locator('#w-long')).toContainText('Yargıtay');
    noErrors();
  });

  test('dönüştürücü: 7,5 saat = 7:30; 135 dk = 2:15 = 2,25 saat', async ({ page }) => {
    await open(page);
    await page.locator('#tab-cevir').click();
    await page.locator('#cv-in').fill('7,5');
    await page.locator('#cv-calc').click();
    await expect(page.locator('#cv-hm')).toHaveText('7:30');
    await expect(page.locator('#cv-min')).toHaveText('450 dk');
    await page.locator('#cv-unit').selectOption('min');
    await page.locator('#cv-in').fill('135');
    // yazarken güncellenir
    await expect(page.locator('#cv-hm')).toHaveText('2:15');
    await expect(page.locator('#cv-dec')).toHaveText('2,25 saat');
    await expect(page.locator('#cv-sec')).toHaveText('8.100 sn');
    await page.locator('#cv-unit').selectOption('sec');
    await page.locator('#cv-in').fill('27000');
    await expect(page.locator('#cv-hm')).toHaveText('7:30');
    // ondalık saat biriminde nokta ondalık ayırıcıdır: 8.25 saat = 8:15 (8:25 değil)
    await page.locator('#cv-unit').selectOption('dec');
    await page.locator('#cv-in').fill('8.25');
    await expect(page.locator('#cv-hm')).toHaveText('8:15');
    await page.locator('#cv-in').fill('8.75');
    await expect(page.locator('#cv-hm')).toHaveText('8:45');
    // saat:dakika biriminde 7.30 = 7 sa 30 dk
    await page.locator('#cv-unit').selectOption('hm');
    await page.locator('#cv-in').fill('7.30');
    await expect(page.locator('#cv-hm')).toHaveText('7:30');
    await expect(page.locator('#cv-dec')).toHaveText('7,50 saat');
    // geçersiz yazımda eski sonuç ekranda kalmaz
    await page.locator('#cv-in').fill('7.30x');
    await expect(page.locator('#cv-result')).toBeHidden();
  });

  test('hatalı ve bozuk girişler Türkçe, çözüm öneren hata verir; sayfa çökmez', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#fa-calc').click();
    await expect(page.locator('#error')).toContainText('Başlangıç saati boş');
    await expect(page.locator('#fa-result')).toBeHidden();
    await span(page, '8:75', '17:00');
    await expect(page.locator('#error')).toContainText('dakika 00–59');
    await span(page, 'abc', '17:00');
    await expect(page.locator('#error')).toContainText('okunamadı');
    await span(page, '13:00 PM', '17:00');
    await expect(page.locator('#error')).toContainText('AM/PM');
    await span(page, '24:30', '17:00');
    await expect(page.locator('#error')).toContainText('24:00');
    await span(page, '09:00', '10:00', '90');
    await expect(page.locator('#error')).toContainText('uzun');
    await span(page, '09:00', '09:00');
    await expect(page.locator('#error')).toContainText('Bitiş ertesi gün');
    await expect(page.locator('#fa-result')).toBeHidden();
    // geçerli hesap hatayı temizler
    await span(page, '08:30', '17:15');
    await expect(page.locator('#error')).toBeHidden();

    await page.locator('#tab-ekle').click();
    await page.locator('#ek-base').fill('10:00');
    await page.locator('#ek-dur').fill('2 parsek');
    await page.locator('#ek-calc').click();
    await expect(page.locator('#error')).toContainText('birimi tanınmadı');

    await page.locator('#tab-topla').click();
    await page.locator('#to-calc').click();
    await expect(page.locator('#error')).toContainText('okunabilir süre yok');
    await page.locator('#to-list').fill('1:00\n2:7x');
    await page.locator('#to-calc').click();
    await expect(page.locator('#error')).toContainText('2. satırdaki değer');
    await page.locator('#to-list').fill('1:75');
    await page.locator('#to-calc').click();
    await expect(page.locator('#error')).toContainText('2:15 yazın');
    // bozuk dosya: Excel (zip) içeriği
    await page.locator('#to-file').setInputFiles({ name: 'tablo.csv', mimeType: 'text/csv', buffer: Buffer.from([0x50, 0x4b, 0x03, 0x04, 0, 0, 0, 0, 0x14, 0]) });
    await expect(page.locator('#error')).toContainText('CSV');
    await expect(page.locator('#to-result')).toBeHidden();

    await page.locator('#tab-hafta').click();
    await page.locator('#w-calc').click();
    await expect(page.locator('#error')).toContainText('Çizelge boş');
    await page.locator('#w-in-1').fill('09:00');
    await page.locator('#w-calc').click();
    await expect(page.locator('#error')).toContainText('Salı: çıkış saati eksik');
    await expect(page.locator('#w-out-1')).toBeFocused();
    await page.locator('#w-out-1').fill('17:00');
    await page.locator('#w-rate').fill('yüz lira');
    await page.locator('#w-calc').click();
    await expect(page.locator('#error')).toContainText('Saat ücreti okunamadı');

    await page.locator('#tab-cevir').click();
    await page.locator('#cv-calc').click();
    await expect(page.locator('#error')).toContainText('boş');
    noErrors();
  });

  test('klavye: sekmeler ok tuşlarıyla, form Enter ile çalışır', async ({ page }) => {
    await open(page);
    await page.locator('#tab-fark').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-ekle')).toBeFocused();
    await expect(page.locator('#tab-ekle')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#panel-ekle')).toBeVisible();
    await page.keyboard.press('End');
    await expect(page.locator('#tab-cevir')).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-fark')).toBeFocused();
    await expect(page.locator('#panel-fark')).toBeVisible();
    await page.locator('#fa-start').fill('22:00');
    await page.locator('#fa-end').fill('06:30');
    await page.locator('#fa-end').press('Enter');
    await expect(page.locator('#fa-hm')).toHaveText('8:30');
  });

  test('saf fonksiyonlar: kenar durumlar', async ({ page }) => {
    await open(page);
    const r = await page.evaluate(async () => {
      const m: any = await import('/saat-hesapla/tool.js');
      return {
        pm: m.parseClock('8:30 PM').sec, am12: m.parseClock('12:00 AM').sec, os: m.parseClock('8:30 ÖS').sec,
        h24: m.parseClock('24:00').sec, compact: m.parseClock('0830').sec, bad: m.parseClock('25:00').error,
        dur: m.parseDuration('1h30m').sec, dot: m.parseDuration('7.30').sec, dec: m.parseDuration('7,75').sec,
        neg: m.fmtHM(-4500), big: m.fmtHM(m.sumList('99:30\n0:45').total),
        dayShift2: m.addToClock(3600 * 23, 3600 * 26).dayShift,
        hms: m.parseDuration('1h30m45s').sec, sHour: m.parseDuration('2 s 15 dk').sec,
        dotDec: m.parseDuration('8.25', { dotHM: false }).sec, dotSec: m.parseDuration('7.30', { bare: 'sec', dotHM: false }).sec,
        stamp: m.sumList('2026-11-04T09:00;0:45').total,
      };
    });
    expect(r.pm).toBe(20.5 * 3600);
    expect(r.am12).toBe(0);
    expect(r.os).toBe(20.5 * 3600);
    expect(r.h24).toBe(86400);
    expect(r.compact).toBe(8.5 * 3600);
    expect(r.bad).toBe('hour');
    expect(r.dur).toBe(5400);
    expect(r.dot).toBe(7.5 * 3600);
    expect(r.dec).toBe(7.75 * 3600);
    expect(r.neg).toBe(M + '1:15');
    expect(r.big).toBe('100:15');
    expect(r.dayShift2).toBe(2);
    expect(r.hms).toBe(5445); // 1 sa 30 dk 45 sn (45 saat değil)
    expect(r.sHour).toBe(8100); // "s" tek başına saat
    expect(r.dotDec).toBe(8.25 * 3600);
    expect(r.dotSec).toBe(7);
    expect(r.stamp).toBe(45 * 60);
  });

  test('360px genişlikte yatay taşma yok (sonuçlar açıkken de)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await span(page, '08:30:15', '17:15:45', '45');
    await expect(page.locator('#fa-result')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#tab-topla').click();
    await page.locator('#to-list').fill(Array.from({ length: 80 }, () => '12:34:56').join('\n'));
    await page.locator('#to-calc').click();
    await expect(page.locator('#to-result')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#tab-hafta').click();
    await page.locator('#w-in-0').fill('09:00');
    await page.locator('#w-out-0').fill('23:00');
    await page.locator('#w-copy').click();
    await page.locator('#w-rate').fill('1.250,75');
    await page.locator('#w-calc').click();
    await expect(page.locator('#w-result')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
});
