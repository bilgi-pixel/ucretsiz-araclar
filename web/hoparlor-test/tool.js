// Hoparlör ve Kulaklık Testi — tüm sesler Web Audio ile anlık üretilir; harici ses dosyası ve ağ isteği yok.
// Güvenlik: ses düzeyi düşük başlar, sabit tonlar kendiliğinden susar, "Tümünü durdur" ve Esc her zaman çalışır.

const $ = (id) => document.getElementById(id);
const els = {
  vol: $('vol'), volOut: $('vol-out'), volWarn: $('vol-warn'), btnStop: $('btn-stop'), status: $('status'),
  btnLeft: $('btn-left'), btnBoth: $('btn-both'), btnRight: $('btn-right'),
  btnSwap: $('btn-swap'), swapAsk: $('swap-ask'), swapResult: $('swap-result'),
  swapLeft: $('swap-left'), swapRight: $('swap-right'), swapBoth: $('swap-both'), swapNone: $('swap-none'), swapReplay: $('swap-replay'),
  toneBtns: [...document.querySelectorAll('[data-hz]')],
  btnSweep: $('btn-sweep'), sweepHz: $('sweep-hz'), btnPink: $('btn-pink'),
  wizStart: $('wiz-start'), wizPanel: $('wiz-panel'), wizStep: $('wiz-step'), wizQ: $('wiz-q'),
  wizYes: $('wiz-yes'), wizNo: $('wiz-no'), wizReplay: $('wiz-replay'), wizCancel: $('wiz-cancel'),
  wizSummary: $('wiz-summary'), wizResult: $('wiz-result'), wizList: $('wiz-list'),
};

const TONE_AUTOSTOP_MS = 8000;   // sabit ton güvenlik süresi
const SWEEP_SEC = 15;            // bağımsız tarama süresi
const SWEEP_FROM = 20, SWEEP_TO = 20000;

let ctx = null;                  // tek AudioContext (ilk tıklamada oluşur)
let master = null;               // ses kaydırıcısına bağlı ana kazanç
let pinkBuffer = null;
let current = null;              // çalan ses: { kind, stop }
let rafId = 0;
let autoTimer = 0;

// ---- Yardımcılar -------------------------------------------------------------------
/** Kaydırıcı 0-100 → doğrusal olmayan kazanç (düşük uçta ince ayar, üst sınır 0,8). */
function volToGain(v) { return Math.pow(v / 100, 2) * 0.8; }

function fmtHz(f) { return f < 1000 ? `${Math.round(f)} Hz` : `${(f / 1000).toFixed(2).replace('.', ',')} kHz`; }

function setStatus(text, playing) {
  els.status.textContent = text;
  els.status.dataset.playing = playing ? 'true' : 'false';
}

async function ensureCtx() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) {
    setStatus('Bu tarayıcı ses üretimini (Web Audio) desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.', false);
    return null;
  }
  try {
    if (!ctx) {
      ctx = new Ctx();
      master = ctx.createGain();
      master.gain.value = volToGain(Number(els.vol.value));
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') await ctx.resume();
  } catch (err) {
    setStatus('Ses motoru başlatılamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse tarayıcıyı yeniden başlatın.', false);
    return null;
  }
  els.status.dataset.ctx = ctx.state;
  return ctx;
}

/** Tek kanallı bir düğümü sol, sağ ya da her iki kanala yönlendirir. */
function route(node, channel) {
  if (channel === 'both') { node.connect(master); return; }
  const merger = ctx.createChannelMerger(2);
  node.connect(merger, 0, channel === 'left' ? 0 : 1);
  merger.connect(master);
}

