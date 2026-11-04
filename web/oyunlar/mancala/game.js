// Mancala arayüzü: DOM tahtası, taş dağıtma animasyonu, bilgisayar (Web Worker), geri al, skor.
// Kurallar ve yapay zekâ engine.js içindedir. Ağ isteği yok; yalnızca localStorage'a skor yazılır.
import { newState, applyMove, legalMoves, winner, LEVEL_DEPTH, chooseMove, cloneState } from './engine.js';

const STATS_KEY = 'ba-oyun-mancala';
const $ = (id) => document.getElementById(id);
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Görsel sıra: üst satır soldan sağa 12..7, alt satır soldan sağa 0..5
const TOP = [12, 11, 10, 9, 8, 7];
const BOTTOM = [0, 1, 2, 3, 4, 5];

let state = newState();
let mode = 'cpu';
let level = 'orta';
let busy = false;
let history = [];
let shown = state.pits.slice();
let lastPit = -1;
let worker = null;
let reqId = 0;
let runToken = 0;

function loadStats() {
  try {
    const s = JSON.parse(localStorage.getItem(STATS_KEY) || '{}') || {};
    const n = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
    return { win: n(s.win), loss: n(s.loss), draw: n(s.draw), best: n(s.best) };
  } catch { return { win: 0, loss: 0, draw: 0, best: 0 }; }
}
function saveStats(s) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch { /* depolama kapalı olabilir */ }
}
function renderStats() {
  const s = loadStats();
  $('mc-stats').textContent = `Bilgisayara karşı: ${s.win} galibiyet · ${s.loss} yenilgi · ${s.draw} beraberlik · en iyi fark ${s.best}`;
}

function dots(n) {
  let h = '';
  const m = Math.min(n, 20);
  for (let i = 0; i < m; i++) h += '<i></i>';
  return h;
}

function names() {
  return mode === 'cpu' ? ['Siz', 'Bilgisayar'] : ['Oyuncu 1', 'Oyuncu 2'];
}

function humanTurn() {
  return !state.over && (mode === 'two' || state.turn === 0);
}

function buildBoard() {
  const b = $('mc-board');
  let h = '';
  h += '<div class="mc-store mc-store-1" id="mc-s13" role="img"><span class="mc-lab" id="mc-n1">Bilgisayar</span><b class="mc-cnt">0</b><span class="mc-dots"></span></div>';
  TOP.forEach((p) => { h += `<button type="button" class="mc-pit mc-top" data-pit="${p}" data-count="4"><span class="mc-cnt">4</span><span class="mc-dots"></span></button>`; });
  h += '<div class="mc-store mc-store-0" id="mc-s6" role="img"><span class="mc-lab" id="mc-n0">Siz</span><b class="mc-cnt">0</b><span class="mc-dots"></span></div>';
  BOTTOM.forEach((p) => { h += `<button type="button" class="mc-pit mc-bot" data-pit="${p}" data-count="4"><span class="mc-cnt">4</span><span class="mc-dots"></span></button>`; });
  b.innerHTML = h;
  b.addEventListener('click', (e) => {
    const btn = e.target.closest('.mc-pit');
    if (btn) play(Number(btn.dataset.pit));
  });
}

function render() {
  const nm = names();
  $('mc-n0').textContent = nm[0];
  $('mc-n1').textContent = nm[1];
  const movable = humanTurn() && !busy ? legalMoves(state) : [];
  document.querySelectorAll('#mc-board .mc-pit').forEach((el) => {
    const p = Number(el.dataset.pit);
    const c = shown[p];
    el.dataset.count = String(c);
    el.querySelector('.mc-cnt').textContent = String(c);
    el.querySelector('.mc-dots').innerHTML = dots(c);
    const can = movable.includes(p);
    el.disabled = !can;
    el.classList.toggle('is-movable', can);
    el.classList.toggle('is-last', p === lastPit);
    const who = p < 6 ? nm[0] : nm[1];
    const idx = p < 6 ? p + 1 : 13 - p;
    el.setAttribute('aria-label', `${who}, ${idx}. çukur, ${c} taş`);
  });
  for (const [id, p] of [['mc-s6', 6], ['mc-s13', 13]]) {
    const el = $(id);
    el.querySelector('.mc-cnt').textContent = String(shown[p]);
    el.querySelector('.mc-dots').innerHTML = dots(shown[p]);
    el.dataset.count = String(shown[p]);
    el.setAttribute('aria-label', `${p === 6 ? nm[0] : nm[1]} haznesi, ${shown[p]} taş`);
  }
  $('mc-undo').disabled = busy || history.length === 0;
  $('mc-score').textContent = `${state.pits[6]} – ${state.pits[13]}`;
}

function setStatus(text, cls) {
  const el = $('mc-status');
  el.textContent = text;
  el.className = 'mc-status' + (cls ? ' ' + cls : '');
}

