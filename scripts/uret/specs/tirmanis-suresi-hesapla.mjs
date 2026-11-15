export default {
  slug: 'tirmanis-suresi-hesapla',
  title: 'Doğa Yürüyüşü Süresi (Naismith Kuralı) Hesaplama',
  h1Tail: 'mesafe + tırmanış',
  pageTitle: 'Naismith Kuralı ile Doğa Yürüyüşü ve Tırmanış Süresi Hesaplama',
  description: 'Parkur uzunluğu ve toplam tırmanışa göre doğa yürüyüşü süresini Naismith kuralıyla hesaplayın; mola payını ekleyin, eşdeğer düz mesafeyi görün.',
  card: 'Parkur uzunluğu ve toplam çıkışa göre yürüyüş süresini Naismith kuralıyla tahmin edin; mola payı dahil.',
  category: 'gunluk',
  keywords: ['naismith kuralı', 'doğa yürüyüşü süresi hesaplama', 'trekking süresi', 'tırmanış süresi hesaplama', 'parkur süresi', 'dağ yürüyüşü kaç saat sürer', 'irtifa kazanımı süre'],
  lead: 'Bir parkurun kaç saat süreceğini yalnızca kilometresine bakarak kestirmek yanıltır; asıl zamanı yokuşlar yer. Bu araç, dağcıların yüz yılı aşkın süredir kullandığı <strong>Naismith kuralıyla</strong> yatay mesafeyi ve toplam tırmanışı birlikte hesaba katarak yürüyüş sürenizi tahmin eder.',
  button: 'Hesapla',
  inputs: [
    { id: 'mesafe', label: 'Parkur uzunluğu (km)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'cikis', label: 'Toplam tırmanış (m)', type: 'number', placeholder: 'Örn. 650', hint: 'Parkur boyunca çıkılan tüm yokuşların toplamı' },
    { id: 'hiz', label: 'Düz yolda yürüyüş hızı (km/sa)', type: 'number', value: '5' },
    { id: 'oran', label: 'Saatte tırmanış (m/sa)', type: 'number', value: '600', hint: 'Naismith değeri 600 m/sa' },
    { id: 'mola', label: 'Toplam mola (dk)', type: 'number', value: '0' },
  ],
  compute(v, h) {
    const km = h.pos(v.mesafe, 'Parkur uzunluğu');
    const cikis = h.nonneg(v.cikis, 'Toplam tırmanış');
    const hiz = h.pos(h.opt(v.hiz, 5, 'Yürüyüş hızı') + '', 'Yürüyüş hızı');
    const oran = h.pos(h.opt(v.oran, 600, 'Saatte tırmanış') + '', 'Saatte tırmanış');
    const mola = h.opt(v.mola, 0, 'Toplam mola');
    if (mola < 0) h.err('"Toplam mola" negatif olamaz.');
    if (km > 1000) h.err('Parkur uzunluğu en fazla 1000 km olabilir; uzun rotaları günlük etaplara bölerek hesaplayın.');
    if (cikis > 20000) h.err('Toplam tırmanış en fazla 20.000 m olabilir; değeri metre cinsinden yazdığınızdan emin olun.');
    if (hiz > 12) h.err('Yürüyüş hızı 12 km/sa değerini aşamaz; koşu için koşu temposu aracını kullanın.');
    const sure = (dk) => {
      const t = Math.round(dk + 1e-9);
      return `${Math.floor(t / 60)} sa ${t % 60} dk`;
    };
    const yatayDk = (km / hiz) * 60;
    const cikisDk = (cikis / oran) * 60;
    const yuruyusDk = yatayDk + cikisDk;
    const toplamDk = yuruyusDk + mola;
    const esdeger = km + (cikis / oran) * hiz;
    const egim = (cikis / (km * 1000)) * 100;
    return {
      rows: [
        ['Tahmini toplam süre', sure(toplamDk)],
        ['Yürüyüş süresi (molasız)', sure(yuruyusDk)],
        ['Yatay mesafenin payı', sure(yatayDk)],
        ['Tırmanışın payı', sure(cikisDk)],
        ['Eşdeğer düz mesafe', h.fmt(esdeger, 1) + ' km'],
        ['Ortalama hız (molasız)', h.fmt(km / (yuruyusDk / 60), 1) + ' km/sa'],
        ['Parkurun ortalama çıkış eğimi', '%' + h.fmt(egim, 1)],
      ],
      note: 'Naismith kuralı iniş, zemin, yük, hava ve kondisyon etkisini içermez; sonuç formda bir yürüyüşçü için alt sınıra yakın bir tahmindir. Plan yaparken güvenlik payı bırakın.',
    };
  },
  cases: [
    { in: { mesafe: '10', cikis: '600' }, out: { 'Tahmini toplam süre': '3 sa 0 dk', 'Yatay mesafenin payı': '2 sa 0 dk', 'Tırmanışın payı': '1 sa 0 dk', 'Eşdeğer düz mesafe': '15 km' } },
    { in: { mesafe: '20', cikis: '1000' }, out: { 'Tahmini toplam süre': '5 sa 40 dk', 'Tırmanışın payı': '1 sa 40 dk' } },
    { in: { mesafe: '12', cikis: '0' }, out: { 'Tahmini toplam süre': '2 sa 24 dk', 'Eşdeğer düz mesafe': '12 km', 'Ortalama hız (molasız)': '5 km/sa' } },
    { in: { mesafe: '8', cikis: '450', hiz: '4' }, out: { 'Tahmini toplam süre': '2 sa 45 dk', 'Yatay mesafenin payı': '2 sa 0 dk', 'Tırmanışın payı': '0 sa 45 dk' } },
    { in: { mesafe: '15', cikis: '900', mola: '30' }, out: { 'Tahmini toplam süre': '5 sa 0 dk', 'Yürüyüş süresi (molasız)': '4 sa 30 dk', 'Parkurun ortalama çıkış eğimi': '%6' } },
    { in: { mesafe: '6', cikis: '300', hiz: '3', oran: '300' }, out: { 'Tahmini toplam süre': '3 sa 0 dk', 'Eşdeğer düz mesafe': '9 km' } },
    { in: { mesafe: '', cikis: '500' }, error: true },
    { in: { mesafe: '10', cikis: '-200' }, error: true },
    { in: { mesafe: '10', cikis: '500', hiz: '0' }, error: true },
  ],
  howto: [
    '"Parkur uzunluğu" alanına rotanın toplam uzunluğunu kilometre olarak yazın. Gidiş-dönüş yapacaksanız iki yönün toplamını girin.',
    '"Toplam tırmanış" alanına rota boyunca çıkılan bütün yokuşların toplamını metre olarak yazın. Bu değer, başlangıç ve zirve arasındaki farktan büyük olabilir; inişli çıkışlı parkurlarda her çıkış ayrı ayrı toplanır.',
    'Düz yoldaki hızınızı ve saatte kaç metre tırmanabildiğinizi biliyorsanız ilgili alanları değiştirin; bilmiyorsanız 5 km/sa ve 600 m/sa olan Naismith değerlerini bırakın.',
    'Yemek, fotoğraf ve dinlenme için düşündüğünüz toplam molayı dakika olarak ekleyin.',
    '"Hesapla" düğmesine basın. Toplam süreyi, bunun ne kadarının mesafeden ne kadarının tırmanıştan geldiğini ve parkurun eşdeğer düz mesafesini görürsünüz.',
  ],
  sections: [
    { h: 'Naismith kuralı nedir?', p: [
      'İskoç dağcı William W. Naismith 1892\'de yürüyüş süresini kestirmek için basit bir kural önerdi: her üç mil için bir saat, buna ek olarak her 2000 feet tırmanış için bir saat. Metrik karşılığı bugün yaygın olarak <strong>her 5 km için 1 saat, her 600 m tırmanış için 1 saat daha</strong> biçiminde kullanılır. Kural, harita üzerinde ölçtüğünüz iki sayıdan, yani yatay mesafe ve toplam çıkıştan, makul bir süre tahmini çıkarmanızı sağlar.',
      'Kuralın gücü sadeliğindedir. Bir harita, bir cetvel ve eş yükselti eğrilerini saymak yeterlidir. Zayıf yanı da aynı sadeliktir: iniş, zemin, sırt çantası, hava ve grubun kondisyonu hesapta yoktur. Bu yüzden sonucu bir alt sınır, yani "her şey yolunda giderse" süresi olarak düşünmek gerekir.',
    ] },
    { h: 'Formül ve hesap mantığı', p: [
      'Araç süreyi iki parçanın toplamı olarak hesaplar: <strong>süre = mesafe ÷ düz yol hızı + toplam tırmanış ÷ saatlik tırmanış</strong>. Varsayılan değerlerle bu, <code>süre (saat) = km ÷ 5 + metre ÷ 600</code> demektir. Üzerine yazdığınız mola süresi eklenir.',
      'Aynı mantıkla tırmanış, düz yola çevrilebilir. Varsayılan değerlerde 600 metre çıkış bir saate, bir saat de 5 km düz yürüyüşe eşit olduğundan her 100 metre tırmanış yaklaşık 0,83 km düz yola denk gelir. "Eşdeğer düz mesafe" satırı bunu gösterir: 10 km uzunluğunda ve 600 m çıkışlı bir parkur, zaman açısından 15 km\'lik düz bir yürüyüş gibidir. İki farklı rotayı karşılaştırırken bu tek sayı çok işe yarar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 10 km uzunluğunda, toplam 600 m tırmanışı olan bir günübirlik parkur. Yatay pay 10 ÷ 5 = 2 saat, tırmanış payı 600 ÷ 600 = 1 saat; toplam 3 saat 0 dakika. Eşdeğer düz mesafe 15 km\'dir.',
      '<strong>Örnek 2:</strong> 20 km ve 1000 m çıkışlı uzun bir etap. Yatay pay 4 saat, tırmanış payı 1000 ÷ 600 = 1,667 saat yani 1 saat 40 dakika; toplam 5 saat 40 dakika.',
      '<strong>Örnek 3:</strong> Ağır çantayla yürüyen bir grup düz yolda 4 km/sa yapıyor. 8 km ve 450 m çıkışlı parkurda yatay pay 8 ÷ 4 = 2 saat, tırmanış payı 450 ÷ 600 = 45 dakika; toplam 2 saat 45 dakika.',
      '<strong>Örnek 4:</strong> 15 km, 900 m çıkış ve 30 dakika mola. Yürüyüş 3 saat + 1 saat 30 dakika = 4 saat 30 dakika; molayla birlikte 5 saat. Parkurun ortalama çıkış eğimi 900 ÷ 15.000 = %6\'dır.',
    ] },
    { h: 'Toplam tırmanışı nasıl bulursunuz?', p: [
      'En sık yapılan hata, toplam tırmanış yerine yalnızca başlangıç ile en yüksek nokta arasındaki farkı yazmaktır. Vadiye inip yeniden çıkan bir rotada gerçek çıkış bu farkın iki katını bulabilir. Topoğrafik haritada rota boyunca yukarı doğru kestiğiniz eş yükselti eğrilerini sayıp eğri aralığıyla çarparak toplamı bulabilirsiniz. Kayıtlı bir iz dosyanız varsa "toplam yükselme" ya da "kazanılan irtifa" olarak verilen değeri kullanın.',
      'Halka (dairesel) parkurlarda toplam çıkış toplam inişe eşittir. Gidiş-dönüş rotalarda ise gidişteki inişler dönüşte çıkışa dönüşür; bu yüzden gidişin hem çıkışını hem inişini toplayıp yazmak gerekir.',
    ] },
    { h: 'Kuralın kapsamadığı etkenler', ul: [
      '<strong>İniş:</strong> Naismith inişi düz yol gibi sayar. Hafif eğimli inişler gerçekten hız kazandırır, ancak dik ve taşlı inişler dizleri yorar ve çıkış kadar zaman alabilir. Dik inişi fazla olan rotalarda süreye pay ekleyin.',
      '<strong>Zemin:</strong> Bakımlı patika ile çarşak, çalılık, kar ya da çamur arasında büyük fark vardır. Zor zeminde düz yol hızını 3-4 km/sa\'e düşürerek hesaplamak daha gerçekçidir.',
      '<strong>Yük ve kondisyon:</strong> Çok günlük yürüyüşlerde ağır çanta hem hızı hem saatlik tırmanışı düşürür. Yeni başlayanlar için 4 km/sa ve 300-400 m/sa daha uygun başlangıç değerleridir.',
      '<strong>Grup:</strong> Grup, en yavaş üyesinin hızıyla ilerler ve kalabalık gruplarda duraklamalar uzar.',
      '<strong>Hava ve yükseklik:</strong> Sıcak, rüzgâr, sis ve yüksek irtifa tempoyu belirgin biçimde düşürür.',
    ] },
    { h: 'Türkiye\'deki parkurlarda kullanım', p: [
      'Likya Yolu, Kaçkarlar, Aladağlar, Toroslar ya da Kaz Dağları gibi bölgelerde etaplar kilometre olarak kısa görünse de tırmanış yüksektir. 12 km\'lik bir etabı "iki buçuk saatte biter" diye planlayıp 900 m çıkışı hesaba katmamak, günü karanlıkta bitirmenin en yaygın nedenidir. Aracı yola çıkmadan önce her etap için ayrı ayrı çalıştırın; dönüş saatini gün batımına göre geriye doğru hesaplayın ve en geç dönüş saatinizi baştan belirleyin.',
      'Kendi değerlerinizi bulmak için bildiğiniz bir parkurdaki gerçek sürenizi kullanın: hesaplanan süre gerçekleşenden kısa çıkıyorsa hızı ya da saatlik tırmanışı düşürüp sonucu tutturun; bu kişisel değerler sonraki planlarınızda çok daha isabetli sonuç verir.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'Bu hesap bilgilendirme amaçlı bir tahmindir; rehberlik, kurtarma planı ya da resmî parkur süresi yerine geçmez. Dağda hava hızla değişir, yön bulma hataları ve sakatlıklar süreyi katlayabilir. Yanınıza yedek ışık, su ve sıcak tutacak giysi alın, rotanızı ve dönüş saatinizi bir yakınınıza bildirin. Zorlu ve yüksek irtifalı rotalarda deneyimli bir rehberle hareket edin.',
    ] },
  ],
  faq: [
    ['Naismith kuralına göre 10 km kaç saatte yürünür?', 'Düz bir parkurda 10 ÷ 5 = 2 saat sürer. Aynı parkurda 600 m tırmanış varsa bir saat daha eklenir ve süre 3 saate çıkar. Mola bu sürelerin dışındadır.'],
    ['Toplam tırmanış ile irtifa farkı aynı şey mi?', 'Hayır. İrtifa farkı başlangıç ve bitiş (ya da zirve) yükseklikleri arasındaki farktır. Toplam tırmanış ise yol boyunca çıkılan bütün yokuşların toplamıdır ve inişli çıkışlı rotalarda irtifa farkından hayli büyük olur. Hesapta toplam tırmanış kullanılmalıdır.'],
    ['İniş süresi hesaba katılıyor mu?', 'Temel Naismith kuralında iniş için ek süre yoktur; iniş mesafesi düz yol gibi sayılır. Dik ve bozuk zeminli inişlerde gerçek süre uzar. Böyle rotalarda mola alanına ek dakika yazarak ya da düz yol hızını düşürerek pay bırakabilirsiniz.'],
    ['Yeni başlayanlar hangi değerleri kullanmalı?', 'Düzenli yürüyüş yapmayan biri için düz yolda 4 km/sa ve saatte 300-400 m tırmanış daha gerçekçidir. Birkaç yürüyüşten sonra gerçek sürelerinizi hesapla karşılaştırıp değerleri kendinize göre ayarlayın.'],
    ['Eşdeğer düz mesafe ne işe yarar?', 'Tırmanışın yürüyüşe eklediği zamanı kilometreye çevirir. Böylece biri kısa ama dik, diğeri uzun ama düz iki rotayı tek sayı üzerinden karşılaştırabilir, hangisinin daha uzun süreceğini görebilirsiniz.'],
    ['Mola süresini ne kadar almalıyım?', 'Kesin bir kural yoktur. Birçok yürüyüşçü her saat için 5-10 dakika kısa mola ve uzun parkurlarda ayrıca bir yemek molası planlar. Fotoğraf çekmeyi seviyorsanız ya da kalabalık bir grupla yürüyorsanız payı artırın.'],
    ['Koşu ya da patika koşusu için kullanılabilir mi?', 'Araç yürüyüş için tasarlanmıştır ve düz yol hızını 12 km/sa ile sınırlar. Patika koşusunda iniş ve çıkış dinamikleri farklıdır; yalnızca kaba bir fikir verir.'],
    ['Yazdığım rota bilgileri kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; mesafe, tırmanış ya da hız değerleriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['yuruyus-suresi-hesapla', 'egim-yuzdesi-hesapla', 'kamp-su-yiyecek-hesapla', 'yuruyus-kalori-hesapla', 'rakim-kaynama-noktasi-hesapla'],
};
