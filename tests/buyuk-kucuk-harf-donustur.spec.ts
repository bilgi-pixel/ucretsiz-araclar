import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

test.describe('Büyük Küçük Harf Dönüştür', () => {
  test('BÜYÜK HARF: Türkçe i→İ, ı→I doğru çalışır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/buyuk-kucuk-harf-donustur/');
    await page.locator('#input').fill('ılık ıhlamur içtim, istanbul’da ışıklar yandı');
    await page.locator('#op-upper').click();
    await expect(page.locator('#output')).toHaveValue('ILIK IHLAMUR İÇTİM, İSTANBUL’DA IŞIKLAR YANDI');
    await expect(page.locator('#status')).toContainText('BÜYÜK HARF');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('küçük harf: İ→i, I→ı; Türkçe kutusu kapalıyken İngilizce kuralı', async ({ page }) => {
    await page.goto('/buyuk-kucuk-harf-donustur/');
    await page.locator('#input').fill('IŞIK İLE İNCİ');
    await page.locator('#op-lower').click();
    await expect(page.locator('#output')).toHaveValue('ışık ile inci');
    await page.locator('#opt-tr').uncheck();
    await page.locator('#input').fill('title');
    await page.locator('#op-upper').click();
    await expect(page.locator('#output')).toHaveValue('TITLE');
  });

  test('Başlık Düzeni ve Cümle düzeni', async ({ page }) => {
    await page.goto('/buyuk-kucuk-harf-donustur/');
    await page.locator('#input').fill('ankara’nın İLK günü ve ışık');
    await page.locator('#op-title').click();
    await expect(page.locator('#output')).toHaveValue('Ankara’nın İlk Günü Ve Işık');
    await page.locator('#input').fill('MERHABA DÜNYA. nasılsın? iyiyim!\nikinci satır');
    await page.locator('#op-sentence').click();
    await expect(page.locator('#output')).toHaveValue('Merhaba dünya. Nasılsın? İyiyim!\nİkinci satır');
  });

  test('boş metin Türkçe, çözüm öneren hata verir; Sonucu girişe al ve Temizle çalışır', async ({ page }) => {
    await page.goto('/buyuk-kucuk-harf-donustur/');
    await page.locator('#op-upper').click();
    await expect(page.locator('#error')).toContainText('metni üstteki kutuya yazın');
    await page.locator('#copy').click();
    await expect(page.locator('#error')).toContainText('Önce bir dönüştürme düğmesine basın');
    await page.locator('#input').fill('abc ı');
    await page.locator('#op-upper').click();
    await expect(page.locator('#error')).toBeHidden();
    await page.locator('#use').click();
    await expect(page.locator('#input')).toHaveValue('ABC I');
    await page.locator('#clear').click();
    await expect(page.locator('#input')).toHaveValue('');
    await expect(page.locator('#output')).toHaveValue('');
  });

  test('kopyala panoya yazar, .txt indirilir (UTF-8, Türkçe karakter korunur)', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/buyuk-kucuk-harf-donustur/');
    await page.locator('#input').fill('şeker ığdır');
    await page.locator('#op-upper').click();
    await page.locator('#copy').click();
    await expect(page.locator('#status')).toContainText('kopyalandı');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('ŞEKER IĞDIR');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('donusturulmus-metin.txt');
    expect(readFileSync((await dl.path())!, 'utf8').replace(/^﻿/, '')).toBe('ŞEKER IĞDIR');
  });

  test('içerik: ≥900 kelime, ≥7 SSS, 3 reklam, JSON-LD, klavye ve 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/buyuk-kucuk-harf-donustur/');
    const words = await page.locator('.ba-content').textContent().then((t) => t!.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="buyuk-kucuk-harf-donustur-${s}"]`)).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allInnerTexts()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    await page.locator('#input').focus();
    await page.keyboard.press('Tab'); // Türkçe kutusu
    await page.keyboard.press('Tab'); // BÜYÜK HARF düğmesi
    await expect(page.locator('#op-upper')).toBeFocused();
  });
});
