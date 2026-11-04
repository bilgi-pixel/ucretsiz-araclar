import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

async function open(page) {
  await page.goto('/en-boy-orani-hesapla/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden etkileşim olmasın
}

const chip = (page, name: string) => page.getByRole('button', { name, exact: true });

test.describe('En Boy Oranı Hesaplama', () => {
  test('1920×1080 → 16:9 ve 1,78; kopyala çalışır; dış istek ve sayfa hatası yok', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#r-w').fill('1920');
    await page.locator('#r-h').fill('1080');
    await expect(page.locator('#r-big')).toHaveText('16:9');
    await expect(page.locator('#r-rows')).toContainText('1,78');
    await expect(page.locator('#r-rows')).toContainText('Yatay');
    await expect(page.locator('#r-rows')).toContainText('Full HD');
    await expect(page.locator('#r-line')).toHaveText('1920 × 1080 → 16:9 (1,78)');
    await page.locator('#r-copy').click();
    await expect(page.locator('#r-copy-status')).toHaveText('Sonuç kopyalandı.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('1920 × 1080 → 16:9 (1,78)');
    expect(external).toEqual([]);
    noErrors();
  });

  test('virgüllü ondalık: 21 × 29,7 → 70:99, dikey; 1366×768 yaklaşık 16:9 sayılır', async ({ page }) => {
    await open(page);
    await page.locator('#r-w').fill('21');
    await page.locator('#r-h').fill('29,7');
    await expect(page.locator('#r-big')).toHaveText('70:99');
    await expect(page.locator('#r-rows')).toContainText('0,71');
    await expect(page.locator('#r-rows')).toContainText('1,41');
    await expect(page.locator('#r-rows')).toContainText('Dikey');
    await expect(page.locator('#r-rows')).not.toContainText('Bilinen oran');
    await page.locator('#r-w').fill('1366');
    await page.locator('#r-h').fill('768');
    await expect(page.locator('#r-big')).toHaveText('683:384');
    await expect(page.locator('#r-rows')).toContainText('Yaklaşık 16:9');
    await expect(page.locator('#r-rows')).toContainText('%0,05');
    await page.locator('#r-w').fill('1000');
    await page.locator('#r-h').fill('1000');
    await expect(page.locator('#r-big')).toHaveText('1:1');
    await expect(page.locator('#r-rows')).toContainText('Kare');
  });

  test('oran koruyarak yeni boyut: 16:9\'da genişlik 1280 → 720 ve tersi; yuvarlama; sık boyutlar', async ({ page }) => {
    await open(page);
    // hazır oran seçilmediyse yukarıdaki oran kullanılır
    await expect(page.locator('#active-label')).toContainText('yukarıda yazdığınız boyutlardan');
    await chip(page, '16:9').click();
    await expect(chip(page, '16:9')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#active-label')).toContainText('16:9 (hazır oran)');
    await page.locator('#n-w').fill('1280');
    await expect(page.locator('#n-h')).toHaveValue('720');
    await page.locator('#n-h').fill('1080');
    await expect(page.locator('#n-w')).toHaveValue('1920');
    await page.locator('#n-w').fill('1000');
    await expect(page.locator('#n-h')).toHaveValue('562,5');
    await expect(page.locator('#n-line')).toContainText('yuvarlanmış: 1000 × 563');
    await expect(page.locator('#size-list')).toContainText('1920 × 1080');
    await expect(page.locator('#size-list')).toContainText('≈ 1080 × 608');
    // oran değişince son yazılan alan yeniden hesaplanır
    await chip(page, '9:16').click();
    await expect(chip(page, '16:9')).toHaveAttribute('aria-pressed', 'false');
    await page.locator('#n-w').fill('1080');
    await expect(page.locator('#n-h')).toHaveValue('1920');
    // üstteki alanları elle değiştirmek hazır oran seçimini kaldırır
    await page.locator('#r-w').fill('4');
    await page.locator('#r-h').fill('3');
    await expect(chip(page, '9:16')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#active-label')).toContainText('4:3');
    await expect(page.locator('#n-h')).toHaveValue('810');
  });

  test('önizleme dikdörtgeni oranı canlı çizer', async ({ page }) => {
    await open(page);
    const ratio = async () => {
      const box = await page.locator('#preview rect.eb-outer').boundingBox();
      return box!.width / box!.height;
    };
    expect(await ratio()).toBeCloseTo(16 / 9, 1);
    await chip(page, '9:16').click();
    expect(await ratio()).toBeCloseTo(9 / 16, 1);
    await chip(page, '1:1').click();
    expect(await ratio()).toBeCloseTo(1, 1);
    await expect(page.locator('#preview-cap')).toContainText('1:1');
    await chip(page, '21:9').click();
    expect(await ratio()).toBeCloseTo(21 / 9, 1);
  });

  test('kırpma hesabı: 4000×3000 → 4:5 = 2400×3000; diğer oranlar, özel oran, aynı oran', async ({ page }) => {
    await open(page);
    await page.locator('#k-w').fill('4000');
    await page.locator('#k-h').fill('3000');
    await page.locator('#k-preset').selectOption('4:5');
    await expect(page.locator('#k-rows .eb-row').first()).toContainText('2400 × 3000 piksel');
    await expect(page.locator('#k-rows')).toContainText('1600 piksel (%40)');
    await expect(page.locator('#k-rows')).toContainText('her kenardan 800 piksel');
    await expect(page.locator('#k-rows')).toContainText('x = 800, y = 0');
    await expect(page.locator('#k-rows')).toContainText('4000 × 5000 piksellik tuval');
    await expect(page.locator('#crop-svg rect.eb-crop')).toHaveCount(1);
    await expect(page.locator('#k-line')).toHaveText('4000 × 3000 görsel 4:5 oranına kırpılınca 2400 × 3000 piksel kalır.');
    await page.locator('#k-preset').selectOption('1:1');
    await expect(page.locator('#k-rows .eb-row').first()).toContainText('3000 × 3000 piksel');
    await page.locator('#k-preset').selectOption('16:9');
    await expect(page.locator('#k-rows .eb-row').first()).toContainText('4000 × 2250 piksel');
    await expect(page.locator('#k-rows')).toContainText('x = 0, y = 375');
    await expect(page.locator('#k-rows')).toContainText('5334 × 3000 piksellik tuval');
    // özel oran: 3:2 → yükseklik 2666,67 aşağı yuvarlanır
    await page.locator('#k-preset').selectOption('ozel');
    await expect(page.locator('#k-custom')).toBeVisible();
    await page.locator('#k-ra').fill('3');
    await page.locator('#k-rb').fill('2');
    await expect(page.locator('#k-rows .eb-row').first()).toContainText('4000 × 2666 piksel');
    // virgüllü özel oran: 1,91:1
    await page.locator('#k-ra').fill('1,91');
    await page.locator('#k-rb').fill('1');
    await expect(page.locator('#k-rows .eb-row').first()).toContainText('4000 × 2094 piksel');
    // zaten aynı oranda
    await page.locator('#k-preset').selectOption('4:3');
    await expect(page.locator('#k-custom')).toBeHidden();
    await expect(page.locator('#k-rows')).toContainText('zaten 4:3 oranında');
    await expect(page.locator('#crop-svg rect.eb-crop')).toHaveCount(1);
  });

  test('hazır boyut tablosu: Hesapla düğmesi oran bulucuya aktarır; oranlar tutarlıdır', async ({ page }) => {
    await open(page);
    await page.getByRole('button', { name: 'Instagram Story ve Reels boyutunu oran hesaplayıcıya aktar' }).click();
    await expect(page.locator('#r-w')).toHaveValue('1080');
    await expect(page.locator('#r-h')).toHaveValue('1920');
    await expect(page.locator('#r-big')).toHaveText('9:16');
    const rows = page.locator('#sec-table tbody tr');
    const n = await rows.count();
    expect(n).toBeGreaterThanOrEqual(15);
    for (let i = 0; i < n; i++) {
      const row = rows.nth(i);
      const name = (await row.locator('th').innerText()).trim();
      const cells = await row.locator('td').allInnerTexts();
      const size = cells[0].match(/(\d+) × (\d+)/);
      const btn = row.locator('button');
      expect(size, name).not.toBeNull();
      // düğmenin veri öznitelikleri görünen boyutla aynı olmalı
      expect(await btn.getAttribute('data-w'), name).toBe(size![1]);
      expect(await btn.getAttribute('data-h'), name).toBe(size![2]);
      // yazılı oran gerçek orana uymalı (yaklaşık yazılanlar için %3 tolerans)
      const r = cells[1].match(/([\d,]+):(\d+)/);
      expect(r, name).not.toBeNull();
      const stated = Number(r![1].replace(',', '.')) / Number(r![2]);
      const actual = Number(size![1]) / Number(size![2]);
      const tol = /yaklaşık/.test(cells[1]) ? 0.03 : 1e-6;
      expect(Math.abs(stated - actual) / actual, `${name}: ${cells[1]}`).toBeLessThanOrEqual(tol);
    }
  });

  test('hatalı giriş: harf, sıfır, negatif, aşırı büyük ve geçersiz özel oran için Türkçe hata', async ({ page }) => {
    await open(page);
    await page.locator('#r-w').fill('abc');
    await expect(page.locator('#r-error')).toContainText(/yalnızca rakam/i);
    await expect(page.locator('#r-result')).toBeHidden();
    await page.locator('#r-w').fill('0');
    await expect(page.locator('#r-error')).toContainText('sıfırdan büyük');
    await page.locator('#r-w').fill('-3');
    await expect(page.locator('#r-error')).toContainText('sıfırdan büyük');
    await page.locator('#r-w').fill('99999999');
    await expect(page.locator('#r-error')).toContainText('çok büyük');
    // geçerli değer hatayı temizler
    await page.locator('#r-w').fill('1920');
    await expect(page.locator('#r-error')).toBeHidden();
    await expect(page.locator('#r-result')).toBeVisible();
    // boş alan sessizce sonucu gizler (hata değil)
    await page.locator('#r-h').fill('');
    await expect(page.locator('#r-error')).toBeHidden();
    await expect(page.locator('#r-result')).toBeHidden();
    await expect(page.locator('#active-label')).toContainText('Önce bir oran belirleyin');
    // yeni boyut bölümü
    await chip(page, '16:9').click();
    await page.locator('#n-w').fill('x');
    await expect(page.locator('#n-error')).toContainText(/yalnızca rakam/i);
    await expect(page.locator('#n-h')).toHaveValue('');
    // kırpma bölümü
    await page.locator('#k-w').fill('-4');
    await expect(page.locator('#k-error')).toContainText('sıfırdan büyük');
    await expect(page.locator('#k-result')).toBeHidden();
    await page.locator('#k-w').fill('4000');
    await page.locator('#k-preset').selectOption('ozel');
    await page.locator('#k-ra').fill('0');
    await expect(page.locator('#k-error')).toContainText('Hedef oranın genişliği sıfırdan büyük');
  });

  test('klavye: oran düğmesi Enter ile seçilir', async ({ page }) => {
    await open(page);
    await chip(page, '4:3').focus();
    await page.keyboard.press('Enter');
    await expect(chip(page, '4:3')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#active-label')).toContainText('4:3');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(chip(page, '1:1')).toHaveAttribute('aria-pressed', 'true');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı (araç kutusunun dışında), SSS ≥7, JSON-LD', async ({ page }) => {
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="en-boy-orani-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="en-boy-orani-hesapla-a"]')!;
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

  test('360px genişlikte yatay taşma yok; önizleme ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await chip(page, '21:9').click();
    await page.locator('#n-w').fill('3440');
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#k-preset').selectOption('ozel');
    await page.locator('#k-ra').fill('21');
    await page.locator('#k-rb').fill('9');
    expect(await overflow()).toBeLessThanOrEqual(0);
    for (const sel of ['#preview', '#crop-svg', '#k-ra', '#n-w']) {
      const box = await page.locator(sel).boundingBox();
      expect(box!.x + box!.width, sel).toBeLessThanOrEqual(360);
    }
  });
});
