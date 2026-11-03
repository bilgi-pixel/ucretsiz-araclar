// Takdir Teşekkür Hesaplama: haftalık ders saatine göre ağırlıklı ortalama + eşik kontrolü. Her şey tarayıcıda.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = (n, d = 2) => (Math.round(n * 10 ** d) / 10 ** d).toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d });
const DEFAULT_COURSES = [['Türk Dili ve Edebiyatı', 5], ['Matematik', 6], ['Fizik', 2], ['Kimya', 2], ['Biyoloji', 2], ['Tarih', 2], ['İngilizce', 4], ['Din Kültürü', 2]];

let P = null;
let last = null;
let seq = 0;

function addRow(ad = '', saat = '') {
  const i = seq++;
  const row = document.createElement('div');
  row.className = 'net-row tk-row';
  row.innerHTML = `
    <div class="ders-in net-ad"><label for="d-${i}-ad">Ders adı</label><input id="d-${i}-ad" class="r-ad" type="text" maxlength="40" autocomplete="off"></div>
    <div class="ders-in"><label for="d-${i}-saat">Haftalık saat</label><input id="d-${i}-saat" class="r-saat" type="text" inputmode="numeric" autocomplete="off"></div>
    <div class="ders-in"><label for="d-${i}-p1" class="l-p1">1. dönem puanı</label><input id="d-${i}-p1" class="r-p1" type="text" inputmode="decimal" autocomplete="off"></div>
    <div class="ders-in r-p2-wrap"><label for="d-${i}-p2">2. dönem puanı</label><input id="d-${i}-p2" class="r-p2" type="text" inputmode="decimal" autocomplete="off"></div>
    <button type="button" class="ba-btn net-del" aria-label="Dersi sil">Sil</button>`;
  row.querySelector('.r-ad').value = ad;
  row.querySelector('.r-saat').value = String(saat);
  row.querySelector('.net-del').addEventListener('click', () => row.remove());
  $('rows').append(row);
  applyMode();
}

function mode() { return document.querySelector('input[name="mode"]:checked').value; }

function applyMode() {
  const yil = mode() === 'yil';
  for (const w of document.querySelectorAll('.r-p2-wrap')) w.hidden = !yil;
  for (const l of document.querySelectorAll('.l-p1')) l.textContent = yil ? '1. dönem puanı' : 'Dönem puanı';
}

function num(v, label, { min = 0, max = 100, int = false } = {}) {
  const s = String(v).trim().replace(',', '.');
  if (s === '') return null;
  const n = Number(s);
  if (!Number.isFinite(n) || (int && !Number.isInteger(n))) throw new Error(`${label} için geçerli bir sayı yazın (örn. ${int ? '4' : '85,5'}). Harf veya boşluk kullanmayın.`);
  if (n < min || n > max) throw new Error(`${label} ${min} ile ${max} arasında olmalı. Girdiğiniz değer: ${s.replace('.', ',')}.`);
  return n;
}

