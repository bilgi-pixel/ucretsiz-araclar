export default {
  slug: 'awg-mm2-cevir',
  title: 'AWG mm² Kablo Çevirici',
  h1Tail: 'AWG ↔ mm²',
  pageTitle: 'AWG mm² Kablo Çevirici – AWG Kaç mm², Çap ve Direnç Tablosu',
  description: 'AWG kablo numarasını mm² kesite ve mm çapa çevirin ya da mm² kesitin en yakın AWG karşılığını bulun. Bakır direnci ve metrik standart kesit de gösterilir.',
  card: 'AWG numarasını mm² kesite ve çapa çevirin ya da bir mm² kesitin en yakın AWG karşılığını bulun.',
  category: 'elektrik',
  keywords: ['awg mm2 çevirme', 'awg kaç mm2', 'awg kablo tablosu', '12 awg kaç mm', 'awg çap hesaplama', 'mm2 awg karşılığı', 'amerikan kablo ölçüsü'],
  lead: `Amerikan tel ölçüsü <strong>AWG</strong> ile metrik <strong>mm²</strong> kesit arasında çeviri yapın. AWG numarasını yazdığınızda kesit, çap ve bakır direnci; mm² yazdığınızda en yakın AWG numaraları gösterilir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'text', placeholder: 'Örn. 12, 4/0 ya da 2,5' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['awg', 'AWG → mm²'], ['mm2', 'mm² → AWG']] },
  ],
  compute(v, h) {
    const cap = (n) => 0.127 * Math.pow(92, (36 - n) / 39); // mm
    const alan = (n) => Math.PI / 4 * cap(n) * cap(n); // mm²
    const ad = (n) => (n <= 0 ? (1 - n) + '/0 AWG' : 'AWG ' + n);
    const RHO = 17.241; // Ω·mm²/km, tavlanmış bakır, 20 °C
    if (v.yon === 'mm2') {
      const A = h.pos(v.deger, 'Kesit');
      const d = Math.sqrt(4 * A / Math.PI);
      const n = 36 - 39 * Math.log(d / 0.127) / Math.log(92);
      if (n < -3 - 1e-6) h.err('Bu kesit 4/0 AWG\'den (107,2 mm²) kalın; daha kalın kablolar AWG yerine kcmil ile ifade edilir.');
      if (n > 40.5) h.err('Bu kesit AWG 40\'tan (0,0049 mm²) ince; aracın kapsamı dışında.');
      const yakin = Math.min(40, Math.max(-3, Math.round(n)));
      const kalin = Math.min(40, Math.max(-3, Math.floor(n + 1e-6)));
      return {
        rows: [
          ['En yakın AWG', ad(yakin) + ' (' + h.sig(alan(yakin), 4) + ' mm²)'],
          ['Eşit ya da daha kalın ilk AWG', ad(kalin) + ' (' + h.sig(alan(kalin), 4) + ' mm²)'],
          ['Eşdeğer dolu tel çapı', h.sig(d, 4) + ' mm'],
          ['Bakır direnci (20 °C)', h.sig(RHO / A, 4) + ' Ω/km'],
        ],
        note: 'Akım taşıma açısından güvenli seçim, kesiti girilen değere eşit ya da ondan büyük olan AWG numarasıdır (numara küçüldükçe tel kalınlaşır).',
      };
    }
    let t = String(v.deger ?? '').trim().toUpperCase().replace(/AWG/g, '').replace(/\s/g, '');
    if (!t) h.err('AWG numarasını yazın (örn. 12 ya da 4/0).');
    let n, m;
    if ((m = /^([1-4])\/0$/.exec(t))) n = 1 - Number(m[1]);
    else if (/^0{1,4}$/.test(t)) n = 1 - t.length;
    else if (/^\d{1,2}$/.test(t)) n = Number(t);
    else h.err('AWG numarası 1–40 arası bir tam sayı ya da 1/0, 2/0, 3/0, 4/0 biçiminde olmalı.');
    if (n > 40) h.err('AWG numarası en fazla 40 olabilir.');
    const A = alan(n);
    const std = [0.14, 0.25, 0.34, 0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
    const ust = std.find((s) => s >= A - 1e-9);
    return {
      rows: [
        ['Kesit', h.sig(A, 4) + ' mm²'],
        ['Çap', h.sig(cap(n), 4) + ' mm'],
        ['Bakır direnci (20 °C)', h.sig(RHO / A, 4) + ' Ω/km'],
        ['Eşit ya da büyük ilk metrik kesit', h.fmt(ust, 2) + ' mm²'],
        ['Gösterim', ad(n)],
      ],
      note: 'Çap ve kesit dolu (tek telli) iletken içindir; çok telli kablolarda dış çap biraz daha büyüktür. İzolasyon kalınlığı dâhil değildir.',
    };
  },
  cases: [
    { in: { deger: '10', yon: 'awg' }, out: { 'Kesit': '5,261 mm²', 'Çap': '2,588 mm', 'Bakır direnci (20 °C)': '3,277 Ω/km', 'Eşit ya da büyük ilk metrik kesit': '6 mm²' } },
    { in: { deger: '2,5', yon: 'mm2' }, out: { 'En yakın AWG': 'AWG 13 (2,624 mm²)', 'Eşit ya da daha kalın ilk AWG': 'AWG 13 (2,624 mm²)', 'Eşdeğer dolu tel çapı': '1,784 mm', 'Bakır direnci (20 °C)': '6,896 Ω/km' } },
    { in: { deger: '12', yon: 'awg' }, out: { 'Kesit': '3,309 mm²', 'Bakır direnci (20 °C)': '5,211 Ω/km', 'Eşit ya da büyük ilk metrik kesit': '4 mm²' } },
    { in: { deger: '14', yon: 'awg' }, out: { 'Kesit': '2,081 mm²', 'Çap': '1,628 mm', 'Eşit ya da büyük ilk metrik kesit': '2,5 mm²' } },
    { in: { deger: '4/0', yon: 'awg' }, out: { 'Kesit': '107,2 mm²', 'Çap': '11,68 mm', 'Eşit ya da büyük ilk metrik kesit': '120 mm²', 'Gösterim': '4/0 AWG' } },
    { in: { deger: '0', yon: 'awg' }, out: { 'Kesit': '53,48 mm²', 'Gösterim': '1/0 AWG', 'Eşit ya da büyük ilk metrik kesit': '70 mm²' } },
    { in: { deger: 'AWG 24', yon: 'awg' }, out: { 'Kesit': '0,2047 mm²', 'Çap': '0,5106 mm', 'Eşit ya da büyük ilk metrik kesit': '0,25 mm²' } },
    { in: { deger: '18', yon: 'awg' }, out: { 'Kesit': '0,823 mm²', 'Bakır direnci (20 °C)': '20,95 Ω/km' } },
    { in: { deger: '35', yon: 'mm2' }, out: { 'En yakın AWG': 'AWG 2 (33,63 mm²)', 'Eşit ya da daha kalın ilk AWG': 'AWG 1 (42,41 mm²)' } },
    { in: { deger: '6', yon: 'mm2' }, out: { 'En yakın AWG': 'AWG 9 (6,634 mm²)' } },
    { in: { deger: '50', yon: 'awg' }, error: true },
    { in: { deger: 'abc', yon: 'awg' }, error: true },
    { in: { deger: '0', yon: 'mm2' }, error: true },
    { in: { deger: '500', yon: 'mm2' }, error: true },
  ],
  howto: [
    `"Çeviri yönü" listesinden AWG'den mm²'ye mi, mm²'den AWG'ye mi çevireceğinizi seçin.`,
    `AWG için kablonun üzerinde yazan numarayı girin: 12, 18, 24 gibi. Sıfırdan kalın teller için 1/0, 2/0, 3/0 ya da 4/0 yazın.`,
    `mm² için kesit değerini yazın; ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz (2,5 gibi).`,
    `"Çevir" düğmesine basın. Kesit, çap, kilometre başına bakır direnci ve karşılık gelen standart ölçü listelenir.`,
  ],
  sections: [
    { h: 'AWG nedir?', p: [
      `AWG (American Wire Gauge), Kuzey Amerika'da iletken kalınlığını belirtmek için kullanılan numaralandırma sistemidir. Türkiye ve Avrupa'da kablolar kesit alanıyla, yani milimetrekare ile anılırken, ABD kaynaklı ürünlerde, veri kablolarında, hoparlör ve oto ses kablolarında, güneş paneli bağlantılarında ve elektronik malzeme kataloglarında AWG numarası yazar.`,
      `Sistemin en kafa karıştıran yanı ters işlemesidir: <strong>numara büyüdükçe tel incelir</strong>. Bunun nedeni numaranın, telin üretimde kaç kez haddeden çekildiğini anlatan eski bir uygulamaya dayanmasıdır. AWG 24 ince bir sinyal telidir; AWG 10 kalın bir güç iletkenidir. AWG 0'dan kalın teller 1/0, 2/0, 3/0 ve 4/0 olarak yazılır ve "bir sıfır", "dört sıfır" diye okunur.`,
    ] },
    { h: 'Çeviri formülü', p: [
      `AWG tanımı iki sabit noktaya dayanır: AWG 36'nın çapı 0,005 inç (0,127 mm), 4/0 AWG'nin çapı 0,46 inçtir. Aradaki 39 basamak geometrik olarak, yani her adımda aynı oranla dizilir. Buna göre n numaralı telin çapı <strong>d (mm) = 0,127 × 92<sup>(36 − n) ÷ 39</sup></strong> ile bulunur. Kesit alanı dairenin alanıdır: <strong>A = π ÷ 4 × d²</strong>. 1/0 için n = 0, 2/0 için −1, 3/0 için −2, 4/0 için −3 alınır.`,
      `Bu yapıdan pratik kurallar çıkar: numara 3 azaldığında kesit yaklaşık iki katına, 6 azaldığında çap yaklaşık iki katına, 10 azaldığında kesit yaklaşık on katına çıkar.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `AWG 10 için üs (36 − 10) ÷ 39 = 0,6667'dir. 92<sup>0,6667</sup> ≈ 20,38 olduğundan çap 0,127 × 20,38 = <strong>2,588 mm</strong> çıkar. Kesit π ÷ 4 × 2,588² = <strong>5,261 mm²</strong> eder. Metrik sistemde 5,26 mm² diye bir standart kesit olmadığından, bunun yerine eşit ya da büyük ilk standart olan 6 mm² kullanılır.`,
      `Tersine, 2,5 mm² bir kablo AWG ölçeğinde 13,2'ye denk gelir. En yakın tam numara AWG 13'tür (2,624 mm²). Piyasada tek numaralı AWG teller seyrek bulunduğundan, uygulamada çoğunlukla bir kalın çift numara olan AWG 12 (3,309 mm²) seçilir; AWG 14 (2,081 mm²) ise 2,5 mm²'den incedir.`,
    ] },
    { h: 'Sık kullanılan AWG değerleri', ul: [
      `<strong>AWG 24:</strong> 0,205 mm² – ağ (Ethernet) kablosu damarları, ince sinyal telleri`,
      `<strong>AWG 22:</strong> 0,326 mm² – devre tahtası bağlantı telleri, alarm kabloları`,
      `<strong>AWG 18:</strong> 0,823 mm² – düşük gerilim besleme, küçük cihaz kordonları`,
      `<strong>AWG 16:</strong> 1,31 mm² – hoparlör kabloları, uzatma kordonları`,
      `<strong>AWG 14:</strong> 2,08 mm² – 2,5 mm²'ye yakın, biraz ince`,
      `<strong>AWG 12:</strong> 3,31 mm² – 2,5 ile 4 mm² arası`,
      `<strong>AWG 10:</strong> 5,26 mm² – güneş paneli bağlantılarında yaygın, 6 mm²'ye yakın`,
      `<strong>AWG 8:</strong> 8,37 mm² – 10 mm²'nin biraz altı`,
      `<strong>AWG 4:</strong> 21,2 mm² – akü ve invertör bağlantıları`,
      `<strong>1/0 AWG:</strong> 53,5 mm² – kalın akü ve kaynak kabloları`,
      `<strong>4/0 AWG:</strong> 107,2 mm²`,
    ] },
    { h: 'Direnç satırı nasıl hesaplanır?', p: [
      `Bir iletkenin direnci <strong>R = ρ × L ÷ A</strong> ile bulunur. Araç, tavlanmış bakırın 20 °C'deki standart özdirenci olan 0,017241 Ω·mm²/m değerini kullanır ve sonucu bir kilometre için verir. AWG 10 için 17,241 ÷ 5,261 = 3,277 Ω/km çıkar. Kendi kablonuzun direncini bulmak için bu değeri kilometre cinsinden uzunlukla çarpın; gidiş-dönüş iki iletken olduğunu unutmayın.`,
      `Alüminyum iletkenlerde direnç yaklaşık 1,6 kat daha yüksektir. Sıcaklık arttıkça bakırın direnci de artar; sıcak çalışan bir kabloda gerçek direnç tablodaki değerin üzerindedir. Bakır kaplı alüminyum (CCA) kablolar da aynı AWG numarasıyla satılabildiği için, ucuz kablolarda ölçülen direnç hesaplanandan belirgin biçimde yüksek çıkabilir.`,
    ] },
    { h: 'Dolu ve çok telli iletken farkı', p: [
      `AWG numarası iletkenin toplam bakır kesitini tanımlar. Tek telli (dolu) iletkende çap doğrudan formüldeki değerdir. Çok telli (örgülü, esnek) kablolarda teller arasında boşluk kaldığı için aynı kesitteki kablonun dış çapı daha büyük olur. Bu yüzden kumpasla çok telli bir kablonun çapını ölçüp kesit hesaplamak hatalı, genellikle olduğundan büyük sonuç verir. Sağlıklı yöntem, tek bir telin çapını ölçüp alanını tel sayısıyla çarpmaktır.`,
    ] },
    { h: 'Kablo seçerken uyarı', p: [
      `Bu araç yalnızca ölçü birimleri arasında geometrik çeviri yapar; bir kablonun <strong>kaç amper taşıyabileceğini söylemez</strong>. Akım taşıma kapasitesi iletken kesitinin yanında izolasyon türüne, döşeme biçimine, ortam sıcaklığına, yan yana giden kablo sayısına ve izin verilen gerilim düşümüne bağlıdır. AWG ölçülü bir kabloyu metrik bir tesisatta kullanacaksanız kesiti eşit ya da büyük olanı seçin ve yürürlükteki yönetmelik ile üretici tablolarına göre doğrulayın. Sabit tesisat işleri yetkili elektrikçi tarafından yapılmalıdır; sonuçlar bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['12 AWG kaç mm² eder?', `12 AWG, 3,309 mm² kesite ve 2,053 mm çapa karşılık gelir. Metrik standartlarda 2,5 mm² ile 4 mm² arasında kalır; yerine kullanılacaksa 4 mm² seçilir.`],
    ['2,5 mm² kablo kaç AWG?', `Tam karşılığı yoktur; ölçekte yaklaşık 13,2'ye denk gelir. En yakın numara AWG 13 (2,624 mm²), yaygın bulunan ve daha kalın olan seçenek AWG 12'dir (3,309 mm²). AWG 14 (2,081 mm²) 2,5 mm²'den incedir.`],
    ['AWG numarası büyüdükçe kablo kalınlaşır mı?', `Hayır, incelir. AWG 24, AWG 12'den çok daha incedir. Numara her 3 azaldığında kesit yaklaşık iki katına çıkar.`],
    ['4/0 AWG ne demek?', `AWG 0'dan kalın teller sıfır sayısıyla adlandırılır: 1/0, 2/0, 3/0 ve 4/0. 4/0 AWG ("dört sıfır") 107,2 mm² kesitindedir ve AWG ölçeğinin en kalın değeridir. Daha kalın kablolar kcmil birimiyle ifade edilir.`],
    ['10 AWG güneş kablosu yerine 6 mm² kullanabilir miyim?', `Kesit olarak 6 mm², 10 AWG'den (5,261 mm²) kalındır; yani iletken açısından yeterlidir. Ancak kablonun güneş uygulamasına uygun izolasyon sınıfında olması ve akım-gerilim düşümü hesabının yapılması gerekir.`],
    ['Çok telli kabloda çap neden farklı çıkıyor?', `Araçtaki çap dolu tek tel içindir. Çok telli kablolarda teller arası boşluk nedeniyle aynı kesitin dış çapı daha büyüktür; ayrıca izolasyon kalınlığı bu değere dâhil değildir.`],
    ['Bu araç kablonun taşıyacağı akımı verir mi?', `Hayır. Yalnızca ölçü çevirisi ve bakır direnci hesaplanır. Akım taşıma kapasitesi döşeme koşullarına ve yönetmeliklere bağlıdır; bunun için kablo kesiti hesabı yapılmalıdır.`],
    ['Girdiğim değerler bir yere kaydediliyor mu?', `Hayır. Çeviri tarayıcınızda yapılır; hiçbir veri sunucuya gönderilmez.`],
  ],
  related: ['kablo-kesiti-hesapla', 'gerilim-dusumu-hesapla', 'cm-inc-cevir', 'ohm-kanunu-hesapla', 'kw-amper-cevir'],
};
