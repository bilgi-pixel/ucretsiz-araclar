// Altyazı Düzenleme — SRT/VTT/ASS okur, düzenler, dönüştürür.
// Tüm işlem tarayıcıda yapılır; dosya ve metin hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';
import * as C from './core.js';

const $ = (id) => document.getElementById(id);
const PAGE = 40; // sayfa başına satır kartı (binlerce satırda sayfa donmasın)
const ODD_FILE = 5 * 1024 * 1024; // altyazı için olağandışı büyük
const BIG_FILE = 50 * 1024 * 1024; // genel uyarı eşiği

const S = { cues: [], original: [], format: 'srt', source: 'paste', name: 'altyazi', bytes: null, encoding: '', page: 0, issues: [] };
let previewTimer = 0;

/* ---------- Küçük yardımcılar ---------- */

function setStatus(el, msg, bad = false) {
  el.textContent = msg || '';
  el.classList.toggle('is-bad', !!msg && bad);
}
function setWarning(msg) {
  const w = $('warning');
  w.textContent = msg || '';
  w.classList.toggle('is-active', !!msg);
}
const fmtLabel = (f) => ({ srt: 'SRT', vtt: 'WebVTT', ass: 'ASS/SSA' }[f] || f.toUpperCase());
const totalMs = () => S.cues.reduce((m, c) => (c.end !== null && c.end > m ? c.end : m), 0);
const lastPage = () => Math.max(0, Math.ceil(S.cues.length / PAGE) - 1);

function resetEditor() {
  S.cues = []; S.original = []; S.bytes = null; S.page = 0; S.issues = [];
  $('editor').hidden = true;
  $('result').classList.remove('is-active');
  ['fix-status', 'op-status', 'row-status', 'out-status'].forEach((id) => setStatus($(id), ''));
}

/* ---------- Yükleme ---------- */

createDropzone({ el: $('drop'), accept: '.srt,.vtt,.ass,.ssa,.txt,text/plain,text/vtt', multiple: false, onFiles: handleFiles });

async function handleFiles(files) {
  const file = files[0];
  showError($('error'), '');
  setWarning('');
  // Uzantıya bakılır: Windows .srt için boş ya da garip MIME türü bildirebilir.
  if (!/\.(srt|vtt|ass|ssa|txt)$/i.test(file.name)) {
    showError($('error'), `"${file.name}" bir altyazı dosyası gibi görünmüyor. .srt, .vtt, .ass veya .ssa uzantılı bir dosya seçin; .sub/.idx gibi görüntü tabanlı altyazıları önce metin tabanlı SRT'ye çevirin.`);
    return;
  }
  setProgress($('progress'), 20, 'Dosya okunuyor…');
  await tick();
  let buf;
  try { buf = await file.arrayBuffer(); }
  catch { setProgress($('progress'), null); showError($('error'), 'Dosya okunamadı. Dosyanın başka bir programda açık olmadığından emin olup yeniden seçin.'); return; }
  setProgress($('progress'), 60, 'Kodlama çözülüyor ve satırlar ayrıştırılıyor…');
  await tick();
  const dec = C.decodeBytes(buf, 'auto');
  const ok = loadText(dec.text, {
    source: 'file', name: baseName(file.name) || 'altyazi', bytes: buf,
    encoding: dec.fellBack ? `${dec.encoding} (otomatik: UTF-8 geçersiz çıktı)` : dec.encoding,
  }, true);
  setProgress($('progress'), null);
  if (ok) {
    $('opt-enc').value = 'auto';
    $('opt-enc').disabled = false;
    if (file.size >= BIG_FILE) setWarning(`"${file.name}" ${formatBytes(file.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir. Bu boyutta bir dosya büyük ihtimalle altyazı değildir; doğru dosyayı seçtiğinizden emin olun.`);
    else if (file.size >= ODD_FILE) setWarning(`"${file.name}" ${formatBytes(file.size)}; altyazı dosyaları genellikle birkaç yüz KB'tır. Yanlış dosyayı seçmediğinizden emin olun.`);
    const bad = (dec.text.match(/�/g) || []).length;
    if (bad) setWarning(`Metinde ${bad} adet "�" karakteri var; dosya yanlış kodlamayla okunmuş olabilir. "Dosyayı şu kodlamayla oku" listesinden Windows-1254'ü deneyin.`);
  }
}

