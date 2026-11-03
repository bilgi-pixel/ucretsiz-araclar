// AdSense yükleyici. Yalnızca web sürümünde kullanılır; masaüstü (Tauri) derlemesine girmez.
// window.BA_ADSENSE_CLIENT boşsa (geliştirme / onay öncesi) her .ba-ad alanı kesikli kutu olarak
// çizilir ve ağ isteği yapılmaz. Dolu ise ("ca-pub-…") adsbygoogle bir kez yüklenir.
// Politika: reklam alanları yalnızca HTML'de işaretli yerlerde (araç kutusu altı, içerik ortası,
// sayfa sonu). Auto ads bilinçli olarak KAPALI — indirme butonu yanına reklam basabilir.
(function () {
  const client = (window.BA_ADSENSE_CLIENT || '').trim();
  const slots = document.querySelectorAll('.ba-ad');
  if (!slots.length) return;

  if (!client) {
    slots.forEach((el) => {
      el.innerHTML = '<span class="ba-ad-label">Reklam</span><div class="ba-ad-placeholder">Reklam alanı</div>';
    });
    return;
  }

  const s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  document.head.appendChild(s);

  slots.forEach((el) => {
    const slot = el.dataset.slot || '';
    el.innerHTML = '<span class="ba-ad-label">Reklam</span>';
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', client);
    if (slot) ins.setAttribute('data-ad-slot', slot);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    el.appendChild(ins);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
})();
