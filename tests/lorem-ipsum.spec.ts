import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

test.describe('Lorem Ipsum Üretici', () => {
  test('3 paragraf HTML → 3 <p>, Lorem ile başlar', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/lorem-ipsum/');
    await page.locator('#opt-format').selectOption('html');
    await page.locator('#opt-count').fill('3');
    const out = await page.locator('#output').inputValue();
    expect(out.match(/<p>/g)).toHaveLength(3);
    expect(out.match(/<\/p>/g)).toHaveLength(3);
    expect(out).toContain('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Türkçe mod ğ ve ş içerir; kelime sayısı tam', async ({ page }) => {
    await page.goto('/lorem-ipsum/');
    await page.locator('#opt-kind').selectOption('tr');
    await page.locator('#opt-count').fill('6');
    const text = await page.locator('#output').inputValue();
    expect(text).toMatch(/ğ/);
    expect(text).toMatch(/ş/);
    await page.locator('#opt-unit').selectOption('words');
    await page.locator('#opt-count').fill('25');
    const words = (await page.locator('#output').inputValue()).trim().split(/\s+/);
    expect(words).toHaveLength(25);
    await expect(page.locator('#stats')).toContainText('25 kelime');
    // klasik modda da tam sayı
    await page.locator('#opt-kind').selectOption('lorem');
    await page.locator('#opt-count').fill('4');
    expect((await page.locator('#output').inputValue()).trim().split(/\s+/)).toHaveLength(4);
  });

  test('örnek veri: ad soyad, adres, telefon biçimi; hatalı sayı Türkçe uyarı verir', async ({ page }) => {
    await page.goto('/lorem-ipsum/');
    await page.locator('#opt-kind').selectOption('names');
    await page.locator('#opt-count').fill('5');
    expect((await page.locator('#output').inputValue()).split('\n')).toHaveLength(5);
    await page.locator('#opt-kind').selectOption('phone');
    const phones = (await page.locator('#output').inputValue()).split('\n');
    for (const p of phones) expect(p).toMatch(/^05\d\d \d{3} \d{2} \d{2}$/);
    await page.locator('#opt-kind').selectOption('address');
    expect(await page.locator('#output').inputValue()).toMatch(/Mah\. .+ Sok\. No: \d+/);
    await page.locator('#opt-count').fill('0');
    await expect(page.locator('#error')).toContainText('en az 1');
    await page.locator('#opt-count').fill('99999');
    await expect(page.locator('#error')).toContainText('En fazla');
  });
});
