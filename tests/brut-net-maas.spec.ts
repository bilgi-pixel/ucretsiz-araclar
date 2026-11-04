import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Para metnini sayıya çevirir: "28.075,50 ₺" -> 28075.5
const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('Brüt-Net Maaş Hesaplama', () => {
  test('asgari ücret brüt 33.030 → net yaklaşık 28.075 TL, 12 satırlı tablo, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/brut-net-maas/');
    await expect(page.locator('#p-updated')).not.toHaveText('…');
    await page.locator('#f-amount').fill('33.030');
    await expect(page.locator('#result')).toBeVisible();
    // Kuruş farkı toleransı: ±1 TL
    expect(Math.abs(num(await page.locator('#r-net').textContent()) - 28075.5)).toBeLessThan(1);
    await expect(page.locator('#r-gv')).toHaveText('0,00 ₺');
    await expect(page.locator('#r-damga')).toHaveText('0,00 ₺');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    expect(external).toEqual([]);
    noErrors();
  });

  test('50.000 brüt: Ocak neti ~40.207 TL, yıl içinde net düşer; istisnasız daha az net', async ({ page }) => {
    await page.goto('/brut-net-maas/');
    await page.locator('#f-amount').fill('50000');
    expect(Math.abs(num(await page.locator('#r-net').textContent()) - 40207.52)).toBeLessThan(1);
    const dec = num(await page.locator('#tbl tbody tr').nth(11).locator('td').last().textContent());
    expect(dec).toBeLessThan(40207);
    await page.locator('#f-exempt').uncheck();
    expect(num(await page.locator('#r-net').textContent())).toBeLessThan(38000);
  });

  test('netten brüte: 28.075,50 net → brüt 33.030; işveren maliyeti 2026 oranları, teşvik ve asgari ücret desteği', async ({ page }) => {
    await page.goto('/brut-net-maas/');
    await page.getByLabel('Net maaş (brütü bul)').check();
    await page.locator('#f-amount').fill('28.075,50');
    expect(Math.abs(num(await page.locator('#r-brut').textContent()) - 33030)).toBeLessThan(1);
    await expect(page.locator('#f-employer-opts')).toBeHidden();
    await page.locator('#f-employer').check();
    await expect(page.locator('#f-employer-opts')).toBeVisible();
    await expect(page.locator('#r-employer-wrap')).toBeVisible();
    // Teşviksiz: SGK işveren %21,75 (7.184,03) + işsizlik %2 (660,60) → 40.874,63
    await expect(page.locator('#l-isv-sgk')).toContainText('%21,75');
    await expect(page.locator('#r-isv-sgk')).toHaveText('7.184,03 ₺');
    await expect(page.locator('#r-isv-iss')).toHaveText('660,60 ₺');
    await expect(page.locator('#r-employer')).toHaveText('40.874,63 ₺');
    await expect(page.locator('#r-destek-wrap')).toBeHidden();
    // İmalat dışı özel sektör: 2 puan → %19,75
    await page.getByLabel('SGK işveren teşviki').selectOption('diger');
    await expect(page.locator('#l-isv-sgk')).toContainText('%19,75');
    await expect(page.locator('#r-isv-sgk')).toHaveText('6.523,43 ₺');
    await expect(page.locator('#r-employer')).toHaveText('40.214,03 ₺');
    // İmalat: 5 puan → %16,75
    await page.getByLabel('SGK işveren teşviki').selectOption('imalat');
    await expect(page.locator('#l-isv-sgk')).toContainText('%16,75');
    await expect(page.locator('#r-isv-sgk')).toHaveText('5.532,53 ₺');
    await expect(page.locator('#r-employer')).toHaveText('39.223,13 ₺');
    // Asgari ücret desteği: günlük 42,33 × 30 = 1.269,90
    await expect(page.locator('#l-destek')).toContainText('42,33 ₺');
    await page.locator('#f-destek').check();
    await expect(page.locator('#r-destek-wrap')).toBeVisible();
    await expect(page.locator('#r-destek')).toHaveText('− 1.269,90 ₺');
    await expect(page.locator('#r-employer')).toHaveText('37.953,23 ₺');
    await expect(page.locator('#th-employer')).toBeVisible();
    await expect(page.locator('#tbl tbody tr').nth(11).locator('td').last()).toHaveText('37.953,23 ₺');
    await expect(page.locator('#tbl tfoot td').last()).toHaveText('455.438,76 ₺');
    // İmalat dışı + destek
    await page.getByLabel('SGK işveren teşviki').selectOption('diger');
    await expect(page.locator('#r-employer')).toHaveText('38.944,13 ₺');
  });

  test('prim tavanı 2026: 9 kat, 297.270 TL; tavanı aşan maaşta primler tavandan', async ({ page }) => {
    await page.goto('/brut-net-maas/');
    await expect(page.locator('#p-tavan')).toContainText('297.270,00 ₺');
    await expect(page.locator('#p-tavan')).toContainText('9 katı');
    await page.locator('#f-amount').fill('400.000');
    // 297.270 × %14 = 41.617,80; × %1 = 2.972,70
    await expect(page.locator('#r-sgk')).toHaveText('41.617,80 ₺');
    await expect(page.locator('#r-issizlik')).toHaveText('2.972,70 ₺');
    await expect(page.locator('#mode-note')).toContainText('297.270,00 ₺');
    await page.locator('#f-employer').check();
    // 297.270 × %21,75 = 64.656,23; × %2 = 5.945,40 → 400.000 + 70.601,63
    await expect(page.locator('#r-isv-sgk')).toHaveText('64.656,23 ₺');
    await expect(page.locator('#r-isv-iss')).toHaveText('5.945,40 ₺');
    await expect(page.locator('#r-employer')).toHaveText('470.601,63 ₺');
    // Tavanın altında not yok
    await page.locator('#f-amount').fill('297.270');
    await expect(page.locator('#r-sgk')).toHaveText('41.617,80 ₺');
    await expect(page.locator('#mode-note')).toHaveText('');
    // Prime esas kazanç alt sınırının altında uyarı
    await page.locator('#f-amount').fill('20.000');
    await expect(page.locator('#mode-note')).toContainText('33.030,00 ₺');
    // Teşviksiz işverende de asgari ücret desteği düşülebilir: 33.030 + 7.184,03 + 660,60 − 1.269,90
    await page.locator('#f-amount').fill('33.030');
    await expect(page.locator('#mode-note')).toHaveText('');
    await page.locator('#f-destek').check();
    await expect(page.locator('#r-employer')).toHaveText('39.604,73 ₺');
  });

  test('parametreler resmî 2026 değerleriyle tutarlı; sayfada eski oran yok; SSS ile JSON-LD aynı', async ({ page }) => {
    await page.goto('/brut-net-maas/');
    const p = await (await page.request.get('/brut-net-maas/parametreler.json')).json();
    expect(p.asgari_ucret_brut).toBe(33030);
    expect(p.asgari_ucret_net).toBe(28075.5);
    expect(p.sgk_isci_orani).toBe(14);
    expect(p.issizlik_isci_orani).toBe(1);
    expect(p.sgk_isveren_orani).toBe(21.75);
    expect(p.issizlik_isveren_orani).toBe(2);
    expect(p.sgk_isveren_tesvik_puanlari).toEqual({ diger: 2, imalat: 5 });
    expect(p.sgk_taban_tutari).toBe(33030);
    expect(p.sgk_tavan_katsayisi).toBe(9);
    expect(p.sgk_tavan_tutari).toBe(297270);
    expect(p.sgk_tavan_tutari).toBe(p.asgari_ucret_brut * p.sgk_tavan_katsayisi);
    expect(p.asgari_ucret_destegi_gunluk).toBe(42.33);
    expect(Math.round(p.asgari_ucret_destegi_gunluk * 30 * 100) / 100).toBe(1269.9);
    const text = await page.locator('main').innerText();
    for (const s of ['%21,75', '%19,75', '%16,75', '%23,75', '%38,75', '297.270', '9.909', '1.101,00', '242.748,08', '41.617,80', '2.972,70', '1.269,90', '42,33', '40.874,63', '40.214,03', '39.223,13', '38.944,13', '37.953,23', '61.875,00', '60.875,00', '59.375,00', '36.511,30', '38.844,63']) expect(text, s).toContain(s);
    for (const stale of ['40.461,75', '38.810,25', '%20,5', '%15,5', '247.725', '61.250', '58.750', '1.270,38', '5 puan SGK işveren indirimi']) expect(text, stale).not.toContain(stale);
    // JSON-LD: SoftwareApplication + SSS ile birebir FAQPage
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"SoftwareApplication"'))).toBe(true);
    const faq = JSON.parse(ld.find((t) => t.includes('"FAQPage"')) || '{}');
    const visible = await page.locator('.ba-faq details').evaluateAll((els) => els.map((d) => ({
      q: (d.querySelector('summary')?.textContent || '').replace(/\s+/g, ' ').trim(),
      a: (d.querySelector('p')?.textContent || '').replace(/\s+/g, ' ').trim(),
    })));
    expect(visible.length).toBeGreaterThanOrEqual(6);
    expect(faq.mainEntity.map((e: { name: string; acceptedAnswer: { text: string } }) => ({ q: e.name, a: e.acceptedAnswer.text }))).toEqual(visible);
  });

  test('parametreler.json yüklenemezse yerleşik değerler aynı sonucu verir', async ({ page }) => {
    await page.route('**/brut-net-maas/parametreler.json', (route) => route.abort());
    await page.goto('/brut-net-maas/');
    await expect(page.locator('#p-tavan')).toContainText('297.270,00 ₺');
    await page.locator('#f-amount').fill('33.030');
    await expect(page.locator('#r-net')).toHaveText('28.075,50 ₺');
    await page.locator('#f-employer').check();
    await expect(page.locator('#r-employer')).toHaveText('40.874,63 ₺');
    await page.getByLabel('SGK işveren teşviki').selectOption('imalat');
    await page.locator('#f-destek').check();
    await expect(page.locator('#r-employer')).toHaveText('37.953,23 ₺');
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/brut-net-maas/');
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
});
