// KDV Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
// Tek hesap, çoklu satır (fatura taslağı) ve yüzde hesaplama sekmesi.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;

// Varsayılan parametreler; parametreler.json yüklenemezse (çevrimdışı önbellek vb.) bunlar kullanılır.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-03',
  kdv_oranlari: [{ oran: 1 }, { oran: 10 }, { oran: 20 }],
  tevkifat_oranlari: ['2/10', '3/10', '4/10', '5/10', '7/10', '9/10', '10/10'],
};

/* ---------- Sayı ayrıştırma (tr-TR girdileri: 1.250,50 / 1250,5 / 1250.5) ---------- */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 1.250,50). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. İade ya da iskonto için pozitif tutarı girin; sonucu eksi olarak değerlendirin.`);
  s = s.replace(/^\+/, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    // Sondaki ayırıcı ondalık, diğeri binlik kabul edilir.
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma >= 0) {
    s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', ''); // "1.250" → Türkçe binlik
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 1.250,50`);
  return n;
}

export function parseRate(raw) {
  const r = parseAmount(raw, 'KDV oranı');
  if (r === null) return null;
  if (r > 100) throw new Error('KDV oranı %100\'den büyük olamaz. Oranı yüzde olarak girin (örn. 20).');
  return r;
}

/** "5/10" ya da "50" (yüzde) biçimindeki tevkifat oranını 0–1 arası kesre çevirir. */
export function parseWithholding(raw) {
  const s = String(raw ?? '').trim().replace(/\s/g, '');
  if (!s) return null;
  const m = s.match(/^(\d+)\/(\d+)$/);
  let f;
  if (m) {
    const q = Number(m[2]);
    if (q === 0) throw new Error('Tevkifat oranının paydası sıfır olamaz. Örnek: 5/10');
    f = Number(m[1]) / q;
  } else {
    const p = parseAmount(s, 'Tevkifat oranı');
    if (p === null) return null;
    f = p / 100;
  }
  if (f < 0 || f > 1) throw new Error('Tevkifat oranı 0 ile 10/10 (%100) arasında olmalı. Örnek: 5/10');
  return f;
}

/* ---------- Hesap çekirdeği ---------- */
export function calcKdv({ amount, rate, mode, qty = 1, withholding = null }) {
  const base = round2(amount * qty);
  let net; let vat; let gross;
  if (mode === 'dahil') {
    gross = base;
    net = round2(gross / (1 + rate / 100));
    vat = round2(gross - net);
  } else {
    net = base;
    vat = round2(net * rate / 100);
    gross = round2(net + vat);
  }
  const out = { base, net, vat, gross, rate, qty, mode };
  if (withholding !== null) {
    out.withheld = round2(vat * withholding);
    out.declared = round2(vat - out.withheld);
    out.payable = round2(net + out.declared);
    out.withholding = withholding;
  }
  return out;
}

/* ---------- Sekmeler ---------- */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function activateTab(name, { focus = false, pushUrl = true } = {}) {
  tabs.forEach((t) => {
    const on = t.dataset.tab === name;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.tabIndex = on ? 0 : -1;
    const panel = $(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !on;
    if (on && focus) t.focus();
  });
  if (pushUrl) syncUrl();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => activateTab(t.dataset.tab));
  t.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    activateTab(next.dataset.tab, { focus: true });
  });
});
const currentTab = () => tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.tab || 'kdv';

/* ---------- Tek hesap ---------- */
const el = {
  amount: $('f-amount'), qty: $('f-qty'), rate: $('f-rate'), rateCustom: $('f-rate-custom'), rateCustomWrap: $('rate-custom-wrap'),
  modeInputs: Array.from(document.querySelectorAll('input[name="mode"]')),
  amountLabel: $('amount-label'),
  wh: $('f-wh'), whRate: $('f-wh-rate'), whWrap: $('wh-wrap'),
  error: $('error'), result: $('result'), rows: $('r-rows'), note: $('r-note'),
  copy: $('copy'), copyLink: $('copy-link'), copyStatus: $('copy-status'),
};
let lastResult = null;

const getMode = () => el.modeInputs.find((r) => r.checked)?.value || 'haric';
const getRateRaw = () => (el.rate.value === 'ozel' ? el.rateCustom.value : el.rate.value);

function rowHtml(label, value, id, strong = false) {
  return `<div class="kdv-row${strong ? ' is-strong' : ''}"><dt>${label}</dt><dd id="${id}">${value}</dd></div>`;
}

