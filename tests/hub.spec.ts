import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test('hub yüklenir, kartlar ve reklam yer tutucuları görünür', async ({ page }) => {
  const external = trackExternalRequests(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Ücretsiz Online Araç/);
  await expect(page.locator('.ba-card')).toHaveCount(291);
  await expect(page.locator('.ba-card:not(.is-soon) a.ba-card-link')).toHaveCount(291);
  await expect(page.locator('.ba-ad .ba-ad-placeholder').first()).toContainText('Reklam alanı');
  await expect(page.locator('footer a[href="gizlilik/"]')).toBeVisible();
  expect(external).toEqual([]);
});

test('arama kutusu kartları filtreler', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Araç ara').fill('pdf birleştir');
  const visible = page.locator('.ba-card:not(.is-hidden)');
  await expect(visible.first()).toContainText('PDF Birleştir');
  expect(await visible.count()).toBeLessThan(await page.locator('.ba-card').count());
  await page.getByLabel('Araç ara').fill('olmayan-arac-xyz');
  await expect(page.locator('#ba-empty')).toBeVisible();
});

test('kategori sekmeleri (#pdf) yalnızca ilgili bölümü gösterir', async ({ page }) => {
  await page.goto('/#pdf');
  await expect(page.locator('[data-category="pdf"]')).toBeVisible();
  await expect(page.locator('[data-category="dosya"]')).toBeHidden();
});
