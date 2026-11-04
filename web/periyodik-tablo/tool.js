// İnteraktif periyodik tablo — tamamı tarayıcıda çalışır; veri aynı origin'deki elementler.json dosyasından okunur,
// hiçbir yere bir şey gönderilmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Saf yardımcılar ---------- */

/** Aramada Türkçe karakter farkını yok sayar: "altin" → Altın, "IYOT" → İyot. */
export function norm(s) {
  return String(s ?? '').normalize('NFC').toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .trim();
}

/** Arama ifadesi bir elemente uyuyor mu? Sayı → atom numarası, kısa ifade → sembol/ad başı, uzun ifade → ad içinde. */
export function matchesQuery(el, qRaw) {
  const q = norm(qRaw);
  if (!q) return true;
  if (/^\d+$/.test(q)) return el.no === Number(q);
  const names = [el.ad, ...(el.alt || [])].map(norm);
  if (norm(el.sembol) === q) return true;
  if (q.length === 1) return names.some((n) => n.startsWith(q));
  return names.some((n) => n.includes(q));
}

/** Elektron dizilimini kabuklara böler: "[Ar] 3d6 4s2" → [2, 8, 14, 2]. */
const CORES = {
  He: [2], Ne: [2, 8], Ar: [2, 8, 8], Kr: [2, 8, 18, 8], Xe: [2, 8, 18, 18, 8], Rn: [2, 8, 18, 32, 18, 8],
};
export function shells(config) {
  const out = [];
  for (const tok of String(config).split(' ')) {
    const core = /^\[(\w+)\]$/.exec(tok);
    if (core) { CORES[core[1]].forEach((n, i) => { out[i] = (out[i] || 0) + n; }); continue; }
    const m = /^(\d)([spdf])(\d+)$/.exec(tok);
    if (m) out[Number(m[1]) - 1] = (out[Number(m[1]) - 1] || 0) + Number(m[3]);
  }
  return out.map((n) => n || 0);
}

/** 25 °C'deki hâli erime/kaynama noktalarından çıkarır. */
export function stateAt25(el) {
  if (el.kaynama !== null && el.kaynama < 25) return 'Gaz';
  if (el.erime !== null) return el.erime < 25 ? 'Sıvı' : 'Katı';
  return 'Bilinmiyor';
}

const fmtNum = (v, unit = '') => (v === null || v === undefined ? 'Bilinmiyor' : `${String(v).replace('.', ',')}${unit}`);
const fmtMass = (el) => (el.kutleSayisi ? `(${el.kutle})` : el.kutle.toFixed(2).replace('.', ','));
const fmtYear = (el) => (el.kesif === 'antik' ? 'Eski çağlardan beri bilinir' : el.kesif ? String(el.kesif) : 'Bilinmiyor');

/* ---------- Durum ---------- */

const S = {
  data: null, byNo: new Map(), cats: {},
  q: '', kat: '', blok: '', grup: '', periyot: '',
  selected: null, detailOpen: false, nextSlot: 0, view: 'tablo', cmp: [null, null],
};
const cells = new Map();   // no → tablo hücresi (button)
const rows = new Map();    // no → liste satırı (button)
const rowItems = new Map(); // no → <li>
const gridPos = new Map(); // "satır,sütun" → hücre
let roving = 1;