function renderSingle() {
  showError(el.error, '');
  el.copyStatus.textContent = '';
  try {
    const amount = parseAmount(el.amount.value, 'Tutar');
    const rate = parseRate(getRateRaw());
    const qtyRaw = parseAmount(el.qty.value, 'Adet');
    const qty = qtyRaw === null ? 1 : qtyRaw;
    if (qty === 0) throw new Error('Adet sıfır olamaz. En az 1 girin.');
    const withholding = el.wh.checked ? parseWithholding(el.whRate.value) : null;
    if (amount === null || rate === null || (el.wh.checked && withholding === null)) {
      el.result.classList.remove('is-active'); lastResult = null; return;
    }
    const r = calcKdv({ amount, rate, mode: getMode(), qty, withholding });
    lastResult = r;
    const parts = [];
    if (qty !== 1) parts.push(rowHtml(`${fmtPct.format(qty)} adet × ${money(amount)}`, money(r.base), 'r-base'));
    parts.push(rowHtml('KDV hariç tutar (matrah)', money(r.net), 'r-haric', r.mode === 'dahil'));
    parts.push(rowHtml(`KDV tutarı (%${fmtPct.format(rate)})`, money(r.vat), 'r-kdv', true));
    parts.push(rowHtml('KDV dahil tutar', money(r.gross), 'r-dahil', r.mode === 'haric'));
    if (withholding !== null) {
      parts.push(rowHtml(`Tevkif edilen KDV (${el.whRate.value.trim()})`, money(r.withheld), 'r-withheld'));
      parts.push(rowHtml('Satıcının beyan edeceği KDV', money(r.declared), 'r-declared'));
      parts.push(rowHtml('Alıcının ödeyeceği toplam', money(r.payable), 'r-payable', true));
    }
    el.rows.innerHTML = parts.join('');
    el.note.textContent = r.mode === 'dahil'
      ? `Hesap: ${money(r.base)} ÷ (1 + ${fmtPct.format(rate)}/100) = ${money(r.net)} matrah; KDV = fark.`
      : `Hesap: ${money(r.base)} × ${fmtPct.format(rate)}/100 = ${money(r.vat)} KDV; toplam = matrah + KDV.`;
    el.result.classList.add('is-active');
    syncUrl();
  } catch (err) {
    el.result.classList.remove('is-active');
    lastResult = null;
    showError(el.error, err.message);
  }
}

function singleSummaryText() {
  if (!lastResult) return '';
  const r = lastResult;
  const lines = [];
  if (r.qty !== 1) lines.push(`${fmtPct.format(r.qty)} adet × ${money(r.base / r.qty)} = ${money(r.base)}`);
  lines.push(`KDV hariç: ${money(r.net)}`, `KDV (%${fmtPct.format(r.rate)}): ${money(r.vat)}`, `KDV dahil: ${money(r.gross)}`);
  if (r.withheld !== undefined) lines.push(`Tevkif edilen KDV: ${money(r.withheld)}`, `Beyan edilecek KDV: ${money(r.declared)}`, `Ödenecek toplam: ${money(r.payable)}`);
  return lines.join('\n');
}

async function copyText(text, okMsg) {
  try {
    await navigator.clipboard.writeText(text);
    el.copyStatus.textContent = okMsg;
  } catch {
    el.copyStatus.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.';
  }
}
el.copy.addEventListener('click', () => copyText(singleSummaryText(), 'Sonuç kopyalandı.'));
el.copyLink.addEventListener('click', () => { syncUrl(); copyText(location.href, 'Bağlantı kopyalandı.'); });

/* ---------- URL parametreleri (kişisel veri yok: tutar, oran, mod, adet, tevkifat, sekme) ---------- */
function syncUrl() {
  const p = new URLSearchParams();
  const tab = currentTab();
  if (tab !== 'kdv') p.set('sekme', tab);
  if (lastResult) {
    p.set('tutar', String(lastResult.base / lastResult.qty));
    p.set('oran', String(lastResult.rate));
    p.set('mod', lastResult.mode);
    if (lastResult.qty !== 1) p.set('adet', String(lastResult.qty));
    if (lastResult.withheld !== undefined) p.set('tevkifat', el.whRate.value.trim());
  }
  const q = p.toString();
  history.replaceState(null, '', q ? `?${q}` : location.pathname);
}

function readUrl() {
  const p = new URLSearchParams(location.search);
  if (p.get('mod') === 'dahil') el.modeInputs.forEach((r) => { r.checked = r.value === 'dahil'; });
  if (p.has('oran')) {
    const v = p.get('oran').replace(',', '.');
    if ([...el.rate.options].some((o) => o.value === v)) el.rate.value = v;
    else { el.rate.value = 'ozel'; el.rateCustom.value = v; }
  }
  if (p.has('adet')) el.qty.value = p.get('adet');
  if (p.has('tevkifat')) { el.wh.checked = true; el.whRate.value = p.get('tevkifat'); }
  if (p.has('tutar')) el.amount.value = p.get('tutar').replace('.', ',');
  if (p.get('sekme') === 'yuzde') activateTab('yuzde', { pushUrl: false });
}

