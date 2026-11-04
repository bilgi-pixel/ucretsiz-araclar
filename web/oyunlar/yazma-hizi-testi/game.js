// Yazma Hızı Testi (Türkçe). Tamamen istemci tarafı: ağ isteği yok, veri yalnızca
// bu cihazın localStorage'ında (en iyi skor ve seçenekler) tutulur.

const STORE_BEST = 'oyun-yazma-hizi-testi:best';
const STORE_OPTS = 'oyun-yazma-hizi-testi:opts';
const SHARE_URL = 'https://araclar.bilisimajans.com/oyunlar/yazma-hizi-testi/';
const DURATIONS = [30, 60, 120];

// Kendi derlediğimiz yaygın Türkçe kelime havuzu (kelime modu). Hepsi küçük harf, kesme işareti yok.
const WORDS = (`
ve bir bu şu o ben sen biz siz onlar da de ki ne mi için ile gibi kadar daha çok az en hiç her bazı bütün başka kendi hangi nasıl neden
nerede nereye sonra önce şimdi bugün yarın dün artık belki çünkü fakat ancak ama yine ayrıca hatta zaten sadece yalnız birlikte beraber
üzerinde altında içinde dışında yanında arasında karşı doğru göre rağmen
ev okul kitap masa sandalye kapı pencere oda bahçe sokak şehir köy ülke dünya gökyüzü güneş ay yıldız bulut yağmur kar rüzgar deniz göl nehir
dağ orman ağaç çiçek yaprak toprak taş su ateş hava yol köprü araba otobüs tren uçak gemi bisiklet telefon bilgisayar klavye ekran fare
internet program oyun müzik film resim fotoğraf kalem defter çanta ayakkabı elbise ceket şapka gözlük saat anahtar para fiyat pazar market
dükkan ekmek çay kahve süt peynir yumurta zeytin domates salata çorba pilav tatlı meyve elma armut üzüm kiraz karpuz limon portakal balık et
tavuk sebze şeker tuz biber soğan patates fasulye mercimek makarna bal reçel çikolata
anne baba kardeş abla ağabey dede nine çocuk bebek arkadaş komşu öğretmen öğrenci doktor hasta usta işçi müdür patron müşteri misafir insan
kadın erkek adam aile akraba
zaman gün hafta yıl dakika saniye sabah öğle akşam gece hayat sevgi umut mutluluk başarı güven saygı dostluk barış özgürlük adalet bilgi fikir
düşünce sorun çözüm cevap soru haber hikaye masal şiir cümle kelime harf sayı rakam renk ses ışık gölge hayal rüya anı tarih gelecek geçmiş
çalışma dinlenme tatil seyahat yolculuk bayram düğün doğum yemek kahvaltı
gelir gider yapar eder olur bilir görür alır verir söyler konuşur yazar okur çalışır oynar koşar yürür durur oturur kalkar uyur uyanır yer içer
pişirir açar kapatır bulur arar bekler sever ister düşünür anlar öğrenir öğretir başlar bitirir kazanır kaybeder güler ağlar sorar cevaplar
gösterir saklar taşır çeker iter atar tutar bırakır geçer döner çıkar girer biner iner uçar yüzer toplar dağıtır paylaşır hazırlar kullanır
değiştirir geliştirir anlatır dinler izler seyreder gezer dolaşır
büyük küçük uzun kısa geniş dar yüksek alçak ağır hafif sıcak soğuk taze eski yeni genç yaşlı hızlı yavaş sessiz gürültülü temiz kirli boş dolu
açık kapalı kolay zor önemli gerekli güzel çirkin akıllı tatlı acı tuzlu mutlu üzgün yorgun hazır sağlıklı güçlü zayıf zengin yoksul sakin
canlı parlak karanlık aydınlık sarı kırmızı mavi yeşil siyah beyaz turuncu mor pembe gri kahverengi
iki üç dört beş altı yedi sekiz dokuz on yirmi otuz kırk elli yüz bin ilk son orta yarım tam
sağ sol ön arka yukarı aşağı iç dış yakın uzak burada orada
kalp göz kulak burun ağız el ayak kol bacak baş saç yüz omuz parmak diş
oyuncak top bahçıvan çiftçi balıkçı kaptan şoför pilot yazar ressam müzisyen sporcu futbol basketbol voleybol yüzme koşu
kütüphane hastane eczane postane belediye üniversite lise ilkokul sınıf ders sınav ödev not diploma meslek iş görev maaş
perde halı koltuk yatak yastık battaniye dolap ayna lamba televizyon radyo buzdolabı fırın tencere tabak bardak kaşık çatal bıçak
bulaşık çamaşır sabun havlu fırça şemsiye bavul harita pusula fener kamp çadır
`).split(/\s+/).filter(Boolean);

