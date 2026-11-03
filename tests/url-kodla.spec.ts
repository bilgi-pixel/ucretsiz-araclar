import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('URL Kodla / Çöz ve Metin Kodlama', () => {
  test('"çay & şeker" kodlanır ve geri çözülür', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/url-kodla/');
    await page.locator('#u-in').fill('çay & şeker');
    await page.locator('#u-enc').click();
    await expect(page.locator('#u-out')).toHaveValue('%C3%A7ay%20%26%20%C5%9Feker');
    await page.locator('#u-encuri').click();
    await expect(page.locator('#u-out')).toHaveValue('%C3%A7ay%20&%20%C5%9Feker');
    await page.locator('#u-in').fill('%C3%A7ay%20%26%20%C5%9Feker');
    await page.locator('#u-dec').click();
    await expect(page.locator('#u-out')).toHaveValue('çay & şeker');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geçersiz % dizisi Türkçe hata verir', async ({ page }) => {
    await page.goto('/url-kodla/');
    await page.locator('#u-in').fill('%E0%A4%A');
    await page.locator('#u-dec').click();
    await expect(page.locator('#error')).toContainText('geçersiz bir % dizisi');
    await expect(page.locator('#error')).toContainText('%25');
  });

  test('HTML entity ve Unicode kaçış gidiş dönüş', async ({ page }) => {
    await page.goto('/url-kodla/');
    await page.locator('#tab-html').click();
    await page.locator('#h-in').fill('<b>Çay & Şeker</b>');
    await page.locator('#h-all').check();
    await page.locator('#h-enc').click();
    await expect(page.locator('#h-out')).toHaveValue('&lt;b&gt;&#199;ay &amp; &#350;eker&lt;/b&gt;');
    await page.locator('#h-in').fill('&ccedil;ay &#351;eker &lt;');
    await page.locator('#h-dec').click();
    await expect(page.locator('#h-out')).toHaveValue('çay şeker <');

    await page.locator('#tab-uni').click();
    await page.locator('#x-in').fill('çay şeker');
    await page.locator('#x-enc').click();
    await expect(page.locator('#x-out')).toHaveValue('\\u00e7ay \\u015feker');
    await page.locator('#x-in').fill('\\u00e7ay \\u015feker \\u{1F600}');
    await page.locator('#x-dec').click();
    await expect(page.locator('#x-out')).toHaveValue('çay şeker 😀');
  });

  test('URL ayrıştırma parametre tablosu ve düzenlenmiş yeni adres', async ({ page }) => {
    await page.goto('/url-kodla/');
    await page.locator('#tab-parse').click();
    await page.locator('#p-in').fill('https://ornek.com/ara?q=%C3%A7ay&sayfa=2#sonuc');
    await expect(page.locator('#p-parts')).toContainText('ornek.com');
    await expect(page.locator('#p-parts')).toContainText('/ara');
    await expect(page.locator('#p-rows .uk-row')).toHaveCount(2);
    await expect(page.locator('#p-rows .p-k').first()).toHaveValue('q');
    await expect(page.locator('#p-rows .p-v').first()).toHaveValue('çay');
    await page.locator('#p-rows .p-v').nth(1).fill('3');
    await page.locator('#p-add').click();
    await page.locator('#p-rows .p-k').nth(2).fill('ad');
    await page.locator('#p-rows .p-v').nth(2).fill('şeker & süt');
    await expect(page.locator('#p-new')).toHaveValue('https://ornek.com/ara?q=%C3%A7ay&sayfa=3&ad=%C5%9Feker%20%26%20s%C3%BCt#sonuc');
    // protokolsüz adres: Türkçe hata
    await page.locator('#p-in').fill('ornek.com/yol');
    await expect(page.locator('#error')).toContainText('protokolle başlamalı');
  });

  test('UTM adresi üretilir; eksik alan uyarısı verir', async ({ page }) => {
    await page.goto('/url-kodla/');
    await page.locator('#tab-utm').click();
    await page.locator('#m-url').fill('https://ornek.com/kampanya');
    await page.locator('#m-source').fill('Google');
    await expect(page.locator('#error')).toContainText('utm_medium');
    await page.locator('#m-medium').fill('cpc');
    await page.locator('#m-campaign').fill('Yaz İndirimi');
    await expect(page.locator('#m-out')).toHaveValue('https://ornek.com/kampanya?utm_source=google&utm_medium=cpc&utm_campaign=yaz-indirimi');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('slug Türkçe karakterleri ASCII yapar', async ({ page }) => {
    await page.goto('/url-kodla/');
    await page.locator('#tab-slug').click();
    await page.locator('#s-in').fill('Çocuklar İçin Şeker & Çay: Ğ Ö Ü ı!');
    await expect(page.locator('#s-out')).toHaveValue('cocuklar-icin-seker-ve-cay-g-o-u-i');
    await page.locator('#s-sep').selectOption('_');
    await expect(page.locator('#s-out')).toHaveValue('cocuklar_icin_seker_ve_cay_g_o_u_i');
    await page.locator('#s-max').fill('12');
    await expect(page.locator('#s-out')).toHaveValue('cocuklar_ici');
  });
});
