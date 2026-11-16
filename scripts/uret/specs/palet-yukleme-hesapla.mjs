export default {
  slug: 'palet-yukleme-hesapla',
  title: 'Palet Yükleme Hesaplama',
  h1Tail: 'bir palete kaç koli sığar?',
  pageTitle: 'Palet Yükleme Hesaplama – Bir Palete Kaç Koli Sığar?',
  description: 'Palet ve koli ölçülerini girin; bir kata ve tüm palete kaç koli sığdığını, kat sayısını, yük yüksekliğini, toplam ağırlığı ve alan kullanım oranını görün.',
  card: 'Palet ve koli ölçülerinden kat başına koli, kat sayısı, toplam koli ve palet ağırlığını hesaplayın.',
  category: 'gunluk',
  keywords: ['palet yükleme hesaplama', 'bir palete kaç koli sığar', 'palet koli hesaplama', 'euro palet koli sayısı', 'palet dizilimi', 'palet kat sayısı', 'palet ağırlığı hesaplama'],
  lead: 'Palet tabanının ve kolinizin ölçülerini yazın; araç kolileri düz, çevrilmiş ve iki bloklu karma dizilimlerle deneyerek <strong>bir kata en çok kaç koli sığdığını</strong>, yükseklik ve ağırlık sınırına göre palete toplam kaç koli yüklenebileceğini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'paletBoy', label: 'Palet boyu (cm)', type: 'number', value: '120' },
    { id: 'paletEn', label: 'Palet eni (cm)', type: 'number', value: '80' },
    { id: 'koliBoy', label: 'Koli boyu (cm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'koliEn', label: 'Koli eni (cm)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'koliYuk', label: 'Koli yüksekliği (cm)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'yukYuk', label: 'İzin verilen yük yüksekliği (cm)', type: 'number', value: '150', hint: 'Palet tahtası hariç, yalnızca kolilerin toplam yüksekliği.' },
    { id: 'koliKg', label: 'Koli ağırlığı (kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'azamiKg', label: 'Azami palet yükü (kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1000' },
  ],
  compute(v, h) {
    const L = h.pos(v.paletBoy, 'Palet boyu');
    const W = h.pos(v.paletEn, 'Palet eni');
    const a = h.pos(v.koliBoy, 'Koli boyu');
    const b = h.pos(v.koliEn, 'Koli eni');
    const y = h.pos(v.koliYuk, 'Koli yüksekliği');
    const Y = h.pos(v.yukYuk, 'İzin verilen yük yüksekliği');
    const kg = h.opt(v.koliKg, null, 'Koli ağırlığı');
    const maxKg = h.opt(v.azamiKg, null, 'Azami palet yükü');
    if (kg !== null && !(kg > 0)) h.err('"Koli ağırlığı" sıfırdan büyük olmalı ya da boş bırakılmalı.');
    if (maxKg !== null && !(maxKg > 0)) h.err('"Azami palet yükü" sıfırdan büyük olmalı ya da boş bırakılmalı.');
    if (maxKg !== null && kg === null) h.err('Ağırlık sınırını uygulamak için "Koli ağırlığı" alanını da doldurun.');
    const fl = (x) => Math.floor(x + 1e-9);
    // P×Q tabana p×q koliyi iki bloklu dizilimle yerleştir: k sıra düz + kalan şeritte çevrilmiş.
    const blok = (P, Q, p, q) => {
      let en = { n: 0, duz: 0, cevrik: 0 };
      const kMax = fl(P / p);
      for (let k = 0; k <= kMax; k++) {
        const duz = k * fl(Q / q);
        const kalan = P - k * p;
        const cevrik = fl(kalan / q) * fl(Q / p);
        if (duz + cevrik > en.n) en = { n: duz + cevrik, duz, cevrik };
      }
      return en;
    };
    // "Düz" = koli boyu palet boyuna paralel. 2. ve 3. adayda blokların anlamı terstir, yer değiştir.
    const ters = (c) => ({ n: c.n, duz: c.cevrik, cevrik: c.duz });
    const adaylar = [blok(L, W, a, b), ters(blok(L, W, b, a)), ters(blok(W, L, a, b)), blok(W, L, b, a)];
    let en = adaylar[0];
    for (const c of adaylar) if (c.n > en.n) en = c;
    if (en.n < 1) h.err('Koli tabanı palete sığmıyor. Koli ölçülerini ya da palet ölçüsünü kontrol edin.');
    const kat = fl(Y / y);
    if (kat < 1) h.err('Koli yüksekliği izin verilen yük yüksekliğinden büyük; yükseklik sınırını artırın.');
    let toplam = en.n * kat;
    let sinir = 'Yükseklik';
    if (maxKg !== null) {
      const agirlikAdet = fl(maxKg / kg);
      if (agirlikAdet < 1) h.err('Tek bir koli bile azami palet yükünü aşıyor; ağırlık değerlerini kontrol edin.');
      if (agirlikAdet < toplam) { toplam = agirlikAdet; sinir = 'Ağırlık'; }
    }
    const doluKat = Math.ceil(toplam / en.n - 1e-9);
    const dizilim = en.duz > 0 && en.cevrik > 0 ? `Karma: ${en.duz} düz + ${en.cevrik} çevrilmiş` : 'Tek yönlü (hepsi aynı yönde)';
    const rows = [
      ['Paletteki toplam koli', h.fmt(toplam, 0) + ' adet'],
      ['Kat başına koli', h.fmt(en.n, 0) + ' adet'],
      ['Kat sayısı', h.fmt(doluKat, 0) + ' kat'],
      ['Yük yüksekliği', h.fmt(doluKat * y, 1) + ' cm'],
      ['Taban alanı kullanımı', '%' + h.fmt((en.n * a * b) / (L * W) * 100, 1)],
      ['Kat dizilimi', dizilim],
      ['Belirleyici sınır', sinir],
    ];
    if (kg !== null) rows.push(['Toplam koli ağırlığı', h.fmt(toplam * kg, 1) + ' kg']);
    rows.push(['Toplam koli hacmi', h.fmt(toplam * a * b * y / 1e6, 3) + ' m³']);
    return {
      rows,
      note: 'Koliler dik konumda (yüksekliği sabit) ve palet dışına taşmadan dizilir. Palet tahtasının kendi yüksekliği ve ağırlığı hesaba dahil değildir; izin verilen yük yüksekliğini palet hariç, yalnızca koli yığını için girin.',
    };
  },
  cases: [
    { in: { paletBoy: '120', paletEn: '80', koliBoy: '40', koliEn: '30', koliYuk: '25', yukYuk: '150', koliKg: '10' }, out: { 'Paletteki toplam koli': '48 adet', 'Kat başına koli': '8 adet', 'Kat sayısı': '6 kat', 'Yük yüksekliği': '150 cm', 'Taban alanı kullanımı': '%100', 'Toplam koli ağırlığı': '480 kg', 'Toplam koli hacmi': '1,44 m³' } },
    { in: { paletBoy: '120', paletEn: '100', koliBoy: '60', koliEn: '40', koliYuk: '30', yukYuk: '100' }, out: { 'Paletteki toplam koli': '15 adet', 'Kat başına koli': '5 adet', 'Kat sayısı': '3 kat', 'Yük yüksekliği': '90 cm', 'Taban alanı kullanımı': '%100', 'Kat dizilimi': 'Karma: 2 düz + 3 çevrilmiş' } },
    { in: { paletBoy: '120', paletEn: '80', koliBoy: '40', koliEn: '30', koliYuk: '25', yukYuk: '150', koliKg: '10', azamiKg: '400' }, out: { 'Paletteki toplam koli': '40 adet', 'Kat sayısı': '5 kat', 'Yük yüksekliği': '125 cm', 'Belirleyici sınır': 'Ağırlık', 'Toplam koli ağırlığı': '400 kg' } },
    { in: { paletBoy: '120', paletEn: '80', koliBoy: '50', koliEn: '50', koliYuk: '50', yukYuk: '120' }, out: { 'Paletteki toplam koli': '4 adet', 'Kat başına koli': '2 adet', 'Kat sayısı': '2 kat', 'Taban alanı kullanımı': '%52,1' } },
    { in: { paletBoy: '120', paletEn: '80', koliBoy: '60', koliEn: '40', koliYuk: '20', yukYuk: '160' }, out: { 'Paletteki toplam koli': '32 adet', 'Kat başına koli': '4 adet', 'Kat sayısı': '8 kat', 'Kat dizilimi': 'Tek yönlü (hepsi aynı yönde)' } },
    { in: { paletBoy: '120', paletEn: '80', koliBoy: '130', koliEn: '90', koliYuk: '20', yukYuk: '150' }, error: true },
    { in: { paletBoy: '120', paletEn: '80', koliBoy: '40', koliEn: '30', koliYuk: '200', yukYuk: '150' }, error: true },
    { in: { paletBoy: '120', paletEn: '80', koliBoy: '', koliEn: '30', koliYuk: '25', yukYuk: '150' }, error: true },
  ],
  howto: [
    'Palet boyunu ve enini santimetre olarak yazın. Varsayılan değerler 120 × 80 cm ölçüsündeki yaygın palet içindir; farklı bir palet kullanıyorsanız değiştirin.',
    'Kolinin boyunu, enini ve yüksekliğini dıştan dışa ölçerek girin. Şişkin ya da bantlı kolilerde en geniş noktayı esas alın.',
    'Kolilerin ulaşabileceği en büyük yığın yüksekliğini "İzin verilen yük yüksekliği" alanına yazın; palet tahtasını bu değere katmayın.',
    'Ağırlık da sizin için sınırsa koli ağırlığını ve paletin taşıyabileceği azami yükü ekleyin; boş bırakırsanız yalnızca ölçülere göre hesap yapılır.',
    '"Hesapla" düğmesine basın; toplam koli, kat başına koli, kat sayısı ve hangi sınırın belirleyici olduğu listelenir.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılır?', p: [
      'Palet yükleme hesabı iki ayrı sorudan oluşur: bir kata kaç koli sığar ve üst üste kaç kat dizilebilir. İkinci soru basittir; izin verilen yük yüksekliği koli yüksekliğine bölünür ve sonuç aşağı yuvarlanır. 150 cm sınırında 25 cm yüksekliğindeki koliden 150 ÷ 25 = 6 kat çıkar. Koli 26 cm olsaydı 5 kat dizilir, kalan 20 cm boşta kalırdı.',
      'Bir kata sığan koli sayısı ise dizilime bağlıdır. Araç önce kolileri hepsi aynı yöne bakacak biçimde iki ayrı yönde dener: boyu paletin boyuna paralel ve boyu paletin enine paralel. Ardından <strong>iki bloklu karma dizilimi</strong> dener: tabanın bir bölümüne düz sıralar, kalan şeride doksan derece çevrilmiş koliler yerleştirilir. Bütün seçenekler arasından en çok koli alan dizilim seçilir ve sonuçta hangi dizilimin kullanıldığı yazılır.',
    ] },
    { h: 'Çözümlü örnek: 120 × 80 palete 40 × 30 × 25 cm koli', p: [
      'Koliyi boyu paletin boyuna gelecek şekilde dizerseniz 120 ÷ 40 = 3 sıra ve 80 ÷ 30 = 2 sıra, yani 6 koli sığar; enine 20 cm boşluk kalır. Koliyi çevirirseniz 120 ÷ 30 = 4 ve 80 ÷ 40 = 2, toplam <strong>8 koli</strong> eder ve taban tamamen dolar. Sekiz kolinin taban alanı 8 × 1.200 = 9.600 cm², paletin alanı da 9.600 cm² olduğundan kullanım oranı %100\'dür.',
      'Yükseklik sınırı 150 cm ise 6 kat dizilir ve palete 8 × 6 = <strong>48 koli</strong> yüklenir. Her koli 10 kg ise toplam koli ağırlığı 480 kg olur. Aynı örnekte paletin azami yükünü 400 kg girerseniz en fazla 400 ÷ 10 = 40 koli yüklenebilir; bu da 5 kat ve 125 cm yük yüksekliği demektir. Sonuçta "Belirleyici sınır" satırında yükseklik yerine ağırlık yazar.',
    ] },
    { h: 'Karma dizilim ne kazandırır?', p: [
      '120 × 100 cm palete 60 × 40 cm koli yerleştirdiğinizi düşünün. Hepsi aynı yönde dizildiğinde en fazla 4 koli sığar. Oysa paletin uzun kenarı boyunca iki koliyi düz koyup (120 × 40 cm yer kaplar) kalan 60 cm derinliğindeki şeride üç koliyi çevirerek yerleştirirseniz toplam <strong>5 koli</strong> sığar ve taban yine tam dolar. Araç bu tür dizilimleri kendiliğinden bulur ve "Karma: 2 düz + 3 çevrilmiş" biçiminde bildirir.',
      'Karma dizilimin bir yararı daha vardır: katları birbirine göre döndürerek istiflediğinizde koliler tuğla örgüsü gibi birbirini kilitler ve yığın daha dengeli durur. Tek yönlü dizilimde ise koliler sütun oluşturur; bu, kolinin dikey dayanımını en iyi kullanan yöntemdir ancak yığın yanal sarsıntıya daha açıktır.',
    ] },
    { h: 'Yaygın palet ölçüleri', ul: [
      '<strong>120 × 80 cm</strong>: Avrupa\'da ve Türkiye\'de perakende ile lojistikte en sık görülen ölçü.',
      '<strong>120 × 100 cm</strong>: sanayi ve ihracat yüklerinde yaygın, daha geniş tabanlı palet.',
      '<strong>80 × 60 cm</strong>: yarım palet; market içi teşhir ve küçük sevkiyatlarda kullanılır.',
      '<strong>110 × 110 cm</strong>: bazı deniz yolu ve Asya kaynaklı yüklerde karşılaşılan kare palet.',
    ], p: [
      'Paletin taşıyabileceği yük ve depo rafının ya da aracın izin verdiği yükseklik, paletin tipine, malzemesine ve taşıma koşuluna göre değişir. Bu değerleri tedarikçinizden, deponuzdan ya da nakliye firmanızdan öğrenip ilgili alanlara kendiniz girmelisiniz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Koli ölçüsünü içten içe yazmak: istifte yer kaplayan dış ölçüdür, karton kalınlığı birkaç milimetre fark yaratır.',
      'Yük yüksekliğine palet tahtasını da katmak: araç yalnızca kolilerin yüksekliğini sayar; tahtanın yüksekliğini sınırdan önceden düşün.',
      'Yalnızca hacme bakmak: palet hacmini koli hacmine bölmek, kolilerin tam sayı olarak dizilmesi gerektiğini görmez ve gerçekte sığmayan bir sayı verir.',
      'Ağırlığı unutmak: içecek, deterjan ya da seramik gibi ağır ürünlerde yükseklik sınırına gelmeden ağırlık sınırı dolar.',
      'Taşmayı hesaba katmamak: palet kenarından taşan koliler hem hasar görür hem de yan yana palet dizilimini bozar; araç taşmaya izin vermez.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Hesap, tüm kolilerin aynı ölçüde olduğunu ve dik durduğunu, yani yüksekliğinin değişmediğini varsayar. Koliyi yan yatırmak mümkünse yüksekliği ve taban ölçülerini değiştirerek aracı yeniden çalıştırabilirsiniz. Araç düz, çevrilmiş ve iki bloklu dizilimleri dener; bazı özel ölçülerde fırıldak biçimli daha karmaşık dizilimler bir kata bir koli fazla sığdırabilir, bu tür dizilimler hesaba dahil değildir.',
      'Sonuçlar planlama ve teklif hazırlığı içindir. Kolinin üst üste kaç kat taşıyabileceği karton kalitesine, ürünün kendisine ve depolama süresine bağlıdır; ezilme riski olan ürünlerde üreticinin istif sınırını esas alın. Taşıma güvenliği, streçleme ve yük sabitleme konularında nakliye firmanızın kurallarına uyun.',
    ] },
  ],
  faq: [
    ['Bir Euro palete kaç koli sığar?', 'Bu tamamen koli ölçüsüne bağlıdır. 120 × 80 cm palete 40 × 30 cm tabanlı koliden kat başına 8, 60 × 40 cm koliden kat başına 4 adet sığar. Kat sayısını koli yüksekliği ve izin verilen yük yüksekliği belirler; ölçülerinizi girerek kesin sayıyı görebilirsiniz.'],
    ['Yük yüksekliğine palet tahtası dahil mi?', 'Hayır. Araç yalnızca kolilerin toplam yüksekliğini hesaplar. Depo ya da araç için verilen toplam yükseklik sınırından paletin kendi yüksekliğini çıkarıp kalan değeri yazmalısınız.'],
    ['Koli ağırlığını girmek zorunlu mu?', 'Değil. Ağırlık alanlarını boş bırakırsanız hesap yalnızca ölçülere göre yapılır. Koli ağırlığını girerseniz toplam ağırlık gösterilir; azami palet yükünü de girerseniz koli sayısı bu sınıra göre kısıtlanır.'],
    ['Taban alanı kullanımı neyi gösterir?', 'Bir kattaki kolilerin kapladığı alanın palet tabanına oranıdır. %100, tabanın boşluksuz dolduğunu gösterir. Oran düşükse koli ölçüsü palete iyi uymuyor demektir; farklı bir koli ölçüsü ya da palet seçmek sevkiyat maliyetini azaltabilir.'],
    ['Araç kolileri palet dışına taşırır mı?', 'Hayır. Bütün dizilimler palet sınırları içinde kalacak biçimde hesaplanır. Uygulamada birkaç santimetrelik taşmaya izin veriyorsanız palet ölçüsünü o kadar büyük girerek sonucu görebilirsiniz.'],
    ['Farklı boyda koliler için kullanılabilir mi?', 'Araç tek tip koli için tasarlanmıştır. Karışık yüklerde her koli tipini ayrı hesaplayıp katları ağır ve büyük koliler altta olacak şekilde planlamak pratik bir yaklaşımdır.'],
    ['Ağırlık sınırı dolduğunda son kat eksik mi kalır?', 'Evet, kalabilir. Araç ağırlık sınırına sığan en büyük koli sayısını verir ve bu sayıyı taşımak için gereken kat sayısını gösterir. Son kat tam dolmuyorsa kolileri ortaya toplamak yerine dengeli dağıtmak gerekir.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; palet ve koli bilgileriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['koli-sigdirma-hesapla', 'desi-hesapla', 'hacim-hesapla', 'ev-tasima-koli-hesapla', 'doluluk-orani-hesapla'],
};
