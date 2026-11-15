export default {
  slug: 'kapasitif-reaktans-hesapla',
  title: 'Kapasitif ve Endüktif Reaktans Hesaplama',
  h1Tail: 'Xc ve XL',
  pageTitle: 'Kapasitif ve Endüktif Reaktans Hesaplama – Xc ve XL Formülü',
  description: 'Frekans, kapasite ve endüktans değerlerinden kapasitif reaktansı (Xc) ve endüktif reaktansı (XL) ohm olarak hesaplayın; net reaktansı ve rezonans frekansını görün.',
  card: 'Frekansa göre kondansatörün Xc ve bobinin XL reaktansını ohm olarak hesaplayın; net reaktans ve rezonans frekansı dâhil.',
  category: 'elektrik',
  keywords: ['kapasitif reaktans hesaplama', 'endüktif reaktans hesaplama', 'xc hesaplama', 'xl hesaplama', 'reaktans formülü', 'kondansatör direnci frekans', 'bobin reaktansı'],
  lead: 'Bir kondansatörün ya da bobinin alternatif akıma gösterdiği zorluğu, yani <strong>reaktansı</strong> hesaplayın. Frekansla birlikte kapasiteyi, endüktansı ya da ikisini birden girin; araç X<sub>C</sub> ve X<sub>L</sub> değerlerini, ikisi birlikte verilmişse net reaktansı ve rezonans frekansını gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'frekans', label: 'Frekans', type: 'number', placeholder: 'Örn. 50' },
    { id: 'frekansBirim', label: 'Frekans birimi', type: 'select', options: [['1', 'Hz'], ['1e3', 'kHz'], ['1e6', 'MHz']] },
    { id: 'kapasite', label: 'Kapasite (C)', type: 'number', placeholder: 'Boş bırakılabilir' },
    { id: 'kapBirim', label: 'Kapasite birimi', type: 'select', options: [['1e-6', 'µF'], ['1e-9', 'nF'], ['1e-12', 'pF']] },
    { id: 'enduktans', label: 'Endüktans (L)', type: 'number', placeholder: 'Boş bırakılabilir' },
    { id: 'endBirim', label: 'Endüktans birimi', type: 'select', options: [['1e-3', 'mH'], ['1e-6', 'µH'], ['1', 'H']] },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { frekans: '50', frekansBirim: '1', kapasite: '100', kapBirim: '1e-6' }, out: { 'Kapasitif reaktans (Xc)': '31,83 Ω', 'Açısal frekans (ω)': '314,16 rad/s' } },
    { in: { frekans: '50', frekansBirim: '1', enduktans: '100', endBirim: '1e-3' }, out: { 'Endüktif reaktans (XL)': '31,42 Ω' } },
    { in: { frekans: '1', frekansBirim: '1e3', kapasite: '1', kapBirim: '1e-6', enduktans: '10', endBirim: '1e-3' }, out: { 'Kapasitif reaktans (Xc)': '159,2 Ω', 'Endüktif reaktans (XL)': '62,83 Ω', 'Net reaktans (XL − Xc)': '96,32 Ω (kapasitif)', 'Rezonans frekansı': '1,592 kHz' } },
    { in: { frekans: '1', frekansBirim: '1e6', enduktans: '10', endBirim: '1e-6' }, out: { 'Endüktif reaktans (XL)': '62,83 Ω' } },
    { in: { frekans: '60', frekansBirim: '1', kapasite: '10', kapBirim: '1e-6', enduktans: '50', endBirim: '1e-3' }, out: { 'Kapasitif reaktans (Xc)': '265,3 Ω', 'Endüktif reaktans (XL)': '18,85 Ω' } },
    { in: { frekans: '100', frekansBirim: '1e6', kapasite: '10', kapBirim: '1e-12' }, out: { 'Kapasitif reaktans (Xc)': '159,2 Ω' } },
    { in: { frekans: '100', frekansBirim: '1e3', enduktans: '1', endBirim: '1e-3' }, out: { 'Endüktif reaktans (XL)': '628,3 Ω' } },
    { in: { frekans: '50', frekansBirim: '1' }, error: true },
    { in: { frekans: '0', frekansBirim: '1', kapasite: '100' }, error: true },
    { in: { frekans: '50', frekansBirim: '1', kapasite: '-1' }, error: true },
  ],
  howto: [
    'Devrenin çalıştığı frekansı yazın ve birimini seçin. Şebeke için 50 Hz, ses devreleri için kHz, radyo devreleri için MHz kullanılır.',
    'Kondansatörün reaktansını istiyorsanız kapasiteyi girip birimini (µF, nF, pF) seçin.',
    'Bobinin reaktansını istiyorsanız endüktansı girip birimini (mH, µH, H) seçin. İki alandan yalnızca birini doldurmak yeterlidir.',
    '"Hesapla" düğmesine basın. Her eleman için reaktans ohm olarak gösterilir.',
    'İki değeri birlikte girdiyseniz net reaktans ile bu L ve C çiftinin rezonans frekansı da sonuçta yer alır.',
  ],
  sections: [
    { h: 'Reaktans nedir, dirençten farkı ne?', p: [
      'Direnç, akıma karşı koyarken enerjiyi ısıya dönüştürür ve bunu her frekansta aynı ölçüde yapar. Kondansatör ve bobin ise enerjiyi tüketmez; sırasıyla elektrik alanında ve manyetik alanda depolayıp devreye geri verir. Bu elemanların alternatif akıma gösterdiği zorluğa <strong>reaktans</strong> denir, birimi dirençle aynıdır (ohm, Ω) ve X harfiyle gösterilir.',
      'Reaktansın en önemli özelliği frekansa bağlı olmasıdır. Kondansatörün reaktansı frekans arttıkça azalır, bobinin reaktansı ise frekansla birlikte artar. Filtrelerin, hoparlör bölücülerinin, ton kontrollerinin ve radyo alıcılarındaki ayar devrelerinin tamamı bu zıt davranış üzerine kuruludur.',
    ] },
    { h: 'Formüller', p: [
      'Kapasitif reaktans: <strong>X<sub>C</sub> = 1 ÷ (2π · f · C)</strong>. Endüktif reaktans: <strong>X<sub>L</sub> = 2π · f · L</strong>. Burada f hertz cinsinden frekans, C farad cinsinden kapasite, L henri cinsinden endüktanstır. 2πf çarpımına açısal frekans denir ve ω (omega) ile gösterilir; araç bu değeri de rad/s olarak verir.',
      'Birim çevirisi en sık hata yapılan yerdir: 1 µF = 10<sup>−6</sup> F, 1 nF = 10<sup>−9</sup> F, 1 pF = 10<sup>−12</sup> F; 1 mH = 10<sup>−3</sup> H, 1 µH = 10<sup>−6</sup> H. Araç seçtiğiniz birime göre dönüşümü kendisi yapar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Kondansatör:</strong> 50 Hz şebeke frekansında 100 µF\'lık bir kondansatör için X<sub>C</sub> = 1 ÷ (2π × 50 × 0,0001) = 1 ÷ 0,031416 ≈ 31,83 Ω.',
      '<strong>Bobin:</strong> Aynı frekansta 100 mH\'lik bir bobin için X<sub>L</sub> = 2π × 50 × 0,1 ≈ 31,42 Ω. İki değerin birbirine bu kadar yakın olması tesadüf değildir; bu L ve C çiftinin rezonans frekansı 50 Hz\'e çok yakındır.',
      '<strong>İkisi birlikte:</strong> 1 kHz\'te 1 µF kondansatör 159,2 Ω, 10 mH bobin 62,83 Ω reaktans gösterir. Seri bağlandıklarında net reaktans 62,83 − 159,2 = −96,32 Ω olur; işaret negatif olduğundan devre kapasitif davranır. Bu çiftin rezonans frekansı 1 ÷ (2π√(LC)) ≈ 1,592 kHz\'tir; yani frekans biraz yükseltilirse iki reaktans eşitlenir.',
    ] },
    { h: 'Frekansla değişim', p: [
      'Kondansatör doğru akımda (frekans sıfıra yaklaşırken) çok büyük reaktans gösterir ve akımı fiilen keser; frekans yükseldikçe neredeyse kısa devre gibi davranır. Kuplaj kondansatörlerinin doğru akımı engelleyip ses işaretini geçirmesi bu yüzdendir. Bobin tam tersidir: doğru akımda yalnızca telinin direncini gösterir, yüksek frekansta ise akımı güçlü biçimde sınırlar. Parazit bastırma bobinleri (şok bobinleri) bu özelliği kullanır.',
      'Frekans iki katına çıktığında X<sub>L</sub> iki katına çıkar, X<sub>C</sub> yarıya iner. Aynı şekilde kapasiteyi iki katına çıkarmak X<sub>C</sub>\'yi yarıya indirir, endüktansı iki katına çıkarmak X<sub>L</sub>\'yi iki katına çıkarır.',
    ] },
    { h: 'Net reaktans ve rezonans', p: [
      'Seri bağlı bir bobin ve kondansatörde reaktanslar birbirinden çıkarılır, çünkü birinin gerilimi akımdan 90° ileride, diğerininki 90° geridedir. <strong>X = X<sub>L</sub> − X<sub>C</sub></strong> pozitifse devre endüktif, negatifse kapasitif karakterdedir. İki reaktansın eşit olduğu frekansa rezonans frekansı denir: <strong>f<sub>0</sub> = 1 ÷ (2π√(LC))</strong>. Bu noktada net reaktans sıfırdır ve seri devrenin empedansı yalnızca dirençten ibaret kalır.',
      'Net reaktansı dirençle birleştirip toplam empedansı ve faz açısını bulmak için empedans hesaplama aracını kullanabilirsiniz.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 µF, 50 Hz:</strong> yaklaşık 3,18 kΩ',
      '<strong>1 µF, 1 kHz:</strong> yaklaşık 159 Ω',
      '<strong>100 nF, 1 kHz:</strong> yaklaşık 1,59 kΩ',
      '<strong>10 pF, 100 MHz:</strong> yaklaşık 159 Ω',
      '<strong>1 H, 50 Hz:</strong> yaklaşık 314 Ω',
      '<strong>1 mH, 100 kHz:</strong> yaklaşık 628 Ω',
      '<strong>10 µH, 1 MHz:</strong> yaklaşık 62,8 Ω',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Hesap ideal elemanları ve sinüs biçimli işareti varsayar. Gerçek kondansatörlerin eşdeğer seri direnci ve bacak endüktansı, gerçek bobinlerin ise tel direnci ve sarımlar arası kapasitesi vardır; bu etkiler özellikle yüksek frekanslarda sonucu değiştirir. Şebeke gerilimiyle çalışan devrelerde (örneğin kondansatörlü gerilim düşürücüler) hesap tek başına yeterli değildir; eleman gerilim sınıfı ve güvenlik kuralları için bir elektrik-elektronik mühendisine danışın. Sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['Kapasitif reaktans formülü nedir?', 'X<sub>C</sub> = 1 ÷ (2π · f · C) formülüyle hesaplanır. Frekans hertz, kapasite farad cinsinden alınır ve sonuç ohm çıkar. Frekans ya da kapasite arttıkça reaktans azalır.'],
    ['Endüktif reaktans formülü nedir?', 'X<sub>L</sub> = 2π · f · L formülüyle hesaplanır. Frekans hertz, endüktans henri cinsindendir. Frekans ya da endüktans arttıkça reaktans doğru orantılı olarak artar.'],
    ['Reaktans ile empedans aynı şey midir?', 'Hayır. Reaktans yalnızca kondansatör ve bobinin frekansa bağlı karşı koymasıdır. Empedans ise direnç ile net reaktansın birlikte oluşturduğu toplam karşı koymadır ve Z = √(R² + X²) ile bulunur.'],
    ['Doğru akımda kondansatörün reaktansı ne olur?', 'Frekans sıfır olduğunda formül sonsuza gider; yani ideal kondansatör kararlı durumda doğru akımı geçirmez. Araç frekans olarak sıfır kabul etmez, çünkü reaktans kavramı alternatif akım için tanımlıdır.'],
    ['Neden yalnızca birini doldurmam yeterli?', 'İki reaktans birbirinden bağımsız hesaplanır. Yalnızca kondansatörle ilgileniyorsanız endüktansı boş bırakın. İkisini de girerseniz araç ayrıca seri bağlantıdaki net reaktansı ve rezonans frekansını ekler.'],
    ['Net reaktans satırındaki "kapasitif" ve "endüktif" ne anlama geliyor?', 'Seri devrede hangi elemanın baskın olduğunu gösterir. X<sub>L</sub> büyükse devre endüktiftir ve akım gerilimden geride kalır; X<sub>C</sub> büyükse devre kapasitiftir ve akım gerilimin önündedir.'],
    ['Reaktans güç harcar mı?', 'İdeal kondansatör ve bobin ortalama olarak güç harcamaz; enerjiyi depolar ve geri verir. Bu alışverişe reaktif güç denir ve birimi VAr\'dır. Gerçek elemanlardaki küçük kayıplar iç dirençlerinden kaynaklanır.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız frekans ve eleman değerleri bir sunucuya gönderilmez.'],
  ],
  related: ['empedans-hesapla', 'lc-rezonans-frekansi-hesapla', 'rc-filtre-kesim-frekansi-hesapla', 'bobin-enduktans-hesapla', 'guc-faktoru-hesapla', 'kondansator-kodu-coz'],
};
