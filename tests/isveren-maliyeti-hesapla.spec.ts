import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));
const norm = (s: string | null) => (s || '').replace(/\s+/g, ' ').trim();

// 2026 resmî değerleri: 5510 md. 81 ve 82 (7566 sayılı Kanun), 4447 md. 49, SGK Genelgesi 2026/2,
// 5510 geçici md. 112 (7573 sayılı Kanun). İşveren SGK %21,75 + işsizlik %2; teşvik imalat dışı 2, imalat 5 puan;
// prim tavanı 9 × 33.030 = 297.270 TL; asgari ücret desteği günlük 42,33 TL (30 gün = 1.269,90 TL).
test.describe('İşveren Maliyeti Hesaplama', () => {
  test('33.030 brüt: SGK işveren %21,75 = 7.184,03, işsizlik 660,60, toplam 40.874,63, net ~28.075, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/isveren-maliyeti-hesapla/');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('33.030');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-sgk-label')).toHaveText('SGK işveren payı (%21,75)');
    await expect(page.locator('#r-sgk')).toHaveText('7.184,03 ₺');
    await expect(page.locator('#r-issizlik')).toHaveText('660,60 ₺');
    await expect(page.locator('#r-toplam')).toHaveText('40.874,63 ₺');
    expect(Math.abs(num(await page.locator('#r-net').textContent()) - 28075.5)).toBeLessThan(1);
    await expect(page.locator('#r-oran')).toHaveText('1,46 ₺');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    await expect(page.locator('#r-yillik')).toHaveText('490.495,56 ₺');
    await expect(page.locator('#r-cap-note')).toBeHidden();
    await expect(page.locator('#r-floor-note')).toBeHidden();
    // Kaynak kutusu parametre dosyasındaki doğrulanmış değerleri gösterir; "yaklaşık" notu yok.
    await expect(page.locator('#p-oran')).toHaveText('%21,75');
    await expect(page.locator('#p-asgari')).toHaveText('33.030,00 ₺');
    await expect(page.locator('#p-tavan')).toHaveText('297.270,00 ₺ (9 kat)');
    await expect(page.locator('#p-destek')).toHaveText('42,33 ₺');
    await expect(page.locator('#p-approx')).toBeHidden();
    // Çubuk: üç parça toplamı ~%100
    const w = await page.evaluate(() => ['bar-net', 'bar-worker', 'bar-employer'].map((i) => parseFloat((document.getElementById(i) as HTMLElement).style.width)));
    expect(Math.abs(w[0] + w[1] + w[2] - 100)).toBeLessThan(0.1);
    expect(external).toEqual([]);
    noErrors();
  });

  test('Hazine teşviki sektöre göre (imalat dışı 2, imalat 5 puan) ve asgari ücret desteği toplam maliyeti düşürür', async ({ page }) => {
    await page.goto('/isveren-maliyeti-hesapla/');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('33.030');
    await expect(page.locator('#sector-wrap')).toBeHidden();
    await page.locator('#f-discount').check();
    await expect(page.locator('#sector-wrap')).toBeVisible();
    await expect(page.locator('#f-sector option')).toHaveText(['İmalat dışı: 2 puan (%19,75)', 'İmalat: 5 puan (%16,75)']);
    // Varsayılan: imalat dışı özel sektör, 2 puan → %19,75
    await expect(page.locator('#r-sgk-label')).toHaveText('SGK işveren payı (%19,75, 2 puan teşvikli)');
    await expect(page.locator('#r-sgk')).toHaveText('6.523,43 ₺');
    await expect(page.locator('#r-toplam')).toHaveText('40.214,03 ₺');
    // İmalat, 5 puan → %16,75
    await page.locator('#f-sector').selectOption('imalat');
    await expect(page.locator('#r-sgk-label')).toHaveText('SGK işveren payı (%16,75, 5 puan teşvikli)');
    await expect(page.locator('#r-sgk')).toHaveText('5.532,53 ₺');
    await expect(page.locator('#r-toplam')).toHaveText('39.223,13 ₺');
    // Asgari ücret desteği: boş bırakılırsa 30 gün × 42,33 = 1.269,90 TL
    await page.locator('#f-support').check();
    await expect(page.locator('#r-destek-wrap')).toBeVisible();
    await expect(page.locator('#r-destek')).toHaveText('− 1.269,90 ₺');
    await expect(page.locator('#r-toplam')).toHaveText('37.953,23 ₺');
    await expect(page.locator('#f-support-amount')).toHaveAttribute('placeholder', 'örn. 1.269,90');
    await page.locator('#f-support-amount').fill('1.000');
    await expect(page.locator('#r-toplam')).toHaveText('38.223,13 ₺');
    // Teşvik kapatılınca %21,75'e döner, sektör seçimi gizlenir.
    await page.locator('#f-discount').uncheck();
    await expect(page.locator('#sector-wrap')).toBeHidden();
    await expect(page.locator('#r-toplam')).toHaveText('39.874,63 ₺');
  });

  test('prim tavanı 297.270 TL (9 kat) ve alt sınır 33.030 TL uygulanır, sonuçta belirtilir', async ({ page }) => {
    await page.goto('/isveren-maliyeti-hesapla/');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('400.000');
    await expect(page.locator('#r-sgk')).toHaveText('64.656,23 ₺');
    await expect(page.locator('#r-issizlik')).toHaveText('5.945,40 ₺');
    await expect(page.locator('#r-toplam')).toHaveText('470.601,63 ₺');
    await expect(page.locator('#r-cap-note')).toBeVisible();
    await expect(page.locator('#r-cap-note')).toContainText('297.270,00 ₺');
    // Tavanın tam üstü: prim yine 297.270 TL üzerinden, not görünmez (aşmıyor).
    await page.locator('#f-amount').fill('297.270');
    await expect(page.locator('#r-toplam')).toHaveText('367.871,63 ₺');
    await expect(page.locator('#r-cap-note')).toBeHidden();
    await page.locator('#f-amount').fill('30.000');
    await expect(page.locator('#r-floor-note')).toBeVisible();
    await expect(page.locator('#r-floor-note')).toContainText('33.030,00 ₺');
    await expect(page.locator('#r-cap-note')).toBeHidden();
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/isveren-maliyeti-hesapla/');
    await page.locator('#f-amount').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-amount').fill('-500');
    await expect(page.locator('#error')).toContainText('negatif');
    await page.locator('#f-amount').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#f-amount').fill('40000');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });

  test('parametreler, sayfa metni, SSS ve JSON-LD 2026 resmî değerleriyle tutarlı', async ({ page }) => {
    await page.goto('/isveren-maliyeti-hesapla/');
    const p = await (await page.request.get('/isveren-maliyeti-hesapla/parametreler.json')).json();
    expect(p.sgk_isveren_orani).toBe(21.75);
    expect(p.sgk_isveren_bilesenleri.reduce((a: number, b: { yuzde: number }) => a + b.yuzde, 0)).toBe(21.75);
    expect(p.issizlik_isveren_orani).toBe(2);
    expect(p.sgk_isci_orani).toBe(14);
    expect(p.issizlik_isci_orani).toBe(1);
    expect(p.sgk_tavan_katsayisi).toBe(9);
    expect(p.asgari_ucret_brut * p.sgk_tavan_katsayisi).toBe(297270);
    expect(p.prim_ust_sinir_aylik).toBe(297270);
    expect(p.prim_alt_sinir_aylik).toBe(33030);
    expect(p.sgk_isveren_indirimleri.map((d: { id: string; puan: number }) => [d.id, d.puan])).toEqual([['diger', 2], ['imalat', 5]]);
    expect(p.asgari_ucret_destegi_gunluk).toBe(42.33);
    expect(Math.round(p.asgari_ucret_destegi_gunluk * 30 * 100) / 100).toBe(p.asgari_ucret_destegi);
    expect(p.yaklasik).toBe(false);

    const text = await page.locator('main').innerText();
    for (const v of ['%21,75', '%19,75', '%16,75', '%23,75', '297.270', '42,33', '1.269,90', '40.874,63', '40.214,03', '39.223,13']) expect(text, v).toContain(v);
    for (const stale of ['40.461,75', '38.810,25', '1.270,38', '%20,5', '%15,5', '247.725', 'yaklaşık değerdir']) expect(text, stale).not.toContain(stale);
    // İnce içerik olmasın: araç dışı metin en az 800 kelime.
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);

    // JSON-LD geçerli ve FAQPage görünen SSS ile birebir aynı.
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const ld = blocks.map((b) => JSON.parse(b));
    const app = ld.find((x) => x['@type'] === 'SoftwareApplication');
    expect(app.description).toContain('%21,75');
    expect(app.description).toContain('297.270');
    const faq = ld.find((x) => x['@type'] === 'FAQPage');
    const visible = await page.$$eval('.ba-faq details', (ds) => ds.map((d) => [d.querySelector('summary')!.textContent, d.querySelector('p')!.textContent]));
    expect(visible.length).toBeGreaterThanOrEqual(6);
    expect(faq.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => [norm(q.name), norm(q.acceptedAnswer.text)]))
      .toEqual(visible.map(([q, a]) => [norm(q), norm(a)]));
    const ldText = blocks.join(' ');
    for (const stale of ['20,5', '15,5', '38.810,25', '40.461,75', '1.270,38']) expect(ldText, stale).not.toContain(stale);
  });
});
