// PDF Şifresini Kaldır (EN: Unlock PDF) — bilinen parolayla açılan PDF'in şifresiz kopyasını üretir (qpdf WebAssembly).
// Parola kırmaz; yanlış parolada Türkçe hata verir. Tüm işlem tarayıcıda, Web Worker içinde; dosya ve parola ağa çıkmaz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const WORKER_URL = new URL('./qpdf-worker.js', import.meta.url).href;

let current = null; // { file, bytes, encrypted }
let result = null;  // { blob, name }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => setFile(f) });

async function setFile(file) {
  reset(false);
  if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
    showError($('error'), `"${file.name}" is not a PDF. This tool only unlocks .pdf files; for password-protected ZIP or Word files use the program that created them.`);
    return;
  }
  const bytes = await file.arrayBuffer();
  const head = new TextDecoder('latin1').decode(new Uint8Array(bytes, 0, Math.min(1024, bytes.byteLength)));
  const tail = new TextDecoder('latin1').decode(new Uint8Array(bytes, Math.max(0, bytes.byteLength - 65536)));
  if (!/%PDF-/.test(head) || !/startxref|trailer|\/Root/.test(tail)) {
    showError($('error'), `"${file.name}" is damaged or is not a valid PDF. Check that it opens in a PDF viewer, then select it again.`);
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
    $('warning').textContent = `This file is ${formatBytes(file.size)}. Files over 50 MB can take a long time and a phone may run out of memory. Use a computer if you can.`;
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
  $('pw-toggle').textContent = show ? 'Hide' : 'Show';
  $('pw-toggle').setAttribute('aria-pressed', show ? 'true' : 'false');
});

$('pw').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); $('run').click(); } });

/** qpdf çıktısını İngilizce, çözüm öneren mesaja çevirir. */
function mapError(code, stderr, hadPassword) {
  const m = String(stderr || '').replace(/^[^:\n]*:\s*/gm, '').replace(/\/in\.pdf:\s*/g, '').trim();
  if (/invalid password/i.test(m)) {
    return hadPassword
      ? 'Wrong password. Check upper and lower case, your keyboard layout and Caps Lock, and confirm the password with the person who sent you the document. This tool cannot guess or crack a password you do not know.'
      : 'This PDF needs a password to open. Enter the password the sender gave you and try again; it cannot be opened without it.';
  }
  if (/startxref|trailer|xref|not a PDF|damaged|unable to find|expected|offset|EOF|unsupported/i.test(m)) return 'This file is damaged or is not a valid PDF. Check that it opens in a PDF viewer; if it does not, ask the sender to send it again.';
  if (/memory|allocation|out of bounds/i.test(m)) return 'The file is too large for your browser memory. Try a smaller file or use a computer.';
  return `Something unexpected went wrong (code ${code}). Reload the page and try again.${m ? ` Details: ${m.split('\n')[0]}` : ''}`;
}

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
  const pw = $('pw').value;
  if (!pw && current.encrypted) {
    showError($('error'), 'Enter the password. This file is encrypted; if you do not know the password, ask the person who sent it. The tool does not crack passwords, it only opens a file with a password you already have and saves an unlocked copy.');
    $('pw').focus();
    return;
  }
  const args = [];
  if (pw) args.push(`--password=${pw}`);
  args.push('--decrypt', '--', '/in.pdf', '/out.pdf');

  $('run').disabled = true;
  setProgress($('progress'), 10, 'Loading the engine…');
  await tick();
  try {
    const input = current.bytes.slice(0);
    const res = await runQpdf(args, input, (stage) => {
      if (stage === 'run') setProgress($('progress'), 55, 'Checking the password and removing the encryption…');
    });
    if (res.code !== 0 && res.code !== 3 || !res.bytes) {
      throw new Error(mapError(res.code, res.stderr, !!pw));
    }
    setProgress($('progress'), 100, 'Done');
    const name = `${baseName(current.file.name)}-unlocked.pdf`;
    result = { blob: new Blob([res.bytes], { type: 'application/pdf' }), name };
    $('result-info').textContent = current.encrypted
      ? `${name} · ${formatBytes(result.blob.size)} · open password and permission limits removed`
      : `${name} · ${formatBytes(result.blob.size)} · the file was not encrypted; a clean copy was saved`;
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
