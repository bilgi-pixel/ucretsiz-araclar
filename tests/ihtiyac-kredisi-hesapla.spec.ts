import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/ihtiyac-kredisi-hesapla/';

async function calc(page, amount: string, rate: string, term: string, paid = '') {
  await page.locator('#amount').fill(amount);
  await page.locator('#rate').fill(rate);
  await page.locator('#term').fill(term);
  await page.locator('#paid').fill(paid);
  await page.locator('#calc').click();
}

test.describe('İhtiyaç Kredisi Hesaplama', () => {
  test('100.000 TL, 36 ay, aylık %3,79 → taksit 5.986,89 TL; KKDF+BSMV dahil; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL);
    await expect(page.locator('#param-date')).not.toHaveText('…');
    await calc(page, '100.000', '3,79', '36');
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-active/);
    await expect(page.locator('#r-taksit')).toHaveText('5.986,89 TL');
    await expect(page.locator('#r-toplam')).toHaveText('215.528,04 TL');
    await expect(page.locator('#r-faiz')).toHaveText('88.867,57 TL');
    await expect(page.locator('#r-maliyet')).toHaveText('115.528,04 TL');
    await expect(page.locator('#plan-body tr')).toHaveCount(36);
    await expect(page.locator('#early-box')).toBeHidden();
    expect(external).toEqual([]);
    noErrors();
  });

  test('erken kapama: 12 taksit sonrası kalan anapara 83.200,71, kapama 84.864,73, tasarruf 58.820,63', async ({ page }) => {
    await page.goto(URL);
    await calc(page, '100.000', '3,79', '36', '12');
    await expect(page.locator('#early-box')).toBeVisible();
    await expect(page.locator('#e-bakiye')).toHaveText('83.200,71 TL');
    await expect(page.locator('#e-kapama')).toHaveText('84.864,73 TL');
    await expect(page.locator('#e-kalan-taksit')).toHaveText('143.685,36 TL');
    await expect(page.locator('#e-tasarruf')).toHaveText('58.820,63 TL');
    await expect(page.locator('#e-tazminat')).toContainText('%2');
    // Kalan vade ≤ 12 ay: örnek oran %1
    await calc(page, '100.000', '3,79', '36', '30');
    await expect(page.locator('#e-tazminat')).toContainText('%1');
  });

  test('BDDK vade sınırı: 300.000 TL için 36 ay hata; kutu kaldırılınca geçer; sınır satırı tutara göre değişir', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#param-date')).not.toHaveText('…');
    await page.locator('#amount').fill('100.000');
    await expect(page.locator('#limit-line')).toContainText('36 ay');
    await page.locator('#amount').fill('200.000');
    await expect(page.locator('#limit-line')).toContainText('24 ay');
    await page.locator('#amount').fill('300.000');
    await expect(page.locator('#limit-line')).toContainText('12 ay');
    await calc(page, '300.000', '3,79', '36');
    await expect(page.locator('#error')).toContainText('12 ay');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#bddk').uncheck();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toBeVisible();
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto(URL);
    await calc(page, '', '3,79', '12');
    await expect(page.locator('#error')).toContainText('Kredi tutarı');
    await calc(page, '50.000', '-1', '12');
    await expect(page.locator('#error')).toContainText('Aylık faiz oranı geçersiz');
    await calc(page, '50.000', '3,79', '0');
    await expect(page.locator('#error')).toContainText('Vade geçersiz');
    await calc(page, '50.000', '3,79', '12', '12');
    await expect(page.locator('#error')).toContainText('1 ile 11');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('360px genişlikte yatay taşma yok; klavye ile gönderilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.locator('#amount').fill('100.000');
    await page.locator('#rate').fill('3,79');
    await page.locator('#term').focus();
    await page.keyboard.type('36');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('3 reklam alanı, ≥900 kelime, SSS ≥7, JSON-LD, bilgilendirme notu', async ({ page }) => {
    await page.goto(URL);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['ihtiyac-kredisi-hesapla-a', 'ihtiyac-kredisi-hesapla-b', 'ihtiyac-kredisi-hesapla-c']);
    await expect(page.locator('.ba-tool .ba-ad')).toHaveCount(0);
    const text = (await page.locator('article.ba-content').textContent()) || '';
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"FAQPage"'))).toBe(true);
    expect(ld.some((t) => t.includes('"SoftwareApplication"'))).toBe(true);
    await expect(page.locator('body')).toContainText('Bilgilendirme amaçlıdır');
    await expect(page.locator('body')).toContainText('6502');
  });
});
