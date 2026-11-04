// Kıble Yönü Bulma — tamamı tarayıcıda çalışır. Konumunuz yalnız bu sayfanın belleğinde tutulur;
// hiçbir sunucuya, harita servisine ya da üçüncü tarafa gönderilmez, kaydedilmez.
import { showError } from '../assets/js/ba.js';
import {
  KAABA, qibla, wmm, decimalYear, trueToMagnetic, angleDiff, norm360, validLatLon,
  qiblaSunTimes, sunOverKaaba, hhmm, headingFromEvent,
} from './hesap.js';
import { ILLER } from './konumlar.js';

const $ = (id) => document.getElementById(id);
const nf1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf4 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
const nf0 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const deg1 = (x) => nf1.format(Math.round(x * 10) / 10 === 360 ? 0 : Math.round(x * 10) / 10) + '°';
const collator = new Intl.Collator('tr');

const DIRS = ['Kuzey', 'Kuzey-kuzeydoğu', 'Kuzeydoğu', 'Doğu-kuzeydoğu', 'Doğu', 'Doğu-güneydoğu', 'Güneydoğu', 'Güney-güneydoğu',
  'Güney', 'Güney-güneybatı', 'Güneybatı', 'Batı-güneybatı', 'Batı', 'Batı-kuzeybatı', 'Kuzeybatı', 'Kuzey-kuzeybatı'];
export function directionName(b) { return DIRS[Math.round(norm360(b) / 22.5) % 16]; }
export function clockHour(b) { const h = Math.round(norm360(b) / 30) % 12; return h === 0 ? 12 : h; }

function showResult(el) { el.hidden = false; el.classList.add('is-active'); }
function hideResult(el) { el.hidden = true; el.classList.remove('is-active'); }

// ---------------------------------------------------------------------------
// Parametreler (Kâbe koordinatı, model bilgisi, güneşin Kâbe üstünde olduğu anlar)
let P = {
  guncelleme: '2026-11-05',
  kaynak: 'Diyanet İşleri Başkanlığı kıble sayfası; NOAA/NCEI WMM2025',
  kabe: { enlem: KAABA.lat, boylam: KAABA.lon },
  gunes_kabe_ustunde: null,
};
let kaaba = { ...KAABA };

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) P = { ...P, ...(await res.json()) };
  } catch (e) { /* çevrimdışı önbellekte yoksa gömülü varsayılanlar kullanılır */ }
  if (P.kabe && Number.isFinite(P.kabe.enlem) && Number.isFinite(P.kabe.boylam)) kaaba = { lat: P.kabe.enlem, lon: P.kabe.boylam };
  const d = new Date(String(P.guncelleme) + 'T12:00:00');
  const txt = Number.isNaN(d.getTime()) ? P.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('params-line').textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + P.kaynak;
  renderSunCard();
}

