export default {
  slug: 'borc-ozkaynak-orani-hesapla',
  title: 'Borç/Özkaynak Oranı Hesaplama',
  h1Tail: 'finansal kaldıraç',
  pageTitle: 'Borç/Özkaynak Oranı Hesaplama – Kaldıraç ve Özkaynak Oranı',
  description: 'Kısa ve uzun vadeli borçlar ile özkaynak tutarından borç/özkaynak oranını, kaldıraç oranını, özkaynak oranını ve özkaynak çarpanını tek adımda hesaplayın.',
  card: 'Toplam borç ve özkaynaktan borç/özkaynak oranını, kaldıraç oranını ve özkaynak çarpanını hesaplayın.',
  category: 'finans',
  keywords: ['borç özkaynak oranı hesaplama', 'borç özkaynak oranı formülü', 'kaldıraç oranı hesaplama', 'finansal kaldıraç', 'özkaynak oranı hesaplama', 'borçluluk oranı', 'özkaynak çarpanı'],
  lead: `Bilançonuzdaki kısa ve uzun vadeli yabancı kaynakları ve özkaynak toplamını yazın; araç <strong>borç/özkaynak oranını</strong>, varlıkların ne kadarının borçla finanse edildiğini gösteren kaldıraç oranını ve özkaynak çarpanını hesaplasın.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kisa', label: 'Kısa vadeli yabancı kaynaklar', type: 'number', placeholder: 'Örn. 300000' },
    { id: 'uzun', label: 'Uzun vadeli yabancı kaynaklar', type: 'number', placeholder: 'Örn. 200000', hint: 'Yoksa 0 yazın ya da boş bırakın.' },
    { id: 'ozkaynak', label: 'Özkaynaklar', type: 'number', placeholder: 'Örn. 500000' },
  ],
  compute(v, h) {
    const kisa = h.nonneg(v.kisa, 'Kısa vadeli yabancı kaynaklar');
    const uzun = h.opt(v.uzun, 0, 'Uzun vadeli yabancı kaynaklar');
    if (uzun < 0) h.err('"Uzun vadeli yabancı kaynaklar" negatif olamaz.');
    const oz = h.num(v.ozkaynak, 'Özkaynaklar');
    if (oz < 0) h.err('Özkaynak negatif: işletmenin borçları varlıklarını aşmış durumda (borca batıklık). Bu durumda borç/özkaynak oranı anlamlı biçimde yorumlanamaz.');
    if (oz === 0) h.err('Özkaynak sıfır olduğunda oran hesaplanamaz (sıfıra bölme). Özkaynak tutarını kontrol edin.');
    const borc = kisa + uzun;
    const varlik = borc + oz;
    const oran = borc / oz;
    const yorum = oran <= 1 + 1e-9 ? 'Borçlar özkaynağı aşmıyor' : oran <= 2 + 1e-9 ? 'Borçlar özkaynağın üzerinde; kaldıraç orta-yüksek' : 'Borçlar özkaynağın iki katından fazla; kaldıraç yüksek';
    return {
      rows: [
        ['Borç/Özkaynak oranı', h.fmt(oran, 2)],
        ['Toplam borç', h.para(borc)],
        ['Toplam kaynak (pasif)', h.para(varlik)],
        ['Kaldıraç oranı (borç ÷ toplam kaynak)', '%' + h.fmt((borc / varlik) * 100, 2)],
        ['Özkaynak oranı', '%' + h.fmt((oz / varlik) * 100, 2)],
        ['Özkaynak çarpanı', h.fmt(varlik / oz, 2)],
        ['Kısa vadeli borcun toplam borçtaki payı', borc > 0 ? '%' + h.fmt((kisa / borc) * 100, 2) : '—'],
        ['Değerlendirme', yorum],
      ],
      note: 'Toplam kaynak, toplam varlıklara (aktif toplamına) eşittir. Değerlendirme genel bir kılavuzdur; uygun borçluluk düzeyi sektöre göre değişir.',
    };
  },
  cases: [
    { in: { kisa: '300000', uzun: '200000', ozkaynak: '500000' }, out: { 'Borç/Özkaynak oranı': '1', 'Toplam borç': '500.000,00 TL', 'Kaldıraç oranı (borç ÷ toplam kaynak)': '%50', 'Özkaynak çarpanı': '2', 'Kısa vadeli borcun toplam borçtaki payı': '%60' } },
    { in: { kisa: '600000', uzun: '', ozkaynak: '400000' }, out: { 'Borç/Özkaynak oranı': '1,5', 'Kaldıraç oranı (borç ÷ toplam kaynak)': '%60', 'Özkaynak oranı': '%40', 'Özkaynak çarpanı': '2,5' } },
    { in: { kisa: '100000', uzun: '100000', ozkaynak: '800000' }, out: { 'Borç/Özkaynak oranı': '0,25', 'Kaldıraç oranı (borç ÷ toplam kaynak)': '%20', 'Özkaynak çarpanı': '1,25', 'Değerlendirme': 'Borçlar özkaynağı aşmıyor' } },
    { in: { kisa: '450000', uzun: '300000', ozkaynak: '250000' }, out: { 'Borç/Özkaynak oranı': '3', 'Kaldıraç oranı (borç ÷ toplam kaynak)': '%75', 'Özkaynak çarpanı': '4', 'Değerlendirme': 'Borçlar özkaynağın iki katından fazla; kaldıraç yüksek' } },
    { in: { kisa: '0', uzun: '0', ozkaynak: '100000' }, out: { 'Borç/Özkaynak oranı': '0', 'Özkaynak oranı': '%100', 'Kısa vadeli borcun toplam borçtaki payı': '—' } },
    { in: { kisa: '1250000', uzun: '750000', ozkaynak: '1600000' }, out: { 'Borç/Özkaynak oranı': '1,25', 'Toplam kaynak (pasif)': '3.600.000,00 TL', 'Kaldıraç oranı (borç ÷ toplam kaynak)': '%55,56', 'Özkaynak çarpanı': '2,25' } },
    { in: { kisa: '300000', uzun: '200000', ozkaynak: '0' }, error: true },
    { in: { kisa: '300000', uzun: '200000', ozkaynak: '-50000' }, error: true },
    { in: { kisa: '', uzun: '200000', ozkaynak: '500000' }, error: true },
  ],
  howto: [
    `Bilançonuzun pasif tarafındaki "Kısa Vadeli Yabancı Kaynaklar" toplamını ilk alana yazın.`,
    `"Uzun Vadeli Yabancı Kaynaklar" toplamını ikinci alana girin; uzun vadeli borcunuz yoksa boş bırakabilirsiniz.`,
    `"Özkaynaklar" grubunun toplamını üçüncü alana yazın. Geçmiş yıl zararları düşülmüş net tutarı kullanın.`,
    `"Hesapla" düğmesine basın. Borç/özkaynak oranı ilk satırda; kaldıraç oranı, özkaynak oranı ve özkaynak çarpanı altında görünür.`,
  ],
  sections: [
    { h: 'Borç/özkaynak oranı nedir?', p: [
      `Borç/özkaynak oranı, bir işletmenin faaliyetlerini ne ölçüde başkalarının parasıyla, ne ölçüde ortakların koyduğu ve işletmede bıraktığı kaynakla finanse ettiğini gösteren mali yapı oranıdır. Formülü şöyledir: <strong>Borç/Özkaynak oranı = Toplam yabancı kaynaklar ÷ Özkaynaklar</strong>. Toplam yabancı kaynaklar, kısa ve uzun vadeli borçların toplamıdır.`,
      `Oran 1 ise işletme her 1 liralık özkaynağa karşılık 1 lira borç kullanıyor demektir. 0,5 ise borç özkaynağın yarısı kadardır; 3 ise ortakların koyduğu her liraya karşılık alacaklılar 3 lira koymuştur. Oran yükseldikçe işletmenin alacaklılara bağımlılığı ve faiz yükü artar; kredi verenler açısından risk büyür.`,
    ] },
    { h: 'Aynı bilgiyi veren diğer oranlar', p: [
      `Bilançonun temel eşitliği gereği varlıklar, borçlar ile özkaynağın toplamına eşittir. Bu yüzden borç/özkaynak oranı bilindiğinde aşağıdaki oranlar da ondan türetilebilir; araç hepsini birlikte verir.`,
    ], ul: [
      `<strong>Kaldıraç oranı</strong> = Toplam borç ÷ Toplam kaynak. Varlıkların yüzde kaçının borçla finanse edildiğini gösterir. Borç/özkaynak oranı 1 ise kaldıraç oranı %50'dir.`,
      `<strong>Özkaynak oranı</strong> = Özkaynak ÷ Toplam kaynak. Kaldıraç oranını 100'e tamamlar.`,
      `<strong>Özkaynak çarpanı</strong> = Toplam kaynak ÷ Özkaynak = 1 + Borç/Özkaynak oranı. Kârlılık analizinde, aktif kârlılığından özkaynak kârlılığına geçerken kullanılır.`,
      `<strong>Kısa vadeli borç payı</strong> = Kısa vadeli borç ÷ Toplam borç. Borcun ne kadarının bir yıl içinde ödenmesi gerektiğini gösterir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Bir imalat işletmesinin bilançosunda kısa vadeli yabancı kaynaklar 300.000 lira, uzun vadeli yabancı kaynaklar 200.000 lira, özkaynaklar 500.000 lira olsun.`,
    ], ol: [
      `Toplam borç: 300.000 + 200.000 = 500.000 lira.`,
      `Borç/özkaynak oranı: 500.000 ÷ 500.000 = 1.`,
      `Toplam kaynak: 500.000 + 500.000 = 1.000.000 lira; bu aynı zamanda aktif toplamıdır.`,
      `Kaldıraç oranı: 500.000 ÷ 1.000.000 = %50. Özkaynak oranı da %50'dir.`,
      `Özkaynak çarpanı: 1.000.000 ÷ 500.000 = 2.`,
      `Kısa vadeli borç payı: 300.000 ÷ 500.000 = %60. Borcun yarıdan fazlası bir yıl içinde ödenecektir; bu yapı, oran makul olsa bile nakit akışını zorlayabilir.`,
    ] },
    { h: 'Oran nasıl yorumlanır?', p: [
      `Finans literatüründe borç/özkaynak oranının 1'i aşmaması, yani borçların özkaynaktan fazla olmaması ihtiyatlı bir ölçü olarak anılır. Uygulamada ise birçok sektör bunun üzerinde çalışır. Enerji, altyapı, havacılık, inşaat gibi sermaye yoğun ve uzun vadeli yatırım gerektiren alanlarda yüksek borçluluk olağandır. Bankaların mali yapısı ise bambaşkadır ve bu oranla değerlendirilmez. Hizmet ve yazılım gibi varlık ihtiyacı düşük işlerde oran çoğunlukla düşük kalır.`,
      `Borç kullanmak kendi başına kötü değildir. Borcun maliyeti, o parayla yapılan yatırımın getirisinden düşükse kaldıraç ortakların kârlılığını artırır. Tersine, satışlar düştüğünde faiz ve anapara ödemeleri sabit kaldığı için yüksek kaldıraç zararı da büyütür. Dolayısıyla oran, getiri ile risk arasındaki dengenin göstergesidir.`,
    ] },
    { h: 'Değerlendirirken dikkat edilecekler', ul: [
      `<strong>Borcun türü:</strong> Faizsiz ticari borçlar ile faizli banka kredileri aynı yükü taşımaz. Bazı analizlerde yalnızca finansal borçlar özkaynağa oranlanır; bu araç tüm yabancı kaynakları kullanır.`,
      `<strong>Vade yapısı:</strong> Aynı oranda, borcun çoğu kısa vadeli olan işletme daha kırılgandır.`,
      `<strong>Özkaynağın gerçekliği:</strong> Yeniden değerleme fonları ya da tahsil edilmemiş sermaye taahhütleri özkaynağı kâğıt üzerinde büyütebilir.`,
      `<strong>Döviz cinsinden borç:</strong> Kur artışı borcu lira karşılığında büyütür ve oranı bir gecede değiştirebilir.`,
      `<strong>Negatif özkaynak:</strong> Birikmiş zararlar sermayeyi aştığında özkaynak eksiye düşer. Bu durumda oran matematiksel olarak hesaplansa da anlamlı yorumlanamaz; araç bu yüzden uyarı verir.`,
    ] },
    { h: 'Uyarı', p: [
      `Bu araç girdiğiniz üç bilanço tutarından oran üretir; borcun maliyetini, teminat yapısını, nakit akışını ya da sektör koşullarını değerlendirmez. Sonuçlar bilgilendirme amaçlıdır. Kredi kullanımı, sermaye artırımı, yatırım ya da ortaklık kararlarında mali müşavir ya da finans uzmanına danışın.`,
    ] },
  ],
  faq: [
    [`Borç/özkaynak oranı nasıl hesaplanır?`, `Kısa ve uzun vadeli yabancı kaynakların toplamı özkaynaklara bölünür. Toplam borç 600.000 lira, özkaynak 400.000 lira ise oran 1,5'tir.`],
    [`Borç/özkaynak oranı kaç olmalı?`, `Genel bir ihtiyat ölçüsü olarak 1'in altı güvenli kabul edilir; ancak uygun düzey sektöre göre çok değişir. Sermaye yoğun sektörlerde daha yüksek oranlar olağandır. En sağlıklı karşılaştırma aynı sektördeki benzer işletmelerle ve kendi geçmiş dönemlerinizle yapılır.`],
    [`Kaldıraç oranı ile borç/özkaynak oranı aynı şey mi?`, `Hayır, ama birbirine çevrilebilirler. Kaldıraç oranında payda toplam kaynak, borç/özkaynak oranında yalnızca özkaynaktır. Borç/özkaynak oranı 1,5 ise kaldıraç oranı 1,5 ÷ 2,5 = %60'tır.`],
    [`Özkaynak çarpanı ne işe yarar?`, `Toplam varlıkların özkaynağın kaç katı olduğunu gösterir. Aktif kârlılığı özkaynak çarpanıyla çarpıldığında özkaynak kârlılığına ulaşılır; bu nedenle kârlılık çözümlemelerinde kullanılır.`],
    [`Özkaynak negatifse oran neden hesaplanmıyor?`, `Negatif özkaynak, borçların varlıkları aştığı anlamına gelir. Bölme sonucu eksi bir sayı çıkar ve "borç özkaynağın kaç katı" yorumu anlamını yitirir. Bu durumda oran yerine borca batıklığın nedenlerine bakılması gerekir.`],
    [`Hangi borçlar hesaba katılır?`, `Bu araçta bilançonun kısa ve uzun vadeli yabancı kaynaklar gruplarının tamamı: banka kredileri, satıcılara borçlar, ödenecek vergiler, alınan avanslar, kıdem tazminatı karşılıkları ve benzerleri.`],
    [`Şahıs işletmesi için kullanabilir miyim?`, `Bilanço esasına göre defter tutuyorsanız evet. İşletme hesabı esasında bilanço düzenlenmediği için borç ve özkaynak tutarlarını kendiniz çıkarmanız gerekir; bu durumda sonuç yaklaşık bir gösterge olur.`],
    [`Girdiğim bilanço tutarları saklanıyor mu?`, `Hayır. Hesaplama tarayıcınızda yapılır; borç ve özkaynak tutarlarınız sunucuya gönderilmez, kaydedilmez.`],
  ],
  related: ['cari-oran-hesapla', 'ozkaynak-karliligi-hesapla', 'aktif-karlilik-hesapla', 'faaliyet-kar-marji-hesapla', 'favok-hesapla'],
};
