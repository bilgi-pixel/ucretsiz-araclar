// Ortalama Arteriyel Basınç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = h.pos(v.sistolik, 'Sistolik tansiyon');
    const d = h.pos(v.diyastolik, 'Diyastolik tansiyon');
    if (s < 40 && d < 30) h.err('Değerler çok küçük görünüyor. Tansiyonu mmHg olarak yazın: "12\'ye 8" için 120 ve 80 girin.');
    if (s < 40 || s > 300) h.err('Sistolik tansiyon 40 ile 300 mmHg arasında olmalı.');
    if (d < 20 || d > 200) h.err('Diyastolik tansiyon 20 ile 200 mmHg arasında olmalı.');
    if (d >= s) h.err('Diyastolik (küçük) tansiyon, sistolik (büyük) tansiyondan düşük olmalı; değerlerin yerini kontrol edin.');
    const nb = s - d;
    const oab = d + nb / 3;
    let yorum;
    if (oab < 60 - 1e-9) yorum = 'Düşük (60 mmHg altı)';
    else if (oab < 70 - 1e-9) yorum = 'Sınırda düşük (60–70 mmHg)';
    else if (oab <= 100 + 1e-9) yorum = 'Olağan aralıkta (70–100 mmHg)';
    else yorum = 'Yüksek (100 mmHg üstü)';
    return {
      rows: [
        ['Ortalama arteriyel basınç', h.fmt(oab, 1) + ' mmHg'],
        ['Nabız basıncı', h.fmt(nb, 1) + ' mmHg'],
        ['OAB (kilopaskal)', h.fmt(oab * 0.133322, 2) + ' kPa'],
        ['Genel başvuru aralığına göre', yorum],
        ['Nabız basıncının sistoliğe oranı', '%' + h.fmt(nb / s * 100, 1)],
      ],
      note: 'Formül: OAB = diyastolik + (sistolik − diyastolik) ÷ 3. Dinlenme hâlindeki kalp hızları için yaklaşık bir değerdir; tanı koymaz, hekim değerlendirmesinin yerini tutmaz.',
    };
  }
