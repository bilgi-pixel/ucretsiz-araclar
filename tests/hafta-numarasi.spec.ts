import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Haftanın Kaçıncı Haftası', () => {
  test('2026-01-01 → ISO hafta 1 Perşembe; 2026-12-31 → hafta 53', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/hafta-numarasi/');
    await page.waitForSelector('html[data-ready="1"]');
    await expect(page.locator('#today')).toContainText('haftasındayız');
    await page.locator('#d').fill('2026-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('2026 yılının 1. haftası');
    await expect(page.locator('#r-weekday')).toHaveText('Perşembe');
    await expect(page.locator('#r-doy')).toContainText('1. gün');
    await expect(page.locator('#r-left')).toHaveText('364 gün');
    await expect(page.locator('#r-quarter')).toContainText('1. çeyrek');
    await expect(page.locator('#r-range')).toHaveText('29 Aralık 2025 – 4 Ocak 2026');
    await page.locator('#d').fill('2026-12-31');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('2026 yılının 53. haftası');
    await expect(page.locator('#r-wcount')).toContainText('53');
    await expect(page.locator('#r-doy')).toContainText('365. gün');
    // komşu yıl kuralı: 2027-01-01 → 2026 W53
    await page.locator('#d').fill('2027-01-01');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('2026 yılının 53. haftası');
    await expect(page.locator('#r-note')).toBeVisible();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('2026 W12 → 16-22 Mart 2026; yıl takvimi 53 satır', async ({ page }) => {
    await page.goto('/hafta-numarasi/');
    await page.waitForSelector('html[data-ready="1"]');
    await page.locator('#w-year').fill('2026');
    await page.locator('#w-week').fill('12');
    await page.locator('#w-calc').click();
    await expect(page.locator('#w-out')).toHaveText('2026 yılı 12. hafta: 16 Mart 2026 Pazartesi – 22 Mart 2026 Pazar');
    await expect(page.locator('#w-days li')).toHaveCount(7);
    await page.locator('#c-year').fill('2026');
    await page.locator('#c-show').click();
    await expect(page.locator('#c-title')).toContainText('53 hafta');
    await expect(page.locator('#c-body tr')).toHaveCount(53);
  });

  test('hatalı girişlerde Türkçe, çözüm öneren uyarı', async ({ page }) => {
    await page.goto('/hafta-numarasi/');
    await page.waitForSelector('html[data-ready="1"]');
    await page.locator('#d').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Tarih geçerli görünmüyor');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#w-year').fill('2025');
    await page.locator('#w-week').fill('53');
    await page.locator('#w-calc').click();
    await expect(page.locator('#w-error')).toContainText('2025 yılında 52 hafta var');
    await page.locator('#w-week').fill('0');
    await page.locator('#w-calc').click();
    await expect(page.locator('#w-error')).toContainText('1 ile 52');
  });
});
