// Altyazı çekirdeği — saf fonksiyonlar: DOM yok, ağ isteği yok.
// Tüm süreler milisaniye (tam sayı). Dosya içeriği tarayıcıdan çıkmaz.

/* ---------- Zaman ---------- */

/** "00:01:02,500", "00:01:02.500", "01:02.500", "0:00:01.50" (ASS) → ms; geçersizse null. */
export function parseTime(s) {
  const m = /^\s*(?:(\d{1,3}):)?(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?\s*$/.exec(String(s ?? ''));
  if (!m) return null;
  const h = m[1] ? Number(m[1]) : 0;
  const mi = Number(m[2]);
  const se = Number(m[3]);
  if (mi > 59 || se > 59) return null;
  const ms = m[4] ? Number(m[4].padEnd(3, '0')) : 0; // ".5" → 500 ms, ".50" → 500 ms
  return ((h * 60 + mi) * 60 + se) * 1000 + ms;
}

/** ms → "HH:MM:SS,mmm" (sep "," SRT için, "." VTT için). */
export function formatTime(ms, sep = ',') {
  const t = Math.max(0, Math.round(ms));
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(t / 3600000))}:${p(Math.floor(t / 60000) % 60)}:${p(Math.floor(t / 1000) % 60)}${sep}${p(t % 1000, 3)}`;
}

/* ---------- Ayrıştırma ---------- */

export function normalizeNewlines(t) {
  return String(t ?? '').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
}

/** Metnin biçimini tahmin eder: 'vtt' | 'ass' | 'srt'. */
export function detectFormat(t) {
  if (/^\s*WEBVTT/.test(t)) return 'vtt';
  if (/^\s*\[Script Info\]/i.test(t) || /^\s*\[Events\]/im.test(t)) return 'ass';
  return 'srt';
}

/** VTT'ye özgü etiketleri ve HTML karakter karşılıklarını sadeleştirir (i/b/u kalır). */
function cleanVttText(s) {
  return s
    .replace(/<\d{1,2}:\d{2}(?::\d{2})?[.,]\d{1,3}>/g, '')
    .replace(/<\/?(?:c|v|lang|ruby|rt|rp)(?:\.[^\s>]*)*(?:\s[^>]*)?>/gi, '')
    .replace(/&lrm;|&rlm;/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** ASS metnini sadeleştirir: {\i1} → <i>, diğer üst yazım kodları silinir, \N satır sonu olur. */
function cleanAssText(s) {
  return s
    .replace(/\{\\i1\}/g, '<i>').replace(/\{\\i0\}/g, '</i>')
    .replace(/\{\\b1\}/g, '<b>').replace(/\{\\b0\}/g, '</b>')
    .replace(/\{[^}]*\}/g, '')
    .replace(/\\N/g, '\n').replace(/\\n/g, '\n').replace(/\\h/g, ' ')
    .trim();
}

const newCue = (start, end, text, extra = {}) => ({ start, end, text, settings: '', rawStart: '', rawEnd: '', ...extra });

function parseSrtVtt(text, format) {
  const cues = [];
  for (const raw of text.split(/\n[ \t]*\n/)) {
    const lines = raw.split('\n');
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    if (!lines.length) continue;
    const first = lines[0].trim();
    const ti = lines.findIndex((l) => l.includes('-->'));
    if (format === 'vtt' && ti === -1 && /^WEBVTT/.test(first)) continue; // dosya başlığı
    if (format === 'vtt' && /^(NOTE|STYLE|REGION)(\s|$)/.test(first)) continue; // yorum/stil blokları
    if (ti === -1) {
      // Zaman satırı olmayan blok: tek başına sıra numarasıysa yok say, metin varsa "zamansız" satır olarak tut.
      if (lines.length === 1 && /^\d+$/.test(first)) continue;
      const body = /^\d+$/.test(first) && lines.length > 1 ? lines.slice(1) : lines;
      cues.push(newCue(null, null, body.join('\n').trim()));
      continue;
    }
    const m = /^\s*(\S+)\s*-->\s*(\S+)(?:\s+(.*))?$/.exec(lines[ti]);
    let body = lines.slice(ti + 1).join('\n').trim();
    if (format === 'vtt') body = cleanVttText(body);
    if (!m) { cues.push(newCue(null, null, body, { rawStart: lines[ti].trim() })); continue; }
    cues.push(newCue(parseTime(m[1]), parseTime(m[2]), body, {
      settings: format === 'vtt' ? (m[3] || '').trim() : '',
      rawStart: m[1], rawEnd: m[2],
    }));
  }
  return cues;
}

function parseAss(text) {
  let fields = ['layer', 'start', 'end', 'style', 'name', 'marginl', 'marginr', 'marginv', 'effect', 'text'];
  let inEvents = false;
  const cues = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (/^\[.*\]$/.test(t)) { inEvents = /^\[events\]$/i.test(t); continue; }
    if (!inEvents) continue;
    if (/^format\s*:/i.test(t)) { fields = t.replace(/^format\s*:/i, '').split(',').map((f) => f.trim().toLowerCase()); continue; }
    if (!/^dialogue\s*:/i.test(t)) continue;
    const parts = t.replace(/^dialogue\s*:/i, '').trim().split(',');
    const n = fields.length;
    const head = parts.slice(0, n - 1);
    const body = parts.slice(n - 1).join(','); // metin virgül içerebilir
    const si = fields.indexOf('start');
    const ei = fields.indexOf('end');
    cues.push(newCue(parseTime(head[si]), parseTime(head[ei]), cleanAssText(body), { rawStart: (head[si] || '').trim(), rawEnd: (head[ei] || '').trim() }));
  }
  cues.sort((a, b) => (a.start ?? Infinity) - (b.start ?? Infinity)); // ASS satırları sıralı olmak zorunda değil
  return cues;
}

/**
 * Altyazı metnini satırlara çevirir.
 * @returns {{format:string, cues:Array}}
 * @throws Türkçe, çözüm öneren Error
 */
export function parseSubtitle(rawText, forcedFormat) {
  const text = normalizeNewlines(rawText);
  if (!text.trim()) throw new Error('Altyazı metni boş. Bir .srt/.vtt/.ass dosyası seçin ya da metni yapıştırıp tekrar deneyin.');
  const format = forcedFormat || detectFormat(text);
  const cues = format === 'ass' ? parseAss(text) : parseSrtVtt(text, format);
  if (!cues.some((c) => c.start !== null && c.end !== null)) {
    throw new Error(format === 'ass'
      ? 'ASS dosyasında okunabilir "Dialogue:" satırı bulunamadı. Dosyada [Events] bölümü ve "0:00:01.00" biçiminde zamanlar olmalı.'
      : 'Geçerli bir zaman satırı (örn. 00:00:01,000 --> 00:00:03,000) bulunamadı; dosya SRT, VTT ya da ASS biçiminde olmalı. Başka bir dosya türüyse (.sub, .idx) önce SRT\'ye çevirin.');
  }
  return { format, cues };
}

/* ---------- Kontrol (uyarılar) ---------- */

/** Satır sorunlarını bulur: eksik zaman, süre ≤ 0, sıra bozuk, çakışma, boş metin. */
export function analyze(cues) {
  const issues = [];
  let prev = null;
  cues.forEach((c, i) => {
    if (c.start === null || c.end === null) {
      issues.push({ i, type: 'missing', msg: 'Zaman eksik ya da okunamadı; kutuyu 00:01:02,500 biçiminde doldurun ya da satırı silin.' });
    } else {
      if (c.end <= c.start) issues.push({ i, type: 'order', msg: 'Bitiş zamanı başlangıçtan önce ya da eşit (süre sıfır veya negatif).' });
      if (prev) {
        if (c.start < prev.start) issues.push({ i, type: 'unsorted', msg: 'Sıra bozuk: önceki satırdan daha erken başlıyor. "Sırala" düğmesini kullanın.' });
        else if (c.start < prev.end) issues.push({ i, type: 'overlap', msg: `Önceki satırla çakışıyor (${prev.end - c.start} ms). "Çakışmaları gider" düğmesi önceki satırı kısaltır.` });
      }
      prev = c;
    }
    if (!String(c.text || '').trim()) issues.push({ i, type: 'empty', msg: 'Metin boş; satırı silin ya da bir metin yazın.' });
  });
  return issues;
}

/* ---------- Düzenleme işlemleri ---------- */

const inScope = (i, from, to) => i + 1 >= from && i + 1 <= to;

/** Seçili satırları deltaMs kadar kaydırır; 0'ın altına düşenler 0'a sabitlenir. */
export function shiftCues(cues, deltaMs, from = 1, to = Infinity) {
  let changed = 0, clamped = 0;
  cues.forEach((c, i) => {
    if (!inScope(i, from, to) || c.start === null || c.end === null) return;
    const s = c.start + deltaMs, e = c.end + deltaMs;
    if (s < 0 || e < 0) clamped++;
    c.start = Math.max(0, s);
    c.end = Math.max(0, e);
    changed++;
  });
  return { changed, clamped };
}

/** Seçili satırların zamanlarını oranla çarpar (yeni = eski × factor). */
export function scaleCues(cues, factor, from = 1, to = Infinity) {
  let changed = 0;
  cues.forEach((c, i) => {
    if (!inScope(i, from, to) || c.start === null || c.end === null) return;
    c.start = Math.round(c.start * factor);
    c.end = Math.round(c.end * factor);
    changed++;
  });
  return { changed };
}

/** fps dönüşüm oranı: altyazı srcFps için hazırlanmış, video dstFps → yeni = eski × (src / dst). */
export const fpsFactor = (srcFps, dstFps) => srcFps / dstFps;

export function sortCues(cues) {
  const copy = cues.map((c, i) => [c, i]);
  copy.sort((a, b) => ((a[0].start ?? Infinity) - (b[0].start ?? Infinity)) || a[1] - b[1]);
  copy.forEach(([c], i) => { cues[i] = c; });
}

/** Sonraki satır önceki bitişten önce başlıyorsa önceki satırın bitişini sonraki başlangıca çeker. */
export function fixOverlaps(cues) {
  let n = 0;
  for (let i = 0; i < cues.length - 1; i++) {
    const a = cues[i], b = cues[i + 1];
    if (a.start === null || a.end === null || b.start === null) continue;
    if (b.start > a.start && b.start < a.end) { a.end = b.start; n++; }
  }
  return n;
}

/** i. satırı sonraki satırla birleştirir (metinler alt alta). */
export function mergeNext(cues, i) {
  const a = cues[i], b = cues[i + 1];
  if (!a || !b) return false;
  const ends = [a.end, b.end].filter((v) => v !== null);
  a.end = ends.length ? Math.max(...ends) : null;
  if (a.start === null) a.start = b.start;
  a.text = [a.text, b.text].filter((t) => String(t).trim()).join('\n');
  cues.splice(i + 1, 1);
  return true;
}

export const cloneCues = (cues) => cues.map((c) => ({ ...c }));

/* ---------- Çıktı ---------- */

function srtText(t) {
  return String(t || '').split('\n').map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim()).join('\n');
}

function vttText(t) {
  return String(t || '')
    .replace(/\{\\an?\d\}/g, '')
    .replace(/-->/g, '--&gt;')
    .replace(/&(?!(?:amp|lt|gt|nbsp|lrm|rlm);)/g, '&amp;')
    .replace(/<(?!\/?(?:i|b|u)>)/g, '&lt;')
    .split('\n').map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim()).join('\n');
}

function assertTimes(cues) {
  if (!cues.length) throw new Error('Kaydedilecek satır yok. Önce bir altyazı yükleyin ya da "Satır ekle" ile satır oluşturun.');
  const bad = cues.findIndex((c) => c.start === null || c.end === null);
  if (bad !== -1) throw new Error(`Satır ${bad + 1} için zaman eksik. Zaman kutularını 00:01:02,500 biçiminde doldurun ya da satırı silip tekrar deneyin.`);
}

/** Satırları SRT metnine çevirir; sıra numaralarını baştan verir. Zamanı eksik satır varsa Error fırlatır. */
export function toSrt(cues) {
  assertTimes(cues);
  return cues.map((c, i) => `${i + 1}\n${formatTime(c.start, ',')} --> ${formatTime(c.end, ',')}\n${srtText(c.text)}`).join('\n\n') + '\n';
}

export function toVtt(cues) {
  assertTimes(cues);
  const body = cues.map((c) => `${formatTime(c.start, '.')} --> ${formatTime(c.end, '.')}${c.settings ? ' ' + c.settings : ''}\n${vttText(c.text)}`).join('\n\n');
  return `WEBVTT\n\n${body}\n`;
}

/* ---------- Kodlama ---------- */

/** Baytları metne çevirir. mode: 'auto' | 'utf-8' | 'windows-1254'. */
export function decodeBytes(buf, mode = 'auto') {
  const u8 = new Uint8Array(buf);
  const starts = (...b) => b.every((v, i) => u8[i] === v);
  let fellBack = false;
  if (mode === 'auto') {
    if (starts(0xef, 0xbb, 0xbf)) mode = 'utf-8';
    else if (starts(0xff, 0xfe)) mode = 'utf-16le';
    else if (starts(0xfe, 0xff)) mode = 'utf-16be';
    else {
      try { return { text: new TextDecoder('utf-8', { fatal: true }).decode(u8), encoding: 'UTF-8', fellBack: false }; }
      catch { mode = 'windows-1254'; fellBack = true; } // geçerli UTF-8 değil → Türkçe eski kodlama
    }
  }
  const label = { 'utf-8': 'UTF-8', 'utf-16le': 'UTF-16 LE', 'utf-16be': 'UTF-16 BE', 'windows-1254': 'Windows-1254' }[mode] || mode;
  return { text: new TextDecoder(mode).decode(u8), encoding: label, fellBack };
}

let map1254 = null;
function table1254() {
  if (!map1254) {
    map1254 = new Map();
    const d = new TextDecoder('windows-1254');
    for (let b = 0; b < 256; b++) { const ch = d.decode(Uint8Array.of(b)); if (!map1254.has(ch)) map1254.set(ch, b); }
  }
  return map1254;
}

/** Metni baytlara çevirir. Windows-1254'te karşılığı olmayan karakter "?" olur ve lost listesine girer. */
export function encodeText(text, enc = 'utf-8', { bom = false } = {}) {
  if (enc === 'windows-1254') {
    const t = table1254();
    const lost = new Set();
    const out = [];
    for (const ch of text) {
      const b = t.get(ch);
      if (b === undefined) { lost.add(ch); out.push(0x3f); } else out.push(b);
    }
    return { bytes: Uint8Array.from(out), lost: [...lost] };
  }
  const body = new TextEncoder().encode(text);
  if (!bom) return { bytes: body, lost: [] };
  const withBom = new Uint8Array(body.length + 3);
  withBom.set([0xef, 0xbb, 0xbf]);
  withBom.set(body, 3);
  return { bytes: withBom, lost: [] };
}

/* ---------- Bozuk Türkçe karakter onarımı ---------- */

const TR_LETTERS = 'çöüÇÖÜıİğĞşŞâîûÂÎÛ';
// Windows-1252'nin 0x80–0x9F aralığı (tanımsız konumlar C1 kontrol karakteri olarak kalır).
const CP1252_HIGH = '€\u0081‚ƒ„…†‡ˆ‰Š‹Œ\u008DŽ\u008F\u0090‘’“”•–—˜™š›œ\u009DžŸ';
// Bir baytın tek baytlık kodlamalarda okunabileceği karakterler. 0x80–0x9F kodlamaya göre değişir:
// Windows-1252 'ž, Ÿ, œ, ‡ …' verir; gerçek ISO-8859-1 (Latin-1) ve Windows-1254'ün tanımsız
// 0x8E/0x9E baytları ise C1 kontrol karakteri (U+0080–U+009F) verir. İkisi de onarılmalı.
function byteReadings(b) {
  const iso = String.fromCharCode(b);
  return b >= 0x80 && b <= 0x9f && CP1252_HIGH[b - 0x80] !== iso ? [CP1252_HIGH[b - 0x80], iso] : [iso];
}
// UTF-8 baytlarının Windows-1252/1254 ya da ISO-8859-1 sanılarak okunmasıyla oluşan bozuk dizileri üretir
// (Ã§, Ä±, ÅŸ, Å\u009E …). Tablo TextDecoder'a bırakılmaz: bazı ortamlar 'windows-1252' etiketini
// ISO-8859-1 gibi çözer ve 'latin1' etiketi tarayıcıda zaten Windows-1252 demektir.
let pairsCache = null;
function mojibakePairs() {
  if (!pairsCache) {
    const enc = new TextEncoder();
    pairsCache = [];
    for (const ch of TR_LETTERS) {
      const variants = [...enc.encode(ch)].reduce((acc, b) => acc.flatMap((s) => byteReadings(b).map((r) => s + r)), ['']);
      for (const bad of variants) pairsCache.push([bad, ch]);
    }
  }
  return pairsCache;
}
// Windows-1254 baytlarının Latin-1 sanılarak okunmasıyla oluşan harfler.
const LATIN1_MISREAD = { 'ð': 'ğ', 'Ð': 'Ğ', 'ý': 'ı', 'Ý': 'İ', 'þ': 'ş', 'Þ': 'Ş' };

/** Bozuk Türkçe karakterleri onarır. @returns {{text:string, count:number, kind:string}} */
export function fixTurkish(text) {
  let out = text, count = 0, kind = '';
  for (const [bad, good] of mojibakePairs()) {
    const parts = out.split(bad);
    if (parts.length > 1) { count += parts.length - 1; out = parts.join(good); kind = 'utf8-misread'; }
  }
  if (!count && /[ðÐýÝþÞ]/.test(out) && !/[ğĞıİşŞ]/.test(out)) {
    out = out.replace(/[ðÐýÝþÞ]/g, (c) => { count++; return LATIN1_MISREAD[c]; });
    kind = 'latin1-misread';
  }
  return { text: out, count, kind };
}
