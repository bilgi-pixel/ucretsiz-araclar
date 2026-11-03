// Hesap Makinesi — tamamı tarayıcıda çalışır; eval/Function kullanılmaz.
// İfade ayrıştırıcı: tokenizer -> shunting-yard (RPN) -> değerlendirici.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Kullanıcıya gösterilecek Türkçe hata. */
class CalcError extends Error {}

/* ---------- Biçimlendirme ---------- */
/** Sayıyı 12 anlamlı basamağa yuvarlar, Türkçe ondalık virgülle yazar (0.1+0.2 -> 0,3). */
export function formatNumber(v) {
  if (Object.is(v, -0)) v = 0;
  if (Number.isInteger(v) && Math.abs(v) <= Number.MAX_SAFE_INTEGER) return String(v);
  const rounded = Number(v.toPrecision(12));
  return String(rounded).replace('.', ',');
}

/* ---------- Tokenizer ---------- */
const FUNCS = new Set(['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 'abs', 'exp']);
const WORDS = ['asin', 'acos', 'atan', 'sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'cbrt', 'abs', 'exp', 'mod', 'ans', 'pi', 'e']
  .sort((a, b) => b.length - a.length);

function tokenize(src, ctx) {
  const out = [];
  let i = 0;
  // Son jeton bir "operand sonu" mu (sayı, kapanış parantezi, sonek)?
  const prevEnds = () => {
    const p = out[out.length - 1];
    return !!p && (p.t === 'num' || p.t === 'rpar' || p.t === 'post');
  };
  const implicitMul = () => { if (prevEnds()) out.push({ t: 'op', o: '*' }); };
  const s = src.replace(/\s+/g, ' ');
  while (i < s.length) {
    const ch = s[i];
    if (ch === ' ') { i++; continue; }
    // Sayı: 12,5  .5  1e+21
    if (/[0-9]/.test(ch) || ((ch === ',' || ch === '.') && /[0-9]/.test(s[i + 1] || ''))) {
      const m = /^(?:[0-9]+(?:[.,][0-9]*)?|[.,][0-9]+)(?:e[+-]?[0-9]+)?/i.exec(s.slice(i));
      implicitMul();
      out.push({ t: 'num', v: parseFloat(m[0].replace(',', '.')) });
      i += m[0].length;
      continue;
    }
    if (ch === '(') { implicitMul(); out.push({ t: 'lpar' }); i++; continue; }
    if (ch === ')') { out.push({ t: 'rpar' }); i++; continue; }
    if (ch === 'π') { implicitMul(); out.push({ t: 'num', v: Math.PI }); i++; continue; }
    if (ch === '√') { implicitMul(); out.push({ t: 'fn', f: 'sqrt' }); i++; continue; }
    if (ch === '∛') { implicitMul(); out.push({ t: 'fn', f: 'cbrt' }); i++; continue; }
    if (ch === '!') { out.push({ t: 'post', o: '!' }); i++; continue; }
    if (ch === '%') { out.push({ t: 'post', o: '%' }); i++; continue; }
    if ('+-−–*×·/÷^'.includes(ch)) {
      const unary = !prevEnds();
      if (ch === '+') { if (!unary) out.push({ t: 'op', o: '+' }); i++; continue; }
      if ('-−–'.includes(ch)) { out.push(unary ? { t: 'neg' } : { t: 'op', o: '-' }); i++; continue; }
      if (unary) throw new CalcError('İfade anlaşılamadı: "' + ch + '" işlecinden önce bir sayı gerekir.');
      out.push({ t: 'op', o: ch === '×' || ch === '·' ? '*' : ch === '÷' ? '/' : ch });
      i++;
      continue;
    }
    // Kelimeler: fonksiyonlar, sabitler, mod, ans
    const rest = s.slice(i).toLowerCase();
    const w = WORDS.find((x) => rest.startsWith(x));
    if (w) {
      i += w.length;
      if (FUNCS.has(w)) { implicitMul(); out.push({ t: 'fn', f: w }); }
      else if (w === 'mod') {
        if (!prevEnds()) throw new CalcError('İfade anlaşılamadı: "mod" işlecinden önce bir sayı gerekir.');
        out.push({ t: 'op', o: 'mod' });
      } else if (w === 'pi') { implicitMul(); out.push({ t: 'num', v: Math.PI }); }
      else if (w === 'e') { implicitMul(); out.push({ t: 'num', v: Math.E }); }
      else if (w === 'ans') { implicitMul(); out.push({ t: 'num', v: ctx.ans || 0 }); }
      continue;
    }
    throw new CalcError('"' + ch + '" karakteri tanınmadı. Yalnızca rakam, + − × ÷ ^ ! % işleçleri, parantez ve fonksiyon adları kullanılabilir.');
  }
  return out;
}

/* ---------- Shunting-yard: infix -> RPN ---------- */
const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, mod: 2, neg: 3, '^': 4 };
const RIGHT = new Set(['^']);

function toRPN(tokens) {
  const out = [], st = [];
  for (const tk of tokens) {
    if (tk.t === 'num' || tk.t === 'post') out.push(tk); // sonek işleçler en son çıkan operanda uygulanır
    else if (tk.t === 'fn' || tk.t === 'lpar' || tk.t === 'neg') st.push(tk); // önek: yığına
    else if (tk.t === 'op') {
      const p = PREC[tk.o];
      while (st.length) {
        const top = st[st.length - 1];
        if (top.t === 'fn') { out.push(st.pop()); continue; }
        if (top.t === 'neg' || top.t === 'op') {
          const tp = top.t === 'neg' ? PREC.neg : PREC[top.o];
          if (tp > p || (tp === p && !RIGHT.has(tk.o))) { out.push(st.pop()); continue; }
        }
        break;
      }
      st.push(tk);
    } else if (tk.t === 'rpar') {
      while (st.length && st[st.length - 1].t !== 'lpar') out.push(st.pop());
      if (!st.length) throw new CalcError('Parantezler eşleşmiyor: fazladan ")" var. Parantezleri kontrol edin.');
      st.pop();
      if (st.length && st[st.length - 1].t === 'fn') out.push(st.pop());
    }
  }
  // Açık kalan parantezler otomatik kapanır.
  while (st.length) { const x = st.pop(); if (x.t !== 'lpar') out.push(x); }
  return out;
}

/* ---------- Değerlendirme ---------- */
function factorial(n) {
  if (!Number.isInteger(n) || n < 0 || n > 170) throw new CalcError('Faktöriyel yalnızca 0 ile 170 arasındaki tam sayılar için hesaplanır.');
  let r = 1;
  for (let k = 2; k <= n; k++) r *= k;
  return r;
}

function trig(name, x, deg) {
  if (deg) {
    const a = ((x % 360) + 360) % 360;
    // Tam açılarda kayan nokta hatası olmasın (sin 180 = 0, cos 90 = 0).
    if (name === 'sin') { if (a % 180 === 0) return 0; if (a === 90) return 1; if (a === 270) return -1; }
    if (name === 'cos') { if (a === 90 || a === 270) return 0; if (a === 0) return 1; if (a === 180) return -1; }
    if (name === 'tan') {
      if (a % 180 === 0) return 0;
      if (a % 180 === 90) throw new CalcError('Bu açının tanjantı tanımsız (90° ve 270° gibi açılar).');
    }
    x = (x * Math.PI) / 180;
  } else if (name === 'tan' && Math.abs(Math.cos(x)) < 1e-15) {
    throw new CalcError('Bu açının tanjantı tanımsız.');
  }
  const r = Math[name](x);
  return Math.abs(r) < 1e-15 ? 0 : r;
}

function applyFn(f, x, deg) {
  switch (f) {
    case 'sin': case 'cos': case 'tan': return trig(f, x, deg);
    case 'asin': case 'acos': {
      if (x < -1 || x > 1) throw new CalcError('Ters sinüs/kosinüs yalnızca −1 ile 1 arasındaki değerler için tanımlıdır.');
      const r = Math[f](x);
      return deg ? (r * 180) / Math.PI : r;
    }
    case 'atan': { const r = Math.atan(x); return deg ? (r * 180) / Math.PI : r; }
    case 'log': if (x <= 0) throw new CalcError('Logaritma yalnızca sıfırdan büyük sayılar için tanımlıdır.'); return Math.log10(x);
    case 'ln': if (x <= 0) throw new CalcError('Doğal logaritma yalnızca sıfırdan büyük sayılar için tanımlıdır.'); return Math.log(x);
    case 'sqrt': if (x < 0) throw new CalcError('Negatif sayının karekökü gerçek sayı değildir.'); return Math.sqrt(x);
    case 'cbrt': return Math.cbrt(x);
    case 'abs': return Math.abs(x);
    case 'exp': return Math.exp(x);
  }
  throw new CalcError('Bilinmeyen fonksiyon: ' + f);
}

function checkFinite(r) {
  if (Number.isNaN(r)) throw new CalcError('Bu işlemin gerçek sayı sonucu yok. İfadeyi kontrol edin.');
  if (!Number.isFinite(r)) throw new CalcError('Sonuç hesaplanamayacak kadar büyük. Daha küçük sayılar deneyin.');
  return r;
}

function evalRPN(rpn, deg) {
  const st = [];
  const bad = () => new CalcError('İfade tamamlanmamış. İşleçlerin iki yanında sayı olduğundan ve parantezlerin dengeli olduğundan emin olun.');
  for (const tk of rpn) {
    if (tk.t === 'num') st.push({ v: tk.v });
    else if (tk.t === 'neg') { const a = st.pop(); if (!a) throw bad(); st.push({ v: -a.v }); }
    else if (tk.t === 'post') {
      const a = st.pop(); if (!a) throw bad();
      st.push(tk.o === '!' ? { v: factorial(a.v) } : { v: a.v / 100, pct: true });
    } else if (tk.t === 'fn') { const a = st.pop(); if (!a) throw bad(); st.push({ v: checkFinite(applyFn(tk.f, a.v, deg)) }); }
    else if (tk.t === 'op') {
      const b = st.pop(), a = st.pop();
      if (!a || !b) throw bad();
      let r;
      switch (tk.o) {
        // 200+10% -> 220: yüzde, soldaki sayıya göre uygulanır.
        case '+': r = b.pct ? a.v + a.v * b.v : a.v + b.v; break;
        case '-': r = b.pct ? a.v - a.v * b.v : a.v - b.v; break;
        case '*': r = a.v * b.v; break;
        case '/': if (b.v === 0) throw new CalcError('Sıfıra bölme tanımsız. Bölenin sıfırdan farklı olduğundan emin olun.'); r = a.v / b.v; break;
        case 'mod': if (b.v === 0) throw new CalcError('Sıfıra göre mod alınamaz. Bölen sıfırdan farklı olmalı.'); r = ((a.v % b.v) + b.v) % b.v; break;
        case '^': r = Math.pow(a.v, b.v); break;
      }
      st.push({ v: checkFinite(r) });
    }
  }
  if (st.length !== 1) throw bad();
  return st[0].v;
}

/** İfadeyi hesaplar; hata durumunda CalcError fırlatır. */
export function calculate(src, { deg = true, ans = 0 } = {}) {
  const tokens = tokenize(src, { ans });
  if (!tokens.length) throw new CalcError('Önce bir işlem yazın. Örnek: 2+3×4');
  return evalRPN(toRPN(tokens), deg);
}

/* ---------- Arayüz ---------- */
function init() {
  const calc = $('calc');
  if (!calc) return;
  const expr = $('expr'), result = $('result'), errBox = $('error'), status = $('status');
  const state = { deg: true, mem: null, ans: 0, justEvaluated: false, history: [] };
  const fine = () => window.matchMedia('(pointer: fine)').matches;

  const say = (msg) => { status.textContent = msg; };

  /* Önizleme: yazarken sonucu soluk gösterir, hatayı bastırır. */
  function preview() {
    showError(errBox, '');
    result.classList.remove('is-final');
    const src = expr.value.trim();
    if (!src) { result.textContent = '0'; return; }
    try { result.textContent = formatNumber(calculate(src, state)); } catch { result.textContent = ''; }
  }

  function evaluate() {
    const src = expr.value.trim();
    if (!src) return;
    try {
      const v = calculate(src, state);
      const text = formatNumber(v);
      result.textContent = text;
      result.classList.add('is-final');
      showError(errBox, '');
      state.ans = Number(text.replace(',', '.'));
      if (!Number.isFinite(state.ans)) state.ans = v;
      state.justEvaluated = true;
      pushHistory(src, text);
    } catch (e) {
      if (!(e instanceof CalcError)) throw e;
      result.textContent = 'Hata';
      result.classList.add('is-final');
      showError(errBox, e.message);
    }
  }

  /* İmleç konumuna ekle. */
  function insert(text) {
    if (state.justEvaluated) {
      // Sonuçtan sonra işleç yazılırsa sonuçla devam edilir; yeni sayı yazılırsa temiz başlanır.
      if (/^[+\-−×÷*/^%!]|^ mod/.test(text)) expr.value = result.textContent === 'Hata' ? '' : result.textContent;
      else expr.value = '';
      state.justEvaluated = false;
      expr.setSelectionRange(expr.value.length, expr.value.length);
    }
    const s = expr.selectionStart ?? expr.value.length, e = expr.selectionEnd ?? s;
    expr.setRangeText(text, s, e, 'end');
    preview();
  }

  function backspace() {
    state.justEvaluated = false;
    const s = expr.selectionStart ?? expr.value.length, e = expr.selectionEnd ?? s;
    if (s !== e) expr.setRangeText('', s, e, 'end');
    else if (s > 0) expr.setRangeText('', s - 1, s, 'end');
    preview();
  }

  function clearAll() {
    expr.value = '';
    state.justEvaluated = false;
    preview();
    say('Temizlendi.');
  }

  /* Bellek: yalnızca sayfa içinde, saklanmaz. */
  function currentValue() {
    const src = expr.value.trim();
    if (!src) return state.ans;
    return calculate(src, state);
  }
  function memory(kind) {
    const badge = $('mem-badge');
    if (kind === 'MC') { state.mem = null; badge.hidden = true; say('Hafıza temizlendi.'); return; }
    if (kind === 'MR') {
      if (state.mem === null) { say('Hafıza boş. Önce M+ ile bir değer ekleyin.'); return; }
      insert(formatNumber(state.mem));
      return;
    }
    try {
      const v = currentValue();
      state.mem = (state.mem ?? 0) + (kind === 'M+' ? v : -v);
      badge.hidden = false;
      badge.textContent = 'M = ' + formatNumber(state.mem);
      say('Hafıza: ' + formatNumber(state.mem));
    } catch (e) {
      if (!(e instanceof CalcError)) throw e;
      showError(errBox, 'Hafızaya eklenemedi: ' + e.message);
    }
  }

  /* Geçmiş: son 50 işlem, yalnızca sayfa belleğinde. */
  function pushHistory(src, text) {
    state.history.unshift({ src, text });
    if (state.history.length > 50) state.history.length = 50;
    renderHistory();
  }
  function renderHistory() {
    const list = $('history');
    list.textContent = '';
    $('history-empty').hidden = state.history.length > 0;
    $('history-clear').hidden = state.history.length === 0;
    state.history.forEach((h, idx) => {
      const li = document.createElement('li');
      li.className = 'calc-h-item';
      const txt = document.createElement('span');
      txt.className = 'calc-h-text';
      txt.textContent = h.src + ' = ' + h.text;
      const use = document.createElement('button');
      use.type = 'button'; use.className = 'ba-btn calc-h-btn'; use.textContent = 'Kullan';
      use.setAttribute('aria-label', 'Sonucu kullan: ' + h.text);
      use.dataset.hUse = String(idx);
      const cp = document.createElement('button');
      cp.type = 'button'; cp.className = 'ba-btn calc-h-btn'; cp.textContent = 'Kopyala';
      cp.setAttribute('aria-label', 'Kopyala: ' + h.src + ' = ' + h.text);
      cp.dataset.hCopy = String(idx);
      li.append(txt, use, cp);
      list.append(li);
    });
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* aşağıdaki yedeğe geç */ }
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.append(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }

  /* Tam ekran: destek yoksa CSS ile tam görünüm. */
  function setFsLabel(on) {
    const b = $('fs-btn');
    b.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
    b.setAttribute('aria-pressed', String(on));
  }
  function toggleFullscreen() {
    const wrap = $('calc-wrap');
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (wrap.classList.contains('is-fs')) { wrap.classList.remove('is-fs'); setFsLabel(false); return; }
    if (wrap.requestFullscreen) wrap.requestFullscreen().catch(() => { wrap.classList.add('is-fs'); setFsLabel(true); });
    else { wrap.classList.add('is-fs'); setFsLabel(true); }
  }
  document.addEventListener('fullscreenchange', () => setFsLabel(!!document.fullscreenElement));

  /* Tuş takımı (olay delegasyonu). */
  calc.addEventListener('click', async (ev) => {
    const btn = ev.target.closest('button');
    if (!btn || !calc.contains(btn)) return;
    if (btn.dataset.hUse !== undefined) {
      const h = state.history[+btn.dataset.hUse];
      if (h) { state.justEvaluated = false; insert(h.text); }
      return;
    }
    if (btn.dataset.hCopy !== undefined) {
      const h = state.history[+btn.dataset.hCopy];
      if (h) say((await copyText(h.src + ' = ' + h.text)) ? 'Kopyalandı.' : 'Kopyalanamadı; metni elle seçip kopyalayın.');
      return;
    }
    const ins = btn.dataset.ins, act = btn.dataset.act;
    if (ins !== undefined) insert(ins);
    else if (act === 'eval') evaluate();
    else if (act === 'ac') clearAll();
    else if (act === 'back') backspace();
    else if (act === 'mem') memory(btn.dataset.mem);
    else if (act === 'angle') {
      state.deg = !state.deg;
      btn.textContent = state.deg ? 'Derece' : 'Radyan';
      btn.setAttribute('aria-pressed', String(!state.deg));
      $('angle-badge').textContent = state.deg ? 'DER' : 'RAD';
      preview();
    } else if (act === 'copy-result') {
      const t = result.textContent;
      if (t && t !== 'Hata') say((await copyText(t)) ? 'Sonuç kopyalandı.' : 'Kopyalanamadı; sonucu elle seçip kopyalayın.');
    } else if (act === 'history-clear') { state.history = []; renderHistory(); say('Geçmiş temizlendi.'); }
    else if (act === 'mode') {
      const sci = btn.dataset.mode === 'sci';
      $('sci').hidden = !sci;
      calc.classList.toggle('is-sci', sci);
      document.querySelectorAll('[data-act="mode"]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    } else if (act === 'fullscreen') toggleFullscreen();
    // Masaüstünde odağı ifade kutusunda tut; dokunmatikte ekran klavyesi açılmasın.
    if (ins !== undefined || ['eval', 'ac', 'back', 'mem'].includes(act)) { if (fine()) expr.focus(); }
  });

  /* Klavye: ifade kutusu. */
  expr.addEventListener('input', () => { state.justEvaluated = false; preview(); });
  expr.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { ev.preventDefault(); evaluate(); return; }
    if (ev.key === 'Escape') { ev.preventDefault(); clearAll(); return; }
    if (state.justEvaluated && ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
      // Sonuçtan sonra: işleç sonuçla devam ettirir, diğer tuşlar yeni işlem başlatır.
      expr.value = /[+\-*/^%!]/.test(ev.key) && result.textContent !== 'Hata' ? result.textContent : '';
      state.justEvaluated = false;
    }
  });
  // Odak başka yerdeyken yazılan tuşlar ifade kutusuna yönlendirilir.
  document.addEventListener('keydown', (ev) => {
    if (document.activeElement !== document.body || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (ev.key.length === 1 && /[0-9+\-*/^()%!.,a-zπ√]/i.test(ev.key)) expr.focus();
  });

  renderHistory();
  preview();
  if (fine()) expr.focus();
}

init();
