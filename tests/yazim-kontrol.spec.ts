import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/yazim-kontrol/';

async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('body')).toHaveAttribute('data-ready', '1');
}

const marks = (page: Page) => page.locator('#marked mark');

test.describe('Türkçe Yazım Denetimi', () => {
  test('"denem" işaretlenir, öneride "deneme" var; öneri uygulanınca sorun kalmaz', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#input').fill('Bu bir denem metni');
    await expect(marks(page)).toHaveCount(1);
    await expect(marks(page).first()).toHaveText('denem');
    await marks(page).first().click();
    await expect(page.locator('#suggestions button', { hasText: 'deneme' }).first()).toBeVisible();
    await page.locator('#suggestions button', { hasText: /^deneme$/ }).click();
    await expect(page.locator('#input')).toHaveValue('Bu bir deneme metni');
    await expect(marks(page)).toHaveCount(0);
    await expect(page.locator('#count')).toHaveText('Sorun bulunamadı');
    expect(external).toEqual([]);
    noErrors();
  });

  test('"sey" için ilk öneri "şey"', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Bu sey güzel');
    await expect(marks(page)).toHaveCount(1);
    await marks(page).first().click();
    await expect(page.locator('#suggestions button').first()).toHaveText('şey');
  });

  test('özel ad (Ankara) ve çekimli sözcükler işaretlenmez', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Dün Ankara güzel bir şehir olduğunu kitaplarımızdan okuyorduk, evlerinde gidiyorlardı.');
    await expect(page.locator('#count')).toHaveText('Sorun bulunamadı');
    await expect(marks(page)).toHaveCount(0);
  });

  test('"Geldimi" için mı/mi eki ipucu; öneri "Geldi mi"', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Geldimi diye sordum');
    await expect(marks(page)).toHaveCount(1);
    await expect(marks(page).first()).toHaveText('Geldimi');
    await marks(page).first().click();
    await expect(page.locator('#detail')).toContainText('Soru eki');
    await page.locator('#suggestions button', { hasText: 'Geldi mi' }).click();
    await expect(page.locator('#input')).toHaveValue('Geldi mi diye sordum');
  });

  test('çift boşluk ve noktalama sonrası boşluk bulunur; toplu düzeltme çalışır', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Bu bir  metin,ama güzel .');
    await expect(page.locator('#breakdown')).toContainText('Kural: 3');
    await expect(page.locator('#fix-format')).toBeVisible();
    await page.locator('#fix-format').click();
    await expect(page.locator('#input')).toHaveValue('Bu bir metin, ama güzel.');
    await expect(page.locator('#count')).toHaveText('Sorun bulunamadı');
  });

  test('Yoksay sözcüğü işaretten çıkarır; cümle başı küçük harf kuralı çalışır', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Merhaba. yarın görüşürüz kjhgfa');
    await expect(marks(page)).toHaveCount(2);
    await marks(page).nth(1).click();
    await page.locator('#ignore').click();
    await expect(marks(page)).toHaveCount(1);
    await expect(marks(page).first()).toHaveText('yarın');
    await marks(page).first().focus();
    await page.keyboard.press('Enter');
    await page.locator('#suggestions button', { hasText: 'Yarın' }).click();
    await expect(page.locator('#input')).toHaveValue('Merhaba. Yarın görüşürüz kjhgfa');
  });

  test('kitapda: de/da ipucu iki seçenek sunar (kitap da / kitapta)', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Bu kitapda yazıyor');
    await expect(marks(page)).toHaveCount(1);
    await marks(page).first().click();
    await expect(page.locator('#suggestions button', { hasText: 'kitap da' })).toBeVisible();
    await expect(page.locator('#suggestions button', { hasText: 'kitapta' })).toBeVisible();
  });

  test('düzeltilmiş metni kopyala panoya yazar', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await page.locator('#input').fill('Bu bir denem metni');
    await marks(page).first().click();
    await page.locator('#suggestions button', { hasText: /^deneme$/ }).click();
    await page.locator('#copy').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Bu bir deneme metni');
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
    await page.locator('#input').fill('Bu bir denem metni ve çok uzun_bir_sözcük_yazılmış_olsun_ki_taşma_olmasın');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    expect(external).toEqual([]);
  });
});
