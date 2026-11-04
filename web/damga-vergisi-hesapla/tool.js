// Damga Vergisi Hesaplama 2026 — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
// Oranlar ve üst sınır parametreler.json içinde tutulur (yıllık güncellenir).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtRate = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 3 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;

// parametreler.json yüklenemezse (çevrimdışı önbellek vb.) kullanılacak varsayılanlar.
let params = {
  guncelleme: '2026-11-04',
  ust_sinir: 29115961.10,
  kefil_orani: 9.48,
  turler: [
    { id: 'sozlesme', ad: 'Parasal değer ifade eden sözleşme', oran: 9.48, teyit: true, kira: false },
    { id: 'kira', ad: 'Kira sözleşmesi', oran: 1.89, teyit: true, kira: true },
    { id: 'ucret', ad: 'Ücret ödemeleri', oran: 7.59, teyit: true, kira: false },
    { id: 'ihale', ad: 'İhale kararları', oran: 5.69, teyit: false, kira: false },
    { id: 'teminat', ad: 'Teminat mektubu, kefalet ve taahhütname', oran: 9.48, teyit: true, kira: false },
  ],
};

/* ---------- Sayı ayrıştırma (1.250,50 / 1250,5 / 1250.5) ---------- */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/gi, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 100.000,00). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Sözleşmedeki pozitif tutarı girin.`);
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
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 100.000,00`);
  return n;
}

/* ---------- Hesap çekirdeği ---------- */
/**
 * @param base       Matrah (₺): sözleşme bedeli ya da kira için toplam kira
 * @param perMille   Binde oran (9,48 gibi)
 * @param cap        Kâğıt başına üst sınır (₺)
 * @param guarantor  Kira sözleşmesinde kefil varsa ek binde oranı (yoksa 0)
 * @param copies     Nüsha sayısı
 * @param copyEach   true ise her nüsha ayrı kâğıt sayılır (temkinli yaklaşım)
 */
export function calcStamp({ base, perMille, cap, guarantor = 0, copies = 1, copyEach = false }) {
  const raw = base * perMille / 1000;
  const capped = raw > cap;
  const main = round2(Math.min(raw, cap));
  const guarRaw = guarantor ? base * guarantor / 1000 : 0;
  const guar = round2(Math.min(guarRaw, cap));
  const multiplier = copyEach ? Math.max(1, copies) : 1;
  const total = round2((main + guar) * multiplier);
  return { base, perMille, raw: round2(raw), main, guar, capped, multiplier, total };
}

/* ---------- Arayüz ---------- */
const el = {
  type: $('f-type'), amount: $('f-amount'), amountLabel: $('amount-label'), amountHint: $('amount-hint'),
  months: $('f-months'), monthsWrap: $('months-wrap'),
  guar: $('f-guar'), guarWrap: $('guar-wrap'),
  copies: $('f-copies'), copyEach: $('f-copy-each'),
  custom: $('f-custom'), customWrap: $('custom-wrap'),
  error: $('error'), result: $('result'), unsure: $('r-unsure'),
  copy: $('copy'), status: $('copy-status'),
};

const currentType = () => params.turler.find((t) => t.id === el.type.value);

function updateUi() {
  const t = currentType();
  const isKira = !!t?.kira;
  el.monthsWrap.hidden = !isKira;
  el.guarWrap.hidden = !isKira;
  el.customWrap.hidden = el.type.value !== 'ozel';
  el.amountLabel.textContent = isKira ? 'Aylık kira bedeli (₺, KDV hariç)' : 'Sözleşme / kâğıt tutarı (₺)';
  el.amountHint.textContent = isKira
    ? 'Matrah, sözleşme süresince ödenecek toplam kiradır (aylık kira × ay sayısı).'
    : 'KDV hariç tutarı girin. Tutar belirsizse maktu vergi uygulanabilir; vergi dairesine danışın.';
}

