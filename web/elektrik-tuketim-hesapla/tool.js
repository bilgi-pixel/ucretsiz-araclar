// Elektrik ve doğalgaz tüketimi — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez, fiyat verisi gömülü değildir.
import { showError } from '../assets/js/ba.js';
import { calcDevices, calcGas, calcAc, fmtNum, fmtMoney, fmtKwh } from './hesap.js';

const $ = (id) => document.getElementById(id);

// parametreler.json yüklenemezse (çevrimdışı önbellek vb.) kullanılacak varsayılanlar.
let par = {
  guncelleme: '2026-11-04', dogalgaz_isil_degeri_kwh_m3: 9.2, kombi_verim: 0.9, klima_cop: 3, btu_w: 0.29307,
  cihazlar: [
    { id: 'klima', ad: 'Klima (inverter, ortalama)', watt: 1000, saat: 8, adet: 1 },
    { id: 'kombi', ad: 'Kombi (yalnızca elektrik: fan ve pompa)', watt: 100, saat: 10, adet: 1 },
    { id: 'buzdolabi', ad: 'Buzdolabı (ortalama çekiş)', watt: 50, saat: 24, adet: 1 },
    { id: 'camasir', ad: 'Çamaşır makinesi (ortalama)', watt: 500, saat: 1, adet: 1 },
    { id: 'isitici', ad: 'Elektrikli ısıtıcı', watt: 2000, saat: 4, adet: 1 },
    { id: 'tv', ad: 'Televizyon', watt: 100, saat: 4, adet: 1 },
    { id: 'bilgisayar', ad: 'Bilgisayar', watt: 150, saat: 6, adet: 1 },
    { id: 'led', ad: 'LED ampul', watt: 10, saat: 5, adet: 6 },
  ],
};

const COLORS = ['#7b2331', '#2f6f8f', '#c98a1b', '#4f7d3a', '#6a4c93', '#b5532a', '#3d8b8b', '#8a8a8a', '#a33b6b', '#556b2f'];

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }

function syncMode() {
  const m = currentMode();
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== m; });
  $('price-wrap').hidden = m === 'gas';
  hideResult(); showError($('error'), '');
}
function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); }

/* ---------- cihaz listesi ---------- */
let rowCounter = 0;
function addRow(d) {
  const row = document.createElement('div');
  row.className = 'dev-row';
  row.innerHTML = '<div class="ba-field"><label>Cihaz adı</label><input type="text" class="dev-name" autocomplete="off"></div>' +
    '<div class="ba-field"><label>Güç (W)</label><input type="text" inputmode="decimal" class="dev-watt" autocomplete="off"></div>' +
    '<div class="ba-field"><label>Günlük saat</label><input type="text" inputmode="decimal" class="dev-hours" autocomplete="off"></div>' +
    '<div class="ba-field"><label>Adet</label><input type="text" inputmode="numeric" class="dev-count" autocomplete="off"></div>' +
    '<button type="button" class="ba-btn dev-remove">Kaldır</button>';
  const q = (c) => row.querySelector(c);
  q('.dev-name').value = d.name; q('.dev-watt').value = String(d.watt).replace('.', ',');
  q('.dev-hours').value = String(d.hours).replace('.', ','); q('.dev-count').value = String(d.count);
  // Etiketleri erişilebilir yap: her satırda benzersiz id
  const uid = 'd' + (++rowCounter);
  row.querySelectorAll('.ba-field').forEach((f, i) => { const inp = f.querySelector('input'); inp.id = `${uid}-${i}`; f.querySelector('label').htmlFor = inp.id; });
  q('.dev-remove').setAttribute('aria-label', `${d.name || 'Cihaz'} satırını kaldır`);
  q('.dev-remove').addEventListener('click', () => { row.remove(); syncEmpty(); });
  $('devlist').appendChild(row);
  syncEmpty();
}
function syncEmpty() { $('dev-empty').hidden = $('devlist').children.length > 0; }
function readDevices() {
  return [...document.querySelectorAll('.dev-row')].map((r) => ({
    name: r.querySelector('.dev-name').value, watt: r.querySelector('.dev-watt').value,
    hours: r.querySelector('.dev-hours').value, count: r.querySelector('.dev-count').value,
  }));
}

