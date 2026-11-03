// Kira Artış Oranı Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Hukuki tavsiye değildir; yalnızca çarpma işlemidir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// parametreler.json yüklenemezse kullanılacak varsayılanlar (liste boş kalır, hesap yine çalışır).
let params = { guncelleme: '', oranlar: [], sinirlar: { oran_max: 1000 } };

const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const pct = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "100.000,50", "100000", "31,23". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/** Kuruşa yuvarlar. */
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Yeni kira, artış tutarı ve farkları hesaplar. */
export function calcRent(rent, ratePct) {
  const increase = round2(rent * ratePct / 100);
  const next = round2(rent + increase);
  return { increase, next, monthDiff: increase, yearDiff: round2(increase * 12), yearTotal: round2(next * 12) };
}

const el = { error: $('error'), period: $('period'), rate: $('rate'), result: $('result') };
let lastText = '';

function setText(id, v) { $(id).textContent = v; }

function fillPeriods() {
  const list = params.oranlar || [];
  for (const p of list) {
    const o = document.createElement('option');
    o.value = String(p.oran);
    o.textContent = `${p.donem} yenilemesi: ${pct(p.oran)}${p.yaklasik ? ' (yaklaşık)' : ''}`;
    el.period.appendChild(o);
  }
  if (!list.length) $('period-hint').textContent = 'Kayıtlı oran listesi yüklenemedi; oranı elle girin.';
  if (params.guncelleme) {
    $('params-line').textContent = `Oran listesi ${params.guncelleme} tarihinde güncellendi. Kaynak: TÜİK. Kesin işlem öncesi oranı TÜİK'ten doğrulayın.`;
  }
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* çevrimdışı önbellek yoksa varsayılanlarla devam */ }
  fillPeriods();
}

function calculate() {
  const rent = parseNum($('rent').value);
  const rate = parseNum(el.rate.value);
  const max = params.sinirlar?.oran_max ?? 1000;
  if (!(rent > 0)) throw new Error('Mevcut kira eksik ya da geçersiz. Örneğin 10.000 yazın; yalnızca rakam, nokta ve virgül kullanın.');
  if (rent > 1e9) throw new Error('Kira tutarı çok büyük. 1 milyar TL altında bir tutar girin.');
  if (el.rate.value.trim() === '') throw new Error("Artış oranı boş. TÜİK'in son açıkladığı 12 aylık ortalama TÜFE oranını yazın ya da listeden bir dönem seçin.");
  if (!(rate >= 0) || rate > max) throw new Error(`Artış oranı geçersiz. 0 ile ${max} arasında, yüzde olarak girin (örneğin 31,23).`);

  const kind = document.querySelector('input[name="kind"]:checked').value;
  const r = calcRent(rent, rate);
  setText('r-old', fmt(rent));
  setText('r-rate', pct(rate));
  setText('r-inc', fmt(r.increase));
  setText('r-new', fmt(r.next));
  setText('r-month-diff', fmt(r.monthDiff));
  setText('r-year-diff', fmt(r.yearDiff));
  setText('r-year-total', fmt(r.yearTotal));
  const kindName = kind === 'konut' ? 'konut' : 'iş yeri';
  const note = kind === 'konut'
    ? 'Konutta yenileme artışı, TBK md. 344 uyarınca 12 aylık TÜFE ortalamasını aşamaz; girdiğiniz oranın güncel TÜİK değeri olduğunu doğrulayın.'
    : 'İş yerinde de TBK md. 344 (md. 346 yollamasıyla) uygulanır; sözleşme hükümleri farklılık yaratabilir. Hukuki tavsiye değildir.';
  setText('r-note', `Kiralanan yer: ${kindName}. ${note}`);
  lastText = `Kira artışı (${kindName}): mevcut ${fmt(rent)}, oran ${pct(rate)}, artış ${fmt(r.increase)}, yeni kira ${fmt(r.next)}, yıllık fark ${fmt(r.yearDiff)}.`;
  el.result.hidden = false;
  el.result.classList.add('is-active');
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError(el.error, '');
  try { calculate(); } catch (err) {
    el.result.hidden = true; el.result.classList.remove('is-active');
    showError(el.error, err.message);
  }
});

el.period.addEventListener('change', () => {
  if (el.period.value) el.rate.value = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(Number(el.period.value));
});

$('clear').addEventListener('click', () => {
  $('form').reset();
  showError(el.error, '');
  el.result.hidden = true; el.result.classList.remove('is-active');
  setText('copy-status', '');
});

$('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(lastText);
    setText('copy-status', 'Sonuç panoya kopyalandı.');
  } catch {
    setText('copy-status', 'Kopyalanamadı; sonucu elle seçip kopyalayın.');
  }
});

loadParams();
