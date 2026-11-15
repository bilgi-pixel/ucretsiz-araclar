// Alt Ağ Maskesi CIDR Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.deger ?? '').trim();
    if (s === '') h.err('"Maske ya da CIDR öneki" alanını doldurun.');
    let onek;
    let girdi;
    if (s.includes('.')) {
      const ok = s.split('.');
      if (ok.length !== 4 || ok.some((o) => !/^\d{1,3}$/.test(o) || Number(o) > 255)) h.err('Maske, noktayla ayrılmış 0-255 arası dört sayıdan oluşmalı (örn. 255.255.255.0).');
      const n = ok.map(Number);
      const deger = ((n[0] * 256 + n[1]) * 256 + n[2]) * 256 + n[3];
      const ikili = deger.toString(2).padStart(32, '0');
      if (/^1*0*$/.test(ikili)) { onek = ikili.indexOf('0') === -1 ? 32 : ikili.indexOf('0'); girdi = 'Alt ağ maskesi'; }
      else if (/^0*1*$/.test(ikili)) { onek = ikili.indexOf('1'); girdi = 'Joker (wildcard) maske'; }
      else h.err('Bu geçerli bir alt ağ maskesi değil: maskede 1 bitleri solda kesintisiz olmalı (örn. 255.255.240.0). 255.255.0.255 gibi aralıklı maskeler kullanılamaz.');
    } else {
      const t = s.replace(/^\//, '').trim();
      if (!/^\d{1,2}$/.test(t) || Number(t) > 32) h.err('CIDR öneki 0 ile 32 arasında bir tam sayı olmalı (örn. /24).');
      onek = Number(t);
      girdi = 'CIDR öneki';
    }
    const ikili = '1'.repeat(onek) + '0'.repeat(32 - onek);
    const sekizli = [0, 8, 16, 24].map((i) => ikili.slice(i, i + 8));
    const maske = sekizli.map((b) => parseInt(b, 2));
    const joker = maske.map((m) => 255 - m);
    const toplam = 2 ** (32 - onek);
    const kullan = onek === 32 ? 1 : onek === 31 ? 2 : toplam - 2;
    const sinif = onek === 8 ? 'A sınıfı varsayılan maskesi' : onek === 16 ? 'B sınıfı varsayılan maskesi' : onek === 24 ? 'C sınıfı varsayılan maskesi' : 'Sınıfsız (CIDR) maske';
    return {
      rows: [
        ['CIDR öneki', '/' + onek],
        ['Alt ağ maskesi', maske.join('.')],
        ['Joker (wildcard) maske', joker.join('.')],
        ['İkili maske', sekizli.join('.')],
        ['Onaltılık maske', '0x' + maske.map((m) => m.toString(16).padStart(2, '0')).join('')],
        ['Ağ biti / host biti', `${onek} / ${32 - onek}`],
        ['Toplam adres', h.fmt(toplam, 0)],
        ['Kullanılabilir cihaz adresi', h.fmt(kullan, 0)],
        ['Girdi türü', girdi],
        ['Sınıf karşılığı', sinif],
      ],
      note: onek >= 31 ? '/31 noktadan noktaya bağlantılarda iki adresin de kullanıldığı, /32 ise tek bir cihazı gösteren özel durumlardır.' : 'Kullanılabilir adres sayısı, ağ adresi ve yayın (broadcast) adresi düşülerek hesaplanır.',
    };
  }
