import { test, expect } from '@playwright/test';

const pages = ['/', '/resimden-pdfe/', '/pdf-birlestir/', '/pdf-bol/', '/pdfden-resme/', '/pdf-kucult/', '/pdfden-worde/', '/wordden-pdfe/', '/resim-kucult/', '/zip/', '/qr-kod/', '/sifre-uret/', '/metin-araclari/', '/biyometrik-fotograf/', '/resim-boyutlandir/', '/resim-donustur/', '/resimden-yaziya/', '/pdf-imzala/', '/pdf-sayfa-duzenle/', '/pdf-sayfa-numarasi/', '/pdf-filigran/', '/sayi-yaziya-cevir/', '/kdv-hesapla/', '/qr-kod-oku/', '/indir/'];

for (const path of pages) {
  test(`mobilde yatay kaydırma yok: ${path}`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('h1')).toBeVisible();
  });
}

test('dropzone klavyeyle erişilebilir', async ({ page }) => {
  await page.goto('/pdf-birlestir/');
  const drop = page.locator('#drop');
  await drop.focus();
  await expect(drop).toBeFocused();
  await expect(drop).toHaveAttribute('role', 'button');
});
