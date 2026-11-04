// Şehirler Arası Mesafe Hesaplama — tamamı tarayıcıda çalışır; harita ya da ağ isteği yoktur.
// Mesafe, 81 il merkezinin koordinatlarından (veri.json) haversine formülüyle hesaplanır.
// Karayolu mesafesi YAKLAŞIKTIR: kuş uçuşu × 1,25. Gerçek rota ve süre için güncel harita uygulamasına bakın.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf0 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nfMoney = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const EARTH_R_KM = 6371; // ortalama Dünya yarıçapı
export const ROAD_FACTOR = 1.25; // kuş uçuşundan tahmini karayoluna çarpan
export const MAX_STOPS = 8;
const APPROX_NOTE = 'Mesafeler il merkezleri arasındadır ve yaklaşıktır; karayolu değeri kuş uçuşu × 1,25 ile tahmin edilir. Gerçek rota, süre ve yol durumu için güncel harita uygulamasını kontrol edin.';

/* ---------- Saf hesap fonksiyonları ---------- */
const rad = (d) => (d * Math.PI) / 180;

/** İki nokta arası kuş uçuşu mesafe (km, ham değer); haversine. */
export function haversine(a, b) {
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_R_KM * Math.asin(Math.sqrt(h));
}

/** Bir ayak: tam sayıya yuvarlanmış kuş uçuşu ve tahmini karayolu. */
export function leg(a, b) {
  const raw = haversine(a, b);
  return { from: a, to: b, air: Math.round(raw), road: Math.round(raw * ROAD_FACTOR) };
}

/** Rota toplamı: ayakların (yuvarlanmış) toplamı, böylece ekrandaki satırlar toplamla tutarlı olur. */
export function route(points) {
  const legs = [];
  for (let i = 0; i < points.length - 1; i++) legs.push(leg(points[i], points[i + 1]));
  return { legs, air: legs.reduce((s, l) => s + l.air, 0), road: legs.reduce((s, l) => s + l.road, 0) };
}

/** Bir ile en yakın n il (kuş uçuşu). */
export function nearest(iller, city, n = 5) {
  return iller
    .filter((c) => c.plaka !== city.plaka)
    .map((c) => ({ city: c, km: haversine(city, c) }))
    .sort((x, y) => x.km - y.km)
    .slice(0, n)
    .map((x) => ({ city: x.city, km: Math.round(x.km) }));
}

/** Sürüş süresi (dakika). */
export const driveMinutes = (km, speed) => Math.round((km / speed) * 60);

/** Dakika → "4 sa 51 dk". */
export function fmtDuration(min) {
  const h = Math.floor(min / 60), m = min % 60;
  if (h === 0) return `${m} dk`;
  return m === 0 ? `${h} sa` : `${h} sa ${m} dk`;
}

/** Türkçe sayı girişini çözer: "1.417,50", "7,5", "45.5". Boşsa null, geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (t === '') return null;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

/** Yakıt girişleri: ikisi de boşsa null; yalnız biri doluysa ya da geçersizse çözüm öneren Türkçe hata. */
export function parseFuel(consStr, priceStr) {
  const cons = parseNum(consStr), price = parseNum(priceStr);
  if (cons === null && price === null) return null;
  if (Number.isNaN(cons) || (cons !== null && (cons <= 0 || cons > 60))) {
    throw new Error('Yakıt tüketimi geçerli bir sayı olmalı (100 km için litre, örn. 7,5). Rakamla yazın ya da yakıt alanlarını boş bırakın.');
  }
  if (Number.isNaN(price) || (price !== null && (price <= 0 || price > 1000))) {
    throw new Error('Yakıt fiyatı geçerli bir sayı olmalı (litre başına TL, örn. 45,50). Rakamla yazın ya da yakıt alanlarını boş bırakın.');
  }
  if (cons === null || price === null) {
    throw new Error('Yakıt maliyeti için hem tüketimi hem litre fiyatını girin. İkisini de doldurun ya da ikisini de boş bırakın.');
  }
  return { cons, price };
}

