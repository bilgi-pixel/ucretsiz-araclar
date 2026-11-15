export default {
  slug: 'medyan-hesapla',
  title: 'Medyan (Ortanca) Hesaplama',
  h1Tail: 'sıralı verinin orta değeri',
  pageTitle: 'Medyan (Ortanca) Hesaplama – Sayı Dizisinin Orta Değerini Bulma',
  description: 'Sayılarınızı yazın, medyanı (ortanca) anında bulun. Veriyi küçükten büyüğe sıralar, tek ve çift sayıda veri için orta değeri, ortalamayı ve uç değerleri gösterir.',
  card: 'Bir sayı dizisinin medyanını (ortancasını) bulun; sıralı veri, aritmetik ortalama ve en küçük-en büyük değerle birlikte.',
  category: 'matematik',
  keywords: ['medyan hesaplama', 'ortanca hesaplama', 'medyan nasıl bulunur', 'ortanca nedir', 'medyan bulma', 'veri grubunun medyanı', 'median hesaplama'],
  lead: 'Sayılarınızı aralarına boşluk koyarak yazın; araç veriyi küçükten büyüğe sıralar ve tam ortadaki değeri, yani <strong>medyanı (ortancayı)</strong> bulur. Veri sayısı çiftse ortadaki iki değerin ortalamasını alır.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Sayılar', type: 'textarea', placeholder: 'Örn. 45 60 70 85 90', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Ondalık için virgül kullanın (12,5).', wide: true },
  ],
  compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar').slice().sort((x, y) => x - y);
    const n = a.length;
    const orta = Math.floor(n / 2);
    const medyan = n % 2 === 1 ? a[orta] : (a[orta - 1] + a[orta]) / 2;
    const toplam = a.reduce((s, x) => s + x, 0);
    const konum = n % 2 === 1 ? `${orta + 1}. değer` : `${orta}. ve ${orta + 1}. değerlerin ortalaması`;
    const gosterilecek = n > 200 ? a.slice(0, 200) : a;
    return {
      rows: [
        ['Medyan', h.fmt(medyan, 6)],
        ['Medyanın konumu', konum],
        ['Veri sayısı', String(n)],
        ['Aritmetik ortalama', h.fmt(toplam / n, 6)],
        ['En küçük değer', h.fmt(a[0], 6)],
        ['En büyük değer', h.fmt(a[n - 1], 6)],
        ['Sıralı veri', gosterilecek.map((x) => h.fmt(x, 6)).join('; ') + (n > 200 ? '; …' : '')],
      ],
      note: n % 2 === 1
        ? 'Veri sayısı tek olduğu için medyan, sıralı dizinin tam ortasındaki değerdir.'
        : 'Veri sayısı çift olduğu için medyan, sıralı dizinin ortasındaki iki değerin aritmetik ortalamasıdır.',
    };
  },
  cases: [
    { in: { sayilar: '45 90 70 60 85' }, out: { 'Medyan': '70', 'Medyanın konumu': '3. değer', 'Veri sayısı': '5', 'Sıralı veri': '45; 60; 70; 85; 90' } },
    { in: { sayilar: '7 3 9 5' }, out: { 'Medyan': '6', 'Medyanın konumu': '2. ve 3. değerlerin ortalaması', 'Aritmetik ortalama': '6' } },
    { in: { sayilar: '3 1 4 1 5' }, out: { 'Medyan': '3', 'En küçük değer': '1', 'En büyük değer': '5', 'Aritmetik ortalama': '2,8' } },
    { in: { sayilar: '12,5; 8; 20' }, out: { 'Medyan': '12,5' } },
    { in: { sayilar: '1 2 3 4 5 6 7 8 9 10' }, out: { 'Medyan': '5,5', 'Veri sayısı': '10' } },
    { in: { sayilar: '-4 7 0 -2' }, out: { 'Medyan': '-1', 'Sıralı veri': '-4; -2; 0; 7' } },
    { in: { sayilar: '42' }, out: { 'Medyan': '42', 'Veri sayısı': '1' } },
    { in: { sayilar: '30 35 40 45 500' }, out: { 'Medyan': '40', 'Aritmetik ortalama': '130' } },
    { in: { sayilar: '' }, error: true },
    { in: { sayilar: '5 on 7' }, error: true },
  ],
  howto: [
    'Sayılarınızı "Sayılar" kutusuna yazın ya da bir tablodan kopyalayıp yapıştırın. Sıralı olmaları gerekmez; sıralamayı araç yapar.',
    'Sayıları birbirinden boşluk, satır sonu ya da noktalı virgülle ayırın. Virgül ondalık ayırıcı olarak okunur; bu yüzden sayıları virgülle ayırmayın.',
    '"Hesapla" düğmesine basın. İlk satırda medyanı, altında medyanın sıralı dizideki konumunu ve karşılaştırma için aritmetik ortalamayı görürsünüz.',
    '"Sıralı veri" satırından dizinin küçükten büyüğe dizilmiş halini kontrol edin; yanlış yazılmış bir sayı genellikle burada hemen göze çarpar.',
  ],
  sections: [
    { h: 'Medyan (ortanca) nedir?', p: [
      'Medyan, bir veri grubu küçükten büyüğe sıralandığında tam ortada kalan değerdir. Türkçe ders kitaplarında <strong>ortanca</strong> adıyla geçer. Medyanın altında ve üstünde eşit sayıda veri bulunur; yani verinin yarısı medyandan küçük ya da ona eşit, diğer yarısı medyandan büyük ya da ona eşittir. Bu özelliği nedeniyle medyan, veriyi iki eşit parçaya bölen nokta olarak düşünülebilir ve aynı zamanda 50. yüzdelik dilime ve ikinci çeyrekliğe karşılık gelir.',
      'Medyan, aritmetik ortalama ve mod (tepe değer) ile birlikte üç temel merkezî eğilim ölçüsünden biridir. Ortalama tüm değerlerin büyüklüğünü hesaba katarken medyan yalnızca sıralamaya bakar. Bu fark, medyanı aşırı büyük ya da aşırı küçük değerlere karşı dayanıklı kılar.',
    ] },
    { h: 'Medyan nasıl bulunur? Tek ve çift veri sayısı', p: [
      'İlk adım her zaman veriyi küçükten büyüğe sıralamaktır. Sıralanmamış bir dizinin ortasındaki sayı medyan değildir; en sık yapılan hata budur. Sıralamadan sonra veri sayısına (n) bakılır.',
      '<strong>Veri sayısı tekse</strong> medyan, (n + 1) ÷ 2 numaralı sıradaki değerdir. Beş öğrencinin sınav notları 45, 90, 70, 60 ve 85 olsun. Sıralı hali 45, 60, 70, 85, 90 olur. n = 5 olduğundan (5 + 1) ÷ 2 = 3. sıradaki değere bakılır ve medyan <strong>70</strong> bulunur.',
      '<strong>Veri sayısı çiftse</strong> tam ortada tek bir değer yoktur; n ÷ 2 ve (n ÷ 2) + 1 numaralı sıradaki iki değerin aritmetik ortalaması alınır. 7, 3, 9, 5 dizisinin sıralı hali 3, 5, 7, 9 olur. Ortadaki iki değer 5 ve 7 olduğundan medyan (5 + 7) ÷ 2 = <strong>6</strong> eder. Görüldüğü gibi çift sayıda veride medyan, dizide hiç bulunmayan bir sayı olabilir.',
    ] },
    { h: 'Medyan mı, ortalama mı? Uç değerlerin etkisi', p: [
      'Bir iş yerinde beş çalışanın aylık geliri bin lira cinsinden 30, 35, 40, 45 ve 500 olsun. Aritmetik ortalama 650 ÷ 5 = 130 çıkar; oysa beş kişiden dördü bu tutarın çok altında kazanmaktadır. Medyan ise 40\'tır ve tipik çalışanın durumunu çok daha iyi anlatır. Tek bir uç değer ortalamayı yukarı çekmiş, medyanı ise hiç etkilememiştir. Bu örneği araca yazarsanız iki sonucu yan yana görebilirsiniz.',
      'Gelir dağılımı, konut fiyatları, kira bedelleri, bekleme süreleri gibi çarpık dağılan verilerde bu yüzden medyan tercih edilir. "Medyan ücret", "medyan yaş" ve "medyan konut fiyatı" gibi ifadeler bu ihtiyaçtan doğmuştur. Veri simetrik dağılıyorsa, örneğin iyi hazırlanmış bir sınavın notlarında, ortalama ile medyan birbirine yakın çıkar. İkisi arasındaki fark büyüdükçe dağılımın çarpık olduğu anlaşılır: ortalama medyandan belirgin biçimde büyükse sağa, küçükse sola çarpıklık vardır.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Okul ve sınavlar:</strong> Bir sınıfın notlarında birkaç çok düşük ya da çok yüksek not olduğunda sınıfın genel düzeyini görmek için.',
      '<strong>Emlak:</strong> Bir mahalledeki ilan fiyatlarının tipik düzeyini, birkaç lüks konutun etkisinden arındırarak bulmak için.',
      '<strong>İnsan kaynakları:</strong> Bir pozisyonun ücret bandını belirlerken yönetici maaşlarının ortalamayı şişirmesini önlemek için.',
      '<strong>Hizmet ölçümü:</strong> Çağrı merkezinde bekleme, kargoda teslim, yazılımda yanıt sürelerinin tipik değerini görmek için.',
      '<strong>Sağlık ve araştırma:</strong> Hastanede yatış süresi gibi birkaç uzun gözlemin bulunduğu verileri özetlemek için.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Birinci hata, veriyi sıralamadan ortadaki sayıyı almaktır. İkinci hata, çift sayıda veride ortadaki iki değerden birini seçmek ya da ikisini toplamayı unutup yalnızca bölmektir. Üçüncü hata, tekrar eden değerleri bir kez saymaktır: 2, 4, 4, 4, 9 dizisinde beş veri vardır ve medyan üçüncü sıradaki 4\'tür; tekrarlar silinmez.',
      'Bu araca özgü bir noktaya da dikkat edin: binlik ayırıcı kullanmayın. Nokta da virgül gibi ondalık ayırıcı kabul edildiğinden <code>1.250</code> yazarsanız bin iki yüz elli değil, 1,25 olarak okunur. Büyük sayıları <code>1250</code> biçiminde bitişik yazın.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç ham, yani tek tek yazılmış veriler içindir. Sınıflara ayrılmış (gruplandırılmış) frekans tablolarında medyan, medyan sınıfı ve sınıf aralığı kullanılarak ayrı bir formülle kestirilir; bu sayfa o hesabı yapmaz. Bir değer çok kez tekrar ediyorsa o değeri tekrar sayısı kadar yazmanız gerekir. Sonuçlar en fazla altı ondalık basamakla gösterilir; iki yüzden fazla sayı girdiğinizde sıralı listenin yalnızca ilk iki yüz değeri ekrana yazılır, hesap ise tüm veriyle yapılır.',
    ] },
  ],
  faq: [
    ['Medyan ile ortanca aynı şey midir?', 'Evet. Medyan sözcüğü Latince kökenlidir, ortanca ise aynı kavramın Türkçe karşılığıdır. Okul kitaplarında çoğunlukla ortanca, üniversite ve araştırma metinlerinde çoğunlukla medyan kullanılır.'],
    ['Veri sayısı çift olduğunda medyan nasıl bulunur?', 'Veri sıralanır ve ortadaki iki değerin aritmetik ortalaması alınır. Örneğin 3, 5, 7, 9 dizisinde ortadaki değerler 5 ve 7 olduğundan medyan 6\'dır.'],
    ['Medyan dizide bulunmayan bir sayı olabilir mi?', 'Evet, veri sayısı çift olduğunda olabilir. 1\'den 10\'a kadar olan tam sayıların medyanı 5,5\'tir ve bu değer dizide yer almaz. Veri sayısı tek olduğunda ise medyan her zaman dizideki değerlerden biridir.'],
    ['Aynı sayı birden fazla kez geçiyorsa ne yapmalıyım?', 'Her tekrarı ayrı bir veri olarak yazın. Medyan hesabında tekrarlar atılmaz; 4, 4, 4, 9 dizisinde dört veri vardır ve medyan ortadaki iki 4\'ün ortalaması, yani 4\'tür.'],
    ['Medyan ne zaman ortalamadan daha iyi bir özet verir?', 'Veride diğerlerinden çok uzak birkaç değer varsa ya da dağılım çarpıksa. Gelir, kira ve fiyat verileri tipik örneklerdir; birkaç çok yüksek değer ortalamayı yukarı çekerken medyan yerinde kalır.'],
    ['Negatif ve ondalıklı sayılar girebilir miyim?', 'Evet. Negatif sayıları başına eksi işareti koyarak, ondalıklı sayıları virgülle yazın. Örneğin -4, -2, 0 ve 7 değerlerinin medyanı, ortadaki -2 ile 0\'ın ortalaması olan -1\'dir.'],
    ['Medyan ile çeyreklikler arasındaki ilişki nedir?', 'Medyan ikinci çeyrekliktir ve veriyi iki eşit parçaya böler. Birinci ve üçüncü çeyreklikler ise bu iki yarıyı yeniden ortadan bölen değerlerdir; kutu grafiğinin ortasındaki çizgi medyanı gösterir.'],
    ['Yazdığım sayılar bir yere kaydediliyor mu?', 'Hayır. Sıralama ve hesaplama tamamen tarayıcınızda yapılır; sayılarınız sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ortalama-hesapla', 'tepe-deger-hesapla', 'istatistik-hesapla', 'ceyreklik-hesapla', 'standart-sapma-hesapla', 'sayi-siralama'],
};
