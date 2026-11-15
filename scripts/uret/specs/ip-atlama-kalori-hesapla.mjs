export default {
  slug: 'ip-atlama-kalori-hesapla',
  title: 'İp Atlamada Yakılan Kalori Hesaplama',
  h1Tail: 'süre ve tempoya göre',
  pageTitle: 'İp Atlama Kalori Hesaplama – 10 Dakika İp Atlamak Kaç Kalori?',
  description: 'Kilonuzu, ip atlama sürenizi ve temponuzu girin; yakılan kaloriyi, dakika başına enerjiyi ve yaklaşık atlama sayısını MET yöntemiyle anında hesaplayın.',
  card: 'İp atlarken harcadığınız kaloriyi kilo, süre ve dakikadaki atlama temposuna göre hesaplayın.',
  category: 'saglik',
  keywords: ['ip atlama kalori', 'ip atlamak kaç kalori yakar', '10 dakika ip atlama kalori', '1000 ip atlama kaç kalori', 'ip atlama kalori hesaplama', 'ip atlama zayıflatır mı', 'ip atlama MET'],
  lead: 'İp atlama, kısa sürede yüksek enerji harcatan az sayıdaki egzersizden biridir. Kilonuzu, toplam atlama sürenizi ve temponuzu yazın; araç <strong>yakılan kaloriyi</strong>, dakika başına harcamayı ve yaklaşık atlama sayısını hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sure', label: 'Atlama süresi (dakika)', type: 'number', placeholder: 'Örn. 10', hint: 'Dinlenme aralarını çıkarıp yalnızca ip atladığınız süreyi yazın.' },
    { id: 'tempo', label: 'Tempo', type: 'select', options: [['orta', 'Orta (dakikada 100–120 atlama)'], ['yavas', 'Yavaş (dakikada 100\'den az)'], ['hizli', 'Hızlı (dakikada 120–160 atlama)']] },
  ],
  compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const sure = h.pos(v.sure, 'Atlama süresi');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı.');
    if (sure > 300) h.err('Atlama süresi 300 dakikadan uzun olamaz; süreyi dakika olarak yazın.');
    const tablo = { yavas: [8.8, 80], orta: [11.8, 110], hizli: [12.3, 140] };
    const [met, atlamaDk] = tablo[v.tempo] || tablo.orta;
    const saat = sure / 60;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Dakika başına', h.fmt(kcal / sure, 1) + ' kcal/dk'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Yaklaşık atlama sayısı', h.fmt(atlamaDk * sure, 0) + ' atlama'],
        ['Kullanılan MET değeri', h.fmt(met, 1)],
        ['Yağ eşdeğeri (kuramsal)', h.fmt(kcal / 7700 * 1000, 1) + ' g'],
      ],
      note: `Atlama sayısı dakikada ortalama ${atlamaDk} atlama varsayımıyla tahmin edilir. Teknik, ip türü ve dinlenme araları gerçek harcamayı değiştirir.`,
    };
  },
  cases: [
    { in: { kilo: '70', sure: '10', tempo: 'orta' }, out: { 'Yakılan kalori': '138 kcal', 'Dakika başına': '13,8 kcal/dk', 'Yaklaşık atlama sayısı': '1.100 atlama', 'Kullanılan MET değeri': '11,8' } },
    { in: { kilo: '60', sure: '15', tempo: 'yavas' }, out: { 'Yakılan kalori': '132 kcal', 'Dakika başına': '8,8 kcal/dk', 'Net kalori (dinlenme hariç)': '117 kcal', 'Yaklaşık atlama sayısı': '1.200 atlama' } },
    { in: { kilo: '80', sure: '30', tempo: 'hizli' }, out: { 'Yakılan kalori': '492 kcal', 'Dakika başına': '16,4 kcal/dk', 'Net kalori (dinlenme hariç)': '452 kcal' } },
    { in: { kilo: '100', sure: '60', tempo: 'orta' }, out: { 'Yakılan kalori': '1.180 kcal', 'Yağ eşdeğeri (kuramsal)': '153,2 g' } },
    { in: { kilo: '55', sure: '5', tempo: 'hizli' }, out: { 'Yakılan kalori': '56 kcal', 'Yaklaşık atlama sayısı': '700 atlama' } },
    { in: { kilo: '75', sure: '20', tempo: 'orta' }, out: { 'Yakılan kalori': '295 kcal', 'Dakika başına': '14,8 kcal/dk' } },
    { in: { kilo: '70', sure: '0', tempo: 'orta' }, error: true },
    { in: { kilo: '', sure: '10', tempo: 'orta' }, error: true },
    { in: { kilo: '70', sure: '-5', tempo: 'orta' }, error: true },
  ],
  howto: [
    '"Kilo" alanına vücut ağırlığınızı kilogram olarak yazın.',
    '"Atlama süresi" alanına fiilen ip atladığınız toplam dakikayı girin; setler arasındaki dinlenmeleri saymayın.',
    'Temponuzu seçin. Emin değilseniz 30 saniye boyunca atlamalarınızı sayıp ikiyle çarpın: 100\'ün altı yavaş, 100–120 orta, 120–160 hızlıdır.',
    '"Hesapla" düğmesine basın; toplam kalori, dakika başına harcama, net kalori ve yaklaşık atlama sayısı görünür.',
  ],
  sections: [
    { h: 'Hesaplama yöntemi: MET × kilo × süre', p: [
      'Araç, egzersiz biliminde yaygın kullanılan MET yaklaşımını uygular. MET (metabolik eşdeğer), bir etkinliğin oturarak dinlenmeye kıyasla kaç kat enerji harcattığını ifade eder; 1 MET yaklaşık olarak kilogram başına saatte 1 kcal kabul edilir. Formül şöyledir: <strong>kalori = MET × kilo (kg) × süre (saat)</strong>.',
      'İp atlama için fiziksel aktivite derlemelerinde üç tempo düzeyi tanımlanır: dakikada 100\'den az atlamalı yavaş tempo için <strong>8,8 MET</strong>, dakikada 100–120 atlamalı orta tempo için <strong>11,8 MET</strong>, dakikada 120–160 atlamalı hızlı tempo için <strong>12,3 MET</strong>. Bu değerler ip atlamanın, tempolu koşuyla aynı yoğunluk sınıfında olduğunu gösterir.',
    ] },
    { h: 'Çözümlü örnek: 70 kg, 10 dakika', p: [
      '70 kg ağırlığında biri orta tempoda 10 dakika ip atlasın. Süre saat cinsinden 10 ÷ 60 = 0,1667 saattir. Kalori 11,8 × 70 × 0,1667 = <strong>yaklaşık 138 kcal</strong> bulunur; bu da dakikada 13,8 kcal demektir. Dinlenme harcaması çıkarıldığında net değer 10,8 × 70 × 0,1667 = yaklaşık 126 kcal olur. Dakikada ortalama 110 atlama varsayımıyla bu sürede yaklaşık 1.100 atlama yapılmış olur.',
      'Aynı kişi hızlı tempoya geçerse 10 dakikalık harcama 12,3 × 70 × 0,1667 = yaklaşık 144 kcal\'ye çıkar. Orta ile hızlı tempo arasındaki fark küçüktür; yavaş tempodan orta tempoya geçişteki sıçrama ise belirgindir (103 kcal\'den 138 kcal\'ye).',
    ] },
    { h: '1.000 atlama kaç kalori eder?', p: [
      'Sık sorulan bu sorunun cevabı tempoya ve kiloya bağlıdır. Orta tempoda dakikada yaklaşık 110 atlama yapıldığı düşünülürse 1.000 atlama kabaca 9 dakika sürer. 70 kg bir kişi için bu 11,8 × 70 × (9,09 ÷ 60) = yaklaşık 125 kcal eder. Hızlı tempoda dakikada 140 atlamayla 1.000 atlama 7 dakikanın biraz üzerinde biter ve aynı kişi için yaklaşık 102 kcal harcanır; yani aynı atlama sayısı daha kısa sürdüğü için toplam enerji biraz düşer.',
      'Atlama sayısıyla hedef koyuyorsanız süreyi de not edin; kalori hesabı için belirleyici olan süre ve yoğunluktur.',
    ] },
    { h: 'Tempoya göre 10 dakikalık harcama', ul: [
      '<strong>60 kg</strong>: yavaş 88 kcal, orta 118 kcal, hızlı 123 kcal',
      '<strong>70 kg</strong>: yavaş 103 kcal, orta 138 kcal, hızlı 144 kcal',
      '<strong>80 kg</strong>: yavaş 117 kcal, orta 157 kcal, hızlı 164 kcal',
      '<strong>90 kg</strong>: yavaş 132 kcal, orta 177 kcal, hızlı 185 kcal',
    ] },
    { h: 'Sonucu doğru okumak', p: [
      'MET katsayıları kesintisiz atlama içindir. Yeni başlayanlar ipe sık takılır ve gerçek atlama süresi antrenman süresinin yarısına kadar düşebilir; bu yüzden süre alanına yalnızca fiilen atladığınız dakikaları yazmak önemlidir. Çift atlama, çapraz atlama ve ağırlıklı ip gibi çeşitlemeler harcamayı artırır, ancak araç bunlar için ayrı katsayı kullanmaz.',
      '"Yağ eşdeğeri" satırı, harcanan enerjinin kuramsal olarak kaç gram vücut yağına karşılık geldiğini gösterir (1 kg için yaklaşık 7.700 kcal). Bu, o kadar yağ yaktığınız anlamına gelmez; vücut egzersiz sırasında karbonhidrat ve yağı birlikte kullanır ve kilo değişimini günlük toplam enerji dengesi belirler.',
    ] },
    { h: 'Güvenli ip atlama için kısa notlar', p: [
      'İp atlama tekrarlı sıçrama içerdiği için ayak bileği, diz ve baldır üzerinde yük oluşturur. Beton yerine ahşap zemin, kauçuk mat ya da spor salonu zemini tercih edin; darbe emen bir spor ayakkabı kullanın. Yeni başlıyorsanız 30 saniye atlama ve 30 saniye dinlenme gibi kısa aralıklarla ilerleyin ve toplam süreyi haftadan haftaya artırın.',
      'Bu sayfadaki değerler bilgilendirme amaçlı tahminlerdir. Kalp-damar hastalığı, yüksek tansiyon, eklem sorunu ya da fazla kilo nedeniyle sıçramalı egzersiz konusunda tereddüdünüz varsa başlamadan önce hekiminize danışın.',
    ] },
  ],
  faq: [
    ['10 dakika ip atlamak kaç kalori yakar?', '70 kg bir kişi için orta tempoda yaklaşık 138 kcal, yavaş tempoda 103 kcal, hızlı tempoda 144 kcal harcanır. Kilo arttıkça değer aynı oranda artar; 90 kg bir kişi orta tempoda yaklaşık 177 kcal harcar.'],
    ['İp atlama mı koşu mu daha çok kalori yakar?', 'Orta tempoda ip atlamanın MET değeri 11,8\'dir; bu, saatte yaklaşık 11–12 km hızla koşmaya yakın bir yoğunluktur. Ancak çoğu kişi ipi koşu kadar uzun süre kesintisiz sürdüremez; toplam harcamayı süre belirler.'],
    ['Dakikada kaç atlama yaptığımı nasıl anlarım?', 'Bir kronometre kurup 30 saniye boyunca atlamalarınızı sayın ve ikiyle çarpın. Sonuç 100\'ün altındaysa yavaş, 100–120 arasındaysa orta, 120–160 arasındaysa hızlı tempoyu seçin.'],
    ['Araçtaki atlama sayısı kesin midir?', 'Hayır, tahmindir. Yavaş tempoda dakikada 80, orta tempoda 110, hızlı tempoda 140 atlama varsayılır. Kendi sayımınız varsa onu esas alın; kalori hesabı atlama sayısından değil süre ve tempodan yapılır.'],
    ['Her gün ip atlamak zayıflatır mı?', 'İp atlama enerji harcamasını artırır, ancak kilo kaybı günlük alınan ve harcanan enerjinin dengesine bağlıdır. Beslenme düzeni değişmeden yalnızca egzersizle beklenen sonuç alınamayabilir. Kişisel hedef için bir uzmana danışmak yararlıdır.'],
    ['Net kalori ne anlama geliyor?', 'Toplam harcamadan, o sürede dinlenirken de harcayacağınız enerji çıkarılarak bulunur. Kalori açığı planı yapıyorsanız net değeri kullanmak daha temkinli bir yaklaşımdır.'],
    ['Ağırlıklı iple atlarsam hesap değişir mi?', 'Ağırlıklı ip, kol ve omuz kaslarını daha çok çalıştırdığı için harcamayı bir miktar artırır; ancak araçta bunun için ayrı katsayı yoktur. Sonucu alt sınır olarak değerlendirebilirsiniz.'],
    ['Yazdığım kilo bilgisi bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; kilo ve süre bilgileri sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['met-kalori-hesapla', 'kosu-kalori-hesapla', 'merdiven-kalori-hesapla', 'kalori-acigi-hesapla', 'yag-yakim-bolgesi-hesapla'],
};
