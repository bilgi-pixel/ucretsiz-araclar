export default {
  slug: 'ders-calisma-plani-hesapla',
  title: 'Ders Çalışma Planı Hesaplama',
  h1Tail: 'derslere ağırlıklı süre dağıtımı',
  pageTitle: "Ders Çalışma Planı Hesaplama – Haftalık Süreyi Derslere Dağıt",
  description: "Derslerinizi ve önem ağırlıklarını yazın, günlük çalışma saatinizi girin; haftalık çalışma sürenizin derslere nasıl dağıtılacağını saat ve dakika olarak görün.",
  card: "Dersleri ağırlıklarıyla yazın; haftalık çalışma sürenizin her derse kaç saat düştüğünü hesaplayın.",
  category: 'egitim',
  keywords: ['ders çalışma planı', 'ders çalışma programı hazırlama', 'haftalık ders programı', 'hangi derse kaç saat çalışmalı', 'çalışma planı hesaplama', 'ders çalışma süresi dağılımı', 'sınav çalışma programı'],
  lead: "Çalışacağınız dersleri alt alta yazın, her dersin yanına önem ağırlığını ekleyin ve günde kaç saat, haftada kaç gün çalışacağınızı girin. Araç haftalık toplam sürenizi derslere <strong>ağırlıklarıyla orantılı</strong> olarak paylaştırır; her ders için haftalık saat ve günlük dakika karşılığını verir.",
  button: 'Planı hesapla',
  inputs: [
    { id: 'dersler', label: 'Dersler ve ağırlıkları', type: 'textarea', wide: true, placeholder: 'Matematik 3\nFizik 2\nKimya 1', hint: 'Her satıra bir ders; sonuna ağırlık sayısını yazın. Sayı yazmazsanız ağırlık 1 kabul edilir. En fazla 12 ders.' },
    { id: 'gunluk', label: 'Günlük çalışma süresi (saat)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'gun', label: 'Haftada çalışılan gün', type: 'number', value: '6' },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.dersler);
    if (!satirlar.length) h.err('En az bir ders yazın (örn. "Matematik 3").');
    if (satirlar.length > 12) h.err('En fazla 12 ders girebilirsiniz; benzer dersleri tek satırda birleştirin.');
    const gunluk = h.pos(v.gunluk, 'Günlük çalışma süresi');
    if (gunluk > 24) h.err('Günlük çalışma süresi 24 saatten fazla olamaz.');
    const gun = h.posint(v.gun, 'Haftada çalışılan gün');
    if (gun > 7) h.err('Haftada en fazla 7 gün olabilir.');
    const sabit = ['Haftalık toplam çalışma', 'Ders sayısı', 'Ağırlık toplamı'];
    const dersler = [];
    for (const s of satirlar) {
      const p = s.split(/\s+/);
      let ad = s, w = 1;
      if (p.length > 1 && /^\d+([.,]\d+)?$/.test(p[p.length - 1])) {
        w = h.pos(p[p.length - 1], 'Ağırlık');
        ad = p.slice(0, -1).join(' ');
      }
      if (dersler.some((d) => d.ad.toLocaleLowerCase('tr-TR') === ad.toLocaleLowerCase('tr-TR')) || sabit.includes(ad)) {
        h.err(`"${ad}" adı iki kez kullanılmış ya da ayrılmış bir ad; her derse farklı bir ad verin.`);
      }
      dersler.push({ ad, w });
    }
    const toplamW = dersler.reduce((a, d) => a + d.w, 0);
    const hafta = gunluk * gun;
    const rows = [['Haftalık toplam çalışma', `${h.fmt(hafta, 2)} saat`]];
    for (const d of dersler) {
      const saat = (hafta * d.w) / toplamW;
      rows.push([d.ad, `haftada ${h.fmt(saat, 2)} saat · günde ${h.fmt((saat * 60) / gun, 0)} dakika`]);
    }
    rows.push(['Ders sayısı', `${dersler.length}`], ['Ağırlık toplamı', h.fmt(toplamW, 2)]);
    return { rows, note: 'Günlük dakika, haftalık payın çalışılan günlere eşit bölünmüş hâlidir; dersleri günlere dönüşümlü dağıtabilirsiniz.' };
  },
  cases: [
    { in: { dersler: 'Matematik 3\nFizik 2\nKimya 1', gunluk: '3', gun: '6' }, out: { 'Haftalık toplam çalışma': '18 saat', 'Matematik': 'haftada 9 saat · günde 90 dakika', 'Fizik': 'haftada 6 saat · günde 60 dakika', 'Kimya': 'haftada 3 saat · günde 30 dakika', 'Ağırlık toplamı': '6' } },
    { in: { dersler: 'Türkçe\nMatematik\nFen\nSosyal', gunluk: '2', gun: '5' }, out: { 'Haftalık toplam çalışma': '10 saat', 'Türkçe': 'haftada 2,5 saat · günde 30 dakika', 'Sosyal': 'haftada 2,5 saat · günde 30 dakika', 'Ders sayısı': '4' } },
    { in: { dersler: 'Matematik 4\nTürkçe 3\nFen 2\nİngilizce 1', gunluk: '4', gun: '7' }, out: { 'Haftalık toplam çalışma': '28 saat', 'Matematik': 'haftada 11,2 saat · günde 96 dakika', 'Türkçe': 'haftada 8,4 saat · günde 72 dakika', 'Fen': 'haftada 5,6 saat · günde 48 dakika', 'İngilizce': 'haftada 2,8 saat · günde 24 dakika' } },
    { in: { dersler: 'Tarih 1', gunluk: '1,5', gun: '4' }, out: { 'Haftalık toplam çalışma': '6 saat', 'Tarih': 'haftada 6 saat · günde 90 dakika' } },
    { in: { dersler: 'Geometri 2,5\nParagraf 1,5', gunluk: '2', gun: '6' }, out: { 'Geometri': 'haftada 7,5 saat · günde 75 dakika', 'Paragraf': 'haftada 4,5 saat · günde 45 dakika', 'Ağırlık toplamı': '4' } },
    { in: { dersler: 'Yabancı Dil 1\nMatematik 1', gunluk: '1', gun: '3' }, out: { 'Haftalık toplam çalışma': '3 saat', 'Yabancı Dil': 'haftada 1,5 saat · günde 30 dakika' } },
    { in: { dersler: '', gunluk: '3', gun: '6' }, error: true },
    { in: { dersler: 'Matematik 3', gunluk: '25', gun: '6' }, error: true },
    { in: { dersler: 'Fizik 2\nfizik 1', gunluk: '3', gun: '6' }, error: true },
  ],
  howto: [
    "<strong>Dersler ve ağırlıkları</strong> kutusuna her satıra bir ders gelecek şekilde derslerinizi yazın.",
    "Her dersin sonuna bir boşluk bırakıp ağırlık sayısını ekleyin. Daha çok vakit ayırmak istediğiniz derse büyük sayı verin; örneğin <code>Matematik 3</code>.",
    "<strong>Günlük çalışma süresi</strong> alanına okul ve kurs dışında gerçekten masada geçirebileceğiniz saati yazın.",
    "<strong>Haftada çalışılan gün</strong> sayısını girin; bir günü dinlenmeye ayırmak için 6 değerini kullanabilirsiniz.",
    "Planı hesapla düğmesine basın ve her dersin karşısındaki haftalık saat ile günlük dakika değerlerini programınıza aktarın.",
  ],
  sections: [
    { h: 'Ağırlıklı dağıtım nasıl çalışır?', p: [
      "Araç önce haftalık toplam çalışma sürenizi bulur: <strong>haftalık süre = günlük saat × haftadaki gün</strong>. Sonra bu süreyi derslerin ağırlıklarıyla orantılı olarak böler: <strong>dersin payı = haftalık süre × dersin ağırlığı ÷ ağırlıkların toplamı</strong>. Ağırlıkların mutlak büyüklüğü değil, birbirine oranı önemlidir; 3-2-1 ile 6-4-2 aynı planı üretir.",
      "Günlük dakika değeri, haftalık payın çalıştığınız gün sayısına eşit bölünmüş hâlidir. Bu, her derse her gün çalışmanız gerektiği anlamına gelmez; bir dersin günlük 30 dakikalık payını haftada üç kez birer saat olarak kullanmak da aynı toplamı verir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Günde 3 saat ve haftada 6 gün çalışan bir öğrencinin haftalık süresi 3 × 6 = 18 saattir. Matematiğe 3, fiziğe 2, kimyaya 1 ağırlık verildiğinde ağırlık toplamı 6 olur. Matematiğin payı 18 × 3 ÷ 6 = 9 saat, fiziğin payı 18 × 2 ÷ 6 = 6 saat, kimyanın payı 18 × 1 ÷ 6 = 3 saattir.",
      "Günlük karşılıklar sırasıyla 9 × 60 ÷ 6 = 90 dakika, 60 dakika ve 30 dakikadır. Toplamı 180 dakika, yani günlük 3 saatlik hedefin kendisidir. Öğrenci bu planı örneğin her gün matematik, gün aşırı fizik ve haftada üç gün kimya çalışacak biçimde takvime yerleştirebilir.",
    ] },
    { h: 'Ağırlıkları neye göre belirlemeli?', p: [
      "Ağırlık, bir derse ne kadar öncelik verdiğinizi gösteren serbest bir sayıdır. Bunu belirlerken üç ölçütü birlikte düşünmek işe yarar: dersin sınavdaki soru ya da puan payı, o dersteki mevcut seviyeniz ve konunun sizin için ne kadar zaman aldığı.",
    ], ul: [
      "<strong>Sınavdaki pay:</strong> Hazırlandığınız sınavda soru sayısı ya da katsayısı yüksek olan dersler daha büyük ağırlık alır.",
      "<strong>Eksiklik düzeyi:</strong> Denemelerde netinizin en düşük olduğu dersin ağırlığını bir kademe artırın.",
      "<strong>Getiri hızı:</strong> Kısa sürede net artışı sağlayabileceğiniz konuları öne almak motivasyonu yükseltir.",
      "<strong>Tekrar ihtiyacı:</strong> Ezbere dayalı derslere küçük ama düzenli bir pay ayırmak unutmayı azaltır.",
    ] },
    { h: 'Planı takvime yerleştirmek', p: [
      "Hesap size her dersin haftalık bütçesini verir; bunu günlere dağıtmak ise size kalır. Zor ve işlem ağırlıklı dersleri zihninizin en açık olduğu saatlere, okuma ve tekrar ağırlıklı dersleri daha yorgun olduğunuz saatlere koymak genellikle iyi sonuç verir. Aynı günde birbirine benzeyen iki dersi art arda çalışmak yerine sayısal ve sözel dersleri sırayla yerleştirmek dikkati daha uzun süre diri tutar.",
      "Bir derse tek seferde üç saat ayırmak yerine bu süreyi haftaya yayılmış üç oturuma bölmek, konuların akılda kalmasına yardımcı olur. Günlük oturumları mola aralarıyla bölmek isterseniz çıkan dakikaları pomodoro planı aracına aktarabilirsiniz.",
    ] },
    { h: 'Gerçekçi bir plan için öneriler', p: [
      "En sık yapılan hata, günlük süreyi olduğundan fazla yazmaktır. Okuldan dönüş, yemek, ulaşım ve dinlenme çıkarıldıktan sonra geriye kalan süreyi dürüstçe hesaplayın; uygulanabilir üç saat, kâğıt üzerinde kalan altı saatten daha değerlidir. İlk hafta planı uygulayıp gerçekte kaç saat çalışabildiğinizi görün ve değeri buna göre düzeltin.",
      "Haftada bir günü tamamen boş ya da yarı boş bırakmak, aksayan çalışmaları telafi etmek için bir tampon oluşturur. Ağırlıkları da sabit düşünmeyin: her deneme sınavından sonra sonuçlara bakıp gelişen dersin ağırlığını azaltmak, geride kalanınkini artırmak planı canlı tutar.",
    ] },
    { h: 'Sınırlar', p: [
      "Araç yalnızca süre paylaştırır; hangi konunun hangi gün çalışılacağına, okul ders programınıza ya da sınav tarihlerinize göre bir takvim oluşturmaz. Dersin sonuna yazılan son sayı ağırlık olarak okunur; adı sayıyla biten bir dersiniz varsa (örneğin Matematik 2) ağırlığı da ayrıca ekleyin: <code>Matematik 2 3</code>. En fazla 12 ders girilebilir ve her dersin adı farklı olmalıdır.",
    ] },
  ],
  faq: [
    ['Hangi derse kaç saat çalışmalıyım?', "Bunu sınavdaki payı ve sizin eksiğiniz belirler. Derslere önem sırasına göre ağırlık verin; araç haftalık sürenizi bu oranlarda böler. Örneğin 18 saatlik haftada 3-2-1 ağırlıkları 9, 6 ve 3 saat eder."],
    ['Ağırlık yazmazsam ne olur?', "Sayı eklenmeyen her dersin ağırlığı 1 kabul edilir. Hiçbir derse ağırlık yazmazsanız süre tüm derslere eşit paylaştırılır."],
    ['Ağırlıklar ondalıklı olabilir mi?', "Evet. 2,5 ya da 1,5 gibi değerler yazabilirsiniz. Önemli olan ağırlıkların birbirine oranıdır; toplamlarının belirli bir sayıya eşit olması gerekmez."],
    ['Günde kaç saat ders çalışmak yeterli?', "Herkes için geçerli tek bir sayı yoktur; sınıf düzeyi, hedef ve okul yükü belirleyicidir. Düzenli uygulanabilen makul bir süre, ara sıra yapılan çok uzun çalışmalardan daha verimlidir."],
    ['Günlük dakika değerini her gün uygulamak zorunda mıyım?', "Hayır. Bu değer haftalık payın günlere eşit bölünmüş karşılığıdır. Aynı toplamı haftada iki ya da üç daha uzun oturumla da tamamlayabilirsiniz."],
    ['Hafta sonu daha çok çalışıyorum, nasıl hesaplarım?', "Haftalık toplam saatinizi kendiniz toplayın ve gün sayısına bölerek ortalama günlük süreyi girin. Örneğin hafta içi 2, hafta sonu 5 saat çalışıyorsanız toplam 20 saat, yedi günlük ortalama yaklaşık 2,86 saattir."],
    ['Deneme çözme süresini plana nasıl eklerim?', "Denemeyi ayrı bir satır olarak yazıp ağırlık verebilirsiniz. Böylece deneme ve analiz için ayrılan süre de haftalık bütçenin içinde görünür."],
    ['Ders listem bir yere gönderiliyor mu?', "Hayır. Plan tarayıcınızda hesaplanır; yazdığınız dersler ve süreler sunucuya iletilmez, saklanmaz. Planı korumak için sonucu kopyalayıp kendi notlarınıza kaydedin."],
  ],
  related: ['pomodoro-plani-hesapla', 'konu-tekrar-plani', 'soru-dagilimi-hesapla', 'soru-cozme-hizi-hesapla', 'kitap-okuma-suresi-hesapla'],
};
