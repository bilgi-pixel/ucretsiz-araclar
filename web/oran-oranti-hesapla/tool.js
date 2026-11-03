// Oran Orantı Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Sayı biçimi ve ayrıştırma ---------- */
const nf = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
export const fmt = (v) => (Number.isFinite(v) ? nf.format(Math.abs(v) < 1e-9 ? 0 : v) : '—');

/** 1.250,50 / 1250,5 / 1250.5 / -3 biçimlerini sayıya çevirir; boşsa null. */
export function parseNumber(raw, label) {
  let s = String(raw ?? '').trim().replace(/\s/g, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 12,5). Harf ve sembolleri silip tekrar deneyin.`);
  let neg = false;
  if (/^[+-]/.test(s)) { neg = s[0] === '-'; s = s.slice(1); }
  if (/[+-]/.test(s) || !/\d/.test(s)) throw new Error(`${label} okunamadı. Eksi işareti yalnızca başta olabilir; örnek biçim: 12,5`);
  const lc = s.lastIndexOf(','); const ld = s.lastIndexOf('.');
  if (lc >= 0 && ld >= 0) s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lc >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (ld >= 0) {
    if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 12,5`);
  return neg ? -n : n;
}

/** Pozitif sayı bekleyen yardımcı. */
function pos(raw, label) {
  const n = parseNumber(raw, label);
  if (n === null) return null;
  if (!(n > 0)) throw new Error(`${label} sıfırdan büyük olmalı. Pozitif bir sayı yazın.`);
  return n;
}

/* ---------- Tarif satırı ayrıştırma: "2 su bardağı un", "1/2 çay kaşığı tuz", "1 1/2 kg" ---------- */
export function parseRecipeLine(line) {
  const m = line.match(/^\s*(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:[.,]\d+)?)\s*(.*)$/);
  if (!m) return null;
  let q;
  const t = m[1];
  if (/^\d+\s+\d+\/\d+$/.test(t)) { const [w, f] = t.split(/\s+/); const [n, d] = f.split('/').map(Number); q = Number(w) + n / d; }
  else if (t.includes('/')) { const [n, d] = t.split('/').map(Number); q = n / d; }
  else q = Number(t.replace(',', '.'));
  if (!Number.isFinite(q)) return null;
  return { qty: q, rest: m[2] };
}

/* ---------- Modlar ---------- */
const sel = (id, label, options) => ({ id, label, type: 'select', options });

