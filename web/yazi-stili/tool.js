// Süslü yazı / Unicode yazı stilleri — tamamen istemci tarafı; metin hiçbir yere gönderilmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_LEN = 500;
const cp = (n) => String.fromCodePoint(n);

/* ---------- Eşleme üreticileri ---------- */
// Matematiksel alfabe bloklarında büyük/küçük harf ve rakam başlangıç kodlarıyla eşleme tablosu üretir.
// exc: Unicode'un bu blokta başka yere taşıdığı harfler (ör. script "B" → ℬ).
function block(upper, lower, digit, exc = {}) {
  const m = new Map();
  for (let i = 0; i < 26; i++) {
    if (upper !== null) m.set(String.fromCharCode(65 + i), cp(upper + i));
    if (lower !== null) m.set(String.fromCharCode(97 + i), cp(lower + i));
  }
  if (digit !== null) for (let i = 0; i < 10; i++) m.set(String(i), cp(digit + i));
  for (const [k, v] of Object.entries(exc)) m.set(k, v);
  return m;
}
// İki dizgeyi harf harf eşleştirir: pairs('abc', 'ᴀʙᴄ')
function pairs(from, to, base = new Map()) {
  const a = Array.from(from), b = Array.from(to);
  a.forEach((ch, i) => base.set(ch, b[i]));
  return base;
}
// Küçük harfi büyük harf karşılığıyla aynı yapar (karakter tablosunda yalnızca büyük harf olan bloklar için).
function upperOnly(m) {
  for (let i = 0; i < 26; i++) m.set(String.fromCharCode(97 + i), m.get(String.fromCharCode(65 + i)));
  return m;
}
function addToAll(chars, suffix) { return (t) => Array.from(t).map((c) => (c === '\n' ? c : c + suffix)).join(''); }