$('load-paste').addEventListener('click', () => {
  showError($('error'), '');
  setWarning('');
  const text = $('paste').value;
  if (!text.trim()) { showError($('error'), 'Önce altyazı metnini kutuya yapıştırın ya da yukarıdan bir dosya seçin.'); return; }
  const ok = loadText(text, { source: 'paste', name: 'altyazi', bytes: null, encoding: 'yapıştırılan metin' }, true);
  if (ok) {
    $('opt-enc').value = 'auto';
    $('opt-enc').disabled = true;
    $('enc-hint').textContent = 'Yapıştırılan metin zaten çözülmüş durumdadır. Harfler bozuksa "Türkçe karakterleri onar" düğmesini kullanın.';
    const bad = (text.match(/�/g) || []).length;
    if (bad) setWarning(`Yapıştırılan metinde ${bad} adet "�" karakteri var; bu harfler kaybolmuştur. Altyazıyı dosya olarak yükleyip kodlamayı Windows-1254 seçerek deneyin.`);
  }
});

$('clear').addEventListener('click', () => {
  $('paste').value = '';
  showError($('error'), '');
  setWarning('');
  resetEditor();
});

/** Metni ayrıştırır ve düzenleyiciyi doldurur. fresh=true ise çıktı biçimi kaynağa göre seçilir. */
function loadText(text, meta, fresh) {
  let parsed;
  try { parsed = C.parseSubtitle(text); }
  catch (e) { resetEditor(); showError($('error'), e.message); return false; }
  Object.assign(S, meta, { cues: parsed.cues, format: parsed.format, page: 0 });
  S.original = C.cloneCues(parsed.cues);
  $('editor').hidden = false;
  if (fresh) {
    $('out-format').value = parsed.format === 'vtt' ? 'vtt' : 'srt';
    $('out-enc').value = 'utf-8';
    $('enc-hint').textContent = 'Kodlamayı değiştirirseniz dosya yeniden okunur; yaptığınız düzenlemeler sıfırlanır.';
    ['fix-status', 'op-status', 'row-status', 'out-status'].forEach((id) => setStatus($(id), ''));
    $('result').classList.remove('is-active');
  }
  $('range-from').value = '1';
  $('range-to').value = String(S.cues.length);
  renderAll();
  return true;
}

$('opt-enc').addEventListener('change', () => {
  if (S.source !== 'file' || !S.bytes) return;
  const mode = $('opt-enc').value;
  const dec = C.decodeBytes(S.bytes, mode);
  const ok = loadText(dec.text, { encoding: dec.encoding }, false);
  setWarning('');
  if (ok) {
    const bad = (dec.text.match(/�/g) || []).length;
    setStatus($('fix-status'), `Dosya ${dec.encoding} kodlamasıyla yeniden okundu; düzenlemeler sıfırlandı.${bad ? ` Metinde ${bad} adet "�" karakteri var; başka bir kodlama deneyin.` : ''}`, !!bad);
  }
});

$('fix-tr').addEventListener('click', () => {
  // Tüm satırlar birlikte değerlendirilir: Latin-1 bozulması kararı satır satır değil, bütün metne bakarak verilir.
  const SEP = '\u0001';
  const r = C.fixTurkish(S.cues.map((c) => c.text).join(SEP));
  if (!r.count) {
    const bad = S.cues.reduce((n, c) => n + (c.text.match(/�/g) || []).length, 0);
    setStatus($('fix-status'), bad
      ? `Metinde ${bad} adet "�" karakteri var; bunlar onarılamaz. Dosyayı yeniden yükleyip kodlamayı Windows-1254 olarak seçin.`
      : 'Bozuk Türkçe karakter izi bulunamadı; metin zaten doğru görünüyor. Harfler soru işaretiyse dosyayı yükleyip kodlama listesinden Windows-1254 seçin.', !!bad);
    return;
  }
  r.text.split(SEP).forEach((t, i) => { if (S.cues[i]) S.cues[i].text = t; });
  setStatus($('fix-status'), `${r.count} bozuk karakter onarıldı. Satırları kontrol edin; sonuç beklediğiniz gibi değilse "Tüm değişiklikleri geri al" düğmesini kullanın.`);
  renderAll();
});

