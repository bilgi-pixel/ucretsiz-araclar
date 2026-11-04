import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

const SLUG = '/mutfak-olcu-donustur/';
const jsonPath = join(__dirname, '..', 'web', 'mutfak-olcu-donustur', 'malzemeler.json');
type Ing = { id: string; ad: string; grup: string; g: number; min: number; max: number };
const ingredients: Ing[] = JSON.parse(readFileSync(jsonPath, 'utf8'));

/** Sayfayı açar ve malzeme listesinin yüklenmesini bekler. */
async function open(page: Page) {
  await page.goto(SLUG);
  await expect(page.locator('#ing')).toHaveAttribute('data-ready', '1');
}
const rowText = (page: Page, unit: string) => page.locator(`#result [data-unit="${unit}"] dd`).first();

test.describe('Mutfak Ölçü Dönüştürücü', () => {
  test('1 su bardağı su = 200 ml = 200 g; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await page.locator('#amount').fill('1');
    await page.locator('#unit').selectOption('sb');
    await page.locator('#ing').selectOption('su');
    await expect(page.locator('#result')).toBeVisible();
    await expect(rowText(page, 'ml')).toHaveText('200');
    await expect(rowText(page, 'g')).toHaveText('200');
    await expect(page.locator('#headline')).toContainText('200 g');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('1 su bardağı un, malzemeler.json değeriyle uyumlu ve "yaklaşık" etiketli', async ({ page }) => {
    await open(page);
    const un = ingredients.find((i) => i.id === 'un')!;
    // Varsayılan açılış: 1 su bardağı un
    await expect(page.locator('#result')).toBeVisible();
    await expect(rowText(page, 'g')).toHaveText(String(un.g));
    await expect(page.locator('#headline')).toContainText('≈');
    await expect(page.locator('#range')).toContainText('Yaklaşık');
    await expect(page.locator('#range')).toContainText(`${un.min}–${un.max}`);
    // kesir ipucu yalnızca makul yakınlıkta verilir: 0,833 cup için "¾" gösterilmez, 3,33 için "3 ⅓" gösterilir
    await expect(rowText(page, 'cup')).toHaveText('0,833');
    await expect(rowText(page, 'kf')).toContainText('3 ⅓');
  });

  test('3 yemek kaşığı = 45 ml; virgüllü ve kesirli giriş çalışır', async ({ page }) => {
    await open(page);
    await page.locator('#ing').selectOption('');
    await page.locator('#unit').selectOption('yk');
    await page.locator('#amount').fill('3');
    await expect(rowText(page, 'ml')).toHaveText('45');
    // malzeme seçilmediğinde ağırlık bloğu görünmez
    await expect(page.locator('#grp-wt')).toBeHidden();
    // virgüllü: 1,5 su bardağı = 300 ml
    await page.locator('#unit').selectOption('sb');
    await page.locator('#amount').fill('1,5');
    await expect(rowText(page, 'ml')).toHaveText('300');
    // kesirli: 1/2 su bardağı = 100 ml, 1 1/2 = 300 ml, ½ = 100 ml
    await page.locator('#amount').fill('1/2');
    await expect(rowText(page, 'ml')).toHaveText('100');
    await page.locator('#amount').fill('1 1/2');
    await expect(rowText(page, 'ml')).toHaveText('300');
    await page.locator('#amount').fill('½');
    await expect(rowText(page, 'ml')).toHaveText('100');
    // 1 ABD cup = 240 ml
    await page.locator('#unit').selectOption('cup');
    await page.locator('#amount').fill('1');
    await expect(rowText(page, 'ml')).toHaveText('240');
  });

  test('ters yön: 250 g un ≈ 2,27 su bardağı ve pratik kesir ipucu 2 ¼', async ({ page }) => {
    await open(page);
    await page.locator('#ing').selectOption('un');
    await page.locator('#unit').selectOption('g');
    await page.locator('#amount').fill('250');
    const sb = page.locator('#result [data-unit="sb"] dd');
    await expect(sb).toContainText('2,27');
    await expect(sb).toContainText('2 ¼');
    // malzeme yokken gramdan hacme çevrilemez: ipucu gösterilir, hata değil
    await page.locator('#ing').selectOption('');
    await expect(page.locator('#range')).toContainText('malzeme seçin');
    await expect(page.locator('#grp-vol')).toBeHidden();
    await expect(page.locator('#error')).toBeHidden();
  });

  test('hatalı giriş: harf, sıfır ve bozuk kesir için Türkçe, çözüm öneren hata', async ({ page }) => {
    await open(page);
    await page.locator('#amount').fill('abc');
    await expect(page.locator('#error')).toContainText('okunamadı');
    await expect(page.locator('#error')).toContainText('Rakam');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#amount').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#amount').fill('1/0');
    await expect(page.locator('#error')).toContainText('okunamadı');
    await page.locator('#amount').fill('-2');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    // düzeltince hata kalkar
    await page.locator('#amount').fill('2');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });

  test('malzemeler.json bütünlüğü: ≥40 malzeme, alanlar dolu ve pozitif, id benzersiz', async ({ request }) => {
    const res = await request.get(`${SLUG}malzemeler.json`);
    expect(res.ok()).toBeTruthy();
    const list: Ing[] = await res.json();
    expect(list.length).toBeGreaterThanOrEqual(40);
    expect(list).toEqual(ingredients);
    const ids = new Set<string>();
    for (const it of list) {
      expect(typeof it.id).toBe('string');
      expect(it.id.length).toBeGreaterThan(0);
      expect(typeof it.ad).toBe('string');
      expect(it.ad.trim().length).toBeGreaterThan(1);
      expect(typeof it.grup).toBe('string');
      expect(it.grup.trim().length).toBeGreaterThan(1);
      for (const k of ['g', 'min', 'max'] as const) {
        expect(Number.isFinite(it[k]), `${it.id}.${k}`).toBeTruthy();
        expect(it[k], `${it.id}.${k}`).toBeGreaterThan(0);
      }
      expect(it.min, it.id).toBeLessThanOrEqual(it.g);
      expect(it.g, it.id).toBeLessThanOrEqual(it.max);
      // su bardağı (200 ml) başına gram makul sınırlar içinde olmalı
      expect(it.g, it.id).toBeLessThanOrEqual(400);
      expect(ids.has(it.id), `yinelenen id: ${it.id}`).toBeFalsy();
      ids.add(it.id);
    }
    // görev listesinde istenen temel malzemeler
    for (const must of ['un', 'toz-seker', 'pudra-sekeri', 'pirinc', 'bulgur', 'irmik', 'misir-nisastasi', 'kakao', 'bal', 'sut', 'su', 'sivi-yag', 'tereyagi', 'yogurt', 'yulaf-ezmesi', 'nohut', 'tuz', 'kabartma-tozu', 'ceviz', 'badem', 'findik', 'hindistan-cevizi', 'susam', 'pekmez', 'recel', 'krema', 'bal-kabagi-puresi']) {
      expect(ids.has(must), `eksik malzeme: ${must}`).toBeTruthy();
    }
    expect(list.find((i) => i.id === 'su')!.g).toBe(200);
  });

  test('her malzeme seçilebilir ve hızlı tablo malzemeler.json ile tutarlı (20 satır)', async ({ page }) => {
    await open(page);
    const optionCount = await page.locator('#ing option').count();
    expect(optionCount).toBe(ingredients.length + 1);
    const rows = page.locator('#quick-table tbody tr');
    expect(await rows.count()).toBe(20);
    for (let i = 0; i < 20; i++) {
      const name = (await rows.nth(i).locator('th').innerText()).trim();
      const gText = (await rows.nth(i).locator('td').first().innerText()).replace(/\s*g$/, '').trim();
      const it = ingredients.find((x) => x.ad === name);
      expect(it, `tabloda JSON'da olmayan malzeme: ${name}`).toBeTruthy();
      expect(gText).toBe(String(it!.g));
    }
    // kopyala düğmesi: panoya yazar
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('#ing').selectOption('bal');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('bal');
    expect(clip).toContain('280');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam (a/b/c), SSS ≥7, JSON-LD geçerli', async ({ page }) => {
    await page.goto(SLUG);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="mutfak-olcu-donustur-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.getByText('%100 ücretsiz').first()).toBeAttached();
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types: string[] = [];
    let faqQuestions = 0;
    for (const b of blocks) {
      const j = JSON.parse(b); // bozuk tırnak/kaçış varsa burada patlar
      types.push(j['@type']);
      if (j['@type'] === 'FAQPage') faqQuestions = j.mainEntity.length;
    }
    expect(types).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    expect(faqQuestions).toBe(await page.locator('.ba-faq details').count());
    // reklam, araç kutusunun altında ve düğmelerin yanında/üstünde değil
    const adBox = await page.locator('.ba-ad').first().boundingBox();
    const toolBox = await page.locator('.ba-tool').boundingBox();
    expect(adBox!.y).toBeGreaterThanOrEqual(toolBox!.y + toolBox!.height);
  });

  test('360px genişlikte yatay taşma yok; klavyeyle kullanılır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    // sonuç açıkken (en geniş durum) taşma kontrolü
    await page.locator('#ing').selectOption('kabartma-tozu');
    await page.locator('#unit').selectOption('floz');
    await page.locator('#amount').fill('12345,678');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // klavye: miktara odaklan, yaz, Tab ile birime geç, ok tuşuyla birim değiştir
    await page.locator('#amount').focus();
    await page.keyboard.type('2');
    await page.keyboard.press('Tab');
    await expect(page.locator('#unit')).toBeFocused();
    await page.locator('#unit').selectOption('sb');
    await page.locator('#amount').fill('2');
    await page.keyboard.press('Enter');
    await expect(rowText(page, 'ml')).toHaveText('400');
  });
});