/** Zarfı kısa sürede sıfıra indirip kaynakları durdurur (tık sesi olmasın). */
function makeHandle(env, sources) {
  return {
    stop() {
      const t = ctx.currentTime;
      try {
        env.gain.cancelScheduledValues(t);
        env.gain.setValueAtTime(env.gain.value, t);
        env.gain.linearRampToValueAtTime(0, t + 0.04);
      } catch (e) { /* zarf zaten bitmiş */ }
      sources.forEach((s) => { try { s.stop(t + 0.06); } catch (e) { /* zaten durmuş */ } });
    },
  };
}

function resetButtons() {
  els.toneBtns.forEach((b) => { b.setAttribute('aria-pressed', 'false'); b.classList.remove('ba-btn-primary'); });
  els.btnSweep.setAttribute('aria-pressed', 'false'); els.btnSweep.textContent = 'Taramayı başlat';
  els.btnPink.setAttribute('aria-pressed', 'false'); els.btnPink.textContent = 'Pembe gürültüyü başlat';
}

/** Çalan sesi durdurur. message: undefined → "Durduruldu."; null → durum metnine dokunma. */
function stopAll(message) {
  clearTimeout(autoTimer); autoTimer = 0;
  cancelAnimationFrame(rafId); rafId = 0;
  if (current) { current.stop(); current = null; }
  resetButtons();
  els.sweepHz.dataset.freq = '0';
  els.sweepHz.textContent = '0 Hz';
  if (message !== null) setStatus(message === undefined ? 'Durduruldu.' : message, false);
}

/** Ortak başlatıcı: bağlamı hazırlar, öncekini durdurur, yeni sesi çalar ve durum metnini yazar. */
async function run(kind, label, factory, autoStopMs) {
  const c = await ensureCtx();
  if (!c) return false;
  stopAll(null);
  const made = factory();
  current = { kind, stop: made.handle.stop };
  els.status.dataset.mode = kind;
  els.status.dataset.played = String((Number(els.status.dataset.played) || 0) + 1);
  setStatus(`Çalıyor: ${label}`, true);
  const ms = autoStopMs || made.durationMs;
  if (ms) autoTimer = setTimeout(() => stopAll(`Bitti: ${label}.`), ms);
  return true;
}

// ---- Ses üreticileri ----------------------------------------------------------------
/** Aralıklı bip (sol/sağ/iki kanal). */
function pulses({ hz, channel, beeps = 3 }) {
  return () => {
    const t = ctx.currentTime + 0.03;
    const osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = hz;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    osc.connect(env); route(env, channel);
    const step = 0.55;
    for (let i = 0; i < beeps; i++) {
      const s = t + i * step;
      env.gain.setValueAtTime(0, s);
      env.gain.linearRampToValueAtTime(0.5, s + 0.03);
      env.gain.setValueAtTime(0.5, s + 0.33);
      env.gain.linearRampToValueAtTime(0, s + 0.37);
    }
    const end = t + beeps * step;
    osc.start(t); osc.stop(end);
    return { handle: makeHandle(env, [osc]), durationMs: (end - ctx.currentTime) * 1000 + 150 };
  };
}

/** Sürekli sabit ton. */
function tone(hz) {
  return () => {
    const t = ctx.currentTime + 0.02;
    const osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = hz;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.5, t + 0.05);
    osc.connect(env); env.connect(master);
    osc.start(t);
    return { handle: makeHandle(env, [osc]), durationMs: 0 };
  };
}

/** Logaritmik frekans taraması; ekrandaki Hz değeri aynı eğriden hesaplanır. */
function sweep(from, to, dur) {
  return () => {
    const t = ctx.currentTime + 0.03;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.3, t + 0.2);
    env.gain.setValueAtTime(0.3, t + dur - 0.2);
    env.gain.linearRampToValueAtTime(0, t + dur);
    osc.connect(env); env.connect(master);
    osc.start(t); osc.stop(t + dur + 0.05);
    const startMs = performance.now() + 30;
    const ratio = to / from;
    const draw = () => {
      const p = Math.min(1, Math.max(0, (performance.now() - startMs) / (dur * 1000)));
      const f = from * Math.pow(ratio, p);
      els.sweepHz.dataset.freq = String(Math.round(f));
      els.sweepHz.textContent = fmtHz(f);
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return { handle: makeHandle(env, [osc]), durationMs: dur * 1000 + 200 };
  };
}

