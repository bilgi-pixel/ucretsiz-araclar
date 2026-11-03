// KYK Burs/Kredi Geri Ödeme Hesaplama (tahmini) — tamamı tarayıcıda çalışır; hiçbir veri gönderilmez.
// Model: toplam geri ödeme = anapara × (1 + kümülatif endeks oranı); taksit sayısı varsayılan olarak alınan ay kadardır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const tl = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2 });
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

/** "1.234,56" ya da "1234.56" gibi girdileri sayıya çevirir; geçersizse NaN. */
export function parseNum(v) {
  let s = String(v ?? '').trim().replace(/\s/g, '').replace('%', '');
  if (!s) return NaN;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
}

/** Kuruşa yuvarlar (kayan nokta hatalarını önlemek için tam kuruş üzerinden). */
const cents = (x) => Math.round(x * 100 + 1e-9);

/**
 * Hesap çekirdeği. rows: [{label, months, amount}], ratePct: kümülatif endeks %, n: taksit sayısı (0/boş = toplam ay).
 * Döner: {totalMonths, principal, indexAmount, total, n, installment, schedule:[kuruş]}
 */
export function compute(rows, ratePct, n) {
  const totalMonths = rows.reduce((a, r) => a + r.months, 0);
  const principalC = rows.reduce((a, r) => a + cents(r.months * r.amount), 0);
  const totalC = Math.round(principalC * (1 + ratePct / 100));
  const count = n || totalMonths;
  const base = Math.floor(totalC / count);
  const schedule = Array.from({ length: count }, () => base);
  schedule[count - 1] += totalC - base * count; // kuruş farkı son taksite
  return { totalMonths, principal: principalC / 100, indexAmount: (totalC - principalC) / 100, total: totalC / 100, n: count, installment: base / 100, schedule: schedule.map((c) => c / 100), lastInstallment: schedule[count - 1] / 100 };
}

/* ---------- Satırlar ---------- */
let params = { ornek: 3000 };
function addRow(label = '', months = '', amount = '') {
  const box = $('rows');
  const i = box.children.length + 1;
  const row = document.createElement('div');
  row.className = 'kb-row';
  row.innerHTML = `<div class="ba-field"><label>Dönem (isteğe bağlı)<input class="r-label" type="text" autocomplete="off" placeholder="2022-2023"></label></div>
    <div class="ba-field"><label>Ay sayısı<input class="r-months" type="text" inputmode="numeric" autocomplete="off"></label></div>
    <div class="ba-field"><label>Aylık tutar (TL)<input class="r-amount" type="text" inputmode="decimal" autocomplete="off"></label></div>
    <button type="button" class="ba-btn r-del" aria-label="${i}. dönem satırını sil">Sil</button>`;
  row.querySelector('.r-label').value = label;
  row.querySelector('.r-months').value = months;
  row.querySelector('.r-amount').value = amount;
  row.querySelector('.r-del').addEventListener('click', () => {
    if (box.children.length > 1) row.remove(); else { row.querySelector('.r-months').value = ''; row.querySelector('.r-amount').value = ''; }
  });
  box.appendChild(row);
}

function readRows() {
  const rows = [];
  for (const el of document.querySelectorAll('#rows .kb-row')) {
    const label = el.querySelector('.r-label').value.trim();
    const mRaw = el.querySelector('.r-months').value.trim();
    const aRaw = el.querySelector('.r-amount').value.trim();
    if (!mRaw && !aRaw) continue; // tamamen boş satırı yok say
    const months = parseNum(mRaw), amount = parseNum(aRaw);
    if (!Number.isInteger(months) || months < 1 || months > 120) throw new Error('Ay sayısı 1 ile 120 arasında bir tam sayı olmalı. Bir yılda kredi aldığınız ay sayısını (örneğin 9 ya da 12) yazın.');
    if (!(amount > 0) || amount > 1000000) throw new Error('Aylık tutar sıfırdan büyük bir sayı olmalı (örneğin 3.000). KYK\'dan aldığınız aylık kredi tutarını yazın.');
    rows.push({ label, months, amount });
  }
  if (!rows.length) throw new Error('En az bir dönem girin: kaç ay boyunca aylık ne kadar kredi aldığınızı yazın (örneğin 36 ay × 3.000 TL).');
  return rows;
}

/* ---------- Hesap ve gösterim ---------- */
let lastText = '';
let lastResult = null;
let lastStart = null;
const PREVIEW = 12;

function schedLabel(i) {
  if (!lastStart) return `${i + 1}. taksit`;
  const idx = lastStart.m - 1 + i;
  return `${i + 1}. taksit – ${MONTHS[idx % 12]} ${lastStart.y + Math.floor(idx / 12)}`;
}

