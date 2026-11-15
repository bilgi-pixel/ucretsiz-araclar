// Kapasitif ve Endüktif Reaktans Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carp = (s, izinli, vars) => (izinli.includes(String(s)) ? Number(s) : vars);
    const f = h.pos(v.frekans, 'Frekans') * carp(v.frekansBirim, ['1', '1e3', '1e6'], 1);
    const cVar = String(v.kapasite ?? '').trim() !== '';
    const lVar = String(v.enduktans ?? '').trim() !== '';
    if (!cVar && !lVar) h.err('Kapasite ya da endüktans alanlarından en az birini doldurun.');
    const ohm = (x) => {
      const a = Math.abs(x);
      if (a < 1) return h.sig(x * 1e3, 4) + ' mΩ';
      if (a < 1e3) return h.sig(x, 4) + ' Ω';
      if (a < 1e6) return h.sig(x / 1e3, 4) + ' kΩ';
      return h.sig(x / 1e6, 4) + ' MΩ';
    };
    const hz = (x) => {
      if (x < 1e3) return h.sig(x, 4) + ' Hz';
      if (x < 1e6) return h.sig(x / 1e3, 4) + ' kHz';
      if (x < 1e9) return h.sig(x / 1e6, 4) + ' MHz';
      return h.sig(x / 1e9, 4) + ' GHz';
    };
    const w = 2 * Math.PI * f;
    const rows = [];
    let xc = 0, xl = 0, C = 0, L = 0;
    if (cVar) {
      C = h.pos(v.kapasite, 'Kapasite') * carp(v.kapBirim, ['1e-6', '1e-9', '1e-12'], 1e-6);
      xc = 1 / (w * C);
      rows.push(['Kapasitif reaktans (Xc)', ohm(xc)]);
    }
    if (lVar) {
      L = h.pos(v.enduktans, 'Endüktans') * carp(v.endBirim, ['1e-3', '1e-6', '1'], 1e-3);
      xl = w * L;
      rows.push(['Endüktif reaktans (XL)', ohm(xl)]);
    }
    if (cVar && lVar) {
      const net = xl - xc;
      const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
      const yakin = Math.abs(net) < 1e-9 * Math.max(xl, xc);
      rows.push(['Net reaktans (XL − Xc)', yakin ? '0 Ω (rezonans)' : ohm(Math.abs(net)) + (net > 0 ? ' (endüktif)' : ' (kapasitif)')]);
      rows.push(['Rezonans frekansı', hz(f0)]);
    }
    rows.push(['Açısal frekans (ω)', h.sig(w, 5) + ' rad/s']);
    return { rows, note: 'İdeal elemanlar varsayılmıştır; gerçek kondansatör ve bobinlerde seri direnç ve parazitik etkiler nedeniyle özellikle yüksek frekansta sapma olur.' };
  }
