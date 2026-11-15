export default {
  slug: 'kalori-joule-cevir',
  title: 'Kalori Joule Çevirici',
  h1Tail: 'cal ↔ J',
  pageTitle: 'Kalori Joule Çevirici – cal\'den J\'ye, Joule\'den Kaloriye',
  description: 'Kaloriyi joule\'e, joule\'ü kaloriye çevirin. Termokimyasal (4,184 J) ve uluslararası tablo (4,1868 J) kalori tanımlarını seçebilir, kJ ve kcal karşılığını görebilirsiniz.',
  card: 'Kaloriyi joule\'e, joule\'ü kaloriye çevirin; 4,184 ve 4,1868 tanımları arasında seçim yapın, kJ ve kcal karşılığını görün.',
  category: 'birim',
  keywords: ['kalori joule çevirme', '1 kalori kaç joule', 'joule kalori', 'cal j dönüştürme', '1 joule kaç kalori', 'kalori joule hesaplama', 'cal to joule'],
  lead: 'Bir enerji miktarını kaloriden (cal) joule\'e (J) ya da joule\'den kaloriye çevirin. Araç varsayılan olarak <strong>1 cal = 4,184 J</strong> termokimyasal tanımını kullanır; dilerseniz uluslararası buhar tablosu kalorisini (4,1868 J) seçebilirsiniz.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 250' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['cal', 'Kalori → Joule'], ['j', 'Joule → Kalori']] },
    { id: 'tanim', label: 'Kalori tanımı', type: 'select', options: [['th', 'Termokimyasal (1 cal = 4,184 J)'], ['it', 'Uluslararası tablo (1 cal = 4,1868 J)']], hint: 'Emin değilseniz termokimyasal tanımı bırakın; ders kitaplarında en sık kullanılan değerdir.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.tanim === 'it' ? 4.1868 : 4.184;
    const j = v.yon === 'j' ? x : x * k;
    const cal = j / k;
    const jRow = ['Joule', h.sig(j, 8) + ' J'];
    const calRow = ['Kalori', h.sig(cal, 8) + ' cal'];
    return {
      rows: [
        ...(v.yon === 'j' ? [calRow, jRow] : [jRow, calRow]),
        ['Kilojoule', h.sig(j / 1000, 8) + ' kJ'],
        ['Kilokalori', h.sig(cal / 1000, 8) + ' kcal'],
      ],
      note: `Kullanılan eşitlik: 1 cal = ${h.fmt(k, 4)} J. Binlik ayraç nokta, ondalık ayraç virgüldür.`,
    };
  },
  cases: [
    { in: { deger: '1', yon: 'cal', tanim: 'th' }, out: { 'Joule': '4,184 J', 'Kilojoule': '0,004184 kJ' } },
    { in: { deger: '100', yon: 'j', tanim: 'th' }, out: { 'Kalori': '23,900574 cal', 'Joule': '100 J' } },
    { in: { deger: '1', yon: 'cal', tanim: 'it' }, out: { 'Joule': '4,1868 J' } },
    { in: { deger: '250', yon: 'cal', tanim: 'th' }, out: { 'Joule': '1.046 J', 'Kilojoule': '1,046 kJ', 'Kilokalori': '0,25 kcal' } },
    { in: { deger: '4184', yon: 'j', tanim: 'th' }, out: { 'Kalori': '1.000 cal', 'Kilokalori': '1 kcal' } },
    { in: { deger: '0', yon: 'cal' }, out: { 'Joule': '0 J' } },
    { in: { deger: '41,868', yon: 'j', tanim: 'it' }, out: { 'Kalori': '10 cal' } },
    { in: { deger: 'abc', yon: 'cal' }, error: true },
    { in: { deger: '-3', yon: 'j' }, error: true },
  ],
  howto: [
    '"Değer" alanına çevirmek istediğiniz enerji miktarını yazın. Ondalık kısım için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden kaloriden joule\'e mi, joule\'den kaloriye mi geçeceğinizi seçin.',
    'Sorunuzda ya da kaynağınızda hangi kalori tanımı geçiyorsa "Kalori tanımı" listesinden onu işaretleyin; belirtilmemişse termokimyasal tanım uygundur.',
    '"Çevir" düğmesine basın. Sonuç kutusunda joule ve kalori değerlerinin yanında kilojoule ve kilokalori karşılıkları da listelenir.',
    'Sonuçları "Sonucu kopyala" düğmesiyle panoya alıp ödevinize, raporunuza ya da hesap tablonuza yapıştırabilirsiniz.',
  ],
  sections: [
    { h: 'Kalori ve joule arasındaki ilişki', p: [
      'Joule, Uluslararası Birimler Sistemi\'nin (SI) enerji birimidir; bir newtonluk kuvvetin bir cismi bir metre hareket ettirirken yaptığı iş olarak tanımlanır. Kalori ise SI dışı, tarihsel bir ısı birimidir: başlangıçta bir gram suyun sıcaklığını bir santigrat derece yükseltmek için gereken ısı olarak düşünülmüştür. Suyun öz ısısı sıcaklığa göre biraz değiştiği için bu tanım tek bir sayı vermez; bu yüzden zaman içinde kalori, joule cinsinden sabit bir değere bağlanmıştır.',
      'Günümüzde en yaygın kabul gören değer <strong>termokimyasal kaloridir</strong> ve tam olarak 4,184 joule\'dür. Kimya ve fizik ders kitaplarındaki soruların çoğu bu değerle çözülür. Dolayısıyla çeviri bir çarpma ya da bölme işleminden ibarettir: <strong>J = cal × 4,184</strong> ve <strong>cal = J ÷ 4,184</strong>.',
    ] },
    { h: 'Neden iki farklı kalori tanımı var?', p: [
      'Kalori tek bir ölçümle değil, farklı dönemlerde farklı kurumların aldığı kararlarla sabitlenmiştir. Termokimyasal kalori 4,184 J olarak tanımlanırken, buhar tabloları üzerine çalışan uluslararası konferansın benimsediği "uluslararası tablo kalorisi" (IT kalorisi) 4,1868 J\'dür. İkisi arasındaki fark yaklaşık on binde yedidir; gündelik hesaplarda fark edilmez ama mühendislik tablolarıyla karşılaştırma yaparken küçük sapmalara yol açabilir.',
      'Pratik kural şudur: kimya, biyoloji ve beslenme bağlamında termokimyasal değer; buhar, ısıtma-soğutma ve BTU ile ilişkili mühendislik hesaplarında çoğunlukla uluslararası tablo değeri kullanılır. Kaynağınız dönüşüm katsayısını açıkça veriyorsa ona uyun; araçtaki seçim kutusu bunun içindir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir deneyde suya 250 cal ısı verilmiştir. Bu kaç joule eder? 250 × 4,184 = 1046 J, yani 1,046 kJ. Araçta 250 yazıp "Kalori → Joule" yönünü seçtiğinizde aynı sonucu görürsünüz.',
      '<strong>Örnek 2:</strong> 100 J\'lük bir iş kaç kaloridir? 100 ÷ 4,184 = 23,900574 cal. Yaklaşık hesapta 1 J için 0,239 cal değeri akılda tutulabilir.',
      '<strong>Örnek 3:</strong> Uluslararası tablo tanımıyla 41,868 J tam 10 cal eder; aynı miktar termokimyasal tanımla 10,0067 cal olur. Aradaki fark, tanım seçiminin sonucu yalnızca dördüncü anlamlı basamaktan sonra etkilediğini gösterir.',
    ] },
    { h: 'Küçük kalori, büyük kalori karışıklığı', p: [
      'Bu sayfadaki "kalori" fizikteki küçük kaloridir (cal). Gıda etiketlerinde ve diyet listelerinde "kalori" diye anılan birim ise aslında kilokaloridir (kcal) ve küçük kalorinin bin katıdır. Bir dilim ekmeğin "70 kalori" olduğu söylendiğinde kastedilen 70 kcal, yani 70.000 cal ya da yaklaşık 293 kJ\'dür.',
      'Besin değerleriyle çalışıyorsanız sonuç kutusundaki "Kilokalori" ve "Kilojoule" satırlarına bakmanız daha doğru olur. Fizik ve kimya sorularında ise soru metnindeki birimin "cal" mi "kcal" mi olduğunu kontrol etmek, bin katlık hataların önüne geçer.',
    ] },
    { h: 'Hızlı başvuru değerleri (termokimyasal)', ul: [
      '<strong>1 cal</strong> = 4,184 J',
      '<strong>10 cal</strong> = 41,84 J',
      '<strong>100 cal</strong> = 418,4 J',
      '<strong>1000 cal</strong> (1 kcal) = 4184 J = 4,184 kJ',
      '<strong>1 J</strong> ≈ 0,239 cal',
      '<strong>1000 J</strong> (1 kJ) ≈ 239,006 cal',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Lise ve üniversite sınavlarına hazırlanan öğrenciler ısı ve sıcaklık konusunda (Q = m·c·ΔT) öz ısıyı bazen cal/g·°C, bazen J/g·°C olarak görür; suyun öz ısısı birinde 1, diğerinde 4,184\'tür. Sonucu istenen birime taşımak için bu çeviri gerekir. Kimyada tepkime entalpileri eski kaynaklarda kalori, yeni kaynaklarda joule ile verilir; iki kaynağı karşılaştırırken birimleri eşitlemek şarttır.',
      'Laboratuvar raporlarında kalorimetre deneylerinin sonucu çoğunlukla joule olarak istenir. Eski tarihli teknik dokümanları, yabancı kaynaklı tabloları ya da cihaz kılavuzlarını okurken de aynı dönüşüme ihtiyaç duyulur.',
    ] },
    { h: 'Sınırlar ve gösterim', p: [
      'Araç negatif değer kabul etmez; işaretli enerji değişimleriyle (örneğin ekzotermik tepkimelerde eksi işaretli entalpi) çalışıyorsanız mutlak değeri çevirip işareti kendiniz ekleyin. Sonuçlar sekiz anlamlı basamağa yuvarlanır. Çok büyük sayılarda binlik ayraç olarak nokta kullanıldığını unutmayın: "1.046 J" bin kırk altı joule demektir, "1,046 kJ" ise ondalıklı bir değerdir.',
    ] },
  ],
  faq: [
    ['1 kalori kaç joule eder?', 'Termokimyasal tanıma göre 1 kalori tam olarak 4,184 joule\'dür. Uluslararası tablo kalorisi ise 4,1868 joule\'dür. Hangi tanımın geçerli olduğu belirtilmemişse 4,184 değeri kullanılır.'],
    ['1 joule kaç kaloridir?', '1 joule yaklaşık 0,239 kaloridir. Kesin değer 1 ÷ 4,184 işlemiyle bulunur ve 0,23900574 cal eder.'],
    ['4,18 mi, 4,184 mü, 4,186 mı kullanmalıyım?', 'Bunların hepsi aynı büyüklüğün farklı yuvarlamaları ya da tanımlarıdır. 4,18 kaba bir yuvarlamadır; 4,184 termokimyasal kaloridir; 4,186 ve 4,1868 ise uluslararası tablo kalorisine karşılık gelir. Sorunuz bir katsayı veriyorsa onu, vermiyorsa 4,184\'ü kullanın.'],
    ['Gıda etiketindeki kaloriyi bu araçla çevirebilir miyim?', 'Etiketlerdeki "kalori" gerçekte kilokaloridir. Etiketteki sayıyı 1000 ile çarpıp kalori olarak girebilir ya da doğrudan sonuçtaki kilokalori ve kilojoule satırlarını karşılaştırabilirsiniz. 1 kcal 4,184 kJ eder.'],
    ['Kalori SI birimi midir?', 'Hayır. SI\'da enerji, iş ve ısı için tek birim joule\'dür. Kalori alışkanlık nedeniyle özellikle beslenme alanında yaşamaya devam eden SI dışı bir birimdir.'],
    ['cal ile Cal arasında fark var mı?', 'Bazı İngilizce kaynaklarda büyük harfle yazılan "Cal" kilokaloriyi, küçük harfle yazılan "cal" ise küçük kaloriyi gösterir. Bu yazım kolayca karıştığı için kcal kısaltmasını kullanmak daha güvenlidir.'],
    ['Sonuçta neden nokta ve virgül birlikte görünüyor?', 'Türkçe sayı yazımında nokta binlik ayraç, virgül ondalık ayraçtır. Örneğin 1.046 J bin kırk altı joule, 23,9 cal ise yirmi üç onda dokuz kalori anlamına gelir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz sayılar herhangi bir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kcal-kj-cevir', 'kalori-kilokalori-cevir', 'kwh-joule-cevir', 'isi-enerjisi-hesapla', 'birim-donustur'],
};
