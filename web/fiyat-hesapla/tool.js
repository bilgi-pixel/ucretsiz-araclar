// Satış Fiyatı, Kâr Marjı ve Maliyet Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError, downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;
const pct = (n) => `%${fmt.format(round2(n))}`;

/* ---------- Sayı ayrıştırma (1.250,50 / 1250,5 / 1250.5) ---------- */
export function parseAmount(raw, label = 'Tutar', { allowZero = true } = {}) {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$|%/gi, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 1.250,50). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Pozitif bir değer girin; zarar durumunu sonuç satırlarında göreceksiniz.`);
  s = s.replace(/^\+/, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma >= 0) {
    s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 1.250,50`);
  if (!allowZero && n === 0) throw new Error(`${label} sıfırdan büyük olmalı.`);
  return n;
}

/* ---------- Hesap çekirdeği (saf fonksiyonlar) ---------- */
const withVat = (net, rate) => ({ net: round2(net), vat: round2(net * rate / 100), gross: round2(net + net * rate / 100) });
const ratios = (cost, net) => {
  const profit = round2(net - cost);
  return { profit, margin: net > 0 ? (profit / net) * 100 : NaN, markup: cost > 0 ? (profit / cost) * 100 : NaN };
};

/** Maliyet + kâr oranı → satış fiyatı. basis: 'markup' (maliyet üzerinden) ya da 'marj' (satış fiyatı üzerinden). */
export function priceFromCost({ cost, profitRate, basis, vatRate }) {
  if (basis === 'marj' && profitRate >= 100) {
    throw new Error('Kâr marjı %100 ve üzeri olamaz; satış fiyatı üzerinden en fazla %99,99 girilebilir. Oranı düşürün ya da "maliyet üzerinden" seçeneğini kullanın.');
  }
  const net = basis === 'marj' ? cost / (1 - profitRate / 100) : cost * (1 + profitRate / 100);
  return { ...withVat(net, vatRate), ...ratios(cost, round2(net)), cost };
}

/** Satış fiyatından kâr, marj ve markup. */
export function marginFromPrice({ cost, sale, saleIncludesVat, vatRate }) {
  const net = saleIncludesVat ? sale / (1 + vatRate / 100) : sale;
  return { ...withVat(net, vatRate), ...ratios(cost, round2(net)), cost };
}

/** Hedef kâr tutarı için gereken satış fiyatı. */
export function priceForTarget({ cost, target, vatRate }) {
  const net = cost + target;
  return { ...withVat(net, vatRate), ...ratios(cost, round2(net)), cost };
}

/** İndirimli fiyat ve indirim sonrası kâr. */
export function discounted({ cost, list, discount, vatRate }) {
  const net = list * (1 - discount / 100);
  const before = ratios(cost, list);
  return {
    ...withVat(net, vatRate), ...ratios(cost, round2(net)), cost, list,
    beforeProfit: before.profit,
    maxDiscount: list > cost ? ((list - cost) / list) * 100 : 0,
  };
}

/** Pazaryeri satışı: KDV dahil satış fiyatından komisyon ve kargo düşülerek net hesap. */
export function marketplace({ cost, gross, vatRate, commission, shipping, deductFeeVat }) {
  const feeVatRate = 20; // Komisyon ve kargo hizmet faturalarında genel KDV oranı varsayılır.
  const net = gross / (1 + vatRate / 100);
  const saleVat = gross - net;
  const comm = gross * commission / 100;
  const fees = comm + shipping;
  const k = deductFeeVat ? 1 + feeVatRate / 100 : 1;
  const feesNet = fees / k;
  const feeVat = fees - feesNet;
  const cash = gross - fees;
  const profit = net - cost - feesNet;
  const denom = 1 / (1 + vatRate / 100) - commission / 100 / k;
  const breakEven = denom > 0 ? (cost + shipping / k) / denom : NaN;
  return {
    net: round2(net), saleVat: round2(saleVat), comm: round2(comm), shipping: round2(shipping), feeVat: round2(feeVat),
    cash: round2(cash), profit: round2(profit), margin: net > 0 ? (profit / net) * 100 : NaN,
    markup: cost > 0 ? (profit / cost) * 100 : NaN, breakEven: round2(breakEven),
  };
}

