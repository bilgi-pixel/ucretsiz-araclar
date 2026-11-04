import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/beton-hesapla/';
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği ve parametreler yüklenmeden form gönderilmesin
}
async function slab(page: Page, w: string, l: string, t: string) {
  await page.locator('#f-mode').selectOption('doseme');
  await page.locator('#f-slab-w').fill(w);
  await page.locator('#f-slab-l').fill(l);
  await page.locator('#f-slab-t').fill(t);
}

test.describe('Beton Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD, yaklaşık uyarısı', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent())!.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="beton-hesapla-${s}"]`)).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    // reklam A araç kutusunun altında; hiçbir reklam araç kutusunun içinde değil
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="beton-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    // parametre tarihi ve görünür yaklaşık uyarısı
    await expect(page.locator('#params-line')).toContainText('tarihinde güncellendi');
    await expect(page.locator('#approx-note')).toBeVisible();
    await expect(page.locator('#approx-note')).toContainText('laboratuvar karışım hesabı');
    // iç bağlantılar ve gizlilik rozeti
    await expect(page.locator('.ba-content a[href="../boya-fayans-hesapla/"]').first()).toBeVisible();
    await expect(page.locator('.ba-content a[href="../metrekare-hesapla/"]').first()).toBeVisible();
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
  });

  test('döşeme 5 × 4 × 0,15 m = 3,000 m³; %5 fire 3,150 m³; 1 mikser; malzeme tablosu', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await slab(page, '5', '4', '0,15');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-net')).toHaveText('3,000 m³');
    await expect(page.locator('#r-fire')).toHaveText('0,150 m³ (%5)');
    await expect(page.locator('#r-total')).toHaveText('3,150 m³');
    await expect(page.locator('#r-head')).toContainText('3,150 m³');
    await expect(page.locator('#r-class')).toHaveText('C25/30');
    await expect(page.locator('#r-mixer')).toHaveText('1 mikser (8 m³ kapasiteli)');
    await expect(page.locator('#r-cost')).toHaveText('Birim fiyat girilmedi');
    // C25: 340 kg/m³ × 3,15 = 1.071 kg → 22 torba; su 185 × 3,15 = 583 litre
    await expect(page.locator('#m-cement')).toHaveText('1.071 kg');
    await expect(page.locator('#m-bags')).toHaveText('22 torba');
    await expect(page.locator('#m-water')).toHaveText('583 litre');
    await expect(page.locator('#m-sand')).toHaveText(/ton$/);
    await expect(page.locator('#m-sand-v')).toHaveText(/m³$/);
    await expect(page.locator('#m-gravel')).toHaveText(/ton$/);
    await expect(page.locator('#warn')).toBeHidden();
    await expect(page.locator('#r-class-note')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('kolonlar ve merdiven: silindir 0,377 m³, dikdörtgen 1,800 m³ (m ve cm), merdiven 0,729 m³', async ({ page }) => {
    await open(page);
    await page.locator('#f-fire').fill('0');
    await page.locator('#f-mode').selectOption('silindir');
    await page.locator('#f-cyl-d').fill('0,4');
    await page.locator('#f-cyl-h').fill('3');
    await page.locator('#f-cyl-n').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('0,377 m³');

    await page.locator('#f-mode').selectOption('kolon');
    await page.locator('#f-col-a').fill('0,3');
    await page.locator('#f-col-b').fill('0,5');
    await page.locator('#f-col-h').fill('3');
    await page.locator('#f-col-n').fill('4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('1,800 m³');

    // Aynı kolon santimetreyle
    await page.locator('#f-unit').selectOption('cm');
    await expect(page.locator('label[for="f-col-a"]')).toContainText('(cm)');
    await page.locator('#f-col-a').fill('30');
    await page.locator('#f-col-b').fill('50');
    await page.locator('#f-col-h').fill('300');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('1,800 m³');
    await expect(page.locator('#warn')).toBeHidden();

    // Merdiven: 10 basamak, rıht 17 cm, basamak 28 cm, en 100 cm, plak 15 cm
    await page.locator('#f-mode').selectOption('merdiven');
    await page.locator('#f-st-n').fill('10');
    await page.locator('#f-st-r').fill('17');
    await page.locator('#f-st-t').fill('28');
    await page.locator('#f-st-w').fill('100');
    await page.locator('#f-st-k').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('0,729 m³');
  });

  test('mikser yukarı yuvarlanır (9 m³ → 2 mikser), birim fiyatla maliyet ve büyük sayı biçimi', async ({ page }) => {
    await open(page);
    await slab(page, '10', '6', '0,15');
    await page.locator('#f-fire').fill('0');
    await page.locator('#f-price').fill('2.500');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('9,000 m³');
    await expect(page.locator('#r-mixer')).toHaveText('2 mikser (8 m³ kapasiteli)');
    await expect(page.locator('#r-cost')).toHaveText('22.500,00 TL');
    // 10 m³'lük mikserle tek mikser
    await page.locator('#f-mixer').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#r-mixer')).toHaveText('1 mikser (10 m³ kapasiteli)');
    // çok büyük sayılarda tr-TR biçimi
    await slab(page, '1000', '1000', '1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-net')).toHaveText('1.000.000,000 m³');
  });

  test('çoklu eleman listesi: ekle, toplam, sil', async ({ page }) => {
    await open(page);
    await slab(page, '5', '4', '0,15');
    await page.locator('#add').click();
    await expect(page.locator('#items li')).toHaveCount(1);
    await page.locator('#f-mode').selectOption('kolon');
    await page.locator('#f-col-a').fill('0,3');
    await page.locator('#f-col-b').fill('0,5');
    await page.locator('#f-col-h').fill('3');
    await page.locator('#f-col-n').fill('4');
    await page.locator('#add').click();
    await expect(page.locator('#items li')).toHaveCount(2);
    await expect(page.locator('#list-total')).toHaveText('4,800 m³');
    await expect(page.locator('#r-net')).toHaveText('4,800 m³');
    await expect(page.locator('#r-total')).toHaveText('5,040 m³');
    await expect(page.locator('#r-used')).toHaveText('Listedeki 2 elemanın toplamı');
    // ilk elemanı sil
    await page.locator('#items li').first().getByRole('button', { name: /sil/i }).click();
    await expect(page.locator('#items li')).toHaveCount(1);
    await expect(page.locator('#r-net')).toHaveText('1,800 m³');
    await page.locator('#items li').first().getByRole('button', { name: /sil/i }).click();
    await expect(page.locator('#list-wrap')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; sonuç gizlenir', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En boş');
    await expect(page.locator('#error')).toContainText('metre cinsinden');
    await expect(page.locator('#result')).toBeHidden();

    await slab(page, '-5', '4', '0,15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('sıfırdan büyük olmalı');

    await slab(page, '5', '0', '0,15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Boy sıfırdan büyük olmalı');

    await slab(page, '5', 'abc', '0,15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('okunamadı');

    await slab(page, '5', '4', '0,15');
    await page.locator('#f-fire').fill('40');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('%0 ile %30 arasında');
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('#f-fire').fill('5');
    await page.locator('#f-mixer').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Mikser kapasitesi');

    await page.locator('#f-mixer').fill('8');
    await page.locator('#f-mode').selectOption('kolon');
    await page.locator('#f-col-a').fill('0,3');
    await page.locator('#f-col-b').fill('0,5');
    await page.locator('#f-col-h').fill('3');
    await page.locator('#f-col-n').fill('2,5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('tam sayı');
    await expect(page.locator('#result')).toBeHidden();

    // düzeltilince hata kaybolur ve sonuç gelir
    await page.locator('#f-col-n').fill('2');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-net')).toHaveText('0,900 m³');
    noErrors();
  });

  test('cm–m karışıklığı uyarısı: m seçiliyken kalınlık 15 → "çok büyük, cm mi?"', async ({ page }) => {
    await open(page);
    await slab(page, '5', '4', '15');
    await page.locator('#calc').click();
    await expect(page.locator('#warn')).toBeVisible();
    await expect(page.locator('#warn')).toContainText('çok büyük, cm mi');
    await expect(page.locator('#r-net')).toHaveText('300,000 m³');
    // cm seçilip doğru girilince uyarı kalkar
    await page.locator('#f-unit').selectOption('cm');
    await slab(page, '500', '400', '15');
    await page.locator('#calc').click();
    await expect(page.locator('#warn')).toBeHidden();
    await expect(page.locator('#r-net')).toHaveText('3,000 m³');
    // cm seçiliyken 0,15 → metre mi uyarısı
    await page.locator('#f-slab-t').fill('0,15');
    await page.locator('#calc').click();
    await expect(page.locator('#warn')).toContainText('metre mi');
  });

  test('klavye ile hesap, C16 yönetmelik notu, kopyala ve yazdır', async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__copied = '';
      (window as any).__printed = false;
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (t: string) => { (window as any).__copied = t; } } });
      window.print = () => { (window as any).__printed = true; };
    });
    await open(page);
    await page.locator('#f-class').selectOption('C16');
    await page.locator('#f-slab-w').focus();
    await page.keyboard.type('5');
    await page.keyboard.press('Tab');
    await page.keyboard.type('4');
    await page.keyboard.press('Tab');
    await page.keyboard.type('0,15');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-class')).toHaveText('C16/20');
    await expect(page.locator('#r-class-note')).toBeVisible();
    await expect(page.locator('#r-class-note')).toContainText('C25');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const copied = await page.evaluate(() => (window as any).__copied as string);
    expect(copied).toContain('3,150 m³');
    expect(copied).toContain('C16/20');
    expect(copied).toContain('yaklaşık');
    await page.locator('#print').click();
    expect(await page.evaluate(() => (window as any).__printed)).toBe(true);
    // Temizle her şeyi sıfırlar
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#f-slab-w')).toHaveValue('');
  });

  test('360px genişlikte yatay taşma yok (liste ve büyük sonuçla)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#f-mode').selectOption('merdiven');
    await page.locator('#f-st-n').fill('12');
    await page.locator('#f-st-r').fill('0,17');
    await page.locator('#f-st-t').fill('0,28');
    await page.locator('#f-st-w').fill('1,2');
    await page.locator('#f-st-k').fill('0,15');
    await page.locator('#add').click();
    await slab(page, '123456', '98765', '12');
    await page.locator('#f-price').fill('123.456.789');
    await page.locator('#add').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#warn')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('uç durumlar: çok küçük hacim "-0 mikser" vermez, cm seçiliyken metre değeri uyarılır, "-0" fire', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    // 10 × 10 × 1 cm = 0,0001 m³: en az 1 mikser ve 1 torba, eksi sıfır yok, küçük hacim uyarısı
    await page.locator('#f-unit').selectOption('cm');
    await slab(page, '10', '10', '1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-mixer')).toHaveText('1 mikser (8 m³ kapasiteli)');
    await expect(page.locator('#m-bags')).toHaveText('1 torba');
    await expect(page.locator('#result')).not.toContainText('-0');
    await expect(page.locator('#warn')).toContainText('1 litreden');
    // cm seçiliyken en/boy metre yazılırsa (5 × 4 × 15) uyarı çıkar
    await slab(page, '5', '4', '15');
    await page.locator('#calc').click();
    await expect(page.locator('#warn')).toContainText('metre mi');
    await expect(page.locator('#warn')).toContainText('En 5 cm görünüyor');
    // 8,000 m³ tam bir mikser doldurur
    await page.locator('#f-unit').selectOption('m');
    await slab(page, '4', '4', '0,5');
    await page.locator('#f-fire').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#r-total')).toHaveText('8,000 m³');
    await expect(page.locator('#r-mixer')).toHaveText('1 mikser (8 m³ kapasiteli)');
    await expect(page.locator('#warn')).toBeHidden();
    // "-0" fire ve fiyat eksi sıfır olarak gösterilmez
    await page.locator('#f-fire').fill('-0');
    await page.locator('#f-price').fill('-0');
    await page.locator('#calc').click();
    await expect(page.locator('#r-fire')).toHaveText('0,000 m³ (%0)');
    await expect(page.locator('#r-cost')).toHaveText('0,00 TL');
    noErrors();
  });
});
