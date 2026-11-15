export default {
  slug: 'kondansator-enerjisi-hesapla',
  title: 'Kondansatör Enerjisi Hesaplama',
  h1Tail: 'depolanan enerji ve yük',
  pageTitle: 'Kondansatör Enerjisi Hesaplama – E = ½ C V² ile Joule',
  description: 'Kapasite ve gerilimden kondansatörde depolanan enerjiyi joule olarak hesaplayın. Elektrik yükünü (coulomb) ve watt-saat karşılığını da gösterir.',
  card: 'Kapasite ve gerilimi yazın; kondansatörde depolanan enerjiyi (joule), yükü ve watt-saat karşılığını görün.',
  category: 'elektrik',
  keywords: ['kondansatör enerjisi hesaplama', 'kondansatörde depolanan enerji', 'kapasitör joule hesaplama', 'E = 1/2 CV2', 'kondansatör yükü hesaplama', 'süper kapasitör enerji', 'Q = CV'],
  lead: 'Dolu bir kondansatörün içinde ne kadar enerji bulunduğunu hesaplayın. Kapasiteyi ve uçlarındaki gerilimi yazın; araç <strong>E = ½ × C × V²</strong> bağıntısıyla enerjiyi, <strong>Q = C × V</strong> ile de depolanan yükü verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kapasite', label: 'Kapasite', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'birim', label: 'Kapasite birimi', type: 'select', options: [['uF', 'Mikrofarad (µF)'], ['nF', 'Nanofarad (nF)'], ['pF', 'Pikofarad (pF)'], ['mF', 'Milifarad (mF)'], ['F', 'Farad (F)']] },
    { id: 'gerilim', label: 'Gerilim (V)', type: 'number', placeholder: 'Örn. 12' },
  ],
  compute(v, h) {
    const carpanlar = { pF: 1e-12, nF: 1e-9, uF: 1e-6, mF: 1e-3, F: 1 };
    const c = h.pos(v.kapasite, 'Kapasite') * (carpanlar[v.birim] || 1e-6);
    const u = h.pos(v.gerilim, 'Gerilim');
    const enerji = 0.5 * c * u * u;
    const yuk = c * u;
    const olcekle = (x, birim) => {
      if (x < 0.9999999e-6) return h.sig(x * 1e9, 6) + ' n' + birim;
      if (x < 0.9999999e-3) return h.sig(x * 1e6, 6) + ' µ' + birim;
      if (x < 0.9999999) return h.sig(x * 1e3, 6) + ' m' + birim;
      if (x < 999.99995) return h.sig(x, 6) + ' ' + birim;
      return h.sig(x / 1000, 6) + ' k' + birim;
    };
    return {
      rows: [
        ['Depolanan enerji', olcekle(enerji, 'J')],
        ['Enerji (joule)', h.sig(enerji, 6) + ' J'],
        ['Depolanan yük', olcekle(yuk, 'C')],
        ['Watt-saat karşılığı', h.sig(enerji / 3600, 6) + ' Wh'],
        ['Gerilim yarıya inince kalan enerji', olcekle(enerji / 4, 'J')],
      ],
      note: 'İdeal kondansatör varsayılmıştır. Enerji gerilimin karesiyle değişir; gerilim yarıya indiğinde enerjinin dörtte üçü harcanmış olur.',
    };
  },
  cases: [
    { in: { kapasite: '1000', birim: 'uF', gerilim: '12' }, out: { 'Depolanan enerji': '72 mJ', 'Enerji (joule)': '0,072 J', 'Depolanan yük': '12 mC', 'Gerilim yarıya inince kalan enerji': '18 mJ' } },
    { in: { kapasite: '470', birim: 'uF', gerilim: '400' }, out: { 'Depolanan enerji': '37,6 J', 'Depolanan yük': '188 mC' } },
    { in: { kapasite: '1', birim: 'F', gerilim: '5' }, out: { 'Depolanan enerji': '12,5 J', 'Depolanan yük': '5 C' } },
    { in: { kapasite: '100', birim: 'nF', gerilim: '5' }, out: { 'Depolanan enerji': '1,25 µJ', 'Depolanan yük': '500 nC' } },
    { in: { kapasite: '3000', birim: 'F', gerilim: '2,7' }, out: { 'Depolanan enerji': '10,935 kJ', 'Enerji (joule)': '10.935 J', 'Watt-saat karşılığı': '3,0375 Wh', 'Depolanan yük': '8,1 kC' } },
    { in: { kapasite: '10', birim: 'uF', gerilim: '100' }, out: { 'Depolanan enerji': '50 mJ', 'Enerji (joule)': '0,05 J', 'Depolanan yük': '1 mC' } },
    { in: { kapasite: '2', birim: 'mF', gerilim: '10' }, out: { 'Depolanan enerji': '100 mJ', 'Depolanan yük': '20 mC' } },
    { in: { kapasite: '0', birim: 'uF', gerilim: '12' }, error: true },
    { in: { kapasite: '100', birim: 'uF', gerilim: '' }, error: true },
    { in: { kapasite: 'on', birim: 'uF', gerilim: '12' }, error: true },
  ],
  howto: [
    'Kondansatörün üzerinde yazan kapasite değerini "Kapasite" alanına girin.',
    'Kapasitenin birimini seçin. Elektrolitik kondansatörlerde değer çoğunlukla mikrofarad, süper kapasitörlerde farad olarak yazılır.',
    '"Gerilim" alanına kondansatörün şarj edildiği gerilimi yazın. Bu, gövdedeki anma gerilimi değil, uçlarında gerçekten bulunan gerilim olmalıdır.',
    '"Hesapla" düğmesine basın. Depolanan enerji en uygun birimde, ayrıca joule ve watt-saat olarak gösterilir.',
    '"Depolanan yük" satırından kondansatörün plakalarında biriken elektrik yükünü coulomb cinsinden okuyun.',
  ],
  sections: [
    { h: 'Kondansatör enerjiyi nasıl depolar?', p: [
      'Kondansatör, aralarında yalıtkan bulunan iki iletken plakadan oluşur. Uçlarına gerilim uygulandığında bir plakada artı, diğerinde eksi yük birikir ve plakalar arasında bir elektrik alanı oluşur. Enerji bu alanın içinde depolanır. Pilden farklı olarak kimyasal bir tepkime yoktur; bu yüzden kondansatör çok hızlı dolup boşalabilir, ama aynı hacimdeki bir pile göre çok daha az enerji tutar.',
      'Depolanan yük gerilimle doğru orantılıdır: <strong>Q = C × V</strong>. Kapasite (C), bir voltluk gerilim başına kaç coulomb yük depolandığını söyler; 1 farad, 1 voltta 1 coulomb demektir.',
    ] },
    { h: 'Enerji formülü ve karesel ilişki', p: [
      'Kondansatörde depolanan enerji <strong>E = ½ × C × V²</strong> bağıntısıyla bulunur. C farad, V volt alındığında sonuç joule çıkar. Aynı enerji yük cinsinden E = ½ × Q × V ya da E = Q² ÷ (2 × C) biçiminde de yazılabilir.',
      'Formüldeki yarım çarpanı şaşırtıcı gelebilir. Nedeni şudur: kondansatör dolarken gerilimi sıfırdan başlayıp yavaş yavaş yükselir; ilk yükler neredeyse hiç iş yapılmadan, son yükler ise tam gerilime karşı taşınır. Ortalama gerilim son gerilimin yarısıdır.',
      'Gerilimin karesinin alınması pratikte çok önemlidir. Gerilimi iki katına çıkarmak enerjiyi <strong>dört katına</strong> çıkarır. Tersinden bakıldığında, kondansatör boşalırken gerilim yarıya indiğinde enerjinin yalnızca dörtte biri kalmıştır; yani dörtte üçü çoktan kullanılmıştır. Araç bu değeri son satırda ayrıca gösterir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1.000 µF\'lık bir kondansatör 12 V\'a şarj edilmiş. C = 0,001 F. Enerji: 0,5 × 0,001 × 12² = 0,5 × 0,001 × 144 = 0,072 J, yani 72 mJ. Yük: 0,001 × 12 = 0,012 C, yani 12 mC. Gerilim 6 V\'a düştüğünde kalan enerji 18 mJ\'dür.',
      '<strong>Örnek 2:</strong> Bir güç kaynağının giriş katındaki 470 µF, 400 V\'luk kondansatör tam dolu olsun. Enerji: 0,5 × 0,00047 × 400² = 0,5 × 0,00047 × 160.000 = 37,6 J. Bu, insan için ciddi biçimde tehlikeli bir enerji düzeyidir; cihazın fişi çekildikten sonra bile kondansatör bu yükü bir süre tutabilir.',
      '<strong>Örnek 3:</strong> 3.000 F, 2,7 V\'luk bir süper kapasitör: 0,5 × 3.000 × 2,7² = 0,5 × 3.000 × 7,29 = 10.935 J. Watt-saate çevirmek için 3.600\'e bölünür: 3,0375 Wh.',
    ] },
    { h: 'Joule, watt-saat ve gündelik karşılaştırmalar', p: [
      'Joule, bir wattlık gücün bir saniyede harcadığı enerjidir. 1 watt-saat 3.600 joule eder. Bu dönüşüm, kondansatörleri pillerle kıyaslarken işe yarar, çünkü pillerin kapasitesi genellikle watt-saat ya da miliamper-saat olarak verilir. Örnek 3\'teki büyük süper kapasitör yaklaşık 3 Wh enerji tutar; bu, sıradan bir telefon bataryasının taşıdığı enerjiden belirgin biçimde azdır. Kondansatörlerin üstünlüğü enerji miktarı değil, bu enerjiyi çok kısa sürede verebilmeleri ve çok sayıda dolma-boşalma döngüsüne dayanmalarıdır.',
      'Fotoğraf flaşları, nokta kaynak makineleri, defibrilatörler ve motor kalkış devreleri bu özellikten yararlanır: enerji yavaşça biriktirilir, sonra bir anda boşaltılır.',
    ] },
    { h: 'Hesapta dikkat edilecek noktalar', ul: [
      '<strong>Birim:</strong> formül farad ister. 1 µF = 0,000001 F. Mikrofaradı farad sanmak sonucu bir milyon kat büyütür; araçta birimi doğru seçmek bu hatayı önler.',
      '<strong>Gerçek gerilim:</strong> gövdede yazan değer kondansatörün dayanabileceği en yüksek gerilimdir. Hesaba devredeki gerçek gerilimi yazın.',
      '<strong>Kullanılabilir enerji:</strong> bir devre genellikle belirli bir gerilimin altında çalışmaz. Kondansatör 12 V\'tan 6 V\'a kadar kullanılabiliyorsa yararlanılan enerji toplamın dörtte üçüdür.',
      '<strong>Tolerans:</strong> elektrolitik kondansatörlerde yüzde 20 kapasite toleransı yaygındır; enerji de aynı oranda sapabilir.',
      '<strong>Kayıplar:</strong> iç direnç (ESR) ve kaçak akım nedeniyle depolanan enerjinin tamamı yüke aktarılamaz.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'Yüksek gerilimli ya da büyük kapasiteli kondansatörler, cihaz kapatıldıktan sonra da öldürücü olabilecek enerji taşıyabilir. Mikrodalga fırın, eski tüplü televizyon, flaş devresi, sürücü ve güç kaynağı kondansatörlerine boşaltılmadan dokunulmamalıdır. Uçları tornavidayla kısa devre etmek hem kondansatöre hem kişiye zarar verebilir; boşaltma uygun değerde ve güçte bir dirençle yapılır.',
      'Bu sayfadaki hesap ideal kondansatör varsayımıyla yapılır ve bilgilendirme amaçlıdır. Yüksek enerjili devrelerde tasarım ve bakım için yetkili bir elektrik ya da elektronik uzmanına başvurun.',
    ] },
  ],
  faq: [
    ['Kondansatörde depolanan enerji nasıl hesaplanır?', 'Kapasite (farad) ile gerilimin karesi çarpılır ve ikiye bölünür: E = ½ × C × V². 1.000 µF ve 12 V için sonuç 0,072 joule\'dür.'],
    ['Gerilim iki katına çıkarsa enerji ne olur?', 'Dört katına çıkar, çünkü enerji gerilimin karesiyle orantılıdır. Kapasiteyi iki katına çıkarmak ise enerjiyi yalnızca iki kat artırır.'],
    ['Kondansatörün yükü nasıl bulunur?', 'Q = C × V bağıntısıyla. 1.000 µF\'lık kondansatör 12 V\'ta 0,012 coulomb, yani 12 milicoulomb yük depolar.'],
    ['Joule\'ü watt-saate nasıl çeviririm?', 'Joule değerini 3.600\'e bölün. 10.935 J, 3,0375 Wh eder. Araç bu dönüşümü kendiliğinden yapar.'],
    ['Kondansatör pil yerine kullanılabilir mi?', 'Kısa süreli yedekleme ve ani güç ihtiyaçları için evet; uzun süreli besleme için genellikle hayır. Aynı boyuttaki bir pile göre çok daha az enerji depolar ve boşaldıkça gerilimi sürekli düşer.'],
    ['Gövdede yazan gerilimi mi yazmalıyım?', 'Hayır, kondansatörün devrede gerçekten şarj olduğu gerilimi yazın. Gövdedeki değer üst sınırdır; 25 V\'luk bir kondansatör 12 V\'luk devrede 12 V\'a göre enerji depolar.'],
    ['Kondansatör neden kapatıldıktan sonra da çarpar?', 'Boşalma yolu yoksa yükünü uzun süre tutabilir. Birçok cihazda boşaltma dirençleri bulunur, ancak arızalı ya da bu dirençleri olmayan devrelerde kondansatör dolu kalabilir.'],
    ['Girdiğim veriler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir değer sunucuya gönderilmez.'],
  ],
  related: ['kondansator-seri-paralel-hesapla', 'rc-zaman-sabiti-hesapla', 'kondansator-kodu-coz', 'elektrik-gucu-hesapla', 'mah-wh-cevir'],
};
