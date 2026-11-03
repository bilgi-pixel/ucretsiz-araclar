// JSON Biçimlendir ve Doğrula — saf JS, kütüphane yok. Metin tarayıcıdan çıkmaz.
import { createDropzone, showError, formatBytes, downloadBlob, baseName } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const WARN_SIZE = 5 * 1024 * 1024;     // bu boyutun üstünde "yavaşlayabilir" uyarısı
const BIG_FILE = 50 * 1024 * 1024;     // bu boyutun üstünde güçlü uyarı
const TREE_CHUNK = 500;                // ağaçta bir düğümde tek seferde gösterilen çocuk sayısı

const input = $('input');
const output = $('output');
let fileBase = 'veri';
let outKind = 'json';                  // son çıktının türü: json | csv | ts

/* ---------- Konum yardımcıları ---------- */
function lineCol(text, pos) {
  let line = 1, last = -1;
  for (let i = text.indexOf('\n'); i !== -1 && i < pos; i = text.indexOf('\n', i + 1)) { line++; last = i; }
  return { line, col: pos - last };
}

/**
 * JSON.parse hata verdiğinde hatanın yerini ve Türkçe açıklamasını bulan katı ayrıştırıcı.
 * Tarayıcıdan tarayıcıya değişen İngilizce mesajlara güvenmemek için kendi kuralımızı kullanırız.
 */
function diagnose(src) {
  let i = 0;
  const n = src.length;
  const fail = (pos, msg) => { throw { pos, msg }; };
  const show = (c) => (c === undefined ? 'metnin sonu' : c === '\n' ? 'satır sonu' : `"${c}"`);
  const ws = () => { while (i < n && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n' || src[i] === '\r')) i++; };

  function str() {
    const start = i;
    i++; // açılış tırnağı
    while (i < n) {
      const c = src[i];
      if (c === '"') { i++; return; }
      if (c < ' ') fail(i, 'Metin içinde gerçek satır sonu ya da denetim karakteri var. Satır sonu için \\n yazın ya da metni tek satırda tutun.');
      if (c === '\\') {
        const e = src[i + 1];
        if (e === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(src.slice(i + 2, i + 6))) fail(i, '\\u kaçışından sonra 4 onaltılık rakam gelmeli (örnek: \\u00e7).');
          i += 6; continue;
        }
        if (e === undefined || !'"\\/bfnrt'.includes(e)) fail(i, `Geçersiz kaçış dizisi "\\${e === undefined ? '' : e}". Ters bölüyü çift yazın (\\\\) ya da kaçış karakterini silin.`);
        i += 2; continue;
      }
      i++;
    }
    fail(start, 'Metnin kapanış tırnağı eksik. Açılan çift tırnak kapatılmamış.');
  }

  function value() {
    ws();
    const c = src[i];
    if (c === undefined) fail(i, 'Bir değer bekleniyordu ama metin bitti. Eksik bir değer ya da kapatılmamış parantez olabilir.');
    if (c === '{') return obj();
    if (c === '[') return arr();
    if (c === '"') return str();
    if (c === "'") fail(i, "Tek tırnak kullanılmış. JSON'da metinler ve anahtarlar çift tırnak (\") içinde yazılmalıdır.");
    if (c === '/') fail(i, "JSON'da yorum satırı kullanılamaz. // ve /* */ ifadelerini silin.");
    for (const lit of ['true', 'false', 'null']) {
      if (src.startsWith(lit, i)) { i += lit.length; return; }
    }
    if (c === '-' || (c >= '0' && c <= '9')) {
      const re = /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/y;
      re.lastIndex = i;
      const m = re.exec(src);
      if (!m) fail(i, 'Geçersiz sayı. Eksi işaretinden sonra rakam gelmeli; ondalık için nokta kullanın (3.14).');
      const next = src[i + m[0].length];
      if (next !== undefined && next >= '0' && next <= '9') fail(i, 'Sayı sıfırla başlayamaz (örnek: 007 yerine 7 yazın ya da metin olarak "007" yazın).');
      if (next === '.') fail(i + m[0].length, 'Noktadan sonra rakam gelmeli (örnek: 5.0).');
      i += m[0].length; return;
    }
    const word = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 40));
    if (word) fail(i, `Tanınmayan değer "${word[0]}". Metinler çift tırnak içinde olmalı; yalnızca true, false ve null tırnaksız yazılır (undefined ve NaN geçersizdir).`);
    fail(i, `Beklenmeyen karakter ${show(c)}. Bu konumda bir değer (metin, sayı, nesne, dizi, true, false, null) olmalı.`);
  }

  function obj() {
    i++; ws();
    if (src[i] === '}') { i++; return; }
    for (;;) {
      ws();
      const c = src[i];
      if (c !== '"') {
        if (c === '}') fail(i, 'Son özellikten sonra fazladan virgül var. Kapanış } işaretinden önceki virgülü silin.');
        if (c === "'") fail(i, "Anahtar tek tırnakla yazılmış. JSON'da anahtarlar çift tırnak içinde olmalıdır.");
        fail(i, `Anahtar çift tırnak içinde yazılmalı, bulunan ${show(c)}. Tırnaksız anahtarlara JSON izin vermez.`);
      }
      str(); ws();
      if (src[i] !== ':') fail(i, `Anahtardan sonra iki nokta (:) bekleniyordu, bulunan ${show(src[i])}.`);
      i++; value(); ws();
      const d = src[i];
      if (d === ',') { i++; continue; }
      if (d === '}') { i++; return; }
      fail(i, `Virgül ya da } bekleniyordu, bulunan ${show(d)}. İki özellik arasında virgül unutulmuş ya da süslü parantez kapatılmamış olabilir.`);
    }
  }

  function arr() {
    i++; ws();
    if (src[i] === ']') { i++; return; }
    for (;;) {
      ws();
      if (src[i] === ']') fail(i, 'Son öğeden sonra fazladan virgül var. Kapanış ] işaretinden önceki virgülü silin.');
      value(); ws();
      const d = src[i];
      if (d === ',') { i++; continue; }
      if (d === ']') { i++; return; }
      fail(i, `Virgül ya da ] bekleniyordu, bulunan ${show(d)}. İki öğe arasında virgül unutulmuş ya da köşeli parantez kapatılmamış olabilir.`);
    }
  }

  try {
    value(); ws();
    if (i < n) fail(i, `Değerden sonra fazladan içerik var (${show(src[i])}). Dosyada tek bir kök değer olmalı; birden çok nesne varsa bir dizinin içine alın.`);
  } catch (e) {
    if (e && typeof e.pos === 'number') return e;
    return null;
  }
  return null;
}

