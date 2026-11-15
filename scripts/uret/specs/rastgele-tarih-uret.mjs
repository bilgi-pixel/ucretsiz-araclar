export default {
  slug: 'rastgele-tarih-uret',
  title: 'Rastgele Tarih Üretme',
  h1Tail: 'iki tarih arasında',
  pageTitle: 'Rastgele Tarih Üretme – İki Tarih Arasında Rastgele Gün Seçici',
  description: 'Seçtiğiniz iki tarih arasında rastgele tarihler üretin. Adet, biçim, hafta içi filtresi ve sıralama seçenekleriyle test verisi ve çekiliş için hazır liste.',
  card: 'İki tarih arasından rastgele günler seçin; hafta içi filtresi, tekrarsız üretim ve üç farklı tarih biçimi.',
  category: 'gelistirici',
  keywords: ['rastgele tarih üretme', 'rastgele tarih seçici', 'iki tarih arası rastgele gün', 'test verisi tarih', 'random date', 'rastgele gün seç', 'rastgele doğum tarihi'],
  lead: 'Başlangıç ve bitiş tarihini verin, araç bu aralıktan <strong>eşit olasılıkla</strong> rastgele günler seçsin. Kaç tarih istediğinizi, hangi biçimde yazılacağını ve hafta sonlarının dışarıda kalıp kalmayacağını siz belirlersiniz.',
  button: 'Üret',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date' },
    { id: 'bitis', label: 'Bitiş tarihi', type: 'date' },
    { id: 'adet', label: 'Kaç tarih üretilsin?', type: 'number', value: '5', hint: '1 ile 1000 arasında bir tam sayı.' },
    { id: 'bicim', label: 'Tarih biçimi', type: 'select', options: [['tr', 'GG.AA.YYYY (15.03.2026)'], ['iso', 'YYYY-AA-GG (2026-03-15)'], ['uzun', 'Uzun (15 Mart 2026 Pazar)']] },
    { id: 'gunler', label: 'Hangi günler', type: 'select', options: [['hepsi', 'Tüm günler'], ['haftaici', 'Yalnızca hafta içi'], ['haftasonu', 'Yalnızca hafta sonu']] },
    { id: 'tekrar', label: 'Aynı tarih tekrar çıkabilsin mi?', type: 'select', options: [['evet', 'Evet, tekrar edebilir'], ['hayir', 'Hayır, hepsi farklı olsun']] },
    { id: 'sira', label: 'Sıralama', type: 'select', options: [['yok', 'Çekiliş sırasıyla'], ['artan', 'Eskiden yeniye'], ['azalan', 'Yeniden eskiye']] },
  ],
  compute(v, h) {
    const a = h.date(v.baslangic, 'Başlangıç tarihi');
    const b = h.date(v.bitis, 'Bitiş tarihi');
    if (b.getTime() < a.getTime()) h.err('Bitiş tarihi başlangıç tarihinden önce olamaz; tarihleri kontrol edin.');
    const adet = h.posint(v.adet, 'Kaç tarih üretilsin?');
    if (adet > 1000) h.err('Tek seferde en fazla 1000 tarih üretilebilir.');
    const toplamGun = h.gunFarki(a, b) + 1;
    if (toplamGun > 1500000) h.err('Tarih aralığı çok geniş; daha dar bir aralık seçin.');
    const uygunMu = (d) => {
      const g = d.getUTCDay();
      if (v.gunler === 'haftaici') return g >= 1 && g <= 5;
      if (v.gunler === 'haftasonu') return g === 0 || g === 6;
      return true;
    };
    // Uygun gün sayısı: tam haftalar + artan günler
    const sayUygun = () => {
      if (v.gunler !== 'haftaici' && v.gunler !== 'haftasonu') return toplamGun;
      const tamHafta = Math.floor(toplamGun / 7);
      let n = tamHafta * (v.gunler === 'haftaici' ? 5 : 2);
      for (let i = tamHafta * 7; i < toplamGun; i++) if (uygunMu(h.gunEkle(a, i))) n++;
      return n;
    };
    const uygun = sayUygun();
    if (uygun === 0) h.err('Seçtiğiniz aralıkta bu filtreye uyan gün yok; aralığı genişletin ya da gün filtresini değiştirin.');
    if (v.tekrar === 'hayir' && adet > uygun) h.err(`Bu aralıkta filtreye uyan yalnızca ${uygun} gün var; tekrarsız ${adet} tarih üretilemez. Adedi azaltın ya da tekrara izin verin.`);
    const rastgele = (n) => {
      // 0..n-1 arasında yansız tam sayı (reddetme örneklemesi)
      const sinir = Math.floor(4294967296 / n) * n;
      const buf = new Uint32Array(1);
      for (;;) {
        if (globalThis.crypto && globalThis.crypto.getRandomValues) globalThis.crypto.getRandomValues(buf);
        else buf[0] = Math.floor(Math.random() * 4294967296);
        if (buf[0] < sinir) return buf[0] % n;
      }
    };
    const secilen = [];
    const gorulen = new Set();
    let deneme = 0;
    while (secilen.length < adet) {
      if (++deneme > 5000000) h.err('Üretim tamamlanamadı; adedi azaltıp yeniden deneyin.');
      const i = rastgele(toplamGun);
      const d = h.gunEkle(a, i);
      if (!uygunMu(d)) continue;
      if (v.tekrar === 'hayir') { if (gorulen.has(i)) continue; gorulen.add(i); }
      secilen.push(d);
    }
    if (v.sira === 'artan') secilen.sort((x, y) => x.getTime() - y.getTime());
    else if (v.sira === 'azalan') secilen.sort((x, y) => y.getTime() - x.getTime());
    const yaz = (d) => {
      if (v.bicim === 'iso') return `${String(d.getUTCFullYear()).padStart(4, '0')}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      if (v.bicim === 'uzun') return `${d.getUTCDate()} ${h.ayAdi(d.getUTCMonth() + 1)} ${d.getUTCFullYear()} ${h.gunAdi(d)}`;
      return h.fmtDate(d);
    };
    return {
      rows: [
        ['Üretilen tarih sayısı', String(secilen.length)],
        ['Aralıktaki gün sayısı', h.fmt(toplamGun, 0)],
        ['Filtreye uyan gün sayısı', h.fmt(uygun, 0)],
        ['Aralık', `${h.fmtDate(a)} – ${h.fmtDate(b)}`],
      ],
      text: secilen.map(yaz).join('\n'),
      note: 'Başlangıç ve bitiş günleri aralığa dahildir. Her uygun günün seçilme olasılığı eşittir.',
    };
  },
  cases: [
    { in: { baslangic: '2026-01-01', bitis: '2026-12-31', adet: '5' }, out: { 'Üretilen tarih sayısı': '5', 'Aralıktaki gün sayısı': '365', 'Filtreye uyan gün sayısı': '365' }, textMatch: '^(\\d{2}\\.\\d{2}\\.2026\\n){4}\\d{2}\\.\\d{2}\\.2026$' },
    { in: { baslangic: '2026-03-15', bitis: '2026-03-15', adet: '1', bicim: 'uzun' }, out: { 'Aralıktaki gün sayısı': '1', 'Aralık': '15.03.2026 – 15.03.2026' }, text: '15 Mart 2026 Pazar' },
    { in: { baslangic: '2024-01-01', bitis: '2024-12-31', adet: '3', bicim: 'iso' }, out: { 'Aralıktaki gün sayısı': '366' }, textMatch: '^(2024-\\d{2}-\\d{2}\\n){2}2024-\\d{2}-\\d{2}$' },
    { in: { baslangic: '2026-03-09', bitis: '2026-03-15', adet: '5', gunler: 'haftaici', tekrar: 'hayir', sira: 'artan' }, out: { 'Filtreye uyan gün sayısı': '5' }, text: '09.03.2026\n10.03.2026\n11.03.2026\n12.03.2026\n13.03.2026' },
    { in: { baslangic: '2026-03-09', bitis: '2026-03-22', adet: '4', gunler: 'haftasonu', tekrar: 'hayir', sira: 'azalan', bicim: 'iso' }, out: { 'Aralıktaki gün sayısı': '14', 'Filtreye uyan gün sayısı': '4' }, text: '2026-03-22\n2026-03-21\n2026-03-15\n2026-03-14' },
    { in: { baslangic: '2026-01-01', bitis: '2026-01-31', adet: '31', tekrar: 'hayir', sira: 'artan', bicim: 'iso' }, out: { 'Üretilen tarih sayısı': '31' }, textMatch: '^2026-01-01\\n2026-01-02\\n[\\s\\S]*\\n2026-01-31$' },
    { in: { baslangic: '2026-12-31', bitis: '2026-01-01', adet: '5' }, error: true },
    { in: { baslangic: '2026-03-14', bitis: '2026-03-15', adet: '2', gunler: 'haftaici' }, error: true },
    { in: { baslangic: '2026-01-01', bitis: '2026-01-10', adet: '11', tekrar: 'hayir' }, error: true },
    { in: { baslangic: '', bitis: '2026-01-10', adet: '3' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" ve "Bitiş tarihi" alanlarından aralığın iki ucunu seçin. Her iki gün de aralığa dahil sayılır.',
    '"Kaç tarih üretilsin?" alanına 1 ile 1000 arasında bir adet yazın.',
    'Tarihlerin nasıl yazılacağını seçin: noktalı Türkiye biçimi, veritabanlarının sevdiği ISO biçimi ya da gün adını da içeren uzun biçim.',
    'Gerekirse yalnızca hafta içi ya da yalnızca hafta sonu günlerini isteyin, aynı tarihin iki kez çıkmasını engelleyin ve listenin sıralanıp sıralanmayacağını belirleyin.',
    '"Üret" düğmesine basın. Liste, her satırda bir tarih olacak biçimde çıkar; kopyalayıp tabloya, SQL betiğine ya da test dosyasına yapıştırabilirsiniz. Düğmeye yeniden basmak yeni bir liste verir.',
  ],
  sections: [
    { h: 'Rastgele tarih nasıl seçilir?', p: [
      'Mantık basittir: iki tarih arasındaki gün sayısı bulunur, 0 ile bu sayının bir eksiği arasında rastgele bir tam sayı çekilir ve başlangıç tarihine o kadar gün eklenir. Örneğin 1 Ocak 2026 ile 31 Aralık 2026 arasında 365 gün vardır; araç 0–364 arasında bir sayı çeker. Çekilen sayı 73 ise sonuç 1 Ocak + 73 gün, yani 15 Mart 2026 olur.',
      'Bu yöntemde yılı, ayı ve günü ayrı ayrı rastgele seçmenin yol açtığı sorunlar yaşanmaz. Ayrı ayrı seçimde 30 Şubat gibi takvimde olmayan günler çıkabilir ya da 28 günlük şubatın günleri 31 günlük ocağın günlerinden daha sık gelir. Gün sayısı üzerinden seçimde aralıktaki her günün olasılığı birbirine eşittir; artık yıllar da kendiliğinden doğru hesaplanır. 2024 yılının tamamını seçtiğinizde aralıkta 366 gün olduğunu sonuç kutusunda görürsünüz.',
    ] },
    { h: 'Rastgelelik ne kadar güvenilir?', p: [
      'Araç, sayıları tarayıcınızın kriptografik rastgele sayı üretecinden alır; basit <code>Math.random()</code> yerine <code>crypto.getRandomValues</code> kullanılır. Ayrıca çekilen 32 bitlik sayı aralığa indirgenirken "reddetme örneklemesi" uygulanır: aralığa tam bölünmeyen artık kısım atılır, böylece bazı günlerin çok küçük de olsa daha olası hâle gelmesi engellenir.',
      'Yine de bu araç bir noter çekilişinin yerini tutmaz. Hukuki sonucu olan çekilişlerde ilgili kurumun belirlediği usule uymanız gerekir. Sınıf içi sıra belirleme, nöbet günü atama, sürpriz tarih seçme gibi gündelik işler ve yazılım testi için fazlasıyla yeterlidir.',
    ] },
    { h: 'Hafta içi ve hafta sonu filtresi', p: [
      'Filtre açıkken araç yine tüm aralıktan gün çeker, ancak cumartesi ve pazara denk gelenleri (ya da tersine, hafta içi günlerini) atıp yeniden çeker. Bu sayede kalan günler arasında olasılık eşit kalır. Sonuç kutusundaki "Filtreye uyan gün sayısı" satırı, aralıkta kaç uygun gün olduğunu gösterir: 9–15 Mart 2026 haftasında 7 gün, bunların 5\'i hafta içidir.',
      'Filtre yalnızca cumartesi ve pazarı ayırır; resmî tatilleri, dinî bayramları ya da idari izinleri bilmez. Toplantı, teslim ya da randevu tarihi üretiyorsanız çıkan günleri tatil takvimiyle ayrıca karşılaştırın.',
    ] },
    { h: 'Tekrarsız üretim', p: [
      'Varsayılan ayarda her çekiliş bağımsızdır, bu yüzden aynı gün listede birden çok kez görünebilir. Kısa bir aralıktan çok sayıda tarih istediğinizde bu kaçınılmazdır; 23 kişilik bir grupta iki kişinin doğum gününün aynı olma olasılığının yüzde 50\'yi geçmesi de aynı olgudan kaynaklanır.',
      '"Hayır, hepsi farklı olsun" seçeneğinde daha önce çıkan gün yeniden kabul edilmez. Bu durumda isteyebileceğiniz en büyük adet, filtreye uyan gün sayısı kadardır. Ocak ayının 31 gününü tekrarsız ve sıralı isterseniz ayın bütün günlerini alırsınız; 32 isterseniz araç bunun mümkün olmadığını söyler.',
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      '<strong>Test verisi:</strong> sipariş, fatura, kayıt ya da doğum tarihi sütunlarını gerçekçi değerlerle doldurmak. ISO biçimi çoğu veritabanına doğrudan yazılabilir.',
      '<strong>Sunum ve eğitim:</strong> tablo, grafik ya da pivot örneği hazırlarken örnek tarih listesi oluşturmak.',
      '<strong>Planlama:</strong> denetim, sayım ya da habersiz kontrol gününü öngörülemez biçimde belirlemek.',
      '<strong>Oyun ve etkinlik:</strong> "bu tarihte ne oldu" yarışmaları, tarih ezber çalışmaları, haftanın gününü akıldan bulma alıştırmaları.',
      '<strong>Günlük kararlar:</strong> izin günü, buluşma ya da hediye tarihi için tarafsız bir seçim yapmak.',
    ] },
    { h: 'Biçimler ve sınırlar', p: [
      'Noktalı biçim (15.03.2026) Türkiye\'de resmî yazışmalarda ve gündelik hayatta kullanılan yazımdır. ISO 8601 biçimi (2026-03-15) yıl-ay-gün sırasıyla yazıldığı için metin olarak sıralandığında bile doğru kronolojik sırayı verir; bu yüzden dosya adlarında ve veritabanlarında tercih edilir. Uzun biçim, ay adını ve haftanın gününü Türkçe yazar.',
      'Araç yalnızca gün üretir; saat, dakika ya da saat dilimi eklemez. Tek seferde en fazla 1000 tarih alabilirsiniz. Hesaplar bugün kullanılan Miladi (Gregoryen) takvime göre yapılır; çok eski tarihler için o dönemde yürürlükte olan takvimle fark olabileceğini unutmayın.',
    ] },
  ],
  faq: [
    ['Başlangıç ve bitiş tarihleri sonuçta çıkabilir mi?', 'Evet. Aralık iki ucu da kapsar; başlangıç günü de bitiş günü de diğer günlerle aynı olasılıkla seçilebilir. İkisine aynı tarihi yazarsanız sonuç her zaman o gün olur.'],
    ['Aynı ayarlarla yeniden bastığımda neden farklı tarihler geliyor?', 'Her basışta yeni rastgele sayılar çekilir, sonuçlar öncekinden bağımsızdır. Bir listeyi saklamak istiyorsanız kopyalayıp bir dosyaya yapıştırın; araç geçmiş çekilişleri tutmaz.'],
    ['Rastgele doğum tarihi üretebilir miyim?', 'Evet. Örneğin 18–65 yaş arası kişiler için doğum yılı aralığının ilk ve son gününü yazmanız yeterlidir. Üretilen tarihler gerçek kişilere ait değildir, yalnızca test ve örnek amaçlı kullanılmalıdır.'],
    ['Resmî tatiller hafta içi filtresinde eleniyor mu?', 'Hayır. Filtre yalnızca cumartesi ve pazar günlerini ayırır. Resmî tatil ve bayram günleri yıldan yıla değiştiği için araca gömülmemiştir; gerekiyorsa çıkan listeyi tatil takvimiyle karşılaştırın.'],
    ['En fazla kaç tarih üretebilirim?', 'Tek seferde 1000 tarih. Daha fazlasına ihtiyacınız varsa düğmeye yeniden basıp listeleri birleştirebilirsiniz; tekrarsız seçenekte ise adet, aralıktaki uygun gün sayısını aşamaz.'],
    ['Listeyi Excel\'e nasıl aktarırım?', 'Sonucu kopyalayıp bir hücreye yapıştırdığınızda her tarih ayrı satıra düşer. Türkçe bölge ayarlı tablolarda noktalı biçim doğrudan tarih olarak tanınır; farklı bölge ayarlarında ISO biçimi daha sorunsuzdur.'],
    ['Saat de üretebilir mi?', 'Bu araç yalnızca takvim günü üretir. Saat gerekiyorsa her tarih için 0–23 arası saat ve 0–59 arası dakikayı rastgele sayı aracıyla ayrıca üretebilirsiniz.'],
    ['Seçtiğim tarihler ya da üretilen liste kaydediliyor mu?', 'Hayır. Tüm işlem tarayıcınızda gerçekleşir; girdiğiniz aralık ve üretilen tarihler hiçbir sunucuya gönderilmez, sayfayı kapattığınızda kaybolur.'],
  ],
  related: ['rastgele-sayi', 'tarih-farki', 'tarih-ekle-cikar', 'hangi-gun-hesapla', 'rastgele-harf-uret', 'cekilis'],
};
