export default {
  slug: 'bisiklet-kalori-hesapla',
  title: 'Bisiklette Yakılan Kalori Hesaplama',
  h1Tail: 'hız, süre ve kiloya göre',
  pageTitle: 'Bisiklette Yakılan Kalori Hesaplama – Hız ve Süreye Göre',
  description: 'Bisiklet sürüşünde yakılan kaloriyi kilo, süre ve ortalama hıza göre hesaplayın. Yol, dağ bisikleti ve sabit bisiklet (kondisyon) için MET değerleriyle çalışır.',
  card: 'Kilo, süre ve ortalama hıza göre bisiklet sürüşünde yakılan kaloriyi bulun; dağ ve sabit bisiklet seçenekli.',
  category: 'saglik',
  keywords: ['bisiklet kalori hesaplama', 'bisiklet sürmek kaç kalori yakar', '1 saat bisiklet kaç kalori', 'kondisyon bisikleti kalori', 'sabit bisiklet kalori', 'bisiklet MET değeri', '20 km bisiklet kaç kalori'],
  lead: `Kilonuzu, sürüş sürenizi ve kat ettiğiniz mesafeyi girin; araç ortalama hızınıza karşılık gelen MET değerini seçip <strong>yakılan kaloriyi</strong> hesaplar. Dağ bisikleti ve salondaki sabit bisiklet için ayrı seçenekler de vardır.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Vücut ağırlığı (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sure', label: 'Sürüş süresi (dakika)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'tur', label: 'Sürüş türü', type: 'select', options: [['hiz', 'Yol / şehir içi (hıza göre)'], ['dag', 'Dağ bisikleti, arazi'], ['sabitHafif', 'Sabit bisiklet – hafif tempo'], ['sabitOrta', 'Sabit bisiklet – orta tempo'], ['sabitYuksek', 'Sabit bisiklet – yüksek tempo']] },
    { id: 'mesafe', label: 'Mesafe (km)', type: 'number', placeholder: 'Örn. 20', hint: 'Yalnızca "hıza göre" seçeneğinde gereklidir; diğer türlerde boş bırakabilirsiniz.' },
  ],
  compute(v, h) {
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const dk = h.pos(v.sure, 'Sürüş süresi');
    if (kg < 25 || kg > 250) h.err('Vücut ağırlığı 25 ile 250 kg arasında olmalı.');
    const tur = v.tur || 'hiz';
    const sabit = { dag: [8.5, 'Dağ bisikleti, arazi'], sabitHafif: [3.5, 'Sabit bisiklet, hafif tempo'], sabitOrta: [6.8, 'Sabit bisiklet, orta tempo'], sabitYuksek: [8.8, 'Sabit bisiklet, yüksek tempo'] };
    let met, tanim, kmh = null;
    const mesafeDolu = String(v.mesafe ?? '').trim() !== '';
    if (mesafeDolu) {
      const km = h.pos(v.mesafe, 'Mesafe');
      kmh = (km / dk) * 60;
      if (kmh > 60) h.err('Ortalama hız 60 km/sa üzerinde çıkıyor. Mesafeyi kilometre, süreyi dakika olarak yazdığınızdan emin olun.');
    }
    if (tur === 'hiz') {
      if (kmh === null) h.err('"Hıza göre" hesap için "Mesafe" alanını doldurun ya da başka bir sürüş türü seçin.');
      const e = 1e-9;
      if (kmh < 16 - e) { met = 4.0; tanim = '16 km/sa altı, gezinti temposu'; }
      else if (kmh < 19 - e) { met = 6.8; tanim = '16–19 km/sa, hafif tempo'; }
      else if (kmh < 22.5 - e) { met = 8.0; tanim = '19–22,5 km/sa, orta tempo'; }
      else if (kmh < 25.7 - e) { met = 10.0; tanim = '22,5–25,7 km/sa, canlı tempo'; }
      else if (kmh < 32 - e) { met = 12.0; tanim = '25,7–32 km/sa, hızlı tempo'; }
      else { met = 15.8; tanim = '32 km/sa ve üzeri, yarış temposu'; }
    } else if (sabit[tur]) { met = sabit[tur][0]; tanim = sabit[tur][1]; }
    else h.err('Geçerli bir sürüş türü seçin.');
    const saat = dk / 60;
    const kcal = met * kg * saat;
    const rows = [
      ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
      ['Net kalori (dinlenme hariç)', h.fmt((met - 1) * kg * saat, 0) + ' kcal'],
      ['MET değeri', h.fmt(met, 1)],
      ['Efor düzeyi', tanim],
      ['Saat başına', h.fmt(met * kg, 0) + ' kcal'],
    ];
    if (kmh !== null) rows.push(['Ortalama hız', h.fmt(kmh, 1) + ' km/sa']);
    return { rows, note: 'MET değerleri ortalama koşullar içindir; rüzgâr, yokuş, bisiklet tipi ve lastik basıncı gerçek harcamayı değiştirir.' };
  },
  cases: [
    { in: { kilo: '70', sure: '60', tur: 'hiz', mesafe: '20' }, out: { 'Yakılan kalori': '560 kcal', 'MET değeri': '8', 'Ortalama hız': '20 km/sa', 'Net kalori (dinlenme hariç)': '490 kcal' } },
    { in: { kilo: '80', sure: '45', tur: 'hiz', mesafe: '12' }, out: { 'Yakılan kalori': '408 kcal', 'MET değeri': '6,8', 'Ortalama hız': '16 km/sa' } },
    { in: { kilo: '75', sure: '90', tur: 'hiz', mesafe: '40' }, out: { 'Yakılan kalori': '1.350 kcal', 'MET değeri': '12', 'Ortalama hız': '26,7 km/sa' } },
    { in: { kilo: '70', sure: '60', tur: 'dag', mesafe: '' }, out: { 'Yakılan kalori': '595 kcal', 'MET değeri': '8,5' } },
    { in: { kilo: '65', sure: '40', tur: 'sabitOrta', mesafe: '' }, out: { 'Yakılan kalori': '295 kcal', 'Saat başına': '442 kcal' } },
    { in: { kilo: '60', sure: '60', tur: 'hiz', mesafe: '14' }, out: { 'Yakılan kalori': '240 kcal', 'MET değeri': '4' } },
    { in: { kilo: '70', sure: '60', tur: 'hiz', mesafe: '35' }, out: { 'Yakılan kalori': '1.106 kcal', 'MET değeri': '15,8' } },
    { in: { kilo: '70', sure: '60', tur: 'hiz', mesafe: '' }, error: true },
    { in: { kilo: '70', sure: '0', tur: 'dag' }, error: true },
    { in: { kilo: '70', sure: '10', tur: 'hiz', mesafe: '20' }, error: true },
  ],
  howto: [
    `"Vücut ağırlığı" alanına kilonuzu, "Sürüş süresi" alanına pedal çevirdiğiniz süreyi dakika olarak yazın. Mola ve ışıkta bekleme sürelerini çıkarırsanız sonuç daha doğru olur.`,
    `"Sürüş türü" listesinden yol ya da şehir içi sürüş için "hıza göre" seçeneğini, arazi sürüşü için dağ bisikletini, salon için sabit bisiklet tempolarından birini seçin.`,
    `Hıza göre hesapta "Mesafe" alanına kat ettiğiniz kilometreyi girin; araç ortalama hızı kendisi bulur.`,
    `"Hesapla" düğmesine basın. Toplam ve net kalori, kullanılan MET değeri ve efor düzeyi sonuç kutusunda görünür.`,
  ],
  sections: [
    { h: 'Bisiklette kalori nasıl hesaplanır?', p: [
      `Hesap, egzersiz biliminde aktivitelerin yoğunluğunu ifade etmek için kullanılan MET (metabolik eşdeğer) kavramına dayanır. 1 MET, oturarak dinlenirken harcanan enerjidir ve kilogram başına saatte yaklaşık 1 kcal kabul edilir. Formül basittir: <strong>kalori = MET × kilo × süre (saat)</strong>.`,
      `Bisiklette MET değeri esas olarak hıza bağlıdır, çünkü hız arttıkça hava direnci hızın karesiyle büyür ve gereken güç çok daha hızlı yükselir. Bu nedenle saatte 15 km ile gezinmek 4 MET civarındayken 30 km/sa üzerindeki tempolar 12–16 MET düzeyine çıkar. Araç, girdiğiniz mesafe ve süreden ortalama hızı hesaplayıp fiziksel aktivite derlemelerinde yer alan hız aralığına ait MET değerini kullanır.`,
    ] },
    { h: 'Kullanılan MET değerleri', ul: [
      `<strong>16 km/sa altı</strong> (gezinti, işe gidiş): 4,0 MET`,
      `<strong>16–19 km/sa</strong> (hafif tempo): 6,8 MET`,
      `<strong>19–22,5 km/sa</strong> (orta tempo): 8,0 MET`,
      `<strong>22,5–25,7 km/sa</strong> (canlı tempo): 10,0 MET`,
      `<strong>25,7–32 km/sa</strong> (hızlı, antrenman): 12,0 MET`,
      `<strong>32 km/sa ve üzeri</strong> (yarış temposu): 15,8 MET`,
      `<strong>Dağ bisikleti, arazi</strong>: 8,5 MET`,
      `<strong>Sabit bisiklet</strong>: hafif 3,5 – orta 6,8 – yüksek 8,8 MET`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `70 kg ağırlığında bir sürücü sahil yolunda 1 saatte 20 km gitmiş olsun. Ortalama hız 20 km/sa olduğundan 19–22,5 km/sa aralığına girer ve 8,0 MET kullanılır. Toplam harcama 8,0 × 70 × 1 = <strong>560 kcal</strong> eder. Dinlenirken harcanacak 70 kcal çıkarıldığında sürüşün net katkısı 490 kcal olur.`,
      `Aynı kişi 90 dakikada 40 km yapan 75 kg'lık bir arkadaşıyla karşılaştırılırsa: arkadaşın hızı 26,7 km/sa, MET değeri 12,0 ve harcaması 12 × 75 × 1,5 = 1.350 kcal'dir. Hızdaki 6–7 km/sa'lik artışın saatlik harcamayı yüzde 50'den fazla artırdığına dikkat edin.`,
    ] },
    { h: 'Sabit bisiklet ve spinning', p: [
      `Kondisyon bisikletinde hava direnci olmadığı için ekrandaki hız ve mesafe gerçek yol değerleriyle karşılaştırılamaz; direnç ayarı aynı hızda bambaşka eforlar doğurur. Bu yüzden sabit bisiklette hız yerine hissettiğiniz efor düzeyini seçmeniz gerekir. Rahatça konuşabiliyorsanız hafif, cümleleri bölerek konuşuyorsanız orta, ancak birkaç kelime söyleyebiliyorsanız yüksek tempo uygundur.`,
      `Bisikletiniz watt gösteriyorsa kabaca şu eşleme kullanılabilir: 50 watt civarı hafif, 100 watt civarı orta, 150 watt civarı yüksek tempodur. Grup spinning derslerinde yoğunluk sürekli değiştiğinden orta ile yüksek arasında bir değer gerçeğe daha yakın olur.`,
    ] },
    { h: 'Sonucu saptıran durumlar', p: [
      `Ortalama hız, eforun iyi bir göstergesi olmayabilir. Karşı rüzgârda ya da uzun tırmanışlarda hız düşer ama harcama artar; inişlerde ve arkadan rüzgârla hız yükselir ama pedal çevirmeden gidersiniz. Grup içinde rüzgâr gölgesinde sürmek, aynı hızda tek başına sürmeye göre belirgin biçimde daha az enerji ister.`,
      `Bisikletin tipi de önemlidir: ince lastikli yol bisikletiyle 25 km/sa gitmek, kalın lastikli şehir ya da dağ bisikletiyle aynı hıza ulaşmaktan kolaydır. Elektrikli destekli bisikletlerde motor işin bir kısmını üstlendiğinden bu araçtaki değerler fazla çıkar. En doğru ölçüm, güç ölçerle kaydedilen kilojul değeridir; güç ölçeriniz yoksa bu hesap makul bir tahmin sunar.`,
      `Sonuçlar bilgilendirme amaçlıdır. Kalp-damar rahatsızlığınız varsa ya da uzun süredir spor yapmıyorsanız yoğun sürüşlere başlamadan önce hekiminize danışın.`,
    ] },
    { h: 'Bisiklet ve diğer sporlarla karşılaştırma', p: [
      `Orta tempolu bisiklet (8 MET), saatte 8 km hızla koşmaya yakın bir enerji harcaması sağlar; ancak bisiklette vücut ağırlığı seleye bindiği için diz ve ayak bileklerine binen darbe yükü çok daha azdır. Bu özellik bisikleti fazla kilolu kişiler ve eklem hassasiyeti olanlar için uygun bir dayanıklılık sporu yapar. Uzun süre sürdürülebilmesi sayesinde iki üç saatlik bir hafta sonu turunda bin kalorinin üzerine çıkmak olağandır; bu tür sürüşlerde sıvı ve karbonhidrat alımını ihmal etmeyin.`,
    ] },
  ],
  faq: [
    ['1 saat bisiklet sürmek kaç kalori yakar?', `70 kg bir kişi gezinti temposunda (16 km/sa altı) yaklaşık 280 kcal, orta tempoda (20 km/sa) 560 kcal, hızlı tempoda (28 km/sa) 840 kcal harcar. Kilonuz arttıkça değer aynı oranda artar.`],
    ['20 km bisiklet kaç kalori yakar?', `Süreye bağlıdır. 70 kg biri 20 km'yi 1 saatte giderse 560 kcal, 1 saat 20 dakikada giderse hız 15 km/sa olduğundan yaklaşık 373 kcal harcar.`],
    ['Kondisyon bisikleti mi, açık havada sürüş mü daha çok kalori yakar?', `Belirleyici olan efor düzeyidir. Aynı nabızda ve sürede ikisi de benzer enerji harcatır. Açık havada inişlerde dinlenildiği, salonda ise pedal hiç durmadığı için kısa sürede salon antrenmanı daha yoğun olabilir.`],
    ['Bisiklet göbek eritir mi?', `Vücut belirli bir bölgeden yağ yakmaz; yağ kaybı toplam enerji açığıyla tüm vücuttan olur. Düzenli bisiklet enerji harcamasını artırarak bu açığa katkı sağlar, ancak beslenme düzeni de aynı derecede önemlidir.`],
    ['Mesafeyi bilmiyorsam ne yapmalıyım?', `Telefonunuzdaki harita ya da spor uygulamasından rotayı ölçebilirsiniz. Tahmin de yapamıyorsanız eforunuza en yakın sabit bisiklet temposunu seçmek kabaca bir sonuç verir.`],
    ['Elektrikli bisiklette sonuç geçerli mi?', `Hayır, motor desteği pedal gücünüzün bir kısmını karşıladığı için gerçek harcama daha düşüktür. Destek düzeyine göre sonucun yarısı ile üçte ikisi arasında bir değer daha gerçekçi olabilir, ancak bu yalnızca kaba bir tahmindir.`],
    ['Net kalori ne anlama geliyor?', `Toplam kaloriden, o süre boyunca hiçbir şey yapmadan dinlenseniz de harcayacağınız enerjinin çıkarılmış hâlidir. Günlük kalori hesabınızda bazal harcamayı ayrıca sayıyorsanız net değeri kullanın.`],
    ['Bilgilerim bir yere gönderiliyor mu?', `Hayır. Tüm hesap tarayıcınızda yapılır; kilo, süre ve mesafe bilgileri cihazınızdan çıkmaz.`],
  ],
  related: ['bisiklet-hiz-kadans-hesapla', 'bisiklet-vites-orani-hesapla', 'met-kalori-hesapla', 'kosu-kalori-hesapla', 'yuzme-kalori-hesapla'],
};
