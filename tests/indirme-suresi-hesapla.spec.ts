import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/indirme-suresi-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden etkileşim olmasın
}

test.describe('İndirme Süresi Hesaplama', () => {
  test('1 GB @ 100 Mbps → 80 sn (1 dk 20 sn); dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-size').fill('1');
    await page.locator('#f-size-unit').selectOption('gb');
    await page.locator('#f-speed').fill('100');
    await page.locator('#f-speed-unit').selectOption('mbps');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#rows')).toContainText('1 dk 20 sn');
    await expect(page.locator('#rows')).toContainText('80 sn');
    await expect(page.locator('#rows')).toContainText('12,5 MB/s');
    // gerçekçi aralık: 80/0,9 = 88,9 sn ve 80/0,8 = 100 sn
    await expect(page.locator('#rows')).toContainText('1 dk 29 sn - 1 dk 40 sn');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('1024 tabanı: 1 GB @ 100 Mbps → 85,9 sn', async ({ page }) => {
    await open(page);
    await page.getByLabel(/1 GB = 1024 MB/).check();
    await page.locator('#f-size').fill('1');
    await page.locator('#f-speed').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('85,9 sn');
  });

  test('700 MB @ 8 MB/s → 87,5 sn; virgüllü giriş ve verim yüzdesi', async ({ page }) => {
    await open(page);
    await page.locator('#f-size').fill('700');
    await page.locator('#f-size-unit').selectOption('mb');
    await page.locator('#f-speed').fill('8');
    await page.locator('#f-speed-unit').selectOption('mbs');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('87,5 sn');
    await expect(page.locator('#rows')).toContainText('1 dk 28 sn');
    // virgüllü boyut + %50 verim: 4,7 GB @ 50 Mbps = 752 sn; %50 ile 1504 sn = 25 dk 4 sn
    await page.locator('#f-size').fill('4,7');
    await page.locator('#f-size-unit').selectOption('gb');
    await page.locator('#f-speed').fill('50');
    await page.locator('#f-speed-unit').selectOption('mbps');
    await page.locator('#f-eff').fill('50');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('25 dk 4 sn');
    await expect(page.locator('#rows')).toContainText('1.504 sn');
  });

  test('Mbps ↔ MB/s: 100 Mbps = 12,5 MB/s; ters yönde 12,5 MB/s = 100 Mbps', async ({ page }) => {
    await open(page);
    await page.getByLabel('Mbps ↔ MB/s').check();
    await expect(page.locator('#f-cv')).toBeVisible();
    await expect(page.locator('#f-size')).toBeHidden();
    await page.locator('#f-cv').fill('100');
    await page.locator('#f-cv-unit').selectOption('mbps');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('12,5 MB/s');
    await expect(page.locator('#rows')).toContainText('12.500 KB/s');
    await page.locator('#f-cv').fill('12,5');
    await page.locator('#f-cv-unit').selectOption('mbs');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('100 Mbps');
    await expect(page.locator('#rows')).toContainText('0,1 Gbps');
  });

  test('ters hesap: 1 GB dosyayı 80 sn içinde indirmek için 100 Mbps gerekir', async ({ page }) => {
    await open(page);
    await page.getByLabel('Gereken hız').check();
    await page.locator('#f-size').fill('1');
    await page.locator('#f-size-unit').selectOption('gb');
    await page.locator('#f-time').fill('80');
    await page.locator('#f-time-unit').selectOption('sn');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('100 Mbps');
    await expect(page.locator('#rows')).toContainText('12,5 MB/s');
    // 5 GB / 10 dk → 66,67 Mbps; %85 verimle 78,43 Mbps öneri satırı
    await page.locator('#f-size').fill('5');
    await page.locator('#f-time').fill('10');
    await page.locator('#f-time-unit').selectOption('dk');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('66,67 Mbps');
    await expect(page.locator('#rows')).toContainText('78,43 Mbps');
  });

  test('hızlı seç düğmeleri alanları doldurur; kopyala çalışır; temizle sıfırlar', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await page.getByRole('button', { name: '4,7 GB' }).click();
    await expect(page.locator('#f-size')).toHaveValue('4,7');
    await expect(page.locator('#f-size-unit')).toHaveValue('gb');
    await page.getByRole('button', { name: '50 Mbps' }).click();
    await expect(page.locator('#f-speed')).toHaveValue('50');
    await page.getByRole('button', { name: '%85' }).click();
    await expect(page.locator('#f-eff')).toHaveValue('85');
    await page.locator('#calc').click();
    await expect(page.locator('#rows')).toContainText('14 dk 45 sn'); // 752 / 0,85 = 884,7 sn → 885
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('4,7 GB');
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#f-size')).toHaveValue('');
    await expect(page.locator('#f-eff')).toHaveValue('100');
  });

  test('hızlı tablo: statik değerler ve 1024 tabanında yenilenir', async ({ page }) => {
    await open(page);
    const row = page.locator('#quick tbody tr[data-unit="gb"][data-size="1"]');
    await expect(row.locator('td[data-mbps="100"]')).toHaveText('1 dk 20 sn');
    await expect(row.locator('td[data-mbps="1000"]')).toHaveText('8 sn');
    await expect(page.locator('#quick tbody tr[data-size="50"] td[data-mbps="100"]')).toHaveText('1 sa 6 dk 40 sn');
    await page.getByLabel(/1 GB = 1024 MB/).check();
    await expect(row.locator('td[data-mbps="100"]')).toHaveText('1 dk 26 sn'); // 85,9 sn
  });

  test('hatalı giriş Türkçe ve çözüm önerir', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Dosya boyutu boş');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-size').fill('abc');
    await page.locator('#f-speed').fill('100');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçersiz');
    await expect(page.locator('#error')).toContainText('rakam ve virgül');
    await page.locator('#f-size').fill('1');
    await page.locator('#f-speed').fill('0');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#f-speed').fill('100');
    await page.locator('#f-eff').fill('150');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Verim yüzdesi 1 ile 100');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı (araç kutusunun altında), SSS ≥7, JSON-LD', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="indirme-suresi-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    // reklam A araç kutusunun hemen altında; butonlarla aynı kapsayıcıda değil
    const adBelowTool = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="indirme-suresi-hesapla-a"]')!;
      return !tool.contains(ad) && Boolean(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adBelowTool).toBe(true);
    const types = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent || '{}')['@type']));
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('FAQPage');
    const faqCount = await page.evaluate(() => {
      const s = [...document.querySelectorAll('script[type="application/ld+json"]')].map((x) => JSON.parse(x.textContent || '{}')).find((j) => j['@type'] === 'FAQPage');
      return s.mainEntity.length;
    });
    expect(faqCount).toBeGreaterThanOrEqual(7);
    await expect(page.getByText('Dosyanız bilgisayarınızdan çıkmaz')).toBeVisible();
  });

  test('360px genişlikte yatay taşma yok ve klavyeyle hesaplanır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.getByLabel('Mbps ↔ MB/s').check();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await page.getByLabel('Süre hesapla').check();
    // klavye: alana yaz, Enter ile gönder
    await page.locator('#f-size').fill('2');
    await page.locator('#f-speed').fill('16');
    await page.locator('#f-speed').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#rows')).toContainText('16 dk 40 sn'); // 2 GB @ 16 Mbps = 1000 sn
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });
});
