import { test, expect, type Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

async function addBook(page: Page, last: string, first: string, year: string, title: string, publisher: string) {
  await page.locator('#authors .au-last').first().fill(last);
  await page.locator('#authors .au-first').first().fill(first);
  await page.locator('#f-year').fill(year);
  await page.locator('#f-title').fill(title);
  await page.locator('#f-publisher').fill(publisher);
  await page.locator('#add').click();
}

test.describe('Kaynakça Oluşturucu', () => {
  test('kitap APA çıktısı, alfabetik sıra, docx ve txt iner', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kaynakca-olustur/');

    await addBook(page, 'Yılmaz', 'Ahmet', '2020', 'Başlık', 'Yayıncı');
    await expect(page.locator('#bib .bib-text').first()).toHaveText('Yılmaz, A. (2020). Başlık. Yayıncı.');
    await expect(page.locator('#bib .bib-cite').first()).toContainText('(Yılmaz, 2020)');
    // başlık italik
    await expect(page.locator('#bib .bib-text i').first()).toHaveText('Başlık');

    await addBook(page, 'Çelik', 'berna can', '2018', 'İkinci Kitap', 'Ankara Yayınları');
    const items = page.locator('#bib .bib-text');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText('Çelik, B. C. (2018). İkinci Kitap. Ankara Yayınları.');
    await expect(items.nth(1)).toContainText('Yılmaz, A. (2020)');

    // biçim değişince liste yeniden yazılır
    await page.locator('#style').selectOption('mla');
    await expect(items.nth(0)).toHaveText('Çelik, berna can. İkinci Kitap. Ankara Yayınları, 2018.');
    await page.locator('#style').selectOption('apa');

    await page.locator('#copy-plain').click();
    await expect(page.locator('#status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Yılmaz, A. (2020). Başlık. Yayıncı.');

    const [docx] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-docx').click()]);
    expect(docx.suggestedFilename()).toBe('kaynakca.docx');
    const buf = readFileSync((await docx.path())!);
    expect(buf.subarray(0, 2).toString()).toBe('PK');
    expect(buf.length).toBeGreaterThan(2000);

    const [txt] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-txt').click()]);
    expect(txt.suggestedFilename()).toBe('kaynakca.txt');
    const text = readFileSync((await txt.path())!, 'utf8');
    expect(text.indexOf('Çelik')).toBeLessThan(text.indexOf('Yılmaz'));

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('makale ve iki yazar APA / Chicago', async ({ page }) => {
    await page.goto('/kaynakca-olustur/');
    await page.locator('#type').selectOption('article');
    await page.locator('#authors .au-last').first().fill('Kaya');
    await page.locator('#authors .au-first').first().fill('Mehmet');
    await page.locator('#add-author').click();
    await page.locator('#authors .au-last').nth(1).fill('Demir');
    await page.locator('#authors .au-first').nth(1).fill('Ayşe');
    await page.locator('#f-year').fill('2021');
    await page.locator('#f-title').fill('Bir makale');
    await page.locator('#f-container').fill('Eğitim Dergisi');
    await page.locator('#f-volume').fill('12');
    await page.locator('#f-issue').fill('3');
    await page.locator('#f-pages').fill('45-67');
    await page.locator('#f-doi').fill('10.1234/abc');
    await page.locator('#add').click();
    await expect(page.locator('#bib .bib-text').first()).toHaveText('Kaya, M. ve Demir, A. (2021). Bir makale. Eğitim Dergisi, 12(3), 45–67. https://doi.org/10.1234/abc');
    await expect(page.locator('#bib .bib-cite').first()).toContainText('(Kaya ve Demir, 2021)');
    await page.locator('#style').selectOption('chicago');
    await expect(page.locator('#bib .bib-text').first()).toContainText('Kaya, Mehmet ve Ayşe Demir. 2021. “Bir makale.” Eğitim Dergisi 12 (3): 45–67.');
  });

  test('hatalı giriş: başlık yok, yıl hatalı', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/kaynakca-olustur/');
    await page.locator('#add').click();
    await expect(page.locator('#error')).toContainText('Başlığı girin');
    await expect(page.locator('#list-wrap')).toBeHidden();
    await page.locator('#f-title').fill('Deneme');
    await page.locator('#f-year').fill('20x0');
    await page.locator('#add').click();
    await expect(page.locator('#error')).toContainText('dört haneli');
    await page.locator('#type').selectOption('article');
    await page.locator('#f-year').fill('2020');
    await page.locator('#add').click();
    await expect(page.locator('#error')).toContainText('Dergi adı');
    await expect(page.locator('#dl-docx')).toBeDisabled();
    expect(external).toEqual([]);
  });
});
