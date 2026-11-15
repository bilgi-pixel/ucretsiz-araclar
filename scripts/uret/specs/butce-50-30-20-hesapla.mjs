export default {
  slug: 'butce-50-30-20-hesapla',
  title: '50/30/20 Bütçe Kuralı Hesaplama',
  h1Tail: 'ihtiyaç, istek, birikim',
  pageTitle: '50/30/20 Bütçe Kuralı Hesaplama – Gelire Göre Bütçe Planı',
  description: 'Aylık net gelirinizi 50/30/20 kuralına göre ihtiyaç, istek ve birikim paylarına ayırın; mevcut harcamalarınızı yazarsanız hedeften ne kadar saptığınızı görün.',
  card: 'Net gelirinizi %50 ihtiyaç, %30 istek, %20 birikim olarak bölün; mevcut harcamalarınızı hedefle kıyaslayın.',
  category: 'finans',
  keywords: ['50 30 20 kuralı hesaplama', '50/30/20 bütçe kuralı', 'bütçe hesaplama', 'aylık bütçe planı', 'maaş bütçe planlama', 'kişisel bütçe hesaplama', 'ihtiyaç istek birikim'],
  lead: `Aylık net gelirinizi yazın, 50/30/20 kuralına göre ne kadarını zorunlu ihtiyaçlara, ne kadarını isteklere, ne kadarını birikim ve borç ödemesine ayırmanız gerektiğini görün. Bugünkü harcamalarınızı da girerseniz araç her kalemin hedefin <strong>üstünde mi altında mı</strong> olduğunu söyler.`,
  button: 'Hesapla',
  inputs: [
    { id: 'gelir', label: 'Aylık net gelir (TL)', type: 'number', placeholder: 'Örn. 40000', hint: 'Elinize geçen tutar. Binlik ayraç kullanmayın ya da 40.000,00 biçiminde yazın.' },
    { id: 'ihtiyac', label: 'Mevcut ihtiyaç harcamanız (isteğe bağlı)', type: 'number', placeholder: 'Örn. 24000', hint: 'Kira, fatura, market, ulaşım gibi zorunlu giderlerin aylık toplamı.' },
    { id: 'istek', label: 'Mevcut istek harcamanız (isteğe bağlı)', type: 'number', placeholder: 'Örn. 10000', hint: 'Dışarıda yemek, eğlence, abonelik, hobi gibi zorunlu olmayan giderler.' },
  ],
  compute(v, h) {
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const dolu = (s) => String(s ?? '').trim() !== '';
    const hIhtiyac = gelir * 0.5, hIstek = gelir * 0.3, hBirikim = gelir * 0.2;
    const rows = [
      ['İhtiyaçlar (%50)', h.para(hIhtiyac)],
      ['İstekler (%30)', h.para(hIstek)],
      ['Birikim ve borç ödemesi (%20)', h.para(hBirikim)],
      ['Yıllık birikim hedefi', h.para(hBirikim * 12)],
    ];
    let note = 'Paylar net gelir üzerinden hesaplanır. Oranlar bir başlangıç noktasıdır; yaşam koşullarınıza göre uyarlayabilirsiniz.';
    if (dolu(v.ihtiyac) || dolu(v.istek)) {
      if (!dolu(v.ihtiyac) || !dolu(v.istek)) h.err('Karşılaştırma için hem ihtiyaç hem istek harcamanızı yazın; harcama yoksa 0 girin.');
      const ihtiyac = h.nonneg(v.ihtiyac, 'Mevcut ihtiyaç harcamanız');
      const istek = h.nonneg(v.istek, 'Mevcut istek harcamanız');
      const durum = (gercek, hedef) => {
        const fark = gercek - hedef;
        if (Math.abs(fark) < 0.005) return 'Hedefte';
        return fark > 0 ? `Hedefin ${h.para(fark)} üzerinde` : `Hedefin ${h.para(-fark)} altında`;
      };
      const birikim = gelir - ihtiyac - istek;
      rows.push(['Mevcut ihtiyaç payı', '%' + h.fmt(ihtiyac / gelir * 100, 1)]);
      rows.push(['İhtiyaç durumu', durum(ihtiyac, hIhtiyac)]);
      rows.push(['Mevcut istek payı', '%' + h.fmt(istek / gelir * 100, 1)]);
      rows.push(['İstek durumu', durum(istek, hIstek)]);
      rows.push(['Mevcut birikim', h.para(birikim)]);
      rows.push(['Mevcut birikim oranı', '%' + h.fmt(birikim / gelir * 100, 1)]);
      note = birikim < 0
        ? 'Harcamalarınız gelirinizi aşıyor; aradaki fark borçla ya da birikimden karşılanıyor demektir.'
        : 'Mevcut birikim, gelirden ihtiyaç ve istek harcamalarının çıkarılmasıyla bulunur.';
    }
    return { rows, note };
  },
  cases: [
    { in: { gelir: '40000' }, out: { 'İhtiyaçlar (%50)': '20.000,00 TL', 'İstekler (%30)': '12.000,00 TL', 'Birikim ve borç ödemesi (%20)': '8.000,00 TL', 'Yıllık birikim hedefi': '96.000,00 TL' } },
    { in: { gelir: '50000', ihtiyac: '30000', istek: '12000' }, out: { 'İhtiyaçlar (%50)': '25.000,00 TL', 'Mevcut ihtiyaç payı': '%60', 'İhtiyaç durumu': 'Hedefin 5.000,00 TL üzerinde', 'Mevcut istek payı': '%24', 'İstek durumu': 'Hedefin 3.000,00 TL altında', 'Mevcut birikim': '8.000,00 TL', 'Mevcut birikim oranı': '%16' } },
    { in: { gelir: '35000' }, out: { 'İhtiyaçlar (%50)': '17.500,00 TL', 'İstekler (%30)': '10.500,00 TL', 'Birikim ve borç ödemesi (%20)': '7.000,00 TL' } },
    { in: { gelir: '17002' }, out: { 'İhtiyaçlar (%50)': '8.501,00 TL', 'İstekler (%30)': '5.100,60 TL', 'Birikim ve borç ödemesi (%20)': '3.400,40 TL', 'Yıllık birikim hedefi': '40.804,80 TL' } },
    { in: { gelir: '30000', ihtiyac: '24000', istek: '9000' }, out: { 'Mevcut ihtiyaç payı': '%80', 'İhtiyaç durumu': 'Hedefin 9.000,00 TL üzerinde', 'İstek durumu': 'Hedefte', 'Mevcut birikim': '-3.000,00 TL', 'Mevcut birikim oranı': '%-10' } },
    { in: { gelir: '40000', ihtiyac: '20000', istek: '12000' }, out: { 'İhtiyaç durumu': 'Hedefte', 'İstek durumu': 'Hedefte', 'Mevcut birikim': '8.000,00 TL', 'Mevcut birikim oranı': '%20' } },
    { in: { gelir: '0' }, error: true },
    { in: { gelir: '40000', ihtiyac: '20000' }, error: true },
    { in: { gelir: 'kırk bin' }, error: true },
  ],
  howto: [
    `"Aylık net gelir" alanına bir ayda elinize geçen toplam tutarı yazın. Maaşın yanında düzenli ek gelirleriniz varsa onları da ekleyin.`,
    `Yalnızca hedef payları görmek istiyorsanız diğer alanları boş bırakıp "Hesapla" düğmesine basın.`,
    `Mevcut durumunuzu kıyaslamak için son bir iki ayın hesap dökümüne bakın; zorunlu giderlerinizin toplamını "ihtiyaç", keyfî harcamalarınızın toplamını "istek" alanına yazın.`,
    `Yeniden hesaplayın. Araç her grubun gelirinize oranını, hedefin kaç lira üzerinde ya da altında kaldığınızı ve fiilen ne kadar biriktirebildiğinizi gösterir.`,
  ],
  sections: [
    { h: '50/30/20 kuralı nedir?', p: [
      `50/30/20 kuralı, kişisel bütçeyi üç büyük kovaya ayıran basit bir yöntemdir. Vergi sonrası gelirin yarısı yaşamı sürdürmek için kaçınılmaz olan <strong>ihtiyaçlara</strong>, yüzde otuzu hayatı keyifli kılan <strong>isteklere</strong>, kalan yüzde yirmisi <strong>birikime ve borç azaltmaya</strong> ayrılır. Her harcamayı tek tek kategorilere dağıtmayı gerektirmediği için bütçe tutmaya yeni başlayanlar tarafından sıkça tercih edilir.`,
      `Kuralın gücü ayrıntıda değil, önceliklendirmededir. Ay sonunda "param nereye gitti" sorusuna otuz kalemlik bir tablo yerine üç rakamla yanıt verir ve birikimi "artarsa yapılır" bir kalem olmaktan çıkarıp bütçenin sabit bir parçası haline getirir.`,
    ] },
    { h: 'Üç kovaya ne girer?', ul: [
      `<strong>İhtiyaçlar (%50):</strong> kira ya da konut kredisi taksiti, aidat, elektrik, su, doğal gaz, internet ve telefon faturaları, temel market alışverişi, işe ve okula ulaşım, zorunlu sigortalar, sağlık giderleri, çocukların okul ve bakım masrafları ile borçların asgari ödemeleri.`,
      `<strong>İstekler (%30):</strong> dışarıda yemek ve kahve, tatil, sinema ve konser, dizi ve müzik abonelikleri, hobi malzemeleri, ihtiyaç ötesi giyim, yeni telefon gibi yükseltmeler, hediye ve keyfî alışverişler.`,
      `<strong>Birikim ve borç (%20):</strong> acil durum fonu, vadeli hesap ve yatırımlar, bireysel emeklilik katkısı, ev ya da araç peşinatı için ayrılan para ve borçların asgari tutarın üzerindeki ek ödemeleri.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Aylık net geliri 40.000 TL olan biri için hedefler şöyledir: ihtiyaçlar 40.000 × 0,50 = 20.000,00 TL, istekler 40.000 × 0,30 = 12.000,00 TL, birikim ve borç ödemesi 40.000 × 0,20 = 8.000,00 TL. Bu tempo korunursa bir yılda 8.000 × 12 = 96.000,00 TL kenara konmuş olur.`,
      `Şimdi mevcut harcamalarla kıyaslayalım. Net geliri 50.000 TL olan bir çalışan, zorunlu giderlerine 30.000 TL, isteklerine 12.000 TL harcıyor olsun. Hedefler 25.000, 15.000 ve 10.000 TL'dir. İhtiyaç harcaması gelirin %60'ına denk gelir ve hedefin 5.000,00 TL üzerindedir; istek harcaması %24 ile hedefin 3.000,00 TL altındadır. Geriye 50.000 − 30.000 − 12.000 = 8.000,00 TL kalır; bu da %16'lık bir birikim oranıdır. Tablo, sorunun keyfî harcamalarda değil sabit giderlerde olduğunu ve %20 hedefine 2.000 TL uzak kalındığını açıkça gösterir.`,
    ] },
    { h: 'İhtiyaç mı, istek mi?', p: [
      `Kuralı uygularken en çok zorlanılan yer bu ayrımdır. İşe yarayan soru şudur: "Bu harcamayı yapmazsam yaşamım ya da işim ciddi biçimde aksar mı?" Temel market alışverişi ihtiyaçtır, hazır yemek siparişi istektir. İnternet bağlantısı ihtiyaçtır, en yüksek hızlı paket istektir. İşe gitmek için kullanılan toplu taşıma ihtiyaçtır, aynı yolu taksiyle gitmek çoğu durumda istektir.`,
      `Bazı kalemler ikiye bölünür: telefon faturasının temel kısmı ihtiyaç, cihaz taksidi ise büyük olasılıkla istektir. Kendinize karşı dürüst olmak, yöntemin işe yaraması için tek koşuldur; bir harcamayı ihtiyaç kovasına taşımak onu daha karşılanabilir yapmaz.`,
    ] },
    { h: 'Oranlar tutmuyorsa', p: [
      `Büyük şehirlerde kira tek başına gelirin önemli bir bölümünü alabildiği için ihtiyaç payının %50'yi aşması sık rastlanan bir durumdur. Bu, kuralın işe yaramadığı anlamına gelmez; hedefin şimdilik uyarlanması gerektiğini gösterir. Bazı haneler 60/20/20 ya da 70/20/10 gibi oranlarla başlar ve gelir arttıkça ya da sabit giderler azaldıkça klasik dağılıma yaklaşır.`,
    ], ul: [
      `Önce birikim payını korumaya çalışın; kesinti gerekiyorsa isteklerden başlayın.`,
      `Sabit giderleri yılda bir gözden geçirin: kullanılmayan abonelikler, pahalı tarife ve sigorta poliçeleri hızlı tasarruf kalemleridir.`,
      `Birikimi maaş gününde otomatik olarak ayrı bir hesaba aktarmak, ay sonunda kalanı biriktirmeye çalışmaktan daha etkilidir.`,
      `Yüksek faizli borcunuz varsa %20'lik payın önemli bölümünü önce bu borcu kapatmaya yönlendirmek genellikle daha mantıklıdır.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Araç yalnızca yüzde hesabı yapar; harcamalarınızı sizin yerinize sınıflandırmaz ve gelirinizin düzensiz olduğu ayları hesaba katmaz. Geliri aydan aya değişenler son altı ya da on iki ayın ortalamasını kullanabilir. 50/30/20 bir yasa değil, pratik bir başlangıç noktasıdır; yüksek enflasyon dönemlerinde ya da tek gelirli kalabalık hanelerde oranları tutturmak mümkün olmayabilir. Sonuçlar bilgilendirme amaçlıdır ve yatırım ya da mali danışmanlık niteliği taşımaz; önemli mali kararlarda bir uzmana danışın.`,
    ] },
  ],
  faq: [
    ['50/30/20 kuralı nasıl hesaplanır?', `Aylık net gelir 0,50, 0,30 ve 0,20 ile çarpılır. 40.000 TL gelir için ihtiyaçlara 20.000 TL, isteklere 12.000 TL, birikim ve borç ödemesine 8.000 TL düşer.`],
    ['Hesap brüt gelir üzerinden mi net gelir üzerinden mi yapılır?', `Net, yani vergi ve kesintilerden sonra elinize geçen gelir üzerinden yapılır. Harcayabileceğiniz para bu olduğu için bütçe de bu tutara göre kurulur.`],
    ['Kredi taksiti hangi gruba girer?', `Ödenmediğinde yasal sonuç doğuran zorunlu taksitler ve asgari ödemeler ihtiyaç grubunda sayılır. Borcu daha hızlı bitirmek için asgari tutarın üzerine yaptığınız ek ödemeler ise %20'lik birikim ve borç payına yazılır.`],
    ['İhtiyaçlarım gelirimin yarısını aşıyorsa ne yapmalıyım?', `Önce oranı kendinize uyarlayın; örneğin 60/20/20 ile başlayın. Ardından en büyük sabit kalemleri (konut, ulaşım, faturalar) gözden geçirin. Kısa vadede esneklik isteklerde, uzun vadede ise sabit giderlerde ve gelir artışındadır.`],
    ['Birikim oranım eksi çıktı, bu ne demek?', `İhtiyaç ve istek harcamalarınızın toplamı gelirinizi aşıyor demektir. Aradaki fark kredi kartı borcu, ek hesap ya da önceki birikimlerle kapanıyordur. Bu durumda ilk hedef, harcamayı gelir düzeyine indirmektir.`],
    ['Düzensiz gelirim varsa kuralı nasıl uygularım?', `Son altı ila on iki ayın ortalama net gelirini kullanın ve yüksek gelirli aylarda fazlayı birikime aktarın. Sabit giderleri, en düşük gelirli ayınızın karşılayabileceği düzeyde tutmak güvenli bir yaklaşımdır.`],
    ['%20 birikim yeterli mi?', `Bu, hedeflerinize ve yaşınıza bağlıdır; kural yalnızca genel bir başlangıç önerir. Önce birkaç aylık gideri karşılayacak bir acil durum fonu oluşturmak, ardından uzun vadeli hedefler için düzenli birikime geçmek yaygın bir sıralamadır.`],
    ['Gelir ve harcama bilgilerim saklanıyor mu?', `Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız gelir ve harcama rakamları sunucuya gönderilmez ve kaydedilmez.`],
  ],
  related: ['tasarruf-orani-hesapla', 'hedef-birikim-suresi-hesapla', 'aylik-odeme-gucu-hesapla', 'borc-odeme-plani-hesapla', 'satin-alma-gucu-hesapla'],
};
