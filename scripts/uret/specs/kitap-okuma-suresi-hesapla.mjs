export default {
  slug: 'kitap-okuma-suresi-hesapla',
  title: 'Kitap Okuma Süresi Hesaplama',
  h1Tail: 'sayfa ve okuma hızına göre',
  pageTitle: "Kitap Okuma Süresi Hesaplama – Kaç Saatte, Kaç Günde Biter?",
  description: "Sayfa sayısı, sayfa başına kelime ve okuma hızınıza göre bir kitabın kaç saatte ve günlük okuma sürenizle kaç günde biteceğini hesaplayın.",
  card: "Kitabın sayfa sayısını ve okuma hızınızı girin; toplam okuma süresini ve kaç günde biteceğini görün.",
  category: 'egitim',
  keywords: ['kitap okuma süresi hesaplama', 'kitap kaç günde biter', 'okuma hızı hesaplama', 'dakikada kaç kelime okunur', 'günde kaç sayfa okumalı', 'sayfa okuma süresi', '300 sayfa kitap kaç saatte okunur'],
  lead: "Bir kitabın sayfa sayısını, sayfa başına ortalama kelime sayısını ve dakikada okuduğunuz kelime sayısını girin. Araç toplam okuma süresini, günlük ayırdığınız dakikaya göre kitabın <strong>kaç günde biteceğini</strong> ve günde kaç sayfa okumuş olacağınızı hesaplar.",
  button: 'Hesapla',
  inputs: [
    { id: 'sayfa', label: 'Sayfa sayısı', type: 'number', placeholder: 'Örn. 300' },
    { id: 'kelimeSayfa', label: 'Sayfa başına kelime', type: 'number', value: '250', hint: 'Bilmiyorsanız bir sayfadaki satır sayısı × satırdaki kelime sayısı ile bulun.' },
    { id: 'hiz', label: 'Okuma hızı (kelime/dakika)', type: 'number', value: '200', hint: 'Bir dakika okuyup kelimeleri sayarak ölçebilirsiniz.' },
    { id: 'gunluk', label: 'Günlük okuma süresi (dakika)', type: 'number', value: '30' },
  ],
  compute(v, h) {
    const sayfa = h.pos(v.sayfa, 'Sayfa sayısı');
    const ks = h.pos(v.kelimeSayfa, 'Sayfa başına kelime');
    const hiz = h.pos(v.hiz, 'Okuma hızı');
    const gunluk = h.pos(v.gunluk, 'Günlük okuma süresi');
    if (gunluk > 1440) h.err('Günlük okuma süresi 1440 dakikadan (24 saat) fazla olamaz.');
    const kelime = sayfa * ks;
    const dk = kelime / hiz;
    const tamDk = Math.max(1, Math.round(dk));
    const saat = Math.floor(tamDk / 60);
    const kalan = tamDk - saat * 60;
    const gun = Math.max(1, Math.ceil(dk / gunluk - 1e-9));
    const gunlukSayfa = (gunluk * hiz) / ks;
    return {
      rows: [
        ['Toplam okuma süresi', `${saat} saat ${kalan} dakika`],
        ['Bitirme süresi', `${h.fmt(gun, 0)} gün`],
        ['Günde okunan sayfa', `${h.fmt(gunlukSayfa, 2)} sayfa`],
        ['Toplam kelime', `${h.fmt(kelime, 0)} kelime`],
        ['Bir sayfanın okunma süresi', `${h.fmt(ks / hiz, 2)} dakika`],
      ],
      note: 'Süre, molasız ve sabit hızla okuma varsayımıyla bulunur; gün sayısı yukarı yuvarlanır.',
    };
  },
  cases: [
    { in: { sayfa: '300', kelimeSayfa: '250', hiz: '200', gunluk: '30' }, out: { 'Toplam okuma süresi': '6 saat 15 dakika', 'Bitirme süresi': '13 gün', 'Günde okunan sayfa': '24 sayfa', 'Toplam kelime': '75.000 kelime' } },
    { in: { sayfa: '200', kelimeSayfa: '250', hiz: '250', gunluk: '60' }, out: { 'Toplam okuma süresi': '3 saat 20 dakika', 'Bitirme süresi': '4 gün', 'Günde okunan sayfa': '60 sayfa' } },
    { in: { sayfa: '120', kelimeSayfa: '300', hiz: '300', gunluk: '20' }, out: { 'Toplam okuma süresi': '2 saat 0 dakika', 'Bitirme süresi': '6 gün', 'Bir sayfanın okunma süresi': '1 dakika' } },
    { in: { sayfa: '450', kelimeSayfa: '280', hiz: '180', gunluk: '45' }, out: { 'Toplam okuma süresi': '11 saat 40 dakika', 'Bitirme süresi': '16 gün', 'Günde okunan sayfa': '28,93 sayfa' } },
    { in: { sayfa: '80', kelimeSayfa: '200', hiz: '160', gunluk: '25' }, out: { 'Toplam okuma süresi': '1 saat 40 dakika', 'Bitirme süresi': '4 gün', 'Günde okunan sayfa': '20 sayfa' } },
    { in: { sayfa: '1', kelimeSayfa: '250', hiz: '250', gunluk: '30' }, out: { 'Toplam okuma süresi': '0 saat 1 dakika', 'Bitirme süresi': '1 gün' } },
    { in: { sayfa: '0', kelimeSayfa: '250', hiz: '200', gunluk: '30' }, error: true },
    { in: { sayfa: 'abc', kelimeSayfa: '250', hiz: '200', gunluk: '30' }, error: true },
  ],
  howto: [
    "<strong>Sayfa sayısı</strong> alanına kitabın okuyacağınız sayfa sayısını yazın. Kitabın bir kısmını okuduysanız yalnızca kalan sayfaları girin.",
    "<strong>Sayfa başına kelime</strong> değerini kitabınıza göre düzeltin. Roman boyutundaki kitaplarda 250 civarı, sık dizilmiş büyük boy kitaplarda 350 ve üzeri olabilir.",
    "<strong>Okuma hızı</strong> alanına dakikada okuduğunuz kelime sayısını yazın. Bilmiyorsanız varsayılan 200 değeriyle başlayıp sonucu kendi deneyiminize göre ayarlayın.",
    "<strong>Günlük okuma süresi</strong> alanına her gün kitaba ayırabileceğiniz dakikayı girin ve Hesapla düğmesine basın.",
    "Sonuç kutusundaki bitirme süresine bakarak hedefinizi belirleyin; süre uzun geliyorsa günlük dakikayı artırıp yeniden hesaplayın.",
  ],
  sections: [
    { h: 'Okuma süresi nasıl hesaplanır?', p: [
      "Hesabın mantığı üç basit adımdan oluşur. Önce kitabın toplam kelime sayısı bulunur: <strong>toplam kelime = sayfa sayısı × sayfa başına kelime</strong>. Sonra bu sayı okuma hızına bölünür: <strong>okuma süresi (dakika) = toplam kelime ÷ dakikadaki kelime</strong>. Son olarak dakika cinsinden süre, günlük okuma sürenize bölünür ve yukarı yuvarlanır; çünkü yarım kalan son gün de bir okuma günüdür.",
      "Günde kaç sayfa okuyacağınız ise ayrı bir formülle bulunur: <strong>günlük sayfa = günlük dakika × okuma hızı ÷ sayfa başına kelime</strong>. Bu değer, yer imi koyarken ya da kendinize günlük sayfa hedefi verirken dakikadan daha pratik bir ölçüdür.",
    ] },
    { h: 'Çözümlü örnek: 300 sayfalık bir roman', p: [
      "300 sayfalık bir romanı, sayfasında ortalama 250 kelime olduğunu kabul ederek ele alalım. Toplam kelime 300 × 250 = 75.000 eder. Dakikada 200 kelime okuyan biri için süre 75.000 ÷ 200 = 375 dakika, yani 6 saat 15 dakikadır.",
      "Bu okur her gün 30 dakika ayırırsa 375 ÷ 30 = 12,5 gün gerekir; son gün yarım seans olacağı için kitap 13. günde biter. Günlük sayfa sayısı 30 × 200 ÷ 250 = 24 sayfadır. Aynı kişi günlük süreyi 60 dakikaya çıkarırsa kitap 7 günde, yani bir haftada tamamlanır. Araca aynı değerleri girdiğinizde bu sonuçları görürsünüz.",
    ] },
    { h: 'Okuma hızımı nasıl ölçerim?', p: [
      "En güvenilir yöntem kendi kitabınızla küçük bir deneme yapmaktır. Telefonunuzun kronometresini iki dakikaya kurun, her zamanki dikkatinizle okuyun ve süre bitince durduğunuz yeri işaretleyin. Okuduğunuz satırları sayın, bir satırdaki ortalama kelime sayısıyla çarpın ve ikiye bölün. Çıkan sayı dakikadaki kelime hızınızdır.",
      "Yetişkin okurların sessiz okuma hızı için çoğu kaynak dakikada kabaca 200 ile 300 kelime arasında bir aralık verir; ancak bu değer metnin zorluğuna, dile, yazı boyutuna ve okuma amacına göre belirgin biçimde değişir. Ders kitabı, akademik makale ya da yoğun bir felsefe metni okurken hız yarıya düşebilir; sürükleyici bir polisiyede ise artar. Bu yüzden tek bir hız ezberlemek yerine farklı kitap türleri için ayrı ölçüm yapmak daha doğru sonuç verir.",
    ] },
    { h: 'Sayfa başına kelime sayısını bulmak', p: [
      "Kitaplar arasında sayfa başına kelime farkı çok büyüktür. Cep boy bir romanda 200 kelimenin altına inilebilirken, büyük boy bir ansiklopedik eserde 500 kelimeyi aşmak mümkündür. Kendi kitabınız için dolu bir sayfa seçin, üç satırdaki kelimeleri sayıp ortalamasını alın ve sayfadaki satır sayısıyla çarpın. Örneğin satır başına 9 kelime ve 30 satır varsa sayfa yaklaşık 270 kelimedir.",
      "Resimli, tablolu ya da bölüm başlarında boşluk bırakılmış kitaplarda gerçek ortalama, dolu sayfada saydığınız değerden düşüktür. Bu tür kitaplarda değeri yüzde on kadar azaltmak gerçeğe daha yakın bir tahmin sağlar.",
    ] },
    { h: 'Okuma hedefi koyarken işe yarayan ipuçları', ul: [
      "<strong>Dakika hedefi sayfa hedefinden daha sürdürülebilirdir.</strong> Zor bir bölümde sayfa hedefi sizi aceleye iterken dakika hedefi anlamayı korur.",
      "<strong>Günü ikiye bölün.</strong> Sabah 15 ve akşam 15 dakika, tek seferde 30 dakika bulmaktan çoğu kişi için daha kolaydır.",
      "<strong>Yıllık plan yapın.</strong> Bir kitap için çıkan gün sayısını 365'e bölerek mevcut temponuzla yılda yaklaşık kaç benzer kitap okuyabileceğinizi görebilirsiniz.",
      "<strong>Sınav dönemi okumalarında pay bırakın.</strong> Not alarak ya da altını çizerek okuyorsanız süreyi en az üçte bir oranında artırın.",
      "<strong>Hızı değil sürekliliği artırın.</strong> Günlük süreyi 10 dakika uzatmak, hızı zorlamaktan daha az anlama kaybına yol açar.",
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      "Araç sabit bir okuma hızı ve kesintisiz okuma varsayar. Gerçekte dikkat dağılır, bazı paragraflar yeniden okunur ve hız gün içinde değişir; bu yüzden sonuç bir alt sınır tahmini gibi düşünülmelidir. Planınıza yüzde on ile yirmi arasında pay eklemek hedefi tutturmayı kolaylaştırır.",
      "Sesli kitap dinleme süresi bu hesapla bulunmaz, çünkü seslendirme hızı sessiz okumadan genellikle daha düşüktür. Yabancı dilde okuma yapıyorsanız kendi hızınızı o dilde ayrıca ölçün; ana dildeki hız yabancı dile aynen taşınmaz.",
    ] },
  ],
  faq: [
    ['300 sayfalık bir kitap kaç saatte okunur?', "Sayfa başına 250 kelime ve dakikada 200 kelime hızla 300 sayfa, 6 saat 15 dakikada okunur. Hızınız 250 kelimeye çıkarsa süre 5 saate iner. Kendi kitabınızın sayfa yoğunluğuna göre değerleri değiştirerek kesinleştirin."],
    ['Günde 30 dakika okursam yılda kaç kitap bitiririm?', "Dakikada 200 kelime hızla günde 30 dakika, yılda yaklaşık 2.190.000 kelime eder. Ortalama 75.000 kelimelik kitaplar için bu yaklaşık 29 kitaba karşılık gelir. Kitap uzunluğu değiştikçe sayı da değişir."],
    ['Okuma hızım normal mi?', "Tek bir doğru hız yoktur. Metnin türü, yazı boyutu ve ne kadar anlayarak okuduğunuz hızı belirler. Önemli olan hızı başkalarıyla kıyaslamak değil, kendi hızınızı bilip planınızı ona göre yapmaktır."],
    ['Sayfa başına kelime sayısını bilmiyorsam ne yazmalıyım?', "Standart roman boyutundaki kitaplar için 250 makul bir başlangıç değeridir. Daha doğru sonuç için bir sayfadaki satır sayısını satır başına ortalama kelimeyle çarparak kendi kitabınızın değerini bulun."],
    ['Kitabın yarısını okudum, kalan süreyi nasıl bulurum?', "Sayfa sayısı alanına yalnızca kalan sayfa sayısını yazın. Araç, girdiğiniz sayfa adedi üzerinden hesap yaptığı için sonuç doğrudan kalan süreyi ve kalan gün sayısını gösterir."],
    ['Gün sayısı neden yukarı yuvarlanıyor?', "Hesap 12,5 gün çıktığında on iki tam seansın ardından yarım seanslık bir okuma daha gerekir ve bu da ayrı bir güne denk gelir. Bu nedenle kitabın biteceği gün 13. gün olarak gösterilir."],
    ['Hızlı okuma teknikleriyle süre kısalır mı?', "Hızı artırmak süreyi kısaltır, ancak çok yüksek hızlarda anlama düzeyi düşebilir. Ders ve sınav amaçlı okumalarda anlama önceliklidir; hızı kademeli artırıp anladığınızı sınayarak ilerlemek daha güvenlidir."],
    ['Girdiğim bilgiler kaydediliyor mu?', "Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır."],
  ],
  related: ['kelime-sayfa-cevir', 'pomodoro-plani-hesapla', 'ders-calisma-plani-hesapla', 'yazma-hizi-sure-hesapla', 'sunum-suresi-hesapla'],
};