/** Pembe gürültü: Paul Kellet süzgeci, iki kanal bağımsız, döngülü tampon. */
function makePinkBuffer(seconds) {
  const n = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, peak = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      const v = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
      b6 = w * 0.115926;
      d[i] = v;
      if (Math.abs(v) > peak) peak = Math.abs(v);
    }
    const k = peak ? 0.8 / peak : 1; // tepe değeri 0,8'e normalle
    for (let i = 0; i < n; i++) d[i] *= k;
  }
  return buf;
}
function pink() {
  return () => {
    if (!pinkBuffer || pinkBuffer.sampleRate !== ctx.sampleRate) pinkBuffer = makePinkBuffer(4);
    const src = ctx.createBufferSource();
    src.buffer = pinkBuffer; src.loop = true;
    const env = ctx.createGain();
    const t = ctx.currentTime + 0.02;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(1, t + 0.15);
    src.connect(env); env.connect(master);
    src.start(t);
    return { handle: makeHandle(env, [src]), durationMs: 0 };
  };
}

// ---- Ses düzeyi ----------------------------------------------------------------------
function updateVolume() {
  const v = Number(els.vol.value);
  const g = volToGain(v);
  els.volOut.textContent = `%${v}`;
  els.volOut.dataset.gain = g.toFixed(4);
  els.vol.setAttribute('aria-valuetext', `yüzde ${v}`);
  els.volWarn.textContent = v >= 70
    ? 'Yüksek ses düzeyi: kulaklıkta işitmenize zarar verebilir. Sesi kısmanız önerilir.'
    : 'Test sesini duyamıyorsanız önce sistem ses düzeyini, sonra bu kaydırıcıyı yavaş yavaş artırın.';
  if (master && ctx) master.gain.setTargetAtTime(g, ctx.currentTime, 0.015);
}
els.vol.addEventListener('input', updateVolume);
updateVolume();

els.btnStop.addEventListener('click', () => stopAll());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && current) stopAll(); });

// ---- 1. Kanal testi ------------------------------------------------------------------
const CHANNELS = [
  [els.btnLeft, 'left', 'Sol kanal · 440 Hz bip'],
  [els.btnBoth, 'both', 'İki kanal (stereo) · 440 Hz bip'],
  [els.btnRight, 'right', 'Sağ kanal · 440 Hz bip'],
];
CHANNELS.forEach(([btn, ch, label]) => btn.addEventListener('click', () => run(ch, label, pulses({ hz: 440, channel: ch }))));

