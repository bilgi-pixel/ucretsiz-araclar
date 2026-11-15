export default {
  slug: 'opamp-kazanc-hesapla',
  title: 'Op-Amp Kazancı Hesaplama',
  h1Tail: 'eviren ve evirmeyen yükselteç',
  pageTitle: 'Op-Amp Kazancı Hesaplama – Eviren ve Evirmeyen Yükselteç',
  description: 'Eviren ve evirmeyen op-amp devresinin gerilim kazancını, desibel karşılığını ve çıkış gerilimini direnç değerlerinden hesaplayın; doyma uyarısı alın.',
  card: 'Eviren ya da evirmeyen op-amp devresinin kazancını, dB karşılığını ve çıkış gerilimini direnç değerlerinden bulun.',
  category: 'elektrik',
  keywords: ['op-amp kazanç hesaplama', 'eviren yükselteç kazancı', 'evirmeyen yükselteç kazancı', 'opamp kazanç formülü', 'işlemsel yükselteç hesaplama', 'opamp çıkış gerilimi', 'geri besleme direnci hesaplama'],
  lead: 'Geri besleme direnci (R<sub>f</sub>) ile giriş direncini (R<sub>1</sub>) yazın; araç eviren ya da evirmeyen işlemsel yükselteç devresinin <strong>gerilim kazancını</strong>, desibel karşılığını ve isterseniz verdiğiniz giriş gerilimi için çıkış gerilimini hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'tip', label: 'Devre tipi', type: 'select', options: [['eviren', 'Eviren yükselteç'], ['evirmeyen', 'Evirmeyen yükselteç']] },
    { id: 'birim', label: 'Direnç birimi', type: 'select', options: [['k', 'kΩ'], ['o', 'Ω'], ['m', 'MΩ']] },
    { id: 'r1', label: 'Giriş direnci R1', type: 'number', placeholder: 'Örn. 10' },
    { id: 'rf', label: 'Geri besleme direnci Rf', type: 'number', placeholder: 'Örn. 100' },
    { id: 'vin', label: 'Giriş gerilimi (V, isteğe bağlı)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Boş bırakırsanız yalnızca kazanç hesaplanır.' },
    { id: 'besleme', label: 'Besleme gerilimi ± (V, isteğe bağlı)', type: 'number', placeholder: 'Örn. 12', hint: 'Çıkışın doyuma girip girmediğini denetlemek için.' },
  ],
  compute(v, h) {
    const r1 = h.pos(v.r1, 'Giriş direnci R1');
    const rf = h.nonneg(v.rf, 'Geri besleme direnci Rf');
    const eviren = v.tip !== 'evirmeyen';
    if (eviren && rf === 0) h.err('Eviren devrede Rf sıfır olursa kazanç da sıfır olur; sıfırdan büyük bir geri besleme direnci yazın.');
    const oran = rf / r1;
    const av = eviren ? -oran : 1 + oran;
    const db = 20 * Math.log10(Math.abs(av));
    const carpan = v.birim === 'o' ? 1 : v.birim === 'm' ? 1e6 : 1e3;
    const ohmYaz = (x) => (x >= 1e6 ? h.fmt(x / 1e6, 3) + ' MΩ' : x >= 1e3 ? h.fmt(x / 1e3, 3) + ' kΩ' : h.fmt(x, 2) + ' Ω');
    const rows = [
      ['Gerilim kazancı (Av)', h.fmt(av, 4)],
      ['Kazanç (dB)', h.fmt(db, 2) + ' dB'],
      ['Rf / R1 oranı', h.fmt(oran, 4)],
      ['Faz', eviren ? '180° (çıkış ters çevrilir)' : '0° (çıkış girişle aynı fazda)'],
      ['Devrenin giriş direnci', eviren ? ohmYaz(r1 * carpan) + ' (R1 kadar)' : 'Çok yüksek (op-amp girişi)'],
    ];
    let note = 'İdeal op-amp varsayılmıştır: açık çevrim kazancı sonsuz, giriş akımı sıfır. Yüksek frekansta gerçek kazanç bant genişliği nedeniyle düşer.';
    if (String(v.vin ?? '').trim() !== '') {
      const vin = h.num(v.vin, 'Giriş gerilimi');
      const vout = av * vin;
      rows.push(['Çıkış gerilimi', h.fmt(vout, 4) + ' V']);
      if (String(v.besleme ?? '').trim() !== '') {
        const vs = h.pos(v.besleme, 'Besleme gerilimi');
        if (Math.abs(vout) > vs + 1e-12) {
          rows.push(['Doyma denetimi', 'Çıkış doyuma girer (±' + h.fmt(vs, 2) + ' V sınırı aşılıyor)']);
          note = 'Hesaplanan çıkış besleme gerilimini aşıyor; gerçek devrede çıkış kırpılır. Kazancı ya da giriş genliğini düşürün.';
        } else {
          rows.push(['Doyma denetimi', 'Çıkış besleme sınırları içinde']);
        }
      }
    }
    return { rows, note };
  },
  cases: [
    { in: { tip: 'eviren', birim: 'k', r1: '10', rf: '100', vin: '0,5', besleme: '12' }, out: { 'Gerilim kazancı (Av)': '-10', 'Kazanç (dB)': '20 dB', 'Çıkış gerilimi': '-5 V', 'Doyma denetimi': 'Çıkış besleme sınırları içinde', 'Devrenin giriş direnci': '10 kΩ (R1 kadar)' } },
    { in: { tip: 'evirmeyen', birim: 'k', r1: '1', rf: '9' }, out: { 'Gerilim kazancı (Av)': '10', 'Kazanç (dB)': '20 dB', 'Rf / R1 oranı': '9' } },
    { in: { tip: 'evirmeyen', birim: 'k', r1: '10', rf: '10' }, out: { 'Gerilim kazancı (Av)': '2', 'Kazanç (dB)': '6,02 dB' } },
    { in: { tip: 'eviren', birim: 'k', r1: '10', rf: '10' }, out: { 'Gerilim kazancı (Av)': '-1', 'Kazanç (dB)': '0 dB' } },
    { in: { tip: 'evirmeyen', birim: 'o', r1: '1000', rf: '0', vin: '3,3' }, out: { 'Gerilim kazancı (Av)': '1', 'Kazanç (dB)': '0 dB', 'Çıkış gerilimi': '3,3 V' } },
    { in: { tip: 'eviren', birim: 'k', r1: '4,7', rf: '47', vin: '2', besleme: '15' }, out: { 'Gerilim kazancı (Av)': '-10', 'Çıkış gerilimi': '-20 V', 'Doyma denetimi': 'Çıkış doyuma girer (±15 V sınırı aşılıyor)' } },
    { in: { tip: 'evirmeyen', birim: 'k', r1: '1', rf: '99' }, out: { 'Gerilim kazancı (Av)': '100', 'Kazanç (dB)': '40 dB' } },
    { in: { tip: 'eviren', birim: 'k', r1: '0', rf: '100' }, error: true },
    { in: { tip: 'eviren', birim: 'k', r1: '10', rf: 'abc' }, error: true },
  ],
  howto: [
    '"Devre tipi" listesinden eviren ya da evirmeyen yükselteci seçin. Giriş sinyali eksi (−) uca bir direnç üzerinden geliyorsa eviren, doğrudan artı (+) uca geliyorsa evirmeyen devredir.',
    'Dirençlerinizin birimini seçin ve R1 ile Rf değerlerini aynı birimle yazın. İkisi de kΩ ise 10 ve 100 yazmanız yeterlidir.',
    'Çıkış gerilimini de görmek istiyorsanız giriş gerilimini volt olarak ekleyin; negatif değer yazabilirsiniz.',
    'Simetrik besleme kullanıyorsanız besleme değerini (örneğin ±12 V için 12) yazın; araç çıkışın bu sınırı aşıp aşmadığını bildirir.',
    '"Hesapla" düğmesine basın ve kazancı, desibel karşılığını, faz bilgisini ve çıkış gerilimini sonuç kutusundan okuyun.',
  ],
  sections: [
    { h: 'İşlemsel yükselteçte kazanç neden iki dirençle belirlenir?', p: [
      'İşlemsel yükselteç (op-amp), iki girişi arasındaki farkı çok büyük bir katsayıyla, tipik olarak yüz bin kat ve üzeri bir açık çevrim kazancıyla yükselten bir entegredir. Bu kazanç tek başına kullanışsızdır; çünkü birkaç mikrovoltluk fark bile çıkışı besleme sınırına dayar. Devreyi kullanılabilir kılan şey <strong>negatif geri beslemedir</strong>: çıkışın bir bölümü eksi girişe geri verilir ve yükselteç, iki girişini aynı gerilimde tutacak biçimde kendini ayarlar.',
      'Bu denge durumunda devrenin toplam kazancı, entegrenin iç özelliklerine değil neredeyse yalnızca dışarıya bağlanan iki direncin oranına bağlı olur. Dirençler ucuz, kararlı ve hassas üretilebildiği için ortaya çıkan kazanç da öngörülebilirdir. Bu sayfadaki hesap tam olarak bu oranı kullanır.',
    ] },
    { h: 'Eviren yükselteç formülü', p: [
      'Eviren devrede sinyal R<sub>1</sub> üzerinden eksi girişe uygulanır, artı giriş toprağa bağlanır ve R<sub>f</sub> çıkışı eksi girişe bağlar. Eksi giriş "sanal toprak" gibi davranır; R<sub>1</sub> üzerinden akan akımın tamamı R<sub>f</sub> üzerinden çıkışa gider. Buradan <strong>A<sub>v</sub> = −R<sub>f</sub> ÷ R<sub>1</sub></strong> bulunur. Eksi işareti çıkışın girişe göre 180 derece ters fazda olduğunu gösterir.',
      'Çözümlü örnek: R<sub>1</sub> = 10 kΩ, R<sub>f</sub> = 100 kΩ için kazanç −100 ÷ 10 = −10\'dur. Girişe 0,5 V uygularsanız çıkış −10 × 0,5 = −5 V olur. Desibel karşılığı 20 × log<sub>10</sub>(10) = 20 dB\'dir. ±12 V besleme altında −5 V rahatça üretilebilir; araç da "besleme sınırları içinde" sonucunu verir.',
      'Eviren devrede kaynağın gördüğü giriş direnci R<sub>1</sub> kadardır. Bu yüzden çıkış direnci yüksek bir sensörü küçük bir R<sub>1</sub> ile yüklemek sinyali zayıflatır; böyle durumlarda evirmeyen yapı ya da önüne bir tampon katı tercih edilir.',
    ] },
    { h: 'Evirmeyen yükselteç formülü', p: [
      'Evirmeyen devrede sinyal doğrudan artı girişe gelir. Çıkış, R<sub>f</sub> ve R<sub>1</sub>\'den oluşan bir gerilim bölücü üzerinden eksi girişe geri beslenir; R<sub>1</sub>\'in öbür ucu topraktadır. Kazanç <strong>A<sub>v</sub> = 1 + R<sub>f</sub> ÷ R<sub>1</sub></strong> olur ve işaret değişmez.',
      'Çözümlü örnek: R<sub>1</sub> = 1 kΩ, R<sub>f</sub> = 9 kΩ ise kazanç 1 + 9 = 10, yani yine 20 dB\'dir. İki direnç eşit seçilirse kazanç 2 olur; bu da 6,02 dB eder. R<sub>f</sub> yerine kısa devre (0 Ω) kullanılırsa kazanç tam 1\'e iner; bu devreye <em>gerilim izleyici</em> ya da tampon denir ve sinyali yükseltmeden yalnızca akım verme yeteneği kazandırır.',
      'Evirmeyen devrenin kazancı hiçbir zaman 1\'in altına düşemez. Sinyali zayıflatmanız gerekiyorsa ya eviren devreyi ya da girişte bir gerilim bölücüyü kullanmalısınız.',
    ] },
    { h: 'Kazancı desibel olarak okumak', p: [
      'Ses ve ölçüm devrelerinde kazanç çoğunlukla desibel ile ifade edilir. Gerilim kazancı için dönüşüm <strong>dB = 20 × log<sub>10</sub>|A<sub>v</sub>|</strong> biçimindedir. Kazancın işareti desibeli etkilemez; −10 ve +10 kazançların ikisi de 20 dB\'dir.',
    ], ul: [
      'Kazanç 1 → 0 dB',
      'Kazanç 2 → yaklaşık 6,02 dB',
      'Kazanç 10 → 20 dB',
      'Kazanç 100 → 40 dB',
      'Kazanç 1000 → 60 dB',
    ] },
    { h: 'Direnç değeri seçerken dikkat edilecekler', p: [
      'Aynı oranı sonsuz farklı direnç çiftiyle elde edebilirsiniz; ancak hepsi eşit derecede iyi değildir. Çok küçük dirençler (birkaç yüz ohm ve altı) op-amp çıkışından fazla akım çeker ve entegreyi ısıtır. Çok büyük dirençler (megaohm düzeyi) ise giriş kutuplama akımından ve kaçak kapasitelerden etkilenir, gürültüyü artırır. Genel amaçlı devrelerde 1 kΩ ile 100 kΩ arası değerler dengeli bir seçimdir.',
      'Kazancın doğruluğu dirençlerin toleransına bağlıdır. Yüzde 5 toleranslı iki dirençle kurulan devrede kazanç en kötü durumda yaklaşık yüzde 10 sapabilir. Ölçüm devrelerinde yüzde 1 ya da daha hassas metal film dirençler kullanmak bu yüzden yaygındır.',
    ] },
    { h: 'Doyma, bant genişliği ve diğer sınırlar', p: [
      'Bir op-amp çıkışı besleme geriliminin dışına çıkamaz. ±15 V ile beslenen ve kazancı −10 olan bir devreye 2 V uygularsanız kâğıt üzerindeki −20 V sonucu üretilemez; çıkış besleme sınırının biraz altında kırpılır. Araç, besleme değerini yazdığınızda bu durumu "doyuma girer" uyarısıyla bildirir. Raydan raya (rail-to-rail) olmayan entegrelerde kullanılabilir salınım beslemeden bir iki volt daha dardır; bu payı kendiniz bırakmalısınız.',
      'İkinci sınır frekanstır. Her op-amp\'ın bir kazanç-bant genişliği çarpımı vardır; kazancı ne kadar yüksek seçerseniz devrenin düzgün yükseltebildiği en yüksek frekans o oranda düşer. Yüksek kazanç gerekiyorsa tek katta 1000 kat yerine iki katta 30\'ar kat gibi bölmek daha geniş bantlı ve daha kararlı sonuç verir.',
      'Bu sayfadaki sonuçlar ideal op-amp modeline dayanır ve bilgilendirme amaçlıdır. Giriş ofset gerilimi, yükselme hızı ve gürültü gibi etkiler hesaba katılmaz; kritik tasarımlarda kullandığınız entegrenin veri sayfasına bakın ve devreyi ölçerek doğrulayın.',
    ] },
  ],
  faq: [
    ['Eviren yükselteçte kazanç neden negatif çıkıyor?', 'Negatif işaret bir hata değil, faz bilgisidir. Giriş yükselirken çıkış düşer; yani sinyal 180 derece çevrilir. Genlik olarak yükseltme miktarı Rf ÷ R1 oranıdır.'],
    ['Kazancı 1\'den küçük yapabilir miyim?', 'Eviren devrede evet: Rf değerini R1\'den küçük seçerseniz sinyal zayıflatılır. Evirmeyen devrede ise kazanç en az 1\'dir; daha düşüğü için girişe gerilim bölücü eklemeniz gerekir.'],
    ['Direnç birimi sonucu değiştirir mi?', 'Kazanç yalnızca orana bağlı olduğu için iki direnci aynı birimle yazdığınız sürece değişmez. Birim seçimi yalnızca eviren devrede gösterilen giriş direnci satırını etkiler.'],
    ['Gerilim izleyici (tampon) nasıl hesaplanır?', 'Devre tipini evirmeyen seçip Rf alanına 0 yazın. Kazanç 1, yani 0 dB çıkar. R1 bu devrede genellikle hiç takılmaz; hesap için herhangi bir pozitif değer yazabilirsiniz.'],
    ['Tek beslemeli devrede bu formüller geçerli mi?', 'Kazanç formülleri aynıdır; ancak sinyalin toprağın altına inemeyeceğini unutmayın. Tek beslemede genellikle giriş, beslemenin yarısı kadar bir referans gerilimine oturtulur ve çıkış bu referansın çevresinde salınır.'],
    ['Hesaplanan kazanç ile ölçtüğüm kazanç neden farklı?', 'En sık nedenler direnç toleransı, sinyal frekansının devrenin bant genişliğine yakın olması, çıkışın doyuma girmesi ve yük direncinin çok küçük olmasıdır. Önce düşük frekanslı küçük bir sinyalle ölçüm yapın.'],
    ['20 dB kazanç kaç kat demektir?', 'Gerilim için 20 dB tam 10 kat yükseltme anlamına gelir. Her 20 dB bir onluk çarpandır: 40 dB 100 kat, 60 dB 1000 kat eder. 6 dB ise yaklaşık 2 kattır.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; direnç ve gerilim değerleriniz hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['gerilim-bolucu-hesapla', 'desibel-hesapla', 'rc-filtre-kesim-frekansi-hesapla', 'ohm-kanunu-hesapla', 'paralel-direnc-hesapla'],
};
