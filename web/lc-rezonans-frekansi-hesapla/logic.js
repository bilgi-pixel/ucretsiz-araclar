// LC Rezonans Frekansı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const olcek = (x, birimler) => {
      // birimler: [[çarpan, ad], …] büyükten küçüğe
      for (const [k, ad] of birimler) if (x >= k * (1 - 1e-9)) return h.sig(x / k, 4) + ' ' + ad;
      const son = birimler[birimler.length - 1];
      return h.sig(x / son[0], 4) + ' ' + son[1];
    };
    const fYaz = (x) => olcek(x, [[1e9, 'GHz'], [1e6, 'MHz'], [1e3, 'kHz'], [1, 'Hz']]);
    const lYaz = (x) => olcek(x, [[1, 'H'], [1e-3, 'mH'], [1e-6, 'µH'], [1e-9, 'nH']]);
    const cYaz = (x) => olcek(x, [[1, 'F'], [1e-3, 'mF'], [1e-6, 'µF'], [1e-9, 'nF'], [1e-12, 'pF']]);
    const tYaz = (x) => olcek(x, [[1, 's'], [1e-3, 'ms'], [1e-6, 'µs'], [1e-9, 'ns'], [1e-12, 'ps']]);
    const lk = { nH: 1e-9, uH: 1e-6, mH: 1e-3, H: 1 }[v.lb] || 1e-6;
    const ck = { pF: 1e-12, nF: 1e-9, uF: 1e-6 }[v.cb] || 1e-12;
    const fk = { Hz: 1, kHz: 1e3, MHz: 1e6 }[v.fb] || 1e6;
    let L, C, f;
    if (v.hedef === 'c') {
      f = h.pos(v.f, 'Frekans') * fk;
      L = h.pos(v.l, 'Endüktans L') * lk;
      C = 1 / (Math.pow(2 * Math.PI * f, 2) * L);
    } else if (v.hedef === 'l') {
      f = h.pos(v.f, 'Frekans') * fk;
      C = h.pos(v.c, 'Kapasite C') * ck;
      L = 1 / (Math.pow(2 * Math.PI * f, 2) * C);
    } else {
      L = h.pos(v.l, 'Endüktans L') * lk;
      C = h.pos(v.c, 'Kapasite C') * ck;
      f = 1 / (2 * Math.PI * Math.sqrt(L * C));
    }
    const ortak = [
      ['Açısal frekans', h.sig(2 * Math.PI * f, 4) + ' rad/s'],
      ['Periyot', tYaz(1 / f)],
      ['Karakteristik empedans', h.sig(Math.sqrt(L / C), 4) + ' Ω'],
    ];
    const bas = v.hedef === 'c' ? ['Gereken kapasite', cYaz(C)] : v.hedef === 'l' ? ['Gereken endüktans', lYaz(L)] : ['Rezonans frekansı', fYaz(f)];
    return {
      rows: [bas, ...ortak],
      note: 'f = 1 ÷ (2π√(L × C)). İdeal (kayıpsız) elemanlar varsayılır; dağınık kapasite ve bobin direnci hesaba katılmaz.',
    };
  }
