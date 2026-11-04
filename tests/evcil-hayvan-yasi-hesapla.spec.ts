import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL_PATH = '/evcil-hayvan-yasi-hesapla/';

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('body')).toHaveAttribute('data-ready', '1');
}

async function calc(page: Page, opts: { species?: 'dog' | 'cat'; size?: string; years?: string; months?: string }) {
  if (opts.species === 'cat') await page.locator('#sp-cat').check();
  else await page.locator('#sp-dog').check();
  if (opts.size) await page.locator('#size').selectOption(opts.size);
  await page.locator('#years').fill(opts.years ?? '');
  await page.locator('#months').fill(opts.months ?? '');
  await page.locator('#calc').click();
}

test.describe('Evcil Hayvan Yaşı Hesaplama', () => {
  test('köpek orta boy 5 yıl → 39 insan yaşı, UCSD ≈ 56,8, yetişkin; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await calc(page, { species: 'dog', size: 'medium', years: '5', months: '0' });
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-human')).toHaveText('39 yaş');
    await expect(page.locator('#r-ucsd')).toContainText('56,8');
    await expect(page.locator('#r-stage')).toHaveText('yetişkin');
    await expect(page.locator('#r-real')).toHaveText('5 yıl');
    await expect(page.locator('#r-care')).not.toBeEmpty();
    await expect(page.locator('#result')).toContainText('veteriner hekim tavsiyesi yerine geçmez');
    // Sonuç tablosu köpek için 3 sütun, 11 satır
    await expect(page.locator('#t-head th')).toHaveCount(3);
    await expect(page.locator('#t-body tr')).toHaveCount(11);
    expect(external).toEqual([]);
    noErrors();
  });

  test('boyut sınıfları: küçük 36, orta 39, büyük 42, dev 45 (5 yıl); 1 yıl 15, 2 yıl 24, 1 yıl 6 ay 19,5', async ({ page }) => {
    await open(page);
    const expected: Record<string, string> = { small: '36 yaş', medium: '39 yaş', large: '42 yaş', giant: '45 yaş' };
    for (const [size, text] of Object.entries(expected)) {
      await calc(page, { species: 'dog', size, years: '5' });
      await expect(page.locator('#r-human')).toHaveText(text);
    }
    await calc(page, { species: 'dog', size: 'large', years: '1' });
    await expect(page.locator('#r-human')).toHaveText('15 yaş');
    await calc(page, { species: 'dog', size: 'giant', years: '2' });
    await expect(page.locator('#r-human')).toHaveText('24 yaş');
    await calc(page, { species: 'dog', size: 'small', years: '1', months: '6' });
    await expect(page.locator('#r-human')).toHaveText('19,5 yaş');
    await expect(page.locator('#r-real')).toHaveText('1 yıl 6 ay');
  });

  test('kedi 3 yıl → 28; boyut alanı ve UCSD satırı gizlenir; 10 yıl → 56', async ({ page }) => {
    await open(page);
    await expect(page.locator('#size-field')).toBeVisible();
    await page.locator('#sp-cat').check();
    await expect(page.locator('#size-field')).toBeHidden();
    await calc(page, { species: 'cat', years: '3' });
    await expect(page.locator('#r-human')).toHaveText('28 yaş');
    await expect(page.locator('#r-stage')).toHaveText('yetişkin');
    await expect(page.locator('#r-ucsd-row')).toBeHidden();
    await expect(page.locator('#t-head th')).toHaveCount(2);
    await calc(page, { species: 'cat', years: '10' });
    await expect(page.locator('#r-human')).toHaveText('56 yaş');
    // Köpeğe dönünce boyut alanı geri gelir
    await page.locator('#sp-dog').check();
    await expect(page.locator('#size-field')).toBeVisible();
  });

  test('yaşam evreleri ve çok genç köpekte UCSD karşılaştırması hesaplanmaz', async ({ page }) => {
    await open(page);
    await calc(page, { species: 'dog', size: 'small', years: '0', months: '6' });
    await expect(page.locator('#r-stage')).toHaveText('yavru');
    await expect(page.locator('#r-human')).toHaveText('7,5 yaş');
    await expect(page.locator('#r-ucsd')).toContainText('≈');
    await calc(page, { species: 'dog', size: 'small', years: '0', months: '2' });
    await expect(page.locator('#r-ucsd')).toContainText('hesaplanmaz');
    await calc(page, { species: 'dog', size: 'medium', years: '2' });
    await expect(page.locator('#r-stage')).toHaveText('genç');
    await calc(page, { species: 'dog', size: 'medium', years: '9' });
    await expect(page.locator('#r-stage')).toHaveText('yaşlı');
    await calc(page, { species: 'dog', size: 'large', years: '1', months: '3' });
    await expect(page.locator('#r-stage')).toHaveText('yavru'); // büyük ırkta yavruluk 1,5 yaşa kadar
    await calc(page, { species: 'dog', size: 'giant', years: '6' });
    await expect(page.locator('#r-stage')).toHaveText('yaşlı');
    await calc(page, { species: 'cat', years: '11' });
    await expect(page.locator('#r-stage')).toHaveText('yaşlı');
    await calc(page, { species: 'cat', years: '0', months: '4' });
    await expect(page.locator('#r-stage')).toHaveText('yavru');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; sonuç gizlenir', async ({ page }) => {
    await open(page);
    await calc(page, { species: 'dog', years: '', months: '' });
    await expect(page.locator('#error')).toContainText('Yaş girilmedi');
    await expect(page.locator('#result')).toBeHidden();
    await calc(page, { species: 'dog', years: '3', months: '12' });
    await expect(page.locator('#error')).toContainText('Ay değeri 0 ile 11 arasında olmalıdır');
    await calc(page, { species: 'dog', years: '-2' });
    await expect(page.locator('#error')).toContainText('eksi olamaz');
    await calc(page, { species: 'cat', years: '31' });
    await expect(page.locator('#error')).toContainText("30'dan büyük olamaz");
    await calc(page, { species: 'dog', years: '0', months: '0' });
    await expect(page.locator('#error')).toContainText('Yaş sıfır olamaz');
    await calc(page, { species: 'dog', years: '2.5' });
    await expect(page.locator('#error')).toContainText('tam sayı');
    await expect(page.locator('#result')).toBeHidden();
    // Düzeltince hata kalkar
    await calc(page, { species: 'dog', size: 'medium', years: '4' });
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-human')).toHaveText('34 yaş');
  });

  test('sayfadaki statik tablolar hesap fonksiyonuyla tutarlı', async ({ page }) => {
    await open(page);
    const mismatches = await page.evaluate(async () => {
      const m = await import('/evcil-hayvan-yasi-hesapla/tool.js');
      const out: string[] = [];
      const tables = Array.from(document.querySelectorAll('.ba-content table.pet-table'));
      const sizes = ['small', 'medium', 'large', 'giant'];
      tables[0].querySelectorAll('tbody tr').forEach((tr) => {
        const cells = Array.from(tr.querySelectorAll('td')).map((td) => td.textContent || '');
        const yr = parseInt(cells[0], 10);
        sizes.forEach((s, i) => {
          if (m.humanAgeTable('dog', s, yr) !== Number(cells[i + 1])) out.push(`köpek ${s} ${yr}`);
        });
      });
      tables[1].querySelectorAll('tbody tr').forEach((tr) => {
        const cells = Array.from(tr.querySelectorAll('td')).map((td) => td.textContent || '');
        const yr = parseInt(cells[0], 10);
        if (m.humanAgeTable('cat', null, yr) !== Number(cells[1])) out.push(`kedi ${yr}`);
      });
      return out;
    });
    expect(mismatches).toEqual([]);
  });

  test('klavyeyle kullanılır: Enter ile hesaplar, sonucu kopyalar', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await page.locator('#years').focus();
    await page.keyboard.type('7');
    await page.keyboard.press('Enter');
    await expect(page.locator('#r-human')).toHaveText('49 yaş'); // varsayılan orta boy
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('49 yaş');
    expect(clip).toContain('veteriner tavsiyesi yerine geçmez');
    // Temizle
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#years')).toHaveValue('');
    await expect(page.locator('#years')).toBeFocused();
  });

  test('360px genişlikte yatay taşma yok; sonuç ve tablolar sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    await calc(page, { species: 'dog', size: 'giant', years: '8', months: '5' });
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const box = await page.locator('#result').boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(360 + 1);
  });

  test('içerik: en az 900 kelime, 3 reklam alanı (araç kutusunda yok), SSS ≥ 7, JSON-LD geçerli', async ({ page }) => {
    await open(page);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['evcil-hayvan-yasi-hesapla-a', 'evcil-hayvan-yasi-hesapla-b', 'evcil-hayvan-yasi-hesapla-c']);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-badges')).toContainText('Dosyanız bilgisayarınızdan çıkmaz');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const data = blocks.map((b) => JSON.parse(b));
    const app = data.find((d) => d['@type'] === 'SoftwareApplication');
    const faq = data.find((d) => d['@type'] === 'FAQPage');
    expect(app.url).toBe('https://araclar.bilisimajans.com/evcil-hayvan-yasi-hesapla/');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
  });
});
