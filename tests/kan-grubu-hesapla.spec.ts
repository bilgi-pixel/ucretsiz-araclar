import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/kan-grubu-hesapla/';
const KEYS = ['Apos', 'Aneg', 'Bpos', 'Bneg', 'ABpos', 'ABneg', '0pos', '0neg'];

type Parent = { abo: '0' | 'A' | 'B' | 'AB'; rh: '+' | '-'; gtAbo?: string; gtRh?: string };

async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül ve parametreler yüklenmeden form gönderilmesin
}

async function setParent(page: Page, px: 'm' | 'f', p: Parent) {
  await page.locator(`input[name="${px}-abo"][value="${p.abo}"]`).check();
  await page.locator(`input[name="${px}-rh"][value="${p.rh}"]`).check();
  const know = page.locator(`#${px}-know`);
  if (p.gtAbo || p.gtRh) {
    await know.check();
    if (p.gtAbo && (await page.locator(`#${px}-gt-abo`).isEnabled())) await page.locator(`#${px}-gt-abo`).selectOption(p.gtAbo);
    if (p.gtRh && (await page.locator(`#${px}-gt-rh`).isEnabled())) await page.locator(`#${px}-gt-rh`).selectOption(p.gtRh);
  } else {
    await know.uncheck();
  }
}

async function calcWith(page: Page, m: Parent, f: Parent) {
  await setParent(page, 'm', m);
  await setParent(page, 'f', f);
  await page.locator('#calc').click();
  await expect(page.locator('#result')).toHaveClass(/is-active/);
  await expect(page.locator('#result')).toBeVisible();
}

const num = (t: string | null) => Number(String(t).replace('%', '').replace(',', '.'));

async function comboSum(page: Page) {
  let s = 0;
  for (const k of KEYS) s += num(await page.locator('#p-' + k).textContent());
  return Math.round(s * 10) / 10;
}

