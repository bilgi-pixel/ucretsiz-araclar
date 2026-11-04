// JSON Formatter & Validator (EN) — plain JS, no libraries. Your text never leaves the browser.
import { createDropzone, showError, formatBytes, downloadBlob, baseName } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const WARN_SIZE = 5 * 1024 * 1024;     // above this size, warn that it may be slow
const BIG_FILE = 50 * 1024 * 1024;     // above this size, show a stronger warning
const TREE_CHUNK = 500;                // children rendered at a time in one tree node

const input = $('input');
const output = $('output');
let fileBase = 'data';
let outKind = 'json';                  // kind of the last output: json | csv | ts

/* ---------- Position helpers ---------- */
function lineCol(text, pos) {
  let line = 1, last = -1;
  for (let i = text.indexOf('\n'); i !== -1 && i < pos; i = text.indexOf('\n', i + 1)) { line++; last = i; }
  return { line, col: pos - last };
}

/**
 * A strict parser that finds where JSON.parse failed and explains it in English.
 * Browsers word their own messages differently, so we do not rely on them.
 */
function diagnose(src) {
  let i = 0;
  const n = src.length;
  const fail = (pos, msg) => { throw { pos, msg }; };
  const show = (c) => (c === undefined ? 'the end of the text' : c === '\n' ? 'a line break' : `"${c}"`);
  const ws = () => { while (i < n && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n' || src[i] === '\r')) i++; };

  function str() {
    const start = i;
    i++; // opening quote
    while (i < n) {
      const c = src[i];
      if (c === '"') { i++; return; }
      if (c < ' ') fail(i, 'The string contains a real line break or control character. Write \\n for a line break or keep the string on one line.');
      if (c === '\\') {
        const e = src[i + 1];
        if (e === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(src.slice(i + 2, i + 6))) fail(i, 'A \\u escape must be followed by 4 hexadecimal digits (for example \\u00e9).');
          i += 6; continue;
        }
        if (e === undefined || !'"\\/bfnrt'.includes(e)) fail(i, `Invalid escape sequence "\\${e === undefined ? '' : e}". Double the backslash (\\\\) or delete the escape character.`);
        i += 2; continue;
      }
      i++;
    }
    fail(start, 'The closing quote of this string is missing. A double quote was opened but never closed.');
  }

  function value() {
    ws();
    const c = src[i];
    if (c === undefined) fail(i, 'A value was expected but the text ended. A value may be missing or a bracket left open.');
    if (c === '{') return obj();
    if (c === '[') return arr();
    if (c === '"') return str();
    if (c === "'") fail(i, 'Single quotes are not allowed. In JSON, strings and keys must be wrapped in double quotes (").');
    if (c === '/') fail(i, 'JSON does not allow comments. Remove the // and /* */ parts.');
    for (const lit of ['true', 'false', 'null']) {
      if (src.startsWith(lit, i)) { i += lit.length; return; }
    }
    if (c === '-' || (c >= '0' && c <= '9')) {
      const re = /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/y;
      re.lastIndex = i;
      const m = re.exec(src);
      if (!m) fail(i, 'Invalid number. A minus sign must be followed by a digit; use a dot for decimals (3.14).');
      const next = src[i + m[0].length];
      if (next !== undefined && next >= '0' && next <= '9') fail(i, 'A number cannot start with a zero (write 7 instead of 007, or quote it as the string "007").');
      if (next === '.') fail(i + m[0].length, 'A digit must follow the decimal point (for example 5.0).');
      i += m[0].length; return;
    }
    const word = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 40));
    if (word) fail(i, `Unrecognized value "${word[0]}". Strings must be in double quotes; only true, false and null are written without quotes (undefined and NaN are not valid).`);
    fail(i, `Unexpected character ${show(c)}. A value (string, number, object, array, true, false or null) belongs here.`);
  }

  function obj() {
    i++; ws();
    if (src[i] === '}') { i++; return; }
    for (;;) {
      ws();
      const c = src[i];
      if (c !== '"') {
        if (c === '}') fail(i, 'There is a trailing comma after the last property. Delete the comma before the closing }.');
        if (c === "'") fail(i, 'The key is wrapped in single quotes. JSON keys must use double quotes.');
        fail(i, `A key must be wrapped in double quotes, but found ${show(c)}. JSON does not allow unquoted keys.`);
      }
      str(); ws();
      if (src[i] !== ':') fail(i, `A colon (:) was expected after the key, but found ${show(src[i])}.`);
      i++; value(); ws();
      const d = src[i];
      if (d === ',') { i++; continue; }
      if (d === '}') { i++; return; }
      fail(i, `A comma or } was expected, but found ${show(d)}. A comma may be missing between two properties, or a curly brace was never closed.`);
    }
  }

  function arr() {
    i++; ws();
    if (src[i] === ']') { i++; return; }
    for (;;) {
      ws();
      if (src[i] === ']') fail(i, 'There is a trailing comma after the last item. Delete the comma before the closing ].');
      value(); ws();
      const d = src[i];
      if (d === ',') { i++; continue; }
      if (d === ']') { i++; return; }
      fail(i, `A comma or ] was expected, but found ${show(d)}. A comma may be missing between two items, or a square bracket was never closed.`);
    }
  }

  try {
    value(); ws();
    if (i < n) fail(i, `There is extra content after the value (${show(src[i])}). A JSON document must have a single root value; wrap several objects in an array.`);
  } catch (e) {
    if (e && typeof e.pos === 'number') return e;
    return null;
  }
  return null;
}

