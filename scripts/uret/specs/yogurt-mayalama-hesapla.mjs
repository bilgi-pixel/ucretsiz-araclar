export default {
  slug: 'yogurt-mayalama-hesapla',
  title: 'Yoğurt Mayalama Oranı Hesaplama',
  h1Tail: 'süte göre maya miktarı',
  pageTitle: 'Yoğurt Mayalama Oranı Hesaplama – Kaç Litre Süte Ne Kadar Maya?',
  description: 'Süt miktarını ve maya oranını girin; ev yoğurdu için gereken maya yoğurdunu gram ve yemek kaşığı olarak, elde edilecek yaklaşık yoğurt miktarıyla birlikte hesaplayın.',
  card: 'Ev yoğurdu için süt miktarına göre gereken mayayı gram ve yemek kaşığı olarak hesaplayın.',
  category: 'gunluk',
  keywords: ['yoğurt mayalama oranı', '1 litre süte ne kadar maya', 'yoğurt mayası ölçüsü', 'ev yoğurdu maya miktarı', '5 litre süte kaç kaşık yoğurt', 'yoğurt nasıl mayalanır ölçü', 'yoğurt maya hesaplama'],
  lead: 'Mayalayacağınız sütün miktarını yazın; araç seçtiğiniz orana göre <strong>kaç gram maya yoğurdu</strong> gerektiğini, bunun kaç yemek kaşığına denk geldiğini ve tencereden yaklaşık ne kadar yoğurt çıkacağını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'sut', label: 'Süt miktarı (litre)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'mayaOran', label: 'Maya oranı (100 ml süte gram)', type: 'number', value: '2', hint: '2 değeri, 1 litre süte 20 g (yaklaşık bir dolu yemek kaşığı) maya demektir.' },
  ],
  compute(v, h) {
    const L = h.pos(v.sut, 'Süt miktarı');
    if (L > 1000) h.err('Süt miktarı en fazla 1000 litre olabilir.');
    const p = h.pos(v.mayaOran, 'Maya oranı');
    if (p > 10) h.err('Maya oranı 10\'dan büyük olamaz. Fazla maya yoğurdu ekşitir ve sulandırır; yaygın değerler 1 ile 3 arasındadır.');
    const maya = L * 10 * p;
    const sutG = L * 1030;
    return {
      rows: [
        ['Gereken maya', h.fmt(maya, 1) + ' g'],
        ['Yaklaşık yemek kaşığı', h.fmt(maya / 15, 1) + ' kaşık'],
        ['1 litre süte düşen maya', h.fmt(p * 10, 1) + ' g'],
        ['Yaklaşık yoğurt miktarı', h.fmt(sutG + maya, 0) + ' g'],
        ['Mayanın karışımdaki payı', '%' + h.fmt(maya / (sutG + maya) * 100, 2)],
      ],
      note: 'Bir yemek kaşığı yoğurt 15 g, bir litre süt 1.030 g kabul edilmiştir. Süt kaynatılırken suyu azaldığı için gerçek yoğurt miktarı biraz daha düşük olabilir.',
    };
  },
  cases: [
    { in: { sut: '3', mayaOran: '2' }, out: { 'Gereken maya': '60 g', 'Yaklaşık yemek kaşığı': '4 kaşık', '1 litre süte düşen maya': '20 g', 'Yaklaşık yoğurt miktarı': '3.150 g' } },
    { in: { sut: '1', mayaOran: '2' }, out: { 'Gereken maya': '20 g', 'Yaklaşık yemek kaşığı': '1,3 kaşık', 'Yaklaşık yoğurt miktarı': '1.050 g' } },
    { in: { sut: '5', mayaOran: '1,5' }, out: { 'Gereken maya': '75 g', 'Yaklaşık yemek kaşığı': '5 kaşık', '1 litre süte düşen maya': '15 g', 'Yaklaşık yoğurt miktarı': '5.225 g' } },
    { in: { sut: '2', mayaOran: '3' }, out: { 'Gereken maya': '60 g', 'Yaklaşık yemek kaşığı': '4 kaşık', 'Yaklaşık yoğurt miktarı': '2.120 g' } },
    { in: { sut: '0,5', mayaOran: '2' }, out: { 'Gereken maya': '10 g', 'Yaklaşık yemek kaşığı': '0,7 kaşık', 'Yaklaşık yoğurt miktarı': '525 g' } },
    { in: { sut: '10', mayaOran: '1' }, out: { 'Gereken maya': '100 g', 'Yaklaşık yemek kaşığı': '6,7 kaşık', 'Yaklaşık yoğurt miktarı': '10.400 g' } },
    { in: { sut: '0', mayaOran: '2' }, error: true },
    { in: { sut: '3', mayaOran: '25' }, error: true },
    { in: { sut: 'üç litre', mayaOran: '2' }, error: true },
  ],
  howto: [
    'Mayalayacağınız sütün miktarını litre olarak yazın; yarım litre için 0,5 girebilirsiniz.',
    'Maya oranını kontrol edin. Varsayılan 2 değeri, bir litre süte 20 gram maya anlamına gelir; daha tatlı yoğurt için düşürebilir, daha ekşi için artırabilirsiniz.',
    '"Hesapla" düğmesine basın. Gereken maya gram ve yemek kaşığı olarak gösterilir.',
    'Mayayı tartın, bir kâsede biraz ılık sütle açın ve sütün geri kalanına karıştırın.',
  ],
  sections: [
    { h: 'Maya miktarı nasıl hesaplanır?', p: [
      'Yoğurt, sütün içine az miktarda canlı yoğurt kültürü katılıp ılık bir ortamda bekletilmesiyle oluşur. Evde bu kültür, önceki yoğurttan ayrılan birkaç kaşık "maya" ile sağlanır. Gereken miktar sütle doğru orantılıdır ve formül basittir: <strong>maya (g) = süt (litre) × 10 × oran</strong>. Oran, her 100 ml süte kaç gram maya konacağını gösterir; 2 değeri litre başına 20 gram demektir.',
      'Ev mutfağındaki "bir litre süte bir yemek kaşığı yoğurt" ölçüsü de aşağı yukarı bu aralığa düşer. Araç gramı yemek kaşığına çevirirken silme bir kaşık yoğurdu 15 gram kabul eder; tepeleme kaşık bunun belirgin biçimde üzerindedir. Büyük partilerde kaşık sayarak değil tartarak ölçmek daha tutarlı sonuç verir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Üç litre süt mayalayacaksınız ve varsayılan oranı kullanıyorsunuz. Gereken maya 3 × 10 × 2 = <strong>60 gram</strong>, yani yaklaşık <strong>4 yemek kaşığı</strong> yoğurttur. Üç litre süt yaklaşık 3.090 gram geldiğinden, maya ile birlikte tencerede 3.150 gram karışım olur; yoğurt tuttuğunda elinizde kabaca bu kadar ürün bulunur.',
      'Beş litrelik bir tencere için oranı 1,5\'e indirdiğinizde hesap 5 × 10 × 1,5 = <strong>75 gram</strong>, yani beş yemek kaşığı eder. Sütü uzun süre kaynatıp koyulaştırdıysanız çıkan yoğurt, buharlaşan su kadar daha az ama daha kıvamlı olur.',
    ] },
    { h: 'Daha fazla maya daha iyi yoğurt demek değildir', p: [
      'Mayayı artırmak yoğurdun daha iyi tutmasını sağlamaz. Fazla maya, bakterilerin sütteki şekeri hızla tüketmesine ve yoğurdun çabuk ekşimesine yol açar; kıvam gevşer ve üstte su birikir. Az maya ise mayalanmayı yavaşlatır; yoğurt daha geç tutar ama genellikle daha tatlı ve pürüzsüz olur. Çok az maya kullanıldığında ya da maya bayatsa süt hiç tutmayabilir.',
      'Bu yüzden oranı küçük adımlarla değiştirmek gerekir. Yoğurdunuz ekşi çıkıyorsa oranı 2\'den 1,5\'e indirip mayalama süresini kısaltmayı, hiç ekşimsi tat almıyorsanız ve yoğurt geç tutuyorsa oranı biraz artırmayı deneyebilirsiniz.',
    ] },
    { h: 'Mayalama adımları', ol: [
      'Sütü kaynatın ve kısık ateşte bir süre daha tutun; bu hem güvenlik hem de kıvam için gereklidir.',
      'Sütü ılımaya bırakın. Mayalama için süt, parmağınızı içinde birkaç saniye rahatça tutabileceğiniz sıcaklıkta, yani kabaca 43–45 °C dolayında olmalıdır. Termometre kullanmak en güvenilir yoldur.',
      'Hesaplanan mayayı oda sıcaklığına gelmiş olarak bir kâseye alın, birkaç kaşık ılık sütle pürüzsüz olana kadar açın.',
      'Açılmış mayayı süte ekleyip yavaşça karıştırın ya da kabın kenarından süzdürün.',
      'Kabı kapatın, sarıp sarmalayın ve sarsmadan ılık bir yerde yoğurt tutana kadar birkaç saat bekletin.',
      'Tutan yoğurdu sargısından çıkarıp oda sıcaklığında biraz dinlendirin, ardından buzdolabına alın. Bir sonraki sefer için birkaç kaşığını temiz bir kaba ayırın.',
    ] },
    { h: 'Hızlı başvuru (oran 2)', ul: [
      '<strong>1 litre süt:</strong> 20 g maya (yaklaşık 1,3 yemek kaşığı)',
      '<strong>2 litre süt:</strong> 40 g maya (yaklaşık 2,7 yemek kaşığı)',
      '<strong>3 litre süt:</strong> 60 g maya (4 yemek kaşığı)',
      '<strong>5 litre süt:</strong> 100 g maya (yaklaşık 6,7 yemek kaşığı)',
      '<strong>10 litre süt:</strong> 200 g maya (yaklaşık 13,3 yemek kaşığı)',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Sütü çok sıcakken mayalamak: yüksek sıcaklık kültürü öldürür, yoğurt tutmaz ya da pütürlü olur.',
      'Sütü fazla soğutmak: mayalanma çok yavaşlar, yoğurt sulu kalır.',
      'Mayayı buzdolabından çıkarır çıkarmaz katmak: soğuk maya sütün sıcaklığını düşürür ve topaklanır.',
      'Mayalanırken kabı sallamak ya da karıştırmak: pıhtı bozulur ve su salar.',
      'Bayat ya da çok ekşimiş yoğurdu maya yapmak: kültür zayıflamıştır; taze ve beğendiğiniz bir yoğurttan maya alın.',
    ], p: [
      'Hesaplanan yoğurt miktarı yaklaşık bir değerdir; kaynatma sırasındaki buharlaşmayı ve süzme işlemini dikkate almaz. Süzme yoğurt yapacaksanız ürün, süzme süresine bağlı olarak belirgin biçimde azalır. Sonuçlar bilgilendirme amaçlıdır. Çiğ süt kullanıyorsanız mutlaka kaynatın; kötü kokan, renk değiştiren ya da küflenen yoğurdu tüketmeyin.',
    ] },
  ],
  faq: [
    ['1 litre süte ne kadar maya konur?', 'Varsayılan oranla 20 gram, yani yaklaşık bir dolu yemek kaşığı yoğurt yeterlidir. Daha tatlı bir yoğurt için 15 grama inebilir, daha ekşi için 30 grama çıkabilirsiniz.'],
    ['5 litre süte kaç kaşık yoğurt gerekir?', 'Oran 2 iken 100 gram, yani yaklaşık 6–7 silme yemek kaşığı; oran 1,5 iken 75 gram, yani 5 yemek kaşığı maya gerekir.'],
    ['Fazla maya koyarsam ne olur?', 'Yoğurt daha çabuk tutar ama ekşi ve sulu olur. Kıvamı iyileştirmek için mayayı artırmak yerine sütü biraz daha uzun kaynatmak ve mayalama sıcaklığını doğru tutturmak gerekir.'],
    ['Süt hangi sıcaklıkta mayalanır?', 'Yaygın olarak 43–45 °C dolayı önerilir. Termometre yoksa parmağınızı sütte birkaç saniye rahatça tutabilmeniz kaba bir göstergedir; ancak kişiden kişiye değiştiği için termometre daha güvenilirdir.'],
    ['Maya olarak hazır yoğurt kullanabilir miyim?', 'Evet, canlı kültür içeren sade bir yoğurt kullanılabilir. İlk mayalamada sonuç zayıf olabilir; elde ettiğiniz yoğurttan ayırdığınız maya ile sonraki denemeler genellikle daha iyi tutar.'],
    ['Araç neden bir kaşığı 15 gram alıyor?', 'Silme bir yemek kaşığı yoğurt kabaca bu kadar gelir. Kaşıkların büyüklüğü ve doluluğu değiştiği için bu satır yalnızca fikir verir; tartı her zaman daha doğrudur.'],
    ['Yoğurt miktarı neden süt miktarından farklı?', 'Bir litre süt yaklaşık 1.030 gram gelir ve maya da ağırlığa eklenir. Öte yandan kaynatma sırasında su buharlaşır; uzun kaynatılan sütten daha az ama daha koyu yoğurt çıkar.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir değer sunucuya gönderilmez.'],
  ],
  related: ['maya-donusumu-hesapla', 'tarif-olcekle', 'mutfak-olcu-donustur', 'salamura-tuz-orani-hesapla', 'recel-seker-orani-hesapla'],
};
