// Güçlü Şifre Üretici — tüm rastgelelik crypto.getRandomValues ile üretilir.
// Hiçbir fonksiyon ağ isteği yapmaz; üretilen şifreler yalnızca bu sekmenin belleğinde kalır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// Türkçe kelime listesi (Türkçe karakter içermez; klavye ve ülke fark etmeden yazılabilir).
export const WORDS = `
elma armut kiraz erik muz nar incir kavun karpuz limon portakal mandalina ceviz badem
fasulye nohut mercimek bulgur makarna ekmek peynir zeytin bal salata domates biber patates
kabak lahana marul maydanoz nane kekik kimyon tuz ayran kahve deniz nehir dere kaynak
orman tepe vadi ova plato ada liman kumsal plaj dalga yel bulut kar buz sis ay gezegen
uzay roket uydu toprak kum kaya maden demir elmas inci mercan kehribar yakut safir boncuk
halka zincir anahtar kilit pencere duvar tavan zemin merdiven balkon salon mutfak oda yatak
masa sandalye koltuk dolap raf lamba perde kilim battaniye havlu sabun tarak ayna saat
takvim kalem defter kitap sayfa harf kelime hikaye roman masal destan melodi nota piyano
gitar keman davul ney kanun radyo sinema tiyatro konser festival bayram tatil hafta sabah
gece zaman saniye dakika mevsim ilkbahar yaz sonbahar bahar ocak mart nisan temmuz ekim
pazar pazartesi cuma cumartesi okul ders hoca doktor polis asker pilot kaptan denizci terzi
berber marangoz garson mimar ressam yazar sporcu futbol basketbol voleybol tenis bisiklet
kayak top raket file kale gol oyun zafer madalya kupa bayrak vatan millet kasaba mahalle
sokak cadde meydan park tunel yol otoyol tren vagon taksi araba kamyon motor tekerlek
benzin gemi vapur yelken helikopter balon kanat kartal karga leylek tavuk horoz kaz hindi
kedi at inek koyun kuzu deve fil aslan kaplan kurt tilki sincap kirpi fare yunus balina
ahtapot karides midye salyangoz kelebek sinek kavak defne lale papatya karanfil nergis
orkide zambak yasemin leylak yonca yaprak dal tohum filiz meyve sebze tarla bostan harman
hamur pide simit pasta kurabiye lokum helva baklava dondurma kek pilav kebap dolma sarma
tabak bardak tencere tava ibrik cezve fincan tepsi sepet torba kutu valiz para lira banka
kasa fatura makbuz bilet pasaport kimlik imza mektup zarf pul posta telefon bilgisayar ekran
klavye kablo pil elektrik ampul fener mum duman soba makine robot vida testere tornavida
pense kazma ip halat iplik fermuar cep yaka kol etek pantolon ceket palto mont kazak
eldiven bere bot terlik kemer kolye bilezik renk mavi mor turuncu pembe beyaz siyah gri
kahverengi lacivert bordo bej koyu parlak mat uzun dar derin serin kuru islak nemli temiz
kirli yeni eski zeki bilge nazik kibar sevgi dostluk umut hayal huzur adalet bilim sanat
resim heykel harita pusula mercek teleskop mikroskop deney rakam toplam kare daire nokta
kenar merkez orta kuzey sol ileri geri alt arka yan uzak burada orada sonra hemen bazen
hep asla belki evet tamam merhaba selam kapak tahta cam mermer tunc bronz kalay platin
bakla enginar pirasa ispanak semizotu turp pancar kereviz dereotu roka tere salatalik
kestane fistik findik kuru kayisi vişne
`.split(/\s+/).map((w) => w.trim().toLowerCase()).filter((w) => /^[a-z]+$/.test(w) && w.length >= 2);
// Yinelenenleri at (liste elle yazıldığı için güvenlik payı).
const WORD_LIST = Array.from(new Set(WORDS));

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digit: '0123456789',
  symbol: '!@#$%^&*()-_=+[]{};:,.?/~',
};
const LOOKALIKE = /[0O1lI|]/g;
const GUESSES_PER_SEC = 1e10; // güçlü bir ev bilgisayarı / tek GPU varsayımı

/** 0 ≤ n < max aralığında, modulo yanlılığı olmayan rastgele tam sayı. */
export function randomInt(max) {
  if (!(max > 0) || max > 0x100000000) throw new Error('bad range');
  const limit = 0x100000000 - (0x100000000 % max);
  const buf = new Uint32Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % max;
  }
}

