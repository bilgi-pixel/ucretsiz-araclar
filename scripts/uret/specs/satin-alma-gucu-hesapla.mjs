export default {
  slug: 'satin-alma-gucu-hesapla',
  title: 'Satın Alma Gücü Kaybı Hesaplama',
  h1Tail: 'enflasyon etkisi',
  pageTitle: 'Satın Alma Gücü Kaybı Hesaplama – Enflasyon Paranızı Ne Kadar Eritir?',
  description: "Bir tutarın belirli bir enflasyon oranı ve süre sonunda satın alma gücünün ne kadar azalacağını, aynı gücü korumak için ne kadar para gerektiğini hesaplayın.",
  card: "Enflasyon oranı ve süreye göre paranızın satın alma gücü kaybını ve aynı gücü koruyan tutarı hesaplayın.",
  category: 'finans',
  keywords: ['satın alma gücü hesaplama', 'enflasyon hesaplama', 'paranın değer kaybı', 'alım gücü kaybı', 'enflasyon etkisi hesaplama', 'paranın erimesi', 'enflasyona göre para değeri'],
  lead: "Bir tutarı, yıllık enflasyon oranını ve süreyi yazın; araç o paranın süre sonunda <strong>bugünkü fiyatlarla neye karşılık geleceğini</strong>, satın alma gücünün yüzde kaç azaldığını ve aynı alım gücünü korumak için <strong>ne kadar paraya ihtiyaç duyacağınızı</strong> hesaplasın.",
  button: 'Hesapla',
  inputs: [
    { id: 'tutar', label: 'Tutar (TL)', type: 'number', placeholder: 'Örn. 100000', hint: 'Binlik ayraç kullanmayın ya da 100.000,00 biçiminde yazın.' },
    { id: 'enflasyon', label: 'Yıllık enflasyon oranı (%)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'yil', label: 'Süre (yıl)', type: 'number', value: '1', hint: 'Ondalıklı yazılabilir; 6 ay için 0,5.' },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Tutar');
    const e = h.nonneg(v.enflasyon, 'Yıllık enflasyon oranı');
    const yil = h.pos(v.yil, 'Süre');
    if (e > 100000) h.err('"Yıllık enflasyon oranı" çok yüksek; yüzde olarak yazdığınızdan emin olun (örn. 25).');
    if (yil > 100) h.err('"Süre" en fazla 100 yıl olabilir.');
    const carpan = Math.pow(1 + e / 100, yil);
    const reel = tutar / carpan;
    const kayip = tutar - reel;
    return {
      rows: [
        ['Süre sonunda bugünkü fiyatlarla değeri', h.para(reel)],
        ['Satın alma gücü kaybı', `${h.para(kayip)} (%${h.fmt(kayip / tutar * 100, 2)})`],
        ['Aynı gücü korumak için gereken tutar', h.para(tutar * carpan)],
        ['Toplam fiyat artışı', '%' + h.fmt((carpan - 1) * 100, 2)],
      ],
      note: 'Enflasyonun her yıl aynı oranda ve bileşik olarak gerçekleştiği varsayılır. Paranın bu sürede getiri sağlamadığı kabul edilir.',
    };
  },
  cases: [
    { in: { tutar: '100000', enflasyon: '25', yil: '1' }, out: { 'Süre sonunda bugünkü fiyatlarla değeri': '80.000,00 TL', 'Satın alma gücü kaybı': '20.000,00 TL (%20)', 'Aynı gücü korumak için gereken tutar': '125.000,00 TL', 'Toplam fiyat artışı': '%25' } },
    { in: { tutar: '10000', enflasyon: '10', yil: '2' }, out: { 'Süre sonunda bugünkü fiyatlarla değeri': '8.264,46 TL', 'Satın alma gücü kaybı': '1.735,54 TL (%17,36)', 'Aynı gücü korumak için gereken tutar': '12.100,00 TL', 'Toplam fiyat artışı': '%21' } },
    { in: { tutar: '1000', enflasyon: '100', yil: '1' }, out: { 'Süre sonunda bugünkü fiyatlarla değeri': '500,00 TL', 'Satın alma gücü kaybı': '500,00 TL (%50)', 'Aynı gücü korumak için gereken tutar': '2.000,00 TL' } },
    { in: { tutar: '1000', enflasyon: '50', yil: '3' }, out: { 'Süre sonunda bugünkü fiyatlarla değeri': '296,30 TL', 'Satın alma gücü kaybı': '703,70 TL (%70,37)', 'Aynı gücü korumak için gereken tutar': '3.375,00 TL', 'Toplam fiyat artışı': '%237,5' } },
    { in: { tutar: '5000', enflasyon: '0', yil: '5' }, out: { 'Süre sonunda bugünkü fiyatlarla değeri': '5.000,00 TL', 'Satın alma gücü kaybı': '0,00 TL (%0)', 'Toplam fiyat artışı': '%0' } },
    { in: { tutar: '1000', enflasyon: '44', yil: '0,5' }, out: { 'Süre sonunda bugünkü fiyatlarla değeri': '833,33 TL', 'Aynı gücü korumak için gereken tutar': '1.200,00 TL', 'Toplam fiyat artışı': '%20' } },
    { in: { tutar: '1000', enflasyon: '25', yil: '0' }, error: true },
    { in: { tutar: '', enflasyon: '25', yil: '1' }, error: true },
    { in: { tutar: '1000', enflasyon: '-5', yil: '1' }, error: true },
  ],
  howto: [
    '"Tutar" alanına değerini izlemek istediğiniz parayı yazın: birikiminiz, maaşınız, bir alacağınız ya da kira bedeli olabilir.',
    '"Yıllık enflasyon oranı" alanına yüzde olarak bir oran girin. Açıklanmış resmî oranı, kendi hissettiğiniz oranı ya da bir beklentiyi kullanabilirsiniz.',
    'Süreyi yıl olarak yazın. Bir yıldan kısa süreler için ondalıklı değer girin; örneğin 3 ay için 0,25.',
    '"Hesapla" düğmesine basın. Paranın süre sonundaki gerçek değeri, kayıp tutarı ve yüzdesi listelenir.',
    'Farklı enflasyon senaryolarını denemek için oranı değiştirip yeniden hesaplayın.',
  ],
  sections: [
    { h: 'Satın alma gücü nedir?', p: [
      "Satın alma gücü, belirli bir miktar parayla alınabilen mal ve hizmet miktarıdır. Cebinizdeki 1.000 liranın üzerindeki rakam zamanla değişmez; ancak fiyatlar yükseldikçe o 1.000 lirayla alabildikleriniz azalır. Enflasyon, fiyatların genel düzeyindeki bu sürekli artışın adıdır ve paranın satın alma gücünü aşındırır.",
      "Bu araç iki soruya yanıt verir. İlki geriye dönük ya da ileriye dönük değer sorusudur: bugün elimdeki para, belirli bir süre sonra bugünkü fiyatlarla ne kadarlık alışverişe yetecek? İkincisi koruma sorusudur: alım gücümü aynı düzeyde tutmak için o tarihte elimde ne kadar para olmalı? İlkinin yanıtı parayı enflasyon çarpanına bölerek, ikincisinin yanıtı aynı çarpanla çarparak bulunur.",
    ] },
    { h: 'Hesaplama formülü', p: [
      "Yıllık enflasyon oranı <em>e</em> ve süre <em>n</em> yıl olmak üzere fiyat düzeyi <strong>(1 + e)<sup>n</sup></strong> katına çıkar. Buna enflasyon çarpanı denir. Paranın süre sonundaki gerçek değeri <strong>tutar ÷ (1 + e)<sup>n</sup></strong>, aynı gücü korumak için gereken tutar ise <strong>tutar × (1 + e)<sup>n</sup></strong> işlemiyle hesaplanır. Satın alma gücü kaybı, başlangıç tutarı ile gerçek değer arasındaki farktır.",
      "Hesap bileşiktir: ikinci yılın enflasyonu, birinci yılda zaten yükselmiş fiyatların üzerine eklenir. Bu yüzden iki yıl üst üste yüzde 10 enflasyon toplam yüzde 20 değil yüzde 21 fiyat artışı demektir.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "<strong>Bir yıl, yüzde 25:</strong> 100.000 TL'niz var ve bir yıl boyunca hiçbir getiri sağlamadan bekliyor. Yüzde 25 enflasyonla çarpan 1,25'tir. Paranın bir yıl sonraki gerçek değeri 100.000 ÷ 1,25 = 80.000 TL olur; yani satın alma gücünüz 20.000 TL, oran olarak yüzde 20 azalmıştır. Aynı alım gücünü korumak için bir yıl sonra elinizde 100.000 × 1,25 = 125.000 TL bulunmalıdır.",
      "<strong>İki yıl, yüzde 10:</strong> 10.000 TL için çarpan 1,10 × 1,10 = 1,21'dir. Gerçek değer 10.000 ÷ 1,21 = 8.264,46 TL, kayıp 1.735,54 TL (yüzde 17,36), gereken tutar 12.100 TL'dir.",
      "<strong>Üç yıl, yüzde 50:</strong> 1.000 TL için çarpan 1,5<sup>3</sup> = 3,375'tir. Paranın gerçek değeri 296,30 TL'ye iner; alım gücünün yüzde 70,37'si yok olur. Aynı sepeti almak için 3.375 TL gerekir.",
    ] },
    { h: 'Enflasyon oranı ile kayıp oranı neden aynı değil?', p: [
      "Sık yapılan bir hata, yüzde 25 enflasyonda paranın yüzde 25 değer kaybettiğini düşünmektir. Oysa kayıp oranı <strong>e ÷ (1 + e)</strong> formülüyle bulunur ve her zaman enflasyon oranından küçüktür. Yüzde 25 enflasyon yüzde 20, yüzde 50 enflasyon yüzde 33,33, yüzde 100 enflasyon yüzde 50 kayba yol açar. Fiyatlar iki katına çıktığında paranız sıfırlanmaz, yarı yarıya azalır.",
      "Aynı mantık maaş zamları için de geçerlidir. Yüzde 25 enflasyonda alım gücünü korumak için gereken zam yüzde 25'tir; ancak zam alınmazsa kayıp yüzde 20'dir. Yüzde 20 kaybı telafi etmek için ise yüzde 20 değil yüzde 25 artış gerekir.",
    ] },
    { h: 'Hızlı başvuru: bir yıllık kayıp oranları', ul: [
      "<strong>%5</strong> enflasyon → %4,76 satın alma gücü kaybı",
      "<strong>%10</strong> enflasyon → %9,09 kayıp",
      "<strong>%20</strong> enflasyon → %16,67 kayıp",
      "<strong>%25</strong> enflasyon → %20 kayıp",
      "<strong>%50</strong> enflasyon → %33,33 kayıp",
      "<strong>%100</strong> enflasyon → %50 kayıp",
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      "Yastık altında ya da vadesiz hesapta bekleyen birikimin maliyetini görmek, birkaç yıl önce verilen bir borcun bugünkü karşılığını tahmin etmek, sabit kalan bir kira ya da maaşın reel olarak ne kadar eridiğini hesaplamak, uzun vadeli bir birikim hedefinin gelecekteki fiyatını öngörmek ve bir yatırımın getirisinin enflasyonu aşıp aşmadığını sınamak için kullanılabilir.",
      "Oran alanına ne yazacağınız size bağlıdır. Araç herhangi bir resmî enflasyon verisi içermez ve internetten veri çekmez; açıklanan oranları ilgili resmî kurumun yayınlarından alabilirsiniz. Kişisel harcama sepetiniz genel endeksten farklı olabileceği için kendi hissettiğiniz oranla da deneme yapmanız anlamlıdır.",
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      "Araç enflasyonun her yıl aynı oranda gerçekleştiğini varsayar; gerçekte oran yıldan yıla değişir. Farklı yıllar için farklı oranlarınız varsa hesabı yıl yıl zincirleyebilir, bir yılın sonucunu sonraki yılın tutarı olarak girebilirsiniz. Negatif oran, yani fiyatların düştüğü deflasyon durumu desteklenmez. Paranın bu sürede faiz ya da başka bir getiri sağlamadığı kabul edilir. Sonuçlar bilgilendirme amaçlıdır; yatırım ya da mali karar için tek başına dayanak oluşturmaz.",
    ] },
  ],
  faq: [
    ['Satın alma gücü kaybı nasıl hesaplanır?', "Tutar, (1 + enflasyon oranı) üzeri yıl sayısına bölünür; bulunan gerçek değer başlangıç tutarından çıkarılır. 100.000 TL için yüzde 25 enflasyonla bir yıllık kayıp 20.000 TL'dir."],
    ['Yüzde 25 enflasyonda param neden yüzde 20 eriyor?', "Fiyatlar 1,25 katına çıktığında aynı parayla eskisinin 1 ÷ 1,25 = 0,80'i kadar mal alınabilir. Kayıp bu yüzden yüzde 20'dir. Kayıp oranı her zaman enflasyon oranından küçüktür."],
    ['Aynı alım gücü için ne kadar zam almam gerekir?', "Enflasyon oranı kadar. Yüzde 25 enflasyonda maaşınızın alım gücünü korumak için yüzde 25 artış gerekir. Araçtaki 'Aynı gücü korumak için gereken tutar' satırı bu rakamı doğrudan verir."],
    ['Aylık enflasyonu nasıl kullanırım?', "Aylık oranı yıllığa çevirmek için (1 + aylık oran) değerinin 12. kuvvetini alıp 1 çıkarırsınız. Daha pratik bir yol olarak aylık oranı enflasyon alanına, ay sayısını da süre alanına yazabilirsiniz; hesap aynı bileşik mantıkla çalışır."],
    ['Geçmişteki bir paranın bugünkü karşılığını bulabilir miyim?', "Evet. Geçmişteki tutarı, aradan geçen yıl sayısını ve o dönemin ortalama yıllık enflasyonunu yazın. 'Aynı gücü korumak için gereken tutar' satırı, o paranın bugünkü yaklaşık karşılığını gösterir."],
    ['Param faizdeyse sonucu nasıl yorumlarım?', "Araç getiriyi hesaba katmaz. Faiz ya da başka bir getiriniz varsa süre sonundaki toplam paranızı, gereken tutarla karşılaştırın; toplamınız gereken tutarın üzerindeyse alım gücünüz artmış, altındaysa azalmıştır."],
    ['Resmî enflasyon oranını araç kendisi getiriyor mu?', "Hayır. Sayfa çevrimdışı çalışacak biçimde tasarlanmıştır ve hiçbir veri kaynağına bağlanmaz. Oranı sizin girmeniz gerekir."],
    ['Yazdığım tutarlar bir yere gönderiliyor mu?', "Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve kaydedilmez."],
  ],
  related: ['reel-faiz-hesapla', 'gelecek-deger-hesapla', 'bugunku-deger-hesapla', '72-kurali-hesapla', 'hedef-birikim-suresi-hesapla'],
};
