import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Sabit "şimdi": 4 Kasım 2026 10:00 (yerel). Hesap Node tarafında aynı saatle yapılır.
const NOW = new Date(2026, 10, 4, 10, 0, 0);

test.describe('Kaç Gün Kaldı Sayacı', () => {
  test('?tarih= ile hedef yüklenir, gün sayısı Node ile aynı; ad görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.clock.setFixedTime(NOW);
    await page.goto('/kac-gun-kaldi/?tarih=2030-01-01&ad=Tatil');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    const expected = Math.floor((new Date(2030, 0, 1, 0, 0, 0).getTime() - NOW.getTime()) / 86400000);
    const shown = (await page.locator('#c-days').innerText()).replace(/\./g, '').replace(/\s/g, '');
    expect(Number(shown)).toBe(expected);
    await expect(page.locator('#r-title')).toContainText('Tatil');
    await expect(page.locator('#r-mode')).toHaveText('Kalan süre');
    await expect(page.locator('#tarih')).toHaveValue('2030-01-01');
    // saat belirtilince 18:30 yüklenir
    await page.goto('/kac-gun-kaldi/?tarih=2026-11-05T18:30');
    await expect(page.locator('#c-days')).toHaveText('1');
    await expect(page.locator('#c-hours')).toHaveText('08');
    await expect(page.locator('#c-min')).toHaveText('30');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geçmiş tarih "Ne kadar geçti" moduna geçer', async ({ page }) => {
    await page.clock.setFixedTime(NOW);
    await page.goto('/kac-gun-kaldi/?tarih=2026-01-01');
    const expected = Math.floor((NOW.getTime() - new Date(2026, 0, 1).getTime()) / 86400000);
    await expect(page.locator('#r-mode')).toHaveText('Ne kadar geçti');
    await expect(page.locator('#c-days')).toHaveText(String(expected));
  });

  test('form: hazır hedef, özel tarih ve paylaşım bağlantısı', async ({ page }) => {
    await page.clock.setFixedTime(NOW);
    await page.goto('/kac-gun-kaldi/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    // varsayılan Yılbaşı: 1 Ocak 2027
    const ny = Math.floor((new Date(2027, 0, 1).getTime() - NOW.getTime()) / 86400000);
    await expect(page.locator('#c-days')).toHaveText(String(ny));
    await page.locator('#preset').selectOption('kurban-bayrami');
    await expect(page.locator('#tarih')).toHaveValue('2027-05-16');
    await expect(page.locator('#approx')).toBeVisible();
    await page.locator('#tarih').fill('2026-12-31');
    await page.locator('#ad').fill('Yılın son günü');
    await page.locator('#go').click();
    await expect(page).toHaveURL(/tarih=2026-12-31/);
    await expect(page).toHaveURL(/ad=Y/);
    const d = Math.floor((new Date(2026, 11, 31).getTime() - NOW.getTime()) / 86400000);
    await expect(page.locator('#c-days')).toHaveText(String(d));
    // 4 Kasım 2026 Çarşamba → 31 Aralık: bugün dahil, hedef hariç iş günü (tatil çıkarılmadan) hesabı
    await page.locator('#skip-holidays').uncheck();
    let wd = 0;
    for (let t = new Date(2026, 10, 4); t < new Date(2026, 11, 31); t.setDate(t.getDate() + 1)) if (t.getDay() % 6 !== 0) wd++;
    await expect(page.locator('#r-workdays')).toContainText(`${wd} iş günü`);
  });

  test('hatalı tarih Türkçe hata verir', async ({ page }) => {
    await page.goto('/kac-gun-kaldi/?tarih=2026-02-30');
    await expect(page.locator('#error')).toContainText('Bağlantıdaki tarih geçersiz');
    await expect(page.locator('#error')).toContainText('2026-12-31');
    // geçersiz bağlantıda sayfa yine de Yılbaşı ile çalışır
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await page.locator('#go').click();
    await expect(page.locator('#error')).toContainText('Lütfen bir hedef tarih seçin');
    await page.locator('#tarih').fill('2026-12-31');
    await page.locator('#saat').fill('');
    await page.locator('#go').click();
    await expect(page.locator('#result')).toBeVisible(); // boş saat 00:00 kabul edilir
  });

  test('sabit bölümler ve canlı gün sayıları görünür', async ({ page }) => {
    await page.clock.setFixedTime(NOW);
    await page.goto('/kac-gun-kaldi/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    for (const id of ['yilbasi', 'ramazan-bayrami', 'kurban-bayrami', '23-nisan', '19-mayis', '29-ekim', 'yks', 'lgs', 'kpss', 'yaz-tatili', 'okullarin-acilmasi']) {
      await expect(page.locator(`[id="${id}"] .kg-live`)).toContainText('gün kaldı');
    }
    await expect(page.locator('#yks .kg-live')).toContainText('tahmini');
    await expect(page.locator('#yilbasi .kg-live')).toContainText('58 gün kaldı');
  });
});
