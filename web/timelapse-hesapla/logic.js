// Timelapse Çekim Aralığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const olayDk = h.pos(v.olay, 'Olayın süresi');
    const videoSn = h.pos(v.video, 'Hedef video süresi');
    const fps = Number(v.fps) || 25;
    const olaySn = olayDk * 60;
    const kare = Math.ceil(videoSn * fps - 1e-9);
    if (kare < 2) h.err('Video en az 2 kare içermeli; hedef video süresini uzatın.');
    const aralik = olaySn / kare;
    if (videoSn >= olaySn) h.err('Hedef video, olayın kendisinden kısa olmalı; aksi halde hızlandırma olmaz.');
    const hiz = olaySn / videoSn;
    const sureYaz = (sn) => {
      const t = Math.round(sn);
      const s = Math.floor(t / 3600), d = Math.floor((t % 3600) / 60), k = t % 60;
      const p = [];
      if (s) p.push(s + ' sa');
      if (d) p.push(d + ' dk');
      if (k || !p.length) p.push(k + ' sn');
      return p.join(' ');
    };
    const rows = [
      ['Çekim aralığı', h.fmt(aralik, 2) + ' sn'],
      ['Toplam kare sayısı', h.fmt(kare, 0) + ' kare'],
      ['Hızlanma oranı', h.fmt(hiz, 1) + '×'],
      ['Çekim süresi', sureYaz(olaySn)],
      ['Dakikada çekilen kare', h.fmt(60 / aralik, 1) + ' kare'],
    ];
    if (String(v.boyut ?? '').trim() !== '') {
      const mb = h.pos(v.boyut, 'Dosya boyutu');
      const toplam = mb * kare;
      rows.push(['Gereken depolama', toplam >= 1000 ? h.fmt(toplam / 1000, 2) + ' GB' : h.fmt(toplam, 0) + ' MB']);
    }
    let note = 'Aralık, olay süresinin kare sayısına bölünmesiyle bulunur. Intervalometreniz yalnızca tam saniye kabul ediyorsa aşağı yuvarlayın.';
    if (aralik < 1) note = 'Aralık 1 saniyenin altında: çoğu makine bu hızda sürekli çekemez. Video çekip kurguda hızlandırmayı ya da hedef videoyu kısaltmayı düşünün.';
    return { rows, note };
  }
