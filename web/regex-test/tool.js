// Regex test aracı — saf JS. Metin tarayıcıdan çıkmaz; ağır desenler Web Worker'da 2 sn ile sınırlanır.
const $ = (id) => document.getElementById(id);
const TIMEOUT_MS = 2000;
const SHOW_LIMIT = 200;       // eşleşme listesinde gösterilecek en çok kart
const BIG_TEXT = 1024 * 1024; // 1 MB üstü uyarı
const FLAGS = ['g', 'i', 'm', 's', 'u', 'y'];

const pat = $('pattern');
const txt = $('text');
let worker = null;
let seq = 0;
let timer = null;
let debounce = null;
let lastSample = '';

/* ---------- Kalıp kütüphanesi ---------- */
const PRESETS = {
  cep: { label: 'TR cep telefonu', pattern: '(?:\\+90|0090|0)?[\\s-]?\\(?5\\d{2}\\)?[\\s-]?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}', flags: 'g', sample: 'Beni 0532 123 45 67 ya da +90 505 987 65 43 numarasından arayın.' },
  eposta: { label: 'E-posta', pattern: '[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+', flags: 'g', sample: 'Yazın: bilgi@bilisimajans.com veya destek.ekibi@ornek.com.tr' },
  tc: { label: 'TC kimlik (yalnızca biçim)', pattern: '\\b[1-9]\\d{10}\\b', flags: 'g', sample: 'Örnek biçim: 10000000146 (rastgele bir sayı; geçerlilik denetlenmez). 012345678901 eşleşmez.' },
  iban: { label: 'IBAN (TR biçimi)', pattern: '\\bTR\\d{2}(?:\\s?\\d{4}){5}\\s?\\d{2}\\b', flags: 'gi', sample: 'Hesap: TR33 0006 1005 1978 6457 8413 26 (örnek biçim).' },
  tarih: { label: 'Tarih gg.aa.yyyy', pattern: '\\b(?<gun>0[1-9]|[12]\\d|3[01])\\.(?<ay>0[1-9]|1[0-2])\\.(?<yil>\\d{4})\\b', flags: 'g', sample: 'Toplantı 15.03.2025 tarihinde, teslim 01.12.2026 günü. 32.13.2025 geçersizdir.' },
  url: { label: 'URL', pattern: 'https?:\\/\\/[^\\s/$.?#][^\\s]*', flags: 'gi', sample: 'Site https://bilisimajans.com/iletisim ve http://araclar.bilisimajans.com/regex-test/ adresleri.' },
  plaka: { label: 'Plaka', pattern: '\\b(?:0[1-9]|[1-7]\\d|8[01])\\s?[A-ZÇĞİÖŞÜ]{1,3}\\s?\\d{2,4}\\b', flags: 'g', sample: 'Araçlar: 21 AB 123, 34 ABC 1234 ve 06 K 4567. 99 AB 123 geçersiz ildir.' },
};

for (const [k, v] of Object.entries(PRESETS)) {
  const o = document.createElement('option');
  o.value = k;
  o.textContent = v.label;
  $('preset').appendChild(o);
}

/* ---------- Yardımcılar ---------- */
function flagString() {
  return FLAGS.filter((f) => $('f-' + f).checked).join('');
}
function setFlags(str) {
  for (const f of FLAGS) $('f-' + f).checked = str.includes(f);
}
function setMsg(id, msg) {
  const el = $(id);
  el.textContent = msg || '';
  el.classList.toggle('is-active', !!msg);
}

