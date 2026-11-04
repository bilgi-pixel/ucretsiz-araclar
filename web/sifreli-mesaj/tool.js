// Şifreli mesaj oluşturucu ve çözücü — tamamı tarayıcıda çalışır; yazdığınız metin hiçbir yere gönderilmez.
// Yöntemler eğitim ve eğlence içindir, gerçek güvenlik sağlamaz. Şifre mantığı sifreler.js dosyasındadır.
import { showError } from '../assets/js/ba.js';
import * as C from './sifreler.js';

const $ = (id) => document.getElementById(id);
const MAX_CHARS = 200000;
const ALPHA_METHODS = ['caesar', 'vigenere', 'atbash', 'a1z26', 'custom'];
const SAMPLES = {
  caesar: 'Merhaba dünya, bu bir gizli mesajdır.', vigenere: 'Merhaba dünya, bu bir gizli mesajdır.', atbash: 'Merhaba dünya',
  rot13: 'Hello World', morse: 'SOS', binary: 'Merhaba', hex: 'Merhaba', base64: 'Merhaba dünya', a1z26: 'MERHABA',
  reverse: 'Merhaba dünya', custom: 'Merhaba dünya, bu bir gizli mesajdır.',
};

const method = () => document.querySelector('input[name="yontem"]:checked').value;
const mode = () => document.querySelector('input[name="mod"]:checked').value; // 'sifrele' | 'coz'
const alpha = () => C.ALPHABETS[$('opt-alfabe').value];

/** Seçeneklerin görünürlüğünü yönteme göre ayarlar. */
function syncOptions() {
  const m = method();
  document.querySelectorAll('[data-show]').forEach((el) => { el.hidden = !el.dataset.show.split(' ').includes(m); });
  document.querySelectorAll('[data-desc]').forEach((el) => { el.hidden = el.dataset.desc !== m; });
  // "Türkçe harfleri sadeleştir" yalnızca İngiliz alfabesi (ya da ROT13) kullanılırken anlamlıdır
  $('f-sade').hidden = !(m === 'rot13' || (ALPHA_METHODS.includes(m) && $('opt-alfabe').value === 'en'));
  $('options').hidden = Array.from($('options').children).every((c) => c.hidden);
  $('bf').hidden = m !== 'caesar';
  $('morse-panel').hidden = m !== 'morse';
  const n = alpha().up.length;
  $('opt-kaydirma').max = String(n - 1);
  $('kaydirma-ipucu').textContent = `1 ile ${n - 1} arasında bir sayı. ${n} kaydırma metni değiştirmez.`;
  const selfInverse = ['atbash', 'rot13', 'reverse'].includes(m);
  $('mod-ipucu').textContent = selfInverse ? 'Bu yöntem kendi tersidir: aynı işlem hem şifreler hem çözer.' : '';
}

