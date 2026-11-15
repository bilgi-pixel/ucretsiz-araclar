export default {
  slug: 'cihaz-elektrik-maliyeti-hesapla',
  title: 'Cihazın Elektrik Maliyeti Hesaplama',
  h1Tail: 'watt ve saate göre',
  pageTitle: 'Cihazın Elektrik Maliyeti Hesaplama – Watt\'tan Aylık Fatura Tutarı',
  description: 'Cihazın gücünü (watt), günlük kullanım süresini ve kWh birim fiyatını girin; günlük, aylık ve yıllık elektrik tüketimini ve faturaya yansıyan tutarı hesaplayın.',
  card: 'Bir cihazın watt değerinden günlük, aylık ve yıllık kWh tüketimini ve faturaya ekleyeceği tutarı hesaplayın.',
  category: 'elektrik',
  keywords: ['elektrik tüketimi hesaplama', 'cihaz elektrik maliyeti', 'watt kaç lira yakar', 'kwh hesaplama', 'aylık elektrik gideri hesaplama', 'klima ne kadar elektrik yakar', 'elektrikli ısıtıcı saatte kaç tl'],
  lead: 'Bir elektrikli cihazın faturanıza ne kadar yük getirdiğini hesaplayın. Gücü watt olarak, günlük çalışma süresini saat olarak ve kWh birim fiyatını girin; araç <strong>günlük, aylık ve yıllık</strong> tüketimi ve maliyeti çıkarır.',
  button: 'Hesapla',
  inputs: [
    { id: 'guc', label: 'Cihazın gücü (W)', type: 'number', placeholder: 'Örn. 2000', hint: 'Etiketinde kW yazıyorsa 1000 ile çarpın: 2 kW = 2000 W.' },
    { id: 'saat', label: 'Günlük kullanım (saat)', type: 'number', placeholder: 'Örn. 1,5', hint: '30 dakika için 0,5 yazın.' },
    { id: 'gun', label: 'Ayda kullanılan gün sayısı', type: 'number', value: '30' },
    { id: 'fiyat', label: 'Birim fiyat (TL/kWh)', type: 'number', placeholder: 'Örn. 3', hint: 'Faturanızdaki vergiler dâhil kWh bedelini yazın; binlik ayraç kullanmayın.' },
    { id: 'adet', label: 'Cihaz adedi', type: 'number', value: '1' },
  ],
  compute(v, h) {
    const guc = h.pos(v.guc, 'Cihazın gücü');
    const saat = h.pos(v.saat, 'Günlük kullanım');
    if (saat > 24) h.err('"Günlük kullanım" en fazla 24 saat olabilir.');
    const gun = h.opt(v.gun, 30, 'Ayda kullanılan gün sayısı');
    if (!(gun > 0) || gun > 31) h.err('"Ayda kullanılan gün sayısı" 1 ile 31 arasında olmalı.');
    const fiyat = h.nonneg(v.fiyat, 'Birim fiyat');
    const adet = String(v.adet ?? '').trim() === '' ? 1 : h.posint(v.adet, 'Cihaz adedi');
    const gunluk = guc * adet * saat / 1000;
    const aylik = gunluk * gun;
    return {
      rows: [
        ['Aylık maliyet', h.para(aylik * fiyat)],
        ['Aylık tüketim', h.fmt(aylik, 2) + ' kWh'],
        ['Günlük tüketim', h.fmt(gunluk, 3) + ' kWh'],
        ['Günlük maliyet', h.para(gunluk * fiyat)],
        ['Yıllık tüketim', h.fmt(aylik * 12, 1) + ' kWh'],
        ['Yıllık maliyet', h.para(aylik * 12 * fiyat)],
        ['Saatlik maliyet', h.para(guc * adet / 1000 * fiyat)],
      ],
      note: 'Yıllık değerler aylık sonucun 12 katıdır. Hesap, cihazın çalıştığı süre boyunca etiket gücünü sürekli çektiğini varsayar; termostatlı cihazlarda gerçek tüketim daha düşüktür.',
    };
  },
  cases: [
    { in: { guc: '2000', saat: '1', gun: '30', fiyat: '3' }, out: { 'Aylık maliyet': '180,00 TL', 'Aylık tüketim': '60 kWh', 'Günlük tüketim': '2 kWh', 'Yıllık maliyet': '2.160,00 TL', 'Saatlik maliyet': '6,00 TL' } },
    { in: { guc: '100', saat: '24', gun: '30', fiyat: '2,5' }, out: { 'Aylık maliyet': '180,00 TL', 'Aylık tüketim': '72 kWh', 'Günlük tüketim': '2,4 kWh', 'Günlük maliyet': '6,00 TL' } },
    { in: { guc: '1500', saat: '0,5', gun: '20', fiyat: '4' }, out: { 'Aylık maliyet': '60,00 TL', 'Aylık tüketim': '15 kWh', 'Günlük tüketim': '0,75 kWh', 'Yıllık tüketim': '180 kWh' } },
    { in: { guc: '10', saat: '5', gun: '30', fiyat: '2', adet: '6' }, out: { 'Aylık maliyet': '18,00 TL', 'Aylık tüketim': '9 kWh', 'Günlük tüketim': '0,3 kWh', 'Yıllık maliyet': '216,00 TL' } },
    { in: { guc: '150', saat: '8', gun: '30', fiyat: '3,2' }, out: { 'Aylık maliyet': '115,20 TL', 'Aylık tüketim': '36 kWh', 'Yıllık maliyet': '1.382,40 TL', 'Saatlik maliyet': '0,48 TL' } },
    { in: { guc: '2000', saat: '25', gun: '30', fiyat: '3' }, error: true },
    { in: { guc: 'abc', saat: '1', fiyat: '3' }, error: true },
    { in: { guc: '2000', saat: '1', gun: '30', fiyat: '' }, error: true },
  ],
  howto: [
    'Cihazın gücünü watt olarak yazın. Bu değer cihazın arkasındaki ya da altındaki etikette, adaptörün üzerinde veya kullanım kılavuzunda bulunur.',
    'Cihazın günde ortalama kaç saat çalıştığını girin. Dakikayı saate çevirmek için 60\'a bölün: 45 dakika 0,75 saattir.',
    'Ayda kaç gün kullandığınızı belirtin; her gün kullanılan cihazlar için 30 bırakabilirsiniz.',
    'Elektrik faturanızdaki kWh başına birim bedeli yazın ve aynı cihazdan birden fazla varsa adedi girin.',
    '"Hesapla" düğmesine basın; tüketim ve maliyet satırları günlük, aylık ve yıllık olarak listelenir.',
  ],
  sections: [
    { h: 'Elektrik tüketimi nasıl hesaplanır?', p: [
      'Elektrik faturası güce değil, enerjiye göre kesilir. Enerji birimi kilovatsaattir (kWh): 1.000 watt gücündeki bir cihaz bir saat çalıştığında 1 kWh tüketir. Formül şudur: <strong>tüketim (kWh) = güç (W) × süre (saat) ÷ 1000</strong>. Maliyet ise tüketimin birim fiyatla çarpımıdır: <strong>maliyet = kWh × TL/kWh</strong>.',
      'Aylık tüketim, günlük tüketimin ayda kullanılan gün sayısıyla çarpılmasıyla bulunur. Araç yıllık değerleri aylık sonucu 12 ile çarparak verir; bu, mevsime göre kullanımı değişmeyen cihazlar için iyi bir tahmindir. Klima ve ısıtıcı gibi mevsimlik cihazlarda yalnızca kullanıldıkları ayları hesaba katmak gerekir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '2.000 W gücünde bir elektrikli ısıtıcıyı günde 1 saat, ayın 30 günü çalıştırdığınızı düşünün. Günlük tüketim 2.000 × 1 ÷ 1000 = 2 kWh, aylık tüketim 2 × 30 = 60 kWh olur. Birim fiyat 3 TL/kWh alınırsa aylık maliyet 60 × 3 = 180 TL, yıllık maliyet 2.160 TL\'dir. Cihazın çalıştığı her saat 6 TL\'ye mal olur.',
      'Sürekli çalışan düşük güçlü cihazlar da sürpriz yapabilir: 100 W çeken bir cihaz günde 24 saat açık kalırsa günde 2,4 kWh, ayda 72 kWh tüketir. 2,5 TL/kWh fiyatla bu da ayda 180 TL eder; yani gücü 20 kat düşük olmasına rağmen ilk örnekteki ısıtıcıyla aynı tutara ulaşır. Buradaki fiyatlar örnek amaçlıdır; kendi tarifenizi girdiğinizde sonuçlar değişir.',
    ] },
    { h: 'Birim fiyatı faturadan nasıl bulursunuz?', p: [
      'En güvenilir yöntem, son faturanızdaki toplam tutarı aynı faturadaki toplam tüketime (kWh) bölmektir. Böylece enerji bedeli, dağıtım bedeli ve vergiler dâhil gerçek ortalama kWh maliyetinizi elde edersiniz. Tarifeler abone grubuna, tüketim kademesine ve döneme göre değiştiği için bu sayfada sabit bir fiyat yer almaz.',
      'Çok zamanlı tarife kullanıyorsanız gündüz, puant ve gece fiyatları farklıdır. Bu durumda cihazı hangi saat diliminde çalıştırıyorsanız o dilimin fiyatını yazın; çamaşır ve bulaşık makinesini gece dilimine kaydırmanın getirisini iki ayrı hesapla karşılaştırabilirsiniz.',
    ] },
    { h: 'Etiket gücü ile gerçek tüketim farkı', p: [
      'Etiketteki watt değeri çoğunlukla cihazın çekebileceği en yüksek güçtür. Pek çok cihaz bu gücü sürekli çekmez:',
    ], ul: [
      '<strong>Buzdolabı ve derin dondurucu:</strong> Kompresör günün yalnızca bir bölümünde çalışır; en doğru veri enerji etiketindeki yıllık kWh değeridir.',
      '<strong>Klima:</strong> İnverter modeller oda hedef sıcaklığa yaklaştıkça gücünü düşürür; ortalama tüketim etiket gücünün belirgin biçimde altında kalabilir.',
      '<strong>Ütü, fırın, termosifon, yağlı radyatör:</strong> Termostat devreye girip çıktığı için rezistans sürenin bir kısmında kapalıdır.',
      '<strong>Çamaşır ve bulaşık makinesi:</strong> Yüksek güç yalnızca suyu ısıtırken çekilir; program başına tüketim etikette kWh olarak verilir.',
      '<strong>Bilgisayar ve televizyon:</strong> Adaptör ya da güç kaynağı etiketi en yüksek değeri gösterir; gerçek kullanım çoğu zaman bunun altındadır.',
    ] },
    { h: 'Tipik cihaz güçleri', p: [
      'Aşağıdaki aralıklar yalnızca fikir vermek içindir; modelden modele büyük fark olabilir. Kendi cihazınızın etiketini esas alın.',
    ], ul: [
      'LED ampul: 5–15 W',
      'Modem ve yönlendirici: 5–15 W',
      'Dizüstü bilgisayar: 30–90 W',
      'LED televizyon: 50–150 W',
      'Masaüstü bilgisayar ve monitör: 100–400 W',
      'Elektrikli süpürge: 600–900 W',
      'Saç kurutma makinesi: 1.200–2.200 W',
      'Su ısıtıcı (kettle): 1.800–2.400 W',
      'Elektrikli ısıtıcı: 1.000–2.500 W',
    ] },
    { h: 'Bekleme (stand-by) tüketimi', p: [
      'Kapalı görünen ama fişte kalan cihazlar da az miktarda güç çeker. Tek bir cihaz için birkaç watt önemsiz görünse de evdeki onlarca cihaz toplandığında yıl boyu kesintisiz süren bir yük oluşur. Örneğin toplam 10 W bekleme gücü, günde 24 saatten ayda 7,2 kWh eder. Bu aracı güç alanına bekleme gücünü, süre alanına 24 yazarak bu gizli gideri görmek için de kullanabilirsiniz.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar bilgilendirme amaçlı bir tahmindir. Fatura tutarı; tarife, kademe, vergi ve fonlar, sayaç okuma dönemi gibi etkenlere göre değişir. Kesin değer için faturanızı ve dağıtım ya da tedarik şirketinizin güncel tarifesini esas alın.',
    ] },
  ],
  faq: [
    ['1000 watt saatte kaç kWh yakar?', '1.000 W gücündeki bir cihaz bir saatte tam 1 kWh tüketir. 2.000 W bir saatte 2 kWh, 500 W ise yarım kWh yakar. Maliyeti bulmak için bu değeri kWh birim fiyatınızla çarpın.'],
    ['Watt değerini bilmiyorum, nasıl bulurum?', 'Cihazın etiketinde ya da adaptöründe watt yazmıyorsa volt ve amper değerlerini çarpın: 230 V ve 2 A yazan bir cihaz yaklaşık 460 W çeker. En kesin yöntem, prize takılan bir enerji ölçer kullanmaktır.'],
    ['Aylık hesabı neden 30 gün üzerinden yapıyorsunuz?', 'Varsayılan değer 30 gündür, ancak alanı değiştirebilirsiniz. Haftada beş gün kullandığınız bir cihaz için yaklaşık 22, yalnızca hafta sonları kullandığınız bir cihaz için 8 yazabilirsiniz.'],
    ['Klimanın aylık maliyetini bu araçla hesaplayabilir miyim?', 'Yaklaşık bir üst sınır bulabilirsiniz. Klimanın elektrik giriş gücünü (soğutma kapasitesini değil) yazın. İnverter klimalar gücünü kıstığı için gerçek tüketim çoğunlukla bu hesabın altında kalır.'],
    ['Birden fazla farklı cihazı birlikte hesaplayabilir miyim?', 'Araç tek tür cihaz için çalışır; aynı cihazdan birkaç tane varsa adet alanını kullanın. Farklı cihazlar için hesabı ayrı ayrı yapıp aylık tutarları toplayın.'],
    ['kW ile kWh arasındaki fark nedir?', 'kW güç birimidir ve cihazın o anda ne kadar hızlı enerji harcadığını gösterir. kWh enerji birimidir ve belirli bir sürede harcanan toplam miktarı anlatır. 2 kW gücündeki bir cihaz 3 saatte 6 kWh tüketir.'],
    ['Sonuç faturamla birebir tutmuyor, neden?', 'Cihazlar etiket gücünü her zaman çekmez, kullanım süreleri tahmine dayanır ve faturada kademeli tarife, sabit bedeller ve vergiler bulunur. Araç tek bir cihazın katkısını yaklaşık olarak gösterir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; girdiğiniz güç, süre ve fiyat bilgileri hiçbir sunucuya gönderilmez.'],
  ],
  related: ['led-tasarruf-hesapla', 'elektrik-gucu-hesapla', 'amper-watt-cevir', 'kw-watt-cevir', 'elektrikli-arac-sarj-maliyeti-hesapla', 'kwh-joule-cevir'],
};
