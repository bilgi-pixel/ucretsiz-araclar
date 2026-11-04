// Tepki Süresi ve Refleks Testi: renk değişince tıkla, hedef vurma, sayı sırası.
// Tamamen istemci tarafı: ağ isteği yok; en iyi sonuçlar yalnızca bu cihazın localStorage'ında tutulur.

const STORE_BEST = 'oyun-tepki-suresi-testi:best';
const SHARE_URL = 'https://araclar.bilisimajans.com/oyunlar/tepki-suresi-testi/';
const RX_TRIALS = 5;           // renk testinde deneme sayısı
const RX_MIN_WAIT = 1500;      // yeşile dönmeden önce en az bekleme (ms)
const RX_WAIT_SPREAD = 2500;   // üstüne eklenen rastgele süre (ms) → 1,5-4 sn
const HV_DURATION = 30000;     // hedef vurma süresi (ms)
const HV_SIZE = 56;            // hedef çapı (px) - dokunmatik için en az 44
const NM_COUNT = 25;           // sayı sırası: 1-25

const $ = (id) => document.getElementById(id);
const el = {
  pad: $('rx-pad'), big: $('rx-big'), sub: $('rx-sub'), status: $('rx-status'), trials: $('rx-trials'),
  arena: $('hv-arena'), hvOverlay: $('hv-overlay'), hvStart: $('hv-start'), hvTime: $('hv-time'), hvHits: $('hv-hits'), hvMiss: $('hv-miss'), hvAvg: $('hv-avg'),
  grid: $('nm-grid'), nmStart: $('nm-start'), nmTime: $('nm-time'), nmNext: $('nm-next'), nmMiss: $('nm-miss'), nmHint: $('nm-hint'),
  result: $('result'), resTitle: $('res-title'), resMain: $('res-main'), resDetail: $('res-detail'), resComment: $('res-comment'), resNote: $('res-note'),
  resNew: $('res-new'), resShare: $('res-share'), resCopy: $('res-copy'), resAgain: $('res-again'), copyStatus: $('copy-status'),
  bestReaction: $('best-reaction'), bestTarget: $('best-target'), bestNumber: $('best-number'), resetBest: $('reset-best'),
};

let mode = 'reaction';
let lastMode = 'reaction';

// --- Yardımcılar -------------------------------------------------------------

const fmtSec = (x) => x.toFixed(2).replace('.', ',');
const rand = (a, b) => a + Math.random() * (b - a);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function safeGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* özel gezinme modunda sessizce geç */ }
}

// Basma olayı: dokunma/fare için pointerdown (click'ten ~50-100 ms önce gelir, ölçüm daha doğru olur),
// klavye için Boşluk/Enter keydown'ı. Arkadan gelen click aynı basışı ikinci kez saymasın diye bastırılır.
function bindPress(node, fn) {
  let suppress = false;
  node.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    suppress = true;
    fn(e);
  });
  node.addEventListener('click', (e) => {
    if (suppress) { suppress = false; return; }
    fn(e);
  });
  node.addEventListener('pointerup', () => setTimeout(() => { suppress = false; }, 400));
  node.addEventListener('pointercancel', () => { suppress = false; });
  node.addEventListener('keydown', (e) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault(); // tarayıcının kendi click'ini üretmesini engelle
    if (!e.repeat) fn(e);
  });
  node.addEventListener('keyup', (e) => { if (e.key === ' ') e.preventDefault(); });
}

// --- En iyi sonuçlar ---------------------------------------------------------

const loadBest = () => safeGet(STORE_BEST) || {};

// kind: reaction (ms, düşük iyi), target (isabet, yüksek iyi), number (sn, düşük iyi). Yeni rekor mu döner.
function updateBest(kind, value) {
  const all = loadBest();
  const prev = all[kind];
  const better = prev == null || (kind === 'target' ? value > prev : value < prev);
  if (better) { all[kind] = value; safeSet(STORE_BEST, all); }
  renderBest();
  return better;
}

function renderBest() {
  const b = loadBest();
  el.bestReaction.textContent = b.reaction != null ? `${b.reaction} ms` : '–';
  el.bestTarget.textContent = b.target != null ? `${b.target} isabet` : '–';
  el.bestNumber.textContent = b.number != null ? `${fmtSec(b.number)} sn` : '–';
}

// --- Ortak sonuç kutusu ------------------------------------------------------

