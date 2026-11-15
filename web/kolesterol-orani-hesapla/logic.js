// Kolesterol Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mmol = v.birim === 'mmol';
    const b = mmol ? 'mmol/L' : 'mg/dL';
    const bos = (x) => String(x ?? '').trim() === '';
    const tk = h.pos(v.toplam, 'Toplam kolesterol');
    const hdl = h.pos(v.hdl, 'HDL kolesterol');
    if (hdl >= tk) h.err('HDL kolesterol toplam kolesterolden küçük olmalı; değerlerin yerini ve birimi kontrol edin.');
    const ust = mmol ? 30 : 1200;
    if (tk > ust) h.err(`"Toplam kolesterol" bu birim için çok yüksek görünüyor; birim seçimini (${b}) kontrol edin.`);
    if (!mmol && tk < 30) h.err('Değerler mg/dL için çok düşük görünüyor; tahliliniz mmol/L ise birimi değiştirin.');
    const oran = tk / hdl;
    const nonHdl = tk - hdl;
    const d = mmol ? 2 : 1;
    let yorum;
    if (oran < 3.5) yorum = 'Düşük oran (3,5\'in altı)';
    else if (oran <= 5) yorum = 'Orta oran (3,5 – 5 arası)';
    else yorum = 'Yüksek oran (5\'in üzeri)';
    const rows = [
      ['Toplam kolesterol / HDL oranı', h.fmt(oran, 2)],
      ['Oranın düzeyi', yorum],
      ['Non-HDL kolesterol', `${h.fmt(nonHdl, d)} ${b}`],
      ['HDL\'nin toplam içindeki payı', '%' + h.fmt((hdl / tk) * 100, 1)],
    ];
    let ldl = null;
    let tg = null;
    if (!bos(v.tg)) tg = h.pos(v.tg, 'Trigliserit');
    if (!bos(v.ldl)) {
      ldl = h.pos(v.ldl, 'LDL kolesterol');
      if (ldl >= tk) h.err('LDL kolesterol toplam kolesterolden küçük olmalı.');
    } else if (tg !== null) {
      const tgMg = mmol ? tg * 88.57 : tg;
      if (tgMg >= 400) rows.push(['Tahmini LDL (Friedewald)', 'Hesaplanamaz (trigliserit 400 mg/dL ve üzeri)']);
      else {
        const t = tk - hdl - tg / (mmol ? 2.2 : 5);
        if (t <= 0) rows.push(['Tahmini LDL (Friedewald)', 'Hesaplanamaz (değerler birbiriyle uyumsuz)']);
        else { ldl = t; rows.push(['Tahmini LDL (Friedewald)', `${h.fmt(ldl, d)} ${b}`]); }
      }
    }
    if (ldl !== null) rows.push(['LDL / HDL oranı', h.fmt(ldl / hdl, 2)]);
    if (tg !== null) {
      const tgMg = mmol ? tg * 88.57 : tg;
      const hdlMg = mmol ? hdl * 38.67 : hdl;
      rows.push(['Trigliserit / HDL oranı (mg/dL esaslı)', h.fmt(tgMg / hdlMg, 2)]);
    }
    return {
      rows,
      note: 'Oranlar tek başına tanı koydurmaz; kalp-damar riski yaş, tansiyon, sigara, diyabet ve aile öyküsüyle birlikte hekim tarafından değerlendirilir.',
    };
  }
