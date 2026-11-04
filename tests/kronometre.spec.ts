import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/kronometre/';
const T0 = new Date('2026-01-01T10:00:00+03:00');

/**
 * Sahte saati kurar ve duraklatır: install sonrası saat gerçek zamanla akmaya devam ettiği için
 * kesin süre doğrulamaları pauseAt olmadan kararsız olur. Bundan sonra yalnızca clock.runFor/fastForward zamanı ilerletir.
 */
async function openPaused(page: Page) {
  await page.clock.install({ time: T0 });
  await page.goto(URL);
  // Yavaş makinede sayfa yüklenirken gerçek süre akar; pauseAt geçmişe gidemediği için 10 dk ileriye duraklatılır.
  await page.clock.pauseAt(new Date(T0.getTime() + 10 * 60_000));
}

const display = (page: Page) => page.locator('#kr-display');
const startBtn = (page: Page) => page.locator('#kr-start');
const lapBtn = (page: Page) => page.locator('#kr-lap');

/** Saati ilerletip tur alır. */
async function lapAfter(page: Page, ms: number) {
  await page.clock.runFor(ms);
  await lapBtn(page).click();
}

test.describe('Online Kronometre', () => {
  test('1 dk 5,25 sn: canlı gösterge, sekme başlığında süre; durdurunca tam değer görünür', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await openPaused(page);
    await expect(display(page)).toHaveText('00:00:00.00');
    await expect(page.locator('#kr-status')).toHaveText('Hazır');
    await expect(lapBtn(page)).toBeDisabled();
    await startBtn(page).click();
    await expect(page.locator('#kr-status')).toHaveText('Çalışıyor');
    await expect(startBtn(page)).toHaveText('Durdur');
    await page.clock.runFor(65250);
    // Çizim 50 ms'lik döngüyle yapıldığından canlı değer en fazla bir çizim geride olabilir.
    await expect(display(page)).toHaveText(/^00:01:0[45]\.\d\d$/);
    await expect.poll(() => page.title()).toMatch(/^00:01:0[45] – Online Kronometre/);
    // Durdurunca ekran kesin değere zorlanır: 65250 ms → 00:01:05.25
    await startBtn(page).click();
    await expect(display(page)).toHaveText('00:01:05.25');
    await expect(page.locator('#kr-status')).toHaveText('Durduruldu');
    await expect(startBtn(page)).toHaveText('Devam');
    await expect(lapBtn(page)).toBeDisabled();
    await expect.poll(() => page.title()).toMatch(/^Durdu 00:01:05 – /);
    expect(external).toEqual([]);
    noErrors();
  });

  test('durdur–devam: duraklatma süresi sayılmaz; sıfırla süreyi, turları ve başlığı temizler', async ({ page }) => {
    await openPaused(page);
    await startBtn(page).click();
    await page.clock.runFor(2000);
    await startBtn(page).click(); // durdur
    await expect(display(page)).toHaveText('00:00:02.00');
    // Durmuşken saat ilerlese de süre değişmez
    await page.clock.runFor(10_000);
    await expect(display(page)).toHaveText('00:00:02.00');
    await startBtn(page).click(); // devam
    await page.clock.runFor(3000);
    await startBtn(page).click();
    await expect(display(page)).toHaveText('00:00:05.00');
    await page.locator('#kr-reset').click();
    await expect(display(page)).toHaveText('00:00:00.00');
    await expect(page.locator('#kr-status')).toHaveText('Hazır');
    await expect(startBtn(page)).toHaveText('Başlat');
    await expect(page.locator('#kr-laps li')).toHaveCount(0);
    await expect(page.locator('#kr-laps-wrap')).toBeHidden();
    await expect.poll(() => page.title()).toBe('Online Kronometre – Tur Kaydeden Ücretsiz Kronometre (Tam Ekran, CSV)');
  });

  test('tur listesi: tur ve toplam süreler, en hızlı/en yavaş vurgusu, özet satırı', async ({ page }) => {
    await openPaused(page);
    await startBtn(page).click();
    // Turlar: 1 sn, 3 sn, 2 sn → toplamlar 1, 4, 6 sn
    await lapAfter(page, 1000);
    // Tek turda vurgu yok
    await expect(page.locator('#kr-laps li.is-fast, #kr-laps li.is-slow')).toHaveCount(0);
    await lapAfter(page, 3000);
    await lapAfter(page, 2000);
    const rows = page.locator('#kr-laps li');
    await expect(rows).toHaveCount(3);
    // En yeni tur üstte
    await expect(rows.nth(0)).toHaveAttribute('data-lap', '3');
    await expect(rows.nth(2)).toHaveAttribute('data-lap', '1');
    await expect(page.locator('#kr-laps li[data-lap="1"] .kr-split')).toHaveText('00:01.00');
    await expect(page.locator('#kr-laps li[data-lap="1"] .kr-total')).toHaveText('00:01.00');
    await expect(page.locator('#kr-laps li[data-lap="2"] .kr-split')).toHaveText('00:03.00');
    await expect(page.locator('#kr-laps li[data-lap="2"] .kr-total')).toHaveText('00:04.00');
    await expect(page.locator('#kr-laps li[data-lap="3"] .kr-split')).toHaveText('00:02.00');
    await expect(page.locator('#kr-laps li[data-lap="3"] .kr-total')).toHaveText('00:06.00');
    // En hızlı Tur 1 (1 sn), en yavaş Tur 2 (3 sn); orta tur işaretsiz
    await expect(page.locator('#kr-laps li[data-lap="1"]')).toHaveClass(/is-fast/);
    await expect(page.locator('#kr-laps li[data-lap="1"] .kr-tag')).toHaveText('en hızlı');
    await expect(page.locator('#kr-laps li[data-lap="2"]')).toHaveClass(/is-slow/);
    await expect(page.locator('#kr-laps li[data-lap="2"] .kr-tag')).toHaveText('en yavaş');
    await expect(page.locator('#kr-laps li[data-lap="3"] .kr-tag')).toHaveCount(0);
    // Özet: 6 sn / 3 tur = 2 sn ortalama
    await expect(page.locator('#kr-summary')).toContainText('3 tur');
    await expect(page.locator('#kr-summary')).toContainText('ortalama 00:02.00');
    await expect(page.locator('#kr-summary')).toContainText('en hızlı Tur 1 (00:01.00)');
    await expect(page.locator('#kr-summary')).toContainText('en yavaş Tur 2 (00:03.00)');
    // Geçerli tur satırı bir sonraki turu gösterir ve canlı akar
    await page.clock.runFor(500);
    await expect(page.locator('#kr-current')).toHaveText(/^Tur 4: 00:00\.[45]\d$/);
    // Sıfırlayınca liste kaybolur
    await page.locator('#kr-reset').click();
    await expect(page.locator('#kr-laps li')).toHaveCount(0);
  });

  test('eşit tur süreleri vurgulanmaz; bir saati aşan turlar SS:DD:SN.yy biçiminde görünür', async ({ page }) => {
    await openPaused(page);
    await startBtn(page).click();
    await lapAfter(page, 1000);
    await lapAfter(page, 1000);
    await expect(page.locator('#kr-laps li')).toHaveCount(2);
    await expect(page.locator('#kr-laps li.is-fast, #kr-laps li.is-slow')).toHaveCount(0);
    // Büyük sıçrama: yaklaşık 1 saat 1 dakika 1 sn sonra tur
    await page.clock.fastForward(3_661_000);
    await lapBtn(page).click();
    await expect(page.locator('#kr-laps li[data-lap="3"] .kr-total')).toHaveText(/^01:01:0[2-3]\.\d\d$/);
    await expect(page.locator('#kr-laps li[data-lap="3"]')).toHaveClass(/is-slow/);
    await expect(page.locator('#kr-laps li[data-lap="1"]')).toHaveClass(/is-fast/);
  });

  test('klavye: Boşluk başlat/durdur, L tur, R sıfırla; düğmeye odaklıyken de çalışır, çift tetiklenmez', async ({ page }) => {
    await openPaused(page);
    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await page.keyboard.press('Space');
    await expect(page.locator('#kr-status')).toHaveText('Çalışıyor');
    await page.clock.runFor(1500);
    await page.keyboard.press('l');
    await expect(page.locator('#kr-laps li')).toHaveCount(1);
    await page.clock.runFor(500);
    await page.keyboard.press('L');
    await expect(page.locator('#kr-laps li')).toHaveCount(2);
    await page.keyboard.press('Space');
    await expect(page.locator('#kr-status')).toHaveText('Durduruldu');
    await expect(display(page)).toHaveText('00:00:02.00');
    await page.keyboard.press('r');
    await expect(page.locator('#kr-status')).toHaveText('Hazır');
    await expect(page.locator('#kr-laps li')).toHaveCount(0);
    // Başlat düğmesi odaktayken Boşluk yalnızca bir kez tetikler (başlat → durdur)
    await startBtn(page).focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#kr-status')).toHaveText('Çalışıyor');
    await page.keyboard.press('Space');
    await expect(page.locator('#kr-status')).toHaveText('Durduruldu');
    // Fareyle başlatıp odak düğmedeyken L tuşu tur alır
    await page.keyboard.press('r');
    await startBtn(page).click();
    await page.clock.runFor(700);
    await page.keyboard.press('l');
    await expect(page.locator('#kr-laps li')).toHaveCount(1);
    await expect(page.locator('#kr-laps li[data-lap="1"] .kr-split')).toHaveText('00:00.70');
  });

  test('dışa aktarma: düğmeler turlar yokken kapalı; CSV (BOM, noktalı virgül) ve metin dosyası indirilir', async ({ page }) => {
    await openPaused(page);
    await expect(page.locator('#kr-laps-wrap')).toBeHidden();
    await startBtn(page).click();
    await lapAfter(page, 1000);
    await lapAfter(page, 3000);
    await lapAfter(page, 2000);
    await expect(page.locator('#kr-csv')).toBeEnabled();

    const [csvDl] = await Promise.all([page.waitForEvent('download'), page.locator('#kr-csv').click()]);
    expect(csvDl.suggestedFilename()).toBe('kronometre-turlari.csv');
    const csv = readFileSync((await csvDl.path())!, 'utf8');
    expect(csv.charCodeAt(0)).toBe(0xfeff); // Excel için UTF-8 BOM
    expect(csv.replace(/^﻿/, '').split('\r\n').filter(Boolean)).toEqual([
      'Tur;Tur süresi;Toplam süre',
      '1;00:00:01.00;00:00:01.00',
      '2;00:00:03.00;00:00:04.00',
      '3;00:00:02.00;00:00:06.00',
    ]);

    const [txtDl] = await Promise.all([page.waitForEvent('download'), page.locator('#kr-txt').click()]);
    expect(txtDl.suggestedFilename()).toBe('kronometre-turlari.txt');
    const txt = readFileSync((await txtDl.path())!, 'utf8');
    expect(txt).toContain('Tur\tTur süresi\tToplam süre');
    expect(txt).toContain('2\t00:00:03.00\t00:00:04.00');
    expect(txt).toContain('En hızlı: Tur 1 (00:00:01.00)');
    expect(txt).toContain('En yavaş: Tur 2 (00:00:03.00)');
    expect(txt).toContain('Ortalama tur: 00:00:02.00');
  });

  test('kopyalama: sekmeyle ayrılmış metin panoya gider; pano reddederse çözüm öneren hata çıkar', async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __copied?: string; __failCopy?: boolean };
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (t: string) => { if (w.__failCopy) throw new Error('denied'); w.__copied = t; } },
      });
    });
    await openPaused(page);
    await startBtn(page).click();
    await lapAfter(page, 1500);
    await lapAfter(page, 500);
    await page.locator('#kr-copy').click();
    await expect(page.locator('#kr-note')).toHaveText('2 tur panoya kopyalandı.');
    const copied = await page.evaluate(() => (window as unknown as { __copied: string }).__copied);
    expect(copied).toContain('1\t00:00:01.50\t00:00:01.50');
    expect(copied).toContain('2\t00:00:00.50\t00:00:02.00');
    // Pano erişimi reddedilirse
    await page.evaluate(() => { (window as unknown as { __failCopy: boolean }).__failCopy = true; });
    await page.locator('#kr-copy').click();
    await expect(page.locator('#error')).toContainText('Panoya kopyalanamadı');
    await expect(page.locator('#error')).toContainText('Metin indir');
  });

  test('çalışırken sayfa kapatma uyarısı (beforeunload) vardır; durmuşken ya da hazırken yoktur', async ({ page }) => {
    await openPaused(page);
    const fire = () => page.evaluate(() => {
      const e = new Event('beforeunload', { cancelable: true });
      window.dispatchEvent(e);
      return e.defaultPrevented;
    });
    expect(await fire()).toBe(false);
    await startBtn(page).click();
    expect(await fire()).toBe(true);
    await startBtn(page).click(); // durdur
    expect(await fire()).toBe(false);
  });

  test('tam ekran düğmesi ve F kısayolu: geçiş yapar ya da çözüm öneren uyarı gösterir; sayfa çökmez', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(URL);
    await page.locator('#kr-fs').click();
    const entered = await page.waitForFunction(() => !!document.fullscreenElement, null, { timeout: 3000 }).then(() => true, () => false);
    if (entered) {
      await expect(page.locator('#kr-fs')).toHaveText('Tam ekrandan çık');
      await page.locator('#kr-fs').click();
      await page.waitForFunction(() => !document.fullscreenElement);
      await expect(page.locator('#kr-fs')).toHaveText('Tam ekran');
    } else {
      await expect(page.locator('#error')).toContainText('tam ekran', { ignoreCase: true });
    }
    noErrors();
  });

  test('saf işlevler: biçimlendirme (yüzde saniye aşağı yuvarlanır) ve tur analizi', async ({ page }) => {
    await page.goto(URL);
    const out = await page.evaluate(() => {
      const k = (window as unknown as { kronometre: any }).kronometre;
      return {
        a: k.formatTime(0),
        b: k.formatTime(65250),
        c: k.formatTime(9),
        d: k.formatTime(10),
        e: k.formatTime(3_725_990),
        f: k.formatLap(65250),
        g: k.formatLap(3_725_990),
        neg: k.formatTime(-5),
        one: k.analyzeLaps([{ total: 1000, split: 1000 }]),
        eq: k.analyzeLaps([{ total: 1000, split: 1000 }, { total: 2000, split: 1000 }]),
        three: k.analyzeLaps([{ total: 1000, split: 1000 }, { total: 4000, split: 3000 }, { total: 6000, split: 2000 }]),
        none: k.analyzeLaps([]),
      };
    });
    expect(out.a).toBe('00:00:00.00');
    expect(out.b).toBe('00:01:05.25');
    expect(out.c).toBe('00:00:00.00');
    expect(out.d).toBe('00:00:00.01');
    expect(out.e).toBe('01:02:05.99');
    expect(out.f).toBe('01:05.25');
    expect(out.g).toBe('01:02:05.99');
    expect(out.neg).toBe('00:00:00.00');
    expect(out.one).toMatchObject({ fastest: -1, slowest: -1, count: 1, average: 1000 });
    expect(out.eq).toMatchObject({ fastest: -1, slowest: -1, count: 2 });
    expect(out.three).toMatchObject({ fastest: 0, slowest: 1, count: 3, average: 2000 });
    expect(out.none).toMatchObject({ fastest: -1, slowest: -1, count: 0, average: 0 });
  });

  test('360px genişlikte tur listesi ve saat dahil yatay taşma yok; düğmeler dokunmaya uygun', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await openPaused(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await startBtn(page).click();
    for (let i = 0; i < 6; i++) await lapAfter(page, 7000 + i * 1300);
    await page.clock.fastForward(3_700_000); // saat basamağı görünsün
    await lapBtn(page).click();
    await expect(page.locator('#kr-laps li')).toHaveCount(7);
    await expect(page.locator('#kr-laps li.is-fast')).toHaveCount(1);
    await expect(page.locator('#kr-laps li.is-slow')).toHaveCount(1);
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Düğmeler dokunmaya uygun yükseklikte
    for (const id of ['#kr-start', '#kr-lap', '#kr-reset', '#kr-fs']) {
      const box = await page.locator(id).boundingBox();
      expect(box!.height, id).toBeGreaterThanOrEqual(40);
    }
    // Büyük rakamlar kutudan taşmaz
    const fits = await page.evaluate(() => {
      const d = document.getElementById('kr-display')!;
      const s = d.parentElement!;
      return d.scrollWidth <= s.clientWidth;
    });
    expect(fits).toBe(true);
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, gizlilik rozeti, meta.json', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="kronometre-${s}"]`).count()).toBe(1);
    // Reklam A araç kutusundan hemen sonra gelir; butonların yanında/üstünde değildir
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="kronometre-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/kronometre/');
    await expect(page.locator('h1')).toContainText('Online Kronometre');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    for (const slug of ['zamanlayici', 'online-alarm', 'metronom']) {
      await expect(page.locator(`.ba-related a[href="../${slug}/"]`)).toHaveCount(1);
    }
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'kronometre', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('dosya');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
    expect(external).toEqual([]);
  });
});