function showResult({ title, main, detail, comment, note, share, isNew }) {
  el.resTitle.textContent = title;
  el.resMain.textContent = main;
  el.resDetail.textContent = detail;
  el.resComment.textContent = comment;
  el.resNote.textContent = note;
  el.resShare.textContent = share;
  el.resNew.hidden = !isNew;
  el.copyStatus.textContent = '';
  el.result.classList.add('is-active');
  el.result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
const hideResult = () => el.result.classList.remove('is-active');

el.resCopy.addEventListener('click', async () => {
  const text = el.resShare.textContent || '';
  try {
    await navigator.clipboard.writeText(text);
    el.copyStatus.textContent = 'Paylaşım metni kopyalandı.';
  } catch {
    el.copyStatus.textContent = 'Kopyalanamadı; yukarıdaki metni seçip kopyalayabilirsiniz.';
  }
});
el.resAgain.addEventListener('click', () => {
  hideResult();
  if (lastMode === 'reaction') { rxReset(); el.pad.focus(); }
  if (lastMode === 'target') hvStart();
  if (lastMode === 'number') nmStart();
});

// --- 1) Renk değişince tıkla -------------------------------------------------

const rx = { state: 'idle', trials: [], timer: 0, goAt: 0 };

function rxRender(state, big, sub) {
  rx.state = state;
  el.pad.dataset.state = state;
  el.big.textContent = big;
  el.sub.textContent = sub;
  el.status.textContent = big; // ekran okuyucuya durum değişimini bildir
}

function rxRenderTrials() {
  el.trials.querySelectorAll('li').forEach((li, i) => {
    const v = rx.trials[i];
    li.querySelector('b').textContent = v != null ? String(v) : '–';
    li.classList.toggle('is-set', v != null);
  });
}

function rxReset() {
  clearTimeout(rx.timer);
  rx.trials = [];
  rxRenderTrials();
  rxRender('idle', 'Başlamak için tıklayın', `${RX_TRIALS} denemenin ortalaması alınır. Fare, dokunma, Boşluk ya da Enter kullanabilirsiniz.`);
}

function rxWait() {
  hideResult();
  rxRender('waiting', 'Bekleyin...', 'Ekran yeşile dönünce hemen tıklayın.');
  clearTimeout(rx.timer);
  rx.timer = setTimeout(rxGo, RX_MIN_WAIT + Math.random() * RX_WAIT_SPREAD);
}

function rxGo() {
  rxRender('go', 'ŞİMDİ TIKLAYIN!', 'Yeşil oldu.');
  rx.goAt = performance.now(); // renk değişimiyle aynı anda başlar
}

function rxPress() {
  if (mode !== 'reaction') return;
  switch (rx.state) {
    case 'idle':
    case 'result':
    case 'early':
      rxWait();
      break;
    case 'done':
      rx.trials = [];
      rxRenderTrials();
      rxWait();
      break;
    case 'waiting': {
      // Erken tıklama: deneme sayılmaz, uyarı gösterilir.
      clearTimeout(rx.timer);
      rxRender('early', 'Çok erken!', 'Yeşil olmadan tıkladınız. Bu deneme sayılmadı; yeniden denemek için tıklayın.');
      break;
    }
    case 'go': {
      const ms = Math.max(1, Math.round(performance.now() - rx.goAt));
      rx.trials.push(ms);
      rxRenderTrials();
      if (rx.trials.length < RX_TRIALS) {
        rxRender('result', `${ms} ms`, `Deneme ${rx.trials.length}/${RX_TRIALS}. Sonraki denemeyi başlatmak için tıklayın.`);
      } else {
        rxFinish();
      }
      break;
    }
    default:
  }
}

// Kabaca yüzdelik kıyas: çevrim içi tepki testlerinde yaygın bildirilen dağılımlara dayanan genel bilgi.
function reactionRank(ms) {
  const bands = [
    [180, 95, 'Çok hızlısınız; yaygın görsel tepki sürelerinin alt ucundasınız.'],
    [210, 80, 'Hızlısınız.'],
    [240, 60, 'Ortalamanın biraz üzerindesiniz.'],
    [270, 45, 'Ortalamaya yakınsınız.'],
    [310, 30, 'Ortalamanın biraz altındasınız.'],
    [380, 15, 'Biraz yavaş çıktı; yorgunluk, dikkat dağınıklığı ya da gecikmeli ekran ve fare sonucu etkileyebilir.'],
    [Infinity, 5, 'Yavaş çıktı; dikkatinizi toplayıp tekrar deneyin, ekran ve cihaz gecikmesi de sonucu uzatabilir.'],
  ];
  const [, pct, text] = bands.find(([max]) => ms <= max);
  return `${text} Kabaca, çevrim içi testlere katılanların yaklaşık %${pct} kadarından daha hızlısınız.`;
}

function rxFinish() {
  const sum = rx.trials.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / rx.trials.length);
  const best = Math.min(...rx.trials);
  const worst = Math.max(...rx.trials);
  rxRender('done', `Ortalama: ${avg} ms`, 'Yeni bir set başlatmak için tıklayın.');
  lastMode = 'reaction';
  const isNew = updateBest('reaction', avg);
  showResult({
    title: 'Tepki süresi sonucunuz',
    main: `${avg} ms`,
    detail: `En iyi deneme: ${best} ms · En yavaş: ${worst} ms · Denemeler: ${rx.trials.join(', ')} ms`,
    comment: reactionRank(avg),
    note: 'Genel bilgi: ortalama insanın görsel uyarana tepki süresi yaklaşık 250 ms olarak bildirilir. Ekran yenileme hızı, fare ya da dokunmatik gecikmesi ve tarayıcı sonucu birkaç on milisaniye değiştirebilir. Bu test eğlence amaçlıdır; tıbbi ya da bilimsel bir ölçüm değildir.',
    share: `Tepki süresi testinde ${RX_TRIALS} denemenin ortalaması ${avg} ms çıktı (ortalama insan yaklaşık 250 ms). Sen de dene: ${SHARE_URL}`,
    isNew,
  });
}

