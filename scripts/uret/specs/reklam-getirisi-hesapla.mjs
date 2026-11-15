export default {
  slug: 'reklam-getirisi-hesapla',
  title: 'Reklam Harcaması Getirisi (ROAS) Hesaplama',
  h1Tail: 'ROAS',
  pageTitle: 'ROAS Hesaplama – Reklam Harcaması Getirisi ve Başabaş ROAS',
  description: 'Reklamdan gelen ciroyu harcamaya bölerek ROAS değerini kat ve yüzde olarak hesaplayın; kâr marjınızı yazarsanız başabaş ROAS ve reklam sonrası kârı da görün.',
  card: 'Reklam geliri ve harcamasından ROAS değerini bulun; kâr marjıyla başabaş noktasını ve reklam sonrası brüt kârı görün.',
  category: 'finans',
  keywords: ['roas hesaplama', 'reklam harcaması getirisi', 'roas nedir', 'başabaş roas', 'reklam getirisi hesaplama', 'acos hesaplama', 'roas kaç olmalı'],
  lead: `Reklama harcadığınız her 1 TL'nin kaç TL ciro getirdiğini hesaplayın. Araç <strong>ROAS = reklam geliri ÷ reklam harcaması</strong> formülünü kullanır; brüt kâr marjınızı da girerseniz zarar etmemek için gereken en düşük ROAS değerini ve reklam sonrası kalan kârı gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'gelir', label: 'Reklamdan gelen ciro (TL)', type: 'number', placeholder: 'Örn. 20000', hint: 'Binlik ayraç kullanmayın ya da 20.000,00 biçiminde yazın.' },
    { id: 'harcama', label: 'Reklam harcaması (TL)', type: 'number', placeholder: 'Örn. 5000', hint: 'Ciro ile aynı döneme ait toplam harcama.' },
    { id: 'marj', label: 'Brüt kâr marjı % (isteğe bağlı)', type: 'number', placeholder: 'Örn. 40', hint: 'Satış fiyatının yüzde kaçı ürün maliyeti düşüldükten sonra size kalıyor?' },
  ],
  compute(v, h) {
    const gelir = h.nonneg(v.gelir, 'Reklamdan gelen ciro');
    const harcama = h.pos(v.harcama, 'Reklam harcaması');
    const roas = gelir / harcama;
    const rows = [
      ['ROAS', h.fmt(roas, 2) + ' kat'],
      ['ROAS (yüzde)', '%' + h.fmt(roas * 100, 2)],
      ['Harcanan 1 TL başına ciro', h.para(roas)],
      ['Reklam harcamasının ciroya oranı', gelir > 0 ? '%' + h.fmt(harcama / gelir * 100, 2) : '—'],
    ];
    let note = 'ROAS ciroyu ölçer, kârı değil. Kârlılığı görmek için brüt kâr marjınızı da girin.';
    if (String(v.marj ?? '').trim() !== '') {
      const marj = h.pos(v.marj, 'Brüt kâr marjı');
      if (marj > 100) h.err('"Brüt kâr marjı" %100\'den büyük olamaz; satış fiyatı üzerinden hesaplanan marjı yazın.');
      const basabas = 100 / marj;
      const kar = gelir * marj / 100 - harcama;
      rows.push(['Başabaş ROAS', h.fmt(basabas, 2) + ' kat']);
      rows.push(['Reklam sonrası brüt kâr', h.para(kar)]);
      const durum = Math.abs(kar) < 0.005 ? 'Başabaş: reklam kendini tam karşılıyor' : kar > 0 ? 'Kârlı: ROAS başabaş değerinin üzerinde' : 'Zararda: ROAS başabaş değerinin altında';
      rows.push(['Durum', durum]);
      note = 'Başabaş ROAS = 100 ÷ brüt kâr marjı. Kargo, komisyon, iade ve genel giderler marja dahil değilse gerçek başabaş noktası daha yüksektir.';
    }
    return { rows, note };
  },
  cases: [
    { in: { gelir: '20000', harcama: '5000' }, out: { 'ROAS': '4 kat', 'ROAS (yüzde)': '%400', 'Harcanan 1 TL başına ciro': '4,00 TL', 'Reklam harcamasının ciroya oranı': '%25' } },
    { in: { gelir: '20000', harcama: '5000', marj: '40' }, out: { 'ROAS': '4 kat', 'Başabaş ROAS': '2,5 kat', 'Reklam sonrası brüt kâr': '3.000,00 TL', 'Durum': 'Kârlı: ROAS başabaş değerinin üzerinde' } },
    { in: { gelir: '3000', harcama: '4000' }, out: { 'ROAS': '0,75 kat', 'ROAS (yüzde)': '%75', 'Reklam harcamasının ciroya oranı': '%133,33' } },
    { in: { gelir: '10000', harcama: '2500', marj: '25' }, out: { 'ROAS': '4 kat', 'Başabaş ROAS': '4 kat', 'Reklam sonrası brüt kâr': '0,00 TL', 'Durum': 'Başabaş: reklam kendini tam karşılıyor' } },
    { in: { gelir: '9000', harcama: '3000', marj: '20' }, out: { 'ROAS': '3 kat', 'Başabaş ROAS': '5 kat', 'Reklam sonrası brüt kâr': '-1.200,00 TL', 'Durum': 'Zararda: ROAS başabaş değerinin altında' } },
    { in: { gelir: '0', harcama: '1000' }, out: { 'ROAS': '0 kat', 'Reklam harcamasının ciroya oranı': '—' } },
    { in: { gelir: '20000', harcama: '0' }, error: true },
    { in: { gelir: '20000', harcama: '5000', marj: '140' }, error: true },
    { in: { gelir: '', harcama: '5000' }, error: true },
  ],
  howto: [
    `Reklam panelinizde ya da e-ticaret raporunuzda, reklamlara atfedilen satış cirosunu bulun ve "Reklamdan gelen ciro" alanına yazın.`,
    `Aynı tarih aralığındaki toplam reklam harcamasını ikinci alana girin. İki rakamın dönemi ve kampanya kapsamı aynı olmalıdır.`,
    `Kârlılığı da görmek istiyorsanız brüt kâr marjınızı yüzde olarak ekleyin. Marjı bilmiyorsanız (satış fiyatı − ürün maliyeti) ÷ satış fiyatı × 100 işlemiyle bulabilirsiniz.`,
    `"Hesapla" düğmesine basın. İlk satırlar ROAS değerini kat ve yüzde olarak, sonraki satırlar başabaş noktasını ve reklam sonrası kalan brüt kârı gösterir.`,
  ],
  sections: [
    { h: 'ROAS nedir?', p: [
      `ROAS, İngilizce "return on ad spend" ifadesinin kısaltmasıdır ve Türkçeye reklam harcaması getirisi olarak çevrilir. Reklama ayrılan bütçenin ne kadar satış cirosu ürettiğini tek bir sayıyla özetler. E-ticaret mağazaları, pazaryeri satıcıları ve ajanslar kampanyaları kıyaslarken en çok bu ölçüye bakar, çünkü hesaplaması kolaydır ve farklı bütçelerdeki kampanyaları aynı ölçeğe getirir.`,
      `Değer iki biçimde söylenir. "ROAS 4" ya da "4 kat" dendiğinde harcanan her 1 TL'nin 4 TL ciro getirdiği anlaşılır. Bazı paneller aynı şeyi yüzde olarak %400 şeklinde gösterir. Bu araç iki gösterimi birlikte verir; raporunuzda hangisi kullanılıyorsa onu alabilirsiniz.`,
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      `<strong>ROAS = reklamdan gelen ciro ÷ reklam harcaması.</strong> Bir ayda 5.000 TL reklam verip reklamlar üzerinden 20.000 TL satış yaptıysanız 20.000 ÷ 5.000 = 4 bulunur. Yüzde karşılığı %400'dür. Tersinden bakıldığında reklam harcaması cironun 5.000 ÷ 20.000 = %25'ine denk gelir; pazaryeri panellerinde bu ters orana ACOS adı verilir.`,
      `Şimdi kârlılığa bakalım. Ürünlerinizde brüt kâr marjı %40 ise 20.000 TL cironun 8.000 TL'si ürün maliyeti düşüldükten sonra size kalır. Bundan 5.000 TL reklam harcamasını çıkardığınızda 3.000 TL reklam sonrası brüt kâr elde edersiniz. Aynı marjla zarar etmemek için gereken en düşük değer 100 ÷ 40 = 2,5'tir; yani ROAS 2,5'in altına düşerse reklam kendi maliyetini çıkaramaz.`,
      `Tersi bir örnek: 3.000 TL harcayıp 9.000 TL ciro alan, marjı %20 olan bir satıcının ROAS değeri 3'tür ve ilk bakışta iyi görünür. Oysa başabaş noktası 100 ÷ 20 = 5'tir. 9.000 TL cironun brüt kârı 1.800 TL, reklam gideri 3.000 TL olduğundan sonuç 1.200 TL zarardır.`,
    ] },
    { h: 'Başabaş ROAS neden önemlidir?', p: [
      `Yaygın bir yanılgı, belirli bir ROAS değerinin herkes için "iyi" olduğunu düşünmektir. Gerçekte eşik tamamen marja bağlıdır. Marjı %50 olan bir işletme 2'nin üzerindeki her değerde brüt kâr ederken, marjı %10 olan bir işletmenin 10'un üzerine çıkması gerekir. Bu yüzden hedef belirlerken önce kendi başabaş değerinizi hesaplamalısınız.`,
    ], ul: [
      `Brüt kâr marjı <strong>%20</strong> ise başabaş ROAS <strong>5</strong>`,
      `Brüt kâr marjı <strong>%25</strong> ise başabaş ROAS <strong>4</strong>`,
      `Brüt kâr marjı <strong>%40</strong> ise başabaş ROAS <strong>2,5</strong>`,
      `Brüt kâr marjı <strong>%50</strong> ise başabaş ROAS <strong>2</strong>`,
      `Brüt kâr marjı <strong>%80</strong> ise başabaş ROAS <strong>1,25</strong>`,
    ] },
    { h: 'ROAS ile ROI farkı', p: [
      `İki kavram sık karıştırılır. ROAS payda olarak yalnızca reklam harcamasını, pay olarak ciroyu alır; bu nedenle 1'in üzerindeki her değer "harcadığımdan fazla ciro aldım" demektir ama kâr ettiğiniz anlamına gelmez. Yatırım getirisi (ROI) ise net kazancı toplam maliyete böler; ürün maliyeti, kargo, komisyon ve personel gibi kalemler hesaba girer. Kampanyaları hızlıca sıralamak için ROAS, işin gerçekten para kazandırıp kazandırmadığını anlamak için kâr hesabı kullanılır.`,
    ] },
    { h: 'Hesaplarken dikkat edilecekler', ul: [
      `<strong>Atıf penceresi:</strong> Paneller, reklama tıklayıp birkaç gün sonra alışveriş yapan kişileri de reklama yazar. Pencere uzadıkça ciro ve ROAS yükselir; dönemleri kıyaslarken aynı ayarı kullanın.`,
      `<strong>KDV:</strong> Ciroyu KDV dahil, harcamayı KDV hariç alırsanız oran olduğundan iyi görünür. İki tarafı aynı esasla yazın.`,
      `<strong>İade ve iptaller:</strong> Giyim gibi iade oranı yüksek kategorilerde brüt satış yerine iadeler düşülmüş net ciroyu kullanmak daha gerçekçidir.`,
      `<strong>Pazaryeri kesintileri:</strong> Komisyon, kargo ve hizmet bedelleri marjınıza dahil değilse başabaş değeriniz araçta görünenden yüksektir. Marjı bu giderler düşüldükten sonraki haliyle girmek daha güvenlidir.`,
      `<strong>Tekrar eden müşteriler:</strong> İlk siparişte zarar eden bir kampanya, müşteri yeniden alışveriş yapıyorsa uzun vadede kârlı olabilir. ROAS bu etkiyi göstermez.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Bu hesap, yazdığınız ciro ve harcama rakamlarının doğruluğuna bağlıdır; reklam panelinin atfettiği satışlar ile muhasebe kayıtlarınız birebir örtüşmeyebilir. Araç vergi, kur farkı ve sabit giderleri hesaba katmaz. Sonuçlar bilgilendirme amaçlıdır; bütçe artırma ya da kampanya kapatma gibi mali kararları kendi kayıtlarınızla ve gerekiyorsa mali müşavirinizle birlikte değerlendirin.`,
    ] },
  ],
  faq: [
    ['ROAS nasıl hesaplanır?', `Reklamlardan elde edilen ciro, aynı dönemin reklam harcamasına bölünür. 20.000 TL ciro ve 5.000 TL harcama için sonuç 4'tür; yüzde olarak %400 şeklinde de ifade edilir.`],
    ['ROAS kaç olmalı?', `Herkes için geçerli tek bir değer yoktur; eşik brüt kâr marjınıza bağlıdır. Başabaş ROAS, 100'ün marja bölünmesiyle bulunur. Marjınız %40 ise 2,5'in üzerindeki değerler reklam giderini karşılar, altındakiler karşılamaz.`],
    ['ROAS 1 ne anlama gelir?', `Harcadığınız kadar ciro aldığınızı gösterir. Ürünün maliyeti de olduğu için ROAS 1 neredeyse her zaman zarar demektir; ancak ürün maliyeti sıfıra yakın olan dijital hizmetlerde durum farklı olabilir.`],
    ['ACOS ile ROAS arasındaki ilişki nedir?', `ACOS, reklam harcamasının ciroya oranıdır ve ROAS'ın tersidir. ROAS 4 ise ACOS %25, ROAS 5 ise ACOS %20'dir. Araçtaki "Reklam harcamasının ciroya oranı" satırı bu değeri verir.`],
    ['Brüt kâr marjımı nasıl bulurum?', `Satış fiyatından ürünün size maliyetini çıkarın, sonucu satış fiyatına bölüp 100 ile çarpın. 500 TL'ye sattığınız ürünün maliyeti 300 TL ise marj (500 − 300) ÷ 500 × 100 = %40'tır.`],
    ['ROAS yüksek ama kâr yoksa sorun nerede?', `Çoğunlukla marj düşüktür ya da kargo, komisyon, iade gibi giderler hesaba katılmamıştır. Başabaş değerinizi bu giderler düşülmüş marjla yeniden hesaplayın; ayrıca atfedilen cironun gerçekten tahsil edilen satışlarla örtüşüp örtüşmediğini kontrol edin.`],
    ['Harcamaya ajans ücretini de eklemeli miyim?', `Yalnızca platforma ödenen tutarı yazarsanız panelle aynı ROAS değerini görürsünüz. Reklamın işletmeye gerçek maliyetini görmek istiyorsanız ajans, tasarım ve yazılım giderlerini de ekleyip ikinci bir hesap yapmak yararlıdır.`],
    ['Yazdığım ciro ve harcama bilgileri saklanıyor mu?', `Hayır. Hesap tümüyle tarayıcınızda çalışır; girdiğiniz rakamlar sunucuya gönderilmez ve kaydedilmez. Sayfayı yenilediğinizde alanlar boşalır.`],
  ],
  related: ['tiklama-basi-maliyet-hesapla', 'yatirim-getirisi-hesapla', 'donusum-orani-hesapla', 'musteri-edinme-maliyeti-hesapla', 'bin-gosterim-maliyeti-hesapla'],
};
