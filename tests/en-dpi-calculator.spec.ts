import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/en/dpi-calculator/');
  await page.waitForLoadState('networkidle'); // wait for the module script before interacting
}

test.describe('DPI Calculator (EN)', () => {
  test('3000 px at 300 DPI is 10 in / 25.4 cm; copy works; no external requests or page errors', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#a-w').fill('3,000');
    await page.locator('#a-h').fill('2000');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('10 in');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('25.4 cm');
    await expect(page.locator('#r-rows .dpi-row').nth(1)).toContainText('16.93 cm');
    await expect(page.locator('#r-line')).toContainText('3000 × 2000 px at 300 DPI prints 10 × 6.67 in');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Result copied.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('25.4 × 16.93 cm');
    expect(external).toEqual([]);
    noErrors();
  });

  test('quick DPI buttons and inches/mm to pixels', async ({ page }) => {
    await open(page);
    await page.locator('#a-w').fill('3000');
    await page.getByRole('button', { name: '150 DPI' }).first().click();
    await expect(page.locator('#a-dpi')).toHaveValue('150');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('50.8 cm');
    await page.locator('#m-b').check();
    await expect(page.locator('#panel-b')).toBeVisible();
    await expect(page.locator('#panel-a')).toBeHidden();
    // Defaults: US Letter at 300 DPI
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('2550 pixels');
    await expect(page.locator('#r-rows .dpi-row').nth(1)).toContainText('3300 pixels');
    await page.locator('#b-unit').selectOption('mm');
    await page.locator('#b-w').fill('210');
    await page.locator('#b-h').fill('297');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('2480 pixels');
    await expect(page.locator('#r-rows .dpi-row').nth(1)).toContainText('3508 pixels');
  });

  test('screen PPI and the example table', async ({ page }) => {
    await open(page);
    await page.locator('#m-c').check();
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('81.59 PPI');
    await expect(page.locator('#devices-wrap')).toBeVisible();
    await page.getByRole('button', { name: /Apply the values for Monitor 24″ Full HD/ }).click();
    await expect(page.locator('#c-d')).toHaveValue('24');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('91.79 PPI');
  });

  test('invalid input shows English errors with a fix', async ({ page }) => {
    await open(page);
    await page.locator('#a-w').fill('12abc');
    await expect(page.locator('#error')).toContainText('could not be read as a number');
    await page.locator('#a-w').fill('-5');
    await expect(page.locator('#error')).toContainText('must be greater than zero');
    await page.locator('#a-w').fill('3000');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('quick answer, hreflang, ads, content length and 360px layout', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    await expect(page.locator('#q-rows')).toContainText('10 × 6.67 in');
    await expect(page.locator('#q-papers')).toContainText('8 × 10 in');
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /dpi-hesapla/);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').allInnerTexts()).join(' ').split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBeTruthy();
  });
});
