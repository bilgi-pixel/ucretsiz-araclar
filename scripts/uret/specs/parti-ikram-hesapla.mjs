export default {
  slug: 'parti-ikram-hesapla',
  title: 'Parti İkram ve İçecek Miktarı Hesaplama',
  h1Tail: 'kişi ve süreye göre',
  pageTitle: "Parti İkram ve İçecek Miktarı Hesaplama – Kişi Başı Kaç Parça?",
  description: "Davetli sayısı ve parti süresine göre kaç parça ikram, kaç bardak ve kaç litre içecek, kaç dilim pasta ve peçete gerektiğini pratik planlama kurallarıyla hesaplayın.",
  card: "Davetli sayısını ve süreyi girin; hazırlanacak ikram parçasını, içecek litresini, pasta dilimini ve peçeteyi görün.",
  category: 'gunluk',
  keywords: ['parti ikram hesaplama', 'kişi başı ikram miktarı', 'doğum günü içecek hesaplama', 'kaç litre içecek almalıyım', 'kokteyl kişi başı kanepe', 'davet ikram planlama', 'parti alışveriş listesi'],
  lead: "Doğum günü, nişan, ofis kutlaması ya da ev daveti planlarken en zor soru 'ne kadar alayım?' sorusudur. Davetli sayısını, partinin süresini ve ikramın yemek yerine geçip geçmeyeceğini girin; araç <strong>ikram parçası, içecek, pasta dilimi ve peçete</strong> miktarını hesaplasın.",
  button: 'Hesapla',
  inputs: [
    { id: 'kisi', label: 'Davetli sayısı', type: 'number', placeholder: 'Örn. 20' },
    { id: 'sure', label: 'Parti süresi (saat)', type: 'number', value: '3' },
    { id: 'tur', label: 'İkramın türü', type: 'select', options: [['hafif', 'Hafif ikram (yemek ayrıca var ya da öğün arası)'], ['yemek', 'Yemek yerine geçen ikram']] },
    { id: 'bardak', label: 'Bardak hacmi (ml)', type: 'number', value: '200' },
  ],
  compute(v, h) {
    const kisi = h.posint(v.kisi, 'Davetli sayısı');
    if (kisi > 5000) h.err('En fazla 5.000 davetli için hesap yapılır.');
    const sure = h.pos(v.sure === '' ? '3' : v.sure, 'Parti süresi');
    if (sure > 12) h.err('Parti süresi en fazla 12 saat olabilir.');
    const bardak = h.pos(v.bardak === '' ? '200' : v.bardak, 'Bardak hacmi');
    const saatlik = v.tur === 'yemek' ? 6 : 4;
    const kisiParca = Math.ceil(saatlik * sure - 1e-9);
    const kisiIcecek = Math.ceil((sure <= 1 ? 2 : 1 + sure) - 1e-9);
    const toplamIcecek = kisi * kisiIcecek;
    const litre = toplamIcecek * bardak / 1000;
    return {
      rows: [
        ['Toplam ikram', h.fmt(kisi * kisiParca, 0) + ' parça'],
        ['Kişi başı ikram', kisiParca + ' parça'],
        ['Toplam içecek', h.fmt(toplamIcecek, 0) + ' bardak'],
        ['Kişi başı içecek', kisiIcecek + ' bardak'],
        ['İçecek hacmi', h.fmt(litre, 1) + ' litre'],
        ['Pasta', h.fmt(kisi, 0) + ' dilim'],
        ['Peçete', h.fmt(kisi * 3, 0) + ' adet'],
      ],
      note: 'Planlama kuralları: hafif ikramda kişi başı saatte 4, yemek yerine geçen ikramda saatte 6 parça; içecekte ilk saat 2 bardak, sonraki her saat 1 bardak; kişi başı 1 dilim pasta ve 3 peçete. Sonuçlar yukarı yuvarlanır.',
    };
  },
  cases: [
    { in: { kisi: '20', sure: '3', tur: 'hafif', bardak: '200' }, out: { 'Toplam ikram': '240 parça', 'Kişi başı ikram': '12 parça', 'Toplam içecek': '80 bardak', 'İçecek hacmi': '16 litre', 'Pasta': '20 dilim', 'Peçete': '60 adet' } },
    { in: { kisi: '50', sure: '2', tur: 'yemek', bardak: '200' }, out: { 'Toplam ikram': '600 parça', 'Kişi başı ikram': '12 parça', 'Toplam içecek': '150 bardak', 'İçecek hacmi': '30 litre' } },
    { in: { kisi: '10', sure: '1', tur: 'hafif', bardak: '200' }, out: { 'Toplam ikram': '40 parça', 'Toplam içecek': '20 bardak', 'İçecek hacmi': '4 litre' } },
    { in: { kisi: '30', sure: '2,5', tur: 'hafif', bardak: '250' }, out: { 'Kişi başı ikram': '10 parça', 'Toplam ikram': '300 parça', 'Kişi başı içecek': '4 bardak', 'Toplam içecek': '120 bardak', 'İçecek hacmi': '30 litre' } },
    { in: { kisi: '100', sure: '4', tur: 'yemek', bardak: '200' }, out: { 'Toplam ikram': '2.400 parça', 'Toplam içecek': '500 bardak', 'İçecek hacmi': '100 litre', 'Peçete': '300 adet' } },
    { in: { kisi: '8', sure: '0,5', tur: 'hafif', bardak: '200' }, out: { 'Kişi başı ikram': '2 parça', 'Toplam içecek': '16 bardak', 'İçecek hacmi': '3,2 litre' } },
    { in: { kisi: '0', sure: '3', tur: 'hafif', bardak: '200' }, error: true },
    { in: { kisi: '20', sure: '-2', tur: 'hafif', bardak: '200' }, error: true },
    { in: { kisi: '12,5', sure: '3', tur: 'hafif', bardak: '200' }, error: true },
  ],
  howto: [
    'Çocuklar dahil beklediğiniz toplam davetli sayısını yazın. Katılımı kesin olmayanlar için sayıyı biraz yüksek tutmak güvenlidir.',
    'Partinin kaç saat süreceğini girin; yarım saatler için 2,5 gibi ondalıklı değer yazabilirsiniz.',
    'İkramın türünü seçin: misafirler ayrıca yemek yiyecekse ya da parti öğün arasındaysa "Hafif ikram", sofra kurulmayacak ve ikramlar akşam yemeğinin yerini tutacaksa "Yemek yerine geçen ikram".',
    'Kullanacağınız bardağın hacmini mililitre olarak girin; karton parti bardakları çoğunlukla 180–200 ml\'dir.',
    '"Hesapla" düğmesine basın ve çıkan sayıları alışveriş listenize aktarın.',
  ],
  sections: [
    { h: 'Hesap hangi kurallara dayanıyor?', p: [
      "Araç, davet ve ikram planlamasında yaygın kullanılan pratik kuralları uygular. İkram tarafında birim 'parça'dır: bir kanepe, bir mini poğaça, bir dilim börek, bir kurabiye ya da bir mini sandviç bir parça sayılır. Misafirler ayrıca yemek yiyecekse kişi başı <strong>saatte 4 parça</strong>, ikramlar yemeğin yerini tutacaksa <strong>saatte 6 parça</strong> hesaplanır.",
      "İçecekte kural şudur: misafirler ilk saatte ortalama <strong>2 bardak</strong>, sonraki her saatte <strong>1 bardak</strong> içer. Üç saatlik bir partide bu kişi başı 4 bardak eder. Toplam bardak sayısı bardak hacmiyle çarpılarak litreye çevrilir. Pasta için kişi başı bir dilim, peçete için kişi başı üç adet öngörülür; parmak yiyeceklerde peçete çabuk tükendiğinden bu sayı düşük tutulmamalıdır.",
    ] },
    { h: 'Çözümlü örnek: 20 kişilik doğum günü', p: [
      "Evde üç saat sürecek, 20 kişilik bir doğum günü düşünelim; misafirler öğle yemeğini yemiş olarak gelecek, yani hafif ikram yeterli. Kişi başı ikram 4 × 3 = 12 parça, toplam 20 × 12 = <strong>240 parça</strong> eder. Bunu örneğin 60 mini poğaça, 60 dilim börek, 60 kurabiye ve 60 kanepe olarak dört çeşide bölebilirsiniz.",
      "İçecek için kişi başı 2 + 1 + 1 = 4 bardak, toplam 80 bardak gerekir. 200 ml'lik bardaklarla bu 80 × 0,2 = <strong>16 litre</strong> içecektir. Bunun yaklaşık yarısını su, kalanını meyve suyu, limonata, ayran ya da gazlı içecek olarak planlamak dengeli bir dağılım sağlar. Pasta 20 dilimlik olmalı, masaya en az 60 peçete konmalıdır.",
    ] },
    { h: 'Toplam parçayı çeşitlere nasıl bölmeli?', ul: [
      "<strong>Çeşit sayısı:</strong> 20 kişiye kadar 4–5 çeşit, daha kalabalık davetlerde 6–8 çeşit yeterlidir. Çok çeşit, her birinden az hazırlamayı ve daha fazla emeği gerektirir.",
      "<strong>Tuzlu–tatlı dengesi:</strong> Parçaların yaklaşık üçte ikisini tuzlu, üçte birini tatlı planlamak çoğu davette işe yarar; pasta kesilecekse tatlı payı daha da azaltılabilir.",
      "<strong>Doyurucu parçalar:</strong> Mini sandviç, börek ve kısır gibi doyurucu ikramlar sayıca az tüketilir; cips, çerez ve kurabiye gibi hafif olanlar ise çabuk biter.",
      "<strong>Özel beslenme:</strong> Vejetaryen, glütensiz ya da alerjisi olan misafirler için en az bir iki çeşidi ayrı tutmak ve etiketlemek iyi bir ev sahipliğidir.",
    ] },
    { h: 'İçecek planlamasında dikkat edilecekler', p: [
      "Hesaplanan litre, tüm içeceklerin toplamıdır. Yaz aylarında ve açık havada yapılan davetlerde su tüketimi belirgin biçimde artar; bu durumda toplamı dörtte bir kadar artırmak yerinde olur. Çay ve kahve ikram edilecekse bunlar da bardak sayısına dahildir: sıcak içecek servisi yapılan bir kış davetinde soğuk içecek miktarı azaltılabilir.",
      "Büyük şişeler ekonomiktir ama açıldıktan sonra gazı kaçar; kalabalık olmayan davetlerde 1 litrelik şişeler israfı azaltır. Buz kullanılacaksa bardağın bir kısmını buz dolduracağı için içecek biraz daha uzun yeter. Tek kullanımlık bardak alırken misafirlerin bardağını kaybedip yenisini aldığını hesaba katın: toplam içecek bardağı kadar değil ama davetli sayısının en az iki katı bardak bulundurmak rahat ettirir.",
    ] },
    { h: 'Miktarı artırmanız ya da azaltmanız gereken durumlar', ul: [
      'Parti akşam yemeği saatine denk geliyorsa ve sofra kurulmuyorsa "yemek yerine geçen" seçeneğini kullanın.',
      'Davetlilerin çoğu küçük çocuksa ikram parçasını üçte bir kadar azaltabilir, içeceği aynı bırakabilirsiniz.',
      'Dans, oyun gibi hareketli etkinliklerde içecek tüketimi artar, yiyecek tüketimi azalır.',
      'Ayakta kokteyl düzeninde misafirler oturmalı düzene göre daha az yer; ancak ikram masası sürekli görünür olduğundan atıştırma uzun sürer.',
      'Gelmeme ihtimali yüksek geniş davetlerde sayıyı davetiye sayısına göre değil, teyit eden kişi sayısına göre girin.',
    ] },
    { h: 'Sınırlar', p: [
      "Sonuçlar ortalama tüketime dayanan planlama tahminleridir; misafirlerin iştahı, mevsim, ikramın türü ve partinin saati gerçek tüketimi değiştirir. Araç alkollü içecek planlaması yapmaz ve fiyat hesaplamaz. Düğün, kurumsal resepsiyon gibi büyük organizasyonlarda catering firmanızın kendi porsiyon tabloları esas alınmalıdır; buradaki sayılar ev ve küçük mekân davetleri için pratik bir başlangıç noktasıdır.",
    ] },
  ],
  faq: [
    ['Kişi başı kaç parça ikram hazırlamalıyım?', 'Misafirler ayrıca yemek yiyecekse saatte 4 parça, ikram yemeğin yerini tutacaksa saatte 6 parça hesaplayın. Üç saatlik hafif ikramlı bir partide bu kişi başı 12 parça eder.'],
    ['20 kişilik parti için kaç litre içecek gerekir?', 'Üç saatlik bir partide kişi başı 4 bardak, toplam 80 bardak içilir. 200 ml\'lik bardaklarla 16 litre içecek gerekir; bunun yarısını su olarak planlayabilirsiniz.'],
    ['Bir parça tam olarak ne demek?', 'Tek lokmada ya da iki ısırıkta yenen her ikram bir parçadır: bir kanepe, bir mini pizza, bir kurabiye, bir dilim börek, bir köfte gibi. Büyük bir sandviçi iki ya da üç parça saymak daha gerçekçidir.'],
    ['Çocuk doğum gününde miktarlar değişir mi?', 'Küçük çocuklar yetişkinlere göre daha az yer, bu yüzden ikramı üçte bir kadar azaltabilirsiniz. İçecek miktarını ise azaltmayın; oyun oynayan çocuklar sık sık su ister. Eşlik eden ebeveynleri de davetli sayısına ekleyin.'],
    ['Pasta kaç kişilik alınmalı?', 'Kişi başı bir dilim hesabıyla davetli sayısı kadar dilimlik pasta yeterlidir. Tatlı ikramı bolsa bir miktar daha küçük pasta da yeter; herkes pastadan almayabilir.'],
    ['Artan ikram olmaması için ne yapabilirim?', 'Oda sıcaklığında bozulmayan ve ertesi gün tüketilebilen ikramları ağırlıklı tutun, ikramları masaya tek seferde değil parça parça çıkarın. Böylece dokunulmamış tabaklar buzdolabında güvenle saklanabilir.'],
    ['Süreyi ondalıklı girebilir miyim?', 'Evet. 2,5 saat gibi değerler kabul edilir; kişi başı parça ve bardak sayısı yukarı yuvarlanarak tam sayıya çevrilir.'],
    ['Bu bilgiler bir yerde saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; davetli sayısı ya da diğer girdiler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['mangal-et-miktari-hesapla', 'makarna-porsiyon-hesapla', 'davet-masa-hesapla', 'masa-kisi-sayisi-hesapla', 'pizza-boyutu-karsilastir'],
};
