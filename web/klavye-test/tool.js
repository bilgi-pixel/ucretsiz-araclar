// Online klavye testi: basılan tuşları şemada gösterir, rapor üretir. Hiçbir veri cihazdan çıkmaz.
const $ = (id) => document.getElementById(id);

// Şema tanımı: [code, TR Q etiketi, genişlik birimi]; code null ise boşluk
const S = (w) => [null, '', w];
const ROWS = {
  main: [
    [['Escape', 'Esc', 1], S(1), ['F1', 'F1', 1], ['F2', 'F2', 1], ['F3', 'F3', 1], ['F4', 'F4', 1], S(0.5), ['F5', 'F5', 1], ['F6', 'F6', 1], ['F7', 'F7', 1], ['F8', 'F8', 1], S(0.5), ['F9', 'F9', 1], ['F10', 'F10', 1], ['F11', 'F11', 1], ['F12', 'F12', 1]],
    [['Backquote', '"', 1], ...'1234567890'.split('').map((d) => ['Digit' + d, d, 1]), ['Minus', '*', 1], ['Equal', '-', 1], ['Backspace', '⌫', 2]],
    [['Tab', 'Tab', 1.5], ...'QWERTYUIOP'.split('').map((l) => ['Key' + l, l, 1]), ['BracketLeft', 'Ğ', 1], ['BracketRight', 'Ü', 1], ['Enter', 'Enter', 1.5]],
    [['CapsLock', 'Caps', 2.5], ...'ASDFGHJKL'.split('').map((l) => ['Key' + l, l, 1]), ['Semicolon', 'Ş', 1], ['Quote', 'İ', 1], ['Backslash', ',', 1.5]],
    [['ShiftLeft', 'Shift', 1.25], ['IntlBackslash', '<', 1], ...'ZXCVBNM'.split('').map((l) => ['Key' + l, l, 1]), ['Comma', 'Ö', 1], ['Period', 'Ç', 1], ['Slash', '.', 1], ['ShiftRight', 'Shift', 2.75]],
    [['ControlLeft', 'Ctrl', 1.25], ['MetaLeft', 'Win', 1.25], ['AltLeft', 'Alt', 1.25], ['Space', 'Boşluk', 6.25], ['AltRight', 'AltGr', 1.25], ['MetaRight', 'Win', 1.25], ['ContextMenu', 'Menü', 1.25], ['ControlRight', 'Ctrl', 1.25]],
  ],
  nav: [
    [['PrintScreen', 'PrtSc', 1], ['ScrollLock', 'ScrLk', 1], ['Pause', 'Pause', 1]],
    [['Insert', 'Ins', 1], ['Home', 'Home', 1], ['PageUp', 'PgUp', 1]],
    [['Delete', 'Del', 1], ['End', 'End', 1], ['PageDown', 'PgDn', 1]],
    [S(3)],
    [S(1), ['ArrowUp', '↑', 1], S(1)],
    [['ArrowLeft', '←', 1], ['ArrowDown', '↓', 1], ['ArrowRight', '→', 1]],
  ],
  num: [
    [S(4)],
    [['NumLock', 'Num', 1], ['NumpadDivide', '/', 1], ['NumpadMultiply', '*', 1], ['NumpadSubtract', '-', 1]],
    [['Numpad7', '7', 1], ['Numpad8', '8', 1], ['Numpad9', '9', 1], ['NumpadAdd', '+', 1]],
    [['Numpad4', '4', 1], ['Numpad5', '5', 1], ['Numpad6', '6', 1], S(1)],
    [['Numpad1', '1', 1], ['Numpad2', '2', 1], ['Numpad3', '3', 1], ['NumpadEnter', 'Ent', 1]],
    [['Numpad0', '0', 2], ['NumpadDecimal', ',', 1], S(1)],
  ],
};

// TR F düzeni: yalnızca harf etiketleri değişir, fiziksel tuş kodları aynıdır
const F_LABELS = {
  KeyQ: 'F', KeyW: 'G', KeyE: 'Ğ', KeyR: 'I', KeyT: 'O', KeyY: 'D', KeyU: 'R', KeyI: 'N', KeyO: 'H', KeyP: 'P',
  BracketLeft: 'Q', BracketRight: 'W', KeyA: 'U', KeyS: 'İ', KeyD: 'E', KeyF: 'A', KeyG: 'Ü', KeyH: 'T', KeyJ: 'K',
  KeyK: 'M', KeyL: 'L', Semicolon: 'Y', Quote: 'Ş', KeyZ: 'J', KeyX: 'Ö', KeyC: 'V', KeyV: 'C', KeyB: 'Ç',
  KeyN: 'Z', KeyM: 'S', Comma: 'B', Period: '.', Slash: ',',
};
const LOCATIONS = ['Standart', 'Sol', 'Sağ', 'Sayısal tuş takımı'];

