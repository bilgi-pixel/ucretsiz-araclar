export default {
  slug: 'sinif-ortalamasi-hesapla',
  title: 'Sınıf Ortalaması Hesaplama',
  h1Tail: 'ortalama, ortanca ve başarı oranı',
  pageTitle: "Sınıf Ortalaması Hesaplama – Not Ortalaması, Ortanca, Başarı Oranı",
  description: "Öğrenci notlarını yapıştırın; sınıf ortalamasını, en yüksek ve en düşük notu, ortancayı, standart sapmayı ve geçme notuna göre başarı oranını hesaplayın.",
  card: "Sınıfın notlarını yazın; ortalamayı, ortancayı, standart sapmayı ve geçen öğrenci oranını tek seferde görün.",
  category: 'egitim',
  keywords: ['sınıf ortalaması hesaplama', 'not ortalaması hesaplama', 'sınav ortalaması', 'sınıf başarı oranı', 'standart sapma not', 'ortanca not', 'sınav analizi'],
  lead: "Bir sınavdan alınan notları boşlukla ya da alt alta yazın. Araç <strong>sınıf ortalamasını</strong>, en yüksek ve en düşük notu, ortancayı, standart sapmayı ve belirlediğiniz geçme notuna göre kaç öğrencinin başarılı olduğunu hesaplar.",
  button: 'Hesapla',
  inputs: [
    { id: 'notlar', label: 'Notlar', type: 'textarea', wide: true, placeholder: '70 80 90 55 62', hint: 'Notları boşlukla, satır sonuyla ya da noktalı virgülle ayırın. Ondalık için virgül kullanabilirsiniz.' },
    { id: 'gecme', label: 'Geçme notu', type: 'number', value: '50' },
  ],
  compute(v, h) {
    const x = h.nums(v.notlar, 'Notlar');
    if (x.some((n) => n < 0)) h.err('Notlar negatif olamaz; listeyi kontrol edin.');
    const gecme = h.nonneg(v.gecme, 'Geçme notu');
    const n = x.length;
    const ort = x.reduce((a, b) => a + b, 0) / n;
    const sirali = [...x].sort((a, b) => a - b);
    const ortanca = n % 2 ? sirali[(n - 1) / 2] : (sirali[n / 2 - 1] + sirali[n / 2]) / 2;
    const ss = Math.sqrt(x.reduce((a, b) => a + (b - ort) * (b - ort), 0) / n);
    const gecen = x.filter((k) => k >= gecme - 1e-9).length;
    return {
      rows: [
        ['Sınıf ortalaması', h.fmt(ort, 2)],
        ['Öğrenci sayısı', `${n}`],
        ['En yüksek not', h.fmt(sirali[n - 1], 2)],
        ['En düşük not', h.fmt(sirali[0], 2)],
        ['Ortanca (medyan)', h.fmt(ortanca, 2)],
        ['Standart sapma', h.fmt(ss, 2)],
        ['Geçen öğrenci', `${gecen} / ${n}`],
        ['Başarı oranı', `%${h.fmt((gecen / n) * 100, 2)}`],
        ['Ortalamanın üstündeki öğrenci', `${x.filter((k) => k > ort + 1e-9).length}`],
      ],
      note: 'Standart sapma, tüm sınıf girildiği varsayımıyla n\'e bölünerek (kitle formülü) hesaplanır.',
    };
  },
  cases: [
    { in: { notlar: '70 80 90', gecme: '50' }, out: { 'Sınıf ortalaması': '80', 'Öğrenci sayısı': '3', 'En yüksek not': '90', 'En düşük not': '70', 'Ortanca (medyan)': '80', 'Standart sapma': '8,16', 'Başarı oranı': '%100' } },
    { in: { notlar: '40 55 60 75 90 100', gecme: '50' }, out: { 'Sınıf ortalaması': '70', 'Ortanca (medyan)': '67,5', 'Standart sapma': '20,62', 'Geçen öğrenci': '5 / 6', 'Başarı oranı': '%83,33', 'Ortalamanın üstündeki öğrenci': '3' } },
    { in: { notlar: '2\n4\n4\n4\n5\n5\n7\n9', gecme: '5' }, out: { 'Sınıf ortalaması': '5', 'Standart sapma': '2', 'Ortanca (medyan)': '4,5', 'Geçen öğrenci': '4 / 8', 'Başarı oranı': '%50' } },
    { in: { notlar: '50', gecme: '50' }, out: { 'Sınıf ortalaması': '50', 'Standart sapma': '0', 'Geçen öğrenci': '1 / 1' } },
    { in: { notlar: '85,5; 90,5', gecme: '60' }, out: { 'Sınıf ortalaması': '88', 'Standart sapma': '2,5', 'En düşük not': '85,5' } },
    { in: { notlar: '30 45 49', gecme: '50' }, out: { 'Sınıf ortalaması': '41,33', 'Geçen öğrenci': '0 / 3', 'Başarı oranı': '%0' } },
    { in: { notlar: '', gecme: '50' }, error: true },
    { in: { notlar: '70 abc 90', gecme: '50' }, error: true },
    { in: { notlar: '70 -5 90', gecme: '50' }, error: true },
  ],
  howto: [
    "Sınav notlarını <strong>Notlar</strong> kutusuna yazın ya da tablonuzdaki not sütununu kopyalayıp yapıştırın; her satırda bir not olması yeterlidir.",
    "<strong>Geçme notu</strong> alanına başarı sınırını girin. 100 üzerinden değerlendirmede çoğunlukla 50 kullanılır; kendi sınırınız farklıysa onu yazın.",
    "Hesapla düğmesine basın. İlk satırda sınıf ortalaması, altında dağılımı özetleyen diğer ölçüler görünür.",
    "Sonuçları kopyalayarak sınav analiz raporunuza, zümre tutanağınıza ya da veli bilgilendirme notunuza ekleyebilirsiniz.",
  ],
  sections: [
    { h: 'Sınıf ortalaması nasıl hesaplanır?', p: [
      "Sınıf ortalaması, tüm öğrencilerin notlarının toplanıp öğrenci sayısına bölünmesiyle bulunan aritmetik ortalamadır: <strong>ortalama = notların toplamı ÷ öğrenci sayısı</strong>. Her öğrencinin notu eşit ağırlık taşır; sınava girmeyen öğrenciler listeye yazılmadığı sürece hesaba katılmaz.",
      "Ortalama tek başına bir sınıfı anlatmaya yetmez. İki sınıfın ortalaması aynı 70 olabilir; birinde herkes 65 ile 75 arasında not almıştır, diğerinde notlar 30 ile 100 arasına yayılmıştır. Bu yüzden araç ortalamanın yanında dağılımı gösteren ölçüleri de verir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Altı öğrencinin notları 40, 55, 60, 75, 90 ve 100 olsun. Toplam 420, öğrenci sayısı 6 olduğundan ortalama 420 ÷ 6 = 70 çıkar. Notlar sıralandığında ortadaki iki değer 60 ve 75'tir; ortanca bunların ortalaması olan 67,5'tir.",
      "Standart sapma için her notun ortalamadan farkının karesi alınır: 900, 225, 100, 25, 400 ve 900. Toplamı 2550'dir; 6'ya bölününce 425 elde edilir ve karekökü yaklaşık 20,62'dir. Geçme notu 50 kabul edilirse yalnızca 40 alan öğrenci başarısızdır; 6 öğrenciden 5'i geçer ve başarı oranı %83,33 olur. Ortalamanın üzerinde not alan öğrenci sayısı ise 3'tür.",
    ] },
    { h: 'Ortanca ile ortalama arasındaki fark', p: [
      "Ortanca, notlar küçükten büyüğe sıralandığında tam ortada kalan değerdir; öğrenci sayısı çiftse ortadaki iki notun ortalaması alınır. Sınıfın yarısı ortancanın altında, yarısı üstünde not almıştır.",
      "Ortalama uç değerlerden etkilenir, ortanca etkilenmez. Sınıfta sıfır alan birkaç öğrenci varsa ortalama belirgin biçimde düşer, ortanca ise yerinde kalır. Ortalama ortancadan epey düşükse birkaç çok düşük not genel tabloyu aşağı çekiyor demektir; tersi durumda birkaç çok yüksek not ortalamayı yukarı taşımaktadır. İki değerin birbirine yakın olması, notların ortalama etrafında dengeli dağıldığını gösterir.",
    ] },
    { h: 'Standart sapma ne anlatır?', p: [
      "Standart sapma, notların ortalamadan ortalama olarak ne kadar uzaklaştığını gösterir. Küçük bir standart sapma sınıfın birbirine yakın düzeyde olduğunu, büyük bir standart sapma ise öğrenciler arasında ciddi seviye farkı bulunduğunu belirtir. Aynı ortalamaya sahip iki şubeyi karşılaştırırken bu değer, hangi şubede bireysel destek ihtiyacının daha fazla olduğuna dair fikir verir.",
      "Araç, girilen notların sınıfın tamamı olduğunu kabul eder ve kareler toplamını öğrenci sayısına böler. Notlar daha büyük bir gruptan alınmış bir örneklemse istatistikte öğrenci sayısının bir eksiğine bölünen örneklem formülü kullanılır ve sonuç biraz daha büyük çıkar. Sınıf içi analizde yaygın uygulama burada kullanılan kitle formülüdür.",
    ] },
    { h: 'Sonuçları sınıf içinde kullanmak', ul: [
      "<strong>Sınavın zorluğunu değerlendirin.</strong> Ortalama beklenenden çok düşükse sorular kazanımların üzerinde olabilir; çok yüksekse ayırt edicilik zayıf kalmış olabilir.",
      "<strong>Başarı oranını izleyin.</strong> Aynı dersin dönem içindeki sınavlarında geçen öğrenci oranını karşılaştırmak, öğretimin etkisini ortalamadan daha açık gösterebilir.",
      "<strong>Uç notlara bakın.</strong> En düşük notların sahibi öğrenciler için ek çalışma, en yüksek notların sahipleri için zenginleştirme etkinliği planlanabilir.",
      "<strong>Şubeleri kıyaslarken dikkatli olun.</strong> Öğrenci sayısı az olan şubede tek bir not ortalamayı fazla oynatır.",
      "<strong>Öğrenci kendi yerini görebilir.</strong> Notunu sınıf ortalaması ve ortancayla kıyaslayan öğrenci, sınıfın hangi yarısında olduğunu anlar.",
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      "Araç notların hangi puan sisteminde olduğunu sormaz; 100'lük, 10'luk ya da 5'lik sistemde girilen notlar aynı biçimde işlenir. Geçme notunu kullandığınız sisteme uygun girmeniz yeterlidir. Geçme notuna tam eşit olan öğrenci başarılı sayılır.",
      "Kurumunuzun başarı değerlendirmesinde ağırlıklı ortalama, performans notu ya da proje katkısı gibi ek ölçütler varsa resmî sonuç bu sayfadaki sade ortalamadan farklı olabilir. Karne ve geçme kararlarında okulunuzun bağlı olduğu güncel yönetmeliği esas alın.",
    ] },
  ],
  faq: [
    ['Sınıf ortalaması nasıl bulunur?', "Tüm notlar toplanır ve öğrenci sayısına bölünür. Örneğin 70, 80 ve 90 notlarının toplamı 240'tır; üç öğrenciye bölündüğünde sınıf ortalaması 80 olur."],
    ['Sınava girmeyen öğrenciyi nasıl yazmalıyım?', "Sınava girmeyen öğrenciyi ortalamaya katmak istemiyorsanız listeye yazmayın. Sıfır olarak yazarsanız ortalamayı düşürür; hangisinin uygun olduğu kurumunuzun değerlendirme kuralına bağlıdır."],
    ['Ortanca neden ortalamadan farklı çıkıyor?', "Ortalama tüm notların büyüklüğünden, ortanca yalnızca sıralamadan etkilenir. Çok düşük ya da çok yüksek birkaç not ortalamayı kaydırır ama ortancayı değiştirmez; bu yüzden iki değer ayrışabilir."],
    ['Standart sapma kaç olmalı?', "İdeal bir değer yoktur. Değer küçüldükçe sınıfın düzeyi birbirine yaklaşır, büyüdükçe öğrenciler arası fark artar. Yorum yaparken notların hangi puan aralığında olduğunu da dikkate alın."],
    ['Başarı oranı nasıl hesaplanıyor?', "Geçme notuna eşit ya da ondan yüksek not alan öğrencilerin sayısı toplam öğrenci sayısına bölünür ve 100 ile çarpılır. Altı öğrenciden beşi geçtiyse oran %83,33'tür."],
    ['Kaç not girebilirim?', "Pratikte bir sınıfın ya da birkaç şubenin tüm notlarını rahatlıkla girebilirsiniz; yüzlerce not sorunsuz işlenir. Notları tablonuzdan sütun olarak kopyalayıp yapıştırmanız yeterlidir."],
    ['Ondalıklı notları nasıl yazmalıyım?', "Ondalık ayırıcı olarak virgül kullanın, örneğin 85,5. Notları birbirinden boşluk, satır sonu ya da noktalı virgülle ayırın; virgül ayırıcı olarak kullanılmaz."],
    ['Öğrenci notları bir yere kaydediliyor mu?', "Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız notlar sunucuya gönderilmez ve saklanmaz. Öğrenci adı girmeniz de gerekmez, yalnızca sayılar yeterlidir."],
  ],
  related: ['t-skoru-hesapla', 'can-egrisi-hesapla', 'basari-yuzdesi-hesapla', 'sinav-notu-hesapla', 'kredili-ortalama-hesapla'],
};
