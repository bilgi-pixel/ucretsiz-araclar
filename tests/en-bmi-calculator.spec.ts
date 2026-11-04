import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('BMI Calculator (EN)', () => {
  test('US units and metric units give the same BMI; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/bmi-calculator/');
    await page.locator('#ft').fill('5');
    await page.locator('#inch').fill('9');
    await page.locator('#weight').fill('155');
    await page.locator('#age').fill('35');
    await page.getByLabel('Female').check();
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-bmi')).toHaveText('22.9');
    await expect(page.locator('#r-class')).toHaveText('Normal weight');
    await expect(page.locator('#r-ideal')).toContainText('lb');

    await page.locator('#units').selectOption('metric');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#height').fill('175');
    await page.locator('#weight').fill('70');
    await page.locator('#age').fill('35');
    await page.getByLabel('Male', { exact: true }).check();
    await page.locator('#waist').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#r-bmi')).toHaveText('22.9');
    await expect(page.locator('#r-ideal')).toContainText('kg');
    await expect(page.locator('#r-whtr')).toHaveText('0.57');
    await expect(page.locator('#r-waist-note')).toContainText('WHO');
    expect(external).toEqual([]);
    noErrors();
  });

  test('overweight and obesity categories are labelled', async ({ page }) => {
    await page.goto('/en/bmi-calculator/');
    await page.locator('#units').selectOption('metric');
    await page.locator('#height').fill('170');
    await page.locator('#weight').fill('85');
    await page.locator('#age').fill('40');
    await page.getByLabel('Male', { exact: true }).check();
    await page.locator('#calc').click();
    await expect(page.locator('#r-class')).toHaveText('Overweight (pre-obese)');
    await page.locator('#weight').fill('110');
    await page.locator('#calc').click();
    await expect(page.locator('#r-class')).toHaveText('Obesity class II');
  });

  test('invalid input shows an English error with a fix', async ({ page }) => {
    await page.goto('/en/bmi-calculator/');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Height is missing');
    await page.locator('#ft').fill('5');
    await page.locator('#inch').fill('9');
    await page.locator('#weight').fill('155');
    await page.locator('#age').fill('15');
    await page.getByLabel('Female').check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('18 and over');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#age').fill('30');
    await page.locator('#weight').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Weight is missing');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/bmi-calculator/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /vki-hesapla/);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
    // keyboard: first field reachable by Tab from the units select
    await page.locator('#units').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#ft')).toBeFocused();
  });
});
