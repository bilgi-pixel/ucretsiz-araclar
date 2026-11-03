import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

test.describe('Meta Etiket Oluşturucu', () => {
  test('başlık ve açıklamadan og:title ve twitter:card üretir', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/meta-etiket-olustur/');
    await page.locator('#m-title').fill('Ücretsiz PDF Birleştir – Bilişim Ajans');
    await page.locator('#m-desc').fill('PDF dosyalarını tarayıcıda birleştirin.');
    await page.locator('#m-canon').fill('https://ornek.com/pdf/');
    await page.locator('#m-ogimage').fill('https://ornek.com/resim.jpg');
    const out = page.locator('#m-out');
    await expect(out).toHaveValue(/<meta property="og:title" content="Ücretsiz PDF Birleştir – Bilişim Ajans">/);
    await expect(out).toHaveValue(/<meta name="twitter:card" content="summary_large_image">/);
    await expect(out).toHaveValue(/og:locale" content="tr_TR"/);
    await expect(out).toHaveValue(/<link rel="canonical" href="https:\/\/ornek.com\/pdf\/">/);
    await expect(page.locator('#sc-card .img')).toContainText('gizlilik için gösterilmez');
    await expect(page.locator('#sc-card img')).toHaveCount(0);
    await page.locator('#m-schema').selectOption('Organization');
    await expect(out).toHaveValue(/application\/ld\+json/);
    // İndirme
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('[data-download="m-out"]').click()]);
    expect(dl.suggestedFilename()).toBe('meta-etiketler.html');
    expect(readFileSync(await dl.path()!, 'utf8')).toContain('og:title');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('70 karakterlik başlıkta uyarı çıkar', async ({ page }) => {
    await page.goto('/meta-etiket-olustur/');
    await page.locator('#m-title').fill('a'.repeat(70));
    await expect(page.locator('#c-title')).toHaveText('70 / 60');
    await expect(page.locator('#w-title')).toContainText('60 karakteri aşıyor');
    await page.locator('#m-title').fill('Kısa başlık');
    await expect(page.locator('#w-title')).toHaveText('');
  });

  test('3 adresten sitemap üretir, geçersiz adreste hata verir', async ({ page }) => {
    await page.goto('/meta-etiket-olustur/');
    await page.locator('#tab-sitemap').click();
    await page.locator('#s-urls').fill('https://ornek.com/\nhttps://ornek.com/a/\nhttps://ornek.com/b/');
    const out = page.locator('#s-out');
    await expect(out).toHaveValue(/<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
    expect(((await out.inputValue()).match(/<url>/g) || []).length).toBe(3);
    await page.locator('#s-urls').fill('https://ornek.com/\nornek yok');
    await expect(page.locator('#error')).toContainText('Geçersiz adres');
    await expect(page.locator('#error')).toContainText('https://');
    await page.locator('#tab-robots').click();
    await page.locator('#r-dis').fill('/admin/');
    await page.locator('#r-sitemap').fill('https://ornek.com/sitemap.xml');
    await expect(page.locator('#r-out')).toHaveValue('User-agent: *\nDisallow: /admin/\n\nSitemap: https://ornek.com/sitemap.xml');
  });
});