const BOLD = block(0x1d400, 0x1d41a, 0x1d7ce);
const ITALIC = block(0x1d434, 0x1d44e, null, { h: 'ℎ' });
const BOLD_ITALIC = block(0x1d468, 0x1d482, null);
const SANS = block(0x1d5a0, 0x1d5ba, 0x1d7e2);
const SANS_BOLD = block(0x1d5d4, 0x1d5ee, 0x1d7ec);
const SANS_ITALIC = block(0x1d608, 0x1d622, null);
const SANS_BOLD_ITALIC = block(0x1d63c, 0x1d656, null);
const MONO = block(0x1d670, 0x1d68a, 0x1d7f6);
const DOUBLE = block(0x1d538, 0x1d552, 0x1d7d8, { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' });
const SCRIPT = block(0x1d49c, 0x1d4b6, null, { B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ', e: 'ℯ', g: 'ℊ', o: 'ℴ' });
const SCRIPT_BOLD = block(0x1d4d0, 0x1d4ea, null);
const FRAKTUR = block(0x1d504, 0x1d51e, null, { C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ' });
const FRAKTUR_BOLD = block(0x1d56c, 0x1d586, null);
const CIRCLE = (() => { const m = block(0x24b6, 0x24d0, null); for (let i = 1; i <= 9; i++) m.set(String(i), cp(0x245f + i)); m.set('0', '⓪'); return m; })();
const CIRCLE_BLACK = upperOnly(block(0x1f150, null, null));
const SQUARE = upperOnly(block(0x1f130, null, null));
const SQUARE_BLACK = upperOnly(block(0x1f170, null, null));
const PAREN = (() => { const m = block(0x1f110, 0x249c, null); for (let i = 1; i <= 9; i++) m.set(String(i), cp(0x2473 + i)); return m; })();
const SMALL_CAPS = pairs('abcdefghijklmnopqrstuvwxyz', 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ', pairs('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ'));
const FULLWIDTH = (() => {
  const m = new Map();
  for (let c = 0x21; c <= 0x7e; c++) m.set(String.fromCharCode(c), cp(c - 0x21 + 0xff01));
  m.set(' ', '　');
  return m;
})();
const SUPER = pairs('abcdefghijklmnoprstuvwxyz0123456789ABDEGHIJKLMNOPRTUVW+-=()', 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹ᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿᵀᵁⱽᵂ⁺⁻⁼⁽⁾');
const FLIP = pairs(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,\'"?!()[]{}<>_&;',
  'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀ᗺƆᗡƎℲ⅁HIſ⋊˥WNOԀΌᴚS⊥∩ΛMX⅄ZƖᄅƐㄣϛ9ㄥ860˙\'\'‚¿¡)(][}{><‾⅋؛'
);

/* ---------- Stil listesi ---------- */
// map: karakter eşlemesi; fn: tüm metni dönüştüren işlev; note: kart altı kısa açıklama.
const STYLES = [
  { id: 'bold', name: 'Kalın', map: BOLD },
  { id: 'italic', name: 'İtalik', map: ITALIC },
  { id: 'bold-italic', name: 'Kalın italik', map: BOLD_ITALIC },
  { id: 'sans', name: 'Sans (düz)', map: SANS },
  { id: 'sans-bold', name: 'Sans kalın', map: SANS_BOLD },
  { id: 'sans-italic', name: 'Sans italik', map: SANS_ITALIC },
  { id: 'sans-bold-italic', name: 'Sans kalın italik', map: SANS_BOLD_ITALIC },
  { id: 'mono', name: 'Daktilo', map: MONO },
  { id: 'double', name: 'Çift çizgili', map: DOUBLE },
  { id: 'script', name: 'El yazısı (script)', map: SCRIPT },
  { id: 'script-bold', name: 'Kalın el yazısı', map: SCRIPT_BOLD },
  { id: 'fraktur', name: 'Fraktur (gotik)', map: FRAKTUR },
  { id: 'fraktur-bold', name: 'Kalın fraktur', map: FRAKTUR_BOLD },
  { id: 'circle', name: 'Daire içinde', map: CIRCLE },
  { id: 'circle-black', name: 'Siyah daire içinde', map: CIRCLE_BLACK },
  { id: 'square', name: 'Kare içinde', map: SQUARE },
  { id: 'square-black', name: 'Siyah kare içinde', map: SQUARE_BLACK },
  { id: 'paren', name: 'Parantez içinde', map: PAREN },
  { id: 'small-caps', name: 'Küçük büyük harf', map: SMALL_CAPS },
  { id: 'fullwidth', name: 'Tam genişlik', map: FULLWIDTH },
  { id: 'super', name: 'Üst simge', map: SUPER },
  { id: 'strike', name: 'Üstü çizili', fn: addToAll('', '̶'), combining: true },
  { id: 'underline', name: 'Altı çizili', fn: addToAll('', '̲'), combining: true },
  { id: 'overline', name: 'Üstten çizgili', fn: addToAll('', '̅'), combining: true },
  { id: 'slash', name: 'Eğik çizgili', fn: addToAll('', '̸'), combining: true },
  { id: 'flip', name: 'Ters (baş aşağı)', fn: (t) => Array.from(t).reverse().map((c) => FLIP.get(c) ?? FLIP.get(c.toLowerCase()) ?? c).join(''), flip: true },
  { id: 'mirror', name: 'Ayna (sağdan sola)', fn: (t) => Array.from(t).reverse().join(''), combining: true },
  { id: 'spaced', name: 'Aralıklı', fn: (t) => Array.from(t).join(' '), combining: true },
  { id: 'stars', name: 'Yıldız süslü', fn: (t) => `✦ ${t} ✦`, combining: true },
  { id: 'hearts', name: 'Kalp süslü', fn: (t) => `♡ ${t} ♡`, combining: true },
];

// Türkçe'ye özgü harfler: Unicode matematik alfabelerinde karşılıkları yoktur.
const TR_ONLY = /[çğıöşüÇĞİÖŞÜ]/g;

/** Metni stile çevirir; dönüşmeyen Latin harf sayısını da döndürür. */
function convert(style, text) {
  if (style.fn) return { out: style.fn(text), missed: 0 };
  let missed = 0;
  let out = '';
  for (const ch of text) {
    const r = style.map.get(ch);
    if (r !== undefined) out += r;
    else {
      if (/[A-Za-z]/.test(ch)) missed++;
      out += ch;
    }
  }
  return { out, missed };
}

/* ---------- Arayüz ---------- */
const list = $('list');
const input = $('text');

function build() {
  list.innerHTML = '';
  for (const s of STYLES) {
    const li = document.createElement('li');
    li.className = 'ys-card';
    li.dataset.style = s.id;
    li.innerHTML = '<div class="ys-name"></div><div class="ys-out" data-out></div><button class="ba-btn ys-copy" type="button"></button>';
    li.querySelector('.ys-name').textContent = s.name;
    const btn = li.querySelector('button');
    btn.textContent = 'Kopyala';
    btn.setAttribute('aria-label', `${s.name} stilindeki metni kopyala`);
    btn.addEventListener('click', () => copy(li, btn, s));
    list.appendChild(li);
  }
}

function render() {
  const text = input.value.slice(0, MAX_LEN);
  showError($('error'), null);
  if (input.value.length > MAX_LEN) {
    showError($('error'), `Metin ${MAX_LEN} karakterle sınırlıdır; fazlası kesildi. Biyo için kısa metinler zaten daha iyi sonuç verir.`);
  }
  const empty = text.trim() === '';
  $('empty').hidden = !empty;
  list.hidden = empty;
  const tr = Array.from(new Set(text.match(TR_ONLY) || []));
  $('warn-tr').hidden = tr.length === 0;
  if (tr.length) {
    $('warn-tr-list').textContent = tr.join(' ');
  }
  if (empty) return;
  for (const li of list.children) {
    const s = STYLES.find((x) => x.id === li.dataset.style);
    const { out, missed } = convert(s, text);
    const el = li.querySelector('[data-out]');
    el.textContent = out;
    el.dataset.value = out;
    el.title = missed ? 'Bazı harflerin bu stilde karşılığı yok; olduğu gibi bırakıldı.' : '';
    li.classList.toggle('has-missed', missed > 0);
  }
}

async function copy(li, btn, style) {
  const value = li.querySelector('[data-out]').dataset.value || '';
  if (!value) return;
  let ok = false;
  try {
    await navigator.clipboard.writeText(value);
    ok = true;
  } catch {
    // Eski tarayıcı ya da izin yok: geçici metin alanıyla kopyala.
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
  }
  const status = $('copy-status');
  if (ok) {
    btn.textContent = 'Kopyalandı';
    status.textContent = `${style.name} stilindeki metin panoya kopyalandı.`;
    setTimeout(() => { btn.textContent = 'Kopyala'; }, 1500);
  } else {
    status.textContent = '';
    showError($('error'), 'Kopyalanamadı. Metni fareyle seçip Ctrl+C (Mac\'te Cmd+C) ile kopyalayabilirsiniz.');
  }
}

build();
input.addEventListener('input', render);
$('clear').addEventListener('click', () => { input.value = ''; render(); input.focus(); });
render();
