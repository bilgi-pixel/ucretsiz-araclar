// PDF'e Şifre Ekle — qpdf (WebAssembly) ile AES-256 / AES-128 parola koruması.
// Tüm işlem tarayıcıda, bir Web Worker içinde yapılır; dosya ve parola hiçbir sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const WORKER_URL = new URL('./qpdf-worker.js', import.meta.url).href;

let current = null; // { file, bytes }
let result = null;  // { blob, name }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => setFile(f) });

/** Dosyayı kabaca doğrular: uzantı, PDF başlığı, zaten şifreli mi? */
async function setFile(file) {
  $('options').hidden = true; // hatalı dosyada seçenekler görünmesin
  reset(false);
  if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
    showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları şifrelenebilir; Word belgesini önce Word'den PDF'e aracıyla dönüştürün.`);
    return;
  }
  const bytes = await file.arrayBuffer();
  const head = new TextDecoder('latin1').decode(new Uint8Array(bytes, 0, Math.min(1024, bytes.byteLength)));
  const tail = new TextDecoder('latin1').decode(new Uint8Array(bytes, Math.max(0, bytes.byteLength - 65536)));
  if (!/%PDF-/.test(head) || !/startxref|trailer|\/Root/.test(tail)) {
    showError($('error'), `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF görüntüleyicide açabildiğinizi kontrol edip yeniden seçin.`);
    return;
  }
  if (hasEncryptDict(bytes)) {
    showError($('error'), `"${file.name}" zaten şifreli görünüyor. Parolayı değiştirmek için önce PDF Şifresini Kaldır aracıyla şifreyi kaldırın, sonra buraya yeni parolayla dönün.`);
    return;
  }
  current = { file, bytes };
  $('file-name').textContent = file.name;
  $('file-meta').textContent = formatBytes(file.size);
  $('file-box').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  if (file.size >= BIG_FILE) {
    $('warning').textContent = `Dosya ${formatBytes(file.size)}; 50 MB üstü dosyalarda şifreleme uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
    $('warning').classList.add('is-active');
  }
  $('pw-user').focus();
}

/** Dosyanın sonundaki trailer bölümünde /Encrypt var mı (hızlı ön kontrol). */
function hasEncryptDict(bytes) {
  const n = bytes.byteLength;
  const tail = new TextDecoder('latin1').decode(new Uint8Array(bytes, Math.max(0, n - 4096), Math.min(4096, n)));
  return /\/Encrypt\b/.test(tail);
}

function reset(clearFile = true) {
  showError($('error'), null);
  $('warning').classList.remove('is-active');
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  result = null;
  if (clearFile) {
    current = null;
    $('file-box').hidden = true;
    $('options').hidden = true;
    $('actions').hidden = true;
    $('pw-user').value = '';
    $('pw-owner').value = '';
    updateStrength();
  }
}

$('clear').addEventListener('click', () => reset(true));

// Parola göster/gizle düğmeleri
document.querySelectorAll('[data-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = $(btn.dataset.toggle);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.textContent = show ? 'Gizle' : 'Göster';
    btn.setAttribute('aria-pressed', show ? 'true' : 'false');
  });
});

/** Basit parola gücü göstergesi (yalnızca yönlendirme amaçlı; ağa gitmez). */
function updateStrength() {
  const v = $('pw-user').value;
  const el = $('pw-strength');
  if (!v) { el.textContent = ''; el.dataset.level = ''; return; }
  let score = 0;
  if (v.length >= 8) score++;
  if (v.length >= 12) score++;
  if (/[a-zığüşöç]/.test(v) && /[A-ZİĞÜŞÖÇ]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9İığüşöçĞÜŞÖÇ]/.test(v)) score++;
  const level = score <= 1 ? 'weak' : score <= 3 ? 'mid' : 'strong';
  el.dataset.level = level;
  el.textContent = level === 'weak' ? 'Zayıf parola: en az 8 karakter, harf ve rakam karıştırın.' : level === 'mid' ? 'Orta: 12+ karakter ve işaret eklerseniz güçlenir.' : 'Güçlü parola.';
}
$('pw-user').addEventListener('input', updateStrength);

