// Mbps MB/sn Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Hız');
    const dosya = h.opt(v.dosya, 0, 'Dosya boyutu');
    if (dosya < 0) h.err('"Dosya boyutu" negatif olamaz.');
    const mbps = v.yon === 'mbs' ? x * 8 : x;
    const mbs = mbps / 8;
    const sure = (sn) => {
      if (sn < 60) return h.fmt(sn, 1) + ' sn';
      const t = Math.round(sn);
      const sa = Math.floor(t / 3600);
      const dk = Math.floor((t - sa * 3600) / 60);
      const s = t - sa * 3600 - dk * 60;
      return (sa > 0 ? `${h.fmt(sa, 0)} sa ` : '') + `${dk} dk ${s} sn`;
    };
    const rMbs = ['MB/sn', h.sig(mbs, 8) + ' MB/sn'];
    const rMbps = ['Mbps', h.sig(mbps, 8) + ' Mbps'];
    const rows = [
      ...(v.yon === 'mbs' ? [rMbps, rMbs] : [rMbs, rMbps]),
      ['KB/sn', h.sig(mbs * 1000, 8) + ' KB/sn'],
      ['MiB/sn (1024 tabanlı)', h.fmt(mbs * 1e6 / 1048576, 2) + ' MiB/sn'],
      ['Dakikada aktarılan', h.sig(mbs * 60, 8) + ' MB'],
      ['Saatte aktarılan', h.sig(mbs * 3.6, 8) + ' GB'],
    ];
    if (dosya > 0) rows.push(['Tahmini indirme süresi', sure(dosya * 1000 / mbs)]);
    return {
      rows,
      note: '1 bayt = 8 bit; 1 Mbps = 1.000.000 bit/sn, 1 MB = 1.000.000 bayt kabul edilmiştir. Gerçek hız hat kalitesine, Wi-Fi bağlantısına ve sunucuya göre daha düşük olabilir.',
    };
  }
