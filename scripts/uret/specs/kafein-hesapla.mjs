export default {
  slug: 'kafein-hesapla',
  title: 'Günlük Kafein Hesaplama',
  h1Tail: 'çay, kahve ve diğer içeceklerden',
  pageTitle: 'Günlük Kafein Hesaplama – Çay ve Kahveden Alınan Kafein Miktarı',
  description: 'Gün içinde içtiğiniz Türk kahvesi, filtre kahve, espresso, çay, kola ve enerji içeceğinden aldığınız toplam kafeini miligram olarak hesaplayın, 400 mg ile karşılaştırın.',
  card: 'Çay, Türk kahvesi, filtre kahve, kola ve enerji içeceğinden aldığınız günlük toplam kafeini hesaplayın.',
  category: 'saglik',
  keywords: ['kafein hesaplama', 'günlük kafein miktarı', 'çayda ne kadar kafein var', 'türk kahvesi kafein', 'günde kaç kahve içilir', 'kafein sınırı', 'bir bardak çay kaç mg kafein'],
  lead: `Gün boyunca içtiğiniz çay, kahve ve diğer kafeinli içeceklerin adedini yazın; araç ortalama kafein içerikleri üzerinden <strong>toplam alımınızı miligram olarak</strong> hesaplar ve sağlıklı yetişkinler için yaygın olarak anılan günlük 400 mg düzeyiyle karşılaştırır.`,
  button: 'Hesapla',
  inputs: [
    { id: 'turkKahvesi', label: 'Türk kahvesi (fincan)', type: 'number', value: '0', hint: 'Fincan başına yaklaşık 60 mg.' },
    { id: 'filtre', label: 'Filtre kahve (240 ml kupa)', type: 'number', value: '0', hint: 'Kupa başına yaklaşık 95 mg.' },
    { id: 'espresso', label: 'Espresso (tek shot)', type: 'number', value: '0', hint: 'Shot başına yaklaşık 63 mg. Latte ve cappuccino için içindeki shot sayısını yazın.' },
    { id: 'hazir', label: 'Hazır (granül) kahve (fincan)', type: 'number', value: '0', hint: 'Fincan başına yaklaşık 60 mg.' },
    { id: 'cay', label: 'Siyah çay (ince belli bardak)', type: 'number', value: '0', hint: 'Yaklaşık 100 ml bardak başına 20 mg.' },
    { id: 'yesilCay', label: 'Yeşil çay (240 ml fincan)', type: 'number', value: '0', hint: 'Fincan başına yaklaşık 28 mg.' },
    { id: 'kola', label: 'Kolalı içecek (330 ml kutu)', type: 'number', value: '0', hint: 'Kutu başına yaklaşık 35 mg.' },
    { id: 'enerji', label: 'Enerji içeceği (250 ml kutu)', type: 'number', value: '0', hint: 'Kutu başına yaklaşık 80 mg.' },
    { id: 'diger', label: 'Diğer kaynaklar (mg)', type: 'number', value: '0', hint: 'Etiketinde yazan kafein miktarını doğrudan miligram olarak ekleyin.' },
    { id: 'kilo', label: 'Vücut ağırlığı (kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 70' },
  ],
  compute(v, h) {
    const kaynak = [
      ['turkKahvesi', 'Türk kahvesi', 60],
      ['filtre', 'Filtre kahve', 95],
      ['espresso', 'Espresso', 63],
      ['hazir', 'Hazır kahve', 60],
      ['cay', 'Siyah çay', 20],
      ['yesilCay', 'Yeşil çay', 28],
      ['kola', 'Kolalı içecek', 35],
      ['enerji', 'Enerji içeceği', 80],
    ];
    let toplam = 0, enCok = null;
    for (const [id, ad, mg] of kaynak) {
      const adet = h.opt(v[id], 0, ad);
      if (adet < 0) h.err(`"${ad}" adedi negatif olamaz.`);
      if (adet > 100) h.err(`"${ad}" adedi 100'den büyük olamaz.`);
      const m = adet * mg;
      toplam += m;
      if (m > 0 && (!enCok || m > enCok[1])) enCok = [ad, m];
    }
    const diger = h.opt(v.diger, 0, 'Diğer kaynaklar');
    if (diger < 0) h.err('"Diğer kaynaklar" negatif olamaz.');
    toplam += diger;
    if (diger > 0 && (!enCok || diger > enCok[1])) enCok = ['Diğer kaynaklar', diger];
    if (!(toplam > 0)) h.err('En az bir içecek için adet ya da "Diğer kaynaklar" alanına miligram değeri girin.');
    const sinir = 400;
    let durum;
    if (toplam <= 200 + 1e-9) durum = 'Düşük–orta düzey';
    else if (toplam <= sinir + 1e-9) durum = '400 mg düzeyinin altında';
    else durum = '400 mg düzeyinin üzerinde';
    const rows = [
      ['Toplam kafein', h.fmt(toplam, 0) + ' mg'],
      ['400 mg düzeyine oran', '%' + h.fmt((toplam / sinir) * 100, 0)],
      toplam <= sinir + 1e-9 ? ['400 mg düzeyine kalan', h.fmt(sinir - toplam, 0) + ' mg'] : ['400 mg düzeyini aşan', h.fmt(toplam - sinir, 0) + ' mg'],
      ['Değerlendirme', durum],
      ['En büyük kaynak', `${enCok[0]} (${h.fmt(enCok[1], 0)} mg)`],
      ['Filtre kahve eşdeğeri', h.fmt(toplam / 95, 1) + ' kupa'],
    ];
    if (String(v.kilo ?? '').trim() !== '') {
      const kg = h.pos(v.kilo, 'Vücut ağırlığı');
      if (kg < 20 || kg > 250) h.err('Vücut ağırlığı 20 ile 250 kg arasında olmalı.');
      rows.push(['Kilogram başına', h.fmt(toplam / kg, 1) + ' mg/kg']);
    }
    return { rows, note: 'İçeceklerin kafein içeriği demleme süresine, çekirdek ve çay türüne, porsiyona göre değişir; değerler yaklaşık ortalamalardır.' };
  },
  cases: [
    { in: { turkKahvesi: '2', cay: '5' }, out: { 'Toplam kafein': '220 mg', '400 mg düzeyine oran': '%55', '400 mg düzeyine kalan': '180 mg', 'Değerlendirme': '400 mg düzeyinin altında', 'En büyük kaynak': 'Türk kahvesi (120 mg)', 'Filtre kahve eşdeğeri': '2,3 kupa' } },
    { in: { filtre: '4', enerji: '2' }, out: { 'Toplam kafein': '540 mg', '400 mg düzeyine oran': '%135', '400 mg düzeyini aşan': '140 mg', 'Değerlendirme': '400 mg düzeyinin üzerinde', 'En büyük kaynak': 'Filtre kahve (380 mg)' } },
    { in: { espresso: '2', kola: '1', kilo: '70' }, out: { 'Toplam kafein': '161 mg', 'Kilogram başına': '2,3 mg/kg', 'Değerlendirme': 'Düşük–orta düzey' } },
    { in: { filtre: '3', enerji: '1' }, out: { 'Toplam kafein': '365 mg', '400 mg düzeyine oran': '%91', '400 mg düzeyine kalan': '35 mg' } },
    { in: { yesilCay: '2', diger: '150' }, out: { 'Toplam kafein': '206 mg', 'En büyük kaynak': 'Diğer kaynaklar (150 mg)' } },
    { in: { hazir: '2', cay: '3', kilo: '60' }, out: { 'Toplam kafein': '180 mg', 'Kilogram başına': '3 mg/kg', '400 mg düzeyine oran': '%45' } },
    { in: { cay: '20' }, out: { 'Toplam kafein': '400 mg', '400 mg düzeyine kalan': '0 mg', 'Değerlendirme': '400 mg düzeyinin altında' } },
    { in: {}, error: true },
    { in: { cay: '-2' }, error: true },
    { in: { filtre: 'iki' }, error: true },
  ],
  howto: [
    `Sabahtan akşama kadar içtiğiniz her içeceğin adedini ilgili alana yazın. İçmediklerinizi 0 olarak bırakın; yarım fincan için 0,5 yazabilirsiniz.`,
    `Latte, cappuccino ve americano gibi espresso bazlı içecekleri, içlerindeki shot sayısı kadar "Espresso" alanına ekleyin.`,
    `Kafeinli takviye, ağrı kesici, bitter çikolata ya da listede olmayan bir içecek tükettiyseniz etiketindeki kafein miktarını "Diğer kaynaklar" alanına miligram olarak girin.`,
    `Kilogram başına alımı görmek isterseniz kilonuzu yazın ve "Hesapla" düğmesine basın.`,
    `Sonuçta toplam kafeini, 400 mg düzeyine oranını ve en çok kafeini hangi içecekten aldığınızı inceleyin.`,
  ],
  sections: [
    { h: 'Hesaplama nasıl yapılıyor?', p: [
      `Araç her içecek için ortalama bir porsiyon kafein değeri kullanır, bunu yazdığınız adetle çarpar ve hepsini toplar: <strong>toplam kafein = Σ (adet × porsiyon başına mg)</strong>. "Diğer kaynaklar" alanına yazdığınız miligram değeri doğrudan toplama eklenir.`,
      `Çözümlü örnek: Gün içinde 2 fincan Türk kahvesi ve 5 ince belli bardak çay içen biri için 2 × 60 + 5 × 20 = 120 + 100 = <strong>220 mg</strong> bulunur. Bu, 400 mg düzeyinin yüzde 55'idir; geriye 180 mg kalır. Aynı miktar yaklaşık 2,3 kupa filtre kahveye denktir. Dört kupa filtre kahve ile iki kutu enerji içeceği içen biri ise 4 × 95 + 2 × 80 = 540 mg alır ve bu düzeyi 140 mg aşar.`,
    ] },
    { h: 'Kullanılan ortalama kafein değerleri', ul: [
      `<strong>Türk kahvesi</strong> (1 fincan, yaklaşık 60–70 ml): 60 mg`,
      `<strong>Filtre kahve</strong> (1 kupa, 240 ml): 95 mg`,
      `<strong>Espresso</strong> (tek shot, 30 ml): 63 mg`,
      `<strong>Hazır granül kahve</strong> (1 fincan): 60 mg`,
      `<strong>Siyah çay</strong> (ince belli bardak, yaklaşık 100 ml): 20 mg`,
      `<strong>Yeşil çay</strong> (1 fincan, 240 ml): 28 mg`,
      `<strong>Kolalı içecek</strong> (330 ml kutu): 35 mg`,
      `<strong>Enerji içeceği</strong> (250 ml kutu): 80 mg`,
    ], p: [
      `Bu sayılar yaygın olarak bildirilen ortalamalardır; gerçek içerik geniş bir aralıkta oynar. Ambalajlı ürünlerde etiketteki değeri "Diğer kaynaklar" alanına yazmak her zaman daha doğrudur.`,
    ] },
    { h: 'Çay ve kahvede kafeini ne değiştirir?', p: [
      `Türkiye'de çay demlikte koyu demlenip bardakta sıcak suyla açıldığı için bir bardaktaki kafein, demin oranına göre belirgin biçimde değişir. Tavşan kanı koyu bir çay ile açık bir çay arasında iki kata yakın fark olabilir. Demleme süresi uzadıkça ve kullanılan kuru çay miktarı arttıkça kafein de artar. Büyük boy bardak ya da kupa kullanıyorsanız adedi buna göre artırın; 200 ml'lik bir kupa iki ince belli bardak sayılabilir.`,
      `Kahvede çekirdek türü belirleyicidir: robusta çekirdekleri arabica'ya göre yaklaşık iki kat kafein içerir. Kavurma derecesi sanıldığının aksine büyük fark yaratmaz. Asıl farkı porsiyon boyutu yapar; kahve zincirlerindeki büyük boy filtre kahveler 400–500 ml olabilir ve tek başına iki kupadan fazla sayılmalıdır. Kafeinsiz kahve de tamamen kafeinsiz değildir, fincan başına birkaç miligram içerir.`,
    ] },
    { h: 'Günlük ne kadar kafein makul kabul edilir?', p: [
      `Gıda güvenliği kurumlarının değerlendirmelerinde sağlıklı yetişkinler için günde <strong>400 mg'a kadar</strong> kafein alımının genel olarak güvenlik kaygısı oluşturmadığı belirtilir; araç karşılaştırmayı bu düzeye göre yapar. Tek seferde alınan miktar için yaklaşık 200 mg, yani kilogram başına 3 mg civarı bir değer anılır. Gebelik ve emzirme döneminde önerilen düzey daha düşüktür ve genellikle günde 200 mg olarak ifade edilir.`,
      `Çocuklar ve ergenler için sınır vücut ağırlığına göre düşünülür ve yetişkinlere göre çok daha düşüktür; kilonuzu girdiğinizde gösterilen mg/kg değeri bu açıdan fikir verir. Bu rakamlar genel nüfus içindir ve zamanla güncellenebilir; kişisel durumunuz için güncel resmî önerilere ve hekiminizin görüşüne başvurun.`,
    ] },
    { h: 'Kafein vücutta ne kadar kalır?', p: [
      `Kafein içildikten sonra yaklaşık 30–60 dakika içinde kanda en yüksek düzeye ulaşır. Yarılanma ömrü sağlıklı yetişkinlerde ortalama 5 saat civarındadır, ancak kişiden kişiye 3 ile 7 saat arasında değişir; gebelikte ve bazı ilaçlarla birlikte uzar, sigara içenlerde kısalır. Bu, saat 16.00'da içilen bir kupa filtre kahvedeki kafeinin yaklaşık yarısının gece 21.00'de hâlâ vücutta olduğu anlamına gelir.`,
      `Uykuya dalmakta zorlanıyorsanız yalnızca toplam miktara değil, son kafeinli içeceğin saatine de bakın. Birçok kişi için öğleden sonra geç saatlerden itibaren kafeini kesmek, toplam miktarı azaltmaktan daha etkili olur.`,
    ] },
    { h: 'Fazla kafeinin belirtileri ve uyarı', p: [
      `Kafeine duyarlılık kalıtsal etkenlere ve alışkanlığa göre çok değişir. Bazı kişiler tek fincanda çarpıntı ve huzursuzluk yaşarken bazıları günde beş altı fincanı sorunsuz tolere eder. Yüksek alımda sık görülen belirtiler arasında uykusuzluk, el titremesi, sinirlilik, mide yanması, sık idrara çıkma ve kalp çarpıntısı vardır. Düzenli yüksek tüketimden sonra aniden bırakmak baş ağrısı ve yorgunluğa yol açabilir; azaltmayı birkaç güne yaymak daha rahattır.`,
      `Bu araç bilgilendirme amaçlıdır ve tıbbi tavsiye değildir. Kalp ritim bozukluğu, yüksek tansiyon, reflü, anksiyete bozukluğu olanlar, gebeler, emzirenler ve düzenli ilaç kullananlar kendileri için uygun kafein miktarını hekimlerine danışmalıdır. Saf kafein tozu ve yüksek dozlu takviyeler ciddi zehirlenme riski taşır.`,
    ] },
  ],
  faq: [
    ['Bir bardak çayda ne kadar kafein var?', `İnce belli bardakta, orta demli bir siyah çayda yaklaşık 20 mg kafein bulunur. Koyu demli çayda bu değer 30 mg'ın üzerine çıkabilir, açık çayda 10–15 mg'a inebilir.`],
    ['Türk kahvesinde mi filtre kahvede mi daha çok kafein var?', `Mililitre başına Türk kahvesi daha yoğundur, ancak fincanı küçük olduğu için porsiyon başına filtre kahve daha fazla kafein içerir: bir kupa filtre kahve yaklaşık 95 mg, bir fincan Türk kahvesi yaklaşık 60 mg.`],
    ['Günde kaç fincan kahve içilebilir?', `400 mg düzeyi esas alınırsa bu kabaca 4 kupa filtre kahveye ya da 6 fincan Türk kahvesine karşılık gelir; ancak çay, kola ve çikolata gibi diğer kaynakları da saymak gerekir. Kişisel tolerans ve sağlık durumu bu sayıyı değiştirir.`],
    ['Günde 20 bardak çay içmek zararlı mı?', `Ortalama değerlerle 20 ince belli bardak çay yaklaşık 400 mg kafein eder; yani tek başına bu düzeye ulaşır. Çay koyu demleniyorsa ya da yanında kahve içiliyorsa düzey aşılır. Uyku ya da çarpıntı sorunu yaşıyorsanız azaltmayı düşünün ve hekiminize danışın.`],
    ['Gebelikte ne kadar kafein alınabilir?', `Gebelikte önerilen düzey genel yetişkin değerinin altındadır ve çoğu kaynakta günde 200 mg olarak geçer. Kesin öneri için sizi takip eden hekime danışın.`],
    ['Latte ya da cappuccino için ne yazmalıyım?', `Bu içeceklerin kafeini içlerindeki espressodan gelir. Tek shot ile hazırlanmışsa Espresso alanına 1, çift shot ise 2 yazın; eklenen süt kafein miktarını değiştirmez.`],
    ['Çikolata ve ilaçlardaki kafein hesaba katılıyor mu?', `Listede ayrı bir alanları yoktur. Ürün etiketindeki ya da prospektüsteki kafein miktarını "Diğer kaynaklar" alanına miligram olarak ekleyebilirsiniz.`],
    ['Yazdığım bilgiler kaydediliyor mu?', `Hayır. Hesaplama tamamen tarayıcınızda yapılır; içecek adetleri ve kilo bilginiz hiçbir sunucuya gönderilmez.`],
  ],
  related: ['uyku-borcu-hesapla', 'vucut-su-orani-hesapla', 'protein-ihtiyaci-hesapla', 'tansiyon-degerlendirme', 'kreatin-dozu-hesapla'],
};