/** Girdiyi ayrıştırır; hata durumunda ekranda gösterir ve imleci hatalı yere götürür. */
function parseInput() {
  let text = input.value;
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  if (!text.trim()) {
    showError($('error'), 'Girdi boş. JSON metnini kutuya yapıştırın ya da bir .json dosyası bırakın.');
    return { ok: false };
  }
  try {
    const data = JSON.parse(text);
    showError($('error'), '');
    return { ok: true, data, text };
  } catch (err) {
    const d = diagnose(text);
    if (d) {
      const { line, col } = lineCol(text, d.pos);
      showError($('error'), `Satır ${line}, sütun ${col}: ${d.msg}`);
      goToError(d.pos);
    } else {
      showError($('error'), 'Geçerli bir JSON değil ya da yapı çok derin. Metnin başını ve sonunu kontrol edip parantezlerin eşleştiğinden emin olun.');
    }
    $('result').classList.remove('is-active');
    return { ok: false };
  }
}

function goToError(pos) {
  const { line } = lineCol(input.value, pos);
  input.focus();
  input.setSelectionRange(pos, Math.min(pos + 1, input.value.length));
  const lh = parseFloat(getComputedStyle(input).lineHeight) || 20;
  input.scrollTop = Math.max(0, (line - 1) * lh - input.clientHeight / 2);
}

/* ---------- Çıktı ---------- */
function indentValue() {
  const v = $('opt-indent').value;
  return v === 'tab' ? '\t' : Number(v);
}

function setOutput(text, kind, info) {
  output.value = text;
  outKind = kind;
  $('tree').hidden = true;
  $('tree').textContent = '';
  output.hidden = false;
  $('out-label').textContent = kind === 'json' ? 'Çıktı (JSON)' : kind === 'csv' ? 'Çıktı (CSV)' : 'Çıktı (TypeScript)';
  $('result-info').textContent = info;
  $('result').classList.add('is-active');
  $('out-wrap').hidden = false;
}

