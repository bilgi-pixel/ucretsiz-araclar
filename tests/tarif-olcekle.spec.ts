import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/tarif-olcekle/';
const items = (page: Page) => page.locator('#r-list .ts-item .ts-new');

/** Listeyi doldurur (her satır ayrı malzeme). */
async function setList(page: Page, text: string) {
  await page.locator('#list').fill(text);
}

test.describe('Tarif Ölçekle', () => {
  test('4 → 6 porsiyon: 2 su bardağı un → 3 su bardağı un; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('#result')).toBeHidden();
    await setList(page, '2 su bardağı un');
    await expect(page.locator('#result')).toBeVisible();
    await expect(items(page)).toHaveText(['3 su bardağı un']);
    await expect(page.locator('#r-list .ts-old').first()).toHaveText('özgün: 2 su bardağı un');
    await expect(page.locator('#r-title')).toContainText('6 porsiyon');
    await expect(page.locator('#r-how')).toContainText('1,5');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('örnek tarif: kesirler, tam sayı malzemeler ve notlar doğru', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#sample').click();
    await expect(items(page)).toHaveText([
      '3 su bardağı un',
      '1 ½ su bardağı toz şeker',
      '5 yumurta',
      '¾ su bardağı sıvı yağ',
      '2 paket kabartma tozu',
      '1 ½ çay kaşığı tuz',
      '375 g tereyağı',
      '2 ¼ su bardağı süt',
    ]);
    // yumurta ve paket "yaklaşık" işaretli; hesaplanan değer yazılı
    await expect(page.locator('#r-list .ts-item.is-approx')).toHaveCount(2);
    const egg = page.locator('#r-list .ts-item', { hasText: 'yumurta' });
    await expect(egg.locator('.ts-note')).toContainText('yumurta bölünemez');
    await expect(egg.locator('.ts-note')).toContainText('4,5');
    await expect(page.locator('#r-list .ts-item', { hasText: 'tuz' }).locator('.ts-note')).toContainText('tadarak');
    await expect(page.locator('#r-list .ts-item', { hasText: 'kabartma' }).locator('.ts-note')).toContainText('kabartıcı');
    // ondalık gösterim
    await page.locator('#decimal').check();
    await expect(items(page).nth(7)).toHaveText('2,25 su bardağı süt');
    await expect(items(page).nth(3)).toHaveText('0,75 su bardağı sıvı yağ');
  });

  test('virgüllü girişler: hedef porsiyon 1,5; elle çarpan 2 ile 1,5 su bardağı süt → 3', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#p-orig').fill('1');
    await page.locator('#p-target').fill('1,5');
    await setList(page, '2 su bardağı un');
    await expect(items(page)).toHaveText(['3 su bardağı un']);
    await page.locator('#mode').selectOption('elle');
    await page.locator('#f-manual').fill('2');
    await setList(page, '1,5 su bardağı süt\n1.5 su bardağı su');
    await expect(items(page)).toHaveText(['3 su bardağı süt', '3 su bardağı su']);
    await expect(page.locator('#r-title')).toContainText('2 katına');
    // elle çarpanda virgül: 0,5 → yarıya iner
    await page.locator('#f-manual').fill('0,5');
    await expect(items(page)).toHaveText(['¾ su bardağı süt', '¾ su bardağı su']);
  });

  test('kalıp boyutu: 22 cm → 26 cm alan oranı ≈ 1,40; kare, dikdörtgen ve inç', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#panel-kalip')).toBeHidden();
    await page.locator('#mode').selectOption('kalip');
    await expect(page.locator('#panel-kalip')).toBeVisible();
    await page.locator('#p0-d1').fill('22');
    await page.locator('#p1-d1').fill('26');
    await expect(page.locator('#pan-ratio')).toHaveText('1,40');
    await expect(page.locator('#pan-areas')).toContainText('380');
    await expect(page.locator('#pan-areas')).toContainText('531');
    // listeyle birlikte: 2 × 1,3967 = 2,79 → 2 ¾
    await setList(page, '2 su bardağı un');
    await expect(items(page)).toHaveText(['2 ¾ su bardağı un']);
    await expect(page.locator('#r-title')).toContainText('cm²');
    await expect(page.locator('#oven-text')).toContainText('orantılı değildir');
    await expect(page.locator('#oven-text')).toContainText('alanıyla');
    // kare 20 → 24 = 1,44
    await page.locator('#p0-shape').selectOption('kare');
    await page.locator('#p0-d1').fill('20');
    await page.locator('#p1-shape').selectOption('kare');
    await page.locator('#p1-d1').fill('24');
    await expect(page.locator('#pan-ratio')).toHaveText('1,44');
    // dikdörtgen 20×30 (600 cm²) → 22 cm yuvarlak (380 cm²) = 0,63
    await page.locator('#p0-shape').selectOption('dikdortgen');
    await expect(page.locator('#p0-d2-wrap')).toBeVisible();
    await page.locator('#p0-d1').fill('20');
    await page.locator('#p0-d2').fill('30');
    await page.locator('#p1-shape').selectOption('yuvarlak');
    await page.locator('#p1-d1').fill('22');
    await expect(page.locator('#pan-ratio')).toHaveText('0,63');
    // inç: 9 inç yuvarlak (22,86 cm) → 22 cm yuvarlak = 0,93
    await page.locator('#p0-shape').selectOption('yuvarlak');
    await page.locator('#p0-d1').fill('9');
    await page.locator('#p0-unit').selectOption('inc');
    await expect(page.locator('#pan-ratio')).toHaveText('0,93');
  });

  test('yazım biçimleri: ½, yarım, 1½, aralık, bitişik birim, bir tutam, süre satırı', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#mode').selectOption('elle');
    await page.locator('#f-manual').fill('2');
    await setList(page, [
      '½ su bardağı süt',
      'yarım su bardağı yağ',
      '1½ kg domates',
      '1 1/2 su bardağı pirinç',
      '1 buçuk su bardağı su',
      '250g un',
      '2-3 diş sarımsak',
      'bir tutam tuz',
      '180 derece fırın',
      'süzme yoğurt',
    ].join('\n'));
    await expect(items(page)).toHaveText([
      '1 su bardağı süt',
      '1 su bardağı yağ',
      '3 kg domates',
      '3 su bardağı pirinç',
      '3 su bardağı su',
      '500 g un',
      '4 – 6 diş sarımsak',
      '2 tutam tuz',
      '180 derece fırın',
      'süzme yoğurt',
    ]);
    await expect(page.locator('#r-list .ts-item', { hasText: '180 derece' }).locator('.ts-note')).toContainText('ölçeklenmedi');
    await expect(page.locator('#r-list .ts-item', { hasText: 'süzme yoğurt' }).locator('.ts-note')).toContainText('miktar yok');
    // çok küçük miktar: bir tutam
    await page.locator('#f-manual').fill('0,05');
    await setList(page, '1 çay kaşığı tuz');
    await expect(items(page)).toHaveText(['bir tutam tuz']);
  });

  test('hatalı girişte Türkçe, çözüm öneren hata verir; düzeltince kalkar', async ({ page }) => {
    await page.goto(URL);
    await setList(page, '2 su bardağı un');
    await page.locator('#p-target').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#p-target').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#p-target').fill('1/0');
    await expect(page.locator('#error')).toContainText('yalnızca rakam');
    await page.locator('#p-target').fill('6');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    // hiçbir satırda miktar yok
    await setList(page, 'tuz\nbiraz yağ');
    await expect(page.locator('#error')).toContainText('Hiçbir satırda miktar bulunamadı');
    await expect(page.locator('#result')).toBeHidden();
    // kalıp ölçüsü hatası
    await setList(page, '2 su bardağı un');
    await page.locator('#mode').selectOption('kalip');
    await page.locator('#p1-d1').fill('x26');
    await expect(page.locator('#error')).toContainText('Hedef kalıp çapı');
    await expect(page.locator('#pan-summary')).toBeHidden();
  });

  test('fırın süresi notu, kopyala ve yazdır düğmeleri', async ({ page, context }) => {
    await page.addInitScript(() => {
      (window as any).__printCount = 0;
      window.print = () => { (window as any).__printCount++; };
    });
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(URL);
    await setList(page, '2 su bardağı un\n1 çay kaşığı tuz');
    await expect(page.locator('#oven-text')).toContainText('süreyi çarpanla çarpmayın');
    await expect(page.locator('#oven-text')).toContainText('%75');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('3 su bardağı un');
    expect(clip).toContain('1 ½ çay kaşığı tuz');
    expect(clip).toContain('Fırın süresi orantılı değildir');
    await page.locator('#print').click();
    expect(await page.evaluate(() => (window as any).__printCount)).toBe(1);
    // çarpan 1 iken süre notu "geçerlidir" der
    await page.locator('#p-target').fill('4');
    await expect(page.locator('#oven-text')).toContainText('tarifteki süre ve sıcaklık geçerlidir');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam (a/b/c), SSS ≥7, JSON-LD geçerli', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="tarif-olcekle-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.getByText('%100 ücretsiz').first()).toBeAttached();
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types: string[] = [];
    let faqQuestions = 0;
    for (const b of blocks) {
      const j = JSON.parse(b);
      types.push(j['@type']);
      if (j['@type'] === 'FAQPage') faqQuestions = j.mainEntity.length;
    }
    expect(types).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    expect(faqQuestions).toBe(await page.locator('.ba-faq details').count());
    // reklam A araç kutusunun altında
    const adBox = await page.locator('.ba-ad').first().boundingBox();
    const toolBox = await page.locator('.ba-tool').boundingBox();
    expect(adBox!.y).toBeGreaterThanOrEqual(toolBox!.y + toolBox!.height);
  });

  test('360px genişlikte yatay taşma yok; klavyeyle kullanılır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    // en geniş durum: kalıp paneli açık, dikdörtgen iki kalıp, uzun satır ve sonuç görünür
    await page.locator('#mode').selectOption('kalip');
    await page.locator('#p0-shape').selectOption('dikdortgen');
    await page.locator('#p1-shape').selectOption('dikdortgen');
    await page.locator('#p0-d1').fill('20');
    await page.locator('#p0-d2').fill('30');
    await page.locator('#p1-d1').fill('25');
    await page.locator('#p1-d2').fill('35');
    await page.locator('#sample').click();
    await setList(page, (await page.locator('#list').inputValue()) + '\n2 yemek kaşığı çok uzun bir malzeme adı örneği: ince kıyılmış taze maydanoz ve dereotu karışımı');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // klavye: Tab ile alanlar arasında gezinilir, textarea'ya yazılır
    await page.locator('#mode').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#p0-shape')).toBeFocused();
    await page.locator('#mode').selectOption('porsiyon');
    await page.locator('#list').focus();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('3 su bardağı un');
    await expect(items(page)).toHaveText(['4 ½ su bardağı un']);
  });
});
