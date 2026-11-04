import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Resmî Tatiller', () => {
  test('2026 tablosu, köprü önerisi, toplam gün ve .ics indirme; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/resmi-tatiller/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#year').selectOption('2026');
    const tbl = page.locator('#tbl-body');
    await expect(tbl).toContainText('Ramazan Bayramı');
    await expect(tbl).toContainText('20 Mart');
    await expect(tbl).toContainText('Kurban Bayramı');
    await expect(tbl.locator('tr')).toHaveCount(9);
    // 2026: 1+3+1+1+1+4+1+1+1 = 14 gün
    await expect(page.locator('#s-total')).toHaveText('14 gün');
    // köprü önerisi (örn. 2 Ocak Cuma ile Yılbaşı hafta sonu birleşir)
    await expect(page.locator('#bridges li').first()).toContainText('gün izin al');
    await expect(page.locator('#bridges')).toContainText('2 Ocak');
    await expect(page.locator('#s-next')).not.toBeEmpty();

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-all').click()]);
    expect(dl.suggestedFilename()).toBe('resmi-tatiller-2026.ics');
    const ics = readFileSync((await dl.path())!, 'utf8');
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).toContain('DTSTART;VALUE=DATE:20260320');
    expect(ics).toContain('DTEND;VALUE=DATE:20260323');
    expect(ics.match(/BEGIN:VEVENT/g)!.length).toBe(9 + 3); // 9 tatil + 3 arife

    // tek tatil
    const [one] = await Promise.all([page.waitForEvent('download'), tbl.locator('tr', { hasText: 'Ramazan Bayramı' }).getByRole('button').click()]);
    expect(one.suggestedFilename()).toBe('ramazan-bayrami-2026.ics');
    expect(readFileSync((await one.path())!, 'utf8')).toContain('BEGIN:VCALENDAR');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('2027: bayram tarihleri (Diyanet takvimi, uyarı yok)', async ({ page }) => {
    await page.goto('/resmi-tatiller/');
    await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
    await page.locator('#year').selectOption('2027');
    await expect(page.locator('#tbl-body')).toContainText('9 Mart 2027');
    await expect(page.locator('#tbl-body')).toContainText('16 Mayıs 2027');
    // 2027 dini bayram tarihleri Diyanet takvimiyle kesin: yaklaşık uyarısı yok
    await expect(page.locator('#year-note')).toBeHidden();
    // 19 Mayıs ile Kurban 4. günü çakışır: benzersiz gün sayısı 1+3+1+1+4+1+1+1 = 13
    await expect(page.locator('#s-total')).toHaveText('13 gün');
  });

  test('veri dosyası yüklenemezse Türkçe, çözüm öneren hata gösterilir', async ({ page }) => {
    await page.route('**/resmi-tatiller/parametreler.json', (r) => r.abort());
    await page.goto('/resmi-tatiller/');
    await expect(page.locator('#error')).toContainText('Sayfayı yenileyin');
  });
});