// Metin modu için kendi yazdığımız 10 kısa paragraf (telifli metin yok; yalnızca harf, virgül ve nokta).
const PARAGRAPHS = [
  'Sabahın erken saatlerinde şehir henüz uyanmamıştı. Sokaklar sessizdi, fırının önünde taze ekmek kokusu vardı. Bir fincan sıcak çay alıp pencerenin kenarına oturdu ve gökyüzünün yavaş yavaş aydınlanışını izledi. Böyle sakin anlar, günün geri kalanındaki koşuşturmaya hazırlanmak için en iyi fırsattır.',
  'Kitap okumak, başka bir hayatı yaşamanın en kolay yoludur. Sayfaları çevirdikçe yeni yerler görür, yeni insanlar tanırız. Her gün yalnızca yirmi dakika okumak bile bir yılın sonunda onlarca kitap demektir. Önemli olan, küçük bir alışkanlığı sabırla sürdürebilmektir.',
  'Deniz kenarındaki küçük kasabada yaz akşamları çok güzel geçerdi. Güneş batarken balıkçılar ağlarını toplar, çocuklar iskelede koşuşurdu. Havada tuz ve ıhlamur kokusu olurdu. Herkes bahçesine çıkar, komşularla birlikte uzun uzun sohbet ederdi.',
  'Klavyeyle hızlı yazmanın sırrı, ellerin tuşlara bakmadan hareket edebilmesidir. Başlangıçta yavaş gitmek doğaldır. Doğruluğu koruyarak düzenli çalışırsanız hız kendiliğinden artar. Her gün on dakikalık kısa çalışmalar, haftada bir yapılan uzun çalışmadan çok daha verimli olur.',
  'Yağmurlu bir pazar günü evde oturmak insana iyi gelir. Mutfaktan kek kokusu yayılır, radyoda eski şarkılar çalar. Dışarıda yağmur camlara vurur, içeride ise hayat yavaşlar. Böyle günlerde telefonları bir kenara bırakıp sevdiklerinizle vakit geçirmek en değerli şeydir.',
  'Doğru zaman yönetimi, her işi aynı anda yapmak değil, önemli işi doğru zamanda yapmaktır. Günün başında üç öncelik belirleyin ve önce onlara odaklanın. Küçük molalar vermek dikkatinizi toplamanıza yardımcı olur. Akşam olduğunda neleri tamamladığınıza bakmak insanı motive eder.',
  'Bahçede yetiştirilen domatesin tadı hiçbir markette bulunmaz. Tohumu toprağa ekmek, her sabah sulamak ve ilk çiçeği görmek büyük bir sabır ister. Sonunda kırmızı meyveleri dalından koparmak, emeğin karşılığını almanın en güzel örneğidir. Toprak, emek verenlere cömert davranır.',
  'Müzik, kelimelerin yetmediği yerde konuşur. Bir şarkı bizi yıllar öncesine götürebilir, eski bir yazı hatırlatabilir. Ritim tutmak, bir enstrüman çalmak ya da sadece dinlemek zihni dinlendirir. Bu yüzden her kültürde müzik, insanları bir araya getiren ortak dil olmuştur.',
  'Uzun bir yolculuğa çıkmadan önce valizi hazırlamak da yolculuğun bir parçasıdır. Gerekli eşyaları yazmak, belgeleri kontrol etmek ve rotayı bir kez daha gözden geçirmek ileride zaman kazandırır. Yolda beklenmedik şeyler olabilir, ama iyi hazırlanan kişi onlara daha rahat uyum sağlar.',
  'Dostluk, zor günlerde ortaya çıkan en sağlam bağdır. Gerçek bir dost, başarılarınıza sevinir, hatalarınızda yanınızda durur. Birbirine zaman ayırmak, içten bir mesaj yazmak ya da sadece birlikte kahve içmek ilişkiyi canlı tutar. Küçük ilgiler, zamanla büyük güven oluşturur.',
];

