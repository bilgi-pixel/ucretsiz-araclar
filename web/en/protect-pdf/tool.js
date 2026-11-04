// PDF'e Şifre Ekle (EN: Protect PDF) — qpdf (WebAssembly) ile AES-256 / AES-128 parola koruması.
// Tüm işlem tarayıcıda, bir Web Worker içinde yapılır; dosya ve parola hiçbir sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../../assets/js/ba.js';

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
    showError($('error'), `"${file.name}" is not a PDF. Only .pdf files can be protected; convert a Word document to PDF first.`);
    return;
  }
  const bytes = await file.arrayBuffer();
  const head = new TextDecoder('latin1').decode(new Uint8Array(bytes, 0, Math.min(1024, bytes.byteLength)));
  const tail = new TextDecoder('latin1').decode(new Uint8Array(bytes, Math.max(0, bytes.byteLength - 65536)));
  if (!/%PDF-/.test(head) || !/startxref|trailer|\/Root/.test(tail)) {
    showError($('error'), `"${file.name}" is damaged or is not a valid PDF. Check that it opens in a PDF viewer, then select it again.`);
    return;
  }
  if (hasEncryptDict(bytes)) {
    showError($('error'), `"${file.name}" already looks password-protected. To change the password, first remove it with the Unlock PDF tool (you need the current password), then come back here and set a new one.`);
    return;
  }
  current = { file, bytes };
  $('file-name').textContent = file.name;
  $('file-meta').textContent = formatBytes(file.size);
  $('file-box').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  if (file.size >= BIG_FILE) {
    $('warning').textContent = `This file is ${formatBytes(file.size)}. Encrypting files over 50 MB can take a long time and a phone may run out of memory. Use a computer if you can.`;
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
    btn.textContent = show ? 'Hide' : 'Show';
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
  el.textContent = level === 'weak' ? 'Weak password: use at least 8 characters and mix letters and numbers.' : level === 'mid' ? 'Fair: 12 or more characters and a symbol would make it stronger.' : 'Strong password.';
}
$('pw-user').addEventListener('input', updateStrength);

/** qpdf çıktısını İngilizce, çözüm öneren mesaja çevirir. */
function mapError(code, stderr) {
  const m = String(stderr || '').replace(/^[^:\n]*:\s*/gm, '').replace(/\/in\.pdf:\s*/g, '').trim();
  if (/invalid password/i.test(m)) return 'This PDF is already password-protected. Remove the current password with the Unlock PDF tool first, then try again with the new password.';
  if (/startxref|trailer|xref|not a PDF|damaged|unable to find|expected|offset|EOF/i.test(m)) return 'This file is damaged or is not a valid PDF. Check that it opens in a PDF viewer; if it does, run it through the Compress PDF tool first and try again.';
  if (/memory|allocation|out of bounds/i.test(m)) return 'The file is too large for your browser memory. Try a smaller file or use a computer.';
  return `Something unexpected went wrong (code ${code}). Reload the page and try again.${m ? ` Details: ${m.split('\n')[0]}` : ''}`;
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
    w.onerror = (e) => { w.terminate(); reject(new Error(e.message || 'Worker error')); };
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
    showError($('error'), 'Enter a password. Fill in "Open password" if the document should ask for a password when it is opened, or "Owner password" if you only want to restrict printing and copying.');
    $('pw-user').focus();
    return;
  }
  if (userPw && userPw.length < 4) {
    showError($('error'), 'The open password must be at least 4 characters long; 8 or more is recommended for real security.');
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
  setProgress($('progress'), 10, 'Loading the encryption engine…');
  await tick();
  try {
    const input = current.bytes.slice(0); // worker'a devredilecek kopya; orijinal kalsın
    const res = await runQpdf(args, input, (stage) => {
      if (stage === 'run') setProgress($('progress'), 55, `Encrypting (AES-${bits})…`);
    });
    if (res.code !== 0 && res.code !== 3 || !res.bytes) {
      throw new Error(mapError(res.code, res.stderr));
    }
    setProgress($('progress'), 100, 'Done');
    const name = `${baseName(current.file.name)}-protected.pdf`;
    result = { blob: new Blob([res.bytes], { type: 'application/pdf' }), name };
    const perms = [];
    perms.push($('perm-print').checked ? 'printing allowed' : 'printing blocked');
    perms.push($('perm-copy').checked ? 'copying allowed' : 'copying blocked');
    perms.push($('perm-modify').checked ? 'editing allowed' : 'editing blocked');
    $('result-info').textContent = `${name} · ${formatBytes(result.blob.size)} · AES-${bits}${userPw ? ' · open password set' : ' · no open password (permission limits only)'} · ${perms.join(', ')}${ownerSameAsUser && userPw ? ' · owner password = open password' : ''}`;
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