// ---- Sol-sağ ters mi? ----------------------------------------------------------------
const swapPlay = () => run('swap', 'Sol-sağ kontrolü (bipler sol kanala gönderilir)', pulses({ hz: 440, channel: 'left', beeps: 3 }));
const VERDICTS = {
  left: ['ok', 'Doğru: ses sol taraftan geldi, sol ve sağ kanal doğru bağlı görünüyor. Kulaklık kullanıyorsanız L işaretinin sol kulakta olduğundan da emin olun.'],
  right: ['swapped', 'Kanallar ters görünüyor. Önce kulaklığı ters takmadığınızdan emin olun (L işareti sol kulakta olmalı). Doğru taktıysanız kablo, adaptör ya da uygulamanın ses dengesi ayarı kanalları çaprazlıyor olabilir; başka bir bağlantı noktası veya kulaklıkla yeniden deneyin.'],
  both: ['mono', 'Ses iki taraftan birden geldi, yani kanal ayrımı yok. Windows\'ta Ayarlar → Erişilebilirlik → Ses bölümünde "Mono ses" kapalı olmalı; macOS\'ta Sistem Ayarları → Erişilebilirlik → Ses altında "Stereo sesi mono olarak çal" kapalı olmalı.'],
  none: ['none', 'Ses duyulmadı. Sistem ses düzeyini, sessiz tuşunu ve doğru çıkış cihazının seçili olduğunu kontrol edin (Windows\'ta ses simgesi, macOS\'ta Sistem Ayarları → Ses → Çıkış). Kaydırıcıyı biraz artırıp "Tekrar çal" ile deneyin.'],
};
els.btnSwap.addEventListener('click', async () => {
  els.swapResult.hidden = true;
  els.swapResult.dataset.verdict = '';
  els.swapAsk.hidden = false;
  await swapPlay();
});
els.swapReplay.addEventListener('click', () => { swapPlay(); });
[[els.swapLeft, 'left'], [els.swapRight, 'right'], [els.swapBoth, 'both'], [els.swapNone, 'none']].forEach(([btn, key]) => {
  btn.addEventListener('click', () => {
    stopAll('Kontrol tamamlandı.');
    const [cls, text] = VERDICTS[key];
    els.swapResult.dataset.verdict = key === 'left' ? 'ok' : cls;
    els.swapResult.textContent = text;
    els.swapResult.hidden = false;
  });
});

// ---- 2. Sabit ton ----------------------------------------------------------------------
els.toneBtns.forEach((btn) => btn.addEventListener('click', async () => {
  const hz = Number(btn.dataset.hz);
  if (current && current.kind === `tone-${hz}`) { stopAll(); return; }
  const ok = await run(`tone-${hz}`, `${hz} Hz sabit ton`, tone(hz), TONE_AUTOSTOP_MS);
  if (ok) { btn.setAttribute('aria-pressed', 'true'); btn.classList.add('ba-btn-primary'); }
}));

// ---- 3. Frekans taraması ---------------------------------------------------------------
els.btnSweep.addEventListener('click', async () => {
  if (current && current.kind === 'sweep') { stopAll(); return; }
  const ok = await run('sweep', 'frekans taraması 20 Hz – 20 kHz (donanım testi)', sweep(SWEEP_FROM, SWEEP_TO, SWEEP_SEC));
  if (ok) { els.btnSweep.setAttribute('aria-pressed', 'true'); els.btnSweep.textContent = 'Taramayı durdur'; }
});

// ---- 4. Pembe gürültü ------------------------------------------------------------------
els.btnPink.addEventListener('click', async () => {
  if (current && current.kind === 'pink') { stopAll(); return; }
  const ok = await run('pink', 'pembe gürültü', pink());
  if (ok) { els.btnPink.setAttribute('aria-pressed', 'true'); els.btnPink.textContent = 'Pembe gürültüyü durdur'; }
});

