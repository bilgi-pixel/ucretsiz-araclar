import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

const NAMES = ['Ayşe Yılmaz', 'Mehmet Kaya', 'Zeynep Demir', 'Ali Çelik', 'Elif Şahin', 'Burak Arslan', 'Selin Koç', 'Emre Doğan', 'İrem Yıldız', 'Can Öztürk'];

test.describe('Çekiliş', () => {
  test('10 isim, 2 kazanan + 1 yedek, animasyonu atla → 3 farklı isim, PNG iner, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/cekilis/');
    await page.locator('#names').fill(NAMES.join('\n'));
    await expect(page.locator('#stats')).toContainText('10 katılımcı');
    await page.locator('#opt-winners').fill('2');
    await page.locator('#opt-backups').fill('1');
    await page.locator('#draw').click();
    await expect(page.locator('#skip')).toBeVisible();
    await page.locator('#skip').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const winners = await page.locator('#winners li').allTextContents();
    const backups = await page.locator('#backups li').allTextContents();
    expect(winners).toHaveLength(2);
    expect(backups).toHaveLength(1);
    const all = [...winners, ...backups];
    expect(new Set(all).size).toBe(3);
    for (const n of all) expect(NAMES).toContain(n);
    await expect(page.locator('#result-meta')).toContainText('10 katılımcı');

    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-png').click()]);
    expect(dl.suggestedFilename()).toMatch(/^cekilis-sonucu-\d{4}-\d{2}-\d{2}\.png$/);
    const head = readFileSync((await dl.path())!).subarray(0, 8);
    expect(Array.from(head)).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tekrarlar kaldırılır, sayaç gösterilir; Instagram @ ayıklama çalışır', async ({ page }) => {
    await page.goto('/cekilis/');
    await page.locator('#names').fill(['Ayşe', 'ayşe ', 'Mehmet', 'AYŞE', 'Mehmet'].join('\n'));
    await expect(page.locator('#stats')).toContainText('2 katılımcı');
    await expect(page.locator('#count-dupes')).toHaveText('3');
    await page.locator('#opt-dedupe').uncheck();
    await expect(page.locator('#stats')).toContainText('5 katılımcı');

    await page.locator('#opt-dedupe').check();
    await page.locator('#opt-instagram').check();
    await page.locator('#names').fill('@ali_veli harika 2 gün önce\n@ayse.k ben de katılıyorum\nmail@ornek.com\n@ali_veli tekrar');
    await expect(page.locator('#stats')).toContainText('2 katılımcı');
    await expect(page.locator('#count-dupes')).toHaveText('1');
  });

  test('hariç tutulan kişi 100 çekilişte hiç çıkmaz', async ({ page }) => {
    await page.goto('/cekilis/');
    await page.locator('#names').fill(NAMES.join('\n'));
    await page.locator('#exclude').fill('mehmet kaya');
    await expect(page.locator('#count-excluded')).toHaveText('1');
    const hits = await page.evaluate((names) => {
      const api = (window as any).cekilis;
      const { list } = api.prepareList(names, { dedupe: true, exclude: ['mehmet kaya'] });
      let bad = 0;
      for (let i = 0; i < 100; i++) {
        const r = api.drawWinners(list, { winners: 3, backups: 2, unique: true });
        const all = [...r.winners, ...r.backups];
        if (all.includes('Mehmet Kaya')) bad++;
        if (new Set(all).size !== 5) bad++;
      }
      return bad;
    }, NAMES);
    expect(hits).toBe(0);
  });

  test('boş liste ve yetersiz katılımcı için Türkçe hata', async ({ page }) => {
    await page.goto('/cekilis/');
    await page.locator('#draw').click();
    await expect(page.locator('#error')).toContainText('Katılımcı listesi boş');
    await expect(page.locator('#result')).not.toHaveClass(/is-active/);
    await page.locator('#names').fill('Ayşe\nMehmet');
    await page.locator('#opt-winners').fill('3');
    await page.locator('#draw').click();
    await expect(page.locator('#error')).toContainText('azaltın');
  });

  test('sayı çek ve zar modları', async ({ page }) => {
    await page.goto('/cekilis/');
    await page.locator('#mode-numbers').check();
    await expect(page.locator('#panel-names')).toBeHidden();
    await page.locator('#num-min').fill('1');
    await page.locator('#num-max').fill('10');
    await page.locator('#num-count').fill('10');
    await page.locator('#num-draw').click();
    const nums = (await page.locator('#num-output').textContent())!.split(',').map((s) => Number(s.trim()));
    expect(nums.slice().sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    await page.locator('#num-count').fill('11');
    await page.locator('#num-draw').click();
    await expect(page.locator('#num-error')).toContainText('farklı sayı');

    await page.locator('#mode-coin').check();
    await page.locator('#coin-flip').click();
    await expect(page.locator('#coin-output')).toHaveText(/^(Yazı|Tura)$/);
    await page.locator('#dice-count').selectOption('2');
    await page.locator('#dice-roll').click();
    await expect(page.locator('#coin-output')).toHaveText(/^[1-6] \+ [1-6] = \d+$/);
  });
});
