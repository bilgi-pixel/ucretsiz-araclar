import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const open = async (page: Page) => {
  await page.goto('/uyku-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
};
const mode = (page: Page, value: 'wake' | 'bed' | 'nap') => page.locator(`input[name="mode"][value="${value}"]`).check();
/** "5 döngü" satırının saat değeri. */
const rowTime = (page: Page, cycles: number) =>
  page.locator('#r-list .kdv-row').filter({ hasText: `${cycles} döngü` }).locator('dd');

test.describe('Uyku Saati Hesaplama', () => {
  test('07:00 kalkış → 23:15 / 21:45 / 20:15 (ve 00:45) yatış önerileri; sağlık notu; kopyala; dış istek yok', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    // Başlıkta (lead) sağlık notu
    await expect(page.locator('.lead')).toContainText('tıbbi tavsiye değildir');
    await page.locator('#wake').fill('07:00');
    await page.getByRole('button', { name: 'Hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-title')).toContainText('07:00');
    await expect(rowTime(page, 5)).toHaveText('23:15');
    await expect(rowTime(page, 6)).toHaveText('21:45');
    await expect(rowTime(page, 7)).toHaveText('20:15');
    await expect(rowTime(page, 4)).toHaveText('00:45');
    // Yetişkin (7-9 saat): 5 ve 6 döngü aralıkta, 4 altında, 7 üstünde
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '5 döngü' })).toContainText('önerilen aralıkta');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '4 döngü' })).toContainText('önerilen aralığın altında');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '4 döngü' })).toContainText('gece yarısından sonra');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '7 döngü' })).toContainText('önerilen aralığın üzerinde');
    // Sonuçta sağlık notu
    await expect(page.locator('#r-health')).toContainText('tıbbi tavsiye değildir');
    await expect(page.locator('#r-health')).toContainText('hekiminize danışın');

    // Uykuya dalma süresi 30 dk → 5 döngü 23:00
    await page.locator('#latency').fill('30');
    await page.locator('#calc').click();
    await expect(rowTime(page, 5)).toHaveText('23:00');

    // Kopyala
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Sonuç panoya kopyalandı.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('5 döngü');
    expect(clip).toContain('23:00');
    expect(clip).toContain('tıbbi tavsiye değildir');
    expect(external).toEqual([]);
    noErrors();
  });

  test('yaş grubu: 6-13 yaşta 6 ve 7 döngü önerilen aralıkta', async ({ page }) => {
    await open(page);
    await page.locator('#age').selectOption('school');
    await page.locator('#calc').click();
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '6 döngü' })).toContainText('önerilen aralıkta');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '7 döngü' })).toContainText('önerilen aralıkta');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '5 döngü' })).toContainText('önerilen aralığın altında');
  });

  test('şimdi yat modu: sabit saat 23:00 → 05:15 / 06:45 / 08:15 / 09:45 (15 dk dalma)', async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 2, 5, 23, 0, 0));
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await mode(page, 'bed');
    await expect(page.locator('#f-bed')).toBeVisible();
    await expect(page.locator('#f-wake')).toBeHidden();
    await page.locator('#calc').click();
    await expect(page.locator('#r-title')).toContainText('23:00 (şu an)');
    await expect(rowTime(page, 4)).toHaveText('05:15');
    await expect(rowTime(page, 5)).toHaveText('06:45');
    await expect(rowTime(page, 6)).toHaveText('08:15');
    await expect(rowTime(page, 7)).toHaveText('09:45');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '5 döngü' })).toContainText('ertesi gün');
    await expect(page.locator('#r-health')).toContainText('tıbbi tavsiye değildir');

    // Belirli yatış saati: 01:30 → 4 döngü 07:45 (aynı gün, "ertesi gün" yok)
    await page.locator('#bed').fill('01:30');
    await page.locator('#calc').click();
    await expect(page.locator('#r-title')).not.toContainText('şu an');
    await expect(rowTime(page, 4)).toHaveText('07:45');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '4 döngü' })).not.toContainText('ertesi gün');
    noErrors();
  });

  test('şekerleme: 14:00 başlangıç → 20 dk için 14:35, 90 dk için 15:45', async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 2, 5, 14, 0, 0));
    await open(page);
    await mode(page, 'nap');
    await expect(page.locator('#f-age')).toBeHidden();
    await page.locator('#calc').click();
    await expect(page.locator('#r-title')).toContainText('14:00 (şu an)');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '20 dakikalık' }).locator('dd')).toHaveText('14:35');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '90 dakikalık' }).locator('dd')).toHaveText('15:45');
    // Gece yarısını aşan şekerleme
    await page.locator('#nap').fill('23:50');
    await page.locator('#latency').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '20 dakikalık' }).locator('dd')).toHaveText('00:10');
    await expect(page.locator('#r-list .kdv-row').filter({ hasText: '90 dakikalık' }).locator('dd')).toHaveText('01:20');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    await page.locator('#wake').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kalkış saati boş');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#wake').fill('07:00');
    await page.locator('#latency').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Uykuya dalma süresi 0 ile 120 dakika');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#latency').fill('200');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Değeri düzeltin');
    // Düzeltince hata kalkar
    await page.locator('#latency').fill('15');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });

  test('sıfırla varsayılanları geri getirir', async ({ page }) => {
    await open(page);
    await page.locator('#wake').fill('05:30');
    await page.locator('#latency').fill('40');
    await page.locator('#calc').click();
    await page.locator('#clear').click();
    await expect(page.locator('#wake')).toHaveValue('07:00');
    await expect(page.locator('#latency')).toHaveValue('15');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('içerik: ≥900 kelime, 3 reklam (araç kutusunun altında), SSS ≥7, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['uyku-hesapla-a', 'uyku-hesapla-b', 'uyku-hesapla-c']);
    // Reklam A araç kutusunun hemen altında; araç kutusunun içinde reklam yok
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const adAfterTool = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('[data-slot="uyku-hesapla-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adAfterTool).toBe(true);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    // Yaş tablosu ve başlıkta sağlık notu
    await expect(page.locator('.ba-content table tbody tr')).toHaveCount(8);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '')));
    expect(ld.map((x) => x['@type']).sort()).toEqual(['FAQPage', 'SoftwareApplication']);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
