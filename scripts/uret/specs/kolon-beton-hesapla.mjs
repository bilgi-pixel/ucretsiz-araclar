export default {
  slug: 'kolon-beton-hesapla',
  title: 'Kolon Betonu Hesaplama',
  h1Tail: 'm³ ve ağırlık',
  pageTitle: 'Kolon Betonu Hesaplama – Dikdörtgen ve Yuvarlak Kolon Kaç m³?',
  description: 'Kolon kesitini, yüksekliğini ve adedini girin; dikdörtgen ya da dairesel kolonlar için gereken beton hacmini metreküp olarak fire payıyla hesaplayın.',
  card: 'Dikdörtgen ya da yuvarlak kolonların kesit, yükseklik ve adedine göre gereken beton hacmini metreküp olarak bulun.',
  category: 'insaat',
  keywords: ['kolon betonu hesaplama', 'kolon kaç m3 beton alır', 'kolon hacmi hesaplama', 'yuvarlak kolon beton hesabı', 'kolon metreküp hesabı', 'beton metraj hesaplama', 'dairesel kolon hacmi'],
  lead: `Kolonun kesit biçimini seçin, ölçülerini, yüksekliğini ve adedini yazın. Araç <strong>tek kolonun ve tüm kolonların beton hacmini</strong> metreküp olarak hesaplar, fire payını ekler ve betonun yaklaşık ağırlığını gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'sekil', label: 'Kolon kesiti', type: 'select', options: [['dik', 'Dikdörtgen / kare'], ['daire', 'Dairesel (yuvarlak)']] },
    { id: 'en', label: 'Kesit eni ya da çap (cm)', type: 'number', placeholder: 'Örn. 30', hint: 'Dairesel kolonda çapı buraya yazın.' },
    { id: 'derinlik', label: 'Kesit boyu (cm)', type: 'number', placeholder: 'Örn. 60', hint: 'Yalnızca dikdörtgen kolonda kullanılır.' },
    { id: 'yukseklik', label: 'Kolon yüksekliği (m)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'adet', label: 'Kolon adedi', type: 'number', value: '1' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Kesit eni ya da çap');
    const yuk = h.pos(v.yukseklik, 'Kolon yüksekliği');
    const adet = h.posint(v.adet, 'Kolon adedi');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (en > 1000) h.err('Kesit ölçüsü santimetre olarak yazılmalı (örn. 30).');
    if (yuk > 100) h.err('Kolon yüksekliği metre olarak yazılmalı (örn. 3).');
    let kesit;
    let tanim;
    if (v.sekil === 'daire') {
      kesit = Math.PI * (en / 200) * (en / 200);
      tanim = `Ø${h.fmt(en, 1)} cm dairesel`;
    } else {
      const der = h.pos(v.derinlik, 'Kesit boyu');
      if (der > 1000) h.err('Kesit ölçüsü santimetre olarak yazılmalı (örn. 60).');
      kesit = (en / 100) * (der / 100);
      tanim = `${h.fmt(en, 1)} × ${h.fmt(der, 1)} cm`;
    }
    const tek = kesit * yuk;
    const net = tek * adet;
    const toplam = net * (1 + fire / 100);
    return {
      rows: [
        ['Gerekli beton', h.fmt(toplam, 3) + ' m³'],
        ['Fire hariç toplam', h.fmt(net, 3) + ' m³'],
        ['Tek kolon hacmi', h.fmt(tek, 3) + ' m³'],
        ['Kesit', `${tanim} (${h.fmt(kesit, 4)} m²)`],
        ['Yaklaşık beton ağırlığı', h.fmt(toplam * 2.4, 2) + ' ton'],
      ],
      note: 'Ağırlık, taze betonun birim hacim ağırlığı 2.400 kg/m³ alınarak hesaplanmıştır. Donatının kapladığı hacim düşülmez.',
    };
  },
  cases: [
    { in: { sekil: 'dik', en: '30', derinlik: '60', yukseklik: '3', adet: '12' }, out: { 'Gerekli beton': '6,804 m³', 'Fire hariç toplam': '6,48 m³', 'Tek kolon hacmi': '0,54 m³', 'Kesit': '30 × 60 cm (0,18 m²)', 'Yaklaşık beton ağırlığı': '16,33 ton' } },
    { in: { sekil: 'daire', en: '50', yukseklik: '3', adet: '4', fire: '0' }, out: { 'Gerekli beton': '2,356 m³', 'Tek kolon hacmi': '0,589 m³', 'Kesit': 'Ø50 cm dairesel (0,1963 m²)' } },
    { in: { sekil: 'dik', en: '40', derinlik: '40', yukseklik: '2,8', adet: '8', fire: '0' }, out: { 'Gerekli beton': '3,584 m³', 'Tek kolon hacmi': '0,448 m³' } },
    { in: { sekil: 'dik', en: '25', derinlik: '50', yukseklik: '3', fire: '0' }, out: { 'Gerekli beton': '0,375 m³', 'Yaklaşık beton ağırlığı': '0,9 ton' } },
    { in: { sekil: 'dik', en: '50', derinlik: '50', yukseklik: '3,2', adet: '20', fire: '10' }, out: { 'Gerekli beton': '17,6 m³', 'Fire hariç toplam': '16 m³', 'Tek kolon hacmi': '0,8 m³' } },
    { in: { sekil: 'daire', en: '30', yukseklik: '4', adet: '6' }, out: { 'Gerekli beton': '1,781 m³', 'Fire hariç toplam': '1,696 m³', 'Tek kolon hacmi': '0,283 m³' } },
    { in: { sekil: 'dik', en: '30', derinlik: '', yukseklik: '3' }, error: true },
    { in: { sekil: 'dik', en: '30', derinlik: '60', yukseklik: '300' }, error: true },
    { in: { sekil: 'daire', en: '0', yukseklik: '3' }, error: true },
  ],
  howto: [
    `Kolon kesitini seçin: dikdörtgen ya da kare kolonlar için ilk seçeneği, yuvarlak kolonlar için "Dairesel" seçeneğini kullanın.`,
    `Kesit ölçülerini santimetre olarak yazın. Dikdörtgen kolonda en ve boyu, dairesel kolonda yalnızca çapı girmeniz yeterlidir.`,
    `Kolon yüksekliğini metre olarak girin. Kat kolonlarında bu genellikle döşeme üstünden kiriş ya da döşeme altına kadar olan net yüksekliktir.`,
    `Aynı ölçüdeki kolonların adedini ve fire payını yazıp "Hesapla" düğmesine basın.`,
    `Farklı kesitli kolonlarınız varsa her grubu ayrı hesaplayın ve "Gerekli beton" değerlerini toplayarak sipariş miktarını belirleyin.`,
  ],
  sections: [
    { h: 'Kolon beton hacmi formülü', p: [
      `Kolon, sabit kesitli dik bir prizma ya da silindirdir; hacmi kesit alanı ile yüksekliğin çarpımına eşittir. Dikdörtgen kolonda <strong>hacim = en × boy × yükseklik</strong>, dairesel kolonda <strong>hacim = π × (çap ÷ 2)² × yükseklik</strong> formülü kullanılır. Kesit ölçüleri santimetreden metreye çevrildikten sonra sonuç metreküp olarak çıkar.`,
      `Birden fazla aynı kolon varsa tek kolonun hacmi adetle çarpılır. Son olarak fire payı eklenir: gerekli beton = toplam hacim × (1 + fire ÷ 100). Hazır beton metreküp üzerinden sipariş edildiği için sonuç doğrudan sipariş miktarını tahmin etmekte kullanılabilir.`,
    ] },
    { h: 'Çözümlü örnek: 30 × 60 cm, 12 kolon', p: [
      `Bir katta 30 × 60 cm kesitli, 3 metre yüksekliğinde 12 kolon bulunsun. Kesit alanı 0,30 × 0,60 = 0,18 m²'dir. Tek kolonun hacmi 0,18 × 3 = 0,54 m³, on iki kolonun toplamı 0,54 × 12 = 6,48 m³ eder. Yüzde 5 fire eklenince <strong>6,804 m³</strong> beton gerekir. Bu betonun ağırlığı yaklaşık 16,33 tondur.`,
      `Dairesel örnek: 50 cm çaplı, 3 metre yüksekliğinde dört kolon. Kesit alanı π × 0,25² = 0,1963 m², tek kolon 0,589 m³, dört kolon toplam 2,356 m³ beton alır.`,
    ] },
    { h: 'Yükseklik olarak hangi ölçü alınmalı?', p: [
      `Kolon betonu çoğunlukla döşeme ve kiriş betonundan ayrı ya da onlarla birlikte dökülür ve metraj hesabında aynı hacmin iki kez sayılmaması gerekir. Yaygın uygulamada kolon yüksekliği, alt döşemenin üst yüzünden üstteki kirişin ya da döşemenin alt yüzüne kadar ölçülür; kiriş ve döşeme hacimleri ayrıca hesaplanır. Örneğin kat yüksekliği 3 metre, kiriş yüksekliği 50 cm ise kolon net yüksekliği 2,5 metre alınabilir.`,
      `Kolon ile kirişin kesiştiği düğüm bölgesinin hangi kaleme yazılacağı metraj yöntemine göre değişir. Hangi yöntemi seçerseniz seçin, tüm kat için tutarlı davranmanız yeterlidir. Keşif özeti ya da hakediş hazırlıyorsanız ilgili şartnamedeki ölçü kuralına uyun.`,
    ] },
    { h: 'Fire payı neden eklenir?', p: [
      `Şantiyede sipariş edilen betonun tamamı kalıba girmez. Pompa hortumunda ve transmikserde kalan beton, kalıp açılmaları ve küçük taşmalar, numune alımı ve dökülme gibi nedenlerle bir miktar kayıp olur. Kolon gibi dar kesitli elemanlarda pompayla dökümde kayıp oranı, geniş döşemelere göre biraz daha yüksek olabilir. Yüzde 3 ile 5 arası bir pay yaygın bir kabuldür; küçük hacimli dökümlerde pompa kaybı oransal olarak büyüyeceği için payı artırmak gerekebilir.`,
      `Eksik gelen birkaç yüz litre beton için yeniden araç çağırmak hem pahalıdır hem de soğuk derz oluşmasına yol açabilir. Bu yüzden miktarı bir miktar yukarı yuvarlamak çoğu zaman daha ekonomiktir.`,
    ] },
    { h: 'Sık kullanılan kesitler için tek kolon hacimleri', p: [
      `3 metre yükseklik için, fire hariç:`,
    ], ul: [
      `<strong>25 × 50 cm:</strong> 0,375 m³`,
      `<strong>30 × 60 cm:</strong> 0,54 m³`,
      `<strong>40 × 40 cm:</strong> 0,48 m³`,
      `<strong>50 × 50 cm:</strong> 0,75 m³`,
      `<strong>Ø30 cm dairesel:</strong> 0,212 m³`,
      `<strong>Ø50 cm dairesel:</strong> 0,589 m³`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Birimleri karıştırmak: kesit santimetre, yükseklik metre girilir. Yüksekliğe 300 yazmak sonucu yüz kat büyütür; araç bu durumda uyarı verir.`,
      `Çap yerine yarıçap yazmak: dairesel kolonda alan çapın karesiyle orantılı olduğundan, yarıçap girilirse hacim dörtte birine düşer.`,
      `Farklı kesitli kolonları tek satırda hesaplamak: her kesit grubunu ayrı girip sonuçları toplayın.`,
      `Kolon yüksekliğini kat yüksekliğiyle aynı almak ve kiriş hacmini ayrıca eklemek: düğüm bölgesi iki kez sayılır.`,
      `Donatı hacmini düşmeye çalışmak: metrajda donatının kapladığı hacim genellikle düşülmez; bu araç da düşmez.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Bu araç yalnızca <strong>beton miktarını</strong> hesaplar; kolonun kaç santimetre olması gerektiğini, hangi beton sınıfının kullanılacağını ya da donatı düzenini belirlemez. Kolon boyutları, beton sınıfı ve donatı, yürürlükteki deprem ve betonarme yönetmeliklerine göre yetkili bir inşaat mühendisi tarafından hazırlanan statik projede belirlenir. L, T ya da çokgen kesitli kolonlar için kesiti dikdörtgenlere ayırıp ayrı ayrı hesaplayabilirsiniz. Sonuçlar keşif ve sipariş tahmini içindir.`,
    ] },
  ],
  faq: [
    ['30 × 60 kolon kaç metreküp beton alır?', `Yüksekliğe bağlıdır. 3 metre yükseklikte 0,30 × 0,60 × 3 = 0,54 m³, 2,8 metre yükseklikte 0,504 m³ beton alır. Kolon sayısıyla çarparak toplamı bulabilirsiniz.`],
    ['Yuvarlak kolonun hacmi nasıl hesaplanır?', `Kesit alanı π × yarıçapın karesi ile bulunur ve yükseklikle çarpılır. 40 cm çaplı, 3 metre yüksekliğinde bir kolon için π × 0,20² × 3 = 0,377 m³ eder. Araçta "Dairesel" seçip çapı yazmanız yeterlidir.`],
    ['1 metreküp beton kaç kilogramdır?', `Normal ağırlıklı taze beton yaklaşık 2.400 kg/m³ kabul edilir; donatılı betonarme için hesaplarda çoğunlukla 2.500 kg/m³ alınır. Araç, betonun kendi ağırlığını 2.400 kg/m³ üzerinden gösterir.`],
    ['Fire payı yüzde kaç olmalı?', `Pompalı dökümlerde yüzde 3–5 yaygın bir değerdir. Çok küçük hacimli dökümlerde pompada kalan beton oransal olarak büyür; bu durumda payı artırmak ya da siparişi yukarı yuvarlamak gerekir.`],
    ['Kolon yüksekliğine kiriş dahil mi?', `Metraj yöntemine göre değişir. Kiriş hacmini ayrıca hesaplıyorsanız kolonu kiriş altına kadar alın; böylece düğüm bölgesi iki kez sayılmaz. Kirişleri kolon yüzünden kolon yüzüne ölçüyorsanız kolonu tam kat yüksekliğinde alabilirsiniz.`],
    ['Bu araç kolon boyutunu ya da donatısını verir mi?', `Hayır. Araç yalnızca verdiğiniz ölçüler için beton hacmini hesaplar. Kolon kesiti, beton sınıfı ve donatı statik projeyle belirlenir ve mühendislik hesabı gerektirir.`],
    ['Farklı ölçülerde kolonlarım var, nasıl toplarım?', `Aynı kesit ve yükseklikteki kolonları gruplayın, her grubu adetle birlikte ayrı hesaplayın ve "Gerekli beton" sonuçlarını toplayın. Fire payını her grupta aynı tutarsanız toplam da tutarlı olur.`],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; proje ölçüleriniz sunucuya iletilmez ve saklanmaz. Sayfa yüklendikten sonra çevrimdışı da çalışır.`],
  ],
  related: ['beton-hesapla', 'temel-beton-hesapla', 'kalip-alani-hesapla', 'insaat-demiri-agirligi-hesapla', 'cimento-hesapla', 'hacim-hesapla'],
};
