// Kâr Marjı ve Markup Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError, downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => (Number.isFinite(n) ? `${fmt.format(round2(n))} ₺` : '—');
const pct = (n) => (Number.isFinite(n) ? `%${fmt.format(round2(n))}` : '—');

// Zorunlu alan henüz boşsa fırlatılır; hata kutusu göstermeden sonucu gizler.
class Incomplete extends Error {}

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

/** Komisyonun satış fiyatına (KDV hariç = 1, KDV dahil = 1 + KDV) oranı. */
const commissionRate = ({ commission, commissionOnGross, vatRate }) => (commission / 100) * (commissionOnGross ? 1 + vatRate / 100 : 1);

/**
 * Bir ürünün kâr kalemleri. net: KDV hariç satış fiyatı, cost: KDV hariç ürün maliyeti.
 * Brüt kâr = net − maliyet; net kâr = brüt kâr − komisyon − kargo.
 * Marj kâr ÷ satış, markup kâr ÷ maliyet; net markup'ta maliyet = ürün + komisyon + kargo.
 */
export function breakdown({ cost, net, vatRate, commission = 0, commissionOnGross = false, shipping = 0 }) {
  const gross = net * (1 + vatRate / 100);
  const comm = (commissionOnGross ? gross : net) * commission / 100;
  const grossProfit = net - cost;
  const profit = grossProfit - comm - shipping;
  const totalCost = cost + comm + shipping;
  return {
    net, vat: gross - net, gross, comm, shipping, cost, grossProfit,
    grossMargin: net > 0 ? (grossProfit / net) * 100 : NaN,
    grossMarkup: cost > 0 ? (grossProfit / cost) * 100 : NaN,
    profit,
    margin: net > 0 ? (profit / net) * 100 : NaN,
    markup: totalCost > 0 ? (profit / totalCost) * 100 : NaN,
  };
}

/** Maliyet ve hedef (net) marjdan KDV hariç satış fiyatı: (maliyet + kargo) ÷ (1 − komisyon oranı − marj). */
export function netPriceForMargin({ cost, targetMargin, vatRate, commission, commissionOnGross, shipping }) {
  if (targetMargin >= 100) {
    throw new Error('Hedef marj %100 ve üzeri olamaz; kâr, satış fiyatından büyük olamaz. 99,9 gibi daha düşük bir marj girin ya da markup mantığıyla fiyat bulmak için Satış Fiyatı Hesaplama aracını kullanın.');
  }
  const denom = 1 - commissionRate({ commission, commissionOnGross, vatRate }) - targetMargin / 100;
  if (denom <= 0) {
    throw new Error('Hedef marj ile komisyon oranının toplamı satış fiyatının tamamına ulaşıyor; hiçbir fiyat bu hedefi tutturmaz. Hedef marjı ya da komisyon oranını düşürün.');
  }
  return (cost + shipping) / denom;
}

/** Satış fiyatı ve hedef (net) marjdan KDV hariç azami maliyet: satış × (1 − komisyon oranı − marj) − kargo. */
export function maxCostForMargin({ net, targetMargin, vatRate, commission, commissionOnGross, shipping }) {
  if (targetMargin >= 100) {
    throw new Error('Hedef marj %100 ve üzeri olamaz; kâr, satış fiyatından büyük olamaz. 99,9 gibi daha düşük bir marj girin.');
  }
  const maxCost = net * (1 - commissionRate({ commission, commissionOnGross, vatRate }) - targetMargin / 100) - shipping;
  if (maxCost <= 0) {
    throw new Error('Bu satış fiyatıyla hedef marj tutturulamaz: komisyon, kargo ve hedef kâr satış tutarının tamamını harcıyor. Satış fiyatını yükseltin ya da hedef marjı, komisyonu veya kargoyu düşürün.');
  }
  return maxCost;
}