/** Yakıt miktarı (L) ve maliyet (TL). */
export function fuelFor(roadKm, fuel) {
  const liters = (roadKm / 100) * fuel.cons;
  return { liters, cost: liters * fuel.price };
}

/** Seçili il kodlarını doğrular; ardışık aynı il ya da boş seçimde çözüm öneren hata fırlatır. */
export function validateIds(ids, names) {
  if (!ids[0]) throw new Error('Başlangıç ilini seçin. Listeden yola çıkacağınız ili işaretleyin.');
  for (let i = 1; i < ids.length - 1; i++) {
    if (!ids[i]) throw new Error(`${i}. ara durak için il seçilmedi. Bir il seçin ya da "Kaldır" düğmesiyle durağı silin.`);
  }
  if (!ids[ids.length - 1]) throw new Error('Varış ilini seçin. Listeden gideceğiniz ili işaretleyin.');
  for (let i = 0; i < ids.length - 1; i++) {
    if (ids[i] === ids[i + 1]) {
      throw new Error(ids.length === 2
        ? `Başlangıç ve varış ili aynı (${names[i]}). Farklı bir varış ili seçin.`
        : `${names[i]} iki kez arka arkaya seçilmiş. Ardışık iki noktayı farklı illerle değiştirin ya da durağı kaldırın.`);
    }
  }
}

/* ---------- Veri yükleme ---------- */
async function loadData() {
  try {
    const res = await fetch(new URL('./veri.json', import.meta.url));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.iller) || json.iller.length !== 81) throw new Error('veri');
    return json.iller;
  } catch {
    throw new Error('İl listesi yüklenemedi. Bağlantınızı kontrol edip sayfayı yenileyin; sorun sürerse tarayıcı önbelleğini temizleyin.');
  }
}

let iller = null; // yüklenen il listesi
let byId = new Map();
const dataPromise = loadData();

/* ---------- Arayüz ---------- */
function fillSelect(sel) {
  const sorted = [...iller].sort((a, b) => a.ad.localeCompare(b.ad, 'tr'));
  const keep = sel.value;
  sel.replaceChildren(new Option('İl seçin', ''), ...sorted.map((c) => new Option(c.ad, String(c.plaka))));
  sel.value = keep;
}

function addStop() {
  if (!iller) return;
  const wrap = $('stops');
  if (wrap.children.length >= MAX_STOPS) return;
  const row = document.createElement('div');
  row.className = 'uz-stop';
  const sel = document.createElement('select');
  sel.className = 'uz-stop-select';
  sel.setAttribute('aria-label', `Ara durak ${wrap.children.length + 1}`);
  fillSelect(sel);
  const rm = document.createElement('button');
  rm.type = 'button'; rm.className = 'ba-btn'; rm.textContent = 'Kaldır';
  rm.addEventListener('click', () => { row.remove(); relabelStops(); $('add-stop').disabled = false; $('add-stop').focus(); });
  row.append(sel, rm);
  wrap.append(row);
  sel.focus();
  $('add-stop').disabled = wrap.children.length >= MAX_STOPS;
}
function relabelStops() {
  [...$('stops').children].forEach((row, i) => row.querySelector('select').setAttribute('aria-label', `Ara durak ${i + 1}`));
}

function li(name, value) {
  const el = document.createElement('li');
  const a = document.createElement('span'); a.textContent = name;
  const b = document.createElement('span'); b.textContent = value;
  el.append(a, b);
  return el;
}
function row(label, value, strong, id) {
  const r = document.createElement('div');
  r.className = 'kdv-row' + (strong ? ' is-strong' : '');
  const dt = document.createElement('dt'); dt.textContent = label;
  const dd = document.createElement('dd'); dd.textContent = value;
  if (id) dd.id = id;
  r.append(dt, dd);
  return r;
}

