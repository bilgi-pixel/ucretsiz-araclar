// Harçlık Planı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Harçlık tutarı');
    const okulGunu = h.posint(v.okulGunu, 'Haftadaki okul günü');
    if (okulGunu > 7) h.err('"Haftadaki okul günü" 1 ile 7 arasında olmalı.');
    const oran = h.nonneg(v.birikim === '' ? '0' : v.birikim, 'Birikim oranı');
    if (oran > 100) h.err('"Birikim oranı" 0 ile 100 arasında olmalı.');
    let haftalik;
    if (v.periyot === 'gun') haftalik = tutar * okulGunu;
    else if (v.periyot === 'ay') haftalik = tutar * 12 / 52;
    else haftalik = tutar;
    const birikimHafta = haftalik * oran / 100;
    const rows = [
      ['Haftalık harçlık', h.para(haftalik)],
      ['Okul günü başına', h.para(haftalik / okulGunu)],
      ['Aylık ortalama', h.para(haftalik * 52 / 12)],
      ['Yıllık toplam', h.para(haftalik * 52)],
      ['Haftalık harcanabilir kısım', h.para(haftalik - birikimHafta)],
      ['Haftalık birikim', h.para(birikimHafta)],
      ['Bir yılda biriken', h.para(birikimHafta * 52)],
    ];
    if (String(v.hedef || '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef tutar');
      if (!(birikimHafta > 0)) h.err('Hedefe ulaşma süresini hesaplamak için "Birikim oranı" sıfırdan büyük olmalı.');
      const hafta = Math.ceil(hedef / birikimHafta - 1e-9);
      rows.push(['Hedefe ulaşma süresi', `${h.fmt(hafta, 0)} hafta (yaklaşık ${h.fmt(hafta * 12 / 52, 1)} ay)`]);
    }
    return {
      rows,
      note: 'Bir yıl 52 hafta, bir ay ortalama 52 ÷ 12 = 4,33 hafta kabul edilmiştir. Tatillerde harçlık verilmiyorsa yıllık toplam daha düşük olur.',
    };
  }
