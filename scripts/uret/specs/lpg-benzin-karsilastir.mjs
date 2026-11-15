export default {
  slug: 'lpg-benzin-karsilastir',
  title: 'LPG Benzin Karşılaştırma',
  h1Tail: 'tasarruf ve amorti süresi',
  pageTitle: 'LPG Benzin Karşılaştırma – Tasarruf ve Amorti Süresi Hesaplama',
  description: 'Benzin ve LPG ile 100 km maliyetini karşılaştırın; yıllık tasarrufu, LPG dönüşümünün kaç kilometrede ve kaç ayda kendini amorti edeceğini hesaplayın.',
  card: 'Benzinli ve LPG\'li kullanımın 100 km maliyetini karşılaştırın; yıllık tasarrufu ve dönüşümün amorti süresini görün.',
  category: 'gunluk',
  keywords: ['lpg benzin karşılaştırma', 'lpg tasarruf hesaplama', 'lpg amorti süresi', 'lpg mi benzin mi', 'lpg dönüşüm hesaplama', 'otogaz tasarruf', 'lpg 100 km maliyeti'],
  lead: `Aracınızın benzin tüketimini, güncel benzin ve LPG fiyatlarını yazın; araç iki yakıtla <strong>100 kilometre maliyetini</strong> karşılaştırır, yıllık tasarrufu ve LPG dönüşüm masrafının kaç kilometrede geri döneceğini hesaplar.`,
  button: 'Karşılaştır',
  inputs: [
    { id: 'tuketim', label: 'Benzin tüketimi (L/100 km)', type: 'number', placeholder: 'Örn. 8' },
    { id: 'benzin', label: 'Benzin litre fiyatı (TL)', type: 'number', placeholder: 'Örn. 45' },
    { id: 'lpg', label: 'LPG litre fiyatı (TL)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'artis', label: 'LPG\'de tüketim artışı (%)', type: 'number', value: '20', hint: 'LPG ile litre bazında tüketim genellikle benzine göre daha yüksektir.' },
    { id: 'km', label: 'Yıllık kilometre', type: 'number', placeholder: 'Örn. 15000', hint: 'Binlik ayraç kullanmayın: 15000 yazın.' },
    { id: 'donusum', label: 'Dönüşüm maliyeti (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 30000', hint: 'Binlik ayraç kullanmayın ya da 30.000,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const tuk = h.pos(v.tuketim, 'Benzin tüketimi');
    const pb = h.pos(v.benzin, 'Benzin litre fiyatı');
    const pl = h.pos(v.lpg, 'LPG litre fiyatı');
    const artis = h.nonneg(v.artis, 'LPG\'de tüketim artışı');
    const km = h.pos(v.km, 'Yıllık kilometre');
    if (tuk > 60) h.err('"Benzin tüketimi" 100 km için litre olarak girilmeli; değer çok yüksek görünüyor.');
    if (artis > 100) h.err('"LPG\'de tüketim artışı" yüzde 100\'den büyük olamaz.');
    const lpgTuk = tuk * (1 + artis / 100);
    const mB = tuk * pb;
    const mL = lpgTuk * pl;
    const fark = mB - mL;
    const yillik = fark * km / 100;
    const rows = [
      ['Yıllık tasarruf', h.para(yillik)],
      ['100 km benzin maliyeti', h.para(mB)],
      ['100 km LPG maliyeti', h.para(mL)],
      ['100 km tasarruf', h.para(fark)],
      ['Tasarruf oranı', '% ' + h.fmt(fark / mB * 100, 1)],
      ['LPG tüketimi', h.fmt(lpgTuk, 2) + ' L/100 km'],
      ['Aylık tasarruf', h.para(yillik / 12)],
      ['Başabaş LPG fiyatı', h.para(pb / (1 + artis / 100))],
    ];
    if (String(v.donusum ?? '').trim() !== '') {
      const d = h.pos(v.donusum, 'Dönüşüm maliyeti');
      if (fark > 1e-9) {
        rows.push(['Amorti mesafesi', h.fmt(d / fark * 100, 0) + ' km']);
        rows.push(['Amorti süresi', h.fmt(d / (yillik / 12), 1) + ' ay']);
      } else {
        rows.push(['Amorti mesafesi', 'Amorti etmez']);
        rows.push(['Amorti süresi', 'Amorti etmez']);
      }
    }
    return {
      rows,
      note: fark > 1e-9
        ? 'Hesap yalnızca yakıt giderini karşılaştırır; LPG sisteminin bakımı, soğuk çalıştırmada harcanan benzin ve olası ek giderler dahil değildir.'
        : 'Girdiğiniz fiyatlarla LPG kullanımı benzinden ucuz değil. LPG fiyatı "Başabaş LPG fiyatı" satırındaki değerin altına indiğinde tasarruf başlar.',
    };
  },
  cases: [
    { in: { tuketim: '8', benzin: '45', lpg: '25', artis: '20', km: '15000', donusum: '30000' }, out: { 'Yıllık tasarruf': '18.000,00 TL', '100 km benzin maliyeti': '360,00 TL', '100 km LPG maliyeti': '240,00 TL', 'Tasarruf oranı': '% 33,3', 'Amorti mesafesi': '25.000 km', 'Amorti süresi': '20 ay' } },
    { in: { tuketim: '7', benzin: '40', lpg: '20', artis: '25', km: '20000', donusum: '21000' }, out: { 'Yıllık tasarruf': '21.000,00 TL', 'LPG tüketimi': '8,75 L/100 km', '100 km tasarruf': '105,00 TL', 'Amorti mesafesi': '20.000 km', 'Amorti süresi': '12 ay' } },
    { in: { tuketim: '10', benzin: '50', lpg: '25', artis: '20', km: '10000' }, out: { 'Yıllık tasarruf': '20.000,00 TL', '100 km LPG maliyeti': '300,00 TL', 'Tasarruf oranı': '% 40' } },
    { in: { tuketim: '8', benzin: '44', lpg: '22', artis: '0', km: '12000' }, out: { 'Yıllık tasarruf': '21.120,00 TL', 'Tasarruf oranı': '% 50', 'Aylık tasarruf': '1.760,00 TL', 'Başabaş LPG fiyatı': '44,00 TL' } },
    { in: { tuketim: '6', benzin: '40', lpg: '38', artis: '20', km: '10000', donusum: '25000' }, out: { 'Yıllık tasarruf': '-3.360,00 TL', '100 km LPG maliyeti': '273,60 TL', 'Amorti süresi': 'Amorti etmez' } },
    { in: { tuketim: '8', benzin: '45', lpg: '25', artis: '20', km: '15000' }, out: { 'Başabaş LPG fiyatı': '37,50 TL', 'LPG tüketimi': '9,6 L/100 km', 'Aylık tasarruf': '1.500,00 TL' } },
    { in: { tuketim: '8', benzin: '45', lpg: '', artis: '20', km: '15000' }, error: true },
    { in: { tuketim: '-8', benzin: '45', lpg: '25', artis: '20', km: '15000' }, error: true },
  ],
  howto: [
    `Aracınızın benzinle 100 kilometrede kaç litre yaktığını "Benzin tüketimi" alanına yazın.`,
    `Bulunduğunuz ildeki güncel benzin ve LPG (otogaz) litre fiyatlarını girin.`,
    `LPG'de tüketim artışı yüzdesini kendi aracınıza göre düzeltin; ölçmediyseniz varsayılan yüzde 20 ile başlayabilirsiniz.`,
    `Yıllık kilometrenizi ve dönüşüm yaptırmayı düşünüyorsanız aldığınız fiyat teklifini yazın.`,
    `"Karşılaştır" düğmesine basın; yıllık tasarruf, 100 km maliyetleri ve amorti süresi sonuç kutusunda görünür.`,
  ],
  sections: [
    { h: 'LPG neden daha ucuza gelir, neden daha çok yakar?', p: [
      `LPG (sıvılaştırılmış petrol gazı, pompadaki adıyla otogaz) litre fiyatı çoğu zaman benzinden belirgin biçimde düşüktür. Ancak bir litre LPG, bir litre benzinden daha az enerji taşır; aynı yolu gitmek için motor litre bazında daha fazla LPG tüketir. Bu yüzden iki yakıtı yalnızca pompa fiyatına bakarak karşılaştırmak yanıltıcı olur: doğru ölçü, aynı mesafeyi gitmenin kaç liraya mal olduğudur.`,
      `Litre bazındaki tüketim artışı araçtan araca değişir. Sistemin tipi (sıralı enjeksiyon ya da eski tip karışımlı sistemler), ayarın kalitesi, motorun yapısı ve sürüş biçimi sonucu etkiler. Pratikte kullanıcıların çoğu yüzde 15 ile 25 arasında bir artış bildirir; bu nedenle araç varsayılan olarak yüzde 20 değerini önerir. En doğru sonuç için kendi aracınızda birkaç depo boyunca hem benzinle hem LPG ile tüketimi ölçüp bu alanı güncelleyin.`,
    ] },
    { h: 'Hesaplama mantığı', ul: [
      `<strong>100 km benzin maliyeti</strong> = benzin tüketimi × benzin fiyatı`,
      `<strong>LPG tüketimi</strong> = benzin tüketimi × (1 + artış ÷ 100)`,
      `<strong>100 km LPG maliyeti</strong> = LPG tüketimi × LPG fiyatı`,
      `<strong>Yıllık tasarruf</strong> = (benzin maliyeti − LPG maliyeti) × yıllık km ÷ 100`,
      `<strong>Amorti mesafesi</strong> = dönüşüm maliyeti ÷ 100 km tasarruf × 100`,
      `<strong>Başabaş LPG fiyatı</strong> = benzin fiyatı ÷ (1 + artış ÷ 100)`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Benzinle 100 kilometrede 8 litre yakan bir araç alalım. Benzinin litresi 45 TL, LPG'nin litresi 25 TL olsun ve LPG ile tüketimin yüzde 20 arttığını varsayalım. Benzinle 100 km maliyeti 8 × 45 = <strong>360 TL</strong> olur. LPG tüketimi 8 × 1,20 = 9,6 litre, maliyeti 9,6 × 25 = <strong>240 TL</strong> eder. Her 100 kilometrede 120 TL, yani yüzde 33,3 tasarruf sağlanır.`,
      `Yılda 15.000 km yapan bir sürücü için bu fark 120 × 150 = <strong>18.000 TL</strong> yıllık, 1.500 TL aylık tasarruf demektir. Dönüşüm için 30.000 TL ödendiyse masraf 30.000 ÷ 120 × 100 = 25.000 kilometrede, yani bu kullanımda 20 ayda geri döner. Başabaş LPG fiyatı 45 ÷ 1,20 = 37,50 TL'dir: LPG bu fiyatın altında kaldıkça yakıt açısından avantajlıdır. Örnekteki fiyatlar yalnızca hesabı göstermek içindir; güncel pompa fiyatlarını kendiniz girin.`,
    ] },
    { h: 'Başabaş fiyatı nasıl yorumlanır?', p: [
      `Fiyatlar sık değiştiği için tek bir günün hesabına bakmak yerine oranı izlemek daha kullanışlıdır. Başabaş LPG fiyatı, LPG'nin benzinle aynı kilometre maliyetine ulaştığı noktadır. Tüketim artışı yüzde 20 ise LPG fiyatı benzin fiyatının yaklaşık yüzde 83'ünü geçtiğinde yakıt avantajı ortadan kalkar; yüzde 25 artışta bu eşik yüzde 80'dir. LPG fiyatı benzinin yarısı civarındayken tasarruf oranı yüzde 40 dolayındadır.`,
      `Amorti süresi ise kullanım yoğunluğuna çok duyarlıdır. Aynı dönüşüm masrafı, yılda 30.000 km yapan bir ticari kullanıcıda birkaç ayda geri dönerken, yılda 6.000 km yapan bir sürücüde yıllar alabilir. Aracı ne kadar süre elinizde tutmayı planladığınızı amorti süresiyle karşılaştırın.`,
    ] },
    { h: 'Hesabın kapsamadığı giderler ve dikkat edilecekler', ul: [
      `LPG'li araçlar çoğunlukla motoru benzinle çalıştırır ve ısındıktan sonra gaza geçer; kısa mesafeli şehir içi kullanımda benzin tüketimi sıfıra inmez.`,
      `LPG sisteminin filtre değişimi, periyodik ayar ve sızdırmazlık kontrolü gibi kendi bakım giderleri vardır.`,
      `Tank, bagajda ya da stepne yuvasında yer kaplar; stepne yuvasına takılan tanklarda yedek lastik için ayrı çözüm gerekir.`,
      `Dönüşümün yetkili bir firmada yapılması, aracın belgelerine işlenmesi ve sızdırmazlık kontrollerinin yapılması gerekir. Tescil, muayene ve kapalı otopark kurallarıyla ilgili güncel mevzuatı kontrol edin.`,
      `Bazı motorlar LPG kullanımına diğerlerinden daha uygundur; dönüşüm öncesinde aracınızın motor tipi için yetkin bir ustadan görüş alın. Üretici garantisi üzerindeki etkisini de sorun.`,
      `İkinci elde LPG'li aracın değeri bölgeye ve araç sınıfına göre olumlu ya da olumsuz etkilenebilir.`,
    ] },
    { h: 'Sonucun sınırları', p: [
      `Bu sayfa girdiğiniz fiyat ve tüketim değerleriyle basit bir yakıt gideri karşılaştırması yapar; gelecekteki fiyat değişimlerini, bakım farklarını ve paranın zaman değerini hesaba katmaz. Sonuç bilgilendirme amaçlıdır ve mali ya da teknik tavsiye değildir. Kararınızı vermeden önce birkaç farklı fiyat senaryosuyla hesabı yineleyin.`,
    ] },
  ],
  faq: [
    ['LPG benzine göre yüzde kaç tasarruf sağlar?', `Tasarruf, iki yakıtın fiyat oranına ve aracınızdaki tüketim artışına bağlıdır. LPG litre fiyatı benzinin yarısı kadarsa ve tüketim yüzde 20 artıyorsa tasarruf yaklaşık yüzde 40 olur. Güncel fiyatları girerek kendi oranınızı görebilirsiniz.`],
    ['LPG\'li araç benzinliden ne kadar fazla yakar?', `Litre bazında çoğunlukla yüzde 15–25 daha fazla tüketir, çünkü LPG'nin litre başına enerjisi benzinden düşüktür. Kesin değer sistemin tipine ve ayarına göre değişir; en doğrusu kendi aracınızda ölçmektir.`],
    ['LPG dönüşümü kaç kilometrede kendini amorti eder?', `Dönüşüm maliyetini 100 km'deki tasarrufa bölüp 100 ile çarparak bulunur. Örneğin 30.000 TL'lik dönüşüm ve 100 km'de 120 TL tasarrufla 25.000 kilometrede amorti olur.`],
    ['Başabaş LPG fiyatı ne demek?', `LPG ile benzinin kilometre maliyetinin eşitlendiği LPG litre fiyatıdır. LPG bu fiyatın üzerine çıkarsa yakıt açısından avantaj kalmaz. Benzin fiyatı (1 + tüketim artışı) değerine bölünerek hesaplanır.`],
    ['Az kilometre yapıyorum, LPG taktırmaya değer mi?', `Yıllık kilometre düştükçe amorti süresi uzar. Hesaptaki "Amorti süresi" aracı elinizde tutmayı düşündüğünüz süreden uzunsa dönüşüm yalnızca yakıt hesabıyla kendini kurtarmayabilir.`],
    ['Dizel ya da hibrit araçla karşılaştırma yapabilir miyim?', `Araç, benzin alanlarına dizel tüketimi ve fiyatı yazılarak kabaca kullanılabilir; ancak "tüketim artışı" mantığı benzin-LPG dönüşümü için tasarlanmıştır. İki farklı aracı karşılaştırmak için kilometre başına maliyet aracını kullanmak daha doğrudur.`],
    ['LPG motora zarar verir mi?', `Bu, motorun yapısına, sistemin kalitesine ve bakımın düzenli yapılmasına bağlıdır; genel bir hüküm vermek doğru olmaz. Aracınızın motoru için yetkili bir dönüşüm firmasından ve ustanızdan görüş alın.`],
    ['Girdiğim bilgiler saklanıyor mu?', `Hayır. Karşılaştırma tarayıcınızda yapılır; yazdığınız fiyat ve tüketim değerleri sunucuya gönderilmez.`],
  ],
  related: ['yakit-tuketimi-hesapla', 'kilometre-maliyeti-hesapla', 'yakit-hesapla', 'yol-masrafi-paylasimi', 'yakit-tuketimi-birim-cevir'],
};