/** Desen hatasını Türkçe açıklar. Tarayıcı mesajları İngilizce ve değişkendir. */
function explainError(msg) {
  const rules = [
    [/Unterminated group|Missing \)/i, 'Açılan parantez kapatılmamış. Her "(" için bir ")" ekleyin.'],
    [/Unmatched '\)'|Unmatched \)/i, 'Fazladan kapanış parantezi var. Eşleşmeyen ")" işaretini silin ya da önüne ters bölü koyun: \\).'],
    [/Nothing to repeat|Invalid quantifier/i, 'Tekrar niteleyicisi (* + ? {n}) tekrar edeceği bir şey bulamadı. Önüne bir karakter ya da grup koyun; niteleyiciyi düz karakter olarak istiyorsanız \\* gibi kaçırın.'],
    [/Unterminated character class|Missing \]/i, 'Köşeli parantez kapatılmamış. "[" için bir "]" ekleyin.'],
    [/out of order in character class|Range out of order/i, 'Karakter aralığı ters sırada (örnek: [z-a]). Aralığı küçükten büyüğe yazın: [a-z].'],
    [/Invalid group|Invalid capture group name|Invalid named/i, 'Grup söz dizimi geçersiz. Adlandırılmış grup (?<ad>...) biçiminde, ad harfle başlayarak yazılmalıdır.'],
    [/Duplicate capture group name/i, 'Aynı grup adı iki kez kullanılmış. Her adlandırılmış grubun adı benzersiz olmalı.'],
    [/Invalid escape|Invalid unicode escape|Invalid property name/i, 'Geçersiz kaçış dizisi. Unicode bayrağı (u) açıkken gereksiz kaçışlar hata verir; bayrağı kapatın ya da ters bölüyü silin. \\p{...} için u bayrağı gerekir.'],
    [/Lone quantifier brackets|Incomplete quantifier/i, 'Süslü parantez niteleyici olarak tamamlanmamış. {2,5} biçimini kullanın ya da "{" işaretini \\{ yazarak kaçırın.'],
    [/numbers out of order/i, 'Süslü parantezdeki sayılar ters sırada ({5,2} gibi). Küçük sayıyı önce yazın.'],
    [/Invalid flags/i, 'Bayrak birleşimi geçersiz. Bazı bayraklar birlikte kullanılamaz; işaretli bayrakları azaltın.'],
    [/\\ at end of pattern/i, 'Desen ters bölüyle bitiyor. Ters bölüden sonra bir karakter yazın ya da \\\\ ile kaçırın.'],
    [/Invalid lookbehind|Invalid look/i, 'Bakış (lookahead/lookbehind) söz dizimi geçersiz. (?=...), (?!...), (?<=...), (?<!...) biçimlerini kullanın.'],
  ];
  for (const [re, tr] of rules) if (re.test(msg)) return tr;
  return 'Desen geçerli bir düzenli ifade değil. Parantez, köşeli parantez ve ters bölüleri kontrol edin.';
}

/* ---------- Worker yönetimi ---------- */
function startWorker() {
  worker = new Worker('regex-worker.js');
  worker.onmessage = onResult;
  worker.onerror = () => { setMsg('error', 'Desen çalıştırılırken beklenmeyen bir hata oluştu. Deseni sadeleştirip tekrar deneyin.'); };
}

function run() {
  clearTimeout(timer);
  setMsg('error', '');
  setMsg('warning', '');
  const pattern = pat.value;
  const flags = flagString();
  if (!pattern) { render(null); setMsg('status', 'Bir desen yazın ya da kalıp kütüphanesinden seçin.'); return; }
  // Önce ana iş parçacığında yalnızca derleyerek söz dizimini denetle (eşleştirme yapılmaz, donma riski yok).
  try { new RegExp(pattern, flags); } catch (err) {
    render(null);
    setMsg('status', '');
    setMsg('error', explainError(String(err.message)));
    return;
  }
  if (txt.value.length > BIG_TEXT) setMsg('warning', 'Test metni 1 MB üstünde; işlem yavaşlayabilir. Gerekirse metni küçültün.');
  const id = ++seq;
  const doReplace = $('tab-replace').getAttribute('aria-selected') === 'true';
  setMsg('status', 'Hesaplanıyor…');
  if (!worker) startWorker();
  worker.postMessage({ id, pattern, flags, text: txt.value, replacement: $('replacement').value, doReplace });
  timer = setTimeout(() => {
    // Zaman aşımı: işçiyi öldür, bir sonraki çalıştırmada yenisi açılır.
    worker.terminate();
    worker = null;
    seq++;
    render(null);
    setMsg('status', '');
    setMsg('warning', 'Zaman aşımı: desen 2 saniyede sonuç veremedi. Büyük olasılıkla "catastrophic backtracking" (katastrofik geri izleme) var; örneğin (a+)+ gibi iç içe tekrarlar. Tekrarları sadeleştirin, gereksiz grupları kaldırın ya da daha belirgin karakter sınıfları kullanın.');
  }, TIMEOUT_MS);
}

function onResult(e) {
  const d = e.data;
  if (d.id !== seq) return; // eski sonuç
  clearTimeout(timer);
  setMsg('status', '');
  if (d.error) { render(null); setMsg('error', explainError(d.error)); return; }
  render(d);
}

