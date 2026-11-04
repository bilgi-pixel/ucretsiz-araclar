import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/su-ihtiyaci-hesapla/';
const WARN = 'Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın';

async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

type Opts = { sex?: 'male' | 'female'; activity?: string; climate?: 'mild' | 'hot'; status?: 'none' | 'pregnant' | 'nursing' };
async function calc(page: Page, weight: string, age: string, o: Opts = {}) {
  await page.locator('#weight').fill(weight);
  await page.locator('#age').fill(age);
  await page.locator('#sex').selectOption(o.sex ?? 'male');
  await page.locator('#activity').selectOption(o.activity ?? '0');
  await page.locator('#climate').selectOption(o.climate ?? 'mild');
  if ((o.sex ?? 'male') === 'female') await page.locator('#status').selectOption(o.status ?? 'none');
  await page.locator('#calc').click();
}

test.describe('Günlük Su İhtiyacı Hesaplama', () => {
  test('70 kg, 35 yaş, erkek, ılıman, hareketsiz → 2.450 ml; bardak/şişe; uyarılar; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await expect(page.locator('.ba-hero')).toContainText(WARN);
    await expect(page.locator('.ba-hero')).toContainText('Böbrek, kalp ya da karaciğer hastalığı');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, '70', '35');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-ml')).toHaveText('2.450 ml');
    await expect(page.locator('#r-liters')).toHaveText('2,45 litre');
    await expect(page.locator('#r-cups')).toContainText('12,3 bardak');
    await expect(page.locator('#r-bottles')).toContainText('4,9 şişe');
    await expect(page.locator('#r-base')).toContainText('2.450 ml');
    await expect(page.locator('#r-base')).toContainText('35 ml');
    // Ek kalem yoksa satırları gizli
    await expect(page.locator('#row-exercise')).toBeHidden();
    await expect(page.locator('#row-climate')).toBeHidden();
    await expect(page.locator('#row-state')).toBeHidden();
    // Sonuç içi uyarı
    await expect(page.locator('#r-disclaimer')).toContainText(WARN);
    await expect(page.locator('#r-disclaimer')).toContainText('Böbrek, kalp ya da karaciğer hastalığı olanlar');
    expect(external).toEqual([]);
    noErrors();
  });

  test('egzersiz ve iklim eklemeleri: +1 saat → 2.800 ml, yarım saat → 2.625 ml, sıcak → +%10', async ({ page }) => {
    await open(page);
    await calc(page, '70', '35', { activity: '1' });
    await expect(page.locator('#r-ml')).toHaveText('2.800 ml');
    await expect(page.locator('#r-liters')).toHaveText('2,8 litre');
    await expect(page.locator('#row-exercise')).toBeVisible();
    await expect(page.locator('#r-exercise')).toHaveText('+350 ml');
    await calc(page, '70', '35', { activity: '0.5' });
    await expect(page.locator('#r-ml')).toHaveText('2.625 ml');
    // Sıcak iklim, egzersiz yok: 2450 + %10
    await calc(page, '70', '35', { climate: 'hot' });
    await expect(page.locator('#r-ml')).toHaveText('2.695 ml');
    await expect(page.locator('#r-climate')).toHaveText('+245 ml');
    // Sıcak + 1 saat: (2450 + 350) × 1,1 = 3.080
    await calc(page, '70', '35', { climate: 'hot', activity: '1' });
    await expect(page.locator('#r-ml')).toHaveText('3.080 ml');
    await expect(page.locator('#r-climate')).toHaveText('+280 ml');
  });

  test('yaş bantları (<30: 40, 30–55: 35, >55: 30 ml/kg) ve virgüllü kilo', async ({ page }) => {
    await open(page);
    await calc(page, '60', '25');
    await expect(page.locator('#r-ml')).toHaveText('2.400 ml');
    await calc(page, '60', '29');
    await expect(page.locator('#r-ml')).toHaveText('2.400 ml');
    await calc(page, '60', '30');
    await expect(page.locator('#r-ml')).toHaveText('2.100 ml');
    await calc(page, '60', '55');
    await expect(page.locator('#r-ml')).toHaveText('2.100 ml');
    await calc(page, '60', '56');
    await expect(page.locator('#r-ml')).toHaveText('1.800 ml');
    // Virgüllü kilo: 72,5 × 35 = 2.537,5 → 2.538
    await calc(page, '72,5', '35');
    await expect(page.locator('#r-ml')).toHaveText('2.538 ml');
    await calc(page, '72.5', '35');
    await expect(page.locator('#r-ml')).toHaveText('2.538 ml');
  });

  test('hamilelik ve emzirme yalnızca kadında görünür: +300 / +700 ml; erkeğe dönünce sıfırlanır', async ({ page }) => {
    await open(page);
    await expect(page.locator('#status-wrap')).toBeHidden();
    await page.locator('#sex').selectOption('female');
    await expect(page.locator('#status-wrap')).toBeVisible();
    await calc(page, '70', '35', { sex: 'female', status: 'pregnant' });
    await expect(page.locator('#r-ml')).toHaveText('2.750 ml');
    await expect(page.locator('#row-state')).toBeVisible();
    await expect(page.locator('#r-state')).toHaveText('+300 ml');
    await expect(page.locator('#r-state-label')).toHaveText('Hamilelik ilavesi');
    await calc(page, '70', '35', { sex: 'female', status: 'nursing' });
    await expect(page.locator('#r-ml')).toHaveText('3.150 ml');
    await expect(page.locator('#r-state')).toHaveText('+700 ml');
    await expect(page.locator('#r-state-label')).toHaveText('Emzirme ilavesi');
    // Sıcak iklim yalnızca temel + egzersiz toplamına uygulanır; sabit ilaveye uygulanmaz: 2450 × 1,1 + 700
    await calc(page, '70', '35', { sex: 'female', status: 'nursing', climate: 'hot' });
    await expect(page.locator('#r-ml')).toHaveText('3.395 ml');
    // Erkeğe dönünce seçenek gizlenir, değer sıfırlanır ve hesap hamilelik eklemez
    await page.locator('#sex').selectOption('male');
    await expect(page.locator('#status-wrap')).toBeHidden();
    await expect(page.locator('#status')).toHaveValue('none');
    await page.locator('#climate').selectOption('mild');
    await page.locator('#calc').click();
    await expect(page.locator('#r-ml')).toHaveText('2.450 ml');
    await expect(page.locator('#row-state')).toBeHidden();
  });

  test('içme planı: 8 dilim, toplamı korur; sabah dilimi en büyük, gece en küçük', async ({ page }) => {
    await open(page);
    await calc(page, '70', '35');
    const rows = page.locator('#plan-body tr');
    await expect(rows).toHaveCount(8);
    await expect(rows.nth(0)).toContainText('07:00–09:00');
    await expect(rows.nth(0)).toContainText('Uyanınca');
    await expect(rows.nth(7)).toContainText('21:00–23:00');
    const amounts = await page.locator('#plan-body tr td:nth-child(2)').allTextContents();
    const ml = amounts.map((t) => Number(t.replace(/[^\d]/g, '')));
    expect(ml).toHaveLength(8);
    expect(ml.reduce((a, b) => a + b, 0)).toBe(2450);
    expect(ml[0]).toBe(Math.max(...ml));
    expect(ml[7]).toBe(Math.min(...ml));
    // Tek hane kalan toplam: 2.538 → 2.540'a yuvarlanan plan, farkı en fazla 10 ml
    await calc(page, '72,5', '35');
    const amounts2 = await page.locator('#plan-body tr td:nth-child(2)').allTextContents();
    const sum2 = amounts2.map((t) => Number(t.replace(/[^\d]/g, ''))).reduce((a, b) => a + b, 0);
    expect(Math.abs(sum2 - 2538)).toBeLessThanOrEqual(10);
  });

  test('hatalı ve boş girişler Türkçe, çözüm öneren hata verir; düzeltince hata kalkar', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Kilo alanı boş');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#weight').fill('abc');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('25–250');
    await page.locator('#weight').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('25–250');
    await page.locator('#weight').fill('300');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('25–250');
    await page.locator('#weight').fill('70');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Yaş alanı boş');
    await page.locator('#age').fill('10');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('14 yaş ve üzeri');
    await expect(page.locator('#error')).toContainText('çocuk doktoruna');
    await page.locator('#age').fill('130');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('14–110');
    await page.locator('#age').fill('3,5');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('14–110');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#age').fill('35');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-ml')).toHaveText('2.450 ml');
  });

  test('klavye: Enter ile hesaplanır, Temizle varsayılanlara döner', async ({ page }) => {
    await open(page);
    await page.locator('#weight').fill('70');
    await page.locator('#age').fill('35');
    await page.locator('#age').press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-ml')).toHaveText('2.450 ml');
    await page.locator('#sex').selectOption('female');
    await page.locator('#activity').selectOption('2');
    await page.locator('#clear').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#weight')).toHaveValue('');
    await expect(page.locator('#age')).toHaveValue('');
    await expect(page.locator('#sex')).toHaveValue('male');
    await expect(page.locator('#activity')).toHaveValue('0');
    await expect(page.locator('#status-wrap')).toBeHidden();
    await expect(page.locator('#weight')).toBeFocused();
  });

  test('360 px: sonuç ve plan tablosu render edildikten sonra yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    await calc(page, '112,5', '29', { sex: 'female', status: 'nursing', climate: 'hot', activity: '3' });
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#plan-body tr')).toHaveCount(8);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // Form alanları 360 px'te sığar ve dokunmaya uygun yüksekliktedir
    for (const id of ['#weight', '#age', '#sex', '#activity', '#climate', '#status']) {
      const b = await page.locator(id).boundingBox();
      expect(b!.x).toBeGreaterThanOrEqual(0);
      expect(b!.x + b!.width).toBeLessThanOrEqual(360);
      expect(b!.height).toBeGreaterThanOrEqual(40);
    }
    const tb = await page.locator('.su-tablewrap').boundingBox();
    expect(tb!.x + tb!.width).toBeLessThanOrEqual(360);
  });

  test('içerik: 3 reklam alanı (araç kutusunun altında), ≥900 kelime, SSS ≥7 ve JSON-LD uyumlu, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const ads = page.locator('.ba-ad');
    await expect(ads).toHaveCount(3);
    const slots = await ads.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['su-ihtiyaci-hesapla-a', 'su-ihtiyaci-hesapla-b', 'su-ihtiyaci-hesapla-c']);
    // Reklam A araç kutusunun hemen altında; araç kutusunun içinde ya da düğmelerin yanında reklam yok
    await expect(page.locator('.ba-tool + .ba-ad')).toHaveAttribute('data-slot', 'su-ihtiyaci-hesapla-a');
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    await expect(page.locator('.ba-actions .ba-ad, .ba-actions ~ .ba-ad')).toHaveCount(0);
    const words = await page.locator('.ba-content').evaluate((n) => (n as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '')));
    expect(ld.map((o: any) => o['@type']).sort()).toEqual(['FAQPage', 'SoftwareApplication']);
    const faq: any = ld.find((o: any) => o['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(faqCount);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-footer-line')).toContainText('%100 ücretsiz · kayıt yok · dosya yüklenmez');
    await expect(page.locator('h1')).toContainText('Su İhtiyacı');
    // Sağlık uyarısı sayfa gövdesinde de yer alır
    await expect(page.locator('.ba-content')).toContainText('Böbrek');
    await expect(page.locator('.ba-content .ba-note').first()).toContainText(WARN);
  });
});
