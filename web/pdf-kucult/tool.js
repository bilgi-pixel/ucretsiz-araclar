import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfJs, getPdfLib, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024; // 50 MB üstünde uyarı
const MB = 1024 * 1024;

// Boyut hedefli ön ayarlar için denenecek (dpi, kalite) merdiveni; yukarıdan aşağıya küçülür.
const LADDER = [[150, 0.8], [110, 0.75], [110, 0.6], [96, 0.6], [96, 0.5], [72, 0.5], [72, 0.35], [72, 0.25]];
const PRESETS = {
  edevlet: { label: 'e-Devlet (≤ 2 MB)', target: 2 * MB },
  eposta: { label: 'E-posta (≤ 5 MB)', target: 5 * MB },
  balanced: { label: 'Dengeli', dpi: 110, quality: 0.7 },
  smallest: { label: 'En küçük', dpi: 72, quality: 0.45 },
  custom: { label: 'Elle ayarla' },
};

let file = null;
let pdf = null; // pdf.js belgesi
let resultBlob = null;
let resultName = 'kucultulmus.pdf';

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

// ?hedef=2mb / ?hedef=5mb ile ön ayar seçilebilir (WordPress menüsünden derin bağlantı için).
{
  const hedef = new URLSearchParams(location.search).get('hedef');
  if (hedef === '2mb') $('opt-preset').value = 'edevlet';
  if (hedef === '5mb') $('opt-preset').value = 'eposta';
}

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Lütfen bir PDF dosyası seçin. Resim dosyalarını küçültmek için önce Resimden PDF\'e aracını kullanabilirsiniz.'); return; }
  file = f;
  try {
    const pdfjs = await getPdfJs();
    pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
  } catch (err) {
    file = null; pdf = null;
    showError($('error'), /PasswordException|password/i.test(String(err && (err.name + err.message))) ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.' : friendlyError(err));
    return;
  }
  $('files').innerHTML = `<li><span class="name"></span><span class="meta"></span></li>`;
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pdf.numPages} sayfa · ${formatBytes(f.size)}`;
  if (f.size >= BIG_FILE) $('warning').textContent = `Dosya ${formatBytes(f.size)}; 50 MB üstü dosyalarda işlem birkaç dakika sürebilir ve telefonda tarayıcı belleği yetmeyebilir. Mümkünse bilgisayarda deneyin ya da önce PDF Böl aracıyla parçalara ayırın.`;
  $('warning').classList.toggle('is-active', f.size >= BIG_FILE);
  $('options').hidden = false;
  $('actions').hidden = false;
  syncOptionVisibility();
}

function reset() {
  file = null; pdf = null; resultBlob = null;
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

/** Mod ve ön ayara göre hangi alanların görüneceğini belirler. */
function syncOptionVisibility() {
  const lossless = $('opt-mode').value === 'lossless';
  const custom = $('opt-preset').value === 'custom';
  $('field-preset').hidden = lossless;
  $('field-dpi').hidden = lossless || !custom;
  $('field-quality').hidden = lossless || !custom;
  $('mode-hint').textContent = lossless
    ? 'Metin seçilebilir kalır; kazanç genellikle %5–20 arasındadır.'
    : 'Sayfalar görsele çevrilir: en yüksek kazanç, ancak metin seçilemez ve aranamaz hale gelir.';
}
$('opt-mode').addEventListener('change', syncOptionVisibility);
$('opt-preset').addEventListener('change', syncOptionVisibility);

/** Tek bir (dpi, kalite) ayarıyla tüm sayfaları görsele çevirip yeni PDF üretir. */
async function buildImagePdf(dpi, quality, attemptLabel) {
  const PDFLib = await getPdfLib();
  const doc = await PDFLib.PDFDocument.create();
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  const scale = dpi / 72;
  const total = pdf.numPages;
  for (let n = 1; n <= total; n++) {
    setProgress($('progress'), ((n - 1) / total) * 100, `${attemptLabel}Sayfa ${n}/${total} işleniyor (${dpi} dpi)`);
    await tick();
    const page = await pdf.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(vp.width));
    canvas.height = Math.max(1, Math.round(vp.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', quality));
    canvas.width = canvas.height = 0; // belleği hemen bırak
    page.cleanup();
    const img = await doc.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const out = doc.addPage([base.width, base.height]);
    out.drawImage(img, { x: 0, y: 0, width: base.width, height: base.height });
  }
  setProgress($('progress'), 100, 'PDF yazılıyor…');
  await tick();
  return doc.save({ useObjectStreams: true });
}

/** Kayıpsız mod: belgeyi pdf-lib ile açıp nesne akışlarıyla yeniden paketler. */
async function buildLosslessPdf() {
  setProgress($('progress'), 30, 'Belge yeniden paketleniyor…');
  await tick();
  const PDFLib = await getPdfLib();
  const doc = await PDFLib.PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
  setProgress($('progress'), 70, 'PDF yazılıyor…');
  await tick();
  return doc.save({ useObjectStreams: true, addDefaultPage: false });
}

$('run').addEventListener('click', async () => {
  if (!pdf || !file) return;
  const btn = $('run');
  btn.disabled = true;
  resultBlob = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const mode = $('opt-mode').value;
  const presetKey = $('opt-preset').value;
  const preset = PRESETS[presetKey] || PRESETS.balanced;
  try {
    let bytes;
    let note = '';
    if (mode === 'lossless') {
      bytes = await buildLosslessPdf();
    } else if (preset.target) {
      // Hedef boyut: merdiveni yukarıdan aşağıya dene, hedefin altına inince dur.
      let best = null;
      for (let i = 0; i < LADDER.length; i++) {
        const [dpi, q] = LADDER[i];
        bytes = await buildImagePdf(dpi, q, `Deneme ${i + 1}/${LADDER.length} · `);
        if (!best || bytes.length < best.length) best = bytes;
        if (bytes.length <= preset.target) { note = `${dpi} dpi, JPG kalitesi %${Math.round(q * 100)} ile hedefe ulaşıldı.`; break; }
      }
      bytes = best;
      if (bytes.length > preset.target) note = `En düşük ayarda bile ${formatBytes(preset.target)} sınırına inilemedi (${formatBytes(bytes.length)}). Dosyayı PDF Böl aracıyla parçalara ayırıp her parçayı ayrı küçültmeyi deneyin.`;
    } else {
      const dpi = presetKey === 'custom' ? Number($('opt-dpi').value) : preset.dpi;
      const q = presetKey === 'custom' ? Number($('opt-quality').value) : preset.quality;
      bytes = await buildImagePdf(dpi, q, '');
    }
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(file.name)}-kucuk.pdf`;
    const before = file.size, after = resultBlob.size;
    const saved = Math.round((1 - after / before) * 100);
    $('size-before').textContent = formatBytes(before);
    $('size-after').textContent = formatBytes(after);
    $('size-saved').textContent = saved > 0 ? `%${saved} küçüldü` : 'küçülmedi';
    $('result-info').textContent = `${pdf.numPages} sayfa · ${resultName}`;
    if (after >= before) note = (note ? note + ' ' : '') + (mode === 'lossless'
      ? 'Bu belge zaten sıkıştırılmış görünüyor; kayıpsız modda daha fazla kazanç yok. "Görsel sıkıştır" modunu deneyin.'
      : 'Bu belge çoğunlukla metinden oluştuğu için görsele çevirmek dosyayı büyüttü. Orijinal dosyanızı kullanmanız daha iyi; yine de görselleştirilmiş sürümü indirebilirsiniz.');
    $('result-note').textContent = note;
    $('result-note').hidden = !note;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
