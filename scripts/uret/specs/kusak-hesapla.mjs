export default {
  slug: 'kusak-hesapla',
  title: 'Hangi Kuşaktanım Hesaplama',
  h1Tail: 'X, Y, Z, Alfa',
  pageTitle: 'Hangi Kuşaktanım? Doğum Yılına Göre Kuşak Hesaplama (X, Y, Z)',
  description: 'Doğum yılınızı yazın, hangi kuşaktan olduğunuzu öğrenin: Sessiz Kuşak, Baby Boomer, X, Y, Z, Alfa ya da Beta. Kuşağın yıl ve yaş aralığını da gösterir.',
  card: 'Doğum yılınıza göre X, Y, Z, Alfa ya da Beta kuşağından hangisine girdiğinizi ve kuşağın yaş aralığını öğrenin.',
  category: 'zaman',
  keywords: ['hangi kuşaktanım', 'kuşak hesaplama', 'z kuşağı hangi yıllar', 'y kuşağı kaç yaşında', 'x kuşağı doğum yılları', 'alfa kuşağı', 'kuşaklar ve yılları'],
  lead: 'Doğum yılınızı yazın; yaygın kabul gören sınıflandırmaya göre hangi kuşaktan sayıldığınızı, o kuşağın doğum yılı aralığını ve bugünkü yaş aralığını görün. Kuşak sınırları kaynaktan kaynağa birkaç yıl oynar; araç en sık kullanılan aralıkları esas alır.',
  button: 'Hesapla',
  inputs: [
    { id: 'yil', label: 'Doğum yılı', type: 'number', placeholder: 'Örn. 1990', hint: 'Dört haneli yıl yazın (1883–2039).' },
    { id: 'bugun', label: 'Bugünün tarihi (boş = bugün)', type: 'date', hint: 'Yaş bilgisi bu tarihin yılına göre hesaplanır.' },
  ],
  compute(v, h) {
    const K = [
      ['Kayıp Kuşak', 1883, 1900],
      ['En Büyük Kuşak', 1901, 1927],
      ['Sessiz Kuşak', 1928, 1945],
      ['Baby Boomer Kuşağı', 1946, 1964],
      ['X Kuşağı', 1965, 1980],
      ['Y Kuşağı (Milenyum)', 1981, 1996],
      ['Z Kuşağı', 1997, 2012],
      ['Alfa Kuşağı', 2013, 2024],
      ['Beta Kuşağı', 2025, 2039],
    ];
    const y = h.int(v.yil, 'Doğum yılı');
    const ref = h.dateOrToday(v.bugun, 'Bugünün tarihi').getUTCFullYear();
    if (y < 1883 || y > 2039) h.err('Doğum yılı 1883 ile 2039 arasında olmalı; dört haneli yazdığınızdan emin olun (örn. 1990).');
    if (y > ref) h.err('Doğum yılı, hesap yapılan yıldan (' + ref + ') sonra olamaz.');
    const i = K.findIndex((k) => y >= k[1] && y <= k[2]);
    const k = K[i];
    const enGenc = Math.max(0, ref - k[2]);
    const enYasli = ref - k[1];
    const rows = [
      ['Kuşak', k[0]],
      ['Doğum yılı aralığı', k[1] + '–' + k[2]],
      ['Bu yıl dolan yaş', String(ref - y)],
      ['Kuşağın bu yılki yaş aralığı', enGenc + '–' + enYasli + ' yaş'],
      ['Kuşak içindeki yeri', (y - k[1] + 1) + '. yıl (toplam ' + (k[2] - k[1] + 1) + ' yıl)'],
      ['Önceki kuşak', i > 0 ? K[i - 1][0] + ' (' + K[i - 1][1] + '–' + K[i - 1][2] + ')' : '—'],
      ['Sonraki kuşak', i < K.length - 1 ? K[i + 1][0] + ' (' + K[i + 1][1] + '–' + K[i + 1][2] + ')' : '—'],
    ];
    let note = 'Kuşak sınırları resmî bir tanım değildir; kaynaklara göre birkaç yıl farklılık gösterebilir.';
    if (y - k[1] <= 2 && i > 0) note = 'Doğum yılınız kuşak sınırına çok yakın; bazı kaynaklar sizi ' + K[i - 1][0] + ' içinde sayabilir. ' + note;
    else if (k[2] - y <= 2 && i < K.length - 1) note = 'Doğum yılınız kuşak sınırına çok yakın; bazı kaynaklar sizi ' + K[i + 1][0] + ' içinde sayabilir. ' + note;
    return { rows, note };
  },
  cases: [
    { in: { yil: '1990', bugun: '2026-06-15' }, out: { 'Kuşak': 'Y Kuşağı (Milenyum)', 'Doğum yılı aralığı': '1981–1996', 'Bu yıl dolan yaş': '36', 'Kuşağın bu yılki yaş aralığı': '30–45 yaş', 'Kuşak içindeki yeri': '10. yıl (toplam 16 yıl)' } },
    { in: { yil: '2005', bugun: '2026-06-15' }, out: { 'Kuşak': 'Z Kuşağı', 'Doğum yılı aralığı': '1997–2012', 'Bu yıl dolan yaş': '21', 'Kuşağın bu yılki yaş aralığı': '14–29 yaş' } },
    { in: { yil: '1980', bugun: '2026-06-15' }, out: { 'Kuşak': 'X Kuşağı', 'Doğum yılı aralığı': '1965–1980', 'Sonraki kuşak': 'Y Kuşağı (Milenyum) (1981–1996)' } },
    { in: { yil: '1946', bugun: '2026-06-15' }, out: { 'Kuşak': 'Baby Boomer Kuşağı', 'Bu yıl dolan yaş': '80', 'Önceki kuşak': 'Sessiz Kuşak (1928–1945)' } },
    { in: { yil: '2013', bugun: '2026-06-15' }, out: { 'Kuşak': 'Alfa Kuşağı', 'Kuşağın bu yılki yaş aralığı': '2–13 yaş' } },
    { in: { yil: '2025', bugun: '2026-06-15' }, out: { 'Kuşak': 'Beta Kuşağı', 'Kuşağın bu yılki yaş aralığı': '0–1 yaş', 'Sonraki kuşak': '—' } },
    { in: { yil: '1945', bugun: '2026-06-15' }, out: { 'Kuşak': 'Sessiz Kuşak' } },
    { in: { yil: '90', bugun: '2026-06-15' }, error: true },
    { in: { yil: '2030', bugun: '2026-06-15' }, error: true },
    { in: { yil: 'doksan', bugun: '2026-06-15' }, error: true },
  ],
  howto: [
    '"Doğum yılı" alanına doğduğunuz yılı dört haneli olarak yazın; ay ve gün gerekmez, çünkü kuşaklar yıl bazında tanımlanır.',
    'Yaş bilgisinin başka bir yıla göre hesaplanmasını istiyorsanız tarih alanını doldurun; boş bırakırsanız bugünün tarihi kullanılır.',
    '"Hesapla" düğmesine basın. İlk satırda kuşağınızın adı, altında kuşağın doğum yılı aralığı ve bugünkü yaş aralığı görünür.',
    'Sonuç altındaki notu okuyun: doğum yılınız bir sınıra iki yıl ya da daha yakınsa komşu kuşak da ayrıca belirtilir.',
  ],
  sections: [
    { h: 'Kuşak ne demek, sınırlar nasıl çizilir?', p: [
      'Kuşak, yaklaşık aynı yıllarda doğmuş ve çocukluk ile gençlik dönemini benzer toplumsal, ekonomik ve teknolojik koşullarda geçirmiş insan topluluğuna verilen addır. Sosyologlar ve pazar araştırmacıları, bu ortak deneyimlerin tutum ve alışkanlıklara yansıdığını varsayarak nüfusu on beş-yirmi yıllık dilimlere ayırır. Televizyonla büyüyenler, internetin yaygınlaşmasına gençken tanık olanlar ve akıllı telefonun olmadığı bir dünyayı hiç görmeyenler bu yüzden ayrı adlarla anılır.',
      'Önemli bir nokta şudur: kuşak sınırlarını belirleyen bir kurum ya da standart yoktur. Aynı kuşak için farklı araştırma kuruluşları bir-üç yıl farklı başlangıç ve bitiş yılı kullanır. Bu araç, uluslararası yayınlarda ve Türkçe kaynaklarda en sık karşılaşılan aralıkları kullanır; sonucu kesin bir kimlik değil, yaygın bir sınıflandırma olarak okumak gerekir.',
    ] },
    { h: 'Araçta kullanılan kuşak tablosu', ul: [
      '<strong>Kayıp Kuşak</strong>: 1883–1900 doğumlular',
      '<strong>En Büyük Kuşak</strong>: 1901–1927 doğumlular',
      '<strong>Sessiz Kuşak</strong>: 1928–1945 doğumlular',
      '<strong>Baby Boomer Kuşağı</strong>: 1946–1964 doğumlular',
      '<strong>X Kuşağı</strong>: 1965–1980 doğumlular',
      '<strong>Y Kuşağı (Milenyum)</strong>: 1981–1996 doğumlular',
      '<strong>Z Kuşağı</strong>: 1997–2012 doğumlular',
      '<strong>Alfa Kuşağı</strong>: 2013–2024 doğumlular',
      '<strong>Beta Kuşağı</strong>: 2025–2039 doğumlular',
    ] },
    { h: 'Hesap nasıl yapılır? Çözümlü örnek', p: [
      'Mantık basit bir aralık kontrolüdür: doğum yılı hangi satırın başlangıç ve bitiş yılı arasına düşüyorsa kuşak odur. Örneğin 1990 doğumlu biri için 1981 ≤ 1990 ≤ 1996 koşulu sağlandığından sonuç <strong>Y Kuşağı (Milenyum)</strong> olur. Bu kuşak 16 yıllık bir dilimdir ve 1990, dilimin 10. yılıdır.',
      'Yaş satırları yıl farkıyla bulunur. Hesap yılı 2026 ise 1990 doğumlu kişi o yıl içinde 2026 − 1990 = 36 yaşını doldurur. Kuşağın en genç üyeleri 2026 − 1996 = 30, en yaşlı üyeleri 2026 − 1981 = 45 yaşını doldurur; yani Y Kuşağı 2026 yılında 30–45 yaş aralığındadır. Aynı yıl için Z Kuşağı 14–29, X Kuşağı 46–61 yaş aralığına denk gelir.',
      '"Bu yıl dolan yaş" satırı, doğum gününüz henüz gelmemiş olsa bile yıl sonuna kadar dolduracağınız yaşı gösterir. Gün hassasiyetinde yaş gerekiyorsa doğum tarihiyle çalışan bir yaş hesaplama aracı kullanmak daha doğrudur.',
    ] },
    { h: 'Kuşakların öne çıkan özellikleri', p: [
      '<strong>Baby Boomer</strong> adı, İkinci Dünya Savaşı sonrasında birçok ülkede görülen doğum artışından gelir. <strong>X Kuşağı</strong> renkli televizyonun, kasetin ve ilk ev bilgisayarlarının yaygınlaştığı yıllarda büyümüştür; analog çocukluk ile dijital yetişkinliği birlikte yaşayan kuşak olarak anılır.',
      '<strong>Y Kuşağı</strong>, 2000 yılı dolaylarında yetişkinliğe adım attığı için "Milenyum kuşağı" diye de bilinir; internetin evlere girmesine ve cep telefonunun yaygınlaşmasına gençlik yıllarında tanık olmuştur. <strong>Z Kuşağı</strong> geniş bant internet ve akıllı telefonla birlikte büyümüştür. <strong>Alfa Kuşağı</strong> ise tamamen 21. yüzyılda doğan ilk kuşaktır; dokunmatik ekranlar onlar için doğdukları andan beri vardır. 2025 ve sonrasında doğanlar için <strong>Beta Kuşağı</strong> adı kullanılmaya başlanmıştır.',
      'Bu tanımlar genellemedir. Aynı yıl doğmuş iki kişinin alışkanlıkları; yaşadığı şehre, ailesinin imkânlarına ve eğitimine göre birbirinden çok farklı olabilir. Kuşak etiketini bir insanı tanımanın kısayolu olarak değil, dönemi anlamaya yarayan kaba bir çerçeve olarak görmek daha sağlıklıdır.',
    ] },
    { h: 'Sınırda doğanlar: ara kuşaklar', p: [
      'Doğum yılı iki kuşağın birleştiği yıllara denk gelenler çoğu zaman kendilerini iki tarafa da yakın hisseder. 1977–1983 dolaylarında doğanlar X ile Y arasında, 1993–1998 dolaylarında doğanlar Y ile Z arasında bir geçiş grubu sayılır. Farklı kaynaklar X Kuşağını 1979 ya da 1980\'de, Y Kuşağını 1994 ile 1996 arasında bir yılda, Z Kuşağını 2009 ile 2012 arasında bir yılda bitirir.',
      'Araç bu belirsizliği gizlemez: doğum yılınız bir sınıra iki yıl ya da daha yakınsa sonuç notunda komşu kuşağın adı da yazılır. Örneğin 1980 doğumlu biri tabloda X Kuşağının son yılındadır, ancak notta bazı kaynakların onu Y Kuşağına dahil edebileceği belirtilir.',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Kuşak bilgisi en çok insan kaynakları sunumlarında, pazarlama ve hedef kitle çalışmalarında, anket raporlarında ve okul ödevlerinde sorulur. Bir işletme müşteri listesindeki doğum yıllarını kuşaklara ayırarak hangi yaş grubuna seslendiğini kabaca görebilir. Aile içinde ise "annem hangi kuşaktan, ben hangisindenim" merakını gidermek için yeterlidir.',
      'Araç 1883 ile 2039 arasındaki yılları kabul eder ve gelecekteki bir yılı doğum yılı olarak işlemez. İki haneli yıl (örneğin 90) yazarsanız hata alırsınız; yılı her zaman dört haneli girin.',
    ] },
  ],
  faq: [
    ['Z Kuşağı hangi yılları kapsar?', 'Bu araçta kullanılan yaygın sınıflandırmaya göre Z Kuşağı 1997–2012 yılları arasında doğanları kapsar. Bazı kaynaklar başlangıcı 1995, bitişi 2009 ya da 2010 olarak alır.'],
    ['Y Kuşağı ile Milenyum kuşağı aynı şey mi?', 'Evet. 1981–1996 doğumlular için hem "Y Kuşağı" hem de "Milenyum kuşağı" (Millennials) adı kullanılır. İkinci ad, bu kuşağın 2000 yılı dolaylarında yetişkinliğe ulaşmasından gelir.'],
    ['1980 doğumluyum, X mi Y mi sayılırım?', 'Araçtaki tabloya göre 1980, X Kuşağının son yılıdır. Ancak bazı kaynaklar Y Kuşağını 1980 ile başlatır; bu yüzden sonuç notunda iki kuşağa da yakın olduğunuz belirtilir.'],
    ['2010 doğumlular Z mi, Alfa mı?', 'Tabloda Z Kuşağı 2012\'de bittiği için 2010 doğumlular Z Kuşağında görünür. Alfa Kuşağını 2010 ile başlatan kaynaklar da vardır; sınır yılları konusunda tam bir görüş birliği yoktur.'],
    ['Kuşağım doğduğum aya göre değişir mi?', 'Hayır. Kuşaklar yıl bazında tanımlanır; ocakta ya da aralıkta doğmuş olmanız sonucu değiştirmez. Ay ve gün yalnızca tam yaşınızı hesaplarken önem taşır.'],
    ['Beta Kuşağı ne zaman başlıyor?', 'Yaygın kullanıma göre 2025 yılından itibaren doğanlar Beta Kuşağı olarak adlandırılır ve bu dilimin 2039\'a kadar süreceği öngörülür. Ad yeni olduğu için aralık ileride farklı tanımlanabilir.'],
    ['Türkiye için kuşak yılları farklı mı?', 'Kuşak adları ve aralıkları ağırlıklı olarak ABD kaynaklıdır ve Türkiye\'de de aynı yıllarla kullanılır. Teknolojinin ve toplumsal değişimlerin ülkeye geliş zamanı farklı olduğundan, yaşanan deneyim birebir örtüşmeyebilir.'],
    ['Yazdığım doğum yılı kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; doğum yılınız sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['cin-burcu-hesapla', 'yuzyil-hesapla', 'kac-gundur-yasiyorum', 'dogum-gunu-geri-sayim', 'yas-farki-hesapla'],
};