/* ---------- Arayüz ---------- */
const el = {
  modes: Array.from(document.querySelectorAll('input[name="mode"]')),
  sections: Array.from(document.querySelectorAll('[data-mode]')),
  cost: $('f-cost'), rate: $('f-rate'), rateCustom: $('f-rate-custom'), rateCustomWrap: $('rate-custom-wrap'),
  profit: $('f-profit'), basis: $('f-basis'),
  sale: $('f-sale'), saleVat: $('f-sale-kdv'),
  target: $('f-target'),
  list: $('f-list'), disc: $('f-disc'),
  csale: $('f-csale'), comm: $('f-comm'), ship: $('f-ship'), deduct: $('f-deduct'),
  error: $('error'), result: $('result'), rows: $('result-rows'), note: $('result-note'),
  copy: $('copy'), status: $('copy-status'),
  single: $('single-wrap'), bulk: $('bulk-wrap'),
};

const currentMode = () => el.modes.find((m) => m.checked)?.value || 'fiyat';

function getVatRate() {
  if (el.rate.value === 'ozel') {
    const r = parseAmount(el.rateCustom.value, 'KDV oranı');
    if (r === null) throw new Error('Özel KDV oranını girin (örn. 8) ya da listeden %1, %10 ya da %20 seçin.');
    if (r > 100) throw new Error('KDV oranı %100\'den büyük olamaz. Oranı yüzde olarak girin (örn. 20).');
    return r;
  }
  return Number(el.rate.value);
}
const req = (v, label, opts) => {
  const n = parseAmount(v, label, opts);
  if (n === null) throw new Error(`${label} alanı boş. Değeri girin; Türkçe biçim kullanabilirsiniz (örn. 1.250,50).`);
  return n;
};

function compute() {
  const mode = currentMode();
  const cost = req(el.cost.value, 'Maliyet', { allowZero: false });
  const vatRate = getVatRate();
  const rows = [];
  const row = (id, label, value, strong = false) => rows.push([id, label, value, strong]);
  let note = '';
  if (mode === 'fiyat') {
    const profitRate = req(el.profit.value, 'Kâr oranı');
    const r = priceFromCost({ cost, profitRate, basis: el.basis.value, vatRate });
    row('haric', 'Satış fiyatı (KDV hariç)', money(r.net), true);
    row('kdv', `KDV (%${fmt.format(vatRate)})`, money(r.vat));
    row('dahil', 'Satış fiyatı (KDV dahil)', money(r.gross), true);
    row('kar', 'Birim kâr', money(r.profit));
    row('marj', 'Kâr marjı (satış fiyatı üzerinden)', pct(r.margin));
    row('markup', 'Markup (maliyet üzerinden)', pct(r.markup));
    note = 'Maliyet, KDV hariç tutar olarak alınır. Kâr yalnızca KDV hariç satış fiyatı üzerinden hesaplanır; KDV devlete aittir.';
  } else if (mode === 'marj') {
    const sale = req(el.sale.value, 'Satış fiyatı', { allowZero: false });
    const r = marginFromPrice({ cost, sale, saleIncludesVat: el.saleVat.value === 'dahil', vatRate });
    row('haric', 'Satış fiyatı (KDV hariç)', money(r.net));
    row('dahil', 'Satış fiyatı (KDV dahil)', money(r.gross));
    row('kar', 'Birim kâr', money(r.profit), true);
    row('marj', 'Kâr marjı (satış fiyatı üzerinden)', pct(r.margin), true);
    row('markup', 'Markup (maliyet üzerinden)', pct(r.markup), true);
    note = r.profit < 0
      ? 'Satış fiyatı maliyetin altında; birim başına zarar oluşuyor. Fiyatı artırın ya da maliyeti gözden geçirin.'
      : 'Marj, kârın satış fiyatına oranıdır; markup ise kârın maliyete oranıdır. Aynı kâr için markup her zaman marjdan büyüktür.';
  } else if (mode === 'hedef') {
    const target = req(el.target.value, 'Hedef kâr');
    const r = priceForTarget({ cost, target, vatRate });
    row('haric', 'Gereken satış fiyatı (KDV hariç)', money(r.net), true);
    row('kdv', `KDV (%${fmt.format(vatRate)})`, money(r.vat));
    row('dahil', 'Gereken satış fiyatı (KDV dahil)', money(r.gross), true);
    row('marj', 'Kâr marjı', pct(r.margin));
    row('markup', 'Markup', pct(r.markup));
    note = 'Hedef kâr, birim başına net (KDV hariç) kazanç olarak alınır.';
  } else if (mode === 'indirim') {
    const list = req(el.list.value, 'Liste fiyatı', { allowZero: false });
    const disc = req(el.disc.value, 'İndirim oranı');
    if (disc > 100) throw new Error('İndirim oranı %100\'den büyük olamaz. 0 ile 100 arasında bir değer girin.');
    const r = discounted({ cost, list, discount: disc, vatRate });
    row('haric', 'İndirimli fiyat (KDV hariç)', money(r.net), true);
    row('dahil', 'İndirimli fiyat (KDV dahil)', money(r.gross), true);
    row('oncekikar', 'İndirim öncesi birim kâr', money(r.beforeProfit));
    row('kar', 'İndirim sonrası birim kâr', money(r.profit), true);
    row('marj', 'İndirim sonrası kâr marjı', pct(r.margin));
    row('maxind', 'Zarara girmeden en fazla indirim', pct(r.maxDiscount));
    note = r.profit < 0 ? 'Bu indirimle satış maliyetin altına düşüyor; her satışta zarar edersiniz.' : 'Liste fiyatı KDV hariç girilir; indirim bu fiyat üzerinden uygulanır.';
  } else if (mode === 'komisyon') {
    const gross = req(el.csale.value, 'Satış fiyatı (KDV dahil)', { allowZero: false });
    const comm = req(el.comm.value, 'Komisyon oranı');
    if (comm >= 100) throw new Error('Komisyon oranı %100\'den küçük olmalı. Pazaryerinin gösterdiği oranı yüzde olarak girin (örn. 15).');
    const ship = el.ship.value.trim() ? req(el.ship.value, 'Kargo bedeli') : 0;
    const r = marketplace({ cost, gross, vatRate, commission: comm, shipping: ship, deductFeeVat: el.deduct.checked });
    row('haric', 'Satış fiyatı (KDV hariç)', money(r.net));
    row('satiskdv', 'Satıştan doğan KDV', money(r.saleVat));
    row('komisyon', 'Pazaryeri komisyonu', money(r.comm));
    row('kargo', 'Kargo bedeli', money(r.shipping));
    row('nakit', 'Hesabınıza geçen tutar', money(r.cash), true);
    row('kar', 'Net kâr (maliyet düşülmüş)', money(r.profit), true);
    row('marj', 'Net kâr marjı', pct(r.margin));
    row('basabas', 'Başabaş satış fiyatı (KDV dahil)', Number.isFinite(r.breakEven) ? money(r.breakEven) : 'Hesaplanamaz');
    note = 'Komisyon, KDV dahil satış fiyatı üzerinden alınır varsayılmıştır. Komisyon ve kargo faturaları %20 KDV içeriyorsa kutuyu işaretli bırakın; bu KDV indirilecek KDV olduğundan kârdan düşülmez. Pazaryerinizin gerçek kesintilerini kendi hesap özetinizle karşılaştırın.';
  }
  return { rows, note };
}

