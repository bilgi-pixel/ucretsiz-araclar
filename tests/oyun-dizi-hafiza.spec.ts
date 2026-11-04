import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Dizi Hafıza: renk dizisi (DOM'da yanan padleri izleyip tekrar), sayı dizisi, oyun sonu, rekor, ses, klavye, 360px, içerik.
const URL_PATH = '/oyunlar/dizi-hafiza/';
const STORE_KEY = 'ba-oyun-dizi-hafiza';

type LitEvent = { pad: number; on: boolean; t: number };
type W = Window & { __lit?: LitEvent[]; __digits?: string[]; __ac?: number };

const game = (page: Page) => page.locator('#oyun');
const toPhase = (page: Page, phase: string, timeout = 20_000) =>
  expect(game(page)).toHaveAttribute('data-phase', phase, { timeout });

/** Oyun alanındaki padlerin "is-lit" sınıfını izler: gösterilen dizi DOM'dan okunur, sayfada gizli cevap yoktur. */
async function observePads(page: Page) {
  await page.evaluate(() => {
    const w = window as W;
    w.__lit = [];
    const pads = document.getElementById('pads')!;
    new MutationObserver((muts) => {
      for (const m of muts) {
        const el = m.target as HTMLElement;
        const was = (m.oldValue || '').split(/\s+/).includes('is-lit');
        const now = el.classList.contains('is-lit');
        if (was !== now) w.__lit!.push({ pad: Number(el.dataset.pad), on: now, t: performance.now() });
      }
    }).observe(pads, { subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });
  });
}

/** Sayı ekranına yazılan rakam dizilerini toplar. */
async function observeDigits(page: Page) {
  await page.evaluate(() => {
    const w = window as W;
    w.__digits = [];
    const el = document.getElementById('sayi-ekran')!;
    new MutationObserver(() => {
      const t = (el.textContent || '').trim();
      if (/^\d+$/.test(t)) w.__digits!.push(t);
    }).observe(el, { childList: true, characterData: true, subtree: true });
  });
}

/** Girdi aşamasında, son `n` adımı (şu anki dizinin tamamı) okur. */
async function shownSequence(page: Page, n: number): Promise<number[]> {
  const events = await page.evaluate(() => (window as W).__lit || []);
  const seq = events.filter((e) => e.on).map((e) => e.pad).slice(-n);
  expect(seq.length).toBe(n);
  return seq;
}

const pad = (page: Page, i: number) => page.locator(`#pads .dh-pad[data-pad="${i}"]`);

async function start(page: Page, opts: { mod?: string; hiz?: string } = {}) {
  await page.goto(URL_PATH);
  await expect(page.locator('h1')).toBeVisible();
  if (opts.mod) await page.locator('#mod').selectOption(opts.mod);
  await page.locator('#hiz').selectOption(opts.hiz ?? 'cok-hizli');
  if (opts.mod !== 'sayi') await observePads(page);
  else await observeDigits(page);
  await page.locator('#baslat').click();
}

/** Bir renk turunu doğru tekrar eder. */
async function repeatColorRound(page: Page, round: number) {
  await toPhase(page, 'input');
  const seq = await shownSequence(page, round);
  for (const p of seq) await pad(page, p).click();
  return seq;
}

const readStore = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);

