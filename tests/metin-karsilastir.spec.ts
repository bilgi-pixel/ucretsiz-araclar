import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Metin Karşılaştırma', () => {
  test('satır farkı: eklenen ve silinen sayıları doğru; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/metin-karsilastir/');
    await page.locator('#text-a').fill('elma\narmut\nkiraz\nüzüm');
    await page.locator('#text-b').fill('elma\nkiraz\nüzüm\nçilek\nmuz');
    await page.locator('#compare').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#stat-add')).toHaveText('2');
    await expect(page.locator('#stat-del')).toHaveText('1');
    await expect(page.locator('#stat-same')).toHaveText('3');
    await expect(page.locator('#output .md-add')).toHaveCount(2);
    await expect(page.locator('#output .md-del')).toHaveCount(1);
    // birleşik görünüm aynı sayıları verir
    await page.getByLabel('Birleşik').check();
    await expect(page.locator('#output.is-uni')).toBeVisible();
    await expect(page.locator('#output .md-add')).toHaveCount(2);
    expect(external).toEqual([]);
    noErrors();
  });

  test('aynı metin: fark yok; büyük/küçük harf yok sayma', async ({ page }) => {
    await page.goto('/metin-karsilastir/');
    await page.locator('#text-a').fill('Merhaba Dünya\nİstanbul');
    await page.locator('#text-b').fill('merhaba dünya\nistanbul');
    await page.locator('#compare').click();
    await expect(page.locator('#stat-add')).toHaveText('2');
    await page.locator('#opt-case').check();
    await expect(page.locator('#stat-add')).toHaveText('0');
    await expect(page.locator('#summary-text')).toContainText('hiç fark bulunamadı');
  });

  test('kelime düzeyi ve farkları kopyala', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/metin-karsilastir/');
    await page.locator('#text-a').fill('Bugün hava çok güzel');
    await page.locator('#text-b').fill('Bugün hava biraz güzel');
    await page.locator('#opt-level').selectOption('word');
    await page.locator('#compare').click();
    await expect(page.locator('#stat-add')).toHaveText('1');
    await expect(page.locator('#stat-del')).toHaveText('1');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).toContainText('kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('- çok');
    expect(clip).toContain('+ biraz');
  });

  test('boşluk yok sayma ve 10.000 satırda takılmadan sonuç', async ({ page }) => {
    await page.goto('/metin-karsilastir/');
    const lines = Array.from({ length: 10000 }, (_, i) => `satır ${i}`);
    const changed = lines.slice();
    changed[5000] = 'DEĞİŞTİ';
    changed.splice(9000, 0, 'yeni satır');
    await page.evaluate(([a, b]) => {
      (document.getElementById('text-a') as HTMLTextAreaElement).value = a;
      (document.getElementById('text-b') as HTMLTextAreaElement).value = b;
    }, [lines.join('\n'), changed.join('\n')]);
    await page.locator('#compare').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 15000 });
    await expect(page.locator('#stat-add')).toHaveText('2');
    await expect(page.locator('#stat-del')).toHaveText('1');
    await expect(page.locator('.md-gap').first()).toBeVisible(); // aynı satırlar katlandı
  });

  test('boş kutular ve ikili dosya için Türkçe hata', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/metin-karsilastir/');
    await page.locator('#compare').click();
    await expect(page.locator('#error')).toContainText('boş');
    await page.locator('#drop-a input[type=file]').setInputFiles({ name: 'resim.png', mimeType: 'image/png', buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0x00, 0x00, 0x0d]) });
    await expect(page.locator('#error')).toContainText('metin dosyası gibi görünmüyor');
    await page.locator('#drop-b input[type=file]').setInputFiles({ name: 'a.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba\ndünya', 'utf8') });
    await expect(page.locator('#text-b')).toHaveValue('merhaba\ndünya');
    await expect(page.locator('#name-b')).toContainText('a.txt');
    noErrors();
  });
});
