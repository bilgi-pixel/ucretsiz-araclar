export default {
  slug: 'su-bardagi-gram-cevir',
  title: 'Su Bardağı Gram Çevirici',
  h1Tail: 'su bardağı ↔ gram',
  pageTitle: `Su Bardağı Gram Çevirici – 1 Su Bardağı Un, Şeker Kaç Gram?`,
  description: `Su bardağı ölçüsünü grama, gramı su bardağına çevirin. Un, şeker, pirinç, bulgur, süt, yağ, bal gibi 16 malzeme için yaklaşık ağırlıkları verir.`,
  card: `Un, şeker, pirinç, süt, yağ ve daha fazlası için su bardağını grama, gramı su bardağına çevirin.`,
  category: 'birim',
  keywords: ['su bardağı kaç gram', '1 su bardağı un kaç gram', '1 su bardağı şeker kaç gram', 'su bardağı gram çevirme', '1 su bardağı pirinç kaç gram', '250 gram un kaç su bardağı', 'mutfak ölçüleri gram'],
  lead: `Tariflerdeki su bardağı ölçüsünü grama, gram değerlerini su bardağına çevirin. Bir bardağın ağırlığı içindeki malzemeye göre değiştiği için araç <strong>un, şeker, pirinç, süt, yağ, bal</strong> gibi 16 malzeme için ayrı yaklaşık değerler kullanır; bardağınızın hacmini de ayarlayabilirsiniz.`,
  button: 'Çevir',
  inputs: [
    { id: 'malzeme', label: 'Malzeme', type: 'select', options: [
      ['un', 'Un (buğday)'], ['seker', 'Toz şeker'], ['pudra', 'Pudra şekeri'], ['pirinc', 'Pirinç'], ['bulgur', 'Bulgur'],
      ['irmik', 'İrmik'], ['nisasta', 'Nişasta'], ['kakao', 'Kakao'], ['mercimek', 'Kırmızı mercimek'], ['yulaf', 'Yulaf ezmesi'],
      ['tuz', 'Tuz'], ['su', 'Su'], ['sut', 'Süt'], ['yag', 'Sıvı yağ'], ['yogurt', 'Yoğurt'], ['bal', 'Bal'],
    ] },
    { id: 'miktar', label: 'Miktar', type: 'number', placeholder: 'Örn. 2' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['bardak', 'Su bardağı → Gram'], ['gram', 'Gram → Su bardağı']] },
    { id: 'bardakMl', label: 'Su bardağı hacmi (ml)', type: 'number', value: '200', hint: 'Türk tariflerinde 200 ml yaygındır. ABD ölçüsü "cup" için yaklaşık 240 yazın.' },
  ],
  compute(v, h) {
    // 200 ml'lik silme dolu bardak için yaklaşık ağırlıklar (gram).
    const tablo = {
      un: [110, 'un'], seker: [170, 'toz şeker'], pudra: [120, 'pudra şekeri'], pirinc: [180, 'pirinç'],
      bulgur: [160, 'bulgur'], irmik: [160, 'irmik'], nisasta: [120, 'nişasta'], kakao: [100, 'kakao'],
      mercimek: [180, 'kırmızı mercimek'], yulaf: [80, 'yulaf ezmesi'], tuz: [240, 'tuz'], su: [200, 'su'],
      sut: [206, 'süt'], yag: [184, 'sıvı yağ'], yogurt: [210, 'yoğurt'], bal: [280, 'bal'],
    };
    const m = tablo[v.malzeme] || tablo.un;
    const x = h.nonneg(v.miktar, 'Miktar');
    const bardakMl = h.pos(v.bardakMl, 'Su bardağı hacmi');
    if (bardakMl < 50 || bardakMl > 500) h.err('"Su bardağı hacmi" 50 ile 500 ml arasında olmalı; tipik değer 200 ml\'dir.');
    const gMl = m[0] / 200;                 // yaklaşık yığın yoğunluğu, g/ml
    const gBardak = gMl * bardakMl;
    const gram = v.yon === 'gram' ? x : x * gBardak;
    const bardak = gram / gBardak;
    const gramSatir = ['Ağırlık', h.fmt(gram, 1) + ' g'];
    const bardakSatir = ['Su bardağı', h.fmt(bardak, 2) + ' su bardağı'];
    return {
      rows: [
        v.yon === 'gram' ? bardakSatir : gramSatir,
        v.yon === 'gram' ? gramSatir : bardakSatir,
        ['Hacim', h.fmt(bardak * bardakMl, 1) + ' ml'],
        ['1 su bardağı ağırlığı', h.fmt(gBardak, 1) + ' g'],
        ['1 yemek kaşığı (15 ml)', h.fmt(gMl * 15, 2) + ' g'],
      ],
      note: `Hesap, ${h.fmt(bardakMl, 0)} ml'lik silme dolu bir bardak ${m[1]} için yaklaşık ${h.fmt(gBardak, 1)} g kabulüne dayanır. Gerçek ağırlık malzemenin türüne, nemine ve bardağın nasıl doldurulduğuna göre değişir.`,
    };
  },
  cases: [
    { in: { malzeme: 'un', miktar: '2', yon: 'bardak' }, out: { 'Ağırlık': '220 g', 'Hacim': '400 ml', '1 su bardağı ağırlığı': '110 g' } },
    { in: { malzeme: 'seker', miktar: '1', yon: 'bardak' }, out: { 'Ağırlık': '170 g', '1 yemek kaşığı (15 ml)': '12,75 g' } },
    { in: { malzeme: 'un', miktar: '250', yon: 'gram' }, out: { 'Su bardağı': '2,27 su bardağı', 'Hacim': '454,5 ml' } },
    { in: { malzeme: 'su', miktar: '1,5', yon: 'bardak' }, out: { 'Ağırlık': '300 g', 'Hacim': '300 ml' } },
    { in: { malzeme: 'bal', miktar: '0,5', yon: 'bardak' }, out: { 'Ağırlık': '140 g' } },
    { in: { malzeme: 'pirinc', miktar: '360', yon: 'gram' }, out: { 'Su bardağı': '2 su bardağı', 'Hacim': '400 ml' } },
    { in: { malzeme: 'un', miktar: '1', yon: 'bardak', bardakMl: '250' }, out: { 'Ağırlık': '137,5 g', '1 su bardağı ağırlığı': '137,5 g' } },
    { in: { malzeme: 'sut', miktar: '1', yon: 'bardak' }, out: { 'Ağırlık': '206 g', '1 yemek kaşığı (15 ml)': '15,45 g' } },
    { in: { malzeme: 'un', miktar: 'iki', yon: 'bardak' }, error: true },
    { in: { malzeme: 'un', miktar: '2', yon: 'bardak', bardakMl: '0' }, error: true },
  ],
  howto: [
    `"Malzeme" listesinden ölçeceğiniz malzemeyi seçin; her malzemenin bir bardağı farklı ağırlıktadır.`,
    `"Miktar" alanına bardak sayısını ya da gram değerini yazın; yarım bardak için 0,5 girin.`,
    `"Çeviri yönü" listesinden su bardağından grama mı, gramdan su bardağına mı çevireceğinizi belirleyin.`,
    `Bardağınız 200 ml değilse "Su bardağı hacmi" alanını güncelleyin; ardından "Çevir" düğmesine basın.`,
    `İlk satır aradığınız karşılığı verir; alt satırlarda toplam hacim, bir bardağın ve bir yemek kaşığının yaklaşık ağırlığı yer alır.`,
  ],
  sections: [
    { h: 'Bir su bardağı neden her malzemede farklı gram gelir?', p: [
      `Su bardağı bir hacim ölçüsüdür, gram ise ağırlık. İkisini birbirine bağlayan şey malzemenin yoğunluğudur. Bir bardak su yaklaşık 200 gram gelirken aynı bardak un bunun yarısı kadar, aynı bardak bal ise neredeyse bir buçuk katı ağırlıktadır. Un taneleri arasında hava boşlukları kalır; bal ise sudan belirgin biçimde yoğundur.`,
      `Toz ve taneli malzemelerde işin içine bir de doldurma biçimi girer. Unu bardağa kaşıkla serpip üstünü sıyırmak ile bardağı un çuvalına daldırıp bastırarak doldurmak arasında onlarca gram fark oluşabilir. Bu nedenle buradaki değerler, bastırılmadan doldurulmuş ve üstü düzlenmiş (silme) bardak için <strong>yaklaşık ortalamalardır</strong>.`,
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      `Araç her malzeme için 200 ml'lik bardağın yaklaşık ağırlığını bir tabloda tutar ve bardağınızın hacmine göre oranlar: <strong>gram = bardak sayısı × bir bardağın ağırlığı</strong>. Ters yönde gram değeri bir bardağın ağırlığına bölünür.`,
      `Örnek: tarifte 2 su bardağı un yazıyor. Bir bardak un yaklaşık 110 gram kabul edildiğinde 2 × 110 = <strong>220 gram</strong> eder. Ters yönde, elinizde gramla yazılmış bir tarif var ve 250 gram un gerekiyor: 250 ÷ 110 ≈ <strong>2,27 su bardağı</strong>, yani iki bardaktan biraz fazla, yaklaşık iki tam bir çeyrek bardak.`,
      `Bardağınız 250 ml ise bir bardak un 110 × 250 ÷ 200 = 137,5 gram gelir. Bardak hacmini değiştirdiğinizde bütün sonuçlar bu oranla yeniden hesaplanır.`,
    ] },
    { h: 'Malzemelere göre 1 su bardağı (200 ml) yaklaşık kaç gram?', ul: [
      `<strong>Su:</strong> 200 g`,
      `<strong>Süt:</strong> yaklaşık 206 g`,
      `<strong>Yoğurt:</strong> yaklaşık 210 g`,
      `<strong>Sıvı yağ:</strong> yaklaşık 184 g`,
      `<strong>Bal:</strong> yaklaşık 280 g`,
      `<strong>Un:</strong> yaklaşık 110 g`,
      `<strong>Toz şeker:</strong> yaklaşık 170 g`,
      `<strong>Pudra şekeri:</strong> yaklaşık 120 g`,
      `<strong>Pirinç ve kırmızı mercimek:</strong> yaklaşık 180 g`,
      `<strong>Bulgur ve irmik:</strong> yaklaşık 160 g`,
      `<strong>Nişasta:</strong> yaklaşık 120 g`,
      `<strong>Kakao:</strong> yaklaşık 100 g`,
      `<strong>Yulaf ezmesi:</strong> yaklaşık 80 g`,
      `<strong>Tuz:</strong> yaklaşık 240 g`,
    ] },
    { h: 'Su bardağı, çay bardağı ve cup', p: [
      `Türk tariflerinde "su bardağı" denildiğinde çoğunlukla 200 ml'lik düz cam bardak kastedilir; çay bardağı bunun yaklaşık yarısı, 100 ml dolayındadır. Evlerdeki bardaklar ise standart değildir: 180 ml'lik de, 250 ml'lik de su bardağı vardır. Kendi bardağınızın hacmini öğrenmek için bardağı mutfak terazisine koyup darasını aldıktan sonra ağzına kadar suyla doldurun; okuduğunuz gram değeri yaklaşık olarak mililitre hacmidir.`,
      `Amerikan tariflerindeki "cup" ölçüsü yaklaşık 240 ml'dir ve Türk su bardağından büyüktür. Böyle bir tarifi uygularken bardak hacmi alanına 240 yazarsanız sonuçlar o ölçüye göre hesaplanır.`,
    ] },
    { h: 'Daha tutarlı sonuç için ipuçları', ul: [
      `<strong>Hamur işlerinde terazi kullanın:</strong> kek, kurabiye ve ekmek gibi oranların önemli olduğu tariflerde gramla çalışmak, bardakla ölçmekten çok daha tekrarlanabilir sonuç verir.`,
      `<strong>Unu bastırmayın:</strong> unu önce karıştırıp havalandırın, kaşıkla bardağa doldurun ve üstünü bıçak sırtıyla düzleyin.`,
      `<strong>Elenmiş un daha hafiftir:</strong> elendikten sonra ölçülen bir bardak un, elenmeden ölçülenden birkaç gram ile onlarca gram arasında daha hafif gelebilir.`,
      `<strong>Tane iriliği fark yaratır:</strong> ince bulgur ile pilavlık bulgur, baldo ile osmancık pirinç ya da kaya tuzu ile ince sofra tuzu aynı bardakta farklı ağırlık verir.`,
      `<strong>Aynı bardağı kullanın:</strong> bir tarifteki bütün malzemeleri aynı bardakla ölçerseniz gram değerleri şaşsa bile oranlar korunur.`,
    ] },
    { h: 'Sınırlar', p: [
      `Tablodaki ağırlıklar ölçülmüş kesin değerler değil, mutfakta işe yarayan yuvarlak ortalamalardır; markaya, nem oranına ve doldurma biçimine göre yüzde on ve üzeri sapma olabilir. Araç listede olmayan malzemeler için hesap yapmaz. Bardak hacmi 50 ile 500 ml arasında girilebilir. Beslenme takibi, diyet ya da ticari üretim gibi kesinlik gerektiren işlerde malzemeyi doğrudan tartın.`,
    ] },
  ],
  faq: [
    ['1 su bardağı un kaç gramdır?', `200 ml'lik silme dolu bir su bardağı un yaklaşık 110 gram kabul edilir. Unu bastırarak doldurursanız bu değer belirgin biçimde artar; elenmiş unda ise biraz düşer.`],
    ['1 su bardağı toz şeker kaç gramdır?', `200 ml'lik bir su bardağı toz şeker yaklaşık 170 gram gelir. Pudra şekeri daha hafiftir; aynı bardak yaklaşık 120 gramdır.`],
    ['1 su bardağı pirinç kaç gramdır?', `200 ml'lik bir su bardağı pirinç yaklaşık 180 gram kabul edilir. Pirincin cinsine ve tane iriliğine göre birkaç gram oynayabilir.`],
    ['1 su bardağı süt kaç gramdır?', `Süt sudan çok az yoğundur; 200 ml süt yaklaşık 206 gram gelir. Mutfak hesabında 200 gram almak da çoğu tarif için yeterlidir.`],
    ['1 su bardağı sıvı yağ kaç gramdır?', `Sıvı yağ sudan hafiftir; 200 ml sıvı yağ yaklaşık 184 gram eder. Zeytinyağı ve ayçiçek yağı arasındaki fark mutfak ölçeğinde önemsizdir.`],
    ['250 gram un kaç su bardağı eder?', `Bir bardak un 110 gram kabul edildiğinde 250 gram un yaklaşık 2,27 su bardağı, yani iki bardak ile bir çeyrek bardak kadar eder.`],
    ['Su bardağı kaç mililitredir?', `Türk tariflerinde su bardağı çoğunlukla 200 ml kabul edilir. Evinizdeki bardak farklıysa hacmini suyla tartarak ölçüp araçtaki "Su bardağı hacmi" alanına yazabilirsiniz.`],
    ['Yazdığım bilgiler bir yere gönderiliyor mu?', `Hayır. Hesap tarayıcınızda yapılır; seçtiğiniz malzeme ve girdiğiniz miktar sunucuya iletilmez, saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.`],
  ],
  related: ['tatli-kasigi-ml-cevir', 'gram-ons-cevir', 'kg-gram-cevir', 'litre-mililitre-cevir', 'firin-derece-cevir', 'makarna-porsiyon-hesapla'],
};
