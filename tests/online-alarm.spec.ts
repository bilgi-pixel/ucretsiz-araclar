import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/online-alarm/';
const STORE = 'ba-online-alarm';
const BASE_TITLE = 'Online Alarm Kur – Tarayıcıda Ücretsiz Alarm Saati (Sesli, Ertelemeli)';
// Sahte saat 10:00'da kurulur, sayfa yüklendikten sonra 10:10:00'da DURDURULUR; zamanı yalnızca clock.runFor ilerletir.
const T0 = new Date('2026-01-01T10:00:00+03:00');
const NOW = new Date(T0.getTime() + 10 * 60_000);

test.use({ timezoneId: 'Europe/Istanbul', locale: 'tr-TR' });

type StubOptions = {
  vibrate?: boolean;
  /** 'ask': izin "default" başlar, requestPermission "granted" döner. */
  notification?: 'granted' | 'denied' | 'ask';
};

/** Titreşim, Bildirim ve osilatör sayacı taklitleri; sayfa betiklerinden önce kurulur. */
async function installStubs(page: Page, opts: StubOptions) {
  await page.addInitScript((o) => {
    const w = window as any;
    w.__vib = [];
    w.__notes = [];
    w.__asked = 0;
    w.__osc = 0;
    if (o.vibrate) {
      Object.defineProperty(navigator, 'vibrate', { configurable: true, value: (p: unknown) => { w.__vib.push(p); return true; } });
    }
    if (o.notification) {
      const Fake: any = function (title: string, options: object) { w.__notes.push(Object.assign({ title }, options)); };
      Fake.permission = o.notification === 'ask' ? 'default' : o.notification;
      Fake.requestPermission = async () => {
        w.__asked += 1;
        if (o.notification === 'ask') Fake.permission = 'granted';
        return Fake.permission;
      };
      w.Notification = Fake;
    }
    const AC = w.AudioContext || w.webkitAudioContext;
    if (AC) {
      const orig = AC.prototype.createOscillator;
      AC.prototype.createOscillator = function (...args: unknown[]) { w.__osc += 1; return orig.apply(this, args); };
    }
  }, opts);
}

/** Sayfayı sahte saatle açar; seed verilirse localStorage'a önceden yazılır. */
async function openPaused(page: Page, opts: StubOptions = {}, seed?: unknown) {
  await page.clock.install({ time: T0 });
  await installStubs(page, opts);
  if (seed !== undefined) {
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [STORE, typeof seed === 'string' ? seed : JSON.stringify(seed)]);
  }
  await page.goto(URL);
  // Yavaş makinede yükleme sırasında gerçek süre akar; pauseAt geçmişe gidemediği için 10 dk ileriye duraklatılır.
  await page.clock.pauseAt(NOW);
}

async function addAlarm(page: Page, time: string, name = '') {
  await page.locator('#al-time').fill(time);
  if (name) await page.locator('#al-name').fill(name);
  await page.locator('#al-add').click();
}

const ringBox = (page: Page) => page.locator('#ring');
const items = (page: Page) => page.locator('#al-list li');

/** Geçerli bir alarm kaydı üretir (seed için). */
function rec(id: string, time: string, at: string, extra: Record<string, unknown> = {}) {
  return { id, time, at: Date.parse(at), name: '', sound: 'klasik', enabled: true, snoozed: false, missed: false, ...extra };
}

