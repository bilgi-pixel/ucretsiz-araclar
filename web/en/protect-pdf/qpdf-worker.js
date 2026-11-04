// qpdf-wasm çalıştırıcısı (Web Worker). Ana iş parçacığını kilitlemeden qpdf CLI'yi çalıştırır.
// Yalnızca aynı origin'deki vendor/ dosyalarını yükler; hiçbir veri ağa çıkmaz.
// Her iş için yeni bir worker açılır (Emscripten çalışma zamanı tek kullanımlıktır).
const VENDOR = new URL('../../vendor/@jspawn/qpdf-wasm@0.0.2/', self.location.href).href;
importScripts(`${VENDOR}qpdf.js`);

const decoder = new TextDecoder('utf-8');

self.onmessage = async (e) => {
  const { args, input, wantOutput } = e.data;
  const outBytes = [];
  const errBytes = [];
  const text = (arr) => decoder.decode(new Uint8Array(arr));
  try {
    self.postMessage({ type: 'status', stage: 'load' });
    const mod = await self.Module({
      noInitialRun: true,
      noFSInit: true,
      locateFile: (file) => `${VENDOR}${file}`,
      // stdout/stderr'ı yakala: qpdf hata metinlerini buradan okuyoruz.
      preRun: [(m) => m.FS.init(null, (c) => { outBytes.push(c); }, (c) => { errBytes.push(c); })],
    });
    self.postMessage({ type: 'status', stage: 'run' });
    mod.FS.writeFile('/in.pdf', new Uint8Array(input));
    const code = mod.callMain(args);
    let bytes = null;
    if (wantOutput && (code === 0 || code === 3)) {
      try { bytes = mod.FS.readFile('/out.pdf'); } catch (_) { bytes = null; }
    }
    const msg = { type: 'done', code, stdout: text(outBytes), stderr: text(errBytes), bytes };
    self.postMessage(msg, bytes ? [bytes.buffer] : []);
  } catch (ex) {
    self.postMessage({ type: 'done', code: -1, stdout: text(outBytes), stderr: `${text(errBytes)}\n${String(ex && ex.message || ex)}`, bytes: null });
  }
};