function mk(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

/* ---------- Tablo ve liste çizimi ---------- */

function cellLabel(el) {
  return `${el.ad}, ${el.sembol}, atom numarası ${el.no}, ${S.cats[el.kategori]}`;
}

function buildBoard() {
  const board = $('pt-board');
  board.textContent = '';
  // Grup numaraları başlık satırı
  for (let g = 1; g <= 18; g++) {
    const h = mk('span', 'pt-gh', String(g));
    h.style.gridColumn = String(g); h.style.gridRow = '1';
    h.setAttribute('aria-hidden', 'true');
    board.appendChild(h);
  }
  for (const el of S.data.elementler) {
    const col = el.grup ?? 3 + (el.no >= 89 ? el.no - 89 : el.no - 57);
    const row = el.grup ? el.periyot + 1 : el.no >= 89 ? 11 : 10;
    const b = mk('button', `pt-cell k-${el.kategori}`);
    b.type = 'button';
    b.dataset.no = String(el.no);
    b.dataset.sym = el.sembol;
    b.dataset.kat = el.kategori;
    b.dataset.blok = el.blok;
    b.dataset.grup = el.grup === null ? '' : String(el.grup);
    b.dataset.periyot = String(el.periyot);
    b.setAttribute('aria-label', cellLabel(el));
    b.tabIndex = el.no === roving ? 0 : -1;
    b.style.gridColumn = String(col); b.style.gridRow = String(row);
    b.dataset.r = String(row); b.dataset.c = String(col);
    b.append(mk('span', 'pt-n', String(el.no)), mk('span', 's', el.sembol), mk('span', 'pt-a', el.ad));
    board.appendChild(b);
    cells.set(el.no, b);
    gridPos.set(`${row},${col}`, b);
  }
  // 57–71 ve 89–103 yer tutucuları: tıklayınca ilgili ailenin vurgulanmasını sağlar (element hücresi sayılmaz)
  [['lantanit', '57–71', 7, 'Lantanitleri vurgula'], ['aktinit', '89–103', 8, 'Aktinitleri vurgula']].forEach(([kat, txt, row, label]) => {
    const p = mk('button', `pt-ph k-${kat}`, txt);
    p.type = 'button'; p.dataset.kat = kat; p.setAttribute('aria-label', label); p.tabIndex = -1;
    p.style.gridColumn = '3'; p.style.gridRow = String(row);
    board.appendChild(p);
  });
  // f-blok satır etiketleri
  [['Lantanitler', 10], ['Aktinitler', 11]].forEach(([txt, row]) => {
    const l = mk('span', 'pt-rl', txt);
    l.style.gridColumn = '1 / 3'; l.style.gridRow = String(row);
    l.setAttribute('aria-hidden', 'true');
    board.appendChild(l);
  });
}

function buildList() {
  const ul = $('pt-list');
  ul.textContent = '';
  for (const el of S.data.elementler) {
    const li = mk('li');
    const b = mk('button', 'pt-row');
    b.type = 'button';
    b.dataset.no = String(el.no);
    b.setAttribute('aria-label', cellLabel(el));
    const tile = mk('span', `pt-tile k-${el.kategori}`);
    tile.append(mk('small', '', String(el.no)), mk('strong', '', el.sembol));
    const name = mk('span', 'pt-rn');
    name.append(mk('strong', '', el.ad), mk('small', '', `${S.cats[el.kategori]} · ${fmtMass(el)} u`));
    b.append(tile, name);
    li.appendChild(b);
    ul.appendChild(li);
    rows.set(el.no, b);
    rowItems.set(el.no, li);
  }
}

function buildSelects() {
  const g = $('f-grup');
  for (let i = 1; i <= 18; i++) g.add(new Option(`${i}. grup`, String(i)));
  const p = $('f-periyot');
  for (let i = 1; i <= 7; i++) p.add(new Option(`${i}. periyot`, String(i)));
  for (const sel of [$('cmp-a'), $('cmp-b')]) {
    sel.add(new Option('Seçin…', ''));
    for (const el of S.data.elementler) sel.add(new Option(`${el.no} · ${el.sembol} · ${el.ad}`, String(el.no)));
  }
  // Açıklama çubuğu: kategori düğmeleri
  const legend = $('pt-legend');
  const counts = {};
  S.data.elementler.forEach((el) => { counts[el.kategori] = (counts[el.kategori] || 0) + 1; });
  for (const [key, label] of Object.entries(S.cats)) {
    const b = mk('button', `pt-chip k-${key}`);
    b.type = 'button'; b.dataset.kat = key; b.setAttribute('aria-pressed', 'false');
    b.append(mk('i'), document.createTextNode(`${label} `), mk('small', '', `(${counts[key]})`));
    legend.appendChild(b);
  }
}

/* ---------- Süzme ve vurgulama ---------- */

function isActive() { return !!(S.q.trim() || S.kat || S.blok || S.grup || S.periyot); }

function matches(el) {
  if (S.kat && el.kategori !== S.kat) return false;
  if (S.blok && el.blok !== S.blok) return false;
  if (S.grup && String(el.grup) !== S.grup) return false;
  if (S.periyot && String(el.periyot) !== S.periyot) return false;
  return matchesQuery(el, S.q);
}

function applyFilters() {
  const active = isActive();
  let n = 0;
  let last = null;
  for (const el of S.data.elementler) {
    const hit = active && matches(el);
    if (hit) { n++; last = el; }
    const c = cells.get(el.no);
    c.classList.toggle('is-match', hit);
    c.classList.toggle('is-dim', active && !hit);
    const li = rowItems.get(el.no);
    li.hidden = active && !hit;
    rows.get(el.no).classList.toggle('is-match', hit);
  }
  document.querySelectorAll('.pt-chip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.kat === S.kat)));
  document.querySelectorAll('[data-blok-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.blokBtn === S.blok)));
  document.querySelectorAll('.pt-ph').forEach((b) => b.classList.toggle('is-on', b.dataset.kat === S.kat));
  const msg = $('pt-count');
  if (!active) msg.textContent = '118 element gösteriliyor.';
  else if (n === 0) msg.textContent = 'Eşleşen element yok. Yazımı kontrol edin: ad (Demir), sembol (Fe) ya da atom numarası (26) deneyin.';
  else msg.textContent = `${n} element eşleşti.`;
  msg.classList.toggle('is-empty', active && n === 0);
  $('pt-clear').hidden = !active;
  return { n, last };
}

function setFilter(patch) {
  Object.assign(S, patch);
  $('f-grup').value = S.grup;
  $('f-periyot').value = S.periyot;
  return applyFilters();
}

/* ---------- Ayrıntı kartı ---------- */

function sup(text) {
  // "[Ar] 3d6 4s2" → köşeli çekirdek + üst simgeli orbital doluluğu
  const frag = document.createDocumentFragment();
  String(text).split(' ').forEach((tok, i) => {
    if (i) frag.appendChild(document.createTextNode(' '));
    const m = /^(\d[spdf])(\d+)$/.exec(tok);
    if (m) { frag.appendChild(document.createTextNode(m[1])); frag.appendChild(mk('sup', '', m[2])); } else frag.appendChild(document.createTextNode(tok));
  });
  return frag;
}

function bohr(counts) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('class', 'pt-bohr');
  svg.setAttribute('aria-hidden', 'true');
  const add = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); svg.appendChild(e); };
  add('circle', { cx: 100, cy: 100, r: 8, class: 'nuc' });
  counts.forEach((c, i) => {
    const r = 20 + i * 11.5;
    add('circle', { cx: 100, cy: 100, r, class: 'orb', fill: 'none' });
    for (let k = 0; k < c; k++) {
      const a = (k / c) * Math.PI * 2 - Math.PI / 2;
      add('circle', { cx: (100 + r * Math.cos(a)).toFixed(2), cy: (100 + r * Math.sin(a)).toFixed(2), r: 2.6, class: 'e' });
    }
  });
  return svg;
}