const $ = (id) => document.getElementById(id);
const el = {
  target: $('target'), input: $('typing-input'), live: $('live'),
  time: $('stat-time'), wpm: $('stat-wpm'), kpm: $('stat-kpm'), acc: $('stat-acc'),
  bestLine: $('best-line'), restart: $('restart'), resetBest: $('reset-best'), asciiOpt: $('opt-tr'),
  result: $('result'), resTitle: $('res-title'), resWpm: $('res-wpm'), resKpm: $('res-kpm'), resAcc: $('res-acc'),
  resWords: $('res-words'), resWrong: $('res-wrong'), resComment: $('res-comment'), resNew: $('res-new'),
  resAgain: $('res-again'), resCopy: $('res-copy'), copyStatus: $('copy-status'),
};

const state = { phase: 'idle', duration: 60, mode: 'words', turkish: true, target: '', start: 0, endTimer: 0, tick: 0, lastResult: null };
let chars = [];      // hedef metindeki her karakterin <span>'ı
let painted = [];    // her karakter için son boyanan durum: '', 'ok', 'bad'
let curIndex = -1;   // imleç konumu (şu an yazılacak karakter)

// --- Yardımcılar -------------------------------------------------------------

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Torbadan çek: havuz bitmeden tekrar yok, bitince karıştırıp yeniden başlar.
function makeBag(items) {
  let bag = [];
  return () => {
    if (!bag.length) bag = shuffle(items.slice());
    return bag.pop();
  };
}
const nextWord = makeBag([...new Set(WORDS)]);
const nextParagraph = makeBag(PARAGRAPHS);

// Türkçe klavyesi olmayanlar için: Türkçe harfleri ASCII karşılığına çevirir (büyük/küçük ayrımı korunur).
const ASCII_MAP = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U' };
const toAscii = (s) => s.replace(/[çğıöşüÇĞİÖŞÜ]/g, (c) => ASCII_MAP[c]);

// "97,5" gibi Türkçe ondalık gösterim; tam sayıysa ondalıksız.
function fmt1(x) {
  const r = Math.round(x * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1).replace('.', ',');
}

function safeGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

// Yazılan metni normalleştir: bazı klavyeler bileşik/ayrık Unicode gönderebilir (NFC'ye çevrilir).
const typedText = () => el.input.value.normalize('NFC');

// --- Hedef metin ------------------------------------------------------------

function chunkText() {
  let chunk;
  if (state.mode === 'text') chunk = nextParagraph();
  else chunk = Array.from({ length: 40 }, nextWord).join(' ');
  return state.turkish ? chunk : toAscii(chunk);
}

function charSpan(ch, extra) {
  const s = document.createElement('span');
  s.className = 'yz-c' + (extra ? ' ' + extra : '');
  s.textContent = ch;
  chars.push(s);
  painted.push('');
  return s;
}

// Hedef metne yeni bir parça ekler (başlangıçta ve yazı sonuna yaklaşılınca).
function appendChunk(chunk) {
  const frag = document.createDocumentFragment();
  chunk.split(' ').forEach((word, i) => {
    if (state.target.length > 0 || i > 0) {
      frag.append(charSpan(' ', 'yz-sp'));
      state.target += ' ';
    }
    const w = document.createElement('span');
    w.className = 'yz-w';
    for (const ch of word) {
      w.append(charSpan(ch));
      state.target += ch;
    }
    frag.append(w);
  });
  el.target.append(frag);
  el.target.dataset.target = state.target;
}

function buildTarget() {
  chars = [];
  painted = [];
  curIndex = -1;
  state.target = '';
  el.target.textContent = '';
  // Başlangıçta 2 parça: 80 kelime ya da 2 paragraf.
  appendChunk(chunkText());
  appendChunk(chunkText());
  paint('');
}

function ensureTarget(typedLen) {
  while (typedLen + 260 > state.target.length) appendChunk(chunkText());
}

// Yazılan karakterleri doğru/yanlış olarak boyar; yalnızca değişen karakterlere dokunur.
function paint(typed) {
  const n = Math.min(chars.length, Math.max(typed.length, painted.length));
  for (let i = 0; i < n; i++) {
    const want = i < typed.length ? (typed[i] === state.target[i] ? 'ok' : 'bad') : '';
    if (painted[i] !== want) {
      painted[i] = want;
      chars[i].classList.toggle('ok', want === 'ok');
      chars[i].classList.toggle('bad', want === 'bad');
    }
  }
  if (curIndex >= 0 && chars[curIndex]) chars[curIndex].classList.remove('cur');
  curIndex = typed.length;
  const cur = chars[curIndex];
  if (cur) {
    cur.classList.add('cur');
    // İmleç satırını görünür tut: bir satır üstte bırakarak kaydır.
    const lh = parseFloat(getComputedStyle(el.target).lineHeight) || 36;
    const wanted = Math.max(0, cur.offsetTop - lh);
    if (Math.abs(el.target.scrollTop - wanted) > 1) el.target.scrollTop = wanted;
  }
}

