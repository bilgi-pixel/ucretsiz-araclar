import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// "28.075,50 ₺" -> 28075.5
const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('Memur Maaşı Hesaplama (tahmini)', () => {
  test('uyarılar, seçim → pozitif net, 12 satırlı tablo, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/memur-maas-hesapla/');
    await expect(page.locator('h1')).toContainText('(tahmini)');
    await expect(page.locator('#uyari')).toContainText('resmî bordro yerine geçmez');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-derece').selectOption('9');
    await page.locator('#f-kademe').selectOption('1');
    await expect(page.locator('#result')).toBeVisible();
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(0);
    await expect(page.locator('#result')).toContainText('Sendika');
    await expect(page.locator('#result')).toContainText('dil tazminatı');
    await expect(page.locator('#result')).toContainText('Memurlardan işsizlik sigortası primi kesilmez');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    expect(external).toEqual([]);
    noErrors();
  });

  test('derece yükselince (9 → 1) net maaş artar; gösterge aylığı formüle uyar', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await page.locator('#f-derece').selectOption('9');
    await page.locator('#f-kademe').selectOption('1');
    const net9 = num(await page.locator('#r-net').textContent());
    const ka = num(await page.locator('#f-ka').inputValue());
    const g9 = num(await page.locator('#f-gosterge').inputValue());
    expect(Math.abs(num(await page.locator('#r-gosterge').textContent()) - g9 * ka)).toBeLessThan(1);
    await page.locator('#f-derece').selectOption('1');
    await page.locator('#f-kademe').selectOption('4');
    expect(num(await page.locator('#f-gosterge').inputValue())).toBe(1500);
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(net9);
    // Aile yardımı brütü artırır
    const brut = num(await page.locator('#r-brut').textContent());
    await page.locator('#f-es').check();
    expect(num(await page.locator('#r-brut').textContent())).toBeGreaterThan(brut);
  });

  test('4/c kesintileri resmî oranlarla: kesenek %9, GSS %5, kurum payı MYÖ %12 + GSS %7,5', async ({ page }) => {
    // Temmuz–Aralık 2026, 9/1, genel idare lisans (ek gösterge 2200), istisna açık:
    // matrah = 620 × 1,575512 + 2200 × 1,575512 + 1000 × 25,794915 = 976,82 + 3.466,13 + 25.794,92 = 30.237,87 TL
    await page.goto('/memur-maas-hesapla/');
    await expect(page.locator('#f-donem')).toHaveValue('temmuz_aralik');
    await expect(page.locator('#f-ka')).toHaveValue('1,575512');
    await expect(page.locator('#f-gosterge')).toHaveValue('620');
    await expect(page.locator('#r-gosterge')).toHaveText('976,82 ₺');
    await expect(page.locator('#r-ekgosterge')).toHaveText('3.466,13 ₺');
    await expect(page.locator('#r-taban')).toHaveText('25.794,92 ₺');
    await expect(page.locator('#r-kesenek')).toHaveText('2.721,41 ₺'); // 30.237,87 × %9
    await expect(page.locator('#r-gss')).toHaveText('1.511,89 ₺'); // 30.237,87 × %5
    await expect(page.locator('#r-kurum')).toHaveText('5.896,38 ₺'); // 30.237,87 × (%12 + %7,5)
    await expect(page.locator('#r-kurum')).toBeVisible();
    await expect(page.locator('#result')).toContainText('MYÖ %12 + GSS %7,5');
    await expect(page.locator('#r-brut')).toHaveText('34.736,18 ₺');
    await expect(page.locator('#r-gv')).toHaveText('364,11 ₺');
    await expect(page.locator('#r-damga')).toHaveText('12,95 ₺');
    await expect(page.locator('#r-net')).toHaveText('30.125,82 ₺');
    await expect(page.locator('#tavan-not')).toBeHidden();
  });

  test('5434 rejimi: kesenek %16, GSS kişi payı kesilmez, kurum payı satırı gizlenir', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await expect(page.locator('#r-net')).toHaveText('30.125,82 ₺');
    await page.locator('#f-eski').check();
    await expect(page.locator('#r-kesenek')).toHaveText('4.838,06 ₺'); // 30.237,87 × %16
    await expect(page.locator('#r-gss')).toHaveText('0,00 ₺'); // GSS primini (%12) kurum öder (5510 geçici md. 4)
    await expect(page.locator('#r-kurum')).toBeHidden();
    // Yalnızca değer değil, etiketli satırın tamamı gizlenmeli.
    await expect(page.locator('.bn-row', { has: page.locator('#r-kurum') })).toBeHidden();
    await expect(page.locator('#r-net')).toHaveText('29.611,78 ₺');
    await page.locator('#f-eski').uncheck();
    await expect(page.locator('#r-gss')).toHaveText('1.511,89 ₺');
    await expect(page.locator('#r-kurum')).toBeVisible();
    await expect(page.locator('#r-kurum')).toHaveText('5.896,38 ₺');
  });

  test('asgari ücret istisnası 2026: 33.030 TL brüt, 28.075,50 TL matrah', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await expect(page.locator('#r-gv')).toHaveText('364,11 ₺');
    const gvIst = num(await page.locator('#r-gv').textContent());
    const damgaIst = num(await page.locator('#r-damga').textContent());
    await page.locator('#f-istisna').uncheck();
    await expect(page.locator('#r-gv')).toHaveText('4.575,43 ₺');
    await expect(page.locator('#r-damga')).toHaveText('263,65 ₺');
    await expect(page.locator('#r-net')).toHaveText('25.663,80 ₺');
    // Ocak ayı istisnası: gelir vergisi 28.075,50 × %15 ≈ 4.211,33 TL; damga 33.030 × binde 7,59 = 250,70 TL
    const gv = num(await page.locator('#r-gv').textContent());
    const damga = num(await page.locator('#r-damga').textContent());
    expect(Math.abs((gv - gvIst) - 28075.5 * 0.15)).toBeLessThan(0.02);
    expect(Math.abs((damga - damgaIst) - 250.7)).toBeLessThan(0.01);
  });

  test('prime esas kazanç üst sınırı: aylık 297.270 TL (günlük 1.101 TL × 9 × 30)', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await page.locator('#f-ka').fill('1000');
    await expect(page.locator('#tavan-not')).toBeVisible();
    await expect(page.locator('#tavan-not')).toContainText('297.270,00 TL');
    await expect(page.locator('#r-kesenek')).toHaveText('26.754,30 ₺'); // 297.270 × %9
    await expect(page.locator('#r-gss')).toHaveText('14.863,50 ₺'); // 297.270 × %5
    await expect(page.locator('#r-kurum')).toHaveText('57.967,65 ₺'); // 297.270 × %19,5
    await page.locator('#f-ka').fill('1,575512');
    await expect(page.locator('#tavan-not')).toBeHidden();
    await expect(page.locator('#r-kesenek')).toHaveText('2.721,41 ₺');
  });

  test('Ocak–Haziran katsayıları yaklaşık: görünür not çıkar', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#donem-not')).toBeHidden();
    await page.locator('#f-donem').selectOption('ocak_haziran');
    await expect(page.locator('#f-ka')).toHaveValue('1,387871');
    await expect(page.locator('#donem-not')).toBeVisible();
    await expect(page.locator('#donem-not')).toContainText('Yaklaşık değer');
    await expect(page.locator('#r-gosterge')).toHaveText('860,48 ₺');
    await expect(page.locator('#r-net')).toHaveText('26.870,03 ₺');
    await page.locator('#f-donem').selectOption('temmuz_aralik');
    await expect(page.locator('#donem-not')).toBeHidden();
  });

  test('parametreler ve hesap çekirdeği resmî 2026 değerleriyle tutarlı; ek ders gecesi 150 gösterge', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    const r = await page.evaluate(`(async () => {
      const m = await import('/memur-maas-hesapla/calc.js');
      const p = await (await fetch('/memur-maas-hesapla/parametreler.json')).json();
      const d = p.donemler.temmuz_aralik;
      const input = { gosterge: 620, ekGosterge: 2200, aylikKatsayi: d.aylik_katsayi, tabanKatsayi: d.taban_aylik_katsayisi,
        yanOdemeKatsayi: d.yan_odeme_katsayisi, yanOdemePuani: 1000, ozelHizmetOrani: 90, es: false, cocuk: 0, cocuk06: 0, eski5434: false, istisna: true };
      const c = m.calcMemur(input, p);
      return {
        p: { kes: p.emekli_kesenegi_4c, gss: p.gss_orani, kes5434: p.emekli_kesenegi_5434, gss5434: p.gss_orani_5434,
          kurumMyo: p.kurum_myo_orani_4c, kurumGss: p.kurum_gss_orani_4c, altG: p.prim_alt_sinir_gunluk, altA: p.prim_alt_sinir_aylik,
          kat: p.prim_ust_sinir_katsayi, ustG: p.prim_ust_sinir_gunluk, ustA: p.prim_ust_sinir_aylik, asgari: p.asgari_ucret_brut,
          sgkIsci: p.asgari_sgk_isci_orani, issizlikIsci: p.asgari_issizlik_isci_orani, ohYaklasik: p.donemler.ocak_haziran.yaklasik },
        asgariMatrah: c.asgariMatrah,
        gunduz: m.ekDersUnit({}, d.aylik_katsayi, false),
        gece: m.ekDersUnit({}, d.aylik_katsayi, true),
        geceParam: m.ekDersUnit({ ek_ders_gostergesi: 140, ek_ders_gostergesi_gece: 150 }, d.aylik_katsayi, true),
        brut: m.ekDersBrut({ aylik_hafta_sayisi: 4 }, d.aylik_katsayi, 10, 4),
      };
    })()`) as any;
    expect(r.p).toEqual({ kes: 9, gss: 5, kes5434: 16, gss5434: 0, kurumMyo: 12, kurumGss: 7.5, altG: 1101, altA: 33030,
      kat: 9, ustG: 9909, ustA: 297270, asgari: 33030, sgkIsci: 14, issizlikIsci: 1, ohYaklasik: true });
    expect(r.p.altG * r.p.kat * 30).toBe(r.p.ustA);
    expect(r.asgariMatrah).toBe(28075.5); // net asgari ücret 28.075,50 TL
    // 657 md. 176: gündüz 140, gece / hafta sonu 150 gösterge × 1,575512 (yüzde 25 artış değil)
    expect(r.gunduz).toBe(220.57);
    expect(r.gece).toBe(236.33);
    expect(r.geceParam).toBe(236.33);
    expect(r.brut).toBe(12604.08); // 10 × 4 × 220,57 + 4 × 4 × 236,33
  });

  test('hatalı katsayı girişinde Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/memur-maas-hesapla/');
    await page.locator('#f-ka').fill('');
    await expect(page.locator('#error')).toContainText('boş bırakılamaz');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-ka').fill('-3');
    await expect(page.locator('#error')).toContainText('negatif');
    await page.locator('#f-ka').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await page.locator('#f-ka').fill('9,25');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });
});
