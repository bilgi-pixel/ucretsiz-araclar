export default {
  slug: 'sayfa-basi-maliyet-hesapla',
  title: 'Yazıcı Sayfa Başı Maliyet Hesaplama',
  h1Tail: 'toner, kâğıt, drum',
  pageTitle: 'Yazıcı Sayfa Başı Maliyet Hesaplama – Toner ve Kâğıt Dahil',
  description: 'Toner ya da kartuş fiyatı, sayfa verimi, doluluk oranı, kâğıt ve drum giderinden yazıcınızın bir sayfayı kaça bastığını ve aylık baskı maliyetini hesaplayın.',
  card: 'Toner fiyatı, sayfa verimi, kâğıt ve drum giderinden yazıcınızın sayfa başı ve aylık baskı maliyetini bulun.',
  category: 'gunluk',
  keywords: ['sayfa başı maliyet hesaplama', 'yazıcı baskı maliyeti', 'toner sayfa maliyeti', 'kartuş maliyeti hesaplama', 'fotokopi maliyeti hesaplama', 'baskı maliyeti hesaplama', 'yazıcı maliyet karşılaştırma'],
  lead: "Yazıcınızın bir sayfayı kaç liraya bastığını hesaplayın. Araç <strong>toner ya da mürekkep kartuşunun fiyatını sayfa verimine</strong> böler, gerçek doluluk oranına göre düzeltir ve isterseniz kâğıt ile drum giderini de ekleyerek aylık ve yıllık toplamı gösterir.",
  button: 'Hesapla',
  inputs: [
    { id: 'sarfFiyat', label: 'Toner / kartuş fiyatı (TL)', type: 'number', placeholder: 'Örn. 1200' },
    { id: 'sarfVerim', label: 'Kartuşun sayfa verimi', type: 'number', placeholder: 'Örn. 3000', hint: 'Kutuda yazan değer; %5 doluluk için verilir.' },
    { id: 'doluluk', label: 'Gerçek doluluk oranı (%)', type: 'number', value: '5', hint: 'Düz yazı için 5; yoğun tablo ve görselli sayfalarda daha yüksek.' },
    { id: 'kagitFiyat', label: 'Kâğıt paketi fiyatı (TL)', type: 'number', placeholder: 'İsteğe bağlı' },
    { id: 'kagitAdet', label: 'Paketteki yaprak sayısı', type: 'number', value: '500' },
    { id: 'drumFiyat', label: 'Drum ünitesi fiyatı (TL)', type: 'number', placeholder: 'İsteğe bağlı' },
    { id: 'drumVerim', label: 'Drum ömrü (sayfa)', type: 'number', placeholder: 'İsteğe bağlı' },
    { id: 'aylikSayfa', label: 'Aylık baskı adedi', type: 'number', placeholder: 'İsteğe bağlı' },
  ],
  compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const fiyat = h.nonneg(v.sarfFiyat, 'Toner / kartuş fiyatı');
    const verim = h.pos(v.sarfVerim, 'Kartuşun sayfa verimi');
    const dol = h.opt(v.doluluk, 5, 'Gerçek doluluk oranı');
    if (!(dol > 0) || dol > 100) h.err('Doluluk oranı 0 ile 100 arasında olmalı; emin değilseniz 5 yazın.');
    const gercekVerim = verim * 5 / dol;
    const sarf = fiyat / gercekVerim;
    let kagit = 0, drum = 0;
    if (!bos(v.kagitFiyat)) {
      const kf = h.nonneg(v.kagitFiyat, 'Kâğıt paketi fiyatı');
      const ka = h.opt(v.kagitAdet, 500, 'Paketteki yaprak sayısı');
      if (!(ka > 0)) h.err('"Paketteki yaprak sayısı" sıfırdan büyük olmalı.');
      kagit = kf / ka;
    }
    if (!bos(v.drumFiyat) || !bos(v.drumVerim)) {
      if (bos(v.drumFiyat) || bos(v.drumVerim)) h.err('Drum giderini eklemek için hem drum fiyatını hem drum ömrünü yazın ya da ikisini de boş bırakın.');
      drum = h.nonneg(v.drumFiyat, 'Drum ünitesi fiyatı') / h.pos(v.drumVerim, 'Drum ömrü');
    }
    const toplam = sarf + kagit + drum;
    const rows = [
      ['Sayfa başı maliyet', h.fmt(toplam, 4) + ' TL'],
      ['Kuruş karşılığı', h.fmt(toplam * 100, 2) + ' kuruş'],
      ['Toner / mürekkep payı', h.fmt(sarf, 4) + ' TL'],
    ];
    if (kagit > 0) rows.push(['Kâğıt payı', h.fmt(kagit, 4) + ' TL']);
    if (drum > 0) rows.push(['Drum payı', h.fmt(drum, 4) + ' TL']);
    rows.push(['Gerçek kartuş verimi', h.fmt(gercekVerim, 0) + ' sayfa']);
    if (!bos(v.aylikSayfa)) {
      const ay = h.nonneg(v.aylikSayfa, 'Aylık baskı adedi');
      rows.push(['Aylık baskı maliyeti', h.para(toplam * ay)]);
      rows.push(['Yıllık baskı maliyeti', h.para(toplam * ay * 12)]);
    }
    return {
      rows,
      note: 'Kutudaki verim %5 doluluk içindir; gerçek verim = verim × 5 ÷ doluluk. Elektrik, bakım ve cihazın satın alma bedeli hesaba katılmamıştır.',
    };
  },
  cases: [
    { in: { sarfFiyat: '1200', sarfVerim: '3000', doluluk: '5', kagitFiyat: '250', kagitAdet: '500' }, out: { 'Sayfa başı maliyet': '0,9 TL', 'Kuruş karşılığı': '90 kuruş', 'Toner / mürekkep payı': '0,4 TL', 'Kâğıt payı': '0,5 TL' } },
    { in: { sarfFiyat: '900', sarfVerim: '1500', kagitFiyat: '200', kagitAdet: '500', drumFiyat: '2400', drumVerim: '12000', aylikSayfa: '1000' }, out: { 'Sayfa başı maliyet': '1,2 TL', 'Drum payı': '0,2 TL', 'Aylık baskı maliyeti': '1.200,00 TL', 'Yıllık baskı maliyeti': '14.400,00 TL' } },
    { in: { sarfFiyat: '1200', sarfVerim: '3000', doluluk: '10' }, out: { 'Sayfa başı maliyet': '0,8 TL', 'Gerçek kartuş verimi': '1.500 sayfa' } },
    { in: { sarfFiyat: '450', sarfVerim: '180' }, out: { 'Sayfa başı maliyet': '2,5 TL', 'Kuruş karşılığı': '250 kuruş' } },
    { in: { sarfFiyat: '3500', sarfVerim: '10000', kagitFiyat: '300', kagitAdet: '500', aylikSayfa: '2500' }, out: { 'Sayfa başı maliyet': '0,95 TL', 'Aylık baskı maliyeti': '2.375,00 TL' } },
    { in: { sarfFiyat: '600', sarfVerim: '1600' }, out: { 'Sayfa başı maliyet': '0,375 TL', 'Kuruş karşılığı': '37,5 kuruş' } },
    { in: { sarfFiyat: '1200', sarfVerim: '0' }, error: true },
    { in: { sarfFiyat: '1200', sarfVerim: '3000', drumFiyat: '2400' }, error: true },
    { in: { sarfFiyat: '1200', sarfVerim: '3000', doluluk: '0' }, error: true },
  ],
  howto: [
    'Toner ya da mürekkep kartuşunun satın alma fiyatını ve kutusunda yazan sayfa verimini girin.',
    'Baskılarınız düz yazıdan yoğunsa doluluk oranını artırın; emin değilseniz 5 olarak bırakın.',
    'Kâğıt giderini eklemek için paket fiyatını ve paketteki yaprak sayısını yazın. Yalnızca sarf malzeme maliyetini görmek istiyorsanız boş bırakın.',
    'Lazer yazıcınızda drum ayrı değişiyorsa drum fiyatını ve sayfa ömrünü birlikte girin.',
    'Aylık baskı adedinizi yazarsanız araç aylık ve yıllık toplam gideri de hesaplar. Hesapla düğmesine basın.',
  ],
  sections: [
    { h: 'Sayfa başı maliyet nasıl hesaplanır?', p: [
      'Bir yazıcının asıl gideri çoğu zaman cihazın kendisi değil, ömrü boyunca tükettiği sarf malzemedir. Sayfa başı maliyet, bu gideri tek bir sayfaya indirger ve farklı yazıcıları ya da farklı kartuş seçeneklerini aynı ölçüyle karşılaştırmanızı sağlar. Temel formül basittir: <strong>sarf payı = kartuş fiyatı ÷ sayfa verimi</strong>. Buna <strong>kâğıt payı = paket fiyatı ÷ yaprak sayısı</strong> ve varsa <strong>drum payı = drum fiyatı ÷ drum ömrü</strong> eklenir.',
      'Çözümlü örnek: 1.200 TL\'ye alınan ve 3.000 sayfa verim yazan bir toner için sarf payı 1.200 ÷ 3.000 = 0,40 TL\'dir. 500 yapraklık kâğıt paketi 250 TL ise kâğıt payı 250 ÷ 500 = 0,50 TL olur. Toplam sayfa başı maliyet 0,90 TL, yani 90 kuruştur. Ayda 1.000 sayfa basan bir ofis için bu, aylık 900 TL ve yıllık 10.800 TL baskı gideri anlamına gelir.',
    ] },
    { h: 'Doluluk oranı neden bu kadar önemli?', p: [
      'Kartuş kutularındaki sayfa verimi, uluslararası ölçüm standartlarında tanımlanan test sayfalarıyla belirlenir ve yaklaşık <strong>%5 doluluk</strong> varsayar. Yüzde beş doluluk, sayfanın yirmide birinin tonerle kaplanması demektir; kabaca kısa bir iş mektubuna karşılık gelir. Sık tablolar, koyu başlıklar, logolar, grafikler ya da fotoğraflar içeren sayfalarda doluluk kolayca %10–20 düzeyine çıkar ve kartuş, kutuda yazan sayının çok altında sayfa basar.',
      'Araç bu etkiyi doğrusal olarak düzeltir: <strong>gerçek verim = kutudaki verim × 5 ÷ doluluk</strong>. Yukarıdaki 3.000 sayfalık toner %10 dolulukla kullanılırsa yalnızca 1.500 sayfa basar ve sarf payı 0,40 TL\'den 0,80 TL\'ye çıkar. Renkli yazıcılarda her renk için ayrı doluluk söz konusudur; renkli sayfa maliyetini bulmak için siyah, camgöbeği, macenta ve sarı kartuşları tek tek hesaplayıp sonuçları toplayabilirsiniz.',
    ] },
    { h: 'Hangi giderler dahil, hangileri değil?', ul: [
      '<strong>Toner ya da mürekkep:</strong> her zaman dahildir ve çoğu yazıcıda en büyük kalemdir.',
      '<strong>Kâğıt:</strong> isteğe bağlıdır. Çift taraflı baskıda bir yaprağa iki sayfa basıldığından kâğıt payını yarıya indirmek için paketteki yaprak sayısını iki katı yazabilirsiniz.',
      '<strong>Drum (görüntüleme ünitesi):</strong> bazı lazer yazıcılarda tonerle birlikte gelir, bazılarında ayrı satılır ve tonerden çok daha uzun ömürlüdür. Ayrı satılıyorsa eklemeyi unutmayın.',
      '<strong>Dahil olmayanlar:</strong> elektrik tüketimi, bakım kiti, fırın ünitesi, transfer kayışı, servis ücreti ve cihazın satın alma bedeli. Bunları da görmek isterseniz toplam tutarı cihazın beklenen ömürlük baskı adedine bölüp sonuca ekleyebilirsiniz.',
    ] },
    { h: 'Yazıcı ve kartuş seçerken karşılaştırma', p: [
      'Ucuz yazıcı çoğu zaman pahalı baskı demektir. Düşük fiyatlı bir mürekkep püskürtmeli yazıcının 180 sayfalık kartuşu 450 TL ise sayfa başı sarf maliyeti 2,50 TL\'dir; 10.000 sayfalık 3.500 TL\'lik bir lazer tonerde aynı değer 0,35 TL\'ye iner. Ayda birkaç sayfa basan bir ev kullanıcısı için bu fark önemsiz kalabilir, ancak ayda binlerce sayfa basan bir muhasebe bürosu, okul ya da hukuk bürosu için yıllık bütçeyi belirleyen temel etkendir.',
      'Aynı yazıcının standart ve yüksek kapasiteli kartuşlarını da bu araçla karşılaştırabilirsiniz. Yüksek kapasiteli kartuşun fiyatı daha yüksektir ama sayfa başı maliyeti genellikle belirgin biçimde düşüktür. Muadil ya da dolum toner değerlendirirken satıcının beyan ettiği verimin hangi dolulukla ölçüldüğünü sorun; verim beyanı gerçekçi değilse düşük fiyat yanıltıcı olur.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Yazıcıyla birlikte gelen başlangıç kartuşunun verimini satın alınan kartuşla aynı sanmak yaygın bir hatadır; başlangıç kartuşları çoğunlukla daha az dolu gelir. İkinci hata, mürekkep püskürtmeli yazıcılarda baş temizleme sırasında harcanan mürekkebi hesaba katmamaktır; seyrek kullanılan cihazlarda gerçek verim kutudaki değerin altında kalır. Üçüncüsü, fotoğraf baskısını düz yazı verimiyle hesaplamaktır: tam sayfa fotoğrafın doluluğu %5\'in kat kat üzerindedir.',
      'Sonuçlar girdiğiniz fiyat ve verim değerlerine dayalı bir tahmindir. Teklif hazırlama, kiralama sözleşmesi ya da toplu alım gibi mali kararlarda cihazınızın gerçek sayaç ve tüketim kayıtlarıyla karşılaştırma yapmanız önerilir.',
    ] },
  ],
  faq: [
    ['Sayfa başı maliyet formülü nedir?', 'Kartuş fiyatının sayfa verimine bölünmesiyle bulunur. Kâğıt ve drum giderini eklemek için bunların da birim maliyetleri (paket fiyatı bölü yaprak sayısı, drum fiyatı bölü drum ömrü) toplanır.'],
    ['Kutuda yazan sayfa verimi neye göre belirlenir?', 'Standart test sayfalarının sürekli basılmasıyla ölçülür ve yaklaşık yüzde 5 doluluk varsayar. Gerçek kullanımda sayfalarınız daha doluysa verim orantılı olarak düşer.'],
    ['Doluluk oranımı nasıl tahmin ederim?', 'Yalnızca yazı içeren mektup ve dilekçeler yüzde 5 civarındadır. Tablolu raporlar ve faturalar yüzde 7–10, grafikli sunumlar yüzde 15–25, tam sayfa fotoğraflar çok daha yüksek doluluk üretir. Bazı yazıcılar durum sayfasında ortalama doluluğu gösterir.'],
    ['Çift taraflı baskı maliyeti düşürür mü?', 'Toner tüketimini değiştirmez ama kâğıt giderini yarıya indirir. Hesaba yansıtmak için paketteki yaprak sayısını iki katı girebilirsiniz.'],
    ['Renkli sayfa maliyetini nasıl hesaplarım?', 'Her renk kartuşu için ayrı hesap yapıp toner paylarını toplayın. Dört kartuşun payları ile kâğıt payının toplamı renkli sayfa maliyetini verir.'],
    ['Drum ile toner aynı şey mi?', 'Hayır. Toner sayfaya aktarılan tozdur; drum ise görüntüyü kâğıda taşıyan ışığa duyarlı silindirdir. Bazı kartuşlarda ikisi tek parçadır, bazı yazıcılarda drum ayrı satılır ve birkaç toner ömrü kadar dayanır.'],
    ['Muadil toner sayfa maliyetini düşürür mü?', 'Fiyatı düşük olduğundan çoğunlukla düşürür; ancak gerçek verimi beyan edilenden az olabilir. Karşılaştırmayı satıcının beyanıyla değil, mümkünse kendi sayaç kayıtlarınızla yapın.'],
    ['Girdiğim fiyatlar kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız tutarlar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['toner-omru-hesapla', 'kagit-agirligi-hesapla', 'birim-maliyet-hesapla', 'birim-fiyat-karsilastir', 'kagit-boyutlari'],
};
