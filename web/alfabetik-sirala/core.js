// Türkçe alfabetik sıralama — saf mantık (DOM yok), Node ile de test edilebilir.

/**
 * Metindeki satırları sıralar.
 * opts: { mode:'az'|'len'|'rev', lang:'tr'|'en', desc, ignoreCase, numeric, dedupe, dropEmpty, trim }
 */
export function sortLines(text, opts = {}) {
  const o = { mode: 'az', lang: 'tr', desc: false, ignoreCase: true, numeric: false, dedupe: false, dropEmpty: true, trim: true, ...opts };
  let lines = String(text ?? '').replace(/\r\n?/g, '\n').split('\n');
  const total = lines.length;
  if (o.trim) lines = lines.map((l) => l.trim());
  let removedEmpty = 0;
  if (o.dropEmpty) { const before = lines.length; lines = lines.filter((l) => l.trim() !== ''); removedEmpty = before - lines.length; }
  let removedDupes = 0;
  if (o.dedupe) {
    const seen = new Set();
    const key = (l) => (o.ignoreCase ? l.toLocaleLowerCase(o.lang) : l);
    lines = lines.filter((l) => { const k = key(l); if (seen.has(k)) { removedDupes++; return false; } seen.add(k); return true; });
  }
  const col = new Intl.Collator(o.lang, { sensitivity: o.ignoreCase ? 'accent' : 'variant', numeric: o.numeric });
  if (o.mode === 'az') {
    lines = lines.map((l, i) => [l, i]).sort((a, b) => col.compare(a[0], b[0]) || a[1] - b[1]).map((x) => x[0]);
    if (o.desc) lines.reverse();
  } else if (o.mode === 'len') {
    lines = lines.map((l, i) => [l, i]).sort((a, b) => ([...a[0]].length - [...b[0]].length) || col.compare(a[0], b[0]) || a[1] - b[1]).map((x) => x[0]);
    if (o.desc) lines.reverse();
  } else if (o.mode === 'rev') {
    lines.reverse();
  }
  return { lines, total, removedEmpty, removedDupes };
}
