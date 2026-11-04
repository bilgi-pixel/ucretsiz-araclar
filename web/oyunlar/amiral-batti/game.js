// Amiral Battı arayüzü: gemi yerleştirme (tıkla / sürükle / R ile döndür / rastgele), bilgisayara karşı
// (av–hedef yapay zekâsı) ve aynı cihazda iki kişilik mod. Tamamen istemci tarafı; dış istek yok.
// İstatistikler yalnızca localStorage'a yazılır. Saf mantık ./engine.js içindedir.
import {
  SIZE, FLEET, mulberry32, cellName, shipCells, canPlace, placeShip, randomFleet, validateFleet,
  createFleetState, isSunk, remainingShips, hitCount, fire, viewOf, chooseShot,
} from './engine.js';

const STORE_KEY = 'ba-oyun-amiral-batti';
const CPU_DELAY = 650; // bilgisayarın "nişan alma" gecikmesi (ms)
const OPPS = ['hard', 'easy', 'two'];

// ---------- Depolama (bozuk veriye dayanıklı) ----------
function loadStore() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) raw = {};
  const num = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
  const stats = {};
  for (const k of OPPS) {
    const s = raw.stats && typeof raw.stats === 'object' ? raw.stats[k] : null;
    const o = s && typeof s === 'object' ? s : {};
    stats[k] = { played: num(o.played), won: num(o.won), lost: num(o.lost), best: num(o.best), p1: num(o.p1), p2: num(o.p2) };
  }
  const prefs = { opp: raw.prefs && OPPS.includes(raw.prefs.opp) ? raw.prefs.opp : 'hard' };
  return { stats, prefs };
}
function saveStore(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* özel gezinti vb. */ }
}

