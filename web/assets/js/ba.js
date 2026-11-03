// Bilişim Ajans araçları — ortak yardımcılar. Hiçbir fonksiyon ağ isteği yapmaz;
// loadScript yalnızca aynı origin'deki vendor/ dosyalarını yükler.

/** Dosya seç + sürükle-bırak + klavye destekli alan. */
export function createDropzone({ el, accept = '', multiple = true, onFiles }) {
  el.classList.add('ba-dropzone');
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Dosya seçmek için tıklayın veya dosyaları buraya bırakın');

  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = multiple;
  if (accept) input.accept = accept;
  el.appendChild(input);

  const emit = (list) => {
    const files = Array.from(list || []);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };
  input.addEventListener('change', () => { emit(input.files); input.value = ''; });
  el.addEventListener('click', (e) => { if (e.target !== input) input.click(); });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
  });
  ['dragenter', 'dragover'].forEach((t) => el.addEventListener(t, (e) => { e.preventDefault(); el.classList.add('is-over'); }));
  ['dragleave', 'drop'].forEach((t) => el.addEventListener(t, (e) => { e.preventDefault(); el.classList.remove('is-over'); }));
  el.addEventListener('drop', (e) => emit(e.dataTransfer.files));
  return { input };
}

/** İlerleme çubuğu: pct 0–100 (null → gizle). */
export function setProgress(el, pct, label = '') {
  if (pct === null || pct === undefined) { el.classList.remove('is-active'); return; }
  el.classList.add('is-active');
  const bar = el.querySelector('.bar > span');
  const text = el.querySelector('.label');
  if (bar) bar.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  if (text) text.textContent = label;
  el.setAttribute('aria-valuenow', String(Math.round(pct)));
}

/** Blob'u dosya olarak indirir; Türkçe karakterli adlar korunur. */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export function showError(el, msg) {
  if (!msg) { el.classList.remove('is-active'); el.textContent = ''; return; }
  el.textContent = msg;
  el.classList.add('is-active');
  el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/** Hata nesnesini kullanıcıya anlaşılır Türkçe mesaja çevirir. */
export function friendlyError(err) {
  const m = String(err && err.message || err || '');
  if (/encrypted|password/i.test(m)) return 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.';
  if (/Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected/i.test(m)) return 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı açabildiğinizi kontrol edip yeniden seçin.';
  if (/Unsupported|not supported|Unable to decode|decode/i.test(m)) return 'Bu dosya biçimi desteklenmiyor. Lütfen JPG, PNG veya WebP seçin.';
  if (/memory|allocation/i.test(m)) return 'Dosya tarayıcı belleği için fazla büyük. Daha küçük parçalarla deneyin.';
  return 'İşlem sırasında beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin.';
}

/** Dosya adından uzantıyı atar: "rapor.pdf" → "rapor" */
export function baseName(name) {
  return name.replace(/\.[^.]+$/, '');
}

/** Liste öğelerini sürükleyerek sıralama (fare + dokunma, pointer events). */
export function makeSortable(listEl, onChange) {
  let dragging = null;
  listEl.addEventListener('pointerdown', (e) => {
    const handle = e.target.closest('.ba-handle');
    if (!handle) return;
    dragging = handle.closest('li');
    dragging.classList.add('is-dragging');
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  listEl.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('li');
    if (!over || over === dragging || over.parentElement !== listEl) return;
    const rect = over.getBoundingClientRect();
    const after = e.clientY > rect.top + rect.height / 2;
    listEl.insertBefore(dragging, after ? over.nextSibling : over);
  });
  const end = () => {
    if (!dragging) return;
    dragging.classList.remove('is-dragging');
    dragging = null;
    onChange && onChange();
  };
  listEl.addEventListener('pointerup', end);
  listEl.addEventListener('pointercancel', end);
}

/** Yukarı/aşağı düğmeleriyle sıralama (klavye erişilebilirliği için). */
export function moveItem(li, dir) {
  const sib = dir < 0 ? li.previousElementSibling : li.nextElementSibling;
  if (!sib) return;
  if (dir < 0) li.parentElement.insertBefore(li, sib);
  else li.parentElement.insertBefore(sib, li);
}

const loaded = new Map();
/** Aynı origin'deki klasik (modül olmayan) script'i bir kez yükler. */
export function loadScript(src) {
  if (loaded.has(src)) return loaded.get(src);
  const p = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Yüklenemedi: ${src}`));
    document.head.appendChild(s);
  });
  loaded.set(src, p);
  return p;
}

/** vendor/ altındaki pdf-lib'i yükler ve global PDFLib'i döndürür. */
export async function getPdfLib() {
  await loadScript(new URL('../../vendor/pdf-lib@1.17.1/pdf-lib.min.js', import.meta.url).href);
  return window.PDFLib;
}

/** vendor/ altındaki pdf.js'i yükler (ES module) ve worker'ı ayarlar. */
export async function getPdfJs() {
  const base = new URL('../../vendor/pdfjs-dist@4.10.38/', import.meta.url).href;
  const pdfjs = await import(`${base}pdf.min.mjs`);
  pdfjs.GlobalWorkerOptions.workerSrc = `${base}pdf.worker.min.mjs`;
  return pdfjs;
}

/** Ana iş parçacığına nefes aldırır (ilerleme çubuğu güncellensin diye). */
export const tick = () => new Promise((r) => setTimeout(r, 0));

/** "1-3,5,8-" gibi sayfa aralığı ifadesini 1 tabanlı sayfa numaralarına çevirir. */
export function parsePageRanges(expr, total) {
  const out = new Set();
  const parts = String(expr || '').split(/[,\s;]+/).filter(Boolean);
  for (const part of parts) {
    const m = part.match(/^(\d+)?\s*-\s*(\d+)?$/);
    if (m && (m[1] || m[2])) {
      const a = m[1] ? Number(m[1]) : 1;
      const b = m[2] ? Number(m[2]) : total;
      for (let i = Math.min(a, b); i <= Math.max(a, b); i++) if (i >= 1 && i <= total) out.add(i);
    } else if (/^\d+$/.test(part)) {
      const n = Number(part);
      if (n >= 1 && n <= total) out.add(n);
    } else {
      throw new Error(`Geçersiz sayfa ifadesi: "${part}". Örnek: 1-3,5,8-10`);
    }
  }
  return Array.from(out).sort((a, b) => a - b);
}
