import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/dpi-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden etkileşim olmasın
}

test.describe('DPI Hesaplama', () => {
  test('3000 piksel 300 DPI\'da 25,4 cm; kopyala çalışır; dış istek ve sayfa hatası yok', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#a-w').fill('3000');
    await page.locator('#a-h').fill('2000');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('25,4 cm');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('10 inç');
    await expect(page.locator('#r-rows .dpi-row').nth(1)).toContainText('16,93 cm');
    await expect(page.locator('#r-line')).toContainText('3000 × 2000 px, 300 DPI\'da 25,4 × 16,93 cm');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toHaveText('Sonuç kopyalandı.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('25,4 × 16,93 cm');
    expect(external).toEqual([]);
    noErrors();
  });

  test('hızlı DPI düğmeleri: 150 DPI seçilince aynı fotoğraf iki kat büyük basılır', async ({ page }) => {
    await open(page);
    await page.locator('#a-w').fill('3000');
    await page.getByRole('button', { name: '150 DPI' }).first().click();
    await expect(page.locator('#a-dpi')).toHaveValue('150');
    await expect(page.getByRole('button', { name: '150 DPI' }).first()).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('50,8 cm');
    await page.getByRole('button', { name: '72 DPI' }).first().click();
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('105,83 cm');
  });

  test('cm → piksel: 21 cm @300 DPI = 2480 px; A4 yüksekliği 3508 px; virgüllü ondalık ve mm/inç birimi', async ({ page }) => {
    await open(page);
    await page.locator('#m-b').check();
    await expect(page.locator('#panel-b')).toBeVisible();
    await expect(page.locator('#panel-a')).toBeHidden();
    await page.locator('#b-w').fill('21');
    await page.locator('#b-h').fill('29,7');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('2480 piksel');
    await expect(page.locator('#r-rows .dpi-row').nth(1)).toContainText('3508 piksel');
    // virgüllü giriş: 25,4 cm @300 DPI = 3000 px
    await page.locator('#b-w').fill('25,4');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('3000 piksel');
    // mm ve inç
    await page.locator('#b-w').fill('210');
    await page.locator('#b-unit').selectOption('mm');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('2480 piksel');
    await page.locator('#b-w').fill('10');
    await page.locator('#b-unit').selectOption('in');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('3000 piksel');
  });

  test('ekran PPI: 1920×1080 27 inç = 81,59 PPI; örnek ekran tablosundan uygula', async ({ page }) => {
    await open(page);
    await expect(page.locator('#devices-wrap')).toBeHidden();
    await page.locator('#m-c').check();
    await expect(page.locator('#devices-wrap')).toBeVisible();
    await page.locator('#c-w').fill('1920');
    await page.locator('#c-h').fill('1080');
    await page.locator('#c-d').fill('27');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('81,59 PPI');
    await expect(page.locator('#r-rows')).toContainText('0,3113 mm');
    await expect(page.locator('#r-rows')).toContainText('16:9');
    // tablodan 27″ 4K uygula → 163,18 PPI
    await page.getByRole('button', { name: /Monitör 27″ 4K değerlerini forma uygula/ }).click();
    await expect(page.locator('#c-w')).toHaveValue('3840');
    await expect(page.locator('#r-rows .dpi-row').first()).toContainText('163,18 PPI');
    expect(await page.locator('#devices tr').count()).toBeGreaterThanOrEqual(10);
  });

  test('hızlı cevap: 3000×2000 piksel kaç cm basılır, standart ebatlarda etkin DPI', async ({ page }) => {
    await open(page);
    await page.locator('#q-w').fill('3000');
    await page.locator('#q-h').fill('2000');
    await expect(page.locator('#q-rows')).toContainText('25,4 × 16,93 cm');
    await expect(page.locator('#q-rows')).toContainText('50,8 × 33,87 cm');
    // A4'ü kırparak doldurmak için etkin DPI: min(2000 / 8,268; 3000 / 11,69) = 241
    await expect(page.locator('#q-papers .dpi-row', { hasText: 'A4' })).toContainText('241 DPI');
    await expect(page.locator('#q-papers .dpi-row', { hasText: 'A3' })).toContainText('171 DPI');
    // küçük fotoğraf: düşük kalite uyarısı
    await page.locator('#q-w').fill('800');
    await page.locator('#q-h').fill('600');
    await expect(page.locator('#q-papers .dpi-row', { hasText: 'A4' })).toContainText('düşük');
    // yükseklik boşsa yalnızca genişlik ve ebat listesi gizli
    await page.locator('#q-h').fill('');
    await expect(page.locator('#q-rows')).toContainText('6,77 cm');
    await expect(page.locator('#q-papers')).toBeHidden();
  });

  test('baskı tablosu, formülle birebir uyuşur (150 ve 300 DPI)', async ({ page }) => {
    await open(page);
    const rows = page.locator('section.ba-tool table').last().locator('tbody tr');
    const n = await rows.count();
    expect(n).toBeGreaterThanOrEqual(7);
    for (let i = 0; i < n; i++) {
      const head = (await rows.nth(i).locator('th').innerText()).replace(/\s+/g, ' ');
      const m = head.match(/([\d,]+) × ([\d,]+) cm/);
      expect(m, head).not.toBeNull();
      const [a, b] = [m![1], m![2]].map((s) => Number(s.replace(',', '.')));
      const [s, l] = a <= b ? [a, b] : [b, a];
      const expected = (dpi: number) => `${Math.round((s / 2.54) * dpi)} × ${Math.round((l / 2.54) * dpi)}`;
      const cells = await rows.nth(i).locator('td').allInnerTexts();
      expect(cells[0].trim(), `${head} 150 DPI`).toBe(expected(150));
      expect(cells[1].trim(), `${head} 300 DPI`).toBe(expected(300));
    }
    await expect(page.locator('section.ba-tool')).toContainText('2480 × 3508');
  });

  test('hatalı giriş: harf, sıfır, negatif ve aşırı büyük değer için Türkçe, çözüm öneren hata', async ({ page }) => {
    await open(page);
    await page.locator('#a-w').fill('abc');
    await expect(page.locator('#error')).toContainText(/yalnızca rakam/i);
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#a-w').fill('0');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#a-w').fill('-5');
    await expect(page.locator('#error')).toContainText('sıfırdan büyük');
    await page.locator('#a-w').fill('99999999');
    await expect(page.locator('#error')).toContainText('çok büyük');
    // geçerli değer hatayı temizler
    await page.locator('#a-w').fill('3000');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#a-dpi').fill('0');
    await expect(page.locator('#error')).toContainText('DPI sıfırdan büyük');
    // boş alan sessizce sonucu gizler (hata değil)
    await page.locator('#a-dpi').fill('');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
    // hızlı cevap kutusu ve PPI modu da hata verir
    await page.locator('#q-w').fill('x1');
    await expect(page.locator('#q-error')).toContainText(/yalnızca rakam/i);
    await page.locator('#m-c').check();
    await page.locator('#c-d').fill('0');
    await expect(page.locator('#error')).toContainText('Köşegen (inç) sıfırdan büyük');
  });

  test('klavye: radyo düğmesinde ok tuşu modu değiştirir', async ({ page }) => {
    await open(page);
    await page.locator('#m-a').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#m-b')).toBeChecked();
    await expect(page.locator('#panel-b')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#m-c')).toBeChecked();
    await expect(page.locator('#panel-c')).toBeVisible();
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı (araç kutusunun dışında), SSS ≥7, JSON-LD', async ({ page }) => {
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="dpi-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    // A reklamı araç kutusundan sonra gelir
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="dpi-hesapla-a"]')!;
      return tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING;
    });
    expect(order).toBeTruthy();
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    const types = ld.map((x) => x['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('FAQPage');
    expect(ld.find((x) => x['@type'] === 'FAQPage').mainEntity).toHaveLength(faqCount);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
  });

  test('360px genişlikte yatay taşma yok (tüm modlarda)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#m-b').check();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#m-c').check();
    await expect(page.locator('#devices-wrap')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
    const box = await page.locator('#c-d').boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
  });
});
