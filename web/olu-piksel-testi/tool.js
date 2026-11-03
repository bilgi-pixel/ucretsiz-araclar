// Ölü Piksel ve Ekran Testi — tam ekran desenler. Hiçbir veri toplanmaz veya gönderilmez.
const $ = (id) => document.getElementById(id);

const stage = $('px-stage');
const hint = $('px-hint');
const content = $('px-content');
const fixBox = $('px-fixbox');

const COLORS = [
  ['Siyah', '#000000'], ['Beyaz', '#ffffff'], ['Kırmızı', '#ff0000'], ['Yeşil', '#00ff00'], ['Mavi', '#0000ff'],
  ['Koyu gri', '#404040'], ['Orta gri', '#808080'], ['Açık gri', '#bfbfbf'],
];
const GRADIENTS = [
  ['Gri tonlama gradyanı', 'linear-gradient(to right, #000, #fff)'],
  ['Kırmızı gradyanı', 'linear-gradient(to right, #000, #f00)'],
  ['Yeşil gradyanı', 'linear-gradient(to right, #000, #0f0)'],
  ['Mavi gradyanı', 'linear-gradient(to right, #000, #00f)'],
  ['Dikey gri gradyan', 'linear-gradient(to bottom, #000, #fff)'],
];
const GRIDS = [
  ['Beyaz ızgara (siyah zemin)', '#000', '#fff'],
  ['Siyah ızgara (beyaz zemin)', '#fff', '#000'],
];

let mode = null; // 'colors' | 'gradient' | 'grid' | 'motion' | 'contrast' | 'fixer'
let index = 0;
let raf = 0;
let fixTimer = 0;
let fixEnd = 0;
let hintTimer = 0;
let lastBtn = null;

function isActive() { return !stage.hidden; }

function setHint(text) {
  hint.textContent = text;
  hint.classList.add('is-visible');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => hint.classList.remove('is-visible'), 3500);
}

function stopLoops() {
  cancelAnimationFrame(raf); raf = 0;
  clearTimeout(fixTimer); fixTimer = 0;
}

function resetStage() {
  stopLoops();
  content.innerHTML = '';
  content.style.background = '';
  content.style.backgroundImage = '';
  content.style.backgroundSize = '';
  fixBox.hidden = true;
  stage.style.cursor = '';
}

function render() {
  resetStage();
  if (mode === 'colors') {
    const [name, color] = COLORS[index];
    stage.style.background = color;
    content.style.background = color;
    setHint(`${name} (${index + 1}/${COLORS.length}) — sonraki için tıklayın veya sağ ok, çıkmak için ESC`);
  } else if (mode === 'gradient') {
    const [name, g] = GRADIENTS[index];
    stage.style.background = '#000';
    content.style.background = g;
    setHint(`${name} (${index + 1}/${GRADIENTS.length}) — basamaklanma (banding) var mı bakın`);
  } else if (mode === 'grid') {
    const [name, bg, line] = GRIDS[index];
    stage.style.background = bg;
    content.style.backgroundColor = bg;
    content.style.backgroundImage = `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`;
    content.style.backgroundSize = '40px 40px';
    setHint(`${name} (${index + 1}/${GRIDS.length}) — çizgiler eşit kalınlıkta ve düz olmalı`);
  } else if (mode === 'contrast') {
    stage.style.background = '#000';
    renderContrast();
    setHint('Koyu gri kutular: siyahtan ayırt edebildiğiniz en koyu kutuyu not edin');
  } else if (mode === 'motion') {
    stage.style.background = '#808080';
    renderMotion();
    setHint('Kayan kutunun arkasında iz kalıyor mu bakın (hayalet görüntü / ghosting)');
  } else if (mode === 'fixer') {
    renderFixer();
  }
}

function renderContrast() {
  const wrap = document.createElement('div');
  wrap.className = 'px-contrast';
  // 1'den 12'ye kadar çok koyu gri seviyeleri
  for (let i = 1; i <= 12; i++) {
    const v = i * 3;
    const box = document.createElement('div');
    box.style.background = `rgb(${v},${v},${v})`;
    box.textContent = String(i);
    wrap.appendChild(box);
  }
  content.appendChild(wrap);
}

