import { test, expect } from '@playwright/test';

const pages = ['/', '/resimden-pdfe/', '/pdf-birlestir/', '/pdf-bol/', '/pdfden-resme/', '/pdf-kucult/', '/pdfden-worde/', '/wordden-pdfe/', '/resim-kucult/', '/zip/', '/qr-kod/', '/sifre-uret/', '/metin-araclari/', '/biyometrik-fotograf/', '/resim-boyutlandir/', '/resim-donustur/', '/resimden-yaziya/', '/pdf-imzala/', '/pdf-sayfa-duzenle/', '/pdf-sayfa-numarasi/', '/pdf-filigran/', '/sayi-yaziya-cevir/', '/kdv-hesapla/', '/qr-kod-oku/', '/indir/', '/belge-tarayici/', '/cekilis/', '/csv-excel/', '/ekran-kaydedici/', '/favicon-olustur/', '/gif-olustur/', '/iban-dogrula/', '/kidem-tazminati/', '/pdf-karart/', '/pdf-metin-cikar/', '/pdf-sifre-ekle/', '/pdf-sifre-kaldir/', '/svg-png/', '/tc-kimlik-dogrula/', '/barkod-olustur/', '/brut-net-maas/', '/kamera-test/', '/metin-karsilastir/', '/metinden-pdf/', '/pdf-dondur/', '/pdf-gri-tonlama/', '/pdf-kirp/', '/resim-birlestir/', '/resme-yazi-ekle/', '/ses-kaydedici/', '/tarih-farki/', '/yas-hesapla/', '/yuzde-hesapla/', '/zam-orani-hesapla/', '/not-ortalamasi/', '/birim-donustur/', '/dosya-hash/', '/exif-temizle/', '/hicri-miladi/', '/json-bicimlendir/', '/kredi-hesapla/', '/markdown-onizleme/', '/mesai-hesapla/', '/pdf-ac/', '/pdf-meta-temizle/', '/rastgele-sayi/', '/renk-secici/', '/resim-dondur/', '/roma-rakami/', '/yillik-izin/', '/zamanlayici/', '/base64-donustur/', '/cv-olustur/', '/dilekce-olustur/', '/imza-olustur/', '/pdf-form-doldur/', '/plaka-kodu/', '/qr-wifi/', '/regex-test/', '/resim-bulaniklastir/', '/ses-kirp/', '/sifre-guc-test/', '/takvim-olustur/', '/url-kodla/', '/vergi-no-dogrula/', '/whatsapp-link/', '/yazdirilabilir-kagit/', '/rehber/e-devlet-pdf-boyutu/', '/rehber/instagram-cekilis-nasil-yapilir/', '/rehber/kucuk-isletme-dijital-araclar/', '/rehber/maas-ve-tazminat-hesaplari-2026/', '/rehber/osym-fotograf-boyutu/', '/rehber/pdf-sifreleme-ve-gizlilik/', '/rehber/taranmis-belgeyi-pdf-yapma/', '/rehber/tez-rapor-pdf-hazirlama/', '/rehber/vize-fotografi-olculeri/', '/rehber/webp-jpg-cevirme/', '/css-gradient/', '/csv-json-donustur/', '/damga-vergisi-hesapla/', '/fiyat-hesapla/', '/grafik-olustur/', '/hesap-makinesi/', '/kelime-bulutu/', '/kira-artis-hesapla/', '/lgs-puan-hesapla/', '/lorem-ipsum/', '/meta-etiket-olustur/', '/sayi-tabani-donustur/', '/sosyal-medya-gorsel/', '/tapu-harci-hesapla/', '/yazi-stili/', '/yks-puan-hesapla/'];

for (const path of pages) {
  test(`mobilde yatay kaydırma yok: ${path}`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('h1').first()).toBeVisible();
  });
}

test('dropzone klavyeyle erişilebilir', async ({ page }) => {
  await page.goto('/pdf-birlestir/');
  const drop = page.locator('#drop');
  await drop.focus();
  await expect(drop).toBeFocused();
  await expect(drop).toHaveAttribute('role', 'button');
});
