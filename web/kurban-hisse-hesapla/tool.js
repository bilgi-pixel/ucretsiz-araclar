// Kurban Hisse ve Et Paylaşımı Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Para tutarları kuruş (tam sayı) olarak hesaplanır; kuruş farkı "en büyük kalan" yöntemiyle dağıtılır.
// Araç dinî hüküm vermez; yalnızca aritmetik yapar. Et miktarı tahmindir (parametreler.json: "yaklasik": true).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// parametreler.json yüklenemezse kullanılacak yedek değerler (dosyayla aynı).
const FALLBACK = {
  guncelleme: '2026-11-04',
  yaklasik: true,
  hayvanlar: {
    buyukbas: { ad: 'Büyükbaş (sığır, manda, deve)', maksHisse: 7, randimanYuzde: 50, ornekCanliKg: 400 },
    kucukbas: { ad: 'Küçükbaş (koyun, keçi)', maksHisse: 1, randimanYuzde: 45, ornekCanliKg: 50 },
  },
  sinirlar: { randimanMin: 20, randimanMax: 80, canliKgMaksBuyukbas: 2500, canliKgMaksKucukbas: 300, fiyatMaks: 100000000 },
};
let P = FALLBACK;

const nfTL = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const nfKg = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
const tl = (cents) => `${nfTL.format(cents / 100)} ₺`;
const kg = (v) => `${nfKg.format(v)} kg`;

/* ---------- Sayı okuma ---------- */

