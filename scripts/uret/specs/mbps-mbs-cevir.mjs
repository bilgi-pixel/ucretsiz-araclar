export default {
  slug: 'mbps-mbs-cevir',
  title: 'Mbps MB/sn Çevirici',
  h1Tail: 'megabit/sn ↔ megabayt/sn',
  pageTitle: 'Mbps MB/sn Çevirici – İnternet Hızını İndirme Hızına Çevirme',
  description: 'Mbps değerini MB/sn\'ye, MB/sn değerini Mbps\'ye çevirin. İnternet hızınızın saniyede, dakikada ve saatte kaç megabayt indirdiğini, dosyanın kaç dakikada ineceğini görün.',
  card: 'İnternet hızını (Mbps) gerçek indirme hızına (MB/sn) çevirin; dosyanın tahmini inme süresini de hesaplayın.',
  category: 'birim',
  keywords: ['mbps mb/sn çevirme', '100 mbps kaç mb indirir', 'mbps kaç mb', 'megabit megabayt hız', 'internet hızı indirme hızı', 'mbps to mb/s', '1 mbps kaç kb'],
  lead: 'İnternet paketinizde yazan megabit/saniye (Mbps) hızının, indirme ekranında gördüğünüz megabayt/saniye (MB/sn) değerine nasıl karşılık geldiğini hesaplayın. Araç <strong>1 MB/sn = 8 Mbps</strong> eşitliğini kullanır; isterseniz bir dosya boyutu yazarak tahmini indirme süresini de öğrenebilirsiniz.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Hız', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mbps', 'Mbps → MB/sn'], ['mbs', 'MB/sn → Mbps']] },
    { id: 'dosya', label: 'Dosya boyutu (GB, isteğe bağlı)', type: 'number', placeholder: 'Örn. 50', hint: 'Doldurursanız bu hızla tahmini indirme süresi hesaplanır (1 GB = 1000 MB).' },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Hız');
    const dosya = h.opt(v.dosya, 0, 'Dosya boyutu');
    if (dosya < 0) h.err('"Dosya boyutu" negatif olamaz.');
    const mbps = v.yon === 'mbs' ? x * 8 : x;
    const mbs = mbps / 8;
    const sure = (sn) => {
      if (sn < 60) return h.fmt(sn, 1) + ' sn';
      const t = Math.round(sn);
      const sa = Math.floor(t / 3600);
      const dk = Math.floor((t - sa * 3600) / 60);
      const s = t - sa * 3600 - dk * 60;
      return (sa > 0 ? `${h.fmt(sa, 0)} sa ` : '') + `${dk} dk ${s} sn`;
    };
    const rMbs = ['MB/sn', h.sig(mbs, 8) + ' MB/sn'];
    const rMbps = ['Mbps', h.sig(mbps, 8) + ' Mbps'];
    const rows = [
      ...(v.yon === 'mbs' ? [rMbps, rMbs] : [rMbs, rMbps]),
      ['KB/sn', h.sig(mbs * 1000, 8) + ' KB/sn'],
      ['MiB/sn (1024 tabanlı)', h.fmt(mbs * 1e6 / 1048576, 2) + ' MiB/sn'],
      ['Dakikada aktarılan', h.sig(mbs * 60, 8) + ' MB'],
      ['Saatte aktarılan', h.sig(mbs * 3.6, 8) + ' GB'],
    ];
    if (dosya > 0) rows.push(['Tahmini indirme süresi', sure(dosya * 1000 / mbs)]);
    return {
      rows,
      note: '1 bayt = 8 bit; 1 Mbps = 1.000.000 bit/sn, 1 MB = 1.000.000 bayt kabul edilmiştir. Gerçek hız hat kalitesine, Wi-Fi bağlantısına ve sunucuya göre daha düşük olabilir.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'mbps' }, out: { 'MB/sn': '12,5 MB/sn', 'KB/sn': '12.500 KB/sn', 'MiB/sn (1024 tabanlı)': '11,92 MiB/sn', 'Dakikada aktarılan': '750 MB', 'Saatte aktarılan': '45 GB' } },
    { in: { deger: '10', yon: 'mbs' }, out: { 'Mbps': '80 Mbps', 'MB/sn': '10 MB/sn' } },
    { in: { deger: '100', yon: 'mbps', dosya: '50' }, out: { 'Tahmini indirme süresi': '1 sa 6 dk 40 sn' } },
    { in: { deger: '16', yon: 'mbps', dosya: '5' }, out: { 'MB/sn': '2 MB/sn', 'Saatte aktarılan': '7,2 GB', 'Tahmini indirme süresi': '41 dk 40 sn' } },
    { in: { deger: '1000', yon: 'mbps', dosya: '1' }, out: { 'MB/sn': '125 MB/sn', 'Tahmini indirme süresi': '8 sn' } },
    { in: { deger: '35', yon: 'mbps' }, out: { 'MB/sn': '4,375 MB/sn' } },
    { in: { deger: '1', yon: 'mbps' }, out: { 'MB/sn': '0,125 MB/sn', 'KB/sn': '125 KB/sn' } },
    { in: { deger: '0', yon: 'mbps' }, error: true },
    { in: { deger: 'hızlı', yon: 'mbps' }, error: true },
    { in: { deger: '100', yon: 'mbps', dosya: '-2' }, error: true },
  ],
  howto: [
    '"Hız" alanına internet paketinizdeki ya da hız testinde gördüğünüz değeri yazın.',
    '"Çeviri yönü" listesinden Mbps → MB/sn ya da tersini seçin. İndirme ekranındaki MB/sn değerinden bağlantı hızını bulmak için ikinci seçeneği kullanın.',
    'İndirmeyi düşündüğünüz bir oyun, film ya da yedek varsa boyutunu gigabayt olarak "Dosya boyutu" alanına yazın; boş bırakırsanız yalnızca hız çevirisi yapılır.',
    '"Çevir" düğmesine basın. Sonuçta saniyelik hız, dakikada ve saatte aktarılan veri miktarı ile tahmini indirme süresi görünür.',
  ],
  sections: [
    { h: 'Mbps ile MB/sn arasındaki fark', p: [
      'İnternet servis sağlayıcıları bağlantı hızını <strong>megabit/saniye</strong> olarak duyurur ve bunu Mbps ya da Mbit/sn biçiminde yazar. Tarayıcılar, oyun platformları ve dosya indirme programları ise ilerlemeyi <strong>megabayt/saniye</strong> olarak, yani MB/sn ya da MB/s biçiminde gösterir. Bir bayt sekiz bit olduğu için iki değer arasında sekiz kat fark vardır.',
      'Bu fark, "100 megabit internetim var ama saniyede yalnızca 12 megabayt iniyor" şikâyetinin açıklamasıdır. Ortada bir eksiklik yoktur: 100 Mbps\'lik hat, kuramsal olarak en fazla 12,5 MB/sn indirme hızı sağlar. Küçük b bit, büyük B bayt anlamına gelir; kısaltmalardaki bu tek harflik fark sonucu sekize katlar.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Çeviri tek bir işlemden ibarettir: <strong>MB/sn = Mbps ÷ 8</strong> ve <strong>Mbps = MB/sn × 8</strong>. Hızı kilobayt/saniye olarak görmek isterseniz MB/sn değerini 1000 ile çarparsınız.',
      'Örnek: Paketiniz 100 Mbps olsun. 100 ÷ 8 = 12,5 MB/sn, yani 12.500 KB/sn eder. Bu hızla bir dakikada 12,5 × 60 = 750 MB, bir saatte 45.000 MB yani 45 GB veri aktarılabilir. 50 GB\'lik bir oyunu indirmek için gereken süre 50.000 MB ÷ 12,5 MB/sn = 4.000 saniyedir; bu da 1 saat 6 dakika 40 saniye eder. Ters yönde bir örnek: indirme ekranında 10 MB/sn görüyorsanız bağlantınız o anda 10 × 8 = 80 Mbps hızında çalışıyordur.',
    ] },
    { h: 'Yaygın paket hızlarının karşılıkları', ul: [
      '<strong>8 Mbps</strong> = 1 MB/sn',
      '<strong>16 Mbps</strong> = 2 MB/sn',
      '<strong>24 Mbps</strong> = 3 MB/sn',
      '<strong>35 Mbps</strong> = 4,375 MB/sn',
      '<strong>50 Mbps</strong> = 6,25 MB/sn',
      '<strong>100 Mbps</strong> = 12,5 MB/sn',
      '<strong>200 Mbps</strong> = 25 MB/sn',
      '<strong>500 Mbps</strong> = 62,5 MB/sn',
      '<strong>1000 Mbps (1 Gbps)</strong> = 125 MB/sn',
    ] },
    { h: 'Gerçek hız neden hesaplanandan düşük olur?', p: [
      'Araç kuramsal üst sınırı verir. Uygulamada görülen hız birkaç nedenle bunun altında kalır. Paketlerde belirtilen değer çoğunlukla "en fazla" hızdır; hattın fiziksel durumu, santrale uzaklık ve yoğun saatlerdeki kullanım hızı düşürür. Ev içinde Wi-Fi sinyalinin duvarlardan geçmesi, modemin eski bir kablosuz standardı kullanması ya da aynı ağdaki başka cihazların hattı paylaşması da etkilidir.',
      'Ayrıca verinin iletimi sırasında adresleme ve hata denetimi için ek bilgi taşınır; bu ek yük faydalı veri hızını bir miktar azaltır. İndirdiğiniz sunucunun kendi çıkış hızı da bir sınırdır: bağlantınız ne kadar hızlı olursa olsun, karşı taraf yavaş gönderiyorsa indirme yavaş kalır. Son olarak eski bir disk, çok hızlı bağlantılarda yazma hızıyla darboğaz oluşturabilir.',
    ] },
    { h: 'MB/sn ile MiB/sn', p: [
      'Bazı programlar hızı 1024 tabanlı birimlerle hesaplar ama yine "MB/s" diye yazar. Bu durumda 100 Mbps\'lik hat 12,5 yerine yaklaşık 11,92 olarak görünür; çünkü 12.500.000 bayt, 1.048.576 baytlık birimlere bölünmektedir. Aracın "MiB/sn" satırı bu değeri verir. Hız testinizle indirme ekranınız arasında yüzde beşe yakın bir tutarsızlık görüyorsanız nedeni büyük olasılıkla bu gösterim farkıdır.',
    ] },
    { h: 'Yükleme hızı ve kullanım senaryoları', p: [
      'Aynı çeviri yükleme (upload) hızı için de geçerlidir. Yükleme hızı çoğu ev bağlantısında indirme hızından belirgin biçimde düşüktür; 8 Mbps yükleme hızı saniyede 1 MB gönderebilir. 2 GB\'lik bir videoyu bu hızla buluta yüklemek 2.000 saniye, yani 33 dakika 20 saniye sürer. Video konferans, canlı yayın ve bulut yedekleme gibi işler için paketinizin yükleme değerini de ayrıca kontrol edin.',
      'Sonuçlar bilgilendirme amaçlı kuramsal değerlerdir. Bağlantınızın gerçek başarımını ölçmek için kabloyla bağlı bir cihazda, başka indirme yokken hız testi yapın ve çıkan Mbps değerini bu araca yazın.',
    ] },
  ],
  faq: [
    ['100 Mbps kaç MB indirir?', '100 Mbps kuramsal olarak saniyede 12,5 MB indirir. Bu, dakikada 750 MB ve saatte 45 GB anlamına gelir. Gerçek değer hat koşullarına göre daha düşük olabilir.'],
    ['1 Mbps kaç KB/sn eder?', '1 Mbps, 0,125 MB/sn yani 125 KB/sn eder. 8 Mbps\'lik bir hat saniyede 1 MB aktarır.'],
    ['Mbps ile MBps aynı şey mi?', 'Hayır. Küçük b ile yazılan Mbps megabit/saniye, büyük B ile yazılan MBps ya da MB/sn megabayt/saniyedir. İkincisi sekiz kat daha büyük bir hızı ifade eder.'],
    ['İndirme hızım paketimin sekizde biri görünüyor, sorun var mı?', 'Hayır, bu beklenen durumdur. Paket hızı megabit, indirme ekranı megabayt cinsindendir. 50 Mbps\'lik pakette 6,25 MB/sn civarı görmeniz hattın tam hızda çalıştığını gösterir.'],
    ['1 Gbps internet saniyede kaç MB indirir?', '1 Gbps 1000 Mbps\'dir ve kuramsal olarak 125 MB/sn indirme hızı sağlar. Bu hızda 1 GB\'lik dosya yaklaşık 8 saniyede iner; ancak ev ağındaki kablo, modem ve disk bu hıza uygun olmalıdır.'],
    ['Dosya boyutunu hangi birimle yazmalıyım?', 'Gigabayt olarak yazın; 700 MB\'lik bir dosya için 0,7 girin. Araç süre hesabında 1 GB = 1000 MB kabul eder. Dosya boyutunuz 1024 tabanlı gösteriliyorsa gerçek süre yüzde yedi kadar daha uzun olabilir.'],
    ['Hız testindeki ping bu hesabı etkiler mi?', 'Ping, yani gecikme süresi, verinin gidiş dönüş zamanını gösterir ve aktarım hızından ayrı bir ölçüdür. Büyük dosya indirmelerinde belirleyici olan Mbps değeridir; ping daha çok çevrim içi oyun ve görüntülü görüşmede hissedilir.'],
    ['Yazdığım hız ve dosya bilgisi bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır, hiçbir değer sunucuya iletilmez. Bu araç hız testi yapmaz; yalnızca yazdığınız sayıyı çevirir.'],
  ],
  related: ['indirme-suresi-hesapla', 'bit-bayt-cevir', 'mb-gb-cevir', 'video-boyutu-hesapla', 'gb-tb-cevir'],
};