// ---------------------------------------------------------------------------
// Koordinat ayrıştırma: "41,0082", "41.0082", "-0.1278", "41° 0' 29.5\" K", "28 58 42 D"
export function parseCoord(raw, kind) {
  let s = String(raw ?? '').trim().toUpperCase().replace(/[’′]/g, "'").replace(/[”″]/g, '"');
  if (!s) return NaN;
  let sign = 1;
  const pos = kind === 'lat' ? /[KN]$/ : /[DE]$/;
  const neg = kind === 'lat' ? /[GS]$/ : /[BW]$/;
  if (neg.test(s)) { sign = -1; s = s.slice(0, -1).trim(); } else if (pos.test(s)) { s = s.slice(0, -1).trim(); }
  if (s.startsWith('-') || s.startsWith('−')) { sign *= -1; s = s.slice(1).trim(); } else if (s.startsWith('+')) s = s.slice(1).trim();
  if (!/^[0-9.,°'"\s]+$/.test(s)) return NaN;
  const nums = s.match(/\d+(?:[.,]\d+)?/g) || [];
  const hasSym = /[°'"]/.test(s);
  if (nums.length === 1 && !/\d\s+\d/.test(s)) {
    const v = Number(nums[0].replace(',', '.'));
    return sign * v;
  }
  if (!hasSym && nums.length !== 3) return NaN; // "41,0082 28,9784" gibi iki sayı DMS sayılmaz
  if (nums.length < 2 || nums.length > 3) return NaN;
  const [d, m, sec = '0'] = nums.map((x) => Number(x.replace(',', '.')));
  if (m >= 60 || Number(sec) >= 60) return NaN;
  return sign * (d + m / 60 + Number(sec) / 3600);
}

/** Enlem alanına "41.0082, 28.9784" yapıştırıldıysa iki değere ayırır. */
export function splitPair(raw) {
  const s = String(raw ?? '').trim();
  // Harita uygulamalarının biçimi: "41.0082,28.9784" (noktalı ondalık, virgülle ayrılmış)
  const g = s.match(/^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/);
  if (g) return [g[1], g[2]];
  // "41,0082" tek başına ondalık virgüldür; ikili yalnız ayırıcı belirginse kabul edilir
  const m = s.match(/^(-?\d+(?:[.,]\d+)?)\s*(?:;|\/|,\s+|\s+)\s*(-?\d+(?:[.,]\d+)?)$/);
  if (!m) return null;
  return [m[1], m[2]];
}

// ---------------------------------------------------------------------------
// Konum listesi
const ilSel = $('il'), ilceSel = $('ilce');
const sortedIller = [...ILLER].sort((a, b) => collator.compare(a[1], b[1]));
for (const [plaka, ad] of sortedIller) {
  const o = document.createElement('option');
  o.value = String(plaka);
  o.textContent = ad + ' (' + String(plaka).padStart(2, '0') + ')';
  ilSel.appendChild(o);
}
function fillIlce() {
  ilceSel.textContent = '';
  const il = ILLER.find((x) => String(x[0]) === ilSel.value);
  const m = document.createElement('option');
  m.value = ''; m.textContent = il ? 'Merkez' : 'Önce il seçin';
  ilceSel.appendChild(m);
  if (!il) { ilceSel.disabled = true; return; }
  ilceSel.disabled = il[4].length === 0;
  for (const [ad] of [...il[4]].sort((a, b) => collator.compare(a[0], b[0]))) {
    const o = document.createElement('option'); o.value = ad; o.textContent = ad; ilceSel.appendChild(o);
  }
}
fillIlce();

// ---------------------------------------------------------------------------
// Kaynak seçimi (liste / konum / elle)
const panes = { list: $('pane-list'), geo: $('pane-geo'), manual: $('pane-manual') };
function currentSource() { return (document.querySelector('input[name="src"]:checked') || {}).value || 'list'; }
function syncPanes() {
  const src = currentSource();
  for (const [k, el] of Object.entries(panes)) el.hidden = k !== src;
  $('calc').hidden = src === 'geo';
}
document.querySelectorAll('input[name="src"]').forEach((r) => r.addEventListener('change', () => { showError($('error'), ''); syncPanes(); }));
syncPanes();

// Tarih alanı: bugün (yerel)
function todayIso() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
$('date').value = todayIso();

// ---------------------------------------------------------------------------
// SVG pusula gülü: çentikler ve derece etiketleri bir kez çizilir
const SVGNS = 'http://www.w3.org/2000/svg';
(function drawRose() {
  const g = $('rose-ticks');
  for (let a = 0; a < 360; a += 5) {
    const long = a % 30 === 0, mid = a % 10 === 0;
    const r1 = 100, r2 = long ? 88 : mid ? 92 : 95;
    const t = (a - 90) * Math.PI / 180;
    const l = document.createElementNS(SVGNS, 'line');
    l.setAttribute('x1', (110 + r1 * Math.cos(t)).toFixed(2)); l.setAttribute('y1', (110 + r1 * Math.sin(t)).toFixed(2));
    l.setAttribute('x2', (110 + r2 * Math.cos(t)).toFixed(2)); l.setAttribute('y2', (110 + r2 * Math.sin(t)).toFixed(2));
    l.setAttribute('class', long ? 'kb-tick-l' : 'kb-tick');
    g.appendChild(l);
    if (long && a % 90 !== 0) {
      const tx = document.createElementNS(SVGNS, 'text');
      tx.setAttribute('x', (110 + 76 * Math.cos(t)).toFixed(2)); tx.setAttribute('y', (110 + 76 * Math.sin(t) + 3.5).toFixed(2));
      tx.setAttribute('class', 'kb-deg'); tx.textContent = String(a);
      g.appendChild(tx);
    }
  }
})();

// ---------------------------------------------------------------------------
// Hesap ve gösterim
let state = null; // { lat, lon, bearing, km, dec, compass, label, source }

function fail(msg) { hideResult($('result')); $('live-box').hidden = true; stopLive(); showError($('error'), msg); setWarnings([]); }

function setWarnings(list) {
  const ul = $('warn-list');
  ul.textContent = '';
  for (const w of list) { const li = document.createElement('li'); li.textContent = w; ul.appendChild(li); }
  $('warn').hidden = list.length === 0;
}

function placeText(lat, lon) {
  return nf4.format(Math.abs(lat)) + '° ' + (lat >= 0 ? 'K' : 'G') + ', ' + nf4.format(Math.abs(lon)) + '° ' + (lon >= 0 ? 'D' : 'B');
}

/** Hesaplar ve sonucu çizer. src: 'list' | 'geo' | 'manual' */
export function compute({ lat, lon, label, source, accuracy }) {
  showError($('error'), '');
  if (!validLatLon(lat, lon)) return fail('Koordinat geçersiz. Enlem −90 ile 90, boylam −180 ile 180 arasında olmalı (örnek: 41,0082 ve 28,9784).');
  const now = new Date();
  const q = qibla(lat, lon, kaaba);
  const year = decimalYear(now);
  const field = wmm(lat, lon, year);
  const dec = field.dec;
  const compass = trueToMagnetic(q.bearing, dec);
  state = { lat, lon, bearing: q.bearing, km: q.km, dec, compass, label, source, H: field.H };

  const warns = [];
  const nearKaaba = q.km < 1;
  if (accuracy && accuracy > 1000) {
    const errDeg = Math.atan((accuracy / 1000) / Math.max(q.km, 0.001)) * 180 / Math.PI;
    warns.push('Konum doğruluğu düşük (±' + nf1.format(accuracy / 1000) + ' km). Bu belirsizlik kıble açısını en fazla yaklaşık ' + nf1.format(Math.min(errDeg, 180)) + '° değiştirir; şüphedeyseniz açık alanda yeniden deneyin ya da il/ilçe listesiyle karşılaştırın.');
  }
  if (nearKaaba) {
    warns.push('Kâbe\'ye yaklaşık ' + nf0.format(q.km * 1000) + ' metre uzaklıktasınız. Bu kadar yakında birkaç metrelik konum hatası bile açıyı büyük ölçüde değiştirir; Kâbe\'yi görerek ya da Mescid-i Haram\'daki safların yönüne bakarak yönelin.');
  }
  if (q.km > 19990) {
    warns.push('Kâbe\'nin dünyadaki tam karşı noktasına çok yakınsınız. Buradan her yön Kâbe\'ye neredeyse aynı uzaklıktadır; açı güvenilir değildir.');
  }
  if (Math.abs(lat) >= 89.9) {
    warns.push('Kutup noktasında "kuzey" yönü tanımsızdır; açı anlamını yitirir. Kâbe\'ye giden büyük daire 39,8° D meridyeni boyuncadır.');
  } else if (field.H < 2000) {
    warns.push('Manyetik kutba çok yakınsınız (WMM "kör bölge"). Burada pusula güvenilmez; yalnız gerçek kuzeye göre açıyı güneş ya da GPS yardımıyla kullanın.');
  } else if (field.H < 6000 || Math.abs(lat) >= 66.5) {
    warns.push('Kutup bölgesine yakınsınız: manyetik sapma büyük ve hızlı değişebilir, güneş bazı mevsimlerde hiç doğmayabilir. Pusula açısını dikkatle kullanın.');
  }
  if (!field.valid) {
    warns.push('Cihaz tarihi WMM2025 modelinin geçerlilik aralığının (2025–2029) dışında görünüyor; pusula (manyetik) açısı tahmini zayıflar. Gerçek kuzeye göre açı etkilenmez.');
  }
  setWarnings(warns);

  $('r-place').textContent = (label ? label + ' · ' : '') + placeText(lat, lon);
  $('r-bearing').textContent = deg1(q.bearing);
  $('r-dir').textContent = directionName(q.bearing) + ' · kuzey saat 12 kabul edilirse saat ' + clockHour(q.bearing) + ' yönü';
  $('r-compass').textContent = deg1(compass);
  $('r-dec').textContent = nf1.format(Math.abs(dec)) + '° ' + (dec >= 0 ? 'doğu' : 'batı') + ' (WMM2025, ' + now.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) + ')';
  $('r-km').textContent = nearKaaba ? nf0.format(q.km * 1000) + ' m' : nf0.format(q.km) + ' km';
  $('r-time').textContent = qiblaTimeText(lat, lon, q.bearing, source, nearKaaba);

  // Pusula gülü
  $('qibla-arrow').setAttribute('transform', 'rotate(' + q.bearing.toFixed(2) + ' 110 110)');
  $('mag-north').setAttribute('transform', 'rotate(' + dec.toFixed(2) + ' 110 110)');
  $('rose').setAttribute('transform', 'rotate(0 110 110)');
  $('rose-title').textContent = 'Kıble yönü: gerçek kuzeyden saat yönünde ' + deg1(q.bearing) + ', ' + directionName(q.bearing).toLowerCase();

  // Kâğıt pusula adımları
  $('p-compass').textContent = deg1(compass);
  $('p-compass2').textContent = deg1(compass);
  $('p-dir').textContent = directionName(q.bearing).toLowerCase();

  showResult($('result'));
  $('live-box').hidden = false;
  if (live.on) updateLive();
  return state;
}

function qiblaTimeText(lat, lon, bearing, source, nearKaaba) {
  if (nearKaaba) return 'Kâbe\'ye çok yakınken anlamlı değildir.';
  const v = $('date').value || todayIso();
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return '—';
  const y = +m[1], mo = +m[2] - 1, d = +m[3];
  const offsetMin = source === 'list' ? 180 : -new Date(y, mo, d, 12).getTimezoneOffset();
  const dayStart = Date.UTC(y, mo, d) - offsetMin * 60000;
  const times = qiblaSunTimes(dayStart, lat, lon, bearing);
  const absMin = Math.abs(offsetMin);
  const zone = source === 'list' ? 'TSİ' : 'cihaz saatiyle, UTC' + (offsetMin >= 0 ? '+' : '−') + Math.floor(absMin / 60) + (absMin % 60 ? ':' + String(absMin % 60).padStart(2, '0') : '');
  const dateTxt = new Date(Date.UTC(y, mo, d, 12)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  if (!times.length) return 'Bu tarihte güneş, gündüz saatlerinde kıble yönüne gelmiyor (' + dateTxt + ').';
  return times.map((t) => hhmm(t.ms, offsetMin)).join(' ve ') + ' (' + zone + ', ' + dateTxt + ')';
}

function run() {
  const src = currentSource();
  if (src === 'list') {
    const il = ILLER.find((x) => String(x[0]) === ilSel.value);
    if (!il) return fail('Listeden bir il seçin. İliniz yoksa "Enlem / boylam gir" seçeneğiyle koordinat yazabilirsiniz.');
    let lat = il[2], lon = il[3], label = il[1] + ' – Merkez';
    if (ilceSel.value) {
      const ilce = il[4].find((x) => x[0] === ilceSel.value);
      if (ilce) { lat = ilce[1]; lon = ilce[2]; label = il[1] + ' – ' + ilce[0]; }
    }
    return compute({ lat, lon, label, source: 'list' });
  }
  if (src === 'manual') {
    let latRaw = $('lat').value, lonRaw = $('lon').value;
    if (!lonRaw.trim()) {
      const pair = splitPair(latRaw);
      if (pair) { [latRaw, lonRaw] = pair; $('lat').value = latRaw; $('lon').value = lonRaw; }
    }
    if (!latRaw.trim() || !lonRaw.trim()) return fail('Enlem ve boylamı birlikte yazın (örnek: enlem 41,0082 ve boylam 28,9784). Güney enlemi ve batı boylamı için eksi işareti kullanın.');
    const lat = parseCoord(latRaw, 'lat'), lon = parseCoord(lonRaw, 'lon');
    if (Number.isNaN(lat) || Number.isNaN(lon)) return fail('Koordinat okunamadı. Ondalık derece yazın (41,0082) ya da derece-dakika-saniye biçimini sembollerle girin (41° 0\' 29,5" K).');
    if (lat < -90 || lat > 90) return fail('Enlem −90 ile 90 arasında olmalı. Enlem ve boylamın yerini karıştırmış olabilirsiniz.');
    if (lon < -180 || lon > 180) return fail('Boylam −180 ile 180 arasında olmalı. Değeri kontrol edin.');
    return compute({ lat, lon, label: 'Girilen koordinat', source: 'manual' });
  }
  return useGeo();
}

// ---------------------------------------------------------------------------
// Konumumu kullan (Geolocation API, yalnız kullanıcı tıklayınca)
function geoStatus(msg) { $('geo-status').textContent = msg; }
function useGeo() {
  showError($('error'), '');
  if (!window.isSecureContext) return fail('Konum yalnızca güvenli (https) bağlantıda kullanılabilir. Sayfayı https:// ile açın ya da il/ilçe listesinden seçin.');
  if (!('geolocation' in navigator)) return fail('Tarayıcınız konum özelliğini desteklemiyor. İl/ilçe listesinden seçin ya da enlem/boylam girin.');
  geoStatus('Konum isteniyor… Tarayıcının sorduğu izne "İzin ver" deyin.');
  $('geo').disabled = true;
  navigator.geolocation.getCurrentPosition((pos) => {
    $('geo').disabled = false;
    const { latitude, longitude, accuracy } = pos.coords;
    geoStatus('Konum alındı (doğruluk ±' + (accuracy >= 1000 ? nf1.format(accuracy / 1000) + ' km' : nf0.format(accuracy) + ' m') + '). Koordinat yalnız bu sayfada kullanıldı, hiçbir yere gönderilmedi.');
    compute({ lat: latitude, lon: longitude, label: 'Konumunuz', source: 'geo', accuracy });
  }, (err) => {
    $('geo').disabled = false;
    geoStatus('');
    if (err && err.code === 1) return fail('Konum izni verilmedi. Adres çubuğundaki konum simgesinden izin verebilir ya da "İl / ilçe listesinden" seçeneğiyle ilinizi seçebilirsiniz.');
    if (err && err.code === 3) return fail('Konum zamanında alınamadı. Açık alana çıkıp yeniden deneyin ya da listeden ilinizi seçin.');
    return fail('Konum belirlenemedi. Cihazınızın konum servisinin açık olduğundan emin olun ya da listeden ilinizi seçin.');
  }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
}

// ---------------------------------------------------------------------------
// Canlı pusula (DeviceOrientation)
const live = { on: false, evName: null, handler: null, timer: 0, aligned: false, got: false };

function liveStatus(msg) { $('live-status').textContent = msg; }

function stopLive() {
  if (live.handler && live.evName) window.removeEventListener(live.evName, live.handler);
  window.removeEventListener('compassneedscalibration', onCalib);
  clearTimeout(live.timer);
  live.on = false; live.handler = null; live.aligned = false; live.got = false;
  $('live-start').hidden = false; $('live-stop').hidden = true;
  $('live-box').classList.remove('is-aligned', 'is-live');
  $('result').classList.remove('is-aligned', 'is-live');
  $('rose').setAttribute('transform', 'rotate(0 110 110)');
  $('live-readout').textContent = '';
}

function onCalib(e) {
  if (e && e.preventDefault) e.preventDefault();
  liveStatus('Pusula kalibrasyon istiyor: telefonu havada birkaç kez yatay "8" çizer gibi çevirin, sonra yeniden hizalayın.');
}

let lastHeading = null;
function onOrientation(ev) {
  const angle = (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle : (typeof window.orientation === 'number' ? window.orientation : 0);
  const h = headingFromEvent(ev, angle);
  if (h === null) return;
  live.got = true;
  lastHeading = h;
  updateLive();
}

function updateLive() {
  if (!state || lastHeading === null) return;
  const trueHeading = norm360(lastHeading + state.dec);
  const diff = angleDiff(trueHeading, state.bearing); // + ise sağa (saat yönü) dönülmeli
  $('rose').setAttribute('transform', 'rotate(' + (-trueHeading).toFixed(1) + ' 110 110)');
  const aligned = Math.abs(diff) <= 3;
  $('live-box').classList.toggle('is-aligned', aligned);
  $('result').classList.toggle('is-aligned', aligned);
  if (aligned) {
    $('live-readout').textContent = '✓ Kıbleye dönüksünüz (sapma ' + nf1.format(Math.abs(diff)) + '°).';
    if (!live.aligned && navigator.vibrate) { try { navigator.vibrate([60, 40, 60]); } catch (e) { /* titreşim yoksa sessiz geç */ } }
  } else {
    $('live-readout').textContent = 'Telefonun üst kenarı ' + deg1(trueHeading) + ' yönünde. Kıble için ' + nf0.format(Math.abs(diff)) + '° ' + (diff > 0 ? 'sağa' : 'sola') + ' dönün.';
  }
  live.aligned = aligned;
}

async function startLive() {
  showError($('error'), '');
  if (!state) return;
  if (!window.isSecureContext) { liveStatus('Yön sensörü yalnızca güvenli (https) bağlantıda çalışır. Sayfayı https:// ile açın; o zamana kadar aşağıdaki kâğıt pusula yöntemini kullanın.'); return; }
  if (typeof window.DeviceOrientationEvent === 'undefined') { liveStatus('Bu cihazda yön sensörü bulunamadı. Masaüstü bilgisayarlarda normaldir; aşağıdaki kâğıt pusula yöntemini kullanın.'); return; }
  // iOS 13+: izin, kullanıcı tıklamasının içinde istenmeli
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const r = await DeviceOrientationEvent.requestPermission();
      if (r !== 'granted') { liveStatus('Hareket ve yön izni verilmedi. Tarayıcının site ayarlarından hareket sensörleri iznini açın (iPhone/iPad: Ayarlar › Safari › "Hareket ve Yön Erişimi"), sayfayı yenileyip yeniden deneyin. O zamana kadar aşağıdaki kâğıt pusula yöntemini kullanabilirsiniz.'); return; }
    } catch (e) { liveStatus('Yön izni istenemedi. Sayfayı yenileyip "Canlı pusulayı başlat" düğmesine yeniden dokunun.'); return; }
  }
  live.evName = ('ondeviceorientationabsolute' in window) ? 'deviceorientationabsolute' : 'deviceorientation';
  live.handler = onOrientation;
  window.addEventListener(live.evName, live.handler);
  window.addEventListener('compassneedscalibration', onCalib);
  live.on = true; live.got = false; lastHeading = null;
  $('live-start').hidden = true; $('live-stop').hidden = false;
  $('live-box').classList.add('is-live');
  $('result').classList.add('is-live');
  liveStatus('Telefonu yere paralel tutun; üst kenarı kıble okuna gelene kadar kendi ekseninizde dönün.');
  live.timer = setTimeout(() => {
    if (live.on && !live.got) liveStatus('Yön sensöründen veri gelmedi. Masaüstü bilgisayarlarda pusula sensörü bulunmaz; aşağıdaki kâğıt pusula yöntemini kullanın. Telefondaysanız tarayıcının "hareket ve yön" iznini açın.');
  }, 3000);
}

$('live-start').addEventListener('click', startLive);
$('live-stop').addEventListener('click', () => { stopLive(); liveStatus('Canlı pusula durduruldu.'); $('live-start').focus(); });

// ---------------------------------------------------------------------------
// Güneşin Kâbe'nin tam üstünde olduğu anlar kartı
function renderSunCard() {
  const now = Date.now();
  let rows = [];
  let approx = false, note = '';
  const p = P.gunes_kabe_ustunde;
  if (p && Array.isArray(p.anlar)) {
    rows = p.anlar.map((a) => ({ ms: Date.parse(a.tarih + 'T' + a.saat + ':00+03:00'), saat: a.saat }));
    approx = p.yaklasik === true;
    note = p.uyari || '';
  }
  // Geçmiş anları gösterme; parametredeki anların hepsi geçtiyse sonraki yıllar için hesapla
  rows = rows.filter((r) => Number.isFinite(r.ms) && r.ms > now);
  if (!rows.length) {
    const y = new Date(now).getUTCFullYear();
    for (const yy of [y, y + 1]) {
      const c = sunOverKaaba(yy, kaaba).filter((x) => x.ms > now);
      if (c.length) { rows = c.map((x) => ({ ms: x.ms, saat: hhmm(x.ms, 180) })); break; }
    }
    approx = true;
    note = 'Bu anlar astronomik hesapla bulunmuştur; Diyanet\'in o yıla ait duyurusunu kontrol edin.';
  }
  const ul = $('sun-list');
  ul.textContent = '';
  for (const r of rows) {
    const li = document.createElement('li');
    const d = new Date(r.ms + 3 * 3600000);
    li.textContent = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long', timeZone: 'UTC' }) + ', saat ' + r.saat + ' (TSİ)';
    ul.appendChild(li);
  }
  $('sun-approx').hidden = !approx;
  $('sun-approx-text').textContent = note;
}

// ---------------------------------------------------------------------------
// Olaylar
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('geo').addEventListener('click', () => useGeo());
ilSel.addEventListener('change', () => { fillIlce(); if (ilSel.value) run(); });
ilceSel.addEventListener('change', () => run());
$('date').addEventListener('change', () => { if (state) $('r-time').textContent = qiblaTimeText(state.lat, state.lon, state.bearing, state.source, state.km < 1); });
$('clear').addEventListener('click', () => {
  stopLive();
  $('form').reset();
  $('date').value = todayIso();
  fillIlce(); syncPanes();
  state = null;
  hideResult($('result')); $('live-box').hidden = true; setWarnings([]);
  showError($('error'), ''); geoStatus(''); liveStatus('');
  ilSel.focus();
});

loadParams();

// Test kancası: yalnız okuma amaçlı anlık durum
window.__kibleYonuBulTest = () => (state ? { ...state } : null);
