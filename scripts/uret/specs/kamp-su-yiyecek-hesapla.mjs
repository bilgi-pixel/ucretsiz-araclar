export default {
  slug: 'kamp-su-yiyecek-hesapla',
  title: 'Kamp Suyu ve Yiyecek Miktarı Hesaplama',
  h1Tail: 'kişi ve gün sayısına göre',
  pageTitle: 'Kamp Suyu ve Yiyecek Miktarı Hesaplama – Kaç Litre Su Gerekir?',
  description: 'Kişi sayısı, gün, hava ve tempoya göre kampa götürülecek içme ve kullanma suyunu, gereken toplam kaloriyi ve yaklaşık yiyecek ağırlığını hesaplayın.',
  card: 'Kamp ve doğa yürüyüşü için kişi ve gün sayısına göre su litresini, kalori ihtiyacını ve yiyecek ağırlığını planlayın.',
  category: 'gunluk',
  keywords: ['kamp su hesaplama', 'kampa kaç litre su', 'kamp yiyecek miktarı', 'kamp erzak listesi hesaplama', 'trekking su ihtiyacı', 'kamp kalori hesaplama', 'kişi başı günlük su kamp'],
  lead: 'Kampa ya da çok günlü doğa yürüyüşüne çıkarken yanınıza <strong>kaç litre su ve kaç kilo yiyecek</strong> almanız gerektiğini planlayın. Araç, kişi sayısı, gün, hava durumu ve günlük tempoya göre yaygın planlama değerlerini kullanarak toplam su, enerji ve erzak ağırlığını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'kisi', label: 'Kişi sayısı', type: 'number', placeholder: 'Örn. 2', value: '2' },
    { id: 'gun', label: 'Gün sayısı', type: 'number', placeholder: 'Örn. 3', value: '3' },
    { id: 'tempo', label: 'Günlük tempo', type: 'select', options: [['orta', 'Orta (günübirlik yürüyüşler)'], ['hafif', 'Hafif (kamp alanında dinlenme)'], ['yogun', 'Yoğun (yüklü trekking, tırmanış)']] },
    { id: 'hava', label: 'Hava', type: 'select', options: [['ilik', 'Ilıman'], ['sicak', 'Sıcak (yaz, güneş altı)'], ['soguk', 'Soğuk (kış, yüksek irtifa)']] },
    { id: 'kullanim', label: 'Kullanma suyu', type: 'select', options: [['yemek', 'Yalnızca yemek ve sıcak içecek'], ['yok', 'Hesaba katma (yalnızca içme suyu)'], ['tam', 'Yemek, bulaşık ve kişisel temizlik']] },
    { id: 'yogunluk', label: 'Yiyeceğin enerji yoğunluğu (kcal/100 g)', type: 'number', value: '400', hint: 'Kuru ağırlıklı erzakta 350–450, taze ve konserve ağırlıklı erzakta 150–250 alınabilir.' },
  ],
  compute(v, h) {
    const kisi = h.posint(v.kisi, 'Kişi sayısı');
    const gun = h.posint(v.gun, 'Gün sayısı');
    const yog = h.pos(v.yogunluk, 'Enerji yoğunluğu');
    if (kisi > 500) h.err('Kişi sayısı en fazla 500 olabilir.');
    if (gun > 60) h.err('Gün sayısı en fazla 60 olabilir.');
    if (yog < 50 || yog > 900) h.err('Enerji yoğunluğu 50 ile 900 kcal/100 g arasında olmalı; yağın bile yoğunluğu 900 civarındadır.');
    const icmeTaban = { hafif: 2, orta: 3, yogun: 4 }[v.tempo] ?? 3;
    const icmeKisi = icmeTaban + (v.hava === 'sicak' ? 1 : 0);
    const kullanimKisi = { yok: 0, yemek: 1, tam: 3 }[v.kullanim] ?? 1;
    const kcalKisi = ({ hafif: 2500, orta: 3000, yogun: 3500 }[v.tempo] ?? 3000) + (v.hava === 'soguk' ? 500 : 0);
    const kg = kisi * gun;
    const icme = icmeKisi * kg;
    const kullanim = kullanimKisi * kg;
    const su = icme + kullanim;
    const kcal = kcalKisi * kg;
    const yiyecek = kcal / yog / 10;
    return {
      rows: [
        ['Toplam su', h.fmt(su, 1) + ' litre'],
        ['İçme suyu', h.fmt(icme, 1) + ' litre'],
        ['Kullanma suyu', h.fmt(kullanim, 1) + ' litre'],
        ['Kişi başı günlük su', h.fmt(icmeKisi + kullanimKisi, 1) + ' litre'],
        ['Toplam enerji ihtiyacı', h.fmt(kcal, 0) + ' kcal'],
        ['Kişi başı günlük enerji', h.fmt(kcalKisi, 0) + ' kcal'],
        ['Yaklaşık yiyecek ağırlığı', h.fmt(yiyecek, 1) + ' kg'],
        ['Su ve yiyecek toplam yükü', h.fmt(su + yiyecek, 1) + ' kg'],
      ],
      note: 'Değerler ortalama bir yetişkin için planlama kabulleridir; kişiye, güzergâha ve su kaynağına göre değişir. Güzergâhta güvenilir su kaynağı yoksa yedek pay bırakın.',
    };
  },
  cases: [
    { in: { kisi: '2', gun: '3', tempo: 'orta', hava: 'ilik', kullanim: 'yemek', yogunluk: '400' }, out: { 'Toplam su': '24 litre', 'İçme suyu': '18 litre', 'Kullanma suyu': '6 litre', 'Toplam enerji ihtiyacı': '18.000 kcal', 'Yaklaşık yiyecek ağırlığı': '4,5 kg', 'Su ve yiyecek toplam yükü': '28,5 kg' } },
    { in: { kisi: '4', gun: '2', tempo: 'hafif', hava: 'sicak', kullanim: 'yok', yogunluk: '400' }, out: { 'Toplam su': '24 litre', 'Kullanma suyu': '0 litre', 'Kişi başı günlük su': '3 litre', 'Toplam enerji ihtiyacı': '20.000 kcal', 'Yaklaşık yiyecek ağırlığı': '5 kg' } },
    { in: { kisi: '1', gun: '1', tempo: 'yogun', hava: 'soguk', kullanim: 'tam', yogunluk: '400' }, out: { 'Toplam su': '7 litre', 'Kişi başı günlük enerji': '4.000 kcal', 'Yaklaşık yiyecek ağırlığı': '1 kg', 'Su ve yiyecek toplam yükü': '8 kg' } },
    { in: { kisi: '3', gun: '5', tempo: 'yogun', hava: 'ilik', kullanim: 'yemek', yogunluk: '500' }, out: { 'Toplam su': '75 litre', 'İçme suyu': '60 litre', 'Toplam enerji ihtiyacı': '52.500 kcal', 'Yaklaşık yiyecek ağırlığı': '10,5 kg' } },
    { in: { kisi: '2', gun: '2', tempo: 'yogun', hava: 'sicak', kullanim: 'tam', yogunluk: '400' }, out: { 'Toplam su': '32 litre', 'İçme suyu': '20 litre', 'Kullanma suyu': '12 litre', 'Yaklaşık yiyecek ağırlığı': '3,5 kg' } },
    { in: { kisi: '2', gun: '3', tempo: 'orta', hava: 'ilik', kullanim: 'yemek', yogunluk: '200' }, out: { 'Yaklaşık yiyecek ağırlığı': '9 kg' } },
    { in: { kisi: '0', gun: '3' }, error: true },
    { in: { kisi: '2', gun: '2,5' }, error: true },
    { in: { kisi: '2', gun: '3', yogunluk: '4000' }, error: true },
  ],
  howto: [
    'Kampa katılacak kişi sayısını ve doğada geçireceğiniz gün sayısını yazın. Yarım günleri tam güne yuvarlamak güvenli taraftır.',
    'Günlük tempoyu seçin: kamp alanında oturmak, günübirlik yürümek ve sırtta yükle uzun parkur yürümek çok farklı miktarda su ve enerji ister.',
    'Hava durumunu ve suyu yalnızca içmek için mi, yemek ve temizlik için de mi taşıyacağınızı belirtin.',
    'Erzağınızın türüne göre enerji yoğunluğunu ayarlayın; emin değilseniz kuru ağırlıklı erzak için 400 değerini bırakın.',
    '"Hesapla" düğmesine basıp toplam suyu, kaloriyi ve yaklaşık yiyecek ağırlığını görün; sonucu ekip arkadaşlarınızla paylaşmak için kopyalayın.',
  ],
  sections: [
    { h: 'Hesap hangi kabullere dayanıyor?', p: [
      'Doğa sporlarında su ve erzak planı kesin bir formülden çok, denenmiş pratik değerlere dayanır. Bu araç içme suyu için kişi başına günde hafif tempoda 2 litre, orta tempoda 3 litre, yoğun tempoda 4 litre alır; sıcak havada bu değere 1 litre ekler. Kullanma suyu ayrı tutulur: yalnızca yemek ve çay-kahve için kişi başı günde 1 litre, bulaşık ve el-yüz temizliği de dahilse 3 litre hesaplanır.',
      'Enerji tarafında kişi başı günlük ihtiyaç hafif tempoda 2.500, orta tempoda 3.000, yoğun tempoda 3.500 kilokalori kabul edilir. Soğuk havada vücut ısısını korumak ek enerji harcattığı için 500 kilokalori eklenir. Bunlar ortalama bir yetişkin için yuvarlak planlama sayılarıdır; iri yapılı biri ya da ağır sırt çantası taşıyan biri daha fazlasına ihtiyaç duyar, çocuklar daha azına.',
    ] },
    { h: 'Yiyecek ağırlığı nasıl bulunuyor?', p: [
      'Toplam enerji ihtiyacı, taşıdığınız yiyeceğin enerji yoğunluğuna bölünür: <strong>yiyecek (kg) = toplam kcal ÷ (kcal/100 g) ÷ 10</strong>. Enerji yoğunluğu, erzağın 100 gramının kaç kilokalori verdiğidir. Makarna, bulgur, pirinç, yulaf, kuru meyve ve bisküvi gibi kuru gıdalar 350 civarındadır; kuruyemiş, çikolata, tahin helvası ve fıstık ezmesi 500–600 düzeyine çıkar. Taze meyve-sebze, hazır yemek konservesi ve yoğurt gibi su oranı yüksek gıdalarda değer 50–150 arasına iner.',
      'Bu nedenle aynı kaloriyi taşımak için konserve ağırlıklı bir erzak torbası, kuru ağırlıklı torbanın iki katından ağır gelebilir. Arabayla ulaşılan bir kamp alanında bu önemli değildir; her şeyi sırtınızda taşıyacaksanız yoğunluğu yüksek tutmak yükü ciddi biçimde hafifletir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'İki kişi, ılıman havada üç gün kamp yapacak ve gün içinde orta tempolu yürüyüşlere çıkacak. Suyu içmek ve yemek pişirmek için taşıyacaklar. İçme suyu 3 litre × 2 kişi × 3 gün = 18 litre, yemek suyu 1 × 2 × 3 = 6 litre eder; toplam <strong>24 litre</strong>. Enerji ihtiyacı 3.000 × 6 = 18.000 kilokaloridir. Erzak 100 gramda ortalama 400 kilokalori veriyorsa 18.000 ÷ 400 ÷ 10 = <strong>4,5 kg</strong> yiyecek gerekir. Su litresi yaklaşık bir kilogram geldiğinden toplam yük 28,5 kg olur.',
      'Aynı ekip erzağını ağırlıklı olarak konserve ve taze ürünlerden seçip yoğunluğu 200 alırsa yiyecek ağırlığı 9 kilograma çıkar. Görüldüğü gibi asıl ağır kalem sudur; güzergâhta kaynak varsa taşınan miktar ciddi biçimde azaltılabilir.',
    ] },
    { h: 'Su kaynağı olan güzergâhlarda planlama', p: [
      'Yayla çeşmeleri, dere ve pınarlar çoğu parkurda suyu yolda tamamlama olanağı verir. Bu durumda toplam ihtiyacın tamamını değil, iki kaynak arasındaki en uzun etabı karşılayacak miktarı taşımak yeterlidir. Kaynağın mevsime göre kuruyup kurumadığını güncel bilgiyle doğrulayın; yaz sonunda Toroslar ve Kaçkarlar gibi bölgelerde bile bazı çeşmeler akmaz.',
      'Doğal kaynaktan alınan su berrak görünse de hayvan otlatılan bölgelerde mikrop taşıyabilir. Filtre, arıtma tableti ya da kaynatma yöntemlerinden birini plana ekleyin. Kaynatacaksanız ocak yakıtını da buna göre artırmanız gerekir.',
    ] },
    { h: 'Erzak seçerken işe yarayan ipuçları', ul: [
      'Öğünleri gün gün yazın: kahvaltı, yürüyüş atıştırmalığı, akşam yemeği. Listeyi tartıyla kontrol edince hesaplanan ağırlığa ne kadar yakın olduğunuzu görürsünüz.',
      'Yürürken yenecek atıştırmalıkları ayrı bir pakete koyun; uzun molalar yerine sık ve küçük öğünler enerjiyi dengede tutar.',
      'Sıcak havada terle kaybedilen tuzu yerine koymak için tuzlu kraker, zeytin ya da ayran tozu gibi seçenekler ekleyin.',
      'Bir öğünlük yedek erzak bulundurun; hava ya da yol nedeniyle dönüş gecikebilir.',
      'Ambalajları evde sadeleştirin, çöpünüzü geri taşıyacağınızı hesaba katın.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç bir beslenme ya da sağlık danışmanlığı sunmaz. Çıkan sayılar başlangıç noktasıdır; çok sıcak ve nemli havada, yüksek irtifada ya da yoğun efor altında su ihtiyacı burada hesaplananın belirgin biçimde üzerine çıkabilir. Kronik rahatsızlığı olanlar, çocuklar ve hamileler için ihtiyaçlar farklıdır; bu durumlarda hekime danışılmalıdır. Zorlu güzergâhlarda planınızı deneyimli bir rehberle gözden geçirin.',
    ] },
  ],
  faq: [
    ['Kampta kişi başı günde kaç litre su gerekir?', 'Yalnızca içmek için ılıman havada 2–3 litre, yoğun yürüyüşte ya da sıcakta 4–5 litre planlanır. Yemek pişirme için 1 litre, bulaşık ve kişisel temizlik de eklenecekse toplamda 2–3 litre daha gerekir.'],
    ['Üç günlük kamp için kaç kilo yiyecek almalıyım?', 'Kuru ağırlıklı erzakta kişi başı günde 700–900 gram yeterli olur; orta tempoda üç gün için kişi başı yaklaşık 2,25 kg eder. Taze ve konserve ağırlıklı beslenecekseniz aynı kalori için bu miktarın iki katına yakın ağırlık taşırsınız.'],
    ['Enerji yoğunluğunu nasıl belirlerim?', 'Ambalajlardaki besin değeri tablosunda 100 gram için verilen enerji (kcal) değerine bakın. Erzağınızdaki ana kalemlerin değerlerini kabaca ortalayın. Makarna-bulgur-kuruyemiş ağırlıklı bir torba 400 civarında, hazır yemek ve meyve ağırlıklı bir torba 200 civarında çıkar.'],
    ['Soğuk havada su ihtiyacı azalır mı?', 'Susuzluk hissi azalır ama ihtiyaç pek azalmaz; soğuk ve kuru havada solunumla su kaybı sürer. Araç bu yüzden soğuk havada içme suyunu düşürmez, yalnızca enerji ihtiyacını artırır. Kışın suyu sıcak içecek olarak tüketmek alımı kolaylaştırır.'],
    ['Karı eriterek su elde edeceksem ne değişir?', 'Su taşımanız gerekmez ama kar eritmek ciddi miktarda yakıt harcar. Su satırını taşınacak yük olarak değil, eritilecek miktar olarak okuyun ve ocak yakıtınızı buna göre fazladan planlayın.'],
    ['Çocuklar için hesap nasıl yapılır?', 'Araç yetişkin değerleriyle hesaplar. Küçük çocuklar için enerji ihtiyacı daha düşüktür; kabaca iki çocuğu bir buçuk yetişkin sayarak yaklaşık bir sonuç alabilirsiniz. Su konusunda ise cimri davranmamak, çocukların sık sık içmesini sağlamak gerekir.'],
    ['Arabayla gidilen kampta bu hesap gerekli mi?', 'Ağırlık sorun olmasa da miktar planı işe yarar: damacana ya da bidon sayısını önceden bilir, eksik suyla kalmazsınız. Araç kampında kullanma suyunu "yemek, bulaşık ve kişisel temizlik" seçeneğiyle hesaplamak daha gerçekçidir.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; kişi sayısı ve diğer değerler sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['su-tuketimi-hesapla', 'yuruyus-suresi-hesapla', 'tirmanis-suresi-hesapla', 'mangal-et-miktari-hesapla', 'bavul-hacmi-hesapla', 'ruzgar-hissedilen-sicaklik-hesapla'],
};
