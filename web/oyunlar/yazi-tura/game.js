// Yazı Tura — 1–6 para, CSS 3D çevirme, 10/100 toplu atış, istatistik ve seri sayacı.
// Tamamen istemci tarafı; dış istek yok. localStorage yalnızca sayaçları saklar (ba-oyun-yazi-tura).
// Saf mantık fonksiyonları dışa aktarılır (testler için); DOM kodu init() içindedir.

const STORE_KEY = 'ba-oyun-yazi-tura';
const SPIN_MS = 1100; // çevirme animasyonu süresi (ms); hareket azaltma tercihinde 0
const RECENT_MAX = 20; // "son atışlar" şeridinde tutulan sonuç sayısı (yalnızca bellekte)
const COIN_NAMES = ['Yazı', 'Tura']; // 0 = yazı, 1 = tura

// ---------- Rastgelelik ----------

/**
 * 0..n-1 aralığında eşit olasılıklı tamsayı üretir.
 * Kaynak: crypto.getRandomValues (güvenli üreteç). Modulo yanlılığını önlemek için
 * 2^32'nin n'e tam bölünmeyen kuyruğundaki değerler yeniden çekilir. Döngü sınırlıdır; böylece
 * sabit değer döndüren bir üreteçte (testler) sayfa asılı kalmaz.
 * Güvenli üreteç hiç yoksa (çok eski tarayıcı) yedek olarak Math.random kullanılır.
 * Eşleme: para için 0 = yazı, 1 = tura.
 */
export function randomInt(n) {
  const c = globalThis.crypto;
  if (!c || typeof c.getRandomValues !== 'function') return Math.floor(Math.random() * n);
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / n) * n;
  for (let i = 0; i < 64; i++) {
    c.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % n;
  }
  return buf[0] % n;
}

// ---------- Sayaçlar (saf mantık) ----------

export function emptyStats() {
  // side: son serinin yüzü (0 yazı, 1 tura, -1 yok); run: geçerli seri; best: en uzun seri
  return { total: 0, yazi: 0, tura: 0, side: -1, run: 0, best: 0 };
}

const toCount = (v) => {
  if (typeof v !== 'number' && typeof v !== 'string') return 0; // dizi/nesne/null: Number([1]) === 1 tuzağına düşme
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(n, 1e12) : 0;
};

/** localStorage'dan gelen herhangi bir değeri (bozuk JSON, dizi, yanlış tip) güvenli sayaç nesnesine çevirir. */
export function sanitizeStats(raw) {
  const s = emptyStats();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return s;
  s.yazi = toCount(raw.yazi);
  s.tura = toCount(raw.tura);
  s.total = s.yazi + s.tura;
  s.side = raw.side === 0 || raw.side === 1 ? raw.side : -1;
  s.run = toCount(raw.run);
  if (s.side === -1 || s.run > s.total) { s.side = -1; s.run = 0; }
  s.best = Math.min(Math.max(toCount(raw.best), s.run), s.total);
  return s;
}

/** Tek bir sonucu (0 yazı, 1 tura) sayaçlara işler. */
export function addResult(s, r) {
  s.total++;
  if (r === 0) s.yazi++; else s.tura++;
  if (s.side === r) s.run++; else { s.side = r; s.run = 1; }
  if (s.run > s.best) s.best = s.run;
}

/** Yüzdeyi tek ondalıkla yuvarlar; toplam 0 ise 0 döner (NaN yok). */
export function percent(n, total) {
  return total > 0 ? Math.round((n / total) * 1000) / 10 : 0;
}

/** 52.5 -> "%52,5"; 50 -> "%50" */
export function fmtPercent(p) {
  return '%' + String(p).replace('.', ',');
}

/** Bir sonuç dizisindeki en uzun aynı-yüz serisi ve yüzü. */
export function longestRun(results) {
  let best = 0; let side = -1; let run = 0; let prev = -1;
  for (const r of results) {
    run = r === prev ? run + 1 : 1;
    prev = r;
    if (run > best) { best = run; side = r; }
  }
  return { length: best, side };
}

// ---------- Arayüz ----------

function loadStats() {
  try { return sanitizeStats(JSON.parse(localStorage.getItem(STORE_KEY))); } catch { return emptyStats(); }
}

