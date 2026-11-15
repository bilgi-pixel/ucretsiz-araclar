export default {
  slug: 'bebek-bezi-hesapla',
  title: 'Bebek Bezi İhtiyacı Hesaplama',
  h1Tail: 'adet, paket ve maliyet',
  pageTitle: 'Bebek Bezi İhtiyacı Hesaplama – Aylık Kaç Bez, Kaç Paket?',
  description: 'Günlük bez değişim sayısından aylık bez ihtiyacını, kaç paket almanız gerektiğini, adet fiyatını ve toplam bez masrafını hesaplayın.',
  card: 'Günde kaç bez kullandığınızı yazın; belirlediğiniz süre için bez adedini, paket sayısını ve maliyeti görün.',
  category: 'gunluk',
  keywords: ['bebek bezi hesaplama', 'aylık bez ihtiyacı', 'günde kaç bez kullanılır', 'bebek bezi maliyeti', 'bez adet fiyatı hesaplama', 'kaç paket bez gerekir', 'yenidoğan bez ihtiyacı'],
  lead: 'Bebek bezi, bir evin en düzenli harcama kalemlerinden biridir ve ne kadar alınacağını kestirmek kolay değildir. Günlük bez sayısını ve süreyi girin; araç <strong>toplam bez adedini</strong>, <strong>kaç paket gerektiğini</strong> ve paket fiyatını yazarsanız <strong>adet ve toplam maliyeti</strong> hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'gunluk', label: 'Günlük bez sayısı', type: 'number', value: '8', hint: 'Bir günde ortalama kaç bez değiştiriyorsunuz?' },
    { id: 'gun', label: 'Süre (gün)', type: 'number', value: '30', hint: 'Bir ay için 30, bir hafta için 7' },
    { id: 'paketAdet', label: 'Paketteki bez adedi', type: 'number', placeholder: 'Örn. 60' },
    { id: 'paketFiyat', label: 'Paket fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 450' },
  ],
  compute(v, h) {
    const gunluk = h.pos(v.gunluk, 'Günlük bez sayısı');
    if (gunluk > 30) h.err('"Günlük bez sayısı" 30\'dan büyük olamaz; günlük ortalamayı yazdığınızdan emin olun.');
    const gun = h.posint(v.gun, 'Süre');
    const paketAdet = h.posint(v.paketAdet, 'Paketteki bez adedi');
    const toplam = Math.ceil(gunluk * gun - 1e-9);
    const paket = Math.ceil(toplam / paketAdet - 1e-9);
    const artan = paket * paketAdet - toplam;
    const rows = [
      ['Toplam bez ihtiyacı', `${h.fmt(toplam, 0)} adet`],
      ['Alınacak paket sayısı', `${h.fmt(paket, 0)} paket`],
      ['Süre sonunda artan bez', `${h.fmt(artan, 0)} adet`],
      ['Bir paketin yeteceği süre', `${h.fmt(paketAdet / gunluk, 1)} gün`],
    ];
    if (String(v.paketFiyat || '').trim() !== '') {
      const fiyat = h.pos(v.paketFiyat, 'Paket fiyatı');
      const adetFiyat = fiyat / paketAdet;
      rows.push(['Bez adet fiyatı', h.para(adetFiyat)]);
      rows.push(['Toplam paket maliyeti', h.para(paket * fiyat)]);
      rows.push(['Günlük bez masrafı', h.para(gunluk * adetFiyat)]);
      rows.push(['Kullanılan bezlerin maliyeti', h.para(toplam * adetFiyat)]);
    }
    return {
      rows,
      note: 'Hesap, yazdığınız günlük ortalamaya dayanır. Bebeğin yaşı, beslenmesi ve sağlık durumu bez tüketimini değiştirir; beden geçişlerine yakın dönemlerde fazla stok yapmayın.',
    };
  },
  cases: [
    { in: { gunluk: '8', gun: '30', paketAdet: '60', paketFiyat: '450' }, out: { 'Toplam bez ihtiyacı': '240 adet', 'Alınacak paket sayısı': '4 paket', 'Süre sonunda artan bez': '0 adet', 'Bez adet fiyatı': '7,50 TL', 'Toplam paket maliyeti': '1.800,00 TL', 'Günlük bez masrafı': '60,00 TL' } },
    { in: { gunluk: '10', gun: '30', paketAdet: '44' }, out: { 'Toplam bez ihtiyacı': '300 adet', 'Alınacak paket sayısı': '7 paket', 'Süre sonunda artan bez': '8 adet', 'Bir paketin yeteceği süre': '4,4 gün' } },
    { in: { gunluk: '6', gun: '7', paketAdet: '30', paketFiyat: '240' }, out: { 'Toplam bez ihtiyacı': '42 adet', 'Alınacak paket sayısı': '2 paket', 'Süre sonunda artan bez': '18 adet', 'Bez adet fiyatı': '8,00 TL', 'Toplam paket maliyeti': '480,00 TL', 'Kullanılan bezlerin maliyeti': '336,00 TL' } },
    { in: { gunluk: '5,5', gun: '30', paketAdet: '100' }, out: { 'Toplam bez ihtiyacı': '165 adet', 'Alınacak paket sayısı': '2 paket', 'Süre sonunda artan bez': '35 adet' } },
    { in: { gunluk: '7', gun: '365', paketAdet: '56', paketFiyat: '420' }, out: { 'Toplam bez ihtiyacı': '2.555 adet', 'Alınacak paket sayısı': '46 paket', 'Bez adet fiyatı': '7,50 TL', 'Toplam paket maliyeti': '19.320,00 TL' } },
    { in: { gunluk: '8', gun: '30', paketAdet: '' }, error: true },
    { in: { gunluk: '0', gun: '30', paketAdet: '60' }, error: true },
  ],
  howto: [
    '"Günlük bez sayısı" alanına bir günde ortalama kaç bez değiştirdiğinizi yazın. Emin değilseniz üç gün boyunca sayıp ortalamasını alın.',
    '"Süre" alanına hesabı kaç gün için yapmak istediğinizi girin; aylık plan için 30 yazabilirsiniz.',
    'Almayı düşündüğünüz paketin üzerindeki bez adedini yazın. Fiyat karşılaştırması yapacaksanız paket fiyatını da ekleyin.',
    '"Hesapla" düğmesine basın. Toplam bez, paket sayısı, artan bez ve varsa maliyet satırları sonuç kutusunda görünür.',
    'Farklı paket boylarını aynı günlük sayı ile tek tek deneyerek adet fiyatı en düşük seçeneği bulun.',
  ],
  sections: [
    { h: 'Bez ihtiyacı nasıl hesaplanır?', p: [
      'Hesabın özü tek bir çarpmadır: <strong>toplam bez = günlük bez sayısı × gün</strong>. Paket sayısı ise toplam bezin paketteki adede bölünüp yukarı yuvarlanmasıyla bulunur, çünkü yarım paket satın alınamaz: <strong>paket = toplam bez ÷ paket adedi</strong> (bir üst tam sayı). Aradaki fark süre sonunda elinizde kalan bezdir.',
      'Maliyet tarafında en önemli değer <strong>adet fiyatıdır</strong>: paket fiyatı ÷ paketteki bez adedi. Marketlerde aynı markanın 30, 44, 60 ve 100 adetlik paketleri yan yana durur ve büyük paket her zaman daha ucuz değildir. Adet fiyatını bilmek, kampanya etiketlerinin gerçekten avantajlı olup olmadığını saniyeler içinde gösterir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Günde ortalama 8 bez kullanan bir bebek için 30 günlük ihtiyaç 8 × 30 = <strong>240 bezdir</strong>. 60 adetlik paketlerden 240 ÷ 60 = tam 4 paket gerekir ve hiç bez artmaz. Paket fiyatı 450 TL ise adet fiyatı 450 ÷ 60 = 7,50 TL, aylık toplam 4 × 450 = 1.800 TL, günlük bez masrafı da 8 × 7,50 = 60 TL olur.',
      'Aynı bebek için 44 adetlik paket alınırsa ve günlük kullanım 10 beze çıkmışsa: 10 × 30 = 300 bez, 300 ÷ 44 = 6,82 olduğu için 7 paket gerekir. 7 × 44 = 308 bez alınmış olur ve ay sonunda 8 bez artar. Bir paket bu tüketimle 4,4 gün dayanır; yani yaklaşık dört günde bir yeni paket açılır.',
    ] },
    { h: 'Yaşa göre günlük bez sayısı ne kadar olur?', p: [
      'Her bebek farklıdır; aşağıdaki aralıklar ebeveynlerin sıkça bildirdiği yaklaşık değerlerdir ve bir sağlık ölçütü değildir. Kendi sayımınız her zaman bu tablodan daha doğrudur.',
    ], ul: [
      '<strong>İlk bir ay (yenidoğan):</strong> günde yaklaşık 8–12 bez. Sık beslenme nedeniyle değişim de sıktır.',
      '<strong>1–5 ay:</strong> günde yaklaşık 7–10 bez.',
      '<strong>5–12 ay:</strong> günde yaklaşık 5–8 bez. Ek gıdaya geçişle birlikte düzen değişir.',
      '<strong>1 yaş ve sonrası:</strong> günde yaklaşık 4–6 bez; tuvalet eğitimi yaklaştıkça azalır.',
    ] },
    { h: 'Paket ve beden seçerken dikkat edilecekler', p: [
      'Bez bedenleri bebeğin yaşına göre değil <strong>kilosuna</strong> göre belirlenir ve her paketin üzerinde bir kilo aralığı yazar. Bebekler ilk aylarda hızlı büyüdüğü için yenidoğan ve 1 numara bezleri çok büyük miktarlarda stoklamak, kullanılmadan küçülen paketlerle sonuçlanabilir. Doğum hazırlığında bir iki paketle başlayıp bebeğin kilosuna göre devam etmek daha güvenlidir.',
      'Beden büyüdükçe aynı fiyatlı pakette bez adedi azalır; yani adet fiyatı artar. Bütçe yaparken ilerleyen aylarda günlük adet azalırken adet fiyatının yükseldiğini hesaba katın. Kampanya dönemlerinde toplu alım yapacaksanız, bebeğin o bedeni kaç ay daha kullanacağını düşünerek en fazla bir iki aylık miktar almak makuldür.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Yalnızca paket fiyatına bakıp adet fiyatını karşılaştırmamak.',
      'Gece bezi, yüzme bezi ya da külot bez gibi farklı ürünleri aynı hesaba katmak; bunların adet fiyatı farklıdır, ayrı ayrı hesaplayın.',
      'İshal, diş çıkarma ya da hastalık dönemlerinde tüketimin geçici olarak arttığını unutup stoksuz kalmak.',
      'Kreş ya da bakıcıda kullanılan bezleri günlük sayıya eklememek.',
    ] },
    { h: 'Sınırlar ve sağlık notu', p: [
      'Araç yalnızca aritmetik bir planlama yapar; bebeğinizin kaç bez kullanması gerektiğini söylemez. Islak ve kirli bez sayısı, özellikle ilk haftalarda bebeğin yeterince beslenip beslenmediğine dair bir göstergedir. Bez sayısında belirgin bir azalma, pişik ya da cilt tahrişi gibi durumlarda çocuk doktorunuza ya da aile hekiminize danışın. Fiyatlar marketten markete ve zamanla değiştiği için maliyet satırları yazdığınız fiyata göre anlık bir tahmindir.',
    ] },
  ],
  faq: [
    ['Bir bebek ayda kaç bez kullanır?', 'Günlük sayıyı 30 ile çarparak bulunur. Günde 8 bez kullanan bir bebek ayda 240, günde 6 bez kullanan 180, günde 10 bez kullanan 300 bez tüketir.'],
    ['Yenidoğan için hastane çantasına kaç bez koymalıyım?', 'Günde 10–12 bez üzerinden hastanede kalacağınız gün sayısını hesaplayıp birkaç yedek ekleyebilirsiniz. İki günlük bir kalış için 25–30 bezlik küçük bir paket çoğunlukla yeterlidir.'],
    ['Bez adet fiyatı nasıl hesaplanır?', 'Paket fiyatı paketteki bez adedine bölünür. 420 TL\'lik 56 adetlik paketin adet fiyatı 7,50 TL\'dir. Farklı paket boylarını karşılaştırmanın tek sağlıklı yolu budur.'],
    ['Büyük paket her zaman daha mı ucuzdur?', 'Hayır. Çoğu zaman büyük paketin adet fiyatı daha düşüktür ama kampanyalı küçük paketler daha avantajlı olabilir. Her seçenek için adet fiyatını ayrı ayrı hesaplayın.'],
    ['Günlük bez sayısını ondalıklı yazabilir miyim?', 'Evet. Ortalamanız 5,5 ya da 7,5 gibi bir değerse öyle yazın; araç toplam adedi bir üst tam sayıya yuvarlar.'],
    ['Bir yılda bez için ne kadar harcanır?', 'Süre alanına 365 yazıp günlük sayı ve paket fiyatını girerek kendi rakamınızı bulabilirsiniz. Günde 7 bez ve 7,50 TL adet fiyatıyla 2.555 bez, 56\'lık paketlerden 46 paket, yani 19.320 TL eder. Yıl içinde beden ve fiyat değişeceği için bu yalnızca bir fikir verir.'],
    ['Artan bezleri ne yapmalıyım?', 'Beden hâlâ uyuyorsa bir sonraki dönemde kullanırsınız. Küçük gelmeye başladıysa açılmamış paketleri mağazanın iade ve değişim koşullarına göre değiştirmeyi deneyebilir ya da ihtiyacı olan birine verebilirsiniz.'],
    ['Yazdığım bilgiler saklanıyor mu?', 'Hayır. Tüm hesap cihazınızdaki tarayıcıda yapılır; girdiğiniz sayılar sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['mama-olcek-hesapla', 'cocuk-beden-bul', 'kucuk-harcama-yillik-hesapla', 'abonelik-maliyeti-hesapla', 'yuzde-hesapla'],
};
