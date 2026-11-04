// Trafik Cezası Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Tutarlar ve ceza puanları parametreler.json'dan okunur; resmî tutanak esastır, hukuki tavsiye değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// parametreler.json yüklenemezse kullanılacak asgari varsayılan.
let params = {
  guncelleme: '2026-11-04',
  dogrulandi: false,
  indirim: { oran_yuzde: 25, ay: 1 },
  itiraz: { gun: 15 },
  puan_siniri: 100,
  gruplar: [{ id: 'isik', ad: 'Işık, işaret ve öncelik' }],
  maddeler: [{ id: 'kirmizi-isik', grup: 'isik', ad: 'Kırmızı ışıkta geçmek', tutar: 5000, puan: 20, yaklasik: true }],
  sinirlar: { adet_max: 20, mevcut_puan_max: 999 },
};

/** Arama için Türkçe karakterleri sadeleştirir: "Kırmızı" -> "kirmizi". */
export function normalize(s) {
  return String(s ?? '')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i');
}

/** Tam sayı metnini sayıya çevirir; geçersizse NaN. */
export function parseCount(s, maxDigits = 3) {
  const t = String(s ?? '').trim();
  return new RegExp(`^\\d{1,${maxDigits}}$`).test(t) ? Number(t) : NaN;
}

/** İndirimli tutar: toplamın (100 - oran)% değeri, kuruşa yuvarlanır. */
export function discounted(total, ratePercent) {
  return round2(total * (1 - ratePercent / 100));
}

/** "YYYY-MM-DD" metnine gün ekler (UTC üzerinden; saat dilimi kayması olmaz). */
export function addDays(iso, days) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  if (d.getUTCFullYear() !== Number(m[1]) || d.getUTCMonth() !== Number(m[2]) - 1 || d.getUTCDate() !== Number(m[3])) return null;
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** "YYYY-MM-DD" metnine ay ekler (ay sonu taşarsa ayın son gününe sabitlenir). */
export function addMonths(iso, months) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!addDays(iso, 0)) return null;
  const y = Number(m[1]); const mo = Number(m[2]) - 1 + months; const day = Number(m[3]);
  const last = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, mo, Math.min(day, last)));
}

const dateFmt = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'full', timeZone: 'UTC' });

const el = { error: $('error'), result: $('result'), madde: $('madde'), q: $('q'), list: $('list') };
/** Kullanıcının eklediği cezalar: { id, qty } */
let items = [];
let lastText = '';

const rate = () => params.indirim?.oran_yuzde ?? 25;
const byId = (id) => params.maddeler.find((m) => m.id === id);

/** Arama kutusuna göre madde listesini (gruplu) yeniden kurar. */
function buildSelect() {
  const keep = el.madde.value;
  const q = normalize(el.q.value.trim());
  el.madde.innerHTML = '';
  let count = 0;
  for (const g of params.gruplar) {
    const rows = params.maddeler.filter((m) => m.grup === g.id && (!q || normalize(m.ad).includes(q) || normalize(g.ad).includes(q)));
    if (!rows.length) continue;
    const og = document.createElement('optgroup');
    og.label = g.ad;
    for (const m of rows) { og.append(new Option(m.ad, m.id)); count++; }
    el.madde.append(og);
  }
  if (!count) el.madde.append(Object.assign(new Option('Eşleşen madde yok', ''), { disabled: true }));
  else if ([...el.madde.options].some((o) => o.value === keep)) el.madde.value = keep;
  $('q-status').textContent = q ? (count ? `${count} madde bulundu.` : 'Eşleşen madde bulunamadı; farklı bir sözcük deneyin (ör. "hız", "park", "alkol").') : '';
  showSelection();
}

/** Seçili maddenin tutar, indirimli tutar ve puanını gösterir. */
function showSelection() {
  const m = byId(el.madde.value);
  const box = $('sel');
  if (!m) { box.hidden = true; return; }
  box.hidden = false;
  $('sel-name').textContent = m.ad;
  $('sel-amount').textContent = fmt(m.tutar);
  $('sel-discount').textContent = fmt(discounted(m.tutar, rate()));
  $('sel-points').textContent = String(m.puan);
  const notes = [];
  if (m.ek) notes.push(m.ek);
  if (m.yaklasik) notes.push('Bu tutar yaklaşıktır; resmî ceza tutanağından ya da EGM / e-Devlet kaydından teyit edin.');
  if (m.not) notes.push(m.not);
  $('sel-note').textContent = notes.join(' ');
}

