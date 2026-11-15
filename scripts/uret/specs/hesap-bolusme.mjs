export default {
  slug: 'hesap-bolusme',
  title: 'Hesap Bölüşme (Adisyon Paylaşma)',
  h1Tail: 'kişi başı ne kadar düşer?',
  pageTitle: 'Hesap Bölüşme – Adisyonu Kişi Başı Paylaştırma Hesaplama',
  description: 'Restoran hesabını kişi sayısına bölün; bahşişi ekleyin, kişiye özel ekstraları ayırın ve payları 1, 5 ya da 10 TL\'ye yuvarlayın. Kişi başı ödemeyi anında görün.',
  card: 'Adisyonu kişi sayısına bölün; bahşiş ekleyin, kişiye özel ekstraları ayırın, payları yuvarlayın.',
  category: 'finans',
  keywords: ['hesap bölüşme', 'adisyon paylaşma', 'kişi başı hesap hesaplama', 'alman usulü hesap', 'hesap bölme', 'restoran hesabı paylaşma', 'kişi başı ne kadar düşer'],
  lead: `Masaya gelen hesabı arkadaşlarınız arasında adil biçimde paylaştırın. Toplam tutarı ve kişi sayısını yazın; araç kişi başı ödemeyi hesaplar. İsterseniz bahşiş ekleyebilir, yalnızca bir kişinin aldığı ekstraları ortak hesaptan ayırabilir ve payları yuvarlak rakamlara tamamlayabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'toplam', label: 'Hesap toplamı (TL)', type: 'number', placeholder: 'Örn. 1800', hint: 'Binlik ayraç kullanmayın ya da 1.800,00 biçiminde yazın.' },
    { id: 'kisi', label: 'Kişi sayısı', type: 'number', placeholder: 'Örn. 4' },
    { id: 'bahsis', label: 'Bahşiş oranı (%)', type: 'number', value: '0' },
    { id: 'ozel', label: 'Kişiye özel ekstralar (isteğe bağlı)', type: 'text', placeholder: 'Örn. 200 100', hint: 'Yalnızca bir kişiye ait tutarları boşlukla ayırarak yazın; her sayı ayrı bir kişinin ekstrasıdır ve hesap toplamına dahildir.', wide: true },
    { id: 'yuvarla', label: 'Payları yuvarla', type: 'select', options: [['yok', 'Yuvarlama yok (kuruşlu)'], ['1', 'Bir üst tam liraya'], ['5', '5 TL\'nin katına yukarı'], ['10', '10 TL\'nin katına yukarı']] },
  ],
  compute(v, h) {
    const toplam = h.pos(v.toplam, 'Hesap toplamı');
    const kisi = h.posint(v.kisi, 'Kişi sayısı');
    const bahsis = h.nonneg(h.opt(v.bahsis, 0, 'Bahşiş oranı'), 'Bahşiş oranı');
    const ekstra = String(v.ozel ?? '').trim() === '' ? [] : h.nums(v.ozel, 'Kişiye özel ekstralar');
    if (ekstra.some((e) => e < 0)) h.err('"Kişiye özel ekstralar" negatif olamaz.');
    if (ekstra.length > kisi) h.err(`Ekstra sayısı (${ekstra.length}) kişi sayısından (${kisi}) fazla olamaz; her sayı ayrı bir kişiye aittir.`);
    const ekstraToplam = ekstra.reduce((a, b) => a + b, 0);
    if (ekstraToplam > toplam + 1e-9) h.err('Ekstraların toplamı hesap toplamını aşıyor; ekstralar hesap toplamının içinde olmalı.');
    const adim = { 1: 1, 5: 5, 10: 10 }[v.yuvarla] || 0;
    const yuvarla = (x) => (adim ? Math.ceil(x / adim - 1e-9) * adim : Math.round(x * 100) / 100);
    const carpan = 1 + bahsis / 100;
    const ortak = toplam - ekstraToplam;
    const taban = yuvarla(ortak / kisi * carpan);
    const ozelPaylar = ekstra.map((e) => yuvarla((ortak / kisi + e) * carpan));
    const toplanan = ozelPaylar.reduce((a, b) => a + b, 0) + taban * (kisi - ekstra.length);
    const hedef = toplam * carpan;
    const rows = [
      ['Kişi başı ödeme', h.para(taban)],
      ['Bahşiş dahil toplam', h.para(hedef)],
      ['Bahşiş tutarı', h.para(hedef - toplam)],
      ['Eşit bölünen ortak tutar', h.para(ortak)],
      ['Toplanan tutar', h.para(toplanan)],
      ['Yuvarlama farkı', h.para(toplanan - hedef)],
    ];
    const sonuc = { rows };
    if (ekstra.length) {
      const satirlar = ekstra.map((e, i) => `${i + 1}. kişi: ${h.para(ozelPaylar[i])} (ekstra ${h.para(e)} dahil)`);
      const kalan = kisi - ekstra.length;
      if (kalan > 0) satirlar.push(`Diğer ${kalan} kişi: ${h.para(taban)}`);
      sonuc.text = satirlar.join('\n');
      sonuc.note = '"Kişi başı ödeme" ekstrası olmayan kişilerin payıdır; ekstrası olanların ödeyeceği tutar aşağıdaki listede yer alır.';
    } else {
      sonuc.note = adim
        ? 'Paylar yukarı yuvarlandığı için toplanan tutar hesabı biraz aşar; fark masada bahşişe eklenebilir.'
        : 'Kuruş yuvarlaması nedeniyle toplanan tutar ile hesap arasında birkaç kuruşluk fark oluşabilir.';
    }
    return sonuc;
  },
  cases: [
    { in: { toplam: '1800', kisi: '4', bahsis: '0', yuvarla: 'yok' }, out: { 'Kişi başı ödeme': '450,00 TL', 'Toplanan tutar': '1.800,00 TL', 'Yuvarlama farkı': '0,00 TL' } },
    { in: { toplam: '2000', kisi: '5', bahsis: '10', yuvarla: 'yok' }, out: { 'Kişi başı ödeme': '440,00 TL', 'Bahşiş dahil toplam': '2.200,00 TL', 'Bahşiş tutarı': '200,00 TL' } },
    { in: { toplam: '1250', kisi: '3', bahsis: '0', yuvarla: 'yok' }, out: { 'Kişi başı ödeme': '416,67 TL', 'Toplanan tutar': '1.250,01 TL', 'Yuvarlama farkı': '0,01 TL' } },
    { in: { toplam: '1250', kisi: '3', bahsis: '0', yuvarla: '10' }, out: { 'Kişi başı ödeme': '420,00 TL', 'Toplanan tutar': '1.260,00 TL', 'Yuvarlama farkı': '10,00 TL' } },
    { in: { toplam: '1000', kisi: '4', bahsis: '0', ozel: '200 100', yuvarla: 'yok' }, out: { 'Kişi başı ödeme': '175,00 TL', 'Eşit bölünen ortak tutar': '700,00 TL', 'Toplanan tutar': '1.000,00 TL' }, textMatch: '1\\. kişi: 375,00 TL[\\s\\S]*2\\. kişi: 275,00 TL[\\s\\S]*Diğer 2 kişi: 175,00 TL' },
    { in: { toplam: '900', kisi: '3', bahsis: '10', ozel: '150', yuvarla: 'yok' }, out: { 'Kişi başı ödeme': '275,00 TL', 'Bahşiş dahil toplam': '990,00 TL', 'Toplanan tutar': '990,00 TL' }, textMatch: '1\\. kişi: 440,00 TL \\(ekstra 150,00 TL dahil\\)' },
    { in: { toplam: '500', kisi: '1' }, out: { 'Kişi başı ödeme': '500,00 TL' } },
    { in: { toplam: '1800', kisi: '0' }, error: true },
    { in: { toplam: '1000', kisi: '4', ozel: '600 600' }, error: true },
    { in: { toplam: '1000', kisi: '2', ozel: '100 100 100' }, error: true },
  ],
  howto: [
    `Adisyonun en altındaki toplam tutarı "Hesap toplamı" alanına, masadaki kişi sayısını "Kişi sayısı" alanına yazın.`,
    `Bahşiş bırakacaksanız oranını yüzde olarak girin; bırakmayacaksanız 0 olarak kalsın.`,
    `Yalnızca bir kişinin aldığı pahalı kalemler varsa (ayrı bir içecek, tatlı, ek porsiyon) bunların tutarını "Kişiye özel ekstralar" alanına boşlukla ayırarak yazın. Her sayı farklı bir kişiye yazılır.`,
    `Bozuk parayla uğraşmak istemiyorsanız payların bir üst tam liraya, 5 TL'ye ya da 10 TL'ye yuvarlanmasını seçin.`,
    `"Hesapla" düğmesine basın. İlk satır kişi başı ödemeyi verir; ekstra girdiyseniz kimin ne ödeyeceği ayrı bir listede görünür.`,
  ],
  sections: [
    { h: 'Hesabı bölüşmenin üç yolu', p: [
      `Kalabalık bir masada hesap geldiğinde genellikle üç yöntemden biri seçilir. İlki <strong>eşit bölüşme</strong>dir: toplam, kişi sayısına bölünür ve herkes aynı tutarı öder. En hızlı yoldur ve herkes benzer şeyler yediğinde kimseyi rahatsız etmez. İkincisi halk arasında "Alman usulü" denen yöntemdir: herkes yalnızca kendi yediğini ve içtiğini öder. Adildir ama adisyonu satır satır ayırmak zaman alır.`,
      `Üçüncü yol ikisinin karışımıdır ve bu aracın "kişiye özel ekstralar" alanı tam olarak bunun içindir: ortak yenen mezeler, ana yemekler ve servis eşit bölünür; yalnızca bir kişinin aldığı pahalı kalemler o kişinin payına eklenir. Böylece hem hesap makinesiyle uzun uzun uğraşılmaz hem de kimse başkasının ekstra siparişini ödemek zorunda kalmaz.`,
    ] },
    { h: 'Hesap mantığı', p: [
      `Eşit bölüşmede formül tektir: <strong>kişi başı ödeme = hesap toplamı × (1 + bahşiş oranı ÷ 100) ÷ kişi sayısı</strong>. Ekstra girildiğinde önce ekstraların toplamı hesaptan çıkarılır ve kalan ortak tutar kişi sayısına bölünür. Ekstrası olan kişinin payı, ortak payına kendi ekstrasının eklenmesiyle bulunur. Bahşiş oranı her kişinin kendi payına uygulanır; yani daha çok harcayan, bahşişe de orantılı olarak daha çok katılır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Eşit bölüşme:</strong> Dört arkadaş 1.800 TL'lik hesabı paylaşıyor. 1.800 ÷ 4 = 450,00 TL kişi başı düşer.`,
      `<strong>Bahşişli bölüşme:</strong> Beş kişilik masada hesap 2.000 TL, bahşiş %10 olsun. Bahşiş 200,00 TL, toplam 2.200,00 TL eder; 2.200 ÷ 5 = 440,00 TL kişi başı ödenir.`,
      `<strong>Tam bölünmeyen hesap:</strong> Üç kişi 1.250 TL'yi paylaştığında 1.250 ÷ 3 = 416,666… çıkar. Kuruşa yuvarlanınca herkes 416,67 TL öder, toplanan tutar 1.250,01 TL olur; aradaki 1 kuruş yuvarlama farkıdır. Aynı hesapta "10 TL'nin katına yukarı" seçilirse herkes 420,00 TL verir, 1.260,00 TL toplanır ve 10,00 TL'lik fark bahşiş olarak masada kalır.`,
      `<strong>Ekstralı bölüşme:</strong> Dört kişilik 1.000 TL'lik hesapta bir kişi 200 TL'lik, bir başkası 100 TL'lik ayrı içecek almış olsun. Alana "200 100" yazılır. Ortak tutar 1.000 − 300 = 700,00 TL, kişi başı ortak pay 175,00 TL'dir. Birinci kişi 175 + 200 = 375,00 TL, ikinci kişi 175 + 100 = 275,00 TL, diğer iki kişi 175,00 TL öder. Dört payın toplamı yine 1.000,00 TL eder.`,
    ] },
    { h: 'Yuvarlama ne işe yarar?', p: [
      `Nakit toplanan masalarda kuruşlu paylar işi zorlaştırır. Yuvarlama seçenekleri her kişinin payını seçilen adımın bir üst katına tamamlar. Yuvarlama her zaman yukarı doğrudur; böylece toplanan para hesabı hiçbir zaman eksik bırakmaz. "Yuvarlama farkı" satırı, toplanan tutarın hesabı ne kadar aştığını gösterir. Bu fazlalık çoğu masada bahşişe eklenir; istenirse hesabı ödeyen kişiye iade de edilebilir.`,
      `Herkes mobil bankacılıkla tek bir kişiye gönderim yapacaksa yuvarlamaya gerek yoktur; "Yuvarlama yok" seçeneği payları kuruşuna kadar verir.`,
    ] },
    { h: 'Pratik ipuçları', ul: [
      `Hesabı tek bir kişi kartıyla ödeyip diğerleri ona gönderim yapacaksa, kişi başı tutarı sonuç kutusundan kopyalayıp grup sohbetine yapıştırmak karışıklığı önler.`,
      `Adisyonda servis ya da kuver bedeli ayrı bir satır olarak yer alıyorsa bu tutar zaten hesap toplamına dahildir; ayrıca eklemeyin.`,
      `Alkol almayan ya da geç gelip yalnızca bir içecek içen biri varsa, diğerlerinin pahalı kalemlerini ekstra olarak yazmak yerine o kişiyi kişi sayısından çıkarıp kendi tutarını ayrı ödetmek daha kolay olabilir.`,
      `Ekstra alanına yazdığınız tutarlar hesap toplamının içinde olmalıdır. Toplam 1.000 TL ise ve ekstralar 300 TL ise araç kalan 700 TL'yi eşit böler.`,
      `Çocuklar için yarım pay gibi özel oranlar gerekiyorsa çocuğun yediklerini ekstra olarak ebeveynine yazıp kişi sayısına çocuğu dahil etmeyebilirsiniz.`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç en fazla kişi sayısı kadar ekstra kabul eder ve her ekstrayı ayrı bir kişiye yazar; aynı kişinin birden çok ekstrası varsa bunları toplayıp tek sayı olarak girin. Kimin kime borçlu olduğunu çıkaran, farklı kişilerin farklı harcamaları önceden ödediği durumlar için ortak gider paylaşımı aracı daha uygundur. Sonuçlar bilgilendirme amaçlıdır ve iki ondalık basamakla gösterilir.`,
    ] },
  ],
  faq: [
    ['Hesap kişi başı nasıl bölünür?', `Hesap toplamı kişi sayısına bölünür. 1.800 TL'lik hesap dört kişi için 450 TL eder. Bahşiş eklenecekse önce toplam bahşiş oranı kadar artırılır, sonra bölünür.`],
    ['Alman usulü ne demek?', `Herkesin yalnızca kendi yediğini ve içtiğini ödediği bölüşme biçimine halk arasında Alman usulü denir. Bu araçta tam Alman usulü yerine, ortak kalemlerin eşit bölünüp kişisel ekstraların sahibine yazıldığı karma yöntemi kullanabilirsiniz.`],
    ['Kişiye özel ekstralar alanına ne yazmalıyım?', `Yalnızca tek bir kişinin tükettiği ve diğerlerinin ödemesini istemediğiniz kalemlerin tutarını yazın. "200 100" yazarsanız bir kişiye 200 TL, başka bir kişiye 100 TL ekstra yazılır ve geri kalan tutar herkese eşit bölünür.`],
    ['Bahşiş kişiler arasında nasıl dağıtılıyor?', `Bahşiş oranı her kişinin kendi payına uygulanır. Ekstra yoksa herkes eşit bahşiş öder; ekstrası olan kişi, payı daha yüksek olduğu için bahşişe de biraz daha fazla katılır.`],
    ['Toplanan tutar neden hesaptan fazla çıkıyor?', `Paylar kuruşa ya da seçtiğiniz adıma yuvarlandığı için toplamları hesabı birkaç kuruş ya da birkaç lira aşabilir. Aradaki fark "Yuvarlama farkı" satırında gösterilir.`],
    ['Tek kişi için de kullanabilir miyim?', `Evet, kişi sayısını 1 yazarsanız araç hesabın tamamını ve varsa bahşişli toplamı gösterir; ancak tek kişilik bahşiş hesabı için bahşiş hesaplama aracı daha ayrıntılı sonuç verir.`],
    ['Herkes farklı tutar ödediyse kim kime borçlu, nasıl bulurum?', `Bu araç tek bir hesabın paylaştırılması içindir. Tatil ya da ev giderleri gibi farklı kişilerin farklı ödemeler yaptığı durumlarda ortak gider paylaşımı aracını kullanın; kimin kime ne kadar göndermesi gerektiğini listeler.`],
    ['Hesap bilgilerim bir yere gönderiliyor mu?', `Hayır. Tüm hesaplama tarayıcınızda gerçekleşir; yazdığınız tutarlar sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['bahsis-hesapla', 'ortak-gider-paylasimi', 'birim-fiyat-karsilastir', 'butce-50-30-20-hesapla', 'iskonto-hesapla'],
};
