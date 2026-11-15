export default {
  slug: 'katki-payi-hesapla',
  title: 'Katkı Payı Hesaplama',
  h1Tail: 'birim katkı payı ve oranı',
  pageTitle: 'Katkı Payı Hesaplama – Birim Katkı Payı, Oranı ve Başabaş',
  description: 'Birim satış fiyatı ve birim değişken maliyetten katkı payını ve katkı payı oranını hesaplayın; adet ve sabit gider girerek toplam katkıyı ve başabaş noktasını görün.',
  card: 'Satış fiyatı ile değişken maliyet arasındaki farkı, katkı payı oranını ve başabaş satış adedini hesaplayın.',
  category: 'finans',
  keywords: ['katkı payı hesaplama', 'katkı payı nedir', 'katkı payı oranı', 'birim katkı payı', 'katkı marjı hesaplama', 'değişken maliyet', 'katkı payı formülü', 'başabaş adedi'],
  lead: 'Sattığınız her birimin sabit giderleri karşılamaya ve kâra ne kadar katkı yaptığını bulun. <strong>Birim katkı payı = Satış fiyatı − Birim değişken maliyet</strong>; adet ve sabit gider girerseniz araç toplam katkıyı, faaliyet kârını ve başabaş noktasını da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'fiyat', label: 'Birim satış fiyatı (TL)', type: 'number', placeholder: 'Örn. 200', hint: 'KDV hariç. Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
    { id: 'degisken', label: 'Birim değişken maliyet (TL)', type: 'number', placeholder: 'Örn. 120', hint: 'Hammadde, ambalaj, komisyon, kargo gibi adet başına giderler.' },
    { id: 'adet', label: 'Satış adedi', type: 'number', placeholder: 'İsteğe bağlı, örn. 1000' },
    { id: 'sabit', label: 'Dönem sabit giderleri (TL)', type: 'number', placeholder: 'İsteğe bağlı, örn. 50000', hint: 'Kira, maaş, abonelik gibi satış adedinden bağımsız giderler.' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const fiyat = h.pos(v.fiyat, 'Birim satış fiyatı');
    const deg = h.nonneg(v.degisken, 'Birim değişken maliyet');
    const kp = fiyat - deg;
    const rows = [
      ['Birim katkı payı', h.para(kp)],
      ['Katkı payı oranı', yuzde(kp / fiyat * 100)],
      ['Değişken maliyet oranı', '%' + h.fmt(deg / fiyat * 100, 2)],
    ];
    let adet = null;
    if (dolu(v.adet)) {
      adet = h.nonneg(v.adet, 'Satış adedi');
      rows.push(['Toplam satış tutarı', h.para(fiyat * adet)]);
      rows.push(['Toplam katkı payı', h.para(kp * adet)]);
    }
    let note = 'Katkı payı, sabit giderler düşülmeden önceki tutardır; kâr değildir.';
    if (dolu(v.sabit)) {
      const sabit = h.nonneg(v.sabit, 'Dönem sabit giderleri');
      if (adet !== null) rows.push(['Faaliyet kârı', h.para(kp * adet - sabit)]);
      if (kp > 1e-12) {
        const bb = sabit / kp;
        rows.push(['Başabaş satış adedi', h.fmt(bb, 2) + ' adet']);
        rows.push(['Başabaş cirosu', h.para(bb * fiyat)]);
        note = 'Başabaş adedi, toplam katkı payının sabit giderlere eşitlendiği satış miktarıdır. Kesirli çıkan adet yukarı yuvarlanarak okunmalıdır.';
      } else {
        note = 'Birim katkı payı sıfır ya da negatif olduğu için başabaş noktası yoktur: bu fiyatla ne kadar çok satılırsa satılsın sabit giderler karşılanamaz.';
      }
    } else if (kp < 0) {
      note = 'Birim katkı payı negatif: ürün değişken maliyetinin altında satılıyor, her satış zararı büyütür.';
    }
    return { rows, note };
  },
  cases: [
    { in: { fiyat: '200', degisken: '120', adet: '1000', sabit: '50000' }, out: { 'Birim katkı payı': '80,00 TL', 'Katkı payı oranı': '%40', 'Değişken maliyet oranı': '%60', 'Toplam satış tutarı': '200.000,00 TL', 'Toplam katkı payı': '80.000,00 TL', 'Faaliyet kârı': '30.000,00 TL', 'Başabaş satış adedi': '625 adet', 'Başabaş cirosu': '125.000,00 TL' } },
    { in: { fiyat: '50', degisken: '30' }, out: { 'Birim katkı payı': '20,00 TL', 'Katkı payı oranı': '%40', 'Değişken maliyet oranı': '%60' } },
    { in: { fiyat: '100', degisken: '120', adet: '10' }, out: { 'Birim katkı payı': '-20,00 TL', 'Katkı payı oranı': '-%20', 'Toplam katkı payı': '-200,00 TL' } },
    { in: { fiyat: '75', degisken: '45', sabit: '90000' }, out: { 'Birim katkı payı': '30,00 TL', 'Katkı payı oranı': '%40', 'Başabaş satış adedi': '3.000 adet', 'Başabaş cirosu': '225.000,00 TL' } },
    { in: { fiyat: '1250', degisken: '500', adet: '40', sabit: '36000' }, out: { 'Birim katkı payı': '750,00 TL', 'Katkı payı oranı': '%60', 'Toplam katkı payı': '30.000,00 TL', 'Faaliyet kârı': '-6.000,00 TL', 'Başabaş satış adedi': '48 adet', 'Başabaş cirosu': '60.000,00 TL' } },
    { in: { fiyat: '9,99', degisken: '3,33', adet: '300' }, out: { 'Birim katkı payı': '6,66 TL', 'Katkı payı oranı': '%66,67', 'Toplam katkı payı': '1.998,00 TL' } },
    { in: { fiyat: '0', degisken: '120' }, error: true },
    { in: { fiyat: '200', degisken: '-1' }, error: true },
    { in: { fiyat: '200', degisken: '' }, error: true },
  ],
  howto: [
    'Ürünün ya da hizmetin KDV hariç birim satış fiyatını yazın.',
    'Bir birim satmak için katlandığınız değişken maliyetleri toplayıp ikinci alana girin: hammadde ya da alış bedeli, ambalaj, kargo, pazaryeri ve ödeme komisyonu, parça başı işçilik gibi.',
    'Toplam katkıyı görmek için dönem satış adedini, başabaş noktasını görmek için dönem sabit giderlerini yazın. Bu iki alan isteğe bağlıdır.',
    '"Hesapla" düğmesine basın. Birim katkı payı ve oranı her durumda; toplam katkı, faaliyet kârı ve başabaş değerleri girdiğiniz bilgilere göre listelenir.',
  ],
  sections: [
    { h: 'Katkı payı nedir?', p: [
      'Katkı payı (katkı marjı), bir ürünün satış fiyatından o ürünü satmak için doğrudan katlanılan değişken maliyetler düşüldükten sonra geriye kalan tutardır. Bu tutar önce kira, maaş, muhasebe ücreti gibi satışla birlikte artıp azalmayan sabit giderleri karşılamaya gider; sabit giderler tamamen karşılandıktan sonraki her birimin katkı payı doğrudan kâra dönüşür. Adı da buradan gelir: her satış, sabit giderlere ve kâra bir "katkı" yapar.',
      'Kavram, maliyetleri davranışlarına göre ikiye ayırmaya dayanır. <strong>Değişken maliyetler</strong> satış miktarıyla orantılı değişir: bir tane daha satarsanız bir tane daha hammadde, bir kutu daha, bir kargo ücreti daha ödersiniz. <strong>Sabit giderler</strong> ise ay içinde ister on ister bin adet satın, aynı kalır.',
    ] },
    { h: 'Formüller', ul: [
      '<strong>Birim katkı payı</strong> = Birim satış fiyatı − Birim değişken maliyet',
      '<strong>Katkı payı oranı</strong> = Birim katkı payı ÷ Birim satış fiyatı × 100',
      '<strong>Toplam katkı payı</strong> = Birim katkı payı × Satış adedi',
      '<strong>Faaliyet kârı</strong> = Toplam katkı payı − Sabit giderler',
      '<strong>Başabaş satış adedi</strong> = Sabit giderler ÷ Birim katkı payı',
      '<strong>Başabaş cirosu</strong> = Sabit giderler ÷ Katkı payı oranı',
    ] },
    { h: 'Çözümlü örnek', p: [
      'El yapımı sabun satan bir işletme, bir kutuyu 200 TL\'ye satıyor olsun. Kutu başına hammadde, ambalaj, kargo ve komisyon toplamı 120 TL. Birim katkı payı 200 − 120 = 80 TL, katkı payı oranı 80 ÷ 200 = %40\'tır. Yani her 100 liralık satışın 40 lirası sabit giderlere ve kâra kalır, 60 lirası değişken maliyete gider.',
      'İşletme ayda 1.000 kutu satıyor ve aylık sabit giderleri 50.000 TL ise toplam katkı payı 80 × 1.000 = 80.000 TL, faaliyet kârı 80.000 − 50.000 = 30.000 TL olur. Başabaş noktası 50.000 ÷ 80 = 625 kutudur; bu, 625 × 200 = 125.000 TL ciroya karşılık gelir. İlk 625 kutunun katkısı sabit giderleri kapatır, 626. kutudan itibaren her satış 80 TL kâr bırakır. Bu değerleri araca yazdığınızda aynı sonuçları görürsünüz.',
    ] },
    { h: 'Katkı payı ile brüt kâr aynı şey değildir', p: [
      'İki kavram sık karıştırılır. Brüt kâr, satışlardan satışların maliyeti düşülerek bulunur ve satışların maliyeti içinde üretimle ilgili sabit giderler de (fabrika kirası, makine amortismanı, sabit ücretli üretim personeli) yer alır. Katkı payı ise yalnızca değişken maliyetleri düşer; buna karşılık üretim dışındaki değişken giderleri, örneğin satış komisyonunu ve kargoyu da hesaba katar. Bu nedenle aynı ürün için brüt kâr marjı ile katkı payı oranı farklı çıkabilir. Fiyatlama ve "bu siparişi alayım mı" gibi kısa vadeli kararlarda katkı payı daha yol göstericidir.',
    ] },
    { h: 'Katkı payı hangi kararlarda kullanılır?', ul: [
      '<strong>Fiyat ve indirim:</strong> %40 katkı payı oranı olan bir üründe %10 indirim, birim katkıyı dörtte bir azaltır; aynı toplam katkıyı korumak için satış adedinin yaklaşık üçte bir artması gerekir.',
      '<strong>Ürün karması:</strong> Reklam bütçesini ve raf alanını birim katkısı yüksek ürünlere yönlendirmek toplam kârı artırır.',
      '<strong>Özel sipariş:</strong> Boş kapasite varken normal fiyatın altında gelen bir teklif, değişken maliyetin üzerinde kaldığı sürece sabit giderlere katkı sağlar.',
      '<strong>Hedef kâr:</strong> Belirli bir kâr için gereken adet, (Sabit giderler + Hedef kâr) ÷ Birim katkı payı ile bulunur.',
      '<strong>Ürünü bırakma:</strong> Katkı payı negatif olan ürün her satışta zarar yazdırır; fiyat ya da maliyet değişmiyorsa satışı sürdürmek anlamsızdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık hata, değişken maliyetlerin bir bölümünü unutmaktır. Pazaryeri komisyonu, sanal POS kesintisi, iade oranının maliyeti, ücretsiz kargo ve promosyon ürünleri adet başına düşen gerçek maliyetlerdir. İkinci hata, satış fiyatını KDV dahil, maliyeti KDV hariç almaktır; iki tutarı aynı esasa getirin. Üçüncüsü, yarı değişken giderleri (belli bir hacimden sonra artan depo kirası, fazla mesai) tamamen sabit saymaktır.',
      'Model, birim fiyatın ve birim değişken maliyetin satış hacminden bağımsız sabit kaldığını varsayar. Gerçekte toplu alımda hammadde ucuzlar, büyük siparişte fiyat düşer. Birden çok ürün satıyorsanız her ürün için ayrı hesap yapın ya da satış karmasına göre ağırlıklı ortalama katkı payı kullanın. Sonuçlar bilgilendirme amaçlıdır; önemli fiyatlama ve yatırım kararlarında mali danışmanınıza başvurun.',
    ] },
  ],
  faq: [
    ['Katkı payı nasıl hesaplanır?', 'Birim satış fiyatından birim değişken maliyet çıkarılır. 200 TL\'ye satılan ve değişken maliyeti 120 TL olan bir ürünün katkı payı 80 TL\'dir.'],
    ['Katkı payı oranı ne işe yarar?', 'Cironun yüzde kaçının sabit giderlere ve kâra kaldığını gösterir. Oran %40 ise 100.000 TL\'lik satış 40.000 TL katkı sağlar. Sabit giderleri bu orana bölerek başabaş cirosunu doğrudan bulabilirsiniz.'],
    ['Değişken maliyet ile sabit gider nasıl ayrılır?', 'Kendinize şu soruyu sorun: bir adet daha satarsam bu gider artar mı? Artıyorsa değişkendir (hammadde, ambalaj, kargo, komisyon). Satış adedinden bağımsız ödeniyorsa sabittir (kira, sabit maaşlar, yazılım abonelikleri, muhasebe ücreti).'],
    ['Katkı payı negatif çıkarsa ne yapmalıyım?', 'Ürün değişken maliyetinin altında satılıyor demektir; satış arttıkça zarar büyür. Fiyatı artırmak, değişken maliyeti düşürmek ya da ürünü satıştan kaldırmak dışında bir çözüm yoktur.'],
    ['Katkı payı kâr mıdır?', 'Hayır. Katkı payından sabit giderler henüz düşülmemiştir. Toplam katkı payı sabit giderleri aşarsa aradaki fark faaliyet kârıdır; aşamazsa işletme o dönem zarar eder.'],
    ['Hizmet işletmeleri için de kullanılabilir mi?', 'Evet. Birim olarak bir saatlik hizmeti, bir projeyi ya da bir aboneliği alabilirsiniz. Değişken maliyet, o hizmeti verirken doğrudan katlanılan taşeron, sarf malzemesi, yol ya da lisans gideridir.'],
    ['Başabaş adedi kesirli çıktı, nasıl yorumlamalıyım?', 'Yarım ürün satılamayacağı için sonucu yukarı yuvarlayın. 624,3 adet çıkan bir hesapta zarar etmemek için en az 625 adet satmanız gerekir.'],
    ['Girdiğim fiyat ve maliyet bilgileri saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['basabas-noktasi-hesapla', 'kar-marji-hesapla', 'birim-maliyet-hesapla', 'kar-ekleme-orani-hesapla', 'kar-zarar-hesapla', 'iskonto-hesapla'],
};