const state = {
  layout: 'full', kind: 'q',
  tested: new Set(), pressed: new Set(), extras: new Map(),
  peak: 0, peakKeys: [],
  firstDown: new Map(), repeatGaps: [], repeatDelay: null, lastRepeat: new Map(),
};
const keyEls = new Map();
const labelOf = new Map();

// Şemayı çiz
function build() {
  for (const group of ['main', 'nav', 'num']) {
    const host = $('kb-' + group);
    ROWS[group].forEach((row) => {
      const r = document.createElement('div');
      r.className = 'kb-row';
      row.forEach(([code, label, w]) => {
        const el = document.createElement('div');
        el.style.flex = `${w} 1 0`;
        if (!code) { el.className = 'kb-gap'; r.appendChild(el); return; }
        el.className = 'kb-key';
        el.dataset.code = code;
        el.dataset.group = group;
        el.textContent = label;
        keyEls.set(code, el);
        labelOf.set(code, label);
        r.appendChild(el);
      });
      host.appendChild(r);
    });
  }
}

const visibleCodes = () => [...keyEls.entries()].filter(([, el]) => {
  const g = el.dataset.group;
  return state.layout === 'full' || (state.layout === 'laptop' && g !== 'num') || (state.layout === 'compact' && g === 'main');
}).map(([c]) => c);

function reportText() {
  const vis = visibleCodes();
  const testedVis = vis.filter((c) => state.tested.has(c));
  const missing = vis.filter((c) => !state.tested.has(c));
  const extras = [...state.extras.keys()];
  const lines = [
    'Bilişim Ajans – Klavye Testi Raporu',
    `Şema: ${{ full: 'Tam boy', laptop: 'Dizüstü', compact: 'Kompakt' }[state.layout]} · ${state.kind === 'f' ? 'TR F' : 'TR Q'} düzeni`,
    `Test edilen: ${state.tested.size} tuş (şemada ${testedVis.length} / ${vis.length})`,
    `Aynı anda en çok basılı tuş: ${state.peak}${state.peakKeys.length ? ' (' + state.peakKeys.join(', ') + ')' : ''}`,
  ];
  if (state.repeatGaps.length >= 2) {
    const avg = state.repeatGaps.reduce((a, b) => a + b, 0) / state.repeatGaps.length;
    lines.push(`Tuş tekrar hızı: yaklaşık ${(1000 / avg).toFixed(1)} tuş/sn (ortalama ${avg.toFixed(0)} ms aralık)`);
  }
  if (state.repeatDelay != null) lines.push(`Tekrar başlama gecikmesi: yaklaşık ${state.repeatDelay.toFixed(0)} ms`);
  lines.push(`Basılmayan tuşlar (${missing.length}): ${missing.length ? missing.map((c) => labelOf.get(c) + ' [' + c + ']').join(', ') : 'yok, tüm tuşlar çalıştı'}`);
  if (extras.length) lines.push('Şemada olmayan tuşlar: ' + extras.join(', '));
  return lines.join('\n');
}

function render() {
  keyEls.forEach((el, code) => {
    el.classList.toggle('is-tested', state.tested.has(code));
    el.classList.toggle('is-pressed', state.pressed.has(code));
  });
  const vis = visibleCodes();
  const testedVis = vis.filter((c) => state.tested.has(c)).length;
  $('stat-tested').textContent = `${state.tested.size} tuş`;
  $('stat-total').textContent = `${testedVis} / ${vis.length}`;
  $('stat-now').textContent = String(state.pressed.size);
  $('stat-peak').textContent = String(state.peak);
  const missing = vis.filter((c) => !state.tested.has(c));
  $('missing-list').textContent = missing.length ? missing.map((c) => labelOf.get(c)).join('  ·  ') : 'Tüm tuşlar çalıştı.';
  $('missing-count').textContent = String(missing.length);
  $('report').textContent = reportText();
}

function applyLayout() {
  $('kb-wrap').dataset.layout = state.layout;
  render();
}
function applyKind() {
  keyEls.forEach((el, code) => {
    el.textContent = state.kind === 'f' && F_LABELS[code] ? F_LABELS[code] : labelOf.get(code);
  });
  render();
}