test.describe('Online Alarm', () => {
  test('2 dk sonraya alarm kur → kalan süre geri sayar; saat gelince çalma ekranı açılır; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await openPaused(page);
    await expect(page.locator('#al-next')).toHaveText('Kurulu alarm yok');
    await expect(page.locator('#al-empty')).toBeVisible();
    await addAlarm(page, '10:12', 'Toplantı');
    await expect(items(page)).toHaveCount(1);
    const item = items(page).first();
    await expect(item.locator('.al-clock')).toHaveText('10:12');
    await expect(item.locator('.al-name')).toHaveText('Toplantı');
    await expect(item.locator('.al-when')).toContainText('Bugün');
    await expect(item.locator('.al-when')).toContainText('Klasik zil');
    await expect(page.locator('#al-next')).toContainText('Sonraki alarm: 10:12 (Bugün) · Toplantı');
    await expect(page.locator('#al-countdown')).toHaveText('00:02:00');
    await expect(page.locator('#al-info')).toContainText('Alarm kuruldu');
    await expect(page.locator('#al-empty')).toBeHidden();
    // "Alarmı kur" tıklaması ses motorunu hazırlar (otomatik oynatma kuralı)
    await expect(page.locator('#al-audio')).toContainText('Ses: hazır');
    await expect(ringBox(page)).toBeHidden();

    await page.clock.runFor(60_000);
    // Tik aralığı 500 ms olduğundan geri sayım en fazla bir tik geride olabilir.
    await expect(page.locator('#al-countdown')).toHaveText(/^00:01:0[01]$/);
    await expect(item.locator('.al-left')).toHaveText(/^Kalan 00:01:0[01]$/);
    await expect.poll(() => page.title()).toMatch(/^00:01:0[01] – Online Alarm Kur/);
    await expect(ringBox(page)).toBeHidden();

    await page.clock.runFor(61_000); // 10:12:01 — alarm saati geçti
    await expect(ringBox(page)).toBeVisible();
    await expect(page.locator('#ring-time')).toHaveText('10:12');
    await expect(page.locator('#ring-name')).toHaveText('Toplantı');
    await expect(ringBox(page)).toHaveAttribute('data-sound', 'klasik');
    await expect(page.locator('#ring-audio')).toContainText('Ses çalıyor');
    await expect(item).toHaveClass(/is-ringing/);
    await expect(item.locator('.al-left')).toHaveText('Çalıyor');
    await expect(page.locator('#ring-close')).toBeFocused();
    // Arkadaki sayfa etkileşime kapatılır
    await expect(page.locator('main')).toHaveJSProperty('inert', true);
    // Osilatörler üretildi: ses dosyası değil, Web Audio
    expect(await page.evaluate(() => (window as any).__osc)).toBeGreaterThan(0);
    expect(external).toEqual([]);
    noErrors();
  });

  test('çalarken sekme başlığı yanıp söner; Kapat alarmı kapalı bırakır ve sayfayı etkileşime açar', async ({ page }) => {
    await openPaused(page);
    await addAlarm(page, '10:12', 'Çay');
    await page.clock.runFor(121_000);
    await expect(ringBox(page)).toBeVisible();
    const titles = new Set<string>();
    for (let i = 0; i < 4; i++) {
      await page.clock.runFor(1000);
      titles.add(await page.title());
    }
    expect([...titles].some((t) => t === '⏰ ALARM – Çay')).toBe(true);
    expect([...titles].some((t) => t === BASE_TITLE)).toBe(true);
    await page.locator('#ring-close').click();
    await expect(ringBox(page)).toBeHidden();
    await expect(page.locator('main')).toHaveJSProperty('inert', false);
    await expect.poll(() => page.title()).toBe(BASE_TITLE);
    // Alarm listede kapalı kalır (silinmez) ve "Aç" ile yeniden kurulur
    const item = items(page).first();
    await expect(item).toHaveClass(/is-off/);
    await expect(item.locator('.al-when')).toContainText('Kapalı');
    await expect(item.locator('button[data-act]').first()).toHaveText('Aç');
    await expect(page.locator('#al-next')).toHaveText('Kurulu alarm yok');
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STORE);
    expect(stored.alarms[0]).toMatchObject({ time: '10:12', name: 'Çay', enabled: false });
  });

  test('Ertele 5 dk: alarm 5 dk sonraya taşınır ve yeniden çalar; Kapat sonrası "Aç" ertesi güne kurar', async ({ page }) => {
    await openPaused(page);
    await addAlarm(page, '10:12');
    await page.clock.runFor(121_000); // 10:12:01
    await expect(ringBox(page)).toBeVisible();
    await expect(page.locator('#ring-name')).toHaveText('Alarm'); // adsız alarm
    await page.getByRole('button', { name: 'Ertele 5 dk' }).click();
    await expect(ringBox(page)).toBeHidden();
    const item = items(page).first();
    await expect(item.locator('.al-clock')).toHaveText('10:17');
    await expect(item.locator('.al-when')).toContainText('ertelendi');
    await expect(page.locator('#al-countdown')).toHaveText('00:05:00');
    await expect(page.locator('#al-info')).toContainText('5 dakika ertelendi');
    await expect(page.locator('main')).toHaveJSProperty('inert', false);
    await page.clock.runFor(301_000);
    await expect(ringBox(page)).toBeVisible();
    await expect(page.locator('#ring-time')).toHaveText('10:17');
    await page.getByRole('button', { name: 'Kapat', exact: true }).click();
    await expect(ringBox(page)).toBeHidden();
    await expect(item).toHaveClass(/is-off/);
    // Aç → özgün saat (10:12) bir sonraki güne kurulur
    await item.locator('button[data-act="on"]').click();
    await expect(item.locator('.al-clock')).toHaveText('10:12');
    await expect(item.locator('.al-when')).toContainText('Yarın');
    await expect(page.locator('#al-countdown')).toHaveText(/^23:5[45]:\d\d$/);
    await expect(page.locator('#al-next')).toContainText('(Yarın)');
  });

  test('localStorage kalıcılığı: alarm, ses ve ses düzeyi yenilemeden sonra yerinde durur', async ({ page }) => {
    await openPaused(page);
    await page.locator('#al-sound').selectOption('dijital');
    await page.locator('#al-volume').evaluate((el: HTMLInputElement) => {
      el.value = '40';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await expect(page.locator('#al-volume-out')).toHaveText('%40');
    await addAlarm(page, '10:30', 'Ders');
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STORE);
    expect(saved.v).toBe(1);
    expect(saved.alarms).toHaveLength(1);
    expect(saved.alarms[0]).toMatchObject({ time: '10:30', name: 'Ders', sound: 'dijital', enabled: true });
    expect(saved.settings).toMatchObject({ sound: 'dijital', volume: 40, notify: false });
    await page.reload();
    await expect(items(page)).toHaveCount(1);
    await expect(items(page).first().locator('.al-clock')).toHaveText('10:30');
    await expect(items(page).first().locator('.al-name')).toHaveText('Ders');
    await expect(items(page).first().locator('.al-when')).toContainText('Dijital bip');
    await expect(page.locator('#al-sound')).toHaveValue('dijital');
    await expect(page.locator('#al-volume')).toHaveValue('40');
    await expect(page.locator('#al-volume-out')).toHaveText('%40');
    // Yenileme sonrası ses henüz etkinleştirilmemiştir: sayfa bunu açıkça söyler
    await expect(page.locator('#al-audio')).toContainText('Ses:');
  });

  test('bozuk kayıt: sayfa çökmez, çözüm öneren bilgi çıkar, liste sıfırlanır; tek tek bozuk alarmlar atlanır', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await openPaused(page);
    for (const bad of ['{bozuk json', '{"alarms":"x"}', '[1,2,3]', 'null', '"metin"']) {
      await page.evaluate(([k, v]) => localStorage.setItem(k, v), [STORE, bad]);
      await page.reload();
      await expect(page.locator('#al-info'), bad).toContainText('okunamadı');
      await expect(page.locator('#al-info')).toContainText('yeniden kurabilirsiniz');
      await expect(items(page)).toHaveCount(0);
      await expect(page.locator('#al-empty')).toBeVisible();
      // Bozuk kayıt temiz bir yapıyla değiştirilir
      const fixed = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STORE);
      expect(fixed.alarms).toEqual([]);
    }
    // Sayfa hâlâ çalışır
    await addAlarm(page, '10:20', 'Yeni');
    await expect(items(page)).toHaveCount(1);
    // Kısmen bozuk: geçerli alarm korunur, uyarı çıkmaz
    const partial = {
      v: 1,
      alarms: [rec('ok1', '10:30', '2026-01-01T10:30:00+03:00', { name: 'Sağlam', sound: 'yok-boyle-ses' }), { id: 'x', time: '99:99', at: 1 }, 5, null, { time: '10:00' }],
      settings: { sound: 'siren', volume: 'çok' },
    };
    await page.evaluate(([k, v]) => localStorage.setItem(k, v), [STORE, JSON.stringify(partial)]);
    await page.reload();
    await expect(items(page)).toHaveCount(1);
    await expect(items(page).first().locator('.al-name')).toHaveText('Sağlam');
    await expect(items(page).first().locator('.al-when')).toContainText('Klasik zil'); // bilinmeyen ses varsayılana döner
    await expect(page.locator('#al-info')).not.toContainText('okunamadı');
    await expect(page.locator('#al-sound')).toHaveValue('siren');
    await expect(page.locator('#al-volume')).toHaveValue('70');
    noErrors();
  });

  test('sayfa kapalıyken zamanı geçen alarm "Kaçırıldı" olur ve tek tıkla yeniden kurulur', async ({ page }) => {
    await openPaused(page, {}, {
      v: 1,
      alarms: [rec('gec', '09:00', '2026-01-01T09:00:00+03:00', { name: 'Sabah' }), rec('gelecek', '10:30', '2026-01-01T10:30:00+03:00', { name: 'Öğle' })],
      settings: { sound: 'klasik', volume: 70, notify: false },
    });
    await expect(items(page)).toHaveCount(2);
    await expect(page.locator('#al-info')).toContainText('1 alarm çalamadı');
    const missed = page.locator('#al-list li.is-missed');
    await expect(missed).toHaveCount(1);
    await expect(missed.locator('.al-name')).toHaveText('Sabah');
    await expect(missed.locator('.al-left')).toContainText('Kaçırıldı');
    await expect(ringBox(page)).toBeHidden(); // geçmiş alarm geç çalmaz
    // Gelecekteki alarm etkin kalır ve listenin başındadır
    await expect(items(page).first().locator('.al-name')).toHaveText('Öğle');
    await missed.locator('button[data-act="on"]').click();
    await expect(missed).toHaveCount(0);
    const sabah = page.locator('#al-list li', { hasText: 'Sabah' });
    await expect(sabah.locator('.al-when')).toContainText('Yarın');
    await expect(sabah).toHaveClass(/is-on/);
  });

  test('hızlı seçenekler: +5/+10/+30 dk saniye hassasiyetini korur; 06:00/07:00/08:00 yarın için kurulur', async ({ page }) => {
    await openPaused(page);
    for (const [m, v] of [['5', '10:15'], ['10', '10:20'], ['30', '10:40']]) {
      await page.locator(`[data-add="${m}"]`).click();
      await expect(page.locator('#al-time')).toHaveValue(v);
    }
    for (const t of ['06:00', '07:00', '08:00']) {
      await page.locator(`[data-time="${t}"]`).click();
      await expect(page.locator('#al-time')).toHaveValue(t);
    }
    // 30 sn ilerlet: +5 dk gerçekten 5 dakika sonrası olmalı (10:15:30), 10:15:00 değil
    await page.clock.runFor(30_000);
    await page.locator('[data-add="5"]').click();
    await expect(page.locator('#al-time')).toHaveValue('10:15');
    await page.locator('#al-add').click();
    await expect(page.locator('#al-countdown')).toHaveText('00:05:00');
    await expect(items(page).first().locator('.al-clock')).toHaveText('10:15');
    // Saat kutusunu elle yazınca saniye bilgisi bırakılır: 10:15 → bugün 10:15:00 (kalan 4 dk 30 sn)
    await page.locator('#al-time').fill('10:15');
    await page.locator('#al-add').click();
    await expect(items(page)).toHaveCount(2);
    await expect(page.locator('#al-countdown')).toHaveText('00:04:30');
    await expect(items(page).nth(1).locator('.al-when')).toContainText('Bugün');
    // 07:00 hazır seçeneği: saat geçmişte olduğundan yarına kurulur
    await page.locator('[data-time="07:00"]').click();
    await page.locator('#al-add').click();
    const seven = page.locator('#al-list li', { hasText: '07:00' });
    await expect(seven.locator('.al-when')).toContainText('Yarın');
    await expect(page.locator('#al-next')).toContainText('Sonraki alarm: 10:15 (Bugün)');
    // Liste sıralı: bugünkü alarm en üstte
    await expect(items(page).first().locator('.al-clock')).toHaveText('10:15');
  });

  test('dört melodi: seçenekler listelenir, her biri önizlemede ses üretir; seçilen ses çalma ekranına yansır', async ({ page }) => {
    await openPaused(page);
    const names = await page.locator('#al-sound option').allTextContents();
    expect(names).toEqual(['Klasik zil', 'Yumuşak melodi', 'Dijital bip', 'Uyandırıcı siren']);
    const values = await page.locator('#al-sound option').evaluateAll((els) => els.map((e) => (e as HTMLOptionElement).value));
    expect(values).toEqual(['klasik', 'melodi', 'dijital', 'siren']);
    const osc = () => page.evaluate(() => (window as any).__osc as number);
    for (const v of values) {
      const before = await osc();
      await page.locator('#al-sound').selectOption(v);
      await page.locator('#al-preview').click();
      await expect.poll(osc, { message: `${v} önizleme` }).toBeGreaterThan(before);
    }
    // Siren seçili alarm çalınca çalma ekranı bunu bildirir
    await addAlarm(page, '10:12', 'Siren denemesi');
    await page.clock.runFor(121_000);
    await expect(ringBox(page)).toBeVisible();
    await expect(ringBox(page)).toHaveAttribute('data-sound', 'siren');
    await expect(items(page).first().locator('.al-when')).toContainText('Uyandırıcı siren');
  });

  test('titreşim ve bildirim: çalarken titreşir, izin verilmişse bildirim gösterilir; Kapat titreşimi keser', async ({ page }) => {
    await openPaused(page, { vibrate: true, notification: 'ask' });
    // İzin yalnızca kutu işaretlenince istenir
    expect(await page.evaluate(() => (window as any).__asked)).toBe(0);
    await page.locator('#al-notify').check();
    await expect(page.locator('#al-notify-info')).toContainText('Bildirim açık');
    expect(await page.evaluate(() => (window as any).__asked)).toBe(1);
    await expect(page.locator('#al-notify')).toBeChecked();
    await addAlarm(page, '10:12', 'Randevu');
    expect(await page.evaluate(() => (window as any).__notes)).toEqual([]);
    await page.clock.runFor(121_000);
    await expect(ringBox(page)).toBeVisible();
    const notes = await page.evaluate(() => (window as any).__notes);
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toBe('Randevu');
    expect(notes[0].body).toContain('10:12');
    const vib = await page.evaluate(() => (window as any).__vib);
    expect(vib.length).toBeGreaterThan(0);
    expect(Array.isArray(vib[0])).toBe(true);
    await page.locator('#ring-close').click();
    const vibAfter = await page.evaluate(() => (window as any).__vib);
    expect(vibAfter[vibAfter.length - 1]).toBe(0); // titreşim iptal edilir
    // Ayar kalıcı
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STORE);
    expect(saved.settings.notify).toBe(true);
  });

  test('bildirim izni reddedilirse kutu sessizce kapanır; alarm yine ekran ve sesle çalar', async ({ page }) => {
    await openPaused(page, { notification: 'denied' });
    // check() yerine click(): kutu izin reddi yüzünden hemen geri kapanır, check() bunu hata sayar.
    await page.locator('#al-notify').click();
    await expect(page.locator('#al-notify')).not.toBeChecked();
    await expect(page.locator('#al-notify-info')).toContainText('izni verilmedi');
    await expect(page.locator('#error')).toBeHidden(); // hata değil, bilgi
    await addAlarm(page, '10:12', 'Yine de çalsın');
    await page.clock.runFor(121_000);
    await expect(ringBox(page)).toBeVisible();
    await expect(page.locator('#ring-name')).toHaveText('Yine de çalsın');
    expect(await page.evaluate(() => (window as any).__notes)).toEqual([]);
  });

  test('birden çok alarm: sıralı liste, aynı anda çalanlar sırayla gösterilir, Esc kapatır, sil ve aç/kapat çalışır', async ({ page }) => {
    await openPaused(page);
    await addAlarm(page, '10:12', 'A');
    await addAlarm(page, '10:12', 'B');
    await addAlarm(page, '10:11', 'Erken');
    await expect(items(page)).toHaveCount(3);
    // Sıra: çalma zamanına göre (10:11, 10:12, 10:12)
    await expect(items(page).nth(0).locator('.al-name')).toHaveText('Erken');
    await expect(page.locator('#al-next')).toContainText('10:11');
    // Birini kapat ve yeniden aç
    await items(page).nth(0).locator('button[data-act="off"]').click();
    await expect(items(page).last().locator('.al-name')).toHaveText('Erken'); // kapalılar sona
    await expect(page.locator('#al-info')).toContainText('10:11 alarmı kapatıldı');
    await items(page).last().locator('button[data-act="on"]').click();
    await expect(items(page).nth(0).locator('.al-name')).toHaveText('Erken'); // tekrar etkin: 10:11 henüz gelmedi, bugün kurulur
    await expect(items(page).nth(0).locator('.al-when')).toContainText('Bugün');
    // Sil
    await items(page).nth(0).locator('button[data-act="delete"]').click();
    await expect(items(page)).toHaveCount(2);
    await expect(page.locator('#al-info')).toContainText('Alarm silindi');
    // İki alarm aynı anda çalar
    await page.clock.runFor(121_000);
    await expect(ringBox(page)).toBeVisible();
    await expect(page.locator('#ring-name')).toHaveText('A');
    await expect(page.locator('#ring-more')).toContainText('Ayrıca 1 alarm daha çalıyor');
    await page.locator('#ring-close').click();
    await expect(ringBox(page)).toBeVisible();
    await expect(page.locator('#ring-name')).toHaveText('B');
    await expect(page.locator('#ring-more')).toHaveText('');
    await page.keyboard.press('Escape');
    await expect(ringBox(page)).toBeHidden();
    await expect(page.locator('#al-list li.is-off')).toHaveCount(2);
    await expect(page.locator('#al-next')).toHaveText('Kurulu alarm yok');
  });

  test('hatalar: boş saat ve 20 alarm sınırı Türkçe, çözüm öneren mesaj verir', async ({ page }) => {
    await openPaused(page, {}, {
      v: 1,
      alarms: Array.from({ length: 20 }, (_, i) => rec(`s${i}`, '12:00', '2026-01-01T12:00:00+03:00', { enabled: false, name: `Eski ${i}` })),
      settings: { sound: 'klasik', volume: 70, notify: false },
    });
    await expect(items(page)).toHaveCount(20);
    await addAlarm(page, '10:30');
    await expect(page.locator('#error')).toContainText('En fazla 20 alarm');
    await expect(page.locator('#error')).toContainText('silip');
    await expect(items(page)).toHaveCount(20);
    // Bir alarm silince yeniden kurulabilir
    await items(page).first().locator('button[data-act="delete"]').click();
    await page.locator('#al-add').click();
    await expect(page.locator('#error')).toBeHidden();
    await expect(items(page)).toHaveCount(20);
  });

  test('boş saat ile kurulamaz; klavyeyle kullanılır: Enter alarmı kurar, çalma ekranında odak Kapat düğmesindedir', async ({ page }) => {
    await openPaused(page);
    await page.locator('#al-add').click();
    await expect(page.locator('#error')).toContainText('Saat seçilmedi');
    await expect(page.locator('#error')).toContainText('07:30');
    await expect(items(page)).toHaveCount(0);
    await page.locator('#al-time').fill('10:12');
    await page.locator('#al-name').focus();
    await page.keyboard.type('Klavye');
    await page.keyboard.press('Enter'); // form gönderimi
    await expect(page.locator('#error')).toBeHidden();
    await expect(items(page)).toHaveCount(1);
    await expect(page.locator('#al-name')).toHaveValue('');
    await page.clock.runFor(121_000);
    await expect(ringBox(page)).toBeVisible();
    await expect(page.locator('#ring-close')).toBeFocused();
    await page.keyboard.press('Tab'); // arkadaki sayfa inert: odak asla sayfa içeriğine geçmez
    const inMain = await page.evaluate(() => document.querySelector('main')!.contains(document.activeElement));
    expect(inMain).toBe(false);
    await page.locator('#ring-close').focus();
    await page.keyboard.press('Enter'); // odaktaki Kapat düğmesini etkinleştirir
    await expect(ringBox(page)).toBeHidden();
  });

  test('saf işlevler: sonraki oluşum, kalan süre, gün etiketi ve kayıt doğrulama', async ({ page }) => {
    await page.goto(URL);
    const out = await page.evaluate(() => {
      const a = (window as any).onlineAlarm;
      const T = Date.parse('2026-01-01T10:00:00+03:00');
      const DAY = 86400000;
      return {
        later: a.nextOccurrence('10:30', T) - T,
        tomorrow: a.nextOccurrence('09:00', T) - T,
        same: a.nextOccurrence('10:00', T) - T,
        r0: a.formatRemaining(0),
        r1: a.formatRemaining(500),
        r2: a.formatRemaining(3_661_000),
        r3: a.formatRemaining(-5),
        today: a.dayLabel(T, T),
        tom: a.dayLabel(T + DAY, T),
        later2: a.dayLabel(T + 2 * DAY, T),
        hm: a.hhmm(T),
        n1: a.sanitizeStore(null),
        n2: a.sanitizeStore({}),
        n3: a.sanitizeStore({ alarms: 'x' }),
        empty: a.sanitizeStore({ alarms: [] }),
        mixed: a.sanitizeStore({
          alarms: [
            { id: 'a', time: '07:00', at: 1, sound: '__proto__', enabled: true },
            { id: 'a', time: '08:00', at: 2 },
            { id: 'b', time: '25:00', at: 3 },
            { id: 'c', time: '07:00', at: 'x' },
            { id: 'd', time: '23:59', at: 4, name: 'x'.repeat(100) },
          ],
          settings: { volume: 250, sound: 'siren', notify: true },
        }),
      };
    });
    expect(out.later).toBe(30 * 60_000);
    expect(out.tomorrow).toBe(23 * 3600_000); // yarın 09:00
    expect(out.same).toBe(24 * 3600_000); // tam şimdi ise yarın
    expect([out.r0, out.r1, out.r2, out.r3]).toEqual(['00:00:00', '00:00:01', '01:01:01', '00:00:00']);
    expect([out.today, out.tom, out.later2]).toEqual(['Bugün', 'Yarın', '03.01']);
    expect(out.hm).toBe('10:00');
    expect([out.n1, out.n2, out.n3]).toEqual([null, null, null]);
    expect(out.empty).toEqual({ alarms: [], settings: { sound: 'klasik', volume: 70, notify: false } });
    expect(out.mixed.alarms).toHaveLength(2);
    expect(out.mixed.alarms[0]).toMatchObject({ id: 'a', sound: 'klasik', enabled: true });
    expect(out.mixed.alarms[1].name).toHaveLength(40);
    expect(out.mixed.settings).toEqual({ sound: 'siren', volume: 100, notify: true });
  });

  test('360px genişlikte liste ve çalma ekranı dahil yatay taşma yok; çalma ekranı görünümü sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await openPaused(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const longName = 'Çok uzun bir alarm adı denemesi 1234567890';
    await addAlarm(page, '10:12', longName);
    await addAlarm(page, '10:40', 'Başka');
    await addAlarm(page, '11:40', 'Üçüncü');
    await expect(items(page)).toHaveCount(3);
    expect(await overflow()).toBeLessThanOrEqual(0);
    for (const sel of ['#al-add', '#al-preview', '[data-add="5"]', '[data-time="07:00"]']) {
      const box = await page.locator(sel).first().boundingBox();
      expect(box!.height, sel).toBeGreaterThanOrEqual(40);
    }
    // Büyük geri sayım kutusuna sığar
    const fits = await page.evaluate(() => {
      const d = document.getElementById('al-countdown')!;
      return d.scrollWidth <= d.parentElement!.clientWidth;
    });
    expect(fits).toBe(true);
    await page.clock.runFor(121_000);
    await expect(ringBox(page)).toBeVisible();
    const ring = await page.evaluate(() => {
      const r = document.getElementById('ring')!;
      const rect = r.getBoundingClientRect();
      const btn = (id: string) => document.getElementById(id)!.getBoundingClientRect();
      return {
        overflowX: r.scrollWidth - r.clientWidth,
        covers: rect.width >= window.innerWidth - 1 && rect.height >= window.innerHeight - 1,
        snooze: btn('ring-snooze'),
        close: btn('ring-close'),
        vw: window.innerWidth,
      };
    });
    expect(ring.overflowX).toBeLessThanOrEqual(0);
    expect(ring.covers).toBe(true);
    for (const b of [ring.snooze, ring.close]) {
      expect(b.left).toBeGreaterThanOrEqual(0);
      expect(b.right).toBeLessThanOrEqual(ring.vw);
      expect(b.height).toBeGreaterThanOrEqual(48);
    }
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda ve çalma ekranında yok), JSON-LD, uyarılar, meta.json', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('#ring .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="online-alarm-${s}"]`).count()).toBe(1);
    // Reklam A araç kutusundan hemen sonra gelir (butonların yanında/üstünde değil)
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="online-alarm-a"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const lds = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBeGreaterThanOrEqual(7);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/online-alarm/');
    await expect(page.locator('h1')).toContainText('Online Alarm Kur');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // Zorunlu uyarılar araç kutusunun içinde, ilk bakışta görünür
    const warn = page.locator('.ba-tool .al-warn');
    await expect(warn).toBeVisible();
    await expect(warn).toContainText('sekmenin açık');
    await expect(warn).toContainText('cihazın da uyanık');
    await expect(warn).toContainText('uyku moduna');
    await expect(warn).toContainText('etkileşim kurduktan sonra çalar');
    // İçerikte de yer alır
    const article = page.locator('.ba-content');
    await expect(article).toContainText('Sekme açık olmalı');
    await expect(article).toContainText('Cihaz uyanık olmalı');
    await expect(article).toContainText('Ses, etkileşimden sonra çalar');
    await expect(article).toContainText('yalnızca sizin tarayıcınızda');
    for (const slug of ['zamanlayici', 'kronometre']) {
      await expect(page.locator(`.ba-related a[href="../${slug}/"]`)).toHaveCount(1);
    }
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'online-alarm', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('dosya');
    for (const k of ['title', 'description', 'keywords', 'icon']) expect(meta[k], k).toBeTruthy();
    expect(meta.icon).not.toContain('\n');
    expect(external).toEqual([]);
  });
});
