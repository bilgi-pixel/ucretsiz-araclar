// Telefon Numarası Biçimlendirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.numara ?? '').trim();
    if (ham === '') h.err('"Telefon numarası" alanına bir numara yazın (örn. 0532 123 45 67).');
    if (/[^\d\s+().\-/]/.test(ham)) h.err('Numarada yalnızca rakam, boşluk, tire, nokta, parantez ve baştaki + işareti bulunabilir.');
    if (ham.indexOf('+') > 0 || (ham.match(/\+/g) || []).length > 1) h.err('+ işareti yalnızca numaranın en başında bulunabilir.');
    const arti = ham.startsWith('+');
    let d = ham.replace(/\D/g, '');
    if (arti) {
      if (!d.startsWith('90')) h.err('Bu araç yalnızca Türkiye (+90) numaralarını biçimlendirir.');
      d = d.slice(2);
    } else if (d.startsWith('0090')) d = d.slice(4);
    else if (d.length === 12 && d.startsWith('90')) d = d.slice(2);
    else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
    if (d.length !== 10) h.err(`Numara, alan kodu dahil 10 haneli olmalı (şu an ${d.length} hane). Alan kodunu ya da operatör kodunu eksiksiz yazın.`);
    if (d[0] === '0' || d[0] === '1') h.err('Alan kodu 0 ya da 1 ile başlayamaz. Numarayı kontrol edin.');
    const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6, 8), e = d.slice(8, 10);
    const tur = d[0] === '5' ? 'Cep telefonu (5XX)' : (d[0] === '2' || d[0] === '3' || d[0] === '4') ? 'Sabit hat (coğrafi alan kodu)' : d[0] === '8' ? 'Özel hizmet numarası (8XX)' : 'Diğer numara grubu';
    const ulus = `+90 ${a} ${b} ${c} ${e}`;
    const ulusal = `0 (${a}) ${b} ${c} ${e}`;
    const bosluk = `0${a} ${b} ${c} ${e}`;
    const e164 = `+90${d}`;
    const ana = v.bicim === 'ulusal' ? ulusal : v.bicim === 'bosluk' ? bosluk : v.bicim === 'e164' ? e164 : ulus;
    return {
      rows: [
        ['Biçimlendirilmiş numara', ana],
        ['Uluslararası', ulus],
        ['Ulusal', ulusal],
        ['Ulusal sade', bosluk],
        ['E.164', e164],
        ['tel: bağlantısı', `tel:${e164}`],
        ['Alan / operatör kodu', a],
        ['Numara türü', tur],
      ],
      note: 'Araç yalnızca yazımı düzenler; numaranın kullanımda olup olmadığını ya da kime ait olduğunu denetlemez.',
    };
  }
