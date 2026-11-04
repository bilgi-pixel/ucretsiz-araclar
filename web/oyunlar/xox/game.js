// XOX (3×3) ve Beşli Dizi (15×15, gomoku türü) — iki oyunculu ve bilgisayara karşı.
// Tamamen istemci tarafı; dış istek yok. Skorlar ve ayarlar yalnızca localStorage'a yazılır.
// Saf mantık fonksiyonları dışa aktarılır (testler ve olası yeniden kullanım için); DOM kodu init() içindedir.

const STORE_KEY = 'ba-oyun-xox';
const CPU_DELAY = 380; // bilgisayarın "düşünme" gecikmesi (ms)
const MODES = { xox: { n: 3, need: 3 }, gomoku: { n: 15, need: 5 } };

// ---------- Saf oyun mantığı ----------

const LINES3 = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
// Minimax hamle sırası: merkez, köşeler, kenarlar (eşit değerde ilk bulunan seçilir).
const ORDER3 = [4, 0, 2, 6, 8, 1, 3, 5, 7];
const DIRS = [[0, 1], [1, 0], [1, 1], [1, -1]];

const other = (p) => (p === 'X' ? 'O' : 'X');

/** 3×3 tahtada kazananı döndürür: { who, line } veya null. */
export function winner3(b) {
  for (const l of LINES3) {
    const [x, y, z] = l;
    if (b[x] && b[x] === b[y] && b[y] === b[z]) return { who: b[x], line: l.slice() };
  }
  return null;
}

/**
 * Son oynanan hücreden geçen, en az `need` uzunluğunda aynı işaret dizisini arar.
 * Bulursa dizinin hücre indekslerini (uçtan uca sıralı) döndürür; yoksa null.
 */
export function checkWinAt(b, n, idx, need) {
  const p = b[idx];
  if (!p) return null;
  const r = Math.floor(idx / n);
  const c = idx % n;
  for (const [dr, dc] of DIRS) {
    const back = [];
    const fwd = [];
    let rr = r + dr; let cc = c + dc;
    while (rr >= 0 && rr < n && cc >= 0 && cc < n && b[rr * n + cc] === p) { fwd.push(rr * n + cc); rr += dr; cc += dc; }
    rr = r - dr; cc = c - dc;
    while (rr >= 0 && rr < n && cc >= 0 && cc < n && b[rr * n + cc] === p) { back.push(rr * n + cc); rr -= dr; cc -= dc; }
    const run = [...back.reverse(), idx, ...fwd];
    if (run.length >= need) return run;
  }
  return null;
}

// Minimax + alfa-beta: yenilmez 3×3 yapay zekâ. Daha hızlı kazanış ve daha yavaş kayıp tercih edilir.
function minimax(b, turn, me, depth, alpha, beta) {
  const w = winner3(b);
  if (w) return w.who === me ? 10 - depth : depth - 10;
  if (b.every(Boolean)) return 0;
  const maximizing = turn === me;
  let best = maximizing ? -Infinity : Infinity;
  for (const i of ORDER3) {
    if (b[i]) continue;
    b[i] = turn;
    const s = minimax(b, other(turn), me, depth + 1, alpha, beta);
    b[i] = '';
    if (maximizing) { best = Math.max(best, s); alpha = Math.max(alpha, best); } else { best = Math.min(best, s); beta = Math.min(beta, best); }
    if (beta <= alpha) break;
  }
  return best;
}

/** `me` işaretiyle oynayan zor (yenilmez) bilgisayarın hamlesi. Boş tahtada merkez/köşe arasından seçer. */
export function bestMove3(board, me, rnd = Math.random) {
  const b = board.slice();
  const empties = ORDER3.filter((i) => !b[i]);
  if (empties.length === 9) {
    const openers = [4, 0, 2, 6, 8];
    return openers[Math.floor(rnd() * openers.length) % openers.length];
  }
  let best = -Infinity;
  let move = empties[0];
  for (const i of empties) {
    b[i] = me;
    const s = minimax(b, other(me), me, 1, -Infinity, Infinity);
    b[i] = '';
    if (s > best) { best = s; move = i; }
  }
  return move;
}