bindPress(el.pad, rxPress);

// --- 2) Hedef vurma ----------------------------------------------------------

const hv = { running: false, hits: 0, miss: 0, sumRt: 0, startAt: 0, endTimer: 0, tick: 0, spawnTimer: 0, ttlTimer: 0, cur: null, shownAt: 0, lastX: -999, lastY: -999 };

function hvRender() {
  el.hvHits.textContent = String(hv.hits);
  el.hvMiss.textContent = String(hv.miss);
  el.hvAvg.textContent = hv.hits ? `${Math.round(hv.sumRt / hv.hits)} ms` : '–';
  const left = hv.running ? Math.max(0, Math.ceil((HV_DURATION - (performance.now() - hv.startAt)) / 1000)) : HV_DURATION / 1000;
  el.hvTime.textContent = String(left);
}

function hvClearTimers() {
  clearTimeout(hv.endTimer);
  clearInterval(hv.tick);
  clearTimeout(hv.spawnTimer);
  clearTimeout(hv.ttlTimer);
}

function hvRemoveTarget() {
  if (hv.cur) { hv.cur.remove(); hv.cur = null; }
}

function hvReset() {
  hvClearTimers();
  hvRemoveTarget();
  hv.running = false;
  hv.hits = 0; hv.miss = 0; hv.sumRt = 0;
  el.hvOverlay.hidden = false;
  el.hvStart.textContent = 'Başla';
  hvRender();
}

function hvStart() {
  if (hv.running) { hvReset(); return; } // çalışırken basılırsa sıfırla
  hvReset();
  hideResult();
  lastMode = 'target';
  hv.running = true;
  hv.startAt = performance.now();
  el.hvOverlay.hidden = true;
  el.hvStart.textContent = 'Sıfırla';
  hv.endTimer = setTimeout(hvEnd, HV_DURATION);
  hv.tick = setInterval(hvRender, 200);
  hv.spawnTimer = setTimeout(hvSpawn, 500);
  hvRender();
}

function hvSpawn() {
  if (!hv.running) return;
  const W = el.arena.clientWidth;
  const H = el.arena.clientHeight;
  let x = 0, y = 0;
  // Bir öncekinden belirgin biçimde uzakta bir konum seç.
  for (let i = 0; i < 12; i++) {
    x = rand(4, Math.max(5, W - HV_SIZE - 4));
    y = rand(4, Math.max(5, H - HV_SIZE - 4));
    if (Math.hypot(x - hv.lastX, y - hv.lastY) > 90) break;
  }
  hv.lastX = x; hv.lastY = y;
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'tp-target';
  b.setAttribute('aria-label', 'Hedef');
  b.style.left = `${Math.round(x)}px`;
  b.style.top = `${Math.round(y)}px`;
  bindPress(b, (e) => hvHit(b, e));
  el.arena.append(b);
  hv.cur = b;
  hv.shownAt = performance.now();
  b.focus({ preventScroll: true }); // klavye kullanıcıları Boşluk/Enter ile vurabilsin
  // Süre ilerledikçe hedefin ekranda kalma süresi kısalır (1,7 sn → 0,95 sn).
  const progress = Math.min(1, (performance.now() - hv.startAt) / HV_DURATION);
  hv.ttlTimer = setTimeout(hvTimeout, 1700 - 750 * progress);
}