function compute() {
  const yil = mode() === 'yil';
  const takdir = num($('p-takdir').value, 'Takdir eşiği', { min: 1, max: 100 });
  const tesekkur = num($('p-tesekkur').value, 'Teşekkür eşiği', { min: 1, max: 100 });
  const alt = num($('p-alt').value, 'Ders alt sınırı', { min: 0, max: 100 });
  if (takdir == null || tesekkur == null || alt == null) throw new Error('Eşik alanları boş bırakılamaz. "Eşikleri sıfırla" düğmesiyle varsayılan değerlere dönebilirsiniz.');
  if (tesekkur >= takdir) throw new Error('Teşekkür eşiği takdir eşiğinden küçük olmalı (örn. 70 ve 85).');

  const known = []; // iki dönemi de belli dersler (veya dönem modunda tek puan)
  const pending = []; // yalnızca 1. dönemi girilmiş, 2. dönemi bekleyen dersler
  const rows = [...document.querySelectorAll('#rows .tk-row')];
  rows.forEach((r, idx) => {
    const ad = r.querySelector('.r-ad').value.trim() || `Ders ${idx + 1}`;
    const p1 = num(r.querySelector('.r-p1').value, `"${ad}" ${yil ? '1. dönem' : 'dönem'} puanı`);
    const p2 = yil ? num(r.querySelector('.r-p2').value, `"${ad}" 2. dönem puanı`) : null;
    if (p1 == null && p2 == null) return; // boş satır atlanır
    const saat = num(r.querySelector('.r-saat').value, `"${ad}" haftalık ders saati`, { min: 1, max: 40, int: true });
    if (saat == null) throw new Error(`"${ad}" dersinin haftalık ders saatini yazın (örn. 4). Ağırlıklı ortalama için saat gereklidir; dersi hesaba katmak istemiyorsanız puanlarını boş bırakın ya da dersi silin.`);
    if (yil && p1 == null) throw new Error(`"${ad}" için 1. dönem puanını da girin. Yalnızca 2. dönemi girilen ders hesaplanamaz.`);
    if (yil && p2 == null) pending.push({ ad, saat, p1 });
    else known.push({ ad, saat, p1, p2, yp: yil ? (p1 + p2) / 2 : p1 });
  });
  if (!known.length && !pending.length) throw new Error('Hesaplanacak ders yok. En az bir dersin puanını girin; puanı boş bırakılan satırlar dikkate alınmaz.');

  // Bekleyen derslerin yıl sonu puanı geçici olarak 1. dönem puanı sayılır (şimdiki durum).
  const all = [...known, ...pending.map((x) => ({ ad: x.ad, saat: x.saat, p1: x.p1, p2: null, yp: x.p1, bekleyen: true }))];
  const W = all.reduce((a, x) => a + x.saat, 0);
  const sum = all.reduce((a, x) => a + x.saat * x.yp, 0);
  const ort = sum / W;
  const dusuk = all.filter((x) => x.yp < alt);
  let belge = 'yok';
  if (!dusuk.length && ort >= takdir) belge = 'takdir';
  else if (!dusuk.length && ort >= tesekkur) belge = 'tesekkur';

  // Eksik puan: hedef belge için gereken ortalama farkı
  const hedefBelge = belge === 'takdir' ? null : (belge === 'tesekkur' ? { ad: 'takdir', esik: takdir } : { ad: 'teşekkür', esik: tesekkur });
  let eksik = null;
  if (hedefBelge) {
    const farkOrt = Math.max(0, hedefBelge.esik - ort);
    eksik = { hedef: hedefBelge.ad, esik: hedefBelge.esik, farkOrt, farkToplam: farkOrt * W };
    if (pending.length) {
      // Bekleyen derslerin 2. dönem ortalaması x için: Σbilinen + Σbekleyen·saat·(p1+x)/2 ≥ esik·W
      const sBil = known.reduce((a, k) => a + k.saat * k.yp, 0);
      const sPendP1 = pending.reduce((a, k) => a + k.saat * k.p1, 0);
      const sPendS = pending.reduce((a, k) => a + k.saat, 0);
      eksik.gerekenP2 = (hedefBelge.esik * W - sBil - sPendP1 / 2) / (sPendS / 2);
    }
  }
  return { yil, takdir, tesekkur, alt, all, pending, W, ort, dusuk, belge, eksik };
}

