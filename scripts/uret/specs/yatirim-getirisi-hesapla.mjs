export default {
  slug: 'yatirim-getirisi-hesapla',
  title: 'Yatırım Getirisi (ROI) Hesaplama',
  h1Tail: 'yüzde ve yıllık karşılık',
  pageTitle: 'Yatırım Getirisi (ROI) Hesaplama – Yatırımın Geri Dönüş Oranı',
  description: 'Yatırım tutarını ve elde edilen değeri yazın; yatırım getirisini (ROI), net kazancı, getiri katsayısını ve süre verirseniz yıllıklandırılmış getiriyi hesaplayın.',
  card: 'Yatırdığınız tutar ile elde ettiğiniz değerden ROI yüzdesini, net kazancı ve yıllık karşılığını bulun.',
  category: 'finans',
  keywords: ['roi hesaplama', 'yatırım getirisi hesaplama', 'yatırımın geri dönüşü', 'roi nedir', 'roi formülü', 'getiri oranı hesaplama', 'yıllık getiri hesaplama'],
  lead: 'Bir yatırıma koyduğunuz parayı ve o yatırımdan elde ettiğiniz toplam değeri yazın; araç <strong>yatırım getirisini (ROI)</strong> yüzde olarak verir. Yatırım süresini de girerseniz farklı sürelerdeki yatırımları kıyaslayabilmeniz için yıllıklandırılmış getiriyi de hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'maliyet', label: 'Yatırım tutarı (maliyet)', type: 'number', placeholder: 'Örn. 50000', hint: 'Masraflar dahil yatırıma harcadığınız toplam para.' },
    { id: 'deger', label: 'Elde edilen toplam değer', type: 'number', placeholder: 'Örn. 80000', hint: 'Satış bedeli ya da güncel değer ile dönem içinde alınan gelirlerin toplamı.' },
    { id: 'sure', label: 'Yatırım süresi (yıl, isteğe bağlı)', type: 'number', placeholder: 'Örn. 3', hint: 'Yazarsanız yıllık bileşik getiri de gösterilir. 18 ay için 1,5 yazın.' },
  ],
  compute(v, h) {
    const m = h.pos(v.maliyet, 'Yatırım tutarı');
    const d = h.nonneg(v.deger, 'Elde edilen toplam değer');
    const sure = String(v.sure ?? '').trim() === '' ? null : h.pos(v.sure, 'Yatırım süresi');
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const kazanc = d - m;
    const roi = (kazanc / m) * 100;
    const rows = [
      ['Yatırım getirisi (ROI)', yuzde(roi)],
      ['Net kazanç', h.para(kazanc)],
      ['Getiri katsayısı', h.fmt(d / m, 4) + ' kat'],
    ];
    if (sure !== null) {
      const yillik = (Math.pow(d / m, 1 / sure) - 1) * 100;
      rows.push(['Yıllıklandırılmış getiri', yuzde(yillik)]);
      rows.push(['Basit yıllık ortalama', yuzde(roi / sure)]);
    }
    const durum = kazanc > 0 ? 'Yatırım kârda.' : kazanc < 0 ? 'Yatırım zararda.' : 'Yatırım başabaş noktasında.';
    return { rows, note: durum + ' ROI = (elde edilen değer − yatırım tutarı) ÷ yatırım tutarı × 100. Enflasyon ve vergi ayrıca dikkate alınmalıdır.' };
  },
  cases: [
    { in: { maliyet: '1000', deger: '1250' }, out: { 'Yatırım getirisi (ROI)': '%25', 'Net kazanç': '250,00 TL', 'Getiri katsayısı': '1,25 kat' } },
    { in: { maliyet: '50000', deger: '80000', sure: '3' }, out: { 'Yatırım getirisi (ROI)': '%60', 'Net kazanç': '30.000,00 TL', 'Yıllıklandırılmış getiri': '%16,96', 'Basit yıllık ortalama': '%20' } },
    { in: { maliyet: '10000', deger: '8000' }, out: { 'Yatırım getirisi (ROI)': '-%20', 'Net kazanç': '-2.000,00 TL' } },
    { in: { maliyet: '100', deger: '200', sure: '2' }, out: { 'Yatırım getirisi (ROI)': '%100', 'Yıllıklandırılmış getiri': '%41,42' } },
    { in: { maliyet: '1000', deger: '1000' }, out: { 'Yatırım getirisi (ROI)': '%0', 'Net kazanç': '0,00 TL' } },
    { in: { maliyet: '2000', deger: '2420', sure: '2' }, out: { 'Yatırım getirisi (ROI)': '%21', 'Yıllıklandırılmış getiri': '%10' } },
    { in: { maliyet: '0', deger: '500' }, error: true },
    { in: { maliyet: '1000', deger: '' }, error: true },
  ],
  howto: [
    '"Yatırım tutarı" alanına işe, ürüne ya da varlığa harcadığınız toplam parayı yazın. Komisyon, nakliye, kurulum gibi yan masrafları bu tutara ekleyin.',
    '"Elde edilen toplam değer" alanına yatırımdan geri aldığınız ya da bugün alabileceğiniz toplamı girin: satış bedeli ya da güncel değer ile birlikte kira, temettü, faiz gibi ara gelirler.',
    'Yatırım bir yıldan uzun ya da kısa sürdüyse "Yatırım süresi" alanına yıl cinsinden süreyi yazın; altı ay için 0,5 girebilirsiniz.',
    '"Hesapla" düğmesine basın. ROI yüzdesi, lira olarak net kazanç, getiri katsayısı ve süre girdiyseniz yıllık karşılıklar listelenir.',
  ],
  sections: [
    { h: 'Yatırım getirisi (ROI) nedir?', p: [
      'ROI, İngilizce "return on investment" ifadesinin kısaltmasıdır ve bir yatırımın, kendisine harcanan paraya oranla ne kadar kazandırdığını gösterir. Türkçede yatırım getirisi, yatırımın geri dönüşü ya da yatırım kârlılığı olarak kullanılır. Yüzde olarak ifade edildiği için büyüklüğü farklı yatırımları aynı ölçekte karşılaştırmaya yarar: 5.000 TL kazandıran 20.000 TL\'lik bir iş, 8.000 TL kazandıran 100.000 TL\'lik bir işten oran olarak daha verimlidir.',
      'Ölçüt son derece geneldir. Bir hisse senedi alımında, bir reklam kampanyasında, işletmeye alınan bir makinede, ev tadilatında, hatta bir eğitim harcamasında aynı mantıkla kullanılabilir; yeter ki harcanan para ile elde edilen değer lira olarak ortaya konabilsin.',
    ] },
    { h: 'ROI formülü', p: [
      'Hesap tek satırdır: <strong>ROI = (Elde edilen değer − Yatırım tutarı) ÷ Yatırım tutarı × 100</strong>. Paydaki fark net kazançtır. Sonuç pozitifse yatırım kâr, negatifse zarar etmiştir; %0 başabaş demektir. ROI en düşük -%100 olabilir, bu da yatırılan paranın tamamının kaybedildiği durumdur.',
      'Getiri katsayısı ise elde edilen değerin yatırıma bölümüdür. 1,25 kat, her 1 liranın 1,25 lira olarak geri döndüğünü anlatır; katsayıdan 1 çıkarıp 100 ile çarparsanız yine ROI\'yi bulursunuz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1.000 TL\'ye aldığınız bir ürünü 1.250 TL\'ye sattınız. Net kazanç 1.250 − 1.000 = 250 TL, ROI 250 ÷ 1.000 × 100 = <strong>%25</strong> olur. Getiri katsayısı 1,25\'tir.',
      '<strong>Örnek 2:</strong> 50.000 TL\'ye kurduğunuz küçük bir üretim hattı üç yılın sonunda, satış bedeli ve sağladığı net gelirlerle birlikte 80.000 TL getirdi. Net kazanç 30.000 TL, ROI %60\'tır. Ancak bu üç yılın toplamıdır. Yıllık bileşik karşılığı (80.000 ÷ 50.000)<sup>1/3</sup> − 1 işlemiyle <strong>%16,96</strong> bulunur. %60\'ı üçe bölerek elde edilen %20\'lik basit ortalama, bileşik etkiyi görmezden geldiği için gerçek yıllık getiriden yüksektir.',
      '<strong>Örnek 3:</strong> 10.000 TL\'ye aldığınız bir varlığı 8.000 TL\'ye elden çıkardınız. Net kazanç -2.000 TL, ROI <strong>-%20</strong> olur.',
    ] },
    { h: 'Yıllıklandırılmış getiri neden önemli?', p: [
      'Düz ROI zamanı hesaba katmaz. Altı ayda %30 kazandıran bir yatırımla beş yılda %30 kazandıran yatırım aynı ROI\'ye sahiptir, ama ilki çok daha iyidir. Bu nedenle süreleri farklı yatırımları kıyaslarken yıllıklandırılmış getiri kullanılır: <strong>Yıllık getiri = (Elde edilen değer ÷ Yatırım tutarı)<sup>1/yıl</sup> − 1</strong>.',
      'Bu oran, yatırımın her yıl aynı hızla büyüdüğü varsayılsaydı hangi yıllık oranla aynı sonuca ulaşılacağını gösterir. 100 TL iki yılda 200 TL olduysa toplam getiri %100, yıllık bileşik getiri ise %41,42\'dir; çünkü 1,4142 × 1,4142 yaklaşık 2 eder. Bir yıldan kısa sürelerde yıllıklandırma, sonucun yıl boyu tekrarlanacağını varsaydığı için dikkatle yorumlanmalıdır.',
    ] },
    { h: 'Hangi kalemler maliyete ve getiriye yazılır?', ul: [
      '<strong>Maliyete eklenenler:</strong> alış bedeli, aracı kurum komisyonu, tapu ve noter masrafı, nakliye, kurulum, tadilat, reklam harcamasında ajans ücreti.',
      '<strong>Getiriye eklenenler:</strong> satış bedeli ya da güncel piyasa değeri, yatırım süresince alınan kira, temettü, faiz ve kupon gelirleri.',
      '<strong>Getiriden düşülenler:</strong> satış komisyonu, ödenen vergi ve stopaj, işletme sırasında yapılan bakım ve işçilik giderleri.',
      '<strong>Reklam kampanyalarında:</strong> getiri olarak ciroyu değil, kampanyanın sağladığı brüt kârı kullanın; aksi halde oran olduğundan çok yüksek görünür.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, masrafları unutup yalnızca alış ve satış fiyatını karşılaştırmaktır. İkincisi, nominal getiriyi gerçek kazanç sanmaktır: yüksek enflasyon dönemlerinde %40\'lık bir ROI, fiyatlar aynı sürede %50 arttıysa satın alma gücü açısından kayıptır. Üçüncüsü, ROI\'nin riski ölçmediğini gözden kaçırmaktır; aynı orana sahip iki yatırımdan biri çok daha oynak olabilir.',
      'ROI ayrıca nakit akışlarının zamanlamasını dikkate almaz. Gelirlerin yıllara yayıldığı projelerde net bugünkü değer ve iç verim oranı daha doğru bir resim verir. Bu araçtaki sonuçlar bilgilendirme amaçlıdır ve yatırım tavsiyesi değildir; önemli mali kararlarda bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['ROI nasıl hesaplanır?', 'Elde edilen toplam değerden yatırım tutarını çıkarın, sonucu yatırım tutarına bölün ve 100 ile çarpın. 20.000 TL yatırıp 26.000 TL elde ettiyseniz ROI (26.000 − 20.000) ÷ 20.000 × 100 = %30 olur.'],
    ['İyi bir ROI yüzde kaçtır?', 'Tek bir doğru cevap yoktur; oran, aynı sürede risksiz sayılan alternatiflerin getirisinden ve enflasyondan yüksek olmalıdır. Karşılaştırmayı her zaman aynı süre için ve benzer riskteki seçeneklerle yapın.'],
    ['ROI negatif olabilir mi?', 'Evet. Elde edilen değer yatırım tutarından küçükse ROI negatiftir ve zararı gösterir. En düşük değer -%100\'dür; bu, yatırılan paranın tamamen kaybedildiği anlamına gelir.'],
    ['ROI ile kâr marjı aynı mı?', 'Hayır. Kâr marjı kârı satış gelirine oranlar, ROI ise yatırılan paraya. 1.000 TL\'ye alıp 1.250 TL\'ye sattığınız üründe ROI %25, kâr marjı ise 250 ÷ 1.250 = %20\'dir.'],
    ['Yıllıklandırılmış getiri ile basit yıllık ortalama neden farklı?', 'Basit ortalama toplam getiriyi yıl sayısına böler; bileşik büyümeyi yok sayar. Yıllıklandırılmış getiri ise her yıl kazancın anaparaya eklendiğini varsayar. Kârlı yatırımlarda bileşik oran her zaman basit ortalamadan küçük ya da ona eşittir.'],
    ['Süreyi ay olarak nasıl girerim?', 'Süre alanı yıl cinsindendir. Ay sayısını 12\'ye bölerek yazın: 6 ay için 0,5, 18 ay için 1,5, 30 ay için 2,5.'],
    ['Reklam harcamasının getirisini bu araçla ölçebilir miyim?', 'Evet. Maliyet alanına toplam kampanya harcamasını, değer alanına ise kampanyanın sağladığı brüt kârı (ciroyu değil) yazın; sonuç, harcamanın kendini kaç kat çıkardığını gösterir. Ciroya göre ölçüm için reklam harcaması getirisi (ROAS) ayrı bir ölçüttür.'],
    ['Yazdığım tutarlar saklanıyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; girdiğiniz rakamlar sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['yillik-bilesik-buyume-hesapla', 'ic-verim-orani-hesapla', 'geri-odeme-suresi-hesapla', 'kar-zarar-hesapla', 'reklam-getirisi-hesapla'],
};