function row(dt, ddNode, field) {
  const d = mk('div');
  const dd = mk('dd');
  if (field) dd.dataset.f = field;
  if (typeof ddNode === 'string') dd.textContent = ddNode; else dd.appendChild(ddNode);
  d.append(mk('dt', '', dt), dd);
  return d;
}

// Geniş ekranda ve tablo görünümünde kart, tablonun boş köşesine (3–12. sütun) oturur;
// aksi hâlde tablonun altında yapışkan bir panel olarak açılır.
const wideMq = window.matchMedia('(min-width: 1100px)');
const gapMode = () => wideMq.matches && S.view === 'tablo';

function renderEmpty() {
  const box = $('pt-detail');
  box.textContent = '';
  box.appendChild(mk('p', 'pt-d-empty', "Ayrıntıları görmek için bir elemente tıklayın. Ok tuşlarıyla gezip Enter'a da basabilirsiniz."));
}

function placePanel() {
  const box = $('pt-detail');
  const gap = gapMode();
  if (gap) $('pt-board').appendChild(box);
  else $('pt-compare').before(box);
  box.classList.toggle('pt-detail--gap', gap);
  if (S.selected) renderDetail(S.byNo.get(S.selected)); else renderEmpty();
  box.hidden = gap ? false : !S.detailOpen;
}

