import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const params = JSON.parse(readFileSync('web/harc-hesapla/parametreler.json', 'utf8'));
const tl = (n: number) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' TL';

test.describe('Harç Hesaplama', () => {
  test('tür seç → toplam = harç + değerli kağıt (parametreden); çarpım; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/harc-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#cat option')).toHaveCount(params.kategoriler.length);
    const cat = params.kategoriler[0];
    const opt = cat.secenekler[1];
    await page.locator('#cat').selectOption(cat.id);
    await page.locator('#opt').selectOption(opt.id);
    await page.locator('#calc').click();
    await expect(page.locator('#r-harc')).toHaveText(tl(opt.harc));
    await expect(page.locator('#r-dk')).toHaveText(tl(opt.degerli_kagit));
    await expect(page.locator('#r-person')).toHaveText(tl(opt.harc + opt.degerli_kagit));
    await expect(page.locator('#r-total')).toHaveText(tl(opt.harc + opt.degerli_kagit));
    await expect(page.locator('#r-note')).toContainText('yaklaşık');
    await page.locator('#qty').fill('3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText(tl((opt.harc + opt.degerli_kagit) * 3));
    // başka kategori
    const c2 = params.kategoriler[2];
    await page.locator('#cat').selectOption(c2.id);
    await page.locator('#qty').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-person')).toHaveText(tl(c2.secenekler[0].harc + c2.secenekler[0].degerli_kagit));
    expect(external).toEqual([]);
    noErrors();
  });

  test('hatalı kişi sayısı Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/harc-hesapla/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#cat option').first()).toBeAttached();
    await page.locator('#qty').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Geçerli bir sayı girin');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#qty').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('1 ile');
  });
});
