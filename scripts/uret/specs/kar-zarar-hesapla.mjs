export default {
  slug: 'kar-zarar-hesapla',
  title: 'Kâr Zarar Hesaplama',
  h1Tail: 'alış ve satış fiyatından',
  pageTitle: 'Kâr Zarar Hesaplama – Alış Satış Fiyatından Kâr Oranı Bulma',
  description: 'Alış ve satış fiyatını yazın; kâr ya da zarar tutarını, maliyete göre kâr oranını ve satışa göre kâr marjını adet ve ek giderlerle birlikte hesaplayın.',
  card: 'Alış ve satış fiyatından kâr ya da zarar tutarını, maliyete ve satışa göre yüzde oranlarını hesaplayın.',
  category: 'finans',
  keywords: ['kâr zarar hesaplama', 'kar oranı hesaplama', 'zarar yüzdesi hesaplama', 'alış satış kâr hesaplama', 'yüzde kaç kâr ettim', 'kâr tutarı bulma', 'maliyet üzerinden kâr'],
  lead: `Bir malı kaça aldığınızı ve kaça sattığınızı yazın; araç <strong>kâr ya da zarar tutarını</strong>, bunun maliyete oranını ve satış fiyatı içindeki payını hesaplasın. Adet ve nakliye, komisyon gibi ek giderleri de ekleyerek toplam sonucu görebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'alis', label: 'Birim alış fiyatı (maliyet)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'satis', label: 'Birim satış fiyatı', type: 'number', placeholder: 'Örn. 125' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1', hint: 'Tek ürün için 1 bırakın.' },
    { id: 'gider', label: 'Toplam ek gider (isteğe bağlı)', type: 'number', placeholder: 'Örn. 300', hint: 'Nakliye, komisyon, ambalaj gibi tüm parti için yapılan giderler.' },
  ],
  compute(v, h) {
    const alis = h.nonneg(v.alis, 'Birim alış fiyatı');
    const satis = h.nonneg(v.satis, 'Birim satış fiyatı');
    const adet = h.pos(h.opt(v.adet, 1, 'Adet') + '', 'Adet');
    const gider = h.opt(v.gider, 0, 'Toplam ek gider');
    if (gider < 0) h.err('"Toplam ek gider" negatif olamaz.');
    const maliyet = alis * adet + gider;
    const gelir = satis * adet;
    if (maliyet === 0 && gelir === 0) h.err('Alış ve satış fiyatının ikisi de sıfır olamaz; en az birini yazın.');
    const fark = gelir - maliyet;
    const yuzde = (x) => (x < -5e-7 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const durum = Math.abs(fark) < 0.005 ? 'Başabaş' : fark > 0 ? 'Kâr' : 'Zarar';
    const sonuc = durum === 'Başabaş' ? 'Kâr da zarar da yok' : `${h.para(Math.abs(fark))} ${durum === 'Kâr' ? 'kâr' : 'zarar'}`;
    return {
      rows: [
        ['Sonuç', sonuc],
        ['Maliyete göre oran', maliyet > 0 ? yuzde((fark / maliyet) * 100) : '—'],
        ['Satışa göre oran (marj)', gelir > 0 ? yuzde((fark / gelir) * 100) : '—'],
        ['Toplam maliyet', h.para(maliyet)],
        ['Toplam satış geliri', h.para(gelir)],
        ['Birim başına kâr/zarar', h.para(fark / adet)],
      ],
      note: 'Oranlar girdiğiniz tutarlar üzerinden hesaplanır. Fiyatları KDV hariç ya da ikisini de KDV dahil yazın; karışık yazarsanız sonuç yanıltıcı olur.',
    };
  },
  cases: [
    { in: { alis: '100', satis: '125' }, out: { 'Sonuç': '25,00 TL kâr', 'Maliyete göre oran': '%25', 'Satışa göre oran (marj)': '%20' } },
    { in: { alis: '200', satis: '150' }, out: { 'Sonuç': '50,00 TL zarar', 'Maliyete göre oran': '-%25', 'Satışa göre oran (marj)': '-%33,33' } },
    { in: { alis: '80', satis: '100', adet: '50', gider: '300' }, out: { 'Sonuç': '700,00 TL kâr', 'Maliyete göre oran': '%16,28', 'Satışa göre oran (marj)': '%14', 'Toplam maliyet': '4.300,00 TL', 'Toplam satış geliri': '5.000,00 TL', 'Birim başına kâr/zarar': '14,00 TL' } },
    { in: { alis: '50', satis: '50' }, out: { 'Sonuç': 'Kâr da zarar da yok', 'Maliyete göre oran': '%0' } },
    { in: { alis: '12,50', satis: '20', adet: '40' }, out: { 'Sonuç': '300,00 TL kâr', 'Maliyete göre oran': '%60', 'Satışa göre oran (marj)': '%37,5' } },
    { in: { alis: '1500', satis: '1200', adet: '2', gider: '100' }, out: { 'Sonuç': '700,00 TL zarar', 'Toplam maliyet': '3.100,00 TL', 'Maliyete göre oran': '-%22,58' } },
    { in: { alis: '', satis: '125' }, error: true },
    { in: { alis: '100', satis: '125', adet: '0' }, error: true },
    { in: { alis: '0', satis: '0' }, error: true },
  ],
  howto: [
    `"Birim alış fiyatı" alanına ürünün size maliyetini, "Birim satış fiyatı" alanına müşteriye sattığınız fiyatı yazın.`,
    `Birden fazla ürün sattıysanız "Adet" alanını değiştirin; tek ürün için 1 kalabilir.`,
    `Nakliye, pazaryeri komisyonu, ambalaj gibi partinin tamamı için yaptığınız harcamalar varsa toplamını "Toplam ek gider" alanına girin.`,
    `"Hesapla" düğmesine basın. İlk satırda kâr ya da zarar tutarını, altında maliyete ve satışa göre yüzde oranlarını görürsünüz.`,
  ],
  sections: [
    { h: 'Kâr ve zarar nasıl hesaplanır?', p: [
      `Ticaretin en temel hesabı şudur: bir malı satarak elde ettiğiniz gelirden o malın size maliyetini çıkarırsınız. Sonuç pozitifse <strong>kâr</strong>, negatifse <strong>zarar</strong> etmişsinizdir; sıfırsa başabaş noktasındasınız. Formülle yazarsak: <strong>Kâr/Zarar = Toplam satış geliri − Toplam maliyet</strong>.`,
      `Bu araçta toplam maliyet, birim alış fiyatının adetle çarpımına ek giderlerin eklenmesiyle bulunur. Toplam satış geliri ise birim satış fiyatı ile adedin çarpımıdır. Ek gider alanını boş bırakırsanız yalnızca alış ve satış fiyatı karşılaştırılır.`,
    ] },
    { h: 'Maliyete göre oran ile satışa göre oran arasındaki fark', p: [
      `Aynı kâr tutarı iki farklı yüzdeyle ifade edilebilir ve bu ikisi sık sık karıştırılır. <strong>Maliyete göre oran</strong>, kârın maliyete bölünmesiyle bulunur ve "bu maldan yüzde kaç kazandım" sorusunun okul matematiğindeki cevabıdır. <strong>Satışa göre oran</strong> ise kârın satış gelirine bölünmesidir; işletmecilikte kâr marjı olarak anılır ve "kasaya giren her 100 liranın kaçı bende kalıyor" sorusunu yanıtlar.`,
      `100 liraya alıp 125 liraya sattığınız bir üründe kâr 25 liradır. Maliyete göre oran 25 ÷ 100 = %25, satışa göre oran 25 ÷ 125 = %20 çıkar. Kâr söz konusu olduğunda satışa göre oran her zaman maliyete göre orandan küçüktür, çünkü payda daha büyüktür. Bir teklif ya da rapor okurken hangi oranın kastedildiğini mutlaka sorun.`,
    ] },
    { h: 'Çözümlü örnek: adet ve ek giderle hesap', p: [
      `Bir esnafın tanesi 80 liradan 50 adet ürün aldığını, tanesini 100 liradan sattığını ve tüm parti için 300 lira kargo ödediğini düşünelim. Toplam maliyet 80 × 50 + 300 = 4.300 liradır. Toplam satış geliri 100 × 50 = 5.000 liradır. Aradaki fark 700 lira kârdır.`,
      `Maliyete göre oran 700 ÷ 4.300 = %16,28, satışa göre oran 700 ÷ 5.000 = %14 olur. Birim başına kâr ise 700 ÷ 50 = 14 liradır. Kargo gideri hesaba katılmasaydı birim kâr 20 lira görünecekti; küçük görünen ek giderlerin kârı ne kadar erittiği bu örnekte açıkça ortaya çıkar.`,
    ] },
    { h: 'Zarar durumunda oranlar nasıl okunur?', p: [
      `Satış geliri maliyetin altında kaldığında araç sonucu "zarar" olarak yazar ve oranları eksi işaretiyle gösterir. 200 liraya alınan bir ürün 150 liraya satılırsa zarar 50 liradır; maliyete göre oran -%25, satışa göre oran -%33,33 olur. Burada dikkat çeken nokta, zararda satışa göre oranın mutlak değerce daha büyük çıkmasıdır, çünkü bu kez payda olan satış geliri maliyetten küçüktür.`,
      `Sezon sonu indirimlerinde, son kullanma tarihi yaklaşan ürünlerde ya da stok eritme kampanyalarında bilerek zararına satış yapılabilir. Böyle bir karar verirken zararı tek ürün üzerinden değil, toplam parti üzerinden görmek daha sağlıklıdır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>KDV'yi karıştırmak:</strong> Alış fiyatını KDV hariç, satış fiyatını KDV dahil yazmak kârı olduğundan yüksek gösterir. İki fiyatı da aynı esasla girin.`,
      `<strong>Ek giderleri unutmak:</strong> Kargo, pazaryeri komisyonu, ödeme altyapısı kesintisi, ambalaj ve iade maliyetleri gerçek maliyetin parçasıdır.`,
      `<strong>Yüzdeleri toplamak:</strong> Önce %20 kâr, sonra %20 zarar eden biri başladığı yere dönmez; 100 lira önce 120, sonra 96 lira olur.`,
      `<strong>Kâr oranını marjla karıştırmak:</strong> "Yüzde 50 kârla satıyorum" diyen biri çoğunlukla maliyete göre oranı kasteder; bu, satışa göre yalnızca %33,33 marj demektir.`,
      `<strong>Genel giderleri hesaba katmamak:</strong> Kira, personel, elektrik gibi sabit giderler ürün bazındaki bu hesabın dışındadır; işletmenin gerçek net kârı daha düşüktür.`,
    ] },
    { h: 'Hızlı başvuru: maliyete göre oran kaç marja denk gelir?', ul: [
      `Maliyete göre <strong>%10</strong> kâr, satışa göre yaklaşık %9,09 marj eder.`,
      `Maliyete göre <strong>%25</strong> kâr, satışa göre %20 marj eder.`,
      `Maliyete göre <strong>%50</strong> kâr, satışa göre %33,33 marj eder.`,
      `Maliyete göre <strong>%100</strong> kâr, yani iki katına satış, satışa göre %50 marj eder.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Araç yalnızca yazdığınız tutarlar arasındaki aritmetik farkı hesaplar; vergi, stopaj, finansman maliyeti, kur farkı ya da enflasyon etkisi gibi kalemleri kendiliğinden hesaba katmaz. Sonuç bilgilendirme amaçlıdır; vergi beyanı, fiyatlandırma politikası ya da yatırım kararı gibi mali konularda mali müşavirinize danışın.`,
    ] },
  ],
  faq: [
    [`Kâr oranı nasıl hesaplanır?`, `Kâr tutarını maliyete bölüp 100 ile çarparsınız. 400 liraya alıp 500 liraya sattığınız bir üründe kâr 100 liradır ve kâr oranı 100 ÷ 400 × 100 = %25 olur. Araç bu değeri "Maliyete göre oran" satırında gösterir.`],
    [`Zarar yüzdesi nasıl bulunur?`, `Zarar tutarı maliyete bölünür ve 100 ile çarpılır. 200 liralık ürünü 150 liraya sattıysanız 50 lira zarar etmişsinizdir; zarar oranı 50 ÷ 200 × 100 = %25'tir. Araç bunu eksi işaretli olarak yazar.`],
    [`Kâr oranı ile kâr marjı aynı şey mi?`, `Hayır. Kâr oranı kârın maliyete, kâr marjı ise kârın satış fiyatına bölünmesidir. 100 liralık maliyet ve 125 liralık satışta kâr oranı %25, kâr marjı %20'dir. Araç iki değeri ayrı satırlarda verir.`],
    [`Fiyatları KDV dahil mi yazmalıyım?`, `Hangisini seçerseniz seçin, alış ve satış fiyatını aynı esasla yazmanız gerekir. KDV mükellefi işletmeler için KDV bir gelir ya da gider olmadığından, genellikle iki fiyatı da KDV hariç girmek daha doğru sonuç verir.`],
    [`Ek gider alanına neler yazılır?`, `Partinin tamamı için katlandığınız ve alış fiyatına dahil olmayan harcamaları yazarsınız: nakliye, kargo, gümrük masrafı, pazaryeri ya da aracı komisyonu, ambalaj, etiket gibi. Tutar adetle çarpılmaz, toplam maliyete doğrudan eklenir.`],
    [`Belirli bir kâr oranı için satış fiyatını nasıl bulurum?`, `Maliyeti (1 + kâr oranı ÷ 100) ile çarparsınız. 80 liralık maliyete %25 kâr eklemek için 80 × 1,25 = 100 lira satış fiyatı gerekir. Bulduğunuz fiyatı bu araca yazarak sonucu doğrulayabilirsiniz.`],
    [`Ondalıklı adet girebilir miyim?`, `Evet. Kilogram, metre ya da litreyle satılan ürünlerde adet alanına 2,5 gibi ondalıklı değer yazabilirsiniz; birim fiyatları da aynı ölçü birimi üzerinden girmeniz yeterlidir.`],
    [`Girdiğim fiyatlar kaydediliyor mu?`, `Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız alış, satış ve gider tutarları sunucuya gönderilmez, saklanmaz ve başka kimseyle paylaşılmaz.`],
  ],
  related: ['kar-marji-hesapla', 'kar-ekleme-orani-hesapla', 'iskonto-hesapla', 'kdv-hesapla', 'yuzde-hesapla', 'birim-maliyet-hesapla'],
};