function renderDetail(el) {
  const box = $('pt-detail');
  box.textContent = '';
  const head = mk('div', 'pt-d-head');
  const tile = mk('div', `pt-d-tile k-${el.kategori}`);
  tile.append(mk('span', 'pt-d-n', String(el.no)), mk('span', 'pt-d-s', el.sembol), mk('span', 'pt-d-m', fmtMass(el)));
  const title = mk('div', 'pt-d-title');
  const status = mk('p', 'pt-d-status', '');
  status.id = 'pt-d-status';
  title.append(mk('h3', '', el.ad), mk('p', 'pt-d-cat', S.cats[el.kategori]), status);
  const act = mk('div', 'pt-d-act');
  const add = mk('button', 'ba-btn', 'Karşılaştırmaya ekle');
  add.type = 'button'; add.id = 'pt-d-cmp';
  const close = mk('button', 'ba-btn pt-d-close', 'Kapat');
  close.type = 'button'; close.id = 'pt-d-close';
  act.append(add, close);
  head.append(tile, title, act);

  const dl = mk('dl', 'pt-d-list');
  const cfg = mk('span'); cfg.appendChild(sup(el.dizilim));
  const ks = shells(el.dizilim);
  const pos = el.grup ? `${el.grup}. grup · ${el.periyot}. periyot` : `f-bloğu · ${el.periyot}. periyot`;
  dl.append(
    row('Atom numarası', String(el.no), 'no'),
    row('Sembol', el.sembol, 'sembol'),
    row('Atom kütlesi (yaklaşık)', `${fmtMass(el)} u`, 'kutle'),
    row('Grup · periyot', pos, 'konum'),
    row('Blok', `${el.blok} bloğu`, 'blok'),
    row('Elektron dizilimi', cfg, 'dizilim'),
    row('Elektron kabukları', ks.join(', '), 'kabuk'),
    row('Elektronegatiflik (Pauling)', fmtNum(el.en), 'en'),
    row('Erime noktası (yaklaşık)', fmtNum(el.erime, ' °C'), 'erime'),
    row('Kaynama noktası (yaklaşık)', fmtNum(el.kaynama, ' °C'), 'kaynama'),
    row("25 °C'de hâli", stateAt25(el), 'hal'),
    row('Keşif', fmtYear(el), 'kesif'),
  );

  const body = mk('div', 'pt-d-body');
  body.append(dl, bohr(ks));
  box.append(head, body);
  const notes = [];
  if (el.kutleSayisi) notes.push('Parantezli kütle, bu elementin kararlı izotopu olmadığını gösterir; en kararlı izotopun kütle sayısıdır.');
  if (el.no >= 104) notes.push('Süper ağır elementtir: çok az atomu, çok kısa süreliğine üretilmiştir; özellikleri büyük ölçüde hesaplamalara dayanır.');
  if (el.not) notes.push(el.not);
  if (notes.length) box.appendChild(mk('p', 'pt-d-note', notes.join(' ')));
}

