import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page: Page, query = '') {
  await page.goto('/renk-kontrast-hesapla/' + query);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden etkileşim olmasın
  await expect(page.locator('#cr-ratio')).not.toHaveText('–');
}
const ratioOf = async (page: Page) => Number(await page.locator('#cr-ratio').getAttribute('data-ratio'));
const pass = (page: Page, id: string) => page.locator('#' + id).getAttribute('data-pass');

test.describe('Renk Kontrast Hesaplama', () => {
  test('#000000 / #FFFFFF → 21:1 ve tüm rozetler geçer; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#fg-hex').fill('#000000');
    await page.locator('#bg-hex').fill('#FFFFFF');
    await expect(page.locator('#cr-ratio')).toHaveText('21:1');
    expect(await ratioOf(page)).toBeCloseTo(21, 2);
    for (const id of ['b-aa-n', 'b-aa-l', 'b-aaa-n', 'b-aaa-l', 'b-ui']) expect(await pass(page, id)).toBe('1');
    await expect(page.locator('#b-aaa-n .kc-state')).toContainText('Geçti');
    expect(external).toEqual([]);
    noErrors();
  });

  test('#777777 / #FFFFFF → 4,48:1: AA normal kalır, büyük metin geçer', async ({ page }) => {
    await open(page);
    await page.locator('#fg-hex').fill('#777777');
    await page.locator('#bg-hex').fill('#ffffff');
    await expect(page.locator('#cr-ratio')).toContainText('4,48');
    expect(await ratioOf(page)).toBeCloseTo(4.478, 2);
    expect(await pass(page, 'b-aa-n')).toBe('0');
    await expect(page.locator('#b-aa-n .kc-state')).toContainText('Kaldı');
    expect(await pass(page, 'b-aa-l')).toBe('1');
    expect(await pass(page, 'b-aaa-n')).toBe('0');
    expect(await pass(page, 'b-aaa-l')).toBe('0'); // 4,478 < 4,5
    expect(await pass(page, 'b-ui')).toBe('1');
    // önizleme seçilen renklerle boyanır
    const pv = await page.locator('#preview').evaluate((el) => ({ c: getComputedStyle(el).color, b: getComputedStyle(el).backgroundColor }));
    expect(pv.c).toBe('rgb(119, 119, 119)');
    expect(pv.b).toBe('rgb(255, 255, 255)');
  });

  test('#0000FF / #FFFFFF → 8,59:1 ve her şey geçer; renk seçici ve HEX birbirine bağlı', async ({ page }) => {
    await open(page);
    await page.locator('#fg-hex').fill('0000ff'); // # işareti olmadan
    await page.locator('#bg-hex').fill('#fff'); // 3 haneli
    await expect(page.locator('#cr-ratio')).toContainText('8,59');
    expect(await ratioOf(page)).toBeCloseTo(8.5925, 2);
    expect(await pass(page, 'b-aaa-n')).toBe('1');
    // renk seçiciden değer verince HEX alanı güncellenir
    await page.locator('#fg-color').fill('#ff0000');
    await expect(page.locator('#fg-hex')).toHaveValue('#FF0000');
    expect(await ratioOf(page)).toBeCloseTo(4.0, 1); // kırmızı/beyaz ≈ 4,00
  });

  test('düzelt önerisi: AA ve AAA için en yakın ton uygulanır, çözümsüz durumda açıklama verir', async ({ page }) => {
    await open(page);
    await page.locator('#fg-hex').fill('#777777');
    await page.locator('#bg-hex').fill('#ffffff');
    await expect(page.locator('#fix-aa-text')).toContainText('daha koyu');
    await expect(page.locator('#fix-aa-apply')).toBeVisible();
    await page.locator('#fix-aa-apply').click();
    expect(await ratioOf(page)).toBeGreaterThanOrEqual(4.5);
    expect(await ratioOf(page)).toBeLessThan(4.7); // en yakın ton: gereğinden fazla koyulaştırmaz
    const hex = (await page.locator('#fg-hex').inputValue()).toLowerCase();
    expect(hex).toMatch(/^#7[0-6]7[0-6]7[0-6]$/); // #777777'ye en yakın geçen gri (~#767676)
    expect(await pass(page, 'b-aa-n')).toBe('1');
    // artık AA geçiyor
    await expect(page.locator('#fix-aa-text')).toContainText('zaten');
    await expect(page.locator('#fix-aa-apply')).toBeHidden();
    // AAA
    await page.locator('#fix-aaa-apply').click();
    expect(await ratioOf(page)).toBeGreaterThanOrEqual(7);
    expect(await pass(page, 'b-aaa-n')).toBe('1');

    // arka planı ayarla: gri yazı sabit, zemin koyulaşır
    await page.locator('#fg-hex').fill('#777777');
    await page.locator('#bg-hex').fill('#ffffff');
    await page.locator('#fix-target').selectOption('bg');
    await page.locator('#fix-aa-apply').click();
    expect(await ratioOf(page)).toBeGreaterThanOrEqual(4.5);
    await expect(page.locator('#fg-hex')).toHaveValue('#777777');

    // çözümsüz: orta gri zeminde yalnızca yazıyı değiştirerek AAA olmaz
    await page.locator('#fix-target').selectOption('fg');
    await page.locator('#bg-hex').fill('#808080');
    await page.locator('#fg-hex').fill('#999999');
    await expect(page.locator('#fix-aaa-text')).toContainText('ulaşılamıyor');
    await expect(page.locator('#fix-aaa-apply')).toBeHidden();
  });

  test('URL paylaşımı: ?fg=&bg= okunur, değişiklikte adres güncellenir, bağlantı kopyalanır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page, '?fg=777777&bg=ffffff');
    await expect(page.locator('#fg-hex')).toHaveValue('#777777');
    await expect(page.locator('#bg-hex')).toHaveValue('#FFFFFF');
    await expect(page.locator('#cr-ratio')).toContainText('4,48');
    // %23 ile kodlanmış değerler de kabul edilir
    await open(page, '?fg=%23000000&bg=%23ffffff');
    await expect(page.locator('#cr-ratio')).toHaveText('21:1');
    // değişiklikte adres çubuğu güncellenir
    await page.locator('#fg-hex').fill('#0000ff');
    await expect(page).toHaveURL(/\?fg=0000ff&bg=ffffff$/);
    await expect(page.locator('#share-url')).toHaveValue(/\/renk-kontrast-hesapla\/\?fg=0000ff&bg=ffffff$/);
    await page.locator('#swap').click();
    await expect(page).toHaveURL(/\?fg=ffffff&bg=0000ff$/);
    await expect(page.locator('#fg-hex')).toHaveValue('#FFFFFF');
    await expect(page.locator('#bg-hex')).toHaveValue('#0000FF');
    expect(await ratioOf(page)).toBeCloseTo(8.5925, 2); // takas oranı değiştirmez
    // bağlantıyı kopyala
    await page.locator('#copy-link').click();
    await expect(page.locator('#copy-status')).toHaveText('Bağlantı kopyalandı.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toMatch(/\/renk-kontrast-hesapla\/\?fg=ffffff&bg=0000ff$/);
  });

  test('hatalı HEX ve hatalı URL parametresi Türkçe, çözüm öneren uyarı verir', async ({ page }) => {
    await open(page);
    await page.locator('#fg-hex').fill('#000000');
    await page.locator('#fg-hex').fill('#zzz123');
    await expect(page.locator('#error')).toContainText('HEX değeri geçersiz');
    await expect(page.locator('#error')).toContainText('#RRGGBB');
    await expect(page.locator('#fg-hex')).toHaveAttribute('aria-invalid', 'true');
    expect(await ratioOf(page)).toBeCloseTo(21, 1); // son geçerli renk korunur
    await page.locator('#fg-hex').fill('#fff');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#fg-hex')).not.toHaveAttribute('aria-invalid', 'true');
    // yazarken kısmi değer hemen uyarmaz; alan bırakılınca uyarır
    await page.locator('#bg-hex').fill('12345');
    await expect(page.locator('#error')).toBeHidden();
    await page.locator('#bg-hex').blur();
    await expect(page.locator('#error')).toContainText('Arka plan HEX değeri geçersiz');
    // hatalı URL parametresi: varsayılan renk + uyarı
    await open(page, '?fg=zzz&bg=ffffff');
    await expect(page.locator('#error')).toContainText('bağlantıda geçersiz');
    await expect(page.locator('#fg-hex')).toHaveValue('#6B7280');
  });

  test('hazır renk çiftleri tablosu: oranlar hesaplanır, satır tıklanınca renkler yüklenir (klavyeyle de)', async ({ page }) => {
    await open(page);
    expect(await page.locator('#pairs-body tr').count()).toBeGreaterThanOrEqual(10);
    const row = page.locator('#pairs-body tr', { hasText: 'Tailwind gri 400' });
    await expect(row.locator('td').nth(1)).toContainText('2,54');
    await expect(row.locator('td').nth(2)).toContainText('Kaldı');
    await row.getByRole('button').click();
    await expect(page.locator('#fg-hex')).toHaveValue('#9CA3AF');
    await expect(page.locator('#bg-hex')).toHaveValue('#FFFFFF');
    expect(await ratioOf(page)).toBeCloseTo(2.5, 1);
    // klavye: düğmeye odaklanıp Enter
    const btn = page.locator('#pairs-body tr', { hasText: 'Siyah / beyaz' }).getByRole('button');
    await btn.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#cr-ratio')).toHaveText('21:1');
    // her satırda AA sonucu var
    const marks = await page.locator('#pairs-body tr td:nth-child(3)').allTextContents();
    expect(marks.every((m) => /Geçti|Kaldı/.test(m))).toBe(true);
  });

  test('renk körlüğü simülasyonu: dört önizleme, gri çift değişmez, mavi/beyaz protanopide düşer', async ({ page }) => {
    await open(page);
    await page.locator('#fg-hex').fill('#0000ff');
    await page.locator('#bg-hex').fill('#ffffff');
    await page.locator('#cb > summary').click();
    await expect(page.locator('#cb-grid figure')).toHaveCount(4);
    const ratio = async (kind: string) => Number(await page.locator(`#cb-grid figure[data-kind="${kind}"] [data-ratio]`).getAttribute('data-ratio'));
    expect(await ratio('normal')).toBeCloseTo(8.5925, 2);
    const prot = await ratio('prot');
    expect(prot).toBeGreaterThan(5.2);
    expect(prot).toBeLessThan(5.6);
    expect(await ratio('deut')).toBeGreaterThan(6.5);
    expect(await ratio('trit')).toBeLessThan(await ratio('normal'));
    // nötr gri: simülasyon oranı korur
    await page.locator('#fg-hex').fill('#777777');
    for (const k of ['prot', 'deut', 'trit']) expect(await ratio(k)).toBeCloseTo(4.478, 1);
    await expect(page.locator('#cb-grid figure[data-kind="prot"]')).toContainText('Protanopi');
    await expect(page.locator('#cb-grid figure[data-kind="deut"]')).toContainText('Döteranopi');
    await expect(page.locator('#cb-grid figure[data-kind="trit"]')).toContainText('Tritanopi');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı (araç kutusunun dışında), SSS ≥7, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="renk-kontrast-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="renk-kontrast-hesapla-a"]')!;
      return tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING;
    });
    expect(order).toBeTruthy();
    // reklam A, düğmelerin bulunduğu alanın dışında: araç kutusunun altında
    const gap = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!.getBoundingClientRect();
      const ad = document.querySelector('.ba-ad[data-slot="renk-kontrast-hesapla-a"]')!.getBoundingClientRect();
      return ad.top - tool.bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(0);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    const types = ld.map((x) => x['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('FAQPage');
    expect(ld.find((x) => x['@type'] === 'FAQPage').mainEntity).toHaveLength(faqCount);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('h1')).toContainText('Renk Kontrast Hesaplama');
  });

  test('360px genişlikte yatay taşma yok ve alanlar klavyeyle erişilebilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#cb > summary').click();
    await page.locator('#fg-hex').fill('#zzzzzz'); // uyarı açıkken de taşma olmamalı
    expect(await overflow()).toBeLessThanOrEqual(0);
    const box = await page.locator('#preview').boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    // etiketler alanlara bağlı (erişilebilir ad)
    await expect(page.getByLabel('Ön plan (yazı) rengi', { exact: true })).toHaveAttribute('id', 'fg-hex');
    await expect(page.getByLabel('Arka plan rengi', { exact: true })).toHaveAttribute('id', 'bg-hex');
    // Tab sırası: ön plan seçici → ön plan HEX → takas
    await page.locator('#fg-color').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#fg-hex')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#swap')).toBeFocused();
  });
});
