import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { createHash, randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';

const h = (algo: string, b: Buffer) => createHash(algo).update(b).digest('hex');

test.describe('Dosya Hash Hesaplama', () => {
  test('metin sekmesi: boş metin ve abc test vektörleri', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/dosya-hash/');
    await page.locator('#tab-text').click();
    const cell = (a: string) => page.locator(`#t-out [data-algo="${a}"] code`);
    await expect(cell('md5')).toHaveText('d41d8cd98f00b204e9800998ecf8427e');
    await page.locator('#t-in').fill('abc');
    await expect(cell('md5')).toHaveText('900150983cd24fb0d6963f7d28e17f72');
    await expect(cell('sha1')).toHaveText('a9993e364706816aba3e25717850c26c9cd0d89d');
    await expect(cell('sha256')).toHaveText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    await expect(cell('sha512')).toHaveText(h('sha512', Buffer.from('abc')));
    // beklenen hash ile karşılaştırma (boşluklu, büyük harfli)
    await page.locator('#expected').fill('BA7816BF 8F01CFEA 414140DE 5DAE2223 B00361A3 96177A9C B410FF61 F20015AD');
    await expect(page.locator('#t-out [data-algo="sha256"] [data-match]')).toHaveAttribute('data-match', '1');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('dosyalar: farklı boyutlar Node crypto ile aynı özeti verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/dosya-hash/');
    // blok sınırları (55/56/64/111/112/128) ve 4 MB dilim sınırını aşan dosya
    const sizes = [0, 1, 55, 56, 64, 111, 112, 128, 4 * 1024 * 1024 + 17];
    const bufs = sizes.map((n) => randomBytes(n));
    await page.locator('#drop input[type=file]').setInputFiles(bufs.map((b, i) => ({ name: `d${i}.bin`, mimeType: 'application/octet-stream', buffer: b })));
    await expect(page.locator('#f-body tr')).toHaveCount(sizes.length);
    for (let i = 0; i < sizes.length; i++) {
      const row = page.locator(`#f-body tr[data-name="d${i}.bin"]`);
      for (const a of ['md5', 'sha1', 'sha256', 'sha512']) {
        await expect(row.locator(`td[data-algo="${a}"]`)).toHaveText(h(a, bufs[i]), { timeout: 20000 });
      }
    }
    // beklenen hash: eşleşme ve eşleşmeme
    await page.locator('#expected').fill(h('sha256', bufs[3]));
    await expect(page.locator('#f-body tr[data-name="d3.bin"] td[data-match]')).toHaveAttribute('data-match', '1');
    await expect(page.locator('#f-body tr[data-name="d4.bin"] td:last-child')).toHaveText('Eşleşmedi');
    // CSV
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-csv').click()]);
    const csv = readFileSync((await dl.path())!, 'utf8');
    expect(dl.suggestedFilename()).toBe('hash-sonuclari.csv');
    expect(csv).toContain(h('sha256', bufs[3]));
    expect(csv).toContain('d3.bin');
    expect(external).toEqual([]);
  });

  test('algoritma seçilmezse uyarır, geçersiz beklenen hash bildirilir', async ({ page }) => {
    await page.goto('/dosya-hash/');
    await page.locator('#expected').fill('xyz');
    await expect(page.locator('#expected-note')).toContainText('geçersiz');
    for (const a of ['md5', 'sha1', 'sha256', 'sha512']) await page.locator(`#alg-${a}`).uncheck();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'a.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba') });
    await expect(page.locator('#error')).toContainText('En az bir algoritma seçin');
    await page.locator('#alg-sha256').check();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#f-body tr td[data-algo="sha256"]')).toHaveText(h('sha256', Buffer.from('merhaba')));
  });
});
