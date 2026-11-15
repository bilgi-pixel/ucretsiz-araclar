export default {
  slug: 'gerilim-bolucu-hesapla',
  title: 'Gerilim Bölücü Hesaplama',
  h1Tail: 'iki dirençle çıkış gerilimi',
  pageTitle: 'Gerilim Bölücü Hesaplama – R1 ve R2 ile Çıkış Gerilimi',
  description: 'İki dirençli gerilim bölücünün çıkış gerilimini hesaplayın. Bölme oranını, dirençlerden geçen akımı, harcanan gücü ve yük bağlandığında oluşan düşüşü görün.',
  card: 'Giriş gerilimi, R1 ve R2 değerlerinden çıkış gerilimini bulun; yük direncinin etkisini de hesaplayın.',
  category: 'elektrik',
  keywords: ['gerilim bölücü hesaplama', 'voltaj bölücü', 'gerilim bölücü formülü', 'R1 R2 çıkış gerilimi', '5V 3.3V dirençle düşürme', 'voltage divider hesaplama', 'dirençle gerilim düşürme'],
  lead: 'Seri bağlı iki dirençten oluşan gerilim bölücünün <strong>çıkış gerilimini</strong> hesaplayın. Araç bölme oranını, bölücüden geçen akımı ve dirençlerde harcanan gücü de verir; çıkışa bir yük bağlayacaksanız yük direncini yazarak gerçek çıkış gerilimini görebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'giris', label: 'Giriş gerilimi (V)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'r1', label: 'R1 (üst direnç)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'r2', label: 'R2 (alt direnç)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'birim', label: 'Dirençlerin birimi', type: 'select', options: [['1000', 'Kiloohm (kΩ)'], ['1', 'Ohm (Ω)'], ['1000000', 'Megaohm (MΩ)']] },
    { id: 'yuk', label: 'Yük direnci (isteğe bağlı)', type: 'number', placeholder: 'Boş = yüksüz', hint: 'Çıkışa bağlanan devrenin direnci; R1 ve R2 ile aynı birimde yazın.' },
  ],
  compute(v, h) {
    const carpan = Number(v.birim) || 1;
    const u = h.pos(v.giris, 'Giriş gerilimi');
    const r1 = h.pos(v.r1, 'R1') * carpan;
    const r2 = h.pos(v.r2, 'R2') * carpan;
    const oran = r2 / (r1 + r2);
    const cikis = u * oran;
    const akim = u / (r1 + r2);
    const rows = [
      ['Çıkış gerilimi', h.fmt(cikis, 4) + ' V'],
      ['Bölme oranı', h.fmt(oran, 4)],
      ['R1 üzerindeki gerilim', h.fmt(u - cikis, 4) + ' V'],
      ['Bölücü akımı', h.fmt(akim * 1000, 4) + ' mA'],
      ['R1 gücü', h.fmt(akim * akim * r1 * 1000, 3) + ' mW'],
      ['R2 gücü', h.fmt(akim * akim * r2 * 1000, 3) + ' mW'],
    ];
    const yukHam = h.opt(v.yuk, null, 'Yük direnci');
    if (yukHam !== null) {
      if (!(yukHam > 0)) h.err('"Yük direnci" sıfırdan büyük olmalı; yük yoksa alanı boş bırakın.');
      const rl = yukHam * carpan;
      const alt = (r2 * rl) / (r2 + rl);
      const yuklu = (u * alt) / (r1 + alt);
      rows.push(['Yüklü çıkış gerilimi', h.fmt(yuklu, 4) + ' V']);
      rows.push(['Yük nedeniyle düşüş', '%' + h.fmt(((cikis - yuklu) / cikis) * 100, 2)]);
      rows.push(['Yük akımı', h.fmt((yuklu / rl) * 1000, 4) + ' mA']);
    }
    return { rows, note: 'Çıkış, R2 üzerinden (R1 ile R2\'nin birleştiği nokta ile şase arasından) alınır. Dirençler ideal kabul edilmiştir.' };
  },
  cases: [
    { in: { giris: '12', r1: '10', r2: '10', birim: '1000' }, out: { 'Çıkış gerilimi': '6 V', 'Bölme oranı': '0,5', 'Bölücü akımı': '0,6 mA', 'R1 gücü': '3,6 mW', 'R2 gücü': '3,6 mW' } },
    { in: { giris: '5', r1: '1', r2: '2', birim: '1000' }, out: { 'Çıkış gerilimi': '3,3333 V', 'Bölme oranı': '0,6667', 'Bölücü akımı': '1,6667 mA' } },
    { in: { giris: '9', r1: '2000', r2: '1000', birim: '1' }, out: { 'Çıkış gerilimi': '3 V', 'R1 üzerindeki gerilim': '6 V', 'Bölücü akımı': '3 mA', 'R1 gücü': '18 mW', 'R2 gücü': '9 mW' } },
    { in: { giris: '12', r1: '10', r2: '10', birim: '1000', yuk: '10' }, out: { 'Çıkış gerilimi': '6 V', 'Yüklü çıkış gerilimi': '4 V', 'Yük nedeniyle düşüş': '%33,33', 'Yük akımı': '0,4 mA' } },
    { in: { giris: '10', r1: '9', r2: '1', birim: '1000' }, out: { 'Çıkış gerilimi': '1 V', 'Bölme oranı': '0,1', 'Bölücü akımı': '1 mA' } },
    { in: { giris: '24', r1: '3', r2: '1', birim: '1000000' }, out: { 'Çıkış gerilimi': '6 V', 'Bölücü akımı': '0,006 mA' } },
    { in: { giris: '12', r1: '0', r2: '10', birim: '1000' }, error: true },
    { in: { giris: '', r1: '10', r2: '10', birim: '1000' }, error: true },
    { in: { giris: '12', r1: '10', r2: '10', birim: '1000', yuk: '-5' }, error: true },
  ],
  howto: [
    'Bölücüyü besleyen kaynağın gerilimini "Giriş gerilimi" alanına volt olarak yazın.',
    'Kaynağın artı ucuna bağlı üst direnci R1, şaseye (eksi uca) bağlı alt direnci R2 olarak girin. Çıkış bu iki direncin birleştiği noktadan alınır.',
    'Dirençlerin birimini seçin. Varsayılan kiloohm\'dur; 10 kΩ için yalnızca 10 yazmanız yeterlidir.',
    'Çıkışa bir devre bağlanacaksa onun giriş direncini "Yük direnci" alanına yazın. Yalnızca boşta çıkışı merak ediyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın; çıkış gerilimi, oran, akım ve güç değerleri listelenir.',
  ],
  sections: [
    { h: 'Gerilim bölücü nedir?', p: [
      'Gerilim bölücü, bir gerilimi daha düşük bir değere indirmek için kullanılan en basit devredir: iki direnç seri bağlanır, kaynak bu ikilinin uçlarına uygulanır, çıkış ise alttaki direncin üzerinden alınır. Seri devrede akım ortak olduğundan her direnç kendi değeriyle orantılı gerilim alır; alttaki direncin payı çıkış gerilimidir.',
      'Bölücü bir güç kaynağı değil, bir <strong>sinyal ve referans</strong> devresidir. Bir sensörün çıkışını mikrodenetleyicinin okuyabileceği aralığa indirmek, akü gerilimini analog girişten ölçmek, bir transistörün baz ya da bir karşılaştırıcının eşik gerilimini belirlemek tipik kullanım alanlarıdır. Potansiyometre de aslında oranı elle değiştirilebilen bir gerilim bölücüdür.',
    ] },
    { h: 'Gerilim bölücü formülü', p: [
      'Yüksüz çıkış gerilimi şu bağıntıyla bulunur: <strong>U<sub>çıkış</sub> = U<sub>giriş</sub> × R2 ÷ (R1 + R2)</strong>. Kesrin değeri, yani R2 ÷ (R1 + R2), bölme oranıdır ve 0 ile 1 arasındadır. Oran yalnızca dirençlerin birbirine oranına bağlıdır: 1 kΩ ile 1 kΩ da, 100 kΩ ile 100 kΩ da gerilimi yarıya böler. Farklı olan, bölücünün kaynaktan çektiği akımdır: <strong>I = U<sub>giriş</sub> ÷ (R1 + R2)</strong>.',
      'Çıkışa R<sub>y</sub> direncinde bir yük bağlandığında bu yük R2\'ye paralel gelir. Alt kolun direnci R2 × R<sub>y</sub> ÷ (R2 + R<sub>y</sub>) değerine düşer ve çıkış gerilimi azalır. Araç bu durumu "Yüklü çıkış gerilimi" satırında hesaplar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 12 V giriş, R1 = 10 kΩ, R2 = 10 kΩ. Oran 10 ÷ 20 = 0,5; çıkış 12 × 0,5 = 6 V. Akım 12 ÷ 20.000 = 0,6 mA, her dirençte harcanan güç 0,0006² × 10.000 = 3,6 mW\'tır.',
      '<strong>Örnek 2:</strong> Aynı bölücünün çıkışına 10 kΩ\'luk bir yük bağlansın. R2 ile yük paralel gelir: 10 × 10 ÷ 20 = 5 kΩ. Yeni çıkış 12 × 5 ÷ (10 + 5) = 4 V olur. Yüksüz değere göre düşüş yüzde 33,33\'tür. Bu örnek, yük direncinin bölücü dirençleriyle aynı mertebede olduğunda sonucun ne kadar saptığını gösterir.',
      '<strong>Örnek 3:</strong> 5 V\'luk bir sinyali yaklaşık 3,3 V\'a indirmek için R1 = 1 kΩ, R2 = 2 kΩ seçilirse oran 2 ÷ 3 = 0,6667, çıkış 3,3333 V olur. Akım 5 ÷ 3.000 = 1,6667 mA\'dir.',
    ] },
    { h: 'Direnç değerleri nasıl seçilir?', p: [
      'Aynı oranı veren sonsuz sayıda direnç çifti vardır; seçimi iki karşıt istek belirler. Dirençler küçük seçilirse bölücü yükten daha az etkilenir, ancak sürekli akım çeker ve pille çalışan cihazlarda enerjiyi boşa harcar. Dirençler büyük seçilirse tüketim azalır, fakat çıkış yüke ve gürültüye karşı hassaslaşır.',
      'Yaygın bir pratik kural, yük direncinin R2\'nin en az on katı olmasıdır; bu durumda yük nedeniyle sapma yaklaşık yüzde 10\'un altında kalır. Mikrodenetleyicilerin analog girişleri gibi çok yüksek dirençli yüklerde onlarca kiloohm değerinde bölücüler rahatlıkla kullanılır. Kesin değer için kullandığınız entegrenin teknik belgesindeki giriş direnci ve önerilen kaynak empedansı bilgisine bakın.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>R1 ile R2\'yi ters girmek:</strong> çıkış alttaki dirençten alınır. Dirençler yer değiştirirse 12 V\'tan 3 V yerine 9 V elde edersiniz.',
      '<strong>Bölücüyü güç kaynağı sanmak:</strong> motor, röle, LED şeridi gibi akım çeken yükler bölücüden beslenemez; gerilim çöker ve dirençler ısınır. Bu işler için regülatör ya da dönüştürücü gerekir.',
      '<strong>Yükü hesaba katmamak:</strong> kâğıt üzerinde 6 V veren bölücü, yük bağlanınca 4 V verebilir.',
      '<strong>Toleransı unutmak:</strong> yüzde 5 toleranslı dirençlerle oran birkaç puan sapabilir; ölçüm devrelerinde yüzde 1 toleranslı dirençler tercih edilir.',
      '<strong>Giriş sınırını aşmak:</strong> bölücü çıkışının, bağlandığı girişin dayanabileceği en yüksek gerilimi hiçbir koşulda aşmadığından emin olun.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Hesap doğru akım, ideal dirençler ve iç direnci ihmal edilebilir bir kaynak içindir. Alternatif akımda ve yüksek frekanslarda kaçak kapasiteler oranı değiştirir. Sonuçlar bilgilendirme amaçlıdır; şebeke gerilimini ya da tehlikeli gerilimleri dirençle bölerek ölçmeye çalışmak yalıtım sağlamadığı için risklidir. Bu tür uygulamalarda yetkili bir elektrik ya da elektronik uzmanına danışın.',
    ] },
  ],
  faq: [
    ['Gerilim bölücü formülü nedir?', 'Çıkış gerilimi, giriş geriliminin R2 ÷ (R1 + R2) oranıyla çarpımıdır. R2, çıkışın alındığı alt dirençtir.'],
    ['Gerilimi tam yarıya bölmek için hangi dirençler gerekir?', 'Birbirine eşit iki direnç yeterlidir. 10 kΩ ile 10 kΩ, 12 V\'u 6 V\'a böler; değerlerin kendisi değil eşit olmaları önemlidir.'],
    ['5 V\'u 3,3 V\'a dirençle düşürebilir miyim?', 'Sinyal hatları için evet: R1 = 1 kΩ, R2 = 2 kΩ yaklaşık 3,33 V verir. Ancak bir devreyi beslemek için bu yöntem uygun değildir; besleme için regülatör kullanılır.'],
    ['Yük bağlayınca çıkış gerilimi neden düşüyor?', 'Yük, alt dirence paralel bağlanmış olur ve alt kolun toplam direncini küçültür. Oran değiştiği için çıkış gerilimi azalır.'],
    ['Dirençleri büyük mü küçük mü seçmeliyim?', 'Küçük dirençler yüke karşı daha kararlıdır ama fazla akım çeker; büyük dirençler az tüketir ama yükten ve gürültüden etkilenir. Yük direncinin R2\'nin en az on katı olması iyi bir başlangıç ölçütüdür.'],
    ['Bölücüyle gerilim yükseltilebilir mi?', 'Hayır. Bölme oranı her zaman 1\'den küçüktür; çıkış girişten büyük olamaz.'],
    ['İstediğim çıkış için R2\'yi nasıl bulurum?', 'R1 belliyse R2 = R1 × U<sub>çıkış</sub> ÷ (U<sub>giriş</sub> − U<sub>çıkış</sub>) bağıntısını kullanın. 12 V\'tan 3 V için R1 = 30 kΩ seçildiyse R2 = 30 × 3 ÷ 9 = 10 kΩ olur.'],
    ['Değerlerim bir yere kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; yazdıklarınız sunucuya gönderilmez.'],
  ],
  related: ['seri-direnc-hesapla', 'paralel-direnc-hesapla', 'ohm-kanunu-hesapla', 'led-direnc-hesapla', 'direnc-renk-kodu-hesapla'],
};
