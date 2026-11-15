export default {
  slug: 'bin-gosterim-maliyeti-hesapla',
  title: 'Bin Gösterim Maliyeti (CPM) Hesaplama',
  h1Tail: 'BGBM',
  pageTitle: 'Bin Gösterim Maliyeti (CPM) Hesaplama – BGBM Formülü ve Bütçe Hesabı',
  description: 'Reklam harcaması ve gösterim sayısından bin gösterim maliyetini (CPM) hesaplayın; ya da CPM değerinden gereken bütçeyi ve alınacak gösterim sayısını bulun.',
  card: 'Harcama ve gösterimden CPM değerini bulun ya da CPM üzerinden gereken bütçeyi ve alınacak gösterim sayısını hesaplayın.',
  category: 'finans',
  keywords: ['CPM hesaplama', 'bin gösterim maliyeti', 'BGBM hesaplama', 'CPM nedir', 'CPM formülü', 'bin gösterim başına maliyet', 'reklam bütçesi hesaplama', 'gösterim maliyeti'],
  lead: 'Bir reklamın bin kez gösterilmesinin kaça geldiğini, yani <strong>bin gösterim maliyetini (CPM)</strong> hesaplayın. Aynı araçla, bilinen bir CPM değerinden gereken bütçeyi ya da bütçenizle alabileceğiniz gösterim sayısını da bulabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Hesaplanacak değer', type: 'select', options: [['cpm', 'Bin gösterim maliyeti (CPM)'], ['maliyet', 'Toplam maliyet (bütçe)'], ['gosterim', 'Gösterim sayısı']] },
    { id: 'maliyet', label: 'Toplam maliyet (TL)', type: 'number', placeholder: 'Örn. 500', hint: 'Bütçe hesaplanacaksa boş bırakın.' },
    { id: 'gosterim', label: 'Gösterim sayısı', type: 'number', placeholder: 'Örn. 200000', hint: 'Gösterim hesaplanacaksa boş bırakın.' },
    { id: 'cpm', label: 'Bin gösterim maliyeti – CPM (TL)', type: 'number', placeholder: 'Örn. 2,5', hint: 'CPM hesaplanacaksa boş bırakın.' },
    { id: 'tiklama', label: 'Tıklama sayısı', type: 'number', placeholder: 'Örn. 4000', hint: 'İsteğe bağlı; tıklama oranı ve tıklama başı maliyet için.' },
  ],
  compute(v, h) {
    let maliyet, gosterim, cpm;
    const rows = [];
    if (v.bul === 'maliyet') {
      cpm = h.pos(v.cpm, 'Bin gösterim maliyeti');
      gosterim = h.pos(v.gosterim, 'Gösterim sayısı');
      maliyet = (cpm * gosterim) / 1000;
      rows.push(['Toplam maliyet', h.para(maliyet)]);
      rows.push(['Bin gösterim maliyeti (CPM)', h.para(cpm)]);
      rows.push(['Gösterim sayısı', h.fmt(gosterim, 0)]);
    } else if (v.bul === 'gosterim') {
      maliyet = h.pos(v.maliyet, 'Toplam maliyet');
      cpm = h.pos(v.cpm, 'Bin gösterim maliyeti');
      gosterim = (maliyet / cpm) * 1000;
      rows.push(['Gösterim sayısı', h.fmt(Math.floor(gosterim + 1e-6), 0)]);
      rows.push(['Bin gösterim maliyeti (CPM)', h.para(cpm)]);
      rows.push(['Toplam maliyet', h.para(maliyet)]);
    } else {
      maliyet = h.nonneg(v.maliyet, 'Toplam maliyet');
      gosterim = h.pos(v.gosterim, 'Gösterim sayısı');
      cpm = (maliyet / gosterim) * 1000;
      rows.push(['Bin gösterim maliyeti (CPM)', h.para(cpm)]);
      rows.push(['Toplam maliyet', h.para(maliyet)]);
      rows.push(['Gösterim sayısı', h.fmt(gosterim, 0)]);
    }
    rows.push(['Tek gösterimin maliyeti', h.fmt(cpm / 1000, 5) + ' TL']);
    rows.push(['1.000 TL ile alınan gösterim', h.fmt(cpm > 0 ? Math.floor((1000 / cpm) * 1000 + 1e-6) : Infinity, 0)]);
    if (String(v.tiklama ?? '').trim() !== '') {
      const t = h.int(v.tiklama, 'Tıklama sayısı');
      if (t < 0) h.err('"Tıklama sayısı" negatif olamaz.');
      if (t > gosterim + 1e-6) h.err('Tıklama sayısı gösterim sayısından büyük olamaz.');
      rows.push(['Tıklama oranı (CTR)', '%' + h.fmt((t / gosterim) * 100, 2)]);
      rows.push(['Tıklama başı maliyet (CPC)', t > 0 ? h.para(maliyet / t) : '—']);
    }
    return {
      rows,
      note: 'CPM = toplam maliyet ÷ gösterim sayısı × 1.000. Tutarları vergiler hariç ya da dahil, ama hep aynı esasa göre girin.',
    };
  },
  cases: [
    { in: { bul: 'cpm', maliyet: '500', gosterim: '200000' }, out: { 'Bin gösterim maliyeti (CPM)': '2,50 TL', 'Toplam maliyet': '500,00 TL', 'Gösterim sayısı': '200.000', 'Tek gösterimin maliyeti': '0,0025 TL', '1.000 TL ile alınan gösterim': '400.000' } },
    { in: { bul: 'maliyet', cpm: '40', gosterim: '250000' }, out: { 'Toplam maliyet': '10.000,00 TL', 'Bin gösterim maliyeti (CPM)': '40,00 TL', 'Tek gösterimin maliyeti': '0,04 TL', '1.000 TL ile alınan gösterim': '25.000' } },
    { in: { bul: 'gosterim', maliyet: '3000', cpm: '25' }, out: { 'Gösterim sayısı': '120.000', 'Toplam maliyet': '3.000,00 TL' } },
    { in: { bul: 'cpm', maliyet: '1200', gosterim: '48000', tiklama: '960' }, out: { 'Bin gösterim maliyeti (CPM)': '25,00 TL', 'Tıklama oranı (CTR)': '%2', 'Tıklama başı maliyet (CPC)': '1,25 TL' } },
    { in: { bul: 'maliyet', cpm: '18,75', gosterim: '64000' }, out: { 'Toplam maliyet': '1.200,00 TL' } },
    { in: { bul: 'gosterim', maliyet: '100', cpm: '12,5' }, out: { 'Gösterim sayısı': '8.000', 'Tek gösterimin maliyeti': '0,0125 TL' } },
    { in: { bul: 'cpm', maliyet: '75', gosterim: '1000', tiklama: '0' }, out: { 'Bin gösterim maliyeti (CPM)': '75,00 TL', 'Tıklama oranı (CTR)': '%0', 'Tıklama başı maliyet (CPC)': '—' } },
    { in: { bul: 'cpm', maliyet: '500', gosterim: '0' }, error: true },
    { in: { bul: 'maliyet', cpm: '', gosterim: '250000' }, error: true },
    { in: { bul: 'cpm', maliyet: '500', gosterim: '1000', tiklama: '2500' }, error: true },
  ],
  howto: [
    '"Hesaplanacak değer" listesinden neyi bulmak istediğinizi seçin: CPM, toplam bütçe ya da gösterim sayısı.',
    'Bilinen iki değeri ilgili alanlara yazın. Hesaplanacak değerin alanını boş bırakabilirsiniz; dolu olsa da dikkate alınmaz.',
    'Tıklama oranını ve tıklama başı maliyeti de görmek isterseniz tıklama sayısını ekleyin.',
    '"Hesapla" düğmesine basın. İlk satır aradığınız değeri, alttaki satırlar tek gösterimin maliyetini ve 1.000 TL ile alınabilecek gösterim sayısını gösterir.',
  ],
  sections: [
    { h: 'Bin gösterim maliyeti (CPM) nedir?', p: [
      'CPM, İngilizce "cost per mille" ifadesinin kısaltmasıdır; buradaki "mille" Latince bin anlamına gelir. Türkçe reklam panellerinde <strong>BGBM</strong> (bin gösterim başına maliyet) olarak da görürsünüz. Bir reklamın bin kez görüntülenmesi için ödenen tutarı ifade eder ve reklam alanı fiyatlarını karşılaştırmanın ortak dilidir.',
      'Tek bir gösterimin bedeli kuruşun çok altında kalabildiği için fiyatlar bin gösterim üzerinden konuşulur. Bu alışkanlık internet öncesine dayanır: gazete, dergi, radyo ve açık hava reklamlarında da ulaşılan bin kişi başına maliyet aynı mantıkla hesaplanır. Böylece tirajı, izleyicisi ya da trafiği birbirinden çok farklı mecralar aynı ölçekte kıyaslanabilir.',
    ] },
    { h: 'CPM formülü ve türevleri', p: [
      'Üç büyüklükten ikisi bilindiğinde üçüncüsü bulunur:',
    ], ul: [
      '<strong>CPM = toplam maliyet ÷ gösterim sayısı × 1.000</strong>',
      '<strong>Toplam maliyet = CPM × gösterim sayısı ÷ 1.000</strong>',
      '<strong>Gösterim sayısı = toplam maliyet ÷ CPM × 1.000</strong>',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>CPM bulma:</strong> Bir kampanyaya 500 TL harcanmış ve reklam 200.000 kez gösterilmiş olsun. CPM = 500 ÷ 200.000 × 1.000 = <strong>2,50 TL</strong>. Tek bir gösterimin maliyeti 0,0025 TL\'dir; aynı fiyatla 1.000 TL\'lik bütçe 400.000 gösterim satın alır.',
      '<strong>Bütçe bulma:</strong> Bir haber sitesi ana sayfa afişi için 40 TL CPM istiyor ve siz 250.000 gösterim almak istiyorsunuz. Gereken bütçe 40 × 250.000 ÷ 1.000 = <strong>10.000 TL</strong> olur.',
      '<strong>Gösterim bulma:</strong> 3.000 TL bütçeniz var ve ortalama CPM 25 TL. Alabileceğiniz gösterim 3.000 ÷ 25 × 1.000 = <strong>120.000</strong> eder.',
      '<strong>Tıklamayla birlikte:</strong> 1.200 TL harcanan ve 48.000 gösterim alan bir kampanyada CPM 25 TL\'dir. Reklam 960 kez tıklandıysa tıklama oranı %2, tıklama başı maliyet 1.200 ÷ 960 = 1,25 TL olur.',
    ] },
    { h: 'CPM, tıklama başı maliyet ve tıklama oranı ilişkisi', p: [
      'Reklam ister gösterim başına ister tıklama başına satın alınsın, üç ölçü birbirine bağlıdır: <strong>CPM = tıklama başı maliyet × tıklama oranı (%) × 10</strong>. Tıklama başına 1,25 TL ödediğiniz ve %2 oranında tıklanan bir reklamın etkin bin gösterim maliyeti 1,25 × 2 × 10 = 25 TL\'dir. Bu dönüşüm, farklı ödeme modelleriyle satın alınan kampanyaları aynı zeminde karşılaştırmayı sağlar. Tıklama başına ödenen kampanyalar için hesaplanan bu değere "etkin CPM" denir.',
      'İlişkinin pratik anlamı şudur: düşük CPM tek başına ucuz reklam demek değildir. Bin gösterimi 5 TL olan ama hiç tıklanmayan bir yerleşim, bin gösterimi 40 TL olup yüksek oranda tıklanan ve satışa dönen bir yerleşimden daha pahalıya gelebilir.',
    ] },
    { h: 'CPM hangi durumlarda kullanılır?', ul: [
      '<strong>Bilinirlik kampanyaları:</strong> Amaç tıklama değil, markanın olabildiğince çok kişi tarafından görülmesiyse başarı gösterim ve erişim üzerinden ölçülür; CPM bu kampanyaların temel maliyet ölçüsüdür.',
      '<strong>Video reklamlar:</strong> Görüntüleme odaklı satın almalarda bütçe planı bin gösterim ya da bin izlenme üzerinden yapılır.',
      '<strong>Doğrudan yayıncıdan alan kiralama:</strong> Haber siteleri, bloglar ve bültenler afiş alanlarını çoğunlukla CPM fiyatıyla satar.',
      '<strong>Mecra karşılaştırması:</strong> Farklı sitelerin, sosyal ağların ya da açık hava ve basılı mecraların maliyet verimliliğini kıyaslamak için ortak payda işlevi görür.',
      '<strong>Yayıncı tarafı:</strong> Sitesinde reklam gösteren yayıncılar, bin sayfa görüntülemesi başına elde ettikleri geliri benzer bir hesapla izler.',
    ] },
    { h: 'CPM değerini etkileyen etkenler', p: [
      'Bin gösterim maliyeti sabit bir tarife değildir; açık artırmayla çalışan sistemlerde arz ve talebe göre sürekli değişir. Hedef kitle daraldıkça ve o kitleye ulaşmak isteyen reklamveren sayısı arttıkça fiyat yükselir. Yılın yoğun alışveriş dönemlerinde, büyük indirim haftalarında ve bayram öncesinde rekabet arttığı için CPM belirgin biçimde yukarı çıkar. Reklamın biçimi (video, tam ekran, afiş), sayfadaki konumu, cihaz türü, ülke ve şehir de fiyatı etkiler. Bu yüzden bu sayfada genel geçer bir "normal CPM" değeri verilmemiştir; planlama yaparken kendi geçmiş kampanyalarınızın ya da yayıncıdan aldığınız teklifin değerini kullanın.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, 1.000 çarpanını unutmak ya da iki kez uygulamaktır; sonuç bin kat küçük ya da büyük çıkar. İkincisi, gösterim ile erişimi karıştırmaktır: 200.000 gösterim 200.000 farklı kişi demek değildir, aynı kişi reklamı birden çok kez görmüş olabilir. Üçüncüsü, satın alınan her gösterimin gerçekten görüldüğünü varsaymaktır. Sayfanın alt kısmında kalan ve kullanıcı hiç kaydırmadığı için ekrana girmeyen reklamlar da gösterim sayılabilir; mümkünse görüntülenebilir gösterim sayısını esas alın.',
      'Ajans komisyonu, platform hizmet bedeli ve vergiler toplam maliyete eklenmediyse gerçek CPM hesaplanandan yüksektir. Araç yalnızca aritmetik hesabı yapar; gösterimlerin kalitesi, hedef kitle uyumu ve kampanyanın satışa etkisi hakkında bir değerlendirme sunmaz. Sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['CPM nasıl hesaplanır?', 'Toplam reklam maliyeti gösterim sayısına bölünür ve 1.000 ile çarpılır. 500 TL harcamayla 200.000 gösterim alındıysa CPM 500 ÷ 200.000 × 1.000 = 2,50 TL\'dir.'],
    ['CPM ile BGBM aynı şey mi?', 'Evet. BGBM, bin gösterim başına maliyet ifadesinin Türkçe kısaltmasıdır ve reklam panellerinin Türkçe arayüzlerinde kullanılır. CPM aynı ölçünün uluslararası kısaltmasıdır.'],
    ['CPM\'deki M neden bin anlamına geliyor?', 'M harfi Latince bin anlamına gelen "mille" sözcüğünden gelir; Roma rakamlarında da M bini gösterir. Milyon anlamında değildir.'],
    ['CPM ile tıklama başı maliyet arasındaki fark nedir?', 'CPM modelinde reklam her gösterildiğinde, tıklama başı maliyet modelinde ise yalnızca tıklandığında ödeme yapılır. İlki bilinirlik, ikincisi siteye trafik çekme hedefli kampanyalarda tercih edilir. İkisi tıklama oranı üzerinden birbirine çevrilebilir.'],
    ['Belirli bir bütçeyle kaç gösterim alırım?', '"Hesaplanacak değer" listesinden gösterim sayısını seçip bütçenizi ve beklediğiniz CPM değerini yazın. Örneğin 3.000 TL bütçe ve 25 TL CPM ile 120.000 gösterim alınır.'],
    ['Düşük CPM her zaman daha mı iyidir?', 'Hayır. Ucuz gösterimler ilgisiz kitleye, görünmeyen konumlara ya da düşük kaliteli sitelere ait olabilir. Asıl ölçüt, harcanan paranın getirdiği tıklama, dönüşüm ve satıştır; CPM bunlarla birlikte değerlendirilmelidir.'],
    ['Etkin CPM (eCPM) nedir?', 'Tıklama ya da dönüşüm başına ödeme yapılan kampanyalarda, toplam maliyetin gösterim sayısına bölünüp 1.000 ile çarpılmasıyla bulunan değerdir. Farklı ödeme modellerindeki kampanyaları karşılaştırmak için kullanılır; hesabı bu araçtaki CPM hesabıyla aynıdır.'],
    ['Girdiğim bütçe bilgileri bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız tutarlar ve sayılar sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['tiklama-orani-hesapla', 'tiklama-basi-maliyet-hesapla', 'reklam-getirisi-hesapla', 'donusum-orani-hesapla', 'musteri-edinme-maliyeti-hesapla'],
};
