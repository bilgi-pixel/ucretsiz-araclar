// Hareket katmanı — bilisimajans.com ile aynı dil: başlık kelimeleri sırayla açılır,
// daktilo satırı döner, bölümler kaydırıldıkça sahneye girer. Ağ isteği yok, veri toplanmaz.
// prefers-reduced-motion: reduce → kelime ayırma ve daktilo kapalı, her şey anında görünür.

const RM = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const root = document.documentElement;
root.classList.add('ba-js');
// Sekme arka planda açıldıysa hero animasyonları öne gelince başlasın (head betiği görünürse zaten ekledi).
if (!root.classList.contains('ba-in')) {
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') root.classList.add('ba-in'); }, { once: true });
}

/* 1. Hero başlığı: kelimeleri <span class="w" style="--i"> ile sar; .ba-grad gibi öğeler tek birim kalır. */
function splitWords(h) {
  const text = h.textContent.replace(/\s+/g, ' ').trim();
  let i = 0;
  const wrap = (part) => {
    const s = document.createElement('span');
    s.className = 'w';
    s.style.setProperty('--i', String(i++));
    s.textContent = part;
    return s;
  };
  for (const node of Array.from(h.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part) continue;
        frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(' ') : wrap(part));
      }
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
      node.classList.add('w');
      node.style.setProperty('--i', String(i++));
    }
  }
  h.setAttribute('aria-label', text); // ekran okuyucu başlığı tek parça okusun
  h.classList.add('is-split');
}

/* 2. Daktilo: data-words="a|b|c" — yaz, bekle, sil, sıradakine geç. */
function typewriter(el) {
  const words = (el.dataset.words || '').split('|').map((w) => w.trim()).filter(Boolean);
  if (words.length < 2) return;
  let wi = 0; let ci = words[0].length; let deleting = true;
  const step = () => {
    const w = words[wi];
    if (deleting) {
      ci--;
      el.textContent = w.slice(0, ci);
      if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; }
      setTimeout(step, ci <= 0 ? 320 : 28);
    } else {
      ci++;
      el.textContent = words[wi].slice(0, ci);
      if (ci >= words[wi].length) { deleting = true; setTimeout(step, 2000); } else setTimeout(step, 52);
    }
  };
  setTimeout(step, 2400);
}

