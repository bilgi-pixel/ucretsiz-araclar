import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/emeklilik-yasi-hesapla/';

async function open(page: Page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

async function fillForm(page: Page, o: { status?: string; gender: string; birth: string; entry: string; prim?: string; ref?: string }) {
  await page.locator('#status').selectOption(o.status ?? 'a');
  await page.locator('#gender').selectOption(o.gender);
  await page.locator('#birth').fill(o.birth);
  await page.locator('#entry').fill(o.entry);
  await page.locator('#prim').fill(o.prim ?? '');
  await page.locator('#ref').fill(o.ref ?? '2026-11-04');
  await page.locator('#calc').click();
}

test.describe('Emeklilik Yaşı Hesaplama', () => {
  test('EYT: 1997 girişli kadın 4/a, yaş şartı yok, şartlar tamamlanmış; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await fillForm(page, { gender: 'kadin', birth: '1978-04-12', entry: '1997-03-01', prim: '5.200' });
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-head')).toContainText('tamamlamış');
    await expect(page.locator('#r-age')).toHaveText('Aranmaz');
    await expect(page.locator('#r-sig')).toContainText('20 yıl');
    await expect(page.locator('#r-remaining')).toHaveText('Şartlar doldu');
    await expect(page.locator('#r-notes')).toContainText('SGK hizmet dökümü');
    expect(external).toEqual([]);
    noErrors();
  });

  test('2008 sonrası giriş: prim şartı 2038 yılında dolar, yaş kademesi 62 olur', async ({ page }) => {
    await open(page);
    await fillForm(page, { gender: 'erkek', birth: '1990-06-15', entry: '2010-01-10', prim: '3000' });
    await expect(page.locator('#r-age')).toHaveText('62 yaş');
    await expect(page.locator('#r-prim')).toContainText('7.200 gün');
    await expect(page.locator('#r-prim')).toContainText('eksik: 4.200 gün');
    await expect(page.locator('#r-retire')).toHaveText('15 Haziran 2052');
    await expect(page.locator('#r-head')).toContainText('15 Haziran 2052');
  });

  test('1999-2008 arası giriş: kadın 58 yaş, 7.000 gün; 4/b için 9.000 gün', async ({ page }) => {
    await open(page);
    await fillForm(page, { gender: 'kadin', birth: '1985-02-10', entry: '2005-05-05', prim: '4000' });
    await expect(page.locator('#r-age')).toHaveText('58 yaş');
    await expect(page.locator('#r-prim')).toContainText('7.000 gün');
    await expect(page.locator('#r-retire')).toHaveText('10 Şubat 2043');
    await fillForm(page, { status: 'b', gender: 'kadin', birth: '1985-02-10', entry: '2005-05-05', prim: '4000' });
    await expect(page.locator('#r-prim')).toContainText('9.000 gün');
  });

  test('prim günü girilmezse uyarı notu çıkar; 4/b EYT 20 yıl ve 9.000 gün', async ({ page }) => {
    await open(page);
    await fillForm(page, { status: 'b', gender: 'kadin', birth: '1975-02-10', entry: '1996-05-05' });
    await expect(page.locator('#r-sig')).toContainText('20 yıl');
    await expect(page.locator('#r-prim')).toContainText('9.000 gün');
    await expect(page.locator('#r-prim')).toContainText('prim günü girilmedi');
    await expect(page.locator('#r-notes')).toContainText('Prim gün sayınızı girmediğiniz');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir; Temizle sonucu gizler', async ({ page }) => {
    await open(page);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('Doğum tarihi eksik');
    await expect(page.locator('#result')).toBeHidden();
    await fillForm(page, { gender: 'erkek', birth: '1990-01-01', entry: '2030-01-01' });
    await expect(page.locator('#error')).toContainText('gelecekte olamaz');
    await fillForm(page, { gender: 'erkek', birth: '1990-01-01', entry: '2010-01-01', prim: 'abc' });
    await expect(page.locator('#error')).toContainText('Prim gün sayısı geçersiz');
    await fillForm(page, { gender: 'erkek', birth: '1990-01-01', entry: '1995-01-01' });
    await expect(page.locator('#error')).toContainText('doğumdan en az 12 yıl sonra');
    await fillForm(page, { gender: 'erkek', birth: '1970-01-01', entry: '1990-01-01' });
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#clear').click();
    await expect(page.locator('#result')).toBeHidden();
  });

  test('sayfa yapısı: 3 reklam alanı, en az 7 SSS, 900+ kelime, JSON-LD, parametre tarihi, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page);
    await expect(page.locator('h1')).toContainText('Emeklilik Yaşı Hesaplama');
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const k of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="emeklilik-yasi-hesapla-${k}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ld.map((t) => JSON.parse(t)['@type']);
    expect(types).toContain('FAQPage');
    expect(types).toContain('SoftwareApplication');
    await expect(page.locator('#params-info')).toContainText('Parametreler');
    await fillForm(page, { gender: 'kadin', birth: '1978-04-12', entry: '1997-03-01', prim: '5200' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
