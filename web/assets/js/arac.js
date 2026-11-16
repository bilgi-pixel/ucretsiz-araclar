// Form tabanlı araçların ortak arayüzü: alanları okur, compute() çağırır, sonucu yazar.
// Her şey tarayıcıda; ağ isteği yok.
import { showError, downloadBlob, getPdfLib, loadScript } from './ba.js';
import { h } from './arac-yardimci.js';

const $ = (id) => document.getElementById(id);

export function mount(compute) {
  const form = $('form'), result = $('result'), rows = $('rows'), out = $('out'), outWrap = $('out-wrap'), note = $('note'), status = $('copy-status');
  const fields = Array.from(form.querySelectorAll('[data-field]'));

  const pdfBtn = $('pdf'), canvas = $('onizleme');
  let pdfSpec = null;
  const plan = $('plan-wrap') ? planEditor(canvas) : null;

  function hide() { result.hidden = true; result.classList.remove('is-active'); }

  async function run() {
    showError($('error'), '');
    try {
      const v = {};
      for (const f of fields) v[f.dataset.field] = f.value;
      const r = await compute(v, h);
      rows.textContent = '';
      (r.rows || []).forEach(([k, val], i) => {
        const row = document.createElement('div');
        row.className = 'ar-row' + (i === 0 ? ' is-strong' : '');
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = String(val);
        row.append(dt, dd); rows.append(row);
      });
      rows.hidden = !(r.rows && r.rows.length);
      const hasText = typeof r.text === 'string';
      outWrap.hidden = !hasText;
      out.value = hasText ? r.text : '';
      if (hasText) out.rows = Math.max(4, Math.min(16, r.text.split('\n').length + 1));
      // "1.500" gibi tek noktalı ve üç haneli girdiler ondalık okunur (1,5). Kullanıcı bin beş yüz demek istemiş olabilir; açıkça bildir.
      const supheli = fields.filter((f) => f.getAttribute('inputmode') === 'decimal' && /^\d{1,3}\.\d{3}$/.test(f.value.trim())).map((f) => f.value.trim());
      const uyari = supheli.length ? `Dikkat: "${supheli[0]}" değeri ondalık sayı olarak (${supheli[0].replace('.', ',')}) okundu. Binlik ayraç olarak yazdıysanız noktasız (${supheli[0].replace('.', '')}) ya da ${supheli[0]},00 biçiminde girin.` : '';
      note.textContent = [r.note, uyari].filter(Boolean).join(' ');
      note.hidden = !(r.note || uyari);
      status.textContent = '';
      pdfSpec = r.pdf || null;
      if (pdfBtn) pdfBtn.hidden = !pdfSpec;
      if (plan) plan.show(pdfSpec, v);
      else if (canvas) { canvas.hidden = !pdfSpec; if (pdfSpec) drawPreview(canvas, pdfSpec, 0, []); }
      result.hidden = false; result.classList.add('is-active');
    } catch (e) {
      hide();
      showError($('error'), e && e.message ? e.message : 'Hesaplanamadı; girdileri kontrol edin.');
    }
    // Hesap sayacı: testlerin "bu tıklamanın sonucu yazıldı" anını beklemesi için
    form.dataset.n = String(Number(form.dataset.n || 0) + 1);
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    form.reset(); hide(); showError($('error'), '');
    if (fields[0]) fields[0].focus();
  });
  if (pdfBtn) pdfBtn.addEventListener('click', async () => {
    if (!pdfSpec) return;
    pdfBtn.disabled = true; status.textContent = 'PDF hazırlanıyor…';
    try {
      const bytes = await buildPdf(pdfSpec, plan ? plan.notes() : []);
      downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `${pdfSpec.ad || 'planlayici'}.pdf`);
      status.textContent = 'PDF indirildi. Yazdırırken "gerçek boyut" (ölçek %100) seçin.';
    } catch (e) { status.textContent = ''; showError($('error'), 'PDF oluşturulamadı; sayfayı yenileyip yeniden deneyin.'); }
    pdfBtn.disabled = false;
  });
  $('copy').addEventListener('click', async () => {
    const text = !outWrap.hidden ? out.value
      : Array.from(rows.querySelectorAll('.ar-row')).map((r) => `${r.children[0].textContent}: ${r.children[1].textContent}`).join('\n');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
}

// ---- PDF çıktısı (planlayıcı ve çizelgeler) ----
// compute() isteğe bağlı olarak { pdf: { ad, boyut: 'a4'|'a5', yatay, sayfalar: [[işlem, …], …] } } döndürür.
// İşlemler milimetre cinsindendir, başlangıç noktası sayfanın sol üst köşesidir:
//   ['cizgi', x1, y1, x2, y2, { kalinlik, ton, renk, kesik }]
//   ['kutu', x, y, g, y2, { dolgu, cizgi, kalinlik }]        (dolgu/cizgi: 0 siyah – 1 beyaz ton ya da '#rrggbb')
//   ['daire', x, y, r, { dolgu, cizgi, kalinlik }]
//   ['yazi', metin, x, y, punto, { kalin, hiza: 'sol'|'orta'|'sag', ton, renk }]   (y: satır taban çizgisi)
const SAYFA = { a4: [210, 297], a5: [148, 210] };
const MM = 72 / 25.4;
export function pageSize(pdf) { const [w, h] = SAYFA[pdf.boyut] || SAYFA.a4; return pdf.yatay ? [h, w] : [w, h]; }
function rgbOf(v, fallback) {
  if (typeof v === 'string') { const m = /^#([0-9a-f]{6})$/i.exec(v); if (m) { const n = parseInt(m[1], 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; } }
  const t = typeof v === 'number' ? Math.max(0, Math.min(1, v)) : fallback;
  return [t, t, t];
}

// Ekranda yazılan notlar sayfa işlemlerine 'yazi' olarak eklenir (koyu lacivert, 9 punto).
const NOT_PUNTO = 9, NOT_RENK = '#1b2a4a';
const noteOps = (notes, i) => notes.filter((n) => n.p === i).map((n) => ['yazi', n.t, n.x, n.y, NOT_PUNTO, { renk: NOT_RENK }]);

function drawPreview(canvas, pdf, index = 0, notes = []) {
  const [w, h] = pageSize(pdf), k = 6; // 6 piksel / mm
  canvas.width = w * k; canvas.height = h * k;
  const c = canvas.getContext('2d');
  c.fillStyle = '#fff'; c.fillRect(0, 0, canvas.width, canvas.height);
  const css = (v, f) => { const [r, g, b] = rgbOf(v, f); return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`; };
  for (const op of [...(pdf.sayfalar[index] || []), ...noteOps(notes, index)]) {
    const o = (op[op.length - 1] && typeof op[op.length - 1] === 'object') ? op[op.length - 1] : {};
    if (op[0] === 'cizgi') {
      c.beginPath(); c.setLineDash(o.kesik ? [1.5 * k, 1.5 * k] : []); c.lineWidth = (o.kalinlik || 0.3) * k; c.strokeStyle = css(o.renk ?? o.ton, 0.6);
      c.moveTo(op[1] * k, op[2] * k); c.lineTo(op[3] * k, op[4] * k); c.stroke(); c.setLineDash([]);
    } else if (op[0] === 'kutu') {
      if (o.dolgu !== undefined) { c.fillStyle = css(o.dolgu, 0.9); c.fillRect(op[1] * k, op[2] * k, op[3] * k, op[4] * k); }
      if (o.cizgi !== undefined || o.dolgu === undefined) { c.lineWidth = (o.kalinlik || 0.3) * k; c.strokeStyle = css(o.cizgi, 0.6); c.strokeRect(op[1] * k, op[2] * k, op[3] * k, op[4] * k); }
    } else if (op[0] === 'daire') {
      c.beginPath(); c.arc(op[1] * k, op[2] * k, op[3] * k, 0, Math.PI * 2);
      if (o.dolgu !== undefined) { c.fillStyle = css(o.dolgu, 0.9); c.fill(); }
      if (o.cizgi !== undefined || o.dolgu === undefined) { c.lineWidth = (o.kalinlik || 0.3) * k; c.strokeStyle = css(o.cizgi, 0.6); c.stroke(); }
    } else if (op[0] === 'yazi') {
      c.font = `${o.kalin ? '700' : '400'} ${op[4] / MM * k}px "IBM Plex Sans", system-ui, sans-serif`;
      c.fillStyle = css(o.renk ?? o.ton, 0.15); c.textAlign = o.hiza === 'orta' ? 'center' : o.hiza === 'sag' ? 'right' : 'left';
      c.fillText(String(op[1]), op[2] * k, op[3] * k);
    }
  }
}

let fontData = null;
async function buildPdf(pdf, notes = []) {
  const { PDFDocument, rgb } = await getPdfLib();
  const vendor = new URL('../../vendor/', import.meta.url).href;
  await loadScript(`${vendor}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  if (!fontData) {
    const get = async (n) => new Uint8Array(await (await fetch(`${vendor}fonts/dejavu-sans@2.37/${n}`)).arrayBuffer());
    fontData = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  }
  const doc = await PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  const reg = await doc.embedFont(fontData[0], { subset: true }), bold = await doc.embedFont(fontData[1], { subset: true });
  doc.setTitle(pdf.baslik || pdf.ad || 'Planlayıcı'); doc.setProducer('Bilişim Ajans Ücretsiz Araçlar'); doc.setCreator('araclar.bilisimajans.com');
  const [w, h] = pageSize(pdf), col = (v, f) => rgb(...rgbOf(v, f));
  for (const [pi, base] of pdf.sayfalar.entries()) {
    const page = doc.addPage([w * MM, h * MM]), Y = (y) => (h - y) * MM;
    for (const op of [...base, ...noteOps(notes, pi)]) {
      const o = (op[op.length - 1] && typeof op[op.length - 1] === 'object') ? op[op.length - 1] : {};
      if (op[0] === 'cizgi') page.drawLine({ start: { x: op[1] * MM, y: Y(op[2]) }, end: { x: op[3] * MM, y: Y(op[4]) }, thickness: (o.kalinlik || 0.3) * MM, color: col(o.renk ?? o.ton, 0.6), ...(o.kesik ? { dashArray: [1.5 * MM, 1.5 * MM] } : {}) });
      else if (op[0] === 'kutu') page.drawRectangle({ x: op[1] * MM, y: Y(op[2] + op[4]), width: op[3] * MM, height: op[4] * MM, ...(o.dolgu !== undefined ? { color: col(o.dolgu, 0.9) } : {}), ...((o.cizgi !== undefined || o.dolgu === undefined) ? { borderColor: col(o.cizgi, 0.6), borderWidth: (o.kalinlik || 0.3) * MM } : {}) });
      else if (op[0] === 'daire') page.drawCircle({ x: op[1] * MM, y: Y(op[2]), size: op[3] * MM, ...(o.dolgu !== undefined ? { color: col(o.dolgu, 0.9) } : {}), ...((o.cizgi !== undefined || o.dolgu === undefined) ? { borderColor: col(o.cizgi, 0.6), borderWidth: (o.kalinlik || 0.3) * MM } : {}) });
      else if (op[0] === 'yazi') {
        const f = o.kalin ? bold : reg, t = String(op[1]), tw = f.widthOfTextAtSize(t, op[4]);
        const x = op[2] * MM - (o.hiza === 'orta' ? tw / 2 : o.hiza === 'sag' ? tw : 0);
        page.drawText(t, { x, y: Y(op[3]), size: op[4], font: f, color: col(o.renk ?? o.ton, 0.15) });
      }
    }
  }
  return doc.save();
}

// ---- Ekranda doldurma: önizlemeye tıklayıp yazı yazma ----
// Notlar { p: sayfa, x, y (mm, taban çizgisi), t: metin } olarak tutulur ve yalnızca bu tarayıcıda
// (localStorage) saklanır; hiçbir yere gönderilmez. Anahtar, aracın adresi ve form değerleridir:
// aynı ayarlarla yeniden oluşturulan planlayıcıda yazılar geri gelir.
function planEditor(canvas) {
  const wrap = $('plan-wrap'), stage = canvas.parentElement, info = $('pg-info'), prev = $('pg-prev'), next = $('pg-next'), clear = $('pg-clear');
  let pdf = null, page = 0, notes = [], key = '', editing = null;
  const load = () => { try { const d = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(d) ? d.filter((n) => n && typeof n.t === 'string') : []; } catch { return []; } };
  const save = () => { try { if (notes.length) localStorage.setItem(key, JSON.stringify(notes)); else localStorage.removeItem(key); } catch { /* depo kapalıysa yalnızca bu oturumda kalır */ } };
  const mmPerPx = () => pageSize(pdf)[0] / canvas.clientWidth;
  function render() {
    drawPreview(canvas, pdf, page, notes);
    const total = pdf.sayfalar.length, n = notes.length;
    info.textContent = `Sayfa ${page + 1} / ${total}${n ? ` · ${n} yazı` : ''}`;
    prev.disabled = page === 0; next.disabled = page >= total - 1;
    prev.hidden = next.hidden = total < 2; clear.hidden = !n;
  }
  function commit() {
    if (!editing) return;
    const { el, note, x, y } = editing; editing = null;
    const t = el.value.trim().slice(0, 120); el.remove();
    if (note) { if (t) note.t = t; else notes = notes.filter((m) => m !== note); }
    else if (t) notes.push({ p: page, x, y, t });
    save(); render();
  }
  function edit(x, y, note) {
    commit();
    const k = 1 / mmPerPx(), fs = Math.max(12, NOT_PUNTO / MM * k), [w] = pageSize(pdf);
    const el = document.createElement('input');
    el.type = 'text'; el.className = 'ar-plan-yaz'; el.maxLength = 120; el.value = note ? note.t : '';
    el.setAttribute('aria-label', 'Planlayıcıya yazılacak metin');
    el.style.left = `${x * k}px`; el.style.top = `${y * k - fs}px`; el.style.fontSize = `${fs}px`; el.style.width = `${Math.max(60, (w - x - 5) * k)}px`;
    stage.append(el); editing = { el, note, x, y };
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); commit(); } else if (e.key === 'Escape') { editing = null; el.remove(); } });
    el.addEventListener('blur', () => setTimeout(commit, 0));
    el.focus();
  }
  canvas.addEventListener('click', (e) => {
    if (!pdf) return;
    const r = canvas.getBoundingClientRect(), m = mmPerPx(), x = (e.clientX - r.left) * m, y = (e.clientY - r.top) * m, [w, h] = pageSize(pdf);
    // Var olan bir yazının üstüne tıklandıysa onu düzenle
    const c = canvas.getContext('2d'); c.font = `400 ${NOT_PUNTO / MM * 6}px "IBM Plex Sans", system-ui, sans-serif`; // drawPreview ile aynı ölçek (6 px/mm)
    const genislik = (t) => c.measureText(t).width / 6;
    const hit = notes.find((n) => n.p === page && x >= n.x - 1 && x <= n.x + Math.max(6, genislik(n.t)) + 1 && y >= n.y - 4.5 && y <= n.y + 1.5);
    if (hit) edit(hit.x, hit.y, hit);
    else edit(Math.min(Math.max(x, 5), w - 12), Math.min(Math.max(y + 1, 7), h - 5), null);
  });
  prev.addEventListener('click', () => { commit(); if (page > 0) { page--; render(); } });
  next.addEventListener('click', () => { commit(); if (page < pdf.sayfalar.length - 1) { page++; render(); } });
  clear.addEventListener('click', () => { commit(); notes = []; save(); render(); });
  return {
    show(spec, values) {
      commit(); pdf = spec; wrap.hidden = !spec; canvas.hidden = !spec;
      if (!spec) return;
      key = `ba-plan:${location.pathname}:${JSON.stringify(values)}`;
      notes = load().filter((n) => n.p < spec.sayfalar.length); page = 0; render();
    },
    notes() { commit(); return notes; },
  };
}