export const MODES = {
  dogru: {
    name: 'Doğru orantı',
    formula: 'a / b = c / x  ⇒  x = (b × c) / a',
    fields: [{ id: 'a', label: 'a (birinci miktar)' }, { id: 'b', label: 'b (a\'ya karşılık gelen)' }, { id: 'c', label: 'c (ikinci miktar)' }],
    hint: 'Örn. 3 kg elma 4 ₺ ise 9 kg elma kaç ₺? → a=3, b=4, c=9.',
    calc: (v) => {
      if (v.a === 0) throw new Error('a sıfır olamaz; sıfıra bölünemez. a alanına sıfırdan farklı bir değer yazın.');
      const x = (v.b * v.c) / v.a;
      return { title: `${fmt(v.a)} / ${fmt(v.b)} = ${fmt(v.c)} / x`, rows: [['x', fmt(x)]], steps: [`Doğru orantıda oranlar eşittir: ${fmt(v.a)} / ${fmt(v.b)} = ${fmt(v.c)} / x`, 'İçler dışlar çarpımı: a × x = b × c', `x = (b × c) / a = (${fmt(v.b)} × ${fmt(v.c)}) / ${fmt(v.a)} = ${fmt(x)}`] };
    },
  },
  ters: {
    name: 'Ters orantı',
    formula: 'a × b = c × x  ⇒  x = (a × b) / c',
    fields: [{ id: 'a', label: 'a (birinci durumda miktar)' }, { id: 'b', label: 'b (birinci durumda karşılığı)' }, { id: 'c', label: 'c (ikinci durumda miktar)' }],
    hint: 'Örn. 6 işçi işi 12 günde bitiriyorsa 9 işçi kaç günde bitirir? → a=6, b=12, c=9.',
    calc: (v) => {
      if (v.c === 0) throw new Error('c sıfır olamaz; sıfır işçi/hız ile iş bitmez. c alanına sıfırdan farklı bir değer yazın.');
      const x = (v.a * v.b) / v.c;
      return { title: `Ters orantı: ${fmt(v.a)} → ${fmt(v.b)}, ${fmt(v.c)} → x`, rows: [['x', fmt(x)]], steps: ['Ters orantıda çarpımlar eşittir: a × b = c × x', `${fmt(v.a)} × ${fmt(v.b)} = ${fmt(v.c)} × x`, `x = (a × b) / c = ${fmt(v.a * v.b)} / ${fmt(v.c)} = ${fmt(x)}`] };
    },
  },
  bilesik: {
    name: 'Bileşik orantı',
    formula: 'y = y₀ × Π (yeni / eski)  (doğru faktör)  veya  × (eski / yeni)  (ters faktör)',
    fields: [
      { id: 'y0', label: 'Başlangıçtaki sonuç (örn. yapılan iş)' },
      ...[1, 2, 3].flatMap((i) => [
        sel(`t${i}`, `${i}. faktör türü`, [['dogru', 'Sonuçla doğru orantılı'], ['ters', 'Sonuçla ters orantılı']]),
        { id: `o${i}`, label: `${i}. faktör: eski değer`, opt: i > 1 },
        { id: `n${i}`, label: `${i}. faktör: yeni değer`, opt: i > 1 },
      ]),
    ],
    hint: 'Örn. 6 işçi 10 günde 120 m duvar örüyor; 9 işçi 15 günde kaç m örer? İşçi ve gün sonuçla doğru orantılıdır.',
    calc: (v) => {
      let y = v.y0; const steps = [`Başlangıç: y₀ = ${fmt(v.y0)}`]; const parts = [];
      for (const i of [1, 2, 3]) {
        const o = v[`o${i}`]; const n = v[`n${i}`];
        if (o == null && n == null) continue;
        if (o == null || n == null) throw new Error(`${i}. faktörde eski ve yeni değerin ikisini de yazın ya da ikisini de boş bırakın.`);
        const ters = v[`t${i}`] === 'ters';
        const ratio = ters ? o / n : n / o;
        y *= ratio; parts.push(ratio);
        steps.push(`${i}. faktör (${ters ? 'ters' : 'doğru'}): ${ters ? `${fmt(o)} / ${fmt(n)}` : `${fmt(n)} / ${fmt(o)}`} = ${fmt(ratio)} → çarpan`);
      }
      steps.push(`Sonuç = ${fmt(v.y0)} × ${parts.map(fmt).join(' × ')} = ${fmt(y)}`);
      return { title: 'Bileşik orantı', rows: [['Yeni sonuç', fmt(y)], ['Toplam çarpan', fmt(y / v.y0)]], steps };
    },
  },
  olcek: {
    name: 'Ölçek (harita / maket)',
    formula: 'Gerçek uzunluk = ölçülen uzunluk × N   (ölçek 1 : N)',
    fields: [
      { id: 'n', label: 'Ölçek paydası N (1 : N)' },
      { id: 'v', label: 'Uzunluk' },
      sel('u', 'Birim', [['mm', 'milimetre (mm)'], ['cm', 'santimetre (cm)'], ['m', 'metre (m)']]),
      sel('d', 'Yön', [['gercek', 'Haritadaki uzunluk → gerçek uzunluk'], ['harita', 'Gerçek uzunluk → haritadaki uzunluk']]),
    ],
    hint: 'Örn. 1:25000 haritada 4 cm → gerçekte 1 km. Gerçek → harita yönünde birimi "metre" gibi seçin.',
    calc: (v) => {
      const toM = { mm: 0.001, cm: 0.01, m: 1 }[v.u];
      if (v.d === 'gercek') {
        const real = v.v * toM * v.n; // metre
        return { title: `1 : ${fmt(v.n)} ölçek, haritada ${fmt(v.v)} ${v.u}`, rows: [['Gerçek mesafe', real >= 1000 ? `${fmt(real / 1000)} km` : `${fmt(real)} m`], ['Metre', `${fmt(real)} m`], ['Kilometre', `${fmt(real / 1000)} km`]], steps: [`Ölçek 1 : ${fmt(v.n)} demektir: haritadaki 1 birim gerçekte ${fmt(v.n)} birimdir.`, `Gerçek uzunluk = ${fmt(v.v)} ${v.u} × ${fmt(v.n)} = ${fmt(v.v * v.n)} ${v.u}`, `Metreye çevir: ${fmt(v.v * v.n)} ${v.u} = ${fmt(real)} m = ${fmt(real / 1000)} km`] };
      }
      const map = (v.v * toM) / v.n; // metre
      return { title: `1 : ${fmt(v.n)} ölçek, gerçekte ${fmt(v.v)} ${v.u}`, rows: [['Haritadaki uzunluk', `${fmt(map * 100)} cm`], ['Milimetre', `${fmt(map * 1000)} mm`]], steps: [`Haritadaki uzunluk = gerçek uzunluk / N = ${fmt(v.v)} ${v.u} / ${fmt(v.n)}`, `Metreye çevir: ${fmt(v.v * toM)} m / ${fmt(v.n)} = ${fmt(map)} m = ${fmt(map * 100)} cm`] };
    },
  },
  tarif: {
    name: 'Tarif ölçeklendirme',
    formula: 'Yeni miktar = eski miktar × (yeni kişi / eski kişi)',
    fields: [{ id: 'p0', label: 'Tarifin kaç kişilik olduğu' }, { id: 'p1', label: 'Kaç kişilik yapmak istiyorsunuz' }, { id: 'list', label: 'Malzeme listesi (her satıra bir malzeme)', type: 'textarea', ph: '2 su bardağı un\n1/2 çay kaşığı tuz\n1 1/2 kg domates\n3 yumurta' }],
    hint: 'Her satır bir sayıyla başlamalı. Kesir (1/2), karışık sayı (1 1/2) ve ondalık (0,5) yazabilirsiniz.',
    calc: (v) => {
      const k = v.p1 / v.p0;
      const lines = String(v.list).split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
      let found = 0; const rows = [];
      for (const ln of lines) {
        const p = parseRecipeLine(ln);
        if (!p) { rows.push([ln, `${ln} (sayı yok, aynen)`]); continue; }
        found++; rows.push([ln, `${fmt(Math.round(p.qty * k * 100) / 100)} ${p.rest}`.trim()]);
      }
      if (!found) throw new Error('Hiçbir satırda sayı bulunamadı. Her satırı "2 su bardağı un" gibi bir miktarla başlatın.');
      return { title: `${fmt(v.p0)} kişilik tarif → ${fmt(v.p1)} kişilik`, rows, steps: [`Çarpan = yeni kişi / eski kişi = ${fmt(v.p1)} / ${fmt(v.p0)} = ${fmt(k)}`, 'Her satırdaki miktar bu çarpanla çarpıldı; sonuç 2 ondalığa yuvarlandı.', 'Tuz, baharat, kabartma tozu gibi malzemeleri tadarak ayarlayın; ölçek büyüdükçe pişirme süresi ve kap boyutu da değişebilir.'] };
    },
  },
  karisim: {
    name: 'Karışım / çözelti yüzdesi',
    formula: 'Yeni yüzde = (m₁·c₁ + m₂·c₂) / (m₁ + m₂)',
    fields: [{ id: 'm1', label: '1. çözelti miktarı' }, { id: 'c1', label: '1. çözelti yüzdesi (%)', zero: true }, { id: 'm2', label: '2. çözelti miktarı' }, { id: 'c2', label: '2. çözelti yüzdesi (%)', zero: true }],
    hint: 'Örn. %20\'lik 3 L tuzlu su ile %50\'lik 2 L tuzlu suyu karıştırırsanız. Saf su için yüzde 0 yazın.',
    calc: (v) => {
      for (const k of ['c1', 'c2']) if (v[k] < 0 || v[k] > 100) throw new Error('Yüzde değerleri 0 ile 100 arasında olmalı. Oranı % olarak yazın (örn. 20).');
      const total = v.m1 + v.m2; const pure = v.m1 * v.c1 / 100 + v.m2 * v.c2 / 100; const pct = (pure / total) * 100;
      return { title: 'Karışımın yüzdesi', rows: [['Yeni yüzde', `%${fmt(pct)}`], ['Toplam miktar', fmt(total)], ['Saf madde', fmt(pure)]], steps: [`Saf madde 1 = ${fmt(v.m1)} × ${fmt(v.c1)}/100 = ${fmt(v.m1 * v.c1 / 100)}`, `Saf madde 2 = ${fmt(v.m2)} × ${fmt(v.c2)}/100 = ${fmt(v.m2 * v.c2 / 100)}`, `Toplam saf madde = ${fmt(pure)}, toplam karışım = ${fmt(total)}`, `Yüzde = ${fmt(pure)} / ${fmt(total)} × 100 = %${fmt(pct)}`] };
    },
  },
  hedef: {
    name: 'Hedef yüzdeye ulaşmak için karışım',
    formula: 'm₁ = T × (h − c₂) / (c₁ − c₂),  m₂ = T − m₁',
    fields: [{ id: 'c1', label: '1. çözelti yüzdesi (%)', zero: true }, { id: 'c2', label: '2. çözelti yüzdesi (%)', zero: true }, { id: 'h', label: 'Hedef yüzde (%)', zero: true }, { id: 't', label: 'İstenen toplam miktar' }],
    hint: 'Örn. %10\'luk ve %40\'lık çözeltiden %25\'lik 6 litre hazırlamak için her birinden ne kadar gerekir?',
    calc: (v) => {
      for (const k of ['c1', 'c2', 'h']) if (v[k] < 0 || v[k] > 100) throw new Error('Yüzde değerleri 0 ile 100 arasında olmalı. Oranı % olarak yazın (örn. 25).');
      if (v.c1 === v.c2) throw new Error('İki çözeltinin yüzdesi aynı olamaz; karıştırınca hedef değişmez. Farklı iki yüzde yazın.');
      const lo = Math.min(v.c1, v.c2); const hi = Math.max(v.c1, v.c2);
      if (v.h < lo || v.h > hi) throw new Error(`Hedef yüzde, iki çözeltinin yüzdesi arasında (%${fmt(lo)} ile %${fmt(hi)}) olmalı. Daha yoğun ya da daha seyreltik bir çözelti ekleyin.`);
      const m1 = (v.t * (v.h - v.c2)) / (v.c1 - v.c2); const m2 = v.t - m1;
      return { title: `%${fmt(v.h)} hedefli karışım`, rows: [['1. çözeltiden', fmt(m1)], ['2. çözeltiden', fmt(m2)]], steps: [`m₁ = T × (h − c₂) / (c₁ − c₂) = ${fmt(v.t)} × (${fmt(v.h)} − ${fmt(v.c2)}) / (${fmt(v.c1)} − ${fmt(v.c2)}) = ${fmt(m1)}`, `m₂ = T − m₁ = ${fmt(v.t)} − ${fmt(m1)} = ${fmt(m2)}`, `Doğrulama: (${fmt(m1)} × ${fmt(v.c1)} + ${fmt(m2)} × ${fmt(v.c2)}) / ${fmt(v.t)} = %${fmt((m1 * v.c1 + m2 * v.c2) / v.t)}`] };
    },
  },
};