function select(no, { focus = false } = {}) {
  const el = S.byNo.get(no);
  if (!el) return;
  S.selected = no;
  S.detailOpen = true;
  cells.forEach((c, n) => { if (n === no) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current'); c.classList.toggle('is-selected', n === no); });
  rows.forEach((r, n) => r.classList.toggle('is-selected', n === no));
  setRoving(no);
  renderDetail(el);
  $('pt-detail').hidden = false;
  if (focus) cells.get(no).focus();
  try { history.replaceState(null, '', `#${el.sembol}`); } catch { /* bazı ortamlarda izin yok */ }
}

function closeDetail() {
  S.detailOpen = false;
  if (!gapMode()) $('pt-detail').hidden = true;
}

function setRoving(no) {
  const prev = cells.get(roving);
  if (prev) prev.tabIndex = -1;
  roving = no;
  const c = cells.get(no);
  if (c) c.tabIndex = 0;
}

/* ---------- Karşılaştırma ---------- */

function renderCompare() {
  const [a, b] = S.cmp.map((n) => (n ? S.byNo.get(n) : null));
  const table = $('cmp-table');
  const sum = $('cmp-summary');
  $('cmp-a').value = a ? String(a.no) : '';
  $('cmp-b').value = b ? String(b.no) : '';
  sum.textContent = '';
  if (!a || !b) {
    table.hidden = true;
    sum.textContent = 'Karşılaştırmak için iki element seçin ya da bir element kartındaki "Karşılaştırmaya ekle" düğmesini kullanın.';
    return;
  }
  const defs = [
    ['Atom numarası', (e) => String(e.no)],
    ['Sembol', (e) => e.sembol],
    ['Atom kütlesi (u)', (e) => fmtMass(e)],
    ['Grup', (e) => (e.grup ? String(e.grup) : 'f-bloğu')],
    ['Periyot', (e) => String(e.periyot)],
    ['Blok', (e) => e.blok],
    ['Kategori', (e) => S.cats[e.kategori]],
    ['Elektron dizilimi', (e) => e.dizilim],
    ['Elektron kabukları', (e) => shells(e.dizilim).join(', ')],
    ['Elektronegatiflik', (e) => fmtNum(e.en)],
    ['Erime noktası (°C)', (e) => fmtNum(e.erime)],
    ['Kaynama noktası (°C)', (e) => fmtNum(e.kaynama)],
    ['25 °C\'de hâli', (e) => stateAt25(e)],
    ['Keşif', (e) => fmtYear(e)],
  ];
  const tb = table.tBodies[0];
  tb.textContent = '';
  $('cmp-ha').textContent = `${a.ad} (${a.sembol})`;
  $('cmp-hb').textContent = `${b.ad} (${b.sembol})`;
  for (const [label, fn] of defs) {
    const tr = tb.insertRow();
    tr.insertCell().textContent = label;
    tr.insertCell().textContent = fn(a);
    tr.insertCell().textContent = fn(b);
  }
  table.hidden = false;
  const lines = [];
  const dm = Math.abs(a.kutle - b.kutle);
  lines.push(`Atom kütleleri arasındaki fark yaklaşık ${dm.toFixed(2).replace('.', ',')} u.`);
  if (a.en !== null && b.en !== null) {
    const d = Math.abs(a.en - b.en);
    const dTxt = d.toFixed(2).replace('.', ',');
    const bothMetal = ['alkali-metal', 'toprak-alkali-metal', 'gecis-metali', 'gecis-sonrasi-metal', 'lantanit', 'aktinit'].includes(a.kategori)
      && ['alkali-metal', 'toprak-alkali-metal', 'gecis-metali', 'gecis-sonrasi-metal', 'lantanit', 'aktinit'].includes(b.kategori);
    let yorum;
    if (bothMetal) yorum = 'İki element de metal olduğundan aralarında bileşik değil, alaşım gibi metalik bir yapı beklenir.';
    else if (d >= 1.7) yorum = 'Genel bir kurala göre bu fark iyonik karakterli bir bağa işaret eder.';
    else if (d >= 0.4) yorum = 'Genel bir kurala göre bu fark polar kovalent bir bağa işaret eder.';
    else yorum = 'Genel bir kurala göre bu fark apolar (ya da çok az polar) kovalent bir bağa işaret eder.';
    lines.push(`Elektronegatiflik farkı ${dTxt}. ${yorum} Bu yalnızca bir yaklaşımdır; gerçek bağ türü ortama ve bileşiğe göre değişir.`);
  } else {
    lines.push('Elektronegatifliği bilinmeyen bir element seçildiği için bağ yorumu yapılamadı.');
  }
  sum.textContent = lines.join(' ');
}

function addToCompare(no) {
  S.cmp[S.nextSlot] = no;
  const slot = S.nextSlot === 0 ? 'A' : 'B';
  S.nextSlot = 1 - S.nextSlot;
  renderCompare();
  const st = $('pt-d-status');
  if (st) st.textContent = `${S.byNo.get(no).ad}, karşılaştırmaya eklendi (${slot}). Tabloyu sayfanın altında görebilirsiniz.`;
}

/* ---------- Görünüm, klavye, yazdırma ---------- */

function setView(v) {
  S.view = v;
  $('pt-scroll').hidden = v !== 'tablo';
  $('pt-list-wrap').hidden = v !== 'liste';
  $('v-tablo').setAttribute('aria-pressed', String(v === 'tablo'));
  $('v-liste').setAttribute('aria-pressed', String(v === 'liste'));
  if (S.data) placePanel();
}

function onBoardKey(e) {
  const keys = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] };
  const d = keys[e.key];
  const cur = e.target.closest?.('.pt-cell');
  if (!d || !cur) return;
  const [r0, c0] = [Number(cur.dataset.r), Number(cur.dataset.c)];
  let r = r0; let c = c0;
  for (let i = 0; i < 20; i++) {
    r += d[0]; c += d[1];
    if (r < 2 || r > 11 || c < 1 || c > 18) return;
    const next = gridPos.get(`${r},${c}`);
    if (next) { e.preventDefault(); setRoving(Number(next.dataset.no)); next.focus(); return; }
  }
}