function showEvent(e) {
  $('ev-code').textContent = e.code || '(boş)';
  $('ev-key').textContent = e.key === ' ' ? '(boşluk)' : e.key;
  $('ev-keycode').textContent = String(e.keyCode);
  $('ev-loc').textContent = LOCATIONS[e.location] || String(e.location);
  const mods = ['ctrlKey', 'shiftKey', 'altKey', 'metaKey'].filter((m) => e[m]).map((m) => m.replace('Key', ''));
  $('ev-mods').textContent = mods.length ? mods.join(' + ') : 'yok';
}

const isFormField = (t) => t && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName);
const areaFocused = () => document.activeElement === $('kb-area');

function onKeyDown(e) {
  if (isFormField(e.target)) return;
  const code = e.code || 'Unidentified-' + e.keyCode;
  // Tarayıcı kısayollarını yalnızca test alanı odaktayken ve Tab dışında engelle (klavye tuzağı olmasın)
  let blocked = false;
  if (areaFocused() && $('block-shortcuts').checked && e.key !== 'Tab') { e.preventDefault(); blocked = true; }
  $('block-state').textContent = blocked ? 'Tarayıcı kısayolları engelleniyor.' : (areaFocused() ? 'Kısayol engelleme kapalı.' : 'Test alanı odakta değil: tuşlar kaydedilir ama tarayıcı kısayolları çalışır.');
  showEvent(e);
  if (e.repeat) {
    const now = e.timeStamp;
    if (state.repeatDelay == null && state.firstDown.has(code)) state.repeatDelay = now - state.firstDown.get(code);
    const prev = state.lastRepeat.get(code);
    if (prev != null && now - prev < 1000) { state.repeatGaps.push(now - prev); if (state.repeatGaps.length > 40) state.repeatGaps.shift(); }
    state.lastRepeat.set(code, now);
    if (state.repeatGaps.length >= 2) {
      const avg = state.repeatGaps.reduce((a, b) => a + b, 0) / state.repeatGaps.length;
      $('ev-rate').textContent = `${(1000 / avg).toFixed(1)} tuş/sn (aralık ${avg.toFixed(0)} ms)`;
    }
    $('report').textContent = reportText();
    return;
  }
  state.firstDown.set(code, e.timeStamp);
  state.lastRepeat.delete(code);
  state.tested.add(code);
  if (!keyEls.has(code)) state.extras.set(code, e.key);
  state.pressed.add(code);
  if (state.pressed.size >= state.peak) {
    state.peak = state.pressed.size;
    state.peakKeys = [...state.pressed].map((c) => (labelOf.get(c) || c));
  }
  render();
}
function onKeyUp(e) {
  const code = e.code || 'Unidentified-' + e.keyCode;
  state.pressed.delete(code);
  state.lastRepeat.delete(code);
  state.firstDown.delete(code);
  if (!isFormField(e.target)) showEvent(e);
  render();
}

function reset() {
  state.tested.clear(); state.pressed.clear(); state.extras.clear();
  state.peak = 0; state.peakKeys = []; state.repeatGaps = []; state.repeatDelay = null;
  state.firstDown.clear(); state.lastRepeat.clear();
  ['ev-code', 'ev-key', 'ev-keycode', 'ev-loc', 'ev-mods', 'ev-rate'].forEach((id) => { $(id).textContent = '–'; });
  $('copy-msg').textContent = '';
  render();
}

async function copyReport() {
  try {
    await navigator.clipboard.writeText(reportText());
    $('copy-msg').textContent = 'Rapor panoya kopyalandı.';
  } catch {
    // Pano izni yoksa metni seçtir
    const range = document.createRange();
    range.selectNodeContents($('report'));
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    $('copy-msg').textContent = 'Pano erişimi kapalı; rapor seçildi, Ctrl+C ile kopyalayabilirsiniz.';
  }
}

build();
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
// Odak kaybında basılı kalmış görünen tuşları bırak
window.addEventListener('blur', () => { state.pressed.clear(); render(); });
$('kb-area').addEventListener('focus', () => { $('area-state').textContent = 'Test alanı odakta: tuşlara basın.'; });
$('kb-area').addEventListener('blur', () => { $('area-state').textContent = 'Başlamak için bu alana tıklayın veya Tab ile gelin.'; });
$('kb-layout').addEventListener('change', (e) => { state.layout = e.target.value; applyLayout(); });
$('kb-kind').addEventListener('change', (e) => { state.kind = e.target.value; applyKind(); });
$('btn-reset').addEventListener('click', reset);
$('btn-copy').addEventListener('click', copyReport);
if (matchMedia('(pointer: coarse)').matches) $('touch-note').hidden = false;
applyLayout();