/** Zarar etmemek için gereken en düşük KDV hariç satış fiyatı. */
export function breakEvenNet({ cost, vatRate, commission, commissionOnGross, shipping }) {
  const denom = 1 - commissionRate({ commission, commissionOnGross, vatRate });
  return denom > 0 ? (cost + shipping) / denom : NaN;
}

/* ---------- Arayüz ---------- */
const el = {
  modes: Array.from(document.querySelectorAll('input[name="mode"]')),
  sections: Array.from(document.querySelectorAll('[data-mode]')),
  cost: $('m-cost'), sale: $('m-sale'), target: $('m-target'),
  vat: $('m-vat'), vatCustom: $('m-vat-custom'), vatCustomWrap: $('vat-custom-wrap'),
  saleTax: $('m-saletax'), comm: $('m-comm'), commBase: $('m-commbase'), ship: $('m-ship'),
  error: $('error'), result: $('result'), rows: $('result-rows'), note: $('result-note'),
  copy: $('copy'), status: $('copy-status'), single: $('single-wrap'), bulk: $('bulk-wrap'),
  saleLabel: $('sale-label'),
};

/** Sonuç kutusunu gösterir/gizler (.ba-result yalnızca is-active ile görünür). */
function setResult(on) { el.result.hidden = !on; el.result.classList.toggle('is-active', on); }

const currentMode = () => el.modes.find((m) => m.checked)?.value || 'kar';

/** Ortak ayarları (KDV, komisyon, kargo) okur ve doğrular. */
function readSettings() {
  let vatRate;
  if (el.vat.value === 'ozel') {
    const r = parseAmount(el.vatCustom.value, 'KDV oranı');
    if (r === null) throw new Incomplete();
    if (r > 100) throw new Error('KDV oranı %100\'den büyük olamaz. Oranı yüzde olarak girin (örn. 20).');
    vatRate = r;
  } else {
    vatRate = Number(el.vat.value);
  }
  const commission = parseAmount(el.comm.value, 'Komisyon oranı') ?? 0;
  if (commission >= 100) throw new Error('Komisyon oranı %100\'den küçük olmalı. Pazar yerinin gösterdiği oranı yüzde olarak girin (örn. 15).');
  const shipping = parseAmount(el.ship.value, 'Kargo bedeli') ?? 0;
  return {
    vatRate, commission, shipping,
    commissionOnGross: el.commBase.value === 'dahil',
    saleIncludesVat: el.saleTax.value === 'dahil',
  };
}

// Satış fiyatı girişini KDV hariç tutara çevirir.
const toNet = (price, s) => (s.saleIncludesVat ? price / (1 + s.vatRate / 100) : price);

function syncSaleLabel() {
  el.saleLabel.textContent = `Satış fiyatı (₺, ${el.saleTax.value === 'dahil' ? 'KDV dahil' : 'KDV hariç'})`;
}

