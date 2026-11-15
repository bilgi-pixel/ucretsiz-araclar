// Bisiklet Vites Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (s, ad, enCok) => {
      const parcalar = String(s ?? '').split(/[\s,;\/-]+/).map((x) => x.trim()).filter(Boolean);
      if (!parcalar.length) h.err(`"${ad}" alanına en az bir diş sayısı yazın (örn. 50 34).`);
      const liste = parcalar.map((p) => {
        if (!/^\d+$/.test(p)) h.err(`"${ad}" alanında yalnızca tam sayılar olmalı; "${p}" geçersiz.`);
        const n = Number(p);
        if (n < 8 || n > 70) h.err(`"${ad}" alanındaki ${n} değeri gerçekçi değil; diş sayısı 8 ile 70 arasında olmalı.`);
        return n;
      });
      const tekil = [...new Set(liste)];
      if (tekil.length > enCok) h.err(`"${ad}" alanına en çok ${enCok} farklı dişli yazabilirsiniz.`);
      return tekil;
    };
    const onler = oku(v.onler, 'Aynakol diş sayıları', 3).sort((a, b) => b - a);
    const arkalar = oku(v.arkalar, 'Arka dişli diş sayıları', 13).sort((a, b) => a - b);
    const cevre = Number(v.lastik || 2105);
    const kadans = h.pos(String(v.kadans ?? '').trim() === '' ? '90' : v.kadans, 'Kadans');
    if (kadans > 250) h.err('Kadans 250 tur/dakikadan büyük olamaz.');
    const capInc = cevre / Math.PI / 25.4;
    const yol = (o) => o * cevre / 1000;
    const hiz = (o) => kadans * yol(o) * 60 / 1000;
    const enAgirOn = onler[0], enAgirArka = arkalar[0];
    const enHafifOn = onler[onler.length - 1], enHafifArka = arkalar[arkalar.length - 1];
    const agir = enAgirOn / enAgirArka;
    const hafif = enHafifOn / enHafifArka;
    const satirlar = [];
    for (const o of onler) {
      for (const a of arkalar) {
        const r = o / a;
        satirlar.push(`${o}/${a}  oran ${h.fix(r, 2)}  yol ${h.fix(yol(r), 2)} m  ${h.fix(r * capInc, 1)} inç  ${h.fix(hiz(r), 1)} km/sa`);
      }
    }
    return {
      rows: [
        ['En ağır vites', `${enAgirOn}/${enAgirArka} → ${h.fmt(agir, 2)}`],
        ['En hafif vites', `${enHafifOn}/${enHafifArka} → ${h.fmt(hafif, 2)}`],
        ['Vites aralığı', '%' + h.fmt(agir / hafif * 100, 0)],
        ['En ağır viteste pedal turu başına yol', h.fmt(yol(agir), 2) + ' m'],
        ['En hafif viteste pedal turu başına yol', h.fmt(yol(hafif), 2) + ' m'],
        ['En ağır viteste dişli inç', h.fmt(agir * capInc, 1) + ' inç'],
        ['En hafif viteste dişli inç', h.fmt(hafif * capInc, 1) + ' inç'],
        [`En ağır viteste hız (${h.fmt(kadans, 0)} tur/dk)`, h.fmt(hiz(agir), 2) + ' km/sa'],
        ['Kombinasyon sayısı', String(onler.length * arkalar.length)],
      ],
      text: `Vites tablosu (hız ${h.fmt(kadans, 0)} tur/dk kadansta):\n` + satirlar.join('\n'),
      note: 'Lastik çevresi yaklaşık değerdir. Çapraz zincir oluşturan kombinasyonlar (büyük aynakol–büyük dişli, küçük aynakol–küçük dişli) tabloda yer alır ama kullanılması önerilmez.',
    };
  }
