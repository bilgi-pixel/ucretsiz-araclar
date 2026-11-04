import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/video-boyutu-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden etkileşim olmasın
}

test.describe('Video Boyutu Hesaplama', () => {
  test('8 Mbps + 128 kbps ses × 10 dk → ≈ 609,6 MB; ham boyut bilgisi; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-vbr').fill('8');
    await page.locator('#f-vbr-unit').selectOption('mbps');
    await page.locator('#f-abr').fill('128');
    await page.locator('#f-m').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#rows')).toContainText('609,6 MB');
    await expect(page.locator('#rows')).toContainText('600 MB'); // yalnızca video akışı
    await expect(page.locator('#rows')).toContainText('9,6 MB'); // yalnızca ses akışı
    await expect(page.locator('#rows')).toContainText('8,128 Mbps');
    await expect(page.locator('#rows')).toContainText('60,96 MB'); // 1 dakika
    await expect(page.locator('#rows')).toContainText('3,66 GB'); // 1 saat
    // varsayılan 1080p / 30 fps / 24 bit ham bilgi: 1,493 Gbps, 10 dk için 111,97 GB, ≈ 187:1
    await expect(page.locator('#rows')).toContainText('1,493 Gbps');
    await expect(page.locator('#rows')).toContainText('111,97 GB');
    await expect(page.locator('#rows')).toContainText('187 : 1');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kbps birimi, saat-dakika-saniye ve 1024 tabanı', async ({ page }) => {
    await open(page);
    await page.locator('#f-vbr').fill('8000');
    await page.locator('#f-vbr-unit').selectOption('kbps');
    await page.locator('#f-abr').fill('0'); // sessiz video
    await page.locator('#f-h').fill('1');
    await page.locator('#f-s').fill('30');
    await page.locator('#calc').click();
    // 8 Mbps × 3630 sn / 8 = 3.630 MB = 3,63 GB
    await expect(page.locator('#rows')).toContainText('3,63 GB');
    await expect(page.locator('#rows')).toContainText('1 sa 30 sn');
    // 1024 tabanı: 3,63e9 / 1024³ ≈ 3,38 GB
    await page.getByLabel(/1 GB = 1024 MB/).check();
    await expect(page.locator('#result')).toBeHidden(); // taban değişince eski sonuç gizlenir
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('3,38 GB');
  });

  test('hazır profil bit hızı alanını doldurur; elle düzenleyince profil sıfırlanır', async ({ page }) => {
    await open(page);
    await page.locator('#profile').selectOption({ label: 'YouTube 1080p · 8 Mbps' });
    await expect(page.locator('#f-vbr')).toHaveValue('8');
    await expect(page.locator('#f-vbr-unit')).toHaveValue('mbps');
    await page.locator('#profile').selectOption({ label: 'Telefon 4K 30 fps · yaklaşık 50 Mbps' });
    await expect(page.locator('#f-vbr')).toHaveValue('50');
    await page.locator('#f-vbr').fill('45');
    await expect(page.locator('#profile')).toHaveValue('');
    await page.locator('#profile').selectOption({ label: 'YouTube 4K · 35-45 Mbps (40 alınır)' });
    await page.locator('#f-m').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('300,96 MB'); // 40,128 Mbps × 60 sn / 8
  });

  test('kart kapasitesi: 64 GB @ 50 Mbps → ≈ 170 dk (sessiz: 170,7 dk; 128 kbps ses: 170,2 dk)', async ({ page }) => {
    await open(page);
    await page.getByLabel('Kart kapasitesi').check();
    await expect(page.locator('#f-cap')).toBeVisible();
    await expect(page.locator('#f-m')).toBeHidden(); // kapasite modunda süre alanı yok
    await page.getByRole('button', { name: '64 GB' }).click();
    await expect(page.locator('#f-cap')).toHaveValue('64');
    await page.locator('#f-vbr').fill('50');
    await page.locator('#f-abr').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('170,7 dk');
    await expect(page.locator('#rows')).toContainText('2 sa 50 dk 40 sn');
    await page.locator('#f-abr').fill('128');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('170,2 dk');
    // 1 TB düğmesi birimi TB yapar; 1 TB @ 100 Mbps ≈ 1333 dk
    await page.getByRole('button', { name: '1 TB' }).click();
    await expect(page.locator('#f-cap-unit')).toHaveValue('tb');
    await page.locator('#f-vbr').fill('100');
    await page.locator('#f-abr').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('1.333,3 dk');
  });

  test('ters hesap: 100 MB, 10 dk, 128 kbps ses → video ≈ 1,205 Mbps; çok küçük hedefte hata', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await page.getByLabel('Gereken bit hızı').check();
    await expect(page.locator('#f-target')).toBeVisible();
    await expect(page.locator('#f-vbr')).toBeHidden();
    await page.getByRole('button', { name: '100 MB' }).click();
    await expect(page.locator('#f-target')).toHaveValue('100');
    await page.locator('#f-m').fill('10');
    await page.locator('#f-abr').fill('128');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('1,205 Mbps (1.205 kbps)');
    await expect(page.locator('#rows')).toContainText('1,139 Mbps'); // %5 paylı güvenli değer
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('1,205 Mbps');
    // 1 MB / 10 dk → toplam 13 kbps < 128 kbps ses: videoya pay kalmaz
    await page.locator('#f-target').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('çok küçük');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('ham boyut: 4K 30 fps 24 bit → 5,972 Gbps; "Gösterme" satırları kaldırır', async ({ page }) => {
    await open(page);
    await page.locator('#f-vbr').fill('40');
    await page.locator('#f-m').fill('1');
    await page.locator('#f-res').selectOption('3840x2160');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('5,972 Gbps');
    await expect(page.locator('#rows')).toContainText('Yaklaşık sıkıştırma oranı');
    await page.locator('#f-res').selectOption('');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).not.toContainText('sıkıştırılmamış');
    await expect(page.locator('#rows')).toContainText('Toplam dosya boyutu');
  });

  test('hatalı giriş Türkçe ve çözüm önerir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Video bit hızı boş');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-vbr').fill('abc');
    await page.locator('#f-m').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await expect(page.locator('#error')).toContainText('rakam ve virgül');
    await page.locator('#f-vbr').fill('-8');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await page.locator('#f-vbr').fill('8');
    await page.locator('#f-m').fill('');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Süre boş');
    await page.locator('#f-m').fill('10');
    await page.locator('#f-fps').fill('x');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('kare hızı');
    await page.locator('#f-fps').fill('30');
    await page.locator('#f-abr').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Ses bit hızı geçersiz');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('temizle varsayılan değerlere döner', async ({ page }) => {
    await open(page);
    await page.locator('#f-vbr').fill('8');
    await page.locator('#f-m').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#f-vbr')).toHaveValue('');
    await expect(page.locator('#f-abr')).toHaveValue('128');
    await expect(page.locator('#f-fps')).toHaveValue('30');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı (araç kutusunun altında), SSS ≥7, JSON-LD, rozet', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="video-boyutu-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const adBelowTool = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="video-boyutu-hesapla-a"]')!;
      return !tool.contains(ad) && Boolean(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adBelowTool).toBe(true);
    const ld = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent || '{}')));
    expect(ld.map((j) => j['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    expect(ld.find((j) => j['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.getByText('Dosyanız bilgisayarınızdan çıkmaz')).toBeVisible();
  });

  test('360px genişlikte üç modda da yatay taşma yok ve klavyeyle hesaplanır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(1);
    await page.getByLabel('Gereken bit hızı').check();
    expect(await overflow()).toBeLessThanOrEqual(1);
    await page.getByLabel('Kart kapasitesi').check();
    expect(await overflow()).toBeLessThanOrEqual(1);
    await page.getByRole('radio', { name: 'Dosya boyutu' }).check();
    // klavye: alana yaz, Enter ile gönder
    await page.locator('#f-vbr').fill('8');
    await page.locator('#f-m').fill('10');
    await page.locator('#f-m').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#rows')).toContainText('609,6 MB');
    expect(await overflow()).toBeLessThanOrEqual(1);
  });
});
