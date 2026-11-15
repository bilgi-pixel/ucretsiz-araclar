export default {
  slug: 'bisiklet-vites-orani-hesapla',
  title: 'Bisiklet Vites Oranı Hesaplama',
  h1Tail: 'aynakol ve kaset tablosu',
  pageTitle: 'Bisiklet Vites Oranı Hesaplama – Aynakol ve Kaset Oran Tablosu',
  description: 'Aynakol ve kaset diş sayılarını girin; tüm vites oranlarını, pedal turu başına alınan yolu, dişli inç değerini, vites aralığını ve hızları tablo olarak görün.',
  card: 'Aynakol ve kaset dişlerinden tüm vites oranlarını, pedal başına yolu ve vites aralığını tablo olarak çıkarın.',
  category: 'saglik',
  keywords: ['bisiklet vites oranı hesaplama', 'vites oranı tablosu', 'aynakol kaset oranı', 'gear ratio hesaplama', 'dişli inç hesaplama', 'kompakt aynakol oranı', 'kaset diş sayısı', 'vites aralığı hesaplama'],
  lead: 'Bisikletinizin aynakol ve arka dişli (kaset ya da ruble) diş sayılarını yazın; araç her kombinasyonun <strong>vites oranını</strong>, pedalın bir turunda alınan yolu, dişli inç değerini ve seçtiğiniz kadanstaki hızı tablo hâlinde versin. En ağır ve en hafif vites ile toplam vites aralığı ayrıca özetlenir.',
  button: 'Hesapla',
  inputs: [
    { id: 'onler', label: 'Aynakol diş sayıları', type: 'text', placeholder: 'Örn. 50 34', hint: 'Birden fazla aynakol varsa boşlukla ayırın (en çok 3).' },
    { id: 'arkalar', label: 'Arka dişli diş sayıları', type: 'text', placeholder: 'Örn. 11 12 13 14 15 17 19 21 24 28', hint: 'Boşlukla ayırın (en çok 13). Yalnızca en küçük ve en büyük dişliyi yazmanız da yeterlidir.', wide: true },
    { id: 'lastik', label: 'Lastik ölçüsü', type: 'select', options: [
      ['2105', '700×25C (yol) – yaklaşık 2105 mm'],
      ['2096', '700×23C (yol) – yaklaşık 2096 mm'],
      ['2136', '700×28C (yol/tur) – yaklaşık 2136 mm'],
      ['2155', '700×32C (tur/şehir) – yaklaşık 2155 mm'],
      ['2055', '26×2.0 (dağ) – yaklaşık 2055 mm'],
      ['2148', '27.5×2.1 (dağ) – yaklaşık 2148 mm'],
      ['2288', '29×2.1 (dağ) – yaklaşık 2288 mm'],
      ['1515', '20×1.75 (katlanır) – yaklaşık 1515 mm'],
    ] },
    { id: 'kadans', label: 'Hız için kadans (tur/dakika)', type: 'number', value: '90' },
  ],
  compute(v, h) {
    const oku = (s, ad, enCok) => {
      const parcalar = String(s ?? '').split(/[\s,;\/-]+/).map((x) => x.trim()).filter(Boolean);
      if (!parcalar.length) h.err(`"${ad}" alanına en az bir diş sayısı yazın (örn. 50 34).`);
      const liste = parcalar.map((p) => {
        if (!/^\d+$/.test(p)) h.err(`"${ad}" alanında yalnızca tam sayılar olmalı; "${p}" geçersiz.`);
        const n = Number(p);
        if (n < 8 || n > 70) h.err(`"${ad}" alanındaki ${n} değeri gerçekçi değil; diş sayısı 8 ile 70 arasında olmalı.`);
        return n;
      });
      const tekil = [...new Set(liste)];
      if (tekil.length > enCok) h.err(`"${ad}" alanına en çok ${enCok} farklı dişli yazabilirsiniz.`);
      return tekil;
    };
    const onler = oku(v.onler, 'Aynakol diş sayıları', 3).sort((a, b) => b - a);
    const arkalar = oku(v.arkalar, 'Arka dişli diş sayıları', 13).sort((a, b) => a - b);
    const cevre = Number(v.lastik || 2105);
    const kadans = h.pos(String(v.kadans ?? '').trim() === '' ? '90' : v.kadans, 'Kadans');
    if (kadans > 250) h.err('Kadans 250 tur/dakikadan büyük olamaz.');
    const capInc = cevre / Math.PI / 25.4;
    const yol = (o) => o * cevre / 1000;
    const hiz = (o) => kadans * yol(o) * 60 / 1000;
    const enAgirOn = onler[0], enAgirArka = arkalar[0];
    const enHafifOn = onler[onler.length - 1], enHafifArka = arkalar[arkalar.length - 1];
    const agir = enAgirOn / enAgirArka;
    const hafif = enHafifOn / enHafifArka;
    const satirlar = [];
    for (const o of onler) {
      for (const a of arkalar) {
        const r = o / a;
        satirlar.push(`${o}/${a}  oran ${h.fix(r, 2)}  yol ${h.fix(yol(r), 2)} m  ${h.fix(r * capInc, 1)} inç  ${h.fix(hiz(r), 1)} km/sa`);
      }
    }
    return {
      rows: [
        ['En ağır vites', `${enAgirOn}/${enAgirArka} → ${h.fmt(agir, 2)}`],
        ['En hafif vites', `${enHafifOn}/${enHafifArka} → ${h.fmt(hafif, 2)}`],
        ['Vites aralığı', '%' + h.fmt(agir / hafif * 100, 0)],
        ['En ağır viteste pedal turu başına yol', h.fmt(yol(agir), 2) + ' m'],
        ['En hafif viteste pedal turu başına yol', h.fmt(yol(hafif), 2) + ' m'],
        ['En ağır viteste dişli inç', h.fmt(agir * capInc, 1) + ' inç'],
        ['En hafif viteste dişli inç', h.fmt(hafif * capInc, 1) + ' inç'],
        [`En ağır viteste hız (${h.fmt(kadans, 0)} tur/dk)`, h.fmt(hiz(agir), 2) + ' km/sa'],
        ['Kombinasyon sayısı', String(onler.length * arkalar.length)],
      ],
      text: `Vites tablosu (hız ${h.fmt(kadans, 0)} tur/dk kadansta):\n` + satirlar.join('\n'),
      note: 'Lastik çevresi yaklaşık değerdir. Çapraz zincir oluşturan kombinasyonlar (büyük aynakol–büyük dişli, küçük aynakol–küçük dişli) tabloda yer alır ama kullanılması önerilmez.',
    };
  },
  cases: [
    { in: { onler: '50 34', arkalar: '11 28', lastik: '2105', kadans: '90' }, out: { 'En ağır vites': '50/11 → 4,55', 'En hafif vites': '34/28 → 1,21', 'Vites aralığı': '%374', 'En ağır viteste pedal turu başına yol': '9,57 m', 'En hafif viteste pedal turu başına yol': '2,56 m', 'En ağır viteste hız (90 tur/dk)': '51,67 km/sa', 'Kombinasyon sayısı': '4' } },
    { in: { onler: '32', arkalar: '16', lastik: '2105', kadans: '90' }, out: { 'En ağır vites': '32/16 → 2', 'Vites aralığı': '%100', 'En ağır viteste pedal turu başına yol': '4,21 m', 'En ağır viteste dişli inç': '52,8 inç' } },
    { in: { onler: '22 32 44', arkalar: '34 11', lastik: '2055', kadans: '80' }, out: { 'En ağır vites': '44/11 → 4', 'En hafif vites': '22/34 → 0,65', 'Vites aralığı': '%618', 'Kombinasyon sayısı': '6' } },
    { in: { onler: '53 39', arkalar: '12 25', lastik: '2096', kadans: '90' }, out: { 'En ağır vites': '53/12 → 4,42', 'En hafif vites': '39/25 → 1,56', 'Vites aralığı': '%283' } },
    { in: { onler: '40', arkalar: '10 44', lastik: '2288', kadans: '90' }, out: { 'En ağır vites': '40/10 → 4', 'En hafif vites': '40/44 → 0,91', 'Vites aralığı': '%440', 'En ağır viteste pedal turu başına yol': '9,15 m' } },
    { in: { onler: '50 34', arkalar: '11 12 13 14 15 17 19 21 24 28', lastik: '2105', kadans: '90' }, out: { 'Kombinasyon sayısı': '20', 'Vites aralığı': '%374' }, textMatch: '50/17  oran 2,94  yol 6,19 m' },
    { in: { onler: 'abc', arkalar: '11 28', lastik: '2105', kadans: '90' }, error: true },
    { in: { onler: '50 34', arkalar: '', lastik: '2105', kadans: '90' }, error: true },
    { in: { onler: '50 34', arkalar: '0 28', lastik: '2105', kadans: '90' }, error: true },
  ],
  howto: [
    'Aynakolunuzdaki dişlilerin diş sayılarını boşlukla ayırarak yazın; tek aynakollu bisikletlerde tek sayı girin.',
    'Arka dişlilerin diş sayılarını yazın. Tüm kaseti girerseniz her vites tabloda görünür; yalnızca en küçük ve en büyük dişliyi yazarsanız özet değerleri alırsınız.',
    'Lastik ölçünüzü seçin; bu, pedal turu başına alınan yolu, dişli inç değerini ve hızı belirler.',
    'Hızların hangi pedal devrinde hesaplanacağını "kadans" alanında belirleyin; varsayılan 90 tur/dakikadır.',
    '"Hesapla" düğmesine basın ve alttaki tablodan vites geçişlerini inceleyin.',
  ],
  sections: [
    { h: 'Vites oranı nedir?', p: [
      'Vites oranı, öndeki aynakol dişlisinin diş sayısının arkadaki dişlinin diş sayısına bölümüdür. 50 dişli aynakol ile 25 dişli arka dişli kullanıyorsanız oran 2\'dir: pedal bir tur döndüğünde arka tekerlek iki tur atar. Oran büyüdükçe vites "ağırlaşır"; her pedal turunda daha çok yol alırsınız ama pedalı itmek için daha fazla kuvvet gerekir. Oran küçüldükçe vites "hafifler"; yokuş çıkmak kolaylaşır ama aynı hız için pedalı daha hızlı çevirmeniz gerekir.',
      'Oran 1\'in altına düştüğünde tekerlek pedaldan daha yavaş döner. Dağ bisikletlerinde 22/34 gibi kombinasyonların varlık nedeni budur: dik ve gevşek zeminde düşük hızda dengede kalarak tırmanmayı sağlarlar.',
    ] },
    { h: 'Pedal turu başına yol ve dişli inç', p: [
      'Oran tek başına tekerlek boyutunu hesaba katmaz. 20 inç tekerlekli katlanır bisiklette 3 oranı ile 29 inç dağ bisikletinde 3 oranı çok farklı hisler verir. Bu nedenle iki ölçü daha kullanılır:',
      '<strong>Pedal turu başına yol (metre)</strong> = vites oranı × tekerlek çevresi. Pedalın bir tam turunda bisikletin kaç metre ilerlediğini söyler ve farklı bisikletleri doğrudan karşılaştırmanın en anlaşılır yoludur.',
      '<strong>Dişli inç</strong> = vites oranı × tekerlek çapı (inç). Eski büyük tekerlekli bisikletlerden kalma geleneksel bir ölçüdür; o vitesin, doğrudan pedallanan kaç inç çapında bir tekerleğe eşdeğer olduğunu anlatır. Kabaca 100 inç ve üzeri çok ağır, 70 inç dolayları düz yol seyri, 30 inçin altı dik tırmanış vitesi sayılır.',
    ] },
    { h: 'Çözümlü örnek: kompakt aynakol ve 11-28 kaset', p: [
      'Yol bisikletlerinde yaygın bir kurulum 50/34 kompakt aynakol ile 11-28 kasettir. En ağır vites 50/11\'dir: 50 ÷ 11 = 4,55. 700×25C lastiğin çevresi yaklaşık 2,105 metre olduğundan pedalın bir turunda 4,55 × 2,105 = 9,57 metre yol alınır. 90 kadansla bu, saatte 51,67 kilometre demektir; yani bu vites esas olarak inişler ve sprint içindir.',
      'En hafif vites 34/28\'dir: 34 ÷ 28 = 1,21 ve pedal turu başına 2,56 metre. İki ucun birbirine oranı 4,55 ÷ 1,21 = 3,74 olduğundan vites aralığı %374 çıkar. Bu, en ağır vitesin en hafif vitese göre pedal turu başına 3,74 kat yol aldırdığı anlamına gelir.',
    ] },
    { h: 'Vites aralığı neden önemlidir?', p: [
      'Vites aralığı, bisikletin hem dik yokuşlara hem hızlı inişlere ne kadar uyum sağlayabildiğinin tek sayılık özetidir. Tek aynakollu (1x) modern dağ bisikletlerinde 10-44 ya da daha geniş kasetlerle %440 ve üzeri aralıklar elde edilir; böylece ön aktarıcıya gerek kalmaz. Yol bisikletlerinde aralık daha dar tutulur, çünkü dişliler arasındaki sıçramaların küçük olması sabit kadansı korumayı kolaylaştırır.',
      'Geniş aralık her zaman daha iyi değildir. Aynı vites sayısıyla daha geniş aralık, vitesler arası daha büyük adımlar demektir. Düz yolda grup sürüşü yapan biri için 15\'ten 17 dişe geçiş ile 15\'ten 18\'e geçiş arasındaki fark kadansta hissedilir bir kopukluk yaratabilir.',
    ] },
    { h: 'Yaygın kurulumlar', ul: [
      '<strong>Standart yol:</strong> 53/39 aynakol – düz ve hızlı parkurlar için ağır oranlar',
      '<strong>Yarı kompakt:</strong> 52/36 aynakol – dengeli kullanım',
      '<strong>Kompakt:</strong> 50/34 aynakol – tırmanışta daha hafif vitesler',
      '<strong>Üçlü dağ aynakolu:</strong> 44/32/22 – eski ve giriş seviyesi dağ bisikletlerinde geniş aralık',
      '<strong>Tek aynakol (1x):</strong> 30–40 diş arası tek dişli ile geniş kaset',
      '<strong>Tek vites / sabit vites:</strong> şehir içinde 2,6–3,0 dolayında oranlar sık görülür',
    ] },
    { h: 'Dikkat edilecekler', p: [
      'Tablodaki her kombinasyon kâğıt üzerinde mümkündür, ancak pratikte çapraz zincirden kaçınılır. Büyük aynakol ile en büyük arka dişliyi ya da küçük aynakol ile en küçük arka dişliyi birlikte kullanmak zinciri eğik çalıştırır, sürtünmeyi ve aşınmayı artırır. Ayrıca iki aynakollu sistemlerde birçok oran birbirine çok yakındır; 20 kombinasyon 20 ayrı vites anlamına gelmez.',
      'Dişli değiştirmeyi düşünüyorsanız yalnızca orana bakmayın: arka aktarıcının taşıyabildiği en büyük dişli ve toplam zincir kapasitesi sınırlıdır. Uyumluluk için parçanın teknik belgelerine bakın ya da bir bisiklet teknik servisine danışın. Sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['50/34 aynakol ile 11-28 kasetin vites aralığı nedir?', 'En ağır vites 50/11 = 4,55, en hafif vites 34/28 = 1,21 oranındadır. İkisinin oranı 3,74 olduğundan vites aralığı %374\'tür.'],
    ['Yokuş için hangi oran daha iyidir?', 'Daha küçük oran yokuşu kolaylaştırır. Küçük aynakol ve büyük arka dişli birlikte en hafif vitesi verir. Yol bisikletinde 1\'e yakın, dağ bisikletinde 1\'in altındaki oranlar dik tırmanışlar içindir.'],
    ['Tüm kaset dişlilerini yazmam şart mı?', 'Hayır. Özet değerler için en küçük ve en büyük dişli yeterlidir. Ara dişlileri de yazarsanız tabloda her vitesin oranını ve vitesler arasındaki adımları görebilirsiniz.'],
    ['Dişli inç değeri ne işe yarar?', 'Farklı tekerlek boyutlarındaki bisikletlerin viteslerini tek ölçekte karşılaştırmaya yarar. Oranı tekerlek çapıyla çarparak bulunur; iki farklı bisiklette aynı dişli inç değeri, aynı kadansta aynı hız demektir.'],
    ['Sabit vitesli bisiklet için hangi oranı seçmeliyim?', 'Şehir içi düz kullanımda 2,6 ile 3,0 arasındaki oranlar yaygındır; örneğin 46/17 yaklaşık 2,71 verir. Yokuşlu şehirlerde daha hafif bir oran dizleri korur. Kendi kadansınıza göre hızları görmek için değerleri araca yazabilirsiniz.'],
    ['İçten vitesli göbekte bu hesap geçerli mi?', 'Araç yalnızca dişli çiftinin oranını hesaplar. İçten vitesli göbeklerde her vitesin göbek içi çarpanı ayrıca uygulanmalıdır; bu çarpanlar üreticinin teknik belgelerinde yer alır.'],
    ['Diş sayılarını nereden öğrenirim?', 'Çoğu aynakol ve kaset dişlisinin üzerinde diş sayısı küçük harflerle kazınmıştır (örneğin 50T). Yazmıyorsa bir dişi işaretleyip tek tek sayabilirsiniz.'],
    ['Yazdığım veriler saklanıyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['bisiklet-hiz-kadans-hesapla', 'bisiklet-kalori-hesapla', 'hiz-hesapla', 'yuzde-hesapla'],
};
