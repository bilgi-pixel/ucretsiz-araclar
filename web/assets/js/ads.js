// AdSense yükleyici. Yalnızca web sürümünde kullanılır; masaüstü (Tauri) derlemesine girmez.
// window.BA_ADSENSE_CLIENT boşsa (geliştirme / onay öncesi) her .ba-ad alanı kesikli kutu olarak
// çizilir ve ağ isteği yapılmaz. Dolu ise ("ca-pub-…") adsbygoogle bir kez yüklenir.
// Politika: reklam alanları yalnızca HTML'de işaretli yerlerde (araç kutusu altı, içerik ortası,
// sayfa sonu). Auto ads bilinçli olarak KAPALI — indirme butonu yanına reklam basabilir.
(function () {
  // Yayıncı kimliği yalnızca onaylı alan adında (bilisimajans.com ve alt alan adları) kullanılır;
  // github.io önizlemesi, yerel test ve masaüstü paketinde reklam isteği yapılmaz.
  const onApprovedHost = /(^|\.)bilisimajans\.com$/.test(location.hostname);
  const client = (window.BA_ADSENSE_CLIENT || (onApprovedHost ? 'ca-pub-5734060206675377' : '')).trim();
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

  // Sayfalardaki data-slot değeri "<araç>-a|b|c" biçimindedir; harf, AdSense'te oluşturulan
  // görüntülü reklam biriminin kimliğine eşlenir (A: araç kutusu altı, B: içerik ortası, C: sayfa sonu).
  const UNITS = { a: '2025098263', b: '4120953573', c: '6555545229' };
  slots.forEach((el) => {
    const raw = el.dataset.slot || '';
    const key = (raw.match(/-([abc])$/) || [])[1] || (/^\d+$/.test(raw) ? raw : '');
    const slot = UNITS[key] || key;
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
