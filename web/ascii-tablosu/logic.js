// ASCII Tablosu Sorgulama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.girdi ?? '');
    const D = [
      ['NUL', 'Boş karakter'], ['SOH', 'Başlık başlangıcı'], ['STX', 'Metin başlangıcı'], ['ETX', 'Metin sonu'],
      ['EOT', 'İletim sonu'], ['ENQ', 'Sorgu'], ['ACK', 'Onay'], ['BEL', 'Zil'],
      ['BS', 'Geri silme'], ['HT', 'Yatay sekme (Tab)'], ['LF', 'Satır besleme (yeni satır)'], ['VT', 'Dikey sekme'],
      ['FF', 'Sayfa besleme'], ['CR', 'Satır başı'], ['SO', 'Dışa kaydırma'], ['SI', 'İçe kaydırma'],
      ['DLE', 'Veri bağlantısı kaçışı'], ['DC1', 'Aygıt denetimi 1 (XON)'], ['DC2', 'Aygıt denetimi 2'], ['DC3', 'Aygıt denetimi 3 (XOFF)'],
      ['DC4', 'Aygıt denetimi 4'], ['NAK', 'Olumsuz onay'], ['SYN', 'Eşzamanlama'], ['ETB', 'İletim bloğu sonu'],
      ['CAN', 'İptal'], ['EM', 'Ortam sonu'], ['SUB', 'Yerine koyma'], ['ESC', 'Kaçış'],
      ['FS', 'Dosya ayırıcı'], ['GS', 'Grup ayırıcı'], ['RS', 'Kayıt ayırıcı'], ['US', 'Birim ayırıcı'],
    ];
    const simgeAd = {
      33: 'Ünlem işareti', 34: 'Çift tırnak', 35: 'Diyez (kare) işareti', 36: 'Dolar işareti', 37: 'Yüzde işareti', 38: 'Ve işareti (ampersand)',
      39: 'Kesme işareti (tek tırnak)', 40: 'Açma parantezi', 41: 'Kapama parantezi', 42: 'Yıldız', 43: 'Artı', 44: 'Virgül', 45: 'Kısa çizgi (eksi)',
      46: 'Nokta', 47: 'Eğik çizgi', 58: 'İki nokta', 59: 'Noktalı virgül', 60: 'Küçüktür işareti', 61: 'Eşittir', 62: 'Büyüktür işareti',
      63: 'Soru işareti', 64: 'Kuyruklu a (et işareti)', 91: 'Açma köşeli parantezi', 92: 'Ters eğik çizgi', 93: 'Kapama köşeli parantezi',
      94: 'Şapka (düzeltme) işareti', 95: 'Alt çizgi', 96: 'Ters kesme (grave) işareti', 123: 'Açma süslü parantezi', 124: 'Dikey çizgi',
      125: 'Kapama süslü parantezi', 126: 'Tilde (yaklaşık) işareti',
    };
    let kod;
    if (v.tur === 'ondalik') {
      const t = ham.trim();
      if (!/^\d{1,3}$/.test(t)) h.err('Ondalık kod 0 ile 127 arasında bir tam sayı olmalıdır (örn. 65).');
      kod = Number(t);
    } else if (v.tur === 'hex') {
      const t = ham.trim().replace(/^0x/i, '').replace(/h$/i, '');
      if (!/^[0-9a-f]{1,2}$/i.test(t)) h.err('Onaltılık kod 00 ile 7F arasında olmalıdır (örn. 41 ya da 0x41).');
      kod = parseInt(t, 16);
    } else if (v.tur === 'ikili') {
      const t = ham.trim().replace(/^0b/i, '').replace(/\s/g, '');
      if (!/^[01]{1,8}$/.test(t)) h.err('İkili kod yalnızca 0 ve 1 rakamlarından oluşmalı ve en fazla 8 bit olmalıdır (örn. 1000001).');
      kod = parseInt(t, 2);
    } else {
      if (ham === '') h.err('Bir karakter yazın (örn. A) ya da girdi türünü değiştirip kod girin.');
      const kisa = ham.trim().toUpperCase();
      const i = D.findIndex((d) => d[0] === kisa);
      const noktalar = [...ham];
      if (kisa.length >= 2 && i >= 0) kod = i;
      else if (kisa === 'DEL') kod = 127;
      else if (kisa === 'TAB') kod = 9;
      else if (kisa === 'SP' || kisa === 'SPACE' || kisa === 'BOŞLUK') kod = 32;
      else if (noktalar.length === 1) kod = noktalar[0].codePointAt(0);
      else if ([...ham.trim()].length === 1) kod = ham.trim().codePointAt(0);
      else h.err('Karakter türünde tek bir karakter ya da LF, CR, ESC gibi bir denetim kısaltması yazın. Kod girecekseniz girdi türünü değiştirin.');
      if (kod > 127) h.err(`"${String.fromCodePoint(kod)}" ASCII tablosunda yer almaz (Unicode kod noktası U+${kod.toString(16).toUpperCase().padStart(4, '0')}). ASCII yalnızca 0–127 arasındaki 128 karakteri kapsar; Türkçeye özgü harfler bu aralığın dışındadır.`);
    }
    if (kod > 127) h.err('ASCII tablosu 0 ile 127 arasındaki kodları kapsar. 128 ve üzeri değerler genişletilmiş kod sayfalarına ya da Unicode\'a aittir.');

    let gosterim, tur, aciklama;
    if (kod < 32) { gosterim = `${D[kod][0]} (yazdırılamaz)`; tur = 'Denetim karakteri'; aciklama = D[kod][1]; }
    else if (kod === 127) { gosterim = 'DEL (yazdırılamaz)'; tur = 'Denetim karakteri'; aciklama = 'Silme'; }
    else if (kod === 32) { gosterim = 'Boşluk'; tur = 'Boşluk karakteri'; aciklama = 'Sözcükleri ayıran boşluk; yazdırılabilir karakterlerin ilkidir'; }
    else {
      const c = String.fromCharCode(kod);
      gosterim = c;
      if (kod >= 48 && kod <= 57) { tur = 'Rakam'; aciklama = `${c} rakamı`; }
      else if (kod >= 65 && kod <= 90) { tur = 'Büyük harf'; aciklama = `Büyük ${c} harfi; küçük karşılığı ${String.fromCharCode(kod + 32)} (kod ${kod + 32})`; }
      else if (kod >= 97 && kod <= 122) { tur = 'Küçük harf'; aciklama = `Küçük ${c} harfi; büyük karşılığı ${String.fromCharCode(kod - 32)} (kod ${kod - 32})`; }
      else { tur = 'Noktalama / simge'; aciklama = simgeAd[kod]; }
    }
    return {
      rows: [
        ['Karakter', gosterim],
        ['Ondalık', String(kod)],
        ['Onaltılık', '0x' + kod.toString(16).toUpperCase().padStart(2, '0')],
        ['Sekizlik', kod.toString(8).padStart(3, '0')],
        ['İkili (8 bit)', kod.toString(2).padStart(8, '0')],
        ['Tür', tur],
        ['Açıklama', aciklama],
        ['HTML sayısal kodu', `&#${kod};`],
      ],
      note: kod < 32 || kod === 127 ? 'Denetim karakterleri ekranda görünmez; yazıcı, terminal ve iletişim hatlarını yönetmek için tanımlanmıştır.' : 'ASCII 7 bitlik bir koddur; 8 bitlik gösterimde en soldaki bit her zaman 0\'dır.',
    };
  }
