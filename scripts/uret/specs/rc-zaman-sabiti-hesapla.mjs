export default {
  slug: 'rc-zaman-sabiti-hesapla',
  title: 'RC Zaman Sabiti Hesaplama',
  h1Tail: 'τ = R × C, dolma ve boşalma süresi',
  pageTitle: 'RC Zaman Sabiti Hesaplama – Kondansatör Dolma Süresi (τ = RC)',
  description: 'Direnç ve kondansatör değerinden RC zaman sabitini (τ) hesaplayın. 5τ tam dolma süresini, yarı gerilime ulaşma süresini ve kesim frekansını da gösterir.',
  card: 'Direnç ve kapasiteden RC zaman sabitini, kondansatörün dolma süresini ve kesim frekansını hesaplayın.',
  category: 'elektrik',
  keywords: ['rc zaman sabiti hesaplama', 'kondansatör dolma süresi', 'tau hesaplama', 'τ = RC', 'kondansatör şarj süresi', 'rc devresi', 'kondansatör boşalma süresi'],
  lead: 'Bir direnç ve bir kondansatörden oluşan RC devresinin <strong>zaman sabitini</strong> (τ, tau) hesaplayın. Araç kondansatörün ne kadar sürede dolacağını ya da boşalacağını, devrenin kesim frekansını ve isterseniz belirli anlardaki gerilimi verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'direnc', label: 'Direnç', type: 'number', placeholder: 'Örn. 10' },
    { id: 'direncBirim', label: 'Direnç birimi', type: 'select', options: [['1000', 'Kiloohm (kΩ)'], ['1', 'Ohm (Ω)'], ['1000000', 'Megaohm (MΩ)']] },
    { id: 'kapasite', label: 'Kapasite', type: 'number', placeholder: 'Örn. 100' },
    { id: 'kapBirim', label: 'Kapasite birimi', type: 'select', options: [['uF', 'Mikrofarad (µF)'], ['nF', 'Nanofarad (nF)'], ['pF', 'Pikofarad (pF)'], ['mF', 'Milifarad (mF)'], ['F', 'Farad (F)']] },
    { id: 'gerilim', label: 'Kaynak gerilimi (V, isteğe bağlı)', type: 'number', placeholder: 'Örn. 12' },
  ],
  compute(v, h) {
    const carpanlar = { pF: 1e-12, nF: 1e-9, uF: 1e-6, mF: 1e-3, F: 1 };
    const r = h.pos(v.direnc, 'Direnç') * (Number(v.direncBirim) || 1000);
    const c = h.pos(v.kapasite, 'Kapasite') * (carpanlar[v.kapBirim] || 1e-6);
    const tau = r * c;
    const sure = (t) => {
      if (t < 0.9999999e-6) return h.sig(t * 1e9, 6) + ' ns';
      if (t < 0.9999999e-3) return h.sig(t * 1e6, 6) + ' µs';
      if (t < 0.9999999) return h.sig(t * 1e3, 6) + ' ms';
      return h.sig(t, 6) + ' s';
    };
    const fc = 1 / (2 * Math.PI * tau);
    const frekans = fc >= 999999.5 ? h.sig(fc / 1e6, 6) + ' MHz' : fc >= 999.9995 ? h.sig(fc / 1e3, 6) + ' kHz' : h.sig(fc, 6) + ' Hz';
    const rows = [
      ['Zaman sabiti (τ)', sure(tau)],
      ['Yarı gerilime ulaşma süresi', sure(tau * Math.LN2)],
      ['Tam dolma süresi (5τ)', sure(5 * tau)],
      ['Kesim frekansı', frekans],
    ];
    const u = h.opt(v.gerilim, null, 'Kaynak gerilimi');
    if (u !== null) {
      if (!(u > 0)) h.err('"Kaynak gerilimi" sıfırdan büyük olmalı.');
      rows.push(['1τ sonunda gerilim', h.fmt(u * (1 - Math.exp(-1)), 3) + ' V']);
      rows.push(['5τ sonunda gerilim', h.fmt(u * (1 - Math.exp(-5)), 3) + ' V']);
      rows.push(['İlk şarj akımı', h.sig((u / r) * 1000, 6) + ' mA']);
    }
    return { rows, note: 'Dolma: V(t) = V × (1 − e^(−t/τ)); boşalma: V(t) = V × e^(−t/τ). 1τ sonunda %63,2, 5τ sonunda %99,3 dolmuş olur.' };
  },
  cases: [
    { in: { direnc: '10', direncBirim: '1000', kapasite: '100', kapBirim: 'uF' }, out: { 'Zaman sabiti (τ)': '1 s', 'Yarı gerilime ulaşma süresi': '693,147 ms', 'Tam dolma süresi (5τ)': '5 s', 'Kesim frekansı': '0,159155 Hz' } },
    { in: { direnc: '1', direncBirim: '1000', kapasite: '1', kapBirim: 'uF' }, out: { 'Zaman sabiti (τ)': '1 ms', 'Tam dolma süresi (5τ)': '5 ms', 'Kesim frekansı': '159,155 Hz' } },
    { in: { direnc: '10', direncBirim: '1000', kapasite: '100', kapBirim: 'uF', gerilim: '12' }, out: { 'Zaman sabiti (τ)': '1 s', '1τ sonunda gerilim': '7,585 V', '5τ sonunda gerilim': '11,919 V', 'İlk şarj akımı': '1,2 mA' } },
    { in: { direnc: '4,7', direncBirim: '1000', kapasite: '100', kapBirim: 'nF' }, out: { 'Zaman sabiti (τ)': '470 µs', 'Tam dolma süresi (5τ)': '2,35 ms', 'Kesim frekansı': '338,628 Hz' } },
    { in: { direnc: '1', direncBirim: '1000000', kapasite: '1', kapBirim: 'uF' }, out: { 'Zaman sabiti (τ)': '1 s' } },
    { in: { direnc: '1', direncBirim: '1000', kapasite: '1', kapBirim: 'nF' }, out: { 'Zaman sabiti (τ)': '1 µs', 'Tam dolma süresi (5τ)': '5 µs', 'Kesim frekansı': '159,155 kHz' } },
    { in: { direnc: '100', direncBirim: '1', kapasite: '2200', kapBirim: 'uF', gerilim: '5' }, out: { 'Zaman sabiti (τ)': '220 ms', 'Tam dolma süresi (5τ)': '1,1 s', 'İlk şarj akımı': '50 mA' } },
    { in: { direnc: '0', direncBirim: '1000', kapasite: '100', kapBirim: 'uF' }, error: true },
    { in: { direnc: '10', direncBirim: '1000', kapasite: '', kapBirim: 'uF' }, error: true },
    { in: { direnc: '10', direncBirim: '1000', kapasite: '-1', kapBirim: 'uF' }, error: true },
  ],
  howto: [
    'Kondansatöre seri bağlı direncin değerini yazın ve birimini seçin (varsayılan kiloohm).',
    'Kondansatörün kapasitesini yazın ve birimini seçin (varsayılan mikrofarad).',
    'Belirli anlardaki gerilimi ve ilk şarj akımını da görmek istiyorsanız kaynak gerilimini volt olarak girin; gerekmiyorsa boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satır zaman sabitini, sonraki satırlar yarı gerilime ulaşma ve tam dolma sürelerini verir.',
    '"Kesim frekansı" satırı, aynı direnç ve kondansatörle kurulan basit bir RC filtresinin köşe frekansını gösterir.',
  ],
  sections: [
    { h: 'RC zaman sabiti nedir?', p: [
      'Bir kondansatör bir direnç üzerinden doldurulduğunda gerilimi bir anda yükselmez; önce hızlı, sonra giderek yavaşlayan bir eğri izler. Bu eğrinin ne kadar hızlı ya da yavaş olduğunu tek bir sayı belirler: <strong>zaman sabiti</strong>. Yunan harfi τ (tau) ile gösterilir ve direnç ile kapasitenin çarpımına eşittir: <strong>τ = R × C</strong>. Direnç ohm, kapasite farad alındığında sonuç saniye çıkar.',
      'Zaman sabitinin anlamı şudur: boş bir kondansatör, bir τ kadar süre sonunda kaynak geriliminin yaklaşık <strong>yüzde 63,2</strong>\'sine ulaşır. Boşalırken de aynı sürede geriliminin yüzde 63,2\'sini kaybeder, yani başlangıç değerinin yüzde 36,8\'ine iner. Direnç büyüdükçe akım azalır, kapasite büyüdükçe doldurulacak "depo" büyür; her iki durumda da süre uzar.',
    ] },
    { h: 'Dolma ve boşalma denklemleri', p: [
      'Dolma sırasında kondansatör gerilimi <strong>V(t) = V × (1 − e<sup>−t/τ</sup>)</strong>, boşalma sırasında <strong>V(t) = V × e<sup>−t/τ</sup></strong> bağıntısına uyar. Buradaki e, yaklaşık 2,718 değerindeki doğal logaritma tabanıdır. Akım ise dolmanın ilk anında en yüksektir (V ÷ R) ve aynı üstel eğriyle sıfıra doğru azalır.',
      'Kuramsal olarak kondansatör hiçbir zaman tam dolmaz; eğri kaynak gerilimine sonsuza kadar yaklaşır. Uygulamada <strong>5τ</strong> süre "tam dolu" kabul edilir, çünkü bu noktada gerilim kaynağın yüzde 99,3\'üne ulaşmıştır.',
    ], ul: [
      '1τ → %63,2',
      '2τ → %86,5',
      '3τ → %95,0',
      '4τ → %98,2',
      '5τ → %99,3',
      'Yarı gerilim (%50) → 0,693τ',
    ] },
    { h: 'Çözümlü örnek', p: [
      '10 kΩ direnç ve 100 µF kondansatör alalım. τ = 10.000 Ω × 0,0001 F = 1 saniye. Kondansatör 5 saniyede dolmuş kabul edilir; yarı gerilime 0,693 saniyede (693 ms) ulaşır.',
      'Kaynak 12 V ise bir saniye sonunda kondansatör gerilimi 12 × 0,632 = 7,585 V, beş saniye sonunda 12 × 0,99326 = 11,919 V olur. Anahtarın kapandığı anda kondansatör boş olduğundan bütün gerilim direncin üzerindedir ve akım 12 ÷ 10.000 = 1,2 mA\'dir.',
      'Daha küçük değerlerle: 4,7 kΩ ve 100 nF için τ = 4.700 × 0,0000001 = 0,00047 s, yani 470 µs; tam dolma 2,35 ms sürer.',
    ] },
    { h: 'Kesim frekansı ile ilişkisi', p: [
      'Aynı direnç ve kondansatör bir filtre olarak kullanıldığında, devrenin sinyali zayıflatmaya başladığı köşe frekansı zaman sabitinden bulunur: <strong>f<sub>c</sub> = 1 ÷ (2π × R × C)</strong>. Bu frekansta çıkış genliği girişin yaklaşık yüzde 70,7\'sine düşer. 1 kΩ ve 1 µF için τ = 1 ms, kesim frekansı 159,155 Hz\'dir. Zaman sabiti büyüdükçe kesim frekansı düşer; devre daha yavaş değişimleri bile süzmeye başlar.',
    ] },
    { h: 'RC devreleri nerelerde kullanılır?', ul: [
      '<strong>Gecikme ve zamanlama:</strong> bir düğmeye basıldıktan sonra rölenin birkaç saniye geç çekmesi, merdiven otomatiği benzeri basit zamanlayıcılar.',
      '<strong>Buton titreşimini giderme:</strong> mekanik butonların kontak sıçramasını yumuşatmak için birkaç milisaniyelik zaman sabiti kullanılır.',
      '<strong>Reset devreleri:</strong> mikrodenetleyicinin besleme oturana kadar reset durumunda tutulması.',
      '<strong>Filtreleme:</strong> PWM sinyalini ortalama bir gerilime çevirmek, sensör hatlarındaki gürültüyü bastırmak.',
      '<strong>Yumuşak kalkış:</strong> gerilimin birden değil kademeli yükselmesini sağlamak.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık hata birim dönüşümüdür: kiloohm ile mikrofaradın çarpımı doğrudan milisaniye verir (10 kΩ × 100 µF = 1.000 ms), megaohm ile mikrofaradın çarpımı ise saniye verir. Araç birimleri sizin yerinize dönüştürdüğü için değerleri kondansatör ve direncin üzerinde yazdığı gibi girebilirsiniz.',
      'Hesap ideal elemanlar içindir. Elektrolitik kondansatörlerin toleransı yüzde 20 dolayında olabilir, kaçak akımları uzun zaman sabitlerinde süreyi belirgin biçimde değiştirir. Kaynağın iç direnci ve kondansatöre bağlı yük de etkili direnci değiştirir. Hassas zamanlama gereken yerlerde RC devresi yerine kristal tabanlı bir zamanlayıcı düşünülmelidir. Sonuçlar bilgilendirme amaçlıdır; şebeke gerilimli ya da güvenlik açısından kritik devrelerde bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['RC zaman sabiti nasıl hesaplanır?', 'Direnç (ohm) ile kapasite (farad) çarpılır: τ = R × C. 10 kΩ ve 100 µF için sonuç 1 saniyedir.'],
    ['Kondansatör kaç zaman sabitinde dolar?', 'Uygulamada 5τ sonunda dolmuş kabul edilir; bu noktada gerilim kaynağın yüzde 99,3\'üne ulaşır.'],
    ['Bir zaman sabiti sonunda kondansatör yüzde kaç dolar?', 'Yaklaşık yüzde 63,2. Boşalırken ise aynı sürede geriliminin yüzde 63,2\'sini kaybeder ve yüzde 36,8\'ine iner.'],
    ['Dolma süresini uzatmak için ne yapmalıyım?', 'Direnci ya da kapasiteyi büyütün. İkisinden birini iki katına çıkarmak zaman sabitini de iki katına çıkarır.'],
    ['Kaynak gerilimi dolma süresini değiştirir mi?', 'Hayır. Zaman sabiti yalnızca direnç ve kapasiteye bağlıdır. Gerilim değişirse ulaşılan değerler değişir, ama yüzde olarak dolma hızı aynı kalır.'],
    ['Boşalma süresi de aynı formülle mi bulunur?', 'Evet. Kondansatör bir direnç üzerinden boşalırken de zaman sabiti R × C\'dir; burada R, boşalma yolundaki dirençtir.'],
    ['Belirli bir gerilime ulaşma süresini nasıl bulurum?', 't = −τ × ln(1 − V<sub>hedef</sub> ÷ V<sub>kaynak</sub>) bağıntısını kullanın. Yarı gerilim için bu 0,693τ eder.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler sunucuya gönderilmez.'],
  ],
  related: ['rc-filtre-kesim-frekansi-hesapla', 'kondansator-enerjisi-hesapla', 'kondansator-seri-paralel-hesapla', '555-zamanlayici-hesapla', 'kondansator-kodu-coz'],
};
