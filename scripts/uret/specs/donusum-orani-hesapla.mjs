export default {
  slug: 'donusum-orani-hesapla',
  title: 'Dönüşüm Oranı Hesaplama',
  h1Tail: 'CVR',
  pageTitle: 'Dönüşüm Oranı Hesaplama – E-Ticaret ve Reklam Dönüşüm Oranı (CVR)',
  description: 'Ziyaretçi ve dönüşüm sayısından dönüşüm oranını hesaplayın; ciro girerek ziyaretçi başına geliri, hedef oran girerek gereken ek dönüşüm sayısını görün.',
  card: 'Ziyaretçi ve sipariş sayısından dönüşüm oranını, ziyaretçi başına geliri ve hedefe ulaşmak için gereken dönüşümü hesaplayın.',
  category: 'finans',
  keywords: ['dönüşüm oranı hesaplama', 'dönüşüm oranı formülü', 'e-ticaret dönüşüm oranı', 'CVR hesaplama', 'conversion rate hesaplama', 'satış dönüşüm oranı', 'ziyaretçi başına gelir'],
  lead: 'Sitenize, mağazanıza ya da kampanyanıza gelen ziyaretçilerin yüzde kaçının satın alma, form doldurma ya da üye olma gibi hedeflediğiniz eylemi gerçekleştirdiğini, yani <strong>dönüşüm oranını</strong> hesaplayın.',
  button: 'Hesapla',
  inputs: [
    { id: 'ziyaretci', label: 'Ziyaretçi (ya da tıklama) sayısı', type: 'number', placeholder: 'Örn. 5000' },
    { id: 'donusum', label: 'Dönüşüm sayısı', type: 'number', placeholder: 'Örn. 150', hint: 'Sipariş, form, kayıt, arama gibi hedeflenen eylem sayısı.' },
    { id: 'ciro', label: 'Dönüşümlerden elde edilen ciro (TL)', type: 'number', placeholder: 'Örn. 45000', hint: 'İsteğe bağlı.' },
    { id: 'hedef', label: 'Hedef dönüşüm oranı (%)', type: 'number', placeholder: 'Örn. 4', hint: 'İsteğe bağlı.' },
  ],
  compute(v, h) {
    const z = h.posint(v.ziyaretci, 'Ziyaretçi sayısı');
    const d = h.int(v.donusum, 'Dönüşüm sayısı');
    if (d < 0) h.err('"Dönüşüm sayısı" negatif olamaz.');
    if (d > z) h.err('Dönüşüm sayısı ziyaretçi sayısından büyük olamaz; iki değerin aynı döneme ve aynı kaynağa ait olduğunu kontrol edin.');
    const oran = (d / z) * 100;
    const rows = [
      ['Dönüşüm oranı', '%' + h.fmt(oran, 2)],
      ['Dönüşüm sıklığı', d > 0 ? 'Her ' + h.fmt(z / d, 2) + ' ziyaretçiden 1' : '—'],
      ['Dönüşmeyen ziyaretçi', h.fmt(z - d, 0) + ' (%' + h.fmt(100 - oran, 2) + ')'],
      ['1.000 ziyaretçide beklenen dönüşüm', h.fmt((d / z) * 1000, 1)],
    ];
    let ciro = null;
    if (String(v.ciro ?? '').trim() !== '') {
      ciro = h.nonneg(v.ciro, 'Dönüşümlerden elde edilen ciro');
      if (d === 0 && ciro > 0) h.err('Dönüşüm sayısı sıfırken ciro girilemez.');
      rows.push(['Ortalama dönüşüm değeri', d > 0 ? h.para(ciro / d) : '—']);
      rows.push(['Ziyaretçi başına gelir', h.para(ciro / z)]);
    }
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef dönüşüm oranı');
      if (hedef > 100) h.err('"Hedef dönüşüm oranı" en fazla 100 olabilir.');
      const gerek = Math.ceil((z * hedef) / 100 - 1e-9);
      const ek = Math.max(0, gerek - d);
      rows.push(['Hedef için gereken dönüşüm', h.fmt(gerek, 0)]);
      rows.push(['Gereken ek dönüşüm', ek > 0 ? h.fmt(ek, 0) : '0 (hedefe ulaşılmış)']);
      if (ciro !== null && d > 0) rows.push(['Hedef oranda tahmini ciro', h.para((ciro / d) * gerek)]);
    }
    return {
      rows,
      note: 'Dönüşüm oranı = dönüşüm sayısı ÷ ziyaretçi sayısı × 100. Az sayıda ziyaretçiyle hesaplanan oranlar rastlantısal dalgalanmaya açıktır.',
    };
  },
  cases: [
    { in: { ziyaretci: '5000', donusum: '150' }, out: { 'Dönüşüm oranı': '%3', 'Dönüşüm sıklığı': 'Her 33,33 ziyaretçiden 1', 'Dönüşmeyen ziyaretçi': '4.850 (%97)', '1.000 ziyaretçide beklenen dönüşüm': '30' } },
    { in: { ziyaretci: '5000', donusum: '150', ciro: '45000', hedef: '4' }, out: { 'Dönüşüm oranı': '%3', 'Ortalama dönüşüm değeri': '300,00 TL', 'Ziyaretçi başına gelir': '9,00 TL', 'Hedef için gereken dönüşüm': '200', 'Gereken ek dönüşüm': '50', 'Hedef oranda tahmini ciro': '60.000,00 TL' } },
    { in: { ziyaretci: '1200', donusum: '18' }, out: { 'Dönüşüm oranı': '%1,5', 'Dönüşüm sıklığı': 'Her 66,67 ziyaretçiden 1', '1.000 ziyaretçide beklenen dönüşüm': '15' } },
    { in: { ziyaretci: '3000', donusum: '75', hedef: '2' }, out: { 'Dönüşüm oranı': '%2,5', 'Hedef için gereken dönüşüm': '60', 'Gereken ek dönüşüm': '0 (hedefe ulaşılmış)' } },
    { in: { ziyaretci: '25000', donusum: '0' }, out: { 'Dönüşüm oranı': '%0', 'Dönüşüm sıklığı': '—', 'Dönüşmeyen ziyaretçi': '25.000 (%100)' } },
    { in: { ziyaretci: '800', donusum: '800', ciro: '4000' }, out: { 'Dönüşüm oranı': '%100', 'Ortalama dönüşüm değeri': '5,00 TL', 'Ziyaretçi başına gelir': '5,00 TL' } },
    { in: { ziyaretci: '7', donusum: '1', hedef: '20' }, out: { 'Dönüşüm oranı': '%14,29', 'Hedef için gereken dönüşüm': '2', 'Gereken ek dönüşüm': '1' } },
    { in: { ziyaretci: '100', donusum: '150' }, error: true },
    { in: { ziyaretci: '0', donusum: '0' }, error: true },
    { in: { ziyaretci: '5000', donusum: '150', hedef: '120' }, error: true },
  ],
  howto: [
    'İncelemek istediğiniz dönemi ve kaynağı belirleyin; ziyaretçi (oturum, kullanıcı ya da reklam tıklaması) sayısını ilk alana yazın.',
    'Aynı dönemde ve aynı kaynaktan gerçekleşen dönüşüm sayısını girin: tamamlanan sipariş, gönderilen form, yapılan kayıt ya da telefon araması.',
    'Ziyaretçi başına geliri görmek için bu dönüşümlerden elde edilen toplam ciroyu, bir hedefiniz varsa ulaşmak istediğiniz dönüşüm oranını ekleyin.',
    '"Hesapla" düğmesine basın. İlk satır dönüşüm oranını, sonraki satırlar kaç ziyaretçide bir dönüşüm aldığınızı ve hedef için gereken ek dönüşüm sayısını gösterir.',
  ],
  sections: [
    { h: 'Dönüşüm oranı nedir?', p: [
      'Dönüşüm oranı (İngilizce "conversion rate", kısaca CVR), bir sayfaya, mağazaya ya da kampanyaya ulaşan kişilerin yüzde kaçının sizin tanımladığınız hedef eylemi gerçekleştirdiğini gösterir. Hedef eylem işe göre değişir: bir internet mağazası için tamamlanan sipariş, bir hizmet sitesi için teklif formunun gönderilmesi, bir uygulama için üyelik kaydı, bir restoran için rezervasyon araması.',
      'Dönüşüm oranı, trafiğin niceliğini değil niteliğini ve sitenizin ikna gücünü ölçer. Ziyaretçi sayısını iki katına çıkarmak çoğu zaman reklam bütçesini de iki katına çıkarmayı gerektirir; dönüşüm oranını iki katına çıkarmak ise aynı bütçeyle iki kat satış demektir.',
    ] },
    { h: 'Dönüşüm oranı formülü', p: [
      '<strong>Dönüşüm oranı (%) = dönüşüm sayısı ÷ ziyaretçi sayısı × 100</strong>',
      'Formül basit olsa da paydanın ne olduğu önemlidir. Web analizinde payda genellikle oturum (ziyaret) sayısıdır; aynı kişi bir haftada üç kez gelirse üç oturum sayılır. Bazı raporlar tekil kullanıcı sayısını esas alır ve bu durumda oran daha yüksek çıkar. Reklam raporlarında ise payda tıklama sayısıdır. Hangi tanımı seçerseniz seçin, dönemler arasında karşılaştırma yaparken hep aynısını kullanın.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir internet mağazası bir ayda 5.000 ziyaret almış ve 150 sipariş tamamlanmış olsun. Dönüşüm oranı 150 ÷ 5.000 × 100 = <strong>%3</strong>\'tür; başka bir deyişle yaklaşık her 33 ziyaretçiden biri alışveriş yapmış, 4.850 ziyaret siparişsiz sonuçlanmıştır.',
      'Bu siparişlerden 45.000 TL ciro elde edildiyse ortalama sipariş tutarı 45.000 ÷ 150 = 300 TL, ziyaretçi başına gelir 45.000 ÷ 5.000 = <strong>9 TL</strong> olur. Mağaza dönüşüm oranını %4\'e çıkarmayı hedefliyorsa aynı trafikle 200 siparişe, yani 50 ek siparişe ihtiyaç vardır; ortalama sipariş tutarı değişmezse ciro 60.000 TL\'ye yükselir. Trafik hiç artmadan ciro üçte bir oranında büyümüş olur.',
    ] },
    { h: 'Ziyaretçi başına gelir neden önemli?', p: [
      'Ziyaretçi başına gelir, dönüşüm oranı ile ortalama sipariş tutarını tek bir sayıda birleştirir: <strong>ziyaretçi başına gelir = dönüşüm oranı × ortalama sipariş tutarı</strong>. Örnekte %3 × 300 TL = 9 TL. Bu değer, bir ziyaretçiyi sitenize getirmek için en fazla ne kadar ödeyebileceğinizin üst sınırını kabaca gösterir. Tıklama başına 9 TL\'den fazla ödüyorsanız ciro, reklam harcamasını bile karşılamıyor demektir; kârlı olmak için tıklama maliyetinin bu değerin brüt kâr marjınızla çarpımının altında kalması gerekir.',
      'Yalnızca dönüşüm oranına bakmak yanıltabilir. Büyük bir indirim dönüşüm oranını yükseltirken sepet tutarını ve marjı düşürebilir; ziyaretçi başına gelir bu ikisinin net etkisini gösterir.',
    ] },
    { h: 'Dönüşüm oranını etkileyen etkenler', ul: [
      '<strong>Trafik kaynağı:</strong> Markanızı arayarak gelen ya da e-posta bülteninden tıklayan ziyaretçi, sosyal medyada reklamı merakla tıklayan kişiden çok daha yüksek oranda dönüşür.',
      '<strong>Cihaz:</strong> Mobil trafik çoğu sitede ziyaretlerin büyük kısmını oluşturur, ancak küçük ekranda form doldurmak ve ödeme yapmak zor olduğundan dönüşüm oranı genellikle masaüstünden düşüktür.',
      '<strong>Fiyat ve ürün türü:</strong> Düşük tutarlı, sık alınan ürünlerde oran yüksek; pahalı ve üzerinde düşünülen ürünlerde düşüktür.',
      '<strong>Sayfa hızı ve kullanım kolaylığı:</strong> Geç açılan sayfa, karmaşık menü ve uzun ödeme adımları ziyaretçiyi kaçırır.',
      '<strong>Güven unsurları:</strong> Açık iade koşulları, görünür iletişim bilgileri, müşteri yorumları ve güvenli ödeme seçenekleri kararı kolaylaştırır.',
      '<strong>Toplam maliyetin geç görünmesi:</strong> Kargo ücretinin ya da ek masrafların ancak son adımda ortaya çıkması sepeti terk etmenin en yaygın nedenlerindendir.',
    ] },
    { h: 'Yorumlarken dikkat edilecekler', p: [
      '"İyi bir dönüşüm oranı kaçtır?" sorusunun tek bir cevabı yoktur. Sektör, ürün fiyatı, trafik kaynağı ve dönüşüm tanımı sonucu büyük ölçüde değiştirir; bir form gönderimi ile bir satın alma aynı kefeye konamaz. En anlamlı kıyas, kendi geçmiş dönemlerinizle ve kendi kanallarınız arasında yaptığınız kıyastır.',
      'Küçük sayılarla hesaplanan oranlara temkinli yaklaşın. 50 ziyaretçiden 3 sipariş %6 eder, ama tek bir sipariş eksik ya da fazla olsaydı oran %4 ya da %8 çıkacaktı. Bir sayfa değişikliğinin işe yarayıp yaramadığına karar vermeden önce yeterli sayıda ziyaretçi ve dönüşüm birikmesini bekleyin. Ayrıca iptal ve iade edilen siparişleri, sahte ya da yinelenen form gönderimlerini dönüşümden düşmek gerçeğe daha yakın bir tablo verir. Sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['Dönüşüm oranı nasıl hesaplanır?', 'Dönüşüm sayısı ziyaretçi sayısına bölünür ve 100 ile çarpılır. 5.000 ziyaretten 150 sipariş geldiyse dönüşüm oranı 150 ÷ 5.000 × 100 = %3\'tür.'],
    ['Ziyaretçi sayısı olarak oturumu mu, kullanıcıyı mı yazmalıyım?', 'İkisi de kullanılabilir; önemli olan tutarlılıktır. Oturum bazlı oran daha düşük, kullanıcı bazlı oran daha yüksek çıkar. Dönemleri karşılaştırırken hep aynı tanımı kullanın.'],
    ['Reklam dönüşüm oranını bu araçla hesaplayabilir miyim?', 'Evet. Ziyaretçi alanına reklamın aldığı tıklama sayısını, dönüşüm alanına bu tıklamalardan gelen sipariş ya da form sayısını yazın. Sonuç, tıklamaların yüzde kaçının dönüşümle sonuçlandığını gösterir.'],
    ['Dönüşüm sayısı ziyaretçi sayısından büyük olabilir mi?', 'Bir ziyaretçinin birden çok sipariş verdiği özel durumlarda teorik olarak mümkündür, ancak pratikte bu genellikle ölçüm hatasına işaret eder. Araç bu durumda uyarı verir; dönüşümlerin iki kez sayılıp sayılmadığını kontrol edin.'],
    ['Dönüşüm oranı ile tıklama oranı arasındaki fark nedir?', 'Tıklama oranı, reklamı ya da bağlantıyı görenlerin yüzde kaçının tıkladığını ölçer. Dönüşüm oranı ise tıklayıp gelenlerin yüzde kaçının hedeflenen eylemi tamamladığını ölçer. İlki ilgiyi, ikincisi sonucu gösterir.'],
    ['Fiziksel mağaza için dönüşüm oranı hesaplanır mı?', 'Evet. Kapıdan giren kişi sayısını (kapı sayacı ya da gözlemle) ziyaretçi, kesilen fiş sayısını dönüşüm olarak girerek mağaza içi dönüşüm oranını bulabilirsiniz.'],
    ['Hedef oran satırları ne işe yarar?', 'Mevcut trafiğiniz aynı kalırken hedeflediğiniz dönüşüm oranına ulaşmak için toplam kaç dönüşüm gerektiğini ve bunun şu anki sayının kaç fazlası olduğunu gösterir. Ciro girdiyseniz hedefteki tahmini ciro da hesaplanır.'],
    ['Girdiğim trafik ve satış verileri saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['tiklama-orani-hesapla', 'tiklama-basi-maliyet-hesapla', 'reklam-getirisi-hesapla', 'musteri-edinme-maliyeti-hesapla', 'bin-gosterim-maliyeti-hesapla'],
};