/** Form alanlarını doğrular; hata varsa Türkçe, çözüm öneren mesaj gösterir. */
function readInputs(adetNeeded) {
  const max = params.sinirlar?.adet_max ?? 20;
  let qty = 1;
  if (adetNeeded) {
    qty = parseCount($('adet').value, 2);
    if (!Number.isInteger(qty) || qty < 1 || qty > max) {
      showError(el.error, `Geçerli bir adet girin: aynı ihlalin sayısı 1 ile ${max} arasında bir tam sayı olmalı. Alanı temizleyip örneğin 1 yazın.`);
      return null;
    }
  }
  const pmax = params.sinirlar?.mevcut_puan_max ?? 999;
  const rawP = $('mevcut').value.trim();
  let current = 0;
  if (rawP !== '') {
    current = parseCount(rawP, 3);
    if (!Number.isInteger(current) || current < 0 || current > pmax) {
      showError(el.error, `Mevcut ceza puanı 0 ile ${pmax} arasında bir tam sayı olmalı. Bilmiyorsanız alanı boş bırakın; e-Devlet'ten sürücü belgesi ceza puanınızı öğrenebilirsiniz.`);
      return null;
    }
  }
  const date = $('tebligat').value;
  if (date) {
    const d = addDays(date, 0);
    if (!d || d.getUTCFullYear() < 2000 || d.getUTCFullYear() > 2100) {
      showError(el.error, 'Tebliğ tarihi geçersiz görünüyor. Tarihi takvimden yeniden seçin ya da alanı boş bırakın.');
      return null;
    }
  }
  return { qty, current, date };
}

/** Eklenen cezaların toplamını ve ilgili bilgileri ekrana yazar. */
function render(opts) {
  if (!items.length) { el.result.hidden = true; el.result.classList.remove('is-active'); lastText = ''; return; }
  el.list.innerHTML = '';
  let total = 0; let points = 0; let approx = false;
  const lines = [];
  for (const it of items) {
    const m = byId(it.id);
    if (!m) continue;
    const sub = round2(m.tutar * it.qty);
    total = round2(total + sub);
    points += m.puan * it.qty;
    if (m.yaklasik) approx = true;
    const li = document.createElement('li');
    li.className = 'fi';
    li.dataset.id = m.id;
    const name = document.createElement('span');
    name.className = 'fi-name';
    name.textContent = it.qty > 1 ? `${m.ad} × ${it.qty}` : m.ad;
    const amt = document.createElement('span');
    amt.className = 'fi-amt';
    amt.textContent = fmt(sub);
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'ba-btn fi-del';
    del.textContent = 'Kaldır';
    del.setAttribute('aria-label', `${m.ad} satırını kaldır`);
    del.addEventListener('click', () => removeItem(m.id));
    li.append(name, amt, del);
    el.list.append(li);
    lines.push(`${it.qty > 1 ? `${m.ad} x ${it.qty}` : m.ad}: ${fmt(sub)}`);
  }
  const disc = discounted(total, rate());
  $('r-total').textContent = fmt(total);
  $('r-discount').textContent = fmt(disc);
  $('r-saving').textContent = fmt(round2(total - disc));
  const limit = params.puan_siniri ?? 100;
  const grand = points + opts.current;
  $('r-points').textContent = opts.current ? `${points} (toplam ${grand})` : String(points);
  const pn = [];
  if (opts.current) pn.push(`Mevcut ${opts.current} puanınızla birlikte toplam ${grand} puan olur.`);
  if (grand >= limit) pn.push(`Dikkat: toplam ceza puanı ${limit} sınırına ulaşıyor ya da aşıyor; sürücü belgesi için ağır yaptırım (geri alma ya da iptal) gündeme gelebilir. Güncel kuralı EGM duyurusundan ve Sürücü Belgesi Yönetmeliği'nden kontrol edin.`);
  else pn.push(`Ceza puanı ${limit} sınırına ulaşmaz; yine de puanlar tutardan bağımsızdır ve indirimli ödeme puanı düşürmez.`);
  $('r-points-note').textContent = pn.join(' ');
  // Tebliğ tarihinden süreler
  const ay = params.indirim?.ay ?? 1;
  const igun = params.itiraz?.gun ?? 15;
  if (opts.date) {
    const d1 = addMonths(opts.date, ay); const d2 = addDays(opts.date, igun);
    $('r-dates').textContent = `İndirimli ödeme için son gün: ${dateFmt.format(d1)}. İtiraz (sulh ceza mahkemesi) için son gün: ${dateFmt.format(d2)}. Son gün resmî tatile denk geliyorsa bir sonraki iş günü geçerli olabilir; tutanaktaki tebliğ tarihi esastır.`;
  } else {
    $('r-dates').textContent = `Tebliğ tarihini girerseniz indirimli ödeme ve itiraz için son günü gösteririm. Genel kural: tebliğden itibaren ${ay} ay içinde ödemede %${rate()} indirim, ${igun} gün içinde itiraz.`;
  }
  const notes = [];
  if (approx) notes.push('Tutarlar yaklaşıktır; resmî ceza tutanağı esastır, hukuki tavsiye değildir.');
  $('r-note').textContent = notes.join(' ');
  el.result.hidden = false; el.result.classList.add('is-active');
  lastText = `Trafik cezası toplamı (yaklaşık): ${lines.join('; ')}. Toplam ${fmt(total)}; ${ay} ay içinde ödemede indirimli ${fmt(disc)}; ceza puanı ${points}. Resmî tutanak esastır.`;
}

