export default {
  slug: 'bisiklet-hiz-kadans-hesapla',
  title: 'Bisiklet Hız ve Kadans Hesaplama',
  h1Tail: 'kadans, vites ve tekerlekten hız',
  pageTitle: 'Bisiklet Hız ve Kadans Hesaplama – Vites ve Pedal Devrinden Hız',
  description: 'Pedal devri (kadans), aynakol ve arka dişli diş sayısı ile lastik ölçüsünden bisiklet hızınızı hesaplayın; hedef hız için gereken kadansı da öğrenin.',
  card: 'Kadans, vites ve lastik ölçüsünden bisiklet hızınızı; hedef hız için gereken pedal devrini hesaplayın.',
  category: 'saglik',
  keywords: ['bisiklet hız hesaplama', 'kadans hesaplama', 'bisiklet kadans nedir', 'pedal devri hız', 'vites hız hesaplama', 'rpm hız bisiklet', 'tekerlek çevresi hız'],
  lead: 'Dakikadaki pedal turunuzu (<strong>kadans</strong>), kullandığınız aynakol ve arka dişlinin diş sayısını ve lastik ölçünüzü girin; araç o viteste kaç km/sa hızla gittiğinizi hesaplasın. İsterseniz bir hedef hız yazarak aynı viteste hangi kadansla pedal çevirmeniz gerektiğini de görün.',
  button: 'Hesapla',
  inputs: [
    { id: 'kadans', label: 'Kadans (pedal turu/dakika)', type: 'number', placeholder: 'Örn. 90' },
    { id: 'on', label: 'Aynakol (ön dişli) diş sayısı', type: 'number', placeholder: 'Örn. 50' },
    { id: 'arka', label: 'Arka dişli diş sayısı', type: 'number', placeholder: 'Örn. 17' },
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
    { id: 'cevre', label: 'Ölçülen tekerlek çevresi (mm, isteğe bağlı)', type: 'number', placeholder: 'Boş bırakılırsa lastik ölçüsü kullanılır', hint: 'Kendi ölçtüğünüz çevreyi yazarsanız listedeki değer yerine bu kullanılır.' },
    { id: 'hedef', label: 'Hedef hız (km/sa, isteğe bağlı)', type: 'number', placeholder: 'Örn. 30' },
  ],
  compute(v, h) {
    const kadans = h.pos(v.kadans, 'Kadans');
    if (kadans > 250) h.err('Kadans 250 tur/dakikadan büyük olamaz; değeri kontrol edin.');
    const on = h.posint(v.on, 'Aynakol diş sayısı');
    const arka = h.posint(v.arka, 'Arka dişli diş sayısı');
    if (on > 80 || arka > 80) h.err('Diş sayısı 80\'den büyük olamaz; değerleri kontrol edin.');
    const ozel = String(v.cevre ?? '').trim();
    const cevre = ozel === '' ? Number(v.lastik || 2105) : h.pos(ozel, 'Tekerlek çevresi');
    if (cevre < 500 || cevre > 3500) h.err('Tekerlek çevresi 500 ile 3500 mm arasında olmalı (milimetre olarak yazın).');
    const oran = on / arka;
    const yol = oran * cevre / 1000;
    const hiz = (k) => k * yol * 60 / 1000;
    const rows = [
      ['Hız', h.fmt(hiz(kadans), 2) + ' km/sa'],
      ['Vites oranı', h.fmt(oran, 2)],
      ['Pedal turu başına yol', h.fmt(yol, 2) + ' m'],
      ['Tekerlek devri', h.fmt(kadans * oran, 0) + ' tur/dk'],
      ['Kullanılan tekerlek çevresi', h.fmt(cevre, 0) + ' mm'],
    ];
    const hedefHam = String(v.hedef ?? '').trim();
    if (hedefHam !== '') {
      const hedef = h.pos(hedefHam, 'Hedef hız');
      rows.push([`${h.fmt(hedef, 1)} km/sa için gereken kadans`, h.fmt(hedef * 1000 / 60 / yol, 1) + ' tur/dk']);
    }
    const satirlar = [60, 70, 80, 90, 100, 110].map((k) => `${k} tur/dk → ${h.fix(hiz(k), 1)} km/sa`);
    return {
      rows,
      text: `${on}/${arka} vitesinde kadansa göre hız:\n` + satirlar.join('\n'),
      note: 'Lastik çevreleri yaklaşık değerlerdir; lastik markası, basıncı ve sürücü ağırlığı çevreyi birkaç milimetre değiştirebilir.',
    };
  },
  cases: [
    { in: { kadans: '90', on: '50', arka: '17', lastik: '2105' }, out: { 'Hız': '33,43 km/sa', 'Vites oranı': '2,94', 'Pedal turu başına yol': '6,19 m' } },
    { in: { kadans: '80', on: '34', arka: '28', lastik: '2105' }, out: { 'Hız': '12,27 km/sa', 'Vites oranı': '1,21', 'Pedal turu başına yol': '2,56 m' } },
    { in: { kadans: '60', on: '32', arka: '32', lastik: '2288' }, out: { 'Hız': '8,24 km/sa', 'Vites oranı': '1', 'Tekerlek devri': '60 tur/dk' } },
    { in: { kadans: '100', on: '53', arka: '11', lastik: '2096' }, out: { 'Hız': '60,59 km/sa', 'Vites oranı': '4,82' } },
    { in: { kadans: '90', on: '40', arka: '20', lastik: '2105', cevre: '2000' }, out: { 'Hız': '21,6 km/sa', 'Pedal turu başına yol': '4 m', 'Kullanılan tekerlek çevresi': '2.000 mm' } },
    { in: { kadans: '90', on: '50', arka: '17', lastik: '2105', hedef: '30' }, out: { '30 km/sa için gereken kadans': '80,8 tur/dk' }, textMatch: '90 tur/dk → 33,4 km/sa' },
    { in: { kadans: '90', on: '50', arka: '0', lastik: '2105' }, error: true },
    { in: { kadans: '', on: '50', arka: '17', lastik: '2105' }, error: true },
    { in: { kadans: '90', on: '50', arka: '17', lastik: '2105', cevre: '2,1' }, error: true },
  ],
  howto: [
    'Kadansınızı yazın. Kadans sensörünüz yoksa 15 saniye boyunca sağ dizinizin kaç kez yukarı çıktığını sayıp dörtle çarpın.',
    'Kullandığınız aynakolun ve arka dişlinin diş sayısını girin; sayılar çoğu dişlinin üzerinde yazar, yazmıyorsa dişleri sayın.',
    'Lastik ölçünüzü listeden seçin. Ölçü lastiğin yanağında yazılıdır. Daha kesin sonuç için çevreyi kendiniz ölçüp isteğe bağlı alana milimetre olarak yazın.',
    'Belirli bir hıza ulaşmak için gereken pedal devrini öğrenmek istiyorsanız "Hedef hız" alanını doldurun.',
    '"Hesapla" düğmesine basın; hız, vites oranı ve 60–110 tur/dakika aralığı için hız tablosu görünür.',
  ],
  sections: [
    { h: 'Kadans nedir?', p: [
      'Kadans, pedal kolunun bir dakikada attığı tam tur sayısıdır ve tur/dakika (rpm) olarak ifade edilir. Bisiklette hızı belirleyen iki şey vardır: pedalı ne kadar hızlı çevirdiğiniz ve her pedal turunda bisikletin ne kadar yol aldığı. İkincisini vites ve tekerlek belirler. Aynı hıza ağır viteste yavaş çevirerek de, hafif viteste hızlı çevirerek de ulaşabilirsiniz; kadans bu tercihin sayısal karşılığıdır.',
      'Düşük kadans kaslara daha fazla yük bindirir, yüksek kadans ise yükü kalp ve solunum sistemine kaydırır. Bu nedenle uzun yol sürücüleri bacaklarını korumak için genellikle orta-yüksek kadansı tercih eder. Herkes için tek bir doğru değer yoktur; rahat ettiğiniz aralığı sürerek bulursunuz.',
    ] },
    { h: 'Hız formülü', p: [
      'Hesabın mantığı şudur: pedal bir tur döndüğünde arka tekerlek, ön dişlinin arka dişliye oranı kadar tur atar. Tekerleğin her turunda bisiklet tekerlek çevresi kadar ilerler. Buna göre:',
      '<strong>Hız (km/sa) = kadans × (ön diş ÷ arka diş) × tekerlek çevresi (m) × 60 ÷ 1000</strong>',
      'Çözümlü örnek: 700×25C lastikli bir yol bisikletinde 50 dişli aynakol ve 17 dişli arka dişliyle 90 kadansla sürüyorsunuz. Vites oranı 50 ÷ 17 = 2,94\'tür. Tekerlek çevresi yaklaşık 2,105 metre olduğundan her pedal turunda 2,94 × 2,105 = 6,19 metre yol alırsınız. Dakikada 90 tur 557 metre, saatte 33,43 kilometre eder.',
      'Aynı bisikletle 30 km/sa sabit hızda gitmek isterseniz hesap tersine çevrilir: 30 km/sa dakikada 500 metredir; 500 ÷ 6,19 = yaklaşık 80,8 tur/dakika çevirmeniz gerekir.',
    ] },
    { h: 'Tekerlek çevresi nasıl ölçülür?', p: [
      'Listedeki çevreler yaygın kabul gören yaklaşık değerlerdir. Aynı etiketi taşıyan iki farklı lastik arasında bile birkaç milimetre fark olabilir. En doğru yöntem "yuvarlama" ölçümüdür: lastiği normal sürüş basıncına şişirin, sibobu en alta getirip yere bir işaret koyun, bisiklete binip (ağırlığınız lastiği biraz ezer) düz bir çizgide tekerlek tam bir tur atıp sibop yeniden en alta gelene kadar ilerleyin ve ikinci işareti koyun. İki işaret arasındaki mesafe milimetre olarak tekerlek çevrenizdir.',
      'Kilometre saatlerine ve hız sensörlerine de aynı değer girilir. Çevre 20 milimetre yanlış girilirse hız yaklaşık yüzde bir sapar; 100 kilometrelik bir sürüşte bu bir kilometrelik hata demektir.',
    ] },
    { h: 'Kadans aralıkları için genel rehber', ul: [
      '<strong>60 tur/dk altı:</strong> çok ağır vites; dik yokuşta ya da kuvvet çalışmasında görülür, dizleri zorlayabilir.',
      '<strong>60–80 tur/dk:</strong> gezi ve şehir içi sürüşte yaygın, rahat tempo.',
      '<strong>80–100 tur/dk:</strong> yol bisikletinde düz yolda sık tercih edilen verimli aralık.',
      '<strong>100 tur/dk üzeri:</strong> sprint, hız çalışması ya da inişte hafif viteste kalındığında.',
    ], p: [
      'Bu aralıklar kural değil, alışkanlıklardan çıkan genel gözlemlerdir. Dağ bisikletinde zemin tutuşu, yokuşta eğim, rüzgârda direnç ideal kadansı değiştirir.',
    ] },
    { h: 'Hesabın sınırları', p: [
      'Araç, pedal çevirdiğiniz sürece zincirin arka tekerleği doğrudan döndürdüğünü varsayar. Yokuş aşağı pedal çevirmeden süzülürken (boşta) hız kadanstan bağımsızdır. İçten vitesli göbeklerde ve kayışlı sistemlerde göbeğin iç oranı ayrıca hesaba katılmalıdır; bu araç zincirli, dıştan vitesli (aktarıcılı) ya da tek vitesli bisikletler içindir.',
      'Sonuç yalnızca geometrik hızdır: o hızı tutturmak için gereken güç rüzgâra, eğime, ağırlığa ve yol yüzeyine bağlıdır. 53/11 viteste 100 kadansın 60 km/sa\'yi aşan bir hız vermesi, o hıza düz yolda çıkabileceğiniz anlamına gelmez. Trafikte hız sınırlarına ve güvenlik kurallarına uyun; kask kullanın.',
    ] },
    { h: 'Kimler kullanır?', p: [
      'Sabit vitesli (fixie) ve pist bisikleti kullananlar, pedal hiç durmadığı için hangi dişli çiftinin hangi hızda hangi kadansı gerektireceğini önceden bilmek ister. Yol bisikletçileri yeni bir kaset ya da kompakt aynakol alırken düz yoldaki seyir hızlarında rahat kadansta kalıp kalamayacaklarını hesaplar. Kapalı alanda trainer ile çalışanlar ise sensör olmadan yaklaşık hızı görmek için bu hesabı kullanır.',
    ] },
  ],
  faq: [
    ['90 kadans kaç km/sa eder?', 'Bu tamamen vitese ve tekerleğe bağlıdır. 700×25C lastikle 50/17 viteste 90 kadans yaklaşık 33,4 km/sa, 34/28 gibi hafif bir tırmanış vitesinde ise yaklaşık 13,8 km/sa eder. Kendi vitesinizi yazarak kesin değeri görebilirsiniz.'],
    ['Kadans sensörüm yok, nasıl ölçerim?', 'Sürerken bir ayağınızın pedalın en alt noktasından kaç kez geçtiğini 15 saniye boyunca sayıp dörtle çarpın. Birkaç kez tekrarlayıp ortalamasını almak daha güvenilir sonuç verir.'],
    ['İdeal kadans kaç olmalı?', 'Herkese uyan tek bir sayı yoktur. Yol bisikletinde düz zeminde 80–100 tur/dakika aralığı sık kullanılır; yeni başlayanlar genellikle daha düşük kadansta rahat eder. Diz ağrısı yaşıyorsanız daha hafif viteste daha yüksek kadans denemek çoğu zaman önerilir, ancak süren ağrıda bir hekime başvurun.'],
    ['Vites oranı ne anlama gelir?', 'Ön dişli diş sayısının arka dişli diş sayısına bölümüdür ve pedalın bir turunda arka tekerleğin kaç tur attığını gösterir. 2,94 oranı, her pedal turunda tekerleğin yaklaşık üç tur döndüğü anlamına gelir.'],
    ['Lastiğim listede yok, ne yapmalıyım?', 'Tekerlek çevresini kendiniz ölçüp "Ölçülen tekerlek çevresi" alanına milimetre olarak yazın. Bu alan doluyken listedeki seçim dikkate alınmaz.'],
    ['Kilometre saatim farklı hız gösteriyor, neden?', 'En sık neden, cihaza girilen tekerlek çevresinin gerçek çevreden farklı olmasıdır. GPS tabanlı cihazlarda ise ağaçlık ya da binalar arasında sinyal sapması hızda dalgalanmaya yol açar. Ayrıca anlık kadansınız sürüş boyunca sürekli değişir; araç tek bir sabit kadans için sonuç verir.'],
    ['Tekerlek çevresini neden milimetre yazmalıyım?', 'Bisiklet bilgisayarları çevreyi milimetre olarak ister ve lastik tablolarındaki değerler de bu birimdedir. 2,1 gibi metre cinsinden bir değer yazarsanız araç bunu geçersiz sayar; 2100 yazmalısınız.'],
    ['Girdiğim bilgiler bir yere kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['bisiklet-vites-orani-hesapla', 'bisiklet-kalori-hesapla', 'hiz-hesapla', 'kosu-temposu-hesapla', 'maksimum-nabiz-hesapla'],
};
