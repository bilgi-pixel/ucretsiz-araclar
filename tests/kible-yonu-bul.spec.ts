import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/kible-yonu-bul/';
async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}
async function manual(page: Page, lat: string, lon: string) {
  await page.locator('#src-manual').check();
  await page.locator('#lat').fill(lat);
  await page.locator('#lon').fill(lon);
  await page.locator('#calc').click();
}

test.describe('Kıble Yönü Bulma', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent())!.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="kible-yonu-bul-' + s + '"]')).toHaveCount(1);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0); // araç kutusunun içinde reklam yok
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    for (const t of await page.locator('script[type="application/ld+json"]').allInnerTexts()) JSON.parse(t);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-badges')).toContainText('Konumunuz cihazdan çıkmaz');
    // reklam A araç kutusunun altında
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="kible-yonu-bul-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
    await expect(page.locator('#params-line')).toContainText('güncellendi');
  });

  test('bilinen değerler (elle koordinat): İstanbul, Ankara, İzmir, Van, Edirne, Londra', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    const cases: [string, string, string, string | null][] = [
      ['41,0082', '28,9784', '151,6°', '2.405 km'],
      ['39,9334', '32,8597', '160,2°', '2.162 km'],
      ['38,4237', '27,1428', '143,7°', '2.246 km'],
      ['38,5012', '43,3729', '191,1°', '1.929 km'],
      ['41,6771', '26,5557', '147,0°', '2.572 km'],
      ['51,5074', '-0,1278', '119,0°', null],
    ];
    for (const [lat, lon, bearing, km] of cases) {
      await manual(page, lat, lon);
      await expect(page.locator('#result')).toHaveClass(/is-active/);
      await expect(page.locator('#r-bearing')).toHaveText(bearing);
      if (km) await expect(page.locator('#r-km')).toHaveText(km);
    }
    // İstanbul pusula açısı: gerçek açıdan doğu sapma kadar küçük (WMM2025, Türkiye'de ~5,5–7°)
    await manual(page, '41.0082', '28.9784');
    const st = await page.evaluate(() => (window as any).__kibleYonuBulTest());
    expect(st.dec).toBeGreaterThan(5);
    expect(st.dec).toBeLessThan(7.5);
    expect(st.compass).toBeCloseTo(st.bearing - st.dec, 5);
    expect(external).toEqual([]);
    noErrors();
  });

  test('il listesi: İstanbul seçilince sonuç gelir; kıble saati Diyanet ile aynı (5 Kasım 2026)', async ({ page }) => {
    // Beklenen saatler Diyanet il sayfalarındaki 5 Kasım 2026 "Kıble Zamanı" değerleridir.
    await page.clock.setFixedTime(new Date('2026-11-05T09:00:00+03:00'));
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    expect(await page.locator('#il option').count()).toBe(82); // yer tutucu + 81 il
    await page.locator('#il').selectOption({ label: 'İstanbul (34)' });
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-bearing')).toHaveText('151,6°');
    await expect(page.locator('#r-km')).toHaveText('2.405 km');
    await expect(page.locator('#r-time')).toContainText('11:05');
    await expect(page.locator('#r-time')).toContainText('TSİ');
    await expect(page.locator('#r-dir')).toContainText('Güney-güneydoğu');
    await page.locator('#ilce').selectOption('Kadıköy');
    await expect(page.locator('#r-place')).toContainText('İstanbul – Kadıköy');
    await page.locator('#il').selectOption({ label: 'Ankara (06)' });
    await expect(page.locator('#r-bearing')).toHaveText('160,2°');
    await expect(page.locator('#r-time')).toContainText('11:23');
    for (const [il, saat] of [['İzmir (35)', '10:43'], ['Edirne (22)', '10:55'], ['Diyarbakır (21)', '12:07'], ['Adana (01)', '11:31']]) {
      await page.locator('#il').selectOption({ label: il });
      await expect(page.locator('#r-time')).toContainText(saat);
    }
    // Güneşin Kâbe üstünde olduğu anlar (2027, hesap; yaklaşık uyarısı görünür)
    await expect(page.locator('#sun-list')).toContainText('28 Mayıs 2027');
    await expect(page.locator('#sun-list')).toContainText('12:18');
    await expect(page.locator('#sun-list')).toContainText('16 Temmuz 2027');
    await expect(page.locator('#sun-list')).toContainText('12:27');
    await expect(page.locator('#sun-approx')).toBeVisible();
    expect(external).toEqual([]);
    noErrors();
  });

  test('güneş Kâbe üstünde kartı geçmiş anı göstermez; cihaz saat dilimi UTC+5:30 biçiminde yazılır', async ({ browser }) => {
    const ctx = await browser.newContext({ timezoneId: 'Asia/Kolkata' });
    const page = await ctx.newPage();
    await page.clock.setFixedTime(new Date('2027-06-10T09:00:00+03:00'));
    await open(page);
    await expect(page.locator('#sun-list')).toContainText('16 Temmuz 2027');
    await expect(page.locator('#sun-list')).not.toContainText('28 Mayıs 2027');
    await manual(page, '28,6139', '77,2090'); // Yeni Delhi
    await expect(page.locator('#r-bearing')).toHaveText('266,6°');
    await expect(page.locator('#r-time')).toContainText('UTC+5:30');
    await ctx.close();
  });

  test('hatalı ve bozuk girişler Türkçe, çözüm öneren hata verir', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Listeden bir il seçin');
    await expect(page.locator('#result')).toBeHidden();
    await manual(page, '', '');
    await expect(page.locator('#error')).toContainText('Enlem ve boylamı birlikte yazın');
    await manual(page, 'abc', '28');
    await expect(page.locator('#error')).toContainText('okunamadı');
    await manual(page, '95', '28');
    await expect(page.locator('#error')).toContainText('−90 ile 90');
    await manual(page, '41', '200');
    await expect(page.locator('#error')).toContainText('−180 ile 180');
    await expect(page.locator('#result')).toBeHidden();
    // Harita biçimi tek alana yapıştırılabilir; DMS de okunur
    await manual(page, '41.0082, 28.9784', '');
    await expect(page.locator('#r-bearing')).toHaveText('151,6°');
    await manual(page, '41° 0\' 29.52" K', '28° 58\' 42.24" D');
    await expect(page.locator('#r-bearing')).toHaveText('151,6°');
    noErrors();
  });

  test('kenar durumlar: Kâbe\'ye çok yakın, kutup, düşük doğruluklu konum', async ({ page, context }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await manual(page, '21.4230', '39.8265');
    await expect(page.locator('#warn')).toBeVisible();
    await expect(page.locator('#warn')).toContainText('metre');
    await expect(page.locator('#r-km')).toContainText(' m');
    await manual(page, '85', '-40');
    await expect(page.locator('#warn')).toContainText(/kutup/i);
    await manual(page, '90', '0');
    await expect(page.locator('#warn')).toContainText('Kutup noktasında');
    await manual(page, '39.93', '32.86');
    await expect(page.locator('#warn')).toBeHidden();
    // Konum izni verilmiş, doğruluk 2,5 km
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 39.9334, longitude: 32.8597, accuracy: 2500 });
    await page.locator('#src-geo').check();
    await expect(page.locator('#calc')).toBeHidden();
    await page.locator('#geo').click();
    await expect(page.locator('#r-bearing')).toHaveText('160,2°');
    await expect(page.locator('#warn')).toContainText('Konum doğruluğu düşük');
    await expect(page.locator('#geo-status')).toContainText('hiçbir yere gönderilmedi');
    noErrors();
  });

  test('konum izni reddedilince çözüm öneren hata', async ({ page, context }) => {
    await context.clearPermissions();
    await open(page);
    await page.evaluate(() => {
      // Tarayıcının izin reddini taklit et (PERMISSION_DENIED = 1)
      (navigator.geolocation as any).getCurrentPosition = (_ok: any, err: any) => setTimeout(() => err({ code: 1, message: 'denied' }), 10);
    });
    await page.locator('#src-geo').check();
    await page.locator('#geo').click();
    await expect(page.locator('#error')).toContainText('Konum izni verilmedi');
    await expect(page.locator('#error')).toContainText('listesinden');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('canlı pusula: izin reddi, sonra yön olayıyla ±3° içinde hizalanma onayı, dışında yönlendirme', async ({ page, context }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#il').selectOption({ label: 'İstanbul (34)' });
    await expect(page.locator('#live-box')).toBeVisible();
    const needsPermission = await page.evaluate(() => typeof (DeviceOrientationEvent as any).requestPermission === 'function');
    if (needsPermission) {
      // İzin verilmeden: çözüm öneren mesaj, canlı mod başlamaz
      await page.locator('#live-start').click();
      await expect(page.locator('#live-status')).toContainText('izni verilmedi');
      await expect(page.locator('#live-stop')).toBeHidden();
      await context.grantPermissions(['accelerometer', 'gyroscope', 'magnetometer']);
    }
    await page.locator('#live-start').click();
    await expect(page.locator('#live-stop')).toBeVisible();
    const st = await page.evaluate(() => (window as any).__kibleYonuBulTest());
    const fire = (alpha: number) => page.evaluate((a) => {
      const ev = new DeviceOrientationEvent('deviceorientationabsolute', { alpha: a, beta: 0, gamma: 0, absolute: true });
      window.dispatchEvent(ev);
    }, alpha);
    // Manyetik başlık = pusula açısı  ⇒  alpha = 360 − pusula açısı
    await fire(360 - st.compass);
    await expect(page.locator('#live-box')).toHaveClass(/is-aligned/);
    await expect(page.locator('#live-readout')).toContainText('Kıbleye dönüksünüz');
    await fire(360 - (st.compass - 40));
    await expect(page.locator('#live-box')).not.toHaveClass(/is-aligned/);
    await expect(page.locator('#live-readout')).toContainText('sağa dönün');
    await page.locator('#live-stop').click();
    await expect(page.locator('#live-start')).toBeVisible();
    noErrors();
  });

  test('klavyeyle kullanım ve 360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    const external = trackExternalRequests(page);
    await open(page);
    await page.locator('#src-list').focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#src-manual')).toBeChecked();
    await expect(page.locator('#pane-manual')).toBeVisible();
    await page.locator('#lat').focus();
    await page.keyboard.type('38,4237');
    await page.keyboard.press('Tab');
    await page.keyboard.type('27,1428');
    await page.keyboard.press('Enter');
    await expect(page.locator('#r-bearing')).toHaveText('143,7°');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(external).toEqual([]);
  });
});