function hvHit(btn, e) {
  if (!hv.running || btn !== hv.cur) return;
  if (e && e.stopPropagation) e.stopPropagation();
  clearTimeout(hv.ttlTimer);
  hv.hits++;
  hv.sumRt += performance.now() - hv.shownAt;
  hvRemoveTarget();
  hvRender();
  hv.spawnTimer = setTimeout(hvSpawn, rand(120, 350));
}

// Hedef süresi dolup kaçtı: ıskalama sayılır.
function hvTimeout() {
  if (!hv.running || !hv.cur) return;
  hv.miss++;
  hvRemoveTarget();
  hvRender();
  hv.spawnTimer = setTimeout(hvSpawn, 150);
}

// Boş alana basış da ıskalamadır.
el.arena.addEventListener('pointerdown', (e) => {
  if (!hv.running || e.target.closest('.tp-target')) return;
  hv.miss++;
  hvRender();
});

function hvScale(hits) {
  if (hits < 15) return 'Isınma turu gibi. Fareyi ya da parmağınızı hedeflerin ortasına yaklaştırarak başlayın; ritim bulunca sayı hızla artar.';
  if (hits < 25) return 'İyi bir sonuç. Gözünüzü bir sonraki hedefin çıkacağı yere değil, ekranın ortasına sabitleyin.';
  if (hits < 35) return 'Hızlı bir sonuç. Iskalama sayınızı düşürerek ortalamayı daha da iyileştirebilirsiniz.';
  return 'Çok hızlı bir sonuç. Bu oyuna özgü kabaca bir ölçekle üst düzeydesiniz.';
}

function hvEnd() {
  if (!hv.running) return;
  hvClearTimers();
  hvRemoveTarget();
  hv.running = false;
  el.hvStart.textContent = 'Başla';
  el.hvOverlay.hidden = false;
  hvRender();
  el.hvTime.textContent = '0';
  const avg = hv.hits ? Math.round(hv.sumRt / hv.hits) : 0;
  const total = hv.hits + hv.miss;
  const acc = total ? Math.round((hv.hits / total) * 100) : 0;
  const isNew = hv.hits > 0 ? updateBest('target', hv.hits) : false;
  lastMode = 'target';
  showResult({
    title: 'Hedef vurma sonucunuz',
    main: `${hv.hits} isabet`,
    detail: `Ortalama vurma süresi: ${hv.hits ? avg + ' ms' : '–'} · Iskalama: ${hv.miss} · İsabet oranı: %${acc}`,
    comment: hvScale(hv.hits),
    note: 'Bu değerlendirme yalnızca bu oyuna özgü kabaca bir ölçektir; cihazınıza, fare ya da dokunmatik ekranınıza göre değişir. Eğlence amaçlıdır.',
    share: `Hedef vurma oyununda 30 saniyede ${hv.hits} hedefe vurdum (ortalama ${hv.hits ? avg : '-'} ms, isabet oranı %${acc}). Sen de dene: ${SHARE_URL}`,
    isNew,
  });
}

el.hvStart.addEventListener('click', hvStart);

// --- 3) Sayı sırası (1-25) ---------------------------------------------------

const nm = { running: false, next: 1, miss: 0, startAt: 0, tick: 0 };

function nmRenderHud(ms) {
  el.nmTime.textContent = fmtSec(ms / 1000);
  el.nmNext.textContent = nm.running ? String(nm.next) : (nm.next > NM_COUNT ? '–' : '1');
  el.nmMiss.textContent = String(nm.miss);
}

function nmPlaceholder() {
  el.grid.textContent = '';
  el.grid.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < NM_COUNT; i++) {
    const c = document.createElement('span');
    c.className = 'tp-cell tp-cell-empty';
    c.textContent = '?';
    el.grid.append(c);
  }
}