function render(r) {
  $('r-ort').textContent = fmt(r.ort);
  const dur = $('r-durum');
  dur.textContent = r.belge === 'takdir' ? 'Takdir belgesi' : r.belge === 'tesekkur' ? 'Teşekkür belgesi' : 'Takdir/teşekkür belgesi yok';
  dur.dataset.durum = r.belge;
  $('r-ders').textContent = `${r.all.length} ders · toplam ${r.W} saat`;
  const reasons = [];
  if (r.dusuk.length) reasons.push(`Şu derslerin puanı ${fmt(r.alt, 0)} altında: ${r.dusuk.map((x) => `${x.ad} (${fmt(x.yp)})`).join(', ')}. Ortalama yüksek olsa bile bu durum belgeyi engeller.`);
  if (r.belge === 'yok' && !r.dusuk.length) reasons.push(`Ağırlıklı ortalama ${fmt(r.tesekkur, 0)} değerinin altında kaldı.`);
  if (r.pending.length) reasons.push(`${r.pending.length} dersin 2. dönem puanı girilmedi; bu dersler şimdilik 1. dönem puanıyla hesaplandı.`);
  $('r-neden').textContent = reasons.join(' ');
  $('r-neden').hidden = !reasons.length;
  const e = r.eksik, box = $('r-eksik');
  if (e) {
    let t = `${e.hedef[0].toUpperCase()}${e.hedef.slice(1)} belgesi için ağırlıklı ortalamanın en az ${fmt(e.esik)} olması gerekir; şu an ${fmt(e.farkOrt)} puan eksik (ağırlıklı toplamda ${fmt(e.farkToplam)} puan-saat).`;
    if (e.gerekenP2 != null) {
      t += e.gerekenP2 > 100 ? ' Bekleyen derslerin 2. dönemi 100 alınsa bile bu eşiğe ulaşılamıyor.' : ` Bekleyen derslerin 2. dönem puan ortalaması en az ${fmt(Math.max(0, e.gerekenP2))} olmalı.`;
    }
    if (r.dusuk.length) t += ' Düşük puanlı dersleri alt sınırın üzerine çıkarmanız da gerekir.';
    box.textContent = t; box.hidden = false;
  } else box.hidden = true;
  const tb = $('tbl'); tb.textContent = '';
  for (const x of r.all) {
    const tr = document.createElement('tr');
    [x.ad, x.saat, fmt(x.p1), x.p2 == null ? '–' : fmt(x.p2), fmt(x.yp) + (x.bekleyen ? '*' : ''), fmt(x.yp * x.saat, 1)].forEach((v) => { const td = document.createElement('td'); td.textContent = v; if (x.yp < r.alt) td.className = 'tk-low'; tr.append(td); });
    tb.append(tr);
  }
  const res = $('result'); res.hidden = false; res.classList.add('is-active');
  res.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function summaryText(r) {
  const lines = [`${r.yil ? 'Yıl sonu' : 'Dönem'} ağırlıklı ortalama: ${fmt(r.ort)}`];
  lines.push(`Sonuç: ${$('r-durum').textContent}`);
  for (const x of r.all) lines.push(`${x.ad} (${x.saat} saat): ${fmt(x.yp)}`);
  if (r.eksik) lines.push($('r-eksik').textContent);
  lines.push('Bilgilendirme amaçlıdır; güncel yönetmeliği kontrol edin.');
  lines.push('Bilişim Ajans – araclar.bilisimajans.com/takdir-tesekkur-hesapla/');
  return lines.join('\n');
}

function run() {
  showError($('error'), '');
  try { last = compute(); render(last); }
  catch (e) {
    last = null; $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

function setParams() {
  $('p-takdir').value = String(P.takdir).replace('.', ',');
  $('p-tesekkur').value = String(P.tesekkur).replace('.', ',');
  $('p-alt').value = String(P.dersAltSinir).replace('.', ',');
}

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    P = await res.json();
  } catch {
    showError($('error'), 'Eşik değerleri yüklenemedi. Sayfayı yenileyin; sorun sürerse bağlantınızı kontrol edip tekrar deneyin.');
    return;
  }
  setParams();
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  for (const [ad, s] of DEFAULT_COURSES) addRow(ad, s);
  document.documentElement.dataset.ready = '1';
}

for (const m of document.querySelectorAll('input[name="mode"]')) m.addEventListener('change', applyMode);
$('add-row').addEventListener('click', () => addRow('', ''));
$('reset-params').addEventListener('click', () => { if (P) setParams(); });
$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => {
  for (const i of document.querySelectorAll('#rows .r-p1, #rows .r-p2')) i.value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
init();