function printTable() {
  const prev = S.view;
  const restore = () => { setView(prev); window.removeEventListener('afterprint', restore); };
  window.addEventListener('afterprint', restore);
  setView('tablo');
  setTimeout(() => window.print(), 50);
}

/* ---------- Başlatma ---------- */

async function init() {
  const error = $('error');
  try {
    const res = await fetch(new URL('./elementler.json', import.meta.url));
    if (!res.ok) throw new Error('http ' + res.status);
    S.data = await res.json();
  } catch {
    showError(error, 'Element verisi yüklenemedi. Sayfayı yenileyin; çevrimdışıysanız sayfayı en az bir kez internete bağlıyken açmış olmanız gerekir.');
    $('pt-count').textContent = 'Veri yüklenemedi.';
    return;
  }
  S.cats = S.data.kategoriler;
  S.data.elementler.forEach((el) => S.byNo.set(el.no, el));
  buildBoard();
  buildList();
  buildSelects();
  setView(window.matchMedia('(max-width: 700px)').matches ? 'liste' : 'tablo');
  wideMq.addEventListener('change', placePanel);
  applyFilters();
  renderCompare();
  $('pt-board').dataset.ready = '1';

  // Seçim: tablo hücresi ya da liste satırı
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const c = t.closest('.pt-cell, .pt-row');
    if (c) { select(Number(c.dataset.no), { focus: false }); return; }
    const ph = t.closest('.pt-ph');
    if (ph) { setFilter({ kat: S.kat === ph.dataset.kat ? '' : ph.dataset.kat }); return; }
    const chip = t.closest('.pt-chip');
    if (chip) { setFilter({ kat: S.kat === chip.dataset.kat ? '' : chip.dataset.kat }); return; }
    const bb = t.closest('[data-blok-btn]');
    if (bb) { setFilter({ blok: S.blok === bb.dataset.blokBtn ? '' : bb.dataset.blokBtn }); return; }
    if (t.closest('#pt-d-close')) { closeDetail(); return; }
    if (t.closest('#pt-d-cmp') && S.selected) addToCompare(S.selected);
  });
  $('pt-board').addEventListener('keydown', onBoardKey);
  $('pt-board').addEventListener('focusin', (e) => { const c = e.target.closest?.('.pt-cell'); if (c) setRoving(Number(c.dataset.no)); });

  const search = $('pt-ara');
  search.addEventListener('input', () => setFilter({ q: search.value }));
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { search.value = ''; setFilter({ q: '' }); }
    if (e.key === 'Enter') { const { n, last } = applyFilters(); if (n === 1 && last) select(last.no); }
  });
  $('f-grup').addEventListener('change', (e) => setFilter({ grup: e.target.value }));
  $('f-periyot').addEventListener('change', (e) => setFilter({ periyot: e.target.value }));
  $('pt-clear').addEventListener('click', () => { search.value = ''; setFilter({ q: '', kat: '', blok: '', grup: '', periyot: '' }); });
  $('v-tablo').addEventListener('click', () => setView('tablo'));
  $('v-liste').addEventListener('click', () => setView('liste'));
  $('pt-print').addEventListener('click', printTable);
  $('cmp-a').addEventListener('change', (e) => { S.cmp[0] = e.target.value ? Number(e.target.value) : null; renderCompare(); });
  $('cmp-b').addEventListener('change', (e) => { S.cmp[1] = e.target.value ? Number(e.target.value) : null; renderCompare(); });
  $('cmp-swap').addEventListener('click', () => { S.cmp.reverse(); renderCompare(); });
  $('cmp-clear').addEventListener('click', () => { S.cmp = [null, null]; S.nextSlot = 0; renderCompare(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !gapMode() && !$('pt-detail').hidden && e.target !== search) closeDetail(); });

  // Bağlantıdan gelen sembol (#Fe) → o elementi aç
  const h = decodeURIComponent(location.hash.slice(1));
  const fromHash = S.data.elementler.find((el) => el.sembol === h);
  if (fromHash) select(fromHash.no);
}

init();
