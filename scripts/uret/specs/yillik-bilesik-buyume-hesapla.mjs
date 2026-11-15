export default {
  slug: 'yillik-bilesik-buyume-hesapla',
  title: 'Yıllık Bileşik Büyüme Oranı (CAGR) Hesaplama',
  h1Tail: 'başlangıç ve bitiş değerinden',
  pageTitle: 'Yıllık Bileşik Büyüme Oranı (CAGR) Hesaplama Aracı',
  description: 'Başlangıç değeri, bitiş değeri ve yıl sayısını yazın; yıllık bileşik büyüme oranını (CAGR), toplam büyümeyi ve basit yıllık ortalamayı anında hesaplayın.',
  card: 'Başlangıç ve bitiş değerinden yıllık bileşik büyüme oranını (CAGR) ve toplam büyümeyi hesaplayın.',
  category: 'finans',
  keywords: ['cagr hesaplama', 'yıllık bileşik büyüme oranı', 'bileşik büyüme hesaplama', 'ybbo hesaplama', 'cagr formülü', 'ortalama yıllık büyüme', 'ciro büyüme oranı'],
  lead: 'Ciro, müşteri sayısı, portföy değeri ya da nüfus gibi bir büyüklüğün ilk ve son değerini, aradaki yıl sayısıyla birlikte yazın. Araç, bu büyümeyi her yıl aynı hızla gerçekleşmiş gibi tek bir orana indirger: <strong>yıllık bileşik büyüme oranı (CAGR)</strong>.',
  button: 'Hesapla',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç değeri', type: 'number', placeholder: 'Örn. 1000000' },
    { id: 'bitis', label: 'Bitiş değeri', type: 'number', placeholder: 'Örn. 2500000' },
    { id: 'yil', label: 'Süre (yıl)', type: 'number', placeholder: 'Örn. 4', hint: 'İki değer arasındaki yıl sayısı; 2020 sonu ile 2024 sonu arası 4 yıldır.' },
  ],
  compute(v, h) {
    const a = h.pos(v.baslangic, 'Başlangıç değeri');
    const b = h.nonneg(v.bitis, 'Bitiş değeri');
    const n = h.pos(v.yil, 'Süre');
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const kat = b / a;
    const cagr = (Math.pow(kat, 1 / n) - 1) * 100;
    const toplam = (kat - 1) * 100;
    const rows = [
      ['Yıllık bileşik büyüme (CAGR)', yuzde(cagr)],
      ['Toplam büyüme', yuzde(toplam)],
      ['Büyüme katsayısı', h.fmt(kat, 4) + ' kat'],
      ['Mutlak değişim', h.fmt(b - a, 2)],
      ['Basit yıllık ortalama', yuzde(toplam / n)],
    ];
    if (cagr > 0) rows.push(['Bu hızla ikiye katlanma süresi', h.fmt(Math.log(2) / Math.log(1 + cagr / 100), 2) + ' yıl']);
    return { rows, note: 'CAGR = (bitiş ÷ başlangıç)^(1 ÷ yıl) − 1. Oran, aradaki yılların iniş çıkışını göstermez; yalnızca iki uç değeri birbirine bağlar.' };
  },
  cases: [
    { in: { baslangic: '1000', bitis: '2000', yil: '5' }, out: { 'Yıllık bileşik büyüme (CAGR)': '%14,87', 'Toplam büyüme': '%100', 'Basit yıllık ortalama': '%20' } },
    { in: { baslangic: '100', bitis: '121', yil: '2' }, out: { 'Yıllık bileşik büyüme (CAGR)': '%10', 'Toplam büyüme': '%21', 'Büyüme katsayısı': '1,21 kat' } },
    { in: { baslangic: '1000', bitis: '1331', yil: '3' }, out: { 'Yıllık bileşik büyüme (CAGR)': '%10', 'Mutlak değişim': '331' } },
    { in: { baslangic: '200', bitis: '100', yil: '2' }, out: { 'Yıllık bileşik büyüme (CAGR)': '-%29,29', 'Toplam büyüme': '-%50' } },
    { in: { baslangic: '10000', bitis: '25000', yil: '4' }, out: { 'Yıllık bileşik büyüme (CAGR)': '%25,74', 'Toplam büyüme': '%150' } },
    { in: { baslangic: '100', bitis: '200', yil: '1' }, out: { 'Yıllık bileşik büyüme (CAGR)': '%100', 'Bu hızla ikiye katlanma süresi': '1 yıl' } },
    { in: { baslangic: '500', bitis: '500', yil: '3' }, out: { 'Yıllık bileşik büyüme (CAGR)': '%0' } },
    { in: { baslangic: '0', bitis: '100', yil: '3' }, error: true },
    { in: { baslangic: '100', bitis: '200', yil: '0' }, error: true },
  ],
  howto: [
    '"Başlangıç değeri" alanına dönemin ilk değerini yazın: ilk yılın cirosu, yatırımın ilk tutarı ya da başlangıçtaki müşteri sayısı gibi.',
    '"Bitiş değeri" alanına dönemin son değerini girin. Birim önemli değildir, yeter ki iki değer aynı birimde olsun.',
    '"Süre" alanına iki ölçüm arasındaki yıl sayısını yazın. Dönem tam yıl değilse ondalıklı girebilirsiniz; 30 ay için 2,5.',
    '"Hesapla" düğmesine basın. CAGR, toplam büyüme, katsayı, basit ortalama ve aynı hızla ikiye katlanma süresi görünür.',
  ],
  sections: [
    { h: 'CAGR nedir?', p: [
      'CAGR, "compound annual growth rate" ifadesinin kısaltmasıdır; Türkçede yıllık bileşik büyüme oranı, kısaca YBBO olarak da yazılır. Bir büyüklüğün belirli bir dönemin başındaki değerinden sonundaki değerine ulaşması için her yıl sabit hangi oranda büyümesi gerektiğini gösterir.',
      'Gerçekte hiçbir şirketin cirosu ya da hiçbir yatırımın değeri her yıl aynı oranda artmaz; bir yıl %40 büyür, ertesi yıl %5 küçülür. CAGR bu dalgalanmayı düzleştirir ve "ortalama olarak yılda yüzde kaç" sorusuna bileşik etkiyi dikkate alan dürüst bir cevap verir. Bu yüzden faaliyet raporlarında, pazar araştırmalarında ve yatırım fonu karşılaştırmalarında en sık görülen büyüme ölçüsüdür.',
    ] },
    { h: 'CAGR formülü', p: [
      'Formül şöyledir: <strong>CAGR = (Bitiş değeri ÷ Başlangıç değeri)<sup>1/n</sup> − 1</strong>. Burada <em>n</em> yıl sayısıdır. Önce bitiş değerini başlangıca bölerek büyüme katsayısını bulursunuz, sonra bu katsayının n\'inci dereceden kökünü alır ve 1 çıkarırsınız. Sonucu 100 ile çarpınca yüzde elde edilir.',
      'Dikkat edilmesi gereken nokta yıl sayısıdır: süre, veri noktası sayısı değil aradaki aralık sayısıdır. 2020, 2021, 2022, 2023 ve 2024 yıllarının yıl sonu ciroları elinizdeyse beş veri vardır ama aradaki süre dört yıldır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir işletmenin cirosu dört yılda 10.000 birimden 25.000 birime çıkmış olsun. Büyüme katsayısı 25.000 ÷ 10.000 = 2,5\'tir, yani toplam büyüme %150\'dir. 2,5\'in dördüncü dereceden kökü yaklaşık 1,2574 eder; 1 çıkarınca <strong>%25,74</strong> bulunur.',
      'Sağlamasını yapalım: 10.000 × 1,2574 = 12.574; × 1,2574 = 15.811; × 1,2574 = 19.880; × 1,2574 = 24.997. Yuvarlama farkı dışında bitiş değerine ulaşılır. Aynı dönem için basit ortalama %150 ÷ 4 = %37,5 çıkar; ama her yıl %37,5 büyüyen bir ciro dört yılın sonunda 35.745 olurdu. Basit ortalamanın büyümeyi neden abarttığı buradan görülür.',
      'Küçük bir denetim örneği: 100 birim iki yılda 121 birime çıktıysa CAGR tam %10\'dur, çünkü 100 × 1,1 × 1,1 = 121 eder.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Şirket analizi:</strong> ciro, net kâr, çalışan sayısı ya da mağaza sayısının son üç, beş ya da on yıldaki büyüme hızını tek rakamla özetlemek.',
      '<strong>Yatırım karşılaştırması:</strong> farklı sürelerde tutulmuş hisse, fon, altın ya da gayrimenkul yatırımlarının yıllık getirisini aynı ölçeğe getirmek.',
      '<strong>Pazar büyüklüğü:</strong> bir sektörün gelecek yıllardaki tahmini büyüklüğünü bugünkü değere bağlayan beklenen büyüme oranını ifade etmek.',
      '<strong>Operasyonel göstergeler:</strong> web sitesi ziyaretçisi, abone sayısı, üretim adedi gibi parasal olmayan büyüklüklerin gelişimini izlemek.',
      '<strong>Hedef belirleme:</strong> "beş yılda ciroyu ikiye katlamak" hedefinin yılda yaklaşık %14,87 büyüme gerektirdiğini görmek.',
    ] },
    { h: 'CAGR\'ın göstermedikleri', p: [
      'Oran yalnızca ilk ve son değere bakar; aradaki yolu görmez. Değeri bir yıl yarıya düşüp sonra toparlanan bir yatırımla her yıl düzenli artan bir yatırım aynı CAGR\'a sahip olabilir, oysa riskleri çok farklıdır. Ayrıca başlangıç ya da bitiş yılı olağan dışı bir yılsa (kriz yılı, tek seferlik büyük satış) oran yanıltıcı olur; mümkünse farklı başlangıç yıllarıyla da hesaplayıp sonuçları karşılaştırın.',
      'Döneme para eklenip çekildiyse, örneğin her ay birikim yapılan bir portföyde, CAGR tek başına doğru getiriyi vermez; bu durumda nakit akışlarını dikkate alan iç verim oranı kullanılmalıdır. Türk lirası cinsinden büyüme oranlarında enflasyonu da unutmayın: nominal %50\'lik bir büyüme, fiyatların %60 arttığı dönemde reel olarak küçülmedir.',
    ] },
    { h: 'Negatif ve sıfır değerler', p: [
      'Bitiş değeri başlangıçtan küçükse oran negatif çıkar ve yıllık bileşik küçülmeyi gösterir: 200\'den 100\'e iki yılda düşen bir değer için CAGR -%29,29\'dur. Başlangıç değeri sıfır ya da negatifse oran matematiksel olarak tanımsızdır; zarardan kâra geçen bir şirketin kâr büyümesi bu yöntemle ifade edilemez. Araç bu durumda hata verir. Sonuçlar bilgilendirme amaçlıdır; yatırım kararı için tek başına yeterli değildir.',
    ] },
  ],
  faq: [
    ['CAGR nasıl hesaplanır?', 'Bitiş değerini başlangıç değerine bölün, sonucun yıl sayısı kadar derecesinden kökünü alın ve 1 çıkarın. 1.000\'den 2.000\'e beş yılda çıkan bir değer için 2\'nin beşinci dereceden kökü 1,1487\'dir; CAGR %14,87 olur.'],
    ['CAGR ile ortalama büyüme arasındaki fark nedir?', 'Basit ortalama toplam büyümeyi yıl sayısına böler ve bileşik etkiyi yok sayar. CAGR ise her yılın büyümesinin bir önceki yılın değerine eklendiğini hesaba katar. Büyüyen serilerde CAGR her zaman basit ortalamadan düşüktür.'],
    ['Yıl sayısını nasıl saymalıyım?', 'İki ölçüm tarihi arasındaki süreyi alın. 2019 yıl sonu ile 2024 yıl sonu arası 5 yıldır. Elinizde altı yıllık veri olsa bile aralık sayısı beştir.'],
    ['Bir yıldan kısa süreler için kullanılır mı?', 'Hesap yapılabilir; 6 ay için 0,5 yazarsınız. Ancak sonuç, kısa dönemdeki büyümenin yıl boyunca aynı hızla süreceğini varsayar ve bu çoğu zaman gerçekçi değildir. Kısa dönemlerde dikkatli yorumlayın.'],
    ['CAGR negatif çıkarsa ne anlama gelir?', 'Büyüklüğün dönem boyunca yıllık ortalama o oranda küçüldüğünü gösterir. Örneğin -%10, değerin her yıl bir önceki yılın %90\'ına indiği bir seyirle aynı sonuca varır.'],
    ['İkiye katlanma süresi nasıl bulunuyor?', 'Aynı büyüme oranının sürdüğü varsayılarak ln(2) ÷ ln(1 + oran) formülüyle hesaplanır. %14,87 büyüme için bu süre 5 yıldır; yaklaşık hesapta 72\'yi orana bölen kural da benzer sonuç verir.'],
    ['Aylık büyüme oranını bulabilir miyim?', 'Süre alanına ay sayısını yıl yerine doğrudan yazarsanız çıkan oran aylık bileşik büyüme oranı olur. Örneğin 12 ayda 1.000\'den 2.000\'e çıkan bir değer için süreye 12 yazıldığında aylık yaklaşık %5,95 bulunur.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. İşlem tamamen tarayıcınızda yapılır; yazdığınız rakamlar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['yatirim-getirisi-hesapla', 'ic-verim-orani-hesapla', '72-kurali-hesapla', 'gelecek-deger-hesapla', 'reel-faiz-hesapla'],
};
