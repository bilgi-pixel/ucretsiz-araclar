export default {
  slug: 'fire-orani-hesapla',
  title: 'Fire Oranı Hesaplama',
  h1Tail: 'fire, verim ve brüt ihtiyaç',
  pageTitle: 'Fire Oranı Hesaplama – Fire Yüzdesi, Verim ve Brüt Miktar',
  description: 'Kullanılan miktar ile fire ya da net çıktıdan fire oranını ve verimi hesaplayın; fire maliyetini, net birim maliyeti ve hedef için gereken brüt miktarı bulun.',
  card: 'Giren miktar ve fireden fire oranını, verimi, fire maliyetini ve hedef net miktar için gereken brüt miktarı hesaplayın.',
  category: 'finans',
  keywords: ['fire oranı hesaplama', 'fire yüzdesi hesaplama', 'fire payı hesaplama', 'fire nasıl hesaplanır', 'üretim firesi', 'randıman hesaplama', 'fireli miktar hesaplama', 'fire maliyeti'],
  lead: 'Üretimde, mutfakta ya da şantiyede kullandığınız malzemenin yüzde kaçının kaybolduğunu hesaplayın. Araç <strong>fire oranını</strong> ve verimi bulur; birim maliyet ve hedef miktar girerseniz firenin parasal karşılığını ve sipariş edilmesi gereken brüt miktarı da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'giren', label: 'Giren (kullanılan) miktar', type: 'number', placeholder: 'Örn. 1000', hint: 'kg, metre, adet, litre; hangi birimi kullanırsanız sonuç o birimdedir.' },
    { id: 'tur', label: 'İkinci değer neyi gösteriyor?', type: 'select', options: [['fire', 'Fire (kayıp) miktarı'], ['net', 'Net (sağlam) çıktı miktarı']] },
    { id: 'miktar', label: 'Fire ya da net miktar', type: 'number', placeholder: 'Örn. 50' },
    { id: 'birimMaliyet', label: 'Birim alış maliyeti (TL)', type: 'number', placeholder: 'İsteğe bağlı, örn. 20', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
    { id: 'hedef', label: 'Hedef net miktar', type: 'number', placeholder: 'İsteğe bağlı, örn. 950', hint: 'Bu kadar net ürün için ne kadar malzeme gerektiğini hesaplar.' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const giren = h.pos(v.giren, 'Giren miktar');
    const m = h.nonneg(v.miktar, v.tur === 'net' ? 'Net miktar' : 'Fire miktarı');
    if (m > giren + 1e-9) h.err(v.tur === 'net' ? 'Net çıktı giren miktardan büyük olamaz. Değerleri aynı birimde yazdığınızdan emin olun.' : 'Fire miktarı giren miktardan büyük olamaz. Değerleri aynı birimde yazdığınızdan emin olun.');
    const fire = v.tur === 'net' ? giren - m : m;
    const net = giren - fire;
    const rows = [
      ['Fire oranı', '%' + h.fmt(fire / giren * 100, 2)],
      ['Fire miktarı', h.fmt(fire, 3)],
      ['Net (kullanılabilir) miktar', h.fmt(net, 3)],
      ['Verim (randıman)', '%' + h.fmt(net / giren * 100, 2)],
    ];
    const netVar = net > 1e-12;
    if (netVar) rows.push(['Nete eklenecek fire payı', '%' + h.fmt(fire / net * 100, 2)]);
    if (dolu(v.birimMaliyet)) {
      const bm = h.pos(v.birimMaliyet, 'Birim alış maliyeti');
      rows.push(['Fire maliyeti', h.para(fire * bm)]);
      if (netVar) rows.push(['Net birim maliyet', h.para(giren * bm / net)]);
    }
    if (dolu(v.hedef)) {
      const hedef = h.pos(v.hedef, 'Hedef net miktar');
      if (!netVar) h.err('Fire oranı %100 olduğu için hedef miktara ulaşmak mümkün değil; fire ya da net miktarı kontrol edin.');
      rows.push(['Hedef için gereken brüt miktar', h.fmt(hedef * giren / net, 3)]);
    }
    return {
      rows,
      note: 'Fire oranı giren miktara göre hesaplanır. Net miktardan brüt ihtiyaca giderken "nete eklenecek fire payı" kullanılır; bu oran her zaman fire oranından büyüktür.',
    };
  },
  cases: [
    { in: { giren: '1000', tur: 'fire', miktar: '50', birimMaliyet: '20', hedef: '950' }, out: { 'Fire oranı': '%5', 'Fire miktarı': '50', 'Net (kullanılabilir) miktar': '950', 'Verim (randıman)': '%95', 'Nete eklenecek fire payı': '%5,26', 'Fire maliyeti': '1.000,00 TL', 'Net birim maliyet': '21,05 TL', 'Hedef için gereken brüt miktar': '1.000' } },
    { in: { giren: '250', tur: 'net', miktar: '200' }, out: { 'Fire oranı': '%20', 'Fire miktarı': '50', 'Net (kullanılabilir) miktar': '200', 'Verim (randıman)': '%80', 'Nete eklenecek fire payı': '%25' } },
    { in: { giren: '80', tur: 'fire', miktar: '0' }, out: { 'Fire oranı': '%0', 'Net (kullanılabilir) miktar': '80', 'Verim (randıman)': '%100' } },
    { in: { giren: '12,5', tur: 'fire', miktar: '1,25' }, out: { 'Fire oranı': '%10', 'Net (kullanılabilir) miktar': '11,25', 'Verim (randıman)': '%90' } },
    { in: { giren: '500', tur: 'net', miktar: '465', hedef: '1860' }, out: { 'Fire oranı': '%7', 'Fire miktarı': '35', 'Hedef için gereken brüt miktar': '2.000' } },
    { in: { giren: '100', tur: 'fire', miktar: '100', birimMaliyet: '3,5' }, out: { 'Fire oranı': '%100', 'Net (kullanılabilir) miktar': '0', 'Verim (randıman)': '%0', 'Fire maliyeti': '350,00 TL' } },
    { in: { giren: '3', tur: 'fire', miktar: '1' }, out: { 'Fire oranı': '%33,33', 'Nete eklenecek fire payı': '%50' } },
    { in: { giren: '1000', tur: 'fire', miktar: '1200' }, error: true },
    { in: { giren: '0', tur: 'fire', miktar: '0' }, error: true },
    { in: { giren: '1000', tur: 'net', miktar: 'elli' }, error: true },
  ],
  howto: [
    '"Giren miktar" alanına işleme soktuğunuz toplam malzemeyi yazın: kesime giren kumaş metresi, temizlenmeden önceki sebze kilosu, şantiyeye gelen seramik metrekaresi gibi.',
    'İkinci değerin ne olduğunu seçin. Çöpe giden kısmı tarttıysanız "Fire miktarı", elinizde kalan sağlam ürünü ölçtüyseniz "Net çıktı miktarı" seçeneğini kullanın.',
    'Fire ya da net miktarı giren miktarla aynı birimde yazın.',
    'Firenin parasal karşılığını görmek için birim alış maliyetini, belirli bir net miktar için ne kadar malzeme almanız gerektiğini görmek için hedef net miktarı girin.',
    '"Hesapla" düğmesine basın ve fire oranı, verim, fire maliyeti ile gereken brüt miktarı sonuç kutusundan okuyun.',
  ],
  sections: [
    { h: 'Fire nedir, fire oranı nasıl hesaplanır?', p: [
      'Fire; üretim, işleme, taşıma ya da depolama sırasında kaybolan, bozulan, kırpıntıya dönüşen ya da kullanılamaz hâle gelen malzeme miktarıdır. Kumaş kesiminde kalıpların arasında kalan parçalar, sebzenin ayıklanan kabuğu ve sapı, kesilirken kırılan seramik, kurutma sırasında buharlaşan su, torna tezgâhındaki talaş birer firedir.',
      'Fire oranı, kaybolan miktarın işleme giren toplam miktara bölünmesiyle bulunur: <strong>Fire oranı = Fire miktarı ÷ Giren miktar × 100</strong>. Bunun tamamlayıcısı verimdir (randıman): <strong>Verim = Net miktar ÷ Giren miktar × 100</strong>. İki oranın toplamı her zaman %100 eder.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir konfeksiyon atölyesi kesime 1.000 metre kumaş sokmuş, 50 metre kırpıntı ve hatalı parça çıkmış olsun. Fire oranı 50 ÷ 1.000 = %5, net kullanılan kumaş 950 metre, verim %95\'tir. Kumaşın metresi 20 TL ise firenin maliyeti 50 × 20 = 1.000 TL\'dir.',
      'Daha önemlisi, kullanılabilir kumaşın gerçek maliyeti artmıştır: 1.000 metreye 20.000 TL ödenmiş ama yalnızca 950 metre ürüne dönüşmüştür. Net birim maliyet 20.000 ÷ 950 = 21,05 TL olur. Ürün maliyetini 20 TL üzerinden hesaplayan bir işletme, her metrede yaklaşık 1 TL\'yi gözden kaçırır.',
    ] },
    { h: 'Brüt ihtiyaç hesabında en sık yapılan hata', p: [
      'Net ihtiyaca fire oranı kadar ekleme yapmak yaygın ama hatalı bir alışkanlıktır. %20 firesi olan bir sebzeden 200 kg temizlenmiş ürün gerekiyorsa, 200\'ün üzerine %20 ekleyip 240 kg almak yetmez: 240 kg\'ın %20\'si olan 48 kg fire çıkar ve elde 192 kg kalır.',
      'Doğru hesap bölmeyle yapılır: <strong>Brüt miktar = Net ihtiyaç ÷ (1 − Fire oranı)</strong>. Örnekte 200 ÷ 0,80 = 250 kg gerekir. Araç bu farkı "Nete eklenecek fire payı" satırıyla gösterir: giren miktara göre %20 olan fire, net miktara göre %25\'tir. Yani net ihtiyacın üzerine %25 eklemek gerekir. Fire oranı küçükken iki oran birbirine yakındır (%5 fire için %5,26), oran büyüdükçe fark hızla açılır.',
    ] },
    { h: 'Hangi alanlarda kullanılır?', ul: [
      '<strong>Tekstil ve konfeksiyon:</strong> Pastal planına göre kesim firesi, hatalı top ve dikim hatası ayrı ayrı izlenir.',
      '<strong>Restoran ve mutfak:</strong> Et, balık ve sebzede temizleme ile pişirme kaybı porsiyon maliyetini doğrudan belirler.',
      '<strong>İnşaat ve tadilat:</strong> Seramik, parke, duvar kâğıdı ve alçıpan alırken kesim payı için fazladan malzeme hesaplanır; çapraz döşeme düz döşemeye göre daha fazla fire verir.',
      '<strong>Metal, ahşap ve plastik imalatı:</strong> Levha ve profilden parça keserken kalan artıklar ile talaş kaybı.',
      '<strong>Perakende ve depo:</strong> Son kullanma tarihi geçen, kırılan ya da kaybolan ürünler stok firesi olarak izlenir.',
      '<strong>Kuyumculuk ve döküm:</strong> Eritme ve işleme sırasında oluşan ağırlık kaybı.',
    ] },
    { h: 'Normal fire ve anormal fire', p: [
      'Her sürecin doğası gereği kaçınılmaz olan bir kayıp vardır; bu normal fire olarak kabul edilir ve ürün maliyetinin parçası sayılır. Makine arızası, hatalı ayar, dikkatsizlik ya da kötü depolama yüzünden bunun üzerinde oluşan kayıp ise anormal firedir ve ayrıca incelenmesi gerekir. Kendi geçmiş ortalamanızı bilmek, hangi günün ya da hangi partinin olağan dışı olduğunu görmenizi sağlar.',
      'Firenin muhasebe ve vergi açısından nasıl değerlendirileceği, hangi oranların kabul edildiği sektöre ve ürüne göre değişebilir ve ilgili kurumların düzenlemelerine tabidir. Bu konuda güncel mevzuatı kontrol edin ve mali müşavirinize danışın; bu araç yalnızca aritmetik hesabı yapar.',
    ] },
    { h: 'Fireyi azaltmak için pratik öneriler', ul: [
      'Fireyi düzenli tartın ve kaydedin; ölçülmeyen kayıp azaltılamaz.',
      'Kesim planlarını optimize edin: parçaları levha ya da kumaş üzerine yerleştirme düzeni çoğu zaman en büyük tasarruf kaynağıdır.',
      'Hammadde kalitesini tedarikçi bazında izleyin; ucuz malzemenin yüksek firesi net birim maliyeti pahalı hâle getirebilir.',
      'Artıkları değerlendirin: kırpıntıdan küçük parça üretmek, sebze artıklarını et suyu ve sosta kullanmak, metal talaşını hurda olarak satmak gibi.',
      'İlk giren ilk çıkar düzeniyle depolayın; bozulma kaynaklı fire büyük ölçüde stok yönetimi sorunudur.',
    ] },
  ],
  faq: [
    ['Fire oranı nasıl hesaplanır?', 'Fire miktarı giren toplam miktara bölünür ve 100 ile çarpılır. 1.000 metre kumaştan 50 metre fire çıkıyorsa oran 50 ÷ 1.000 × 100 = %5\'tir.'],
    ['Fire miktarını bilmiyorum ama net çıktıyı biliyorum, hesaplayabilir miyim?', 'Evet. Listeden "Net çıktı miktarı" seçeneğini işaretleyin ve sağlam ürün miktarını yazın. Araç fireyi giren miktardan net miktarı çıkararak bulur.'],
    ['%10 fireyle 100 birim net ürün için ne kadar malzeme gerekir?', '100 ÷ (1 − 0,10) = 111,11 birim gerekir. 100\'ün üzerine %10 ekleyip 110 birim alırsanız 11 birim fire çıkar ve elinizde 99 birim kalır; hedefin altında kalırsınız.'],
    ['Fire oranı ile verim arasındaki ilişki nedir?', 'Birbirinin tamamlayıcısıdır; toplamları %100 eder. Fire oranı %7 ise verim %93\'tür. Gıda ve tarım ürünlerinde aynı kavram için randıman sözcüğü kullanılır.'],
    ['"Nete eklenecek fire payı" neden fire oranından büyük?', 'Çünkü paydası farklıdır. Fire oranı kaybı giren miktara, bu oran ise net miktara böler. 250 kg\'dan 50 kg fire çıkıyorsa fire oranı %20, net 200 kg\'a göre fire payı ise %25\'tir.'],
    ['Net birim maliyet ne anlama gelir?', 'Toplam malzeme harcamasının yalnızca kullanılabilir miktara bölünmüş hâlidir. Kilosu 20 TL olan malzemenin %5\'i fire oluyorsa, işe yarayan her kilonun gerçek maliyeti 21,05 TL\'dir. Ürün maliyeti ve fiyat hesabında bu değer kullanılmalıdır.'],
    ['Farklı birimlerle çalışabilir miyim?', 'Araç birimden bağımsızdır; kilogram, metre, metrekare, litre ya da adet kullanabilirsiniz. Tek koşul, giren miktar ile fire ya da net miktarın aynı birimde yazılmasıdır.'],
    ['Yazdığım üretim verileri bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; miktar ve maliyet bilgileriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['verimlilik-orani-hesapla', 'birim-maliyet-hesapla', 'yuzde-hesapla', 'stok-devir-hizi-hesapla', 'kar-zarar-hesapla', 'emniyet-stogu-hesapla'],
};