function compute() {
  const mode = currentMode();
  const needCost = mode === 'kar' || mode === 'fiyat';
  const needSale = mode === 'kar' || mode === 'maliyet';
  const needTarget = mode === 'fiyat' || mode === 'maliyet';
  // Önce tüm alanları ayrıştır: boş olanlar sonucu gizler, hatalı olanlar mesaj verir.
  const cost = needCost ? parseAmount(el.cost.value, 'Maliyet', { allowZero: false }) : 0;
  const sale = needSale ? parseAmount(el.sale.value, 'Satış fiyatı', { allowZero: false }) : 0;
  const target = needTarget ? parseAmount(el.target.value, 'Hedef marj') : 0;
  const s = readSettings();
  if (cost === null || sale === null || target === null) throw new Incomplete();

  const hasExtras = s.commission > 0 || s.shipping > 0;
  const rows = [];
  const row = (id, label, value, strong = false) => rows.push([id, label, value, strong]);
  const common = { vatRate: s.vatRate, commission: s.commission, commissionOnGross: s.commissionOnGross, shipping: s.shipping };
  let b;
  let note = '';

  if (mode === 'kar') {
    b = breakdown({ cost, net: toNet(sale, s), ...common });
    row('haric', 'Satış fiyatı (KDV hariç)', money(b.net));
    row('kdv', `KDV (%${fmt.format(s.vatRate)})`, money(b.vat));
    row('dahil', 'Satış fiyatı (KDV dahil)', money(b.gross));
  } else if (mode === 'fiyat') {
    const net = netPriceForMargin({ cost, targetMargin: target, ...common });
    b = breakdown({ cost, net, ...common });
    row('haric', 'Gereken satış fiyatı (KDV hariç)', money(b.net), true);
    row('kdv', `KDV (%${fmt.format(s.vatRate)})`, money(b.vat));
    row('dahil', 'Gereken satış fiyatı (KDV dahil)', money(b.gross), true);
  } else if (mode === 'maliyet') {
    const net = toNet(sale, s);
    const maxCost = maxCostForMargin({ net, targetMargin: target, ...common });
    b = breakdown({ cost: maxCost, net, ...common });
    row('haric', 'Satış fiyatı (KDV hariç)', money(b.net));
    row('dahil', 'Satış fiyatı (KDV dahil)', money(b.gross));
    row('maxcost', 'Azami ürün maliyeti (KDV hariç)', money(maxCost), true);
    row('maxcost-dahil', `Aynı oranlı KDV dahil alış bedeli (%${fmt.format(s.vatRate)})`, money(maxCost * (1 + s.vatRate / 100)));
  }

  // Ortak kâr satırları: brüt değerler her zaman, komisyon/kargo varsa net değerler de.
  row('kar', 'Brüt kâr (satış − ürün maliyeti)', money(b.grossProfit), !hasExtras);
  row('marj', 'Kâr marjı (kâr ÷ satış fiyatı)', pct(b.grossMargin), !hasExtras);
  row('markup', 'Markup (kâr ÷ maliyet)', pct(b.grossMarkup), !hasExtras);
  if (hasExtras) {
    row('comm', 'Pazar yeri komisyonu', money(b.comm));
    row('ship', 'Kargo / paketleme', money(b.shipping));
    row('net', 'Net kâr (komisyon ve kargo düşülmüş)', money(b.profit), true);
    row('netmarj', 'Net kâr marjı', pct(b.margin), true);
    row('netmarkup', 'Net markup (net kâr ÷ toplam maliyet)', pct(b.markup));
    const be = breakEvenNet({ cost: b.cost, ...common });
    row('basabas', 'Zarar etmemek için asgari satış (KDV hariç)', Number.isFinite(be) ? money(be) : 'Hesaplanamaz');
  }

  if (b.profit < 0) {
    note = 'Net kâr negatif: bu fiyatla her satışta zarar edersiniz. Satış fiyatını artırın ya da maliyet, komisyon ve kargo kalemlerini gözden geçirin.';
  } else if (mode === 'maliyet') {
    note = 'Azami maliyet, hedef marjı tam olarak tutturan en yüksek alış bedelidir. Bunun üzerindeki her fiyat teklifi marjınızı hedefin altına çeker.';
  } else {
    note = `Marj kârın satış fiyatına, markup ise kârın maliyete oranıdır: %${fmt.format(round2(b.grossMargin))} brüt marj, %${fmt.format(round2(b.grossMarkup))} markup eder.`;
  }
  if (hasExtras) {
    note += ` Komisyon ${s.commissionOnGross ? 'KDV dahil' : 'KDV hariç'} satış fiyatı üzerinden, kargo ise ürün başına sabit tutar olarak hesaplandı; komisyon ve kargo faturalarındaki KDV indirilecek KDV sayılarak dışarıda bırakıldı.`;
  } else {
    note += ' Maliyet her zaman KDV hariç tutardır; kâr yalnızca KDV hariç satış fiyatı üzerinden hesaplanır.';
  }
  return { rows, note };
}

function render() {
  if (currentMode() === 'toplu') { renderBulk(); return; }
  el.status.textContent = '';
  try {
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
    setResult(true);
  } catch (err) {
    setResult(false);
    showError(el.error, err instanceof Incomplete ? '' : err.message);
  }
}

