export default {
  slug: 'calisma-saati-fiyat-hesapla',
  title: 'Bir Ürün Kaç Saatlik Çalışma Eder Hesaplama',
  h1Tail: 'fiyatı emeğinizle ölçün',
  pageTitle: 'Bir Ürün Kaç Saatlik Çalışma Eder? Emek Karşılığı Hesaplama',
  description: 'Bir ürünün fiyatını ve aylık net gelirinizi yazın; o ürünü almak için kaç saat, kaç iş günü çalışmanız gerektiğini ve saatlik net kazancınızı görün.',
  card: 'Almayı düşündüğünüz ürünün fiyatını çalışma saatine ve iş gününe çevirin; saatlik net kazancınızı öğrenin.',
  category: 'gunluk',
  keywords: ['kaç saat çalışmam gerekir', 'ürün kaç saatlik emek', 'saatlik kazanç hesaplama', 'fiyat çalışma saati', 'maaşa göre ürün fiyatı', 'kaç günlük maaş', 'saatlik ücret hesaplama net'],
  lead: 'Bir fiyat etiketinin gerçek karşılığı para değil, o parayı kazanmak için harcadığınız zamandır. Ürünün fiyatını, aylık net gelirinizi ve haftalık çalışma sürenizi girin; araç o ürünün <strong>kaç saatlik ve kaç iş günlük emeğinize</strong> denk geldiğini hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'fiyat', label: 'Ürün fiyatı (TL)', type: 'number', placeholder: 'Örn. 3900' },
    { id: 'gelir', label: 'Aylık net gelir (TL)', type: 'number', placeholder: 'Örn. 39000', hint: 'Elinize geçen tutar' },
    { id: 'haftalikSaat', label: 'Haftalık çalışma saati', type: 'number', value: '45' },
    { id: 'haftalikGun', label: 'Haftada çalışılan gün', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Ürün fiyatı');
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const hs = h.pos(v.haftalikSaat, 'Haftalık çalışma saati');
    if (hs > 168) h.err('"Haftalık çalışma saati" 168\'den büyük olamaz; bir haftada 168 saat vardır.');
    const hg = h.posint(v.haftalikGun, 'Haftada çalışılan gün');
    if (hg > 7) h.err('"Haftada çalışılan gün" 1 ile 7 arasında olmalı.');
    const aylikSaat = hs * 52 / 12;
    const saatlik = gelir / aylikSaat;
    const saat = fiyat / saatlik;
    const gunSaat = hs / hg;
    const dkToplam = Math.round(saat * 60);
    let sure;
    if (dkToplam < 1) sure = '1 dakikadan az';
    else if (dkToplam < 60) sure = `${dkToplam} dk`;
    else sure = `${h.fmt(Math.floor(dkToplam / 60), 0)} saat ${dkToplam % 60} dk`;
    return {
      rows: [
        ['Gereken çalışma süresi', sure],
        ['İş günü karşılığı', `${h.fmt(saat / gunSaat, 2)} iş günü`],
        ['Aylık gelire oranı', `%${h.fmt(fiyat / gelir * 100, 2)}`],
        ['Saatlik net kazanç', h.para(saatlik)],
        ['Günlük net kazanç', h.para(saatlik * gunSaat)],
        ['Aylık çalışma saati', `${h.fmt(aylikSaat, 2)} saat`],
      ],
      note: 'Aylık çalışma saati, haftalık süre × 52 ÷ 12 ile bulunur. Yol, hazırlık ve fazla mesai süreleri dahil değildir; bunları eklerseniz gerçek saatlik kazancınız daha düşük çıkar.',
    };
  },
  cases: [
    { in: { fiyat: '3900', gelir: '39000', haftalikSaat: '45', haftalikGun: '5' }, out: { 'Gereken çalışma süresi': '19 saat 30 dk', 'İş günü karşılığı': '2,17 iş günü', 'Aylık gelire oranı': '%10', 'Saatlik net kazanç': '200,00 TL', 'Günlük net kazanç': '1.800,00 TL', 'Aylık çalışma saati': '195 saat' } },
    { in: { fiyat: '60000', gelir: '30000', haftalikSaat: '40', haftalikGun: '5' }, out: { 'Gereken çalışma süresi': '346 saat 40 dk', 'İş günü karşılığı': '43,33 iş günü', 'Aylık gelire oranı': '%200', 'Saatlik net kazanç': '173,08 TL', 'Aylık çalışma saati': '173,33 saat' } },
    { in: { fiyat: '100', gelir: '39000', haftalikSaat: '45', haftalikGun: '5' }, out: { 'Gereken çalışma süresi': '30 dk', 'İş günü karşılığı': '0,06 iş günü', 'Aylık gelire oranı': '%0,26' } },
    { in: { fiyat: '22000', gelir: '22000', haftalikSaat: '45', haftalikGun: '6' }, out: { 'Gereken çalışma süresi': '195 saat 0 dk', 'İş günü karşılığı': '26 iş günü', 'Aylık gelire oranı': '%100' } },
    { in: { fiyat: '1200', gelir: '52000', haftalikSaat: '40', haftalikGun: '5' }, out: { 'Gereken çalışma süresi': '4 saat 0 dk', 'İş günü karşılığı': '0,5 iş günü', 'Saatlik net kazanç': '300,00 TL', 'Günlük net kazanç': '2.400,00 TL' } },
    { in: { fiyat: '3900', gelir: '0' }, error: true },
    { in: { fiyat: 'pahalı', gelir: '39000' }, error: true },
    { in: { fiyat: '3900', gelir: '39000', haftalikSaat: '45', haftalikGun: '8' }, error: true },
  ],
  howto: [
    '"Ürün fiyatı" alanına almayı düşündüğünüz ürünün ya da hizmetin toplam bedelini yazın.',
    '"Aylık net gelir" alanına elinize geçen aylık tutarı girin; brüt maaşı değil, hesabınıza yatan miktarı kullanın.',
    'Haftalık çalışma saatinizi ve haftada kaç gün çalıştığınızı kontrol edin; varsayılan değerler 45 saat ve 5 gündür.',
    '"Hesapla" düğmesine basın. Ürünün saat ve iş günü cinsinden karşılığı ile saatlik net kazancınız görüntülenir.',
  ],
  sections: [
    { h: 'Hesaplama nasıl yapılıyor?', p: [
      'Önce saatlik net kazancınız bulunur. Bir yılda 52 hafta ve 12 ay olduğundan <strong>aylık çalışma saati = haftalık saat × 52 ÷ 12</strong> formülü kullanılır. Haftada 45 saat çalışan biri ayda ortalama 195 saat, 40 saat çalışan biri 173,33 saat çalışır. <strong>Saatlik net kazanç = aylık net gelir ÷ aylık çalışma saati</strong> olur.',
      'Ürünün emek karşılığı ise <strong>gereken süre = fiyat ÷ saatlik net kazanç</strong> işlemiyle hesaplanır. Bu süre, günlük çalışma saatinize (haftalık saat ÷ haftalık gün) bölünerek iş gününe çevrilir. Türkiye\'de haftalık çalışma süresinin yasal üst sınırı 45 saat olduğu için varsayılan değer olarak 45 kullanılmıştır; sözleşmeniz farklıysa kendi sürenizi yazın.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Aylık net geliri 39.000 TL olan ve haftada 5 gün, toplam 45 saat çalışan biri 3.900 TL\'lik bir kulaklık almak istiyor. Aylık çalışma saati 45 × 52 ÷ 12 = 195 saattir. Saatlik net kazanç 39.000 ÷ 195 = <strong>200 TL</strong> eder.',
      'Kulaklık için gereken süre 3.900 ÷ 200 = 19,5 saat, yani <strong>19 saat 30 dakikadır</strong>. Günde 9 saat çalışıldığına göre bu 19,5 ÷ 9 = 2,17 iş günü yapar. Ürün aylık gelirin yüzde 10\'una denk gelir. Başka bir deyişle bu kulaklık, pazartesi sabahından çarşamba öğlenine kadar yapılan çalışmanın tamamıdır.',
    ] },
    { h: 'Bu bakış açısı ne işe yarar?', p: [
      'Fiyatlar tek başına soyuttur; 3.900 TL kimine az, kimine çok gelir. Aynı rakamı kendi çalışma sürenize çevirdiğinizde karar somutlaşır: "Bu ürün iki günden fazla çalışmama değer mi?" sorusu, "3.900 TL pahalı mı?" sorusundan çok daha kolay yanıtlanır. Yöntem özellikle anlık istekle yapılan alışverişlerde, indirim dönemlerinde ve taksitli alımlarda fren görevi görür.',
      'Aynı hesap iki ürünü karşılaştırmak için de kullanılabilir. İki telefon modeli arasındaki fiyat farkını yazarsanız, üst modelin size kaç saatlik ek emeğe mal olacağını görürsünüz. Hizmet satın alırken de işe yarar: evi boyamak için ödenecek ücret sizin 30 saatlik emeğinize denk geliyorsa ve işi kendiniz 15 saatte yapabilecekseniz kararınız değişebilir.',
    ] },
    { h: 'Gerçek saatlik kazancınız daha düşük olabilir', p: [
      'Araç yalnızca sözleşmedeki çalışma saatini kullanır. Oysa işe ayırdığınız zaman bundan fazladır. Daha gerçekçi bir sonuç için şu kalemleri göz önünde bulundurabilirsiniz:',
    ], ul: [
      '<strong>Yol süresi:</strong> Günde gidiş dönüş bir buçuk saat yolda geçiyorsa haftalık süreye 7,5 saat ekleyin.',
      '<strong>Ücretsiz fazla mesai:</strong> Düzenli olarak geç çıkıyorsanız fiilen çalıştığınız saati yazın.',
      '<strong>İşle ilgili giderler:</strong> Yol parası, dışarıda yenen öğle yemeği ve iş kıyafeti gibi harcamaları gelirden düşerek net tutarı yeniden girin.',
      '<strong>Ek ödemeler:</strong> İkramiye, prim ve yemek kartı gibi düzenli gelirleri aylık ortalamaya ekleyebilirsiniz.',
    ] },
    { h: 'Hızlı başvuru: haftalık süreye göre aylık saat', ul: [
      'Haftada 30 saat → ayda 130 saat',
      'Haftada 37,5 saat → ayda 162,5 saat',
      'Haftada 40 saat → ayda 173,33 saat',
      'Haftada 45 saat → ayda 195 saat',
      'Haftada 50 saat → ayda 216,67 saat',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Hesap ortalama bir ayı temel alır; resmî tatiller, yıllık izin ve ayların farklı uzunlukları dikkate alınmaz. Serbest çalışanlar ve geliri aydan aya değişenler için son birkaç ayın ortalamasını kullanmak daha sağlıklıdır. Taksitli alımlarda vade farkı varsa fiyat alanına toplam ödenecek tutarı yazın. Sonuç bir farkındalık göstergesidir; neyin alınmaya değer olduğuna dair bir yargı ya da mali tavsiye içermez.',
    ] },
  ],
  faq: [
    ['Saatlik net kazancımı nasıl hesaplarım?', 'Aylık net gelirinizi aylık çalışma saatinize bölün. Haftada 45 saat çalışıyorsanız aylık süre 195 saattir; 39.000 TL net gelir saatte 200 TL eder.'],
    ['Neden bir ay 4 hafta olarak alınmıyor?', 'Çünkü bir yılda 48 değil 52 hafta vardır. Bir ay ortalama 4,33 hafta sürer. Dört haftayla hesap yapmak aylık çalışma saatini olduğundan az, saatlik kazancı olduğundan yüksek gösterir.'],
    ['Brüt maaşı mı net maaşı mı yazmalıyım?', 'Net tutarı yazın. Alışverişi elinize geçen parayla yaptığınız için emek karşılığını doğru gösteren değer net gelirdir.'],
    ['Haftada 6 gün çalışıyorum, neyi değiştirmeliyim?', '"Haftada çalışılan gün" alanına 6 yazın. Saat cinsinden sonuç değişmez, ancak iş günü karşılığı günlük 7,5 saat üzerinden hesaplanır.'],
    ['Evde iki kişi çalışıyorsa hesabı nasıl yapmalıyım?', 'Ortak bir alışveriş için iki gelirin toplamını ve iki kişinin toplam haftalık çalışma saatini girebilirsiniz. Sonuç, hanenin toplam emeği cinsinden karşılığı gösterir.'],
    ['Sonuç 1 aydan uzun çıkıyorsa ne anlama gelir?', 'Ürün fiyatı aylık net gelirinizden yüksektir. Örneğin gelirin iki katı fiyatlı bir ürün, hiç harcama yapmadan iki ay çalışmaya denktir. Gerçekte gelirinizin yalnızca bir kısmını ayırabileceğiniz için biriktirme süresi daha uzun olur.'],
    ['Emekli ya da öğrenciyim, kullanabilir miyim?', 'Araç çalışma saatine dayanır. Düzenli bir çalışma süreniz yoksa "Aylık gelire oranı" satırı sizin için daha anlamlıdır; ürünün aylık gelirinizin yüzde kaçına denk geldiğini gösterir.'],
    ['Gelir bilgim kaydediliyor mu?', 'Hayır. Tüm hesaplama tarayıcınızda yapılır; yazdığınız gelir ve fiyat bilgileri sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['kucuk-harcama-yillik-hesapla', 'abonelik-maliyeti-hesapla', 'brut-net-maas', 'yuzde-hesapla', 'birikim-hesapla'],
};
