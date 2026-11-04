// Nonogram çözücü ve üretici: yalnızca saf fonksiyonlar (DOM yok), tarayıcıda ve Node'da çalışır.
// Tek çözüm kanıtı: satır/sütun mantığı ("hiç tahmin yürütmeden") tüm hücreleri belirliyorsa
// bulmaca tek çözümlüdür. Hücre değerleri: -1 bilinmiyor, 0 boş, 1 dolu.

// Bir çizgideki dolu hücre öbeklerinin uzunlukları (boşsa [0] döner; ipucu gösterimi için).
export function runsOf(line) {
  const runs = [];
  let n = 0;
  for (const v of line) {
    if (v === 1) n += 1;
    else if (n) { runs.push(n); n = 0; }
  }
  if (n) runs.push(n);
  return runs.length ? runs : [0];
}

// Kare ya da dikdörtgen ızgaradan (0/1) satır ve sütun ipuçlarını çıkarır.
export function computeClues(grid) {
  const rows = grid.map((r) => runsOf(r));
  const w = grid[0].length;
  const cols = [];
  for (let c = 0; c < w; c++) cols.push(runsOf(grid.map((r) => r[c])));
  return { rows, cols };
}

// Ipucu dizisi [0] "boş çizgi" demektir; çözücü için öbek listesi boş olmalı.
const normClue = (clue) => (clue.length === 1 && clue[0] === 0 ? [] : clue);

// Bir çizgiyi bilinen hücrelerle uyumlu tüm yerleşimleri deneyerek çözer.
// Dönüş: yeni çizgi (kesinleşen hücreler doldurulmuş) ya da hiç yerleşim yoksa null (çelişki).
export function solveLine(rawClue, line) {
  const clue = normClue(rawClue);
  const n = line.length;
  const k = clue.length;
  // need[j]: j. öbekten sona kadar gereken en az hücre sayısı (aralarındaki boşluklar dahil)
  const need = new Array(k + 1).fill(0);
  for (let j = k - 1; j >= 0; j--) need[j] = clue[j] + (j < k - 1 ? 1 + need[j + 1] : 0);

  const allFilled = new Array(n).fill(1);
  const allEmpty = new Array(n).fill(1);
  const cur = new Array(n).fill(0);
  let found = 0;

  function rec(j, pos) {
    if (j === k) {
      for (let i = pos; i < n; i++) if (line[i] === 1) return; // artakalan hücreler boş olmalı
      found += 1;
      for (let i = 0; i < n; i++) {
        if (cur[i]) allEmpty[i] = 0;
        else allFilled[i] = 0;
      }
      return;
    }
    const len = clue[j];
    for (let s = pos; s <= n - need[j]; s++) {
      if (s > pos && line[s - 1] === 1) break; // atlanan hücre dolu olmak zorunda: daha ileri başlangıç geçersiz
      let ok = true;
      for (let i = s; i < s + len; i++) if (line[i] === 0) { ok = false; break; }
      if (ok && s + len < n && line[s + len] === 1) ok = false; // öbekten sonraki hücre boş kalmalı
      if (!ok) continue;
      for (let i = s; i < s + len; i++) cur[i] = 1;
      rec(j + 1, s + len + 1);
      for (let i = s; i < s + len; i++) cur[i] = 0;
    }
  }
  rec(0, 0);
  if (!found) return null;
  return line.map((v, i) => (allFilled[i] ? 1 : allEmpty[i] ? 0 : v));
}

// Satır/sütun mantığını değişmez noktaya kadar uygular.
// Dönüş: { solved, contradiction, grid }. solved=true ise tek çözüm grid'dir.
export function solveGrid(rowClues, colClues) {
  const h = rowClues.length;
  const w = colClues.length;
  const grid = Array.from({ length: h }, () => new Array(w).fill(-1));
  let changed = true;
  let guard = 0;
  while (changed && guard++ < 200) {
    changed = false;
    for (let r = 0; r < h; r++) {
      const res = solveLine(rowClues[r], grid[r]);
      if (!res) return { solved: false, contradiction: true, grid };
      for (let c = 0; c < w; c++) if (res[c] !== grid[r][c]) { grid[r][c] = res[c]; changed = true; }
    }
    for (let c = 0; c < w; c++) {
      const col = grid.map((row) => row[c]);
      const res = solveLine(colClues[c], col);
      if (!res) return { solved: false, contradiction: true, grid };
      for (let r = 0; r < h; r++) if (res[r] !== grid[r][c]) { grid[r][c] = res[r]; changed = true; }
    }
  }
  const solved = grid.every((row) => row.every((v) => v !== -1));
  return { solved, contradiction: false, grid };
}

// Verilen 0/1 ızgara satır/sütun mantığıyla tek çözümlü mü?
export function isLineSolvable(grid) {
  const { rows, cols } = computeClues(grid);
  const res = solveGrid(rows, cols);
  if (!res.solved) return false;
  return res.grid.every((row, r) => row.every((v, c) => v === grid[r][c]));
}

// Rastgele bir ızgara üretip tek çözümlü ise döndürür; değilse null.
// Çağıran, null gelirse tekrar dener (ağır işi parçalayıp arayüzü dondurmamak için tek deneme).
export function tryRandomPuzzle(size, rnd = Math.random) {
  const density = 0.52 + rnd() * 0.16;
  const grid = [];
  let filled = 0;
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      const v = rnd() < density ? 1 : 0;
      filled += v;
      row.push(v);
    }
    grid.push(row);
  }
  const ratio = filled / (size * size);
  if (ratio < 0.4 || ratio > 0.72) return null;
  // Tamamen boş satır ya da sütun bulmacayı sıkıcı yapar
  for (let i = 0; i < size; i++) {
    if (grid[i].every((v) => v === 0)) return null;
    if (grid.every((row) => row[i] === 0)) return null;
  }
  return isLineSolvable(grid) ? grid : null;
}
