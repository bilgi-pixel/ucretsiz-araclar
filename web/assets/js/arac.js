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
      note.textContent = r.note || '';
      note.hidden = !r.note;
      status.textContent = '';
      pdfSpec = r.pdf || null;
      if (pdfBtn) pdfBtn.hidden = !pdfSpec;
      if (canvas) { canvas.hidden = !pdfSpec; if (pdfSpec) drawPreview(canvas, pdfSpec); }
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
      const bytes = await buildPdf(pdfSpec);
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

function drawPreview(canvas, pdf) {
  const [w, h] = pageSize(pdf), k = 4; // 4 piksel / mm
  canvas.width = w * k; canvas.height = h * k;
  const c = canvas.getContext('2d');
  c.fillStyle = '#fff'; c.fillRect(0, 0, canvas.width, canvas.height);
  const css = (v, f) => { const [r, g, b] = rgbOf(v, f); return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`; };
  for (const op of pdf.sayfalar[0] || []) {
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
async function buildPdf(pdf) {
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
  for (const ops of pdf.sayfalar) {
    const page = doc.addPage([w * MM, h * MM]), Y = (y) => (h - y) * MM;
    for (const op of ops) {
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
