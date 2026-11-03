// Bağ-Kur (4/b) Primi Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Bilgilendirme amaçlıdır; mali/hukuki tavsiye değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// parametreler.json yüklenemezse kullanılacak varsayılanlar.
let params = {
  guncelleme: '2026-11-04',
  asgari_brut: 33030, ust_katsayi: 7.5, oran_yuzde: 34.5, indirim_puan: 5, gun_aylik: 30,
  emeklilik_prim_gun: { genel: 9000 },
  statuler: [{ id: 'esnaf', ad: 'Esnaf / sanatkâr (4/b)' }],
};

/** Türkçe ya da düz sayı metnini sayıya çevirir; geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/** Aylık prim: PEK × oran. */
export function calcPremium(pek, ratePct) { return round2(pek * ratePct / 100); }

const el = { error: $('error'), result: $('result') };
let lastText = '';

function limits() {
  const min = params.asgari_brut;
  return { min, max: round2(min * params.ust_katsayi) };
}

function calculate(ev) {
  ev?.preventDefault();
  showError(el.error, '');
  const { min, max } = limits();
  const raw = $('pek').value.trim();
  let pek = raw === '' ? min : parseNum(raw);
  const days = $('days').value.trim() === '' ? 30 : Number($('days').value.trim());
  const bad = (m) => { el.result.hidden = true; showError(el.error, m); };
  if (!Number.isFinite(pek) || pek <= 0) return bad('Kazanç geçerli bir sayı değil. Yalnızca rakam yazın (örnek: 45.000) ya da alanı boş bırakıp alt sınırı kullanın.');
  if (pek < min) return bad(`Prime esas kazanç alt sınırın (${fmt(min)}) altında olamaz. ${fmt(min)} ya da daha yüksek bir tutar girin; alanı boş bırakırsanız alt sınır kullanılır.`);
  if (!Number.isInteger(days) || days < 1 || days > params.gun_aylik) return bad(`Gün sayısı 1 ile ${params.gun_aylik} arasında bir tam sayı olmalı. Alanı düzeltip yeniden deneyin.`);
  let note = '';
  if (pek > max) { pek = max; note = `Girilen kazanç üst sınırı aştığı için üst sınır (${fmt(max)}) uygulandı. `; }
  const discount = $('discount').checked;
  const fullRate = params.oran_yuzde;
  const rate = discount ? round2(fullRate - params.indirim_puan) : fullRate;
  const monthly = calcPremium(pek, rate);
  const monthlyFull = calcPremium(pek, fullRate);
  const status = params.statuler.find((s) => s.id === $('status').value) || params.statuler[0];
  const daily = round2(monthly / params.gun_aylik);
  const daysCost = round2(monthly * days / params.gun_aylik);
  $('r-status').textContent = status.ad;
  $('r-pek').textContent = fmt(pek);
  $('r-rate').textContent = `%${String(rate).replace('.', ',')}${discount ? ' (indirimli)' : ''}`;
  $('r-monthly').textContent = fmt(monthly);
  $('r-yearly').textContent = fmt(round2(monthly * 12));
  $('r-daily').textContent = fmt(daily);
  $('r-days-label').textContent = `${days} gün için prim`;
  $('r-days-cost').textContent = fmt(daysCost);
  $('r-saving').textContent = discount ? fmt(round2(monthlyFull - monthly)) : 'İndirim seçilmedi';
  $('r-note').textContent = note + 'Oran bileşenleri: ' + (params.bilesenler || []).map((b) => `${b.ad} %${String(b.yuzde).replace('.', ',')}`).join(', ') + '.';
  $('r-retire').textContent = `Emeklilik için genel olarak ${new Intl.NumberFormat('tr-TR').format(params.emeklilik_prim_gun?.genel ?? 9000)} gün sıkça anılır; bu bilgi yaklaşıktır ve kişiye özeldir. SGK'ya danışın.`;
  el.result.hidden = false;
  lastText = `${status.ad}: PEK ${fmt(pek)}, oran %${rate}, aylık prim ${fmt(monthly)}, yıllık ${fmt(round2(monthly * 12))}`;
}

async function copyResult() {
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar kullanılır */ }
  for (const s of params.statuler) $('status').append(new Option(s.ad, s.id));
  const { min, max } = limits();
  $('pek-hint').textContent = `Alt sınır ${fmt(min)}, üst sınır ${fmt(max)}. Boş bırakırsanız alt sınır kullanılır.`;
  $('params-info').textContent = `Parametreler ${params.guncelleme} tarihinde güncellendi. Kaynak: ${params.kaynak}`;
  $('form').addEventListener('submit', calculate);
  $('copy').addEventListener('click', copyResult);
}
init();
