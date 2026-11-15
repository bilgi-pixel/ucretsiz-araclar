export default {
  slug: 'is-hesapla',
  title: 'İş Hesaplama (Fizik)',
  h1Tail: 'W = F · d · cos θ',
  pageTitle: 'İş Hesaplama (Fizik) – W = F·d·cosθ ile İş, Kuvvet, Yol Bulma',
  description: 'Fizikte işi kuvvet, yol ve açıdan hesaplayın: W = F·d·cosθ. İşten kuvveti ya da yer değiştirmeyi bulun; joule sonucu, çözümlü örnekler ve sık hatalar.',
  card: 'W = F·d·cosθ ile fiziksel işi joule olarak hesaplayın; kuvveti ya da yer değiştirmeyi de bulabilirsiniz.',
  category: 'bilim',
  keywords: ['iş hesaplama fizik', 'iş formülü', 'W = F d', 'fizikte iş nasıl hesaplanır', 'joule hesaplama', 'kuvvet yol iş', 'iş kuvvet açı cos'],
  lead: `Bir kuvvetin cisim üzerinde yaptığı <strong>işi</strong> joule cinsinden hesaplayın; işi bilinen durumda kuvveti ya da yer değiştirmeyi bulun. Araç <strong>W = F · d · cos θ</strong> bağıntısını kullanır; kuvvet hareket yönündeyse açıyı 0 bırakmanız yeterlidir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['w', 'İş (W)'], ['f', 'Kuvvet (F)'], ['d', 'Yer değiştirme (d)']] },
    { id: 'kuvvet', label: 'Kuvvet (N)', type: 'number', placeholder: 'Örn. 10', hint: 'Kuvveti arıyorsanız boş bırakın.' },
    { id: 'yol', label: 'Yer değiştirme (m)', type: 'number', placeholder: 'Örn. 5', hint: 'Yer değiştirmeyi arıyorsanız boş bırakın.' },
    { id: 'aci', label: 'Kuvvet ile hareket yönü arasındaki açı (°)', type: 'number', value: '0', hint: '0–180 arası. Kuvvet hareketle aynı yöndeyse 0, zıt yöndeyse 180.' },
    { id: 'isDegeri', label: 'İş (J)', type: 'number', placeholder: 'Örn. 50', hint: 'İşi arıyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    const aci = h.opt(v.aci, 0, 'Açı');
    if (aci < 0 || aci > 180) h.err('Açı 0 ile 180 derece arasında olmalı.');
    let c = Math.cos((aci * Math.PI) / 180);
    if (Math.abs(c) < 1e-12) c = 0;
    let f, d, w;
    if (v.bul === 'f' || v.bul === 'd') {
      w = h.num(v.isDegeri, 'İş');
      if (c === 0) h.err('Açı 90° iken kuvvet iş yapmaz; işten kuvvet ya da yol bulunamaz. Farklı bir açı yazın.');
      if (w !== 0 && (w > 0) !== (c > 0)) h.err('İşin işareti açıyla uyumsuz: 90°\'den küçük açılarda iş pozitif, büyük açılarda negatif olmalı.');
      if (v.bul === 'f') {
        d = h.pos(v.yol, 'Yer değiştirme');
        f = w / (d * c);
      } else {
        f = h.pos(v.kuvvet, 'Kuvvet');
        d = w / (f * c);
      }
    } else {
      f = h.nonneg(v.kuvvet, 'Kuvvet');
      d = h.nonneg(v.yol, 'Yer değiştirme');
      w = f * d * c;
    }
    const satirlar = {
      w: ['İş', h.fmt(w, 4) + ' J'],
      f: ['Kuvvet', h.fmt(f, 4) + ' N'],
      d: ['Yer değiştirme', h.fmt(d, 4) + ' m'],
    };
    const sira = v.bul === 'f' ? ['f', 'w', 'd'] : v.bul === 'd' ? ['d', 'w', 'f'] : ['w', 'f', 'd'];
    const tur = w > 1e-12 ? 'Pozitif iş (kuvvet cisme enerji aktarır)' : w < -1e-12 ? 'Negatif iş (kuvvet cisimden enerji alır)' : 'İş yapılmıyor';
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['İş (kJ)', h.fmt(w / 1000, 4) + ' kJ'],
        ['Kuvvetin hareket yönündeki bileşeni', h.fmt(f * c, 4) + ' N'],
        ['Yorum', tur],
      ],
      note: `Açı ${h.fmt(aci, 2)}° için cos θ = ${h.fmt(c, 4)}. Kuvvetin sabit ve yolun doğrusal olduğu varsayılır.`,
    };
  },
  cases: [
    { in: { bul: 'w', kuvvet: '10', yol: '5', aci: '0' }, out: { 'İş': '50 J', 'Yorum': 'Pozitif iş (kuvvet cisme enerji aktarır)' } },
    { in: { bul: 'w', kuvvet: '100', yol: '10', aci: '60' }, out: { 'İş': '500 J', 'İş (kJ)': '0,5 kJ', 'Kuvvetin hareket yönündeki bileşeni': '50 N' } },
    { in: { bul: 'w', kuvvet: '50', yol: '4', aci: '90' }, out: { 'İş': '0 J', 'Yorum': 'İş yapılmıyor' } },
    { in: { bul: 'f', yol: '10', aci: '0', isDegeri: '200' }, out: { 'Kuvvet': '20 N' } },
    { in: { bul: 'd', kuvvet: '60', aci: '0', isDegeri: '300' }, out: { 'Yer değiştirme': '5 m' } },
    { in: { bul: 'w', kuvvet: '20', yol: '3', aci: '180' }, out: { 'İş': '-60 J', 'Yorum': 'Negatif iş (kuvvet cisimden enerji alır)' } },
    { in: { bul: 'f', yol: '8', aci: '60', isDegeri: '400' }, out: { 'Kuvvet': '100 N' } },
    { in: { bul: 'f', yol: '10', aci: '90', isDegeri: '200' }, error: true },
    { in: { bul: 'w', kuvvet: '10', yol: '5', aci: '200' }, error: true },
    { in: { bul: 'w', kuvvet: '', yol: '5', aci: '0' }, error: true },
  ],
  howto: [
    `"Bulunacak büyüklük" listesinden iş, kuvvet ya da yer değiştirmeden hangisini aradığınızı seçin.`,
    `Bildiğiniz değerleri yazın: kuvvet newton, yer değiştirme metre, iş joule cinsindendir.`,
    `Kuvvet hareket yönüyle bir açı yapıyorsa açıyı derece olarak girin. Kuvvet hareketle aynı doğrultu ve yöndeyse 0 bırakın; sürtünme gibi harekete zıt kuvvetler için 180 yazın.`,
    `"Hesapla" düğmesine basın. Sonuçta iş joule ve kilojoule olarak, kuvvetin hareket yönündeki bileşeni ve işin pozitif mi negatif mi olduğu görünür.`,
  ],
  sections: [
    { h: 'Fizikte iş ne demektir?', p: [
      `Gündelik dilde "iş" her türlü çabayı anlatır; fizikte ise çok daha dar bir anlamı vardır. Fiziksel anlamda iş yapılmış sayılması için iki koşul gerekir: cisme bir kuvvet uygulanmalı ve cisim bu kuvvetin doğrultusunda yer değiştirmelidir. Duvarı saatlerce itseniz de duvar hareket etmediği sürece fizik açısından iş yapmış olmazsınız, yorulmanız bunu değiştirmez.`,
      `İş, kuvvet aracılığıyla aktarılan enerjinin ölçüsüdür. Bir cisme pozitif iş yapıldığında cismin enerjisi artar; negatif iş yapıldığında azalır. Bu nedenle iş ile enerjinin birimi aynıdır.`,
    ] },
    { h: 'Formül: W = F · d · cos θ', p: [
      `Sabit bir kuvvetin doğrusal bir yol boyunca yaptığı iş <strong>W = F · d · cos θ</strong> ile hesaplanır. F newton cinsinden kuvvet, d metre cinsinden yer değiştirme, θ ise kuvvet ile hareket yönü arasındaki açıdır. Sonuç <strong>joule (J)</strong> olarak çıkar; 1 joule, 1 newtonluk kuvvetin cismi kendi doğrultusunda 1 metre hareket ettirmesiyle yapılan iştir (1 J = 1 N·m).`,
      `F · cos θ çarpımı, kuvvetin hareket yönündeki bileşenidir. İşi yalnızca bu bileşen yapar; harekete dik olan bileşenin işe katkısı yoktur. Kuvvet hareketle aynı yöndeyse cos 0° = 1 olur ve formül en bilinen hâline, <code>W = F · d</code> biçimine iner.`,
    ] },
    { h: 'Açının etkisi: pozitif, sıfır ve negatif iş', ul: [
      `<strong>θ = 0°:</strong> cos θ = 1. Kuvvetin tamamı iş yapar. Örnek: yatay zeminde arabayı arkadan itmek.`,
      `<strong>0° ile 90° arası:</strong> iş pozitiftir ama F · d'den küçüktür. Örnek: valizi eğik tutulan sapından çekmek.`,
      `<strong>θ = 90°:</strong> cos θ = 0. Kuvvet iş yapmaz. Örnek: yatay yolda yürürken elde taşınan çantaya uygulanan düşey kuvvet, çembersel harekette merkezcil kuvvet.`,
      `<strong>90° ile 180° arası:</strong> iş negatiftir; kuvvet hareketi yavaşlatır.`,
      `<strong>θ = 180°:</strong> cos θ = −1. Kuvvet harekete tam zıttır. Örnek: kayan cisme etki eden sürtünme kuvveti, yukarı atılan topa etki eden yer çekimi.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Bir sandık 10 N'luk yatay kuvvetle 5 m itiliyor. W = 10 × 5 × cos 0° = <strong>50 J</strong>.`,
      `<strong>Örnek 2:</strong> Bir kızak, yatayla 60° açı yapan iple 100 N kuvvetle 10 m çekiliyor. cos 60° = 0,5 olduğundan W = 100 × 10 × 0,5 = <strong>500 J</strong>. Kuvvetin hareket yönündeki bileşeni 50 N'dur.`,
      `<strong>Örnek 3:</strong> 50 N ağırlığındaki çanta yatay yolda 4 m taşınıyor. Taşıma kuvveti düşey, hareket yataydır; açı 90° ve W = <strong>0 J</strong>.`,
      `<strong>Örnek 4:</strong> 20 N'luk sürtünme kuvveti, 3 m kayan cisme harekete zıt yönde etki ediyor. W = 20 × 3 × cos 180° = <strong>−60 J</strong>. Bu enerji ısıya dönüşür.`,
      `<strong>Örnek 5:</strong> 10 m yol boyunca 200 J iş yapan, hareketle aynı yöndeki kuvvet F = 200 ÷ 10 = <strong>20 N</strong> büyüklüğündedir.`,
    ] },
    { h: 'İş, enerji ve güç ilişkisi', p: [
      `İş-enerji teoremine göre bir cisme etki eden <em>net</em> kuvvetin yaptığı iş, cismin kinetik enerjisindeki değişime eşittir. Durgun bir cisme sürtünmesiz ortamda 50 J net iş yapılırsa kinetik enerjisi 50 J olur. Cismi yer çekimine karşı yukarı kaldırırken yapılan iş ise potansiyel enerji olarak depolanır: 10 N ağırlığındaki cismi 2 m kaldırmak 20 J iş gerektirir.`,
      `İşin ne kadar sürede yapıldığı iş kavramının içinde yoktur; bunu <em>güç</em> anlatır. Aynı yükü aynı kata çıkaran iki asansör aynı işi yapar, daha kısa sürede çıkaranın gücü daha büyüktür.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Cisim hareket etmediği hâlde iş yapıldığını düşünmek; yer değiştirme sıfırsa iş sıfırdır.`,
      `Açıyı kuvvet ile yatay arasında değil, kuvvet ile <strong>hareket yönü</strong> arasında almak gerekir; eğik düzlem sorularında bu ikisi karışır.`,
      `Hesap makinesi radyan modundayken derece girmek.`,
      `Net kuvvetin işi ile tek bir kuvvetin işini karıştırmak; her kuvvetin işi ayrı hesaplanır, toplamı net işi verir.`,
      `Bu araç büyüklüğü ve yönü değişmeyen kuvvetler için geçerlidir. Yay kuvveti gibi yol boyunca değişen kuvvetlerde iş, kuvvet-yol grafiğinin altındaki alandan bulunur.`,
    ] },
  ],
  faq: [
    ['Fizikte iş formülü nedir?', `Sabit kuvvet için iş, kuvvet ile yer değiştirmenin ve aralarındaki açının kosinüsünün çarpımıdır: W = F · d · cos θ. Kuvvet hareketle aynı yöndeyse W = F · d olur.`],
    ['İşin birimi nedir?', `İşin SI birimi joule'dür (J). 1 joule, 1 newton metreye eşittir. Enerji ile aynı birimi kullanır, çünkü iş bir enerji aktarımıdır.`],
    ['Hangi durumlarda iş sıfırdır?', `Kuvvet sıfırsa, cisim yer değiştirmiyorsa ya da kuvvet hareket yönüne dikse iş sıfırdır. Ağır bir yükü kıpırdatmadan tutmak ya da yatay yolda taşımak fiziksel anlamda iş sayılmaz.`],
    ['İş negatif olabilir mi?', `Evet. Kuvvet ile hareket yönü arasındaki açı 90°'den büyükse iş negatiftir. Sürtünme kuvveti ve fren kuvveti negatif iş yapar; cismin enerjisini azaltır.`],
    ['Kuvvet-yol grafiğinden iş nasıl bulunur?', `Grafikte eğrinin altında kalan alan yapılan işi verir. Sabit kuvvet için bu alan bir dikdörtgendir ve F · d çarpımına eşittir; değişken kuvvetlerde üçgen ya da yamuk alanı hesaplanır.`],
    ['İş ile enerji arasındaki fark nedir?', `Enerji bir cismin sahip olduğu iş yapabilme kapasitesidir; iş ise bu enerjinin kuvvet yoluyla aktarılmasıdır. İkisi de joule ile ölçülür ve skaler büyüklüklerdir.`],
    ['Açıyı bilmiyorsam ne yazmalıyım?', `Soruda açı verilmemişse genellikle kuvvet hareketle aynı yöndedir ve açı 0 alınır. Kuvvet harekete karşıysa (sürtünme, fren) 180 yazın.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. İşlem tümüyle tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['guc-hesapla', 'kinetik-enerji-hesapla', 'potansiyel-enerji-hesapla', 'kuvvet-hesapla', 'surtunme-kuvveti-hesapla'],
};