function init() {
  const $ = (id) => document.getElementById(id);
  const el = {
    box: $('oyun-kutusu'), opp: $('ab-opp'), hint: $('ab-hint'), status: $('ab-status'), log: $('ab-log'),
    stage: $('ab-stage'), cover: $('ab-cover'), coverTitle: $('ab-cover-title'), coverText: $('ab-cover-text'), coverBtn: $('ab-cover-btn'),
    place: $('ab-place'), placeTitle: $('ab-place-title'), tray: $('ab-tray'), orient: $('ab-orient'),
    rotate: $('ab-rotate'), random: $('ab-random'), clear: $('ab-clear'), start: $('ab-start'),
    wrapTarget: $('ab-wrap-target'), wrapOwn: $('ab-wrap-own'), target: $('ab-target'), own: $('ab-own'),
    targetTitle: $('ab-target-title'), ownTitle: $('ab-own-title'), fleetTarget: $('ab-fleet-target'), fleetOwn: $('ab-fleet-own'),
    counts: $('ab-counts'), turnbar: $('ab-turnbar'), endturn: $('ab-endturn'),
    result: $('ab-result'), resultTitle: $('ab-result-title'), resultText: $('ab-result-text'),
    l1: $('ab-l1'), l2: $('ab-l2'), l3: $('ab-l3'), s1: $('ab-s1'), s2: $('ab-s2'), s3: $('ab-s3'),
  };

  const store = loadStore();
  el.opp.value = store.prefs.opp;

  // Tohumlu rastgelelik: ?seed=123 adresiyle aynı yerleşimler ve atışlar elde edilir.
  const q = new URLSearchParams(location.search);
  let seedVal = q.has('seed') && Number.isFinite(Number(q.get('seed'))) ? Number(q.get('seed')) : Math.floor(Math.random() * 4294967296);
  let rnd = mulberry32(seedVal);

  // ----- Durum -----
  let opp = 'hard';
  let phase = 'place'; // 'place' | 'play' | 'over'
  let cur = 0; // ekrana bakan oyuncu (iki kişilik modda değişir)
  let turn = 0; // sırası gelen oyuncu (bilgisayar modunda 1 = bilgisayar)
  let busy = false;
  let gen = 0;
  let placing = [[], []];
  let fleets = [null, null];
  let selected = null;
  let horiz = true;
  let shots = [0, 0]; // her oyuncunun attığı atış sayısı
  let last = [-1, -1]; // her filonun aldığı son atış
  let shotDone = false; // iki kişilik: bu turda ateş edildi, cihaz devri bekleniyor
  let cpuQueue = null; // test kancası: bilgisayarın sıradaki atışları
  let coverAction = null;
  const logItems = [];

  let ownCells = []; let ownInteractive = null;
  let targetCells = []; let targetBuilt = false;
  const focusIdx = { own: 0, target: 44 };
  let lastDragEnd = 0;

  const twoMode = () => opp === 'two';
  const playerName = (p) => (twoMode() ? 'Oyuncu ' + (p + 1) : p === 0 ? 'Sen' : 'Bilgisayar');
  const enemyIdx = () => (twoMode() ? 1 - cur : 1);
  const defOf = (id) => FLEET.find((d) => d.id === id) || null;

  function setStatus(t) { el.status.textContent = t; }
  function addLog(t) {
    logItems.unshift(t);
    if (logItems.length > 6) logItems.length = 6;
    el.log.textContent = '';
    logItems.forEach((x) => { const li = document.createElement('li'); li.textContent = x; el.log.appendChild(li); });
  }

  // ---------- Izgara oluşturma ----------
  function makeGrid(container, interactive) {
    container.textContent = '';
    const cells = [];
    const axis = (txt) => { const s = document.createElement('span'); s.className = 'ab-axis'; s.setAttribute('aria-hidden', 'true'); s.textContent = txt; container.appendChild(s); };
    axis('');
    for (let c = 0; c < SIZE; c++) axis(String(c + 1));
    for (let r = 0; r < SIZE; r++) {
      axis('ABCDEFGHIJ'[r]);
      for (let c = 0; c < SIZE; c++) {
        const b = document.createElement(interactive ? 'button' : 'div');
        b.className = 'ab-cell';
        b.dataset.i = String(r * SIZE + c);
        if (interactive) { b.type = 'button'; b.tabIndex = -1; } else b.setAttribute('aria-hidden', 'true');
        container.appendChild(b);
        cells.push(b);
      }
    }
    return cells;
  }

  function setFocus(which, i, move) {
    const cells = which === 'own' ? ownCells : targetCells;
    if (!cells.length) return;
    focusIdx[which] = Math.max(0, Math.min(SIZE * SIZE - 1, i));
    cells.forEach((c, k) => { if (c.tagName === 'BUTTON') c.tabIndex = k === focusIdx[which] ? 0 : -1; });
    if (move && cells[focusIdx[which]].tagName === 'BUTTON') cells[focusIdx[which]].focus();
  }

  function ensureOwnGrid(interactive) {
    if (ownInteractive === interactive) return;
    ownInteractive = interactive;
    ownCells = makeGrid(el.own, interactive);
    if (interactive) setFocus('own', focusIdx.own, false);
  }

  // ---------- Çizim: kendi tahta ----------
  function renderOwn() {
    const placeMode = phase === 'place';
    ensureOwnGrid(placeMode);
    const fleet = placeMode ? null : fleets[cur];
    const ships = placeMode ? placing[cur] : fleet.ships;
    const map = new Map();
    ships.forEach((s) => shipCells(s.r, s.c, s.len, s.horiz).forEach((i, k) => map.set(i, { s, k })));
    const view = fleet ? viewOf(fleet) : null;
    ownCells.forEach((c, i) => {
      const m = map.get(i);
      if (m) {
        c.dataset.ship = '1';
        c.dataset.pos = m.k === 0 ? 'start' : m.k === m.s.len - 1 ? 'end' : 'mid';
        c.dataset.or = m.s.horiz ? 'h' : 'v';
      } else { delete c.dataset.ship; delete c.dataset.pos; delete c.dataset.or; }
      c.dataset.s = view ? view[i] : '';
      c.classList.toggle('is-last', !placeMode && last[cur] === i);
      if (placeMode) c.setAttribute('aria-label', cellName(i) + ': ' + (m ? m.s.name + ' (yerleşik, taşımak için seçin)' : 'boş su'));
    });
    el.own.setAttribute('aria-label', placeMode
      ? 'Gemi yerleştirme tahtası, 10 satır 10 sütun. Ok tuşlarıyla gezinin, Enter ile seçili gemiyi koyun, R ile döndürün.'
      : 'Filonun tahtası. Gemilerin ve aldığın atışların görünümü.');
  }

  // ---------- Çizim: hedef tahta ----------
  function renderTarget() {
    if (!targetBuilt) { targetCells = makeGrid(el.target, true); targetBuilt = true; setFocus('target', focusIdx.target, false); }
    const fleet = fleets[enemyIdx()];
    if (!fleet) return;
    const view = viewOf(fleet);
    const reveal = phase === 'over';
    const map = new Set();
    if (reveal) fleet.ships.forEach((s) => shipCells(s.r, s.c, s.len, s.horiz).forEach((i) => map.add(i)));
    const canShoot = phase === 'play' && !(twoMode() && shotDone);
    targetCells.forEach((c, i) => {
      const v = view[i];
      c.dataset.s = v;
      if (reveal && !v && map.has(i)) c.dataset.reveal = '1'; else delete c.dataset.reveal;
      c.classList.toggle('is-last', last[enemyIdx()] === i);
      const txt = v === 'm' ? 'ıska' : v === 'h' ? 'isabet' : v === 's' ? 'batmış gemi' : 'atış yapılmadı';
      c.setAttribute('aria-label', cellName(i) + ': ' + txt);
      c.setAttribute('aria-disabled', !canShoot || v !== '' ? 'true' : 'false');
    });
    el.target.setAttribute('aria-label', 'Hedef denizi, 10 satır 10 sütun. Ok tuşlarıyla gezinin, Enter ile ateş edin.');
  }

  function renderFleetList(ul, fleet) {
    ul.textContent = '';
    for (const d of FLEET) {
      const s = fleet.ships.find((x) => x.id === d.id);
      const sunk = s ? isSunk(fleet, s) : false;
      const li = document.createElement('li');
      li.dataset.sunk = sunk ? '1' : '0';
      const pips = document.createElement('span');
      pips.className = 'ab-pips';
      pips.setAttribute('aria-hidden', 'true');
      for (let k = 0; k < d.len; k++) pips.appendChild(document.createElement('i'));
      const name = document.createElement('span');
      name.textContent = d.name + ' (' + d.len + ')' + (sunk ? ' — battı' : ' — ayakta');
      li.append(pips, name);
      ul.appendChild(li);
    }
  }

  // ---------- Çizim: yerleştirme paneli ----------
  const trayBtns = FLEET.map((d) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ab-ship';
    b.dataset.id = d.id;
    const pips = document.createElement('span');
    pips.className = 'ab-pips';
    pips.setAttribute('aria-hidden', 'true');
    for (let k = 0; k < d.len; k++) pips.appendChild(document.createElement('i'));
    const label = document.createElement('span');
    label.className = 'ab-ship-label';
    b.append(pips, label);
    el.tray.appendChild(b);
    return b;
  });

  function renderPlace() {
    const placedIds = new Set(placing[cur].map((s) => s.id));
    FLEET.forEach((d, k) => {
      const b = trayBtns[k];
      const placed = placedIds.has(d.id);
      b.dataset.placed = placed ? '1' : '0';
      b.setAttribute('aria-pressed', selected === d.id ? 'true' : 'false');
      b.querySelector('.ab-ship-label').textContent = d.name + ' (' + d.len + ')' + (placed ? ' ✓' : '');
      b.setAttribute('aria-label', d.name + ', ' + d.len + ' hücre, ' + (placed ? 'yerleştirildi; taşımak için seçin' : selected === d.id ? 'seçili' : 'yerleştirilmedi'));
    });
    el.orient.textContent = 'Yön: ' + (horiz ? 'yatay' : 'dikey');
    el.start.disabled = placing[cur].length !== FLEET.length;
    el.rotate.disabled = !selected;
  }

  // ---------- Genel çizim ----------
  const labelsFor = () => {
    const s = store.stats[opp];
    if (twoMode()) return [['Oynanan', s.played], ['Oyuncu 1 galibiyet', s.p1], ['Oyuncu 2 galibiyet', s.p2]];
    return [['Oynanan', s.played], ['Kazanılan', s.won], ['En az atış', s.best || '–']];
  };

  function render() {
    const placeMode = phase === 'place';
    el.place.hidden = !placeMode;
    el.wrapTarget.hidden = placeMode;
    el.fleetOwn.hidden = placeMode;
    el.counts.hidden = placeMode;
    el.turnbar.hidden = !(phase === 'play' && twoMode() && shotDone);
    if (!el.turnbar.hidden) el.endturn.textContent = 'Turu bitir: cihazı ' + playerName(1 - cur) + ' oyuncusuna ver';
    const stats = labelsFor();
    [[el.l1, el.s1], [el.l2, el.s2], [el.l3, el.s3]].forEach(([l, s], k) => { l.textContent = stats[k][0]; s.textContent = String(stats[k][1]); });

    if (placeMode) {
      el.placeTitle.textContent = twoMode() ? playerName(cur) + ': gemilerini yerleştir' : 'Gemilerini yerleştir';
      el.ownTitle.textContent = twoMode() ? 'Filon (' + playerName(cur) + ')' : 'Senin filon';
      el.hint.textContent = 'Listeden bir gemi seçin, tahtada bir hücreye tıklayın (ya da gemiyi sürükleyin). R tuşu ya da "Döndür" düğmesi yönü değiştirir. Gemiler birbirine değebilir ama üst üste binemez.';
      renderPlace();
      renderOwn();
    } else {
      el.ownTitle.textContent = twoMode() ? 'Filon (' + playerName(cur) + ')' : 'Senin filon';
      el.targetTitle.textContent = twoMode() ? 'Hedef denizi (' + playerName(enemyIdx()) + ')' : 'Hedef denizi (rakip filo)';
      el.hint.textContent = phase === 'over'
        ? 'Oyun bitti. Rakibin ayakta kalan gemileri hedef tahtasında açıldı.'
        : 'Hedef denizinde bir hücre seçip ateş edin. Isabet bir sonraki atışı bedavaya getirmez; sıra her atıştan sonra rakibe geçer.';
      renderOwn();
      renderTarget();
      renderFleetList(el.fleetTarget, fleets[enemyIdx()]);
      renderFleetList(el.fleetOwn, fleets[cur]);
      const a = shots[twoMode() ? cur : 0]; const b = shots[twoMode() ? 1 - cur : 1];
      el.counts.textContent = twoMode()
        ? playerName(cur) + ': ' + a + ' atış · ' + playerName(1 - cur) + ': ' + b + ' atış'
        : 'Atışların: ' + a + ' · Bilgisayarın: ' + b;
    }
  }

  // ---------- Yerleştirme eylemleri ----------
  function nextUnplaced() {
    const placed = new Set(placing[cur].map((s) => s.id));
    const d = FLEET.find((x) => !placed.has(x.id));
    return d ? d.id : null;
  }

  /** Gemi bu hücreden başlayacak biçimde, tahtaya sığması için kaydırılmış başlangıç hücresi. */
  function anchorFor(def, i, h, grab) {
    const r = Math.floor(i / SIZE); const c = i % SIZE;
    let rr = h ? r : r - grab; let cc = h ? c - grab : c;
    rr = Math.max(0, Math.min(h ? SIZE - 1 : SIZE - def.len, rr));
    cc = Math.max(0, Math.min(h ? SIZE - def.len : SIZE - 1, cc));
    return [rr, cc];
  }

  function clearPreview() {
    ownCells.forEach((c) => c.classList.remove('is-prev-ok', 'is-prev-bad'));
  }
  function showPreview(i, grab = 0) {
    clearPreview();
    const def = defOf(selected);
    if (!def || i < 0 || phase !== 'place') return;
    const [r, c] = anchorFor(def, i, horiz, grab);
    const res = canPlace(placing[cur], def.len, r, c, horiz, def.id);
    shipCells(r, c, def.len, horiz).forEach((k) => ownCells[k] && ownCells[k].classList.add(res.ok ? 'is-prev-ok' : 'is-prev-bad'));
  }

  function tryPlace(def, i, grab = 0) {
    const [r, c] = anchorFor(def, i, horiz, grab);
    const res = placeShip(placing[cur], def, r, c, horiz);
    if (!res.ok) {
      setStatus(res.reason === 'cakisma'
        ? 'Bu konumda başka bir gemiyle çakışıyor; R ile döndürün ya da başka bir yer seçin.'
        : 'Gemi tahtanın dışına taşıyor; başka bir hücre seçin ya da R ile döndürün.');
      return false;
    }
    placing[cur] = res.ships;
    selected = nextUnplaced();
    setStatus(selected
      ? def.name + ' yerleştirildi. Sıradaki gemi: ' + defOf(selected).name + ' (' + defOf(selected).len + ' hücre).'
      : 'Tüm gemiler yerleştirildi. "Savaşa başla" düğmesine basın ya da bir gemiyi seçip taşıyın.');
    return true;
  }

  function liftShip(id) {
    const s = placing[cur].find((x) => x.id === id);
    if (!s) return null;
    placing[cur] = placing[cur].filter((x) => x.id !== id);
    selected = id;
    horiz = s.horiz;
    return s;
  }

  function onOwnClick(i) {
    if (phase !== 'place' || Date.now() - lastDragEnd < 80) return;
    const def = defOf(selected);
    if (def) { tryPlace(def, i); render(); showPreview(i); return; }
    // Seçili gemi yoksa üzerine tıklanan yerleşik gemiyi geri al.
    const hit = placing[cur].find((s) => shipCells(s.r, s.c, s.len, s.horiz).includes(i));
    if (hit) {
      liftShip(hit.id);
      setStatus(hit.name + ' alındı; yeni yerine tıklayın, R ile döndürebilirsiniz.');
      render();
      showPreview(i);
    }
  }

  function onTrayClick(id) {
    if (Date.now() - lastDragEnd < 80) return;
    const placed = placing[cur].some((s) => s.id === id);
    if (placed) {
      liftShip(id);
      setStatus(defOf(id).name + ' alındı; tahtada yeni yerine tıklayın.');
    } else selected = selected === id ? null : id;
    render();
  }

  function rotate() {
    if (phase !== 'place' || !selected) return;
    horiz = !horiz;
    renderPlace();
    const f = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.ab-cell') : null;
    if (f && el.own.contains(f)) showPreview(Number(f.dataset.i));
    else clearPreview();
  }

  function randomPlace() {
    placing[cur] = randomFleet(rnd);
    selected = null;
    setStatus('Filo rastgele yerleştirildi. Beğenmediyseniz yeniden deneyin ya da gemileri taşıyın.');
    render();
  }

  function clearPlacement() {
    placing[cur] = [];
    selected = FLEET[0].id;
    horiz = true;
    setStatus('Tahta temizlendi. Gemileri yeniden yerleştirin.');
    render();
  }

  // ---------- Sürükle-bırak (fare / kalem; dokunmatikte dokun-seç-dokun) ----------
  let drag = null;
  function startDrag(e, id, fromBoard, grab) {
    if (phase !== 'place' || (e.button !== undefined && e.button !== 0)) return;
    drag = { id, x: e.clientX, y: e.clientY, pid: e.pointerId, moved: false, fromBoard, grab, lifted: null };
  }
  el.tray.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('.ab-ship');
    if (!b) return;
    startDrag(e, b.dataset.id, false, 0);
  });
  el.own.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' || phase !== 'place' || selected) return;
    const c = e.target.closest('.ab-cell');
    if (!c || !c.dataset.ship) return;
    const i = Number(c.dataset.i);
    const s = placing[cur].find((x) => shipCells(x.r, x.c, x.len, x.horiz).includes(i));
    if (!s) return;
    startDrag(e, s.id, true, shipCells(s.r, s.c, s.len, s.horiz).indexOf(i));
  });
  document.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.pid) return;
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
      drag.moved = true;
      if (drag.fromBoard) drag.lifted = liftShip(drag.id);
      selected = drag.id;
      document.body.classList.add('ab-dragging');
      render();
    }
    const t = document.elementFromPoint(e.clientX, e.clientY);
    const c = t && t.closest ? t.closest('#ab-own .ab-cell') : null;
    if (c) showPreview(Number(c.dataset.i), drag.grab); else clearPreview();
  });
  function endDrag(e, cancel) {
    if (!drag || e.pointerId !== drag.pid) return;
    const d = drag;
    drag = null;
    document.body.classList.remove('ab-dragging');
    if (!d.moved) return; // hareketsiz basış: tıklama olayı işler
    lastDragEnd = Date.now();
    const t = cancel ? null : document.elementFromPoint(e.clientX, e.clientY);
    const c = t && t.closest ? t.closest('#ab-own .ab-cell') : null;
    let ok = false;
    if (c) ok = tryPlace(defOf(d.id), Number(c.dataset.i), d.grab);
    if (!ok && d.lifted) {
      placing[cur].push(d.lifted);
      selected = nextUnplaced();
    }
    render();
    clearPreview();
  }
  document.addEventListener('pointerup', (e) => endDrag(e, false));
  document.addEventListener('pointercancel', (e) => endDrag(e, true));

  // ---------- Cihaz devri ekranı (iki kişilik mod) ----------
  function showCover(title, text, btn, action) {
    coverAction = action;
    el.coverTitle.textContent = title;
    el.coverText.textContent = text;
    el.coverBtn.textContent = btn;
    el.stage.hidden = true;
    el.cover.hidden = false;
    setStatus(title);
    el.coverBtn.focus();
  }
  el.coverBtn.addEventListener('click', () => {
    el.cover.hidden = true;
    el.stage.hidden = false;
    const act = coverAction;
    coverAction = null;
    if (act) act();
    render();
    if (phase === 'play') setFocus('target', focusIdx.target, true);
    else if (phase === 'place') trayBtns[0].focus();
  });

  // ---------- Savaş ----------
  function startBattle() {
    if (phase !== 'place' || placing[cur].length !== FLEET.length) return;
    if (!twoMode()) {
      fleets[0] = createFleetState(placing[0]);
      beginPlay();
      setStatus('Savaş başladı! Hedef denizinde bir hücre seçip ateş edin.');
      addLog('Savaş başladı. Sıra sende.');
      render();
      setFocus('target', focusIdx.target, true);
      return;
    }
    if (cur === 0) {
      showCover('Cihazı Oyuncu 2\'ye verin', 'Ekran şu an gizli. Oyuncu 1 bakmasın; Oyuncu 2 hazır olunca "Hazırım" düğmesine basıp kendi gemilerini yerleştirsin.', 'Hazırım, gemilerimi yerleştireceğim', () => {
        cur = 1; selected = FLEET[0].id; horiz = true;
        setStatus('Oyuncu 2: gemilerini yerleştir.');
      });
      return;
    }
    fleets[0] = createFleetState(placing[0]);
    fleets[1] = createFleetState(placing[1]);
    showCover('Cihazı Oyuncu 1\'e verin', 'İki filo da hazır. Oyuncu 1 hazır olunca "Savaşı başlat" düğmesine bassın; ilk atışı o yapacak.', 'Savaşı başlat', () => {
      beginPlay();
      cur = 0; turn = 0;
      setStatus('Savaş başladı! Oyuncu 1: ateş edin.');
      addLog('Savaş başladı. İlk atış Oyuncu 1\'de.');
    });
  }

  function beginPlay() {
    phase = 'play';
    cur = 0; turn = 0;
    shots = [0, 0];
    last = [-1, -1];
    shotDone = false;
    busy = false;
    focusIdx.target = 44;
    targetBuilt = false;
  }

  function shotMessage(shooter, idx, res) {
    const nm = cellName(idx);
    if (!twoMode() && shooter === 0) {
      if (res.result === 'miss') return nm + ': Iska. Burada gemi yok.';
      if (res.result === 'hit') return nm + ': İsabet!';
      return nm + ': İsabet! ' + res.ship.name + ' battı!';
    }
    const who = playerName(shooter);
    if (res.result === 'miss') return who + ' ' + nm + ' hücresine ateş etti: ıska.';
    if (res.result === 'hit') return who + ' ' + nm + ' hücresine ateş etti: isabet!';
    return who + ' ' + nm + ' hücresine ateş etti: isabet! ' + res.ship.name + ' battı.';
  }

  function onTargetClick(i) {
    if (phase !== 'play' || busy || Date.now() - lastDragEnd < 80) return;
    if (!twoMode() && turn !== 0) return;
    if (twoMode() && shotDone) return;
    const shooter = twoMode() ? cur : 0;
    const enemy = enemyIdx();
    const res = fire(fleets[enemy], i);
    if (res.result === 'invalid') { setStatus('Bu hücreye zaten ateş ettiniz; başka bir hücre seçin.'); return; }
    shots[shooter]++;
    last[enemy] = i;
    const msg = shotMessage(shooter, i, res);
    addLog(msg);
    if (res.win) { endGame(shooter); return; }
    if (twoMode()) {
      shotDone = true;
      setStatus(msg + ' Turu bitirip cihazı ' + playerName(1 - cur) + ' oyuncusuna verin.');
      render();
      el.endturn.focus();
    } else {
      turn = 1;
      setStatus(msg + ' Bilgisayar nişan alıyor…');
      render();
      cpuTurn();
    }
  }

  function cpuTurn() {
    busy = true;
    const g = gen;
    setTimeout(() => {
      if (g !== gen || phase !== 'play') return;
      busy = false;
      const f = fleets[0];
      let idx = -1;
      while (cpuQueue && cpuQueue.length && idx < 0) {
        const c = cpuQueue.shift();
        if (Number.isInteger(c) && c >= 0 && c < SIZE * SIZE && !f.shots[c]) idx = c;
      }
      if (idx < 0) idx = chooseShot(viewOf(f), remainingShips(f).map((s) => s.len), rnd, opp === 'easy' ? 'easy' : 'hard');
      const res = fire(f, idx);
      shots[1]++;
      last[0] = idx;
      const msg = shotMessage(1, idx, res);
      addLog(msg);
      if (res.win) { endGame(1); return; }
      turn = 0;
      setStatus(msg + ' Sıra sende: ateş edecek bir hücre seçin.');
      render();
    }, CPU_DELAY);
  }

  function endGame(winner) {
    phase = 'over';
    busy = false;
    const s = store.stats[opp];
    s.played++;
    let title; let text;
    if (twoMode()) {
      if (winner === 0) s.p1++; else s.p2++;
      title = playerName(winner) + ' kazandı!';
      text = 'Rakip filonun tüm gemileri battı. ' + playerName(winner) + ' ' + shots[winner] + ' atışta kazandı.';
    } else if (winner === 0) {
      s.won++;
      if (!s.best || shots[0] < s.best) s.best = shots[0];
      const pct = Math.round((hitCount(fleets[1]) / Math.max(1, shots[0])) * 100);
      title = 'Tebrikler, rakip filoyu batırdınız!';
      text = shots[0] + ' atışta kazandınız; isabet oranınız %' + pct + '. İstatistik güncellendi.';
    } else {
      s.lost++;
      title = 'Bilgisayar kazandı.';
      text = 'Filonuzun tüm gemileri battı. Rakibin ' + remainingShips(fleets[1]).length + ' gemisi ayakta kaldı; açık hâlini hedef tahtasında görebilirsiniz.';
    }
    saveStore(store);
    el.resultTitle.textContent = title;
    el.resultText.textContent = text;
    el.result.classList.add('is-active');
    setStatus(title);
    render();
  }

  // ---------- Yeni oyun ----------
  function newGame() {
    gen++;
    opp = OPPS.includes(el.opp.value) ? el.opp.value : 'hard';
    store.prefs = { opp };
    saveStore(store);
    phase = 'place';
    cur = 0; turn = 0;
    busy = false;
    placing = [[], []];
    fleets = [null, null];
    shots = [0, 0];
    last = [-1, -1];
    shotDone = false;
    selected = FLEET[0].id;
    horiz = true;
    cpuQueue = null;
    coverAction = null;
    logItems.length = 0;
    el.log.textContent = '';
    targetBuilt = false;
    focusIdx.own = 0;
    el.cover.hidden = true;
    el.stage.hidden = false;
    el.result.classList.remove('is-active');
    // Bilgisayarın filosu baştan hazır, ama oyuncuya gösterilmez.
    if (!twoMode()) fleets[1] = createFleetState(randomFleet(rnd));
    ownInteractive = null;
    setStatus(twoMode()
      ? 'Oyuncu 1: gemilerini yerleştir. Yerleştirme bitince cihaz Oyuncu 2\'ye devredilir.'
      : 'Gemilerini yerleştir: listeden bir gemi seçip tahtaya tıklayın ya da "Rastgele yerleştir" düğmesini kullanın.');
    render();
  }

  // ---------- Olaylar ----------
  trayBtns.forEach((b) => b.addEventListener('click', () => onTrayClick(b.dataset.id)));
  el.own.addEventListener('click', (e) => {
    const c = e.target.closest('.ab-cell');
    if (!c) return;
    const i = Number(c.dataset.i);
    focusIdx.own = i;
    onOwnClick(i);
  });
  el.own.addEventListener('pointerover', (e) => {
    const c = e.target.closest('.ab-cell');
    if (c && phase === 'place' && !drag) showPreview(Number(c.dataset.i));
  });
  el.own.addEventListener('pointerleave', () => { if (!drag) clearPreview(); });
  el.own.addEventListener('focusin', (e) => {
    const c = e.target.closest('.ab-cell');
    if (c && phase === 'place') showPreview(Number(c.dataset.i));
  });
  el.own.addEventListener('focusout', () => { if (!drag) clearPreview(); });
  el.target.addEventListener('click', (e) => {
    const c = e.target.closest('.ab-cell');
    if (!c) return;
    const i = Number(c.dataset.i);
    setFocus('target', i, false);
    onTargetClick(i);
  });

  // Klavye: ok tuşlarıyla hücreler arasında gezinme (roving tabindex)
  function gridKeys(which) {
    return (e) => {
      const cell = e.target.closest('.ab-cell');
      if (!cell) return;
      const cur0 = Number(cell.dataset.i);
      const r = Math.floor(cur0 / SIZE); const c = cur0 % SIZE;
      let to = null;
      switch (e.key) {
        case 'ArrowRight': if (c < SIZE - 1) to = cur0 + 1; break;
        case 'ArrowLeft': if (c > 0) to = cur0 - 1; break;
        case 'ArrowDown': if (r < SIZE - 1) to = cur0 + SIZE; break;
        case 'ArrowUp': if (r > 0) to = cur0 - SIZE; break;
        case 'Home': to = r * SIZE; break;
        case 'End': to = r * SIZE + SIZE - 1; break;
        default: return;
      }
      e.preventDefault();
      if (to !== null) setFocus(which, to, true);
    };
  }
  el.own.addEventListener('keydown', gridKeys('own'));
  el.target.addEventListener('keydown', gridKeys('target'));

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey && !e.altKey && phase === 'place' && el.cover.hidden) {
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      e.preventDefault();
      rotate();
    }
  });

  el.rotate.addEventListener('click', rotate);
  el.random.addEventListener('click', randomPlace);
  el.clear.addEventListener('click', clearPlacement);
  el.start.addEventListener('click', startBattle);
  el.endturn.addEventListener('click', () => {
    const next = 1 - cur;
    showCover('Cihazı ' + playerName(next) + ' oyuncusuna verin', 'Ekran şu an gizli. ' + playerName(next) + ' hazır olunca "Hazırım" düğmesine bassın; kendi filosunu ve rakibin atışlarını görecek.', 'Hazırım', () => {
      cur = next; turn = next; shotDone = false;
      setStatus('Sıra ' + playerName(cur) + ' oyuncusunda: hedef denizine ateş edin.');
    });
  });
  $('ab-restart').addEventListener('click', newGame);
  $('ab-again').addEventListener('click', newGame);
  el.opp.addEventListener('change', newGame);
  $('ab-reset-stats').addEventListener('click', () => {
    store.stats[opp] = { played: 0, won: 0, lost: 0, best: 0, p1: 0, p2: 0 };
    saveStore(store);
    render();
  });

  // Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
  const fsBtn = $('ab-full');
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

  // ---------- Test kancası ----------
  // window.__amiralTest(): gemi konumlarını okur/yazar, bilgisayar atışlarını sıraya koyar, tohumu değiştirir.
  window.__amiralTest = function amiralTest() {
    return {
      seed(n) { seedVal = Number(n) || 0; rnd = mulberry32(seedVal); return seedVal; },
      getShips(p) {
        const list = fleets[p] ? fleets[p].ships : placing[p];
        return list.map((s) => ({ ...s }));
      },
      setShips(p, ships) {
        if (!validateFleet(ships)) return false;
        const list = FLEET.map((d) => {
          const s = ships.find((x) => x.id === d.id);
          return { id: d.id, name: d.name, len: d.len, r: s.r, c: s.c, horiz: !!s.horiz };
        });
        placing[p] = list.map((s) => ({ ...s }));
        if (fleets[p]) fleets[p].ships = list;
        if (phase === 'place' && p === cur) selected = nextUnplaced();
        render();
        return true;
      },
      queueCpuShots(list) { cpuQueue = Array.isArray(list) ? list.slice() : null; },
      state() {
        return {
          phase, turn, cur, opp, busy, seed: seedVal, shots: shots.slice(), last: last.slice(), shotDone,
          fleetShots: fleets.map((f) => (f ? f.shots.slice() : null)),
        };
      },
    };
  };

  newGame();
}

if (typeof document !== 'undefined' && document.getElementById('ab-own')) init();
