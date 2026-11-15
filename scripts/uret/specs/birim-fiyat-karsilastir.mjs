export default {
  slug: 'birim-fiyat-karsilastir',
  title: 'Birim Fiyat Karşılaştırma',
  h1Tail: 'hangi paket daha ucuz?',
  pageTitle: 'Birim Fiyat Karşılaştırma – Hangi Paket Daha Ucuz Hesaplama',
  description: 'İki ürünün fiyatını ve miktarını yazın; kilogram, litre, metre ya da adet başına birim fiyatı hesaplayıp hangisinin daha hesaplı olduğunu görün.',
  card: 'İki paketin kilo, litre, metre ya da adet fiyatını karşılaştırın; hangisinin gerçekten ucuz olduğunu görün.',
  category: 'finans',
  keywords: ['birim fiyat hesaplama', 'birim fiyat karşılaştırma', 'kilo fiyatı hesaplama', 'litre fiyatı hesaplama', 'hangisi daha ucuz', 'gramaj fiyat karşılaştırma', 'market fiyat karşılaştırma'],
  lead: 'Farklı boyutlardaki iki paketin fiyatını ve miktarını yazın; araç ikisini de aynı birime (kilogram, litre, metre ya da adet) indirger ve <strong>birim fiyatı düşük olanı</strong> yüzde farkıyla birlikte gösterir.',
  button: 'Karşılaştır',
  inputs: [
    { id: 'fiyatA', label: 'A ürünü fiyatı (TL)', type: 'number', placeholder: 'Örn. 45' },
    { id: 'miktarA', label: 'A ürünü miktarı', type: 'number', placeholder: 'Örn. 750' },
    { id: 'birimA', label: 'A ürünü birimi', type: 'select', options: [['g', 'Gram (g)'], ['kg', 'Kilogram (kg)'], ['ml', 'Mililitre (ml)'], ['l', 'Litre (L)'], ['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['adet', 'Adet']] },
    { id: 'fiyatB', label: 'B ürünü fiyatı (TL)', type: 'number', placeholder: 'Örn. 55' },
    { id: 'miktarB', label: 'B ürünü miktarı', type: 'number', placeholder: 'Örn. 1' },
    { id: 'birimB', label: 'B ürünü birimi', type: 'select', options: [['g', 'Gram (g)'], ['kg', 'Kilogram (kg)'], ['ml', 'Mililitre (ml)'], ['l', 'Litre (L)'], ['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['adet', 'Adet']] },
  ],
  compute(v, h) {
    const BIRIM = {
      g: ['kutle', 0.001], kg: ['kutle', 1],
      ml: ['hacim', 0.001], l: ['hacim', 1],
      cm: ['uzunluk', 0.01], m: ['uzunluk', 1],
      adet: ['adet', 1],
    };
    const TABAN = { kutle: 'kg', hacim: 'L', uzunluk: 'm', adet: 'adet' };
    const fA = h.pos(v.fiyatA, 'A ürünü fiyatı');
    const mA = h.pos(v.miktarA, 'A ürünü miktarı');
    const fB = h.pos(v.fiyatB, 'B ürünü fiyatı');
    const mB = h.pos(v.miktarB, 'B ürünü miktarı');
    const bA = BIRIM[v.birimA] || BIRIM.g;
    const bB = BIRIM[v.birimB] || BIRIM.g;
    if (bA[0] !== bB[0]) h.err('İki ürünün birimi aynı türden olmalı: gram ile kilogram, mililitre ile litre, santimetre ile metre ya da adet ile adet karşılaştırılabilir.');
    const taban = TABAN[bA[0]];
    const tA = mA * bA[1];
    const tB = mB * bB[1];
    const pA = fA / tA;
    const pB = fB / tB;
    const esit = Math.abs(pA - pB) <= 1e-9 * Math.max(pA, pB);
    const ucuz = Math.min(pA, pB);
    const pahali = Math.max(pA, pB);
    const fark = esit ? 0 : pahali - ucuz;
    const yuzde = esit ? 0 : (fark / pahali) * 100;
    const kazanan = esit ? 'İkisi eşit' : (pA < pB ? 'A ürünü' : 'B ürünü');
    const buyuk = Math.max(tA, tB);
    return {
      rows: [
        ['Hesaplı olan', kazanan],
        ['A birim fiyatı', h.fix(pA, 2) + ' TL/' + taban],
        ['B birim fiyatı', h.fix(pB, 2) + ' TL/' + taban],
        ['Birim fiyat farkı', h.fix(fark, 2) + ' TL/' + taban],
        ['Yüzde fark', '%' + h.fmt(yuzde, 2)],
        [h.fmt(buyuk, 3) + ' ' + taban + ' alımda tasarruf', h.para(fark * buyuk)],
      ],
      note: esit
        ? 'İki ürünün birim fiyatı aynı; seçimi ihtiyacınız olan miktara, son kullanma tarihine ve kaliteye göre yapın.'
        : 'Yüzde fark, pahalı ürünün birim fiyatına göre hesaplanır. Karşılaştırma yalnızca fiyatı ölçer; kalite ve içerik farkını ayrıca değerlendirin.',
    };
  },
  cases: [
    { in: { fiyatA: '45', miktarA: '750', birimA: 'g', fiyatB: '55', miktarB: '1', birimB: 'kg' }, out: { 'Hesaplı olan': 'B ürünü', 'A birim fiyatı': '60,00 TL/kg', 'B birim fiyatı': '55,00 TL/kg', 'Birim fiyat farkı': '5,00 TL/kg', 'Yüzde fark': '%8,33', '1 kg alımda tasarruf': '5,00 TL' } },
    { in: { fiyatA: '40', miktarA: '2', birimA: 'kg', fiyatB: '25', miktarB: '1', birimB: 'kg' }, out: { 'Hesaplı olan': 'A ürünü', 'A birim fiyatı': '20,00 TL/kg', 'B birim fiyatı': '25,00 TL/kg', 'Yüzde fark': '%20', '2 kg alımda tasarruf': '10,00 TL' } },
    { in: { fiyatA: '18', miktarA: '500', birimA: 'ml', fiyatB: '30', miktarB: '1', birimB: 'l' }, out: { 'Hesaplı olan': 'B ürünü', 'A birim fiyatı': '36,00 TL/L', 'B birim fiyatı': '30,00 TL/L', 'Yüzde fark': '%16,67' } },
    { in: { fiyatA: '120', miktarA: '32', birimA: 'adet', fiyatB: '90', miktarB: '24', birimB: 'adet' }, out: { 'Hesaplı olan': 'İkisi eşit', 'A birim fiyatı': '3,75 TL/adet', 'B birim fiyatı': '3,75 TL/adet', 'Yüzde fark': '%0' } },
    { in: { fiyatA: '100', miktarA: '500', birimA: 'cm', fiyatB: '150', miktarB: '10', birimB: 'm' }, out: { 'Hesaplı olan': 'B ürünü', 'A birim fiyatı': '20,00 TL/m', 'B birim fiyatı': '15,00 TL/m', 'Yüzde fark': '%25', '10 m alımda tasarruf': '50,00 TL' } },
    { in: { fiyatA: '30', miktarA: '1', birimA: 'l', fiyatB: '80', miktarB: '3', birimB: 'l' }, out: { 'Hesaplı olan': 'B ürünü', 'B birim fiyatı': '26,67 TL/L', 'Yüzde fark': '%11,11' } },
    { in: { fiyatA: '45', miktarA: '750', birimA: 'g', fiyatB: '55', miktarB: '1', birimB: 'l' }, error: true },
    { in: { fiyatA: '45', miktarA: '0', birimA: 'g', fiyatB: '55', miktarB: '1', birimB: 'kg' }, error: true },
    { in: { fiyatA: '', miktarA: '750', birimA: 'g', fiyatB: '55', miktarB: '1', birimB: 'kg' }, error: true },
  ],
  howto: [
    'A ürününün raf fiyatını ve ambalajın üzerinde yazan net miktarı girin; miktarın birimini (gram, kilogram, mililitre, litre, santimetre, metre ya da adet) listeden seçin.',
    'Aynı bilgileri B ürünü için doldurun. Birimler birebir aynı olmak zorunda değildir; biri gram diğeri kilogram olabilir, araç ikisini ortak birime çevirir.',
    '"Karşılaştır" düğmesine basın. İlk satır hangi ürünün hesaplı olduğunu, sonraki satırlar her ürünün kilogram, litre, metre ya da adet başına fiyatını gösterir.',
    '"Yüzde fark" satırına bakarak farkın gerçekten anlamlı olup olmadığına karar verin; küçük farklarda son kullanma tarihi ve tüketim hızınız daha belirleyici olabilir.',
  ],
  sections: [
    { h: 'Birim fiyat nedir?', p: [
      'Birim fiyat, bir ürünün belirli bir ölçü birimi başına düşen fiyatıdır: bir kilogram peynirin, bir litre deterjanın, bir metre kablonun ya da tek bir bebek bezinin kaç liraya geldiği. Raf etiketindeki toplam fiyat paketin büyüklüğüne bağlı olduğu için tek başına karşılaştırma yapmaya elverişli değildir; 750 gramlık paketle 1 kilogramlık paketi yan yana koyduğunuzda hangisinin ucuz olduğunu ancak ikisini aynı birime indirerek anlayabilirsiniz.',
      'Marketlerde raf etiketlerinin köşesinde küçük puntolarla birim fiyat da yazar; ancak kampanyalı ürünlerde, pazar yeri sitelerinde ve çoklu paketlerde bu bilgi her zaman göz önünde olmaz ya da farklı birimlerle verilir. Bu araç, elinizdeki iki seçeneği aynı tabana oturtup farkı net biçimde ortaya koyar.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Formül son derece yalındır: <strong>birim fiyat = fiyat ÷ miktar</strong>. Dikkat edilmesi gereken tek nokta, iki ürünün miktarının aynı birimde olmasıdır. Araç gramı kilograma, mililitreyi litreye, santimetreyi metreye çevirdikten sonra bölme işlemini yapar; adet ile satılan ürünlerde doğrudan adet başına fiyatı bulur.',
      'Yüzde fark ise şöyle hesaplanır: <strong>(pahalı birim fiyat − ucuz birim fiyat) ÷ pahalı birim fiyat × 100</strong>. Bu oran, hesaplı ürünü seçtiğinizde aynı miktar için ne kadar az ödeyeceğinizi gösterir.',
    ] },
    { h: 'Çözümlü örnek: 750 gram mı, 1 kilogram mı?', p: [
      'Rafta aynı markanın iki paketi olsun: 750 gramlık paket 45 TL, 1 kilogramlık paket 55 TL. İlk bakışta küçük paket 10 TL daha ucuz görünür. Birim fiyata bakalım: 750 gram 0,75 kilogramdır, 45 ÷ 0,75 = <strong>60,00 TL/kg</strong>. Büyük pakette 55 ÷ 1 = <strong>55,00 TL/kg</strong>. Kilogram başına fark 5,00 TL, yüzde olarak 5 ÷ 60 × 100 = %8,33\'tür. Yani büyük paket her kilogramda 5 TL kazandırır.',
      'Başka bir örnek: 500 mililitrelik şampuan 18 TL, 1 litrelik şişesi 30 TL. Küçük şişenin litre fiyatı 18 ÷ 0,5 = 36,00 TL, büyük şişeninki 30,00 TL\'dir; büyük şişe %16,67 daha hesaplıdır. Aracın sonuç satırları bu sayıları aynen verir.',
    ] },
    { h: 'Büyük paket her zaman daha ucuz mu?', p: [
      'Yaygın kanının aksine hayır. Üreticiler ve zincir marketler zaman zaman küçük ambalajı kampanyaya sokar ve birim fiyatı büyük paketin altına düşer. "Ekonomik boy", "aile boyu" ya da "avantaj paketi" gibi ifadeler bir fiyat garantisi değil, pazarlama adlandırmasıdır. Örneğin 2 kilogramlık paket 40 TL, 1 kilogramlık paket 25 TL ise büyük paket gerçekten avantajlıdır (20 TL/kg karşısında 25 TL/kg); ama 1 kilogramlık paket 19 TL\'ye indirime girdiğinde tablo tersine döner.',
      'Bir de gramajın sessizce düşürülmesi meselesi vardır: fiyat aynı kalırken paketin 200 gramdan 180 grama inmesi, birim fiyatın yaklaşık %11 artması demektir. Alışkanlıkla aldığınız ürünlerde net miktarı ara sıra kontrol etmek ve birim fiyatı yeniden hesaplamak bu tür gizli zamları fark etmenizi sağlar.',
    ] },
    { h: 'Hangi ürünlerde hangi birim kullanılır?', ul: [
      '<strong>Kilogram:</strong> bakliyat, peynir, zeytin, kuruyemiş, çay, kahve, toz deterjan, kedi ve köpek maması.',
      '<strong>Litre:</strong> sıvı yağ, süt, meyve suyu, sıvı deterjan, yumuşatıcı, şampuan, motor yağı, boya.',
      '<strong>Metre:</strong> kablo, hortum, kumaş, alüminyum folyo, streç film, bant, zincir.',
      '<strong>Adet:</strong> bebek bezi, ıslak mendil, kâğıt havlu ve tuvalet kâğıdı rulosu, pil, yumurta, kapsül kahve, bulaşık makinesi tableti.',
    ] },
    { h: 'Karşılaştırırken sık yapılan hatalar', p: [
      'En sık hata, brüt ağırlık ile net ağırlığı karıştırmaktır. Konserve ve salamura ürünlerde ambalajda hem net ağırlık hem de süzme ağırlık yazar; zeytin, turşu ya da ton balığı karşılaştırırken süzme ağırlığı esas almak daha doğru sonuç verir. Rulo kâğıt ürünlerinde yalnızca rulo sayısına bakmak da yanıltıcıdır; yaprak sayısı ve kat sayısı farklıysa adet fiyatı gerçeği yansıtmaz, mümkünse toplam metre ya da yaprak üzerinden karşılaştırın.',
      'Konsantre ürünlerde birim fiyat tek başına yeterli olmaz. Litre fiyatı yüksek olan konsantre deterjan, yıkama başına daha az kullanıldığı için aslında daha ekonomik çıkabilir; bu durumda miktar alanına litre yerine ambalajda yazan yıkama sayısını "adet" olarak girmek daha sağlıklı bir kıyas sağlar. Son olarak, ucuz diye alınan büyük paketin bir kısmı bozulup çöpe gidiyorsa gerçek birim maliyetiniz hesaplanandan yüksektir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç yalnızca aynı türden büyüklükleri karşılaştırır: kütle ile kütle, hacim ile hacim, uzunluk ile uzunluk, adet ile adet. Gram cinsinden satılan bir ürünü litreyle satılanla kıyaslamak için ürünün yoğunluğunu bilmek gerekir; araç bu dönüşümü yapmaz ve uyarı verir. Kargo ücreti, sadakat kartı puanı ya da "ikincisi yarı fiyatına" gibi kampanyaları hesaba katmak için ödeyeceğiniz toplam tutarı ve alacağınız toplam miktarı kendiniz girmeniz yeterlidir. Sonuçlar bilgilendirme amaçlıdır; birim fiyatlar iki ondalık basamağa yuvarlanarak gösterilir.',
    ] },
  ],
  faq: [
    ['Birim fiyat nasıl hesaplanır?', 'Ürünün fiyatı, ambalajdaki net miktara bölünür. 45 TL\'lik 750 gramlık bir paketin kilogram fiyatı 45 ÷ 0,75 = 60 TL\'dir. Karşılaştırma yapabilmek için iki ürünün miktarı aynı birime çevrilmelidir.'],
    ['Birimleri farklı olan iki ürünü karşılaştırabilir miyim?', 'Aynı türden oldukları sürece evet. Biri gram diğeri kilogram, biri mililitre diğeri litre olabilir; araç dönüşümü kendisi yapar. Gram ile litre gibi farklı türdeki birimler ise yoğunluk bilgisi olmadan karşılaştırılamaz.'],
    ['"3 al 2 öde" kampanyasını nasıl girerim?', 'Fiyat alanına kasada ödeyeceğiniz toplam tutarı (iki ürünün fiyatı), miktar alanına elinize geçecek toplam miktarı (üç ürünün toplamı) yazın. Böylece kampanyalı birim fiyatı tekli ürünle doğrudan kıyaslayabilirsiniz.'],
    ['Yüzde fark neye göre hesaplanıyor?', 'Pahalı olan ürünün birim fiyatına göre hesaplanır. %20 sonucu, hesaplı ürünü seçtiğinizde aynı miktar için beşte bir daha az ödeyeceğiniz anlamına gelir.'],
    ['Son satırdaki tasarruf tutarı ne anlama geliyor?', 'İki paketten büyük olanının miktarı kadar ürün aldığınızda, hesaplı seçenek ile pahalı seçenek arasında oluşan toplam TL farkıdır. Örneğin kilogram başına 5 TL fark varsa 1 kilogramlık alımda 5 TL, 2 kilogramlık alımda 10 TL tasarruf edersiniz.'],
    ['Kargo ücretini hesaba nasıl katarım?', 'İnternet alışverişinde kargo ücretini ürün fiyatına ekleyip toplamı fiyat alanına yazın. Özellikle düşük tutarlı siparişlerde kargo, birim fiyatı belirgin biçimde yükseltir.'],
    ['TL dışında bir para birimiyle kullanabilir miyim?', 'Evet. Hesap oransal olduğu için iki ürünün fiyatını aynı para biriminde yazmanız yeterlidir; sonuçtaki "TL" ifadesini kendi para biriminiz olarak okuyabilirsiniz.'],
    ['Girdiğim fiyatlar kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız fiyat ve miktarlar sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['metrekare-fiyati-hesapla', 'iskonto-hesapla', 'zincirleme-indirim-hesapla', 'birim-maliyet-hesapla', 'pesin-vadeli-karsilastir'],
};