/** "70.000", "70000", "70.000,50", "70000.5", "₺ 1.250,75" → sayı; boş → null; geçersiz → NaN. */
export function parseNumberTR(raw) {
  let s = String(raw ?? '').replace(/[₺\s]|TL/gi, '');
  if (s === '') return null;
  if (!/^[\d.,]+$/.test(s)) return NaN;
  const dot = s.includes('.'), comma = s.includes(',');
  if (dot && comma) s = s.replace(/\./g, '').replace(',', '.'); // 1.234,56
  else if (comma) s = s.replace(',', '.'); // 12,5
  else if (dot && /^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, ''); // 70.000 → binlik ayraç
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

/* ---------- Hesap ---------- */

/** total (kuruş) tutarını ağırlıklara göre dağıtır; toplam her zaman total'e eşit kalır. */
export function allocate(total, weights) {
  const W = weights.reduce((a, b) => a + b, 0);
  const base = weights.map((w) => Math.floor((total * w) / W));
  const rem = weights.map((w, i) => ({ i, r: (total * w) % W }));
  let left = total - base.reduce((a, b) => a + b, 0);
  rem.sort((a, b) => b.r - a.r || a.i - b.i);
  for (let k = 0; left > 0 && k < rem.length; k++, left--) base[rem[k].i] += 1;
  return base;
}

/**
 * Girdiyi doğrular ve hesaplar. Hatada Türkçe, çözüm öneren Error fırlatır.
 * @param {{animal:string, price:any, shares:any, fee:any, other:any, weight:any, randiman:any, mode:string, people:Array}} inp
 */
export function computeKurban(inp, params = P) {
  const A = params.hayvanlar[inp.animal];
  const L = params.sinirlar;
  if (!A) throw new Error('Hayvan türünü listeden seçin (büyükbaş ya da küçükbaş).');

  const price = parseNumberTR(inp.price);
  if (price === null || Number.isNaN(price)) throw new Error('Hayvanın toplam fiyatını ₺ olarak yazın (örn. 70.000 ya da 70000).');
  if (price <= 0) throw new Error("Fiyat 0'dan büyük olmalı. Hayvanın toplam alış bedelini yazın (örn. 70.000).");
  if (price > L.fiyatMaks) throw new Error('Girilen fiyat gerçekçi görünmüyor. Tutarı ₺ olarak ve nokta, virgül yerlerini kontrol ederek yeniden yazın.');

  const sharesRaw = String(inp.shares ?? '').trim();
  const shares = Number(sharesRaw);
  if (!sharesRaw || !Number.isInteger(shares) || shares < 1) {
    throw new Error(`Hisse sayısı 1 ile ${A.maksHisse} arasında bir tam sayı olmalı. Örnek: ${A.maksHisse}.`);
  }
  if (shares > A.maksHisse) {
    throw new Error(inp.animal === 'buyukbas'
      ? `Büyükbaş hayvanda en fazla ${A.maksHisse} hisse olabilir; ${shares} hisse için ikinci bir hayvan gerekir. Hisse sayısını ${A.maksHisse} ya da altına düşürün.`
      : 'Küçükbaş hayvan tek kişi adınadır; hisse sayısı 1 olmalı.');
  }

  const money = (raw, label) => {
    const v = parseNumberTR(raw);
    if (v === null) return 0;
    if (Number.isNaN(v) || v < 0 || v > L.fiyatMaks) throw new Error(`${label} 0 ya da pozitif bir tutar olmalı (örn. 7.000). Ücret yoksa kutuyu boş bırakın.`);
    return v;
  };
  const fee = money(inp.fee, 'Kesim ve yüzme ücreti');
  const other = money(inp.other, 'Diğer giderler');

  let weight = null;
  const w = parseNumberTR(inp.weight);
  if (w !== null) {
    const max = inp.animal === 'buyukbas' ? L.canliKgMaksBuyukbas : L.canliKgMaksKucukbas;
    if (Number.isNaN(w) || w <= 0) throw new Error('Canlı ağırlığı kilogram olarak yazın (örn. 400). Bilmiyorsanız kutuyu boş bırakın; et tahmini yapılmaz.');
    if (w > max) throw new Error(`Canlı ağırlık gerçekçi görünmüyor (en çok ${nfTL.format(max)} kg). Değeri kilogram olarak kontrol edip yeniden yazın.`);
    weight = w;
  }

  let pct = null;
  if (weight !== null) {
    const pr = String(inp.randiman ?? '').trim() === '' ? A.randimanYuzde : parseNumberTR(inp.randiman);
    if (Number.isNaN(pr) || pr < L.randimanMin || pr > L.randimanMax) {
      throw new Error(`Karkas randımanı %${L.randimanMin} ile %${L.randimanMax} arasında olmalı (örn. ${A.randimanYuzde}). Varsayılan değeri yazıp tekrar deneyin.`);
    }
    pct = pr;
  }

  // Hissedar listesi
  let people;
  if (inp.mode === 'custom') {
    if (!inp.people || !inp.people.length) throw new Error('İstek bazlı paylaşım için en az bir hissedar ekleyin ve hisse adedini yazın.');
    people = inp.people.map((p, i) => {
      const n = Number(String(p.adet ?? '').trim());
      if (!Number.isInteger(n) || n < 1) throw new Error(`${i + 1}. hissedarın hisse adedi 1 ya da daha büyük bir tam sayı olmalı. Örnek: 2.`);
      return { name: (p.name || '').trim() || `Hissedar ${i + 1}`, adet: n };
    });
    const sum = people.reduce((a, p) => a + p.adet, 0);
    if (sum !== shares) throw new Error(`Hissedarların hisse adetleri toplamı ${sum}; toplam hisse sayısı ${shares} olmalı. Adetleri düzeltin ya da hisse sayısını değiştirin.`);
  } else {
    people = Array.from({ length: shares }, (_, i) => ({ name: `Hissedar ${i + 1}`, adet: 1 }));
  }

  const priceC = Math.round(price * 100), feeC = Math.round(fee * 100), otherC = Math.round(other * 100);
  const weights = people.map((p) => p.adet);
  const priceParts = allocate(priceC, weights);
  const costParts = allocate(feeC + otherC, weights);
  const meatTotal = weight !== null ? (weight * pct) / 100 : null;
  const rows = people.map((p, i) => ({
    name: p.name, adet: p.adet,
    priceC: priceParts[i], costC: costParts[i], totalC: priceParts[i] + costParts[i],
    meat: meatTotal !== null ? (meatTotal * p.adet) / shares : null,
  }));
  const totalC = priceC + feeC + otherC;
  return {
    A, shares, mode: inp.mode, rows, totalC, priceC, feeC, otherC, weight, pct,
    // Bir hisse için (kuruşa yuvarlanmış)
    per: {
      price: Math.round(priceC / shares), fee: Math.round(feeC / shares), other: Math.round(otherC / shares),
      total: Math.round(totalC / shares),
    },
    meat: meatTotal !== null ? { total: meatTotal, perShare: meatTotal / shares, perKgC: totalC / meatTotal } : null,
  };
}

/* ---------- Arayüz ---------- */

function formInput() {
  return {
    animal: $('animal').value, price: $('price').value, shares: $('shares').value,
    fee: $('fee').value, other: $('other').value, weight: $('weight').value, randiman: $('randiman').value,
    mode: $('mode-custom').checked ? 'custom' : 'equal',
    people: Array.from($('people').children).map((li) => ({ name: li.querySelector('.kh-name').value, adet: li.querySelector('.kh-adet').value })),
  };
}

function personEl(name = '', adet = '1') {
  const li = document.createElement('li');
  li.className = 'kh-person';
  li.innerHTML = '<label>Ad (isteğe bağlı)<input class="kh-name" type="text" autocomplete="off" maxlength="40"></label><label>Hisse adedi<input class="kh-adet" type="text" inputmode="numeric" autocomplete="off"></label><button class="ba-icon-btn" type="button" data-act="rm">✕</button>';
  li.querySelector('.kh-name').value = name;
  li.querySelector('.kh-adet').value = adet;
  return li;
}

function renumberPeople() {
  Array.from($('people').children).forEach((li, i) => {
    li.querySelector('.kh-name').placeholder = `Hissedar ${i + 1}`;
    li.querySelector('.kh-name').setAttribute('aria-label', `${i + 1}. hissedar adı`);
    li.querySelector('.kh-adet').setAttribute('aria-label', `${i + 1}. hissedar hisse adedi`);
    li.querySelector('[data-act="rm"]').setAttribute('aria-label', `${i + 1}. hissedarı kaldır`);
  });
  updatePeopleTotal();
}

function updatePeopleTotal() {
  const sum = Array.from($('people').children).reduce((a, li) => a + (Number(li.querySelector('.kh-adet').value) || 0), 0);
  const want = Number($('shares').value) || 0;
  const el = $('people-total');
  el.textContent = `Toplam: ${sum} / ${want} hisse`;
  el.classList.toggle('is-ok', sum === want && want > 0);
  el.classList.toggle('is-bad', sum !== want);
}

function seedPeople() {
  const list = $('people');
  if (list.children.length) return;
  const n = Math.max(1, Number($('shares').value) || 1);
  const a = Math.ceil(n / 2), b = n - a;
  list.appendChild(personEl('', String(a)));
  if (b > 0) list.appendChild(personEl('', String(b)));
  renumberPeople();
}

function applyAnimal(initial = false) {
  const key = $('animal').value;
  const A = P.hayvanlar[key];
  const small = key === 'kucukbas';
  $('shares').disabled = small;
  if (small) $('shares').value = '1';
  else if (!initial || Number($('shares').value) > A.maksHisse) $('shares').value = String(A.maksHisse);
  $('shares-hint').textContent = small ? 'Küçükbaş hayvan tek kişi adınadır; hisse sayısı 1\'de kilitlidir.' : `Büyükbaşta 1 ile ${A.maksHisse} arasında bir sayı yazın.`;
  $('randiman').value = String(A.randimanYuzde);
  $('randiman-hint').textContent = `${small ? 'Küçükbaşta' : 'Büyükbaşta'} yaklaşık %${A.randimanYuzde} alınır; hayvanınıza göre değiştirebilirsiniz.`;
  $('weight').placeholder = `örn. ${A.ornekCanliKg}`;
  // Küçükbaşta hisse paylaşımı olmaz: istek bazlı seçeneği kapatılır.
  $('mode-custom').disabled = small;
  if (small && $('mode-custom').checked) { $('mode-equal').checked = true; syncMode(); }
}

function syncMode() {
  const custom = $('mode-custom').checked;
  $('custom-box').hidden = !custom;
  if (custom) seedPeople();
}

function clearResult() {
  $('result').hidden = true;
  $('result').classList.remove('is-active');
  $('copy-status').textContent = '';
}

let last = null;

function render(r) {
  $('r-share-price').textContent = tl(r.per.price);
  $('r-fee-share').textContent = tl(r.per.fee);
  $('r-other-share').textContent = tl(r.per.other);
  $('r-share-total').textContent = tl(r.per.total);
  $('r-total').textContent = tl(r.totalC);
  const hasMeat = !!r.meat;
  ['meat-row-a', 'meat-row-b', 'meat-row-c'].forEach((id) => { $(id).hidden = !hasMeat; });
  $('th-meat').hidden = !hasMeat;
  if (hasMeat) {
    $('r-meat').textContent = kg(r.meat.total);
    $('r-meat-share').textContent = kg(r.meat.perShare);
    $('r-per-kg').textContent = `${nfTL.format(r.meat.perKgC / 100)} ₺`;
  }
  $('table-title').textContent = r.mode === 'custom' ? 'Paylaşım tablosu (istek bazlı)' : 'Paylaşım tablosu (eşit)';
  const tbody = $('tbl').querySelector('tbody');
  tbody.textContent = '';
  for (const row of r.rows) {
    const tr = document.createElement('tr');
    const cells = [row.name, String(row.adet), tl(row.priceC), tl(row.costC), tl(row.totalC)];
    if (hasMeat) cells.push(kg(row.meat));
    cells.forEach((text, i) => {
      const td = document.createElement('td');
      if (i > 0) td.className = 'n';
      td.textContent = text;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  const tfoot = $('tbl').querySelector('tfoot');
  tfoot.textContent = '';
  const ft = document.createElement('tr');
  const sums = ['Toplam', String(r.shares), tl(r.priceC), tl(r.feeC + r.otherC), tl(r.totalC)];
  if (hasMeat) sums.push(kg(r.meat.total));
  sums.forEach((text, i) => {
    const td = document.createElement('td');
    if (i > 0) td.className = 'n';
    td.textContent = text;
    ft.appendChild(td);
  });
  tfoot.appendChild(ft);

  const notes = [];
  if (r.priceC % r.shares !== 0 || (r.feeC + r.otherC) % r.shares !== 0) {
    if (r.mode === 'equal') notes.push('Tam bölünmeyen kuruşlar en büyük kalan yöntemiyle birer kuruş olarak ilk hissedarlara eklendi; tablodaki toplam girdiğiniz tutara eşittir.');
  }
  notes.push(hasMeat
    ? `Et miktarı canlı ağırlık × %${nfTL.format(r.pct)} randıman ile hesaplanan yaklaşık, kemikli karkas ağırlığıdır; kemiksiz et bunun altında kalır.`
    : 'Canlı ağırlık girmediğiniz için et tahmini yapılmadı.');
  $('r-note').textContent = notes.join(' ');
  $('result').hidden = false;
  $('result').classList.add('is-active');
}

function summaryText(r) {
  const lines = [
    'Kurban hisse hesabı (tahmini) – Bilişim Ajans',
    `Hayvan: ${r.A.ad} · Toplam fiyat: ${tl(r.priceC)} · Hisse sayısı: ${r.shares}`,
    `Hisse bedeli: ${tl(r.per.price)} · Kesim ve yüzme payı: ${tl(r.per.fee)} · Diğer gider payı: ${tl(r.per.other)}`,
    `Hisse başına toplam ödeme: ${tl(r.per.total)} · Toplam maliyet: ${tl(r.totalC)}`,
  ];
  if (r.meat) lines.push(`Tahmini et: ${kg(r.meat.total)} (yaklaşık) · Hisse başı: ${kg(r.meat.perShare)} (yaklaşık)`);
  lines.push('', 'Paylaşım:');
  for (const row of r.rows) lines.push(`${row.name} | ${row.adet} hisse | bedel ${tl(row.priceC)} | gider ${tl(row.costC)} | toplam ${tl(row.totalC)}${row.meat !== null ? ` | et ≈ ${kg(row.meat)}` : ''}`);
  lines.push('', 'Not: Değerler yaklaşıktır ve dinî hüküm içermez; hisse şartları için Diyanet İşleri Başkanlığı\'na başvurun.');
  return lines.join('\n');
}

function run() {
  showError($('error'), '');
  try {
    last = computeKurban(formInput());
    render(last);
  } catch (e) {
    last = null;
    clearResult();
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('animal').addEventListener('change', () => { applyAnimal(false); clearResult(); showError($('error'), ''); });
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
$('shares').addEventListener('input', updatePeopleTotal);
$('add-person').addEventListener('click', () => {
  const li = personEl('', '1');
  $('people').appendChild(li);
  renumberPeople();
  li.querySelector('.kh-name').focus();
});
$('people').addEventListener('input', (e) => { if (e.target.classList.contains('kh-adet')) updatePeopleTotal(); });
$('people').addEventListener('click', (e) => {
  const b = e.target.closest('[data-act="rm"]');
  if (!b) return;
  b.closest('li').remove();
  renumberPeople();
});
$('clear').addEventListener('click', () => {
  ['price', 'fee', 'other', 'weight'].forEach((id) => { $(id).value = ''; });
  $('people').textContent = '';
  $('mode-equal').checked = true;
  $('animal').value = 'buyukbas';
  applyAnimal(false);
  syncMode();
  clearResult();
  last = null;
  showError($('error'), '');
  $('price').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => {
  if (!last) return;
  $('print-date').textContent = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('print-inputs').textContent = `${last.A.ad} · toplam ${tl(last.priceC)} · ${last.shares} hisse`;
  window.print();
});

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (!res.ok) throw new Error('http');
    P = await res.json();
  } catch {
    P = FALLBACK; // dosya okunamazsa yerleşik değerlerle çalış
  }
  const d = new Date(`${P.guncelleme}T00:00:00`);
  $('params-date').textContent = Number.isNaN(d.getTime()) ? P.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  applyAnimal(true);
  syncMode();
  document.documentElement.dataset.ready = '1';
}
init();
