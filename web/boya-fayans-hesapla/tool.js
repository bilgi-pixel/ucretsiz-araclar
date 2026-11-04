// Boya ve Fayans Hesaplama — saf matematik; tamamı tarayıcıda çalışır, hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

/** Alanı okur; boş = varsayılan, geçersiz/negatif = Türkçe hata. */
function num(id, label, { min = 0, max = Infinity, def = null, positive = false } = {}) {
  const raw = $(id).value.trim().replace(',', '.');
  if (raw === '') {
    if (def !== null) return def;
    throw new Error(`${label} alanı boş. Bir sayı yazın (örn. 4,5).`);
  }
  const v = Number(raw);
  if (!Number.isFinite(v) || v < min || v > max || (positive && v <= 0)) {
    throw new Error(`${label} geçersiz. ${positive ? '0\'dan büyük ' : ''}${min} ile ${max === Infinity ? 'üstü' : max} arasında bir sayı girin.`);
  }
  return v;
}

/** Litre ihtiyacını 2,5 / 7,5 / 15 L kovalarla en az israfla karşılar (önce toplam hacim, sonra kova sayısı en az). */
export function kovaOner(litre) {
  let best = null;
  const max15 = Math.ceil(litre / 15) + 1;
  for (let a = 0; a <= max15; a++) for (let b = 0; b <= 2; b++) for (let c = 0; c <= 2; c++) {
    const vol = a * 15 + b * 7.5 + c * 2.5;
    if (vol + 1e-9 < litre) continue;
    const cnt = a + b + c;
    if (!best || vol < best.vol - 1e-9 || (Math.abs(vol - best.vol) < 1e-9 && cnt < best.cnt)) best = { a, b, c, vol, cnt };
  }
  const parts = [];
  if (best.a) parts.push({ size: 15, adet: best.a });
  if (best.b) parts.push({ size: 7.5, adet: best.b });
  if (best.c) parts.push({ size: 2.5, adet: best.c });
  return parts;
}

function hesaplaBoya() {
  const en = num('b-en', 'Oda eni', { positive: true, max: 100 });
  const boy = num('b-boy', 'Oda boyu', { positive: true, max: 100 });
  const yuk = num('b-yuk', 'Tavan yüksekliği', { positive: true, max: 20, def: 2.5 });
  const kapiAdet = num('b-kapi', 'Kapı sayısı', { max: 50, def: 0 });
  const kapiAlan = num('b-kapi-alan', 'Kapı alanı', { max: 50, def: 1.9 });
  const pencAdet = num('b-penc', 'Pencere sayısı', { max: 50, def: 0 });
  const pencAlan = num('b-penc-alan', 'Pencere alanı', { max: 50, def: 1.4 });
  const kat = num('b-kat', 'Kat sayısı', { min: 1, max: 6, def: 2 });
  const verim = num('b-verim', 'Verim (m²/litre)', { positive: true, max: 30, def: 10 });
  const pay = num('b-pay', 'Fire payı', { max: 50, def: 5 });
  const duvar = 2 * (en + boy) * yuk;
  const dusulen = kapiAdet * kapiAlan + pencAdet * pencAlan;
  const tavan = $('b-tavan').checked ? en * boy : 0;
  const net = duvar - dusulen + tavan;
  if (net <= 0) throw new Error('Kapı ve pencere alanı duvar alanından büyük görünüyor. Kapı/pencere sayısını ya da alanlarını kontrol edip düzeltin.');
  const toplam = net * kat;
  const litre = (toplam / verim) * (1 + pay / 100);
  return { duvar, dusulen, tavan, net, toplam, litre, kovalar: kovaOner(litre), kat };
}

