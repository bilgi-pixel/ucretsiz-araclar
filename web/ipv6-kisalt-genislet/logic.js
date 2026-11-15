// IPv6 Adresi Kısaltma ve Genişletme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let s = String(v.adres ?? '').trim().toLowerCase();
    if (s === '') h.err('"IPv6 adresi" alanını doldurun.');
    if (s.startsWith('[') && s.endsWith(']')) s = s.slice(1, -1);
    let onek = '';
    const egik = s.indexOf('/');
    if (egik !== -1) {
      const p = s.slice(egik + 1);
      if (!/^\d{1,3}$/.test(p) || Number(p) > 128) h.err('Önek uzunluğu 0 ile 128 arasında bir tam sayı olmalı (örn. /64).');
      onek = '/' + Number(p);
      s = s.slice(0, egik);
    }
    if (s.includes('%')) h.err('Bölge (zone) eki içeren adresler desteklenmiyor; % işaretinden sonrasını silip deneyin.');
    // Sonda gömülü IPv4 varsa iki gruba çevir
    if (s.includes('.')) {
      const k = s.lastIndexOf(':');
      if (k === -1) h.err('Bu bir IPv4 adresine benziyor; IPv6 adresi iki nokta ile ayrılmış gruplardan oluşur.');
      const ok = s.slice(k + 1).split('.');
      if (ok.length !== 4 || ok.some((o) => !/^\d{1,3}$/.test(o) || Number(o) > 255)) h.err('Adresin sonundaki IPv4 bölümü geçersiz; 0-255 arası dört sayı olmalı.');
      const n = ok.map(Number);
      s = s.slice(0, k + 1) + ((n[0] << 8) | n[1]).toString(16) + ':' + ((n[2] << 8) | n[3]).toString(16);
    }
    if (!/^[0-9a-f:]+$/.test(s)) h.err('IPv6 adresi yalnızca 0-9, a-f karakterleri ve iki nokta içerebilir.');
    const cift = s.split('::');
    if (cift.length > 2) h.err('Çift iki nokta (::) bir adreste yalnızca bir kez kullanılabilir.');
    const parcala = (t) => (t === '' ? [] : t.split(':'));
    let grup;
    if (cift.length === 2) {
      const sol = parcala(cift[0]);
      const sag = parcala(cift[1]);
      if (sol.length + sag.length > 7) h.err('Çift iki nokta en az bir sıfır grubunun yerini tutmalı; adreste fazla grup var.');
      grup = [...sol, ...new Array(8 - sol.length - sag.length).fill('0'), ...sag];
    } else {
      grup = parcala(s);
      if (grup.length !== 8) h.err(`IPv6 adresi 8 gruptan oluşur; ${grup.length} grup bulundu. Eksik sıfır gruplarını :: ile gösterebilirsiniz.`);
    }
    if (grup.some((g) => !/^[0-9a-f]{1,4}$/.test(g))) h.err('Her grup 1 ile 4 arasında onaltılık haneden oluşmalı.');
    const say = grup.map((g) => parseInt(g, 16));
    const tam = say.map((x) => x.toString(16).padStart(4, '0')).join(':');
    const sifirsiz = say.map((x) => x.toString(16)).join(':');
    // En uzun sıfır dizisi (en az 2 grup), eşitlikte ilki
    let enBas = -1;
    let enUz = 0;
    let bas = -1;
    for (let i = 0; i <= 8; i++) {
      if (i < 8 && say[i] === 0) { if (bas === -1) bas = i; }
      else if (bas !== -1) {
        if (i - bas > enUz) { enUz = i - bas; enBas = bas; }
        bas = -1;
      }
    }
    let kisa;
    if (enUz >= 2) {
      kisa = say.slice(0, enBas).map((x) => x.toString(16)).join(':') + '::' + say.slice(enBas + enUz).map((x) => x.toString(16)).join(':');
    } else kisa = sifirsiz;
    let tur;
    const hepsiSifir = say.every((x) => x === 0);
    if (hepsiSifir) tur = 'Belirtilmemiş adres (::)';
    else if (say.slice(0, 7).every((x) => x === 0) && say[7] === 1) tur = 'Geri döngü (loopback, ::1)';
    else if (say.slice(0, 5).every((x) => x === 0) && say[5] === 0xffff) tur = 'IPv4 eşlemeli adres (::ffff:0:0/96)';
    else if ((say[0] & 0xff00) === 0xff00) tur = 'Çoklu yayın (multicast, ff00::/8)';
    else if ((say[0] & 0xffc0) === 0xfe80) tur = 'Bağlantı yerel (link-local, fe80::/10)';
    else if ((say[0] & 0xfe00) === 0xfc00) tur = 'Benzersiz yerel (unique local, fc00::/7)';
    else if (say[0] === 0x2001 && say[1] === 0x0db8) tur = 'Belgeleme amaçlı (2001:db8::/32)';
    else if ((say[0] & 0xe000) === 0x2000) tur = 'Küresel tekil yayın (global unicast, 2000::/3)';
    else tur = 'Ayrılmış ya da özel amaçlı aralık';
    return {
      rows: [
        ['Kısaltılmış', kisa + onek],
        ['Genişletilmiş', tam + onek],
        ['Yalnızca baştaki sıfırlar atılmış', sifirsiz + onek],
        ['Adres türü', tur],
        ['Sıkıştırılan sıfır grubu', enUz >= 2 ? `${enUz} grup` : 'Yok'],
      ],
      note: 'Kısaltma RFC 5952 önerisine göre yapılır: küçük harf, baştaki sıfırlar atılır, en uzun sıfır dizisi :: ile gösterilir.',
    };
  }