/* ---------- Görünüm ---------- */

function renderAll() {
  renderInfo();
  renderRows();
  refreshIssues();
  schedulePreview();
}

function renderInfo() {
  $('file-info').textContent = `Biçim: ${fmtLabel(S.format)} · Kodlama: ${S.encoding} · ${S.cues.length} satır · son satır bitişi ${C.formatTime(totalMs())}`;
}

const ROW_HTML = `<div class="as-row-head"><strong class="as-num"></strong><span class="as-flag"></span></div>
<div class="as-times"><label>Başlangıç<input class="as-t" data-f="start" type="text" inputmode="numeric" autocomplete="off" spellcheck="false"></label><label>Bitiş<input class="as-t" data-f="end" type="text" inputmode="numeric" autocomplete="off" spellcheck="false"></label></div>
<label class="as-lbl">Metin<textarea class="as-text" rows="2" spellcheck="true"></textarea></label>
<div class="as-btns"><button class="ba-btn" type="button" data-act="add">Altına satır ekle</button><button class="ba-btn" type="button" data-act="merge">Sonrakiyle birleştir</button><button class="ba-btn" type="button" data-act="del">Sil</button></div>`;

function rowEl(i) {
  const c = S.cues[i];
  const li = document.createElement('li');
  li.className = 'as-row';
  li.dataset.i = String(i);
  li.innerHTML = ROW_HTML;
  li.querySelector('.as-num').textContent = `Satır ${i + 1}`;
  const [a, b] = li.querySelectorAll('.as-t');
  a.value = c.start !== null ? C.formatTime(c.start) : c.rawStart || '';
  b.value = c.end !== null ? C.formatTime(c.end) : c.rawEnd || '';
  a.setAttribute('aria-label', `Satır ${i + 1} başlangıç zamanı`);
  b.setAttribute('aria-label', `Satır ${i + 1} bitiş zamanı`);
  const ta = li.querySelector('.as-text');
  ta.value = c.text;
  ta.setAttribute('aria-label', `Satır ${i + 1} metni`);
  if (i === S.cues.length - 1) li.querySelector('[data-act="merge"]').disabled = true;
  return li;
}

function renderRows() {
  S.page = Math.min(Math.max(0, S.page), lastPage());
  const list = $('rows');
  list.textContent = '';
  const from = S.page * PAGE;
  const to = Math.min(S.cues.length, from + PAGE);
  const frag = document.createDocumentFragment();
  for (let i = from; i < to; i++) frag.appendChild(rowEl(i));
  list.appendChild(frag);
  $('page-info').textContent = S.cues.length
    ? `Sayfa ${S.page + 1} / ${lastPage() + 1} · satır ${from + 1}–${to}`
    : 'Hiç satır yok';
  $('prev').disabled = S.page === 0;
  $('next').disabled = S.page >= lastPage();
  markRows();
}

/** Uyarı olan satır kartlarını işaretler. */
function markRows() {
  const byRow = new Map();
  for (const is of S.issues) { if (!byRow.has(is.i)) byRow.set(is.i, []); byRow.get(is.i).push(is); }
  for (const li of $('rows').children) {
    const list = byRow.get(Number(li.dataset.i));
    li.classList.toggle('has-issue', !!list);
    const flag = li.querySelector('.as-flag');
    flag.textContent = list ? `⚠ ${list.map((x) => ({ missing: 'zaman eksik', order: 'süre ≤ 0', unsorted: 'sıra bozuk', overlap: 'çakışıyor', empty: 'metin boş' }[x.type])).join(', ')}` : '';
  }
}

