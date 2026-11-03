import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('İl Plaka Kodu ve Alan Kodu', () => {
  test('34 → İstanbul; Diyarbakır → 21 ve 412; 0242 → Antalya; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/plaka-kodu/');
    await expect(page.locator('#il-body tr')).toHaveCount(81);

    await page.locator('#q').fill('34');
    await expect(page.locator('#results li')).toHaveCount(1);
    await expect(page.locator('#results')).toContainText('İstanbul');
    await expect(page.locator('#results')).toContainText('0212 / 0216');

    await page.locator('#q').fill('Diyarbakır');
    await expect(page.locator('#results')).toContainText('21');
    await expect(page.locator('#results')).toContainText('0412');
    await page.locator('#q').fill('diyarbakir');
    await expect(page.locator('#results li')).toHaveCount(1);

    await page.locator('#q').fill('0242');
    await expect(page.locator('#results li')).toHaveCount(1);
    await expect(page.locator('#results')).toContainText('Antalya');
    await expect(page.locator('#results li')).toHaveAttribute('data-plaka', '07');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geçersiz kod anlaşılır hata verir; sıralama ve kopyalama çalışır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/plaka-kodu/');
    await expect(page.locator('#il-body tr')).toHaveCount(81);
    await page.locator('#q').fill('99');
    await expect(page.locator('#error')).toContainText('1 ile 81');
    await page.locator('#q').fill('0532');
    await expect(page.locator('#error')).toContainText('cep');

    await page.locator('#il-table [data-sort="ad"]').click();
    await expect(page.locator('#il-body tr').first()).toContainText('Adana');
    await page.locator('#il-table [data-sort="ad"]').click();
    await expect(page.locator('#il-body tr').first()).toContainText('Zonguldak');
    await page.locator('#il-table [data-sort="plaka"]').click();
    await expect(page.locator('#il-body tr').last()).toContainText('Düzce');

    await page.locator('#q').fill('34');
    await page.locator('#results button').click();
    await expect(page.locator('#status')).toContainText('kopyalandı');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('İstanbul');
  });

  test('ülke kodları sekmesi', async ({ page }) => {
    await page.goto('/plaka-kodu/');
    await page.locator('#tab-ulke').click();
    await expect(page.locator('#panel-ulke')).toBeVisible();
    await page.locator('#qc').fill('Almanya');
    await expect(page.locator('#ulke-body tr')).toHaveCount(1);
    await expect(page.locator('#ulke-body')).toContainText('+49');
    await page.locator('#qc').fill('+44');
    await expect(page.locator('#ulke-body')).toContainText('Birleşik Krallık');
    await page.locator('#qc').fill('zzzz');
    await expect(page.locator('#ulke-empty')).toBeVisible();
  });
});