/** qpdf çıktısını Türkçe, çözüm öneren mesaja çevirir. */
function mapError(code, stderr) {
  const m = String(stderr || '').replace(/^[^:\n]*:\s*/gm, '').replace(/\/in\.pdf:\s*/g, '').trim();
  if (/invalid password/i.test(m)) return 'Bu PDF zaten şifreli. Önce PDF Şifresini Kaldır aracıyla mevcut parolayı kaldırın, sonra yeni parolayla tekrar deneyin.';
  if (/startxref|trailer|xref|not a PDF|damaged|unable to find|expected|offset|EOF/i.test(m)) return 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF görüntüleyicide açabildiğinizi kontrol edin; açılıyorsa önce PDF Küçült aracından geçirip yeniden deneyin.';
  if (/memory|allocation|out of bounds/i.test(m)) return 'Dosya tarayıcı belleği için fazla büyük. Daha küçük bir dosyayla ya da bilgisayarda deneyin.';
  return `İşlem sırasında beklenmeyen bir hata oluştu (kod ${code}). Sayfayı yenileyip tekrar deneyin.${m ? ` Ayrıntı: ${m.split('\n')[0]}` : ''}`;
}

/** qpdf'i worker'da çalıştırır; { code, stdout, stderr, bytes } döndürür. */
function runQpdf(args, input, onStage) {
  return new Promise((resolve, reject) => {
    const w = new Worker(WORKER_URL);
    w.onmessage = (e) => {
      if (e.data.type === 'status') { onStage && onStage(e.data.stage); return; }
      w.terminate();
      resolve(e.data);
    };
    w.onerror = (e) => { w.terminate(); reject(new Error(e.message || 'Worker hatası')); };
    w.postMessage({ args, input, wantOutput: true }, [input]);
  });
}

$('run').addEventListener('click', async () => {
  if (!current) return;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const userPw = $('pw-user').value;
  let ownerPw = $('pw-owner').value;
  if (!userPw && !ownerPw) {
    showError($('error'), 'Bir parola yazın. Belgenin açılırken parola sormasını istiyorsanız "Açılış parolası"nı, yalnızca yazdırma/kopyalamayı kısıtlamak istiyorsanız "Sahip parolası"nı doldurun.');
    $('pw-user').focus();
    return;
  }
  if (userPw && userPw.length < 4) {
    showError($('error'), 'Açılış parolası en az 4 karakter olmalı; güvenlik için 8 ve üzeri önerilir.');
    $('pw-user').focus();
    return;
  }
  // Sahip parolası boşsa açılış parolasını kullan (Acrobat da böyle yapar); qpdf boş sahip parolasını güvensiz sayıp reddeder.
  const ownerSameAsUser = !ownerPw;
  if (ownerSameAsUser) ownerPw = userPw;

  const bits = $('opt-bits').value === '128' ? '128' : '256';
  const args = ['--encrypt', userPw, ownerPw, bits];
  if (bits === '128') args.push('--use-aes=y');
  args.push(`--print=${$('perm-print').checked ? 'full' : 'none'}`);
  args.push(`--extract=${$('perm-copy').checked ? 'y' : 'n'}`);
  args.push(`--modify=${$('perm-modify').checked ? 'all' : 'none'}`);
  args.push('--accessibility=y');
  args.push('--', '/in.pdf', '/out.pdf');

  $('run').disabled = true;
  setProgress($('progress'), 10, 'Şifreleme motoru yükleniyor…');
  await tick();
  try {
    const input = current.bytes.slice(0); // worker'a devredilecek kopya; orijinal kalsın
    const res = await runQpdf(args, input, (stage) => {
      if (stage === 'run') setProgress($('progress'), 55, `Şifreleniyor (AES-${bits})…`);
    });
    if (res.code !== 0 && res.code !== 3 || !res.bytes) {
      throw new Error(mapError(res.code, res.stderr));
    }
    setProgress($('progress'), 100, 'Tamamlandı');
    const name = `${baseName(current.file.name)}-sifreli.pdf`;
    result = { blob: new Blob([res.bytes], { type: 'application/pdf' }), name };
    const perms = [];
    perms.push($('perm-print').checked ? 'yazdırma açık' : 'yazdırma kapalı');
    perms.push($('perm-copy').checked ? 'kopyalama açık' : 'kopyalama kapalı');
    perms.push($('perm-modify').checked ? 'düzenleme açık' : 'düzenleme kapalı');
    $('result-info').textContent = `${name} · ${formatBytes(result.blob.size)} · AES-${bits}${userPw ? ' · açılış parolası var' : ' · açılış parolası yok (yalnızca izin kısıtı)'} · ${perms.join(', ')}${ownerSameAsUser && userPw ? ' · sahip parolası = açılış parolası' : ''}`;
    $('result-warn').hidden = !(res.code === 3);
    $('result').classList.add('is-active');
    $('download').focus();
  } catch (err) {
    setProgress($('progress'), null);
    showError($('error'), err && err.message ? err.message : mapError(-1, String(err)));
  } finally {
    $('run').disabled = false;
  }
});

$('download').addEventListener('click', () => {
  if (result) downloadBlob(result.blob, result.name);
});