function updateModeUi() {
  const dahil = getMode() === 'dahil';
  el.amountLabel.textContent = dahil ? 'KDV dahil tutar (₺)' : 'KDV hariç tutar (₺)';
}
function updateRateUi() { el.rateCustomWrap.hidden = el.rate.value !== 'ozel'; }
function updateWhUi() { el.whWrap.hidden = !el.wh.checked; }

el.modeInputs.forEach((r) => r.addEventListener('change', () => { updateModeUi(); renderSingle(); }));
el.rate.addEventListener('change', () => { updateRateUi(); if (el.rate.value === 'ozel') el.rateCustom.focus(); renderSingle(); });
el.wh.addEventListener('change', () => { updateWhUi(); renderSingle(); });
[el.amount, el.qty, el.rateCustom, el.whRate].forEach((i) => i.addEventListener('input', renderSingle));
$('form-single').addEventListener('submit', (e) => { e.preventDefault(); renderSingle(); });

/* ---------- Çoklu satır (fatura taslağı) ---------- */
const inv = { body: $('inv-rows'), add: $('inv-add'), mode: $('inv-mode'), totals: $('inv-totals'), error: $('inv-error'), copy: $('inv-copy'), status: $('inv-status') };
let invRows = [];
let invSeq = 0;

function invRowTemplate(row) {
  const rateOpts = [...el.rate.options].filter((o) => o.value !== 'ozel').map((o) => `<option value="${o.value}"${String(row.rate) === o.value ? ' selected' : ''}>%${o.value}</option>`).join('');
  return `<div class="inv-row" data-id="${row.id}">
    <label><span>Açıklama</span><input type="text" data-k="desc" value="${row.desc.replace(/"/g, '&quot;')}" placeholder="Ürün / hizmet" autocomplete="off"></label>
    <label><span>Adet</span><input type="text" inputmode="decimal" data-k="qty" value="${row.qty}"></label>
    <label><span>Birim fiyat</span><input type="text" inputmode="decimal" data-k="price" value="${row.price}" placeholder="0,00"></label>
    <label><span>KDV</span><select data-k="rate">${rateOpts}</select></label>
    <div class="inv-line"><span>Satır toplamı</span><output data-k="total">—</output></div>
    <button type="button" class="ba-icon-btn inv-del" aria-label="Satırı sil">✕</button>
  </div>`;
}

function invAdd(data = {}) {
  invRows.push({ id: ++invSeq, desc: '', qty: '1', price: '', rate: '20', ...data });
  inv.body.insertAdjacentHTML('beforeend', invRowTemplate(invRows[invRows.length - 1]));
  invCalc();
}

function invCalc() {
  showError(inv.error, '');
  inv.status.textContent = '';
  const mode = inv.mode.value;
  const byRate = new Map();
  let net = 0; let vat = 0; let gross = 0; let filled = 0;
  try {
    for (const row of invRows) {
      const out = inv.body.querySelector(`[data-id="${row.id}"] [data-k="total"]`);
      const price = parseAmount(row.price, `"${row.desc || 'Satır'}" birim fiyatı`);
      const qty = parseAmount(row.qty, `"${row.desc || 'Satır'}" adedi`);
      if (price === null || qty === null) { if (out) out.textContent = '—'; continue; }
      const r = calcKdv({ amount: price, rate: Number(row.rate), mode, qty });
      if (out) out.textContent = money(r.gross);
      filled++;
      net = round2(net + r.net); vat = round2(vat + r.vat); gross = round2(gross + r.gross);
      const g = byRate.get(row.rate) || { net: 0, vat: 0 };
      g.net = round2(g.net + r.net); g.vat = round2(g.vat + r.vat);
      byRate.set(row.rate, g);
    }
  } catch (err) {
    showError(inv.error, err.message);
    inv.totals.hidden = true;
    return;
  }
  if (!filled) { inv.totals.hidden = true; return; }
  const rateLines = [...byRate.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([rate, g]) => rowHtml(`%${rate} matrah ${money(g.net)} → KDV`, money(g.vat), `inv-vat-${rate}`)).join('');
  inv.totals.innerHTML = `<dl class="kdv-results">${rowHtml('Toplam KDV hariç (matrah)', money(net), 'inv-net')}${rateLines}${rowHtml('Toplam KDV', money(vat), 'inv-vat', true)}${rowHtml('Genel toplam (KDV dahil)', money(gross), 'inv-gross', true)}</dl>`;
  inv.totals.hidden = false;
}