/** Kolay bilgisayar: rastgele boş hücre. */
export function randomMove(board, rnd = Math.random) {
  const empties = [];
  board.forEach((v, i) => { if (!v) empties.push(i); });
  return empties[Math.floor(rnd() * empties.length) % empties.length];
}

// Gomoku sezgiseli: bir hücreye `p` taşı konursa dört yönde oluşacak dizilerin puanı.
function patternScore(cnt, open) {
  if (cnt >= 5) return 100000;
  if (open === 0) return 0;
  if (cnt === 4) return open === 2 ? 10000 : 1500;
  if (cnt === 3) return open === 2 ? 1200 : 150;
  if (cnt === 2) return open === 2 ? 120 : 15;
  return open === 2 ? 10 : 2;
}

function cellScore(b, n, r, c, p) {
  let total = 0;
  for (const [dr, dc] of DIRS) {
    let cnt = 1;
    let open = 0;
    for (const s of [1, -1]) {
      let rr = r + dr * s; let cc = c + dc * s;
      while (rr >= 0 && rr < n && cc >= 0 && cc < n && b[rr * n + cc] === p) { cnt++; rr += dr * s; cc += dc * s; }
      if (rr >= 0 && rr < n && cc >= 0 && cc < n && !b[rr * n + cc]) open++;
    }
    total += patternScore(cnt, open);
  }
  return total;
}

/**
 * 15×15 beşli dizi için basit sezgisel bilgisayar.
 * Önce kendi kazanan hamlesini, sonra rakibin kazanan hamlesini engeller; sonra saldırı + savunma puanına bakar.
 * level 'easy' ise zaman zaman rastgele komşu hücre oynar (engellemeyi kaçırabilir).
 */
export function gomokuMove(board, n, me, level = 'hard', rnd = Math.random) {
  const opp = other(me);
  const mid = (n - 1) / 2;
  const stones = [];
  board.forEach((v, i) => { if (v) stones.push(i); });
  if (!stones.length) return Math.floor(mid) * n + Math.floor(mid);

  // Adaylar: herhangi bir taşa 2 hücre içindeki boş hücreler (kolay modda rastgele seçim için 1 hücre içindekiler ayrıca tutulur).
  const cand = new Set();
  const near = new Set();
  for (const s of stones) {
    const sr = Math.floor(s / n); const sc = s % n;
    for (let dr = -2; dr <= 2; dr++) {
      for (let dc = -2; dc <= 2; dc++) {
        const r = sr + dr; const c = sc + dc;
        if (r < 0 || r >= n || c < 0 || c >= n || board[r * n + c]) continue;
        cand.add(r * n + c);
        if (Math.abs(dr) <= 1 && Math.abs(dc) <= 1) near.add(r * n + c);
      }
    }
  }
  if (!cand.size) { const e = board.findIndex((v) => !v); return e; }

  let bestScore = -1;
  let bests = [];
  for (const idx of cand) {
    const r = Math.floor(idx / n); const c = idx % n;
    const att = cellScore(board, n, r, c, me);
    const def = cellScore(board, n, r, c, opp);
    let s;
    if (att >= 100000) s = 1e9; // hemen kazan
    else if (def >= 100000) s = 1e8; // rakibin beşlisini engelle
    else s = att + def * 1.05 + (mid - Math.max(Math.abs(r - mid), Math.abs(c - mid))) * 0.5;
    if (s > bestScore) { bestScore = s; bests = [idx]; } else if (s === bestScore) bests.push(idx);
  }
  if (level === 'easy' && bestScore < 1e9 && rnd() < 0.45) {
    const pool = [...near];
    if (pool.length) return pool[Math.floor(rnd() * pool.length) % pool.length];
  }
  return bests[Math.floor(rnd() * bests.length) % bests.length];
}

// ---------- Depolama ----------
function loadStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function saveStore(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* özel gezinti vb. */ }
}