function sortKeys(v) {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k of Object.keys(v).sort((a, b) => a.localeCompare(b, 'tr'))) o[k] = sortKeys(v[k]);
    return o;
  }
  return v;
}

function countNodes(v) {
  let c = 0;
  const walk = (x) => { c++; if (x && typeof x === 'object') for (const k of Object.keys(x)) walk(x[k]); };
  walk(v);
  return c;
}

function sizeInfo(prefix, srcText, outText) {
  const a = new Blob([srcText]).size, b = new Blob([outText]).size;
  return `${prefix} · ${formatBytes(a)} → ${formatBytes(b)}`;
}

function doFormat(sort) {
  const r = parseInput(); if (!r.ok) return;
  const data = sort ? sortKeys(r.data) : r.data;
  const out = JSON.stringify(data, null, indentValue());
  setOutput(out, 'json', sizeInfo(sort ? 'Geçerli JSON, anahtarlar A–Z sıralandı' : 'Geçerli JSON, biçimlendirildi', r.text, out));
}

function doMinify() {
  const r = parseInput(); if (!r.ok) return;
  const out = JSON.stringify(r.data);
  const a = new Blob([r.text]).size, b = new Blob([out]).size;
  const saved = a > 0 ? Math.max(0, Math.round((1 - b / a) * 100)) : 0;
  setOutput(out, 'json', `Geçerli JSON, sıkıştırıldı · ${formatBytes(a)} → ${formatBytes(b)} (%${saved} küçüldü)`);
}

function doValidate() {
  const r = parseInput(); if (!r.ok) return;
  const type = Array.isArray(r.data) ? `dizi, ${r.data.length} öğe` : r.data && typeof r.data === 'object' ? `nesne, ${Object.keys(r.data).length} anahtar` : 'tek değer';
  $('result-info').textContent = `Geçerli JSON (${type}) · toplam ${countNodes(r.data).toLocaleString('tr')} düğüm · ${formatBytes(new Blob([r.text]).size)}`;
  $('result').classList.add('is-active');
}

/* ---------- Ağaç görünümü ---------- */
function describe(v) {
  if (Array.isArray(v)) return `[ ${v.length} öğe ]`;
  return `{ ${Object.keys(v).length} anahtar }`;
}

function leaf(key, v) {
  const row = document.createElement('div');
  row.className = 'jb-row';
  if (key !== null) {
    const k = document.createElement('span');
    k.className = 'jb-key';
    k.textContent = `${key}: `;
    row.appendChild(k);
  }
  const s = document.createElement('span');
  s.className = v === null ? 'jb-null' : `jb-${typeof v}`;
  s.textContent = typeof v === 'string' ? JSON.stringify(v) : String(v);
  row.appendChild(s);
  return row;
}

function node(key, v, depth) {
  if (!v || typeof v !== 'object') return leaf(key, v);
  const d = document.createElement('details');
  d.className = 'jb-node';
  const sum = document.createElement('summary');
  if (key !== null) {
    const k = document.createElement('span');
    k.className = 'jb-key';
    k.textContent = `${key}: `;
    sum.appendChild(k);
  }
  const t = document.createElement('span');
  t.className = 'jb-meta';
  t.textContent = describe(v);
  sum.appendChild(t);
  d.appendChild(sum);
  const body = document.createElement('div');
  body.className = 'jb-children';
  d.appendChild(body);
  const keys = Object.keys(v);
  let shown = 0;
  // Çocuklar yalnızca açılınca (ve parça parça) çizilir: büyük dosyada arayüz donmaz.
  const fill = () => {
    const end = Math.min(keys.length, shown + TREE_CHUNK);
    for (; shown < end; shown++) body.appendChild(node(Array.isArray(v) ? shown : keys[shown], v[keys[shown]], depth + 1));
    const old = body.querySelector(':scope > .jb-more');
    if (old) old.remove();
    if (shown < keys.length) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ba-btn jb-more';
      b.textContent = `${(keys.length - shown).toLocaleString('tr')} öğe daha göster`;
      b.addEventListener('click', fill);
      body.appendChild(b);
    }
  };
  let filled = false;
  d.addEventListener('toggle', () => { if (d.open && !filled) { filled = true; fill(); } });
  if (depth < 2) d.open = true;
  return d;
}

