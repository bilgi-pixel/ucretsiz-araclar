import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Veri aynı origin'deki elementler.json dosyasından gelir; dış istek olmamalı.
test.describe('İnteraktif Periyodik Tablo', () => {
  test('118 element hücresi çizilir, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/periyodik-tablo/');
    await expect(page.locator('#pt-board')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('.pt-cell')).toHaveCount(118);
    // 57–71 ve 89–103 yer tutucuları element hücresi sayılmaz
    await expect(page.locator('.pt-ph')).toHaveCount(2);
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(0);
    await expect(page.locator('#pt-count')).toContainText('118 element');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('"Demir" araması yalnızca Fe hücresini vurgular, Türkçe karakter farkı yok sayılır', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    await page.locator('#pt-ara').fill('Demir');
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(1);
    await expect(page.locator('.pt-cell[data-sym="Fe"]')).toHaveClass(/is-match/);
    await expect(page.locator('.pt-cell[data-sym="Cu"]')).toHaveClass(/is-dim/);
    await expect(page.locator('#pt-count')).toHaveText('1 element eşleşti.');
    // ASCII yazım ve sembol / numara ile arama
    await page.locator('#pt-ara').fill('altin');
    await expect(page.locator('.pt-cell[data-sym="Au"]')).toHaveClass(/is-match/);
    await page.locator('#pt-ara').fill('26');
    await expect(page.locator('.pt-cell[data-sym="Fe"]')).toHaveClass(/is-match/);
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(1);
    await page.locator('#pt-ara').fill('He');
    await expect(page.locator('.pt-cell[data-sym="He"]')).toHaveClass(/is-match/);
    // Tek sonuçta Enter kartı açar
    await page.locator('#pt-ara').fill('Volfram');
    await page.locator('#pt-ara').press('Enter');
    await expect(page.locator('#pt-detail [data-f="sembol"]')).toHaveText('W');
    // Eski ad da bulunur
    await page.locator('#pt-ara').fill('tungsten');
    await expect(page.locator('.pt-cell[data-sym="W"]')).toHaveClass(/is-match/);
  });

  test('bulunamayan arama Türkçe, öneri içeren uyarı verir', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    await page.locator('#pt-ara').fill('xyzq');
    await expect(page.locator('#pt-count')).toContainText('Eşleşen element yok');
    await expect(page.locator('#pt-count')).toContainText('Demir');
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(0);
    await page.locator('#pt-clear').click();
    await expect(page.locator('#pt-ara')).toHaveValue('');
    await expect(page.locator('#pt-count')).toContainText('118 element');
  });

  test('Fe hücresine tıklayınca detay panelinde atom numarası 26 görünür', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    // Geniş ekranda kart tablonun boş köşesindedir ve başlangıçta ipucu gösterir
    await expect(page.locator('#pt-detail.pt-detail--gap .pt-d-empty')).toBeVisible();
    await page.locator('.pt-cell[data-sym="Fe"]').click();
    const d = page.locator('#pt-detail');
    await expect(d).toBeVisible();
    await expect(d.locator('[data-f="no"]')).toHaveText('26');
    await expect(d.locator('h3')).toHaveText('Demir');
    await expect(d.locator('[data-f="dizilim"]')).toHaveText('[Ar] 3d6 4s2');
    await expect(d.locator('[data-f="kabuk"]')).toHaveText('2, 8, 14, 2');
    await expect(d.locator('[data-f="hal"]')).toHaveText('Katı');
    await expect(d.locator('[data-f="erime"]')).toContainText('1538');
    await expect(d.locator('[data-f="kesif"]')).toContainText('Eski çağlardan');
    await expect(page.locator('.pt-cell[data-sym="Fe"]')).toHaveAttribute('aria-current', 'true');
    // Sıvı ve gaz hâller
    await page.locator('.pt-cell[data-sym="Hg"]').click();
    await expect(d.locator('[data-f="hal"]')).toHaveText('Sıvı');
    await page.locator('.pt-cell[data-sym="Ne"]').click();
    await expect(d.locator('[data-f="hal"]')).toHaveText('Gaz');
    await expect(d.locator('[data-f="en"]')).toHaveText('Bilinmiyor');
    // Boş köşe yerleşiminde Kapat düğmesi yoktur
    await expect(d.locator('#pt-d-close')).toBeHidden();
  });

  test('dar ekranda kart tablonun altında açılır ve Kapat ile kapanır', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 800 });
    await page.goto('/periyodik-tablo/');
    const d = page.locator('#pt-detail');
    await expect(d).toBeHidden();
    await page.locator('.pt-cell[data-sym="Fe"]').scrollIntoViewIfNeeded();
    await page.locator('.pt-cell[data-sym="Fe"]').click();
    await expect(d).toBeVisible();
    await expect(d).not.toHaveClass(/pt-detail--gap/);
    await expect(d.locator('[data-f="no"]')).toHaveText('26');
    await d.locator('#pt-d-close').click();
    await expect(d).toBeHidden();
    // Pencere genişleyince kart köşeye döner
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(d).toHaveClass(/pt-detail--gap/);
    await expect(d).toBeVisible();
  });

  test('filtre: soy gazlar 7 element, blok / grup / periyot birlikte çalışır', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    await page.locator('.pt-chip[data-kat="soy-gaz"]').click();
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(7);
    await expect(page.locator('#pt-count')).toHaveText('7 element eşleşti.');
    for (const s of ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og']) {
      await expect(page.locator(`.pt-cell[data-sym="${s}"]`)).toHaveClass(/is-match/);
    }
    await expect(page.locator('.pt-chip[data-kat="soy-gaz"]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#pt-clear').click();
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(0);

    await page.locator('[data-blok-btn="f"]').click();
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(30);
    await page.locator('[data-blok-btn="f"]').click(); // tekrar tıklayınca kalkar
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(0);

    await page.locator('#f-grup').selectOption('17');
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(6);
    await page.locator('#f-periyot').selectOption('2');
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(1);
    await expect(page.locator('.pt-cell[data-sym="F"]')).toHaveClass(/is-match/);
    await page.locator('#pt-clear').click();
    await page.locator('#f-periyot').selectOption('1');
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(2);

    // Yer tutucu (57–71) lantanitleri vurgular
    await page.locator('#pt-clear').click();
    await page.locator('.pt-ph[data-kat="lantanit"]').click();
    await expect(page.locator('.pt-cell.is-match')).toHaveCount(15);
  });

  test('kategori sayıları 118 eder ve her hücrenin rengi var', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    const total = await page.locator('.pt-chip small').evaluateAll((els) => els.reduce((a, e) => a + Number(e.textContent!.replace(/[()]/g, '')), 0));
    expect(total).toBe(118);
    const noColor = await page.locator('.pt-cell').evaluateAll((els) => els.filter((e) => getComputedStyle(e).backgroundColor === 'rgba(0, 0, 0, 0)').length);
    expect(noColor).toBe(0);
  });

  test('iki elementi karşılaştırır, elektronegatiflik farkını yorumlar', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    await expect(page.locator('#cmp-table')).toBeHidden();
    await page.locator('#cmp-a').selectOption('26');
    await page.locator('#cmp-b').selectOption('29');
    await expect(page.locator('#cmp-table')).toBeVisible();
    await expect(page.locator('#cmp-ha')).toHaveText('Demir (Fe)');
    await expect(page.locator('#cmp-hb')).toHaveText('Bakır (Cu)');
    await expect(page.locator('#cmp-summary')).toContainText('0,07');
    await expect(page.locator('#cmp-summary')).toContainText('metalik');
    // Kart üzerinden ekleme: sırayla A ve B dolar
    await page.locator('#cmp-clear').click();
    await page.locator('.pt-cell[data-sym="Na"]').click();
    await page.locator('#pt-d-cmp').click();
    await page.locator('.pt-cell[data-sym="Cl"]').click();
    await page.locator('#pt-d-cmp').click();
    await expect(page.locator('#cmp-a')).toHaveValue('11');
    await expect(page.locator('#cmp-b')).toHaveValue('17');
    await expect(page.locator('#cmp-summary')).toContainText('2,23'); // 3,16 − 0,93
    await expect(page.locator('#cmp-summary')).toContainText('iyonik');
    await page.locator('#cmp-swap').click();
    await expect(page.locator('#cmp-a')).toHaveValue('17');
  });

  test('klavye: ok tuşlarıyla hücreler arasında gezilir, Enter kartı açar', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    await page.locator('.pt-cell[data-sym="Li"]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.pt-cell[data-sym="Be"]')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('.pt-cell[data-sym="Mg"]')).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.pt-cell[data-sym="Na"]')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#pt-detail [data-f="no"]')).toHaveText('11');
  });

  test('liste görünümü 118 satır gösterir; satıra tıklayınca kart açılır', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    await page.locator('#v-liste').click();
    await expect(page.locator('#pt-scroll')).toBeHidden();
    await expect(page.locator('.pt-row')).toHaveCount(118);
    await page.locator('#pt-ara').fill('klor');
    // Süzmede eşleşmeyen satırlar listeden kalkar
    await expect(page.locator('.pt-list li:not([hidden])')).toHaveCount(1);
    await page.locator('.pt-row[data-no="17"]').click();
    await expect(page.locator('#pt-detail [data-f="sembol"]')).toHaveText('Cl');
    await page.locator('#v-tablo').click();
    await expect(page.locator('#pt-scroll')).toBeVisible();
  });

  test('yazdırma görünümünde menü ve reklam gizlenir, tablo kalır', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.ba-topbar')).toBeHidden();
    await expect(page.locator('.pt-controls')).toBeHidden();
    await expect(page.locator('.ba-content')).toBeHidden();
    await expect(page.locator('#pt-board')).toBeVisible();
    await expect(page.locator('.pt-print-title')).toBeVisible();
  });

  test('veri dosyası yüklenemezse Türkçe, çözüm öneren hata gösterilir', async ({ page }) => {
    await page.route('**/elementler.json', (r) => r.abort());
    await page.goto('/periyodik-tablo/');
    await expect(page.locator('#error')).toContainText('Element verisi yüklenemedi');
    await expect(page.locator('#error')).toContainText('Sayfayı yenileyin');
  });

  test('360 px genişlikte liste görünümü açılır ve sayfa yatay taşmaz', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/periyodik-tablo/');
    await expect(page.locator('#pt-list-wrap')).toBeVisible();
    await expect(page.locator('#pt-scroll')).toBeHidden();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // Tablo görünümü de kendi içinde kaydırılır, sayfa taşmaz
    await page.locator('#v-tablo').click();
    await expect(page.locator('#pt-scroll')).toBeVisible();
    const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow2).toBeLessThanOrEqual(0);
    const inner = await page.locator('#pt-scroll').evaluate((e) => e.scrollWidth > e.clientWidth);
    expect(inner).toBe(true);
  });

  test('içerik: en az 900 kelime, 3 reklam alanı, 7+ SSS, reklam araç kutusunun altında', async ({ page }) => {
    await page.goto('/periyodik-tablo/');
    const text = await page.locator('.ba-content').innerText();
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['periyodik-tablo-a', 'periyodik-tablo-b', 'periyodik-tablo-c']);
    expect(await page.locator('.ba-tool + .ba-ad[data-slot="periyodik-tablo-a"]').count()).toBe(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('h1')).toContainText('Periyodik Tablo');
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.length).toBe(2);
    ld.forEach((j) => JSON.parse(j));
  });
});
