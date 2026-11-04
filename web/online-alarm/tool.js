import { showError } from '../assets/js/ba.js';

// Online alarm: alarmlar yalnızca bu tarayıcının localStorage'ında ("ba-online-alarm") durur,
// hiçbir yere gönderilmez. Ses Web Audio ile üretilir (dış ses dosyası yok).
// Alarm ancak sekme açık ve cihaz uyanıkken çalar; bu sınır sayfada açıkça belirtilir.

const $ = (id) => document.getElementById(id);
const baseTitle = document.title;
const STORE_KEY = 'ba-online-alarm';
const MAX_ALARMS = 20;
const NAME_MAX = 40;
const SNOOZE_MS = 5 * 60 * 1000;
const pad = (n, l = 2) => String(Math.floor(n)).padStart(l, '0');

/* ---------- Ses desenleri (Web Audio ile üretilir) ---------- */
// Her not: f = frekans (Hz), f2 = isteğe bağlı kayma hedefi, t = başlangıç (sn), d = süre (sn), g = ses payı.
const SOUNDS = {
  klasik: {
    name: 'Klasik zil',
    duration: 1.2,
    build() {
      const notes = [];
      for (let i = 0; i < 8; i++) notes.push({ f: i % 2 ? 880 : 1175, t: i * 0.15, d: 0.12, type: 'triangle', g: 0.55 });
      return notes;
    },
  },
  melodi: {
    name: 'Yumuşak melodi',
    duration: 2.6,
    build() {
      return [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 783.99, 1046.5]
        .map((f, i) => ({ f, t: i * 0.3, d: 0.5, type: 'sine', g: 0.45 }));
    },
  },
  dijital: {
    name: 'Dijital bip',
    duration: 1.7,
    build() {
      const notes = [];
      for (let group = 0; group < 2; group++) {
        for (let i = 0; i < 4; i++) notes.push({ f: 1400, t: group * 1.0 + i * 0.2, d: 0.1, type: 'square', g: 0.18 });
      }
      return notes;
    },
  },
  siren: {
    name: 'Uyandırıcı siren',
    duration: 3.2,
    build() {
      const notes = [];
      for (let i = 0; i < 4; i++) {
        notes.push({ f: i % 2 ? 1300 : 650, f2: i % 2 ? 650 : 1300, t: i * 0.8, d: 0.8, type: 'sawtooth', g: 0.22 });
      }
      return notes;
    },
  },
};
const hasSound = (id) => Object.prototype.hasOwnProperty.call(SOUNDS, id);

/* ---------- Saf yardımcılar (test için dışa açık) ---------- */

