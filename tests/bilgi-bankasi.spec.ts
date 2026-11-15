import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

const slugs: string[] = JSON.parse(readFileSync(join(__dirname, 'bilgi-bankasi.json'), 'utf8'));

test('Bilgi Bankası ana sayfası tüm makaleleri listeler', async ({ page }) => {
  const external = trackExternalRequests(page);
  await page.goto('/bilgi-bankasi/');
  await expect(page.locator('h1')).toHaveText('Bilgi Bankası');
  await expect(page.locator('.bb-cards a')).toHaveCount(slugs.length);
  expect(external).toEqual([]);
});

test('site ana sayfasında Bilgi Bankası sekmesi çalışır', async ({ page }) => {
  await page.goto('/#bilgi');
  await expect(page.locator('[data-category="bilgi"]')).toBeVisible();
  await expect(page.locator('[data-category="pdf"]')).toBeHidden();
});

for (const slug of slugs) {
  test(`makale açılır, görsel ve SSS var, mobilde taşma yok: ${slug}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const external = trackExternalRequests(page);
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(`/bilgi-bankasi/${slug}/`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.bb-fig svg')).toBeVisible();
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(8);
    expect(await page.locator('.rh-tools a').count()).toBeGreaterThanOrEqual(2);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    expect(() => JSON.parse(ld || '')).not.toThrow();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
}