function refreshIssues() {
  S.issues = C.analyze(S.cues);
  const n = S.issues.length;
  $('issues-summary').textContent = n
    ? `${n} uyarı bulundu. Aşağıdaki listeden ilgili satıra gidip düzeltebilirsiniz.`
    : 'Sorun bulunamadı: çakışan, eksik zamanlı, süresiz ya da boş satır yok.';
  $('issues-summary').classList.toggle('as-ok', !n);
  const ul = $('issues');
  ul.textContent = '';
  for (const is of S.issues.slice(0, 30)) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = `Satır ${is.i + 1}: ${is.msg}`;
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'ba-btn go'; btn.textContent = 'Satıra git'; btn.dataset.go = String(is.i);
    btn.setAttribute('aria-label', `Satır ${is.i + 1}'e git`);
    li.append(span, btn);
    ul.appendChild(li);
  }
  if (n > 30) {
    const li = document.createElement('li');
    li.textContent = `… ve ${n - 30} uyarı daha. Önce yukarıdakileri düzeltin; liste yenilenir.`;
    ul.appendChild(li);
  }
  markRows();
}

function goTo(i) {
  S.page = Math.floor(i / PAGE);
  renderRows();
  const li = $('rows').querySelector(`li[data-i="${i}"]`);
  if (li) { li.scrollIntoView({ block: 'center', behavior: 'instant' }); li.querySelector('.as-t').focus(); }
}

$('issues').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-go]');
  if (b) goTo(Number(b.dataset.go));
});
$('prev').addEventListener('click', () => { S.page--; renderRows(); });
$('next').addEventListener('click', () => { S.page++; renderRows(); });

/* ---------- Satır düzenleme ---------- */

function changed() { refreshIssues(); renderInfo(); schedulePreview(); }

function commitTime(input) {
  const i = Number(input.closest('li').dataset.i);
  const f = input.dataset.f;
  const v = C.parseTime(input.value);
  if (v === null) {
    S.cues[i][f] = null;
    S.cues[i][f === 'start' ? 'rawStart' : 'rawEnd'] = input.value;
    input.setAttribute('aria-invalid', 'true');
    setStatus($('row-status'), `Satır ${i + 1}: "${input.value}" geçerli bir zaman değil. 00:01:02,500 biçiminde (saat:dakika:saniye,milisaniye) yazın; düzeltilene kadar satır "zaman eksik" sayılır.`, true);
  } else {
    S.cues[i][f] = v;
    input.removeAttribute('aria-invalid');
    input.value = C.formatTime(v);
    setStatus($('row-status'), '');
  }
  changed();
}

$('rows').addEventListener('change', (e) => { if (e.target.classList.contains('as-t')) commitTime(e.target); });
$('rows').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('as-t')) { e.preventDefault(); commitTime(e.target); }
});
$('rows').addEventListener('input', (e) => {
  if (!e.target.classList.contains('as-text')) return;
  const i = Number(e.target.closest('li').dataset.i);
  S.cues[i].text = e.target.value.replace(/\r/g, '');
  changed();
});
$('rows').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const i = Number(btn.closest('li').dataset.i);
  const act = btn.dataset.act;
  if (act === 'del') {
    S.cues.splice(i, 1);
    setStatus($('row-status'), `Satır ${i + 1} silindi; sonraki satırların numaraları kaydı.`);
  } else if (act === 'merge') {
    if (!C.mergeNext(S.cues, i)) { setStatus($('row-status'), 'Birleştirilecek bir sonraki satır yok.', true); return; }
    setStatus($('row-status'), `Satır ${i + 1} ile ${i + 2} birleştirildi.`);
  } else if (act === 'add') {
    insertAfter(i);
    return;
  }
  renderAll();
});

