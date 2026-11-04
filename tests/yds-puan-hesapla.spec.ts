import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/yds-puan-hesapla/';

async function open(page: Page, suffix = '') {
  await page.goto(URL + suffix);
  await page.waitForLoadState('networkidle'); // modül betiği ve parametreler yüklenmeden form gönderilmesin
}

async function scoreOf(page: Page, correct: string, opts: { wrong?: string; blank?: string } = {}) {
  await page.locator('#correct').fill(correct);
  await page.locator('#wrong').fill(opts.wrong ?? '');
  await page.locator('#blank').fill(opts.blank ?? '');
  await page.locator('#calc').click();
}

test.describe('YDS Puan Hesaplama', () => {
  test('sayfa içeriği: en az 900 kelime, SSS >= 7, 3 reklam, JSON-LD, reklam A araç kutusunun altında', async ({ page }) => {
    await open(page);
    await expect(page.locator('h1')).toContainText('YDS Puan Hesaplama');
    await expect(page).toHaveTitle(/YDS Puan Hesaplama 2026/);
    const words = (await page.locator('.ba-content').textContent())!.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="yds-puan-hesapla-${s}"]`)).toHaveCount(1);
    // reklam araç kutusunun içinde değil, altında
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const tool = await page.locator('.ba-tool').boundingBox();
    const ad = await page.locator('.ba-ad[data-slot="yds-puan-hesapla-a"]').boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(tool!.y + tool!.height - 1);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t));
    const types = ld.map((x) => x['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('FAQPage');
    const faq = ld.find((x) => x['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    // gizlilik rozeti ve güncelleme satırı
    await expect(page.locator('.ba-badges')).toContainText('cihazınızdan çıkmaz');
    await expect(page.locator('#params-line')).toContainText('güncellendi');
    await expect(page.locator('#uyari')).toBeHidden(); // tüm değerler doğrulandı (yaklasik: false)
  });

  test('bilinen değerler: doğru sayısından puan ve seviye (pageerror ve dış istek yok)', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    const cases: [string, string, string][] = [
      ['60', '75,00', 'C'],
      ['44', '55,00', 'E'],
      ['52', '65,00', 'D'],
      ['56', '70,00', 'C'],
      ['64', '80,00', 'B'],
      ['72', '90,00', 'A'],
      ['80', '100,00', 'A'],
      ['39', '48,75', 'Seviye yok (50 altı)'],
    ];
    for (const [d, score, level] of cases) {
      await scoreOf(page, d);
      await expect(page.locator('#result')).toHaveClass(/is-active/);
      await expect(page.locator('#result')).toBeVisible();
      await expect(page.locator('#r-score')).toHaveText(score);
      await expect(page.locator('#r-level')).toHaveText(level);
    }
    await expect(page.locator('#r-per')).toHaveText('1,25 puan');
    // yanlışlar puanı düşürmez
    await scoreOf(page, '60', { wrong: '15', blank: '5' });
    await expect(page.locator('#r-score')).toHaveText('75,00');
    await expect(page.locator('#r-wrong')).toHaveText('15 yanlış, 5 boş');
    await expect(page.locator('#r-headline')).toHaveText('75,00 puan · C seviyesi');
    // yalnızca biri girildiyse diğeri kalan sorudan bulunur (0 gösterilmez)
    await scoreOf(page, '60', { wrong: '12' });
    await expect(page.locator('#r-wrong')).toHaveText('12 yanlış, 8 boş');
    await scoreOf(page, '60', { blank: '7' });
    await expect(page.locator('#r-wrong')).toHaveText('13 yanlış, 7 boş');
    expect(external).toEqual([]);
    noErrors();
  });

  test('sonraki seviye ve eşik kontrol listesi (YDS ve YÖKDİL farkı)', async ({ page }) => {
    await open(page);
    await scoreOf(page, '60');
    await expect(page.locator('#r-next')).toHaveText('B seviyesi (80 puan) için 64 doğru gerekir: 4 doğru daha.');
    await scoreOf(page, '39');
    await expect(page.locator('#r-next')).toContainText('40 doğru gerekir: 1 doğru daha');
    await scoreOf(page, '72');
    await expect(page.locator('#r-next')).toContainText('En üst seviye');

    await scoreOf(page, '44');
    const li = (id: string) => page.locator(`#r-checks li[data-id="${id}"]`);
    await expect(li('doktora')).toHaveAttribute('data-status', 'ok');
    await expect(li('docentlik')).toHaveAttribute('data-status', 'ok');
    await expect(li('tus')).toHaveAttribute('data-status', 'ok');
    await expect(li('yuksek_lisans')).toHaveAttribute('data-status', 'info');
    await expect(li('tazminat')).toHaveAttribute('data-status', 'no');
    await expect(li('tazminat')).toContainText('12 doğru daha');
    await expect(li('tazminat').locator('a')).toHaveAttribute('href', /mevzuat\.gov\.tr/);

    // YÖKDİL: tazminat geçerli değil, seviye harfi karşılaştırma amaçlı
    await page.locator('#exam').selectOption('yokdil-saglik');
    await scoreOf(page, '60');
    await expect(li('tazminat')).toHaveAttribute('data-status', 'na');
    await expect(li('tazminat')).toContainText('YÖKDİL ile yabancı dil tazminatı alınamaz');
    await expect(page.locator('#r-level')).toHaveText('C (YDS bandına göre)');
    await expect(page.locator('#r-headline')).toHaveText('75,00 puan · C seviyesi (YDS bandına göre)');
    await expect(page.locator('#r-note')).toContainText('YÖKDİL kılavuzunda A–E seviyesi tanımlanmaz');
  });

  test('ters mod: hedef puan için gereken en az doğru', async ({ page }) => {
    await open(page);
    await page.locator('input[name="mode"][value="hedef"]').check();
    await expect(page.locator('#target')).toBeVisible();
    await expect(page.locator('#correct')).toBeHidden();
    const cases: [string, string][] = [['55', '44 doğru'], ['70', '56 doğru'], ['65', '52 doğru'], ['72,5', '58 doğru'], ['71', '57 doğru']];
    for (const [target, need] of cases) {
      await page.locator('#target').fill(target);
      await page.locator('#calc').click();
      await expect(page.locator('#result')).toHaveClass(/is-active/);
      await expect(page.locator('#t-correct')).toHaveText(need);
    }
    await expect(page.locator('#t-score')).toHaveText('71,25');
    await expect(page.locator('#t-slack')).toHaveText('23 soru');
    // 3 ondalık: 55,004 için 44 doğru (55,00) yetmez → 45 doğru
    await page.locator('#target').fill('55,004');
    await page.locator('#calc').click();
    await expect(page.locator('#t-correct')).toHaveText('45 doğru');
    await expect(page.locator('#t-target')).toHaveText('55,004');
    // 3'ten fazla ondalık kabul edilmez (yuvarlama eksik doğru verirdi)
    await page.locator('#target').fill('55,0001');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('en çok 3 ondalık');
    await expect(page.locator('#result')).toBeHidden();
    // hızlı hedef düğmesi
    await page.locator('[data-target="90"]').click();
    await expect(page.locator('#t-correct')).toHaveText('72 doğru');
    await expect(page.locator('#t-level')).toHaveText('A');
  });

  test('iptal edilen soru: ÖSYM kuralına göre puan değeri yeniden saptanır', async ({ page }) => {
    await open(page);
    await page.locator('#has-cancel').check();
    await expect(page.locator('#cancel')).toBeVisible();
    await page.locator('#cancel').fill('1');
    await scoreOf(page, '60');
    await expect(page.locator('#r-score')).toHaveText('75,95');
    await expect(page.locator('#r-per')).toHaveText('1,2658 puan');
    await expect(page.locator('#r-correct')).toHaveText('60 / 79');
    await expect(page.locator('#r-note')).toContainText('İptal edilen 1 soru');
    // iptal dahil toplam 80'i aşamaz
    await scoreOf(page, '60', { wrong: '15', blank: '5' });
    await expect(page.locator('#error')).toContainText("toplamı 80'i aşamaz");
    await expect(page.locator('#result')).toBeHidden();
    // 80 doğru + 1 iptal olamaz
    await scoreOf(page, '80');
    await expect(page.locator('#error')).toContainText('en fazla 79 doğru');
    // ters mod: iptalli hedef 70 → ⌈70 × 79 / 100⌉ = 56
    await page.locator('input[name="mode"][value="hedef"]').check();
    await page.locator('#target').fill('70');
    await page.locator('#calc').click();
    await expect(page.locator('#t-correct')).toHaveText('56 doğru');
    await expect(page.locator('#t-score')).toHaveText('70,89');
  });

  test('hatalı girişler: Türkçe ve çözüm öneren hata, sonuç gizlenir', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    const bad: [string, string][] = [
      ['', 'Doğru sayınızı girin'],
      ['-3', 'negatif olamaz'],
      ['44,5', 'tam sayı olmalıdır'],
      ['abc', 'okunamadı'],
      ['81', "80'den büyük olamaz"],
    ];
    for (const [v, msg] of bad) {
      await scoreOf(page, '60');
      await expect(page.locator('#result')).toBeVisible();
      await scoreOf(page, v);
      await expect(page.locator('#error')).toContainText(msg);
      await expect(page.locator('#result')).toBeHidden();
    }
    // toplam 80'i aşan giriş
    await scoreOf(page, '60', { wrong: '15', blank: '10' });
    await expect(page.locator('#error')).toContainText("Doğru + yanlış + boş toplamı 80'i aşamaz (şu an 85)");
    // ondalık virgüllü tam sayı kabul edilir
    await scoreOf(page, '44,0');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-score')).toHaveText('55,00');
    // hedef modunda geçersiz değerler
    await page.locator('input[name="mode"][value="hedef"]').check();
    for (const [v, msg] of [['120', 'en fazla 100'], ['0', "0'dan büyük"], ['x', 'okunamadı'], ['', 'Hedef puanı girin']]) {
      await page.locator('#target').fill(v);
      await page.locator('#calc').click();
      await expect(page.locator('#error')).toContainText(msg);
      await expect(page.locator('#result')).toBeHidden();
    }
    // iptal sayısı geçersiz
    await page.locator('#has-cancel').check();
    await page.locator('#cancel').fill('80');
    await page.locator('#target').fill('55');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('İptal edilen soru sayısı 0 ile 79');
    noErrors();
  });

  test('paylaşılabilir bağlantı: yalnız sayılar, # ile açılır; bozuk bağlantı çökmez', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await scoreOf(page, '60', { wrong: '12' });
    expect(new globalThis.URL(page.url()).hash).toBe('#sinav=yds&d=60&y=12');
    expect(new globalThis.URL(page.url()).search).toBe('');
    await expect(page.locator('#share-url')).toContainText('#sinav=yds&d=60');

    await open(page, '#sinav=yokdil-fen&d=72');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-score')).toHaveText('90,00');
    await expect(page.locator('#exam')).toHaveValue('yokdil-fen');

    await open(page, '#sinav=eyds&mod=hedef&h=72%2C5&i=1');
    await expect(page.locator('#t-correct')).toHaveText('58 doğru'); // ⌈72,5 × 79 / 100⌉ = 58
    await expect(page.locator('#has-cancel')).toBeChecked();

    await open(page, '#sinav=xxx&d=abc');
    await expect(page.locator('#error')).toContainText('Bağlantıdaki bazı değerler geçersiz');
    await expect(page.locator('#result')).toBeHidden();

    await open(page, '#d=999');
    await expect(page.locator('#error')).toContainText("80'den büyük olamaz");

    // Temizle: alanlar ve adresteki değerler silinir
    await open(page, '#sinav=yds&d=60');
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#correct')).toHaveValue('');
    expect(new globalThis.URL(page.url()).hash).toBe('');
    expect(external).toEqual([]);
    noErrors();
  });

  test('klavyeyle kullanım: Tab ile alana gelip Enter ile hesaplanır', async ({ page }) => {
    await open(page);
    await page.locator('#exam').focus();
    await page.keyboard.press('Tab'); // mod radyo grubu
    await page.keyboard.press('Tab'); // doğru sayısı
    await expect(page.locator('#correct')).toBeFocused();
    await page.keyboard.type('56');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-score')).toHaveText('70,00');
  });

  test('360px genişlikte yatay taşma yok (sonuç, eşik listesi ve paylaşım adresi açıkken)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    let overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.locator('#has-cancel').check();
    await page.locator('#cancel').fill('2');
    await scoreOf(page, '38', { wrong: '20', blank: '19' }); // 38 × 100 / 78 = 48,72 → seviye yok
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#exam').selectOption('yokdil-sosyal');
    await expect(page.locator('#r-level')).toHaveText('Seviye yok (50 altı)');
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.locator('input[name="mode"][value="hedef"]').check();
    await page.locator('#target').fill('72,5');
    await page.locator('#calc').click();
    await expect(page.locator('#result')).toBeVisible();
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    noErrors();
  });
});
