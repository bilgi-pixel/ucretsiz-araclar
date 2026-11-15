export default {
  slug: 'volt-milivolt-cevir',
  title: 'Volt Milivolt Çevirici',
  h1Tail: 'V ↔ mV',
  pageTitle: 'Volt Milivolt Çevirici – V, mV, µV ve kV Hesaplama',
  description: 'Voltu milivolta, milivoltu volta çevirin. 1 V = 1.000 mV eşitliğiyle çalışır; mikrovolt ve kilovolt karşılığını, direnç yazarsanız Ohm kanunuyla akımı da hesaplar.',
  card: 'Volt, milivolt, mikrovolt ve kilovolt arasında çeviri yapın; pil, sensör ve şebeke gerilimlerini aynı birimde görün.',
  category: 'birim',
  keywords: ['volt milivolt çevirme', '1 volt kaç milivolt', 'mV kaç volt', 'milivolt volt', 'kilovolt volt', 'mikrovolt milivolt', 'gerilim birimleri', 'mV V dönüşümü'],
  lead: 'Multimetrede okuduğunuz milivolt değerini volta, pil üzerindeki volt değerini milivolta çevirin. Eşitlik sabittir: <strong>1 volt = 1.000 milivolt</strong>. Araç aynı gerilimi mikrovolt ve kilovolt olarak da verir; bir direnç değeri yazarsanız o dirençten geçecek akımı Ohm kanunuyla hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Gerilim değeri', type: 'number', placeholder: 'Örn. 3,7', hint: 'Negatif gerilim yazabilirsiniz (örn. -0,7).' },
    { id: 'birim', label: 'Gerilimin birimi', type: 'select', options: [['v', 'Volt (V)'], ['mv', 'Milivolt (mV)'], ['uv', 'Mikrovolt (µV)'], ['kv', 'Kilovolt (kV)']] },
    { id: 'direnc', label: 'Direnç (ohm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 470', hint: 'Boş bırakılabilir. Yazarsanız akım (I = V ÷ R) hesaplanır.' },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Gerilim değeri');
    const kat = { v: 1, mv: 1e-3, uv: 1e-6, kv: 1e3 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const volt = x * k;
    const s = {
      v: ['Volt', h.sig(volt, 9) + ' V'],
      mv: ['Milivolt', h.sig(volt * 1e3, 9) + ' mV'],
      uv: ['Mikrovolt', h.sig(volt * 1e6, 9) + ' µV'],
      kv: ['Kilovolt', h.sig(volt / 1e3, 9) + ' kV'],
    };
    const sira = v.birim === 'v' ? ['mv', 'uv', 'kv'] : ['v', 'mv', 'uv', 'kv'];
    const rows = sira.filter((b) => b !== v.birim).map((b) => s[b]);
    const r = h.opt(v.direnc, null, 'Direnç');
    if (r !== null) {
      if (!(r > 0)) h.err('"Direnç" sıfırdan büyük olmalı ya da boş bırakılmalı.');
      const i = Math.abs(volt) / r;
      rows.push(['Akım', h.sig(i, 6) + ' A']);
      rows.push(['Akım (miliamper)', h.sig(i * 1000, 6) + ' mA']);
    }
    return {
      rows,
      note: r !== null
        ? 'Akım, Ohm kanunuyla (I = V ÷ R) ve gerilimin mutlak değeri üzerinden hesaplandı; yalnızca omik dirençler için geçerlidir.'
        : '1 V = 1.000 mV = 1.000.000 µV; 1 kV = 1.000 V.',
    };
  },
  cases: [
    { in: { deger: '1,5', birim: 'v' }, out: { 'Milivolt': '1.500 mV', 'Mikrovolt': '1.500.000 µV', 'Kilovolt': '0,0015 kV' } },
    { in: { deger: '250', birim: 'mv' }, out: { 'Volt': '0,25 V', 'Mikrovolt': '250.000 µV' } },
    { in: { deger: '34,5', birim: 'kv' }, out: { 'Volt': '34.500 V', 'Milivolt': '34.500.000 mV' } },
    { in: { deger: '5', birim: 'v', direnc: '250' }, out: { 'Milivolt': '5.000 mV', 'Akım': '0,02 A', 'Akım (miliamper)': '20 mA' } },
    { in: { deger: '800', birim: 'uv' }, out: { 'Volt': '0,0008 V', 'Milivolt': '0,8 mV' } },
    { in: { deger: '12', birim: 'v', direnc: '470' }, out: { 'Akım': '0,0255319 A', 'Akım (miliamper)': '25,5319 mA' } },
    { in: { deger: '4200', birim: 'mv' }, out: { 'Volt': '4,2 V', 'Kilovolt': '0,0042 kV' } },
    { in: { deger: '0', birim: 'v' }, out: { 'Milivolt': '0 mV' } },
    { in: { deger: 'yüksek', birim: 'v' }, error: true },
    { in: { deger: '', birim: 'mv' }, error: true },
    { in: { deger: '5', birim: 'v', direnc: '0' }, error: true },
  ],
  howto: [
    '"Gerilim değeri" alanına sayıyı yazın. Ondalık için virgül kullanabilir, gerekirse başına eksi işareti koyabilirsiniz.',
    '"Gerilimin birimi" listesinden değerin volt, milivolt, mikrovolt ya da kilovolt olduğunu seçin.',
    'Bu gerilimin bir dirençten geçireceği akımı öğrenmek istiyorsanız direnci ohm olarak üçüncü alana yazın; istemiyorsanız boş bırakın.',
    '"Çevir" düğmesine basın. Gerilimin diğer birimlerdeki karşılığı, varsa amper ve miliamper cinsinden akım listelenir.',
    'Sonucu kopyalayıp ölçüm tablonuza, laboratuvar raporunuza ya da proje notlarınıza ekleyin.',
  ],
  sections: [
    { h: 'Volt ve milivolt nedir?', p: [
      'Volt, elektriksel potansiyel farkının, gündelik adıyla gerilimin birimidir. İki nokta arasındaki gerilim, yükleri bir noktadan diğerine iten "elektriksel basınç" olarak düşünülebilir. Simgesi V\'dir. Bir kalem pilin uçları arasında yaklaşık 1,5 volt, bir otomobil aküsünde 12 volt, ev prizinde ise 230 volt dolayında gerilim bulunur.',
      'Milivolt, voltun binde biridir ve mV olarak yazılır. Sensörlerin, termokuplların, ses sinyallerinin ve biyolojik ölçümlerin ürettiği gerilimler çoğunlukla voltun çok altında kaldığı için bu alanlarda milivolt ve hatta mikrovolt kullanılır. Öte yandan enerji iletiminde gerilimler binlerce voltu bulur ve kilovoltla ifade edilir.',
    ] },
    { h: 'Çevirme kuralı', p: [
      'Volttan milivolta geçmek için değeri 1.000 ile çarparsınız: <strong>mV = V × 1.000</strong>. Milivolttan volta geçmek için 1.000\'e bölersiniz: <strong>V = mV ÷ 1.000</strong>. Pratikte bu, virgülü üç basamak sağa ya da sola kaydırmak demektir.',
      'Diğer ön ekler aynı düzeni izler: mikrovolt (µV) voltun milyonda biri, kilovolt (kV) voltun bin katıdır. Buna göre 1 mV = 1.000 µV, 1 kV = 1.000 V = 1.000.000 mV eder. Megavolt (MV) ise bir milyon volttur ve yalnızca çok özel yüksek gerilim uygulamalarında karşınıza çıkar; küçük m ile büyük M harfini karıştırmamak gerekir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Yeni bir kalem pil 1,5 volt ölçülüyor. 1,5 × 1.000 = 1.500 mV. Aynı değer 1.500.000 µV ve 0,0015 kV\'dir.',
      '<strong>Örnek 2:</strong> Bir sensör çıkışı 250 mV. 250 ÷ 1.000 = 0,25 V. Mikrodenetleyicinin analog girişi volt cinsinden tanımlıysa hesaplarda 0,25 değeri kullanılır.',
      '<strong>Örnek 3:</strong> Tam dolu bir lityum iyon hücrenin gerilimi batarya yönetim devresinde 4.200 mV olarak raporlanıyor. 4.200 ÷ 1.000 = 4,2 V.',
      '<strong>Örnek 4:</strong> Orta gerilim dağıtım hattı 34,5 kV. 34,5 × 1.000 = 34.500 V; milivolt olarak 34.500.000 mV.',
      '<strong>Örnek 5 – Ohm kanunu:</strong> 5 voltluk kaynağa 250 ohmluk direnç bağlanırsa akım I = V ÷ R = 5 ÷ 250 = 0,02 A, yani 20 mA olur. 12 volt ve 470 ohm için 12 ÷ 470 = 0,0255319 A, yaklaşık 25,53 mA çıkar.',
    ] },
    { h: 'Hangi büyüklükte gerilim nerede görülür?', ul: [
      '<strong>Mikrovolt düzeyi:</strong> anten sinyalleri, hassas ölçüm köprüleri, bazı biyolojik sinyaller.',
      '<strong>Milivolt düzeyi:</strong> termokupl çıkışları, yük hücreleri, mikrofon sinyalleri, şönt direnç üzerindeki gerilim düşümü.',
      '<strong>Birkaç volt:</strong> kalem pil (1,5 V), lityum iyon hücre (yaklaşık 3,7 V), USB beslemesi (5 V).',
      '<strong>Onlarca volt:</strong> otomobil aküsü (12 V), kamyon ve otobüs sistemleri (24 V), güvenlik kamerası ve otomasyon beslemeleri.',
      '<strong>Yüzlerce volt:</strong> ev ve iş yeri şebekesi (230 V faz-nötr, 400 V faz-faz).',
      '<strong>Kilovolt düzeyi:</strong> orta gerilim dağıtım hatları ve yüksek gerilim iletim hatları.',
    ] },
    { h: 'Multimetrede kademe seçimi', p: [
      'Elle kademe seçilen multimetrelerde gerilim ölçümü için 200 mV, 2 V, 20 V, 200 V gibi basamaklar bulunur. Doğru okuma için ölçeceğiniz gerilimden büyük en küçük kademeyi seçersiniz: 1,5 voltluk pili 2 V kademesinde, 12 voltluk aküyü 20 V kademesinde ölçmek en iyi çözünürlüğü verir. 200 mV kademesinde ekranda görülen 152,4 değeri milivolttur; volta çevirmek için 1.000\'e bölüp 0,1524 V elde edersiniz.',
      'Otomatik kademeli cihazlarda ekranın köşesindeki mV ya da V göstergesine dikkat edin. Aynı sayının birimi kademe değiştikçe değişir ve ölçüm kaydederken en sık yapılan hata birimi yazmayı unutmaktır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'mV (milivolt) ile MV (megavolt) simgelerini karıştırmak. Aralarında bir milyar kat fark vardır.',
      'Gerilim ile akımı aynı şey sanmak. Volt itici kuvveti, amper akan yük miktarını anlatır; ikisi Ohm kanunuyla birbirine bağlıdır.',
      'Milivolt değerini doğrudan formüle koymak. Ohm kanunu ve güç formüllerinde gerilim volt cinsinden olmalıdır.',
      'Doğru akım ve alternatif akım kademelerini karıştırmak. Şebeke gerilimi AC, pil gerilimi DC kademesinde ölçülür.',
      'Negatif okumayı arıza saymak. Eksi işareti çoğu zaman yalnızca ölçüm uçlarının ters tutulduğunu gösterir.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'Düşük gerilimler genellikle güvenli kabul edilse de şebeke gerilimi ve üzeri ölümcül olabilir; kilovolt düzeyindeki hatlara yaklaşmak bile tehlikelidir. Bu sayfa yalnızca birim çevirir ve basit Ohm kanunu hesabı yapar; sonuçlar bilgilendirme amaçlıdır. Şebekeye bağlı devrelerde ölçüm ve onarım için yetkili bir elektrikçiden ya da elektrik mühendisinden destek alın, ölçü aletinizin gerilim sınıfının işe uygun olduğundan emin olun.',
    ] },
  ],
  faq: [
    ['1 volt kaç milivolttur?', '1 volt 1.000 milivolttur. Volt değerini 1.000 ile çarparak milivolta çevirirsiniz; örneğin 3,3 V = 3.300 mV.'],
    ['1 milivolt kaç volttur?', '1 milivolt 0,001 volttur. Milivolt değerini 1.000\'e bölerek volta çevirirsiniz; örneğin 750 mV = 0,75 V.'],
    ['1 kilovolt kaç volttur?', '1 kilovolt 1.000 volttur. Enerji dağıtım ve iletim hatlarının gerilimi kilovoltla ifade edilir; örneğin 34,5 kV, 34.500 volt demektir.'],
    ['Mikrovolt nedir?', 'Mikrovolt (µV), voltun milyonda biri ve milivoltun binde biridir. Çok zayıf sinyallerin ölçüldüğü hassas elektronik ve tıbbi cihazlarda kullanılır.'],
    ['Negatif gerilim ne anlama gelir?', 'Gerilim iki nokta arasındaki farktır; işareti hangi noktanın referans alındığına bağlıdır. Multimetrede eksi değer görmek çoğunlukla probların ters bağlandığını gösterir. Bazı devrelerde ise toprağa göre gerçekten negatif besleme hatları bulunur.'],
    ['Volttan amper nasıl hesaplanır?', 'Yalnızca volt değeriyle amper bulunamaz; direnç ya da güç bilgisinin de bilinmesi gerekir. Direnç biliniyorsa Ohm kanunu uygulanır: akım, gerilimin dirence bölümüdür. Bu sayfada direnç alanını doldurursanız akım hesaplanır.'],
    ['Pil geriliminin milivolt olarak verilmesinin nedeni nedir?', 'Batarya yönetim devreleri hücre gerilimini hassas izlemek için tam sayı milivolt değerleriyle çalışır. 3.700 mV yazımı, 3,7 V ile aynıdır ve ondalık virgül kullanmadan küçük değişimleri göstermeyi kolaylaştırır.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri ve akım hesabı tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['amper-miliamper-cevir', 'ohm-kiloohm-cevir', 'ohm-kanunu-hesapla', 'elektrik-gucu-hesapla', 'kw-watt-cevir', 'direnc-renk-kodu-hesapla'],
};