function compute() {
  const t = currentType();
  const isCustom = el.type.value === 'ozel';
  let perMille;
  if (isCustom) {
    perMille = parseAmount(el.custom.value, 'Binde oran');
    if (perMille === null) throw new Error('Özel binde oranı girin (örn. 9,48) ya da listeden bir kâğıt türü seçin.');
    if (perMille <= 0 || perMille > 100) throw new Error('Binde oran 0 ile 100 arasında olmalı. Kanundaki "binde 9,48" ifadesi için 9,48 yazın.');
  } else perMille = t.oran;
  let amount = parseAmount(el.amount.value, 'Tutar');
  if (amount === null) throw new Error('Tutar alanı boş. Sözleşmedeki tutarı girin; Türkçe biçim kullanabilirsiniz (örn. 100.000,00).');
  let base = amount;
  let months = 1;
  if (t?.kira) {
    months = parseAmount(el.months.value, 'Ay sayısı');
    if (months === null || months < 1 || !Number.isInteger(months)) throw new Error('Ay sayısı 1 veya daha büyük bir tam sayı olmalı (örn. 12). Yıllık hesap için 12, iki yıl için 24 yazın.');
    base = amount * months;
  }
  const copies = Math.floor(parseAmount(el.copies.value || '1', 'Nüsha sayısı') || 1);
  if (copies < 1) throw new Error('Nüsha sayısı en az 1 olmalı.');
  const guarantor = t?.kira && el.guar.checked ? params.kefil_orani : 0;
  const r = calcStamp({ base, perMille, cap: params.ust_sinir, guarantor, copies, copyEach: el.copyEach.checked });
  return { r, t, isCustom, months, amount, copies };
}

function setText(id, v) { $(id).textContent = v; }

function render() {
  el.status.textContent = '';
  updateUi();
  try {
    if (!el.amount.value.trim()) { showError(el.error, ''); el.result.hidden = true; el.result.classList.remove("is-active"); return; }
    const { r, t, isCustom, months, copies } = compute();
    showError(el.error, '');
    setText('r-matrah', money(r.base));
    setText('r-oran', `Binde ${fmtRate.format(r.perMille)}`);
    setText('r-main', money(r.main));
    $('row-guar').hidden = !r.guar;
    setText('r-guar', money(r.guar));
    $('row-copies').hidden = r.multiplier === 1;
    setText('r-copies', `× ${r.multiplier}`);
    setText('r-damga', money(r.total));
    setText('r-cap', r.capped ? `Üst sınır uygulandı (${money(params.ust_sinir)})` : `Üst sınırın altında (${money(params.ust_sinir)})`);
    const notes = [];
    if (t && !t.teyit) notes.push('Bu tür için oran yaklaşık kabul edilmiştir; uygulamadan önce vergi dairesinden teyit edin.');
    if (isCustom) notes.push('Özel oran kullanıldı; oranı ilgili mevzuattan siz doğrulamalısınız.');
    if (copies > 1 && !el.copyEach.checked) notes.push('Nüsha sayısı sonucu değiştirmedi: vergi tek kâğıt üzerinden hesaplandı. Kurumunuz her nüshayı ayrı kâğıt sayıyorsa kutuyu işaretleyin.');
    if (t?.kira && months > 0) notes.push(`Matrah: ${money(r.base / months)} × ${months} ay.`);
    el.unsure.textContent = notes.join(' ');
    el.result.hidden = false; el.result.classList.add("is-active");
  } catch (err) {
    showError(el.error, err.message);
    el.result.hidden = true; el.result.classList.remove("is-active");
  }
}

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = { ...params, ...(await res.json()) };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar */ }
  const d = new Date(params.guncelleme);
  setText('params-updated', Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));
  setText('params-cap', money(params.ust_sinir));
  el.type.innerHTML = '';
  for (const t of params.turler) {
    const o = document.createElement('option');
    o.value = t.id;
    o.textContent = `${t.ad} — binde ${fmtRate.format(t.oran)}${t.teyit ? '' : ' (yaklaşık)'}`;
    el.type.append(o);
  }
  const custom = document.createElement('option');
  custom.value = 'ozel'; custom.textContent = 'Diğer (oranı kendim gireyim)';
  el.type.append(custom);
  const ratesList = $('rates-list');
  if (ratesList) ratesList.innerHTML = params.turler.map((t) => `<li><strong>Binde ${fmtRate.format(t.oran)}</strong> – ${t.ad}${t.teyit ? '' : ' (yaklaşık)'}</li>`).join('');
  render();
}

['type', 'amount', 'months', 'guar', 'copies', 'copyEach', 'custom'].forEach((k) => {
  el[k].addEventListener('input', render);
  el[k].addEventListener('change', render);
});
$('form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
$('clear').addEventListener('click', () => { $('form').reset(); render(); });
el.copy.addEventListener('click', async () => {
  const lines = [['Matrah', 'r-matrah'], ['Oran', 'r-oran'], ['Damga vergisi', 'r-damga']].map(([l, id]) => `${l}: ${$(id).textContent}`);
  try { await navigator.clipboard.writeText(lines.join('\n')); el.status.textContent = 'Sonuç kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});

updateUi();
loadParams();