/** Parses the input; on error shows the message and moves the caret to the faulty spot. */
function parseInput() {
  let text = input.value;
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  if (!text.trim()) {
    showError($('error'), 'The input is empty. Paste your JSON into the box or drop a .json file.');
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
      showError($('error'), `Line ${line}, column ${col}: ${d.msg}`);
      goToError(d.pos);
    } else {
      showError($('error'), 'This is not valid JSON, or it is nested too deeply. Check the start and end of the text and make sure all brackets match.');
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

/* ---------- Output ---------- */
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
  $('out-label').textContent = kind === 'json' ? 'Output (JSON)' : kind === 'csv' ? 'Output (CSV)' : 'Output (TypeScript)';
  $('result-info').textContent = info;
  $('result').classList.add('is-active');
  $('out-wrap').hidden = false;
}

function sortKeys(v) {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k of Object.keys(v).sort((a, b) => a.localeCompare(b, 'en'))) o[k] = sortKeys(v[k]);
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
  setOutput(out, 'json', sizeInfo(sort ? 'Valid JSON, keys sorted A–Z' : 'Valid JSON, formatted', r.text, out));
}

function doMinify() {
  const r = parseInput(); if (!r.ok) return;
  const out = JSON.stringify(r.data);
  const a = new Blob([r.text]).size, b = new Blob([out]).size;
  const saved = a > 0 ? Math.max(0, Math.round((1 - b / a) * 100)) : 0;
  setOutput(out, 'json', `Valid JSON, minified · ${formatBytes(a)} → ${formatBytes(b)} (${saved}% smaller)`);
}

function doValidate() {
  const r = parseInput(); if (!r.ok) return;
  const type = Array.isArray(r.data) ? `array, ${r.data.length} item${r.data.length === 1 ? '' : 's'}` : r.data && typeof r.data === 'object' ? `object, ${Object.keys(r.data).length} key${Object.keys(r.data).length === 1 ? '' : 's'}` : 'single value';
  $('result-info').textContent = `Valid JSON (${type}) · ${countNodes(r.data).toLocaleString('en-US')} nodes in total · ${formatBytes(new Blob([r.text]).size)}`;
  $('result').classList.add('is-active');
}