test.describe('Dizi Hafıza Oyunu', () => {
  test('sayfa açılır, 4 pad var, ses varsayılan kapalı ve ses sistemi başlatılmaz; dış istek ve sayfa hatası yok', async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as W;
      w.__ac = 0;
      const AC = window.AudioContext;
      if (AC) {
        w.AudioContext = class extends AC {
          constructor(...args: ConstructorParameters<typeof AC>) {
            super(...args);
            w.__ac = (w.__ac || 0) + 1;
          }
        } as typeof AC;
      }
    });
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Dizi Hafıza');
    await toPhase(page, 'idle');
    await expect(page.locator('#pads .dh-pad')).toHaveCount(4);
    await expect(page.locator('#ses')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#ses-durum')).toHaveText('kapalı');
    await expect(page.locator('#tur')).toHaveText('0');
    await expect(page.locator('#en-yuksek')).toHaveText('0');
    await expect(page.locator('#hiz option')).toHaveCount(5);
    // ses kapalıyken oyun oynansa da AudioContext oluşmaz
    await page.locator('#hiz').selectOption('cok-hizli');
    await observePads(page);
    await page.locator('#baslat').click();
    await toPhase(page, 'input');
    expect(await page.evaluate(() => (window as W).__ac)).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('gösterilen diziyi doğru tekrar etmek turu artırır; yanlış pad oyunu bitirir; rekor kaydedilir; yeniden başlat çalışır', async ({ page }) => {
    await start(page);
    await toPhase(page, 'showing');
    await expect(page.locator('#tur')).toHaveText('1');
    // 1. tur: tek adım
    const first = await repeatColorRound(page, 1);
    expect(first.length).toBe(1);
    await expect(page.locator('#tur')).toHaveText('2');
    // 2. ve 3. turlar; dizi her turda bir adım uzar ve öncekinin devamıdır
    const second = await repeatColorRound(page, 2);
    expect(second.length).toBe(2);
    expect(second[0]).toBe(first[0]);
    await expect(page.locator('#tur')).toHaveText('3');
    const third = await repeatColorRound(page, 3);
    expect(third.slice(0, 2)).toEqual(second);
    await expect(page.locator('#tur')).toHaveText('4');
    await expect(page.locator('#en-yuksek')).toHaveText('3');

    // 4. tur: bilerek yanlış pad
    await toPhase(page, 'input');
    const fourth = await shownSequence(page, 4);
    expect(fourth.slice(0, 3)).toEqual(third);
    const wrong = (fourth[0] + 1) % 4;
    await pad(page, wrong).click();
    await toPhase(page, 'over');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-ozet')).toContainText('Tamamladığınız tur: 3');
    await expect(page.locator('#sonuc-dizi .dh-chip')).toHaveCount(4);
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(pad(page, wrong)).toHaveClass(/is-wrong/);
    await expect(pad(page, fourth[0])).toHaveClass(/is-expected/);
    await expect(page.locator('#baslat')).toHaveText('Tekrar oyna');
    expect((await readStore(page)).best).toEqual({ renk: 3, sayi: 0 });

    // oyun bittikten sonra ek adım oynatılmaz ve padler etkisizdir
    const countAtEnd = (await page.evaluate(() => (window as W).__lit!.length));
    await page.waitForTimeout(1300);
    expect(await page.evaluate(() => (window as W).__lit!.length)).toBe(countAtEnd);
    await toPhase(page, 'over');
    await pad(page, 0).click({ force: true });
    await toPhase(page, 'over');

    // yeniden oyna: tur 1'e döner, rekor korunur
    await page.locator('#baslat').click();
    await expect(page.locator('#sonuc')).toBeHidden();
    await expect(page.locator('#tur')).toHaveText('1');
    await expect(page.locator('#en-yuksek')).toHaveText('3');
    await toPhase(page, 'input');
    const again = await shownSequence(page, 1);
    expect(again.length).toBe(1);
  });

  test('ilk adımı yanlış basınca oyun biter, rekor yazılmaz ve anlaşılır mesaj çıkar', async ({ page }) => {
    await start(page);
    await toPhase(page, 'input');
    const [p] = await shownSequence(page, 1);
    await pad(page, (p + 2) % 4).click();
    await toPhase(page, 'over');
    await expect(page.locator('#sonuc-ozet')).toContainText('İlk turu tamamlayamadınız');
    await expect(page.locator('#sonuc-rekor')).toBeHidden();
    await expect(page.locator('#durum')).toContainText('Oyun bitti');
    expect((await readStore(page))?.best?.renk ?? 0).toBe(0);
  });

  test('dizi gösterilirken padlere basmak oyunu bozmaz', async ({ page }) => {
    await start(page, { hiz: 'yavas' });
    await toPhase(page, 'showing');
    await expect(pad(page, 0)).toHaveAttribute('aria-disabled', 'true');
    await pad(page, 0).dispatchEvent('click');
    await pad(page, 1).dispatchEvent('click');
    await toPhase(page, 'input');
    await expect(pad(page, 0)).toHaveAttribute('aria-disabled', 'false');
    await repeatColorRound(page, 1);
    await expect(page.locator('#tur')).toHaveText('2');
  });

  test('klavye 1-4 ile oynanır; yanlış tuş oyunu bitirir', async ({ page }) => {
    await start(page);
    await toPhase(page, 'input');
    const seq1 = await shownSequence(page, 1);
    await page.keyboard.press(String(seq1[0] + 1));
    await expect(page.locator('#tur')).toHaveText('2');
    await toPhase(page, 'input');
    const seq2 = await shownSequence(page, 2);
    for (const p of seq2) await page.keyboard.press(String(p + 1));
    await expect(page.locator('#tur')).toHaveText('3');
    await toPhase(page, 'input');
    const seq3 = await shownSequence(page, 3);
    await page.keyboard.press(String(((seq3[0] + 1) % 4) + 1));
    await toPhase(page, 'over');
    expect((await readStore(page)).best.renk).toBe(2);
  });

  test('hız seviyeleri: yavaş mod padi çok-hızlıdan belirgin uzun yakar', async ({ page }) => {
    const duration = async (hiz: string) => {
      await start(page, { hiz });
      await toPhase(page, 'input');
      const ev = await page.evaluate(() => (window as W).__lit || []);
      return ev[1].t - ev[0].t;
    };
    const slow = await duration('yavas');
    const fast = await duration('cok-hizli');
    expect(slow).toBeGreaterThan(650);
    expect(fast).toBeLessThan(450);
    expect(slow).toBeGreaterThan(fast * 1.8);
  });

  test('sayı dizisi modu: ekranda beliren sayıyı yazınca tur artar, yanlış sayı oyunu bitirir', async ({ page }) => {
    await start(page, { mod: 'sayi' });
    await expect(page.locator('#sayi-alani')).toBeVisible();
    await expect(page.locator('#renk-alani')).toBeHidden();
    await toPhase(page, 'input');
    const digits1 = (await page.evaluate(() => (window as W).__digits!)).at(-1)!;
    expect(digits1).toMatch(/^\d{3}$/);
    await expect(page.locator('#sayi-ekran')).toHaveText('•••');
    await expect(page.locator('#sayi-form')).toBeVisible();
    await expect(page.locator('#sayi-giris')).toBeFocused();

    // harfler süzülür, boş gönderim uyarır ama oyunu bitirmez
    await page.locator('#sayi-giris').fill('ab');
    await expect(page.locator('#sayi-giris')).toHaveValue('');
    await page.locator('#sayi-giris').press('Enter');
    await expect(page.locator('#durum')).toContainText('Önce gördüğünüz sayıyı yazın');
    await toPhase(page, 'input');

    await page.locator('#sayi-giris').fill(digits1);
    await page.locator('#sayi-giris').press('Enter');
    await expect(page.locator('#tur')).toHaveText('2');
    await toPhase(page, 'input');
    const digits2 = (await page.evaluate(() => (window as W).__digits!)).at(-1)!;
    expect(digits2).toMatch(/^\d{4}$/);
    expect(digits2).not.toBe(digits1);
    await expect(page.locator('#en-yuksek')).toHaveText('1');

    // yanlış: eksik hane
    await page.locator('#sayi-giris').fill(digits2.slice(0, 3));
    await page.locator('#sayi-gonder').click();
    await toPhase(page, 'over');
    await expect(page.locator('#sonuc-etiket')).toHaveText('Doğru sayı:');
    await expect(page.locator('#sayi-ekran')).toHaveText(digits2);
    await expect(page.locator('#sonuc-ozet')).toContainText('Tamamladığınız tur: 1');
    expect((await readStore(page)).best).toEqual({ renk: 0, sayi: 1 });

    // tekrar oyna → tur 1, yine 3 haneli sayı
    await page.locator('#baslat').click();
    await toPhase(page, 'input');
    expect((await page.evaluate(() => (window as W).__digits!)).at(-1)!).toMatch(/^\d{3}$/);
  });

  test('en yüksek tur mod başına ayrı gösterilir; mod değişince oyun sıfırlanır', async ({ page }) => {
    await page.addInitScript((k) => {
      if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ best: { renk: 7, sayi: 4 } }));
    }, STORE_KEY);
    await start(page);
    await expect(page.locator('#en-yuksek')).toHaveText('7');
    await toPhase(page, 'showing');
    await page.locator('#mod').selectOption('sayi');
    await toPhase(page, 'idle');
    await expect(page.locator('#en-yuksek')).toHaveText('4');
    await expect(page.locator('#tur')).toHaveText('0');
    await expect(page.locator('#mod-etiket')).toHaveText('Sayı dizisi');
    await page.locator('#mod').selectOption('renk');
    await expect(page.locator('#en-yuksek')).toHaveText('7');
  });

  test('ses düğmesi: açınca ses sistemi başlar, kapatınca durum güncellenir; sesle oyun hatasız oynanır', async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as W;
      w.__ac = 0;
      const AC = window.AudioContext;
      if (AC) {
        w.AudioContext = class extends AC {
          constructor(...args: ConstructorParameters<typeof AC>) {
            super(...args);
            w.__ac = (w.__ac || 0) + 1;
          }
        } as typeof AC;
      }
    });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await page.locator('#hiz').selectOption('cok-hizli');
    await observePads(page);
    await page.locator('#ses').click();
    await expect(page.locator('#ses')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#ses-durum')).toHaveText('açık');
    expect(await page.evaluate(() => (window as W).__ac)).toBe(1);
    await page.locator('#baslat').click();
    await repeatColorRound(page, 1);
    await expect(page.locator('#tur')).toHaveText('2');
    await page.locator('#ses').click();
    await expect(page.locator('#ses')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#ses-durum')).toHaveText('kapalı');
    expect(errors).toEqual([]);
  });

  test('360px: renk ve sayı modunda yatay taşma yok, padler sığar ve dokunmaya uygun boyutta', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await start(page);
    const taşma = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(await taşma()).toBeLessThanOrEqual(0);
    for (let i = 0; i < 4; i++) {
      const r = (await pad(page, i).boundingBox())!;
      expect(r.x).toBeGreaterThanOrEqual(0);
      expect(r.x + r.width).toBeLessThanOrEqual(360);
      expect(r.width).toBeGreaterThanOrEqual(80);
    }
    await toPhase(page, 'input');
    const [p] = await shownSequence(page, 1);
    await pad(page, (p + 1) % 4).click();
    await toPhase(page, 'over');
    expect(await taşma()).toBeLessThanOrEqual(0);
    // sayı modu
    await page.locator('#mod').selectOption('sayi');
    await observeDigits(page);
    await page.locator('#baslat').click();
    await toPhase(page, 'input');
    expect(await taşma()).toBeLessThanOrEqual(0);
    await page.locator('#sayi-giris').fill('1');
    await page.locator('#sayi-gonder').click();
    await toPhase(page, 'over');
    expect(await taşma()).toBeLessThanOrEqual(0);
  });

  test('içerik: ≥800 kelime, 3 reklam alanı doğru yerde, SSS ≥6 ve FAQPage, ilgili oyunlar', async ({ page }) => {
    await page.goto(URL_PATH);
    const kelime = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(kelime).toBeGreaterThanOrEqual(800);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-dizi-hafiza-a', 'oyun-dizi-hafiza-b', 'oyun-dizi-hafiza-c']);
    await expect(page.locator('#oyun .ba-ad')).toHaveCount(0);
    const aSonra = await page.evaluate(() => {
      const box = document.getElementById('oyun')!;
      const ad = document.querySelector('[data-slot="oyun-dizi-hafiza-a"]')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(aSonra).toBe(true);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(ld!)['@graph'];
    expect(graph.find((g: { '@type': string }) => g['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(graph.find((g: { '@type': string }) => g['@type'] === 'SoftwareApplication').applicationCategory).toBe('Game');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/dizi-hafiza/');
    await expect(page.locator('.ba-related a[href="../bilgi-yarismasi/"]')).toBeVisible();
    await expect(page.locator('.ba-badges')).toContainText('Kayıt yok');
  });
});