function nmReset() {
  clearInterval(nm.tick);
  nm.running = false;
  nm.next = 1;
  nm.miss = 0;
  nmPlaceholder();
  el.nmStart.textContent = 'Başla';
  el.nmHint.textContent = 'Başla\'ya basınca 1-25 arası sayılar karışık dizilir. Sırayla, en hızlı biçimde tıklayın.';
  nmRenderHud(0);
}

function nmStart() {
  if (nm.running) { nmReset(); return; }
  nmReset();
  hideResult();
  lastMode = 'number';
  el.grid.textContent = '';
  el.grid.removeAttribute('aria-hidden');
  const nums = shuffle(Array.from({ length: NM_COUNT }, (_, i) => i + 1));
  nums.forEach((n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'tp-cell';
    b.dataset.n = String(n);
    b.textContent = String(n);
    b.setAttribute('aria-label', `Sayı ${n}`);
    bindPress(b, () => nmPress(b, n));
    el.grid.append(b);
  });
  nm.running = true;
  nm.startAt = performance.now();
  nm.tick = setInterval(() => nmRenderHud(performance.now() - nm.startAt), 50);
  el.nmStart.textContent = 'Sıfırla';
  el.nmHint.textContent = 'Sıradaki sayıyı bulun.';
  nmRenderHud(0);
}

function nmPress(btn, n) {
  if (!nm.running || btn.classList.contains('done')) return;
  if (n === nm.next) {
    btn.classList.add('done');
    btn.setAttribute('aria-disabled', 'true');
    nm.next++;
    if (nm.next > NM_COUNT) { nmEnd(); return; }
    nmRenderHud(performance.now() - nm.startAt);
  } else {
    // Yanlış sayı: ceza süresi yok, yalnızca görsel uyarı ve hata sayacı.
    nm.miss++;
    btn.classList.remove('shake');
    void btn.offsetWidth; // animasyonu yeniden tetikle
    btn.classList.add('shake');
    nmRenderHud(performance.now() - nm.startAt);
  }
}

function nmScale(sec) {
  if (sec <= 15) return 'Çok hızlı bir tarama. Bu oyuna özgü kabaca bir ölçekle üst düzeydesiniz.';
  if (sec <= 22) return 'Hızlı bir sonuç. Gözünüzü tahtanın ortasında tutup çevresel görüşle sıradaki sayıyı aramayı deneyin.';
  if (sec <= 32) return 'Ortalama civarında bir sonuç. Sayıları satır satır taramak yerine sıradakini tahtanın tamamında aramak süreyi kısaltabilir.';
  return 'Acele etmenize gerek yok. Birkaç tekrarda gözünüzün tarama düzeni oturur ve süre belirgin biçimde kısalır.';
}

function nmEnd() {
  const elapsed = performance.now() - nm.startAt;
  clearInterval(nm.tick);
  nm.running = false;
  const sec = Math.round(elapsed / 10) / 100;
  nmRenderHud(elapsed);
  el.nmStart.textContent = 'Başla';
  el.nmHint.textContent = 'Tamamlandı.';
  lastMode = 'number';
  const isNew = updateBest('number', sec);
  showResult({
    title: 'Sayı sırası sonucunuz',
    main: `${fmtSec(sec)} sn`,
    detail: `1-${NM_COUNT} arası tüm sayılar tamamlandı · Yanlış tıklama: ${nm.miss}`,
    comment: nmScale(sec),
    note: 'Bu değerlendirme yalnızca bu oyuna özgü kabaca bir ölçektir; ekran boyutu ve cihaz sonucu etkiler. Eğlence amaçlıdır, tıbbi bir ölçüm değildir.',
    share: `Sayı sırası testinde 1-${NM_COUNT} arası sayıları ${fmtSec(sec)} saniyede bitirdim (${nm.miss} yanlış tıklama). Sen de dene: ${SHARE_URL}`,
    isNew,
  });
}

el.nmStart.addEventListener('click', nmStart);

// --- Mod seçimi --------------------------------------------------------------

function setMode(m) {
  mode = m;
  rxReset();
  hvReset();
  nmReset();
  hideResult();
  document.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== m; });
  lastMode = m;
}
document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));

el.resetBest.addEventListener('click', () => {
  try { localStorage.removeItem(STORE_BEST); } catch { /* sessizce geç */ }
  renderBest();
});

// --- Başlangıç ---------------------------------------------------------------

setMode('reaction');
renderBest();
document.documentElement.dataset.ready = '1';