// ---------- Arayüz ----------
const MARK = {
  X: '<svg class="xo-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5L19 19M19 5L5 19"/></svg>',
  O: '<svg class="xo-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="7"/></svg>',
};

function init() {
  const $ = (id) => document.getElementById(id);
  const el = {
    box: $('oyun-kutusu'), board: $('xo-board'), mode: $('xo-mode'), opp: $('xo-opp'), side: $('xo-side'), sideField: $('xo-side-field'),
    status: $('xo-status'), hint: $('xo-hint'), result: $('xo-result'), resultTitle: $('xo-result-title'), resultText: $('xo-result-text'),
    chipX: $('xo-chip-x'), chipO: $('xo-chip-o'), la: $('xo-la'), lb: $('xo-lb'), sa: $('xo-sa'), sb: $('xo-sb'), sd: $('xo-sd'),
  };

  const store = loadStore();
  store.scores = store.scores || {};
  store.prefs = store.prefs || {};
  if (['xox', 'gomoku'].includes(store.prefs.mode)) el.mode.value = store.prefs.mode;
  if (['easy', 'hard', 'two'].includes(store.prefs.opp)) el.opp.value = store.prefs.opp;
  if (['X', 'O'].includes(store.prefs.side)) el.side.value = store.prefs.side;

  let mode = 'xox'; let n = 3; let need = 3; let opp = 'hard';
  let human = 'X'; let cpu = 'O';
  let board = []; let cells = [];
  let turn = 'X'; let over = false; let busy = false; let last = -1; let gen = 0; let focusIdx = 4;

  const scoreKey = () => mode + '|' + opp;
  const getScore = () => (store.scores[scoreKey()] = store.scores[scoreKey()] || { a: 0, b: 0, d: 0 });

  /** İşaretin ekranda görünen oyuncu adı. */
  function nameOf(sym) {
    if (opp === 'two') return sym === 'X' ? 'Oyuncu 1' : 'Oyuncu 2';
    return sym === human ? 'Sen' : 'Bilgisayar';
  }
  /** Skor tablosunda 'a' (sen / oyuncu 1) ve 'b' (bilgisayar / oyuncu 2) hangi işaretle oynuyor. */
  const symOfRole = (role) => (opp === 'two' ? (role === 'a' ? 'X' : 'O') : (role === 'a' ? human : cpu));
  const roleOfSym = (sym) => (symOfRole('a') === sym ? 'a' : 'b');

  function setStatus(t) { el.status.textContent = t; }

  function renderScore() {
    const s = getScore();
    el.la.textContent = nameOf(symOfRole('a')) + ' (' + symOfRole('a') + ')';
    el.lb.textContent = nameOf(symOfRole('b')) + ' (' + symOfRole('b') + ')';
    el.sa.textContent = String(s.a);
    el.sb.textContent = String(s.b);
    el.sd.textContent = String(s.d);
  }

  function renderTurn() {
    el.chipX.querySelector('span').textContent = 'X · ' + nameOf('X');
    el.chipO.querySelector('span').textContent = 'O · ' + nameOf('O');
    el.chipX.setAttribute('aria-current', !over && turn === 'X' ? 'true' : 'false');
    el.chipO.setAttribute('aria-current', !over && turn === 'O' ? 'true' : 'false');
  }

  function turnStatus() {
    if (opp !== 'two' && turn === cpu) return 'Bilgisayar düşünüyor…';
    if (opp === 'two') return 'Sıra: ' + nameOf(turn) + ' (' + turn + ').';
    return 'Sıra sende (' + turn + ').';
  }

  function cellLabel(i) {
    const r = Math.floor(i / n) + 1; const c = (i % n) + 1;
    const v = board[i];
    return 'Satır ' + r + ', sütun ' + c + ', ' + (v || 'boş');
  }

  function buildBoard() {
    el.board.textContent = '';
    el.board.dataset.n = String(n);
    el.board.style.setProperty('--n', String(n));
    el.board.setAttribute('aria-label', mode === 'xox'
      ? 'XOX tahtası, 3 satır 3 sütun. Ok tuşlarıyla gezinin, Enter veya Boşluk ile işaretleyin.'
      : 'Beşli dizi tahtası, 15 satır 15 sütun. Ok tuşlarıyla gezinin, Enter veya Boşluk ile taş koyun.');
    cells = [];
    for (let i = 0; i < n * n; i++) {
      const r = Math.floor(i / n); const c = i % n;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'xo-cell' + (c < n - 1 ? ' br' : '') + (r < n - 1 ? ' bb' : '');
      b.dataset.i = String(i);
      b.dataset.v = '';
      b.setAttribute('aria-disabled', 'false');
      b.setAttribute('aria-label', cellLabel(i));
      b.tabIndex = -1;
      b.addEventListener('click', () => { setFocus(i, false); onCell(i); });
      el.board.appendChild(b);
      cells.push(b);
    }
    // Kazanan çizgi katmanı (hücre birimleriyle: 1 hücre = 1 birim)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'xo-line');
    svg.setAttribute('viewBox', '0 0 ' + n + ' ' + n);
    svg.setAttribute('aria-hidden', 'true');
    el.board.appendChild(svg);
    focusIdx = Math.floor((n * n) / 2);
    setFocus(focusIdx, false);
  }

  function setFocus(i, move) {
    focusIdx = Math.max(0, Math.min(n * n - 1, i));
    cells.forEach((c, k) => { c.tabIndex = k === focusIdx ? 0 : -1; });
    if (move) cells[focusIdx].focus();
  }

  function paint(i, sym) {
    const c = cells[i];
    c.dataset.v = sym;
    c.innerHTML = MARK[sym];
    c.setAttribute('aria-disabled', 'true');
    c.setAttribute('aria-label', cellLabel(i));
    if (last >= 0 && cells[last]) cells[last].classList.remove('is-last');
    c.classList.add('is-last');
  }

  function drawLine(run) {
    const a = run[0]; const z = run[run.length - 1];
    const x0 = (a % n) + 0.5; const y0 = Math.floor(a / n) + 0.5;
    const x1 = (z % n) + 0.5; const y1 = Math.floor(z / n) + 0.5;
    const dx = x1 - x0; const dy = y1 - y0;
    const len = Math.hypot(dx, dy) || 1;
    const ext = n === 3 ? 0.3 : 0.32; // çizgi uçları hücre kenarlarına taşsın
    const ax = x0 - (dx / len) * ext; const ay = y0 - (dy / len) * ext;
    const bx = x1 + (dx / len) * ext; const by = y1 + (dy / len) * ext;
    const svg = el.board.querySelector('.xo-line');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', ax.toFixed(3)); line.setAttribute('y1', ay.toFixed(3));
    line.setAttribute('x2', bx.toFixed(3)); line.setAttribute('y2', by.toFixed(3));
    line.setAttribute('stroke-width', n === 3 ? '0.09' : '0.2');
    line.style.setProperty('--len', Math.hypot(bx - ax, by - ay).toFixed(3));
    svg.textContent = '';
    svg.appendChild(line);
  }

  function endGame(winnerSym, run) {
    over = true;
    busy = false;
    cells.forEach((c) => c.setAttribute('aria-disabled', 'true'));
    const s = getScore();
    let title; let text;
    if (run) {
      run.forEach((i) => cells[i].classList.add('is-win'));
      drawLine(run);
      s[roleOfSym(winnerSym)]++;
      if (opp === 'two') {
        title = nameOf(winnerSym) + ' (' + winnerSym + ') kazandı!';
        text = (need === 3 ? 'Üç işaret yan yana geldi.' : 'Beş taş yan yana geldi.') + ' Yeni oyun için düğmeye basın.';
      } else if (winnerSym === human) {
        title = 'Tebrikler, kazandınız!';
        text = 'Skor tablosu güncellendi.';
      } else {
        title = 'Bilgisayar kazandı.';
        text = mode === 'xox' && opp === 'hard'
          ? 'Zor seviyedeki bilgisayar yenilmezdir; en iyi sonuç beraberliktir.'
          : 'Bir sonraki oyunda daha iyi bir hamle sırası deneyin.';
      }
    } else {
      s.d++;
      title = 'Berabere!';
      text = 'Tahta doldu ve kimse dizi tamamlayamadı.';
    }
    saveStore(store);
    renderScore();
    renderTurn();
    el.resultTitle.textContent = title;
    el.resultText.textContent = text;
    el.result.classList.add('is-active');
    setStatus(title);
  }

  function place(i, sym) {
    board[i] = sym;
    paint(i, sym);
    last = i;
    const run = checkWinAt(board, n, i, need);
    if (run) { endGame(sym, run); return; }
    if (board.every(Boolean)) { endGame(null, null); return; }
    turn = other(sym);
    renderTurn();
    setStatus(turnStatus());
    maybeCpu();
  }

  function maybeCpu() {
    if (over || opp === 'two' || turn !== cpu) return;
    busy = true;
    const g = gen;
    setTimeout(() => {
      if (g !== gen || over) return;
      busy = false;
      let idx;
      if (mode === 'xox') idx = opp === 'hard' ? bestMove3(board, cpu) : randomMove(board);
      else idx = gomokuMove(board, n, cpu, opp === 'hard' ? 'hard' : 'easy');
      place(idx, cpu);
    }, CPU_DELAY);
  }

  function onCell(i) {
    if (over || busy || board[i]) return;
    if (opp !== 'two' && turn === cpu) return;
    place(i, turn);
  }

  function newGame() {
    gen++;
    mode = el.mode.value === 'gomoku' ? 'gomoku' : 'xox';
    ({ n, need } = MODES[mode]);
    opp = ['easy', 'hard', 'two'].includes(el.opp.value) ? el.opp.value : 'hard';
    human = el.side.value === 'O' ? 'O' : 'X';
    cpu = opp === 'two' ? null : other(human);
    el.sideField.hidden = opp === 'two';
    el.hint.textContent = mode === 'xox'
      ? 'Aynı işaretten üçünü yatay, dikey ya da çapraz sıraya dizen kazanır. X her zaman ilk başlar.'
      : 'Aynı işaretten beşini (ya da daha fazlasını) yatay, dikey ya da çapraz sıraya dizen kazanır. X ilk başlar.';
    board = Array(n * n).fill('');
    turn = 'X';
    over = false;
    busy = false;
    last = -1;
    el.result.classList.remove('is-active');
    buildBoard();
    renderScore();
    renderTurn();
    setStatus(turnStatus());
    store.prefs = { mode, opp, side: human };
    saveStore(store);
    maybeCpu();
  }

  // Klavye: ok tuşlarıyla hücreler arasında gezinme (roving tabindex)
  el.board.addEventListener('keydown', (e) => {
    const cur = Number(e.target.closest('.xo-cell')?.dataset.i ?? focusIdx);
    const r = Math.floor(cur / n); const c = cur % n;
    let to = null;
    switch (e.key) {
      case 'ArrowRight': if (c < n - 1) to = cur + 1; break;
      case 'ArrowLeft': if (c > 0) to = cur - 1; break;
      case 'ArrowDown': if (r < n - 1) to = cur + n; break;
      case 'ArrowUp': if (r > 0) to = cur - n; break;
      case 'Home': to = r * n; break;
      case 'End': to = r * n + n - 1; break;
      default: return;
    }
    e.preventDefault();
    if (to !== null) setFocus(to, true);
  });

  [el.mode, el.opp, el.side].forEach((s) => s.addEventListener('change', newGame));
  $('xo-restart').addEventListener('click', newGame);
  $('xo-again').addEventListener('click', () => { newGame(); setFocus(focusIdx, true); });
  $('xo-reset-score').addEventListener('click', () => {
    store.scores[scoreKey()] = { a: 0, b: 0, d: 0 };
    saveStore(store);
    renderScore();
  });

  // Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
  const fsBtn = $('xo-full');
  if (!document.fullscreenEnabled) {
    fsBtn.hidden = true;
  } else {
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else el.box.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => {
      fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    });
  }

  newGame();
}

if (typeof document !== 'undefined' && document.getElementById('xo-board')) init();