function pick(str) { return str[randomInt(str.length)]; }

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildPool({ upper, lower, digit, symbol, noLookalike }) {
  let pool = '';
  if (lower) pool += SETS.lower;
  if (upper) pool += SETS.upper;
  if (digit) pool += SETS.digit;
  if (symbol) pool += SETS.symbol;
  if (noLookalike) pool = pool.replace(LOOKALIKE, '');
  return pool;
}

/** Her seçili kümeden en az bir karakter garanti edilir; kalan yerler havuzdan doldurulur. */
export function generateRandom(opts) {
  const pool = buildPool(opts);
  if (!pool) throw new Error('EMPTY_POOL');
  const required = [];
  for (const key of ['lower', 'upper', 'digit', 'symbol']) {
    if (!opts[key]) continue;
    const set = opts.noLookalike ? SETS[key].replace(LOOKALIKE, '') : SETS[key];
    if (set) required.push(pick(set));
  }
  const chars = required.slice(0, opts.length);
  while (chars.length < opts.length) chars.push(pick(pool));
  return { value: shuffle(chars).join(''), bits: Math.log2(pool.length) * opts.length };
}

export function generatePassphrase({ words, separator, capitalize, addNumber }) {
  const parts = [];
  for (let i = 0; i < words; i++) {
    let w = WORD_LIST[randomInt(WORD_LIST.length)];
    if (capitalize) w = w[0].toUpperCase() + w.slice(1);
    parts.push(w);
  }
  let bits = Math.log2(WORD_LIST.length) * words;
  if (addNumber) { parts.push(String(randomInt(100)).padStart(2, '0')); bits += Math.log2(100); }
  return { value: parts.join(separator), bits };
}

export function generatePin({ length }) {
  let s = '';
  for (let i = 0; i < length; i++) s += pick(SETS.digit);
  return { value: s, bits: Math.log2(10) * length };
}

/** Entropiye göre ortalama kırılma süresini sade Türkçe ifade eder. */
export function crackTimeText(bits) {
  const seconds = Math.pow(2, bits - 1) / GUESSES_PER_SEC;
  const year = 31_557_600;
  const fmt = (n) => (n >= 10 ? Math.round(n) : Math.round(n * 10) / 10).toLocaleString('tr-TR');
  if (seconds < 1) return 'bir saniyeden kısa';
  if (seconds < 60) return `yaklaşık ${fmt(seconds)} saniye`;
  if (seconds < 3600) return `yaklaşık ${fmt(seconds / 60)} dakika`;
  if (seconds < 86_400) return `yaklaşık ${fmt(seconds / 3600)} saat`;
  if (seconds < year) return `yaklaşık ${fmt(seconds / 86_400)} gün`;
  const years = seconds / year;
  if (years < 1e3) return `yaklaşık ${fmt(years)} yıl`;
  if (years < 1e6) return `yaklaşık ${fmt(years / 1e3)} bin yıl`;
  if (years < 1e9) return `yaklaşık ${fmt(years / 1e6)} milyon yıl`;
  if (years < 1e12) return `yaklaşık ${fmt(years / 1e9)} milyar yıl`;
  return 'evrenin yaşından çok daha uzun (trilyonlarca yıl)';
}

export function strengthLevel(bits) {
  if (bits < 36) return { key: 'weak', label: 'Zayıf', pct: 20 };
  if (bits < 60) return { key: 'fair', label: 'Orta', pct: 45 };
  if (bits < 80) return { key: 'good', label: 'İyi', pct: 70 };
  if (bits < 100) return { key: 'strong', label: 'Güçlü', pct: 88 };
  return { key: 'excellent', label: 'Çok güçlü', pct: 100 };
}

// ---------- Arayüz ----------
const modeInputs = Array.from(document.querySelectorAll('input[name="mode"]'));
const panels = { random: $('panel-random'), phrase: $('panel-phrase'), pin: $('panel-pin') };

function currentMode() { return (modeInputs.find((r) => r.checked) || modeInputs[0]).value; }

function syncPanels() {
  const mode = currentMode();
  for (const [k, el] of Object.entries(panels)) el.hidden = k !== mode;
  previewStrength();
}

function clampNumber(el, min, max) {
  let v = Number(el.value);
  if (!Number.isFinite(v)) v = min;
  v = Math.max(min, Math.min(max, Math.round(v)));
  el.value = String(v);
  return v;
}

