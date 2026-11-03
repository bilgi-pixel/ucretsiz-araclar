import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

const CSV = 'ad;şehir;yaş;telefon\nAyşe;İstanbul;28;0532 111 22 33\n"Çağrı, Ali";Diyarbakır;34;0412 223 04 66\n';

test.describe('CSV JSON Dönüştürücü', () => {
  test('noktalı virgüllü Türkçe CSV → JSON, doğru anahtar ve değerler', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/csv-json-donustur/');
    await page.locator('#input').fill(CSV);
    await expect(page.locator('#stats')).toContainText('2 satır · 4 sütun');
    await expect(page.locator('#stats')).toContainText('noktalı virgül');
    const data = JSON.parse(await page.locator('#output').inputValue());
    expect(data).toHaveLength(2);
    expect(Object.keys(data[0])).toEqual(['ad', 'şehir', 'yaş', 'telefon']);
    expect(data[0]).toEqual({ ad: 'Ayşe', şehir: 'İstanbul', yaş: 28, telefon: '0532 111 22 33' });
    expect(data[1].ad).toBe('Çağrı, Ali');
    // indirme
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('veri.json');
    expect(JSON.parse(readFileSync((await dl.path())!, 'utf8'))[1].şehir).toBe('Diyarbakır');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('JSON → CSV: iç içe nesneler a.b olarak düzleşir', async ({ page }) => {
    await page.goto('/csv-json-donustur/');
    await page.locator('#input').fill('[{"ad":"Ayşe","adres":{"il":"Van","ilce":"Edremit"}},{"ad":"Ömer","adres":{"il":"Bursa"}}]');
    await page.locator('#opt-out').selectOption('csv');
    await page.locator('#opt-csvdelim').selectOption(';');
    const out = (await page.locator('#output').inputValue()).split(/\r?\n/);
    expect(out[0]).toBe('ad;adres.il;adres.ilce');
    expect(out[1]).toBe('Ayşe;Van;Edremit');
    expect(out[2]).toBe('Ömer;Bursa;');
  });

  test('Markdown tablo, sütun kaldırma ve SQL çıktısı', async ({ page }) => {
    await page.goto('/csv-json-donustur/');
    await page.locator('#input').fill(CSV);
    await page.locator('#opt-out').selectOption('md');
    let md = (await page.locator('#output').inputValue()).split('\n');
    expect(md[0]).toBe('| ad | şehir | yaş | telefon |');
    expect(md[1]).toBe('| --- | --- | --- | --- |');
    expect(md[2]).toBe('| Ayşe | İstanbul | 28 | 0532 111 22 33 |');
    // telefon sütununu kaldır
    await page.getByLabel('telefon sütununu dahil et').uncheck();
    md = (await page.locator('#output').inputValue()).split('\n');
    expect(md[0]).toBe('| ad | şehir | yaş |');
    await page.locator('#opt-out').selectOption('sql');
    await page.locator('#opt-table').fill('kisiler');
    const sql = (await page.locator('#output').inputValue()).split('\n');
    expect(sql[0]).toBe("INSERT INTO `kisiler` (`ad`, `şehir`, `yaş`) VALUES ('Ayşe', 'İstanbul', 28);");
  });

  test('bozuk girdi: kapatılmamış tırnak ve geçersiz JSON Türkçe hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/csv-json-donustur/');
    await page.locator('#input').fill('a;b\n"açık tırnak;2\n');
    await expect(page.locator('#error')).toContainText('Tırnak kapatılmamış');
    await expect(page.locator('#btn-download')).toBeDisabled();
    await page.locator('#opt-in').selectOption('json');
    await page.locator('#input').fill('{"a":');
    await expect(page.locator('#error')).toContainText('JSON ayrıştırılamadı');
    expect(external).toEqual([]);
  });
});
