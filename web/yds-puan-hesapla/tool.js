// YDS / e-YDS / YÖKDİL puan hesaplama — tamamı tarayıcıda çalışır; girdiğiniz sayılar hiçbir sunucuya gitmez.
// Kural (ÖSYM kılavuzları): 80 soru, yalnız doğrular sayılır, 100 üzerinden puan → her doğru 1,25 puan.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt4 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 4 });
const fmtT = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 3 }); // hedef puan (en çok 3 ondalık)

/* parametreler.json okunamazsa (ör. çevrimdışı ilk açılış) kullanılan varsayılanlar; kaynaklar JSON dosyasındadır. */
const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: 'ÖSYM YDS, e-YDS, YÖKDİL ve e-YÖKDİL kılavuzları; Lisansüstü Eğitim ve Öğretim Yönetmeliği; Doçentlik Yönetmeliği; 375 sayılı KHK md. 2.',
  yaklasik: false,
  soru_sayisi: 80,
  tam_puan: 100,
  seviyeler: [
    { harf: 'A', min: 90 }, { harf: 'B', min: 80 }, { harf: 'C', min: 70 }, { harf: 'D', min: 60 }, { harf: 'E', min: 50 },
  ],
  sinavlar: {
    yds: { ad: 'YDS (kâğıt)', aile: 'yds' },
    eyds: { ad: 'e-YDS (elektronik)', aile: 'yds' },
    'yokdil-fen': { ad: 'YÖKDİL – Fen Bilimleri', aile: 'yokdil' },
    'yokdil-saglik': { ad: 'YÖKDİL – Sağlık Bilimleri', aile: 'yokdil' },
    'yokdil-sosyal': { ad: 'YÖKDİL – Sosyal Bilimler', aile: 'yokdil' },
    eyokdil: { ad: 'e-YÖKDİL (elektronik)', aile: 'yokdil' },
  },
  esikler: [
    { id: 'doktora', baslik: 'Doktora, sanatta yeterlik ve temel tıp doktora başvurusu', min: 55, aileler: ['yds', 'yokdil'],
      not: 'Yönetmelikteki asgari puandır; üniversite senatosu programa göre yükseltebilir.',
      kaynak: 'Lisansüstü Eğitim ve Öğretim Yönetmeliği md. 16/5, 16/6 ve 25/3',
      url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=21510&MevzuatTur=7&MevzuatTertip=5', yaklasik: false },
    { id: 'docentlik', baslik: 'Doçentlik başvurusu', min: 55, aileler: ['yds', 'yokdil'],
      not: 'Bilim alanı bir yabancı dille ilgiliyse sınav başka bir dilden verilmelidir.',
      not_yokdil: 'YÖKDİL sonucu doçentlik başvurusunda süresiz geçerlidir.',
      kaynak: 'Doçentlik Yönetmeliği md. 4/2-b; YÖKDİL Kılavuzu md. 1.7',
      url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=24519&MevzuatTur=7&MevzuatTertip=5', yaklasik: false },
    { id: 'yuksek_lisans', baslik: 'Tezli yüksek lisans başvurusu', min: null, aileler: ['yds', 'yokdil'],
      bilgi: 'Yönetmelikte ulusal bir asgari yabancı dil puanı yoktur; puanı üniversite senatosu belirler. İlandaki puan için "Hedef puan" modunu kullanın.',
      kaynak: 'Lisansüstü Eğitim ve Öğretim Yönetmeliği md. 5',
      url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=21510&MevzuatTur=7&MevzuatTertip=5', yaklasik: false },
    { id: 'tus', baslik: 'TUS, DUS ve EUS yerleştirmesinde yabancı dil şartı', min: 50, aileler: ['yds', 'yokdil'],
      not: 'Sonuç 5 yıl geçerlidir. TUS ve DUS için İngilizce, Fransızca veya Almanca; EUS için İngilizce.',
      not_yokdil: 'Kılavuz YDS\'nin yanında "YÖK tarafından yapılan ya da yaptırılan sınav"ı da sayar; YÖKDİL kabulünü ilgili dönem kılavuzundan teyit edin.',
      kaynak: 'ÖSYM 2026-YDS/2 Kılavuzu md. 1.5; 2026-TUS 1. Dönem Kılavuzu md. 1.4',
      url: 'https://dokuman.osym.gov.tr/pdfdokuman/2026/TUSDONEM-1/kilavuz_tsd1d28012026.pdf', yaklasik: false },
    { id: 'tazminat', baslik: 'Yabancı dil tazminatı (kamu personeli)', min: 70, aileler: ['yds'],
      not: '(A), (B) veya (C) düzeyinde ödenir; D ve E düzeyinde ödenmez. Sonuç 5 yıl geçerlidir; süre dolunca seviye bir alt düzeye inmiş sayılır.',
      uygulanmaz: 'YÖKDİL ile yabancı dil tazminatı alınamaz; tazminat için YDS veya e-YDS gerekir.',
      kaynak: '375 sayılı KHK md. 2; ÖSYM 2026-YDS/2 Kılavuzu md. 1.1, 1.16 ve 3.8',
      url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=375&MevzuatTur=4&MevzuatTertip=5', yaklasik: false },
  ],
};

let P = DEFAULTS;

/* ---------- Saf hesap fonksiyonları ---------- */

/** Türkçe ondalık (virgül) ve binlik (nokta) biçimlerini sayıya çevirir; geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  const neg = t.startsWith('-');
  if (neg) t = t.slice(1);
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  const hasC = t.includes(','), hasD = t.includes('.');
  if (hasC && hasD) t = t.replace(/\./g, '').replace(',', '.');
  else if (hasC) t = t.replace(',', '.');
  else if (hasD && /^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if ((t.match(/\./g) || []).length > 1) return NaN;
  const n = Number(t);
  return neg ? -n : n;
}

/** Puan = doğru × 100 ÷ geçerli soru sayısı (iptal yoksa 80 → her doğru 1,25). */
export function scoreFromCorrect(correct, valid) {
  return (correct * 100) / valid;
}

/** Hedef puan için gereken en az doğru = ⌈hedef × geçerli soru ÷ 100⌉ (binde birlik tam sayı aritmetiğiyle, kayan nokta hatası olmadan).
 *  Hedef en çok 3 ondalık basamaklı olmalıdır; daha fazlası runTarget'ta reddedilir (aksi hâlde yuvarlama gereğinden az doğru verirdi). */
export function requiredCorrect(target, valid) {
  const thousandths = Math.round(target * 1000);
  const num = thousandths * valid; // tam sayı
  return Math.ceil(num / 100000);
}

/** Sayının en çok 3 ondalık basamağı var mı (72,5 ve 72,500 geçerli; 55,0001 geçersiz)? */
function hasAtMost3Decimals(n) {
  return Math.abs(n * 1000 - Math.round(n * 1000)) < 1e-6;
}

/** Doğru sayısına göre seviye harfi (yoksa null). Karşılaştırma tam sayı doğru üzerinden yapılır. */
export function levelOf(correct, valid, levels = P.seviyeler) {
  const sorted = [...levels].sort((a, b) => b.min - a.min);
  for (const l of sorted) if (correct >= requiredCorrect(l.min, valid)) return l.harf;
  return null;
}

/** Bir sonraki seviye için gereken bilgi; en üst seviyedeyse null. */
export function nextLevel(correct, valid, levels = P.seviyeler) {
  const asc = [...levels].sort((a, b) => a.min - b.min);
  for (const l of asc) {
    const need = requiredCorrect(l.min, valid);
    if (need > correct) return { harf: l.harf, min: l.min, need, remaining: need - correct };
  }
  return null;
}

/** Eşik kontrol listesi: her eşik için durum (ok | no | info | na) ve açıklama. */
export function evaluateThresholds(correct, valid, family, list = P.esikler) {
  return list.map((t) => {
    const base = { id: t.id, baslik: t.baslik, kaynak: t.kaynak, url: t.url, yaklasik: !!t.yaklasik };
    if (!Array.isArray(t.aileler) || !t.aileler.includes(family)) {
      return { ...base, status: 'na', label: 'Bu sınavla olmaz', text: t.uygulanmaz || '' };
    }
    if (t.min == null) return { ...base, status: 'info', label: 'Bilgi', text: t.bilgi || '' };
    const need = requiredCorrect(t.min, valid);
    const extra = family === 'yokdil' && t.not_yokdil ? ' ' + t.not_yokdil : '';
    const note = (t.not ? ' ' + t.not : '') + extra;
    if (correct >= need) {
      return { ...base, status: 'ok', label: 'Sağlıyor', text: `En az ${t.min} puan (${need} doğru) gerekir.${note}` };
    }
    return { ...base, status: 'no', label: 'Sağlamıyor', text: `En az ${t.min} puan gerekir: ${need - correct} doğru daha (toplam ${need} doğru) yapmalısınız.${note}` };
  });
}

/* ---------- Parametreler ---------- */

function validParams(p) {
  return p && Number.isInteger(p.soru_sayisi) && p.soru_sayisi > 0 && Array.isArray(p.seviyeler) && Array.isArray(p.esikler)
    && p.sinavlar && typeof p.sinavlar === 'object';
}

async function loadParams() {
  let p = DEFAULTS;
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) {
      const merged = { ...DEFAULTS, ...(await res.json()) };
      if (validParams(merged)) p = merged;
    }
  } catch (e) { /* çevrimdışı önbellekte olmayabilir ya da dosya bozuk; varsayılanlar kullanılır */ }
  const line = $('params-line');
  if (line) {
    const d = new Date(p.guncelleme);
    const txt = Number.isNaN(d.getTime()) ? String(p.guncelleme) : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    line.textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + p.kaynak;
  }
  // Doğrulanamayan değer varsa görünür uyarı
  const approx = p.yaklasik || (p.esikler || []).some((t) => t.yaklasik);
  if (approx && $('uyari')) $('uyari').hidden = false;
  return p;
}

/* ---------- Arayüz ---------- */

const el = {
  form: $('form'), exam: $('exam'), correct: $('correct'), wrong: $('wrong'), blank: $('blank'),
  target: $('target'), hasCancel: $('has-cancel'), cancel: $('cancel'),
  grpScore: $('grp-score'), grpTarget: $('grp-target'), grpCancel: $('grp-cancel'),
  error: $('error'), result: $('result'), resScore: $('res-score'), resTarget: $('res-target'),
  checks: $('r-checks'), note: $('r-note'), share: $('share-url'), status: $('copy-status'),
};

let last = null; // son başarılı hesap (paylaşım ve kopyalama için)

function showResult() { el.result.hidden = false; el.result.classList.add('is-active'); }
function hideResult() { el.result.hidden = true; el.result.classList.remove('is-active'); }
function fail(msg) { hideResult(); last = null; showError(el.error, msg); }

function currentMode() {
  const r = document.querySelector('input[name="mode"]:checked');
  return r && r.value === 'hedef' ? 'hedef' : 'puan';
}
function setMode(mode) {
  document.querySelectorAll('input[name="mode"]').forEach((r) => { r.checked = r.value === mode; });
  applyMode();
}
function applyMode() {
  const mode = currentMode();
  el.grpScore.hidden = mode !== 'puan';
  el.grpTarget.hidden = mode !== 'hedef';
}
function applyCancel() { el.grpCancel.hidden = !el.hasCancel.checked; }

function examInfo() {
  const code = el.exam.value;
  const info = (P.sinavlar && P.sinavlar[code]) || DEFAULTS.sinavlar[code] || DEFAULTS.sinavlar.yds;
  return { code, ...info };
}

/** Soru sayısı alanını okur: boşsa (isteğe bağlıysa) 0; negatif, küsuratlı veya 80'den büyükse hata. */
function readCount(input, label, required) {
  const raw = input.value.trim();
  const max = P.soru_sayisi;
  if (raw === '') {
    if (required) return { error: `${label} sayınızı girin. Yanlış ve boş alanları isteğe bağlıdır; puanı yalnızca doğru sayısı belirler.` };
    return { value: 0, empty: true };
  }
  const n = parseNum(raw);
  if (Number.isNaN(n)) return { error: `${label} sayısı okunamadı. Yalnızca rakam kullanın (ör. 60).` };
  if (n < 0) return { error: `${label} sayısı negatif olamaz. 0 ile ${max} arasında bir tam sayı girin.` };
  if (!Number.isInteger(n)) return { error: `${label} sayısı tam sayı olmalıdır; soru sayıları küsuratlı olmaz. Örneğin 60 yazın.` };
  if (n > max) return { error: `${label} sayısı ${max}'den büyük olamaz; sınavda ${max} soru vardır.` };
  return { value: n };
}

function readCancel() {
  if (!el.hasCancel.checked) return { value: 0 };
  const raw = el.cancel.value.trim();
  if (raw === '') return { value: 0 };
  const n = parseNum(raw);
  const maxCancel = P.soru_sayisi - 1;
  if (Number.isNaN(n) || n < 0 || !Number.isInteger(n) || n > maxCancel) {
    return { error: `İptal edilen soru sayısı 0 ile ${maxCancel} arasında bir tam sayı olmalıdır. ÖSYM'nin iptal duyurusundaki soru sayısını girin.` };
  }
  return { value: n };
}

function levelText(letter, family) {
  if (!letter) return 'Seviye yok (50 altı)';
  return family === 'yokdil' ? `${letter} (YDS bandına göre)` : letter;
}
function headlineLevel(letter, family) {
  if (!letter) return 'seviye yok';
  return family === 'yokdil' ? `${letter} seviyesi (YDS bandına göre)` : `${letter} seviyesi`;
}

function renderChecks(list) {
  el.checks.textContent = '';
  for (const c of list) {
    const li = document.createElement('li');
    li.dataset.id = c.id;
    li.dataset.status = c.status;
    const head = document.createElement('div');
    const st = document.createElement('span');
    st.className = 'st st-' + c.status;
    st.textContent = c.label;
    const t = document.createElement('span');
    t.className = 't';
    t.textContent = c.baslik;
    head.append(st, t);
    const p = document.createElement('p');
    p.textContent = c.text;
    const src = document.createElement('p');
    src.className = 'src';
    src.append('Kaynak: ');
    if (c.url) {
      const a = document.createElement('a');
      a.href = c.url;
      a.rel = 'noopener noreferrer';
      a.target = '_blank';
      a.textContent = c.kaynak;
      src.append(a);
    } else src.append(c.kaynak || '');
    if (c.yaklasik) src.append(' (doğrulanamadı; yaklaşık)');
    li.append(head, p, src);
    el.checks.append(li);
  }
}

function notes(family, k, valid) {
  const out = [];
  if (k > 0) out.push(`İptal edilen ${k} soru değerlendirme dışı bırakıldı; her doğru 100 ÷ ${valid} ≈ ${fmt4.format(100 / valid)} puan sayıldı (ÖSYM kılavuzu, Değerlendirme maddesi).`);
  if (family === 'yokdil') out.push('YÖKDİL kılavuzunda A–E seviyesi tanımlanmaz; gösterilen harf yalnızca YDS seviye bandına göre karşılaştırma içindir.');
  out.push('Resmî puanınız ÖSYM sonuç belgesinde yazandır.');
  return out.join(' ');
}

function runScore(exam, k, valid) {
  const d = readCount(el.correct, 'Doğru', true);
  if (d.error) return fail(d.error);
  const y = readCount(el.wrong, 'Yanlış', false);
  if (y.error) return fail(y.error);
  const b = readCount(el.blank, 'Boş', false);
  if (b.error) return fail(b.error);
  const total = P.soru_sayisi;
  if (d.value > valid) {
    return fail(`İptal edilen ${k} soru düşüldüğünde en fazla ${valid} doğru olabilir. Doğru sayınızı kontrol edin; iptal edilen soruları doğru sayınıza katmayın.`);
  }
  const sum = d.value + y.value + b.value + k;
  if (sum > total) {
    return fail(k > 0
      ? `Doğru + yanlış + boş + iptal toplamı ${total}'i aşamaz (şu an ${sum}). İptal edilen soruları doğru, yanlış veya boş sayılarınıza katmayın.`
      : `Doğru + yanlış + boş toplamı ${total}'i aşamaz (şu an ${sum}). Sayılarınızı cevap anahtarıyla yeniden karşılaştırın.`);
  }
  const score = scoreFromCorrect(d.value, valid);
  const letter = levelOf(d.value, valid);
  const nx = nextLevel(d.value, valid);

  $('r-headline').textContent = `${fmt2.format(score)} puan · ${headlineLevel(letter, exam.aile)}`;
  $('r-exam').textContent = exam.ad;
  $('r-correct').textContent = `${d.value} / ${valid}`;
  // Yalnızca biri girildiyse diğeri kalan sorudan bulunur (ör. 60 doğru + 12 yanlış → 8 boş); toplam kontrolü yukarıda yapıldı.
  const rest = valid - d.value;
  $('r-wrong').textContent = (y.empty && b.empty)
    ? `${rest} soru`
    : b.empty ? `${y.value} yanlış, ${rest - y.value} boş`
      : y.empty ? `${rest - b.value} yanlış, ${b.value} boş`
        : `${y.value} yanlış, ${b.value} boş`;
  $('r-per').textContent = `${fmt4.format(100 / valid)} puan`;
  $('r-score').textContent = fmt2.format(score);
  $('r-level').textContent = levelText(letter, exam.aile);
  $('r-next').textContent = nx
    ? `${nx.harf} seviyesi (${nx.min} puan) için ${nx.need} doğru gerekir: ${nx.remaining} doğru daha.`
    : 'En üst seviye olan A\'dasınız.';
  el.resScore.hidden = false;
  el.resTarget.hidden = true;
  renderChecks(evaluateThresholds(d.value, valid, exam.aile));
  el.note.textContent = notes(exam.aile, k, valid);

  last = { mode: 'puan', exam: exam.code, examName: exam.ad, family: exam.aile, correct: d.value, wrong: y.empty ? null : y.value, blank: b.empty ? null : b.value, cancel: k, score, letter };
  finish();
}

function runTarget(exam, k, valid) {
  const raw = el.target.value.trim();
  if (raw === '') return fail('Hedef puanı girin (ör. 55 veya 72,5). Sık kullanılan hedefler için alttaki düğmeleri kullanabilirsiniz.');
  const t = parseNum(raw);
  if (Number.isNaN(t)) return fail('Hedef puan okunamadı. Rakam ve gerekirse ondalık virgül kullanın (ör. 72,5).');
  if (t <= 0 || t > P.tam_puan) return fail(`Hedef puan 0'dan büyük ve en fazla ${P.tam_puan} olmalıdır (ör. 55, 70 veya 72,5).`);
  if (!hasAtMost3Decimals(t)) return fail('Hedef puanı en çok 3 ondalık basamakla girin (ör. 72,5 veya 75,949).');
  const need = requiredCorrect(t, valid);
  const achieved = scoreFromCorrect(need, valid);
  const letter = levelOf(need, valid);

  $('r-headline').textContent = `${fmtT.format(t)} puan için en az ${need} doğru`;
  $('t-target').textContent = fmtT.format(t);
  $('t-correct').textContent = `${need} doğru`;
  $('t-score').textContent = fmt2.format(achieved);
  $('t-level').textContent = levelText(letter, exam.aile);
  $('t-slack').textContent = `${valid - need} soru`;
  el.resScore.hidden = true;
  el.resTarget.hidden = false;
  renderChecks(evaluateThresholds(need, valid, exam.aile));
  el.note.textContent = notes(exam.aile, k, valid);

  last = { mode: 'hedef', exam: exam.code, examName: exam.ad, target: t, need, achieved, cancel: k, letter };
  finish();
}

function finish() {
  el.status.textContent = '';
  syncUrl();
  el.share.textContent = location.href;
  showResult();
}

function run() {
  showError(el.error, '');
  const exam = examInfo();
  const c = readCancel();
  if (c.error) return fail(c.error);
  const k = c.value;
  const valid = P.soru_sayisi - k;
  if (currentMode() === 'hedef') runTarget(exam, k, valid);
  else runScore(exam, k, valid);
}

/* ---------- Paylaşılabilir bağlantı: yalnız sınav kodu ve sayılar, # sonrasında (sunucuya gitmez) ---------- */

function buildHash() {
  if (!last) return '';
  const p = new URLSearchParams();
  p.set('sinav', last.exam);
  if (last.mode === 'hedef') {
    p.set('mod', 'hedef');
    p.set('h', String(last.target).replace('.', ','));
  } else {
    p.set('d', String(last.correct));
    if (last.wrong != null) p.set('y', String(last.wrong));
    if (last.blank != null) p.set('b', String(last.blank));
  }
  if (last.cancel > 0) p.set('i', String(last.cancel));
  return '#' + p.toString();
}
function syncUrl() {
  try { history.replaceState(null, '', location.pathname + buildHash()); } catch (e) { /* bazı gömülü görünümlerde izin verilmeyebilir */ }
}

/** Adresteki (# veya ?) parametreleri forma yazar; hesaplanacak bir değer varsa true döner. */
function readUrl() {
  const src = location.hash.length > 1 ? location.hash.slice(1) : location.search.slice(1);
  if (!src) return false;
  let p;
  try { p = new URLSearchParams(src); } catch (e) { return false; }
  const num = /^[0-9]{1,3}([.,][0-9]{1,4})?$/;
  const known = ['sinav', 'mod', 'd', 'y', 'b', 'i', 'h'];
  if (!known.some((k) => p.has(k))) return false;
  // Adres formu tamamen tanımlar: önceki değerler kalmasın
  showError(el.error, '');
  [el.correct, el.wrong, el.blank, el.target, el.cancel].forEach((i) => { i.value = ''; });
  el.hasCancel.checked = false;
  let bad = false;
  const sinav = p.get('sinav');
  if (sinav != null) {
    if ([...el.exam.options].some((o) => o.value === sinav)) el.exam.value = sinav;
    else bad = true;
  }
  const take = (key, input) => {
    const v = p.get(key);
    if (v == null) return false;
    if (num.test(v)) { input.value = v; return true; }
    bad = true;
    return false;
  };
  const mode = p.get('mod') === 'hedef' ? 'hedef' : 'puan';
  setMode(mode);
  let ready = false;
  if (mode === 'hedef') ready = take('h', el.target);
  else {
    ready = take('d', el.correct);
    take('y', el.wrong);
    take('b', el.blank);
  }
  if (p.has('i') && take('i', el.cancel)) el.hasCancel.checked = el.cancel.value !== '0';
  applyCancel();
  if (bad) {
    hideResult();
    last = null;
    showError(el.error, 'Bağlantıdaki bazı değerler geçersiz olduğu için yok sayıldı. Sayıları elle girip "Hesapla" düğmesine basın.');
    return false;
  }
  return ready;
}

/* ---------- Kopyalama ---------- */

function summaryText() {
  if (!last) return '';
  const cancel = last.cancel > 0 ? ` (${last.cancel} iptal soru düşüldü)` : '';
  const line = last.mode === 'hedef'
    ? `${last.examName}: ${fmtT.format(last.target)} puan için en az ${last.need} doğru gerekir (${fmt2.format(last.achieved)} puan)${cancel}.`
    : `${last.examName}: ${last.correct} doğru → ${fmt2.format(last.score)} puan, ${headlineLevel(last.letter, last.family)}${cancel}.`;
  return `${line}\nBilişim Ajans YDS Puan Hesaplama: ${location.href}`;
}
async function copyText(text, okMsg) {
  try {
    await navigator.clipboard.writeText(text);
    el.status.textContent = okMsg;
  } catch (e) {
    el.status.textContent = 'Kopyalanamadı; metni veya adresi elle seçip kopyalayın.';
  }
}

/* ---------- Olaylar ---------- */

el.form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => {
  applyMode(); hideResult(); showError(el.error, '');
}));
el.hasCancel.addEventListener('change', () => { applyCancel(); if (el.hasCancel.checked) el.cancel.focus(); });
el.exam.addEventListener('change', () => { if (last) run(); });
document.querySelectorAll('[data-target]').forEach((btn) => btn.addEventListener('click', () => {
  el.target.value = btn.dataset.target;
  run();
}));
$('clear').addEventListener('click', () => {
  el.form.reset();
  applyMode(); applyCancel(); hideResult(); showError(el.error, '');
  last = null;
  try { history.replaceState(null, '', location.pathname); } catch (e) { /* yok say */ }
  el.correct.focus();
});
$('copy').addEventListener('click', () => copyText(summaryText(), 'Sonuç kopyalandı.'));
$('copy-link').addEventListener('click', () => { syncUrl(); copyText(location.href, 'Bağlantı kopyalandı.'); });
window.addEventListener('hashchange', () => { if (readUrl()) run(); });

applyMode();
applyCancel();
loadParams().then((p) => {
  P = p;
  if (readUrl()) run();
});