let last = null;
function render(points, rt, speed, fuel) {
  const names = points.map((p) => p.ad);
  const minutes = driveMinutes(rt.road, speed);
  $('r-route').textContent = names.join(' → ');
  const rows = [
    row('Kuş uçuşu mesafe', `${nf0.format(rt.air)} km`, false, 'r-air'),
    row('Yaklaşık karayolu mesafesi', `${nf0.format(rt.road)} km`, true, 'r-road'),
    row(`Tahmini sürüş süresi (${speed} km/s ortalama)`, fmtDuration(minutes), true, 'r-time'),
  ];
  let fuelText = '';
  if (fuel) {
    const f = fuelFor(rt.road, fuel);
    rows.push(row('Tahmini yakıt miktarı', `${nf1.format(f.liters)} L`, false, 'r-liters'));
    rows.push(row('Tahmini yakıt maliyeti', `${nfMoney.format(f.cost)} TL`, true, 'r-cost'));
    fuelText = ` Yakıt: yaklaşık ${nf1.format(f.liters)} L, ${nfMoney.format(f.cost)} TL.`;
  }
  $('r-list').replaceChildren(...rows);
  $('r-fuel-hint').hidden = !!fuel;
  // Ara duraklı rotada ayak ayak döküm
  const multi = rt.legs.length > 1;
  $('r-legs-wrap').hidden = !multi;
  $('r-legs').replaceChildren(...rt.legs.map((l) => li(`${l.from.ad} → ${l.to.ad}`, `${nf0.format(l.air)} km kuş uçuşu · yaklaşık ${nf0.format(l.road)} km yol`)));
  // En yakın 5 il: başlangıç ve varış için
  const first = points[0], lastPt = points[points.length - 1];
  $('r-near-from-h').textContent = `${first.ad} için en yakın 5 il`;
  $('r-near-to-h').textContent = `${lastPt.ad} için en yakın 5 il`;
  $('r-near-from').replaceChildren(...nearest(iller, first).map((x) => li(x.city.ad, `${nf0.format(x.km)} km`)));
  $('r-near-to').replaceChildren(...nearest(iller, lastPt).map((x) => li(x.city.ad, `${nf0.format(x.km)} km`)));
  $('r-note').textContent = APPROX_NOTE;
  $('result').hidden = false; $('result').classList.add('is-active');
  last = `${names.join(' → ')}: kuş uçuşu ${nf0.format(rt.air)} km, yaklaşık karayolu ${nf0.format(rt.road)} km, tahmini sürüş ${fmtDuration(minutes)} (${speed} km/s).${fuelText} ${APPROX_NOTE}`;
}

function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); last = null; }

async function run() {
  showError($('error'), '');
  try {
    if (!iller) { iller = await dataPromise; byId = new Map(iller.map((c) => [String(c.plaka), c])); }
    const ids = [$('from').value, ...[...document.querySelectorAll('.uz-stop-select')].map((s) => s.value), $('to').value];
    const names = ids.map((id) => (byId.get(id) || {}).ad || '');
    validateIds(ids, names);
    const fuel = parseFuel($('cons').value, $('price').value);
    const points = ids.map((id) => byId.get(id));
    render(points, route(points), +$('speed').value, fuel);
  } catch (e) {
    hideResult();
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('add-stop').addEventListener('click', addStop);
$('swap').addEventListener('click', () => {
  const a = $('from').value; $('from').value = $('to').value; $('to').value = a;
});
$('clear').addEventListener('click', () => {
  $('from').value = ''; $('to').value = ''; $('stops').replaceChildren(); $('add-stop').disabled = false;
  $('cons').value = ''; $('price').value = ''; $('speed').value = '90';
  hideResult(); showError($('error'), ''); $('from').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

// Veri gelince açılır listeleri doldur; gelmezse Türkçe, çözüm öneren hata göster.
dataPromise.then((list) => {
  iller = list; byId = new Map(list.map((c) => [String(c.plaka), c]));
  fillSelect($('from')); fillSelect($('to'));
  $('add-stop').disabled = false;
}, (err) => showError($('error'), err.message));
