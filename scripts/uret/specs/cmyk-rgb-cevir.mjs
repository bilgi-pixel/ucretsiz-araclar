export default {
  slug: 'cmyk-rgb-cevir',
  title: 'CMYK RGB Renk Çevirici',
  h1Tail: 'baskı rengi ↔ ekran rengi',
  pageTitle: 'CMYK RGB Renk Çevirici – Baskı ve Ekran Renk Kodu Dönüştürme',
  description: 'CMYK değerlerini RGB ve HEX koduna, RGB ya da HEX rengi CMYK yüzdelerine çevirin. Toplam mürekkep oranını görün; baskı ve ekran farkını öğrenin.',
  card: 'CMYK baskı değerlerini RGB ve HEX\'e, ekran rengini CMYK yüzdelerine çevirin; toplam mürekkep oranıyla.',
  category: 'gelistirici',
  keywords: ['cmyk rgb çevirme', 'rgb cmyk çevirme', 'cmyk renk kodu', 'cmyk hex çevirme', 'baskı renk kodu', 'cmyk to rgb', 'rgb to cmyk', 'matbaa renk çevirme'],
  lead: 'Baskıda kullanılan <strong>CMYK</strong> (camgöbeği, macenta, sarı, siyah) yüzdelerini ekran rengi olan <strong>RGB</strong> ve HEX koduna ya da ekrandaki bir rengi CMYK yüzdelerine çevirin. Araç standart matematiksel dönüşümü uygular ve toplam mürekkep oranını da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'renk', label: 'Renk değeri', type: 'text', placeholder: 'Örn. 20, 40, 60, 10 ya da #B88A5C', hint: 'CMYK yönünde dört yüzde (0–100); RGB yönünde üç sayı (0–255) ya da HEX kodu yazın.', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['cmyk', 'CMYK → RGB / HEX'], ['rgb', 'RGB / HEX → CMYK']] },
  ],
  compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Renk değeri" alanını doldurun.');
    let r, g, b, C, M, Y, K;
    if (v.yon === 'rgb') {
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) || (/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) && /[a-fA-F]/.test(t))) {
        let x = t.replace(/^#/, '');
        if (x.length === 3) x = x.split('').map((k) => k + k).join('');
        r = parseInt(x.slice(0, 2), 16); g = parseInt(x.slice(2, 4), 16); b = parseInt(x.slice(4, 6), 16);
      } else {
        const par = t.replace(/^rgba?\s*\(/i, '').replace(/\)\s*;?$/, '').split(/[\s,;\/]+/).filter(Boolean);
        if (par.length !== 3) h.err('RGB için üç sayı (örn. 51, 102, 153) ya da bir HEX kodu (örn. #336699) yazın.');
        [r, g, b] = par.map((p) => {
          if (!/^\d+$/.test(p)) h.err('RGB bileşenleri 0 ile 255 arasında tam sayı olmalı; "' + p + '" geçersiz.');
          const n = Number(p);
          if (n > 255) h.err('RGB bileşenleri 255\'i geçemez; "' + p + '" çok büyük.');
          return n;
        });
      }
      const R = r / 255, G = g / 255, B = b / 255;
      const k = 1 - Math.max(R, G, B);
      if (k >= 1 - 1e-12) { C = 0; M = 0; Y = 0; K = 100; }
      else { C = (1 - R - k) / (1 - k) * 100; M = (1 - G - k) / (1 - k) * 100; Y = (1 - B - k) / (1 - k) * 100; K = k * 100; }
    } else {
      const ic = t.replace(/^(device-)?cmyk\s*\(/i, '').replace(/\)\s*;?$/, '').replace(/%/g, ' ');
      let s4 = ic.split(/[\s;\/]+/).filter(Boolean).map((k) => k.replace(/,+$/, '')).filter(Boolean);
      if (s4.length !== 4) s4 = ic.split(/[\s,;\/]+/).filter(Boolean);
      if (s4.length !== 4) h.err('CMYK için dört yüzde değeri yazın: C, M, Y, K (örn. 20, 40, 60, 10).');
      const ad = ['Camgöbeği (C)', 'Macenta (M)', 'Sarı (Y)', 'Siyah (K)'];
      [C, M, Y, K] = s4.map((p, i) => {
        const n = h.num(p, ad[i]);
        if (n < 0 || n > 100) h.err('"' + ad[i] + '" 0 ile 100 arasında olmalı.');
        return n;
      });
      const kk = 1 - K / 100;
      [r, g, b] = [C, M, Y].map((q) => Math.min(255, Math.max(0, Math.round(255 * (1 - q / 100) * kk + 1e-9))));
    }
    const iki = (n) => n.toString(16).toUpperCase().padStart(2, '0');
    const hex = '#' + iki(r) + iki(g) + iki(b);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const cmyk = `cmyk(${Math.round(C)}%, ${Math.round(M)}%, ${Math.round(Y)}%, ${Math.round(K)}%)`;
    const kanal = [['Camgöbeği (C)', '%' + h.fmt(C, 2)], ['Macenta (M)', '%' + h.fmt(M, 2)], ['Sarı (Y)', '%' + h.fmt(Y, 2)], ['Siyah (K)', '%' + h.fmt(K, 2)]];
    const toplam = ['Toplam mürekkep', '%' + h.fmt(C + M + Y + K, 1)];
    const rows = v.yon === 'rgb' ? [['CMYK', cmyk], ...kanal, toplam, ['RGB', rgb], ['HEX', hex]] : [['RGB', rgb], ['HEX', hex], ['CMYK', cmyk], ...kanal, toplam];
    return { rows, note: 'Renk profili kullanılmayan matematiksel dönüşümdür. Baskıdaki gerçek renk kâğıda, mürekkebe ve makinenin renk profiline göre değişir.' };
  },
  cases: [
    { in: { renk: '20, 40, 60, 10', yon: 'cmyk' }, out: { 'RGB': 'rgb(184, 138, 92)', 'HEX': '#B88A5C', 'Toplam mürekkep': '%130' } },
    { in: { renk: '51, 102, 153', yon: 'rgb' }, out: { 'CMYK': 'cmyk(67%, 33%, 0%, 40%)', 'Camgöbeği (C)': '%66,67', 'Macenta (M)': '%33,33', 'Sarı (Y)': '%0', 'Siyah (K)': '%40', 'Toplam mürekkep': '%140' } },
    { in: { renk: '255, 0, 0', yon: 'rgb' }, out: { 'CMYK': 'cmyk(0%, 100%, 100%, 0%)', 'HEX': '#FF0000' } },
    { in: { renk: '#000000', yon: 'rgb' }, out: { 'CMYK': 'cmyk(0%, 0%, 0%, 100%)', 'Toplam mürekkep': '%100' } },
    { in: { renk: '100 0 0 0', yon: 'cmyk' }, out: { 'RGB': 'rgb(0, 255, 255)', 'HEX': '#00FFFF' } },
    { in: { renk: 'cmyk(0%, 0%, 0%, 50%)', yon: 'cmyk' }, out: { 'RGB': 'rgb(128, 128, 128)', 'HEX': '#808080' } },
    { in: { renk: '#1E90FF', yon: 'rgb' }, out: { 'CMYK': 'cmyk(88%, 44%, 0%, 0%)', 'Camgöbeği (C)': '%88,24', 'Macenta (M)': '%43,53' } },
    { in: { renk: '255, 255, 255', yon: 'rgb' }, out: { 'CMYK': 'cmyk(0%, 0%, 0%, 0%)', 'Toplam mürekkep': '%0' } },
    { in: { renk: '120, 0, 0, 0', yon: 'cmyk' }, error: true },
    { in: { renk: '0, 100, 100', yon: 'cmyk' }, error: true },
    { in: { renk: '300, 0, 0', yon: 'rgb' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden CMYK\'dan RGB\'ye mi, RGB\'den CMYK\'ya mı çevireceğinizi seçin.',
    'CMYK için dört yüzdeyi C, M, Y, K sırasıyla yazın: <code>20, 40, 60, 10</code>. Yüzde işareti koymanız gerekmez.',
    'RGB için üç kanalı (<code>51, 102, 153</code>) ya da HEX kodunu (<code>#336699</code>) yazın.',
    '"Çevir" düğmesine basın. Karşılık gelen renk kodu, kanal yüzdeleri ve toplam mürekkep oranı listelenir.',
    'Sonucu tasarım programınıza ya da matbaaya ileteceğiniz nota kopyalayın; kesin baskı rengi için prova isteyin.',
  ],
  sections: [
    { h: 'Ekran ışıkla, baskı mürekkeple renk üretir', p: [
      'RGB <strong>toplamalı</strong> bir renk modelidir: ekran siyahtır, kırmızı, yeşil ve mavi ışık eklendikçe renk açılır, üçü tam açıkken beyaz elde edilir. CMYK ise <strong>çıkarmalı</strong> bir modeldir: kâğıt beyazdır, üzerine basılan camgöbeği (Cyan), macenta (Magenta) ve sarı (Yellow) mürekkepler ışığın bir kısmını emer, mürekkep arttıkça renk koyulaşır. Dördüncü harf K (Key), siyah mürekkebi gösterir.',
      'Kuramsal olarak üç renkli mürekkebin tam karışımı siyah vermelidir; uygulamada ise çamurlu bir koyu kahverengi çıkar, kâğıt fazla ıslanır ve ince yazılar netliğini yitirir. Bu yüzden siyah ayrı bir mürekkep olarak basılır. Kartvizit, broşür, afiş, ambalaj ve etiket gibi ofset ya da dijital baskı işlerinde dosyalar çoğunlukla CMYK değerleriyle hazırlanır; web sitesi, sosyal medya görseli ve sunum gibi ekranda kalacak işlerde RGB kullanılır.',
    ] },
    { h: 'CMYK\'dan RGB\'ye çevirme formülü', p: [
      'Yüzdeler önce 100\'e bölünerek 0–1 aralığına getirilir. Sonra her kanal şu formülle hesaplanır: <strong>R = 255 × (1 − C) × (1 − K)</strong>, <strong>G = 255 × (1 − M) × (1 − K)</strong>, <strong>B = 255 × (1 − Y) × (1 − K)</strong>. Sonuçlar en yakın tam sayıya yuvarlanır.',
      'Çözümlü örnek: C = %20, M = %40, Y = %60, K = %10. R = 255 × 0,8 × 0,9 = 183,6 → 184. G = 255 × 0,6 × 0,9 = 137,7 → 138. B = 255 × 0,4 × 0,9 = 91,8 → 92. Renk <code>rgb(184, 138, 92)</code>, HEX karşılığı <code>#B88A5C</code> olur; sıcak bir açık kahve tonudur. Dört kanalın toplamı %130 mürekkep yüküne karşılık gelir.',
    ] },
    { h: 'RGB\'den CMYK\'ya çevirme formülü', p: [
      'Kanallar 255\'e bölünür. Siyah bileşen, en parlak kanala göre belirlenir: <strong>K = 1 − max(R, G, B)</strong>. Ardından <strong>C = (1 − R − K) ÷ (1 − K)</strong>, <strong>M = (1 − G − K) ÷ (1 − K)</strong>, <strong>Y = (1 − B − K) ÷ (1 − K)</strong> hesaplanır. Renk tam siyahsa (K = 1) bölme tanımsız olacağından C, M ve Y sıfır kabul edilir.',
      'Çözümlü örnek: <code>rgb(51, 102, 153)</code>. Normalleştirilmiş değerler 0,2, 0,4 ve 0,6\'dır. K = 1 − 0,6 = 0,4. C = (1 − 0,2 − 0,4) ÷ 0,6 = 0,6667; M = (1 − 0,4 − 0,4) ÷ 0,6 = 0,3333; Y = (1 − 0,6 − 0,4) ÷ 0,6 = 0. Sonuç C %66,67, M %33,33, Y %0, K %40 olur; yuvarlanmış yazımı <code>cmyk(67%, 33%, 0%, 40%)</code> biçimindedir.',
    ] },
    { h: 'Bu dönüşüm neden yalnızca yaklaşık bir değerdir?', p: [
      'Buradaki formül, renk yönetimi içermeyen basit matematiksel dönüşümdür. Profesyonel tasarım programları ise dönüşümü <strong>renk profilleri</strong> üzerinden yapar: aynı CMYK değeri kuşe kâğıtta, mat kâğıtta ya da gazete kâğıdında farklı görünür, çünkü mürekkebin kâğıtta yayılması ve kâğıdın beyazlığı değişir. Bu yüzden bir tasarım programının aynı RGB renk için gösterdiği CMYK değerleri bu aracın sonucundan farklı olabilir; ikisi de kendi varsayımı içinde tutarlıdır.',
      'İkinci sınır <strong>renk gamıdır</strong>. Ekran, mürekkeple basılamayan çok canlı renkler gösterebilir: saf RGB mavisi, parlak yeşil ve neon tonlar bunların başında gelir. Bu renkler CMYK\'ya çevrildiğinde formül bir değer üretir ama baskıda renk daha mat ve koyu çıkar. Logo ve kurumsal renk gibi tutarlılığın önemli olduğu işlerde matbaadan prova baskı istemek ve gerekirse özel (spot) renk kullanmak en güvenli yoldur.',
    ] },
    { h: 'Toplam mürekkep oranı', p: [
      'Dört kanalın yüzdelerinin toplamı, kâğıdın o noktasına ne kadar mürekkep bindiğini gösterir ve kuramsal olarak %400\'e kadar çıkabilir. Çok yüksek toplamlar kurumayı geciktirir, arka sayfaya geçme ve bulaşma riskini artırır. Kabul edilebilir üst sınır kâğıt türüne ve baskı tekniğine göre değişir; bu sınırı matbaanızdan öğrenin ve koyu alanlarda aracın gösterdiği toplamı bu değerle karşılaştırın.',
      'Düz siyah metin için yalnızca K %100 kullanmak (C, M, Y sıfır) genel bir alışkanlıktır; dört renkten oluşan siyah, küçük yazılarda renklerin tam üst üste oturmaması durumunda bulanık görünebilir. Geniş siyah zeminlerde ise daha derin bir siyah için K\'ya bir miktar renk eklenebilir; oranları matbaanızın önerisine göre belirleyin.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>Beyaz</strong>: cmyk(0, 0, 0, 0) = rgb(255, 255, 255)',
      '<strong>Siyah</strong>: cmyk(0, 0, 0, 100) = rgb(0, 0, 0)',
      '<strong>Camgöbeği</strong>: cmyk(100, 0, 0, 0) = rgb(0, 255, 255)',
      '<strong>Macenta</strong>: cmyk(0, 100, 0, 0) = rgb(255, 0, 255)',
      '<strong>Sarı</strong>: cmyk(0, 0, 100, 0) = rgb(255, 255, 0)',
      '<strong>Kırmızı</strong>: cmyk(0, 100, 100, 0) = rgb(255, 0, 0)',
      '<strong>Yeşil</strong>: cmyk(100, 0, 100, 0) = rgb(0, 255, 0)',
      '<strong>Mavi</strong>: cmyk(100, 100, 0, 0) = rgb(0, 0, 255)',
      '<strong>Orta gri</strong>: cmyk(0, 0, 0, 50) = rgb(128, 128, 128)',
    ] },
  ],
  faq: [
    ['CMYK\'daki K harfi neyi gösterir?', 'Siyah mürekkebi gösterir. "Key" sözcüğünden gelir; baskıda ayrıntıyı ve kontrastı taşıyan ana kalıp siyah olduğu için bu ad verilmiştir. B harfi mavi (Blue) ile karışmasın diye kullanılmamıştır.'],
    ['Ekranda gördüğüm renk baskıda neden farklı çıkıyor?', 'Ekran ışık yayar, kâğıt ışığı yansıtır; ayrıca ekranın gösterebildiği bazı canlı renkler mürekkeple elde edilemez. Kâğıt cinsi, mürekkep ve makine ayarı da sonucu etkiler. Kesin renk için prova baskı gerekir.'],
    ['Tasarım programım farklı CMYK değerleri veriyor, hangisi doğru?', 'Tasarım programları renk profili kullanır, bu araç ise profilsiz standart formülü uygular. Baskıya gidecek dosyada matbaanın istediği profile göre programınızın verdiği değerleri esas alın; bu aracı hızlı tahmin ve kontrol için kullanın.'],
    ['Baskı için dosyayı RGB mi CMYK mı göndermeliyim?', 'Bu, matbaanın iş akışına bağlıdır. Ofset baskıda çoğunlukla CMYK istenir; bazı dijital baskı hizmetleri RGB dosyayı kendi profilleriyle dönüştürür. Dosyayı hazırlamadan önce matbaanıza sorun.'],
    ['Siyah için 0, 0, 0, 100 mü kullanmalıyım?', 'Metin ve ince çizgilerde yalnızca siyah mürekkep kullanmak yaygın ve güvenli bir tercihtir. Geniş siyah alanlarda daha dolgun görünüm için renk eklenebilir, ancak oranı matbaanızla belirleyin.'],
    ['Toplam mürekkep oranı ne kadar olmalı?', 'Sabit bir sayı yoktur; kâğıdın emiciliğine ve baskı tekniğine göre değişir. Araç toplamı gösterir, üst sınırı ise işi basacak matbaadan öğrenmeniz gerekir.'],
    ['CMYK değerlerini web sitesinde kullanabilir miyim?', 'Tarayıcılar renkleri RGB olarak gösterir; CSS\'te yaygın biçimde desteklenen yazımlar HEX, rgb() ve hsl()\'dir. Baskı için verilmiş bir kurumsal rengi siteye taşırken bu araçla RGB ya da HEX karşılığını alabilirsiniz.'],
    ['Girdiğim renk değerleri saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['hex-rgb-cevir', 'rgb-hsl-cevir', 'renk-secici', 'renk-tonu-olustur', 'renk-paleti-olustur', 'dpi-hesapla'],
};