// --- İstatistik -------------------------------------------------------------

function compute(typed, elapsedMs) {
  const t = state.target;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === t[i]) correct++;
  const minutes = Math.max(elapsedMs, 1) / 60000;
  const wpm = correct / 5 / minutes; // standart: 5 karakter = 1 kelime
  const kpm = correct / minutes;
  const acc = typed.length ? (correct / typed.length) * 100 : 100;
  return { correct, typed: typed.length, wrong: typed.length - correct, wpm, kpm, acc };
}

// Tam doğru yazılan kelime sayısı (hedefteki kelimeyle birebir aynı yazılmış olmalı).
function correctWords(typed) {
  const tw = typed.split(' ');
  const gw = state.target.split(' ');
  let n = 0;
  tw.forEach((w, i) => {
    if (w.length > 0 && w === gw[i]) n++;
  });
  return n;
}

function renderLive(typed, elapsedMs) {
  // Canlı değerlerde ilk saniyelerde şişmeyi önlemek için en az 2 sn üzerinden hesaplanır.
  const s = compute(typed, Math.max(elapsedMs, 2000));
  el.live.dataset.correct = String(s.correct);
  el.live.dataset.typed = String(s.typed);
  el.wpm.textContent = String(Math.round(s.wpm));
  el.kpm.textContent = String(Math.round(s.kpm));
  el.acc.textContent = fmt1(s.acc);
  const left = Math.max(0, Math.ceil((state.duration * 1000 - elapsedMs) / 1000));
  el.time.textContent = String(state.phase === 'idle' ? state.duration : left);
}

// --- Akış -------------------------------------------------------------------

function clearTimers() {
  clearTimeout(state.endTimer);
  clearInterval(state.tick);
  state.endTimer = 0;
  state.tick = 0;
}

function startRun() {
  state.phase = 'running';
  state.start = performance.now();
  // Hem zamanlayıcı hem damga karşılaştırması: sekme arka plana düşse de süre dolunca biter.
  state.endTimer = setTimeout(finish, state.duration * 1000);
  state.tick = setInterval(() => {
    const elapsed = performance.now() - state.start;
    if (elapsed >= state.duration * 1000) { finish(); return; }
    renderLive(typedText(), elapsed);
  }, 200);
}

function onInput() {
  if (state.phase === 'done') return;
  const typed = typedText();
  if (state.phase === 'idle' && typed.length > 0) startRun();
  ensureTarget(typed.length);
  paint(typed);
  const elapsed = state.phase === 'running' ? performance.now() - state.start : 0;
  renderLive(typed, elapsed);
}

function describeWpm(wpm, acc) {
  let level;
  if (wpm < 15) level = 'Yeni başlıyorsunuz; bu çok normal. Önce doğruluğa ve doğru parmak yerleşimine odaklanın.';
  else if (wpm < 30) level = 'Gelişmekte olan bir hızdasınız. Düzenli kısa çalışmalarla hızla yukarı çıkar.';
  else if (wpm < 45) level = 'Günlük kullanım için rahat bir hızdasınız; genel bilgiye göre çoğu yetişkin bu aralıkta yazar.';
  else if (wpm < 65) level = 'İyi bir hız. Ekrana bakarak yazmaya devam ediyorsanız on parmak çalışması sizi daha da öne çıkarır.';
  else if (wpm < 90) level = 'Çok iyi. Profesyonel düzeyde bir yazma hızına yaklaşıyorsunuz.';
  else level = 'Olağanüstü hız. Doğruluğunuzu da korumak artık asıl hedef olabilir.';
  if (acc < 92) level += ' Doğruluk oranınız düşük; hata yapınca hız kazanmak yerine biraz yavaşlayıp temiz yazmak net hızınızı artırır.';
  return level;
}

