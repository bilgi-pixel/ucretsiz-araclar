import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/hece-ayirma/';

async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('body')).toHaveAttribute('data-ready', '1');
}

test.describe('Hece Ayırma', () => {
  test('tek sözcüklerin heceleri', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    const cases: Array<[string, string, number]> = [
      ['araba', 'a-ra-ba', 3],
      ['kardeş', 'kar-deş', 2],
      ['elektrik', 'e-lek-trik', 3],
      ['Türkiye', 'Tür-ki-ye', 3],
      ['kitaplık', 'ki-tap-lık', 3],
      ['öğretmen', 'öğ-ret-men', 3],
      ['kontrol', 'kont-rol', 2],
      ['saat', 'sa-at', 2],
    ];
    for (const [word, expected, n] of cases) {
      await page.locator('#input').fill(word);
      await expect(page.locator('#out')).toHaveText(expected);
      await expect(page.locator('#single')).toContainText(`(${n} hece)`);
    }
    expect(external).toEqual([]);
    noErrors();
  });

  test('satır sonu bölme önerisi tek harf bırakmaz', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('araba');
    await expect(page.locator('#breaks')).toContainText('ara-ba');
    await expect(page.locator('#breaks')).not.toContainText('a-raba');
    await page.locator('#input').fill('kitaplık');
    await expect(page.locator('#breaks')).toContainText('kitap-lık');
    await expect(page.locator('#breaks')).toContainText('ki-taplık');
  });

  test('metin modu: hece sayıları, tablo ve kesme işareti', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill("Ankara'nın kardeş okulu, araba!");
    await expect(page.locator('#out')).toHaveText("An-ka-ra'-nın kar-deş o-ku-lu, a-ra-ba!");
    await expect(page.locator('#n-words')).toHaveText('4');
    await expect(page.locator('#n-syl')).toHaveText('12');
    await expect(page.locator('#rows tr')).toHaveCount(4);
    await expect(page.locator('#rows tr').nth(1)).toContainText('kar-deş');
    await expect(page.locator('#rows tr').nth(1).locator('td').last()).toHaveText('2');
  });

  test('şiir modu: 11\'li ölçüde satır hece sayıları ve duraklar', async ({ page }) => {
    await open(page);
    await page.locator('input[name=mode][value=poem]').check();
    await expect(page.locator('#meter-wrap')).toBeVisible();
    await page.locator('#input').fill('Bir ben vardır bende, benden içeru\nDağlar ile taşlar ile\nBen gidersem sen kal gülüm yanımda');
    const lines = page.locator('#poem .hc-line');
    await expect(lines).toHaveCount(3);
    await expect(lines.nth(0)).toHaveAttribute('data-count', '11');
    await expect(lines.nth(0)).toHaveAttribute('data-status', 'uygun');
    await expect(lines.nth(0).locator('.txt')).toHaveText('Bir ben var-dır ben-de | ben-den i-çe-ru');
    await expect(lines.nth(1)).toHaveAttribute('data-count', '8');
    await expect(lines.nth(1).locator('.st')).toContainText('3 hece eksik');
    await expect(lines.nth(2)).toHaveAttribute('data-count', '11');
    await expect(page.locator('#p-lines')).toHaveText('3');
    await expect(page.locator('#p-summary')).toContainText('2');
    // 8'li (4+4) seçilince ikinci satır uygun
    await page.locator('#olcu').selectOption('8-44');
    await expect(lines.nth(1)).toHaveAttribute('data-status', 'uygun');
    await expect(lines.nth(0).locator('.st')).toContainText('3 hece fazla');
    // 4+4+3 durakları
    await page.locator('#olcu').selectOption('11-443');
    await expect(lines.nth(0).locator('.txt')).toHaveText('Bir ben var-dır | ben-de ben-den | i-çe-ru');
  });

  test('sonucu kopyala: hecelenmiş metin panoya gider', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await page.locator('#input').fill('araba kardeş');
    await page.locator('#copy').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('a-ra-ba kar-deş');
  });

  test('boş girişte hata yok; örnek yükle ve temizle çalışır', async ({ page }) => {
    await open(page);
    await expect(page.locator('#n-syl')).toHaveText('0');
    await page.locator('#sample').click();
    await expect(page.locator('#out')).toContainText('e-lek-trik');
    await page.locator('#clear').click();
    await expect(page.locator('#input')).toHaveValue('');
    await expect(page.locator('#n-syl')).toHaveText('0');
  });

  test('sayfa: ≥800 sözcük, 3 reklam, JSON-LD, 360px taşma yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('main').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(800);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    const types = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '')['@type']));
    expect(types).toEqual(expect.arrayContaining(['FAQPage', 'SoftwareApplication']));
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(7);
    await page.locator('#input').fill('Mukaddimeyi kütüphanelerinizdekilerden okuyabileceklerimizdendir bu uzun sözcük');
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    await page.locator('input[name=mode][value=poem]').check();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    expect(external).toEqual([]);
  });
});
