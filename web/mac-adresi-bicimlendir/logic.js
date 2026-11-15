// MAC Adresi Biçimlendirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.mac ?? '').trim();
    if (t === '') h.err('"MAC adresi" alanını doldurun.');
    if (/[^0-9a-fA-F:\-.\s]/.test(t)) h.err('MAC adresinde yalnızca 0–9 ve A–F karakterleri ile iki nokta, tire, nokta ya da boşluk bulunabilir.');
    let hex;
    const gr = t.split(/[:\-\s]+/).filter(Boolean);
    if (gr.length === 6 && gr.every((g) => /^[0-9a-fA-F]{1,2}$/.test(g))) hex = gr.map((g) => g.padStart(2, '0')).join('');
    else hex = t.replace(/[:\-.\s]/g, '');
    if (hex.length !== 12) h.err('MAC adresi 12 onaltılık basamaktan (6 bayt) oluşmalı; yazdığınız değerde ' + hex.length + ' basamak var.');
    hex = v.harf === 'kucuk' ? hex.toLowerCase() : hex.toUpperCase();
    const bayt = hex.match(/.{2}/g);
    const ilk = parseInt(bayt[0], 16);
    const yayin = hex.toLowerCase() === 'ffffffffffff';
    const tur = yayin ? 'Genel yayın (broadcast)' : (ilk & 1) ? 'Çoklu yayın (multicast)' : 'Tekil (unicast)';
    const yonetim = yayin ? 'Uygulanmaz (genel yayın adresi)' : (ilk & 2) ? 'Yerel yönetimli' : 'Evrensel (üretici atamalı)';
    return {
      rows: [
        ['İki nokta ile', bayt.join(':')],
        ['Tire ile', bayt.join('-')],
        ['Noktalı üçlü grup', hex.match(/.{4}/g).join('.')],
        ['Ayraçsız', hex],
        ['Üretici öneki (OUI)', bayt.slice(0, 3).join(':')],
        ['Adres türü', tur],
        ['Yönetim türü', yonetim],
        ['İlk baytın ikili yazımı', ilk.toString(2).padStart(8, '0')],
      ],
      note: 'Adres türü ilk baytın en sağdaki bitinden, yönetim türü sağdan ikinci bitinden okunur. Üretici adı sorgulanmaz; araç çevrimdışı çalışır.',
    };
  }
