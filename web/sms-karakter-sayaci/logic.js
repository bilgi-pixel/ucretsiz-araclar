// SMS Karakter ve Mesaj Sayısı Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n').normalize('NFC');
    if (ham === '' || ham.trim() === '') h.err('Hesaplamak için "SMS metni" alanına mesajınızı yazın.');
    const TEMEL = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';
    const EK = '^{}\\[~]|€\f';
    const cevir = (s) => {
      const harita = { 'ş': 's', 'Ş': 'S', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I', 'ç': 'c', '’': '\'', '‘': '\'', '“': '"', '”': '"', '…': '...', '–': '-', '—': '-', ' ': ' ' };
      return Array.from(s).map((c) => harita[c] ?? c).join('');
    };
    const olc = (s) => {
      const disi = [];
      let birim = 0;
      for (const c of Array.from(s)) {
        if (TEMEL.includes(c)) birim += 1;
        else if (EK.includes(c)) birim += 2;
        else if (!disi.includes(c)) disi.push(c);
      }
      const gsm = disi.length === 0;
      if (!gsm) birim = s.length; // UCS-2: UTF-16 kod birimi sayısı
      const tek = gsm ? 160 : 70, parca = gsm ? 153 : 67;
      const mesaj = birim <= tek ? 1 : Math.ceil(birim / parca);
      const kapasite = mesaj === 1 ? tek : mesaj * parca;
      return { gsm, birim, tek, parca, mesaj, kalan: kapasite - birim, disi };
    };
    const metin = v.mod === 'donustur' ? cevir(ham) : ham;
    const o = olc(metin), alt = olc(cevir(ham));
    const rows = [
      ['Mesaj sayısı', `${o.mesaj} SMS`],
      ['Kodlama', o.gsm ? 'GSM-7 (standart alfabe)' : 'Unicode (UCS-2)'],
      ['Karakter (SMS birimi)', h.fmt(o.birim, 0)],
      ['Bu mesaj sayısında kalan', h.fmt(o.kalan, 0)],
      ['Mesaj başına sınır', `${o.tek} (tek mesaj) / ${o.parca} (birleşik mesajın her parçası)`],
      ['Unicode gerektiren karakterler', o.disi.length ? o.disi.slice(0, 15).join(' ') + (o.disi.length > 15 ? ' …' : '') : '—'],
    ];
    if (v.mod !== 'donustur') rows.push(['Türkçe karakterler dönüştürülürse', `${alt.mesaj} SMS (${alt.gsm ? 'GSM-7' : 'Unicode'}, ${h.fmt(alt.birim, 0)} karakter)`]);
    return {
      rows,
      text: v.mod === 'donustur' ? metin : undefined,
      note: 'Hesap, standart GSM-7 ve UCS-2 kodlamalarına göredir. Ücretlendirme ve Türkçe karakter desteği operatöre ve SMS sağlayıcısına göre değişebilir.',
    };
  }