function insertAfter(i) {
  const prev = S.cues[i];
  const start = prev ? (prev.end ?? prev.start ?? 0) : (S.cues.length ? 0 : 0);
  S.cues.splice(i + 1, 0, { start, end: start + 2000, text: '', settings: '', rawStart: '', rawEnd: '' });
  S.page = Math.floor((i + 1) / PAGE);
  setStatus($('row-status'), `Satır ${i + 2} eklendi (2 saniyelik boş satır). Zamanı ve metni düzenleyin.`);
  renderAll();
  const li = $('rows').querySelector(`li[data-i="${i + 1}"]`);
  if (li) { li.scrollIntoView({ block: 'center', behavior: 'instant' }); li.querySelector('.as-text').focus(); }
}
$('add-row').addEventListener('click', () => insertAfter(S.cues.length - 1));

/* ---------- Zaman işlemleri ---------- */

$('scope').addEventListener('change', () => { $('field-range').hidden = $('scope').value !== 'range'; });
$('fps-preset').addEventListener('change', () => { $('field-ratio').hidden = $('fps-preset').value !== 'custom'; });

function getScope() {
  if ($('scope').value === 'all') return { from: 1, to: Infinity };
  const from = Number($('range-from').value.trim());
  const to = Number($('range-to').value.trim());
  const n = S.cues.length;
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to > n || from > to) {
    throw new Error(`Satır aralığı 1 ile ${n} arasında, başlangıç bitişten büyük olmayacak biçimde tam sayılarla yazılmalı (örn. 5 ve 20).`);
  }
  return { from, to };
}

const nfRatio = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 5 });