function syncMode() {
  const mode = currentMode();
  el.sections.forEach((s) => { s.hidden = !s.dataset.mode.split(' ').includes(mode); });
  el.single.hidden = mode === 'toplu';
  el.bulk.hidden = mode !== 'toplu';
  setResult(false);
  showError(el.error, '');
  render();
}

/* ---------- Çoklu ürün listesi ---------- */
const bulk = {
  body: $('bulk-rows'), add: $('bulk-add'), totals: $('bulk-totals'), copyCsv: $('bulk-copy'),
  csv: $('bulk-csv'), status: $('bulk-status'), fallback: $('csv-fallback'), fallbackWrap: $('csv-fallback-wrap'),
};

function addBulkRow() {
  const div = document.createElement('div');
  div.className = 'bulk-row';
  div.innerHTML = `
    <div class="ba-field"><label>Ürün adı<input type="text" data-k="name" autocomplete="off"></label></div>
    <div class="ba-field"><label>Maliyet (₺, KDV hariç)<input type="text" inputmode="decimal" data-k="cost" autocomplete="off"></label></div>
    <div class="ba-field"><label>Satış fiyatı (₺)<input type="text" inputmode="decimal" data-k="price" autocomplete="off"></label></div>
    <div class="ba-field"><label>Adet<input type="text" inputmode="decimal" data-k="qty" autocomplete="off" placeholder="1"></label></div>
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
  const outs = Array.from(bulk.body.children);
  let settings;
  try {
    settings = readSettings();
  } catch (err) {
    outs.forEach((d) => { d.querySelector('[data-k="out"]').textContent = '—'; });
    bulk.totals.hidden = true; bulk.copyCsv.disabled = true; bulk.csv.disabled = true;
    showError(el.error, err instanceof Incomplete ? '' : err.message);
    return;
  }
  let bad = '';
  outs.forEach((div, i) => {
    const g = (k) => div.querySelector(`[data-k="${k}"]`);
    const out = g('out');
    out.textContent = '—';
    try {
      const cost = parseAmount(g('cost').value, `${i + 1}. satır maliyeti`, { allowZero: false });
      const price = parseAmount(g('price').value, `${i + 1}. satır satış fiyatı`, { allowZero: false });
      const qty = parseAmount(g('qty').value, `${i + 1}. satır adedi`, { allowZero: false }) ?? 1;
      if (cost === null || price === null) return;
      const b = breakdown({ cost, net: toNet(price, settings), vatRate: settings.vatRate, commission: settings.commission, commissionOnGross: settings.commissionOnGross, shipping: settings.shipping });
      out.textContent = `Kâr ${money(b.profit)} · Marj ${pct(b.margin)} · Markup ${pct(b.markup)}`;
      bulkResult.push({ name: g('name').value.trim() || `Ürün ${i + 1}`, qty, ...b });
    } catch (err) { bad = bad || err.message; }
  });
  showError(el.error, bad);

  const has = bulkResult.length > 0;
  bulk.totals.hidden = !has;
  bulk.copyCsv.disabled = !has;
  bulk.csv.disabled = !has;
  if (!has) return;
  const sum = (f) => bulkResult.reduce((acc, r) => acc + f(r) * r.qty, 0);
  const totalCost = sum((r) => r.cost);
  const totalNet = sum((r) => r.net);
  const totalFees = sum((r) => r.comm + r.shipping);
  const totalProfit = sum((r) => r.profit);
  const avg = (key) => bulkResult.reduce((acc, r) => acc + r[key], 0) / bulkResult.length;
  $('mt-cost').textContent = money(totalCost);
  $('mt-sale').textContent = money(totalNet);
  $('mt-fees').textContent = money(totalFees);
  $('mt-profit').textContent = money(totalProfit);
  $('mt-margin').textContent = pct(totalNet > 0 ? (totalProfit / totalNet) * 100 : NaN);
  $('mt-avgmargin').textContent = pct(avg('margin'));
  $('mt-avgmarkup').textContent = pct(avg('markup'));
}

// CSV: Excel'in Türkçe sürümü için noktalı virgül kullanılır; binlik ayırıcı yazılmaz, ondalık virgüldür.
function buildCsv(rows) {
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const n = (v) => fmt.format(round2(v)).replace(/\./g, '');
  const head = ['Ürün', 'Adet', 'Maliyet', 'Satış (KDV hariç)', 'Komisyon', 'Kargo', 'Net kâr', 'Marj (%)', 'Markup (%)'];
  const lines = [head.map(esc).join(';')];
  for (const r of rows) {
    lines.push([esc(r.name), String(r.qty).replace('.', ','), n(r.cost), n(r.net), n(r.comm), n(r.shipping), n(r.profit), n(r.margin), n(r.markup)].join(';'));
  }
  return `${lines.join('\r\n')}\r\n`;
}

bulk.add.addEventListener('click', () => { const d = addBulkRow(); d.querySelector('[data-k="name"]').focus(); renderBulk(); });
bulk.body.addEventListener('input', renderBulk);
bulk.body.addEventListener('change', renderBulk);
bulk.copyCsv.addEventListener('click', async () => {
  if (!bulkResult.length) { showError(el.error, 'Kopyalanacak satır yok. En az bir ürün için maliyet ve satış fiyatı girin.'); return; }
  const text = buildCsv(bulkResult);
  bulk.fallback.value = text;
  try {
    await navigator.clipboard.writeText(text);
    bulk.fallbackWrap.hidden = true;
    bulk.status.textContent = 'CSV panoya kopyalandı. Excel\'de Veri > Metni Sütunlara Dönüştür ile noktalı virgülden ayırabilirsiniz.';
  } catch {
    // Pano erişimi reddedilirse metni seçili göster; kullanıcı Ctrl+C ile kopyalar.
    bulk.fallbackWrap.hidden = false;
    bulk.fallback.focus(); bulk.fallback.select();
    bulk.status.textContent = 'Otomatik kopyalama yapılamadı; aşağıdaki metin seçildi, Ctrl+C ile kopyalayın.';
  }
});
bulk.csv.addEventListener('click', () => {
  if (!bulkResult.length) { showError(el.error, 'İndirilecek satır yok. En az bir ürün için maliyet ve satış fiyatı girin.'); return; }
  // Başındaki BOM (0xFEFF), Excel'in Türkçe karakterleri doğru okumasını sağlar.
  downloadBlob(new Blob([String.fromCharCode(0xFEFF), buildCsv(bulkResult)], { type: 'text/csv;charset=utf-8' }), 'kar-marji-listesi.csv');
  bulk.status.textContent = 'CSV dosyası indirildi; dosya yalnızca bu cihazda oluşturuldu.';
});

/* ---------- Olaylar ---------- */
el.modes.forEach((m) => m.addEventListener('change', syncMode));
el.vat.addEventListener('change', () => { el.vatCustomWrap.hidden = el.vat.value !== 'ozel'; render(); });
el.saleTax.addEventListener('change', syncSaleLabel);
['cost', 'sale', 'target', 'vatCustom', 'saleTax', 'comm', 'commBase', 'ship'].forEach((k) => {
  el[k].addEventListener('input', render);
  el[k].addEventListener('change', render);
});
$('form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  el.vatCustomWrap.hidden = true;
  bulk.body.querySelectorAll('input').forEach((i) => { i.value = ''; });
  bulk.fallbackWrap.hidden = true;
  bulk.status.textContent = '';
  syncSaleLabel();
  syncMode();
});
el.copy.addEventListener('click', async () => {
  const text = Array.from(el.rows.children).map((r) => `${r.children[0].textContent}: ${r.children[1].textContent}`).join('\n');
  try { await navigator.clipboard.writeText(text); el.status.textContent = 'Sonuç kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});

addBulkRow(); addBulkRow();
syncSaleLabel();
syncMode();