function render() {
  if (currentMode() === 'toplu') { renderBulk(); return; }
  el.status.textContent = '';
  try {
    if (!el.cost.value.trim()) { showError(el.error, ''); el.result.hidden = true; return; }
    const { rows, note } = compute();
    showError(el.error, '');
    el.rows.innerHTML = '';
    for (const [id, label, value, strong] of rows) {
      const div = document.createElement('div');
      div.className = `kdv-row${strong ? ' is-strong' : ''}`;
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.id = `r-${id}`; dd.textContent = value;
      div.append(dt, dd);
      el.rows.append(div);
    }
    el.note.textContent = note;
    el.result.hidden = false;
  } catch (err) {
    showError(el.error, err.message);
    el.result.hidden = true;
  }
}

function syncMode() {
  const mode = currentMode();
  el.sections.forEach((s) => { s.hidden = s.dataset.mode !== mode; });
  el.single.hidden = mode === 'toplu';
  el.bulk.hidden = mode !== 'toplu';
  el.result.hidden = true;
  showError(el.error, '');
  render();
}

/* ---------- Toplu ürün tablosu ---------- */
const bulk = { body: $('bulk-rows'), add: $('bulk-add'), totals: $('bulk-totals'), csv: $('bulk-csv'), status: $('bulk-status') };
const rateOptions = '<option value="1">%1</option><option value="10">%10</option><option value="20" selected>%20</option>';

function addBulkRow() {
  const div = document.createElement('div');
  div.className = 'bulk-row';
  div.innerHTML = `
    <div class="ba-field"><label>Ürün adı<input type="text" data-k="name" autocomplete="off"></label></div>
    <div class="ba-field"><label>Maliyet (₺)<input type="text" inputmode="decimal" data-k="cost" autocomplete="off"></label></div>
    <div class="ba-field"><label>Kâr oranı (%)<input type="text" inputmode="decimal" data-k="profit" autocomplete="off"></label></div>
    <div class="ba-field"><label>KDV<select data-k="rate">${rateOptions}</select></label></div>
    <div class="bulk-out" data-k="out" aria-live="polite">—</div>
    <button type="button" class="ba-btn bulk-del" aria-label="Bu satırı sil">Sil</button>`;
  bulk.body.append(div);
  div.querySelector('.bulk-del').addEventListener('click', () => { div.remove(); renderBulk(); });
  return div;
}

