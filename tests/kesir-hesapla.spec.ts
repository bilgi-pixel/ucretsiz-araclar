import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// Sayfayı açar; modül betiği yüklenmeden form gönderilmesin.
async function open(page: Page) {
  await page.goto('/kesir-hesapla/');
  await page.waitForLoadState('networkidle');
}

async function operate(page: Page, a: string, op: 'add' | 'sub' | 'mul' | 'div', b: string) {
  await page.locator('#m-islem').check();
  await page.locator('#a').fill(a);
  await page.locator('#op').selectOption(op);
  await page.locator('#b').fill(b);
  await page.locator('#calc').click();
}

test.describe('Kesir Hesaplama', () => {
  test('1/2 + 1/3 = 5/6; adımlarda EBOB/EKOK görünür; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await operate(page, '1/2', 'add', '1/3');
    await expect(page.locator('#r-fraction')).toHaveText('5/6');
    await expect(page.locator('#r-decimal')).toHaveText('0,8(3)');
    await expect(page.locator('#r-approx')).toContainText('0,8333');
    await expect(page.locator('#r-percent')).toHaveText('%83,(3)');
    await expect(page.locator('#r-main')).toContainText('1/2 + 1/3 = 5/6');
    const steps = page.locator('#r-steps');
    await expect(steps).toContainText('EBOB(2, 3) = 1');
    await expect(steps).toContainText('EKOK(2, 3) = (2 × 3) ÷ 1 = 6');
    await expect(steps).toContainText('3/6 + 2/6 = 5/6');
    expect(await page.locator('#r-steps li').count()).toBeGreaterThanOrEqual(5);
    expect(external).toEqual([]);
    noErrors();
  });

  test('3/4 ÷ 1/2 = 3/2 = 1 1/2 ve diğer işlemler', async ({ page }) => {
    await open(page);
    await operate(page, '3/4', 'div', '1/2');
    await expect(page.locator('#r-fraction')).toHaveText('3/2');
    await expect(page.locator('#r-mixed')).toHaveText('1 1/2');
    await expect(page.locator('#r-decimal')).toHaveText('1,5');
    await expect(page.locator('#r-percent')).toHaveText('%150');
    await expect(page.locator('#r-steps')).toContainText('tersiyle çarpmaya');
    await operate(page, '2/4', 'sub', '1/6');
    await expect(page.locator('#r-fraction')).toHaveText('1/3');
    await expect(page.locator('#r-decimal')).toHaveText('0,(3)');
    await operate(page, '2/3', 'mul', '3/5');
    await expect(page.locator('#r-fraction')).toHaveText('2/5');
    // Tam sayılı kesir ve ondalık girişler
    await operate(page, '3 1/4', 'add', '2 2/3');
    await expect(page.locator('#r-fraction')).toHaveText('71/12');
    await expect(page.locator('#r-mixed')).toHaveText('5 11/12');
    await operate(page, '1 1/2', 'mul', '0,75');
    await expect(page.locator('#r-fraction')).toHaveText('9/8');
    await expect(page.locator('#r-decimal')).toHaveText('1,125');
    // Negatif sonuç
    await operate(page, '1/4', 'sub', '3/4');
    await expect(page.locator('#r-fraction')).toHaveText('-1/2');
    // Örnek düğmesi
    await page.getByRole('button', { name: '1/2 + 1/3', exact: true }).click();
    await expect(page.locator('#r-fraction')).toHaveText('5/6');
  });

  test('0,75 → 3/4 ve kesir – ondalık – yüzde dönüşümü', async ({ page }) => {
    await open(page);
    await page.locator('#m-donustur').check();
    await expect(page.locator('#wrap-b')).toBeHidden();
    await page.locator('#a').fill('0,75');
    await page.locator('#calc').click();
    await expect(page.locator('#r-fraction')).toHaveText('3/4');
    await expect(page.locator('#r-decimal')).toHaveText('0,75');
    await expect(page.locator('#r-percent')).toHaveText('%75');
    await page.locator('#a').fill('1/3');
    await page.locator('#calc').click();
    await expect(page.locator('#r-decimal')).toHaveText('0,(3)');
    await page.locator('#a').fill('%12,5');
    await page.locator('#calc').click();
    await expect(page.locator('#r-fraction')).toHaveText('1/8');
    await page.locator('#a').fill('1 1/2');
    await page.locator('#calc').click();
    await expect(page.locator('#r-mixed')).toHaveText('1 1/2');
    await expect(page.locator('#r-decimal')).toHaveText('1,5');
    await page.locator('#a').fill('7/8');
    await page.locator('#calc').click();
    await expect(page.locator('#r-decimal')).toHaveText('0,875');
  });

  test('sadeleştirme EBOB ve Öklid adımlarını gösterir', async ({ page }) => {
    await open(page);
    await page.locator('#m-sade').check();
    await page.locator('#a').fill('8/12');
    await page.locator('#calc').click();
    await expect(page.locator('#r-fraction')).toHaveText('2/3');
    await expect(page.locator('#r-gcd')).toHaveText('4');
    await expect(page.locator('#r-steps')).toContainText('12 = 1 × 8 + 4');
    await expect(page.locator('#r-steps')).toContainText('EBOB(8, 12) = 4');
    await page.locator('#a').fill('7/9');
    await page.locator('#calc').click();
    await expect(page.locator('#r-fraction')).toHaveText('7/9');
    await expect(page.locator('#r-steps')).toContainText('en sade biçimindedir');
  });

  test('karşılaştırma ve sıralama; eşit değerler', async ({ page }) => {
    await open(page);
    await page.locator('#m-karsilastir').check();
    await expect(page.locator('#wrap-list')).toBeVisible();
    await expect(page.locator('#wrap-a')).toBeHidden();
    await page.locator('#list').fill('3/4; 2/3\n5/8; 0,7');
    await page.locator('#calc').click();
    await expect(page.locator('#r-order')).toHaveText('5/8 < 2/3 < 0,7 < 3/4');
    await expect(page.locator('#r-desc')).toHaveText('3/4 > 0,7 > 2/3 > 5/8');
    await expect(page.locator('#r-max')).toHaveText('3/4');
    await expect(page.locator('#r-min')).toHaveText('5/8');
    await expect(page.locator('#r-steps')).toContainText('EKOK(4, 3, 8, 10) = 120');
    await page.locator('#list').fill('1/2; 0,5; 2/4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-order')).toHaveText('1/2 = 0,5 = 2/4');
    await expect(page.locator('#r-max')).toHaveText('Hepsi eşit');
  });

  test('payda eşitleme EBOB/EKOK verir', async ({ page }) => {
    await open(page);
    await page.locator('#m-payda').check();
    await page.locator('#list').fill('1/2; 1/3; 3/4');
    await page.locator('#calc').click();
    await expect(page.locator('#r-lcm')).toHaveText('12');
    await expect(page.locator('#r-gcd')).toHaveText('1');
    await expect(page.locator('#r-eq-0')).toHaveText('6/12');
    await expect(page.locator('#r-eq-1')).toHaveText('4/12');
    await expect(page.locator('#r-eq-2')).toHaveText('9/12');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    // Boş giriş
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Birinci kesir boş');
    await expect(page.locator('#result')).toBeHidden();
    // Okunamayan metin
    await operate(page, 'abc', 'add', '1/2');
    await expect(page.locator('#error')).toContainText('Birinci kesir okunamadı');
    await expect(page.locator('#error')).toContainText('3/4');
    // Sıfır payda
    await operate(page, '3/0', 'add', '1/2');
    await expect(page.locator('#error')).toContainText('payda sıfır olamaz');
    // Sıfıra bölme
    await operate(page, '1/2', 'div', '0');
    await expect(page.locator('#error')).toContainText('Sıfıra bölme yapılamaz');
    await operate(page, '1/2', 'div', '0/5');
    await expect(page.locator('#error')).toContainText('Sıfıra bölme yapılamaz');
    // İkinci kesir hatalı
    await operate(page, '1/2', 'mul', '1/2/3');
    await expect(page.locator('#error')).toContainText('İkinci kesir okunamadı');
    // Çok uzun sayı
    await operate(page, '1/2', 'add', '123456789012345678901234567890');
    await expect(page.locator('#error')).toContainText('çok uzun');
    // Liste: tek kesir ve virgülle ayrılmış liste
    await page.locator('#m-karsilastir').check();
    await page.locator('#list').fill('1/2');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('En az iki kesir');
    await page.locator('#list').fill('1/2, 3/4');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('noktalı virgül');
    await expect(page.locator('#result')).toBeHidden();
    // Düzeltince hata kalkar
    await page.locator('#list').fill('1/2; 3/4');
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#r-order')).toHaveText('1/2 < 3/4');
  });

  test('sonucu kopyala ve temizle', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await operate(page, '3/4', 'div', '1/2');
    await page.getByRole('button', { name: 'Sonucu kopyala' }).click();
    await expect(page.locator('#copy-status')).toContainText('panoya kopyalandı');
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain('3/4 ÷ 1/2 = 3/2 = 1 1/2');
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#a')).toHaveValue('');
  });

  test('içerik: en az 900 kelime, 7+ SSS, 3 reklam alanı', async ({ page }) => {
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="kesir-hesapla-${s}"]`)).toHaveCount(1);
  });
});