function readOptions() {
  const mode = currentMode();
  if (mode === 'random') {
    return {
      mode,
      length: clampNumber($('opt-length'), 8, 64),
      upper: $('opt-upper').checked,
      lower: $('opt-lower').checked,
      digit: $('opt-digit').checked,
      symbol: $('opt-symbol').checked,
      noLookalike: $('opt-lookalike').checked,
    };
  }
  if (mode === 'phrase') {
    return {
      mode,
      words: clampNumber($('opt-words'), 3, 10),
      separator: $('opt-sep').value,
      capitalize: $('opt-cap').checked,
      addNumber: $('opt-num').checked,
    };
  }
  return { mode, length: clampNumber($('opt-pin-length'), 4, 12) };
}

function generateOne(opts) {
  if (opts.mode === 'random') return generateRandom(opts);
  if (opts.mode === 'phrase') return generatePassphrase(opts);
  return generatePin(opts);
}

function estimateBits(opts) {
  if (opts.mode === 'random') { const p = buildPool(opts); return p ? Math.log2(p.length) * opts.length : 0; }
  if (opts.mode === 'phrase') return Math.log2(WORD_LIST.length) * opts.words + (opts.addNumber ? Math.log2(100) : 0);
  return Math.log2(10) * opts.length;
}

function renderStrength(bits) {
  const lvl = strengthLevel(bits);
  const el = $('strength');
  el.dataset.level = lvl.key;
  el.querySelector('.bar > span').style.width = `${lvl.pct}%`;
  $('strength-label').textContent = lvl.label;
  $('strength-bits').textContent = `${Math.round(bits)} bit entropi`;
  $('strength-time').textContent = `Ev bilgisayarıyla kırma süresi: ${crackTimeText(bits)} (saniyede 10 milyar deneme varsayımıyla)`;
  el.setAttribute('aria-valuenow', String(Math.round(bits)));
}

function previewStrength() {
  try { renderStrength(estimateBits(readOptions())); } catch { /* geçersiz seçenek; üretimde uyarı verilir */ }
}

const outputs = $('outputs');

function renderOutputs(list) {
  outputs.innerHTML = '';
  list.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<code class="pw" tabindex="0"></code><button class="ba-btn" type="button" data-copy aria-label="Şifreyi kopyala">Kopyala</button>`;
    li.querySelector('.pw').textContent = item.value;
    li.querySelector('.pw').setAttribute('aria-label', `Şifre ${i + 1}`);
    outputs.appendChild(li);
  });
  $('result').classList.toggle('is-active', list.length > 0);
}

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* aşağıdaki yedek yola düş */ }
  const ta = document.createElement('textarea');
  ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}

outputs.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-copy]');
  if (!btn) return;
  const text = btn.closest('li').querySelector('.pw').textContent;
  const ok = await copyText(text);
  const old = btn.textContent;
  btn.textContent = ok ? 'Kopyalandı' : 'Kopyalanamadı';
  btn.classList.toggle('is-copied', ok);
  if (!ok) showError($('error'), 'Pano erişimi engellendi. Şifreyi seçip Ctrl+C (Mac: Cmd+C) ile kopyalayabilirsiniz.');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('is-copied'); }, 1800);
});

$('generate').addEventListener('click', () => {
  showError($('error'), null);
  const opts = readOptions();
  const count = Number($('opt-count').value) === 5 ? 5 : 1;
  try {
    if (!window.crypto || !crypto.getRandomValues) throw new Error('NO_CRYPTO');
    const list = [];
    for (let i = 0; i < count; i++) list.push(generateOne(opts));
    renderOutputs(list);
    renderStrength(list[0].bits);
    $('result-info').textContent = count === 1 ? 'Şifreniz hazır; kopyalayıp parola yöneticinize kaydedin.' : '5 seçenek üretildi; birini seçip kopyalayın.';
    outputs.querySelector('.pw')?.focus({ preventScroll: true });
  } catch (err) {
    if (String(err.message) === 'EMPTY_POOL') showError($('error'), 'En az bir karakter türü seçmelisiniz (küçük harf, büyük harf, rakam veya sembol).');
    else if (String(err.message) === 'NO_CRYPTO') showError($('error'), 'Tarayıcınız güvenli rastgele sayı üretimini desteklemiyor. Güncel bir Chrome, Firefox, Safari veya Edge kullanın.');
    else showError($('error'), 'Şifre üretilirken beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin.');
  }
});

$('clear').addEventListener('click', () => {
  renderOutputs([]);
  showError($('error'), null);
  previewStrength();
});

modeInputs.forEach((r) => r.addEventListener('change', syncPanels));
document.querySelectorAll('#options input, #options select').forEach((el) => {
  el.addEventListener('input', previewStrength);
  el.addEventListener('change', previewStrength);
});
$('word-count').textContent = String(WORD_LIST.length);
syncPanels();
