// Kutu itme: harita ayrıştırıcı, ölü kare hesabı ve BFS çözücü. Yalnızca saf fonksiyonlar (DOM yok);
// tarayıcıda (oyun ve testler) ve Node'da (seviye doğrulama) aynı biçimde çalışır.
//
// Harita biçimi (bulmaca türünün yaygın metin biçimi): '#' duvar, ' ' zemin, '.' hedef, '$' kutu,
// '*' hedefteki kutu, '@' oyuncu, '+' hedefteki oyuncu. Satırlar farklı uzunlukta olabilir; duvarların
// dışında kalan boşluklar oyun alanı sayılmaz. Hamle yazımı: küçük harf yürüme (u d l r), büyük harf itme.

export const DIR_KEYS = 'udlr';
const DX = [0, 0, -1, 1];
const DY = [-1, 1, 0, 0];

// Harita satırlarını oyun modeline çevirir; geçersiz haritada Türkçe hata fırlatır.
export function parseLevel(rows) {
  if (!Array.isArray(rows) || rows.length === 0 || rows.some((r) => typeof r !== 'string')) {
    throw new Error('Harita boş ya da geçersiz.');
  }
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  if (w < 3 || h < 3 || w > 60 || h > 60) throw new Error('Harita boyutu desteklenmiyor.');
  const n = w * h;
  const walls = new Uint8Array(n);
  const goals = new Uint8Array(n);
  const inside = new Uint8Array(n);
  const boxes = [];
  let player = -1;
  let players = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ch = rows[y][x] || ' ';
      const i = y * w + x;
      switch (ch) {
        case '#': walls[i] = 1; break;
        case ' ': case '-': case '_': break;
        case '.': goals[i] = 1; break;
        case '$': boxes.push(i); break;
        case '*': boxes.push(i); goals[i] = 1; break;
        case '@': player = i; players++; break;
        case '+': player = i; players++; goals[i] = 1; break;
        default: throw new Error(`Haritada bilinmeyen karakter: "${ch}".`);
      }
    }
  }
  if (players !== 1) throw new Error('Haritada tam olarak bir oyuncu olmalı.');
  // Oyuncudan taşma doldurma: ulaşılan hücreler oyun alanıdır; kenara ulaşılırsa harita kapalı değildir
  const stack = [player];
  inside[player] = 1;
  while (stack.length) {
    const c = stack.pop();
    const cx = c % w;
    const cy = (c - cx) / w;
    for (let d = 0; d < 4; d++) {
      const nx = cx + DX[d];
      const ny = cy + DY[d];
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) throw new Error('Harita dört bir yandan duvarla kapalı değil.');
      const ni = ny * w + nx;
      if (walls[ni] || inside[ni]) continue;
      inside[ni] = 1;
      stack.push(ni);
    }
  }
  let goalCount = 0;
  for (let i = 0; i < n; i++) {
    if (!goals[i]) continue;
    if (!inside[i]) throw new Error('Bir hedef oyuncunun ulaşamayacağı yerde.');
    goalCount++;
  }
  if (boxes.some((b) => !inside[b])) throw new Error('Bir kutu oyuncunun ulaşamayacağı yerde.');
  if (boxes.length === 0) throw new Error('Haritada en az bir kutu olmalı.');
  if (boxes.length !== goalCount) throw new Error('Kutu ve hedef sayısı eşit olmalı.');
  boxes.sort((a, b) => a - b);
  return { w, h, walls, goals, inside, boxes, player, offsets: [-w, w, -1, 1] };
}

// Bir kutunun (diğer kutular yokmuş gibi) en az bir hedefe itilebildiği kareler. Hedeflerden geriye
// "çekme" ile bulunur: kutu x'ten x+d'ye çekilirken oyuncu x+d'de durur ve x+2d'ye geçer.
// Oyun alanındaki hücrelerin komşuları her zaman ızgara içindedir (kenara değen hücre olamaz).
export function liveSquares(L) {
  const { inside, goals, offsets } = L;
  const live = new Uint8Array(inside.length);
  const queue = [];
  for (let i = 0; i < goals.length; i++) if (goals[i]) { live[i] = 1; queue.push(i); }
  while (queue.length) {
    const x = queue.pop();
    for (const o of offsets) {
      const b = x + o;
      if (live[b] || !inside[b] || !inside[b + o]) continue;
      live[b] = 1;
      queue.push(b);
    }
  }
  return live;
}

