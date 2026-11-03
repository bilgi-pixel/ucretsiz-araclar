// Belge şablonu motoru (sözleşme / tutanak): form → önizleme → PDF (pdf-lib + DejaVu) ve DOCX (docx).
// Bu dosya sozlesme-olustur ve tutanak-olustur klasörlerinde BİREBİR aynıdır; farklı olan yalnızca tool.js içindeki şablonlardır.
// Yalnızca BOŞ şablon sunar: kimlik, imza, kaşe, resmî amblem üretmez. Hiçbir veri ağa gitmez, hiçbir şey saklanmaz.
import { setProgress, downloadBlob, formatBytes, showError, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const GENERAL_NOTE = 'Örnek şablondur; hukuki tavsiye değildir. Resmî/noterlik işlemler için avukata danışın.';

let fontCache = null;
let docxPromise = null;

const upperTr = (s) => String(s || '').toLocaleUpperCase('tr-TR');
function today() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}
/** "2026-11-04" → "04.11.2026" (saat dilimi kayması olmasın diye ayrıştırarak). */
function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}.${m[2]}.${m[1]}` : '';
}
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

/**
 * Motoru başlatır.
 * cfg: { templates, filePrefix, noun ('Sözleşme'), numbering ('madde'|'num'), clauseNoun ('Madde'|'Bölüm'),
 *        peopleNoun ('Taraflar'), addRole ('KEFİL'|'KATILIMCI') }
 */
export function initDocTool(cfg) {
  const TPL = cfg.templates;
  let curKey = '';
  let pendingKey = '';
  const st = { people: [], clauses: [], rows: [], dirty: false };

  const tpl = () => TPL[curKey];

  // ---------- Şablon yükleme ----------

  function initSelect() {
    const sel = $('f-template');
    for (const [key, t] of Object.entries(TPL)) {
      const o = el('option', '', t.label); o.value = key; sel.appendChild(o);
    }
  }

  function currentFieldValues() {
    const out = {};
    if (!curKey) return out;
    for (const f of tpl().fields) { const e = $(`fld-${f.id}`); if (e) out[f.id] = e.value; }
    return out;
  }

  function applyTemplate(key) {
    const t = TPL[key];
    if (!t) return;
    const oldVals = currentFieldValues();
    const oldPeople = st.people;
    st.people = t.people.map((p, i) => ({
      role: p.role,
      name: (oldPeople[i] && !oldPeople[i].opt && !oldPeople[i].extra) ? oldPeople[i].name : '',
      tc: (oldPeople[i] && !oldPeople[i].opt && !oldPeople[i].extra) ? oldPeople[i].tc : '',
      address: (oldPeople[i] && !oldPeople[i].opt && !oldPeople[i].extra) ? oldPeople[i].address : '',
    }));
    st.clauses = t.clauses.map((c) => ({ h: c.h, x: c.x }));
    st.rows = t.table ? t.table.rows.map((r) => [...r]) : [];
    st.dirty = false;
    curKey = key; pendingKey = '';
    $('f-template').value = key;
    $('f-title').value = t.title;
    $('tpl-force').hidden = true;
    renderFields(t, oldVals);
    renderOptional(t);
    $('f-witness').checked = !!t.witness;
    $('witness-names').hidden = !t.witness;
    renderPeople();
    renderClauses();
    renderTable();
    $('tpl-note').textContent = t.note;
    $('tpl-note-box').hidden = false;
    $('tpl-status').textContent = 'Şablon yüklendi. Köşeli parantezli yerleri kendi bilginizle değiştirin; her maddeyi düzenleyebilir, silebilir ya da yeni madde ekleyebilirsiniz.';
    $('editor').hidden = false;
    invalidateResult();
    render();
  }

  $('f-template').addEventListener('change', () => {
    const key = $('f-template').value;
    if (!key) return;
    if (curKey && st.dirty && key !== curKey) {
      // Kullanıcı madde/tablo düzenlediyse sessizce silme; onay düğmesi göster.
      pendingKey = key;
      $('f-template').value = curKey;
      $('tpl-status').textContent = `Maddeleri veya tabloyu düzenlediniz; "${TPL[key].label}" şablonuna geçmek bu düzenlemeleri siler.`;
      $('tpl-force').hidden = false;
      return;
    }
    applyTemplate(key);
  });
  $('tpl-force').addEventListener('click', () => { if (pendingKey) applyTemplate(pendingKey); });
  $('tpl-reload').addEventListener('click', () => { if (curKey) applyTemplate(curKey); });

  // ---------- Alanlar ----------

  function renderFields(t, oldVals) {
    const root = $('fields');
    root.textContent = '';
    for (const f of t.fields) {
      const wrap = el('div', `ba-field${f.wide || f.type === 'textarea' ? ' dc-wide' : ''}`);
      const lab = el('label', '', f.label + (f.req ? ' *' : '')); lab.htmlFor = `fld-${f.id}`;
      let inp;
      if (f.type === 'textarea') { inp = el('textarea'); inp.rows = 2; }
      else { inp = el('input'); inp.type = f.type || 'text'; }
      inp.id = `fld-${f.id}`; inp.maxLength = 400;
      if (f.ph) inp.placeholder = f.ph;
      if (f.req) inp.required = false; // doğrulamayı kendimiz yapıyoruz (Türkçe mesaj)
      let val = oldVals[f.id];
      if (val === undefined || val === '') val = f.def || (f.id === 'tarih' ? today() : '');
      inp.value = val;
      wrap.append(lab, inp);
      if (f.hint) wrap.appendChild(el('div', 'hint', f.hint));
      root.appendChild(wrap);
    }
  }

  function renderOptional(t) {
    const root = $('optional');
    root.textContent = '';
    for (const o of t.optional || []) {
      const lab = el('label', 'dc-check');
      const cb = el('input'); cb.type = 'checkbox'; cb.id = `opt-${o.id}`;
      cb.addEventListener('change', () => toggleOptional(o, cb.checked));
      lab.append(cb, document.createTextNode(` ${o.label}`));
      root.appendChild(lab);
    }
    $('optional-wrap').hidden = !(t.optional && t.optional.length);
  }

  function toggleOptional(o, on) {
    if (on) {
      if (o.person) st.people.push({ role: o.person.role, name: '', tc: '', address: '', opt: o.id });
      if (o.clause) st.clauses.push({ h: o.clause.h, x: o.clause.x, opt: o.id });
    } else {
      st.people = st.people.filter((p) => p.opt !== o.id);
      st.clauses = st.clauses.filter((c) => c.opt !== o.id);
    }
    renderPeople(); renderClauses(); invalidateResult(); render();
  }

  // ---------- Kişiler ----------

  function renderPeople() {
    const root = $('people');
    root.textContent = '';
    const base = tpl().people.length;
    st.people.forEach((p, i) => {
      const card = el('div', 'dc-card pp-row');
      const head = el('div', 'dc-card-head');
      const roleLab = el('label', 'dc-mini', 'Sıfat'); const role = el('input'); role.type = 'text'; role.className = 'pp-role'; role.value = p.role; role.maxLength = 60;
      role.id = `pp-role-${i}`; roleLab.htmlFor = role.id;
      const roleBox = el('div', 'dc-grow'); roleBox.append(roleLab, role);
      head.appendChild(roleBox);
      if (!p.opt && i >= base) {
        const del = el('button', 'ba-btn pp-del', 'Sil'); del.type = 'button'; del.setAttribute('aria-label', `${p.role || 'Kişi'} satırını sil`);
        del.addEventListener('click', () => { st.people.splice(i, 1); renderPeople(); invalidateResult(); render(); });
        head.appendChild(del);
      }
      const grid = el('div', 'dc-grid');
      const mk = (cls, label, key, ph, type = 'text') => {
        const box = el('div', 'ba-field'); const id = `pp-${key}-${i}`;
        const lab = el('label', '', label); lab.htmlFor = id;
        const inp = el('input'); inp.type = type; inp.id = id; inp.className = cls; inp.value = p[key]; inp.maxLength = 300; if (ph) inp.placeholder = ph;
        inp.addEventListener('input', () => { p[key] = inp.value; invalidateResult(); render(); });
        box.append(lab, inp); return box;
      };
      role.addEventListener('input', () => { p.role = role.value; invalidateResult(); render(); });
      grid.append(
        mk('pp-name', 'Ad soyad / unvan', 'name', ''),
        mk('pp-tc', 'T.C. kimlik no (isteğe bağlı)', 'tc', 'Yalnızca gerekiyorsa'),
        mk('pp-address', 'Adres (isteğe bağlı)', 'address', ''),
      );
      card.append(head, grid);
      root.appendChild(card);
    });
  }
  $('add-person').addEventListener('click', () => {
    st.people.push({ role: cfg.addRole, name: '', tc: '', address: '', extra: true });
    renderPeople(); invalidateResult(); render();
    const last = document.querySelector('#people .pp-row:last-child .pp-name'); if (last) last.focus();
  });

  // ---------- Maddeler ----------

  function renderClauses() {
    const root = $('clauses');
    root.textContent = '';
    st.clauses.forEach((c, i) => {
      const card = el('div', 'dc-card cl-row');
      const head = el('div', 'dc-card-head');
      const no = el('span', 'cl-no', `${cfg.clauseNoun} ${i + 1}`);
      const hl = el('label', 'dc-mini', 'Başlık'); const h = el('input'); h.type = 'text'; h.className = 'cl-h'; h.value = c.h; h.maxLength = 120; h.id = `cl-h-${i}`; hl.htmlFor = h.id;
      const hb = el('div', 'dc-grow'); hb.append(hl, h);
      const tools = el('div', 'dc-tools');
      const btn = (cls, text, label, fn, disabled) => {
        const b = el('button', `ba-btn ${cls}`, text); b.type = 'button'; b.setAttribute('aria-label', label); b.disabled = !!disabled; b.addEventListener('click', fn); return b;
      };
      const move = (d) => { const j = i + d; const [x] = st.clauses.splice(i, 1); st.clauses.splice(j, 0, x); st.dirty = true; renderClauses(); invalidateResult(); render(); };
      tools.append(
        btn('cl-up', '↑', `${cfg.clauseNoun} ${i + 1} yukarı taşı`, () => move(-1), i === 0),
        btn('cl-down', '↓', `${cfg.clauseNoun} ${i + 1} aşağı taşı`, () => move(1), i === st.clauses.length - 1),
        btn('cl-del', 'Sil', `${cfg.clauseNoun} ${i + 1} sil`, () => {
          const [gone] = st.clauses.splice(i, 1);
          if (gone && gone.opt) { const cb = $(`opt-${gone.opt}`); if (cb) { cb.checked = false; st.people = st.people.filter((p) => p.opt !== gone.opt); renderPeople(); } }
          st.dirty = true; renderClauses(); invalidateResult(); render();
        }),
      );
      head.append(no, hb, tools);
      const xl = el('label', 'dc-mini', 'Madde metni'); const x = el('textarea'); x.className = 'cl-x'; x.rows = 4; x.value = c.x; x.maxLength = 3000; x.id = `cl-x-${i}`; xl.htmlFor = x.id;
      h.addEventListener('input', () => { c.h = h.value; st.dirty = true; invalidateResult(); render(); });
      x.addEventListener('input', () => { c.x = x.value; st.dirty = true; invalidateResult(); render(); });
      card.append(head, xl, x);
      root.appendChild(card);
    });
  }
  $('add-clause').addEventListener('click', () => {
    st.clauses.push({ h: '', x: '' }); st.dirty = true;
    renderClauses(); invalidateResult(); render();
    const last = document.querySelector('#clauses .cl-row:last-child .cl-h'); if (last) last.focus();
  });

  // ---------- Tablo ----------

  function renderTable() {
    const t = tpl();
    $('table-wrap').hidden = !t.table;
    if (!t.table) return;
    $('table-title').textContent = t.table.title;
    const root = $('table-rows');
    root.textContent = '';
    st.rows.forEach((row, ri) => {
      const card = el('div', 'dc-card tb-row');
      const grid = el('div', 'dc-grid dc-grid-cols');
      t.table.cols.forEach((col, ci) => {
        const box = el('div', 'ba-field'); const id = `tb-${ri}-${ci}`;
        const lab = el('label', '', col.label); lab.htmlFor = id;
        const inp = el('input'); inp.type = 'text'; inp.id = id; inp.className = 'tb-cell'; inp.value = row[ci] || ''; inp.maxLength = 200;
        inp.addEventListener('input', () => { row[ci] = inp.value; st.dirty = true; invalidateResult(); render(); });
        box.append(lab, inp); grid.appendChild(box);
      });
      const del = el('button', 'ba-btn tb-del', 'Satırı sil'); del.type = 'button'; del.setAttribute('aria-label', `${ri + 1}. satırı sil`);
      del.addEventListener('click', () => { st.rows.splice(ri, 1); st.dirty = true; renderTable(); invalidateResult(); render(); });
      card.append(grid, del);
      root.appendChild(card);
    });
  }
  $('add-row').addEventListener('click', () => {
    st.rows.push(tpl().table.cols.map(() => '')); st.dirty = true;
    renderTable(); invalidateResult(); render();
    const last = document.querySelector('#table-rows .tb-row:last-child .tb-cell'); if (last) last.focus();
  });

  // ---------- Toplama ve yer tutucu çözümü ----------

  function collect() {
    const t = tpl();
    const fv = {};
    for (const f of t.fields) {
      const e = $(`fld-${f.id}`);
      let v = e ? e.value.replace(/\s*\n\s*/g, ' ').trim() : '';
      if (f.type === 'date') v = formatDate(v);
      fv[f.id] = v;
    }
    const people = st.people.map((p) => ({ role: p.role.trim(), name: p.name.trim(), tc: p.tc.trim(), address: p.address.trim().replace(/\s*\n\s*/g, ' '), opt: p.opt }));
    const sub = (s) => String(s || '').replace(/\{(\w+)\}/g, (m, k) => {
      let p = null;
      if (/^p\d+$/.test(k)) p = people[Number(k.slice(1)) - 1];
      else if ((t.optional || []).some((o) => o.id === k)) p = people.find((q) => q.opt === k);
      if (/^p\d+$/.test(k) || (t.optional || []).some((o) => o.id === k)) return p ? (p.name || `[${p.role} adı soyadı]`) : '[taraf adı]';
      const f = t.fields.find((x) => x.id === k);
      if (!f) return m;
      return fv[k] || `[${f.label}]`;
    });
    const clauses = st.clauses
      .map((c) => ({ h: sub(c.h).replace(/\s+/g, ' ').trim(), x: sub(c.x).replace(/\r\n?/g, '\n').trim() }))
      .filter((c) => c.h || c.x);
    let table = null;
    if (t.table) {
      const rows = st.rows.map((r) => r.map((v) => sub(v).trim())).filter((r) => r.some(Boolean));
      table = { title: t.table.title, cols: t.table.cols, rows, after: t.table.after };
    }
    const meta = (t.meta || []).map((id) => {
      const f = t.fields.find((x) => x.id === id);
      return f && fv[id] ? { label: f.metaLabel || f.label, value: fv[id] } : null;
    }).filter(Boolean);
    const witnesses = $('f-witness').checked ? [$('w-0').value.trim(), $('w-1').value.trim()] : null;
    const ekler = $('f-ekler').value.split(/\r?\n/).map((s) => s.replace(/^\s*(\d+\s*[-.)]|EK-?\d*\s*[:.-]|[-•*])\s*/i, '').trim()).filter(Boolean);
    return {
      key: curKey, title: $('f-title').value.replace(/\s+/g, ' ').trim(), meta, people, clauses, table, witnesses, ekler,
      note: t.note, fv,
    };
  }

  /** Üretimden önce zorunlu alanları denetler; sorun varsa Türkçe, çözüm öneren mesaj verir. */
  function validate(d) {
    const fail = (msg, focusId) => { showError($('error'), msg); const e = focusId && $(focusId); if (e) e.focus(); return false; };
    if (!curKey) return fail('Önce bir şablon seçin. "Belge türü" listesinden ihtiyacınıza uyan şablonu seçip alanları doldurun.', 'f-template');
    if (!d.title) return fail('Belge başlığı boş. Belgenin üstünde görünecek başlığı yazın (örn. "KONUT KİRA SÖZLEŞMESİ").', 'f-title');
    const t = tpl();
    for (const f of t.fields) {
      if (f.req && !d.fv[f.id]) return fail(`"${f.label}" alanı boş. Bu bilgi belgenin anlamlı olması için gereklidir; alanı doldurup düğmeye yeniden basın.`, `fld-${f.id}`);
    }
    for (let i = 0; i < t.minNamed; i++) {
      const p = d.people[i];
      if (!p || !p.name) return fail(`${p && p.role ? p.role : 'Kişi'} adı soyadı boş. "${cfg.peopleNoun}" bölümünde bu kişinin ad soyadını (ya da unvanını) yazın.`, `pp-name-${i}`);
    }
    if (!d.clauses.length) return fail(`Hiç ${cfg.clauseNoun.toLowerCase()} yok. "${cfg.clauseNoun} ekle" ile en az bir ${cfg.clauseNoun.toLowerCase()} yazın ya da "Şablonu yeniden yükle" düğmesine basın.`, 'add-clause');
    return true;
  }

  const placeholderCount = (d) => {
    const all = [d.title, ...d.clauses.map((c) => `${c.h} ${c.x}`), ...(d.table ? d.table.rows.flat() : [])].join(' ');
    return (all.match(/\[[^\]]{1,200}\]/g) || []).length;
  };
  function resultNote(d) {
    const n = placeholderCount(d);
    return n ? ` · Dikkat: metinde köşeli parantezli ${n} boşluk kaldı; imzalamadan önce doldurun.` : '';
  }
  const fileName = (d, ext) => `${cfg.filePrefix}-${d.key}.${ext}`;
  const clauseHeading = (d, i, c) => (cfg.numbering === 'madde'
    ? `MADDE ${i + 1}${c.h ? ` – ${c.h}` : ''}`
    : `${i + 1}. ${c.h}`.trim());
  const personLine = (p) => [p.name, p.tc && `T.C. Kimlik No: ${p.tc}`, p.address && `Adres: ${p.address}`].filter(Boolean).join(', ');

  function invalidateResult() { $('result').classList.remove('is-active'); }

  // ---------- Önizleme ----------

  function render() {
    const root = $('preview');
    root.textContent = '';
    if (!curKey) { root.appendChild(el('p', 'dc-empty', 'Önizleme için önce bir belge türü seçin.')); return; }
    const d = collect();
    const sheet = el('div', 'dc-sheet');
    sheet.appendChild(el('div', 'dc-title', upperTr(d.title) || 'BELGE BAŞLIĞI'));
    if (d.meta.length) sheet.appendChild(el('div', 'dc-meta', d.meta.map((m) => `${m.label}: ${m.value}`).join('   ·   ')));
    sheet.appendChild(el('div', 'dc-h', upperTr(cfg.peopleNoun)));
    for (const p of d.people) {
      const line = el('p', 'dc-p'); line.append(el('strong', '', `${p.role || '—'}: `), document.createTextNode(personLine(p) || '………………………'));
      sheet.appendChild(line);
    }
    const tableAt = d.table ? Math.min(d.table.after ?? d.clauses.length, d.clauses.length) : -1;
    const putTable = () => {
      if (!d.table) return;
      sheet.appendChild(el('div', 'dc-h', d.table.title));
      const tb = el('table', 'dc-table'); const hr = el('tr');
      d.table.cols.forEach((c) => hr.appendChild(el('th', '', c.label))); tb.appendChild(hr);
      for (const r of d.table.rows) { const tr = el('tr'); r.forEach((v) => tr.appendChild(el('td', '', v))); tb.appendChild(tr); }
      if (!d.table.rows.length) { const tr = el('tr'); const td = el('td', '', '(Satır yok)'); td.colSpan = d.table.cols.length; tr.appendChild(td); tb.appendChild(tr); }
      sheet.appendChild(tb);
    };
    if (tableAt === 0) putTable();
    d.clauses.forEach((c, i) => {
      sheet.appendChild(el('div', 'dc-ch', clauseHeading(d, i, c)));
      for (const para of c.x.split(/\n/)) if (para.trim()) sheet.appendChild(el('p', 'dc-p', para));
      if (i + 1 === tableAt) putTable();
    });
    sheet.appendChild(el('div', 'dc-h', 'İMZALAR'));
    const sg = el('div', 'dc-sigs');
    const blocks = signBlocks(d);
    for (const b of blocks) {
      const box = el('div', 'dc-sig');
      box.append(el('strong', '', upperTr(b.role)), el('div', '', b.name || 'Ad Soyad: ……………………'), el('div', 'dc-sigline', 'İmza'));
      sg.appendChild(box);
    }
    sheet.appendChild(sg);
    if (d.ekler.length) {
      const ek = el('div', 'dc-ekler'); ek.appendChild(el('strong', '', 'EKLER:'));
      d.ekler.forEach((x, i) => ek.appendChild(el('div', '', `EK-${i + 1}: ${x}`)));
      sheet.appendChild(ek);
    }
    const note = el('p', 'dc-note'); note.append(el('strong', '', 'Önemli not: '), document.createTextNode(`${d.note} ${GENERAL_NOTE}`));
    sheet.appendChild(note);
    root.appendChild(sheet);
  }
  $('form').addEventListener('input', (e) => {
    if (e.target.closest('#fields') || e.target.id === 'f-title' || e.target.id === 'f-ekler' || e.target.closest('#witness-box')) { invalidateResult(); render(); }
  });
  $('f-witness').addEventListener('change', () => { $('witness-names').hidden = !$('f-witness').checked; invalidateResult(); render(); });
  $('form').addEventListener('submit', (e) => e.preventDefault());

  function signBlocks(d) {
    const blocks = d.people.map((p) => ({ role: p.role || 'İmza sahibi', name: p.name }));
    if (d.witnesses) d.witnesses.forEach((n) => blocks.push({ role: 'TANIK', name: n }));
    return blocks;
  }

  // ---------- PDF ----------

  async function loadFonts() {
    if (fontCache) return fontCache;
    const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
    const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
    const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
    fontCache = { regular, bold };
    return fontCache;
  }

  async function buildPdf(d) {
    const PDFLib = await getPdfLib();
    await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
    const fontData = await loadFonts();
    const { rgb } = PDFLib;
    const doc = await PDFLib.PDFDocument.create();
    doc.registerFontkit(window.fontkit);
    doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    doc.setCreator('araclar.bilisimajans.com');
    doc.setTitle(d.title);
    const reg = await doc.embedFont(fontData.regular, { subset: true });
    const bold = await doc.embedFont(fontData.bold, { subset: true });

    let charset = null;
    try { charset = new Set(reg.getCharacterSet()); } catch { charset = null; }
    let replaced = 0;
    const T = (s) => {
      let out = '';
      for (const ch of String(s || '')) {
        const cp = ch.codePointAt(0);
        if (ch === '\t') { out += '    '; continue; }
        if (cp === 0xa0) { out += ' '; continue; }
        if (cp < 32 || cp === 0x7f || (cp >= 0x200b && cp <= 0x200f) || cp === 0xfeff || cp === 0xfffd) continue;
        if (charset && !charset.has(cp)) { out += '?'; replaced++; continue; }
        out += ch;
      }
      return out;
    };

    const PW = 595.28, PH = 841.89, M = 56, MT = 56, MB = 68, W = PW - 2 * M;
    const SIZE = 10.5, LEAD = 15.5, black = rgb(0.05, 0.05, 0.05), grey = rgb(0.4, 0.4, 0.4);
    const pages = [];
    let y = 0;
    const cur = () => pages[pages.length - 1];
    const newPage = () => { pages.push(doc.addPage([PW, PH])); y = PH - MT; };
    const ensure = (h) => { if (!pages.length || y - h < MB) newPage(); };

    // Kelime kaydırma: çok uzun tek sözcükleri karakter karakter böler.
    const wrap = (text, font, size, width, firstIndent = 0) => {
      const wd = (t) => font.widthOfTextAtSize(t, size);
      const lines = []; let line = ''; let lw = firstIndent; let limit = width - firstIndent;
      const push = () => { lines.push({ text: line.trimEnd(), indent: lines.length === 0 ? firstIndent : 0 }); line = ''; lw = 0; limit = width; };
      for (let tok of text.match(/\S+\s*|\s+/g) || []) {
        let guard = 0;
        while (tok && guard++ < 10000) {
          const full = wd(tok), trimmed = wd(tok.trimEnd());
          if (lw + trimmed <= limit) { line += tok; lw += full; tok = ''; break; }
          if (line.trim()) { push(); tok = tok.trimStart(); continue; }
          if (trimmed <= limit) { line = tok.trimStart(); lw = wd(line); tok = ''; break; }
          let n = 0; let acc = 0;
          for (const ch of tok) { const cw = wd(ch); if (acc + cw > limit && n > 0) break; acc += cw; n += ch.length; }
          line = tok.slice(0, n); tok = tok.slice(n); push();
        }
      }
      if (line.length || !lines.length) lines.push({ text: line.trimEnd(), indent: lines.length === 0 ? firstIndent : 0 });
      return lines;
    };

    const draw = (text, o = {}) => {
      const font = o.font || reg, size = o.size || SIZE, lead = o.lead || LEAD;
      const x0 = o.x ?? M, w = o.w ?? W;
      for (const l of wrap(T(text), font, size, w, o.indent || 0)) {
        ensure(lead);
        if (l.text) {
          const tw = font.widthOfTextAtSize(l.text, size);
          const x = o.align === 'center' ? x0 + (w - tw) / 2 : o.align === 'right' ? x0 + w - tw : x0 + l.indent;
          cur().drawText(l.text, { x, y: y - size, size, font, color: o.color || black });
        }
        y -= lead;
      }
    };
    /** Kalın etiket + normal metin (taşan satırlar sola döner). */
    const drawLabeled = (label, rest) => {
      const lw = bold.widthOfTextAtSize(T(label), SIZE);
      const lines = wrap(T(rest), reg, SIZE, W, lw);
      lines.forEach((l, i) => {
        ensure(LEAD);
        if (i === 0) cur().drawText(T(label), { x: M, y: y - SIZE, size: SIZE, font: bold, color: black });
        if (l.text) cur().drawText(l.text, { x: M + l.indent, y: y - SIZE, size: SIZE, font: reg, color: black });
        y -= LEAD;
      });
    };
    const heading = (text) => { ensure(LEAD * 3); y -= 4; draw(text, { font: bold, size: 11 }); };

    function drawTable(tb) {
      const widths = tb.cols.map((c) => W * c.w / tb.cols.reduce((s, x) => s + x.w, 0));
      const FS = 9.5, LD = 13, PAD = 4;
      const headCells = tb.cols.map((c) => c.label);
      const drawRow = (cells, isHead) => {
        const lines = cells.map((v, i) => wrap(T(v), isHead ? bold : reg, FS, widths[i] - 2 * PAD).map((l) => l.text));
        const h = Math.max(1, ...lines.map((l) => l.length)) * LD + 2 * PAD;
        if (!pages.length || y - h < MB) { newPage(); if (!isHead) drawRow(headCells, true); }
        let x = M;
        cells.forEach((_, i) => {
          const o = { x, y: y - h, width: widths[i], height: h, borderColor: grey, borderWidth: 0.6 };
          if (isHead) o.color = rgb(0.92, 0.92, 0.92);
          cur().drawRectangle(o);
          lines[i].forEach((t, k) => { if (t) cur().drawText(t, { x: x + PAD, y: y - PAD - FS - k * LD + 2, size: FS, font: isHead ? bold : reg, color: black }); });
          x += widths[i];
        });
        y -= h;
      };
      ensure(LEAD * 3 + 30);
      y -= 4;
      draw(tb.title, { font: bold, size: 11 });
      y -= 2;
      drawRow(headCells, true);
      if (!tb.rows.length) drawRow(tb.cols.map((_, i) => (i === 0 ? '(Satır yok)' : '')), false);
      for (const r of tb.rows) drawRow(tb.cols.map((_, i) => r[i] || ''), false);
      y -= LEAD * 0.6;
    }

    newPage();
    draw(upperTr(d.title), { font: bold, size: 14, lead: 20, align: 'center' });
    if (d.meta.length) draw(d.meta.map((m) => `${m.label}: ${m.value}`).join('   ·   '), { size: 9.5, color: grey, align: 'center' });
    y -= 6;

    heading(upperTr(cfg.peopleNoun));
    for (const p of d.people) { drawLabeled(`${p.role || '—'}: `, personLine(p) || '..............................'); y -= 3; }
    y -= 4;

    const tableAt = d.table ? Math.min(d.table.after ?? d.clauses.length, d.clauses.length) : -1;
    if (tableAt === 0) drawTable(d.table);
    d.clauses.forEach((c, i) => {
      ensure(LEAD * 3);
      draw(clauseHeading(d, i, c), { font: bold });
      for (const para of c.x.split('\n')) {
        if (!para.trim()) continue;
        draw(para);
        y -= 3;
      }
      y -= 4;
      if (i + 1 === tableAt) drawTable(d.table);
    });

    // İmza blokları: iki sütun, satır bölünmez; hepsi boş bırakılır.
    const blocks = signBlocks(d);
    const gap = 28, colW = (W - gap) / 2;
    const blockH = (b) => {
      const rl = wrap(T(upperTr(b.role)), bold, 10, colW).length;
      const nl = b.name ? wrap(T(b.name), reg, SIZE, colW).length : 1;
      return rl * 14 + nl * LEAD + 50 + 14;
    };
    const rowsOfBlocks = [];
    for (let i = 0; i < blocks.length; i += 2) rowsOfBlocks.push(blocks.slice(i, i + 2));
    y -= 6;
    const firstH = rowsOfBlocks.length ? Math.max(...rowsOfBlocks[0].map(blockH)) : 0;
    ensure(LEAD * 2 + firstH);
    draw('İMZALAR', { font: bold, size: 11 });
    y -= 4;
    for (const row of rowsOfBlocks) {
      const h = Math.max(...row.map(blockH));
      ensure(h);
      row.forEach((b, k) => {
        const x = M + k * (colW + gap);
        let yy = y;
        for (const l of wrap(T(upperTr(b.role)), bold, 10, colW)) { cur().drawText(l.text, { x, y: yy - 10, size: 10, font: bold, color: black }); yy -= 14; }
        if (b.name) {
          for (const l of wrap(T(b.name), reg, SIZE, colW)) { cur().drawText(l.text, { x, y: yy - SIZE, size: SIZE, font: reg, color: black }); yy -= LEAD; }
        } else {
          const lab = 'Ad Soyad:';
          cur().drawText(lab, { x, y: yy - SIZE, size: SIZE, font: reg, color: black });
          const lw = reg.widthOfTextAtSize(lab, SIZE) + 6;
          cur().drawLine({ start: { x: x + lw, y: yy - SIZE }, end: { x: x + colW * 0.9, y: yy - SIZE }, thickness: 0.6, color: black });
          yy -= LEAD;
        }
        yy -= 40;
        cur().drawLine({ start: { x, y: yy }, end: { x: x + colW * 0.9, y: yy }, thickness: 0.6, color: black });
        cur().drawText('İmza', { x, y: yy - 11, size: 9, font: reg, color: grey });
      });
      y -= h;
    }

    if (d.ekler.length) {
      ensure(LEAD * 3);
      draw('EKLER:', { font: bold });
      d.ekler.forEach((x, i) => draw(`EK-${i + 1}: ${x}`));
    }
    // Belge sonu uyarı notu (şablona özgü + genel)
    y -= 8;
    ensure(LEAD * 3);
    cur().drawLine({ start: { x: M, y }, end: { x: PW - M, y }, thickness: 0.5, color: grey });
    y -= 6;
    draw(`Önemli not: ${d.note} ${GENERAL_NOTE}`, { size: 9, lead: 12.5, color: grey });

    // Her sayfanın altına genel not ve sayfa numarası
    const total = pages.length;
    pages.forEach((pg, i) => {
      const t1 = T(GENERAL_NOTE);
      const w1 = reg.widthOfTextAtSize(t1, 7.5);
      pg.drawText(t1, { x: (PW - w1) / 2, y: 38, size: 7.5, font: reg, color: grey });
      const t2 = T(`Bilişim Ajans Ücretsiz Araçlar · Sayfa ${i + 1} / ${total}`);
      const w2 = reg.widthOfTextAtSize(t2, 7.5);
      pg.drawText(t2, { x: (PW - w2) / 2, y: 27, size: 7.5, font: reg, color: grey });
    });
    return { bytes: await doc.save({ useObjectStreams: false }), pages: total, replaced };
  }

  async function run(kind) {
    const btn = $(kind === 'pdf' ? 'make-pdf' : 'make-docx');
    showError($('error'), null);
    invalidateResult();
    if (!curKey) { showError($('error'), 'Önce bir şablon seçin. "Belge türü" listesinden ihtiyacınıza uyan şablonu seçip alanları doldurun.'); $('f-template').focus(); return; }
    const d = collect();
    if (!validate(d)) return;
    btn.disabled = true;
    setProgress($('progress'), 20, kind === 'pdf' ? 'Yazı tipi ve PDF kütüphanesi yükleniyor…' : 'Word belgesi hazırlanıyor…');
    await tick();
    try {
      let blob; let info;
      if (kind === 'pdf') {
        const r = await buildPdf(d);
        blob = new Blob([r.bytes], { type: 'application/pdf' });
        const note = r.replaced ? ` · ${r.replaced} karakter yazı tipinde olmadığı için "?" ile değiştirildi` : '';
        info = `${r.pages} sayfa · ${formatBytes(blob.size)} · ${fileName(d, 'pdf')}${note}`;
      } else {
        blob = await buildDocx(d);
        info = `${formatBytes(blob.size)} · ${fileName(d, 'docx')}`;
      }
      setProgress($('progress'), 100, 'Dosya yazılıyor…');
      await tick();
      downloadBlob(blob, fileName(d, kind));
      $('result-info').textContent = info + resultNote(d);
      $('result').classList.add('is-active');
      setProgress($('progress'), null);
    } catch (err) {
      console.error(err);
      setProgress($('progress'), null);
      showError($('error'), String(err && err.message) === 'FONT'
        ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
        : (kind === 'pdf'
          ? 'PDF oluşturulurken beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse metinleri kısaltarak deneyin.'
          : 'Word belgesi oluşturulurken bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse PDF olarak indirin.'));
    } finally { btn.disabled = false; }
  }
  $('make-pdf').addEventListener('click', () => run('pdf'));
  $('make-docx').addEventListener('click', () => run('docx'));

  // ---------- DOCX ----------

  function getDocx() {
    if (!docxPromise) docxPromise = import(new URL('../vendor/docx@9.15.1/docx.mjs', import.meta.url).href);
    return docxPromise;
  }

  async function buildDocx(d) {
    const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, TableBorders, ShadingType, Footer, PageNumber } = await getDocx();
    const FONT = 'Times New Roman';
    const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 22, bold: o.bold, color: o.color });
    const para = (text, o = {}) => new Paragraph({
      alignment: o.align || AlignmentType.LEFT,
      keepNext: o.keepNext,
      spacing: { after: o.after ?? 100, before: o.before ?? 0, line: 276 },
      children: o.runs || (text === '' ? [] : [run(text, o)]),
    });
    const children = [];
    children.push(para(upperTr(d.title), { align: AlignmentType.CENTER, bold: true, size: 28, after: 120 }));
    if (d.meta.length) children.push(para(d.meta.map((m) => `${m.label}: ${m.value}`).join('   ·   '), { align: AlignmentType.CENTER, size: 20, color: '555555', after: 200 }));
    children.push(para(upperTr(cfg.peopleNoun), { bold: true, before: 120, keepNext: true }));
    for (const p of d.people) children.push(para('', { runs: [run(`${p.role || '—'}: `, { bold: true }), run(personLine(p) || '..............................')] }));

    const border = { style: 'single', size: 4, color: '808080' };
    const cellBorders = { top: border, bottom: border, left: border, right: border };
    const tableAt = d.table ? Math.min(d.table.after ?? d.clauses.length, d.clauses.length) : -1;
    const addTable = () => {
      const tb = d.table;
      const total = tb.cols.reduce((s, c) => s + c.w, 0);
      const mkCell = (txt, ci, head) => new TableCell({
        width: { size: Math.round(100 * tb.cols[ci].w / total), type: WidthType.PERCENTAGE },
        borders: cellBorders,
        shading: head ? { type: ShadingType.CLEAR, fill: 'EBEBEB', color: 'auto' } : undefined,
        children: [para(txt, { size: 19, bold: head, after: 40 })],
      });
      const rows = [new TableRow({ tableHeader: true, cantSplit: true, children: tb.cols.map((c, ci) => mkCell(c.label, ci, true)) })];
      const body = tb.rows.length ? tb.rows : [tb.cols.map((_, i) => (i === 0 ? '(Satır yok)' : ''))];
      for (const r of body) rows.push(new TableRow({ cantSplit: true, children: tb.cols.map((_, ci) => mkCell(r[ci] || '', ci, false)) }));
      children.push(para(tb.title, { bold: true, before: 160, keepNext: true }));
      children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }));
      children.push(para('', { after: 80 }));
    };
    if (tableAt === 0) addTable();
    d.clauses.forEach((c, i) => {
      children.push(para(clauseHeading(d, i, c), { bold: true, before: 120, after: 40, keepNext: true }));
      for (const x of c.x.split('\n')) if (x.trim()) children.push(para(x));
      if (i + 1 === tableAt) addTable();
    });

    // İmza tablosu: iki sütun, boş imza alanları
    children.push(para('İMZALAR', { bold: true, before: 240, keepNext: true }));
    const blocks = signBlocks(d);
    const sigCell = (b) => new TableCell({
      width: { size: 50, type: WidthType.PERCENTAGE },
      borders: TableBorders.NONE,
      children: b ? [
        para(upperTr(b.role), { bold: true, after: 40 }),
        para(b.name || 'Ad Soyad: ……………………………', { after: 40 }),
        para('', { after: 500 }),
        para('İmza: ………………………………', { size: 20, color: '555555', after: 120 }),
      ] : [para('')],
    });
    const sigRows = [];
    for (let i = 0; i < blocks.length; i += 2) sigRows.push(new TableRow({ cantSplit: true, children: [sigCell(blocks[i]), sigCell(blocks[i + 1])] }));
    children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: TableBorders.NONE, rows: sigRows }));

    if (d.ekler.length) {
      children.push(para('EKLER:', { bold: true, before: 200, after: 60 }));
      d.ekler.forEach((x, i) => children.push(para(`EK-${i + 1}: ${x}`, { after: 40 })));
    }
    children.push(para('', { runs: [run('Önemli not: ', { bold: true, size: 18, color: '555555' }), run(`${d.note} ${GENERAL_NOTE}`, { size: 18, color: '555555' })], before: 240 }));

    const footer = new Footer({
      children: [
        para(GENERAL_NOTE, { align: AlignmentType.CENTER, size: 15, color: '666666', after: 0 }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Bilişim Ajans Ücretsiz Araçlar · Sayfa ', font: FONT, size: 15, color: '666666' }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: '666666' })] }),
      ],
    });
    const docx = new Document({
      creator: 'Bilişim Ajans Ücretsiz Araçlar',
      title: d.title,
      description: 'araclar.bilisimajans.com ile hazırlanan örnek şablon; hukuki tavsiye değildir',
      styles: { default: { document: { run: { font: FONT, size: 22 } } } },
      sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1247, right: 1247 } } }, footers: { default: footer }, children }],
    });
    const blob = await Packer.toBlob(docx);
    return blob.type === DOCX_MIME ? blob : new Blob([blob], { type: DOCX_MIME });
  }

  // ---------- Başlangıç ----------
  initSelect();
  $('editor').hidden = true;
  $('tpl-note-box').hidden = true;
  render();
  // Adres çubuğundan şablon seçimi: ?sablon=zimmet (yalnızca yerel anahtar eşleşmesi)
  const q = new URLSearchParams(location.search).get('sablon');
  if (q && TPL[q]) applyTemplate(q);
}
