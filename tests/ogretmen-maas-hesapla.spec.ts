import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const num = (s: string | null) => Number((s || '').replace(/[^\d,]/g, '').replace(',', '.'));

test.describe('Öğretmen Maaşı ve Ek Ders Ücreti Hesaplama (tahmini)', () => {
  test('uyarılar, maaş neti pozitif, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/ogretmen-maas-hesapla/');
    await expect(page.locator('h1')).toContainText('(tahmini)');
    await expect(page.locator('#uyari')).toContainText('resmî bordro yerine geçmez');
    await expect(page.locator('#result')).toBeVisible();
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(0);
    await expect(page.locator('#result')).toContainText('MEB bordrosu esastır');
    await expect(page.locator('#tbl tbody tr')).toHaveCount(12);
    expect(external).toEqual([]);
    noErrors();
  });

  test('ek ders 10 saat: brüt = 10 × 4 × birim ücret (140 × aylık katsayı); toplam net maaştan büyük', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    const net0 = num(await page.locator('#r-net').textContent());
    await page.locator('#f-gunduz').fill('10');
    const ka = num(await page.locator('#f-ka').inputValue());
    const unit = num(await page.locator('#r-ekders-unit').textContent());
    expect(Math.abs(unit - 140 * ka)).toBeLessThan(0.01);
    const brut = num(await page.locator('#r-ekders-brut').textContent());
    expect(brut).toBeGreaterThan(0);
    expect(Math.abs(brut - 10 * 4 * unit)).toBeLessThan(0.05);
    const katki = num(await page.locator('#r-ekders-net').textContent());
    expect(katki).toBeGreaterThan(0);
    expect(katki).toBeLessThan(brut);
    const toplam = num(await page.locator('#r-toplam-net').textContent());
    expect(toplam).toBeGreaterThan(net0);
    expect(Math.abs(toplam - (net0 + katki))).toBeLessThan(0.05);
    // Gece / hafta sonu dersi: gösterge 150 × aylık katsayı (657 s. K. md. 176); %25 artış değil.
    const gece = num(await page.locator('#r-ekders-unit-gece').textContent());
    expect(gece).toBeGreaterThan(unit);
    expect(Math.abs(gece - 150 * ka)).toBeLessThan(0.01);
    expect(Math.abs(gece - unit * 1.25)).toBeGreaterThan(1);
  });

  test('Temmuz–Aralık 2026: gündüz 220,57 / gece 236,33; 10 + 4 saat örneği sayfa metniyle aynı', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    await expect(page.locator('#f-donem')).toHaveValue('temmuz_aralik');
    await expect(page.locator('#f-ka')).toHaveValue('1,575512');
    await expect(page.locator('#r-ekders-unit')).toHaveText('220,57 ₺');
    await expect(page.locator('#r-ekders-unit-gece')).toHaveText('236,33 ₺');
    await page.locator('#f-gunduz').fill('10');
    await page.locator('#f-gece').fill('4');
    await expect(page.locator('#r-ekders-saat')).toHaveText('56');
    // 40 × 220,57 + 16 × 236,33 = 8.822,80 + 3.781,28 = 12.604,08 (node ile yeniden hesaplandı)
    await expect(page.locator('#r-ekders-brut')).toHaveText('12.604,08 ₺');
    // Yüzde 15 diliminde: 12.604,08 − 1.890,61 GV − 95,66 damga
    await expect(page.locator('#r-ekders-net')).toHaveText('10.617,81 ₺');
    const metin = page.locator('article.ba-content');
    await expect(metin).toContainText('12.604,08 TL');
    await expect(metin).toContainText('10.617,81 TL');
    await expect(metin).toContainText('236,33 TL');
  });

  test('Ocak–Haziran 2026: birim ücretler 194,30 / 208,18 ve yaklaşık katsayı notu görünür', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    await expect(page.locator('#donem-not')).toBeHidden();
    await page.locator('#f-donem').selectOption('ocak_haziran');
    await expect(page.locator('#f-ka')).toHaveValue('1,387871');
    await expect(page.locator('#r-ekders-unit')).toHaveText('194,30 ₺');
    await expect(page.locator('#r-ekders-unit-gece')).toHaveText('208,18 ₺');
    await expect(page.locator('#donem-not')).toBeVisible();
    await expect(page.locator('#donem-not')).toContainText('Yaklaşık');
    await page.locator('#f-donem').selectOption('temmuz_aralik');
    await expect(page.locator('#donem-not')).toBeHidden();
  });

  test('kaynak notu ve SSS resmî değerlerle tutarlı; JSON-LD SSS sayfadakiyle aynı', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    const kaynak = page.locator('#p-source');
    await expect(kaynak).toContainText('657 sayılı Devlet Memurları Kanunu md. 176');
    await expect(kaynak).toContainText('150 gösterge');
    await expect(kaynak).toContainText('33.030,00 TL');
    await expect(kaynak).toContainText('28.075,50 TL');
    await expect(page.locator('label[for="f-gece"]')).toContainText('hafta sonu');
    const sss = page.locator('.ba-faq details');
    expect(await sss.count()).toBeGreaterThanOrEqual(6);
    const gece = sss.filter({ hasText: 'Gece ek ders ücreti neden daha yüksek?' });
    await expect(gece).toContainText('150');
    await expect(gece).toContainText('yüzde 7,14');
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const graph = JSON.parse(ld[0])['@graph'];
    expect(graph.some((g: { '@type': string }) => g['@type'] === 'SoftwareApplication')).toBe(true);
    const faq = graph.find((g: { '@type': string }) => g['@type'] === 'FAQPage');
    const ldQ = faq.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => [q.name, q.acceptedAnswer.text]);
    const htmlQ = await sss.evaluateAll((els) => els.map((d) => [d.querySelector('summary')!.textContent, d.querySelector('p')!.textContent]));
    expect(ldQ).toEqual(htmlQ);
    expect(JSON.stringify(faq)).not.toContain('parametrelerde tanımlı bir oranla (yüzde 25)');
  });

  test('kesintiler: 4/c MYÖ %9 + GSS %5; 5434 rejiminde kesenek %16 ve maaştan GSS kesilmez', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    // Varsayılan (9/1, öğretmen, Temmuz–Aralık): matrah = 976,82 + 5.671,84 + 25.794,92 = 32.443,58 TL (tavanın çok altında)
    const matrah = 976.82 + 5671.84 + 25794.92;
    await expect(page.locator('#r-gosterge')).toHaveText('976,82 ₺');
    await expect(page.locator('#r-ekgosterge')).toHaveText('5.671,84 ₺');
    await expect(page.locator('#r-taban')).toHaveText('25.794,92 ₺');
    expect(Math.abs(num(await page.locator('#r-kesenek').textContent()) - matrah * 0.09)).toBeLessThan(0.01);
    expect(Math.abs(num(await page.locator('#r-gss').textContent()) - matrah * 0.05)).toBeLessThan(0.01);
    await page.locator('#f-eski').check();
    expect(Math.abs(num(await page.locator('#r-kesenek').textContent()) - matrah * 0.16)).toBeLessThan(0.01);
    await expect(page.locator('#r-gss')).toHaveText('0,00 ₺');
    const metin = page.locator('article.ba-content');
    await expect(metin).toContainText('297.270 TL');
    await expect(metin).toContainText('maaştan GSS kesilmez');
  });

  test('unvan ve derece yükselince maaş neti artar', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    await page.locator('#f-unvan').selectOption('ogretmen');
    const a = num(await page.locator('#r-net').textContent());
    await page.locator('#f-unvan').selectOption('bas');
    const b = num(await page.locator('#r-net').textContent());
    expect(b).toBeGreaterThan(a);
    await page.locator('#f-derece').selectOption('4');
    expect(num(await page.locator('#r-net').textContent())).toBeGreaterThan(b);
  });

  test('hatalı girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/ogretmen-maas-hesapla/');
    await page.locator('#f-gunduz').fill('-5');
    await expect(page.locator('#error')).toContainText('negatif');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-gunduz').fill('abc');
    await expect(page.locator('#error')).toContainText('rakam');
    await page.locator('#f-ka').fill('');
    await page.locator('#f-gunduz').fill('4');
    await expect(page.locator('#error')).toContainText('boş bırakılamaz');
    await page.locator('#f-ka').fill('8,5');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });
});