/* ---------- sonuç ---------- */
let last = null;
function render(res) {
  const dl = $('rows'); dl.textContent = '';
  res.rows.forEach(([label, value, strong]) => {
    const row = document.createElement('div'); row.className = 'kdv-row' + (strong ? ' is-strong' : '');
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    row.append(dt, dd); dl.appendChild(row);
  });
  $('r-notes').textContent = res.notes.join(' ');
  $('breakdown').hidden = !res.lines;
  if (res.lines) drawBreakdown(res.lines);
  $('result').hidden = false; $('result').classList.add('is-active');
}

function drawBreakdown(lines) {
  const body = $('tbl'); body.textContent = '';
  lines.forEach((l, i) => {
    const tr = document.createElement('tr');
    const c0 = document.createElement('td');
    const sw = document.createElement('span'); sw.className = 'swatch'; sw.style.background = COLORS[i % COLORS.length]; sw.setAttribute('aria-hidden', 'true');
    c0.append(sw, document.createTextNode(l.name));
    const cells = [fmtKwh(l.daily), fmtKwh(l.monthly), l.cost == null ? '—' : fmtMoney(l.cost), '%' + fmtNum(Math.round(l.share * 1000) / 10)];
    tr.appendChild(c0);
    cells.forEach((t) => { const td = document.createElement('td'); td.className = 'n'; td.textContent = t; tr.appendChild(td); });
    body.appendChild(tr);
  });
  // Pasta grafik: aylık kWh payları
  const cv = $('pie'), ctx = cv.getContext('2d'), size = cv.width, c = size / 2;
  ctx.clearRect(0, 0, size, size);
  let a = -Math.PI / 2;
  lines.forEach((l, i) => {
    const ang = l.share * Math.PI * 2;
    if (ang <= 0) return;
    ctx.beginPath(); ctx.moveTo(c, c); ctx.arc(c, c, c - 4, a, a + ang); ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    a += ang;
  });
  cv.setAttribute('aria-label', 'Aylık tüketim payları: ' + lines.map((l) => `${l.name} yüzde ${fmtNum(Math.round(l.share * 1000) / 10)}`).join(', '));
}

function run() {
  showError($('error'), '');
  try {
    const m = currentMode();
    if (m === 'devices') last = calcDevices({ devices: readDevices(), price: $('price').value, days: $('days').value });
    else if (m === 'gas') last = calcGas({ m3: $('g-m3').value, price: $('gprice').value, kw: $('g-kw').value, hours: $('g-hours').value, load: $('g-load').value, days: $('days').value }, par);
    else last = calcAc({ btu: $('a-btu').value, cop: $('a-cop').value, hours: $('a-hours').value, price: $('price').value, days: $('days').value }, par);
    render(last);
  } catch (e) {
    last = null; hideResult(); showError($('error'), e.message);
  }
}

function fillPresets() {
  const sel = $('preset'); sel.textContent = '';
  par.cihazlar.forEach((c) => { const o = document.createElement('option'); o.value = c.id; o.textContent = `${c.ad} — ~${c.watt} W`; sel.appendChild(o); });
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('add-preset').addEventListener('click', () => {
  const c = par.cihazlar.find((x) => x.id === $('preset').value); if (!c) return;
  addRow({ name: c.ad.replace(/ \(.*\)$/, ''), watt: c.watt, hours: c.saat, count: c.adet });
});
$('add-custom').addEventListener('click', () => {
  addRow({ name: $('c-name').value.trim() || 'Özel cihaz', watt: $('c-watt').value, hours: '', count: '1' });
  $('c-name').value = ''; $('c-watt').value = '';
});
$('clear').addEventListener('click', () => {
  $('form').querySelectorAll('input[type="text"]').forEach((i) => { i.value = ''; });
  $('days').value = '30'; $('g-load').value = '50'; $('a-cop').value = '3';
  $('devlist').textContent = ''; syncEmpty(); hideResult(); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last.summary); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) par = { ...par, ...(await res.json()) };
  } catch { /* gömülü varsayılanlar kullanılır */ }
  fillPresets();
  $('param-date').textContent = new Date(par.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}
syncMode(); syncEmpty(); init();
