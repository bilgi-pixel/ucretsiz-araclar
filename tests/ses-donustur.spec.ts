import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

/** Node ile 16-bit PCM sinüs WAV üretir: baş/son sessizlik (sn) ve genlik ayarlanabilir. */
function makeWav({ seconds = 3, rate = 44100, channels = 2, amp = 0.25, lead = 0, tail = 0, freq = 440 } = {}) {
  const n = Math.round(seconds * rate);
  const buf = Buffer.alloc(44 + n * channels * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * channels * 2, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(channels, 22);
  buf.writeUInt32LE(rate, 24); buf.writeUInt32LE(rate * channels * 2, 28); buf.writeUInt16LE(channels * 2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * channels * 2, 40);
  const s0 = Math.round(lead * rate), s1 = n - Math.round(tail * rate);
  for (let i = 0; i < n; i++) {
    const v = i >= s0 && i < s1 ? Math.round(Math.sin((2 * Math.PI * freq * i) / rate) * amp * 32767) : 0;
    for (let c = 0; c < channels; c++) buf.writeInt16LE(v, 44 + (i * channels + c) * 2);
  }
  return buf;
}

// 3 sn, 44,1 kHz, stereo fikstür (yoksa üretilir)
const fixture = fx('ses-donustur-3sn.wav');
if (!existsSync(fixture)) { mkdirSync(dirname(fixture), { recursive: true }); writeFileSync(fixture, makeWav()); }

/** WAV başlığını doğrular, en büyük genliği (tam ölçeğe oranla) hesaplar. */
function readWav(b: Buffer) {
  expect(b.toString('ascii', 0, 4)).toBe('RIFF');
  expect(b.toString('ascii', 8, 12)).toBe('WAVE');
  expect(b.toString('ascii', 12, 16)).toBe('fmt ');
  expect(b.readUInt16LE(20)).toBe(1); // PCM
  expect(b.toString('ascii', 36, 40)).toBe('data');
  const channels = b.readUInt16LE(22), rate = b.readUInt32LE(24), bits = b.readUInt16LE(34), data = b.readUInt32LE(40);
  expect(b.readUInt16LE(32)).toBe(channels * (bits / 8)); // blockAlign
  expect(b.readUInt32LE(28)).toBe(rate * channels * (bits / 8)); // byteRate
  expect(b.length).toBe(44 + data);
  let peak = 0;
  const step = bits / 8;
  for (let o = 44; o + step <= b.length; o += step) {
    const v = bits === 16 ? b.readInt16LE(o) : b.readIntLE(o, 3);
    peak = Math.max(peak, Math.abs(v));
  }
  const full = bits === 16 ? 32768 : 8388608;
  return { channels, rate, bits, data, seconds: data / (rate * channels * step), peak: peak / full };
}

test.describe('Ses Dönüştürücü', () => {
  test('WAV (44,1 kHz stereo) → 48 kHz mono 16 bit WAV; başlık ve süre doğru, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ses-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fixture);
    await expect(page.locator('#files li')).toContainText('0:03.00');
    await expect(page.locator('#files li')).toContainText('stereo');
    await page.locator('#opt-rate').selectOption('48000');
    await page.locator('#opt-channels').selectOption('1');
    await expect(page.locator('#opt-bits')).toHaveValue('16');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 20_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button').first().click()]);
    expect(dl.suggestedFilename()).toBe('ses-donustur-3sn-donusturuldu.wav');
    const w = readWav(readFileSync((await dl.path())!));
    expect(w.channels).toBe(1);
    expect(w.rate).toBe(48000);
    expect(w.bits).toBe(16);
    expect(Math.abs(w.data - 288000)).toBeLessThan(400); // 3 sn × 48000 × 2 bayt
    expect(w.peak).toBeGreaterThan(0.2); // ses boş değil (≈0,25 genlik)
    expect(w.peak).toBeLessThan(0.3);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('24 bit WAV + normalize + baş/son sessizlik kırpma', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/ses-donustur/');
    // 0,5 sn sessizlik + 2 sn ton (genlik 0,2) + 0,5 sn sessizlik, mono
    const buffer = makeWav({ seconds: 3, channels: 1, amp: 0.2, lead: 0.5, tail: 0.5 });
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'konusma.wav', mimeType: 'audio/wav', buffer });
    await expect(page.locator('#files li')).toContainText('mono');
    await page.locator('#opt-bits').selectOption('24');
    await page.locator('#opt-normalize').check();
    await page.locator('#opt-trim').check();
    await expect(page.locator('#trim-level')).toBeVisible();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 20_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button').first().click()]);
    expect(dl.suggestedFilename()).toBe('konusma-donusturuldu.wav');
    const w = readWav(readFileSync((await dl.path())!));
    expect(w.bits).toBe(24);
    expect(w.channels).toBe(1);
    expect(w.rate).toBe(44100);
    expect(w.seconds).toBeGreaterThan(2.0); // 2 sn ton + kenar payı
    expect(w.seconds).toBeLessThan(2.2);
    const target = Math.pow(10, -1 / 20); // −1 dBFS
    expect(Math.abs(w.peak - target)).toBeLessThan(0.01);
    expect(external).toEqual([]);
  });

  test('WebM/Opus çıktı EBML başlığıyla iner; çıktı tekrar WAV\'a çevrilebilir', async ({ page }) => {
    test.setTimeout(60_000);
    const external = trackExternalRequests(page);
    await page.goto('/ses-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fixture);
    const opt = page.locator('#opt-format option[value=webm]');
    test.skip(await opt.isDisabled(), 'Tarayıcı WebM kaydını desteklemiyor');
    await page.locator('#opt-format').selectOption('webm');
    await expect(page.locator('#grp-opus')).toBeVisible();
    await expect(page.locator('#grp-wav')).toBeHidden();
    await expect(page.locator('#realtime-note')).toBeVisible();
    await page.locator('#opt-bitrate').selectOption('64');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button').first().click()]);
    expect(dl.suggestedFilename()).toBe('ses-donustur-3sn.webm');
    const webm = readFileSync((await dl.path())!);
    expect(Array.from(webm.subarray(0, 4))).toEqual([0x1a, 0x45, 0xdf, 0xa3]);
    expect(webm.length).toBeGreaterThan(2000);

    // Geri dönüşüm: üretilen WebM dosyası da kabul edilip WAV'a çevrilebilmeli.
    await page.locator('#clear').click();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'kayit.webm', mimeType: 'audio/webm', buffer: webm });
    await expect(page.locator('#files li')).toContainText('kayit.webm');
    await page.locator('#opt-format').selectOption('wav'); // seçenekler dosya eklenince görünür
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 20_000 });
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button').first().click()]);
    expect(dl2.suggestedFilename()).toBe('kayit.wav');
    const w = readWav(readFileSync((await dl2.path())!));
    expect(w.rate).toBe(44100);
    expect(w.seconds).toBeGreaterThan(2.7);
    expect(w.seconds).toBeLessThan(3.4);
    expect(external).toEqual([]);
  });

  test('toplu dönüştürme: iki dosya → iki satır ve ZIP indirilir', async ({ page }) => {
    await page.goto('/ses-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles([
      { name: 'a.wav', mimeType: 'audio/wav', buffer: makeWav({ seconds: 1, channels: 1 }) },
      { name: 'b.wav', mimeType: 'audio/wav', buffer: makeWav({ seconds: 1, channels: 2, freq: 880 }) },
    ]);
    await expect(page.locator('#files li')).toHaveCount(2, { timeout: 20_000 }); // yoğun makinede çözme yavaşlayabilir
    await expect(page.locator('#run')).toContainText('2 dosyayı dönüştür');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 20_000 });
    await expect(page.locator('#downloads li')).toHaveCount(2);
    const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('#download-zip').click()]);
    expect(zip.suggestedFilename()).toBe('ses-donusturulen.zip');
    const bytes = readFileSync((await zip.path())!);
    expect(Array.from(bytes.subarray(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);
    const text = bytes.toString('latin1');
    expect(text).toContain('a-donusturuldu.wav');
    expect(text).toContain('b-donusturuldu.wav');
  });

  test('bozuk ve boş dosya Türkçe, çözüm öneren hata verir; MP3 çıktısı sunulmaz', async ({ page }) => {
    await page.goto('/ses-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.mp3', mimeType: 'audio/mpeg', buffer: Buffer.from('bu bir ses dosyası değil, düz metin') });
    await expect(page.locator('#error')).toContainText('çözülemedi');
    await expect(page.locator('#error')).toContainText('WAV olarak');
    await expect(page.locator('#files li')).toHaveCount(0);
    await expect(page.locator('#options')).toBeHidden();
    await expect(page.locator('#actions')).toBeHidden();

    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bos.wav', mimeType: 'audio/wav', buffer: Buffer.alloc(0) });
    await expect(page.locator('#error')).toContainText('boş');

    await page.locator('#drop input[type=file]').setInputFiles(fixture);
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#opt-format option[value=mp3]')).toHaveCount(0);
    await expect(page.locator('article')).toContainText('Neden MP3 çıktısı yok?');
    expect(await page.locator('article a[href="../ses-kirp/"]').count()).toBeGreaterThanOrEqual(1); // metin içi + ilgili araçlar
  });

  test('tamamen sessiz dosya + sessizlik kırpma: boş dosya üretilmez, açıklayıcı hata verilir', async ({ page }) => {
    await page.goto('/ses-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'sessiz.wav', mimeType: 'audio/wav', buffer: makeWav({ seconds: 1, amp: 0 }) });
    await page.locator('#opt-trim').check();
    await page.locator('#run').click();
    await expect(page.locator('#error')).toContainText('tamamen sessiz');
    await expect(page.locator('#error')).toContainText('eşiği');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
  });

  test('360 px genişlikte yatay taşma yok ve içerik/reklam yapısı tamam', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/ses-donustur/');
    await page.locator('#drop input[type=file]').setInputFiles(fixture);
    await expect(page.locator('#options')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const words = await page.evaluate(() => (document.querySelector('article')!.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('article details')).toHaveCount(9);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="ses-donustur-${s}"]`)).toHaveCount(1);
  });
});
