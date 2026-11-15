export default {
  slug: 'ohm-kiloohm-cevir',
  title: 'Ohm Kiloohm Megaohm Çevirici',
  h1Tail: 'Ω ↔ kΩ ↔ MΩ',
  pageTitle: `Ohm Kiloohm Megaohm Çevirici – Ω, kΩ, MΩ Direnç Birimi Çevirme`,
  description: `Direnç değerini ohm, kiloohm, megaohm, miliohm ve gigaohm arasında çevirin. 4k7, 2M2 gibi devre şeması kısa yazımını da birlikte gösterir.`,
  card: `Direnç değerini Ω, kΩ, MΩ, mΩ ve GΩ arasında çevirin; 4k7 gibi şema kısa yazımını da görün.`,
  category: 'birim',
  keywords: ['ohm kiloohm çevirme', 'kiloohm kaç ohm', 'megaohm kaç ohm', '1 kΩ kaç ohm', 'direnç birimi çevirme', '4k7 kaç ohm', 'miliohm ohm çevirme'],
  lead: `Bir direnç değerini ohm (Ω), kiloohm (kΩ), megaohm (MΩ), miliohm (mΩ) ve gigaohm (GΩ) arasında çevirin. Araç seçtiğiniz hedef birimdeki sonucu, diğer tüm karşılıkları ve devre şemalarında kullanılan <strong>4k7</strong> benzeri kısa yazımı birlikte verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Direnç değeri', type: 'number', placeholder: 'Örn. 4700' },
    { id: 'kaynak', label: 'Girilen birim', type: 'select', options: [['ohm', 'Ohm (Ω)'], ['kohm', 'Kiloohm (kΩ)'], ['mega', 'Megaohm (MΩ)'], ['mili', 'Miliohm (mΩ)'], ['giga', 'Gigaohm (GΩ)']] },
    { id: 'hedef', label: 'Çevrilecek birim', type: 'select', options: [['kohm', 'Kiloohm (kΩ)'], ['ohm', 'Ohm (Ω)'], ['mega', 'Megaohm (MΩ)'], ['mili', 'Miliohm (mΩ)'], ['giga', 'Gigaohm (GΩ)']] },
  ],
  compute(v, h) {
    const birimler = {
      mili: [1e-3, 'mΩ', 'Miliohm'],
      ohm: [1, 'Ω', 'Ohm'],
      kohm: [1e3, 'kΩ', 'Kiloohm'],
      mega: [1e6, 'MΩ', 'Megaohm'],
      giga: [1e9, 'GΩ', 'Gigaohm'],
    };
    const x = h.nonneg(v.deger, 'Direnç değeri');
    const k = birimler[v.kaynak] || birimler.ohm;
    const t = birimler[v.hedef] || birimler.kohm;
    const ohm = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(ohm / b[0], 9) + ' ' + b[1];
    // Şema kısa yazımı: ondalık ayracın yerine çarpan harfi konur (4k7, 2M2, 470R).
    let harf = 'R', bol = 1;
    if (ohm >= 1e9) { harf = 'G'; bol = 1e9; } else if (ohm >= 1e6) { harf = 'M'; bol = 1e6; } else if (ohm >= 1e3) { harf = 'k'; bol = 1e3; }
    const s = String(Number((ohm / bol).toPrecision(4)));
    const kisa = /e/i.test(s) ? '—' : (s.includes('.') ? s.replace('.', harf) : s + harf);
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Ohm', yaz(birimler.ohm)],
        ['Kiloohm', yaz(birimler.kohm)],
        ['Megaohm', yaz(birimler.mega)],
        ['Miliohm', yaz(birimler.mili)],
        ['Gigaohm', yaz(birimler.giga)],
        ['Şema kısa yazımı', kisa],
      ],
      note: '1 kΩ = 1.000 Ω, 1 MΩ = 1.000.000 Ω. Kısa yazım dört anlamlı basamağa yuvarlanır; R ohm, k kiloohm, M megaohm anlamına gelir.',
    };
  },
  cases: [
    { in: { deger: '4700', kaynak: 'ohm', hedef: 'kohm' }, out: { 'Sonuç': '4,7 kΩ', 'Megaohm': '0,0047 MΩ', 'Şema kısa yazımı': '4k7' } },
    { in: { deger: '2,2', kaynak: 'mega', hedef: 'ohm' }, out: { 'Sonuç': '2.200.000 Ω', 'Kiloohm': '2.200 kΩ', 'Şema kısa yazımı': '2M2' } },
    { in: { deger: '470', kaynak: 'ohm', hedef: 'kohm' }, out: { 'Sonuç': '0,47 kΩ', 'Şema kısa yazımı': '470R' } },
    { in: { deger: '10', kaynak: 'kohm', hedef: 'mega' }, out: { 'Sonuç': '0,01 MΩ', 'Ohm': '10.000 Ω', 'Şema kısa yazımı': '10k' } },
    { in: { deger: '50', kaynak: 'mili', hedef: 'ohm' }, out: { 'Sonuç': '0,05 Ω', 'Miliohm': '50 mΩ', 'Şema kısa yazımı': '0R05' } },
    { in: { deger: '1', kaynak: 'giga', hedef: 'mega' }, out: { 'Sonuç': '1.000 MΩ', 'Ohm': '1.000.000.000 Ω' } },
    { in: { deger: '0', kaynak: 'ohm', hedef: 'kohm' }, out: { 'Sonuç': '0 kΩ' } },
    { in: { deger: 'abc', kaynak: 'ohm', hedef: 'kohm' }, error: true },
    { in: { deger: '-100', kaynak: 'ohm', hedef: 'kohm' }, error: true },
  ],
  howto: [
    `"Direnç değeri" alanına elinizdeki sayıyı yazın; ondalık için virgül kullanabilirsiniz (örn. 4,7).`,
    `"Girilen birim" listesinden bu sayının hangi birimde olduğunu seçin: ohm, kiloohm, megaohm, miliohm ya da gigaohm.`,
    `"Çevrilecek birim" listesinden görmek istediğiniz hedef birimi belirleyin.`,
    `"Çevir" düğmesine basın. İlk satır seçtiğiniz hedef birimdeki sonucu, alt satırlar diğer bütün birimlerdeki karşılıkları gösterir.`,
    `Devre şemasına ya da malzeme listesine yazacaksanız "Şema kısa yazımı" satırındaki 4k7, 2M2 gibi gösterimi kopyalayın.`,
  ],
  sections: [
    { h: 'Ohm, kiloohm ve megaohm arasındaki ilişki', p: [
      `Ohm (Ω), elektrik direncinin SI birimidir: uçlarına 1 volt uygulandığında içinden 1 amper akım geçen iletkenin direnci 1 ohm'dur. Uygulamada dirençler birkaç miliohmdan yüzlerce megaohma kadar çok geniş bir aralığa yayıldığı için metrik ön ekler kullanılır. Kilo bin, mega milyon, giga milyar anlamına gelir; mili ise binde biridir.`,
      `Buna göre çeviri yalnızca bin ve katlarıyla çarpma ya da bölmedir: <strong>1 kΩ = 1.000 Ω</strong>, <strong>1 MΩ = 1.000 kΩ = 1.000.000 Ω</strong>, <strong>1 GΩ = 1.000 MΩ</strong> ve <strong>1 Ω = 1.000 mΩ</strong>. Büyük birimden küçüğe giderken sayı büyür, küçük birimden büyüğe giderken küçülür. Ohmdan kiloohma geçmek için virgülü üç basamak sola, kiloohmdan ohma geçmek için üç basamak sağa kaydırmanız yeterlidir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `Bir direncin üzerindeki renk kodundan 4.700 Ω okuduğunuzu düşünün. Kiloohm karşılığı 4.700 ÷ 1.000 = <strong>4,7 kΩ</strong>, megaohm karşılığı 4.700 ÷ 1.000.000 = 0,0047 MΩ olur. Şemada bu değer 4k7 biçiminde yazılır.`,
      `Tersi yönde bir örnek: bir ses devresinde 2,2 MΩ'luk giriş direnci isteniyor. Ohm cinsinden 2,2 × 1.000.000 = <strong>2.200.000 Ω</strong>, kiloohm cinsinden 2.200 kΩ eder; kısa yazımı 2M2'dir. Küçük değerlerde ise miliohm devreye girer: akım ölçmek için kullanılan 50 mΩ'luk bir şönt direnci 50 ÷ 1.000 = 0,05 Ω'dur ve şemada 0R05 olarak görünür.`,
    ] },
    { h: '4k7, 2M2, 470R: şema kısa yazımı nasıl okunur?', p: [
      `Devre şemalarında ve kart üzerindeki baskılarda ondalık virgül kolayca silinebildiği ya da fotokopide kaybolabildiği için virgül yerine birimin çarpan harfi yazılır. Bu yazımda <code>R</code> ohm, <code>k</code> kiloohm, <code>M</code> megaohm demektir ve harf, ondalık ayracın bulunduğu yere konur.`,
    ], ul: [
      `<code>470R</code> = 470 Ω`,
      `<code>4R7</code> = 4,7 Ω`,
      `<code>0R05</code> = 0,05 Ω = 50 mΩ`,
      `<code>1k</code> = 1 kΩ = 1.000 Ω`,
      `<code>4k7</code> = 4,7 kΩ = 4.700 Ω`,
      `<code>100k</code> = 100 kΩ = 100.000 Ω`,
      `<code>2M2</code> = 2,2 MΩ = 2.200.000 Ω`,
    ] },
    { h: 'Hangi büyüklükte hangi birim kullanılır?', p: [
      `Miliohm düzeyi; kablo ve bara dirençlerinde, sigorta ve röle kontaklarında, akü iç direncinde ve akım ölçme şöntlerinde görülür. Bu kadar küçük dirençler sıradan iki uçlu ölçümle doğru okunamaz, çünkü ölçü aletinin prob kabloları da benzer büyüklükte direnç taşır.`,
      `Ohm ve kiloohm aralığı elektronik kartların gündelik bölgesidir: LED ön dirençleri çoğunlukla yüzlerce ohm, sinyal hatlarındaki çekme (pull-up) dirençleri birkaç kiloohm ile onlarca kiloohm arasındadır. Megaohm düzeyi yüksek empedanslı girişlerde, zamanlama devrelerinde ve yalıtım direnci ölçümlerinde karşınıza çıkar. Tesisat ve motor sargılarında yalıtım kontrolü megaohm ölçen özel cihazlarla yapılır; gigaohm ise iyi durumdaki yalıtkanların ve çok hassas ölçüm devrelerinin birimidir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Küçük m ile büyük M'yi karıştırmak:</strong> mΩ miliohm, MΩ megaohmdur; aralarında bir milyar kat fark vardır. Elle not alırken harfin büyüklüğüne dikkat edin.`,
      `<strong>Multimetre kademesini hesaba katmamak:</strong> ekranda 4.70 görüp kademe kΩ'dayken bunu ohm sanmak sık rastlanan bir yanlıştır. Ekrandaki birim göstergesini okuyup değeri bu araçla ohma çevirerek kontrol edebilirsiniz.`,
      `<strong>Virgülü yanlış yöne kaydırmak:</strong> 0,47 kΩ değeri 47 Ω değil 470 Ω'dur. Emin olamadığınızda sonucu her iki birimde de görmek hatayı hemen ortaya çıkarır.`,
      `<strong>Toleransı unutmak:</strong> üzerinde 4,7 kΩ yazan yüzde 5 toleranslı bir direnç 4.465 Ω ile 4.935 Ω arasında herhangi bir değerde olabilir. Birim çevirisi kesin, parçanın kendisi ise yaklaşık değerlidir.`,
    ] },
    { h: 'Hesabın sınırları ve güvenlik notu', p: [
      `Araç yalnızca birim dönüştürür; akım, gerilim ya da güç hesabı yapmaz ve direncin taşıyabileceği gücü denetlemez. Negatif değer kabul edilmez, sıfır ise kısa devre anlamında geçerli bir giriştir. Sonuçlar dokuz anlamlı basamağa kadar gösterilir; çok küçük karşılıklar bilimsel gösterimle yazılır.`,
      `Buradaki sonuçlar bilgilendirme amaçlıdır. Şebeke gerilimi taşıyan devrelerde, yalıtım testi ve topraklama ölçümlerinde yanlış birim okumak can ve mal güvenliğini etkileyebilir; bu tür işlerde ölçüm ve değerlendirmeyi yetkili bir elektrik teknisyenine ya da mühendisine bırakın.`,
    ] },
  ],
  faq: [
    ['1 kiloohm kaç ohm eder?', `1 kiloohm tam olarak 1.000 ohm'dur. Kilo ön eki bin anlamına geldiği için kiloohm değerini 1.000 ile çarparak ohma, ohm değerini 1.000'e bölerek kiloohma çevirirsiniz.`],
    ['1 megaohm kaç kiloohm ve kaç ohm eder?', `1 megaohm 1.000 kiloohm, yani 1.000.000 ohm eder. Örneğin 4,7 MΩ değeri 4.700 kΩ ve 4.700.000 Ω'a karşılık gelir.`],
    ['4k7 ne demek?', `4k7, 4,7 kiloohm yani 4.700 ohm anlamına gelen şema kısa yazımıdır. Ondalık virgülün yerine birim harfi konur; böylece baskıda silinebilecek bir nokta ya da virgüle gerek kalmaz.`],
    ['Direnç üzerindeki R harfi neyi gösterir?', `R, değerin ohm cinsinden olduğunu ve ondalık ayracın yerini gösterir. 10R 10 ohm, 4R7 4,7 ohm, 0R1 ise 0,1 ohm demektir.`],
    ['Miliohm ile megaohm arasındaki fark nedir?', `Miliohm (mΩ) ohmun binde biri, megaohm (MΩ) ise bir milyon katıdır. 1 MΩ, 1.000.000.000 mΩ eder; yani iki birim arasında bir milyar kat fark vardır ve harfin küçük ya da büyük yazılması sonucu tümüyle değiştirir.`],
    ['Multimetrede 0.L ya da OL görünmesi ne anlama gelir?', `Bu gösterim, ölçülen direncin seçili kademenin üst sınırını aştığını belirtir. Daha yüksek bir kademe (örneğin kΩ yerine MΩ) seçtiğinizde değer okunabilir hale gelir; hiçbir kademede okunmuyorsa devre açık demektir.`],
    ['Kiloohm kısaltması kΩ mu, KΩ mu yazılır?', `Doğru yazım küçük k ile kΩ'dur; SI sisteminde kilo ön eki her zaman küçük harfle gösterilir. Mega için büyük M, mili için küçük m, giga için büyük G kullanılır.`],
    ['Yazdığım direnç değerleri kaydediliyor mu?', `Hayır. Çeviri tümüyle tarayıcınızın içinde yapılır; girdiğiniz sayı hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı kesilse de araç çalışmayı sürdürür.`],
  ],
  related: ['ohm-kanunu-hesapla', 'seri-direnc-hesapla', 'paralel-direnc-hesapla', 'smd-direnc-kodu-coz', 'amper-miliamper-cevir', 'volt-milivolt-cevir'],
};