/** Girdiyi seçili yönteme göre işler; { out, notes[] } döndürür, hatada Error fırlatır. */
function compute() {
  const m = method();
  const dec = mode() === 'coz';
  const A = alpha();
  const text = $('girdi').value;
  if (text.length > MAX_CHARS) throw new Error(`Metin çok uzun (${text.length.toLocaleString('tr-TR')} karakter). En fazla ${MAX_CHARS.toLocaleString('tr-TR')} karakter işlenir; metni parçalara bölün.`);
  const simplify = !$('f-sade').hidden && $('opt-sade').checked;
  const prep = (t) => (simplify ? C.simplifyTr(t) : t);
  const notes = [];
  let r;
  switch (m) {
    case 'caesar': {
      const raw = Number($('opt-kaydirma').value);
      if (!Number.isFinite(raw) || !Number.isInteger(raw)) throw new Error(`Kaydırma miktarı tam sayı olmalı (1 ile ${A.up.length - 1} arası). Örneğin 3 yazın.`);
      if (raw % A.up.length === 0) notes.push(`Kaydırma ${A.up.length} (alfabe uzunluğu) olduğu için metin değişmedi. 1 ile ${A.up.length - 1} arasında bir sayı deneyin.`);
      r = C.caesar(prep(text), A, raw, dec);
      break;
    }
    case 'vigenere': r = C.vigenere(prep(text), A, prep($('opt-anahtar').value), dec); break;
    case 'atbash': r = C.atbash(prep(text), A); break;
    case 'rot13': r = C.rot13(prep(text)); break;
    case 'a1z26': {
      if (dec) {
        const d = C.a1z26Decode(text, A);
        if (d.bad) notes.push(`1 ile ${d.max} dışındaki sayılar "?" ile gösterildi. Seçili alfabede ${d.max} harf var; alfabeyi değiştirmeyi deneyin.`);
        r = { out: d.out, skipped: [] };
      } else r = C.a1z26Encode(prep(text), A);
      break;
    }
    case 'morse': {
      if (dec) {
        const d = C.morseDecode(text);
        if (d.unknown.length) notes.push(`Tanınmayan Mors kodları "?" ile gösterildi: ${[...new Set(d.unknown)].slice(0, 6).join('  ')}. Harfleri boşlukla, kelimeleri / ile ayırdığınızdan emin olun.`);
        r = { out: d.out, skipped: [] };
      } else {
        r = C.morseEncode(text);
        if (/[çğıöşüÇĞİÖŞÜ]/.test(text)) notes.push('Mors kodunda Türkçe harfler ASCII karşılıklarıyla yazılır (Ç→C, Ğ→G, İ→I, Ö→O, Ş→S, Ü→U).');
      }
      break;
    }
    case 'binary': r = { out: dec ? C.fromBinary(text) : C.toBinary(text), skipped: [] }; break;
    case 'hex': r = { out: dec ? C.fromHex(text) : C.toHex(text), skipped: [] }; break;
    case 'base64': r = { out: dec ? C.fromBase64(text) : C.toBase64(text), skipped: [] }; break;
    case 'reverse': r = { out: C.reverseText(text, $('opt-ters').value), skipped: [] }; break;
    case 'custom': r = C.substitute(prep(text), A, $('opt-ozel').value, dec); break;
    default: throw new Error('Bilinmeyen yöntem.');
  }
  if (r.skipped && r.skipped.length) {
    const list = r.skipped.slice(0, 8).join(', ');
    const hint = A.id === 'tr' ? ' Q, W, X gibi harfler için İngiliz alfabesini seçebilirsiniz.' : ' Türkçe harfler için Türk alfabesini seçin ya da "Türkçe harfleri sadeleştir" kutusunu işaretleyin.';
    if (m === 'morse') notes.push(`Mors tablosunda olmayan karakterler atlandı: ${list}.`);
    else notes.push(`Seçili alfabede olmayan harfler olduğu gibi bırakıldı: ${list}.${hint}`);
  }
  return { out: r.out, notes };
}

/** Anahtar tablosu önizlemesi (A→K, B→Z …). */
function renderKeyTable() {
  const box = $('ozel-tablo');
  box.textContent = '';
  if (method() !== 'custom') return;
  try {
    const perm = C.parseKey($('opt-ozel').value, alpha());
    const A = alpha();
    perm.forEach((j, i) => {
      const s = document.createElement('span');
      s.textContent = `${A.up[i]}→${A.up[j]}`;
      box.appendChild(s);
    });
  } catch { /* hata run() içinde gösterilir */ }
}

function run() {
  syncOptions();
  const err = $('error');
  const warn = $('uyari');
  let res;
  try {
    res = compute();
  } catch (e) {
    $('cikti').value = '';
    showError(err, e.message);
    warn.textContent = '';
    warn.hidden = true;
    renderKeyTable();
    return;
  }
  showError(err, '');
  $('cikti').value = res.out;
  warn.textContent = res.notes.join(' ');
  warn.hidden = res.notes.length === 0;
  $('durum').textContent = '';
  renderKeyTable();
  if (!$('bf-list').hidden) renderBruteForce();
  $('tasi').disabled = !res.out;
  $('kopyala').disabled = !res.out;
  if ($('paylas')) $('paylas').disabled = !res.out;
}

