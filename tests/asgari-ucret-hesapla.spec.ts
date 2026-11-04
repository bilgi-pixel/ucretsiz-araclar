import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/asgari-ucret-hesapla/';

test.describe('Asgari Ücret Hesaplama 2026', () => {
  test('açılışta net 28.075,50 TL, brüt 33.030 TL, SGK ve işsizlik kesintisi; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL);
    await expect(page.locator('#param-date')).not.toHaveText('…');
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-active/);
    await expect(page.locator('#r-net')).toHaveText('28.075,50 TL');
    await expect(page.locator('#r-brut')).toHaveText('33.030,00 TL');
    await expect(page.locator('#r-sgk')).toHaveText('-4.624,20 TL');
    await expect(page.locator('#r-issizlik')).toHaveText('-330,30 TL');
    await expect(page.locator('#r-matrah')).toHaveText('28.075,50 TL');
    await expect(page.locator('#r-gv')).toContainText('istisna');
    await expect(page.locator('#r-damga')).toContainText('istisna');
    await expect(page.locator('#r-yillik')).toHaveText('336.906,00 TL');
    expect(external).toEqual([]);
    noErrors();
  });

  test('işveren maliyeti 2026: SGK %21,75; imalat dışı 2 puan varsayılan, imalat 5 puan, indirimsiz', async ({ page }) => {
    await page.goto(URL);
    // Varsayılan: imalat dışı özel sektör, 2 puan → işveren SGK %19,75
    await expect(page.locator('#tesvik')).toHaveValue('diger');
    await expect(page.locator('#r-isv-oran')).toHaveText('%19,75: %21,75 − 2 puan');
    await expect(page.locator('#r-isv-sgk')).toHaveText('6.523,43 TL');
    await expect(page.locator('#r-isv-iss')).toHaveText('660,60 TL');
    await expect(page.locator('#r-maliyet')).toHaveText('40.214,03 TL');
    await expect(page.locator('#destek-rows')).toBeHidden();
    // İmalat sektörü, 5 puan → %16,75
    await page.locator('#tesvik').selectOption('imalat');
    await page.locator('#calc').click();
    await expect(page.locator('#r-isv-oran')).toHaveText('%16,75: %21,75 − 5 puan');
    await expect(page.locator('#r-isv-sgk')).toHaveText('5.532,53 TL');
    await expect(page.locator('#r-isv-iss')).toHaveText('660,60 TL');
    await expect(page.locator('#r-maliyet')).toHaveText('39.223,13 TL');
    // İndirim yok → %21,75
    await page.locator('#tesvik').selectOption('yok');
    await page.locator('#calc').click();
    await expect(page.locator('#r-isv-oran')).toHaveText('%21,75');
    await expect(page.locator('#r-isv-sgk')).toHaveText('7.184,03 TL');
    await expect(page.locator('#r-maliyet')).toHaveText('40.874,63 TL');
    // İşçi tarafı teşvikten etkilenmez
    await expect(page.locator('#r-net')).toHaveText('28.075,50 TL');
  });

  test('asgari ücret desteği: günlük 42,33 TL, 30 günde 1.269,90 TL; 15 günde 634,95 TL', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#destek').check();
    await page.locator('#calc').click();
    await expect(page.locator('#destek-rows')).toBeVisible();
    await expect(page.locator('#r-destek-gun')).toHaveText('30 gün × 42,33 TL');
    await expect(page.locator('#r-destek')).toHaveText('-1.269,90 TL');
    await expect(page.locator('#r-maliyet')).toHaveText('40.214,03 TL');
    await expect(page.locator('#r-maliyet-destek')).toHaveText('38.944,13 TL');
    await page.locator('#tesvik').selectOption('imalat');
    await page.locator('#calc').click();
    await expect(page.locator('#r-maliyet-destek')).toHaveText('37.953,23 TL');
    await page.locator('#tesvik').selectOption('yok');
    await page.locator('#calc').click();
    await expect(page.locator('#r-maliyet-destek')).toHaveText('39.604,73 TL');
    await page.locator('#tesvik').selectOption('diger');
    await page.locator('#days').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#r-destek-gun')).toHaveText('15 gün × 42,33 TL');
    await expect(page.locator('#r-destek')).toHaveText('-634,95 TL');
    await expect(page.locator('#r-isv-sgk')).toHaveText('3.261,71 TL');
    await expect(page.locator('#r-maliyet')).toHaveText('20.107,01 TL');
    await expect(page.locator('#r-maliyet-destek')).toHaveText('19.472,06 TL');
    // Sıfırlayınca destek kapanır, varsayılan teşvik geri gelir
    await page.locator('#clear').click();
    await expect(page.locator('#destek-rows')).toBeHidden();
    await expect(page.locator('#tesvik')).toHaveValue('diger');
    await expect(page.locator('#r-maliyet')).toHaveText('40.214,03 TL');
  });

  test('parametreler 2026 resmî değerlerle uyumlu', async ({ request }) => {
    const res = await request.get(`${URL}parametreler.json`);
    expect(res.ok()).toBe(true);
    const p = await res.json();
    expect(p.asgari_ucret_brut).toBe(33030);
    expect(p.asgari_ucret_net).toBe(28075.5);
    expect(p.prime_esas_kazanc_alt_siniri).toBe(33030);
    expect(p.prime_esas_kazanc_ust_siniri).toBe(297270);
    expect(p.sgk_tavan_katsayisi).toBe(9);
    expect(p.prime_esas_kazanc_ust_siniri).toBe(p.prime_esas_kazanc_alt_siniri * p.sgk_tavan_katsayisi);
    expect(p.sgk_isci_orani).toBe(14);
    expect(p.issizlik_isci_orani).toBe(1);
    expect(p.sgk_isveren_orani).toBe(21.75);
    const d = p.sgk_isveren_oran_dokumu;
    expect(d.malullik_yaslilik_olum + d.genel_saglik + d.kisa_vadeli).toBe(21.75);
    expect(p.issizlik_isveren_orani).toBe(2);
    expect(p.sgk_isveren_tesvik_puanlari).toEqual({ yok: 0, diger: 2, imalat: 5 });
    expect(p.asgari_ucret_destegi_gunluk).toBe(42.33);
  });

  test('günlük ve saatlik ücret; 15 gün çalışma yarıya iner', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#r-gun-brut')).toHaveText('1.101,00 TL');
    await expect(page.locator('#r-gun-net')).toHaveText('935,85 TL');
    await expect(page.locator('#r-saat-brut')).toHaveText('146,80 TL');
    await expect(page.locator('#r-saat-net')).toHaveText('124,78 TL');
    await page.locator('#days').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#r-brut')).toHaveText('16.515,00 TL');
    await expect(page.locator('#r-net')).toHaveText('14.037,75 TL');
  });

  test('hatalı gün sayısı Türkçe hata verir; düzeltince sonuç döner', async ({ page }) => {
    await page.goto(URL);
    for (const bad of ['31', '0', 'abc', '12,5']) {
      await page.locator('#days').fill(bad);
      await page.locator('#calc').click();
      await expect(page.locator('#error')).toContainText('Çalışılan gün sayısı geçersiz');
      await expect(page.locator('#result')).toBeHidden();
    }
    await page.locator('#days').fill('30');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-net')).toHaveText('28.075,50 TL');
  });

  test('360px genişlikte yatay taşma yok; klavye ile gönderilir ve sıfırlanır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.locator('#days').focus();
    await page.keyboard.type('10');
    await page.keyboard.press('Enter');
    await expect(page.locator('#r-brut')).toHaveText('11.010,00 TL');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.locator('#clear').click();
    await expect(page.locator('#r-net')).toHaveText('28.075,50 TL');
  });

  test('3 reklam alanı, ≥900 kelime, SSS ≥7, JSON-LD, bilgilendirme notu', async ({ page }) => {
    await page.goto(URL);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['asgari-ucret-hesapla-a', 'asgari-ucret-hesapla-b', 'asgari-ucret-hesapla-c']);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const text = (await page.locator('article.ba-content').textContent()) || '';
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(900);
    // Metin 2026 resmî değerleriyle araçla aynı rakamları kullanır; eski oranlar kalmamalı
    for (const s of ['yüzde 21,75', 'yüzde 19,75', 'yüzde 16,75', '40.214,03 TL', '39.223,13 TL', '40.874,63 TL', '1.269,90 TL', '297.270 TL', '9 katı']) {
      expect(text).toContain(s);
    }
    for (const s of ['yüzde 20,5', 'yüzde 15,5', '38.810,25', '40.461,75', '5.119,65', '6.771,15', '247.725']) expect(text).not.toContain(s);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"FAQPage"'))).toBe(true);
    // SSS JSON-LD de aynı 2026 rakamlarını taşır
    const faqLd = ld.find((t) => t.includes('"FAQPage"')) || '';
    for (const s of ['yüzde 21,75', 'yüzde 19,75', 'yüzde 16,75', '40.214,03 TL', '39.223,13 TL', '40.874,63 TL', '1.269,90 TL', '297.270 TL']) expect(faqLd).toContain(s);
    for (const s of ['yüzde 20,5', 'yüzde 15,5', '38.810,25', '40.461,75', '247.725']) expect(faqLd).not.toContain(s);
    expect(ld.some((t) => t.includes('"SoftwareApplication"'))).toBe(true);
    await expect(page.locator('body')).toContainText('Bilgilendirme amaçlıdır');
  });
});
