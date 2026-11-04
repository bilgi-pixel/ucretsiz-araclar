import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('JSON Formatter & Validator (EN)', () => {
  test('formats, minifies, sorts keys and validates; no external requests', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/en/json-formatter/');
    await page.locator('#input').fill('{"b":1,"a":{"y":[1,2],"x":null}}');
    await page.locator('#btn-format').click();
    await expect(page.locator('#output')).toHaveValue('{\n  "b": 1,\n  "a": {\n    "y": [\n      1,\n      2\n    ],\n    "x": null\n  }\n}');
    await expect(page.locator('#result-info')).toContainText('Valid JSON, formatted');
    await page.locator('#btn-minify').click();
    await expect(page.locator('#output')).toHaveValue('{"b":1,"a":{"y":[1,2],"x":null}}');
    await page.locator('#btn-sort').click();
    const sorted = await page.locator('#output').inputValue();
    expect(sorted.indexOf('"a"')).toBeLessThan(sorted.indexOf('"b"'));
    await page.locator('#btn-validate').click();
    await expect(page.locator('#result-info')).toContainText('Valid JSON (object, 2 keys)');
    expect(external).toEqual([]);
    noErrors();
  });

  test('syntax errors show line, column and a plain-English fix', async ({ page }) => {
    await page.goto('/en/json-formatter/');
    await page.locator('#input').fill('{\n  "a": 1,\n}');
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toContainText('Line 3, column 1');
    await expect(page.locator('#error')).toContainText('trailing comma');
    await page.locator('#input').fill("{'a': 1}");
    await page.locator('#btn-validate').click();
    await expect(page.locator('#error')).toContainText('double quotes');
    await page.locator('#input').fill('');
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toContainText('input is empty');
  });

  test('CSV and TypeScript conversions, file drop and download', async ({ page }) => {
    await page.goto('/en/json-formatter/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'people.json', mimeType: 'application/json', buffer: Buffer.from('[{"name":"Ann","age":30},{"name":"Ben","city":"Austin, TX"}]') });
    await expect(page.locator('#file-name')).toContainText('people.json');
    await page.locator('#btn-csv').click();
    await expect(page.locator('#output')).toHaveValue('name,age,city\nAnn,30,\nBen,,"Austin, TX"');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(download.suggestedFilename()).toBe('people.csv');
    await page.locator('#btn-ts').click();
    const ts = await page.locator('#output').inputValue();
    expect(ts).toContain('export interface');
    expect(ts).toContain('age?: number;');
    expect(ts).toContain('city?: string;');
    // CSV needs an array of objects
    await page.locator('#input').fill('{"a":1}');
    await page.locator('#btn-csv').click();
    await expect(page.locator('#error')).toContainText('array of objects');
  });

  test('content: 900+ words, 3 ads, 7+ FAQs, hreflang, no overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/en/json-formatter/');
    const words = await page.locator('.ba-content').innerText().then((t) => t.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThan(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute('href', /json-bicimlendir/);
    await page.locator('#input').fill('{"a":[1,2,{"b":true}]}');
    await page.locator('#btn-tree').click();
    await expect(page.locator('#tree')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});
