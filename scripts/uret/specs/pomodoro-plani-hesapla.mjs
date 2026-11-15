export default {
  slug: 'pomodoro-plani-hesapla',
  title: 'Pomodoro Planı Hesaplama',
  h1Tail: 'saat saat çalışma ve mola çizelgesi',
  pageTitle: "Pomodoro Planı Hesaplama – Çalışma ve Mola Saatleri Çizelgesi",
  description: "Elinizdeki süreye kaç pomodoro sığar? Çalışma, kısa mola ve uzun mola sürelerini girin; saat saat pomodoro planınızı ve net çalışma sürenizi görün.",
  card: "Toplam sürenizi ve başlangıç saatinizi girin; kaç pomodoro sığdığını ve saat saat çalışma-mola çizelgesini alın.",
  category: 'egitim',
  keywords: ['pomodoro planı', 'pomodoro hesaplama', 'pomodoro tekniği', '25 dakika çalışma 5 dakika mola', 'pomodoro çizelgesi', 'kaç pomodoro eder', 'ders çalışma mola planı'],
  lead: "Ayırabildiğiniz toplam süreyi, çalışma ve mola uzunluklarını ve başlangıç saatinizi girin. Araç bu süreye <strong>kaç pomodoro sığdığını</strong>, net çalışma ve mola toplamını hesaplar; her oturumun ve molanın başlangıç-bitiş saatini satır satır listeler.",
  button: 'Planı oluştur',
  inputs: [
    { id: 'toplam', label: 'Toplam süre (dakika)', type: 'number', placeholder: 'Örn. 240', hint: 'Masada geçireceğiniz toplam zaman; molalar dahil.' },
    { id: 'calisma', label: 'Çalışma süresi (dakika)', type: 'number', value: '25' },
    { id: 'kisaMola', label: 'Kısa mola (dakika)', type: 'number', value: '5' },
    { id: 'uzunMola', label: 'Uzun mola (dakika)', type: 'number', value: '15' },
    { id: 'tur', label: 'Uzun mola kaç pomodoroda bir', type: 'number', value: '4' },
    { id: 'baslangic', label: 'Başlangıç saati', type: 'text', value: '09:00', hint: 'SS:DD biçiminde, örn. 14:30' },
  ],
  compute(v, h) {
    const toplam = h.posint(v.toplam, 'Toplam süre');
    const calisma = h.posint(v.calisma, 'Çalışma süresi');
    const kisa = h.posint(v.kisaMola, 'Kısa mola');
    const uzun = h.posint(v.uzunMola, 'Uzun mola');
    const tur = h.posint(v.tur, 'Uzun mola sıklığı');
    if (toplam > 1440) h.err('Toplam süre 1440 dakikadan (24 saat) fazla olamaz.');
    if (calisma > toplam) h.err('Toplam süre bir çalışma oturumuna yetmiyor; toplam süreyi artırın ya da çalışma süresini kısaltın.');
    const m = /^(\d{1,2})[:.](\d{2})$/.exec(String(v.baslangic ?? '').trim());
    if (!m || +m[1] > 23 || +m[2] > 59) h.err('Başlangıç saatini SS:DD biçiminde yazın (örn. 09:00).');
    const bas = +m[1] * 60 + +m[2];
    const saat = (t) => {
      const x = (bas + t) % 1440;
      return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0');
    };
    const sure = (d) => (d >= 60 ? `${Math.floor(d / 60)} saat ${d % 60} dakika` : `${d} dakika`);
    const satirlar = [];
    let t = 0, n = 0, mola = 0;
    while (t + calisma <= toplam) {
      n++;
      satirlar.push(`${saat(t)} – ${saat(t + calisma)}  ${n}. pomodoro (${calisma} dk)`);
      t += calisma;
      const mo = n % tur === 0 ? uzun : kisa;
      if (t + mo + calisma > toplam) break;
      satirlar.push(`${saat(t)} – ${saat(t + mo)}  ${n % tur === 0 ? 'Uzun mola' : 'Kısa mola'} (${mo} dk)`);
      t += mo;
      mola += mo;
    }
    const ertesi = bas + t >= 1440 ? ' (ertesi gün)' : '';
    return {
      rows: [
        ['Pomodoro sayısı', `${n} pomodoro`],
        ['Net çalışma süresi', sure(n * calisma)],
        ['Toplam mola', sure(mola)],
        ['Bitiş saati', saat(t) + ertesi],
        ['Artan süre', sure(toplam - t)],
      ],
      text: satirlar.join('\n'),
      note: 'Ardından yeni bir oturum sığmayan mola plana eklenmez; artan süre son oturumdan sonra boşta kalan zamandır.',
    };
  },
  cases: [
    { in: { toplam: '240', calisma: '25', kisaMola: '5', uzunMola: '15', tur: '4', baslangic: '09:00' }, out: { 'Pomodoro sayısı': '7 pomodoro', 'Net çalışma süresi': '2 saat 55 dakika', 'Toplam mola': '40 dakika', 'Bitiş saati': '12:35', 'Artan süre': '25 dakika' } },
    { in: { toplam: '120', calisma: '25', kisaMola: '5', uzunMola: '15', tur: '4', baslangic: '14:00' }, out: { 'Pomodoro sayısı': '4 pomodoro', 'Net çalışma süresi': '1 saat 40 dakika', 'Toplam mola': '15 dakika', 'Bitiş saati': '15:55', 'Artan süre': '5 dakika' } },
    { in: { toplam: '60', calisma: '25', kisaMola: '5', uzunMola: '15', tur: '4', baslangic: '09:00' }, out: { 'Pomodoro sayısı': '2 pomodoro', 'Net çalışma süresi': '50 dakika', 'Toplam mola': '5 dakika', 'Bitiş saati': '09:55' }, text: '09:00 – 09:25  1. pomodoro (25 dk)\n09:25 – 09:30  Kısa mola (5 dk)\n09:30 – 09:55  2. pomodoro (25 dk)' },
    { in: { toplam: '300', calisma: '50', kisaMola: '10', uzunMola: '30', tur: '2', baslangic: '20:00' }, out: { 'Pomodoro sayısı': '4 pomodoro', 'Net çalışma süresi': '3 saat 20 dakika', 'Toplam mola': '50 dakika', 'Bitiş saati': '00:10 (ertesi gün)', 'Artan süre': '50 dakika' } },
    { in: { toplam: '25', calisma: '25', kisaMola: '5', uzunMola: '15', tur: '4', baslangic: '08:30' }, out: { 'Pomodoro sayısı': '1 pomodoro', 'Net çalışma süresi': '25 dakika', 'Toplam mola': '0 dakika', 'Bitiş saati': '08:55', 'Artan süre': '0 dakika' } },
    { in: { toplam: '480', calisma: '25', kisaMola: '5', uzunMola: '15', tur: '4', baslangic: '09:00' }, out: { 'Pomodoro sayısı': '15 pomodoro', 'Net çalışma süresi': '6 saat 15 dakika', 'Toplam mola': '1 saat 40 dakika', 'Bitiş saati': '16:55', 'Artan süre': '5 dakika' } },
    { in: { toplam: '20', calisma: '25', kisaMola: '5', uzunMola: '15', tur: '4', baslangic: '09:00' }, error: true },
    { in: { toplam: '240', calisma: '25', kisaMola: '5', uzunMola: '15', tur: '4', baslangic: '25:00' }, error: true },
  ],
  howto: [
    "<strong>Toplam süre</strong> alanına masada geçirebileceğiniz zamanı dakika olarak yazın; örneğin dört saat için 240.",
    "Çalışma, kısa mola ve uzun mola sürelerini isteğinize göre düzenleyin. Klasik düzen 25 dakika çalışma, 5 dakika kısa mola ve dört oturumda bir 15 dakika uzun moladır.",
    "<strong>Başlangıç saati</strong> alanına masaya oturacağınız saati SS:DD biçiminde girin.",
    "Planı oluştur düğmesine basın. Üstte özet değerler, altındaki kutuda ise her oturum ve molanın saat aralığı görünür.",
    "Çizelgeyi kopyalayıp not uygulamanıza ya da ajandanıza yapıştırın; süreler size uymuyorsa değerleri değiştirip yeniden deneyin.",
  ],
  sections: [
    { h: 'Pomodoro tekniği nedir?', p: [
      "Pomodoro tekniği, çalışmayı kısa ve kesintisiz odak dilimlerine bölen bir zaman yönetimi yöntemidir. Yöntemi 1980'lerin sonunda üniversite öğrencisiyken geliştiren Francesco Cirillo, domates biçimli mutfak zamanlayıcısını kullandığı için tekniğe İtalyanca domates anlamına gelen bu adı vermiştir. Her odak dilimine bir pomodoro denir.",
      "Kural basittir: zamanlayıcıyı kurarsınız, süre dolana kadar yalnızca seçtiğiniz işle ilgilenirsiniz, zil çalınca kısa bir mola verirsiniz. Belirli sayıda pomodorodan sonra daha uzun bir dinlenme arası gelir. Yöntemin gücü, büyük ve göz korkutan bir işi başlaması kolay küçük parçalara ayırmasından gelir.",
    ] },
    { h: 'Plan nasıl hesaplanır?', p: [
      "Araç, toplam sürenizi baştan sona yürüyerek doldurur. Önce bir çalışma oturumu yerleştirir, ardından bir mola ekler ve bir sonraki oturumun sığıp sığmadığına bakar. Sıra numarası uzun mola sıklığının tam katı olan oturumlardan sonra uzun mola, diğerlerinden sonra kısa mola verilir.",
      "Önemli bir ayrıntı şudur: arkasından yeni bir oturum sığmayacaksa mola plana yazılmaz. Çünkü çalışmanın bittiği yerde verilen mola artık plan içi bir ara değil, serbest zamandır. Bu yüzden toplam mola yalnızca iki oturum arasındaki dinlenmeleri kapsar ve geriye kalan dakikalar <strong>artan süre</strong> olarak ayrıca gösterilir.",
      "Klasik düzende dört pomodoroluk tam bir tur 4 × 25 dakika çalışma, 3 × 5 dakika kısa mola ve 15 dakika uzun moladan oluşur; toplamı 130 dakikadır. Uzun planlarda kaba hesap için her 130 dakikaya 100 dakika net çalışma düştüğünü akılda tutmak yeterlidir.",
    ] },
    { h: 'Çözümlü örnek: sabah 09:00, dört saat', p: [
      "Toplam süre 240 dakika, ayarlar klasik düzende olsun. İlk dört pomodoro ve aralarındaki üç kısa mola 09:00 ile 10:55 arasını doldurur. Dördüncü oturumdan sonra 15 dakikalık uzun mola gelir ve 11:10'da beşinci pomodoro başlar. Beşinci 11:35'te, altıncı 12:05'te, yedinci 12:35'te biter.",
      "Yedinci oturumdan sonra geçen süre 215 dakikadır. Bir kısa mola ve bir oturum daha 30 dakika gerektirir, 245 dakika ise sınırı aşar. Dolayısıyla plan 12:35'te sona erer: <strong>7 pomodoro</strong>, 2 saat 55 dakika net çalışma, 40 dakika mola ve 25 dakika artan süre. Bu 25 dakikayı günün notlarını toparlamaya ya da ertesi günün listesini hazırlamaya ayırabilirsiniz.",
    ] },
    { h: 'Süreleri kendinize göre ayarlamak', p: [
      "25 dakika bir zorunluluk değil, bir başlangıç noktasıdır. Yeni bir konuya ısınırken ya da dikkatiniz dağınıkken 15-20 dakikalık kısa dilimler işe başlamayı kolaylaştırır. Uzun soluklu problem çözme, yazı yazma ya da kod geliştirme gibi derin odak isteyen işlerde ise 45-50 dakikalık oturumlar ve 10 dakikalık molalar daha verimli olabilir.",
      "Deneme sınavına hazırlananlar oturum süresini sınavdaki bir bölümün süresine yaklaştırarak dayanıklılık çalışması da yapabilir. Hangi düzen seçilirse seçilsin, mola süresini çalışma süresinin kabaca beşte biri civarında tutmak dengeli bir başlangıçtır; birkaç gün deneyip yorgunluğunuza göre düzeltin.",
    ] },
    { h: 'Molayı verimli geçirmenin yolları', ul: [
      "<strong>Ekrandan uzaklaşın.</strong> Molada sosyal medyaya bakmak zihni dinlendirmez; beş dakika çoğu zaman on beş dakikaya uzar.",
      "<strong>Ayağa kalkın.</strong> Su içmek, pencere açmak, birkaç esneme hareketi yapmak bir sonraki oturuma daha dinç başlamanızı sağlar.",
      "<strong>Aklınıza geleni not edin.</strong> Oturum sırasında beliren başka işleri bir kâğıda yazıp molaya ya da gün sonuna bırakın.",
      "<strong>Uzun molayı atlamayın.</strong> Art arda çok sayıda oturum yapmak ilk gün verimli görünse de ertesi günlerin temposunu düşürür.",
      "<strong>Yarıda kesilen oturumu saymayın.</strong> Bölünen bir pomodoroyu baştan başlatmak, kesintileri azaltma alışkanlığı kazandırır.",
    ] },
    { h: 'Sınırlar', p: [
      "Araç tam dakikalarla çalışır ve 24 saate kadar plan üretir. Gece yarısını geçen planlarda bitiş saatinin yanında ertesi gün ibaresi görünür. Yemek arası gibi plan dışı uzun aralar hesaba katılmaz; böyle bir aranız varsa günü iki ayrı plan olarak, öğleden önce ve öğleden sonra şeklinde hesaplamak en doğru sonucu verir.",
    ] },
  ],
  faq: [
    ['Bir pomodoro kaç dakikadır?', "Klasik uygulamada bir pomodoro 25 dakika çalışma ve ardından 5 dakika kısa moladan oluşur. Dört pomodorodan sonra 15 ile 30 dakika arasında uzun bir mola verilir. Bu süreler kişiye göre değiştirilebilir."],
    ['4 saate kaç pomodoro sığar?', "Klasik ayarlarla 240 dakikaya 7 pomodoro sığar. Net çalışma 2 saat 55 dakika, oturum arası molalar 40 dakika tutar ve sonda 25 dakika artar. Sekizinci oturum için 245 dakika gerekir."],
    ['2 saatte kaç pomodoro yapılır?', "120 dakikaya dört pomodoro sığar: 100 dakika çalışma ve aralarda toplam 15 dakika kısa mola. Plan 115. dakikada biter ve 5 dakika artar."],
    ['Uzun mola neden gerekli?', "Kısa molalar dikkati tazeler ama zihinsel yorgunluğu tümüyle gidermez. Birkaç oturumda bir verilen uzun mola, öğrenilenlerin yerleşmesine ve bir sonraki tura aynı odakla başlamaya yardımcı olur."],
    ['Son moladan sonra neden oturum eklenmiyor?', "Araç, kalan süreye bir mola ile birlikte tam bir çalışma oturumu sığmıyorsa planı son oturumun bitişinde keser. Yarım oturum planlamak tekniğin mantığına uymadığı için kalan dakikalar artan süre olarak gösterilir."],
    ['Pomodoro tekniği her ders için uygun mu?', "Konu tekrarı, soru çözümü, ezber ve okuma gibi parçalara bölünebilen işler için çok uygundur. Uzun bir deneme sınavı çözerken ise sınav süresini bölmemek gerekir; bu durumda denemeyi tek oturum sayıp ardından uzun mola verin."],
    ['Çalışma süresini 50 dakika yapabilir miyim?', "Evet. Çalışma alanına 50, kısa molaya 10 yazmanız yeterlidir. Uzun mola sıklığını da 2 ya da 3 oturumda bir olacak şekilde düşürmek, uzun oturumlarda biriken yorgunluğu dengelemeye yardımcı olur."],
    ['Planım bir yere kaydediliyor mu?', "Hayır. Çizelge tamamen tarayıcınızda hesaplanır; girdiğiniz saatler ve süreler sunucuya gönderilmez. Planı saklamak isterseniz kopyalayıp kendi notlarınıza yapıştırmalısınız."],
  ],
  related: ['ders-calisma-plani-hesapla', 'soru-cozme-hizi-hesapla', 'kitap-okuma-suresi-hesapla', 'konu-tekrar-plani', 'soru-dagilimi-hesapla'],
};