function renderSchedule(all) {
  const r = lastResult;
  const body = $('sched');
  body.textContent = '';
  const shown = all ? r.schedule.length : Math.min(PREVIEW, r.schedule.length);
  for (let i = 0; i < shown; i++) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${schedLabel(i)}</td><td class="num">${tl.format(r.schedule[i])}</td>`;
    body.appendChild(tr);
  }
  const more = $('toggle-sched');
  more.hidden = r.schedule.length <= PREVIEW;
  more.textContent = all ? 'İlk 12 taksiti göster' : `Tüm ${r.schedule.length} taksiti göster`;
  more.dataset.all = all ? '1' : '';
}

function calculate() {
  showError($('error'), null);
  $('result').hidden = true; $('result').classList.remove('is-active');
  let rows;
  try {
    rows = readRows();
    const rate = $('rate').value.trim() ? parseNum($('rate').value) : 0;
    if (Number.isNaN(rate) || rate < 0 || rate > 10000) throw new Error('Endeks oranı 0 ile 10.000 arasında bir yüzde olmalı (örneğin 20). Virgül kullanabilirsiniz; oranı bilmiyorsanız 0 yazıp önce yalnızca anaparayı görün.');
    const nRaw = $('inst').value.trim();
    let n = 0;
    if (nRaw) {
      n = parseNum(nRaw);
      if (!Number.isInteger(n) || n < 1 || n > 360) throw new Error('Taksit sayısı 1 ile 360 arasında bir tam sayı olmalı. Boş bırakırsanız alınan ay sayısı kadar taksit kullanılır.');
    }
    const ym = /^(\d{4})-(\d{2})$/.exec($('start').value);
    lastStart = ym ? { y: +ym[1], m: +ym[2] } : null;
    lastResult = compute(rows, rate, n);
    lastResult.rate = rate;
    lastResult.rows = rows;
  } catch (e) {
    showError($('error'), e.message);
    return;
  }
  const r = lastResult;
  $('r-months').textContent = `${r.totalMonths} ay`;
  $('r-principal').textContent = tl.format(r.principal);
  $('r-rate').textContent = `%${nf.format(r.rate)}`;
  $('r-index').textContent = tl.format(r.indexAmount);
  $('r-total').textContent = tl.format(r.total);
  $('r-n').textContent = `${r.n} taksit`;
  $('r-inst').textContent = tl.format(r.installment);
  const lastRow = $('r-last-row');
  lastRow.hidden = r.lastInstallment === r.installment;
  $('r-last').textContent = tl.format(r.lastInstallment);

  const body = $('periods');
  body.textContent = '';
  r.rows.forEach((x, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td></td><td class="num">${x.months}</td><td class="num">${tl.format(x.amount)}</td><td class="num">${tl.format(x.months * x.amount)}</td>`;
    tr.firstChild.textContent = x.label || `${i + 1}. dönem`;
    body.appendChild(tr);
  });
  renderSchedule(false);
  lastText = `KYK geri ödeme tahmini: ${r.totalMonths} ay, anapara ${tl.format(r.principal)}, endeks %${nf.format(r.rate)} (${tl.format(r.indexAmount)}), toplam ${tl.format(r.total)}, ${r.n} taksit × ${tl.format(r.installment)}. Yalnızca tahmindir; resmî borç e-Devlet'ten sorgulanır.`;
  $('copy-status').textContent = '';
  $('result').hidden = false; $('result').classList.add('is-active');
}

/* ---------- Olaylar ---------- */
$('form').addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
$('add-row').addEventListener('click', () => { addRow(); document.querySelectorAll('#rows .r-label')[$('rows').children.length - 1].focus(); });
$('toggle-sched').addEventListener('click', (e) => renderSchedule(!e.currentTarget.dataset.all));
$('clear').addEventListener('click', () => {
  $('rows').textContent = '';
  addRow('', '', params.ornek ? String(params.ornek) : '');
  $('rate').value = '';
  $('inst').value = '';
  $('start').value = '';
  $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), null);
});
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; } catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});

/* ---------- Başlangıç: parametreler ---------- */
addRow('', '', String(params.ornek));
(async () => {
  try {
    const res = await fetch('parametreler.json');
    const j = await res.json();
    const amt = document.querySelector('#rows .r-amount');
    if (j.ornek_aylik_kredi_lisans && amt && amt.value === String(params.ornek)) amt.value = String(j.ornek_aylik_kredi_lisans);
    params.ornek = j.ornek_aylik_kredi_lisans || params.ornek;
    $('params-date').textContent = `Parametreler ${j.guncelleme} tarihinde güncellendi (yaklaşık değerler).`;
  } catch {
    $('params-date').textContent = 'Parametre dosyası okunamadı; tutarları kendiniz girin.';
  }
})();