function hesaplaFayans() {
  const en = num('f-en', 'Alan eni', { positive: true, max: 1000 });
  const boy = num('f-boy', 'Alan boyu', { positive: true, max: 1000 });
  const cikar = num('f-cikar', 'Düşülecek alan', { max: 10000, def: 0 });
  const w = num('f-w', 'Fayans eni (cm)', { positive: true, max: 400 });
  const h = num('f-h', 'Fayans boyu (cm)', { positive: true, max: 400 });
  const derz = num('f-derz', 'Derz aralığı (mm)', { max: 30, def: 3 });
  const fire = num('f-fire', 'Fire oranı', { max: 50, def: 10 });
  const kutuM2 = num('f-kutu', 'Kutu içi m²', { max: 100, def: 0 });
  const alan = en * boy - cikar;
  if (alan <= 0) throw new Error('Düşülecek alan toplam alandan büyük ya da eşit görünüyor. Düşülecek alanı azaltın.');
  const birim = ((w + derz / 10) * (h + derz / 10)) / 10000; // derz payıyla bir fayansın kapladığı m²
  const adet = Math.ceil(alan / birim - 1e-9);
  const toplamAdet = Math.ceil(adet * (1 + fire / 100) - 1e-9);
  const fayansM2 = (w * h) / 10000;
  const kutu = kutuM2 > 0 ? Math.ceil((toplamAdet * fayansM2) / kutuM2 - 1e-9) : null;
  return { alan, adet, toplamAdet, fire, toplamM2: toplamAdet * fayansM2, kutu };
}

function show(rows, notes) {
  const dl = $('rows'); dl.textContent = '';
  for (const [k, v, strong, id] of rows) {
    const row = document.createElement('div'); row.className = 'kdv-row' + (strong ? ' is-strong' : '');
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v; if (id) dd.id = id;
    row.append(dt, dd); dl.append(row);
  }
  $('r-notes').textContent = notes;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let lastText = '';
function run() {
  showError($('error'), '');
  try {
    if ($('mode-boya').checked) {
      const r = hesaplaBoya();
      const kovaTxt = r.kovalar.map((k) => `${k.adet} × ${nf.format(k.size)} L`).join(' + ');
      show([
        ['Duvar alanı (brüt)', `${nf.format(r.duvar)} m²`, false, 'r-duvar'],
        ['Kapı/pencere düşümü', `${nf.format(r.dusulen)} m²`, false],
        ...(r.tavan ? [['Tavan alanı', `${nf.format(r.tavan)} m²`, false]] : []),
        [`Boyanacak alan (${r.kat} kat)`, `${nf.format(r.toplam)} m²`, false, 'r-alan'],
        ['Gereken boya', `${nf.format(r.litre)} litre`, true, 'r-litre'],
        ['Kova önerisi', kovaTxt, true, 'r-kova'],
      ], 'Boya tüketimi ürüne, yüzey emişine ve uygulama yöntemine göre değişir; ürün etiketindeki verim değerini girmek en doğru sonucu verir.');
      lastText = `Boya hesabı: boyanacak alan ${nf.format(r.toplam)} m², gereken boya ${nf.format(r.litre)} litre (${kovaTxt}).`;
    } else {
      const r = hesaplaFayans();
      show([
        ['Kaplanacak net alan', `${nf.format(r.alan)} m²`, false, 'r-alan'],
        ['Fireden önce fayans', `${r.adet} adet`, false, 'r-net-adet'],
        [`Fire dahil (%${nf.format(r.fire)})`, `${r.toplamAdet} adet`, true, 'r-adet'],
        ['Toplam fayans alanı', `${nf.format(r.toplamM2)} m²`, false],
        ...(r.kutu !== null ? [['Kutu sayısı', `${r.kutu} kutu`, true, 'r-kutu']] : []),
      ], 'Desenli döşeme, çapraz yerleşim ve kesim israfı fire oranını artırır; belirsizse %10-15 ile başlayın ve aynı partiden alın.');
      lastText = `Fayans hesabı: ${nf.format(r.alan)} m² için ${r.toplamAdet} adet${r.kutu !== null ? ` (${r.kutu} kutu)` : ''}.`;
    }
  } catch (e) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

function sync() {
  const boya = $('mode-boya').checked;
  $('p-boya').hidden = !boya; $('p-fayans').hidden = boya;
  $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), '');
}

$('mode-boya').addEventListener('change', sync);
$('mode-fayans').addEventListener('change', sync);
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => { $('form').reset(); sync(); });
$('copy').addEventListener('click', async () => {
  if (!lastText) return;
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
sync();
document.documentElement.dataset.ready = '1';