// ---- 5. Test sihirbazı -----------------------------------------------------------------
const STEPS = [
  { key: 'left', title: 'Sol kanal', q: 'Bip sesleri yalnızca sol taraftan mı geldi?',
    fail: 'Sol kanal duyulmadı ya da yanlış taraftan geldi: sol hoparlör veya kulaklık sürücüsünü, kabloyu ve jak bağlantısını kontrol edin.',
    play: () => run('wiz-left', 'sihirbaz · sol kanal', pulses({ hz: 440, channel: 'left' })) },
  { key: 'right', title: 'Sağ kanal', q: 'Bip sesleri yalnızca sağ taraftan mı geldi?',
    fail: 'Sağ kanal duyulmadı ya da yanlış taraftan geldi: sağ hoparlör veya kulaklık sürücüsünü, kabloyu ve jak bağlantısını kontrol edin.',
    play: () => run('wiz-right', 'sihirbaz · sağ kanal', pulses({ hz: 440, channel: 'right' })) },
  { key: 'both', title: 'İki kanal (stereo)', q: 'Bip sesleri iki taraftan eşit ve dengeli mi geldi?',
    fail: 'Stereo ses dengesiz: sistemdeki ses dengesi ayarını, mono ses seçeneğini ve bağlantıyı kontrol edin.',
    play: () => run('wiz-both', 'sihirbaz · iki kanal', pulses({ hz: 440, channel: 'both' })) },
  { key: 'sweep', title: 'Frekans taraması (8 sn)', q: 'Ses alçaktan tize doğru kesintisiz yükseldi mi? (En alt ve en üst uçta ses duymamak normaldir; çatırtı ya da kesinti olmamalı.)',
    fail: 'Taramada çatlama, kesinti ya da titreme oldu: ses sürücüsünü, ekolayzır ayarlarını ve hoparlörü kontrol edin.',
    play: () => run('wiz-sweep', 'sihirbaz · frekans taraması (8 sn)', sweep(SWEEP_FROM, SWEEP_TO, 8)) },
  { key: 'pink', title: 'Pembe gürültü (5 sn)', q: 'Hışırtı benzeri ses düzgün ve çatlaksız çalıyor mu?',
    fail: 'Pembe gürültüde çatlama, tek taraflı hışırtı ya da dengesizlik duydunuz: kablo, jak ve hoparlör sağlığını kontrol edin.',
    play: () => run('wiz-pink', 'sihirbaz · pembe gürültü (5 sn)', pink(), 5000) },
];
const wiz = { i: -1, results: [] };

function wizRender() {
  const s = STEPS[wiz.i];
  els.wizStep.textContent = `Adım ${wiz.i + 1}/${STEPS.length}: ${s.title}`;
  els.wizQ.textContent = s.q;
}
function wizOpen() {
  wiz.i = 0; wiz.results = [];
  els.wizSummary.hidden = true;
  els.wizPanel.hidden = false;
  wizRender();
  els.wizStep.focus();
  STEPS[0].play();
}
function wizAnswer(yes) {
  wiz.results[wiz.i] = yes;
  stopAll(null);
  if (wiz.i < STEPS.length - 1) {
    wiz.i++;
    wizRender();
    STEPS[wiz.i].play();
  } else {
    wizFinish();
  }
}
function wizFinish() {
  stopAll('Sihirbaz tamamlandı.');
  els.wizPanel.hidden = true;
  els.wizList.textContent = '';
  STEPS.forEach((s, i) => {
    const li = document.createElement('li');
    if (wiz.results[i]) li.textContent = `✓ ${s.title}: sorun bildirilmedi.`;
    else { li.className = 'no'; li.textContent = `✗ ${s.title}: ${s.fail}`; }
    els.wizList.appendChild(li);
  });
  const okCount = wiz.results.filter(Boolean).length;
  const all = okCount === STEPS.length;
  els.wizSummary.dataset.verdict = all ? 'ok' : 'warn';
  els.wizSummary.dataset.passed = String(okCount);
  els.wizResult.textContent = all
    ? 'Beş adımın beşi de başarılı. Hoparlörünüz veya kulaklığınız bu testlerde sorunsuz görünüyor.'
    : `Beş adımdan ${okCount} tanesi başarılı. Sorun bildirdiğiniz adımlar için aşağıdaki önerilere bakın.`;
  els.wizSummary.hidden = false;
  els.wizSummary.focus();
}
els.wizStart.addEventListener('click', wizOpen);
els.wizYes.addEventListener('click', () => wizAnswer(true));
els.wizNo.addEventListener('click', () => wizAnswer(false));
els.wizReplay.addEventListener('click', () => { if (wiz.i >= 0) STEPS[wiz.i].play(); });
els.wizCancel.addEventListener('click', () => {
  els.wizPanel.hidden = true;
  wiz.i = -1;
  stopAll('Sihirbaz kapatıldı.');
});

// Sayfadan çıkarken sesi kes ve ses motorunu kapat
window.addEventListener('pagehide', () => { stopAll(null); if (ctx) { ctx.close().catch(() => {}); ctx = null; master = null; } });
