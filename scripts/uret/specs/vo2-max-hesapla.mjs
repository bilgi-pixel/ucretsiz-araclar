export default {
  slug: 'vo2-max-hesapla',
  title: 'VO2 Max Hesaplama',
  h1Tail: 'Cooper testi, 2,4 km koşu ve nabız yöntemi',
  pageTitle: 'VO2 Max Hesaplama – Cooper Testi ve Nabız Yöntemiyle',
  description: 'VO2 max değerinizi 12 dakikalık Cooper testi, 2,4 km koşu süresi ya da maksimum ve dinlenme nabzı oranıyla tahmin edin. Sonuç ml/kg/dk ve MET olarak verilir.',
  card: 'VO2 max değerinizi Cooper testi, 2,4 km koşu süresi ya da nabız oranı yöntemiyle tahmin edin.',
  category: 'saglik',
  keywords: ['vo2 max hesaplama', 'cooper testi hesaplama', 'maksimum oksijen tüketimi', 'vo2 max nedir', '12 dakika koşu testi', 'aerobik kapasite hesaplama', 'vo2max formülü'],
  lead: `Laboratuvara gitmeden aerobik kapasitenizi tahmin edin. Üç saha yönteminden birini seçin: 12 dakikada koştuğunuz mesafe (Cooper testi), 2,4 kilometreyi koşma süreniz ya da maksimum ve dinlenme nabzınızın oranı. Araç <strong>VO<sub>2</sub> max</strong> değerini ml/kg/dk olarak hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Yöntem', type: 'select', options: [['cooper', 'Cooper testi (12 dakikada koşulan mesafe)'], ['kosu', '2,4 km koşu süresi'], ['nabiz', 'Nabız oranı (maksimum ÷ dinlenme)']] },
    { id: 'mesafe', label: '12 dakikada koşulan mesafe (metre)', type: 'number', placeholder: 'Örn. 2400', hint: 'Yalnızca Cooper testi için.' },
    { id: 'sure', label: '2,4 km koşu süresi (dakika)', type: 'number', placeholder: 'Örn. 11,5', hint: 'Yalnızca 2,4 km yöntemi için. 11 dk 30 sn = 11,5.' },
    { id: 'maksNabiz', label: 'Maksimum nabız (atım/dk)', type: 'number', placeholder: 'Örn. 185', hint: 'Yalnızca nabız yöntemi için.' },
    { id: 'dinlenmeNabiz', label: 'Dinlenme nabzı (atım/dk)', type: 'number', placeholder: 'Örn. 60', hint: 'Yalnızca nabız yöntemi için.' },
    { id: 'kilo', label: 'Vücut ağırlığı (kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 70', hint: 'Girerseniz litre/dakika cinsinden mutlak değer de gösterilir.' },
  ],
  compute(v, h) {
    const y = v.yontem || 'cooper';
    let vo2, ad, girdi;
    if (y === 'cooper') {
      const m = h.pos(v.mesafe, '12 dakikada koşulan mesafe');
      if (m < 1000 || m > 5000) h.err('Mesafe 1.000 ile 5.000 metre arasında olmalı. Değeri kilometre değil metre olarak yazın.');
      vo2 = (m - 504.9) / 44.73;
      ad = 'Cooper 12 dakika testi';
      girdi = h.fmt(m, 0) + ' m';
    } else if (y === 'kosu') {
      const dk = h.pos(v.sure, '2,4 km koşu süresi');
      if (dk < 6 || dk > 30) h.err('2,4 km süresi 6 ile 30 dakika arasında olmalı.');
      vo2 = 483 / dk + 3.5;
      ad = '2,4 km koşu testi';
      girdi = h.fmt(dk, 2) + ' dk';
    } else if (y === 'nabiz') {
      const mx = h.pos(v.maksNabiz, 'Maksimum nabız');
      const dn = h.pos(v.dinlenmeNabiz, 'Dinlenme nabzı');
      if (mx < 100 || mx > 230) h.err('Maksimum nabız 100 ile 230 atım/dk arasında olmalı.');
      if (dn < 25 || dn > 120) h.err('Dinlenme nabzı 25 ile 120 atım/dk arasında olmalı.');
      if (dn >= mx) h.err('Dinlenme nabzı maksimum nabızdan küçük olmalı.');
      vo2 = 15.3 * (mx / dn);
      ad = 'Nabız oranı yöntemi';
      girdi = `${h.fmt(mx, 0)} / ${h.fmt(dn, 0)} atım/dk`;
    } else h.err('Geçerli bir yöntem seçin.');
    const rows = [
      ['VO2 max', h.fmt(vo2, 1) + ' ml/kg/dk'],
      ['MET kapasitesi', h.fmt(vo2 / 3.5, 1) + ' MET'],
      ['Yöntem', ad],
      ['Kullanılan değer', girdi],
    ];
    if (String(v.kilo ?? '').trim() !== '') {
      const kg = h.pos(v.kilo, 'Vücut ağırlığı');
      if (kg < 25 || kg > 250) h.err('Vücut ağırlığı 25 ile 250 kg arasında olmalı.');
      rows.push(['Mutlak VO2 max', h.fmt((vo2 * kg) / 1000, 2) + ' L/dk']);
    }
    return { rows, note: 'Saha testleri laboratuvar ölçümünün yerini tutmaz; sonuç tahmindir ve birkaç ml/kg/dk sapabilir.' };
  },
  cases: [
    { in: { yontem: 'cooper', mesafe: '2400' }, out: { 'VO2 max': '42,4 ml/kg/dk', 'MET kapasitesi': '12,1 MET', 'Kullanılan değer': '2.400 m' } },
    { in: { yontem: 'nabiz', maksNabiz: '180', dinlenmeNabiz: '60' }, out: { 'VO2 max': '45,9 ml/kg/dk', 'MET kapasitesi': '13,1 MET' } },
    { in: { yontem: 'cooper', mesafe: '3000' }, out: { 'VO2 max': '55,8 ml/kg/dk' } },
    { in: { yontem: 'cooper', mesafe: '1600' }, out: { 'VO2 max': '24,5 ml/kg/dk', 'MET kapasitesi': '7 MET' } },
    { in: { yontem: 'kosu', sure: '10' }, out: { 'VO2 max': '51,8 ml/kg/dk', 'MET kapasitesi': '14,8 MET' } },
    { in: { yontem: 'kosu', sure: '14' }, out: { 'VO2 max': '38 ml/kg/dk' } },
    { in: { yontem: 'nabiz', maksNabiz: '200', dinlenmeNabiz: '50', kilo: '70' }, out: { 'VO2 max': '61,2 ml/kg/dk', 'Mutlak VO2 max': '4,28 L/dk' } },
    { in: { yontem: 'nabiz', maksNabiz: '185', dinlenmeNabiz: '72' }, out: { 'VO2 max': '39,3 ml/kg/dk' } },
    { in: { yontem: 'cooper', mesafe: '2,4' }, error: true },
    { in: { yontem: 'nabiz', maksNabiz: '120', dinlenmeNabiz: '120' }, error: true },
    { in: { yontem: 'kosu', sure: '' }, error: true },
  ],
  howto: [
    `"Yöntem" listesinden elinizdeki veriye uygun olanı seçin. Düz bir pist ya da ölçülü parkurunuz varsa Cooper testi, yalnızca nabız ölçebiliyorsanız nabız oranı yöntemi uygundur.`,
    `Cooper testi için 12 dakika boyunca koşabildiğiniz en uzun mesafeyi metre olarak yazın. 2,4 km yöntemi için bu mesafeyi bitirme sürenizi dakika olarak girin.`,
    `Nabız yöntemi için maksimum nabzınızı (ölçülmüş ya da formülle tahmin edilmiş) ve sabah uyanınca ölçtüğünüz dinlenme nabzını yazın.`,
    `İsterseniz kilonuzu ekleyin; araç litre/dakika cinsinden mutlak oksijen tüketimini de verir.`,
    `"Hesapla" düğmesine basın. Seçmediğiniz yöntemlere ait alanları boş bırakabilirsiniz.`,
  ],
  sections: [
    { h: 'VO2 max nedir?', p: [
      `VO<sub>2</sub> max, vücudun en yoğun eforda bir dakikada kullanabildiği en yüksek oksijen miktarıdır. Akciğerlerin oksijeni alması, kalbin ve damarların onu kaslara taşıması ve kasların onu kullanması zincirinin tamamını tek bir sayıda özetlediği için aerobik kondisyonun temel ölçüsü sayılır. Genellikle vücut ağırlığına göre, <strong>kilogram başına dakikada mililitre</strong> (ml/kg/dk) olarak ifade edilir; böylece farklı kilolardaki kişiler karşılaştırılabilir.`,
      `Değer ne kadar yüksekse, aynı tempoyu o kadar düşük göreli eforla sürdürebilirsiniz. Hareketsiz yetişkinlerde 30'lu değerler, düzenli spor yapanlarda 40–50'ler, üst düzey dayanıklılık sporcularında 70 ve üzeri görülür. Kadınlarda ortalama değerler, vücut bileşimi ve hemoglobin farkları nedeniyle erkeklere göre biraz daha düşüktür ve değer yaşla birlikte kademeli olarak azalır.`,
    ] },
    { h: 'Cooper testi (12 dakika koşu)', p: [
      `Test basittir: iyi bir ısınmadan sonra düz bir zeminde 12 dakika boyunca gidebildiğiniz kadar uzağa koşarsınız. 400 metrelik atletizm pisti en kolay ölçüm ortamıdır; altı tur 2.400 metre eder. Formül: <strong>VO<sub>2</sub> max = (mesafe − 504,9) ÷ 44,73</strong>, mesafe metre cinsindendir.`,
      `Çözümlü örnek: 12 dakikada 2.400 metre koşan biri için (2.400 − 504,9) ÷ 44,73 = 1.895,1 ÷ 44,73 = <strong>42,4 ml/kg/dk</strong> bulunur. Bu değer 3,5'e bölündüğünde 12,1 MET'lik bir kapasiteye karşılık gelir. 3.000 metre koşan biri için sonuç 55,8, 1.600 metre için 24,5 ml/kg/dk olur.`,
      `Testin doğruluğu tempoyu iyi ayarlamanıza bağlıdır. Çok hızlı başlayıp son dakikalarda yürümek ya da gücü sona saklamak sonucu düşürür. Test tüm gücü gerektirdiği için yalnızca sağlıklı ve belirli bir koşu altyapısı olan kişilerce yapılmalıdır.`,
    ] },
    { h: '2,4 km koşu testi', p: [
      `Bu yöntemde mesafe sabittir, süre ölçülür: 2,4 kilometreyi (yaklaşık 1,5 mil) olabildiğince hızlı koşarsınız. Formül: <strong>VO<sub>2</sub> max = 483 ÷ süre (dakika) + 3,5</strong>. 2,4 kilometreyi 10 dakikada bitiren biri için 483 ÷ 10 + 3,5 = 51,8 ml/kg/dk; 14 dakikada bitiren biri için 34,5 + 3,5 = 38 ml/kg/dk çıkar.`,
      `Sabit mesafe, parkuru önceden işaretlemeyi kolaylaştırır ve süre tutmak mesafe ölçmekten daha pratiktir. Cooper testine yakın sonuçlar verir; küçük farklar formüllerin farklı örneklemlerden türetilmesinden kaynaklanır.`,
    ] },
    { h: 'Nabız oranı yöntemi', p: [
      `Koşu testi yapamayanlar için efor gerektirmeyen bir tahmin yöntemi de vardır: <strong>VO<sub>2</sub> max = 15,3 × (maksimum nabız ÷ dinlenme nabzı)</strong>. Mantığı şudur: kondisyon arttıkça kalp her atımda daha çok kan pompalar ve dinlenme nabzı düşer; maksimum nabız ise pek değişmez. Dolayısıyla iki değerin oranı büyüdükçe aerobik kapasite de yüksektir.`,
      `Örnek: maksimum nabzı 180, dinlenme nabzı 60 olan biri için 15,3 × (180 ÷ 60) = 15,3 × 3 = 45,9 ml/kg/dk bulunur. Dinlenme nabzını sabah uyanır uyanmaz, yataktan kalkmadan ve birkaç gün üst üste ölçüp ortalamasını almak en doğrusudur. Maksimum nabzı formülle tahmin ediyorsanız o tahmindeki hata da sonuca yansır; bu yüzden üç yöntem içinde en kaba olanı budur.`,
    ] },
    { h: 'Göreli ve mutlak değer', p: [
      `Kilo girdiğinizde araç, göreli değeri kilonuzla çarpıp 1.000'e bölerek <strong>litre/dakika</strong> cinsinden mutlak oksijen tüketimini de verir. 70 kg ağırlığında, 61,2 ml/kg/dk değerine sahip biri dakikada 4,28 litre oksijen kullanabilir. Koşu gibi vücut ağırlığının taşındığı sporlarda göreli değer, kürek ve düz yolda bisiklet gibi ağırlığın desteklendiği sporlarda mutlak değer performansı daha iyi yansıtır. Kilo vermek, kondisyon değişmese bile göreli değeri yükseltir.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Gerçek VO<sub>2</sub> max, laboratuvarda maske takılarak solunum gazlarının ölçüldüğü kademeli efor testiyle belirlenir. Saha formülleri bu ölçümlerle karşılaştırılarak üretilmiş tahminlerdir; koşu ekonomisi, motivasyon, hava sıcaklığı, rüzgâr ve rakım sonucu etkiler. Akıllı saatlerin gösterdiği değer de benzer biçimde tahmindir. En yararlı kullanım, aynı testi aynı koşullarda birkaç ayda bir tekrarlayıp kendi gelişiminizi izlemektir.`,
      `Sonuçlar bilgilendirme amaçlıdır. Maksimum efor gerektiren testler kalp-damar hastalığı, tansiyon sorunu ya da başka kronik rahatsızlığı olanlar için risk taşır; bu durumdaysanız ya da uzun süredir hareketsizseniz test yapmadan önce hekiminize danışın.`,
    ] },
  ],
  faq: [
    ['İyi bir VO2 max değeri kaçtır?', `Yaşa ve cinsiyete göre değişir. Genel bir fikir olarak yetişkinlerde 30'un altı düşük, 35–45 arası ortalama, 50 ve üzeri iyi kabul edilir. Kadınlarda sınırlar birkaç puan daha düşüktür ve yaş ilerledikçe beklenen değer azalır.`],
    ['Cooper testinde kaç metre koşmalıyım?', `Bu sizin kondisyonunuza bağlıdır; amaç 12 dakikada koşabildiğiniz en uzun mesafeyi bulmaktır. Yetişkinlerde 2.000–2.400 metre ortalama, 2.800 metre ve üzeri iyi bir sonuç olarak görülür.`],
    ['VO2 max nasıl artırılır?', `Düzenli dayanıklılık antrenmanı ile artar. Uzun süreli düşük yoğunluklu çalışmalar ile maksimuma yakın yoğunlukta yapılan aralıklı antrenmanların birleşimi etkilidir. Fazla kiloyu vermek de kilogram başına değeri yükseltir.`],
    ['Koşu bandında Cooper testi yapılabilir mi?', `Yapılabilir; hava direncini telafi etmek için bandı yüzde 1 eğime almak yaygın bir uygulamadır. Bandın gösterdiği mesafenin doğru kalibre edildiğinden emin olun ve hızı kendiniz ayarlamak zorunda kalacağınızı unutmayın.`],
    ['Akıllı saatimin gösterdiği değerle neden uyuşmuyor?', `Saatler koşu hızınız ile nabzınız arasındaki ilişkiden tahmin yapar; bu sayfadaki formüller ise test sonucuna dayanır. İki tahmin arasında 3–5 ml/kg/dk fark olağandır.`],
    ['Yaşla birlikte VO2 max düşer mi?', `Evet. Genç yetişkinlikten sonra her on yılda kabaca yüzde 10 azaldığı kabul edilir. Düzenli antrenman bu düşüşü belirgin biçimde yavaşlatır.`],
    ['MET kapasitesi ne işe yarar?', `VO2 max'ın 3,5'e bölünmüş hâlidir ve dinlenme metabolizmanızın en çok kaç katına çıkabildiğinizi gösterir. Örneğin 12 MET kapasiteli biri için 8 MET'lik bir aktivite, kapasitenin üçte ikisi düzeyinde bir efordur.`],
    ['Test sonuçlarım bir yere kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['maksimum-nabiz-hesapla', 'nabiz-rezervi-hesapla', 'kosu-temposu-hesapla', 'maraton-sure-tahmini', 'kosu-hiz-bolgeleri-hesapla'],
};
