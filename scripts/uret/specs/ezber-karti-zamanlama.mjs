export default {
  slug: 'ezber-karti-zamanlama',
  title: 'Ezber Kartı Tekrar Tarihleri Hesaplama',
  h1Tail: 'büyüyen aralıklarla',
  pageTitle: 'Ezber Kartı Tekrar Tarihleri Hesaplama – Flashcard Zamanlama',
  description: 'Ezber kartlarınız için tekrar aralıklarını kolaylık çarpanıyla büyütün; her tekrarın tarihini, gün adını ve aralığını listeleyen ücretsiz hesaplama aracı.',
  card: 'Ezber kartı (flashcard) tekrarlarının tarihlerini, kolaylık çarpanıyla büyüyen aralıklara göre hesaplayın.',
  category: 'egitim',
  keywords: ['ezber kartı tekrar tarihleri', 'flashcard zamanlama', 'aralıklı tekrar algoritması', 'kolaylık çarpanı', 'kelime kartı tekrar', 'ezber kartı aralık hesaplama', 'kelime ezberleme takvimi'],
  lead: 'Bir ezber kartını ilk öğrendiğiniz tarihi ve kolaylık çarpanını girin; araç, her doğru hatırlamada aralığın çarpanla büyüdüğü yaygın zamanlama yöntemine göre <strong>sonraki tekrar tarihlerini</strong> hesaplasın.',
  button: 'Tarihleri hesapla',
  inputs: [
    { id: 'ilk', label: 'İlk öğrenme tarihi (boş = bugün)', type: 'date' },
    { id: 'a1', label: 'Birinci aralık (gün)', type: 'number', value: '1' },
    { id: 'a2', label: 'İkinci aralık (gün)', type: 'number', value: '6' },
    { id: 'carpan', label: 'Kolaylık çarpanı', type: 'number', value: '2,5', hint: '1,3 ile 5 arasında. Zor kartlar için düşük, kolay kartlar için yüksek.' },
    { id: 'adet', label: 'Tekrar sayısı', type: 'number', value: '6', hint: 'En fazla 15.' },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.ilk, 'İlk öğrenme tarihi');
    const a1 = h.posint(v.a1, 'Birinci aralık');
    const a2 = h.posint(v.a2, 'İkinci aralık');
    const ef = h.num(v.carpan, 'Kolaylık çarpanı');
    const adet = h.posint(v.adet, 'Tekrar sayısı');
    if (a1 > 365 || a2 > 365) h.err('İlk iki aralık 365 günden uzun olamaz.');
    if (a2 < a1) h.err('İkinci aralık birinci aralıktan kısa olamaz.');
    if (ef < 1.3 - 1e-9 || ef > 5 + 1e-9) h.err('Kolaylık çarpanı 1,3 ile 5 arasında olmalı (yaygın başlangıç değeri 2,5).');
    if (adet > 15) h.err('Tekrar sayısı en fazla 15 olabilir.');
    const rows = [];
    const araliklar = [];
    let onceki = 0, toplam = 0;
    for (let i = 1; i <= adet; i++) {
      let ar;
      if (i === 1) ar = a1;
      else if (i === 2) ar = a2;
      else ar = Math.max(onceki + 1, Math.round(onceki * ef + 1e-9));
      if (toplam + ar > 36500) h.err('Aralıklar 100 yılı aşıyor; tekrar sayısını ya da çarpanı küçültün.');
      toplam += ar;
      onceki = ar;
      araliklar.push(ar);
      const d = h.gunEkle(ilk, toplam);
      rows.push([`${i}. tekrar`, `${h.fmtDate(d)} ${h.gunAdi(d)} (aralık ${h.fmt(ar, 0)} gün)`]);
    }
    rows.push(['Son tekrara kadar geçen süre', h.fmt(toplam, 0) + ' gün']);
    rows.push(['Aralık dizisi', araliklar.join(', ') + ' gün']);
    return { rows, note: 'Tarihler, kartı her tekrarda doğru hatırladığınız varsayımıyla hesaplanır. Hatırlayamadığınız kartı o günü ilk öğrenme tarihi kabul ederek yeniden zamanlayın.' };
  },
  cases: [
    { in: { ilk: '01.01.2026', a1: '1', a2: '6', carpan: '2,5', adet: '6' }, out: { '1. tekrar': '02.01.2026 Cuma (aralık 1 gün)', '2. tekrar': '08.01.2026 Perşembe (aralık 6 gün)', '3. tekrar': '23.01.2026 Cuma (aralık 15 gün)', '4. tekrar': '02.03.2026 Pazartesi (aralık 38 gün)', '5. tekrar': '05.06.2026 Cuma (aralık 95 gün)', '6. tekrar': '29.01.2027 Cuma (aralık 238 gün)', 'Son tekrara kadar geçen süre': '393 gün' } },
    { in: { ilk: '01.03.2026', a1: '1', a2: '3', carpan: '2', adet: '5' }, out: { '3. tekrar': '11.03.2026 Çarşamba (aralık 6 gün)', '4. tekrar': '23.03.2026 Pazartesi (aralık 12 gün)', '5. tekrar': '16.04.2026 Perşembe (aralık 24 gün)', 'Aralık dizisi': '1, 3, 6, 12, 24 gün' } },
    { in: { ilk: '01.01.2026', a1: '1', a2: '6', carpan: '1,3', adet: '4' }, out: { '3. tekrar': '16.01.2026 Cuma (aralık 8 gün)', '4. tekrar': '26.01.2026 Pazartesi (aralık 10 gün)', 'Son tekrara kadar geçen süre': '25 gün' } },
    { in: { ilk: '2026-01-01', a1: '1', a2: '6', carpan: '2,5', adet: '1' }, out: { '1. tekrar': '02.01.2026 Cuma (aralık 1 gün)', 'Son tekrara kadar geçen süre': '1 gün' } },
    { in: { ilk: '10.10.2026', a1: '2', a2: '5', carpan: '2,5', adet: '2' }, out: { '1. tekrar': '12.10.2026 Pazartesi (aralık 2 gün)', '2. tekrar': '17.10.2026 Cumartesi (aralık 5 gün)' } },
    { in: { ilk: '01.01.2026', a1: '1', a2: '6', carpan: '1', adet: '6' }, error: true },
    { in: { ilk: '01.01.2026', a1: '1', a2: '6', carpan: '2,5', adet: '0' }, error: true },
    { in: { ilk: '01.01.2026', a1: '6', a2: '1', carpan: '2,5', adet: '4' }, error: true },
  ],
  howto: [
    'Kartı ilk kez öğrendiğiniz tarihi seçin; boş bırakırsanız bugün kabul edilir.',
    'İlk iki aralığı gün olarak yazın. Varsayılan değerler ilk tekrar için 1 gün, ikinci tekrar için 6 gündür.',
    'Kolaylık çarpanını girin. Emin değilseniz 2,5 ile başlayın; kartı zor buluyorsanız 1,5–2 arası bir değer seçin.',
    'Kaç tekrar ileriye bakmak istediğinizi yazıp "Tarihleri hesapla" düğmesine basın.',
    'Çıkan tarihleri kartın arkasına, kutunuzun bölmesine ya da ajandanıza not edin.',
  ],
  sections: [
    { h: 'Ezber kartı zamanlaması nasıl çalışır?', p: [
      'Ezber kartı (flashcard), bir yüzünde soru ya da kelime, diğer yüzünde yanıt bulunan küçük çalışma kartıdır. Kartın asıl gücü, ne zaman yeniden görüldüğündedir. Bir kartı tam unutmak üzereyken hatırlamaya çalışmak belleği en çok güçlendiren andır; çok erken tekrar zaman kaybıdır, çok geç tekrar ise bilgiyi baştan öğrenmek demektir.',
      'Yaygın zamanlama yöntemleri bu dengeyi <strong>büyüyen aralıklarla</strong> kurar. İlk tekrar bir gün sonra, ikinci tekrar birkaç gün sonra yapılır; sonrasında her doğru hatırlamada aralık, kolaylık çarpanı denen bir sayıyla çarpılarak uzar. Böylece iyi bilinen kart birkaç tekrardan sonra aylar sonraya ertelenir ve günlük tekrar yükü küçük kalır.',
    ] },
    { h: 'Hesap kuralı', p: [
      'Araç şu kuralı uygular: birinci aralık ve ikinci aralık sizin yazdığınız değerlerdir. Üçüncü tekrardan itibaren <strong>yeni aralık = önceki aralık × kolaylık çarpanı</strong> hesaplanır ve en yakın tam güne yuvarlanır. Her tekrarın tarihi, bir önceki tekrar tarihine o aralığın eklenmesiyle bulunur; yani aralıklar ilk öğrenme gününden değil, bir önceki tekrardan itibaren sayılır.',
      'Varsayılan 1 gün, 6 gün ve 2,5 değerleri, 1980\'lerin sonunda geliştirilen ve bugün birçok kart uygulamasının temelini oluşturan SM-2 adlı yöntemin başlangıç değerleridir. O yöntemde çarpan 1,3\'ün altına indirilmez; araç da aynı alt sınırı kullanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '1 Ocak 2026 Perşembe günü öğrenilen bir kart için varsayılan ayarlarla aralık dizisi 1, 6, 15, 38, 95 ve 238 gün olur. Üçüncü aralık 6 × 2,5 = 15, dördüncü aralık 15 × 2,5 = 37,5 olup 38\'e yuvarlanır, beşinci aralık 38 × 2,5 = 95, altıncı aralık 95 × 2,5 = 237,5 olup 238\'e yuvarlanır.',
      'Tarihler sırasıyla 2 Ocak, 8 Ocak, 23 Ocak, 2 Mart, 5 Haziran 2026 ve 29 Ocak 2027\'dir. Yani kart altı kez doğru hatırlandığında toplam 393 günlük, bir yılı aşan bir süre yalnızca altı kısa bakışla kapsanmış olur.',
      'Çarpanı 1,3\'e indirirseniz aynı kart için dizi 1, 6, 8, 10 gün olur ve dört tekrar 25 güne sığar. Zor kartlarda aralıkların bu kadar yavaş açılması, kartın daha sık karşınıza çıkmasını sağlar.',
    ] },
    { h: 'Kolaylık çarpanını seçmek', ul: [
      '<strong>2,5</strong>: yeni kartlar için alışılmış başlangıç değeri. Aralıklar her tekrarda iki buçuk katına çıkar.',
      '<strong>2,0</strong>: orta zorlukta kartlar. Aralıklar her seferinde ikiye katlanır; hesabı akıldan yapmak da kolaydır.',
      '<strong>1,3 – 1,7</strong>: sürekli karıştırdığınız, zor kartlar. Aralık yavaş büyür.',
      '<strong>3 ve üzeri</strong>: çok kolay bulduğunuz kartlar. Aralık hızla aylara çıkar; sınav yakınsa önerilmez.',
    ] },
    { h: 'Kâğıt kartlarla uygulama', p: [
      'Uygulama kullanmadan, kâğıt kartlarla çalışanlar için en pratik yöntem kartın arkasına sıradaki tekrar tarihini kurşun kalemle yazmaktır. Her gün yalnızca tarihi gelmiş kartlar ele alınır. Kartı doğru hatırladıysanız listedeki bir sonraki tarihi yazarsınız; hatırlayamadıysanız kart başa döner ve bir gün sonrasına tarihlenir.',
      'Bölmeli kutu kullananlar için her bölme bir aralığa karşılık gelebilir: birinci bölme her gün, ikinci bölme haftada bir, üçüncü bölme iki haftada bir gibi. Bu sayfadaki aralık dizisi, bölmelere hangi sıklığı vereceğinizi belirlemenize yardımcı olur.',
    ] },
    { h: 'İyi kart hazırlamanın kuralları', ul: [
      'Her karta tek bir bilgi yazın. Bir kartta beş madde varsa birini unutmak kartın tamamını yanlış saymanıza yol açar.',
      'Yabancı dil kartlarında kelimeyi tek başına değil, kısa bir örnek cümleyle yazın.',
      'Yanıtı görmeden önce mutlaka içinizden ya da sesli olarak söyleyin; "biliyordum" hissi yanıltıcıdır.',
      'Anlamadığınız bir bilgiyi karta dökmeyin. Kart ezberi pekiştirir, anlamanın yerini tutmaz.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç, her tekrarda kartı doğru hatırladığınızı ve çarpanın sabit kaldığını varsayar. Gerçek kart uygulamaları her yanıttan sonra çarpanı performansınıza göre artırıp azaltır ve yanlış yanıtta kartı başa alır; bu sayfa o uyarlamayı yapmaz, yalnızca ideal durumdaki takvimi gösterir. Sınav tarihi yakınsa uzun aralıklar sınavın ötesine düşebilir; bu durumda sabit günlere dayalı aralıklı tekrar planı daha uygun olabilir.',
    ] },
  ],
  faq: [
    ['Kolaylık çarpanı nedir?', 'Her doğru hatırlamadan sonra tekrar aralığının kaç katına çıkacağını belirleyen sayıdır. Çarpan 2,5 ise 6 günlük aralıktan sonraki aralık 15 gün olur. Zor kartlarda çarpan düşük, kolay kartlarda yüksek tutulur.'],
    ['Neden ilk aralık 1, ikinci aralık 6 gün?', 'Bu değerler yaygın bir zamanlama yönteminin başlangıç değerleridir ve varsayılan olarak gelir. Değiştirebilirsiniz; örneğin yoğun bir sınav döneminde 1 ve 3 gün yazarak tekrarları sıklaştırabilirsiniz.'],
    ['Kartı hatırlayamazsam ne yapmalıyım?', 'Kart baştan öğrenilmiş sayılır. Hatırlayamadığınız günü ilk öğrenme tarihi olarak girip tarihleri yeniden hesaplayın; isterseniz çarpanı da biraz düşürün.'],
    ['Aralıklar neye göre sayılıyor?', 'Her aralık bir önceki tekrar tarihinden itibaren sayılır. İlk aralık ise ilk öğrenme tarihinden başlar. Sonuçtaki "Son tekrara kadar geçen süre" satırı tüm aralıkların toplamını verir.'],
    ['Küsuratlı aralıklar nasıl yuvarlanıyor?', 'Çarpım sonucu en yakın tam güne yuvarlanır; buçuklu değerler yukarı tamamlanır. Örneğin 15 × 2,5 = 37,5 gün, 38 gün olarak alınır. Aralık her tekrarda en az bir gün büyür.'],
    ['Bu yöntem yalnızca kelime ezberi için mi?', 'Hayır. Tarihler, formüller, tanımlar, hukuk maddeleri, tıp terimleri, başkentler gibi soru-yanıt biçimine dökülebilen her bilgi için kullanılabilir.'],
    ['Bu araç ile aralıklı tekrar planı aracı arasındaki fark nedir?', 'Aralıklı tekrar planında günleri kendiniz sabit bir liste olarak verirsiniz ve hepsi ilk çalışmadan sayılır. Burada ise aralıklar bir kurala göre kendiliğinden büyür ve her biri önceki tekrardan itibaren sayılır.'],
    ['Girdiğim tarihler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir bilgi sunucuya gönderilmez. Sayfayı kapatınca sonuç silinir, bu yüzden tarihleri kopyalayıp saklayın.'],
  ],
  related: ['konu-tekrar-plani', 'ders-calisma-plani-hesapla', 'pomodoro-plani-hesapla', 'soru-dagilimi-hesapla', 'kitap-okuma-suresi-hesapla'],
};
