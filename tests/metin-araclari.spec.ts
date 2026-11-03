import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Metin Araçları', () => {
  test('Türkçe büyük harf, slug, kelime sayacı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/metin-araclari/');
    const input = page.locator('#input');

    await input.fill('istanbul ığdır');
    await expect(page.locator('#stat-words')).toHaveText('2');
    await expect(page.locator('#stat-chars')).toHaveText('14');
    await expect(page.locator('#stat-chars-ns')).toHaveText('13');
    await expect(page.locator('#stat-sentences')).toHaveText('1');
    await expect(page.locator('#stat-paragraphs')).toHaveText('1');

    await page.locator('#op-upper').click();
    await expect(input).toHaveValue('İSTANBUL IĞDIR');

    await page.locator('#op-lower').click();
    await expect(input).toHaveValue('istanbul ığdır');

    await page.locator('#op-title').click();
    await expect(input).toHaveValue('İstanbul Iğdır');

    await input.fill('istanbul ığdır');
    await page.locator('#op-slug').click();
    await expect(input).toHaveValue('istanbul-igdir');

    // Geri al: slug öncesine döner
    await page.locator('#undo').click();
    await expect(input).toHaveValue('istanbul ığdır');

    expect(external).toEqual([]);
    noErrors();
  });

  test('Türkçe karakter temizleme, cümle durumu ve sayaç', async ({ page }) => {
    await page.goto('/metin-araclari/');
    const input = page.locator('#input');
    await input.fill('ŞİŞLİ çağlayan ığdır. ikinci cümle!\n\nüçüncü paragraf? dördüncü.');
    await expect(page.locator('#stat-words')).toHaveText('8');
    await expect(page.locator('#stat-sentences')).toHaveText('4');
    await expect(page.locator('#stat-paragraphs')).toHaveText('2');

    await page.locator('#op-sentence').click();
    await expect(input).toHaveValue('Şişli çağlayan ığdır. İkinci cümle!\n\nÜçüncü paragraf? Dördüncü.');

    await page.locator('#op-strip-tr').click();
    await expect(input).toHaveValue('Sisli caglayan igdir. Ikinci cumle!\n\nUcuncu paragraf? Dorduncu.');
  });

  test('satır işlemleri: sırala, tekrarları ve boş satırları sil, boşlukları sadeleştir', async ({ page }) => {
    await page.goto('/metin-araclari/');
    const input = page.locator('#input');
    await input.fill('şeker\n\nelma   \n  çilek\nelma\n');
    await page.locator('#op-remove-empty').click();
    await page.locator('#op-trim-spaces').click();
    await page.locator('#op-dedupe').click();
    await page.locator('#op-sort-az').click();
    // Türkçe sıralama: ç, s'den sonra; ş de s'den sonra → çilek, elma, şeker
    await expect(input).toHaveValue('çilek\nelma\nşeker');
    await page.locator('#op-sort-za').click();
    await expect(input).toHaveValue('şeker\nelma\nçilek');
  });

  test('Base64 ve URL kodlama UTF-8 güvenli, ters çevirme, bozuk Base64 hata verir', async ({ page }) => {
    await page.goto('/metin-araclari/');
    const input = page.locator('#input');
    await input.fill('Çağrı & ışık');
    await page.locator('#op-base64-encode').click();
    await expect(input).toHaveValue('w4dhxJ9yxLEgJiDEscWfxLFr');
    await page.locator('#op-base64-decode').click();
    await expect(input).toHaveValue('Çağrı & ışık');

    await page.locator('#op-url-encode').click();
    await expect(input).toHaveValue('%C3%87a%C4%9Fr%C4%B1%20%26%20%C4%B1%C5%9F%C4%B1k');
    await page.locator('#op-url-decode').click();
    await expect(input).toHaveValue('Çağrı & ışık');

    await page.locator('#op-reverse').click();
    await expect(input).toHaveValue('kışı & ırğaÇ');

    await input.fill('bu base64 değil!!');
    await page.locator('#op-base64-decode').click();
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText(/Base64/);
    await expect(input).toHaveValue('bu base64 değil!!');
  });

  test('.txt indirme Türkçe karakterleri korur', async ({ page }) => {
    await page.goto('/metin-araclari/');
    await page.locator('#input').fill('Merhaba dünya, şöyle böyle.');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('metin.txt');
    const { readFileSync } = await import('node:fs');
    expect(readFileSync((await dl.path())!, 'utf8')).toBe('Merhaba dünya, şöyle böyle.');
  });

  test('sayfa yapısı: rozet, reklam yerleşimi, SSS ve 800+ kelime', async ({ page }) => {
    await page.goto('/metin-araclari/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-faq details')).toHaveCount(8);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    const text = await page.locator('.ba-content').innerText();
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(800);
  });
});
