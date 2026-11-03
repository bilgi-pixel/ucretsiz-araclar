// PDF Şifresini Kaldır — bilinen parolayla açılan PDF'in şifresiz kopyasını üretir (qpdf WebAssembly).
// Parola kırmaz; yanlış parolada Türkçe hata verir. Tüm işlem tarayıcıda, Web Worker içinde; dosya ve parola ağa çıkmaz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const WORKER_URL = new URL('./qpdf-worker.js', import.meta.url).href;

let current = null; // { file, bytes, encrypted }
let result = null;  // { blob, name }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => setFile(f) });

async function setFile(file) {
  reset(false);
  if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
    showError($('error'), `"${file.name}" bir PDF değil. Bu araç yalnızca .pdf dosyalarının şifresini kaldırır; parolalı ZIP ya da Word dosyaları için ilgili programı kullanın.`);
    return;
  }
  const bytes = await file.arrayBuffer();
  const head = new TextDecoder('latin1').decode(new Uint8Array(bytes, 0, Math.min(1024, bytes.byteLength)));
  const tail = new TextDecoder('latin1').decode(new Uint8Array(bytes, Math.max(0, bytes.byteLength - 65536)));
  if (!/%PDF-/.test(head) || !/startxref|trailer|\/Root/.test(tail)) {
    showError($('error'), `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF görüntüleyicide açabildiğinizi kontrol edip yeniden seçin.`);
    return;
  }
  const encrypted = hasEncryptDict(bytes);
  current = { file, bytes, encrypted };
  $('file-name').textContent = file.name;
  $('file-meta').textContent = formatBytes(file.size);
  $('file-box').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  $('not-encrypted').hidden = encrypted;
  if (file.size >= BIG_FILE) {
    $('warning').textContent = `Dosya ${formatBytes(file.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
    $('warning').classList.add('is-active');
  }
  $('pw').focus();
}

/** Dosyanın sonundaki trailer bölümünde /Encrypt var mı (hızlı ön kontrol; kesin karar qpdf'in). */
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
    $('not-encrypted').hidden = true;
    $('pw').value = '';
  }
}

$('clear').addEventListener('click', () => reset(true));

$('pw-toggle').addEventListener('click', () => {
  const input = $('pw');
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  $('pw-toggle').textContent = show ? 'Gizle' : 'Göster';
  $('pw-toggle').setAttribute('aria-pressed', show ? 'true' : 'false');
});

$('pw').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); $('run').click(); } });

/** qpdf çıktısını Türkçe, çözüm öneren mesaja çevirir. */
function mapError(code, stderr, hadPassword) {
  const m = String(stderr || '').replace(/^[^:\n]*:\s*/gm, '').replace(/\/in\.pdf:\s*/g, '').trim();
  if (/invalid password/i.test(m)) {
    return hadPassword
      ? 'Parola yanlış. Büyük/küçük harf, klavye dili (Türkçe Q/F) ve Caps Lock durumunu kontrol edin; parolayı belgeyi size gönderen kişiden doğrulayın. Bu araç bilmediğiniz parolayı kıramaz.'
      : 'Bu PDF açılış parolası istiyor. Belgeyi size gönderen kişiden aldığınız parolayı yazıp tekrar deneyin; parolasız açılması mümkün değildir.';
  }
  if (/startxref|trailer|xref|not a PDF|damaged|unable to find|expected|offset|EOF|unsupported/i.test(m)) return 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF görüntüleyicide açabildiğinizi kontrol edin; açılmıyorsa gönderen kişiden yeniden isteyin.';
  if (/memory|allocation|out of bounds/i.test(m)) return 'Dosya tarayıcı belleği için fazla büyük. Daha küçük bir dosyayla ya da bilgisayarda deneyin.';
  return `İşlem sırasında beklenmeyen bir hata oluştu (kod ${code}). Sayfayı yenileyip tekrar deneyin.${m ? ` Ayrıntı: ${m.split('\n')[0]}` : ''}`;
}

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
  const pw = $('pw').value;
  if (!pw && current.encrypted) {
    showError($('error'), 'Parolayı yazın. Bu dosya şifreli; parolayı bilmiyorsanız belgeyi gönderen kişiden isteyin. Araç parola kırmaz, yalnızca bildiğiniz parolayla açıp şifresiz kopya üretir.');
    $('pw').focus();
    return;
  }
  const args = [];
  if (pw) args.push(`--password=${pw}`);
  args.push('--decrypt', '--', '/in.pdf', '/out.pdf');

  $('run').disabled = true;
  setProgress($('progress'), 10, 'Motor yükleniyor…');
  await tick();
  try {
    const input = current.bytes.slice(0);
    const res = await runQpdf(args, input, (stage) => {
      if (stage === 'run') setProgress($('progress'), 55, 'Parola doğrulanıyor ve şifre kaldırılıyor…');
    });
    if (res.code !== 0 && res.code !== 3 || !res.bytes) {
      throw new Error(mapError(res.code, res.stderr, !!pw));
    }
    setProgress($('progress'), 100, 'Tamamlandı');
    const name = `${baseName(current.file.name)}-sifresiz.pdf`;
    result = { blob: new Blob([res.bytes], { type: 'application/pdf' }), name };
    $('result-info').textContent = current.encrypted
      ? `${name} · ${formatBytes(result.blob.size)} · açılış parolası ve izin kısıtları kaldırıldı`
      : `${name} · ${formatBytes(result.blob.size)} · dosya zaten şifresizdi; temiz bir kopya üretildi`;
    $('result-warn').hidden = !(res.code === 3);
    $('result').classList.add('is-active');
    $('download').focus();
  } catch (err) {
    setProgress($('progress'), null);
    showError($('error'), err && err.message ? err.message : mapError(-1, String(err), !!pw));
  } finally {
    $('run').disabled = false;
  }
});

$('download').addEventListener('click', () => {
  if (result) downloadBlob(result.blob, result.name);
});