$('apply-shift').addEventListener('click', () => {
  const st = $('op-status');
  try {
    const raw = $('shift-sec').value.trim().replace(',', '.');
    const sec = Number(raw);
    if (!raw || !Number.isFinite(sec)) throw new Error('Kaydırma süresini saniye olarak yazın; örn. 2 (altyazı daha geç görünsün) ya da -1,5 (daha erken görünsün).');
    if (Math.abs(sec) > 36000) throw new Error('Kaydırma en fazla ±36000 saniye (10 saat) olabilir. Değeri saniye olarak kontrol edin.');
    const { from, to } = getScope();
    if (sec === 0) { setStatus(st, 'Kaydırma 0 saniye olduğu için değişiklik yapılmadı.'); return; }
    const r = C.shiftCues(S.cues, Math.round(sec * 1000), from, to);
    const nf = new Intl.NumberFormat('tr-TR').format(sec);
    setStatus(st, `${r.changed} satır ${sec > 0 ? '+' : ''}${nf} saniye kaydırıldı.${r.clamped ? ` ${r.clamped} satır 0. saniyenin öncesine düştüğü için 0'a sabitlendi; "Süresiz satırları sil" ile temizleyebilirsiniz.` : ''}`, !!r.clamped);
    renderAll();
  } catch (e) { setStatus(st, e.message, true); }
});

const FPS = { '23.976': 24000 / 1001, '29.97': 30000 / 1001 };
const fpsOf = (s) => FPS[s] ?? Number(s);

$('apply-speed').addEventListener('click', () => {
  const st = $('op-status');
  try {
    let factor;
    const v = $('fps-preset').value;
    if (v === 'custom') {
      const raw = $('ratio').value.trim().replace(',', '.');
      factor = Number(raw);
      if (!raw || !Number.isFinite(factor)) throw new Error('Oranı sayı olarak yazın; örn. 0,959 (yeni süre ÷ eski süre).');
    } else {
      const [src, dst] = v.split(':');
      factor = C.fpsFactor(fpsOf(src), fpsOf(dst));
    }
    if (factor < 0.5 || factor > 2) throw new Error('Oran 0,5 ile 2 arasında olmalıdır. Daha büyük bir fark varsa altyazı başka bir filme ait olabilir.');
    const { from, to } = getScope();
    const r = C.scaleCues(S.cues, factor, from, to);
    setStatus(st, `${r.changed} satırın zamanı ${nfRatio.format(factor)} oranıyla ölçeklendi.`);
    renderAll();
  } catch (e) { setStatus(st, e.message, true); }
});

$('sort').addEventListener('click', () => {
  C.sortCues(S.cues);
  setStatus($('op-status'), 'Satırlar başlangıç zamanına göre sıralandı.');
  renderAll();
});
$('fix-overlap').addEventListener('click', () => {
  const n = C.fixOverlaps(S.cues);
  setStatus($('op-status'), n ? `${n} çakışma giderildi (önceki satırın bitişi sonraki satırın başlangıcına çekildi).` : 'Giderilecek çakışma bulunamadı.');
  renderAll();
});
$('del-zero').addEventListener('click', () => {
  const before = S.cues.length;
  S.cues = S.cues.filter((c) => c.start === null || c.end === null || c.end > c.start);
  const n = before - S.cues.length;
  setStatus($('op-status'), n ? `${n} süresiz satır silindi.` : 'Süresi sıfır ya da negatif satır bulunamadı.');
  renderAll();
});

$('undo').addEventListener('click', () => {
  S.cues = C.cloneCues(S.original);
  S.page = 0;
  setStatus($('op-status'), '');
  setStatus($('out-status'), 'Tüm değişiklikler geri alındı; dosya ilk yüklendiği hâline döndü.');
  renderAll();
});

/* ---------- Çıktı ---------- */

function buildOutput() {
  const fmt = $('out-format').value;
  const enc = $('out-enc').value;
  let text = fmt === 'vtt' ? C.toVtt(S.cues) : C.toSrt(S.cues); // zamanı eksikse Türkçe Error fırlatır
  if ($('opt-crlf').checked) text = text.replace(/\n/g, '\r\n');
  const { bytes, lost } = C.encodeText(text, enc, { bom: $('opt-bom').checked && enc === 'utf-8' });
  const name = `${S.name}${fmt === S.format ? '-duzenlendi' : ''}.${fmt}`;
  return { text, bytes, lost, name, fmt };
}

function updatePreview() {
  const warn = $('out-warn');
  try {
    const o = buildOutput();
    $('out-text').value = o.text;
    warn.hidden = !o.lost.length;
    if (o.lost.length) warn.textContent = `Windows-1254'te karşılığı olmayan ${o.lost.length} farklı karakter (${o.lost.slice(0, 8).join(' ')}) "?" olarak yazılacak. Bu karakterler önemliyse UTF-8 seçin.`;
  } catch (e) {
    $('out-text').value = '';
    warn.hidden = false;
    warn.textContent = e.message;
  }
}
function schedulePreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(updatePreview, 150);
}
['out-format', 'out-enc', 'opt-bom', 'opt-crlf'].forEach((id) => $(id).addEventListener('change', updatePreview));
$('out-details').addEventListener('toggle', () => { if ($('out-details').open) updatePreview(); });

$('download').addEventListener('click', () => {
  const st = $('out-status');
  setStatus(st, '');
  let o;
  try { o = buildOutput(); } catch (e) { setStatus(st, e.message, true); return; }
  const mime = o.fmt === 'vtt' ? 'text/vtt' : 'application/x-subrip';
  downloadBlob(new Blob([o.bytes], { type: `${mime};charset=${$('out-enc').value}` }), o.name);
  $('result-info').textContent = `${o.name} indirildi (${formatBytes(o.bytes.length)}, ${S.cues.length} satır, ${fmtLabel(o.fmt)}, ${$('out-enc').value === 'utf-8' ? 'UTF-8' : 'Windows-1254'}).`;
  $('result').classList.add('is-active');
  updatePreview();
});

$('copy').addEventListener('click', async () => {
  const st = $('out-status');
  let o;
  try { o = buildOutput(); } catch (e) { setStatus(st, e.message, true); return; }
  try { await navigator.clipboard.writeText(o.text); setStatus(st, 'Altyazı metni panoya kopyalandı.'); }
  catch { setStatus(st, 'Kopyalanamadı; "Çıktıyı önizle" bölümünden metni elle seçip kopyalayın.', true); }
});

document.documentElement.dataset.ready = '1'; // testler için: dinleyiciler hazır
