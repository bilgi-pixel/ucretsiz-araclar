// Zar At — 1–6 zar; d4, d6, d8, d10, d12, d20; SVG zar yüzleri, sallama animasyonu, atış geçmişi ve yüz dağılım grafiği.
// Tamamen istemci tarafı; dış istek yok. localStorage yalnızca yüz sayaçlarını saklar (ba-oyun-zar-at).
// Saf mantık fonksiyonları dışa aktarılır (testler için); DOM kodu init() içindedir.

const STORE_KEY = 'ba-oyun-zar-at';
export const TYPES = [4, 6, 8, 10, 12, 20];
const ROLL_MS = 650; // sallama süresi (ms); hareket azaltma tercihinde 0
const FRAME_MS = 90; // sallarken yüz değişim aralığı (yalnızca görsel)
const HISTORY_MAX = 20;

// ---------- Rastgelelik ----------

/**
 * 0..n-1 aralığında eşit olasılıklı tamsayı üretir (zar değeri = randomInt(yüz sayısı) + 1).
 * Kaynak: crypto.getRandomValues. Modulo yanlılığını önlemek için 2^32'nin n'e tam bölünmeyen kuyruğundaki
 * değerler yeniden çekilir; döngü sınırlıdır (sabit değer veren bir test üretecinde sayfa asılı kalmaz).
 * Güvenli üreteç hiç yoksa (çok eski tarayıcı) yedek olarak Math.random kullanılır.
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

const toCount = (v) => {
  if (typeof v !== 'number' && typeof v !== 'string') return 0; // dizi/nesne/null: Number([1]) === 1 tuzağına düşme
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(n, 1e12) : 0;
};

export function emptyStats() {
  const faces = {};
  for (const t of TYPES) faces[t] = new Array(t).fill(0);
  return { throws: 0, faces };
}

/** localStorage'dan gelen herhangi bir değeri (bozuk JSON, dizi, yanlış tip) güvenli sayaç nesnesine çevirir. */
export function sanitizeStats(raw) {
  const s = emptyStats();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return s;
  s.throws = toCount(raw.throws);
  const f = raw.faces;
  if (f && typeof f === 'object' && !Array.isArray(f)) {
    for (const t of TYPES) {
      const arr = f[t];
      if (Array.isArray(arr) && arr.length === t) s.faces[t] = arr.map(toCount);
    }
  }
  return s;
}

export const sumOf = (values) => values.reduce((a, b) => a + b, 0);

/** Bir atışı (t yüzlü zarlar, values dizisi) sayaçlara işler. */
export function recordRoll(s, t, values) {
  s.throws++;
  for (const v of values) s.faces[t][v - 1]++;
}

/** Bir zar türünden toplam kaç zar atıldı. */
export const faceTotal = (s, t) => sumOf(s.faces[t]);

/** Bir zar türünün ortalama değeri; hiç atış yoksa 0 (NaN yok). */
export function faceMean(s, t) {
  const n = faceTotal(s, t);
  if (n === 0) return 0;
  let acc = 0;
  s.faces[t].forEach((c, i) => { acc += c * (i + 1); });
  return acc / n;
}

/** Yüzdeyi tek ondalıkla yuvarlar; toplam 0 ise 0 döner. */
export const percent = (n, total) => (total > 0 ? Math.round((n / total) * 1000) / 10 : 0);
export const fmtPercent = (p) => '%' + String(p).replace('.', ',');
/** 3.5 -> "3,5"; en çok iki ondalık. */
export const fmtNum = (x) => String(Math.round(x * 100) / 100).replace('.', ',');

// ---------- Zar çizimi (SVG) ----------

const NS = 'http://www.w3.org/2000/svg';
const PIPS = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 25], [72, 25], [28, 50], [72, 50], [28, 75], [72, 75]],
};

