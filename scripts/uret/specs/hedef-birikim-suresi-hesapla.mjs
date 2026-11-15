export default {
  slug: 'hedef-birikim-suresi-hesapla',
  title: 'Hedef Birikime Ulaşma Süresi Hesaplama',
  h1Tail: 'kaç ayda biriktiririm?',
  pageTitle: 'Hedef Birikim Süresi Hesaplama – Kaç Ayda Biriktiririm?',
  description: "Hedef tutara, mevcut birikiminize ve aylık tasarrufunuza göre hedefe kaç ayda ulaşacağınızı hesaplayın; isteğe bağlı yıllık getiri oranını da hesaba katın.",
  card: "Aylık birikiminizle hedef tutara kaç ay ve kaç yılda ulaşacağınızı, getiri oranı dâhil hesaplayın.",
  category: 'finans',
  keywords: ['birikim süresi hesaplama', 'hedef birikim hesaplama', 'kaç ayda biriktiririm', 'para biriktirme hesaplama', 'tasarruf hedefi hesaplama', 'aylık birikimle hedefe ulaşma', 'birikim planı'],
  lead: "Ulaşmak istediğiniz tutarı, elinizdeki birikimi ve her ay kenara koyabildiğiniz parayı yazın; araç hedefe <strong>kaç ayda</strong> ulaşacağınızı hesaplasın. Birikiminizi değerlendirdiğiniz bir yıllık getiri oranı girerseniz bileşik getirinin süreyi ne kadar kısalttığını da görürsünüz.",
  button: 'Hesapla',
  inputs: [
    { id: 'hedef', label: 'Hedef tutar (TL)', type: 'number', placeholder: 'Örn. 500000', hint: 'Binlik ayraç kullanmayın ya da 500.000,00 biçiminde yazın.' },
    { id: 'mevcut', label: 'Mevcut birikim (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 50000', hint: 'Binlik ayraç kullanmayın.' },
    { id: 'aylik', label: 'Aylık birikim (TL)', type: 'number', placeholder: 'Örn. 10000', hint: 'Her ay sonunda eklenen tutar. Binlik ayraç kullanmayın.' },
    { id: 'getiri', label: 'Yıllık getiri oranı (%, isteğe bağlı)', type: 'number', placeholder: 'Örn. 12', hint: 'Aylık oran, yıllık oranın 12\'ye bölümü olarak alınır.' },
  ],
  compute(v, h) {
    const hedef = h.pos(v.hedef, 'Hedef tutar');
    const mevcut = h.opt(v.mevcut, 0, 'Mevcut birikim');
    const aylik = h.opt(v.aylik, 0, 'Aylık birikim');
    const oran = h.opt(v.getiri, 0, 'Yıllık getiri oranı');
    if (mevcut < 0) h.err('"Mevcut birikim" negatif olamaz.');
    if (aylik < 0) h.err('"Aylık birikim" negatif olamaz.');
    if (oran < 0) h.err('"Yıllık getiri oranı" negatif olamaz; getiri yoksa alanı boş bırakın.');
    if (oran > 1000) h.err('"Yıllık getiri oranı" çok yüksek; yüzde olarak yazdığınızdan emin olun (örn. 12).');
    const i = oran / 100 / 12;
    const sureMetni = (n) => {
      const y = Math.floor(n / 12), a = n % 12;
      const parca = [];
      if (y) parca.push(y + ' yıl');
      if (a) parca.push(a + ' ay');
      return y ? `${parca.join(' ')} (${n} ay)` : `${n} ay`;
    };
    if (mevcut >= hedef - 1e-9) {
      return { rows: [['Süre', 'Hedefe zaten ulaşıldı (0 ay)'], ['Hedefi aşan tutar', h.para(mevcut - hedef)]] };
    }
    if (aylik === 0 && (i === 0 || mevcut === 0)) h.err('Aylık birikim yazın. Birikim eklemeden hedefe ancak mevcut paranız getiri sağlıyorsa ulaşılabilir.');
    const deger = (n) => i === 0 ? mevcut + aylik * n : mevcut * Math.pow(1 + i, n) + aylik * (Math.pow(1 + i, n) - 1) / i;
    let n = i === 0 ? (hedef - mevcut) / aylik : Math.log((hedef * i + aylik) / (mevcut * i + aylik)) / Math.log(1 + i);
    if (!Number.isFinite(n) || n > 1200) h.err('Bu değerlerle hedefe ulaşmak 100 yıldan uzun sürüyor. Aylık birikimi artırın ya da hedefi küçültün.');
    n = Math.max(1, Math.ceil(n - 1e-9));
    while (n > 1 && deger(n - 1) >= hedef - 0.005) n--;
    while (deger(n) < hedef - 0.005) n++;
    const son = deger(n);
    const yatirilan = aylik * n;
    return {
      rows: [
        ['Süre', sureMetni(n)],
        ['Bu sürede yatırılan toplam', h.para(yatirilan)],
        ['Getiri kazancı', h.para(son - mevcut - yatirilan)],
        ['Süre sonundaki birikim', h.para(son)],
        ['Hedefi aşan tutar', h.para(son - hedef)],
      ],
      note: 'Birikimin her ay sonunda eklendiği, getirinin aylık bileşik işlediği ve oranın süre boyunca sabit kaldığı varsayılır. Vergi, kesinti ve enflasyon hesaba katılmaz.',
    };
  },
  cases: [
    { in: { hedef: '120000', aylik: '10000' }, out: { 'Süre': '1 yıl (12 ay)', 'Bu sürede yatırılan toplam': '120.000,00 TL', 'Getiri kazancı': '0,00 TL', 'Süre sonundaki birikim': '120.000,00 TL' } },
    { in: { hedef: '100000', mevcut: '20000', aylik: '5000' }, out: { 'Süre': '1 yıl 4 ay (16 ay)', 'Bu sürede yatırılan toplam': '80.000,00 TL', 'Hedefi aşan tutar': '0,00 TL' } },
    { in: { hedef: '100000', aylik: '3000' }, out: { 'Süre': '2 yıl 10 ay (34 ay)', 'Süre sonundaki birikim': '102.000,00 TL', 'Hedefi aşan tutar': '2.000,00 TL' } },
    { in: { hedef: '12600', aylik: '1000', getiri: '12' }, out: { 'Süre': '1 yıl (12 ay)', 'Bu sürede yatırılan toplam': '12.000,00 TL', 'Getiri kazancı': '682,50 TL', 'Süre sonundaki birikim': '12.682,50 TL' } },
    { in: { hedef: '20000', mevcut: '10000', aylik: '0', getiri: '12' }, out: { 'Süre': '5 yıl 10 ay (70 ay)', 'Bu sürede yatırılan toplam': '0,00 TL' }, match: { 'Süre sonundaki birikim': '^20\\.06\\d,\\d\\d TL$' } },
    { in: { hedef: '50000', mevcut: '60000', aylik: '1000' }, out: { 'Süre': 'Hedefe zaten ulaşıldı (0 ay)', 'Hedefi aşan tutar': '10.000,00 TL' } },
    { in: { hedef: '8000', aylik: '1000' }, out: { 'Süre': '8 ay' } },
    { in: { hedef: '100000', aylik: '0' }, error: true },
    { in: { hedef: '0', aylik: '1000' }, error: true },
  ],
  howto: [
    '"Hedef tutar" alanına biriktirmek istediğiniz toplam parayı yazın: peşinat, araba, tatil, acil durum fonu ya da eğitim masrafı olabilir.',
    'Şu an elinizde bu hedef için ayrılmış para varsa "Mevcut birikim" alanına girin; yoksa boş bırakın.',
    '"Aylık birikim" alanına her ay düzenli olarak kenara koyabileceğiniz tutarı yazın.',
    'Birikiminizi mevduat, fon ya da benzeri bir araçta değerlendiriyorsanız beklediğiniz yıllık getiri oranını yüzde olarak girin. Yastık altı birikim için boş bırakın.',
    '"Hesapla" düğmesine basın. Süre, yatırdığınız toplam para ve getiriden gelen kazanç ayrı ayrı gösterilir.',
  ],
  sections: [
    { h: 'Hedefe ulaşma süresi nasıl hesaplanır?', p: [
      "Getiri yokken hesap basit bir bölmedir: <strong>süre (ay) = (hedef − mevcut birikim) ÷ aylık birikim</strong>. Sonuç tam sayı çıkmazsa yukarı yuvarlanır, çünkü hedefe ancak son taksit de yatırıldığında ulaşılır. 100.000 TL hedef için ayda 3.000 TL biriktiren biri 33,33 ay değil 34 ay bekler ve 34. ayın sonunda elinde 102.000 TL olur; araç bu 2.000 TL'lik fazlayı da gösterir.",
      "Getiri oranı girildiğinde birikim her ay hem yeni eklenen parayla hem de önceki bakiyenin getirisiyle büyür. Aylık oran <em>i</em>, mevcut birikim <em>P</em>, aylık birikim <em>A</em> olmak üzere <em>n</em> ay sonundaki tutar şu formülle bulunur: <strong>P × (1 + i)<sup>n</sup> + A × ((1 + i)<sup>n</sup> − 1) ÷ i</strong>. Araç bu tutarın hedefi ilk kez geçtiği ayı bulur. Aylık oran, girdiğiniz yıllık oranın 12'ye bölümüdür; yüzde 12 yıllık oran aylık yüzde 1 olarak işlenir.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "<strong>Getirisiz:</strong> Hedef 100.000 TL, eldeki para 20.000 TL, aylık birikim 5.000 TL olsun. Kalan tutar 80.000 TL'dir ve 80.000 ÷ 5.000 = 16 ay eder. Sonuç 1 yıl 4 aydır.",
      "<strong>Getirili:</strong> Sıfırdan başlayıp her ay sonunda 1.000 TL yatıran ve yıllık yüzde 12 (aylık yüzde 1) getiri elde eden biri 12 ay sonunda 1.000 × (1,01<sup>12</sup> − 1) ÷ 0,01 = 12.682,50 TL'ye ulaşır. Yatırdığı para 12.000 TL, getiriden kazandığı 682,50 TL'dir. Hedef 12.600 TL ise 11. ayın sonundaki 11.566,83 TL yetmez, hedef 12. ayda aşılır.",
      "<strong>Yalnızca getiriyle:</strong> 10.000 TL'si olan ve yeni para eklemeyen biri aylık yüzde 1 getiriyle 20.000 TL'ye 70 ayda, yani 5 yıl 10 ayda ulaşır. Bu, paranın ikiye katlanma süresidir ve bileşik getirinin zaman içindeki etkisini gösterir.",
    ] },
    { h: 'Süreyi kısaltmanın üç yolu', ul: [
      "<strong>Aylık birikimi artırmak:</strong> Getirisiz hesapta birikimi yüzde 25 artırmak süreyi yüzde 20 kısaltır. En doğrudan ve en öngörülebilir yöntemdir.",
      "<strong>Başlangıç tutarını yükseltmek:</strong> İkramiye, prim ya da kullanılmayan bir eşyanın satışından gelen toplu para, hem kalan tutarı azaltır hem de getiri işleyen bakiyeyi büyütür.",
      "<strong>Birikimi değerlendirmek:</strong> Getiri, uzun vadeli hedeflerde belirgin fark yaratır; kısa vadede etkisi sınırlıdır. Getiri arttıkça riskin de arttığını unutmayın.",
    ] },
    { h: 'Enflasyon ve hedefin kayması', p: [
      "Araç hedef tutarı sabit kabul eder. Oysa enflasyon olan bir ortamda bugün 500.000 TL'ye alınabilen bir şeyin fiyatı siz biriktirirken yükselir. Uzun vadeli hedeflerde bunu hesaba katmanın iki pratik yolu vardır. Birincisi, hedef tutarı baştan tahmini gelecekteki fiyata göre yüksek belirlemektir. İkincisi, getiri oranı yerine enflasyondan arındırılmış reel getiriyi girmektir; getiriniz enflasyonun altındaysa reel getiri eksi olur ve bu durumda getiri alanını boş bırakıp aylık birikimi her yıl artırmayı planlamak daha gerçekçidir.",
      "Geliriniz yıl içinde arttıkça aylık birikimi de artırmak, hedefin kaymasına karşı en sağlam önlemdir. Planı yılda bir kez güncel rakamlarla yeniden hesaplamak iyi bir alışkanlıktır.",
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      "Hesapta birikimin her ayın sonunda eklendiği, getirinin ayda bir kez ana paraya katıldığı ve oranın süre boyunca değişmediği varsayılır. Gerçekte faiz ve fon getirileri değişkendir, getiri üzerinden vergi ya da kesinti uygulanabilir; bunlar hesaba dâhil değildir. Girdiğiniz oran kesintiler sonrası net oran olursa sonuç gerçeğe daha yakın çıkar.",
      "Sonuçlar bilgilendirme amaçlıdır ve yatırım tavsiyesi değildir. Hangi araçta birikim yapacağınıza karar verirken risk durumunuzu değerlendirin ve gerekirse yetkili bir uzmana danışın.",
    ] },
  ],
  faq: [
    ['Kaç ayda biriktireceğimi nasıl hesaplarım?', "Hedeften mevcut birikiminizi çıkarın ve aylık birikime bölün; küsuratlı çıkarsa yukarı yuvarlayın. 120.000 TL hedef ve ayda 10.000 TL birikimle süre 12 aydır."],
    ['Getiri oranını girmek zorunda mıyım?', "Hayır. Alanı boş bırakırsanız birikiminizin getiri sağlamadığı kabul edilir ve yalnızca yatırdığınız para toplanır. Bu, en temkinli senaryodur."],
    ['Yıllık oran aylığa nasıl çevriliyor?', "Yıllık oran 12'ye bölünür ve aylık bileşik uygulanır. Yüzde 24 yıllık oran aylık yüzde 2 olarak işlenir. Elinizde aylık oran varsa 12 ile çarpıp yazabilirsiniz."],
    ['Süre sonundaki birikim neden hedeften fazla çıkıyor?', "Hedefe tam ay sayısında ulaşıldığı için son ayın birikimi çoğu zaman hedefi bir miktar aşar. Aradaki fark 'Hedefi aşan tutar' satırında gösterilir."],
    ['Aylık birikim yazmadan hesap yapılabilir mi?', "Yalnızca mevcut birikiminiz ve getiri oranınız varsa evet; bu durumda araç paranızın getiriyle hedefe ne zaman ulaşacağını bulur. İkisi de yoksa hedefe ulaşmak mümkün olmadığından araç uyarı verir."],
    ['Birikimi ay başında yatırırsam sonuç değişir mi?', "Getirili hesapta çok az değişir; ay başında yatırılan para bir ay fazla getiri kazanır, bu da süreyi en fazla bir ay kısaltabilir. Getirisiz hesapta fark yoktur."],
    ['Altın ya da döviz biriktiriyorum, kullanabilir miyim?', "Evet. Tüm alanlara aynı birimi yazmanız yeterlidir; hedefi ve aylık birikimi gram ya da döviz cinsinden girebilirsiniz. Sonuçtaki para birimi etiketi TL görünse de süre doğru hesaplanır."],
    ['Birikim bilgilerim kaydediliyor mu?', "Hayır. Hesaplama yalnızca tarayıcınızda çalışır; yazdığınız tutarlar hiçbir yere gönderilmez."],
  ],
  related: ['tasarruf-orani-hesapla', 'gelecek-deger-hesapla', '72-kurali-hesapla', 'butce-50-30-20-hesapla', 'satin-alma-gucu-hesapla'],
};
