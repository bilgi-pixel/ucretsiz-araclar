// Kan Şekeri Birim Çevirici (mg/dL – mmol/L) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const K = 18.016; // glukozun mol kütlesi 180,16 g/mol
    const x = h.pos(v.deger, 'Kan şekeri değeri');
    const girdiMmol = v.yon === 'mmol';
    const mg = girdiMmol ? x * K : x;
    const mmol = girdiMmol ? x : x / K;
    if (mg > 2000) h.err(girdiMmol ? 'Değer mmol/L için çok yüksek; ölçümünüz mg/dL ise çeviri yönünü değiştirin.' : 'Değer çok yüksek görünüyor; yazdığınız sayıyı kontrol edin.');
    if (mg < 5) h.err(girdiMmol ? 'Değer çok düşük görünüyor; yazdığınız sayıyı kontrol edin.' : 'Değer mg/dL için çok düşük; ölçümünüz mmol/L ise çeviri yönünü değiştirin.');
    const rows = [
      girdiMmol ? ['mg/dL karşılığı', h.fmt(mg, 1) + ' mg/dL'] : ['mmol/L karşılığı', h.fmt(mmol, 2) + ' mmol/L'],
      girdiMmol ? ['Girilen değer', h.fmt(mmol, 2) + ' mmol/L'] : ['Girilen değer', h.fmt(mg, 1) + ' mg/dL'],
    ];
    if (v.olcum === 'aclik' || v.olcum === 'tokluk') {
      // Eşikler girilen birimde uygulanır (yuvarlama kayması olmasın diye)
      const e = v.olcum === 'aclik'
        ? (girdiMmol ? [3.9, 5.6, 7.0] : [70, 100, 126])
        : (girdiMmol ? [null, 7.8, 11.1] : [null, 140, 200]);
      const b = girdiMmol ? 'mmol/L' : 'mg/dL';
      const f = (n) => h.fmt(n, 1);
      let s;
      if (e[0] !== null && x < e[0]) s = `Düşük (${f(e[0])} ${b} altı)`;
      else if (x < e[1]) s = `Normal aralık (${f(e[1])} ${b} altı)`;
      else if (x < e[2]) s = (v.olcum === 'aclik' ? 'Bozulmuş açlık glukozu aralığı' : 'Bozulmuş glukoz toleransı aralığı') + ` (${f(e[1])} – ${f(e[2])} ${b} arası)`;
      else s = `Diyabet aralığı (${f(e[2])} ${b} ve üzeri)`;
      rows.push([v.olcum === 'aclik' ? 'Açlık ölçümü aralığı' : 'Yükleme sonrası 2. saat aralığı', s]);
    }
    return {
      rows,
      note: '1 mmol/L = 18,016 mg/dL (glukoz için). Aralıklar toplardamar kanından laboratuvarda ölçülen plazma glukozu içindir; tek ölçüm tanı koydurmaz.',
    };
  }
