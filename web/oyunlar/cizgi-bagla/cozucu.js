// Çizgi Bağla çözücüsü: yalnızca saf fonksiyonlar (DOM yok); tarayıcıda ve Node'da çalışır.
// Bulmaca: n×n ızgara ve her renk için iki uç hücre. Çözüm: her renk çiftini birleştiren, birbirini
// kesmeyen ve ızgaranın TAMAMINI dolduran yollar. Çözücü yolları kenar kenar sayar; bir yolun kendine
// komşu geçmesine de izin verir. Böylece "tek çözüm" oyuncunun çizebileceği her geçerli tahtayı kapsar.
// Hücre numarası: satır * n + sütun.

export const DIRS = { R: [0, 1], L: [0, -1], D: [1, 0], U: [-1, 0] };

// "12:RRDL" biçimindeki yol kodunu hücre listesine çevirir (başlangıç hücresi + yön harfleri).
export function decodePath(n, code) {
  const sep = code.indexOf(':');
  let i = Number(code.slice(0, sep));
  const out = [i];
  for (const ch of code.slice(sep + 1)) {
    const d = DIRS[ch];
    if (!d) throw new Error(`Geçersiz yön: ${ch}`);
    const r = Math.floor(i / n) + d[0];
    const c = (i % n) + d[1];
    if (r < 0 || c < 0 || r >= n || c >= n) throw new Error('Yol ızgaranın dışına çıkıyor');
    i = r * n + c;
    out.push(i);
  }
  return out;
}

// Hücre listesini yol koduna çevirir (üretici betik kullanır).
export function encodePath(n, cells) {
  let s = `${cells[0]}:`;
  for (let k = 1; k < cells.length; k++) {
    const d = cells[k] - cells[k - 1];
    s += d === 1 ? 'R' : d === -1 ? 'L' : d === n ? 'D' : 'U';
  }
  return s;
}

// Veri kaydını { n, paths, pairs } yapısına açar.
export function decodePuzzle(p) {
  const paths = p.paths.map((code) => decodePath(p.n, code));
  const pairs = paths.map((pa) => [pa[0], pa[pa.length - 1]]);
  return { n: p.n, paths, pairs };
}

export function areAdjacent(n, a, b) {
  const d = Math.abs(a - b);
  return (d === n) || (d === 1 && Math.floor(a / n) === Math.floor(b / n));
}

// Yollar geçerli bir tam çözüm mü? (komşu adımlar, uçlar doğru, her hücre tam bir kez)
export function isCompleteSolution(n, pairs, paths) {
  if (!Array.isArray(paths) || paths.length !== pairs.length) return false;
  const seen = new Uint8Array(n * n);
  for (let c = 0; c < pairs.length; c++) {
    const p = paths[c];
    if (!Array.isArray(p) || p.length < 2) return false;
    const [a, b] = pairs[c];
    const okEnds = (p[0] === a && p[p.length - 1] === b) || (p[0] === b && p[p.length - 1] === a);
    if (!okEnds) return false;
    for (let k = 0; k < p.length; k++) {
      const x = p[k];
      if (!Number.isInteger(x) || x < 0 || x >= n * n || seen[x]) return false;
      seen[x] = 1;
      if (k && !areAdjacent(n, p[k - 1], x)) return false;
    }
  }
  return seen.every((v) => v === 1);
}

function neighbours(n) {
  const nb = [];
  for (let i = 0; i < n * n; i++) {
    const r = Math.floor(i / n);
    const c = i % n;
    const list = [];
    if (r > 0) list.push(i - n);
    if (c < n - 1) list.push(i + 1);
    if (r < n - 1) list.push(i + n);
    if (c > 0) list.push(i - 1);
    nb.push(list);
  }
  return nb;
}

