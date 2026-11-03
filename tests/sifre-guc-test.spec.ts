import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Şifre Güvenlik Testi', () => {
  test('"123456" çok zayıf çıkar', async ({ page }) => {
    await page.goto('/sifre-guc-test/');
    await page.locator('#pw').fill('123456');
    await expect(page.locator('#label')).toHaveText('Çok zayıf');
    await expect(page.locator('#findings')).toContainText('en sık kullanılan');
    await expect(page.locator('#offline')).toContainText('saniyeden kısa');
    await expect(page.locator('#suggestions')).toContainText('En az 12');
  });

  test('20 karakterlik karışık şifre güçlü çıkar', async ({ page }) => {
    await page.goto('/sifre-guc-test/');
    await page.locator('#pw').fill('Xk9#mQ2$vL7!pR4&zT8w');
    await expect(page.locator('#label')).toHaveText(/Güçlü|Çok güçlü/);
    await expect(page.locator('#findings')).toContainText('bulunmadı');
    await expect(page.locator('#offline')).toContainText(/yıl/);
  });

  test('"galatasaray1905" kalıp uyarısı verir', async ({ page }) => {
    await page.goto('/sifre-guc-test/');
    await page.locator('#pw').fill('galatasaray1905');
    await expect(page.locator('#findings')).toContainText('Yaygın bir kelime');
    await expect(page.locator('#findings')).toContainText('Yıl');
    await expect(page.locator('#label')).toHaveText(/Çok zayıf|Zayıf/);
    await expect(page.locator('#suggestions a, .sg-report a[href="../sifre-uret/"]').first()).toBeVisible();
  });

  test('klavye dizisi, tekrar ve göster/gizle çalışır', async ({ page }) => {
    await page.goto('/sifre-guc-test/');
    await page.locator('#pw').fill('mnbvcaaaa');
    await expect(page.locator('#findings')).toContainText('Klavye dizisi');
    await expect(page.locator('#findings')).toContainText('Tekrar');
    await expect(page.locator('#pw')).toHaveAttribute('type', 'password');
    await page.locator('#toggle').click();
    await expect(page.locator('#pw')).toHaveAttribute('type', 'text');
    await page.locator('#toggle').click();
    await expect(page.locator('#pw')).toHaveAttribute('type', 'password');
  });

  test('şifre ağa gitmez, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/sifre-guc-test/');
    await page.waitForLoadState('networkidle');
    const secret = 'Gizli-Parola-Deneme-77!';
    const urls: string[] = [];
    const bodies: string[] = [];
    page.on('request', (r) => { urls.push(r.url()); bodies.push(r.postData() || ''); });
    await page.locator('#pw').fill(secret);
    await page.waitForTimeout(500);
    expect(urls.length).toBe(0); // şifre yazarken hiçbir istek oluşmaz
    expect(urls.join(' ') + bodies.join(' ')).not.toContain('Gizli');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
});
