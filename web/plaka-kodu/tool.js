import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Türkçe karakterleri ve aksanları sadeleştirip küçük harfe çevirir. */
const fold = (s) => String(s || '')
  .replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i')
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
  .trim();

let data = null;
const sortState = { key: 'plaka', dir: 1 };

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}
function flash(el, text) {
  el.textContent = text;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.textContent = ''; }, 4000);
}

const ilText = (il) => `${il.plaka} ${il.ad}: plaka ${il.plaka}, alan kodu ${il.alan.map((a) => '0' + a).join(' / ')}`;

/* ---------- Arama ---------- */
function searchIl(raw) {
  const q = raw.trim();
  if (!q) return { list: [], hint: '' };
  const digits = q.replace(/[\s()+\-.]/g, '');
  if (/^\d+$/.test(digits)) {
    if (digits.length <= 2) {
      const n = parseInt(digits, 10);
      const found = data.iller.filter((i) => parseInt(i.plaka, 10) === n);
      return { list: found, hint: found.length ? '' : 'Plaka kodu 1 ile 81 arasında olmalıdır.' };
    }
    // Baştaki 0 atılır; tam numara yazıldıysa ilk üç hane alan kodudur.
    let area = digits.replace(/^0+/, '');
    if (area.length > 3) area = area.slice(0, 3);
    const found = data.iller.filter((i) => i.alan.includes(area));
    if (found.length) return { list: found, hint: '' };
    // 3 hane ama alan kodu değil (örn. 5xx cep numarası)
    return { list: [], hint: /^5/.test(area) ? 'Bu cep telefonu kodu; cep numaraları il belirtmez. Alan kodu yalnızca sabit hatlar içindir.' : 'Bu alan koduna ait il bulunamadı. Üç haneli kodu (örneğin 322) kontrol edin.' };
  }
  const f = fold(q);
  const found = data.iller.filter((i) => fold(i.ad).includes(f));
  return { list: found, hint: found.length ? '' : 'Eşleşen il bulunamadı. İl adının ilk harflerini yazmayı deneyin.' };
}

function renderResults() {
  const ul = $('results');
  ul.textContent = '';
  const { list, hint } = searchIl($('q').value);
  showError($('error'), hint);
  list.slice(0, 20).forEach((il) => {
    const li = document.createElement('li');
    li.dataset.plaka = il.plaka;
    const box = document.createElement('div');
    const main = document.createElement('div'); main.className = 'main'; main.textContent = `${il.plaka} – ${il.ad}`;
    const sub = document.createElement('div'); sub.className = 'sub';
    sub.textContent = `Plaka: ${il.plaka} · Alan kodu: ${il.alan.map((a) => '0' + a).join(' / ')}`;
    box.append(main, sub);
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ba-btn'; btn.textContent = 'Kopyala';
    btn.setAttribute('aria-label', `${il.ad} bilgisini kopyala`);
    btn.addEventListener('click', async () => flash($('status'), (await copyText(ilText(il))) ? `${il.ad} bilgisi kopyalandı.` : 'Kopyalanamadı.'));
    li.append(box, btn);
    ul.appendChild(li);
  });
}

