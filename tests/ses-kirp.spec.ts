import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

/** Node ile saf sinüs WAV üretir (16-bit PCM mono 44,1 kHz). */
function makeWav(seconds: number, freq = 440, rate = 44100) {
  const n = Math.round(seconds * rate);
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(rate, 24); buf.writeUInt32LE(rate * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(Math.sin((2 * Math.PI * freq * i) / rate) * 12000), 44 + i * 2);
  return buf;
}
const fixture = fx('ses-kirp-3sn.wav');
if (!existsSync(fixture)) { mkdirSync(dirname(fixture), { recursive: true }); writeFileSync(fixture, makeWav(3)); }

/** İnen WAV'ı doğrular; süreyi data chunk boyutundan hesaplar. */
function wavInfo(path: string) {
  const b = readFileSync(path);
  expect(b.toString('ascii', 0, 4)).toBe('RIFF');
  expect(b.toString('ascii', 8, 12)).toBe('WAVE');
  expect(b.toString('ascii', 12, 16)).toBe('fmt ');
  expect(b.readUInt16LE(20)).toBe(1); // PCM
  expect(b.readUInt16LE(34)).toBe(16); // 16-bit
  expect(b.toString('ascii', 36, 40)).toBe('data');
  const ch = b.readUInt16LE(22), rate = b.readUInt32LE(24), data = b.readUInt32LE(40);
  expect(b.length).toBe(44 + data);
  return { seconds: data / (rate * ch * 2) };
}

test.describe('Ses Kesme ve Birleştirme', () => {
  test('1-2 sn aralığı kesilir, WAV başlığı doğru ve süre ≈1 sn', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ses-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles(fixture);
    await expect(page.locator('#cut-editor')).toBeVisible();
    await expect(page.locator('#cut-info')).toContainText('0:03.00');
    await page.locator('#in-start').fill('1');
    await page.locator('#in-end').fill('2');
    await expect(page.locator('#cut-len')).toContainText('0:01.00');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#cut-run').click()]);
    expect(dl.suggestedFilename()).toBe('ses-kirp-3sn-kesit.wav');
    const { seconds } = wavInfo((await dl.path())!);
    expect(seconds).toBeGreaterThan(0.98);
    expect(seconds).toBeLessThan(1.02);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('iki dosya birleştirilir → ≈6 sn', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/ses-kirp/');
    await page.locator('#tab-merge').click();
    await page.locator('#drop-merge input[type=file]').setInputFiles([fixture, fixture]);
    await expect(page.locator('#merge-list li')).toHaveCount(2);
    await expect(page.locator('#merge-total')).toContainText('0:06.00');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#merge-run').click()]);
    expect(dl.suggestedFilename()).toBe('birlesik-ses.wav');
    const { seconds } = wavInfo((await dl.path())!);
    expect(seconds).toBeGreaterThan(5.98);
    expect(seconds).toBeLessThan(6.02);
    expect(external).toEqual([]);
  });

  test('WebM/Opus çıktı (destekleniyorsa) EBML başlığıyla iner', async ({ page }) => {
    await page.goto('/ses-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles(fixture);
    await expect(page.locator('#cut-editor')).toBeVisible();
    await page.locator('#in-end').fill('1');
    const opt = page.locator('#cut-format option[value=webm]');
    test.skip(await opt.isDisabled(), 'Tarayıcı WebM kaydını desteklemiyor');
    await page.locator('#cut-format').selectOption('webm');
    const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), page.locator('#cut-run').click()]);
    expect(dl.suggestedFilename()).toBe('ses-kirp-3sn-kesit.webm');
    const head = readFileSync((await dl.path())!).subarray(0, 4);
    expect(Array.from(head)).toEqual([0x1a, 0x45, 0xdf, 0xa3]);
  });

  test('bozuk dosya Türkçe hata verir', async ({ page }) => {
    await page.goto('/ses-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.mp3', mimeType: 'audio/mpeg', buffer: Buffer.from('bu bir ses dosyası değil, düz metin') });
    await expect(page.locator('#error')).toContainText('çözülemedi');
    await expect(page.locator('#error')).toContainText('WAV olarak');
    await expect(page.locator('#cut-editor')).toBeHidden();
  });
});
