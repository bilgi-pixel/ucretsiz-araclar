// PWA kaydı ve "Uygulama olarak kur" düğmesi. Reklam/izleme ile ilgisi yok; ağ isteği yalnızca
// sitenin kendi sw.js dosyasına gider. Masaüstü kurulumu = tarayıcının yerleşik PWA kurulumu.
const root = new URL('../../', import.meta.url);

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register(new URL('sw.js', root), { scope: root.pathname }).catch(() => {});
}

let deferredPrompt = null;
const buttons = () => Array.from(document.querySelectorAll('[data-pwa-install]'));
const installedNote = () => Array.from(document.querySelectorAll('[data-pwa-installed]'));

const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

function refresh() {
  const standalone = isStandalone();
  buttons().forEach((b) => { b.hidden = standalone || !deferredPrompt; });
  installedNote().forEach((n) => { n.hidden = !standalone; });
  document.querySelectorAll('[data-pwa-manual]').forEach((n) => { n.hidden = standalone || !!deferredPrompt; });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  refresh();
});

window.addEventListener('appinstalled', () => { deferredPrompt = null; refresh(); });

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-pwa-install]');
  if (!btn || !deferredPrompt) return;
  const p = deferredPrompt; deferredPrompt = null;
  p.prompt();
  try { await p.userChoice; } catch (_) { /* kullanıcı vazgeçti */ }
  refresh();
});

refresh();
