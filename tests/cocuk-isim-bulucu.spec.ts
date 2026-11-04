import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL_PATH = '/cocuk-isim-bulucu/';

type Rec = { ad: string; cins: string; anlam: string; koken: string; hece: number };

const trLower = (s: string) => s.replace(/I/g, 'ı').replace(/İ/g, 'i').toLocaleLowerCase('tr-TR');
const vowelCount = (s: string) => (trLower(s).match(/[aeıioöuüâîû]/g) || []).length;

async function loadNames(page: Page): Promise<Rec[]> {
  const res = await page.request.get(`${URL_PATH}isimler.json`);
  expect(res.ok()).toBe(true);
  return res.json();
}

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('body')).toHaveAttribute('data-ready', '1');
}

const rowNames = (page: Page) => page.locator('#t-body tr .ni-ad strong').allTextContents();

/** Süzgeç sonrası sayaç metninden toplam sayıyı okur. */
async function countText(page: Page) {
  const t = (await page.locator('#count').textContent()) || '';
  return Number(t.replace(/\D/g, ''));
}

test.describe('Bebek İsmi Bulucu', () => {
  test('isimler.json bütünlüğü: ≥600 benzersiz isim, tüm alanlar dolu ve tutarlı', async ({ page }) => {
    const names = await loadNames(page);
    expect(names.length).toBeGreaterThanOrEqual(600);
    const unique = new Set(names.map((n) => trLower(n.ad)));
    expect(unique.size, 'benzersiz ad sayısı').toBe(names.length);
    const kokenler = ['Türkçe', 'Arapça', 'Farsça', 'İbranice', 'Yunanca', 'Diğer'];
    for (const n of names) {
      expect(typeof n.ad === 'string' && n.ad.trim().length >= 2, `ad: ${JSON.stringify(n)}`).toBe(true);
      expect(['k', 'e', 'u'], `cins: ${n.ad}`).toContain(n.cins);
      expect(typeof n.anlam === 'string' && n.anlam.trim().length >= 2, `anlam: ${n.ad}`).toBe(true);
      expect(kokenler, `köken: ${n.ad}`).toContain(n.koken);
      expect(Number.isInteger(n.hece) && n.hece >= 1 && n.hece <= 4, `hece: ${n.ad}`).toBe(true);
      expect(n.hece, `hece sayısı ünlü sayısına eşit olmalı: ${n.ad}`).toBe(vowelCount(n.ad));
    }
    const count = (c: string) => names.filter((n) => n.cins === c).length;
    expect(count('k')).toBeGreaterThanOrEqual(250);
    expect(count('e')).toBeGreaterThanOrEqual(250);
    expect(count('u')).toBeGreaterThanOrEqual(30);
    for (const k of kokenler) expect(names.some((n) => n.koken === k), `köken yok: ${k}`).toBe(true);
  });

  test('sayfa açılır, tüm liste alfabetik gelir; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    const names = await loadNames(page);
    await expect(page.locator('#count')).toHaveText(`${names.length} isim bulundu`);
    await expect(page.locator('#t-body tr')).toHaveCount(50);
    const shown = await rowNames(page);
    const sorted = [...shown].sort((a, b) => a.localeCompare(b, 'tr'));
    expect(shown).toEqual(sorted);
    // Her satırda ad, anlam ve köken dolu
    const first = page.locator('#t-body tr').first();
    await expect(first.locator('.ni-anlam')).not.toBeEmpty();
    await expect(first.locator('.ni-koken')).not.toBeEmpty();
    // "Daha fazla göster" 50 satır ekler
    await page.locator('#more').click();
    await expect(page.locator('#t-body tr')).toHaveCount(100);
    expect(external).toEqual([]);
    noErrors();
  });

  test('cinsiyet süzgeci: kız ve erkek aramasına unisex adlar dahildir; yalnızca unisex ayrı listelenir', async ({ page }) => {
    await open(page);
    const names = await loadNames(page);
    const n = (f: (r: Rec) => boolean) => names.filter(f).length;
    await page.locator('#f-cins').selectOption('k');
    await expect(page.locator('#count')).toHaveText(`${n((r) => r.cins !== 'e')} isim bulundu`);
    await page.locator('#f-cins').selectOption('e');
    await expect(page.locator('#count')).toHaveText(`${n((r) => r.cins !== 'k')} isim bulundu`);
    const erkekMeta = await page.locator('#t-body tr .ni-ad small').allTextContents();
    expect(erkekMeta.every((m) => m.startsWith('Erkek') || m.startsWith('Unisex'))).toBe(true);
    await page.locator('#f-cins').selectOption('u');
    await expect(page.locator('#count')).toHaveText(`${n((r) => r.cins === 'u')} isim bulundu`);
    const uniNames = await rowNames(page);
    expect(uniNames).toContain('Deniz');
    expect(uniNames).toContain('Yağmur');
    const meta = await page.locator('#t-body tr .ni-ad small').allTextContents();
    expect(meta.every((m) => m.startsWith('Unisex'))).toBe(true);
  });

  test('baş harf (Türkçe İ/I), köken ve hece süzgeçleri birlikte çalışır', async ({ page }) => {
    await open(page);
    const names = await loadNames(page);
    // İ ve I ayrı baş harftir
    await expect(page.locator('#f-first option', { hasText: /^İ$/ })).toHaveCount(1);
    await page.locator('#f-first').selectOption('i');
    const withI = names.filter((r) => r.ad.startsWith('İ')).length;
    await expect(page.locator('#count')).toHaveText(`${withI} isim bulundu`);
    expect((await rowNames(page)).every((a) => a.startsWith('İ'))).toBe(true);
    await page.locator('#f-first').selectOption('ı');
    expect((await rowNames(page)).every((a) => a.startsWith('I'))).toBe(true);

    // köken + hece + cinsiyet
    await page.locator('#f-first').selectOption('');
    await page.locator('#f-koken').selectOption('Farsça');
    await page.locator('#f-hece').selectOption('3');
    await page.locator('#f-cins').selectOption('k');
    const expected = names.filter((r) => r.koken === 'Farsça' && r.hece === 3 && r.cins !== 'e').map((r) => r.ad).sort((a, b) => a.localeCompare(b, 'tr'));
    expect(expected.length).toBeGreaterThan(0);
    await expect(page.locator('#count')).toHaveText(`${expected.length} isim bulundu`);
    const got = await rowNames(page);
    expect(got).toEqual(expected.slice(0, 50));
    await expect(page.locator('#t-body tr .ni-koken').first()).toHaveText('Farsça');
  });

  test('harf sayısı, içinde geçen harfler ve anlam araması; hatalı girişte Türkçe uyarı', async ({ page }) => {
    await open(page);
    const names = await loadNames(page);
    // 3 harfli isimler
    await page.locator('#f-min').fill('3');
    await page.locator('#f-max').fill('3');
    const three = names.filter((r) => r.ad.length === 3).length;
    expect(three).toBeGreaterThan(5);
    await expect(page.locator('#count')).toHaveText(`${three} isim bulundu`);
    expect((await rowNames(page)).every((a) => a.length === 3)).toBe(true);
    // geçersiz aralık
    await page.locator('#f-min').fill('8');
    await page.locator('#f-max').fill('4');
    await expect(page.locator('#error')).toContainText('En az harf sayısı, en çok harf sayısından büyük olamaz');
    await expect(page.locator('#count')).toHaveText('Harf sayısı aralığı geçersiz');
    await page.locator('#f-min').fill('');
    await page.locator('#f-max').fill('');
    await expect(page.locator('#error')).toBeHidden();

    // içinde geçen harfler: şa → hem ş hem a içerenler; rakam yok sayılır ve not görünür
    await page.locator('#f-contains').fill('ŞA1');
    await expect(page.locator('#contains-note')).toBeVisible();
    const expected = names.filter((r) => { const l = trLower(r.ad); return l.includes('ş') && l.includes('a'); }).length;
    expect(expected).toBeGreaterThan(3);
    await expect(page.locator('#count')).toHaveText(`${expected} isim bulundu`);
    expect((await rowNames(page)).every((a) => trLower(a).includes('ş') && trLower(a).includes('a'))).toBe(true);
    await page.locator('#f-contains').fill('');

    // anlam araması: iki sözcüğün ikisi de geçmeli
    await page.locator('#f-anlam').fill('IŞIK');
    const isik = names.filter((r) => trLower(r.anlam).includes('ışık')).length;
    expect(isik).toBeGreaterThan(3);
    await expect(page.locator('#count')).toHaveText(`${isik} isim bulundu`);
    await page.locator('#f-anlam').fill('ışık zzz');
    await expect(page.locator('#count')).toHaveText('0 isim bulundu');
    await expect(page.locator('#empty')).toBeVisible();
    await expect(page.locator('#empty')).toContainText('Eşleşen isim yok');
    // temizle
    await page.locator('#clear').click();
    await expect(page.locator('#count')).toHaveText(`${names.length} isim bulundu`);
    await expect(page.locator('#f-anlam')).toHaveValue('');
  });

  test('rastgele 5 isim: farklı 5 kayıt, süzgece uyar; az sonuçta hepsi, hiç sonuç yoksa uyarı', async ({ page }) => {
    await open(page);
    const names = await loadNames(page);
    await expect(page.locator('#random-box')).toBeHidden();
    await page.locator('#f-cins').selectOption('k');
    await page.locator('#random').click();
    await expect(page.locator('#random-box')).toBeVisible();
    await expect(page.locator('#random-title')).toHaveText('Size önerilen 5 isim');
    const cards = page.locator('#random-list .ni-card');
    await expect(cards).toHaveCount(5);
    const picked = await page.locator('#random-list .ni-card-ad').allTextContents();
    expect(new Set(picked).size).toBe(5);
    for (const ad of picked) {
      const rec = names.find((r) => r.ad === ad)!;
      expect(rec, ad).toBeTruthy();
      expect(rec.cins).not.toBe('e');
    }
    await expect(cards.first().locator('.ni-card-anlam')).not.toBeEmpty();
    // Tam 5 uyan: Yunanca köken → 5 isim, hepsi gösterilir
    await page.locator('#f-cins').selectOption('');
    await page.locator('#f-koken').selectOption('Yunanca');
    const yunanca = names.filter((r) => r.koken === 'Yunanca').map((r) => r.ad).sort();
    await page.locator('#random').click();
    const some = (await page.locator('#random-list .ni-card-ad').allTextContents()).sort();
    expect(some).toHaveLength(Math.min(5, yunanca.length));
    expect(some.every((a) => yunanca.includes(a))).toBe(true);
    // Hiç uyan yok: Yunanca + 1 hece
    await page.locator('#f-hece').selectOption('1');
    await expect(page.locator('#count')).toHaveText('0 isim bulundu');
    await page.locator('#random').click();
    await expect(page.locator('#error')).toContainText('öneri üretilemedi');
    await expect(page.locator('#random-box')).toBeHidden();
  });

  test('favoriler: ekle/çıkar, tablo ve öneri düğmeleri eşitlenir, listeyi kopyala, temizle', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await expect(page.locator('#fav-empty')).toBeVisible();
    await expect(page.locator('#fav-copy')).toBeDisabled();
    // boş listede kopyalama yoktur; düğme devre dışı
    const firstTwo = (await rowNames(page)).slice(0, 2);
    const btnA = page.locator(`#t-body .ni-fav[data-ad="${firstTwo[0]}"]`);
    const btnB = page.locator(`#t-body .ni-fav[data-ad="${firstTwo[1]}"]`);
    await expect(btnA).toHaveAttribute('aria-pressed', 'false');
    await btnA.click();
    await btnB.click();
    await expect(btnA).toHaveAttribute('aria-pressed', 'true');
    await expect(btnA).toHaveText('★');
    await expect(page.locator('#fav-count')).toHaveText('Favori listem (2)');
    await expect(page.locator('#fav-list li')).toHaveCount(2);
    await expect(page.locator('#fav-empty')).toBeHidden();
    // Kopyala
    await page.locator('#fav-copy').click();
    await expect(page.locator('#fav-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toBe(`${firstTwo[0]}, ${firstTwo[1]}`);
    // Süzgeç değişince favori durumu korunur
    await page.locator('#f-anlam').fill('deniz');
    await page.locator('#f-anlam').fill('');
    await expect(page.locator(`#t-body .ni-fav[data-ad="${firstTwo[0]}"]`)).toHaveAttribute('aria-pressed', 'true');
    // Öneri kartındaki düğme de aynı favori listesini kullanır
    await page.locator('#random').click();
    const cardBtn = page.locator('#random-list .ni-fav').first();
    const cardAd = (await cardBtn.getAttribute('data-ad'))!;
    await cardBtn.click();
    await expect(cardBtn).toHaveAttribute('aria-pressed', 'true');
    const expectedCount = firstTwo.includes(cardAd) ? 1 : 3; // rastgele öneri favori bir isim olabilir
    await expect(page.locator('#fav-list li')).toHaveCount(expectedCount);
    // Listeden kaldır
    await page.locator('#fav-list .ni-remove').first().click();
    await expect(page.locator('#fav-list li')).toHaveCount(expectedCount - 1);
    // Temizle
    await page.locator('#fav-clear').click();
    await expect(page.locator('#fav-list li')).toHaveCount(0);
    await expect(page.locator('#fav-empty')).toBeVisible();
    await expect(page.locator('#fav-copy')).toBeDisabled();
    // localStorage'a hiçbir şey yazılmadı
    const stored = await page.evaluate(() => localStorage.length + sessionStorage.length);
    expect(stored).toBe(0);
  });

  test('klavyeyle kullanılır: favori düğmesi Enter ile, filtreler Tab ile erişilir', async ({ page }) => {
    await open(page);
    await page.locator('#f-cins').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#f-first')).toBeFocused();
    const btn = page.locator('#t-body .ni-fav').first();
    await btn.focus();
    await page.keyboard.press('Enter');
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#fav-list li')).toHaveCount(1);
    await page.keyboard.press('Space');
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await expect(btn).toHaveAttribute('aria-label', /favorilere ekle$/);
  });

  test('360px genişlikte yatay taşma yok; tablo satırları kart olur', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(1);
    await page.locator('#random').click();
    await page.locator('#random-list .ni-fav').first().click();
    await page.locator('#t-body .ni-fav').first().click();
    expect(await overflow()).toBeLessThanOrEqual(1);
    const row = await page.locator('#t-body tr').first().boundingBox();
    expect(row!.x).toBeGreaterThanOrEqual(0);
    expect(row!.x + row!.width).toBeLessThanOrEqual(360 + 1);
    // Kart düzeni: ad ve favori düğmesi aynı satırda, anlam altta
    const ad = await page.locator('#t-body tr').first().locator('.ni-ad').boundingBox();
    const anlam = await page.locator('#t-body tr').first().locator('.ni-anlam').boundingBox();
    expect(anlam!.y).toBeGreaterThan(ad!.y);
    // Dokunma hedefi en az 44px
    const fav = await page.locator('#t-body .ni-fav').first().boundingBox();
    expect(fav!.width).toBeGreaterThanOrEqual(44);
    expect(fav!.height).toBeGreaterThanOrEqual(44);
  });

  test('içerik: en az 900 kelime, 3 reklam alanı (araç kutusunda yok), SSS ≥ 7, JSON-LD geçerli', async ({ page }) => {
    await open(page);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['cocuk-isim-bulucu-a', 'cocuk-isim-bulucu-b', 'cocuk-isim-bulucu-c']);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-badges')).toContainText('Dosyanız bilgisayarınızdan çıkmaz');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const data = blocks.map((b) => JSON.parse(b));
    const app = data.find((d) => d['@type'] === 'SoftwareApplication');
    const faq = data.find((d) => d['@type'] === 'FAQPage');
    expect(app.url).toBe('https://araclar.bilisimajans.com/cocuk-isim-bulucu/');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
  });
});