/* ---------- Tablolar ---------- */
function addCell(tr, text, label, cls) {
  const td = document.createElement('td');
  td.textContent = text; td.dataset.label = label;
  if (cls) td.className = cls;
  tr.appendChild(td);
}
function renderIlTable() {
  const { key, dir } = sortState;
  const rows = [...data.iller].sort((a, b) => {
    if (key === 'ad') return a.ad.localeCompare(b.ad, 'tr') * dir;
    if (key === 'alan') return (parseInt(a.alan[0], 10) - parseInt(b.alan[0], 10)) * dir;
    return (parseInt(a.plaka, 10) - parseInt(b.plaka, 10)) * dir;
  });
  const body = $('il-body');
  body.textContent = '';
  rows.forEach((il) => {
    const tr = document.createElement('tr');
    addCell(tr, il.plaka, 'Plaka', 'num');
    addCell(tr, il.ad, 'İl');
    addCell(tr, il.alan.map((a) => '0' + a).join(' / '), 'Alan kodu', 'num');
    const td = document.createElement('td');
    const b = document.createElement('button'); b.type = 'button'; b.className = 'ba-btn'; b.textContent = 'Kopyala';
    b.setAttribute('aria-label', `${il.ad} bilgisini kopyala`);
    b.addEventListener('click', async () => flash($('status'), (await copyText(ilText(il))) ? `${il.ad} bilgisi kopyalandı.` : 'Kopyalanamadı.'));
    td.appendChild(b); tr.appendChild(td);
    body.appendChild(tr);
  });
  document.querySelectorAll('#il-table th[aria-sort]').forEach((th) => {
    const k = th.querySelector('button').dataset.sort;
    th.setAttribute('aria-sort', k === key ? (dir === 1 ? 'ascending' : 'descending') : 'none');
  });
}
document.querySelectorAll('#il-table [data-sort]').forEach((b) => b.addEventListener('click', () => {
  const k = b.dataset.sort;
  if (sortState.key === k) sortState.dir *= -1; else { sortState.key = k; sortState.dir = 1; }
  renderIlTable();
}));

function renderUlke() {
  const raw = $('qc').value;
  const digits = raw.replace(/[\s+\-]/g, '').replace(/^00/, '');
  const f = fold(raw);
  const list = !f ? data.ulkeler : /^\d+$/.test(digits)
    ? data.ulkeler.filter((u) => u.kod.startsWith(digits))
    : data.ulkeler.filter((u) => fold(u.ad).includes(f));
  const body = $('ulke-body');
  body.textContent = '';
  list.forEach((u) => {
    const tr = document.createElement('tr');
    addCell(tr, u.not ? `${u.ad} (${u.not})` : u.ad, 'Ülke');
    addCell(tr, `+${u.kod}`, 'Kod', 'num');
    const td = document.createElement('td');
    const b = document.createElement('button'); b.type = 'button'; b.className = 'ba-btn'; b.textContent = 'Kopyala';
    b.setAttribute('aria-label', `${u.ad} ülke kodunu kopyala`);
    b.addEventListener('click', async () => flash($('ulke-status'), (await copyText(`+${u.kod}`)) ? `${u.ad}: +${u.kod} kopyalandı.` : 'Kopyalanamadı.'));
    td.appendChild(b); tr.appendChild(td);
    body.appendChild(tr);
  });
  $('ulke-empty').hidden = list.length > 0;
  $('ulke-table').hidden = list.length === 0;
}

/* ---------- Sekmeler ---------- */
function selectTab(name) {
  const il = name === 'il';
  $('tab-il').setAttribute('aria-selected', String(il));
  $('tab-ulke').setAttribute('aria-selected', String(!il));
  $('tab-il').tabIndex = il ? 0 : -1;
  $('tab-ulke').tabIndex = il ? -1 : 0;
  $('panel-il').hidden = !il;
  $('panel-ulke').hidden = il;
}
$('tab-il').addEventListener('click', () => selectTab('il'));
$('tab-ulke').addEventListener('click', () => selectTab('ulke'));
[$('tab-il'), $('tab-ulke')].forEach((t) => t.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const next = t.id === 'tab-il' ? 'ulke' : 'il';
    selectTab(next);
    $('tab-' + next).focus();
  }
}));

/* ---------- Başlat ---------- */
async function init() {
  try {
    const res = await fetch(new URL('veri.json', import.meta.url));
    if (!res.ok) throw new Error('http ' + res.status);
    data = await res.json();
  } catch {
    showError($('error'), 'Veri dosyası yüklenemedi. Sayfayı yenileyin; sorun sürerse internet bağlantınızı kontrol edin.');
    return;
  }
  renderIlTable();
  renderUlke();
  $('data-date').textContent = `Veri derleme tarihi: ${data.guncelleme}.`;
  $('q').addEventListener('input', renderResults);
  $('qc').addEventListener('input', renderUlke);
  document.documentElement.dataset.ready = '1';
}
init();
