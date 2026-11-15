export default {
  slug: '72-kurali-hesapla',
  title: '72 Kuralı: Paranın İkiye Katlanma Süresi',
  h1Tail: 'kaç yılda iki katı?',
  pageTitle: '72 Kuralı Hesaplama – Para Kaç Yılda İkiye Katlanır?',
  description: '72 kuralıyla paranızın kaç yılda ikiye katlanacağını ya da belirli sürede ikiye katlamak için gereken yıllık getiriyi hesaplayın; kesin sonuçla karşılaştırın.',
  card: 'Yıllık getiri oranına göre paranın kaç yılda ikiye katlanacağını 72 kuralıyla ve kesin formülle hesaplayın.',
  category: 'finans',
  keywords: ['72 kuralı', '72 kuralı hesaplama', 'para kaç yılda ikiye katlanır', 'ikiye katlanma süresi', '72 kuralı nedir', 'bileşik faiz 72 kuralı', 'yatırım ikiye katlama'],
  lead: '72 kuralı, bileşik getiriyle büyüyen bir paranın kaç yılda iki katına çıkacağını akıldan hesaplamaya yarayan pratik bir yöntemdir: <strong>72\'yi yıllık yüzde orana bölün</strong>. Araç bu tahmini kesin formülle yan yana gösterir ve tersini, yani hedef süre için gereken oranı da bulur.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne hesaplansın?', type: 'select', options: [['sure', 'Oran biliniyor → ikiye katlanma süresi'], ['oran', 'Süre biliniyor → gereken yıllık oran']] },
    { id: 'deger', label: 'Yıllık oran (%) ya da süre (yıl)', type: 'number', placeholder: 'Örn. 8', hint: 'Seçiminize göre yıllık yüzde oranı ya da yıl sayısını yazın' },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, v.mod === 'oran' ? 'Süre' : 'Yıllık oran');
    if (v.mod === 'oran') {
      if (x > 1000) h.err('Süre en fazla 1.000 yıl olabilir.');
      const kural = 72 / x;
      const kesin = (Math.pow(2, 1 / x) - 1) * 100;
      return {
        rows: [
          ['Gereken yıllık oran (72 kuralı)', '%' + h.fmt(kural, 2)],
          ['Gereken yıllık oran (kesin)', '%' + h.fmt(kesin, 4)],
          ['72 kuralının sapması', h.fmt(kural - kesin, 4) + ' puan'],
          ['Hedef süre', h.fmt(x, 2) + ' yıl'],
        ],
        note: 'Kesin oran = 2^(1 ÷ yıl) − 1. Getirinin her yıl aynı oranda gerçekleştiği ve yeniden yatırıldığı varsayılır.',
      };
    }
    if (x > 10000) h.err('Yıllık oran %10.000\'den büyük olamaz; değeri kontrol edin.');
    const r = x / 100;
    const kural = 72 / x;
    const kat = (k) => Math.log(k) / Math.log(1 + r);
    const kesin = kat(2);
    const ayTop = Math.round(kesin * 12);
    return {
      rows: [
        ['İkiye katlanma süresi (72 kuralı)', h.fmt(kural, 2) + ' yıl'],
        ['İkiye katlanma süresi (kesin)', h.fmt(kesin, 2) + ' yıl'],
        ['Kesin süre, yıl ve ay', Math.floor(ayTop / 12) + ' yıl ' + (ayTop % 12) + ' ay'],
        ['72 kuralının sapması', h.fmt(kural - kesin, 2) + ' yıl'],
        ['Üçe katlanma süresi (kesin)', h.fmt(kat(3), 2) + ' yıl'],
        ['Dörde katlanma süresi (kesin)', h.fmt(kat(4), 2) + ' yıl'],
      ],
      note: 'Kesin süre = ln 2 ÷ ln(1 + oran). Yıllık bileşik getiri ve sabit oran varsayılmıştır; vergi ve enflasyon hesaba katılmaz.',
    };
  },
  cases: [
    { in: { mod: 'sure', deger: '8' }, out: { 'İkiye katlanma süresi (72 kuralı)': '9 yıl', 'İkiye katlanma süresi (kesin)': '9,01 yıl', 'Kesin süre, yıl ve ay': '9 yıl 0 ay', 'Üçe katlanma süresi (kesin)': '14,27 yıl', 'Dörde katlanma süresi (kesin)': '18,01 yıl' } },
    { in: { mod: 'oran', deger: '10' }, out: { 'Gereken yıllık oran (72 kuralı)': '%7,2', 'Gereken yıllık oran (kesin)': '%7,1773' } },
    { in: { mod: 'sure', deger: '6' }, out: { 'İkiye katlanma süresi (72 kuralı)': '12 yıl', 'İkiye katlanma süresi (kesin)': '11,9 yıl' } },
    { in: { mod: 'sure', deger: '12' }, out: { 'İkiye katlanma süresi (72 kuralı)': '6 yıl', 'İkiye katlanma süresi (kesin)': '6,12 yıl', 'Kesin süre, yıl ve ay': '6 yıl 1 ay' } },
    { in: { mod: 'sure', deger: '100' }, out: { 'İkiye katlanma süresi (72 kuralı)': '0,72 yıl', 'İkiye katlanma süresi (kesin)': '1 yıl', 'Kesin süre, yıl ve ay': '1 yıl 0 ay' } },
    { in: { mod: 'sure', deger: '36' }, out: { 'İkiye katlanma süresi (72 kuralı)': '2 yıl', 'İkiye katlanma süresi (kesin)': '2,25 yıl', 'Kesin süre, yıl ve ay': '2 yıl 3 ay' } },
    { in: { mod: 'oran', deger: '5' }, out: { 'Gereken yıllık oran (72 kuralı)': '%14,4', 'Gereken yıllık oran (kesin)': '%14,8698' } },
    { in: { mod: 'oran', deger: '1' }, out: { 'Gereken yıllık oran (kesin)': '%100' } },
    { in: { mod: 'sure', deger: '0' }, error: true },
    { in: { mod: 'sure', deger: '' }, error: true },
  ],
  howto: [
    'Üstteki listeden ne aradığınızı seçin: oranı bilip süreyi mi, yoksa hedef süreyi bilip gereken oranı mı bulacaksınız?',
    'İlk seçenekte yıllık getiri ya da faiz oranını yüzde olarak (örn. 8), ikinci seçenekte paranızı ikiye katlamak istediğiniz yıl sayısını (örn. 10) yazın.',
    '"Hesapla" düğmesine basın. İlk satır 72 kuralının verdiği pratik sonucu, ikinci satır bileşik faiz formülünden çıkan kesin sonucu gösterir.',
    'Süre hesabında alt satırlarda paranın üç ve dört katına ulaşma süresini de görebilirsiniz.',
  ],
  sections: [
    { h: '72 kuralı nedir?', p: [
      '72 kuralı, bileşik getiriyle büyüyen bir değerin iki katına çıkması için gereken süreyi hesap makinesi olmadan tahmin etmeye yarayan bir kısayoldur: <strong>süre (yıl) ≈ 72 ÷ yıllık oran (%)</strong>. Yıllık %8 getiriyle para yaklaşık 72 ÷ 8 = 9 yılda, %6 ile 12 yılda, %12 ile 6 yılda ikiye katlanır.',
      'Kural tersine de çalışır: <strong>oran ≈ 72 ÷ süre</strong>. Paranızı 10 yılda ikiye katlamak istiyorsanız yılda yaklaşık %7,2 getiri gerekir. Kuralın bilinen ilk yazılı anlatımı 15. yüzyıl sonunda İtalyan matematikçi Luca Pacioli\'nin eserinde yer alır; yani yüzyıllardır tüccarların ve yatırımcıların kullandığı bir pratik bilgidir.',
    ] },
    { h: 'Kural nereden gelir? Kesin formül', p: [
      'Yıllık r oranıyla bileşik büyüyen bir paranın t yıl sonraki değeri başlangıcın (1 + r)<sup>t</sup> katıdır. İki katına çıkması için (1 + r)<sup>t</sup> = 2 olmalıdır; buradan <strong>t = ln 2 ÷ ln(1 + r)</strong> bulunur. ln 2 yaklaşık 0,693\'tür ve küçük oranlarda ln(1 + r) yaklaşık r\'ye eşittir; bu yüzden süre kabaca 69,3 ÷ oran (%) eder.',
      'Peki neden 69,3 değil de 72? İki nedeni var. Birincisi, gerçek hayattaki oranlarda ln(1 + r) değeri r\'den biraz küçüktür ve bu, payın biraz büyütülmesini gerektirir; %8 dolayında en iyi sabit neredeyse tam 72\'dir. İkincisi, 72 sayısı 1, 2, 3, 4, 6, 8, 9 ve 12\'ye kalansız bölünür, bu da akıldan hesabı kolaylaştırır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Yıllık %8 getiri için 72 kuralı 72 ÷ 8 = <strong>9 yıl</strong> der. Kesin hesap: ln 2 ÷ ln 1,08 = 0,693147 ÷ 0,076961 ≈ <strong>9,01 yıl</strong>. Sapma yalnızca birkaç gündür. Sağlaması: (1,08)<sup>9</sup> ≈ 1,999, yani 100.000 TL dokuz yıl sonunda yaklaşık 199.900 TL olur.',
      'Aynı oranla paranın üç katına çıkması 14,27 yıl, dört katına çıkması 18,01 yıl sürer. Dört kat, iki kez ikiye katlanmak demektir; bu yüzden süresi ikiye katlanma süresinin tam iki katıdır. Üç kat ve dört kat için de benzer pratik kurallar vardır: 114 ÷ oran ve 144 ÷ oran.',
      'Ters yönde: 5 yılda ikiye katlamak için 72 kuralı %14,4 der; kesin değer 2<sup>1/5</sup> − 1 = %14,8698\'dir.',
    ] },
    { h: 'Kural hangi oranlarda güvenilir?', p: [
      '72 kuralı %6 ile %10 arasındaki oranlarda neredeyse kusursuzdur. Oran yükseldikçe süreyi olduğundan kısa gösterir:',
    ], ul: [
      '<strong>%3:</strong> kural 24 yıl, kesin 23,45 yıl',
      '<strong>%6:</strong> kural 12 yıl, kesin 11,90 yıl',
      '<strong>%8:</strong> kural 9 yıl, kesin 9,01 yıl',
      '<strong>%12:</strong> kural 6 yıl, kesin 6,12 yıl',
      '<strong>%24:</strong> kural 3 yıl, kesin 3,22 yıl',
      '<strong>%36:</strong> kural 2 yıl, kesin 2,25 yıl',
      '<strong>%50:</strong> kural 1,44 yıl, kesin 1,71 yıl',
      '<strong>%100:</strong> kural 0,72 yıl, kesin tam 1 yıl',
    ] },
    { h: 'Yüksek oranlar için not', p: [
      'Türkiye\'de faiz ve enflasyon oranları sıklıkla kuralın ideal aralığının üzerindedir. %36 gibi bir oranda 72 kuralı 2 yıl derken gerçek süre 2 yıl 3 aydır; %50\'de fark üç ayı aşar. Bu nedenle çift haneli yüksek oranlarda kuralı yalnızca kaba bir fikir için kullanın ve bu sayfadaki kesin sonucu esas alın.',
    ] },
    { h: 'Yalnızca yatırım için değil', p: [
      'Kural, sabit bir yüzdeyle büyüyen ya da küçülen her şeye uygulanabilir. Yıllık %24 enflasyonda fiyatlar yaklaşık 3 yılda ikiye katlanır, yani paranın alım gücü aynı sürede yarıya iner. Yılda %4 büyüyen bir ekonominin hacmi yaklaşık 18 yılda iki katına ulaşır. Aylık %3 faizle büyüyen bir kredi kartı borcu 72 ÷ 3 = yaklaşık 24 ayda ikiye katlanır; burada oran aylık olduğu için süre de ay cinsinden çıkar. Nüfus artışı, abone sayısı ya da ciro büyümesi gibi konularda da aynı mantık geçerlidir.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Hesap; getirinin her dönem aynı oranda gerçekleştiğini, kazancın tamamının yeniden yatırıldığını ve dönem içinde para eklenip çekilmediğini varsayar. Gerçek yatırımlarda getiri yıldan yıla dalgalanır, vergi ve masraflar net oranı düşürür, enflasyon ise ikiye katlanan paranın alım gücünü azaltır. Reel sonucu görmek için oran alanına enflasyondan arındırılmış getiriyi yazabilirsiniz. Sonuçlar bilgilendirme amaçlıdır ve yatırım tavsiyesi değildir.',
    ] },
  ],
  faq: [
    ['72 kuralı nasıl uygulanır?', '72 sayısını yıllık yüzde getiri oranına bölersiniz; sonuç paranın ikiye katlanacağı yaklaşık yıl sayısıdır. Örneğin yıllık %9 getiriyle 72 ÷ 9 = 8 yıl eder.'],
    ['72 kuralı kesin sonuç verir mi?', 'Hayır, bir yaklaşımdır. %6–%10 aralığında hata bir iki ayı geçmez; oran yükseldikçe sapma büyür. Kesin süre ln 2 ÷ ln(1 + oran) formülüyle bulunur ve araçta ikinci satırda gösterilir.'],
    ['Neden 70 ya da 69 değil de 72 kullanılıyor?', 'Matematiksel olarak sürekli bileşik faizde doğru sabit 69,3\'tür ve bazı kaynaklar 69 ya da 70 kuralını önerir. 72, yıllık bileşiklenmede yaygın oranlar için daha isabetlidir ve çok sayıda sayıya tam bölündüğü için akıldan hesaba uygundur.'],
    ['Paramı 5 yılda ikiye katlamak için yüzde kaç getiri gerekir?', '72 kuralına göre 72 ÷ 5 = %14,4. Kesin hesapla yıllık %14,87 bileşik getiri gerekir. Araçta ikinci seçeneği seçip 5 yazarak her iki sonucu görebilirsiniz.'],
    ['Aylık oranla kullanabilir miyim?', 'Evet. Oran alanına aylık yüzdeyi yazarsanız sonuçtaki "yıl" ifadesini "ay" olarak okuyun. Aylık %3 için kural 24 ay, kesin sonuç yaklaşık 23,45 ay verir.'],
    ['Enflasyon paranın değerini kaç yılda yarıya indirir?', 'Aynı kural geçerlidir: 72\'yi yıllık enflasyon oranına bölün. Yıllık %12 enflasyonda fiyatlar yaklaşık 6 yılda ikiye katlanır; bu, aynı paranın alım gücünün yarıya inmesi demektir.'],
    ['Basit faizde de 72 kuralı geçerli mi?', 'Hayır. Kural bileşik büyüme içindir. Basit faizde para, 100 ÷ oran yılda ikiye katlanır; örneğin yıllık %8 basit faizle 12,5 yıl gerekir, bileşik faizle ise yaklaşık 9 yıl yeter.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız oran ya da süre sunucuya gönderilmez.'],
  ],
  related: ['bilesik-faiz-hesapla', 'gelecek-deger-hesapla', 'yillik-bilesik-buyume-hesapla', 'efektif-faiz-hesapla', 'birikim-hesapla', 'enflasyon-hesapla'],
};