function pentagonPoints() {
  const pts = [];
  for (let k = 0; k < 5; k++) {
    const a = ((-90 + 72 * k) * Math.PI) / 180;
    pts.push(`${(50 + 46 * Math.cos(a)).toFixed(1)},${(53 + 46 * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}

// Çok yüzlü zarların siluetleri; y: sayının dikey konumu, fs: yazı boyutu.
const SHAPES = {
  4: { poly: '50,8 95,88 5,88', y: 66, fs: 34 },
  8: { poly: '50,4 94,50 50,96 6,50', y: 50, fs: 34 },
  10: { poly: '50,4 94,40 50,96 6,40', y: 48, fs: 32 },
  12: { poly: pentagonPoints(), y: 54, fs: 34 },
  20: { poly: '50,4 90,27 90,73 50,96 10,73 10,27', inner: '50,22 77,67 23,67', y: 52, fs: 28 },
};

function svgNode(name, attrs, cls) {
  const n = document.createElementNS(NS, name);
  for (const k of Object.keys(attrs)) n.setAttribute(k, String(attrs[k]));
  if (cls) n.setAttribute('class', cls);
  return n;
}

function numText(x, y, fs, text) {
  const t = svgNode('text', { x, y, 'font-size': fs, 'text-anchor': 'middle', dy: '.35em' }, 'za-num');
  t.textContent = text;
  return t;
}

/** Bir zarı (host içine) boyar; value null ise "?" gösterir. */
export function paintDie(host, t, value) {
  host.textContent = '';
  const svg = svgNode('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true', focusable: 'false' });
  if (t === 6) {
    svg.appendChild(svgNode('rect', { x: 6, y: 6, width: 88, height: 88, rx: 18 }, 'za-shape'));
    if (value) for (const [x, y] of PIPS[value]) svg.appendChild(svgNode('circle', { cx: x, cy: y, r: 8.5 }, 'za-pip'));
    else svg.appendChild(numText(50, 50, 46, '?'));
  } else {
    const sh = SHAPES[t];
    svg.appendChild(svgNode('polygon', { points: sh.poly }, 'za-shape'));
    if (sh.inner) svg.appendChild(svgNode('polygon', { points: sh.inner }, 'za-inner'));
    if (value) svg.appendChild(numText(50, sh.y, value >= 10 ? Math.round(sh.fs * 0.86) : sh.fs, String(value)));
    else svg.appendChild(numText(50, sh.y, sh.fs, '?'));
  }
  host.appendChild(svg);
}

// ---------- Arayüz ----------

function loadStats() {
  try { return sanitizeStats(JSON.parse(localStorage.getItem(STORE_KEY))); } catch { return emptyStats(); }
}

function init() {
  const $ = (id) => document.getElementById(id);
  const el = {
    box: $('oyun-kutusu'), type: $('za-type'), counts: $('za-counts'), stage: $('za-stage'), dice: $('za-dice'),
    result: $('za-result'), total: $('za-total'), values: $('za-values'), pair: $('za-pair'),
    roll: $('za-roll'), reset: $('za-reset'),
    throws: $('za-throws'), dtotalL: $('za-dtotal-l'), dtotal: $('za-dtotal'), meanL: $('za-mean-l'), mean: $('za-mean'), expected: $('za-expected'),
    chart: $('za-chart'), chartH: $('za-chart-h'), history: $('za-history'), historyEmpty: $('za-history-empty'),
  };
  const RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  // Tür ve sayı yalnızca oturum içindir (kalıcı değil); tarayıcı form durumunu geri yüklediyse seçimi oku.
  let type = TYPES.includes(Number(el.type.value)) ? Number(el.type.value) : 6;
  let count = 1;
  let dice = [];
  let stats = loadStats();
  let history = []; // son atışlar; yalnızca bellekte
  let pending = null; // devam eden sallama: { timer, ticker, reveal }

  function saveStats() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(stats)); } catch { /* özel gezinti vb. */ }
  }

  /** Devam eden sallamayı hemen bitirir (sonuç ve sayaçlar işlenir). Çifte sayım olmaz. */
  function flushPending() {
    if (!pending) return;
    const p = pending;
    pending = null;
    clearTimeout(p.timer);
    clearInterval(p.ticker);
    p.reveal();
  }

  function resetResult() {
    el.total.textContent = '–';
    el.values.textContent = '';
    el.pair.textContent = '';
    el.result.classList.remove('is-busy');
  }

  function buildDice() {
    el.dice.textContent = '';
    dice = [];
    for (let i = 0; i < count; i++) {
      const d = document.createElement('span');
      d.className = 'za-die';
      d.style.setProperty('--i', String(i));
      d.dataset.type = String(type);
      d.dataset.v = '';
      paintDie(d, type, null);
      el.dice.appendChild(d);
      dice.push(d);
    }
    el.dice.dataset.count = String(count);
  }

  function renderCounts() {
    for (const b of el.counts.querySelectorAll('button')) b.setAttribute('aria-pressed', String(Number(b.dataset.n) === count));
  }

  function renderStats() {
    const dt = faceTotal(stats, type);
    el.throws.textContent = String(stats.throws);
    el.dtotalL.textContent = `d${type} zar sayısı`;
    el.dtotal.textContent = String(dt);
    el.meanL.textContent = `d${type} ortalaması`;
    el.mean.textContent = dt > 0 ? fmtNum(faceMean(stats, type)) : '–';
    el.expected.textContent = `beklenen ${fmtNum((type + 1) / 2)}`;
    // Yüz dağılımı: seçili zar türü için her yüzün kaç kez geldiği (çubuklar en kalabalık yüze göre ölçeklenir).
    const arr = stats.faces[type];
    const max = Math.max(0, ...arr);
    el.chartH.textContent = `d${type}: her yüzün kaç kez geldiği`;
    el.chart.setAttribute('aria-label', `d${type} yüz dağılımı`);
    el.chart.dataset.sides = String(type);
    el.chart.style.setProperty('--rows', String(Math.ceil(type / 2)));
    el.chart.textContent = '';
    arr.forEach((c, i) => {
      const li = document.createElement('li');
      li.className = 'za-row';
      li.dataset.face = String(i + 1);
      li.dataset.count = String(c);
      const w = max > 0 ? (c / max) * 100 : 0;
      li.innerHTML = `<span class="za-n">${i + 1}</span><span class="za-track" aria-hidden="true"><span class="za-fill" style="width:${w}%"></span></span><span class="za-c">${c} kez · ${fmtPercent(percent(c, dt))}</span>`;
      el.chart.appendChild(li);
    });
    // Geçmiş (son 20 atış)
    el.history.textContent = '';
    for (const h of history) {
      const li = document.createElement('li');
      li.textContent = h.v.length > 1 ? `${h.v.length} × d${h.t}: ${h.v.join(' + ')} = ${h.s}` : `d${h.t}: ${h.s}`;
      el.history.appendChild(li);
    }
    el.historyEmpty.hidden = history.length > 0;
  }

  function setType(t) {
    flushPending();
    type = t;
    buildDice();
    resetResult();
    renderStats();
  }

  function setCount(n) {
    if (n === count) return;
    flushPending();
    count = n;
    buildDice();
    resetResult();
    renderCounts();
  }

  function commit(t, values) {
    recordRoll(stats, t, values);
    saveStats();
    const sum = sumOf(values);
    history.unshift({ t, v: values.slice(), s: sum });
    if (history.length > HISTORY_MAX) history.length = HISTORY_MAX;
    el.total.textContent = String(sum);
    el.values.textContent = values.length > 1 ? `${values.join(' + ')} = ${sum}` : `d${t} zarı: ${sum}`;
    if (values.length === 2 && values[0] === values[1]) el.pair.textContent = 'Çift geldi!';
    else if (values.length > 2 && values.every((v) => v === values[0])) el.pair.textContent = 'Hepsi aynı geldi!';
    else el.pair.textContent = '';
    renderStats();
  }

  function roll() {
    flushPending();
    const t = type;
    const values = dice.map(() => randomInt(t) + 1);
    const finish = () => {
      dice.forEach((d, i) => {
        paintDie(d, t, values[i]);
        d.dataset.v = String(values[i]);
        d.classList.remove('is-rolling');
      });
      commit(t, values);
      el.result.classList.remove('is-busy');
    };
    if (RM.matches) { finish(); return; }
    dice.forEach((d) => d.classList.add('is-rolling'));
    el.result.classList.add('is-busy');
    let frame = 0;
    const ticker = setInterval(() => {
      frame++;
      dice.forEach((d, i) => paintDie(d, t, ((frame * 3 + i * 5) % t) + 1)); // yalnızca görsel; sonuç belirli
    }, FRAME_MS);
    const timer = setTimeout(() => { pending = null; clearInterval(ticker); finish(); }, ROLL_MS);
    pending = { timer, ticker, reveal: finish };
  }

  el.type.addEventListener('change', () => setType(TYPES.includes(Number(el.type.value)) ? Number(el.type.value) : 6));
  el.counts.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('button[data-n]');
    if (b) setCount(Number(b.dataset.n));
  });
  el.roll.addEventListener('click', roll);
  el.stage.addEventListener('click', roll);
  el.reset.addEventListener('click', () => {
    flushPending();
    stats = emptyStats();
    history = [];
    saveStats();
    renderStats();
  });

  // Klavye: Boşluk / Enter ile at, 1–6 tuşlarıyla zar sayısı. Odak bir düğme, liste ya da bağlantıdaysa o öğenin kendi davranışı çalışır
  // (çifte tetik yok). Oyun kutusu ekranda değilse tuşlar sayfayı etkilemez.
  const boxVisible = () => {
    const r = el.box.getBoundingClientRect();
    return r.bottom > 0 && r.top < (window.innerHeight || document.documentElement.clientHeight);
  };
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    const inField = t && t.closest && t.closest('input, select, textarea, [contenteditable]');
    if (inField) return;
    if (/^[1-6]$/.test(e.key)) {
      if (!boxVisible()) return;
      setCount(Number(e.key));
      return;
    }
    if (e.key !== ' ' && e.key !== 'Enter') return;
    if (t && t.closest && t.closest('button, a, summary')) return;
    if (!boxVisible()) return;
    e.preventDefault();
    roll();
  });

  buildDice();
  resetResult();
  renderCounts();
  renderStats();
}

if (typeof document !== 'undefined' && document.getElementById('za-stage')) init();
