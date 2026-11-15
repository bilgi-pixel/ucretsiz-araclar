// Satırlara Ön Ek ve Son Ek Ekleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Ek koyulacak satırları yazın.');
    const coz = (s) => String(s ?? '').replace(/\\t/g, '\t');
    const onek = coz(v.onek), sonek = coz(v.sonek);
    if (onek === '' && sonek === '') h.err('"Ön ek" ya da "Son ek" alanlarından en az birini doldurun.');
    let satirlar = ham.split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    if (v.bos === 'sil') satirlar = satirlar.filter((s) => s.trim() !== '');
    if (satirlar.length > 200000) h.err('En fazla 200.000 satır işlenebilir.');
    const ekAlir = (s) => v.bos === 'uygula' || s.trim() !== '';
    let sonSira = -1;
    for (let i = satirlar.length - 1; i >= 0; i--) if (ekAlir(satirlar[i])) { sonSira = i; break; }
    let adet = 0;
    const cikti = satirlar.map((s, i) => {
      if (!ekAlir(s)) return s;
      adet++;
      const govde = v.kirp === 'evet' ? s.trim() : s;
      const ek = v.son === 'ekleme' && i === sonSira ? '' : sonek;
      return onek + govde + ek;
    });
    const sonuc = cikti.join('\n');
    return {
      rows: [
        ['Ek koyulan satır', h.fmt(adet, 0)],
        ['Toplam satır', h.fmt(satirlar.length, 0)],
        ['Sonuç uzunluğu', h.fmt(sonuc.length, 0) + ' karakter'],
      ],
      text: sonuc,
    };
  }