/* ---------- Sezar: tüm kaydırmaları dene ---------- */
function renderBruteForce() {
  const list = $('bf-list');
  const text = $('girdi').value;
  list.textContent = '';
  if (!text.trim()) {
    showError($('error'), 'Önce şifreli mesajı "Mesajınız" kutusuna yazın; sonra tüm kaydırmaları deneyebilirsiniz.');
    list.hidden = true;
    return;
  }
  const simplify = !$('f-sade').hidden && $('opt-sade').checked;
  const items = C.caesarAll(simplify ? C.simplifyTr(text) : text, alpha());
  items.forEach(({ shift, text: t }) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sm-bfrow';
    b.dataset.k = String(shift);
    const k = document.createElement('span');
    k.className = 'k';
    k.textContent = `Kaydırma ${shift}`;
    const v = document.createElement('span');
    v.className = 't';
    v.textContent = t.length > 140 ? `${t.slice(0, 140)}…` : t;
    b.append(k, v);
    li.appendChild(b);
    list.appendChild(li);
  });
  list.hidden = false;
}

/* ---------- Mors: ses ve ışık ---------- */
const player = { raf: 0, ctx: null, running: false };

function currentMorse() {
  return mode() === 'sifrele' ? $('cikti').value : C.morseNormalize($('girdi').value);
}

function stopMorse(msg = 'Durduruldu.') {
  cancelAnimationFrame(player.raf);
  player.running = false;
  $('lamp').classList.remove('is-on');
  if (player.ctx) { try { player.ctx.close(); } catch { /* zaten kapalı */ } player.ctx = null; }
  $('morse-cal').disabled = false;
  $('morse-dur').disabled = true;
  $('morse-durum').textContent = msg;
}

function playMorse() {
  if (player.running) return;
  const code = currentMorse();
  let segs = C.morseTimeline(code);
  if (!segs.length) { showError($('error'), 'Çalınacak Mors kodu yok. Önce "SOS" gibi bir metin yazın ya da Mors kodu girin.'); return; }
  showError($('error'), '');
  let cut = false;
  if (segs.length > 600) { segs = segs.slice(0, 600); cut = true; }
  const wpm = Math.min(25, Math.max(5, Number($('morse-hiz').value) || 12));
  const unit = 1.2 / wpm; // saniye (PARIS standardı)
  const useSound = $('morse-ses').checked;
  const useLight = $('morse-isik').checked;
  const freq = Math.min(1000, Math.max(300, Number($('morse-ton').value) || 600));

  // Zaman çizelgesi (saniye): açık/kapalı olayları
  const events = [];
  let t = 0.05;
  segs.forEach((s) => { events.push({ t, on: s.on }); t += s.units * unit; });
  events.push({ t, on: false, end: true });

  if (useSound) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      player.ctx = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.value = 0;
      osc.connect(gain).connect(ctx.destination);
      const t0 = ctx.currentTime;
      osc.start(t0);
      for (let i = 0; i < events.length - 1; i++) {
        if (!events[i].on) continue;
        const a = t0 + events[i].t;
        const b = t0 + events[i + 1].t;
        gain.gain.setValueAtTime(0, a);
        gain.gain.linearRampToValueAtTime(0.35, a + 0.004);
        gain.gain.setValueAtTime(0.35, Math.max(a + 0.004, b - 0.004));
        gain.gain.linearRampToValueAtTime(0, b);
      }
      osc.stop(t0 + t + 0.1);
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    } catch {
      player.ctx = null;
      $('uyari').textContent = 'Tarayıcınız ses çalmaya izin vermedi; yalnızca ışık gösteriliyor.';
      $('uyari').hidden = false;
    }
  }

  const lamp = $('lamp');
  let flashes = 0;
  lamp.dataset.flashes = '0';
  player.running = true;
  $('morse-cal').disabled = true;
  $('morse-dur').disabled = false;
  $('morse-durum').textContent = `Oynatılıyor… (${wpm} kelime/dk)${cut ? ' İlk 600 işaret çalınır.' : ''}`;
  const start = performance.now();
  let i = 0;
  const tick = () => {
    if (!player.running) return;
    const now = (performance.now() - start) / 1000;
    // Kare atlansa bile olaylar sırayla işlenir; yanma sayısı deterministik kalır
    while (i < events.length && now >= events[i].t) {
      const ev = events[i++];
      if (ev.end) { stopMorse('Bitti.'); return; }
      if (ev.on) { flashes++; lamp.dataset.flashes = String(flashes); }
      lamp.classList.toggle('is-on', ev.on && useLight);
    }
    player.raf = requestAnimationFrame(tick);
  };
  player.raf = requestAnimationFrame(tick);
}