test.describe('Kan Grubu Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').textContent())!.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const faq = await page.locator('.ba-faq details').count();
    expect(faq).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('.ba-ad[data-slot="kan-grubu-hesapla-' + s + '"]')).toHaveCount(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).map((t) => JSON.parse(t));
    const types = ld.map((j) => j['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('FAQPage');
    expect(ld.find((j) => j['@type'] === 'FAQPage').mainEntity.length).toBe(faq);
    // reklam A araç kutusunun dışında ve altında
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="kan-grubu-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
    await expect(page.locator('.ba-badges')).toContainText('Veri cihazdan çıkmaz');
    await expect(page.locator('.ba-hero')).toContainText('tıbbi tavsiye değildir');
    await expect(page.locator('#params-line')).toContainText('güncellendi');
    await expect(page.locator('#params-line')).toContainText('4 Kasım 2026');
    await expect(page.locator('#params-line')).toContainText('Kızılay');
    await expect(page.locator('#approx-warn')).toBeHidden(); // veri doğrulandı: yaklasik false
  });

  test('bilinen değerler: Mendel çaprazlamaları ve 8 kombinasyon', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);

    // 0 × 0 → 0 %100 (Rh− × Rh− → Rh− %100)
    await calcWith(page, { abo: '0', rh: '-' }, { abo: '0', rh: '-' });
    await expect(page.locator('#abo-0')).toHaveText('%100');
    await expect(page.locator('#p-0neg')).toHaveText('%100');
    await expect(page.locator('#rh-neg')).toHaveText('%100');
    await expect(page.locator('#rh-pos')).toHaveText('%0');
    await expect(page.locator('#possible')).toHaveText('0 Rh−');
    await expect(page.locator('#impossible')).toContainText('A Rh+');
    await expect(page.locator('#rh-warn')).toBeHidden();

    // AB × 0 → A %50, B %50; AB ve 0 imkânsız
    await calcWith(page, { abo: 'AB', rh: '-' }, { abo: '0', rh: '-' });
    await expect(page.locator('#abo-A')).toHaveText('%50');
    await expect(page.locator('#abo-B')).toHaveText('%50');
    await expect(page.locator('#abo-AB')).toHaveText('%0');
    await expect(page.locator('#abo-0')).toHaveText('%0');
    await expect(page.locator('#possible')).toHaveText('A Rh−, B Rh−');
    await expect(page.locator('#impossible')).toContainText('AB Rh−');
    await expect(page.locator('#impossible')).toContainText('0 Rh−');
    await expect(page.locator('#impossible-note')).toBeVisible();

    // A0 × A0 → A %75, 0 %25
    await calcWith(page, { abo: 'A', rh: '-', gtAbo: 'A0' }, { abo: 'A', rh: '-', gtAbo: 'A0' });
    await expect(page.locator('#abo-A')).toHaveText('%75');
    await expect(page.locator('#abo-0')).toHaveText('%25');
    await expect(page.locator('#pn-abo table td')).toHaveCount(4);
    await expect(page.locator('#pn-abo')).toContainText('00');

    // A0 × B0 → A, B, AB, 0 her biri %25
    await calcWith(page, { abo: 'A', rh: '-', gtAbo: 'A0' }, { abo: 'B', rh: '-', gtAbo: 'B0' });
    for (const g of ['A', 'B', 'AB', '0']) await expect(page.locator('#abo-' + g)).toHaveText('%25');

    // AB × AB → A %25, B %25, AB %50
    await calcWith(page, { abo: 'AB', rh: '-' }, { abo: 'AB', rh: '-' });
    await expect(page.locator('#abo-A')).toHaveText('%25');
    await expect(page.locator('#abo-B')).toHaveText('%25');
    await expect(page.locator('#abo-AB')).toHaveText('%50');
    await expect(page.locator('#abo-0')).toHaveText('%0');

    // Dd × Dd → Rh+ %75, Rh− %25
    await calcWith(page, { abo: '0', rh: '+', gtRh: 'Dd' }, { abo: '0', rh: '+', gtRh: 'Dd' });
    await expect(page.locator('#rh-pos')).toHaveText('%75');
    await expect(page.locator('#rh-neg')).toHaveText('%25');

    // A0 Dd × B0 dd → 8 kombinasyonun her biri %12,5; toplam %100
    await calcWith(page, { abo: 'A', rh: '+', gtAbo: 'A0', gtRh: 'Dd' }, { abo: 'B', rh: '-', gtAbo: 'B0' });
    for (const k of KEYS) await expect(page.locator('#p-' + k)).toHaveText('%12,5');
    expect(await comboSum(page)).toBe(100);
    await expect(page.locator('#sum-line')).toContainText('%100');
    await expect(page.locator('#impossible')).toContainText('Yok');
    await expect(page.locator('#r-best')).toContainText('En olası kan grupları');

    // Aynı seçimle tekrar hesap: sonuç değişmez, satırlar çoğalmaz
    await page.locator('#calc').click();
    await expect(page.locator('#combo-list li')).toHaveCount(8);
    await expect(page.locator('#pn-abo table')).toHaveCount(1);
    await expect(page.locator('#pn-rh table')).toHaveCount(1);
    for (const k of KEYS) await expect(page.locator('#p-' + k)).toHaveText('%12,5');

    // Saf fonksiyonlar test kancasıyla
    const r = await page.evaluate(() => {
      const t = (window as any).__kanGrubuHesaplaTest();
      const x = t.calc({ abo: 'AB', rh: '+', gtRh: 'DD' }, { abo: '0', rh: '-' }, t.EQUAL);
      return { a: x.abo.A, ab: x.abo.AB, pos: x.rh['+'], round: t.roundPercents([1, 1, 1]) };
    });
    expect(r.a).toBeCloseTo(0.5, 10);
    expect(r.ab).toBe(0);
    expect(r.pos).toBeCloseTo(1, 10);
    expect(r.round.reduce((a: number, b: number) => a + b, 0)).toBeCloseTo(100, 6);

    expect(external).toEqual([]);
    noErrors();
  });

  test('ağırlık ayarı: Türkiye dağılımı ve eşit ağırlık; Rh uyuşmazlığı uyarısı', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await expect(page.locator('#w-info')).toContainText('%80,2');
    // Genotip bilinmiyor: A Rh+ × 0 Rh− → Türkiye dağılımında A0 %80,2, Dd %51,5
    await calcWith(page, { abo: 'A', rh: '+' }, { abo: '0', rh: '-' });
    await expect(page.locator('#abo-0')).toHaveText('%40,1');
    await expect(page.locator('#abo-A')).toHaveText('%59,9');
    await expect(page.locator('#rh-neg')).toHaveText('%25,7');
    await expect(page.locator('#rh-pos')).toHaveText('%74,3');
    await expect(page.locator('#explain')).toContainText('Türkiye dağılımı');
    await expect(page.locator('#rh-warn')).toBeHidden();
    expect(await comboSum(page)).toBe(100);

    // Eşit ağırlık: sonuç açıkken ağırlık değişince düğmeye basmadan yeniden hesaplanır
    await page.locator('input[name="weight"][value="esit"]').check();
    await expect(page.locator('#w-info')).toContainText('Eşit ağırlık');
    await expect(page.locator('#abo-0')).toHaveText('%25');
    await page.locator('#calc').click();
    await expect(page.locator('#abo-0')).toHaveText('%25');
    await expect(page.locator('#abo-A')).toHaveText('%75');
    await expect(page.locator('#rh-neg')).toHaveText('%25');
    await expect(page.locator('#explain')).toContainText('eşit ağırlık');

    // Anne Rh−, baba Rh+ → Rh uyuşmazlığı bilgisi, anti-D ve hekim notu
    await calcWith(page, { abo: '0', rh: '-' }, { abo: 'A', rh: '+' });
    await expect(page.locator('#rh-warn')).toBeVisible();
    await expect(page.locator('#rh-warn')).toContainText('anti-D', { ignoreCase: true });
    await expect(page.locator('#rh-warn')).toContainText('hekim');
    await expect(page.locator('#rh-baby')).toHaveText('%75');
    await expect(page.locator('#result')).toContainText('Babalık tespiti için kullanılamaz');
    await expect(page.locator('#result')).toContainText('Bombay');
    await expect(page.locator('#result')).toContainText('cis-AB');
    await expect(page.locator('#result')).toContainText('tıbbi tavsiye değildir');
    expect(external).toEqual([]);
    noErrors();
  });

  test('hatalı ve bozuk girdiler Türkçe, çözüm öneren hata verir; sayfa çökmez', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Annenin ABO kan grubunu seçin');
    await expect(page.locator('#error')).toContainText('kan grubu kartına');
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('input[name="m-abo"][value="A"]').check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Annenin Rh faktörünü');
    await page.locator('input[name="m-rh"][value="+"]').check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Babanın ABO kan grubunu seçin');

    // Bozuk genotip seçeneği (DOM elle bozulmuş)
    await setParent(page, 'f', { abo: 'B', rh: '+' });
    await page.locator('#f-know').check();
    await page.evaluate(() => { const s = document.getElementById('f-gt-abo') as HTMLSelectElement; s.innerHTML = '<option value="ZZ">ZZ</option>'; s.value = 'ZZ'; });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('genotip seçimi kan grubuyla uyuşmuyor');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-know').uncheck();

    // Bozuk radyo değeri
    await page.evaluate(() => { const r = document.querySelector('input[name="m-abo"][value="A"]') as HTMLInputElement; r.value = 'X'; });
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('okunamadı');
    await expect(page.locator('#result')).toBeHidden();

    // Hata sonrası geçerli seçimle düzelir
    await page.locator('input[name="m-abo"][value="0"]').check();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#result')).toHaveClass(/is-active/);

    // Temizle
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('input[name="m-abo"]:checked')).toHaveCount(0);

    // Uyum modunda seçim yapılmadan
    await page.locator('input[name="mode"][value="compat"]').check();
    await page.locator('#compat-btn').click();
    await expect(page.locator('#error')).toContainText('bir kan grubu seçin');
    noErrors();
  });

  test('bozuk parametreler.json: varsayılan değerlerle çalışmaya devam eder', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.route('**/kan-grubu-hesapla/parametreler.json', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{bozuk json' }));
    await open(page);
    await calcWith(page, { abo: 'A', rh: '+' }, { abo: '0', rh: '-' });
    await expect(page.locator('#abo-0')).toHaveText('%40,1');
    await expect(page.locator('#params-line')).toContainText('güncellendi');
    noErrors();
  });

  test('kan uyumu tablosu: eritrosit, tam kan ve plazma ayrı', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('input[name="mode"][value="compat"]').check();
    await expect(page.locator('#panel-compat')).toBeVisible();
    await expect(page.locator('#panel-baby')).toBeHidden();

    await page.locator('input[name="cg"][value="0-"]').check();
    await expect(page.locator('#compat-result')).toHaveClass(/is-active/);
    await expect(page.locator('#c-rbc-give')).toContainText('Tüm gruplar');
    await expect(page.locator('#c-rbc-get')).toHaveText('0 Rh−');
    await expect(page.locator('#c-wb-give')).toHaveText('0 Rh+, 0 Rh−');
    await expect(page.locator('#c-pl-give')).toHaveText('0 Rh+, 0 Rh−');
    await expect(page.locator('#c-pl-get')).toContainText('Tüm gruplar');

    await page.locator('input[name="cg"][value="AB+"]').check();
    await expect(page.locator('#c-rbc-get')).toContainText('Tüm gruplar');
    await expect(page.locator('#c-rbc-give')).toHaveText('AB Rh+');
    await expect(page.locator('#c-pl-give')).toContainText('Tüm gruplar');
    await expect(page.locator('#c-pl-get')).toHaveText('AB Rh+, AB Rh−');
    await expect(page.locator('#c-wb-get')).toHaveText('AB Rh+, AB Rh−');

    await page.locator('input[name="cg"][value="A-"]').check();
    await expect(page.locator('#c-rbc-give')).toHaveText('A Rh+, A Rh−, AB Rh+, AB Rh−');
    await expect(page.locator('#c-rbc-get')).toHaveText('A Rh−, 0 Rh−');
    await expect(page.locator('#c-wb-give')).toHaveText('A Rh+, A Rh−');
    await expect(page.locator('#c-pl-give')).toHaveText('A Rh+, A Rh−, 0 Rh+, 0 Rh−');
    await expect(page.locator('#c-pl-get')).toHaveText('A Rh+, A Rh−, AB Rh+, AB Rh−');
    expect(external).toEqual([]);
    noErrors();
  });

  test('klavyeyle kullanım: radyo grupları ve hesapla düğmesi', async ({ page }) => {
    await open(page);
    const first = page.locator('input[name="m-abo"][value="0"]');
    await first.focus();
    await page.keyboard.press('Space');
    await expect(first).toBeChecked();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('input[name="m-abo"][value="A"]')).toBeChecked();
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="m-rh"][value="+"]')).toBeFocused();
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('input[name="m-rh"][value="-"]')).toBeChecked();
    await page.keyboard.press('Tab');
    await expect(page.locator('#m-know')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="f-abo"][value="0"]')).toBeFocused();
    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(page.locator('input[name="f-rh"][value="+"]')).toBeChecked();
    await page.keyboard.press('Tab'); // f-know
    await page.keyboard.press('Tab'); // ağırlık grubu (seçili olana)
    await expect(page.locator('input[name="weight"][value="turkiye"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#calc')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    // anne A Rh−, baba 0 Rh+ → Rh uyarısı görünür
    await expect(page.locator('#rh-warn')).toBeVisible();
    await expect(page.locator('#abo-B')).toHaveText('%0');
  });

  test('360px genişlikte yatay taşma yok (sonuçlar ve Punnett karesi açıkken)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await calcWith(page, { abo: 'AB', rh: '+' }, { abo: 'A', rh: '+' });
    await page.locator('input[name="m-abo"][value="A"]').check();
    await page.locator('#calc').click();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('input[name="mode"][value="compat"]').check();
    await page.locator('input[name="cg"][value="0-"]').check();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
});