// Çözümleri sayar (limit'e ulaşınca durur). Dönüş: { count, solution, nodes, aborted }.
// count === 1 ve aborted === false ise bulmaca tek çözümlüdür; solution o çözümün yollarıdır
// (her yol pairs[c][0] ya da pairs[c][1] ucundan başlar).
export function solve(n, pairs, opts = {}) {
  const limit = opts.limit ?? 2;
  const maxNodes = opts.maxNodes ?? 4000000;
  const N = n * n;
  const K = pairs.length;
  const nb = neighbours(n);
  const owner = new Int16Array(N).fill(-1);
  const head = new Int32Array(K);
  const target = new Int32Array(K);
  const done = new Uint8Array(K);
  const paths = [];
  const freeCount = (i) => nb[i].reduce((a, j) => a + (owner[j] === -1 ? 1 : 0), 0);

  for (let c = 0; c < K; c++) {
    const [a, b] = pairs[c];
    if (!(a >= 0 && a < N && b >= 0 && b < N) || a === b || owner[a] !== -1 || owner[b] !== -1) {
      return { count: 0, solution: null, nodes: 0, aborted: false };
    }
    owner[a] = c;
    owner[b] = c;
  }
  for (let c = 0; c < K; c++) {
    // Daha dar uçtan başla: dallanma azalır
    const [a, b] = pairs[c];
    const startA = freeCount(a) <= freeCount(b);
    head[c] = startA ? a : b;
    target[c] = startA ? b : a;
    paths.push([head[c]]);
  }

  let empty = N - 2 * K;
  let doneCount = 0;
  let count = 0;
  let nodes = 0;
  let aborted = false;
  let solution = null;
  const comp = new Int32Array(N);
  const stack = new Int32Array(N);
  const served = new Uint8Array(N);

  function feasible() {
    // 1) Boş hücre çıkmazı: her boş hücre bir yolun ara hücresi olacak; en az iki olası komşusu olmalı
    for (let i = 0; i < N; i++) {
      if (owner[i] !== -1) continue;
      let k = 0;
      const list = nb[i];
      for (let q = 0; q < list.length && k < 2; q++) {
        const j = list[q];
        const o = owner[j];
        if (o === -1) k++;
        else if (!done[o] && (head[o] === j || target[o] === j)) k++;
      }
      if (k < 2) return false;
    }
    // 2) Boş bölgeler: her rengin başı ile hedefi aynı bölgeye değmeli; her bölgeye bir renk girebilmeli
    comp.fill(-1);
    let nc = 0;
    for (let i = 0; i < N; i++) {
      if (owner[i] !== -1 || comp[i] !== -1) continue;
      let sp = 0;
      stack[sp++] = i;
      comp[i] = nc;
      while (sp) {
        const x = stack[--sp];
        const list = nb[x];
        for (let q = 0; q < list.length; q++) {
          const j = list[q];
          if (owner[j] === -1 && comp[j] === -1) { comp[j] = nc; stack[sp++] = j; }
        }
      }
      served[nc] = 0;
      nc++;
    }
    if (nc > K - doneCount) return false; // her rengin kalan yolu en çok bir bölgeyi doldurabilir
    for (let c = 0; c < K; c++) {
      if (done[c]) continue;
      const h = head[c];
      const t = target[c];
      let ok = false;
      const hl = nb[h];
      const tl = nb[t];
      for (let q = 0; q < hl.length; q++) {
        const j = hl[q];
        if (j === t) { ok = true; continue; }
        if (owner[j] !== -1) continue;
        const k = comp[j];
        for (let w = 0; w < tl.length; w++) {
          const u = tl[w];
          if (owner[u] === -1 && comp[u] === k) { ok = true; served[k] = 1; break; }
        }
      }
      if (!ok) return false;
    }
    for (let k = 0; k < nc; k++) if (!served[k]) return false;
    return true;
  }

  function rec() {
    if (aborted) return;
    if (++nodes > maxNodes) { aborted = true; return; }
    if (doneCount === K) {
      if (empty === 0) {
        count++;
        if (!solution) solution = paths.map((p) => p.slice());
      }
      return;
    }
    if (!feasible()) return;
    // En az seçeneği olan rengin başını ilerlet
    let best = -1;
    let bestCnt = 5;
    for (let c = 0; c < K; c++) {
      if (done[c]) continue;
      const h = head[c];
      let cnt = 0;
      for (const j of nb[h]) if (owner[j] === -1 || j === target[c]) cnt++;
      if (cnt === 0) return;
      if (cnt < bestCnt) { bestCnt = cnt; best = c; if (cnt === 1) break; }
    }
    const c = best;
    const h = head[c];
    const t = target[c];
    const moves = nb[h].filter((j) => owner[j] === -1 || j === t);
    for (const j of moves) {
      if (j === t) {
        done[c] = 1; doneCount++; paths[c].push(t);
        rec();
        paths[c].pop(); doneCount--; done[c] = 0;
      } else {
        owner[j] = c; head[c] = j; empty--; paths[c].push(j);
        rec();
        paths[c].pop(); empty++; head[c] = h; owner[j] = -1;
      }
      if (aborted || count >= limit) return;
    }
  }

  rec();
  return { count, solution, nodes, aborted };
}
