// İşsizlik Maaşı Hesaplama — bilgilendirme amaçlı; tamamı tarayıcıda çalışır, veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const NOT = "Bu hesap bilgilendirme amaçlıdır; hak ediş ve tutar kararı İŞKUR'undur. Başvuru için İŞKUR'a başvurun.";

let P = null; // parametreler.json içeriği

/** "30.000,50" ve "30000.5" gibi yazımları sayıya çevirir; geçersizse NaN döner. */
export function parseMoney(raw) {
  let s = String(raw).trim().replace(/\s/g, '');
  if (s === '') return NaN;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return /^\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
}

/** Prim gününe göre ödeme süresi (gün); şart sağlanmıyorsa 0. */
function durationOf(days) {
  const r = P.sureler.find((x) => days >= x.minGun);
  return r ? r.gun : 0;
}

function compute() {
  const avg = parseMoney($('avg').value);
  if (!Number.isFinite(avg) || avg <= 0) {
    throw new Error('Son 4 aylık brüt ücret ortalamasını sayı olarak girin (örn. 30.000). Boş bırakmayın; eksi ya da harf içeren değer yazmayın.');
  }
  const rawDays = $('days').value.trim();
  const days = Number(rawDays);
  if (rawDays === '' || !Number.isInteger(days) || days < 0) {
    throw new Error('Son 3 yıldaki prim gün sayısını 0 veya daha büyük bir tam sayı olarak girin (örn. 700). SGK hizmet dökümünüzden kontrol edebilirsiniz.');
  }
  if (days > P.maxPrimGun) {
    throw new Error(`Son 3 yılda en fazla ${nf.format(P.maxPrimGun)} gün prim günü olabilir. Girdiğiniz değeri SGK hizmet dökümünüzle karşılaştırıp düzeltin.`);
  }
  const ham = avg * P.oran;
  const ust = P.asgariBrut * P.ustSinirOrani;
  const brut = Math.min(ham, ust);
  const damga = brut * P.damgaVergisi;
  const net = brut - damga;
  const sure = durationOf(days);
  const ay = sure / P.ayGun;
  const sartlar = {
    kesintisiz: $('c-120').checked,
    istek: $('c-istek').checked,
    prim: days >= P.sureler[P.sureler.length - 1].minGun,
  };
  const uygun = sartlar.kesintisiz && sartlar.istek && sartlar.prim;
  return { avg, days, ham, ust, brut, capped: ham > ust, damga, net, sure, ay, toplam: net * ay, sartlar, uygun };
}

function setRow(id, text) { $(id).textContent = text; }

function render(r) {
  setRow('r-ham', money.format(r.ham));
  setRow('r-brut', money.format(r.brut));
  setRow('r-damga', '−' + money.format(r.damga));
  setRow('r-net', money.format(r.net));
  setRow('r-sure', r.sure ? `${r.sure} gün (${nf.format(r.ay)} ay)` : 'Hak doğmuyor');
  setRow('r-toplam', r.sure ? money.format(r.toplam) : '—');
  const notes = [];
  if (r.capped) notes.push(`Hesaplanan tutar (${money.format(r.ham)}) üst sınırı aştığı için brüt ödenek üst sınır olan ${money.format(r.ust)} ile sınırlandı.`);
  if (!r.sartlar.prim) notes.push(`Son 3 yılda en az ${P.sureler[P.sureler.length - 1].minGun} gün prim şartı sağlanmıyor; bu durumda işsizlik ödeneği hakkı doğmaz.`);
  if (!r.sartlar.kesintisiz) notes.push(`Hizmet akdinin feshinden önceki son ${P.sartlar.sonKesintisizGun} günü kesintisiz çalışmış olmanız gerekir; bu şart işaretlenmedi.`);
  if (!r.sartlar.istek) notes.push('Kendi isteğiyle ve kusurlu davranışla işten ayrılanlara ödenek verilmez; işten çıkış nedeninizi ve çıkış kodunu kontrol edin.');
  if (r.uygun) notes.push('İşaretlediğiniz şartlara göre hak sahibi görünüyorsunuz; yine de karar İŞKUR\'dadır.');
  const ul = $('r-checks'); ul.textContent = '';
  for (const n of notes) { const li = document.createElement('li'); li.textContent = n; ul.append(li); }
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  return [
    'İşsizlik maaşı tahmini (bilgilendirme amaçlı)',
    `Son 4 ay brüt ortalama: ${money.format(r.avg)}`,
    `Prim günü (son 3 yıl): ${r.days}`,
    `Brüt ödenek: ${money.format(r.brut)}`,
    `Damga vergisi: ${money.format(r.damga)}`,
    `Aylık net ödenek: ${money.format(r.net)}`,
    `Ödeme süresi: ${r.sure ? r.sure + ' gün' : 'hak doğmuyor'}`,
    r.sure ? `Toplam net ödenek: ${money.format(r.toplam)}` : '',
    NOT,
  ].filter(Boolean).join('\n');
}

let last = null;
function resetResult() { $('result').hidden = true; $('result').classList.remove('is-active'); last = null; }
function run() {
  showError($('error'), '');
  try { last = compute(); render(last); }
  catch (e) { resetResult(); showError($('error'), e.message); }
}

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    P = await res.json();
  } catch {
    showError($('error'), 'Parametreler yüklenemedi. Sayfayı yenileyin; sorun sürerse internet bağlantınızı kontrol edip tekrar deneyin.');
    return;
  }
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('limit-info').textContent = `${P.yil} üst sınırı: asgari brüt ücret ${money.format(P.asgariBrut)} × %${P.ustSinirOrani * 100} = ${money.format(P.asgariBrut * P.ustSinirOrani)}. Damga vergisi oranı: %${nf.format(P.damgaVergisi * 100)}.`;
  document.documentElement.dataset.ready = '1';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => { $('form').reset(); resetResult(); showError($('error'), ''); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
init();
