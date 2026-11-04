// Türkçe yazım denetimi arayüzü. Metin ve sözlük tarayıcıdan çıkmaz; liste aynı kökenden fetch ile okunur.
import { showError, setProgress, tick } from '../assets/js/ba.js';
import { createSpeller, checkText, applyReplacement, applyFormatFixes, matchCase } from './sozluk.js';

const $ = (id) => document.getElementById(id);
const input = $('input');
const WORD_LIST_URL = '../kelime-bulucu/kelimeler.txt';
const BIG_TEXT = 300000; // bu uzunluktan sonra uyarı

let speller = null;
let issues = [];
let ignored = new Set();
let runId = 0;
let timer = null;
let selected = -1;

const keyOf = (i) => `${i.code}:${i.text.toLocaleLowerCase('tr-TR')}`;

function announce(msg) {
  const live = $('live');
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = msg; });
}

const KIND_LABEL = { spell: 'Yazım', rule: 'Kural', hint: 'İpucu' };

/** İşaretli metin görünümünü kurar. */
function renderMarked(text) {
  const box = $('marked');
  box.textContent = '';
  if (!text.trim()) {
    const p = document.createElement('p');
    p.className = 'yk-empty';
    p.textContent = 'Metin yazdıkça ya da yapıştırdıkça işaretli hâli burada görünür.';
    box.appendChild(p);
    return;
  }
  let pos = 0;
  for (const i of issues) {
    if (i.start > pos) box.appendChild(document.createTextNode(text.slice(pos, i.start)));
    const mark = document.createElement('mark');
    mark.className = `yk-${i.kind}`;
    mark.tabIndex = 0;
    mark.setAttribute('role', 'button');
    mark.dataset.i = String(i.id);
    mark.dataset.start = String(i.start);
    mark.setAttribute('aria-label', `${KIND_LABEL[i.kind]} sorunu: ${i.text}. Ayrıntı için Enter tuşuna basın.`);
    mark.textContent = i.text;
    box.appendChild(mark);
    pos = i.end;
  }
  if (pos < text.length) box.appendChild(document.createTextNode(text.slice(pos)));
}

function renderCounts() {
  const n = { spell: 0, rule: 0, hint: 0 };
  for (const i of issues) n[i.kind]++;
  const total = issues.length;
  $('count').textContent = !input.value.trim() ? 'Henüz denetlenecek metin yok'
    : total ? `${total} sorun bulundu` : 'Sorun bulunamadı';
  $('breakdown').textContent = input.value.trim() ? `Yazım: ${n.spell} · Kural: ${n.rule} · İpucu: ${n.hint}` : '';
  $('fix-format').hidden = !issues.some((i) => i.fixable);
  $('reset-ignored').hidden = ignored.size === 0;
}

async function run() {
  const id = ++runId;
  if (!speller) return;
  const text = input.value;
  showError($('error'), text.length > BIG_TEXT
    ? 'Metin çok uzun; denetim yavaş olabilir. Daha küçük parçalarla çalışmanız önerilir.' : '');
  const long = text.length > 20000;
  if (long) setProgress($('progress'), 0, 'Metin denetleniyor…');
  const result = await checkText(text, speller, {
    ignored,
    checkStart: $('check-start').checked,
    tick,
    cancelled: () => id !== runId,
    onProgress: (f) => { if (long) setProgress($('progress'), f * 100, 'Metin denetleniyor…'); },
  });
  if (long) setProgress($('progress'), null);
  if (id !== runId) return;
  issues = result;
  selected = -1;
  renderMarked(text);
  renderCounts();
  clearDetail();
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(run, 200);
}

function clearDetail() {
  $('detail').hidden = true;
  $('detail-body').textContent = '';
}