function init() {
  const $ = (id) => document.getElementById(id);
  const el = {
    box: $('oyun-kutusu'), count: $('yt-count'), stage: $('yt-stage'), coins: $('yt-coins'),
    result: $('yt-result'), main: $('yt-main'), detail: $('yt-detail'), note: $('yt-note'),
    flip: $('yt-flip'), flip10: $('yt-flip10'), flip100: $('yt-flip100'), copy: $('yt-copy'), reset: $('yt-reset'),
    total: $('yt-total'), yazi: $('yt-yazi'), yaziP: $('yt-yazi-p'), tura: $('yt-tura'), turaP: $('yt-tura-p'),
    run: $('yt-run'), best: $('yt-best'), bar: $('yt-bar'), barY: $('yt-bar-y'), barT: $('yt-bar-t'),
    recent: $('yt-recent'), recentEmpty: $('yt-recent-empty'),
  };
  const RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  let stats = loadStats();
  let recent = []; // son atışlar (0/1), yalnızca bellekte
  let coins = [];
  let pending = null; // devam eden animasyon: { timer, reveal }
  let lastText = '';
  let noteTimer = 0;

  function saveStats() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(stats)); } catch { /* özel gezinti vb. */ }
  }

  function say(text) {
    el.note.textContent = text;
    clearTimeout(noteTimer);
    if (text) noteTimer = setTimeout(() => { el.note.textContent = ''; }, 4000);
  }

  /** Devam eden çevirmeyi hemen bitirir (sonuç ve sayaçlar işlenir). Çifte sayım olmaz. */
  function flushPending() {
    if (!pending) return;
    const p = pending;
    pending = null;
    clearTimeout(p.timer);
    p.reveal();
  }

  function buildCoins(k) {
    flushPending();
    el.coins.textContent = '';
    coins = [];
    for (let i = 0; i < k; i++) {
      const c = document.createElement('span');
      c.className = 'yt-coin';
      c.innerHTML = '<span class="yt-coin-inner"><span class="yt-face yt-front"><span class="yt-orn" aria-hidden="true">✦ ✦ ✦</span><span class="yt-label">Yazı</span></span>'
        + '<span class="yt-face yt-back"><span class="yt-orn" aria-hidden="true">★</span><span class="yt-label">Tura</span></span></span>';
      el.coins.appendChild(c);
      coins.push({ el: c, inner: c.firstChild, angle: 0 });
    }
    el.stage.dataset.count = String(k);
  }

  /** Parayı hedef yüze doğru döndürür; açı hep artar (ters yöne dönmez). */
  function spinTo(coin, r, i) {
    const spins = 4 + (i % 3); // süsleme: her para farklı sayıda tur atar
    const base = Math.ceil(coin.angle / 360) * 360;
    coin.angle = base + spins * 360 + (r === 1 ? 180 : 0);
    coin.inner.style.transform = `rotateY(${coin.angle}deg)`;
    coin.el.classList.remove('is-tossing');
    void coin.el.offsetWidth; // animasyonu yeniden başlat
    coin.el.classList.add('is-tossing');
  }

  function render() {
    const { total, yazi, tura } = stats;
    el.total.textContent = String(total);
    el.yazi.textContent = String(yazi);
    el.tura.textContent = String(tura);
    const py = percent(yazi, total);
    const pt = percent(tura, total);
    el.yaziP.textContent = fmtPercent(py);
    el.turaP.textContent = fmtPercent(pt);
    el.run.textContent = stats.run > 0 ? `${stats.run} × ${COIN_NAMES[stats.side]}` : '–';
    el.best.textContent = String(stats.best);
    el.barY.style.width = (total > 0 ? (yazi / total) * 100 : 0) + '%';
    el.barT.style.width = (total > 0 ? (tura / total) * 100 : 0) + '%';
    el.bar.setAttribute('aria-label', total > 0 ? `Dağılım: yazı ${fmtPercent(py)}, tura ${fmtPercent(pt)}` : 'Dağılım: henüz atış yok');
    el.recent.textContent = '';
    for (const r of recent) {
      const li = document.createElement('li');
      li.className = r === 0 ? 'yt-chip yt-y' : 'yt-chip yt-t';
      li.innerHTML = `<span aria-hidden="true">${r === 0 ? 'Y' : 'T'}</span><span class="visually-hidden">${COIN_NAMES[r]}</span>`;
      el.recent.appendChild(li);
    }
    el.recentEmpty.hidden = recent.length > 0;
  }

  function addAll(results) {
    for (const r of results) {
      addResult(stats, r);
      recent.push(r);
    }
    while (recent.length > RECENT_MAX) recent.shift();
    saveStats();
    render();
  }

  function showResult(main, detail, copyText) {
    el.main.textContent = main;
    el.detail.textContent = detail;
    lastText = copyText;
    el.copy.disabled = false;
  }

  /** Aynı anda birden çok para at (para sayısı kadar). */
  function flip() {
    flushPending();
    const results = coins.map(() => randomInt(2));
    coins.forEach((c, i) => spinTo(c, results[i], i));
    const reveal = () => {
      coins.forEach((c, i) => {
        c.el.dataset.result = results[i] === 0 ? 'yazi' : 'tura';
        c.el.classList.remove('is-tossing');
      });
      el.result.classList.remove('is-busy');
      addAll(results);
      if (results.length === 1) {
        showResult(`${COIN_NAMES[results[0]]} geldi`, '', `Yazı tura sonucu: ${COIN_NAMES[results[0]]}`);
      } else {
        const y = results.filter((r) => r === 0).length;
        const names = results.map((r) => COIN_NAMES[r]).join(' · ');
        showResult(`${y} yazı, ${results.length - y} tura`, names, `Yazı tura sonucu: ${y} yazı, ${results.length - y} tura (${names})`);
      }
    };
    if (RM.matches) { reveal(); return; }
    el.result.classList.add('is-busy');
    pending = { reveal, timer: setTimeout(() => { pending = null; reveal(); }, SPIN_MS) };
  }

  /** Toplu atış: n bağımsız tek para atışı; animasyon yok, sonuçlar anında işlenir. */
  function flipMany(n) {
    flushPending();
    const results = Array.from({ length: n }, () => randomInt(2));
    addAll(results);
    const y = results.filter((r) => r === 0).length;
    const t = n - y;
    const lr = longestRun(results);
    showResult(
      `${n} atış: ${y} yazı, ${t} tura`,
      `Bu toplu atışta en uzun seri: ${lr.length} × ${COIN_NAMES[lr.side]}`,
      `Yazı tura – ${n} atış: ${y} yazı (${fmtPercent(percent(y, n))}), ${t} tura (${fmtPercent(percent(t, n))}); en uzun seri ${lr.length} × ${COIN_NAMES[lr.side]}`,
    );
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* yedek yola geç */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch { return false; }
  }

  el.count.addEventListener('change', () => buildCoins(Number(el.count.value) || 1));
  el.flip.addEventListener('click', flip);
  el.flip10.addEventListener('click', () => flipMany(10));
  el.flip100.addEventListener('click', () => flipMany(100));
  el.stage.addEventListener('click', flip);
  el.copy.addEventListener('click', async () => {
    if (!lastText) return;
    say((await copyText(lastText)) ? 'Sonuç kopyalandı.' : 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.');
  });
  el.reset.addEventListener('click', () => {
    flushPending();
    stats = emptyStats();
    recent = [];
    saveStats();
    render();
    say('İstatistikler sıfırlandı.');
  });

  // Klavye: Boşluk / Enter ile at. Odak bir düğme, liste ya da bağlantıdaysa o öğenin kendi davranışı çalışır (çifte tetik yok).
  // Oyun kutusu ekranda değilse Boşluk sayfayı kaydırmaya devam eder.
  const boxVisible = () => {
    const r = el.box.getBoundingClientRect();
    return r.bottom > 0 && r.top < (window.innerHeight || document.documentElement.clientHeight);
  };
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key !== ' ' && e.key !== 'Enter') return;
    const t = e.target;
    if (t && t.closest && t.closest('button, a, input, select, textarea, summary, [contenteditable]')) return;
    if (!boxVisible()) return;
    e.preventDefault();
    flip();
  });

  buildCoins(Number(el.count.value) || 1);
  render();
}

if (typeof document !== 'undefined' && document.getElementById('yt-stage')) init();
