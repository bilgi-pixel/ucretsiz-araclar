export default {
  slug: 'borc-odeme-plani-hesapla',
  title: 'Borç Ödeme Planı Hesaplama',
  h1Tail: 'borç kaç ayda biter?',
  pageTitle: 'Borç Ödeme Planı Hesaplama – Borcum Kaç Ayda Biter?',
  description: 'Borç tutarı, aylık faiz oranı ve sabit aylık ödemenizi girin; borcun kaç ayda biteceğini, toplam faizi, toplam ödemeyi ve ay ay ödeme tablosunu görün.',
  card: 'Borç, aylık faiz ve sabit ödemeden borcun kaç ayda biteceğini, toplam faizi ve ay ay ödeme tablosunu çıkarın.',
  category: 'finans',
  keywords: ['borç ödeme planı hesaplama', 'borç kaç ayda biter', 'borç kapatma hesaplama', 'kredi kartı borcu ödeme planı', 'aylık ödeme ile borç bitirme', 'toplam faiz hesaplama', 'borç ödeme tablosu'],
  lead: `Her ay sabit bir tutar ödeyerek borcunuzu ne zaman bitireceğinizi hesaplayın. Borç tutarını, aylık faiz oranını ve ayırabildiğiniz aylık ödemeyi yazın; araç borcun <strong>kaç ayda kapanacağını</strong>, toplamda ne kadar faiz ödeyeceğinizi ve her ayın faiz-anapara dağılımını çıkarır.`,
  button: 'Hesapla',
  inputs: [
    { id: 'borc', label: 'Borç tutarı (TL)', type: 'number', placeholder: 'Örn. 10000', hint: 'Bugünkü kalan borç. Binlik ayraç kullanmayın ya da 10.000,00 biçiminde yazın.' },
    { id: 'faiz', label: 'Aylık faiz oranı (%)', type: 'number', placeholder: 'Örn. 2', hint: 'Faizsiz borç için 0 yazın. Faiz üzerinden alınan vergi ve fonlar varsa bunları içeren oranı girin.' },
    { id: 'odeme', label: 'Aylık ödeme (TL)', type: 'number', placeholder: 'Örn. 1000', hint: 'Her ay düzenli olarak ödeyebileceğiniz sabit tutar. Binlik ayraç kullanmayın.' },
  ],
  compute(v, h) {
    const borc = h.pos(v.borc, 'Borç tutarı');
    const faiz = h.nonneg(v.faiz, 'Aylık faiz oranı');
    const odeme = h.pos(v.odeme, 'Aylık ödeme');
    const r = faiz / 100;
    const ilkFaiz = borc * r;
    if (odeme <= ilkFaiz + 1e-9) h.err(`Aylık ödeme ilk ayın faizini (${h.para(ilkFaiz)}) karşılamıyor; bu ödemeyle borç azalmaz. Daha yüksek bir ödeme yazın.`);
    let kalan = borc, ay = 0, toplamFaiz = 0, son = 0;
    const satirlar = [];
    while (kalan > 0.005) {
      if (ay >= 1200) h.err('Bu ödemeyle borç 100 yılda bile bitmiyor; aylık ödemeyi artırın.');
      const f = kalan * r;
      son = Math.min(odeme, kalan + f);
      kalan = kalan + f - son;
      if (kalan < 0.005) kalan = 0;
      toplamFaiz += f;
      ay++;
      if (ay <= 60) satirlar.push(`${ay} | ${h.para(son)} | ${h.para(f)} | ${h.para(son - f)} | ${h.para(kalan)}`);
    }
    const yil = Math.floor(ay / 12), artan = ay % 12;
    const sure = ay < 12 ? `${ay} ay` : `${ay} ay (${yil} yıl${artan ? ` ${artan} ay` : ''})`;
    let metin = 'Ay | Ödeme | Faiz | Anapara | Kalan borç\n' + satirlar.join('\n');
    if (ay > 60) metin += `\n… (toplam ${ay} ay; tabloda ilk 60 ay gösterilir)`;
    return {
      rows: [
        ['Borcun biteceği süre', sure],
        ['Toplam faiz', h.para(toplamFaiz)],
        ['Toplam ödeme', h.para(borc + toplamFaiz)],
        ['Son ay ödemesi', h.para(son)],
        ['İlk ay faizi', h.para(ilkFaiz)],
      ],
      text: metin,
      note: 'Faiz her ay kalan borca uygulanır ve oranın dönem boyunca sabit kaldığı varsayılır. Gecikme faizi, masraf ve yeni harcamalar hesaba katılmaz.',
    };
  },
  cases: [
    { in: { borc: '10000', faiz: '2', odeme: '1000' }, out: { 'Borcun biteceği süre': '12 ay (1 yıl)', 'Toplam faiz': '1.270,33 TL', 'Toplam ödeme': '11.270,33 TL', 'Son ay ödemesi': '270,33 TL', 'İlk ay faizi': '200,00 TL' }, textMatch: '1 \\| 1\\.000,00 TL \\| 200,00 TL \\| 800,00 TL \\| 9\\.200,00 TL\\n2 \\| 1\\.000,00 TL \\| 184,00 TL \\| 816,00 TL \\| 8\\.384,00 TL' },
    { in: { borc: '12000', faiz: '0', odeme: '1000' }, out: { 'Borcun biteceği süre': '12 ay (1 yıl)', 'Toplam faiz': '0,00 TL', 'Toplam ödeme': '12.000,00 TL', 'Son ay ödemesi': '1.000,00 TL' } },
    { in: { borc: '1000', faiz: '10', odeme: '600' }, out: { 'Borcun biteceği süre': '2 ay', 'Toplam faiz': '150,00 TL', 'Toplam ödeme': '1.150,00 TL', 'Son ay ödemesi': '550,00 TL' }, textMatch: '1 \\| 600,00 TL \\| 100,00 TL \\| 500,00 TL \\| 500,00 TL\\n2 \\| 550,00 TL \\| 50,00 TL \\| 500,00 TL \\| 0,00 TL$' },
    { in: { borc: '50000', faiz: '3,5', odeme: '5000' }, out: { 'Borcun biteceği süre': '13 ay (1 yıl 1 ay)', 'Toplam faiz': '12.632,65 TL', 'Toplam ödeme': '62.632,65 TL', 'Son ay ödemesi': '2.632,65 TL' } },
    { in: { borc: '100000', faiz: '1', odeme: '8884,88' }, out: { 'Borcun biteceği süre': '12 ay (1 yıl)', 'Toplam faiz': '6.618,55 TL', 'Son ay ödemesi': '8.884,87 TL' } },
    { in: { borc: '20000', faiz: '4', odeme: '2500' }, out: { 'Borcun biteceği süre': '10 ay', 'Toplam faiz': '4.589,62 TL', 'Son ay ödemesi': '2.089,62 TL' } },
    { in: { borc: '10000', faiz: '0', odeme: '3000' }, out: { 'Borcun biteceği süre': '4 ay', 'Toplam ödeme': '10.000,00 TL', 'Son ay ödemesi': '1.000,00 TL' } },
    { in: { borc: '10000', faiz: '2', odeme: '300' }, out: { 'Borcun biteceği süre': '56 ay (4 yıl 8 ay)', 'Toplam faiz': '6.644,17 TL' } },
    { in: { borc: '10000', faiz: '5', odeme: '500' }, error: true },
    { in: { borc: '10000', faiz: '5', odeme: '400' }, error: true },
    { in: { borc: '0', faiz: '2', odeme: '1000' }, error: true },
  ],
  howto: [
    `"Borç tutarı" alanına bugün itibarıyla kalan borcunuzu yazın; ekstrenizde ya da kredi dökümünüzde yer alan güncel bakiyeyi kullanın.`,
    `"Aylık faiz oranı" alanına borca uygulanan aylık oranı yüzde olarak girin. Elinizde yıllık oran varsa önce aylığa çevirin; faizsiz bir borçta 0 yazın.`,
    `"Aylık ödeme" alanına her ay aksatmadan ödeyebileceğiniz tutarı yazın.`,
    `"Hesapla" düğmesine basın. Üstte borcun biteceği süre, toplam faiz ve toplam ödeme; altta her ay için ödeme, faiz, anapara ve kalan borcu gösteren tablo yer alır.`,
    `Aylık ödemeyi biraz artırıp yeniden hesaplayarak sürenin ve toplam faizin nasıl değiştiğini karşılaştırın.`,
  ],
  sections: [
    { h: 'Hesap nasıl yapılır?', p: [
      `Araç borcu ay ay ilerletir. Her ayın başında kalan borca aylık faiz oranı uygulanır ve o ayın faizi bulunur. Yaptığınız ödemenin önce bu faizi karşıladığı, artan kısmın ise anaparadan düştüğü kabul edilir. Yeni kalan borç bir sonraki ayın faizine esas olur ve işlem borç sıfırlanana kadar tekrarlanır. Son ay, kalan borç ile o ayın faizi toplamı aylık ödemeden küçük olduğu için daha düşük bir tutar ödenir.`,
      `Formülle ifade edilirse: <strong>faiz = kalan borç × aylık oran</strong>, <strong>anapara ödemesi = aylık ödeme − faiz</strong>, <strong>yeni kalan borç = kalan borç − anapara ödemesi</strong>. Borç azaldıkça faiz payı küçülür, aynı ödemenin daha büyük bölümü anaparaya gider; bu yüzden borç sonlara doğru hızlanarak erir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `10.000 TL borcunuz, %2 aylık faiz oranınız olsun ve her ay 1.000 TL ödeyin. İlk ay faiz 10.000 × 0,02 = 200,00 TL'dir; ödemenin 800,00 TL'si anaparaya gider ve borç 9.200,00 TL'ye düşer. İkinci ay faiz 9.200 × 0,02 = 184,00 TL, anapara ödemesi 816,00 TL, kalan borç 8.384,00 TL olur.`,
      `Bu şekilde devam edildiğinde borç 12. ayda biter. On bir ay boyunca 1.000 TL, son ay yalnızca 270,33 TL ödenir. Toplam ödeme 11.270,33 TL, toplam faiz 1.270,33 TL'dir. Araçtaki tablo bu on iki satırın tamamını gösterir; kendi hesabınızla satır satır karşılaştırabilirsiniz.`,
    ] },
    { h: 'Aylık ödemeyi artırmanın etkisi', p: [
      `Aynı 10.000 TL borç ve %2 aylık faiz için farklı ödeme tutarlarının sonucu aşağıdadır. Ödeme düştükçe sürenin ve faizin ne kadar hızlı büyüdüğüne dikkat edin.`,
    ], ul: [
      `Aylık <strong>300 TL</strong>: 56 ay, toplam faiz 6.644,17 TL`,
      `Aylık <strong>500 TL</strong>: 26 ay, toplam faiz 2.898,73 TL`,
      `Aylık <strong>1.000 TL</strong>: 12 ay, toplam faiz 1.270,33 TL`,
      `Aylık <strong>1.500 TL</strong>: 8 ay, toplam faiz 842,14 TL`,
      `Aylık <strong>2.000 TL</strong>: 6 ay, toplam faiz 645,38 TL`,
    ] },
    { h: 'Ödeme faizi karşılamıyorsa', p: [
      `Aylık ödeme, ilk ayın faizine eşit ya da ondan küçükse borç hiç azalmaz; hatta ödeme faizin altındaysa her ay büyür. 10.000 TL borçta %5 aylık faiz 500 TL eder; ayda 500 TL ödeyen biri yalnızca faizi karşılar ve borç sonsuza kadar 10.000 TL kalır. Araç bu durumda hesap yapmaz ve gereken en düşük tutarı bildirir.`,
      `Kredi kartlarında yalnızca asgari tutarı ödemek benzer bir tuzak yaratır: ödemenin büyük kısmı faize gider ve anapara çok yavaş azalır. Bu yüzden ödeme tutarını ilk ay faizinin belirgin biçimde üzerinde tutmak gerekir. Sonuç kutusundaki "İlk ay faizi" satırı bu eşiği gösterir.`,
    ] },
    { h: 'Birden fazla borcu olanlar için iki yaklaşım', p: [
      `Birkaç borcu aynı anda ödeyenler için kişisel finans kaynaklarında iki yöntem sıkça anlatılır. Her ikisinde de tüm borçların asgari ödemesi yapılır, artan para tek bir borca yönlendirilir; fark hangi borcun seçildiğindedir.`,
    ], ul: [
      `<strong>Çığ yöntemi:</strong> artan para faiz oranı en yüksek borca gider. Matematiksel olarak en az toplam faizi ödeten yoldur.`,
      `<strong>Kartopu yöntemi:</strong> artan para bakiyesi en küçük borca gider. Borçlar tek tek kapandıkça motivasyon artar; toplam faiz biraz daha yüksek olabilir.`,
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      `Hesap, faiz oranının ve aylık ödemenin baştan sona sabit kaldığını, ödemelerin her ay tam ve zamanında yapıldığını, borca yeni harcama eklenmediğini varsayar. Gerçek kredi ve kredi kartı hesaplarında faiz günlük işletilebilir, faiz üzerinden vergi ve fon alınabilir, gecikme faizi ve masraflar eklenebilir, oranlar dönem içinde değişebilir. Bu nedenle sonuçlar bankanızın çıkaracağı ödeme planıyla kuruşu kuruşuna örtüşmeyebilir.`,
      `Bu araç bilgilendirme amaçlıdır ve mali danışmanlık yerine geçmez. Yapılandırma, erken kapama ya da borç birleştirme gibi kararlar almadan önce bankanızdan güncel ödeme planını isteyin, güncel mevzuatı kontrol edin ve gerekiyorsa bir uzmana danışın.`,
    ] },
  ],
  faq: [
    ['Borcum kaç ayda biter, nasıl hesaplanır?', `Her ay kalan borca faiz eklenir, ödemeniz düşülür ve borç sıfırlanana kadar bu işlem tekrarlanır. 10.000 TL borç, %2 aylık faiz ve 1.000 TL aylık ödemeyle borç 12 ayda biter. Araç bu adımları otomatik yapıp ay sayısını verir.`],
    ['Yıllık faiz oranını aylığa nasıl çeviririm?', `Basit yaklaşımla yıllık oranı 12'ye bölebilirsiniz; %36 yıllık oran aylık %3 eder. Bileşik hesapla sonuç biraz farklı çıkar. Sözleşmenizde ya da ekstrenizde yazan aylık oranı kullanmak en doğrusudur.`],
    ['Aylık ödeme için en az ne kadar yazmalıyım?', `Ödeme, ilk ayın faizinden büyük olmalıdır; aksi halde borç azalmaz. Sonuçtaki "İlk ay faizi" satırı bu alt sınırı gösterir. Borcun makul sürede bitmesi için ödemenin bu tutarın belirgin biçimde üzerinde olması gerekir.`],
    ['Son ay ödemesi neden daha düşük?', `Son aya gelindiğinde kalan borç ile o ayın faizi toplamı, sabit aylık ödemenizden küçük kalır. Borcu kapatmak için yalnızca bu kalan tutarı ödemeniz yeterlidir.`],
    ['Faizsiz borç için kullanabilir miyim?', `Evet. Faiz oranına 0 yazın. Araç borcu aylık ödemeye böler; 12.000 TL borç ayda 1.000 TL ile tam 12 ayda biter ve toplam faiz sıfır olur.`],
    ['Sonuç bankamın ödeme planıyla neden birebir aynı değil?', `Bankalar faizi gün esasına göre hesaplayabilir, faiz üzerinden vergi ve fon tahsil edebilir, taksitleri eşit tutacak biçimde planlayabilir. Bu araç aylık dönemlerle ve sizin girdiğiniz tek oranla sadeleştirilmiş bir hesap yapar.`],
    ['Arada ek ödeme yaparsam ne olur?', `Ek ödeme doğrudan anaparayı azaltır ve sonraki ayların faizini düşürür. Etkisini görmek için ek ödemeden sonraki kalan borcu yeni borç tutarı olarak girip yeniden hesaplayabilirsiniz.`],
    ['Borç bilgilerim kaydediliyor ya da paylaşılıyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; borç tutarı, faiz ve ödeme bilgileriniz hiçbir sunucuya gönderilmez, saklanmaz.`],
  ],
  related: ['kredi-erken-kapama-hesapla', 'taksit-hesapla', 'aylik-yillik-faiz-cevir', 'aylik-odeme-gucu-hesapla', 'tasarruf-orani-hesapla', 'butce-50-30-20-hesapla'],
};