function finish() {
  if (state.phase !== 'running') return;
  clearTimers();
  state.phase = 'done';
  const typed = typedText();
  const r = compute(typed, state.duration * 1000);
  r.words = correctWords(typed);
  r.wpmInt = Math.round(r.wpm);
  r.kpmInt = Math.round(r.kpm);
  r.accRounded = Math.round(r.acc * 10) / 10;
  state.lastResult = r;
  renderLive(typed, state.duration * 1000);
  el.time.textContent = '0';
  el.input.readOnly = true;
  el.input.blur();

  const isNew = saveBest(r);
  el.resTitle.textContent = 'Süre doldu';
  el.resWpm.textContent = String(r.wpmInt);
  el.resKpm.textContent = String(r.kpmInt);
  el.resAcc.textContent = fmt1(r.acc);
  el.resWords.textContent = String(r.words);
  el.resWrong.textContent = String(r.wrong);
  el.resComment.textContent = describeWpm(r.wpm, r.acc);
  el.resNew.hidden = !isNew;
  el.copyStatus.textContent = '';
  el.result.classList.add('is-active');
  renderBest();
  el.result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// --- En iyi skor (localStorage) ---------------------------------------------

function saveBest(r) {
  if (r.wpmInt <= 0) return false;
  const all = safeGet(STORE_BEST) || {};
  const key = String(state.duration);
  const prev = all[key];
  if (prev && prev.wpm >= r.wpmInt) return false;
  all[key] = { wpm: r.wpmInt, kpm: r.kpmInt, acc: r.accRounded, mode: state.mode, date: new Date().toISOString().slice(0, 10) };
  safeSet(STORE_BEST, all);
  return true;
}

function renderBest() {
  const all = safeGet(STORE_BEST) || {};
  const b = all[String(state.duration)];
  el.bestLine.textContent = b
    ? `En iyi (${state.duration} sn): ${b.wpm} WPM · ${b.kpm} KPM · %${fmt1(b.acc)} doğruluk`
    : `${state.duration} sn için henüz kayıtlı skor yok.`;
}

// --- Ayarlar ve sıfırlama ---------------------------------------------------

function reset(focus) {
  clearTimers();
  state.phase = 'idle';
  state.lastResult = null;
  el.input.value = '';
  el.input.readOnly = false;
  el.result.classList.remove('is-active');
  el.target.scrollTop = 0;
  buildTarget();
  renderLive('', 0);
  renderBest();
  if (focus) el.input.focus();
}

function syncChips() {
  document.querySelectorAll('[data-duration]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.duration) === state.duration)));
  document.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
  el.asciiOpt.checked = state.turkish;
}

function saveOpts() {
  safeSet(STORE_OPTS, { duration: state.duration, mode: state.mode, turkish: state.turkish });
}

document.querySelectorAll('[data-duration]').forEach((b) => b.addEventListener('click', () => {
  state.duration = Number(b.dataset.duration);
  syncChips(); saveOpts(); reset(true);
}));
document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
  state.mode = b.dataset.mode;
  syncChips(); saveOpts(); reset(true);
}));
el.asciiOpt.addEventListener('change', () => {
  state.turkish = el.asciiOpt.checked;
  saveOpts(); reset(true);
});
el.restart.addEventListener('click', () => reset(true));
el.resAgain.addEventListener('click', () => reset(true));
el.resetBest.addEventListener('click', () => {
  try { localStorage.removeItem(STORE_BEST); } catch { /* özel gezinme modunda sessizce geç */ }
  renderBest();
});

el.target.addEventListener('click', () => { if (state.phase !== 'done') el.input.focus(); });

// Yazma alanı: yapıştır/sürükle/kes kapalı (hile yok); Enter satır eklemesin; Esc yeniden başlatır.
el.input.addEventListener('input', onInput);
['paste', 'drop', 'cut'].forEach((ev) => el.input.addEventListener(ev, (e) => e.preventDefault()));
el.input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') e.preventDefault();
  if (e.key === 'Escape') { e.preventDefault(); reset(false); }
});

// Sonucu paylaşım metni olarak panoya kopyala.
el.resCopy.addEventListener('click', async () => {
  const r = state.lastResult;
  if (!r) return;
  const text = `Yazma hızı testinde ${state.duration} saniyede ${r.wpmInt} WPM (${r.kpmInt} karakter/dk), %${fmt1(r.acc)} doğrulukla yazdım. Sen de dene: ${SHARE_URL}`;
  try {
    await navigator.clipboard.writeText(text);
    el.copyStatus.textContent = 'Sonuç metni kopyalandı.';
  } catch {
    el.copyStatus.textContent = 'Kopyalanamadı; şu metni seçip kopyalayabilirsiniz: ' + text;
  }
});

// --- Başlangıç --------------------------------------------------------------

const saved = safeGet(STORE_OPTS);
if (saved) {
  if (DURATIONS.includes(saved.duration)) state.duration = saved.duration;
  if (saved.mode === 'words' || saved.mode === 'text') state.mode = saved.mode;
  if (typeof saved.turkish === 'boolean') state.turkish = saved.turkish;
}
syncChips();
reset(false);
document.documentElement.dataset.ready = '1';
