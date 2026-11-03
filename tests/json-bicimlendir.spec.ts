import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('JSON Biçimlendir ve Doğrula', () => {
  test('bozuk JSON satır numaralı Türkçe hata verir ve imleci götürür', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/json-bicimlendir/');
    await page.locator('#input').fill('{\n  "ad": "Ali",\n  "yas": 30,\n}');
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toContainText('Satır 4, sütun 1');
    await expect(page.locator('#error')).toContainText('fazladan virgül');
    const sel = await page.locator('#input').evaluate((el: HTMLTextAreaElement) => el.selectionStart);
    expect(sel).toBe('{\n  "ad": "Ali",\n  "yas": 30,\n'.length);

    await page.locator('#input').fill("{'a': 1}");
    await page.locator('#btn-validate').click();
    await expect(page.locator('#error')).toContainText('Satır 1, sütun 2');
    await expect(page.locator('#error')).toContainText('çift tırnak');

    await page.locator('#input').fill('{"a": 1 "b": 2}');
    await page.locator('#btn-validate').click();
    await expect(page.locator('#error')).toContainText('Virgül ya da }');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('biçimlendirme, sıkıştırma, sıralama ve indirme', async ({ page }) => {
    await page.goto('/json-bicimlendir/');
    await page.locator('#input').fill('{"b":[1,2],"a":{"z":true,"y":null}}');
    await page.locator('#btn-format').click();
    await expect(page.locator('#output')).toHaveValue('{\n  "b": [\n    1,\n    2\n  ],\n  "a": {\n    "z": true,\n    "y": null\n  }\n}');
    await page.locator('#opt-indent').selectOption('4');
    await page.locator('#btn-sort').click();
    const sorted = await page.locator('#output').inputValue();
    expect(sorted.indexOf('"a"')).toBeLessThan(sorted.indexOf('"b"'));
    expect(sorted).toContain('    "y": null');
    await page.locator('#btn-minify').click();
    await expect(page.locator('#output')).toHaveValue('{"b":[1,2],"a":{"z":true,"y":null}}');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('veri.json');
    expect(JSON.parse(readFileSync((await dl.path())!, 'utf8'))).toEqual({ b: [1, 2], a: { z: true, y: null } });
  });

  test('JSON → CSV ve TypeScript, ağaç görünümü', async ({ page }) => {
    await page.goto('/json-bicimlendir/');
    await page.locator('#input').fill('[{"ad":"Ali","yas":30},{"ad":"Ayşe, K.","yas":null,"not":"x"}]');
    await page.locator('#btn-csv').click();
    await expect(page.locator('#output')).toHaveValue('ad,yas,not\nAli,30,\n"Ayşe, K.",,x');
    await page.locator('#btn-ts').click();
    const ts = await page.locator('#output').inputValue();
    expect(ts).toContain('export interface');
    expect(ts).toContain('ad: string;');
    expect(ts).toContain('not?: string;');
    await page.locator('#btn-tree').click();
    await expect(page.locator('#tree')).toBeVisible();
    await expect(page.locator('#tree .jb-key').first()).toBeVisible();

    await page.locator('#input').fill('{"a":1}');
    await page.locator('#btn-csv').click();
    await expect(page.locator('#error')).toContainText('nesnelerden oluşan bir dizi');
  });

  test('.json dosyası yüklenir', async ({ page }) => {
    await page.goto('/json-bicimlendir/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'musteri.json', mimeType: 'application/json', buffer: Buffer.from('{"x":1}') });
    await expect(page.locator('#input')).toHaveValue('{"x":1}');
    await page.locator('#btn-format').click();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('musteri.json');
  });
});