// Oyun alanında olup hiçbir hedefe itilemeyen kareler (köşeler, hedefsiz duvar kenarları…).
export function deadSquares(L) {
  const live = liveSquares(L);
  const dead = new Uint8Array(live.length);
  for (let i = 0; i < live.length; i++) if (L.inside[i] && !live[i]) dead[i] = 1;
  return dead;
}

// 2×2 kilit: yeni konumdaki kutuyu içeren 2×2 karelerden biri tamamen duvar/kutuysa ve içinde
// hedefte olmayan bir kutu varsa o kutular bir daha hiç hareket edemez.
export function frozenAt(L, occ, t) {
  const { w, inside, goals } = L;
  const blocked = (c) => !inside[c] || occ[c] === 1;
  for (const [sx, sy] of [[-1, -1], [0, -1], [-1, 0], [0, 0]]) {
    const a = t + sy * w + sx;
    const cells = [a, a + 1, a + w, a + w + 1];
    if (!cells.every(blocked)) continue;
    if (cells.some((c) => occ[c] === 1 && !goals[c])) return true;
  }
  return false;
}

// İki nokta arasında kutulara çarpmadan en kısa yürüyüş (küçük harfli yön dizisi) ya da null.
export function walkPath(L, occ, from, to) {
  if (from === to) return '';
  const { inside, offsets } = L;
  const prev = new Int32Array(inside.length).fill(-1);
  const how = new Int8Array(inside.length);
  const queue = [from];
  prev[from] = from;
  for (let head = 0; head < queue.length; head++) {
    const c = queue[head];
    for (let d = 0; d < 4; d++) {
      const nc = c + offsets[d];
      if (prev[nc] !== -1 || !inside[nc] || occ[nc] === 1) continue;
      prev[nc] = c;
      how[nc] = d;
      if (nc === to) {
        let s = '';
        for (let k = to; k !== from; k = prev[k]) s = DIR_KEYS[how[k]] + s;
        return s;
      }
      queue.push(nc);
    }
  }
  return null;
}

