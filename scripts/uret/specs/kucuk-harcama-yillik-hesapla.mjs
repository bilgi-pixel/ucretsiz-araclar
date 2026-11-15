export default {
  slug: 'kucuk-harcama-yillik-hesapla',
  title: 'Küçük Harcamaların Yıllık Tutarı Hesaplama',
  h1Tail: 'günlük alışkanlıklar yılda ne eder?',
  pageTitle: 'Küçük Harcamaların Yıllık Tutarı – Günlük Harcama Yılda Ne Eder?',
  description: 'Her gün ya da her hafta yaptığınız küçük bir harcamanın aylık, yıllık ve çok yıllık toplamını; isterseniz birikime dönüşseydi ulaşacağı tutarı hesaplayın.',
  card: 'Günlük kahve, simit ya da taksi gibi küçük harcamaların bir yılda ve yıllar içinde ne kadar tuttuğunu görün.',
  category: 'gunluk',
  keywords: ['küçük harcamalar yıllık ne kadar', 'günlük harcama yıllık hesaplama', 'kahve parası yıllık', 'latte etkisi hesaplama', 'günlük 100 tl yılda ne eder', 'alışkanlık maliyeti', 'ufak harcama hesabı'],
  lead: 'Tek seferinde önemsiz görünen bir harcama, düzenli tekrarlandığında yıl sonunda şaşırtıcı bir toplama ulaşır. Harcamanın tutarını ve ne sıklıkla yapıldığını girin; araç <strong>aylık, yıllık ve çok yıllık</strong> karşılığını, isterseniz aynı para düzenli biriktirilseydi <strong>ulaşacağı tutarı</strong> göstersin.',
  button: 'Hesapla',
  inputs: [
    { id: 'tutar', label: 'Bir seferlik harcama (TL)', type: 'number', placeholder: 'Örn. 80' },
    { id: 'adet', label: 'Kaç kez?', type: 'number', value: '1' },
    { id: 'periyot', label: 'Hangi sıklıkta?', type: 'select', options: [['gun', 'Günde'], ['hafta', 'Haftada'], ['ay', 'Ayda']] },
    { id: 'yil', label: 'Kaç yıl boyunca?', type: 'number', value: '5' },
    { id: 'getiri', label: 'Yıllık getiri oranı (%, isteğe bağlı)', type: 'number', placeholder: 'Boş bırakılabilir', hint: 'Aynı para biriktirilseydi varsayacağınız yıllık getiri' },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Bir seferlik harcama');
    const adet = h.pos(v.adet, 'Kaç kez');
    const yil = h.posint(v.yil, 'Yıl sayısı');
    if (yil > 60) h.err('"Kaç yıl boyunca" en fazla 60 olabilir.');
    const kat = v.periyot === 'hafta' ? 52 : v.periyot === 'ay' ? 12 : 365;
    if (v.periyot !== 'hafta' && v.periyot !== 'ay' && adet > 50) h.err('Günde 50\'den fazla tekrar girilemez; sıklığı kontrol edin.');
    const tekrar = adet * kat;
    const yillik = tutar * tekrar;
    const rows = [
      ['Yıllık tutar', h.para(yillik)],
      ['Aylık ortalama', h.para(yillik / 12)],
      ['Haftalık ortalama', h.para(yillik / 52)],
      ['Günlük ortalama', h.para(yillik / 365)],
      ['Yılda tekrar sayısı', `${h.fmt(tekrar, 1)} kez`],
      ['Seçilen sürede toplam', `${h.para(yillik * yil)} (${yil} yıl)`],
    ];
    let note = 'Bir yıl 365 gün, 52 hafta ve 12 ay kabul edilmiştir; fiyatın süre boyunca değişmediği varsayılır.';
    if (String(v.getiri || '').trim() !== '') {
      const r = h.nonneg(v.getiri, 'Yıllık getiri oranı') / 100;
      if (r > 10) h.err('"Yıllık getiri oranı" en fazla %1000 olabilir.');
      const fv = r === 0 ? yillik * yil : yillik * (Math.pow(1 + r, yil) - 1) / r;
      rows.push(['Biriktirilseydi ulaşacağı tutar', h.para(fv)]);
      note += ' Birikim satırı, yıllık tutarın her yılın sonunda yatırıldığını ve girdiğiniz oranda yıllık bileşik getiri sağladığını varsayar; gerçek getiri garanti edilemez.';
    }
    return { rows, note };
  },
  cases: [
    { in: { tutar: '80', adet: '5', periyot: 'hafta', yil: '5' }, out: { 'Yıllık tutar': '20.800,00 TL', 'Aylık ortalama': '1.733,33 TL', 'Haftalık ortalama': '400,00 TL', 'Günlük ortalama': '56,99 TL', 'Yılda tekrar sayısı': '260 kez', 'Seçilen sürede toplam': '104.000,00 TL (5 yıl)' } },
    { in: { tutar: '50', adet: '1', periyot: 'gun', yil: '1' }, out: { 'Yıllık tutar': '18.250,00 TL', 'Aylık ortalama': '1.520,83 TL', 'Günlük ortalama': '50,00 TL', 'Yılda tekrar sayısı': '365 kez' } },
    { in: { tutar: '80', adet: '5', periyot: 'hafta', yil: '5', getiri: '10' }, out: { 'Yıllık tutar': '20.800,00 TL', 'Biriktirilseydi ulaşacağı tutar': '126.986,08 TL' } },
    { in: { tutar: '300', adet: '2', periyot: 'ay', yil: '10' }, out: { 'Yıllık tutar': '7.200,00 TL', 'Aylık ortalama': '600,00 TL', 'Yılda tekrar sayısı': '24 kez', 'Seçilen sürede toplam': '72.000,00 TL (10 yıl)' } },
    { in: { tutar: '120', adet: '1', periyot: 'hafta', yil: '3', getiri: '0' }, out: { 'Yıllık tutar': '6.240,00 TL', 'Seçilen sürede toplam': '18.720,00 TL (3 yıl)', 'Biriktirilseydi ulaşacağı tutar': '18.720,00 TL' } },
    { in: { tutar: '1000', adet: '1', periyot: 'ay', yil: '2', getiri: '20' }, out: { 'Yıllık tutar': '12.000,00 TL', 'Biriktirilseydi ulaşacağı tutar': '26.400,00 TL' } },
    { in: { tutar: '0', adet: '1', periyot: 'gun', yil: '1' }, error: true },
    { in: { tutar: '80', adet: '-1', periyot: 'gun', yil: '1' }, error: true },
  ],
  howto: [
    '"Bir seferlik harcama" alanına alışkanlığın tek seferdeki tutarını yazın; örneğin bir kahvenin ya da bir paket atıştırmalığın fiyatı.',
    'Bu harcamayı kaç kez yaptığınızı ve bunun günde mi, haftada mı, ayda mı olduğunu seçin. Yalnızca iş günlerinde yapılan bir harcama için "haftada 5 kez" yazabilirsiniz.',
    'Toplamı kaç yıl için görmek istediğinizi girin.',
    'İsterseniz yıllık getiri oranı yazarak aynı paranın biriktirilmesi hâlinde ulaşacağı tutarı da hesaplatın.',
    '"Hesapla" düğmesine basın ve sonuçları inceleyin.',
  ],
  sections: [
    { h: 'Formül', p: [
      'Hesabın tamamı çarpmadan ibarettir: <strong>yıllık tutar = bir seferlik harcama × tekrar sayısı × yıldaki dönem sayısı</strong>. Dönem sayısı günlük harcamalar için 365, haftalık için 52, aylık için 12 alınır. Aylık ortalama yıllık tutarın 12\'ye, haftalık ortalama 52\'ye, günlük ortalama 365\'e bölünmesiyle bulunur. Çok yıllık toplam da yıllık tutarın yıl sayısıyla çarpımıdır.',
      'Getiri oranı girildiğinde her yılın sonunda o yılın toplamının bir kenara yatırıldığı varsayılır ve düzenli ödemelerin gelecekteki değeri formülü kullanılır: <strong>birikim = yıllık tutar × ((1 + r)<sup>n</sup> − 1) ÷ r</strong>. Burada r yıllık getiri oranı (yüzde 10 için 0,10), n yıl sayısıdır.',
    ] },
    { h: 'Çözümlü örnek: iş günlerinde bir kahve', p: [
      'Haftanın beş iş gününde işe giderken 80 TL\'lik bir kahve alan birini düşünelim. Yılda 5 × 52 = 260 kahve eder. Yıllık tutar 80 × 260 = <strong>20.800 TL</strong>, aylık ortalama 1.733,33 TL, haftalık 400 TL\'dir. Fiyat hiç değişmese bile beş yılda 104.000 TL harcanmış olur.',
      'Aynı 20.800 TL her yıl sonunda yüzde 10 yıllık getiri sağlayan bir birikime yatırılsaydı beş yılın sonunda 20.800 × (1,1<sup>5</sup> − 1) ÷ 0,1 = 20.800 × 6,1051 = <strong>126.986,08 TL</strong> birikmiş olurdu. Aradaki yaklaşık 23 bin TL\'lik fark, bileşik getirinin etkisidir.',
    ] },
    { h: 'Hangi harcamalar bu hesaba girer?', p: [
      'Bu araç, tutarı küçük ama sıklığı yüksek kalemler için tasarlanmıştır. Bütçe yapanların çoğu kira, fatura ve taksit gibi büyük kalemleri bilir; asıl belirsizlik gün içinde düşünmeden yapılan harcamalardadır. Sık rastlanan örnekler:',
    ], ul: [
      'Dışarıdan alınan kahve, çay ve hazır içecekler',
      'Simit, poğaça, atıştırmalık ve kantin alışverişleri',
      'Öğle yemeğini dışarıda yemek ile evden götürmek arasındaki fark',
      'Kısa mesafe taksi yolculukları ve paket servis ücretleri',
      'Otomat ve büfe alışverişleri',
      'Oyun içi satın almalar ve uygulama içi küçük ödemeler',
      'Şans oyunları biletleri',
      'Otopark ve vale ücretleri',
    ] },
    { h: 'Sonucu nasıl yorumlamalı?', p: [
      'Bu hesap "hiç harcamayın" demek için değildir. Sabah kahvesi ya da arkadaşlarla yenen öğle yemeği, karşılığında gerçekten keyif ve sosyal bağ sağlayan harcamalardır. Amaç, kararı bilerek vermektir: yıllık 20.800 TL\'yi gördükten sonra "bu bana değer" diyorsanız sorun yok; "bunu fark etmemiştim" diyorsanız sıklığı azaltmak ya da daha uygun bir alternatif bulmak mümkündür.',
      'Küçük bir değişikliğin etkisini görmek için aracı iki kez çalıştırın. Haftada beş yerine üç kahve alındığında yıllık tutar 12.480 TL\'ye düşer; yani alışkanlıktan tamamen vazgeçmeden yılda 8.320 TL tasarruf edilir.',
    ] },
    { h: 'Sık yapılan hesap hataları', ul: [
      'Yalnızca iş günlerinde yapılan bir harcamayı "günde 1" olarak girip 365 günle çarpmak. Doğrusu "haftada 5" yazmaktır.',
      'Yıllık izin, resmî tatil ve hastalık günlerini hesaba katmamak; bu günleri düşmek isterseniz haftalık tekrar sayısını biraz azaltın.',
      'Bir ayı dört hafta saymak. Bir yılda 52 hafta olduğundan ay ortalama 4,33 haftadır.',
      'Fiyat artışlarını unutmak. Araç bugünkü fiyatı sabit tutar; gerçek hayatta gelecek yılların toplamı daha yüksek olur.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Sonuçlar girdiğiniz tutarın ve sıklığın süre boyunca değişmediğini kabul eder. Birikim satırındaki getiri oranı tamamen sizin varsayımınızdır; hiçbir yatırım aracı sabit ve garantili bir getiri sunmaz, enflasyon da paranın satın alma gücünü zamanla azaltır. Bu sayfa bir farkındalık ve bütçe aracıdır, yatırım tavsiyesi vermez. Birikim ve yatırım kararları için yetkili bir uzmandan destek alın.',
    ] },
  ],
  faq: [
    ['Günde 100 TL harcamak yılda ne kadar eder?', 'Yılın her günü yapılırsa 100 × 365 = 36.500 TL eder. Yalnızca iş günlerinde, yani haftada beş kez yapılırsa 100 × 260 = 26.000 TL tutar.'],
    ['Günde 50 TL biriktirirsem bir yılda ne kadar olur?', '50 × 365 = 18.250 TL olur. Bu, ayda ortalama 1.520,83 TL\'ye karşılık gelir.'],
    ['İş günlerini nasıl hesaba katarım?', 'Sıklığı "Haftada" seçip tekrar sayısına 5 yazın. Araç 52 haftayla çarparak yılda 260 tekrar bulur.'],
    ['Getiri oranı alanını doldurmak zorunda mıyım?', 'Hayır, isteğe bağlıdır. Boş bıraktığınızda yalnızca harcamanın toplamı gösterilir. Doldurursanız aynı paranın yıllık bileşik getiriyle ulaşacağı tutar eklenir.'],
    ['Birikim hesabında para ne zaman yatırılmış sayılıyor?', 'Her yılın toplamı o yılın sonunda yatırılmış kabul edilir. Bu yüzden bir yıllık sürede getiri oluşmaz; iki yılda yalnızca ilk yılın parası bir yıl değerlenir. Yüzde 20 getiriyle yılda 12.000 TL iki yılda 26.400 TL eder.'],
    ['Tekrar sayısını ondalıklı yazabilir miyim?', 'Evet. Örneğin iki haftada bir yapılan bir harcama için "haftada 0,5" yazabilirsiniz; araç yılda 26 tekrar hesaplar.'],
    ['Bu hesap sigara ya da abonelik için de kullanılabilir mi?', 'Aritmetik olarak evet; ancak sitede bu konulara özel, daha ayrıntılı sonuç veren ayrı hesaplayıcılar bulunur. İlgili araçlar bölümünden ulaşabilirsiniz.'],
    ['Yazdığım tutarlar saklanıyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; girdiğiniz bilgiler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['abonelik-maliyeti-hesapla', 'sigara-maliyet-hesapla', 'birikim-hesapla', 'bilesik-faiz-hesapla', 'calisma-saati-fiyat-hesapla'],
};
