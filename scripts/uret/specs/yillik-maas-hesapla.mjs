export default {
  slug: 'yillik-maas-hesapla',
  title: 'Yıllık Maaş Hesaplama',
  h1Tail: 'ikramiye ve yan haklarla',
  pageTitle: 'Yıllık Maaş Hesaplama – İkramiye ve Yan Haklarla Yıllık Gelir',
  description: "Aylık maaşınızı ikramiye, prim ve yemek-yol gibi yan haklarla birlikte yıllık toplam gelire çevirin; aylık ortalama ve günlük karşılığını görün.",
  card: "Aylık maaş, ikramiye, prim ve yan haklardan yıllık toplam geliri ve gerçek aylık ortalamanızı hesaplayın.",
  category: 'finans',
  keywords: ['yıllık maaş hesaplama', 'yıllık gelir hesaplama', 'aylık maaş yıllık kaç', 'ikramiyeli maaş hesaplama', '16 maaş hesaplama', 'yıllık toplam ücret', 'yıllık paket hesaplama'],
  lead: "Aylık maaşınızı, yılda aldığınız ikramiye sayısını, primleri ve aylık yan haklarınızı yazın; araç <strong>yıllık toplam gelirinizi</strong>, bunun 12 aya bölünmüş ortalamasını ve günlük karşılığını hesaplasın. İki iş teklifini aynı ölçüyle karşılaştırmak için kullanışlıdır.",
  button: 'Hesapla',
  inputs: [
    { id: 'maas', label: 'Aylık maaş (TL)', type: 'number', placeholder: 'Örn. 50000', hint: 'Binlik ayraç kullanmayın ya da 50.000,00 biçiminde yazın.' },
    { id: 'ay', label: 'Yıl içinde çalışılan ay', type: 'number', value: '12' },
    { id: 'ikramiye', label: 'Yıllık ikramiye sayısı (maaş cinsinden)', type: 'number', value: '0', hint: 'Örn. yılda 4 maaş ikramiye için 4; yarım maaş için 0,5.' },
    { id: 'prim', label: 'Yıllık prim ve ek ödemeler (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 20000', hint: 'Binlik ayraç kullanmayın.' },
    { id: 'yanHak', label: 'Aylık yan haklar (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 3000', hint: 'Yemek, yol, özel sigorta gibi aylık parasal karşılığı olan haklar.' },
  ],
  compute(v, h) {
    const maas = h.pos(v.maas, 'Aylık maaş');
    const ay = h.opt(v.ay, 12, 'Yıl içinde çalışılan ay');
    if (!(ay > 0) || ay > 12) h.err('"Yıl içinde çalışılan ay" 0\'dan büyük ve en fazla 12 olmalı.');
    const ikr = h.opt(v.ikramiye, 0, 'Yıllık ikramiye sayısı');
    const prim = h.opt(v.prim, 0, 'Yıllık prim ve ek ödemeler');
    const yan = h.opt(v.yanHak, 0, 'Aylık yan haklar');
    if (ikr < 0 || prim < 0 || yan < 0) h.err('İkramiye, prim ve yan hak değerleri negatif olamaz.');
    const temel = maas * ay;
    const ikrTutar = maas * ikr;
    const yanYil = yan * ay;
    const toplam = temel + ikrTutar + prim + yanYil;
    return {
      rows: [
        ['Yıllık toplam gelir', h.para(toplam)],
        ['Yıllık maaş (ek ödemeler hariç)', h.para(temel)],
        ['İkramiye tutarı', h.para(ikrTutar)],
        ['Prim ve ek ödemeler', h.para(prim)],
        ['Yan haklar (yıllık)', h.para(yanYil)],
        ['Aylık ortalama (12 aya bölünmüş)', h.para(toplam / 12)],
        ['Günlük ortalama (365 gün)', h.para(toplam / 365)],
      ],
      note: 'Girdiğiniz tutarlar brütse sonuç brüt, netse nettir. Vergi ve prim kesintisi hesaplanmaz; yıl içindeki zamlar dikkate alınmaz.',
    };
  },
  cases: [
    { in: { maas: '50000' }, out: { 'Yıllık toplam gelir': '600.000,00 TL', 'Aylık ortalama (12 aya bölünmüş)': '50.000,00 TL', 'Günlük ortalama (365 gün)': '1.643,84 TL' } },
    { in: { maas: '40000', ikramiye: '4' }, out: { 'Yıllık toplam gelir': '640.000,00 TL', 'Yıllık maaş (ek ödemeler hariç)': '480.000,00 TL', 'İkramiye tutarı': '160.000,00 TL', 'Aylık ortalama (12 aya bölünmüş)': '53.333,33 TL' } },
    { in: { maas: '30000', ikramiye: '2', prim: '20000', yanHak: '3000' }, out: { 'Yıllık toplam gelir': '476.000,00 TL', 'İkramiye tutarı': '60.000,00 TL', 'Yan haklar (yıllık)': '36.000,00 TL', 'Aylık ortalama (12 aya bölünmüş)': '39.666,67 TL' } },
    { in: { maas: '60000', ay: '6' }, out: { 'Yıllık toplam gelir': '360.000,00 TL', 'Aylık ortalama (12 aya bölünmüş)': '30.000,00 TL' } },
    { in: { maas: '36500', ikramiye: '0,5', yanHak: '1000', ay: '12' }, out: { 'Yıllık toplam gelir': '468.250,00 TL', 'İkramiye tutarı': '18.250,00 TL', 'Yan haklar (yıllık)': '12.000,00 TL' } },
    { in: { maas: '25000', prim: '65000' }, out: { 'Yıllık toplam gelir': '365.000,00 TL', 'Günlük ortalama (365 gün)': '1.000,00 TL' } },
    { in: { maas: '50000', ay: '13' }, error: true },
    { in: { maas: '-100' }, error: true },
  ],
  howto: [
    '"Aylık maaş" alanına bir aylık ücretinizi yazın. Brüt yazarsanız sonuç brüt, net yazarsanız net olur.',
    'Yılın tamamında çalışacaksanız ay sayısını 12 bırakın; yıl ortasında işe başladıysanız çalışacağınız ay sayısını girin.',
    'İşyeriniz yılda belirli sayıda maaş tutarında ikramiye veriyorsa bu sayıyı yazın. Örneğin "16 maaş" uygulamasında ikramiye sayısı 4\'tür.',
    'Varsa yıllık toplam prim ve ek ödemeleri, ayrıca yemek ve yol gibi aylık yan hakların parasal karşılığını girin.',
    '"Hesapla" düğmesine basın; yıllık toplam, kalem kalem dağılım ve aylık ortalama listelenir.',
  ],
  sections: [
    { h: 'Yıllık maaş neden aylık maaşın 12 katından farklı olabilir?', p: [
      "İş ilanlarında ve tekliflerde konuşulan rakam çoğunlukla aylık maaştır; oysa bir yılda elinize geçen toplam tutar yalnızca on iki maaştan oluşmayabilir. Bazı işyerleri yılda bir ya da birkaç maaş tutarında ikramiye öder, bazıları performansa bağlı prim verir, birçoğu da yemek kartı, yol yardımı, özel sağlık sigortası gibi yan haklar sağlar. Bunların hepsi toplandığında ortaya çıkan rakama <em>yıllık toplam gelir</em> ya da yıllık paket denir.",
      "İki teklifi karşılaştırırken yalnızca aylık maaşa bakmak yanıltıcı olabilir. Aylık 40.000 TL ve yılda dört ikramiye veren bir işyerinin yıllık ödemesi 640.000 TL'dir; bu, ikramiyesiz aylık 53.333 TL'lik bir maaşa denktir. Aylık 50.000 TL öneren ikramiyesiz ikinci teklif ilk bakışta yüksek görünse de yıllık toplamda 40.000 TL geride kalır.",
    ] },
    { h: 'Hesaplama formülü', p: [
      "Araç şu toplamı hesaplar: <strong>Yıllık toplam gelir = (aylık maaş × çalışılan ay) + (aylık maaş × ikramiye sayısı) + yıllık prim + (aylık yan haklar × çalışılan ay)</strong>. Aylık ortalama bu toplamın 12'ye, günlük ortalama 365'e bölünmesiyle bulunur.",
      "İkramiye sayısı maaş cinsindendir ve ondalıklı olabilir: yarım maaş için 0,5, bir buçuk maaş için 1,5 yazılır. İkramiye tutarı sabit bir para olarak belirlenmişse bunu ikramiye sayısına değil, yıllık prim ve ek ödemeler alanına ekleyin.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Aylık maaşı 30.000 TL olan, yılda 2 maaş ikramiye ve toplam 20.000 TL prim alan, ayrıca her ay 3.000 TL değerinde yemek ve yol desteğinden yararlanan bir çalışanı ele alalım. On iki aylık maaş 30.000 × 12 = 360.000 TL, ikramiye 30.000 × 2 = 60.000 TL, yan haklar 3.000 × 12 = 36.000 TL eder. Prim de eklendiğinde yıllık toplam 360.000 + 60.000 + 20.000 + 36.000 = <strong>476.000 TL</strong> olur.",
      "Bu toplamın 12'ye bölümü 39.666,67 TL'dir. Yani çalışanın aylık maaşı 30.000 TL olarak konuşulsa da işverenden sağladığı toplam faydanın aylık ortalaması yaklaşık 39.667 TL'dir. Başka bir teklifi değerlendirirken karşılaştırılması gereken rakam budur.",
    ] },
    { h: 'Yıl ortasında işe başlayanlar', p: [
      "Çalışılan ay sayısını 12'den küçük girerseniz maaş ve yan haklar o kadar ayla çarpılır. Temmuz başında işe giren ve aylık 60.000 TL alan biri için ay sayısı 6'dır; o takvim yılındaki maaş geliri 360.000 TL olur. Aylık ortalama satırı toplamı yine 12'ye böldüğü için 30.000 TL gösterir; bu, takvim yılının tamamına yayılmış ortalamadır ve yıllık gelir beyanı ya da yıllık bütçe planı yaparken işe yarar.",
      "İkramiye ve prim alanları çalışılan ayla otomatik oranlanmaz, çünkü işyerlerinin kıstelyevm uygulaması birbirinden farklıdır. Yıl içinde alacağınız ikramiye sayısını kendiniz oranlayarak yazın; örneğin altı ay çalışıp yıllık dört ikramiyenin ikisini alacaksanız 2 girin.",
    ] },
    { h: 'Brüt, net ve vergi dilimleri hakkında not', p: [
      "Araç brütten nete ya da netten brüte çeviri yapmaz. Ücret gelirinde vergi, yıl içinde kümülatif matrah arttıkça değişen dilimlere göre hesaplandığından brüt maaşı sabit olan bir çalışanın net maaşı yılın ilerleyen aylarında düşebilir. Bu nedenle net yıllık geliri bulmak için tek bir ayın netini 12 ile çarpmak her zaman doğru sonuç vermez; aylık net tutarları ayrı ayrı toplamak ya da ortalama bir net tutar girmek gerekir.",
      "Vergi dilimleri, istisnalar ve prim oranları yıldan yıla değişir ve bu sayfada sabitlenmemiştir. Kesin net tutar için güncel mevzuatı kontrol edin ya da bordro birimine danışın. Sonuçlar bilgilendirme amaçlıdır; mali danışmanlık yerine geçmez.",
    ] },
    { h: 'Tekliflerde yıllık pakete dâhil edilebilecek kalemler', ul: [
      "Sabit ikramiyeler ve bayram ödemeleri",
      "Performans, satış ya da hedef primleri (garanti değilse temkinli bir tahminle)",
      "Yemek kartı ya da yemek ücreti, yol ve yakıt desteği",
      "Özel sağlık sigortası ve bireysel emeklilik işveren katkısının yıllık karşılığı",
      "Kira, çocuk, eğitim ya da yakacak yardımı gibi düzenli sosyal ödemeler",
    ] },
  ],
  faq: [
    ['Yıllık maaş nasıl hesaplanır?', "Aylık maaş çalışılan ay sayısıyla çarpılır; varsa ikramiye, prim ve yan haklar eklenir. Yalnızca maaş alan ve tam yıl çalışan biri için aylık 50.000 TL, yıllık 600.000 TL eder."],
    ['16 maaş ne demek, nasıl girerim?', "On iki aylık maaşa ek olarak yılda dört maaş tutarında ikramiye ödendiği anlamına gelir. Ay sayısını 12, ikramiye sayısını 4 girin. Aylık 40.000 TL için yıllık toplam 640.000 TL olur."],
    ['Aylık ortalama satırı neyi gösterir?', "Yıllık toplam gelirin 12'ye bölünmüş hâlidir. İkramiye ve primler yılın belirli aylarında ödense de bütçenizi planlarken ya da ikramiyesiz bir teklifle karşılaştırırken bu ortalamayı kullanabilirsiniz."],
    ['Sonuç brüt mü net mi?', "Hangi tutarı girerseniz o türden sonuç alırsınız. Araç vergi ve sigorta primi kesintilerini hesaplamaz; brüt girdide brüt, net girdide net yıllık toplamı verir."],
    ['Yıl içinde zam alırsam ne yapmalıyım?', "Araç tek bir aylık maaşla hesap yapar. Zam bekliyorsanız yılın ortalama aylık maaşını yazabilirsiniz; örneğin altı ay 40.000 TL, altı ay 50.000 TL alacaksanız ortalama 45.000 TL girin."],
    ['Yan hakları neden eklemeliyim?', "Yemek, yol ya da özel sigorta gibi haklar cebinizden çıkacak bir harcamayı karşıladığı için gelirinizin parçasıdır. İki teklif arasında maaş farkı küçükse yan haklar dengeyi değiştirebilir."],
    ['Günlük ortalama nasıl bulunuyor?', "Yıllık toplam gelir 365'e bölünür. Bu, takvim günü başına düşen gelirdir; çalışılan gün başına ücret değildir. Yıllık 365.000 TL gelir günde 1.000 TL'ye karşılık gelir."],
    ['Maaş bilgilerim bir yerde saklanıyor mu?', "Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz tutarlar sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ['saatlik-aylik-ucret-cevir', 'aylik-odeme-gucu-hesapla', 'butce-50-30-20-hesapla', 'tasarruf-orani-hesapla', 'hedef-birikim-suresi-hesapla'],
};