let bulkResult = [];
function renderBulk() {
  if (currentMode() !== 'toplu') return;
  bulkResult = [];
  let totalCost = 0; let totalNet = 0; let totalGross = 0; let bad = '';
  Array.from(bulk.body.children).forEach((div, i) => {
    const g = (k) => div.querySelector(`[data-k="${k}"]`);
    const out = g('out');
    try {
      const cost = parseAmount(g('cost').value, `${i + 1}. satır maliyeti`);
      const profitRate = parseAmount(g('profit').value, `${i + 1}. satır kâr oranı`);
      if (cost === null || profitRate === null || cost === 0) { out.textContent = '—'; return; }
      const r = priceFromCost({ cost, profitRate, basis: 'markup', vatRate: Number(g('rate').value) });
      out.textContent = `Hariç ${money(r.net)} · Dahil ${money(r.gross)}`;
      totalCost += cost; totalNet += r.net; totalGross += r.gross;
      bulkResult.push({ name: g('name').value.trim() || `Ürün ${i + 1}`, cost, profitRate, vatRate: Number(g('rate').value), ...r });
    } catch (err) { out.textContent = '—'; bad = bad || err.message; }
  });
  showError(el.error, bad);
  bulk.totals.hidden = bulkResult.length === 0;
  $('bt-cost').textContent = money(totalCost);
  $('bt-net').textContent = money(totalNet);
  $('bt-gross').textContent = money(totalGross);
  $('bt-profit').textContent = money(totalNet - totalCost);
  bulk.csv.disabled = bulkResult.length === 0;
}

// CSV: Excel'in Türkçe sürümü için noktalı virgül ve BOM kullanılır; binlik ayırıcı yazılmaz.
function buildCsv(rows) {
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const n = (v) => fmt.format(round2(v)).replace(/\./g, '');
  const head = ['Ürün', 'Maliyet', 'Kâr oranı (%)', 'KDV oranı (%)', 'Satış (KDV hariç)', 'KDV', 'Satış (KDV dahil)', 'Birim kâr', 'Kâr marjı (%)'];
  const lines = [head.map(esc).join(';')];
  for (const r of rows) {
    lines.push([esc(r.name), n(r.cost), n(r.profitRate), r.vatRate, n(r.net), n(r.vat), n(r.gross), n(r.profit), n(r.margin)].join(';'));
  }
  return `﻿${lines.join('\r\n')}\r\n`;
}
bulk.add.addEventListener('click', () => { const d = addBulkRow(); d.querySelector('[data-k="name"]').focus(); renderBulk(); });
bulk.body.addEventListener('input', renderBulk);
bulk.body.addEventListener('change', renderBulk);
bulk.csv.addEventListener('click', () => {
  if (!bulkResult.length) { showError(el.error, 'İndirilecek satır yok. En az bir ürün için maliyet ve kâr oranı girin.'); return; }
  downloadBlob(new Blob([buildCsv(bulkResult)], { type: 'text/csv;charset=utf-8' }), 'fiyat-listesi.csv');
  bulk.status.textContent = 'CSV dosyası indirildi; dosya yalnızca bu cihazda oluşturuldu.';
});

/* ---------- Olaylar ---------- */
el.modes.forEach((m) => m.addEventListener('change', syncMode));
el.rate.addEventListener('change', () => { el.rateCustomWrap.hidden = el.rate.value !== 'ozel'; render(); });
['cost', 'rateCustom', 'profit', 'basis', 'sale', 'saleVat', 'target', 'list', 'disc', 'csale', 'comm', 'ship', 'deduct'].forEach((k) => {
  el[k].addEventListener('input', render);
  el[k].addEventListener('change', render);
});
$('form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  el.rateCustomWrap.hidden = true;
  syncMode();
});
el.copy.addEventListener('click', async () => {
  const text = Array.from(el.rows.children).map((r) => `${r.children[0].textContent}: ${r.children[1].textContent}`).join('\n');
  try { await navigator.clipboard.writeText(text); el.status.textContent = 'Sonuç kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});

addBulkRow(); addBulkRow();
syncMode();