// Genişlik öncelikli arama (BFS) ile en az itmeli çözüm. Durum = kutu konumları + oyuncunun
// ulaşabildiği bölge (bölgedeki en küçük hücre numarasıyla temsil edilir).
// Dönüş: { pushes, moves, solution, states } ya da çözüm yoksa / sınır aşılırsa null.
export function solve(L, opts = {}) {
  const maxStates = opts.maxStates || 2000000;
  const { inside, goals, offsets } = L;
  const n = inside.length;
  const live = liveSquares(L);
  const occ = new Uint8Array(n);
  const seen = new Int32Array(n);
  const queueBuf = new Int32Array(n);
  let stamp = 0;

  // Oyuncunun ulaşabildiği hücreleri seen[]=stamp ile işaretler, en küçük hücreyi döndürür
  function reach(p) {
    stamp++;
    let head = 0;
    let tail = 0;
    let min = p;
    queueBuf[tail++] = p;
    seen[p] = stamp;
    while (head < tail) {
      const c = queueBuf[head++];
      for (let d = 0; d < 4; d++) {
        const nc = c + offsets[d];
        if (seen[nc] === stamp || !inside[nc] || occ[nc] === 1) continue;
        seen[nc] = stamp;
        if (nc < min) min = nc;
        queueBuf[tail++] = nc;
      }
    }
    return min;
  }
  const keyOf = (boxes, norm) => String.fromCharCode(norm, ...boxes);
  const isSolved = (boxes) => boxes.every((b) => goals[b] === 1);

  const start = L.boxes.slice().sort((a, b) => a - b);
  if (start.some((b) => !live[b] && !goals[b])) return null;
  for (const b of start) occ[b] = 1;
  const startNorm = reach(L.player);
  for (const b of start) occ[b] = 0;
  const states = [{ boxes: start, player: L.player, parent: -1, from: -1, dir: -1 }];
  const visited = new Set([keyOf(start, startNorm)]);
  let goalIdx = isSolved(start) ? 0 : -1;

  for (let head = 0; head < states.length && goalIdx < 0; head++) {
    const s = states[head];
    for (const b of s.boxes) occ[b] = 1;
    reach(s.player);
    const reachStamp = stamp;
    const reachable = (c) => seen[c] === reachStamp;
    // reach() aşağıda yeniden çağrılınca seen[] değişir; önce olası itmeleri topla
    const pushes = [];
    for (let bi = 0; bi < s.boxes.length; bi++) {
      const b = s.boxes[bi];
      for (let d = 0; d < 4; d++) {
        const t = b + offsets[d];
        if (!reachable(b - offsets[d]) || !inside[t] || occ[t] === 1 || !live[t]) continue;
        pushes.push(bi, d);
      }
    }
    for (let k = 0; k < pushes.length && goalIdx < 0; k += 2) {
      const bi = pushes[k];
      const d = pushes[k + 1];
      const b = s.boxes[bi];
      const t = b + offsets[d];
      occ[b] = 0;
      occ[t] = 1;
      if (!frozenAt(L, occ, t)) {
        const nb = s.boxes.slice();
        nb[bi] = t;
        nb.sort((x, y) => x - y);
        const norm = reach(b);
        const key = keyOf(nb, norm);
        if (!visited.has(key)) {
          visited.add(key);
          states.push({ boxes: nb, player: b, parent: head, from: b, dir: d });
          if (isSolved(nb)) goalIdx = states.length - 1;
          if (states.length > maxStates) { for (const x of s.boxes) occ[x] = 0; occ[t] = 0; return null; }
        }
      }
      occ[t] = 0;
      occ[b] = 1;
    }
    for (const x of s.boxes) occ[x] = 0;
  }
  if (goalIdx < 0) return null;

  // Çözümü geriye doğru topla, sonra yürüyüş yollarını ekleyerek tam hamle dizisini kur
  const chain = [];
  for (let i = goalIdx; i > 0; i = states[i].parent) chain.push(states[i]);
  chain.reverse();
  let solution = '';
  let player = L.player;
  let boxes = start.slice();
  for (const step of chain) {
    occ.fill(0);
    for (const b of boxes) occ[b] = 1;
    const walk = walkPath(L, occ, player, step.from - offsets[step.dir]);
    solution += walk + DIR_KEYS[step.dir].toUpperCase();
    boxes = boxes.map((b) => (b === step.from ? step.from + offsets[step.dir] : b));
    player = step.from;
  }
  return { pushes: chain.length, moves: solution.length, solution, states: states.length };
}

// Bir hamle dizisini kurallara göre oynatır; geçersiz hamlede hata fırlatır (test ve doğrulama için).
export function simulate(L, path) {
  const occ = new Uint8Array(L.inside.length);
  for (const b of L.boxes) occ[b] = 1;
  let player = L.player;
  let pushes = 0;
  for (const ch of path) {
    const d = DIR_KEYS.indexOf(ch.toLowerCase());
    if (d < 0) throw new Error(`Geçersiz hamle karakteri: ${ch}`);
    const t = player + L.offsets[d];
    if (!L.inside[t]) throw new Error('Duvara yürünemez.');
    if (occ[t]) {
      const t2 = t + L.offsets[d];
      if (!L.inside[t2] || occ[t2]) throw new Error('Kutu itilemez.');
      occ[t] = 0;
      occ[t2] = 1;
      pushes++;
    }
    player = t;
  }
  let solved = true;
  for (let i = 0; i < occ.length; i++) if (occ[i] && !L.goals[i]) solved = false;
  return { player, pushes, moves: path.length, solved };
}