/** "HH:MM" → bir sonraki o saatin zaman damgası (bugün geçtiyse yarın). */
export function nextOccurrence(hhmm, now = Date.now()) {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  if (d.getTime() <= now) d.setDate(d.getDate() + 1);
  return d.getTime();
}
/** ms → "SS:DD:SN" (yukarı yuvarlar: 0,4 sn kaldıysa 00:00:01). */
export function formatRemaining(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${pad(total / 3600)}:${pad((total % 3600) / 60)}:${pad(total % 60)}`;
}
export function hhmm(ts) {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
/** Zaman damgası için "Bugün" / "Yarın" / "GG.AA" etiketi. */
export function dayLabel(at, now = Date.now()) {
  const dayStart = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const d = new Date(at);
  const diff = Math.round((dayStart(d) - dayStart(new Date(now))) / 86400000);
  if (diff === 0) return 'Bugün';
  if (diff === 1) return 'Yarın';
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;
}
/** Kayıtlı veriyi doğrular; yapı bozuksa null döner, tek tek bozuk alarmlar atlanır. */
export function sanitizeStore(raw) {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.alarms)) return null;
  const alarms = [];
  const seen = new Set();
  for (const a of raw.alarms) {
    if (alarms.length >= MAX_ALARMS) break;
    if (!a || typeof a !== 'object') continue;
    if (typeof a.id !== 'string' || !a.id || seen.has(a.id)) continue;
    if (typeof a.time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(a.time)) continue;
    if (typeof a.at !== 'number' || !Number.isFinite(a.at)) continue;
    seen.add(a.id);
    alarms.push({
      id: a.id.slice(0, 40),
      time: a.time,
      at: a.at,
      name: typeof a.name === 'string' ? a.name.slice(0, NAME_MAX) : '',
      sound: hasSound(a.sound) ? a.sound : 'klasik',
      enabled: a.enabled === true,
      snoozed: a.snoozed === true,
      missed: a.missed === true,
    });
  }
  const s = raw.settings && typeof raw.settings === 'object' ? raw.settings : {};
  const vol = typeof s.volume === 'number' && Number.isFinite(s.volume) ? Math.min(100, Math.max(0, Math.round(s.volume))) : 70;
  return { alarms, settings: { sound: hasSound(s.sound) ? s.sound : 'klasik', volume: vol, notify: s.notify === true } };
}

/* ---------- Durum ve kalıcılık ---------- */
const state = { alarms: [], settings: { sound: 'klasik', volume: 70, notify: false } };
const ringing = []; // çalan alarmların id'leri, çalma sırasıyla
let storageBlocked = false;

function setInfo(text) { $('al-info').textContent = text; }

function loadStore() {
  let notice = '';
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      let parsed = null;
      try { parsed = JSON.parse(raw); } catch { parsed = null; }
      const clean = sanitizeStore(parsed);
      if (clean) {
        state.alarms = clean.alarms;
        state.settings = clean.settings;
      } else {
        notice = 'Kayıtlı alarm verisi okunamadı, liste sıfırlandı. Alarmlarınızı yeniden kurabilirsiniz.';
      }
    }
  } catch {
    storageBlocked = true;
    notice = 'Tarayıcı yerel depolamaya izin vermiyor. Alarmlar sayfa açıkken çalışır ama sayfayı yenilediğinizde kaybolur; site verisi ayarlarını kontrol edin.';
  }
  // Sayfa kapalıyken zamanı gelen alarmlar çalamaz; "kaçırıldı" olarak işaretlenir.
  const now = Date.now();
  let missed = 0;
  for (const a of state.alarms) {
    if (a.enabled && a.at <= now) { a.enabled = false; a.snoozed = false; a.missed = true; missed += 1; }
  }
  if (missed) {
    notice = `Sayfa kapalıyken zamanı gelen ${missed} alarm çalamadı. Listede "Kaçırıldı" olarak görünür; yeniden kurabilirsiniz.`;
  }
  if (notice) setInfo(notice);
  return notice;
}

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ v: 1, alarms: state.alarms, settings: state.settings }));
  } catch {
    if (!storageBlocked) {
      storageBlocked = true;
      setInfo('Alarmlar bu tarayıcıda saklanamadı; sayfa açıkken çalışır ama yenilediğinizde kaybolur.');
    }
  }
}

/* ---------- Ses motoru ---------- */
let audioCtx = null;

function ensureAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) {
      audioCtx = new AC();
      audioCtx.addEventListener('statechange', updateAudioNotes);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
    updateAudioNotes();
    return audioCtx;
  } catch {
    return null;
  }
}
// Tarayıcı otomatik oynatma kuralı: ses yalnızca kullanıcı etkileşiminden sonra açılır.
['pointerdown', 'keydown', 'touchstart'].forEach((t) => document.addEventListener(t, ensureAudio, { passive: true }));

function updateAudioNotes() {
  let text;
  if (!audioCtx) text = 'Ses: henüz etkin değil. Sayfaya bir kez tıklayın ya da dokunun; tarayıcılar sesi ancak bundan sonra çalmaya izin verir.';
  else if (audioCtx.state === 'running') text = 'Ses: hazır.';
  else text = 'Ses: tarayıcı engelliyor. Sayfaya tıklayın ya da dokunun; cihazın sesini ve sekmenin sessize alınmadığını kontrol edin.';
  if ($('al-audio').textContent !== text) $('al-audio').textContent = text;
  if (!$('ring').hidden) {
    const ringText = audioCtx && audioCtx.state === 'running'
      ? 'Ses çalıyor.'
      : 'Tarayıcı sesi engelledi; duyamıyorsanız ekrana dokunun. Ekran ve sekme başlığı uyarısı sürüyor.';
    if ($('ring-audio').textContent !== ringText) $('ring-audio').textContent = ringText;
  }
}

let player = null; // { master, timer, stopped, soundId }

function playPattern(ctx, out, soundId, t0) {
  const spec = SOUNDS[soundId];
  for (const n of spec.build()) {
    const start = t0 + n.t;
    const end = start + n.d;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = n.type;
    osc.frequency.setValueAtTime(n.f, start);
    if (n.f2) osc.frequency.linearRampToValueAtTime(n.f2, end);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(n.g, start + 0.015);
    gain.gain.setValueAtTime(n.g, Math.max(start + 0.015, end - 0.03));
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(gain).connect(out);
    osc.start(start);
    osc.stop(end + 0.02);
  }
  return spec.duration;
}

function stopSound() {
  if (!player) return;
  const p = player;
  player = null;
  p.stopped = true;
  clearTimeout(p.timer);
  try {
    p.master.gain.setTargetAtTime(0, audioCtx.currentTime, 0.02);
    setTimeout(() => { try { p.master.disconnect(); } catch { /* yoksay */ } }, 200);
  } catch { /* yoksay */ }
}

/** Deseni çalar; loop true ise alarm kapatılana kadar tekrarlar. */
function startSound(soundId, loop) {
  stopSound();
  const ctx = ensureAudio();
  if (!ctx) return false;
  try {
    const master = ctx.createGain();
    master.gain.value = state.settings.volume / 100;
    master.connect(ctx.destination);
    const p = { master, timer: 0, stopped: false, soundId };
    player = p;
    const run = () => {
      if (p.stopped) return;
      const dur = playPattern(ctx, master, soundId, ctx.currentTime + 0.05);
      if (loop) p.timer = setTimeout(run, (dur + 0.8) * 1000);
      else p.timer = setTimeout(() => { if (player === p) stopSound(); }, (dur + 0.3) * 1000);
    };
    run();
    return true;
  } catch {
    return false;
  }
}

/* ---------- Titreşim, bildirim, başlık ---------- */
function vibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch { /* yoksay */ }
}
function notifyRing(a) {
  if (!state.settings.notify) return;
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(a.name || 'Alarm', {
        body: `${displayTime(a)} alarmı çalıyor.`,
        tag: `ba-online-alarm-${a.id}`,
        requireInteraction: true,
      });
    }
  } catch { /* bildirim başarısızsa sessizce devam */ }
}
const displayTime = (a) => (a.snoozed ? hhmm(a.at) : a.time);
const alarmLabel = (a) => a.name || 'Alarm';

/* ---------- Çalma ekranı ---------- */
let alertTimer = 0;
let blinkTimer = 0;
let blinkOn = false;
let lastFocus = null;
const INERT_SELECTOR = '.ba-topbar, .ba-header, main, .ba-footer';

function ringingAlarm() {
  return ringing.length ? state.alarms.find((a) => a.id === ringing[0]) || null : null;
}

function fillRing(a) {
  $('ring-time').textContent = displayTime(a);
  $('ring-name').textContent = alarmLabel(a);
  $('ring').dataset.sound = a.sound;
  const extra = ringing.length - 1;
  $('ring-more').textContent = extra > 0 ? `Ayrıca ${extra} alarm daha çalıyor.` : '';
}

function startEffects(a) {
  startSound(a.sound, true);
  const pulse = () => vibrate([700, 300, 700, 300, 700]);
  pulse();
  clearInterval(alertTimer);
  alertTimer = setInterval(pulse, 3000);
  // Sekme başlığı yanıp söner: arka plandaki kullanıcı da fark eder.
  clearInterval(blinkTimer);
  blinkOn = true;
  document.title = `⏰ ALARM – ${alarmLabel(a)}`;
  blinkTimer = setInterval(() => {
    blinkOn = !blinkOn;
    const cur = ringingAlarm();
    document.title = blinkOn && cur ? `⏰ ALARM – ${alarmLabel(cur)}` : baseTitle;
  }, 1000);
}

function stopEffects() {
  stopSound();
  clearInterval(alertTimer);
  clearInterval(blinkTimer);
  alertTimer = 0;
  blinkTimer = 0;
  vibrate(0);
  document.title = baseTitle;
  lastTitle = baseTitle;
}

function refreshRing() {
  const a = ringingAlarm();
  const ring = $('ring');
  if (!a) {
    if (!ring.hidden) {
      ring.hidden = true;
      document.documentElement.classList.remove('ao-lock');
      document.querySelectorAll(INERT_SELECTOR).forEach((el) => { el.inert = false; });
      stopEffects();
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
      lastFocus = null;
    }
    return;
  }
  fillRing(a);
  if (ring.hidden) {
    lastFocus = document.activeElement;
    ring.hidden = false;
    document.documentElement.classList.add('ao-lock');
    document.querySelectorAll(INERT_SELECTOR).forEach((el) => { el.inert = true; });
    startEffects(a);
    $('ring-close').focus();
  } else if (!player || player.soundId !== a.sound) {
    startSound(a.sound, true); // sıradaki alarmın sesi farklıysa geç
  }
  updateAudioNotes();
}

function dismissRinging() {
  const a = ringingAlarm();
  if (!a) return;
  ringing.shift();
  a.enabled = false;
  a.snoozed = false;
  a.missed = false;
  save();
  renderList();
  refreshRing();
  setInfo(`${displayTime(a)} alarmı kapatıldı. Yeniden kullanmak için listeden "Aç" düğmesine basın.`);
}

function snoozeRinging() {
  const a = ringingAlarm();
  if (!a) return;
  ringing.shift();
  a.at = Date.now() + SNOOZE_MS;
  a.snoozed = true;
  a.enabled = true;
  a.missed = false;
  save();
  renderList();
  refreshRing();
  setInfo(`Alarm 5 dakika ertelendi: ${hhmm(a.at)} saatinde yeniden çalacak.`);
}

$('ring-close').addEventListener('click', dismissRinging);
$('ring-snooze').addEventListener('click', snoozeRinging);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !$('ring').hidden) { e.preventDefault(); dismissRinging(); }
});

/* ---------- Alarm listesi ---------- */
function sortedAlarms() {
  return [...state.alarms].sort((a, b) => {
    if (a.enabled !== b.enabled) return a.enabled ? -1 : 1;
    return a.enabled ? a.at - b.at : a.time.localeCompare(b.time);
  });
}

function renderList() {
  const list = $('al-list');
  list.textContent = '';
  $('al-empty').hidden = state.alarms.length > 0;
  const now = Date.now();
  for (const a of sortedAlarms()) {
    const isRinging = ringing.includes(a.id);
    const li = document.createElement('li');
    li.className = 'al-item';
    li.dataset.id = a.id;
    li.classList.add(isRinging ? 'is-ringing' : a.enabled ? 'is-on' : a.missed ? 'is-missed' : 'is-off');

    const time = document.createElement('div');
    time.className = 'al-clock';
    time.textContent = displayTime(a);

    const meta = document.createElement('div');
    meta.className = 'al-meta';
    const name = document.createElement('strong');
    name.className = 'al-name';
    name.textContent = alarmLabel(a);
    const when = document.createElement('span');
    when.className = 'al-when';
    when.textContent = `${a.enabled ? dayLabel(a.at, now) : 'Kapalı'} · ${SOUNDS[a.sound].name}${a.snoozed ? ' · ertelendi' : ''}`;
    const left = document.createElement('span');
    left.className = 'al-left';
    meta.append(name, when, left);

    const actions = document.createElement('div');
    actions.className = 'al-actions';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ba-btn';
    toggle.dataset.act = a.enabled ? 'off' : 'on';
    toggle.textContent = a.enabled ? 'Kapat' : a.missed ? 'Yeniden kur' : 'Aç';
    toggle.setAttribute('aria-label', `${displayTime(a)} ${alarmLabel(a)} alarmını ${a.enabled ? 'kapat' : 'aç'}`);
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'ba-btn';
    del.dataset.act = 'delete';
    del.textContent = 'Sil';
    del.setAttribute('aria-label', `${displayTime(a)} ${alarmLabel(a)} alarmını sil`);
    actions.append(toggle, del);

    li.append(time, meta, actions);
    list.appendChild(li);
  }
  updateLive(now);
}

$('al-list').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const id = btn.closest('li').dataset.id;
  const a = state.alarms.find((x) => x.id === id);
  if (!a) return;
  showError($('error'), null);
  if (btn.dataset.act === 'delete') {
    state.alarms = state.alarms.filter((x) => x.id !== id);
    const idx = ringing.indexOf(id);
    if (idx >= 0) ringing.splice(idx, 1);
    setInfo('Alarm silindi.');
  } else if (btn.dataset.act === 'on') {
    ensureAudio();
    a.at = nextOccurrence(a.time);
    a.enabled = true;
    a.snoozed = false;
    a.missed = false;
    setInfo(`Alarm kuruldu: ${dayLabel(a.at)} ${a.time}.`);
  } else {
    a.enabled = false;
    a.snoozed = false;
    a.missed = false;
    const idx = ringing.indexOf(id);
    if (idx >= 0) ringing.splice(idx, 1);
    setInfo(`${a.time} alarmı kapatıldı.`);
  }
  save();
  renderList();
  refreshRing();
});

/** Her tikte yalnızca metinleri günceller; düğmelerin odağı bozulmaz. */
let lastTitle = baseTitle;
function updateLive(now) {
  let next = null;
  for (const a of state.alarms) {
    if (a.enabled && (!next || a.at < next.at)) next = a;
  }
  document.querySelectorAll('#al-list li').forEach((li) => {
    const a = state.alarms.find((x) => x.id === li.dataset.id);
    const left = li.querySelector('.al-left');
    if (!a || !left) return;
    const text = ringing.includes(a.id) ? 'Çalıyor' : a.enabled ? `Kalan ${formatRemaining(a.at - now)}` : a.missed ? 'Kaçırıldı: sayfa kapalıyken zamanı geçti' : '';
    if (left.textContent !== text) left.textContent = text;
  });
  const nextEl = $('al-next');
  const countEl = $('al-countdown');
  const nextText = next ? `Sonraki alarm: ${displayTime(next)} (${dayLabel(next.at, now)})${next.name ? ' · ' + next.name : ''}` : 'Kurulu alarm yok';
  const countText = next ? formatRemaining(next.at - now) : '--:--:--';
  if (nextEl.textContent !== nextText) nextEl.textContent = nextText;
  if (countEl.textContent !== countText) countEl.textContent = countText;
  // Çalmıyorsa sekme başlığında kalan süre görünür
  if (!ringing.length) {
    const title = next ? `${countText} – ${baseTitle}` : baseTitle;
    if (title !== lastTitle) { document.title = title; lastTitle = title; }
  }
}

/* ---------- Alarm kurma ---------- */
let quick = null; // { value: "HH:MM", at } — "+5 dk" gibi hızlı seçenekler saniye hassasiyetini korur

function addAlarm() {
  showError($('error'), null);
  const value = $('al-time').value;
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
    showError($('error'), 'Saat seçilmedi. Alarm saatini saat ve dakika olarak girin (örneğin 07:30) ya da aşağıdaki hızlı seçeneklerden birine basın.');
    return;
  }
  if (state.alarms.length >= MAX_ALARMS) {
    showError($('error'), `En fazla ${MAX_ALARMS} alarm kurabilirsiniz. Kullanmadığınız alarmları listeden silip yeniden deneyin.`);
    return;
  }
  const now = Date.now();
  const at = quick && quick.value === value && quick.at > now ? quick.at : nextOccurrence(value, now);
  const alarm = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    time: value,
    at,
    name: $('al-name').value.trim().slice(0, NAME_MAX),
    sound: $('al-sound').value,
    enabled: true,
    snoozed: false,
    missed: false,
  };
  state.alarms.push(alarm);
  quick = null;
  $('al-name').value = '';
  ensureAudio(); // tıklama bir kullanıcı etkileşimidir; ses buradan sonra çalabilir
  save();
  renderList();
  tick();
  setInfo(`Alarm kuruldu: ${dayLabel(at, now)} ${value}. Kalan süre ${formatRemaining(at - now)}. Alarm çalana kadar bu sekmeyi açık bırakın.`);
}
// Düğme form içinde "submit" türündedir: tıklama ve Enter aynı yoldan gelir, çift kurulum olmaz.
$('al-form').addEventListener('submit', (e) => { e.preventDefault(); addAlarm(); });
$('al-time').addEventListener('input', () => { quick = null; });

document.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => {
  const minutes = Number(b.dataset.add);
  const at = Date.now() + minutes * 60000;
  quick = { value: hhmm(at), at };
  $('al-time').value = quick.value;
  showError($('error'), null);
  setInfo(`${quick.value} seçildi (${minutes} dakika sonra). Kurmak için "Alarmı kur" düğmesine basın.`);
}));
document.querySelectorAll('[data-time]').forEach((b) => b.addEventListener('click', () => {
  quick = null;
  $('al-time').value = b.dataset.time;
  showError($('error'), null);
  setInfo(`${b.dataset.time} seçildi. Kurmak için "Alarmı kur" düğmesine basın.`);
}));

/* ---------- Ses ayarları ve önizleme ---------- */
$('al-sound').addEventListener('change', () => {
  state.settings.sound = $('al-sound').value;
  save();
});
$('al-volume').addEventListener('input', () => {
  const v = Number($('al-volume').value);
  state.settings.volume = Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 70;
  $('al-volume-out').textContent = `%${state.settings.volume}`;
  if (player) player.master.gain.value = state.settings.volume / 100;
});
$('al-volume').addEventListener('change', save);
$('al-preview').addEventListener('click', () => {
  showError($('error'), null);
  if (!startSound($('al-sound').value, false)) {
    showError($('error'), 'Bu tarayıcıda ses çalınamıyor. Güncel bir tarayıcı kullanın; alarm yine ekran ve sekme başlığı ile uyarır.');
  }
});

/* Bildirim izni: yalnızca kullanıcı kutuyu işaretleyince istenir; reddedilirse sessizce devam edilir. */
$('al-notify').addEventListener('change', async () => {
  const info = $('al-notify-info');
  info.textContent = '';
  if (!$('al-notify').checked) {
    state.settings.notify = false;
    save();
    return;
  }
  if (!('Notification' in window)) {
    $('al-notify').checked = false;
    info.textContent = 'Bu tarayıcı bildirimleri desteklemiyor; alarm ses, ekran uyarısı ve sekme başlığıyla çalar.';
    return;
  }
  try {
    if (Notification.permission === 'default') await Notification.requestPermission();
  } catch { /* yoksay */ }
  if (Notification.permission !== 'granted') {
    $('al-notify').checked = false;
    state.settings.notify = false;
    info.textContent = 'Bildirim izni verilmedi; alarm yine ses ve ekran uyarısıyla çalar. İsterseniz adres çubuğundaki site ayarlarından izin verip kutuyu yeniden işaretleyin.';
  } else {
    state.settings.notify = true;
    info.textContent = 'Bildirim açık: alarm çalınca masaüstünüzde de görünecek.';
  }
  save();
});

/* ---------- Zamanlayıcı döngüsü ---------- */
function tick() {
  const now = Date.now();
  let fired = false;
  for (const a of state.alarms) {
    // Zamanı gelmiş (ya da gecikmiş) her alarm çalar; "===" yerine ">=" tarayıcı gecikmelerine dayanıklıdır.
    if (a.enabled && now >= a.at && !ringing.includes(a.id)) {
      ringing.push(a.id);
      notifyRing(a);
      fired = true;
    }
  }
  if (fired) { renderList(); refreshRing(); }
  updateLive(now);
}
setInterval(tick, 500);
document.addEventListener('visibilitychange', tick);

/* ---------- Başlangıç ---------- */
function init() {
  const select = $('al-sound');
  for (const [id, spec] of Object.entries(SOUNDS)) {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = spec.name;
    select.appendChild(opt);
  }
  loadStore();
  select.value = state.settings.sound;
  $('al-volume').value = String(state.settings.volume);
  $('al-volume-out').textContent = `%${state.settings.volume}`;
  // Bildirim kutusu yalnızca izin hâlâ verilmişse işaretli gelir.
  const granted = 'Notification' in window && Notification.permission === 'granted';
  $('al-notify').checked = state.settings.notify && granted;
  if (state.settings.notify && !granted) state.settings.notify = false;
  save();
  updateAudioNotes();
  renderList();
  tick();
}

/* Test ve şeffaflık için saf işlevleri aç. */
window.onlineAlarm = { nextOccurrence, formatRemaining, hhmm, dayLabel, sanitizeStore };

init();
