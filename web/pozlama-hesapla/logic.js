// Pozlama Değeri (EV) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const N = h.pos(v.diyafram, 'Diyafram');
    const ham = String(v.enstantane ?? '').trim();
    if (ham === '') h.err('"Enstantane" alanını doldurun (örn. 1/125).');
    let t;
    const m = /^([^/]+)\/([^/]+)$/.exec(ham);
    if (m) t = h.pos(m[1], 'Enstantane') / h.pos(m[2], 'Enstantane');
    else t = h.pos(ham, 'Enstantane');
    const iso = h.pos(v.iso, 'ISO');
    const ev = Math.log2(N * N / t);
    const ev100 = ev - Math.log2(iso / 100);
    const sure = (x) => {
      if (x >= 0.75) return h.fmt(x, x >= 10 ? 0 : 1) + ' sn';
      const p = 1 / x;
      return '1/' + h.fmt(p, p >= 10 ? 0 : 1) + ' sn';
    };
    const r = Math.round(ev100);
    let sahne;
    if (r >= 16) sahne = 'Çok parlak: güneş altında kar ya da açık renkli kum';
    else if (r === 15) sahne = 'Açık havada parlak güneş (güneşli 16 kuralı)';
    else if (r >= 13) sahne = 'Puslu güneş ya da parçalı bulutlu gün';
    else if (r === 12) sahne = 'Kapalı hava ya da açık gölge';
    else if (r >= 9) sahne = 'Gün doğumu-batımı çevresi, parlak vitrin ve sahne ışığı';
    else if (r >= 5) sahne = 'Aydınlık iç mekân, ışıklı gece sokağı';
    else if (r >= 0) sahne = 'Loş iç mekân, mum ışığı, gece manzarası';
    else sahne = 'Çok karanlık: ay ışığı ve gece gökyüzü';
    const satirlar = [];
    for (let k = 2; k <= 10; k++) {
      const n = Math.pow(Math.SQRT2, k);
      const ad = k % 2 === 0 ? h.fmt(n, 0) : h.fmt(n, n < 10 ? 1 : 0);
      satirlar.push('f/' + ad + '  →  ' + sure(n * n / Math.pow(2, ev)));
    }
    return {
      rows: [
        ['Pozlama değeri (ayar)', h.fmt(ev, 2) + ' EV'],
        ['ISO 100 eşdeğeri ışık değeri', h.fmt(ev100, 2) + ' EV'],
        ['Yaklaşık sahne', sahne],
        ['Enstantane', sure(t)],
      ],
      text: 'ISO ' + h.fmt(iso, 0) + ' için aynı pozlamayı veren ayarlar:\n' + satirlar.join('\n'),
      note: 'EV = log2(N² ÷ t). Sahne karşılığı yaklaşık bir rehberdir; ışık ölçümünün yerini tutmaz.',
    };
  }
