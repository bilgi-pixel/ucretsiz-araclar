export default {
  slug: 'reel-faiz-hesapla',
  title: 'Reel Faiz Hesaplama',
  h1Tail: 'enflasyondan arındırılmış getiri',
  pageTitle: 'Reel Faiz Hesaplama – Enflasyondan Arındırılmış Gerçek Getiri',
  description: 'Nominal faiz ve enflasyon oranını girin; Fisher denklemiyle reel faizi, stopaj sonrası reel getiriyi ve paranızın alım gücündeki değişimi hesaplayın.',
  card: 'Faiz getiriniz enflasyonu yeniyor mu? Nominal faiz ve enflasyondan reel faizi ve alım gücü değişimini hesaplayın.',
  category: 'finans',
  keywords: ['reel faiz hesaplama', 'reel faiz nedir', 'reel getiri hesaplama', 'enflasyondan arındırılmış faiz', 'fisher denklemi', 'negatif reel faiz', 'reel faiz formülü'],
  lead: 'Faiz oranı tek başına kazancınızı göstermez; aynı dönemde fiyatlar da artar. Nominal faizi ve enflasyon oranını yazın; araç <strong>reel faizi</strong>, yani paranızın alım gücünün gerçekte yüzde kaç değiştiğini Fisher denklemiyle hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'nominal', label: 'Nominal faiz / getiri oranı (%)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'enflasyon', label: 'Aynı dönemin enflasyon oranı (%)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'stopaj', label: 'Getiriden kesilen vergi / stopaj (%)', type: 'number', value: '0', hint: 'İsteğe bağlı; kesinti yoksa 0' },
    { id: 'anapara', label: 'Anapara (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Yazarsanız tutar karşılıkları da gösterilir' },
  ],
  compute(v, h) {
    const nom = h.num(v.nominal, 'Nominal faiz oranı');
    const enf = h.num(v.enflasyon, 'Enflasyon oranı');
    const stopaj = h.nonneg(h.opt(v.stopaj, 0, 'Stopaj'), 'Stopaj');
    if (nom <= -100) h.err('Nominal oran −%100\'den büyük olmalı.');
    if (enf <= -100) h.err('Enflasyon oranı −%100\'den büyük olmalı.');
    if (stopaj >= 100) h.err('Stopaj oranı %100\'den küçük olmalı.');
    if (Math.abs(nom) > 1e6 || Math.abs(enf) > 1e6) h.err('Oranlar çok büyük; değerleri kontrol edin.');
    const net = nom > 0 ? nom * (1 - stopaj / 100) : nom;
    const reel = ((1 + net / 100) / (1 + enf / 100) - 1) * 100;
    const durum = Math.abs(reel) < 5e-5 ? 'Alım gücü korunuyor (reel faiz sıfır)' : reel > 0 ? 'Pozitif reel faiz: alım gücü artıyor' : 'Negatif reel faiz: alım gücü azalıyor';
    const yuzde = (x) => { const t = h.fmt(Math.abs(x), 4); return (x < 0 && t !== '0' ? '−%' : '%') + t; };
    const rows = [
      ['Reel faiz oranı', yuzde(reel)],
      ['Net nominal getiri', yuzde(net)],
      ['Yaklaşık yöntem (nominal − enflasyon)', yuzde(net - enf)],
      ['Değerlendirme', durum],
    ];
    if (String(v.anapara ?? '').trim() !== '') {
      const P = h.pos(v.anapara, 'Anapara');
      const son = P * (1 + net / 100);
      const reelDeger = son / (1 + enf / 100);
      rows.push(['Dönem sonu tutar (nominal)', h.para(son)]);
      rows.push(['Bugünün alım gücüyle değeri', h.para(reelDeger)]);
      rows.push(['Reel kazanç / kayıp', h.para(reelDeger - P)]);
    }
    return {
      rows,
      note: 'Reel faiz = (1 + net nominal) ÷ (1 + enflasyon) − 1. İki oran da aynı döneme (örneğin bir yıla) ait olmalıdır.',
    };
  },
  cases: [
    { in: { nominal: '50', enflasyon: '40' }, out: { 'Reel faiz oranı': '%7,1429', 'Yaklaşık yöntem (nominal − enflasyon)': '%10', 'Değerlendirme': 'Pozitif reel faiz: alım gücü artıyor' } },
    { in: { nominal: '30', enflasyon: '60', anapara: '100000' }, out: { 'Reel faiz oranı': '−%18,75', 'Dönem sonu tutar (nominal)': '130.000,00 TL', 'Bugünün alım gücüyle değeri': '81.250,00 TL', 'Reel kazanç / kayıp': '-18.750,00 TL', 'Değerlendirme': 'Negatif reel faiz: alım gücü azalıyor' } },
    { in: { nominal: '10', enflasyon: '5' }, out: { 'Reel faiz oranı': '%4,7619' } },
    { in: { nominal: '50', enflasyon: '40', stopaj: '15' }, out: { 'Reel faiz oranı': '%1,7857', 'Net nominal getiri': '%42,5' } },
    { in: { nominal: '5', enflasyon: '5' }, out: { 'Reel faiz oranı': '%0', 'Değerlendirme': 'Alım gücü korunuyor (reel faiz sıfır)' } },
    { in: { nominal: '20', enflasyon: '0', anapara: '1000' }, out: { 'Reel faiz oranı': '%20', 'Reel kazanç / kayıp': '200,00 TL' } },
    { in: { nominal: '45', enflasyon: '38' }, out: { 'Reel faiz oranı': '%5,0725' } },
    { in: { nominal: '20', enflasyon: '25' }, out: { 'Reel faiz oranı': '−%4', 'Yaklaşık yöntem (nominal − enflasyon)': '−%5' } },
    { in: { nominal: '50', enflasyon: '' }, error: true },
    { in: { nominal: '50', enflasyon: '-100' }, error: true },
  ],
  howto: [
    '"Nominal faiz / getiri oranı" alanına mevduatın, tahvilin ya da başka bir yatırımın dönem boyunca sağladığı yüzde getiriyi yazın.',
    '"Enflasyon oranı" alanına <strong>aynı döneme ait</strong> enflasyonu girin. Faiz yıllıksa yıllık enflasyonu, üç aylıksa üç aylık fiyat artışını kullanın.',
    'Getirinizden vergi kesiliyorsa stopaj oranını yazın; araç reel faizi net getiri üzerinden hesaplar.',
    'Tutar karşılığını da görmek isterseniz anaparayı girin ve "Hesapla" düğmesine basın.',
    'İlk satırdaki reel faiz artıysa paranız alım gücü kazanmış, eksiyse nominal olarak büyüse bile değer kaybetmiş demektir.',
  ],
  sections: [
    { h: 'Reel faiz nedir?', p: [
      'Bankanın ilan ettiği, sözleşmede yazan ve hesabınıza yansıyan oran <strong>nominal faizdir</strong>; paranın kaç lira arttığını söyler. <strong>Reel faiz</strong> ise bu artıştan fiyat artışlarının etkisi çıkarıldıktan sonra kalan kısımdır; paranızla satın alabileceğiniz mal ve hizmet miktarının ne kadar değiştiğini gösterir.',
      'Bir yıl önce 100 liraya aldığınız sepet bugün 140 lira ediyorsa ve 100 liranız faizle 150 liraya ulaştıysa, artık o sepetten 1 tane değil 150 ÷ 140 = 1,0714 tane alabilirsiniz. Alım gücünüz %7,14 artmıştır; reel faiz budur. Paranız 130 liraya ulaşsaydı sepetin ancak 0,93\'ünü alabilirdiniz; nominal olarak %30 kazanmış görünürken reel olarak kaybetmiş olurdunuz.',
    ] },
    { h: 'Fisher denklemi ve formül', p: [
      'Reel faizin doğru hesabı, iktisatçı Irving Fisher\'ın adıyla anılan eşitliğe dayanır: <strong>(1 + nominal) = (1 + reel) × (1 + enflasyon)</strong>. Buradan <strong>reel = (1 + nominal) ÷ (1 + enflasyon) − 1</strong> elde edilir. Oranlar ondalık yazılır; %50 için 0,50.',
      'Gündelik kullanımda sıkça "reel faiz = nominal faiz − enflasyon" denir. Bu, oranlar küçükken iyi bir yaklaşımdır: %10 faiz ve %5 enflasyonda fark yöntemi %5, kesin hesap %4,76 verir. Oranlar büyüdükçe yaklaşım bozulur: %50 faiz ve %40 enflasyonda fark yöntemi %10 derken gerçek reel faiz %7,14\'tür. Araç her iki sonucu da gösterir ki farkı görebilesiniz.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Yıllık %50 faizle 100.000 TL\'yi mevduata yatırdığınızı, aynı yıl enflasyonun %40 olduğunu ve faiz gelirinden %15 stopaj kesildiğini varsayalım. Net nominal getiri 50 × (1 − 0,15) = %42,5\'tir. Reel faiz = 1,425 ÷ 1,40 − 1 = 0,017857, yani <strong>%1,7857</strong>.',
      'Tutar olarak: yıl sonunda hesabınızda 142.500 TL olur. Bu paranın bugünkü fiyatlarla alım gücü 142.500 ÷ 1,40 = 101.785,71 TL\'dir. Nominal kazancınız 42.500 TL görünürken reel kazancınız yalnızca 1.785,71 TL\'dir. Stopaj olmasaydı reel faiz %7,14 olurdu; vergi, reel getirinin büyük bölümünü götürmüştür.',
    ] },
    { h: 'Negatif reel faiz ne anlama gelir?', p: [
      'Enflasyon net getiriden yüksekse reel faiz eksi çıkar. Bu durumda paranız rakam olarak büyür ama satın alabildikleriniz azalır. Örneğin %30 faiz ve %60 enflasyonda reel faiz −%18,75\'tir: 100.000 TL yıl sonunda 130.000 TL olur, fakat bu tutar bugünün 81.250 TL\'sine denktir.',
      'Negatif reel faiz dönemlerinde tasarruf sahipleri genellikle mevduat dışındaki araçlara yönelir, borçlular ise avantajlı duruma geçer; çünkü geri ödedikleri paranın alım gücü, aldıkları paranınkinden düşüktür. Aynı mantıkla sabit faizli bir kredinin gerçek yükünü görmek için kredi faizini nominal oran olarak girip reel maliyeti hesaplayabilirsiniz.',
    ] },
    { h: 'Hangi enflasyon oranını kullanmalıyım?', ul: [
      '<strong>Geçmiş bir dönemi değerlendiriyorsanız</strong> o dönemde gerçekleşen tüketici fiyat artışını kullanın; sonuç gerçekleşen (ex-post) reel faizdir.',
      '<strong>Geleceğe dönük karar veriyorsanız</strong> önünüzdeki dönem için beklenen enflasyonu yazın; sonuç beklenen (ex-ante) reel faizdir ve tahmininiz kadar doğrudur.',
      '<strong>Dönemleri eşleştirin:</strong> 3 aylık mevduatın dönem getirisini 3 aylık enflasyonla, yıllık getiriyi yıllık enflasyonla karşılaştırın. Yıllık enflasyonu aylık faizle kıyaslamak yanlış sonuç verir.',
      '<strong>Kendi enflasyonunuz farklı olabilir:</strong> Resmi endeks ortalama bir sepeti ölçer. Harcamalarınızın ağırlığı kira, gıda ya da eğitimdeyse kişisel fiyat artışınız farklı olabilir; dilerseniz kendi tahmininizi girin.',
    ] },
    { h: 'Hızlı başvuru: bazı oran çiftleri', ul: [
      'Nominal %10, enflasyon %5 → reel %4,7619',
      'Nominal %45, enflasyon %38 → reel %5,0725',
      'Nominal %50, enflasyon %40 → reel %7,1429',
      'Nominal %20, enflasyon %25 → reel −%4',
      'Nominal %30, enflasyon %60 → reel −%18,75',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç tek bir dönem için hesap yapar ve o dönemde faizin de enflasyonun da girdiğiniz oranlarda gerçekleştiğini varsayar. Stopaj yalnızca pozitif getiriye uygulanır. Vergi oranları ve enflasyon verileri zamanla değiştiği için sayfada sabit bir değer bulunmaz; güncel oranları siz girersiniz. Sonuçlar bilgilendirme amaçlıdır, yatırım tavsiyesi değildir; birikimlerinizle ilgili kararlarda yetkili bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Reel faiz nasıl hesaplanır?', 'Bir artı nominal faiz, bir artı enflasyona bölünür ve sonuçtan bir çıkarılır. Örneğin %50 faiz ve %40 enflasyon için 1,50 ÷ 1,40 − 1 = 0,0714, yani %7,14 reel faiz bulunur.'],
    ['Faizden enflasyonu çıkarmak neden yeterli değil?', 'Çıkarma işlemi, kazanılan faizin de enflasyondan etkilendiğini göz ardı eder. Oranlar düşükken hata küçüktür, ancak yüksek enflasyonda büyür: %50 faiz ve %40 enflasyonda çıkarma %10 verir, doğru sonuç ise %7,14\'tür.'],
    ['Reel faiz negatif çıkarsa ne yapmalıyım?', 'Negatif sonuç, seçtiğiniz aracın o dönemde alım gücünüzü koruyamadığını gösterir. Araç yalnızca durumu ölçer; hangi yatırımın size uygun olduğu risk tercihinize ve vadenize bağlıdır. Karar için bir yatırım danışmanına başvurmanız yerinde olur.'],
    ['Stopajı hesaba katmak şart mı?', 'Elinize geçen parayı görmek istiyorsanız evet. Vergi nominal getiri üzerinden kesilir, enflasyon ise paranın tamamını etkiler; bu yüzden küçük görünen bir stopaj reel getiriyi ciddi biçimde düşürebilir, hatta eksiye çevirebilir.'],
    ['Aylık faiz ve aylık enflasyonla hesap yapabilir miyim?', 'Evet. Formül dönemden bağımsızdır; yeter ki iki oran aynı süreyi kapsasın. Aylık %3 getiri ve aylık %2 enflasyon için aylık reel faiz 1,03 ÷ 1,02 − 1 = %0,98 olur.'],
    ['Reel faiz kredi borçluları için ne ifade eder?', 'Kredinin gerçek maliyetini gösterir. Sabit faizli kredinin oranı enflasyonun altındaysa reel faiz negatiftir; borçlu, alım gücü açısından aldığından daha azını geri öder. Gelirinizin enflasyon kadar artmaması durumunda ise bu avantaj taksit yükünü hafifletmez.'],
    ['Altın, döviz ya da hisse getirisinde de kullanılabilir mi?', 'Evet. Nominal oran alanına o yatırımın dönem içindeki TL getirisini yüzde olarak yazmanız yeterlidir. Sonuç, yatırımın enflasyonun üzerinde mi altında mı kaldığını gösterir.'],
    ['Yazdığım rakamlar kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda çalışır; oranlar ve anapara hiçbir sunucuya gönderilmez, sayfa kapatıldığında silinir.'],
  ],
  related: ['enflasyon-hesapla', 'mevduat-faizi-hesapla', 'faiz-hesapla', 'efektif-faiz-hesapla', 'satin-alma-gucu-hesapla', 'bilesik-faiz-hesapla'],
};