/* ---------- Kopyala / paylaş ---------- */
async function copyOut() {
  const text = $('cikti').value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    try {
      $('cikti').select();
      if (!document.execCommand('copy')) throw new Error('kopyalanamadı');
    } catch {
      showError($('error'), 'Panoya kopyalanamadı. Sonuç kutusuna tıklayıp Ctrl+A, Ctrl+C ile kopyalayın.');
      return;
    }
  }
  $('durum').textContent = 'Sonuç panoya kopyalandı.';
}

async function shareOut() {
  const text = $('cikti').value;
  if (!text) return;
  try {
    await navigator.share({ text });
  } catch (e) {
    if (e && e.name === 'AbortError') return; // kullanıcı vazgeçti
    await copyOut();
  }
}

/* ---------- Başlatma ---------- */
function init() {
  // Web Share yoksa düğme gizlenir (kopyalama yeterlidir)
  if (!navigator.share) $('paylas').hidden = true;
  $('morse-isik').checked = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('morse-dur').disabled = true;

  const rerun = () => run();
  document.querySelectorAll('input[name="yontem"]').forEach((r) => r.addEventListener('change', () => {
    stopMorse('');
    $('bf-list').hidden = true;
    if (method() === 'custom' && !validKey()) $('opt-ozel').value = C.randomKey(alpha());
    run();
  }));
  document.querySelectorAll('input[name="mod"]').forEach((r) => r.addEventListener('change', rerun));
  ['girdi', 'opt-kaydirma', 'opt-anahtar', 'opt-ozel', 'opt-ters', 'opt-sade'].forEach((id) => $(id).addEventListener('input', rerun));
  $('opt-ters').addEventListener('change', rerun);
  $('opt-sade').addEventListener('change', rerun);
  $('opt-alfabe').addEventListener('change', () => {
    if (method() === 'custom') $('opt-ozel').value = C.randomKey(alpha());
    $('bf-list').hidden = true;
    run();
  });

  $('ozel-uret').addEventListener('click', () => { $('opt-ozel').value = C.randomKey(alpha()); run(); });
  $('bf-btn').addEventListener('click', () => { showError($('error'), ''); renderBruteForce(); });
  $('bf-list').addEventListener('click', (e) => {
    const b = e.target.closest('.sm-bfrow');
    if (!b) return;
    $('opt-kaydirma').value = b.dataset.k;
    document.querySelector('input[name="mod"][value="coz"]').checked = true;
    run();
    $('cikti').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  $('ornek').addEventListener('click', () => {
    document.querySelector('input[name="mod"][value="sifrele"]').checked = true;
    $('girdi').value = SAMPLES[method()] || 'Merhaba dünya';
    run();
  });
  $('temizle').addEventListener('click', () => { $('girdi').value = ''; $('girdi').focus(); run(); });
  $('tasi').addEventListener('click', () => {
    $('girdi').value = $('cikti').value;
    const next = mode() === 'sifrele' ? 'coz' : 'sifrele';
    document.querySelector(`input[name="mod"][value="${next}"]`).checked = true;
    run();
  });
  $('kopyala').addEventListener('click', copyOut);
  $('paylas').addEventListener('click', shareOut);
  $('morse-cal').addEventListener('click', playMorse);
  $('morse-dur').addEventListener('click', () => stopMorse());
  window.addEventListener('pagehide', () => stopMorse(''));
  run();
}

function validKey() {
  try { C.parseKey($('opt-ozel').value, alpha()); return true; } catch { return false; }
}

init();
