// Morse çevirici arayüzü — her şey tarayıcıda; metin sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { textToMorse, morseToText, morseTimings } from './logic.js';

const $ = (id) => document.getElementById(id);
const mode = () => document.querySelector('input[name="mode"]:checked').value;
let playing = null; // çalan sesin iptal bilgisi

function showResult(text, note) {
  $('out').value = text;
  $('r-note').textContent = note || '';
  $('result').hidden = false; $('result').classList.add('is-active');
  $('play').hidden = mode() !== 'encode';
}
function hideResult() {
  $('result').hidden = true; $('result').classList.remove('is-active'); stop();
}

function run() {
  showError($('error'), ''); stop();
  const src = $('input').value;
  if (!src.trim()) { hideResult(); showError($('error'), mode() === 'encode' ? 'Çevrilecek bir metin yazın (örn. SOS ya da Merhaba).' : 'Çevrilecek Morse kodunu yazın (örn. ... --- ...). Harfleri boşlukla, sözcükleri / ile ayırın.'); return; }
  if (mode() === 'encode') {
    const { morse, skipped } = textToMorse(src);
    if (!morse) { hideResult(); showError($('error'), 'Yazdığınız karakterlerin Morse karşılığı yok. Harf, rakam ve yaygın noktalama işaretleri kullanın.'); return; }
    showResult(morse, skipped.length ? `Morse karşılığı olmadığı için atlanan karakterler: ${skipped.join(' ')}` : 'Harfler boşlukla, sözcükler " / " ile ayrıldı.');
  } else {
    const { text, unknown } = morseToText(src);
    if (!text.replace(/[?\s]/g, '')) { hideResult(); showError($('error'), 'Bu kodlar tanınmadı. Yalnızca nokta (.) ve çizgi (-) kullanın; harfleri boşlukla, sözcükleri / ile ayırın.'); return; }
    showResult(text, unknown.length ? `Tanınmayan kodlar "?" olarak gösterildi: ${[...new Set(unknown)].join(' ')}` : 'Çözüm Türkçe büyük harflerle gösterilir.');
  }
}

/* ---------- Sesli çalma (WebAudio, kullanıcı tıklayınca) ---------- */
function stop() {
  if (playing) { playing.cancelled = true; try { playing.ctx.close(); } catch { /* yok say */ } playing = null; }
  $('play').textContent = 'Sesli çal';
}
function play() {
  if (playing) { stop(); return; }
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) { showError($('error'), 'Tarayıcınız ses çalmayı desteklemiyor. Güncel bir tarayıcı deneyin.'); return; }
  const ctx = new Ctx();
  const unit = 1.2 / Number($('wpm').value); // PARIS: birim süre = 1,2 / WPM saniye
  let t = ctx.currentTime + 0.1;
  for (const ev of morseTimings($('out').value)) {
    const dur = ev.units * unit;
    if (ev.on) {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.frequency.value = 650; g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.005); g.gain.setValueAtTime(0.25, t + dur - 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g).connect(ctx.destination); osc.start(t); osc.stop(t + dur);
    }
    t += dur;
  }
  playing = { ctx, cancelled: false };
  $('play').textContent = 'Durdur';
  setTimeout(() => { if (playing && playing.ctx === ctx) stop(); }, (t - ctx.currentTime) * 1000 + 200);
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => {
  $('input').placeholder = mode() === 'encode' ? 'Örn. Merhaba Dünya' : 'Örn. .... .- .-.. --- / .-- --- .-. .-.. -..';
  hideResult(); showError($('error'), '');
}));
$('clear').addEventListener('click', () => { $('input').value = ''; hideResult(); showError($('error'), ''); $('input').focus(); });
$('swap').addEventListener('click', () => {
  if (!$('out').value || $('result').hidden) return;
  const next = mode() === 'encode' ? 'decode' : 'encode';
  const v = $('out').value;
  document.querySelector(`input[name="mode"][value="${next}"]`).checked = true;
  $('input').value = v; run();
});
$('play').addEventListener('click', play);
$('copy').addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText($('out').value); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
