import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, makeSortable, moveItem, getPdfLib, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
let items = []; // { id, file }
let seq = 0;
let resultBlob = null;

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });
makeSortable(list, syncOrder);

function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const ok = files.filter((f) => f.type === 'application/pdf' || /\.pdf$/i.test(f.name));
  if (ok.length !== files.length) showError($('error'), 'Yalnızca PDF dosyaları eklenebilir; diğerleri atlandı.');
  for (const file of ok) {
    const id = String(++seq);
    items.push({ id, file });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `<span class="ba-handle" aria-hidden="true">⠿</span><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="up" aria-label="Yukarı taşı">↑</button>
      <button class="ba-icon-btn" type="button" data-act="down" aria-label="Aşağı taşı">↓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = formatBytes(file.size);
    list.appendChild(li);
  }
  refresh();
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  if (btn.dataset.act === 'remove') li.remove();
  else moveItem(li, btn.dataset.act === 'up' ? -1 : 1);
  syncOrder();
});

function syncOrder() {
  const order = Array.from(list.children).map((li) => li.dataset.id);
  items = order.map((id) => items.find((it) => it.id === id)).filter(Boolean);
  refresh();
}

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('merge').disabled = items.length < 1;
}

$('clear').addEventListener('click', () => {
  items = []; list.innerHTML = ''; resultBlob = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refresh();
});

$('merge').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('merge');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const withBookmarks = $('opt-bookmarks').checked;
  try {
    const PDFLib = await getPdfLib();
    const out = await PDFLib.PDFDocument.create();
    out.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    out.setCreator('araclar.bilisimajans.com');
    const outline = []; // { title, pageIndex }
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const { file } = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${file.name}`);
      await tick();
      let pages;
      try {
        const src = await PDFLib.PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: false });
        // pdf-lib bozuk dosyayı yükleyebilir ama sayfa ağacı yoksa burada patlar; o da "bozuk" sayılır.
        pages = await out.copyPages(src, src.getPageIndices());
        if (!pages.length) throw new Error('no pages');
      } catch (err) {
        if (/encrypted/i.test(String(err))) throw new Error(`"${file.name}" şifreli: encrypted`);
        throw new Error(`"${file.name}" okunamadı: ${err && err.message}`);
      }
      outline.push({ title: file.name.replace(/\.pdf$/i, ''), pageIndex: total });
      pages.forEach((p) => out.addPage(p));
      total += pages.length;
    }
    if (withBookmarks && outline.length) addOutline(PDFLib, out, outline);
    setProgress($('progress'), 100, 'PDF yazılıyor…');
    await tick();
    const bytes = await out.save();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    $('result-info').textContent = `${items.length} dosya · ${total} sayfa · ${formatBytes(resultBlob.size)}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err.message);
    const msg = /şifreli/.test(m)
      ? `${m.split(':')[0]} görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.`
      : /okunamadı/.test(m)
        ? `${m.split(' okunamadı')[0]} bozuk ya da geçerli bir PDF değil. Dosyayı açabildiğinizi kontrol edip yeniden seçin.`
        : friendlyError(err);
    showError($('error'), msg);
  } finally {
    btn.disabled = false;
  }
});

/** pdf-lib'in doğrudan API'si yok; düz (tek seviye) anahat ağacını elle kurar. */
function addOutline(PDFLib, doc, entries) {
  const { PDFName, PDFString, PDFArray } = PDFLib;
  const ctx = doc.context;
  const pages = doc.getPages();
  const outlinesRef = ctx.nextRef();
  const refs = entries.map(() => ctx.nextRef());
  entries.forEach((e, i) => {
    const page = pages[e.pageIndex];
    const dest = PDFArray.withContext(ctx);
    dest.push(page.ref);
    dest.push(PDFName.of('Fit'));
    const item = ctx.obj({
      Title: PDFString.of(e.title),
      Parent: outlinesRef,
      Dest: dest,
      ...(i > 0 ? { Prev: refs[i - 1] } : {}),
      ...(i < refs.length - 1 ? { Next: refs[i + 1] } : {}),
    });
    ctx.assign(refs[i], item);
  });
  ctx.assign(outlinesRef, ctx.obj({ Type: PDFName.of('Outlines'), First: refs[0], Last: refs[refs.length - 1], Count: refs.length }));
  doc.catalog.set(PDFName.of('Outlines'), outlinesRef);
}

$('download').addEventListener('click', () => {
  if (!resultBlob) return;
  let name = ($('opt-name').value || 'birlesik.pdf').trim();
  if (!/\.pdf$/i.test(name)) name += '.pdf';
  downloadBlob(resultBlob, name);
});
