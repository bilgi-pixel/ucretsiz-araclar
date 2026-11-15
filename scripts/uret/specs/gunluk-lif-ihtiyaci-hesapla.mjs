export default {
  slug: 'gunluk-lif-ihtiyaci-hesapla',
  title: 'Günlük Lif İhtiyacı Hesaplama',
  h1Tail: 'yaş, cinsiyet ve kaloriye göre',
  pageTitle: 'Günlük Lif İhtiyacı Hesaplama – Günde Kaç Gram Lif Alınmalı?',
  description: 'Yaşınıza, cinsiyetinize ve günlük kalori alımınıza göre önerilen günlük lif miktarını gram olarak hesaplayın; mevcut alımınızla aradaki farkı görün.',
  card: 'Yaş, cinsiyet ve günlük kalorinizi girin; günde kaç gram lif almanız önerildiğini ve mevcut alımınızla farkı görün.',
  category: 'saglik',
  keywords: ['günlük lif ihtiyacı', 'günde kaç gram lif alınmalı', 'lif hesaplama', 'diyet lifi ihtiyacı', 'posa ihtiyacı hesaplama', 'lifli besinler', 'çocuklarda lif ihtiyacı', '1000 kalori 14 gram lif'],
  lead: 'Günde kaç gram lif (posa) almanız gerektiğini hesaplayın. Araç, yaş ve cinsiyete göre belirlenmiş yeterli alım değerlerini ve <strong>1000 kalori başına 14 gram</strong> kuralını birlikte gösterir; bugünkü alımınızı yazarsanız aradaki farkı da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'yas', label: 'Yaş', type: 'number', placeholder: 'Örn. 30' },
    { id: 'grup', label: 'Cinsiyet / durum', type: 'select', options: [['erkek', 'Erkek'], ['kadin', 'Kadın'], ['gebe', 'Kadın (gebe)'], ['emziren', 'Kadın (emziren)']] },
    { id: 'kalori', label: 'Günlük kalori alımı (kcal, isteğe bağlı)', type: 'number', placeholder: 'Örn. 2000', hint: 'Yazarsanız kaloriye göre lif miktarı da hesaplanır. Binlik ayraç kullanmayın.' },
    { id: 'mevcut', label: 'Şu anki günlük lif alımınız (g, isteğe bağlı)', type: 'number', placeholder: 'Örn. 15' },
  ],
  compute(v, h) {
    const bos = (x) => String(x ?? '').trim() === '';
    const yas = h.num(v.yas, 'Yaş');
    if (yas < 1 || yas > 120) h.err('"Yaş" 1 ile 120 arasında olmalı; bir yaşından küçük bebekler için lif önerisi tanımlı değildir.');
    const g = v.grup || 'erkek';
    const erkek = g === 'erkek';
    if ((g === 'gebe' || g === 'emziren') && yas < 14) h.err('Gebelik ve emzirme seçenekleri için yaş en az 14 olmalı.');
    let oneri;
    if (g === 'gebe') oneri = 28;
    else if (g === 'emziren') oneri = 29;
    else if (yas < 4) oneri = 19;
    else if (yas < 9) oneri = 25;
    else if (yas < 14) oneri = erkek ? 31 : 26;
    else if (yas < 19) oneri = erkek ? 38 : 26;
    else if (yas < 51) oneri = erkek ? 38 : 25;
    else oneri = erkek ? 30 : 21;
    const rows = [
      ['Önerilen günlük lif', oneri + ' g'],
      ['Öğün başına (3 ana öğün)', h.fmt(oneri / 3, 1) + ' g'],
    ];
    if (!bos(v.kalori)) {
      const kcal = h.pos(v.kalori, 'Günlük kalori alımı');
      if (kcal < 500 || kcal > 8000) h.err('"Günlük kalori alımı" 500 ile 8000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (örn. 2000).');
      rows.push(['Kaloriye göre lif (1000 kcal başına 14 g)', h.fmt((kcal / 1000) * 14, 1) + ' g']);
    }
    if (!bos(v.mevcut)) {
      const m = h.nonneg(v.mevcut, 'Şu anki günlük lif alımınız');
      if (m > 200) h.err('"Şu anki günlük lif alımınız" çok yüksek görünüyor; değeri gram olarak yazın.');
      rows.push(['Öneriyi karşılama oranı', '%' + h.fmt((m / oneri) * 100, 1)]);
      rows.push(['Öneriyle fark', m + 1e-9 >= oneri ? 'Öneriyi karşılıyorsunuz' : h.fmt(oneri - m, 1) + ' g eksik']);
    }
    return {
      rows,
      note: 'Değerler sağlıklı kişiler için genel yeterli alım düzeyleridir. Bağırsak hastalığı, ameliyat sonrası dönem ya da özel diyet gerektiren durumlarda hedefi hekiminiz ya da diyetisyeniniz belirler.',
    };
  },
  cases: [
    { in: { yas: '30', grup: 'erkek' }, out: { 'Önerilen günlük lif': '38 g', 'Öğün başına (3 ana öğün)': '12,7 g' } },
    { in: { yas: '30', grup: 'kadin', kalori: '2000' }, out: { 'Önerilen günlük lif': '25 g', 'Öğün başına (3 ana öğün)': '8,3 g', 'Kaloriye göre lif (1000 kcal başına 14 g)': '28 g' } },
    { in: { yas: '60', grup: 'erkek', kalori: '2500' }, out: { 'Önerilen günlük lif': '30 g', 'Kaloriye göre lif (1000 kcal başına 14 g)': '35 g' } },
    { in: { yas: '55', grup: 'kadin' }, out: { 'Önerilen günlük lif': '21 g', 'Öğün başına (3 ana öğün)': '7 g' } },
    { in: { yas: '6', grup: 'erkek' }, out: { 'Önerilen günlük lif': '25 g' } },
    { in: { yas: '12', grup: 'kadin' }, out: { 'Önerilen günlük lif': '26 g' } },
    { in: { yas: '12', grup: 'erkek' }, out: { 'Önerilen günlük lif': '31 g' } },
    { in: { yas: '2', grup: 'kadin' }, out: { 'Önerilen günlük lif': '19 g' } },
    { in: { yas: '28', grup: 'gebe' }, out: { 'Önerilen günlük lif': '28 g' } },
    { in: { yas: '32', grup: 'emziren' }, out: { 'Önerilen günlük lif': '29 g' } },
    { in: { yas: '30', grup: 'erkek', mevcut: '15' }, out: { 'Öneriyi karşılama oranı': '%39,5', 'Öneriyle fark': '23 g eksik' } },
    { in: { yas: '30', grup: 'kadin', mevcut: '27' }, out: { 'Öneriyi karşılama oranı': '%108', 'Öneriyle fark': 'Öneriyi karşılıyorsunuz' } },
    { in: { yas: '', grup: 'erkek' }, error: true },
    { in: { yas: '0', grup: 'kadin' }, error: true },
    { in: { yas: '30', grup: 'erkek', kalori: '2.000' }, error: true },
  ],
  howto: [
    '"Yaş" alanına yaşınızı yazın; çocuklar için de hesap yapabilirsiniz (1 yaş ve üzeri).',
    'Cinsiyetinizi seçin; gebelik ya da emzirme dönemindeyseniz ilgili seçeneği işaretleyin.',
    'Günlük kalori alımınızı biliyorsanız yazın; böylece 1000 kalori başına 14 gram kuralına göre miktar da gösterilir.',
    'Bugün yaklaşık kaç gram lif aldığınızı biliyorsanız son alana girin; araç öneriyi yüzde kaç karşıladığınızı ve eksiğinizi hesaplar.',
    '"Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Diyet lifi nedir?', p: [
      'Diyet lifi, Türkçede posa olarak da bilinen, bitkisel besinlerin ince bağırsakta sindirilmeyen bölümüdür. Tahılların kabuğu, sebze ve meyvelerin hücre duvarları, kuru baklagillerin zarı lif açısından zengindir. Hayvansal besinlerde lif bulunmaz.',
      'Lifler suda çözünme özelliğine göre iki gruba ayrılır. <strong>Çözünür lif</strong> su tutarak jel oluşturur; yulaf, arpa, kuru baklagiller, elma ve narenciye iyi kaynaklarıdır. Mide boşalmasını yavaşlatır, tokluk hissine katkıda bulunur. <strong>Çözünmez lif</strong> ise dışkı hacmini artırır ve bağırsak geçişini kolaylaştırır; tam buğday ürünleri, bulgur, kepek ve birçok sebzede bulunur. Çoğu bitkisel besin ikisini birlikte içerir, bu yüzden çeşitli beslenmek tek bir kaynağa yüklenmekten daha yararlıdır.',
    ] },
    { h: 'Hesaplama yöntemi', p: [
      'Araç iki yaklaşımı birlikte sunar. İlki, beslenme başvuru değerlerinde yaş ve cinsiyet gruplarına göre verilen <strong>yeterli alım</strong> düzeyleridir. İkincisi bu değerlerin dayandığı temel kuraldır: alınan her <strong>1000 kalori için 14 gram lif</strong>. Yaş-cinsiyet tablosu aslında bu kuralın, her grubun ortalama enerji alımına uygulanmış hâlidir. Kalori alımınız ortalamadan belirgin biçimde farklıysa (örneğin yoğun spor yapıyorsanız ya da az yiyorsanız) kaloriye göre hesap size daha yakın bir sayı verir.',
    ], ul: [
      '<strong>1–3 yaş:</strong> 19 g',
      '<strong>4–8 yaş:</strong> 25 g',
      '<strong>9–13 yaş:</strong> erkek 31 g, kız 26 g',
      '<strong>14–18 yaş:</strong> erkek 38 g, kız 26 g',
      '<strong>19–50 yaş:</strong> erkek 38 g, kadın 25 g',
      '<strong>51 yaş ve üzeri:</strong> erkek 30 g, kadın 21 g',
      '<strong>Gebelik:</strong> 28 g, <strong>emzirme:</strong> 29 g',
    ] },
    { h: 'Çözümlü örnek', p: [
      '30 yaşında bir kadın için tablo değeri <strong>25 g</strong>\'dır; üç ana öğüne bölündüğünde öğün başına yaklaşık 8,3 g eder. Aynı kişi günde 2000 kalori alıyorsa kaloriye göre hesap 2000 ÷ 1000 × 14 = <strong>28 g</strong> verir. İki sayı arasındaki küçük fark, tablonun bu yaş grubundaki kadınlar için daha düşük bir ortalama enerji alımını esas almasından kaynaklanır; ikisi de makul hedeflerdir.',
      '30 yaşında bir erkek için öneri 38 g\'dır. Günde yaklaşık 15 g lif alıyorsa öneriyi yüzde 39,5 oranında karşılıyor ve 23 g eksiği var demektir. Bu tablo oldukça yaygındır; birçok toplumda ortalama lif alımı önerilenin belirgin biçimde altındadır.',
    ] },
    { h: 'Sofrada lif: yaklaşık değerler', p: [
      'Aşağıdaki değerler yaklaşık ortalamalardır; ürünün çeşidine, olgunluğuna ve pişirme biçimine göre değişir. Paketli ürünlerde etiketteki "lif" ya da "diyet lifi" satırına bakın.',
    ], ul: [
      'Bir kâse pişmiş kuru fasulye, nohut ya da mercimek: yaklaşık 10–15 g',
      'Bir kâse pişmiş bulgur pilavı: yaklaşık 6–8 g',
      'İki dilim tam buğday ekmeği: yaklaşık 4–6 g',
      'Yarım su bardağı yulaf ezmesi (kuru): yaklaşık 4 g',
      'Kabuğuyla bir orta boy elma ya da armut: yaklaşık 4–5 g',
      'Bir porsiyon pişmiş brokoli, ıspanak ya da taze fasulye: yaklaşık 3–5 g',
      'Bir avuç badem ya da fındık: yaklaşık 3 g',
      'İki-üç kuru kayısı ya da kuru incir: yaklaşık 2–4 g',
    ] },
    { h: 'Lif alımını artırırken dikkat edilecekler', ul: [
      'Artışı birkaç haftaya yayın. Lifi birden çoğaltmak şişkinlik, gaz ve karın ağrısı yapabilir; bağırsakların alışması zaman alır.',
      'Yeterli su için. Lif su tutarak çalışır; sıvı az alındığında kabızlığı gidermek yerine artırabilir.',
      'Beyaz ekmek ve pirinç yerine tam tahıllı ekmek ve bulguru, meyve suyu yerine meyvenin kendisini tercih edin.',
      'Haftada birkaç öğün kuru baklagil yemek, hedefe yaklaşmanın en kolay yollarından biridir.',
      'Lif takviyeleri bazı ilaçların emilimini etkileyebilir; düzenli ilaç kullanıyorsanız takviyeye başlamadan önce hekiminize ya da eczacınıza danışın.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Buradaki değerler sağlıklı kişiler için genel bilgilendirme niteliğindedir. Farklı ülkelerin ve kurumların beslenme rehberlerinde erişkinler için 25–30 gram dolayında tek bir hedef verildiği de görülür; sayıların birbirinden biraz farklı olması olağandır. Bir yaşından küçük bebekler için tanımlı bir lif önerisi yoktur.',
      'İltihaplı bağırsak hastalığı, bağırsak darlığı, yakın zamanda geçirilmiş karın ameliyatı, huzursuz bağırsak sendromu ya da böbrek hastalığı gibi durumlarda lif miktarı ve türü kişiye özel ayarlanmalıdır. Bu sayfa tıbbi beslenme tedavisinin yerini tutmaz; özel durumlarda hekiminize ya da diyetisyeninize başvurun.',
    ] },
  ],
  faq: [
    ['Günde kaç gram lif alınmalı?', 'Yeterli alım değerlerine göre 19–50 yaş arası erkekler için 38 g, kadınlar için 25 g; 51 yaş üzeri erkekler için 30 g, kadınlar için 21 g önerilir. Genel kural 1000 kalori başına 14 gramdır.'],
    ['Lif ile posa aynı şey midir?', 'Evet. Posa, diyet lifinin Türkçedeki yaygın adıdır; ikisi de bitkisel besinlerin sindirilmeyen bölümünü ifade eder.'],
    ['Çocuklar için lif ihtiyacı ne kadardır?', '1–3 yaş için 19 g, 4–8 yaş için 25 g, 9–13 yaşta erkek çocuklar için 31 g, kız çocuklar için 26 g önerilir. Küçük çocuklarda lifi artırırken yeterli enerji almalarını engellememeye dikkat edilmelidir.'],
    ['Fazla lif zararlı olabilir mi?', 'Çok yüksek miktarlar, özellikle birden artırıldığında, gaz, şişkinlik ve karın ağrısına yol açabilir; bazı minerallerin emilimini de azaltabilir. Artışı kademeli yapmak ve yeterli su içmek bu sorunları azaltır.'],
    ['Lif kilo vermeye yardımcı olur mu?', 'Lifli besinler hacimlidir ve tokluk hissine katkıda bulunur; bu, toplam kalori alımını denetlemeyi kolaylaştırabilir. Ancak lif tek başına kilo verdirmez; belirleyici olan toplam enerji dengesidir.'],
    ['Günlük lif alımımı nasıl öğrenebilirim?', 'Bir iki gün boyunca yediklerinizi not edip paket etiketlerindeki lif değerlerini ve bu sayfadaki yaklaşık besin değerlerini toplayarak kaba bir tahmin elde edebilirsiniz.'],
    ['Lif takviyesi mi, besin mi?', 'Öncelik besinlerdir; sebze, meyve, tam tahıl ve baklagiller lifle birlikte vitamin ve mineral de sağlar. Takviye, beslenmeyle hedefe ulaşılamadığında ve hekim ya da diyetisyen önerisiyle düşünülmelidir.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yaş, kalori ve lif değerleriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kalori-hesapla', 'makro-besin-hesapla', 'protein-ihtiyaci-hesapla', 'su-ihtiyaci-hesapla', 'karbonhidrat-ihtiyaci-hesapla'],
};