function doTree() {
  const r = parseInput(); if (!r.ok) return;
  const host = $('tree');
  host.textContent = '';
  host.appendChild(node(null, r.data, 0));
  host.hidden = false;
  output.hidden = true;
  outKind = 'json';
  output.value = JSON.stringify(r.data, null, indentValue());
  $('out-label').textContent = 'Ağaç görünümü (kolayca katlanır)';
  $('result-info').textContent = `Geçerli JSON · ${countNodes(r.data).toLocaleString('tr')} düğüm. Okları ya da Enter tuşunu kullanarak katlayıp açın.`;
  $('result').classList.add('is-active');
  $('out-wrap').hidden = false;
}

/* ---------- JSON → CSV ---------- */
function csvCell(v, delim) {
  if (v === null || v === undefined) return '';
  let s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  // Excel'de formül olarak çalışmasın diye metin hücrelerin başına kesme işareti koyulur.
  if (typeof v === 'string' && /^[=+@]|^-(?![\d.])/.test(s)) s = `'${s}`;
  if (s.includes(delim) || /["\r\n]/.test(s) || s !== s.trim()) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

function doCsv() {
  const r = parseInput(); if (!r.ok) return;
  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  if (!Array.isArray(r.data) || !r.data.length || !r.data.every(isObj)) {
    showError($('error'), 'CSV dönüşümü için kök değer nesnelerden oluşan bir dizi olmalı, örneğin [{"ad":"Ali"},{"ad":"Ayşe"}]. Verinizi köşeli parantezle bir diziye alın ve her öğeyi nesne yapın.');
    return;
  }
  const delimSel = $('opt-delim').value;
  const delim = delimSel === 'tab' ? '\t' : delimSel;
  const cols = [];
  const seen = new Set();
  for (const row of r.data) for (const k of Object.keys(row)) if (!seen.has(k)) { seen.add(k); cols.push(k); }
  const lines = [cols.map((c) => csvCell(c, delim)).join(delim)];
  for (const row of r.data) lines.push(cols.map((c) => csvCell(row[c], delim)).join(delim));
  setOutput(lines.join('\r\n'), 'csv', `CSV hazır · ${r.data.length.toLocaleString('tr')} satır, ${cols.length} sütun. İç içe değerler JSON metni olarak yazıldı.`);
}

/* ---------- JSON → TypeScript ---------- */
function toTypeScript(root) {
  const blocks = [];
  const used = new Set();
  const pascal = (k) => {
    const s = String(k).replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').filter(Boolean)
      .map((w) => w[0].toLocaleUpperCase('en') + w.slice(1)).join('');
    const clean = s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/İ/g, 'I').replace(/[^A-Za-z0-9]/g, '') || 'Oge';
    return /^\d/.test(clean) ? `N${clean}` : clean;
  };
  const unique = (base) => {
    let name = base, i = 2;
    while (used.has(name)) name = base + i++;
    used.add(name);
    return name;
  };
  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  const keyText = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));

  function typeOf(v, hint) {
    if (v === null) return 'null';
    if (Array.isArray(v)) return arrayType(v, hint);
    if (isObj(v)) return objectType([v], hint);
    return typeof v; // string | number | boolean
  }
  function arrayType(arr, hint) {
    if (!arr.length) return 'unknown[]';
    const objs = arr.filter(isObj);
    const parts = new Set();
    for (const x of arr) if (!isObj(x)) parts.add(typeOf(x, `${hint}Oge`));
    if (objs.length) parts.add(objectType(objs, `${hint}Oge`));
    const list = [...parts];
    return list.length > 1 ? `(${list.join(' | ')})[]` : `${list[0]}[]`;
  }
  // Aynı şekle sahip nesneleri tek arayüzde birleştirir; her nesnede olmayan anahtar isteğe bağlı (?) olur.
  function objectType(objs, hint) {
    const name = unique(pascal(hint));
    const keys = [];
    const seen = new Set();
    for (const o of objs) for (const k of Object.keys(o)) if (!seen.has(k)) { seen.add(k); keys.push(k); }
    const lines = keys.map((k) => {
      const present = objs.filter((o) => k in o);
      const types = [...new Set(present.map((o) => typeOf(o[k], pascal(k))))];
      const optional = present.length < objs.length ? '?' : '';
      return `  ${keyText(k)}${optional}: ${types.join(' | ')};`;
    });
    blocks.push(`export interface ${name} {\n${lines.join('\n')}\n}`);
    return name;
  }

  const rootType = typeOf(root, 'Kok');
  if (!isObj(root)) blocks.push(`export type Kok = ${rootType};`);
  // Kök arayüz en üstte görünsün.
  return blocks.reverse().join('\n\n') + '\n';
}

