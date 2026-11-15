export default {
  slug: 'efektif-faiz-hesapla',
  title: 'Efektif Faiz Oranı Hesaplama',
  h1Tail: 'nominalden efektif yıllık orana',
  pageTitle: 'Efektif Faiz Oranı Hesaplama – Nominal Faizden Yıllık Efektif Faiz',
  description: 'Nominal yıllık faiz oranını ve faizin yılda kaç kez işlediğini girin; yıllık efektif (bileşik) faiz oranını, dönem oranını ve aradaki farkı hesaplayın.',
  card: 'Nominal yıllık faizin, aylık ya da günlük bileşiklenmeyle gerçekte yıllık yüzde kaça denk geldiğini hesaplayın.',
  category: 'finans',
  keywords: ['efektif faiz hesaplama', 'efektif faiz oranı', 'yıllık efektif faiz', 'nominal efektif faiz farkı', 'bileşik faiz oranı hesaplama', 'efektif faiz formülü', 'yıllık bileşik faiz oranı'],
  lead: 'Sözleşmede yazan nominal yıllık faiz ile bir yıl sonunda gerçekten ödenen ya da kazanılan faiz aynı değildir. Nominal oranı ve bileşiklenme sıklığını seçin; araç <strong>yıllık efektif faiz oranını</strong> ve nominal oranla farkını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'nominal', label: 'Nominal yıllık faiz oranı (%)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'siklik', label: 'Faizin işleme (bileşiklenme) sıklığı', type: 'select', options: [['12', 'Aylık (yılda 12)'], ['1', 'Yıllık (yılda 1)'], ['2', 'Altı aylık (yılda 2)'], ['4', 'Üç aylık (yılda 4)'], ['52', 'Haftalık (yılda 52)'], ['365', 'Günlük (yılda 365)'], ['surekli', 'Sürekli bileşik']] },
  ],
  compute(v, h) {
    const nom = h.nonneg(v.nominal, 'Nominal yıllık faiz oranı');
    if (nom > 10000) h.err('Nominal oran %10.000\'den büyük olamaz; değeri kontrol edin.');
    const r = nom / 100;
    const adlar = { 1: 'yıllık', 2: 'altı aylık', 4: 'üç aylık', 12: 'aylık', 52: 'haftalık', 365: 'günlük' };
    let ear, donem, donemAd, m;
    if (v.siklik === 'surekli') {
      ear = Math.exp(r) - 1;
      donem = null;
    } else {
      m = Number(v.siklik);
      if (!adlar[m]) h.err('Listeden geçerli bir bileşiklenme sıklığı seçin.');
      donem = r / m;
      donemAd = adlar[m];
      ear = Math.pow(1 + donem, m) - 1;
    }
    const rows = [
      ['Yıllık efektif faiz oranı', '%' + h.fmt(ear * 100, 4)],
      ['Nominal yıllık oran', '%' + h.fmt(nom, 4)],
      ['Fark (efektif − nominal)', h.fmt((ear - r) * 100, 4) + ' puan'],
    ];
    if (donem !== null) rows.push(['Dönem faiz oranı (' + donemAd + ')', '%' + h.fmt(donem * 100, 4)]);
    rows.push(['100.000 TL\'nin bir yıl sonraki değeri', h.para(100000 * (1 + ear))]);
    return {
      rows,
      note: v.siklik === 'surekli'
        ? 'Sürekli bileşik: efektif oran = e^r − 1. Vergi ve masraflar hesaba katılmamıştır.'
        : 'Efektif oran = (1 + nominal ÷ m)^m − 1. Vergi ve masraflar hesaba katılmamıştır.',
    };
  },
  cases: [
    { in: { nominal: '12', siklik: '12' }, out: { 'Yıllık efektif faiz oranı': '%12,6825', 'Dönem faiz oranı (aylık)': '%1', 'Fark (efektif − nominal)': '0,6825 puan', '100.000 TL\'nin bir yıl sonraki değeri': '112.682,50 TL' } },
    { in: { nominal: '10', siklik: '2' }, out: { 'Yıllık efektif faiz oranı': '%10,25', 'Dönem faiz oranı (altı aylık)': '%5' } },
    { in: { nominal: '8', siklik: '4' }, out: { 'Yıllık efektif faiz oranı': '%8,2432', 'Dönem faiz oranı (üç aylık)': '%2' } },
    { in: { nominal: '5', siklik: 'surekli' }, out: { 'Yıllık efektif faiz oranı': '%5,1271' } },
    { in: { nominal: '48', siklik: '12' }, out: { 'Yıllık efektif faiz oranı': '%60,1032', 'Fark (efektif − nominal)': '12,1032 puan' } },
    { in: { nominal: '12', siklik: '365' }, out: { 'Yıllık efektif faiz oranı': '%12,7475' } },
    { in: { nominal: '20', siklik: '1' }, out: { 'Yıllık efektif faiz oranı': '%20', 'Fark (efektif − nominal)': '0 puan' } },
    { in: { nominal: '-5', siklik: '12' }, error: true },
    { in: { nominal: '', siklik: '12' }, error: true },
  ],
  howto: [
    '"Nominal yıllık faiz oranı" alanına sözleşmede, ilanda ya da teklifte yazan yıllık oranı yüzde olarak girin. Elinizde aylık oran varsa 12 ile çarpıp yazın.',
    'Faizin anaparaya ne sıklıkta eklendiğini listeden seçin: aylık taksitli kredilerde ve aylık yenilenen mevduatta "Aylık", üç ayda bir faiz ödeyen ürünlerde "Üç aylık" gibi.',
    '"Hesapla" düğmesine basın. İlk satır yıllık efektif oranı, üçüncü satır bileşiklenmenin nominal orana kaç puan eklediğini gösterir.',
    'Farklı ürünleri karşılaştırırken her birinin efektif oranını ayrı ayrı hesaplayıp bu değerleri yan yana koyun.',
  ],
  sections: [
    { h: 'Nominal faiz ve efektif faiz arasındaki fark', p: [
      '<strong>Nominal faiz</strong>, faizin faizi hesaba katılmadan söylenen yıllık orandır. Aylık %1 faiz işleyen bir ürün için "yıllık %12" denmesi nominal bir ifadedir: 1 × 12. Oysa her ay kazanılan faiz anaparaya eklenirse sonraki ay o faiz de faiz kazanır. Yıl sonunda elde edilen toplam getiri %12 değil, %12,68 olur. İşte bileşiklenmenin etkisini içeren bu gerçek yıllık orana <strong>efektif faiz</strong> denir.',
      'Fark, faiz yılda yalnızca bir kez işliyorsa sıfırdır. Faiz ne kadar sık işlerse ve nominal oran ne kadar yüksekse efektif oran nominalden o kadar uzaklaşır. Düşük faizli ekonomilerde ihmal edilebilen bu fark, yüksek faiz dönemlerinde onlarca puana ulaşabilir.',
    ] },
    { h: 'Efektif faiz formülü', p: [
      'Yılda m kez bileşiklenen nominal r oranı için formül şöyledir: <strong>efektif oran = (1 + r ÷ m)<sup>m</sup> − 1</strong>. Burada r ondalık olarak yazılır (yüzde 12 için 0,12). r ÷ m dönem faizidir; parantezin m\'inci kuvveti, bir liranın yıl sonunda kaç liraya ulaştığını verir.',
      'Bileşiklenme sıklığı sınırsız artırıldığında ulaşılan üst sınıra sürekli bileşik faiz denir ve formül <strong>e<sup>r</sup> − 1</strong> biçimini alır (e ≈ 2,71828). Sürekli bileşik, günlük bileşiklenmeden yalnızca çok az yüksektir; finans teorisinde ve türev ürün fiyatlamasında kullanılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Nominal yıllık %12, aylık bileşik. Dönem faizi 0,12 ÷ 12 = 0,01\'dir. (1,01)<sup>12</sup> = 1,126825 olduğundan efektif oran %12,6825 çıkar. 100.000 TL bir yıl sonunda 112.682,50 TL olur; basit hesapla beklenen 112.000 TL\'den 682,50 TL fazladır.',
      '<strong>Örnek 2:</strong> Nominal yıllık %10, altı ayda bir bileşik. Dönem faizi %5\'tir; (1,05)<sup>2</sup> = 1,1025, yani efektif oran tam %10,25\'tir.',
      '<strong>Örnek 3:</strong> Nominal yıllık %48, aylık bileşik (aylık %4). (1,04)<sup>12</sup> ≈ 1,601032 olduğundan efektif oran %60,1032\'dir. Nominal oranla arasındaki fark 12 puanı aşar; yüksek oranlarda yalnızca nominal değere bakmanın ne kadar yanıltıcı olabileceğini gösterir.',
    ] },
    { h: 'Bileşiklenme sıklığının etkisi: nominal %12 için', ul: [
      '<strong>Yıllık:</strong> %12',
      '<strong>Altı aylık:</strong> %12,36',
      '<strong>Üç aylık:</strong> %12,5509',
      '<strong>Aylık:</strong> %12,6825',
      '<strong>Haftalık:</strong> %12,7341',
      '<strong>Günlük:</strong> %12,7475',
      '<strong>Sürekli:</strong> %12,7497',
    ], p: [
      'Görüldüğü gibi sıklık arttıkça efektif oran yükselir ama artış giderek yavaşlar; aylıktan günlüğe geçişin katkısı, yıllıktan aylığa geçişin katkısının yanında çok küçüktür.',
    ] },
    { h: 'Nerede işe yarar?', p: [
      'Efektif oran, farklı dönemlerle ifade edilmiş teklifleri aynı ölçüye getirir. Bir banka aylık %3,2, diğeri üç aylık %10 öneriyorsa hangisinin daha yüksek olduğunu ancak ikisini de yıllık efektif orana çevirerek görebilirsiniz. Aylık taksitle ödenen kredilerin, kredi kartı borcunun, 32 günlük ya da üç aylık vadelerle yenilenen mevduatın ve kupon ödemeli tahvillerin gerçek yıllık maliyetini ya da getirisini anlamak için aynı dönüşüm kullanılır.',
      'İşletmeler için de önemlidir: tedarikçinin sunduğu aylık vade farkı ile banka kredisinin yıllık oranını karşılaştırırken ikisini aynı tabana oturtmak gerekir.',
    ] },
    { h: 'Efektif oran ile yıllık maliyet oranı aynı şey mi?', p: [
      'Hayır. Bu sayfadaki efektif oran yalnızca faizin bileşiklenmesini yansıtır. Kredi tekliflerinde ayrıca gösterilen yıllık maliyet oranı; faizin yanında tahsis ücreti, sigorta primi ve faiz üzerinden alınan vergi ve fon gibi tüm zorunlu ödemeleri de içerir ve bu yüzden efektif faizden yüksek çıkar. Mevduatta ise tersine, faiz gelirinden kesilen stopaj net getiriyi efektif oranın altına düşürür. Vergi oranları dönemsel olarak değiştiği için araç bunları sabitlemez.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Hesap, oranın yıl boyunca sabit kaldığını ve kazanılan faizin tamamının aynı oranla yeniden değerlendirildiğini varsayar. Mevduat yenilendiğinde oran değişirse gerçekleşen yıllık getiri farklı olur. Haftalık ve günlük seçeneklerde yıl 52 hafta ve 365 gün kabul edilir. Sonuçlar bilgilendirme amaçlıdır; yatırım ya da borçlanma kararı vermeden önce ürünün tüm masraflarını inceleyin ve gerekirse bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Efektif faiz oranı nedir?', 'Faizin yıl içinde anaparaya eklenip yeniden faiz kazanması (bileşiklenme) hesaba katıldığında ortaya çıkan gerçek yıllık orandır. Nominal oran bu etkiyi içermez; efektif oran bir yılın sonunda paranın gerçekte yüzde kaç büyüdüğünü söyler.'],
    ['Aylık %3 faiz yıllık efektif kaç eder?', 'Nominal yıllık karşılığı 3 × 12 = %36\'dır. Araca 36 yazıp "Aylık" seçerseniz efektif oran %42,5761 çıkar; çünkü (1,03) üzeri 12 yaklaşık 1,425761\'dir.'],
    ['Efektif faiz neden nominal faizden yüksektir?', 'Çünkü dönem içinde işleyen faiz anaparaya eklenir ve sonraki dönemlerde o da faiz getirir. Faiz yılda yalnızca bir kez işliyorsa iki oran eşittir; yılda birden fazla işliyorsa efektif oran her zaman daha yüksektir.'],
    ['Hangi bileşiklenme sıklığını seçmeliyim?', 'Faizin hesabınıza ya da borcunuza eklendiği sıklığı seçin. Aylık taksitli kredilerde ve aylık vadeli mevduatta aylık, üç ayda bir kupon ödeyen ürünlerde üç aylık, gecelik işleyen hesaplarda günlük seçeneği uygundur.'],
    ['Sürekli bileşik faiz gerçek hayatta kullanılır mı?', 'Banka ürünlerinde doğrudan karşılaşılmaz; faizin her an işlediği kuramsal sınırdır. Opsiyon fiyatlaması ve akademik finans hesaplarında formülleri sadeleştirdiği için tercih edilir. Günlük bileşik sonuçla arasındaki fark çok küçüktür.'],
    ['Efektif oranı bilirsem nominal oranı bulabilir miyim?', 'Evet, formül ters çevrilir: nominal = m × ((1 + efektif) üzeri (1 ÷ m) − 1). Örneğin yıllık efektif %60,1032 ve aylık bileşik için dönem oranı %4, nominal yıllık oran %48 bulunur. Aylık ve yıllık oran dönüşümü için sitedeki ilgili çeviriciyi de kullanabilirsiniz.'],
    ['Mevduat stopajı bu hesaba dahil mi?', 'Hayır. Araç brüt oranlar üzerinden çalışır. Net getiriyi görmek için önce nominal oranı stopaj sonrası değere indirip (örneğin oran × (1 − stopaj oranı)) öyle girebilirsiniz.'],
    ['Girdiğim oranlar bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['bilesik-faiz-hesapla', 'aylik-yillik-faiz-cevir', 'faiz-hesapla', 'mevduat-faizi-hesapla', 'reel-faiz-hesapla', 'kredi-hesapla'],
};
