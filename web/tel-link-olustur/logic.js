// Telefon ve SMS Bağlantısı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.numara ?? '').trim();
    if (!ham) h.err('"Telefon numarası" alanını doldurun.');
    if (!/^[+\d\s().\-/]+$/.test(ham)) h.err('Telefon numarası yalnızca rakam, boşluk, parantez, tire ve baştaki + işaretini içerebilir.');
    if (ham.indexOf('+') > 0 || ham.split('+').length > 2) h.err('Artı işareti yalnızca numaranın en başında bulunabilir.');
    let d = ham.replace(/\D/g, '');
    const arti = ham.startsWith('+');
    let numara, gorunen;
    if (v.bicim === 'yerel') {
      if (d.length < 3 || d.length > 15) h.err('Numara 3 ile 15 rakam arasında olmalı.');
      numara = (arti ? '+' : '') + d;
      gorunen = numara;
    } else {
      const ulke = String(v.ulke ?? '').replace(/\D/g, '');
      let tam;
      if (arti) tam = d;
      else if (d.startsWith('00')) tam = d.slice(2);
      else {
        if (!/^[1-9]\d{0,2}$/.test(ulke)) h.err('"Ülke kodu" 1–3 rakam olmalı (Türkiye için 90).');
        tam = ulke + (d.startsWith('0') ? d.slice(1) : d);
      }
      if (tam.length < 8 || tam.length > 15) h.err('Uluslararası numara ülke koduyla birlikte 8–15 rakam olmalı. Kısa numaralar için "Olduğu gibi" biçimini seçin.');
      if (tam.startsWith('0')) h.err('Ülke kodu 0 ile başlayamaz; numarayı kontrol edin.');
      numara = '+' + tam;
      gorunen = /^90\d{10}$/.test(tam) ? `+90 ${tam.slice(2, 5)} ${tam.slice(5, 8)} ${tam.slice(8, 10)} ${tam.slice(10)}` : numara;
    }
    const mesaj = String(v.mesaj ?? '').trim();
    let url = (v.tur === 'sms' ? 'sms:' : 'tel:') + numara;
    if (v.tur === 'sms' && mesaj) url += '?body=' + encodeURIComponent(mesaj).replace(/'/g, '%27');
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const yazi = String(v.metin ?? '').trim() || gorunen;
    return {
      rows: [
        ['Bağlantı', url],
        ['Numara', numara],
        ['Okunaklı yazım', gorunen],
      ],
      text: `<a href="${escH(url)}">${escH(yazi)}</a>`,
      note: v.tur === 'tel' && mesaj ? 'SMS metni yalnızca SMS bağlantısında kullanılır; arama bağlantısında yok sayıldı.' : 'Alttaki kutuda sayfanıza yapıştırabileceğiniz HTML kodu yer alır.',
    };
  }