/** Seçilen sorunun ayrıntı panelini gösterir. */
function showDetail(issue) {
  selected = issue.id;
  const body = $('detail-body');
  body.textContent = '';
  $('detail').hidden = false;
  const title = document.createElement('p');
  title.className = 'yk-detail-title';
  const strong = document.createElement('strong');
  strong.textContent = issue.text;
  title.append(strong, ` · ${KIND_LABEL[issue.kind]}`);
  const msg = document.createElement('p');
  msg.textContent = issue.kind === 'spell' ? 'Sözlükte bulunamadı. Aşağıdaki en yakın önerilerden birini seçebilir ya da yoksayabilirsiniz.' : issue.message;
  body.append(title, msg);
  let choices = issue.choices;
  if (issue.kind === 'spell') choices = speller.suggest(issue.text, 5).map((s) => matchCase(issue.text, s));
  const list = document.createElement('div');
  list.id = 'suggestions';
  list.className = 'ba-actions';
  list.setAttribute('role', 'group');
  list.setAttribute('aria-label', 'Öneriler');
  if (choices && choices.length) {
    for (const c of choices) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ba-btn ba-btn-primary';
      b.textContent = c;
      b.title = 'Öneriyi uygula';
      b.addEventListener('click', () => applyChoice(issue, c));
      list.appendChild(b);
    }
  } else {
    const none = document.createElement('p');
    none.className = 'yk-none';
    none.textContent = 'Yakın bir öneri bulunamadı. Sözcüğü kontrol edin; özel ad ya da terim ise yoksayabilirsiniz.';
    body.appendChild(none);
  }
  const ign = document.createElement('button');
  ign.type = 'button';
  ign.className = 'ba-btn';
  ign.id = 'ignore';
  ign.textContent = 'Yoksay';
  ign.addEventListener('click', () => {
    ignored.add(keyOf(issue));
    announce(`"${issue.text}" yoksayıldı`);
    run();
  });
  list.appendChild(ign);
  body.appendChild(list);
}

async function applyChoice(issue, choice) {
  const start = issue.start;
  input.value = applyReplacement(input.value, issue, choice);
  announce('Öneri uygulandı');
  await run();
  const next = Array.from($('marked').querySelectorAll('mark')).find((m) => Number(m.dataset.start) >= start);
  (next || input).focus();
}

function openMark(mark) {
  const issue = issues[Number(mark.dataset.i)];
  if (issue) showDetail(issue);
}

$('marked').addEventListener('click', (e) => {
  const m = e.target.closest('mark');
  if (m) openMark(m);
});
$('marked').addEventListener('keydown', (e) => {
  const m = e.target.closest && e.target.closest('mark');
  if (m && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openMark(m); }
  if (e.key === 'Escape') clearDetail();
});

input.addEventListener('input', schedule);
$('check-start').addEventListener('change', run);
$('clear').addEventListener('click', () => { input.value = ''; run(); input.focus(); });
$('sample').addEventListener('click', () => {
  input.value = 'Bu bir denem metni. Dün akşam geldimi diye sordum, sey dedi  ve gitti.\nYarın evde ki kitapları okuyacağım,ama vakit bulamayabilirim.';
  run();
});
$('reset-ignored').addEventListener('click', () => { ignored = new Set(); run(); });
$('fix-format').addEventListener('click', () => {
  const r = applyFormatFixes(input.value, issues);
  input.value = r.text;
  announce(`${r.count} biçim sorunu düzeltildi`);
  run();
});
$('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(input.value);
    announce('Düzeltilmiş metin panoya kopyalandı');
    const btn = $('copy'); const old = btn.textContent;
    btn.textContent = 'Kopyalandı';
    setTimeout(() => { btn.textContent = old; }, 1500);
  } catch {
    input.select();
    showError($('error'), 'Pano erişimi engellendi. Metin seçildi; Ctrl+C (Mac: Cmd+C) ile kopyalayabilirsiniz.');
  }
});

async function init() {
  setProgress($('progress'), 10, 'Sözlük yükleniyor…');
  try {
    const res = await fetch(WORD_LIST_URL);
    if (!res.ok) throw new Error('http');
    const text = await res.text();
    setProgress($('progress'), 60, 'Sözlük hazırlanıyor…');
    await tick();
    speller = createSpeller(text.split('\n').map((w) => w.trim()).filter(Boolean));
  } catch {
    setProgress($('progress'), null);
    showError($('error'), 'Sözlük yüklenemedi. Sayfayı yenileyin; sorun sürerse internet bağlantınızı ve tarayıcı önbelleğini kontrol edin.');
    return;
  }
  setProgress($('progress'), null);
  $('dict-info').textContent = `${speller.size.toLocaleString('tr-TR')} sözcük`;
  document.body.dataset.ready = '1';
  await run();
}

renderMarked('');
init();