function doTs() {
  const r = parseInput(); if (!r.ok) return;
  const out = toTypeScript(r.data);
  setOutput(out, 'ts', 'TypeScript arayüz taslağı hazır. Bu bir başlangıç taslağıdır; isteğe bağlı alanları ve birleşik türleri kendi verinize göre gözden geçirin.');
}

/* ---------- Kopyala / indir ---------- */
async function copyOut() {
  if (!output.value) { showError($('error'), 'Kopyalanacak çıktı yok. Önce Biçimlendir, Sıkıştır ya da bir dönüşüm düğmesine basın.'); return; }
  showError($('error'), '');
  try {
    await navigator.clipboard.writeText(output.value);
  } catch {
    output.hidden = false;
    output.select();
    document.execCommand('copy');
  }
  $('copied').textContent = 'Kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
}

function downloadOut() {
  if (!output.value) { showError($('error'), 'İndirilecek çıktı yok. Önce Biçimlendir, Sıkıştır ya da bir dönüşüm düğmesine basın.'); return; }
  showError($('error'), '');
  const ext = outKind;
  const mime = ext === 'json' ? 'application/json' : ext === 'csv' ? 'text/csv' : 'text/plain';
  const body = ext === 'csv' ? '﻿' + output.value : output.value; // BOM: Excel Türkçe karakterleri doğru açsın
  downloadBlob(new Blob([body], { type: `${mime};charset=utf-8` }), `${fileBase}.${ext}`);
}

/* ---------- Dosya okuma ---------- */
async function loadFile(files) {
  const f = files[0];
  if (!f) return;
  showError($('warning'), '');
  if (f.size > BIG_FILE) showError($('warning'), `Dosya ${formatBytes(f.size)}; 50 MB üstü dosyalar tarayıcıyı dondurabilir. Mümkünse bilgisayardan deneyin ya da dosyayı parçalayın.`);
  else if (f.size > WARN_SIZE) showError($('warning'), `Dosya ${formatBytes(f.size)}; 5 MB üstünde işlemler birkaç saniye sürebilir, ağaç görünümü yalnızca açtığınız dalları çizer.`);
  try {
    input.value = await f.text();
    fileBase = baseName(f.name) || 'veri';
    $('file-name').textContent = `${f.name} (${formatBytes(f.size)})`;
    $('result').classList.remove('is-active');
    showError($('error'), '');
  } catch {
    showError($('error'), 'Dosya okunamadı. Dosyayı başka bir programda açabildiğinizi kontrol edip yeniden seçin.');
  }
}

createDropzone({ el: $('drop'), accept: '.json,.txt,application/json,text/plain', multiple: false, onFiles: loadFile });

input.addEventListener('input', () => {
  if (input.value.length > WARN_SIZE) showError($('warning'), 'Metin 5 MB üstünde; işlemler yavaşlayabilir.');
  else showError($('warning'), '');
});

$('btn-format').addEventListener('click', () => doFormat(false));
$('btn-minify').addEventListener('click', doMinify);
$('btn-validate').addEventListener('click', doValidate);
$('btn-sort').addEventListener('click', () => doFormat(true));
$('btn-tree').addEventListener('click', doTree);
$('btn-csv').addEventListener('click', doCsv);
$('btn-ts').addEventListener('click', doTs);
$('btn-copy').addEventListener('click', copyOut);
$('btn-download').addEventListener('click', downloadOut);
$('btn-clear').addEventListener('click', () => {
  input.value = ''; output.value = ''; fileBase = 'veri';
  $('file-name').textContent = '';
  $('result').classList.remove('is-active');
  $('out-wrap').hidden = true;
  $('tree').textContent = '';
  showError($('error'), ''); showError($('warning'), '');
  input.focus();
});