function removeItem(id) {
  items = items.filter((it) => it.id !== id);
  showError(el.error, '');
  render(readInputs(false) || { qty: 1, current: 0, date: '' });
}

function submit(ev) {
  ev?.preventDefault();
  showError(el.error, '');
  const m = byId(el.madde.value);
  if (!m) {
    showError(el.error, 'Bir ceza maddesi seçin. Listede bulamazsanız arama kutusunu temizleyip yeniden deneyin.');
    return;
  }
  const opts = readInputs(true);
  if (!opts) return;
  const ex = items.find((it) => it.id === m.id);
  if (ex) ex.qty += opts.qty; else items.push({ id: m.id, qty: opts.qty });
  render(opts);
}

function clearAll() {
  items = [];
  showError(el.error, '');
  $('adet').value = '1'; $('mevcut').value = ''; $('tebligat').value = ''; el.q.value = '';
  buildSelect();
  render({ qty: 1, current: 0, date: '' });
}

async function copyResult() {
  if (!lastText) return;
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}

/** Tüm maddeleri tablo olarak yazar. */
function buildTable() {
  const body = $('table-body');
  body.innerHTML = '';
  for (const m of params.maddeler) {
    const tr = document.createElement('tr');
    const cells = [m.ad + (m.yaklasik ? ' *' : ''), fmt(m.tutar), fmt(discounted(m.tutar, rate())), String(m.puan)];
    cells.forEach((c, i) => {
      const td = document.createElement('td');
      if (i > 0) td.className = 'num';
      td.textContent = c;
      tr.append(td);
    });
    body.append(tr);
  }
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar kullanılır */ }
  $('params-info').textContent = params.dogrulandi === false
    ? `Parametre dosyası ${params.guncelleme} tarihlidir; tutarlar ve puanlar teyit bekleyen yaklaşık değerlerdir. Resmî tutarı EGM, e-Devlet ya da ceza tutanağından doğrulayın.`
    : `Parametreler ${params.guncelleme} tarihinde güncellendi. Kaynak: ${params.kaynak || 'Karayolları Trafik Kanunu'}`;

  buildSelect();
  buildTable();
  el.q.addEventListener('input', buildSelect);
  el.madde.addEventListener('change', showSelection);
  $('form').addEventListener('submit', submit);
  $('clear').addEventListener('click', clearAll);
  $('copy').addEventListener('click', copyResult);
}
init();