/* ---------- Tree view ---------- */
function describe(v) {
  if (Array.isArray(v)) return `[ ${v.length} item${v.length === 1 ? '' : 's'} ]`;
  const k = Object.keys(v).length;
  return `{ ${k} key${k === 1 ? '' : 's'} }`;
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
  // Children are drawn only when opened (and in chunks) so large files do not freeze the page.
  const fill = () => {
    const end = Math.min(keys.length, shown + TREE_CHUNK);
    for (; shown < end; shown++) body.appendChild(node(Array.isArray(v) ? shown : keys[shown], v[keys[shown]], depth + 1));
    const old = body.querySelector(':scope > .jb-more');
    if (old) old.remove();
    if (shown < keys.length) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ba-btn jb-more';
      b.textContent = `Show ${(keys.length - shown).toLocaleString('en-US')} more`;
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
  $('out-label').textContent = 'Tree view (collapsible)';
  $('result-info').textContent = `Valid JSON · ${countNodes(r.data).toLocaleString('en-US')} nodes. Use the arrows or the Enter key to collapse and expand.`;
  $('result').classList.add('is-active');
  $('out-wrap').hidden = false;
}

/* ---------- JSON → CSV ---------- */
function csvCell(v, delim) {
  if (v === null || v === undefined) return '';
  let s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  // Text cells that start with a formula character get an apostrophe so spreadsheets do not run them as formulas.
  if (typeof v === 'string' && /^[=+@]|^-(?![\d.])/.test(s)) s = `'${s}`;
  if (s.includes(delim) || /["\r\n]/.test(s) || s !== s.trim()) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

function doCsv() {
  const r = parseInput(); if (!r.ok) return;
  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  if (!Array.isArray(r.data) || !r.data.length || !r.data.every(isObj)) {
    showError($('error'), 'CSV conversion needs the root value to be an array of objects, for example [{"name":"Ann"},{"name":"Ben"}]. Wrap your data in square brackets and make each item an object.');
    return;
  }
  const delimSel = $('opt-delim').value;
  const delim = delimSel === 'tab' ? '\t' : delimSel;
  const cols = [];
  const seen = new Set();
  for (const row of r.data) for (const k of Object.keys(row)) if (!seen.has(k)) { seen.add(k); cols.push(k); }
  const lines = [cols.map((c) => csvCell(c, delim)).join(delim)];
  for (const row of r.data) lines.push(cols.map((c) => csvCell(row[c], delim)).join(delim));
  setOutput(lines.join('\r\n'), 'csv', `CSV ready · ${r.data.length.toLocaleString('en-US')} row${r.data.length === 1 ? '' : 's'}, ${cols.length} column${cols.length === 1 ? '' : 's'}. Nested values are written as JSON text.`);
}

/* ---------- JSON → TypeScript ---------- */
function toTypeScript(root) {
  const blocks = [];
  const used = new Set();
  const pascal = (k) => {
    const s = String(k).replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1)).join('');
    const clean = s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]/g, '') || 'Item';
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
    for (const x of arr) if (!isObj(x)) parts.add(typeOf(x, `${hint}Item`));
    if (objs.length) parts.add(objectType(objs, `${hint}Item`));
    const list = [...parts];
    return list.length > 1 ? `(${list.join(' | ')})[]` : `${list[0]}[]`;
  }
  // Objects with the same role are merged into one interface; keys missing from some objects become optional (?).
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

  const rootType = typeOf(root, 'Root');
  if (!isObj(root)) blocks.push(`export type Root = ${rootType};`);
  // Root interface appears first.
  return blocks.reverse().join('\n\n') + '\n';
}

function doTs() {
  const r = parseInput(); if (!r.ok) return;
  const out = toTypeScript(r.data);
  setOutput(out, 'ts', 'TypeScript interface draft ready. It is a starting point; review optional fields and union types against your own data.');
}

/* ---------- Copy / download ---------- */
async function copyOut() {
  if (!output.value) { showError($('error'), 'There is no output to copy yet. Press Format, Minify or one of the conversion buttons first.'); return; }
  showError($('error'), '');
  try {
    await navigator.clipboard.writeText(output.value);
  } catch {
    output.hidden = false;
    output.select();
    document.execCommand('copy');
  }
  $('copied').textContent = 'Copied';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
}

function downloadOut() {
  if (!output.value) { showError($('error'), 'There is no output to download yet. Press Format, Minify or one of the conversion buttons first.'); return; }
  showError($('error'), '');
  const ext = outKind;
  const mime = ext === 'json' ? 'application/json' : ext === 'csv' ? 'text/csv' : 'text/plain';
  const body = ext === 'csv' ? '﻿' + output.value : output.value; // BOM so Excel reads accented characters correctly
  downloadBlob(new Blob([body], { type: `${mime};charset=utf-8` }), `${fileBase}.${ext}`);
}

/* ---------- File reading ---------- */
async function loadFile(files) {
  const f = files[0];
  if (!f) return;
  showError($('warning'), '');
  if (f.size > BIG_FILE) showError($('warning'), `This file is ${formatBytes(f.size)}; files above 50 MB can freeze the browser. Try a desktop tool or split the file into parts.`);
  else if (f.size > WARN_SIZE) showError($('warning'), `This file is ${formatBytes(f.size)}; above 5 MB, actions can take a few seconds and the tree view only draws the branches you open.`);
  try {
    input.value = await f.text();
    fileBase = baseName(f.name) || 'data';
    $('file-name').textContent = `${f.name} (${formatBytes(f.size)})`;
    $('result').classList.remove('is-active');
    showError($('error'), '');
  } catch {
    showError($('error'), 'The file could not be read. Check that you can open it in another program, then select it again.');
  }
}

createDropzone({ el: $('drop'), accept: '.json,.txt,application/json,text/plain', multiple: false, onFiles: loadFile });

input.addEventListener('input', () => {
  if (input.value.length > WARN_SIZE) showError($('warning'), 'The text is over 5 MB; actions may be slow.');
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
  input.value = ''; output.value = ''; fileBase = 'data';
  $('file-name').textContent = '';
  $('result').classList.remove('is-active');
  $('out-wrap').hidden = true;
  $('tree').textContent = '';
  showError($('error'), ''); showError($('warning'), '');
  input.focus();
});
