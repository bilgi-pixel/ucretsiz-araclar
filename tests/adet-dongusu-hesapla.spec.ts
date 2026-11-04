import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/adet-dongusu-hesapla/';
const KEY = 'ba-adet-dongusu-hesapla-v1';
const DISCLAIMER = 'Bilgilendirme amaçlıdır, doğum kontrol yöntemi değildir, tıbbi tavsiye değildir';

/** Sayfayı açar; modül betiği ve parametreler yüklenmeden form gönderilmez. */
async function open(page: Page, today?: string) {
  if (today) await page.clock.setFixedTime(new Date(`${today}T12:00:00`));
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#params-line')).toContainText('güncellendi');
}

async function calc(page: Page, lmp: string, cycle = '28', period = '5', count?: string) {
  await page.locator('#lmp').fill(lmp);
  await page.locator('#cycle').fill(cycle);
  await page.locator('#period').fill(period);
  if (count) await page.locator('#count').selectOption(count);
  await page.locator('#calc').click();
}

test.describe('Adet Döngüsü Hesaplama', () => {
  test('mutlu yol: 1 Ocak 2026, 28/5 → sonraki adet 29 Ocak–2 Şubat, yumurtlama 15 Ocak, doğurgan 10–16 Ocak; döngü günü ve kalan gün; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page, '2026-01-10');
    await expect(page.locator('.ba-hero')).toContainText(DISCLAIMER);
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, '2026-01-01');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-01-29');
    await expect(page.locator('#r-next')).toContainText('29 Ocak 2026 Perşembe');
    await expect(page.locator('#r-next-end')).toHaveAttribute('data-iso', '2026-02-02');
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2026-01-15');
    await expect(page.locator('#r-fertile')).toHaveAttribute('data-start', '2026-01-10');
    await expect(page.locator('#r-fertile')).toHaveAttribute('data-end', '2026-01-16');
    await expect(page.locator('#r-fertile')).toHaveText('10 Ocak – 16 Ocak 2026');
    await expect(page.locator('#r-cycleday')).toHaveAttribute('data-day', '10');
    await expect(page.locator('#r-cycleday')).toHaveText('10. gün');
    await expect(page.locator('#r-daysleft')).toHaveText('19 gün kaldı');
    await expect(page.locator('#r-cycle')).toHaveText('28 gün');
    await expect(page.locator('#r-summary')).toContainText('29 Ocak 2026 Perşembe');
    await expect(page.locator('#r-disclaimer')).toContainText(DISCLAIMER);
    for (const id of ['#r-future', '#r-stale', '#r-adult', '#r-longperiod', '#r-irregular', '#hist']) await expect(page.locator(id)).toBeHidden();
    // Varsayılan 6 tahmini adet; her biri döngü uzunluğu kadar ileride
    const items = page.locator('#period-list li');
    await expect(items).toHaveCount(6);
    await expect(page.locator('#list-title')).toHaveText('Önümüzdeki 6 adet (tahmini)');
    const starts = await items.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.start));
    expect(starts).toEqual(['2026-01-29', '2026-02-26', '2026-03-26', '2026-04-23', '2026-05-21', '2026-06-18']);
    await expect(items.nth(0)).toHaveAttribute('data-end', '2026-02-02');
    await expect(items.nth(0)).toContainText('1. adet: 29 Ocak – 2 Şubat 2026');
    await expect(items.nth(0)).toContainText('Doğurgan pencere: 10–16 Oca');
    expect(external).toEqual([]);
    noErrors();
  });

  test('döngü 30, ay sonu, artık yıl, döngü sayısı 12 ve geçmiş tarih (beklenen adet geçti)', async ({ page }) => {
    await open(page, '2026-01-10');
    await calc(page, '2026-01-01', '30');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-01-31');
    await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2026-01-17');
    await expect(page.locator('#r-cycle')).toHaveText('30 gün');
    // 31 Ocak + 28 gün = 28 Şubat (artık olmayan yıl)
    await calc(page, '2026-01-31', '28');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-02-28');
    // Artık yıl: 1 Şubat 2028 + 28 = 29 Şubat 2028
    await calc(page, '2028-02-01', '28', '5', '12');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2028-02-29');
    await expect(page.locator('#r-next')).toContainText('29 Şubat 2028');
    await expect(page.locator('#period-list li')).toHaveCount(12);
    await expect(page.locator('#list-title')).toHaveText('Önümüzdeki 12 adet (tahmini)');
    // Yıl geçişi
    await calc(page, '2026-12-20', '28', '5', '1');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2027-01-17');
    await expect(page.locator('#period-list li')).toHaveCount(1);
    // Geçmişte kalan tarih: beklenen adet geçti notu, hesap yine yapılır
    await calc(page, '2025-11-01', '28', '5', '6');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2025-11-29');
    await expect(page.locator('#r-stale')).toBeVisible();
    await expect(page.locator('#r-stale')).toContainText('29 Kasım 2025');
    await expect(page.locator('#r-daysleft')).toHaveAttribute('data-days', '-42');
    await expect(page.locator('#r-daysleft')).toContainText('42 gün önceydi');
    await expect(page.locator('#r-cycleday')).toContainText('döngü aşıldı');
  });

  test('geçmiş tarihlerden ortalama ve düzensizlik: 28, 30, 32 → ortalama 30; düzensiz örnek ve hatalar', async ({ page }) => {
    await open(page, '2026-04-05');
    await page.locator('#mode-history').check();
    await expect(page.locator('#history-fields')).toBeVisible();
    await expect(page.locator('#known-fields')).toBeHidden();
    await page.locator('#lmp').fill('2026-04-01');
    // Sıra serbest
    await page.locator('#h1').fill('2026-02-28');
    await page.locator('#h2').fill('2026-01-01');
    await page.locator('#h3').fill('2026-01-29');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#hist')).toBeVisible();
    await expect(page.locator('#r-avg')).toHaveText('30 gün');
    await expect(page.locator('#r-range')).toHaveText('28–32 gün');
    await expect(page.locator('#r-spread')).toHaveText('4 gün');
    await expect(page.locator('#r-verdict')).toHaveAttribute('data-verdict', 'regular');
    const lens = await page.locator('#r-intervals li').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.days));
    expect(lens).toEqual(['28', '30', '32']);
    await expect(page.locator('#r-cycle')).toHaveAttribute('data-days', '30');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-05-01');
    await expect(page.locator('#r-cycleday')).toHaveText('5. gün');

    // Küsuratlı ortalama ve düzensizlik: 24 ve 40 gün → ortalama 32, fark 16 → düzensiz
    await page.locator('#h1').fill('2026-01-28'); // 28 Oca → 21 Şub = 24 gün
    await page.locator('#h2').fill('2026-02-21'); // 21 Şub → 2 Nis = 40 gün
    await page.locator('#h3').fill('');
    await page.locator('#lmp').fill('2026-04-02');
    await page.locator('#calc').click();
    await expect(page.locator('#r-avg')).toHaveText('32 gün');
    await expect(page.locator('#r-spread')).toHaveText('16 gün');
    await expect(page.locator('#r-verdict')).toHaveAttribute('data-verdict', 'irregular');
    await expect(page.locator('#r-verdict')).toContainText('hekime danışın');
    // 21–45 dışında kalan tek döngü (50 gün) → not; ortalama aralıkta olduğu için hesap yapılır
    await page.locator('#h1').fill('2025-12-15'); // → 3 Şub 2026 = 50 gün
    await page.locator('#h2').fill('2026-02-03'); // → 2 Mar 2026 = 27 gün
    await page.locator('#lmp').fill('2026-03-02');
    await page.locator('#calc').click();
    await expect(page.locator('#r-irregular')).toBeVisible();
    await expect(page.locator('#r-irregular')).toContainText('Düzensiz döngü, hekime danışın');
    await expect(page.locator('#r-irregular')).toContainText('50 gün');
    await expect(page.locator('#r-avg')).toContainText('38,5 gün (hesapta 39 gün kullanıldı)');
    await expect(page.locator('#r-adult')).toBeVisible();

    // Hatalar: tek önceki tarih, son adetten sonraki tarih, aynı adetin günleri
    await page.locator('#h2').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('en az 2 önceki adet başlangıç tarihi');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#h2').fill('2026-03-10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('son adet başlangıç tarihinden önce olmalıdır');
    await page.locator('#h2').fill('2026-02-27');
    await page.locator('#h1').fill('2026-02-25');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('aynı adetin farklı günlerini');
    // Ortalama 21–45 dışı → düzensiz döngü uyarısıyla tahmin üretilmez
    await page.locator('#h1').fill('2025-10-01');
    await page.locator('#h2').fill('2025-12-01');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Düzensiz döngü, hekime danışın');
    await expect(page.locator('#error')).toContainText('ortalama döngü 76 gün');
  });

  test('hatalı girişler: boş tarih, aralık dışı döngü, süre ≥ döngü, gelecekteki tarih uyarısı, uzun döngü ve uzun kanama notları', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page, '2026-03-05');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Son adet başlangıç tarihini girin');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, '2026-03-01', '50');
    await expect(page.locator('#error')).toContainText('Düzensiz döngü, hekime danışın');
    await expect(page.locator('#error')).toContainText('21–45');
    await calc(page, '2026-03-01', '18');
    await expect(page.locator('#error')).toContainText('Düzensiz döngü, hekime danışın');
    await calc(page, '2026-03-01', 'abc');
    await expect(page.locator('#error')).toContainText('tam sayı');
    // Adet süresi döngüden uzun ya da eşit (alanlar karıştırılmış)
    await calc(page, '2026-03-01', '5', '28');
    await expect(page.locator('#error')).toContainText('döngü uzunluğundan');
    await expect(page.locator('#error')).toContainText('karıştırmış');
    await calc(page, '2026-03-01', '6', '6');
    await expect(page.locator('#error')).toContainText('kısa olmalıdır');
    await calc(page, '2026-03-01', '28', '12');
    await expect(page.locator('#error')).toContainText('2–10');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, '1999-05-05', '28', '5');
    await expect(page.locator('#error')).toContainText('2000–2100');
    // Gelecekteki tarih: uyarı + hesap
    await calc(page, '2026-04-01', '28', '5');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-future')).toBeVisible();
    await expect(page.locator('#r-future')).toContainText('gelecekte');
    await expect(page.locator('#r-cycleday')).toContainText('gelecekte');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-04-29');
    // 36–45 gün: yetişkin notu; 8+ gün kanama: hekim notu
    await calc(page, '2026-03-01', '40', '8');
    await expect(page.locator('#r-future')).toBeHidden();
    await expect(page.locator('#r-adult')).toBeVisible();
    await expect(page.locator('#r-adult')).toContainText('21–35');
    await expect(page.locator('#r-longperiod')).toBeVisible();
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-04-10');
    // Temizle varsayılanlara döner ve odağı tarihe verir (klavye)
    await page.locator('#clear').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#lmp')).toHaveValue('');
    await expect(page.locator('#cycle')).toHaveValue('28');
    await expect(page.locator('#period')).toHaveValue('5');
    await expect(page.locator('#count')).toHaveValue('6');
    await expect(page.locator('#lmp')).toBeFocused();
    // Enter ile gönderim
    await page.locator('#lmp').fill('2026-01-01');
    await page.locator('#lmp').press('Enter');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-01-29');
    noErrors();
  });

  test('takvim: renk dışında harf ve desen, ay gezinme (klavye), adet + doğurgan çakışması', async ({ page }) => {
    await open(page, '2026-01-10');
    await calc(page, '2026-01-01', '28', '5', '2');
    await expect(page.locator('#cal-title')).toHaveText('Ocak 2026');
    // 1 Ocak 2026 perşembe: pazartesi başlangıçlı ızgarada 3 boş hücre
    await expect(page.locator('#cal-grid .ad-cal-b')).toHaveCount(3);
    await expect(page.locator('#cal-grid .ad-cal-d')).toHaveCount(31);
    await expect(page.locator('#cal-grid .is-period')).toHaveCount(8); // 1–5 ve 29–31 Ocak
    await expect(page.locator('#cal-grid .is-ovulation')).toHaveCount(1);
    await expect(page.locator('#cal-grid .is-ovulation')).toHaveAttribute('data-iso', '2026-01-15');
    await expect(page.locator('#cal-grid .is-ovulation .ad-cal-m')).toHaveText('Y');
    await expect(page.locator('#cal-grid .is-fertile:not(.is-ovulation)')).toHaveCount(6);
    await expect(page.locator('#cal-grid .is-fertile:not(.is-ovulation) .ad-cal-m').first()).toHaveText('D');
    await expect(page.locator('#cal-grid .is-period .ad-cal-m').first()).toHaveText('A');
    // Bugün işareti ve ekran okuyucu metni
    await expect(page.locator('#cal-grid [aria-current="date"]')).toHaveAttribute('data-iso', '2026-01-10');
    await expect(page.locator('#cal-grid .is-ovulation .visually-hidden')).toContainText('tahmini yumurtlama günü');
    await expect(page.locator('#cal-grid .is-period').first().locator('.visually-hidden')).toContainText('adet günü');
    // Desen: adet günü çizgili arka plan ve kesik kenar, doğurgan noktalı kenar (yalnızca renge güvenilmez)
    const periodStyle = await page.locator('#cal-grid .is-period').first().evaluate((el) => { const s = getComputedStyle(el); return { bg: s.backgroundImage, border: s.borderTopStyle }; });
    expect(periodStyle.bg).toContain('repeating-linear-gradient');
    expect(periodStyle.border).toBe('dashed');
    const fertileBorder = await page.locator('#cal-grid .is-fertile:not(.is-ovulation)').first().evaluate((el) => getComputedStyle(el).borderTopStyle);
    expect(fertileBorder).toBe('dotted');
    // Gezinme: ilk ayda "önceki" kapalı, son ayda "sonraki" kapalı (2. adet 26 Şub – 2 Mar)
    await expect(page.locator('#cal-prev')).toBeDisabled();
    await page.locator('#cal-next').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#cal-title')).toHaveText('Şubat 2026');
    await expect(page.locator('#cal-grid .is-period')).toHaveCount(5); // 1–2 ve 26–28 Şubat
    await page.keyboard.press('Enter');
    await expect(page.locator('#cal-title')).toHaveText('Mart 2026');
    await expect(page.locator('#cal-next')).toBeDisabled();
    // Devre dışı kalan düğmedeki odak kaybolmaz; diğer gezinme düğmesine geçer
    await expect(page.locator('#cal-prev')).toBeFocused();
    await page.locator('#cal-prev').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#cal-title')).toHaveText('Şubat 2026');
    // 21 günlük döngüde adet ve doğurgan günler çakışır: ikisi birden işaretlenir
    await calc(page, '2026-03-01', '21', '5', '1');
    await expect(page.locator('#cal-grid .is-period.is-fertile')).toHaveCount(3); // 3–5 Mart
    await expect(page.locator('#cal-grid .is-period.is-fertile').first()).toHaveAttribute('data-iso', '2026-03-03');
  });

  test('.ics indirme: istemci tarafı Blob, tüm gün etkinlikleri, CRLF ve satır katlama', async ({ page }) => {
    const external = trackExternalRequests(page);
    await open(page, '2026-01-10');
    await calc(page, '2026-01-01', '28', '5', '3');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#ics').click()]);
    expect(dl.suggestedFilename()).toBe('adet-takvimi-2026-01-29.ics');
    expect(dl.url()).toMatch(/^blob:/);
    const text = readFileSync((await dl.path())!, 'utf8');
    expect(text.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(text.trimEnd().endsWith('END:VCALENDAR')).toBe(true);
    expect((text.match(/BEGIN:VEVENT/g) || []).length).toBe(3);
    expect(text).toContain('DTSTART;VALUE=DATE:20260129');
    expect(text).toContain('DTEND;VALUE=DATE:20260203'); // bitiş 2 Şubat dahil, DTEND hariç tutulur
    expect(text).toContain('DTSTART;VALUE=DATE:20260226');
    expect(text).not.toContain('BEGIN:VALARM');
    expect(text.replace(/\r\n /g, '')).toContain('doğum kontrol yöntemi değildir');
    // Her satır CRLF ile biter ve 75 sekizliyi aşmaz
    expect(text.split('\r\n').every((l) => !l.includes('\n'))).toBe(true);
    for (const line of text.split('\r\n')) expect(Buffer.byteLength(line, 'utf8')).toBeLessThanOrEqual(75);
    await expect(page.locator('#ics-status')).toContainText('3 tahmini adet');
    // Doğurgan pencere + hatırlatıcı seçenekleri
    await page.locator('#ics-fertile').check();
    await page.locator('#ics-alarm').check();
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#ics').click()]);
    const text2 = readFileSync((await dl2.path())!, 'utf8');
    expect((text2.match(/BEGIN:VEVENT/g) || []).length).toBe(9);
    expect(text2).toContain('DTSTART;VALUE=DATE:20260115'); // yumurtlama
    expect(text2).toContain('DTSTART;VALUE=DATE:20260110'); // doğurgan pencere başlangıcı
    expect(text2).toContain('DTEND;VALUE=DATE:20260117');   // doğurgan pencere 16 Ocak dahil
    expect((text2.match(/BEGIN:VALARM/g) || []).length).toBe(3);
    expect(text2).toContain('TRIGGER:-P1D');
    expect(external).toEqual([]);
  });

  test.describe('yaz saati geçişi', () => {
    test.use({ timezoneId: 'Europe/Berlin' });
    test('DST geçişinde gün kayması yok (UTC gün aritmetiği)', async ({ page }) => {
      await open(page, '2026-03-25');
      // 29 Mart 2026 yaz saatine geçiş
      await calc(page, '2026-03-20', '28');
      await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-04-17');
      await expect(page.locator('#r-ovulation')).toHaveAttribute('data-iso', '2026-04-03');
      await expect(page.locator('#r-cycleday')).toHaveText('6. gün');
      await expect(page.locator('#r-daysleft')).toHaveText('23 gün kaldı');
      await expect(page.locator('#cal-grid .ad-cal-d')).toHaveCount(31);
      await expect(page.locator('#cal-grid [aria-current="date"]')).toHaveAttribute('data-iso', '2026-03-25');
      // 25 Ekim 2026 kış saatine dönüş
      await calc(page, '2026-10-10', '28');
      await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-11-07');
      await expect(page.locator('#r-fertile')).toHaveAttribute('data-start', '2026-10-19');
      await expect(page.locator('#r-fertile')).toHaveAttribute('data-end', '2026-10-25');
    });
  });

  test('localStorage: onay olmadan kayıt yok; onayla kayıt, yeniden yükleme, verileri sil; bozuk kayıtta çökmez', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page, '2026-01-10');
    await calc(page, '2026-01-01');
    expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBeNull();
    // Açık onay
    await page.locator('#remember').check();
    await expect(page.locator('#store-status')).toContainText('yalnızca bu cihazdaki tarayıcıya kaydedildi');
    const saved = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), KEY))!);
    expect(saved).toMatchObject({ v: 1, mode: 'known', lmp: '2026-01-01', cycle: '28', period: '5', count: '6' });
    // Yeniden yükle: girdiler geri gelir ve sonuç hesaplanır
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#remember')).toBeChecked();
    await expect(page.locator('#lmp')).toHaveValue('2026-01-01');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-01-29');
    await expect(page.locator('#store-status')).toContainText('kayıtlı girdileriniz yüklendi');
    // Verileri sil
    await page.locator('#forget').click();
    expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBeNull();
    await expect(page.locator('#remember')).not.toBeChecked();
    await expect(page.locator('#store-status')).toContainText('silindi');
    // Onayı geri çekmek de siler
    await page.locator('#remember').check();
    expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).not.toBeNull();
    await page.locator('#remember').uncheck();
    expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBeNull();
    // Bozuk kayıt: sayfa çökmez, kayıt silinir
    await page.evaluate((k) => localStorage.setItem(k, '{bozuk json'), KEY);
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#store-status')).toContainText('okunamadı ve silindi');
    expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBeNull();
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, '2026-01-01');
    await expect(page.locator('#r-next')).toHaveAttribute('data-iso', '2026-01-29');
    noErrors();
  });

  test('360 px: sonuç, takvim ve liste render edildikten sonra yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page, '2026-01-10');
    const overflow0 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow0).toBeLessThanOrEqual(0);
    await page.locator('#mode-history').check();
    await page.locator('#lmp').fill('2026-04-01');
    await page.locator('#h1').fill('2026-01-01');
    await page.locator('#h2').fill('2026-01-29');
    await page.locator('#h3').fill('2026-02-28');
    await page.locator('#period').fill('8');
    await page.locator('#count').selectOption('12');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await page.locator('#cal-grid').boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    const cell = await page.locator('#cal-grid .ad-cal-d').first().boundingBox();
    expect(cell!.width).toBeGreaterThanOrEqual(30);
    const btn = await page.locator('#cal-next').boundingBox();
    expect(btn!.height).toBeGreaterThanOrEqual(44);
  });

  test('içerik: 3 reklam (araç kutusunun altında), ≥900 kelime, SSS ≥7 ve JSON-LD, çapraz bağlantılar, meta.json, parametreler.json', async ({ page }) => {
    await open(page);
    const ads = page.locator('.ba-ad');
    await expect(ads).toHaveCount(3);
    const slots = await ads.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['adet-dongusu-hesapla-a', 'adet-dongusu-hesapla-b', 'adet-dongusu-hesapla-c']);
    await expect(page.locator('.ba-tool + .ba-ad')).toHaveAttribute('data-slot', 'adet-dongusu-hesapla-a');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-actions .ba-ad, .ba-actions + .ba-ad')).toHaveCount(0);
    const words = await page.locator('.ba-content').evaluate((n) => (n as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '')));
    expect(ld.map((o: any) => o['@type']).sort()).toEqual(['FAQPage', 'SoftwareApplication']);
    const faq: any = ld.find((o: any) => o['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(faqCount);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/adet-dongusu-hesapla/');
    await expect(page.locator('h1')).toContainText('Adet Döngüsü Hesaplama');
    await expect(page).toHaveTitle(/Adet Döngüsü Hesaplama – Sonraki Regl Tarihi/);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-footer-line')).toContainText('%100 ücretsiz · kayıt yok · dosya yüklenmez');
    await expect(page.locator('.ba-content')).toContainText(DISCLAIMER);
    for (const href of ['../yumurtlama-hesapla/', '../gebelik-hesapla/']) {
      await expect(page.locator(`.ba-related a[href="${href}"]`)).toHaveCount(1);
    }
    await expect(page.locator('#params-line')).toContainText('4 Kasım 2026');
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'adet-dongusu-hesapla', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('hesapla');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
    expect(Array.isArray(meta.vendor)).toBe(true);
    const params = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'adet-dongusu-hesapla', 'parametreler.json'), 'utf8'));
    expect(params.yaklasik).toBe(false);
    expect(params.luteal_gun).toBe(14);
    expect(params.kaynak).toContain('Sağlık Bakanlığı');
    expect(params.kaynak).toContain('ACOG');
  });
});
