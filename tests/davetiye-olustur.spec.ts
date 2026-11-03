import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';

test.describe('Davetiye Oluşturucu', () => {
  test('alanlar doldurulur: A5 PNG 1748×2480, PDF iner, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/davetiye-olustur/');
    await expect(page.locator('#f-title')).toHaveValue('Düğünümüze Davetlisiniz');
    await page.locator('#f-names').fill('Ayşe & Mehmet');
    await page.locator('#f-date').fill('2026-06-14');
    await page.locator('#f-time').fill('19:00');
    await page.locator('#f-venue').fill('Gül Bahçesi Düğün Salonu');
    await page.locator('#f-address').fill('Şehitlik Mah. Çiçek Cad. No: 5 Bağlar / Diyarbakır');
    await page.locator('#f-note').fill('Sizleri aramızda görmek bizi çok mutlu edecek.');
    await page.locator('#f-rsvp').fill('0532 000 00 00');
    await expect(page.locator('#preview')).toHaveAttribute('data-ready', '1');

    const [png] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-png').click()]);
    expect(png.suggestedFilename()).toBe('davetiye-ayşe-mehmet-A5.png');
    const b = readFileSync((await png.path())!);
    expect(Array.from(b.subarray(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
    expect(b.readUInt32BE(16)).toBe(1748);
    expect(b.readUInt32BE(20)).toBe(2480);

    const [pdf] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-pdf').click()]);
    const doc = await PDFDocument.load(readFileSync((await pdf.path())!));
    expect(doc.getPageCount()).toBe(1);
    expect(Math.round(doc.getPage(0).getWidth())).toBe(420);
    expect(Math.round(doc.getPage(0).getHeight())).toBe(595);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tür, şablon ve boyut değişir; hikaye PNG 1080×1920', async ({ page }) => {
    await page.goto('/davetiye-olustur/');
    await page.locator('#inv-type').selectOption('dogumgunu');
    await expect(page.locator('#f-title')).toHaveValue('Doğum Günü Partisine Davetlisiniz');
    await expect(page.locator('#lbl-names')).toHaveText('Doğum günü sahibinin adı');
    await page.locator('#f-names').fill('Defne');
    await page.locator('#f-date').fill('2026-08-01');
    await page.locator('#inv-template').selectOption('cicekli');
    await page.locator('#inv-font').selectOption('dancing');
    await page.locator('#inv-size').selectOption('hikaye');
    const [png] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-png').click()]);
    const b = readFileSync((await png.path())!);
    expect(b.readUInt32BE(16)).toBe(1080);
    expect(b.readUInt32BE(20)).toBe(1920);
  });

  test('zorunlu alan boşsa Türkçe hata verir, dosya inmez', async ({ page }) => {
    await page.goto('/davetiye-olustur/');
    await page.locator('#btn-png').click();
    await expect(page.locator('#error')).toContainText('alanını doldurun');
    await page.locator('#f-names').fill('Elif & Can');
    await page.locator('#btn-pdf').click();
    await expect(page.locator('#error')).toContainText('tarihini seçin');
    await page.locator('#f-date').fill('2026-09-05');
    await expect(page.locator('#error')).toBeHidden();
  });
});
