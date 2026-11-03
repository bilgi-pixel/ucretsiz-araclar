import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(__filename);
const { PNG } = req('pngjs');
const jsQR = req(join(__dirname, '..', 'web', 'vendor', 'jsqr@1.4.0', 'jsQR.js'));

/** İndirilen PNG'yi jsQR ile çözer. */
function decode(path: string): string | null {
  const png = PNG.sync.read(readFileSync(path));
  const r = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  return r ? r.data : null;
}

test.describe('Wi-Fi ve Kartvizit QR Kodu', () => {
  test('Wi-Fi: PNG iner ve jsQR ile doğru metin okunur', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/qr-wifi/');
    await page.locator('#f-wifi-ssid').fill('Ev');
    await expect(page.locator('#error')).toContainText('parolayı girin');
    await page.locator('#f-wifi-pass').fill('sifre123');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(await decode((await dl.path())!)).toBe('WIFI:T:WPA;S:Ev;P:sifre123;;');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Wi-Fi: özel karakterler kaçırılır, gizli ağ ve açık ağ', async ({ page }) => {
    await page.goto('/qr-wifi/');
    await page.locator('#f-wifi-ssid').fill('A;B');
    await page.locator('#f-wifi-pass').fill('p:a;ss"word1');
    await page.locator('#f-wifi-hidden').check();
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    let [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(await decode((await dl.path())!)).toBe(String.raw`WIFI:T:WPA;S:A\;B;P:p\:a\;ss\"word1;H:true;;`);
    await page.locator('#f-wifi-enc').selectOption('nopass');
    await page.locator('#f-wifi-hidden').uncheck();
    await page.waitForTimeout(400);
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(await decode((await dl.path())!)).toBe(String.raw`WIFI:T:nopass;S:A\;B;;`);
  });

  test('Wi-Fi: SVG iner; kısa WPA parolası uyarır', async ({ page }) => {
    await page.goto('/qr-wifi/');
    await page.locator('#f-wifi-ssid').fill('Ev');
    await page.locator('#f-wifi-pass').fill('123');
    await expect(page.locator('#error')).toContainText('en az 8 karakter');
    await page.locator('#f-wifi-pass').fill('12345678');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-svg').click()]);
    expect(readFileSync((await dl.path())!, 'utf8')).toContain('<svg');
  });

  test('Kartvizit: BEGIN:VCARD ve Türkçe ad okunur', async ({ page }) => {
    await page.goto('/qr-wifi/');
    await page.locator('#tab-vcard').click();
    await expect(page.locator('#f-wifi-ssid')).toBeHidden();
    await page.locator('#f-vc-name').fill('Çağlar Öztürk');
    await page.locator('#f-vc-org').fill('Şişli Ğ Ltd');
    await page.locator('#f-vc-email').fill('caglar@ornek.com');
    await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    const text = decode((await dl.path())!)!;
    expect(text).toContain('BEGIN:VCARD');
    expect(text).toContain('FN:Çağlar Öztürk');
    expect(text).toContain('N:Öztürk;Çağlar;;;');
    expect(text).toContain('END:VCARD');
  });

  test('Konum, e-posta, SMS ve etkinlik biçimleri; hatalı girdi Türkçe uyarır', async ({ page }) => {
    await page.goto('/qr-wifi/');
    const read = async () => {
      await page.waitForTimeout(400); // 120 ms'lik çizim gecikmesi geçsin
      await expect(page.locator('#qr-canvas')).toHaveAttribute('data-ready', '1');
      const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
      return decode((await dl.path())!);
    };
    await page.locator('#tab-geo').click();
    await page.locator('#f-geo-lat').fill('95');
    await page.locator('#f-geo-lon').fill('40,2306');
    await expect(page.locator('#error')).toContainText('Enlem -90 ile 90');
    await page.locator('#f-geo-lat').fill('37,9144');
    expect(await read()).toBe('geo:37.9144,40.2306');
    await page.locator('#tab-email').click();
    await page.locator('#f-em-to').fill('bilgi@firma.com');
    await page.locator('#f-em-subject').fill('Merhaba dünya');
    expect(await read()).toBe('mailto:bilgi@firma.com?subject=Merhaba%20d%C3%BCnya');
    await page.locator('#tab-sms').click();
    await page.locator('#f-sms-tel').fill('+90 532 000 00 00');
    await page.locator('#f-sms-body').fill('KAYIT');
    expect(await read()).toBe('SMSTO:+905320000000:KAYIT');
    await page.locator('#tab-event').click();
    await page.locator('#f-ev-title').fill('Açılış');
    await page.locator('#f-ev-start').fill('2026-12-01T14:30');
    const ev = await read();
    expect(ev).toContain('BEGIN:VEVENT');
    expect(ev).toContain('DTSTART:20261201T143000');
  });
});
