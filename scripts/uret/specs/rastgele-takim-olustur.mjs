export default {
  slug: 'rastgele-takim-olustur',
  title: 'Rastgele Takım Oluşturma',
  h1Tail: 'kurayla adil takım dağıtımı',
  pageTitle: 'Rastgele Takım Oluşturma – İsim Listesinden Kurayla Takım Kurma',
  description: 'Oyuncu adlarını yazın, takım sayısını ya da takım başına kişi sayısını seçin; liste kurayla karıştırılıp eşit takımlara dağıtılsın. Halı saha ve sınıf grupları için.',
  card: 'İsim listesini kurayla karıştırıp eşit takımlara ya da gruplara ayırın; halı saha, beden eğitimi ve grup çalışmaları için.',
  category: 'saglik',
  keywords: ['rastgele takım oluşturma', 'takım kurma kura', 'halı saha takım ayırma', 'rastgele grup oluşturma', 'isimlerden takım yapma', 'kura ile takım belirleme', 'sınıf grup oluşturma', 'eşit takım dağıtma'],
  lead: 'Oyuncuların adlarını alt alta yazın, kaç takım istediğinizi ya da her takımda kaç kişi olacağını belirtin. Araç listeyi <strong>kurayla karıştırır</strong> ve takımlara olabildiğince eşit sayıda oyuncu dağıtır. Her tıklamada yeni bir kura çekilir.',
  button: 'Oluştur',
  inputs: [
    { id: 'oyuncular', label: 'Oyuncular (her satıra bir ad)', type: 'textarea', placeholder: 'Ali\nAyşe\nMehmet\nFatma\nCan\nDeniz', wide: true, hint: 'En az 2, en çok 200 ad yazabilirsiniz.' },
    { id: 'bolme', label: 'Bölme biçimi', type: 'select', options: [['takim', 'Takım sayısına göre'], ['kisi', 'Takım başına kişi sayısına göre']] },
    { id: 'adet', label: 'Sayı', type: 'number', value: '2', hint: 'Seçiminize göre takım sayısı ya da bir takımdaki kişi sayısı.' },
  ],
  compute(v, h) {
    const adlar = h.lines(v.oyuncular);
    const n = adlar.length;
    if (n < 2) h.err('Takım oluşturmak için en az 2 ad yazın; her satıra bir ad gelmeli.');
    if (n > 200) h.err('En çok 200 ad girebilirsiniz.');
    const adet = h.posint(String(v.adet ?? '').trim() === '' ? '2' : v.adet, 'Sayı');
    const kisiModu = v.bolme === 'kisi';
    let takimSayisi, yedekSayisi = 0;
    if (kisiModu) {
      if (adet > n) h.err(`Takım başına ${adet} kişi istediniz ama listede ${n} ad var; sayıyı küçültün ya da ad ekleyin.`);
      takimSayisi = Math.floor(n / adet);
      yedekSayisi = n - takimSayisi * adet;
    } else {
      if (adet < 2) h.err('Takım sayısı en az 2 olmalı.');
      if (adet > n) h.err(`${adet} takım için en az ${adet} oyuncu gerekir; listede ${n} ad var.`);
      takimSayisi = adet;
    }
    const kar = adlar.slice();
    for (let i = kar.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kar[i], kar[j]] = [kar[j], kar[i]];
    }
    const yedekler = yedekSayisi ? kar.splice(kar.length - yedekSayisi, yedekSayisi) : [];
    const takimlar = Array.from({ length: takimSayisi }, () => []);
    kar.forEach((ad, i) => takimlar[i % takimSayisi].push(ad));
    const bloklar = takimlar.map((t, i) => `${i + 1}. Takım (${t.length} kişi)\n` + t.join('\n'));
    if (yedekler.length) bloklar.push(`Yedekler (${yedekler.length} kişi)\n` + yedekler.join('\n'));
    const enAz = Math.min(...takimlar.map((t) => t.length));
    const enCok = Math.max(...takimlar.map((t) => t.length));
    const rows = [
      ['Takım sayısı', String(takimSayisi)],
      ['Oyuncu sayısı', String(n)],
      ['Takım başına oyuncu', enAz === enCok ? String(enAz) : `${enAz}–${enCok}`],
    ];
    if (kisiModu) rows.push(['Yedek oyuncu', String(yedekSayisi)]);
    return {
      rows,
      text: bloklar.join('\n\n'),
      note: 'Dağıtım rastgeledir; düğmeye her bastığınızda yeni bir kura çekilir. Beğendiğiniz sonucu kopyalamayı unutmayın.',
    };
  },
  cases: [
    { in: { oyuncular: 'Ali\nAyşe\nMehmet\nFatma\nCan\nDeniz', bolme: 'takim', adet: '2' }, out: { 'Takım sayısı': '2', 'Oyuncu sayısı': '6', 'Takım başına oyuncu': '3' }, textMatch: '^1\\. Takım \\(3 kişi\\)\\n[^\\n]+\\n[^\\n]+\\n[^\\n]+\\n\\n2\\. Takım \\(3 kişi\\)\\n[^\\n]+\\n[^\\n]+\\n[^\\n]+$' },
    { in: { oyuncular: 'A\nB\nC\nD\nE\nF\nG', bolme: 'takim', adet: '2' }, out: { 'Takım sayısı': '2', 'Oyuncu sayısı': '7', 'Takım başına oyuncu': '3–4' }, textMatch: '^1\\. Takım \\(4 kişi\\)[\\s\\S]+2\\. Takım \\(3 kişi\\)' },
    { in: { oyuncular: 'A\nB\nC\nD\nE\nF\nG\nH\nI\nJ', bolme: 'kisi', adet: '3' }, out: { 'Takım sayısı': '3', 'Takım başına oyuncu': '3', 'Yedek oyuncu': '1' }, textMatch: 'Yedekler \\(1 kişi\\)\\n[A-J]$' },
    { in: { oyuncular: 'A\nB\nC\nD', bolme: 'takim', adet: '4' }, out: { 'Takım sayısı': '4', 'Takım başına oyuncu': '1' }, textMatch: '4\\. Takım \\(1 kişi\\)\\n[A-D]$' },
    { in: { oyuncular: 'A\nB\nC\nD\nE\nF\nG\nH\nI', bolme: 'kisi', adet: '3' }, out: { 'Takım sayısı': '3', 'Oyuncu sayısı': '9', 'Yedek oyuncu': '0' } },
    { in: { oyuncular: 'Bir\nİki', bolme: 'takim', adet: '2' }, out: { 'Takım sayısı': '2', 'Takım başına oyuncu': '1' }, textMatch: '^1\\. Takım \\(1 kişi\\)\\n(Bir|İki)\\n\\n2\\. Takım \\(1 kişi\\)\\n(Bir|İki)$' },
    { in: { oyuncular: 'A\nB\nC', bolme: 'takim', adet: '5' }, error: true },
    { in: { oyuncular: '', bolme: 'takim', adet: '2' }, error: true },
    { in: { oyuncular: 'A\nB\nC', bolme: 'takim', adet: '0' }, error: true },
    { in: { oyuncular: 'A\nB\nC', bolme: 'kisi', adet: '4' }, error: true },
  ],
  howto: [
    'Oyuncuların adlarını kutuya her satıra bir ad gelecek şekilde yazın ya da mesaj grubundaki listeyi yapıştırın.',
    'Bölme biçimini seçin: belirli sayıda takım mı istiyorsunuz, yoksa her takımda belirli sayıda kişi mi olsun?',
    '"Sayı" alanına seçiminize göre takım sayısını ya da takım başına kişi sayısını yazın.',
    '"Oluştur" düğmesine basın; takımlar numaralı bloklar hâlinde listelenir.',
    'Sonucu kopyalayıp grupla paylaşın. Yeni bir kura için düğmeye yeniden basmanız yeterlidir.',
  ],
  sections: [
    { h: 'Neden kurayla takım kurulur?', p: [
      'Takımları seçmenin geleneksel yolu iki kaptanın sırayla oyuncu almasıdır. Bu yöntem hem zaman alır hem de en son seçilen kişi için pek hoş değildir. Kura ise kimseyi kırmaz, tartışmayı kısa keser ve her seferinde farklı kadrolar çıkararak aynı arkadaş grubunun hep birlikte oynamasını engeller.',
      'Rastgele dağıtım yalnızca spor için değil, tarafsızlığın önemli olduğu her yerde işe yarar: sınıfta proje grupları, atölye çalışmalarında masalar, şirket etkinliklerinde yarışma ekipleri, kamp ve izci etkinliklerinde gruplar, bilgi yarışmalarında takımlar aynı yöntemle oluşturulabilir.',
    ] },
    { h: 'Dağıtım nasıl yapılır?', p: [
      'Araç iki adımda çalışır. Önce liste, her sıralamanın eşit olasılıkla ortaya çıktığı Fisher–Yates yöntemiyle karıştırılır: listenin sonundan başa doğru gidilir ve her eleman, kendisi dahil önündeki elemanlardan rastgele biriyle yer değiştirir. Sonra karışmış liste, iskambil kâğıdı dağıtır gibi sırayla takımlara verilir: birinci ad birinci takıma, ikinci ad ikinci takıma ve böyle devam eder.',
      'Bu dağıtım biçimi takım büyüklükleri arasındaki farkın hiçbir zaman birden fazla olmamasını sağlar. Çözümlü örnek: 7 kişiyi 2 takıma böldüğünüzde 7 ÷ 2 = 3, kalan 1 olduğundan birinci takım 4, ikinci takım 3 kişi olur. 14 kişiyi 3 takıma böldüğünüzde 14 ÷ 3 = 4, kalan 2 olduğundan ilk iki takım 5\'er, üçüncü takım 4 kişi olur.',
    ] },
    { h: 'Takım sayısına göre mi, kişi sayısına göre mi?', p: [
      '<strong>Takım sayısına göre</strong> bölme, sahanın ve maç düzeninin belli olduğu durumlar içindir: halı sahada iki takım, voleybol turnuvasında dört takım gibi. Bütün oyuncular bir takıma yerleşir, kimse dışarıda kalmaz.',
      '<strong>Takım başına kişi sayısına göre</strong> bölme, takım büyüklüğünün kuralla sabit olduğu durumlar içindir: 3\'e 3 basketbol, 2 kişilik masa tenisi çiftleri, 4 kişilik proje grupları gibi. Bu seçenekte kişi sayısı tam bölünmüyorsa artanlar "Yedekler" başlığında listelenir. Örneğin 10 kişiyi 3\'er kişilik takımlara ayırdığınızda 3 takım oluşur ve 1 kişi yedek kalır; yedekler de kurayla belirlenir.',
    ] },
    { h: 'Halı saha için pratik öneriler', ul: [
      'Kalecileri ayrı tutmak istiyorsanız önce yalnızca kalecileri yazıp iki takıma bölün, sonra saha oyuncuları için ikinci bir kura çekin.',
      'Güç dengesini korumak için oyuncuları seviyelerine göre birkaç torbaya ayırıp her torba için ayrı kura çekebilirsiniz; böylece iyi oyuncular tek takımda toplanmaz.',
      'Gelmeme ihtimali olanları listeye yazmayın; kura çekildikten sonra eksilen oyuncu dengeyi bozar.',
      'Kurayı maçtan hemen önce, herkes sahadayken çekmek en sağlıklısıdır.',
      'Aynı adı taşıyan iki oyuncu varsa soyadının ilk harfini ekleyin; araç aynı adı iki kez yazmanıza izin verir ama sonuçta kimin kim olduğu karışabilir.',
    ] },
    { h: 'Kura ne kadar adil?', p: [
      'Her oyuncunun herhangi bir takıma düşme olasılığı eşittir ve bir kuranın sonucu bir sonrakini etkilemez. Rastgelelik tarayıcınızın yerleşik sayı üretecinden gelir; bu, oyun ve çekiliş gibi gündelik amaçlar için fazlasıyla yeterlidir.',
      'Rastgele olması, sonucun dengeli olacağı anlamına gelmez. Şans eseri en iyi üç oyuncu aynı takıma düşebilir; bu kuranın bozuk olduğunu değil, rastgeleliğin doğasını gösterir. Dengeli takımlar öncelikliyse yukarıdaki torba yöntemini kullanın ya da açıkça dengesiz bir sonuçta herkesin onayıyla yeniden çekin. Sonucu beğenmeyip defalarca çekmek ise kuranın tarafsızlığını zedeler; kaç kez çekileceğine baştan karar vermek iyi olur.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç oyuncuların yeteneğini, mevkisini ya da birbirleriyle oynama geçmişini bilmez; yalnızca adları dağıtır. "Şu iki kişi aynı takımda olmasın" gibi kısıtlar desteklenmez. En çok 200 ad girilebilir. Boş satırlar ve satır başı-sonu boşlukları yok sayılır. Sonuç bir yere kaydedilmediği için sayfayı kapattığınızda ya da düğmeye yeniden bastığınızda önceki kura geri getirilemez.',
    ] },
  ],
  faq: [
    ['14 kişiyi iki takıma nasıl ayırırım?', 'Adları yazın, "Takım sayısına göre" seçip sayı alanına 2 girin. Araç listeyi karıştırıp 7\'şer kişilik iki takım oluşturur.'],
    ['Kişi sayısı tam bölünmezse ne olur?', 'Takım sayısına göre bölmede bazı takımlar bir kişi fazla olur; fark hiçbir zaman biri geçmez. Takım başına kişi sayısına göre bölmede ise artan oyuncular "Yedekler" başlığında ayrıca listelenir.'],
    ['Her tıklamada sonuç değişir mi?', 'Evet. Düğmeye her basışta yeni bir kura çekilir ve önceki sonuç kaybolur. Beğendiğiniz dağılımı hemen kopyalayın.'],
    ['Takımlar güç bakımından dengeli olur mu?', 'Araç yalnızca sayıca dengeyi sağlar; yetenek dengesini bilemez. Dengeli takımlar için oyuncuları seviyelerine göre ayrı listelere bölüp her liste için ayrı kura çekmeniz önerilir.'],
    ['Takım yerine çift ya da grup oluşturabilir miyim?', 'Evet. "Takım başına kişi sayısına göre" seçip 2 yazarsanız ikili eşler, 4 yazarsanız dörder kişilik gruplar elde edersiniz. Sınıf içi grup çalışmaları için kullanışlıdır.'],
    ['Listeyi mesaj uygulamasından yapıştırabilir miyim?', 'Evet, her ad ayrı satırda olduğu sürece doğrudan yapıştırabilirsiniz. Adların başında sıra numarası ya da işaret varsa bunlar adın parçası sayılır; daha temiz bir sonuç için silmeniz iyi olur.'],
    ['Kaç takım oluşturabilirim?', 'Takım sayısı en az 2 olmalı ve oyuncu sayısını geçmemelidir. 200 ada kadar liste desteklenir; dolayısıyla çok takımlı okul ya da şirket etkinlikleri için de kullanılabilir.'],
    ['Yazdığım adlar saklanıyor mu?', 'Hayır. Kura tarayıcınızda çekilir; adlar hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['lig-fiksturu-olustur', 'eleme-tablosu-olustur', 'satirlari-karistir', 'rastgele-sayi', 'gol-averaji-hesapla'],
};
