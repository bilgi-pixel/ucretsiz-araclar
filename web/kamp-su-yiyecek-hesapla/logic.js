// Kamp Suyu ve Yiyecek Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kisi = h.posint(v.kisi, 'Kişi sayısı');
    const gun = h.posint(v.gun, 'Gün sayısı');
    const yog = h.pos(v.yogunluk, 'Enerji yoğunluğu');
    if (kisi > 500) h.err('Kişi sayısı en fazla 500 olabilir.');
    if (gun > 60) h.err('Gün sayısı en fazla 60 olabilir.');
    if (yog < 50 || yog > 900) h.err('Enerji yoğunluğu 50 ile 900 kcal/100 g arasında olmalı; yağın bile yoğunluğu 900 civarındadır.');
    const icmeTaban = { hafif: 2, orta: 3, yogun: 4 }[v.tempo] ?? 3;
    const icmeKisi = icmeTaban + (v.hava === 'sicak' ? 1 : 0);
    const kullanimKisi = { yok: 0, yemek: 1, tam: 3 }[v.kullanim] ?? 1;
    const kcalKisi = ({ hafif: 2500, orta: 3000, yogun: 3500 }[v.tempo] ?? 3000) + (v.hava === 'soguk' ? 500 : 0);
    const kg = kisi * gun;
    const icme = icmeKisi * kg;
    const kullanim = kullanimKisi * kg;
    const su = icme + kullanim;
    const kcal = kcalKisi * kg;
    const yiyecek = kcal / yog / 10;
    return {
      rows: [
        ['Toplam su', h.fmt(su, 1) + ' litre'],
        ['İçme suyu', h.fmt(icme, 1) + ' litre'],
        ['Kullanma suyu', h.fmt(kullanim, 1) + ' litre'],
        ['Kişi başı günlük su', h.fmt(icmeKisi + kullanimKisi, 1) + ' litre'],
        ['Toplam enerji ihtiyacı', h.fmt(kcal, 0) + ' kcal'],
        ['Kişi başı günlük enerji', h.fmt(kcalKisi, 0) + ' kcal'],
        ['Yaklaşık yiyecek ağırlığı', h.fmt(yiyecek, 1) + ' kg'],
        ['Su ve yiyecek toplam yükü', h.fmt(su + yiyecek, 1) + ' kg'],
      ],
      note: 'Değerler ortalama bir yetişkin için planlama kabulleridir; kişiye, güzergâha ve su kaynağına göre değişir. Güzergâhta güvenilir su kaynağı yoksa yedek pay bırakın.',
    };
  }
