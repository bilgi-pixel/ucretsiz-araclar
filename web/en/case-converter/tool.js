// Case converter (EN). Text never leaves the browser; all work is done locally.
import { downloadBlob, showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const input = $('input');
const output = $('output');
const LOC = 'en';

/** First letter of every word upper case, the rest lower case; apostrophe endings stay lower case. */
function titleCase(text) {
  return text.toLocaleLowerCase(LOC).replace(/[\p{L}\p{N}][\p{L}\p{N}'’]*/gu, (w) => {
    const first = Array.from(w)[0];
    return first.toLocaleUpperCase(LOC) + w.slice(first.length);
  });
}

/** First letter of the text, after . ! ? … and after each new line is capitalized; the rest lower case. */
function sentenceCase(text) {
  const lower = text.toLocaleLowerCase(LOC);
  let capNext = true;
  let out = '';
  for (const ch of lower) {
    if (capNext && /\p{L}/u.test(ch)) { out += ch.toLocaleUpperCase(LOC); capNext = false; continue; }
    out += ch;
    if (/[.!?…\n]/.test(ch)) capNext = true;
    else if (/\p{N}/u.test(ch)) capNext = false; // a sentence starting with a number keeps the rest lower case
  }
  return out;
}

const OPS = {
  upper: (t) => t.toLocaleUpperCase(LOC),
  lower: (t) => t.toLocaleLowerCase(LOC),
  title: titleCase,
  sentence: sentenceCase,
};
const LABEL = { upper: 'UPPERCASE', lower: 'lowercase', title: 'Title Case', sentence: 'Sentence case' };

function setStatus(msg) { $('status').textContent = msg; }

document.querySelectorAll('[data-op]').forEach((btn) => {
  btn.addEventListener('click', () => {
    showError($('error'), null);
    if (!input.value.trim()) {
      output.value = '';
      showError($('error'), 'Type or paste the text you want to convert into the top box first.');
      input.focus();
      return;
    }
    output.value = OPS[btn.dataset.op](input.value);
    setStatus(`${LABEL[btn.dataset.op]} applied · ${output.value.length.toLocaleString('en-US')} characters`);
  });
});

/** Copies to the clipboard; falls back to select + execCommand when permission is denied. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    output.focus();
    output.select();
    try { return document.execCommand('copy'); } catch { return false; }
  }
}

$('copy').addEventListener('click', async () => {
  showError($('error'), null);
  if (!output.value) { showError($('error'), 'There is no result to copy yet. Press one of the conversion buttons first.'); return; }
  const ok = await copyText(output.value);
  if (ok) setStatus('Result copied to the clipboard.');
  else showError($('error'), 'The browser blocked clipboard access. Select the text in the Result box and press Ctrl+C (Cmd+C on a Mac).');
});

$('use').addEventListener('click', () => {
  showError($('error'), null);
  if (!output.value) { showError($('error'), 'There is no result to move. Press one of the conversion buttons first.'); return; }
  input.value = output.value;
  output.value = '';
  setStatus('Result moved to the input; you can apply another conversion.');
  input.focus();
});

$('download').addEventListener('click', () => {
  showError($('error'), null);
  if (!output.value) { showError($('error'), 'There is nothing to download yet. Press one of the conversion buttons first.'); return; }
  downloadBlob(new Blob(['﻿', output.value], { type: 'text/plain;charset=utf-8' }), 'converted-text.txt');
  setStatus('Text downloaded as .txt.');
});

$('clear').addEventListener('click', () => {
  input.value = ''; output.value = '';
  showError($('error'), null);
  setStatus('');
  input.focus();
});
