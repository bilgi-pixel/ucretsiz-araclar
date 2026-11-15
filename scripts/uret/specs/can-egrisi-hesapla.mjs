export default {
  slug: 'can-egrisi-hesapla',
  title: 'Çan Eğrisi Notu Hesaplama',
  h1Tail: 'bağıl değerlendirme',
  pageTitle: "Çan Eğrisi Notu Hesaplama – Bağıl Değerlendirme ve Harf Notu",
  description: "Notunuzu, sınıf ortalamasını ve standart sapmayı girin; çan eğrisindeki yerinizi, Z ve T skorunuzu, yüzdelik diliminizi ve örnek harf notu karşılığını görün.",
  card: "Notunuzu, sınıf ortalamasını ve standart sapmayı yazın; çan eğrisindeki yerinizi ve örnek harf notunu görün.",
  category: 'egitim',
  keywords: ['çan eğrisi hesaplama', 'bağıl değerlendirme hesaplama', 'çan eğrisi harf notu', 'bağıl not hesaplama', 'çan sistemi', 'z skoru harf notu', 'üniversite çan eğrisi'],
  lead: "Sınavdan aldığınız notu, sınıf ortalamasını ve standart sapmayı girin. Araç notunuzun ortalamadan kaç standart sapma uzakta olduğunu bulur, sınıfın yüzde kaçını geride bıraktığınızı tahmin eder ve <strong>örnek bir bağıl değerlendirme ölçeğine</strong> göre harf notu karşılığını gösterir.",
  button: 'Hesapla',
  inputs: [
    { id: 'puan', label: 'Notunuz', type: 'number', placeholder: 'Örn. 70' },
    { id: 'ortalama', label: 'Sınıf ortalaması', type: 'number', placeholder: 'Örn. 60' },
    { id: 'sapma', label: 'Standart sapma', type: 'number', placeholder: 'Örn. 10', hint: 'Bilmiyorsanız sınıf notlarından sınıf ortalaması aracıyla bulabilirsiniz.' },
  ],
  compute(v, h) {
    const puan = h.num(v.puan, 'Notunuz');
    const ort = h.num(v.ortalama, 'Sınıf ortalaması');
    const ss = h.pos(v.sapma, 'Standart sapma');
    const z = (puan - ort) / ss;
    // Standart normal birikimli dağılım: seri açılımı (|z| ≤ 8 için çift duyarlıkta)
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
    const olcek = [[1.5, 'AA'], [1, 'BA'], [0.5, 'BB'], [0, 'CB'], [-0.5, 'CC'], [-1, 'DC'], [-1.5, 'DD']];
    let harf = 'FF';
    for (const [alt, ad] of olcek) { if (z >= alt - 1e-9) { harf = ad; break; } }
    const yuzde = phi(z) * 100;
    const konum = Math.abs(z) < 1e-9 ? 'Tam ortalamada'
      : `Ortalamanın ${h.fmt(Math.abs(z), 2)} standart sapma ${z > 0 ? 'üstünde' : 'altında'}`;
    return {
      rows: [
        ['Örnek harf notu', harf],
        ['Z skoru', h.fmt(z, 2)],
        ['T skoru', h.fmt(50 + 10 * z, 2)],
        ['Geride bırakılan öğrenci oranı', `%${h.fmt(yuzde, 2)}`],
        ['Konum', konum],
      ],
      note: 'Harf notu, yarım standart sapmalık dilimlere dayanan örnek bir ölçeğe göredir; kurumunuzun ölçeği ve alt sınırları farklı olabilir. Yüzde, notların normal dağıldığı varsayımıyla bulunur.',
    };
  },
  cases: [
    { in: { puan: '70', ortalama: '60', sapma: '10' }, out: { 'Örnek harf notu': 'BA', 'Z skoru': '1', 'T skoru': '60', 'Geride bırakılan öğrenci oranı': '%84,13', 'Konum': 'Ortalamanın 1 standart sapma üstünde' } },
    { in: { puan: '60', ortalama: '60', sapma: '10' }, out: { 'Örnek harf notu': 'CB', 'Z skoru': '0', 'T skoru': '50', 'Geride bırakılan öğrenci oranı': '%50', 'Konum': 'Tam ortalamada' } },
    { in: { puan: '45', ortalama: '60', sapma: '10' }, out: { 'Örnek harf notu': 'DD', 'Z skoru': '-1,5', 'T skoru': '35', 'Geride bırakılan öğrenci oranı': '%6,68' } },
    { in: { puan: '80', ortalama: '60', sapma: '10' }, out: { 'Örnek harf notu': 'AA', 'Z skoru': '2', 'T skoru': '70', 'Geride bırakılan öğrenci oranı': '%97,72' } },
    { in: { puan: '55', ortalama: '60', sapma: '10' }, out: { 'Örnek harf notu': 'CC', 'Z skoru': '-0,5', 'Geride bırakılan öğrenci oranı': '%30,85' } },
    { in: { puan: '30', ortalama: '60', sapma: '10' }, out: { 'Örnek harf notu': 'FF', 'Z skoru': '-3', 'T skoru': '20', 'Geride bırakılan öğrenci oranı': '%0,13' } },
    { in: { puan: '65', ortalama: '50', sapma: '12' }, out: { 'Örnek harf notu': 'BA', 'Z skoru': '1,25', 'T skoru': '62,5', 'Geride bırakılan öğrenci oranı': '%89,44' } },
    { in: { puan: '70', ortalama: '60', sapma: '0' }, error: true },
    { in: { puan: '', ortalama: '60', sapma: '10' }, error: true },
  ],
  howto: [
    "<strong>Notunuz</strong> alanına sınavdan ya da dersten aldığınız ham puanı yazın.",
    "<strong>Sınıf ortalaması</strong> alanına aynı sınavın ya da dersin sınıf ortalamasını girin; bu değer genellikle not ilanında duyurulur.",
    "<strong>Standart sapma</strong> değerini yazın. Açıklanmadıysa sınıf notları elinizdeyse sınıf ortalaması aracıyla hesaplayabilirsiniz.",
    "Hesapla düğmesine basın. İlk satır örnek ölçekteki harf notunu, diğer satırlar Z skoru, T skoru ve sınıf içindeki yaklaşık konumunuzu gösterir.",
  ],
  sections: [
    { h: 'Çan eğrisi (bağıl değerlendirme) nedir?', p: [
      "Çan eğrisi, öğrencinin başarısını sabit bir puan sınırına göre değil, <strong>sınıfın genel başarısına göre</strong> değerlendiren yöntemin gündelik adıdır. Resmî adıyla bağıl değerlendirmede bir öğrencinin harf notu, aldığı ham puanın sınıf ortalamasından ne kadar uzakta olduğuna bakılarak belirlenir. Ad, notların sıklık grafiğinin çoğu zaman ortada yığılan ve iki uca doğru incelen çan biçimli bir eğriye benzemesinden gelir.",
      "Mutlak değerlendirmede 70 almak her zaman aynı harfe karşılık gelir. Bağıl değerlendirmede ise 70, ortalaması 50 olan zor bir sınavda çok iyi, ortalaması 85 olan kolay bir sınavda zayıf bir sonuç sayılabilir. Böylece sınavın zorluğundan kaynaklanan haksızlıkların azaltılması amaçlanır.",
    ] },
    { h: 'Hesabın formülü', p: [
      "İlk adım Z skorunu bulmaktır: <strong>Z = (not − sınıf ortalaması) ÷ standart sapma</strong>. Z skoru, notunuzun ortalamadan kaç standart sapma yukarıda ya da aşağıda olduğunu söyler. Pozitif değer ortalamanın üstünü, negatif değer altını gösterir.",
      "Negatif sayılarla uğraşmamak için Z skoru çoğu zaman T skoruna dönüştürülür: <strong>T = 50 + 10 × Z</strong>. Bu ölçekte sınıf ortalaması 50'ye, bir standart sapma ise 10 puana karşılık gelir. Birçok üniversitenin bağıl değerlendirme yönergesi harf aralıklarını T skoru üzerinden tanımlar.",
      "Geride bırakılan öğrenci oranı, standart normal dağılımın birikimli olasılığından hesaplanır. Notlar çan biçiminde dağılıyorsa Z skoru 1 olan bir öğrenci sınıfın yaklaşık %84'ünden, Z skoru 2 olan bir öğrenci yaklaşık %98'inden daha yüksek not almıştır.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Sınıf ortalaması 60, standart sapması 10 olan bir sınavdan 70 alan öğrenciyi düşünelim. Z skoru (70 − 60) ÷ 10 = 1, T skoru 50 + 10 × 1 = 60'tır. Normal dağılım varsayımıyla öğrenci sınıfın %84,13'ünü geride bırakmıştır. Bu sayfadaki örnek ölçekte Z skoru 1 ile 1,5 arasındaki dilim BA harfine denk gelir.",
      "Aynı sınavdan 45 alan öğrencinin Z skoru (45 − 60) ÷ 10 = −1,5, T skoru 35'tir; sınıfın yalnızca %6,68'i bu notun altında kalır ve örnek ölçekte karşılığı DD'dir. Tam ortalamayı, yani 60'ı tutturan öğrencinin Z skoru 0, T skoru 50'dir ve sınıfın tam ortasında yer alır.",
    ] },
    { h: 'Bu sayfadaki örnek harf ölçeği', p: [
      "Bağıl değerlendirmede harf sınırlarını her kurum kendi yönergesiyle belirler; ülke genelinde tek bir tablo yoktur. Araç, mantığı göstermek için yarım standart sapmalık eşit dilimlerden oluşan sade bir ölçek kullanır:",
    ], ul: [
      "<strong>AA</strong>: Z skoru 1,5 ve üzeri (T 65 ve üzeri)",
      "<strong>BA</strong>: Z skoru 1 ile 1,5 arası (T 60–65)",
      "<strong>BB</strong>: Z skoru 0,5 ile 1 arası (T 55–60)",
      "<strong>CB</strong>: Z skoru 0 ile 0,5 arası (T 50–55)",
      "<strong>CC</strong>: Z skoru −0,5 ile 0 arası (T 45–50)",
      "<strong>DC</strong>: Z skoru −1 ile −0,5 arası (T 40–45)",
      "<strong>DD</strong>: Z skoru −1,5 ile −1 arası (T 35–40)",
      "<strong>FF</strong>: Z skoru −1,5'in altı (T 35'in altı)",
    ] },
    { h: 'Kurumlar arasında neler değişir?', p: [
      "Gerçek uygulamalarda harf aralıkları çoğu zaman sınıfın başarı düzeyine göre kaydırılır: ortalaması yüksek sınıflarda aynı T skoru daha iyi bir harfe, ortalaması düşük sınıflarda daha düşük bir harfe karşılık gelebilir. Birçok yönergede ham puan için bir alt sınır bulunur ve bu sınırın altında kalan öğrenci bağıl konumu ne olursa olsun başarısız sayılır. Bazı kurumlar final sınavı için ayrı bir asgari puan da arar.",
      "Öğrenci sayısı da belirleyicidir. Küçük sınıflarda istatistiksel dağılım güvenilir olmadığından bağıl yöntem yerine mutlak değerlendirme uygulanması yaygındır. Belirli bir puanın altındaki ya da sınava girmeyen öğrencilerin ortalama ve standart sapma hesabına katılmaması da sık rastlanan bir kuraldır. Bu ayrıntıların tümü harf notunuzu değiştirebilir; kesin sonuç için kendi üniversitenizin güncel yönergesine bakın.",
    ] },
    { h: 'Sonucu yorumlarken', p: [
      "Yüzde değeri, notların tam bir normal dağılıma uyduğu varsayımıyla üretilen bir tahmindir. Gerçek sınıflarda dağılım çarpık olabilir, iki ayrı tepe oluşabilir ya da birkaç uç not standart sapmayı büyütebilir; bu durumlarda gerçek sıranız tahminden farklı çıkar. Araç bilgilendirme amaçlıdır ve resmî not hesabının yerini tutmaz.",
      "Çan eğrisinin sık yanlış anlaşılan bir yönü de şudur: yöntem herkesin notunu yükseltmez. Sınıfın geneli başarılıysa ortalamaya yakın bir not düşük bir harfe karşılık gelebilir. Yöntemin ölçtüğü şey kaç puan aldığınız değil, sınıfa göre nerede durduğunuzdur.",
    ] },
  ],
  faq: [
    ['Çan eğrisi nasıl hesaplanır?', "Notunuzdan sınıf ortalaması çıkarılır ve standart sapmaya bölünerek Z skoru bulunur. Z skoru 10 ile çarpılıp 50 eklenerek T skoruna çevrilir; harf notu bu skorun hangi aralığa düştüğüne göre belirlenir."],
    ['Standart sapmayı bilmiyorsam ne yapmalıyım?', "Dersi veren öğretim elemanı ortalamayla birlikte standart sapmayı da çoğu zaman duyurur. Açıklanmadıysa ve sınıf notları elinizdeyse sınıf ortalaması aracına notları yapıştırarak standart sapmayı hesaplayabilirsiniz."],
    ['Buradaki harf notu kesin mi?', "Hayır. Gösterilen harf, yöntemi anlatmak için kullanılan örnek bir ölçeğe göredir. Üniversiteler farklı aralıklar, ham puan alt sınırları ve sınıf düzeyine göre kayan tablolar kullanır; kesin harf için kurumunuzun yönergesi geçerlidir."],
    ['Çan eğrisi notumu her zaman yükseltir mi?', "Hayır. Sınıf ortalaması düşükse bağıl değerlendirme lehinize, ortalama yüksekse aleyhinize sonuç verebilir. Belirleyici olan ham puanınız değil, sınıf içindeki konumunuzdur."],
    ['Ortalamanın altında not alan kalır mı?', "Bu tümüyle kurumun ölçeğine bağlıdır. Çoğu ölçekte ortalamanın biraz altındaki notlar geçer harflere karşılık gelir; ancak ham puan alt sınırının altında kalanlar konumlarından bağımsız olarak başarısız sayılabilir."],
    ['Z skoru ile T skoru arasındaki fark nedir?', "İkisi aynı bilgiyi farklı ölçekte verir. Z skorunda ortalama 0 ve bir standart sapma 1 birimdir; T skorunda ortalama 50 ve bir standart sapma 10 puandır. T skoru negatif değer içermediği için daha kolay okunur."],
    ['Geride bırakılan öğrenci oranı neye göre bulunuyor?', "Standart normal dağılımın birikimli olasılığına göre bulunur. Z skoru 0 için %50, 1 için %84,13, −1 için %15,87 değerini verir. Notlar normal dağılmıyorsa gerçek oran farklı olabilir."],
    ['Notlarım bir yere kaydediliyor mu?', "Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz not, ortalama ve standart sapma sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['t-skoru-hesapla', 'sinif-ortalamasi-hesapla', '100luk-4luk-cevir', 'kredili-ortalama-hesapla', 'butunleme-notu-hesapla'],
};
