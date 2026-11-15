// Titrasyon Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const b = ['asitM', 'bazM', 'asitV', 'bazV'].includes(v.bilinmeyen) ? v.bilinmeyen : 'asitM';
    const na = h.posint(v.asitN, 'Asidin değerliği');
    const nb = h.posint(v.bazN, 'Bazın değerliği');
    if (na > 6 || nb > 6) h.err('Değerlik 1 ile 6 arasında olmalı; H⁺ ya da OH⁻ sayısını kontrol edin.');
    const ad = { asitM: 'Asit derişimi', bazM: 'Baz derişimi', asitV: 'Asit hacmi', bazV: 'Baz hacmi' };
    const x = {};
    for (const k of Object.keys(ad)) if (k !== b) x[k] = h.pos(v[k], ad[k]);
    let mmol;
    if (b === 'asitM') { mmol = x.bazM * x.bazV * nb; x.asitM = mmol / (x.asitV * na); }
    else if (b === 'asitV') { mmol = x.bazM * x.bazV * nb; x.asitV = mmol / (x.asitM * na); }
    else if (b === 'bazM') { mmol = x.asitM * x.asitV * na; x.bazM = mmol / (x.bazV * nb); }
    else { mmol = x.asitM * x.asitV * na; x.bazV = mmol / (x.bazM * nb); }
    const birim = b.endsWith('M') ? ' M' : ' mL';
    return {
      rows: [
        [ad[b], h.fmt(x[b], 4) + birim],
        ['Nötrleşen H⁺ = OH⁻ miktarı', h.fmt(mmol, 4) + ' mmol'],
        ['Asit miktarı', h.fmt(x.asitM * x.asitV, 4) + ' mmol'],
        ['Baz miktarı', h.fmt(x.bazM * x.bazV, 4) + ' mmol'],
        ['Asit normalitesi', h.fmt(x.asitM * na, 4) + ' N'],
        ['Baz normalitesi', h.fmt(x.bazM * nb, 4) + ' N'],
        ['Eşdeğerlik noktasında toplam hacim', h.fmt(x.asitV + x.bazV, 4) + ' mL'],
      ],
      note: 'Eşdeğerlik noktasında Ma × Va × na = Mb × Vb × nb kabul edilir. Dönüm noktası ile eşdeğerlik noktası arasındaki küçük fark hesaba katılmaz.',
    };
  }