/** Saf hesap: mod ve ham değerler → sonuç. Boş zorunlu alan varsa null. */
export function compute(modeKey, raw) {
  const m = MODES[modeKey];
  const v = {};
  for (const f of m.fields) {
    if (f.type === 'select') { v[f.id] = raw[f.id] ?? f.options[0][0]; continue; }
    if (f.type === 'textarea') { if (!String(raw[f.id] ?? '').trim()) { return null; } v[f.id] = raw[f.id]; continue; }
    const needPos = ['n', 'v', 'm1', 'm2', 't', 'p0', 'p1'].includes(f.id) || (modeKey === 'bilesik' && /^[on]\d$/.test(f.id));
    const n = needPos ? pos(raw[f.id], f.label) : parseNumber(raw[f.id], f.label);
    if (n === null) { if (f.opt) { v[f.id] = null; continue; } return null; }
    v[f.id] = n;
  }
  const r = m.calc(v);
  return { ...r, formula: m.formula };
}

/* ---------- Arayüz ---------- */
if (typeof document !== 'undefined' && $('mode')) {
  const modeSel = $('mode'); const box = $('fields');
  for (const [k, m] of Object.entries(MODES)) modeSel.append(new Option(m.name, k));
  let lastText = '';

  function buildFields() {
    const m = MODES[modeSel.value];
    box.replaceChildren();
    for (const f of m.fields) {
      const wrap = document.createElement('div'); wrap.className = 'ba-field' + (f.type === 'textarea' ? ' or-wide' : '');
      const lb = document.createElement('label'); lb.htmlFor = `f-${f.id}`; lb.textContent = f.label;
      let inp;
      if (f.type === 'select') { inp = document.createElement('select'); f.options.forEach(([val, txt]) => inp.append(new Option(txt, val))); }
      else if (f.type === 'textarea') { inp = document.createElement('textarea'); inp.rows = 5; inp.placeholder = f.ph || ''; }
      else { inp = document.createElement('input'); inp.type = 'text'; inp.inputMode = 'decimal'; inp.autocomplete = 'off'; inp.placeholder = f.opt ? 'boş bırakılabilir' : 'örn. 12,5'; }
      inp.id = `f-${f.id}`;
      inp.addEventListener('input', update); inp.addEventListener('change', update);
      wrap.append(lb, inp); box.append(wrap);
    }
    $('mode-hint').textContent = m.hint;
    $('formula').textContent = m.formula;
  }

  function update() {
    $('copy-status').textContent = '';
    const raw = {}; MODES[modeSel.value].fields.forEach((f) => { raw[f.id] = $(`f-${f.id}`).value; });
    try {
      const r = compute(modeSel.value, raw);
      showError($('error'), '');
      if (!r) { $('result').classList.remove('is-active'); lastText = ''; return; }
      $('r-title').textContent = r.title;
      const rows = $('r-rows'); rows.replaceChildren();
      r.rows.forEach(([k, val], i) => {
        const row = document.createElement('div'); row.className = 'or-row' + (i === 0 ? ' is-strong' : '');
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = val;
        row.append(dt, dd); rows.append(row);
      });
      const ol = $('steps'); ol.replaceChildren();
      r.steps.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ol.append(li); });
      lastText = `${r.title}\n${r.rows.map(([k, val]) => `${k}: ${val}`).join('\n')}\nFormül: ${r.formula}\n${r.steps.join('\n')}`;
      $('result').classList.add('is-active');
    } catch (e) {
      $('result').classList.remove('is-active'); lastText = '';
      showError($('error'), e.message);
    }
  }

  modeSel.addEventListener('change', () => { buildFields(); update(); });
  $('copy').addEventListener('click', async () => {
    if (!lastText) { $('copy-status').textContent = 'Kopyalanacak sonuç yok; önce değerleri girin.'; return; }
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
  $('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  buildFields();
}