function renderMotion() {
  const speed = Number($('motion-speed').value) || 600;
  const box = document.createElement('div');
  box.className = 'px-motion-box';
  content.appendChild(box);
  let start = performance.now();
  function step(now) {
    const w = stage.clientWidth - box.offsetWidth;
    const t = ((now - start) / 1000) * speed;
    const period = Math.max(w, 1) * 2;
    const p = t % period;
    box.style.transform = `translate(${p < w ? p : period - p}px, 0)`;
    raf = requestAnimationFrame(step);
  }
  raf = requestAnimationFrame(step);
}

// ---- Piksel sıkışması "düzeltme" (hızlı renk değişimi) ----------------------------
function renderFixer() {
  const size = Number($('fix-size').value) || 200;
  const minutes = Number($('fix-minutes').value) || 5;
  stage.style.background = '#000';
  fixBox.hidden = false;
  fixBox.style.width = `${size}px`;
  fixBox.style.height = `${size}px`;
  fixBox.style.left = `${Math.max(0, (stage.clientWidth - size) / 2)}px`;
  fixBox.style.top = `${Math.max(0, (stage.clientHeight - size) / 2)}px`;
  fixEnd = performance.now() + minutes * 60 * 1000;
  const seq = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000'];
  let i = 0;
  let last = 0;
  function step(now) {
    if (now >= fixEnd) { finishFixer(); return; }
    // yaklaşık 15 Hz renk değişimi (ışığa duyarlılık riskini azaltmak için 60 Hz'den yavaş)
    if (now - last >= 66) {
      last = now;
      fixBox.style.background = seq[i++ % seq.length];
      const left = Math.ceil((fixEnd - now) / 1000);
      fixBox.setAttribute('data-left', `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`);
    }
    raf = requestAnimationFrame(step);
  }
  raf = requestAnimationFrame(step);
  setHint('Renkli kutuyu sıkışan pikselin üstüne taşımak için ekrana tıklayın. ESC ile çıkın.');
}

function finishFixer() {
  stopLoops();
  fixBox.hidden = true;
  setHint('Süre doldu. Sonucu kontrol etmek için siyah, beyaz ve renkli ekranlarla yeniden test edin (ESC ile çıkın).');
  stage.style.background = '#000';
}

// ---- Tam ekran giriş / çıkış -------------------------------------------------------
async function enter(newMode) {
  mode = newMode;
  index = 0;
  stage.hidden = false;
  document.body.classList.add('px-full');
  render();
  if (stage.requestFullscreen) {
    try { await stage.requestFullscreen(); } catch (e) { /* tam ekran reddedilirse sayfa kaplayan katman yeterli */ }
    // Kullanıcı tam ekran açılmadan ESC bastıysa açık kalan tam ekranı kapat
    if (!isActive() && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }
  stage.focus();
}

function exit() {
  if (!isActive()) return;
  resetStage();
  stage.hidden = true;
  document.body.classList.remove('px-full');
  mode = null;
  if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  // Tam ekran çıkışı odağı sıfırlayabildiği için kısa gecikmeyle düğmeye dön
  setTimeout(() => { if (lastBtn && !isActive()) lastBtn.focus(); }, 60);
}

function count() {
  return { colors: COLORS, gradient: GRADIENTS, grid: GRIDS }[mode]?.length ?? 1;
}

function next(step) {
  const n = count();
  if (n > 1) { index = (index + step + n) % n; render(); }
}

document.querySelectorAll('[data-mode]').forEach((b) => {
  b.addEventListener('click', () => {
    if (b.dataset.mode === 'fixer' && !$('fix-ack').checked) {
      $('fix-error').textContent = 'Önce ışığa duyarlılık uyarısını okuyup kutuyu işaretleyin. Hızlı renk değişimi epilepsi nöbeti riski taşıyabilir.';
      return;
    }
    $('fix-error').textContent = '';
    lastBtn = b;
    enter(b.dataset.mode);
  });
});

stage.addEventListener('click', (e) => {
  if (mode === 'fixer') {
    const size = fixBox.offsetWidth;
    fixBox.style.left = `${Math.max(0, e.clientX - size / 2)}px`;
    fixBox.style.top = `${Math.max(0, e.clientY - size / 2)}px`;
    return;
  }
  next(1);
});

document.addEventListener('keydown', (e) => {
  if (!isActive()) return;
  if (e.key === 'Escape') { e.preventDefault(); exit(); }
  else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); next(1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); next(-1); }
});

// Tarayıcı kendi ESC'siyle tam ekrandan çıkarsa katmanı da kapat
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && isActive()) exit();
});
