import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Başsız Chromium'da ses motorunun kullanıcı hareketi beklemeden başlayabilmesi için
test.use({ launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] } });

/** Her testte: pageerror topla, dış istekleri izle. */
function watch(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return { external, errors };
}

const bpm = (page: Page) => page.locator('#mt-bpm');

test.describe('Online Metronom', () => {
  test('sayfa yapısı: rozet, 3 reklam (araç kutusunda yok), SSS ≥ 7, ≥ 900 kelime, JSON-LD, dış istek yok', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.goto('/metronom/');
    await expect(page.locator('h1')).toContainText('Online Metronom');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('img[alt="Bilişim Ajans"]')).toBeVisible();
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="metronom-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent() as string);
    expect(ld['@type']).toBe('SoftwareApplication');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/metronom/');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/metronom/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('başlat: vuruş göstergesi sınıf değiştirir, ilk vuruş vurgulanır, durdurunca temizlenir', async ({ page }) => {
    const { external, errors } = watch(page);
    await page.goto('/metronom/');
    await bpm(page).fill('240');
    await bpm(page).dispatchEvent('change');
    // Nokta sınıf değişimlerini ve ışık sayacını say
    await page.evaluate(() => {
      const w = window as any;
      w.__classChanges = 0; w.__accentSeen = false; w.__beatTimes = [];
      const mo = new MutationObserver((list) => {
        for (const m of list) {
          if (m.attributeName === 'class') {
            w.__classChanges++;
            const el = m.target as HTMLElement;
            if (el.classList.contains('mt-dot') && el.classList.contains('is-active') && el.classList.contains('is-accent')) w.__accentSeen = true;
          }
          if (m.attributeName === 'data-beat') w.__beatTimes.push(performance.now());
        }
      });
      mo.observe(document.getElementById('mt-dots')!, { attributes: true, subtree: true });
      mo.observe(document.getElementById('mt-light')!, { attributes: true });
    });
    await page.locator('#mt-start').click();
    await expect(page.locator('#mt-start')).toHaveText('Durdur');
    await expect(page.locator('#mt-light')).toHaveAttribute('data-beat', /^[1-9]/, { timeout: 5000 });
    await expect.poll(() => page.evaluate(() => (window as any).__beatTimes.length), { timeout: 8000 }).toBeGreaterThanOrEqual(12);
    expect(await page.evaluate(() => (window as any).__classChanges)).toBeGreaterThanOrEqual(6);
    expect(await page.evaluate(() => (window as any).__accentSeen)).toBe(true);
    expect(await page.locator('#mt-dots .mt-dot.is-active').count()).toBe(1);
    // Ortalama vuruş aralığı 250 ms (240 BPM) civarında olmalı (rAF titreşimi ortalamada sönümlenir)
    const mean = await page.evaluate(() => {
      const t: number[] = (window as any).__beatTimes;
      return (t[t.length - 1] - t[0]) / (t.length - 1);
    });
    expect(mean).toBeGreaterThan(250 * 0.9);
    expect(mean).toBeLessThan(250 * 1.1);
    await page.locator('#mt-start').click();
    await expect(page.locator('#mt-start')).toHaveText('Başlat');
    await expect(page.locator('#mt-dots .is-active')).toHaveCount(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('zamanlama örnekleme hassasiyetinde: planlanan tıklar arası fark 60/BPM/alt bölüm', async ({ page }) => {
    // Ses düğümlerinin start(when) çağrıları kaydedilir; zamanlayıcı sapsa when değerleri eşit aralıklı olmazdı.
    await page.addInitScript(() => {
      const w = window as any;
      w.__starts = [];
      const orig = AudioBufferSourceNode.prototype.start;
      AudioBufferSourceNode.prototype.start = function (when?: number, ...rest: any[]) {
        w.__starts.push(when);
        return (orig as any).call(this, when, ...rest);
      };
    });
    await page.goto('/metronom/');
    await bpm(page).fill('120');
    await bpm(page).dispatchEvent('change');
    await page.locator('#mt-sub').selectOption('3'); // üçleme: her vuruş 3 tık
    await page.locator('#mt-start').click();
    await expect.poll(() => page.evaluate(() => (window as any).__starts.length), { timeout: 8000 }).toBeGreaterThanOrEqual(12);
    await page.locator('#mt-start').click();
    const starts: number[] = await page.evaluate(() => (window as any).__starts);
    const expected = 60 / 120 / 3;
    for (let i = 1; i < starts.length; i++) {
      expect(Math.abs(starts[i] - starts[i - 1] - expected)).toBeLessThan(0.0005);
    }
  });

  test('BPM artı/eksi, kaydırıcı, sınırlar ve geçersiz giriş', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto('/metronom/');
    await expect(bpm(page)).toHaveValue('120');
    await expect(page.locator('#mt-tempo')).toHaveText('Allegro');
    await page.locator('#mt-plus').click();
    await expect(bpm(page)).toHaveValue('121');
    await page.locator('#mt-minus').click();
    await page.locator('#mt-minus').click();
    await expect(bpm(page)).toHaveValue('119');
    await expect(page.locator('#mt-tempo')).toHaveText('Moderato');
    await page.locator('#mt-plus5').click();
    await expect(bpm(page)).toHaveValue('124');
    await page.locator('#mt-minus5').click();
    await expect(bpm(page)).toHaveValue('119');
    // Kaydırıcı
    await page.locator('#mt-slider').fill('90');
    await expect(bpm(page)).toHaveValue('90');
    await expect(page.locator('#mt-tempo')).toHaveText('Andante');
    await expect(page.locator('#mt-tempo-table tr[aria-current="true"]')).toHaveAttribute('data-name', 'Andante');
    // Üst ve alt sınır
    await bpm(page).fill('300'); await bpm(page).dispatchEvent('change');
    await page.locator('#mt-plus').click();
    await expect(bpm(page)).toHaveValue('300');
    await bpm(page).fill('30'); await bpm(page).dispatchEvent('change');
    await page.locator('#mt-minus5').click();
    await expect(bpm(page)).toHaveValue('30');
    // Geçersiz giriş: Türkçe, çözüm öneren hata
    await bpm(page).fill('500'); await bpm(page).dispatchEvent('change');
    await expect(page.locator('#error')).toContainText('30 ile 300 arasında olmalı');
    await expect(bpm(page)).toHaveValue('300');
    await bpm(page).fill(''); await bpm(page).dispatchEvent('change');
    await expect(page.locator('#error')).toContainText('geçersiz');
    await expect(bpm(page)).toHaveValue('300');
    expect(errors).toEqual([]);
  });

  test('tap tempo: 4 dokunuşta BPM hesaplanır, uzun ara ölçümü sıfırlar', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto('/metronom/');
    await page.evaluate(() => {
      const w = window as any;
      w.__taps = [];
      document.getElementById('mt-tap')!.addEventListener('click', () => w.__taps.push(performance.now()), true);
    });
    for (let i = 0; i < 4; i++) {
      await page.locator('#mt-tap').click();
      if (i < 3) await page.waitForTimeout(500);
    }
    const taps: number[] = await page.evaluate(() => (window as any).__taps);
    expect(taps.length).toBe(4);
    const expected = Math.round(60000 / ((taps[3] - taps[0]) / 3));
    const actual = Number(await bpm(page).inputValue());
    expect(Math.abs(actual - expected)).toBeLessThanOrEqual(1);
    // Dokunuşlar arası en az 500 ms beklendi (yüklü makinede daha uzun olabilir): BPM ≤ ~120 ve geçerli aralıkta olmalı
    expect(actual).toBeGreaterThanOrEqual(30);
    expect(actual).toBeLessThanOrEqual(121);
    await expect(page.locator('#mt-tap-info')).toContainText('4 dokunuştan hesaplandı');
    // 2 saniyeden uzun ara: yeni ölçüm, BPM değişmez
    await page.waitForTimeout(2100);
    await page.locator('#mt-tap').click();
    await expect(page.locator('#mt-tap-info')).toContainText('en az 2 dokunuş');
    expect(Number(await bpm(page).inputValue())).toBe(actual);
    expect(errors).toEqual([]);
  });

  test('ayarlar localStorage\'da saklanır; bozuk kayıt varsayılana döner', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto('/metronom/');
    await page.locator('#mt-plus5').click();
    await page.locator('#mt-plus').click();
    await page.locator('#mt-meter').selectOption('6/8');
    await page.locator('#mt-sub').selectOption('2');
    await page.locator('#mt-sound').selectOption('wood');
    await page.locator('#mt-accent').uncheck();
    await page.locator('#mt-visual').uncheck();
    await page.locator('#mt-volume').fill('35');
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-metronom')!));
    expect(saved).toMatchObject({ bpm: 126, meter: '6/8', sub: '2', sound: 'wood', volume: 35, accent: false, visual: false });
    await page.reload();
    await expect(bpm(page)).toHaveValue('126');
    await expect(page.locator('#mt-meter')).toHaveValue('6/8');
    await expect(page.locator('#mt-sub')).toHaveValue('2');
    await expect(page.locator('#mt-sound')).toHaveValue('wood');
    await expect(page.locator('#mt-volume')).toHaveValue('35');
    await expect(page.locator('#mt-accent')).not.toBeChecked();
    await expect(page.locator('#mt-light')).toHaveClass(/is-off/);
    await expect(page.locator('#mt-dots .mt-dot')).toHaveCount(6);
    await expect(page.locator('#mt-meter-note')).toBeVisible();
    // Bozuk kayıt
    await page.evaluate(() => localStorage.setItem('ba-metronom', '{bozuk'));
    await page.reload();
    await expect(bpm(page)).toHaveValue('120');
    await expect(page.locator('#mt-meter')).toHaveValue('4/4');
    expect(errors).toEqual([]);
  });

  test('ölçü değişince nokta sayısı güncellenir (2/4 … 7/8)', async ({ page }) => {
    await page.goto('/metronom/');
    const expected: Record<string, number> = { '2/4': 2, '3/4': 3, '4/4': 4, '5/4': 5, '6/8': 6, '7/8': 7 };
    for (const [m, n] of Object.entries(expected)) {
      await page.locator('#mt-meter').selectOption(m);
      await expect(page.locator('#mt-dots .mt-dot')).toHaveCount(n);
      // 6/8 ve 7/8'de "BPM sekizlik sayar" notu görünür, diğerlerinde gizlidir
      if (m.endsWith('/8')) await expect(page.locator('#mt-meter-note')).toBeVisible();
      else await expect(page.locator('#mt-meter-note')).toBeHidden();
    }
  });

  test('klavye: Boşluk başlat/durdur, oklar BPM, Shift ile 5\'er, düğme odaktayken çift tetiklenmez', async ({ page }) => {
    const { errors } = watch(page);
    await page.goto('/metronom/');
    // Araç ekranda değilken (sayfa metnini okurken) Boşluk kaydırma içindir; metronomu başlatmamalı
    await page.locator('.ba-faq').scrollIntoViewIfNeeded();
    await page.keyboard.press('Space');
    await page.waitForTimeout(200);
    await expect(page.locator('#mt-start')).toHaveAttribute('data-running', 'false');
    await page.locator('#mt-box').scrollIntoViewIfNeeded();
    await page.keyboard.press('Space');
    await expect(page.locator('#mt-start')).toHaveAttribute('data-running', 'true');
    await page.keyboard.press('Space');
    await expect(page.locator('#mt-start')).toHaveAttribute('data-running', 'false');
    await page.keyboard.press('ArrowUp');
    await expect(bpm(page)).toHaveValue('121');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(bpm(page)).toHaveValue('119');
    await page.keyboard.press('Shift+ArrowRight');
    await expect(bpm(page)).toHaveValue('124');
    await page.keyboard.press('ArrowLeft');
    await expect(bpm(page)).toHaveValue('123');
    // Düğmeye tıklayıp başlat, sonra odaktaki düğmede Boşluk: yalnızca bir kez tetiklenmeli
    await page.locator('#mt-start').click();
    await expect(page.locator('#mt-start')).toHaveAttribute('data-running', 'true');
    await page.keyboard.press('Space');
    await expect(page.locator('#mt-start')).toHaveAttribute('data-running', 'false');
    await page.waitForTimeout(200);
    await expect(page.locator('#mt-start')).toHaveAttribute('data-running', 'false');
    expect(errors).toEqual([]);
  });

  test('Web Audio yoksa Türkçe, çözüm öneren hata gösterilir', async ({ page }) => {
    await page.addInitScript(() => {
      delete (window as any).AudioContext;
      delete (window as any).webkitAudioContext;
    });
    await page.goto('/metronom/');
    await page.locator('#mt-start').click();
    await expect(page.locator('#error')).toContainText('desteklemiyor');
    await expect(page.locator('#error')).toContainText('güncel sürümünü');
    await expect(page.locator('#mt-start')).toHaveText('Başlat');
  });
});
