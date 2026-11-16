export default {
  slug: 'pirinc-su-orani-hesapla',
  title: 'Pirinç Su Oranı Hesaplama',
  h1Tail: 'pilav için su miktarı',
  pageTitle: "Pirinç Su Oranı Hesaplama – Pilava Kaç Bardak Su Konur?",
  description: "Pirinç türüne ve miktarına göre pilava konacak suyu bardak ve mililitre olarak hesaplayın. Baldo, osmancık, basmati, yasemin ve esmer pirinç için ayrı oran.",
  card: "Pirinç türünü ve miktarını girin; pilav için gereken suyu bardak ve mililitre olarak, porsiyon sayısıyla birlikte görün.",
  category: 'gunluk',
  keywords: ['pirinç su oranı', 'pilav su ölçüsü', '1 bardak pirince kaç bardak su', 'baldo pirinç su oranı', 'basmati pirinç su oranı', 'esmer pirinç su oranı', 'kişi başı pirinç miktarı'],
  lead: "Pilavın lapa ya da diri kalmasını en çok belirleyen şey su ölçüsüdür. Pirinç türünü ve miktarını (su bardağı, gram ya da kişi sayısı olarak) girin; araç gereken suyu <strong>su bardağı ve mililitre</strong> cinsinden, pirincin gram karşılığı ve yaklaşık porsiyon sayısıyla birlikte hesaplasın.",
  button: 'Hesapla',
  inputs: [
    { id: 'miktar', label: 'Pirinç miktarı', type: 'number', placeholder: 'Örn. 2' },
    { id: 'birim', label: 'Miktar birimi', type: 'select', options: [['bardak', 'Su bardağı (200 ml)'], ['gram', 'Gram'], ['kisi', 'Kişi sayısı']] },
    { id: 'tur', label: 'Pirinç türü', type: 'select', options: [['baldo', 'Baldo (1 : 1,5)'], ['osmancik', 'Osmancık (1 : 1,5)'], ['basmati', 'Basmati (1 : 1,75)'], ['yasemin', 'Yasemin (1 : 1,25)'], ['esmer', 'Esmer pirinç (1 : 2,5)']] },
  ],
  compute(v, h) {
    const ORAN = { baldo: 1.5, osmancik: 1.5, basmati: 1.75, yasemin: 1.25, esmer: 2.5 };
    const BARDAK_ML = 200, BARDAK_G = 180, PORSIYON_G = 75;
    const x = h.pos(v.miktar, 'Pirinç miktarı');
    const oran = ORAN[v.tur] || 1.5;
    let gram;
    if (v.birim === 'gram') gram = x;
    else if (v.birim === 'kisi') {
      if (!Number.isInteger(x)) h.err('Kişi sayısı tam sayı olmalı (örn. 4).');
      gram = x * PORSIYON_G;
    } else gram = x * BARDAK_G;
    if (gram > 100000) h.err('Pirinç miktarı çok büyük; en fazla 100 kg için hesap yapılır.');
    const bardak = gram / BARDAK_G;
    const suBardak = bardak * oran;
    const suMl = suBardak * BARDAK_ML;
    return {
      rows: [
        ['Su miktarı', h.fmt(suBardak, 2) + ' su bardağı'],
        ['Su (mililitre)', h.fmt(suMl, 0) + ' ml'],
        ['Pirinç', h.fmt(bardak, 2) + ' su bardağı (' + h.fmt(gram, 0) + ' g)'],
        ['Hacimce oran', '1 ölçü pirince ' + h.fmt(oran, 2) + ' ölçü su'],
        ['Yaklaşık porsiyon', h.fmt(gram / PORSIYON_G, 1) + ' kişilik'],
      ],
      note: 'Varsayımlar: 1 su bardağı 200 ml, 1 su bardağı pirinç yaklaşık 180 g, kişi başı 75 g çiğ pirinç (garnitür porsiyonu). Oranlar kapağı kapalı tencerede, suyunu çekerek pişirme yöntemi içindir. Paketin üzerinde su oranı yazıyorsa onu esas alın.',
    };
  },
  cases: [
    { in: { miktar: '2', birim: 'bardak', tur: 'baldo' }, out: { 'Su miktarı': '3 su bardağı', 'Su (mililitre)': '600 ml', 'Pirinç': '2 su bardağı (360 g)', 'Yaklaşık porsiyon': '4,8 kişilik' } },
    { in: { miktar: '360', birim: 'gram', tur: 'basmati' }, out: { 'Su miktarı': '3,5 su bardağı', 'Su (mililitre)': '700 ml' } },
    { in: { miktar: '4', birim: 'kisi', tur: 'osmancik' }, out: { 'Su miktarı': '2,5 su bardağı', 'Su (mililitre)': '500 ml', 'Pirinç': '1,67 su bardağı (300 g)', 'Yaklaşık porsiyon': '4 kişilik' } },
    { in: { miktar: '1', birim: 'bardak', tur: 'esmer' }, out: { 'Su miktarı': '2,5 su bardağı', 'Su (mililitre)': '500 ml' } },
    { in: { miktar: '1,5', birim: 'bardak', tur: 'yasemin' }, out: { 'Su miktarı': '1,88 su bardağı', 'Su (mililitre)': '375 ml', 'Pirinç': '1,5 su bardağı (270 g)' } },
    { in: { miktar: '900', birim: 'gram', tur: 'baldo' }, out: { 'Su miktarı': '7,5 su bardağı', 'Su (mililitre)': '1.500 ml', 'Yaklaşık porsiyon': '12 kişilik' } },
    { in: { miktar: '0', birim: 'bardak', tur: 'baldo' }, error: true },
    { in: { miktar: 'iki', birim: 'bardak', tur: 'baldo' }, error: true },
    { in: { miktar: '2,5', birim: 'kisi', tur: 'baldo' }, error: true },
  ],
  howto: [
    'Pirinç miktarını yazın. Ölçüyü su bardağıyla, mutfak terazisinde gramla ya da doğrudan kaç kişi için pişireceğinizi belirterek girebilirsiniz.',
    '"Miktar birimi" listesinden yazdığınız sayının neyi ifade ettiğini seçin.',
    'Kullanacağınız pirincin türünü seçin; her türün yanında hacimce pirinç–su oranı yazılıdır.',
    '"Hesapla" düğmesine basın. İlk satır pilava ekleyeceğiniz suyu bardak olarak, ikinci satır mililitre olarak verir.',
    'Suyu ölçerken pirinci ölçtüğünüz bardağın aynısını kullanın; oran hacim üzerinden kurulduğu için bardağın kaç mililitre olduğu sonucu değiştirmez.',
  ],
  sections: [
    { h: 'Pirinç su oranı nasıl hesaplanır?', p: [
      "Ev pilavında ölçü ağırlıkla değil hacimle tutulur: pirinci hangi kapla ölçtüyseniz suyu da aynı kapla ölçersiniz. Hesap tek bir çarpmadan ibarettir: <strong>su (bardak) = pirinç (bardak) × türün oranı</strong>. Baldo ve osmancık için oran 1,5; basmati için 1,75; yasemin için 1,25; esmer pirinç için 2,5 alınmıştır.",
      "Miktarı gram olarak girdiğinizde araç önce pirinci bardağa çevirir. Bir su bardağı (200 ml) çiğ pirinç yaklaşık 180 gram gelir; dolayısıyla 360 gram pirinç 2 su bardağıdır. Kişi sayısı girdiğinizde ise kişi başı 75 gram çiğ pirinç varsayılır; bu, pilavın et ya da sebze yemeğinin yanında garnitür olarak sunulduğu sofralar için yaygın bir porsiyondur.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Dört kişilik bir sofra için osmancık pirinçle pilav yapacağınızı düşünelim. Kişi başı 75 gramdan 4 × 75 = 300 gram pirinç gerekir. Bu miktar 300 ÷ 180 = 1,67 su bardağı eder. Osmancık için oran 1,5 olduğundan su miktarı 1,67 × 1,5 = 2,5 su bardağı, yani 2,5 × 200 = 500 mililitredir. Araca 4 yazıp birimi 'Kişi sayısı', türü 'Osmancık' seçtiğinizde aynı sonuçları görürsünüz.",
      "İkinci bir örnek: 2 su bardağı baldo pirinç için 2 × 1,5 = 3 su bardağı, yani 600 ml su gerekir. Aynı miktarda esmer pirinç için ise 2 × 2,5 = 5 su bardağı (1 litre) su koymanız gerekir; aradaki fark kabuğun suyu geç ve çok çekmesinden kaynaklanır.",
    ] },
    { h: 'Türlere göre oranlar neden farklı?', ul: [
      "<strong>Baldo:</strong> İri ve nişastalı tanelidir, suyu iyi çeker. Tereyağlı klasik tane tane pilav için 1 ölçü pirince 1,5 ölçü su yeterlidir.",
      "<strong>Osmancık:</strong> Türkiye'de en yaygın pilavlık pirinçtir; baldoya göre biraz daha küçük tanelidir ve aynı oranla pişer.",
      "<strong>Basmati:</strong> Uzun ve ince tanelidir, pişerken boyuna uzar. Tanelerin tam açılması için biraz daha fazla, 1,75 ölçü su kullanılır.",
      "<strong>Yasemin:</strong> Yumuşak ve hafif yapışkan bir dokusu vardır; az su ister. 1,25 ölçü su çoğu zaman yeterlidir.",
      "<strong>Esmer pirinç:</strong> Kepek tabakası üzerinde olduğu için suyu geç emer ve uzun pişer; 2,5 ölçü su ve yaklaşık iki katı süre gerekir.",
    ] },
    { h: 'Oranı etkileyen mutfak koşulları', p: [
      "Verilen oranlar bir başlangıç noktasıdır; aynı pirinç farklı mutfaklarda biraz farklı davranabilir. Pirinci sıcak tuzlu suda yarım saat beklettiyseniz taneler bir miktar su çekmiş olur; bu durumda suyu bardak başına birkaç yemek kaşığı azaltmak pilavın diri kalmasına yardım eder. Pirinci yağda uzun süre kavurmak da su ihtiyacını hafifçe düşürür.",
      "Tencerenin genişliği ve kapağın sıkılığı buharlaşmayı belirler. Geniş, kapağı tam oturmayan bir tencerede su daha hızlı uçar; dar ve ağır kapaklı tencerede ise aynı su fazla gelebilir. Düdüklü tencerede buhar kaybı çok az olduğu için genellikle daha düşük oranlar kullanılır; bu araç klasik kapaklı tencere yöntemine göre hesap yapar. Tavuk suyu ya da et suyu kullanıyorsanız ölçü değişmez, yalnızca tuzu ona göre ayarlamanız gerekir.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      "Pirinci su bardağıyla, suyu çay bardağı ya da kupayla ölçmek. Oran ancak iki malzeme aynı kapla ölçülürse tutar.",
      "Pilav pişerken kapağı sık sık açıp karıştırmak. Buhar kaçar, taneler kırılır ve nişasta salarak pilavı lapa yapar.",
      "Suyu çektikten sonra pilavı demlendirmemek. Ocağı kapatıp kapağın altına kâğıt havlu ya da temiz bir bez koyarak 10–15 dakika bekletmek fazla nemi alır.",
      "Şehriye ya da nohut eklerken suyu hiç artırmamak. Bir avuç arpa ya da tel şehriye için yaklaşık çeyrek bardak ek su düşünülebilir.",
    ] },
    { h: 'Hızlı başvuru: baldo ve osmancık için', ul: [
      '1 su bardağı pirinç (180 g): 1,5 su bardağı su (300 ml), 2–3 kişilik',
      '2 su bardağı pirinç (360 g): 3 su bardağı su (600 ml), yaklaşık 5 kişilik',
      '3 su bardağı pirinç (540 g): 4,5 su bardağı su (900 ml), yaklaşık 7 kişilik',
      '5 su bardağı pirinç (900 g): 7,5 su bardağı su (1,5 litre), 12 kişilik',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      "Bir su bardağı 200 ml, bir su bardağı pirinç 180 g kabul edilmiştir. Evinizdeki bardak daha büyük ya da küçükse gram ve mililitre satırları biraz sapabilir; ancak bardakla ölçüyorsanız 'su bardağı' satırındaki oran yine geçerlidir. Pirincin tane iriliği ve nem durumu da bardak ağırlığını birkaç gram oynatır. Kişi başı 75 gram garnitür porsiyonudur; pilav ana yemekse ya da sofrada iştahlı misafirler varsa miktarı artırmak isteyebilirsiniz. Araç sütlaç, risotto, dolma içi ya da çorba gibi farklı kıvam gerektiren tarifler için değil, suyunu çeken pilav için tasarlanmıştır.",
    ] },
  ],
  faq: [
    ['1 su bardağı pirince kaç su bardağı su konur?', 'Baldo ve osmancık gibi pilavlık pirinçlerde 1 su bardağı pirince 1,5 su bardağı su konur. Basmatide 1,75, yasemin pirincinde 1,25, esmer pirinçte 2,5 su bardağı su kullanılır.'],
    ['Pirinci ıslatırsam su ölçüsü değişir mi?', 'Biraz değişir. Yarım saat ılık tuzlu suda bekleyen pirinç bir miktar su emer; bu yüzden bardak başına birkaç yemek kaşığı kadar az su koymak pilavın tane tane kalmasını kolaylaştırır. Pirinci süzüp iyice suyunu akıtmayı da unutmayın.'],
    ['Kişi başı kaç gram pirinç hesaplanır?', 'Yan yemek olarak sunulan pilavda kişi başı 70–80 gram çiğ pirinç yaygın bir ölçüdür; araç 75 gram kullanır. Bir su bardağı pirinç bu hesapla iki ile üç kişiye yeter.'],
    ['Sıcak su mu soğuk su mu eklemeliyim?', 'Kavrulmuş pirince sıcak su eklemek tencerenin ısısını düşürmez ve pişme süresini kısaltır; çoğu tarif bu nedenle kaynar su önerir. Su miktarı sıcak ya da soğuk olmasına göre değişmez.'],
    ['Şehriyeli pilavda su oranı nasıl olmalı?', 'Şehriye de su çektiği için pirincin suyuna ek olarak, kullandığınız şehriyenin hacmi kadar ya da biraz fazlası su eklenir. İki yemek kaşığı şehriye için çeyrek su bardağı ek su çoğu zaman yeterlidir.'],
    ['Pilavım lapa oldu, nerede hata yaptım?', 'En sık neden fazla sudur; bardakları farklı kaplarla ölçmek ya da ıslatılmış pirinçte suyu azaltmamak buna yol açar. Pirinci yıkamadan kullanmak, pişerken karıştırmak ve çok kısık yerine yüksek ateşte uzun tutmak da lapalaşmaya neden olabilir.'],
    ['Esmer pirinç neden daha fazla su ister?', 'Esmer pirincin kepek tabakası alınmamıştır. Bu tabaka suyun taneye girmesini yavaşlattığı için pişme süresi uzar, uzun sürede daha fazla su buharlaşır ve tane daha çok su emer.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; yazdığınız miktar hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['makarna-porsiyon-hesapla', 'kahve-su-orani-hesapla', 'hamur-hidrasyon-hesapla', 'cay-demleme-orani-hesapla', 'et-pisirme-suresi-hesapla'],
};