inv.body.addEventListener('input', (e) => {
  const wrap = e.target.closest('.inv-row'); const k = e.target.dataset.k;
  if (!wrap || !k) return;
  const row = invRows.find((r) => r.id === Number(wrap.dataset.id));
  if (row) { row[k] = e.target.value; invCalc(); }
});
inv.body.addEventListener('change', (e) => {
  if (e.target.dataset.k !== 'rate') return;
  const row = invRows.find((r) => r.id === Number(e.target.closest('.inv-row').dataset.id));
  if (row) { row.rate = e.target.value; invCalc(); }
});
inv.body.addEventListener('click', (e) => {
  const btn = e.target.closest('.inv-del'); if (!btn) return;
  const wrap = btn.closest('.inv-row');
  invRows = invRows.filter((r) => r.id !== Number(wrap.dataset.id));
  wrap.remove();
  if (!invRows.length) invAdd();
  invCalc();
  inv.add.focus();
});
inv.add.addEventListener('click', () => { invAdd(); inv.body.lastElementChild.querySelector('input').focus(); });
inv.mode.addEventListener('change', invCalc);
inv.copy.addEventListener('click', async () => {
  const lines = invRows.map((r) => {
    const price = parseAmount(r.price); const qty = parseAmount(r.qty);
    if (price === null || qty === null) return null;
    const c = calcKdv({ amount: price, rate: Number(r.rate), mode: inv.mode.value, qty });
    return `${r.desc || 'Satır'}\t${fmtPct.format(qty)} × ${money(price)}\t%${r.rate}\tmatrah ${money(c.net)}\tKDV ${money(c.vat)}\ttoplam ${money(c.gross)}`;
  }).filter(Boolean);
  const totals = inv.totals.textContent.trim().replace(/\s{2,}/g, ' ');
  try { await navigator.clipboard.writeText(`${lines.join('\n')}\n\n${totals}`); inv.status.textContent = 'Fatura taslağı kopyalandı.'; }
  catch { inv.status.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});
invAdd(); invAdd();

/* ---------- Yüzde hesaplama sekmesi ---------- */
const pct = {
  x: $('p-x'), y: $('p-y'), r1: $('p-r1'),
  a: $('p-a'), b: $('p-b'), r2: $('p-r2'),
  price: $('p-price'), rate: $('p-rate'), dir: $('p-dir'), r3: $('p-r3'),
  error: $('p-error'),
};
function renderPercent() {
  showError(pct.error, '');
  try {
    const x = parseAmount(pct.x.value, 'Sayı'); const y = parseAmount(pct.y.value, 'Yüzde');
    pct.r1.textContent = x !== null && y !== null ? fmt.format(round2(x * y / 100)) : '—';

    const a = parseAmount(pct.a.value, 'Eski değer'); const b = parseAmount(pct.b.value, 'Yeni değer');
    if (a !== null && b !== null) {
      if (a === 0) throw new Error('Eski değer sıfır olunca yüzde değişim tanımsızdır. Sıfırdan farklı bir başlangıç değeri girin.');
      const ch = (b - a) / a * 100;
      pct.r2.textContent = `%${fmt.format(Math.abs(round2(ch)))} ${ch >= 0 ? 'artış' : 'azalış'}`;
    } else pct.r2.textContent = '—';

    const price = parseAmount(pct.price.value, 'Fiyat'); const rate = parseAmount(pct.rate.value, 'Oran');
    if (price !== null && rate !== null) {
      const sign = pct.dir.value === 'indirim' ? -1 : 1;
      const diff = round2(price * rate / 100);
      pct.r3.textContent = `${money(price + sign * diff)} (fark ${money(diff)})`;
    } else pct.r3.textContent = '—';
  } catch (err) { showError(pct.error, err.message); }
}
[pct.x, pct.y, pct.a, pct.b, pct.price, pct.rate].forEach((i) => i.addEventListener('input', renderPercent));
pct.dir.addEventListener('change', renderPercent);
$('form-percent').addEventListener('submit', (e) => { e.preventDefault(); renderPercent(); });

/* ---------- Parametreler (oranlar + güncelleme tarihi) ---------- */
async function loadParams() {
  let params = DEFAULT_PARAMS;
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = { ...DEFAULT_PARAMS, ...(await res.json()) };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar */ }
  const d = new Date(params.guncelleme);
  const dateText = Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('rates-updated').textContent = dateText;
  const list = $('rates-list');
  if (list && Array.isArray(params.kdv_oranlari)) {
    list.innerHTML = params.kdv_oranlari.map((r) => `<li><strong>%${r.oran}</strong>${r.aciklama ? ` – ${r.aciklama}` : ''}</li>`).join('');
  }
  const whList = $('f-wh-list');
  if (whList && Array.isArray(params.tevkifat_oranlari)) whList.innerHTML = params.tevkifat_oranlari.map((v) => `<option value="${v}">`).join('');
}

/* ---------- Başlat ---------- */
readUrl();
updateModeUi(); updateRateUi(); updateWhUi();
renderSingle();
loadParams();