function statusFor() {
  const nm = names();
  if (state.over) {
    const w = winner(state);
    const a = state.pits[6], b = state.pits[13];
    if (w === 'draw') return [`Oyun berabere bitti: ${a} – ${b}.`, 'is-over'];
    if (mode === 'cpu') return [w === 0 ? `Kazandınız! ${a} – ${b}.` : `Bilgisayar kazandı: ${b} – ${a}. Yeni oyunla rövanş alabilirsiniz.`, 'is-over'];
    return [`${nm[w]} kazandı: ${w === 0 ? a : b} – ${w === 0 ? b : a}.`, 'is-over'];
  }
  if (mode === 'cpu' && state.turn === 1) return ['Bilgisayar düşünüyor…', ''];
  return [mode === 'cpu' ? 'Sıra sizde. Alt sıradaki çukurlardan birini seçin.' : `Sıra ${nm[state.turn]} oyuncusunda (${state.turn === 0 ? 'alt' : 'üst'} sıra).`, ''];
}

function refresh() {
  render();
  const [t, c] = statusFor();
  setStatus(t, c);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Taş dağıtma animasyonu: kaynak boşalır, taşlar tek tek düşer
async function animate(prev, res, pit, token) {
  shown = prev.pits.slice();
  shown[pit] = 0;
  lastPit = pit;
  render();
  if (!reduced()) {
    for (const idx of res.path) {
      await sleep(130);
      if (token !== runToken) return false;
      shown[idx] += 1;
      lastPit = idx;
      render();
    }
    if (res.captured > 0) await sleep(260);
    if (token !== runToken) return false;
  }
  shown = res.state.pits.slice();
  return true;
}

async function doMove(pit) {
  const token = runToken;
  const prev = state;
  const res = applyMove(state, pit);
  if (!res) return;
  busy = true;
  state = res.state;
  const ok = await animate(prev, res, pit, token);
  if (!ok) return;
  busy = false;
  lastPit = res.last;
  shown = state.pits.slice();
  if (state.over) finishGame();
  refresh();
  const parts = [];
  if (res.extra) parts.push('Tekrar oynama hakkı!');
  if (res.captured) parts.push(`${res.captured} taş ele geçirildi.`);
  if (parts.length && !state.over) setStatus(parts.join(' ') + ' ' + statusFor()[0], '');
  if (!state.over && mode === 'cpu' && state.turn === 1) cpuTurn(token);
}

function finishGame() {
  if (mode !== 'cpu') return;
  const s = loadStats();
  const w = winner(state);
  if (w === 0) { s.win += 1; s.best = Math.max(s.best, state.pits[6] - state.pits[13]); }
  else if (w === 1) s.loss += 1;
  else s.draw += 1;
  saveStats(s);
  renderStats();
}

function askWorker(st, depth) {
  return new Promise((resolve) => {
    if (!worker) { setTimeout(() => resolve(chooseMove(st, depth)), 0); return; }
    const id = ++reqId;
    const onMsg = (e) => {
      if (e.data.id !== id) return;
      worker.removeEventListener('message', onMsg);
      resolve(e.data.pit);
    };
    worker.addEventListener('message', onMsg);
    worker.postMessage({ id, state: st, depth });
  });
}

async function cpuTurn(token) {
  busy = true;
  render();
  setStatus('Bilgisayar düşünüyor…', '');
  const [pit] = await Promise.all([askWorker(cloneState(state), LEVEL_DEPTH[level] || 4), sleep(reduced() ? 50 : 450)]);
  if (token !== runToken) return;
  busy = false;
  if (pit >= 0) doMove(pit);
}

function play(pit) {
  if (busy || !humanTurn()) return;
  if (!legalMoves(state).includes(pit)) return;
  history.push({ state: cloneState(state), lastPit });
  doMove(pit);
}

function undo() {
  if (busy || history.length === 0) return;
  runToken++;
  const h = history.pop();
  state = h.state;
  lastPit = h.lastPit;
  shown = state.pits.slice();
  busy = false;
  refresh();
}

function newGame() {
  runToken++;
  state = newState();
  shown = state.pits.slice();
  history = [];
  lastPit = -1;
  busy = false;
  refresh();
}

function initWorker() {
  try {
    worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
    worker.onerror = () => { worker = null; };
  } catch { worker = null; }
}

function initFullscreen() {
  const box = document.querySelector('.game-box');
  const btn = $('mc-full');
  if (!(document.fullscreenEnabled && box.requestFullscreen)) return;
  btn.hidden = false;
  btn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    btn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

function init() {
  buildBoard();
  initWorker();
  $('mc-mode').addEventListener('change', (e) => { mode = e.target.value; $('mc-level-wrap').hidden = mode !== 'cpu'; newGame(); });
  $('mc-level').addEventListener('change', (e) => { level = e.target.value; newGame(); });
  $('mc-new').addEventListener('click', newGame);
  $('mc-undo').addEventListener('click', undo);
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    if (e.key >= '1' && e.key <= '6') {
      const row = state.turn === 0 ? BOTTOM : TOP;
      play(row[Number(e.key) - 1]);
      e.preventDefault();
    }
  });
  initFullscreen();
  renderStats();
  refresh();
}

init();
