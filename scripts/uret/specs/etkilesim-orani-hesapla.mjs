export default {
  slug: 'etkilesim-orani-hesapla',
  title: 'Sosyal Medya Etkileşim Oranı Hesaplama',
  h1Tail: 'beğeni, yorum, paylaşım',
  pageTitle: 'Etkileşim Oranı Hesaplama – Sosyal Medya Engagement Rate',
  description: 'Beğeni, yorum, paylaşım ve kaydetme sayılarından sosyal medya etkileşim oranını hesaplayın; takipçi, erişim ya da gösterim bazında, tek gönderi ya da ortalama.',
  card: 'Beğeni, yorum, paylaşım ve kaydetmelerden etkileşim oranını takipçi, erişim ya da gösterime göre hesaplayın.',
  category: 'finans',
  keywords: ['etkileşim oranı hesaplama', 'engagement rate hesaplama', 'sosyal medya etkileşim oranı', 'instagram etkileşim oranı', 'etkileşim oranı nedir', 'etkileşim oranı formülü', 'influencer etkileşim oranı'],
  lead: `Bir gönderinin ya da hesabın etkileşim oranını hesaplayın. Araç beğeni, yorum, paylaşım ve kaydetme sayılarını toplar, <strong>toplam etkileşim ÷ kitle × 100</strong> formülüyle yüzdeye çevirir; kitleyi takipçi, erişim ya da gösterim olarak seçebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'begeni', label: 'Beğeni sayısı', type: 'number', placeholder: 'Örn. 450' },
    { id: 'yorum', label: 'Yorum sayısı', type: 'number', placeholder: 'Örn. 30', hint: 'Boş bırakılırsa 0 sayılır.' },
    { id: 'paylasim', label: 'Paylaşım sayısı', type: 'number', placeholder: 'Örn. 20', hint: 'Boş bırakılırsa 0 sayılır.' },
    { id: 'kaydetme', label: 'Kaydetme sayısı', type: 'number', placeholder: 'Örn. 0', hint: 'Boş bırakılırsa 0 sayılır.' },
    { id: 'taban', label: 'Hesap tabanı', type: 'select', options: [['takipci', 'Takipçi sayısına göre'], ['erisim', 'Erişime göre'], ['gosterim', 'Gösterime göre']] },
    { id: 'kitle', label: 'Takipçi / erişim / gösterim sayısı', type: 'number', placeholder: 'Örn. 10000', hint: 'Yukarıda seçtiğiniz tabana ait sayı.' },
    { id: 'gonderi', label: 'Gönderi sayısı', type: 'number', value: '1', hint: 'Birden çok gönderinin toplamını yazdıysanız adedini girin; ortalama hesaplanır.' },
  ],
  compute(v, h) {
    const adet = (s, ad) => {
      if (String(s ?? '').trim() === '') return 0;
      const n = h.int(s, ad);
      if (n < 0) h.err(`"${ad}" negatif olamaz.`);
      return n;
    };
    if (String(v.begeni ?? '').trim() === '') h.err('"Beğeni sayısı" alanını doldurun (beğeni yoksa 0 yazın).');
    const begeni = adet(v.begeni, 'Beğeni sayısı');
    const yorum = adet(v.yorum, 'Yorum sayısı');
    const paylasim = adet(v.paylasim, 'Paylaşım sayısı');
    const kaydetme = adet(v.kaydetme, 'Kaydetme sayısı');
    const adlar = { takipci: 'Takipçi sayısı', erisim: 'Erişim sayısı', gosterim: 'Gösterim sayısı' };
    const taban = adlar[v.taban] ? v.taban : 'takipci';
    const kitle = h.posint(v.kitle, adlar[taban]);
    const gonderi = String(v.gonderi ?? '').trim() === '' ? 1 : h.posint(v.gonderi, 'Gönderi sayısı');
    const toplam = begeni + yorum + paylasim + kaydetme;
    const ortalama = toplam / gonderi;
    const oran = ortalama / kitle * 100;
    const etiket = { takipci: 'takipçi', erisim: 'erişilen kişi', gosterim: 'gösterim' }[taban];
    const rows = [
      ['Etkileşim oranı', '%' + h.fmt(oran, 2)],
      ['Toplam etkileşim', h.fmt(toplam, 0)],
      ['Gönderi başına ortalama etkileşim', h.fmt(ortalama, 2)],
      [`1.000 ${etiket} başına etkileşim`, h.fmt(ortalama / kitle * 1000, 2)],
    ];
    const notlar = {
      takipci: 'Takipçi bazlı oran, hesapları birbiriyle kıyaslamak için kullanılır; gönderiyi kaç kişinin gördüğünü hesaba katmaz.',
      erisim: 'Erişim bazlı oran, gönderiyi gerçekten gören kişilerin ne kadarının tepki verdiğini gösterir ve içerik kalitesini ölçmek için uygundur.',
      gosterim: 'Gösterim bazlı oran, aynı kişinin birden çok görüntülemesini de saydığı için genellikle erişim bazlı orandan düşük çıkar.',
    };
    let note = notlar[taban];
    if (oran > 100) note += ' Oran %100\'ü aşıyor; kitle sayısını ve gönderi adedini kontrol edin.';
    return { rows, note };
  },
  cases: [
    { in: { begeni: '450', yorum: '30', paylasim: '20', kaydetme: '0', taban: 'takipci', kitle: '10000' }, out: { 'Etkileşim oranı': '%5', 'Toplam etkileşim': '500', '1.000 takipçi başına etkileşim': '50' } },
    { in: { begeni: '120', yorum: '15', paylasim: '5', kaydetme: '10', taban: 'erisim', kitle: '2500' }, out: { 'Etkileşim oranı': '%6', 'Toplam etkileşim': '150', '1.000 erişilen kişi başına etkileşim': '60' } },
    { in: { begeni: '2400', yorum: '300', paylasim: '200', kaydetme: '100', taban: 'takipci', kitle: '5000', gonderi: '10' }, out: { 'Etkileşim oranı': '%6', 'Toplam etkileşim': '3.000', 'Gönderi başına ortalama etkileşim': '300' } },
    { in: { begeni: '1234', yorum: '56', paylasim: '78', taban: 'gosterim', kitle: '45600' }, out: { 'Etkileşim oranı': '%3', 'Toplam etkileşim': '1.368', '1.000 gösterim başına etkileşim': '30' } },
    { in: { begeni: '90', yorum: '10', taban: 'takipci', kitle: '3000' }, out: { 'Etkileşim oranı': '%3,33', 'Toplam etkileşim': '100' } },
    { in: { begeni: '0', taban: 'takipci', kitle: '800' }, out: { 'Etkileşim oranı': '%0', 'Toplam etkileşim': '0' } },
    { in: { begeni: '450', yorum: '30', taban: 'takipci', kitle: '0' }, error: true },
    { in: { begeni: '', taban: 'takipci', kitle: '10000' }, error: true },
    { in: { begeni: '45,5', taban: 'takipci', kitle: '10000' }, error: true },
  ],
  howto: [
    `İncelemek istediğiniz gönderinin beğeni, yorum, paylaşım ve kaydetme sayılarını ilgili alanlara yazın. Platformda olmayan bir etkileşim türü varsa o alanı boş bırakın.`,
    `"Hesap tabanı" listesinden oranı neye göre hesaplayacağınızı seçin: takipçi sayısı herkese açık profillerde görülebilir; erişim ve gösterim ise yalnızca hesap sahibinin istatistik ekranında yer alır.`,
    `Seçtiğiniz tabana ait sayıyı "Takipçi / erişim / gösterim sayısı" alanına girin.`,
    `Tek gönderi için gönderi sayısını 1 bırakın. Son on gönderinin toplam etkileşimini yazdıysanız 10 girin; araç gönderi başına ortalamayı alır.`,
    `"Hesapla" düğmesine basın. İlk satır etkileşim oranını, diğerleri toplamı, ortalamayı ve bin kişi başına düşen etkileşimi gösterir.`,
  ],
  sections: [
    { h: 'Etkileşim oranı nedir?', p: [
      `Etkileşim oranı, bir içeriği gören ya da bir hesabı takip eden kitlenin ne kadarının o içeriğe tepki verdiğini gösteren yüzdedir. Takipçi sayısı bir hesabın büyüklüğünü, etkileşim oranı ise o kitlenin ne kadar canlı olduğunu anlatır. On bin takipçili ama gönderilerine kimsenin dokunmadığı bir hesap ile iki bin takipçili ama her gönderisi konuşulan bir hesap arasındaki farkı bu ölçü ortaya çıkarır.`,
      `Markalar iş birliği yapacakları içerik üreticilerini seçerken, sosyal medya yöneticileri hangi içerik türünün tuttuğunu anlamaya çalışırken, küçük işletmeler de kendi hesaplarının gidişatını izlerken bu orana bakar. Hesaplaması basittir ama hangi sayıların toplandığı ve neye bölündüğü sonucu ciddi biçimde değiştirir.`,
    ] },
    { h: 'Üç farklı hesap tabanı', p: [
      `Tek bir "resmî" formül yoktur; uygulamada üç yaklaşım kullanılır ve hangisini kullandığınızı belirtmeden paylaşılan bir oran yanıltıcı olabilir.`,
    ], ul: [
      `<strong>Takipçiye göre:</strong> etkileşim ÷ takipçi × 100. Dışarıdan bakan herkesin hesaplayabildiği tek yöntemdir; bu yüzden hesapları kıyaslamada ve iş birliği tekliflerinde en yaygın olanıdır.`,
      `<strong>Erişime göre:</strong> etkileşim ÷ gönderiyi gören tekil kişi sayısı × 100. Gönderi takipçilerin yalnızca bir kısmına gösterildiği için bu oran içeriğin gerçek başarısını daha iyi yansıtır.`,
      `<strong>Gösterime göre:</strong> etkileşim ÷ toplam görüntülenme × 100. Reklam raporlarında kullanılır; aynı kişinin tekrar görüntülemeleri paydada sayıldığından en düşük değeri bu yöntem verir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Tek gönderi, takipçi bazlı:</strong> 10.000 takipçili bir hesabın gönderisi 450 beğeni, 30 yorum ve 20 paylaşım almış olsun. Toplam etkileşim 450 + 30 + 20 = 500'dür. 500 ÷ 10.000 × 100 = %5 bulunur; yani her bin takipçiden 50'si gönderiye tepki vermiştir.`,
      `<strong>Tek gönderi, erişim bazlı:</strong> Aynı türden bir gönderi 2.500 kişiye ulaşmış, 120 beğeni, 15 yorum, 5 paylaşım ve 10 kaydetme almışsa toplam 150 etkileşim vardır. 150 ÷ 2.500 × 100 = %6 eder.`,
      `<strong>Hesap ortalaması:</strong> Son 10 gönderide toplam 2.400 beğeni, 300 yorum, 200 paylaşım ve 100 kaydetme toplanmış, takipçi sayısı 5.000 olsun. Toplam 3.000 etkileşim 10 gönderiye bölününce gönderi başına 300 eder; 300 ÷ 5.000 × 100 = %6 ortalama etkileşim oranı bulunur. Toplamı gönderi sayısına bölmeyi unutursanız %60 gibi gerçek dışı bir sonuç çıkar.`,
    ] },
    { h: 'Hangi etkileşimler sayılır?', p: [
      `Bu araç dört temel tepkiyi toplar: beğeni, yorum, paylaşım ve kaydetme. Platformdan platforma adlar değişir; yeniden paylaşım, alıntılama, gönderme gibi işlemleri paylaşım alanına ekleyebilirsiniz. Video izlenmesi, profil ziyareti ve bağlantı tıklaması gibi ölçüler bazı raporlarda etkileşime dahil edilir, bazılarında edilmez. Önemli olan, kıyasladığınız iki hesabı ya da iki dönemi aynı tanımla hesaplamaktır.`,
      `Tepkilerin ağırlığı da eşit değildir. Yorum yazmak ve içeriği birine göndermek beğenmekten daha fazla çaba ister; bu yüzden aynı orana sahip iki gönderiden yorumu ve paylaşımı çok olan genellikle daha değerli kabul edilir. Araç tümünü eşit sayar, yorumlamayı size bırakır.`,
    ] },
    { h: 'Sonucu yorumlarken', p: [
      `Hesap büyüdükçe takipçi bazlı oran çoğunlukla düşer; birkaç bin takipçili küçük hesapların oranı, yüz binlerce takipçili hesaplarınkinden yüksek olması olağandır. Platform, içerik türü ve sektör de sonucu etkiler. Bu nedenle sabit bir "iyi oran" eşiği vermek doğru olmaz; en sağlıklı kıyas, aynı hesabın önceki aylarıyla ya da benzer büyüklükte ve aynı alandaki hesaplarla yapılandır.`,
      `Olağan dışı yüksek bir oran her zaman iyi haber değildir. Çekiliş gönderileri, satın alınmış beğeniler ya da karşılıklı etkileşim grupları sayıları şişirebilir. Yorumların içeriğine ve takipçi artışının zamana yayılıp yayılmadığına bakmak, tek bir yüzdeden daha fazlasını söyler.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Birden çok gönderinin toplam etkileşimini yazıp gönderi sayısını 1 bırakmak.`,
      `Erişim bazlı hesap seçip kitle alanına takipçi sayısını yazmak; tabanla sayı aynı türden olmalıdır.`,
      `Eski bir gönderinin etkileşimini bugünkü takipçi sayısına bölmek; gönderi yayımlandığında takipçi çok daha azsa oran olduğundan düşük görünür.`,
      `Farklı tabanlarla hesaplanmış iki oranı birbiriyle kıyaslamak.`,
      `Araç yalnızca yazdığınız sayılarla hesap yapar; hesaba bağlanmaz, sahte etkileşimi ayırt edemez. Sonuçlar bilgilendirme amaçlıdır; reklam ve iş birliği bütçesi gibi mali kararları tek bir orana dayandırmayın.`,
    ] },
  ],
  faq: [
    ['Etkileşim oranı nasıl hesaplanır?', `Beğeni, yorum, paylaşım ve kaydetme sayıları toplanır, seçilen kitleye (takipçi, erişim ya da gösterim) bölünür ve 100 ile çarpılır. 500 etkileşim ve 10.000 takipçi için sonuç %5'tir.`],
    ['Takipçiye göre mi erişime göre mi hesaplamalıyım?', `Başka hesapları dışarıdan değerlendiriyorsanız yalnızca takipçi sayısını görebildiğiniz için takipçi bazlı yöntemi kullanırsınız. Kendi içeriklerinizin başarısını ölçüyorsanız erişim bazlı oran daha doğru bilgi verir, çünkü gönderiyi hiç görmemiş takipçileri hesaba katmaz.`],
    ['İyi bir etkileşim oranı kaçtır?', `Platforma, hesap büyüklüğüne ve sektöre göre çok değiştiği için tek bir eşik vermek yanıltıcıdır. Küçük hesaplarda oran genellikle daha yüksek, büyük hesaplarda daha düşüktür. Kendi geçmiş ortalamanızı ve benzer hesapları ölçüt alın.`],
    ['Kaydetme ve paylaşım hesaba katılmalı mı?', `Bu sayıları görebiliyorsanız katmanız önerilir, çünkü içeriğin faydalı bulunduğunu gösteren güçlü işaretlerdir. Başka bir hesabı değerlendirirken bu veriler görünmediği için yalnızca beğeni ve yorumla hesap yapılır; kıyaslarken iki tarafta aynı kalemleri kullanın.`],
    ['Bir hesabın ortalama etkileşim oranını nasıl bulurum?', `Son 10 ya da 12 gönderinin etkileşimlerini toplayıp ilgili alanlara yazın ve gönderi sayısı alanına adedi girin. Araç toplamı gönderi sayısına böler, ortalamayı kitleye oranlar.`],
    ['Oran neden %100\'den büyük çıktı?', `Çoğunlukla birden fazla gönderinin toplamı girilip gönderi sayısı 1 bırakıldığında ya da kitle alanına eksik bir sayı yazıldığında olur. Takipçi olmayan çok sayıda kişiye ulaşan viral gönderilerde takipçi bazlı oran gerçekten de çok yüksek çıkabilir.`],
    ['Video izlenmeleri etkileşim sayılır mı?', `Tanıma göre değişir. Bu araç izlenmeyi ayrı bir kalem olarak saymaz; isterseniz gösterim tabanını seçip izlenme sayısını kitle alanına yazarak izleyenlerin ne kadarının tepki verdiğini hesaplayabilirsiniz.`],
    ['Girdiğim hesap bilgileri bir yere aktarılıyor mu?', `Hayır. Araç kullanıcı adı ya da hesap bağlantısı istemez; yalnızca yazdığınız sayılarla tarayıcınızın içinde hesap yapar. Hiçbir veri sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['tiklama-orani-hesapla', 'donusum-orani-hesapla', 'bin-gosterim-maliyeti-hesapla', 'tiklama-basi-maliyet-hesapla', 'reklam-getirisi-hesapla'],
};
