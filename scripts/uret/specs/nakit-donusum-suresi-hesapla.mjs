export default {
  slug: 'nakit-donusum-suresi-hesapla',
  title: 'Nakit Dönüşüm Süresi Hesaplama',
  h1Tail: 'stok + alacak − borç günü',
  pageTitle: 'Nakit Dönüşüm Süresi Hesaplama – Stok, Alacak ve Borç Günleri',
  description: 'Stok, ticari alacak, ticari borç, satış ve satış maliyeti tutarlarından nakit dönüşüm süresini, faaliyet döngüsünü ve finanse edilen gün sayısını hesaplayın.',
  card: 'Stokta kalma, tahsil ve ödeme sürelerinden işletmenizin nakit dönüşüm süresini ve faaliyet döngüsünü bulun.',
  category: 'finans',
  keywords: ['nakit dönüşüm süresi', 'nakit döngüsü hesaplama', 'nakit çevrim süresi', 'faaliyet döngüsü', 'stokta kalma süresi', 'alacak tahsil süresi', 'borç ödeme süresi', 'işletme sermayesi ihtiyacı'],
  lead: 'Stoklara bağladığınız paranın kaç gün sonra müşteriden tahsilat olarak kasaya döndüğünü hesaplayın. Araç bilanço ve gelir tablosu tutarlarından <strong>stokta kalma süresini, alacak tahsil süresini ve borç ödeme süresini</strong> bulur, bunlardan nakit dönüşüm süresini çıkarır.',
  button: 'Hesapla',
  inputs: [
    { id: 'stok', label: 'Ortalama stok (TL)', type: 'number', placeholder: 'Örn. 300000', hint: 'Binlik ayraç kullanmayın ya da 300.000,00 biçiminde yazın.' },
    { id: 'alacak', label: 'Ortalama ticari alacak (TL)', type: 'number', placeholder: 'Örn. 400000' },
    { id: 'borc', label: 'Ortalama ticari borç (TL)', type: 'number', placeholder: 'Örn. 250000' },
    { id: 'satis', label: 'Dönem net satışları (TL)', type: 'number', placeholder: 'Örn. 3650000' },
    { id: 'smm', label: 'Dönem satışların maliyeti (TL)', type: 'number', placeholder: 'Örn. 2190000' },
    { id: 'donem', label: 'Dönem gün sayısı', type: 'number', value: '365', hint: 'Yıllık tablo için 365, üç aylık için 90 yazın.' },
  ],
  compute(v, h) {
    const stok = h.nonneg(v.stok, 'Ortalama stok');
    const alacak = h.nonneg(v.alacak, 'Ortalama ticari alacak');
    const borc = h.nonneg(v.borc, 'Ortalama ticari borç');
    const satis = h.pos(v.satis, 'Dönem net satışları');
    const smm = h.pos(v.smm, 'Dönem satışların maliyeti');
    const donem = h.pos(v.donem, 'Dönem gün sayısı');
    if (donem > 3660) h.err('"Dönem gün sayısı" en fazla 3660 olabilir; yıllık tablo için 365 yazın.');
    const gunlukSatis = satis / donem;
    const gunlukSmm = smm / donem;
    const stokGun = stok / gunlukSmm;
    const alacakGun = alacak / gunlukSatis;
    const borcGun = borc / gunlukSmm;
    const dongu = stokGun + alacakGun;
    const nds = dongu - borcGun;
    const ihtiyac = nds * gunlukSmm;
    const rows = [
      ['Nakit dönüşüm süresi', h.fmt(nds, 1) + ' gün'],
      ['Stokta kalma süresi', h.fmt(stokGun, 1) + ' gün'],
      ['Alacak tahsil süresi', h.fmt(alacakGun, 1) + ' gün'],
      ['Borç ödeme süresi', h.fmt(borcGun, 1) + ' gün'],
      ['Faaliyet döngüsü', h.fmt(dongu, 1) + ' gün'],
    ];
    if (nds > 0) rows.push(['Finanse edilen tutar (yaklaşık)', h.para(ihtiyac)]);
    let note;
    if (nds > 0) note = 'Pozitif süre, satıcıya ödeme yaptıktan sonra müşteriden tahsilat gelene kadar geçen günleri kendi kaynağınızla ya da krediyle finanse ettiğiniz anlamına gelir. Tutar, günlük satış maliyeti × süre ile bulunan kaba bir göstergedir.';
    else if (nds < 0) note = 'Negatif süre, tahsilatın satıcıya ödemeden önce geldiğini gösterir; faaliyetler satıcı kredisiyle finanse ediliyor demektir.';
    else note = 'Süre sıfır: tahsilat ile satıcı ödemesi ortalamada aynı güne denk geliyor.';
    return { rows, note };
  },
  cases: [
    { in: { stok: '300000', alacak: '400000', borc: '250000', satis: '3650000', smm: '2190000', donem: '365' }, out: { 'Nakit dönüşüm süresi': '48,3 gün', 'Stokta kalma süresi': '50 gün', 'Alacak tahsil süresi': '40 gün', 'Borç ödeme süresi': '41,7 gün', 'Faaliyet döngüsü': '90 gün', 'Finanse edilen tutar (yaklaşık)': '290.000,00 TL' } },
    { in: { stok: '100000', alacak: '0', borc: '300000', satis: '3650000', smm: '1825000', donem: '365' }, out: { 'Nakit dönüşüm süresi': '-40 gün', 'Stokta kalma süresi': '20 gün', 'Alacak tahsil süresi': '0 gün', 'Borç ödeme süresi': '60 gün' } },
    { in: { stok: '120000', alacak: '150000', borc: '90000', satis: '900000', smm: '540000', donem: '90' }, out: { 'Nakit dönüşüm süresi': '20 gün', 'Stokta kalma süresi': '20 gün', 'Alacak tahsil süresi': '15 gün', 'Borç ödeme süresi': '15 gün', 'Faaliyet döngüsü': '35 gün', 'Finanse edilen tutar (yaklaşık)': '120.000,00 TL' } },
    { in: { stok: '0', alacak: '500000', borc: '0', satis: '1825000', smm: '1460000', donem: '365' }, out: { 'Nakit dönüşüm süresi': '100 gün', 'Alacak tahsil süresi': '100 gün', 'Finanse edilen tutar (yaklaşık)': '400.000,00 TL' } },
    { in: { stok: '200000', alacak: '100000', borc: '300000', satis: '3650000', smm: '3650000', donem: '365' }, out: { 'Nakit dönüşüm süresi': '0 gün', 'Faaliyet döngüsü': '30 gün' } },
    { in: { stok: '73000', alacak: '36500', borc: '14600', satis: '730000', smm: '365000' }, out: { 'Nakit dönüşüm süresi': '76,7 gün', 'Stokta kalma süresi': '73 gün', 'Alacak tahsil süresi': '18,3 gün', 'Borç ödeme süresi': '14,6 gün' } },
    { in: { stok: '300000', alacak: '400000', borc: '250000', satis: '0', smm: '2190000', donem: '365' }, error: true },
    { in: { stok: '-5', alacak: '400000', borc: '250000', satis: '3650000', smm: '2190000', donem: '365' }, error: true },
  ],
  howto: [
    'Bilançonuzdan stok, ticari alacak ve ticari borç tutarlarını alın. Mümkünse dönem başı ile dönem sonu bakiyelerinin ortalamasını yazın; tek bir tarihin bakiyesi mevsimsel dalgalanma yüzünden yanıltıcı olabilir.',
    'Gelir tablosundan aynı döneme ait net satışları ve satışların maliyetini girin. Tutarları KDV hariç ve aynı para biriminde yazın.',
    '"Dönem gün sayısı" alanına tabloların kapsadığı gün sayısını yazın: yıllık için 365, altı aylık için 180, çeyrek için 90.',
    '"Hesapla" düğmesine basın. İlk satırda nakit dönüşüm süresini, altında onu oluşturan üç süreyi ve faaliyet döngüsünü görürsünüz.',
    'Sonucu önceki dönemlerle karşılaştırın; tek bir rakamdan çok, sürenin uzayıp kısaldığına bakmak anlamlıdır.',
  ],
  sections: [
    { h: 'Nakit dönüşüm süresi nedir?', p: [
      'Nakit dönüşüm süresi (nakit döngüsü ya da nakit çevrim süresi olarak da anılır), bir işletmenin satıcıya ödediği paranın müşteriden tahsilat olarak geri dönmesine kadar geçen gün sayısıdır. Mal alırsınız, bir süre rafta bekler, satarsınız, müşteri bir süre sonra öder. Bu arada siz de satıcınıza belli bir vadeyle ödeme yaparsınız. Ödeme ile tahsilat arasındaki boşluk ne kadar uzunsa, o kadar çok işletme sermayesine ihtiyaç duyarsınız.',
      'Kârlı görünen birçok küçük işletmenin nakit sıkıntısına düşmesinin nedeni çoğunlukla bu boşluktur. Satışlar büyüdükçe stok ve alacak da büyür; süre kısalmıyorsa büyümenin kendisi nakit tüketir. Bu yüzden nakit dönüşüm süresi, kâr rakamının göstermediği bir tabloyu ortaya koyar.',
    ] },
    { h: 'Formül ve bileşenleri', p: [
      'Hesap üç süreye dayanır ve şu eşitlikle özetlenir: <strong>Nakit dönüşüm süresi = Stokta kalma süresi + Alacak tahsil süresi − Borç ödeme süresi</strong>.',
    ], ul: [
      '<strong>Stokta kalma süresi</strong> = Ortalama stok ÷ (Satışların maliyeti ÷ Dönem günü). Malın alındıktan sonra satılana kadar ortalama kaç gün beklediğini gösterir.',
      '<strong>Alacak tahsil süresi</strong> = Ortalama ticari alacak ÷ (Net satışlar ÷ Dönem günü). Satış yapıldıktan sonra paranın kaç günde tahsil edildiğini gösterir.',
      '<strong>Borç ödeme süresi</strong> = Ortalama ticari borç ÷ (Satışların maliyeti ÷ Dönem günü). Satıcılara ortalama kaç günde ödeme yapıldığını gösterir.',
      '<strong>Faaliyet döngüsü</strong> = Stokta kalma süresi + Alacak tahsil süresi. Malın alınmasından tahsilata kadar geçen toplam süredir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir toptancının yıllık net satışı 3.650.000 TL, satışlarının maliyeti 2.190.000 TL olsun. Ortalama stoku 300.000 TL, ticari alacakları 400.000 TL, ticari borçları 250.000 TL. Günlük satış 3.650.000 ÷ 365 = 10.000 TL, günlük satış maliyeti 2.190.000 ÷ 365 = 6.000 TL eder.',
      'Stokta kalma süresi 300.000 ÷ 6.000 = 50 gün, alacak tahsil süresi 400.000 ÷ 10.000 = 40 gün, borç ödeme süresi 250.000 ÷ 6.000 = 41,7 gündür. Faaliyet döngüsü 50 + 40 = 90 gün, nakit dönüşüm süresi 90 − 41,7 = 48,3 gün çıkar. Yani bu işletme her satış döngüsünde yaklaşık 48 günü kendi cebinden finanse eder. Günlük 6.000 TL maliyetle bu, yaklaşık 290.000 TL\'lik bir işletme sermayesi bağlanması demektir. Aynı değerleri araca yazdığınızda bu sonuçları görürsünüz.',
    ] },
    { h: 'Sonucu nasıl yorumlamalı?', p: [
      'Genel kural olarak süre ne kadar kısaysa nakit yönetimi o kadar rahattır. Ancak "iyi" değer sektöre göre çok değişir. Peşin satan ve satıcısına vadeli ödeyen perakendecilerde süre sıfıra yakın, hatta negatif olabilir; müşteri parayı kasaya bıraktıktan haftalar sonra satıcı ödenir. Uzun üretim süreci olan imalatçılarda ya da uzun vadeyle satan toptancılarda ise aylarla ölçülen süreler olağandır.',
      'Bu nedenle sonucu soyut bir eşikle değil, kendi geçmiş dönemlerinizle ve aynı işi yapan işletmelerle karşılaştırın. Süre uzuyorsa nedeni üç bileşenden hangisinde aradığınızı araç zaten gösterir: stok mu birikiyor, tahsilat mı gecikiyor, yoksa satıcılara daha mı erken ödeme yapılıyor?',
    ] },
    { h: 'Süreyi kısaltmanın yolları', ul: [
      'Yavaş dönen ürünleri belirleyip sipariş miktarlarını düşürmek, stokta kalma süresini doğrudan azaltır.',
      'Faturayı teslimatla aynı gün kesmek ve vadesi geçen alacakları düzenli takip etmek tahsil süresini kısaltır.',
      'Erken ödemeye küçük bir iskonto önermek, vadeli satışlarda tahsilatı öne çekebilir; iskonto maliyetini finansman maliyetiyle karşılaştırın.',
      'Satıcılarla vade görüşmek borç ödeme süresini uzatır; ancak vadeyi aşan gecikmeler tedarik ilişkisine ve fiyatlara zarar verir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, stok ve borç günlerini satış tutarına bölerek hesaplamaktır. Stok ve satıcı borcu maliyet bedeliyle kayıtlı olduğundan bunlar satışların maliyetine, alacaklar ise satış fiyatıyla kayıtlı olduğundan net satışlara oranlanır. İkinci hata, KDV dahil alacak bakiyesini KDV hariç satışla karşılaştırmaktır; bu, tahsil süresini olduğundan uzun gösterir. Tutarların aynı esasa göre alındığından emin olun.',
      'Hesap ortalamalara dayanır; yıl sonunda stok eriten ya da sezonluk çalışan bir işletmede tek tarihli bakiye gerçeği yansıtmaz. Hizmet işletmelerinde stok olmadığından stok alanına 0 yazabilirsiniz. Sonuç bilgilendirme amaçlıdır; kredi, yatırım ya da ortaklık kararlarında mali müşavirinizin ya da finans danışmanınızın görüşünü alın.',
    ] },
  ],
  faq: [
    ['Nakit dönüşüm süresi negatif çıkabilir mi?', 'Evet. Borç ödeme süresi, stokta kalma ve tahsil sürelerinin toplamından uzunsa sonuç negatif olur. Bu, müşteriden tahsilatın satıcıya ödemeden önce geldiği anlamına gelir ve peşin çalışan perakende işletmelerinde sık görülür.'],
    ['Faaliyet döngüsü ile nakit dönüşüm süresi arasındaki fark nedir?', 'Faaliyet döngüsü, malın alınmasından paranın tahsil edilmesine kadar geçen toplam süredir. Nakit dönüşüm süresi ise bu süreden satıcının size tanıdığı vadeyi düşer; yani yalnızca sizin finanse ettiğiniz kısmı gösterir.'],
    ['Ortalama stok ve alacağı nasıl bulurum?', 'En basit yöntem dönem başı ve dönem sonu bakiyelerini toplayıp ikiye bölmektir. Aylık bakiyeleriniz varsa on iki ayın ortalamasını almak mevsimsel etkileri daha iyi yansıtır.'],
    ['Stok ve borç günlerinde neden satış değil satış maliyeti kullanılıyor?', 'Stoklar ve satıcılara olan borç alış maliyetiyle kaydedilir. Bunları kâr payı içeren satış tutarına bölmek süreleri olduğundan kısa gösterir. Alacaklar ise satış fiyatıyla kaydedildiği için net satışlara bölünür.'],
    ['Hizmet işletmesiyim, stokum yok. Aracı kullanabilir miyim?', 'Evet. Stok alanına 0 yazın. Satışların maliyeti alanına hizmetin üretim maliyetini (doğrudan personel, taşeron, malzeme gibi) girin; süre yalnızca tahsil ve ödeme vadelerinden oluşur.'],
    ['"Finanse edilen tutar" satırı neyi gösterir?', 'Nakit dönüşüm süresinin günlük satış maliyetiyle çarpımıdır ve döngü boyunca stok ile alacağa bağlı kalan, satıcı kredisiyle karşılanmayan yaklaşık tutarı gösterir. Kesin bir işletme sermayesi hesabı değil, büyüklük hakkında fikir veren kaba bir göstergedir.'],
    ['Çeyreklik tablolarla hesap yapabilir miyim?', 'Evet. Satış ve satış maliyeti üç aylık ise dönem gün sayısına 90 yazın. Önemli olan, gelir tablosu tutarlarıyla gün sayısının aynı dönemi kapsamasıdır.'],
    ['Girdiğim mali veriler bir yere kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız tutarlar sunucuya gönderilmez ve saklanmaz. Sayfayı kapattığınızda veriler silinir.'],
  ],
  related: ['alacak-devir-hizi-hesapla', 'stok-devir-hizi-hesapla', 'cari-oran-hesapla', 'ortalama-vade-hesapla', 'cek-senet-iskonto-hesapla'],
};