/* 3. Kaydırmada açılış: .ba-rev + --i (aynı ebeveyn içindeki sıra) → görünür olunca .is-in */
const REVEAL = [
  'main h2:not(.visually-hidden)', '.ba-section-title span', '.ba-card', '.ba-how > div', '.ba-steps li',
  '.ba-faq details', '.ba-note', '.ba-related li', '.ba-cta', '.ba-content p', '.ba-content ul', '.ba-content ol:not(.ba-steps)',
];
function setupReveal() {
  const els = document.querySelectorAll(REVEAL.join(','));
  const counters = new Map();
  els.forEach((el) => {
    if (el.closest('.ba-hero, .ba-footer, .ba-ad') || el.parentElement.closest('.ba-rev')) return; // iç içe açılış yok
    const parent = el.parentElement;
    const n = counters.get(parent) ?? 0;
    counters.set(parent, n + 1);
    el.classList.add('ba-rev');
    el.style.setProperty('--i', String(Math.min(n, 8)));
  });
  const show = (el) => {
    el.classList.add('is-in');
    const steps = el.closest('.ba-steps');
    if (steps) steps.classList.add('is-in');
  };
  const targets = document.querySelectorAll('.ba-rev');
  if (RM || !('IntersectionObserver' in window)) { targets.forEach(show); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach((el) => io.observe(el));
}

if (!RM) {
  const h1 = document.querySelector('.ba-hero h1');
  if (h1) splitWords(h1);
  document.querySelectorAll('.ba-type[data-words]').forEach(typewriter);
}
setupReveal();

/* 4. Araç ikonları: her karta döngüsel bir neşe türü (ana sitedeki .ba-fx kartları gibi). Bağlantıya göre sabit seçim. */
const FX = ['bob', 'wiggle', 'pulse', 'swing', 'jump', 'spin'];
document.querySelectorAll('.ba-card').forEach((card, i) => {
  const key = card.querySelector('a')?.getAttribute('href') || String(i);
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  card.dataset.fx = FX[h % FX.length];
});

/* 5. Hero şemasındaki düğümler: kategori sekmesi gibi filtreler (hub.js hash'i dinler); ardından listeye kaydır. */
document.querySelectorAll('a.bd-link').forEach((a) => {
  a.addEventListener('click', () => {
    setTimeout(() => {
      const target = document.querySelector('[data-category]:not([hidden])');
      if (target) target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
    }, 60);
  });
});

/* 6. Menü ikonları: üst menü, kategori sekmeleri, kırıntı, altbilgi, ilgili araçlar ve rehber araç listesi.
   Seçim JSON haritasından: önce bağlantı adresi (slug/çapa), sonra metin anahtarı; eşleşme yoksa ok. */
const ICON_PATHS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  pdf: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h4"/>',
  convert: '<path d="M4 7h11m0 0-3-3m3 3-3 3"/><path d="M20 17H9m0 0 3-3m-3 3 3 3"/>',
  file: '<path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2m2 0h2m2 0h0M8 15h2m2 0h2m2 0h0M8 18h2m2 0h4"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
  game: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16" cy="11.5" r=".8"/><circle cx="18.5" cy="13.5" r=".8"/>',
  desktop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/>',
  zip: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M10 7h2M10 10h2M10 13h2M10 16h2"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v3M17 20h4M14 20h1"/>',
  key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9m-3 0v3m-3-3v2"/>',
  text: '<path d="M4 6h16M4 12h10M4 18h7"/>',
  word: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="m8 11 1.5 7 2-5 2 5L15 11"/>',
  shrink: '<path d="M4 14v6h6M20 10V4h-6"/><path d="m4 20 7-7M20 4l-7 7"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9.5 12 2 2 3.5-4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 7l9 6 9-6"/>',
  github: '<path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.44v-1.6c-2.5.55-3.03-1.07-3.03-1.07-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.07 1.38.93 1.38.93.8 1.38 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.78.93-2.41-.1-.23-.4-1.15.09-2.4 0 0 .76-.24 2.48.92a8.6 8.6 0 0 1 4.52 0c1.72-1.16 2.48-.92 2.48-.92.49 1.25.18 2.17.09 2.4.58.63.93 1.43.93 2.41 0 3.46-2.1 4.22-4.11 4.44.32.28.61.82.61 1.66v2.46c0 .24.16.52.62.44A9 9 0 0 0 12 3z"/>',
  home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/>',
  arrow: '<path d="M5 12h14m0 0-5-5m5 5-5 5"/>',
};
/* Anahtar → ikon. Adreste veya metinde ilk eşleşen kazanır; sıra önemlidir. */
const ICON_MAP = [
  ['#pdf', 'pdf'], ['#donustur', 'convert'], ['#dosya', 'file'], ['#hesapla', 'calc'], ['#rehber', 'book'], ['#oyun', 'game'], ['#tumu', 'grid'],
  ['bilisimajans.com/iletisim', 'mail'], ['bilisimajans.com', 'globe'], ['github.com', 'github'],
  ['/indir/', 'desktop'], ['indir/', 'desktop'], ['hakkimizda', 'info'], ['gizlilik', 'shield'],
  ['pdf-kucult', 'shrink'], ['resim-kucult', 'shrink'], ['word', 'word'], ['pdf', 'pdf'], ['resim', 'image'], ['foto', 'image'], ['gorsel', 'image'],
  ['zip', 'zip'], ['qr', 'qr'], ['sifre', 'key'], ['parola', 'key'], ['metin', 'text'], ['yazi', 'text'], ['hesap', 'calc'], ['maas', 'calc'], ['rehber', 'book'], ['oyun', 'game'],
  ['tüm araçlar', 'grid'], ['all tools', 'grid'], ['araçlar', 'grid'], ['ana sayfa', 'home'],
  ['dönüştür', 'convert'], ['dosya', 'file'], ['hesapla', 'calc'], ['masaüstü', 'desktop'], ['iletişim', 'mail'], ['hakkımızda', 'info'], ['gizlilik', 'shield'],
];
function pickIcon(a) {
  const href = (a.getAttribute('href') || '').toLowerCase();
  const text = a.textContent.trim().toLocaleLowerCase('tr');
  for (const [key, icon] of ICON_MAP) if (href.includes(key) || text.includes(key)) return icon;
  return 'arrow';
}
function iconEl(name) {
  const s = document.createElement('span');
  s.className = 'ba-ic';
  s.setAttribute('aria-hidden', 'true');
  s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + ICON_PATHS[name] + '</svg>';
  return s;
}
const MENU_LINKS = '.ba-nav a, .ba-tabs a, .ba-crumb a, .ba-footer ul a, .ba-related a, .rh-tools ul a';
document.querySelectorAll(MENU_LINKS).forEach((a, i) => {
  if (a.querySelector('.ba-ic')) return;
  a.insertBefore(iconEl(pickIcon(a)), a.firstChild);
  a.style.setProperty('--i', String(i % 12));
});