/* ---------- Çizim ---------- */
function render(d) {
  const preview = $('preview');
  const list = $('matches');
  list.textContent = '';
  preview.textContent = '';
  if (!d) {
    preview.textContent = txt.value;
    $('match-count').textContent = '';
    $('replace-out').value = '';
    return;
  }
  const text = txt.value;
  $('match-count').textContent = d.matches.length === 0 ? 'Eşleşme yok' : `${d.matches.length}${d.truncated ? '+' : ''} eşleşme`;
  // Vurgulu önizleme
  const frag = document.createDocumentFragment();
  let pos = 0;
  d.matches.forEach((m, i) => {
    if (m.text === '' || m.index < pos) return;
    if (m.index > pos) frag.appendChild(document.createTextNode(text.slice(pos, m.index)));
    const mark = document.createElement('mark');
    mark.className = i % 2 ? 'rt-m2' : 'rt-m1';
    mark.textContent = m.text;
    frag.appendChild(mark);
    pos = m.index + m.text.length;
  });
  frag.appendChild(document.createTextNode(text.slice(pos)));
  preview.appendChild(frag);
  // Eşleşme listesi
  d.matches.slice(0, SHOW_LIMIT).forEach((m, i) => {
    const li = document.createElement('li');
    li.className = 'rt-card';
    const h = document.createElement('div');
    h.className = 'rt-head';
    h.textContent = `#${i + 1} · indeks ${m.index}–${m.index + m.text.length} · `;
    const code = document.createElement('code');
    code.textContent = m.text === '' ? '(boş eşleşme)' : m.text;
    h.appendChild(code);
    li.appendChild(h);
    m.groups.forEach((g, gi) => {
      const p = document.createElement('div');
      p.className = 'rt-group';
      p.textContent = `Grup ${gi + 1}: ${g === null ? '(katılmadı)' : g === '' ? '(boş)' : g}`;
      li.appendChild(p);
    });
    if (m.named) {
      for (const [k, v] of Object.entries(m.named)) {
        const p = document.createElement('div');
        p.className = 'rt-group rt-named';
        p.textContent = `${k}: ${v === null ? '(katılmadı)' : v === '' ? '(boş)' : v}`;
        li.appendChild(p);
      }
    }
    list.appendChild(li);
  });
  if (d.matches.length > SHOW_LIMIT) {
    const li = document.createElement('li');
    li.className = 'rt-card';
    li.textContent = `İlk ${SHOW_LIMIT} eşleşme listelendi; toplam ${d.matches.length}${d.truncated ? '+' : ''}. Önizlemede hepsi vurgulanır.`;
    list.appendChild(li);
  }
  if (typeof d.replaced === 'string') $('replace-out').value = d.replaced;
}

/* ---------- Sekmeler ---------- */
function selectTab(name) {
  for (const t of ['match', 'replace']) {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', sel ? 'true' : 'false');
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  }
  run();
}
for (const t of ['match', 'replace']) {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const n = t === 'match' ? 'replace' : 'match';
      selectTab(n);
      $('tab-' + n).focus();
    }
  });
}

/* ---------- Olaylar ---------- */
function schedule() { clearTimeout(debounce); debounce = setTimeout(run, 150); }
pat.addEventListener('input', schedule);
txt.addEventListener('input', schedule);
$('replacement').addEventListener('input', schedule);
for (const f of FLAGS) $('f-' + f).addEventListener('change', run);

$('preset').addEventListener('change', () => {
  const p = PRESETS[$('preset').value];
  if (!p) return;
  pat.value = p.pattern;
  setFlags(p.flags);
  if (!txt.value.trim() || txt.value === lastSample) { txt.value = p.sample; lastSample = p.sample; }
  run();
});

async function copyText(value, label) {
  if (!value) { setMsg('error', 'Kopyalanacak içerik yok. Önce bir desen yazın.'); return; }
  setMsg('error', '');
  try { await navigator.clipboard.writeText(value); } catch {
    const t = document.createElement('textarea');
    t.value = value;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  $('copied').textContent = `${label} kopyalandı`;
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
}
$('copy-pattern').addEventListener('click', () => copyText(pat.value ? `/${pat.value}/${flagString()}` : '', 'Desen'));
$('copy-replace').addEventListener('click', () => copyText($('replace-out').value, 'Sonuç'));
$('btn-clear').addEventListener('click', () => {
  pat.value = '';
  txt.value = '';
  $('replacement').value = '';
  $('preset').value = '';
  setFlags('g');
  lastSample = '';
  run();
  pat.focus();
});

setFlags('g');
run();
