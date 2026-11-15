export default {
  slug: 'kelime-sayfa-cevir',
  title: 'Kelime Sayısından Sayfa Sayısı Hesaplama',
  h1Tail: 'punto ve satır aralığına göre',
  pageTitle: "Kelime Sayısından Sayfa Sayısı Hesaplama – Kaç Kelime Kaç Sayfa?",
  description: "Kelime sayısını yazın; punto ve satır aralığına göre metnin yaklaşık kaç A4 sayfa tutacağını öğrenin. Ödev, makale ve tez planlaması için pratik hesap.",
  card: "Kelime sayısını, puntoyu ve satır aralığını seçin; metnin yaklaşık kaç A4 sayfa tutacağını görün.",
  category: 'egitim',
  keywords: ['kelime sayfa hesaplama', '1000 kelime kaç sayfa', 'kaç kelime kaç sayfa', 'sayfa sayısı hesaplama', '500 kelime kaç sayfa', 'ödev sayfa sayısı', 'kelime sayısından sayfa'],
  lead: "Metninizin kelime sayısını girin, yazı boyutunu ve satır aralığını seçin. Araç, standart kenar boşluklu bir A4 sayfaya sığan yaklaşık kelime sayısından yola çıkarak metnin <strong>kaç sayfa tutacağını</strong> tahmin eder. Kendi belgenizdeki sayfa başına kelime sayısını biliyorsanız onu da yazabilirsiniz.",
  button: 'Hesapla',
  inputs: [
    { id: 'kelime', label: 'Kelime sayısı', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'punto', label: 'Yazı boyutu', type: 'select', value: '12', options: [['10', '10 punto'], ['11', '11 punto'], ['12', '12 punto'], ['14', '14 punto']] },
    { id: 'aralik', label: 'Satır aralığı', type: 'select', options: [['1', 'Tek (1,0)'], ['1.5', '1,5 satır'], ['2', 'Çift (2,0)']] },
    { id: 'sayfaBasi', label: 'Sayfa başına kelime (isteğe bağlı)', type: 'number', placeholder: 'Boş = tahmin', hint: 'Doldurursanız punto ve aralık seçimi yerine bu değer kullanılır.' },
  ],
  compute(v, h) {
    const kelime = h.pos(v.kelime, 'Kelime sayısı');
    const ozel = String(v.sayfaBasi ?? '').trim() !== '';
    let wpp;
    if (ozel) wpp = h.pos(v.sayfaBasi, 'Sayfa başına kelime');
    else {
      const pt = Number(v.punto), ar = Number(v.aralik);
      if (![10, 11, 12, 14].includes(pt) || ![1, 1.5, 2].includes(ar)) h.err('Yazı boyutu ve satır aralığını listeden seçin.');
      wpp = (500 * (12 / pt) * (12 / pt)) / ar;
    }
    const sayfa = kelime / wpp;
    const tam = Math.max(1, Math.ceil(sayfa - 1e-9));
    return {
      rows: [
        ['Sayfa sayısı', `${h.fmt(sayfa, 1)} sayfa`],
        ['Tam sayfa olarak', `${h.fmt(tam, 0)} sayfa`],
        ['Sayfa başına kelime', `${h.fmt(wpp, 0)} kelime`],
      ],
      note: ozel ? 'Hesap, girdiğiniz sayfa başına kelime değeriyle yapıldı.'
        : 'Tahmin; A4 kâğıt, standart kenar boşluğu ve düz paragraf metni içindir. Başlık, tablo ve görseller sayfa sayısını artırır.',
    };
  },
  cases: [
    { in: { kelime: '1000', punto: '12', aralik: '2' }, out: { 'Sayfa sayısı': '4 sayfa', 'Tam sayfa olarak': '4 sayfa', 'Sayfa başına kelime': '250 kelime' } },
    { in: { kelime: '1500', punto: '12', aralik: '1' }, out: { 'Sayfa sayısı': '3 sayfa', 'Tam sayfa olarak': '3 sayfa', 'Sayfa başına kelime': '500 kelime' } },
    { in: { kelime: '1000', punto: '12', aralik: '1.5' }, out: { 'Sayfa sayısı': '3 sayfa', 'Tam sayfa olarak': '3 sayfa', 'Sayfa başına kelime': '333 kelime' } },
    { in: { kelime: '2500', punto: '10', aralik: '1' }, out: { 'Sayfa sayısı': '3,5 sayfa', 'Tam sayfa olarak': '4 sayfa', 'Sayfa başına kelime': '720 kelime' } },
    { in: { kelime: '600', punto: '14', aralik: '2' }, out: { 'Sayfa sayısı': '3,3 sayfa', 'Tam sayfa olarak': '4 sayfa', 'Sayfa başına kelime': '184 kelime' } },
    { in: { kelime: '900', punto: '12', aralik: '1', sayfaBasi: '300' }, out: { 'Sayfa sayısı': '3 sayfa', 'Tam sayfa olarak': '3 sayfa', 'Sayfa başına kelime': '300 kelime' } },
    { in: { kelime: '250', punto: '12', aralik: '1' }, out: { 'Sayfa sayısı': '0,5 sayfa', 'Tam sayfa olarak': '1 sayfa' } },
    { in: { kelime: '0', punto: '12', aralik: '1' }, error: true },
    { in: { kelime: 'bin', punto: '12', aralik: '1' }, error: true },
  ],
  howto: [
    "<strong>Kelime sayısı</strong> alanına metninizin ya da sizden istenen yazının kelime adedini yazın.",
    "<strong>Yazı boyutu</strong> listesinden belgenizde kullanacağınız puntoyu seçin; ödev ve tezlerde en sık 12 punto istenir.",
    "<strong>Satır aralığı</strong> olarak tek, 1,5 ya da çift aralıktan birini seçin.",
    "Belgenizin bir sayfasındaki kelime sayısını biliyorsanız isteğe bağlı alana yazın; bu durumda tahmin yerine sizin değeriniz kullanılır.",
    "Hesapla düğmesine basın. İlk satır ondalıklı sayfa sayısını, ikinci satır yazdırıldığında kaç yaprak yüzü dolacağını gösterir.",
  ],
  sections: [
    { h: 'Hesap hangi varsayıma dayanır?', p: [
      "Yaygın kabul gören pratik ölçüye göre A4 boyutunda, kenar boşlukları yaklaşık 2,5 santimetre olan bir sayfaya 12 punto ve tek satır aralığıyla düz metin yazıldığında <strong>yaklaşık 500 kelime</strong> sığar. Araç bu değeri temel alır ve seçimlerinize göre ölçekler.",
      "Satır aralığı sayfadaki satır sayısını doğrudan böler: 1,5 aralıkta aynı sayfaya yaklaşık 333, çift aralıkta yaklaşık 250 kelime sığar. Yazı boyutu ise hem satırdaki harf sayısını hem de sayfadaki satır sayısını etkilediği için oran karesiyle uygulanır: <strong>sayfa başına kelime = 500 × (12 ÷ punto)² ÷ satır aralığı</strong>. Buna göre 10 puntoda tek aralıkla yaklaşık 720, 14 puntoda yaklaşık 367 kelime elde edilir.",
      "Sayfa sayısı son adımda bulunur: <strong>sayfa = kelime sayısı ÷ sayfa başına kelime</strong>. Sonucun yukarı yuvarlanmış hâli, metnin son satırının hangi sayfada biteceğini gösterir.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "Bir öğretmen 1000 kelimelik bir kompozisyonu 12 punto ve çift satır aralığıyla istemiş olsun. Sayfa başına kelime 500 ÷ 2 = 250 olur ve 1000 ÷ 250 = 4 sayfa eder. Aynı metin 1,5 aralıkla yazılırsa yaklaşık 3 sayfa, tek aralıkla 2 sayfa tutar.",
      "İkinci örnekte 2500 kelimelik bir rapor 10 punto ve tek aralıkla hazırlanıyor. Sayfa başına kelime 500 × (12 ÷ 10)² = 720 çıkar. 2500 ÷ 720 = 3,47 olduğundan araç 3,5 sayfa gösterir; metin dördüncü sayfanın yarısına yakın bir yerinde biter ve çıktı dört sayfa olur.",
    ] },
    { h: 'Hızlı başvuru tablosu (12 punto)', ul: [
      "<strong>250 kelime</strong>: tek aralık 0,5 sayfa, çift aralık 1 sayfa",
      "<strong>500 kelime</strong>: tek aralık 1 sayfa, çift aralık 2 sayfa",
      "<strong>1000 kelime</strong>: tek aralık 2 sayfa, 1,5 aralık 3 sayfa, çift aralık 4 sayfa",
      "<strong>1500 kelime</strong>: tek aralık 3 sayfa, çift aralık 6 sayfa",
      "<strong>2000 kelime</strong>: tek aralık 4 sayfa, 1,5 aralık 6 sayfa, çift aralık 8 sayfa",
      "<strong>5000 kelime</strong>: tek aralık 10 sayfa, çift aralık 20 sayfa",
    ] },
    { h: 'Tahmini saptıran etkenler', p: [
      "Gerçek sayfa sayısı yalnızca punto ve aralığa bağlı değildir. Yazı tipi önemli bir etkendir: aynı puntoda geniş harfli bir yazı tipi, dar harfli bir yazı tipine göre belirgin biçimde daha fazla yer kaplar. Kenar boşluklarının artırılması, paragraflar arasına boşluk eklenmesi ve ilk satır girintileri de sayfa başına düşen kelimeyi azaltır.",
      "Metnin yapısı da sonucu değiştirir. Çok sayıda başlık, madde işaretli liste, alıntı bloğu, dipnot, tablo, şekil ve formül içeren akademik çalışmalar düz metne göre daha çok sayfa tutar. Kısa paragraflarla yazılmış diyalog ağırlıklı metinlerde satır sonlarında kalan boşluklar aynı etkiyi yaratır. Türkçe kelimeler eklemeli yapısı nedeniyle ortalamada uzun olduğundan, kelime uzunluğu kısa olan dillerdeki metinlere göre aynı kelime sayısı biraz daha fazla yer kaplayabilir.",
      "Bu nedenle en güvenilir yöntem, kendi şablonunuzda dolu bir sayfayı seçip kelime işlemcinizin kelime sayacıyla o sayfadaki kelimeleri saymak ve bulduğunuz değeri isteğe bağlı alana yazmaktır. Böylece tahmin, sizin yazı tipinize ve sayfa düzeninize tam olarak uyar.",
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      "Öğrenciler ödev ve dönem projelerinde verilen kelime sınırının kaç sayfaya denk geldiğini önceden görerek çalışmayı planlayabilir. Tez ve makale yazanlar bölüm başına ayırdıkları kelime bütçesini sayfaya çevirerek toplam hacmi kestirebilir. Yazarlar ve editörler bir dosyanın basılı hâlinin kabaca kaç sayfa olacağına dair ilk fikri edinir.",
      "Metin yazarları ve içerik üreticileri için de kullanışlıdır: 800 kelimelik bir blog yazısının çıktısının tek aralıkla bir buçuk sayfayı biraz aştığını bilmek, basılı broşür ya da bülten tasarlarken yer hesabını kolaylaştırır. Konuşma metni hazırlayanlar ise sayfa sayısı yerine süreyle ilgileniyorsa sunum süresi aracından yararlanabilir.",
    ] },
    { h: 'Sınırlar', p: [
      "Sonuç bir tahmindir ve kapak sayfası, içindekiler, kaynakça ya da ekler gibi bölümleri içermez. Kurumunuzun yazım kılavuzu kenar boşluğu, yazı tipi ve aralık için özel kurallar koyuyorsa nihai sayfa sayısını belgenin kendisinde kontrol edin. Sayfa sınırı olan başvurularda son kararı her zaman biçimlendirilmiş belgenin gerçek sayfa sayısına göre verin.",
    ] },
  ],
  faq: [
    ['1000 kelime kaç sayfa eder?', "12 punto ile tek satır aralığında yaklaşık 2 sayfa, 1,5 aralıkta yaklaşık 3 sayfa, çift aralıkta yaklaşık 4 sayfa eder. Yazı tipi ve kenar boşluklarına göre küçük farklar olabilir."],
    ['500 kelime kaç sayfadır?', "12 punto ve tek aralıkla yaklaşık 1 A4 sayfasıdır. Çift satır aralığı kullanılırsa 2 sayfaya çıkar."],
    ['Bir A4 sayfaya kaç kelime sığar?', "Standart kenar boşlukları ve 12 puntoyla tek aralıkta yaklaşık 500, 1,5 aralıkta yaklaşık 333, çift aralıkta yaklaşık 250 kelime sığar. 10 puntoya inildiğinde tek aralıkta bu sayı 700'ün üzerine çıkar."],
    ['Yazı tipi sonucu değiştirir mi?', "Evet. Aynı punto değerinde yazı tiplerinin harf genişlikleri farklıdır, bu yüzden sayfa başına kelime sayısı yüzde on ve üzeri oynayabilir. Kesin sonuç için kendi belgenizde ölçtüğünüz değeri isteğe bağlı alana yazın."],
    ['Sayfa sayısı neden ondalıklı çıkıyor?', "Metnin son sayfası çoğu zaman tam dolmaz. Ondalıklı değer metnin ne kadar yer kapladığını, tam sayfa satırı ise çıktı aldığınızda kaç sayfa kullanılacağını gösterir."],
    ['El yazısıyla kaç sayfa tutar?', "El yazısında harf büyüklüğü kişiden kişiye çok değiştiği için genel bir oran vermek güvenilir olmaz. Kendi yazınızla dolu bir sayfadaki kelimeleri sayıp isteğe bağlı alana yazarak hesaplayabilirsiniz."],
    ['Kelime sayımı nasıl öğrenirim?', "Kelime işlemcilerin çoğu belge altındaki durum çubuğunda ya da araçlar menüsünde kelime sayısını gösterir. Metni bir kelime sayacı aracına yapıştırarak da öğrenebilirsiniz."],
    ['Yazdığım değerler kaydediliyor mu?', "Hayır. Hesap yalnızca tarayıcınızda yapılır; kelime sayınız ya da seçimleriniz sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['kitap-okuma-suresi-hesapla', 'yazma-hizi-sure-hesapla', 'sunum-suresi-hesapla', 'ders-calisma-plani-hesapla'],
};
