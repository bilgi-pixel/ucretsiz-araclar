export default {
  slug: 't-skoru-hesapla',
  title: 'T Skoru (Standart Puan) Hesaplama',
  h1Tail: 'ham puandan Z ve T puanı',
  pageTitle: "T Skoru Hesaplama – Ham Puandan Z ve T Standart Puanı",
  description: "Ham puanı, grup ortalamasını ve standart sapmayı girin; Z skorunu, T skorunu (ortalama 50, sapma 10) ve yüzdelik sırayı anında hesaplayın.",
  card: "Ham puan, ortalama ve standart sapmadan Z skoru, T skoru ve yüzdelik sırayı hesaplayın.",
  category: 'egitim',
  keywords: ['t skoru hesaplama', 't puanı hesaplama', 'standart puan hesaplama', 'z skoru t skoru çevirme', 'z puanı hesaplama', 'ham puan standart puan', 'yüzdelik sıra hesaplama'],
  lead: "Bir sınavdan alınan ham puanı, o sınavın ortalamasını ve standart sapmasını girin. Araç puanı önce Z skoruna, ardından ortalaması 50 ve standart sapması 10 olan <strong>T skoruna</strong> dönüştürür; normal dağılım varsayımıyla yüzdelik sırayı da verir.",
  button: 'Hesapla',
  inputs: [
    { id: 'puan', label: 'Ham puan', type: 'number', placeholder: 'Örn. 75' },
    { id: 'ortalama', label: 'Ortalama', type: 'number', placeholder: 'Örn. 60' },
    { id: 'sapma', label: 'Standart sapma', type: 'number', placeholder: 'Örn. 10' },
  ],
  compute(v, h) {
    const puan = h.num(v.puan, 'Ham puan');
    const ort = h.num(v.ortalama, 'Ortalama');
    const ss = h.pos(v.sapma, 'Standart sapma');
    const z = (puan - ort) / ss;
    const phi = (t) => {
      if (t < -8) return 0;
      if (t > 8) return 1;
      let terim = t, toplam = t;
      for (let i = 3; i < 400; i += 2) {
        terim = (terim * t * t) / i;
        toplam += terim;
        if (Math.abs(terim) < 1e-17) break;
      }
      return 0.5 + (toplam * Math.exp(-(t * t) / 2)) / Math.sqrt(2 * Math.PI);
    };
    const yorum = Math.abs(z) < 1e-9 ? 'Ortalamaya eşit'
      : Math.abs(z) < 1 - 1e-9 ? `Ortalamanın ${z > 0 ? 'üstünde' : 'altında'}, bir standart sapmalık bandın içinde`
        : Math.abs(z) < 2 - 1e-9 ? `Ortalamanın belirgin biçimde ${z > 0 ? 'üstünde' : 'altında'}`
          : `Ortalamanın çok ${z > 0 ? 'üstünde' : 'altında'} (uç değer)`;
    return {
      rows: [
        ['T skoru', h.fmt(50 + 10 * z, 2)],
        ['Z skoru', h.fmt(z, 2)],
        ['Yüzdelik sıra', `%${h.fmt(phi(z) * 100, 2)}`],
        ['Ortalamadan fark', `${h.fmt(puan - ort, 2)} puan`],
        ['Yorum', yorum],
      ],
      note: 'T = 50 + 10 × Z. Yüzdelik sıra, puanların normal dağıldığı varsayımıyla hesaplanır.',
    };
  },
  cases: [
    { in: { puan: '75', ortalama: '60', sapma: '10' }, out: { 'T skoru': '65', 'Z skoru': '1,5', 'Yüzdelik sıra': '%93,32', 'Ortalamadan fark': '15 puan', 'Yorum': 'Ortalamanın belirgin biçimde üstünde' } },
    { in: { puan: '60', ortalama: '60', sapma: '10' }, out: { 'T skoru': '50', 'Z skoru': '0', 'Yüzdelik sıra': '%50', 'Yorum': 'Ortalamaya eşit' } },
    { in: { puan: '48', ortalama: '60', sapma: '8' }, out: { 'T skoru': '35', 'Z skoru': '-1,5', 'Yüzdelik sıra': '%6,68', 'Ortalamadan fark': '-12 puan' } },
    { in: { puan: '82', ortalama: '70', sapma: '6' }, out: { 'T skoru': '70', 'Z skoru': '2', 'Yüzdelik sıra': '%97,72', 'Yorum': 'Ortalamanın çok üstünde (uç değer)' } },
    { in: { puan: '55', ortalama: '65', sapma: '20' }, out: { 'T skoru': '45', 'Z skoru': '-0,5', 'Yüzdelik sıra': '%30,85', 'Yorum': 'Ortalamanın altında, bir standart sapmalık bandın içinde' } },
    { in: { puan: '66', ortalama: '60', sapma: '8' }, out: { 'T skoru': '57,5', 'Z skoru': '0,75', 'Yüzdelik sıra': '%77,34' } },
    { in: { puan: '50', ortalama: '60', sapma: '10' }, out: { 'T skoru': '40', 'Z skoru': '-1', 'Yüzdelik sıra': '%15,87' } },
    { in: { puan: '75', ortalama: '60', sapma: '0' }, error: true },
    { in: { puan: '75', ortalama: '60', sapma: '-5' }, error: true },
    { in: { puan: 'yetmiş', ortalama: '60', sapma: '10' }, error: true },
  ],
  howto: [
    "<strong>Ham puan</strong> alanına sınavdan ya da testten alınan, üzerinde işlem yapılmamış puanı yazın.",
    "<strong>Ortalama</strong> alanına aynı sınava giren grubun puan ortalamasını girin.",
    "<strong>Standart sapma</strong> alanına grubun standart sapmasını yazın; değer sıfırdan büyük olmalıdır.",
    "Hesapla düğmesine basın. İlk satırda T skoru, ardından Z skoru, yüzdelik sıra ve kısa bir yorum görünür.",
    "Farklı sınavlardaki puanları karşılaştırmak için her biri için ayrı hesap yapın ve T skorlarını yan yana koyun.",
  ],
  sections: [
    { h: 'Standart puan nedir, neden gerekir?', p: [
      "Ham puan tek başına pek bir şey söylemez. Bir öğrencinin matematikten 60, tarihten 75 aldığını bilmek, hangisinde daha başarılı olduğunu anlamaya yetmez; çünkü iki sınavın zorluğu ve puanların yayılımı farklıdır. Matematik sınavının ortalaması 40, tarih sınavının ortalaması 80 ise öğrenci aslında matematikte sınıfın üstünde, tarihte altındadır.",
      "Standart puanlar bu sorunu çözer. Ham puanı, grubun ortalamasına ve standart sapmasına göre yeniden ifade ederek farklı sınavları ortak bir ölçeğe taşır. En temel standart puan Z skorudur; T skoru ise onun daha okunaklı bir dönüşümüdür.",
    ] },
    { h: 'Z skoru ve T skoru formülleri', p: [
      "Z skoru şu formülle bulunur: <strong>Z = (ham puan − ortalama) ÷ standart sapma</strong>. Sonuç, puanın ortalamadan kaç standart sapma uzakta olduğunu gösterir. Ortalamaya eşit puanın Z skoru 0'dır; ortalamanın altındaki puanlar negatif değer alır.",
      "T skoru, Z skorunun ortalaması 50 ve standart sapması 10 olacak biçimde ölçeklenmiş hâlidir: <strong>T = 50 + 10 × Z</strong>. Bu dönüşüm sıralamayı ve puanlar arasındaki göreli uzaklıkları değiştirmez; yalnızca negatif ve küsuratlı sayıları ortadan kaldırarak raporlamayı kolaylaştırır. Uygulamada T skorlarının neredeyse tamamı 20 ile 80 arasında kalır, çünkü ortalamadan üç standart sapmadan fazla uzaklaşan puanlar çok enderdir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Ortalaması 60, standart sapması 10 olan bir sınavdan 75 alan öğrenci için Z = (75 − 60) ÷ 10 = 1,5 bulunur. T skoru 50 + 10 × 1,5 = 65'tir. Normal dağılım tablosunda Z = 1,5'e karşılık gelen birikimli olasılık 0,9332 olduğundan öğrenci grubun yaklaşık %93,32'sinden daha yüksek puan almıştır.",
      "Şimdi başka bir sınava bakalım: ortalama 60, standart sapma 8 ve öğrencinin puanı 48 olsun. Z = (48 − 60) ÷ 8 = −1,5 ve T = 50 − 15 = 35 çıkar; yüzdelik sıra %6,68'dir. İki sınavdaki ham puan farkı 27 gibi görünse de standart puanlar öğrencinin birinde ortalamanın 1,5 sapma üstünde, diğerinde aynı ölçüde altında olduğunu açıkça gösterir.",
    ] },
    { h: 'Hızlı başvuru: Z, T ve yüzdelik karşılıkları', ul: [
      "<strong>Z = −2</strong> → T = 30 → yaklaşık %2,28",
      "<strong>Z = −1</strong> → T = 40 → yaklaşık %15,87",
      "<strong>Z = −0,5</strong> → T = 45 → yaklaşık %30,85",
      "<strong>Z = 0</strong> → T = 50 → %50",
      "<strong>Z = 0,5</strong> → T = 55 → yaklaşık %69,15",
      "<strong>Z = 1</strong> → T = 60 → yaklaşık %84,13",
      "<strong>Z = 1,5</strong> → T = 65 → yaklaşık %93,32",
      "<strong>Z = 2</strong> → T = 70 → yaklaşık %97,72",
    ] },
    { h: 'T skoru nerelerde kullanılır?', p: [
      "Eğitimde en yaygın kullanım, farklı derslerin ya da farklı zorluktaki sınavların puanlarını birleştirmektir. Standart puana çevrilmiş sonuçlar toplanabilir ve ortalaması alınabilir; ham puanlarla aynı işlemi yapmak, yayılımı geniş olan sınavın sonucu orantısız biçimde etkilemesine yol açar. Üniversitelerdeki bağıl değerlendirme yönergelerinin birçoğu harf notu aralıklarını T skoru üzerinden tanımlar.",
      "Ölçme ve değerlendirme derslerinde, rehberlik servislerinin kullandığı yetenek ve ilgi envanterlerinde ve psikolojik ölçeklerin raporlanmasında da T skoruyla sık karşılaşılır. Merkezî sınavlarda açıklanan standart puanlar benzer bir mantığa dayanır, ancak her sınavın kendi dönüşüm kuralı ve katsayıları vardır; bu araç o sınavlara özgü puanları hesaplamaz.",
      "Bir uyarı: sağlık alanında kemik yoğunluğu ölçümlerinde geçen T skoru, aynı adı taşısa da farklı bir tanıma sahiptir ve bu sayfadaki eğitim amaçlı standart puanla karıştırılmamalıdır. İstatistikteki t testi de ayrı bir kavramdır.",
    ] },
    { h: 'Varsayımlar ve sık yapılan hatalar', p: [
      "T ve Z skoru hesabı herhangi bir dağılım için geçerlidir; yüzdelik sıra ise yalnızca puanlar normal dağılıma yakınsa güvenilirdir. Çarpık dağılımlarda, örneğin çok kolay bir sınavda herkesin yüksek puan aldığı durumda, hesaplanan yüzde gerçek sıradan sapabilir.",
      "En sık yapılan hata, ortalama ve standart sapmayı farklı gruplardan almaktır. İkisi de puanı değerlendirilen kişinin girdiği aynı sınava ve aynı gruba ait olmalıdır. Standart sapma yerine varyans yazmak da yaygın bir karışıklıktır; varyansın karekökünü alarak standart sapmayı elde edin. Sonuçlar bilgilendirme amaçlıdır; resmî not ve yerleştirme işlemlerinde ilgili kurumun hesabı geçerlidir.",
    ] },
  ],
  faq: [
    ['T skoru nasıl hesaplanır?', "Önce ham puandan ortalama çıkarılıp standart sapmaya bölünerek Z skoru bulunur. Sonra Z skoru 10 ile çarpılır ve 50 eklenir. Ortalaması 60, sapması 10 olan sınavda 75 puanın T skoru 65'tir."],
    ['T skoru 50 ne anlama gelir?', "T skoru 50, puanın grubun ortalamasına tam eşit olduğunu gösterir. 50'nin üzerindeki her 10 puan bir standart sapma yukarıyı, altındaki her 10 puan bir standart sapma aşağıyı ifade eder."],
    ['Z skoru ile T skoru arasında ne fark var?', "Aynı bilgiyi farklı ölçekte verirler. Z skorunda ortalama 0 ve standart sapma 1'dir; T skorunda ortalama 50 ve standart sapma 10'dur. T skoru negatif değer almadığı için raporlarda tercih edilir."],
    ['T skoru negatif olabilir mi?', "Kuramsal olarak ortalamanın beş standart sapmadan fazla altındaki bir puan negatif T skoru verir, ancak pratikte bu neredeyse hiç görülmez. Gerçek sınavlarda T skorları çoğunlukla 20 ile 80 arasındadır."],
    ['Yüzdelik sıra ne demek?', "Grubun yüzde kaçının sizden düşük puan aldığını gösteren tahmini değerdir. %93 yüzdelik sıra, grubun yaklaşık yüzde doksan üçünün gerinizde kaldığı anlamına gelir. Hesap normal dağılım varsayımına dayanır."],
    ['Farklı derslerdeki notlarımı T skoruyla karşılaştırabilir miyim?', "Evet, T skorunun temel kullanım amacı budur. Her ders için kendi ortalaması ve standart sapmasıyla T skorunu hesaplayın; yüksek olan T skoru, sınıfa göre daha başarılı olduğunuz dersi gösterir."],
    ['Standart sapma sıfır olursa ne olur?', "Standart sapmanın sıfır olması gruptaki herkesin aynı puanı aldığı anlamına gelir; bu durumda standart puan tanımsızdır. Araç sıfır ya da negatif standart sapma için hata verir."],
    ['Girdiğim puanlar saklanıyor mu?', "Hayır. Hesaplama tarayıcınızda yapılır; puan, ortalama ve standart sapma değerleri sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ['can-egrisi-hesapla', 'sinif-ortalamasi-hesapla', 'basari-yuzdesi-hesapla', 'sinav-notu-hesapla', '100luk-4luk-cevir'],
};
