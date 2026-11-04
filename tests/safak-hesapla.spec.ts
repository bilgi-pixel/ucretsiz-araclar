import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/safak-hesapla/';
// Testlerde "bugün" Türkiye saatiyle 1 Mart 2027 (Pazartesi) olarak sabitlenir.
const NOW = new Date('2027-03-01T10:00:00+03:00');

async function open(page, url = URL) {
  await page.goto(url);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}
async function calc(page, { tur = 'er6', sevk, gun = '', yol = '', kullanilan = '', kalan = '', ceza = '', odul = '' }) {
  await page.locator('#tur').selectOption(tur);
  await page.locator('#sevk').fill(sevk);
  if (await page.locator('#gun').isVisible()) await page.locator('#gun').fill(gun);
  await page.locator('#yol').fill(yol);
  await page.locator('#kullanilan').fill(kullanilan);
  await page.locator('#kalan').fill(kalan);
  await page.locator('#ceza').fill(ceza);
  await page.locator('#odul').fill(odul);
  await page.locator('#calc').click();
}

test.describe('Şafak Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await open(page);
    await expect(page.locator('h1')).toContainText('Şafak Hesaplama');
    const words = (await page.locator('.ba-content').textContent())!.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="safak-hesapla-' + s + '"]')).toHaveCount(1);
    const lds = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    const types = lds.map((t) => JSON.parse(t)['@type']);
    expect(types).toContain('FAQPage');
    expect(types).toContain('SoftwareApplication');
    await expect(page.locator('.ba-badges')).toContainText('cihazınızdan çıkmaz');
    await expect(page.locator('#params-line')).toContainText('7179');
    // reklam A araç kutusunun dışında ve altında; araç kutusunun içinde reklam yok
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="safak-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
  });

  test('bilinen değer: 30.11.2026 + 6 ay → terhis 30.05.2027, 01.03.2027 için şafak 90; PNG ve .ics indirilir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.clock.setFixedTime(NOW);
    await open(page);
    await calc(page, { sevk: '2026-11-30' });
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-label')).toHaveText('Şafak');
    await expect(page.locator('#r-safak')).toHaveText('90');
    await expect(page.locator('#r-terhis')).toHaveText('30.05.2027 Pazar');
    await expect(page.locator('#r-total')).toHaveText('181 gün');
    await expect(page.locator('#r-elapsed')).toHaveText('91 gün');
    await expect(page.locator('#r-pct')).toContainText('%50,3');
    await expect(page.locator('#r-weeks')).toHaveText('12 hafta 6 gün');
    await expect(page.locator('#r-months')).toHaveText('2 ay 29 gün');
    await expect(page.locator('#r-weekends')).toHaveText('13');
    await expect(page.locator('#r-bar')).toHaveAttribute('aria-valuenow', '50');
    await expect(page.locator('#r-miles li[data-key="safak100"]')).toContainText('19.02.2027');
    await expect(page.locator('#r-miles li[data-key="safak30"]')).toContainText('30.04.2027');
    await expect(page.locator('#r-miles li[data-key="yari"]')).toContainText('bugün');
    // ayarlar URL'ye yazılır (yalnızca tarih ve sayılar)
    expect(page.url()).toContain('tur=er6');
    expect(page.url()).toContain('sevk=2026-11-30');

    const [png] = await Promise.all([page.waitForEvent('download'), page.locator('#png').click()]);
    expect(png.suggestedFilename()).toBe('safak-90.png');
    const buf = readFileSync((await png.path())!);
    expect(buf.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(buf.length).toBeGreaterThan(5000);

    const [ics] = await Promise.all([page.waitForEvent('download'), page.locator('#ics').click()]);
    expect(ics.suggestedFilename()).toBe('safak-terhis-20270530.ics');
    const txt = readFileSync((await ics.path())!, 'utf8');
    expect(txt).toContain('BEGIN:VCALENDAR');
    expect(txt).toContain('DTSTART;VALUE=DATE:20270530');
    expect(txt).toContain('DTSTART;VALUE=DATE:20270430'); // şafak 30
    expect(txt).not.toContain('DTSTART;VALUE=DATE:20270219'); // geçmiş şafak 100 eklenmez
    expect(external).toEqual([]);
    noErrors();
  });

  test('ay sonu, artık yıl, 12 ay, ceza, izin ve klavye ile gönderme', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.clock.setFixedTime(NOW);
    await open(page);
    // 31.08.2026 + 6 ay → 28.02.2027; bugün 01.03.2027 → terhis geçti
    await calc(page, { sevk: '2026-08-31' });
    await expect(page.locator('#r-terhis')).toHaveText('28.02.2027 Pazar');
    await expect(page.locator('#r-status')).toContainText('Terhis oldunuz');
    await expect(page.locator('#r-label')).toHaveText('Terhis oldunuz');
    // 15.01.2027 + 12 ay → 15.01.2028
    await calc(page, { tur: 'ys12', sevk: '2027-01-15' });
    await expect(page.locator('#r-terhis')).toHaveText('15.01.2028 Cumartesi');
    // uzun dönem (md. 5/3): ek 6 ay terhise hak kazanılan tarihten sayılır → 31.08.2026 → 28.02.2027 → 28.08.2027
    await calc(page, { tur: 'er12', sevk: '2026-08-31' });
    await expect(page.locator('#r-terhis')).toHaveText('28.08.2027 Cumartesi');
    await expect(page.locator('#r-safak')).toHaveText('180');
    // yedek subay 12 ay doğrudan eklenir → 31.08.2027
    await calc(page, { tur: 'ys12', sevk: '2026-08-31' });
    await expect(page.locator('#r-terhis')).toHaveText('31.08.2027 Salı');
    // uzun dönemde ceza ilk 6 ayın sonunu öteler: 30.05.2027 + 3 = 02.06.2027, + 6 ay → 02.12.2027
    await calc(page, { tur: 'er12', sevk: '2026-11-30', ceza: '3' });
    await expect(page.locator('#r-terhis')).toHaveText('02.12.2027 Perşembe');
    await expect(page.locator('#r-notes')).toContainText('md. 5/3');
    // artık yıl: 31.08.2027 + 6 ay → 29.02.2028; sevk gelecekte → teslim olmaya 183 gün
    await calc(page, { sevk: '2027-08-31' });
    await expect(page.locator('#r-terhis')).toHaveText('29.02.2028 Salı');
    await expect(page.locator('#r-label')).toHaveText('Teslim olmaya');
    await expect(page.locator('#r-safak')).toHaveText('183');
    await expect(page.locator('#r-status')).toContainText('teslim olmaya 183 gün');
    // 3 gün ceza → terhis 3 gün sonraya kayar
    await calc(page, { sevk: '2026-11-30', ceza: '3' });
    await expect(page.locator('#r-terhis')).toHaveText('02.06.2027 Çarşamba');
    await expect(page.locator('#r-safak')).toHaveText('93');
    // 6 gün kalan izin + 2 gün yol izni şafaktan düşülür, terhis değişmez
    await calc(page, { sevk: '2026-11-30', kalan: '6', yol: '2', kullanilan: '4' });
    await expect(page.locator('#r-terhis')).toHaveText('30.05.2027 Pazar');
    await expect(page.locator('#r-cikis')).toHaveText('22.05.2027 Cumartesi');
    await expect(page.locator('#r-safak')).toHaveText('82');
    await expect(page.locator('#r-inunit')).toHaveText('87 gün');
    // klavye: alan içinde Enter formu gönderir
    await page.locator('#ceza').fill('1');
    await page.locator('#ceza').press('Enter');
    await expect(page.locator('#r-safak')).toHaveText('83');
    // bedelli: 28 gün, yaklaşık uyarısı görünür
    await calc(page, { tur: 'bedelli', sevk: '2027-02-10' });
    await expect(page.locator('#r-terhis')).toHaveText('10.03.2027 Çarşamba');
    await expect(page.locator('#r-safak')).toHaveText('9');
    await expect(page.locator('#r-notes')).toContainText('Yaklaşık');
    await expect(page.locator('#tur-note')).toContainText('yaklaşık');
    // özel gün sayısı
    await calc(page, { tur: 'ozel', sevk: '2027-02-20', gun: '21' });
    await expect(page.locator('#r-terhis')).toHaveText('13.03.2027 Cumartesi');
    await expect(page.locator('#r-safak')).toHaveText('12');
    noErrors();
  });

  test('hatalı ve bozuk girdiler Türkçe, çözüm öneren hata verir', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.clock.setFixedTime(NOW);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Sevk (celp) tarihini girin');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, { sevk: '2026-11-30', kalan: '-3' });
    await expect(page.locator('#error')).toContainText('negatif olamaz');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, { sevk: '2026-11-30', kullanilan: 'abc' });
    await expect(page.locator('#error')).toContainText('okunamadı');
    await calc(page, { sevk: '2026-11-30', yol: '20' });
    await expect(page.locator('#error')).toContainText('0 ile 15 gün arasında');
    // 7 günlük yol izni geçerlidir (askerlik için 4 günlük üst sınır doğrulanamadı; yalnızca 15 gün doğrulama sınırı)
    await calc(page, { sevk: '2026-11-30', yol: '7' });
    await expect(page.locator('#r-safak')).toHaveText('83');
    await calc(page, { sevk: '2026-11-30', ceza: '2,5' });
    await expect(page.locator('#error')).toContainText('tam sayı');
    await calc(page, { sevk: '2026-11-30', kalan: '200' });
    await expect(page.locator('#error')).toContainText('hizmet süresinden fazla olamaz');
    await calc(page, { tur: 'ozel', sevk: '2026-11-30', gun: '' });
    await expect(page.locator('#error')).toContainText('gün olarak girin');
    await calc(page, { tur: 'dovizle', sevk: '2026-11-30', gun: '' });
    await expect(page.locator('#error')).toContainText('md. 39');
    await expect(page.locator('#result')).toBeHidden();
    // düzeltince hata kalkar
    await calc(page, { sevk: '2026-11-30' });
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#r-safak')).toHaveText('90');
    noErrors();
  });

  test('URL parametresi ve localStorage ile aynı sayaca dönülür; bozuk kayıt çökertmez', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.clock.setFixedTime(NOW);
    await open(page, URL + '?tur=er6&sevk=2026-11-30&kalan=6&yol=2');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-safak')).toHaveText('82');
    const saved = await page.evaluate(() => localStorage.getItem('ba-safak-hesapla'));
    expect(JSON.parse(saved!)).toMatchObject({ tur: 'er6', sevk: '2026-11-30', kalan: '6', yol: '2' });
    // parametresiz açılışta son ayar localStorage'dan gelir
    await open(page);
    await expect(page.locator('#r-safak')).toHaveText('82');
    await expect(page.locator('#sevk')).toHaveValue('2026-11-30');
    // bozuk URL parametresi (30 Şubat) sonuç üretmez, çökmez
    await page.evaluate(() => localStorage.removeItem('ba-safak-hesapla'));
    await open(page, URL + '?tur=xx&sevk=2027-02-30&kalan=abc');
    await expect(page.locator('#result')).toBeHidden();
    // bozuk localStorage kaydı yok sayılır
    await page.evaluate(() => localStorage.setItem('ba-safak-hesapla', '{bozuk json'));
    await open(page);
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, { sevk: '2026-11-30' });
    await expect(page.locator('#r-safak')).toHaveText('90');
    // Temizle kaydı siler
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem('ba-safak-hesapla'))).toBeNull();
    noErrors();
  });

  test('bedelli ücret kutusu: 300.000 × 1,575512 = 472.653,60 TL; süresi dolunca uyarı', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-11-04T12:00:00+03:00'));
    await open(page);
    await expect(page.locator('#bedelli-fee')).toHaveText('472.653,60 TL');
    await expect(page.locator('#bedelli-period')).toContainText('1,575512');
    await expect(page.locator('#bedelli-warn')).toBeHidden();
    await page.clock.setFixedTime(NOW);
    await open(page);
    await expect(page.locator('#bedelli-warn')).toBeVisible();
    await expect(page.locator('#bedelli-warn')).toContainText('geçerlilik süresi');
  });

  test('360px genişlikte yatay taşma yok (sonuç ve uzun bağlantı görünürken)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.clock.setFixedTime(NOW);
    await open(page, URL + '?tur=er6&sevk=2026-11-30&kullanilan=12&kalan=6&yol=2&ceza=3&odul=1');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-link')).toContainText('safak-hesapla');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('Şafak Hesaplama – saat dilimi (Los Angeles cihazı)', () => {
  test.use({ timezoneId: 'America/Los_Angeles' });
  test('İstanbul\'da 1 Mart 00.30 iken (LA\'da hâlâ 28 Şubat) şafak 90', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2027-03-01T00:30:00+03:00'));
    await open(page);
    await calc(page, { sevk: '2026-11-30' });
    await expect(page.locator('#r-safak')).toHaveText('90');
  });
});

test.describe('Şafak Hesaplama – saat dilimi (Tokyo cihazı)', () => {
  test.use({ timezoneId: 'Asia/Tokyo' });
  test('İstanbul\'da 28 Şubat 23.30 iken (Tokyo\'da 1 Mart) şafak 91', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2027-02-28T23:30:00+03:00'));
    await open(page);
    await calc(page, { sevk: '2026-11-30' });
    await expect(page.locator('#r-safak')).toHaveText('91');
  });
});
