// Hece ayırma arayüzü: kelime/metin modu ve şiir hece ölçüsü modu. Her şey tarayıcıda çalışır.
import { showError } from '../assets/js/ba.js';
import { tokenize, formatToken, countSyllables, breakPoints, hyphenateText, analyzeLine, METERS } from './hece.js';

const $ = (id) => document.getElementById(id);
const input = $('input');
const MAX_ROWS = 300;
const BIG_TEXT = 200000;

const mode = () => document.querySelector('input[name="mode"]:checked').value;

function announce(msg) {
  const live = $('live');
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = msg; });
}

let lastCopy = '';

/** Kelime / metin modu çıktısı. */
function renderWords() {
  const text = input.value;
  const toks = tokenize(text);
  const total = toks.reduce((n, t) => n + countSyllables(t.word), 0);
  $('n-words').textContent = String(toks.length);
  $('n-syl').textContent = String(total);
  const hyph = hyphenateText(text);
  $('out').textContent = hyph || '';
  lastCopy = hyph;

  const single = $('single');
  const breaks = $('breaks');
  if (toks.length === 1) {
    const f = formatToken(toks[0].word);
    single.hidden = false;
    single.textContent = `${f} (${countSyllables(toks[0].word)} hece)`;
    const bp = breakPoints(toks[0].word);
    breaks.hidden = false;
    breaks.textContent = bp.length
      ? `Satır sonunda bölünebilecek yerler: ${bp.join(' · ')}`
      : 'Bu sözcük satır sonunda bölünmemeli (tek hece ya da bölününce tek harf kalıyor).';
  } else {
    single.hidden = true;
    breaks.hidden = true;
  }

  // Tekrarsız sözcük tablosu
  const seen = new Set();
  const rows = $('rows');
  rows.textContent = '';
  let shown = 0;
  for (const t of toks) {
    const key = t.word.toLocaleLowerCase('tr-TR');
    if (seen.has(key)) continue;
    seen.add(key);
    if (shown >= MAX_ROWS) break;
    shown++;
    const tr = document.createElement('tr');
    const td1 = document.createElement('td'); td1.textContent = t.word;
    const td2 = document.createElement('td'); td2.textContent = formatToken(t.word);
    const bp = breakPoints(t.word);
    if (bp.length) { const s = document.createElement('small'); s.textContent = `Satır sonu: ${bp.join(' · ')}`; td2.appendChild(s); }
    const td3 = document.createElement('td'); td3.textContent = String(countSyllables(t.word));
    tr.append(td1, td2, td3);
    rows.appendChild(tr);
  }
  $('table').hidden = toks.length < 2;
}

const STATUS_TEXT = {
  uygun: (l, m) => `${m}'li ölçüye uygun`,
  eksik: (l) => `${-l.diff} hece eksik`,
  fazla: (l) => `${l.diff} hece fazla`,
  serbest: () => 'Serbest ölçü',
  bos: () => 'Boş satır',
};

/** Şiir modu çıktısı: her satırın hece sayısı. */
function renderPoem() {
  const key = $('olcu').value;
  const total = METERS[key].total;
  const list = $('poem');
  list.textContent = '';
  const lines = input.value.split('\n');
  let ok = 0; let counted = 0;
  const copyLines = [];
  lines.forEach((raw, i) => {
    if (!raw.trim()) return;
    const a = analyzeLine(raw, key);
    counted++;
    if (a.status === 'uygun') ok++;
    const li = document.createElement('li');
    li.className = `hc-line ${a.status}`;
    li.dataset.count = String(a.count);
    li.dataset.status = a.status;
    const num = document.createElement('span'); num.className = 'num'; num.textContent = `${a.count} hece`;
    const txt = document.createElement('span'); txt.className = 'txt'; txt.textContent = a.display;
    const st = document.createElement('span'); st.className = 'st';
    st.textContent = `${i + 1}. satır: ${STATUS_TEXT[a.status](a, total)}`;
    li.append(num, txt, st);
    list.appendChild(li);
    copyLines.push(`${a.count}\t${a.display}`);
  });
  $('p-lines').textContent = String(counted);
  $('p-summary').textContent = total && counted ? `${counted} satırın ${ok}'${ok === 1 ? 'i' : 'i'} ${total}'li ölçüye uygun` : '';
  lastCopy = copyLines.join('\n');
}

function render() {
  const poem = mode() === 'poem';
  $('word-panel').hidden = poem;
  $('poem-panel').hidden = !poem;
  $('meter-wrap').hidden = !poem;
  $('l-input').textContent = poem ? 'Şiir (her satıra bir dize)' : 'Kelime ya da metin';
  showError($('error'), input.value.length > BIG_TEXT
    ? 'Metin çok uzun; tarayıcı yavaşlayabilir. Daha küçük parçalarla çalışmanız önerilir.' : '');
  if (poem) renderPoem(); else renderWords();
}

input.addEventListener('input', render);
$('olcu').addEventListener('change', render);
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => {
  if (mode() === 'poem' && !input.value.trim()) fillSample();
  render();
}));
$('clear').addEventListener('click', () => { input.value = ''; render(); input.focus(); });
function fillSample() {
  input.value = mode() === 'poem'
    ? 'Bir ben vardır bende, benden içeru\nGönül bahçesinde açan güllere bak\nBen gidersem sen kal gülüm yanımda'
    : 'araba kardeş elektrik Türkiye kitaplık öğretmen';
}
$('sample').addEventListener('click', () => { fillSample(); render(); });
$('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(lastCopy);
    announce('Sonuç panoya kopyalandı');
    const btn = $('copy'); const old = btn.textContent;
    btn.textContent = 'Kopyalandı';
    setTimeout(() => { btn.textContent = old; }, 1500);
  } catch {
    showError($('error'), 'Pano erişimi engellendi. Sonucu seçip Ctrl+C (Mac: Cmd+C) ile kopyalayabilirsiniz.');
  }
});

document.body.dataset.ready = '1';
render();
