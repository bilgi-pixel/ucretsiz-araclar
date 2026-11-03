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
